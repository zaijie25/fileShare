import DriverComponent from "./DriverComponent";
import GameTimeChecker from "../game/GameTimeChecker";

//驱动脚本管理器  提供timer  tween等操作
export default class ComponentProvider
{
    private driverComponent:DriverComponent;
    private driverNode:cc.Node;
    private name:string;
    private hasInit = false;
    private updateFunc:Function;
    private lateUpdateFunc:Function;

    //下一帧执行回调
    public callLaterList = []

    //帧结束
    public frameEndList = []

    private timeChecker: GameTimeChecker;
    
    constructor(name:string)
    {
        this.name = name;
        cc.director.on(cc.Director.EVENT_AFTER_UPDATE, this.onFrameEnd, this)
    }

    public setup(updateFunc, lateUpdateFunc)
    {
        this.updateFunc = updateFunc;
        this.lateUpdateFunc = lateUpdateFunc;
    }

    public initDriver()
    {
        this.clear();
        let canvas = cc.find("Canvas");
        if(canvas == null)
        {
            Logger.error("找不到Canvas");
            return;
        }
        this.driverNode = canvas.getChildByName(this.name);
        if(this.driverNode == null)
        {
            this.driverNode = new cc.Node(this.name);
            canvas.addChild(this.driverNode);
        }
        this.driverComponent = this.driverNode.getComponent("DriverComponent");
        if(this.driverComponent == null)
            this.driverComponent = this.driverNode.addComponent("DriverComponent");
        this.driverComponent.onLoadFunc = this.onLoad.bind(this);
        this.driverComponent.updateFunc = this.onUpdate.bind(this);
        this.driverComponent.lateUpdateFunc = this.onLateUpdate.bind(this);
        this.hasInit = true;

        this.timeChecker = Global.UIHelper.safeGetComponent(this.driverNode, "", GameTimeChecker);

    }

    protected clear()
    {
        this.driverComponent = null;
        this.driverNode = null;
        this.hasInit = null;
        this.stopChecker();
        this.timeChecker = null;
    }


    private onLoad()
    {
       
    }

    private onFrameEnd()
    {
        for(let i = 0; i < this.frameEndList.length; i++)
        {
            this.frameEndList[i]();
        }
        this.frameEndList = [];
    }

    private onUpdate(dt)
    {
        if(this.updateFunc)
            this.updateFunc(dt);
    }

    private onLateUpdate()
    {
        if(this.lateUpdateFunc)
            this.lateUpdateFunc();
        for(let i = 0; i < this.callLaterList.length; i++)
        {
            this.callLaterList[i]();
        }
        this.callLaterList.length = 0;
    }


    //存在问题  this指向的是component  需要bind
    public schedule(callback:Function, interval?:number, repeat?:number, delay?:number)
    {
        if(!this.hasInit || this.driverComponent == null)
        {
            Logger.error("Driver 还未初始化");
            return;
        }
        this.driverComponent.schedule(callback, interval, repeat, delay);
    }

    public scheduleOnce(callback:Function, delay?:number)
    {
        if(!this.hasInit || this.driverComponent == null)
        {
            Logger.error("Driver 还未初始化");
            return;
        }
        this.driverComponent.scheduleOnce(callback, delay);
    }

    public unschedule(callback:Function)
    {
        if(!this.hasInit || this.driverComponent == null)
        {
            return;
        }
        this.driverComponent.unschedule(callback);
    }

    public unscheduleAllCallbacks()
    {
        if(!this.hasInit || this.driverComponent == null)
        {
            return;
        }
        this.driverComponent.unscheduleAllCallbacks();
        this.callLaterList.length = 0;
        this.frameEndList.length = 0;
    }


    public callLater(func)
    {
        this.callLaterList.push(func);
    }

    public frameEnd(func)
    {
        this.frameEndList.push(func);
    }

    public doChecker(time: number){
        if (!this.timeChecker){
            return;
        }
        this.timeChecker.checkTimestamp(time);
    }

    public stopChecker(){
        if (!this.timeChecker){
            return;
        }
        this.timeChecker.stopTimer();
    }

    /** 得到协议当前时间传输时延 单位ms */
    public correctTime(time: number){
        if (!this.timeChecker){
            return 0;
        }
        return this.timeChecker.correctTime(time);
    }
}