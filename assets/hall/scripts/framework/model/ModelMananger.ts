import ModelBase from "./ModelBase";

/**
 * 各数据模块管理器
 */
export default class ModelManager
{
    protected modelMap:{[key:string]:ModelBase} = {};

    private static _instance:ModelManager;
    public static get Instance() {
        if(ModelManager._instance == null) {
            ModelManager._instance = new ModelManager();
        }
        return ModelManager._instance;
    }

    protected constructor() {

    }

    /**
     * 初始化函数
     */
    public init() {

    }

    /**
     * 根据名字获取对应的数据模块(非泛型方式)
     * @param modelName 数据模块名字
     */
    public getModel(modelName:string):any {
        if(this.modelMap[modelName] == null) {
            Logger.log("ModelManager::getModel() 未找到 " + modelName);
            return null;
        }
        return this.modelMap[modelName];
    }

    /**
     * 根据名字获取对应的数据模块(泛型方式)
     * @param modelName 数据模块名字
     */
    public getModelEx<T extends ModelBase>(modelName:string):T {
        if(this.modelMap[modelName] == null) {
            Logger.log("ModelManager::getModelEx() 未找到 " + modelName);
            return null;
        }
        return this.modelMap[modelName] as T;
    }

    /**
     * 注册数据模块
     * @param model 数据模块实例
     */
    public registerModel(model:ModelBase) {
        if(model == null) {
            Logger.error("ModelManager::registerModel() model == null, return");
            return;
        }
        if(model.Name == "" || model.Name == "ModelBase") {
            Logger.error("ModelManager::registerModel() 请在构造函数中给model模块指定名字, return");
            return;
        }
        if(this.modelMap.hasOwnProperty(model.Name))
        {
            Logger.log("ModelManager::registerModel() 重复注册 " + model.Name);
            return;
        }
        this.modelMap[model.Name] = model;
    }

    /**
     * 反注册数据模块
     * @param modelName 数据模块名字
     */
    public unRegisterModel(modelName:string) {
        if(this.modelMap.hasOwnProperty(modelName)) {
            let model:ModelBase = this.modelMap[modelName];
            if(model != null) {
                model.clear();
            }
            this.modelMap[modelName] = null;
        }
    }
    
    /**
     * 反注册所有数据模块
     * @param modelName 数据模块名字
     */
    public unRegisterAll() {
        this.clear();
        this.modelMap = {};
    }

    /**
     * 清理所有数据模块
     */
    public clear() {
        for(let key in this.modelMap) {
            let model:ModelBase = this.modelMap[key];
            if(model != null) {
                model.clear();
            }
        }
    }

}