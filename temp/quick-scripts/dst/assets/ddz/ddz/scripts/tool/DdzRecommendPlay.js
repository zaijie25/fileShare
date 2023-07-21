
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/tool/DdzRecommendPlay.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXHRvb2xcXERkelJlY29tbWVuZFBsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBa0Q7QUFDbEQsK0NBQTBDO0FBQzFDLDZDQUFrRDtBQUNsRCxpREFBNEM7QUFDNUMscURBQStDO0FBQy9DLDBDQUFxQztBQUVyQztJQU1JOzs7O09BSUc7SUFDSCwwQkFBb0IsTUFBd0IsRUFBVSxNQUFxQjtRQUFyQix1QkFBQSxFQUFBLFdBQXFCO1FBQXZELFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQVRuRSxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFRdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLHNCQUFZLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVPLGtDQUFPLEdBQWY7UUFDSyxJQUFJLENBQUMsTUFBTSxHQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUF2RCxDQUF3RDtRQUNwRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRU0sOENBQW1CLEdBQTFCO1FBQ0ksSUFBSSxJQUFJLENBQUMsTUFBTSxZQUFZLDBCQUFnQixFQUFDO1lBQ3hDLHdEQUF3RDtZQUNwRCxJQUFBLEtBQXdCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQTVDLElBQUksUUFBQSxFQUFFLEtBQUssUUFBQSxFQUFFLE1BQU0sUUFBeUIs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QkFDUDtvQkFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUM7d0JBQ1QsSUFBSSxFQUFHLENBQUM7d0JBQ1IsTUFBTTtxQkFDVDtpQkFDSjtnQkFDRCxJQUFJLENBQUMsSUFBSSxHQUFHO29CQUNSLE1BQU07YUFDYjtTQUNKO1FBRUQsSUFBSSxJQUFJLElBQUksS0FBSztZQUNiLE9BQU8sQ0FBQyxDQUFDOztZQUVULE9BQU8sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFDTCx1QkFBQztBQUFELENBaHRCQSxBQWd0QkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZHpQb2tlclR5cGVEYXRhIGZyb20gXCIuL0RkelBva2VyVHlwZURhdGFcIjtcclxuaW1wb3J0IERkelR5cGVDaGVjayBmcm9tIFwiLi9EZHpUeXBlQ2hlY2tcIjtcclxuaW1wb3J0IHsgRGR6UGxheVR5cGVEZWZpbmUgfSBmcm9tIFwiLi9EZHpQbGF5UnVsZVwiO1xyXG5pbXBvcnQgRGR6UG9rZXJDaGVjayBmcm9tIFwiLi9EZHpQb2tlckNoZWNrXCI7XHJcbmltcG9ydCB7IERkek1vZGUgfSBmcm9tIFwiLi4vZGF0YS9EZHpSdWxlQ29uc3RcIjtcclxuaW1wb3J0IERkekRyaXZlciBmcm9tIFwiLi4vRGR6RHJpdmVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZHpSZWNvbW1lbmRQbGF5e1xyXG4gICAgcHVibGljIHR5cGVDaGVja0hlbHBlcjogRGR6VHlwZUNoZWNrO1xyXG4gICAgcHJpdmF0ZSBudW1NYXAgPSB7fTtcclxuICAgIHByaXZhdGUgcm9ja2V0Q2F0Y2ggPSB7fTtcclxuICAgIHByaXZhdGUgYm9tYkNhdGNoQXJyID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmjqjojZDlh7rniYznsbtcclxuICAgICAqIEBwYXJhbSBvbkRhdGEg5b2T5YmN5bey5Ye654mM5Z6L5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gY3VyQXJyIOW9k+WJjeaJi+eJjCDmjpLluo/lkI7nmoRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBvbkRhdGE6IERkelBva2VyVHlwZURhdGEsIHByaXZhdGUgY3VyQXJyOiBudW1iZXJbXSA9IFtdKXtcclxuICAgICAgICB0aGlzLnR5cGVDaGVja0hlbHBlciA9IG5ldyBEZHpUeXBlQ2hlY2soKTtcclxuICAgICAgICB0aGlzLmluaXRNYXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRNYXAoKXtcclxuICAgICAgICBbdGhpcy5udW1NYXBdID0gdGhpcy50eXBlQ2hlY2tIZWxwZXIuY29tcHV0ZVZhbHVlVGltZXModGhpcy5jdXJBcnIpO1xyXG4gICAgICAgIHRoaXMucm9ja2V0Q2F0Y2ggPSB0aGlzLmdldFJvY2tldCgpO1xyXG4gICAgICAgIHRoaXMuYm9tYkNhdGNoQXJyID0gdGhpcy5nZXRCb21iQXJyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFJlY29tbWVuZFBsYXlHZW4oKXtcclxuICAgICAgICBpZiAodGhpcy5vbkRhdGEgaW5zdGFuY2VvZiBEZHpQb2tlclR5cGVEYXRhKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihcIm51bU1hcFwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLm51bU1hcCkpO1xyXG4gICAgICAgICAgICBsZXQgW3R5cGUsIGNvdW50LCB3ZWlnaHRdID0gdGhpcy5vbkRhdGEuZ2V0RGF0YSgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSBEZHpQbGF5VHlwZURlZmluZS5ERFpfU0lOR0xFKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVNpbmdsZUdlbih3ZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodHlwZSA9PSBEZHpQbGF5VHlwZURlZmluZS5ERFpfUEFJUil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVQYWlyR2VuKHdlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0eXBlID09IERkelBsYXlUeXBlRGVmaW5lLkREWl9USFJFRV9aRVJPKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVRocmVlWmVyb0dlbih3ZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodHlwZSA9PSBEZHpQbGF5VHlwZURlZmluZS5ERFpfVEhSRUVfT05FKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVRocmVlT25lR2VuKHdlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0eXBlID09IERkelBsYXlUeXBlRGVmaW5lLkREWl9USFJFRV9UV08pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVGhyZWVUd29HZW4od2VpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHR5cGUgPT0gRGR6UGxheVR5cGVEZWZpbmUuRERaX1NUUkFJR0hUKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVN0cmFpZ2h0R2VuKHdlaWdodCwgY291bnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodHlwZSA9PSBEZHpQbGF5VHlwZURlZmluZS5ERFpfTElOS19QQUlSKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUxpbmtQYWlyR2VuKHdlaWdodCwgY291bnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodHlwZSA9PSBEZHpQbGF5VHlwZURlZmluZS5ERFpfUExBTkVfWkVSTyl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVQbGFuZVplcm9HZW4od2VpZ2h0LCBjb3VudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0eXBlID09IERkelBsYXlUeXBlRGVmaW5lLkREWl9QTEFORV9PTkUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlUGxhbmVPbmVHZW4od2VpZ2h0LCBjb3VudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0eXBlID09IERkelBsYXlUeXBlRGVmaW5lLkREWl9QTEFORV9UV08pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlUGxhbmVUd29HZW4od2VpZ2h0LCBjb3VudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0eXBlID09IERkelBsYXlUeXBlRGVmaW5lLkREWl9GT1VSX09ORSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVGb3VyT25lR2VuKHdlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0eXBlID09IERkelBsYXlUeXBlRGVmaW5lLkREWl9GT1VSX1RXTyl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVGb3VyVHdvR2VuKHdlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0eXBlID09IERkelBsYXlUeXBlRGVmaW5lLkREWl9CT01CKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUJvbWJHZW4od2VpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHR5cGUgPT0gRGR6UGxheVR5cGVEZWZpbmUuRERaX1JPQ0tFVCl7XHJcbiAgICAgICAgICAgICAgICAvLyDnjovngrjopoHkuI3otbdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlID09IERkelBsYXlUeXBlRGVmaW5lLkREWl9OT05FKXtcclxuICAgICAgICAgICAgICAgIC8vIOW8guW4uOaDheWGtVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign5YmN572u5Ye654mM5byC5bi477yBJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvLyDkuLvliqjlh7rniYzmj5DnpLrnrZbliJLkuI3pnIDopoFcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICogY3JlYXRlU2luZ2xlR2VuKHdlaWdodDogbnVtYmVyKXtcclxuICAgICAgICBsZXQgYmlnZ2VyT3JkZXJOdW1BcnIgPSB0aGlzLnR5cGVDaGVja0hlbHBlci5nZXRPcmRlckJpZ2dlck51bUFyckJ5Q291bnQodGhpcy5udW1NYXAsIDEpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPCBiaWdnZXJPcmRlck51bUFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGJpZ2dlck9yZGVyTnVtQXJyW2ldO1xyXG4gICAgICAgICAgICBsZXQgW3ddID0gRGR6UG9rZXJDaGVjay5nZXRQb2tlcldlaWdodCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmICh3ID4gd2VpZ2h0KXtcclxuICAgICAgICAgICAgICAgIGxldCB0bXAgPSB7fTtcclxuICAgICAgICAgICAgICAgIGxldCBuID0gMDtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wOyBqPCB0aGlzLmN1ckFyci5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJhd1ZhbHVlID0gdGhpcy5jdXJBcnJbal07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IFtwb2tlclZhbHVlXSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJWYWx1ZShyYXdWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBva2VyVmFsdWUgPT0gdmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBbal0gPSByYXdWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbiArKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4gPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHlpZWxkIHRtcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYm9tYkNhdGNoQXJyICYmIHRoaXMuYm9tYkNhdGNoQXJyLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTwgdGhpcy5ib21iQ2F0Y2hBcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5ib21iQ2F0Y2hBcnJbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnJvY2tldENhdGNoICYmICFHbG9iYWwuVG9vbGtpdC5pc0VtcHR5T2JqZWN0KHRoaXMucm9ja2V0Q2F0Y2gpKXtcclxuICAgICAgICAgICAgeWllbGQgdGhpcy5yb2NrZXRDYXRjaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAqIGNyZWF0ZVBhaXJHZW4od2VpZ2h0OiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBiaWdnZXJPcmRlck51bUFyciA9IHRoaXMudHlwZUNoZWNrSGVscGVyLmdldE9yZGVyQmlnZ2VyTnVtQXJyQnlDb3VudCh0aGlzLm51bU1hcCwgMik7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8IGJpZ2dlck9yZGVyTnVtQXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gYmlnZ2VyT3JkZXJOdW1BcnJbaV07XHJcbiAgICAgICAgICAgIGxldCBbd10gPSBEZHpQb2tlckNoZWNrLmdldFBva2VyV2VpZ2h0KHZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKHcgPiB3ZWlnaHQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRtcCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgbGV0IG4gPSAwO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7IGo8IHRoaXMuY3VyQXJyLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmF3VmFsdWUgPSB0aGlzLmN1ckFycltqXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgW3Bva2VyVmFsdWVdID0gRGR6UG9rZXJDaGVjay5nZXRQb2tlclZhbHVlKHJhd1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9rZXJWYWx1ZSA9PSB2YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcFtqXSA9IHJhd1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuICsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobiA9PSAyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgeWllbGQgdG1wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5ib21iQ2F0Y2hBcnIgJiYgdGhpcy5ib21iQ2F0Y2hBcnIubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPCB0aGlzLmJvbWJDYXRjaEFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLmJvbWJDYXRjaEFycltpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucm9ja2V0Q2F0Y2ggJiYgIUdsb2JhbC5Ub29sa2l0LmlzRW1wdHlPYmplY3QodGhpcy5yb2NrZXRDYXRjaCkpe1xyXG4gICAgICAgICAgICB5aWVsZCB0aGlzLnJvY2tldENhdGNoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICogY3JlYXRlVGhyZWVaZXJvR2VuKHdlaWdodDogbnVtYmVyKXtcclxuICAgICAgICBsZXQgYmlnZ2VyT3JkZXJOdW1BcnIgPSB0aGlzLnR5cGVDaGVja0hlbHBlci5nZXRPcmRlckJpZ2dlck51bUFyckJ5Q291bnQodGhpcy5udW1NYXAsIDMpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPCBiaWdnZXJPcmRlck51bUFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGJpZ2dlck9yZGVyTnVtQXJyW2ldO1xyXG4gICAgICAgICAgICBsZXQgW3ddID0gRGR6UG9rZXJDaGVjay5nZXRQb2tlcldlaWdodCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmICh3ID4gd2VpZ2h0KXtcclxuICAgICAgICAgICAgICAgIGxldCB0bXAgPSB7fTtcclxuICAgICAgICAgICAgICAgIGxldCBuID0gMDtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wOyBqPCB0aGlzLmN1ckFyci5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJhd1ZhbHVlID0gdGhpcy5jdXJBcnJbal07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IFtwb2tlclZhbHVlXSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJWYWx1ZShyYXdWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBva2VyVmFsdWUgPT0gdmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBbal0gPSByYXdWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbiArKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4gPT0gMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHlpZWxkIHRtcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYm9tYkNhdGNoQXJyICYmIHRoaXMuYm9tYkNhdGNoQXJyLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTwgdGhpcy5ib21iQ2F0Y2hBcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5ib21iQ2F0Y2hBcnJbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnJvY2tldENhdGNoICYmICFHbG9iYWwuVG9vbGtpdC5pc0VtcHR5T2JqZWN0KHRoaXMucm9ja2V0Q2F0Y2gpKXtcclxuICAgICAgICAgICAgeWllbGQgdGhpcy5yb2NrZXRDYXRjaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAqIGNyZWF0ZVRocmVlT25lR2VuKHdlaWdodDogbnVtYmVyKXtcclxuICAgICAgICBsZXQgYmlnZ2VyT3JkZXJOdW1BcnIgPSB0aGlzLnR5cGVDaGVja0hlbHBlci5nZXRPcmRlckJpZ2dlck51bUFyckJ5Q291bnQodGhpcy5udW1NYXAsIDMpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPCBiaWdnZXJPcmRlck51bUFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGJpZ2dlck9yZGVyTnVtQXJyW2ldO1xyXG4gICAgICAgICAgICBsZXQgW3ddID0gRGR6UG9rZXJDaGVjay5nZXRQb2tlcldlaWdodCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmICh3ID4gd2VpZ2h0KXtcclxuICAgICAgICAgICAgICAgIGxldCB0bXAgPSB7fTtcclxuICAgICAgICAgICAgICAgIGxldCBuID0gMDtcclxuICAgICAgICAgICAgICAgIGxldCB0bXBNYXAgPSB7fTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wOyBqPCB0aGlzLmN1ckFyci5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJhd1ZhbHVlID0gdGhpcy5jdXJBcnJbal07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IFtwb2tlclZhbHVlXSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJWYWx1ZShyYXdWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBva2VyVmFsdWUgPT0gdmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBbal0gPSByYXdWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wTWFwW3Jhd1ZhbHVlXSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG4gKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuID09IDMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgd2luZ3MgPSB0aGlzLmdldEV4dHJhV2luZygxLCAxLCB0bXBNYXApO1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmdzICYmICFHbG9iYWwuVG9vbGtpdC5pc0VtcHR5T2JqZWN0KHdpbmdzKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBrZXkgaW4gd2luZ3Mpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBba2V5XSA9IHdpbmdzW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHRtcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYm9tYkNhdGNoQXJyICYmIHRoaXMuYm9tYkNhdGNoQXJyLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTwgdGhpcy5ib21iQ2F0Y2hBcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5ib21iQ2F0Y2hBcnJbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnJvY2tldENhdGNoICYmICFHbG9iYWwuVG9vbGtpdC5pc0VtcHR5T2JqZWN0KHRoaXMucm9ja2V0Q2F0Y2gpKXtcclxuICAgICAgICAgICAgeWllbGQgdGhpcy5yb2NrZXRDYXRjaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAqIGNyZWF0ZVRocmVlVHdvR2VuKHdlaWdodDogbnVtYmVyKXtcclxuICAgICAgICBsZXQgYmlnZ2VyT3JkZXJOdW1BcnIgPSB0aGlzLnR5cGVDaGVja0hlbHBlci5nZXRPcmRlckJpZ2dlck51bUFyckJ5Q291bnQodGhpcy5udW1NYXAsIDMpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPCBiaWdnZXJPcmRlck51bUFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGJpZ2dlck9yZGVyTnVtQXJyW2ldO1xyXG4gICAgICAgICAgICBsZXQgW3ddID0gRGR6UG9rZXJDaGVjay5nZXRQb2tlcldlaWdodCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmICh3ID4gd2VpZ2h0KXtcclxuICAgICAgICAgICAgICAgIGxldCB0bXAgPSB7fTtcclxuICAgICAgICAgICAgICAgIGxldCBuID0gMDtcclxuICAgICAgICAgICAgICAgIGxldCB0bXBNYXAgPSB7fTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaj0wOyBqPCB0aGlzLmN1ckFyci5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJhd1ZhbHVlID0gdGhpcy5jdXJBcnJbal07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IFtwb2tlclZhbHVlXSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJWYWx1ZShyYXdWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBva2VyVmFsdWUgPT0gdmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBbal0gPSByYXdWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wTWFwW3Jhd1ZhbHVlXSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG4gKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuID09IDMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgd2luZ3MgPSB0aGlzLmdldEV4dHJhV2luZygyLCAxLCB0bXBNYXApO1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmdzICYmICFHbG9iYWwuVG9vbGtpdC5pc0VtcHR5T2JqZWN0KHdpbmdzKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBrZXkgaW4gd2luZ3Mpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bXBba2V5XSA9IHdpbmdzW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHRtcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYm9tYkNhdGNoQXJyICYmIHRoaXMuYm9tYkNhdGNoQXJyLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTwgdGhpcy5ib21iQ2F0Y2hBcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5ib21iQ2F0Y2hBcnJbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnJvY2tldENhdGNoICYmICFHbG9iYWwuVG9vbGtpdC5pc0VtcHR5T2JqZWN0KHRoaXMucm9ja2V0Q2F0Y2gpKXtcclxuICAgICAgICAgICAgeWllbGQgdGhpcy5yb2NrZXRDYXRjaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAqIGNyZWF0ZVN0cmFpZ2h0R2VuKHdlaWdodDogbnVtYmVyLCBjb3VudDogbnVtYmVyKXtcclxuICAgICAgICBsZXQgbm90VmFsaWQgPSAoRGR6RHJpdmVyLmluc3RhbmNlLkNvbnRleHQubW9kZSA9PSBEZHpNb2RlLk5vcm1hbCAmJiBjb3VudCA8IDUpIHx8IChEZHpEcml2ZXIuaW5zdGFuY2UuQ29udGV4dC5tb2RlID09IERkek1vZGUuUXVpY2sgJiYgY291bnQgPCAzKTtcclxuICAgICAgICBpZihub3RWYWxpZClcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIGxldCBvcmRlck51bUFyciA9IHRoaXMudHlwZUNoZWNrSGVscGVyLmdldE9yZGVyQmlnZ2VyTnVtQXJyKHRoaXMubnVtTWFwLCAxKTtcclxuICAgICAgICBsZXQgc3RhcnRXZWlnaHQgPSB3ZWlnaHQgLSBjb3VudCArIDE7ICAgICAgICAgICAgICAgICAgIC8vIOmhuuWtkOi1t+eCueadg+mHjSAzLTcgIDctNSsxPTMg6Iez5bCR5LuONOW8gOWni+eahOmhuuWtkFxyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPCBvcmRlck51bUFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IG9yZGVyTnVtQXJyW2ldO1xyXG4gICAgICAgICAgICBsZXQgW3N0YXJ0V10gPSBEZHpQb2tlckNoZWNrLmdldFBva2VyV2VpZ2h0KHZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKHN0YXJ0VyA+IHN0YXJ0V2VpZ2h0KXsgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDEt5YWI5om+6LW354K5XHJcbiAgICAgICAgICAgICAgICBsZXQgd2FudEVuZFdlaWdodCA9IHN0YXJ0VyArIGNvdW50IC0gMTtcclxuICAgICAgICAgICAgICAgIGxldCBlbmRWYWx1ZSA9IG9yZGVyTnVtQXJyW2kgKyBjb3VudCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHdhbnRFbmRXZWlnaHQgPD0gMTQgJiYgZW5kVmFsdWUpeyAgICAgICAgICAgLy8gb3JkZXJOdW1BcnLmmK/mjInnhafmnYPph43ljYfluo8g5pWF5Y+v5Lul6L+Z5LmI5Yik5pat6L+e57utXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IFtlbmRXXSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJXZWlnaHQoZW5kVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbmRXID09IHdhbnRFbmRXZWlnaHQpeyAgICAgICAgICAgICAgICAgLy8gMi0t54S25ZCO5om+57uI54K55a2Y5Zyo77yM5bm256Gu5L+d6LW354K55Yiw57uI54K56L+e57utXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0bXAgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBrID0gMDsgayA8IGNvdW50OyBrKyspeyAgICAgICAgIC8vIDMtLS3mnIDlkI7otbfngrnliLDnu4jngrnpl7TnmoTniYxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaiA9MDsgajwgdGhpcy5jdXJBcnIubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByYXdWYWx1ZSA9IHRoaXMuY3VyQXJyW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBbcG9rZXJWYWx1ZV0gPSBEZHpQb2tlckNoZWNrLmdldFBva2VyVmFsdWUocmF3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb2tlclZhbHVlID09IG9yZGVyTnVtQXJyW2kgKyBrXSl7ICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wW2pdID0gcmF3VmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCB0bXA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5ib21iQ2F0Y2hBcnIgJiYgdGhpcy5ib21iQ2F0Y2hBcnIubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPCB0aGlzLmJvbWJDYXRjaEFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLmJvbWJDYXRjaEFycltpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucm9ja2V0Q2F0Y2ggJiYgIUdsb2JhbC5Ub29sa2l0LmlzRW1wdHlPYmplY3QodGhpcy5yb2NrZXRDYXRjaCkpe1xyXG4gICAgICAgICAgICB5aWVsZCB0aGlzLnJvY2tldENhdGNoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICogY3JlYXRlTGlua1BhaXJHZW4od2VpZ2h0OiBudW1iZXIsIGNvdW50OiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBub3RWYWxpZCA9IChEZHpEcml2ZXIuaW5zdGFuY2UuQ29udGV4dC5tb2RlID09IERkek1vZGUuTm9ybWFsICYmIGNvdW50IDwgMykgfHwgKERkekRyaXZlci5pbnN0YW5jZS5Db250ZXh0Lm1vZGUgPT0gRGR6TW9kZS5RdWljayAmJiBjb3VudCA8IDIpO1xyXG4gICAgICAgIGlmKG5vdFZhbGlkKVxyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgbGV0IG9yZGVyTnVtQXJyID0gdGhpcy50eXBlQ2hlY2tIZWxwZXIuZ2V0T3JkZXJCaWdnZXJOdW1BcnIodGhpcy5udW1NYXAsIDIpO1xyXG4gICAgICAgIGxldCBzdGFydFdlaWdodCA9IHdlaWdodCAtIGNvdW50ICsgMTsgICAgICAgICAgICAgICAgICAgLy8g6L+e5a+56Iez5bCRM+S4qiAzLTUgIDUtMysxPTNcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTwgb3JkZXJOdW1BcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBvcmRlck51bUFycltpXTtcclxuICAgICAgICAgICAgbGV0IFtzdGFydFddID0gRGR6UG9rZXJDaGVjay5nZXRQb2tlcldlaWdodCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmIChzdGFydFcgPiBzdGFydFdlaWdodCl7ICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAxLeWFiOaJvui1t+eCuVxyXG4gICAgICAgICAgICAgICAgbGV0IHdhbnRFbmRXZWlnaHQgPSBzdGFydFcgKyBjb3VudCAtIDE7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5kVmFsdWUgPSBvcmRlck51bUFycltpICsgY291bnQgLSAxXTtcclxuICAgICAgICAgICAgICAgIGlmICh3YW50RW5kV2VpZ2h0IDw9IDE0ICYmIGVuZFZhbHVlKXsgICAgICAgICAgIC8vIG9yZGVyTnVtQXJy5piv5oyJ54Wn5p2D6YeN5Y2H5bqPIOaVheWPr+S7pei/meS5iOWIpOaWrei/nue7rVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBbZW5kV10gPSBEZHpQb2tlckNoZWNrLmdldFBva2VyV2VpZ2h0KGVuZFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW5kVyA9PSB3YW50RW5kV2VpZ2h0KXsgICAgICAgICAgICAgICAgIC8vIDItLeeEtuWQjuaJvue7iOeCueWtmOWcqO+8jOW5tuehruS/nei1t+eCueWIsOe7iOeCuei/nue7rVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG1wID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgayA9IDA7IGsgPCBjb3VudDsgaysrKXsgICAgICAgICAvLyAzLS0t5pyA5ZCO6LW354K55Yiw57uI54K56Ze055qE54mMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGogPTA7IGo8IHRoaXMuY3VyQXJyLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmF3VmFsdWUgPSB0aGlzLmN1ckFycltqXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgW3Bva2VyVmFsdWVdID0gRGR6UG9rZXJDaGVjay5nZXRQb2tlclZhbHVlKHJhd1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9rZXJWYWx1ZSA9PSBvcmRlck51bUFycltpICsga10peyAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcFtqXSA9IHJhd1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ID09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIHRtcDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmJvbWJDYXRjaEFyciAmJiB0aGlzLmJvbWJDYXRjaEFyci5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8IHRoaXMuYm9tYkNhdGNoQXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuYm9tYkNhdGNoQXJyW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5yb2NrZXRDYXRjaCAmJiAhR2xvYmFsLlRvb2xraXQuaXNFbXB0eU9iamVjdCh0aGlzLnJvY2tldENhdGNoKSl7XHJcbiAgICAgICAgICAgIHlpZWxkIHRoaXMucm9ja2V0Q2F0Y2g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgKiBjcmVhdGVQbGFuZVplcm9HZW4od2VpZ2h0OiBudW1iZXIsIGNvdW50OiBudW1iZXIpe1xyXG4gICAgICAgIGlmKGNvdW50IDwgMilcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIGxldCBvcmRlck51bUFyciA9IHRoaXMudHlwZUNoZWNrSGVscGVyLmdldE9yZGVyQmlnZ2VyTnVtQXJyKHRoaXMubnVtTWFwLCAzKTtcclxuICAgICAgICBsZXQgc3RhcnRXZWlnaHQgPSB3ZWlnaHQgLSBjb3VudCArIDE7ICAgICAgICAgICAgICAgICAgIC8vIOmjnuacuuiHs+WwkTLkuKogMy00ICA0LTMrMT0zXHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8IG9yZGVyTnVtQXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gb3JkZXJOdW1BcnJbaV07XHJcbiAgICAgICAgICAgIGxldCBbc3RhcnRXXSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJXZWlnaHQodmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAoc3RhcnRXID4gc3RhcnRXZWlnaHQpeyAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMS3lhYjmib7otbfngrlcclxuICAgICAgICAgICAgICAgIGxldCB3YW50RW5kV2VpZ2h0ID0gc3RhcnRXICsgY291bnQgLSAxO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZFZhbHVlID0gb3JkZXJOdW1BcnJbaSArIGNvdW50IC0gMV07XHJcbiAgICAgICAgICAgICAgICBpZiAod2FudEVuZFdlaWdodCA8PSAxNCAmJiBlbmRWYWx1ZSl7ICAgICAgICAgICAvLyBvcmRlck51bUFycuaYr+aMieeFp+adg+mHjeWNh+W6jyDmlYXlj6/ku6Xov5nkuYjliKTmlq3ov57nu61cclxuICAgICAgICAgICAgICAgICAgICBsZXQgW2VuZFddID0gRGR6UG9rZXJDaGVjay5nZXRQb2tlcldlaWdodChlbmRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVuZFcgPT0gd2FudEVuZFdlaWdodCl7ICAgICAgICAgICAgICAgICAvLyAyLS3nhLblkI7mib7nu4jngrnlrZjlnKjvvIzlubbnoa7kv53otbfngrnliLDnu4jngrnov57nu61cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRtcCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGsgPSAwOyBrIDwgY291bnQ7IGsrKyl7ICAgICAgICAgLy8gMy0tLeacgOWQjui1t+eCueWIsOe7iOeCuemXtOeahOeJjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqID0wOyBqPCB0aGlzLmN1ckFyci5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJhd1ZhbHVlID0gdGhpcy5jdXJBcnJbal07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IFtwb2tlclZhbHVlXSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJWYWx1ZShyYXdWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBva2VyVmFsdWUgPT0gb3JkZXJOdW1BcnJbaSArIGtdKXsgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXBbal0gPSByYXdWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodCA9PSAzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCB0bXA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5ib21iQ2F0Y2hBcnIgJiYgdGhpcy5ib21iQ2F0Y2hBcnIubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPCB0aGlzLmJvbWJDYXRjaEFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLmJvbWJDYXRjaEFycltpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucm9ja2V0Q2F0Y2ggJiYgIUdsb2JhbC5Ub29sa2l0LmlzRW1wdHlPYmplY3QodGhpcy5yb2NrZXRDYXRjaCkpe1xyXG4gICAgICAgICAgICB5aWVsZCB0aGlzLnJvY2tldENhdGNoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICogY3JlYXRlUGxhbmVPbmVHZW4od2VpZ2h0OiBudW1iZXIsIGNvdW50OiBudW1iZXIpe1xyXG4gICAgICAgIGlmKGNvdW50IDwgMilcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIGxldCBvcmRlck51bUFyciA9IHRoaXMudHlwZUNoZWNrSGVscGVyLmdldE9yZGVyQmlnZ2VyTnVtQXJyKHRoaXMubnVtTWFwLCAzKTtcclxuICAgICAgICBsZXQgc3RhcnRXZWlnaHQgPSB3ZWlnaHQgLSBjb3VudCArIDE7ICAgICAgICAgICAgICAgICAgIC8vIOmjnuacuuiHs+WwkTLkuKogMy00ICA0LTMrMT0zXHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8IG9yZGVyTnVtQXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gb3JkZXJOdW1BcnJbaV07XHJcbiAgICAgICAgICAgIGxldCBbc3RhcnRXXSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJXZWlnaHQodmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAoc3RhcnRXID4gc3RhcnRXZWlnaHQpeyAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMS3lhYjmib7otbfngrlcclxuICAgICAgICAgICAgICAgIGxldCB3YW50RW5kV2VpZ2h0ID0gc3RhcnRXICsgY291bnQgLSAxO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZFZhbHVlID0gb3JkZXJOdW1BcnJbaSArIGNvdW50IC0gMV07XHJcbiAgICAgICAgICAgICAgICBpZiAod2FudEVuZFdlaWdodCA8PSAxNCAmJiBlbmRWYWx1ZSl7ICAgICAgICAgICAvLyBvcmRlck51bUFycuaYr+aMieeFp+adg+mHjeWNh+W6jyDmlYXlj6/ku6Xov5nkuYjliKTmlq3ov57nu61cclxuICAgICAgICAgICAgICAgICAgICBsZXQgW2VuZFddID0gRGR6UG9rZXJDaGVjay5nZXRQb2tlcldlaWdodChlbmRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVuZFcgPT0gd2FudEVuZFdlaWdodCl7ICAgICAgICAgICAgICAgICAvLyAyLS3nhLblkI7mib7nu4jngrnlrZjlnKjvvIzlubbnoa7kv53otbfngrnliLDnu4jngrnov57nu61cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRtcCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG1wTWFwID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgayA9IDA7IGsgPCBjb3VudDsgaysrKXsgICAgICAgICAvLyAzLS0t5pyA5ZCO6LW354K55Yiw57uI54K56Ze055qE54mMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGogPTA7IGo8IHRoaXMuY3VyQXJyLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmF3VmFsdWUgPSB0aGlzLmN1ckFycltqXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgW3Bva2VyVmFsdWVdID0gRGR6UG9rZXJDaGVjay5nZXRQb2tlclZhbHVlKHJhd1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9rZXJWYWx1ZSA9PSBvcmRlck51bUFycltpICsga10peyAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcFtqXSA9IHJhd1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXBNYXBbcmF3VmFsdWVdID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodCA9PSAzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2luZ3MgPSB0aGlzLmdldEV4dHJhV2luZygxLCBjb3VudCwgdG1wTWFwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmdzICYmICFHbG9iYWwuVG9vbGtpdC5pc0VtcHR5T2JqZWN0KHdpbmdzKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGtleSBpbiB3aW5ncyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wW2tleV0gPSB3aW5nc1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeWllbGQgdG1wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5ib21iQ2F0Y2hBcnIgJiYgdGhpcy5ib21iQ2F0Y2hBcnIubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPCB0aGlzLmJvbWJDYXRjaEFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLmJvbWJDYXRjaEFycltpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucm9ja2V0Q2F0Y2ggJiYgIUdsb2JhbC5Ub29sa2l0LmlzRW1wdHlPYmplY3QodGhpcy5yb2NrZXRDYXRjaCkpe1xyXG4gICAgICAgICAgICB5aWVsZCB0aGlzLnJvY2tldENhdGNoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICogY3JlYXRlUGxhbmVUd29HZW4od2VpZ2h0OiBudW1iZXIsIGNvdW50OiBudW1iZXIpe1xyXG4gICAgICAgIGlmKGNvdW50IDwgMilcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIGxldCBvcmRlck51bUFyciA9IHRoaXMudHlwZUNoZWNrSGVscGVyLmdldE9yZGVyQmlnZ2VyTnVtQXJyKHRoaXMubnVtTWFwLCAzKTtcclxuICAgICAgICBsZXQgc3RhcnRXZWlnaHQgPSB3ZWlnaHQgLSBjb3VudCArIDE7ICAgICAgICAgICAgICAgICAgIC8vIOmjnuacuuiHs+WwkTLkuKogMy00ICA0LTMrMT0zXHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8IG9yZGVyTnVtQXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gb3JkZXJOdW1BcnJbaV07XHJcbiAgICAgICAgICAgIGxldCBbc3RhcnRXXSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJXZWlnaHQodmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAoc3RhcnRXID4gc3RhcnRXZWlnaHQpeyAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMS3lhYjmib7otbfngrlcclxuICAgICAgICAgICAgICAgIGxldCB3YW50RW5kV2VpZ2h0ID0gc3RhcnRXICsgY291bnQgLSAxO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZFZhbHVlID0gb3JkZXJOdW1BcnJbaSArIGNvdW50IC0gMV07XHJcbiAgICAgICAgICAgICAgICBpZiAod2FudEVuZFdlaWdodCA8PSAxNCAmJiBlbmRWYWx1ZSl7ICAgICAgICAgICAvLyBvcmRlck51bUFycuaYr+aMieeFp+adg+mHjeWNh+W6jyDmlYXlj6/ku6Xov5nkuYjliKTmlq3ov57nu61cclxuICAgICAgICAgICAgICAgICAgICBsZXQgW2VuZFddID0gRGR6UG9rZXJDaGVjay5nZXRQb2tlcldlaWdodChlbmRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVuZFcgPT0gd2FudEVuZFdlaWdodCl7ICAgICAgICAgICAgICAgICAvLyAyLS3nhLblkI7mib7nu4jngrnlrZjlnKjvvIzlubbnoa7kv53otbfngrnliLDnu4jngrnov57nu61cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRtcCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG1wTWFwID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgayA9IDA7IGsgPCBjb3VudDsgaysrKXsgICAgICAgICAvLyAzLS0t5pyA5ZCO6LW354K55Yiw57uI54K56Ze055qE54mMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGogPTA7IGo8IHRoaXMuY3VyQXJyLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmF3VmFsdWUgPSB0aGlzLmN1ckFycltqXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgW3Bva2VyVmFsdWVdID0gRGR6UG9rZXJDaGVjay5nZXRQb2tlclZhbHVlKHJhd1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9rZXJWYWx1ZSA9PSBvcmRlck51bUFycltpICsga10peyAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcFtqXSA9IHJhd1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXBNYXBbcmF3VmFsdWVdID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodCA9PSAzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2luZ3MgPSB0aGlzLmdldEV4dHJhV2luZygyLCBjb3VudCwgdG1wTWFwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmdzICYmICFHbG9iYWwuVG9vbGtpdC5pc0VtcHR5T2JqZWN0KHdpbmdzKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGtleSBpbiB3aW5ncyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wW2tleV0gPSB3aW5nc1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeWllbGQgdG1wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5ib21iQ2F0Y2hBcnIgJiYgdGhpcy5ib21iQ2F0Y2hBcnIubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPCB0aGlzLmJvbWJDYXRjaEFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLmJvbWJDYXRjaEFycltpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucm9ja2V0Q2F0Y2ggJiYgIUdsb2JhbC5Ub29sa2l0LmlzRW1wdHlPYmplY3QodGhpcy5yb2NrZXRDYXRjaCkpe1xyXG4gICAgICAgICAgICB5aWVsZCB0aGlzLnJvY2tldENhdGNoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICogY3JlYXRlRm91ck9uZUdlbih3ZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IGJpZ2dlck9yZGVyTnVtQXJyID0gdGhpcy50eXBlQ2hlY2tIZWxwZXIuZ2V0T3JkZXJCaWdnZXJOdW1BcnJCeUNvdW50KHRoaXMubnVtTWFwLCA0KTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTwgYmlnZ2VyT3JkZXJOdW1BcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBiaWdnZXJPcmRlck51bUFycltpXTtcclxuICAgICAgICAgICAgbGV0IFt3XSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJXZWlnaHQodmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAodyA+IHdlaWdodCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG1wID0ge307XHJcbiAgICAgICAgICAgICAgICBsZXQgbiA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDsgajwgdGhpcy5jdXJBcnIubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByYXdWYWx1ZSA9IHRoaXMuY3VyQXJyW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBbcG9rZXJWYWx1ZV0gPSBEZHpQb2tlckNoZWNrLmdldFBva2VyVmFsdWUocmF3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb2tlclZhbHVlID09IHZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wW2pdID0gcmF3VmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG4gKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuID09IDQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgd2luZ3MgPSB0aGlzLmdldEV4dHJhV2luZygxLCAyLCB7fSk7ICAgICAgICAvLyDkuIDlia/niYzlm5vluKblj6/ku6XkuI3kvKB0bXBNYXBcclxuICAgICAgICAgICAgICAgIGlmICh3aW5ncyAmJiAhR2xvYmFsLlRvb2xraXQuaXNFbXB0eU9iamVjdCh3aW5ncykpe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQga2V5IGluIHdpbmdzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wW2tleV0gPSB3aW5nc1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB5aWVsZCB0bXA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuYm9tYkNhdGNoQXJyICYmIHRoaXMuYm9tYkNhdGNoQXJyLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTwgdGhpcy5ib21iQ2F0Y2hBcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5ib21iQ2F0Y2hBcnJbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnJvY2tldENhdGNoICYmICFHbG9iYWwuVG9vbGtpdC5pc0VtcHR5T2JqZWN0KHRoaXMucm9ja2V0Q2F0Y2gpKXtcclxuICAgICAgICAgICAgeWllbGQgdGhpcy5yb2NrZXRDYXRjaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAqIGNyZWF0ZUZvdXJUd29HZW4od2VpZ2h0OiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBiaWdnZXJPcmRlck51bUFyciA9IHRoaXMudHlwZUNoZWNrSGVscGVyLmdldE9yZGVyQmlnZ2VyTnVtQXJyQnlDb3VudCh0aGlzLm51bU1hcCwgNCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8IGJpZ2dlck9yZGVyTnVtQXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gYmlnZ2VyT3JkZXJOdW1BcnJbaV07XHJcbiAgICAgICAgICAgIGxldCBbd10gPSBEZHpQb2tlckNoZWNrLmdldFBva2VyV2VpZ2h0KHZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKHcgPiB3ZWlnaHQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRtcCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgbGV0IG4gPSAwO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7IGo8IHRoaXMuY3VyQXJyLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmF3VmFsdWUgPSB0aGlzLmN1ckFycltqXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgW3Bva2VyVmFsdWVdID0gRGR6UG9rZXJDaGVjay5nZXRQb2tlclZhbHVlKHJhd1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9rZXJWYWx1ZSA9PSB2YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcFtqXSA9IHJhd1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuICsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobiA9PSA0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHdpbmdzID0gdGhpcy5nZXRFeHRyYVdpbmcoMiwgMiwge30pOyAgICAgICAgLy8g5LiA5Ymv54mM5Zub5bim5Y+v5Lul5LiN5LygdG1wTWFwXHJcbiAgICAgICAgICAgICAgICBpZiAod2luZ3MgJiYgIUdsb2JhbC5Ub29sa2l0LmlzRW1wdHlPYmplY3Qod2luZ3MpKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGtleSBpbiB3aW5ncyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcFtrZXldID0gd2luZ3Nba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgdG1wO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLmJvbWJDYXRjaEFyciAmJiB0aGlzLmJvbWJDYXRjaEFyci5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8IHRoaXMuYm9tYkNhdGNoQXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuYm9tYkNhdGNoQXJyW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5yb2NrZXRDYXRjaCAmJiAhR2xvYmFsLlRvb2xraXQuaXNFbXB0eU9iamVjdCh0aGlzLnJvY2tldENhdGNoKSl7XHJcbiAgICAgICAgICAgIHlpZWxkIHRoaXMucm9ja2V0Q2F0Y2g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljICogY3JlYXRlQm9tYkdlbih3ZWlnaHQ6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IGJpZ2dlck9yZGVyTnVtQXJyID0gdGhpcy50eXBlQ2hlY2tIZWxwZXIuZ2V0T3JkZXJCaWdnZXJOdW1BcnJCeUNvdW50KHRoaXMubnVtTWFwLCA0KTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTwgYmlnZ2VyT3JkZXJOdW1BcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBiaWdnZXJPcmRlck51bUFycltpXTtcclxuICAgICAgICAgICAgbGV0IFt3XSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJXZWlnaHQodmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAodyA+IHdlaWdodCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG1wID0ge307XHJcbiAgICAgICAgICAgICAgICBsZXQgbiA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGo9MDsgajwgdGhpcy5jdXJBcnIubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByYXdWYWx1ZSA9IHRoaXMuY3VyQXJyW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBbcG9rZXJWYWx1ZV0gPSBEZHpQb2tlckNoZWNrLmdldFBva2VyVmFsdWUocmF3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb2tlclZhbHVlID09IHZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wW2pdID0gcmF3VmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG4gKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuID09IDQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB5aWVsZCB0bXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnJvY2tldENhdGNoICYmICFHbG9iYWwuVG9vbGtpdC5pc0VtcHR5T2JqZWN0KHRoaXMucm9ja2V0Q2F0Y2gpKXtcclxuICAgICAgICAgICAgeWllbGQgdGhpcy5yb2NrZXRDYXRjaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRSb2NrZXQoKXtcclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIGxldCB0bXAgPSB7fTtcclxuICAgICAgICB0aGlzLmN1ckFyci5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKERkelBva2VyQ2hlY2suY2hlY2tJc0dob3N0KHZhbHVlKSl7XHJcbiAgICAgICAgICAgICAgICB0bXBbaW5kZXhdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb3VudCArKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBoYXNSb2NrZXQgPSBjb3VudCA9PSAyO1xyXG4gICAgICAgIGlmIChoYXNSb2NrZXQpXHJcbiAgICAgICAgICAgIHJldHVybiB0bXA7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4ge307XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEJvbWJBcnIoKXtcclxuICAgICAgICBsZXQgdG1wQXJyID0gW107XHJcbiAgICAgICAgbGV0IGJpZ2dlck9yZGVyTnVtQXJyID0gdGhpcy50eXBlQ2hlY2tIZWxwZXIuZ2V0T3JkZXJCaWdnZXJOdW1BcnJCeUNvdW50KHRoaXMubnVtTWFwLCA0KTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTwgYmlnZ2VyT3JkZXJOdW1BcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBiaWdnZXJPcmRlck51bUFycltpXTtcclxuICAgICAgICAgICAgbGV0IHRtcCA9IHt9O1xyXG4gICAgICAgICAgICBmb3IobGV0IGo9MDsgajwgdGhpcy5jdXJBcnIubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IHJhd1ZhbHVlID0gdGhpcy5jdXJBcnJbal07XHJcbiAgICAgICAgICAgICAgICBsZXQgW3Bva2VyVmFsdWVdID0gRGR6UG9rZXJDaGVjay5nZXRQb2tlclZhbHVlKHJhd1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmIChwb2tlclZhbHVlID09IHZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICB0bXBbal0gPSByYXdWYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0bXBBcnIucHVzaCh0bXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdG1wQXJyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5om+6aOe5py65oiW6ICF54K45by55bim55qE57+F6IaAXHJcbiAgICAgKiBAcGFyYW0gbnVtIOaJvuWNleW8oOi/mOaYr+WvueWtkFxyXG4gICAgICogQHBhcmFtIGNvdW50IOaJvuWHoOS4quWNleW8oOaIluWvueWtkFxyXG4gICAgICogQHBhcmFtIHJvb3RBcnIg5bey57uP6YCJ5Lit55qE54mMXHJcbiAgICAgKiBkZWJ1ZyDlm5vlvKDooqvmi4bmiJAzKzEsIOi/meS4qjHkuI3kvJrmjInljZXniYzkvJjlhYjluKbkuIpcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEV4dHJhV2luZyhudW06IG51bWJlciwgY291bnQ6IG51bWJlciwgcm9vdE1hcDoge30pe1xyXG4gICAgICAgIGlmIChudW0gIT0gMSAmJiBudW0gIT0gMil7XHJcbiAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHIgPSB7fTtcclxuICAgICAgICBsZXQgc2F2ZU1hcCA9IHt9O1xyXG4gICAgICAgIGxldCBuR2V0ID0gMDsgICAgICAgICAgIC8vIOiusOW9leavj+asoeaJvuWIsOeahOasoeaVsCBcclxuICAgICAgICBsZXQgdG1wTnVtTWFwID0gR2xvYmFsLlRvb2xraXQuY29weU9iaih0aGlzLm51bU1hcCk7ICAgICAvLyBudW1NYXDph4zov4fmu6Tmjolyb290TWFwIOino+WGs2RlYnVnXHJcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gcm9vdE1hcCl7XHJcbiAgICAgICAgICAgIGxldCBbdmFsdWVdID0gRGR6UG9rZXJDaGVjay5nZXRQb2tlclZhbHVlKE51bWJlcihrZXkpKTtcclxuICAgICAgICAgICAgaWYgKHRtcE51bU1hcFt2YWx1ZV0pXHJcbiAgICAgICAgICAgICAgICB0bXBOdW1NYXBbdmFsdWVdIC0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYmlnZ2VyT3JkZXJOdW1BcnIgPSB0aGlzLnR5cGVDaGVja0hlbHBlci5nZXRPcmRlckJpZ2dlck51bUFyckJ5Q291bnQodG1wTnVtTWFwLCBudW0pO1xyXG4gICAgICAgIGZvciAobGV0IGs9MDsgazwgY291bnQ7IGsrKyl7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaTwgYmlnZ2VyT3JkZXJOdW1BcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gYmlnZ2VyT3JkZXJOdW1BcnJbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgdCA9IDA7ICAgICAgICAgIC8vIOavj+asoeaJvueahOeJjOaVsOmHj1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBqPTA7IGo8IHRoaXMuY3VyQXJyLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmF3VmFsdWUgPSB0aGlzLmN1ckFycltqXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgW3JlYWxWYWx1ZV0gPSBEZHpQb2tlckNoZWNrLmdldFBva2VyVmFsdWUocmF3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWFsVmFsdWUgPT0gdmFsdWUgJiYgIXNhdmVNYXBbcmF3VmFsdWVdICYmICFyb290TWFwW3Jhd1ZhbHVlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVNYXBbcmF3VmFsdWVdID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcltqXSA9IHJhd1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ID09IG51bSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5HZXQgKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0ID09IG51bSlcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5HZXQgPT0gY291bnQpXHJcbiAgICAgICAgICAgIHJldHVybiByO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG59Il19