//子界面管理组件
export default class ViewSet
{
    private viewMap = {}

    public registView(key:string, view:any)
    {
        if(this.viewMap[key] != null)
        {
            Logger.error("重复注册组件", key);
            return;
        }
        this.viewMap[key] = view;
    }

    public getView(key:string)
    {
        if(this.viewMap[key] == null)
        {
            Logger.error("找不到组件", key);
        }
        return this.viewMap[key];
    }

    public getViewEx<T>(key):T
    {
        let view = this.getView(key);
        if(view != null)
            return view as T;
        return view;
    }

    public callView(key:string, func:string, ...args)
    {
        let view = this.getView(key);
        if(view[func] && view[func].apply)
        {
            return view[func].apply(view, args);
        }
        return null;
    }

    //对所有组件调用方法
    public callAll(func:string, ...args)
    {
        for(let key in this.viewMap)
        {
            let view = this.getView(key);
            if(view[func] && view[func].apply)
            {
                view[func].apply(view, args);
            }
        }
    }

    //暂时不提供删除功能
    //有需要再添加

}