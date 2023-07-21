import { ServerRouteInfo, ServerUrl } from "../../setting/ServerRoutes";

export default class CheckHelper 
{
    private checkNum = 0;
    private MAXCHECKNUM = 1000000;

    private timeMap = {};

    private checkTimeList = []

    //上次网络开销
    private lastNetCost = 0;

    //是否开启刷新定时器
    private runTimer = false;
    
    //计时
    private timeCount = 0;

    //类型  1 大厅 2 子游戏
    private type;

    constructor(type)
    {
        this.type = type;
    }

    public clear()
    {
        this.checkTimeList = [];
        this.checkNum = 0;
        this.timeCount = 0;
        this.runTimer = false;
    }

    public getNetCost()
    {
        return this.lastNetCost;
    }

    //发送心跳时开始计时，每秒更新网络延时。收到心跳后，停止计时器，以回包时间为准。
    public recordHeartbeat(serverUrl :ServerUrl = null)
    {
        this.timeMap[this.checkNum] = {
            sendTime:Date.now(), 
            liveTime:0,
        }

        this.checkTimeList.push([this.checkNum, Date.now(), serverUrl])
        this.runTimer = true;
    }


    public refreshCostTime(checkStr)
    {
        if(checkStr == null || checkStr == "")
            return;
        let strs = checkStr.split("_");
        if(strs.length <= 0 || isNaN(Number(strs[0])))
            return;
        let check = Number(strs[0]);
        this.runTimer = false;
        this.timeCount = 0;
        for(let i = 0; i < this.checkTimeList.length; i++)
        {
            if(this.checkTimeList[i][0] == check)
            {
                let time = this.checkTimeList[i][1];
                let serverUrl = this.checkTimeList[i][2]
                let diff = Date.now() - time;
                this.checkTimeList.splice(0, i + 1);
                // this.lastNetCost = diff;
                this.updateCostTime(diff, true, serverUrl);
                return;
            }
        }
    }


    private updateCostTime(time, isHeartbeat = false, serverUrl:ServerUrl = null)
    {
        this.lastNetCost = time;
        if(this.type == 1)
            Global.Event.event(GlobalEvent.RefreshHallNetCost, this.lastNetCost, isHeartbeat, serverUrl)
        else
            Global.Event.event(GlobalEvent.RefreshGameNetCost, this.lastNetCost, isHeartbeat)
    }


    public getCostTime(checkStr:string)
    {
        if(checkStr == null || checkStr == "")
            return 0;
        let strs = checkStr.split("_");
        if(strs.length <= 0 || isNaN(Number(strs[0])))
            return 0;
        let check = Number(strs[0]);
        for(let i = 0; i < this.checkTimeList.length; i++)
        {
            if(this.checkTimeList[i][0] == check)
            {
                let time = this.checkTimeList[i][1];
                let diff = Date.now() - time;
                this.checkTimeList.splice(0, i + 1);
                return diff;
            }
        }
        return 0;
    } 


    public updateChecker()
    {
        this.checkNum++;
        if(this.checkNum > this.MAXCHECKNUM)
        {
            this.checkNum = 0;
        }
    }


    public getChecker()
    {
        return this.checkNum;
    }

    public getNomalChecker()
    {
        return this.checkNum + "_" + this.getNowTimeStr();
    }

    public getHeartBeatChecker(sn?)
    {
        sn = sn || 0
        return this.getNomalChecker() + "_" + this.lastNetCost + "_" + sn;
    }

    private getNowTimeStr()
    {
        let date = new Date();
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = (date.getMinutes() < 10? "0" + date.getMinutes() : date.getMinutes()) +  ':';
        let s = (date.getSeconds() < 10? "0" + date.getSeconds() : date.getSeconds());
        return M + D + h + m + s;
    }


    public onUpdate(dt)
    {
        if(!this.runTimer )
            return;
        this.timeCount += dt;
        if(this.timeCount < 1 || this.checkTimeList.length == 0)
            return;
        this.timeCount = 0;
        //取第一个心跳的时间差
        this.updateCostTime( Date.now() - this.checkTimeList[0][1]);
    }
}