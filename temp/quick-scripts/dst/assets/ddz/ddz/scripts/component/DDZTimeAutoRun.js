
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/component/DDZTimeAutoRun.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGNvbXBvbmVudFxcRERaVGltZUF1dG9SdW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNEMsa0NBQVk7SUFEeEQsY0FBYztJQUNkO1FBQUEscUVBK0NDO1FBN0NXLGVBQVMsR0FBRyxDQUFDLENBQUM7O0lBNkMxQixDQUFDO0lBMUNhLCtCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRVMsaUNBQVEsR0FBbEI7SUFDQSxDQUFDO0lBRU0saUNBQVEsR0FBZixVQUFnQixJQUFZLEVBQUUsUUFBa0IsRUFBRSxNQUFXO1FBQ3pELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVPLHNDQUFhLEdBQXJCO1FBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUM7WUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQztJQUVPLGtDQUFTLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFVLHlCQUF5QjtZQUN6RCxPQUFPO1FBQ1gsSUFBSSxDQUFDLFNBQVMsRUFBRyxDQUFDO1FBQ2xCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLEVBQUM7WUFDcEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO1FBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFUyxrQ0FBUyxHQUFuQjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFUyxrQ0FBUyxHQUFuQjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFTyxtQ0FBVSxHQUFsQjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUcsSUFBSSxDQUFDLFNBQVcsQ0FBQztJQUM5QyxDQUFDO0lBOUNnQixjQUFjO1FBRmxDLE9BQU87UUFDUixjQUFjO09BQ08sY0FBYyxDQStDbEM7SUFBRCxxQkFBQztDQS9DRCxBQStDQyxDQS9DMkMsRUFBRSxDQUFDLFNBQVMsR0ErQ3ZEO2tCQS9Db0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5AY2NjbGFzc1xyXG4vL+WAkuiuoeaXtue7hOS7tiAg5o+Q5L6b5YCS6K6h5pe2XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEREWlRpbWVBdXRvUnVuIGV4dGVuZHMgY2MuQ29tcG9uZW50e1xyXG4gICAgcHJpdmF0ZSB0aW1lTGJsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgdG90YWxUaW1lID0gNTtcclxuICAgIHByaXZhdGUgZmluaXNoQ2FsOiBGdW5jdGlvbjtcclxuICAgIHByaXZhdGUgdGFyZ2V0OiBhbnk7XHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCl7XHJcbiAgICAgICAgdGhpcy50aW1lTGJsID0gdGhpcy5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpe1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRUaW1lcih0aW1lOiBudW1iZXIsIGNhbGxiYWNrOiBGdW5jdGlvbiwgdGFyZ2V0OiBhbnkpe1xyXG4gICAgICAgIHRoaXMudG90YWxUaW1lID0gdGltZTtcclxuICAgICAgICB0aGlzLmZpbmlzaENhbCA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIHRoaXMuc2V0VGltZUxibCgpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5vblRpbWVSdW4sIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25UaW1lckZpbmlzaCgpe1xyXG4gICAgICAgIGlmICh0aGlzLmZpbmlzaENhbCAmJiB0aGlzLnRhcmdldCl7XHJcbiAgICAgICAgICAgIHRoaXMuZmluaXNoQ2FsLmNhbGwodGhpcy50YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVGltZVJ1bigpe1xyXG4gICAgICAgIGlmICghY2MuaXNWYWxpZCh0aGlzLm5vZGUpKSAgICAgICAgIC8vIGRlYnVn6YCA5Ye65pe2IOWunumZhei/mOacqumUgOavgSwg5Y+v6IO96L+Y5Zyo6LeRXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLnRvdGFsVGltZSAtLTtcclxuICAgICAgICBpZiAodGhpcy50b3RhbFRpbWUgPT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMub25UaW1lckZpbmlzaCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFRpbWVMYmwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCl7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMub25UaW1lUnVuKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCl7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMub25UaW1lUnVuKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFRpbWVMYmwoKXtcclxuICAgICAgICB0aGlzLnRpbWVMYmwuc3RyaW5nID0gYCR7dGhpcy50b3RhbFRpbWV9YDtcclxuICAgIH1cclxufSJdfQ==