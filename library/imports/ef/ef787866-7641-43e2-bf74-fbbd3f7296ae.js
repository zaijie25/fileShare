"use strict";
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