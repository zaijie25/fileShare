import HallServer from "./HallServer";
import { NetOnline } from "./NetEvent";
import EventDispatcher from "../../../../framework/event/EventDispatcher";

export default class HallHeartBeatHelper
{
    private CHECK_HEARTBEAT_INTERVAL = 5;
    //心跳使用同一个数据包
    //数据包内的param 
    private heartData:any;
    private heartParam:any;

    private server:HallServer;
    //负责hallSever 组件间通信
    private internalEvent:EventDispatcher;

    //下一次心跳间隔
    private sendInterval = 0;
    //6秒没收到心跳  则主动发送心跳
    private lastSendInterval = 6

    private lastSendTimeout = 3;

    private isRunning = false;


    public netInterval = 0;

    constructor(server:HallServer, interalEvent:EventDispatcher)
    {
        this.server = server;
        this.internalEvent = interalEvent;
        this.setup();
    }

    public setup()
    {
        this.server.on(NetOnline.HeartBeat, this, this.onHeartBeat);
        this.internalEvent.on(HallServer.EVENT_INTERNAL_UPDATEMSGSEQ, this, this.onUpdateMsgseq)
        this.initHeartBeatData();
    }

    // Game *struct {
    //     Gid   int32  `json:"_gid,omitempty"`
    //     Gsc   string `json:"_gsc,omitempty"`
    //     Glv   string `json:"_glv,omitempty"`
    //     Gt    int32  `json:"_gt"`
    //     Chair int32  `json:"_chair"`
    //   } `json:"game,omitempty"` //所在游戏信息, 如果在游戏就将这些信息带上, 不在就不带
    public setSession(session)
    {
        if(session == null)
            this.heartData._param.game = null
        else
        {
            let game:any = {}
            game._gid = session._para._gid;
            game._chair = session._para._chair;
            game._gsc = session._para._gsc;
            game._glv = session._para._glv;
            game._gt = session._para._gt;
            this.heartData._param.game = game;
        }
    }


    private initHeartBeatData()
    {
        this.heartParam = {}
        this.heartParam.filter = {}
        // this.heartParam.filter.appid = Global.Setting.appId;
        this.heartParam.msgseq = 0;
        this.heartParam.max_msg = Global.Setting.boardcastCount;

        this.heartData = {}
        this.heartData._mod = NetOnline.mod;
        this.heartData._func = NetOnline.HeartBeat;
        this.heartData._param = this.heartParam;
    }


    //登录成功开始
    public run()
    {
        this.isRunning = true;
        this.sendHeartBeat();
    }
    //切换账号是stop
    public stop()
    {
        this.isRunning = false;
        this.heartParam.msgseq = 0;
        this.sendInterval = 0;
        this.lastSendInterval = this.CHECK_HEARTBEAT_INTERVAL;
    }


    public sendHeartBeat(extraStr = "")
    {
        this.lastSendInterval = this.lastSendTimeout + 1;
        this.server.sendHeartBeat(NetOnline.mod, NetOnline.HeartBeat, this.heartParam, null, null, false, 0, extraStr);
    }

    /**
     * 下次心跳seq
     * @param msgseq 
     */
    private onUpdateMsgseq(msgseq, msgseq1)
    {
        this.heartParam.msgseq = msgseq;
        this.heartParam.msgseq_1 = msgseq1;
    }

    /**
     * 心跳消息返回
     * @param msg 
     */
    private onHeartBeat( param )
    {
        //设置下次心跳请求时间
        if(param && param.timeout)
            this.sendInterval = param.timeout;
        else
            this.sendInterval = 3;
        this.lastSendTimeout = this.sendInterval;
        //通知广播组件处理
        this.internalEvent.event(HallServer.EVENT_INTERNAL_ONHEARTBEAT, param);
    }

    public onUpdate(dt)
    {
        if(!this.isRunning)
            return;
        if(this.sendInterval > 0)
        {
            this.sendInterval -= dt;
            if(this.sendInterval <= 0)
            {
                this.sendHeartBeat();
            }
        }

        //防止心跳断掉
        this.lastSendInterval -= dt;
        if(this.lastSendInterval < 0)
        {
            this.sendHeartBeat()
        }
    }
}