"use strict";
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