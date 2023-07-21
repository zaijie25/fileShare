import IDNS, { DNSInfo } from "./IDNS";
import { ServerUrl } from "../../../logic/core/setting/ServerRoutes";

export default class WangsuDNS implements IDNS {
    //网宿httpdns域名地址
    // private httpDNSHost = "edge.wshttpdns.com";
    //海外httpdns请求ip
    private httpDNSAdverbIP = "220.242.54.8";
    // private httpDNSAdverbIP = "edge.wshttpdns.com";

    //大陆IP
    private mainLandDNSIPs = ["118.184.178.244", "118.184.176.205", "103.213.96.176"]

    //httpdns请求超时时长
    private requestTimeout = 10000;

    //host to ip arrays
    private hostToIpMap = {};

    private leftTTLTime = 0;

    private isRunning = false;

    private adverbIPMap = {};
    private mainLandIPMap = {};
    private IP_TYPE_ADVERB = 1;//海外IP
    private IP_TYPE_MAINLAND = 2;//大陆IP

    public init(cfg) { }

    /**
     * 预设置使用httpdns的host
     * @param hosts 
     * @param callback 完成回调，如果使用回调最好在外部做好超时处理，10超时体验会比较差
     */
    public requestHosts(hosts: string[], callback, syncMode) {
        if (hosts == null || hosts.length == 0) {
            Logger.error("请求的hosts列表为空")
            return;
        }

        //使用海外IP
        let url = this.getRequestUrl(this.httpDNSAdverbIP, hosts);
        Global.Http.requestDirect(url,
            (msg) => {
                Logger.error("receive ", msg);
                this.decodeMsg(msg, this.IP_TYPE_ADVERB)
                if (syncMode && callback)
                    callback()
            },
            () => {
                this.handleError(callback)
                if (syncMode && callback)
                    callback();
            }
            , "get", null, this.requestTimeout);

        let WangsuDNS = Global.Setting.WangsuDNS
        let dnsArray = this.mainLandDNSIPs;
        if (WangsuDNS && WangsuDNS.length > 0) {
            Logger.error("use data dns")
            dnsArray = WangsuDNS
        } else {
            Logger.error("no use data dns")
        }
        //同时使用国内ip并发请求。
        for (let i = 0; i < dnsArray.length; i++) {
            let mainLandIP = dnsArray[i]
            let ipUrl = this.getRequestUrl(mainLandIP, hosts);
            Global.Http.requestDirect(ipUrl, (msg) => {
                this.decodeMsg(msg, this.IP_TYPE_MAINLAND)
            }, () => {
                this.handleError(callback)
            }, "get", null, this.requestTimeout)

        }

        if (!syncMode && callback) {
            callback();
            Logger.error("call now")
        }
    }

    public getHttpRequestDNSInfo(url, ipAreaType = 0) {
        let host = Global.UrlUtil.getHostFromUrl(url);
        if (this.checkIsWangsuSelfIp(host)) {
            let requestInfo = new DNSInfo();
            requestInfo.realUrl = url;
            requestInfo.ip = host;
            requestInfo.host = "edge.wshttpdns.com";
            requestInfo.headerMap = { "Host": "edge.wshttpdns.com" };
            return requestInfo;
        } else {
            let ip = this.getIp(host, ipAreaType);
            if (ip == null || ip == "") {
                return null;
            }
            url = url.replace(host, ip);
            let requestInfo = new DNSInfo();
            requestInfo.realUrl = url;
            requestInfo.ip = ip;
            requestInfo.host = host;
            requestInfo.headerMap = { "Host": host };
            return requestInfo;
        }
    }

    public getHttpDNSInfo(url:ServerUrl,ipAreaType =0){
        let host = url.address
        if (this.checkIsWangsuSelfIp(host)){
            let requestInfo = new DNSInfo();
            requestInfo.realUrl = url;
            requestInfo.ip = host;
            requestInfo.host = "edge.wshttpdns.com";
            requestInfo.headerMap = { "Host": "edge.wshttpdns.com" };
            return requestInfo;
        }else {
            let realHost = url.realHost
            let addressHost = url.addressHost
            let ip = this.getIp(realHost, ipAreaType);
            if (ip == null || ip == "") {
                //如果是自定义域名，则host走自定义域名
                if (addressHost != realHost){
                    url.address = realHost
                    let dnsInfo = new DNSInfo()
                    dnsInfo.ip = ip;
                    dnsInfo.host = addressHost;
                    let headerMap = { "Host": url.addressHost }
                    if (url.cerPath){
                        headerMap["CertPath"] = url.cerPath
                    }
                    dnsInfo.headerMap = headerMap
                    return dnsInfo;
                }
                return null;
            }
            url.address = ip
            let requestInfo = new DNSInfo();
            // requestInfo.realUrl = url;
            requestInfo.ip = ip;
            requestInfo.host = addressHost;
            let headerMap = { "Host": url.addressHost }
            if (url.cerPath){
                headerMap["CertPath"] = url.cerPath
            }
            requestInfo.headerMap = headerMap
            return requestInfo;
        }
    }

    public checkIsWangsuSelfIp(ip) {
        if (ip == "220.242.54.8" || ip == "118.184.178.244" || ip == "118.184.176.205" || ip == "103.213.96.176") {
            return true;
        }
        return false;
    }

    //获取IP
    public getIp(host: string, ipAreaType = 0) {
        // Logger.error("getIp ipAreaType=" + ipAreaType)
        let ips = null;
        if (ipAreaType == this.IP_TYPE_ADVERB) {
            ips = this.adverbIPMap[host]
        } else if (ipAreaType == this.IP_TYPE_MAINLAND) {
            ips = this.mainLandIPMap[host]
        }
        //如果取不到
        if (ips == null || ips.length == 0) {
            ips = this.hostToIpMap[host]
        }

        if (ips == null || ips.length == 0)
            return null;
        let randIndex = Math.floor(Math.random() * ips.length);
        return ips[randIndex];
    }

    //定时器更新，暂定5秒更新一次
    public update(time) {
        if (!this.isRunning)
            return;
        this.leftTTLTime -= time;
        if (this.leftTTLTime <= 0) {
            //ttl跑完时  全部域名重新请求一次
            this.isRunning = false;
            this.reRequestAll();
        }
    }

    private reRequestAll() {
        let hostArr = []
        for (let key in this.hostToIpMap) {
            hostArr.push(key);
        }
        this.requestHosts(hostArr, null, false);
    }

    private decodeMsg(content, ipAreaType) {
        let contentTab = null;
        try {
            contentTab = JSON.parse(content)
        }
        catch (e) {
            contentTab = {};
        }
        if (contentTab.retCode == null || contentTab.retCode != 0 || contentTab.data == null)
            return;

        for (let key in contentTab.data) {
            let host = key;
            let ips = contentTab.data[key].ips;
            if (ips.length <= 0 || contentTab.data[key].ttl == null || contentTab.data[key].ttl <= 0)
                continue;
            if (this.leftTTLTime <= 0 && contentTab.data[key].ttl > 0) {
                this.leftTTLTime = contentTab.data[key].ttl
                this.isRunning = true;
            }
            if (ipAreaType == this.IP_TYPE_ADVERB) {
                this.adverbIPMap[host] = ips
            } else {
                this.mainLandIPMap[host] = ips
            }
            this.hostToIpMap[host] = ips;
        }
    }

    private handleError(callback) {
    }

    //获取请求连接
    private getRequestUrl(host: string, urls: string[]) {
        let urlStr = urls.join(";")
        return "https://" + host + "/v1/httpdns/clouddns?ws_domain=" + urlStr + "&ws_ret_type=json";
    }
}