"use strict";
cc._RF.push(module, '440f7CndKdNEL9QON/sgMDS', 'FeedbackView');
// hall/scripts/logic/hall/ui/Feedback/FeedbackView.ts

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
var ViewBase_1 = require("../../../core/ui/ViewBase");
var FeedbackConstants_1 = require("./FeedbackConstants");
var FeedbackListItem_1 = require("./FeedbackListItem");
var FeedbackView = /** @class */ (function (_super) {
    __extends(FeedbackView, _super);
    function FeedbackView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentPage = 1;
        return _this;
    }
    FeedbackView.prototype.initView = function () {
        this.feedbackItem = this.getChild("feedbackItem");
        this.label1 = cc.find("label1", this.feedbackItem).getComponent(cc.Label);
        this.label2 = cc.find("label2", this.feedbackItem).getComponent(cc.Label);
        this.content = this.getChild("content");
        this.pageLabel = this.getChild("bottom/currentPage/pageLabel").getComponent(cc.Label);
        this.addCommonClick("bottom/btnNode", this.writeFeedback, this);
        this.addCommonClick("bottom/previous", this.previousPage, this);
        this.addCommonClick("bottom/next", this.nextPage, this);
        this.model = Global.ModelManager.getModel("FeedbackModel");
    };
    FeedbackView.prototype.onSubViewShow = function () {
        this.model.on(FeedbackConstants_1.FeedbackConstants.FeedbackListCallback, this, this.refreshFeedbackList);
        this.model.GetProblemList(this.currentPage);
    };
    FeedbackView.prototype.refreshFeedbackList = function (data) {
        var rightPanelView = Global.UI.getWindow("WndFeedback").getView("RightPanelView");
        this.currentPage = this.model.responePage;
        if (!data || data.length == 0) {
            if (this.currentPage == 1) {
                this.pageLabel.string = 1 + "/" + 1;
                rightPanelView.showNotips(true);
                return;
            }
            else {
                this.model.GetProblemList(--this.currentPage);
            }
        }
        rightPanelView.showNotips(false);
        this.pageLabel.string = this.currentPage + "/" + this.model.totalPage;
        for (var i = 0; i < data.length; i++) {
            var item = cc.instantiate(this.feedbackItem);
            item.active = true;
            var feedItem = item.getComponent(FeedbackListItem_1.default);
            feedItem.onInit(data[i], this.model.responePage);
            this.content.addChild(item);
        }
    };
    FeedbackView.prototype.writeFeedback = function () {
        var rightPanelView = Global.UI.getWindow("WndFeedback").getView("RightPanelView");
        var write = rightPanelView.getView("feedbackShowAndWrite");
        write.setShowOrEdit(0);
        rightPanelView.changeView(FeedbackConstants_1.RightViewType.feedbackShowAndWrite);
    };
    FeedbackView.prototype.previousPage = function () {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.pageLabel.string = this.currentPage + "/" + this.model.totalPage;
            this.clearItem();
            this.model.GetProblemList(this.currentPage);
        }
        else {
            Global.UI.fastTip("已经是第一页了");
        }
    };
    FeedbackView.prototype.nextPage = function () {
        if (this.currentPage < this.model.totalPage) {
            this.currentPage++;
            this.pageLabel.string = this.currentPage + "/" + this.model.totalPage;
            this.clearItem();
            this.model.GetProblemList(this.currentPage);
        }
        else {
            Global.UI.fastTip("当前已经是最大页！");
        }
    };
    FeedbackView.prototype.clearItem = function (isRest) {
        if (isRest === void 0) { isRest = false; }
        this.content.removeAllChildren();
        if (isRest) {
            this.currentPage = 1;
            this.pageLabel.string = this.currentPage + "/" + this.model.totalPage;
        }
    };
    FeedbackView.prototype.onSubViewHide = function () {
        this.model.off(FeedbackConstants_1.FeedbackConstants.FeedbackListCallback, this, this.refreshFeedbackList);
        this.clearItem();
    };
    return FeedbackView;
}(ViewBase_1.default));
exports.default = FeedbackView;

cc._RF.pop();