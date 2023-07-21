
export default class FastTip 
{
    private tipList = [];
    private msgList = [];

    private CHECK_INTERVAL = 0.3;
    private TIP_DISTANCE_H = 50;
    private MAX_TIP_COUNT = 5;
    //透明时间
    private FADE_OUT_TIME = 0.1;
    //移动时间
    private MOVE_UP_TIME = 0.2;
    //tip起始位置
    private START_POS_Y = 20
    //tip显示时间
    private TIP_LIVE_TIME = 2;

    private timeInterval = 0;


    private curTipIndex = 0;

    private hasInit = false;

    public initTip(root:cc.Node)
    {
        this.timeInterval = 0;
        if(this.hasInit)
        {
            Logger.error("重复初始化");
        }
        Global.ResourceManager.loadRes("hall/prefabs/ui/FastTipItem", (error, prefab)=>
        {
            if(!cc.isValid(root))
            {
                Logger.log("root已经销毁");
                return;
            }
            if(error != null)
            {
                Logger.error(error.message);
            }
            if(prefab)
            {
                for(let i = 0; i < this.MAX_TIP_COUNT; i++)
                {
                    let tip = new FastTipItem();
                    tip.setNode(cc.instantiate(prefab));
                    root.addChild(tip.node);
                    tip.node.name = "tip" + i;
                    tip.active = false;
                    this.tipList.push(tip);
                }
                this.hasInit = true;
            }
        })
    }


    public show(content:string)
    {
        if(content == null || content == "") {
            return;
        }
        
        if(this.isFisrt())
        {
            let tip = this.getTip();
            if(tip == null)
                return;
            tip.reset();
            tip.show(content, this.START_POS_Y,0, this.FADE_OUT_TIME, this.TIP_LIVE_TIME);
        }
        else
        {
            if(!this.filter(content))
                return;
            this.msgList.push(content);
        }
    }

    //过滤掉重复提示
    private filter(content)
    {
        if(this.msgList.indexOf(content) > -1)
            return false;
        for(let i = 0; i < this.tipList.length; i++)
        {
            if(this.tipList[i].getContent() == content)
                return false;
        }
        return true;
    }


    public clearAll()
    {
        for(let i = 0; i < this.tipList.length; i++)
        {
            this.tipList[i].dispose();
        }
        this.tipList = [];
        this.hasInit = false;
    }


    public onUpdate(dt)
    {
        if(!this.hasInit)
            return;
        this.timeInterval += dt;
        if(this.timeInterval > this.CHECK_INTERVAL)
        {
            this.timeInterval = 0;
            if(this.msgList.length == 0)
                return;
            //播放
            let msg = this.msgList.shift();
            let tip = this.getTip();
            tip.reset();
            tip.show(msg, this.START_POS_Y, this.MOVE_UP_TIME, this.FADE_OUT_TIME, this.TIP_LIVE_TIME);
            for(let i = 0; i < this.tipList.length; i++)
            {
                if(this.tipList[i] != tip && this.tipList[i].isRunning)
                    this.tipList[i].moveUp(this.MOVE_UP_TIME, this.TIP_DISTANCE_H);
            }
        }
    }

    

    private getTip()
    {
        let tip = this.tipList[this.curTipIndex];
        this.curTipIndex = (this.curTipIndex + 1) % this.MAX_TIP_COUNT;
        return tip;
    }

    private isFisrt()
    {
        for(let i = 0; i < this.tipList.length; i++)
        {
            if(this.tipList[i].isRunning)
                return false;
        }
        return true;
    }

}


import ViewBase from "../../../core/ui/ViewBase"
class FastTipItem extends ViewBase
{
    private content:cc.Label;
    private bgNode:cc.Node;
    public isRunning;
    private targetPosY = 0;
    protected initView()
    {
        this.content = this.getComponent("content", cc.Label);
        this.bgNode = this.getChild("black_bg");
    }

    public setContent(txt)
    {
        this.content.string = txt;
        let txtWidth = this.content.node.width;
        setTimeout(() => {
            if (cc.isValid(this.content.node)) {
                txtWidth = this.content.node.width;
                if (txtWidth < 40)
                    txtWidth = 40;
                let width = txtWidth + 150;
                if (width < 602)
                    width = 602;
                this.bgNode.width = width;
            }
        }, 20);
       
    }

    public getContent()
    {
        if(this.node && this.node.isValid)
        {
            return this.content.string;
        }
    }

    public reset()
    {
        this.targetPosY = 0;
        this.node.active = false;
        this.content.string = "";
        this.content.unscheduleAllCallbacks();
        this.node.stopAllActions();
    }

    public show(content, posY, delayTime, time, hideTime)
    {
        this.setContent(content)
        this.targetPosY = posY;
        this.isRunning = true;
        this.node.active = true;
        this.node.y = posY;
        this.node.opacity = 0;
        let sequence = cc.sequence(cc.delayTime(delayTime), cc.fadeIn(time));
        this.node.runAction(sequence);

        // this.content.scheduleOnce(()=>{
        //     this.node.runAction(cc.fadeIn(time));
        //     // this.isRunning = false;
        // }, hideTime)
        this.content.scheduleOnce(()=>{
            this.node.runAction(cc.fadeOut(time));
            this.isRunning = false;
        }, hideTime)
    }

    public moveUp(time, distance)
    {
        this.targetPosY += distance;
        this.node.runAction(cc.moveTo(time, this.node.x, this.targetPosY)
            .easing(cc.easeIn(1)));
    }

    public dispose()
    {
        if(this.node && this.node.isValid)
        {
            this.node.removeFromParent();
            this.node.destroy();
        }
    }
}