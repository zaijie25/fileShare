import WndBase from "../../../../core/ui/WndBase";

export default class WndTurntableRule extends WndBase {

    protected onInit(){
        this.name = "WndTurntableRule";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/luckyDraw/TurntableRuleUI";
    }

    protected initView()
    {
        Global.UIHelper.addCommonClick(this.node,"popNode/close",this.close,this)
    }

    protected onOpen()
    {
        
    }
}