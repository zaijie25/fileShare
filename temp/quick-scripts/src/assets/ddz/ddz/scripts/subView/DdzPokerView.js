"use strict";
cc._RF.push(module, 'a8299ifoItMKKCQ3cogCFhA', 'DdzPokerView');
// ddz/ddz/scripts/subView/DdzPokerView.ts

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
var DdzBaseView_1 = require("./DdzBaseView");
var DdzPathHelper_1 = require("../data/DdzPathHelper");
var DdzPokerHelper_1 = require("../data/DdzPokerHelper");
var DdzPokerPool_1 = require("../tool/DdzPokerPool");
var DdzPokerView = /** @class */ (function (_super) {
    __extends(DdzPokerView, _super);
    function DdzPokerView(node) {
        var _this = _super.call(this) || this;
        _this.fixedPos = cc.Vec3.ZERO;
        _this._scale = 1;
        _this._isSelect = false;
        _this.isDrag = false;
        _this._index = -1;
        /**
        * 花色对应的资源前缀
        */
        _this.huaseArrFang = ["01", "05", "09", "13", "17", "21", "25", "29", "33", "37", "41", "45", "49"];
        _this.huaseArrHei = ["02", "06", "10", "14", "18", "22", "26", "30", "34", "38", "42", "46", "50"];
        _this.huaseArrHong = ["03", "07", "11", "15", "19", "23", "27", "31", "35", "39", "43", "47", "51"];
        _this.huaseArrMei = ["04", "08", "12", "16", "20", "24", "28", "32", "36", "40", "44", "48", "52"];
        _this.Allhuase = [_this.huaseArrFang, _this.huaseArrMei, _this.huaseArrHong, _this.huaseArrHei,];
        _this.setNode(node);
        return _this;
    }
    DdzPokerView.prototype.initView = function () {
        this.frontSp = this.getComponent("front", cc.Sprite);
        this.backSp = this.getComponent("back", cc.Sprite);
        // this.num = <cc.Sprite>this.getComponent('front/num', cc.Sprite);
        // this.shapeSp1 = <cc.Sprite>this.getComponent('front/shape1', cc.Sprite);
        // this.shapeSp2 = <cc.Sprite>this.getComponent('front/shape2', cc.Sprite);
        // this.jokerNumSp = <cc.Sprite>this.getComponent('front/jokerNum', cc.Sprite);
        // this.jokerShapeSp = <cc.Sprite>this.getComponent('front/jokerShape', cc.Sprite);
        this.dzSignNode = this.getChild('front/dz');
        this.dzSignNode.active = false;
    };
    Object.defineProperty(DdzPokerView.prototype, "nowIndex", {
        get: function () {
            return this._index;
        },
        set: function (value) {
            this._index = value;
        },
        enumerable: false,
        configurable: true
    });
    DdzPokerView.prototype.setPokerDealPos = function () {
        this.fixedPos = this.node.position;
    };
    DdzPokerView.prototype.setPokerDealPosX = function () {
        this.fixedPos.x = this.node.position.x;
    };
    DdzPokerView.prototype.setPokerPosition = function (pos) {
        this.node.setPosition(pos);
    };
    Object.defineProperty(DdzPokerView.prototype, "isFront", {
        get: function () {
            return this._isFront;
        },
        set: function (flag) {
            this._isFront = flag;
            this.frontSp.node.active = flag;
            this.backSp.node.active = !flag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DdzPokerView.prototype, "pokerValue", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (this._value == value)
                return;
            this._value = value;
            var atlasString = "texture/atlas/pokers/pokers";
            if (value) {
                var num1 = DdzPokerPool_1.default.GetPokerNumByValue(this.pokerValue);
                var huase = DdzPokerPool_1.default.GetPokerHuaseByValue(this.pokerValue);
                if (num1 == -1) {
                    if (huase == 5) {
                        Global.ResourceManager.loadGameBundleAutoAtlas(this.frontSp, atlasString, "puke_53", null, true);
                    }
                    else if (huase == 4) {
                        Global.ResourceManager.loadGameBundleAutoAtlas(this.frontSp, atlasString, "puke_54", null, true);
                    }
                }
                else
                    Global.ResourceManager.loadGameBundleAutoAtlas(this.frontSp, atlasString, "puke_" + this.Allhuase[huase][num1], null, true);
                //let [isGhost, color, num, sColor] = this.PokerHelper.getPokerStyle(value);
                // let pokerAtlas = Global.ResourceManager.getGameBundleRes(DdzPathHelper.gameTexturePath + "atlas/poker", cc.SpriteAtlas);
                // if (isGhost) {
                //     this.num.node.active = false;
                //     this.shapeSp2.node.active = false;
                //     this.shapeSp1.node.active = false;
                //     this.jokerNumSp.spriteFrame = pokerAtlas.getSpriteFrame(num);;
                //     this.jokerShapeSp.spriteFrame = pokerAtlas.getSpriteFrame(color);;
                //     this.jokerNumSp.node.active = true;
                //     this.jokerShapeSp.node.active = true;
                // }
                // else {
                //     this.num.node.active = true;
                //     this.shapeSp2.node.active = true;
                //     this.shapeSp1.node.active = true;
                //     this.num.spriteFrame = pokerAtlas.getSpriteFrame(num);
                //     this.shapeSp2.spriteFrame = pokerAtlas.getSpriteFrame(color);
                //     this.shapeSp1.spriteFrame = pokerAtlas.getSpriteFrame(sColor);
                //     this.jokerNumSp.node.active = false;
                //     this.jokerShapeSp.node.active = false;
                // }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DdzPokerView.prototype, "isSelect", {
        get: function () {
            return this._isSelect;
        },
        set: function (flag) {
            this._isSelect = flag;
        },
        enumerable: false,
        configurable: true
    });
    DdzPokerView.prototype.setPokerScale = function (value) {
        this._scale = value;
    };
    DdzPokerView.prototype.updatePokerScale = function () {
        this.node.scale = this._scale;
    };
    /**
     * 设置大牌还是小牌
     * @param size 1大牌，0小牌
     */
    DdzPokerView.prototype.setPokerStyle = function (size) {
        if (size === void 0) { size = 1; }
        // let pokerAtlas = Global.ResourceManager.getGameBundleRes(DdzPathHelper.gameTexturePath + "atlas/pokers", cc.SpriteAtlas);
        if (size == 1) {
            this.node.scale = this.Define.BigPokerScale;
            var _a = DdzPokerHelper_1.default.bigPokerBgCfg, frontSf = _a[0], bgSf = _a[1];
            //this.frontSp.spriteFrame = pokerAtlas.getSpriteFrame(frontSf);
            //this.backSp.spriteFrame = pokerAtlas.getSpriteFrame(bgSf);
        }
        else {
            this.node.scale = this.Define.SmallPokerScale;
            var _b = DdzPokerHelper_1.default.smallPokerBgCfg, frontSf = _b[0], bgSf = _b[1];
            //this.frontSp.spriteFrame = pokerAtlas.getSpriteFrame(frontSf);
            //this.backSp.spriteFrame = pokerAtlas.getSpriteFrame(bgSf);
        }
    };
    DdzPokerView.prototype.showPokerAnim = function (callback, timeScale, delay, isSound) {
        var _this = this;
        if (timeScale === void 0) { timeScale = 1; }
        if (delay === void 0) { delay = 0; }
        if (isSound === void 0) { isSound = false; }
        this.isFront = false;
        var tween = Game.Tween.get(this.node);
        var scale = this.node.scale;
        tween.delay(delay)
            //放大1.3倍
            .to(0.1 * timeScale, { scale: scale * 1.3 }, cc.easeCubicActionIn())
            //横向缩放
            .to(0.2 * timeScale, { scaleX: 0 }, cc.easeCubicActionIn())
            //翻拍
            .call(function () {
            _this.isFront = true;
            // isSound && Global.Audio.playGameBundleSound(DdzAudioConst.audioCommonPath + DdzAudioConst.commonAudio.PokerFlop, true);
        })
            //展开
            .to(0.35 * timeScale, { scaleX: scale * 1.3 }, cc.easeCubicActionOut())
            .delay(0.25 * timeScale)
            //还原
            .to(0.1, { scale: scale }, cc.easeCubicActionOut())
            .call(callback)
            .start();
    };
    DdzPokerView.prototype.showPokerEasyAnim = function (callback, timeScale, delay, isSound) {
        var _this = this;
        if (timeScale === void 0) { timeScale = 1; }
        if (delay === void 0) { delay = 0; }
        if (isSound === void 0) { isSound = false; }
        this.isFront = false;
        var tween = Game.Tween.get(this.node);
        var scale = this.node.scale;
        tween.delay(delay)
            //横向缩放
            .to(0.3 * timeScale, { scaleX: 0 }, cc.easeCubicActionIn())
            //翻拍
            .call(function () {
            _this.isFront = true;
            // isSound && Global.Audio.playGameBundleSound(DdzAudioConst.audioCommonPath + DdzAudioConst.commonAudio.PokerFlop, true);
        })
            //展开
            .to(0.5 * timeScale, { scaleX: scale }, cc.easeCubicActionOut())
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
     */
    DdzPokerView.prototype.doPokerMove = function (from, to, timeScale, timeWait, callback, isSound, ease) {
        if (timeScale === void 0) { timeScale = 1; }
        if (timeWait === void 0) { timeWait = 0; }
        if (isSound === void 0) { isSound = false; }
        if (ease === void 0) { ease = cc.easeIn(1); }
        this.node.setPosition(from);
        var tween = Game.Tween.get(this.node);
        tween.delay(timeWait)
            .call(function () {
            isSound && Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.DispatchPoker, true);
        })
            .to(timeScale, { position: to, scale: this._scale }, ease)
            .call(callback)
            .start();
    };
    DdzPokerView.prototype.onSelect = function (isSound) {
        if (isSound === void 0) { isSound = false; }
        this.isSelect = !this.isSelect;
        if (this.isSelect) {
            // isSound && Global.Audio.playGameBundleSound(DdzAudioConst.audioCommonPath + DdzAudioConst.SelectPoker, true);
            this.node.setPosition(cc.v2(this.fixedPos.x, this.fixedPos.y + this.Define.ChooseOffsetY));
        }
        else {
            this.node.setPosition(this.fixedPos);
        }
    };
    DdzPokerView.prototype.resetSelect = function () {
        this.node.setPosition(this.fixedPos);
        this.isSelect = false;
    };
    DdzPokerView.prototype.setDragSign = function (isGray) {
        if (this.isDrag == isGray)
            return;
        this.isDrag = isGray;
        Global.UIHelper.setNodeGray(this.node, isGray);
    };
    DdzPokerView.prototype.setDzOwner = function (flag) {
        this.dzSignNode.active = flag;
    };
    /**
     * 获取牌的原始位置
     */
    DdzPokerView.prototype.getRawPos = function () {
        return this.fixedPos;
    };
    /**
     * 获取牌的世界坐标
     */
    DdzPokerView.prototype.getWorldPosition = function () {
        var pos = this.node.parent.convertToWorldSpaceAR(this.node.position);
        return pos;
    };
    /**
     * 获取牌实际尺寸
     */
    DdzPokerView.prototype.getPokerSize = function () {
        return [this.node.scaleX * this.node.width, this.node.scaleY * this.node.height];
    };
    /**
     * 检测点击坐标在牌内
     * @param position 世界坐标点
     */
    DdzPokerView.prototype.checkIsTouch = function (position) {
        var rec = this.node.getBoundingBoxToWorld();
        return rec.contains(position);
    };
    /**
     * 是否是显示可选择的牌
     */
    DdzPokerView.prototype.checkPokerValid = function () {
        return this.node.activeInHierarchy && this.node.active;
    };
    DdzPokerView.prototype.reset = function () {
        this.isSelect = false;
        this.isFront = false;
        this.setDzOwner(false);
        this.setDragSign(false);
    };
    return DdzPokerView;
}(DdzBaseView_1.default));
exports.default = DdzPokerView;

cc._RF.pop();