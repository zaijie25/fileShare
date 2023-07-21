
import WndBase, { DestoryType } from "../../../core/ui/WndBase";
import { NetAppface } from "../../../core/net/hall/NetEvent";
import HallModel from "../../../hallcommon/model/HallModel";
import HallPopMsgHelper from "../../tool/HallPopMsgHelper";
import { ActivityType } from "../Activity/ActivityConstants";
export default class WndHallRedEnvelope extends WndBase{
    private openSke: sp.Skeleton;
    private noOpenSp: cc.Node;
    private data;
    private model: HallModel;
    private closeCallback: Function;
    // private goldSke: sp.Skeleton;
    protected onInit() {
        this.name = "WndHallRedEnvelope";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Rebate/HallRedEnvelopeUI";
        this.destoryType = DestoryType.None
    }

    protected initView(){
        this.model = <HallModel>Global.ModelManager.getModel("HallModel");
        this.addCommonClick("openBtn", this.onSureBtnClick, this);
        this.openSke = <sp.Skeleton>this.getComponent("openBtn", sp.Skeleton);
        this.noOpenSp = this.getChild("noopen");
        // this.goldSke = <sp.Skeleton>this.getComponent("skeleton", sp.Skeleton);
    }

    private onSureBtnClick(){
        this.openSke.clearTrack(0)
        this.openSke.setAnimation(0, "idle_NO", false)
        Global.HallServer.send(NetAppface.mod, NetAppface.DoRechargeRed, {},(retObj) => {
            Global.UI.show("WndRebateGet", retObj.point,null,() => {
                Global.UI.show("WndGetRedEnvelope")
            })
            this.model.recharge_red = null
            this.closeWnd()
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
        // if(this.goldSke){
        //     this.goldSke.clearTrack(0)
        //     this.goldSke.setAnimation(0,"animation",false);
        // }
        this.data = this.model.recharge_red;
        let time = (new Date()).getTime()/1000;
        if(!this.data) {
            this.openSke.node.active = false;
            this.noOpenSp.active = true;
            return;
        }
        if( time > this.data.stime && time < this.data.etime){
            this.openSke.node.active = true;
            this.noOpenSp.active = false
        }else{
            this.openSke.node.active = false;
            this.noOpenSp.active = true;
        }

    }

    private closeWnd(){
        if(this.closeCallback){
            this.closeCallback();
        }
        this.close();
    }

    protected onClose(){
        HallPopMsgHelper.Instance.releaseLock(ActivityType.rechargeGive);

    }
    onDispose()
    {
    }
}