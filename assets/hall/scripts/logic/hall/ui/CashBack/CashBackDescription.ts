const { ccclass, property } = cc._decorator;

@ccclass
export default class CashBackDescription extends cc.Component {

    @property(cc.Label)
    Money: cc.Label = null;

    @property(cc.Label)
    proportion: cc.Label = null;

    Init(data) {
        if (data.bet_max === -1) {
            this.Money.string = data.bet_mix + "以上"
        }
        else {
            this.Money.string = data.bet_mix + "-" + data.bet_max
        }
        this.proportion.string = data.bet_rate + "%";
       
    }
}
