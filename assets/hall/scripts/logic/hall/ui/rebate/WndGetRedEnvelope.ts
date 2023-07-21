
import WndBase, { DestoryType } from "../../../core/ui/WndBase";

export default class WndGetRedEnvelope extends WndBase{
    // private closeCallback: Function;
    protected onInit() {
        this.name = "WndGetRedEnvelope";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Rebate/GetRedEnvelopeUI";
        this.destoryType = DestoryType.None
    }

    protected initView(){
        this.addCommonClick("but_cz", this.onOpenRechargeClick, this);
        this.addCommonClick("close", this.closeWnd, this);
    }

    private onOpenRechargeClick(){
        Global.UI.show("WndRecharge");
        this.closeWnd();
    }

    protected onOpen(arr){
        // this.closeCallback = arr[0];
    }

    private closeWnd(){
        // if(this.closeCallback){
        //     this.closeCallback();
        // }
        this.close();
    }

    protected onClose(){
    }
    onDispose()
    {
    }
}