import IDun from "./IDun";
import HallStorageKey from "../../../logic/hallcommon/const/HallStorageKey";
import { DUNTYPE, DUNSTATE } from "./AppDunControl";
import { ReportTool } from "../../../logic/core/tool/ReportTool";

export default class YunDun implements IDun {
    private isDunInit = false;
    private _isSupport = false;
    private sdkName = "yundun";
    private _dunType = 0;

    constructor(dunType) {
        this._dunType = dunType
        Global.NativeEvent.isSupportSDK(this.sdkName, null, (retObj) => {
            if (retObj.result == 0) {
                this._isSupport = true;
            } else {
                Logger.error("checkAppIsSupportDunByType dunType = " + dunType + " isSupport = false")
            }
        })
    }

    public isAppSupport() {
        return this._isSupport
    }

    public checkCfgIsValid(cfg: any) {
        if (cfg && cfg.accessKey && cfg.uuid) {
            return true;
        }
        return false;
    }

    //异步初始化
    public init(cfg, callback?: Function) {
        Logger.error("init YunDun SDK")
        if (!this.checkCfgIsValid(cfg)) {
            Logger.error("init YunDun SDK checkCfgIsValid  = false")
            return;
        }
        if (this.isDunInit) {
            Logger.error("init YunDun SDK this.isTDunInit  = true")
            return;
        }
        let initState = this.getInitState()
        Logger.error("init YunDun SDK state = " + initState)
        let accessKey = cfg.accessKey
        let uuid = cfg.uuid
        if ((initState == DUNSTATE.INIT) && accessKey && uuid) {
            Logger.error("initYunDunSDK")
            Global.NativeEvent.initYunDunSDK(accessKey, uuid, (retObj) => {
                Logger.error("initYunDunSDK ret = " + JSON.stringify(retObj))
                if (retObj) {
                    let result = Number(retObj.result)
                    if (result == 0 || result == 0.0) {
                        this.isDunInit = true;
                        Global.Event.event(GlobalEvent.DunInitFinish);
                        Global.Setting.storage.set(HallStorageKey.DunInitRecord + "_" + DUNTYPE.YUN_DUN, 1)
                        Logger.error("initYunDunSDK ret = 0 success ")
                        // let reportParam = { "result": 0, "type": DUNTYPE.YUN_DUN }
                        // Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_INIT_DUN_OK, reportParam)
                    } else {
                        Logger.error("initYunDunSDK ret != 0 failed ")
                        let reportParam = { "result": "ret != 0 " + result, "type": DUNTYPE.YUN_DUN }
                        Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_INIT_DUN_ERROR, reportParam)
                    }
                } else {
                    Logger.error("initYunDunSDK retObj == null failed ")
                    let reportParam = { "result": "initYunDunSDK retObj == null failed", "type": DUNTYPE.YUN_DUN }
                    Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_INIT_DUN_ERROR, reportParam)
                }

                if (callback) {
                    callback()
                }

            });
        }


    }


    //获取初始化状态
    isInit() {
        if (!this.isDunInit) {
            let ret = this.getInitState();
            if (ret == 0) {
                this.isDunInit = true;
            }
        }
        return this.isDunInit;
    }

    getInitState() {
        let ret = Global.NativeEvent.getYunDunInitRet();
        return ret;
    }


    getServerIPAndPort(host: string, port: number,attr:any) {
        if (!this.isDunInit){
            Logger.error("YunDun getServerIPAndPort isDunInit = false")
            return;
        }
        let serverIPAndPortJson = Global.NativeEvent.getYunDunServerIPAndPort(host, port);
        if (serverIPAndPortJson) {
            Logger.error("getServerIPAndPort serverIPAndPortJson = " + serverIPAndPortJson)
            let serverIPAndPort = JSON.parse(serverIPAndPortJson)
            if (serverIPAndPort) {
                if (serverIPAndPort.result != null && (serverIPAndPort.result == 0 || serverIPAndPort.result == 0.0) && serverIPAndPort.serverIp && serverIPAndPort.serverPort) {
                    let ipPortObj = { "ip": serverIPAndPort.serverIp, "port": serverIPAndPort.serverPort }
                    return ipPortObj
                }
            }
        }else {
            Logger.error("getServerIPAndPort serverIPAndPortJson = null" )
        }

        return null
    }
}