
import { TimeLimitedBoxState } from "./WndTimeLimitedRechargeGift";


const { ccclass, property } = cc._decorator;

@ccclass
export default class TimeLimitedAwardBoxItem extends cc.Component {

    @property([cc.Node])
    awardStateNode: cc.Node[] = []


    @property(sp.Skeleton)
    spine: sp.Skeleton = null
    @property(cc.Label)
    rateLabel: cc.Label = null

    @property(cc.Node)
    opensp:cc.Node = null;

    data: any = null

    key = null

    refreshState(data, level,index,levelCfg,reachCfg) {
        this.key = data.config.list[index].key
        this.data = data
        this.refreshRate(level)
        let state: TimeLimitedBoxState = this.getBoxStateByData(data,index,levelCfg,reachCfg)
        this.setBoxState(state)
    }


    /**
    * 
    * @param data 当前宝箱数据
    * @param is_todayData 昨日奖励是否领取完成
    */
    getBoxStateByData(data,index,levelCfg,reachCfg) 
    {
        let currentDama = data.put_code
       

        let reachFlag = reachCfg[index] == 1

        let damaFlag = currentDama>=levelCfg[index] && levelCfg[index] >0
        let status = data.status // 1 未参与 2 参与未第二次充值 3 参与已经第二次充值 0 结束

        let receiveFlag = data.config.list[index]

        if(!damaFlag)
        {
            return TimeLimitedBoxState.Normal
        }
        else
        {
            switch (status) {
                case 1:
                    return TimeLimitedBoxState.Normal

                case 2:
                    return TimeLimitedBoxState.TodayAchieved
                case 3:
                    if(!reachFlag)
                    {
                        return TimeLimitedBoxState.TodayAchieved
                    }
                    return TimeLimitedBoxState.AlreadyGot

                default:
                    break;
            }
        }
        return TimeLimitedBoxState.Normal
    }


    refreshRate(data) {
        if (!data) {
            return
        }
        this.rateLabel.string = data.rate + "%"+"首充彩金";
    }

    setBoxState(state: TimeLimitedBoxState) {
        let btn = this.node.getComponent(cc.Button)
        switch (state) {
            case TimeLimitedBoxState.Normal:
                if (btn) {
                    btn.interactable = false
                }
                this.awardStateNode[0].active = true;
                this.awardStateNode[1].active = false;
                this.opensp.active = false;
                break;
            case TimeLimitedBoxState.TodayAchieved:
                if (btn) {
                    btn.interactable = true
                }
                this.awardStateNode[0].active = false;
                this.awardStateNode[1].active = true;
                if(this.spine)
                {
                    this.spine.setAnimation(0,"idle",true)
                }
                this.opensp.active = false;
                break;
            case TimeLimitedBoxState.AlreadyGot:
                if (btn) {
                    btn.interactable = false
                }
                this.awardStateNode[0].active = false;
                this.awardStateNode[1].active = false;
                if(this.spine)
                {
                    this.spine.setAnimation(0,"idle",true)
                }
                this.opensp.active = true;
                break;

            default:
                break;
        }

    }


}
