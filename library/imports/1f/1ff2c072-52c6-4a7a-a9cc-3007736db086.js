"use strict";
cc._RF.push(module, '1ff2cByUsZKeqnMMAdzbbCG', 'BbwzPokerView');
// bbwz/Bbwz/scripts/subview/poker/BbwzPokerView.ts

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
var BbwzPathHelper_1 = require("../../tool/BbwzPathHelper");
var BbwzPokerTool_1 = require("../../tool/BbwzPokerTool");
var BbwzPokerView = /** @class */ (function (_super) {
    __extends(BbwzPokerView, _super);
    function BbwzPokerView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    BbwzPokerView.prototype.initView = function () {
        this.backNode = this.getChild("bg");
        this.frontSp = this.getComponent("front", cc.Sprite);
        this.rawPos = this.node.position;
        this.rawScale = this.node.scale;
    };
    Object.defineProperty(BbwzPokerView.prototype, "isFront", {
        get: function () {
            return this._isFront;
        },
        /**
         * 设置牌正反面 true 正面
         */
        set: function (flag) {
            this._isFront = flag;
            this.frontSp.node.active = flag;
            this.backNode.active = !flag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BbwzPokerView.prototype, "pokerValue", {
        get: function () {
            return this._value;
        },
        /**
         * 设置牌值图案 传入服务器牌值
         */
        set: function (value) {
            if (this._value == value)
                return;
            this._value = value;
            if (value) {
                var pokerRes = BbwzPokerTool_1.default.pokerResMap[Number(value)];
                Global.ResourceManager.loadBundleAutoAtlas(BbwzConstDefine_1.default.GAME_ID, this.frontSp, BbwzPathHelper_1.default.gameTexturePath + "atlas/poker/atlas_poker", pokerRes, null, true);
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 翻牌动画 带放大效果的
     * @param callback 翻完牌回调
     * @param timeScale 总时长不包含delay
     * @param delay 延时
     * @param isSound 是否播放翻牌音效 默认不播
     */
    BbwzPokerView.prototype.showPokerAnim = function (callback, timeScale, delay, isSound) {
        var _this = this;
        if (timeScale === void 0) { timeScale = 1; }
        if (delay === void 0) { delay = 0; }
        if (isSound === void 0) { isSound = false; }
        this.isFront = false;
        var tween = Game.Tween.get(this.node);
        tween.delay(delay)
            //放大1.3倍
            .to(0.1 * timeScale, { scale: this.rawScale * 1.3 }, cc.easeCubicActionIn())
            //横向缩放
            .to(0.2 * timeScale, { scaleX: 0 }, cc.easeCubicActionIn())
            //翻拍
            .call(function () {
            _this.isFront = true;
            isSound && Global.Audio.playBundleSound(BbwzConstDefine_1.default.GAME_ID, BbwzConstDefine_1.default.SOUND_ZHENGPAI, true);
        })
            //展开
            .to(0.35 * timeScale, { scaleX: this.rawScale * 1.3 }, cc.easeCubicActionOut())
            .delay(0.25 * timeScale)
            //还原
            .to(0.1, { scale: this.rawScale }, cc.easeCubicActionOut())
            .call(callback)
            .start();
    };
    /**
     * 翻牌动画 不带放大效果
     * @param callback 翻完牌回调
     * @param timeScale 总时长不包含delay
     * @param delay 延时
     * @param isSound 是否播放翻牌音效 默认不播
     */
    BbwzPokerView.prototype.showPokerEasyAnim = function (callback, timeScale, delay, isSound) {
        var _this = this;
        if (timeScale === void 0) { timeScale = 1; }
        if (delay === void 0) { delay = 0; }
        if (isSound === void 0) { isSound = false; }
        this.isFront = false;
        var tween = Game.Tween.get(this.node);
        tween.delay(delay)
            //横向缩放
            .to(0.3 * timeScale, { scaleX: 0 }, cc.easeCubicActionIn())
            //翻拍
            .call(function () {
            _this.isFront = true;
            isSound && Global.Audio.playBundleSound(BbwzConstDefine_1.default.GAME_ID, BbwzConstDefine_1.default.SOUND_ZHENGPAI, true);
        })
            //展开
            .to(0.5 * timeScale, { scaleX: this.rawScale }, cc.easeCubicActionOut())
            .delay(0.2 * timeScale)
            .call(callback)
            .start();
    };
    /**
     * 单牌移动(自身父坐标内)
     * @param from 起始坐标，需先转换到牌所在坐标系
     * @param to 终点坐标
     * @param timeScale 移动时长
     * @param timeWait 移动前延时
     * @param callback 完成回调
     * @param isSound
     * @param ease
     * @param isRawScale 是否放缩到原始尺寸
     */
    BbwzPokerView.prototype.doPokerMove = function (from, to, timeScale, timeWait, callback, isSound, ease, isRawScale) {
        if (timeScale === void 0) { timeScale = 1; }
        if (timeWait === void 0) { timeWait = 0; }
        if (isSound === void 0) { isSound = false; }
        if (ease === void 0) { ease = cc.easeIn(1); }
        if (isRawScale === void 0) { isRawScale = false; }
        this.node.setPosition(from);
        var props = {
            position: to
        };
        if (isRawScale)
            props["scale"] = this.rawScale;
        var tween = Game.Tween.get(this.node);
        tween.delay(timeWait)
            .call(function () {
            isSound && Global.Audio.playBundleSound(BbwzConstDefine_1.default.GAME_ID, BbwzConstDefine_1.default.SOUND_FAPAI, true);
        })
            .to(timeScale, props, ease)
            .call(callback)
            .start();
    };
    BbwzPokerView.prototype.getRawPos = function () {
        return this.rawPos;
    };
    BbwzPokerView.prototype.reset = function () {
        this.node.scale = this.rawScale;
        this.node.setPosition(this.rawPos);
        this.node.opacity = 255;
        this.isFront = false;
    };
    return BbwzPokerView;
}(BbwzBaseView_1.default));
exports.default = BbwzPokerView;

cc._RF.pop();