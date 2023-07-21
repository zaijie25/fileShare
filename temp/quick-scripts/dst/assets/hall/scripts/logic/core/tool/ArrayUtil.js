
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/tool/ArrayUtil.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd8f32r8/sNKJKqpkc+SYO3c', 'ArrayUtil');
// hall/scripts/logic/core/tool/ArrayUtil.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ArrayUtil:数组操作相关接口
 * @author Peter
 */
var ArrayUtil = /** @class */ (function () {
    function ArrayUtil() {
    }
    ArrayUtil.stringify = function (src) {
        var str = "";
        for (var _i = 0, src_1 = src; _i < src_1.length; _i++) {
            var s = src_1[_i];
            str = str + " " + s.toString();
        }
        return str;
    };
    //通过排序比较2个数组是否包含相同的元素
    ArrayUtil.prototype.compareArraySort = function (a1, a2) {
        if ((!a1 && a2) || (a1 && !a2))
            return false;
        if (a1.length !== a2.length)
            return false;
        var a11 = [].concat(a1);
        var a22 = [].concat(a2);
        a11 = a11.sort();
        a22 = a22.sort();
        for (var i = 0, n = a11.length; i < n; i++) {
            if (a11[i] !== a22[i])
                return false;
        }
        return true;
    };
    return ArrayUtil;
}());
exports.default = ArrayUtil;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHRvb2xcXEFycmF5VXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7R0FHRztBQUNIO0lBQUE7SUF3QkEsQ0FBQztJQXRCaUIsbUJBQVMsR0FBdkIsVUFBd0IsR0FBVTtRQUM5QixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixLQUFjLFVBQUcsRUFBSCxXQUFHLEVBQUgsaUJBQUcsRUFBSCxJQUFHLEVBQUU7WUFBZCxJQUFJLENBQUMsWUFBQTtZQUNOLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNsQztRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELHFCQUFxQjtJQUNkLG9DQUFnQixHQUF2QixVQUF3QixFQUFFLEVBQUUsRUFBRTtRQUMxQixJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUM3QyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFDLE1BQU07WUFBRSxPQUFPLEtBQUssQ0FBQztRQUMxQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQixHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFBRSxPQUFPLEtBQUssQ0FBQztTQUN2QztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTCxnQkFBQztBQUFELENBeEJBLEFBd0JDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQXJyYXlVdGlsOuaVsOe7hOaTjeS9nOebuOWFs+aOpeWPo1xyXG4gKiBAYXV0aG9yIFBldGVyXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcnJheVV0aWwge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5naWZ5KHNyYzogYW55W10pOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBzdHIgPSBcIlwiO1xyXG4gICAgICAgIGZvciAobGV0IHMgb2Ygc3JjKSB7XHJcbiAgICAgICAgICAgIHN0ciA9IHN0ciArIFwiIFwiICsgcy50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6YCa6L+H5o6S5bqP5q+U6L6DMuS4quaVsOe7hOaYr+WQpuWMheWQq+ebuOWQjOeahOWFg+e0oFxyXG4gICAgcHVibGljIGNvbXBhcmVBcnJheVNvcnQoYTEsIGEyKSB7XHJcbiAgICAgICAgaWYgKCghYTEgJiYgYTIpIHx8IChhMSAmJiAhYTIpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKGExLmxlbmd0aCAhPT0gYTIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgbGV0IGExMSA9IFtdLmNvbmNhdChhMSk7XHJcbiAgICAgICAgbGV0IGEyMiA9IFtdLmNvbmNhdChhMik7XHJcbiAgICAgICAgYTExID0gYTExLnNvcnQoKTtcclxuICAgICAgICBhMjIgPSBhMjIuc29ydCgpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gYTExLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoYTExW2ldICE9PSBhMjJbaV0pIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG59Il19