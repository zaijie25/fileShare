
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Activity/DailyRecharge/WndTimeLimitedRechargeGift.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c883473LoFDQLH4GqYNXpTN', 'WndTimeLimitedRechargeGift');
// hall/scripts/logic/hall/ui/Activity/DailyRecharge/WndTimeLimitedRechargeGift.ts

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
exports.TimeLimitedBoxState = void 0;
var RechargeGiftModel_1 = require("../../../../hallcommon/model/RechargeGiftModel");
var ActivityConstants_1 = require("../ActivityConstants");
var WndBase_1 = require("../../../../core/ui/WndBase");
var TimeLimitedAwardBoxItem_1 = require("./TimeLimitedAwardBoxItem");
var HallPopMsgHelper_1 = require("../../../tool/HallPopMsgHelper");
var WndTimeLimitedRechargeGift = /** @class */ (function (_super) {
    __extends(WndTimeLimitedRechargeGift, _super);
    function WndTimeLimitedRechargeGift() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.examplePoint = 1000;
        _this.timer = null;
        /**
         * 宝箱合集
         */
        _this.awardBtnArr = [];
        /**
         * 打码示例合集
         */
        _this.egArr = [];
        _this.levelCfg = [];
        _this.reachCfg = [];
        /**
         * 达成条件合集
         */
        _this.conditionTabel = {};
        /**
         * 条件文本集合
         */
        _this.conditionLabelTable = [];
        /**
         * 当前点击的宝箱
         */
        _this.clickNode = null;
        return _this;
    }
    WndTimeLimitedRechargeGift.prototype.onInit = function () {
        this.name = "WndTimeLimitedRechargeGift";
        this.isNeedDelay = true;
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/TimeLimitedActivity/TimeLimitedRecharge";
    };
    WndTimeLimitedRechargeGift.prototype.initView = function () {
        this.model = Global.ModelManager.getModel("RechargeGiftModel");
        this.joinBtn = this.addCommonClick("button", this.onJoinButtonClicked, this);
        this.joinedBtn = this.getChild("joined");
        this.addCommonClick("close", this.close, this);
        this.progress = this.getComponent("progressBar", cc.ProgressBar);
        this.winProgress = this.getComponent("WinProgress/WinProgressLabel", cc.RichText);
        this.progress.progress = 0;
        this.timerLabel = this.getComponent("WinProgress/timerLabel", cc.Label);
        this.awardPanel = this.getChild("AwarPanel");
        for (var index = 0; index < 3; index++) {
            this.awardBtnArr[index] = Global.UIHelper.addCommonClick(this.awardPanel, cc.js.formatStr("Award_%s", index), this.onAwardBtnClicked, this);
            if (Global.Setting.SkinConfig.isDarkgold) {
                this.egArr[index] = this.getComponent("content/" + cc.js.formatStr("eg%s", index + 1), cc.RichText);
                this.conditionLabelTable[index] = this.getComponent("content/" + cc.js.formatStr("condition%s", index + 1), cc.RichText);
            }
            else {
                this.egArr[index] = this.getComponent("content/" + cc.js.formatStr("eg%s", index + 1), cc.Label);
                this.conditionLabelTable[index] = this.getComponent("content/" + cc.js.formatStr("condition%s", index + 1), cc.Label);
            }
            if (!this.conditionTabel[index]) {
                this.conditionTabel[index] = {};
            }
            this.conditionTabel[index][0] = this.getChild("content/" + cc.js.formatStr("condition%s", index + 1) + "/no");
            this.conditionTabel[index][1] = this.getChild("content/" + cc.js.formatStr("condition%s", index + 1) + "/yes");
        }
        this.model.on(RechargeGiftModel_1.default.GetLimitTimeFirstPayActivityPointReq, this, this.onGetAward);
        this.model.on(RechargeGiftModel_1.default.GetLimitTimeFirstPayActivityCfg, this, this.onGetConfig);
        cc.game.on(cc.game.EVENT_SHOW, this.setTimer, this);
    };
    WndTimeLimitedRechargeGift.prototype.onAwardBtnClicked = function (target) {
        var node = target.node;
        this.clickNode = node;
        if (node && node.isValid) {
            var awardItem = node.getComponent(TimeLimitedAwardBoxItem_1.default);
            if (awardItem) {
                this.model.reqGetLimitTimeFirstPayActivityPointReq(awardItem.key);
            }
        }
    };
    WndTimeLimitedRechargeGift.prototype.onJoinButtonClicked = function () {
        Global.UI.show("WndRecharge", "vippay");
    };
    WndTimeLimitedRechargeGift.prototype.close = function () {
        Global.UI.close(this.name);
        HallPopMsgHelper_1.default.Instance.releaseLock(ActivityConstants_1.ActivityType.TimeLimitedActivity);
    };
    WndTimeLimitedRechargeGift.prototype.onOpen = function () {
        this.model.reqGetLimitTimeFirstPayActivityCfg();
    };
    WndTimeLimitedRechargeGift.prototype.onGetAward = function (awardData) {
        if (!awardData) {
            return;
        }
        Global.UI.show("WndRebateGet", awardData.point);
        if (this.clickNode && this.clickNode.isValid) {
            var awardItem = this.clickNode.getComponent(TimeLimitedAwardBoxItem_1.default);
            if (awardItem) {
                awardItem.setBoxState(TimeLimitedBoxState.AlreadyGot);
            }
        }
        this.changeReceiveState(awardData.key);
        var flag = this.checkIsAnyNotReceive();
        if (!flag) {
            this.model.TimelimitedStatus = 0;
            Global.Event.event(GlobalEvent.TimeLimitedRechargeStatusChange, true);
            this.close();
        }
    };
    WndTimeLimitedRechargeGift.prototype.onClose = function () {
        this.clickNode = null;
        this.levelCfg = [];
        this.reachCfg = [];
        this.clearTimeOut();
    };
    WndTimeLimitedRechargeGift.prototype.onGetConfig = function (data) {
        this.OnDataPrepared();
        if (data == null)
            return;
        Global.Event.event(ActivityConstants_1.ActivityConstants.SHOW_ACT_WAITTING, false);
        this.joinBtn.active = data.status == 1;
        this.joinedBtn.active = data.status > 1;
        this.refreshPanel(data);
    };
    WndTimeLimitedRechargeGift.prototype.refreshPanel = function (actData) {
        if (actData == null)
            return;
        this.setTimer();
        this.assembyData(actData);
        this.refreshConditionContent(actData);
        this.refreshEgContent(actData);
        this.refreshAwardPanel(actData);
        this.setProgress(actData);
    };
    WndTimeLimitedRechargeGift.prototype.assembyData = function (data) {
        this.levelCfg.push(data.one_code);
        this.levelCfg.push(data.two_code);
        this.levelCfg.push(data.three_code);
        var cfg = data.data;
        this.reachCfg.push(cfg.one_lv);
        this.reachCfg.push(cfg.two_lv);
        this.reachCfg.push(cfg.three_lv);
    };
    WndTimeLimitedRechargeGift.prototype.refreshConditionContent = function (data) {
        var status = data.status; // 1 未参与 2 参与未第二次充值 3 参与已经第二次充值 0 结束
        var reachFlag = this.checkReachAnyLevel(data);
        if (!this.conditionTabel)
            return;
        this.conditionTabel[0][0].active = status == 1;
        this.conditionTabel[0][1].active = status > 1;
        this.conditionTabel[1][0].active = !reachFlag;
        this.conditionTabel[1][1].active = reachFlag;
        this.conditionTabel[2][0].active = status != 3;
        this.conditionTabel[2][1].active = status == 3;
        if (Global.Setting.SkinConfig.isDarkgold) {
            if (status > 1) {
                this.conditionLabelTable[0].string = '<i><color = #8FC31F>条件一 ：该活动仅限会员第一笔【赠送专区入款】充值自动参与；</c></i>';
            }
            else {
                this.conditionLabelTable[0].string = '<i><color = #F5D8A7>条件一 ：该活动仅限会员第一笔【赠送专区入款】充值自动参与</c></i>';
            }
            if (reachFlag) {
                this.conditionLabelTable[1].string = '<i><color = #8FC31F>条件二 ：达到对应的流水打码量；</c></i>';
            }
            else {
                this.conditionLabelTable[1].string = '<i><color = #F5D8A7>条件二 ：达到对应的流水打码量；</c></i>';
            }
            if (status == 3) {
                this.conditionLabelTable[2].string = '<i><color = #8FC31F>条件三 ：次日充值任意金额；</c></i>';
            }
            else {
                this.conditionLabelTable[2].string = '<i><color = #F5D8A7>条件三 ：次日充值任意金额；</c></i>';
            }
        }
        else if (Global.Setting.SkinConfig.isGreen) {
            if (status > 1) {
                this.conditionLabelTable[0].node.color = new cc.Color().fromHEX('#22AC38');
            }
            else {
                this.conditionLabelTable[0].node.color = new cc.Color().fromHEX('#9D5725');
            }
            if (reachFlag) {
                this.conditionLabelTable[1].node.color = new cc.Color().fromHEX('#22AC38');
            }
            else {
                this.conditionLabelTable[1].node.color = new cc.Color().fromHEX('#9D5725');
            }
            if (status == 3) {
                this.conditionLabelTable[2].node.color = new cc.Color().fromHEX('#22AC38');
            }
            else {
                this.conditionLabelTable[2].node.color = new cc.Color().fromHEX('#9D5725');
            }
        }
    };
    WndTimeLimitedRechargeGift.prototype.refreshEgContent = function (data) {
        var info = '当会员达到（1000+%s）*%s=%s流水即可获得%s元首充彩金';
        var levelCfg = data.config.list;
        if (!levelCfg) {
            return;
        }
        var dama = 0;
        for (var index = 0; index < levelCfg.length; index++) {
            var level = levelCfg[index];
            var rata = level.rate;
            var muilt = level.dama_multi;
            dama += this.examplePoint * rata / 100;
            var total = (this.examplePoint + dama) * muilt;
            if (Global.Setting.SkinConfig.isDarkgold) {
                info = (index + 1) + "." + '当会员达到（1000+%s）*%s=<color= #FFF55B>%s</c>流水即可获得%s元首充彩金';
                this.egArr[index].string = "<i>" + info + "</i>";
                continue;
            }
            else if (Global.Setting.SkinConfig.isGreen) {
                info = (index + 1) + "." + '当会员达到（1000+%s）*%s=<color= #EB6100>%s</c>流水即可获得%s元首充彩金';
                this.egArr[index].string = "<i>" + info + "</i>";
            }
            this.egArr[index].string = cc.js.formatStr((index + 1) + "." + info, dama, muilt, total, this.examplePoint * rata / 100);
        }
    };
    WndTimeLimitedRechargeGift.prototype.refreshAwardPanel = function (data) {
        var levelCfg = data.config.list;
        if (!levelCfg) {
            return;
        }
        for (var index = 0; index < levelCfg.length; index++) {
            var level = levelCfg[index];
            this.awardBtnArr[index].getComponent(TimeLimitedAwardBoxItem_1.default).refreshState(data, level, index, this.levelCfg, this.reachCfg);
        }
    };
    WndTimeLimitedRechargeGift.prototype.checkReachAnyLevel = function (data) {
        var flag = false;
        var currentDama = data.put_code;
        if (this.levelCfg.length == 0)
            return flag;
        for (var index = 0; index < this.levelCfg.length; index++) {
            var level = this.levelCfg[index];
            if (level && currentDama >= level) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    WndTimeLimitedRechargeGift.prototype.setTimer = function () {
        var _this = this;
        if (this.model.TimelimitedStatus > 1) {
            this.timerLabel.node.active = false;
            return;
        }
        this.clearTimeOut();
        var currentTime = new Date().getTime();
        var time = this.model.CountDown * 1000 - currentTime;
        time = Math.ceil(time / 1000);
        this.timerLabel.string = Global.Toolkit.secondFormatHMS(time);
        this.timer = setInterval(function () {
            _this.timerLabel.string = Global.Toolkit.secondFormatHMS(time);
            time -= 1;
            if (time <= 0) {
                _this.timerLabel.node.active = false;
            }
        }, 1000);
    };
    WndTimeLimitedRechargeGift.prototype.clearTimeOut = function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = null;
    };
    /**
     * 设置进度条
     * @param actData
     */
    WndTimeLimitedRechargeGift.prototype.setProgress = function (data) {
        this.progress.progress = data.put_code / data.three_code;
        if (!data.three_code) {
            this.progress.progress = 0;
        }
        var current = Global.Toolkit.formatPointStr(data.put_code) || "0";
        var all = Global.Toolkit.formatPointStr(data.three_code) || "0";
        this.winProgress.string = current + "/" + all + "</c>";
    };
    WndTimeLimitedRechargeGift.prototype.changeReceiveState = function (level) {
        if (this.reachCfg[level - 1] === 0) {
            this.reachCfg[level - 1] = 1;
        }
    };
    WndTimeLimitedRechargeGift.prototype.checkIsAnyNotReceive = function () {
        for (var index = 0; index < this.reachCfg.length; index++) {
            var element = this.reachCfg[index];
            if (!element) {
                return true;
            }
        }
        return false;
    };
    WndTimeLimitedRechargeGift.prototype.onDispose = function () {
        this.clickNode = null;
        this.levelCfg = [];
        this.reachCfg = [];
        this.model.off(RechargeGiftModel_1.default.GetLimitTimeFirstPayActivityPointReq, this, this.onGetAward);
        this.model.off(RechargeGiftModel_1.default.GetLimitTimeFirstPayActivityCfg, this, this.onGetConfig);
        cc.game.off(cc.game.EVENT_SHOW, this.setTimer, this);
    };
    return WndTimeLimitedRechargeGift;
}(WndBase_1.default));
exports.default = WndTimeLimitedRechargeGift;
var TimeLimitedBoxState;
(function (TimeLimitedBoxState) {
    /**常规 不可点击*/
    TimeLimitedBoxState[TimeLimitedBoxState["Normal"] = 0] = "Normal";
    /**高亮 可点击*/
    TimeLimitedBoxState[TimeLimitedBoxState["TodayAchieved"] = 1] = "TodayAchieved";
    /**已领取 */
    TimeLimitedBoxState[TimeLimitedBoxState["AlreadyGot"] = 2] = "AlreadyGot";
})(TimeLimitedBoxState = exports.TimeLimitedBoxState || (exports.TimeLimitedBoxState = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxBY3Rpdml0eVxcRGFpbHlSZWNoYXJnZVxcV25kVGltZUxpbWl0ZWRSZWNoYXJnZUdpZnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVEQUF1RDs7Ozs7Ozs7Ozs7Ozs7OztBQUV2RCxvRkFBK0U7QUFDL0UsMERBQXVFO0FBQ3ZFLHVEQUFrRDtBQUNsRCxxRUFBZ0U7QUFDaEUsbUVBQThEO0FBRzlEO0lBQXdELDhDQUFPO0lBQS9EO1FBQUEscUVBNGFDO1FBemFXLGtCQUFZLEdBQUcsSUFBSSxDQUFBO1FBSW5CLFdBQUssR0FBSSxJQUFJLENBQUE7UUFDckI7O1dBRUc7UUFDSCxpQkFBVyxHQUFhLEVBQUUsQ0FBQTtRQUMxQjs7V0FFRztRQUNILFdBQUssR0FBRyxFQUFFLENBQUE7UUFPRixjQUFRLEdBQUcsRUFBRSxDQUFBO1FBR2IsY0FBUSxHQUFHLEVBQUUsQ0FBQTtRQUdyQjs7V0FFRztRQUVILG9CQUFjLEdBQU8sRUFBRSxDQUFBO1FBR3ZCOztXQUVHO1FBQ0gseUJBQW1CLEdBQUcsRUFBRSxDQUFBO1FBY3hCOztXQUVHO1FBQ0gsZUFBUyxHQUFZLElBQUksQ0FBQTs7SUFxWDdCLENBQUM7SUFuWGEsMkNBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLDRCQUE0QixDQUFDO1FBQ3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyx5REFBeUQsQ0FBQTtJQUM1RSxDQUFDO0lBQ1MsNkNBQVEsR0FBbEI7UUFHSSxJQUFJLENBQUMsS0FBSyxHQUFzQixNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxPQUFP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RyxFQUFFLENBQUE7UUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUE7UUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsMkJBQWlCLENBQUMsb0NBQW9DLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5RixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQywyQkFBaUIsQ0FBQywrQkFBK0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFGLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVMLGlDQUFDO0FBQUQsQ0E1YUEsQUE0YUMsQ0E1YXVELGlCQUFPLEdBNGE5RDs7QUFFRCxJQUFZLG1CQVNYO0FBVEQsV0FBWSxtQkFBbUI7SUFFM0IsWUFBWTtJQUNaLGlFQUFVLENBQUE7SUFDVixXQUFXO0lBQ1gsK0VBQWlCLENBQUE7SUFDakIsU0FBUztJQUNULHlFQUFjLENBQUE7QUFFbEIsQ0FBQyxFQVRXLG1CQUFtQixHQUFuQiwyQkFBbUIsS0FBbkIsMkJBQW1CLFFBUzlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8vIGltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS91aS9WaWV3QmFzZVwiO1xyXG5cclxuaW1wb3J0IFJlY2hhcmdlR2lmdE1vZGVsIGZyb20gXCIuLi8uLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1JlY2hhcmdlR2lmdE1vZGVsXCI7XHJcbmltcG9ydCB7IEFjdGl2aXR5Q29uc3RhbnRzLCBBY3Rpdml0eVR5cGUgfSBmcm9tIFwiLi4vQWN0aXZpdHlDb25zdGFudHNcIjtcclxuaW1wb3J0IFduZEJhc2UgZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvdWkvV25kQmFzZVwiO1xyXG5pbXBvcnQgVGltZUxpbWl0ZWRBd2FyZEJveEl0ZW0gZnJvbSBcIi4vVGltZUxpbWl0ZWRBd2FyZEJveEl0ZW1cIjtcclxuaW1wb3J0IEhhbGxQb3BNc2dIZWxwZXIgZnJvbSBcIi4uLy4uLy4uL3Rvb2wvSGFsbFBvcE1zZ0hlbHBlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZFRpbWVMaW1pdGVkUmVjaGFyZ2VHaWZ0IGV4dGVuZHMgV25kQmFzZSB7XHJcbiAgICBwcml2YXRlIG1vZGVsOiBSZWNoYXJnZUdpZnRNb2RlbFxyXG5cclxuICAgIHByaXZhdGUgZXhhbXBsZVBvaW50ID0gMTAwMFxyXG5cclxuICAgIHByaXZhdGUgdGltZXJMYWJlbDpjYy5MYWJlbFxyXG5cclxuICAgIHByaXZhdGUgdGltZXIgID0gbnVsbFxyXG4gICAgLyoqXHJcbiAgICAgKiDlrp3nrrHlkIjpm4ZcclxuICAgICAqL1xyXG4gICAgYXdhcmRCdG5BcnI6Y2MuTm9kZSBbXT0gW11cclxuICAgIC8qKlxyXG4gICAgICog5omT56CB56S65L6L5ZCI6ZuGXHJcbiAgICAgKi9cclxuICAgIGVnQXJyID0gW11cclxuICAgIGF3YXJkUGFuZWw6Y2MuTm9kZVxyXG4gICAgLyoqXHJcbiAgICAgKiDov5vooYzkuK1cclxuICAgICAqL1xyXG4gICAgam9pbmVkQnRuOmNjLk5vZGVcclxuXHJcbiAgICBwcml2YXRlIGxldmVsQ2ZnID0gW11cclxuXHJcblxyXG4gICAgcHJpdmF0ZSByZWFjaENmZyA9IFtdXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L6+5oiQ5p2h5Lu25ZCI6ZuGXHJcbiAgICAgKi9cclxuXHJcbiAgICBjb25kaXRpb25UYWJlbDphbnkgPSB7fVxyXG4gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmnaHku7bmlofmnKzpm4blkIhcclxuICAgICAqL1xyXG4gICAgY29uZGl0aW9uTGFiZWxUYWJsZSA9IFtdXHJcbiAgICAvKipcclxuICAgICAqIOeri+WNs+WPguS4jlxyXG4gICAgICovXHJcbiAgICBqb2luQnRuOmNjLk5vZGVcclxuICAgIC8qKlxyXG4gICAgICog5omT56CB6L+b5bqm5p2hXHJcbiAgICAgKi9cclxuICAgIHByb2dyZXNzOmNjLlByb2dyZXNzQmFyXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiZPnoIHov5vluqZcclxuICAgICAqL1xyXG4gICAgd2luUHJvZ3Jlc3M6Y2MuUmljaFRleHRcclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN54K55Ye755qE5a6d566xXHJcbiAgICAgKi9cclxuICAgIGNsaWNrTm9kZSA6Y2MuTm9kZSA9IG51bGxcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCl7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmRUaW1lTGltaXRlZFJlY2hhcmdlR2lmdFwiO1xyXG4gICAgICAgIHRoaXMuaXNOZWVkRGVsYXkgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5sYXllciA9IEdsb2JhbC5VSS5Qb3BMYXllcjtcclxuICAgICAgICB0aGlzLnJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS9UaW1lTGltaXRlZEFjdGl2aXR5L1RpbWVMaW1pdGVkUmVjaGFyZ2VcIlxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KClcclxuICAgIHtcclxuICAgICAgIFxyXG4gICAgICAgIHRoaXMubW9kZWwgPSA8UmVjaGFyZ2VHaWZ0TW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlJlY2hhcmdlR2lmdE1vZGVsXCIpO1xyXG4gICAgICAgIHRoaXMuam9pbkJ0biA9IHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJidXR0b25cIix0aGlzLm9uSm9pbkJ1dHRvbkNsaWNrZWQsdGhpcylcclxuICAgICAgICB0aGlzLmpvaW5lZEJ0biA9IHRoaXMuZ2V0Q2hpbGQoXCJqb2luZWRcIilcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiY2xvc2VcIix0aGlzLmNsb3NlLHRoaXMpXHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcyA9IHRoaXMuZ2V0Q29tcG9uZW50KFwicHJvZ3Jlc3NCYXJcIixjYy5Qcm9ncmVzc0JhcilcclxuICAgICAgICB0aGlzLndpblByb2dyZXNzID0gdGhpcy5nZXRDb21wb25lbnQoXCJXaW5Qcm9ncmVzcy9XaW5Qcm9ncmVzc0xhYmVsXCIsY2MuUmljaFRleHQpXHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgdGhpcy50aW1lckxhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJXaW5Qcm9ncmVzcy90aW1lckxhYmVsXCIsY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5hd2FyZFBhbmVsID0gdGhpcy5nZXRDaGlsZChcIkF3YXJQYW5lbFwiKVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCAzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICB0aGlzLmF3YXJkQnRuQXJyW2luZGV4XSA9IEdsb2JhbC5VSUhlbHBlci5hZGRDb21tb25DbGljayh0aGlzLmF3YXJkUGFuZWwsY2MuanMuZm9ybWF0U3RyKFwiQXdhcmRfJXNcIixpbmRleCksdGhpcy5vbkF3YXJkQnRuQ2xpY2tlZCx0aGlzKVxyXG4gICAgICAgICAgICAgaWYoR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5pc0Rhcmtnb2xkKVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZ0FycltpbmRleF0gPSB0aGlzLmdldENvbXBvbmVudChcImNvbnRlbnQvXCIrY2MuanMuZm9ybWF0U3RyKFwiZWclc1wiLGluZGV4KzEpLCBjYy5SaWNoVGV4dClcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uTGFiZWxUYWJsZVtpbmRleF0gPSB0aGlzLmdldENvbXBvbmVudChcImNvbnRlbnQvXCIrY2MuanMuZm9ybWF0U3RyKFwiY29uZGl0aW9uJXNcIixpbmRleCsxKSxjYy5SaWNoVGV4dClcclxuXHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVnQXJyW2luZGV4XSA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiY29udGVudC9cIitjYy5qcy5mb3JtYXRTdHIoXCJlZyVzXCIsaW5kZXgrMSksIGNjLkxhYmVsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25kaXRpb25MYWJlbFRhYmxlW2luZGV4XSA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiY29udGVudC9cIitjYy5qcy5mb3JtYXRTdHIoXCJjb25kaXRpb24lc1wiLGluZGV4KzEpLGNjLkxhYmVsKVxyXG5cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgaWYoIXRoaXMuY29uZGl0aW9uVGFiZWxbaW5kZXhdKVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25kaXRpb25UYWJlbFtpbmRleF0gPSB7fVxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgdGhpcy5jb25kaXRpb25UYWJlbFtpbmRleF1bMF0gID0gdGhpcy5nZXRDaGlsZChcImNvbnRlbnQvXCIrY2MuanMuZm9ybWF0U3RyKFwiY29uZGl0aW9uJXNcIixpbmRleCsxKSArIFwiL25vXCIpXHJcbiAgICAgICAgICAgICB0aGlzLmNvbmRpdGlvblRhYmVsW2luZGV4XVsxXSA9IHRoaXMuZ2V0Q2hpbGQoXCJjb250ZW50L1wiK2NjLmpzLmZvcm1hdFN0cihcImNvbmRpdGlvbiVzXCIsaW5kZXgrMSkgKyBcIi95ZXNcIilcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1vZGVsLm9uKFJlY2hhcmdlR2lmdE1vZGVsLkdldExpbWl0VGltZUZpcnN0UGF5QWN0aXZpdHlQb2ludFJlcSwgdGhpcywgdGhpcy5vbkdldEF3YXJkKTtcclxuICAgICAgICB0aGlzLm1vZGVsLm9uKFJlY2hhcmdlR2lmdE1vZGVsLkdldExpbWl0VGltZUZpcnN0UGF5QWN0aXZpdHlDZmcsIHRoaXMsIHRoaXMub25HZXRDb25maWcpO1xyXG4gICAgICAgIGNjLmdhbWUub24oY2MuZ2FtZS5FVkVOVF9TSE9XLCB0aGlzLnNldFRpbWVyLCB0aGlzKTtcclxuICAgIH1cclxuICAgIG9uQXdhcmRCdG5DbGlja2VkKHRhcmdldCkge1xyXG4gICAgICAgIGxldCBub2RlID0gdGFyZ2V0Lm5vZGVcclxuICAgICAgICB0aGlzLmNsaWNrTm9kZSA9IG5vZGVcclxuICAgICAgICBpZihub2RlICYmIG5vZGUuaXNWYWxpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBhd2FyZEl0ZW0gPSBub2RlLmdldENvbXBvbmVudChUaW1lTGltaXRlZEF3YXJkQm94SXRlbSlcclxuICAgICAgICAgICAgaWYoYXdhcmRJdGVtKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnJlcUdldExpbWl0VGltZUZpcnN0UGF5QWN0aXZpdHlQb2ludFJlcShhd2FyZEl0ZW0ua2V5KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgb25Kb2luQnV0dG9uQ2xpY2tlZCgpIFxyXG4gICAge1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kUmVjaGFyZ2VcIiwgXCJ2aXBwYXlcIik7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2UoKXtcclxuICAgICAgICBHbG9iYWwuVUkuY2xvc2UodGhpcy5uYW1lKTtcclxuICAgICAgICBIYWxsUG9wTXNnSGVscGVyLkluc3RhbmNlLnJlbGVhc2VMb2NrKEFjdGl2aXR5VHlwZS5UaW1lTGltaXRlZEFjdGl2aXR5KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKClcclxuICAgIHtcclxuICAgICAgIFxyXG4gICAgICAgIHRoaXMubW9kZWwucmVxR2V0TGltaXRUaW1lRmlyc3RQYXlBY3Rpdml0eUNmZygpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkdldEF3YXJkKGF3YXJkRGF0YSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCFhd2FyZERhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRSZWJhdGVHZXRcIiwgYXdhcmREYXRhLnBvaW50KTtcclxuICAgICAgICBpZih0aGlzLmNsaWNrTm9kZSAmJiB0aGlzLmNsaWNrTm9kZS5pc1ZhbGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGF3YXJkSXRlbSA9IHRoaXMuY2xpY2tOb2RlLmdldENvbXBvbmVudChUaW1lTGltaXRlZEF3YXJkQm94SXRlbSlcclxuICAgICAgICAgICAgaWYoYXdhcmRJdGVtKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhd2FyZEl0ZW0uc2V0Qm94U3RhdGUoVGltZUxpbWl0ZWRCb3hTdGF0ZS5BbHJlYWR5R290KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hhbmdlUmVjZWl2ZVN0YXRlKGF3YXJkRGF0YS5rZXkpXHJcblxyXG4gICAgICAgIGxldCBmbGFnID0gdGhpcy5jaGVja0lzQW55Tm90UmVjZWl2ZSgpXHJcbiAgICAgICAgaWYoIWZsYWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLlRpbWVsaW1pdGVkU3RhdHVzID0gMFxyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuVGltZUxpbWl0ZWRSZWNoYXJnZVN0YXR1c0NoYW5nZSx0cnVlKVxyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKClcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNsaWNrTm9kZSA9IG51bGxcclxuICAgICAgICB0aGlzLmxldmVsQ2ZnID0gW11cclxuICAgICAgICB0aGlzLnJlYWNoQ2ZnID0gW11cclxuICAgICAgICB0aGlzLmNsZWFyVGltZU91dCgpXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uR2V0Q29uZmlnKGRhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5PbkRhdGFQcmVwYXJlZCgpXHJcbiAgICAgICAgaWYoZGF0YSA9PSBudWxsKSByZXR1cm5cclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoQWN0aXZpdHlDb25zdGFudHMuU0hPV19BQ1RfV0FJVFRJTkcsIGZhbHNlKVxyXG4gICAgICAgIHRoaXMuam9pbkJ0bi5hY3RpdmUgPSBkYXRhLnN0YXR1cyA9PSAxXHJcbiAgICAgICAgdGhpcy5qb2luZWRCdG4uYWN0aXZlID0gZGF0YS5zdGF0dXMgPiAxXHJcblxyXG4gICAgICAgIHRoaXMucmVmcmVzaFBhbmVsKGRhdGEpXHJcbiAgICB9XHJcbiAgIFxyXG4gICAgcmVmcmVzaFBhbmVsKGFjdERhdGE6IGFueSkge1xyXG4gICAgICAgIGlmKGFjdERhdGEgPT0gbnVsbCkgcmV0dXJuXHJcbiAgICAgICAgdGhpcy5zZXRUaW1lcigpXHJcbiAgICAgICAgdGhpcy5hc3NlbWJ5RGF0YShhY3REYXRhKVxyXG4gICAgICAgIHRoaXMucmVmcmVzaENvbmRpdGlvbkNvbnRlbnQoYWN0RGF0YSlcclxuICAgICAgICB0aGlzLnJlZnJlc2hFZ0NvbnRlbnQoYWN0RGF0YSlcclxuICAgICAgICB0aGlzLnJlZnJlc2hBd2FyZFBhbmVsKGFjdERhdGEpXHJcbiAgICAgICAgdGhpcy5zZXRQcm9ncmVzcyhhY3REYXRhKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBhc3NlbWJ5RGF0YShkYXRhKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubGV2ZWxDZmcucHVzaCggZGF0YS5vbmVfY29kZSlcclxuICAgICAgICB0aGlzLmxldmVsQ2ZnLnB1c2goIGRhdGEudHdvX2NvZGUpXHJcbiAgICAgICAgdGhpcy5sZXZlbENmZy5wdXNoKCBkYXRhLnRocmVlX2NvZGUpXHJcblxyXG4gICAgICAgIGxldCBjZmcgPSBkYXRhLmRhdGFcclxuICAgICAgICB0aGlzLnJlYWNoQ2ZnLnB1c2goY2ZnLm9uZV9sdilcclxuICAgICAgICB0aGlzLnJlYWNoQ2ZnLnB1c2goY2ZnLnR3b19sdilcclxuICAgICAgICB0aGlzLnJlYWNoQ2ZnLnB1c2goY2ZnLnRocmVlX2x2KVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hDb25kaXRpb25Db250ZW50KGRhdGEpXHJcbiAgICB7XHJcbiAgICAgICBcclxuICAgICAgICBsZXQgc3RhdHVzID0gZGF0YS5zdGF0dXMgLy8gMSDmnKrlj4LkuI4gMiDlj4LkuI7mnKrnrKzkuozmrKHlhYXlgLwgMyDlj4LkuI7lt7Lnu4/nrKzkuozmrKHlhYXlgLwgMCDnu5PmnZ9cclxuICAgICAgICBsZXQgcmVhY2hGbGFnID0gdGhpcy5jaGVja1JlYWNoQW55TGV2ZWwoZGF0YSlcclxuICAgICAgICBpZighdGhpcy5jb25kaXRpb25UYWJlbClyZXR1cm5cclxuXHJcbiAgICAgICAgdGhpcy5jb25kaXRpb25UYWJlbFswXVswXS5hY3RpdmUgPSBzdGF0dXMgPT0gMVxyXG4gICAgICAgIHRoaXMuY29uZGl0aW9uVGFiZWxbMF1bMV0uYWN0aXZlID0gc3RhdHVzID4gMVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY29uZGl0aW9uVGFiZWxbMV1bMF0uYWN0aXZlID0gIXJlYWNoRmxhZ1xyXG4gICAgICAgIHRoaXMuY29uZGl0aW9uVGFiZWxbMV1bMV0uYWN0aXZlID0gcmVhY2hGbGFnXHJcblxyXG4gICAgICAgIHRoaXMuY29uZGl0aW9uVGFiZWxbMl1bMF0uYWN0aXZlID0gc3RhdHVzICE9IDNcclxuICAgICAgICB0aGlzLmNvbmRpdGlvblRhYmVsWzJdWzFdLmFjdGl2ZSA9IHN0YXR1cyA9PSAzXHJcblxyXG4gICAgICAgIGlmKEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcuaXNEYXJrZ29sZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHN0YXR1cz4xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmRpdGlvbkxhYmVsVGFibGVbMF0uc3RyaW5nID0gJzxpPjxjb2xvciA9ICM4RkMzMUY+5p2h5Lu25LiAIO+8muivpea0u+WKqOS7hemZkOS8muWRmOesrOS4gOeslOOAkOi1oOmAgeS4k+WMuuWFpeasvuOAkeWFheWAvOiHquWKqOWPguS4ju+8mzwvYz48L2k+J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25kaXRpb25MYWJlbFRhYmxlWzBdLnN0cmluZyA9ICc8aT48Y29sb3IgPSAjRjVEOEE3PuadoeS7tuS4gCDvvJror6XmtLvliqjku4XpmZDkvJrlkZjnrKzkuIDnrJTjgJDotaDpgIHkuJPljLrlhaXmrL7jgJHlhYXlgLzoh6rliqjlj4LkuI48L2M+PC9pPidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihyZWFjaEZsYWcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uTGFiZWxUYWJsZVsxXS5zdHJpbmcgPSAnPGk+PGNvbG9yID0gIzhGQzMxRj7mnaHku7bkuowg77ya6L6+5Yiw5a+55bqU55qE5rWB5rC05omT56CB6YeP77ybPC9jPjwvaT4nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmRpdGlvbkxhYmVsVGFibGVbMV0uc3RyaW5nID0gJzxpPjxjb2xvciA9ICNGNUQ4QTc+5p2h5Lu25LqMIO+8mui+vuWIsOWvueW6lOeahOa1geawtOaJk+eggemHj++8mzwvYz48L2k+J1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihzdGF0dXMgPT0gMylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25kaXRpb25MYWJlbFRhYmxlWzJdLnN0cmluZyA9ICc8aT48Y29sb3IgPSAjOEZDMzFGPuadoeS7tuS4iSDvvJrmrKHml6XlhYXlgLzku7vmhI/ph5Hpop3vvJs8L2M+PC9pPidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uTGFiZWxUYWJsZVsyXS5zdHJpbmcgPSAnPGk+PGNvbG9yID0gI0Y1RDhBNz7mnaHku7bkuIkg77ya5qyh5pel5YWF5YC85Lu75oSP6YeR6aKd77ybPC9jPjwvaT4nXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcuaXNHcmVlbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHN0YXR1cz4xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmRpdGlvbkxhYmVsVGFibGVbMF0ubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigpLmZyb21IRVgoJyMyMkFDMzgnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uTGFiZWxUYWJsZVswXS5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKCkuZnJvbUhFWCgnIzlENTcyNScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHJlYWNoRmxhZylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25kaXRpb25MYWJlbFRhYmxlWzFdLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoKS5mcm9tSEVYKCcjMjJBQzM4Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmRpdGlvbkxhYmVsVGFibGVbMV0ubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigpLmZyb21IRVgoJyM5RDU3MjUnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoc3RhdHVzID09IDMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uTGFiZWxUYWJsZVsyXS5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKCkuZnJvbUhFWCgnIzIyQUMzOCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25kaXRpb25MYWJlbFRhYmxlWzJdLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoKS5mcm9tSEVYKCcjOUQ1NzI1Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hFZ0NvbnRlbnQoZGF0YSlcclxuICAgIHtcclxuICAgICAgICBsZXQgaW5mbyA9ICflvZPkvJrlkZjovr7liLDvvIgxMDAwKyVz77yJKiVzPSVz5rWB5rC05Y2z5Y+v6I635b6XJXPlhYPpppblhYXlvanph5EnXHJcbiAgICAgICAgbGV0IGxldmVsQ2ZnID0gZGF0YS5jb25maWcubGlzdFxyXG4gICAgICAgIGlmKCFsZXZlbENmZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGFtYSA9IDBcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGV2ZWxDZmcubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBsZXZlbCA9IGxldmVsQ2ZnW2luZGV4XTtcclxuICAgICAgICAgICAgbGV0IHJhdGEgPSBsZXZlbC5yYXRlXHJcbiAgICAgICAgICAgIGxldCBtdWlsdCA9IGxldmVsLmRhbWFfbXVsdGlcclxuICAgICAgICAgICAgZGFtYSArPSB0aGlzLmV4YW1wbGVQb2ludCAqIHJhdGEvMTAwXHJcbiAgICAgICAgICAgIGxldCB0b3RhbCA9ICh0aGlzLmV4YW1wbGVQb2ludCArIGRhbWEpICogbXVpbHRcclxuICAgICAgICAgICAgaWYoR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5pc0Rhcmtnb2xkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbmZvID0gKGluZGV4KzEpK1wiLlwiKyflvZPkvJrlkZjovr7liLDvvIgxMDAwKyVz77yJKiVzPTxjb2xvcj0gI0ZGRjU1Qj4lczwvYz7mtYHmsLTljbPlj6/ojrflvpclc+WFg+mmluWFheW9qemHkSdcclxuICAgICAgICAgICAgICAgIHRoaXMuZWdBcnJbaW5kZXhdLnN0cmluZyA9IGA8aT4ke2luZm99PC9pPmBcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLmlzR3JlZW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGluZm8gPSAoaW5kZXgrMSkrXCIuXCIrJ+W9k+S8muWRmOi+vuWIsO+8iDEwMDArJXPvvIkqJXM9PGNvbG9yPSAjRUI2MTAwPiVzPC9jPua1geawtOWNs+WPr+iOt+W+lyVz5YWD6aaW5YWF5b2p6YeRJ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lZ0FycltpbmRleF0uc3RyaW5nID0gYDxpPiR7aW5mb308L2k+YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZWdBcnJbaW5kZXhdLnN0cmluZyA9IGNjLmpzLmZvcm1hdFN0cigoaW5kZXgrMSkrXCIuXCIraW5mbyxkYW1hLG11aWx0LHRvdGFsLHRoaXMuZXhhbXBsZVBvaW50ICogcmF0YS8xMDApXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hBd2FyZFBhbmVsKGRhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGxldmVsQ2ZnID0gZGF0YS5jb25maWcubGlzdFxyXG4gICAgICAgIGlmKCFsZXZlbENmZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGV2ZWxDZmcubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBsZXZlbCA9IGxldmVsQ2ZnW2luZGV4XTtcclxuICAgICAgICAgICAgdGhpcy5hd2FyZEJ0bkFycltpbmRleF0uZ2V0Q29tcG9uZW50KFRpbWVMaW1pdGVkQXdhcmRCb3hJdGVtKS5yZWZyZXNoU3RhdGUoZGF0YSxsZXZlbCxpbmRleCx0aGlzLmxldmVsQ2ZnLHRoaXMucmVhY2hDZmcpXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja1JlYWNoQW55TGV2ZWwoZGF0YSlcclxuICAgIHtcclxuICAgICAgICBsZXQgZmxhZyA9IGZhbHNlXHJcbiAgICAgICAgbGV0IGN1cnJlbnREYW1hID0gZGF0YS5wdXRfY29kZVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMubGV2ZWxDZmcubGVuZ3RoID09IDApIHJldHVybiBmbGFnICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubGV2ZWxDZmcubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBsZXZlbCA9IHRoaXMubGV2ZWxDZmdbaW5kZXhdO1xyXG4gICAgICAgICAgICBpZihsZXZlbCAmJiBjdXJyZW50RGFtYSA+PSBsZXZlbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZmxhZyA9IHRydWVcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSAgXHJcbiAgICAgICAgcmV0dXJuIGZsYWdcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lcigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5tb2RlbC5UaW1lbGltaXRlZFN0YXR1cyA+MSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXJMYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNsZWFyVGltZU91dCgpXHJcbiAgICAgICAgbGV0IGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcclxuICAgICAgICBsZXQgdGltZSA9IHRoaXMubW9kZWwuQ291bnREb3duICogMTAwMCAtIGN1cnJlbnRUaW1lXHJcbiAgICAgICAgdGltZSA9IE1hdGguY2VpbCh0aW1lLzEwMDApXHJcbiAgICAgICAgdGhpcy50aW1lckxhYmVsLnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LnNlY29uZEZvcm1hdEhNUyh0aW1lKVxyXG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXJMYWJlbC5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5zZWNvbmRGb3JtYXRITVModGltZSlcclxuICAgICAgICAgICAgdGltZSAtPSAxXHJcbiAgICAgICAgICAgIGlmKHRpbWU8PTApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZXJMYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJUaW1lT3V0KClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnRpbWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpbWVyID0gbnVsbFxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7ov5vluqbmnaFcclxuICAgICAqIEBwYXJhbSBhY3REYXRhIFxyXG4gICAgICovXHJcbiAgICBzZXRQcm9ncmVzcyhkYXRhOmFueSkge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSBkYXRhLnB1dF9jb2RlLyBkYXRhLnRocmVlX2NvZGVcclxuICAgICAgICBpZighZGF0YS50aHJlZV9jb2RlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyA9IDBcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGN1cnJlbnQgPSBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihkYXRhLnB1dF9jb2RlKSB8fCBcIjBcIlxyXG4gICAgICAgIGxldCBhbGwgPSBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihkYXRhLnRocmVlX2NvZGUpfHwgXCIwXCJcclxuICAgICAgICB0aGlzLndpblByb2dyZXNzLnN0cmluZyA9IGAke2N1cnJlbnR9LyR7YWxsfTwvYz5gXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBwcml2YXRlIGNoYW5nZVJlY2VpdmVTdGF0ZShsZXZlbClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnJlYWNoQ2ZnW2xldmVsLTFdID09PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yZWFjaENmZ1tsZXZlbC0xXSA9IDFcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tJc0FueU5vdFJlY2VpdmUoKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnJlYWNoQ2ZnLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgIGVsZW1lbnQgPSB0aGlzLnJlYWNoQ2ZnW2luZGV4XTtcclxuICAgICAgICAgICAgaWYoIWVsZW1lbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc3Bvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2xpY2tOb2RlID0gbnVsbFxyXG4gICAgICAgIHRoaXMubGV2ZWxDZmcgPSBbXVxyXG4gICAgICAgIHRoaXMucmVhY2hDZmcgPSBbXVxyXG4gICAgICAgIHRoaXMubW9kZWwub2ZmKFJlY2hhcmdlR2lmdE1vZGVsLkdldExpbWl0VGltZUZpcnN0UGF5QWN0aXZpdHlQb2ludFJlcSwgdGhpcywgdGhpcy5vbkdldEF3YXJkKTtcclxuICAgICAgICB0aGlzLm1vZGVsLm9mZihSZWNoYXJnZUdpZnRNb2RlbC5HZXRMaW1pdFRpbWVGaXJzdFBheUFjdGl2aXR5Q2ZnLCB0aGlzLCB0aGlzLm9uR2V0Q29uZmlnKTtcclxuICAgICAgICBjYy5nYW1lLm9mZihjYy5nYW1lLkVWRU5UX1NIT1csIHRoaXMuc2V0VGltZXIsIHRoaXMpO1xyXG4gICAgfVxyXG4gIFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBUaW1lTGltaXRlZEJveFN0YXRlXHJcbntcclxuICAgIC8qKuW4uOinhCDkuI3lj6/ngrnlh7sqL1xyXG4gICAgTm9ybWFsID0gMCwgXHJcbiAgICAvKirpq5jkuq4g5Y+v54K55Ye7Ki9cclxuICAgIFRvZGF5QWNoaWV2ZWQgPSAxLFxyXG4gICAgLyoq5bey6aKG5Y+WICovXHJcbiAgICBBbHJlYWR5R290ID0gMixcclxuICAgIFxyXG59XHJcbiJdfQ==