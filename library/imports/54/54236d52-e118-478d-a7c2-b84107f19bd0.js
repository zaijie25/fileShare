"use strict";
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