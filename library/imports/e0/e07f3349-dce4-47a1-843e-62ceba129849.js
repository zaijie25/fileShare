"use strict";
cc._RF.push(module, 'e07f3NJ3ORHoYQ+Ys66EphJ', 'Feedback2');
// hall/scripts/logic/hall/ui/Feedback/Feedback2.ts

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
var Feedback2 = /** @class */ (function (_super) {
    __extends(Feedback2, _super);
    function Feedback2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isOpen = false;
        _this.tips = ["1. 充值问题", "2. 提现问题", "3. 活动优惠", "4. 代理问题", "5. 游戏相关", "6. 其他问题"];
        _this.server = null;
        _this.order = -1;
        return _this;
    }
    Feedback2.prototype.initView = function () {
        var _this = this;
        this.quickQuestionArea = this.getChild("quickQuestion");
        this.quickQuestionItem = this.getChild("quickQuestion/item");
        this.tips.forEach(function (e) {
            var item = cc.instantiate(_this.quickQuestionItem);
            item.active = true;
            item.getChildByName("label").getComponent(cc.Label).string = e;
            _this.quickQuestionArea.addChild(item);
            item.on(cc.Node.EventType.TOUCH_END, _this.itemClick, _this);
        });
    };
    // public setShowOrEdit(isShowOrEdit: number){
    //     this.isShowOrEdit = isShowOrEdit;
    // }
    Feedback2.prototype.onOpen = function () {
        // if(this.isShowOrEdit == 1){
        //     this.quickQuestionArea.active = false;
        // }else if(this.isShowOrEdit == 0){
        //     this.quickQuestionArea.active = false;
        // }
        // this.addCommonClick("bottom/commitBtn", this.commitOrBack, this);
    };
    Feedback2.prototype.itemClick = function (event) {
        this.quickQuestion();
    };
    Feedback2.prototype.quickQuestion = function () {
        this.server.acceptService(this.order);
        // let rightPanelView = <RightPanelView>Global.UI.getWindow("WndFeedback").getView("RightPanelView");
        // let write:FeedbackShowAndWriteView = <FeedbackShowAndWriteView>rightPanelView.getView("feedbackShowAndWrite");
        // write.setShowOrEdit(0);
        // rightPanelView.changeView(RightViewType.feedbackShowAndWrite);
    };
    Feedback2.prototype.onClose = function () {
    };
    return Feedback2;
}(ViewBase_1.default));
exports.default = Feedback2;

cc._RF.pop();