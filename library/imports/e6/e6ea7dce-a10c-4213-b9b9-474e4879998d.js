"use strict";
cc._RF.push(module, 'e6ea73OoQxCE7m5R05IeZmN', 'DdzAskClockView');
// ddz/ddz/scripts/component/DdzAskClockView.ts

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
var DdzBaseComponent_1 = require("./DdzBaseComponent");
/**
 * 出牌倒计时view
 */
var DdzAskClockView = /** @class */ (function (_super) {
    __extends(DdzAskClockView, _super);
    function DdzAskClockView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.running = false;
        _this.isClockAudio = false;
        _this.checkIntervalFrame = 0;
        _this.FrameInterval = 2;
        return _this;
    }
    DdzAskClockView.prototype.initView = function () {
        this.clockPro = this.getNodeComponent('clock', cc.ProgressBar);
        this.clockLbl = this.getNodeComponent('timeLbl', cc.Label);
    };
    DdzAskClockView.prototype.init = function () {
        this.initView();
    };
    Object.defineProperty(DdzAskClockView.prototype, "active", {
        set: function (flag) {
            this.node.active = flag;
        },
        enumerable: false,
        configurable: true
    });
    DdzAskClockView.prototype.setSecondCall = function (callback, target) {
        this.secondCall = callback;
        this.target = target;
    };
    /**
     * 开始倒计时
     * @param time 剩余时间 ms
     * @param nTotal 总时间 ms
     */
    DdzAskClockView.prototype.startTimer = function (time, nTotal) {
        if (nTotal === void 0) { nTotal = 0; }
        this.stopTimer();
        this.timeTotal = nTotal || time;
        this.updateTimeLbl(Math.round(time / 1000));
        this.timeEnd = time + Date.now();
        this.checkIntervalFrame = 0;
        this.running = true;
    };
    DdzAskClockView.prototype.stopTimer = function () {
        this.timeEnd = 0;
        this.timeLeft = -1;
        this.timeTotal = 0;
        this.running = false;
        this.checkIntervalFrame = 0;
    };
    DdzAskClockView.prototype.updateTimeLbl = function (time) {
        this.clockLbl.string = String(time);
    };
    DdzAskClockView.prototype.onUpdateTimer = function () {
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
    DdzAskClockView.prototype.setViewActive = function (isActive) {
        this.node.active = isActive;
    };
    DdzAskClockView.prototype.setClockAudioEnable = function (flag) {
        this.isClockAudio = flag;
    };
    DdzAskClockView.prototype.setClockPosition = function (worldPos) {
        var localPos = this.node.parent.convertToNodeSpaceAR(worldPos);
        this.node.setPosition(localPos);
    };
    DdzAskClockView.prototype.onDisable = function () {
        this.clockPro.progress = 1;
        this.stopTimer();
        this.setClockAudioEnable(false);
    };
    DdzAskClockView.prototype.onDestroy = function () {
        this.stopTimer();
    };
    DdzAskClockView.prototype.update = function (dt) {
        if (!this.running)
            return;
        this.checkIntervalFrame++;
        if (this.checkIntervalFrame >= this.FrameInterval) {
            this.checkIntervalFrame = 0;
            this.onUpdateTimer();
        }
    };
    return DdzAskClockView;
}(DdzBaseComponent_1.default));
exports.default = DdzAskClockView;

cc._RF.pop();