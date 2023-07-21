
// import ViewBase from "../../../../core/ui/ViewBase";

import RechargeGiftModel from "../../../../hallcommon/model/RechargeGiftModel";
import { ActivityConstants, ActivityType } from "../ActivityConstants";
import WndBase from "../../../../core/ui/WndBase";
import TimeLimitedAwardBoxItem from "./TimeLimitedAwardBoxItem";
import HallPopMsgHelper from "../../../tool/HallPopMsgHelper";


export default class WndTimeLimitedRechargeGift extends WndBase {
    private model: RechargeGiftModel

    private examplePoint = 1000

    private timerLabel:cc.Label

    private timer  = null
    /**
     * 宝箱合集
     */
    awardBtnArr:cc.Node []= []
    /**
     * 打码示例合集
     */
    egArr = []
    awardPanel:cc.Node
    /**
     * 进行中
     */
    joinedBtn:cc.Node

    private levelCfg = []


    private reachCfg = []


    /**
     * 达成条件合集
     */

    conditionTabel:any = {}
    

    /**
     * 条件文本集合
     */
    conditionLabelTable = []
    /**
     * 立即参与
     */
    joinBtn:cc.Node
    /**
     * 打码进度条
     */
    progress:cc.ProgressBar

    /**
     * 打码进度
     */
    winProgress:cc.RichText
    /**
     * 当前点击的宝箱
     */
    clickNode :cc.Node = null

    protected onInit(){
        this.name = "WndTimeLimitedRechargeGift";
        this.isNeedDelay = true
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/TimeLimitedActivity/TimeLimitedRecharge"
    }
    protected initView()
    {
       
        this.model = <RechargeGiftModel>Global.ModelManager.getModel("RechargeGiftModel");
        this.joinBtn = this.addCommonClick("button",this.onJoinButtonClicked,this)
        this.joinedBtn = this.getChild("joined")
        this.addCommonClick("close",this.close,this)
        this.progress = this.getComponent("progressBar",cc.ProgressBar)
        this.winProgress = this.getComponent("WinProgress/WinProgressLabel",cc.RichText)
        this.progress.progress = 0;
        this.timerLabel = this.getComponent("WinProgress/timerLabel",cc.Label)
        this.awardPanel = this.getChild("AwarPanel")
        for (let index = 0; index < 3; index++) {
             this.awardBtnArr[index] = Global.UIHelper.addCommonClick(this.awardPanel,cc.js.formatStr("Award_%s",index),this.onAwardBtnClicked,this)
             if(Global.Setting.SkinConfig.isDarkgold)
             {
                this.egArr[index] = this.getComponent("content/"+cc.js.formatStr("eg%s",index+1), cc.RichText)
                this.conditionLabelTable[index] = this.getComponent("content/"+cc.js.formatStr("condition%s",index+1),cc.RichText)

             }
             else
             {
                this.egArr[index] = this.getComponent("content/"+cc.js.formatStr("eg%s",index+1), cc.Label)
                this.conditionLabelTable[index] = this.getComponent("content/"+cc.js.formatStr("condition%s",index+1),cc.Label)

             }
             
             if(!this.conditionTabel[index])
             {
                this.conditionTabel[index] = {}
             }
             this.conditionTabel[index][0]  = this.getChild("content/"+cc.js.formatStr("condition%s",index+1) + "/no")
             this.conditionTabel[index][1] = this.getChild("content/"+cc.js.formatStr("condition%s",index+1) + "/yes")

        }

        this.model.on(RechargeGiftModel.GetLimitTimeFirstPayActivityPointReq, this, this.onGetAward);
        this.model.on(RechargeGiftModel.GetLimitTimeFirstPayActivityCfg, this, this.onGetConfig);
        cc.game.on(cc.game.EVENT_SHOW, this.setTimer, this);
    }
    onAwardBtnClicked(target) {
        let node = target.node
        this.clickNode = node
        if(node && node.isValid)
        {
            let awardItem = node.getComponent(TimeLimitedAwardBoxItem)
            if(awardItem)
            {
                this.model.reqGetLimitTimeFirstPayActivityPointReq(awardItem.key)
            }
            

        }

    }
    onJoinButtonClicked() 
    {
        Global.UI.show("WndRecharge", "vippay");
    }

    close(){
        Global.UI.close(this.name);
        HallPopMsgHelper.Instance.releaseLock(ActivityType.TimeLimitedActivity);
    }

    protected onOpen()
    {
       
        this.model.reqGetLimitTimeFirstPayActivityCfg()
    }

    private onGetAward(awardData) {
        
        if(!awardData)
        {
            return
        }
        Global.UI.show("WndRebateGet", awardData.point);
        if(this.clickNode && this.clickNode.isValid)
        {
            let awardItem = this.clickNode.getComponent(TimeLimitedAwardBoxItem)
            if(awardItem)
            {
                awardItem.setBoxState(TimeLimitedBoxState.AlreadyGot)
            }
        }
        this.changeReceiveState(awardData.key)

        let flag = this.checkIsAnyNotReceive()
        if(!flag)
        {
            this.model.TimelimitedStatus = 0
            Global.Event.event(GlobalEvent.TimeLimitedRechargeStatusChange,true)
            this.close()
        }
       

    }


    protected onClose()
    {
        this.clickNode = null
        this.levelCfg = []
        this.reachCfg = []
        this.clearTimeOut()
    }
    private onGetConfig(data)
    {
        this.OnDataPrepared()
        if(data == null) return
        Global.Event.event(ActivityConstants.SHOW_ACT_WAITTING, false)
        this.joinBtn.active = data.status == 1
        this.joinedBtn.active = data.status > 1

        this.refreshPanel(data)
    }
   
    refreshPanel(actData: any) {
        if(actData == null) return
        this.setTimer()
        this.assembyData(actData)
        this.refreshConditionContent(actData)
        this.refreshEgContent(actData)
        this.refreshAwardPanel(actData)
        this.setProgress(actData)

    }

    assembyData(data)
    {
        
        this.levelCfg.push( data.one_code)
        this.levelCfg.push( data.two_code)
        this.levelCfg.push( data.three_code)

        let cfg = data.data
        this.reachCfg.push(cfg.one_lv)
        this.reachCfg.push(cfg.two_lv)
        this.reachCfg.push(cfg.three_lv)
    }

    refreshConditionContent(data)
    {
       
        let status = data.status // 1 未参与 2 参与未第二次充值 3 参与已经第二次充值 0 结束
        let reachFlag = this.checkReachAnyLevel(data)
        if(!this.conditionTabel)return

        this.conditionTabel[0][0].active = status == 1
        this.conditionTabel[0][1].active = status > 1
        
        this.conditionTabel[1][0].active = !reachFlag
        this.conditionTabel[1][1].active = reachFlag

        this.conditionTabel[2][0].active = status != 3
        this.conditionTabel[2][1].active = status == 3

        if(Global.Setting.SkinConfig.isDarkgold)
        {
            if(status>1)
            {
                this.conditionLabelTable[0].string = '<i><color = #8FC31F>条件一 ：该活动仅限会员第一笔【赠送专区入款】充值自动参与；</c></i>'
            }
            else
            {
                this.conditionLabelTable[0].string = '<i><color = #F5D8A7>条件一 ：该活动仅限会员第一笔【赠送专区入款】充值自动参与</c></i>'
            }
            if(reachFlag)
            {
                this.conditionLabelTable[1].string = '<i><color = #8FC31F>条件二 ：达到对应的流水打码量；</c></i>'
            }
            else
            {
                this.conditionLabelTable[1].string = '<i><color = #F5D8A7>条件二 ：达到对应的流水打码量；</c></i>'
            }

            if(status == 3)
            {
                this.conditionLabelTable[2].string = '<i><color = #8FC31F>条件三 ：次日充值任意金额；</c></i>'
            }
            else
            {
                this.conditionLabelTable[2].string = '<i><color = #F5D8A7>条件三 ：次日充值任意金额；</c></i>'
            }


        }
        else if(Global.Setting.SkinConfig.isGreen)
        {
            if(status>1)
            {
                this.conditionLabelTable[0].node.color = new cc.Color().fromHEX('#22AC38');
            }
            else
            {
                this.conditionLabelTable[0].node.color = new cc.Color().fromHEX('#9D5725');
            }
            if(reachFlag)
            {
                this.conditionLabelTable[1].node.color = new cc.Color().fromHEX('#22AC38');
            }
            else
            {
                this.conditionLabelTable[1].node.color = new cc.Color().fromHEX('#9D5725');
            }

            if(status == 3)
            {
                this.conditionLabelTable[2].node.color = new cc.Color().fromHEX('#22AC38');
            }
            else
            {
                this.conditionLabelTable[2].node.color = new cc.Color().fromHEX('#9D5725');
            }
        }

        
    }

    refreshEgContent(data)
    {
        let info = '当会员达到（1000+%s）*%s=%s流水即可获得%s元首充彩金'
        let levelCfg = data.config.list
        if(!levelCfg)
        {
            return
        }
        let dama = 0
        for (let index = 0; index < levelCfg.length; index++) {
            let level = levelCfg[index];
            let rata = level.rate
            let muilt = level.dama_multi
            dama += this.examplePoint * rata/100
            let total = (this.examplePoint + dama) * muilt
            if(Global.Setting.SkinConfig.isDarkgold)
            {
                info = (index+1)+"."+'当会员达到（1000+%s）*%s=<color= #FFF55B>%s</c>流水即可获得%s元首充彩金'
                this.egArr[index].string = `<i>${info}</i>`
                continue
            }
            else if(Global.Setting.SkinConfig.isGreen)
            {
                info = (index+1)+"."+'当会员达到（1000+%s）*%s=<color= #EB6100>%s</c>流水即可获得%s元首充彩金'
                this.egArr[index].string = `<i>${info}</i>`
            }
            this.egArr[index].string = cc.js.formatStr((index+1)+"."+info,dama,muilt,total,this.examplePoint * rata/100)

        }


    }

    refreshAwardPanel(data)
    {
        let levelCfg = data.config.list
        if(!levelCfg)
        {
            return
        }
        for (let index = 0; index < levelCfg.length; index++) {
            let level = levelCfg[index];
            this.awardBtnArr[index].getComponent(TimeLimitedAwardBoxItem).refreshState(data,level,index,this.levelCfg,this.reachCfg)

        }
    }

    checkReachAnyLevel(data)
    {
        let flag = false
        let currentDama = data.put_code
        
        if(this.levelCfg.length == 0) return flag      
        for (let index = 0; index < this.levelCfg.length; index++) {
            let level = this.levelCfg[index];
            if(level && currentDama >= level)
            {
                flag = true
                break
            }
            
        }  
        return flag
    }

    setTimer()
    {
        if(this.model.TimelimitedStatus >1)
        {
            this.timerLabel.node.active = false
            return
        }
        this.clearTimeOut()
        let currentTime = new Date().getTime()
        let time = this.model.CountDown * 1000 - currentTime
        time = Math.ceil(time/1000)
        this.timerLabel.string = Global.Toolkit.secondFormatHMS(time)
        this.timer = setInterval(() => {
            this.timerLabel.string = Global.Toolkit.secondFormatHMS(time)
            time -= 1
            if(time<=0)
            {
                this.timerLabel.node.active = false
            }
        }, 1000);

    }

    clearTimeOut()
    {
        if(this.timer)
        {
            clearInterval(this.timer)
        }
        this.timer = null
    }
    /**
     * 设置进度条
     * @param actData 
     */
    setProgress(data:any) {
        this.progress.progress = data.put_code/ data.three_code
        if(!data.three_code)
        {
            this.progress.progress = 0
        }
        let current = Global.Toolkit.formatPointStr(data.put_code) || "0"
        let all = Global.Toolkit.formatPointStr(data.three_code)|| "0"
        this.winProgress.string = `${current}/${all}</c>`
        
    }
    

    private changeReceiveState(level)
    {
        if(this.reachCfg[level-1] === 0)
        {
            this.reachCfg[level-1] = 1

        }
    }

    private checkIsAnyNotReceive()
    {
        for (let index = 0; index < this.reachCfg.length; index++) {
            let  element = this.reachCfg[index];
            if(!element)
            {
                return true
            }
        }
        return false
    }


    protected onDispose()
    {
        this.clickNode = null
        this.levelCfg = []
        this.reachCfg = []
        this.model.off(RechargeGiftModel.GetLimitTimeFirstPayActivityPointReq, this, this.onGetAward);
        this.model.off(RechargeGiftModel.GetLimitTimeFirstPayActivityCfg, this, this.onGetConfig);
        cc.game.off(cc.game.EVENT_SHOW, this.setTimer, this);
    }
  
}

export enum TimeLimitedBoxState
{
    /**常规 不可点击*/
    Normal = 0, 
    /**高亮 可点击*/
    TodayAchieved = 1,
    /**已领取 */
    AlreadyGot = 2,
    
}
