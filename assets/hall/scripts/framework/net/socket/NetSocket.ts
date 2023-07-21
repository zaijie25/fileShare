import { ReportTool } from "../../../logic/core/tool/ReportTool";
import { ServerRouteInfo } from "../../../logic/core/setting/ServerRoutes";

export enum NetStatus
{
    close = 0,
    connecting = 1,
    connected = 2,
}

export class NetSocket
{
    private _socket: WebSocket;
    private _url:string;
    private _cerPath:string;
    private _status:NetStatus;
    private _onOpen:Function;
    private _onMessage:Function;
    private _onClose:Function;
    private _onError:Function;
    private _target:any;
    private _useBinary = false;
    private _startTime = 0;
    private _endTime = 0;

    //消息发送数量
    private _sendCount = 0;
    //消息接收数量
    private _resvCount = 0;

    private _serverRoute:ServerRouteInfo;

    constructor(url:string, routes:ServerRouteInfo = null,cerPath = null)
    {
        this._url = url;
        this._serverRoute = routes;
        this._cerPath = cerPath
    }

    public get status()
    {
        return this._status;
    }

    public init(target, onMesage, onOpen, onError, onClose, useBinary = false)
    {
        this._target = target;
        this._onMessage = onMesage;
        this._onOpen = onOpen;
        this._onError = onError;
        this._onClose = onClose;
        this._useBinary = useBinary;
    }

    public get isConnected()
    {
        return this.status == NetStatus.connected;
    }

    public send(msg)
    {
        Logger.log("Send Socket:", msg);
        if(this._socket != null && this.isConnected)
        {
            this._socket.send(msg);
            this._sendCount++;
        }
    }

    public get usePb()
    {
        return this._useBinary;
    }

    public connect()
    {
        this._startTime = new Date().valueOf()
        if(CC_JSB)
        {
            
            let pemUrl = Global.UrlUtil.getCacertPath();
            // if (this._cerPath){
            //     pemUrl = this._cerPath
            // }
            Logger.error("------------pemUrl", pemUrl)
            this._socket = new WebSocket(this._url,{}, pemUrl);
        }
        else
            this._socket = new WebSocket(this._url);
        if(this._useBinary)
        {
            this._socket.binaryType = "arraybuffer";
        }
        this._socket.onopen = ()=>
        {
            this._status = NetStatus.connected;
            if(this._onOpen)
                this._onOpen.call(this._target);
        }
        this._socket.onclose = (env:CloseEvent)=>
        {
            this._endTime = new Date().valueOf()
            let htime = this._endTime - this._startTime
            if(env && env.reason)
            {
                Logger.error("net socket is closed", env.reason);
                //let reportParam = { "error_code": 0, "reason":  env.reason, "url": this._url,"htime":htime }
                let reportParam = this.getReportParam(0, env.reason, htime)
                let reportKey = ReportTool.REPORT_TYPE_SOCKET_ERROR
                Global.ReportTool.ReportClientError(reportKey, reportParam)
            }
            Logger.error("net socket is closed")
            this._status = NetStatus.close;
            if(this._onClose)
                this._onClose.call(this._target);
            return null;
        }
        this._socket.onerror = (env:Event)=>
        {
            this._endTime = new Date().valueOf()
            let htime = this._endTime - this._startTime
            if(env)
            {
                let reason = ""
                try
                {
                    // reason = JSON.stringify(env)
                    // Logger.error("net socket error reason", reason);
                    // let reportParam = { "error_code": -1, "reason": reason, "url": this._url,"htime":htime }
                    let reportParam = this.getReportParam(-1, reason, htime)
                    let reportKey = ReportTool.REPORT_TYPE_SOCKET_ERROR
                    Global.ReportTool.ReportClientError(reportKey, reportParam)
                } 
                catch(e){
                    // let reportParam = { "error_code": -1, "reason": "no reason 1", "url": this._url ,"htime":htime}
                    let reportParam = this.getReportParam(-1, "no reason 1", htime)
                    let reportKey = ReportTool.REPORT_TYPE_SOCKET_ERROR
                    Global.ReportTool.ReportClientError(reportKey, reportParam)
                }
            }else {
                // let reportParam = { "error_code": -1, "reason": "no reason 2", "url": this._url,"htime":htime }
                let reportParam = this.getReportParam(-1, "no reason 2", htime)
                let reportKey = ReportTool.REPORT_TYPE_SOCKET_ERROR
                Global.ReportTool.ReportClientError(reportKey, reportParam)
            }
            Logger.error("net socket error reason")
            this._status = NetStatus.close;
            if(this._onError)
                this._onError.call(this._target);
        }
        this._socket.onmessage = (e)=>
        {
            if(!e || !e.data)
                return;
            this.onMessage(e.data);
        }
        this._status = NetStatus.connecting;
    }


    private getReportParam(errorCode, reason, htime)
    {
        let param:any = {}
        param.error_code = errorCode;
        param.reason = reason;
        param.url = this._url;
        param.htime = htime;
        param.sCount = this._sendCount;
        param.rCount = this._resvCount;
        //区分链接成功断开 和 链接未成功
        if(this._resvCount > 0){
            param.error_code = -2
        }
        if(this._serverRoute)
        {
            param.port = this._serverRoute.port;
            param.us_port = this._serverRoute.us_port;
            param.lo_port = this._serverRoute.lo_port;
            param.host = this._serverRoute.realHost;
            param.addr_host = this._serverRoute.host;
        }
        return param;
    }

    private onMessage(data)
    {
        this._resvCount++;
        //data 格式化？
        if(this._onMessage)
            this._onMessage.call(this._target, data);
    }

    public cleanSocket()
    {
        this.close();
        if(this._socket)
        {
            // this._socket.onclose = null;
            // this._socket.onmessage = null;
            // this._socket.onopen = null;
            // this._socket.onerror = null;
            this._socket = null;
        }
        this.cleanCallback();
    }

    public cleanCallback()
    {
        this._useBinary = false;
        this._onMessage = null;
        this._onClose = null;
        this._onMessage = null;
        this._onError = null;
    }

    public close()
    {
        
        if(cc.sys.isObjectValid(this._socket))
        {
            try
            {
                this._socket.close();
            }
            catch(e)
            {

            }
        }
    }
}