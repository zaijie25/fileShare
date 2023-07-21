
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/component/ErmjAskClockView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcY29tcG9uZW50XFxFcm1qQXNrQ2xvY2tWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUFvRDtBQUVwRDtJQUE4QyxvQ0FBaUI7SUFBL0Q7UUFBQSxxRUErR0M7UUF0R1csYUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixrQkFBWSxHQUFHLEtBQUssQ0FBQztRQUVyQix3QkFBa0IsR0FBRyxDQUFDLENBQUM7UUFDdkIsbUJBQWEsR0FBRyxDQUFDLENBQUM7O0lBa0c5QixDQUFDO0lBaEdhLG1DQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBbUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLFFBQVEsR0FBZ0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVNLCtCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELHNCQUFXLG9DQUFNO2FBQWpCLFVBQWtCLElBQWE7WUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBRU0sd0NBQWEsR0FBcEIsVUFBcUIsUUFBa0IsRUFBRSxNQUFXO1FBQ2hELElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0kscUNBQVUsR0FBakIsVUFBa0IsSUFBWSxFQUFFLE1BQWtCO1FBQWxCLHVCQUFBLEVBQUEsVUFBa0I7UUFDOUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUks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SUFBRyxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQ1osT0FBTztRQUNYLElBQUksQ0FBQyxrQkFBa0IsRUFBRyxDQUFDO1FBQzNCLElBQUcsSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUM7WUFDN0MsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQS9HQSxBQStHQyxDQS9HNkMsMkJBQWlCLEdBK0c5RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFcm1qQmFzZUNvbXBvbmVudCBmcm9tIFwiLi9Fcm1qQmFzZUNvbXBvbmVudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJtakFza0Nsb2NrVmlldyBleHRlbmRzIEVybWpCYXNlQ29tcG9uZW50e1xyXG4gICAgcHJpdmF0ZSBjbG9ja1BybzogY2MuUHJvZ3Jlc3NCYXI7XHJcbiAgICBwcml2YXRlIGNsb2NrTGJsOiBjYy5SaWNoVGV4dDtcclxuXHJcbiAgICBwcml2YXRlIHRpbWVFbmQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc2Vjb25kQ2FsbDogRnVuY3Rpb247XHJcbiAgICBwcml2YXRlIHRhcmdldDogYW55O1xyXG4gICAgcHJpdmF0ZSB0aW1lTGVmdDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSB0aW1lVG90YWw6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcnVubmluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpc0Nsb2NrQXVkaW8gPSBmYWxzZTtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBjaGVja0ludGVydmFsRnJhbWUgPSAwO1xyXG4gICAgcHJpdmF0ZSBGcmFtZUludGVydmFsID0gMjtcclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5jbG9ja1BybyA9IDxjYy5Qcm9ncmVzc0Jhcj50aGlzLmdldE5vZGVDb21wb25lbnQoJ2Nsb2NrJywgY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIHRoaXMuY2xvY2tMYmwgPSA8Y2MuUmljaFRleHQ+dGhpcy5nZXROb2RlQ29tcG9uZW50KCd0aW1lTGJsJywgY2MuUmljaFRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KCl7XHJcbiAgICAgICAgdGhpcy5pbml0VmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgYWN0aXZlKGZsYWc6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmbGFnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTZWNvbmRDYWxsKGNhbGxiYWNrOiBGdW5jdGlvbiwgdGFyZ2V0OiBhbnkpe1xyXG4gICAgICAgIHRoaXMuc2Vjb25kQ2FsbCA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5byA5aeL5YCS6K6h5pe2XHJcbiAgICAgKiBAcGFyYW0gdGltZSDliankvZnml7bpl7QgbXNcclxuICAgICAqIEBwYXJhbSBuVG90YWwg5oC75pe26Ze0IG1zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGFydFRpbWVyKHRpbWU6IG51bWJlciwgblRvdGFsOiBudW1iZXIgPSAwKXtcclxuICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xyXG4gICAgICAgIHRoaXMudGltZVRvdGFsID0gblRvdGFsIHx8IHRpbWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lTGJsKE1hdGgucm91bmQodGltZSAvIDEwMDApKTtcclxuICAgICAgICB0aGlzLnRpbWVFbmQgPSB0aW1lICsgRGF0ZS5ub3coKTtcclxuICAgICAgICB0aGlzLmNoZWNrSW50ZXJ2YWxGcmFtZSA9IDA7XHJcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RvcFRpbWVyKCl7XHJcbiAgICAgICAgdGhpcy50aW1lRW5kID0gMDtcclxuICAgICAgICB0aGlzLnRpbWVMZWZ0ID0gLTE7XHJcbiAgICAgICAgdGhpcy50aW1lVG90YWwgPSAwO1xyXG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2hlY2tJbnRlcnZhbEZyYW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVRpbWVMYmwodGltZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLmNsb2NrTGJsLnN0cmluZyA9ICc8Yj4nICsgU3RyaW5nKHRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25VcGRhdGVUaW1lcigpe1xyXG4gICAgICAgIGxldCB0aW1lTGVmdCA9IE1hdGgucm91bmQoKHRoaXMudGltZUVuZCAtIERhdGUubm93KCkpIC8gMTAwMCk7XHJcbiAgICAgICAgdGhpcy5jbG9ja1Byby5wcm9ncmVzcyA9ICh0aGlzLnRpbWVFbmQgLSBEYXRlLm5vdygpKSAvIHRoaXMudGltZVRvdGFsO1xyXG4gICAgICAgIGlmICh0aW1lTGVmdCA9PSB0aGlzLnRpbWVMZWZ0KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy50aW1lTGVmdCA9IHRpbWVMZWZ0O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zZWNvbmRDYWxsICYmIHRoaXMudGFyZ2V0ICYmIHRoaXMuaXNDbG9ja0F1ZGlvKXtcclxuICAgICAgICAgICAgdGhpcy5zZWNvbmRDYWxsLmNhbGwodGhpcy50YXJnZXQsIHRoaXMudGltZUxlZnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAodGltZUxlZnQgPj0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZUxibCh0aW1lTGVmdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFZpZXdBY3RpdmUoaXNBY3RpdmUpe1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBpc0FjdGl2ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Q2xvY2tBdWRpb0VuYWJsZShmbGFnOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmlzQ2xvY2tBdWRpbyA9IGZsYWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldENsb2NrUG9zaXRpb24od29ybGRQb3Mpe1xyXG4gICAgICAgIGxldCBsb2NhbFBvcyA9IHRoaXMubm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIod29ybGRQb3MpO1xyXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihsb2NhbFBvcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpe1xyXG4gICAgICAgIHRoaXMuY2xvY2tQcm8ucHJvZ3Jlc3MgPSAxO1xyXG4gICAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXRDbG9ja0F1ZGlvRW5hYmxlKGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCl7XHJcbiAgICAgICAgdGhpcy5zdG9wVGltZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlKGR0KXtcclxuICAgICAgICBpZighdGhpcy5ydW5uaW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jaGVja0ludGVydmFsRnJhbWUgKys7XHJcbiAgICAgICAgaWYodGhpcy5jaGVja0ludGVydmFsRnJhbWUgPj0gdGhpcy5GcmFtZUludGVydmFsKXtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0ludGVydmFsRnJhbWUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm9uVXBkYXRlVGltZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=