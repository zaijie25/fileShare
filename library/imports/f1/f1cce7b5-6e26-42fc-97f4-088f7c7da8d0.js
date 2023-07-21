"use strict";
cc._RF.push(module, 'f1ccee1biZC/Jf0CI98fajQ', 'DdzRulePop');
// ddz/preload/scripts/DdzRulePop.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DdzRulePop = /** @class */ (function (_super) {
    __extends(DdzRulePop, _super);
    function DdzRulePop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzRulePop.prototype.onLoad = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.sv = cc.find("centerNode/scrollView", this.node).getComponent(cc.ScrollView);
        Global.UIHelper.addCommonClick(this.node, "centerNode/close", this.closeWnd, this, cc.Button.Transition.SCALE, null, false);
        Global.UIHelper.addCommonClick(this.node, "mask", this.closeWnd, this, cc.Button.Transition.NONE, cc.Button.Transition.SCALE, false);
        this.animComp = Global.UIHelper.addAnimComp(this.node, cc.find("centerNode", this.node), cc.find("mask", this.node));
    };
    DdzRulePop.prototype.onEnable = function () {
        this.sv.scrollToTop(0);
        this.animComp.doPopupOpenAnim();
    };
    DdzRulePop.prototype.closeWnd = function () {
        var _this = this;
        Global.Audio.playBtnSound();
        this.animComp.doPopupCloseAnim(function () {
            _this.node.active = false;
        });
    };
    DdzRulePop = __decorate([
        ccclass
    ], DdzRulePop);
    return DdzRulePop;
}(cc.Component));
exports.default = DdzRulePop;

cc._RF.pop();