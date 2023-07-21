"use strict";
cc._RF.push(module, '830c1rK/55ChqAWBx3cgC0r', 'AliDNS');
// hall/scripts/framework/net/dns/AliDNS.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IDNS_1 = require("./IDNS");
var AliDNS = /** @class */ (function () {
    function AliDNS() {
    }
    AliDNS.prototype.init = function (cfg) {
        Global.NativeEvent.initAlicloudHttpDns(cfg.accountId);
    };
    AliDNS.prototype.requestHosts = function (hosts, callback, syncMode) {
        //Ali的接口不确定ip是否已经返回
        Global.NativeEvent.setPreResolveHosts(JSON.stringify(hosts), null);
        if (callback)
            callback();
    };
    //老版本发送协议时不需要处理
    AliDNS.prototype.getHttpRequestDNSInfo = function (url) {
        var host = Global.UrlUtil.getHostFromUrl(url);
        var ip = this.getIp(host);
        if (ip == "" || ip == null || ip == host)
            return null;
        Logger.error("host ip is ", ip);
        url = url.replace(host, ip);
        var dnsInfo = new IDNS_1.DNSInfo();
        dnsInfo.realUrl = url;
        dnsInfo.ip = ip;
        dnsInfo.host = host;
        dnsInfo.headerMap = { "Host": host };
        return dnsInfo;
    };
    AliDNS.prototype.getHttpDNSInfo = function (url) {
        var host = url.realHost;
        var addressHost = url.addressHost;
        var ip = this.getIp(host);
        if (ip == "" || ip == null || ip == host) {
            //如果是自定义域名，则host走自定义域名
            if (addressHost != host) {
                url.address = host;
                var dnsInfo_1 = new IDNS_1.DNSInfo();
                dnsInfo_1.ip = ip;
                dnsInfo_1.host = addressHost;
                var headerMap_1 = { "Host": url.addressHost };
                if (url.cerPath) {
                    headerMap_1["CertPath"] = url.cerPath;
                }
                dnsInfo_1.headerMap = headerMap_1;
                return dnsInfo_1;
            }
            return null;
        }
        Logger.error("host ip is ", ip);
        // url = url.replace(host, ip);
        url.address = ip;
        var dnsInfo = new IDNS_1.DNSInfo();
        // dnsInfo.realUrl = url;
        dnsInfo.ip = ip;
        dnsInfo.host = addressHost;
        var headerMap = { "Host": url.addressHost };
        if (url.cerPath) {
            headerMap["CertPath"] = url.cerPath;
        }
        dnsInfo.headerMap = headerMap;
        return dnsInfo;
    };
    AliDNS.prototype.getIp = function (host) {
        var ips = null;
        Global.NativeEvent.getIpsByHostAsync(host, function (retObj) {
            if (retObj && retObj.funcParam != null && retObj.funcParam != "") {
                try {
                    ips = JSON.parse(retObj.funcParam);
                }
                catch (e) {
                }
            }
        });
        Logger.error("return value", JSON.stringify(ips));
        if (ips == null || ips.length == 0)
            return null;
        var randIndex = Math.floor(Math.random() * ips.length);
        Logger.error("ips info", ips.length, randIndex);
        return ips[randIndex];
    };
    AliDNS.prototype.update = function (time) { };
    return AliDNS;
}());
exports.default = AliDNS;

cc._RF.pop();