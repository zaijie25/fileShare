"use strict";
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