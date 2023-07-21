
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Activity/DailyRecharge/TimeLimitedAwardBoxItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b4483GJn11AVZCBJ2MYSWK1', 'TimeLimitedAwardBoxItem');
// hall/scripts/logic/hall/ui/Activity/DailyRecharge/TimeLimitedAwardBoxItem.ts

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
var WndTimeLimitedRechargeGift_1 = require("./WndTimeLimitedRechargeGift");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TimeLimitedAwardBoxItem = /** @class */ (function (_super) {
    __extends(TimeLimitedAwardBoxItem, _super);
    function TimeLimitedAwardBoxItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.awardStateNode = [];
        _this.spine = null;
        _this.rateLabel = null;
        _this.opensp = null;
        _this.data = null;
        _this.key = null;
        return _this;
    }
    TimeLimitedAwardBoxItem.prototype.refreshState = function (data, level, index, levelCfg, reachCfg) {
        this.key = data.config.list[index].key;
        this.data = data;
        this.refreshRate(level);
        var state = this.getBoxStateByData(data, index, levelCfg, reachCfg);
        this.setBoxState(state);
    };
    /**
    *
    * @param data 当前宝箱数据
    * @param is_todayData 昨日奖励是否领取完成
    */
    TimeLimitedAwardBoxItem.prototype.getBoxStateByData = function (data, index, levelCfg, reachCfg) {
        var currentDama = data.put_code;
        var reachFlag = reachCfg[index] == 1;
        var damaFlag = currentDama >= levelCfg[index] && levelCfg[index] > 0;
        var status = data.status; // 1 未参与 2 参与未第二次充值 3 参与已经第二次充值 0 结束
        var receiveFlag = data.config.list[index];
        if (!damaFlag) {
            return WndTimeLimitedRechargeGift_1.TimeLimitedBoxState.Normal;
        }
        else {
            switch (status) {
                case 1:
                    return WndTimeLimitedRechargeGift_1.TimeLimitedBoxState.Normal;
                case 2:
                    return WndTimeLimitedRechargeGift_1.TimeLimitedBoxState.TodayAchieved;
                case 3:
                    if (!reachFlag) {
                        return WndTimeLimitedRechargeGift_1.TimeLimitedBoxState.TodayAchieved;
                    }
                    return WndTimeLimitedRechargeGift_1.TimeLimitedBoxState.AlreadyGot;
                default:
                    break;
            }
        }
        return WndTimeLimitedRechargeGift_1.TimeLimitedBoxState.Normal;
    };
    TimeLimitedAwardBoxItem.prototype.refreshRate = function (data) {
        if (!data) {
            return;
        }
        this.rateLabel.string = data.rate + "%" + "首充彩金";
    };
    TimeLimitedAwardBoxItem.prototype.setBoxState = function (state) {
        var btn = this.node.getComponent(cc.Button);
        switch (state) {
            case WndTimeLimitedRechargeGift_1.TimeLimitedBoxState.Normal:
                if (btn) {
                    btn.interactable = false;
                }
                this.awardStateNode[0].active = true;
                this.awardStateNode[1].active = false;
                this.opensp.active = false;
                break;
            case WndTimeLimitedRechargeGift_1.TimeLimitedBoxState.TodayAchieved:
                if (btn) {
                    btn.interactable = true;
                }
                this.awardStateNode[0].active = false;
                this.awardStateNode[1].active = true;
                if (this.spine) {
                    this.spine.setAnimation(0, "idle", true);
                }
                this.opensp.active = false;
                break;
            case WndTimeLimitedRechargeGift_1.TimeLimitedBoxState.AlreadyGot:
                if (btn) {
                    btn.interactable = false;
                }
                this.awardStateNode[0].active = false;
                this.awardStateNode[1].active = false;
                if (this.spine) {
                    this.spine.setAnimation(0, "idle", true);
                }
                this.opensp.active = true;
                break;
            default:
                break;
        }
    };
    __decorate([
        property([cc.Node])
    ], TimeLimitedAwardBoxItem.prototype, "awardStateNode", void 0);
    __decorate([
        property(sp.Skeleton)
    ], TimeLimitedAwardBoxItem.prototype, "spine", void 0);
    __decorate([
        property(cc.Label)
    ], TimeLimitedAwardBoxItem.prototype, "rateLabel", void 0);
    __decorate([
        property(cc.Node)
    ], TimeLimitedAwardBoxItem.prototype, "opensp", void 0);
    TimeLimitedAwardBoxItem = __decorate([
        ccclass
    ], TimeLimitedAwardBoxItem);
    return TimeLimitedAwardBoxItem;
}(cc.Component));
exports.default = TimeLimitedAwardBoxItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxBY3Rpdml0eVxcRGFpbHlSZWNoYXJnZVxcVGltZUxpbWl0ZWRBd2FyZEJveEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMkVBQW1FO0FBRzdELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXFELDJDQUFZO0lBQWpFO1FBQUEscUVBeUhDO1FBdEhHLG9CQUFjLEdBQWMsRUFBRSxDQUFBO1FBSTlCLFdBQUssR0FBZ0IsSUFBSSxDQUFBO1FBRXpCLGVBQVMsR0FBYSxJQUFJLENBQUE7UUFHMUIsWUFBTSxHQUFXLElBQUksQ0FBQztRQUV0QixVQUFJLEdBQVEsSUFBSSxDQUFBO1FBRWhCLFNBQUcsR0FBRyxJQUFJLENBQUE7O0lBeUdkLENBQUM7SUF2R0csOENBQVksR0FBWixVQUFhLElBQUksRUFBRSxLQUFLLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxRQUFRO1FBQzVDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFBO1FBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDdkIsSUFBSSxLQUFLLEdBQXdCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxRQUFRLENBQUMsQ0FBQTtRQUNyRixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzNCLENBQUM7SUFHRDs7OztNQUlFO0lBQ0YsbURBQWlCLEdBQWpCLFVBQWtCLElBQUksRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLFFB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QUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ3RDLElBQUcsSUFBSSxDQUFDLEtBQUssRUFDYjtvQkFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxDQUFBO2lCQUN6QztnQkFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQzFCLE1BQU07WUFFVjtnQkFDSSxNQUFNO1NBQ2I7SUFFTCxDQUFDO0lBbkhEO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO21FQUNVO0lBSTlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7MERBQ0c7SUFFekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs4REFDTztJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzJEQUNJO0lBWkwsdUJBQXVCO1FBRDNDLE9BQU87T0FDYSx1QkFBdUIsQ0F5SDNDO0lBQUQsOEJBQUM7Q0F6SEQsQUF5SEMsQ0F6SG9ELEVBQUUsQ0FBQyxTQUFTLEdBeUhoRTtrQkF6SG9CLHVCQUF1QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBUaW1lTGltaXRlZEJveFN0YXRlIH0gZnJvbSBcIi4vV25kVGltZUxpbWl0ZWRSZWNoYXJnZUdpZnRcIjtcclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZUxpbWl0ZWRBd2FyZEJveEl0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuTm9kZV0pXHJcbiAgICBhd2FyZFN0YXRlTm9kZTogY2MuTm9kZVtdID0gW11cclxuXHJcblxyXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgc3BpbmU6IHNwLlNrZWxldG9uID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcmF0ZUxhYmVsOiBjYy5MYWJlbCA9IG51bGxcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIG9wZW5zcDpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBkYXRhOiBhbnkgPSBudWxsXHJcblxyXG4gICAga2V5ID0gbnVsbFxyXG5cclxuICAgIHJlZnJlc2hTdGF0ZShkYXRhLCBsZXZlbCxpbmRleCxsZXZlbENmZyxyZWFjaENmZykge1xyXG4gICAgICAgIHRoaXMua2V5ID0gZGF0YS5jb25maWcubGlzdFtpbmRleF0ua2V5XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YVxyXG4gICAgICAgIHRoaXMucmVmcmVzaFJhdGUobGV2ZWwpXHJcbiAgICAgICAgbGV0IHN0YXRlOiBUaW1lTGltaXRlZEJveFN0YXRlID0gdGhpcy5nZXRCb3hTdGF0ZUJ5RGF0YShkYXRhLGluZGV4LGxldmVsQ2ZnLHJlYWNoQ2ZnKVxyXG4gICAgICAgIHRoaXMuc2V0Qm94U3RhdGUoc3RhdGUpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBcclxuICAgICogQHBhcmFtIGRhdGEg5b2T5YmN5a6d566x5pWw5o2uXHJcbiAgICAqIEBwYXJhbSBpc190b2RheURhdGEg5pio5pel5aWW5Yqx5piv5ZCm6aKG5Y+W5a6M5oiQXHJcbiAgICAqL1xyXG4gICAgZ2V0Qm94U3RhdGVCeURhdGEoZGF0YSxpbmRleCxsZXZlbENmZyxyZWFjaENmZykgXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnREYW1hID0gZGF0YS5wdXRfY29kZVxyXG4gICAgICAgXHJcblxyXG4gICAgICAgIGxldCByZWFjaEZsYWcgPSByZWFjaENmZ1tpbmRleF0gPT0gMVxyXG5cclxuICAgICAgICBsZXQgZGFtYUZsYWcgPSBjdXJyZW50RGFtYT49bGV2ZWxDZmdbaW5kZXhdICYmIGxldmVsQ2ZnW2luZGV4XSA+MFxyXG4gICAgICAgIGxldCBzdGF0dXMgPSBkYXRhLnN0YXR1cyAvLyAxIOacquWPguS4jiAyIOWPguS4juacquesrOS6jOasoeWFheWAvCAzIOWPguS4juW3sue7j+esrOS6jOasoeWFheWAvCAwIOe7k+adn1xyXG5cclxuICAgICAgICBsZXQgcmVjZWl2ZUZsYWcgPSBkYXRhLmNvbmZpZy5saXN0W2luZGV4XVxyXG5cclxuICAgICAgICBpZighZGFtYUZsYWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gVGltZUxpbWl0ZWRCb3hTdGF0ZS5Ob3JtYWxcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3dpdGNoIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVGltZUxpbWl0ZWRCb3hTdGF0ZS5Ob3JtYWxcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFRpbWVMaW1pdGVkQm94U3RhdGUuVG9kYXlBY2hpZXZlZFxyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFyZWFjaEZsYWcpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gVGltZUxpbWl0ZWRCb3hTdGF0ZS5Ub2RheUFjaGlldmVkXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBUaW1lTGltaXRlZEJveFN0YXRlLkFscmVhZHlHb3RcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBUaW1lTGltaXRlZEJveFN0YXRlLk5vcm1hbFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZWZyZXNoUmF0ZShkYXRhKSB7XHJcbiAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJhdGVMYWJlbC5zdHJpbmcgPSBkYXRhLnJhdGUgKyBcIiVcIitcIummluWFheW9qemHkVwiO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEJveFN0YXRlKHN0YXRlOiBUaW1lTGltaXRlZEJveFN0YXRlKSB7XHJcbiAgICAgICAgbGV0IGJ0biA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKVxyXG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSBUaW1lTGltaXRlZEJveFN0YXRlLk5vcm1hbDpcclxuICAgICAgICAgICAgICAgIGlmIChidG4pIHtcclxuICAgICAgICAgICAgICAgICAgICBidG4uaW50ZXJhY3RhYmxlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYXdhcmRTdGF0ZU5vZGVbMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXdhcmRTdGF0ZU5vZGVbMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5zcC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRpbWVMaW1pdGVkQm94U3RhdGUuVG9kYXlBY2hpZXZlZDpcclxuICAgICAgICAgICAgICAgIGlmIChidG4pIHtcclxuICAgICAgICAgICAgICAgICAgICBidG4uaW50ZXJhY3RhYmxlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hd2FyZFN0YXRlTm9kZVswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXdhcmRTdGF0ZU5vZGVbMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc3BpbmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGluZS5zZXRBbmltYXRpb24oMCxcImlkbGVcIix0cnVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuc3AuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUaW1lTGltaXRlZEJveFN0YXRlLkFscmVhZHlHb3Q6XHJcbiAgICAgICAgICAgICAgICBpZiAoYnRuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLmludGVyYWN0YWJsZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF3YXJkU3RhdGVOb2RlWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hd2FyZFN0YXRlTm9kZVsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc3BpbmUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGluZS5zZXRBbmltYXRpb24oMCxcImlkbGVcIix0cnVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuc3AuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iXX0=