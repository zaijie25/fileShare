
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Activity/DailyRecharge/WndDailyRechargeGift.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxBY3Rpdml0eVxcRGFpbHlSZWNoYXJnZVxcV25kRGFpbHlSZWNoYXJnZUdpZnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVEQUF1RDs7Ozs7Ozs7Ozs7Ozs7OztBQUV2RCxvRkFBK0U7QUFDL0UsMERBQXVFO0FBQ3ZFLCtDQUEwQztBQUMxQyx1REFBa0Q7QUFDbEQsbUVBQThEO0FBRzlEO0lBQWtELHdDQUFPO0lBQXpEO1FBQUEscUVBZ1NDO1FBOVJHLGlCQUFXLEdBQWEsRUFBRSxDQUFBO1FBQzFCLGFBQU8sR0FBYyxFQUFFLENBQUE7UUFLdkIsZUFBUyxHQUFZLElBQUksQ0FBQTs7SUF3UjdCLENBQUM7SUF0UmEscUNBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLHNCQUFzQixDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxxREFBcUQsQ0FBQTtJQUN4RSxDQUFDO0lBQ1MsdUNBQVEsR0FBbEI7UUFHSSxJQUFJLENBQUMsS0FBSyxHQUFzQixNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBQyxJQUFJLENBQUMsQ0FBQTtRQUMzRCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxDQUFBO1FBQzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQy9ELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyw4QkFB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SUFDUixtREFBYyxDQUFBO0lBQ2QsVUFBVTtJQUNWLHVEQUFnQixDQUFBO0FBRXBCLENBQUMsRUFYVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQVduQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vLyBpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvdWkvVmlld0Jhc2VcIjtcclxuXHJcbmltcG9ydCBSZWNoYXJnZUdpZnRNb2RlbCBmcm9tIFwiLi4vLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9SZWNoYXJnZUdpZnRNb2RlbFwiO1xyXG5pbXBvcnQgeyBBY3Rpdml0eUNvbnN0YW50cywgQWN0aXZpdHlUeXBlIH0gZnJvbSBcIi4uL0FjdGl2aXR5Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBBd2FyZEJveEl0ZW0gZnJvbSBcIi4vQXdhcmRCb3hJdGVtXCI7XHJcbmltcG9ydCBXbmRCYXNlIGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3VpL1duZEJhc2VcIjtcclxuaW1wb3J0IEhhbGxQb3BNc2dIZWxwZXIgZnJvbSBcIi4uLy4uLy4uL3Rvb2wvSGFsbFBvcE1zZ0hlbHBlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZERhaWx5UmVjaGFyZ2VHaWZ0IGV4dGVuZHMgV25kQmFzZSB7XHJcbiAgICBwcml2YXRlIG1vZGVsOiBSZWNoYXJnZUdpZnRNb2RlbFxyXG4gICAgYXdhcmRCdG5BcnI6Y2MuTm9kZSBbXT0gW11cclxuICAgIGRhbWFBcnI6Y2MuTGFiZWwgW109IFtdXHJcbiAgICByYXRlTGFiZTpjYy5MYWJlbFxyXG4gICAgYXdhcmRQYW5lbDpjYy5Ob2RlXHJcbiAgICBwcm9ncmVzczpjYy5Qcm9ncmVzc0JhclxyXG4gICAgd2luUHJvZ3Jlc3M6Y2MuTGFiZWxcclxuICAgIGNsaWNrTm9kZSA6Y2MuTm9kZSA9IG51bGxcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCl7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmREYWlseVJlY2hhcmdlR2lmdFwiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBHbG9iYWwuVUkuUG9wTGF5ZXI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvRGFpbHlSZWNoYXJnZUdpZnQvZGFpbHlSZWNoYXJnZUdpZnRcIlxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KClcclxuICAgIHtcclxuICAgICAgIFxyXG4gICAgICAgIHRoaXMubW9kZWwgPSA8UmVjaGFyZ2VHaWZ0TW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlJlY2hhcmdlR2lmdE1vZGVsXCIpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJidXR0b25cIix0aGlzLm9uSm9pbkJ1dHRvbkNsaWNrZWQsdGhpcylcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiY2xvc2VcIix0aGlzLmNsb3NlLHRoaXMpXHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcyA9IHRoaXMuZ2V0Q29tcG9uZW50KFwicHJvZ3Jlc3NCYXJcIixjYy5Qcm9ncmVzc0JhcilcclxuICAgICAgICB0aGlzLndpblByb2dyZXNzID0gdGhpcy5nZXRDb21wb25lbnQoXCJXaW5Qcm9ncmVzcy9XaW5Qcm9ncmVzc0xhYmVsXCIsY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5yYXRlTGFiZSA9IHRoaXMuZ2V0Q29tcG9uZW50KFwicmF0ZUxhYmVcIixjYy5MYWJlbClcclxuICAgICAgICB0aGlzLnByb2dyZXNzLnByb2dyZXNzID0gMDtcclxuICAgICAgICB0aGlzLmF3YXJkUGFuZWwgPSB0aGlzLmdldENoaWxkKFwiQXdhclBhbmVsXCIpXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDM7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgIHRoaXMuYXdhcmRCdG5BcnJbaW5kZXhdID0gR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKHRoaXMuYXdhcmRQYW5lbCxjYy5qcy5mb3JtYXRTdHIoXCJBd2FyZF8lc1wiLGluZGV4KSx0aGlzLm9uQXdhcmRCdG5DbGlja2VkLHRoaXMpXHJcbiAgICAgICAgICAgICB0aGlzLmRhbWFBcnJbaW5kZXhdID0gdGhpcy5nZXRDb21wb25lbnQoXCJBd2FyUGFuZWwvXCIrY2MuanMuZm9ybWF0U3RyKFwiZGFtYUxhYmVfJXNcIixpbmRleCksIGNjLkxhYmVsKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vZGVsLm9uKFJlY2hhcmdlR2lmdE1vZGVsLkdldEF3YXJkLCB0aGlzLCB0aGlzLm9uR2V0QXdhcmQpO1xyXG4gICAgICAgIHRoaXMubW9kZWwub24oUmVjaGFyZ2VHaWZ0TW9kZWwuR2V0Q2ZnLCB0aGlzLCB0aGlzLm9uR2V0Q29uZmlnKTtcclxuICAgIH1cclxuICAgIG9uQXdhcmRCdG5DbGlja2VkKHRhcmdldCkge1xyXG4gICAgICAgIGxldCBub2RlID0gdGFyZ2V0Lm5vZGVcclxuICAgICAgICB0aGlzLmNsaWNrTm9kZSA9IG5vZGVcclxuICAgICAgICBpZihub2RlICYmIG5vZGUuaXNWYWxpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBhd2FyZEl0ZW0gPSBub2RlLmdldENvbXBvbmVudChBd2FyZEJveEl0ZW0pXHJcbiAgICAgICAgICAgIGlmKGF3YXJkSXRlbS5kYXRhICYmIGF3YXJkSXRlbS5pc190b2RheURhdGEgJiYgYXdhcmRJdGVtLmlzWWVzdGVyZGF5QWNoaWV2ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLlt7Lpooblj5bku4rml6Xlhajpg6jlpZblirHvvIzor7fmmI7lpKnlho3mnaXvvIFcIilcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGF3YXJkSXRlbS5kYXRhICYmIGF3YXJkSXRlbS5pc190b2RheURhdGEgJiYgIWF3YXJkSXRlbS5pc1llc3RlcmRheUFjaGlldmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5pyq5a6M5oiQ5Lu75Yqh77yM6K+35piO5pel5a6M5oiQ5Lu75oSP5YWF5YC85ZCO5YaN6aKG5Y+W77yBXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiggYXdhcmRJdGVtLmRhdGEgJiYgYXdhcmRJdGVtLmRhdGEuaXNfYXZhICYmICFhd2FyZEl0ZW0uZGF0YS5zdGF0dXMgJiYgIWF3YXJkSXRlbS5pc19kb25lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnJlcVJlY2VpdmVBY3Rpdml0eUF3YXJkKEFjdGl2aXR5VHlwZS5kYWlseVJlY2hhcmdlR2lmdCxhd2FyZEl0ZW0uZGF0YS5rZXkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgb25Kb2luQnV0dG9uQ2xpY2tlZCgpIFxyXG4gICAge1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kUmVjaGFyZ2VcIilcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZSgpe1xyXG4gICAgICAgIEdsb2JhbC5VSS5jbG9zZSh0aGlzLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbk9wZW4oKVxyXG4gICAge1xyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5tb2RlbC5yZXFHZXRBY3Rpdml0eUNmZyhmYWxzZSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uR2V0QXdhcmQoYXdhcmREYXRhKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoYXdhcmREYXRhICYmIGF3YXJkRGF0YS5hdHlwZSAhPSBBY3Rpdml0eVR5cGUuZGFpbHlSZWNoYXJnZUdpZnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRSZWJhdGVHZXRcIiwgYXdhcmREYXRhLmF3YXJkKTtcclxuICAgICAgICBpZih0aGlzLmNsaWNrTm9kZSAmJiB0aGlzLmNsaWNrTm9kZS5pc1ZhbGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGF3YXJkSXRlbSA9IHRoaXMuY2xpY2tOb2RlLmdldENvbXBvbmVudChBd2FyZEJveEl0ZW0pXHJcbiAgICAgICAgICAgIGlmKGF3YXJkSXRlbSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYXdhcmRJdGVtLnNldEJveFN0YXRlKEJveFN0YXRlLkFscmVhZHlHb3QpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2xpY2tOb2RlID0gbnVsbFxyXG4gICAgICAgIEhhbGxQb3BNc2dIZWxwZXIuSW5zdGFuY2UucmVsZWFzZUxvY2soQWN0aXZpdHlUeXBlLmRhaWx5UmVjaGFyZ2VHaWZ0KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25HZXRDb25maWcoZGF0YSlcclxuICAgIHtcclxuICAgICAgICBpZihkYXRhID09IG51bGwpIHJldHVyblxyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChBY3Rpdml0eUNvbnN0YW50cy5TSE9XX0FDVF9XQUlUVElORywgZmFsc2UpXHJcbiAgICAgICAgbGV0IGFyciA9IGRhdGEuZGF0YVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjZmcgPSBhcnJbaW5kZXhdO1xyXG4gICAgICAgICAgICBpZihjZmcgJiYgY2ZnLmF0eXBlID09IEFjdGl2aXR5VHlwZS5kYWlseVJlY2hhcmdlR2lmdCApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBhY3REYXRhID0gY2ZnLmNmZ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoUGFuZWwoYWN0RGF0YSlcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiAxLuaYqOaXpeacquWPguS4ju+8jOaYvuekuuS7iuWkqeaVsOaNrlxyXG4gICAgICogMi7mmKjml6Xlj4LkuI7vvIzmnKrlrozmiJDku7vkvZXkuIDpobnvvIzku4rml6Xlj4LkuI7vvIjlhYXlgLwp77yM5pi+56S65LuK5aSp5pWw5o2uXHJcbiAgICAgKiAzLuaYqOaXpeWPguS4ju+8jOacquWujOaIkOS7u+S9leS4gOmhue+8jOS7iuaXpeacquWPguS4ju+8iOWFheWAvCnvvIzmmL7npLrmmKjlpKnmlbDmja5cclxuICAgICAqIDQu5pio5pel5Y+C5LiO77yM5bey5a6M5oiQ55qE6aG55YWo6YOo6aKG5Y+W5a6M5oiQ77yM5pi+56S65LuK5aSp5pWw5o2uXHJcbiAgICAgKiA1LuaYqOaXpeWPguS4ju+8jOacieWujOaIkOS4lOacqumihuWPlueahOmhue+8jOaYvuekuuaYqOWkqeaVsOaNrlxyXG4gICAgICogNi7mmKjml6Xku4rml6XlnYfmnKrlj4LkuI7vvIzmmL7npLrpu5jorqTmlbDmja5cclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICByZWZyZXNoUGFuZWwoYWN0RGF0YTogYW55KSB7XHJcbiAgICAgICAgaWYoYWN0RGF0YSA9PSBudWxsKSByZXR1cm5cclxuICAgICAgICB0aGlzLnNldEF3YXJkQm94UmF0ZShhY3REYXRhLmNmZyk7XHJcbiAgICAgICAgaWYoYWN0RGF0YS55ZXNfbGlzdCAmJiBhY3REYXRhLnllc19saXN0Lmxpc3QgPT0gbnVsbCkgLy8xIDZcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCB0b3RhbCA9IGFjdERhdGEudG9kYXlfbGlzdC50b3RhbCB8fCAwXHJcbiAgICAgICAgICAgIGxldCBkYW1hID0gYWN0RGF0YS50b2RheV9saXN0LmRhbWEgfHwgMFxyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzLnByb2dyZXNzID0gMFxyXG4gICAgICAgICAgICBpZih0b3RhbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyA9IGRhbWEvdG90YWxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldEF3YXJkQm94U3RhdGUoYWN0RGF0YS50b2RheV9saXN0LGZhbHNlLHRydWUsZmFsc2UpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0UHJvZ3Jlc3MoYWN0RGF0YS50b2RheV9saXN0KTtcclxuICAgICAgICAgICAgdGhpcy5zZXRXaW5Qcm9ncmVzc1JpY2hUZXh0KGFjdERhdGEudG9kYXlfbGlzdC5kYW1hLGFjdERhdGEudG9kYXlfbGlzdC50b3RhbClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpc1llc3RlcmRheUFjaGlldmU6Ym9vbGVhbiA9IHRoaXMuZ2V0SXNZZXN0ZXJkYXlBY2hpZXZlKGFjdERhdGEpXHJcbiAgICAgICAgbGV0IGlzWWVzdGVyZGF5RG9uZTpib29sZWFuID0gdGhpcy5nZXRJc1llc3RlcmRheURvbmUoYWN0RGF0YSlcclxuICAgICAgICBsZXQgaXNUb2RheVJlY2hhcmdlOmJvb2xlYW4gPSBhY3REYXRhLnRvZGF5X2xpc3QgJiYgYWN0RGF0YS50b2RheV9saXN0LnBheSA+MFxyXG4gICAgICAgIGlmKGlzWWVzdGVyZGF5QWNoaWV2ZSkgLy8gNSA0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgYWNoaWV2ZUxpc3QgPSAgaXNZZXN0ZXJkYXlEb25lID8gYWN0RGF0YS50b2RheV9saXN0IDogYWN0RGF0YS55ZXNfbGlzdFxyXG4gICAgICAgICAgICBsZXQgdG90YWwgPSBhY2hpZXZlTGlzdC50b3RhbFxyXG4gICAgICAgICAgICBsZXQgZGFtYSA9IGFjaGlldmVMaXN0LmRhbWFcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSAwXHJcbiAgICAgICAgICAgIGlmKHRvdGFsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzLnByb2dyZXNzID0gKGRhbWEvdG90YWwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRBd2FyZEJveFN0YXRlKGFjaGlldmVMaXN0LGlzWWVzdGVyZGF5RG9uZSxpc1llc3RlcmRheURvbmUsaXNZZXN0ZXJkYXlBY2hpZXZlKVxyXG4gICAgICAgICAgICB0aGlzLnNldFByb2dyZXNzKGFjaGlldmVMaXN0KTtcclxuICAgICAgICAgICAgdGhpcy5zZXRXaW5Qcm9ncmVzc1JpY2hUZXh0KGRhbWEsdG90YWwpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIWlzWWVzdGVyZGF5QWNoaWV2ZSkvLzIgM1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGFjaGlldmVMaXN0ID0gIGlzVG9kYXlSZWNoYXJnZSA/IGFjdERhdGEudG9kYXlfbGlzdCA6IGFjdERhdGEueWVzX2xpc3RcclxuICAgICAgICAgICAgbGV0IHRvdGFsID0gYWNoaWV2ZUxpc3QudG90YWxcclxuICAgICAgICAgICAgbGV0IGRhbWEgPSBhY2hpZXZlTGlzdC5kYW1hXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzLnByb2dyZXNzID0gMFxyXG4gICAgICAgICAgICBpZih0b3RhbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyA9IChkYW1hL3RvdGFsKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QXdhcmRCb3hTdGF0ZShhY2hpZXZlTGlzdCxpc1llc3RlcmRheURvbmUsaXNUb2RheVJlY2hhcmdlLGlzWWVzdGVyZGF5QWNoaWV2ZSlcclxuICAgICAgICAgICAgdGhpcy5zZXRQcm9ncmVzcyhhY2hpZXZlTGlzdCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0V2luUHJvZ3Jlc3NSaWNoVGV4dChkYW1hLHRvdGFsKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7ov5vluqbmnaFcclxuICAgICAqIEBwYXJhbSBhY3REYXRhIFxyXG4gICAgICovXHJcbiAgICBzZXRQcm9ncmVzcyhkYXRhOmFueSkge1xyXG4gICAgICAgIGlmKGRhdGEgPT0gbnVsbCB8fCBkYXRhLmxpc3QgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZGF0YS5saXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgaXNfYXZhID0gZGF0YS5saXN0W2luZGV4XS5pc19hdmFcclxuICAgICAgICAgICAgaWYoaW5kZXggPT0gMSAmJiBpc19hdmEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSAwLjVcclxuICAgICAgICAgICAgfWlmKGluZGV4ID09IDIgJiYgaXNfYXZhKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOajgOafpeaYqOaXpeaYr+WQpuaciei+vuaIkOS7u+aEj+S4gOmhueWlluWKsVxyXG4gICAgICogQHBhcmFtIGFjdERhdGEgXHJcbiAgICAgKi9cclxuICAgIGdldElzWWVzdGVyZGF5QWNoaWV2ZShhY3REYXRhOiBhbnkpIHtcclxuICAgICAgICBsZXQgeWVzdGVyZGF5RGF0YSA9IGFjdERhdGEueWVzX2xpc3RcclxuICAgICAgICBpZigheWVzdGVyZGF5RGF0YSB8fCAheWVzdGVyZGF5RGF0YS5saXN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB5ZXN0ZXJkYXlEYXRhLmxpc3QubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKHllc3RlcmRheURhdGEubGlzdFtpbmRleF0uaXNfYXZhICApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOajgOafpeaYr+WQpuaYqOaXpeWlluWKseW3suWFqOmDqOmihuWPluWujOavlVxyXG4gICAgICogQHBhcmFtIGFjdERhdGEgXHJcbiAgICAgKi9cclxuICAgIGdldElzWWVzdGVyZGF5RG9uZShhY3REYXRhOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgeWVzdGVyZGF5RGF0YSA9IGFjdERhdGEueWVzX2xpc3RcclxuICAgICAgICBpZigheWVzdGVyZGF5RGF0YSB8fCAheWVzdGVyZGF5RGF0YS5saXN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vZGF0YS5pc19hdmEgJiYgIWRhdGEuc3RhdHVzXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHllc3RlcmRheURhdGEubGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYoeWVzdGVyZGF5RGF0YS5saXN0W2luZGV4XS5pc19hdmEgJiYgIXllc3RlcmRheURhdGEubGlzdFtpbmRleF0uc3RhdHVzIClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuXHJcbiAgICBzZXRBd2FyZEJveFN0YXRlKGRhdGE6YW55LGlzX2RvbmU6Ym9vbGVhbixpc1RvZGF5RGF0YTpib29sZWFuLGlzWWVzdGVyZGF5QWNoaWV2ZSkge1xyXG4gICAgICAgIGlmKGRhdGEgPT0gbnVsbCB8fCBkYXRhLmxpc3QgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmF3YXJkQnRuQXJyLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmF3YXJkQnRuQXJyW2luZGV4XVxyXG4gICAgICAgICAgICAgICAgaWYobm9kZSAmJiBub2RlLmlzVmFsaWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoQXdhcmRCb3hJdGVtKS5yZWZyZXNoU3RhdGUobnVsbCxmYWxzZSxpc1RvZGF5RGF0YSxpc1llc3RlcmRheUFjaGlldmUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBkYXRhLmxpc3QubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5hd2FyZEJ0bkFycltpbmRleF1cclxuICAgICAgICAgICAgaWYobm9kZSAmJiBub2RlLmlzVmFsaWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEF3YXJkQm94SXRlbSkucmVmcmVzaFN0YXRlKGRhdGEubGlzdFtpbmRleF0saXNfZG9uZSxpc1RvZGF5RGF0YSxpc1llc3RlcmRheUFjaGlldmUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXRBd2FyZEJveFJhdGUoZGF0YTphbnkpIHtcclxuICAgICAgICBpZihkYXRhID09IG51bGwgfHwgZGF0YS5saXN0ID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJhdGVMYWJlVGV4dCA9IGNjLmpzLmZvcm1hdFN0cihcIiVzKyVzPSVzXCIsZGF0YS5saXN0WzBdLnJhdGUgKjEwLGRhdGEubGlzdFsxXS5yYXRlICoxMCwoZGF0YS5saXN0WzBdLnJhdGUgKyBkYXRhLmxpc3RbMV0ucmF0ZSkgKiAxMCk7XHJcbiAgICAgICAgdGhpcy5yYXRlTGFiZS5zdHJpbmcgPSBcIuW9k+aXpeaJk+eggemHj+WSjOi/lOWIqemHkemineWdh+S4uue0r+iuoeiuoeeul++8jOavlOWmgueOqeWutuaJk+WIsOesrDLmoaPml7blrp7pmYXlj6/ojrflvpdcIityYXRlTGFiZVRleHQrXCLlhYPlpZblirHjgILmrKHml6XlhYXlgLzku7vmhI/ph5Hpop3vvIzljbPlj6/pooblj5blr7nlupTov5TliKnph5Hpop3jgIJcIjsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZGF0YS5saXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgcmF0ZWRhdGEgPSBkYXRhLmxpc3RbaW5kZXhdO1xyXG4gICAgICAgICAgICBsZXQgdGV4dCA9IFwiJXMu546p5a625b2T5pel5omT56CB6YePKDEwMDArJXMpKiVzPSVz5pe2LOWNs+WPr+iOt+W+lyVzJemmluWFhei/lOWIqeWlluWKsSVz5YWDXCJcclxuICAgICAgICAgICAgbGV0IGRhbWEgPSAoMTAwMCArIHJhdGVkYXRhLmRhbWFfcmF0ZSoxMCkqcmF0ZWRhdGEuZGFtYV9tdWx0aTtcclxuICAgICAgICAgICAgdmFyIG1zZ1N0ciA9IGNjLmpzLmZvcm1hdFN0cih0ZXh0LHJhdGVkYXRhLmtleSxyYXRlZGF0YS5kYW1hX3JhdGUqMTAscmF0ZWRhdGEuZGFtYV9tdWx0aSxkYW1hLHJhdGVkYXRhLnJhdGUscmF0ZWRhdGEucmF0ZSoxMCk7XHJcbiAgICAgICAgICAgIGxldCBkYW1hTGFiZWwgPSB0aGlzLmRhbWFBcnJbaW5kZXhdXHJcbiAgICAgICAgICAgIGRhbWFMYWJlbC5zdHJpbmcgPSBtc2dTdHI7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5hd2FyZEJ0bkFycltpbmRleF1cclxuICAgICAgICAgICAgaWYobm9kZSAmJiBub2RlLmlzVmFsaWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEF3YXJkQm94SXRlbSkucmVmcmVzaFJhdGUocmF0ZWRhdGEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXRXaW5Qcm9ncmVzc1JpY2hUZXh0KGNoYXJnZTpudW1iZXIsdG90YWw6bnVtYmVyKXtcclxuICAgICAgIC8vIFtcIiNGMkQwNjBcIixcIiNGMkQwNjBcIiwyMCwyMl1cclxuICAgICAgICBsZXQgc3RyID0gY2MuanMuZm9ybWF0U3RyKFwiPGNvbG9yPSVzPjxzaXplPSVzPiVzLzwvYz48Y29sb3I9JXM+PHNpemU9JXM+JXM8L2NvbG9yPlwiLFxyXG4gICAgICAgIEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcuZGFpbHlSZWNoYXJnZUZvbnRDb2xvckFuZFNpemVbMF0sR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5kYWlseVJlY2hhcmdlRm9udENvbG9yQW5kU2l6ZVsyXSxcclxuICAgICAgICBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihjaGFyZ2UpLFxyXG4gICAgICAgIEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcuZGFpbHlSZWNoYXJnZUZvbnRDb2xvckFuZFNpemVbMV0sR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5kYWlseVJlY2hhcmdlRm9udENvbG9yQW5kU2l6ZVszXSxHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cih0b3RhbCkpO1xyXG4gICAgICAgIHRoaXMud2luUHJvZ3Jlc3Muc3RyaW5nID0gXCJcIitHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihjaGFyZ2UpK1wiL1wiICsgR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIodG90YWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc3Bvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubW9kZWwub2ZmKFJlY2hhcmdlR2lmdE1vZGVsLkdldEF3YXJkLCB0aGlzLCB0aGlzLm9uR2V0QXdhcmQpO1xyXG4gICAgICAgIHRoaXMubW9kZWwub2ZmKFJlY2hhcmdlR2lmdE1vZGVsLkdldENmZywgdGhpcywgdGhpcy5vbkdldENvbmZpZyk7XHJcbiAgICB9XHJcbiAgXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEJveFN0YXRlXHJcbntcclxuICAgIC8qKuW4uOinhCDkuI3lj6/ngrnlh7sqL1xyXG4gICAgTm9ybWFsID0gMCwgXHJcbiAgICAvKirpq5jkuq4g5Y+v54K55Ye7Ki9cclxuICAgIFRvZGF5QWNoaWV2ZWQgPSAxLFxyXG4gICAgLyoq5omT5byAICovXHJcbiAgICBBbHJlYWR5R290ID0gMixcclxuICAgIC8qKui+vuWIsOadoeS7tiAqL1xyXG4gICAgUmVhbEFjaGlldmVkID0gMyxcclxuICAgIFxyXG59XHJcbiJdfQ==