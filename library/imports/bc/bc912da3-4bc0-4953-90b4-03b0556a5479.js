"use strict";
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