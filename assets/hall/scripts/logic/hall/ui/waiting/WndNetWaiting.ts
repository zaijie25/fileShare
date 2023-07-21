import WndBase, { DestoryType } from "../../../core/ui/WndBase";
import WaitingModel from "../../../hallcommon/model/WaitingModel";

//网络请求弹出界面
export default class WndNetWaiting extends WndBase
{
    private tipsLabel:cc.Label;
    private counter = 0;
    private model:WaitingModel;
    private maxFrameCount = 0;
    private UpdateInterval = 0.2;

    private blockMask:cc.BlockInputEvents

    protected onInit()
    {
        this.name = "WndNetWaiting";
        this.layer = Global.UI.TipsLayer;
        this.resPath = "hall/prefabs/ui/NetWaitUI";
        this.model = Global.ModelManager.getModel("WaitingModel");
        this.destoryType = DestoryType.Persist;
    }

    protected initView()
    {
        let bgNode = this.getChild("mask");
        this.blockMask = bgNode.getComponent(cc.BlockInputEvents)
        bgNode.width = 1600;
        bgNode.height = 1600;
        this.tipsLabel = this.getComponent("tips", cc.Label);
        if(cc.isValid(this.tipsLabel)){
            this.tipsLabel.string = "连接中"
        }
    }

    protected onOpen()
    {
        this.model.on(this.model.EVENT_UPDATE_WAITING_TIME, this, this.updateTime)
        let maxWaitTime = 0;
        if(this.args.length == 0)
        {
            Logger.error("没有设置超时时间");
            maxWaitTime = 15;
        }
        else
            maxWaitTime = this.args[0];

        if(this.args.length > 1 && this.args[1]  && this.args[1] != "" && isNaN(Number(this.args[1])))
        {
            if(cc.isValid(this.tipsLabel)){
                this.tipsLabel.string = this.args[1];
            }
        }
        else
        {
            if(cc.isValid(this.tipsLabel)){
                this.tipsLabel.string = "连接中"
            }
        }

        if(this.args.length >= 4)
        {
            this.blockMask.enabled = this.args[3]
        }

       
        this.updateTime(maxWaitTime)
        if(cc.isValid(this.tipsLabel)){
            this.tipsLabel.schedule(this.onSchedule.bind(this), this.UpdateInterval, cc.macro.REPEAT_FOREVER)
        }
        this.node.runAction(cc.fadeIn(0.5));
    }

    private updateTime(maxWaitTime)
    {
        this.counter = 0;
        this.maxFrameCount = maxWaitTime / this.UpdateInterval;
    }

    protected onClose()
    {
        this.model.off(this.model.EVENT_UPDATE_WAITING_TIME, this, this.updateTime)
        this.counter = 0;
        this.tipsLabel.unscheduleAllCallbacks();
    }

    protected onDispose()
    {
        this.counter = 0;
        this.tipsLabel = null
    }

    private onSchedule()
    {
        let waitingList = this.model.getWaitingList();
        if(waitingList.length == 0) {
            this.close();
        }

        this.counter++;
        let mod = this.counter % 4;
        // let subStr = ""
        // for(let i = 0; i < mod; i++)
        // {
        //     subStr += "."
        // }
        // this.tipsLabel.string = "玩命加载中" +subStr;

        if(this.counter > this.maxFrameCount)
        {
            //强制关闭
            this.close();
            this.model.waitTimeOut();
        }
    }
}