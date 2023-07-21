import EventDispatcher from "../../event/EventDispatcher";
import { Logger } from "../../debug/Logger";
import { ServerUrl } from "../../../logic/core/setting/ServerRoutes";

export default class HttpRequest extends EventDispatcher {
    public static EVENT_COMPLETE = "complete";
    public static EVENT_ERROR = "error";

    private _http: XMLHttpRequest = new XMLHttpRequest;
    private _data: any;
    private _url: string;
    private _responseType: string;
    private _startTime = 0;
    private _endTime = 0;

    _timeOut:any
    isError = false;

    public get data() {
        return this._data;
    }

    public get url() {
        return this._url;
    }

    public send(serverUrl: ServerUrl, data: any = null, method: string = "get", responseType = "text", headers: [] = null) {
        this._responseType = responseType;
        this._data = null;
        // Logger.error("Global.Http.cookie  = " + Global.Http.cookie)
        let url = ""
        let requestInfo = Global.DNS.getHttpRequestDNSInfo(serverUrl,0);
        if(requestInfo != null && requestInfo.headerMap != null)
        {
            url = requestInfo.realUrl;
            let headerMap = requestInfo.headerMap;
            if(headerMap != null)
            {
                if (Global.Http.cookie){
                    headerMap["Cookie"] = Global.Http.cookie
                }
                let headerStr = JSON.stringify(headerMap);
                Logger.error("header 1 is !!!!", headerStr);
                Global.NativeEvent.setRequestProperty(headerStr);
                for (let key in headerMap){
                    let value = headerMap[key]
                    this._http.setRequestHeader(key,value)
                }
                
            }
        }else {
            if (Global.Http.cookie){
                let headerMap = {"Cookie":Global.Http.cookie}
                let headerStr = JSON.stringify(headerMap);
                Logger.error("header 2 is !!!!", headerStr);
                Global.NativeEvent.setRequestProperty(headerStr);

                for (let key in headerMap){
                    let value = headerMap[key]
                    this._http.setRequestHeader(key,value)
                }
            }
        }
        let headSign = null
        let sign_url = null
        if (serverUrl.isInnerRequest){
            let httpSignInfo = Global.UrlUtil.dealHttpSign(serverUrl)
            headSign = httpSignInfo.headSign
            sign_url = httpSignInfo.sign_url
        }else {
            sign_url = serverUrl.getUrl()
        }
        
        if (!sign_url){
            Logger.error("http send sign_url error " + sign_url)
            return;
        }
        
        // Logger.error("send url", sign_url);
        url = sign_url
        this._url = sign_url;
        let http = this._http;
        
        
        //更新链接和header信息
        
        http.open(method, url, true);
        
        if (headers && headers.length > 0) {
            for (let i = 0; i < headers.length; i++) {
                http.setRequestHeader(headers[i++], headers[i]);
            }
        }
        else {
            http.setRequestHeader("Content-Type", "text/plain");
        }

         if (cc.sys.isNative && headSign){
            http.setRequestHeader("Summor", headSign);
         }

        //  if(url.indexOf("mini")>=0){
        //     http.setRequestHeader("Summor", httpSign);
        //  }
         

        http.responseType = responseType !== "arraybuffer" ? "text" : "arraybuffer";
        http.onreadystatechange = this.onReadyStateChange.bind(this)

        
        http.send(data);
        

        http.onerror = (e) => {
            this.onError("onerror " + "[" + this._http.status + "]" + this._http.statusText + ":" + this._http.responseURL)
        }
        this._startTime = new Date().valueOf()
        http.ontimeout = (e)=>{ this.httpEvent("ontimeout", e)}

    }

    public setTimeout(timeout) {
        this.clearTimer();
        if (this._http) {
            this._http.timeout = timeout;
            this._timeOut = setTimeout(() => {
                this.onError("request timeout  " + 0)
                
            }, timeout);
        }
    }

    private clearTimer(){
        if (this._timeOut) {
            clearTimeout(this._timeOut)
            this._timeOut = null
        }
    }

    private httpEvent(type, event: ProgressEvent) {
        Logger.error(type, event);
        this.onError("request timeout  " + 0)
    }

    private onReadyStateChange() {
        if (this._http.readyState == 4) {
            this._endTime = new Date().valueOf();
            this.clearTimer();
            if (this._http.status >= 200 && this._http.status < 300) {
                this.onComplete()
            }else {
                this.onError("onReadyStateChange " + "[" + this._http.status + "]" + this._http.statusText + ":" + this._http.responseURL)
            }
        }
    }

    private onError(content) {
        this.clearTimer();
        this._endTime = new Date().valueOf();
        Logger.error("onError():" + content, this._url);
        if (this.isError){
            return;
        }
        this.isError = true;
        let hTime = this._endTime - this._startTime
        this.event(HttpRequest.EVENT_ERROR, this._http,hTime);
        this.clear();
    }

    private onComplete() {
        this.clearTimer();
        
        var flag: Boolean = true;
        try {
            if (this._responseType === "json") {
                this._data = JSON.parse(this._http.responseText);
                //暂不支持xml
                // } else if (this._responType === "xml") {
                // 	this._data = Utils.parseXMLFromString(this._http.responseText);
            } else {
                this._data = this._http.response || this._http.responseText;
            }
        }
        catch (e) {
            flag = false;
            this.onError(e)
        }
        flag && this.event(HttpRequest.EVENT_COMPLETE, this._data instanceof Array ? [this._data] : this._data);
        this.clear();
    }

    private clear() {
        this._http.onreadystatechange = null;
        this.offAll("")
    
    }

}