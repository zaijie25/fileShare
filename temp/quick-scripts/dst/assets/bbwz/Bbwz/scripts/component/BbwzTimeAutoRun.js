
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/component/BbwzTimeAutoRun.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bc9122jS8BJU5C0A7BValR5', 'BbwzTimeAutoRun');
// bbwz/Bbwz/scripts/component/BbwzTimeAutoRun.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BbwzTimeAutoRun = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BbwzTimeAutoRun = /** @class */ (function (_super) {
    __extends(BbwzTimeAutoRun, _super);
    //倒计时组件  提供倒计时
    function BbwzTimeAutoRun() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.leftTime = 5;
        return _this;
    }
    BbwzTimeAutoRun.prototype.onLoad = function () {
        this.timeLbl = this.getComponent(cc.Label);
    };
    BbwzTimeAutoRun.prototype.onEnable = function () {
    };
    BbwzTimeAutoRun.prototype.setTimer = function (time) {
        this.leftTime = Math.floor(time);
        this.setTimeLbl();
        this.schedule(this.onTimeRun, 1);
    };
    BbwzTimeAutoRun.prototype.setSecondCall = function (callback, target) {
        this.secondCall = callback;
        this.target = target;
    };
    BbwzTimeAutoRun.prototype.onTimeRun = function () {
        this.leftTime--;
        if (this.secondCall && this.target) {
            this.secondCall.call(this.target, this.leftTime);
        }
        this.setTimeLbl();
    };
    BbwzTimeAutoRun.prototype.onDisable = function () {
        this.secondCall = null;
        this.target = null;
        this.unschedule(this.onTimeRun);
    };
    BbwzTimeAutoRun.prototype.onDestroy = function () {
        this.unschedule(this.onTimeRun);
    };
    BbwzTimeAutoRun.prototype.setTimeLbl = function () {
        this.timeLbl.string = "" + this.leftTime;
    };
    BbwzTimeAutoRun = __decorate([
        ccclass
        //倒计时组件  提供倒计时
    ], BbwzTimeAutoRun);
    return BbwzTimeAutoRun;
}(cc.Component));
exports.BbwzTimeAutoRun = BbwzTimeAutoRun;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcY29tcG9uZW50XFxCYnd6VGltZUF1dG9SdW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXFDLG1DQUFZO0lBRGpELGNBQWM7SUFDZDtRQUFBLHFFQThDQztRQTNDVyxjQUFRLEdBQUcsQ0FBQyxDQUFDOztJQTJDekIsQ0FBQztJQXhDYSxnQ0FBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVTLGtDQUFRLEdBQWxCO0lBRUEsQ0FBQztJQUVNLGtDQUFRLEdBQWYsVUFBZ0IsSUFBWTtRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU0sdUNBQWEsR0FBcEIsVUFBcUIsUUFBa0IsRUFBRSxNQUFXO1FBQ2hELElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFFTyxtQ0FBUyxHQUFqQjtRQUNJLElBQUksQ0FBQyxRQUFRLEVBQUcsQ0FBQztRQUNqQixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBQztZQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwRDtRQUNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRVMsbUNBQVMsR0FBbkI7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRVMsbUNBQVMsR0FBbkI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU8sb0NBQVUsR0FBbEI7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFHLElBQUksQ0FBQyxRQUFVLENBQUM7SUFDN0MsQ0FBQztJQTdDUSxlQUFlO1FBRjNCLE9BQU87UUFDUixjQUFjO09BQ0QsZUFBZSxDQThDM0I7SUFBRCxzQkFBQztDQTlDRCxBQThDQyxDQTlDb0MsRUFBRSxDQUFDLFNBQVMsR0E4Q2hEO0FBOUNZLDBDQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcbkBjY2NsYXNzXHJcbi8v5YCS6K6h5pe257uE5Lu2ICDmj5DkvpvlgJLorqHml7ZcclxuZXhwb3J0IGNsYXNzIEJid3pUaW1lQXV0b1J1biBleHRlbmRzIGNjLkNvbXBvbmVudFxyXG57XHJcbiAgICBwcml2YXRlIHRpbWVMYmw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBsZWZ0VGltZSA9IDU7XHJcbiAgICBwcml2YXRlIHNlY29uZENhbGw6IEZ1bmN0aW9uO1xyXG4gICAgcHJpdmF0ZSB0YXJnZXQ6IGFueTtcclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKXtcclxuICAgICAgICB0aGlzLnRpbWVMYmwgPSB0aGlzLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFRpbWVyKHRpbWU6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5sZWZ0VGltZSA9IE1hdGguZmxvb3IodGltZSk7XHJcbiAgICAgICAgdGhpcy5zZXRUaW1lTGJsKCk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLm9uVGltZVJ1biwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNlY29uZENhbGwoY2FsbGJhY2s6IEZ1bmN0aW9uLCB0YXJnZXQ6IGFueSl7XHJcbiAgICAgICAgdGhpcy5zZWNvbmRDYWxsID0gY2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblRpbWVSdW4oKXtcclxuICAgICAgICB0aGlzLmxlZnRUaW1lIC0tO1xyXG4gICAgICAgIGlmICh0aGlzLnNlY29uZENhbGwgJiYgdGhpcy50YXJnZXQpe1xyXG4gICAgICAgICAgICB0aGlzLnNlY29uZENhbGwuY2FsbCh0aGlzLnRhcmdldCwgdGhpcy5sZWZ0VGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0VGltZUxibCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKXtcclxuICAgICAgICB0aGlzLnNlY29uZENhbGwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5vblRpbWVSdW4pO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKXtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5vblRpbWVSdW4pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0VGltZUxibCgpe1xyXG4gICAgICAgIHRoaXMudGltZUxibC5zdHJpbmcgPSBgJHt0aGlzLmxlZnRUaW1lfWA7XHJcbiAgICB9XHJcbn0iXX0=