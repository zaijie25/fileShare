
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/component/BbwzScrollLabel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcY29tcG9uZW50XFxCYnd6U2Nyb2xsTGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF5QyxFQUFFLENBQUMsVUFBVSxFQUFwRCxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxnQkFBZ0Isc0JBQWlCLENBQUM7QUFFN0Q7O0dBRUc7QUFHSDtJQUE2QyxtQ0FBWTtJQUF6RDtRQUFBLHFFQWdGQztRQTlFYSxtQkFBYSxHQUFZLEVBQUUsQ0FBQztRQUU1QixtQkFBYSxHQUFZLEVBQUUsQ0FBQztRQUk1QixZQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUMzQixtQkFBYSxHQUFZLENBQUMsQ0FBQztRQUMzQixZQUFNLEdBQVksQ0FBQyxDQUFDO1FBRzlCOztXQUVHO1FBQ0gsZ0JBQVUsR0FBVSxDQUFDLENBQUM7O0lBOEQxQixDQUFDO0lBNURHLG1DQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELHNCQUFjLHFDQUFRO2FBQXRCO1lBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBQztnQkFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDckQ7WUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxzQ0FBUzthQU9wQjtZQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM5QixDQUFDO2FBVEQsVUFBc0IsS0FBYztZQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUMzQixJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxFQUFDO2dCQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ3JGO1FBQ0wsQ0FBQzs7O09BQUE7SUFLUyw4QkFBSSxHQUFkO1FBQ0ksSUFBRyxJQUFJLENBQUMsV0FBVyxFQUFDO1lBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksaUNBQU8sR0FBZCxVQUFpQixHQUFZLEVBQUcsSUFBbUIsRUFBRyxNQUFnQixFQUFHLE1BQWdCO1FBQXpELHFCQUFBLEVBQUEsVUFBbUI7UUFDL0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBQztZQUN2QyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1NBQ1o7UUFDRCxJQUFHLElBQUksSUFBSSxDQUFDLEVBQUM7WUFDVCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQy9ELE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFDLEVBQUMsU0FBUyxFQUFFLEdBQUcsRUFBQyxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFTSwrQkFBSyxHQUFaO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDaEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDaEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNuRSxDQUFDO0lBN0VEO1FBREMsUUFBUTswREFDNkI7SUFFdEM7UUFEQyxRQUFROzBEQUM2QjtJQUpyQixlQUFlO1FBRm5DLE9BQU87UUFDUCxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ04sZUFBZSxDQWdGbkM7SUFBRCxzQkFBQztDQWhGRCxBQWdGQyxDQWhGNEMsRUFBRSxDQUFDLFNBQVMsR0FnRnhEO2tCQWhGb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIHJlcXVpcmVDb21wb25lbnR9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8qKlxyXG4gKiDmlofmnKzot5HliIbnu4Tku7ZcclxuICovXHJcbkBjY2NsYXNzXHJcbkByZXF1aXJlQ29tcG9uZW50KGNjLkxhYmVsKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYnd6U2Nyb2xsTGFiZWwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICBwcm90ZWN0ZWQgZGVmYXVsdFByZWZpeCA6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByb3RlY3RlZCBkZWZhdWx0U3VmZml4IDogc3RyaW5nID0gXCJcIjtcclxuXHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBwcmVmaXggOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgcHJvdGVjdGVkIHN1ZmZpeCA6IHN0cmluZyA9IG51bGw7XHJcbiAgICBwcm90ZWN0ZWQgX251bUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBwcm90ZWN0ZWQgX2N1clNjcm9sbE51bSA6IG51bWJlciA9IDA7XHJcbiAgICBwcm90ZWN0ZWQgY3VyTnVtIDogbnVtYmVyID0gMDtcclxuICAgIHByb3RlY3RlZCBzY3JvbGxUd2VlbiA6IGNjLlR3ZWVuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yeg5L2N5bCP5pWwXHJcbiAgICAgKi9cclxuICAgIHBvaW50Q291bnQ6bnVtYmVyID0gMDtcclxuXHJcbiAgICBvbkRlc3Ryb3koKXtcclxuICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IG51bUxhYmVsKCl7XHJcbiAgICAgICAgaWYodGhpcy5fbnVtTGFiZWwgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMuX251bUxhYmVsID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICByZXR1cm4gdGhpcy5fbnVtTGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzY3JvbGxOdW0oIHZhbHVlIDogbnVtYmVyICl7XHJcbiAgICAgICAgdGhpcy5fY3VyU2Nyb2xsTnVtID0gdmFsdWU7XHJcbiAgICAgICAgaWYodGhpcy5jdXJOdW0gIT0gdmFsdWUpe1xyXG4gICAgICAgICAgICB0aGlzLmN1ck51bSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm51bUxhYmVsLnN0cmluZyA9IHRoaXMucHJlZml4ICsgdmFsdWUudG9GaXhlZCh0aGlzLnBvaW50Q291bnQpICsgdGhpcy5zdWZmaXg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBzY3JvbGxOdW0oKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3VyU2Nyb2xsTnVtO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgc3RvcCgpe1xyXG4gICAgICAgIGlmKHRoaXMuc2Nyb2xsVHdlZW4pe1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFR3ZWVuLnN0b3AoKTtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxUd2VlbiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICBcclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5rua5Yqo5pWw5a2X5Y+C5pWwXHJcbiAgICAgKiBAcGFyYW0gbnVtIOebruagh+e7k+aenOaVsOWtl1xyXG4gICAgICogQHBhcmFtIHRpbWUg5rua5Yqo5pe26Ze0XHJcbiAgICAgKiBAcGFyYW0gcHJlZml4IOa7muWKqOaWh+Wtl+WJjee8gFxyXG4gICAgICogQHBhcmFtIHN1ZmZpeCDmu5rliqjmloflrZflkI7nvIBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdvVG9OdW0oICBudW0gOiBudW1iZXIgLCB0aW1lIDogbnVtYmVyID0gMC41ICwgcHJlZml4PyA6IHN0cmluZyAsIHN1ZmZpeD8gOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMucHJlZml4ID0gcHJlZml4IHx8IHRoaXMuZGVmYXVsdFByZWZpeDtcclxuICAgICAgICB0aGlzLnN1ZmZpeCA9IHN1ZmZpeCB8fCB0aGlzLmRlZmF1bHRTdWZmaXg7XHJcbiAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgaWYoTWF0aC5hYnMobnVtIC0gdGhpcy5fY3VyU2Nyb2xsTnVtKSA8PSAxKXtcclxuICAgICAgICAgICAgdGltZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRpbWUgPT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1clNjcm9sbE51bSA9IHRoaXMuY3VyTnVtID0gbnVtO1xyXG4gICAgICAgICAgICB0aGlzLm51bUxhYmVsLnN0cmluZyA9IHRoaXMucHJlZml4ICsgdGhpcy5jdXJOdW0gKyB0aGlzLnN1ZmZpeDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNjcm9sbFR3ZWVuID0gbmV3IGNjLlR3ZWVuKCk7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxUd2Vlbi50YXJnZXQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxUd2Vlbi50byh0aW1lLHtzY3JvbGxOdW06IG51bX0seyBwcm9ncmVzczogbnVsbCwgZWFzaW5nOiBcInF1YWRPdXRcIiB9KTtcclxuICAgICAgICB0aGlzLnNjcm9sbFR3ZWVuLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCl7XHJcbiAgICAgICAgdGhpcy5wcmVmaXggPSB0aGlzLnByZWZpeCB8fCB0aGlzLmRlZmF1bHRQcmVmaXg7XHJcbiAgICAgICAgdGhpcy5zdWZmaXggPSB0aGlzLnN1ZmZpeCB8fCB0aGlzLmRlZmF1bHRTdWZmaXg7XHJcbiAgICAgICAgdGhpcy5fY3VyU2Nyb2xsTnVtID0gdGhpcy5jdXJOdW0gPSAwO1xyXG4gICAgICAgIHRoaXMubnVtTGFiZWwuc3RyaW5nID0gdGhpcy5wcmVmaXggKyB0aGlzLmN1ck51bSArIHRoaXMuc3VmZml4O1xyXG4gICAgfVxyXG59Il19