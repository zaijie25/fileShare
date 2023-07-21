"use strict";
cc._RF.push(module, '19e74oDk/dAkJ1LS5WimHsa', 'VipPrivilegeViewItem');
// hall/scripts/logic/hall/ui/playerInfo/VipPrivilegeViewItem.ts

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
var VipPrivilegeViewItem = /** @class */ (function (_super) {
    __extends(VipPrivilegeViewItem, _super);
    function VipPrivilegeViewItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.icon = null;
        _this.tip = null;
        _this.glory = null;
        return _this;
    }
    /**
     *
     * @param type 0头像框 1捕鱼炮台 2专属表情 3荣耀播报
     * @param vip
     */
    VipPrivilegeViewItem.prototype.refreshUI = function (type, vip) {
        var atlasString = "hall/texture/hall/vip_auto_atlas/vip_auto_atlas";
        var sfBiaoqing = "biaoqing_" + vip;
        var sfPaotai = "img_paotai_" + vip;
        var sKuang = "img_avatar_vip" + vip;
        switch (type) {
            case 0:
                Global.ResourceManager.loadAutoAtlas(this.icon, atlasString, sKuang, null, false);
                //  this.tip.fontSize = 26
                if (vip > 9) {
                    this.tip.string = "V" + vip + "专属头像框";
                }
                else {
                    this.tip.string = "V" + vip + "专属头像框";
                }
                break;
            case 1:
                // this.tip.fontSize = 24
                Global.ResourceManager.loadAutoAtlas(this.icon, atlasString, sfPaotai, null, false);
                this.tip.string = "V" + vip + "专属捕鱼炮台";
                break;
            case 2:
                //  this.tip.fontSize = 26
                Global.ResourceManager.loadAutoAtlas(this.icon, atlasString, sfBiaoqing, null, false);
                this.tip.string = "V" + vip + "专属表情";
                break;
            case 3:
                // this.tip.fontSize = 26
                this.icon.spriteFrame = this.glory;
                this.tip.string = "荣耀入场播报";
                break;
            default:
                break;
        }
    };
    __decorate([
        property(cc.Sprite)
    ], VipPrivilegeViewItem.prototype, "icon", void 0);
    __decorate([
        property(cc.Label)
    ], VipPrivilegeViewItem.prototype, "tip", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], VipPrivilegeViewItem.prototype, "glory", void 0);
    VipPrivilegeViewItem = __decorate([
        ccclass
    ], VipPrivilegeViewItem);
    return VipPrivilegeViewItem;
}(cc.Component));
exports.default = VipPrivilegeViewItem;

cc._RF.pop();