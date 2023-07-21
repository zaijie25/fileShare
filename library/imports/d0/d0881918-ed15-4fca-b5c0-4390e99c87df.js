"use strict";
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