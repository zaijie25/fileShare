"use strict";
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