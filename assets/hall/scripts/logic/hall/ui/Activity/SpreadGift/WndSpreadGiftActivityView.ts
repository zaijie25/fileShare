import YXButton from "../../../../core/component/YXButton";
import ViewBase from "../../../../core/ui/ViewBase";
import WndBase from "../../../../core/ui/WndBase";
import RechargeGiftModel from "../../../../hallcommon/model/RechargeGiftModel";
import HallPopMsgHelper from "../../../tool/HallPopMsgHelper";
import { ActivityConstants, ActivityType } from "../ActivityConstants";
import SpreadGiftItemView from "./SpreadGiftItemView";


export default class WndSpreadGiftActivityView extends WndBase {

    private model: RechargeGiftModel
    private personLabel :cc.Label
    private rechargePointLabel :cc.Label
    private achieveIndex = -1
    private monthAwardLabel:cc.Label
    private sc0Node: cc.ScrollView
    private clickLeft: cc.Node
    private clickReight: cc.Node
    protected onInit(){
        this.name = "WndSpreadGiftActivityView";
        this.isNeedDelay = false
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/SpreadGift/spreadGiftNode"
    }

    protected initView() {
        this.model = <RechargeGiftModel>Global.ModelManager.getModel("RechargeGiftModel");

        this.model.on(RechargeGiftModel.GetAward, this, this.onGetAward);
        this.model.on(RechargeGiftModel.GetCfg, this, this.onGetConfig);
        this.personLabel = this.getComponent("count",cc.Label)
      
        
        this.monthAwardLabel = this.getComponent("monthAward",cc.Label)
        this.rechargePointLabel = this.getComponent("rechargePoint",cc.Label)
        for (let index = 0; index < 7; index++) {
            this.addCommonClick(cc.js.formatStr("sco/view/awardPanel/redPack_%s",index),this.onAwardBtnClicked,this)
        }
        // this.sc0Node = this.getComponent("sco", cc.ScrollView)
        // this.addCommonClick("sco/clickLeft", this.onClickLeftSco, this)
        // this.addCommonClick("sco/clickReight", this.onClickReightSco, this)
        // this.clickLeft = this.getChild("sco/clickLeft");
        // this.clickReight = this.getChild("sco/clickReight");
        // this.sc0Node.node.on("scroll-to-left",this.onClickLeftSco,this)
        // this.sc0Node.node.on("scroll-to-right",this.onClickReightSco,this)
        // this.onClickLeftSco();
        this.addCommonClick("close",this.close,this)
        
    }
    onClickLeftSco() {
        this.clickLeft.getComponent(YXButton).interactable = false
        this.sc0Node.scrollToLeft(0.5)
        this.clickReight.getComponent(YXButton).interactable = true
    }
    onClickReightSco() {
        this.clickReight.getComponent(YXButton).interactable = false
        this.sc0Node.scrollToRight(0.5)
        this.clickLeft.getComponent(YXButton).interactable = true
    }
    onAwardBtnClicked(target) {
        this.model.reqReceiveActivityAward(ActivityType.spreadAward)
    }

    protected onOpen() {
        
        this.model.reqGetActivityCfg(false)

    }


    protected onClose()
    {
        HallPopMsgHelper.Instance.releaseLock(ActivityType.spreadAward);
    }
   

    private onGetAward(awardData) {
        if(awardData && awardData.atype != ActivityType.spreadAward)
        {
            return
        }
        Global.UI.show("WndRebateGet", awardData.award);
        let giftItem :SpreadGiftItemView = this.getComponent(cc.js.formatStr("sco/view/awardPanel/redPack_%s",this.achieveIndex),SpreadGiftItemView)
        if(giftItem)
        {
            giftItem.RefreshState(RedPackState.Open,null)
        }
        Global.Event.event(ActivityConstants.HIDE_RED_PORT,awardData.atype)
        
    }
    protected onDispose() {
        this.model.off(RechargeGiftModel.GetAward, this, this.onGetAward);
        this.model.off(RechargeGiftModel.GetCfg, this, this.onGetConfig);
    }
    private onGetConfig(data) {
        if(data == null) return
        Global.Event.event(ActivityConstants.SHOW_ACT_WAITTING, false)
        let arr = data.data
        if(arr == null) return
        for (let index = 0; index < arr.length; index++) {
            
            if(arr[index].atype == ActivityType.spreadAward)
            {
                let  actData = arr[index].cfg
                this.achieveIndex = actData.doc

                this.personLabel.string = cc.js.formatStr("%s",actData.num)
                this.rechargePointLabel.string = Global.Toolkit.formatPointStr(actData.pay)
                for (let index = 0; index < actData.list.length; index++) {
                    let element = actData.list[index];
                    let redPackState = this.getSpreadGiftItemState(actData.doc,index)
                    let giftItem :SpreadGiftItemView = this.getComponent(cc.js.formatStr("sco/view/awardPanel/redPack_%s",index),SpreadGiftItemView)
                    if(giftItem)
                    {
                        giftItem.RefreshState(redPackState,element)
                    }
                    if(index == actData.list.length -1)
                    {
                        this.monthAwardLabel.string =  Global.Toolkit.formatPointStr(actData.list[index].point)
                    }
                }

            }
        }

    }
    

    getSpreadGiftItemState(index,dataIndex)
    {
        if(index === -1)
        {
            return RedPackState.Normal
        }
        if(index === dataIndex)
        {
            return RedPackState.HightLight
        }
        return RedPackState.Normal

    }

}

export enum RedPackState
{
    Normal = 0,
    HightLight = 1,
    Open = 2,
    None = 3
}