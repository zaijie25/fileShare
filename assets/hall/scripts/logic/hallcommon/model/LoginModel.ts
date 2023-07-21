import ModelBase from "../../../framework/model/ModelBase";
import { NetLogin, NetVerifyCode, NetAppface } from "../../core/net/hall/NetEvent";
import HallStorageKey from "../const/HallStorageKey";
import ServerRoutes, { ServerRouteInfo } from "../../core/setting/ServerRoutes";
import { MsgType } from "../../hall/ui/msg/MsgEvent";
import AppHelper from "../../core/tool/AppHelper";
import PlayerInfoModel from "./PlayerInfoModel";
import HallModel, { HallRedSpotType } from "./HallModel";
import HallPopMsgHelper, { PopWndName, BindAwardUIType } from "../../hall/tool/HallPopMsgHelper";
import HallBtnHelper from "../../hall/ui/hall/views/HallBtnHelper";
import { ReportTool } from "../../core/tool/ReportTool";

export default class LoginModel extends ModelBase {
    //登录方式 
    //手动登录
    private MANUAL_LOGIN = 1;
    //自动登录
    private AUTO_LOGIN = 2;

    public localPhone: string;
    public localPwd: string;
    public localAreaCode: string;

    private reportParam = []

    private retryTimes = 0 //用于TEST_ROUTE重试计数

    //玩家当前输入的值 ，登录成功后才生效
    private tmpPhone: string;
    private tmpPwd: string;
    private tmpArea: string;
    private requestTime = 0 //用于请求t_url计数

    private CONFIG_MD5_KEY = "CONFIG_MD5_KEY";
    private CONFIG_KEY = "CONFIG_KEY";

    //第一次进入登录场景
    public firstLogin = true;

    public get Name() {
        return "LoginModel";
    }

    protected onInit() {
        Global.HallServer.on(NetLogin.VisitorLogin, this, this.onLogin);
        Global.HallServer.on(NetLogin.UserPhoneLogin, this, this.onLogin);
        Global.HallServer.on(NetLogin.UserWxLogin, this, this.onLogin)
        this.loadLocalAccountInfo();
    }

    //加载本地账号信息
    protected loadLocalAccountInfo() {
        this.localPhone = Global.Setting.storage.get(HallStorageKey.Phone);
        this.localPwd = Global.Setting.storage.get(HallStorageKey.Pwd);
        this.localAreaCode = Global.Setting.storage.get(HallStorageKey.AreaCode);
    }



    private loadLocalMd5() {
        let md5 = Global.Setting.storage.get(this.CONFIG_MD5_KEY);
        return md5;
    }

    private loadConfig() {
        let cfgStr = Global.Setting.storage.get(this.CONFIG_KEY);
        if (cfgStr != null && cfgStr != "") {
            try {
                let cfg = JSON.parse(cfgStr);
                return cfg;
            }
            catch (e) {
                Logger.error("解析config 失败");
                return null;
            }
        }
        return null;
    }


    protected onLogin(netMsg) {
        let serverCfg = netMsg;
        if (!serverCfg.routes || serverCfg.routes.length == 0) {
            Logger.error("没有配置server地址, 检查key 和 sign")
            return;
        }

        this.savePhoneInfo();
        Global.AppUpdateHelper.showLoginUpdateDlg()
        if (netMsg && netMsg.merge_point) {
            HallPopMsgHelper.Instance.addMsgList(PopWndName.MegePoint, () => {
                HallPopMsgHelper.Instance.addLock(PopWndName.MegePoint);
                Global.UI.show("WndRebateGet", netMsg.merge_point, BindAwardUIType.MegePoint);
            });
        }


        // let hallUrl = this.getServerUrl(serverCfg.routes)
        let routes = Global.Setting.Urls.hallRoutes;
        if (routes == null)
            routes = new ServerRoutes();
        routes.parse(serverCfg.routes);
        Global.Setting.Urls.hallRoutes = routes;

        //添加登录线路
        let lroutes = serverCfg.lroutes
        if (lroutes && lroutes.length > 0) {
            Logger.error("set lroutes")
            //校验登录线路合法性
            let loginServerRoutes = new ServerRoutes();
            loginServerRoutes.parse(lroutes)
            if (loginServerRoutes.getRouteLen() > 0) {
                // Logger.error("lroutes is valid")
                Global.Setting.storage.setObject(HallStorageKey.LoginRoutes, lroutes)
            } else {
                Logger.error("lroutes is not valid")
            }
        } else {
            Logger.error("lroutes is null")
        }

        let randRote = routes.getRandRoute();
        if (randRote == null) {
            Logger.error("获取serverRoute失败");
            return;
        }

        // let hallURl = "http" + serverCfg.s_addr[randIndex] + "/";
        //保存玩家信息
        Global.PlayerData.init(netMsg);

        Global.Setting.Urls.initLoginInfo(randRote.getHttpUrl(), netMsg.uid, netMsg.token);
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING,"requestLoginHosts",15,"",1,false)
        Global.DNS.requestHosts(Global.Setting.Urls.hallRoutes.getRouteArr(), () => {
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "requestLoginHosts")
            this.doGetConfig(netMsg);
        });

        //切换场景

        Global.HallServer.run();
        this.requestTime = 0
        this.retryTimes = 0
        this.dealReportUrl(serverCfg)

        Global.ReportTool.ReportDevice(ReportTool.REPORT_TYPE_LOGIN);

        //Global.ChannelUtil.startSchemeForReport();
    }

    dealReportUrl(serverCfg: any) {

        let url = serverCfg.t_url
        if (!url || typeof (url) != 'string') {
            return
        }
        if (this.requestTime < 3) {
            let xhr = new XMLHttpRequest();//第一步：创建需要的对象
            let time = new Date().getTime()
            let self = this
            url += cc.js.formatStr("?%s", time)
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
                if (xhr.readyState === 4) {//验证请求是否发送成功
                    if (xhr.status == 200) {
                        let off = new Date().getTime() - time
                        let len = xhr.getResponseHeader('content-length')
                        let xip = xhr.getResponseHeader('xips')
                        self.reportParam[self.requestTime] = { "time": off, "len": len, "xip": xip, "test_url": url }
                        self.requestTime++
                        self.dealReportUrl(serverCfg)
                    }
                    else {
                        Logger.error("拉取失败")
                        Logger.error("xhr.readyState", xhr.readyState, xhr.status)
                        self.requestTime++
                        self.retryTimes++
                        self.dealReportUrl(serverCfg)
                    }

                }
            }.bind(this);
            xhr.send();
        }
        else {
            let param: any = {}
            param.content = this.reportParam
            param.retryTimes = this.retryTimes
            let reportKey = ReportTool.REPORT_TYPE_TEST_ROUTE
            Global.ReportTool.ReportPublicClientLog(reportKey, param, false)
            this.reportParam = []
        }

    }

    private doGetGamelist() {
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING,"doGetGamelist",15,"",1,false)
        let md5 = this.loadLocalMd5();
        let cfg = null;
        let param: any = {};
        if (md5 && md5 != "")
            cfg = this.loadConfig();

        if (cfg != null && cfg.length > 0 && md5) {
            param.game_sum = md5;
        }
        let megeServerFlag = Global.Toolkit.checkMegeServer()
        if (megeServerFlag) {
            param.old_app_id = parseInt(Global.Setting.SystemInfo.appID)
        }
        let device = Global.Toolkit.genDeviceInfo();
        param.hall_skin = Global.Setting.SystemInfo.hallSkin;
        param.game_skin = Global.Setting.SystemInfo.gameSkin;
        param.device = device
        param.app_version = Global.Setting.SystemInfo.appVersion
        Global.HallServer.send(NetAppface.mod, NetAppface.GetGameList, param, (data) => {
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "doGetGamelist");
            if (data.game_list != null && data.game_list.length > 0) {
                cfg = data.game_list;
                let svrMd5 = data.game_sum;
                try {
                    let cfgStr = JSON.stringify(data.game_list);
                    if (!svrMd5 || svrMd5 == "")
                        svrMd5 = Global.Toolkit.md5(cfgStr);
                    Global.Setting.storage.set(this.CONFIG_MD5_KEY, svrMd5);
                    Global.Setting.storage.set(this.CONFIG_KEY, cfgStr);
                }
                catch (e) {

                }
            }
            //保存游戏配置
            Global.GameData.init(cfg);
        }, null, true);

    }

    private doGetConfig(netMsg) {
        let md5 = this.loadLocalMd5();
        let cfg = null;
        let param: any = {};
        if (md5 && md5 != "")
            cfg = this.loadConfig();

        if (cfg != null && cfg.length > 0 && md5) {
            param.game_sum = md5;
        }
        let megeServerFlag = Global.Toolkit.checkMegeServer()
        if (megeServerFlag) {
            param.old_app_id = parseInt(Global.Setting.SystemInfo.appID)
        }
        let device = Global.Toolkit.genDeviceInfo();
        param.device = device
        param.hall_skin = Global.Setting.SystemInfo.hallSkin;
        param.game_skin = Global.Setting.SystemInfo.gameSkin;
        param.app_version = Global.Setting.SystemInfo.appVersion

        //请求游戏配置
        Global.HallServer.send(NetAppface.mod, NetAppface.GetConfig, param, (data) => {
            if (data.game_sum != null) {
                if (md5 && md5 != "" && md5 == data.game_sum) {
                    if (cfg != null && cfg.length > 0) {
                        Global.GameData.init(cfg)
                    }
                }
                else {
                    this.doGetGamelist()
                }
            }
            if (data.is_daily_gift_money) {
                Global.Event.event(GlobalEvent.ShowRedSpot, [true, HallRedSpotType.DailyGift])
            }
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "NetAppface.GetConfig");
            //初始化公告轮播配置
            Global.GongGaoData.init(data.lun_bo);
            //初始化活动按钮配置
            Global.ActivityToggle.init(data.activity_list);
            //保存客服配置
            var servicerModel = Global.ModelManager.getModel("ServicerModel");
            servicerModel.initData(data.new_customer_service);
            let hallModel = <HallModel>Global.ModelManager.getModel("HallModel");
            hallModel.recharge_red = data.recharge_red;
            //保存分享金额
            var shareModel = Global.ModelManager.getModel("ShareModel");
            shareModel.initData(data.share_get_point);
            Global.Setting.wxFirendShareTitle = data.app_name;
            Global.Setting.wxMomentShareTitle = data.app_name;
            Global.ModelManager.getModel("RechargeModel").initData(data.new_pay_info);   // 页面内请求payconfig
            //保存公告弹窗字段
            var MsgModel = Global.ModelManager.getModel("MsgModel");
            // MsgModel.SetStatus(data.notify);
            MsgModel.GetMsgList(MsgType.All, true);
            //vip配置
            PlayerInfoModel.instance.InitData(data.vip_cfg);
            PlayerInfoModel.instance.vip_reward = data.vip_reward;
            PlayerInfoModel.instance.is_vip_reward = data.is_vip_reward;
            PlayerInfoModel.instance.InitSubsidy(data.subsidy_point);
            var BindingGiftModel = Global.ModelManager.getModel("BindingGiftModel");
            if (BindingGiftModel) {
                BindingGiftModel.SetStatus(netMsg.user_type != 2 && data.give_cfg.bind_point != 0)
                BindingGiftModel.BindAwardNum = data.give_cfg.bind_point

            }

            Global.Setting.Urls.setInviteUrl(data.self_pack_url);

            var SpreadModel = Global.ModelManager.getModel("SpreadModel");
            SpreadModel.startRequestShortUrl(data.self_pack_url)
            SpreadModel.RedFLag = (data.per_cent_point > 0)
            SpreadModel.commiType = data.commi_type
            SpreadModel.Rate = data.percent_rate
            SpreadModel.SelfRate = data.self_rate

            SpreadModel.RankType = data.rank_type


            let rebateData = data.back_point;
            let isNotGet = !!data.back_point_status;  // 0 已领取

            let rechargeGiftModel = Global.ModelManager.getModel("RechargeGiftModel")
            if(data.limit_time_first_pay_activity)
            {
                rechargeGiftModel.CountDown = data.limit_time_first_pay_activity.countdown
                rechargeGiftModel.TimelimitedStatus = data.limit_time_first_pay_activity.status
            }


            let commisionModel = Global.ModelManager.getModel("CommisionModel")
            if (commisionModel) {
                commisionModel.redSwitch = data.task_num > 0
            }
            //所有活动列表
            if (data.activity_list) {
                let activity_list = data.activity_list;
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
                    for (let i = 0; i < activity_list.length; i++) {
                        let activity = activity_list[i]
                        if (activity.atype && activity.atype == 4) { //充值返利
                            rechargeGiftModel.Status = (activity.satus == 1)
                            rechargeGiftModel.Switch = true
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
            AppHelper.afterGetConfig();
            this.CheckBaiduState(data)
            Global.SceneManager.goToHall();
        }, null, true);
    }


    CheckBaiduState(data) {
        if (data == null) {
            return
        }
        var BindingGiftModel = Global.ModelManager.getModel("BindingGiftModel");
        if (data.activity_list) {
            let activity_list = data.activity_list;
            let hallModel = <HallModel>Global.ModelManager.getModel("HallModel");
            if (activity_list.length > 0) {
                //是否显示活动中心按钮[大于0显示
                hallModel.isShowActivityCenter = true;
                if ( data.notify_popup == 1) {
                    HallPopMsgHelper.Instance.addMsgList(PopWndName.ActivityCenter, () => {
                        HallPopMsgHelper.Instance.addLock(PopWndName.ActivityCenter);
                        HallBtnHelper.WndActivityOpen()
                    });
                };
                //是否自动弹出活动中心[1弹出
                // if (!baidustate && data.notify_popup == 1) {
                //     HallPopMsgHelper.Instance.addMsgList(PopWndName.ActivityCenter, () => {
                //         HallPopMsgHelper.Instance.addLock(PopWndName.ActivityCenter);
                //         Global.UI.show("WndActivityCenter");
                //     });
                // }
            }
        }
        if ( data.share_popup == 1) {
            HallPopMsgHelper.Instance.addMsgList(PopWndName.Spread, () => {
                HallPopMsgHelper.Instance.addLock(PopWndName.Spread);
                HallBtnHelper.WndSpreadCenterOpen();
            });
        }
        if (data.mail_popup == 1 ) {
            HallPopMsgHelper.Instance.addMsgList(PopWndName.Mail, () => {
                HallPopMsgHelper.Instance.addLock(PopWndName.Mail);
                HallBtnHelper.WndMailOpen();
            });
        }
        if ( data.bind_popup == 1 && BindingGiftModel.Status) {
            HallPopMsgHelper.Instance.addMsgList(PopWndName.BindGift, () => {
                HallPopMsgHelper.Instance.addLock(PopWndName.BindGift);
                Global.UI.show("WndBindingGift");
            });
        }
        this.sortPopUp(data.activity_list)

    }

    sortPopUp(activity_list)
    {
        if(!activity_list || activity_list.length == 0) return
        activity_list.sort((a,b)=>{return a.sort - b.sort})

        for (let index = 0; index < activity_list.length; index++) {
            let obj = activity_list[index];
            if(obj && obj.pop_ups === 1 && obj.atype)
            {
                HallPopMsgHelper.Instance.addMsgList(obj.atype, () => {
                    HallPopMsgHelper.Instance.addLock(obj.atype);
                    HallBtnHelper.ShowActivity(obj.atype);
                },obj.sort + 10);
            }
            
        }

    }



    //自动登录
    public reqAutoLogin(token: string, uid: number, errorFunc: Function) {
        this.clearTmpPhone();
        let param = this.getLoginParam(token, uid, this.AUTO_LOGIN);
        Global.HallServer.sendLogin(NetLogin.VisitorLogin, param, null, errorFunc);
    }

    //游客登录
    public reqVisitorLogin() {
        this.clearTmpPhone();
        // if(this.localPhone != "" && this.localPwd != null)
        // {
        //     this.reqPhoneLogin(this.localPhone, this.localPwd, this.localAreaCode);
        //     return;
        // }
        let param = this.getLoginParam("", null, this.MANUAL_LOGIN)
        //先取本地缓存
        Global.HallServer.sendLogin(NetLogin.VisitorLogin, param, null, null, true);

    }

    //手机登录
    //pwd 需要外部自己md5处理
    public reqPhoneLogin(phoneNum: string, pwd: string, area: string, oldAppid?) {
        let param = this.getLoginParam("", null, this.MANUAL_LOGIN);
        param.phone = Global.AESUtil.aesEncrypt(Global.Toolkit.cryptoKey, Global.Toolkit.cryptoIv, phoneNum);
        param.acode = area;
        param.pwd = pwd;
        let megeServerFlag = Global.Toolkit.checkMegeServer()
        if (megeServerFlag) {
            param.old_app_id = parseInt(Global.Setting.SystemInfo.appID)
        }
        this.tmpArea = area;
        this.tmpPhone = phoneNum;
        this.tmpPwd = pwd;
        Global.HallServer.sendLogin(NetLogin.UserPhoneLogin, param, null, null, true);
    }

    //微信登录
    public reqWxLogin(access_token: string, subtype: number) {
        let param = this.getLoginParam("", null, this.MANUAL_LOGIN);
        param.sub_type = subtype;
        param.code = access_token
        Global.HallServer.sendLogin(NetLogin.UserWxLogin, param, null, null, true);
    }

    //注册
    public reqRegist(phoneNum: string, pwd: string, area: string, code: string, inviteCode: string) {
        //后续和服务器重新对参数
        let param = this.getLoginParam("");
        param.phone = Global.AESUtil.aesEncrypt(Global.Toolkit.cryptoKey, Global.Toolkit.cryptoIv, phoneNum);
        param.pwd = pwd;
        param.code = code;
        param.acode = area;
        param.device = Global.Toolkit.genDeviceInfo();

        if (inviteCode != null && inviteCode != "" && !isNaN(Number(inviteCode))) {
            param.invite_code = Number(inviteCode)
        }

        Global.HallServer.sendLogin(NetLogin.UserRegister, param, (msg) => {
            //提示注册成功
            Global.UI.close("WndRegist");
            //自动登录
            this.reqPhoneLogin(phoneNum, pwd, area);
        })
    }

    //获取短信验证码
    //type 1 注册 绑定手机 2 修改密码 忘记密码
    public reqGetPhoneVerifyCode(phoneNum: string, type: number, area: string, complete: Function) {
        let param: any = {};
        param.acode = area;
        param.uid = Global.PlayerData.uid || 0
        param.phone = Global.AESUtil.aesEncrypt(Global.Toolkit.cryptoKey, Global.Toolkit.cryptoIv, phoneNum);
        param.appid = Global.Setting.appId;
        param.code_type = type;
        param.device = Global.Toolkit.genDeviceInfo();
        Global.HallServer.sendVerifyCode(NetVerifyCode.GetPhoneVerifyCode, param, complete);
    }

    //修改密码
    public reqChangePwd(phoneNum: string, pwd: string, code: string, area: string) {
        let param: any = {}
        param.acode = area;
        param.phone = Global.AESUtil.aesEncrypt(Global.Toolkit.cryptoKey, Global.Toolkit.cryptoIv, phoneNum);;
        param.appid = Global.Setting.appId;
        param.pwd = pwd;
        param.code = code;
        Global.HallServer.sendVerifyCode(NetVerifyCode.ForgetPwd, param, () => {
            Global.UI.fastTip("密码修改成功");
            Global.UI.close("WndChangePwd");
            Global.UI.close("WndForgetPwd");
        });
    }


    public getLoginParam(token: string, uid = null, type = this.MANUAL_LOGIN) {
        if (isNaN(uid))
            uid = null;
        let param: any = {};
        let udid = "0"
        if(Global.Setting.SystemInfo && Global.Setting.SystemInfo.udid)
        {
            udid = Global.Setting.SystemInfo.udid.toString()
        }
        param.udid = udid
        param.appid = Global.Setting.appId;
        if (uid)
            param.uid = uid;

        if (token)
            param.token = token;

        param.type = type;
        param.reg_info = Global.Toolkit.genRegInfo();
        param.sign = Global.Setting.SystemInfo.loginSign
        param.pack = Global.Setting.ChannelInfo.getRegistChannel();
        param.invite_code = Global.Setting.ChannelInfo.getInviteId();
        param.source_type = Global.Setting.ChannelInfo.sourceType;
        param.head_img = (Math.floor(Math.random() * (Global.Setting.headNameRange)) + 1).toString();

        param.device = Global.Toolkit.genDeviceInfo();
        return param;
    }

    private savePhoneInfo() {
        if (!this.tmpPhone || !this.tmpPwd || !this.tmpArea)
            return;
        this.localPhone = this.tmpPhone;
        this.localPwd = this.tmpPwd;
        this.localAreaCode = this.tmpArea;
        Global.Setting.storage.set(HallStorageKey.Phone, this.localPhone);
        Global.Setting.storage.set(HallStorageKey.Pwd, this.tmpPwd);
        Global.Setting.storage.set(HallStorageKey.AreaCode, this.localAreaCode);

        this.clearTmpPhone();
    }

    private clearTmpPhone() {
        this.tmpArea = null;
        this.tmpPhone = null;
        this.tmpPwd = null;
    }
}