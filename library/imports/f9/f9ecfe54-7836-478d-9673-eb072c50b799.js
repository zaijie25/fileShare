"use strict";
cc._RF.push(module, 'f9ecf5UeDZHjZZz6wcsULeZ', 'WndDailyRechargeGift');
// hall/scripts/logic/hall/ui/Activity/DailyRecharge/WndDailyRechargeGift.ts

"use strict";
// import ViewBase from "../../../../core/ui/ViewBase";
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
exports.BoxState = void 0;
var RechargeGiftModel_1 = require("../../../../hallcommon/model/RechargeGiftModel");
var ActivityConstants_1 = require("../ActivityConstants");
var AwardBoxItem_1 = require("./AwardBoxItem");
var WndBase_1 = require("../../../../core/ui/WndBase");
var HallPopMsgHelper_1 = require("../../../tool/HallPopMsgHelper");
var WndDailyRechargeGift = /** @class */ (function (_super) {
    __extends(WndDailyRechargeGift, _super);
    function WndDailyRechargeGift() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.awardBtnArr = [];
        _this.damaArr = [];
        _this.clickNode = null;
        return _this;
    }
    WndDailyRechargeGift.prototype.onInit = function () {
        this.name = "WndDailyRechargeGift";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/DailyRechargeGift/dailyRechargeGift";
    };
    WndDailyRechargeGift.prototype.initView = function () {
        this.model = Global.ModelManager.getModel("RechargeGiftModel");
        this.addCommonClick("button", this.onJoinButtonClicked, this);
        this.addCommonClick("close", this.close, this);
        this.progress = this.getComponent("progressBar", cc.ProgressBar);
        this.winProgress = this.getComponent("WinProgress/WinProgressLabel", cc.Label);
        this.rateLabe = this.getComponent("rateLabe", cc.Label);
        this.progress.progress = 0;
        this.awardPanel = this.getChild("AwarPanel");
        for (var index = 0; index < 3; index++) {
            this.awardBtnArr[index] = Global.UIHelper.addCommonClick(this.awardPanel, cc.js.formatStr("Award_%s", index), this.onAwardBtnClicked, this);
            this.damaArr[index] = this.getComponent("AwarPanel/" + cc.js.formatStr("damaLabe_%s", index), cc.Label);
        }
        this.model.on(RechargeGiftModel_1.default.GetAward, this, this.onGetAward);
        this.model.on(RechargeGiftModel_1.default.GetCfg, this, this.onGetConfig);
    };
    WndDailyRechargeGift.prototype.onAwardBtnClicked = function (target) {
        var node = target.node;
        this.clickNode = node;
        if (node && node.isValid) {
            var awardItem = node.getComponent(AwardBoxItem_1.default);
            if (awardItem.data && awardItem.is_todayData && awardItem.isYesterdayAchieve) {
                Global.UI.fastTip("已领取今日全部奖励，请明天再来！");
                return;
            }
            if (awardItem.data && awardItem.is_todayData && !awardItem.isYesterdayAchieve) {
                Global.UI.fastTip("未完成任务，请明日完成任意充值后再领取！");
                return;
            }
            if (awardItem.data && awardItem.data.is_ava && !awardItem.data.status && !awardItem.is_done) {
                this.model.reqReceiveActivityAward(ActivityConstants_1.ActivityType.dailyRechargeGift, awardItem.data.key);
            }
        }
    };
    WndDailyRechargeGift.prototype.onJoinButtonClicked = function () {
        Global.UI.show("WndRecharge");
    };
    WndDailyRechargeGift.prototype.close = function () {
        Global.UI.close(this.name);
    };
    WndDailyRechargeGift.prototype.onOpen = function () {
        this.model.reqGetActivityCfg(false);
    };
    WndDailyRechargeGift.prototype.onGetAward = function (awardData) {
        if (awardData && awardData.atype != ActivityConstants_1.ActivityType.dailyRechargeGift) {
            return;
        }
        Global.UI.show("WndRebateGet", awardData.award);
        if (this.clickNode && this.clickNode.isValid) {
            var awardItem = this.clickNode.getComponent(AwardBoxItem_1.default);
            if (awardItem) {
                awardItem.setBoxState(BoxState.AlreadyGot);
            }
        }
    };
    WndDailyRechargeGift.prototype.onClose = function () {
        this.clickNode = null;
        HallPopMsgHelper_1.default.Instance.releaseLock(ActivityConstants_1.ActivityType.dailyRechargeGift);
    };
    WndDailyRechargeGift.prototype.onGetConfig = function (data) {
        if (data == null)
            return;
        Global.Event.event(ActivityConstants_1.ActivityConstants.SHOW_ACT_WAITTING, false);
        var arr = data.data;
        for (var index = 0; index < arr.length; index++) {
            var cfg = arr[index];
            if (cfg && cfg.atype == ActivityConstants_1.ActivityType.dailyRechargeGift) {
                var actData = cfg.cfg;
                this.refreshPanel(actData);
                break;
            }
        }
    };
    /**
     * 1.昨日未参与，显示今天数据
     * 2.昨日参与，未完成任何一项，今日参与（充值)，显示今天数据
     * 3.昨日参与，未完成任何一项，今日未参与（充值)，显示昨天数据
     * 4.昨日参与，已完成的项全部领取完成，显示今天数据
     * 5.昨日参与，有完成且未领取的项，显示昨天数据
     * 6.昨日今日均未参与，显示默认数据
     *
     */
    WndDailyRechargeGift.prototype.refreshPanel = function (actData) {
        if (actData == null)
            return;
        this.setAwardBoxRate(actData.cfg);
        if (actData.yes_list && actData.yes_list.list == null) //1 6
         {
            var total = actData.today_list.total || 0;
            var dama = actData.today_list.dama || 0;
            this.progress.progress = 0;
            if (total) {
                this.progress.progress = dama / total;
            }
            this.setAwardBoxState(actData.today_list, false, true, false);
            this.setProgress(actData.today_list);
            this.setWinProgressRichText(actData.today_list.dama, actData.today_list.total);
            return;
        }
        var isYesterdayAchieve = this.getIsYesterdayAchieve(actData);
        var isYesterdayDone = this.getIsYesterdayDone(actData);
        var isTodayRecharge = actData.today_list && actData.today_list.pay > 0;
        if (isYesterdayAchieve) // 5 4
         {
            var achieveList = isYesterdayDone ? actData.today_list : actData.yes_list;
            var total = achieveList.total;
            var dama = achieveList.dama;
            this.progress.progress = 0;
            if (total) {
                this.progress.progress = (dama / total);
            }
            this.setAwardBoxState(achieveList, isYesterdayDone, isYesterdayDone, isYesterdayAchieve);
            this.setProgress(achieveList);
            this.setWinProgressRichText(dama, total);
            return;
        }
        if (!isYesterdayAchieve) //2 3
         {
            var achieveList = isTodayRecharge ? actData.today_list : actData.yes_list;
            var total = achieveList.total;
            var dama = achieveList.dama;
            this.progress.progress = 0;
            if (total) {
                this.progress.progress = (dama / total);
            }
            this.setAwardBoxState(achieveList, isYesterdayDone, isTodayRecharge, isYesterdayAchieve);
            this.setProgress(achieveList);
            this.setWinProgressRichText(dama, total);
            return;
        }
    };
    /**
     * 设置进度条
     * @param actData
     */
    WndDailyRechargeGift.prototype.setProgress = function (data) {
        if (data == null || data.list == null) {
            return;
        }
        for (var index = 0; index < data.list.length; index++) {
            var is_ava = data.list[index].is_ava;
            if (index == 1 && is_ava) {
                this.progress.progress = 0.5;
            }
            if (index == 2 && is_ava) {
                this.progress.progress = 1;
            }
        }
    };
    /**
     * 检查昨日是否有达成任意一项奖励
     * @param actData
     */
    WndDailyRechargeGift.prototype.getIsYesterdayAchieve = function (actData) {
        var yesterdayData = actData.yes_list;
        if (!yesterdayData || !yesterdayData.list) {
            return false;
        }
        for (var index = 0; index < yesterdayData.list.length; index++) {
            if (yesterdayData.list[index].is_ava) {
                return true;
            }
        }
        return false;
    };
    /**
     * 检查是否昨日奖励已全部领取完毕
     * @param actData
     */
    WndDailyRechargeGift.prototype.getIsYesterdayDone = function (actData) {
        var yesterdayData = actData.yes_list;
        if (!yesterdayData || !yesterdayData.list) {
            return false;
        }
        //data.is_ava && !data.status
        for (var index = 0; index < yesterdayData.list.length; index++) {
            if (yesterdayData.list[index].is_ava && !yesterdayData.list[index].status) {
                return false;
            }
        }
        return true;
    };
    WndDailyRechargeGift.prototype.setAwardBoxState = function (data, is_done, isTodayData, isYesterdayAchieve) {
        if (data == null || data.list == null) {
            for (var index = 0; index < this.awardBtnArr.length; index++) {
                var node = this.awardBtnArr[index];
                if (node && node.isValid) {
                    node.getComponent(AwardBoxItem_1.default).refreshState(null, false, isTodayData, isYesterdayAchieve);
                }
            }
            return;
        }
        for (var index = 0; index < data.list.length; index++) {
            var node = this.awardBtnArr[index];
            if (node && node.isValid) {
                node.getComponent(AwardBoxItem_1.default).refreshState(data.list[index], is_done, isTodayData, isYesterdayAchieve);
            }
        }
    };
    WndDailyRechargeGift.prototype.setAwardBoxRate = function (data) {
        if (data == null || data.list == null) {
            return;
        }
        var rateLabeText = cc.js.formatStr("%s+%s=%s", data.list[0].rate * 10, data.list[1].rate * 10, (data.list[0].rate + data.list[1].rate) * 10);
        this.rateLabe.string = "当日打码量和返利金额均为累计计算，比如玩家打到第2档时实际可获得" + rateLabeText + "元奖励。次日充值任意金额，即可领取对应返利金额。";
        for (var index = 0; index < data.list.length; index++) {
            var ratedata = data.list[index];
            var text = "%s.玩家当日打码量(1000+%s)*%s=%s时,即可获得%s%首充返利奖励%s元";
            var dama = (1000 + ratedata.dama_rate * 10) * ratedata.dama_multi;
            var msgStr = cc.js.formatStr(text, ratedata.key, ratedata.dama_rate * 10, ratedata.dama_multi, dama, ratedata.rate, ratedata.rate * 10);
            var damaLabel = this.damaArr[index];
            damaLabel.string = msgStr;
            var node = this.awardBtnArr[index];
            if (node && node.isValid) {
                node.getComponent(AwardBoxItem_1.default).refreshRate(ratedata);
            }
        }
    };
    WndDailyRechargeGift.prototype.setWinProgressRichText = function (charge, total) {
        // ["#F2D060","#F2D060",20,22]
        var str = cc.js.formatStr("<color=%s><size=%s>%s/</c><color=%s><size=%s>%s</color>", Global.Setting.SkinConfig.dailyRechargeFontColorAndSize[0], Global.Setting.SkinConfig.dailyRechargeFontColorAndSize[2], Global.Toolkit.formatPointStr(charge), Global.Setting.SkinConfig.dailyRechargeFontColorAndSize[1], Global.Setting.SkinConfig.dailyRechargeFontColorAndSize[3], Global.Toolkit.formatPointStr(total));
        this.winProgress.string = "" + Global.Toolkit.formatPointStr(charge) + "/" + Global.Toolkit.formatPointStr(total);
    };
    WndDailyRechargeGift.prototype.onDispose = function () {
        this.model.off(RechargeGiftModel_1.default.GetAward, this, this.onGetAward);
        this.model.off(RechargeGiftModel_1.default.GetCfg, this, this.onGetConfig);
    };
    return WndDailyRechargeGift;
}(WndBase_1.default));
exports.default = WndDailyRechargeGift;
var BoxState;
(function (BoxState) {
    /**常规 不可点击*/
    BoxState[BoxState["Normal"] = 0] = "Normal";
    /**高亮 可点击*/
    BoxState[BoxState["TodayAchieved"] = 1] = "TodayAchieved";
    /**打开 */
    BoxState[BoxState["AlreadyGot"] = 2] = "AlreadyGot";
    /**达到条件 */
    BoxState[BoxState["RealAchieved"] = 3] = "RealAchieved";
})(BoxState = exports.BoxState || (exports.BoxState = {}));

cc._RF.pop();