
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/playerInfo/VipPrivilegeViewItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwbGF5ZXJJbmZvXFxWaXBQcml2aWxlZ2VWaWV3SXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFrRCx3Q0FBWTtJQUE5RDtRQUFBLHFFQTREQztRQXpERyxVQUFJLEdBQWMsSUFBSSxDQUFDO1FBR3ZCLFNBQUcsR0FBWSxJQUFJLENBQUE7UUFHbkIsV0FBSyxHQUFrQixJQUFJLENBQUE7O0lBbUQvQixDQUFDO0lBL0NHOzs7O09BSUc7SUFDSCx3Q0FBUyxHQUFULFVBQVUsSUFBSSxFQUFFLEdBQUc7UUFDZixJQUFJLFdBQVcsR0FBRyxpREFBaUQsQ0FBQztRQUNwRSxJQUFJLFVBQVUsR0FBRyxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBQ25DLElBQUksUUFBUSxHQUFHLGFBQWEsR0FBRyxHQUFHLENBQUM7UUFDbkMsSUFBSSxNQUFNLEdBQUcsZ0JBQWdCLEdBQUcsR0FBRyxDQUFBO1FBR25DLFFBQVEsSUFBSSxFQUFFO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3BGLDBCQUEwQjtnQkFDeEIsSUFBRyxHQUFHLEdBQUMsQ0FBQyxFQUNSO29CQUNJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDO2lCQUN6QztxQkFFRDtvQkFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQztpQkFDekM7Z0JBQ0QsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDSCx5QkFBeUI7Z0JBQ3hCLE1BQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3BGLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDO2dCQUN2QyxNQUFLO1lBQ1QsS0FBSyxDQUFDO2dCQUNKLDBCQUEwQjtnQkFDeEIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDdEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0JBQ3JDLE1BQUs7WUFDVCxLQUFLLENBQUM7Z0JBQ0gseUJBQXlCO2dCQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO2dCQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7Z0JBQzNCLE1BQUs7WUFDVDtnQkFDSSxNQUFNO1NBQ2I7SUFFTCxDQUFDO0lBdEREO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7c0RBQ0c7SUFHdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztxREFDQTtJQUduQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO3VEQUNFO0lBVFYsb0JBQW9CO1FBRHhDLE9BQU87T0FDYSxvQkFBb0IsQ0E0RHhDO0lBQUQsMkJBQUM7Q0E1REQsQUE0REMsQ0E1RGlELEVBQUUsQ0FBQyxTQUFTLEdBNEQ3RDtrQkE1RG9CLG9CQUFvQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpcFByaXZpbGVnZVZpZXdJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgaWNvbiA6IGNjLlNwcml0ZSA9bnVsbDtcclxuICAgXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICB0aXA6Y2MuTGFiZWwgPSBudWxsXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgZ2xvcnk6Y2MuU3ByaXRlRnJhbWUgPSBudWxsXHJcblxyXG5cclxuICAgXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHR5cGUgMOWktOWDj+ahhiAx5o2V6bG854Ku5Y+wIDLkuJPlsZ7ooajmg4UgM+iNo+iAgOaSreaKpVxyXG4gICAgICogQHBhcmFtIHZpcCBcclxuICAgICAqL1xyXG4gICAgcmVmcmVzaFVJKHR5cGUsIHZpcCkge1xyXG4gICAgICAgIHZhciBhdGxhc1N0cmluZyA9IFwiaGFsbC90ZXh0dXJlL2hhbGwvdmlwX2F1dG9fYXRsYXMvdmlwX2F1dG9fYXRsYXNcIjtcclxuICAgICAgICB2YXIgc2ZCaWFvcWluZyA9IFwiYmlhb3FpbmdfXCIgKyB2aXA7XHJcbiAgICAgICAgdmFyIHNmUGFvdGFpID0gXCJpbWdfcGFvdGFpX1wiICsgdmlwO1xyXG4gICAgICAgIHZhciBzS3VhbmcgPSBcImltZ19hdmF0YXJfdmlwXCIgKyB2aXBcclxuXHJcblxyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRBdXRvQXRsYXModGhpcy5pY29uLCBhdGxhc1N0cmluZywgc0t1YW5nLCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgLy8gIHRoaXMudGlwLmZvbnRTaXplID0gMjZcclxuICAgICAgICAgICAgICAgIGlmKHZpcD45KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlwLnN0cmluZyA9IFwiVlwiICsgdmlwICsgXCLkuJPlsZ7lpLTlg4/moYZcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcC5zdHJpbmcgPSBcIlZcIiArIHZpcCArIFwi5LiT5bGe5aS05YOP5qGGXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAvLyB0aGlzLnRpcC5mb250U2l6ZSA9IDI0XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRBdXRvQXRsYXModGhpcy5pY29uLCBhdGxhc1N0cmluZywgc2ZQYW90YWksIG51bGwsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGlwLnN0cmluZyA9IFwiVlwiICsgdmlwICsgXCLkuJPlsZ7mjZXpsbzngq7lj7BcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAvLyAgdGhpcy50aXAuZm9udFNpemUgPSAyNlxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHRoaXMuaWNvbiwgYXRsYXNTdHJpbmcsIHNmQmlhb3FpbmcsIG51bGwsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGlwLnN0cmluZyA9IFwiVlwiICsgdmlwICsgXCLkuJPlsZ7ooajmg4VcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgLy8gdGhpcy50aXAuZm9udFNpemUgPSAyNlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uLnNwcml0ZUZyYW1lID0gdGhpcy5nbG9yeVxyXG4gICAgICAgICAgICAgICAgdGhpcy50aXAuc3RyaW5nID0gXCLojaPogIDlhaXlnLrmkq3miqVcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgIFxyXG59XHJcblxyXG5cclxuIl19