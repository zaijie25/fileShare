import HallStorageKey from "../const/HallStorageKey";
import GlobalEvent from "../../core/GlobalEvent";
import { NetAppface } from "../../core/net/hall/NetEvent";
import Toolkit from "../../core/tool/Toolkit";

export default class PlayerData
{
    public uid:number;
    /**
     * vip等级
     */
    private _vip : number;
    public set vip(newVip:number){
        if(this._vip == newVip) return;
        this._vip = newVip; 
        //通知玩家信息发生更新
        Global.Event.event(GlobalEvent.PERSONALINFOUPDATE);
        Global.Event.event(GlobalEvent.CHANGEVIP);
        this.changeVip()
    }

    changeVip() {
        //请求修改头像框
        let model = Global.ModelManager.getModel("PlayerInfoModel")
        let param: any = {}
        param.head = Global.PlayerData.vip
        model.reqSetSelfCfg(param, () => {
            Global.PlayerData.headkuang = Global.PlayerData.vip.toString();
        });
    }
    public get vip(){
        return this._vip?this._vip:0;
    }
    /**
     * 充值金额
     */
    public vipExp:number;
    public token:string;
    public pack:number;  //渠道id
    public pid:any;  //上级id
    public open_id:string;  
    public accesstoken:string; 
    public payChannel:string;
    public urlSign:string;
    public ip:string;

    /**
     * 玩家标识
     */
    public merge_type:string = "";
    /**
     * 捕鱼炮台
     */
    public buyuPaotai:string;

    private _type : number;
    //玩家类型 1 游客 2 绑定手机
    public set type( newType:number ){
        if(this._type == newType) return;
        this._type = newType; 
        //通知玩家信息发生更新
        Global.Event.event(GlobalEvent.PERSONALINFOUPDATE);
    }
    public get type(){
        return this._type;
    }

    //玩家手机
    private _phone : string;
    public set phone( newPhone:string ){
        if(this._phone == newPhone) return;
        this._phone = newPhone; 
        //通知玩家信息发生更新
        Global.Event.event(GlobalEvent.PERSONALINFOUPDATE);
    }
    public get phone(){
        return this._phone;
    }

    //玩家昵称
    private _nickname : string;
    public set nickname( newNickname:string ){
        if(this._nickname == newNickname) return;
        this._nickname = newNickname; 
        //通知玩家信息发生更新
        Global.Event.event(GlobalEvent.PERSONALINFOUPDATE);
    }
    public get nickname(){
        return this._nickname;
    }

    //玩家头像
    private _headimg : string;
    public set headimg( newHeadimg:string ){
        if(this.headimg == newHeadimg) return;
        this._headimg = newHeadimg; 
        //通知玩家信息发生更新
        Global.Event.event(GlobalEvent.PERSONALINFOUPDATE);
    }
    public get headimg(){
        return this._headimg;
    }
    
    //玩家头像框
    private _headkuang : string = "0";
    public set headkuang( newHeadkuang:string ){
        if(newHeadkuang == ""){
            newHeadkuang = "0";
        }
        if(this.headkuang == newHeadkuang) return;
        this._headkuang = newHeadkuang; 
        //通知玩家信息发生更新
        Global.Event.event(GlobalEvent.PERSONALINFOUPDATE);
    }
    public get headkuang(){
        return this._headkuang;
    }

    //金币数量
    private _point : number;
    public set point( newPoint:number ){
        if(this._point == newPoint) return;
        this._point = newPoint; 
        //玩家金币发生变化
        Global.Event.event(GlobalEvent.PERSONALINFOUPDATE);
    }
    public get point(){
        return this._point;
    }

    //银行存款数量
    private _bank_point : number;
    public set bank_point( newPoint:number ){
        if(this._bank_point == newPoint) return;
        this._bank_point = newPoint; 
        //玩家金币发生变化
        Global.Event.event(GlobalEvent.PERSONALINFOUPDATE);
    }
    public get bank_point(){
        return this._bank_point;
    }

    public clear()
    {
        this.uid = 0;
        this._vip = 0;
        this.vipExp = 0;
        this.headkuang = "0";
        this.buyuPaotai = "0";
        this.token = "";
        this.nickname = "";
        this.headimg = "";
        this.point = 0;
        this.type = 0;
        this.phone = "";
        this.pack = 0;
        this.pid = null;
        this.open_id = "";
        this.accesstoken = "";
    }

    /**
        Uid         uint64                 `json:"uid"`
        Token       string                 `json:"token"`
        Nickname    string                 `json:"nickname"`
        Headimg     string                 `json:"headimg"`
        Point       int64                  `json:"point"`     //金币
        UserType    int32                  `json:"user_type"` //-----
        Phone       string                 `json:"phone"`     //------
        PackNo      int32                  `json:"pack_no"`
        Pid         uint64                 `json:"pid"`
        SAddr       []string               `json:"s_addr"` //----
        OpenId      string                 `json:"open_id"`
        Accesstoken string                 `json:"accesstoken"`
     */
    public init(msg:any)
    {
        this.clear();
        //玩家系统数据
        this.uid = msg.uid;
        this.token = msg.token;
        this.pack = msg.pack_no? msg.pack_no : 0;
        this.pid = msg.pid? msg.pid : 0;
        this.open_id = msg.open_id;
        this.accesstoken = msg.accesstoken;
        this.ip = msg.list_ip || ""
        if(msg && msg.merge_type !== "")
        {
            this.merge_type = msg.merge_type.toString() 
        }
        
        Global.Setting.ChannelInfo.playerChannel = this.pack;
        if (Global.Toolkit.checkNumValid(this.pid) == false){
            this.pid = 0;
        }
        Global.Setting.ChannelInfo.playerInviteCode = this.pid;
        if(this.pack != null && this.pack != 0)
        {
            Global.Setting.storage.set(HallStorageKey.Channel, this.pack);
        }
        if(this.pid && this.pid != 0)
        {
            Global.Setting.storage.set(HallStorageKey.InviteCode, this.pid.toString());
        }
        Global.Setting.storage.set(HallStorageKey.Token, this.token);
        Global.Setting.storage.set(HallStorageKey.Uid, this.uid.toString());

        //玩家游戏数据
        this.update(msg);
        //监听后续玩家数据更新
        Global.HallServer.on(NetAppface.GetUserInfo, this, this.update);
        //请求最新金币
        Global.HallServer.on(NetAppface.GetUserPoint,this,this.updateMoney);

        this.urlSign = Global.UrlUtil.getPlatformSign(this.uid + this.token + Global.Setting.SystemInfo.deviceId,Global.Setting.signKey)
        
    }

    private updateMoney( msg : any ){
        this.point = msg.point;
        this.bank_point = msg.bank_point;
    }

    public update(msg: any) 
    {
        this.uid = msg.uid;
        if(msg.self_cfg){
            this.vip = msg.vip_level;
            this.vipExp = msg.vip_coin;
            this.headkuang = "" + msg.self_cfg["head"];
            this.buyuPaotai = "" + msg.self_cfg["pao"];
        }
        let storage_vip = Global.Setting.storage.get(HallStorageKey.VIPLevel)
        if (!storage_vip && this._vip){
            Global.Setting.storage.set(HallStorageKey.VIPLevel, Number(this._vip));
        }else if (storage_vip && storage_vip < this.vip){
            Global.Setting.storage.set(HallStorageKey.VIPLevel, Number(this._vip));
        }
        if(msg && msg.merge_type !== "")
        {
            this.merge_type = msg.merge_type.toString() 
        }

        this.nickname = Global.Toolkit.substrEndWithElli(msg.nickname,14,true);
        this.headimg = msg.headimg;
        this.point = msg.point ? msg.point : 0;
        this.bank_point = msg.bank_point ? msg.bank_point : 0;
        this.type = msg.user_type;
        if(!msg.phone)
        {
            this.phone = ""
            return
        }
        if(msg.phone.indexOf(" ") == -1)
        {
            this.phone = Global.AESUtil.decodeMsg(msg.phone)
            this.phone = this.functionSw(this.phone);
        }
        else
        {
            this.phone = msg.phone;
        }
        
    }
    functionSw(str){ //去掉首尾两端的空格(^\s*)|(\s*$)
        　　  return str.replace(/(^\s*)|(\s*$)/g, "");
    }
}