
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/net/dns/DNSControl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxuZXRcXGRuc1xcRE5TQ29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBdUM7QUFDdkMseUNBQW9DO0FBQ3BDLGlEQUE0QztBQUM1QyxtQ0FBOEI7QUFHOUIsSUFBWSxPQUtYO0FBTEQsV0FBWSxPQUFPO0lBQ2YscUNBQVEsQ0FBQTtJQUNSLGlEQUFjLENBQUE7SUFDZCx5Q0FBVSxDQUFBO0lBQ1YsbUNBQU8sQ0FBQTtBQUNYLENBQUMsRUFMVyxPQUFPLEdBQVAsZUFBTyxLQUFQLGVBQU8sUUFLbEI7QUFDRDtJQUFBO1FBQ1ksWUFBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFFdkIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsV0FBTSxHQUFHLElBQUksQ0FBQztRQUl0QixzQkFBc0I7UUFDZixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRXhCLFlBQVk7UUFDWiwyQ0FBMkM7UUFDM0MsbUJBQW1CO1FBQ1osY0FBUyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQTtRQUV6RCxlQUFVLEdBQUcsRUFBRSxDQUFBO0lBZ1MxQixDQUFDO0lBN1JHLGlCQUFpQjtJQUNWLGdDQUFXLEdBQWxCLFVBQW1CLEdBQUc7UUFDbEIsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSTtZQUMvQixPQUFPO1FBQ1gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRU8sa0NBQWEsR0FBckI7UUFDSSxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEQs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QzVDLHNDQUFzQztJQUN0Qyw2REFBNkQ7SUFDN0QsOEJBQThCO0lBQzlCLGdCQUFnQjtJQUNoQixrQ0FBa0M7SUFDbEMsMEJBQTBCO0lBQzFCLG1FQUFtRTtJQUNuRSx1QkFBdUI7SUFDdkIsa0RBQWtEO0lBQ2xELG9EQUFvRDtJQUNwRCxnQkFBZ0I7SUFDaEIsbUJBQW1CO0lBQ25CLDZCQUE2QjtJQUM3QiwrREFBK0Q7SUFDL0QsWUFBWTtJQUNaLFFBQVE7SUFDUix1REFBdUQ7SUFDdkQsa0JBQWtCO0lBQ2xCLElBQUk7SUFFSixXQUFXO0lBQ0gsc0NBQWlCLEdBQXpCLFVBQTBCLEdBQVc7UUFDakMsUUFBUTtRQUNSLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVMLGlCQUFDO0FBQUQsQ0FoVEEsQUFnVEMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJRE5TLCB7IEROU0luZm8gfSBmcm9tIFwiLi9JRE5TXCI7XHJcbmltcG9ydCBXYW5nc3VETlMgZnJvbSBcIi4vV2FuZ3N1RG5zXCI7XHJcbmltcG9ydCBPbGRWZXJzaW9uRE5TIGZyb20gXCIuL09sZFZlcnNpb25ETlNcIjtcclxuaW1wb3J0IEFsaUROUyBmcm9tIFwiLi9BbGlETlNcIjtcclxuaW1wb3J0IHsgU2VydmVyVXJsIH0gZnJvbSBcIi4uLy4uLy4uL2xvZ2ljL2NvcmUvc2V0dGluZy9TZXJ2ZXJSb3V0ZXNcIjtcclxuXHJcbmV4cG9ydCBlbnVtIEROU1RZUEUge1xyXG4gICAgTm9uZSA9IDAsXHJcbiAgICBPbGRWZXJzaW9uID0gMSxcclxuICAgIFdhbmdzdSA9IDIsXHJcbiAgICBBbGkgPSAzLFxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEROU0NvbnRyb2wge1xyXG4gICAgcHJpdmF0ZSBETlNUeXBlID0gRE5TVFlQRS5Ob25lO1xyXG5cclxuICAgIHByaXZhdGUgY2hlY2tJbmVydmFsID0gNTAwMDtcclxuICAgIHByaXZhdGUgdGltZUlEID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgRE5TOiBJRE5TO1xyXG5cclxuICAgIC8v562J5b6F5qih5byPICDpnIDopoHnrYnliLBpcOi/lOWbnuaJjeiDveWHuuWPkeWbnuiwg1xyXG4gICAgcHVibGljIHN5bmNNb2RlID0gZmFsc2U7XHJcblxyXG4gICAgLy/pu5jorqTkuLrnvZHlrr8g5ZCM5q2l5qih5byPXHJcbiAgICAvLyBwdWJsaWMgRE5TQ29uZmlnID0ge3R5cGU6Miwgc3luY01vZGU6MX07XHJcbiAgICAvL+WmguaenOm7mOiupOS4ukFMaSDpnIDopoHphY3nva7lr7nlupTlj4LmlbBcclxuICAgIHB1YmxpYyBETlNDb25maWcgPSB7IHR5cGU6IDMsIGFjY291bnRJZDogXCIxNTE5MjVcIiwgc3luY01vZGU6IDEgfVxyXG5cclxuICAgIHB1YmxpYyBzZWxmRE5TTWFwID0ge31cclxuXHJcblxyXG4gICAgLy/mm7TmlrBETlPphY3nva4gIOS4i+asoemHjeWQr+eUn+aViFxyXG4gICAgcHVibGljIHNldEROU0NvbmZnKGNmZykge1xyXG4gICAgICAgIGlmIChjZmcgPT0gbnVsbCAmJiBjZmcudHlwZSA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5zZXRPYmplY3QoXCJETlNDb25maWdcIiwgY2ZnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRETlNDb25maWcoKSB7XHJcbiAgICAgICAgbGV0IGNmZyA9IEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2UuZ2V0T2JqZWN0KFwiRE5TQ29uZmlnXCIpO1xyXG4gICAgICAgIGlmIChjZmcgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImxvYWRETlNDb25maWcgY29uZmlnID0gbnVsbFwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuRE5TQ29uZmlnID0gY2ZnO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkRE5TQ29uZmlnKCk7XHJcbiAgICAgICAgLy/lkIzmraXnrYnlvoXmqKHlvI8gIOmFjee9ruS4ujHkuLrlkIzmraXnrYnlvoVcclxuICAgICAgICBpZiAodGhpcy5ETlNDb25maWcgJiYgdGhpcy5ETlNDb25maWcuc3luY01vZGUpXHJcbiAgICAgICAgICAgIHRoaXMuc3luY01vZGUgPSB0aGlzLkROU0NvbmZpZy5zeW5jTW9kZSA9PSAxO1xyXG4gICAgICAgIGxldCBkbnNUeXBlID0gdGhpcy5ETlNDb25maWcudHlwZVxyXG4gICAgICAgIHRoaXMuRE5TVHlwZSA9IGRuc1R5cGUgPyBOdW1iZXIoZG5zVHlwZSkgOiAwO1xyXG4gICAgICAgIC8v572R6aG154mI5LiN5byA5ZCvRE5TXHJcbiAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpXHJcbiAgICAgICAgICAgIHRoaXMuRE5TVHlwZSA9IEROU1RZUEUuTm9uZTtcclxuICAgICAgICB0aGlzLkROUyA9IHRoaXMuY3JlYXRlRG5zKCk7XHJcblxyXG4gICAgICAgIExvZ2dlci5lcnJvcihcIkROUyBjb25maWdcIiwgSlNPTi5zdHJpbmdpZnkodGhpcy5ETlNDb25maWcpKVxyXG4gICAgICAgIExvZ2dlci5lcnJvcihcIkROUyBUeXBlIGlzIFwiLCB0aGlzLkROU1R5cGUpXHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKFwiRE5TIHN5bmNNb2RlIGlzIFwiLCB0aGlzLnN5bmNNb2RlKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLkROUykge1xyXG4gICAgICAgICAgICB0aGlzLkROUy5pbml0KHRoaXMuRE5TQ29uZmlnKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhcnRUaW1lcigpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZUlEKTtcclxuICAgICAgICB0aGlzLnRpbWVJRCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuRE5TKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ETlMudXBkYXRlKHRoaXMuY2hlY2tJbmVydmFsIC8gMTAwMCk7XHJcbiAgICAgICAgfSwgdGhpcy5jaGVja0luZXJ2YWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlRG5zKCkge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5ETlNUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgRE5TVFlQRS5XYW5nc3U6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFdhbmdzdUROUygpXHJcbiAgICAgICAgICAgIGNhc2UgRE5TVFlQRS5PbGRWZXJzaW9uOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBPbGRWZXJzaW9uRE5TKCk7XHJcbiAgICAgICAgICAgIGNhc2UgRE5TVFlQRS5Ob25lOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIGNhc2UgRE5TVFlQRS5BbGk6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEFsaUROUygpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5om+5LiN5YiwRE5T57G75Z6L77yB77yB77yB77yBXCIsIHRoaXMuRE5TVHlwZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuRE5TVHlwZSA9IEROU1RZUEUuTm9uZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/or7fmsYLlvIDlhbNcclxuICAgIHB1YmxpYyByZXF1ZXN0SG9zdHMoaG9zdHMsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKFwicmVxdWVzdEhvc3RzXCIsIGhvc3RzLCB0aGlzLkROU1R5cGUsIHRoaXMuc3luY01vZGUpO1xyXG4gICAgICAgIGhvc3RzID0gdGhpcy5maWx0ZXJTZWxmRE5TKGhvc3RzKTtcclxuICAgICAgICBpZiAodGhpcy5ETlNUeXBlID09IEROU1RZUEUuTm9uZSB8fCB0aGlzLkROUyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ETlMucmVxdWVzdEhvc3RzKGhvc3RzLCBjYWxsYmFjaywgdGhpcy5zeW5jTW9kZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXRJcChob3N0LCBpcEFyZWFUeXBlID0gMCkge1xyXG4gICAgICAgIC8v5YWI5qOA5p+l5YaF6YOoZG5z5YiX6KGoXHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZkROU01hcFtob3N0XSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZkROU01hcFtob3N0XTtcclxuICAgICAgICBpZiAodGhpcy5ETlNUeXBlID09IEROU1RZUEUuTm9uZSlcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuRE5TLmdldElwKGhvc3QsIGlwQXJlYVR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRIdHRwUmVxdWVzdEROU0luZm8odXJsOlNlcnZlclVybCwgaXBBcmVhVHlwZSA9IDApOiBETlNJbmZvIHtcclxuICAgICAgICBMb2dnZXIubG9nKFwiZ2V0SHR0cFJlcXVlc3RETlNJbmZvIGJlZm9yZSBcIiArIHVybC5wcmludFNlbGYoKSlcclxuICAgICAgICBsZXQgZG5zSW5mbyA9IHRoaXMuZ2V0U2VsZkROU0luZm8odXJsKVxyXG4gICAgICAgIGlmIChkbnNJbmZvICE9IG51bGwpe1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwiZ2V0SHR0cFJlcXVlc3RETlNJbmZvIGRuc0luZm8gIT0gbnVsbFwiKVxyXG4gICAgICAgICAgICByZXR1cm4gZG5zSW5mbztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuRE5TVHlwZSA9PSBETlNUWVBFLk5vbmUgfHwgdGhpcy5ETlMgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coXCJnZXRIdHRwUmVxdWVzdEROU0luZm8gRE5TVHlwZSA9PSBudWxsXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkbnNJbmZvID0gdGhpcy5ETlMuZ2V0SHR0cEROU0luZm8odXJsKVxyXG4gICAgICAgIExvZ2dlci5sb2coXCJnZXRIdHRwUmVxdWVzdEROU0luZm8gYWZ0ZXIgXCIgKyB1cmwucHJpbnRTZWxmKCkpXHJcbiAgICAgICAgcmV0dXJuIGRuc0luZm9cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFNlbGZETlNJbmZvKHVybDpTZXJ2ZXJVcmwpe1xyXG4gICAgICAgIGlmICh1cmwuYWRkcmVzcyA9PSB1cmwuYWRkcmVzc0hvc3QgJiYgdXJsLmFkZHJlc3NIb3N0ID09IHVybC5yZWFsSG9zdCl7XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coXCJnZXRTZWxmRE5TSW5mbyBhZGRyZXNzID09IGFkZHJlc3NIb3N0XCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlzSXBBZGRyZXNzID0gR2xvYmFsLlVybFV0aWwuY2hlY2tJc0lwKHVybC5hZGRyZXNzKVxyXG4gICAgICAgIGxldCBpc1JlYWxIb3N0SXBBZGRyZXNzID0gR2xvYmFsLlVybFV0aWwuY2hlY2tJc0lwKHVybC5yZWFsSG9zdClcclxuICAgICAgICBpZiAoIWlzSXBBZGRyZXNzICYmICFpc1JlYWxIb3N0SXBBZGRyZXNzKXtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImdldFNlbGZETlNJbmZvIGFkZHJlc3MgJiYgcmVhbEhvc3QgaXMgbm90IGlwXCIpXHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXF1ZXN0SW5mbyA9IG5ldyBETlNJbmZvKCk7XHJcbiAgICAgICAgaWYgKGlzUmVhbEhvc3RJcEFkZHJlc3Mpe1xyXG4gICAgICAgICAgICB1cmwuYWRkcmVzcyA9IHVybC5yZWFsSG9zdFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXF1ZXN0SW5mby5pcCA9IHVybC5hZGRyZXNzO1xyXG4gICAgICAgIHJlcXVlc3RJbmZvLmhvc3QgPSB1cmwuYWRkcmVzc0hvc3RcclxuICAgICAgICByZXF1ZXN0SW5mby5wb3J0ID0gdXJsLnBvcnQ7XHJcbiAgICAgICAgbGV0IGhlYWRlck1hcCA9IHsgXCJIb3N0XCI6IHVybC5hZGRyZXNzSG9zdCB9XHJcbiAgICAgICAgaWYgKHVybC5jZXJQYXRoKXtcclxuICAgICAgICAgICAgaGVhZGVyTWFwW1wiQ2VydFBhdGhcIl0gPSB1cmwuY2VyUGF0aFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0SW5mby5oZWFkZXJNYXAgPSBoZWFkZXJNYXBcclxuICAgICAgICByZXR1cm4gcmVxdWVzdEluZm9cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBmaWx0ZXJTZWxmRE5TKGhvc3RzKSB7XHJcbiAgICAgICAgbGV0IHJlYWxIb3N0ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBob3N0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2VsZkROU01hcFtob3N0c1tpXV0pXHJcbiAgICAgICAgICAgICAgICByZWFsSG9zdC5wdXNoKGhvc3RzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlYWxIb3N0O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+mihOWkhOeQhuebvlxyXG4gICAgcHVibGljIGRlYWxEdW5Sb3V0ZShzZXJ2ZXJVcmw6U2VydmVyVXJsLGxvX3BvcnQsbG9fdHlwZSl7XHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKFwiZGVhbER1blJvdXRlIHNlcnZlcnVybCAsbG9fcG9ydCxsb190eXBlIFwiICwgc2VydmVyVXJsLnByaW50U2VsZigpLGxvX3BvcnQsbG9fdHlwZSlcclxuICAgICAgICBpZiAoIWxvX3R5cGUgfHwgIWxvX3BvcnQpe1xyXG4gICAgICAgICAgICByZXR1cm4gc2VydmVyVXJsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaXNTdXBwb3J0ID0gR2xvYmFsLkFwcER1bi5jaGVja0FwcElzU3VwcG9ydER1bkJ5VHlwZShsb190eXBlKVxyXG4gICAgICAgIGlmICghaXNTdXBwb3J0KXtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiQXBwIG5vdCBzdXBwb3J0IGR1biA9IFwiICsgbG9fdHlwZSlcclxuICAgICAgICAgICAgcmV0dXJuIHNlcnZlclVybDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpc0R1bkluaXQgPSBHbG9iYWwuQXBwRHVuLmdldER1bklzSW5pdEJ5VHlwZShsb190eXBlKVxyXG4gICAgICAgIGxldCBpcFBvcnRJbmZvID0gR2xvYmFsLkFwcER1bi5nZXRTZXJ2ZXJJUEFuZFBvcnQoc2VydmVyVXJsLnJlYWxIb3N0LGxvX3BvcnQsbG9fdHlwZSxzZXJ2ZXJVcmwuYXR0cilcclxuICAgICAgICBpZiAobG9fcG9ydCAmJiBsb19wb3J0ID4gMCAmJiBpc0R1bkluaXQgJiYgaXBQb3J0SW5mbykge1xyXG4gICAgICAgICAgICBsZXQgc2VydmVySXAgPSBpcFBvcnRJbmZvLmlwXHJcbiAgICAgICAgICAgIGxldCBzZXJ2ZXJQb3J0ID0gaXBQb3J0SW5mby5wb3J0XHJcbiAgICAgICAgICAgIGlmICghc2VydmVySXAgfHwgIXNlcnZlclBvcnQpe1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZGVhbER1blJvdXRlIHNlcnZlcklwID09IG51bGwgfHwgc2VydmVyUG9ydCA9PSBudWxsIFwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZlclVybDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXJ2ZXJVcmwubG9fdHlwZSA9IGxvX3R5cGVcclxuICAgICAgICAgICAgbGV0IGFkZHJlc3MgPSBzZXJ2ZXJVcmwuYWRkcmVzc1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja0lzU2VsZkRuc1VybChhZGRyZXNzKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFycmF5ID0gYWRkcmVzcy5zcGxpdChcIi4uLlwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChhcnJheS5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZGVhbER1blJvdXRlIGFycmF5IDwgMlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2ZXJVcmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgaG9zdCA9IGFycmF5WzFdXHJcbiAgICAgICAgICAgICAgICBpZiAoaG9zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclVybC5hZGRyZXNzID0gc2VydmVySXBcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJVcmwucG9ydCA9IHNlcnZlclBvcnRcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJVcmwuYWRkcmVzc0hvc3QgPSBob3N0XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXJsID0gc2VydmVySXAgKyBcIjpcIiArIHNlcnZlclBvcnQgKyBcIi4uLlwiICsgaG9zdFxyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImRlYWxEdW5Sb3V0ZSBpc1NlbGZEbnNVcmwgPSB0cnVlICBob3N0ICE9IG51bGwgXCIgKyBzZXJ2ZXJVcmwucHJpbnRTZWxmKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIi4uLiBob3N0ID0gbnVsbFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVybCA9IHNlcnZlcklwICsgXCI6XCIgKyBzZXJ2ZXJQb3J0XHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyVXJsLmFkZHJlc3MgPSBzZXJ2ZXJJcFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclVybC5wb3J0ID0gc2VydmVyUG9ydFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJkZWFsRHVuUm91dGUgaXNTZWxmRG5zVXJsID0gdHJ1ZSAgaG9zdCA9PSBudWxsXCIgKyBzZXJ2ZXJVcmwucHJpbnRTZWxmKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgaG9zdCA9IHVybFxyXG4gICAgICAgICAgICAgICAgLy8gdXJsID0gc2VydmVySXAgKyBcIjpcIiArIHNlcnZlclBvcnQgKyBcIi4uLlwiICsgaG9zdFxyXG4gICAgICAgICAgICAgICAgc2VydmVyVXJsLmFkZHJlc3MgPSBzZXJ2ZXJJcFxyXG4gICAgICAgICAgICAgICAgc2VydmVyVXJsLnBvcnQgPSBzZXJ2ZXJQb3J0XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJkZWFsRHVuUm91dGUgaXNTZWxmRG5zVXJsID0gZmFsc2UgIFwiICsgc2VydmVyVXJsLnByaW50U2VsZigpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJ2ZXJVcmxcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVhbFNlbGZSb3V0ZShzZXJ2ZXJVcmw6U2VydmVyVXJsKXtcclxuICAgICAgICBsZXQgYWRkcmVzc191cmwgPSBzZXJ2ZXJVcmwuYWRkcmVzc1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrSXNTZWxmRG5zVXJsKGFkZHJlc3NfdXJsKSkge1xyXG4gICAgICAgICAgICBsZXQgYXJyYXkgPSBhZGRyZXNzX3VybC5zcGxpdChcIi4uLlwiKTtcclxuICAgICAgICAgICAgaWYgKGFycmF5Lmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImRlYWxTZWxmUm91dGUgYXJyYXkgPCAyXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VydmVyVXJsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBhZGRyZXNzID0gYXJyYXlbMF1cclxuICAgICAgICAgICAgbGV0IGFkZHJlc3NIb3N0ID0gYXJyYXlbMV1cclxuICAgICAgICAgICAgbGV0IGFkZHJlc3NQb3J0ID0gR2xvYmFsLlVybFV0aWwuZ2V0UG9ydEZyb21VcmwoYWRkcmVzcylcclxuICAgICAgICAgICAgc2VydmVyVXJsLmFkZHJlc3MgPSBhZGRyZXNzXHJcbiAgICAgICAgICAgIC8vIExvZ2dlci5lcnJvcihcImRlYWxTZWxmUm91dGUgYWRkcmVzcyA9IFwiICsgYWRkcmVzcylcclxuICAgICAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwiZGVhbFNlbGZSb3V0ZSBhZGRyZXNzSG9zdCA9IFwiICsgYWRkcmVzc0hvc3QpXHJcbiAgICAgICAgICAgIC8vIExvZ2dlci5lcnJvcihcImRlYWxTZWxmUm91dGUgYWRkcmVzc1BvcnQgPSBcIiArIGFkZHJlc3NQb3J0KVxyXG5cclxuICAgICAgICAgICAgaWYgKGFkZHJlc3NQb3J0KXtcclxuICAgICAgICAgICAgICAgIHNlcnZlclVybC5wb3J0ID0gYWRkcmVzc1BvcnRcclxuICAgICAgICAgICAgICAgIGxldCBhZGRyZXNzVXJsID0gR2xvYmFsLlVybFV0aWwuZ2V0SG9zdEZyb21VcmwoYWRkcmVzcylcclxuICAgICAgICAgICAgICAgIHNlcnZlclVybC5hZGRyZXNzID0gYWRkcmVzc1VybFxyXG4gICAgICAgICAgICAgICAgc2VydmVyVXJsLnJlYWxIb3N0ID0gYWRkcmVzc0hvc3RcclxuXHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBpc0FkZHJlc3NJUCA9IEdsb2JhbC5VcmxVdGlsLmNoZWNrSXNJcChhZGRyZXNzKVxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc0FkZHJlc3NJUCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyVXJsLnJlYWxIb3N0ID0gYWRkcmVzc1xyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclVybC5yZWFsSG9zdCA9IGFkZHJlc3NIb3N0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXJ2ZXJVcmwuYWRkcmVzc0hvc3QgPSBhZGRyZXNzSG9zdFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG5cclxuICAgIC8vIC8v6aKE5aSE55CG5Z+f5ZCNIFxyXG4gICAgLy8gcHVibGljIGRlYWxTZWxmRE5TUm91dGUodXJsLCBsb19wb3J0LGxvX3R5cGUpIHtcclxuICAgIC8vICAgICAvLyBMb2dnZXIuZXJyb3IoXCJkZWFsU2VsZkROU1JvdXRlIHVybCA9IFwiICsgdXJsKVxyXG4gICAgLy8gICAgIC8vIExvZ2dlci5lcnJvcihcImRlYWxTZWxmRE5TUm91dGUgbG9fcG9ydCA9IFwiICsgbG9fcG9ydClcclxuICAgIC8vICAgICAvLyBMb2dnZXIuZXJyb3IoXCJkZWFsU2VsZkROU1JvdXRlIGxvX3R5cGUgPSBcIiArIGxvX3R5cGUpXHJcbiAgICAvLyAgICAgaWYgKCFsb190eXBlIHx8ICFsb19wb3J0KXtcclxuICAgIC8vICAgICAgICAgcmV0dXJuIHVybDtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgbGV0IGlzU3VwcG9ydCA9IEdsb2JhbC5BcHBEdW4uY2hlY2tBcHBJc1N1cHBvcnREdW5CeVR5cGUobG9fdHlwZSlcclxuICAgIC8vICAgICBpZiAoIWlzU3VwcG9ydCl7XHJcbiAgICAvLyAgICAgICAgIExvZ2dlci5lcnJvcihcIkFwcCBub3Qgc3VwcG9ydCBkdW4gPSBcIiArIGxvX3R5cGUpXHJcbiAgICAvLyAgICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICBsZXQgaXNEdW5Jbml0ID0gR2xvYmFsLkFwcER1bi5nZXREdW5Jc0luaXRCeVR5cGUobG9fdHlwZSlcclxuICAgIC8vICAgICBsZXQgaXBQb3J0SW5mbyA9IEdsb2JhbC5BcHBEdW4uZ2V0U2VydmVySVBBbmRQb3J0KHVybCxsb19wb3J0LGxvX3R5cGUpXHJcbiAgICAvLyAgICAgaWYgKGxvX3BvcnQgJiYgbG9fcG9ydCA+IDAgJiYgaXNEdW5Jbml0ICYmIGlwUG9ydEluZm8pIHtcclxuICAgIC8vICAgICAgICAgbGV0IHNlcnZlcklwID0gaXBQb3J0SW5mby5pcFxyXG4gICAgLy8gICAgICAgICBsZXQgc2VydmVyUG9ydCA9IGlwUG9ydEluZm8ucG9ydFxyXG4gICAgLy8gICAgICAgICBpZiAoIXNlcnZlcklwIHx8ICFzZXJ2ZXJQb3J0KXtcclxuICAgIC8vICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImRlYWxTZWxmRE5TUm91dGUgc2VydmVySXAgPT0gbnVsbCB8fCBzZXJ2ZXJQb3J0ID09IG51bGwgXCIpXHJcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIGlmICh0aGlzLmNoZWNrSXNTZWxmRG5zVXJsKHVybCkpIHtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBhcnJheSA9IHVybC5zcGxpdChcIi4uLlwiKTtcclxuICAgIC8vICAgICAgICAgICAgIGlmIChhcnJheS5sZW5ndGggPCAyKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZGVhbFNlbGZETlNSb3V0ZSBhcnJheSA8IDJcIilcclxuICAgIC8vICAgICAgICAgICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgbGV0IGhvc3QgPSBhcnJheVsxXVxyXG4gICAgLy8gICAgICAgICAgICAgaWYgKGhvc3QpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICB1cmwgPSBzZXJ2ZXJJcCArIFwiOlwiICsgc2VydmVyUG9ydCArIFwiLi4uXCIgKyBob3N0XHJcbiAgICAvLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIi4uLiBob3N0ID0gbnVsbFwiKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIHVybCA9IHNlcnZlcklwICsgXCI6XCIgKyBzZXJ2ZXJQb3J0XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgaG9zdCA9IHVybFxyXG4gICAgLy8gICAgICAgICAgICAgdXJsID0gc2VydmVySXAgKyBcIjpcIiArIHNlcnZlclBvcnQgKyBcIi4uLlwiICsgaG9zdFxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIC8vIExvZ2dlci5lcnJvcihcImRlYWxTZWxmRE5TUm91dGUgdXJsID0gXCIgKyB1cmwpXHJcbiAgICAvLyAgICAgcmV0dXJuIHVybDtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvL2lwLi4uaG9zdFxyXG4gICAgcHJpdmF0ZSBjaGVja0lzU2VsZkRuc1VybCh1cmw6IHN0cmluZykge1xyXG4gICAgICAgIC8v5LiN5Y+v6IO9562J5LqOMFxyXG4gICAgICAgIHJldHVybiB1cmwuaW5kZXhPZihcIi4uLlwiKSA+IDA7XHJcbiAgICB9XHJcblxyXG59Il19