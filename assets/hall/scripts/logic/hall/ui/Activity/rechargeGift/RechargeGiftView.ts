
import ViewBase from "../../../../core/ui/ViewBase";
import RechargeGiftModel from "../../../../hallcommon/model/RechargeGiftModel";
import { ActivityConstants, ActivityType } from "../ActivityConstants";

export default class RechargeGiftView extends ViewBase {

    private model: RechargeGiftModel
    private timeLabel:cc.Label
    private processLabel:cc.RichText
    private progressBarMask:cc.Node
    private progressBarSprite:cc.Node

    private panel :cc.Node
    private finished :boolean = true
    private formatStr:string = "<i><color=#FFF799>赢取进度: </c></i><i><color=#FFF100>%s</c></i>"
    private progressLabel1:cc.Label
    private progressLabel2:cc.Label
    private progressLabel3:cc.Label
    private progressLabel4:cc.Label

    private minRechargeLabel:cc.Label
    private rewardLabel:cc.Label

    private joinConditionLabel :cc.Label
    private getAwardConditionLabel :cc.Label


    private boxSpine:sp.Skeleton
    private boxOpen:cc.Node
    private boxClose:cc.Node
    private finishSprite:cc.Node

    protected initView() {
       
        this.model = <RechargeGiftModel>Global.ModelManager.getModel("RechargeGiftModel");

        this.model.on(RechargeGiftModel.GetAward, this, this.onGetAward);
        this.model.on(RechargeGiftModel.GetCfg, this, this.onGetCfg);

        this.timeLabel = this.getComponent("spinenNode/panel/content/timeLabel",cc.Label)
        this.processLabel = this.getComponent("spinenNode/panel/awardContent/progress",cc.RichText)
        this.progressBarMask = cc.find("spinenNode/panel/awardContent/progressBarMask", this.node)
        this.progressBarSprite = cc.find("spinenNode/panel/awardContent/progressBarMask/bar", this.node)
        
        this.joinConditionLabel = this.getComponent("spinenNode/panel/content/contionLabel",cc.Label)
        this.getAwardConditionLabel = this.getComponent("spinenNode/panel/content/AwardTips",cc.Label)
        

        this.panel = this.getChild("spinenNode/panel")
        this.progressLabel1 = this.getComponent("spinenNode/panel/awardContent/NumLabel1",cc.Label)
        this.progressLabel2 = this.getComponent("spinenNode/panel/awardContent/NumLabel2",cc.Label)
        this.progressLabel3 = this.getComponent("spinenNode/panel/awardContent/NumLabel3",cc.Label)
        this.progressLabel4 = this.getComponent("spinenNode/panel/awardContent/NumLabel4",cc.Label)
        this.rewardLabel = this.getComponent("spinenNode/panel/TipSp/award",cc.Label)
        this.minRechargeLabel = this.getComponent("spinenNode/panel/TipSp/min",cc.Label)
        this.finishSprite = cc.find("spinenNode/panel/awardContent/finishSprite", this.node)
       
        this.addCommonClick("spinenNode/panel/getAward",this.reqGetAward,this)

        if(Global.Setting.SkinConfig.isPurple || Global.Setting.SkinConfig.isBlue)
        {
            this.boxSpine = this.getComponent("spinenNode/panel/box",sp.Skeleton)
        }
        else
        {
            this.boxOpen = this.getChild("spinenNode/panel/box/bx_open")
            if(this.boxOpen) {
                this.boxOpen.active = false
            }
            this.boxClose = this.getChild("spinenNode/panel/box/bx_close")
            if(this.boxClose) {
                this.boxClose.active = false
            }
        }
    }

    showPanel() {
        this.panel.active = true;
    }

    onSubViewShow() {
       
        this.model.reqGetActivityCfg(false)
        this.showPanel();
    }

    private onGetCfg(data) {
        if(data == null) return
        Global.Event.event(ActivityConstants.SHOW_ACT_WAITTING, false)
        let arr = data.data
        if(arr == null) return
        for (let index = 0; index < arr.length; index++) {
            if(arr[index].atype == ActivityType.rechargeGift)
            {
                this.SetAwardLabel(arr[index].cfg)
                this.SetBtnState(arr[index].cfg)
                let num :number = Global.Toolkit.formatPoint(arr[index].cfg.loss_sum)
                let value = (num /Global.Toolkit.formatPoint(arr[index].cfg.loss_mix))
                if(value>=1)
                {
                    value = 1
                    if(this.processLabel) {
                        this.processLabel.string = "已完成活动，请领取奖励"
                        this.processLabel.node.active = false
                    }
                    if(this.finishSprite) {
                        this.finishSprite.active = true
                    }
                    this.SetBoxSprite(true)
                }
                else
                {
                    if(this.processLabel) {
                        let tmpstring = Global.Toolkit.formatPoint(arr[index].cfg.loss_sum)+"/"+Global.Toolkit.formatPoint(arr[index].cfg.loss_mix).toString()
                        this.processLabel.string = cc.js.formatStr(this.formatStr,tmpstring)
                        this.processLabel.node.active = true
                    }
                    if(this.finishSprite) {
                        this.finishSprite.active = false
                    }

                    if(Global.Setting.SkinConfig.isPurple && this.boxSpine)
                    {
                        this.boxSpine.setCompleteListener(()=>{
                            this.boxSpine.setAnimation(0,"idle_AppearLoop",true)
                        })
                    }
                    else
                    {
                        if(this.boxClose) {
                            this.boxClose.active = true
                        }
                        if(this.boxOpen) {
                            this.boxOpen.active = false
                        }
                    }
                }

                // this.processBar.progress = value
                this.progressBarMask.width =  this.progressBarSprite.width*value
                
                if(arr[index].cfg.end_time.length === 0) {
                    this.timeLabel.string = "长期有效"
                }
                else {
                    this.timeLabel.string =arr[index].cfg.start_time + "~"+ arr[index].cfg.end_time
                }
                
                this.joinConditionLabel.string =Global.Toolkit.formatPoint(arr[index].cfg.pay_mix) +"y"
                this.getAwardConditionLabel.string = Global.Toolkit.formatPoint(arr[index].cfg.loss_mix) +"y"
            }
        }
    }

    SetAwardLabel(cfg: any) {
        let limit = Global.Toolkit.formatPoint(cfg.loss_mix)
        
        let num = Math.floor(limit/3000)
        this.progressLabel1.string = "0"
        this.progressLabel2.string = (1000*num).toString()
        this.progressLabel3.string = (1000*num*2).toString()
        this.progressLabel4.string = limit.toString()

        this.minRechargeLabel.string = Global.Toolkit.formatPoint(cfg.pay_mix).toString()
        this.rewardLabel.string =  Global.Toolkit.formatPoint(cfg.point).toString()
    }

    private SetBtnState(data) {
        if(data.pay_sum<data.pay_mix || data.loss_sum<data.loss_mix)
        {
            this.finished = false
        }
        else
        {
            this.finished = true
        }
    }

    private SetBoxSprite(open) {
        if(open) {
            if(Global.Setting.SkinConfig.isPurple && this.boxSpine)
            {
                this.boxSpine.setCompleteListener(()=>{
                    this.boxSpine.clearTrack(0)
                    this.boxSpine.setAnimation(0,"idle_ONLoop",true)
                })
            }
            else
            {
                if(this.boxClose) {
                    this.boxClose.active = false
                }
                if(this.boxOpen) {
                    this.boxOpen.active = true
                }
            }
        }
    }

    private reqGetAward() {
        if(this.finished)
        {
            this.model.reqReceiveActivityAward(ActivityType.rechargeGift)
        }
        else
        {
            Global.UI.fastTip("奖励在您完成任务后才能领取哦！")
        }
    }

    private onGetAward(awardData) {
        if(awardData && awardData.atype != ActivityType.rechargeGift)
        {
            return
        }
       
        this.model.Switch = false
        Global.UI.getWindow("WndActivityCenter").close();
        Global.UI.show("WndRebateGet", awardData.award);
        Global.Event.event(ActivityConstants.HIDE_RED_PORT,awardData.atype)
    }

    protected onDispose() {
        this.model.off(RechargeGiftModel.GetAward, this, this.onGetAward);
        this.model.off(RechargeGiftModel.GetCfg, this, this.onGetCfg);
    }
}