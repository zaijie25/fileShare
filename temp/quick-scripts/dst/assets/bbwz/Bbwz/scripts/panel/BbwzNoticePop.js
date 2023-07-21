
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/panel/BbwzNoticePop.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c5c82P8qbZAVoCeVpOeyPNi', 'BbwzNoticePop');
// bbwz/Bbwz/scripts/panel/BbwzNoticePop.ts

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
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
/**
 * 弹窗 提示界面
 */
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BbwzNoticePop = /** @class */ (function (_super) {
    __extends(BbwzNoticePop, _super);
    function BbwzNoticePop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzNoticePop.prototype.onLoad = function () {
        this.node.setContentSize(cc.Canvas.instance.node.getContentSize());
        this.maskNode = cc.find("mask", this.node);
        this.contentNode = cc.find("content", this.node);
        this.animComp = Global.UIHelper.addAnimComp(this.node, this.contentNode, this.maskNode);
        this.buttonYesNode = BbwzConstDefine_1.default.addCommonClick(this.contentNode, "btnLayout/button_no", this.onCloseClick, this);
        this.buttonNoNode = BbwzConstDefine_1.default.addCommonClick(this.contentNode, "btnLayout/button_yes", this.onYesBtnClick, this);
        this.richText = cc.find("richText", this.contentNode).getComponent(cc.RichText);
        Game.Event.on(Game.EVENT_MESSAGE_BOX, this, this.onMessageBox);
    };
    BbwzNoticePop.prototype.onEnable = function () {
        Global.UI.SetMessageBoxInGame(true);
        this.animComp.doPopupOpenAnim();
    };
    BbwzNoticePop.prototype.onDisable = function () {
        Global.UI.SetMessageBoxInGame(false);
    };
    BbwzNoticePop.prototype.onDestroy = function () {
        Game.Event.off(Game.EVENT_MESSAGE_BOX, this, this.onMessageBox);
    };
    BbwzNoticePop.prototype.onCloseClick = function () {
        var _this = this;
        BbwzConstDefine_1.default.playBtnSound();
        this.animComp.doPopupCloseAnim(function () {
            _this.node.active = false;
        });
        if (this.customCbNo) {
            this.customCbNo();
            this.customCbNo = null;
        }
    };
    BbwzNoticePop.prototype.onYesBtnClick = function () {
        var _this = this;
        BbwzConstDefine_1.default.playBtnSound();
        this.animComp.doPopupCloseAnim(function () {
            _this.node.active = false;
        });
        if (this.customCbYes) {
            this.customCbYes();
            this.customCbYes = null;
            return;
        }
    };
    BbwzNoticePop.prototype.setCustomMessageBox = function (content, type, cbYes, cbNo) {
        if (type === void 0) { type = 0; }
        this.richText.string = content;
        this.customCbYes = cbYes;
        this.customCbNo = cbNo;
        if (type == 0) { // layout布局
            this.buttonYesNode.active = true;
            this.buttonNoNode.active = true;
        }
        else {
            this.buttonYesNode.active = true;
            this.buttonNoNode.active = false;
        }
    };
    // 大厅弹窗Messagebox
    BbwzNoticePop.prototype.onMessageBox = function (objArr) {
        var content = objArr[0];
        var type = parseInt(objArr[1]) - 1; //大厅type：1-有确定和取消2个按钮 2-只有确定按钮  注意与子游戏区分
        var funcY = objArr[2];
        var funcN = objArr[3];
        this.setCustomMessageBox(content, type, funcY, funcN);
    };
    BbwzNoticePop = __decorate([
        ccclass
    ], BbwzNoticePop);
    return BbwzNoticePop;
}(cc.Component));
exports.default = BbwzNoticePop;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xccGFuZWxcXEJid3pOb3RpY2VQb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXNEO0FBRXREOztHQUVHO0FBQ0csSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQVk7SUFBdkQ7O0lBK0VBLENBQUM7SUFyRWEsOEJBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEYsSUFBSSxDQUFDLGFBQWEsR0FBRyx5QkFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLHFCQUFxQixFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEgsSUFBSSxDQUFDLFlBQVksR0FBRyx5QkFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLHNCQUFzQixFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkgsSUFB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QUMsQ0FBQztRQUN0QixJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQTlFZ0IsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQStFakM7SUFBRCxvQkFBQztDQS9FRCxBQStFQyxDQS9FMEMsRUFBRSxDQUFDLFNBQVMsR0ErRXREO2tCQS9Fb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYnd6Q29uc3REZWZpbmUgZnJvbSBcIi4uL2RhdGEvQmJ3ekNvbnN0RGVmaW5lXCI7XHJcblxyXG4vKipcclxuICog5by556qXIOaPkOekuueVjOmdolxyXG4gKi9cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYnd6Tm90aWNlUG9wIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIHByaXZhdGUgbWFza05vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGNvbnRlbnROb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBhbmltQ29tcDogYW55O1xyXG4gICAgcHJpdmF0ZSByaWNoVGV4dDogY2MuUmljaFRleHQ7XHJcbiAgICBwcml2YXRlIGN1c3RvbUNiWWVzOiBGdW5jdGlvbjtcclxuICAgIHByaXZhdGUgY3VzdG9tQ2JObzogRnVuY3Rpb247XHJcbiAgICBwcml2YXRlIGJ1dHRvblllc05vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGJ1dHRvbk5vTm9kZTogY2MuTm9kZTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldENvbnRlbnRTaXplKGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLmdldENvbnRlbnRTaXplKCkpO1xyXG4gICAgICAgIHRoaXMubWFza05vZGUgPSBjYy5maW5kKFwibWFza1wiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMuY29udGVudE5vZGUgPSBjYy5maW5kKFwiY29udGVudFwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMuYW5pbUNvbXAgPSBHbG9iYWwuVUlIZWxwZXIuYWRkQW5pbUNvbXAodGhpcy5ub2RlLCB0aGlzLmNvbnRlbnROb2RlLCB0aGlzLm1hc2tOb2RlKTtcclxuICAgICAgICB0aGlzLmJ1dHRvblllc05vZGUgPSBCYnd6Q29uc3REZWZpbmUuYWRkQ29tbW9uQ2xpY2sodGhpcy5jb250ZW50Tm9kZSwgXCJidG5MYXlvdXQvYnV0dG9uX25vXCIsIHRoaXMub25DbG9zZUNsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmJ1dHRvbk5vTm9kZSA9IEJid3pDb25zdERlZmluZS5hZGRDb21tb25DbGljayh0aGlzLmNvbnRlbnROb2RlLCBcImJ0bkxheW91dC9idXR0b25feWVzXCIsIHRoaXMub25ZZXNCdG5DbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5yaWNoVGV4dCA9IGNjLmZpbmQoXCJyaWNoVGV4dFwiLCB0aGlzLmNvbnRlbnROb2RlKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpO1xyXG5cclxuICAgICAgICBHYW1lLkV2ZW50Lm9uKEdhbWUuRVZFTlRfTUVTU0FHRV9CT1gsdGhpcyx0aGlzLm9uTWVzc2FnZUJveCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCl7XHJcbiAgICAgICAgR2xvYmFsLlVJLlNldE1lc3NhZ2VCb3hJbkdhbWUodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5hbmltQ29tcC5kb1BvcHVwT3BlbkFuaW0oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCl7XHJcbiAgICAgICAgR2xvYmFsLlVJLlNldE1lc3NhZ2VCb3hJbkdhbWUoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKXtcclxuICAgICAgICBHYW1lLkV2ZW50Lm9mZihHYW1lLkVWRU5UX01FU1NBR0VfQk9YLHRoaXMsdGhpcy5vbk1lc3NhZ2VCb3gpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbG9zZUNsaWNrKCl7XHJcbiAgICAgICAgQmJ3ekNvbnN0RGVmaW5lLnBsYXlCdG5Tb3VuZCgpO1xyXG4gICAgICAgIHRoaXMuYW5pbUNvbXAuZG9Qb3B1cENsb3NlQW5pbSgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tQ2JObyl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tQ2JObygpO1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbUNiTm8gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uWWVzQnRuQ2xpY2soKXtcclxuICAgICAgICBCYnd6Q29uc3REZWZpbmUucGxheUJ0blNvdW5kKCk7XHJcbiAgICAgICAgdGhpcy5hbmltQ29tcC5kb1BvcHVwQ2xvc2VBbmltKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5jdXN0b21DYlllcyl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tQ2JZZXMoKTtcclxuICAgICAgICAgICAgdGhpcy5jdXN0b21DYlllcyA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEN1c3RvbU1lc3NhZ2VCb3goY29udGVudDogc3RyaW5nLCB0eXBlOm51bWJlciA9IDAsIGNiWWVzPzogRnVuY3Rpb24sIGNiTm8/OiBGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5yaWNoVGV4dC5zdHJpbmcgPSBjb250ZW50O1xyXG4gICAgICAgIHRoaXMuY3VzdG9tQ2JZZXMgPSBjYlllcztcclxuICAgICAgICB0aGlzLmN1c3RvbUNiTm8gPSBjYk5vO1xyXG4gICAgICAgIGlmKHR5cGUgPT0gMCl7ICAgICAgLy8gbGF5b3V05biD5bGAXHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uWWVzTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbk5vTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvblllc05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5idXR0b25Ob05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyDlpKfljoXlvLnnqpdNZXNzYWdlYm94XHJcbiAgICBwcml2YXRlIG9uTWVzc2FnZUJveChvYmpBcnIpIHtcclxuICAgICAgICB2YXIgY29udGVudCA9IG9iakFyclswXTtcclxuICAgICAgICB2YXIgdHlwZSA9IHBhcnNlSW50KG9iakFyclsxXSkgLSAxOy8v5aSn5Y6FdHlwZe+8mjEt5pyJ56Gu5a6a5ZKM5Y+W5raIMuS4quaMiemSriAyLeWPquacieehruWumuaMiemSriAg5rOo5oSP5LiO5a2Q5ri45oiP5Yy65YiGXHJcbiAgICAgICAgdmFyIGZ1bmNZID0gb2JqQXJyWzJdO1xyXG4gICAgICAgIHZhciBmdW5jTiA9IG9iakFyclszXTtcclxuICAgICAgICB0aGlzLnNldEN1c3RvbU1lc3NhZ2VCb3goY29udGVudCwgdHlwZSwgZnVuY1ksIGZ1bmNOKTtcclxuICAgIH1cclxufVxyXG4iXX0=