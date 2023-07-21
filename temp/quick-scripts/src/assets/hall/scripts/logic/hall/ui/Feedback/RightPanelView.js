"use strict";
cc._RF.push(module, 'c3869UiwGBEBZ7vpopWH549', 'RightPanelView');
// hall/scripts/logic/hall/ui/Feedback/RightPanelView.ts

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
var ServiceView_1 = require("./ServiceView");
var FeedbackConstants_1 = require("./FeedbackConstants");
var RightPanelView = /** @class */ (function (_super) {
    __extends(RightPanelView, _super);
    function RightPanelView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rightPage = [];
        return _this;
    }
    //view8: ViewBase;
    RightPanelView.prototype.initView = function () {
        //let node1 = this.getChild("feedback");
        var node2 = this.getChild("onlineService");
        var node3 = this.getChild("wxService");
        var node4 = this.getChild("qqService");
        this.node5 = this.getChild("FQA");
        //let node6 = this.getChild("feedbackWrite");
        var node7 = this.getChild("atService");
        //let node8 = this.getChild("feedback2");
        //this.view1 = this.addView("feedback",node1,FeedbackView);
        this.view2 = this.addView("onlineService", node2, ServiceView_1.default);
        this.view3 = this.addView("wxService", node3, ServiceView_1.default);
        this.view4 = this.addView("qqService", node4, ServiceView_1.default);
        //this.view6 = this.addView("feedbackShowAndWrite",node6,FeedbackShowAndWriteView);
        this.view7 = this.addView("atService", node7, ServiceView_1.default);
        //this.view8 = this.addView("feedback2",node8,Feedback2);
        this.noMsgTips = this.getChild("noMsgTips");
        //this.rightPage.push(this.view1);
        this.rightPage.push(this.view2);
        this.rightPage.push(this.view3);
        this.rightPage.push(this.view4);
        this.rightPage.push(this.node5);
        //this.rightPage.push(this.view6);
        this.rightPage.push(this.view7);
        //this.rightPage.push(this.view8);
        this.rightPage.push(this.noMsgTips);
    };
    RightPanelView.prototype.changeView = function (viewType) {
        this.rightPage.forEach(function (element) {
            if (element) {
                element.subViewState = false;
                element.active = false;
            }
        });
        switch (viewType) {
            // case RightViewType.feedback:
            //         this.view1.subViewState=true;
            //     break;
            case FeedbackConstants_1.RightViewType.onlineService:
                this.view2.subViewState = true;
                break;
            case FeedbackConstants_1.RightViewType.wxService:
                this.view3.subViewState = true;
                break;
            case FeedbackConstants_1.RightViewType.qqService:
                this.view4.subViewState = true;
                break;
            case FeedbackConstants_1.RightViewType.FQA:
                this.node5.active = true;
                break;
            // case RightViewType.feedbackShowAndWrite:
            //         this.view6.subViewState=true;
            //     break;
            case FeedbackConstants_1.RightViewType.atService:
                this.view7.subViewState = true;
                break;
            case FeedbackConstants_1.RightViewType.noMsgTips:
                this.noMsgTips.active = true;
                break;
            // case RightViewType.feedback2:
            //         this.view8.subViewState=true;
            //     break;
        }
    };
    RightPanelView.prototype.showNotips = function (isShow) {
        this.noMsgTips.active = isShow;
    };
    RightPanelView.prototype.onSubViewHide = function () {
        this.rightPage.forEach(function (element) {
            element.active = false;
        });
    };
    return RightPanelView;
}(ViewBase_1.default));
exports.default = RightPanelView;

cc._RF.pop();