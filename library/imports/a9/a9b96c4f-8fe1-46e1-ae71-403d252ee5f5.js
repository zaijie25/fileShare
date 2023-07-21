"use strict";
cc._RF.push(module, 'a9b96xPj+FG4a5xQD0lLuX1', 'RechargeGiftView');
// hall/scripts/logic/hall/ui/Activity/rechargeGift/RechargeGiftView.ts

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
var ViewBase_1 = require("../../../../core/ui/ViewBase");
var RechargeGiftModel_1 = require("../../../../hallcommon/model/RechargeGiftModel");
var ActivityConstants_1 = require("../ActivityConstants");
var RechargeGiftView = /** @class */ (function (_super) {
    __extends(RechargeGiftView, _super);
    function RechargeGiftView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.finished = true;
        _this.formatStr = "<i><color=#FFF799>赢取进度: </c></i><i><color=#FFF100>%s</c></i>";
        return _this;
    }
    RechargeGiftView.prototype.initView = function () {
        this.model = Global.ModelManager.getModel("RechargeGiftModel");
        this.model.on(RechargeGiftModel_1.default.GetAward, this, this.onGetAward);
        this.model.on(RechargeGiftModel_1.default.GetCfg, this, this.onGetCfg);
        this.timeLabel = this.getComponent("spinenNode/panel/content/timeLabel", cc.Label);
        this.processLabel = this.getComponent("spinenNode/panel/awardContent/progress", cc.RichText);
        this.progressBarMask = cc.find("spinenNode/panel/awardContent/progressBarMask", this.node);
        this.progressBarSprite = cc.find("spinenNode/panel/awardContent/progressBarMask/bar", this.node);
        this.joinConditionLabel = this.getComponent("spinenNode/panel/content/contionLabel", cc.Label);
        this.getAwardConditionLabel = this.getComponent("spinenNode/panel/content/AwardTips", cc.Label);
        this.panel = this.getChild("spinenNode/panel");
        this.progressLabel1 = this.getComponent("spinenNode/panel/awardContent/NumLabel1", cc.Label);
        this.progressLabel2 = this.getComponent("spinenNode/panel/awardContent/NumLabel2", cc.Label);
        this.progressLabel3 = this.getComponent("spinenNode/panel/awardContent/NumLabel3", cc.Label);
        this.progressLabel4 = this.getComponent("spinenNode/panel/awardContent/NumLabel4", cc.Label);
        this.rewardLabel = this.getComponent("spinenNode/panel/TipSp/award", cc.Label);
        this.minRechargeLabel = this.getComponent("spinenNode/panel/TipSp/min", cc.Label);
        this.finishSprite = cc.find("spinenNode/panel/awardContent/finishSprite", this.node);
        this.addCommonClick("spinenNode/panel/getAward", this.reqGetAward, this);
        if (Global.Setting.SkinConfig.isPurple || Global.Setting.SkinConfig.isBlue) {
            this.boxSpine = this.getComponent("spinenNode/panel/box", sp.Skeleton);
        }
        else {
            this.boxOpen = this.getChild("spinenNode/panel/box/bx_open");
            if (this.boxOpen) {
                this.boxOpen.active = false;
            }
            this.boxClose = this.getChild("spinenNode/panel/box/bx_close");
            if (this.boxClose) {
                this.boxClose.active = false;
            }
        }
    };
    RechargeGiftView.prototype.showPanel = function () {
        this.panel.active = true;
    };
    RechargeGiftView.prototype.onSubViewShow = function () {
        this.model.reqGetActivityCfg(false);
        this.showPanel();
    };
    RechargeGiftView.prototype.onGetCfg = function (data) {
        var _this = this;
        if (data == null)
            return;
        Global.Event.event(ActivityConstants_1.ActivityConstants.SHOW_ACT_WAITTING, false);
        var arr = data.data;
        if (arr == null)
            return;
        for (var index = 0; index < arr.length; index++) {
            if (arr[index].atype == ActivityConstants_1.ActivityType.rechargeGift) {
                this.SetAwardLabel(arr[index].cfg);
                this.SetBtnState(arr[index].cfg);
                var num = Global.Toolkit.formatPoint(arr[index].cfg.loss_sum);
                var value = (num / Global.Toolkit.formatPoint(arr[index].cfg.loss_mix));
                if (value >= 1) {
                    value = 1;
                    if (this.processLabel) {
                        this.processLabel.string = "已完成活动，请领取奖励";
                        this.processLabel.node.active = false;
                    }
                    if (this.finishSprite) {
                        this.finishSprite.active = true;
                    }
                    this.SetBoxSprite(true);
                }
                else {
                    if (this.processLabel) {
                        var tmpstring = Global.Toolkit.formatPoint(arr[index].cfg.loss_sum) + "/" + Global.Toolkit.formatPoint(arr[index].cfg.loss_mix).toString();
                        this.processLabel.string = cc.js.formatStr(this.formatStr, tmpstring);
                        this.processLabel.node.active = true;
                    }
                    if (this.finishSprite) {
                        this.finishSprite.active = false;
                    }
                    if (Global.Setting.SkinConfig.isPurple && this.boxSpine) {
                        this.boxSpine.setCompleteListener(function () {
                            _this.boxSpine.setAnimation(0, "idle_AppearLoop", true);
                        });
                    }
                    else {
                        if (this.boxClose) {
                            this.boxClose.active = true;
                        }
                        if (this.boxOpen) {
                            this.boxOpen.active = false;
                        }
                    }
                }
                // this.processBar.progress = value
                this.progressBarMask.width = this.progressBarSprite.width * value;
                if (arr[index].cfg.end_time.length === 0) {
                    this.timeLabel.string = "长期有效";
                }
                else {
                    this.timeLabel.string = arr[index].cfg.start_time + "~" + arr[index].cfg.end_time;
                }
                this.joinConditionLabel.string = Global.Toolkit.formatPoint(arr[index].cfg.pay_mix) + "y";
                this.getAwardConditionLabel.string = Global.Toolkit.formatPoint(arr[index].cfg.loss_mix) + "y";
            }
        }
    };
    RechargeGiftView.prototype.SetAwardLabel = function (cfg) {
        var limit = Global.Toolkit.formatPoint(cfg.loss_mix);
        var num = Math.floor(limit / 3000);
        this.progressLabel1.string = "0";
        this.progressLabel2.string = (1000 * num).toString();
        this.progressLabel3.string = (1000 * num * 2).toString();
        this.progressLabel4.string = limit.toString();
        this.minRechargeLabel.string = Global.Toolkit.formatPoint(cfg.pay_mix).toString();
        this.rewardLabel.string = Global.Toolkit.formatPoint(cfg.point).toString();
    };
    RechargeGiftView.prototype.SetBtnState = function (data) {
        if (data.pay_sum < data.pay_mix || data.loss_sum < data.loss_mix) {
            this.finished = false;
        }
        else {
            this.finished = true;
        }
    };
    RechargeGiftView.prototype.SetBoxSprite = function (open) {
        var _this = this;
        if (open) {
            if (Global.Setting.SkinConfig.isPurple && this.boxSpine) {
                this.boxSpine.setCompleteListener(function () {
                    _this.boxSpine.clearTrack(0);
                    _this.boxSpine.setAnimation(0, "idle_ONLoop", true);
                });
            }
            else {
                if (this.boxClose) {
                    this.boxClose.active = false;
                }
                if (this.boxOpen) {
                    this.boxOpen.active = true;
                }
            }
        }
    };
    RechargeGiftView.prototype.reqGetAward = function () {
        if (this.finished) {
            this.model.reqReceiveActivityAward(ActivityConstants_1.ActivityType.rechargeGift);
        }
        else {
            Global.UI.fastTip("奖励在您完成任务后才能领取哦！");
        }
    };
    RechargeGiftView.prototype.onGetAward = function (awardData) {
        if (awardData && awardData.atype != ActivityConstants_1.ActivityType.rechargeGift) {
            return;
        }
        this.model.Switch = false;
        Global.UI.getWindow("WndActivityCenter").close();
        Global.UI.show("WndRebateGet", awardData.award);
        Global.Event.event(ActivityConstants_1.ActivityConstants.HIDE_RED_PORT, awardData.atype);
    };
    RechargeGiftView.prototype.onDispose = function () {
        this.model.off(RechargeGiftModel_1.default.GetAward, this, this.onGetAward);
        this.model.off(RechargeGiftModel_1.default.GetCfg, this, this.onGetCfg);
    };
    return RechargeGiftView;
}(ViewBase_1.default));
exports.default = RechargeGiftView;

cc._RF.pop();