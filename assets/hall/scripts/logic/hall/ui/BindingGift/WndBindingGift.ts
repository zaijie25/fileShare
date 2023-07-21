import WndBase, { DestoryType } from "../../../core/ui/WndBase";
import GlobalEvent from "../../../core/GlobalEvent";
import BindingGiftModel from "../../../hallcommon/model/BindingGiftModel";
import HallPopMsgHelper, { PopWndName } from "../../tool/HallPopMsgHelper";

export default class WndBindingGift extends WndBase {

    private model: BindingGiftModel
    private SpineNode: sp.Skeleton
    private bindBtn: cc.Node
    private timerId: NodeJS.Timeout
    private bindGiftLabel: cc.Label

    protected onInit() {
        this.name = "WndBindingGift";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/BindingGift/BindingGift";
        this.model = <BindingGiftModel>Global.ModelManager.getModel("BindingGiftModel");
        this.destoryType = DestoryType.Now;
    }

    protected initView() {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.bindBtn = cc.find("BindBtn", this.node)
        this.bindGiftLabel = this.getComponent("awardLabel", cc.Label)
        this.addCommonClick("close", this.close, this)
        this.bindBtn = this.addCommonClick("BindBtn", this.OpenBindingPhone, this)
        if(this.bindBtn)
        {
            this.bindBtn.active = true
        }
    }


    private playSpineAward() {
        if (this.SpineNode == null) {
            this.SpineNode = cc.find("spineNode", this.node).getComponent(sp.Skeleton)
            this.SpineNode.setCompleteListener(() => {

                this.SpineNode.clearTrack(0)
                this.SpineNode.setAnimation(0, "idle2", true)
            })
        }
        this.SpineNode.clearTrack(0)
        this.SpineNode.setAnimation(0, "idle", false)
    }

    OpenBindingPhone() {
        Logger.error("点击绑定手机:0000");
        HallPopMsgHelper.Instance.addMsgList(PopWndName.BindPhone, () => {
            Logger.error("点击绑定手机");
            Global.Event.event(GlobalEvent.POP_BIND_PHONE);
        });
        this.close();
    }

    protected onOpen(args) {
        if (this.model.BindAwardNum === 3)
            Global.Audio.playAudioSource("hall/sound/binding")
        this.model.SetStatus(false);
        this.bindGiftLabel.string = this.model.BindAwardNum.toString() || ""
        
        if (Global.Setting.SkinConfig.isPurple)
            this.playSpineAward();
    }


    protected onClose() {
        HallPopMsgHelper.Instance.releaseLock(PopWndName.BindGift);
        clearTimeout(this.timerId)
    }

}