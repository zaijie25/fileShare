
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Activity/DailyRecharge/AwardBoxItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ef764t1tiZLuIcFoYczoEtr', 'AwardBoxItem');
// hall/scripts/logic/hall/ui/Activity/DailyRecharge/AwardBoxItem.ts

"use strict";
// import { BoxState } from "./DailyRechargeGiftView";
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
var WndDailyRechargeGift_1 = require("./WndDailyRechargeGift");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AwardBoxItem = /** @class */ (function (_super) {
    __extends(AwardBoxItem, _super);
    function AwardBoxItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.awardStateSprite = [];
        _this.shinyNode = null;
        _this.rateLabel = null;
        _this.data = null;
        _this.is_done = false;
        _this.isYesterdayAchieve = false;
        _this.is_todayData = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    /**
     *
     * @param data 当前宝箱数据
     * @param is_done 昨日奖励是否领取完成
     */
    AwardBoxItem.prototype.refreshState = function (data, is_done, is_todayData, isYesterdayAchieve) {
        if (!data) {
            this.setBoxState(WndDailyRechargeGift_1.BoxState.Normal);
            return;
        }
        this.data = data;
        this.is_done = is_done;
        this.is_todayData = is_todayData;
        this.isYesterdayAchieve = isYesterdayAchieve;
        var boxState = this.getBoxStateByData(data, is_todayData);
        this.setBoxState(boxState);
    };
    AwardBoxItem.prototype.refreshRate = function (data) {
        if (!data) {
            return;
        }
        this.rateLabel.string = data.rate + "%";
    };
    AwardBoxItem.prototype.setBoxState = function (state) {
        var btn = this.node.getComponent(cc.Button);
        switch (state) {
            case WndDailyRechargeGift_1.BoxState.Normal:
                if (btn) {
                    btn.interactable = false;
                }
                this.awardStateSprite[0].node.active = true;
                this.awardStateSprite[1].node.active = false;
                this.awardStateSprite[2].node.active = false;
                this.shinyNode.active = false;
                break;
            case WndDailyRechargeGift_1.BoxState.TodayAchieved:
                if (btn) {
                    btn.interactable = true;
                }
                this.awardStateSprite[0].node.active = true;
                this.awardStateSprite[1].node.active = false;
                this.awardStateSprite[2].node.active = true;
                this.shinyNode.active = false;
                break;
            case WndDailyRechargeGift_1.BoxState.RealAchieved:
                if (btn) {
                    btn.interactable = true;
                }
                this.awardStateSprite[0].node.active = false;
                this.awardStateSprite[1].node.active = false;
                this.awardStateSprite[2].node.active = false;
                this.shinyNode.active = true;
                break;
            case WndDailyRechargeGift_1.BoxState.AlreadyGot:
                if (btn) {
                    btn.interactable = false;
                }
                this.awardStateSprite[0].node.active = false;
                this.awardStateSprite[1].node.active = true;
                this.awardStateSprite[2].node.active = false;
                this.shinyNode.active = false;
                break;
            default:
                break;
        }
    };
    /**
     *
     * @param data 当前宝箱数据
     * @param is_todayData 昨日奖励是否领取完成
     */
    AwardBoxItem.prototype.getBoxStateByData = function (data, is_todayData) {
        if (!data)
            return WndDailyRechargeGift_1.BoxState.Normal;
        if (!data.is_ava) //未达成
         {
            return WndDailyRechargeGift_1.BoxState.Normal;
        }
        else if (data.is_ava && !data.status && !is_todayData) //达成且未领取
         {
            return WndDailyRechargeGift_1.BoxState.RealAchieved;
        }
        else if (data.is_ava && !data.status && is_todayData) //达成且未领取
         {
            return WndDailyRechargeGift_1.BoxState.TodayAchieved;
        }
        else if (data.is_ava && data.status) //达成且已领取
         {
            return WndDailyRechargeGift_1.BoxState.AlreadyGot;
        }
    };
    __decorate([
        property([cc.Sprite])
    ], AwardBoxItem.prototype, "awardStateSprite", void 0);
    __decorate([
        property(cc.Node)
    ], AwardBoxItem.prototype, "shinyNode", void 0);
    __decorate([
        property(cc.Label)
    ], AwardBoxItem.prototype, "rateLabel", void 0);
    AwardBoxItem = __decorate([
        ccclass
    ], AwardBoxItem);
    return AwardBoxItem;
}(cc.Component));
exports.default = AwardBoxItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxBY3Rpdml0eVxcRGFpbHlSZWNoYXJnZVxcQXdhcmRCb3hJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBc0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUV0RCwrREFBa0Q7QUFHNUMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFpSEM7UUE5R0csc0JBQWdCLEdBQWdCLEVBQUUsQ0FBQTtRQUdsQyxlQUFTLEdBQVksSUFBSSxDQUFBO1FBRXpCLGVBQVMsR0FBYSxJQUFJLENBQUE7UUFDMUIsVUFBSSxHQUFRLElBQUksQ0FBQTtRQUVoQixhQUFPLEdBQVksS0FBSyxDQUFBO1FBRXhCLHdCQUFrQixHQUFZLEtBQUssQ0FBQTtRQUVuQyxrQkFBWSxHQUFhLEtBQUssQ0FBQTs7SUFrR2xDLENBQUM7SUFoR0csd0JBQXdCO0lBRXhCOzs7O09BSUc7SUFDSCxtQ0FBWSxHQUFaLFVBQWEsSUFBSSxFQUFFLE9BQU8sRUFBQyxZQUFZLEVBQUMsa0JBQWtCO1FBQ3RELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLCtCQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDakMsT0FBTTtTQUNUO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUE7UUFDaEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFBO1FBRTVDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUMsWUFBWSxDQUFDLENBQUE7UUFDeEQsSUFB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Q0ksTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUNEOzs7O09BSUc7SUFDSCx3Q0FBaUIsR0FBakIsVUFBa0IsSUFBSSxFQUFDLFlBQVk7UUFFL0IsSUFBRyxDQUFDLElBQUk7WUFBRSxPQUFPLCtCQUFRLENBQUMsTUFBTSxDQUFBO1FBQ2hDLElBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUs7U0FDdEI7WUFDSSxPQUFPLCtCQUFRLENBQUMsTUFBTSxDQUFBO1NBQ3pCO2FBQ0ksSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRO1NBQzlEO1lBQ0ksT0FBTywrQkFBUSxDQUFDLFlBQVksQ0FBQTtTQUMvQjthQUNJLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksWUFBWSxFQUFFLFFBQVE7U0FDN0Q7WUFDSSxPQUFPLCtCQUFRLENBQUMsYUFBYSxDQUFBO1NBQ2hDO2FBQ0ksSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUMsUUFBUTtTQUMzQztZQUNJLE9BQU8sK0JBQVEsQ0FBQyxVQUFVLENBQUE7U0FDN0I7SUFFTCxDQUFDO0lBNUdEO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzBEQUNZO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ087SUFFekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDTztJQVJULFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FpSGhDO0lBQUQsbUJBQUM7Q0FqSEQsQUFpSEMsQ0FqSHlDLEVBQUUsQ0FBQyxTQUFTLEdBaUhyRDtrQkFqSG9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBCb3hTdGF0ZSB9IGZyb20gXCIuL0RhaWx5UmVjaGFyZ2VHaWZ0Vmlld1wiO1xyXG5cclxuaW1wb3J0IHsgQm94U3RhdGUgfSBmcm9tIFwiLi9XbmREYWlseVJlY2hhcmdlR2lmdFwiO1xyXG5cclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBd2FyZEJveEl0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlXSlcclxuICAgIGF3YXJkU3RhdGVTcHJpdGU6IGNjLlNwcml0ZVtdID0gW11cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHNoaW55Tm9kZTogY2MuTm9kZSA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHJhdGVMYWJlbDogY2MuTGFiZWwgPSBudWxsXHJcbiAgICBkYXRhOiBhbnkgPSBudWxsXHJcblxyXG4gICAgaXNfZG9uZTogYm9vbGVhbiA9IGZhbHNlXHJcblxyXG4gICAgaXNZZXN0ZXJkYXlBY2hpZXZlOiBib29sZWFuID0gZmFsc2VcclxuXHJcbiAgICBpc190b2RheURhdGEgOiBib29sZWFuID0gZmFsc2VcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGRhdGEg5b2T5YmN5a6d566x5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gaXNfZG9uZSDmmKjml6XlpZblirHmmK/lkKbpooblj5blrozmiJBcclxuICAgICAqL1xyXG4gICAgcmVmcmVzaFN0YXRlKGRhdGEsIGlzX2RvbmUsaXNfdG9kYXlEYXRhLGlzWWVzdGVyZGF5QWNoaWV2ZSkge1xyXG4gICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldEJveFN0YXRlKEJveFN0YXRlLk5vcm1hbClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGFcclxuICAgICAgICB0aGlzLmlzX2RvbmUgPSBpc19kb25lXHJcbiAgICAgICAgdGhpcy5pc190b2RheURhdGEgPSBpc190b2RheURhdGFcclxuICAgICAgICB0aGlzLmlzWWVzdGVyZGF5QWNoaWV2ZSA9IGlzWWVzdGVyZGF5QWNoaWV2ZVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBib3hTdGF0ZSA9IHRoaXMuZ2V0Qm94U3RhdGVCeURhdGEoZGF0YSxpc190b2RheURhdGEpXHJcbiAgICAgICAgdGhpcy5zZXRCb3hTdGF0ZShib3hTdGF0ZSlcclxuICAgIH1cclxuICAgIHJlZnJlc2hSYXRlKGRhdGEpIHtcclxuICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmF0ZUxhYmVsLnN0cmluZyA9IGRhdGEucmF0ZStcIiVcIlxyXG4gICAgfVxyXG4gICAgc2V0Qm94U3RhdGUoc3RhdGU6IEJveFN0YXRlKSB7XHJcbiAgICAgICAgbGV0IGJ0biA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKVxyXG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSBCb3hTdGF0ZS5Ob3JtYWw6XHJcbiAgICAgICAgICAgICAgICBpZiAoYnRuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLmludGVyYWN0YWJsZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF3YXJkU3RhdGVTcHJpdGVbMF0ubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF3YXJkU3RhdGVTcHJpdGVbMV0ubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hd2FyZFN0YXRlU3ByaXRlWzJdLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hpbnlOb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBCb3hTdGF0ZS5Ub2RheUFjaGlldmVkOlxyXG4gICAgICAgICAgICAgICAgaWYgKGJ0bikge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5pbnRlcmFjdGFibGUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF3YXJkU3RhdGVTcHJpdGVbMF0ubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF3YXJkU3RhdGVTcHJpdGVbMV0ubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hd2FyZFN0YXRlU3ByaXRlWzJdLm5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlueU5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJveFN0YXRlLlJlYWxBY2hpZXZlZDpcclxuICAgICAgICAgICAgICAgIGlmIChidG4pIHtcclxuICAgICAgICAgICAgICAgICAgICBidG4uaW50ZXJhY3RhYmxlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hd2FyZFN0YXRlU3ByaXRlWzBdLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuYXdhcmRTdGF0ZVNwcml0ZVsxXS5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF3YXJkU3RhdGVTcHJpdGVbMl0ubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlueU5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQm94U3RhdGUuQWxyZWFkeUdvdDpcclxuICAgICAgICAgICAgICAgIGlmIChidG4pIHtcclxuICAgICAgICAgICAgICAgICAgICBidG4uaW50ZXJhY3RhYmxlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYXdhcmRTdGF0ZVNwcml0ZVswXS5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF3YXJkU3RhdGVTcHJpdGVbMV0ubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmF3YXJkU3RhdGVTcHJpdGVbMl0ubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlueU5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBkYXRhIOW9k+WJjeWuneeuseaVsOaNrlxyXG4gICAgICogQHBhcmFtIGlzX3RvZGF5RGF0YSDmmKjml6XlpZblirHmmK/lkKbpooblj5blrozmiJBcclxuICAgICAqL1xyXG4gICAgZ2V0Qm94U3RhdGVCeURhdGEoZGF0YSxpc190b2RheURhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIWRhdGEpIHJldHVybiBCb3hTdGF0ZS5Ob3JtYWxcclxuICAgICAgICBpZighZGF0YS5pc19hdmEpIC8v5pyq6L6+5oiQXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gQm94U3RhdGUuTm9ybWFsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZGF0YS5pc19hdmEgJiYgIWRhdGEuc3RhdHVzICYmICFpc190b2RheURhdGEpIC8v6L6+5oiQ5LiU5pyq6aKG5Y+WXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gQm94U3RhdGUuUmVhbEFjaGlldmVkXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZGF0YS5pc19hdmEgJiYgIWRhdGEuc3RhdHVzICYmIGlzX3RvZGF5RGF0YSkgLy/ovr7miJDkuJTmnKrpooblj5ZcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBCb3hTdGF0ZS5Ub2RheUFjaGlldmVkXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZGF0YS5pc19hdmEgJiYgZGF0YS5zdGF0dXMpLy/ovr7miJDkuJTlt7Lpooblj5ZcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBCb3hTdGF0ZS5BbHJlYWR5R290XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuIl19