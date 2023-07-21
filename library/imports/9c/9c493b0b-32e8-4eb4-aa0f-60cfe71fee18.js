"use strict";
cc._RF.push(module, '9c493sLMuhOtKoPYM/nH+4Y', 'ServiceLeftItem');
// hall/scripts/logic/hall/ui/Feedback/ServiceLeftItem.ts

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
var ServiceLeftItem = /** @class */ (function (_super) {
    __extends(ServiceLeftItem, _super);
    function ServiceLeftItem() {
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
    ServiceLeftItem.prototype.close = function () {
        this.node.active = false;
    };
    // update (dt) {}
    ServiceLeftItem.prototype.getGameData = function () {
        return this.data;
    };
    ServiceLeftItem.prototype.onInit = function (data) {
        this.data = data;
        this.initView();
    };
    ServiceLeftItem.prototype.initView = function () {
        this.BackgroundTxt.string = Global.Toolkit.removeEmoji(this.data.name);
        this.CheckTxt.string = Global.Toolkit.removeEmoji(this.data.name);
        // this.toggle.isChecked =false
        // this.toggle.uncheck()
    };
    ServiceLeftItem.prototype.SetToggleChecked = function (flag) {
        this.toggle.isChecked = flag;
        if (flag) {
            this.toggle.check();
        }
        else {
            this.toggle.uncheck();
        }
    };
    __decorate([
        property(cc.Label)
    ], ServiceLeftItem.prototype, "BackgroundTxt", void 0);
    __decorate([
        property(cc.Label)
    ], ServiceLeftItem.prototype, "CheckTxt", void 0);
    __decorate([
        property(cc.Sprite)
    ], ServiceLeftItem.prototype, "Unread", void 0);
    __decorate([
        property(cc.Sprite)
    ], ServiceLeftItem.prototype, "CheckSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], ServiceLeftItem.prototype, "UnCheckSprite", void 0);
    __decorate([
        property(cc.Toggle)
    ], ServiceLeftItem.prototype, "toggle", void 0);
    __decorate([
        property(cc.Sprite)
    ], ServiceLeftItem.prototype, "typeSprite", void 0);
    ServiceLeftItem = __decorate([
        ccclass
    ], ServiceLeftItem);
    return ServiceLeftItem;
}(cc.Component));
exports.default = ServiceLeftItem;

cc._RF.pop();