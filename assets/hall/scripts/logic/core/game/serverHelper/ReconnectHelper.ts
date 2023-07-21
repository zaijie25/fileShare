import BaseServerHelper from "./BaseServerHelper";
import GameServer from "../GameServer";
import GlobalEvent from "../../GlobalEvent";


export default class ReconnectHelper extends BaseServerHelper
{
    private needReconnect = false;

    //上次收到服务器协议时间
    private lastReceiveTime = 0;

    //重连次数
    private reconnectCount = 0;
    //网络是否已经链接
    private socketOpened = false;
    //重连中 表示正在重连中
    private reconnectLock = false;

    //下次重连时间
    private nextReconnectTime = 0;

    private lastPauseTime:number = 0;

    private inBackground = false;



    protected onInit()
    {

    }    

    public run()
    {
        Game.Event.on(Game.EVENT_CALL_RECONNECT, this, this.setReconnect);
        this.server.on(GameServer.Event_GameSocketOpen, this, this.onSocketOpen);
        this.server.on(GameServer.Event_GameSocketClose, this, this.onSocketClose);
        this.server.on(GameServer.Event_GameSocketMsg, this, this.updateReceiveTime);
        cc.game.on(cc.game.EVENT_SHOW, this.onResume, this);
        cc.game.on(cc.game.EVENT_HIDE, this.onPause, this);
    }

    public clear()
    {
        this.server.off(GameServer.Event_GameSocketOpen, this, this.onSocketOpen);
        this.server.off(GameServer.Event_GameSocketClose, this, this.onSocketClose);
        this.server.off(GameServer.Event_GameSocketMsg, this, this.updateReceiveTime);
        Game.Event.off(Game.EVENT_CALL_RECONNECT,this, this.setReconnect);
        cc.game.off(cc.game.EVENT_SHOW, this.onResume, this);
        cc.game.off(cc.game.EVENT_HIDE, this.onPause, this);
        this.needReconnect = false;
        this.socketOpened = false;
        this.reconnectLock = false;
        this.lastReceiveTime = 0;
        this.reconnectCount = 0;
    }

    private onSocketOpen()
    {
        if(this.needReconnect == true)
        {
            Logger.log("socket reconnect finish")
            Game.Event.event(Game.EVENT_SOCKET_RECONNECT);
        }
        Global.UI.close("WndNetReconnect");
        this.needReconnect = false;
        this.reconnectLock = false;
        this.socketOpened = true;
        this.lastReceiveTime = 0;
        this.reconnectCount = 0;
    }

    private updateReceiveTime()
    {
        this.lastReceiveTime = Date.now();
    }


    private onSocketClose()
    {
        Logger.error("socket close !!!!")
        this.setReconnect();
        this.socketOpened = false;
        this.reconnectLock = false;
    }

    private onPause()
    {
        this.lastPauseTime = Date.now();
        this.inBackground = true;
        Logger.error("on pause", this.lastPauseTime)
    }

    private onResume()
    {
        if(!this.inBackground)
        {
            //需要清理上次pause时间，android拉出菜单栏会只出发onresume 有概率不出发onpause
            this.lastPauseTime = 0;
        }

        this.inBackground = false;
        Logger.error("on Resume", this.lastPauseTime, Date.now(),  Date.now() - this.lastPauseTime )
        if(this.lastPauseTime != 0){
            let backgroundTime = (Date.now() - this.lastPauseTime) / 1000;
            Game.Event.event(Game.EVENT_SOCKET_RESUME, backgroundTime);
            if(Date.now() - this.lastPauseTime > Global.Setting.backgroundReconnectTime * 1000)
            {
                Global.HallServer.heartbeatHelper.sendHeartBeat("&s=0");
                Game.Component.scheduleOnce(()=>
                {
                    this.setReconnect();
                }, 0.1);
                
            }
        }
    }


    private reconnect()
    {
        Global.UI.show("WndNetReconnect");
        this.reconnectLock = true;
        this.reconnectCount++;
        //更新下次可以重连的时间
        this.nextReconnectTime = Date.now() + Global.Setting.socketReconnectInterval * 1000;
        if(this.reconnectCount > Global.Setting.socketReconnectTimes)
        {
            Global.UI.close("WndNetReconnect");
            let failedFunc = ()=>
            {
                this.reconnectCount = 0;
                Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);
            }
            Global.UI.showSingleBox("网络连接失败，请稍后再试", failedFunc.bind(this), failedFunc.bind(this))
            return;
        }
        Logger.error("ReconnectHelper  reconnect !!");
        Global.Event.event(GlobalEvent.UPDATE_RECONNECT_COUNT, this.reconnectCount);
        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
        this.server.event(GameServer.Event_GameSocketCallReconnect);
    }

    private setReconnect()
    {
        if(!this.server.isRunning)
            return;
        this.reconnectLock = false;
        this.needReconnect = true;
    }


    public onUpdate()
    {
        if(!this.server.isRunning)
            return;
        if(this.needReconnect 
            //当前没在重连中
            && !this.reconnectLock 
            //判断重连间隔
            && Date.now() > this.nextReconnectTime
            //在后台时不重连
            && !this.inBackground)
        {
            this.reconnect();
            return;
        }

        if(this.socketOpened && this.lastReceiveTime != 0)
        {
            if(Date.now() - this.lastReceiveTime > Global.Setting.socketReconnectReceiveCheckInteval * 1000)
            {
                this.needReconnect = true;
                this.lastReceiveTime = 0;
                this.socketOpened = false;
            }
        }
    }
}