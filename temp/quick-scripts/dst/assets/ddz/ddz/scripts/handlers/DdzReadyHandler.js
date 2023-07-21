
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/handlers/DdzReadyHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '92c11JHjbJPuZlrDtdkNNbH', 'DdzReadyHandler');
// ddz/ddz/scripts/handlers/DdzReadyHandler.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var DdzBaseHandler_1 = require("./DdzBaseHandler");
var DdzReadyHandler = /** @class */ (function (_super) {
    __extends(DdzReadyHandler, _super);
    function DdzReadyHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzReadyHandler.prototype.execute = function (msg) {
        this.context.isWaitMatch = false;
        this.mainUI.matchPlayerView.active = false;
        var time = msg._timeo * 1000 - (Date.now() - msg._receiveTime);
        // if (time <= 0)
        //     time = 1000;
        if (time >= 1000)
            this.mainUI.showActionTimer(true, 0, time, null);
    };
    DdzReadyHandler.prototype.executeSync = function (msg) {
        this.execute(msg);
    };
    return DdzReadyHandler;
}(DdzBaseHandler_1.default));
exports.default = DdzReadyHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGhhbmRsZXJzXFxEZHpSZWFkeUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBRTlDO0lBQTZDLG1DQUFjO0lBQTNEOztJQWNBLENBQUM7SUFiYSxpQ0FBTyxHQUFqQixVQUFrQixHQUFHO1FBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzNDLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5RCxpQkFBaUI7UUFDakIsbUJBQW1CO1FBQ25CLElBQUksSUFBSSxJQUFJLElBQUk7WUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRVMscUNBQVcsR0FBckIsVUFBc0IsR0FBRztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFDTCxzQkFBQztBQUFELENBZEEsQUFjQyxDQWQ0Qyx3QkFBYyxHQWMxRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZHpCYXNlSGFuZGxlciBmcm9tIFwiLi9EZHpCYXNlSGFuZGxlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGR6UmVhZHlIYW5kbGVyIGV4dGVuZHMgRGR6QmFzZUhhbmRsZXJ7XHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZShtc2cpe1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5pc1dhaXRNYXRjaCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubWFpblVJLm1hdGNoUGxheWVyVmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgdGltZSA9IG1zZy5fdGltZW8gKjEwMDAgLSAoRGF0ZS5ub3coKSAtIG1zZy5fcmVjZWl2ZVRpbWUpO1xyXG4gICAgICAgIC8vIGlmICh0aW1lIDw9IDApXHJcbiAgICAgICAgLy8gICAgIHRpbWUgPSAxMDAwO1xyXG4gICAgICAgIGlmICh0aW1lID49IDEwMDApXHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLnNob3dBY3Rpb25UaW1lcih0cnVlLCAwLCB0aW1lLCBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZVN5bmMobXNnKXtcclxuICAgICAgICB0aGlzLmV4ZWN1dGUobXNnKTtcclxuICAgIH1cclxufSJdfQ==