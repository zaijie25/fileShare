"use strict";
cc._RF.push(module, 'c745a52HaNJNod/rWCYy00X', 'SpreadGiftItemView');
// hall/scripts/logic/hall/ui/Activity/SpreadGift/SpreadGiftItemView.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var WndSpreadGiftActivityView_1 = require("./WndSpreadGiftActivityView");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SpreadGiftItemView = /** @class */ (function (_super) {
    __extends(SpreadGiftItemView, _super);
    function SpreadGiftItemView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeArr = [];
        _this.lightNode = null;
        _this.achievedLabel = null;
        _this.normalLabel = null;
        _this.personNumLabel = null;
        _this.achievedPersonNumLabel = null;
        return _this;
    }
    SpreadGiftItemView.prototype.RefreshState = function (state, data) {
        var btn = this.node.getComponent(cc.Button);
        switch (state) {
            case WndSpreadGiftActivityView_1.RedPackState.Normal:
                this.nodeArr[0].active = true;
                this.nodeArr[1].active = false;
                this.lightNode.active = false;
                this.normalLabel.string = cc.js.formatStr("%s元", Global.Toolkit.formatPointStr(data.point));
                this.achievedLabel.string = cc.js.formatStr("%s元", Global.Toolkit.formatPointStr(data.point));
                this.personNumLabel.string = cc.js.formatStr("%s人", data.num);
                this.achievedPersonNumLabel.string = cc.js.formatStr("%s人", data.num);
                if (btn) {
                    btn.interactable = false;
                }
                break;
            case WndSpreadGiftActivityView_1.RedPackState.HightLight:
                this.nodeArr[0].active = true;
                this.nodeArr[1].active = false;
                this.lightNode.active = true;
                this.normalLabel.string = cc.js.formatStr("%s元", Global.Toolkit.formatPointStr(data.point));
                this.achievedLabel.string = cc.js.formatStr("%s元", Global.Toolkit.formatPointStr(data.point));
                this.personNumLabel.string = cc.js.formatStr("%s人", data.num);
                this.achievedPersonNumLabel.string = cc.js.formatStr("%s人", data.num);
                if (btn) {
                    btn.interactable = true;
                }
                break;
            case WndSpreadGiftActivityView_1.RedPackState.Open:
                this.nodeArr[0].active = false;
                this.nodeArr[1].active = true;
                this.lightNode.active = false;
                if (btn) {
                    btn.interactable = false;
                }
                break;
            default:
                break;
        }
    };
    __decorate([
        property([cc.Node])
    ], SpreadGiftItemView.prototype, "nodeArr", void 0);
    __decorate([
        property(cc.Node)
    ], SpreadGiftItemView.prototype, "lightNode", void 0);
    __decorate([
        property(cc.Label)
    ], SpreadGiftItemView.prototype, "achievedLabel", void 0);
    __decorate([
        property(cc.Label)
    ], SpreadGiftItemView.prototype, "normalLabel", void 0);
    __decorate([
        property(cc.Label)
    ], SpreadGiftItemView.prototype, "personNumLabel", void 0);
    __decorate([
        property(cc.Label)
    ], SpreadGiftItemView.prototype, "achievedPersonNumLabel", void 0);
    SpreadGiftItemView = __decorate([
        ccclass
    ], SpreadGiftItemView);
    return SpreadGiftItemView;
}(cc.Component));
exports.default = SpreadGiftItemView;

cc._RF.pop();