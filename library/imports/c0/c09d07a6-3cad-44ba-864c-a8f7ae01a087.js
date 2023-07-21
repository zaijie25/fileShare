"use strict";
cc._RF.push(module, 'c09d0emPK1EuoZMqPeuAaCH', 'FeedbackLeftItem');
// hall/scripts/logic/hall/ui/Feedback/FeedbackLeftItem.ts

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
var FeedbackLeftItem = /** @class */ (function (_super) {
    __extends(FeedbackLeftItem, _super);
    function FeedbackLeftItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BackgroundTxt = null;
        _this.CheckTxt = null;
        _this.Unread = null;
        _this.CheckSprite = null;
        _this.UnCheckSprite = null;
        _this.toggle = null;
        _this.typeSprite = null;
        return _this;
    }
    FeedbackLeftItem.prototype.close = function () {
        this.node.active = false;
    };
    // update (dt) {}
    FeedbackLeftItem.prototype.getGameData = function () {
        return this.nameData;
    };
    FeedbackLeftItem.prototype.onInit = function (data) {
        this.nameData = data;
        this.initView();
    };
    FeedbackLeftItem.prototype.initView = function () {
        this.BackgroundTxt.string = Global.Toolkit.removeEmoji(this.nameData);
        this.CheckTxt.string = Global.Toolkit.removeEmoji(this.nameData);
        this.toggle.isChecked = false;
        this.toggle.uncheck();
    };
    FeedbackLeftItem.prototype.SetBackgroundChecked = function (state) {
        this.CheckSprite.node.active = state;
        this.UnCheckSprite.node.active = !state;
    };
    FeedbackLeftItem.prototype.SetTypeSprite = function (path, name) {
        if (name === void 0) { name = ""; }
        if (this.typeSprite && cc.isValid(this.typeSprite) && this.typeSprite.node != null) {
            if (name != "") {
                this.typeSprite.node.active = true;
                Global.ResourceManager.loadAutoAtlas(this.typeSprite, path, name, null, false);
            }
            else {
                this.typeSprite.node.active = false;
            }
        }
    };
    FeedbackLeftItem.prototype.SetToggleChecked = function () {
        this.toggle.isChecked = true;
        this.toggle.check();
    };
    FeedbackLeftItem.prototype.SetUnReadActiveState = function (state) {
        this.Unread.node.active = state;
    };
    Object.defineProperty(FeedbackLeftItem.prototype, "entityData", {
        get: function () {
            return this._entityData;
        },
        set: function (data) {
            this._entityData = data;
            if (this._entityData.red_status != undefined)
                this.SetUnReadActiveState(this._entityData.red_status === 0);
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        property(cc.Label)
    ], FeedbackLeftItem.prototype, "BackgroundTxt", void 0);
    __decorate([
        property(cc.Label)
    ], FeedbackLeftItem.prototype, "CheckTxt", void 0);
    __decorate([
        property(cc.Sprite)
    ], FeedbackLeftItem.prototype, "Unread", void 0);
    __decorate([
        property(cc.Sprite)
    ], FeedbackLeftItem.prototype, "CheckSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], FeedbackLeftItem.prototype, "UnCheckSprite", void 0);
    __decorate([
        property(cc.Toggle)
    ], FeedbackLeftItem.prototype, "toggle", void 0);
    __decorate([
        property(cc.Sprite)
    ], FeedbackLeftItem.prototype, "typeSprite", void 0);
    FeedbackLeftItem = __decorate([
        ccclass
    ], FeedbackLeftItem);
    return FeedbackLeftItem;
}(cc.Component));
exports.default = FeedbackLeftItem;

cc._RF.pop();