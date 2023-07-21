import Urls from "./Urls";
import BaseSetting from "../../../framework/setting/BaseSetting";
import SettingData from "./SettingData";
import SystemInfo from "./SystemInfo";
import ChannelInfo from "./ChannelInfo";
import HallStorageKey from "../../hallcommon/const/HallStorageKey";
import AppHelper from "../tool/AppHelper";
import SkinConfig from "../../hallcommon/app/SkinConfig";

export enum ServerType {
    DEVELOP = 1,    //内网开发服
    INTEST = 2,     //外网测试服
    RELEASE = 3,    //正式服
    K8S = 4,
    THS = 5,
    THSINTEST = 6,
}

export default class Setting extends BaseSetting {
    //AppConfig服务器配置
    public AppConfig: any = {};

    //url配置地址
    public Urls: Urls;

    // 是否限制充值
    public rechargeLimited:boolean = false

    //是否限制游客登录
    public vistorLoginLimited:boolean = false

    //是否限制手机注册
    public registLimited:boolean = false
    //系统信息  
    public SystemInfo: SystemInfo;
    //包渠道号数据
    public ChannelInfo: ChannelInfo;

    //皮肤配置信息
    public SkinConfig: SkinConfig;

    //是否热更
    public isStartHotUpdate: boolean = true;

    //游戏帧率
    public FPSConfig = 30;

    //大厅帧率
    public HallFPSConfig = 60;

    //服务器类型
    public serverType: ServerType;

    public appId = 0;

    public checkVersionApp = 0;

    public headNameRange = 20;

    //金币比率
    public glodRatio = 10000;

    //小数点保留位数
    public fixCount = 2;

    //是否允许自动登录
    public enableAutoLogin = true;

    //切到后台重连时间
    public backgroundReconnectTime = 5;

    //大厅心跳拉取跑马灯数量
    public boardcastCount = 2;

    //socket强制重连次数
    public socketReconnectTimes = 5;
    //重连间隔
    public socketReconnectInterval = 4;

    //多久没收到数据  需要重连
    public socketReconnectReceiveCheckInteval = 10;

    //enter之后5秒内没收到消息算服务器异常，退出游戏
    public enterTimeout = 5;

    
    //是否需要大厅选场
    public needHallChooseRoom = false;

    //微信好友title
    public wxFirendShareTitle: string = "588棋牌";
    public wxFirendShareContent: string = "我正在玩588棋牌，登录送礼，大奖不停，快来陪我一起娱乐吧！";
    public wxIconUrl: string = "https://res.qqlql.com/icons/588.png"
    //朋友圈
    public wxMomentShareTitle: string = "588棋牌";
    public wxMomentShareContent: string = "";

    public shareUrl: string = "http://1m142.cn"

    public signKey: string = ""

    //推广微信客服
    public spreadWx = "yyoop12a";

    public WX_APP_ID = "wx20f5eb186bcb0b5a"
    //推广qq
    public spreadQQ = "156381867";

    public aiteAppKey = "bfe1a232-c751-4fdf-b1c5-67c20bcdefbb"
    public aite_url   = ""
    public loginAite_url   = ""
    public static sendSharetraceReportFlag = "sendSharetraceReportFlag";
    public dataUrlIndex = 0;
    public curDataUrl: string;


   

    //缓存的游戏图标数量
    public cachedGameItemCount = 8;


    //关闭vip
    public vipDisable = false;

    public hallBGM = "hall/sound/dtBGM1";


    //用来验证微信登录是否可用
    //服务器配置微信key md5值
    public serverWxMd5: string = "";
    //安卓包名md5
    public serverAndroidIdMd5 = "";
    //ios包名md5
    public serverIOSIdMd5 = "";
    //ios签名信息
    public serverIOSCertMd5 = "";

    public useHttpDNS = true;

    //data列表
    public dataUrlsList = [];

    //是否开启log
    public logEnable = false;

    //是否是自营业返利
    public ispersonalTax = false;
    //是否开启微信登录按钮
    public weixinLoginDisable = false;

    //验证码发送时间间隔
    public phoneVerifyCodeInterval = 60;


    //APP所属平台信息，只有上报使用
    public appDataPlatformId = 0;

    //是否App Store 开启微信功能
    public isAppStoreEnableWXSDK = false

    //支付宝上报包名
    public alipayReportPackageName = ""

    //网速dns 数组
    public WangsuDNS = []

    //客服类型
    public loginKeFuType = 0 ;

    //资源服务器地址
    public resServerUrl = "";

    //判断是否关闭合服功能，默认开启
    public isCloseMegeServer = false;

    //alioss的配置
    public alioss_endpoint = "https://oss-cn-hongkong.aliyuncs.com";
    public alioss_file_url = "https://aiteoss.oss-cn-hongkong.aliyuncs.com/";
    public alioss_bucket = "aite-hk";
    public setup() {
        this.Urls = new Urls();
        this.settingData = new SettingData();
        this.settingData.setup(this.storage);
        this.SystemInfo = new SystemInfo()
        this.ChannelInfo = new ChannelInfo;
        this.ChannelInfo.setup();
        this.SkinConfig = new SkinConfig();
        this.SkinConfig.setup();
    }


    public parseCheckVersionCfg(config) {
        if (config.app) {
            this.serverWxMd5 = config.app.wx_sum;
            this.serverIOSIdMd5 = config.app.ios_sum;
            this.serverAndroidIdMd5 = config.app.and_sum;
            this.serverIOSCertMd5 = config.app.ios_cert;
        }
        if (config.custom) {
            let cfInfo = config.custom.new_login_kefu;
            // 0 网页 3 艾特
            if (cfInfo && cfInfo.type != null && cfInfo.type != undefined){
                let cfType = cfInfo.type
                this.loginKeFuType = cfType
                if (cfType == 4){
                    this.loginAite_url = cfInfo.aite_url;
                    this.aite_url = cfInfo.aite_url;
                }
                var servicerModel = Global.ModelManager.getModel("ServicerModel");
                servicerModel.initData([cfInfo]);

            }
            if (cfInfo && cfInfo.url && cfInfo.url != "" && cfInfo.url.indexOf("http") > -1) {
                this.Urls.onlineService = cfInfo.url;
            }
        }
        if (config.data_hosts && config.data_hosts.length && config.data_hosts.length > 0) {
            this.recordDataUrls(config.data_hosts);
        }
    }

    public parseServerInfo(serverCfg) {
        this.AppConfig = serverCfg;
        //常规属性赋值
        this.parseNormalData(serverCfg)
        //马甲包处理
        this.parseMaJiaBaoData(serverCfg)

    }



    private parseNormalData(serverCfg) {
        let version = serverCfg.version
        if (version) {
            Global.HotUpdateManager.hallNewVersion = version;
        }
        if (serverCfg.isCloseMegeServer){
            this.isCloseMegeServer = serverCfg.isCloseMegeServer == 1
        }
        if (serverCfg.clearStorage){
            let isClearStorage = serverCfg.clearStorage == 1
            if (isClearStorage){
                Logger.error("clearStorage true")
                //清除登录线路
                this.storage.removeKey(HallStorageKey.LoginRoutes)
                //清除Token
                this.storage.removeKey(HallStorageKey.Token)
                //清除 AppID
                this.storage.removeKey(HallStorageKey.AppID)
                //清除DataURL
                this.storage.removeKey(HallStorageKey.DATAURLS)
            }
        }


        this.Urls.parse(serverCfg);
        let appid = serverCfg.appid;
        Global.Setting.appId = appid;
        this.saveAppId(serverCfg.appid);

        let key = CC_PREVIEW ? serverCfg.web_key : serverCfg.sign_key;
        if (key) {
            this.signKey = key;
            this.SystemInfo.loginSign = Global.UrlUtil.getPlatformSign("[" + this.SystemInfo.deviceId + "]", key)
        }


       
        if (serverCfg.vipDisable == 1) {
            this.vipDisable = true;
        }

        if (serverCfg.useHttpDNS) {
            this.useHttpDNS = serverCfg.useHttpDNS == 1;
        }

        if (serverCfg.dataUrls) {
            this.recordDataUrls(serverCfg.dataUrls);
        }

        if (serverCfg.personalTax) {
            this.ispersonalTax = serverCfg.personalTax == 1
        }
        else {
            this.ispersonalTax = false;
        }

        if (serverCfg.logEnable)
            this.logEnable = serverCfg.logEnable == 1;
        else
            this.logEnable = false;
        
        if (serverCfg.alipayPkg){
            this.alipayReportPackageName = serverCfg.alipayPkg;
        }

        if (serverCfg.WangsuDNS){
            if (serverCfg.WangsuDNS.length > 0){
                this.WangsuDNS = serverCfg.WangsuDNS
            }
        }

        if (serverCfg.DunConfig){
            Global.AppDun.setDunConfig(serverCfg.DunConfig)
        }

        if (serverCfg.whiteHosts){
            let whiteHostsJson = JSON.stringify(serverCfg.whiteHosts)
            // Logger.error("whiteHostsJson:" + whiteHostsJson)
            Global.NativeEvent.setWhiteHosts(whiteHostsJson)
        }

        //369 特殊处理，高版本隐藏微信按钮，低版本不处理
        if (this.SystemInfo.appID == "8003") {
            if (AppHelper.enableForceUpdateAppInstall) {
                if (serverCfg.weixinLoginDisable) {
                    this.weixinLoginDisable = serverCfg.weixinLoginDisable == 1;
                } else {
                    this.weixinLoginDisable = false;
                }
            }
        } else {
            if (serverCfg.weixinLoginDisable) {
                this.weixinLoginDisable = serverCfg.weixinLoginDisable == 1;
            } else {
                this.weixinLoginDisable = false;
            }
        }

        if (serverCfg.platform_id) {
            this.appDataPlatformId = serverCfg.platform_id;
        }

        if (serverCfg.reportUrls && serverCfg.reportUrls.length > 0) {
            Global.Setting.storage.set(HallStorageKey.ReportUrl, JSON.stringify(serverCfg.reportUrls))
        }

        if (serverCfg.DNSConfig) {
            Global.DNS.setDNSConfg(serverCfg.DNSConfig);
        }

        if (serverCfg.rechargeLimited) {
           this.rechargeLimited = serverCfg.rechargeLimited == 1
        }

        if (serverCfg.vistorLoginLimited) {
            this.vistorLoginLimited = serverCfg.vistorLoginLimited == 1
        }

         if (serverCfg.registLimited) {
            this.registLimited = serverCfg.registLimited == 1
        }

        
        Logger.logEnable = this.logEnable;
        //@todo native开关控制
        Global.NativeEvent.nativeLog(Logger.logEnable)

        if (CC_PREVIEW)
            Logger.logEnable = true;


        let channel = serverCfg.channelid;
        this.setChannelID(channel)
    }

    private setChannelID(channel) {
        if (channel != null && !isNaN(Number(channel))) {
            this.ChannelInfo.configChannel = channel;
        }
    }


    /**
     * 例子：
     * 读取字段：majiabao
     * 解析内容：
     * {"huawei":{"svrCfg":{"appid":688,"channelid":0,"download_url":"https://58879.com/","platform_id":17,"routes":[{"host":"intest.lu77n.cn","port":443}]},"switch":1}}
     * 
     * 
     * ***/
    private parseMaJiaBaoData(serverCfg) {
        this.parseAppStoreData(serverCfg)
        let nativePlatform: string = this.SystemInfo.nativePlatform;
        if (nativePlatform != null && nativePlatform.length > 1) {
            let majiabaoCfg = serverCfg["majiabao"]
            if (majiabaoCfg != null && majiabaoCfg != undefined) {
                let platformCfg = majiabaoCfg[nativePlatform];
                if (platformCfg != null && platformCfg != undefined) {
                    let svrCfg = platformCfg["svrCfg"];
                    if (svrCfg != null && svrCfg != undefined) {
                        this.parseNormalData(svrCfg)
                    }
                }
            }
        }

    }


    private parseAppStoreData(serverCfg) {
        if (serverCfg.appstore) {
            let appstore = serverCfg.appstore
            if (appstore && appstore.enableWXSDK) {
                if (appstore.enableWXSDK.length > 0) {
                    let bundleName = Global.Setting.SystemInfo.bundleName
                    for (let i = 0; i < appstore.enableWXSDK.length; i++) {
                        let info = appstore.enableWXSDK[i]
                        if (info === bundleName) {
                            this.isAppStoreEnableWXSDK = true;
                            break;
                        }
                    }
                }
            }


        }
    }


    //如果data配置了新的data域名，就写到本地
    public recordDataUrls(urlArr) {
        if (urlArr && urlArr.length > 0) {
            this.storage.setObject(HallStorageKey.DATAURLS, urlArr);
        }
    }

    //加载本地url
    public loadDataUrls() {
        let urls = this.storage.getObject(HallStorageKey.DATAURLS);
        if (urls == null || urls.length == 0)
             return null;
        urls = Global.UrlUtil.dealFullUrlWithMutiLinesSameHost(urls)
        return urls;
        // let dataName = this.getConstUrlDataName();
        // for (let i = 0; i < urls.length; i++) {
        //     let dataUrl = urls[i];
        //     if (!dataUrl.startsWith("http")) {
        //         dataUrl = "https://" + dataUrl
        //     } 

        //     if(dataUrl.indexOf("?")<0){
        //         dataUrl = dataUrl+"/config/"+dataName
        //     }else{
        //         dataUrl = dataUrl
        //     }
        //     this.dataUrlsList.push(dataUrl);
        // }
    }

    /**
     * 获取data name
     * 1. 10021之前是通过URL截取data name
     * 2. 10021之后通过native 上传data name，格式为 appID_subPlatfromID.data
     * **/
    public getConstUrlDataName() {
        let dataName = "";
        let getOldStyleDataName = function () {
            let url = "" //Global.Setting.getCfgDataUrl();
            if (Global.Setting.SystemInfo.appConstUrl)
                url = Global.Setting.SystemInfo.appConstUrl;
            let arr = url.split("/");
            let name = arr[arr.length - 1];
            return name;
        }

        let appID = Global.Setting.SystemInfo.appID;
        let subPlatformID = Global.Setting.SystemInfo.subPlatformID;
        if (appID != null && appID != "") {
            if (subPlatformID != null && subPlatformID != "") {
                dataName = appID + "_" + subPlatformID
            } else {
                dataName = appID
            }

        } else {
            dataName = getOldStyleDataName();
        }
        return dataName;
    }


   

    public saveAppId(appId) {
        let oldId = this.storage.getNumber(HallStorageKey.AppID, -1);
        if (oldId != -1 && oldId != appId) {
            //appid变化 需清理缓存  只需要清理project  version  不能清理整个文件夹
            if (cc.sys.isNative) {
                Logger.error("appid 变化 不清理缓存");
                // let resPath = Global.HotUpdateManager.updateHelper.genStoragePath("hall") + "/project.manifest";
                // if (jsb.fileUtils.isFileExist(resPath)) {
                //     jsb.fileUtils.removeFile(resPath);
                // }
                //关闭合服AppID不一致则重启
                Global.UI.clearAllUIPrefab();
                if (this.isCloseMegeServer){
                    Logger.error("appid 变化 重启");
                    Global.NativeEvent.unzipHallPackage();
                }else {
                    Logger.error("appid 变化 合服不重启");
                }
                setTimeout(() => {
                    cc.game.restart();
                }, 1000);
            }
        }
        Global.Setting.storage.set(HallStorageKey.AppID, Global.Setting.appId);

    }

    // public getCfgDataUrl() {
    //     return this.Urls.getCfgDataUrl(this.serverType);
    // }

    // public getCfgDataBackupUrl(cfgUrl) {
    //     return this.Urls.getCfgDataBackupUrl(Global.Toolkit.DealWithUrl(cfgUrl));
    // }

    // public getCfgDataBackupUrl1(cfgUrl) {
    //     return this.Urls.getCfgDataBackupUrl1(Global.Toolkit.DealWithUrl(cfgUrl));
    // }

    public getCfgDataName()
    {
        return this.Urls.getDataNameWithServerType(this.serverType);
    }

    public getDataHttpDnsArr() {
        let arr = []
        if (!this.dataUrlsList || this.dataUrlsList.length == 0)
            return arr

        for (let i = 0; i < this.dataUrlsList.length; i++) {
            let domain = this.getDomain(this.dataUrlsList[i]);
            if (domain && domain != "")
                arr.push(domain);
        }
        return arr;
    }

    private getDomain(url: string) {
        if (!url)
            return "";
        let urlarr = url.split("//");
        if (urlarr.length < 2)
            return "";
        let newUrl = urlarr[1];
        return newUrl.split("/")[0];
    }

     /** 百度状态判断, 方便子游戏调用 */
     public isBaiduSpecialState(){
        return false
    }

    /** 大厅使用的头像是否圆头 */
    public isCircleHeadImage(){
        return this.SkinConfig.headImgShape == 1;
    }
}