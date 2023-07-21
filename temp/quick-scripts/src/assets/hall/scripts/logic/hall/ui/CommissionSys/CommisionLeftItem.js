"use strict";
cc._RF.push(module, 'ebeabdRIjpOWbl+F0P5eV8T', 'CommisionLeftItem');
// hall/scripts/logic/hall/ui/CommissionSys/CommisionLeftItem.ts

"use strict";
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
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
var CommisionLeftItem = /** @class */ (function (_super) {
    __extends(CommisionLeftItem, _super);
    function CommisionLeftItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BackgroundTxt = null;
        _this.CheckTxt = null;
        _this.CheckSprite = null;
        _this.UnCheckSprite = null;
        _this.toggle = null;
        _this.Unread = null;
        _this.maxCharCount = 6;
        _this.atlasPath = "hall/texture/CommisionIcon/CommisionIcon";
        return _this;
    }
    CommisionLeftItem.prototype.onLoad = function () {
        this.bgFontSize = this.BackgroundTxt.fontSize;
        this.checkFontSize = this.CheckTxt.fontSize;
    };
    CommisionLeftItem.prototype.close = function () {
        this.node.active = false;
    };
    // update (dt) {}
    CommisionLeftItem.prototype.getData = function () {
        return this.data;
    };
    CommisionLeftItem.prototype.onInit = function (data) {
        this.data = data;
        this.initView();
    };
    CommisionLeftItem.prototype.initView = function () {
        // this.BackgroundTxt.fontSize = this.bgFontSize;
        // this.CheckTxt.fontSize = this.checkFontSize;
        this.BackgroundTxt.string = Global.Toolkit.removeEmoji(this.data.name);
        this.CheckTxt.string = Global.Toolkit.removeEmoji(this.data.name);
        // this.changeBtnSprite(this.BackGroundSprite,this.ClickSprite,this.data.global_task_type);
        this.SetUnReadActiveState(this.data.task_num > 0);
        this.toggle.isChecked = false;
        this.toggle.uncheck();
    };
    CommisionLeftItem.prototype.SetUnReadActiveState = function (state) {
        this.Unread.active = state;
    };
    CommisionLeftItem.prototype.adjustLabelLength = function (label, fontSize) {
        if (label == null)
            return;
        var maxLength = fontSize * this.maxCharCount;
        if (label.node.width <= maxLength)
            return;
        label.fontSize = Math.floor(maxLength / label.node.width * fontSize);
    };
    CommisionLeftItem.prototype.SetBackgroundChecked = function (state) {
        this.CheckSprite.node.active = state;
        this.UnCheckSprite.node.active = !state;
    };
    CommisionLeftItem.prototype.SetToggleChecked = function () {
        this.toggle.isChecked = true;
        this.toggle.check();
    };
    CommisionLeftItem.prototype.changeBtnSprite = function (bsp, csp, taskType) {
        Global.ResourceManager.loadAutoAtlas(bsp, this.atlasPath, "btn_" + taskType + "_b", null, false);
        Global.ResourceManager.loadAutoAtlas(csp, this.atlasPath, "btn_" + taskType + "_t", null, false);
    };
    __decorate([
        property(cc.Label)
    ], CommisionLeftItem.prototype, "BackgroundTxt", void 0);
    __decorate([
        property(cc.Label)
    ], CommisionLeftItem.prototype, "CheckTxt", void 0);
    __decorate([
        property(cc.Sprite)
    ], CommisionLeftItem.prototype, "CheckSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], CommisionLeftItem.prototype, "UnCheckSprite", void 0);
    __decorate([
        property(cc.Toggle)
    ], CommisionLeftItem.prototype, "toggle", void 0);
    __decorate([
        property(cc.Node)
    ], CommisionLeftItem.prototype, "Unread", void 0);
    CommisionLeftItem = __decorate([
        ccclass
    ], CommisionLeftItem);
    return CommisionLeftItem;
}(cc.Component));
exports.default = CommisionLeftItem;

cc._RF.pop();