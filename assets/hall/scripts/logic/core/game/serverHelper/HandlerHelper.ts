import BaseGameHandler from "../BaseGameHandler";
import BaseServerHelper from "./BaseServerHelper";

export default class HandlerHelper extends BaseServerHelper
{
    public handlerMap:{} = {}

    //主要存放公共handler    一类型游戏可以配置一套defaultMap   handlerMap注册差异函数
    public defaultHandlerMap:{} = {}

    //每个游戏注册一次Handler    key为服务器协议字段
    public registHandler(key:any, handlerInstance:any)
    {
        if(this.handlerMap[key] != null)
        {
            Logger.error("重复注册handler", key);
        }
        this.handlerMap[key] = handlerInstance;
    }

    public registDefaultHandler(key:any, handlerInstance:any)
    {
        if(this.defaultHandlerMap[key] != null)
        {
            Logger.error("重复注册defaulthandler", key);
        }
        this.defaultHandlerMap[key] = handlerInstance;
    }

    public removeHandler(key:any)
    {
        if(this.handlerMap[key])
            this.handlerMap[key] = null;
    }

    public clearHandlers()
    {
        this.handlerMap = {}
        this.defaultHandlerMap = {}
    }

    public getHandler(key:any):any
    {
        let handler = this.handlerMap[key];
        if(handler == null)
            handler = this.defaultHandlerMap[key];
        
        if(handler == null)
        {
            Logger.error("没有找到对应处理handler", key);
        }
        return handler;
    }
}