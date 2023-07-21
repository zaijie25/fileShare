"use strict";
cc._RF.push(module, '8686bVDMN5Fy459RhLbMr/Z', 'DDZTimeAutoRun');
// ddz/ddz/scripts/component/DDZTimeAutoRun.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DDZTimeAutoRun = /** @class */ (function (_super) {
    __extends(DDZTimeAutoRun, _super);
    //倒计时组件  提供倒计时
    function DDZTimeAutoRun() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.totalTime = 5;
        return _this;
    }
    DDZTimeAutoRun.prototype.onLoad = function () {
        this.timeLbl = this.getComponent(cc.Label);
    };
    DDZTimeAutoRun.prototype.onEnable = function () {
    };
    DDZTimeAutoRun.prototype.setTimer = function (time, callback, target) {
        this.totalTime = time;
        this.finishCal = callback;
        this.target = target;
        this.setTimeLbl();
        this.schedule(this.onTimeRun, 1);
    };
    DDZTimeAutoRun.prototype.onTimerFinish = function () {
        if (this.finishCal && this.target) {
            this.finishCal.call(this.target);
        }
    };
    DDZTimeAutoRun.prototype.onTimeRun = function () {
        if (!cc.isValid(this.node)) // debug退出时 实际还未销毁, 可能还在跑
            return;
        this.totalTime--;
        if (this.totalTime == 0) {
            this.onTimerFinish();
        }
        this.setTimeLbl();
    };
    DDZTimeAutoRun.prototype.onDisable = function () {
        this.unschedule(this.onTimeRun);
    };
    DDZTimeAutoRun.prototype.onDestroy = function () {
        this.unschedule(this.onTimeRun);
    };
    DDZTimeAutoRun.prototype.setTimeLbl = function () {
        this.timeLbl.string = "" + this.totalTime;
    };
    DDZTimeAutoRun = __decorate([
        ccclass
        //倒计时组件  提供倒计时
    ], DDZTimeAutoRun);
    return DDZTimeAutoRun;
}(cc.Component));
exports.default = DDZTimeAutoRun;

cc._RF.pop();