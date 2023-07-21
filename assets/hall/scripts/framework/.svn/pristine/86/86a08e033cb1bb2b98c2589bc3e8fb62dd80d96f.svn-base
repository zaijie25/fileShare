import IDun from "./IDun";
import HallStorageKey from "../../../logic/hallcommon/const/HallStorageKey";
import { DUNTYPE, DUNSTATE } from "./AppDunControl";
import { ReportTool } from "../../../logic/core/tool/ReportTool";

export default class AliDun implements IDun {
    private isDunInit = false;
    private _isSupport = false;
    private sdkName = "alidun";
    private _dunType = 0;
    private _group = null;
    private _dip = null;

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
        if (cfg){
            if (cfg.group){
                this._group = cfg.group
                Logger.error("checkCfgIsValid set group " + this._group)
            }else {
                Logger.error("checkCfgIsValid set group = null")
            }
            if (cfg.dip){
                this._dip = cfg.dip
                Logger.error("checkCfgIsValid set dip " + this._dip)
            }else {
                Logger.error("checkCfgIsValid set dip = null")
            }
        }
        if (cc.sys.os == cc.sys.OS_ANDROID){
            if (cfg && cfg.android) {
                return true;
            }
        }else if (cc.sys.os == cc.sys.OS_IOS){
            if (cfg && cfg.ios) {
                return true;
            }
        }
        return false;
    }

    private getCfgAppKey(cfg){
        if (cc.sys.os == cc.sys.OS_ANDROID){
            if (cfg && cfg.android) {
                return cfg.android;
            }
        }else if (cc.sys.os == cc.sys.OS_IOS){
            if (cfg && cfg.ios) {
                return cfg.ios;
            }
        }
    }

    //异步初始化
    public init(cfg, callback?: Function) {
        Logger.error("init AliDun SDK")
        if (!this.checkCfgIsValid(cfg)) {
            Logger.error("init AliDun SDK checkCfgIsValid  = false")
            return;
        }
        if (this.isDunInit) {
            Logger.error("init AliDun SDK this.isTDunInit  = true")
            return;
        }
        let initState = this.getInitState()
        Logger.error("init AliDun SDK state = " + initState)
        let appkey = this.getCfgAppKey(cfg)
        let token = this.getToken() 
        if ((initState == DUNSTATE.INIT) && appkey && token) {
            Logger.error("initAliDunSDK")
            Global.NativeEvent.initAliDunSDK(appkey, token, (retObj) => {
                Logger.error("initAliDunSDK ret = " + JSON.stringify(retObj))
                if (retObj) {
                    let result = Number(retObj.result)
                    if (result == 0 || result == 0.0) {
                        this.isDunInit = true;
                        Global.Event.event(GlobalEvent.DunInitFinish);
                        Global.Setting.storage.set(HallStorageKey.DunInitRecord + "_" + DUNTYPE.Ali_DUN, 1)
                        Logger.error("initAliDunSDK ret = 0 success ")
                    } else {
                        Logger.error("initAliDunSDK ret != 0 failed ")
                        let reportParam = { "result": "ret != 0 " + result, "type": DUNTYPE.Ali_DUN }
                        Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_INIT_DUN_ERROR, reportParam)
                    }
                } else {
                    Logger.error("initAliDunSDK retObj == null failed ")
                    let reportParam = { "result": "initAliDunSDK retObj == null failed", "type": DUNTYPE.Ali_DUN }
                    Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_INIT_DUN_ERROR, reportParam)
                }

                if (callback) {
                    callback()
                }
            });
        }else {
            Logger.error("initAliDunSDK failed " ,initState ,appkey,token)
        }


    }

    private getToken(){
        let uid = Number(Global.Setting.storage.get(HallStorageKey.Uid)) || 0;
        let token = uid ? uid.toString() : "token"
        return token;
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
        let ret = Global.NativeEvent.getAliDunInitRet();
        return ret;
    }

    /*
    * hostInfo:{ token,groupName,domainName}
    */
    getServerIPAndPort(host: string, port: number,attr:any) {
        if (!this.isDunInit){
            Logger.error("AliDun getServerIPAndPort isDunInit = false")
            return;
        }
        
        let hostInfo = {}
        hostInfo["token"] = this.getToken()
        let group = this._group
        let dip = this._dip;
        if (attr){
            Logger.error("AliDun getServerIPAndPort set attr param")
            if (attr.group){
                group = attr.group
                Logger.error("AliDun getServerIPAndPort set group " + group)
            }else {
                Logger.error("AliDun getServerIPAndPort set group = null" )
            }
            if(attr.dip){
                dip = attr.dip
                Logger.error("AliDun getServerIPAndPort set dip " + dip)
            }else {
                Logger.error("AliDun getServerIPAndPort set dip = null" )
            }
        }
        if (!group || !dip){
            Logger.error("AliDun getServerIPAndPort group == null  or dip == null")
            return;
        }
        hostInfo["groupName"] = group
        hostInfo["domainName"] = dip;
        
        let serverIPAndPortJson = Global.NativeEvent.getAliDunPort(hostInfo, port);
        if (serverIPAndPortJson) {
            Logger.error("getServerIPAndPort serverIPAndPortJson = " + serverIPAndPortJson)
            let serverIPAndPort = JSON.parse(serverIPAndPortJson)
            if (serverIPAndPort) {
                if (serverIPAndPort.result != null && (serverIPAndPort.result == 0 || serverIPAndPort.result == 0.0) && serverIPAndPort.serverIp && serverIPAndPort.serverPort) {
                    let ipPortObj = { "ip": serverIPAndPort.serverIp, "port": Number(serverIPAndPort.serverPort) }
                    return ipPortObj
                }
            }else {
                Logger.error("getServerIPAndPort serverIPAndPort json error")
            }
        }else {
            Logger.error("getServerIPAndPort serverIPAndPortJson = null" )
        }

        return null
    }
}