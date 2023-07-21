
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/net/dns/OldVersionDNS.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '542361S4RhHjafCuEEH8ZvQ', 'OldVersionDNS');
// hall/scripts/framework/net/dns/OldVersionDNS.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OldVersionDNS = /** @class */ (function () {
    function OldVersionDNS() {
    }
    OldVersionDNS.prototype.init = function (cfg) { };
    OldVersionDNS.prototype.requestHosts = function (hosts, callback, syncMode) {
        if ((!syncMode && callback) || !Global.Setting.useHttpDNS) {
            callback();
            callback = null;
        }
        if (Global.Setting.useHttpDNS)
            Global.NativeEvent.startRequest(hosts, callback);
    };
    //老版本发送协议时不需要处理
    OldVersionDNS.prototype.getHttpRequestDNSInfo = function (url) {
        return null;
    };
    OldVersionDNS.prototype.getHttpDNSInfo = function (url) {
        return null;
    };
    OldVersionDNS.prototype.getIp = function (host) {
        return null;
    };
    OldVersionDNS.prototype.update = function (time) { };
    return OldVersionDNS;
}());
exports.default = OldVersionDNS;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxuZXRcXGRuc1xcT2xkVmVyc2lvbkROUy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUVBO0lBQUE7SUFpQ0EsQ0FBQztJQS9CVSw0QkFBSSxHQUFYLFVBQVksR0FBRyxJQUNkLENBQUM7SUFFSyxvQ0FBWSxHQUFuQixVQUFvQixLQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVE7UUFFNUMsSUFBRyxDQUFDLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQ3hEO1lBQ0ksUUFBUSxFQUFFLENBQUM7WUFDWCxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ25CO1FBQ0QsSUFBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVU7WUFDeEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxlQUFlO0lBQ1IsNkNBQXFCLEdBQTVCLFVBQTZCLEdBQUc7UUFFNUIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLHNDQUFjLEdBQXJCLFVBQXNCLEdBQUc7UUFDckIsT0FBTyxJQUFJLENBQUE7SUFDZixDQUFDO0lBRU0sNkJBQUssR0FBWixVQUFhLElBQVc7UUFFcEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLDhCQUFNLEdBQWIsVUFBYyxJQUFJLElBQ2pCLENBQUM7SUFDTixvQkFBQztBQUFELENBakNBLEFBaUNDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSUROUyBmcm9tIFwiLi9JRE5TXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPbGRWZXJzaW9uRE5TIGltcGxlbWVudHMgSUROU1xyXG57XHJcbiAgICBwdWJsaWMgaW5pdChjZmcpXHJcbiAgICB7fVxyXG5cclxuICAgIHB1YmxpYyByZXF1ZXN0SG9zdHMoaG9zdHM6W10sIGNhbGxiYWNrLCBzeW5jTW9kZSlcclxuICAgIHtcclxuICAgICAgICBpZigoIXN5bmNNb2RlICYmIGNhbGxiYWNrKSB8fCAhR2xvYmFsLlNldHRpbmcudXNlSHR0cEROUylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoR2xvYmFsLlNldHRpbmcudXNlSHR0cEROUylcclxuICAgICAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LnN0YXJ0UmVxdWVzdChob3N0cywgY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6ICB54mI5pys5Y+R6YCB5Y2P6K6u5pe25LiN6ZyA6KaB5aSE55CGXHJcbiAgICBwdWJsaWMgZ2V0SHR0cFJlcXVlc3RETlNJbmZvKHVybClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SHR0cEROU0luZm8odXJsKXtcclxuICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRJcChob3N0OnN0cmluZylcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKHRpbWUpXHJcbiAgICB7fVxyXG59Il19