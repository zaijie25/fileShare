"use strict";
cc._RF.push(module, '67381tp7yZExLrrPYUgw+Vt', 'DdzTypeCheck');
// ddz/ddz/scripts/tool/DdzTypeCheck.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DdzPokerCheck_1 = require("./DdzPokerCheck");
var DdzTypeCheck = /** @class */ (function () {
    function DdzTypeCheck() {
    }
    // 检测单张
    DdzTypeCheck.prototype.checkSingle = function (arr) {
        if (arr.length != 1)
            return 0;
        var w = DdzPokerCheck_1.default.getPokerWeight(arr[0])[0];
        return w;
    };
    // 检测火箭
    DdzTypeCheck.prototype.checkRocket = function (arr) {
        if (DdzPokerCheck_1.default.checkIsGhost(arr[0]) && DdzPokerCheck_1.default.checkIsGhost(arr[1]))
            return 99;
        else
            return 0;
    };
    // 检测对子
    DdzTypeCheck.prototype.checkPair = function (arr) {
        if (arr.length != 2)
            return 0;
        var num0 = DdzPokerCheck_1.default.getPokerValue(arr[0])[0];
        var num1 = DdzPokerCheck_1.default.getPokerValue(arr[1])[0];
        if (num0 == num1) {
            var w = DdzPokerCheck_1.default.getPokerWeight(arr[0])[0];
            return w;
        }
        else {
            return 0;
        }
    };
    // 检测3+0
    DdzTypeCheck.prototype.checkThreeZero = function (arr, maxCount, maxNumArr) {
        if (arr.length != 3 || maxCount != 3)
            return 0;
        if (maxNumArr.length == 1) {
            var w = DdzPokerCheck_1.default.getPokerWeight(maxNumArr[0])[0];
            return w;
        }
        else
            return 0;
    };
    // 检测3+1
    DdzTypeCheck.prototype.checkThreeOne = function (arr, maxCount, maxNumArr) {
        if (arr.length != 4 || maxCount != 3)
            return 0;
        if (maxNumArr.length == 1) {
            var w = DdzPokerCheck_1.default.getPokerWeight(maxNumArr[0])[0];
            return w;
        }
        else
            return 0;
    };
    // 检测3+2
    DdzTypeCheck.prototype.checkThreeTwo = function (arr, maxCount, maxNumArr, map) {
        if (arr.length != 5 || maxCount != 3)
            return 0;
        var pairOrderArr = this.getOrderNumArr(map, 2);
        if (maxNumArr.length == 1 && pairOrderArr.length == 1) {
            var w = DdzPokerCheck_1.default.getPokerWeight(maxNumArr[0])[0];
            return w;
        }
        else
            return 0;
    };
    // 检测飞机不带
    DdzTypeCheck.prototype.checkPlaneZero = function (arr, maxCount, maxNumArr, map) {
        if (arr.length < 6 || arr.length != 3 * maxNumArr.length)
            return 0;
        if (this.checkContinuity(map, 3)) {
            var threeOrderArr = this.getOrderNumArr(map, 3);
            var w = DdzPokerCheck_1.default.getPokerWeight(threeOrderArr[threeOrderArr.length - 1])[0];
            return w;
        }
        else
            return 0;
    };
    // 检测飞机带单
    DdzTypeCheck.prototype.checkPlaneOne = function (arr, maxCount, maxNumArr, map) {
        var total = arr.length;
        if (total >= 8 && total % 4 == 0) {
            var nContinu = arr.length / 4;
            var threeOrderArr = this.getOrderBiggerNumArr(map, 3);
            var lastNum = 0;
            var catchArr = [];
            for (var i = threeOrderArr.length - 1; i >= 0; i--) {
                var value = Number(threeOrderArr[i]);
                lastNum = value;
                catchArr.push(lastNum);
                if (catchArr.length == nContinu) {
                    var big = lastNum + nContinu - 1;
                    var w = DdzPokerCheck_1.default.getPokerWeight(big)[0];
                    return w;
                }
                if (lastNum > 0 && lastNum - Number(threeOrderArr[i - 1]) != 1 || lastNum == 2) {
                    catchArr = [];
                    continue;
                }
            }
        }
        return 0;
    };
    // 检测飞机带对
    DdzTypeCheck.prototype.checkPlaneTwo = function (arr, maxCount, maxNumArr, map) {
        var total = arr.length;
        if (total >= 10 && total % 5 == 0) {
            var nContinu = arr.length / 5;
            var threeOrderArr = this.getOrderBiggerNumArr(map, 3);
            var lastNum = 0;
            var catchArr = [];
            for (var i = threeOrderArr.length - 1; i >= 0; i--) {
                var value = Number(threeOrderArr[i]);
                lastNum = value;
                catchArr.push(lastNum);
                if (catchArr.length == nContinu) {
                    var tmpArr = this.getRealValueArr(arr);
                    this.removeRootArr(tmpArr, catchArr, 3);
                    var leftMap = this.computeValueTimes(tmpArr)[0];
                    var threeArr = this.getOrderNumArr(leftMap, 3);
                    if (threeArr.length > 0) {
                        catchArr.shift();
                        continue;
                    }
                    else {
                        var fourArr = this.getOrderNumArr(leftMap, 4);
                        var twoArr = this.getOrderNumArr(leftMap, 2);
                        if (fourArr.length * 2 + twoArr.length == nContinu) {
                            var big = lastNum + nContinu - 1;
                            var w = DdzPokerCheck_1.default.getPokerWeight(big)[0];
                            return w;
                        }
                    }
                }
                if (lastNum > 0 && lastNum - Number(threeOrderArr[i - 1]) != 1 || lastNum == 2) {
                    catchArr = [];
                    continue;
                }
            }
        }
        return 0;
    };
    DdzTypeCheck.prototype.removeRootArr = function (arr, catchArr, times) {
        if (times === void 0) { times = 1; }
        for (var i = 0; i < catchArr.length * times; i++) {
            var index = arr.indexOf(catchArr[i % catchArr.length]);
            if (index > -1) {
                arr.splice(index, 1);
            }
        }
    };
    // 检测炸弹
    DdzTypeCheck.prototype.checkBomb = function (arr, maxCount) {
        if (arr.length != 4 || maxCount != 4)
            return 0;
        var w = DdzPokerCheck_1.default.getPokerWeight(arr[0])[0];
        return w;
    };
    // 检测4+1+1
    DdzTypeCheck.prototype.checkBombWithSingles = function (arr, maxCount, maxNumArr) {
        if (arr.length != 6 || maxCount != 4)
            return 0;
        var w = DdzPokerCheck_1.default.getPokerWeight(maxNumArr[0])[0];
        return w;
    };
    // 检测4+2+2
    DdzTypeCheck.prototype.checkBombWithPairs = function (arr, maxCount, maxNumArr, map) {
        if (arr.length != 8 || maxCount != 4)
            return 0;
        var orderNumArr = this.getOrderNumArr(map, 4);
        if (maxNumArr.length == 2) { // 4+4
            var w = DdzPokerCheck_1.default.getPokerWeight(orderNumArr[1])[0];
            return w;
        }
        else { // 4+...
            var count = 0;
            for (var key in map) {
                if (map[key] == 2)
                    count++;
            }
            if (count == 2) { // 4+2+2
                var w = DdzPokerCheck_1.default.getPokerWeight(maxNumArr[0])[0];
                return w;
            }
            else {
                return 0;
            }
        }
    };
    DdzTypeCheck.prototype.checkLinkPairs = function (arr, maxCount, maxNumArr, map) {
        if (maxCount != 2 || arr.length != 2 * maxNumArr.length || maxNumArr.length < 3)
            return 0;
        if (this.checkContinuity(map, 2)) {
            var orderNumArr = this.getOrderNumArr(map, 2);
            var w = DdzPokerCheck_1.default.getPokerWeight(orderNumArr[maxNumArr.length - 1])[0];
            return w;
        }
        else
            return 0;
    };
    DdzTypeCheck.prototype.checkQuickLinkPairs = function (arr, maxCount, maxNumArr, map) {
        if (maxCount != 2 || arr.length != 2 * maxNumArr.length || maxNumArr.length < 2)
            return 0;
        if (this.checkContinuity(map, 2)) {
            var orderNumArr = this.getOrderNumArr(map, 2);
            var w = DdzPokerCheck_1.default.getPokerWeight(orderNumArr[maxNumArr.length - 1])[0];
            return w;
        }
        else
            return 0;
    };
    DdzTypeCheck.prototype.checkStraight = function (arr, maxCount, maxNumArr, map) {
        if (maxCount != 1 || arr.length != maxNumArr.length || maxNumArr.length < 5)
            return 0;
        if (this.checkContinuity(map, 1)) {
            var orderNumArr = this.getOrderNumArr(map, 1);
            var w = DdzPokerCheck_1.default.getPokerWeight(orderNumArr[maxNumArr.length - 1])[0];
            return w;
        }
        else
            return 0;
    };
    DdzTypeCheck.prototype.checkQuickStraight = function (arr, maxCount, maxNumArr, map) {
        if (maxCount != 1 || arr.length != maxNumArr.length || maxNumArr.length < 3)
            return 0;
        if (this.checkContinuity(map, 1)) {
            var orderNumArr = this.getOrderNumArr(map, 1);
            var w = DdzPokerCheck_1.default.getPokerWeight(orderNumArr[maxNumArr.length - 1])[0];
            return w;
        }
        else
            return 0;
    };
    /**
     * 计算牌数据中牌面出现次数，返回[numMap, maxShowCount, maxNumArr]
     * numMap 标记次数
     * maxShowCount 最多次数
     * maxNumArr 最多次数的牌面数组
     * @param arr
     */
    DdzTypeCheck.prototype.computeValueTimes = function (arr) {
        if (arr === void 0) { arr = []; }
        var numMap = {};
        arr.forEach(function (value) {
            var num = DdzPokerCheck_1.default.getPokerValue(value)[0];
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
    /**
     * 指定count的num 按权重递增排列数组
     * @param numMap 牌面map{num: count}
     * @param count 张数
     */
    DdzTypeCheck.prototype.getOrderNumArr = function (numMap, count) {
        if (count === void 0) { count = 1; }
        var arr = [];
        for (var key in numMap) {
            var value = numMap[key];
            if (value == count) {
                arr.push(key);
            }
        }
        arr.sort(function (a, b) {
            var wa = DdzPokerCheck_1.default.getPokerWeight(a)[0];
            var wb = DdzPokerCheck_1.default.getPokerWeight(b)[0];
            return wa - wb; // 递增排序
        });
        return arr;
    };
    /**
     * 检测牌面值连续 (只可用于检测顺子 连对 飞机不带)
     * @param numMap 牌面map{num: count}
     * @param count 张数
     */
    DdzTypeCheck.prototype.checkContinuity = function (numMap, count) {
        var sortNumArr = this.getOrderNumArr(numMap, count);
        var lastNum = 0;
        for (var i = 0; i < sortNumArr.length; i++) {
            if (lastNum > 0 && (sortNumArr[i] - lastNum != 1) || sortNumArr[i] == 2) // 不连续或者含2
                return false;
            lastNum = sortNumArr[i];
        }
        return lastNum > 0;
    };
    /**
     * 不小于指定count的num 按权重递增排列数组
     * @param numMap 牌面map{num: count}
     * @param count 张数
     */
    DdzTypeCheck.prototype.getOrderBiggerNumArr = function (numMap, count) {
        if (count === void 0) { count = 1; }
        var arr = [];
        for (var key in numMap) {
            var value = numMap[key];
            if (value >= count) {
                arr.push(key);
            }
        }
        arr.sort(function (a, b) {
            var wa = DdzPokerCheck_1.default.getPokerWeight(a)[0];
            var wb = DdzPokerCheck_1.default.getPokerWeight(b)[0];
            return wa - wb; // 递增排序
        });
        return arr;
    };
    /**
     * 不小于指定count的num 按先数量后权重递增排列数组
     * @param numMap 牌面map{num: count}
     * @param count 张数
     */
    DdzTypeCheck.prototype.getOrderBiggerNumArrByCount = function (numMap, count) {
        if (count === void 0) { count = 1; }
        var arr = [];
        for (var key in numMap) {
            var value = numMap[key];
            if (value >= count) {
                arr.push(key);
            }
        }
        arr.sort(function (a, b) {
            if (numMap[a] == numMap[b]) {
                var wa = DdzPokerCheck_1.default.getPokerWeight(a)[0];
                var wb = DdzPokerCheck_1.default.getPokerWeight(b)[0];
                return wa - wb; // 权重递增排序
            }
            else
                return numMap[a] - numMap[b]; // 数量递增排序
        });
        return arr;
    };
    /**
     * 获取牌的牌面列表
     * @param arr
     */
    DdzTypeCheck.prototype.getRealValueArr = function (arr) {
        var tmpArr = [];
        for (var i = 0; i < arr.length; i++) {
            var value = DdzPokerCheck_1.default.getPokerValue(arr[i])[0];
            tmpArr.push(value);
        }
        return tmpArr;
    };
    return DdzTypeCheck;
}());
exports.default = DdzTypeCheck;

cc._RF.pop();