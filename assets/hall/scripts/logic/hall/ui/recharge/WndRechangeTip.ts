
import WndBase, { DestoryType } from "../../../core/ui/WndBase";
import RechagreTipModel from "../../../hallcommon/model/RechagreTipModel";
import WndRecharge from "./WndRecharge";

export default class WndRechangeTip extends WndBase {
    private tip1: cc.Label;
    private tip2: cc.Label;
    private tip3: cc.Label;
    private tip4: cc.Label;
    private isTip: cc.Node;
    private RechagreTipModel: RechagreTipModel;

    protected onInit() {
        this.name = "WndRechangeTip";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/Recharge/RechangeTipUI";
        this.destoryType = DestoryType.None;
        this.RechagreTipModel = <RechagreTipModel>Global.ModelManager.getModel("RechagreTipModel")
    }

    initView() {
        this.tip1 = this.getComponent("allNode/tip1", cc.Label);
        this.tip2 = this.getComponent("allNode/tip2", cc.Label);
        this.tip3 = this.getComponent("allNode/tip3", cc.Label);
        this.tip4 = this.getComponent("allNode/tip4", cc.Label);
        this.isTip = this.getChild("isTip/btn")
        this.isTip.active = false;
        this.addCommonClick("vip", this.onVipBtnFunc, this)
        this.addCommonClick("isTip", this.TipBtn, this)
        this.addCommonClick('close', this.close, this)
    }

    protected onOpen(num)
    {
        this.tip1.string = num.toString() + "%";
        this.tip2.string = "10000" + "元"
        let str = 100 * num;
        this.tip3.string = str.toString() + "元"
        str = 10000 + 100 *num;
        this.tip4.string = str.toString() + "元"
    }

    onVipBtnFunc() {
        this.close();
        let WndRecharge = <WndRecharge>Global.UI.getWindow("WndRecharge")
        WndRecharge.rechargeView.ShowVip();
        // Global.UI.close("WndRecharge");
        // Global.ModelManager.getModel("ServicerModel").showServices(ServiceEntranceType.OnlineService);
    }
    onClose() {
        if (this.isTip.active == true) {
            this.RechagreTipModel.setRechagreTipModel();
        }
    }

    TipBtn() {
        this.isTip.active = !this.isTip.active;
    }
}