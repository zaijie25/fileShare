
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/subView/DdzRoleView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ef787hmdkFD4r90+70/cpau', 'DdzRoleView');
// ddz/ddz/scripts/subView/DdzRoleView.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DdzRoleDefine = void 0;
var DdzBaseView_1 = require("./DdzBaseView");
var DdzDriver_1 = require("../DdzDriver");
var DdzRoleDefine;
(function (DdzRoleDefine) {
    DdzRoleDefine[DdzRoleDefine["FLandord"] = 1] = "FLandord";
    DdzRoleDefine[DdzRoleDefine["FFramer"] = 2] = "FFramer";
})(DdzRoleDefine = exports.DdzRoleDefine || (exports.DdzRoleDefine = {}));
var DdzRoleView = /** @class */ (function (_super) {
    __extends(DdzRoleView, _super);
    function DdzRoleView(node) {
        var _this = _super.call(this) || this;
        _this.nCurRole = 0; // 1地主 2农民
        _this.setNode(node);
        return _this;
    }
    DdzRoleView.prototype.initView = function () {
        this.farmerSk = this.getComponent('farmer', sp.Skeleton);
        this.farmerSk.node.active = false;
        this.landlordSk = this.getComponent('landlord', sp.Skeleton);
        this.landlordSk.node.active = false;
        this.switchSk = this.getComponent('switch', sp.Skeleton);
        this.switchSk.node.active = false;
    };
    /**
     *
     * @param isShow
     * @param nRole 1地主 2农民
     */
    DdzRoleView.prototype.showRole = function (isShow, nRole) {
        if (nRole === void 0) { nRole = 0; }
        if (!DdzDriver_1.default.instance.skinDefine.useRole)
            return;
        if (isShow) {
            if (nRole == DdzRoleDefine.FLandord) {
                this.farmerSk.node.active = false;
                this.landlordSk.node.active = true;
            }
            else if (nRole == DdzRoleDefine.FFramer) {
                this.farmerSk.node.active = true;
                this.landlordSk.node.active = false;
            }
            this.nCurRole = nRole;
            this.playRoleNormalEffect();
        }
        else {
            this.farmerSk.node.active = false;
            this.landlordSk.node.active = false;
        }
    };
    DdzRoleView.prototype.switchRole = function () {
        var _this = this;
        if (!DdzDriver_1.default.instance.skinDefine.useRole)
            return;
        this.showRole(false);
        this.switchSk.node.active = true;
        this.switchSk.setAnimation(0, 'idle', false);
        Game.Component.scheduleOnce(function () {
            _this.switchSk.node.active = false;
            _this.showRole(true, 1);
        }, 0.3);
    };
    DdzRoleView.prototype.playRoleEffect = function (actName, isLoop, delay) {
        if (isLoop === void 0) { isLoop = true; }
        if (delay === void 0) { delay = 1; }
        if (!DdzDriver_1.default.instance.skinDefine.useRole)
            return;
        if (this.nCurRole == DdzRoleDefine.FLandord) {
            this.landlordSk.setAnimation(0, actName, isLoop);
            if (!isLoop) {
                this.landlordSk.addAnimation(0, DdzRoleView.RoleAct.Normal, true, delay);
            }
        }
        else if (this.nCurRole == DdzRoleDefine.FFramer) {
            this.farmerSk.setAnimation(0, actName, isLoop);
            if (!isLoop) {
                this.farmerSk.addAnimation(0, DdzRoleView.RoleAct.Normal, true, delay);
            }
        }
    };
    DdzRoleView.prototype.playRoleNormalEffect = function () {
        if (!DdzDriver_1.default.instance.skinDefine.useRole)
            return;
        if (this.nCurRole == DdzRoleDefine.FLandord) {
            this.landlordSk.setAnimation(0, DdzRoleView.RoleAct.Normal, true);
        }
        else if (this.nCurRole == DdzRoleDefine.FFramer) {
            this.farmerSk.setAnimation(0, DdzRoleView.RoleAct.Normal, true);
        }
    };
    DdzRoleView.prototype.playRoleThinkEffect = function () {
        if (!DdzDriver_1.default.instance.skinDefine.useRole)
            return;
        if (this.nCurRole == DdzRoleDefine.FLandord) {
            this.landlordSk.setAnimation(0, DdzRoleView.RoleAct.Think, true);
        }
        else if (this.nCurRole == DdzRoleDefine.FFramer) {
            this.farmerSk.setAnimation(0, DdzRoleView.RoleAct.Think, true);
        }
    };
    DdzRoleView.prototype.playRoleSettleEffect = function (isWin) {
        if (!DdzDriver_1.default.instance.skinDefine.useRole)
            return;
        var animName = isWin && DdzRoleView.RoleAct.Win || DdzRoleView.RoleAct.Lose;
        if (this.nCurRole == DdzRoleDefine.FLandord) {
            this.landlordSk.setAnimation(0, animName, true);
        }
        else if (this.nCurRole == DdzRoleDefine.FFramer) {
            this.farmerSk.setAnimation(0, animName, true);
        }
    };
    DdzRoleView.prototype.playRoleOutPokersEffect = function (isBomb) {
        if (!DdzDriver_1.default.instance.skinDefine.useRole)
            return;
        if (this.nCurRole == DdzRoleDefine.FLandord) {
            this.landlordSk.setAnimation(0, DdzRoleView.RoleAct.Play, false);
            if (isBomb) {
                this.landlordSk.addAnimation(0, DdzRoleView.RoleAct.Win, false, 1);
                this.landlordSk.addAnimation(0, DdzRoleView.RoleAct.Normal, true, 1);
            }
            else {
                this.landlordSk.addAnimation(0, DdzRoleView.RoleAct.Normal, true, 1);
            }
        }
        else if (this.nCurRole == DdzRoleDefine.FFramer) {
            this.farmerSk.setAnimation(0, DdzRoleView.RoleAct.Play, false);
            if (isBomb) {
                this.farmerSk.addAnimation(0, DdzRoleView.RoleAct.Win, false, 1);
                this.farmerSk.addAnimation(0, DdzRoleView.RoleAct.Normal, true, 1);
            }
            else {
                this.farmerSk.addAnimation(0, DdzRoleView.RoleAct.Normal, true, 1);
            }
        }
    };
    DdzRoleView.RoleAct = {
        Normal: 'idle',
        Play: 'idle_chupai',
        Win: 'idle_win',
        Lose: 'idle_shibai',
        Think: 'idle_sikao',
    };
    return DdzRoleView;
}(DdzBaseView_1.default));
exports.default = DdzRoleView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXHN1YlZpZXdcXERkelJvbGVWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBd0M7QUFDeEMsMENBQXFDO0FBRXJDLElBQVksYUFHWDtBQUhELFdBQVksYUFBYTtJQUNyQix5REFBWSxDQUFBO0lBQ1osdURBQU8sQ0FBQTtBQUNYLENBQUMsRUFIVyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQUd4QjtBQUVEO0lBQXlDLCtCQUFXO0lBWWhELHFCQUFZLElBQUk7UUFBaEIsWUFDSSxpQkFBTyxTQUVWO1FBSk8sY0FBUSxHQUFXLENBQUMsQ0FBQyxDQUFHLFVBQVU7UUFHdEMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQUVTLDhCQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBZ0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLFVBQVUsR0FBZ0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEMsSUFBSSxDQUFDLFFBQVEsR0FBZ0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSw4QkFBUSxHQUFmLFVBQWdCLE1BQWUsRUFBRSxL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QUFPLEVBQUM7WUFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQy9ELElBQUksTUFBTSxFQUFDO2dCQUNQLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDdEU7aUJBQ0c7Z0JBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzthQUN0RTtTQUNKO0lBQ0wsQ0FBQztJQWhKYSxtQkFBTyxHQUFHO1FBQ3BCLE1BQU0sRUFBRSxNQUFNO1FBQ2QsSUFBSSxFQUFFLGFBQWE7UUFDbkIsR0FBRyxFQUFFLFVBQVU7UUFDZixJQUFJLEVBQUUsYUFBYTtRQUNuQixLQUFLLEVBQUUsWUFBWTtLQUN0QixDQUFDO0lBMklOLGtCQUFDO0NBbEpELEFBa0pDLENBbEp3QyxxQkFBVyxHQWtKbkQ7a0JBbEpvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERkekJhc2VWaWV3IGZyb20gXCIuL0RkekJhc2VWaWV3XCI7XHJcbmltcG9ydCBEZHpEcml2ZXIgZnJvbSBcIi4uL0RkekRyaXZlclwiO1xyXG5cclxuZXhwb3J0IGVudW0gRGR6Um9sZURlZmluZXtcclxuICAgIEZMYW5kb3JkID0gMSwgICAvLyDnlLflnLDkuLtcclxuICAgIEZGcmFtZXIsICAgICAgICAvLyDnlLflhpzmsJFcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGR6Um9sZVZpZXcgZXh0ZW5kcyBEZHpCYXNlVmlld3tcclxuICAgIHB1YmxpYyBzdGF0aWMgUm9sZUFjdCA9IHtcclxuICAgICAgICBOb3JtYWw6ICdpZGxlJyxcclxuICAgICAgICBQbGF5OiAnaWRsZV9jaHVwYWknLFxyXG4gICAgICAgIFdpbjogJ2lkbGVfd2luJyxcclxuICAgICAgICBMb3NlOiAnaWRsZV9zaGliYWknLFxyXG4gICAgICAgIFRoaW5rOiAnaWRsZV9zaWthbycsXHJcbiAgICB9O1xyXG4gICAgcHJpdmF0ZSBmYXJtZXJTazogc3AuU2tlbGV0b247XHJcbiAgICBwcml2YXRlIGxhbmRsb3JkU2s6IHNwLlNrZWxldG9uO1xyXG4gICAgcHJpdmF0ZSBzd2l0Y2hTazogc3AuU2tlbGV0b247XHJcbiAgICBwcml2YXRlIG5DdXJSb2xlOiBudW1iZXIgPSAwOyAgIC8vIDHlnLDkuLsgMuWGnOawkVxyXG4gICAgY29uc3RydWN0b3Iobm9kZSl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5mYXJtZXJTayA9IDxzcC5Ta2VsZXRvbj50aGlzLmdldENvbXBvbmVudCgnZmFybWVyJywgc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMuZmFybWVyU2subm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxhbmRsb3JkU2sgPSA8c3AuU2tlbGV0b24+dGhpcy5nZXRDb21wb25lbnQoJ2xhbmRsb3JkJywgc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMubGFuZGxvcmRTay5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3dpdGNoU2sgPSA8c3AuU2tlbGV0b24+dGhpcy5nZXRDb21wb25lbnQoJ3N3aXRjaCcsIHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLnN3aXRjaFNrLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBpc1Nob3cgXHJcbiAgICAgKiBAcGFyYW0gblJvbGUgMeWcsOS4uyAy5Yac5rCRXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93Um9sZShpc1Nob3c6IGJvb2xlYW4sIG5Sb2xlOiBudW1iZXIgPSAwKXtcclxuICAgICAgICBpZiAoIURkekRyaXZlci5pbnN0YW5jZS5za2luRGVmaW5lLnVzZVJvbGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoaXNTaG93KXtcclxuICAgICAgICAgICAgaWYgKG5Sb2xlID09IERkelJvbGVEZWZpbmUuRkxhbmRvcmQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mYXJtZXJTay5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYW5kbG9yZFNrLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChuUm9sZSA9PSBEZHpSb2xlRGVmaW5lLkZGcmFtZXIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mYXJtZXJTay5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhbmRsb3JkU2subm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5DdXJSb2xlID0gblJvbGU7XHJcbiAgICAgICAgICAgIHRoaXMucGxheVJvbGVOb3JtYWxFZmZlY3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5mYXJtZXJTay5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxhbmRsb3JkU2subm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN3aXRjaFJvbGUoKXtcclxuICAgICAgICBpZiAoIURkekRyaXZlci5pbnN0YW5jZS5za2luRGVmaW5lLnVzZVJvbGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5zaG93Um9sZShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5zd2l0Y2hTay5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zd2l0Y2hTay5zZXRBbmltYXRpb24oMCwgJ2lkbGUnLCBmYWxzZSk7XHJcbiAgICAgICAgR2FtZS5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoU2subm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93Um9sZSh0cnVlLCAxKTtcclxuICAgICAgICB9LCAwLjMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwbGF5Um9sZUVmZmVjdChhY3ROYW1lOiBzdHJpbmcsIGlzTG9vcDogYm9vbGVhbiA9IHRydWUsIGRlbGF5ID0gMSl7XHJcbiAgICAgICAgaWYgKCFEZHpEcml2ZXIuaW5zdGFuY2Uuc2tpbkRlZmluZS51c2VSb2xlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm5DdXJSb2xlID09IERkelJvbGVEZWZpbmUuRkxhbmRvcmQpe1xyXG4gICAgICAgICAgICB0aGlzLmxhbmRsb3JkU2suc2V0QW5pbWF0aW9uKDAsIGFjdE5hbWUsIGlzTG9vcCk7XHJcbiAgICAgICAgICAgIGlmICghaXNMb29wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFuZGxvcmRTay5hZGRBbmltYXRpb24oMCwgRGR6Um9sZVZpZXcuUm9sZUFjdC5Ob3JtYWwsIHRydWUsIGRlbGF5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMubkN1clJvbGUgPT0gRGR6Um9sZURlZmluZS5GRnJhbWVyKXtcclxuICAgICAgICAgICAgdGhpcy5mYXJtZXJTay5zZXRBbmltYXRpb24oMCwgYWN0TmFtZSwgaXNMb29wKTtcclxuICAgICAgICAgICAgaWYgKCFpc0xvb3Ape1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mYXJtZXJTay5hZGRBbmltYXRpb24oMCwgRGR6Um9sZVZpZXcuUm9sZUFjdC5Ob3JtYWwsIHRydWUsIGRlbGF5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGxheVJvbGVOb3JtYWxFZmZlY3QoKXtcclxuICAgICAgICBpZiAoIURkekRyaXZlci5pbnN0YW5jZS5za2luRGVmaW5lLnVzZVJvbGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5uQ3VyUm9sZSA9PSBEZHpSb2xlRGVmaW5lLkZMYW5kb3JkKXtcclxuICAgICAgICAgICAgdGhpcy5sYW5kbG9yZFNrLnNldEFuaW1hdGlvbigwLCBEZHpSb2xlVmlldy5Sb2xlQWN0Lk5vcm1hbCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5uQ3VyUm9sZSA9PSBEZHpSb2xlRGVmaW5lLkZGcmFtZXIpe1xyXG4gICAgICAgICAgICB0aGlzLmZhcm1lclNrLnNldEFuaW1hdGlvbigwLCBEZHpSb2xlVmlldy5Sb2xlQWN0Lk5vcm1hbCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwbGF5Um9sZVRoaW5rRWZmZWN0KCl7XHJcbiAgICAgICAgaWYgKCFEZHpEcml2ZXIuaW5zdGFuY2Uuc2tpbkRlZmluZS51c2VSb2xlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMubkN1clJvbGUgPT0gRGR6Um9sZURlZmluZS5GTGFuZG9yZCl7XHJcbiAgICAgICAgICAgIHRoaXMubGFuZGxvcmRTay5zZXRBbmltYXRpb24oMCwgRGR6Um9sZVZpZXcuUm9sZUFjdC5UaGluaywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5uQ3VyUm9sZSA9PSBEZHpSb2xlRGVmaW5lLkZGcmFtZXIpe1xyXG4gICAgICAgICAgICB0aGlzLmZhcm1lclNrLnNldEFuaW1hdGlvbigwLCBEZHpSb2xlVmlldy5Sb2xlQWN0LlRoaW5rLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXlSb2xlU2V0dGxlRWZmZWN0KGlzV2luOiBib29sZWFuKXtcclxuICAgICAgICBpZiAoIURkekRyaXZlci5pbnN0YW5jZS5za2luRGVmaW5lLnVzZVJvbGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgYW5pbU5hbWUgPSBpc1dpbiAmJiBEZHpSb2xlVmlldy5Sb2xlQWN0LldpbiB8fCBEZHpSb2xlVmlldy5Sb2xlQWN0Lkxvc2U7XHJcbiAgICAgICAgaWYgKHRoaXMubkN1clJvbGUgPT0gRGR6Um9sZURlZmluZS5GTGFuZG9yZCl7XHJcbiAgICAgICAgICAgIHRoaXMubGFuZGxvcmRTay5zZXRBbmltYXRpb24oMCwgYW5pbU5hbWUsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMubkN1clJvbGUgPT0gRGR6Um9sZURlZmluZS5GRnJhbWVyKXtcclxuICAgICAgICAgICAgdGhpcy5mYXJtZXJTay5zZXRBbmltYXRpb24oMCwgYW5pbU5hbWUsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGxheVJvbGVPdXRQb2tlcnNFZmZlY3QoaXNCb21iOiBib29sZWFuKXtcclxuICAgICAgICBpZiAoIURkekRyaXZlci5pbnN0YW5jZS5za2luRGVmaW5lLnVzZVJvbGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5uQ3VyUm9sZSA9PSBEZHpSb2xlRGVmaW5lLkZMYW5kb3JkKXtcclxuICAgICAgICAgICAgdGhpcy5sYW5kbG9yZFNrLnNldEFuaW1hdGlvbigwLCBEZHpSb2xlVmlldy5Sb2xlQWN0LlBsYXksIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKGlzQm9tYil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhbmRsb3JkU2suYWRkQW5pbWF0aW9uKDAsIERkelJvbGVWaWV3LlJvbGVBY3QuV2luLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhbmRsb3JkU2suYWRkQW5pbWF0aW9uKDAsIERkelJvbGVWaWV3LlJvbGVBY3QuTm9ybWFsLCB0cnVlLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYW5kbG9yZFNrLmFkZEFuaW1hdGlvbigwLCBEZHpSb2xlVmlldy5Sb2xlQWN0Lk5vcm1hbCwgdHJ1ZSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLm5DdXJSb2xlID09IERkelJvbGVEZWZpbmUuRkZyYW1lcil7XHJcbiAgICAgICAgICAgIHRoaXMuZmFybWVyU2suc2V0QW5pbWF0aW9uKDAsIERkelJvbGVWaWV3LlJvbGVBY3QuUGxheSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoaXNCb21iKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmFybWVyU2suYWRkQW5pbWF0aW9uKDAsIERkelJvbGVWaWV3LlJvbGVBY3QuV2luLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhcm1lclNrLmFkZEFuaW1hdGlvbigwLCBEZHpSb2xlVmlldy5Sb2xlQWN0Lk5vcm1hbCwgdHJ1ZSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmFybWVyU2suYWRkQW5pbWF0aW9uKDAsIERkelJvbGVWaWV3LlJvbGVBY3QuTm9ybWFsLCB0cnVlLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==