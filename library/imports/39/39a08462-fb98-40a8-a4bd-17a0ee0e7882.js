"use strict";
cc._RF.push(module, '39a08Ri+5hAqKS9F6DuDniC', 'BbwzRulePop');
// bbwz/Bbwz/scripts/panel/BbwzRulePop.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
// 弹窗 规则界面
var BbwzRulePop = /** @class */ (function (_super) {
    __extends(BbwzRulePop, _super);
    function BbwzRulePop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzRulePop.prototype.onLoad = function () {
        this.node.setContentSize(cc.Canvas.instance.node.getContentSize()); // 适配
        this.maskNode = this.node.getChildByName("mask");
        this.contentNode = this.node.getChildByName("content");
        this.animComp = Global.UIHelper.addAnimComp(this.node, this.contentNode, this.maskNode);
        this.scroll = this.contentNode.getChildByName("scrollview").getComponent(cc.ScrollView);
        BbwzConstDefine_1.default.addCommonClick(this.contentNode, "button_close", this.onCloseClick, this);
        BbwzConstDefine_1.default.addCommonClick(this.node, "mask", this.onCloseClick, this, cc.Button.Transition.NONE);
    };
    BbwzRulePop.prototype.onEnable = function () {
        this.scroll.scrollToTop(0);
        this.animComp.doPopupOpenAnim();
    };
    BbwzRulePop.prototype.onCloseClick = function () {
        var _this = this;
        BbwzConstDefine_1.default.playBtnSound();
        this.animComp.doPopupCloseAnim(function () {
            _this.node.active = false;
        });
    };
    BbwzRulePop = __decorate([
        ccclass
    ], BbwzRulePop);
    return BbwzRulePop;
}(cc.Component));
exports.default = BbwzRulePop;

cc._RF.pop();