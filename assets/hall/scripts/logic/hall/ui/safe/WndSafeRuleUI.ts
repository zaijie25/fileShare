import WndBase from "../../../core/ui/WndBase";

export default class WndSafeRuleUI extends WndBase{
    // private dayLabel : cc.Label;
    // private weekLabel : cc.Label;
    // private monthLabel : cc.Label;
    protected onInit() {
        // this.isNeedDelay = true
        this.name = "WndSafeRuleUI";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/safe/SafeRuleUI";
    }

    protected initView() {
        // this.dayLabel = this.getComponent("item1/jibiLabel",cc.Label);
        // this.weekLabel = this.getComponent("item2/jibiLabel",cc.Label);
        // this.monthLabel = this.getComponent("item3/jibiLabel",cc.Label);
        // this.addCommonClick("button", this.giftMoneyList, this)
        this.addCommonClick('close', this.close, this)
        // for (let i = 1; i < 4; i++) {
        //     let item = this.getChild("item"+i)
        //     let selected = cc.find("button/btn_lqjl1",item)
        //     let noSelected = cc.find("button/btn_lqjl2",item)
        //     noSelected.active = false;
        // }
    }
    protected onOpen(args?: any[]) {
        // this.OnDataPrepared();
        // this.CashBackModel.GetActivityCfg();
    }

    onDispose() {
        // this.CashBackModel.off(CashBackEvent.GetActivityCfg, this, this.DescriptionDay);
        // this.CashBackModel.off(CashBackEvent.GetDayFlowBackAll, this, this.GetAwardResq);
    }
    // giftMoneyList(){
    //     Global.UI.show("WndGiftMoneyListUI")
    // }
} 
