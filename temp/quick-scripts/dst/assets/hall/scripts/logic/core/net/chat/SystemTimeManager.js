
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/net/chat/SystemTimeManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXG5ldFxcY2hhdFxcU3lzdGVtVGltZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUdJLFNBQVM7SUFDVDtRQUVRLGNBQVMsR0FBVSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQyxtQkFBYyxHQUFVLENBQUMsQ0FBQztRQUMxQixvQkFBZSxHQUFVLENBQUMsQ0FBQztJQUpiLENBQUM7SUFLVCw2QkFBVyxHQUF6QjtRQUNJLElBQUcsaUJBQWlCLENBQUMsUUFBUSxJQUFJLElBQUksRUFBQztZQUNsQyxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1NBQ3hEO1FBQ0QsT0FBTyxpQkFBaUIsQ0FBQyxRQUFRLENBQUM7SUFDdEMsQ0FBQztJQUNELFNBQVM7SUFDRix5Q0FBYSxHQUFwQjtRQUNJLElBQUksT0FBTyxHQUFVLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzVDLE9BQU8sT0FBTyxHQUFHLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM5RCxDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsd0NBQVksR0FBbkI7UUFDQSxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzlELE9BQU8saUJBQWlCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztJQUM5QyxDQUFDO0lBQ0MsZ0JBQWdCO0lBQ1QsdUNBQVcsR0FBbEI7UUFDQSxPQUFPLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDbkQsQ0FBQztJQUNELHNCQUFzQjtJQUNiLHFDQUFTLEdBQWhCO1FBQ0EsSUFBSSxNQUFNLEdBQVUsQ0FBQyxDQUFDO1FBQ3RCLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JDLElBQUksT0FBTyxHQUFHLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDOUQsTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzdDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDQyw0QkFBNEI7SUFDckIseUNBQWEsR0FBcEIsVUFBcUIsVUFBVTtRQUMvQixJQUFJLFFBQVEsR0FBRyxVQUFVLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUNqRSxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsY0FBYyxHQUFHLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLGNBQWMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDO1FBQ3BKLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDO1FBQzVLLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUExQ0MsZUFBZTtJQUNSLDBCQUFRLEdBQUcsSUFBSSxDQUFDO0lBMEMzQix3QkFBQztDQTVDRCxBQTRDQyxJQUFBO2tCQTVDb0IsaUJBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3lzdGVtVGltZU1hbmFnZXJ7XHJcbiAgICAvLyDpnZnmgIHmiJDlkZhpbnN0YW5jZVxyXG4gICAgc3RhdGljIGluc3RhbmNlID0gbnVsbDtcclxuICAgIC8vIOengeacieaehOmAoOWHveaVsFxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcigpe31cclxuXHJcbiAgICBwcml2YXRlIGhlYXJ0VGltZTpudW1iZXIgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xyXG4gICAgcHJpdmF0ZSBkaWZmU2VydmVyVGltZTpudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBkaWZmU2VydmVyQ291bnQ6bnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKXtcclxuICAgICAgICBpZihTeXN0ZW1UaW1lTWFuYWdlci5pbnN0YW5jZSA9PSBudWxsKXtcclxuICAgICAgICAgICAgU3lzdGVtVGltZU1hbmFnZXIuaW5zdGFuY2UgPSBuZXcgU3lzdGVtVGltZU1hbmFnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFN5c3RlbVRpbWVNYW5hZ2VyLmluc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/ojrflj5bmnI3liqHlmajml7bpl7RcclxuICAgIHB1YmxpYyBnZXRTZXJ2ZXJUaW1lKCk6bnVtYmVyIHtcclxuICAgICAgICBsZXQgbm93VGltZTpudW1iZXIgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xyXG4gICAgICAgIHJldHVybiBub3dUaW1lICsgU3lzdGVtVGltZU1hbmFnZXIuaW5zdGFuY2UuZ2V0RGlmZlRpbWUoKTtcclxuICAgIH1cclxuICAgIC8v6I635Y+W5pys5Zyw5pe26Ze077yM5q+P5qyh5Y+R6YCB5b+D6Lez55qE5pe25YCZXHJcbiAgICBwdWJsaWMgZ2V0TG9jYWxUaW1lKCkge1xyXG4gICAgU3lzdGVtVGltZU1hbmFnZXIuaW5zdGFuY2UuaGVhcnRUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuICAgIHJldHVybiBTeXN0ZW1UaW1lTWFuYWdlci5pbnN0YW5jZS5oZWFydFRpbWU7XHJcbiAgfVxyXG4gICAgLy/ojrflj5bmnKzlnLDml7bpl7TkuI7mnI3liqHlmajnmoTml7bpl7Tlt65cclxuICAgIHB1YmxpYyBnZXREaWZmVGltZSgpIHtcclxuICAgIHJldHVybiBTeXN0ZW1UaW1lTWFuYWdlci5pbnN0YW5jZS5kaWZmU2VydmVyVGltZTtcclxuICB9XHJcbiAgLy8g5raI5oGv5Y+R6YCB5pe25LiK5oql57uZ5pyN5Yqh5Zmo55qEbG9jYWxpZFxyXG4gICAgcHVibGljIHJhbmRvbUJpdCgpIHtcclxuICAgIGxldCByZXN1bHQ6bnVtYmVyID0gMDtcclxuICAgIGxldCBub3dUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuICAgIGxldCBkaWZUaW1lID0gU3lzdGVtVGltZU1hbmFnZXIuaW5zdGFuY2UuZ2V0RGlmZlRpbWUoKSAqIDEwMDA7XHJcbiAgICByZXN1bHQgPSAoKG5vd1RpbWUgKyBkaWZUaW1lICogMTAwMCkgKiAxMDAwKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gICAgLy/mlLbliLDlv4Pot7Pku6XlkI7orqHnrpfmnKzlnLDml7bpl7TkuI7mnI3liqHlmajnmoTml7bpl7Tlt64s5Y+W5pyA5bCP5beu5YC8XHJcbiAgICBwdWJsaWMgc2V0U2VydmVyVGltZShzZXJ2ZXJUaW1lKSB7XHJcbiAgICB2YXIgZGlmZlRpbWUgPSBzZXJ2ZXJUaW1lIC0gU3lzdGVtVGltZU1hbmFnZXIuaW5zdGFuY2UuaGVhcnRUaW1lO1xyXG4gICAgU3lzdGVtVGltZU1hbmFnZXIuaW5zdGFuY2UuZGlmZlNlcnZlclRpbWUgPSAoU3lzdGVtVGltZU1hbmFnZXIuaW5zdGFuY2UuZGlmZlNlcnZlclRpbWUgPT0gMCkgPyBkaWZmVGltZSA6IFN5c3RlbVRpbWVNYW5hZ2VyLmluc3RhbmNlLmRpZmZTZXJ2ZXJUaW1lO1xyXG4gICAgU3lzdGVtVGltZU1hbmFnZXIuaW5zdGFuY2UuZGlmZlNlcnZlclRpbWUgPSBNYXRoLmFicyhkaWZmVGltZSkgPCBNYXRoLmFicyhTeXN0ZW1UaW1lTWFuYWdlci5pbnN0YW5jZS5kaWZmU2VydmVyVGltZSkgPyBkaWZmVGltZSA6IFN5c3RlbVRpbWVNYW5hZ2VyLmluc3RhbmNlLmRpZmZTZXJ2ZXJUaW1lO1xyXG4gICAgU3lzdGVtVGltZU1hbmFnZXIuaW5zdGFuY2UuZGlmZlNlcnZlckNvdW50ID0gMTtcclxuICB9XHJcbn0iXX0=