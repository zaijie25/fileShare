import IDun from "./IDun";
import HallStorageKey from "../../../logic/hallcommon/const/HallStorageKey";
import { ReportTool } from "../../../logic/core/tool/ReportTool";
import { DUNTYPE, DUNSTATE } from "./AppDunControl";

export default class ZADun implements IDun {
    
    private isDunInit = false;
    private _isSupport = false;
    private sdkName = "zadun";
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
        if (cfg && cfg.key2){
            return true;
        }
        return false;
    }

    //异步初始化
    public init(cfg,callback?: Function) {
        Logger.error("init ZADun SDK")
        if (!this.checkCfgIsValid(cfg)){
            Logger.error("init ZADun SDK checkCfgIsValid  = false")
            return;
        }
        if (this.isDunInit) {
            Logger.error("init ZADun SDK this.isTDunInit  = true")
            return;
        }
        if (!this._isSupport){
            Logger.error("init ZADun SDK is not support")
            return;
        }
        let initState = this.getInitState()
        Logger.error("init ZADun SDK state = " + initState)
        let zaDunkey = cfg.key2
        if (initState == DUNSTATE.INIT) {
            // Logger.error("initZADunSDK")
            if (zaDunkey) {
                Global.NativeEvent.initZADunSDK(zaDunkey, (retObj) => {
                    // Logger.error("initZADunSDK ret = " + JSON.stringify(retObj))
                    if (retObj) {
                        let result = Number(retObj.result)
                        if (result == 0 || result == 0.0) {
                            this.isDunInit = true;
                            Global.Event.event(GlobalEvent.DunInitFinish);
                            Global.Setting.storage.set(HallStorageKey.DunInitRecord + "_" + DUNTYPE.ZA_DUN,1)
                            Logger.error("initZADunSDK ret = 0 success ")
                            // let reportParam = { "result": 0 ,"type": DUNTYPE.ZA_DUN}
                            // Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_INIT_DUN_OK, reportParam)
                        } else {
                            Logger.error("initZADunSDK ret != 0 failed ")
                            let funcParam = retObj.funcParam ? retObj.funcParam: ""
                            let reportParam = { "result": "ret != 0 " + result ,"type": DUNTYPE.ZA_DUN,"error_msg":funcParam}
                            Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_INIT_DUN_ERROR, reportParam)
                        }
                    }else {
                        Logger.error("initZADunSDK retObj == null failed ")
                        let reportParam = { "result": "initZADunSDK retObj == null failed" ,"type": DUNTYPE.ZA_DUN}
                        Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_INIT_DUN_ERROR, reportParam) 
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
        let ret = Global.NativeEvent.getZADunInitRet();
        return ret;
    }

    public getPort(lo_port) {
        //后续App添加了单独获取port方法
        let port = 0 ;
        port = Global.NativeEvent.getZADunPortByAddr("",lo_port)
        
        Logger.error("ZADun getPort port = " + port)
        return port;
    }

    public getServerIPAndPort(host:string,lo_port:number,attr:any){
        if (!this.isDunInit){
            Logger.error("ZADun getServerIPAndPort isDunInit = false")
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