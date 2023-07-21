
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Feedback/FeedbackView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxGZWVkYmFja1xcRmVlZGJhY2tWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFpRDtBQUlqRCx5REFBdUU7QUFDdkUsdURBQWtEO0FBS2xEO0lBQTBDLGdDQUFRO0lBQWxEO1FBQUEscUVBbUdDO1FBM0ZXLGlCQUFXLEdBQVcsQ0FBQyxDQUFDOztJQTJGcEMsQ0FBQztJQXhGYSwrQkFBUSxHQUFsQjtRQUVJLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsY0FBYyxDQUFD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UUFDdkYsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFJTCxtQkFBQztBQUFELENBbkdBLEFBbUdDLENBbkd5QyxrQkFBUSxHQW1HakQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvVmlld0Jhc2VcIjtcclxuaW1wb3J0IFJpZ2h0UGFuZWxWaWV3IGZyb20gXCIuL1JpZ2h0UGFuZWxWaWV3XCI7XHJcbmltcG9ydCBGZWVkYmFja1Nob3dBbmRXcml0ZVZpZXcgZnJvbSBcIi4vRmVlZGJhY2tTaG93QW5kV3JpdGVWaWV3XCI7XHJcbmltcG9ydCBGZWVkYmFja01vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL0ZlZWRiYWNrTW9kZWxcIjtcclxuaW1wb3J0IHsgRmVlZGJhY2tDb25zdGFudHMsIFJpZ2h0Vmlld1R5cGUgfSBmcm9tIFwiLi9GZWVkYmFja0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRmVlZGJhY2tMaXN0SXRlbSBmcm9tIFwiLi9GZWVkYmFja0xpc3RJdGVtXCI7XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGZWVkYmFja1ZpZXcgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblxyXG4gICAgZmVlZGJhY2tJdGVtOiBjYy5Ob2RlO1xyXG4gICAgY29udGVudDogY2MuTm9kZTtcclxuICAgIGxhYmVsMTogY2MuTGFiZWw7XHJcbiAgICBsYWJlbDI6IGNjLkxhYmVsO1xyXG4gICAgcGFnZUxhYmVsOiBjYy5MYWJlbDtcclxuICAgIG1vZGVsOiBGZWVkYmFja01vZGVsO1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50UGFnZTogbnVtYmVyID0gMTtcclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5mZWVkYmFja0l0ZW0gPSB0aGlzLmdldENoaWxkKFwiZmVlZGJhY2tJdGVtXCIpO1xyXG4gICAgICAgIHRoaXMubGFiZWwxID0gY2MuZmluZChcImxhYmVsMVwiLHRoaXMuZmVlZGJhY2tJdGVtKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMubGFiZWwyID0gY2MuZmluZChcImxhYmVsMlwiLHRoaXMuZmVlZGJhY2tJdGVtKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMuZ2V0Q2hpbGQoXCJjb250ZW50XCIpO1xyXG4gICAgICAgIHRoaXMucGFnZUxhYmVsID0gdGhpcy5nZXRDaGlsZChcImJvdHRvbS9jdXJyZW50UGFnZS9wYWdlTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYm90dG9tL2J0bk5vZGVcIiwgdGhpcy53cml0ZUZlZWRiYWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYm90dG9tL3ByZXZpb3VzXCIsIHRoaXMucHJldmlvdXNQYWdlLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYm90dG9tL25leHRcIiwgdGhpcy5uZXh0UGFnZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IDxGZWVkYmFja01vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJGZWVkYmFja01vZGVsXCIpO1xyXG4gICAgfVxyXG5cclxuICAgXHJcbiAgICBwcm90ZWN0ZWQgb25TdWJWaWV3U2hvdygpe1xyXG4gICAgICAgIHRoaXMubW9kZWwub24oRmVlZGJhY2tDb25zdGFudHMuRmVlZGJhY2tMaXN0Q2FsbGJhY2ssIHRoaXMsIHRoaXMucmVmcmVzaEZlZWRiYWNrTGlzdCk7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5HZXRQcm9ibGVtTGlzdCh0aGlzLmN1cnJlbnRQYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hGZWVkYmFja0xpc3QoZGF0YSl7XHJcbiAgICAgICAgbGV0IHJpZ2h0UGFuZWxWaWV3ID0gPFJpZ2h0UGFuZWxWaWV3Pkdsb2JhbC5VSS5nZXRXaW5kb3coXCJXbmRGZWVkYmFja1wiKS5nZXRWaWV3KFwiUmlnaHRQYW5lbFZpZXdcIik7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMubW9kZWwucmVzcG9uZVBhZ2U7IFxyXG4gICAgICAgIGlmKCFkYXRhfHxkYXRhLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50UGFnZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZUxhYmVsLnN0cmluZyA9IDErXCIvXCIrMTtcclxuICAgICAgICAgICAgICAgIHJpZ2h0UGFuZWxWaWV3LnNob3dOb3RpcHModHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLkdldFByb2JsZW1MaXN0KC0tdGhpcy5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmlnaHRQYW5lbFZpZXcuc2hvd05vdGlwcyhmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5wYWdlTGFiZWwuc3RyaW5nID0gdGhpcy5jdXJyZW50UGFnZStcIi9cIit0aGlzLm1vZGVsLnRvdGFsUGFnZTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTwgZGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBpdGVtOmNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmZlZWRiYWNrSXRlbSk7XHJcbiAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGZlZWRJdGVtID0gaXRlbS5nZXRDb21wb25lbnQoRmVlZGJhY2tMaXN0SXRlbSk7XHJcbiAgICAgICAgICAgIGZlZWRJdGVtLm9uSW5pdChkYXRhW2ldLHRoaXMubW9kZWwucmVzcG9uZVBhZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHdyaXRlRmVlZGJhY2soKXtcclxuICAgICAgICBsZXQgcmlnaHRQYW5lbFZpZXcgPSA8UmlnaHRQYW5lbFZpZXc+R2xvYmFsLlVJLmdldFdpbmRvdyhcIlduZEZlZWRiYWNrXCIpLmdldFZpZXcoXCJSaWdodFBhbmVsVmlld1wiKTtcclxuICAgICAgICBsZXQgd3JpdGU6RmVlZGJhY2tTaG93QW5kV3JpdGVWaWV3ID0gPEZlZWRiYWNrU2hvd0FuZFdyaXRlVmlldz5yaWdodFBhbmVsVmlldy5nZXRWaWV3KFwiZmVlZGJhY2tTaG93QW5kV3JpdGVcIik7XHJcbiAgICAgICAgd3JpdGUuc2V0U2hvd09yRWRpdCgwKTtcclxuICAgICAgICByaWdodFBhbmVsVmlldy5jaGFuZ2VWaWV3KFJpZ2h0Vmlld1R5cGUuZmVlZGJhY2tTaG93QW5kV3JpdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByZXZpb3VzUGFnZSgpe1xyXG4gICAgICAgIGlmKHRoaXMuY3VycmVudFBhZ2UgPiAxKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZS0tO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VMYWJlbC5zdHJpbmcgPSB0aGlzLmN1cnJlbnRQYWdlK1wiL1wiK3RoaXMubW9kZWwudG90YWxQYWdlO1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFySXRlbSgpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLkdldFByb2JsZW1MaXN0KHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuW3sue7j+aYr+esrOS4gOmhteS6hlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dFBhZ2UoKXtcclxuICAgICAgICBpZih0aGlzLmN1cnJlbnRQYWdlPHRoaXMubW9kZWwudG90YWxQYWdlKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSsrO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VMYWJlbC5zdHJpbmcgPSB0aGlzLmN1cnJlbnRQYWdlK1wiL1wiK3RoaXMubW9kZWwudG90YWxQYWdlO1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFySXRlbSgpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLkdldFByb2JsZW1MaXN0KHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuW9k+WJjeW3sue7j+aYr+acgOWkp+mhte+8gVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJJdGVtKGlzUmVzdDogYm9vbGVhbj1mYWxzZSl7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgaWYoaXNSZXN0KXtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZUxhYmVsLnN0cmluZyA9IHRoaXMuY3VycmVudFBhZ2UrXCIvXCIrdGhpcy5tb2RlbC50b3RhbFBhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uU3ViVmlld0hpZGUoKXtcclxuICAgICAgICB0aGlzLm1vZGVsLm9mZihGZWVkYmFja0NvbnN0YW50cy5GZWVkYmFja0xpc3RDYWxsYmFjaywgdGhpcywgdGhpcy5yZWZyZXNoRmVlZGJhY2tMaXN0KTtcclxuICAgICAgICB0aGlzLmNsZWFySXRlbSgpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG59XHJcbiJdfQ==