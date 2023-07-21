//p0 为公共位置 1-n 为玩家座位
export default class PVPSitHelper
{
    public selfSvrSit:number;
    public maxPlayerNum:number;
    public localSitToViewSitMap = {}

    public init(serverSit: number, maxPlayerNum: number, map: any = {})
    {
        this.selfSvrSit = serverSit;
        this.maxPlayerNum = maxPlayerNum;
        this.localSitToViewSitMap = map;
    }

    public clear()
    {
        this.localSitToViewSitMap = {}
        this.selfSvrSit = 0;
        this.maxPlayerNum = 0;
    }

    public getSelfServerSeat():number
    {
        return this.selfSvrSit;
    }

    public getSelfServerSeatS():string
    {
        return "p" + this.selfSvrSit;
    }
    

    public serverToLocal(svrSeat:number)
    {
        if(!this.selfSvrSit || this.selfSvrSit == -1)
            return svrSeat;
        let selfViewSeat = this.getSelfViewSeat();
        let localSeat = ((svrSeat - this.selfSvrSit + this.maxPlayerNum) % this.maxPlayerNum + selfViewSeat) % this.maxPlayerNum
        localSeat = this.localToView(localSeat)
        return localSeat;
    }

    //local -> ui的映射    如 ：2人时 二号位对应的是head3  4人时 2号位对应的是head2 
    public localToView(localSeat)
    {
        if(this.localSitToViewSitMap == null || Global.Toolkit.isEmptyObject(this.localSitToViewSitMap))
            return localSeat
        return this.localSitToViewSitMap[localSeat];
    }

    public viewToLocal(viewSeat){
        if(this.localSitToViewSitMap == null || Global.Toolkit.isEmptyObject(this.localSitToViewSitMap))
            return viewSeat;
        for(let local in this.localSitToViewSitMap){
            if (this.localSitToViewSitMap[local] == viewSeat)
                return local;
        }
    }

    public localToServer(localSeat:number)
    {
        if(!this.selfSvrSit || this.selfSvrSit == -1)
            return localSeat;
        let seat = this.viewToLocal(localSeat);
        let sitOffset = seat - this.getSelfViewSeat() + this.selfSvrSit;
        if (sitOffset == this.maxPlayerNum){
            return this.maxPlayerNum;
        }
        else{
            return sitOffset % this.maxPlayerNum;
        }
    }

    //server seat string  ->  local seat number
    public serverSToLocalN(svrSeat:number):number
    {
        // let num = this.serverSeatStrToNum(svrSeatStr);
        return this.serverToLocal(svrSeat);
    }

    //local seat number  -> server seat string
    public localNToServerS(localToServer:number):number
    {
        let num = this.localToServer(localToServer);
        //return "p" + num;
        return num;
    }

    //"p1" => 1
    public serverSeatStrToNum(serverSeatStr:number):number
    {
        // let numstr = serverSeatStr.substr(1);
        // let num = Number(numstr);
        // if(isNaN(num))
        // {
        //     Logger.error("转换失败", serverSeatStr);
        //     num = -1;
        // }
        return serverSeatStr;
    }


    //自己的viewSit为0
    private getSelfViewSeat()
    {
        return 0;
    }
}