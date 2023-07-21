// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;



@ccclass
export default class UIAnimComponent extends cc.Component {

    //动画时长
    private ANIM_TIME = 0.3;
    //背景透明度
    private BG_ALPHA = 178;


    @property(cc.Node)
    bg:cc.Node = null;

    @property(cc.Node)
    ui:cc.Node= null;

    public target:IAnimWnd = null;

    //支持回调方式 也支持接口方式
    public doPopupOpenAnim(finishCallback?)
    {
        if(this.node == null || !this.node.isValid)
        {
            Logger.error("doPopupOpenAnim, this.node == null !!!!!")
            return;
        }
        this.ui.scale = 0.6;
        this.ui.opacity = 255;
        let alphaAction = cc.fadeTo(this.ANIM_TIME, this.BG_ALPHA).easing(cc.easeQuadraticActionInOut());
        let scaleAction = cc.scaleTo(this.ANIM_TIME, 1, 1).easing(cc.easeBackOut());
        let funcAction = cc.callFunc(this.onOpenAnimFinish, this, finishCallback);
        let seq = cc.sequence(scaleAction, funcAction);
        if(this.bg){
            this.bg.opacity = this.BG_ALPHA;//2019-6-5 xiaoC 透明度为0开始变化，有一定几率锁住触屏事件
            this.bg.active = true;
            // this.bg.runAction(alphaAction);
        }
        if(this.ui)
            this.ui.runAction(seq);
        this.setTargetAnimRunning();
    }

    public doPopupCloseAnim(finishCallback?)
    {
        if(this.node == null || !this.node.isValid)
        {
            Logger.error("doPopupCloseAnim, this.node == null !!!!!")
            return;
        }
        let alphaAction = cc.fadeTo(0.1, 0).easing(cc.easeCubicActionIn());
        //let scaleAction = cc.scaleTo(this.ANIM_TIME, 0.8, 0.8).easing(cc.easeBackIn());
        let scaleAction = cc.fadeTo(0.1, 1).easing(cc.easeBackIn());
        // let hideAction = cc.hide();
        let funcAction = cc.callFunc(this.onCloseAnimFinish, this, finishCallback);
        let seq = cc.sequence(scaleAction, funcAction);
        if(this.bg){
            this.bg.active = true;
            this.bg.runAction(alphaAction);
        }
        if(this.ui)
            this.ui.runAction(seq);
        this.setTargetAnimRunning();
    }

    public doFullScreenOpenAnim(topNode:cc.Node, leftNode:cc.Node, centerNodeList:cc.Node[],botNode:cc.Node)
    {
        if(topNode)
        {
            let originTopPos = topNode.position;
            topNode.y += topNode.height;
            topNode.runAction(cc.moveTo(0.2, originTopPos).easing(cc.easeCubicActionOut()));
        }
       
        if(leftNode)
        {
            let originLeftPos = leftNode.position;
            leftNode.y += leftNode.height;
            leftNode.runAction(cc.moveTo(0.3, originLeftPos).easing(cc.easeBackOut()));
        }

        if(centerNodeList && centerNodeList.length > 0)
        {
            for(let i = 0; i < centerNodeList.length; i++)
            {
                let centerNode = centerNodeList[i];
                centerNode.opacity = 1;
                centerNode.runAction(cc.fadeTo(0.3, 255));
            }
        }

        if(botNode)
        {
            let originTopPos = botNode.position;
            botNode.y -= botNode.height;
            botNode.runAction(cc.moveTo(0.2, originTopPos).easing(cc.easeCubicActionOut()));
        }

    }


    private setTargetAnimRunning()
    {
        if(this.target)
            this.target.isRuningAnim = true;
    }

    private onOpenAnimFinish(node, finishCallback)
    {
        if(this.target)
        {
            this.target.isRuningAnim = false;
            if(this.target.openAnimFinish)
            {
                this.target.openAnimFinish();
                if(this.target.afterAnimFinish)
                {
                    Global.Component.scheduleOnce(()=>{
                        if(!cc.isValid(this.node))
                            return;
                        this.target.afterAnimFinish();
                    }, 0);
                }
            }
        }
        if(finishCallback)
            finishCallback();
    }

    private onCloseAnimFinish(node, finishCallback)
    {
        if(this.target)
        {
            this.target.isRuningAnim = false;
            if(this.target.closeAnimFinish)
            {
                this.target.closeAnimFinish();
            }
        }
        if(finishCallback)
            finishCallback();
    }

}
