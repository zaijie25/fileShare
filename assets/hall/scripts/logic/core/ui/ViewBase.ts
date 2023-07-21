import EventDispatcher from "../../../framework/event/EventDispatcher";
import { DestoryType } from "./WndBase";

export default class ViewBase
{
    public node:cc.Node;

    //子view的key  wnd不适用
    public viewKey:string;

    //private resPath :string
    protected viewList:ViewBase[] = [];

    
    protected _subViewState 
    /**
     * 子view的显示隐藏状态
     */
    public get subViewState()
    {
        return this._subViewState
    }

    /**
     * 子view状态 true 显示 false 隐藏 
     */
    public set subViewState(value) {
        if(this._subViewState == value)
        {
            return
        }
        this._subViewState = value
        if (this.loadingState != LoadingState.Loaded || !cc.isValid(this.node)) {
            return
        }

        this.node.active = value

        if (value) {
            this.onSubViewShow()
        }
        else {
            this.onSubViewHide()
        }
    }

    protected _loadingState:LoadingState = LoadingState.None


    /**
     * 子view加载状态
     */
    set loadingState (state:LoadingState)
    {
        /**
         * 如果加载完成时subViewState为true则说明 需要显示
         */
        if(this.subViewState == true && state == LoadingState.Loaded)
        {
            this.onSubViewShow()
            if(cc.isValid(this.node))
            {
                this.node.active = true
            }
            
        }
        this._loadingState = state
    }

     /**
     * 子view加载状态
     */
    get loadingState()
    {
        return this._loadingState
    }

   

    //内部事件  负责组件之间同信  wnd创建 传递给子view
    protected internalEvent:EventDispatcher;

    protected _active = false;
    
    public set active(value) {
        this._active = value;
        if (this.node && cc.isValid(this.node)) {
            this.node.active = value;
        }
    }

    public get active() {
        return this._active;
    }

    public setNode(node:cc.Node)
    {
        if(node == null)
            return;
        this.node = node;
        this.initView();
    }

    //界面加载完后初始化
    protected initView()
    {}
    //面板打开回调
    protected onOpen(args?:any[])
    {}
    //界面关闭时回调
    protected onClose()
    {}

    //界面销毁
    protected onDispose()
    {}

    protected onSubViewShow()
    {
       
    }

    protected onSubViewHide()
    {
       
    }
    

    public getComponent<T extends cc.Component>(path:string, type:any):T
    {
        if(this.node == null)
            return null;
        if(path == "" || path == null)
            return this.node.getComponent(type);
        let node = cc.find(path, this.node);
        if(node == null)
            return null;
        return node.getComponent(type);
    }

    public getChild(path:string):cc.Node
    {
        if (path === ""){
            return this.node;
        }
        return cc.find(path, this.node);
    }

    protected addCommonClick(path:string, callback:Function, target?:any, transition = cc.Button.Transition.SCALE, time?:number)
    {
        return Global.UIHelper.addCommonClick(this.node, path, callback, target, transition, time);
    }

    public addView(key:string, node:cc.Node, viewClass, active = null)
    {
        let view = this.getView(key)
        if( view != null)
        {
            Logger.error("重复注册子View");
            return view;
        }
        if(node == null)
        {
            Logger.error("没有给子View设置节点");
            return;
        }
        view = new viewClass();
        view.internalEvent = this.internalEvent;
        view.setNode(node);
        view.loadingState = LoadingState.Loaded
        view.viewKey = key;
        this.viewList.push(view);

        if(active != null)
        {
            view.subViewState = active;
        }
        return view
    }

    /**
     * 
     * @param subViewPath key 跟预设资源的映射
     * @param viewKeyTypeMap key 跟类型的预设
     * @param parentNode 子view的父节点
     */
    initSubView(subViewPath,viewKeyTypeMap,parentNode) {
        if(!subViewPath || !viewKeyTypeMap || !parentNode)
        {
            return
        }
        let frameLoadingKey = []
        for (let key in subViewPath) {
            if (subViewPath.hasOwnProperty(key)) {
                frameLoadingKey.push(key)
            }
        }
        return new Promise(resolve => {
            let execute = async () => {
                while (frameLoadingKey.length > 0) {
                    let loadingKey = frameLoadingKey.shift()
                    let path = null
                    if (subViewPath.hasOwnProperty(loadingKey)) {
                        path = subViewPath[loadingKey]
                    }
                    this[loadingKey] = await this.addSubView(loadingKey, viewKeyTypeMap[loadingKey],path,parentNode);
                }
                resolve()
            };
            // 运行执行函数
            execute();
        });

    }

    /**
     * 初始化子View组件 不含node
     */
    public initSubViewClass(viewKeyTypeMap:any)
    {
        if(!viewKeyTypeMap)
        {
            return
        }
        for (let key in viewKeyTypeMap) {
            if (viewKeyTypeMap.hasOwnProperty(key)) {
                this[key] = this.initOneSubView(key,viewKeyTypeMap[key])
            }
        }
    }

    public initOneSubView(key,viewClass)
    {
        let view = this.getView(key)
        if( view != null)
        {
            Logger.error("重复注册子View");
            return view;
        }
        view = new viewClass();
        view.internalEvent = this.internalEvent;
        view.viewKey = key;
        this.viewList.push(view);
        return view
    }

    /**
     * 初始化子view含Node
     * @param key viewKey
     * @param viewClass 子view类
     * @param path 预设资源路径
     * @param parentNode 子view父节点
     */
    public async addSubView(key:string,viewClass,path:string,parentNode:cc.Node)
    {
        let view = this.getView(key)
        if( view == null)
        {
            view = new viewClass();
            view.internalEvent = this.internalEvent;
            view.viewKey = key;
            this.viewList.push(view);
        }
        view.loadingState = LoadingState.Loading
        let node = await  this.getSubView(path) as cc.Node
        if (!node) {
            return null  
        }
        view.setNode(node)
        node.active = false
        parentNode.addChild(node)
        view.loadingState = LoadingState.Loaded
        return view
    }

    
    /**
     * 
     * @param path 加载子View的预设的资源路径
     * @param viewKey 子view的viewKey
     */
    public  async getSubView(path:string)
    {
        if(!path)
        {
            return
        }
        return  await this.loadOneNode(path)
    }
   
    loadOneNode(path) 
    {
        return new Promise( resolve =>{
            let execute = ()=>{
                Global.ResourceManager.loadRes(path, (error, prefab) => {
                    if (error != null) {
                        Logger.error(path, "加载失败");
                    }
                    let node: cc.Node = cc.instantiate(prefab);
                    if (cc.isValid(node)) {
                        resolve(node) 
                    }
                })
            }
            execute()
        })
       
    }

    public getView(key:string):ViewBase
    {
        for(let i = 0; i < this.viewList.length; i++)
        {
            if(this.viewList[i].viewKey == key)
            {
                return this.viewList[i];
            }
        }
        return null;
    }

    public open(args?:any[])
    {
        if(!this.active)
            return;
        this.onOpen(args);
    }

    public tryOpen(args?:any[])
    {
        this.onOpen(args);
    }

    public dispose()
    {
        this.onDispose();
        this.callAllView("onDispose");
        this.viewList = [];
    }
 
    

    public resetState()
    {

    }
    
    /**
     * 关闭本界面所有子view
     * @param subView 显示的子view
     */
    closeAllSubView(subView?:ViewBase)
    {
        for(let i = 0; i < this.viewList.length; i++)
        {
            let view = this.viewList[i];
            if(view)
            {
                view.subViewState = view == subView
                view.realClose()
            }
        }
    }

    //所有子view调用方法
    public callAllView(funcName:string, ...args)
    {
        for(let i = 0; i < this.viewList.length; i++)
        {
            let view = this.viewList[i];
            if(view[funcName])
            {
                view[funcName].apply(view, args);
            }
            if(view)
            {
                view.callAllView(funcName,args)
            }
        }
    }


    realClose()
    {
        for(let i = 0; i < this.viewList.length; i++)
        {
            let view = this.viewList[i];
            if(view)
            {
                view.subViewState = false
                view.realClose()
            }
        }
    }
    


    //调用单个组件方法
    public callView(key:string, funcName:string, ...args)
    {
        let view = this.getView(key);
        if(view == null)
        {
            Logger.error("找不到view", key);
            return null;
        }
        if(view[funcName])
        {
            return view[funcName].apply(view, args);
        }
        return null;
    }

}


export enum LoadingState
{
    None = 1,
    Loading = 2,
    Loaded = 3
    
}