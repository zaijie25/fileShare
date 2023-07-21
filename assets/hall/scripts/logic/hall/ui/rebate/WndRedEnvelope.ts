
import WndBase, { DestoryType } from "../../../core/ui/WndBase";
import { NetAppface } from "../../../core/net/hall/NetEvent";
import HallModel from "../../../hallcommon/model/HallModel";
export default class WndRedEnvelope extends WndBase{
    private rabateLbl: cc.Label;
    private openSke: sp.Skeleton;
    private goodLuck: cc.Node;
    private winMoney: cc.Node;
    private winMoney2: cc.Node;
    private goodLuckTitle: cc.Node;
    private newPersonTitle: cc.Node;
    private winMoneyTitle: cc.Node;
    private data;
    private model: HallModel;
    private closeCallback: Function;
    protected onInit() {
        this.name = "WndRedEnvelope";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Rebate/RedEnvelopeUI";
        this.destoryType = DestoryType.None
    }

    protected initView(){
        this.model = <HallModel>Global.ModelManager.getModel("HallModel");
        this.addCommonClick("openBtn", this.onSureBtnClick, this);
        this.rabateLbl = <cc.Label>this.getComponent("rebateLbl", cc.Label);
        this.openSke = <sp.Skeleton>this.getComponent("openBtn", sp.Skeleton);
        this.goodLuck = this.getChild("goodLuck")
        this.winMoney = this.getChild("winMoney")
        this.winMoney2 = this.getChild("winMoney2")
        this.goodLuckTitle = this.getChild("goodLuckTitle")
        this.newPersonTitle = this.getChild("newPersonTitle")
        this.winMoneyTitle = this.getChild("winMoneyTitle")
    }

    private onSureBtnClick(){
        this.openSke.clearTrack(0)
        this.openSke.setAnimation(0, "idle_NO", false)
        Global.HallServer.send(NetAppface.mod, NetAppface.ReceiveRewardPack, {id:this.data.id},(retObj) => {
            this.closeWnd()
            //重新获取剩余红包
        },(error) => {
            Global.UI.fastTip(error._errstr);
            // console.log(error);
        },false);
    }

    protected onOpen(arr){
        if(this.openSke){
            this.openSke.clearTrack(0)
            this.openSke.setAnimation(0,"idle_Loop",true);
        }
        this.data = arr[0];
        this.closeCallback = arr[1];
        let type = this.data.pack_type;
        if(type === 1){ //新人
            this.goodLuck.active = false;
            this.goodLuckTitle.active = false;
            this.winMoney.active =false;
            this.winMoney2.active =false;
            this.newPersonTitle.active =true;
            this.winMoneyTitle.active =false;
        }
        else if(type === 2) //好运
        {
            this.goodLuck.active = true;
            this.goodLuckTitle.active = true;
            this.winMoney.active =false;
            this.winMoney2.active =false;
            this.newPersonTitle.active =false;
            this.winMoneyTitle.active =false;
        }else{ //赢钱
            this.goodLuck.active = false;
            this.goodLuckTitle.active = false;
            this.winMoney.active =true;
            this.winMoney2.active =true;
            this.newPersonTitle.active =false;
            this.winMoneyTitle.active =true;
        }
        this.rabateLbl.string = Global.Toolkit.formatPointStr(this.data.point||0, true)
        // if(arr[1])
        // {
        //     this.bindAwardType = arr[1];
        // }
        // var model = <BindingGiftModel>Global.ModelManager.getModel("BindingGiftModel");
        // this.rabateLbl.node.active = false;
        // this.effectSk && this.effectSk.setAnimation(0, "idle", false);

    }

    private closeWnd(){
        if(this.closeCallback){
            this.closeCallback();
        }
        this.close();
    }

    protected onClose(){

    }
    onDispose()
    {
    }
}