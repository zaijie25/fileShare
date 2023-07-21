"use strict";
cc._RF.push(module, '3366a8krURDv5RUCWueG81d', 'DdzPokerHelper');
// ddz/ddz/scripts/data/DdzPokerHelper.ts

"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
var PokerColor;
(function (PokerColor) {
    PokerColor[PokerColor["Diamond"] = 1] = "Diamond";
    PokerColor[PokerColor["Club"] = 2] = "Club";
    PokerColor[PokerColor["Heart"] = 3] = "Heart";
    PokerColor[PokerColor["Spade"] = 4] = "Spade";
})(PokerColor || (PokerColor = {}));
var DdzPokerHelper = /** @class */ (function () {
    function DdzPokerHelper() {
    }
    /**
     * 获取牌面style，[是否鬼牌, 大花色sf, 牌值sf, 小花色sf]
     * @param value 服务器牌值
     */
    DdzPokerHelper.prototype.getPokerStyle = function (value) {
        if (!this.checkPokerValid(value)) {
            Logger.error('服务器牌值错误', String(value));
            return;
        }
        if (this.checkIsGhost(value)) {
            return this.getGhostStyle(value);
        }
        else {
            return this.getNormalStyle(value);
        }
    };
    DdzPokerHelper.prototype.getGhostStyle = function (value) {
        var isGhost = true;
        var color = DdzPokerHelper.ghostColorSprite[value];
        var num = DdzPokerHelper.ghostNumSprite[value];
        var sColor = '';
        return [isGhost, color, num, sColor];
    };
    DdzPokerHelper.prototype.getNormalStyle = function (value) {
        var isGhost = false;
        var _a = this.getPokerValue(value), nNum = _a[0], nColor = _a[1];
        var color = DdzPokerHelper.pokerColorSprite[nColor];
        var num = DdzPokerHelper.pokerNumProSpriteStr[nColor] + String(nNum);
        var sColor = DdzPokerHelper.pokerSmallColorSprite[nColor];
        return [isGhost, color, num, sColor];
    };
    DdzPokerHelper.prototype.checkPokerValid = function (value) {
        if (this.checkIsGhost(value))
            return !0;
        var _a = this.getPokerValue(value), num = _a[0], color = _a[1];
        if (num >= 2 && num <= 14 && color >= PokerColor.Diamond && color <= PokerColor.Spade) {
            return !0;
        }
        return !1;
    };
    DdzPokerHelper.prototype.checkIsGhost = function (value) {
        return value == DdzPokerHelper.RedGhost || value == DdzPokerHelper.BlackGhost;
    };
    DdzPokerHelper.prototype.getPokerValue = function (value) {
        var num = value % 16;
        var color = Math.floor(value / 16) + 1;
        return [num, color];
    };
    /**
     * 按照大小-花色排列
     * @param arr
     */
    DdzPokerHelper.prototype.sortPokerArr = function (arr) {
        var _this = this;
        var tmp = __spreadArrays(arr);
        tmp.sort(function (a, b) {
            var _a = _this.getPokerWeight(a), aw = _a[0], ac = _a[1];
            var _b = _this.getPokerWeight(b), bw = _b[0], bc = _b[1];
            if (aw == bw)
                return bc - ac;
            else
                return bw - aw;
        });
        return tmp;
    };
    /**
     * 按照数量-大小-花色排列
     * @param arr
     */
    DdzPokerHelper.prototype.sortPokerArrByCount = function (arr) {
        var _this = this;
        var tmp = __spreadArrays(arr);
        var numMap = this.computeValueTimes(arr)[0];
        tmp.sort(function (a, b) {
            var av = _this.getPokerValue(a)[0];
            var bv = _this.getPokerValue(b)[0];
            if (numMap[av] == numMap[bv]) {
                var _a = _this.getPokerWeight(a), aw = _a[0], ac = _a[1];
                var _b = _this.getPokerWeight(b), bw = _b[0], bc = _b[1];
                if (aw == bw)
                    return bc - ac;
                else
                    return bw - aw;
            }
            else {
                return numMap[bv] - numMap[av];
            }
        });
        return tmp;
    };
    DdzPokerHelper.prototype.getPokerWeight = function (value) {
        if (value == DdzPokerHelper.RedGhost)
            return [21, 0];
        if (value == DdzPokerHelper.BlackGhost)
            return [20, 0];
        var _a = this.getPokerValue(value), num = _a[0], color = _a[1];
        var weight = num;
        if (num == 2)
            weight = 15;
        return [weight, color];
    };
    /**
     * 计算牌数据中牌面出现次数，返回[numMap, maxShowCount, maxNumArr]
     * numMap 标记次数
     * maxShowCount 最多次数
     * maxNumArr 最多次数的牌面数组
     * @param arr
     */
    DdzPokerHelper.prototype.computeValueTimes = function (arr) {
        var _this = this;
        if (arr === void 0) { arr = []; }
        var numMap = {};
        arr.forEach(function (value) {
            var num = _this.getPokerValue(value)[0];
            if (numMap[num])
                numMap[num]++;
            else
                numMap[num] = 1;
        });
        var maxShowCount = 0;
        for (var key in numMap) {
            if (numMap[key] > maxShowCount) {
                maxShowCount = numMap[key];
            }
        }
        var maxNumArr = [];
        for (var key in numMap) {
            if (numMap[key] == maxShowCount) {
                maxNumArr.push(key);
            }
        }
        return [numMap, maxShowCount, maxNumArr];
    };
    DdzPokerHelper.RedGhost = 95;
    DdzPokerHelper.BlackGhost = 79;
    DdzPokerHelper.pokerColorSprite = (_a = {},
        _a[PokerColor.Diamond] = "puke_9",
        _a[PokerColor.Club] = "puke_8",
        _a[PokerColor.Heart] = "puke_6",
        _a[PokerColor.Spade] = "puke_7",
        _a);
    DdzPokerHelper.pokerSmallColorSprite = (_b = {},
        _b[PokerColor.Diamond] = "puke_5",
        _b[PokerColor.Club] = "puke_4",
        _b[PokerColor.Heart] = "puke_2",
        _b[PokerColor.Spade] = "puke_3",
        _b);
    DdzPokerHelper.pokerNumProSpriteStr = (_c = {},
        _c[PokerColor.Diamond] = "r_",
        _c[PokerColor.Club] = "b_",
        _c[PokerColor.Heart] = "r_",
        _c[PokerColor.Spade] = "b_",
        _c);
    DdzPokerHelper.ghostColorSprite = (_d = {},
        _d[DdzPokerHelper.RedGhost] = "puke_37",
        _d[DdzPokerHelper.BlackGhost] = "puke_36",
        _d);
    DdzPokerHelper.ghostNumSprite = (_e = {},
        _e[DdzPokerHelper.RedGhost] = "puke_39",
        _e[DdzPokerHelper.BlackGhost] = "puke_38",
        _e);
    DdzPokerHelper.smallPokerBgCfg = [
        'puke_57',
        'puke_56',
    ];
    DdzPokerHelper.bigPokerBgCfg = [
        'puke_1',
        'puke_55',
    ];
    return DdzPokerHelper;
}());
exports.default = DdzPokerHelper;

cc._RF.pop();