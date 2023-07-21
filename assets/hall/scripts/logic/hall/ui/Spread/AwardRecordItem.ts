
const { ccclass, property } = cc._decorator;

@ccclass
export default class AwardRecordItem extends cc.Component {

    @property(cc.Label)
    TimeLabel: cc.Label = null;

    @property(cc.Label)
    TypeLabel: cc.Label = null;


    @property(cc.Label)
    Amount: cc.Label = null;



    Init(data) {
        var SpreadModel = Global.ModelManager.getModel("SpreadModel");
        let cmmi_type = SpreadModel.commiType
        
        if (data == null) {
            this.TimeLabel.string = ""
            this.TypeLabel.string = ""
            this.Amount.string = ""
        }
        else {
            if (cmmi_type === 2)
            {
                this.TimeLabel.string = data.read_date + " " + data.read_time
                this.TypeLabel.string = "业绩收入奖励"
            }
            else {
                this.TimeLabel.string =  data.read_time
            }
            if (data.read_type == 0) {
                this.TypeLabel.string = "推广税收奖励"
            }
            else if (data.read_type == 1) {
                this.TypeLabel.string = "自营税收奖励"
            }
            this.Amount.string = Global.Toolkit.formatPointStr(data.read_point)
        }
    }
}
