"use strict";
cc._RF.push(module, '62a9bH/0rVJVrT796u68hfc', 'ErmjMahjongHandView');
// ermj/Ermj/scripts/subView/mahjong/ErmjMahjongHandView.ts

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
var ErmjMahjongHandView = /** @class */ (function (_super) {
    __extends(ErmjMahjongHandView, _super);
    function ErmjMahjongHandView(node) {
        var _this = _super.call(this) || this;
        _this._isSelect = false;
        _this.rawPos = cc.Vec3.ZERO;
        _this._isOut = false;
        _this._sortIndex = 0;
        _this.isTouchEnable = true;
        _this.setNode(node);
        return _this;
    }
    ErmjMahjongHandView.prototype.initView = function () {
        this.frontBg = this.getChild("bg");
        this.frontSp = this.getComponent("front", cc.Sprite);
        this.backBg = this.getChild("back");
        this.selectSign = this.getChild("selectSign");
        this.selectSign.active = false;
    };
    Object.defineProperty(ErmjMahjongHandView.prototype, "isSelect", {
        get: function () {
            return this._isSelect;
        },
        set: function (flag) {
            this._isSelect = flag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ErmjMahjongHandView.prototype, "isOut", {
        get: function () {
            return this._isOut;
        },
        set: function (flag) {
            this._isOut = flag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ErmjMahjongHandView.prototype, "sortIndex", {
        get: function () {
            return this._sortIndex;
        },
        /** 设置排序, 同时设置在父节点的渲染顺序 */
        set: function (value) {
            this._sortIndex = value;
            this.node.setSiblingIndex(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ErmjMahjongHandView.prototype, "mahjongValue", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (this._value == value)
                return;
            this._value = value;
            Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.frontSp, ErmjPathHelper_1.default.gameTexturePath + "mahjong/atlas_mahjong", ErmjMjStyleHelper_1.default.mjHandMap[value], null, true);
            if (cc.sys.isBrowser)
                this.node.name = String(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ErmjMahjongHandView.prototype, "isFront", {
        /** 设置麻将正反面 */
        set: function (flag) {
            this.frontBg.active = flag;
            this.frontSp.node.active = flag;
            this.backBg.active = !flag;
        },
        enumerable: false,
        configurable: true
    });
    ErmjMahjongHandView.prototype.setTouchEnable = function (flag) {
        Global.UIHelper.setNodeGray(this.node, !flag);
        this.isTouchEnable = flag;
    };
    /** 设置正面背景特殊色提示 */
    ErmjMahjongHandView.prototype.setSpecialColor = function (flag) {
        this.frontBg.color = flag && ErmjMjStyleHelper_1.default.SpecialBgColor || ErmjMjStyleHelper_1.default.NormalBgColor;
    };
    ErmjMahjongHandView.prototype.rememberRawPos = function () {
        this.rawPos = this.node.position;
    };
    ErmjMahjongHandView.prototype.onSelect = function (isSound) {
        if (isSound === void 0) { isSound = false; }
        this.isSelect = !this.isSelect;
        if (this.isSelect) {
            // isSound && ErmjGameConst.playSound(ErmjAudioConst.commonAudio.SelectPoker, true);
            this.rememberRawPos();
            this.node.setPosition(cc.v2(this.rawPos.x, this.rawPos.y + this.Define.ChooseOffsetY));
        }
        else {
            this.node.setPosition(this.rawPos);
        }
    };
    ErmjMahjongHandView.prototype.resetSelect = function () {
        this.node.setPosition(this.rawPos);
        this.isSelect = false;
    };
    /**
     * 麻将移动(自身父坐标内)
     * @param to 终点坐标
     * @param timeScale 移动时长
     * @param timeWait 移动前延时
     * @param callback 完成回调
     */
    ErmjMahjongHandView.prototype.doMove = function (to, timeScale, timeWait, callback, isSound, ease) {
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
    /**
     * 补花动画
     * @param newValue 补花进来的牌 0代表未知牌 以牌背显示
     * @param showTime 动画时长 消失出现动画时长
     * @param hideWaitTime 消失后等待时间
     */
    ErmjMahjongHandView.prototype.doChangeFlower = function (newValue, showTime, hideWaitTime) {
        var _this = this;
        if (hideWaitTime === void 0) { hideWaitTime = 0; }
        var _a = this.getRealSize(), width = _a[0], height = _a[1];
        var tween = Game.Tween.get(this.node);
        this.node.opacity = 255;
        tween.by(showTime, { position: cc.v3(0, height), opacity: -254 }, cc.easeIn(1))
            .call(function () {
            if (newValue > 0)
                _this.mahjongValue = newValue;
        })
            .delay(hideWaitTime)
            .by(showTime, { position: cc.v3(0, -height), opacity: 254 }, cc.easeOut(1))
            .start();
    };
    /**
     * 摸牌动画
     * @param endPos 终点
     * @param showTime 出现时长
     */
    ErmjMahjongHandView.prototype.doDraw = function (endPos, showTime) {
        var tween = Game.Tween.get(this.node);
        this.node.setPosition(endPos.add(cc.v3(0, 60)));
        this.node.opacity = 50;
        this.node.angle = 30;
        tween.to(showTime, { position: endPos, opacity: 255, angle: 0 }, cc.easeIn(1))
            .start();
    };
    /**
     * 获取麻将的落地原始位置
     */
    ErmjMahjongHandView.prototype.getRawPos = function () {
        return this.rawPos;
    };
    ErmjMahjongHandView.prototype.getWorldPos = function () {
        return this.node.parent.convertToWorldSpaceAR(this.node.position);
    };
    /**
     * 检测点击坐标在麻将内
     * @param position 世界坐标点
     */
    ErmjMahjongHandView.prototype.checkIsTouch = function (position) {
        var rec = this.node.getBoundingBoxToWorld();
        return rec.contains(position);
    };
    ErmjMahjongHandView.prototype.getRealSize = function () {
        return [this.node.width * this.node.scaleX, this.node.height * this.node.scaleY];
    };
    /**
     * 是否是显示可选择的麻将子
     */
    ErmjMahjongHandView.prototype.checkMjValid = function () {
        return this.isTouchEnable && this.node.activeInHierarchy && this.node.active;
    };
    /** 选中光标位置 */
    ErmjMahjongHandView.prototype.getSelectSignWorldPos = function () {
        return this.selectSign.parent.convertToWorldSpaceAR(this.selectSign.position);
    };
    ErmjMahjongHandView.prototype.reset = function () {
        this.node.opacity = 255;
        this.node.angle = 0;
        this.isSelect = false;
        this.isFront = false;
        this.isOut = false;
        this.setTouchEnable(true);
    };
    return ErmjMahjongHandView;
}(ErmjBaseView_1.default));
exports.default = ErmjMahjongHandView;

cc._RF.pop();