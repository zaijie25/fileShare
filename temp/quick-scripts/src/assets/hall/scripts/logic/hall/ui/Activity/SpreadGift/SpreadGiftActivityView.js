"use strict";
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