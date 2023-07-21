"use strict";
cc._RF.push(module, '68cec/vpiBFFbCo3nVPm1OH', 'SystemTimeManager');
// hall/scripts/logic/core/net/chat/SystemTimeManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SystemTimeManager = /** @class */ (function () {
    // 私有构造函数
    function SystemTimeManager() {
        this.heartTime = (new Date()).getTime();
        this.diffServerTime = 0;
        this.diffServerCount = 1;
    }
    SystemTimeManager.getInstance = function () {
        if (SystemTimeManager.instance == null) {
            SystemTimeManager.instance = new SystemTimeManager();
        }
        return SystemTimeManager.instance;
    };
    //获取服务器时间
    SystemTimeManager.prototype.getServerTime = function () {
        var nowTime = (new Date()).getTime();
        return nowTime + SystemTimeManager.instance.getDiffTime();
    };
    //获取本地时间，每次发送心跳的时候
    SystemTimeManager.prototype.getLocalTime = function () {
        SystemTimeManager.instance.heartTime = (new Date()).getTime();
        return SystemTimeManager.instance.heartTime;
    };
    //获取本地时间与服务器的时间差
    SystemTimeManager.prototype.getDiffTime = function () {
        return SystemTimeManager.instance.diffServerTime;
    };
    // 消息发送时上报给服务器的localid
    SystemTimeManager.prototype.randomBit = function () {
        var result = 0;
        var nowTime = (new Date()).getTime();
        var difTime = SystemTimeManager.instance.getDiffTime() * 1000;
        result = ((nowTime + difTime * 1000) * 1000);
        return result;
    };
    //收到心跳以后计算本地时间与服务器的时间差,取最小差值
    SystemTimeManager.prototype.setServerTime = function (serverTime) {
        var diffTime = serverTime - SystemTimeManager.instance.heartTime;
        SystemTimeManager.instance.diffServerTime = (SystemTimeManager.instance.diffServerTime == 0) ? diffTime : SystemTimeManager.instance.diffServerTime;
        SystemTimeManager.instance.diffServerTime = Math.abs(diffTime) < Math.abs(SystemTimeManager.instance.diffServerTime) ? diffTime : SystemTimeManager.instance.diffServerTime;
        SystemTimeManager.instance.diffServerCount = 1;
    };
    // 静态成员instance
    SystemTimeManager.instance = null;
    return SystemTimeManager;
}());
exports.default = SystemTimeManager;

cc._RF.pop();