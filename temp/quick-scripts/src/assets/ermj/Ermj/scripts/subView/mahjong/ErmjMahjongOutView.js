"use strict";
cc._RF.push(module, '59d2azgb0xMYa3FSsSURgaY', 'ErmjMahjongOutView');
// ermj/Ermj/scripts/subView/mahjong/ErmjMahjongOutView.ts

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
var ErmjBaseView_1 = require("../ErmjBaseView");
var ErmjPathHelper_1 = require("../../data/ErmjPathHelper");
var ErmjMjStyleHelper_1 = require("../../tool/ErmjMjStyleHelper");
var ErmjGameConst_1 = require("../../data/ErmjGameConst");
var ErmjMahjongOutView = /** @class */ (function (_super) {
    __extends(ErmjMahjongOutView, _super);
    function ErmjMahjongOutView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    ErmjMahjongOutView.prototype.initView = function () {
        this.frontBg = this.getComponent("bg", cc.Sprite);
        this.frontSp = this.getComponent("front", cc.Sprite);
        this.backBg = this.getComponent("back", cc.Sprite);
        this.attentionPoint = this.getChild("attention");
    };
    Object.defineProperty(ErmjMahjongOutView.prototype, "mahjongValue", {
        get: function () {
            return this._value;
        },
        /** 设置牌值和图案样式 */
        set: function (value) {
            if (this._value == value)
                return;
            this._value = value;
            Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.frontSp, ErmjPathHelper_1.default.gameTexturePath + "mahjong/atlas_mahjong", ErmjMjStyleHelper_1.default.mjOutMap[value], null, true);
            if (cc.sys.isBrowser)
                this.node.name = String(value);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 设置麻将子显示样式
     * @param perspLevel 透视等级
     * @param nRelative 相对主机方位
     */
    ErmjMahjongOutView.prototype.setPerspStyle = function (perspLevel, nRelative) {
        this.node.angle = 0;
        this.node.skewX = 0;
        var _a = ErmjMjStyleHelper_1.default.getPerspectiveCfg(perspLevel), cfg = _a.cfg, dir = _a.dir;
        var relativeCfg = ErmjMjStyleHelper_1.default.mjOutStyle[nRelative];
        this.frontSp.node.angle = -relativeCfg.frontAngle;
        this.frontSp.node.skewX = cfg.frontSkewX * dir * relativeCfg.perspScale;
        this.frontBg.node.scaleX = dir * relativeCfg.perspScale;
        this.backBg.node.scaleX = dir * relativeCfg.perspScale;
        Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.frontBg, ErmjPathHelper_1.default.gameTexturePath + "mahjong/atlas_mahjong", cfg.bgSp, null, true);
        Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.backBg, ErmjPathHelper_1.default.gameTexturePath + "mahjong/atlas_mahjong", cfg.backSp, null, true);
    };
    Object.defineProperty(ErmjMahjongOutView.prototype, "isFront", {
        /** 设置麻将正反面 */
        set: function (flag) {
            this.frontBg.node.active = flag;
            this.frontSp.node.active = flag;
            this.backBg.node.active = !flag;
        },
        enumerable: false,
        configurable: true
    });
    /** 设置正面背景特殊色提示 */
    ErmjMahjongOutView.prototype.setSpecialColor = function (flag) {
        this.frontBg.node.color = flag && ErmjMjStyleHelper_1.default.SpecialBgColor || ErmjMjStyleHelper_1.default.NormalBgColor;
    };
    /**
     * 出牌动画
     * @param from 本地起点坐标
     * @param to 本地终点坐标
     * @param perspLevel 目的位置透视
     * @param nRelative 相对主机朝向
     */
    ErmjMahjongOutView.prototype.doOutAnim = function (from, to, perspLevel, nRelative) {
        var _this = this;
        this.setPerspStyle(0, ErmjMjStyleHelper_1.ErmjRelativeDefine.Self);
        var _a = ErmjMjStyleHelper_1.default.getPerspectiveCfg(perspLevel), cfg = _a.cfg, dir = _a.dir;
        var relativeCfg = ErmjMjStyleHelper_1.default.mjOutStyle[nRelative];
        this.node.scale = 1.5;
        this.node.setPosition(from);
        this.frontBg.node.scaleX = dir * relativeCfg.perspScale;
        this.backBg.node.scaleX = dir * relativeCfg.perspScale;
        var tween = Game.Tween.get(this.node);
        tween.delay(this.Define.outMjShowTime)
            .to(this.Define.outMjFlyTime, { position: to, scale: 1, angle: -relativeCfg.frontAngle, skewX: dir * cfg.frontSkewX * relativeCfg.perspScale }, cc.easeIn(1))
            .call(function () {
            _this.setPerspStyle(perspLevel, nRelative);
        })
            .start();
    };
    /**
     * 麻将移动(自身父坐标内)
     * @param to 终点坐标
     * @param timeScale 移动时长
     * @param timeWait 移动前延时
     * @param callback 完成回调
     */
    ErmjMahjongOutView.prototype.doMove = function (to, timeScale, timeWait, callback, isSound, ease) {
        if (timeScale === void 0) { timeScale = 1; }
        if (timeWait === void 0) { timeWait = 0; }
        if (isSound === void 0) { isSound = false; }
        if (ease === void 0) { ease = cc.easeIn(1); }
        var tween = Game.Tween.get(this.node);
        tween.delay(timeWait)
            .call(function () {
            // isSound && ErmjGameConst.playSound(ErmjAudioConst.commonAudio.DispatchPoker, true);
        })
            .to(timeScale, { position: to }, ease)
            .call(callback)
            .start();
    };
    ErmjMahjongOutView.prototype.getRealSize = function () {
        return [this.node.width * this.node.scaleX, this.node.height * this.node.scaleY];
    };
    ErmjMahjongOutView.prototype.getAttentionWorldPos = function () {
        return this.attentionPoint.parent.convertToWorldSpaceAR(this.attentionPoint.position);
    };
    ErmjMahjongOutView.prototype.reset = function () {
        this.isFront = false;
        this.frontBg.node.color = ErmjMjStyleHelper_1.default.NormalBgColor;
        this.frontSp.node.angle = 0;
        this.node.angle = 0;
        this.node.scale = 1;
        this.node.skewX = 0;
    };
    return ErmjMahjongOutView;
}(ErmjBaseView_1.default));
exports.default = ErmjMahjongOutView;

cc._RF.pop();