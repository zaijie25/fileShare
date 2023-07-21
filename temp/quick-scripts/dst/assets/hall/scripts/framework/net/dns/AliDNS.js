
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/net/dns/AliDNS.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxuZXRcXGRuc1xcQWxpRE5TLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQXVDO0FBR3ZDO0lBQUE7SUE4RkEsQ0FBQztJQTVGVSxxQkFBSSxHQUFYLFVBQVksR0FBRztRQUVYLE1BQU0sQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3pELENBQUM7SUFFTSw2QkFBWSxHQUFuQixVQUFvQixLQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVE7UUFFNUMsbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNsRSxJQUFHLFFBQVE7WUFDUCxRQUFRLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsZUFBZTtJQUNSLHNDQUFxQixHQUE1QixVQUE2QixHQUFHO1FBRTVCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxJQUFJLElBQUksRUFBRSxJQUFJLElBQUk7WUFDbkMsT0FBTyxJQUFJLENBQUM7UUFDaEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDL0IsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUE7UUFDM0IsT0FBTyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDdEIsT0FBTyxD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QUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUcsR0FBRyxDQUFDLE1BQU0sRUFBQyxTQUFTLENBQUMsQ0FBQTtRQUMvQyxPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU0sdUJBQU0sR0FBYixVQUFjLElBQUksSUFDakIsQ0FBQztJQUNOLGFBQUM7QUFBRCxDQTlGQSxBQThGQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElETlMsIHsgRE5TSW5mbyB9IGZyb20gXCIuL0lETlNcIjtcclxuaW1wb3J0IHsgU2VydmVyVXJsIH0gZnJvbSBcIi4uLy4uLy4uL2xvZ2ljL2NvcmUvc2V0dGluZy9TZXJ2ZXJSb3V0ZXNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsaUROUyBpbXBsZW1lbnRzIElETlNcclxue1xyXG4gICAgcHVibGljIGluaXQoY2ZnKVxyXG4gICAge1xyXG4gICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5pbml0QWxpY2xvdWRIdHRwRG5zKGNmZy5hY2NvdW50SWQpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlcXVlc3RIb3N0cyhob3N0czpbXSwgY2FsbGJhY2ssIHN5bmNNb2RlKVxyXG4gICAge1xyXG4gICAgICAgIC8vQWxp55qE5o6l5Y+j5LiN56Gu5a6aaXDmmK/lkKblt7Lnu4/ov5Tlm55cclxuICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuc2V0UHJlUmVzb2x2ZUhvc3RzKEpTT04uc3RyaW5naWZ5KGhvc3RzKSwgbnVsbClcclxuICAgICAgICBpZihjYWxsYmFjaylcclxuICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iAgeeJiOacrOWPkemAgeWNj+iuruaXtuS4jemcgOimgeWkhOeQhlxyXG4gICAgcHVibGljIGdldEh0dHBSZXF1ZXN0RE5TSW5mbyh1cmwpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGhvc3QgPSBHbG9iYWwuVXJsVXRpbC5nZXRIb3N0RnJvbVVybCh1cmwpO1xyXG4gICAgICAgIGxldCBpcCA9IHRoaXMuZ2V0SXAoaG9zdCk7XHJcbiAgICAgICAgaWYoaXAgPT0gXCJcIiB8fCBpcCA9PSBudWxsIHx8IGlwID09IGhvc3QpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihcImhvc3QgaXAgaXMgXCIsIGlwKVxyXG4gICAgICAgIHVybCA9IHVybC5yZXBsYWNlKGhvc3QsIGlwKTtcclxuICAgICAgICBsZXQgZG5zSW5mbyA9IG5ldyBETlNJbmZvKClcclxuICAgICAgICBkbnNJbmZvLnJlYWxVcmwgPSB1cmw7XHJcbiAgICAgICAgZG5zSW5mby5pcCA9IGlwO1xyXG4gICAgICAgIGRuc0luZm8uaG9zdCA9IGhvc3Q7XHJcbiAgICAgICAgZG5zSW5mby5oZWFkZXJNYXAgPSB7XCJIb3N0XCI6aG9zdH07XHJcbiAgICAgICAgcmV0dXJuIGRuc0luZm87XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEh0dHBETlNJbmZvKHVybDpTZXJ2ZXJVcmwpe1xyXG4gICAgICAgIGxldCBob3N0ID0gdXJsLnJlYWxIb3N0XHJcbiAgICAgICAgbGV0IGFkZHJlc3NIb3N0ID0gdXJsLmFkZHJlc3NIb3N0XHJcbiAgICAgICAgbGV0IGlwID0gdGhpcy5nZXRJcChob3N0KTtcclxuICAgICAgICBpZihpcCA9PSBcIlwiIHx8IGlwID09IG51bGwgfHwgaXAgPT0gaG9zdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5aaC5p6c5piv6Ieq5a6a5LmJ5Z+f5ZCN77yM5YiZaG9zdOi1sOiHquWumuS5ieWfn+WQjVxyXG4gICAgICAgICAgICBpZiAoYWRkcmVzc0hvc3QgIT0gaG9zdCl7XHJcbiAgICAgICAgICAgICAgICB1cmwuYWRkcmVzcyA9IGhvc3RcclxuICAgICAgICAgICAgICAgIGxldCBkbnNJbmZvID0gbmV3IEROU0luZm8oKVxyXG4gICAgICAgICAgICAgICAgZG5zSW5mby5pcCA9IGlwO1xyXG4gICAgICAgICAgICAgICAgZG5zSW5mby5ob3N0ID0gYWRkcmVzc0hvc3Q7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGVhZGVyTWFwID0geyBcIkhvc3RcIjogdXJsLmFkZHJlc3NIb3N0IH1cclxuICAgICAgICAgICAgICAgICBpZiAodXJsLmNlclBhdGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlck1hcFtcIkNlcnRQYXRoXCJdID0gdXJsLmNlclBhdGhcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRuc0luZm8uaGVhZGVyTWFwID0gaGVhZGVyTWFwXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZG5zSW5mbztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIExvZ2dlci5lcnJvcihcImhvc3QgaXAgaXMgXCIsIGlwKVxyXG4gICAgICAgIC8vIHVybCA9IHVybC5yZXBsYWNlKGhvc3QsIGlwKTtcclxuICAgICAgICB1cmwuYWRkcmVzcyA9IGlwXHJcbiAgICAgICAgbGV0IGRuc0luZm8gPSBuZXcgRE5TSW5mbygpXHJcbiAgICAgICAgLy8gZG5zSW5mby5yZWFsVXJsID0gdXJsO1xyXG4gICAgICAgIGRuc0luZm8uaXAgPSBpcDtcclxuICAgICAgICBkbnNJbmZvLmhvc3QgPSBhZGRyZXNzSG9zdDtcclxuICAgICAgICBsZXQgaGVhZGVyTWFwID0geyBcIkhvc3RcIjogdXJsLmFkZHJlc3NIb3N0IH1cclxuICAgICAgICBpZiAodXJsLmNlclBhdGgpe1xyXG4gICAgICAgICAgICBoZWFkZXJNYXBbXCJDZXJ0UGF0aFwiXSA9IHVybC5jZXJQYXRoXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRuc0luZm8uaGVhZGVyTWFwID0gaGVhZGVyTWFwXHJcbiAgICAgICAgcmV0dXJuIGRuc0luZm87XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldElwKGhvc3Q6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBpcHMgPSBudWxsO1xyXG4gICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5nZXRJcHNCeUhvc3RBc3luYyhob3N0LCAocmV0T2JqKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYocmV0T2JqICYmIHJldE9iai5mdW5jUGFyYW0gIT0gbnVsbCAmJiByZXRPYmouZnVuY1BhcmFtICE9IFwiXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpcHMgPSBKU09OLnBhcnNlKHJldE9iai5mdW5jUGFyYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXRjaChlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBMb2dnZXIuZXJyb3IoXCJyZXR1cm4gdmFsdWVcIiwgSlNPTi5zdHJpbmdpZnkoaXBzKSk7XHJcbiAgICAgICAgaWYoaXBzID09IG51bGwgfHwgaXBzLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICBsZXQgcmFuZEluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaXBzLmxlbmd0aCk7XHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKFwiaXBzIGluZm9cIiAsIGlwcy5sZW5ndGgscmFuZEluZGV4KVxyXG4gICAgICAgIHJldHVybiBpcHNbcmFuZEluZGV4XTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKHRpbWUpXHJcbiAgICB7fVxyXG59Il19