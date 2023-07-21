import ViewBase from "../../../core/ui/ViewBase";
import SpreadModel from "../../../hallcommon/model/SpreadModel";
import SpreadServices from "./SpreadServices";

export default class SpreadTutorialWin extends ViewBase {
    cmmi_type;
    private spreadModel: SpreadModel
    spreadService:SpreadServices;
    private bigNode: cc.Node;
    protected initView() {
        this.spreadModel = <SpreadModel>Global.ModelManager.getModel("SpreadModel");
       // this.spreadService = <SpreadServices>this.addView("spreadService", this.getChild("ServerNode"), SpreadServices);
        this.cmmi_type = this.spreadModel.commiType
        if (this.cmmi_type == 2) {
            this.bigNode = this.getChild("big")
            this.addCommonClick("View/scrollview/view/content/Description", this.onDescription, this, null, 1)
            this.addCommonClick("View/scrollview/view/content/btnMoney", this.OnCommissionBtnClicked, this)
            this.addCommonClick("big/close", this.onBigclose, this)
        }
    }


    onSubViewShow() {
        //this.spreadService.subViewState = true;
        // this.spreadModel.on(SpreadEvent.GetDayAgentCommi, this, this.OpenRrturnMoney);
    }

    onSubViewHide() {
        // this.spreadModel.off(SpreadEvent.GetDayAgentCommi, this, this.OpenRrturnMoney);

    }

    OnCommissionBtnClicked() {
        let data = this.spreadModel.CommidData;
        if (data == null) {
            this.spreadModel.GetDayAgentCommi()
        }
        else {
            Global.UI.show("WndCommissionlist", data)
        }
    }

    onDescription() {
        this.bigNode.active = true;
    }

    onBigclose() {
        this.bigNode.active = false;
    }

}
