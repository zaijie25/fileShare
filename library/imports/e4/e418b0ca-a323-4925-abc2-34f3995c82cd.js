"use strict";
cc._RF.push(module, 'e418bDKoyNJJavCNPOZXILN', 'MsgItem');
// hall/scripts/logic/hall/ui/msg/MsgItem.ts

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
var MsgItem = /** @class */ (function (_super) {
    __extends(MsgItem, _super);
    function MsgItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BackgroundTxt = null;
        _this.BackgroundTxt1 = null;
        _this.CheckTxt = null;
        _this.CheckTxt1 = null;
        _this.Unread = null;
        _this.CheckSprite = null;
        _this.UnCheckSprite = null;
        _this.toggle = null;
        _this.maxCharCount = 6;
        _this.ColorStr1 = "<outline color=#445cb5 width=2><b>%s</b></outline>"; //back1
        _this.ColorStr2 = "<outline color=#6C3DD8 width=2><b>%s</b></outline>";
        _this.CheckColorStr1 = "<outline color=#B94E00 width= 1>%s</outline>";
        _this.CheckColorStr2 = "<outline color=#D74D23 width=2><b>%s</b></outline>";
        return _this;
    }
    MsgItem.prototype.onLoad = function () {
        this.bgFontSize = this.BackgroundTxt.fontSize;
        this.checkFontSize = this.CheckTxt.fontSize;
        //紫色是两个文本叠加效果
        if (Global.Setting.SkinConfig.isPurple) {
            this.bg1FontSize = this.BackgroundTxt1.fontSize;
            this.check1FontSize = this.CheckTxt1.fontSize;
        }
    };
    MsgItem.prototype.close = function () {
        this.node.active = false;
    };
    // update (dt) {}
    MsgItem.prototype.getGameData = function () {
        return this.gameData;
    };
    MsgItem.prototype.onInit = function (data) {
        this.gameData = data;
        this.initView();
    };
    MsgItem.prototype.initView = function () {
        this.BackgroundTxt.fontSize = this.bgFontSize;
        this.CheckTxt.fontSize = this.checkFontSize;
        if (Global.Setting.SkinConfig.isPurple) {
            this.CheckTxt1.fontSize = this.check1FontSize;
            this.BackgroundTxt1.fontSize = this.bg1FontSize;
            this.BackgroundTxt.string = cc.js.formatStr(this.ColorStr1, Global.Toolkit.removeEmoji(this.gameData.title));
            this.BackgroundTxt1.string = cc.js.formatStr(this.ColorStr2, Global.Toolkit.removeEmoji(this.gameData.title));
            this.CheckTxt.string = cc.js.formatStr(this.CheckColorStr1, Global.Toolkit.removeEmoji(this.gameData.title));
            this.CheckTxt1.string = cc.js.formatStr(this.CheckColorStr2, Global.Toolkit.removeEmoji(this.gameData.title));
        }
        else if (Global.Setting.SkinConfig.isBlue) {
            this.BackgroundTxt.string = this.gameData.title;
            this.CheckTxt.string = this.gameData.title;
        }
        else {
            this.BackgroundTxt.string = Global.Toolkit.removeEmoji(this.gameData.title);
            this.CheckTxt.string = Global.Toolkit.removeEmoji(this.gameData.title);
        }
        this.toggle.isChecked = false;
        this.toggle.uncheck();
        this.SetUnReadActiveState(this.gameData.red_status === 0);
        // if(this.gameData.title.length > 6)
        // {
        //     Global.Component.frameEnd(()=>{
        //         if(!this.node.isValid)
        //             return;
        //         this.adjustLabelLength(this.BackgroundTxt, this.bgFontSize) 
        //         this.adjustLabelLength(this.CheckTxt, this.checkFontSize) 
        //         this.adjustLabelLength(this.BackgroundTxt1, this.bg1FontSize) 
        //         this.adjustLabelLength(this.CheckTxt1, this.check1FontSize) 
        //     })
        // }
    };
    MsgItem.prototype.adjustLabelLength = function (label, fontSize) {
        if (label == null)
            return;
        var maxLength = fontSize * this.maxCharCount;
        if (label.node.width <= maxLength)
            return;
        label.fontSize = Math.floor(maxLength / label.node.width * fontSize);
    };
    MsgItem.prototype.SetBackgroundChecked = function (state) {
        this.CheckSprite.node.active = state;
        this.UnCheckSprite.node.active = !state;
    };
    MsgItem.prototype.SetToggleChecked = function () {
        this.toggle.isChecked = true;
        this.toggle.check();
    };
    MsgItem.prototype.SetUnReadActiveState = function (state) {
        this.Unread.node.active = state;
    };
    __decorate([
        property(cc.Label)
    ], MsgItem.prototype, "BackgroundTxt", void 0);
    __decorate([
        property(cc.Label)
    ], MsgItem.prototype, "BackgroundTxt1", void 0);
    __decorate([
        property(cc.Label)
    ], MsgItem.prototype, "CheckTxt", void 0);
    __decorate([
        property(cc.Label)
    ], MsgItem.prototype, "CheckTxt1", void 0);
    __decorate([
        property(cc.Sprite)
    ], MsgItem.prototype, "Unread", void 0);
    __decorate([
        property(cc.Sprite)
    ], MsgItem.prototype, "CheckSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], MsgItem.prototype, "UnCheckSprite", void 0);
    __decorate([
        property(cc.Toggle)
    ], MsgItem.prototype, "toggle", void 0);
    MsgItem = __decorate([
        ccclass
    ], MsgItem);
    return MsgItem;
}(cc.Component));
exports.default = MsgItem;

cc._RF.pop();