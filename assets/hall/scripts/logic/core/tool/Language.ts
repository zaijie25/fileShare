export default class Language
{
    private languageMap = {};

    //每个场景注册自己的语言包
    public registLanguage(languagePath)
    {
        if(languagePath == "")
            return;
        Global.ResourceManager.loadRes(languagePath, (error, jsonAsset)=>
        {
            if(error != null)
            {
                Logger.error("加载语言包失败", languagePath);
                return;
            }
            if(jsonAsset == null || jsonAsset.json == null)
                return;
            for(let key in jsonAsset.json)
            {
                if(this.languageMap[key] != null)
                {
                    Logger.error("重复注册语言包", key, this.languageMap[key])
                    return;
                }
                this.languageMap[key] = jsonAsset.json[key].content;
            }

        }, cc.JsonAsset)
    }

    public getWord(key)
    {
        let word = this.languageMap[key];
        if(word == null)
        {
            Logger.error("找不到语言包", key);
            return "";
        }
        return word;
    }

    public getWordEx(key, ...args)
    {
        let word = this.getWord(key);
        let param = [word];
        if(args)
        {
            for(let i = 0; i < args.length; i++)
            {
                param.push(args[i]);
            }
        }
        return cc.js.formatStr.apply(param);
    }
}