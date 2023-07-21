"use strict";
cc._RF.push(module, 'ecfeajwhZJLp5ci1deoa6OD', 'BbwzOnlinePlayerView');
// bbwz/Bbwz/scripts/subview/player/BbwzOnlinePlayerView.ts

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
var BbwzBaseView_1 = require("../BbwzBaseView");
var BbwzConstDefine_1 = require("../../data/BbwzConstDefine");
var BbwzDriver_1 = require("../../BbwzDriver");
var BbwzData_1 = require("../../data/BbwzData");
var BbwzOnlinePlayerView = /** @class */ (function (_super) {
    __extends(BbwzOnlinePlayerView, _super);
    function BbwzOnlinePlayerView(node, chair) {
        var _this = _super.call(this) || this;
        _this.chair = chair;
        _this.isAniming = false;
        _this.setNode(node);
        return _this;
    }
    BbwzOnlinePlayerView.prototype.initView = function () {
        this.label = this.getComponent("countLbl", cc.Label);
        BbwzConstDefine_1.default.addCommonClick(this.node, "", this.onButtonCLick, this);
        BbwzData_1.default.instance.playerChipsFlyPos[this.chair] = this.getCenterWorldPos();
    };
    BbwzOnlinePlayerView.prototype.onButtonCLick = function () {
        BbwzConstDefine_1.default.playBtnSound();
        Game.Server.send(BbwzConstDefine_1.default.SEND_ONLINE_PLAYER_LIST, {});
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, BbwzDriver_1.default.instance.onlinePop.loadingKey, 3);
        BbwzDriver_1.default.instance.onlinePop.node.active = true;
    };
    BbwzOnlinePlayerView.prototype.setCountLbl = function (isShow, count) {
        this.label.node.active = isShow;
        if (isShow)
            this.label.string = count.toString();
    };
    /**
     * 播放在线玩家按钮的下注动画
     * @param timeScale
     */
    BbwzOnlinePlayerView.prototype.playBetAnim = function (timeScale) {
        var _this = this;
        if (this.isAniming) {
            return;
        }
        var tween = Game.Tween.get(this.node);
        this.isAniming = true;
        this.node.scale = 1;
        tween.delay(0.1)
            .to(0.6 * timeScale, { scale: 1.05 }, cc.easeQuarticActionInOut())
            .to(0.4 * timeScale, { scale: 1 }, cc.easeCubicActionInOut())
            .call(function () {
            _this.isAniming = false;
        })
            .start();
    };
    BbwzOnlinePlayerView.prototype.getCenterWorldPos = function () {
        return this.node.parent.convertToWorldSpaceAR(this.node.position);
    };
    BbwzOnlinePlayerView.prototype.clearByRound = function () {
        _super.prototype.clearByRound.call(this);
        this.node.stopAllActions();
        this.node.scale = 1;
        this.isAniming = false;
    };
    //返回头像之间点的世界坐标
    BbwzOnlinePlayerView.prototype.getChipStartPos = function () {
        return this.node.parent.convertToWorldSpaceAR(this.node.position);
    };
    return BbwzOnlinePlayerView;
}(BbwzBaseView_1.default));
exports.default = BbwzOnlinePlayerView;

cc._RF.pop();