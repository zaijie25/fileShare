"use strict";
cc._RF.push(module, '49e15rYiI9PWoUIxKxYSbPc', 'DdzRecommendPlay');
// ddz/ddz/scripts/tool/DdzRecommendPlay.ts

"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var DdzPokerTypeData_1 = require("./DdzPokerTypeData");
var DdzTypeCheck_1 = require("./DdzTypeCheck");
var DdzPlayRule_1 = require("./DdzPlayRule");
var DdzPokerCheck_1 = require("./DdzPokerCheck");
var DdzRuleConst_1 = require("../data/DdzRuleConst");
var DdzDriver_1 = require("../DdzDriver");
var DdzRecommendPlay = /** @class */ (function () {
    /**
     * 推荐出牌类
     * @param onData 当前已出牌型数据
     * @param curArr 当前手牌 排序后的
     */
    function DdzRecommendPlay(onData, curArr) {
        if (curArr === void 0) { curArr = []; }
        this.onData = onData;
        this.curArr = curArr;
        this.numMap = {};
        this.rocketCatch = {};
        this.bombCatchArr = [];
        this.typeCheckHelper = new DdzTypeCheck_1.default();
        this.initMap();
    }
    DdzRecommendPlay.prototype.initMap = function () {
        this.numMap = this.typeCheckHelper.computeValueTimes(this.curArr)[0];
        this.rocketCatch = this.getRocket();
        this.bombCatchArr = this.getBombArr();
    };
    DdzRecommendPlay.prototype.getRecommendPlayGen = function () {
        if (this.onData instanceof DdzPokerTypeData_1.default) {
            // console.error("numMap", JSON.stringify(this.numMap));
            var _a = this.onData.getData(), type = _a[0], count = _a[1], weight = _a[2];
            if (type == DdzPlayRule_1.DdzPlayTypeDefine.DDZ_SINGLE) {
                return this.createSingleGen(weight);
            }
            else if (type == DdzPlayRule_1.DdzPlayTypeDefine.DDZ_PAIR) {
                return this.createPairGen(weight);
            }
            else if (type == DdzPlayRule_1.DdzPlayTypeDefine.DDZ_THREE_ZERO) {
                return this.createThreeZeroGen(weight);
            }
            else if (type == DdzPlayRule_1.DdzPlayTypeDefine.DDZ_THREE_ONE) {
                return this.createThreeOneGen(weight);
            }
            else if (type == DdzPlayRule_1.DdzPlayTypeDefine.DDZ_THREE_TWO) {
                return this.createThreeTwoGen(weight);
            }
            else if (type == DdzPlayRule_1.DdzPlayTypeDefine.DDZ_STRAIGHT) {
                return this.createStraightGen(weight, count);
            }
            else if (type == DdzPlayRule_1.DdzPlayTypeDefine.DDZ_LINK_PAIR) {
                return this.createLinkPairGen(weight, count);
            }
            else if (type == DdzPlayRule_1.DdzPlayTypeDefine.DDZ_PLANE_ZERO) {
                return this.createPlaneZeroGen(weight, count);
            }
            else if (type == DdzPlayRule_1.DdzPlayTypeDefine.DDZ_PLANE_ONE) {
                return this.createPlaneOneGen(weight, count);
            }
            else if (type == DdzPlayRule_1.DdzPlayTypeDefine.DDZ_PLANE_TWO) {
                return this.createPlaneTwoGen(weight, count);
            }
            else if (type == DdzPlayRule_1.DdzPlayTypeDefine.DDZ_FOUR_ONE) {
                return this.createFourOneGen(weight);
            }
            else if (type == DdzPlayRule_1.DdzPlayTypeDefine.DDZ_FOUR_TWO) {
                return this.createFourTwoGen(weight);
            }
            else if (type == DdzPlayRule_1.DdzPlayTypeDefine.DDZ_BOMB) {
                return this.createBombGen(weight);
            }
            else if (type == DdzPlayRule_1.DdzPlayTypeDefine.DDZ_ROCKET) {
                // 王炸要不起
            }
            else if (type == DdzPlayRule_1.DdzPlayTypeDefine.DDZ_NONE) {
                // 异常情况
                console.error('前置出牌异常！');
            }
        }
        else {
            // 主动出牌提示策划不需要
        }
    };
    DdzRecommendPlay.prototype.createSingleGen = function (weight) {
        var biggerOrderNumArr, i, value, w, tmp, n, j, rawValue, pokerValue, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    biggerOrderNumArr = this.typeCheckHelper.getOrderBiggerNumArrByCount(this.numMap, 1);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < biggerOrderNumArr.length)) return [3 /*break*/, 4];
                    value = biggerOrderNumArr[i];
                    w = DdzPokerCheck_1.default.getPokerWeight(value)[0];
                    if (!(w > weight)) return [3 /*break*/, 3];
                    tmp = {};
                    n = 0;
                    for (j = 0; j < this.curArr.length; j++) {
                        rawValue = this.curArr[j];
                        pokerValue = DdzPokerCheck_1.default.getPokerValue(rawValue)[0];
                        if (pokerValue == value) {
                            tmp[j] = rawValue;
                            n++;
                        }
                        if (n == 1) {
                            break;
                        }
                    }
                    return [4 /*yield*/, tmp];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (!(this.bombCatchArr && this.bombCatchArr.length > 0)) return [3 /*break*/, 8];
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < this.bombCatchArr.length)) return [3 /*break*/, 8];
                    return [4 /*yield*/, this.bombCatchArr[i]];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8:
                    if (!(this.rocketCatch && !Global.Toolkit.isEmptyObject(this.rocketCatch))) return [3 /*break*/, 10];
                    return [4 /*yield*/, this.rocketCatch];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [2 /*return*/, -1];
            }
        });
    };
    DdzRecommendPlay.prototype.createPairGen = function (weight) {
        var biggerOrderNumArr, i, value, w, tmp, n, j, rawValue, pokerValue, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    biggerOrderNumArr = this.typeCheckHelper.getOrderBiggerNumArrByCount(this.numMap, 2);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < biggerOrderNumArr.length)) return [3 /*break*/, 4];
                    value = biggerOrderNumArr[i];
                    w = DdzPokerCheck_1.default.getPokerWeight(value)[0];
                    if (!(w > weight)) return [3 /*break*/, 3];
                    tmp = {};
                    n = 0;
                    for (j = 0; j < this.curArr.length; j++) {
                        rawValue = this.curArr[j];
                        pokerValue = DdzPokerCheck_1.default.getPokerValue(rawValue)[0];
                        if (pokerValue == value) {
                            tmp[j] = rawValue;
                            n++;
                        }
                        if (n == 2) {
                            break;
                        }
                    }
                    return [4 /*yield*/, tmp];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (!(this.bombCatchArr && this.bombCatchArr.length > 0)) return [3 /*break*/, 8];
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < this.bombCatchArr.length)) return [3 /*break*/, 8];
                    return [4 /*yield*/, this.bombCatchArr[i]];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8:
                    if (!(this.rocketCatch && !Global.Toolkit.isEmptyObject(this.rocketCatch))) return [3 /*break*/, 10];
                    return [4 /*yield*/, this.rocketCatch];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [2 /*return*/, -1];
            }
        });
    };
    DdzRecommendPlay.prototype.createThreeZeroGen = function (weight) {
        var biggerOrderNumArr, i, value, w, tmp, n, j, rawValue, pokerValue, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    biggerOrderNumArr = this.typeCheckHelper.getOrderBiggerNumArrByCount(this.numMap, 3);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < biggerOrderNumArr.length)) return [3 /*break*/, 4];
                    value = biggerOrderNumArr[i];
                    w = DdzPokerCheck_1.default.getPokerWeight(value)[0];
                    if (!(w > weight)) return [3 /*break*/, 3];
                    tmp = {};
                    n = 0;
                    for (j = 0; j < this.curArr.length; j++) {
                        rawValue = this.curArr[j];
                        pokerValue = DdzPokerCheck_1.default.getPokerValue(rawValue)[0];
                        if (pokerValue == value) {
                            tmp[j] = rawValue;
                            n++;
                        }
                        if (n == 3) {
                            break;
                        }
                    }
                    return [4 /*yield*/, tmp];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (!(this.bombCatchArr && this.bombCatchArr.length > 0)) return [3 /*break*/, 8];
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < this.bombCatchArr.length)) return [3 /*break*/, 8];
                    return [4 /*yield*/, this.bombCatchArr[i]];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8:
                    if (!(this.rocketCatch && !Global.Toolkit.isEmptyObject(this.rocketCatch))) return [3 /*break*/, 10];
                    return [4 /*yield*/, this.rocketCatch];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [2 /*return*/, -1];
            }
        });
    };
    DdzRecommendPlay.prototype.createThreeOneGen = function (weight) {
        var biggerOrderNumArr, i, value, w, tmp, n, tmpMap, j, rawValue, pokerValue, wings, key, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    biggerOrderNumArr = this.typeCheckHelper.getOrderBiggerNumArrByCount(this.numMap, 3);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < biggerOrderNumArr.length)) return [3 /*break*/, 4];
                    value = biggerOrderNumArr[i];
                    w = DdzPokerCheck_1.default.getPokerWeight(value)[0];
                    if (!(w > weight)) return [3 /*break*/, 3];
                    tmp = {};
                    n = 0;
                    tmpMap = {};
                    for (j = 0; j < this.curArr.length; j++) {
                        rawValue = this.curArr[j];
                        pokerValue = DdzPokerCheck_1.default.getPokerValue(rawValue)[0];
                        if (pokerValue == value) {
                            tmp[j] = rawValue;
                            tmpMap[rawValue] = 1;
                            n++;
                        }
                        if (n == 3) {
                            break;
                        }
                    }
                    wings = this.getExtraWing(1, 1, tmpMap);
                    if (!(wings && !Global.Toolkit.isEmptyObject(wings))) return [3 /*break*/, 3];
                    for (key in wings) {
                        tmp[key] = wings[key];
                    }
                    return [4 /*yield*/, tmp];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (!(this.bombCatchArr && this.bombCatchArr.length > 0)) return [3 /*break*/, 8];
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < this.bombCatchArr.length)) return [3 /*break*/, 8];
                    return [4 /*yield*/, this.bombCatchArr[i]];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8:
                    if (!(this.rocketCatch && !Global.Toolkit.isEmptyObject(this.rocketCatch))) return [3 /*break*/, 10];
                    return [4 /*yield*/, this.rocketCatch];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [2 /*return*/, -1];
            }
        });
    };
    DdzRecommendPlay.prototype.createThreeTwoGen = function (weight) {
        var biggerOrderNumArr, i, value, w, tmp, n, tmpMap, j, rawValue, pokerValue, wings, key, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    biggerOrderNumArr = this.typeCheckHelper.getOrderBiggerNumArrByCount(this.numMap, 3);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < biggerOrderNumArr.length)) return [3 /*break*/, 4];
                    value = biggerOrderNumArr[i];
                    w = DdzPokerCheck_1.default.getPokerWeight(value)[0];
                    if (!(w > weight)) return [3 /*break*/, 3];
                    tmp = {};
                    n = 0;
                    tmpMap = {};
                    for (j = 0; j < this.curArr.length; j++) {
                        rawValue = this.curArr[j];
                        pokerValue = DdzPokerCheck_1.default.getPokerValue(rawValue)[0];
                        if (pokerValue == value) {
                            tmp[j] = rawValue;
                            tmpMap[rawValue] = 1;
                            n++;
                        }
                        if (n == 3) {
                            break;
                        }
                    }
                    wings = this.getExtraWing(2, 1, tmpMap);
                    if (!(wings && !Global.Toolkit.isEmptyObject(wings))) return [3 /*break*/, 3];
                    for (key in wings) {
                        tmp[key] = wings[key];
                    }
                    return [4 /*yield*/, tmp];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (!(this.bombCatchArr && this.bombCatchArr.length > 0)) return [3 /*break*/, 8];
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < this.bombCatchArr.length)) return [3 /*break*/, 8];
                    return [4 /*yield*/, this.bombCatchArr[i]];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8:
                    if (!(this.rocketCatch && !Global.Toolkit.isEmptyObject(this.rocketCatch))) return [3 /*break*/, 10];
                    return [4 /*yield*/, this.rocketCatch];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [2 /*return*/, -1];
            }
        });
    };
    DdzRecommendPlay.prototype.createStraightGen = function (weight, count) {
        var notValid, orderNumArr, startWeight, i, value, startW, wantEndWeight, endValue, endW, tmp, k, j, rawValue, pokerValue, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    notValid = (DdzDriver_1.default.instance.Context.mode == DdzRuleConst_1.DdzMode.Normal && count < 5) || (DdzDriver_1.default.instance.Context.mode == DdzRuleConst_1.DdzMode.Quick && count < 3);
                    if (notValid)
                        return [2 /*return*/, -1];
                    orderNumArr = this.typeCheckHelper.getOrderBiggerNumArr(this.numMap, 1);
                    startWeight = weight - count + 1;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < orderNumArr.length)) return [3 /*break*/, 4];
                    value = orderNumArr[i];
                    startW = DdzPokerCheck_1.default.getPokerWeight(value)[0];
                    if (!(startW > startWeight)) return [3 /*break*/, 3];
                    wantEndWeight = startW + count - 1;
                    endValue = orderNumArr[i + count - 1];
                    if (!(wantEndWeight <= 14 && endValue)) return [3 /*break*/, 3];
                    endW = DdzPokerCheck_1.default.getPokerWeight(endValue)[0];
                    if (!(endW == wantEndWeight)) return [3 /*break*/, 3];
                    tmp = {};
                    for (k = 0; k < count; k++) { // 3---最后起点到终点间的牌
                        for (j = 0; j < this.curArr.length; j++) {
                            rawValue = this.curArr[j];
                            pokerValue = DdzPokerCheck_1.default.getPokerValue(rawValue)[0];
                            if (pokerValue == orderNumArr[i + k]) {
                                tmp[j] = rawValue;
                                break;
                            }
                        }
                    }
                    return [4 /*yield*/, tmp];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (!(this.bombCatchArr && this.bombCatchArr.length > 0)) return [3 /*break*/, 8];
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < this.bombCatchArr.length)) return [3 /*break*/, 8];
                    return [4 /*yield*/, this.bombCatchArr[i]];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8:
                    if (!(this.rocketCatch && !Global.Toolkit.isEmptyObject(this.rocketCatch))) return [3 /*break*/, 10];
                    return [4 /*yield*/, this.rocketCatch];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [2 /*return*/, -1];
            }
        });
    };
    DdzRecommendPlay.prototype.createLinkPairGen = function (weight, count) {
        var notValid, orderNumArr, startWeight, i, value, startW, wantEndWeight, endValue, endW, tmp, k, t, j, rawValue, pokerValue, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    notValid = (DdzDriver_1.default.instance.Context.mode == DdzRuleConst_1.DdzMode.Normal && count < 3) || (DdzDriver_1.default.instance.Context.mode == DdzRuleConst_1.DdzMode.Quick && count < 2);
                    if (notValid)
                        return [2 /*return*/, -1];
                    orderNumArr = this.typeCheckHelper.getOrderBiggerNumArr(this.numMap, 2);
                    startWeight = weight - count + 1;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < orderNumArr.length)) return [3 /*break*/, 4];
                    value = orderNumArr[i];
                    startW = DdzPokerCheck_1.default.getPokerWeight(value)[0];
                    if (!(startW > startWeight)) return [3 /*break*/, 3];
                    wantEndWeight = startW + count - 1;
                    endValue = orderNumArr[i + count - 1];
                    if (!(wantEndWeight <= 14 && endValue)) return [3 /*break*/, 3];
                    endW = DdzPokerCheck_1.default.getPokerWeight(endValue)[0];
                    if (!(endW == wantEndWeight)) return [3 /*break*/, 3];
                    tmp = {};
                    for (k = 0; k < count; k++) { // 3---最后起点到终点间的牌
                        t = 0;
                        for (j = 0; j < this.curArr.length; j++) {
                            rawValue = this.curArr[j];
                            pokerValue = DdzPokerCheck_1.default.getPokerValue(rawValue)[0];
                            if (pokerValue == orderNumArr[i + k]) {
                                tmp[j] = rawValue;
                                t++;
                            }
                            if (t == 2)
                                break;
                        }
                    }
                    return [4 /*yield*/, tmp];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (!(this.bombCatchArr && this.bombCatchArr.length > 0)) return [3 /*break*/, 8];
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < this.bombCatchArr.length)) return [3 /*break*/, 8];
                    return [4 /*yield*/, this.bombCatchArr[i]];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8:
                    if (!(this.rocketCatch && !Global.Toolkit.isEmptyObject(this.rocketCatch))) return [3 /*break*/, 10];
                    return [4 /*yield*/, this.rocketCatch];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [2 /*return*/, -1];
            }
        });
    };
    DdzRecommendPlay.prototype.createPlaneZeroGen = function (weight, count) {
        var orderNumArr, startWeight, i, value, startW, wantEndWeight, endValue, endW, tmp, k, t, j, rawValue, pokerValue, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (count < 2)
                        return [2 /*return*/, -1];
                    orderNumArr = this.typeCheckHelper.getOrderBiggerNumArr(this.numMap, 3);
                    startWeight = weight - count + 1;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < orderNumArr.length)) return [3 /*break*/, 4];
                    value = orderNumArr[i];
                    startW = DdzPokerCheck_1.default.getPokerWeight(value)[0];
                    if (!(startW > startWeight)) return [3 /*break*/, 3];
                    wantEndWeight = startW + count - 1;
                    endValue = orderNumArr[i + count - 1];
                    if (!(wantEndWeight <= 14 && endValue)) return [3 /*break*/, 3];
                    endW = DdzPokerCheck_1.default.getPokerWeight(endValue)[0];
                    if (!(endW == wantEndWeight)) return [3 /*break*/, 3];
                    tmp = {};
                    for (k = 0; k < count; k++) { // 3---最后起点到终点间的牌
                        t = 0;
                        for (j = 0; j < this.curArr.length; j++) {
                            rawValue = this.curArr[j];
                            pokerValue = DdzPokerCheck_1.default.getPokerValue(rawValue)[0];
                            if (pokerValue == orderNumArr[i + k]) {
                                tmp[j] = rawValue;
                                t++;
                            }
                            if (t == 3)
                                break;
                        }
                    }
                    return [4 /*yield*/, tmp];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (!(this.bombCatchArr && this.bombCatchArr.length > 0)) return [3 /*break*/, 8];
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < this.bombCatchArr.length)) return [3 /*break*/, 8];
                    return [4 /*yield*/, this.bombCatchArr[i]];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8:
                    if (!(this.rocketCatch && !Global.Toolkit.isEmptyObject(this.rocketCatch))) return [3 /*break*/, 10];
                    return [4 /*yield*/, this.rocketCatch];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [2 /*return*/, -1];
            }
        });
    };
    DdzRecommendPlay.prototype.createPlaneOneGen = function (weight, count) {
        var orderNumArr, startWeight, i, value, startW, wantEndWeight, endValue, endW, tmp, tmpMap, k, t, j, rawValue, pokerValue, wings, key, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (count < 2)
                        return [2 /*return*/, -1];
                    orderNumArr = this.typeCheckHelper.getOrderBiggerNumArr(this.numMap, 3);
                    startWeight = weight - count + 1;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < orderNumArr.length)) return [3 /*break*/, 4];
                    value = orderNumArr[i];
                    startW = DdzPokerCheck_1.default.getPokerWeight(value)[0];
                    if (!(startW > startWeight)) return [3 /*break*/, 3];
                    wantEndWeight = startW + count - 1;
                    endValue = orderNumArr[i + count - 1];
                    if (!(wantEndWeight <= 14 && endValue)) return [3 /*break*/, 3];
                    endW = DdzPokerCheck_1.default.getPokerWeight(endValue)[0];
                    if (!(endW == wantEndWeight)) return [3 /*break*/, 3];
                    tmp = {};
                    tmpMap = {};
                    for (k = 0; k < count; k++) { // 3---最后起点到终点间的牌
                        t = 0;
                        for (j = 0; j < this.curArr.length; j++) {
                            rawValue = this.curArr[j];
                            pokerValue = DdzPokerCheck_1.default.getPokerValue(rawValue)[0];
                            if (pokerValue == orderNumArr[i + k]) {
                                tmp[j] = rawValue;
                                tmpMap[rawValue] = 1;
                                t++;
                            }
                            if (t == 3)
                                break;
                        }
                    }
                    wings = this.getExtraWing(1, count, tmpMap);
                    if (!(wings && !Global.Toolkit.isEmptyObject(wings))) return [3 /*break*/, 3];
                    for (key in wings) {
                        tmp[key] = wings[key];
                    }
                    return [4 /*yield*/, tmp];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (!(this.bombCatchArr && this.bombCatchArr.length > 0)) return [3 /*break*/, 8];
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < this.bombCatchArr.length)) return [3 /*break*/, 8];
                    return [4 /*yield*/, this.bombCatchArr[i]];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8:
                    if (!(this.rocketCatch && !Global.Toolkit.isEmptyObject(this.rocketCatch))) return [3 /*break*/, 10];
                    return [4 /*yield*/, this.rocketCatch];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [2 /*return*/, -1];
            }
        });
    };
    DdzRecommendPlay.prototype.createPlaneTwoGen = function (weight, count) {
        var orderNumArr, startWeight, i, value, startW, wantEndWeight, endValue, endW, tmp, tmpMap, k, t, j, rawValue, pokerValue, wings, key, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (count < 2)
                        return [2 /*return*/, -1];
                    orderNumArr = this.typeCheckHelper.getOrderBiggerNumArr(this.numMap, 3);
                    startWeight = weight - count + 1;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < orderNumArr.length)) return [3 /*break*/, 4];
                    value = orderNumArr[i];
                    startW = DdzPokerCheck_1.default.getPokerWeight(value)[0];
                    if (!(startW > startWeight)) return [3 /*break*/, 3];
                    wantEndWeight = startW + count - 1;
                    endValue = orderNumArr[i + count - 1];
                    if (!(wantEndWeight <= 14 && endValue)) return [3 /*break*/, 3];
                    endW = DdzPokerCheck_1.default.getPokerWeight(endValue)[0];
                    if (!(endW == wantEndWeight)) return [3 /*break*/, 3];
                    tmp = {};
                    tmpMap = {};
                    for (k = 0; k < count; k++) { // 3---最后起点到终点间的牌
                        t = 0;
                        for (j = 0; j < this.curArr.length; j++) {
                            rawValue = this.curArr[j];
                            pokerValue = DdzPokerCheck_1.default.getPokerValue(rawValue)[0];
                            if (pokerValue == orderNumArr[i + k]) {
                                tmp[j] = rawValue;
                                tmpMap[rawValue] = 1;
                                t++;
                            }
                            if (t == 3)
                                break;
                        }
                    }
                    wings = this.getExtraWing(2, count, tmpMap);
                    if (!(wings && !Global.Toolkit.isEmptyObject(wings))) return [3 /*break*/, 3];
                    for (key in wings) {
                        tmp[key] = wings[key];
                    }
                    return [4 /*yield*/, tmp];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (!(this.bombCatchArr && this.bombCatchArr.length > 0)) return [3 /*break*/, 8];
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < this.bombCatchArr.length)) return [3 /*break*/, 8];
                    return [4 /*yield*/, this.bombCatchArr[i]];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8:
                    if (!(this.rocketCatch && !Global.Toolkit.isEmptyObject(this.rocketCatch))) return [3 /*break*/, 10];
                    return [4 /*yield*/, this.rocketCatch];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [2 /*return*/, -1];
            }
        });
    };
    DdzRecommendPlay.prototype.createFourOneGen = function (weight) {
        var biggerOrderNumArr, i, value, w, tmp, n, j, rawValue, pokerValue, wings, key, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    biggerOrderNumArr = this.typeCheckHelper.getOrderBiggerNumArrByCount(this.numMap, 4);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < biggerOrderNumArr.length)) return [3 /*break*/, 4];
                    value = biggerOrderNumArr[i];
                    w = DdzPokerCheck_1.default.getPokerWeight(value)[0];
                    if (!(w > weight)) return [3 /*break*/, 3];
                    tmp = {};
                    n = 0;
                    for (j = 0; j < this.curArr.length; j++) {
                        rawValue = this.curArr[j];
                        pokerValue = DdzPokerCheck_1.default.getPokerValue(rawValue)[0];
                        if (pokerValue == value) {
                            tmp[j] = rawValue;
                            n++;
                        }
                        if (n == 4) {
                            break;
                        }
                    }
                    wings = this.getExtraWing(1, 2, {});
                    if (!(wings && !Global.Toolkit.isEmptyObject(wings))) return [3 /*break*/, 3];
                    for (key in wings) {
                        tmp[key] = wings[key];
                    }
                    return [4 /*yield*/, tmp];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (!(this.bombCatchArr && this.bombCatchArr.length > 0)) return [3 /*break*/, 8];
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < this.bombCatchArr.length)) return [3 /*break*/, 8];
                    return [4 /*yield*/, this.bombCatchArr[i]];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8:
                    if (!(this.rocketCatch && !Global.Toolkit.isEmptyObject(this.rocketCatch))) return [3 /*break*/, 10];
                    return [4 /*yield*/, this.rocketCatch];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [2 /*return*/, -1];
            }
        });
    };
    DdzRecommendPlay.prototype.createFourTwoGen = function (weight) {
        var biggerOrderNumArr, i, value, w, tmp, n, j, rawValue, pokerValue, wings, key, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    biggerOrderNumArr = this.typeCheckHelper.getOrderBiggerNumArrByCount(this.numMap, 4);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < biggerOrderNumArr.length)) return [3 /*break*/, 4];
                    value = biggerOrderNumArr[i];
                    w = DdzPokerCheck_1.default.getPokerWeight(value)[0];
                    if (!(w > weight)) return [3 /*break*/, 3];
                    tmp = {};
                    n = 0;
                    for (j = 0; j < this.curArr.length; j++) {
                        rawValue = this.curArr[j];
                        pokerValue = DdzPokerCheck_1.default.getPokerValue(rawValue)[0];
                        if (pokerValue == value) {
                            tmp[j] = rawValue;
                            n++;
                        }
                        if (n == 4) {
                            break;
                        }
                    }
                    wings = this.getExtraWing(2, 2, {});
                    if (!(wings && !Global.Toolkit.isEmptyObject(wings))) return [3 /*break*/, 3];
                    for (key in wings) {
                        tmp[key] = wings[key];
                    }
                    return [4 /*yield*/, tmp];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (!(this.bombCatchArr && this.bombCatchArr.length > 0)) return [3 /*break*/, 8];
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < this.bombCatchArr.length)) return [3 /*break*/, 8];
                    return [4 /*yield*/, this.bombCatchArr[i]];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8:
                    if (!(this.rocketCatch && !Global.Toolkit.isEmptyObject(this.rocketCatch))) return [3 /*break*/, 10];
                    return [4 /*yield*/, this.rocketCatch];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [2 /*return*/, -1];
            }
        });
    };
    DdzRecommendPlay.prototype.createBombGen = function (weight) {
        var biggerOrderNumArr, i, value, w, tmp, n, j, rawValue, pokerValue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    biggerOrderNumArr = this.typeCheckHelper.getOrderBiggerNumArrByCount(this.numMap, 4);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < biggerOrderNumArr.length)) return [3 /*break*/, 4];
                    value = biggerOrderNumArr[i];
                    w = DdzPokerCheck_1.default.getPokerWeight(value)[0];
                    if (!(w > weight)) return [3 /*break*/, 3];
                    tmp = {};
                    n = 0;
                    for (j = 0; j < this.curArr.length; j++) {
                        rawValue = this.curArr[j];
                        pokerValue = DdzPokerCheck_1.default.getPokerValue(rawValue)[0];
                        if (pokerValue == value) {
                            tmp[j] = rawValue;
                            n++;
                        }
                        if (n == 4) {
                            break;
                        }
                    }
                    return [4 /*yield*/, tmp];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (!(this.rocketCatch && !Global.Toolkit.isEmptyObject(this.rocketCatch))) return [3 /*break*/, 6];
                    return [4 /*yield*/, this.rocketCatch];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/, -1];
            }
        });
    };
    DdzRecommendPlay.prototype.getRocket = function () {
        var count = 0;
        var tmp = {};
        this.curArr.forEach(function (value, index) {
            if (DdzPokerCheck_1.default.checkIsGhost(value)) {
                tmp[index] = value;
                count++;
            }
        });
        var hasRocket = count == 2;
        if (hasRocket)
            return tmp;
        else
            return {};
    };
    DdzRecommendPlay.prototype.getBombArr = function () {
        var tmpArr = [];
        var biggerOrderNumArr = this.typeCheckHelper.getOrderBiggerNumArrByCount(this.numMap, 4);
        for (var i = 0; i < biggerOrderNumArr.length; i++) {
            var value = biggerOrderNumArr[i];
            var tmp = {};
            for (var j = 0; j < this.curArr.length; j++) {
                var rawValue = this.curArr[j];
                var pokerValue = DdzPokerCheck_1.default.getPokerValue(rawValue)[0];
                if (pokerValue == value) {
                    tmp[j] = rawValue;
                }
            }
            tmpArr.push(tmp);
        }
        return tmpArr;
    };
    /**
     * 找飞机或者炸弹带的翅膀
     * @param num 找单张还是对子
     * @param count 找几个单张或对子
     * @param rootArr 已经选中的牌
     * debug 四张被拆成3+1, 这个1不会按单牌优先带上
     */
    DdzRecommendPlay.prototype.getExtraWing = function (num, count, rootMap) {
        if (num != 1 && num != 2) {
            return {};
        }
        var r = {};
        var saveMap = {};
        var nGet = 0; // 记录每次找到的次数 
        var tmpNumMap = Global.Toolkit.copyObj(this.numMap); // numMap里过滤掉rootMap 解决debug
        for (var key in rootMap) {
            var value = DdzPokerCheck_1.default.getPokerValue(Number(key))[0];
            if (tmpNumMap[value])
                tmpNumMap[value]--;
        }
        var biggerOrderNumArr = this.typeCheckHelper.getOrderBiggerNumArrByCount(tmpNumMap, num);
        for (var k = 0; k < count; k++) {
            for (var i = 0; i < biggerOrderNumArr.length; i++) {
                var value = biggerOrderNumArr[i];
                var t = 0; // 每次找的牌数量
                for (var j = 0; j < this.curArr.length; j++) {
                    var rawValue = this.curArr[j];
                    var realValue = DdzPokerCheck_1.default.getPokerValue(rawValue)[0];
                    if (realValue == value && !saveMap[rawValue] && !rootMap[rawValue]) {
                        saveMap[rawValue] = 1;
                        r[j] = rawValue;
                        t++;
                    }
                    if (t == num) {
                        nGet++;
                        break;
                    }
                }
                if (t == num)
                    break;
            }
        }
        if (nGet == count)
            return r;
        else
            return {};
    };
    return DdzRecommendPlay;
}());
exports.default = DdzRecommendPlay;

cc._RF.pop();