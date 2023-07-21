import BaseServerHelper from "./BaseServerHelper";
import GameServer from "../GameServer";

export default class GameHeartBeatHelper extends BaseServerHelper
{
    private sendInterval = 0;

    private lastHeartBeatInterval = 3;

    private start = false;

    public netInterval = 0;

    //是否在后台
    private isBackground = false;

    //心跳计数
    private heartBeatSeq = 1;

    protected onInit()
    {
    }

    public startHeartbeat()
    {
        this.start = true;
    }

    public stopHeartBeat()
    {
        this.start = false;
    }


    public sendHeartBeat()
    {
        if(this.server.isRunning)
        {
            let seq = 0;
            if(!this.isBackground)
            {   
                seq = this.heartBeatSeq;
                this.heartBeatSeq++;
            }

            this.server.send(Game.Command.HeartBeat, {"_seq":seq})
        }
    }

    public HandleHeartBeat(msg)
    {
        this.sendInterval = msg._param._para && msg._param._para.timeout || 3;
        this.lastHeartBeatInterval = this.sendInterval;
    }

    public run()
    {
        this.resetSeq();
        cc.game.on(cc.game.EVENT_SHOW, this.onResume, this);
        cc.game.on(cc.game.EVENT_HIDE, this.onPause, this);
        this.server.on(GameServer.Event_GameSocketStartConnect, this, this.resetSeq)
    }

    public clear()
    {
        this.resetSeq();
        cc.game.off(cc.game.EVENT_SHOW, this.onResume, this);
        cc.game.off(cc.game.EVENT_HIDE, this.onPause, this);
        this.server.off(GameServer.Event_GameSocketStartConnect, this, this.resetSeq)
        this.sendInterval = 0;
        this.startHeartbeat();
    }


    private tmpInterval
    private onResume()
    {
        this.isBackground = false;
        this.sendHeartBeat();
        clearInterval(this.tmpInterval)
    }

    private onPause()
    {
        this.isBackground = true;
    }

    //默认值为1  0为background
    private resetSeq()
    {
        this.heartBeatSeq = 1;
    }


    public onUpdate(dt)
    {
        if(!this.start)
            return;
        if(!this.server.isRunning)
            return;
        if(this.sendInterval > 0)
        {
            this.sendInterval -= dt;
            if(this.sendInterval <= 0)
            {
                this.sendHeartBeat();
                this.sendInterval = this.lastHeartBeatInterval;
            }
        }
    }
}