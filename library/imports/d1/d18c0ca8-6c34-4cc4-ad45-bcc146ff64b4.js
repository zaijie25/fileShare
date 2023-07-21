"use strict";
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