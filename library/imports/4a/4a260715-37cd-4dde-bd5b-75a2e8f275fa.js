"use strict";
cc._RF.push(module, '4a260cVN81N3r1bdaLo8nX6', 'BbwzOtherPlayerView');
// bbwz/Bbwz/scripts/subview/player/BbwzOtherPlayerView.ts

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
var BbwzPlayerBaseView_1 = require("./BbwzPlayerBaseView");
var BbwzConstDefine_1 = require("../../data/BbwzConstDefine");
var BbwzGameEvent_1 = require("../../data/BbwzGameEvent");
var BbwzData_1 = require("../../data/BbwzData");
var BbwzOtherPlayerView = /** @class */ (function (_super) {
    __extends(BbwzOtherPlayerView, _super);
    function BbwzOtherPlayerView(node, chair) {
        var _this = _super.call(this) || this;
        _this.chair = chair;
        _this.isAniming = false;
        _this.shakeCount = 0;
        _this.setNode(node);
        return _this;
    }
    BbwzOtherPlayerView.prototype.initView = function () {
        _super.prototype.initView.call(this);
        BbwzConstDefine_1.default.addCommonClick(this.node, "useInfo", this.onUserInfoClick, this, cc.Button.Transition.NONE);
        this.rawPos = this.node.position;
        BbwzData_1.default.instance.playerChipsFlyPos[this.chair] = this.getCenterWorldPos();
        this.headTipsRoot = this.getChild("headTipsRoot");
        this.headTipsRootRawPos = this.headTipsRoot.position;
    };
    BbwzOtherPlayerView.prototype.playBetAnim = function (timeScale, shakeCount) {
        if (shakeCount === void 0) { shakeCount = 1; }
        if (this.shakeCount >= 3) {
            return;
        }
        this.shakeCount += shakeCount;
        if (this.isAniming)
            return;
        this.shakeHead(timeScale);
    };
    /**
     * 执行抖动动作
     */
    BbwzOtherPlayerView.prototype.shakeHead = function (time) {
        this.isAniming = true;
        if (this.shakeCount > 0) {
            var offset = this.node.x < 0 ? cc.v2(20, 0) : cc.v2(-20, 0);
            var out = cc.moveBy(time / 2, offset, 0);
            var back = cc.moveBy(time / 2, 0, 0);
            var seq = cc.sequence(out, back, cc.callFunc(this.shakeHead, this));
            this.node.runAction(seq);
            this.shakeCount--;
        }
        else {
            this.stopAnim();
        }
    };
    /**
     * 停止抖动
     */
    BbwzOtherPlayerView.prototype.stopAnim = function () {
        this.node.stopAllActions();
        this.node.setPosition(this.rawPos);
        this.shakeCount = 0;
        this.isAniming = false;
    };
    BbwzOtherPlayerView.prototype.getCenterWorldPos = function () {
        return this.headImgSp.node.parent.convertToWorldSpaceAR(this.headImgSp.node.position);
    };
    BbwzOtherPlayerView.prototype.getHeadTipWorldPos = function () {
        return this.headTipsRoot.parent.convertToWorldSpaceAR(this.headTipsRootRawPos);
    };
    BbwzOtherPlayerView.prototype.onUserInfoClick = function () {
        Game.Event.event(BbwzGameEvent_1.default.onUserInfoTouch, this.chair, this.getHeadTipWorldPos());
    };
    BbwzOtherPlayerView.prototype.clearByRound = function () {
        _super.prototype.clearByRound.call(this);
        this.stopAnim();
    };
    //返回头像之间点的世界坐标
    BbwzOtherPlayerView.prototype.getChipStartPos = function () {
        return this.node.parent.convertToWorldSpaceAR(this.node.position);
    };
    return BbwzOtherPlayerView;
}(BbwzPlayerBaseView_1.default));
exports.default = BbwzOtherPlayerView;

cc._RF.pop();