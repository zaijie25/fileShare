import ModelBase from "../../../framework/model/ModelBase";
import { NetAppface } from "../../core/net/hall/NetEvent";


export default class CommisionModel extends ModelBase{
   
   
    public get Name()
    {
        return "CommisionModel";
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

    public commisionList = null

    public commisionInfoTable :{ [key: number]: any } ={} 

    public static UpdateScrollview = "UpdateScrollview";
    public static UpdateleftView = "UpdateleftView";
    public static GetCommisionAward = "GetCommisionAward";

    public static UpdateData : "UpdateData"

    protected onInit() {

    }

    /**
     * 请求所有任务列表
     */
    public reqGetCommisionAllList()
    {
        Global.HallServer.send(NetAppface.mod, NetAppface.GetTaskActivityAllList, {}, (msg) => {
            this.commisionList = msg.data
            this.event(CommisionModel.UpdateleftView,msg.data)
        },this.CommisionModelErrorFunc.bind(this),false)
           

    }

    /**
     * 
     * @param type 请求任务数据
     */
    public reqGetCommisionInfo(type)
    {
        // Global.Event.event(GlobalEvent.SHOW_NET_WAITING,"requestTaskInfo")
        let param = {}
        param["global_task_type"] = type
        Global.HallServer.send(NetAppface.mod, NetAppface.GetMyTaskActivityInfo, param, (msg) => {
            this.commisionInfoTable[type] = msg
            // Global.Event.event(GlobalEvent.HIDE_NET_WAITING,"requestTaskInfo")
            this.event(CommisionModel.UpdateScrollview,msg)
        },this.CommisionModelErrorFunc.bind(this),false)
           

    }

    /**
     * 领取任务奖励
     * @param type 任务类型
     * @param id 任务id
     */
    public reqGetCommisionAward(type,id)
    {
        let param = {}
        param["task_id"] = id
        Global.HallServer.send(NetAppface.mod, NetAppface.GetMyTaskActivityReward, param, (msg) => {
            this.updataCommisionData(type,id)
            this.event(CommisionModel.GetCommisionAward,{"task_reward":msg.task_reward,"task_id":id,"global_task_type":type})
        },this.CommisionModelErrorFunc.bind(this),false)
           

    }
   

    private CommisionModelErrorFunc(data: any) {
        if (data._errstr != null) {
            Global.UI.fastTip(data._errstr + "");
            //Global.UI.fastTip(data._errstr + "[" + data._errno + "]");
        }
    }

    public GetCommisionInfoByType(type: number) {
        if (this.commisionInfoTable.hasOwnProperty(type)) {
            return this.commisionInfoTable[type]
        }
        return null
    }
    /**
     * 根据任务类型检查该项任务是否有可以领取的
     * @param type 任务类型
     */
    public checkIsAnyCommisionCanGet(type)
    {
        if (!this.commisionInfoTable.hasOwnProperty(type)) {
            return false
        }
        let commisionData = this.commisionInfoTable[type].data
        for (let index = 0; index < commisionData.length; index++) {
            let element = commisionData[index];
            if(element.task_status == 1)
            {
                return true
            }
        }
        return false
    }
    /**
     * 领取后根据任务类型和id刷新本地数据
     * @param type 任务类型
     * @param id  任务id
     */
    private updataCommisionData(type,id)
    {
        if (!this.commisionInfoTable.hasOwnProperty(type)) {
            return
        }
        let commisionReduce = false;        //本地维护任务数量
        let commisionData = this.commisionInfoTable[type].data
        for (let index = 0; index < commisionData.length; index++) {
            let element = commisionData[index];
            if(element.task_id == id)
            {   
                commisionReduce =true;
                element.task_status = 2;
                break;
            }
        }
        if(commisionReduce){
            let subItem = this.commisionList.find((item)=>{
                return item.global_task_type == type;
            })
            if(subItem != null){
                subItem.task_num -= 1;
            }
        }

    }


    public checkShowHallRedSpot()
    {
        if(!this.commisionList)
        {
            this.redSwitch = false
            return false
        }
        for (let index = 0; index < this.commisionList.length; index++) {
            let element = this.commisionList[index];
            // if(element.global_task_type == 7){//屏蔽掉游戏活跃
            //     continue;
            // }
            if(element.task_num > 0)
            {
                this.redSwitch = true
                return true
            }
        }
        this.redSwitch = false
        return false
    }

    public resetData()
    {
        this.commisionList = null
        this.commisionInfoTable = {}
    }

    
    
    
}