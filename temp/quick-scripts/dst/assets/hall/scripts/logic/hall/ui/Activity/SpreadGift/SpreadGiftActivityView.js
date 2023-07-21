
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Activity/SpreadGift/SpreadGiftActivityView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f9d46nLm+NIb6z7jyBw26rY', 'SpreadGiftActivityView');
// hall/scripts/logic/hall/ui/Activity/SpreadGift/SpreadGiftActivityView.ts

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
exports.RedPackState = void 0;
var YXButton_1 = require("../../../../core/component/YXButton");
var ViewBase_1 = require("../../../../core/ui/ViewBase");
var RechargeGiftModel_1 = require("../../../../hallcommon/model/RechargeGiftModel");
var ActivityConstants_1 = require("../ActivityConstants");
var SpreadGiftItemView_1 = require("./SpreadGiftItemView");
var SpreadGiftActivityView = /** @class */ (function (_super) {
    __extends(SpreadGiftActivityView, _super);
    function SpreadGiftActivityView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.achieveIndex = -1;
        return _this;
    }
    SpreadGiftActivityView.prototype.initView = function () {
        this.model = Global.ModelManager.getModel("RechargeGiftModel");
        this.model.on(RechargeGiftModel_1.default.GetAward, this, this.onGetAward);
        this.model.on(RechargeGiftModel_1.default.GetCfg, this, this.onGetConfig);
        this.personLabel = this.getComponent("count", cc.RichText);
        this.monthAwardLabel = this.getComponent("monthAward", cc.Label);
        this.rechargePointLabel = this.getComponent("rechargePoint", cc.Label);
        for (var index = 0; index < 7; index++) {
            this.addCommonClick(cc.js.formatStr("sco/view/awardPanel/redPack_%s", index), this.onAwardBtnClicked, this);
        }
        this.sc0Node = this.getComponent("sco", cc.ScrollView);
        this.addCommonClick("sco/clickLeft", this.onClickLeftSco, this);
        this.addCommonClick("sco/clickReight", this.onClickReightSco, this);
        this.clickLeft = this.getChild("sco/clickLeft");
        this.clickReight = this.getChild("sco/clickReight");
        this.sc0Node.node.on("scroll-to-left", this.onClickLeftSco, this);
        this.sc0Node.node.on("scroll-to-right", this.onClickReightSco, this);
        this.onClickLeftSco();
    };
    SpreadGiftActivityView.prototype.onClickLeftSco = function () {
        this.clickLeft.getComponent(YXButton_1.default).interactable = false;
        this.sc0Node.scrollToLeft(0.5);
        this.clickReight.getComponent(YXButton_1.default).interactable = true;
    };
    SpreadGiftActivityView.prototype.onClickReightSco = function () {
        this.clickReight.getComponent(YXButton_1.default).interactable = false;
        this.sc0Node.scrollToRight(0.5);
        this.clickLeft.getComponent(YXButton_1.default).interactable = true;
    };
    SpreadGiftActivityView.prototype.onAwardBtnClicked = function (target) {
        this.model.reqReceiveActivityAward(ActivityConstants_1.ActivityType.spreadAward);
    };
    SpreadGiftActivityView.prototype.onSubViewShow = function () {
        this.model.reqGetActivityCfg(false);
    };
    SpreadGiftActivityView.prototype.onGetAward = function (awardData) {
        if (awardData && awardData.atype != ActivityConstants_1.ActivityType.spreadAward) {
            return;
        }
        Global.UI.show("WndRebateGet", awardData.award);
        var giftItem = this.getComponent(cc.js.formatStr("sco/view/awardPanel/redPack_%s", this.achieveIndex), SpreadGiftItemView_1.default);
        if (giftItem) {
            giftItem.RefreshState(RedPackState.Open, null);
        }
        Global.Event.event(ActivityConstants_1.ActivityConstants.HIDE_RED_PORT, awardData.atype);
    };
    SpreadGiftActivityView.prototype.onDispose = function () {
        this.model.off(RechargeGiftModel_1.default.GetAward, this, this.onGetAward);
        this.model.off(RechargeGiftModel_1.default.GetCfg, this, this.onGetConfig);
    };
    SpreadGiftActivityView.prototype.onGetConfig = function (data) {
        if (data == null)
            return;
        Global.Event.event(ActivityConstants_1.ActivityConstants.SHOW_ACT_WAITTING, false);
        var arr = data.data;
        if (arr == null)
            return;
        for (var index = 0; index < arr.length; index++) {
            if (arr[index].atype == ActivityConstants_1.ActivityType.spreadAward) {
                var actData = arr[index].cfg;
                this.achieveIndex = actData.doc;
                this.personLabel.string = cc.js.formatStr("<b>%s人</b>", actData.num);
                this.rechargePointLabel.string = Global.Toolkit.formatPointStr(actData.pay);
                for (var index_1 = 0; index_1 < actData.list.length; index_1++) {
                    var element = actData.list[index_1];
                    var redPackState = this.getSpreadGiftItemState(actData.doc, index_1);
                    var giftItem = this.getComponent(cc.js.formatStr("sco/view/awardPanel/redPack_%s", index_1), SpreadGiftItemView_1.default);
                    if (giftItem) {
                        giftItem.RefreshState(redPackState, element);
                    }
                    if (index_1 == actData.list.length - 1) {
                        this.monthAwardLabel.string = Global.Toolkit.formatPointStr(actData.list[index_1].point);
                    }
                }
            }
        }
    };
    SpreadGiftActivityView.prototype.getSpreadGiftItemState = function (index, dataIndex) {
        if (index === -1) {
            return RedPackState.Normal;
        }
        if (index === dataIndex) {
            return RedPackState.HightLight;
        }
        return RedPackState.Normal;
    };
    return SpreadGiftActivityView;
}(ViewBase_1.default));
exports.default = SpreadGiftActivityView;
var RedPackState;
(function (RedPackState) {
    RedPackState[RedPackState["Normal"] = 0] = "Normal";
    RedPackState[RedPackState["HightLight"] = 1] = "HightLight";
    RedPackState[RedPackState["Open"] = 2] = "Open";
    RedPackState[RedPackState["None"] = 3] = "None";
})(RedPackState = exports.RedPackState || (exports.RedPackState = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxBY3Rpdml0eVxcU3ByZWFkR2lmdFxcU3ByZWFkR2lmdEFjdGl2aXR5Vmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQTJEO0FBQzNELHlEQUFvRDtBQUNwRCxvRkFBK0U7QUFDL0UsMERBQXVFO0FBQ3ZFLDJEQUFzRDtBQUd0RDtJQUFvRCwwQ0FBUTtJQUE1RDtRQUFBLHFFQXdIQztRQW5IVyxrQkFBWSxHQUFHLENBQUMsQ0FBQyxDQUFBOztJQW1IN0IsQ0FBQztJQTdHYSx5Q0FBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQXNCLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFbEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsMkJBQWlCLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsMkJBQWlCLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDekQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDL0QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNyRSxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFB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M0Q7O0FBRUQsSUFBWSxZQU1YO0FBTkQsV0FBWSxZQUFZO0lBRXBCLG1EQUFVLENBQUE7SUFDViwyREFBYyxDQUFBO0lBQ2QsK0NBQVEsQ0FBQTtJQUNSLCtDQUFRLENBQUE7QUFDWixDQUFDLEVBTlcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFNdkIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgWVhCdXR0b24gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvY29tcG9uZW50L1lYQnV0dG9uXCI7XHJcbmltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS91aS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgUmVjaGFyZ2VHaWZ0TW9kZWwgZnJvbSBcIi4uLy4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvUmVjaGFyZ2VHaWZ0TW9kZWxcIjtcclxuaW1wb3J0IHsgQWN0aXZpdHlDb25zdGFudHMsIEFjdGl2aXR5VHlwZSB9IGZyb20gXCIuLi9BY3Rpdml0eUNvbnN0YW50c1wiO1xyXG5pbXBvcnQgU3ByZWFkR2lmdEl0ZW1WaWV3IGZyb20gXCIuL1NwcmVhZEdpZnRJdGVtVmlld1wiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcmVhZEdpZnRBY3Rpdml0eVZpZXcgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBtb2RlbDogUmVjaGFyZ2VHaWZ0TW9kZWxcclxuICAgIHByaXZhdGUgcGVyc29uTGFiZWwgOmNjLlJpY2hUZXh0XHJcbiAgICBwcml2YXRlIHJlY2hhcmdlUG9pbnRMYWJlbCA6Y2MuTGFiZWxcclxuICAgIHByaXZhdGUgYWNoaWV2ZUluZGV4ID0gLTFcclxuICAgIHByaXZhdGUgbW9udGhBd2FyZExhYmVsOmNjLkxhYmVsXHJcbiAgICBwcml2YXRlIHNjME5vZGU6IGNjLlNjcm9sbFZpZXdcclxuICAgIHByaXZhdGUgY2xpY2tMZWZ0OiBjYy5Ob2RlXHJcbiAgICBwcml2YXRlIGNsaWNrUmVpZ2h0OiBjYy5Ob2RlXHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSA8UmVjaGFyZ2VHaWZ0TW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlJlY2hhcmdlR2lmdE1vZGVsXCIpO1xyXG5cclxuICAgICAgICB0aGlzLm1vZGVsLm9uKFJlY2hhcmdlR2lmdE1vZGVsLkdldEF3YXJkLCB0aGlzLCB0aGlzLm9uR2V0QXdhcmQpO1xyXG4gICAgICAgIHRoaXMubW9kZWwub24oUmVjaGFyZ2VHaWZ0TW9kZWwuR2V0Q2ZnLCB0aGlzLCB0aGlzLm9uR2V0Q29uZmlnKTtcclxuICAgICAgICB0aGlzLnBlcnNvbkxhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJjb3VudFwiLGNjLlJpY2hUZXh0KVxyXG4gICAgICAgIHRoaXMubW9udGhBd2FyZExhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJtb250aEF3YXJkXCIsY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5yZWNoYXJnZVBvaW50TGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcInJlY2hhcmdlUG9pbnRcIixjYy5MYWJlbClcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgNzsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKGNjLmpzLmZvcm1hdFN0cihcInNjby92aWV3L2F3YXJkUGFuZWwvcmVkUGFja18lc1wiLGluZGV4KSx0aGlzLm9uQXdhcmRCdG5DbGlja2VkLHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2MwTm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50KFwic2NvXCIsIGNjLlNjcm9sbFZpZXcpXHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcInNjby9jbGlja0xlZnRcIiwgdGhpcy5vbkNsaWNrTGVmdFNjbywgdGhpcylcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwic2NvL2NsaWNrUmVpZ2h0XCIsIHRoaXMub25DbGlja1JlaWdodFNjbywgdGhpcylcclxuICAgICAgICB0aGlzLmNsaWNrTGVmdCA9IHRoaXMuZ2V0Q2hpbGQoXCJzY28vY2xpY2tMZWZ0XCIpO1xyXG4gICAgICAgIHRoaXMuY2xpY2tSZWlnaHQgPSB0aGlzLmdldENoaWxkKFwic2NvL2NsaWNrUmVpZ2h0XCIpO1xyXG4gICAgICAgIHRoaXMuc2MwTm9kZS5ub2RlLm9uKFwic2Nyb2xsLXRvLWxlZnRcIix0aGlzLm9uQ2xpY2tMZWZ0U2NvLHRoaXMpXHJcbiAgICAgICAgdGhpcy5zYzBOb2RlLm5vZGUub24oXCJzY3JvbGwtdG8tcmlnaHRcIix0aGlzLm9uQ2xpY2tSZWlnaHRTY28sdGhpcylcclxuICAgICAgICB0aGlzLm9uQ2xpY2tMZWZ0U2NvKCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBvbkNsaWNrTGVmdFNjbygpIHtcclxuICAgICAgICB0aGlzLmNsaWNrTGVmdC5nZXRDb21wb25lbnQoWVhCdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5zYzBOb2RlLnNjcm9sbFRvTGVmdCgwLjUpXHJcbiAgICAgICAgdGhpcy5jbGlja1JlaWdodC5nZXRDb21wb25lbnQoWVhCdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWVcclxuICAgIH1cclxuICAgIG9uQ2xpY2tSZWlnaHRTY28oKSB7XHJcbiAgICAgICAgdGhpcy5jbGlja1JlaWdodC5nZXRDb21wb25lbnQoWVhCdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5zYzBOb2RlLnNjcm9sbFRvUmlnaHQoMC41KVxyXG4gICAgICAgIHRoaXMuY2xpY2tMZWZ0LmdldENvbXBvbmVudChZWEJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZVxyXG4gICAgfVxyXG4gICAgb25Bd2FyZEJ0bkNsaWNrZWQodGFyZ2V0KSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5yZXFSZWNlaXZlQWN0aXZpdHlBd2FyZChBY3Rpdml0eVR5cGUuc3ByZWFkQXdhcmQpXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uU3ViVmlld1Nob3coKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5tb2RlbC5yZXFHZXRBY3Rpdml0eUNmZyhmYWxzZSlcclxuXHJcbiAgICB9XHJcblxyXG4gICBcclxuXHJcbiAgICBwcml2YXRlIG9uR2V0QXdhcmQoYXdhcmREYXRhKSB7XHJcbiAgICAgICAgaWYoYXdhcmREYXRhICYmIGF3YXJkRGF0YS5hdHlwZSAhPSBBY3Rpdml0eVR5cGUuc3ByZWFkQXdhcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRSZWJhdGVHZXRcIiwgYXdhcmREYXRhLmF3YXJkKTtcclxuICAgICAgICBsZXQgZ2lmdEl0ZW0gOlNwcmVhZEdpZnRJdGVtVmlldyA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLmpzLmZvcm1hdFN0cihcInNjby92aWV3L2F3YXJkUGFuZWwvcmVkUGFja18lc1wiLHRoaXMuYWNoaWV2ZUluZGV4KSxTcHJlYWRHaWZ0SXRlbVZpZXcpXHJcbiAgICAgICAgaWYoZ2lmdEl0ZW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnaWZ0SXRlbS5SZWZyZXNoU3RhdGUoUmVkUGFja1N0YXRlLk9wZW4sbnVsbClcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEFjdGl2aXR5Q29uc3RhbnRzLkhJREVfUkVEX1BPUlQsYXdhcmREYXRhLmF0eXBlKVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uRGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLm1vZGVsLm9mZihSZWNoYXJnZUdpZnRNb2RlbC5HZXRBd2FyZCwgdGhpcywgdGhpcy5vbkdldEF3YXJkKTtcclxuICAgICAgICB0aGlzLm1vZGVsLm9mZihSZWNoYXJnZUdpZnRNb2RlbC5HZXRDZmcsIHRoaXMsIHRoaXMub25HZXRDb25maWcpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbkdldENvbmZpZyhkYXRhKSB7XHJcbiAgICAgICAgaWYoZGF0YSA9PSBudWxsKSByZXR1cm5cclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoQWN0aXZpdHlDb25zdGFudHMuU0hPV19BQ1RfV0FJVFRJTkcsIGZhbHNlKVxyXG4gICAgICAgIGxldCBhcnIgPSBkYXRhLmRhdGFcclxuICAgICAgICBpZihhcnIgPT0gbnVsbCkgcmV0dXJuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFyci5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGFycltpbmRleF0uYXR5cGUgPT0gQWN0aXZpdHlUeXBlLnNwcmVhZEF3YXJkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgIGFjdERhdGEgPSBhcnJbaW5kZXhdLmNmZ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY2hpZXZlSW5kZXggPSBhY3REYXRhLmRvY1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucGVyc29uTGFiZWwuc3RyaW5nID0gY2MuanMuZm9ybWF0U3RyKFwiPGI+JXPkuro8L2I+XCIsYWN0RGF0YS5udW0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY2hhcmdlUG9pbnRMYWJlbC5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihhY3REYXRhLnBheSlcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhY3REYXRhLmxpc3QubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBhY3REYXRhLmxpc3RbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZWRQYWNrU3RhdGUgPSB0aGlzLmdldFNwcmVhZEdpZnRJdGVtU3RhdGUoYWN0RGF0YS5kb2MsaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdpZnRJdGVtIDpTcHJlYWRHaWZ0SXRlbVZpZXcgPSB0aGlzLmdldENvbXBvbmVudChjYy5qcy5mb3JtYXRTdHIoXCJzY28vdmlldy9hd2FyZFBhbmVsL3JlZFBhY2tfJXNcIixpbmRleCksU3ByZWFkR2lmdEl0ZW1WaWV3KVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdpZnRJdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2lmdEl0ZW0uUmVmcmVzaFN0YXRlKHJlZFBhY2tTdGF0ZSxlbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihpbmRleCA9PSBhY3REYXRhLmxpc3QubGVuZ3RoIC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb250aEF3YXJkTGFiZWwuc3RyaW5nID0gIEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50U3RyKGFjdERhdGEubGlzdFtpbmRleF0ucG9pbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBnZXRTcHJlYWRHaWZ0SXRlbVN0YXRlKGluZGV4LGRhdGFJbmRleClcclxuICAgIHtcclxuICAgICAgICBpZihpbmRleCA9PT0gLTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gUmVkUGFja1N0YXRlLk5vcm1hbFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpbmRleCA9PT0gZGF0YUluZGV4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFJlZFBhY2tTdGF0ZS5IaWdodExpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBSZWRQYWNrU3RhdGUuTm9ybWFsXHJcblxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGVudW0gUmVkUGFja1N0YXRlXHJcbntcclxuICAgIE5vcm1hbCA9IDAsXHJcbiAgICBIaWdodExpZ2h0ID0gMSxcclxuICAgIE9wZW4gPSAyLFxyXG4gICAgTm9uZSA9IDNcclxufSJdfQ==