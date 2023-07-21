const {ccclass, property} = cc._decorator;

@ccclass
export default class GameTimeChecker extends cc.Component{
    private curTimestamp = 0;
    private isTimerRunning = false;
    private lastPauseTime: number;
    private inBackground: boolean;
    private showTime: number;
    private timeError = 1;      // 时间误差 秒级 误差以内直接更新本地时间戳

    protected onLoad(){
        cc.game.on(cc.game.EVENT_SHOW, this.onResume, this);
        cc.game.on(cc.game.EVENT_HIDE, this.onPause, this);
    }

    protected onDestroy(){
        cc.game.off(cc.game.EVENT_SHOW, this.onResume, this);
        cc.game.off(cc.game.EVENT_HIDE, this.onPause, this);
        this.stopTimer();
    }

    /** 游戏协议的时间戳输入用于计算时延 返回ms */
    public correctTime(time: number){
        // Logger.warn("correctTime--------------", time, this.curTimestamp, this.curTimestamp - time);
        if (!this.isTimerRunning || this.curTimestamp == 0)
            return 0;
        let dev =  this.curTimestamp - this.formatTimestamp(time);
        return dev > 0 ? dev : 0;       // 非丢包延时情况，卡在定时器间隔可能会导致负数，取0;
    }

    /** 心跳的时间戳用于校准本地时间 */
    public checkTimestamp(time: number){
        if (!this.isTimerRunning || this.curTimestamp == 0){
            return this.startTimer(time);
        }
        // Logger.warn("checkTimestamp--------------", this.curTimestamp, time, this.curTimestamp-time);
        // cpu误差会导致负值，卡在定时器刷新临界点
        if (this.curTimestamp - time < this.timeError * 1000){ 
            this.curTimestamp = this.formatTimestamp(time);
        }
    }
    
    public startTimer(time: number){
        if (time < 0)
            return;
        this.curTimestamp = this.formatTimestamp(time);
        this.schedule(this.timeRun, 0.1);       // 取0.1s刷新一次时间，避免刷新间隔大产生太大误差
        this.isTimerRunning = true;
    }

    private timeRun(dt){
        if (!this.isTimerRunning || this.curTimestamp == 0)
            return;
        this.curTimestamp += dt * 1000;
        // Logger.warn("timeRun", dt, this.curTimestamp);
    }

    public stopTimer(){
        this.unschedule(this.timeRun);
        this.curTimestamp = 0;
        this.isTimerRunning = false;
    }

    private onPause(){
        if (!this.isTimerRunning)
            return;
        
        this.lastPauseTime = Date.now();
        this.inBackground = true;
    }

    private onResume(){
        if (!this.isTimerRunning)
            return;
        
        if(!this.inBackground){
            //需要清理上次pause时间，android拉出菜单栏会只出发onresume 有概率不出发onpause (vivo-v1809)
            this.lastPauseTime = 0;
        }
        this.inBackground = false;

        this.showTime = Date.now();
        if (this.lastPauseTime > 0){
            let backgroundTime = this.showTime - this.lastPauseTime;
            this.curTimestamp += backgroundTime;
            // Logger.warn("onResume", backgroundTime, this.curTimestamp);
        }
    }

    /** 将时间戳统一转成13位计算 */
    private formatTimestamp(time: number){
        if (time.toString().length == 10){
            return time * 1000;
        }
        return time;
    }
}