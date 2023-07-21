import ModelBase from "../../../framework/model/ModelBase";
import { NetAppface } from "../../core/net/hall/NetEvent";

export default class RechargeGiftModel extends ModelBase{
    protected onInit(){

    }

    public static GetAward = "GetAward";
    public static GetCfg = "GetCfg"



    public static GetLimitTimeFirstPayActivityCfg    = "GetLimitTimeFirstPayActivityCfg"

    public static GetLimitTimeFirstPayActivityPointReq     = "GetLimitTimeFirstPayActivityPointReq"


    public static GetDailyRechargeAward = "GetAward";

    activityId: number = 4
    private _data: any;
    public get data(){
        return this._data
    }
    public safeData = null //保险金数据
    private _Status:boolean //红点

    private _switch: boolean = false

    /**
     * 限时首充返利倒计时
     */
    private _countDown = 0

    /**
     * 限时首充返利活动状态
     */
    private _timeLimitedStatus = -1
    
    public get Status()
    {
        return this._Status
    }

    public set Status(status)
    {
        this._Status = status
       
    }


    public get TimelimitedStatus()
    {
        return this._timeLimitedStatus
    }

    public set TimelimitedStatus(val)
    {
        this._timeLimitedStatus = val
    }

    public get CountDown()
    {
        return this._countDown
    }

    public set CountDown(val)
    {
        this._countDown = val
    }

    public set Switch (flag)
    {
        this._switch = flag;
        

    }

    public get Switch ()
    {
        return this._switch ;
    }

    public get Name()
    {
        return "RechargeGiftModel";
    }
    
    
    public reqReceiveActivityAward(activityId:number,key?:number) {
        let param: any = {}
        param.atype = activityId
        param.key = key
        Global.HallServer.send(NetAppface.mod, NetAppface.ReceiveActivityAward, param, (data) => {
            this.event(RechargeGiftModel.GetAward, data);

        }, null, true, 0);
    }

    public reqGetActivityCfg(showWaiting =false) {
        let param: any = {}
        Global.HallServer.send(NetAppface.mod, NetAppface.GetActivityCfg, param, (data) => {
            this.event(RechargeGiftModel.GetCfg,data);
        }, null, showWaiting, 0);
    }


    public reqGetLimitTimeFirstPayActivityCfg() {
        let param: any = {}
        Global.HallServer.send(NetAppface.mod, NetAppface.GetLimitTimeFirstPayActivityCfg, param, (data) => {
            this.event(RechargeGiftModel.GetLimitTimeFirstPayActivityCfg,data);
        }, null, true, 0);
    }


    public reqGetLimitTimeFirstPayActivityPointReq(key?:number) {
        let param: any = {}
        param.key = key
        Global.HallServer.send(NetAppface.mod, NetAppface.GetLimitTimeFirstPayActivityPointReq, param, (data) => {
            this.event(RechargeGiftModel.GetLimitTimeFirstPayActivityPointReq, data);

        }, null, true, 0);
    }

}