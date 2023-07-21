
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Activity/rechargeGift/RechargeGiftView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxBY3Rpdml0eVxccmVjaGFyZ2VHaWZ0XFxSZWNoYXJnZUdpZnRWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlEQUFvRDtBQUNwRCxvRkFBK0U7QUFDL0UsMERBQXVFO0FBRXZFO0lBQThDLG9DQUFRO0lBQXREO1FBQUEscUVBOE5DO1FBck5XLGNBQVEsR0FBWSxJQUFJLENBQUE7UUFDeEIsZUFBUyxHQUFVLDhEQUE4RCxDQUFBOztJQW9ON0YsQ0FBQztJQWxNYSxtQ0FBUSxHQUFsQjtRQUVJLElBQUksQ0FBQyxLQUFLLEdBQXNCLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFbEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsMkJBQWlCLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsMkJBQWlCLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFN0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLG9DQUFvQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNqRixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsd0NBQXdDLEVBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzNGLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQywrQ0FBK0MsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUYsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsbURBQW1ELEVBQUUsSUFBSSxDQUFD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QyxHQUFHLENBQUMsMkJBQWlCLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0E5TkEsQUE4TkMsQ0E5TjZDLGtCQUFRLEdBOE5yRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvdWkvVmlld0Jhc2VcIjtcclxuaW1wb3J0IFJlY2hhcmdlR2lmdE1vZGVsIGZyb20gXCIuLi8uLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1JlY2hhcmdlR2lmdE1vZGVsXCI7XHJcbmltcG9ydCB7IEFjdGl2aXR5Q29uc3RhbnRzLCBBY3Rpdml0eVR5cGUgfSBmcm9tIFwiLi4vQWN0aXZpdHlDb25zdGFudHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY2hhcmdlR2lmdFZpZXcgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBtb2RlbDogUmVjaGFyZ2VHaWZ0TW9kZWxcclxuICAgIHByaXZhdGUgdGltZUxhYmVsOmNjLkxhYmVsXHJcbiAgICBwcml2YXRlIHByb2Nlc3NMYWJlbDpjYy5SaWNoVGV4dFxyXG4gICAgcHJpdmF0ZSBwcm9ncmVzc0Jhck1hc2s6Y2MuTm9kZVxyXG4gICAgcHJpdmF0ZSBwcm9ncmVzc0JhclNwcml0ZTpjYy5Ob2RlXHJcblxyXG4gICAgcHJpdmF0ZSBwYW5lbCA6Y2MuTm9kZVxyXG4gICAgcHJpdmF0ZSBmaW5pc2hlZCA6Ym9vbGVhbiA9IHRydWVcclxuICAgIHByaXZhdGUgZm9ybWF0U3RyOnN0cmluZyA9IFwiPGk+PGNvbG9yPSNGRkY3OTk+6LWi5Y+W6L+b5bqmOiA8L2M+PC9pPjxpPjxjb2xvcj0jRkZGMTAwPiVzPC9jPjwvaT5cIlxyXG4gICAgcHJpdmF0ZSBwcm9ncmVzc0xhYmVsMTpjYy5MYWJlbFxyXG4gICAgcHJpdmF0ZSBwcm9ncmVzc0xhYmVsMjpjYy5MYWJlbFxyXG4gICAgcHJpdmF0ZSBwcm9ncmVzc0xhYmVsMzpjYy5MYWJlbFxyXG4gICAgcHJpdmF0ZSBwcm9ncmVzc0xhYmVsNDpjYy5MYWJlbFxyXG5cclxuICAgIHByaXZhdGUgbWluUmVjaGFyZ2VMYWJlbDpjYy5MYWJlbFxyXG4gICAgcHJpdmF0ZSByZXdhcmRMYWJlbDpjYy5MYWJlbFxyXG5cclxuICAgIHByaXZhdGUgam9pbkNvbmRpdGlvbkxhYmVsIDpjYy5MYWJlbFxyXG4gICAgcHJpdmF0ZSBnZXRBd2FyZENvbmRpdGlvbkxhYmVsIDpjYy5MYWJlbFxyXG5cclxuXHJcbiAgICBwcml2YXRlIGJveFNwaW5lOnNwLlNrZWxldG9uXHJcbiAgICBwcml2YXRlIGJveE9wZW46Y2MuTm9kZVxyXG4gICAgcHJpdmF0ZSBib3hDbG9zZTpjYy5Ob2RlXHJcbiAgICBwcml2YXRlIGZpbmlzaFNwcml0ZTpjYy5Ob2RlXHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IDxSZWNoYXJnZUdpZnRNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiUmVjaGFyZ2VHaWZ0TW9kZWxcIik7XHJcblxyXG4gICAgICAgIHRoaXMubW9kZWwub24oUmVjaGFyZ2VHaWZ0TW9kZWwuR2V0QXdhcmQsIHRoaXMsIHRoaXMub25HZXRBd2FyZCk7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5vbihSZWNoYXJnZUdpZnRNb2RlbC5HZXRDZmcsIHRoaXMsIHRoaXMub25HZXRDZmcpO1xyXG5cclxuICAgICAgICB0aGlzLnRpbWVMYWJlbCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwic3BpbmVuTm9kZS9wYW5lbC9jb250ZW50L3RpbWVMYWJlbFwiLGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMucHJvY2Vzc0xhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJzcGluZW5Ob2RlL3BhbmVsL2F3YXJkQ29udGVudC9wcm9ncmVzc1wiLGNjLlJpY2hUZXh0KVxyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJNYXNrID0gY2MuZmluZChcInNwaW5lbk5vZGUvcGFuZWwvYXdhcmRDb250ZW50L3Byb2dyZXNzQmFyTWFza1wiLCB0aGlzLm5vZGUpXHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0JhclNwcml0ZSA9IGNjLmZpbmQoXCJzcGluZW5Ob2RlL3BhbmVsL2F3YXJkQ29udGVudC9wcm9ncmVzc0Jhck1hc2svYmFyXCIsIHRoaXMubm9kZSlcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmpvaW5Db25kaXRpb25MYWJlbCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwic3BpbmVuTm9kZS9wYW5lbC9jb250ZW50L2NvbnRpb25MYWJlbFwiLGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMuZ2V0QXdhcmRDb25kaXRpb25MYWJlbCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwic3BpbmVuTm9kZS9wYW5lbC9jb250ZW50L0F3YXJkVGlwc1wiLGNjLkxhYmVsKVxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICB0aGlzLnBhbmVsID0gdGhpcy5nZXRDaGlsZChcInNwaW5lbk5vZGUvcGFuZWxcIilcclxuICAgICAgICB0aGlzLnByb2dyZXNzTGFiZWwxID0gdGhpcy5nZXRDb21wb25lbnQoXCJzcGluZW5Ob2RlL3BhbmVsL2F3YXJkQ29udGVudC9OdW1MYWJlbDFcIixjYy5MYWJlbClcclxuICAgICAgICB0aGlzLnByb2dyZXNzTGFiZWwyID0gdGhpcy5nZXRDb21wb25lbnQoXCJzcGluZW5Ob2RlL3BhbmVsL2F3YXJkQ29udGVudC9OdW1MYWJlbDJcIixjYy5MYWJlbClcclxuICAgICAgICB0aGlzLnByb2dyZXNzTGFiZWwzID0gdGhpcy5nZXRDb21wb25lbnQoXCJzcGluZW5Ob2RlL3BhbmVsL2F3YXJkQ29udGVudC9OdW1MYWJlbDNcIixjYy5MYWJlbClcclxuICAgICAgICB0aGlzLnByb2dyZXNzTGFiZWw0ID0gdGhpcy5nZXRDb21wb25lbnQoXCJzcGluZW5Ob2RlL3BhbmVsL2F3YXJkQ29udGVudC9OdW1MYWJlbDRcIixjYy5MYWJlbClcclxuICAgICAgICB0aGlzLnJld2FyZExhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJzcGluZW5Ob2RlL3BhbmVsL1RpcFNwL2F3YXJkXCIsY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5taW5SZWNoYXJnZUxhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJzcGluZW5Ob2RlL3BhbmVsL1RpcFNwL21pblwiLGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMuZmluaXNoU3ByaXRlID0gY2MuZmluZChcInNwaW5lbk5vZGUvcGFuZWwvYXdhcmRDb250ZW50L2ZpbmlzaFNwcml0ZVwiLCB0aGlzLm5vZGUpXHJcbiAgICAgICBcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwic3BpbmVuTm9kZS9wYW5lbC9nZXRBd2FyZFwiLHRoaXMucmVxR2V0QXdhcmQsdGhpcylcclxuXHJcbiAgICAgICAgaWYoR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5pc1B1cnBsZSB8fCBHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLmlzQmx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYm94U3BpbmUgPSB0aGlzLmdldENvbXBvbmVudChcInNwaW5lbk5vZGUvcGFuZWwvYm94XCIsc3AuU2tlbGV0b24pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYm94T3BlbiA9IHRoaXMuZ2V0Q2hpbGQoXCJzcGluZW5Ob2RlL3BhbmVsL2JveC9ieF9vcGVuXCIpXHJcbiAgICAgICAgICAgIGlmKHRoaXMuYm94T3Blbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib3hPcGVuLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5ib3hDbG9zZSA9IHRoaXMuZ2V0Q2hpbGQoXCJzcGluZW5Ob2RlL3BhbmVsL2JveC9ieF9jbG9zZVwiKVxyXG4gICAgICAgICAgICBpZih0aGlzLmJveENsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJveENsb3NlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1BhbmVsKCkge1xyXG4gICAgICAgIHRoaXMucGFuZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvblN1YlZpZXdTaG93KCkge1xyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5tb2RlbC5yZXFHZXRBY3Rpdml0eUNmZyhmYWxzZSlcclxuICAgICAgICB0aGlzLnNob3dQYW5lbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25HZXRDZmcoZGF0YSkge1xyXG4gICAgICAgIGlmKGRhdGEgPT0gbnVsbCkgcmV0dXJuXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEFjdGl2aXR5Q29uc3RhbnRzLlNIT1dfQUNUX1dBSVRUSU5HLCBmYWxzZSlcclxuICAgICAgICBsZXQgYXJyID0gZGF0YS5kYXRhXHJcbiAgICAgICAgaWYoYXJyID09IG51bGwpIHJldHVyblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKGFycltpbmRleF0uYXR5cGUgPT0gQWN0aXZpdHlUeXBlLnJlY2hhcmdlR2lmdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TZXRBd2FyZExhYmVsKGFycltpbmRleF0uY2ZnKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5TZXRCdG5TdGF0ZShhcnJbaW5kZXhdLmNmZylcclxuICAgICAgICAgICAgICAgIGxldCBudW0gOm51bWJlciA9IEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50KGFycltpbmRleF0uY2ZnLmxvc3Nfc3VtKVxyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gKG51bSAvR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnQoYXJyW2luZGV4XS5jZmcubG9zc19taXgpKVxyXG4gICAgICAgICAgICAgICAgaWYodmFsdWU+PTEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5wcm9jZXNzTGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzTGFiZWwuc3RyaW5nID0gXCLlt7LlrozmiJDmtLvliqjvvIzor7fpooblj5blpZblirFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NMYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZmluaXNoU3ByaXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoU3ByaXRlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TZXRCb3hTcHJpdGUodHJ1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnByb2Nlc3NMYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG1wc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnQoYXJyW2luZGV4XS5jZmcubG9zc19zdW0pK1wiL1wiK0dsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50KGFycltpbmRleF0uY2ZnLmxvc3NfbWl4KS50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0xhYmVsLnN0cmluZyA9IGNjLmpzLmZvcm1hdFN0cih0aGlzLmZvcm1hdFN0cix0bXBzdHJpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0xhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmZpbmlzaFNwcml0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaFNwcml0ZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5pc1B1cnBsZSAmJiB0aGlzLmJveFNwaW5lKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3hTcGluZS5zZXRDb21wbGV0ZUxpc3RlbmVyKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJveFNwaW5lLnNldEFuaW1hdGlvbigwLFwiaWRsZV9BcHBlYXJMb29wXCIsdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5ib3hDbG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3hDbG9zZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5ib3hPcGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJveE9wZW4uYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnByb2Nlc3NCYXIucHJvZ3Jlc3MgPSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0Jhck1hc2sud2lkdGggPSAgdGhpcy5wcm9ncmVzc0JhclNwcml0ZS53aWR0aCp2YWx1ZVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihhcnJbaW5kZXhdLmNmZy5lbmRfdGltZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVMYWJlbC5zdHJpbmcgPSBcIumVv+acn+acieaViFwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVMYWJlbC5zdHJpbmcgPWFycltpbmRleF0uY2ZnLnN0YXJ0X3RpbWUgKyBcIn5cIisgYXJyW2luZGV4XS5jZmcuZW5kX3RpbWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5qb2luQ29uZGl0aW9uTGFiZWwuc3RyaW5nID1HbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludChhcnJbaW5kZXhdLmNmZy5wYXlfbWl4KSArXCJ5XCJcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0QXdhcmRDb25kaXRpb25MYWJlbC5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludChhcnJbaW5kZXhdLmNmZy5sb3NzX21peCkgK1wieVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgU2V0QXdhcmRMYWJlbChjZmc6IGFueSkge1xyXG4gICAgICAgIGxldCBsaW1pdCA9IEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50KGNmZy5sb3NzX21peClcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbnVtID0gTWF0aC5mbG9vcihsaW1pdC8zMDAwKVxyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NMYWJlbDEuc3RyaW5nID0gXCIwXCJcclxuICAgICAgICB0aGlzLnByb2dyZXNzTGFiZWwyLnN0cmluZyA9ICgxMDAwKm51bSkudG9TdHJpbmcoKVxyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NMYWJlbDMuc3RyaW5nID0gKDEwMDAqbnVtKjIpLnRvU3RyaW5nKClcclxuICAgICAgICB0aGlzLnByb2dyZXNzTGFiZWw0LnN0cmluZyA9IGxpbWl0LnRvU3RyaW5nKClcclxuXHJcbiAgICAgICAgdGhpcy5taW5SZWNoYXJnZUxhYmVsLnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50KGNmZy5wYXlfbWl4KS50b1N0cmluZygpXHJcbiAgICAgICAgdGhpcy5yZXdhcmRMYWJlbC5zdHJpbmcgPSAgR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnQoY2ZnLnBvaW50KS50b1N0cmluZygpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBTZXRCdG5TdGF0ZShkYXRhKSB7XHJcbiAgICAgICAgaWYoZGF0YS5wYXlfc3VtPGRhdGEucGF5X21peCB8fCBkYXRhLmxvc3Nfc3VtPGRhdGEubG9zc19taXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmZpbmlzaGVkID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5maW5pc2hlZCA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBTZXRCb3hTcHJpdGUob3Blbikge1xyXG4gICAgICAgIGlmKG9wZW4pIHtcclxuICAgICAgICAgICAgaWYoR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5pc1B1cnBsZSAmJiB0aGlzLmJveFNwaW5lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJveFNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJveFNwaW5lLmNsZWFyVHJhY2soMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJveFNwaW5lLnNldEFuaW1hdGlvbigwLFwiaWRsZV9PTkxvb3BcIix0cnVlKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYm94Q2xvc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJveENsb3NlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmJveE9wZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJveE9wZW4uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVxR2V0QXdhcmQoKSB7XHJcbiAgICAgICAgaWYodGhpcy5maW5pc2hlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwucmVxUmVjZWl2ZUFjdGl2aXR5QXdhcmQoQWN0aXZpdHlUeXBlLnJlY2hhcmdlR2lmdClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLlpZblirHlnKjmgqjlrozmiJDku7vliqHlkI7miY3og73pooblj5blk6bvvIFcIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkdldEF3YXJkKGF3YXJkRGF0YSkge1xyXG4gICAgICAgIGlmKGF3YXJkRGF0YSAmJiBhd2FyZERhdGEuYXR5cGUgIT0gQWN0aXZpdHlUeXBlLnJlY2hhcmdlR2lmdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIHRoaXMubW9kZWwuU3dpdGNoID0gZmFsc2VcclxuICAgICAgICBHbG9iYWwuVUkuZ2V0V2luZG93KFwiV25kQWN0aXZpdHlDZW50ZXJcIikuY2xvc2UoKTtcclxuICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZFJlYmF0ZUdldFwiLCBhd2FyZERhdGEuYXdhcmQpO1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChBY3Rpdml0eUNvbnN0YW50cy5ISURFX1JFRF9QT1JULGF3YXJkRGF0YS5hdHlwZSlcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMubW9kZWwub2ZmKFJlY2hhcmdlR2lmdE1vZGVsLkdldEF3YXJkLCB0aGlzLCB0aGlzLm9uR2V0QXdhcmQpO1xyXG4gICAgICAgIHRoaXMubW9kZWwub2ZmKFJlY2hhcmdlR2lmdE1vZGVsLkdldENmZywgdGhpcywgdGhpcy5vbkdldENmZyk7XHJcbiAgICB9XHJcbn0iXX0=