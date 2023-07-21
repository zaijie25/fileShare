
export class SingleActivityModel {
    public status: number = 0; //开关 0关 1开
    public sort:number = 0
    public atype:number = 0
    public button_status = 0
    public ptype = 0
}


export default class ActivityToggle {
    
    
    //要显示的活动按钮列表
    private _activityList:SingleActivityModel[] = [];

    constructor() {
        this.clear();
    }

    private _activitCfg:any = null

    public set ActivityCfg(val)
    {
        this._activitCfg = val
    }

    public get ActivityCfg()
    {
        return this._activitCfg
    }

    public clear() {
        this._activityList = [];
    }

    public init(activityData: []) {
        if (!activityData) {
            Logger.error("----activityList------ null")
            return;
        }
        let tempActivityList:SingleActivityModel[] = [];
        for (let i = 0; i < activityData.length; i++) {
            let itemData = activityData[i];
            if(itemData == null){
                continue;
            }
            let activityModel = new SingleActivityModel();
            for (let key in activityModel) {
                if (itemData[key] != null && itemData[key] != undefined) {
                    activityModel[key] = itemData[key];
                }
            }
            
            if (activityModel.button_status == 1) {
                //状态为开时存入
                tempActivityList.push(activityModel);
            }
        }

        this._activityList = tempActivityList;
    }

    public get activityList():SingleActivityModel[] {
        return this._activityList;
    }

    public checkActivityBtnOpen(atype)
    {
        for(let i=0;i<this._activitCfg.length;i++){
            if(this._activitCfg[i].atype===atype){
                return this._activitCfg[i].button_status == 1 // 1显示 2关闭
            }
        }
        return false
    }


}