//玩家游戏数据
export default class PVPPlayerData 
{
    public nickname: string; // 姓名
    public point: number; // point
    public headimg: string; //
    public sit: number;//座位号
    public chair: number;//服务器座位号
    public in_game = false;
    public isEmpty = true;
    public area:string;
    public headkuang:number;
    public enterPoint: number;
    public vip:number;//vip 等级
    constructor(sit: number) {
        this.nickname = "";
        this.point = 0;
        this.headimg = "";
        this.sit = sit;
        this.in_game = false;
        this.isEmpty = true;
        this.headkuang = 0;
        this.enterPoint = 0;
        this.vip = 0;
    }

    public setInfo(serverInfo)
    {
        this.nickname = serverInfo.nickname || "";
        this.headimg = serverInfo.headimg || "";
        this.point = serverInfo.point || 0;
        if(serverInfo._chair)
            this.chair = serverInfo._chair;
        this.in_game = serverInfo.in_game;
        this.area = serverInfo.area;
        this.headkuang = serverInfo.a_box || 0
        if(this.area == null || this.area == "")
            this.area = "未知地点";
        this.isEmpty = false;
        this.enterPoint = serverInfo.EnterPoint == undefined ? this.point : serverInfo.EnterPoint;
        this.vip = serverInfo.vip || 0;
    }

    public refresh(msg)
    {
        this.point = msg.point;
        this.chair = msg._chair;
        this.in_game = msg.in_game;
        this.enterPoint = msg.EnterPoint == undefined ? this.point : msg.EnterPoint;
        this.vip = msg.vip;
    }

    public clear()
    {
        this.nickname = "";
        this.point = 0;
        this.headimg = "";
        this.chair = -1;
        this.in_game = false;
        this.isEmpty = true;
        this.enterPoint = 0;
        this.vip = 0;
    }
}
