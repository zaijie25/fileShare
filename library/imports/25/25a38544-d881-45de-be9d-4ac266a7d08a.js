"use strict";
cc._RF.push(module, '25a38VE2IFF3r6dSsJmp9CK', 'JSUtil');
// hall/scripts/logic/core/tool/JSUtil.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSUtil = void 0;
/**
 * 对JS类操作的工具类
 * @author Peter
 *
*/
var JSUtil = /** @class */ (function () {
    function JSUtil() {
    }
    /**
     * 根据字符串创建对象
     * @param {string} cls 类的字符串值
     */
    JSUtil.importCls = function (cls) {
        return new Promise(function (resolve, reject) {
            // console.error("JSUtils module cls = " + cls)
            Promise.resolve().then(function () { return require(cls); }).then(function (module) {
                if (module && module.default) {
                    resolve(module.default);
                }
                else {
                    //  console.error(cls, "中没有default类.");
                    reject(module);
                }
            });
        });
    };
    /**
     * 获取父类
     * @param {Object} ctor 子类类名
     * @return {Object}
     */
    JSUtil.getSuper = function (ctor) {
        var proto = ctor.prototype;
        var dunderProto = proto && Object.getPrototypeOf(proto);
        return dunderProto && dunderProto.constructor;
    };
    /**
     * 判断subclass是否是superclass的子类
     * @param subclass
     * @param superclass
     */
    JSUtil.isChildClassOf = function (subclass, superclass) {
        if (subclass && superclass) {
            if (typeof subclass !== 'function') {
                return false;
            }
            if (typeof superclass !== 'function') {
                return false;
            }
            if (subclass === superclass) {
                return true;
            }
            for (;;) {
                subclass = JSUtil.getSuper(subclass);
                if (!subclass) {
                    return false;
                }
                if (subclass === superclass) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 深拷贝对象
     * @param obj
     */
    JSUtil.prototype.copyObj = function (obj) {
        if (obj) {
            return JSON.parse(JSON.stringify(obj));
        }
        else {
            return {};
        }
    };
    // 数组合并去重
    JSUtil.prototype.arrayConcat = function (array1, array2) {
        var tempPaths = array1.concat(array2);
        var retPaths = [];
        for (var _i = 0, tempPaths_1 = tempPaths; _i < tempPaths_1.length; _i++) {
            var path1 = tempPaths_1[_i];
            var flag = true;
            for (var _a = 0, retPaths_1 = retPaths; _a < retPaths_1.length; _a++) {
                var path2 = retPaths_1[_a];
                if (path1 == path2) {
                    flag = false;
                }
            }
            if (flag) {
                retPaths.push(path1);
            }
        }
        return retPaths;
    };
    return JSUtil;
}());
exports.JSUtil = JSUtil;

cc._RF.pop();