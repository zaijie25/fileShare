"use strict";
cc._RF.push(module, '1cfaeDTX7xFRp50CToruZY4', 'BbwzChipItem');
// bbwz/Bbwz/scripts/subview/BbwzChipItem.ts

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
var BbwzData_1 = require("../data/BbwzData");
var BbwzBetGameTool_1 = require("../tool/BbwzBetGameTool");
var BbwzBaseView_1 = require("./BbwzBaseView");
var BbwzPathHelper_1 = require("../tool/BbwzPathHelper");
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
/**
 * 游戏层 单个筹码的控制组件
 */
var BbwzChipItem = /** @class */ (function (_super) {
    __extends(BbwzChipItem, _super);
    function BbwzChipItem(node) {
        var _this = _super.call(this) || this;
        /**
         * 筹码精灵
         */
        _this.spriteIcon = null;
        /**
         * 属于哪个玩家
         */
        _this.playerIndex = -1;
        /**
         * 下注在哪个区域
         */
        _this.betAreaIndex = -1;
        /**
         * 筹码面值索引
         */
        _this.chipIndex = 0;
        /**
         * 筹码面值
         */
        _this.chipNumber = 1;
        /**
         * 动画对象
         */
        _this.tween = null;
        _this.setNode(node);
        return _this;
    }
    BbwzChipItem.prototype.initView = function () {
        this.spriteIcon = this.node.getComponent(cc.Sprite);
    };
    /**
     * 更新显示
     */
    BbwzChipItem.prototype.updateUI = function () {
        var strArr = BbwzData_1.default.instance.getBetChipsIconStr();
        var str = strArr[this.chipIndex];
        Global.ResourceManager.loadBundleAutoAtlas(BbwzConstDefine_1.default.GAME_ID, this.spriteIcon, BbwzPathHelper_1.default.gameTexturePath + "atlas/dynamic/atlas_dynamic", str, null, true);
    };
    /**
     * 设置筹码
     * @param index
     */
    BbwzChipItem.prototype.setChipIndex = function (index) {
        this.chipIndex = index;
        this.chipNumber = BbwzData_1.default.instance.chipList[index];
        this.updateUI();
    };
    /**
     * 设置筹码
     * @param chipNum
     */
    BbwzChipItem.prototype.setChipNumber = function (chipNum) {
        this.chipIndex = BbwzData_1.default.instance.chipList.indexOf(chipNum);
        this.chipNumber = chipNum;
        this.updateUI();
    };
    /**
     * 停止动画
     */
    BbwzChipItem.prototype.stopAnim = function () {
        this.node.scale = 1;
        if (this.tween) {
            this.tween.stop();
            this.tween = null;
        }
    };
    /**
     * 设置数据
     * @param playerIndex
     * @param chipNum
     */
    BbwzChipItem.prototype.setData = function (playerIndex, chipNum) {
        this.playerIndex = playerIndex;
        this.setChipNumber(chipNum);
    };
    /**
     * 随机旋转
     */
    BbwzChipItem.prototype.randomRotate = function () {
        var rotation = this.getRandomRotation();
        this.node.angle = -rotation;
    };
    /**
     * 获得随机旋转角度
     */
    BbwzChipItem.prototype.getRandomRotation = function () {
        var rotation = BbwzBetGameTool_1.default.random() * 120 - 60;
        return rotation;
    };
    /**
     * 下注飞筹码动画
     */
    BbwzChipItem.prototype.betFlyAnim = function (startPos, endPos) {
        this.stopAnim();
        this.node.setPosition(startPos);
        this.tween = Game.Tween.get(this.node);
        var animTime = startPos.sub(endPos).mag() / 1000; //1500
        var randomRotation = this.getRandomRotation() + 1080;
        this.tween.to(animTime, { position: cc.v2(endPos.x, endPos.y), angle: randomRotation }, cc.easeQuadraticActionOut())
            .to(0.15, { scale: 1.1 }, cc.easeIn(1))
            .to(0.1, { scale: 1 }, cc.easeOut(1))
            .start();
    };
    /**
     * 尝试设置最大筹码
     * @param money
     */
    BbwzChipItem.prototype.tryBigest = function (money) {
        var chipIndex = BbwzData_1.default.instance.tryBigest(money);
        this.setChipIndex(chipIndex);
    };
    /**
     * 尝试设置最合适的筹码
     * @param money
     */
    BbwzChipItem.prototype.tryRight = function (money) {
        var chipIndex = BbwzData_1.default.instance.tryRight(money);
        this.setChipIndex(chipIndex);
    };
    /**
     * 聚合动画
     * @param animTime
     * @param endPos
     * @param complete
     */
    BbwzChipItem.prototype.playItemMoveToBank = function (animTime, endPos, complete) {
        var _this = this;
        if (complete === void 0) { complete = null; }
        this.stopAnim();
        this.tween = Game.Tween.get(this.node);
        this.tween.to(animTime, { position: endPos }, null)
            .call(function () {
            _this.stopAnim();
            if (complete)
                complete();
        }).start();
    };
    /**
     * 去往返回区动画
     * @param animTime
     * @param endPos
     * @param complete
     */
    BbwzChipItem.prototype.playItemMoveToArea = function (animTime, endPos, complete) {
        var _this = this;
        if (complete === void 0) { complete = null; }
        this.stopAnim();
        this.tween = Game.Tween.get(this.node);
        this.tween.to(animTime, { position: endPos }, { progress: null, easing: "sineIn" })
            .call(function () {
            _this.stopAnim();
            if (complete)
                complete();
        }).start();
    };
    /**
     * 去往头像动画
     * @param endPos
     * @param index
     * @param complete
     */
    BbwzChipItem.prototype.playOneChipAwardAnim = function (endPos, index, complete) {
        var _this = this;
        if (complete === void 0) { complete = null; }
        this.stopAnim();
        var animTime = endPos.sub(this.node.position).mag() / 1200;
        var delayTime = index * 0.001;
        this.tween = Game.Tween.get(this.node);
        this.tween.delay(delayTime).to(animTime, { position: endPos }, { progress: null, easing: "sineIn" })
            .call(function () {
            _this.stopAnim();
            if (complete)
                complete();
        }).start();
    };
    BbwzChipItem.prototype.reset = function () {
        this.stopAnim();
        if (this.node) {
            this.spriteIcon.spriteFrame = null;
            this.active = true;
        }
        this.playerIndex = -1;
        this.betAreaIndex = -1;
    };
    return BbwzChipItem;
}(BbwzBaseView_1.default));
exports.default = BbwzChipItem;

cc._RF.pop();