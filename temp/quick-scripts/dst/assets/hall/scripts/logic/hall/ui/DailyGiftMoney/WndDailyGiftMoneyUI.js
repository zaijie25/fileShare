
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/DailyGiftMoney/WndDailyGiftMoneyUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '53d12UHMehKn7vg2VvO7wPf', 'WndDailyGiftMoneyUI');
// hall/scripts/logic/hall/ui/DailyGiftMoney/WndDailyGiftMoneyUI.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var HallModel_1 = require("../../../hallcommon/model/HallModel");
var HallPopMsgHelper_1 = require("../../tool/HallPopMsgHelper");
var ActivityConstants_1 = require("../Activity/ActivityConstants");
var WndDailyGiftMoneyUI = /** @class */ (function (_super) {
    __extends(WndDailyGiftMoneyUI, _super);
    function WndDailyGiftMoneyUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**可领取 */
        _this.selectedNode = [];
        /**已经领取 */
        _this.noSelectedNode = [];
        /**未达成条件*/
        _this.unacommpolishedNode = [];
        _this.daily_cfg = null;
        /**日可领取 */
        _this.yesterdayBetBool = false;
        /**周可领取 */
        _this.weekBetBool = false;
        /**月可领取 */
        _this.monthBetBool = false;
        return _this;
    }
    WndDailyGiftMoneyUI.prototype.onInit = function () {
        this.isNeedDelay = true;
        this.name = "WndDailyGiftMoneyUI";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/DailyGiftMoney/DailyGiftMoneyUI";
    };
    WndDailyGiftMoneyUI.prototype.initView = function () {
        this.selectedNode = [];
        this.noSelectedNode = [];
        this.unacommpolishedNode = [];
        this.dayLabel = this.getComponent("item1/jibiLabel", cc.Label);
        this.weekLabel = this.getComponent("item2/jibiLabel", cc.Label);
        this.monthLabel = this.getComponent("item3/jibiLabel", cc.Label);
        this.addCommonClick("button", this.giftMoneyList, this);
        this.addCommonClick('close', this.close, this);
        for (var i = 1; i < 4; i++) {
            var item = this.getChild("item" + i);
            var selected = cc.find("button/btn_lqjl1", item);
            var noSelected = cc.find("button/btn_lqjl3", item);
            var unacommpolished = cc.find("button/btn_lqjl2", item);
            if (i == 1) {
                Global.UIHelper.addCommonClick(item, "button/btn_lqjl1", this.onGetdaily, this);
            }
            else if (i == 2) {
                Global.UIHelper.addCommonClick(item, "button/btn_lqjl1", this.onGetweekly, this);
            }
            else if (i == 3) {
                Global.UIHelper.addCommonClick(item, "button/btn_lqjl1", this.onGetmonthly, this);
            }
            this.selectedNode.push(selected);
            this.noSelectedNode.push(noSelected);
            this.unacommpolishedNode.push(unacommpolished);
            noSelected.active = false;
            selected.active = false;
            unacommpolished.active = false;
        }
        this.dayLabel.string = "0.00";
        this.weekLabel.string = "0.00";
        this.monthLabel.string = "0.00";
    };
    WndDailyGiftMoneyUI.prototype.onOpen = function () {
        var _this = this;
        this.OnDataPrepared();
        Global.HallServer.send(NetAppface.mod, NetAppface.GetDailyGiftMoneyCfg, null, function (data) {
            _this.daily_cfg = data;
            var daily = data.daily_cfg;
            var weekly = data.weekly_cfg;
            var monthly = data.monthly_cfg;
            if (!daily || !weekly || !monthly)
                return;
            _this.dayLabel.string = Global.Toolkit.GetMoneyFormat(data.daily_point);
            _this.weekLabel.string = Global.Toolkit.GetMoneyFormat(data.weekly_point);
            _this.monthLabel.string = Global.Toolkit.GetMoneyFormat(data.monthly_point);
            if (data.daily_point == 0) {
                _this.selectedNode[0].active = false;
                _this.noSelectedNode[0].active = false;
                _this.unacommpolishedNode[0].active = true;
                _this.yesterdayBetBool = false;
            }
            else {
                if (data.daily) {
                    _this.selectedNode[0].active = true;
                    _this.noSelectedNode[0].active = false;
                    _this.unacommpolishedNode[0].active = false;
                    _this.yesterdayBetBool = true;
                }
                else {
                    _this.selectedNode[0].active = false;
                    _this.noSelectedNode[0].active = true;
                    _this.unacommpolishedNode[0].active = false;
                    _this.yesterdayBetBool = false;
                }
            }
            if (data.weekly_point == 0) {
                _this.selectedNode[1].active = false;
                _this.noSelectedNode[1].active = false;
                _this.unacommpolishedNode[1].active = true;
                _this.weekBetBool = false;
            }
            else {
                if (data.weekly) {
                    _this.selectedNode[1].active = true;
                    _this.noSelectedNode[1].active = false;
                    _this.unacommpolishedNode[1].active = false;
                    _this.weekBetBool = true;
                }
                else {
                    _this.selectedNode[1].active = false;
                    _this.noSelectedNode[1].active = true;
                    _this.unacommpolishedNode[1].active = false;
                    _this.weekBetBool = false;
                }
            }
            if (data.monthly_point == 0) {
                _this.selectedNode[2].active = false;
                _this.noSelectedNode[2].active = false;
                _this.unacommpolishedNode[2].active = true;
                _this.monthBetBool = false;
            }
            else {
                if (data.monthly) {
                    _this.selectedNode[2].active = true;
                    _this.noSelectedNode[2].active = false;
                    _this.unacommpolishedNode[2].active = false;
                    _this.monthBetBool = true;
                }
                else {
                    _this.selectedNode[2].active = false;
                    _this.noSelectedNode[2].active = true;
                    _this.unacommpolishedNode[2].active = false;
                    _this.monthBetBool = false;
                }
            }
        }, function (error) {
            Global.UI.fastTip(error._errstr);
            // console.log(error);
        }, false, 60);
    };
    WndDailyGiftMoneyUI.prototype.onDispose = function () {
        // this.CashBackModel.off(CashBackEvent.GetActivityCfg, this, this.DescriptionDay);
        // this.CashBackModel.off(CashBackEvent.GetDayFlowBackAll, this, this.GetAwardResq);
    };
    WndDailyGiftMoneyUI.prototype.giftMoneyList = function () {
        Global.UI.show("WndGiftMoneyListUI", this.daily_cfg);
    };
    WndDailyGiftMoneyUI.prototype.onGetdaily = function () {
        this.onGetMoney(1);
    };
    WndDailyGiftMoneyUI.prototype.onGetweekly = function () {
        this.onGetMoney(2);
    };
    WndDailyGiftMoneyUI.prototype.onGetmonthly = function () {
        this.onGetMoney(3);
    };
    WndDailyGiftMoneyUI.prototype.onGetMoney = function (num) {
        var _this = this;
        var param = {
            "gift_money_type": num
        };
        Global.HallServer.send(NetAppface.mod, NetAppface.DoDailyGiftMoney, param, function (data) {
            Global.UI.show("WndRebateGet", data.point);
            Global.HallServer.clearCache(NetAppface.mod, NetAppface.GetDailyGiftMoneyCfg, null);
            _this.onOpen();
        }, function (error) {
            Global.UI.fastTip(error._errstr);
            // console.log(error);
        });
    };
    WndDailyGiftMoneyUI.prototype.onClose = function () {
        if (this.yesterdayBetBool || this.weekBetBool || this.monthBetBool) {
            Global.Event.event(GlobalEvent.ShowRedSpot, [true, HallModel_1.HallRedSpotType.DailyGift]);
        }
        else {
            Global.Event.event(GlobalEvent.CloseRedSpot, HallModel_1.HallRedSpotType.DailyGift);
        }
        HallPopMsgHelper_1.default.Instance.releaseLock(ActivityConstants_1.ActivityType.dailyGift);
    };
    return WndDailyGiftMoneyUI;
}(WndBase_1.default));
exports.default = WndDailyGiftMoneyUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxEYWlseUdpZnRNb25leVxcV25kRGFpbHlHaWZ0TW9uZXlVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBK0M7QUFDL0MsaUVBQXNFO0FBQ3RFLGdFQUEyRDtBQUMzRCxtRUFBNkQ7QUFFN0Q7SUFBaUQsdUNBQU87SUFBeEQ7UUFBQSxxRUEwS0M7UUF0S0csU0FBUztRQUNELGtCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQzFCLFVBQVU7UUFDRixvQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUM1QixVQUFVO1FBQ0YseUJBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLGVBQVMsR0FBRyxJQUFJLENBQUM7UUFPekIsVUFBVTtRQUNWLHNCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN6QixVQUFVO1FBQ1YsaUJBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsVUFBVTtRQUNWLGtCQUFZLEdBQUcsS0FBSyxDQUFDOztJQW9KekIsQ0FBQztJQS9KYSxvQ0FBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcscUJBQXFCLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLGlEQUFpRCxDQUFDO0lBQ3JFLENBQUM7SUFRUyxzQ0FBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxL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QyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqQyxzQkFBc0I7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQscUNBQU8sR0FBUDtRQUNJLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNoRSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxFQUFFLDJCQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtTQUNqRjthQUFJO1lBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSwyQkFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzNFO1FBQ0QsMEJBQWdCLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxnQ0FBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFDTCwwQkFBQztBQUFELENBMUtBLEFBMEtDLENBMUtnRCxpQkFBTyxHQTBLdkQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV25kQmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9XbmRCYXNlXCI7XHJcbmltcG9ydCB7IEhhbGxSZWRTcG90VHlwZSB9IGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL0hhbGxNb2RlbFwiO1xyXG5pbXBvcnQgSGFsbFBvcE1zZ0hlbHBlciBmcm9tIFwiLi4vLi4vdG9vbC9IYWxsUG9wTXNnSGVscGVyXCI7XHJcbmltcG9ydCB7IEFjdGl2aXR5VHlwZSB9IGZyb20gXCIuLi9BY3Rpdml0eS9BY3Rpdml0eUNvbnN0YW50c1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV25kRGFpbHlHaWZ0TW9uZXlVSSBleHRlbmRzIFduZEJhc2Uge1xyXG4gICAgcHJpdmF0ZSBkYXlMYWJlbDogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIHdlZWtMYWJlbDogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIG1vbnRoTGFiZWw6IGNjLkxhYmVsO1xyXG4gICAgLyoq5Y+v6aKG5Y+WICovXHJcbiAgICBwcml2YXRlIHNlbGVjdGVkTm9kZSA9IFtdO1xyXG4gICAgLyoq5bey57uP6aKG5Y+WICovXHJcbiAgICBwcml2YXRlIG5vU2VsZWN0ZWROb2RlID0gW107XHJcbiAgICAvKirmnKrovr7miJDmnaHku7YqL1xyXG4gICAgcHJpdmF0ZSB1bmFjb21tcG9saXNoZWROb2RlID0gW107XHJcbiAgICBwcml2YXRlIGRhaWx5X2NmZyA9IG51bGw7XHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuaXNOZWVkRGVsYXkgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmREYWlseUdpZnRNb25leVVJXCI7XHJcbiAgICAgICAgdGhpcy5sYXllciA9IEdsb2JhbC5VSS5Qb3BMYXllcjtcclxuICAgICAgICB0aGlzLnJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS9EYWlseUdpZnRNb25leS9EYWlseUdpZnRNb25leVVJXCI7XHJcbiAgICB9XHJcbiAgICAvKirml6Xlj6/pooblj5YgKi9cclxuICAgIHllc3RlcmRheUJldEJvb2wgPSBmYWxzZTtcclxuICAgIC8qKuWRqOWPr+mihuWPliAqL1xyXG4gICAgd2Vla0JldEJvb2wgPSBmYWxzZTtcclxuICAgIC8qKuaciOWPr+mihuWPliAqL1xyXG4gICAgbW9udGhCZXRCb29sID0gZmFsc2U7XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWROb2RlID0gW107XHJcbiAgICAgICAgdGhpcy5ub1NlbGVjdGVkTm9kZSA9IFtdO1xyXG4gICAgICAgIHRoaXMudW5hY29tbXBvbGlzaGVkTm9kZSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGF5TGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcIml0ZW0xL2ppYmlMYWJlbFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy53ZWVrTGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcIml0ZW0yL2ppYmlMYWJlbFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5tb250aExhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJpdGVtMy9qaWJpTGFiZWxcIiwgY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJidXR0b25cIiwgdGhpcy5naWZ0TW9uZXlMaXN0LCB0aGlzKVxyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soJ2Nsb3NlJywgdGhpcy5jbG9zZSwgdGhpcylcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuZ2V0Q2hpbGQoXCJpdGVtXCIgKyBpKVxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSBjYy5maW5kKFwiYnV0dG9uL2J0bl9scWpsMVwiLCBpdGVtKVxyXG4gICAgICAgICAgICBsZXQgbm9TZWxlY3RlZCA9IGNjLmZpbmQoXCJidXR0b24vYnRuX2xxamwzXCIsIGl0ZW0pXHJcbiAgICAgICAgICAgIGxldCB1bmFjb21tcG9saXNoZWQgPSBjYy5maW5kKFwiYnV0dG9uL2J0bl9scWpsMlwiLCBpdGVtKVxyXG4gICAgICAgICAgICBpZiAoaSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2soaXRlbSwgXCJidXR0b24vYnRuX2xxamwxXCIsIHRoaXMub25HZXRkYWlseSwgdGhpcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2soaXRlbSwgXCJidXR0b24vYnRuX2xxamwxXCIsIHRoaXMub25HZXR3ZWVrbHksIHRoaXMpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKGl0ZW0sIFwiYnV0dG9uL2J0bl9scWpsMVwiLCB0aGlzLm9uR2V0bW9udGhseSwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE5vZGUucHVzaChzZWxlY3RlZCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9TZWxlY3RlZE5vZGUucHVzaChub1NlbGVjdGVkKVxyXG4gICAgICAgICAgICB0aGlzLnVuYWNvbW1wb2xpc2hlZE5vZGUucHVzaCh1bmFjb21tcG9saXNoZWQpXHJcbiAgICAgICAgICAgIG5vU2VsZWN0ZWQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB1bmFjb21tcG9saXNoZWQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGF5TGFiZWwuc3RyaW5nID0gXCIwLjAwXCJcclxuICAgICAgICB0aGlzLndlZWtMYWJlbC5zdHJpbmcgPSBcIjAuMDBcIlxyXG4gICAgICAgIHRoaXMubW9udGhMYWJlbC5zdHJpbmcgPSBcIjAuMDBcIlxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uT3BlbigpIHtcclxuICAgICAgICB0aGlzLk9uRGF0YVByZXBhcmVkKCk7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXREYWlseUdpZnRNb25leUNmZywgbnVsbCwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kYWlseV9jZmcgPSBkYXRhO1xyXG4gICAgICAgICAgICBsZXQgZGFpbHkgPSBkYXRhLmRhaWx5X2NmZ1xyXG4gICAgICAgICAgICBsZXQgd2Vla2x5ID0gZGF0YS53ZWVrbHlfY2ZnXHJcbiAgICAgICAgICAgIGxldCBtb250aGx5ID0gZGF0YS5tb250aGx5X2NmZ1xyXG4gICAgICAgICAgICBpZiAoIWRhaWx5IHx8ICF3ZWVrbHkgfHwgIW1vbnRobHkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuZGF5TGFiZWwuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuR2V0TW9uZXlGb3JtYXQoZGF0YS5kYWlseV9wb2ludCk7XHJcbiAgICAgICAgICAgIHRoaXMud2Vla0xhYmVsLnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LkdldE1vbmV5Rm9ybWF0KGRhdGEud2Vla2x5X3BvaW50KVxyXG4gICAgICAgICAgICB0aGlzLm1vbnRoTGFiZWwuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuR2V0TW9uZXlGb3JtYXQoZGF0YS5tb250aGx5X3BvaW50KVxyXG4gICAgICAgICAgICBpZiAoZGF0YS5kYWlseV9wb2ludCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkTm9kZVswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9TZWxlY3RlZE5vZGVbMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuYWNvbW1wb2xpc2hlZE5vZGVbMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMueWVzdGVyZGF5QmV0Qm9vbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZGFpbHkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkTm9kZVswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9TZWxlY3RlZE5vZGVbMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bmFjb21tcG9saXNoZWROb2RlWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueWVzdGVyZGF5QmV0Qm9vbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWROb2RlWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9TZWxlY3RlZE5vZGVbMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuYWNvbW1wb2xpc2hlZE5vZGVbMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55ZXN0ZXJkYXlCZXRCb29sID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRhdGEud2Vla2x5X3BvaW50ID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWROb2RlWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub1NlbGVjdGVkTm9kZVsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5hY29tbXBvbGlzaGVkTm9kZVsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWVrQmV0Qm9vbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEud2Vla2x5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE5vZGVbMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vU2VsZWN0ZWROb2RlWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5hY29tbXBvbGlzaGVkTm9kZVsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndlZWtCZXRCb29sID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE5vZGVbMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub1NlbGVjdGVkTm9kZVsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5hY29tbXBvbGlzaGVkTm9kZVsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndlZWtCZXRCb29sID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRhdGEubW9udGhseV9wb2ludCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkTm9kZVsyXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9TZWxlY3RlZE5vZGVbMl0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuYWNvbW1wb2xpc2hlZE5vZGVbMl0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9udGhCZXRCb29sID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5tb250aGx5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE5vZGVbMl0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vU2VsZWN0ZWROb2RlWzJdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5hY29tbXBvbGlzaGVkTm9kZVsyXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnRoQmV0Qm9vbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWROb2RlWzJdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9TZWxlY3RlZE5vZGVbMl0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuYWNvbW1wb2xpc2hlZE5vZGVbMl0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb250aEJldEJvb2wgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChlcnJvci5fZXJyc3RyKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIH0sIGZhbHNlLCA2MCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNwb3NlKCkge1xyXG4gICAgICAgIC8vIHRoaXMuQ2FzaEJhY2tNb2RlbC5vZmYoQ2FzaEJhY2tFdmVudC5HZXRBY3Rpdml0eUNmZywgdGhpcywgdGhpcy5EZXNjcmlwdGlvbkRheSk7XHJcbiAgICAgICAgLy8gdGhpcy5DYXNoQmFja01vZGVsLm9mZihDYXNoQmFja0V2ZW50LkdldERheUZsb3dCYWNrQWxsLCB0aGlzLCB0aGlzLkdldEF3YXJkUmVzcSk7XHJcbiAgICB9XHJcbiAgICBnaWZ0TW9uZXlMaXN0KCkge1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kR2lmdE1vbmV5TGlzdFVJXCIsIHRoaXMuZGFpbHlfY2ZnKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25HZXRkYWlseSgpIHtcclxuICAgICAgICB0aGlzLm9uR2V0TW9uZXkoMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkdldHdlZWtseSgpIHtcclxuICAgICAgICB0aGlzLm9uR2V0TW9uZXkoMik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkdldG1vbnRobHkoKSB7XHJcbiAgICAgICAgdGhpcy5vbkdldE1vbmV5KDMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25HZXRNb25leShudW0pIHtcclxuICAgICAgICBsZXQgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIFwiZ2lmdF9tb25leV90eXBlXCI6IG51bVxyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkRvRGFpbHlHaWZ0TW9uZXksIHBhcmFtLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZFJlYmF0ZUdldFwiLCBkYXRhLnBvaW50KTtcclxuICAgICAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuY2xlYXJDYWNoZShOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXREYWlseUdpZnRNb25leUNmZywgbnVsbClcclxuICAgICAgICAgICAgdGhpcy5vbk9wZW4oKVxyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChlcnJvci5fZXJyc3RyKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xvc2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMueWVzdGVyZGF5QmV0Qm9vbCB8fCB0aGlzLndlZWtCZXRCb29sIHx8IHRoaXMubW9udGhCZXRCb29sKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5TaG93UmVkU3BvdCwgW3RydWUsIEhhbGxSZWRTcG90VHlwZS5EYWlseUdpZnRdKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuQ2xvc2VSZWRTcG90LCBIYWxsUmVkU3BvdFR5cGUuRGFpbHlHaWZ0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgSGFsbFBvcE1zZ0hlbHBlci5JbnN0YW5jZS5yZWxlYXNlTG9jayhBY3Rpdml0eVR5cGUuZGFpbHlHaWZ0KTtcclxuICAgIH1cclxufSBcclxuIl19