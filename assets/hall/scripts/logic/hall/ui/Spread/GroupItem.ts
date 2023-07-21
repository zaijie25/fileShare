const { ccclass, property } = cc._decorator;

@ccclass
export default class GroupItem extends cc.Component {

    @property(cc.Sprite)
    bgIcon: cc.Sprite = null;

    /**游戏id */
    @property(cc.Label)
    IdLabel: cc.Label = null;

    /**直属业绩名字 */
    @property(cc.Label)
    NameLabel: cc.Label = null;

    /**下级业绩 */
    @property(cc.Label)
    VatLable: cc.Label = null;

    /**佣金 */
    @property(cc.Label)
    GroupPopulation: cc.Label = null;
    @property(cc.Sprite)
    Icon: cc.Sprite = null;
    /**团队人数 */
    @property(cc.Label)
    GroupVat: cc.Label = null;

    Init(data, j) {
        var SpreadModel = Global.ModelManager.getModel("SpreadModel");
        let cmmi_type = SpreadModel.commiType
        if (data == null) {
            this.Icon.node.active = false
            this.IdLabel.string = ""
            this.NameLabel.string = ""
            this.VatLable.string = ""
            this.GroupVat.string = ""
            this.GroupPopulation.string = ""
        }
        else {
            if (j % 2 == 0) {
                this.bgIcon.node.active = true;
            } else {
                this.bgIcon.node.active = false;
            }
            if (cmmi_type == 1) {
                // this.Icon.node.active = (data.is_new == 1)
                // this.IdLabel.string = data.user_id
                // this.NameLabel.string = Global.Toolkit.substrEndWithElli( data.name , 8)
                // this.VatLable.string = Global.Toolkit.formatPointStr(data.percent, true)
                // this.GroupVat.string = Global.Toolkit.formatPointStr(data.team_percent, true)
                // this.GroupPopulation.string = data.team_num
            }
            else if (cmmi_type == 2) {
                this.IdLabel.string = data.user_id
                this.NameLabel.string = Global.Toolkit.formatPointStr(data.unter_flow, true)
                this.VatLable.string = Global.Toolkit.formatPointStr(data.team_flow, true)
                this.GroupVat.string = data.team_num
                this.GroupPopulation.string =  Global.Toolkit.formatPointStr(data.commi, true)
            }

        }
    }
}
