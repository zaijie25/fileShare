import ConfigBase from "./ConfigBase";

class ConfigDefine
{
    public static readonly appCfg = "appconfig";
    public static readonly jcGameCfg = "jcgame";
    public static readonly jcAppCfg = "jcapp";
}

/**
 * 配置管理器,目前只支持json格式的
 */
export default class ConfigManager
{
    readonly requiredConfigList : string[] =
    [
        ConfigDefine.appCfg,
        ConfigDefine.jcGameCfg,
        ConfigDefine.jcAppCfg,
    ]

    cfgMap:{[key:string]:ConfigBase} = {};

    private static _instance:ConfigManager;
    public static get Instance() {
        if(ConfigManager._instance == null) {
            ConfigManager._instance = new ConfigManager();
        }
        return ConfigManager._instance;
    }

    protected constructor() {

    }

    /**
     * 初始化函数
     * @param complete 
     */
    public init(complete:Function)
    {
        let fullNameArray:string[] = [];
        for(let i = 0; i < this.requiredConfigList.length; i++)
        {
            let fullName = this.getJsonFullName(this.requiredConfigList[i]);
            fullNameArray.push(fullName);
        }
        this.loadCfg(fullNameArray, complete, this.requiredConfigList);
    }

    /**
     * 加载配置
     * @param fullNames 配置文件全路径
     * @param onComplete 加载完成后的回调
     * @param aliases 配置文件的别名,这个值默认为配置文件全路径
     */
    public loadCfg(fullNames:string[], onComplete?:Function, aliases?:string[])
    {
        Global.ResourceManager.loadResArr(fullNames, function (error, assets) {
            if (error != null) {
                Logger.error("ConfigManager::loadCfg() loadResArr error = " + error + ", return!!!");
		        return;
            }
            
            for(let i=0; i<fullNames.length; i++) {
                let fullName = fullNames[i];
                let content =  assets[i];
                if(content != null) {
                    let json = JSON.parse(content);
                    if(json == null) {
                        Logger.error("ConfigManager::loadCfg() json == null, cfgPath = " + fullName);
                    }
                    else {
                        let config = new ConfigBase();
                        config.alias = (aliases != null && aliases.length>i && aliases[i].length > 0) ? aliases[i] : fullName;
                        config.fullName = fullName;
                        config.content = json;
                        this.cfgMap[config.alias] = config;
                    }
                }
            }
            
            if(onComplete != null) {
                onComplete(error, assets);
            }

            for(let i=0; i<fullNames.length; i++) {
                Global.ResourceManager.releaseRes(fullNames[i]);
            }
        });
    }

    /**
     * 卸载配置
     * @param cfgName 配置文件的别名或者全路径
     */
    public unloadCfg(cfgName:string):boolean
    {
        let config = this.getCfg(cfgName);
        if(config != null) {
            this.cfgMap[config.alias] = null;
            return true;
        }
        return false;
    }

    /**
     * 获得配置对象
     * @param cfgName 配置文件的别名或者全路径
     * @returns ConfigBase对象
     */
    public getCfg(cfgName:string):ConfigBase
    {
        if(this.cfgMap[cfgName] != null)
        {
            return this.cfgMap[cfgName];
        }
        else
        {
            for(let key in this.cfgMap)
            {
                if( this.cfgMap[key].fullName == cfgName)
                {
                    return this.cfgMap[key];
                }
            }
        }
        return null;
    }

    /**
     * 获取配置里某个字段对应的值
     * @param cfgName 配置文件的别名或者全路径
     * @param key 字段的key
     * @param defaultValue 当没有找到对应值时返回的默认值
     * @param type 返回值的类型,目前只支持：string, number,其他类型无效
     */
    public getValue(cfgName:string, key:any, defaultValue?:any, type?:string):any
    {
        let cfg = this.getCfg(cfgName);
        if(cfg == null)
            return null;
        return cfg.getValue(key,defaultValue, type);
    }

    /**
     * 获取配置的所有内容
     * @param cfgName 配置文件的别名或者全路径
     */
    public getCotent(cfgName:string):any {
        let cfg = this.getCfg(cfgName);
        if(cfg == null)
            return null;
        return cfg.getContent();
    }

    /**
     * 
     * @param configName 
     */
    private getJsonFullName(configName):string
    {
        return "config/" + configName + ".json";
    }
}