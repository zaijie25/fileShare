import { YXTween } from "./YXTween";

export default class TweenManager
{
    public tweenList:any = [];

    private time = 0;

    public actionMgr:cc.ActionManager;

    public setup()
    {
        this.actionMgr = new cc.ActionManager();
        cc.director.getScheduler().scheduleUpdate(this.actionMgr, cc.Scheduler.PRIORITY_SYSTEM, false)
    }

    public get(target?:cc.Node): cc.Tween
    {
        if(!target || !target.isValid)
        {
            Logger.error("TweenManager  target is !isValid!!!!!")
            return;
        }
        let tween = new YXTween();
        tween.target(target);
        //this.tweenList.push({tween:tween, time:Date.now()});
        return tween;
    }


    public clear()
    {
        this.actionMgr.removeAllActions();
        // for(let i = 0 ; i < this.tweenList.length; i++)
        // {
        //     if(this.tweenList[i] != null && this.tweenList[i].tween != null)
        //         this.tweenList[i].tween.stop();
        // }
        // this.tweenList = [];
        // this.time = 0;
    }

    public onUpdate(dt)
    {
        // this.time += dt;
        // //每30秒检查一次    存在60秒 则移除
        // if(this.time >= 10)        
        // {
        //     for(let i = this.tweenList.length - 1; i >= 0; i--)
        //     {
        //         if(this.tweenList[i] == null || this.tweenList[i].tween == null || Date.now() - this.tweenList[i].time > 10000)
        //         {
        //             if(this.tweenList[i] == null && this.tweenList[i].tween)
        //             {
        //                 this.tweenList[i].tween.stop();
        //             }
        //             this.tweenList.splice(i, 1);
        //         }
        //     }
        // }
    }


}