"use strict";
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