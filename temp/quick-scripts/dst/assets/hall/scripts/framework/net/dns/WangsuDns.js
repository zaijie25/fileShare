
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/net/dns/WangsuDns.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxuZXRcXGRuc1xcV2FuZ3N1RG5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQXVDO0FBR3ZDO0lBQUE7UUFDSSxlQUFlO1FBQ2YsOENBQThDO1FBQzlDLGVBQWU7UUFDUCxvQkFBZSxHQUFHLGNBQWMsQ0FBQztRQUN6QyxrREFBa0Q7UUFFbEQsTUFBTTtRQUNFLG1CQUFjLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO1FBRWpGLGVBQWU7UUFDUCxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUUvQixtQkFBbUI7UUFDWCxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUVqQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUVoQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLG1CQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUEsTUFBTTtRQUN6QixxQkFBZ0IsR0FBRyxDQUFDLENBQUMsQ0FBQSxNQUFNO0lBZ052QyxDQUFDO0lBOU1VLHdCQUFJLEdBQVgsVUFBWSxHQUFHLElBQUksQ0FBQztJQUVwQjs7OztPQUlHO0lBQ0ksZ0NBQVksR0FBbkIsVUFBb0IsS0FBZSxFQUFFLFFBQVEsRUFBRSxRQUFRO1FBQXZELGlCQThDQztRQTdDRyxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDcEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQTtZQUM1QixPQUFPO1NBQ1Y7UUFFRCxRQUFRO1FBQ1IsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFELE1BQU0sQ0FBQyxJQUFJLENB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R0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRTtnQkFDdkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQTtnQkFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7YUFDekI7WUFDRCxJQUFJLFVBQVUsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQTthQUMvQjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQTthQUNqQztZQUNELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQUVPLCtCQUFXLEdBQW5CLFVBQW9CLFFBQVE7SUFDNUIsQ0FBQztJQUVELFFBQVE7SUFDQSxpQ0FBYSxHQUFyQixVQUFzQixJQUFZLEVBQUUsSUFBYztRQUM5QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzNCLE9BQU8sVUFBVSxHQUFHLElBQUksR0FBRyxpQ0FBaUMsR0FBRyxNQUFNLEdBQUcsbUJBQW1CLENBQUM7SUFDaEcsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0F2T0EsQUF1T0MsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJRE5TLCB7IEROU0luZm8gfSBmcm9tIFwiLi9JRE5TXCI7XHJcbmltcG9ydCB7IFNlcnZlclVybCB9IGZyb20gXCIuLi8uLi8uLi9sb2dpYy9jb3JlL3NldHRpbmcvU2VydmVyUm91dGVzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYW5nc3VETlMgaW1wbGVtZW50cyBJRE5TIHtcclxuICAgIC8v572R5a6/aHR0cGRuc+Wfn+WQjeWcsOWdgFxyXG4gICAgLy8gcHJpdmF0ZSBodHRwRE5TSG9zdCA9IFwiZWRnZS53c2h0dHBkbnMuY29tXCI7XHJcbiAgICAvL+a1t+Wklmh0dHBkbnPor7fmsYJpcFxyXG4gICAgcHJpdmF0ZSBodHRwRE5TQWR2ZXJiSVAgPSBcIjIyMC4yNDIuNTQuOFwiO1xyXG4gICAgLy8gcHJpdmF0ZSBodHRwRE5TQWR2ZXJiSVAgPSBcImVkZ2Uud3NodHRwZG5zLmNvbVwiO1xyXG5cclxuICAgIC8v5aSn6ZmGSVBcclxuICAgIHByaXZhdGUgbWFpbkxhbmRETlNJUHMgPSBbXCIxMTguMTg0LjE3OC4yNDRcIiwgXCIxMTguMTg0LjE3Ni4yMDVcIiwgXCIxMDMuMjEzLjk2LjE3NlwiXVxyXG5cclxuICAgIC8vaHR0cGRuc+ivt+axgui2heaXtuaXtumVv1xyXG4gICAgcHJpdmF0ZSByZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xyXG5cclxuICAgIC8vaG9zdCB0byBpcCBhcnJheXNcclxuICAgIHByaXZhdGUgaG9zdFRvSXBNYXAgPSB7fTtcclxuXHJcbiAgICBwcml2YXRlIGxlZnRUVExUaW1lID0gMDtcclxuXHJcbiAgICBwcml2YXRlIGlzUnVubmluZyA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgYWR2ZXJiSVBNYXAgPSB7fTtcclxuICAgIHByaXZhdGUgbWFpbkxhbmRJUE1hcCA9IHt9O1xyXG4gICAgcHJpdmF0ZSBJUF9UWVBFX0FEVkVSQiA9IDE7Ly/mtbflpJZJUFxyXG4gICAgcHJpdmF0ZSBJUF9UWVBFX01BSU5MQU5EID0gMjsvL+Wkp+mZhklQXHJcblxyXG4gICAgcHVibGljIGluaXQoY2ZnKSB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmihOiuvue9ruS9v+eUqGh0dHBkbnPnmoRob3N0XHJcbiAgICAgKiBAcGFyYW0gaG9zdHMgXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sg5a6M5oiQ5Zue6LCD77yM5aaC5p6c5L2/55So5Zue6LCD5pyA5aW95Zyo5aSW6YOo5YGa5aW96LaF5pe25aSE55CG77yMMTDotoXml7bkvZPpqozkvJrmr5TovoPlt65cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlcXVlc3RIb3N0cyhob3N0czogc3RyaW5nW10sIGNhbGxiYWNrLCBzeW5jTW9kZSkge1xyXG4gICAgICAgIGlmIChob3N0cyA9PSBudWxsIHx8IGhvc3RzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuivt+axgueahGhvc3Rz5YiX6KGo5Li656m6XCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5L2/55So5rW35aSWSVBcclxuICAgICAgICBsZXQgdXJsID0gdGhpcy5nZXRSZXF1ZXN0VXJsKHRoaXMuaHR0cEROU0FkdmVyYklQLCBob3N0cyk7XHJcbiAgICAgICAgR2xvYmFsLkh0dHAucmVxdWVzdERpcmVjdCh1cmwsXHJcbiAgICAgICAgICAgIChtc2cpID0+IHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInJlY2VpdmUgXCIsIG1zZyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlY29kZU1zZyhtc2csIHRoaXMuSVBfVFlQRV9BRFZFUkIpXHJcbiAgICAgICAgICAgICAgICBpZiAoc3luY01vZGUgJiYgY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgaWYgKHN5bmNNb2RlICYmIGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLCBcImdldFwiLCBudWxsLCB0aGlzLnJlcXVlc3RUaW1lb3V0KTtcclxuXHJcbiAgICAgICAgbGV0IFdhbmdzdUROUyA9IEdsb2JhbC5TZXR0aW5nLldhbmdzdUROU1xyXG4gICAgICAgIGxldCBkbnNBcnJheSA9IHRoaXMubWFpbkxhbmRETlNJUHM7XHJcbiAgICAgICAgaWYgKFdhbmdzdUROUyAmJiBXYW5nc3VETlMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJ1c2UgZGF0YSBkbnNcIilcclxuICAgICAgICAgICAgZG5zQXJyYXkgPSBXYW5nc3VETlNcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJubyB1c2UgZGF0YSBkbnNcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lkIzml7bkvb/nlKjlm73lhoVpcOW5tuWPkeivt+axguOAglxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG5zQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1haW5MYW5kSVAgPSBkbnNBcnJheVtpXVxyXG4gICAgICAgICAgICBsZXQgaXBVcmwgPSB0aGlzLmdldFJlcXVlc3RVcmwobWFpbkxhbmRJUCwgaG9zdHMpO1xyXG4gICAgICAgICAgICBHbG9iYWwuSHR0cC5yZXF1ZXN0RGlyZWN0KGlwVXJsLCAobXNnKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlY29kZU1zZyhtc2csIHRoaXMuSVBfVFlQRV9NQUlOTEFORClcclxuICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihjYWxsYmFjaylcclxuICAgICAgICAgICAgfSwgXCJnZXRcIiwgbnVsbCwgdGhpcy5yZXF1ZXN0VGltZW91dClcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXN5bmNNb2RlICYmIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImNhbGwgbm93XCIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRIdHRwUmVxdWVzdEROU0luZm8odXJsLCBpcEFyZWFUeXBlID0gMCkge1xyXG4gICAgICAgIGxldCBob3N0ID0gR2xvYmFsLlVybFV0aWwuZ2V0SG9zdEZyb21VcmwodXJsKTtcclxuICAgICAgICBpZiAodGhpcy5jaGVja0lzV2FuZ3N1U2VsZklwKGhvc3QpKSB7XHJcbiAgICAgICAgICAgIGxldCByZXF1ZXN0SW5mbyA9IG5ldyBETlNJbmZvKCk7XHJcbiAgICAgICAgICAgIHJlcXVlc3RJbmZvLnJlYWxVcmwgPSB1cmw7XHJcbiAgICAgICAgICAgIHJlcXVlc3RJbmZvLmlwID0gaG9zdDtcclxuICAgICAgICAgICAgcmVxdWVzdEluZm8uaG9zdCA9IFwiZWRnZS53c2h0dHBkbnMuY29tXCI7XHJcbiAgICAgICAgICAgIHJlcXVlc3RJbmZvLmhlYWRlck1hcCA9IHsgXCJIb3N0XCI6IFwiZWRnZS53c2h0dHBkbnMuY29tXCIgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3RJbmZvO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBpcCA9IHRoaXMuZ2V0SXAoaG9zdCwgaXBBcmVhVHlwZSk7XHJcbiAgICAgICAgICAgIGlmIChpcCA9PSBudWxsIHx8IGlwID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKGhvc3QsIGlwKTtcclxuICAgICAgICAgICAgbGV0IHJlcXVlc3RJbmZvID0gbmV3IEROU0luZm8oKTtcclxuICAgICAgICAgICAgcmVxdWVzdEluZm8ucmVhbFVybCA9IHVybDtcclxuICAgICAgICAgICAgcmVxdWVzdEluZm8uaXAgPSBpcDtcclxuICAgICAgICAgICAgcmVxdWVzdEluZm8uaG9zdCA9IGhvc3Q7XHJcbiAgICAgICAgICAgIHJlcXVlc3RJbmZvLmhlYWRlck1hcCA9IHsgXCJIb3N0XCI6IGhvc3QgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3RJbmZvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SHR0cEROU0luZm8odXJsOlNlcnZlclVybCxpcEFyZWFUeXBlID0wKXtcclxuICAgICAgICBsZXQgaG9zdCA9IHVybC5hZGRyZXNzXHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tJc1dhbmdzdVNlbGZJcChob3N0KSl7XHJcbiAgICAgICAgICAgIGxldCByZXF1ZXN0SW5mbyA9IG5ldyBETlNJbmZvKCk7XHJcbiAgICAgICAgICAgIHJlcXVlc3RJbmZvLnJlYWxVcmwgPSB1cmw7XHJcbiAgICAgICAgICAgIHJlcXVlc3RJbmZvLmlwID0gaG9zdDtcclxuICAgICAgICAgICAgcmVxdWVzdEluZm8uaG9zdCA9IFwiZWRnZS53c2h0dHBkbnMuY29tXCI7XHJcbiAgICAgICAgICAgIHJlcXVlc3RJbmZvLmhlYWRlck1hcCA9IHsgXCJIb3N0XCI6IFwiZWRnZS53c2h0dHBkbnMuY29tXCIgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3RJbmZvO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgbGV0IHJlYWxIb3N0ID0gdXJsLnJlYWxIb3N0XHJcbiAgICAgICAgICAgIGxldCBhZGRyZXNzSG9zdCA9IHVybC5hZGRyZXNzSG9zdFxyXG4gICAgICAgICAgICBsZXQgaXAgPSB0aGlzLmdldElwKHJlYWxIb3N0LCBpcEFyZWFUeXBlKTtcclxuICAgICAgICAgICAgaWYgKGlwID09IG51bGwgfHwgaXAgPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgLy/lpoLmnpzmmK/oh6rlrprkuYnln5/lkI3vvIzliJlob3N06LWw6Ieq5a6a5LmJ5Z+f5ZCNXHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkcmVzc0hvc3QgIT0gcmVhbEhvc3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybC5hZGRyZXNzID0gcmVhbEhvc3RcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZG5zSW5mbyA9IG5ldyBETlNJbmZvKClcclxuICAgICAgICAgICAgICAgICAgICBkbnNJbmZvLmlwID0gaXA7XHJcbiAgICAgICAgICAgICAgICAgICAgZG5zSW5mby5ob3N0ID0gYWRkcmVzc0hvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhlYWRlck1hcCA9IHsgXCJIb3N0XCI6IHVybC5hZGRyZXNzSG9zdCB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVybC5jZXJQYXRoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyTWFwW1wiQ2VydFBhdGhcIl0gPSB1cmwuY2VyUGF0aFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBkbnNJbmZvLmhlYWRlck1hcCA9IGhlYWRlck1hcFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkbnNJbmZvO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdXJsLmFkZHJlc3MgPSBpcFxyXG4gICAgICAgICAgICBsZXQgcmVxdWVzdEluZm8gPSBuZXcgRE5TSW5mbygpO1xyXG4gICAgICAgICAgICAvLyByZXF1ZXN0SW5mby5yZWFsVXJsID0gdXJsO1xyXG4gICAgICAgICAgICByZXF1ZXN0SW5mby5pcCA9IGlwO1xyXG4gICAgICAgICAgICByZXF1ZXN0SW5mby5ob3N0ID0gYWRkcmVzc0hvc3Q7XHJcbiAgICAgICAgICAgIGxldCBoZWFkZXJNYXAgPSB7IFwiSG9zdFwiOiB1cmwuYWRkcmVzc0hvc3QgfVxyXG4gICAgICAgICAgICBpZiAodXJsLmNlclBhdGgpe1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyTWFwW1wiQ2VydFBhdGhcIl0gPSB1cmwuY2VyUGF0aFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlcXVlc3RJbmZvLmhlYWRlck1hcCA9IGhlYWRlck1hcFxyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdEluZm87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja0lzV2FuZ3N1U2VsZklwKGlwKSB7XHJcbiAgICAgICAgaWYgKGlwID09IFwiMjIwLjI0Mi41NC44XCIgfHwgaXAgPT0gXCIxMTguMTg0LjE3OC4yNDRcIiB8fCBpcCA9PSBcIjExOC4xODQuMTc2LjIwNVwiIHx8IGlwID09IFwiMTAzLjIxMy45Ni4xNzZcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+WSVBcclxuICAgIHB1YmxpYyBnZXRJcChob3N0OiBzdHJpbmcsIGlwQXJlYVR5cGUgPSAwKSB7XHJcbiAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwiZ2V0SXAgaXBBcmVhVHlwZT1cIiArIGlwQXJlYVR5cGUpXHJcbiAgICAgICAgbGV0IGlwcyA9IG51bGw7XHJcbiAgICAgICAgaWYgKGlwQXJlYVR5cGUgPT0gdGhpcy5JUF9UWVBFX0FEVkVSQikge1xyXG4gICAgICAgICAgICBpcHMgPSB0aGlzLmFkdmVyYklQTWFwW2hvc3RdXHJcbiAgICAgICAgfSBlbHNlIGlmIChpcEFyZWFUeXBlID09IHRoaXMuSVBfVFlQRV9NQUlOTEFORCkge1xyXG4gICAgICAgICAgICBpcHMgPSB0aGlzLm1haW5MYW5kSVBNYXBbaG9zdF1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lpoLmnpzlj5bkuI3liLBcclxuICAgICAgICBpZiAoaXBzID09IG51bGwgfHwgaXBzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGlwcyA9IHRoaXMuaG9zdFRvSXBNYXBbaG9zdF1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpcHMgPT0gbnVsbCB8fCBpcHMubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIGxldCByYW5kSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpcHMubGVuZ3RoKTtcclxuICAgICAgICByZXR1cm4gaXBzW3JhbmRJbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgLy/lrprml7blmajmm7TmlrDvvIzmmoLlrpo156eS5pu05paw5LiA5qyhXHJcbiAgICBwdWJsaWMgdXBkYXRlKHRpbWUpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNSdW5uaW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5sZWZ0VFRMVGltZSAtPSB0aW1lO1xyXG4gICAgICAgIGlmICh0aGlzLmxlZnRUVExUaW1lIDw9IDApIHtcclxuICAgICAgICAgICAgLy90dGzot5Hlrozml7YgIOWFqOmDqOWfn+WQjemHjeaWsOivt+axguS4gOasoVxyXG4gICAgICAgICAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJlUmVxdWVzdEFsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlUmVxdWVzdEFsbCgpIHtcclxuICAgICAgICBsZXQgaG9zdEFyciA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuaG9zdFRvSXBNYXApIHtcclxuICAgICAgICAgICAgaG9zdEFyci5wdXNoKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVxdWVzdEhvc3RzKGhvc3RBcnIsIG51bGwsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlY29kZU1zZyhjb250ZW50LCBpcEFyZWFUeXBlKSB7XHJcbiAgICAgICAgbGV0IGNvbnRlbnRUYWIgPSBudWxsO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnRUYWIgPSBKU09OLnBhcnNlKGNvbnRlbnQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnRUYWIgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbnRlbnRUYWIucmV0Q29kZSA9PSBudWxsIHx8IGNvbnRlbnRUYWIucmV0Q29kZSAhPSAwIHx8IGNvbnRlbnRUYWIuZGF0YSA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBjb250ZW50VGFiLmRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IGhvc3QgPSBrZXk7XHJcbiAgICAgICAgICAgIGxldCBpcHMgPSBjb250ZW50VGFiLmRhdGFba2V5XS5pcHM7XHJcbiAgICAgICAgICAgIGlmIChpcHMubGVuZ3RoIDw9IDAgfHwgY29udGVudFRhYi5kYXRhW2tleV0udHRsID09IG51bGwgfHwgY29udGVudFRhYi5kYXRhW2tleV0udHRsIDw9IDApXHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGVmdFRUTFRpbWUgPD0gMCAmJiBjb250ZW50VGFiLmRhdGFba2V5XS50dGwgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnRUVExUaW1lID0gY29udGVudFRhYi5kYXRhW2tleV0udHRsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlwQXJlYVR5cGUgPT0gdGhpcy5JUF9UWVBFX0FEVkVSQikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZHZlcmJJUE1hcFtob3N0XSA9IGlwc1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluTGFuZElQTWFwW2hvc3RdID0gaXBzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5ob3N0VG9JcE1hcFtob3N0XSA9IGlwcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcihjYWxsYmFjaykge1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W6K+35rGC6L+e5o6lXHJcbiAgICBwcml2YXRlIGdldFJlcXVlc3RVcmwoaG9zdDogc3RyaW5nLCB1cmxzOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIGxldCB1cmxTdHIgPSB1cmxzLmpvaW4oXCI7XCIpXHJcbiAgICAgICAgcmV0dXJuIFwiaHR0cHM6Ly9cIiArIGhvc3QgKyBcIi92MS9odHRwZG5zL2Nsb3VkZG5zP3dzX2RvbWFpbj1cIiArIHVybFN0ciArIFwiJndzX3JldF90eXBlPWpzb25cIjtcclxuICAgIH1cclxufSJdfQ==