
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/hall/views/PlayerHeadView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b1363z76F9C/L8q31e5psQ3', 'PlayerHeadView');
// hall/scripts/logic/hall/ui/hall/views/PlayerHeadView.ts

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
var GlobalEvent_1 = require("../../../../core/GlobalEvent");
var ViewBase_1 = require("../../../../core/ui/ViewBase");
var PlayerInfoModel_1 = require("../../../../hallcommon/model/PlayerInfoModel");
var PlayerHeadView = /** @class */ (function (_super) {
    __extends(PlayerHeadView, _super);
    function PlayerHeadView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 头像框
         */
        _this.headKuang = null;
        /**
         * vip标识
         */
        _this.spriteVip = null;
        return _this;
    }
    PlayerHeadView.prototype.initView = function () {
        this.playerModel = Global.ModelManager.getModel("PlayerInfoModel");
        this.nameLabel = this.getComponent("nameLabel", cc.Label);
        this.idLabel = this.getComponent("playerID", cc.Label);
        this.headSprite = this.getComponent("headImg", cc.Sprite);
        this.headKuang = this.getComponent("headFrame", cc.Sprite);
        this.spriteVip = this.getComponent("vip_icon", cc.Sprite);
        this.hongdian = this.node.getChildByName("hongdian");
        this.spriteVipHongdian = this.getChild("vip_icon/hongdian");
        this.vipEffect = this.getChild("vip_icon/vipEffect");
        if (this.vipEffect) {
            this.vipEffect.active = false;
        }
        this.addCommonClick("vip_icon", this.onVipBtnFunc, this);
        if (this.spriteVip) {
            this.spriteVip.node.active = !Global.Setting.vipDisable;
        }
        this.addCommonClick("head", this.onHeadClick, this, null);
    };
    PlayerHeadView.prototype.onHeadClick = function () {
        Global.UI.show("WndPlayerInfo");
    };
    PlayerHeadView.prototype.onSubViewShow = function () {
        this.updateUserInfo();
        this.onShowVipReward();
        Global.Event.on(GlobalEvent_1.default.PERSONALINFOUPDATE, this, this.updateUserInfo);
        Global.Event.on(GlobalEvent_1.default.VIPREWARD, this, this.onShowVipReward);
    };
    PlayerHeadView.prototype.onSubViewHide = function () {
        Global.Event.off(GlobalEvent_1.default.PERSONALINFOUPDATE, this, this.updateUserInfo);
        Global.Event.off(GlobalEvent_1.default.VIPREWARD, this, this.onShowVipReward);
    };
    PlayerHeadView.prototype.onDispose = function () {
        Global.Event.off(GlobalEvent_1.default.PERSONALINFOUPDATE, this, this.updateUserInfo);
        Global.Event.off(GlobalEvent_1.default.VIPREWARD, this, this.onShowVipReward);
    };
    PlayerHeadView.prototype.updateUserHead = function () {
        var playerData = Global.PlayerData;
        var headImg = this.headSprite;
        if (headImg.node) {
            var w = headImg.node.width, h = headImg.node.height;
            headImg.spriteFrame = Global.Toolkit.getLocalHeadSf(playerData.headimg);
            headImg.node.width = w;
            headImg.node.height = h;
        }
        if (this.headKuang && this.headKuang.node && this.headKuang.node.isValid) {
            Global.Toolkit.loadLocalHeadFrameByVip(this.headKuang, playerData.headkuang, false, true);
        }
        if (this.spriteVip && this.spriteVip.node && this.spriteVip.node.isValid) {
            // this.spriteVip.string = Global.PlayerData.vip.toString()
            Global.Toolkit.loadVipIcon(this.spriteVip, playerData.vip);
        }
        if (this.hongdian) {
            if (playerData.phone != "") {
                this.hongdian.active = false;
            }
            else {
                this.hongdian.active = true;
            }
        }
    };
    PlayerHeadView.prototype.updateUserName = function () {
        var playerData = Global.PlayerData;
        if (this.nameLabel.node) {
            this.nameLabel.string = Global.Toolkit.removeEmoji(playerData.nickname);
        }
    };
    PlayerHeadView.prototype.updateUserInfo = function () {
        var playerData = Global.PlayerData;
        if (this.idLabel.node) {
            this.idLabel.string = "" + playerData.uid.toString();
        }
        this.updateUserHead();
        this.updateUserName();
    };
    /**
     * VIP图标点击
     */
    PlayerHeadView.prototype.onVipBtnFunc = function () {
        Global.Event.event(GlobalEvent_1.default.SHOW_NET_WAITING, "WndVip3");
        Global.UI.show("WndVip3");
    };
    PlayerHeadView.prototype.clearTimeOut = function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
        if (this.vipEffect && cc.isValid(this.vipEffect)) {
            this.vipEffect.active = false;
        }
        this.timer = null;
    };
    PlayerHeadView.prototype.onShowVipReward = function () {
        if (!PlayerInfoModel_1.default.instance.vip_reward) {
            if (this.spriteVipHongdian) {
                this.spriteVipHongdian.active = false;
            }
            if (this.vipEffect) {
                this.vipEffect.active = false;
            }
            return;
        }
        if (this.spriteVipHongdian) {
            var rewardFlag = PlayerInfoModel_1.default.instance.is_vip_reward > 0;
            var weekFlag = PlayerInfoModel_1.default.instance.is_week_reward > 0;
            var monthFlag = PlayerInfoModel_1.default.instance.is_month_reward > 0;
            if (this.vipEffect) {
                this.setTimer();
            }
            if (rewardFlag || weekFlag || monthFlag) {
                this.spriteVipHongdian.active = true;
            }
            else {
                this.spriteVipHongdian.active = false;
            }
        }
    };
    PlayerHeadView.prototype.setTimer = function () {
        var _this = this;
        this.clearTimeOut();
        this.timer = setInterval(function () {
            var rewardFlag = PlayerInfoModel_1.default.instance.is_vip_reward > 0;
            var weekFlag = PlayerInfoModel_1.default.instance.is_week_reward > 0;
            var monthFlag = PlayerInfoModel_1.default.instance.is_month_reward > 0;
            //  if (rewardFlag || monthFlag || weekFlag || !Global.PlayerData.vip){
            if (rewardFlag || monthFlag || weekFlag) {
                if (_this.vipEffect && cc.isValid(_this.vipEffect)) {
                    _this.vipEffect.active = true;
                    setTimeout(function () {
                        if (_this.vipEffect && cc.isValid(_this.vipEffect)) {
                            _this.vipEffect.active = false;
                        }
                    }, 5000);
                }
            }
            else {
                if (_this.vipEffect && cc.isValid(_this.vipEffect)) {
                    _this.vipEffect.active = false;
                    _this.clearTimeOut();
                }
            }
        }, 10000);
    };
    return PlayerHeadView;
}(ViewBase_1.default));
exports.default = PlayerHeadView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxoYWxsXFx2aWV3c1xcUGxheWVySGVhZFZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQXVEO0FBQ3ZELHlEQUFvRDtBQUNwRCxnRkFBMkU7QUFHM0U7SUFBNEMsa0NBQVE7SUFBcEQ7UUFBQSxxRUFnTUM7UUF2TEc7O1dBRUc7UUFDSCxlQUFTLEdBQWMsSUFBSSxDQUFDO1FBQzVCOztXQUVHO1FBQ0gsZUFBUyxHQUFjLElBQUksQ0FBQzs7SUFnTGhDLENBQUM7SUExS2EsaUNBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDbEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNwRCxJQUFJLENBQUMsaUJBQWlC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RCxJQUFJLEtBQUksQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQzlDLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtvQkFDN0IsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFBO2lCQUN0QjthQUNKO1FBRUwsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FoTUEsQUFnTUMsQ0FoTTJDLGtCQUFRLEdBZ01uRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHbG9iYWxFdmVudCBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9HbG9iYWxFdmVudFwiO1xyXG5pbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvdWkvVmlld0Jhc2VcIjtcclxuaW1wb3J0IFBsYXllckluZm9Nb2RlbCBmcm9tIFwiLi4vLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9QbGF5ZXJJbmZvTW9kZWxcIjtcclxuaW1wb3J0IEhhbGxCdG5IZWxwZXIgZnJvbSBcIi4vSGFsbEJ0bkhlbHBlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVySGVhZFZpZXcgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBuYW1lTGFiZWw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBpZExhYmVsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgaGVhZFNwcml0ZTogY2MuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSB2aXBFZmZlY3Q6Y2MuTm9kZVxyXG4gICAgcHJpdmF0ZSBwbGF5ZXJNb2RlbFxyXG5cclxuICAgIHByaXZhdGUgdGltZXI6YW55XHJcbiAgICAvKipcclxuICAgICAqIOWktOWDj+ahhlxyXG4gICAgICovXHJcbiAgICBoZWFkS3Vhbmc6IGNjLlNwcml0ZSA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIHZpcOagh+ivhlxyXG4gICAgICovXHJcbiAgICBzcHJpdGVWaXA6IGNjLlNwcml0ZSA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIHZpcOe6oueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3ByaXRlVmlwSG9uZ2RpYW46IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGhvbmdkaWFuOiBjYy5Ob2RlO1xyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMucGxheWVyTW9kZWwgPSBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiUGxheWVySW5mb01vZGVsXCIpXHJcbiAgICAgICAgdGhpcy5uYW1lTGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcIm5hbWVMYWJlbFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5pZExhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJwbGF5ZXJJRFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5oZWFkU3ByaXRlID0gdGhpcy5nZXRDb21wb25lbnQoXCJoZWFkSW1nXCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5oZWFkS3VhbmcgPSB0aGlzLmdldENvbXBvbmVudChcImhlYWRGcmFtZVwiLCBjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlVmlwID0gdGhpcy5nZXRDb21wb25lbnQoXCJ2aXBfaWNvblwiLCBjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMuaG9uZ2RpYW4gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJob25nZGlhblwiKVxyXG4gICAgICAgIHRoaXMuc3ByaXRlVmlwSG9uZ2RpYW4gPSB0aGlzLmdldENoaWxkKFwidmlwX2ljb24vaG9uZ2RpYW5cIilcclxuICAgICAgICB0aGlzLnZpcEVmZmVjdCA9ICB0aGlzLmdldENoaWxkKFwidmlwX2ljb24vdmlwRWZmZWN0XCIpXHJcbiAgICAgICAgaWYoIHRoaXMudmlwRWZmZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy52aXBFZmZlY3QuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcInZpcF9pY29uXCIsIHRoaXMub25WaXBCdG5GdW5jLCB0aGlzKTtcclxuICAgICAgICBpZiAodGhpcy5zcHJpdGVWaXApIHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVWaXAubm9kZS5hY3RpdmUgPSAhR2xvYmFsLlNldHRpbmcudmlwRGlzYWJsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImhlYWRcIiwgdGhpcy5vbkhlYWRDbGljaywgdGhpcywgbnVsbCk7XHJcbiAgICAgICBcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgb25IZWFkQ2xpY2soKVxyXG4gICAge1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kUGxheWVySW5mb1wiKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25TdWJWaWV3U2hvdygpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVVzZXJJbmZvKCk7XHJcbiAgICAgICAgdGhpcy5vblNob3dWaXBSZXdhcmQoKTtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub24oR2xvYmFsRXZlbnQuUEVSU09OQUxJTkZPVVBEQVRFLCB0aGlzLCB0aGlzLnVwZGF0ZVVzZXJJbmZvKTtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub24oR2xvYmFsRXZlbnQuVklQUkVXQVJELCB0aGlzLCB0aGlzLm9uU2hvd1ZpcFJld2FyZCk7XHJcbiAgICAgICBcclxuICAgIH1cclxuICAgIG9uU3ViVmlld0hpZGUoKVxyXG4gICAge1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vZmYoR2xvYmFsRXZlbnQuUEVSU09OQUxJTkZPVVBEQVRFLCB0aGlzLCB0aGlzLnVwZGF0ZVVzZXJJbmZvKTtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub2ZmKEdsb2JhbEV2ZW50LlZJUFJFV0FSRCwgdGhpcywgdGhpcy5vblNob3dWaXBSZXdhcmQpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzcG9zZSgpIHtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub2ZmKEdsb2JhbEV2ZW50LlBFUlNPTkFMSU5GT1VQREFURSwgdGhpcywgdGhpcy51cGRhdGVVc2VySW5mbyk7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihHbG9iYWxFdmVudC5WSVBSRVdBUkQsIHRoaXMsIHRoaXMub25TaG93VmlwUmV3YXJkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVVzZXJIZWFkKCkge1xyXG4gICAgICAgIGxldCBwbGF5ZXJEYXRhID0gR2xvYmFsLlBsYXllckRhdGE7XHJcbiAgICAgICAgbGV0IGhlYWRJbWcgPSB0aGlzLmhlYWRTcHJpdGU7XHJcbiAgICAgICAgaWYgKGhlYWRJbWcubm9kZSkge1xyXG4gICAgICAgICAgICBsZXQgdyA9IGhlYWRJbWcubm9kZS53aWR0aCxcclxuICAgICAgICAgICAgICAgIGggPSBoZWFkSW1nLm5vZGUuaGVpZ2h0O1xyXG4gICAgICAgICAgICBoZWFkSW1nLnNwcml0ZUZyYW1lID0gR2xvYmFsLlRvb2xraXQuZ2V0TG9jYWxIZWFkU2YocGxheWVyRGF0YS5oZWFkaW1nKTtcclxuICAgICAgICAgICAgaGVhZEltZy5ub2RlLndpZHRoID0gdztcclxuICAgICAgICAgICAgaGVhZEltZy5ub2RlLmhlaWdodCA9IGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmhlYWRLdWFuZyAmJiB0aGlzLmhlYWRLdWFuZy5ub2RlICYmIHRoaXMuaGVhZEt1YW5nLm5vZGUuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBHbG9iYWwuVG9vbGtpdC5sb2FkTG9jYWxIZWFkRnJhbWVCeVZpcCh0aGlzLmhlYWRLdWFuZywgcGxheWVyRGF0YS5oZWFka3VhbmcsZmFsc2UsdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zcHJpdGVWaXAgJiYgdGhpcy5zcHJpdGVWaXAubm9kZSAmJiB0aGlzLnNwcml0ZVZpcC5ub2RlLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAvLyB0aGlzLnNwcml0ZVZpcC5zdHJpbmcgPSBHbG9iYWwuUGxheWVyRGF0YS52aXAudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICBHbG9iYWwuVG9vbGtpdC5sb2FkVmlwSWNvbih0aGlzLnNwcml0ZVZpcCwgcGxheWVyRGF0YS52aXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ob25nZGlhbikge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyRGF0YS5waG9uZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbmdkaWFuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob25nZGlhbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlVXNlck5hbWUoKSB7XHJcbiAgICAgICAgbGV0IHBsYXllckRhdGEgPSBHbG9iYWwuUGxheWVyRGF0YTtcclxuICAgICAgICBpZiAodGhpcy5uYW1lTGFiZWwubm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5hbWVMYWJlbC5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5yZW1vdmVFbW9qaShwbGF5ZXJEYXRhLm5pY2tuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVVzZXJJbmZvKCkge1xyXG4gICAgICAgIGxldCBwbGF5ZXJEYXRhID0gR2xvYmFsLlBsYXllckRhdGE7XHJcbiAgICAgICAgaWYgKHRoaXMuaWRMYWJlbC5ub2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaWRMYWJlbC5zdHJpbmcgPSBcIlwiICsgcGxheWVyRGF0YS51aWQudG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVVc2VySGVhZCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVXNlck5hbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZJUOWbvuagh+eCueWHu1xyXG4gICAgICovXHJcbiAgICBvblZpcEJ0bkZ1bmMoKSB7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNIT1dfTkVUX1dBSVRJTkcsIFwiV25kVmlwM1wiKVxyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kVmlwM1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhclRpbWVPdXQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMudGltZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMudmlwRWZmZWN0ICYmIGNjLmlzVmFsaWQodGhpcy52aXBFZmZlY3QpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy52aXBFZmZlY3QuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50aW1lciA9IG51bGxcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIG9uU2hvd1ZpcFJld2FyZCgpIHtcclxuICAgICAgICBpZighUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcF9yZXdhcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLnNwcml0ZVZpcEhvbmdkaWFuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVZpcEhvbmdkaWFuLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy52aXBFZmZlY3QpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlwRWZmZWN0LmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnNwcml0ZVZpcEhvbmdkaWFuKSB7XHJcbiAgICAgICAgICAgIGxldCByZXdhcmRGbGFnID0gUGxheWVySW5mb01vZGVsLmluc3RhbmNlLmlzX3ZpcF9yZXdhcmQgPiAwXHJcbiAgICAgICAgICAgIGxldCB3ZWVrRmxhZyA9IFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS5pc193ZWVrX3Jld2FyZCA+MFxyXG4gICAgICAgICAgICBsZXQgbW9udGhGbGFnID0gUGxheWVySW5mb01vZGVsLmluc3RhbmNlLmlzX21vbnRoX3Jld2FyZD4wXHJcbiAgICAgICAgICAgIGlmKHRoaXMudmlwRWZmZWN0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRpbWVyKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIHJld2FyZEZsYWcgfHwgd2Vla0ZsYWcgfHwgbW9udGhGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVZpcEhvbmdkaWFuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVZpcEhvbmdkaWFuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZXIoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhclRpbWVPdXQoKVxyXG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZXdhcmRGbGFnID0gUGxheWVySW5mb01vZGVsLmluc3RhbmNlLmlzX3ZpcF9yZXdhcmQgPiAwXHJcbiAgICAgICAgICAgIGxldCB3ZWVrRmxhZyA9IFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS5pc193ZWVrX3Jld2FyZCA+IDBcclxuICAgICAgICAgICAgbGV0IG1vbnRoRmxhZyA9IFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS5pc19tb250aF9yZXdhcmQgPiAwXHJcbiAgICAgICAgICAvLyAgaWYgKHJld2FyZEZsYWcgfHwgbW9udGhGbGFnIHx8IHdlZWtGbGFnIHx8ICFHbG9iYWwuUGxheWVyRGF0YS52aXApe1xyXG4gICAgICAgICAgICBpZiAocmV3YXJkRmxhZyB8fCBtb250aEZsYWcgfHwgd2Vla0ZsYWcpe1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmlwRWZmZWN0ICYmIGNjLmlzVmFsaWQodGhpcy52aXBFZmZlY3QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aXBFZmZlY3QuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy52aXBFZmZlY3QgJiYgY2MuaXNWYWxpZCh0aGlzLnZpcEVmZmVjdCkpIHsgdGhpcy52aXBFZmZlY3QuYWN0aXZlID0gZmFsc2UgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmlwRWZmZWN0ICYmIGNjLmlzVmFsaWQodGhpcy52aXBFZmZlY3QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aXBFZmZlY3QuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGltZU91dCgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSwgMTAwMDApO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==