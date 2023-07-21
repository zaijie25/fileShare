
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/handlers/DdzRefreshHandPokerHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2d1faQa94lPiaJ0kJrQS+N0', 'DdzRefreshHandPokerHandler');
// ddz/ddz/scripts/handlers/DdzRefreshHandPokerHandler.ts

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
var DdzRefreshHandPokerHandler = /** @class */ (function (_super) {
    __extends(DdzRefreshHandPokerHandler, _super);
    function DdzRefreshHandPokerHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzRefreshHandPokerHandler.prototype.execute = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        if (localSeat == 0) {
            this.context.refreshHandPokers(msg._para.cards);
        }
    };
    DdzRefreshHandPokerHandler.prototype.executeSync = function (msg) {
        this.execute(msg);
    };
    return DdzRefreshHandPokerHandler;
}(DdzBaseHandler_1.default));
exports.default = DdzRefreshHandPokerHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGhhbmRsZXJzXFxEZHpSZWZyZXNoSGFuZFBva2VySGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFFOUM7SUFBd0QsOENBQWM7SUFBdEU7O0lBYUEsQ0FBQztJQVphLDRDQUFPLEdBQWpCLFVBQWtCLEdBQUc7UUFFakIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQUcsU0FBUyxJQUFJLENBQUMsRUFDakI7WUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDbEQ7SUFDTCxDQUFDO0lBRVMsZ0RBQVcsR0FBckIsVUFBc0IsR0FBRztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFDTCxpQ0FBQztBQUFELENBYkEsQUFhQyxDQWJ1RCx3QkFBYyxHQWFyRSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZHpCYXNlSGFuZGxlciBmcm9tIFwiLi9EZHpCYXNlSGFuZGxlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGR6UmVmcmVzaEhhbmRQb2tlckhhbmRsZXIgZXh0ZW5kcyBEZHpCYXNlSGFuZGxlcntcclxuICAgIHByb3RlY3RlZCBleGVjdXRlKG1zZylcclxuICAgIHtcclxuICAgICAgICBsZXQgbG9jYWxTZWF0ID0gdGhpcy5TaXRIZWxwZXIuc2VydmVyU1RvTG9jYWxOKG1zZy5fc3JjKTtcclxuICAgICAgICBpZihsb2NhbFNlYXQgPT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5yZWZyZXNoSGFuZFBva2Vycyhtc2cuX3BhcmEuY2FyZHMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlU3luYyhtc2cpe1xyXG4gICAgICAgIHRoaXMuZXhlY3V0ZShtc2cpO1xyXG4gICAgfVxyXG59Il19