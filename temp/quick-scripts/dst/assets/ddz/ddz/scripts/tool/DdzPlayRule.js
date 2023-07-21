
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/tool/DdzPlayRule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd18c0yobDRMxK1FvMFG/2S0', 'DdzPlayRule');
// ddz/ddz/scripts/tool/DdzPlayRule.ts

"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DdzPlayTypeDefine = void 0;
var DdzPokerCheck_1 = require("./DdzPokerCheck");
var DdzTypeCheck_1 = require("./DdzTypeCheck");
var DdzPokerTypeData_1 = require("./DdzPokerTypeData");
var DdzRecommendPlay_1 = require("./DdzRecommendPlay");
var DdzRuleConst_1 = require("../data/DdzRuleConst");
var DdzDriver_1 = require("../DdzDriver");
var DdzPlayTypeDefine;
(function (DdzPlayTypeDefine) {
    DdzPlayTypeDefine[DdzPlayTypeDefine["DDZ_NONE"] = 0] = "DDZ_NONE";
    DdzPlayTypeDefine[DdzPlayTypeDefine["DDZ_SINGLE"] = 1] = "DDZ_SINGLE";
    DdzPlayTypeDefine[DdzPlayTypeDefine["DDZ_PAIR"] = 2] = "DDZ_PAIR";
    DdzPlayTypeDefine[DdzPlayTypeDefine["DDZ_THREE_ZERO"] = 3] = "DDZ_THREE_ZERO";
    DdzPlayTypeDefine[DdzPlayTypeDefine["DDZ_THREE_ONE"] = 4] = "DDZ_THREE_ONE";
    DdzPlayTypeDefine[DdzPlayTypeDefine["DDZ_THREE_TWO"] = 5] = "DDZ_THREE_TWO";
    DdzPlayTypeDefine[DdzPlayTypeDefine["DDZ_STRAIGHT"] = 6] = "DDZ_STRAIGHT";
    DdzPlayTypeDefine[DdzPlayTypeDefine["DDZ_LINK_PAIR"] = 7] = "DDZ_LINK_PAIR";
    DdzPlayTypeDefine[DdzPlayTypeDefine["DDZ_PLANE_ZERO"] = 8] = "DDZ_PLANE_ZERO";
    DdzPlayTypeDefine[DdzPlayTypeDefine["DDZ_PLANE_ONE"] = 9] = "DDZ_PLANE_ONE";
    DdzPlayTypeDefine[DdzPlayTypeDefine["DDZ_PLANE_TWO"] = 10] = "DDZ_PLANE_TWO";
    DdzPlayTypeDefine[DdzPlayTypeDefine["DDZ_FOUR_ONE"] = 11] = "DDZ_FOUR_ONE";
    DdzPlayTypeDefine[DdzPlayTypeDefine["DDZ_FOUR_TWO"] = 12] = "DDZ_FOUR_TWO";
    DdzPlayTypeDefine[DdzPlayTypeDefine["DDZ_BOMB"] = 13] = "DDZ_BOMB";
    DdzPlayTypeDefine[DdzPlayTypeDefine["DDZ_ROCKET"] = 14] = "DDZ_ROCKET";
})(DdzPlayTypeDefine = exports.DdzPlayTypeDefine || (exports.DdzPlayTypeDefine = {}));
var DdzPlayRule = /** @class */ (function () {
    function DdzPlayRule() {
        this.typeCheckHelper = new DdzTypeCheck_1.default();
    }
    /**
     *
     * @param arr
     */
    DdzPlayRule.prototype.getPokersType = function (arr) {
        var tmpArr = this.sortPokerArr(arr);
        var para = this.createTypeData(DdzPlayTypeDefine.DDZ_NONE, 0, 0);
        ;
        var _a = this.typeCheckHelper.computeValueTimes(arr), map = _a[0], maxCount = _a[1], maxNumArr = _a[2];
        switch (tmpArr.length) {
            case 1:
                para = this.checkOnePokers(arr);
                break;
            case 2:
                para = this.checkTwoPokers(arr);
                break;
            case 3:
                if (maxCount == 3)
                    para = this.checkThreeZero(arr, maxCount, maxNumArr);
                else if (maxCount == 1)
                    para = this.checkStraight(arr, maxCount, maxNumArr, map);
                break;
            case 4:
                if (maxCount == 4)
                    para = this.checkBomb(arr, maxCount);
                else if (maxCount == 3)
                    para = this.checkThreeOne(arr, maxCount, maxNumArr);
                else if (maxCount == 2)
                    para = this.checkLinkPairs(arr, maxCount, maxNumArr, map);
                else if (maxCount == 1)
                    para = this.checkStraight(arr, maxCount, maxNumArr, map);
                break;
            case 5:
                if (maxCount == 3)
                    para = this.checkThreeTwo(arr, maxCount, maxNumArr, map);
                else if (maxCount == 1)
                    para = this.checkStraight(arr, maxCount, maxNumArr, map);
                break;
            default:
                if (maxCount == 1)
                    para = this.checkStraight(arr, maxCount, maxNumArr, map);
                else if (maxCount == 2)
                    para = this.checkLinkPairs(arr, maxCount, maxNumArr, map);
                else if (maxCount == 3) {
                    para = this.checkPlaneZero(arr, maxCount, maxNumArr, map);
                    if (para.isDataValid()) {
                        break;
                    }
                    para = this.checkPlaneOne(arr, maxCount, maxNumArr, map);
                    if (para.isDataValid()) {
                        break;
                    }
                    para = this.checkPlaneTwo(arr, maxCount, maxNumArr, map);
                    if (para.isDataValid()) {
                        break;
                    }
                }
                else if (maxCount == 4) {
                    if (arr.length == 6) {
                        para = this.checkBombWithTwo(arr, maxCount, maxNumArr);
                        if (para.isDataValid()) {
                            break;
                        }
                    }
                    if (arr.length == 8) {
                        para = this.checkBombWithPairs(arr, maxCount, maxNumArr, map);
                        if (para.isDataValid()) {
                            break;
                        }
                    }
                    para = this.checkPlaneZero(arr, maxCount, maxNumArr, map);
                    if (para.isDataValid()) {
                        break;
                    }
                    para = this.checkPlaneOne(arr, maxCount, maxNumArr, map);
                    if (para.isDataValid()) {
                        break;
                    }
                    para = this.checkPlaneTwo(arr, maxCount, maxNumArr, map);
                    if (para.isDataValid()) {
                        break;
                    }
                }
        }
        return para;
    };
    DdzPlayRule.prototype.checkOnePokers = function (arr) {
        if (!!this.typeCheckHelper.checkSingle(arr)) {
            var weight = this.typeCheckHelper.checkSingle(arr);
            return this.createTypeData(DdzPlayTypeDefine.DDZ_SINGLE, 1, weight);
        }
        else {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_NONE, 0, 0);
        }
    };
    DdzPlayRule.prototype.checkTwoPokers = function (arr) {
        if (!!this.typeCheckHelper.checkRocket(arr))
            return this.createTypeData(DdzPlayTypeDefine.DDZ_ROCKET, 2, 99);
        else if (!!this.typeCheckHelper.checkPair(arr)) {
            var weight = this.typeCheckHelper.checkPair(arr);
            return this.createTypeData(DdzPlayTypeDefine.DDZ_PAIR, 2, weight);
        }
        else {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_NONE, 0, 0);
        }
    };
    DdzPlayRule.prototype.checkOneShowCount = function (arr, maxCount, maxNumArr, map) {
        if (maxCount == 1 && this.typeCheckHelper.checkContinuity(map, 1) && maxNumArr.length >= 3) {
            return this.checkStraight(arr, maxCount, maxNumArr, map);
        }
        else
            return this.createTypeData(DdzPlayTypeDefine.DDZ_NONE, 0, 0);
    };
    DdzPlayRule.prototype.checkThreeZero = function (arr, maxCount, maxNumArr) {
        var weight = this.typeCheckHelper.checkThreeZero(arr, maxCount, maxNumArr);
        if (!!weight) {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_THREE_ZERO, 1, weight);
        }
        else {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_NONE, 0, 0);
        }
    };
    DdzPlayRule.prototype.checkThreeOne = function (arr, maxCount, maxNumArr) {
        var weight = this.typeCheckHelper.checkThreeOne(arr, maxCount, maxNumArr);
        if (!!weight) {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_THREE_ONE, 1, weight);
        }
        else {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_NONE, 0, 0);
        }
    };
    DdzPlayRule.prototype.checkThreeTwo = function (arr, maxCount, maxNumArr, map) {
        var weight = this.typeCheckHelper.checkThreeTwo(arr, maxCount, maxNumArr, map);
        if (!!weight) {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_THREE_TWO, 1, weight);
        }
        else {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_NONE, 0, 0);
        }
    };
    DdzPlayRule.prototype.checkPlaneZero = function (arr, maxCount, maxNumArr, map) {
        var weight = this.typeCheckHelper.checkPlaneZero(arr, maxCount, maxNumArr, map);
        if (!!weight) {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_PLANE_ZERO, arr.length / 3, weight);
        }
        else {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_NONE, 0, 0);
        }
    };
    DdzPlayRule.prototype.checkPlaneOne = function (arr, maxCount, maxNumArr, map) {
        var weight = this.typeCheckHelper.checkPlaneOne(arr, maxCount, maxNumArr, map);
        if (!!weight) {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_PLANE_ONE, arr.length / 4, weight);
        }
        else {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_NONE, 0, 0);
        }
    };
    DdzPlayRule.prototype.checkPlaneTwo = function (arr, maxCount, maxNumArr, map) {
        var weight = this.typeCheckHelper.checkPlaneTwo(arr, maxCount, maxNumArr, map);
        if (!!weight) {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_PLANE_TWO, arr.length / 5, weight);
        }
        else {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_NONE, 0, 0);
        }
    };
    DdzPlayRule.prototype.checkBomb = function (arr, maxCount) {
        var weight = this.typeCheckHelper.checkBomb(arr, maxCount);
        if (!!weight) {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_BOMB, 4, weight);
        }
        else {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_NONE, 0, 0);
        }
    };
    DdzPlayRule.prototype.checkBombWithTwo = function (arr, maxCount, maxNumArr) {
        var weight = this.typeCheckHelper.checkBombWithSingles(arr, maxCount, maxNumArr);
        if (!!weight) {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_FOUR_ONE, 6, weight);
        }
        else {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_NONE, 0, 0);
        }
    };
    DdzPlayRule.prototype.checkBombWithPairs = function (arr, maxCount, maxNumArr, map) {
        var weight = this.typeCheckHelper.checkBombWithPairs(arr, maxCount, maxNumArr, map);
        if (!!weight) {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_FOUR_TWO, 8, weight);
        }
        else {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_NONE, 0, 0);
        }
    };
    DdzPlayRule.prototype.checkLinkPairs = function (arr, maxCount, maxNumArr, map) {
        var weight = 0;
        if (DdzDriver_1.default.instance.Context.mode == DdzRuleConst_1.DdzMode.Quick)
            weight = this.typeCheckHelper.checkQuickLinkPairs(arr, maxCount, maxNumArr, map);
        else
            weight = this.typeCheckHelper.checkLinkPairs(arr, maxCount, maxNumArr, map);
        if (!!weight) {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_LINK_PAIR, maxNumArr.length, weight);
        }
        else {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_NONE, 0, 0);
        }
    };
    DdzPlayRule.prototype.checkStraight = function (arr, maxCount, maxNumArr, map) {
        var weight = 0;
        if (DdzDriver_1.default.instance.Context.mode == DdzRuleConst_1.DdzMode.Quick)
            weight = this.typeCheckHelper.checkQuickStraight(arr, maxCount, maxNumArr, map);
        else
            weight = this.typeCheckHelper.checkStraight(arr, maxCount, maxNumArr, map);
        if (!!weight) {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_STRAIGHT, maxNumArr.length, weight);
        }
        else {
            return this.createTypeData(DdzPlayTypeDefine.DDZ_NONE, 0, 0);
        }
    };
    DdzPlayRule.prototype.createTypeData = function (type, count, weight) {
        return new DdzPokerTypeData_1.default(type, count, weight);
    };
    DdzPlayRule.prototype.sortPokerArr = function (arr) {
        var tmp = __spreadArrays(arr);
        tmp.sort(function (a, b) {
            var _a = DdzPokerCheck_1.default.getPokerWeight(a), aw = _a[0], ac = _a[1];
            var _b = DdzPokerCheck_1.default.getPokerWeight(b), bw = _b[0], bc = _b[1];
            if (aw == bw)
                return bc - ac;
            else
                return bw - aw;
        });
        return tmp;
    };
    DdzPlayRule.prototype.checkPlayOnRule = function (onData, wantData) {
        var isCan = false;
        if (onData && !Global.Toolkit.isEmptyObject(onData) && onData.isDataValid()) {
            if (onData.type == DdzPlayTypeDefine.DDZ_ROCKET) {
                isCan = false;
            }
            else if (onData.type == DdzPlayTypeDefine.DDZ_BOMB) {
                if (wantData.type == DdzPlayTypeDefine.DDZ_ROCKET)
                    isCan = true;
                else if (wantData.type == DdzPlayTypeDefine.DDZ_BOMB && wantData.weight > onData.weight)
                    isCan = true;
                else
                    isCan = false;
            }
            else {
                if (wantData.type == DdzPlayTypeDefine.DDZ_ROCKET || wantData.type == DdzPlayTypeDefine.DDZ_BOMB)
                    isCan = true;
                else if (wantData.type == onData.type && wantData.count == onData.count && wantData.weight > onData.weight)
                    isCan = true;
                else
                    isCan = false;
            }
        }
        else {
            if (!wantData.isDataValid())
                isCan = false;
            else
                isCan = true;
        }
        return isCan;
    };
    DdzPlayRule.prototype.initRecommendHelper = function (arr, map) {
        if (arr === void 0) { arr = []; }
        // arr = [4,5,6,7,8,41, 37, 20,21,22,23,24, 52,53,54,55,56];
        // map = this.getPokersType([3,4,5,19,20,21,35,36,6,22]);
        // console.warn('initRecommendHelper', JSON.stringify(arr), JSON.stringify(map));
        this.reHelper = new DdzRecommendPlay_1.default(map, this.sortPokerArr(arr));
        this.gen = this.reHelper.getRecommendPlayGen();
    };
    DdzPlayRule.prototype.resetRecommendGen = function () {
        if (this.reHelper)
            this.gen = this.reHelper.getRecommendPlayGen();
    };
    DdzPlayRule.prototype.clearRecommend = function () {
        this.reHelper = null;
        this.gen = null;
    };
    DdzPlayRule.prototype.getOneRecommend = function () {
        if (this.gen) {
            var data = this.gen.next();
            if (!data.done)
                return data.value;
            else
                return !1;
        }
    };
    DdzPlayRule.prototype.checkBigger = function () {
        if (this.gen) {
            var data = this.gen.next();
            if (data.value != -1) {
                this.resetRecommendGen();
                return !0;
            }
            else {
                return !1;
            }
        }
    };
    DdzPlayRule.prototype.searchStraight = function (arr) {
        var limitCount = DdzDriver_1.default.instance.Context.mode == DdzRuleConst_1.DdzMode.Quick ? 3 : 5;
        if (arr.length < limitCount)
            return;
        var typeData = this.getPokersType(arr);
        if (typeData.isDataValid() && (typeData.type == DdzPlayTypeDefine.DDZ_LINK_PAIR || typeData.type == DdzPlayTypeDefine.DDZ_PLANE_ZERO
            || typeData.type == DdzPlayTypeDefine.DDZ_PLANE_ONE || typeData.type == DdzPlayTypeDefine.DDZ_PLANE_TWO))
            return;
        var numMap = this.typeCheckHelper.computeValueTimes(arr)[0];
        var orderNumArr = this.typeCheckHelper.getOrderBiggerNumArr(numMap, 1);
        var maxLen = orderNumArr.length;
        if (maxLen < limitCount)
            return;
        for (var i = maxLen; i >= limitCount; i--) {
            for (var j = orderNumArr.length - 1; j >= 0; j--) {
                if (j < limitCount - 1)
                    break;
                var endValue = Number(orderNumArr[j]);
                var startValue = Number(orderNumArr[j - i + 1]);
                if (startValue != 2 && endValue - startValue == i - 1) { // 找到了 i为长度, startValue 为起点牌面 然后去找牌
                    var tmp = {};
                    for (var m = 0; m < i; m++) {
                        for (var n = 0; n < arr.length; n++) {
                            var rawValue = arr[n];
                            var pokerValue = DdzPokerCheck_1.default.getPokerValue(rawValue)[0];
                            if (pokerValue == startValue + m) {
                                tmp[n] = rawValue;
                                break;
                            }
                        }
                    }
                    return tmp;
                }
            }
        }
        return;
    };
    return DdzPlayRule;
}());
exports.default = DdzPlayRule;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXHRvb2xcXERkelBsYXlSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBNEM7QUFDNUMsK0NBQTBDO0FBQzFDLHVEQUFrRDtBQUNsRCx1REFBa0Q7QUFDbEQscURBQStDO0FBQy9DLDBDQUFxQztBQUVyQyxJQUFZLGlCQWdCWDtBQWhCRCxXQUFZLGlCQUFpQjtJQUN6QixpRUFBa0IsQ0FBQTtJQUNsQixxRUFBa0IsQ0FBQTtJQUNyQixpRUFBa0IsQ0FBQTtJQUNsQiw2RUFBa0IsQ0FBQTtJQUNsQiwyRUFBa0IsQ0FBQTtJQUNsQiwyRUFBa0IsQ0FBQTtJQUNsQix5RUFBa0IsQ0FBQTtJQUNsQiwyRUFBa0IsQ0FBQTtJQUNsQiw2RUFBa0IsQ0FBQTtJQUNsQiwyRUFBa0IsQ0FBQTtJQUNsQiw0RUFBbUIsQ0FBQTtJQUNuQiwwRUFBbUIsQ0FBQTtJQUNuQiwwRUFBbUIsQ0FBQTtJQUNuQixrRUFBbUIsQ0FBQTtJQUNuQixzRUFBbUIsQ0FBQTtBQUNwQixDQUFDLEVBaEJXLGlCQUFpQixHQUFqQix5QkFBaUIsS0FBakIseUJBQWlCLFFBZ0I1QjtBQUVEO0lBS0k7UUFDSSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksc0JBQVksRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFDRDs7O09BR0c7SUFDSSxtQ0FBYSxHQUFwQixVQUFxQixHQUFhO1FBQzlCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQUEsQ0FBQztRQUM5RCxJQUFBLEtBQTZCLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEVBQXZFLEdBQUcsUUFBQSxFQUFFLFFBQVEsUUFBQSxFQUFFLFNBQVMsUUFBK0MsQ0FBQztRQUM3RSxRQUFPLE1BQU0sQ0FBQyxNQUFNLEVBQUM7WUFDakIsS0FBSyxDQUFDO2dCQUNGLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQyxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQyxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksUUFBUSxJQUFJLENBQUM7b0JBQ2IsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztxQkFDcEQsSUFBRyxRQUFRLElBQUksQ0FBQztvQkFDakIsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQzdELE1BQU07WUFDVixLQUFLLENBQUM7Z0JBQ0YsSUFBSSxRQUFRLElBQUksQ0FBQztvQkFDYixJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7cUJBQ3BDLElBQUksUUFBUSxJQUFJLENBQUM7b0JBQ2xCLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7cUJBQ25ELElBQUksUUFBUSxJQUFJLENBQUM7b0JBQ2xCLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3FCQUN6RCxJQUFJLFFBQVEsSUFBSSxDQUFDO29CQUNsQixJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDN0QsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRixJQUFJLFFBQVEsSUFBSSxDQUFDO29CQUNiLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3FCQUN4RCxJQUFJLFFBQVEsSUFBSSxDQUFDO29CQUNsQixJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDN0QsTUFBTTtZQUNWO2dCQUNJLElBQUksUUFBUSxJQUFJLENBQUM7b0JBQ2IsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7cUJBQ3hELElBQUksUUFBUSxJQUFJLENBQUM7b0JBQ2xCLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3FCQUN6RCxJQUFJLFFBQVEsSUFBSSxDQUFDLEVBQUM7b0JBQ25CLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUMxRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBQzt3QkFDbkIsTUFBTTtxQkFDVDtvQkFDRCxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDekQsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUM7d0JBQ25CLE1BQU07cUJBQ1Q7b0JBQ0QsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ3pELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFDO3dCQUNuQixNQUFNO3FCQUNUO2lCQUNKO3FCQUNJLElBQUksUUFBUSxJQUFJLENBQUMsRUFBQztvQkFDbkIsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBQzt3QkFDaEIsSUFBSSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO3dCQUN2RCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBQzs0QkFDbkIsTUFBTTt5QkFDVDtxQkFDSjtvQkFDRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFDO3dCQUNoQixJQUFJLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUM5RCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBQzs0QkFDbkIsTUFBTTt5QkFDVDtxQkFDSjtvQkFDRCxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDMUQsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUM7d0JBQ25CLE1BQU07cUJBQ1Q7b0JBQ0QsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ3pELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFDO3dCQUNuQixNQUFNO3FCQUNUO29CQUNELElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN6RCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBQzt3QkFDbkIsTUFBTTtxQkFDVDtpQkFDSjtTQUNSO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLG9DQUFjLEdBQXJCLFVBQXNCLEdBQWE7UUFDL0IsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUM7WUFDeEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDdkU7YUFDRztZQUNBLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hFO0lBQ0wsQ0FBQztJQUVNLG9DQUFjLEdBQXJCLFVBQXNCLEdBQWE7UUFDL0IsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO1lBQ3ZDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQy9ELElBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFDO1lBQzFDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3JFO2FBQ0c7WUFDQSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNoRTtJQUNMLENBQUM7SUFFTSx1Q0FBaUIsR0FBeEIsVUFBeUIsR0FBYSxFQUFFLFFBQWdCLEVBQUUsU0FBbUIsRUFBRSxHQUFPO1FBQ2xGLElBQUksUUFBUSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUM7WUFDdkYsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzVEOztZQUVHLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFTSxvQ0FBYyxHQUFyQixVQUFzQixHQUFhLEVBQUUsUUFBZ0IsRUFBRSxTQUFtQjtRQUN0RSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBQztZQUNULE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzNFO2FBQ0c7WUFDQSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNoRTtJQUNMLENBQUM7SUFFTSxtQ0FBYSxHQUFwQixVQUFxQixHQUFhLEVBQUUsUUFBZ0IsRUFBRSxTQUFtQjtRQUNyRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBQztZQUNULE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzFFO2FBQ0c7WUFDQSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNoRTtJQUNMLENBQUM7SUFFTSxtQ0FBYSxHQUFwQixVQUFxQixHQUFhLEVBQUUsUUFBZ0IsRUFBRSxTQUFtQixFQUFFLEdBQU87UUFDOUUsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFDO1lBQ1QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDMUU7YUFDRztZQUNBLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hFO0lBQ0wsQ0FBQztJQUVNLG9DQUFjLEdBQXJCLFVBQXNCLEdBQWEsRUFBRSxRQUFnQixFQUFFLFNBQW1CLEVBQUUsR0FBTztRQUMvRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUM7WUFDVCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3hGO2FBQ0c7WUFDQSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNoRTtJQUNMLENBQUM7SUFFTSxtQ0FBYSxHQUFwQixVQUFxQixHQUFhLEVBQUUsUUFBZ0IsRUFBRSxTQUFtQixFQUFFLEdBQU87UUFDOUUsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFDO1lBQ1QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN2RjthQUNHO1lBQ0EsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDaEU7SUFDTCxDQUFDO0lBRU0sbUNBQWEsR0FBcEIsVUFBcUIsR0FBYSxFQUFFLFFBQWdCLEVBQUUsU0FBbUIsRUFBRSxHQUFPO1FBQzlFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBQztZQUNULE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDdkY7YUFDRztZQUNBLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hFO0lBQ0wsQ0FBQztJQUVNLCtCQUFTLEdBQWhCLFVBQWlCLEdBQWEsRUFBRSxRQUFnQjtRQUM1QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFDO1lBQ1QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDckU7YUFDRztZQUNBLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hFO0lBQ0wsQ0FBQztJQUVNLHNDQUFnQixHQUF2QixVQUF3QixHQUFhLEVBQUUsUUFBZ0IsRUFBRSxTQUFtQjtRQUN4RSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFDO1lBQ1QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDekU7YUFDRztZQUNBLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hFO0lBQ0wsQ0FBQztJQUVNLHdDQUFrQixHQUF6QixVQUEwQixHQUFhLEVBQUUsUUFBZ0IsRUFBRSxTQUFtQixFQUFFLEdBQU87UUFDbkYsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUM7WUFDVCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN6RTthQUNHO1lBQ0EsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDaEU7SUFDTCxDQUFDO0lBRU0sb0NBQWMsR0FBckIsVUFBc0IsR0FBYSxFQUFFLFFBQWdCLEVBQUUsU0FBbUIsRUFBRSxHQUFPO1FBQy9FLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksbUJBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxzQkFBTyxDQUFDLEtBQUs7WUFDaEQsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7O1lBRWpGLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUM7WUFDVCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDekY7YUFDRztZQUNBLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hFO0lBQ0wsQ0FBQztJQUVNLG1DQUFhLEdBQXBCLFVBQXFCLEdBQWEsRUFBRSxRQUFnQixFQUFFLFNBQW1CLEVBQUUsR0FBTztRQUM5RSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLG1CQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksc0JBQU8sQ0FBQyxLQUFLO1lBQ2hELE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDOztZQUVoRixNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFDO1lBQ1QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3hGO2FBQ0c7WUFDQSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNoRTtJQUNMLENBQUM7SUFFTSxvQ0FBYyxHQUFyQixVQUFzQixJQUFZLEVBQUUsS0FBYSxFQUFFLE1BQWM7UUFDN0QsT0FBTyxJQUFJLDBCQUFnQixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLGtDQUFZLEdBQW5CLFVBQW9CLEdBQWE7UUFDN0IsSUFBSSxHQUFHLGtCQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQztZQUNOLElBQUEsS0FBVyx1QkFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBekMsRUFBRSxRQUFBLEVBQUUsRUFBRSxRQUFtQyxDQUFDO1lBQzNDLElBQUEsS0FBVyx1QkFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBekMsRUFBRSxRQUFBLEVBQUUsRUFBRSxRQUFtQyxDQUFDO1lBQy9DLElBQUksRUFBRSxJQUFJLEVBQUU7Z0JBQ1IsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDOztnQkFFZixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUE7UUFDRixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFTSxxQ0FBZSxHQUF0QixVQUF1QixNQUF3QixFQUFFLFFBQTBCO1FBQ3ZFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNsQixJQUFJLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFBQztZQUN4RSxJQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksaUJBQWlCLENBQUMsVUFBVSxFQUFDO2dCQUMzQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2FBQ2pCO2lCQUNJLElBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxpQkFBaUIsQ0FBQyxRQUFRLEVBQUM7Z0JBQzlDLElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxpQkFBaUIsQ0FBQyxVQUFVO29CQUM3QyxLQUFLLEdBQUcsSUFBSSxDQUFDO3FCQUNaLElBQUcsUUFBUSxDQUFDLElBQUksSUFBSSxpQkFBaUIsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTTtvQkFDbEYsS0FBSyxHQUFHLElBQUksQ0FBQzs7b0JBRWIsS0FBSyxHQUFHLEtBQUssQ0FBQzthQUNyQjtpQkFDRztnQkFDQSxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksaUJBQWlCLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksaUJBQWlCLENBQUMsUUFBUTtvQkFDNUYsS0FBSyxHQUFHLElBQUksQ0FBQztxQkFDWixJQUFHLFFBQVEsQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTTtvQkFDckcsS0FBSyxHQUFHLElBQUksQ0FBQzs7b0JBRWIsS0FBSyxHQUFHLEtBQUssQ0FBQzthQUNyQjtTQUNKO2FBQ0c7WUFDQSxJQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRTtnQkFDdEIsS0FBSyxHQUFHLEtBQUssQ0FBQzs7Z0JBRWQsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNwQjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTSx5Q0FBbUIsR0FBMUIsVUFBMkIsR0FBa0IsRUFBRSxHQUFxQjtRQUF6QyxvQkFBQSxFQUFBLFFBQWtCO1FBQ3pDLDREQUE0RDtRQUM1RCx5REFBeUQ7UUFDekQsaUZBQWlGO1FBQ2pGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSwwQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFTSx1Q0FBaUIsR0FBeEI7UUFDSSxJQUFJLElBQUksQ0FBQyxRQUFRO1lBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVNLG9DQUFjLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUVNLHFDQUFlLEdBQXRCO1FBQ0ksSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFDO1lBQ1QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUk7Z0JBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDOztnQkFFbEIsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNqQjtJQUNMLENBQUM7SUFFTSxpQ0FBVyxHQUFsQjtRQUNJLElBQUcsSUFBSSxDQUFDLEdBQUcsRUFBQztZQUNSLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDM0IsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFDO2dCQUNqQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDekIsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUNiO2lCQUNHO2dCQUNBLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDYjtTQUNKO0lBQ0wsQ0FBQztJQUVNLG9DQUFjLEdBQXJCLFVBQXNCLEdBQUc7UUFDckIsSUFBSSxVQUFVLEdBQUcsbUJBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxzQkFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUUsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLFVBQVU7WUFDdkIsT0FBTztRQUNYLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkMsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLGlCQUFpQixDQUFDLGFBQWEsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLGlCQUFpQixDQUFDLGNBQWM7ZUFDN0gsUUFBUSxDQUFDLElBQUksSUFBSSxpQkFBaUIsQ0FBQyxhQUFhLElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxpQkFBaUIsQ0FBQyxhQUFhLENBQUM7WUFDdEcsT0FBTztRQUNSLElBQUEsTUFBTSxHQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQS9DLENBQWdEO1FBQzNELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFDaEMsSUFBSSxNQUFNLEdBQUcsVUFBVTtZQUNuQixPQUFPO1FBQ1gsS0FBSyxJQUFJLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxJQUFJLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBQztZQUN0QyxLQUFJLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFFLENBQUMsSUFBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQ3pDLElBQUksQ0FBQyxHQUFHLFVBQVUsR0FBRyxDQUFDO29CQUNsQixNQUFNO2dCQUNWLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELElBQUksVUFBVSxJQUFJLENBQUMsSUFBSSxRQUFRLEdBQUcsVUFBVSxJQUFJLENBQUMsR0FBRSxDQUFDLEVBQUMsRUFBRyxtQ0FBbUM7b0JBQ3ZGLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztvQkFDYixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDO3dCQUN0QixLQUFJLElBQUksQ0FBQyxHQUFFLENBQUMsRUFBRSxDQUFDLEdBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQzs0QkFDN0IsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNqQixJQUFBLFVBQVUsR0FBSSx1QkFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBekMsQ0FBMEM7NEJBQ3pELElBQUksVUFBVSxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUM7Z0NBQzdCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7Z0NBQ2xCLE1BQU07NkJBQ1Q7eUJBQ0o7cUJBQ0o7b0JBQ0QsT0FBTyxHQUFHLENBQUM7aUJBQ2Q7YUFDSjtTQUNKO1FBQ0QsT0FBTztJQUNYLENBQUM7SUFDTCxrQkFBQztBQUFELENBalhBLEFBaVhDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGR6UG9rZXJDaGVjayBmcm9tIFwiLi9EZHpQb2tlckNoZWNrXCI7XHJcbmltcG9ydCBEZHpUeXBlQ2hlY2sgZnJvbSBcIi4vRGR6VHlwZUNoZWNrXCI7XHJcbmltcG9ydCBEZHpQb2tlclR5cGVEYXRhIGZyb20gXCIuL0RkelBva2VyVHlwZURhdGFcIjtcclxuaW1wb3J0IERkelJlY29tbWVuZFBsYXkgZnJvbSBcIi4vRGR6UmVjb21tZW5kUGxheVwiO1xyXG5pbXBvcnQgeyBEZHpNb2RlIH0gZnJvbSBcIi4uL2RhdGEvRGR6UnVsZUNvbnN0XCI7XHJcbmltcG9ydCBEZHpEcml2ZXIgZnJvbSBcIi4uL0RkekRyaXZlclwiO1xyXG5cclxuZXhwb3J0IGVudW0gRGR6UGxheVR5cGVEZWZpbmV7XHJcbiAgICBERFpfTk9ORSAgICAgICA9IDAsICAgICAvLyDml6DmlYjniYzlnotcclxuICAgIEREWl9TSU5HTEUgICAgID0gMSwgICAgIC8vIOWNleeJjFxyXG5cdEREWl9QQUlSICAgICAgID0gMiwgICAgIC8vIOWvueWtkFxyXG5cdEREWl9USFJFRV9aRVJPID0gMywgICAgIC8vIOS4ieadoVxyXG5cdEREWl9USFJFRV9PTkUgID0gNCwgICAgIC8vIOS4ieW4puS4gFxyXG5cdEREWl9USFJFRV9UV08gID0gNSwgICAgIC8vIOS4ieW4puS6jFxyXG5cdEREWl9TVFJBSUdIVCAgID0gNiwgICAgIC8vIOmhuuWtkDozLDQsNSw2LDcuLi5BLOiHs+WwkTXlvKBcclxuXHRERFpfTElOS19QQUlSICA9IDcsICAgICAvLyDov57lr7k86Iez5bCRNuW8oDozMyw0NCw1NS4uLkFBPlxyXG5cdEREWl9QTEFORV9aRVJPID0gOCwgICAgIC8vIOmjnuacujzoh7PlsJE25bygOjMzMyw0NDQuLi5BQUE+XHJcblx0RERaX1BMQU5FX09ORSAgPSA5LCAgICAgLy8g6aOe5py65bim5Y2V57+F6IaAPOiHs+WwkTjlvKA65pyJ5Yeg5Liq5LiJ6L+e5bCx5pyJ5Yeg5Liq5Y2VPlxyXG5cdEREWl9QTEFORV9UV08gID0gMTAsICAgIC8vIOmjnuacuuW4puWPjOe/heiGgDzoh7PlsJExMOW8oDrmnInlh6DkuKrkuInov57lsLHmnInlh6Dlr7k+XHJcblx0RERaX0ZPVVJfT05FICAgPSAxMSwgICAgLy8g5Zub5bim5Lik5Y2VXHJcblx0RERaX0ZPVVJfVFdPICAgPSAxMiwgICAgLy8g5Zub5bim5Lik5a+5XHJcblx0RERaX0JPTUIgICAgICAgPSAxMywgICAgLy8g54K45by5XHJcblx0RERaX1JPQ0tFVCAgICAgPSAxNCwgICAgLy8g54Gr566tXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERkelBsYXlSdWxle1xyXG4gICAgcHVibGljIHR5cGVDaGVja0hlbHBlcjogRGR6VHlwZUNoZWNrO1xyXG4gICAgcHVibGljIHJlSGVscGVyOiBEZHpSZWNvbW1lbmRQbGF5O1xyXG4gICAgcHJpdmF0ZSBnZW46IEl0ZXJhYmxlSXRlcmF0b3I8YW55PjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMudHlwZUNoZWNrSGVscGVyID0gbmV3IERkelR5cGVDaGVjaygpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBhcnIgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRQb2tlcnNUeXBlKGFycjogbnVtYmVyW10pOiBEZHpQb2tlclR5cGVEYXRhe1xyXG4gICAgICAgIGxldCB0bXBBcnIgPSB0aGlzLnNvcnRQb2tlckFycihhcnIpO1xyXG4gICAgICAgIGxldCBwYXJhID0gdGhpcy5jcmVhdGVUeXBlRGF0YShEZHpQbGF5VHlwZURlZmluZS5ERFpfTk9ORSwgMCwgMCk7O1xyXG4gICAgICAgIGxldCBbbWFwLCBtYXhDb3VudCwgbWF4TnVtQXJyXSA9IHRoaXMudHlwZUNoZWNrSGVscGVyLmNvbXB1dGVWYWx1ZVRpbWVzKGFycik7XHJcbiAgICAgICAgc3dpdGNoKHRtcEFyci5sZW5ndGgpe1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBwYXJhID0gdGhpcy5jaGVja09uZVBva2VycyhhcnIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHBhcmEgPSB0aGlzLmNoZWNrVHdvUG9rZXJzKGFycik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgaWYgKG1heENvdW50ID09IDMpXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYSA9IHRoaXMuY2hlY2tUaHJlZVplcm8oYXJyLCBtYXhDb3VudCwgbWF4TnVtQXJyKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYobWF4Q291bnQgPT0gMSlcclxuICAgICAgICAgICAgICAgICAgICBwYXJhID0gdGhpcy5jaGVja1N0cmFpZ2h0KGFyciwgbWF4Q291bnQsIG1heE51bUFyciwgbWFwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICBpZiAobWF4Q291bnQgPT0gNClcclxuICAgICAgICAgICAgICAgICAgICBwYXJhID0gdGhpcy5jaGVja0JvbWIoYXJyLCBtYXhDb3VudCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChtYXhDb3VudCA9PSAzKVxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmEgPSB0aGlzLmNoZWNrVGhyZWVPbmUoYXJyLCBtYXhDb3VudCwgbWF4TnVtQXJyKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1heENvdW50ID09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYSA9IHRoaXMuY2hlY2tMaW5rUGFpcnMoYXJyLCBtYXhDb3VudCwgbWF4TnVtQXJyLCBtYXApO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobWF4Q291bnQgPT0gMSlcclxuICAgICAgICAgICAgICAgICAgICBwYXJhID0gdGhpcy5jaGVja1N0cmFpZ2h0KGFyciwgbWF4Q291bnQsIG1heE51bUFyciwgbWFwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6IFxyXG4gICAgICAgICAgICAgICAgaWYgKG1heENvdW50ID09IDMpXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYSA9IHRoaXMuY2hlY2tUaHJlZVR3byhhcnIsIG1heENvdW50LCBtYXhOdW1BcnIsIG1hcCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChtYXhDb3VudCA9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmEgPSB0aGlzLmNoZWNrU3RyYWlnaHQoYXJyLCBtYXhDb3VudCwgbWF4TnVtQXJyLCBtYXApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBpZiAobWF4Q291bnQgPT0gMSlcclxuICAgICAgICAgICAgICAgICAgICBwYXJhID0gdGhpcy5jaGVja1N0cmFpZ2h0KGFyciwgbWF4Q291bnQsIG1heE51bUFyciwgbWFwKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1heENvdW50ID09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYSA9IHRoaXMuY2hlY2tMaW5rUGFpcnMoYXJyLCBtYXhDb3VudCwgbWF4TnVtQXJyLCBtYXApO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobWF4Q291bnQgPT0gMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYSA9IHRoaXMuY2hlY2tQbGFuZVplcm8oYXJyLCBtYXhDb3VudCwgbWF4TnVtQXJyLCBtYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhLmlzRGF0YVZhbGlkKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYSA9IHRoaXMuY2hlY2tQbGFuZU9uZShhcnIsIG1heENvdW50LCBtYXhOdW1BcnIsIG1hcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmEuaXNEYXRhVmFsaWQoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBwYXJhID0gdGhpcy5jaGVja1BsYW5lVHdvKGFyciwgbWF4Q291bnQsIG1heE51bUFyciwgbWFwKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYS5pc0RhdGFWYWxpZCgpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobWF4Q291bnQgPT0gNCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyci5sZW5ndGggPT0gNil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmEgPSB0aGlzLmNoZWNrQm9tYldpdGhUd28oYXJyLCBtYXhDb3VudCwgbWF4TnVtQXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmEuaXNEYXRhVmFsaWQoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PSA4KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYSA9IHRoaXMuY2hlY2tCb21iV2l0aFBhaXJzKGFyciwgbWF4Q291bnQsIG1heE51bUFyciwgbWFwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmEuaXNEYXRhVmFsaWQoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBwYXJhID0gdGhpcy5jaGVja1BsYW5lWmVybyhhcnIsIG1heENvdW50LCBtYXhOdW1BcnIsIG1hcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmEuaXNEYXRhVmFsaWQoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBwYXJhID0gdGhpcy5jaGVja1BsYW5lT25lKGFyciwgbWF4Q291bnQsIG1heE51bUFyciwgbWFwKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYS5pc0RhdGFWYWxpZCgpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmEgPSB0aGlzLmNoZWNrUGxhbmVUd28oYXJyLCBtYXhDb3VudCwgbWF4TnVtQXJyLCBtYXApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhLmlzRGF0YVZhbGlkKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYXJhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja09uZVBva2VycyhhcnI6IG51bWJlcltdKXtcclxuICAgICAgICBpZiAoISF0aGlzLnR5cGVDaGVja0hlbHBlci5jaGVja1NpbmdsZShhcnIpKXtcclxuICAgICAgICAgICAgbGV0IHdlaWdodCA9IHRoaXMudHlwZUNoZWNrSGVscGVyLmNoZWNrU2luZ2xlKGFycik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVR5cGVEYXRhKERkelBsYXlUeXBlRGVmaW5lLkREWl9TSU5HTEUsIDEsIHdlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVR5cGVEYXRhKERkelBsYXlUeXBlRGVmaW5lLkREWl9OT05FLCAwLCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrVHdvUG9rZXJzKGFycjogbnVtYmVyW10pe1xyXG4gICAgICAgIGlmICghIXRoaXMudHlwZUNoZWNrSGVscGVyLmNoZWNrUm9ja2V0KGFycikpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVR5cGVEYXRhKERkelBsYXlUeXBlRGVmaW5lLkREWl9ST0NLRVQsIDIsIDk5KTtcclxuICAgICAgICBlbHNlIGlmKCEhdGhpcy50eXBlQ2hlY2tIZWxwZXIuY2hlY2tQYWlyKGFycikpe1xyXG4gICAgICAgICAgICBsZXQgd2VpZ2h0ID0gdGhpcy50eXBlQ2hlY2tIZWxwZXIuY2hlY2tQYWlyKGFycik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVR5cGVEYXRhKERkelBsYXlUeXBlRGVmaW5lLkREWl9QQUlSLCAyLCB3ZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVUeXBlRGF0YShEZHpQbGF5VHlwZURlZmluZS5ERFpfTk9ORSwgMCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja09uZVNob3dDb3VudChhcnI6IG51bWJlcltdLCBtYXhDb3VudDogbnVtYmVyLCBtYXhOdW1BcnI6IG51bWJlcltdLCBtYXA6IHt9KXtcclxuICAgICAgICBpZiAobWF4Q291bnQgPT0gMSAmJiB0aGlzLnR5cGVDaGVja0hlbHBlci5jaGVja0NvbnRpbnVpdHkobWFwLCAxKSAmJiBtYXhOdW1BcnIubGVuZ3RoID49IDMpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGVja1N0cmFpZ2h0KGFyciwgbWF4Q291bnQsIG1heE51bUFyciwgbWFwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVUeXBlRGF0YShEZHpQbGF5VHlwZURlZmluZS5ERFpfTk9ORSwgMCwgMCk7IFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja1RocmVlWmVybyhhcnI6IG51bWJlcltdLCBtYXhDb3VudDogbnVtYmVyLCBtYXhOdW1BcnI6IG51bWJlcltdKXsgXHJcbiAgICAgICAgbGV0IHdlaWdodCA9IHRoaXMudHlwZUNoZWNrSGVscGVyLmNoZWNrVGhyZWVaZXJvKGFyciwgbWF4Q291bnQsIG1heE51bUFycik7XHJcbiAgICAgICAgaWYgKCEhd2VpZ2h0KXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVHlwZURhdGEoRGR6UGxheVR5cGVEZWZpbmUuRERaX1RIUkVFX1pFUk8sIDEsIHdlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVR5cGVEYXRhKERkelBsYXlUeXBlRGVmaW5lLkREWl9OT05FLCAwLCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrVGhyZWVPbmUoYXJyOiBudW1iZXJbXSwgbWF4Q291bnQ6IG51bWJlciwgbWF4TnVtQXJyOiBudW1iZXJbXSl7IFxyXG4gICAgICAgIGxldCB3ZWlnaHQgPSB0aGlzLnR5cGVDaGVja0hlbHBlci5jaGVja1RocmVlT25lKGFyciwgbWF4Q291bnQsIG1heE51bUFycik7XHJcbiAgICAgICAgaWYgKCEhd2VpZ2h0KXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVHlwZURhdGEoRGR6UGxheVR5cGVEZWZpbmUuRERaX1RIUkVFX09ORSwgMSwgd2VpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVHlwZURhdGEoRGR6UGxheVR5cGVEZWZpbmUuRERaX05PTkUsIDAsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tUaHJlZVR3byhhcnI6IG51bWJlcltdLCBtYXhDb3VudDogbnVtYmVyLCBtYXhOdW1BcnI6IG51bWJlcltdLCBtYXA6IHt9KXsgXHJcbiAgICAgICAgbGV0IHdlaWdodCA9IHRoaXMudHlwZUNoZWNrSGVscGVyLmNoZWNrVGhyZWVUd28oYXJyLCBtYXhDb3VudCwgbWF4TnVtQXJyLCBtYXApO1xyXG4gICAgICAgIGlmICghIXdlaWdodCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVR5cGVEYXRhKERkelBsYXlUeXBlRGVmaW5lLkREWl9USFJFRV9UV08sIDEsIHdlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVR5cGVEYXRhKERkelBsYXlUeXBlRGVmaW5lLkREWl9OT05FLCAwLCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrUGxhbmVaZXJvKGFycjogbnVtYmVyW10sIG1heENvdW50OiBudW1iZXIsIG1heE51bUFycjogbnVtYmVyW10sIG1hcDoge30pe1xyXG4gICAgICAgIGxldCB3ZWlnaHQgPSB0aGlzLnR5cGVDaGVja0hlbHBlci5jaGVja1BsYW5lWmVybyhhcnIsIG1heENvdW50LCBtYXhOdW1BcnIsIG1hcCk7XHJcbiAgICAgICAgaWYgKCEhd2VpZ2h0KXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVHlwZURhdGEoRGR6UGxheVR5cGVEZWZpbmUuRERaX1BMQU5FX1pFUk8sIGFyci5sZW5ndGggLyAzLCB3ZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVUeXBlRGF0YShEZHpQbGF5VHlwZURlZmluZS5ERFpfTk9ORSwgMCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja1BsYW5lT25lKGFycjogbnVtYmVyW10sIG1heENvdW50OiBudW1iZXIsIG1heE51bUFycjogbnVtYmVyW10sIG1hcDoge30pe1xyXG4gICAgICAgIGxldCB3ZWlnaHQgPSB0aGlzLnR5cGVDaGVja0hlbHBlci5jaGVja1BsYW5lT25lKGFyciwgbWF4Q291bnQsIG1heE51bUFyciwgbWFwKTtcclxuICAgICAgICBpZiAoISF3ZWlnaHQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVUeXBlRGF0YShEZHpQbGF5VHlwZURlZmluZS5ERFpfUExBTkVfT05FLCBhcnIubGVuZ3RoIC8gNCwgd2VpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVHlwZURhdGEoRGR6UGxheVR5cGVEZWZpbmUuRERaX05PTkUsIDAsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tQbGFuZVR3byhhcnI6IG51bWJlcltdLCBtYXhDb3VudDogbnVtYmVyLCBtYXhOdW1BcnI6IG51bWJlcltdLCBtYXA6IHt9KXtcclxuICAgICAgICBsZXQgd2VpZ2h0ID0gdGhpcy50eXBlQ2hlY2tIZWxwZXIuY2hlY2tQbGFuZVR3byhhcnIsIG1heENvdW50LCBtYXhOdW1BcnIsIG1hcCk7XHJcbiAgICAgICAgaWYgKCEhd2VpZ2h0KXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVHlwZURhdGEoRGR6UGxheVR5cGVEZWZpbmUuRERaX1BMQU5FX1RXTywgYXJyLmxlbmd0aCAvIDUsIHdlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVR5cGVEYXRhKERkelBsYXlUeXBlRGVmaW5lLkREWl9OT05FLCAwLCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrQm9tYihhcnI6IG51bWJlcltdLCBtYXhDb3VudDogbnVtYmVyKXtcclxuICAgICAgICBsZXQgd2VpZ2h0ID0gdGhpcy50eXBlQ2hlY2tIZWxwZXIuY2hlY2tCb21iKGFyciwgbWF4Q291bnQpO1xyXG4gICAgICAgIGlmICghIXdlaWdodCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVR5cGVEYXRhKERkelBsYXlUeXBlRGVmaW5lLkREWl9CT01CLCA0LCB3ZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVUeXBlRGF0YShEZHpQbGF5VHlwZURlZmluZS5ERFpfTk9ORSwgMCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja0JvbWJXaXRoVHdvKGFycjogbnVtYmVyW10sIG1heENvdW50OiBudW1iZXIsIG1heE51bUFycjogbnVtYmVyW10pe1xyXG4gICAgICAgIGxldCB3ZWlnaHQgPSB0aGlzLnR5cGVDaGVja0hlbHBlci5jaGVja0JvbWJXaXRoU2luZ2xlcyhhcnIsIG1heENvdW50LCBtYXhOdW1BcnIpO1xyXG4gICAgICAgIGlmICghIXdlaWdodCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVR5cGVEYXRhKERkelBsYXlUeXBlRGVmaW5lLkREWl9GT1VSX09ORSwgNiwgd2VpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVHlwZURhdGEoRGR6UGxheVR5cGVEZWZpbmUuRERaX05PTkUsIDAsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tCb21iV2l0aFBhaXJzKGFycjogbnVtYmVyW10sIG1heENvdW50OiBudW1iZXIsIG1heE51bUFycjogbnVtYmVyW10sIG1hcDoge30pe1xyXG4gICAgICAgIGxldCB3ZWlnaHQgPSB0aGlzLnR5cGVDaGVja0hlbHBlci5jaGVja0JvbWJXaXRoUGFpcnMoYXJyLCBtYXhDb3VudCwgbWF4TnVtQXJyLCBtYXApO1xyXG4gICAgICAgIGlmICghIXdlaWdodCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVR5cGVEYXRhKERkelBsYXlUeXBlRGVmaW5lLkREWl9GT1VSX1RXTywgOCwgd2VpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVHlwZURhdGEoRGR6UGxheVR5cGVEZWZpbmUuRERaX05PTkUsIDAsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tMaW5rUGFpcnMoYXJyOiBudW1iZXJbXSwgbWF4Q291bnQ6IG51bWJlciwgbWF4TnVtQXJyOiBudW1iZXJbXSwgbWFwOiB7fSl7XHJcbiAgICAgICAgbGV0IHdlaWdodCA9IDA7XHJcbiAgICAgICAgaWYgKERkekRyaXZlci5pbnN0YW5jZS5Db250ZXh0Lm1vZGUgPT0gRGR6TW9kZS5RdWljaylcclxuICAgICAgICAgICAgd2VpZ2h0ID0gdGhpcy50eXBlQ2hlY2tIZWxwZXIuY2hlY2tRdWlja0xpbmtQYWlycyhhcnIsIG1heENvdW50LCBtYXhOdW1BcnIsIG1hcCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB3ZWlnaHQgPSB0aGlzLnR5cGVDaGVja0hlbHBlci5jaGVja0xpbmtQYWlycyhhcnIsIG1heENvdW50LCBtYXhOdW1BcnIsIG1hcCk7XHJcbiAgICAgICAgaWYgKCEhd2VpZ2h0KXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVHlwZURhdGEoRGR6UGxheVR5cGVEZWZpbmUuRERaX0xJTktfUEFJUiwgbWF4TnVtQXJyLmxlbmd0aCwgd2VpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVHlwZURhdGEoRGR6UGxheVR5cGVEZWZpbmUuRERaX05PTkUsIDAsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tTdHJhaWdodChhcnI6IG51bWJlcltdLCBtYXhDb3VudDogbnVtYmVyLCBtYXhOdW1BcnI6IG51bWJlcltdLCBtYXA6IHt9KXtcclxuICAgICAgICBsZXQgd2VpZ2h0ID0gMDtcclxuICAgICAgICBpZiAoRGR6RHJpdmVyLmluc3RhbmNlLkNvbnRleHQubW9kZSA9PSBEZHpNb2RlLlF1aWNrKVxyXG4gICAgICAgICAgICB3ZWlnaHQgPSB0aGlzLnR5cGVDaGVja0hlbHBlci5jaGVja1F1aWNrU3RyYWlnaHQoYXJyLCBtYXhDb3VudCwgbWF4TnVtQXJyLCBtYXApO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgd2VpZ2h0ID0gdGhpcy50eXBlQ2hlY2tIZWxwZXIuY2hlY2tTdHJhaWdodChhcnIsIG1heENvdW50LCBtYXhOdW1BcnIsIG1hcCk7XHJcbiAgICAgICAgaWYgKCEhd2VpZ2h0KXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVHlwZURhdGEoRGR6UGxheVR5cGVEZWZpbmUuRERaX1NUUkFJR0hULCBtYXhOdW1BcnIubGVuZ3RoLCB3ZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVUeXBlRGF0YShEZHpQbGF5VHlwZURlZmluZS5ERFpfTk9ORSwgMCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVUeXBlRGF0YSh0eXBlOiBudW1iZXIsIGNvdW50OiBudW1iZXIsIHdlaWdodDogbnVtYmVyKXtcclxuICAgICAgICByZXR1cm4gbmV3IERkelBva2VyVHlwZURhdGEodHlwZSwgY291bnQsIHdlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNvcnRQb2tlckFycihhcnI6IG51bWJlcltdKXtcclxuICAgICAgICBsZXQgdG1wID0gWy4uLmFycl07XHJcbiAgICAgICAgdG1wLnNvcnQoKGEsIGIpPT57XHJcbiAgICAgICAgICAgIGxldCBbYXcsIGFjXSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJXZWlnaHQoYSk7XHJcbiAgICAgICAgICAgIGxldCBbYncsIGJjXSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJXZWlnaHQoYik7XHJcbiAgICAgICAgICAgIGlmIChhdyA9PSBidylcclxuICAgICAgICAgICAgICAgIHJldHVybiBiYyAtIGFjO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYncgLSBhdztcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiB0bXA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrUGxheU9uUnVsZShvbkRhdGE6IERkelBva2VyVHlwZURhdGEsIHdhbnREYXRhOiBEZHpQb2tlclR5cGVEYXRhKXtcclxuICAgICAgICBsZXQgaXNDYW4gPSBmYWxzZTtcclxuICAgICAgICBpZiAob25EYXRhICYmICFHbG9iYWwuVG9vbGtpdC5pc0VtcHR5T2JqZWN0KG9uRGF0YSkgJiYgb25EYXRhLmlzRGF0YVZhbGlkKCkpe1xyXG4gICAgICAgICAgICBpZihvbkRhdGEudHlwZSA9PSBEZHpQbGF5VHlwZURlZmluZS5ERFpfUk9DS0VUKXtcclxuICAgICAgICAgICAgICAgIGlzQ2FuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihvbkRhdGEudHlwZSA9PSBEZHpQbGF5VHlwZURlZmluZS5ERFpfQk9NQil7XHJcbiAgICAgICAgICAgICAgICBpZiAod2FudERhdGEudHlwZSA9PSBEZHpQbGF5VHlwZURlZmluZS5ERFpfUk9DS0VUKVxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2FuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYod2FudERhdGEudHlwZSA9PSBEZHpQbGF5VHlwZURlZmluZS5ERFpfQk9NQiAmJiB3YW50RGF0YS53ZWlnaHQgPiBvbkRhdGEud2VpZ2h0KVxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2FuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBpc0NhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZiAod2FudERhdGEudHlwZSA9PSBEZHpQbGF5VHlwZURlZmluZS5ERFpfUk9DS0VUIHx8IHdhbnREYXRhLnR5cGUgPT0gRGR6UGxheVR5cGVEZWZpbmUuRERaX0JPTUIpXHJcbiAgICAgICAgICAgICAgICAgICAgaXNDYW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih3YW50RGF0YS50eXBlID09IG9uRGF0YS50eXBlICYmIHdhbnREYXRhLmNvdW50ID09IG9uRGF0YS5jb3VudCAmJiB3YW50RGF0YS53ZWlnaHQgPiBvbkRhdGEud2VpZ2h0KVxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2FuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBpc0NhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKCF3YW50RGF0YS5pc0RhdGFWYWxpZCgpKVxyXG4gICAgICAgICAgICAgICAgaXNDYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgaXNDYW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNDYW47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRSZWNvbW1lbmRIZWxwZXIoYXJyOiBudW1iZXJbXSA9IFtdLCBtYXA6IERkelBva2VyVHlwZURhdGEpe1xyXG4gICAgICAgIC8vIGFyciA9IFs0LDUsNiw3LDgsNDEsIDM3LCAyMCwyMSwyMiwyMywyNCwgNTIsNTMsNTQsNTUsNTZdO1xyXG4gICAgICAgIC8vIG1hcCA9IHRoaXMuZ2V0UG9rZXJzVHlwZShbMyw0LDUsMTksMjAsMjEsMzUsMzYsNiwyMl0pO1xyXG4gICAgICAgIC8vIGNvbnNvbGUud2FybignaW5pdFJlY29tbWVuZEhlbHBlcicsIEpTT04uc3RyaW5naWZ5KGFyciksIEpTT04uc3RyaW5naWZ5KG1hcCkpO1xyXG4gICAgICAgIHRoaXMucmVIZWxwZXIgPSBuZXcgRGR6UmVjb21tZW5kUGxheShtYXAsIHRoaXMuc29ydFBva2VyQXJyKGFycikpO1xyXG4gICAgICAgIHRoaXMuZ2VuID0gdGhpcy5yZUhlbHBlci5nZXRSZWNvbW1lbmRQbGF5R2VuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0UmVjb21tZW5kR2VuKCl7XHJcbiAgICAgICAgaWYgKHRoaXMucmVIZWxwZXIpXHJcbiAgICAgICAgICAgIHRoaXMuZ2VuID0gdGhpcy5yZUhlbHBlci5nZXRSZWNvbW1lbmRQbGF5R2VuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyUmVjb21tZW5kKCl7XHJcbiAgICAgICAgdGhpcy5yZUhlbHBlciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5nZW4gPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRPbmVSZWNvbW1lbmQoKXtcclxuICAgICAgICBpZiAodGhpcy5nZW4pe1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZ2VuLm5leHQoKTtcclxuICAgICAgICAgICAgaWYgKCFkYXRhLmRvbmUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS52YWx1ZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICExO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tCaWdnZXIoKXtcclxuICAgICAgICBpZih0aGlzLmdlbil7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5nZW4ubmV4dCgpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS52YWx1ZSAhPSAtMSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0UmVjb21tZW5kR2VuKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gITA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VhcmNoU3RyYWlnaHQoYXJyKXtcclxuICAgICAgICBsZXQgbGltaXRDb3VudCA9IERkekRyaXZlci5pbnN0YW5jZS5Db250ZXh0Lm1vZGUgPT0gRGR6TW9kZS5RdWljayA/IDMgOiA1O1xyXG4gICAgICAgIGlmIChhcnIubGVuZ3RoIDwgbGltaXRDb3VudClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCB0eXBlRGF0YSA9IHRoaXMuZ2V0UG9rZXJzVHlwZShhcnIpO1xyXG4gICAgICAgIGlmICh0eXBlRGF0YS5pc0RhdGFWYWxpZCgpICYmICh0eXBlRGF0YS50eXBlID09IERkelBsYXlUeXBlRGVmaW5lLkREWl9MSU5LX1BBSVIgfHwgdHlwZURhdGEudHlwZSA9PSBEZHpQbGF5VHlwZURlZmluZS5ERFpfUExBTkVfWkVSTyBcclxuICAgICAgICAgICAgfHwgdHlwZURhdGEudHlwZSA9PSBEZHpQbGF5VHlwZURlZmluZS5ERFpfUExBTkVfT05FIHx8IHR5cGVEYXRhLnR5cGUgPT0gRGR6UGxheVR5cGVEZWZpbmUuRERaX1BMQU5FX1RXTykpXHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBbbnVtTWFwXSA9IHRoaXMudHlwZUNoZWNrSGVscGVyLmNvbXB1dGVWYWx1ZVRpbWVzKGFycik7XHJcbiAgICAgICAgbGV0IG9yZGVyTnVtQXJyID0gdGhpcy50eXBlQ2hlY2tIZWxwZXIuZ2V0T3JkZXJCaWdnZXJOdW1BcnIobnVtTWFwLCAxKTtcclxuICAgICAgICBsZXQgbWF4TGVuID0gb3JkZXJOdW1BcnIubGVuZ3RoO1xyXG4gICAgICAgIGlmIChtYXhMZW4gPCBsaW1pdENvdW50KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IG1heExlbjsgaSA+PSBsaW1pdENvdW50OyBpLS0pe1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSBvcmRlck51bUFyci5sZW5ndGgtMTsgaiA+PTA7IGotLSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoaiA8IGxpbWl0Q291bnQgLSAxKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZFZhbHVlID0gTnVtYmVyKG9yZGVyTnVtQXJyW2pdKTtcclxuICAgICAgICAgICAgICAgIGxldCBzdGFydFZhbHVlID0gTnVtYmVyKG9yZGVyTnVtQXJyW2ogLSBpICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0VmFsdWUgIT0gMiAmJiBlbmRWYWx1ZSAtIHN0YXJ0VmFsdWUgPT0gaSAtMSl7ICAvLyDmib7liLDkuoYgaeS4uumVv+W6piwgc3RhcnRWYWx1ZSDkuLrotbfngrnniYzpnaIg54S25ZCO5Y675om+54mMXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRtcCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgbSA9IDA7IG0gPCBpOyBtKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IG4gPTA7IG48IGFyci5sZW5ndGg7IG4rKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmF3VmFsdWUgPSBhcnJbbl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgW3Bva2VyVmFsdWVdID0gRGR6UG9rZXJDaGVjay5nZXRQb2tlclZhbHVlKHJhd1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb2tlclZhbHVlID09IHN0YXJ0VmFsdWUgKyBtKXsgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcFtuXSA9IHJhd1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0bXA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG59Il19