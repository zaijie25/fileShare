import { Logger } from "../debug/Logger";

export default class Storage
{
    //默认为string格式存储  包括数字
    public set(key:string, value:any)
    {
        if(value == null)
            value = ""
        let newKey = this.getFinalKey(key);
        cc.sys.localStorage.setItem(newKey, value)
    }

    public setObject(key, value)
    {
        if(value == null)
            return;
        let content = ""
        try
        {
            content = JSON.stringify(value)
            this.set(key, content);
        }
        catch(e)
        {
            Logger.error("Storage.setObject 出错", e && e.message)
            return;
        }
    }

    public setBool(key, value:boolean)
    {
        let content = value? "1" : "0"
        this.set(key, content);
    }

    public hasKey(key)
    {
        return this.get(key) != ""
    }


    public get(key)
    {
        let newKey = this.getFinalKey(key);
        let value = cc.sys.localStorage.getItem(newKey);
        if(value == null)
            value = ""
        return value;
    }

    public getNumber(key, defalut = 0)
    {
        let content = this.get(key);
        if(content == "")
            return defalut;
        let value = Number(content);
        if(!isNaN(value))
            return value
        else    
            return defalut;
    }

    public getObject(key):any
    {
        let content = this.get(key);
        if(content == "")
            return null;
        let obj = null;
        try
        {
            obj = JSON.parse(content);
        }
        catch(e)
        {
           Logger.error("Storage.getObject 出错", e && e.message)
        }
        return obj;
    }

    public getBool(key):boolean
    {
        let content = this.get(key);
        return content == "1";
    }

    public removeKey(key)
    {
        let newKey = this.getFinalKey(key); 
        cc.sys.localStorage.removeItem(newKey);
    }


    //对key做加工
    private getFinalKey(key)
    {
        return key;
    }
}