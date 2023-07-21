"use strict";
cc._RF.push(module, 'ab3ac+iPPBN0K2Yh7S9GM4d', 'FeedbackListItem');
// hall/scripts/logic/hall/ui/Feedback/FeedbackListItem.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var FeedbackConstants_1 = require("./FeedbackConstants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FeedbackListItem = /** @class */ (function (_super) {
    __extends(FeedbackListItem, _super);
    function FeedbackListItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label1 = null;
        _this.label2 = null;
        return _this;
        /* public SetBackgroundChecked(state:boolean){
            this.CheckSprite.node.active = state
            this.UnCheckSprite.node.active = !state
          
        }
        
        public SetUnReadActiveState(state:boolean){
            this.Unread.node.active = state
        } */
    }
    FeedbackListItem.prototype.close = function () {
        this.node.active = false;
    };
    // update (dt) {}
    FeedbackListItem.prototype.getGameData = function () {
        return this.gameData;
    };
    FeedbackListItem.prototype.onInit = function (data, responePage) {
        this.gameData = data;
        this.dealpage = responePage;
        this.initView();
    };
    FeedbackListItem.prototype.initView = function () {
        this.id = this.gameData.id;
        this.status = this.gameData.status;
        this.label1.string = "问题" + this.gameData.problem_id;
        var problem = this.gameData.problem;
        var prob = problem.split("\n");
        if (prob.length > 0) {
            this.label2.string = Global.Toolkit.substrEndWithElli(prob[0], 24);
        }
        else {
            this.label2.string = Global.Toolkit.substrEndWithElli(problem, 24);
        }
        this.answer = this.gameData.answer;
        /* this.BackgroundTxt.string =  this.gameData;
        this.CheckTxt.string = this.gameData;
        this.toggle.isChecked =false
        this.toggle.uncheck() */
    };
    FeedbackListItem.prototype.deleteItemByID = function () {
        // let id =
        Global.Audio.playBtnSound();
        var para = {
            type: 1,
            problem: "",
            id: this.id //1的时候
        };
        Global.ModelManager.getModel("FeedbackModel").dealFeedback(para, this.dealpage);
    };
    FeedbackListItem.prototype.openReplayDetail = function () {
        // this.id
        Global.Audio.playBtnSound();
        var rightPanelView = Global.UI.getWindow("WndFeedback").getView("RightPanelView");
        var replay = rightPanelView.getView("feedbackShowAndWrite");
        replay.setShowOrEdit(1);
        replay.setData(this.gameData.problem, this.answer);
        rightPanelView.changeView(FeedbackConstants_1.RightViewType.feedbackShowAndWrite);
    };
    __decorate([
        property(cc.Label)
    ], FeedbackListItem.prototype, "label1", void 0);
    __decorate([
        property(cc.Label)
    ], FeedbackListItem.prototype, "label2", void 0);
    FeedbackListItem = __decorate([
        ccclass
    ], FeedbackListItem);
    return FeedbackListItem;
}(cc.Component));
exports.default = FeedbackListItem;

cc._RF.pop();