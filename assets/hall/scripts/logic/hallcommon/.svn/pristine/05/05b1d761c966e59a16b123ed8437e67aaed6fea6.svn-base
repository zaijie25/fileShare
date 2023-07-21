import ModelBase from "../../../framework/model/ModelBase";
import { NetAppface } from "../../core/net/hall/NetEvent";
import RechargeGiftModel from "./RechargeGiftModel";

export default class TimeLimitedRecgargeModel extends ModelBase{
    protected onInit(){

    }

    public static GetAward = "GetAward";
    public static GetCfg = "GetCfg"

    public static GetDailyRechargeAward = "GetAward";

    activityId: number = 4
    private _data: any;
    public get data(){
        return this._data
    }
    public safeData = null //保险金数据
    private _Status:boolean //红点

    private _switch: boolean = false
    
    public get Status()
    {
        return this._Status
    }

    public set Status(status)
    {
        this._Status = status
       
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

}