// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import RechargeGiftModel from "../../../hallcommon/model/RechargeGiftModel";
import CommisionModel from "../../../hallcommon/model/CommisionModel";
import { SkinType } from "../../../hallcommon/app/SkinConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CommisionItem extends cc.Component {

    @property([cc.Node])
    btnArrary: cc.Node[] = [];

    @property (cc.Label)
    awardLable: cc.Label = null

    @property (cc.ProgressBar)
    progress: cc.ProgressBar = null

    @property (cc.Label)
    commisionName: cc.Label = null

    @property (cc.Label)
    commisionDescribe: cc.Label = null

    @property (cc.Label)
    progressLabel: cc.Label = null

    @property (cc.Node)
    getAwardBtn: cc.Node = null

    data :any = null
    private model: CommisionModel = null

    private global_task_type = - 1



    onLoad()
    {
       Global.UIHelper.addCommonClick(this.node,"getAward",this.onGetAwardBtnClicked,this)
       this.model = <CommisionModel>Global.ModelManager.getModel("CommisionModel");
       this.model.on(CommisionModel.GetCommisionAward, this,this.onGetAward);
      
    }
    
    onGetAward(data) {
        if (!data || !data.task_reward) return
        if (data.global_task_type == this.global_task_type && this.data.task_id == data.task_id) {
            Global.UI.show("WndRebateGet", data.task_reward);
            // Global.UI.show("WndCongratulationGet",data.task_reward);
            this.data.task_status = 2
            this.UpdateUI(this.data,this.global_task_type)
        }

    }

    onDestroy()
    {
        this.model.off(CommisionModel.GetCommisionAward, this,this.onGetAward);

    }
    onGetAwardBtnClicked(target) {
        if(!this.data)
        {
            return
        }
        this.model.reqGetCommisionAward(this.global_task_type,this.data.task_id)
    }

    /**
     * name
     */
    public UpdateUI(data, type) {
        if(!data || !cc.isValid(this.node)) return
        this.data = data
        this.global_task_type = type
        if(this.btnArrary)
        {
            this.btnArrary[0].active = data.task_status == 0
            this.btnArrary[1].active = data.task_status == 1
            this.btnArrary[2].active = data.task_status == 2
        }
        if(this.getAwardBtn)
        {
            let btn = this.getAwardBtn.getComponent(cc.Button)
            if(btn)
            {
                btn.interactable = data.task_status == 1
            }
        }
        if(this.awardLable)
        {
            this.awardLable.string = Global.Toolkit.formatPointStr(data.task_reward)
        }


        if(this.progress)
        {
            this.progress.progress = data.task_num != 0 ? (data.task_self_num/data.task_num) : 0
        }

        if(this.progressLabel)
        {
            this.progressLabel.string = cc.js.formatStr("%s/%s",data.task_self_num,data.task_num)
        }

        if(this.commisionName)
        {
            this.commisionName.string = data.name
        }

        if(this.commisionDescribe)
        {
            this.commisionDescribe.string = data.task_desc
        }
        
    }
}

