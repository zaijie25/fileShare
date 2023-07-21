
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/handlers/ErmjAutoHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0d2ddQyNEdK47qa3o8bHkyR', 'ErmjAutoHandler');
// ermj/Ermj/scripts/handlers/ErmjAutoHandler.ts

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
var ErmjBaseHandler_1 = require("./ErmjBaseHandler");
var ErmjAutoHandler = /** @class */ (function (_super) {
    __extends(ErmjAutoHandler, _super);
    function ErmjAutoHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjAutoHandler.prototype.execute = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        var isAuto = msg._para.auto_play == 1;
        this.mainUI.callPlayer(localSeat, 'showAutoSign', isAuto);
        if (localSeat == 0) {
            this.mainUI.askBtnView.setAutoPlayBtnShow(!isAuto);
            this.mainUI.doResetMj();
            this.context.isCmdAuto = isAuto;
        }
    };
    ErmjAutoHandler.prototype.executeSync = function (msg) {
        this.execute(msg);
    };
    return ErmjAutoHandler;
}(ErmjBaseHandler_1.default));
exports.default = ErmjAutoHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcaGFuZGxlcnNcXEVybWpBdXRvSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBZ0Q7QUFFaEQ7SUFBNkMsbUNBQWU7SUFBNUQ7O0lBZUEsQ0FBQztJQWRhLGlDQUFPLEdBQWpCLFVBQWtCLEdBQUc7UUFDakIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFELElBQUcsU0FBUyxJQUFJLENBQUMsRUFBQztZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUE7U0FDbEM7SUFDTCxDQUFDO0lBRVMscUNBQVcsR0FBckIsVUFBc0IsR0FBRztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFDTCxzQkFBQztBQUFELENBZkEsQUFlQyxDQWY0Qyx5QkFBZSxHQWUzRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFcm1qQmFzZUhhbmRsZXIgZnJvbSBcIi4vRXJtakJhc2VIYW5kbGVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFcm1qQXV0b0hhbmRsZXIgZXh0ZW5kcyBFcm1qQmFzZUhhbmRsZXJ7XHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZShtc2cpe1xyXG4gICAgICAgIGxldCBsb2NhbFNlYXQgPSB0aGlzLlNpdEhlbHBlci5zZXJ2ZXJTVG9Mb2NhbE4obXNnLl9zcmMpO1xyXG4gICAgICAgIGxldCBpc0F1dG8gPSBtc2cuX3BhcmEuYXV0b19wbGF5ID09IDE7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuY2FsbFBsYXllcihsb2NhbFNlYXQsICdzaG93QXV0b1NpZ24nLCBpc0F1dG8pO1xyXG4gICAgICAgIGlmKGxvY2FsU2VhdCA9PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkuYXNrQnRuVmlldy5zZXRBdXRvUGxheUJ0blNob3coIWlzQXV0byk7XHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLmRvUmVzZXRNaigpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuaXNDbWRBdXRvID0gaXNBdXRvXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlU3luYyhtc2cpe1xyXG4gICAgICAgIHRoaXMuZXhlY3V0ZShtc2cpO1xyXG4gICAgfVxyXG59Il19