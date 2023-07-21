"use strict";
cc._RF.push(module, '66490iHSFdGNoX/H3XBe39K', 'PlayerWallet');
// hall/scripts/logic/core/component/PlayerWallet.ts

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
var ViewBase_1 = require("../ui/ViewBase");
var GlobalEvent_1 = require("../GlobalEvent");
var HallBtnHelper_1 = require("../../hall/ui/hall/views/HallBtnHelper");
var PlayerInfoModel_1 = require("../../hallcommon/model/PlayerInfoModel");
var PlayerWallet = /** @class */ (function (_super) {
    __extends(PlayerWallet, _super);
    function PlayerWallet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jbLabel = null;
        _this.SpineNode = null;
        // private yhLabel: cc.Label = null;
        _this.getTime = 0; //点击时长
        _this.img_shuaxin = null;
        return _this;
    }
    PlayerWallet.prototype.initView = function () {
        this.img_shuaxin = this.getChild("img_shuaxin");
        Global.UIHelper.addCommonClick(this.node, "img_shuaxin", this.refreshCoinBtnClick, this);
        this.jbLabel = this.getComponent("jbLabel", cc.Label);
        this.SpineNode = this.getComponent("refreshSkeleton", sp.Skeleton);
        //  Global.UIHelper.addCommonClick(this.node, "icon_yinhang", this.onBankClick, this);
        // this.yhLabel = this.getComponent("yhLabel",cc.Label);
        // this.addCommonClick("jbBox", this.jbBtnClickFunc, this, null);
        // this.addCommonClick("yhBox",this.yhBtnClickFunc,this, null);
    };
    PlayerWallet.prototype.onBankClick = function () {
        HallBtnHelper_1.default.WndBankOpen();
        Global.Audio.playAudioSource("hall/sound/bank");
    };
    //刷新事件
    PlayerWallet.prototype.refreshAction = function () {
        // this.addCommonClick("jinb_sx", this.refreshCoinBtnClick, this, null);
    };
    //充值事件
    PlayerWallet.prototype.rechargeAction = function () {
        this.addCommonClick("jbBox", this.jbBtnClickFunc, this, null);
    };
    PlayerWallet.prototype.onSubViewShow = function () {
        this.playerPointChange();
        //监听玩家金钱变化
        Global.Event.on(GlobalEvent_1.default.PERSONALINFOUPDATE, this, this.playerPointChange);
    };
    PlayerWallet.prototype.onSubViewHide = function () {
        //注销玩家金钱变化
        Global.Event.off(GlobalEvent_1.default.PERSONALINFOUPDATE, this, this.playerPointChange);
    };
    PlayerWallet.prototype.onDispose = function () {
        //注销玩家金钱变化
        Global.Event.off(GlobalEvent_1.default.PERSONALINFOUPDATE, this, this.playerPointChange);
    };
    //玩家金币变化
    PlayerWallet.prototype.playerPointChange = function () {
        // this.jbLabel.string = Global.Toolkit.formatPoint(Global.PlayerData.point, 3).toString();
        // this.yhLabel.string = Global.Toolkit.formatPoint(Global.PlayerData.bank_point, 3).toString();
        this.jbLabel.string = Global.Toolkit.formatPointStr(Global.PlayerData.point, true).toString();
        // this.yhLabel.string = Global.Toolkit.formatPointStr(Global.PlayerData.bank_point, true).toString();
    };
    //金币充值
    PlayerWallet.prototype.jbBtnClickFunc = function () {
        HallBtnHelper_1.default.WndRechargeOpen();
    };
    //银货充值
    PlayerWallet.prototype.yhBtnClickFunc = function () {
        HallBtnHelper_1.default.WndBankOpen();
    };
    PlayerWallet.prototype.sendLoadingTime = function () {
        clearTimeout(this.hearttime);
        var self = this;
        this.hearttime = setTimeout(function () {
            self.getTime++;
            if (self.getTime > 3) {
                self.getTime = 0;
                return;
            }
            self.sendLoadingTime();
        }, 1000 * 1);
    };
    PlayerWallet.prototype.refreshCoinBtnClick = function () {
        var _this = this;
        cc.tween(this.img_shuaxin).to(2, { rotation: 720 }).call(function () {
            _this.img_shuaxin.rotation = 0;
        }).start();
        if (this.getTime == 0) {
            this.getTime++;
            this.sendLoadingTime();
            PlayerInfoModel_1.default.instance.reqGetUserInfo(function (retObj) {
                Global.HallServer.event(NetAppface.GetUserInfo, retObj);
            }, function (error) {
            });
        }
        else {
            Logger.error("倒计时未结束 ==== " + this.getTime);
        }
    };
    return PlayerWallet;
}(ViewBase_1.default));
exports.default = PlayerWallet;

cc._RF.pop();