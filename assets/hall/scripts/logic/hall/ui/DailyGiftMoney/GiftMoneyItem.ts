
const { ccclass, property } = cc._decorator;

@ccclass
export default class GiftMoneyItem extends cc.Component {

    @property(cc.Label)
    label1: cc.Label = null;

    @property(cc.Label)
    label2: cc.Label = null;

    @property(cc.Label)
    label3: cc.Label = null;



    Init(data, msg) {
        if (data == null || msg == null) {
            this.label1.string = ""
            this.label2.string = ""
            this.label3.string = "—"
        }
        else { 
            this.label1.string = Global.Toolkit.formatMillion(data.bet_point / 10000)
            this.label2.string = Global.Toolkit.GetMoneyFormat(data.point)
            if (msg >= 0) {
                this.label3.string = Global.Toolkit.GetMoneyFormat(msg)
            }
            else {
                this.label3.string = "—"
            }

        }
    }
    InitSafe(data,msg) {
        if (data == null || msg == null) {
            this.label1.string = ""
            this.label2.string = ""
            this.label3.string = "—"
        }
        else { 
            this.label1.string = data.multi
            this.label2.string = data.rate + "%"
            if (msg >= 0) {
                this.label3.string = (msg*data.rate/100/Global.Setting.glodRatio).toString()
            }
            else {
                this.label3.string = "—"
            }
        }
    }
}
