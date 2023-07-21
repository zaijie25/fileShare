import ViewBase from "../../../../core/ui/ViewBase";
import HallModel from "../../../../hallcommon/model/HallModel";
import HallBtnHelper from "./HallBtnHelper";


export default class HallGuiDelinesView extends ViewBase {
    private quan: cc.Node;
    private shou: cc.Node;
    private sf = true;
    private sfshou = true;
    private tips: cc.Node
    private tipscale: number = 2;
    private newGetNode: cc.Node;
    private animNode:cc.Node;

    protected initView() {
        this.node.active = false;
        this.quan = cc.find("newGet/anim/quan", this.node)
        this.shou = cc.find("newGet/anim/shou", this.node)
        this.newGetNode = cc.find("newGet", this.node)
        this.animNode = cc.find("newGet/anim", this.node)
        this.addCommonClick("bg", this.onSubViewHide, this, 0);
        this.addCommonClick("newGet/anim", this.onOpenCommision, this, 0);
        this.tips = cc.find("tips", this.node)

    }   

    onSubViewHide() {
        this.node.active = false;
        Game.Component.unschedule(this.showGuiDelines.bind(this));
        Game.Component.unschedule(this.ShowShouUi.bind(this));
    }
    onOpenCommision(){
        this.node.active = false;
        Game.Component.unschedule(this.showGuiDelines.bind(this));
        Game.Component.unschedule(this.ShowShouUi.bind(this));
        HallBtnHelper.WndCommision();
    }
    public getNewMsg() {
        Global.HallServer.send(NetAppface.mod, "GetTaskStatus", {}, (data) => {
            let msg = data;
            if (msg.num > 0) {
                this.tips.scale = this.tipscale;
                this.node.active = true;
                this.showGuiDelines()
                Global.Audio.playAudioSource("hall/sound/guidelines")
            }
        }, null, false, 0);
    }

    showGuiDelines() {
        let hallModel = <HallModel>Global.ModelManager.getModel("HallModel");
        let csNode =  hallModel.csNodePos
        let wPos = csNode.parent.convertToWorldSpaceAR(csNode.position)
        let lpos = this.animNode.parent.convertToNodeSpaceAR(wPos)
        this.animNode.position = lpos;

        if (this.quan) {
            Global.Component.schedule(this.ShowQuanUi.bind(this), 0.1)
            Global.Component.schedule(this.ShowShouUi.bind(this), 0.15)
            Global.Component.schedule(this.showTip.bind(this), 0.05)
        }
    }

    ShowQuanUi() {
        let num = this.quan.scale
        if (this.sf) {
            num -= 0.15;
            if (num <= 1) {
                this.sf = false;
            }
        }
        else {
            num += 0.15;
            if (num >= 1.3) {
                this.sf = true;
            }
        }
        this.quan.setScale(num)
    }

    ShowShouUi() {
        let num = this.shou.scale
        if (this.sfshou) {
            num -= 0.1;
            if (num <= 1) {
                this.sfshou = false;
            }
        }
        else {
            num += 0.1;
            if (num >= 1.3) {
                this.sfshou = true;
            }
        }
        this.shou.setScale(num)
    }

    showTip() {
        let num = this.tips.scale;
        if (this.tips.scale > 1) {
            num -= 0.2
            this.tips.setScale(num)
        }
        else {
            Game.Component.unschedule(this.showTip.bind(this));
            return;
        }
    }
}
