"use strict";
cc._RF.push(module, '96635gKJrJIipoo7oG+br39', 'ModelMananger');
// hall/scripts/framework/model/ModelMananger.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 各数据模块管理器
 */
var ModelManager = /** @class */ (function () {
    function ModelManager() {
        this.modelMap = {};
    }
    Object.defineProperty(ModelManager, "Instance", {
        get: function () {
            if (ModelManager._instance == null) {
                ModelManager._instance = new ModelManager();
            }
            return ModelManager._instance;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 初始化函数
     */
    ModelManager.prototype.init = function () {
    };
    /**
     * 根据名字获取对应的数据模块(非泛型方式)
     * @param modelName 数据模块名字
     */
    ModelManager.prototype.getModel = function (modelName) {
        if (this.modelMap[modelName] == null) {
            Logger.log("ModelManager::getModel() 未找到 " + modelName);
            return null;
        }
        return this.modelMap[modelName];
    };
    /**
     * 根据名字获取对应的数据模块(泛型方式)
     * @param modelName 数据模块名字
     */
    ModelManager.prototype.getModelEx = function (modelName) {
        if (this.modelMap[modelName] == null) {
            Logger.log("ModelManager::getModelEx() 未找到 " + modelName);
            return null;
        }
        return this.modelMap[modelName];
    };
    /**
     * 注册数据模块
     * @param model 数据模块实例
     */
    ModelManager.prototype.registerModel = function (model) {
        if (model == null) {
            Logger.error("ModelManager::registerModel() model == null, return");
            return;
        }
        if (model.Name == "" || model.Name == "ModelBase") {
            Logger.error("ModelManager::registerModel() 请在构造函数中给model模块指定名字, return");
            return;
        }
        if (this.modelMap.hasOwnProperty(model.Name)) {
            Logger.log("ModelManager::registerModel() 重复注册 " + model.Name);
            return;
        }
        this.modelMap[model.Name] = model;
    };
    /**
     * 反注册数据模块
     * @param modelName 数据模块名字
     */
    ModelManager.prototype.unRegisterModel = function (modelName) {
        if (this.modelMap.hasOwnProperty(modelName)) {
            var model = this.modelMap[modelName];
            if (model != null) {
                model.clear();
            }
            this.modelMap[modelName] = null;
        }
    };
    /**
     * 反注册所有数据模块
     * @param modelName 数据模块名字
     */
    ModelManager.prototype.unRegisterAll = function () {
        this.clear();
        this.modelMap = {};
    };
    /**
     * 清理所有数据模块
     */
    ModelManager.prototype.clear = function () {
        for (var key in this.modelMap) {
            var model = this.modelMap[key];
            if (model != null) {
                model.clear();
            }
        }
    };
    return ModelManager;
}());
exports.default = ModelManager;

cc._RF.pop();