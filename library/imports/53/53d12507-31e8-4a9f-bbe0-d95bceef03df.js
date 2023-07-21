"use strict";
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