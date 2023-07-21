
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/config/ConfigBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd0881kY7RVPyrXAQ5DpnIff', 'ConfigBase');
// hall/scripts/framework/config/ConfigBase.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 配置对应的类
 */
var ConfigBase = /** @class */ (function () {
    function ConfigBase() {
        //内容
        this.content = {};
    }
    /**
     * 根据key获得对应的值
     * @param key 字段的key
     * @param defaultValue 当没有找到对应值时返回的默认值
     * @param type 返回值的类型,目前只支持：string, number,其他类型无效
     */
    ConfigBase.prototype.getValue = function (key, defaultValue, type) {
        var value = this.content[key.toString()];
        if (value == null) {
            if (defaultValue != null) {
                return defaultValue;
            }
            return null;
        }
        var valueType = typeof value;
        if (type == null || valueType === type) {
            return value;
        }
        else if (type == "string") {
            return value.toString();
        }
        else if (type == "number") {
            return new Number(value).valueOf();
        }
        else {
            return value;
        }
    };
    /**
     * 获取配置的所有内容
     */
    ConfigBase.prototype.getContent = function () {
        return this.content;
    };
    return ConfigBase;
}());
exports.default = ConfigBase;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxjb25maWdcXENvbmZpZ0Jhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7R0FFRztBQUNIO0lBQUE7UUFNSSxJQUFJO1FBQ0csWUFBTyxHQUFPLEVBQUUsQ0FBQztJQXdDNUIsQ0FBQztJQXRDRzs7Ozs7T0FLRztJQUNJLDZCQUFRLEdBQWYsVUFBZ0IsR0FBTyxFQUFFLFlBQWlCLEVBQUUsSUFBWTtRQUVwRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLElBQUcsS0FBSyxJQUFJLElBQUksRUFBRTtZQUNkLElBQUcsWUFBWSxJQUFJLElBQUksRUFBRTtnQkFDckIsT0FBTyxZQUFZLENBQUM7YUFDdkI7WUFDRCxPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsSUFBSSxTQUFTLEdBQUcsT0FBTyxLQUFLLENBQUM7UUFDN0IsSUFBRyxJQUFJLElBQUksSUFBSSxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFDbkMsT0FBTyxLQUFLLENBQUM7U0FDaEI7YUFDSSxJQUFHLElBQUksSUFBSSxRQUFRLEVBQUU7WUFDdEIsT0FBTyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDM0I7YUFDSSxJQUFHLElBQUksSUFBSSxRQUFRLEVBQUU7WUFDdEIsT0FBTyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN0QzthQUNJO1lBQ0QsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSSwrQkFBVSxHQUFqQjtRQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUwsaUJBQUM7QUFBRCxDQS9DQSxBQStDQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOmFjee9ruWvueW6lOeahOexu1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZmlnQmFzZVxyXG57XHJcbiAgICAvL+WIq+WQjSzlpoLmnpzmsqHmnInnibnliKvmjIflrpos6L+Z5Liq5YC85ZKMZnVsbE5hbWXnmoTlgLznm7jlkIxcclxuICAgIHB1YmxpYyBhbGlhczpzdHJpbmc7XHJcbiAgICAvL+WFqOi3r+W+hFxyXG4gICAgcHVibGljIGZ1bGxOYW1lOnN0cmluZztcclxuICAgIC8v5YaF5a65XHJcbiAgICBwdWJsaWMgY29udGVudDphbnkgPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNrmtleeiOt+W+l+WvueW6lOeahOWAvFxyXG4gICAgICogQHBhcmFtIGtleSDlrZfmrrXnmoRrZXlcclxuICAgICAqIEBwYXJhbSBkZWZhdWx0VmFsdWUg5b2T5rKh5pyJ5om+5Yiw5a+55bqU5YC85pe26L+U5Zue55qE6buY6K6k5YC8XHJcbiAgICAgKiBAcGFyYW0gdHlwZSDov5Tlm57lgLznmoTnsbvlnoss55uu5YmN5Y+q5pSv5oyB77yac3RyaW5nLCBudW1iZXIs5YW25LuW57G75Z6L5peg5pWIXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRWYWx1ZShrZXk6YW55LCBkZWZhdWx0VmFsdWU/OmFueSwgdHlwZT86c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuY29udGVudFtrZXkudG9TdHJpbmcoKV07XHJcbiAgICAgICAgaWYodmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZihkZWZhdWx0VmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB2YWx1ZVR5cGUgPSB0eXBlb2YgdmFsdWU7XHJcbiAgICAgICAgaWYodHlwZSA9PSBudWxsIHx8IHZhbHVlVHlwZSA9PT0gdHlwZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodHlwZSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHR5cGUgPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE51bWJlcih2YWx1ZSkudmFsdWVPZigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlumFjee9rueahOaJgOacieWGheWuuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q29udGVudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50O1xyXG4gICAgfVxyXG5cclxufSJdfQ==