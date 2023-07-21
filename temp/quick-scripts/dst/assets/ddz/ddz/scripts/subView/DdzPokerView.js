
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/subView/DdzPokerView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXHN1YlZpZXdcXERkelBva2VyVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBd0M7QUFDeEMsdURBQXFFO0FBQ3JFLHlEQUFvRDtBQUNwRCxxREFBZ0Q7QUFFaEQ7SUFBMEMsZ0NBQVc7SUEwQmpELHNCQUFZLElBQWE7UUFBekIsWUFDSSxpQkFBTyxTQUVWO1FBcEJPLGNBQVEsR0FBWSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUdqQyxZQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLGVBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsWUFBTSxHQUFZLEtBQUssQ0FBQztRQUN4QixZQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFcEI7O1VBRUU7UUFDRixrQkFBWSxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUYsaUJBQVcsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdGLGtCQUFZLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5RixpQkFBVyxHQUFHLENBQUMs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LENBdFNBLEFBc1NDLENBdFN5QyxxQkFBVyxHQXNTcEQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGR6QmFzZVZpZXcgZnJvbSBcIi4vRGR6QmFzZVZpZXdcIjtcclxuaW1wb3J0IERkelBhdGhIZWxwZXIsIHsgRGR6QXVkaW9Db25zdCB9IGZyb20gXCIuLi9kYXRhL0RkelBhdGhIZWxwZXJcIjtcclxuaW1wb3J0IERkelBva2VySGVscGVyIGZyb20gXCIuLi9kYXRhL0RkelBva2VySGVscGVyXCI7XHJcbmltcG9ydCBEZHpQb2tlclBvb2wgZnJvbSBcIi4uL3Rvb2wvRGR6UG9rZXJQb29sXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZHpQb2tlclZpZXcgZXh0ZW5kcyBEZHpCYXNlVmlldyB7XHJcbiAgICBwcml2YXRlIGZyb250U3A6IGNjLlNwcml0ZTtcclxuICAgIHByaXZhdGUgYmFja1NwOiBjYy5TcHJpdGU7XHJcbiAgICAvLyBwcml2YXRlIG51bTogY2MuU3ByaXRlO1xyXG4gICAgLy8gcHJpdmF0ZSBzaGFwZVNwMTogY2MuU3ByaXRlO1xyXG4gICAgLy8gcHJpdmF0ZSBzaGFwZVNwMjogY2MuU3ByaXRlO1xyXG4gICAgLy8gcHJpdmF0ZSBqb2tlck51bVNwOiBjYy5TcHJpdGU7XHJcbiAgICAvLyBwcml2YXRlIGpva2VyU2hhcGVTcDogY2MuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSBkelNpZ25Ob2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBmaXhlZFBvczogY2MuVmVjMyA9IGNjLlZlYzMuWkVSTztcclxuICAgIHByaXZhdGUgX2lzRnJvbnQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF92YWx1ZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfc2NhbGU6IG51bWJlciA9IDE7XHJcbiAgICBwcml2YXRlIF9pc1NlbGVjdCA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpc0RyYWc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2luZGV4ID0gLTE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOiKseiJsuWvueW6lOeahOi1hOa6kOWJjee8gFxyXG4gICAgKi9cclxuICAgIGh1YXNlQXJyRmFuZyA9IFtcIjAxXCIsIFwiMDVcIiwgXCIwOVwiLCBcIjEzXCIsIFwiMTdcIiwgXCIyMVwiLCBcIjI1XCIsIFwiMjlcIiwgXCIzM1wiLCBcIjM3XCIsIFwiNDFcIiwgXCI0NVwiLCBcIjQ5XCJdO1xyXG4gICAgaHVhc2VBcnJIZWkgPSBbXCIwMlwiLCBcIjA2XCIsIFwiMTBcIiwgXCIxNFwiLCBcIjE4XCIsIFwiMjJcIiwgXCIyNlwiLCBcIjMwXCIsIFwiMzRcIiwgXCIzOFwiLCBcIjQyXCIsIFwiNDZcIiwgXCI1MFwiXTtcclxuICAgIGh1YXNlQXJySG9uZyA9IFtcIjAzXCIsIFwiMDdcIiwgXCIxMVwiLCBcIjE1XCIsIFwiMTlcIiwgXCIyM1wiLCBcIjI3XCIsIFwiMzFcIiwgXCIzNVwiLCBcIjM5XCIsIFwiNDNcIiwgXCI0N1wiLCBcIjUxXCJdO1xyXG4gICAgaHVhc2VBcnJNZWkgPSBbXCIwNFwiLCBcIjA4XCIsIFwiMTJcIiwgXCIxNlwiLCBcIjIwXCIsIFwiMjRcIiwgXCIyOFwiLCBcIjMyXCIsIFwiMzZcIiwgXCI0MFwiLCBcIjQ0XCIsIFwiNDhcIiwgXCI1MlwiXTtcclxuICAgIEFsbGh1YXNlID0gW3RoaXMuaHVhc2VBcnJGYW5nLCB0aGlzLmh1YXNlQXJyTWVpLCB0aGlzLmh1YXNlQXJySG9uZywgdGhpcy5odWFzZUFyckhlaSxdXHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLmZyb250U3AgPSA8Y2MuU3ByaXRlPnRoaXMuZ2V0Q29tcG9uZW50KFwiZnJvbnRcIiwgY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLmJhY2tTcCA9IDxjYy5TcHJpdGU+dGhpcy5nZXRDb21wb25lbnQoXCJiYWNrXCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgLy8gdGhpcy5udW0gPSA8Y2MuU3ByaXRlPnRoaXMuZ2V0Q29tcG9uZW50KCdmcm9udC9udW0nLCBjYy5TcHJpdGUpO1xyXG4gICAgICAgIC8vIHRoaXMuc2hhcGVTcDEgPSA8Y2MuU3ByaXRlPnRoaXMuZ2V0Q29tcG9uZW50KCdmcm9udC9zaGFwZTEnLCBjYy5TcHJpdGUpO1xyXG4gICAgICAgIC8vIHRoaXMuc2hhcGVTcDIgPSA8Y2MuU3ByaXRlPnRoaXMuZ2V0Q29tcG9uZW50KCdmcm9udC9zaGFwZTInLCBjYy5TcHJpdGUpO1xyXG4gICAgICAgIC8vIHRoaXMuam9rZXJOdW1TcCA9IDxjYy5TcHJpdGU+dGhpcy5nZXRDb21wb25lbnQoJ2Zyb250L2pva2VyTnVtJywgY2MuU3ByaXRlKTtcclxuICAgICAgICAvLyB0aGlzLmpva2VyU2hhcGVTcCA9IDxjYy5TcHJpdGU+dGhpcy5nZXRDb21wb25lbnQoJ2Zyb250L2pva2VyU2hhcGUnLCBjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMuZHpTaWduTm9kZSA9IHRoaXMuZ2V0Q2hpbGQoJ2Zyb250L2R6Jyk7XHJcbiAgICAgICAgdGhpcy5kelNpZ25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgbm93SW5kZXgodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9pbmRleCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbm93SW5kZXgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRQb2tlckRlYWxQb3MoKSB7XHJcbiAgICAgICAgdGhpcy5maXhlZFBvcyA9IHRoaXMubm9kZS5wb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0UG9rZXJEZWFsUG9zWCgpIHtcclxuICAgICAgICB0aGlzLmZpeGVkUG9zLnggPSB0aGlzLm5vZGUucG9zaXRpb24ueDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0UG9rZXJQb3NpdGlvbihwb3M6IGNjLlZlYzMpIHtcclxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGlzRnJvbnQoZmxhZzogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2lzRnJvbnQgPSBmbGFnO1xyXG4gICAgICAgIHRoaXMuZnJvbnRTcC5ub2RlLmFjdGl2ZSA9IGZsYWc7XHJcbiAgICAgICAgdGhpcy5iYWNrU3Aubm9kZS5hY3RpdmUgPSAhZmxhZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzRnJvbnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRnJvbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwb2tlclZhbHVlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5fdmFsdWUgPT0gdmFsdWUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG5cclxuICAgICAgICB2YXIgYXRsYXNTdHJpbmcgPSBcInRleHR1cmUvYXRsYXMvcG9rZXJzL3Bva2Vyc1wiO1xyXG5cclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIG51bTEgPSBEZHpQb2tlclBvb2wuR2V0UG9rZXJOdW1CeVZhbHVlKHRoaXMucG9rZXJWYWx1ZSk7XHJcbiAgICAgICAgICAgIHZhciBodWFzZSA9IERkelBva2VyUG9vbC5HZXRQb2tlckh1YXNlQnlWYWx1ZSh0aGlzLnBva2VyVmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAobnVtMSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGh1YXNlID09IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRHYW1lQnVuZGxlQXV0b0F0bGFzKHRoaXMuZnJvbnRTcCwgYXRsYXNTdHJpbmcsIFwicHVrZV81M1wiLCBudWxsLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGh1YXNlID09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRHYW1lQnVuZGxlQXV0b0F0bGFzKHRoaXMuZnJvbnRTcCwgYXRsYXNTdHJpbmcsIFwicHVrZV81NFwiLCBudWxsLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRHYW1lQnVuZGxlQXV0b0F0bGFzKHRoaXMuZnJvbnRTcCwgYXRsYXNTdHJpbmcsIFwicHVrZV9cIiArIHRoaXMuQWxsaHVhc2VbaHVhc2VdW251bTFdLCBudWxsLCB0cnVlKTtcclxuICAgICAgICAgICAgLy9sZXQgW2lzR2hvc3QsIGNvbG9yLCBudW0sIHNDb2xvcl0gPSB0aGlzLlBva2VySGVscGVyLmdldFBva2VyU3R5bGUodmFsdWUpO1xyXG4gICAgICAgICAgICAvLyBsZXQgcG9rZXJBdGxhcyA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2V0R2FtZUJ1bmRsZVJlcyhEZHpQYXRoSGVscGVyLmdhbWVUZXh0dXJlUGF0aCArIFwiYXRsYXMvcG9rZXJcIiwgY2MuU3ByaXRlQXRsYXMpO1xyXG4gICAgICAgICAgICAvLyBpZiAoaXNHaG9zdCkge1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5udW0ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuc2hhcGVTcDIubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuc2hhcGVTcDEubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuam9rZXJOdW1TcC5zcHJpdGVGcmFtZSA9IHBva2VyQXRsYXMuZ2V0U3ByaXRlRnJhbWUobnVtKTs7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmpva2VyU2hhcGVTcC5zcHJpdGVGcmFtZSA9IHBva2VyQXRsYXMuZ2V0U3ByaXRlRnJhbWUoY29sb3IpOztcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuam9rZXJOdW1TcC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmpva2VyU2hhcGVTcC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLm51bS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnNoYXBlU3AyLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuc2hhcGVTcDEubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5udW0uc3ByaXRlRnJhbWUgPSBwb2tlckF0bGFzLmdldFNwcml0ZUZyYW1lKG51bSk7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnNoYXBlU3AyLnNwcml0ZUZyYW1lID0gcG9rZXJBdGxhcy5nZXRTcHJpdGVGcmFtZShjb2xvcik7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnNoYXBlU3AxLnNwcml0ZUZyYW1lID0gcG9rZXJBdGxhcy5nZXRTcHJpdGVGcmFtZShzQ29sb3IpO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5qb2tlck51bVNwLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmpva2VyU2hhcGVTcC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcG9rZXJWYWx1ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpc1NlbGVjdChmbGFnKSB7XHJcbiAgICAgICAgdGhpcy5faXNTZWxlY3QgPSBmbGFnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNTZWxlY3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzU2VsZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRQb2tlclNjYWxlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVQb2tlclNjYWxlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IHRoaXMuX3NjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5aSn54mM6L+Y5piv5bCP54mMXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSAx5aSn54mM77yMMOWwj+eJjFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0UG9rZXJTdHlsZShzaXplID0gMSkge1xyXG4gICAgICAgIC8vIGxldCBwb2tlckF0bGFzID0gR2xvYmFsLlJlc291cmNlTWFuYWdlci5nZXRHYW1lQnVuZGxlUmVzKERkelBhdGhIZWxwZXIuZ2FtZVRleHR1cmVQYXRoICsgXCJhdGxhcy9wb2tlcnNcIiwgY2MuU3ByaXRlQXRsYXMpO1xyXG4gICAgICAgIGlmIChzaXplID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gdGhpcy5EZWZpbmUuQmlnUG9rZXJTY2FsZTtcclxuICAgICAgICAgICAgbGV0IFtmcm9udFNmLCBiZ1NmXSA9IERkelBva2VySGVscGVyLmJpZ1Bva2VyQmdDZmc7XHJcbiAgICAgICAgICAgIC8vdGhpcy5mcm9udFNwLnNwcml0ZUZyYW1lID0gcG9rZXJBdGxhcy5nZXRTcHJpdGVGcmFtZShmcm9udFNmKTtcclxuICAgICAgICAgICAgLy90aGlzLmJhY2tTcC5zcHJpdGVGcmFtZSA9IHBva2VyQXRsYXMuZ2V0U3ByaXRlRnJhbWUoYmdTZik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSB0aGlzLkRlZmluZS5TbWFsbFBva2VyU2NhbGU7XHJcbiAgICAgICAgICAgIGxldCBbZnJvbnRTZiwgYmdTZl0gPSBEZHpQb2tlckhlbHBlci5zbWFsbFBva2VyQmdDZmc7XHJcbiAgICAgICAgICAgIC8vdGhpcy5mcm9udFNwLnNwcml0ZUZyYW1lID0gcG9rZXJBdGxhcy5nZXRTcHJpdGVGcmFtZShmcm9udFNmKTtcclxuICAgICAgICAgICAgLy90aGlzLmJhY2tTcC5zcHJpdGVGcmFtZSA9IHBva2VyQXRsYXMuZ2V0U3ByaXRlRnJhbWUoYmdTZik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93UG9rZXJBbmltKGNhbGxiYWNrOiBGdW5jdGlvbiwgdGltZVNjYWxlID0gMSwgZGVsYXkgPSAwLCBpc1NvdW5kID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLmlzRnJvbnQgPSBmYWxzZTtcclxuICAgICAgICBsZXQgdHdlZW4gPSBHYW1lLlR3ZWVuLmdldCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIGxldCBzY2FsZSA9IHRoaXMubm9kZS5zY2FsZTtcclxuXHJcbiAgICAgICAgdHdlZW4uZGVsYXkoZGVsYXkpXHJcbiAgICAgICAgICAgIC8v5pS+5aSnMS4z5YCNXHJcbiAgICAgICAgICAgIC50bygwLjEgKiB0aW1lU2NhbGUsIHsgc2NhbGU6IHNjYWxlICogMS4zIH0sIGNjLmVhc2VDdWJpY0FjdGlvbkluKCkpXHJcbiAgICAgICAgICAgIC8v5qiq5ZCR57yp5pS+XHJcbiAgICAgICAgICAgIC50bygwLjIgKiB0aW1lU2NhbGUsIHsgc2NhbGVYOiAwIH0sIGNjLmVhc2VDdWJpY0FjdGlvbkluKCkpXHJcbiAgICAgICAgICAgIC8v57+75ouNXHJcbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNGcm9udCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyBpc1NvdW5kICYmIEdsb2JhbC5BdWRpby5wbGF5R2FtZUJ1bmRsZVNvdW5kKERkekF1ZGlvQ29uc3QuYXVkaW9Db21tb25QYXRoICsgRGR6QXVkaW9Db25zdC5jb21tb25BdWRpby5Qb2tlckZsb3AsIHRydWUpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvL+WxleW8gFxyXG4gICAgICAgICAgICAudG8oMC4zNSAqIHRpbWVTY2FsZSwgeyBzY2FsZVg6IHNjYWxlICogMS4zIH0sIGNjLmVhc2VDdWJpY0FjdGlvbk91dCgpKVxyXG4gICAgICAgICAgICAuZGVsYXkoMC4yNSAqIHRpbWVTY2FsZSlcclxuICAgICAgICAgICAgLy/ov5jljp9cclxuICAgICAgICAgICAgLnRvKDAuMSwgeyBzY2FsZTogc2NhbGUgfSwgY2MuZWFzZUN1YmljQWN0aW9uT3V0KCkpXHJcbiAgICAgICAgICAgIC5jYWxsKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd1Bva2VyRWFzeUFuaW0oY2FsbGJhY2s6IEZ1bmN0aW9uLCB0aW1lU2NhbGUgPSAxLCBkZWxheSA9IDAsIGlzU291bmQgPSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuaXNGcm9udCA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB0d2VlbiA9IEdhbWUuVHdlZW4uZ2V0KHRoaXMubm9kZSk7XHJcbiAgICAgICAgbGV0IHNjYWxlID0gdGhpcy5ub2RlLnNjYWxlO1xyXG5cclxuICAgICAgICB0d2Vlbi5kZWxheShkZWxheSlcclxuICAgICAgICAgICAgLy/mqKrlkJHnvKnmlL5cclxuICAgICAgICAgICAgLnRvKDAuMyAqIHRpbWVTY2FsZSwgeyBzY2FsZVg6IDAgfSwgY2MuZWFzZUN1YmljQWN0aW9uSW4oKSlcclxuICAgICAgICAgICAgLy/nv7vmi41cclxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0Zyb250ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vIGlzU291bmQgJiYgR2xvYmFsLkF1ZGlvLnBsYXlHYW1lQnVuZGxlU291bmQoRGR6QXVkaW9Db25zdC5hdWRpb0NvbW1vblBhdGggKyBEZHpBdWRpb0NvbnN0LmNvbW1vbkF1ZGlvLlBva2VyRmxvcCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8v5bGV5byAXHJcbiAgICAgICAgICAgIC50bygwLjUgKiB0aW1lU2NhbGUsIHsgc2NhbGVYOiBzY2FsZSB9LCBjYy5lYXNlQ3ViaWNBY3Rpb25PdXQoKSlcclxuICAgICAgICAgICAgLmRlbGF5KDAuMiAqIHRpbWVTY2FsZSlcclxuICAgICAgICAgICAgLmNhbGwoY2FsbGJhY2spXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y2V54mM56e75YqoKOiHqui6q+eItuWdkOagh+WGhSlcclxuICAgICAqIEBwYXJhbSBmcm9tIOi1t+Wni+WdkOagh++8jOmcgOWFiOi9rOaNouWIsOeJjOaJgOWcqOWdkOagh+ezu1xyXG4gICAgICogQHBhcmFtIHRvIOe7iOeCueWdkOagh1xyXG4gICAgICogQHBhcmFtIHRpbWVTY2FsZSDnp7vliqjml7bplb9cclxuICAgICAqIEBwYXJhbSB0aW1lV2FpdCDnp7vliqjliY3lu7bml7ZcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDlrozmiJDlm57osINcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRvUG9rZXJNb3ZlKGZyb206IGNjLlZlYzMsIHRvOiBjYy5WZWMzLCB0aW1lU2NhbGUgPSAxLCB0aW1lV2FpdCA9IDAsIGNhbGxiYWNrPzogRnVuY3Rpb24sIGlzU291bmQgPSBmYWxzZSwgZWFzZTogYW55ID0gY2MuZWFzZUluKDEpKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKGZyb20pO1xyXG4gICAgICAgIGxldCB0d2VlbiA9IEdhbWUuVHdlZW4uZ2V0KHRoaXMubm9kZSk7XHJcbiAgICAgICAgdHdlZW4uZGVsYXkodGltZVdhaXQpXHJcbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlzU291bmQgJiYgR2xvYmFsLkF1ZGlvLnBsYXlHYW1lQnVuZGxlU291bmQoRGR6QXVkaW9Db25zdC5hdWRpb0NvbW1vblBhdGggKyBEZHpBdWRpb0NvbnN0LkRpc3BhdGNoUG9rZXIsIHRydWUpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudG8odGltZVNjYWxlLCB7IHBvc2l0aW9uOiB0bywgc2NhbGU6IHRoaXMuX3NjYWxlIH0sIGVhc2UpXHJcbiAgICAgICAgICAgIC5jYWxsKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TZWxlY3QoaXNTb3VuZCA9IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5pc1NlbGVjdCA9ICF0aGlzLmlzU2VsZWN0O1xyXG4gICAgICAgIGlmICh0aGlzLmlzU2VsZWN0KSB7XHJcbiAgICAgICAgICAgIC8vIGlzU291bmQgJiYgR2xvYmFsLkF1ZGlvLnBsYXlHYW1lQnVuZGxlU291bmQoRGR6QXVkaW9Db25zdC5hdWRpb0NvbW1vblBhdGggKyBEZHpBdWRpb0NvbnN0LlNlbGVjdFBva2VyLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKGNjLnYyKHRoaXMuZml4ZWRQb3MueCwgdGhpcy5maXhlZFBvcy55ICsgdGhpcy5EZWZpbmUuQ2hvb3NlT2Zmc2V0WSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHRoaXMuZml4ZWRQb3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXRTZWxlY3QoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHRoaXMuZml4ZWRQb3MpO1xyXG4gICAgICAgIHRoaXMuaXNTZWxlY3QgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0RHJhZ1NpZ24oaXNHcmF5KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNEcmFnID09IGlzR3JheSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaXNEcmFnID0gaXNHcmF5O1xyXG4gICAgICAgIEdsb2JhbC5VSUhlbHBlci5zZXROb2RlR3JheSh0aGlzLm5vZGUsIGlzR3JheSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldER6T3duZXIoZmxhZzogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuZHpTaWduTm9kZS5hY3RpdmUgPSBmbGFnO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bniYznmoTljp/lp4vkvY3nva5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFJhd1BvcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5maXhlZFBvcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlueJjOeahOS4lueVjOWdkOagh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0V29ybGRQb3NpdGlvbigpIHtcclxuICAgICAgICBsZXQgcG9zID0gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGhpcy5ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICByZXR1cm4gcG9zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W54mM5a6e6ZmF5bC65a+4XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRQb2tlclNpemUoKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHJldHVybiBbdGhpcy5ub2RlLnNjYWxlWCAqIHRoaXMubm9kZS53aWR0aCwgdGhpcy5ub2RlLnNjYWxlWSAqIHRoaXMubm9kZS5oZWlnaHRdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qOA5rWL54K55Ye75Z2Q5qCH5Zyo54mM5YaFXHJcbiAgICAgKiBAcGFyYW0gcG9zaXRpb24g5LiW55WM5Z2Q5qCH54K5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGVja0lzVG91Y2gocG9zaXRpb246IGNjLlZlYzIpIHtcclxuICAgICAgICBsZXQgcmVjID0gdGhpcy5ub2RlLmdldEJvdW5kaW5nQm94VG9Xb3JsZCgpO1xyXG4gICAgICAgIHJldHVybiByZWMuY29udGFpbnMocG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5piv5pi+56S65Y+v6YCJ5oup55qE54mMXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGVja1Bva2VyVmFsaWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5hY3RpdmVJbkhpZXJhcmNoeSAmJiB0aGlzLm5vZGUuYWN0aXZlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpIHtcclxuICAgICAgICB0aGlzLmlzU2VsZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc0Zyb250ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZXREek93bmVyKGZhbHNlKTtcclxuICAgICAgICB0aGlzLnNldERyYWdTaWduKGZhbHNlKTtcclxuICAgIH1cclxufSJdfQ==