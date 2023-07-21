// import { BoxState } from "./DailyRechargeGiftView";

import { BoxState } from "./WndDailyRechargeGift";


const { ccclass, property } = cc._decorator;

@ccclass
export default class AwardBoxItem extends cc.Component {

    @property([cc.Sprite])
    awardStateSprite: cc.Sprite[] = []

    @property(cc.Node)
    shinyNode: cc.Node = null
    @property(cc.Label)
    rateLabel: cc.Label = null
    data: any = null

    is_done: boolean = false

    isYesterdayAchieve: boolean = false

    is_todayData : boolean = false

    // LIFE-CYCLE CALLBACKS:

    /**
     * 
     * @param data 当前宝箱数据
     * @param is_done 昨日奖励是否领取完成
     */
    refreshState(data, is_done,is_todayData,isYesterdayAchieve) {
        if (!data) {
            this.setBoxState(BoxState.Normal)
            return
        }
        this.data = data
        this.is_done = is_done
        this.is_todayData = is_todayData
        this.isYesterdayAchieve = isYesterdayAchieve
        
        let boxState = this.getBoxStateByData(data,is_todayData)
        this.setBoxState(boxState)
    }
    refreshRate(data) {
        if (!data) {
            return
        }
        this.rateLabel.string = data.rate+"%"
    }
    setBoxState(state: BoxState) {
        let btn = this.node.getComponent(cc.Button)
        switch (state) {
            case BoxState.Normal:
                if (btn) {
                    btn.interactable = false
                }
                this.awardStateSprite[0].node.active = true
                this.awardStateSprite[1].node.active = false
                this.awardStateSprite[2].node.active = false
                this.shinyNode.active = false
                break;
            case BoxState.TodayAchieved:
                if (btn) {
                    btn.interactable = true
                }
                this.awardStateSprite[0].node.active = true
                this.awardStateSprite[1].node.active = false
                this.awardStateSprite[2].node.active = true
                this.shinyNode.active = false
                break;
            case BoxState.RealAchieved:
                if (btn) {
                    btn.interactable = true
                }
                this.awardStateSprite[0].node.active = false
                this.awardStateSprite[1].node.active = false
                this.awardStateSprite[2].node.active = false
                this.shinyNode.active = true
                break;
            case BoxState.AlreadyGot:
                if (btn) {
                    btn.interactable = false
                }
                this.awardStateSprite[0].node.active = false
                this.awardStateSprite[1].node.active = true
                this.awardStateSprite[2].node.active = false
                this.shinyNode.active = false
                break;
            default:
                break;
        }
    }
    /**
     * 
     * @param data 当前宝箱数据
     * @param is_todayData 昨日奖励是否领取完成
     */
    getBoxStateByData(data,is_todayData)
    {
        if(!data) return BoxState.Normal
        if(!data.is_ava) //未达成
        {
            return BoxState.Normal
        }
        else if(data.is_ava && !data.status && !is_todayData) //达成且未领取
        {
            return BoxState.RealAchieved
        }
        else if(data.is_ava && !data.status && is_todayData) //达成且未领取
        {
            return BoxState.TodayAchieved
        }
        else if(data.is_ava && data.status)//达成且已领取
        {
            return BoxState.AlreadyGot
        }

    }

}
