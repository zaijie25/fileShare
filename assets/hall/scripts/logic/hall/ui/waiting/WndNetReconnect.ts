import WndBase, { DestoryType } from "../../../core/ui/WndBase";
import GlobalEvent from "../../../core/GlobalEvent";

//网络请求弹出界面
export default class WndNetReconnect extends WndBase
{
    private tipsLabel:cc.Label;
    private counter = 0;
    private curReconnectTime = 0;


    protected onInit()
    {
        this.name = "WndNetReconnect";
        this.layer = Global.UI.TipsLayer;
        this.resPath = "hall/prefabs/ui/NetReconnect";
        this.destoryType = DestoryType.None;
    }

    protected initView()
    {
        let bgNode = this.getChild("black_bg");
        bgNode.width = 1600;
        bgNode.height = cc.Canvas.instance.node.height;
        this.tipsLabel = this.getComponent("tips", cc.Label);
    }


    protected onOpen()
    {
        this.counter = 0;
        this.curReconnectTime = 1;
        this.tipsLabel.schedule(this.onSchedule.bind(this), 0.5, cc.macro.REPEAT_FOREVER)
        this.node.runAction(cc.fadeIn(0.5));
        this.tipsLabel.string = cc.js.formatStr("正在重新连接（%d/%d），请稍后", this.curReconnectTime, Global.Setting.socketReconnectTimes) + "...";
        Global.Event.on(GlobalEvent.UPDATE_RECONNECT_COUNT, this, this.onReconnectCountUpdate);
    }

    protected onClose()
    {
        this.counter = 0;
        this.tipsLabel.unscheduleAllCallbacks();
        Global.Event.off(GlobalEvent.UPDATE_RECONNECT_COUNT, this, this.onReconnectCountUpdate);
    }

    protected onDispose()
    {
        this.counter = 0;
        Global.Event.off(GlobalEvent.UPDATE_RECONNECT_COUNT, this, this.onReconnectCountUpdate);
    }

    private onReconnectCountUpdate(times)
    {
        this.curReconnectTime = times;
    }

    private onSchedule()
    {
        this.counter++;
        let mod = this.counter % 4;
        let subStr = ""
        for(let i = 0; i < mod; i++)
        {
            subStr += "."
        }
        this.tipsLabel.string = cc.js.formatStr("正在重新连接（%d/%d），请稍后", this.curReconnectTime, Global.Setting.socketReconnectTimes) + subStr;

        if(this.counter > 50)
        {
            this.close();
        }
    }
}