import ModelBase from "../../../framework/model/ModelBase";
import GlobalEvent from "../../core/GlobalEvent";

//控制网络loading界面显示和重连界面显示
export default class WaitingModel extends ModelBase
{
    //waiting自动关闭时间
    public EVENT_UPDATE_WAITING_TIME = "EVENT_UPDATE_WAITING_TIME"
    public DEFAULT_WAITING_TIME = 15;

    public get Name()
    {
        return "WaitingModel";
    }

    private waitingList:string[] = []

    protected onInit()
    {
        Global.Event.on(GlobalEvent.SHOW_NET_WAITING, this, this.onShowWaiting)
        Global.Event.on(GlobalEvent.HIDE_NET_WAITING, this, this.onHideWaiting)
        Global.Event.on(GlobalEvent.FORCE_HIDE_WAITING, this, this.forceHideWaiting)
    }


    private onShowWaiting(key, maxTime, value = "", minTime = 1,enableMask = true)
    {
        //cc.error("add key", key);
        if(isNaN(Number(maxTime)))
            maxTime =this.DEFAULT_WAITING_TIME;

        let waitingList = Global.UI.getWindow("WndNetWaiting");
        if(this.waitingList.length == 0 || waitingList == null || !waitingList.isLoaded)
        {
            Global.UI.show("WndNetWaiting", maxTime, value, minTime,enableMask);
        }
        this.event(this.EVENT_UPDATE_WAITING_TIME, maxTime);
        this.waitingList.push(key);
    }

    private onHideWaiting(key, force = false)
    {
        if(force)
        {
            this.waitingList = []
        }
        else
        {
            for(let i = this.waitingList.length - 1; i >= 0; i--)
            {
                if(this.waitingList[i] == key)
                    this.waitingList.splice(i, 1);
            }
        }
        if(this.waitingList.length == 0)
        {
            Global.UI.close("WndNetWaiting");
        }
    }

    private forceHideWaiting()
    {
        this.waitTimeOut();
        Global.UI.close("WndNetWaiting");
    }

    public waitTimeOut()
    {
        this.waitingList = [];
    }

    public getWaitingList() {
        return this.waitingList || [];
    }
}