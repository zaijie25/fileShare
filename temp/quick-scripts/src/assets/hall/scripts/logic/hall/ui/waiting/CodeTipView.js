"use strict";
cc._RF.push(module, '028a3xlLWJN7ZlE5R7qsI+P', 'CodeTipView');
// hall/scripts/logic/hall/ui/waiting/CodeTipView.ts

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
//游戏列表item
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CodeTipView = /** @class */ (function (_super) {
    __extends(CodeTipView, _super);
    function CodeTipView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.circle = null;
        _this.tips = null;
        _this.isTounch = true;
        return _this;
    }
    CodeTipView_1 = CodeTipView;
    CodeTipView.prototype.onLoad = function () {
        CodeTipView_1.instance = this;
        Global.UIHelper.addCommonClick(this.node, "bgNode", this.callback, this);
        this.action = cc.rotateTo(5, 360 * 5);
        // this.action.easing(); //停止状态 慢 - 快 - 慢
        this.circle.runAction(this.action);
    };
    CodeTipView.prototype.onDestroy = function () {
        CodeTipView_1.instance = null;
    };
    CodeTipView.prototype.callback = function () {
        if (this.isTounch) {
            this.isTounch = false;
            this.start();
            this.tips.string = "正在获取";
            this.SpreadModel = Global.ModelManager.getModel("SpreadModel");
            this.SpreadModel.loadShortUrl(Global.Setting.Urls.inviteUrl);
        }
    };
    CodeTipView.prototype.start = function () {
        this.circle.runAction(this.action);
        this.node.active = true;
    };
    CodeTipView.prototype.success = function () {
        this.isTounch = true;
        this.circle.stopAction(this.action);
        this.node.active = false;
    };
    CodeTipView.prototype.error = function () {
        this.isTounch = true;
        this.node.active = true;
        this.tips.string = "获取失败,请重试";
        this.circle.stopAction(this.action);
    };
    var CodeTipView_1;
    /**
 * 单例对象
 */
    CodeTipView.instance = null;
    __decorate([
        property(cc.Node)
    ], CodeTipView.prototype, "circle", void 0);
    __decorate([
        property(cc.Label)
    ], CodeTipView.prototype, "tips", void 0);
    CodeTipView = CodeTipView_1 = __decorate([
        ccclass
    ], CodeTipView);
    return CodeTipView;
}(cc.Component));
exports.default = CodeTipView;

cc._RF.pop();