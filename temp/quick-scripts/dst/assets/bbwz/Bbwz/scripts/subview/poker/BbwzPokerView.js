
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/subview/poker/BbwzPokerView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcc3Vidmlld1xccG9rZXJcXEJid3pQb2tlclZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQTJDO0FBQzNDLDhEQUF5RDtBQUN6RCw0REFBdUQ7QUFDdkQsMERBQXFEO0FBRXJEO0lBQTJDLGlDQUFZO0lBUW5ELHVCQUFZLElBQWE7UUFBekIsWUFDSSxpQkFBTyxTQUVWO1FBREcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQUVTLGdDQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQWMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQyxDQUFDO0lBS0Qsc0JBQVcsa0NBQU87YUFNbEI7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQztRQVhEOztXQUVHO2FBQ0gsVUFBbUIsSUFBYTtZQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ2pDLENBQUM7OztPQUFBO0lBU0Qsc0JBQVcscUNBQVU7YUFVckI7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQztR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QyxLQUFLLENBQUMsUUFBUSxDQUFDO2FBQ3BCLElBQUksQ0FBQztZQUNGLE9BQU8sSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyx5QkFBZSxDQUFDLE9BQU8sRUFBQyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RyxDQUFDLENBQUM7YUFDRCxFQUFFLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7YUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUNkLEtBQUssRUFBRSxDQUFDO0lBQ2IsQ0FBQztJQUVNLGlDQUFTLEdBQWhCO1FBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSw2QkFBSyxHQUFaO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFDTCxvQkFBQztBQUFELENBakpBLEFBaUpDLENBakowQyxzQkFBWSxHQWlKdEQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmJ3ekJhc2VWaWV3IGZyb20gXCIuLi9CYnd6QmFzZVZpZXdcIjtcclxuaW1wb3J0IEJid3pDb25zdERlZmluZSBmcm9tIFwiLi4vLi4vZGF0YS9CYnd6Q29uc3REZWZpbmVcIjtcclxuaW1wb3J0IEJid3pQYXRoSGVscGVyIGZyb20gXCIuLi8uLi90b29sL0Jid3pQYXRoSGVscGVyXCI7XHJcbmltcG9ydCBCYnd6UG9rZXJUb29sIGZyb20gXCIuLi8uLi90b29sL0Jid3pQb2tlclRvb2xcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJid3pQb2tlclZpZXcgZXh0ZW5kcyBCYnd6QmFzZVZpZXd7XHJcbiAgICBwcml2YXRlIGJhY2tOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBmcm9udFNwOiBjYy5TcHJpdGU7XHJcbiAgICBwcml2YXRlIF9pc0Zyb250OiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfdmFsdWU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcmF3UG9zOiBjYy5WZWMyO1xyXG4gICAgcHVibGljIHJhd1NjYWxlOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5iYWNrTm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJiZ1wiKTtcclxuICAgICAgICB0aGlzLmZyb250U3AgPSA8Y2MuU3ByaXRlPnRoaXMuZ2V0Q29tcG9uZW50KFwiZnJvbnRcIiwgY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLnJhd1BvcyA9IHRoaXMubm9kZS5wb3NpdGlvbjtcclxuICAgICAgICB0aGlzLnJhd1NjYWxlID0gdGhpcy5ub2RlLnNjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u54mM5q2j5Y+N6Z2iIHRydWUg5q2j6Z2iXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgaXNGcm9udChmbGFnOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5faXNGcm9udCA9IGZsYWc7XHJcbiAgICAgICAgdGhpcy5mcm9udFNwLm5vZGUuYWN0aXZlID0gZmxhZztcclxuICAgICAgICB0aGlzLmJhY2tOb2RlLmFjdGl2ZSA9ICFmbGFnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNGcm9udCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0Zyb250O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u54mM5YC85Zu+5qGIIOS8oOWFpeacjeWKoeWZqOeJjOWAvFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHBva2VyVmFsdWUodmFsdWU6IG51bWJlcil7XHJcbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlID09IHZhbHVlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICBpZiAodmFsdWUpe1xyXG4gICAgICAgICAgICBsZXQgcG9rZXJSZXMgPSBCYnd6UG9rZXJUb29sLnBva2VyUmVzTWFwW051bWJlcih2YWx1ZSldO1xyXG4gICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRCdW5kbGVBdXRvQXRsYXMoQmJ3ekNvbnN0RGVmaW5lLkdBTUVfSUQsdGhpcy5mcm9udFNwLCBCYnd6UGF0aEhlbHBlci5nYW1lVGV4dHVyZVBhdGggKyBcImF0bGFzL3Bva2VyL2F0bGFzX3Bva2VyXCIsIHBva2VyUmVzLCBudWxsLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwb2tlclZhbHVlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57+754mM5Yqo55S7IOW4puaUvuWkp+aViOaenOeahFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIOe/u+WujOeJjOWbnuiwg1xyXG4gICAgICogQHBhcmFtIHRpbWVTY2FsZSDmgLvml7bplb/kuI3ljIXlkKtkZWxheVxyXG4gICAgICogQHBhcmFtIGRlbGF5IOW7tuaXtlxyXG4gICAgICogQHBhcmFtIGlzU291bmQg5piv5ZCm5pKt5pS+57+754mM6Z+z5pWIIOm7mOiupOS4jeaSrVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd1Bva2VyQW5pbShjYWxsYmFjazogRnVuY3Rpb24sIHRpbWVTY2FsZSA9IDEsIGRlbGF5ID0gMCwgaXNTb3VuZCA9IGZhbHNlKXtcclxuICAgICAgICB0aGlzLmlzRnJvbnQgPSBmYWxzZTtcclxuICAgICAgICBsZXQgdHdlZW4gPSBHYW1lLlR3ZWVuLmdldCh0aGlzLm5vZGUpO1xyXG5cclxuICAgICAgICB0d2Vlbi5kZWxheShkZWxheSlcclxuICAgICAgICAvL+aUvuWkpzEuM+WAjVxyXG4gICAgICAgIC50bygwLjEgKiB0aW1lU2NhbGUsIHtzY2FsZTogdGhpcy5yYXdTY2FsZSAqIDEuM30sIGNjLmVhc2VDdWJpY0FjdGlvbkluKCkpXHJcbiAgICAgICAgLy/mqKrlkJHnvKnmlL5cclxuICAgICAgICAudG8oMC4yICogdGltZVNjYWxlLCB7c2NhbGVYOiAwfSwgY2MuZWFzZUN1YmljQWN0aW9uSW4oKSlcclxuICAgICAgICAvL+e/u+aLjVxyXG4gICAgICAgIC5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuaXNGcm9udCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlzU291bmQgJiYgR2xvYmFsLkF1ZGlvLnBsYXlCdW5kbGVTb3VuZChCYnd6Q29uc3REZWZpbmUuR0FNRV9JRCxCYnd6Q29uc3REZWZpbmUuU09VTkRfWkhFTkdQQUksIHRydWUpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy/lsZXlvIBcclxuICAgICAgICAudG8oMC4zNSAqIHRpbWVTY2FsZSwge3NjYWxlWDogdGhpcy5yYXdTY2FsZSAqIDEuM30sIGNjLmVhc2VDdWJpY0FjdGlvbk91dCgpKVxyXG4gICAgICAgIC5kZWxheSgwLjI1ICogdGltZVNjYWxlKVxyXG4gICAgICAgIC8v6L+Y5Y6fXHJcbiAgICAgICAgLnRvKDAuMSwge3NjYWxlOiB0aGlzLnJhd1NjYWxlfSwgY2MuZWFzZUN1YmljQWN0aW9uT3V0KCkpXHJcbiAgICAgICAgLmNhbGwoY2FsbGJhY2spXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnv7vniYzliqjnlLsg5LiN5bim5pS+5aSn5pWI5p6cXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sg57+75a6M54mM5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gdGltZVNjYWxlIOaAu+aXtumVv+S4jeWMheWQq2RlbGF5XHJcbiAgICAgKiBAcGFyYW0gZGVsYXkg5bu25pe2XHJcbiAgICAgKiBAcGFyYW0gaXNTb3VuZCDmmK/lkKbmkq3mlL7nv7vniYzpn7PmlYgg6buY6K6k5LiN5pKtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93UG9rZXJFYXN5QW5pbShjYWxsYmFjazogRnVuY3Rpb24sIHRpbWVTY2FsZSA9IDEsIGRlbGF5ID0gMCwgaXNTb3VuZCA9IGZhbHNlKXtcclxuICAgICAgICB0aGlzLmlzRnJvbnQgPSBmYWxzZTtcclxuICAgICAgICBsZXQgdHdlZW4gPSBHYW1lLlR3ZWVuLmdldCh0aGlzLm5vZGUpO1xyXG5cclxuICAgICAgICB0d2Vlbi5kZWxheShkZWxheSlcclxuICAgICAgICAvL+aoquWQkee8qeaUvlxyXG4gICAgICAgIC50bygwLjMgKiB0aW1lU2NhbGUsIHtzY2FsZVg6IDB9LCBjYy5lYXNlQ3ViaWNBY3Rpb25JbigpKVxyXG4gICAgICAgIC8v57+75ouNXHJcbiAgICAgICAgLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5pc0Zyb250ID0gdHJ1ZTtcclxuICAgICAgICAgICAgaXNTb3VuZCAmJiBHbG9iYWwuQXVkaW8ucGxheUJ1bmRsZVNvdW5kKEJid3pDb25zdERlZmluZS5HQU1FX0lELEJid3pDb25zdERlZmluZS5TT1VORF9aSEVOR1BBSSwgdHJ1ZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL+WxleW8gFxyXG4gICAgICAgIC50bygwLjUgKiB0aW1lU2NhbGUsIHtzY2FsZVg6IHRoaXMucmF3U2NhbGV9LCBjYy5lYXNlQ3ViaWNBY3Rpb25PdXQoKSlcclxuICAgICAgICAuZGVsYXkoMC4yICogdGltZVNjYWxlKVxyXG4gICAgICAgIC5jYWxsKGNhbGxiYWNrKVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y2V54mM56e75YqoKOiHqui6q+eItuWdkOagh+WGhSlcclxuICAgICAqIEBwYXJhbSBmcm9tIOi1t+Wni+WdkOagh++8jOmcgOWFiOi9rOaNouWIsOeJjOaJgOWcqOWdkOagh+ezu1xyXG4gICAgICogQHBhcmFtIHRvIOe7iOeCueWdkOagh1xyXG4gICAgICogQHBhcmFtIHRpbWVTY2FsZSDnp7vliqjml7bplb9cclxuICAgICAqIEBwYXJhbSB0aW1lV2FpdCDnp7vliqjliY3lu7bml7ZcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDlrozmiJDlm57osINcclxuICAgICAqIEBwYXJhbSBpc1NvdW5kXHJcbiAgICAgKiBAcGFyYW0gZWFzZVxyXG4gICAgICogQHBhcmFtIGlzUmF3U2NhbGUg5piv5ZCm5pS+57yp5Yiw5Y6f5aeL5bC65a+4XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb1Bva2VyTW92ZShmcm9tOiBjYy5WZWMyLCB0bzogY2MuVmVjMiwgdGltZVNjYWxlID0gMSwgdGltZVdhaXQgPSAwLCBjYWxsYmFjaz86IEZ1bmN0aW9uLCBpc1NvdW5kID0gZmFsc2UsIGVhc2U6IGFueSA9IGNjLmVhc2VJbigxKSwgaXNSYXdTY2FsZTogYm9vbGVhbiA9IGZhbHNlKXtcclxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oZnJvbSk7XHJcbiAgICAgICAgbGV0IHByb3BzID0ge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogdG9cclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChpc1Jhd1NjYWxlKVxyXG4gICAgICAgICAgICBwcm9wc1tcInNjYWxlXCJdID0gdGhpcy5yYXdTY2FsZTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgdHdlZW4gPSBHYW1lLlR3ZWVuLmdldCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIHR3ZWVuLmRlbGF5KHRpbWVXYWl0KVxyXG4gICAgICAgIC5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgIGlzU291bmQgJiYgR2xvYmFsLkF1ZGlvLnBsYXlCdW5kbGVTb3VuZChCYnd6Q29uc3REZWZpbmUuR0FNRV9JRCxCYnd6Q29uc3REZWZpbmUuU09VTkRfRkFQQUksIHRydWUpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRvKHRpbWVTY2FsZSwgcHJvcHMsIGVhc2UpXHJcbiAgICAgICAgLmNhbGwoY2FsbGJhY2spXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFJhd1Bvcygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJhd1BvcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKXtcclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSB0aGlzLnJhd1NjYWxlO1xyXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih0aGlzLnJhd1Bvcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgdGhpcy5pc0Zyb250ID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iXX0=