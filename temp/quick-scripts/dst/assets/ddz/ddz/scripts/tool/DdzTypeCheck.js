
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/tool/DdzTypeCheck.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXHRvb2xcXERkelR5cGVDaGVjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUE0QztBQUU1QztJQUFBO0lBdVhBLENBQUM7SUF0WEcsT0FBTztJQUNBLGtDQUFXLEdBQWxCLFVBQW1CLEdBQWE7UUFDNUIsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUM7WUFDZixPQUFPLENBQUMsQ0FBQztRQUNSLElBQUEsQ0FBQyxHQUFJLHVCQUFhLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUF4QyxDQUF5QztRQUMvQyxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCxPQUFPO0lBQ0Esa0NBQVcsR0FBbEIsVUFBbUIsR0FBYTtRQUM1QixJQUFJLHVCQUFhLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLHVCQUFhLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RSxPQUFPLEVBQUUsQ0FBQzs7WUFFVixPQUFPLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRUQsT0FBTztJQUNBLGdDQUFTLEdBQWhCLFVBQWlCLEdBQWE7UUFDMUIsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUM7WUFDZixPQUFPLENBQUMsQ0FBQztRQUNSLElBQUEsSUFBSSxHQUFJLHVCQUFhLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUF2QyxDQUF3QztRQUM1QyxJQUFBLElBQUksR0FBSSx1QkFBYSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBdkMsQ0FBd0M7UUFDakQsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFDO1lBQ1IsSUFBQSxDQUFDLEdBQUksdUJBQWEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFD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b3J0IERkelBva2VyQ2hlY2sgZnJvbSBcIi4vRGR6UG9rZXJDaGVja1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGR6VHlwZUNoZWNre1xyXG4gICAgLy8g5qOA5rWL5Y2V5bygXHJcbiAgICBwdWJsaWMgY2hlY2tTaW5nbGUoYXJyOiBudW1iZXJbXSl7XHJcbiAgICAgICAgaWYgKGFyci5sZW5ndGggIT0gMSlcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgbGV0IFt3XSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJXZWlnaHQoYXJyWzBdKTtcclxuICAgICAgICByZXR1cm4gdztcclxuICAgIH1cclxuXHJcbiAgICAvLyDmo4DmtYvngavnrq1cclxuICAgIHB1YmxpYyBjaGVja1JvY2tldChhcnI6IG51bWJlcltdKXtcclxuICAgICAgICBpZiAoRGR6UG9rZXJDaGVjay5jaGVja0lzR2hvc3QoYXJyWzBdKSAmJiBEZHpQb2tlckNoZWNrLmNoZWNrSXNHaG9zdChhcnJbMV0pKVxyXG4gICAgICAgICAgICByZXR1cm4gOTk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmo4DmtYvlr7nlrZBcclxuICAgIHB1YmxpYyBjaGVja1BhaXIoYXJyOiBudW1iZXJbXSl7XHJcbiAgICAgICAgaWYgKGFyci5sZW5ndGggIT0gMilcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgbGV0IFtudW0wXSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJWYWx1ZShhcnJbMF0pO1xyXG4gICAgICAgIGxldCBbbnVtMV0gPSBEZHpQb2tlckNoZWNrLmdldFBva2VyVmFsdWUoYXJyWzFdKTtcclxuICAgICAgICBpZiAobnVtMCA9PSBudW0xKXtcclxuICAgICAgICAgICAgbGV0IFt3XSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJXZWlnaHQoYXJyWzBdKTtcclxuICAgICAgICAgICAgcmV0dXJuIHc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDmo4DmtYszKzBcclxuICAgIHB1YmxpYyBjaGVja1RocmVlWmVybyhhcnI6IG51bWJlcltdLCBtYXhDb3VudDogbnVtYmVyLCBtYXhOdW1BcnI6IG51bWJlcltdKXtcclxuICAgICAgICBpZihhcnIubGVuZ3RoICE9IDMgfHwgbWF4Q291bnQgIT0gMylcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgaWYobWF4TnVtQXJyLmxlbmd0aCA9PSAxKXtcclxuICAgICAgICAgICAgbGV0IFt3XSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJXZWlnaHQobWF4TnVtQXJyWzBdKTtcclxuICAgICAgICAgICAgcmV0dXJuIHc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5qOA5rWLMysxXHJcbiAgICBwdWJsaWMgY2hlY2tUaHJlZU9uZShhcnI6IG51bWJlcltdLCBtYXhDb3VudDogbnVtYmVyLCBtYXhOdW1BcnI6IG51bWJlcltdKXtcclxuICAgICAgICBpZihhcnIubGVuZ3RoICE9IDQgfHwgbWF4Q291bnQgIT0gMylcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgaWYobWF4TnVtQXJyLmxlbmd0aCA9PSAxKXtcclxuICAgICAgICAgICAgbGV0IFt3XSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJXZWlnaHQobWF4TnVtQXJyWzBdKTtcclxuICAgICAgICAgICAgcmV0dXJuIHc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5qOA5rWLMysyXHJcbiAgICBwdWJsaWMgY2hlY2tUaHJlZVR3byhhcnI6IG51bWJlcltdLCBtYXhDb3VudDogbnVtYmVyLCBtYXhOdW1BcnI6IG51bWJlcltdLCBtYXA6IHt9KXtcclxuICAgICAgICBpZihhcnIubGVuZ3RoICE9IDUgfHwgbWF4Q291bnQgIT0gMylcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgbGV0IHBhaXJPcmRlckFyciA9IHRoaXMuZ2V0T3JkZXJOdW1BcnIobWFwLCAyKTtcclxuICAgICAgICBpZihtYXhOdW1BcnIubGVuZ3RoID09IDEgJiYgcGFpck9yZGVyQXJyLmxlbmd0aCA9PSAxKXtcclxuICAgICAgICAgICAgbGV0IFt3XSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJXZWlnaHQobWF4TnVtQXJyWzBdKTtcclxuICAgICAgICAgICAgcmV0dXJuIHc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5qOA5rWL6aOe5py65LiN5bimXHJcbiAgICBwdWJsaWMgY2hlY2tQbGFuZVplcm8oYXJyOiBudW1iZXJbXSwgbWF4Q291bnQ6IG51bWJlciwgbWF4TnVtQXJyOiBudW1iZXJbXSwgbWFwOiB7fSl7XHJcbiAgICAgICAgaWYoYXJyLmxlbmd0aCA8IDYgfHwgYXJyLmxlbmd0aCAhPSAzICogbWF4TnVtQXJyLmxlbmd0aClcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tDb250aW51aXR5KG1hcCwgMykpe1xyXG4gICAgICAgICAgICBsZXQgdGhyZWVPcmRlckFyciA9IHRoaXMuZ2V0T3JkZXJOdW1BcnIobWFwLCAzKTtcclxuICAgICAgICAgICAgbGV0IFt3XSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJXZWlnaHQodGhyZWVPcmRlckFyclt0aHJlZU9yZGVyQXJyLmxlbmd0aCAtMV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmo4DmtYvpo57mnLrluKbljZVcclxuICAgIHB1YmxpYyBjaGVja1BsYW5lT25lKGFycjogbnVtYmVyW10sIG1heENvdW50OiBudW1iZXIsIG1heE51bUFycjogbnVtYmVyW10sIG1hcDoge30pe1xyXG4gICAgICAgIGxldCB0b3RhbCA9IGFyci5sZW5ndGg7XHJcbiAgICAgICAgaWYgKHRvdGFsID49IDggJiYgdG90YWwgJSA0ID09IDApe1xyXG4gICAgICAgICAgICBsZXQgbkNvbnRpbnUgPSBhcnIubGVuZ3RoIC8gNDtcclxuICAgICAgICAgICAgbGV0IHRocmVlT3JkZXJBcnIgPSB0aGlzLmdldE9yZGVyQmlnZ2VyTnVtQXJyKG1hcCwgMyk7XHJcbiAgICAgICAgICAgIGxldCBsYXN0TnVtID0gMDtcclxuICAgICAgICAgICAgbGV0IGNhdGNoQXJyID0gW107XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT10aHJlZU9yZGVyQXJyLmxlbmd0aC0xOyBpID49MDsgaS0tKXtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IE51bWJlcih0aHJlZU9yZGVyQXJyW2ldKTtcclxuICAgICAgICAgICAgICAgIGxhc3ROdW0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNhdGNoQXJyLnB1c2gobGFzdE51bSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2F0Y2hBcnIubGVuZ3RoID09IG5Db250aW51KXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYmlnID0gbGFzdE51bSArIG5Db250aW51IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBbd10gPSBEZHpQb2tlckNoZWNrLmdldFBva2VyV2VpZ2h0KGJpZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobGFzdE51bSA+IDAgJiYgbGFzdE51bSAtIE51bWJlcih0aHJlZU9yZGVyQXJyW2ktMV0pICE9IDEgfHwgbGFzdE51bSA9PSAyKXtcclxuICAgICAgICAgICAgICAgICAgICBjYXRjaEFyciA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOajgOa1i+mjnuacuuW4puWvuVxyXG4gICAgcHVibGljIGNoZWNrUGxhbmVUd28oYXJyOiBudW1iZXJbXSwgbWF4Q291bnQ6IG51bWJlciwgbWF4TnVtQXJyOiBudW1iZXJbXSwgbWFwOiB7fSl7XHJcbiAgICAgICAgbGV0IHRvdGFsID0gYXJyLmxlbmd0aDtcclxuICAgICAgICBpZiAodG90YWwgPj0gMTAgJiYgdG90YWwgJSA1ID09IDApe1xyXG4gICAgICAgICAgICBsZXQgbkNvbnRpbnUgPSBhcnIubGVuZ3RoIC8gNTtcclxuICAgICAgICAgICAgbGV0IHRocmVlT3JkZXJBcnIgPSB0aGlzLmdldE9yZGVyQmlnZ2VyTnVtQXJyKG1hcCwgMyk7XHJcbiAgICAgICAgICAgIGxldCBsYXN0TnVtID0gMDtcclxuICAgICAgICAgICAgbGV0IGNhdGNoQXJyID0gW107XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT10aHJlZU9yZGVyQXJyLmxlbmd0aC0xOyBpID49MDsgaS0tKXtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IE51bWJlcih0aHJlZU9yZGVyQXJyW2ldKTtcclxuICAgICAgICAgICAgICAgIGxhc3ROdW0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNhdGNoQXJyLnB1c2gobGFzdE51bSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2F0Y2hBcnIubGVuZ3RoID09IG5Db250aW51KXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG1wQXJyID0gdGhpcy5nZXRSZWFsVmFsdWVBcnIoYXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVJvb3RBcnIodG1wQXJyLCBjYXRjaEFyciwgMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IFtsZWZ0TWFwXSA9IHRoaXMuY29tcHV0ZVZhbHVlVGltZXModG1wQXJyKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGhyZWVBcnIgPSB0aGlzLmdldE9yZGVyTnVtQXJyKGxlZnRNYXAsIDMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aHJlZUFyci5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2hBcnIuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb3VyQXJyID0gdGhpcy5nZXRPcmRlck51bUFycihsZWZ0TWFwLCA0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHR3b0FyciA9IHRoaXMuZ2V0T3JkZXJOdW1BcnIobGVmdE1hcCwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3VyQXJyLmxlbmd0aCAqMiArIHR3b0Fyci5sZW5ndGggPT0gbkNvbnRpbnUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJpZyA9IGxhc3ROdW0gKyBuQ29udGludSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBbd10gPSBEZHpQb2tlckNoZWNrLmdldFBva2VyV2VpZ2h0KGJpZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3ROdW0gPiAwICYmIGxhc3ROdW0gLSBOdW1iZXIodGhyZWVPcmRlckFycltpLTFdKSAhPSAxIHx8IGxhc3ROdW0gPT0gMil7XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2hBcnIgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlUm9vdEFycihhcnI6IG51bWJlcltdLCBjYXRjaEFycjogbnVtYmVyW10sIHRpbWVzOiBudW1iZXIgPSAxKXtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTwgY2F0Y2hBcnIubGVuZ3RoICogdGltZXM7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGFyci5pbmRleE9mKGNhdGNoQXJyW2kgJSBjYXRjaEFyci5sZW5ndGhdKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpe1xyXG4gICAgICAgICAgICAgICAgYXJyLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5qOA5rWL54K45by5XHJcbiAgICBwdWJsaWMgY2hlY2tCb21iKGFycjogbnVtYmVyW10sIG1heENvdW50OiBudW1iZXIpe1xyXG4gICAgICAgIGlmKGFyci5sZW5ndGggIT0gNCB8fCBtYXhDb3VudCAhPSA0KVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICBsZXQgW3ddID0gRGR6UG9rZXJDaGVjay5nZXRQb2tlcldlaWdodChhcnJbMF0pO1xyXG4gICAgICAgIHJldHVybiB3O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOajgOa1izQrMSsxXHJcbiAgICBwdWJsaWMgY2hlY2tCb21iV2l0aFNpbmdsZXMoYXJyOiBudW1iZXJbXSwgbWF4Q291bnQ6IG51bWJlciwgbWF4TnVtQXJyOiBudW1iZXJbXSl7XHJcbiAgICAgICAgaWYgKGFyci5sZW5ndGggIT0gNiB8fCBtYXhDb3VudCAhPSA0KVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICBsZXQgW3ddID0gRGR6UG9rZXJDaGVjay5nZXRQb2tlcldlaWdodChtYXhOdW1BcnJbMF0pO1xyXG4gICAgICAgIHJldHVybiB3O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOajgOa1izQrMisyXHJcbiAgICBwdWJsaWMgY2hlY2tCb21iV2l0aFBhaXJzKGFycjogbnVtYmVyW10sIG1heENvdW50OiBudW1iZXIsIG1heE51bUFycjogbnVtYmVyW10sIG1hcDoge30pe1xyXG4gICAgICAgIGlmIChhcnIubGVuZ3RoICE9IDggfHwgbWF4Q291bnQgIT0gNClcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgbGV0IG9yZGVyTnVtQXJyID0gdGhpcy5nZXRPcmRlck51bUFycihtYXAsIDQpO1xyXG4gICAgICAgIGlmIChtYXhOdW1BcnIubGVuZ3RoID09IDIpeyAgICAvLyA0KzRcclxuICAgICAgICAgICAgbGV0IFt3XSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJXZWlnaHQob3JkZXJOdW1BcnJbMV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXsgICAvLyA0Ky4uLlxyXG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgICAgICBmb3IobGV0IGtleSBpbiBtYXApe1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hcFtrZXldID09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQgKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvdW50ID09IDIpeyAgICAvLyA0KzIrMlxyXG4gICAgICAgICAgICAgICAgbGV0IFt3XSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJXZWlnaHQobWF4TnVtQXJyWzBdKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB3O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tMaW5rUGFpcnMoYXJyOiBudW1iZXJbXSwgbWF4Q291bnQ6IG51bWJlciwgbWF4TnVtQXJyOiBudW1iZXJbXSwgbWFwOiB7fSl7XHJcbiAgICAgICAgaWYgKG1heENvdW50ICE9MiB8fCBhcnIubGVuZ3RoICE9IDIgKiBtYXhOdW1BcnIubGVuZ3RoIHx8IG1heE51bUFyci5sZW5ndGggPCAzKVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICBpZiAodGhpcy5jaGVja0NvbnRpbnVpdHkobWFwLCAyKSl7XHJcbiAgICAgICAgICAgIGxldCBvcmRlck51bUFyciA9IHRoaXMuZ2V0T3JkZXJOdW1BcnIobWFwLCAyKTtcclxuICAgICAgICAgICAgbGV0IFt3XSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJXZWlnaHQob3JkZXJOdW1BcnJbbWF4TnVtQXJyLmxlbmd0aCAtMV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tRdWlja0xpbmtQYWlycyhhcnI6IG51bWJlcltdLCBtYXhDb3VudDogbnVtYmVyLCBtYXhOdW1BcnI6IG51bWJlcltdLCBtYXA6IHt9KXtcclxuICAgICAgICBpZiAobWF4Q291bnQgIT0yIHx8IGFyci5sZW5ndGggIT0gMiAqIG1heE51bUFyci5sZW5ndGggfHwgbWF4TnVtQXJyLmxlbmd0aCA8IDIpXHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrQ29udGludWl0eShtYXAsIDIpKXtcclxuICAgICAgICAgICAgbGV0IG9yZGVyTnVtQXJyID0gdGhpcy5nZXRPcmRlck51bUFycihtYXAsIDIpO1xyXG4gICAgICAgICAgICBsZXQgW3ddID0gRGR6UG9rZXJDaGVjay5nZXRQb2tlcldlaWdodChvcmRlck51bUFyclttYXhOdW1BcnIubGVuZ3RoIC0xXSk7XHJcbiAgICAgICAgICAgIHJldHVybiB3O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja1N0cmFpZ2h0KGFycjogbnVtYmVyW10sIG1heENvdW50OiBudW1iZXIsIG1heE51bUFycjogbnVtYmVyW10sIG1hcDoge30pe1xyXG4gICAgICAgIGlmIChtYXhDb3VudCAhPTEgfHwgYXJyLmxlbmd0aCAhPSBtYXhOdW1BcnIubGVuZ3RoIHx8IG1heE51bUFyci5sZW5ndGggPCA1KVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICBpZiAodGhpcy5jaGVja0NvbnRpbnVpdHkobWFwLCAxKSl7XHJcbiAgICAgICAgICAgIGxldCBvcmRlck51bUFyciA9IHRoaXMuZ2V0T3JkZXJOdW1BcnIobWFwLCAxKTtcclxuICAgICAgICAgICAgbGV0IFt3XSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJXZWlnaHQob3JkZXJOdW1BcnJbbWF4TnVtQXJyLmxlbmd0aCAtMV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tRdWlja1N0cmFpZ2h0KGFycjogbnVtYmVyW10sIG1heENvdW50OiBudW1iZXIsIG1heE51bUFycjogbnVtYmVyW10sIG1hcDoge30pe1xyXG4gICAgICAgIGlmIChtYXhDb3VudCAhPTEgfHwgYXJyLmxlbmd0aCAhPSBtYXhOdW1BcnIubGVuZ3RoIHx8IG1heE51bUFyci5sZW5ndGggPCAzKVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICBpZiAodGhpcy5jaGVja0NvbnRpbnVpdHkobWFwLCAxKSl7XHJcbiAgICAgICAgICAgIGxldCBvcmRlck51bUFyciA9IHRoaXMuZ2V0T3JkZXJOdW1BcnIobWFwLCAxKTtcclxuICAgICAgICAgICAgbGV0IFt3XSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJXZWlnaHQob3JkZXJOdW1BcnJbbWF4TnVtQXJyLmxlbmd0aCAtMV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuoeeul+eJjOaVsOaNruS4reeJjOmdouWHuueOsOasoeaVsO+8jOi/lOWbnltudW1NYXAsIG1heFNob3dDb3VudCwgbWF4TnVtQXJyXVxyXG4gICAgICogbnVtTWFwIOagh+iusOasoeaVsFxyXG4gICAgICogbWF4U2hvd0NvdW50IOacgOWkmuasoeaVsFxyXG4gICAgICogbWF4TnVtQXJyIOacgOWkmuasoeaVsOeahOeJjOmdouaVsOe7hFxyXG4gICAgICogQHBhcmFtIGFyciBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbXB1dGVWYWx1ZVRpbWVzKGFyciA9IFtdKTpbYW55LCBudW1iZXIsIG51bWJlcltdXXtcclxuICAgICAgICBsZXQgbnVtTWFwID0ge307XHJcbiAgICAgICAgYXJyLmZvckVhY2godmFsdWUgPT4ge1xyXG4gICAgICAgICAgICBsZXQgW251bV0gPSBEZHpQb2tlckNoZWNrLmdldFBva2VyVmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAobnVtTWFwW251bV0pXHJcbiAgICAgICAgICAgICAgICBudW1NYXBbbnVtXSArKztcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgbnVtTWFwW251bV0gPSAxO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgbWF4U2hvd0NvdW50ID0gMDtcclxuICAgICAgICBmb3IobGV0IGtleSBpbiBudW1NYXApe1xyXG4gICAgICAgICAgICBpZiAobnVtTWFwW2tleV0gPiBtYXhTaG93Q291bnQpe1xyXG4gICAgICAgICAgICAgICAgbWF4U2hvd0NvdW50ID0gbnVtTWFwW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1heE51bUFyciA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQga2V5IGluIG51bU1hcCl7XHJcbiAgICAgICAgICAgIGlmIChudW1NYXBba2V5XSA9PSBtYXhTaG93Q291bnQpe1xyXG4gICAgICAgICAgICAgICAgbWF4TnVtQXJyLnB1c2goa2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFtudW1NYXAsIG1heFNob3dDb3VudCwgbWF4TnVtQXJyXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaMh+WummNvdW5055qEbnVtIOaMieadg+mHjemAkuWinuaOkuWIl+aVsOe7hFxyXG4gICAgICogQHBhcmFtIG51bU1hcCDniYzpnaJtYXB7bnVtOiBjb3VudH1cclxuICAgICAqIEBwYXJhbSBjb3VudCDlvKDmlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldE9yZGVyTnVtQXJyKG51bU1hcDoge30sIGNvdW50OiBudW1iZXIgPTEpOiBudW1iZXJbXXtcclxuICAgICAgICBsZXQgYXJyID0gW107XHJcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gbnVtTWFwKXtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gbnVtTWFwW2tleV07XHJcbiAgICAgICAgICAgIGlmKHZhbHVlID09IGNvdW50KXtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYXJyLnNvcnQoKGEsIGIpPT57XHJcbiAgICAgICAgICAgIGxldCBbd2FdID0gRGR6UG9rZXJDaGVjay5nZXRQb2tlcldlaWdodChhKTtcclxuICAgICAgICAgICAgbGV0IFt3Yl0gPSBEZHpQb2tlckNoZWNrLmdldFBva2VyV2VpZ2h0KGIpO1xyXG4gICAgICAgICAgICByZXR1cm4gd2EgLSB3YjsgLy8g6YCS5aKe5o6S5bqPXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOajgOa1i+eJjOmdouWAvOi/nue7rSAo5Y+q5Y+v55So5LqO5qOA5rWL6aG65a2QIOi/nuWvuSDpo57mnLrkuI3luKYpXHJcbiAgICAgKiBAcGFyYW0gbnVtTWFwIOeJjOmdom1hcHtudW06IGNvdW50fVxyXG4gICAgICogQHBhcmFtIGNvdW50IOW8oOaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hlY2tDb250aW51aXR5KG51bU1hcDoge30sIGNvdW50OiBudW1iZXIpOiBib29sZWFue1xyXG4gICAgICAgIGxldCBzb3J0TnVtQXJyID0gdGhpcy5nZXRPcmRlck51bUFycihudW1NYXAsIGNvdW50KTtcclxuICAgICAgICBsZXQgbGFzdE51bSA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8IHNvcnROdW1BcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZiAobGFzdE51bSA+IDAgJiYgKHNvcnROdW1BcnJbaV0gLSBsYXN0TnVtICE9IDEpIHx8IHNvcnROdW1BcnJbaV0gPT0gMikgLy8g5LiN6L+e57ut5oiW6ICF5ZCrMlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBsYXN0TnVtID0gc29ydE51bUFycltpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxhc3ROdW0gPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiN5bCP5LqO5oyH5a6aY291bnTnmoRudW0g5oyJ5p2D6YeN6YCS5aKe5o6S5YiX5pWw57uEXHJcbiAgICAgKiBAcGFyYW0gbnVtTWFwIOeJjOmdom1hcHtudW06IGNvdW50fVxyXG4gICAgICogQHBhcmFtIGNvdW50IOW8oOaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0T3JkZXJCaWdnZXJOdW1BcnIobnVtTWFwOiB7fSwgY291bnQ6IG51bWJlciA9MSk6IG51bWJlcltde1xyXG4gICAgICAgIGxldCBhcnIgPSBbXTtcclxuICAgICAgICBmb3IobGV0IGtleSBpbiBudW1NYXApe1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBudW1NYXBba2V5XTtcclxuICAgICAgICAgICAgaWYodmFsdWUgPj0gY291bnQpe1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2goa2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBhcnIuc29ydCgoYSwgYik9PntcclxuICAgICAgICAgICAgbGV0IFt3YV0gPSBEZHpQb2tlckNoZWNrLmdldFBva2VyV2VpZ2h0KGEpO1xyXG4gICAgICAgICAgICBsZXQgW3diXSA9IERkelBva2VyQ2hlY2suZ2V0UG9rZXJXZWlnaHQoYik7XHJcbiAgICAgICAgICAgIHJldHVybiB3YSAtIHdiOyAvLyDpgJLlop7mjpLluo9cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiN5bCP5LqO5oyH5a6aY291bnTnmoRudW0g5oyJ5YWI5pWw6YeP5ZCO5p2D6YeN6YCS5aKe5o6S5YiX5pWw57uEXHJcbiAgICAgKiBAcGFyYW0gbnVtTWFwIOeJjOmdom1hcHtudW06IGNvdW50fVxyXG4gICAgICogQHBhcmFtIGNvdW50IOW8oOaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0T3JkZXJCaWdnZXJOdW1BcnJCeUNvdW50KG51bU1hcDoge30sIGNvdW50OiBudW1iZXIgPTEpOiBudW1iZXJbXXtcclxuICAgICAgICBsZXQgYXJyID0gW107XHJcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gbnVtTWFwKXtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gbnVtTWFwW2tleV07XHJcbiAgICAgICAgICAgIGlmKHZhbHVlID49IGNvdW50KXtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYXJyLnNvcnQoKGEsIGIpPT57XHJcbiAgICAgICAgICAgIGlmIChudW1NYXBbYV0gPT0gbnVtTWFwW2JdKXtcclxuICAgICAgICAgICAgICAgIGxldCBbd2FdID0gRGR6UG9rZXJDaGVjay5nZXRQb2tlcldlaWdodChhKTtcclxuICAgICAgICAgICAgICAgIGxldCBbd2JdID0gRGR6UG9rZXJDaGVjay5nZXRQb2tlcldlaWdodChiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB3YSAtIHdiOyAgICAgLy8g5p2D6YeN6YCS5aKe5o6S5bqPXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bU1hcFthXSAtIG51bU1hcFtiXTsgLy8g5pWw6YeP6YCS5aKe5o6S5bqPXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlueJjOeahOeJjOmdouWIl+ihqFxyXG4gICAgICogQHBhcmFtIGFyciBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFJlYWxWYWx1ZUFycihhcnIpe1xyXG4gICAgICAgIGxldCB0bXBBcnIgPSBbXTtcclxuICAgICAgICBmb3IobGV0IGkgPTA7IGk8IGFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBbdmFsdWVdID0gRGR6UG9rZXJDaGVjay5nZXRQb2tlclZhbHVlKGFycltpXSk7XHJcbiAgICAgICAgICAgIHRtcEFyci5wdXNoKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRtcEFycjtcclxuICAgIH1cclxufSJdfQ==