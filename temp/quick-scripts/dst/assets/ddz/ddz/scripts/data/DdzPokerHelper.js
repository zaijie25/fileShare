
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/data/DdzPokerHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGRhdGFcXERkelBva2VySGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFLLFVBS0o7QUFMRCxXQUFLLFVBQVU7SUFDWCxpREFBVyxDQUFBO0lBQ2QsMkNBQVEsQ0FBQTtJQUNSLDZDQUFTLENBQUE7SUFDVCw2Q0FBUyxDQUFBO0FBQ1YsQ0FBQyxFQUxJLFVBQVUsS0FBVixVQUFVLFFBS2Q7QUFFRDtJQUFBO0lBd0xBLENBQUM7SUE1SUc7OztPQUdHO0lBQ0ksc0NBQWEsR0FBcEIsVUFBcUIsS0FBSztRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBQztZQUM3QixNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUN0QyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUM7WUFDekIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BDO2FBQ0c7WUFDQSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDckM7SUFDTCxDQUFDO0lBRU8sc0NBQWEsR0FBckIsVUFBc0IsS0FBSztRQUN2QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxLQUFLLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25ELElBQUksR0FBRyxHQUFHLGNBQWMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0MsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU8sdUNBQWMs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S0FBSyxJQUFHLFFBQVE7WUFDOUI7SUFFWSxvQ0FBcUI7UUFDL0IsR0FBQyxVQUFVLENBQUMsT0FBTyxJQUFHLFFBQVE7UUFDOUIsR0FBQyxVQUFVLENBQUMsSUFBSSxJQUFHLFFBQVE7UUFDM0IsR0FBQyxVQUFVLENBQUMsS0FBSyxJQUFHLFFBQVE7UUFDNUIsR0FBQyxVQUFVLENBQUMsS0FBSyxJQUFHLFFBQVE7WUFDOUI7SUFFWSxtQ0FBb0I7UUFDOUIsR0FBQyxVQUFVLENBQUMsT0FBTyxJQUFHLElBQUk7UUFDMUIsR0FBQyxVQUFVLENBQUMsSUFBSSxJQUFHLElBQUk7UUFDdkIsR0FBQyxVQUFVLENBQUMsS0FBSyxJQUFHLElBQUk7UUFDeEIsR0FBQyxVQUFVLENBQUMsS0FBSyxJQUFHLElBQUk7WUFDMUI7SUFFWSwrQkFBZ0I7UUFDMUIsR0FBQyxjQUFjLENBQUMsUUFBUSxJQUFHLFNBQVM7UUFDcEMsR0FBQyxjQUFjLENBQUMsVUFBVSxJQUFHLFNBQVM7WUFDekM7SUFFYSw2QkFBYztRQUN4QixHQUFDLGNBQWMsQ0FBQyxRQUFRLElBQUcsU0FBUztRQUNwQyxHQUFDLGNBQWMsQ0FBQyxVQUFVLElBQUcsU0FBUztZQUN6QztJQUVhLDhCQUFlLEdBQUc7UUFDNUIsU0FBUztRQUNULFNBQVM7S0FDWixDQUFDO0lBRVksNEJBQWEsR0FBRztRQUMxQixRQUFRO1FBQ1IsU0FBUztLQUNaLENBQUM7SUE2SU4scUJBQUM7Q0F4TEQsQUF3TEMsSUFBQTtrQkF4TG9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZW51bSBQb2tlckNvbG9ye1xyXG4gICAgRGlhbW9uZCA9IDEsXHJcblx0Q2x1YiA9IDIsXHJcblx0SGVhcnQgPSAzLFxyXG5cdFNwYWRlID0gNCxcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGR6UG9rZXJIZWxwZXJ7XHJcbiAgICBwdWJsaWMgc3RhdGljIFJlZEdob3N0ID0gOTU7XHJcbiAgICBwdWJsaWMgc3RhdGljIEJsYWNrR2hvc3QgPSA3OTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHBva2VyQ29sb3JTcHJpdGUgPSB7XHJcbiAgICAgICAgW1Bva2VyQ29sb3IuRGlhbW9uZF06IFwicHVrZV85XCIsXHJcbiAgICAgICAgW1Bva2VyQ29sb3IuQ2x1Yl06IFwicHVrZV84XCIsXHJcbiAgICAgICAgW1Bva2VyQ29sb3IuSGVhcnRdOiBcInB1a2VfNlwiLFxyXG4gICAgICAgIFtQb2tlckNvbG9yLlNwYWRlXTogXCJwdWtlXzdcIixcclxuICAgIH07XHJcbiAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgcG9rZXJTbWFsbENvbG9yU3ByaXRlID0ge1xyXG4gICAgICAgIFtQb2tlckNvbG9yLkRpYW1vbmRdOiBcInB1a2VfNVwiLFxyXG4gICAgICAgIFtQb2tlckNvbG9yLkNsdWJdOiBcInB1a2VfNFwiLFxyXG4gICAgICAgIFtQb2tlckNvbG9yLkhlYXJ0XTogXCJwdWtlXzJcIixcclxuICAgICAgICBbUG9rZXJDb2xvci5TcGFkZV06IFwicHVrZV8zXCIsXHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIHBva2VyTnVtUHJvU3ByaXRlU3RyID0ge1xyXG4gICAgICAgIFtQb2tlckNvbG9yLkRpYW1vbmRdOiBcInJfXCIsXHJcbiAgICAgICAgW1Bva2VyQ29sb3IuQ2x1Yl06IFwiYl9cIixcclxuICAgICAgICBbUG9rZXJDb2xvci5IZWFydF06IFwicl9cIixcclxuICAgICAgICBbUG9rZXJDb2xvci5TcGFkZV06IFwiYl9cIixcclxuICAgIH07XHJcbiAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2hvc3RDb2xvclNwcml0ZSA9IHtcclxuICAgICAgICBbRGR6UG9rZXJIZWxwZXIuUmVkR2hvc3RdOiBcInB1a2VfMzdcIixcclxuICAgICAgICBbRGR6UG9rZXJIZWxwZXIuQmxhY2tHaG9zdF06IFwicHVrZV8zNlwiLFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIGdob3N0TnVtU3ByaXRlID0ge1xyXG4gICAgICAgIFtEZHpQb2tlckhlbHBlci5SZWRHaG9zdF06IFwicHVrZV8zOVwiLFxyXG4gICAgICAgIFtEZHpQb2tlckhlbHBlci5CbGFja0dob3N0XTogXCJwdWtlXzM4XCIsXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzbWFsbFBva2VyQmdDZmcgPSBbXHJcbiAgICAgICAgJ3B1a2VfNTcnLFxyXG4gICAgICAgICdwdWtlXzU2JyxcclxuICAgIF07XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBiaWdQb2tlckJnQ2ZnID0gW1xyXG4gICAgICAgICdwdWtlXzEnLFxyXG4gICAgICAgICdwdWtlXzU1JyxcclxuICAgIF07XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlueJjOmdonN0eWxl77yMW+aYr+WQpumsvOeJjCwg5aSn6Iqx6Imyc2YsIOeJjOWAvHNmLCDlsI/oirHoibJzZl1cclxuICAgICAqIEBwYXJhbSB2YWx1ZSDmnI3liqHlmajniYzlgLxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFBva2VyU3R5bGUodmFsdWUpe1xyXG4gICAgICAgIGlmICghdGhpcy5jaGVja1Bva2VyVmFsaWQodmFsdWUpKXtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKCfmnI3liqHlmajniYzlgLzplJnor68nLCBTdHJpbmcodmFsdWUpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrSXNHaG9zdCh2YWx1ZSkpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRHaG9zdFN0eWxlKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Tm9ybWFsU3R5bGUodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEdob3N0U3R5bGUodmFsdWUpe1xyXG4gICAgICAgIGxldCBpc0dob3N0ID0gdHJ1ZTtcclxuICAgICAgICBsZXQgY29sb3IgPSBEZHpQb2tlckhlbHBlci5naG9zdENvbG9yU3ByaXRlW3ZhbHVlXTtcclxuICAgICAgICBsZXQgbnVtID0gRGR6UG9rZXJIZWxwZXIuZ2hvc3ROdW1TcHJpdGVbdmFsdWVdO1xyXG4gICAgICAgIGxldCBzQ29sb3IgPSAnJztcclxuICAgICAgICByZXR1cm4gW2lzR2hvc3QsIGNvbG9yLCBudW0sIHNDb2xvcl07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXROb3JtYWxTdHlsZSh2YWx1ZSl7XHJcbiAgICAgICAgbGV0IGlzR2hvc3QgPSBmYWxzZTtcclxuICAgICAgICBsZXQgW25OdW0sIG5Db2xvcl0gPSB0aGlzLmdldFBva2VyVmFsdWUodmFsdWUpO1xyXG4gICAgICAgIGxldCBjb2xvciA9IERkelBva2VySGVscGVyLnBva2VyQ29sb3JTcHJpdGVbbkNvbG9yXTtcclxuICAgICAgICBsZXQgbnVtID0gRGR6UG9rZXJIZWxwZXIucG9rZXJOdW1Qcm9TcHJpdGVTdHJbbkNvbG9yXSArIFN0cmluZyhuTnVtKTtcclxuICAgICAgICBsZXQgc0NvbG9yID0gRGR6UG9rZXJIZWxwZXIucG9rZXJTbWFsbENvbG9yU3ByaXRlW25Db2xvcl07XHJcbiAgICAgICAgcmV0dXJuIFtpc0dob3N0LCBjb2xvciwgbnVtLCBzQ29sb3JdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja1Bva2VyVmFsaWQodmFsdWUpe1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrSXNHaG9zdCh2YWx1ZSkpXHJcbiAgICAgICAgICAgIHJldHVybiAhMDtcclxuICAgICAgICBsZXQgW251bSwgY29sb3JdID0gdGhpcy5nZXRQb2tlclZhbHVlKHZhbHVlKTtcclxuICAgICAgICBpZiAobnVtID49IDIgJiYgbnVtIDw9IDE0ICYmIGNvbG9yID49IFBva2VyQ29sb3IuRGlhbW9uZCAmJiBjb2xvciA8PSBQb2tlckNvbG9yLlNwYWRlKXtcclxuICAgICAgICAgICAgcmV0dXJuICEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gITE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrSXNHaG9zdCh2YWx1ZSl7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlID09IERkelBva2VySGVscGVyLlJlZEdob3N0IHx8IHZhbHVlID09IERkelBva2VySGVscGVyLkJsYWNrR2hvc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFBva2VyVmFsdWUodmFsdWUpe1xyXG4gICAgICAgIGxldCBudW0gPSB2YWx1ZSAlIDE2O1xyXG4gICAgICAgIGxldCBjb2xvciA9IE1hdGguZmxvb3IodmFsdWUgLyAxNikgKyAxO1xyXG4gICAgICAgIHJldHVybiBbbnVtLCBjb2xvcl07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmjInnhaflpKflsI8t6Iqx6Imy5o6S5YiXXHJcbiAgICAgKiBAcGFyYW0gYXJyIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc29ydFBva2VyQXJyKGFycjogbnVtYmVyW10pe1xyXG4gICAgICAgIGxldCB0bXAgPSBbLi4uYXJyXTtcclxuICAgICAgICB0bXAuc29ydCgoYSwgYik9PntcclxuICAgICAgICAgICAgbGV0IFthdywgYWNdID0gdGhpcy5nZXRQb2tlcldlaWdodChhKTtcclxuICAgICAgICAgICAgbGV0IFtidywgYmNdID0gdGhpcy5nZXRQb2tlcldlaWdodChiKTtcclxuICAgICAgICAgICAgaWYgKGF3ID09IGJ3KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJjIC0gYWM7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBidyAtIGF3O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHRtcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaMieeFp+aVsOmHjy3lpKflsI8t6Iqx6Imy5o6S5YiXXHJcbiAgICAgKiBAcGFyYW0gYXJyIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc29ydFBva2VyQXJyQnlDb3VudChhcnI6IG51bWJlcltdKXtcclxuICAgICAgICBsZXQgdG1wID0gWy4uLmFycl07XHJcbiAgICAgICAgbGV0IFtudW1NYXBdID0gdGhpcy5jb21wdXRlVmFsdWVUaW1lcyhhcnIpO1xyXG4gICAgICAgIHRtcC5zb3J0KChhLCBiKT0+e1xyXG4gICAgICAgICAgICBsZXQgW2F2XSA9IHRoaXMuZ2V0UG9rZXJWYWx1ZShhKTtcclxuICAgICAgICAgICAgbGV0IFtidl0gPSB0aGlzLmdldFBva2VyVmFsdWUoYik7XHJcbiAgICAgICAgICAgIGlmIChudW1NYXBbYXZdID09IG51bU1hcFtidl0pe1xyXG4gICAgICAgICAgICAgICAgbGV0IFthdywgYWNdID0gdGhpcy5nZXRQb2tlcldlaWdodChhKTtcclxuICAgICAgICAgICAgICAgIGxldCBbYncsIGJjXSA9IHRoaXMuZ2V0UG9rZXJXZWlnaHQoYik7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXcgPT0gYncpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJjIC0gYWM7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJ3IC0gYXc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudW1NYXBbYnZdIC0gbnVtTWFwW2F2XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHRtcDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UG9rZXJXZWlnaHQodmFsdWU6IG51bWJlcil7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IERkelBva2VySGVscGVyLlJlZEdob3N0KVxyXG4gICAgICAgICAgICByZXR1cm4gWzIxLCAwXTtcclxuICAgICAgICBpZiAodmFsdWUgPT0gRGR6UG9rZXJIZWxwZXIuQmxhY2tHaG9zdClcclxuICAgICAgICAgICAgcmV0dXJuIFsyMCwgMF07XHJcbiAgICAgICAgbGV0IFtudW0sIGNvbG9yXSA9IHRoaXMuZ2V0UG9rZXJWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgbGV0IHdlaWdodCA9IG51bTtcclxuICAgICAgICBpZiAobnVtID09IDIpXHJcbiAgICAgICAgICAgIHdlaWdodCA9IDE1O1xyXG4gICAgICAgIHJldHVybiBbd2VpZ2h0LCBjb2xvcl07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorqHnrpfniYzmlbDmja7kuK3niYzpnaLlh7rnjrDmrKHmlbDvvIzov5Tlm55bbnVtTWFwLCBtYXhTaG93Q291bnQsIG1heE51bUFycl1cclxuICAgICAqIG51bU1hcCDmoIforrDmrKHmlbBcclxuICAgICAqIG1heFNob3dDb3VudCDmnIDlpJrmrKHmlbBcclxuICAgICAqIG1heE51bUFyciDmnIDlpJrmrKHmlbDnmoTniYzpnaLmlbDnu4RcclxuICAgICAqIEBwYXJhbSBhcnIgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb21wdXRlVmFsdWVUaW1lcyhhcnIgPSBbXSk6W2FueSwgbnVtYmVyLCBudW1iZXJbXV17XHJcbiAgICAgICAgbGV0IG51bU1hcCA9IHt9O1xyXG4gICAgICAgIGFyci5mb3JFYWNoKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgbGV0IFtudW1dID0gdGhpcy5nZXRQb2tlclZhbHVlKHZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKG51bU1hcFtudW1dKVxyXG4gICAgICAgICAgICAgICAgbnVtTWFwW251bV0gKys7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIG51bU1hcFtudW1dID0gMTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IG1heFNob3dDb3VudCA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gbnVtTWFwKXtcclxuICAgICAgICAgICAgaWYgKG51bU1hcFtrZXldID4gbWF4U2hvd0NvdW50KXtcclxuICAgICAgICAgICAgICAgIG1heFNob3dDb3VudCA9IG51bU1hcFtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtYXhOdW1BcnIgPSBbXTtcclxuICAgICAgICBmb3IobGV0IGtleSBpbiBudW1NYXApe1xyXG4gICAgICAgICAgICBpZiAobnVtTWFwW2tleV0gPT0gbWF4U2hvd0NvdW50KXtcclxuICAgICAgICAgICAgICAgIG1heE51bUFyci5wdXNoKGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBbbnVtTWFwLCBtYXhTaG93Q291bnQsIG1heE51bUFycl07XHJcbiAgICB9XHJcbn0iXX0=