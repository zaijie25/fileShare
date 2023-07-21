"use strict";
cc._RF.push(module, '58770d1l+lBZpH9dwXcMM+e', 'ErmjAskClockView');
// ermj/Ermj/scripts/component/ErmjAskClockView.ts

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
var ErmjBaseComponent_1 = require("./ErmjBaseComponent");
var ErmjAskClockView = /** @class */ (function (_super) {
    __extends(ErmjAskClockView, _super);
    function ErmjAskClockView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.running = false;
        _this.isClockAudio = false;
        _this.checkIntervalFrame = 0;
        _this.FrameInterval = 2;
        return _this;
    }
    ErmjAskClockView.prototype.initView = function () {
        this.clockPro = this.getNodeComponent('clock', cc.ProgressBar);
        this.clockLbl = this.getNodeComponent('timeLbl', cc.RichText);
    };
    ErmjAskClockView.prototype.init = function () {
        this.initView();
    };
    Object.defineProperty(ErmjAskClockView.prototype, "active", {
        set: function (flag) {
            this.node.active = flag;
        },
        enumerable: false,
        configurable: true
    });
    ErmjAskClockView.prototype.setSecondCall = function (callback, target) {
        this.secondCall = callback;
        this.target = target;
    };
    /**
     * 开始倒计时
     * @param time 剩余时间 ms
     * @param nTotal 总时间 ms
     */
    ErmjAskClockView.prototype.startTimer = function (time, nTotal) {
        if (nTotal === void 0) { nTotal = 0; }
        this.stopTimer();
        this.timeTotal = nTotal || time;
        this.updateTimeLbl(Math.round(time / 1000));
        this.timeEnd = time + Date.now();
        this.checkIntervalFrame = 0;
        this.running = true;
    };
    ErmjAskClockView.prototype.stopTimer = function () {
        this.timeEnd = 0;
        this.timeLeft = -1;
        this.timeTotal = 0;
        this.running = false;
        this.checkIntervalFrame = 0;
    };
    ErmjAskClockView.prototype.updateTimeLbl = function (time) {
        this.clockLbl.string = '<b>' + String(time);
    };
    ErmjAskClockView.prototype.onUpdateTimer = function () {
        var timeLeft = Math.round((this.timeEnd - Date.now()) / 1000);
        this.clockPro.progress = (this.timeEnd - Date.now()) / this.timeTotal;
        if (timeLeft == this.timeLeft)
            return;
        this.timeLeft = timeLeft;
        if (this.secondCall && this.target && this.isClockAudio) {
            this.secondCall.call(this.target, this.timeLeft);
        }
        if (timeLeft >= 0) {
            this.updateTimeLbl(timeLeft);
        }
        else {
            this.stopTimer();
            this.node.active = false;
        }
    };
    ErmjAskClockView.prototype.setViewActive = function (isActive) {
        this.node.active = isActive;
    };
    ErmjAskClockView.prototype.setClockAudioEnable = function (flag) {
        this.isClockAudio = flag;
    };
    ErmjAskClockView.prototype.setClockPosition = function (worldPos) {
        var localPos = this.node.parent.convertToNodeSpaceAR(worldPos);
        this.node.setPosition(localPos);
    };
    ErmjAskClockView.prototype.onDisable = function () {
        this.clockPro.progress = 1;
        this.stopTimer();
        this.setClockAudioEnable(false);
    };
    ErmjAskClockView.prototype.onDestroy = function () {
        this.stopTimer();
    };
    ErmjAskClockView.prototype.update = function (dt) {
        if (!this.running)
            return;
        this.checkIntervalFrame++;
        if (this.checkIntervalFrame >= this.FrameInterval) {
            this.checkIntervalFrame = 0;
            this.onUpdateTimer();
        }
    };
    return ErmjAskClockView;
}(ErmjBaseComponent_1.default));
exports.default = ErmjAskClockView;

cc._RF.pop();