"use strict";
cc._RF.push(module, '1cf3fdE+GpGK7CHo7dTaq5+', 'BbwzBigWinnerView');
// bbwz/Bbwz/scripts/subview/BbwzBigWinnerView.ts

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
var BbwzDriver_1 = require("../BbwzDriver");
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
var BbwzBaseView_1 = require("./BbwzBaseView");
/**
 * 游戏层 大赢家
 */
var BbwzBigWinnerView = /** @class */ (function (_super) {
    __extends(BbwzBigWinnerView, _super);
    function BbwzBigWinnerView(node) {
        var _this = _super.call(this) || this;
        _this.bigSpine = null;
        _this.head = null;
        _this.head_kuang = null;
        _this.money = null;
        _this.nameLbl = null;
        _this.setNode(node);
        return _this;
    }
    BbwzBigWinnerView.prototype.initView = function () {
        this.bigSpine = cc.find("content/spine", this.node).getComponent(sp.Skeleton);
        this.head = cc.find("content/mask/sprite_head", this.node).getComponent(cc.Sprite);
        this.head_kuang = cc.find("content/head_kuang", this.node).getComponent(cc.Sprite);
        this.money = cc.find("content/bigwinMoney", this.node).getComponent(cc.Label);
        this.nameLbl = cc.find("content/name", this.node).getComponent(cc.Label);
    };
    BbwzBigWinnerView.prototype.updateUI = function (big_winner) {
        var _this = this;
        this.clear();
        if (big_winner && big_winner.nickname !== "") {
            this.head.spriteFrame = Global.Toolkit.getLocalHeadSf(big_winner.headimg);
            BbwzDriver_1.default.instance.loadVipHeadKuang(this.head_kuang, big_winner.a_box);
            this.money.string = Global.Toolkit.formatPointStr(big_winner.hitPoint, true, true);
            this.nameLbl.string = big_winner.nickname;
            this.bigSpine.setAnimation(0, "idle", false);
            Game.Component.scheduleOnce(function () {
                _this.head.node.active = true;
                _this.head_kuang.node.active = true;
                _this.money.node.active = true;
                _this.nameLbl.node.active = true;
            }, 0.5);
            Global.Audio.playBundleSound(BbwzConstDefine_1.default.GAME_ID, BbwzConstDefine_1.default.SOUND_WIN, true);
        }
    };
    BbwzBigWinnerView.prototype.clear = function () {
        this.head.node.active = false;
        this.head_kuang.node.active = false;
        this.money.node.active = false;
        this.nameLbl.node.active = false;
        this.bigSpine.clearTracks();
    };
    BbwzBigWinnerView.prototype.clearByRound = function () {
        this.active = false;
    };
    return BbwzBigWinnerView;
}(BbwzBaseView_1.default));
exports.default = BbwzBigWinnerView;

cc._RF.pop();