import WndBase from "../../../core/ui/WndBase";
import { HallRedSpotType } from "../../../hallcommon/model/HallModel";
import HallPopMsgHelper from "../../tool/HallPopMsgHelper";
import { ActivityType } from "../Activity/ActivityConstants";

export default class WndDailyGiftMoneyUI extends WndBase {
    private dayLabel: cc.Label;
    private weekLabel: cc.Label;
    private monthLabel: cc.Label;
    /**可领取 */
    private selectedNode = [];
    /**已经领取 */
    private noSelectedNode = [];
    /**未达成条件*/
    private unacommpolishedNode = [];
    private daily_cfg = null;
    protected onInit() {
        this.isNeedDelay = true
        this.name = "WndDailyGiftMoneyUI";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/DailyGiftMoney/DailyGiftMoneyUI";
    }
    /**日可领取 */
    yesterdayBetBool = false;
    /**周可领取 */
    weekBetBool = false;
    /**月可领取 */
    monthBetBool = false;

    protected initView() {
        this.selectedNode = [];
        this.noSelectedNode = [];
        this.unacommpolishedNode = [];
        this.dayLabel = this.getComponent("item1/jibiLabel", cc.Label);
        this.weekLabel = this.getComponent("item2/jibiLabel", cc.Label);
        this.monthLabel = this.getComponent("item3/jibiLabel", cc.Label);
        this.addCommonClick("button", this.giftMoneyList, this)
        this.addCommonClick('close', this.close, this)
        for (let i = 1; i < 4; i++) {
            let item = this.getChild("item" + i)
            let selected = cc.find("button/btn_lqjl1", item)
            let noSelected = cc.find("button/btn_lqjl3", item)
            let unacommpolished = cc.find("button/btn_lqjl2", item)
            if (i == 1) {
                Global.UIHelper.addCommonClick(item, "button/btn_lqjl1", this.onGetdaily, this);
            } else if (i == 2) {
                Global.UIHelper.addCommonClick(item, "button/btn_lqjl1", this.onGetweekly, this);
            } else if (i == 3) {
                Global.UIHelper.addCommonClick(item, "button/btn_lqjl1", this.onGetmonthly, this);
            }
            this.selectedNode.push(selected);
            this.noSelectedNode.push(noSelected)
            this.unacommpolishedNode.push(unacommpolished)
            noSelected.active = false;
            selected.active = false;
            unacommpolished.active = false;
        }
        this.dayLabel.string = "0.00"
        this.weekLabel.string = "0.00"
        this.monthLabel.string = "0.00"
    }
    protected onOpen() {
        this.OnDataPrepared();
        Global.HallServer.send(NetAppface.mod, NetAppface.GetDailyGiftMoneyCfg, null, (data) => {
            this.daily_cfg = data;
            let daily = data.daily_cfg
            let weekly = data.weekly_cfg
            let monthly = data.monthly_cfg
            if (!daily || !weekly || !monthly)
                return;
            this.dayLabel.string = Global.Toolkit.GetMoneyFormat(data.daily_point);
            this.weekLabel.string = Global.Toolkit.GetMoneyFormat(data.weekly_point)
            this.monthLabel.string = Global.Toolkit.GetMoneyFormat(data.monthly_point)
            if (data.daily_point == 0) {
                this.selectedNode[0].active = false;
                this.noSelectedNode[0].active = false;
                this.unacommpolishedNode[0].active = true;
                this.yesterdayBetBool = false;
            } else {
                if (data.daily) {
                    this.selectedNode[0].active = true;
                    this.noSelectedNode[0].active = false;
                    this.unacommpolishedNode[0].active = false;
                    this.yesterdayBetBool = true;
                } else {
                    this.selectedNode[0].active = false;
                    this.noSelectedNode[0].active = true;
                    this.unacommpolishedNode[0].active = false;
                    this.yesterdayBetBool = false;
                }
            }
            if (data.weekly_point == 0) {
                this.selectedNode[1].active = false;
                this.noSelectedNode[1].active = false;
                this.unacommpolishedNode[1].active = true;
                this.weekBetBool = false;
            } else {
                if (data.weekly) {
                    this.selectedNode[1].active = true;
                    this.noSelectedNode[1].active = false;
                    this.unacommpolishedNode[1].active = false;
                    this.weekBetBool = true;
                } else {
                    this.selectedNode[1].active = false;
                    this.noSelectedNode[1].active = true;
                    this.unacommpolishedNode[1].active = false;
                    this.weekBetBool = false;
                }
            }
            if (data.monthly_point == 0) {
                this.selectedNode[2].active = false;
                this.noSelectedNode[2].active = false;
                this.unacommpolishedNode[2].active = true;
                this.monthBetBool = false;
            } else {
                if (data.monthly) {
                    this.selectedNode[2].active = true;
                    this.noSelectedNode[2].active = false;
                    this.unacommpolishedNode[2].active = false;
                    this.monthBetBool = true;
                } else {
                    this.selectedNode[2].active = false;
                    this.noSelectedNode[2].active = true;
                    this.unacommpolishedNode[2].active = false;
                    this.monthBetBool = false;
                }
            }
        }, (error) => {
            Global.UI.fastTip(error._errstr);
            // console.log(error);
        }, false, 60);
    }

    onDispose() {
        // this.CashBackModel.off(CashBackEvent.GetActivityCfg, this, this.DescriptionDay);
        // this.CashBackModel.off(CashBackEvent.GetDayFlowBackAll, this, this.GetAwardResq);
    }
    giftMoneyList() {
        Global.UI.show("WndGiftMoneyListUI", this.daily_cfg)
    }

    private onGetdaily() {
        this.onGetMoney(1);
    }

    private onGetweekly() {
        this.onGetMoney(2);
    }

    private onGetmonthly() {
        this.onGetMoney(3);
    }

    private onGetMoney(num) {
        let param = {
            "gift_money_type": num
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.DoDailyGiftMoney, param, (data) => {
            Global.UI.show("WndRebateGet", data.point);
            Global.HallServer.clearCache(NetAppface.mod, NetAppface.GetDailyGiftMoneyCfg, null)
            this.onOpen()
        }, (error) => {
            Global.UI.fastTip(error._errstr);
            // console.log(error);
        });
    }

    onClose() {
        if (this.yesterdayBetBool || this.weekBetBool || this.monthBetBool) {
            Global.Event.event(GlobalEvent.ShowRedSpot, [true, HallRedSpotType.DailyGift])
        }else{
            Global.Event.event(GlobalEvent.CloseRedSpot, HallRedSpotType.DailyGift);
        }
        HallPopMsgHelper.Instance.releaseLock(ActivityType.dailyGift);
    }
} 
