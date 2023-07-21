
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/component/DdzAskClockView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGNvbXBvbmVudFxcRGR6QXNrQ2xvY2tWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUFrRDtBQUVsRDs7R0FFRztBQUNIO0lBQTZDLG1DQUFnQjtJQUE3RDtRQUFBLHFFQStHQztRQXRHVyxhQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGtCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXJCLHdCQUFrQixHQUFHLENBQUMsQ0FBQztRQUN2QixtQkFBYSxHQUFHLENBQUMsQ0FBQzs7SUFrRzlCLENBQUM7SUFoR2Esa0NBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFtQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsUUFBUSxHQUFhLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFTSw4QkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxzQkFBVyxtQ0FBTTthQUFqQixVQUFrQixJQUFhO1lBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUVNLHVDQUFhLEdBQXBCLFVBQXFCLFFBQWtCLEVBQUUsTUFBVztRQUNoRCxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLG9DQUFVLEdBQWpCLFVBQWtCLElBQVksRUFBRSxNQUFrQjtRQUFsQix1QkFBQSxFQUFBLFVBQWtCO1FBQzlDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNq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RyxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQ1osT0FBTztRQUNYLElBQUksQ0FBQyxrQkFBa0IsRUFBRyxDQUFDO1FBQzNCLElBQUcsSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUM7WUFDN0MsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQS9HQSxBQStHQyxDQS9HNEMsMEJBQWdCLEdBK0c1RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZHpCYXNlQ29tcG9uZW50IGZyb20gXCIuL0RkekJhc2VDb21wb25lbnRcIjtcclxuXHJcbi8qKlxyXG4gKiDlh7rniYzlgJLorqHml7Z2aWV3XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZHpBc2tDbG9ja1ZpZXcgZXh0ZW5kcyBEZHpCYXNlQ29tcG9uZW50e1xyXG4gICAgcHJpdmF0ZSBjbG9ja1BybzogY2MuUHJvZ3Jlc3NCYXI7XHJcbiAgICBwcml2YXRlIGNsb2NrTGJsOiBjYy5MYWJlbDtcclxuXHJcbiAgICBwcml2YXRlIHRpbWVFbmQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc2Vjb25kQ2FsbDogRnVuY3Rpb247XHJcbiAgICBwcml2YXRlIHRhcmdldDogYW55O1xyXG4gICAgcHJpdmF0ZSB0aW1lTGVmdDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSB0aW1lVG90YWw6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcnVubmluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpc0Nsb2NrQXVkaW8gPSBmYWxzZTtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBjaGVja0ludGVydmFsRnJhbWUgPSAwO1xyXG4gICAgcHJpdmF0ZSBGcmFtZUludGVydmFsID0gMjtcclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5jbG9ja1BybyA9IDxjYy5Qcm9ncmVzc0Jhcj50aGlzLmdldE5vZGVDb21wb25lbnQoJ2Nsb2NrJywgY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIHRoaXMuY2xvY2tMYmwgPSA8Y2MuTGFiZWw+dGhpcy5nZXROb2RlQ29tcG9uZW50KCd0aW1lTGJsJywgY2MuTGFiZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KCl7XHJcbiAgICAgICAgdGhpcy5pbml0VmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgYWN0aXZlKGZsYWc6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmbGFnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTZWNvbmRDYWxsKGNhbGxiYWNrOiBGdW5jdGlvbiwgdGFyZ2V0OiBhbnkpe1xyXG4gICAgICAgIHRoaXMuc2Vjb25kQ2FsbCA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5byA5aeL5YCS6K6h5pe2XHJcbiAgICAgKiBAcGFyYW0gdGltZSDliankvZnml7bpl7QgbXNcclxuICAgICAqIEBwYXJhbSBuVG90YWwg5oC75pe26Ze0IG1zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGFydFRpbWVyKHRpbWU6IG51bWJlciwgblRvdGFsOiBudW1iZXIgPSAwKXtcclxuICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xyXG4gICAgICAgIHRoaXMudGltZVRvdGFsID0gblRvdGFsIHx8IHRpbWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lTGJsKE1hdGgucm91bmQodGltZSAvIDEwMDApKTtcclxuICAgICAgICB0aGlzLnRpbWVFbmQgPSB0aW1lICsgRGF0ZS5ub3coKTtcclxuICAgICAgICB0aGlzLmNoZWNrSW50ZXJ2YWxGcmFtZSA9IDA7XHJcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RvcFRpbWVyKCl7XHJcbiAgICAgICAgdGhpcy50aW1lRW5kID0gMDtcclxuICAgICAgICB0aGlzLnRpbWVMZWZ0ID0gLTE7XHJcbiAgICAgICAgdGhpcy50aW1lVG90YWwgPSAwO1xyXG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2hlY2tJbnRlcnZhbEZyYW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVRpbWVMYmwodGltZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLmNsb2NrTGJsLnN0cmluZyA9IFN0cmluZyh0aW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVXBkYXRlVGltZXIoKXtcclxuICAgICAgICBsZXQgdGltZUxlZnQgPSBNYXRoLnJvdW5kKCh0aGlzLnRpbWVFbmQgLSBEYXRlLm5vdygpKSAvIDEwMDApO1xyXG4gICAgICAgIHRoaXMuY2xvY2tQcm8ucHJvZ3Jlc3MgPSAodGhpcy50aW1lRW5kIC0gRGF0ZS5ub3coKSkgLyB0aGlzLnRpbWVUb3RhbDtcclxuICAgICAgICBpZiAodGltZUxlZnQgPT0gdGhpcy50aW1lTGVmdClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMudGltZUxlZnQgPSB0aW1lTGVmdDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2Vjb25kQ2FsbCAmJiB0aGlzLnRhcmdldCAmJiB0aGlzLmlzQ2xvY2tBdWRpbyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kQ2FsbC5jYWxsKHRoaXMudGFyZ2V0LCB0aGlzLnRpbWVMZWZ0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRpbWVMZWZ0ID49IDApe1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRpbWVMYmwodGltZUxlZnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRWaWV3QWN0aXZlKGlzQWN0aXZlKXtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gaXNBY3RpdmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldENsb2NrQXVkaW9FbmFibGUoZmxhZzogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5pc0Nsb2NrQXVkaW8gPSBmbGFnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRDbG9ja1Bvc2l0aW9uKHdvcmxkUG9zKXtcclxuICAgICAgICBsZXQgbG9jYWxQb3MgPSB0aGlzLm5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkUG9zKTtcclxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24obG9jYWxQb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKXtcclxuICAgICAgICB0aGlzLmNsb2NrUHJvLnByb2dyZXNzID0gMTtcclxuICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xyXG4gICAgICAgIHRoaXMuc2V0Q2xvY2tBdWRpb0VuYWJsZShmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpe1xyXG4gICAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZShkdCl7XHJcbiAgICAgICAgaWYoIXRoaXMucnVubmluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY2hlY2tJbnRlcnZhbEZyYW1lICsrO1xyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tJbnRlcnZhbEZyYW1lID49IHRoaXMuRnJhbWVJbnRlcnZhbCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tJbnRlcnZhbEZyYW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5vblVwZGF0ZVRpbWVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19