"use strict";
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