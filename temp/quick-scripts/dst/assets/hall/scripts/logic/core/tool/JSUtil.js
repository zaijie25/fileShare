
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/tool/JSUtil.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHRvb2xcXEpTVXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztFQUlFO0FBQ0Y7SUFBQTtJQTBGQSxDQUFDO0lBekZHOzs7T0FHRztJQUNXLGdCQUFTLEdBQXZCLFVBQXdCLEdBQVc7UUFDL0IsT0FBTyxJQUFJLE9BQU8sQ0FBTSxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3BDLCtDQUErQztZQUMvQyxvREFBTyxHQUFHLE1BQUUsSUFBSSxDQUFDLFVBQUMsTUFBTTtnQkFDcEIsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtvQkFDMUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDM0I7cUJBQU07b0JBQ0wsdUNBQXVDO29CQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ2xCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7OztPQUlHO0lBQ1csZUFBUSxHQUF0QixVQUF3QixJQUFJO1FBQ3hCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDM0IsSUFBSSxXQUFXLEdBQUcsS0FBSyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEQsT0FBTyxXQUFXLElBQUksV0FBVyxDQUFDLFdBQVcsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNXLHFCQUFjLEdBQTVCLFVBQThCLFFBQVEsRUFBRSxVQUFVO1FBQzlDLElBQUksUUFBUSxJQUFJLFVBQVUsRUFBRTtZQUN4QixJQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVUsRUFBRTtnQkFDaEMsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxJQUFJLE9BQU8sVUFBVSxLQUFLLFVBQVUsRUFBRTtnQkFDbEMsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxJQUFJLFFBQVEsS0FBSyxVQUFVLEVBQUU7Z0JBQ3pCLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFDRCxTQUFTO2dCQUNMLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNYLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjtnQkFDRCxJQUFJLFFBQVEsS0FBSyxVQUFVLEVBQUU7b0JBQ3pCLE9BQU8sSUFBSSxDQUFDO2lCQUNmO2FBQ0o7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7O09BR0c7SUFDSSx3QkFBTyxHQUFkLFVBQWUsR0FBUTtRQUNuQixJQUFJLEdBQUcsRUFBRTtZQUNMLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDMUM7YUFDSTtZQUNELE9BQU8sRUFBRSxDQUFBO1NBQ1o7SUFDTCxDQUFDO0lBRUQsU0FBUztJQUNGLDRCQUFXLEdBQWxCLFVBQW1CLE1BQU0sRUFBQyxNQUFNO1FBQzVCLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFBO1FBQ2pCLEtBQWtCLFVBQVMsRUFBVCx1QkFBUyxFQUFULHVCQUFTLEVBQVQsSUFBUyxFQUFDO1lBQXZCLElBQUksS0FBSyxrQkFBQTtZQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixLQUFrQixVQUFRLEVBQVIscUJBQVEsRUFBUixzQkFBUSxFQUFSLElBQVEsRUFBQztnQkFBdEIsSUFBSSxLQUFLLGlCQUFBO2dCQUNWLElBQUksS0FBSyxJQUFJLEtBQUssRUFBQztvQkFDZixJQUFJLEdBQUcsS0FBSyxDQUFDO2lCQUNoQjthQUNKO1lBQ0QsSUFBSSxJQUFJLEVBQUM7Z0JBQ0wsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUN2QjtTQUNKO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVMLGFBQUM7QUFBRCxDQTFGQSxBQTBGQyxJQUFBO0FBMUZZLHdCQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOWvuUpT57G75pON5L2c55qE5bel5YW357G7XHJcbiAqIEBhdXRob3IgUGV0ZXJcclxuICogXHJcbiovXHJcbmV4cG9ydCBjbGFzcyBKU1V0aWwge1xyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7lrZfnrKbkuLLliJvlu7rlr7nosaFcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjbHMg57G755qE5a2X56ym5Liy5YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaW1wb3J0Q2xzKGNsczogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KT0+e1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKFwiSlNVdGlscyBtb2R1bGUgY2xzID0gXCIgKyBjbHMpXHJcbiAgICAgICAgICAgIGltcG9ydChjbHMpLnRoZW4oKG1vZHVsZSk9PntcclxuICAgICAgICAgICAgICAgIGlmIChtb2R1bGUgJiYgbW9kdWxlLmRlZmF1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG1vZHVsZS5kZWZhdWx0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vICBjb25zb2xlLmVycm9yKGNscywgXCLkuK3msqHmnIlkZWZhdWx057G7LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QobW9kdWxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bniLbnsbtcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjdG9yIOWtkOexu+exu+WQjVxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFN1cGVyIChjdG9yKSB7XHJcbiAgICAgICAgbGV0IHByb3RvID0gY3Rvci5wcm90b3R5cGU7XHJcbiAgICAgICAgbGV0IGR1bmRlclByb3RvID0gcHJvdG8gJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvKTtcclxuICAgICAgICByZXR1cm4gZHVuZGVyUHJvdG8gJiYgZHVuZGVyUHJvdG8uY29uc3RydWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq1zdWJjbGFzc+aYr+WQpuaYr3N1cGVyY2xhc3PnmoTlrZDnsbtcclxuICAgICAqIEBwYXJhbSBzdWJjbGFzc1xyXG4gICAgICogQHBhcmFtIHN1cGVyY2xhc3NcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpc0NoaWxkQ2xhc3NPZiAoc3ViY2xhc3MsIHN1cGVyY2xhc3MpIHtcclxuICAgICAgICBpZiAoc3ViY2xhc3MgJiYgc3VwZXJjbGFzcykge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHN1YmNsYXNzICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdXBlcmNsYXNzICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHN1YmNsYXNzID09PSBzdXBlcmNsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKDs7KSB7XHJcbiAgICAgICAgICAgICAgICBzdWJjbGFzcyA9IEpTVXRpbC5nZXRTdXBlcihzdWJjbGFzcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXN1YmNsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHN1YmNsYXNzID09PSBzdXBlcmNsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOa3seaLt+i0neWvueixoVxyXG4gICAgICogQHBhcmFtIG9iaiBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvcHlPYmoob2JqOiBhbnkpIHtcclxuICAgICAgICBpZiAob2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHt9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOaVsOe7hOWQiOW5tuWOu+mHjVxyXG4gICAgcHVibGljIGFycmF5Q29uY2F0KGFycmF5MSxhcnJheTIpe1xyXG4gICAgICAgIGxldCB0ZW1wUGF0aHMgPSBhcnJheTEuY29uY2F0KGFycmF5Mik7XHJcbiAgICAgICAgbGV0IHJldFBhdGhzID0gW11cclxuICAgICAgICBmb3IgKGxldCBwYXRoMSBvZiB0ZW1wUGF0aHMpe1xyXG4gICAgICAgICAgICBsZXQgZmxhZyA9IHRydWU7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHBhdGgyIG9mIHJldFBhdGhzKXtcclxuICAgICAgICAgICAgICAgIGlmIChwYXRoMSA9PSBwYXRoMil7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChmbGFnKXtcclxuICAgICAgICAgICAgICAgIHJldFBhdGhzLnB1c2gocGF0aDEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldFBhdGhzO1xyXG4gICAgfVxyXG5cclxufSJdfQ==