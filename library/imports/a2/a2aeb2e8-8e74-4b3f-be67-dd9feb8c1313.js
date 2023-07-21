"use strict";
cc._RF.push(module, 'a2aebLojnRLP75n3Z/rjBMT', 'DNSControl');
// hall/scripts/framework/net/dns/DNSControl.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DNSTYPE = void 0;
var IDNS_1 = require("./IDNS");
var WangsuDns_1 = require("./WangsuDns");
var OldVersionDNS_1 = require("./OldVersionDNS");
var AliDNS_1 = require("./AliDNS");
var DNSTYPE;
(function (DNSTYPE) {
    DNSTYPE[DNSTYPE["None"] = 0] = "None";
    DNSTYPE[DNSTYPE["OldVersion"] = 1] = "OldVersion";
    DNSTYPE[DNSTYPE["Wangsu"] = 2] = "Wangsu";
    DNSTYPE[DNSTYPE["Ali"] = 3] = "Ali";
})(DNSTYPE = exports.DNSTYPE || (exports.DNSTYPE = {}));
var DNSControl = /** @class */ (function () {
    function DNSControl() {
        this.DNSType = DNSTYPE.None;
        this.checkInerval = 5000;
        this.timeID = null;
        //等待模式  需要等到ip返回才能出发回调
        this.syncMode = false;
        //默认为网宿 同步模式
        // public DNSConfig = {type:2, syncMode:1};
        //如果默认为ALi 需要配置对应参数
        this.DNSConfig = { type: 3, accountId: "151925", syncMode: 1 };
        this.selfDNSMap = {};
    }
    //更新DNS配置  下次重启生效
    DNSControl.prototype.setDNSConfg = function (cfg) {
        if (cfg == null && cfg.type == null)
            return;
        Global.Setting.storage.setObject("DNSConfig", cfg);
    };
    DNSControl.prototype.loadDNSConfig = function () {
        var cfg = Global.Setting.storage.getObject("DNSConfig");
        if (cfg == null) {
            Logger.error("loadDNSConfig config = null");
            return;
        }
        this.DNSConfig = cfg;
    };
    DNSControl.prototype.init = function () {
        this.loadDNSConfig();
        //同步等待模式  配置为1为同步等待
        if (this.DNSConfig && this.DNSConfig.syncMode)
            this.syncMode = this.DNSConfig.syncMode == 1;
        var dnsType = this.DNSConfig.type;
        this.DNSType = dnsType ? Number(dnsType) : 0;
        //网页版不开启DNS
        if (!cc.sys.isNative)
            this.DNSType = DNSTYPE.None;
        this.DNS = this.createDns();
        Logger.error("DNS config", JSON.stringify(this.DNSConfig));
        Logger.error("DNS Type is ", this.DNSType);
        Logger.error("DNS syncMode is ", this.syncMode);
        if (this.DNS) {
            this.DNS.init(this.DNSConfig);
            this.startTimer();
        }
    };
    DNSControl.prototype.startTimer = function () {
        var _this = this;
        clearInterval(this.timeID);
        this.timeID = setInterval(function () {
            if (_this.DNS)
                _this.DNS.update(_this.checkInerval / 1000);
        }, this.checkInerval);
    };
    DNSControl.prototype.createDns = function () {
        switch (this.DNSType) {
            case DNSTYPE.Wangsu:
                return new WangsuDns_1.default();
            case DNSTYPE.OldVersion:
                return new OldVersionDNS_1.default();
            case DNSTYPE.None:
                return null;
            case DNSTYPE.Ali:
                return new AliDNS_1.default();
            default:
                Logger.error("找不到DNS类型！！！！", this.DNSType);
                this.DNSType = DNSTYPE.None;
        }
    };
    //请求开关
    DNSControl.prototype.requestHosts = function (hosts, callback) {
        Logger.error("requestHosts", hosts, this.DNSType, this.syncMode);
        hosts = this.filterSelfDNS(hosts);
        if (this.DNSType == DNSTYPE.None || this.DNS == null) {
            if (callback)
                callback();
            return;
        }
        this.DNS.requestHosts(hosts, callback, this.syncMode);
    };
    DNSControl.prototype.getIp = function (host, ipAreaType) {
        if (ipAreaType === void 0) { ipAreaType = 0; }
        //先检查内部dns列表
        if (this.selfDNSMap[host])
            return this.selfDNSMap[host];
        if (this.DNSType == DNSTYPE.None)
            return null;
        return this.DNS.getIp(host, ipAreaType);
    };
    DNSControl.prototype.getHttpRequestDNSInfo = function (url, ipAreaType) {
        if (ipAreaType === void 0) { ipAreaType = 0; }
        Logger.log("getHttpRequestDNSInfo before " + url.printSelf());
        var dnsInfo = this.getSelfDNSInfo(url);
        if (dnsInfo != null) {
            Logger.log("getHttpRequestDNSInfo dnsInfo != null");
            return dnsInfo;
        }
        if (this.DNSType == DNSTYPE.None || this.DNS == null) {
            Logger.log("getHttpRequestDNSInfo DNSType == null");
            return null;
        }
        dnsInfo = this.DNS.getHttpDNSInfo(url);
        Logger.log("getHttpRequestDNSInfo after " + url.printSelf());
        return dnsInfo;
    };
    DNSControl.prototype.getSelfDNSInfo = function (url) {
        if (url.address == url.addressHost && url.addressHost == url.realHost) {
            Logger.log("getSelfDNSInfo address == addressHost");
            return;
        }
        var isIpAddress = Global.UrlUtil.checkIsIp(url.address);
        var isRealHostIpAddress = Global.UrlUtil.checkIsIp(url.realHost);
        if (!isIpAddress && !isRealHostIpAddress) {
            Logger.log("getSelfDNSInfo address && realHost is not ip");
            return;
        }
        var requestInfo = new IDNS_1.DNSInfo();
        if (isRealHostIpAddress) {
            url.address = url.realHost;
        }
        requestInfo.ip = url.address;
        requestInfo.host = url.addressHost;
        requestInfo.port = url.port;
        var headerMap = { "Host": url.addressHost };
        if (url.cerPath) {
            headerMap["CertPath"] = url.cerPath;
        }
        requestInfo.headerMap = headerMap;
        return requestInfo;
    };
    DNSControl.prototype.filterSelfDNS = function (hosts) {
        var realHost = [];
        for (var i = 0; i < hosts.length; i++) {
            if (!this.selfDNSMap[hosts[i]])
                realHost.push(hosts[i]);
        }
        return realHost;
    };
    //预处理盾
    DNSControl.prototype.dealDunRoute = function (serverUrl, lo_port, lo_type) {
        Logger.error("dealDunRoute serverurl ,lo_port,lo_type ", serverUrl.printSelf(), lo_port, lo_type);
        if (!lo_type || !lo_port) {
            return serverUrl;
        }
        var isSupport = Global.AppDun.checkAppIsSupportDunByType(lo_type);
        if (!isSupport) {
            Logger.error("App not support dun = " + lo_type);
            return serverUrl;
        }
        var isDunInit = Global.AppDun.getDunIsInitByType(lo_type);
        var ipPortInfo = Global.AppDun.getServerIPAndPort(serverUrl.realHost, lo_port, lo_type, serverUrl.attr);
        if (lo_port && lo_port > 0 && isDunInit && ipPortInfo) {
            var serverIp = ipPortInfo.ip;
            var serverPort = ipPortInfo.port;
            if (!serverIp || !serverPort) {
                Logger.error("dealDunRoute serverIp == null || serverPort == null ");
                return serverUrl;
            }
            serverUrl.lo_type = lo_type;
            var address = serverUrl.address;
            if (this.checkIsSelfDnsUrl(address)) {
                var array = address.split("...");
                if (array.length < 2) {
                    Logger.error("dealDunRoute array < 2");
                    return serverUrl;
                }
                var host = array[1];
                if (host) {
                    serverUrl.address = serverIp;
                    serverUrl.port = serverPort;
                    serverUrl.addressHost = host;
                    // url = serverIp + ":" + serverPort + "..." + host
                    Logger.error("dealDunRoute isSelfDnsUrl = true  host != null " + serverUrl.printSelf());
                }
                else {
                    Logger.error("... host = null");
                    // url = serverIp + ":" + serverPort
                    serverUrl.address = serverIp;
                    serverUrl.port = serverPort;
                    Logger.error("dealDunRoute isSelfDnsUrl = true  host == null" + serverUrl.printSelf());
                }
            }
            else {
                // let host = url
                // url = serverIp + ":" + serverPort + "..." + host
                serverUrl.address = serverIp;
                serverUrl.port = serverPort;
                Logger.error("dealDunRoute isSelfDnsUrl = false  " + serverUrl.printSelf());
            }
        }
        return serverUrl;
    };
    DNSControl.prototype.dealSelfRoute = function (serverUrl) {
        var address_url = serverUrl.address;
        if (this.checkIsSelfDnsUrl(address_url)) {
            var array = address_url.split("...");
            if (array.length < 2) {
                Logger.error("dealSelfRoute array < 2");
                return serverUrl;
            }
            var address = array[0];
            var addressHost = array[1];
            var addressPort = Global.UrlUtil.getPortFromUrl(address);
            serverUrl.address = address;
            // Logger.error("dealSelfRoute address = " + address)
            // Logger.error("dealSelfRoute addressHost = " + addressHost)
            // Logger.error("dealSelfRoute addressPort = " + addressPort)
            if (addressPort) {
                serverUrl.port = addressPort;
                var addressUrl = Global.UrlUtil.getHostFromUrl(address);
                serverUrl.address = addressUrl;
                serverUrl.realHost = addressHost;
            }
            else {
                var isAddressIP = Global.UrlUtil.checkIsIp(address);
                if (!isAddressIP) {
                    serverUrl.realHost = address;
                }
                else {
                    serverUrl.realHost = addressHost;
                }
            }
            serverUrl.addressHost = addressHost;
        }
    };
    // //预处理域名 
    // public dealSelfDNSRoute(url, lo_port,lo_type) {
    //     // Logger.error("dealSelfDNSRoute url = " + url)
    //     // Logger.error("dealSelfDNSRoute lo_port = " + lo_port)
    //     // Logger.error("dealSelfDNSRoute lo_type = " + lo_type)
    //     if (!lo_type || !lo_port){
    //         return url;
    //     }
    //     let isSupport = Global.AppDun.checkAppIsSupportDunByType(lo_type)
    //     if (!isSupport){
    //         Logger.error("App not support dun = " + lo_type)
    //         return url;
    //     }
    //     let isDunInit = Global.AppDun.getDunIsInitByType(lo_type)
    //     let ipPortInfo = Global.AppDun.getServerIPAndPort(url,lo_port,lo_type)
    //     if (lo_port && lo_port > 0 && isDunInit && ipPortInfo) {
    //         let serverIp = ipPortInfo.ip
    //         let serverPort = ipPortInfo.port
    //         if (!serverIp || !serverPort){
    //             Logger.error("dealSelfDNSRoute serverIp == null || serverPort == null ")
    //             return url;
    //         }
    //         if (this.checkIsSelfDnsUrl(url)) {
    //             let array = url.split("...");
    //             if (array.length < 2) {
    //                 Logger.error("dealSelfDNSRoute array < 2")
    //                 return url;
    //             }
    //             let host = array[1]
    //             if (host) {
    //                 url = serverIp + ":" + serverPort + "..." + host
    //             } else {
    //                 Logger.error("... host = null")
    //                 url = serverIp + ":" + serverPort
    //             }
    //         } else {
    //             let host = url
    //             url = serverIp + ":" + serverPort + "..." + host
    //         }
    //     }
    //     // Logger.error("dealSelfDNSRoute url = " + url)
    //     return url;
    // }
    //ip...host
    DNSControl.prototype.checkIsSelfDnsUrl = function (url) {
        //不可能等于0
        return url.indexOf("...") > 0;
    };
    return DNSControl;
}());
exports.default = DNSControl;

cc._RF.pop();