
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/model/LoginModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a4449u+ZfNKAbbqz6w1utqH', 'LoginModel');
// hall/scripts/logic/hallcommon/model/LoginModel.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ModelBase_1 = require("../../../framework/model/ModelBase");
var NetEvent_1 = require("../../core/net/hall/NetEvent");
var HallStorageKey_1 = require("../const/HallStorageKey");
var ServerRoutes_1 = require("../../core/setting/ServerRoutes");
var MsgEvent_1 = require("../../hall/ui/msg/MsgEvent");
var AppHelper_1 = require("../../core/tool/AppHelper");
var PlayerInfoModel_1 = require("./PlayerInfoModel");
var HallModel_1 = require("./HallModel");
var HallPopMsgHelper_1 = require("../../hall/tool/HallPopMsgHelper");
var HallBtnHelper_1 = require("../../hall/ui/hall/views/HallBtnHelper");
var ReportTool_1 = require("../../core/tool/ReportTool");
var LoginModel = /** @class */ (function (_super) {
    __extends(LoginModel, _super);
    function LoginModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //登录方式 
        //手动登录
        _this.MANUAL_LOGIN = 1;
        //自动登录
        _this.AUTO_LOGIN = 2;
        _this.reportParam = [];
        _this.retryTimes = 0; //用于TEST_ROUTE重试计数
        _this.requestTime = 0; //用于请求t_url计数
        _this.CONFIG_MD5_KEY = "CONFIG_MD5_KEY";
        _this.CONFIG_KEY = "CONFIG_KEY";
        //第一次进入登录场景
        _this.firstLogin = true;
        return _this;
    }
    Object.defineProperty(LoginModel.prototype, "Name", {
        get: function () {
            return "LoginModel";
        },
        enumerable: false,
        configurable: true
    });
    LoginModel.prototype.onInit = function () {
        Global.HallServer.on(NetEvent_1.NetLogin.VisitorLogin, this, this.onLogin);
        Global.HallServer.on(NetEvent_1.NetLogin.UserPhoneLogin, this, this.onLogin);
        Global.HallServer.on(NetEvent_1.NetLogin.UserWxLogin, this, this.onLogin);
        this.loadLocalAccountInfo();
    };
    //加载本地账号信息
    LoginModel.prototype.loadLocalAccountInfo = function () {
        this.localPhone = Global.Setting.storage.get(HallStorageKey_1.default.Phone);
        this.localPwd = Global.Setting.storage.get(HallStorageKey_1.default.Pwd);
        this.localAreaCode = Global.Setting.storage.get(HallStorageKey_1.default.AreaCode);
    };
    LoginModel.prototype.loadLocalMd5 = function () {
        var md5 = Global.Setting.storage.get(this.CONFIG_MD5_KEY);
        return md5;
    };
    LoginModel.prototype.loadConfig = function () {
        var cfgStr = Global.Setting.storage.get(this.CONFIG_KEY);
        if (cfgStr != null && cfgStr != "") {
            try {
                var cfg = JSON.parse(cfgStr);
                return cfg;
            }
            catch (e) {
                Logger.error("解析config 失败");
                return null;
            }
        }
        return null;
    };
    LoginModel.prototype.onLogin = function (netMsg) {
        var _this = this;
        var serverCfg = netMsg;
        if (!serverCfg.routes || serverCfg.routes.length == 0) {
            Logger.error("没有配置server地址, 检查key 和 sign");
            return;
        }
        this.savePhoneInfo();
        Global.AppUpdateHelper.showLoginUpdateDlg();
        if (netMsg && netMsg.merge_point) {
            HallPopMsgHelper_1.default.Instance.addMsgList(HallPopMsgHelper_1.PopWndName.MegePoint, function () {
                HallPopMsgHelper_1.default.Instance.addLock(HallPopMsgHelper_1.PopWndName.MegePoint);
                Global.UI.show("WndRebateGet", netMsg.merge_point, HallPopMsgHelper_1.BindAwardUIType.MegePoint);
            });
        }
        // let hallUrl = this.getServerUrl(serverCfg.routes)
        var routes = Global.Setting.Urls.hallRoutes;
        if (routes == null)
            routes = new ServerRoutes_1.default();
        routes.parse(serverCfg.routes);
        Global.Setting.Urls.hallRoutes = routes;
        //添加登录线路
        var lroutes = serverCfg.lroutes;
        if (lroutes && lroutes.length > 0) {
            Logger.error("set lroutes");
            //校验登录线路合法性
            var loginServerRoutes = new ServerRoutes_1.default();
            loginServerRoutes.parse(lroutes);
            if (loginServerRoutes.getRouteLen() > 0) {
                // Logger.error("lroutes is valid")
                Global.Setting.storage.setObject(HallStorageKey_1.default.LoginRoutes, lroutes);
            }
            else {
                Logger.error("lroutes is not valid");
            }
        }
        else {
            Logger.error("lroutes is null");
        }
        var randRote = routes.getRandRoute();
        if (randRote == null) {
            Logger.error("获取serverRoute失败");
            return;
        }
        // let hallURl = "http" + serverCfg.s_addr[randIndex] + "/";
        //保存玩家信息
        Global.PlayerData.init(netMsg);
        Global.Setting.Urls.initLoginInfo(randRote.getHttpUrl(), netMsg.uid, netMsg.token);
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "requestLoginHosts", 15, "", 1, false);
        Global.DNS.requestHosts(Global.Setting.Urls.hallRoutes.getRouteArr(), function () {
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "requestLoginHosts");
            _this.doGetConfig(netMsg);
        });
        //切换场景
        Global.HallServer.run();
        this.requestTime = 0;
        this.retryTimes = 0;
        this.dealReportUrl(serverCfg);
        Global.ReportTool.ReportDevice(ReportTool_1.ReportTool.REPORT_TYPE_LOGIN);
        //Global.ChannelUtil.startSchemeForReport();
    };
    LoginModel.prototype.dealReportUrl = function (serverCfg) {
        var url = serverCfg.t_url;
        if (!url || typeof (url) != 'string') {
            return;
        }
        if (this.requestTime < 3) {
            var xhr_1 = new XMLHttpRequest(); //第一步：创建需要的对象
            var time_1 = new Date().getTime();
            var self_1 = this;
            url += cc.js.formatStr("?%s", time_1);
            xhr_1.open('GET', url, true);
            xhr_1.onreadystatechange = function () {
                if (xhr_1.readyState === 4) { //验证请求是否发送成功
                    if (xhr_1.status == 200) {
                        var off = new Date().getTime() - time_1;
                        var len = xhr_1.getResponseHeader('content-length');
                        var xip = xhr_1.getResponseHeader('xips');
                        self_1.reportParam[self_1.requestTime] = { "time": off, "len": len, "xip": xip, "test_url": url };
                        self_1.requestTime++;
                        self_1.dealReportUrl(serverCfg);
                    }
                    else {
                        Logger.error("拉取失败");
                        Logger.error("xhr.readyState", xhr_1.readyState, xhr_1.status);
                        self_1.requestTime++;
                        self_1.retryTimes++;
                        self_1.dealReportUrl(serverCfg);
                    }
                }
            }.bind(this);
            xhr_1.send();
        }
        else {
            var param = {};
            param.content = this.reportParam;
            param.retryTimes = this.retryTimes;
            var reportKey = ReportTool_1.ReportTool.REPORT_TYPE_TEST_ROUTE;
            Global.ReportTool.ReportPublicClientLog(reportKey, param, false);
            this.reportParam = [];
        }
    };
    LoginModel.prototype.doGetGamelist = function () {
        var _this = this;
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "doGetGamelist", 15, "", 1, false);
        var md5 = this.loadLocalMd5();
        var cfg = null;
        var param = {};
        if (md5 && md5 != "")
            cfg = this.loadConfig();
        if (cfg != null && cfg.length > 0 && md5) {
            param.game_sum = md5;
        }
        var megeServerFlag = Global.Toolkit.checkMegeServer();
        if (megeServerFlag) {
            param.old_app_id = parseInt(Global.Setting.SystemInfo.appID);
        }
        var device = Global.Toolkit.genDeviceInfo();
        param.hall_skin = Global.Setting.SystemInfo.hallSkin;
        param.game_skin = Global.Setting.SystemInfo.gameSkin;
        param.device = device;
        param.app_version = Global.Setting.SystemInfo.appVersion;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetGameList, param, function (data) {
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "doGetGamelist");
            if (data.game_list != null && data.game_list.length > 0) {
                cfg = data.game_list;
                var svrMd5 = data.game_sum;
                try {
                    var cfgStr = JSON.stringify(data.game_list);
                    if (!svrMd5 || svrMd5 == "")
                        svrMd5 = Global.Toolkit.md5(cfgStr);
                    Global.Setting.storage.set(_this.CONFIG_MD5_KEY, svrMd5);
                    Global.Setting.storage.set(_this.CONFIG_KEY, cfgStr);
                }
                catch (e) {
                }
            }
            //保存游戏配置
            Global.GameData.init(cfg);
        }, null, true);
    };
    LoginModel.prototype.doGetConfig = function (netMsg) {
        var _this = this;
        var md5 = this.loadLocalMd5();
        var cfg = null;
        var param = {};
        if (md5 && md5 != "")
            cfg = this.loadConfig();
        if (cfg != null && cfg.length > 0 && md5) {
            param.game_sum = md5;
        }
        var megeServerFlag = Global.Toolkit.checkMegeServer();
        if (megeServerFlag) {
            param.old_app_id = parseInt(Global.Setting.SystemInfo.appID);
        }
        var device = Global.Toolkit.genDeviceInfo();
        param.device = device;
        param.hall_skin = Global.Setting.SystemInfo.hallSkin;
        param.game_skin = Global.Setting.SystemInfo.gameSkin;
        param.app_version = Global.Setting.SystemInfo.appVersion;
        //请求游戏配置
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetConfig, param, function (data) {
            if (data.game_sum != null) {
                if (md5 && md5 != "" && md5 == data.game_sum) {
                    if (cfg != null && cfg.length > 0) {
                        Global.GameData.init(cfg);
                    }
                }
                else {
                    _this.doGetGamelist();
                }
            }
            if (data.is_daily_gift_money) {
                Global.Event.event(GlobalEvent.ShowRedSpot, [true, HallModel_1.HallRedSpotType.DailyGift]);
            }
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "NetAppface.GetConfig");
            //初始化公告轮播配置
            Global.GongGaoData.init(data.lun_bo);
            //初始化活动按钮配置
            Global.ActivityToggle.init(data.activity_list);
            //保存客服配置
            var servicerModel = Global.ModelManager.getModel("ServicerModel");
            servicerModel.initData(data.new_customer_service);
            var hallModel = Global.ModelManager.getModel("HallModel");
            hallModel.recharge_red = data.recharge_red;
            //保存分享金额
            var shareModel = Global.ModelManager.getModel("ShareModel");
            shareModel.initData(data.share_get_point);
            Global.Setting.wxFirendShareTitle = data.app_name;
            Global.Setting.wxMomentShareTitle = data.app_name;
            Global.ModelManager.getModel("RechargeModel").initData(data.new_pay_info); // 页面内请求payconfig
            //保存公告弹窗字段
            var MsgModel = Global.ModelManager.getModel("MsgModel");
            // MsgModel.SetStatus(data.notify);
            MsgModel.GetMsgList(MsgEvent_1.MsgType.All, true);
            //vip配置
            PlayerInfoModel_1.default.instance.InitData(data.vip_cfg);
            PlayerInfoModel_1.default.instance.vip_reward = data.vip_reward;
            PlayerInfoModel_1.default.instance.is_vip_reward = data.is_vip_reward;
            PlayerInfoModel_1.default.instance.InitSubsidy(data.subsidy_point);
            var BindingGiftModel = Global.ModelManager.getModel("BindingGiftModel");
            if (BindingGiftModel) {
                BindingGiftModel.SetStatus(netMsg.user_type != 2 && data.give_cfg.bind_point != 0);
                BindingGiftModel.BindAwardNum = data.give_cfg.bind_point;
            }
            Global.Setting.Urls.setInviteUrl(data.self_pack_url);
            var SpreadModel = Global.ModelManager.getModel("SpreadModel");
            SpreadModel.startRequestShortUrl(data.self_pack_url);
            SpreadModel.RedFLag = (data.per_cent_point > 0);
            SpreadModel.commiType = data.commi_type;
            SpreadModel.Rate = data.percent_rate;
            SpreadModel.SelfRate = data.self_rate;
            SpreadModel.RankType = data.rank_type;
            var rebateData = data.back_point;
            var isNotGet = !!data.back_point_status; // 0 已领取
            var rechargeGiftModel = Global.ModelManager.getModel("RechargeGiftModel");
            if (data.limit_time_first_pay_activity) {
                rechargeGiftModel.CountDown = data.limit_time_first_pay_activity.countdown;
                rechargeGiftModel.TimelimitedStatus = data.limit_time_first_pay_activity.status;
            }
            var commisionModel = Global.ModelManager.getModel("CommisionModel");
            if (commisionModel) {
                commisionModel.redSwitch = data.task_num > 0;
            }
            //所有活动列表
            if (data.activity_list) {
                var activity_list = data.activity_list;
                // let hallModel = <HallModel>Global.ModelManager.getModel("HallModel");
                if (activity_list.length > 0) {
                    //是否显示活动中心按钮[大于0显示
                    // hallModel.isShowActivityCenter = true;
                    // //是否自动弹出活动中心[1弹出
                    // if(data.top_active==1){
                    //     HallPopMsgHelper.Instance.addMsgList(PopWndName.ActivityCenter, ()=>{
                    //         HallPopMsgHelper.Instance.addLock(PopWndName.ActivityCenter);
                    //         Global.UI.show("WndActivityCenter");
                    //     });
                    // }
                    for (var i = 0; i < activity_list.length; i++) {
                        var activity = activity_list[i];
                        if (activity.atype && activity.atype == 4) { //充值返利
                            rechargeGiftModel.Status = (activity.satus == 1);
                            rechargeGiftModel.Switch = true;
                        }
                        // else if (activity.atype && activity.atype == 5) { //大转盘
                        //     ZhuanpanModel.instance.bOpen = true;
                        //     // var bOpen:boolean = Global.ActivityToggle.checkActivityToggle(12006);
                        //     // ZhuanpanModel.instance.SetStatus(bOpen);
                        // }
                    }
                }
            }
            // isNotGet = true;
            // rebateData = {idate: 10000, point: 1235460};
            // Global.ModelManager.getModel("RebateModel").initPushData(rebateData, isNotGet);
            AppHelper_1.default.afterGetConfig();
            _this.CheckBaiduState(data);
            Global.SceneManager.goToHall();
        }, null, true);
    };
    LoginModel.prototype.CheckBaiduState = function (data) {
        if (data == null) {
            return;
        }
        var BindingGiftModel = Global.ModelManager.getModel("BindingGiftModel");
        if (data.activity_list) {
            var activity_list = data.activity_list;
            var hallModel = Global.ModelManager.getModel("HallModel");
            if (activity_list.length > 0) {
                //是否显示活动中心按钮[大于0显示
                hallModel.isShowActivityCenter = true;
                if (data.notify_popup == 1) {
                    HallPopMsgHelper_1.default.Instance.addMsgList(HallPopMsgHelper_1.PopWndName.ActivityCenter, function () {
                        HallPopMsgHelper_1.default.Instance.addLock(HallPopMsgHelper_1.PopWndName.ActivityCenter);
                        HallBtnHelper_1.default.WndActivityOpen();
                    });
                }
                ;
                //是否自动弹出活动中心[1弹出
                // if (!baidustate && data.notify_popup == 1) {
                //     HallPopMsgHelper.Instance.addMsgList(PopWndName.ActivityCenter, () => {
                //         HallPopMsgHelper.Instance.addLock(PopWndName.ActivityCenter);
                //         Global.UI.show("WndActivityCenter");
                //     });
                // }
            }
        }
        if (data.share_popup == 1) {
            HallPopMsgHelper_1.default.Instance.addMsgList(HallPopMsgHelper_1.PopWndName.Spread, function () {
                HallPopMsgHelper_1.default.Instance.addLock(HallPopMsgHelper_1.PopWndName.Spread);
                HallBtnHelper_1.default.WndSpreadCenterOpen();
            });
        }
        if (data.mail_popup == 1) {
            HallPopMsgHelper_1.default.Instance.addMsgList(HallPopMsgHelper_1.PopWndName.Mail, function () {
                HallPopMsgHelper_1.default.Instance.addLock(HallPopMsgHelper_1.PopWndName.Mail);
                HallBtnHelper_1.default.WndMailOpen();
            });
        }
        if (data.bind_popup == 1 && BindingGiftModel.Status) {
            HallPopMsgHelper_1.default.Instance.addMsgList(HallPopMsgHelper_1.PopWndName.BindGift, function () {
                HallPopMsgHelper_1.default.Instance.addLock(HallPopMsgHelper_1.PopWndName.BindGift);
                Global.UI.show("WndBindingGift");
            });
        }
        this.sortPopUp(data.activity_list);
    };
    LoginModel.prototype.sortPopUp = function (activity_list) {
        if (!activity_list || activity_list.length == 0)
            return;
        activity_list.sort(function (a, b) { return a.sort - b.sort; });
        var _loop_1 = function (index) {
            var obj = activity_list[index];
            if (obj && obj.pop_ups === 1 && obj.atype) {
                HallPopMsgHelper_1.default.Instance.addMsgList(obj.atype, function () {
                    HallPopMsgHelper_1.default.Instance.addLock(obj.atype);
                    HallBtnHelper_1.default.ShowActivity(obj.atype);
                }, obj.sort + 10);
            }
        };
        for (var index = 0; index < activity_list.length; index++) {
            _loop_1(index);
        }
    };
    //自动登录
    LoginModel.prototype.reqAutoLogin = function (token, uid, errorFunc) {
        this.clearTmpPhone();
        var param = this.getLoginParam(token, uid, this.AUTO_LOGIN);
        Global.HallServer.sendLogin(NetEvent_1.NetLogin.VisitorLogin, param, null, errorFunc);
    };
    //游客登录
    LoginModel.prototype.reqVisitorLogin = function () {
        this.clearTmpPhone();
        // if(this.localPhone != "" && this.localPwd != null)
        // {
        //     this.reqPhoneLogin(this.localPhone, this.localPwd, this.localAreaCode);
        //     return;
        // }
        var param = this.getLoginParam("", null, this.MANUAL_LOGIN);
        //先取本地缓存
        Global.HallServer.sendLogin(NetEvent_1.NetLogin.VisitorLogin, param, null, null, true);
    };
    //手机登录
    //pwd 需要外部自己md5处理
    LoginModel.prototype.reqPhoneLogin = function (phoneNum, pwd, area, oldAppid) {
        var param = this.getLoginParam("", null, this.MANUAL_LOGIN);
        param.phone = Global.AESUtil.aesEncrypt(Global.Toolkit.cryptoKey, Global.Toolkit.cryptoIv, phoneNum);
        param.acode = area;
        param.pwd = pwd;
        var megeServerFlag = Global.Toolkit.checkMegeServer();
        if (megeServerFlag) {
            param.old_app_id = parseInt(Global.Setting.SystemInfo.appID);
        }
        this.tmpArea = area;
        this.tmpPhone = phoneNum;
        this.tmpPwd = pwd;
        Global.HallServer.sendLogin(NetEvent_1.NetLogin.UserPhoneLogin, param, null, null, true);
    };
    //微信登录
    LoginModel.prototype.reqWxLogin = function (access_token, subtype) {
        var param = this.getLoginParam("", null, this.MANUAL_LOGIN);
        param.sub_type = subtype;
        param.code = access_token;
        Global.HallServer.sendLogin(NetEvent_1.NetLogin.UserWxLogin, param, null, null, true);
    };
    //注册
    LoginModel.prototype.reqRegist = function (phoneNum, pwd, area, code, inviteCode) {
        var _this = this;
        //后续和服务器重新对参数
        var param = this.getLoginParam("");
        param.phone = Global.AESUtil.aesEncrypt(Global.Toolkit.cryptoKey, Global.Toolkit.cryptoIv, phoneNum);
        param.pwd = pwd;
        param.code = code;
        param.acode = area;
        param.device = Global.Toolkit.genDeviceInfo();
        if (inviteCode != null && inviteCode != "" && !isNaN(Number(inviteCode))) {
            param.invite_code = Number(inviteCode);
        }
        Global.HallServer.sendLogin(NetEvent_1.NetLogin.UserRegister, param, function (msg) {
            //提示注册成功
            Global.UI.close("WndRegist");
            //自动登录
            _this.reqPhoneLogin(phoneNum, pwd, area);
        });
    };
    //获取短信验证码
    //type 1 注册 绑定手机 2 修改密码 忘记密码
    LoginModel.prototype.reqGetPhoneVerifyCode = function (phoneNum, type, area, complete) {
        var param = {};
        param.acode = area;
        param.uid = Global.PlayerData.uid || 0;
        param.phone = Global.AESUtil.aesEncrypt(Global.Toolkit.cryptoKey, Global.Toolkit.cryptoIv, phoneNum);
        param.appid = Global.Setting.appId;
        param.code_type = type;
        param.device = Global.Toolkit.genDeviceInfo();
        Global.HallServer.sendVerifyCode(NetEvent_1.NetVerifyCode.GetPhoneVerifyCode, param, complete);
    };
    //修改密码
    LoginModel.prototype.reqChangePwd = function (phoneNum, pwd, code, area) {
        var param = {};
        param.acode = area;
        param.phone = Global.AESUtil.aesEncrypt(Global.Toolkit.cryptoKey, Global.Toolkit.cryptoIv, phoneNum);
        ;
        param.appid = Global.Setting.appId;
        param.pwd = pwd;
        param.code = code;
        Global.HallServer.sendVerifyCode(NetEvent_1.NetVerifyCode.ForgetPwd, param, function () {
            Global.UI.fastTip("密码修改成功");
            Global.UI.close("WndChangePwd");
            Global.UI.close("WndForgetPwd");
        });
    };
    LoginModel.prototype.getLoginParam = function (token, uid, type) {
        if (uid === void 0) { uid = null; }
        if (type === void 0) { type = this.MANUAL_LOGIN; }
        if (isNaN(uid))
            uid = null;
        var param = {};
        var udid = "0";
        if (Global.Setting.SystemInfo && Global.Setting.SystemInfo.udid) {
            udid = Global.Setting.SystemInfo.udid.toString();
        }
        param.udid = udid;
        param.appid = Global.Setting.appId;
        if (uid)
            param.uid = uid;
        if (token)
            param.token = token;
        param.type = type;
        param.reg_info = Global.Toolkit.genRegInfo();
        param.sign = Global.Setting.SystemInfo.loginSign;
        param.pack = Global.Setting.ChannelInfo.getRegistChannel();
        param.invite_code = Global.Setting.ChannelInfo.getInviteId();
        param.source_type = Global.Setting.ChannelInfo.sourceType;
        param.head_img = (Math.floor(Math.random() * (Global.Setting.headNameRange)) + 1).toString();
        param.device = Global.Toolkit.genDeviceInfo();
        return param;
    };
    LoginModel.prototype.savePhoneInfo = function () {
        if (!this.tmpPhone || !this.tmpPwd || !this.tmpArea)
            return;
        this.localPhone = this.tmpPhone;
        this.localPwd = this.tmpPwd;
        this.localAreaCode = this.tmpArea;
        Global.Setting.storage.set(HallStorageKey_1.default.Phone, this.localPhone);
        Global.Setting.storage.set(HallStorageKey_1.default.Pwd, this.tmpPwd);
        Global.Setting.storage.set(HallStorageKey_1.default.AreaCode, this.localAreaCode);
        this.clearTmpPhone();
    };
    LoginModel.prototype.clearTmpPhone = function () {
        this.tmpArea = null;
        this.tmpPhone = null;
        this.tmpPwd = null;
    };
    return LoginModel;
}(ModelBase_1.default));
exports.default = LoginModel;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZGVsXFxMb2dpbk1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdFQUEyRDtBQUMzRCx5REFBbUY7QUFDbkYsMERBQXFEO0FBQ3JELGdFQUFnRjtBQUNoRix1REFBcUQ7QUFDckQsdURBQWtEO0FBQ2xELHFEQUFnRDtBQUNoRCx5Q0FBeUQ7QUFDekQscUVBQWlHO0FBQ2pHLHdFQUFtRTtBQUNuRSx5REFBd0Q7QUFFeEQ7SUFBd0MsOEJBQVM7SUFBakQ7UUFBQSxxRUEwakJDO1FBempCRyxPQUFPO1FBQ1AsTUFBTTtRQUNFLGtCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLE1BQU07UUFDRSxnQkFBVSxHQUFHLENBQUMsQ0FBQztRQU1mLGlCQUFXLEdBQUcsRUFBRSxDQUFBO1FBRWhCLGdCQUFVLEdBQUcsQ0FBQyxDQUFBLENBQUMsa0JBQWtCO1FBTWpDLGlCQUFXLEdBQUcsQ0FBQyxDQUFBLENBQUMsYUFBYTtRQUU3QixvQkFBYyxHQUFHLGdCQUFnQixDQUFDO1FBQ2xDLGdCQUFVLEdBQUcsWUFBWSxDQUFDO1FBRWxDLFdBQVc7UUFDSixnQkFBVSxHQUFHLElBQUksQ0FBQzs7SUFpaUI3QixDQUFDO0lBL2hCRyxzQkFBVyw0QkFBSTthQUFmO1lBQ0ksT0FBTyxZQUFZLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFFUywyQkFBTSxHQUFoQjtRQUNJLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLG1CQUFRLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsbUJBQVEsQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRSxNQUFNLENBQUMsVUFBVSxD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RCxDQTFqQkEsQUEwakJDLENBMWpCdUMsbUJBQVMsR0EwakJoRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNb2RlbEJhc2UgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9tb2RlbC9Nb2RlbEJhc2VcIjtcclxuaW1wb3J0IHsgTmV0TG9naW4sIE5ldFZlcmlmeUNvZGUsIE5ldEFwcGZhY2UgfSBmcm9tIFwiLi4vLi4vY29yZS9uZXQvaGFsbC9OZXRFdmVudFwiO1xyXG5pbXBvcnQgSGFsbFN0b3JhZ2VLZXkgZnJvbSBcIi4uL2NvbnN0L0hhbGxTdG9yYWdlS2V5XCI7XHJcbmltcG9ydCBTZXJ2ZXJSb3V0ZXMsIHsgU2VydmVyUm91dGVJbmZvIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2V0dGluZy9TZXJ2ZXJSb3V0ZXNcIjtcclxuaW1wb3J0IHsgTXNnVHlwZSB9IGZyb20gXCIuLi8uLi9oYWxsL3VpL21zZy9Nc2dFdmVudFwiO1xyXG5pbXBvcnQgQXBwSGVscGVyIGZyb20gXCIuLi8uLi9jb3JlL3Rvb2wvQXBwSGVscGVyXCI7XHJcbmltcG9ydCBQbGF5ZXJJbmZvTW9kZWwgZnJvbSBcIi4vUGxheWVySW5mb01vZGVsXCI7XHJcbmltcG9ydCBIYWxsTW9kZWwsIHsgSGFsbFJlZFNwb3RUeXBlIH0gZnJvbSBcIi4vSGFsbE1vZGVsXCI7XHJcbmltcG9ydCBIYWxsUG9wTXNnSGVscGVyLCB7IFBvcFduZE5hbWUsIEJpbmRBd2FyZFVJVHlwZSB9IGZyb20gXCIuLi8uLi9oYWxsL3Rvb2wvSGFsbFBvcE1zZ0hlbHBlclwiO1xyXG5pbXBvcnQgSGFsbEJ0bkhlbHBlciBmcm9tIFwiLi4vLi4vaGFsbC91aS9oYWxsL3ZpZXdzL0hhbGxCdG5IZWxwZXJcIjtcclxuaW1wb3J0IHsgUmVwb3J0VG9vbCB9IGZyb20gXCIuLi8uLi9jb3JlL3Rvb2wvUmVwb3J0VG9vbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naW5Nb2RlbCBleHRlbmRzIE1vZGVsQmFzZSB7XHJcbiAgICAvL+eZu+W9leaWueW8jyBcclxuICAgIC8v5omL5Yqo55m75b2VXHJcbiAgICBwcml2YXRlIE1BTlVBTF9MT0dJTiA9IDE7XHJcbiAgICAvL+iHquWKqOeZu+W9lVxyXG4gICAgcHJpdmF0ZSBBVVRPX0xPR0lOID0gMjtcclxuXHJcbiAgICBwdWJsaWMgbG9jYWxQaG9uZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGxvY2FsUHdkOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgbG9jYWxBcmVhQ29kZTogc3RyaW5nO1xyXG5cclxuICAgIHByaXZhdGUgcmVwb3J0UGFyYW0gPSBbXVxyXG5cclxuICAgIHByaXZhdGUgcmV0cnlUaW1lcyA9IDAgLy/nlKjkuo5URVNUX1JPVVRF6YeN6K+V6K6h5pWwXHJcblxyXG4gICAgLy/njqnlrrblvZPliY3ovpPlhaXnmoTlgLwg77yM55m75b2V5oiQ5Yqf5ZCO5omN55Sf5pWIXHJcbiAgICBwcml2YXRlIHRtcFBob25lOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHRtcFB3ZDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSB0bXBBcmVhOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHJlcXVlc3RUaW1lID0gMCAvL+eUqOS6juivt+axgnRfdXJs6K6h5pWwXHJcblxyXG4gICAgcHJpdmF0ZSBDT05GSUdfTUQ1X0tFWSA9IFwiQ09ORklHX01ENV9LRVlcIjtcclxuICAgIHByaXZhdGUgQ09ORklHX0tFWSA9IFwiQ09ORklHX0tFWVwiO1xyXG5cclxuICAgIC8v56ys5LiA5qyh6L+b5YWl55m75b2V5Zy65pmvXHJcbiAgICBwdWJsaWMgZmlyc3RMb2dpbiA9IHRydWU7XHJcblxyXG4gICAgcHVibGljIGdldCBOYW1lKCkge1xyXG4gICAgICAgIHJldHVybiBcIkxvZ2luTW9kZWxcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCkge1xyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLm9uKE5ldExvZ2luLlZpc2l0b3JMb2dpbiwgdGhpcywgdGhpcy5vbkxvZ2luKTtcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5vbihOZXRMb2dpbi5Vc2VyUGhvbmVMb2dpbiwgdGhpcywgdGhpcy5vbkxvZ2luKTtcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5vbihOZXRMb2dpbi5Vc2VyV3hMb2dpbiwgdGhpcywgdGhpcy5vbkxvZ2luKVxyXG4gICAgICAgIHRoaXMubG9hZExvY2FsQWNjb3VudEluZm8oKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WKoOi9veacrOWcsOi0puWPt+S/oeaBr1xyXG4gICAgcHJvdGVjdGVkIGxvYWRMb2NhbEFjY291bnRJbmZvKCkge1xyXG4gICAgICAgIHRoaXMubG9jYWxQaG9uZSA9IEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2UuZ2V0KEhhbGxTdG9yYWdlS2V5LlBob25lKTtcclxuICAgICAgICB0aGlzLmxvY2FsUHdkID0gR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5nZXQoSGFsbFN0b3JhZ2VLZXkuUHdkKTtcclxuICAgICAgICB0aGlzLmxvY2FsQXJlYUNvZGUgPSBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLmdldChIYWxsU3RvcmFnZUtleS5BcmVhQ29kZSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwcml2YXRlIGxvYWRMb2NhbE1kNSgpIHtcclxuICAgICAgICBsZXQgbWQ1ID0gR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5nZXQodGhpcy5DT05GSUdfTUQ1X0tFWSk7XHJcbiAgICAgICAgcmV0dXJuIG1kNTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRDb25maWcoKSB7XHJcbiAgICAgICAgbGV0IGNmZ1N0ciA9IEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2UuZ2V0KHRoaXMuQ09ORklHX0tFWSk7XHJcbiAgICAgICAgaWYgKGNmZ1N0ciAhPSBudWxsICYmIGNmZ1N0ciAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2ZnID0gSlNPTi5wYXJzZShjZmdTdHIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNmZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi6Kej5p6QY29uZmlnIOWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2dpbihuZXRNc2cpIHtcclxuICAgICAgICBsZXQgc2VydmVyQ2ZnID0gbmV0TXNnO1xyXG4gICAgICAgIGlmICghc2VydmVyQ2ZnLnJvdXRlcyB8fCBzZXJ2ZXJDZmcucm91dGVzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuayoeaciemFjee9rnNlcnZlcuWcsOWdgCwg5qOA5p+la2V5IOWSjCBzaWduXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2F2ZVBob25lSW5mbygpO1xyXG4gICAgICAgIEdsb2JhbC5BcHBVcGRhdGVIZWxwZXIuc2hvd0xvZ2luVXBkYXRlRGxnKClcclxuICAgICAgICBpZiAobmV0TXNnICYmIG5ldE1zZy5tZXJnZV9wb2ludCkge1xyXG4gICAgICAgICAgICBIYWxsUG9wTXNnSGVscGVyLkluc3RhbmNlLmFkZE1zZ0xpc3QoUG9wV25kTmFtZS5NZWdlUG9pbnQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIEhhbGxQb3BNc2dIZWxwZXIuSW5zdGFuY2UuYWRkTG9jayhQb3BXbmROYW1lLk1lZ2VQb2ludCk7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZFJlYmF0ZUdldFwiLCBuZXRNc2cubWVyZ2VfcG9pbnQsIEJpbmRBd2FyZFVJVHlwZS5NZWdlUG9pbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLyBsZXQgaGFsbFVybCA9IHRoaXMuZ2V0U2VydmVyVXJsKHNlcnZlckNmZy5yb3V0ZXMpXHJcbiAgICAgICAgbGV0IHJvdXRlcyA9IEdsb2JhbC5TZXR0aW5nLlVybHMuaGFsbFJvdXRlcztcclxuICAgICAgICBpZiAocm91dGVzID09IG51bGwpXHJcbiAgICAgICAgICAgIHJvdXRlcyA9IG5ldyBTZXJ2ZXJSb3V0ZXMoKTtcclxuICAgICAgICByb3V0ZXMucGFyc2Uoc2VydmVyQ2ZnLnJvdXRlcyk7XHJcbiAgICAgICAgR2xvYmFsLlNldHRpbmcuVXJscy5oYWxsUm91dGVzID0gcm91dGVzO1xyXG5cclxuICAgICAgICAvL+a3u+WKoOeZu+W9lee6v+i3r1xyXG4gICAgICAgIGxldCBscm91dGVzID0gc2VydmVyQ2ZnLmxyb3V0ZXNcclxuICAgICAgICBpZiAobHJvdXRlcyAmJiBscm91dGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwic2V0IGxyb3V0ZXNcIilcclxuICAgICAgICAgICAgLy/moKHpqoznmbvlvZXnur/ot6/lkIjms5XmgKdcclxuICAgICAgICAgICAgbGV0IGxvZ2luU2VydmVyUm91dGVzID0gbmV3IFNlcnZlclJvdXRlcygpO1xyXG4gICAgICAgICAgICBsb2dpblNlcnZlclJvdXRlcy5wYXJzZShscm91dGVzKVxyXG4gICAgICAgICAgICBpZiAobG9naW5TZXJ2ZXJSb3V0ZXMuZ2V0Um91dGVMZW4oKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIExvZ2dlci5lcnJvcihcImxyb3V0ZXMgaXMgdmFsaWRcIilcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2Uuc2V0T2JqZWN0KEhhbGxTdG9yYWdlS2V5LkxvZ2luUm91dGVzLCBscm91dGVzKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwibHJvdXRlcyBpcyBub3QgdmFsaWRcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImxyb3V0ZXMgaXMgbnVsbFwiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJhbmRSb3RlID0gcm91dGVzLmdldFJhbmRSb3V0ZSgpO1xyXG4gICAgICAgIGlmIChyYW5kUm90ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuiOt+WPlnNlcnZlclJvdXRl5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBsZXQgaGFsbFVSbCA9IFwiaHR0cFwiICsgc2VydmVyQ2ZnLnNfYWRkcltyYW5kSW5kZXhdICsgXCIvXCI7XHJcbiAgICAgICAgLy/kv53lrZjnjqnlrrbkv6Hmga9cclxuICAgICAgICBHbG9iYWwuUGxheWVyRGF0YS5pbml0KG5ldE1zZyk7XHJcblxyXG4gICAgICAgIEdsb2JhbC5TZXR0aW5nLlVybHMuaW5pdExvZ2luSW5mbyhyYW5kUm90ZS5nZXRIdHRwVXJsKCksIG5ldE1zZy51aWQsIG5ldE1zZy50b2tlbik7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNIT1dfTkVUX1dBSVRJTkcsXCJyZXF1ZXN0TG9naW5Ib3N0c1wiLDE1LFwiXCIsMSxmYWxzZSlcclxuICAgICAgICBHbG9iYWwuRE5TLnJlcXVlc3RIb3N0cyhHbG9iYWwuU2V0dGluZy5VcmxzLmhhbGxSb3V0ZXMuZ2V0Um91dGVBcnIoKSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuSElERV9ORVRfV0FJVElORywgXCJyZXF1ZXN0TG9naW5Ib3N0c1wiKVxyXG4gICAgICAgICAgICB0aGlzLmRvR2V0Q29uZmlnKG5ldE1zZyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8v5YiH5o2i5Zy65pmvXHJcblxyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnJ1bigpO1xyXG4gICAgICAgIHRoaXMucmVxdWVzdFRpbWUgPSAwXHJcbiAgICAgICAgdGhpcy5yZXRyeVRpbWVzID0gMFxyXG4gICAgICAgIHRoaXMuZGVhbFJlcG9ydFVybChzZXJ2ZXJDZmcpXHJcblxyXG4gICAgICAgIEdsb2JhbC5SZXBvcnRUb29sLlJlcG9ydERldmljZShSZXBvcnRUb29sLlJFUE9SVF9UWVBFX0xPR0lOKTtcclxuXHJcbiAgICAgICAgLy9HbG9iYWwuQ2hhbm5lbFV0aWwuc3RhcnRTY2hlbWVGb3JSZXBvcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWFsUmVwb3J0VXJsKHNlcnZlckNmZzogYW55KSB7XHJcblxyXG4gICAgICAgIGxldCB1cmwgPSBzZXJ2ZXJDZmcudF91cmxcclxuICAgICAgICBpZiAoIXVybCB8fCB0eXBlb2YgKHVybCkgIT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnJlcXVlc3RUaW1lIDwgMykge1xyXG4gICAgICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7Ly/nrKzkuIDmraXvvJrliJvlu7rpnIDopoHnmoTlr7nosaFcclxuICAgICAgICAgICAgbGV0IHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgdXJsICs9IGNjLmpzLmZvcm1hdFN0cihcIj8lc1wiLCB0aW1lKVxyXG4gICAgICAgICAgICB4aHIub3BlbignR0VUJywgdXJsLCB0cnVlKTtcclxuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHsvL+ivt+axguWQjueahOWbnuiwg+aOpeWPo++8jOWPr+Wwhuivt+axguaIkOWKn+WQjuimgeaJp+ihjOeahOeoi+W6j+WGmeWcqOWFtuS4rVxyXG4gICAgICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7Ly/pqozor4Hor7fmsYLmmK/lkKblj5HpgIHmiJDlip9cclxuICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9mZiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGltZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGVuID0geGhyLmdldFJlc3BvbnNlSGVhZGVyKCdjb250ZW50LWxlbmd0aCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB4aXAgPSB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ3hpcHMnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlcG9ydFBhcmFtW3NlbGYucmVxdWVzdFRpbWVdID0geyBcInRpbWVcIjogb2ZmLCBcImxlblwiOiBsZW4sIFwieGlwXCI6IHhpcCwgXCJ0ZXN0X3VybFwiOiB1cmwgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlcXVlc3RUaW1lKytcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kZWFsUmVwb3J0VXJsKHNlcnZlckNmZylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuaLieWPluWksei0pVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJ4aHIucmVhZHlTdGF0ZVwiLCB4aHIucmVhZHlTdGF0ZSwgeGhyLnN0YXR1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXF1ZXN0VGltZSsrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmV0cnlUaW1lcysrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZGVhbFJlcG9ydFVybChzZXJ2ZXJDZmcpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtOiBhbnkgPSB7fVxyXG4gICAgICAgICAgICBwYXJhbS5jb250ZW50ID0gdGhpcy5yZXBvcnRQYXJhbVxyXG4gICAgICAgICAgICBwYXJhbS5yZXRyeVRpbWVzID0gdGhpcy5yZXRyeVRpbWVzXHJcbiAgICAgICAgICAgIGxldCByZXBvcnRLZXkgPSBSZXBvcnRUb29sLlJFUE9SVF9UWVBFX1RFU1RfUk9VVEVcclxuICAgICAgICAgICAgR2xvYmFsLlJlcG9ydFRvb2wuUmVwb3J0UHVibGljQ2xpZW50TG9nKHJlcG9ydEtleSwgcGFyYW0sIGZhbHNlKVxyXG4gICAgICAgICAgICB0aGlzLnJlcG9ydFBhcmFtID0gW11cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZG9HZXRHYW1lbGlzdCgpIHtcclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuU0hPV19ORVRfV0FJVElORyxcImRvR2V0R2FtZWxpc3RcIiwxNSxcIlwiLDEsZmFsc2UpXHJcbiAgICAgICAgbGV0IG1kNSA9IHRoaXMubG9hZExvY2FsTWQ1KCk7XHJcbiAgICAgICAgbGV0IGNmZyA9IG51bGw7XHJcbiAgICAgICAgbGV0IHBhcmFtOiBhbnkgPSB7fTtcclxuICAgICAgICBpZiAobWQ1ICYmIG1kNSAhPSBcIlwiKVxyXG4gICAgICAgICAgICBjZmcgPSB0aGlzLmxvYWRDb25maWcoKTtcclxuXHJcbiAgICAgICAgaWYgKGNmZyAhPSBudWxsICYmIGNmZy5sZW5ndGggPiAwICYmIG1kNSkge1xyXG4gICAgICAgICAgICBwYXJhbS5nYW1lX3N1bSA9IG1kNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1lZ2VTZXJ2ZXJGbGFnID0gR2xvYmFsLlRvb2xraXQuY2hlY2tNZWdlU2VydmVyKClcclxuICAgICAgICBpZiAobWVnZVNlcnZlckZsYWcpIHtcclxuICAgICAgICAgICAgcGFyYW0ub2xkX2FwcF9pZCA9IHBhcnNlSW50KEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uYXBwSUQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkZXZpY2UgPSBHbG9iYWwuVG9vbGtpdC5nZW5EZXZpY2VJbmZvKCk7XHJcbiAgICAgICAgcGFyYW0uaGFsbF9za2luID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5oYWxsU2tpbjtcclxuICAgICAgICBwYXJhbS5nYW1lX3NraW4gPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmdhbWVTa2luO1xyXG4gICAgICAgIHBhcmFtLmRldmljZSA9IGRldmljZVxyXG4gICAgICAgIHBhcmFtLmFwcF92ZXJzaW9uID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5hcHBWZXJzaW9uXHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXRHYW1lTGlzdCwgcGFyYW0sIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5ISURFX05FVF9XQUlUSU5HLCBcImRvR2V0R2FtZWxpc3RcIik7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmdhbWVfbGlzdCAhPSBudWxsICYmIGRhdGEuZ2FtZV9saXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNmZyA9IGRhdGEuZ2FtZV9saXN0O1xyXG4gICAgICAgICAgICAgICAgbGV0IHN2ck1kNSA9IGRhdGEuZ2FtZV9zdW07XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjZmdTdHIgPSBKU09OLnN0cmluZ2lmeShkYXRhLmdhbWVfbGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdnJNZDUgfHwgc3ZyTWQ1ID09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN2ck1kNSA9IEdsb2JhbC5Ub29sa2l0Lm1kNShjZmdTdHIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2Uuc2V0KHRoaXMuQ09ORklHX01ENV9LRVksIHN2ck1kNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5zZXQodGhpcy5DT05GSUdfS0VZLCBjZmdTdHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/kv53lrZjmuLjmiI/phY3nva5cclxuICAgICAgICAgICAgR2xvYmFsLkdhbWVEYXRhLmluaXQoY2ZnKTtcclxuICAgICAgICB9LCBudWxsLCB0cnVlKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkb0dldENvbmZpZyhuZXRNc2cpIHtcclxuICAgICAgICBsZXQgbWQ1ID0gdGhpcy5sb2FkTG9jYWxNZDUoKTtcclxuICAgICAgICBsZXQgY2ZnID0gbnVsbDtcclxuICAgICAgICBsZXQgcGFyYW06IGFueSA9IHt9O1xyXG4gICAgICAgIGlmIChtZDUgJiYgbWQ1ICE9IFwiXCIpXHJcbiAgICAgICAgICAgIGNmZyA9IHRoaXMubG9hZENvbmZpZygpO1xyXG5cclxuICAgICAgICBpZiAoY2ZnICE9IG51bGwgJiYgY2ZnLmxlbmd0aCA+IDAgJiYgbWQ1KSB7XHJcbiAgICAgICAgICAgIHBhcmFtLmdhbWVfc3VtID0gbWQ1O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWVnZVNlcnZlckZsYWcgPSBHbG9iYWwuVG9vbGtpdC5jaGVja01lZ2VTZXJ2ZXIoKVxyXG4gICAgICAgIGlmIChtZWdlU2VydmVyRmxhZykge1xyXG4gICAgICAgICAgICBwYXJhbS5vbGRfYXBwX2lkID0gcGFyc2VJbnQoR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5hcHBJRClcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRldmljZSA9IEdsb2JhbC5Ub29sa2l0LmdlbkRldmljZUluZm8oKTtcclxuICAgICAgICBwYXJhbS5kZXZpY2UgPSBkZXZpY2VcclxuICAgICAgICBwYXJhbS5oYWxsX3NraW4gPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmhhbGxTa2luO1xyXG4gICAgICAgIHBhcmFtLmdhbWVfc2tpbiA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uZ2FtZVNraW47XHJcbiAgICAgICAgcGFyYW0uYXBwX3ZlcnNpb24gPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmFwcFZlcnNpb25cclxuXHJcbiAgICAgICAgLy/or7fmsYLmuLjmiI/phY3nva5cclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkdldENvbmZpZywgcGFyYW0sIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmdhbWVfc3VtICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChtZDUgJiYgbWQ1ICE9IFwiXCIgJiYgbWQ1ID09IGRhdGEuZ2FtZV9zdW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2ZnICE9IG51bGwgJiYgY2ZnLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLkdhbWVEYXRhLmluaXQoY2ZnKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9HZXRHYW1lbGlzdCgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRhdGEuaXNfZGFpbHlfZ2lmdF9tb25leSkge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNob3dSZWRTcG90LCBbdHJ1ZSwgSGFsbFJlZFNwb3RUeXBlLkRhaWx5R2lmdF0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkhJREVfTkVUX1dBSVRJTkcsIFwiTmV0QXBwZmFjZS5HZXRDb25maWdcIik7XHJcbiAgICAgICAgICAgIC8v5Yid5aeL5YyW5YWs5ZGK6L2u5pKt6YWN572uXHJcbiAgICAgICAgICAgIEdsb2JhbC5Hb25nR2FvRGF0YS5pbml0KGRhdGEubHVuX2JvKTtcclxuICAgICAgICAgICAgLy/liJ3lp4vljJbmtLvliqjmjInpkq7phY3nva5cclxuICAgICAgICAgICAgR2xvYmFsLkFjdGl2aXR5VG9nZ2xlLmluaXQoZGF0YS5hY3Rpdml0eV9saXN0KTtcclxuICAgICAgICAgICAgLy/kv53lrZjlrqLmnI3phY3nva5cclxuICAgICAgICAgICAgdmFyIHNlcnZpY2VyTW9kZWwgPSBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiU2VydmljZXJNb2RlbFwiKTtcclxuICAgICAgICAgICAgc2VydmljZXJNb2RlbC5pbml0RGF0YShkYXRhLm5ld19jdXN0b21lcl9zZXJ2aWNlKTtcclxuICAgICAgICAgICAgbGV0IGhhbGxNb2RlbCA9IDxIYWxsTW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIkhhbGxNb2RlbFwiKTtcclxuICAgICAgICAgICAgaGFsbE1vZGVsLnJlY2hhcmdlX3JlZCA9IGRhdGEucmVjaGFyZ2VfcmVkO1xyXG4gICAgICAgICAgICAvL+S/neWtmOWIhuS6q+mHkeminVxyXG4gICAgICAgICAgICB2YXIgc2hhcmVNb2RlbCA9IEdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJTaGFyZU1vZGVsXCIpO1xyXG4gICAgICAgICAgICBzaGFyZU1vZGVsLmluaXREYXRhKGRhdGEuc2hhcmVfZ2V0X3BvaW50KTtcclxuICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcud3hGaXJlbmRTaGFyZVRpdGxlID0gZGF0YS5hcHBfbmFtZTtcclxuICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcud3hNb21lbnRTaGFyZVRpdGxlID0gZGF0YS5hcHBfbmFtZTtcclxuICAgICAgICAgICAgR2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlJlY2hhcmdlTW9kZWxcIikuaW5pdERhdGEoZGF0YS5uZXdfcGF5X2luZm8pOyAgIC8vIOmhtemdouWGheivt+axgnBheWNvbmZpZ1xyXG4gICAgICAgICAgICAvL+S/neWtmOWFrOWRiuW8ueeql+Wtl+autVxyXG4gICAgICAgICAgICB2YXIgTXNnTW9kZWwgPSBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiTXNnTW9kZWxcIik7XHJcbiAgICAgICAgICAgIC8vIE1zZ01vZGVsLlNldFN0YXR1cyhkYXRhLm5vdGlmeSk7XHJcbiAgICAgICAgICAgIE1zZ01vZGVsLkdldE1zZ0xpc3QoTXNnVHlwZS5BbGwsIHRydWUpO1xyXG4gICAgICAgICAgICAvL3ZpcOmFjee9rlxyXG4gICAgICAgICAgICBQbGF5ZXJJbmZvTW9kZWwuaW5zdGFuY2UuSW5pdERhdGEoZGF0YS52aXBfY2ZnKTtcclxuICAgICAgICAgICAgUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcF9yZXdhcmQgPSBkYXRhLnZpcF9yZXdhcmQ7XHJcbiAgICAgICAgICAgIFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS5pc192aXBfcmV3YXJkID0gZGF0YS5pc192aXBfcmV3YXJkO1xyXG4gICAgICAgICAgICBQbGF5ZXJJbmZvTW9kZWwuaW5zdGFuY2UuSW5pdFN1YnNpZHkoZGF0YS5zdWJzaWR5X3BvaW50KTtcclxuICAgICAgICAgICAgdmFyIEJpbmRpbmdHaWZ0TW9kZWwgPSBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiQmluZGluZ0dpZnRNb2RlbFwiKTtcclxuICAgICAgICAgICAgaWYgKEJpbmRpbmdHaWZ0TW9kZWwpIHtcclxuICAgICAgICAgICAgICAgIEJpbmRpbmdHaWZ0TW9kZWwuU2V0U3RhdHVzKG5ldE1zZy51c2VyX3R5cGUgIT0gMiAmJiBkYXRhLmdpdmVfY2ZnLmJpbmRfcG9pbnQgIT0gMClcclxuICAgICAgICAgICAgICAgIEJpbmRpbmdHaWZ0TW9kZWwuQmluZEF3YXJkTnVtID0gZGF0YS5naXZlX2NmZy5iaW5kX3BvaW50XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBHbG9iYWwuU2V0dGluZy5VcmxzLnNldEludml0ZVVybChkYXRhLnNlbGZfcGFja191cmwpO1xyXG5cclxuICAgICAgICAgICAgdmFyIFNwcmVhZE1vZGVsID0gR2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlNwcmVhZE1vZGVsXCIpO1xyXG4gICAgICAgICAgICBTcHJlYWRNb2RlbC5zdGFydFJlcXVlc3RTaG9ydFVybChkYXRhLnNlbGZfcGFja191cmwpXHJcbiAgICAgICAgICAgIFNwcmVhZE1vZGVsLlJlZEZMYWcgPSAoZGF0YS5wZXJfY2VudF9wb2ludCA+IDApXHJcbiAgICAgICAgICAgIFNwcmVhZE1vZGVsLmNvbW1pVHlwZSA9IGRhdGEuY29tbWlfdHlwZVxyXG4gICAgICAgICAgICBTcHJlYWRNb2RlbC5SYXRlID0gZGF0YS5wZXJjZW50X3JhdGVcclxuICAgICAgICAgICAgU3ByZWFkTW9kZWwuU2VsZlJhdGUgPSBkYXRhLnNlbGZfcmF0ZVxyXG5cclxuICAgICAgICAgICAgU3ByZWFkTW9kZWwuUmFua1R5cGUgPSBkYXRhLnJhbmtfdHlwZVxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCByZWJhdGVEYXRhID0gZGF0YS5iYWNrX3BvaW50O1xyXG4gICAgICAgICAgICBsZXQgaXNOb3RHZXQgPSAhIWRhdGEuYmFja19wb2ludF9zdGF0dXM7ICAvLyAwIOW3sumihuWPllxyXG5cclxuICAgICAgICAgICAgbGV0IHJlY2hhcmdlR2lmdE1vZGVsID0gR2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlJlY2hhcmdlR2lmdE1vZGVsXCIpXHJcbiAgICAgICAgICAgIGlmKGRhdGEubGltaXRfdGltZV9maXJzdF9wYXlfYWN0aXZpdHkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJlY2hhcmdlR2lmdE1vZGVsLkNvdW50RG93biA9IGRhdGEubGltaXRfdGltZV9maXJzdF9wYXlfYWN0aXZpdHkuY291bnRkb3duXHJcbiAgICAgICAgICAgICAgICByZWNoYXJnZUdpZnRNb2RlbC5UaW1lbGltaXRlZFN0YXR1cyA9IGRhdGEubGltaXRfdGltZV9maXJzdF9wYXlfYWN0aXZpdHkuc3RhdHVzXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgY29tbWlzaW9uTW9kZWwgPSBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiQ29tbWlzaW9uTW9kZWxcIilcclxuICAgICAgICAgICAgaWYgKGNvbW1pc2lvbk1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICBjb21taXNpb25Nb2RlbC5yZWRTd2l0Y2ggPSBkYXRhLnRhc2tfbnVtID4gMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5omA5pyJ5rS75Yqo5YiX6KGoXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmFjdGl2aXR5X2xpc3QpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhY3Rpdml0eV9saXN0ID0gZGF0YS5hY3Rpdml0eV9saXN0O1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IGhhbGxNb2RlbCA9IDxIYWxsTW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIkhhbGxNb2RlbFwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpdml0eV9saXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+aYr+WQpuaYvuekuua0u+WKqOS4reW/g+aMiemSrlvlpKfkuo4w5pi+56S6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGFsbE1vZGVsLmlzU2hvd0FjdGl2aXR5Q2VudGVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAvL+aYr+WQpuiHquWKqOW8ueWHuua0u+WKqOS4reW/g1sx5by55Ye6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYoZGF0YS50b3BfYWN0aXZlPT0xKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgSGFsbFBvcE1zZ0hlbHBlci5JbnN0YW5jZS5hZGRNc2dMaXN0KFBvcFduZE5hbWUuQWN0aXZpdHlDZW50ZXIsICgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBIYWxsUG9wTXNnSGVscGVyLkluc3RhbmNlLmFkZExvY2soUG9wV25kTmFtZS5BY3Rpdml0eUNlbnRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZEFjdGl2aXR5Q2VudGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY3Rpdml0eV9saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3Rpdml0eSA9IGFjdGl2aXR5X2xpc3RbaV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2aXR5LmF0eXBlICYmIGFjdGl2aXR5LmF0eXBlID09IDQpIHsgLy/lhYXlgLzov5TliKlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2hhcmdlR2lmdE1vZGVsLlN0YXR1cyA9IChhY3Rpdml0eS5zYXR1cyA9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaGFyZ2VHaWZ0TW9kZWwuU3dpdGNoID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVsc2UgaWYgKGFjdGl2aXR5LmF0eXBlICYmIGFjdGl2aXR5LmF0eXBlID09IDUpIHsgLy/lpKfovaznm5hcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIFpodWFucGFuTW9kZWwuaW5zdGFuY2UuYk9wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gdmFyIGJPcGVuOmJvb2xlYW4gPSBHbG9iYWwuQWN0aXZpdHlUb2dnbGUuY2hlY2tBY3Rpdml0eVRvZ2dsZSgxMjAwNik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyBaaHVhbnBhbk1vZGVsLmluc3RhbmNlLlNldFN0YXR1cyhiT3Blbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaXNOb3RHZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyByZWJhdGVEYXRhID0ge2lkYXRlOiAxMDAwMCwgcG9pbnQ6IDEyMzU0NjB9O1xyXG4gICAgICAgICAgICAvLyBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiUmViYXRlTW9kZWxcIikuaW5pdFB1c2hEYXRhKHJlYmF0ZURhdGEsIGlzTm90R2V0KTtcclxuICAgICAgICAgICAgQXBwSGVscGVyLmFmdGVyR2V0Q29uZmlnKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hlY2tCYWlkdVN0YXRlKGRhdGEpXHJcbiAgICAgICAgICAgIEdsb2JhbC5TY2VuZU1hbmFnZXIuZ29Ub0hhbGwoKTtcclxuICAgICAgICB9LCBudWxsLCB0cnVlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgQ2hlY2tCYWlkdVN0YXRlKGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgQmluZGluZ0dpZnRNb2RlbCA9IEdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJCaW5kaW5nR2lmdE1vZGVsXCIpO1xyXG4gICAgICAgIGlmIChkYXRhLmFjdGl2aXR5X2xpc3QpIHtcclxuICAgICAgICAgICAgbGV0IGFjdGl2aXR5X2xpc3QgPSBkYXRhLmFjdGl2aXR5X2xpc3Q7XHJcbiAgICAgICAgICAgIGxldCBoYWxsTW9kZWwgPSA8SGFsbE1vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJIYWxsTW9kZWxcIik7XHJcbiAgICAgICAgICAgIGlmIChhY3Rpdml0eV9saXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIC8v5piv5ZCm5pi+56S65rS75Yqo5Lit5b+D5oyJ6ZKuW+Wkp+S6jjDmmL7npLpcclxuICAgICAgICAgICAgICAgIGhhbGxNb2RlbC5pc1Nob3dBY3Rpdml0eUNlbnRlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIGRhdGEubm90aWZ5X3BvcHVwID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBIYWxsUG9wTXNnSGVscGVyLkluc3RhbmNlLmFkZE1zZ0xpc3QoUG9wV25kTmFtZS5BY3Rpdml0eUNlbnRlciwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBIYWxsUG9wTXNnSGVscGVyLkluc3RhbmNlLmFkZExvY2soUG9wV25kTmFtZS5BY3Rpdml0eUNlbnRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEhhbGxCdG5IZWxwZXIuV25kQWN0aXZpdHlPcGVuKClcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAvL+aYr+WQpuiHquWKqOW8ueWHuua0u+WKqOS4reW/g1sx5by55Ye6XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoIWJhaWR1c3RhdGUgJiYgZGF0YS5ub3RpZnlfcG9wdXAgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIEhhbGxQb3BNc2dIZWxwZXIuSW5zdGFuY2UuYWRkTXNnTGlzdChQb3BXbmROYW1lLkFjdGl2aXR5Q2VudGVyLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIEhhbGxQb3BNc2dIZWxwZXIuSW5zdGFuY2UuYWRkTG9jayhQb3BXbmROYW1lLkFjdGl2aXR5Q2VudGVyKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRBY3Rpdml0eUNlbnRlclwiKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIGRhdGEuc2hhcmVfcG9wdXAgPT0gMSkge1xyXG4gICAgICAgICAgICBIYWxsUG9wTXNnSGVscGVyLkluc3RhbmNlLmFkZE1zZ0xpc3QoUG9wV25kTmFtZS5TcHJlYWQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIEhhbGxQb3BNc2dIZWxwZXIuSW5zdGFuY2UuYWRkTG9jayhQb3BXbmROYW1lLlNwcmVhZCk7XHJcbiAgICAgICAgICAgICAgICBIYWxsQnRuSGVscGVyLlduZFNwcmVhZENlbnRlck9wZW4oKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhLm1haWxfcG9wdXAgPT0gMSApIHtcclxuICAgICAgICAgICAgSGFsbFBvcE1zZ0hlbHBlci5JbnN0YW5jZS5hZGRNc2dMaXN0KFBvcFduZE5hbWUuTWFpbCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgSGFsbFBvcE1zZ0hlbHBlci5JbnN0YW5jZS5hZGRMb2NrKFBvcFduZE5hbWUuTWFpbCk7XHJcbiAgICAgICAgICAgICAgICBIYWxsQnRuSGVscGVyLlduZE1haWxPcGVuKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIGRhdGEuYmluZF9wb3B1cCA9PSAxICYmIEJpbmRpbmdHaWZ0TW9kZWwuU3RhdHVzKSB7XHJcbiAgICAgICAgICAgIEhhbGxQb3BNc2dIZWxwZXIuSW5zdGFuY2UuYWRkTXNnTGlzdChQb3BXbmROYW1lLkJpbmRHaWZ0LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBIYWxsUG9wTXNnSGVscGVyLkluc3RhbmNlLmFkZExvY2soUG9wV25kTmFtZS5CaW5kR2lmdCk7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZEJpbmRpbmdHaWZ0XCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zb3J0UG9wVXAoZGF0YS5hY3Rpdml0eV9saXN0KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzb3J0UG9wVXAoYWN0aXZpdHlfbGlzdClcclxuICAgIHtcclxuICAgICAgICBpZighYWN0aXZpdHlfbGlzdCB8fCBhY3Rpdml0eV9saXN0Lmxlbmd0aCA9PSAwKSByZXR1cm5cclxuICAgICAgICBhY3Rpdml0eV9saXN0LnNvcnQoKGEsYik9PntyZXR1cm4gYS5zb3J0IC0gYi5zb3J0fSlcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFjdGl2aXR5X2xpc3QubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBhY3Rpdml0eV9saXN0W2luZGV4XTtcclxuICAgICAgICAgICAgaWYob2JqICYmIG9iai5wb3BfdXBzID09PSAxICYmIG9iai5hdHlwZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgSGFsbFBvcE1zZ0hlbHBlci5JbnN0YW5jZS5hZGRNc2dMaXN0KG9iai5hdHlwZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEhhbGxQb3BNc2dIZWxwZXIuSW5zdGFuY2UuYWRkTG9jayhvYmouYXR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIEhhbGxCdG5IZWxwZXIuU2hvd0FjdGl2aXR5KG9iai5hdHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9LG9iai5zb3J0ICsgMTApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvL+iHquWKqOeZu+W9lVxyXG4gICAgcHVibGljIHJlcUF1dG9Mb2dpbih0b2tlbjogc3RyaW5nLCB1aWQ6IG51bWJlciwgZXJyb3JGdW5jOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuY2xlYXJUbXBQaG9uZSgpO1xyXG4gICAgICAgIGxldCBwYXJhbSA9IHRoaXMuZ2V0TG9naW5QYXJhbSh0b2tlbiwgdWlkLCB0aGlzLkFVVE9fTE9HSU4pO1xyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmRMb2dpbihOZXRMb2dpbi5WaXNpdG9yTG9naW4sIHBhcmFtLCBudWxsLCBlcnJvckZ1bmMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5ri45a6i55m75b2VXHJcbiAgICBwdWJsaWMgcmVxVmlzaXRvckxvZ2luKCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJUbXBQaG9uZSgpO1xyXG4gICAgICAgIC8vIGlmKHRoaXMubG9jYWxQaG9uZSAhPSBcIlwiICYmIHRoaXMubG9jYWxQd2QgIT0gbnVsbClcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMucmVxUGhvbmVMb2dpbih0aGlzLmxvY2FsUGhvbmUsIHRoaXMubG9jYWxQd2QsIHRoaXMubG9jYWxBcmVhQ29kZSk7XHJcbiAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgbGV0IHBhcmFtID0gdGhpcy5nZXRMb2dpblBhcmFtKFwiXCIsIG51bGwsIHRoaXMuTUFOVUFMX0xPR0lOKVxyXG4gICAgICAgIC8v5YWI5Y+W5pys5Zyw57yT5a2YXHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZExvZ2luKE5ldExvZ2luLlZpc2l0b3JMb2dpbiwgcGFyYW0sIG51bGwsIG51bGwsIHRydWUpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+aJi+acuueZu+W9lVxyXG4gICAgLy9wd2Qg6ZyA6KaB5aSW6YOo6Ieq5bexbWQ15aSE55CGXHJcbiAgICBwdWJsaWMgcmVxUGhvbmVMb2dpbihwaG9uZU51bTogc3RyaW5nLCBwd2Q6IHN0cmluZywgYXJlYTogc3RyaW5nLCBvbGRBcHBpZD8pIHtcclxuICAgICAgICBsZXQgcGFyYW0gPSB0aGlzLmdldExvZ2luUGFyYW0oXCJcIiwgbnVsbCwgdGhpcy5NQU5VQUxfTE9HSU4pO1xyXG4gICAgICAgIHBhcmFtLnBob25lID0gR2xvYmFsLkFFU1V0aWwuYWVzRW5jcnlwdChHbG9iYWwuVG9vbGtpdC5jcnlwdG9LZXksIEdsb2JhbC5Ub29sa2l0LmNyeXB0b0l2LCBwaG9uZU51bSk7XHJcbiAgICAgICAgcGFyYW0uYWNvZGUgPSBhcmVhO1xyXG4gICAgICAgIHBhcmFtLnB3ZCA9IHB3ZDtcclxuICAgICAgICBsZXQgbWVnZVNlcnZlckZsYWcgPSBHbG9iYWwuVG9vbGtpdC5jaGVja01lZ2VTZXJ2ZXIoKVxyXG4gICAgICAgIGlmIChtZWdlU2VydmVyRmxhZykge1xyXG4gICAgICAgICAgICBwYXJhbS5vbGRfYXBwX2lkID0gcGFyc2VJbnQoR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5hcHBJRClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50bXBBcmVhID0gYXJlYTtcclxuICAgICAgICB0aGlzLnRtcFBob25lID0gcGhvbmVOdW07XHJcbiAgICAgICAgdGhpcy50bXBQd2QgPSBwd2Q7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZExvZ2luKE5ldExvZ2luLlVzZXJQaG9uZUxvZ2luLCBwYXJhbSwgbnVsbCwgbnVsbCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lvq7kv6HnmbvlvZVcclxuICAgIHB1YmxpYyByZXFXeExvZ2luKGFjY2Vzc190b2tlbjogc3RyaW5nLCBzdWJ0eXBlOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcGFyYW0gPSB0aGlzLmdldExvZ2luUGFyYW0oXCJcIiwgbnVsbCwgdGhpcy5NQU5VQUxfTE9HSU4pO1xyXG4gICAgICAgIHBhcmFtLnN1Yl90eXBlID0gc3VidHlwZTtcclxuICAgICAgICBwYXJhbS5jb2RlID0gYWNjZXNzX3Rva2VuXHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZExvZ2luKE5ldExvZ2luLlVzZXJXeExvZ2luLCBwYXJhbSwgbnVsbCwgbnVsbCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ms6jlhoxcclxuICAgIHB1YmxpYyByZXFSZWdpc3QocGhvbmVOdW06IHN0cmluZywgcHdkOiBzdHJpbmcsIGFyZWE6IHN0cmluZywgY29kZTogc3RyaW5nLCBpbnZpdGVDb2RlOiBzdHJpbmcpIHtcclxuICAgICAgICAvL+WQjue7reWSjOacjeWKoeWZqOmHjeaWsOWvueWPguaVsFxyXG4gICAgICAgIGxldCBwYXJhbSA9IHRoaXMuZ2V0TG9naW5QYXJhbShcIlwiKTtcclxuICAgICAgICBwYXJhbS5waG9uZSA9IEdsb2JhbC5BRVNVdGlsLmFlc0VuY3J5cHQoR2xvYmFsLlRvb2xraXQuY3J5cHRvS2V5LCBHbG9iYWwuVG9vbGtpdC5jcnlwdG9JdiwgcGhvbmVOdW0pO1xyXG4gICAgICAgIHBhcmFtLnB3ZCA9IHB3ZDtcclxuICAgICAgICBwYXJhbS5jb2RlID0gY29kZTtcclxuICAgICAgICBwYXJhbS5hY29kZSA9IGFyZWE7XHJcbiAgICAgICAgcGFyYW0uZGV2aWNlID0gR2xvYmFsLlRvb2xraXQuZ2VuRGV2aWNlSW5mbygpO1xyXG5cclxuICAgICAgICBpZiAoaW52aXRlQ29kZSAhPSBudWxsICYmIGludml0ZUNvZGUgIT0gXCJcIiAmJiAhaXNOYU4oTnVtYmVyKGludml0ZUNvZGUpKSkge1xyXG4gICAgICAgICAgICBwYXJhbS5pbnZpdGVfY29kZSA9IE51bWJlcihpbnZpdGVDb2RlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZExvZ2luKE5ldExvZ2luLlVzZXJSZWdpc3RlciwgcGFyYW0sIChtc2cpID0+IHtcclxuICAgICAgICAgICAgLy/mj5DnpLrms6jlhozmiJDlip9cclxuICAgICAgICAgICAgR2xvYmFsLlVJLmNsb3NlKFwiV25kUmVnaXN0XCIpO1xyXG4gICAgICAgICAgICAvL+iHquWKqOeZu+W9lVxyXG4gICAgICAgICAgICB0aGlzLnJlcVBob25lTG9naW4ocGhvbmVOdW0sIHB3ZCwgYXJlYSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluefreS/oemqjOivgeeggVxyXG4gICAgLy90eXBlIDEg5rOo5YaMIOe7keWumuaJi+acuiAyIOS/ruaUueWvhueggSDlv5jorrDlr4bnoIFcclxuICAgIHB1YmxpYyByZXFHZXRQaG9uZVZlcmlmeUNvZGUocGhvbmVOdW06IHN0cmluZywgdHlwZTogbnVtYmVyLCBhcmVhOiBzdHJpbmcsIGNvbXBsZXRlOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBwYXJhbTogYW55ID0ge307XHJcbiAgICAgICAgcGFyYW0uYWNvZGUgPSBhcmVhO1xyXG4gICAgICAgIHBhcmFtLnVpZCA9IEdsb2JhbC5QbGF5ZXJEYXRhLnVpZCB8fCAwXHJcbiAgICAgICAgcGFyYW0ucGhvbmUgPSBHbG9iYWwuQUVTVXRpbC5hZXNFbmNyeXB0KEdsb2JhbC5Ub29sa2l0LmNyeXB0b0tleSwgR2xvYmFsLlRvb2xraXQuY3J5cHRvSXYsIHBob25lTnVtKTtcclxuICAgICAgICBwYXJhbS5hcHBpZCA9IEdsb2JhbC5TZXR0aW5nLmFwcElkO1xyXG4gICAgICAgIHBhcmFtLmNvZGVfdHlwZSA9IHR5cGU7XHJcbiAgICAgICAgcGFyYW0uZGV2aWNlID0gR2xvYmFsLlRvb2xraXQuZ2VuRGV2aWNlSW5mbygpO1xyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmRWZXJpZnlDb2RlKE5ldFZlcmlmeUNvZGUuR2V0UGhvbmVWZXJpZnlDb2RlLCBwYXJhbSwgY29tcGxldGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5L+u5pS55a+G56CBXHJcbiAgICBwdWJsaWMgcmVxQ2hhbmdlUHdkKHBob25lTnVtOiBzdHJpbmcsIHB3ZDogc3RyaW5nLCBjb2RlOiBzdHJpbmcsIGFyZWE6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBwYXJhbTogYW55ID0ge31cclxuICAgICAgICBwYXJhbS5hY29kZSA9IGFyZWE7XHJcbiAgICAgICAgcGFyYW0ucGhvbmUgPSBHbG9iYWwuQUVTVXRpbC5hZXNFbmNyeXB0KEdsb2JhbC5Ub29sa2l0LmNyeXB0b0tleSwgR2xvYmFsLlRvb2xraXQuY3J5cHRvSXYsIHBob25lTnVtKTs7XHJcbiAgICAgICAgcGFyYW0uYXBwaWQgPSBHbG9iYWwuU2V0dGluZy5hcHBJZDtcclxuICAgICAgICBwYXJhbS5wd2QgPSBwd2Q7XHJcbiAgICAgICAgcGFyYW0uY29kZSA9IGNvZGU7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZFZlcmlmeUNvZGUoTmV0VmVyaWZ5Q29kZS5Gb3JnZXRQd2QsIHBhcmFtLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5a+G56CB5L+u5pS55oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuY2xvc2UoXCJXbmRDaGFuZ2VQd2RcIik7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5jbG9zZShcIlduZEZvcmdldFB3ZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldExvZ2luUGFyYW0odG9rZW46IHN0cmluZywgdWlkID0gbnVsbCwgdHlwZSA9IHRoaXMuTUFOVUFMX0xPR0lOKSB7XHJcbiAgICAgICAgaWYgKGlzTmFOKHVpZCkpXHJcbiAgICAgICAgICAgIHVpZCA9IG51bGw7XHJcbiAgICAgICAgbGV0IHBhcmFtOiBhbnkgPSB7fTtcclxuICAgICAgICBsZXQgdWRpZCA9IFwiMFwiXHJcbiAgICAgICAgaWYoR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mbyAmJiBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLnVkaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB1ZGlkID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby51ZGlkLnRvU3RyaW5nKClcclxuICAgICAgICB9XHJcbiAgICAgICAgcGFyYW0udWRpZCA9IHVkaWRcclxuICAgICAgICBwYXJhbS5hcHBpZCA9IEdsb2JhbC5TZXR0aW5nLmFwcElkO1xyXG4gICAgICAgIGlmICh1aWQpXHJcbiAgICAgICAgICAgIHBhcmFtLnVpZCA9IHVpZDtcclxuXHJcbiAgICAgICAgaWYgKHRva2VuKVxyXG4gICAgICAgICAgICBwYXJhbS50b2tlbiA9IHRva2VuO1xyXG5cclxuICAgICAgICBwYXJhbS50eXBlID0gdHlwZTtcclxuICAgICAgICBwYXJhbS5yZWdfaW5mbyA9IEdsb2JhbC5Ub29sa2l0LmdlblJlZ0luZm8oKTtcclxuICAgICAgICBwYXJhbS5zaWduID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5sb2dpblNpZ25cclxuICAgICAgICBwYXJhbS5wYWNrID0gR2xvYmFsLlNldHRpbmcuQ2hhbm5lbEluZm8uZ2V0UmVnaXN0Q2hhbm5lbCgpO1xyXG4gICAgICAgIHBhcmFtLmludml0ZV9jb2RlID0gR2xvYmFsLlNldHRpbmcuQ2hhbm5lbEluZm8uZ2V0SW52aXRlSWQoKTtcclxuICAgICAgICBwYXJhbS5zb3VyY2VfdHlwZSA9IEdsb2JhbC5TZXR0aW5nLkNoYW5uZWxJbmZvLnNvdXJjZVR5cGU7XHJcbiAgICAgICAgcGFyYW0uaGVhZF9pbWcgPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKEdsb2JhbC5TZXR0aW5nLmhlYWROYW1lUmFuZ2UpKSArIDEpLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIHBhcmFtLmRldmljZSA9IEdsb2JhbC5Ub29sa2l0LmdlbkRldmljZUluZm8oKTtcclxuICAgICAgICByZXR1cm4gcGFyYW07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzYXZlUGhvbmVJbmZvKCkge1xyXG4gICAgICAgIGlmICghdGhpcy50bXBQaG9uZSB8fCAhdGhpcy50bXBQd2QgfHwgIXRoaXMudG1wQXJlYSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMubG9jYWxQaG9uZSA9IHRoaXMudG1wUGhvbmU7XHJcbiAgICAgICAgdGhpcy5sb2NhbFB3ZCA9IHRoaXMudG1wUHdkO1xyXG4gICAgICAgIHRoaXMubG9jYWxBcmVhQ29kZSA9IHRoaXMudG1wQXJlYTtcclxuICAgICAgICBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLnNldChIYWxsU3RvcmFnZUtleS5QaG9uZSwgdGhpcy5sb2NhbFBob25lKTtcclxuICAgICAgICBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLnNldChIYWxsU3RvcmFnZUtleS5Qd2QsIHRoaXMudG1wUHdkKTtcclxuICAgICAgICBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLnNldChIYWxsU3RvcmFnZUtleS5BcmVhQ29kZSwgdGhpcy5sb2NhbEFyZWFDb2RlKTtcclxuXHJcbiAgICAgICAgdGhpcy5jbGVhclRtcFBob25lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbGVhclRtcFBob25lKCkge1xyXG4gICAgICAgIHRoaXMudG1wQXJlYSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy50bXBQaG9uZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy50bXBQd2QgPSBudWxsO1xyXG4gICAgfVxyXG59Il19