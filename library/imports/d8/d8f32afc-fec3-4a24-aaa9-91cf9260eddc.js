"use strict";
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