import HttpRequest from "./HttpRequest";
import { ServerRouteInfo, ServerUrl } from "../../../logic/core/setting/ServerRoutes";
import { ReportTool } from "../../../logic/core/tool/ReportTool";

export class ParallelReqInfo
{
    public isReq = false;
    public isRsp = false
    public isReport = false;
    public reqLines = [];
}

export class ParallelReqLine
{
    public lineIndex = 0;
    public repFlag = 0;// 0 未回复，1为有回包 2 为没回包
    public startTime = 0;
    public endTime = 0;
    public reqTime = 0;
    public host = ""
    public url = ""
}

export default class HttpProxy {
    static HttpTimeout = 15000;
    public cookie = "";
    public reqList = []
    //并发请求key
    public parallelReqKey = {}

    constructor(){
        this.parallelReqKey["checkversion"] = new ParallelReqInfo;
        this.parallelReqKey["heartbeat"] = new ParallelReqInfo;
    }

    
    public onUpdate(dt)
    {
        let reqModel = this.reqList.shift()
        if (reqModel){
            let url = reqModel["url"]
            let msg = reqModel["msg"]
            let reqType = reqModel["reqType"]
            let onComplete = reqModel["onComplete"]
            let onError = reqModel["onError"]
            let timeout = reqModel["timeout"]
            let req = new HttpRequest();
            req.on(HttpRequest.EVENT_COMPLETE, this, onComplete)
            req.on(HttpRequest.EVENT_ERROR, this, onError);
            req.setTimeout(timeout);
            Logger.log("Send HallMSG:", msg, url.getUrl())
            msg = msg ? msg: ""
            let encrptedMsg = msg
            if (url.isEncrptParam && msg){
                encrptedMsg = Global.AESUtil.aesEncrptMsg(msg)
            }
            // Logger.log("Send Hall encrptedMsg = " + encrptedMsg)
            req.send(url, encrptedMsg, reqType);
        }
    }

    private pushReqListModel(url:ServerUrl,msg:string,reqType:string,onComplete:Function,onError:Function,timeout:number){
        let reqModel = {}
        reqModel["url"] = url;
        reqModel["msg"] = msg;
        reqModel["reqType"] = reqType;
        reqModel["onComplete"] = (msg) => {
            Global.ReportTool.markSuccess(url);
            if(onComplete)
                onComplete(msg);
        }
        reqModel["onError"] = onError
        reqModel["timeout"] = timeout
        this.reqList[this.reqList.length] = reqModel;
        Logger.log("reqList length = " + this.reqList.length)
    }
    //http post
    public send(url: ServerUrl, param: any, onComplete: Function, onError: Function) {
        let msg = this.getSendContent(param);
        this.pushReqListModel(url,msg,"post",onComplete, (http: XMLHttpRequest,hTime:number) => {
            this.sendError(http, url, param, onComplete, onError,hTime)
        },HttpProxy.HttpTimeout)
        
    }

    private sendError(http: XMLHttpRequest, url: ServerUrl, param: any, onComplete: Function, onError: Function,hTime = 0) {
        let needReload = this.onHttpError(http, url,hTime)
        // if (needReload){
        //     this.send(url,param,onComplete,onError)
        // }

        if (onError) {
            onError()
            onError = null
        }
    }

    public sendWithServerRoute(serverRouteInfo: ServerRouteInfo, suffix, param: any, onComplete: Function, onError: Function) {
        // let url = serverRouteInfo.getUrl() + suffix;
        let serverUrl = serverRouteInfo.getUrl()
        serverUrl.suffix = serverUrl.suffix + suffix
        let msg = this.getSendContent(param);
        this.pushReqListModel(serverUrl,msg,"post",onComplete, (http: XMLHttpRequest,hTime:number) => {
            this.sendWithServerRouteError(http, serverUrl, serverRouteInfo, suffix, param, onComplete, onError,hTime)
        },HttpProxy.HttpTimeout)
    }

    private sendWithServerRouteError(http: XMLHttpRequest, url, serverRouteInfo: ServerRouteInfo, suffix, param: any, onComplete: Function, onError: Function,hTime:number) {
        let needReload = this.onHttpError(http, url,hTime)

        if (onError) {
            onError()
            onError = null
        }
    }

    //http get
    public get(url: string, onComplete: Function, onError?: Function, param?: any) {
        let msg = this.getSendContent(param);
        let serverUrl = new ServerUrl()
        serverUrl.parse(url)
        this.pushReqListModel(serverUrl,msg,"get",onComplete, (http: XMLHttpRequest,hTime:number) => {
            this.getError(http, serverUrl, onComplete, onError, param,hTime);
        },HttpProxy.HttpTimeout)
    }

    private getError(http: XMLHttpRequest, url: ServerUrl, onComplete: Function, onError?: Function, param?: any,hTime = 0) {
        let needReload = this.onHttpError(http, url,hTime)
        if (onError) {
            onError()
            onError = null
        }
    }

    public getWithRetry(url: string, onComplete: Function, onError?: Function, param?: any, retryTime = 0) {
        let msg = this.getSendContent(param);
        let serverUrl = new ServerUrl()
        serverUrl.parse(url)
        this.pushReqListModel(serverUrl,msg,"get",onComplete, (http: XMLHttpRequest,hTime:number) => {
            this.getWithRetryError(http, serverUrl, onComplete, onError, param, retryTime,hTime)
            // this.onGetError(url, onComplete, onError, param, retryTime)
        },HttpProxy.HttpTimeout)
    }

    private getWithRetryError(http: XMLHttpRequest, url: ServerUrl, onComplete: Function, onError?: Function, param?: any, retryTime = 0,hTime = 0) {
        let needReload = this.onHttpError(http, url,hTime)
        if (onError) {
            onError()
            onError = null
        }
    }


     //直接请求 不使用自定义httpdns
     public requestDirect(url, onComplete: Function, onError?: Function, type: string = "get", param?: any, timeout = 15000) {
        let msg = this.getSendContent(param);
        let serverUrl = new ServerUrl()
        serverUrl.parse(url)
        serverUrl.isInnerRequest = false;
        this.pushReqListModel(serverUrl,msg,"get",onComplete,(http: XMLHttpRequest,hTime:number) => {
            this.requestDirectError(http, serverUrl, onComplete, onError, type, param, timeout,hTime)
        },timeout)
    }

    private requestDirectError(http: XMLHttpRequest, url, onComplete: Function, onError?: Function, type: string = "get", param?: any, timeout = 15000,hTime = 0) {
        let needReload = this.onHttpError(http, url,hTime)

        if (onError) {
            onError()
            onError = null
        }
    }

    /**
     * 1.进行错误码上报/提示
     * 2.307/302 重定向请求
     * 
     * 
     * 
     * */
    private onHttpError(http: XMLHttpRequest, serverUrl: ServerUrl,hTime = 0) {
        if (!http || !serverUrl) {
            Logger.error("onHttpError http  || url = null")
            return;
        }
        let httpStatus = http.status;
        let httpBody = http.response || http.responseText
        let httpHeaders = http.getAllResponseHeaders();
        let reqUrl = serverUrl.getUrl();
        let realHost = serverUrl.realHost;
        let addrHost = serverUrl.addressHost

        //获取host
        let host = Global.UrlUtil.getHostFromUrl(reqUrl);
        if (Global.ReportTool.isReportUrl(serverUrl)) {
            Logger.error("isReportUrl !!!!")
            return;
        }

        let reportSignUrl = ""
        if (serverUrl.isInnerRequest){
            let httpSignInfo = Global.UrlUtil.dealHttpSign(serverUrl)
            reportSignUrl = httpSignInfo.sign_url
        }else {
            reportSignUrl = serverUrl.getUrl()
        }
        let reportParam = { "error_code": httpStatus, "body": httpBody, "url": reportSignUrl ,"htime":hTime,"host":realHost, "addrHost":addrHost }
        let reportKey = ReportTool.REPORT_TYPE_HTTP_ERROR
        //上报错误
        let sceneName = '';
        if (this.checkIsDataUrl(realHost)) {
            sceneName = 'D'
            reportKey = ReportTool.REPORT_TYPE_DATA_ERROR
        } else if (reqUrl.indexOf("login") > -1) {
            sceneName = "L"
            reportKey = ReportTool.REPORT_TYPE_LOGIN_ERROR
        } else if (reqUrl.indexOf("checkversion") > -1) {
            sceneName = "C"
            reportKey = ReportTool.REPORT_TYPE_CHECKVERSION_ERROR
        } else if (reqUrl.indexOf("httpdns") > -1) {
            reportKey = ReportTool.REPORT_TYPE_HTTPDNS_ERROR
        }
        let needReload = false;
        if (!this.isHostWithNoTips(reqUrl, httpStatus)) {
            Global.UI.fastTip("网络异常：H-" + sceneName + httpStatus);
        }
        //重定向
        if (httpStatus == 308 || httpStatus == 307 || httpStatus == 302) {
            let cookie = http.getResponseHeader("Set-Cookie")
            if (cookie) {
                Logger.error("httpStatus " + httpStatus)
                Logger.error("307 cookie = " + cookie)
                let cookieStrArray = cookie.split(";")
                if (cookieStrArray && cookieStrArray.length > 0) {
                    let cookieStr = cookieStrArray[0]
                    if (cookieStr && cookieStr.length > 0) {
                        cookieStr = cookieStr.trim();
                        this.cookie = cookieStr
                        Logger.error("307 set cookie = " + this.cookie)
                    }
                }
            }
        }
        else
        {
            Global.ReportTool.ReportClientError(reportKey, reportParam)
        }


        Global.ReportTool.markFailed(serverUrl, httpStatus);
        // Logger.error("httpHeaders : " + httpHeaders)
        return needReload;
    }

    //过滤不需要弹tips错误的域名
    private isHostWithNoTips(url, httpStatus) {
        if (httpStatus == 0 || httpStatus == 307 || httpStatus == 302) {
            return true;
        }
        if (url) {
            if ((url.indexOf("httpdns") > -1) || url.indexOf("ip.360.cn") > -1) {
                return true;
            }
        }
        return false;
    }

    //判断链接是否是dataUrl
    private checkIsDataUrl(url)
    {
        if(!url)
            return false;
        let dataList = Global.Setting.dataUrlsList;
        if(!dataList)
            return false;
        for(let i = 0; i < dataList.length; i++)
        {
            if(dataList[i].indexOf(url) > -1)
                return true;
        }
        return false;
    }

    private onGetError(url: string, onComplete: Function, onError, param, retryTime) {
        retryTime++;
        if (retryTime >= 2) {
            if (onError)
                onError();
            return;
        }
        setTimeout(() => {
            this.getWithRetry(url, onComplete, onError, param, retryTime);
        }, 1000)
        

    }

    public getSendContent(param) {
        if (param == null || param == "")
            return null;
        if (typeof (param) == "string")
            return param;
        return JSON.stringify(param)

    }
}