import WndBase, { DestoryType } from "../../../core/ui/WndBase";
import HallPopMsgHelper, { PopWndName, BindAwardUIType } from "../../tool/HallPopMsgHelper";
import BindingGiftModel from "../../../hallcommon/model/BindingGiftModel";

export default class WndRebateGet extends WndBase{
    private rabateLbl: cc.Label;
    private timeOut:  NodeJS.Timeout;
    private effectSk: sp.Skeleton;
    private sureBtn: cc.Node;

    private sound:cc.AudioSource;

    private bindAwardType:number = -1; //默认方式
    private closeCallback: Function;
    protected onInit() {
        this.name = "WndRebateGet";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Rebate/RebateGetUI";
        this.destoryType = DestoryType.None
    }

    protected initView(){
        this.bindAwardType = -1;

        this.sureBtn = this.getChild("sureBtn");
        this.addCommonClick("sureBtn", this.onSureBtnClick, this);
        this.sureBtn.active = false;

        this.sound = <cc.AudioSource>this.getComponent("sound",cc.AudioSource);

        this.rabateLbl = <cc.Label>this.getComponent("labelBg/rebateLbl", cc.Label);
        this.effectSk = <sp.Skeleton>this.getComponent("effect", sp.Skeleton);
        this.effectSk && this.effectSk.setCompleteListener(()=>{
            this.effectSk.setAnimation(0, "idle2", true);
        })
    }

    private onSureBtnClick(){
        // Global.Audio.stopAllEffect();
        if(this.sound && this.sound.isPlaying)
            this.sound.stop();
        this.closeWnd();
    }

    protected onOpen(arr){
        let point = arr[0];
        this.bindAwardType = -1;
        if(arr[1])
        {
            this.bindAwardType = arr[1];
        }
        var model = <BindingGiftModel>Global.ModelManager.getModel("BindingGiftModel");
        this.rabateLbl.string = Global.Toolkit.formatPointStr(point, true) || model.BindAwardNum.toString();
        this.rabateLbl.node.active = false;
        this.effectSk && this.effectSk.setAnimation(0, "idle", false);
        let soundEnable = Global.Setting.settingData.soundEnable;
        if(this.sound && !this.sound.isPlaying && soundEnable)
            this.sound.play();
        this.sureBtn.scale = 1;
        this.timeOut = setTimeout(() => {
            this.rabateLbl.node.active = true;
            this.sureBtn.active = true;
            this.sureBtn.runAction(cc.sequence(cc.scaleTo(0.1, 1.2), cc.scaleTo(0.1, 1)));
            this.addCommonClick("Mask",this.onSureBtnClick,this)
        }, 1000);
        if(arr[2]){
            this.closeCallback = arr[2];
        }
    }

    private closeWnd(){
        if(this.closeCallback){
            this.closeCallback();
        }
        this.close();
    }

    protected onClose(){
        this.closeCallback = null
        clearTimeout(this.timeOut);
        if(this.bindAwardType > 0){
            if(this.bindAwardType == BindAwardUIType.MegePoint )
            {
                HallPopMsgHelper.Instance.releaseLock(PopWndName.MegePoint);
                Global.HallServer.send(NetAppface.mod, NetAppface.GetUserPoint, {});
                return
            }
            if(this.bindAwardType != BindAwardUIType.share && this.bindAwardType != BindAwardUIType.bindPoint){
                Global.UI.fastTip("绑定手机成功");
            }   
            if(this.bindAwardType != BindAwardUIType.bindPoint){
                Global.HallServer.send(NetAppface.mod, NetAppface.GetUserPoint, {});
            }
            if(this.bindAwardType == BindAwardUIType.onlyPhonePoint || this.bindAwardType == BindAwardUIType.phonePoint){
                HallPopMsgHelper.Instance.releaseLock(PopWndName.PhoneGiftGet);
            }else{
                HallPopMsgHelper.Instance.releaseLock(PopWndName.BindGiftGet);
            }
        }
    }
    onDispose()
    {
        if(this.sound)
            this.sound = null
    }
}