import ModelBase from "../../../framework/model/ModelBase";
import { RightViewType } from "../../hall/ui/Activity/ActivityConstants";



export default class SignActivityModel extends ModelBase{
   
   
    public get Name()
    {
        return "SignActivityModel";
    }

    /**
     * 红点控制
     */
    private _redFlag:boolean = false

    public set redSwitch(flag)
    {
        this._redFlag = flag
        
    }

    public get redSwitch()
    {
       return this._redFlag
    }

    private actData = null


    public static UpdataPanel = "UpdataPanel"

    public static OnGetAward = "OnGetAward"

    protected onInit() {

    }

    
 public reqReceiveActivityAward(activityId:number,key?:number) {
        let param: any = {}
        param.atype = activityId
        param.key = key
        Global.HallServer.send(NetAppface.mod, NetAppface.ReceiveActivityAward, param, (data) => {
            this.event(SignActivityModel.OnGetAward,data)
        }, null, true, 0);
    }

    public reqGetActivityCfg(showWaiting =false) {
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING,"reqGetActivityCfg")
        let param: any = {}
        Global.HallServer.send(NetAppface.mod, NetAppface.GetActivityCfg, param, (data) => {
            let arr = data.data
            for (let index = 0; index < arr.length; index++) {
                let cfg = arr[index];
                if(cfg && cfg.atype == RightViewType.signActivity )
                {
                    this.actData = cfg.cfg
                    break
                }
            }
            this.event(SignActivityModel.UpdataPanel,this.actData)
        }, null, showWaiting, 0);
    }
    

    public checkFlowStatusFinish()
    {
        if(!this.actData )
        {
            this.redSwitch = false
            return false
           
        } 
        let day = this.actData.day
        if(day == 4)
        {
            return true
        }
        for (let index = 0; index < this.actData.list.length; index++) {
            let element = this.actData.list[index];
            switch (day) {
                case 1:
                    let dayOneData = element.one
                    if(dayOneData.flow_status === 0)
                    {
                        this.redSwitch = false
                        return false
                    }
                   
                    break;
                case 2:
                    let dayTwoData = element.two
                    if(dayTwoData.flow_status === 0)
                    {
                        this.redSwitch = false
                        return false
                    }
                    break;
                case 3:
                    let dayThirdData = element.three
                    if(dayThirdData.flow_status === 0)
                    {
                        this.redSwitch = false
                        return false
                    }
                    break;
    
                default:
                    break;
            }        
        }
        this.redSwitch = this.actData.status == 1
        return this.actData.status == 1
    }
    
    
}