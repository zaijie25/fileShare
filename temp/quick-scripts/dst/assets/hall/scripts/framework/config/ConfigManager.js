
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/config/ConfigManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '64df1yrM/pL1rp+d0vwKnmC', 'ConfigManager');
// hall/scripts/framework/config/ConfigManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigBase_1 = require("./ConfigBase");
var ConfigDefine = /** @class */ (function () {
    function ConfigDefine() {
    }
    ConfigDefine.appCfg = "appconfig";
    ConfigDefine.jcGameCfg = "jcgame";
    ConfigDefine.jcAppCfg = "jcapp";
    return ConfigDefine;
}());
/**
 * 配置管理器,目前只支持json格式的
 */
var ConfigManager = /** @class */ (function () {
    function ConfigManager() {
        this.requiredConfigList = [
            ConfigDefine.appCfg,
            ConfigDefine.jcGameCfg,
            ConfigDefine.jcAppCfg,
        ];
        this.cfgMap = {};
    }
    Object.defineProperty(ConfigManager, "Instance", {
        get: function () {
            if (ConfigManager._instance == null) {
                ConfigManager._instance = new ConfigManager();
            }
            return ConfigManager._instance;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 初始化函数
     * @param complete
     */
    ConfigManager.prototype.init = function (complete) {
        var fullNameArray = [];
        for (var i = 0; i < this.requiredConfigList.length; i++) {
            var fullName = this.getJsonFullName(this.requiredConfigList[i]);
            fullNameArray.push(fullName);
        }
        this.loadCfg(fullNameArray, complete, this.requiredConfigList);
    };
    /**
     * 加载配置
     * @param fullNames 配置文件全路径
     * @param onComplete 加载完成后的回调
     * @param aliases 配置文件的别名,这个值默认为配置文件全路径
     */
    ConfigManager.prototype.loadCfg = function (fullNames, onComplete, aliases) {
        Global.ResourceManager.loadResArr(fullNames, function (error, assets) {
            if (error != null) {
                Logger.error("ConfigManager::loadCfg() loadResArr error = " + error + ", return!!!");
                return;
            }
            for (var i = 0; i < fullNames.length; i++) {
                var fullName = fullNames[i];
                var content = assets[i];
                if (content != null) {
                    var json = JSON.parse(content);
                    if (json == null) {
                        Logger.error("ConfigManager::loadCfg() json == null, cfgPath = " + fullName);
                    }
                    else {
                        var config = new ConfigBase_1.default();
                        config.alias = (aliases != null && aliases.length > i && aliases[i].length > 0) ? aliases[i] : fullName;
                        config.fullName = fullName;
                        config.content = json;
                        this.cfgMap[config.alias] = config;
                    }
                }
            }
            if (onComplete != null) {
                onComplete(error, assets);
            }
            for (var i = 0; i < fullNames.length; i++) {
                Global.ResourceManager.releaseRes(fullNames[i]);
            }
        });
    };
    /**
     * 卸载配置
     * @param cfgName 配置文件的别名或者全路径
     */
    ConfigManager.prototype.unloadCfg = function (cfgName) {
        var config = this.getCfg(cfgName);
        if (config != null) {
            this.cfgMap[config.alias] = null;
            return true;
        }
        return false;
    };
    /**
     * 获得配置对象
     * @param cfgName 配置文件的别名或者全路径
     * @returns ConfigBase对象
     */
    ConfigManager.prototype.getCfg = function (cfgName) {
        if (this.cfgMap[cfgName] != null) {
            return this.cfgMap[cfgName];
        }
        else {
            for (var key in this.cfgMap) {
                if (this.cfgMap[key].fullName == cfgName) {
                    return this.cfgMap[key];
                }
            }
        }
        return null;
    };
    /**
     * 获取配置里某个字段对应的值
     * @param cfgName 配置文件的别名或者全路径
     * @param key 字段的key
     * @param defaultValue 当没有找到对应值时返回的默认值
     * @param type 返回值的类型,目前只支持：string, number,其他类型无效
     */
    ConfigManager.prototype.getValue = function (cfgName, key, defaultValue, type) {
        var cfg = this.getCfg(cfgName);
        if (cfg == null)
            return null;
        return cfg.getValue(key, defaultValue, type);
    };
    /**
     * 获取配置的所有内容
     * @param cfgName 配置文件的别名或者全路径
     */
    ConfigManager.prototype.getCotent = function (cfgName) {
        var cfg = this.getCfg(cfgName);
        if (cfg == null)
            return null;
        return cfg.getContent();
    };
    /**
     *
     * @param configName
     */
    ConfigManager.prototype.getJsonFullName = function (configName) {
        return "config/" + configName + ".json";
    };
    return ConfigManager;
}());
exports.default = ConfigManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxjb25maWdcXENvbmZpZ01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBc0M7QUFFdEM7SUFBQTtJQUtBLENBQUM7SUFIMEIsbUJBQU0sR0FBRyxXQUFXLENBQUM7SUFDckIsc0JBQVMsR0FBRyxRQUFRLENBQUM7SUFDckIscUJBQVEsR0FBRyxPQUFPLENBQUM7SUFDOUMsbUJBQUM7Q0FMRCxBQUtDLElBQUE7QUFFRDs7R0FFRztBQUNIO0lBbUJJO1FBakJTLHVCQUFrQixHQUMzQjtZQUNJLFlBQVksQ0FBQyxNQUFNO1lBQ25CLFlBQVksQ0FBQyxTQUFTO1lBQ3RCLFlBQVksQ0FBQyxRQUFRO1NBQ3hCLENBQUE7UUFFRCxXQUFNLEdBQTZCLEVBQUUsQ0FBQztJQVl0QyxDQUFDO0lBVEQsc0JBQWtCLHlCQUFRO2FBQTFCO1lBQ0ksSUFBRyxhQUFhLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtnQkFDaEMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO2FBQ2pEO1lBQ0QsT0FBTyxhQUFhLENBQUMsU0FBUyxDQUFDO1FBQ25DLENBQUM7OztPQUFBO0lBTUQ7OztPQUdHO0lBQ0ksNEJBQUksR0FBWCxVQUFZLFFBQWlCO1FBRXpCLElBQUksYUFBYSxHQUFZLEVBQUUsQ0FBQztRQUNoQyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFDdEQ7WUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDaEM7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFD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SSxPQUFPLEVBQ3hDO29CQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDM0I7YUFDSjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLGdDQUFRLEdBQWYsVUFBZ0IsT0FBYyxFQUFFLEdBQU8sRUFBRSxZQUFpQixFQUFFLElBQVk7UUFFcEUsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQixJQUFHLEdBQUcsSUFBSSxJQUFJO1lBQ1YsT0FBTyxJQUFJLENBQUM7UUFDaEIsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGlDQUFTLEdBQWhCLFVBQWlCLE9BQWM7UUFDM0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQixJQUFHLEdBQUcsSUFBSSxJQUFJO1lBQ1YsT0FBTyxJQUFJLENBQUM7UUFDaEIsT0FBTyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7T0FHRztJQUNLLHVDQUFlLEdBQXZCLFVBQXdCLFVBQVU7UUFFOUIsT0FBTyxTQUFTLEdBQUcsVUFBVSxHQUFHLE9BQU8sQ0FBQztJQUM1QyxDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQXhKQSxBQXdKQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbmZpZ0Jhc2UgZnJvbSBcIi4vQ29uZmlnQmFzZVwiO1xyXG5cclxuY2xhc3MgQ29uZmlnRGVmaW5lXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgYXBwQ2ZnID0gXCJhcHBjb25maWdcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgamNHYW1lQ2ZnID0gXCJqY2dhbWVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgamNBcHBDZmcgPSBcImpjYXBwXCI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDphY3nva7nrqHnkIblmags55uu5YmN5Y+q5pSv5oyBanNvbuagvOW8j+eahFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZmlnTWFuYWdlclxyXG57XHJcbiAgICByZWFkb25seSByZXF1aXJlZENvbmZpZ0xpc3QgOiBzdHJpbmdbXSA9XHJcbiAgICBbXHJcbiAgICAgICAgQ29uZmlnRGVmaW5lLmFwcENmZyxcclxuICAgICAgICBDb25maWdEZWZpbmUuamNHYW1lQ2ZnLFxyXG4gICAgICAgIENvbmZpZ0RlZmluZS5qY0FwcENmZyxcclxuICAgIF1cclxuXHJcbiAgICBjZmdNYXA6e1trZXk6c3RyaW5nXTpDb25maWdCYXNlfSA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTpDb25maWdNYW5hZ2VyO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKSB7XHJcbiAgICAgICAgaWYoQ29uZmlnTWFuYWdlci5faW5zdGFuY2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBDb25maWdNYW5hZ2VyLl9pbnN0YW5jZSA9IG5ldyBDb25maWdNYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBDb25maWdNYW5hZ2VyLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gY29tcGxldGUgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0KGNvbXBsZXRlOkZ1bmN0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBmdWxsTmFtZUFycmF5OnN0cmluZ1tdID0gW107XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucmVxdWlyZWRDb25maWdMaXN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGZ1bGxOYW1lID0gdGhpcy5nZXRKc29uRnVsbE5hbWUodGhpcy5yZXF1aXJlZENvbmZpZ0xpc3RbaV0pO1xyXG4gICAgICAgICAgICBmdWxsTmFtZUFycmF5LnB1c2goZnVsbE5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvYWRDZmcoZnVsbE5hbWVBcnJheSwgY29tcGxldGUsIHRoaXMucmVxdWlyZWRDb25maWdMaXN0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9vemFjee9rlxyXG4gICAgICogQHBhcmFtIGZ1bGxOYW1lcyDphY3nva7mlofku7blhajot6/lvoRcclxuICAgICAqIEBwYXJhbSBvbkNvbXBsZXRlIOWKoOi9veWujOaIkOWQjueahOWbnuiwg1xyXG4gICAgICogQHBhcmFtIGFsaWFzZXMg6YWN572u5paH5Lu255qE5Yir5ZCNLOi/meS4quWAvOm7mOiupOS4uumFjee9ruaWh+S7tuWFqOi3r+W+hFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZENmZyhmdWxsTmFtZXM6c3RyaW5nW10sIG9uQ29tcGxldGU/OkZ1bmN0aW9uLCBhbGlhc2VzPzpzdHJpbmdbXSlcclxuICAgIHtcclxuICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRSZXNBcnIoZnVsbE5hbWVzLCBmdW5jdGlvbiAoZXJyb3IsIGFzc2V0cykge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiQ29uZmlnTWFuYWdlcjo6bG9hZENmZygpIGxvYWRSZXNBcnIgZXJyb3IgPSBcIiArIGVycm9yICsgXCIsIHJldHVybiEhIVwiKTtcclxuXHRcdCAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxmdWxsTmFtZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBmdWxsTmFtZSA9IGZ1bGxOYW1lc1tpXTtcclxuICAgICAgICAgICAgICAgIGxldCBjb250ZW50ID0gIGFzc2V0c1tpXTtcclxuICAgICAgICAgICAgICAgIGlmKGNvbnRlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBqc29uID0gSlNPTi5wYXJzZShjb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBpZihqc29uID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiQ29uZmlnTWFuYWdlcjo6bG9hZENmZygpIGpzb24gPT0gbnVsbCwgY2ZnUGF0aCA9IFwiICsgZnVsbE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWdCYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZy5hbGlhcyA9IChhbGlhc2VzICE9IG51bGwgJiYgYWxpYXNlcy5sZW5ndGg+aSAmJiBhbGlhc2VzW2ldLmxlbmd0aCA+IDApID8gYWxpYXNlc1tpXSA6IGZ1bGxOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWcuZnVsbE5hbWUgPSBmdWxsTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLmNvbnRlbnQgPSBqc29uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNmZ01hcFtjb25maWcuYWxpYXNdID0gY29uZmlnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYob25Db21wbGV0ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlKGVycm9yLCBhc3NldHMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxmdWxsTmFtZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIucmVsZWFzZVJlcyhmdWxsTmFtZXNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDljbjovb3phY3nva5cclxuICAgICAqIEBwYXJhbSBjZmdOYW1lIOmFjee9ruaWh+S7tueahOWIq+WQjeaIluiAheWFqOi3r+W+hFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdW5sb2FkQ2ZnKGNmZ05hbWU6c3RyaW5nKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IHRoaXMuZ2V0Q2ZnKGNmZ05hbWUpO1xyXG4gICAgICAgIGlmKGNvbmZpZyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2ZnTWFwW2NvbmZpZy5hbGlhc10gPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635b6X6YWN572u5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gY2ZnTmFtZSDphY3nva7mlofku7bnmoTliKvlkI3miJbogIXlhajot6/lvoRcclxuICAgICAqIEByZXR1cm5zIENvbmZpZ0Jhc2Xlr7nosaFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENmZyhjZmdOYW1lOnN0cmluZyk6Q29uZmlnQmFzZVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuY2ZnTWFwW2NmZ05hbWVdICE9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jZmdNYXBbY2ZnTmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMuY2ZnTWFwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiggdGhpcy5jZmdNYXBba2V5XS5mdWxsTmFtZSA9PSBjZmdOYW1lKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNmZ01hcFtrZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6YWN572u6YeM5p+Q5Liq5a2X5q615a+55bqU55qE5YC8XHJcbiAgICAgKiBAcGFyYW0gY2ZnTmFtZSDphY3nva7mlofku7bnmoTliKvlkI3miJbogIXlhajot6/lvoRcclxuICAgICAqIEBwYXJhbSBrZXkg5a2X5q6155qEa2V5XHJcbiAgICAgKiBAcGFyYW0gZGVmYXVsdFZhbHVlIOW9k+ayoeacieaJvuWIsOWvueW6lOWAvOaXtui/lOWbnueahOm7mOiupOWAvFxyXG4gICAgICogQHBhcmFtIHR5cGUg6L+U5Zue5YC855qE57G75Z6LLOebruWJjeWPquaUr+aMge+8mnN0cmluZywgbnVtYmVyLOWFtuS7luexu+Wei+aXoOaViFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VmFsdWUoY2ZnTmFtZTpzdHJpbmcsIGtleTphbnksIGRlZmF1bHRWYWx1ZT86YW55LCB0eXBlPzpzdHJpbmcpOmFueVxyXG4gICAge1xyXG4gICAgICAgIGxldCBjZmcgPSB0aGlzLmdldENmZyhjZmdOYW1lKTtcclxuICAgICAgICBpZihjZmcgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIGNmZy5nZXRWYWx1ZShrZXksZGVmYXVsdFZhbHVlLCB0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlumFjee9rueahOaJgOacieWGheWuuVxyXG4gICAgICogQHBhcmFtIGNmZ05hbWUg6YWN572u5paH5Lu255qE5Yir5ZCN5oiW6ICF5YWo6Lev5b6EXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDb3RlbnQoY2ZnTmFtZTpzdHJpbmcpOmFueSB7XHJcbiAgICAgICAgbGV0IGNmZyA9IHRoaXMuZ2V0Q2ZnKGNmZ05hbWUpO1xyXG4gICAgICAgIGlmKGNmZyA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gY2ZnLmdldENvbnRlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGNvbmZpZ05hbWUgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0SnNvbkZ1bGxOYW1lKGNvbmZpZ05hbWUpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcImNvbmZpZy9cIiArIGNvbmZpZ05hbWUgKyBcIi5qc29uXCI7XHJcbiAgICB9XHJcbn0iXX0=