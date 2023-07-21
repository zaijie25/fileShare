
const { ccclass, property } = cc._decorator;

@ccclass
export default class AwardDetailItem extends cc.Component {

    /***日期 */
    @property(cc.Label)
    TimeLabel: cc.Label = null;

    /**团队业绩 */
    @property(cc.Label)
    weekMyselfDir: cc.Label = null;

    /**直属业绩 */
    @property(cc.Label)
    WeekDirLabel: cc.Label = null;

    /** 下属业绩*/
    @property(cc.Label)
    WeekOtherLabel: cc.Label = null;

    /**所得佣金 */
    @property(cc.Label)
    Amount: cc.Label = null;



    Init(data) {
        var SpreadModel = Global.ModelManager.getModel("SpreadModel");
        let cmmi_type = SpreadModel.commiType
        if (data == null) {
            this.TimeLabel.string = ""
            if (this.weekMyselfDir)
                this.weekMyselfDir.string = ""
            this.WeekDirLabel.string = ""
            this.WeekOtherLabel.string = ""
            this.Amount.string = ""
        }
        else {
            if(cmmi_type == 1)
            {
                // this.TimeLabel.string = data.send_time
                // if (this.weekMyselfDir)
                //     this.weekMyselfDir.string = Global.Toolkit.formatPointStr(data.self_point)
                // this.WeekDirLabel.string = Global.Toolkit.formatPointStr(data.unter_point)
                // this.Amount.string = Global.Toolkit.formatPointStr(data.total_point)
                // this.WeekOtherLabel.string = Global.Toolkit.formatPointStr(data.other_point)
            }
           if(cmmi_type == 2)
           {
            this.TimeLabel.string = data.time
            if (this.weekMyselfDir)
                this.weekMyselfDir.string = Global.Toolkit.formatPointStr(data.total_flow)
            this.WeekDirLabel.string = Global.Toolkit.formatPointStr(data.unter_flow)
            this.Amount.string = Global.Toolkit.formatPointStr(data.commi)
            this.WeekOtherLabel.string = Global.Toolkit.formatPointStr(data.team_flow)
           }

        }
    }
}
