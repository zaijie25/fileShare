import HallStorageKey from "../../../logic/hallcommon/const/HallStorageKey";
import { ReportTool } from "../../../logic/core/tool/ReportTool";
import IDun from "./IDun";
import YunDun from "./YunDun";
import ZADun from "./ZADun";
import AliDun from "./AliDun";


export enum DUNTYPE {
    None = 0,//无盾
    // T_DUN = 1,//T盾
    YUN_DUN = 2,//云盾
    ZA_DUN = 3,//ZA盾
    Ali_DUN = 4 //阿里云游戏盾
}

export enum DUNSTATE {
    INIT = 10000,
    LOADING = 10001,
    SUCCESS = 0,
    FAILED = -1
}

export default class AppDunControl {
    /**
     * {"tdun":{key:xxxxx},"yundun":{"accessKey":xxxx,"uuid":xxxx}}
     * 
     * **/
    private DUNConifg: any;

    //T盾
    // private tDun: TDun;
    //云盾
    private yunDun: YunDun;
    //ZA盾
    private zaDun:ZADun;
    //阿里云游戏盾
    private aliDun:AliDun;

    //设置盾配置
    public setDunConfig(cfg) {
        if (cfg == null && cfg.type == null)
            return;
        Global.Setting.storage.setObject(HallStorageKey.DunConfig, cfg);
    }

    //加载盾配置
    public loadDunConfig() {
        let cfg = Global.Setting.storage.getObject(HallStorageKey.DunConfig);
        if (cfg == null) {
            Logger.error("loadDunConfig cfg = null")
            return;
        }
        this.DUNConifg = cfg;
    }

    public init() {
        //初始化盾配置
        this.loadDunConfig();
        //初始化盾类
        this.initDun();
    }

    private initDun() {
        // this.tDun = new TDun(DUNTYPE.T_DUN);
        this.yunDun = new YunDun(DUNTYPE.YUN_DUN);
        this.zaDun = new ZADun(DUNTYPE.ZA_DUN);
        this.aliDun = new AliDun(DUNTYPE.Ali_DUN);
        //上次盾有启动成功记录没，有的话则优先启动
        if (this.DUNConifg) {
            // this.initDunSDKByStorage(DUNTYPE.T_DUN)
            this.initDunSDKByStorage(DUNTYPE.YUN_DUN)
            this.initDunSDKByStorage(DUNTYPE.ZA_DUN)
            this.initDunSDKByStorage(DUNTYPE.Ali_DUN)
            
        }
    }

    private initDunSDKByStorage(dunType) {
        let dunInitRecord = Global.Setting.storage.get(HallStorageKey.DunInitRecord + "_" + dunType)
        if (dunInitRecord) {
            this.initDunSDK(dunType)
        }
    }


    public initDunSDK(dunType) {
        if (!dunType) {
            Logger.log("initDunSDK dunType == null")
            return;
        }
        let isSupport = this.checkAppIsSupportDunByType(dunType)
        if (!isSupport){
            Logger.log("initDunSDK App is not Support dunType =" + dunType)
            return;
        }
        if (!this.DUNConifg) {
            Logger.log("initDunSDK this.DUNConifg == null")
            this.loadDunConfig()
            if (!this.DUNConifg) {
                Logger.log("initDunSDK loadDunConfig DUNConifg == null")
                return;
            }
        }
        
        let dunObj: IDun = null
        let dunConfig = null
        switch (dunType) {
            // case DUNTYPE.T_DUN:
            //     dunObj = this.tDun
            //     dunConfig = this.DUNConifg.tdun
            //     break;
            case DUNTYPE.YUN_DUN:
                dunObj = this.yunDun;
                dunConfig = this.DUNConifg.yundun
                break;
            case DUNTYPE.ZA_DUN:
                dunObj = this.zaDun;
                dunConfig = this.DUNConifg.zadun
                break;
            case DUNTYPE.Ali_DUN:
                dunObj = this.aliDun;
                dunConfig = this.DUNConifg.alidun
                break;
            default:
                break;
        }
        if (!dunObj) {
            Logger.log("initDunSDK dunObj == null dunType = " + dunType)
            return;
        }
        if (!dunConfig) {
            Logger.log("initDunSDK dunConfig == null dunType = " + dunType)
            return;
        }

        
        let isCfgValid = dunObj.checkCfgIsValid(dunConfig)
        if (isSupport && isCfgValid) {
            let dunInitState = dunObj.getInitState()
            if (!this.checkDunStateIsInit(dunInitState)) {
                dunObj.init(dunConfig)
            } else {
                Logger.log("initDunSDK checkDunStateIsInit == true " + dunType)
            }
        } else {
            Logger.log("initDunSDK  can't init dunType" + dunType)
        }
    }

    //检测当前版本是否支持指定类型盾
    public checkAppIsSupportDunByType(dunType) {
        let isSupport = false;
        let dunObj: IDun = null
        switch (dunType) {
            // case DUNTYPE.T_DUN:
            //     dunObj = this.tDun
            //     break;
            case DUNTYPE.YUN_DUN:
                dunObj = this.yunDun
                break;
            case DUNTYPE.ZA_DUN:
                dunObj = this.zaDun
                break;
            case DUNTYPE.Ali_DUN:
                dunObj = this.aliDun
                break;
            default:
                break;
        }
        if (dunObj){
            isSupport = dunObj.isAppSupport()
        }
        
        return isSupport
    }


    //判断盾是否初始化完成
    public checkDunStateIsInit(dunInitState) {
        if (dunInitState != null) {
            //还没开始出初始化或初始化失败
            if (dunInitState == DUNSTATE.INIT || dunInitState == DUNSTATE.FAILED) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    }


    public getDunIsInitByType(dunType: DUNTYPE) {
        if (!dunType) {
            Logger.log("getDunIsInitByType dunType = null")
            return;
        }
        let isDunInit = false;
        let dunObj :IDun = null
        switch (dunType) {
            // case DUNTYPE.T_DUN:
            //     dunObj = this.tDun;               
            //     break;
            case DUNTYPE.YUN_DUN:
                dunObj = this.yunDun;
                break;
            case DUNTYPE.ZA_DUN:
                dunObj = this.zaDun;
                break;
            case DUNTYPE.Ali_DUN:
                dunObj = this.aliDun;
                break;
            default:
                break;
        }
        if (dunObj){
            isDunInit = dunObj.isInit()
        }

        //尝试启动SDK
        if (!isDunInit) {
            this.initDunSDK(dunType)
        }
        Logger.error("getDunIsInit dunType = " + dunType + " isDunInit = " + isDunInit)
        return isDunInit;
    }


    public getServerIPAndPort(host: string, lo_port: number, dunType: number,attr:any) {
        if (!host || !lo_port || !dunType) {
            Logger.log("getServerIPAndPort error host lo_port dunType ")
            return;
        }
        let isSupport = this.checkAppIsSupportDunByType(dunType)
        if (!isSupport){
            Logger.log("getServerIPAndPort App not Support dunType = " + dunType)
            return;
        }
        let ipPortInfo = null
        let dunObj: IDun = null
        switch (dunType) {
            // case DUNTYPE.T_DUN:
            //     dunObj = this.tDun;
            //     break;
            case DUNTYPE.YUN_DUN:
                dunObj = this.yunDun;
                break;
            case DUNTYPE.ZA_DUN:
                dunObj = this.zaDun;
                break;
            case DUNTYPE.Ali_DUN:
                dunObj = this.aliDun;
                break;
            default:
                break;
        }
        if (dunObj) {
            ipPortInfo = dunObj.getServerIPAndPort(host, lo_port,attr)
        }

        return ipPortInfo
    }

    //判断是否有盾在异步初始化中
    public checkIsDunLoading(){
        let dunInitState = 0;
        let isDunLoading = false;
        if (this.yunDun) {
            dunInitState = this.yunDun.getInitState()
            if (dunInitState == DUNSTATE.LOADING){
                isDunLoading = true;
            }
        }

        if (this.zaDun){
            dunInitState = this.zaDun.getInitState()
            if (dunInitState == DUNSTATE.LOADING){
                isDunLoading = true;
            }
        }
        if (this.aliDun){
            dunInitState = this.aliDun.getInitState()
            if (dunInitState == DUNSTATE.LOADING){
                isDunLoading = true;
            }
        }
        return isDunLoading
    }




}