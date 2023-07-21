
// import ViewBase from "../../../../core/ui/ViewBase";

import RechargeGiftModel from "../../../../hallcommon/model/RechargeGiftModel";
import { ActivityConstants, ActivityType } from "../ActivityConstants";
import AwardBoxItem from "./AwardBoxItem";
import WndBase from "../../../../core/ui/WndBase";
import HallPopMsgHelper from "../../../tool/HallPopMsgHelper";


export default class WndDailyRechargeGift extends WndBase {
    private model: RechargeGiftModel
    awardBtnArr:cc.Node []= []
    damaArr:cc.Label []= []
    rateLabe:cc.Label
    awardPanel:cc.Node
    progress:cc.ProgressBar
    winProgress:cc.Label
    clickNode :cc.Node = null

    protected onInit(){
        this.name = "WndDailyRechargeGift";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/DailyRechargeGift/dailyRechargeGift"
    }
    protected initView()
    {
       
        this.model = <RechargeGiftModel>Global.ModelManager.getModel("RechargeGiftModel");
        this.addCommonClick("button",this.onJoinButtonClicked,this)
        this.addCommonClick("close",this.close,this)
        this.progress = this.getComponent("progressBar",cc.ProgressBar)
        this.winProgress = this.getComponent("WinProgress/WinProgressLabel",cc.Label)
        this.rateLabe = this.getComponent("rateLabe",cc.Label)
        this.progress.progress = 0;
        this.awardPanel = this.getChild("AwarPanel")
        for (let index = 0; index < 3; index++) {
             this.awardBtnArr[index] = Global.UIHelper.addCommonClick(this.awardPanel,cc.js.formatStr("Award_%s",index),this.onAwardBtnClicked,this)
             this.damaArr[index] = this.getComponent("AwarPanel/"+cc.js.formatStr("damaLabe_%s",index), cc.Label)
        }
        this.model.on(RechargeGiftModel.GetAward, this, this.onGetAward);
        this.model.on(RechargeGiftModel.GetCfg, this, this.onGetConfig);
    }
    onAwardBtnClicked(target) {
        let node = target.node
        this.clickNode = node
        if(node && node.isValid)
        {
            let awardItem = node.getComponent(AwardBoxItem)
            if(awardItem.data && awardItem.is_todayData && awardItem.isYesterdayAchieve)
            {
                Global.UI.fastTip("已领取今日全部奖励，请明天再来！")
                return
            }
            if(awardItem.data && awardItem.is_todayData && !awardItem.isYesterdayAchieve)
            {
                Global.UI.fastTip("未完成任务，请明日完成任意充值后再领取！")
                return
            }
            if( awardItem.data && awardItem.data.is_ava && !awardItem.data.status && !awardItem.is_done)
            {
                this.model.reqReceiveActivityAward(ActivityType.dailyRechargeGift,awardItem.data.key)
            }
        }

    }
    onJoinButtonClicked() 
    {
        Global.UI.show("WndRecharge")
    }

    close(){
        Global.UI.close(this.name);
    }

    protected onOpen()
    {
       
        this.model.reqGetActivityCfg(false)
    }

    private onGetAward(awardData) {
        
        if(awardData && awardData.atype != ActivityType.dailyRechargeGift)
        {
            return
        }
        Global.UI.show("WndRebateGet", awardData.award);
        if(this.clickNode && this.clickNode.isValid)
        {
            let awardItem = this.clickNode.getComponent(AwardBoxItem)
            if(awardItem)
            {
                awardItem.setBoxState(BoxState.AlreadyGot)
            }
        }

    }
    protected onClose()
    {
        this.clickNode = null
        HallPopMsgHelper.Instance.releaseLock(ActivityType.dailyRechargeGift);
    }
    private onGetConfig(data)
    {
        if(data == null) return
        Global.Event.event(ActivityConstants.SHOW_ACT_WAITTING, false)
        let arr = data.data
        for (let index = 0; index < arr.length; index++) {
            let cfg = arr[index];
            if(cfg && cfg.atype == ActivityType.dailyRechargeGift )
            {
                let actData = cfg.cfg
                this.refreshPanel(actData)
                break
            }
            
        }
    }
    /**
     * 1.昨日未参与，显示今天数据
     * 2.昨日参与，未完成任何一项，今日参与（充值)，显示今天数据
     * 3.昨日参与，未完成任何一项，今日未参与（充值)，显示昨天数据
     * 4.昨日参与，已完成的项全部领取完成，显示今天数据
     * 5.昨日参与，有完成且未领取的项，显示昨天数据
     * 6.昨日今日均未参与，显示默认数据
     * 
     */
    refreshPanel(actData: any) {
        if(actData == null) return
        this.setAwardBoxRate(actData.cfg);
        if(actData.yes_list && actData.yes_list.list == null) //1 6
        {
            let total = actData.today_list.total || 0
            let dama = actData.today_list.dama || 0
            this.progress.progress = 0
            if(total)
            {
                this.progress.progress = dama/total
            }
            this.setAwardBoxState(actData.today_list,false,true,false)
            this.setProgress(actData.today_list);
            this.setWinProgressRichText(actData.today_list.dama,actData.today_list.total)
            return
        }
        let isYesterdayAchieve:boolean = this.getIsYesterdayAchieve(actData)
        let isYesterdayDone:boolean = this.getIsYesterdayDone(actData)
        let isTodayRecharge:boolean = actData.today_list && actData.today_list.pay >0
        if(isYesterdayAchieve) // 5 4
        {
            let achieveList =  isYesterdayDone ? actData.today_list : actData.yes_list
            let total = achieveList.total
            let dama = achieveList.dama
            
            this.progress.progress = 0
            if(total)
            {
                this.progress.progress = (dama/total)
            }
            this.setAwardBoxState(achieveList,isYesterdayDone,isYesterdayDone,isYesterdayAchieve)
            this.setProgress(achieveList);
            this.setWinProgressRichText(dama,total)
            return
        }

        if(!isYesterdayAchieve)//2 3
        {
            let achieveList =  isTodayRecharge ? actData.today_list : actData.yes_list
            let total = achieveList.total
            let dama = achieveList.dama
            
            this.progress.progress = 0
            if(total)
            {
                this.progress.progress = (dama/total)
            }
            this.setAwardBoxState(achieveList,isYesterdayDone,isTodayRecharge,isYesterdayAchieve)
            this.setProgress(achieveList);
            this.setWinProgressRichText(dama,total)
            return
        }

    }
    /**
     * 设置进度条
     * @param actData 
     */
    setProgress(data:any) {
        if(data == null || data.list == null)
        {
            return
        }
        for (let index = 0; index < data.list.length; index++) {
            let is_ava = data.list[index].is_ava
            if(index == 1 && is_ava)
            {
                this.progress.progress = 0.5
            }if(index == 2 && is_ava){
                this.progress.progress = 1
            }
        }
    }
    /**
     * 检查昨日是否有达成任意一项奖励
     * @param actData 
     */
    getIsYesterdayAchieve(actData: any) {
        let yesterdayData = actData.yes_list
        if(!yesterdayData || !yesterdayData.list)
        {
            return false
        }
        for (let index = 0; index < yesterdayData.list.length; index++) {
            if(yesterdayData.list[index].is_ava  )
            {
                return true
            }
        }
        return false
    }
    /**
     * 检查是否昨日奖励已全部领取完毕
     * @param actData 
     */
    getIsYesterdayDone(actData: any): boolean {
        let yesterdayData = actData.yes_list
        if(!yesterdayData || !yesterdayData.list)
        {
            return false
        }
        //data.is_ava && !data.status
        for (let index = 0; index < yesterdayData.list.length; index++) {
            if(yesterdayData.list[index].is_ava && !yesterdayData.list[index].status )
            {
                return false
            }
        }
        return true
    }

    setAwardBoxState(data:any,is_done:boolean,isTodayData:boolean,isYesterdayAchieve) {
        if(data == null || data.list == null)
        {
            for (let index = 0; index < this.awardBtnArr.length; index++) {
                let node = this.awardBtnArr[index]
                if(node && node.isValid)
                {
                    node.getComponent(AwardBoxItem).refreshState(null,false,isTodayData,isYesterdayAchieve)
                }
            }
            return
        }
        for (let index = 0; index < data.list.length; index++) {
            let node = this.awardBtnArr[index]
            if(node && node.isValid)
            {
                node.getComponent(AwardBoxItem).refreshState(data.list[index],is_done,isTodayData,isYesterdayAchieve)
            }
        }
    }
    setAwardBoxRate(data:any) {
        if(data == null || data.list == null)
        {
            return
        }
        let rateLabeText = cc.js.formatStr("%s+%s=%s",data.list[0].rate *10,data.list[1].rate *10,(data.list[0].rate + data.list[1].rate) * 10);
        this.rateLabe.string = "当日打码量和返利金额均为累计计算，比如玩家打到第2档时实际可获得"+rateLabeText+"元奖励。次日充值任意金额，即可领取对应返利金额。";                    
        

        for (let index = 0; index < data.list.length; index++) {
            let ratedata = data.list[index];
            let text = "%s.玩家当日打码量(1000+%s)*%s=%s时,即可获得%s%首充返利奖励%s元"
            let dama = (1000 + ratedata.dama_rate*10)*ratedata.dama_multi;
            var msgStr = cc.js.formatStr(text,ratedata.key,ratedata.dama_rate*10,ratedata.dama_multi,dama,ratedata.rate,ratedata.rate*10);
            let damaLabel = this.damaArr[index]
            damaLabel.string = msgStr;
            let node = this.awardBtnArr[index]
            if(node && node.isValid)
            {
                node.getComponent(AwardBoxItem).refreshRate(ratedata)
            }
        }
    }
    setWinProgressRichText(charge:number,total:number){
       // ["#F2D060","#F2D060",20,22]
        let str = cc.js.formatStr("<color=%s><size=%s>%s/</c><color=%s><size=%s>%s</color>",
        Global.Setting.SkinConfig.dailyRechargeFontColorAndSize[0],Global.Setting.SkinConfig.dailyRechargeFontColorAndSize[2],
        Global.Toolkit.formatPointStr(charge),
        Global.Setting.SkinConfig.dailyRechargeFontColorAndSize[1],Global.Setting.SkinConfig.dailyRechargeFontColorAndSize[3],Global.Toolkit.formatPointStr(total));
        this.winProgress.string = ""+Global.Toolkit.formatPointStr(charge)+"/" + Global.Toolkit.formatPointStr(total);
    }

    protected onDispose()
    {
        this.model.off(RechargeGiftModel.GetAward, this, this.onGetAward);
        this.model.off(RechargeGiftModel.GetCfg, this, this.onGetConfig);
    }
  
}

export enum BoxState
{
    /**常规 不可点击*/
    Normal = 0, 
    /**高亮 可点击*/
    TodayAchieved = 1,
    /**打开 */
    AlreadyGot = 2,
    /**达到条件 */
    RealAchieved = 3,
    
}
