const {ccclass, property} = cc._decorator;

//游戏驱动脚本  提供update  全局timer  tween管理等
@ccclass
export default class DriverComponent extends cc.Component 
{
    public updateFunc:Function;
    public lateUpdateFunc:Function;
    public onLoadFunc:Function;
    
    onLoad()
    {
        if(this.onLoadFunc)
            this.onLoadFunc();
    }

    update(dt)
    {
        if(this.updateFunc)
            this.updateFunc(dt)
    }

    lateUpdate()
    {
        if(this.lateUpdateFunc)
            this.lateUpdateFunc()
    }

}