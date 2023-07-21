"use strict";
cc._RF.push(module, '0a4a8+K5DNHzpsNQZE8yvh/', 'BbwzScrollLabel');
// bbwz/Bbwz/scripts/component/BbwzScrollLabel.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent;
/**
 * 文本跑分组件
 */
var BbwzScrollLabel = /** @class */ (function (_super) {
    __extends(BbwzScrollLabel, _super);
    function BbwzScrollLabel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultPrefix = "";
        _this.defaultSuffix = "";
        _this.prefix = null;
        _this.suffix = null;
        _this._numLabel = null;
        _this._curScrollNum = 0;
        _this.curNum = 0;
        /**
         * 几位小数
         */
        _this.pointCount = 0;
        return _this;
    }
    BbwzScrollLabel.prototype.onDestroy = function () {
        this.stop();
    };
    Object.defineProperty(BbwzScrollLabel.prototype, "numLabel", {
        get: function () {
            if (this._numLabel == null) {
                this._numLabel = this.node.getComponent(cc.Label);
            }
            return this._numLabel;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BbwzScrollLabel.prototype, "scrollNum", {
        get: function () {
            return this._curScrollNum;
        },
        set: function (value) {
            this._curScrollNum = value;
            if (this.curNum != value) {
                this.curNum = value;
                this.numLabel.string = this.prefix + value.toFixed(this.pointCount) + this.suffix;
            }
        },
        enumerable: false,
        configurable: true
    });
    BbwzScrollLabel.prototype.stop = function () {
        if (this.scrollTween) {
            this.scrollTween.stop();
            this.scrollTween = null;
        }
    };
    /**
     * 设置滚动数字参数
     * @param num 目标结果数字
     * @param time 滚动时间
     * @param prefix 滚动文字前缀
     * @param suffix 滚动文字后缀
     */
    BbwzScrollLabel.prototype.goToNum = function (num, time, prefix, suffix) {
        if (time === void 0) { time = 0.5; }
        this.prefix = prefix || this.defaultPrefix;
        this.suffix = suffix || this.defaultSuffix;
        this.stop();
        if (Math.abs(num - this._curScrollNum) <= 1) {
            time = 0;
        }
        if (time == 0) {
            this._curScrollNum = this.curNum = num;
            this.numLabel.string = this.prefix + this.curNum + this.suffix;
            return;
        }
        this.scrollTween = new cc.Tween();
        this.scrollTween.target(this);
        this.scrollTween.to(time, { scrollNum: num }, { progress: null, easing: "quadOut" });
        this.scrollTween.start();
    };
    BbwzScrollLabel.prototype.clear = function () {
        this.prefix = this.prefix || this.defaultPrefix;
        this.suffix = this.suffix || this.defaultSuffix;
        this._curScrollNum = this.curNum = 0;
        this.numLabel.string = this.prefix + this.curNum + this.suffix;
    };
    __decorate([
        property
    ], BbwzScrollLabel.prototype, "defaultPrefix", void 0);
    __decorate([
        property
    ], BbwzScrollLabel.prototype, "defaultSuffix", void 0);
    BbwzScrollLabel = __decorate([
        ccclass,
        requireComponent(cc.Label)
    ], BbwzScrollLabel);
    return BbwzScrollLabel;
}(cc.Component));
exports.default = BbwzScrollLabel;

cc._RF.pop();