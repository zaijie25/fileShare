
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Feedback/FeedbackShowAndWriteView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxGZWVkYmFja1xcRmVlZGJhY2tTaG93QW5kV3JpdGVWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFpRDtBQUdqRCx5REFBdUU7QUFLdkU7SUFBc0QsNENBQVE7SUFBOUQ7UUFBQSxxRUE0SEM7UUExSFcsa0JBQVksR0FBVyxDQUFDLENBQUMsQ0FBQyxvQkFBb0I7UUFXdEQsWUFBTSxHQUFZLEtBQUssQ0FBQztRQUN4QixVQUFJLEdBQWEsQ0FBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxPQUFPLENBQUMsQ0FBQzs7SUE4Ry9FLENBQUM7SUE1R2EsMkNBQVEsR0FBbEI7UUFBQSxpQkFxQkM7UUFwQkcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFn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QUMsa0JBQWtCLENBQUMsQ0FBQztTQUN2RjtJQUNMLENBQUM7SUFJTCwrQkFBQztBQUFELENBNUhBLEFBNEhDLENBNUhxRCxrQkFBUSxHQTRIN0QiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvVmlld0Jhc2VcIjtcclxuaW1wb3J0IFJpZ2h0UGFuZWxWaWV3IGZyb20gXCIuL1JpZ2h0UGFuZWxWaWV3XCI7XHJcbmltcG9ydCBGZWVkYmFja01vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL0ZlZWRiYWNrTW9kZWxcIjtcclxuaW1wb3J0IHsgRmVlZGJhY2tDb25zdGFudHMsIFJpZ2h0Vmlld1R5cGUgfSBmcm9tIFwiLi9GZWVkYmFja0NvbnN0YW50c1wiO1xyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmVlZGJhY2tTaG93QW5kV3JpdGVWaWV3IGV4dGVuZHMgVmlld0Jhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgaXNTaG93T3JFZGl0OiBudW1iZXIgPSAwOyAvLzDkuLrnq4vljbPlj43ppojlj6/nvJbovpHpl67popjvvIwx5Li65bGV56S66K+m5oOFXHJcbiAgICBxdWlja1F1ZXN0aW9uSXRlbTogY2MuTm9kZTtcclxuICAgIHF1aWNrUXVlc3Rpb25BcmVhOiBjYy5Ob2RlOyBcclxuICAgIHF1ZXN0aW9uRWRpdDogY2MuRWRpdEJveDtcclxuICAgIHF1ZXN0aW9uU2hvdzogY2MuTGFiZWw7XHJcbiAgICBhbnN3ZXJUZXh0OiBjYy5MYWJlbDtcclxuICAgIHF1aWNrUXVlc3Rpb25CdG46IGNjLk5vZGU7XHJcbiAgICBjb21taXRCdG46IGNjLk5vZGU7XHJcbiAgICAvL+WPlua2iOWbvuagh1xyXG4gICAgY2FuY2VsQnRuOmNjLk5vZGU7XHJcbiAgICBtb2RlbDogRmVlZGJhY2tNb2RlbDtcclxuICAgIGlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgdGlwczogc3RyaW5nW10gPSBbXCLku6PnkIblh7rplJnkuoZcIixcIuWFheWAvOS4jeWIsOi0plwiLFwi6L+b5LiN5Y675ri45oiPXCIsXCLmj5DnjrDkuI3miJDlip9cIixcIue7keS4jeS6huaJi+aculwiLFwi546p5ri45oiP5b6I5Y2hXCIsXCLnnIvkuI3op4HmuLjmiI9cIl07XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbkVkaXQgPSB0aGlzLmdldENoaWxkKFwiYm94L3F1ZXN0aW9uRWRpdEJveFwiKS5nZXRDb21wb25lbnQoY2MuRWRpdEJveCk7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvblNob3cgPSB0aGlzLmdldENoaWxkKFwiYm94L3F1ZXN0aW9uU2hvd0JveFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMucXVpY2tRdWVzdGlvbkFyZWEgPSB0aGlzLmdldENoaWxkKFwiYm90dG9tL3F1aWNrUXVlc3Rpb25cIik7IFxyXG4gICAgICAgIHRoaXMucXVpY2tRdWVzdGlvbkl0ZW0gPSB0aGlzLmdldENoaWxkKFwiYm90dG9tL3F1aWNrUXVlc3Rpb24vaXRlbVwiKTtcclxuICAgICAgICB0aGlzLmFuc3dlclRleHQgPSB0aGlzLmdldENoaWxkKFwiYm94L2Fuc3dlclRleHRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLnF1aWNrUXVlc3Rpb25CdG4gPSB0aGlzLmdldENoaWxkKFwiYm90dG9tL2J0bk5vZGVcIik7XHJcbiAgICAgICAgdGhpcy5jb21taXRCdG4gPSB0aGlzLmdldENoaWxkKFwiYm90dG9tL2NvbW1pdEJ0blwiKTtcclxuICAgICAgICB0aGlzLmNhbmNlbEJ0biA9IHRoaXMuZ2V0Q2hpbGQoXCJib3R0b20vY2FuY2VsTm9kZVwiKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYm90dG9tL2J0bk5vZGVcIiwgdGhpcy5xdWlja1F1ZXN0aW9uLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYm90dG9tL2NvbW1pdEJ0blwiLCB0aGlzLmNvbW1pdE9yQmFjaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImJvdHRvbS9jYW5jZWxOb2RlXCIsIHRoaXMuYmFja0FjdGlvbiwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy50aXBzLmZvckVhY2goZSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5xdWlja1F1ZXN0aW9uSXRlbSk7XHJcbiAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZTtcclxuICAgICAgICAgICAgdGhpcy5xdWlja1F1ZXN0aW9uQXJlYS5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICAgICAgaXRlbS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuaXRlbUNsaWNrLCB0aGlzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IDxGZWVkYmFja01vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJGZWVkYmFja01vZGVsXCIpO1xyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNob3dPckVkaXQoaXNTaG93T3JFZGl0OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuaXNTaG93T3JFZGl0ID0gaXNTaG93T3JFZGl0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXREYXRhKC4uLnBhcmEpe1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25TaG93LnN0cmluZyA9IHBhcmFbMF07XHJcbiAgICAgICAgdGhpcy5hbnN3ZXJUZXh0LnN0cmluZyA9IHBhcmFbMV07XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uU3ViVmlld1Nob3coKXtcclxuICAgICAgICBpZih0aGlzLmlzU2hvd09yRWRpdCA9PSAxKXtcclxuICAgICAgICAgICAgdGhpcy5xdWVzdGlvbkVkaXQubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5xdWVzdGlvblNob3cubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnF1aWNrUXVlc3Rpb25BcmVhLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmFuc3dlclRleHQubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnF1aWNrUXVlc3Rpb25CdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsQnRuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWl0QnRuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaXNTaG93T3JFZGl0ID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXN0aW9uRWRpdC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb25TaG93Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucXVpY2tRdWVzdGlvbkFyZWEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmFuc3dlclRleHQubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5xdWlja1F1ZXN0aW9uQnRuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsQnRuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1pdEJ0bi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLm9uKEZlZWRiYWNrQ29uc3RhbnRzLkRlYWxGZWVkYmFja0NvbW1pdCwgdGhpcywgdGhpcy5kZWFsQ29tbWl0Q2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYm90dG9tL2NvbW1pdEJ0blwiLCB0aGlzLmNvbW1pdE9yQmFjaywgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaXRlbUNsaWNrKGV2ZW50KXtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uRWRpdC5zdHJpbmcgPSBldmVudC50YXJnZXQuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZztcclxuICAgICAgICB0aGlzLnF1aWNrUXVlc3Rpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBxdWlja1F1ZXN0aW9uKCl7XHJcbiAgICAgICAgaWYodGhpcy5pc09wZW4pe1xyXG4gICAgICAgICAgICB0aGlzLnF1aWNrUXVlc3Rpb25BcmVhLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnF1aWNrUXVlc3Rpb25BcmVhLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNPcGVuID0gIXRoaXMuaXNPcGVuO1xyXG4gICAgfVxyXG5cclxuICAgIGJhY2tBY3Rpb24oKXtcclxuICAgICAgICBpZih0aGlzLmlzU2hvd09yRWRpdCA9PSAxKXtcclxuICAgICAgICAgICAgLy/ov5Tlm55cclxuICAgICAgICAgICAgdGhpcy5xdWVzdGlvblNob3cuc3RyaW5nID1cIlwiO1xyXG4gICAgICAgICAgICB0aGlzLmFuc3dlclRleHQuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgbGV0IHJpZ2h0UGFuZWxWaWV3ID0gPFJpZ2h0UGFuZWxWaWV3Pkdsb2JhbC5VSS5nZXRXaW5kb3coXCJXbmRGZWVkYmFja1wiKS5nZXRWaWV3KFwiUmlnaHRQYW5lbFZpZXdcIik7XHJcbiAgICAgICAgICAgIHJpZ2h0UGFuZWxWaWV3LmNoYW5nZVZpZXcoUmlnaHRWaWV3VHlwZS5mZWVkYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29tbWl0T3JCYWNrKCl7XHJcbiAgICAgICAgaWYodGhpcy5pc1Nob3dPckVkaXQgPT0gMCl7XHJcbiAgICAgICAgICAgIGxldCBxdWVzdGlvbiA9IHRoaXMucXVlc3Rpb25FZGl0LnN0cmluZztcclxuICAgICAgICAgICAgaWYocXVlc3Rpb24udHJpbSgpPT1cIlwifHwhcXVlc3Rpb24pe1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLmj5DkuqTlhoXlrrnkuLrnqbrvvIFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHBhcmE9e1xyXG4gICAgICAgICAgICAgICAgdHlwZTogMCAsLy8wIOaPkOS6pCAx5Yig6ZmkXHJcbiAgICAgICAgICAgICAgICBwcm9ibGVtOiBxdWVzdGlvbiwvL+mXrumimCAw55qE5pe25YCZXHJcbiAgICAgICAgICAgICAgICBpZDogMCAgLy8x55qE5pe25YCZXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwuZGVhbEZlZWRiYWNrKHBhcmEsdGhpcy5tb2RlbC5yZXNwb25lUGFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICB9XHJcbiAgICBkZWFsQ29tbWl0Q2FsbGJhY2soKXtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uRWRpdC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIGxldCByaWdodFBhbmVsVmlldyA9IDxSaWdodFBhbmVsVmlldz5HbG9iYWwuVUkuZ2V0V2luZG93KFwiV25kRmVlZGJhY2tcIikuZ2V0VmlldyhcIlJpZ2h0UGFuZWxWaWV3XCIpO1xyXG4gICAgICAgIHJpZ2h0UGFuZWxWaWV3LmNoYW5nZVZpZXcoUmlnaHRWaWV3VHlwZS5mZWVkYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TdWJWaWV3SGlkZSgpe1xyXG4gICAgICAgIGlmKHRoaXMuaXNTaG93T3JFZGl0ID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLm9mZihGZWVkYmFja0NvbnN0YW50cy5EZWFsRmVlZGJhY2tDb21taXQsIHRoaXMsIHRoaXMuZGVhbENvbW1pdENhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxuIl19