"use strict";
cc._RF.push(module, '80e8aaBbddDPJFVz8+Zi0Sm', 'WangsuDns');
// hall/scripts/framework/net/dns/WangsuDns.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IDNS_1 = require("./IDNS");
var WangsuDNS = /** @class */ (function () {
    function WangsuDNS() {
        //网宿httpdns域名地址
        // private httpDNSHost = "edge.wshttpdns.com";
        //海外httpdns请求ip
        this.httpDNSAdverbIP = "220.242.54.8";
        // private httpDNSAdverbIP = "edge.wshttpdns.com";
        //大陆IP
        this.mainLandDNSIPs = ["118.184.178.244", "118.184.176.205", "103.213.96.176"];
        //httpdns请求超时时长
        this.requestTimeout = 10000;
        //host to ip arrays
        this.hostToIpMap = {};
        this.leftTTLTime = 0;
        this.isRunning = false;
        this.adverbIPMap = {};
        this.mainLandIPMap = {};
        this.IP_TYPE_ADVERB = 1; //海外IP
        this.IP_TYPE_MAINLAND = 2; //大陆IP
    }
    WangsuDNS.prototype.init = function (cfg) { };
    /**
     * 预设置使用httpdns的host
     * @param hosts
     * @param callback 完成回调，如果使用回调最好在外部做好超时处理，10超时体验会比较差
     */
    WangsuDNS.prototype.requestHosts = function (hosts, callback, syncMode) {
        var _this = this;
        if (hosts == null || hosts.length == 0) {
            Logger.error("请求的hosts列表为空");
            return;
        }
        //使用海外IP
        var url = this.getRequestUrl(this.httpDNSAdverbIP, hosts);
        Global.Http.requestDirect(url, function (msg) {
            Logger.error("receive ", msg);
            _this.decodeMsg(msg, _this.IP_TYPE_ADVERB);
            if (syncMode && callback)
                callback();
        }, function () {
            _this.handleError(callback);
            if (syncMode && callback)
                callback();
        }, "get", null, this.requestTimeout);
        var WangsuDNS = Global.Setting.WangsuDNS;
        var dnsArray = this.mainLandDNSIPs;
        if (WangsuDNS && WangsuDNS.length > 0) {
            Logger.error("use data dns");
            dnsArray = WangsuDNS;
        }
        else {
            Logger.error("no use data dns");
        }
        //同时使用国内ip并发请求。
        for (var i = 0; i < dnsArray.length; i++) {
            var mainLandIP = dnsArray[i];
            var ipUrl = this.getRequestUrl(mainLandIP, hosts);
            Global.Http.requestDirect(ipUrl, function (msg) {
                _this.decodeMsg(msg, _this.IP_TYPE_MAINLAND);
            }, function () {
                _this.handleError(callback);
            }, "get", null, this.requestTimeout);
        }
        if (!syncMode && callback) {
            callback();
            Logger.error("call now");
        }
    };
    WangsuDNS.prototype.getHttpRequestDNSInfo = function (url, ipAreaType) {
        if (ipAreaType === void 0) { ipAreaType = 0; }
        var host = Global.UrlUtil.getHostFromUrl(url);
        if (this.checkIsWangsuSelfIp(host)) {
            var requestInfo = new IDNS_1.DNSInfo();
            requestInfo.realUrl = url;
            requestInfo.ip = host;
            requestInfo.host = "edge.wshttpdns.com";
            requestInfo.headerMap = { "Host": "edge.wshttpdns.com" };
            return requestInfo;
        }
        else {
            var ip = this.getIp(host, ipAreaType);
            if (ip == null || ip == "") {
                return null;
            }
            url = url.replace(host, ip);
            var requestInfo = new IDNS_1.DNSInfo();
            requestInfo.realUrl = url;
            requestInfo.ip = ip;
            requestInfo.host = host;
            requestInfo.headerMap = { "Host": host };
            return requestInfo;
        }
    };
    WangsuDNS.prototype.getHttpDNSInfo = function (url, ipAreaType) {
        if (ipAreaType === void 0) { ipAreaType = 0; }
        var host = url.address;
        if (this.checkIsWangsuSelfIp(host)) {
            var requestInfo = new IDNS_1.DNSInfo();
            requestInfo.realUrl = url;
            requestInfo.ip = host;
            requestInfo.host = "edge.wshttpdns.com";
            requestInfo.headerMap = { "Host": "edge.wshttpdns.com" };
            return requestInfo;
        }
        else {
            var realHost = url.realHost;
            var addressHost = url.addressHost;
            var ip = this.getIp(realHost, ipAreaType);
            if (ip == null || ip == "") {
                //如果是自定义域名，则host走自定义域名
                if (addressHost != realHost) {
                    url.address = realHost;
                    var dnsInfo = new IDNS_1.DNSInfo();
                    dnsInfo.ip = ip;
                    dnsInfo.host = addressHost;
                    var headerMap_1 = { "Host": url.addressHost };
                    if (url.cerPath) {
                        headerMap_1["CertPath"] = url.cerPath;
                    }
                    dnsInfo.headerMap = headerMap_1;
                    return dnsInfo;
                }
                return null;
            }
            url.address = ip;
            var requestInfo = new IDNS_1.DNSInfo();
            // requestInfo.realUrl = url;
            requestInfo.ip = ip;
            requestInfo.host = addressHost;
            var headerMap = { "Host": url.addressHost };
            if (url.cerPath) {
                headerMap["CertPath"] = url.cerPath;
            }
            requestInfo.headerMap = headerMap;
            return requestInfo;
        }
    };
    WangsuDNS.prototype.checkIsWangsuSelfIp = function (ip) {
        if (ip == "220.242.54.8" || ip == "118.184.178.244" || ip == "118.184.176.205" || ip == "103.213.96.176") {
            return true;
        }
        return false;
    };
    //获取IP
    WangsuDNS.prototype.getIp = function (host, ipAreaType) {
        if (ipAreaType === void 0) { ipAreaType = 0; }
        // Logger.error("getIp ipAreaType=" + ipAreaType)
        var ips = null;
        if (ipAreaType == this.IP_TYPE_ADVERB) {
            ips = this.adverbIPMap[host];
        }
        else if (ipAreaType == this.IP_TYPE_MAINLAND) {
            ips = this.mainLandIPMap[host];
        }
        //如果取不到
        if (ips == null || ips.length == 0) {
            ips = this.hostToIpMap[host];
        }
        if (ips == null || ips.length == 0)
            return null;
        var randIndex = Math.floor(Math.random() * ips.length);
        return ips[randIndex];
    };
    //定时器更新，暂定5秒更新一次
    WangsuDNS.prototype.update = function (time) {
        if (!this.isRunning)
            return;
        this.leftTTLTime -= time;
        if (this.leftTTLTime <= 0) {
            //ttl跑完时  全部域名重新请求一次
            this.isRunning = false;
            this.reRequestAll();
        }
    };
    WangsuDNS.prototype.reRequestAll = function () {
        var hostArr = [];
        for (var key in this.hostToIpMap) {
            hostArr.push(key);
        }
        this.requestHosts(hostArr, null, false);
    };
    WangsuDNS.prototype.decodeMsg = function (content, ipAreaType) {
        var contentTab = null;
        try {
            contentTab = JSON.parse(content);
        }
        catch (e) {
            contentTab = {};
        }
        if (contentTab.retCode == null || contentTab.retCode != 0 || contentTab.data == null)
            return;
        for (var key in contentTab.data) {
            var host = key;
            var ips = contentTab.data[key].ips;
            if (ips.length <= 0 || contentTab.data[key].ttl == null || contentTab.data[key].ttl <= 0)
                continue;
            if (this.leftTTLTime <= 0 && contentTab.data[key].ttl > 0) {
                this.leftTTLTime = contentTab.data[key].ttl;
                this.isRunning = true;
            }
            if (ipAreaType == this.IP_TYPE_ADVERB) {
                this.adverbIPMap[host] = ips;
            }
            else {
                this.mainLandIPMap[host] = ips;
            }
            this.hostToIpMap[host] = ips;
        }
    };
    WangsuDNS.prototype.handleError = function (callback) {
    };
    //获取请求连接
    WangsuDNS.prototype.getRequestUrl = function (host, urls) {
        var urlStr = urls.join(";");
        return "https://" + host + "/v1/httpdns/clouddns?ws_domain=" + urlStr + "&ws_ret_type=json";
    };
    return WangsuDNS;
}());
exports.default = WangsuDNS;

cc._RF.pop();