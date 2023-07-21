"use strict";
cc._RF.push(module, '7955e4qR4hIz7h8t70eIwrK', 'BbwzStateView');
// bbwz/Bbwz/scripts/subview/BbwzStateView.ts

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
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
var BbwzBaseView_1 = require("./BbwzBaseView");
var BbwzTimeAutoRun_1 = require("../component/BbwzTimeAutoRun");
/**
 * 游戏层 状态控制组件
 */
var BbwzStateView = /** @class */ (function (_super) {
    __extends(BbwzStateView, _super);
    function BbwzStateView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    BbwzStateView.prototype.initView = function () {
        this.betStartNode = this.getChild("state_1");
        this.betStartSk = this.getComponent("state_1/spine", sp.Skeleton);
        this.betEndNode = this.getChild("state_3");
        this.betEndSk = this.getComponent("state_3/spine", sp.Skeleton);
        this.betTimeNode = this.getChild("state_2");
        this.timeRunComp = Global.UIHelper.safeGetComponent(this.betTimeNode, "timeLbl", BbwzTimeAutoRun_1.BbwzTimeAutoRun);
        this.timeRunComp.node.active = false;
    };
    BbwzStateView.prototype.runState = function (gameState, isPlayAnim) {
        if (isPlayAnim === void 0) { isPlayAnim = true; }
        this.active = true;
        this.betStartNode.active = gameState == BbwzConstDefine_1.BbwzGameState.BetStart;
        this.betEndNode.active = gameState == BbwzConstDefine_1.BbwzGameState.BetEnd;
        this.betTimeNode.active = gameState == BbwzConstDefine_1.BbwzGameState.Bet;
        switch (gameState) {
            case BbwzConstDefine_1.BbwzGameState.BetStart:
                if (isPlayAnim)
                    this.playStartAnim();
                break;
            case BbwzConstDefine_1.BbwzGameState.BetEnd:
                if (isPlayAnim)
                    this.playEndAnim();
                break;
            case BbwzConstDefine_1.BbwzGameState.Bet:
                break;
        }
    };
    BbwzStateView.prototype.playStartAnim = function () {
        this.betStartSk.setAnimation(0, "idle", false);
        var tween = Game.Tween.get(this.betStartNode);
        tween.to(0.25, { position: cc.v2(0, this.betStartNode.y) }, null)
            .delay(1.0)
            .to(0.25, { position: cc.v2(1200, this.betStartNode.y) }, null)
            .start();
        Global.Audio.playBundleSound(BbwzConstDefine_1.default.GAME_ID, BbwzConstDefine_1.default.SOUND_BET_START, true);
    };
    BbwzStateView.prototype.playEndAnim = function () {
        this.betEndSk.setAnimation(0, "idle", false);
        var tween = Game.Tween.get(this.betEndNode);
        tween.to(0.25, { position: cc.v2(0, this.betEndNode.y) }, null)
            .delay(1.0)
            .to(0.25, { position: cc.v2(1200, this.betEndNode.y) }, null)
            .start();
        Global.Audio.playBundleSound(BbwzConstDefine_1.default.GAME_ID, BbwzConstDefine_1.default.SOUND_BET_END, true);
    };
    BbwzStateView.prototype.setTimeRunConfig = function (leftTime, callback, target) {
        this.timeRunComp.node.active = true;
        this.timeRunComp.setTimer(leftTime);
        this.timeRunComp.setSecondCall(callback, target);
    };
    BbwzStateView.prototype.onClose = function () {
        this.timeRunComp.node.active = false;
    };
    BbwzStateView.prototype.clearByRound = function () {
        this.active = false;
        this.betStartNode.active = false;
        this.betEndNode.active = false;
        this.betTimeNode.active = false;
    };
    return BbwzStateView;
}(BbwzBaseView_1.default));
exports.default = BbwzStateView;

cc._RF.pop();