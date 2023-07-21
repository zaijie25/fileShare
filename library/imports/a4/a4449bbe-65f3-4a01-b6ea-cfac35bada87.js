"use strict";
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