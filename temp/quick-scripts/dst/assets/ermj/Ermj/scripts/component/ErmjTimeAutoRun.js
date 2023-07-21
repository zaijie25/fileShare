
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/component/ErmjTimeAutoRun.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dab40LsU89P8qVAMQ7Evl8H', 'ErmjTimeAutoRun');
// ermj/Ermj/scripts/component/ErmjTimeAutoRun.ts

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
var ErmjTimeAutoRun = /** @class */ (function (_super) {
    __extends(ErmjTimeAutoRun, _super);
    //倒计时组件  提供倒计时
    function ErmjTimeAutoRun() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.totalTime = 5;
        return _this;
    }
    ErmjTimeAutoRun.prototype.onLoad = function () {
        this.timeLbl = this.getComponent(cc.Label);
    };
    ErmjTimeAutoRun.prototype.onEnable = function () {
    };
    ErmjTimeAutoRun.prototype.setTimer = function (time, callback, target) {
        this.totalTime = time;
        this.finishCal = callback;
        this.target = target;
        this.setTimeLbl();
        this.schedule(this.onTimeRun, 1);
    };
    ErmjTimeAutoRun.prototype.onTimerFinish = function () {
        if (this.finishCal && this.target) {
            this.finishCal.call(this.target);
        }
        else {
            this.node.active = false;
        }
    };
    ErmjTimeAutoRun.prototype.onTimeRun = function () {
        if (!cc.isValid(this.node)) // debug退出时 实际还未销毁, 可能还在跑
            return;
        this.totalTime--;
        if (this.totalTime == 0) {
            this.onTimerFinish();
        }
        this.setTimeLbl();
    };
    ErmjTimeAutoRun.prototype.onDisable = function () {
        this.unschedule(this.onTimeRun);
    };
    ErmjTimeAutoRun.prototype.onDestroy = function () {
        this.unschedule(this.onTimeRun);
    };
    ErmjTimeAutoRun.prototype.setTimeLbl = function () {
        if (this.totalTime < 10)
            this.timeLbl.string = "0" + this.totalTime;
        else
            this.timeLbl.string = "" + this.totalTime;
    };
    ErmjTimeAutoRun = __decorate([
        ccclass
        //倒计时组件  提供倒计时
    ], ErmjTimeAutoRun);
    return ErmjTimeAutoRun;
}(cc.Component));
exports.default = ErmjTimeAutoRun;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcY29tcG9uZW50XFxFcm1qVGltZUF1dG9SdW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNkMsbUNBQVk7SUFEekQsY0FBYztJQUNkO1FBQUEscUVBcURDO1FBbkRXLGVBQVMsR0FBRyxDQUFDLENBQUM7O0lBbUQxQixDQUFDO0lBaERhLGdDQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRVMsa0NBQVEsR0FBbEI7SUFDQSxDQUFDO0lBRU0sa0NBQVEsR0FBZixVQUFnQixJQUFZLEVBQUUsUUFBa0IsRUFBRSxNQUFXO1FBQ3pELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVPLHVDQUFhLEdBQXJCO1FBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUM7WUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3BDO2FBQ0c7WUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBRU8sbUNBQVMsR0FBakI7UUFDSSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQVUseUJBQXlCO1lBQ3pELE9BQU87UUFDWCxJQUFJLENBQUMsU0FBUyxFQUFHLENBQUM7UUFDbEIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsRUFBQztZQUNwQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7UUFDRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVTLG1DQUFTLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVTLG1DQUFTLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVPLG9DQUFVLEdBQWxCO1FBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUU7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBSSxJQUFJLENBQUMsU0FBVyxDQUFDOztZQUUzQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFHLElBQUksQ0FBQyxTQUFXLENBQUM7SUFDbEQsQ0FBQztJQXBEZ0IsZUFBZTtRQUZuQyxPQUFPO1FBQ1IsY0FBYztPQUNPLGVBQWUsQ0FxRG5DO0lBQUQsc0JBQUM7Q0FyREQsQUFxREMsQ0FyRDRDLEVBQUUsQ0FBQyxTQUFTLEdBcUR4RDtrQkFyRG9CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuQGNjY2xhc3NcclxuLy/lgJLorqHml7bnu4Tku7YgIOaPkOS+m+WAkuiuoeaXtlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFcm1qVGltZUF1dG9SdW4gZXh0ZW5kcyBjYy5Db21wb25lbnR7XHJcbiAgICBwcml2YXRlIHRpbWVMYmw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSB0b3RhbFRpbWUgPSA1O1xyXG4gICAgcHJpdmF0ZSBmaW5pc2hDYWw6IEZ1bmN0aW9uO1xyXG4gICAgcHJpdmF0ZSB0YXJnZXQ6IGFueTtcclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKXtcclxuICAgICAgICB0aGlzLnRpbWVMYmwgPSB0aGlzLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCl7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFRpbWVyKHRpbWU6IG51bWJlciwgY2FsbGJhY2s6IEZ1bmN0aW9uLCB0YXJnZXQ6IGFueSl7XHJcbiAgICAgICAgdGhpcy50b3RhbFRpbWUgPSB0aW1lO1xyXG4gICAgICAgIHRoaXMuZmluaXNoQ2FsID0gY2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgdGhpcy5zZXRUaW1lTGJsKCk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLm9uVGltZVJ1biwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblRpbWVyRmluaXNoKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuZmluaXNoQ2FsICYmIHRoaXMudGFyZ2V0KXtcclxuICAgICAgICAgICAgdGhpcy5maW5pc2hDYWwuY2FsbCh0aGlzLnRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblRpbWVSdW4oKXtcclxuICAgICAgICBpZiAoIWNjLmlzVmFsaWQodGhpcy5ub2RlKSkgICAgICAgICAvLyBkZWJ1Z+mAgOWHuuaXtiDlrp7pmYXov5jmnKrplIDmr4EsIOWPr+iDvei/mOWcqOi3kVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy50b3RhbFRpbWUgLS07XHJcbiAgICAgICAgaWYgKHRoaXMudG90YWxUaW1lID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLm9uVGltZXJGaW5pc2goKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRUaW1lTGJsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpe1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLm9uVGltZVJ1bik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpe1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLm9uVGltZVJ1bik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRUaW1lTGJsKCl7XHJcbiAgICAgICAgaWYgKHRoaXMudG90YWxUaW1lIDwgMTApXHJcbiAgICAgICAgICAgIHRoaXMudGltZUxibC5zdHJpbmcgPSBgMCR7dGhpcy50b3RhbFRpbWV9YDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMudGltZUxibC5zdHJpbmcgPSBgJHt0aGlzLnRvdGFsVGltZX1gO1xyXG4gICAgfVxyXG59Il19