import IDun from "./IDun";
import HallStorageKey from "../../../logic/hallcommon/const/HallStorageKey";
import { ReportTool } from "../../../logic/core/tool/ReportTool";
import { DUNTYPE, DUNSTATE } from "./AppDunControl";

export default class TDun implements IDun {
    
    private isDunInit = false;
    private _isSupport = false;
    private sdkName = "tdun";
    private _dunType = 0;

    constructor(dunType){
        this._dunType = dunType
        Global.NativeEvent.isSupportSDK(this.sdkName, null, (retObj) => {
            if (retObj.result == 0) {
                this._isSupport = true;
            } else {
                Logger.error("checkAppIsSupportDunByType dunType = " + dunType + " isSupport = false")
            }
        })
    }

    public  isAppSupport(){
        return this._isSupport
    }

    public checkCfgIsValid(cfg:any){
        if (cfg && cfg.key){
            return true;
        }
        return false;
    }

    //异步初始化
    public init(cfg,callback?: Function) {
        // Logger.error("init TDun SDK")
        if (!this.checkCfgIsValid(cfg)){
            Logger.error("init TDun SDK checkCfgIsValid  = false")
            return;
        }
        if (this.isDunInit) {
            Logger.error("init TDun SDK this.isTDunInit  = true")
            return;
        }
        if (!this._isSupport){
            Logger.error("init TDun SDK is not support")
            return;
        }
        let initState = this.getInitState()
        Logger.error("init TDun SDK state = " + initState)
        let tDunkey = cfg.key
        if (initState == DUNSTATE.INIT || initState == DUNSTATE.FAILED) {
            // Logger.error("initTDunSDK")
            if (tDunkey) {
                Global.NativeEvent.initTDunSDK(tDunkey, (retObj) => {
                    // Logger.error("initTDunSDK ret = " + JSON.stringify(retObj))
                    if (retObj) {
                        let result = Number(retObj.result)
                        if (result == 0 || result == 0.0) {
                            this.isDunInit = true;
                            Global.Event.event(GlobalEvent.DunInitFinish);
                            Global.Setting.storage.set(HallStorageKey.DunInitRecord + "_" + DUNTYPE.T_DUN,1)
                            // Logger.error("initTDunSDK ret = 0 success ")
                            // let reportParam = { "result": 0 ,"type": DUNTYPE.T_DUN}
                            // Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_INIT_DUN_OK, reportParam)
                        } else {
                            Logger.error("initTDunSDK ret != 0 failed ")
                            // let reportParam = { "result": "ret != 0 " + result ,"type": DUNTYPE.T_DUN}
                            // Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_INIT_TDUN_ERROR, reportParam)
                        }
                    }else {
                        Logger.error("initTDunSDK retObj == null failed ")
                        // let reportParam = { "result": "initTDunSDK retObj == null failed" ,"type": DUNTYPE.T_DUN}
                        // Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_INIT_TDUN_ERROR, reportParam) 
                    }

                    if (callback) {
                        callback()
                    }

                });
            }
        }

    }

    public getInitState() {
        if (!this._isSupport){
            return DUNSTATE.FAILED
        }
        let ret = Global.NativeEvent.getTDunInitRet();
        return ret;
    }

    public getPort(lo_port) {
        let port = Global.NativeEvent.getTDunPort(lo_port)
        Logger.error("TDun getPort port = " + port)
        return port;
    }

    public getServerIPAndPort(host:string,lo_port:number,attr:any){
        if (!this.isDunInit){
            Logger.error("TDun getServerIPAndPort isDunInit = false")
            return;
        }
        let ip = "127.0.0.1"
        let port = this.getPort(lo_port)
        return {"ip":ip,"port":port}
    }

    public isInit() {
        if (!this._isSupport){
            return false
        }
        if (!this.isDunInit) {
            let ret = this.getInitState();
            if (ret == 0) {
                this.isDunInit = true;
            }
        }
        return this.isDunInit;
    }

}