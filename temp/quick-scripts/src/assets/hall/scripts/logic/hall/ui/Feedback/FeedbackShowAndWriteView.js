"use strict";
cc._RF.push(module, '9a5a1WC/5dOCYU1Py7NwfCx', 'FeedbackShowAndWriteView');
// hall/scripts/logic/hall/ui/Feedback/FeedbackShowAndWriteView.ts

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
var FeedbackShowAndWriteView = /** @class */ (function (_super) {
    __extends(FeedbackShowAndWriteView, _super);
    function FeedbackShowAndWriteView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isShowOrEdit = 0; //0为立即反馈可编辑问题，1为展示详情
        _this.isOpen = false;
        _this.tips = ["代理出错了", "充值不到账", "进不去游戏", "提现不成功", "绑不了手机", "玩游戏很卡", "看不见游戏"];
        return _this;
    }
    FeedbackShowAndWriteView.prototype.initView = function () {
        var _this = this;
        this.questionEdit = this.getChild("box/questionEditBox").getComponent(cc.EditBox);
        this.questionShow = this.getChild("box/questionShowBox").getComponent(cc.Label);
        this.quickQuestionArea = this.getChild("bottom/quickQuestion");
        this.quickQuestionItem = this.getChild("bottom/quickQuestion/item");
        this.answerText = this.getChild("box/answerText").getComponent(cc.Label);
        this.quickQuestionBtn = this.getChild("bottom/btnNode");
        this.commitBtn = this.getChild("bottom/commitBtn");
        this.cancelBtn = this.getChild("bottom/cancelNode");
        this.addCommonClick("bottom/btnNode", this.quickQuestion, this);
        this.addCommonClick("bottom/commitBtn", this.commitOrBack, this);
        this.addCommonClick("bottom/cancelNode", this.backAction, this);
        this.tips.forEach(function (e) {
            var item = cc.instantiate(_this.quickQuestionItem);
            item.active = true;
            item.getChildByName("label").getComponent(cc.Label).string = e;
            _this.quickQuestionArea.addChild(item);
            item.on(cc.Node.EventType.TOUCH_END, _this.itemClick, _this);
        });
        this.model = Global.ModelManager.getModel("FeedbackModel");
    };
    FeedbackShowAndWriteView.prototype.setShowOrEdit = function (isShowOrEdit) {
        this.isShowOrEdit = isShowOrEdit;
    };
    FeedbackShowAndWriteView.prototype.setData = function () {
        var para = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            para[_i] = arguments[_i];
        }
        this.questionShow.string = para[0];
        this.answerText.string = para[1];
    };
    FeedbackShowAndWriteView.prototype.onSubViewShow = function () {
        if (this.isShowOrEdit == 1) {
            this.questionEdit.node.active = false;
            this.questionShow.node.active = true;
            this.quickQuestionArea.active = false;
            this.answerText.node.active = true;
            this.quickQuestionBtn.active = false;
            this.cancelBtn.active = true;
            this.commitBtn.active = false;
        }
        else if (this.isShowOrEdit == 0) {
            this.questionEdit.node.active = true;
            this.questionShow.node.active = false;
            this.quickQuestionArea.active = false;
            this.answerText.node.active = false;
            this.quickQuestionBtn.active = true;
            this.cancelBtn.active = false;
            this.commitBtn.active = true;
            this.model.on(FeedbackConstants_1.FeedbackConstants.DealFeedbackCommit, this, this.dealCommitCallback);
        }
        // this.addCommonClick("bottom/commitBtn", this.commitOrBack, this);
    };
    FeedbackShowAndWriteView.prototype.itemClick = function (event) {
        this.questionEdit.string = event.target.getChildByName("label").getComponent(cc.Label).string;
        this.quickQuestion();
    };
    FeedbackShowAndWriteView.prototype.quickQuestion = function () {
        if (this.isOpen) {
            this.quickQuestionArea.active = false;
        }
        else {
            this.quickQuestionArea.active = true;
        }
        this.isOpen = !this.isOpen;
    };
    FeedbackShowAndWriteView.prototype.backAction = function () {
        if (this.isShowOrEdit == 1) {
            //返回
            this.questionShow.string = "";
            this.answerText.string = "";
            var rightPanelView = Global.UI.getWindow("WndFeedback").getView("RightPanelView");
            rightPanelView.changeView(FeedbackConstants_1.RightViewType.feedback);
        }
    };
    FeedbackShowAndWriteView.prototype.commitOrBack = function () {
        if (this.isShowOrEdit == 0) {
            var question = this.questionEdit.string;
            if (question.trim() == "" || !question) {
                Global.UI.fastTip("提交内容为空！");
                return;
            }
            var para = {
                type: 0,
                problem: question,
                id: 0 //1的时候
            };
            this.model.dealFeedback(para, this.model.responePage);
        }
    };
    FeedbackShowAndWriteView.prototype.dealCommitCallback = function () {
        this.questionEdit.string = "";
        var rightPanelView = Global.UI.getWindow("WndFeedback").getView("RightPanelView");
        rightPanelView.changeView(FeedbackConstants_1.RightViewType.feedback);
    };
    FeedbackShowAndWriteView.prototype.onSubViewHide = function () {
        if (this.isShowOrEdit == 0) {
            this.model.off(FeedbackConstants_1.FeedbackConstants.DealFeedbackCommit, this, this.dealCommitCallback);
        }
    };
    return FeedbackShowAndWriteView;
}(ViewBase_1.default));
exports.default = FeedbackShowAndWriteView;

cc._RF.pop();