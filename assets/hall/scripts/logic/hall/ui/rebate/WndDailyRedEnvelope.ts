
import WndBase, { DestoryType } from "../../../core/ui/WndBase";
import { NetAppface } from "../../../core/net/hall/NetEvent";
import { ActivityType } from "../Activity/ActivityConstants";
import HallPopMsgHelper from "../../tool/HallPopMsgHelper";
export default class WndDailyRedEnvelope extends WndBase{
    // private closeCallback: Function;
    /**可领取 */
    private selectedNode = [];
    /**已经领取 */
    private noSelectedNode = [];
    private receivedNode = [];
    private dayImgNode = [];
    protected onInit() {
        this.name = "WndDailyRedEnvelope";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Rebate/DailyRedEnvelopeUI";
        this.destoryType = DestoryType.None
    }

    protected initView(){
        this.selectedNode = [];
        this.noSelectedNode = [];
        this.dayImgNode = [];
        for (let i = 0; i < 5; i++) {
            let item = this.getChild("centerNode/item" + i)
            let selected = cc.find("selectedRed", item)
            let noSelected = cc.find("unselectedRed", item)
            let received = cc.find("receivedRed", item)
            selected.active = false;
            received.active = false;
            noSelected.active = true;
            this.selectedNode.push(selected);
            this.receivedNode.push(received);
            Global.UIHelper.addCommonClick(item, "selectedRed", this.onGetDailyRed, this);
            this.noSelectedNode.push(noSelected)
        }
        let dayImgsNode = this.getChild("dayImgsNode");
        for(let i = 0; i < 5; i++){
            let dayImg = cc.find("dayImg" + i, dayImgsNode);
            dayImg.active = true;
            this.dayImgNode.push(dayImg);
        }
        this.addCommonClick("button", this.onOpenRechargeClick, this);
        this.addCommonClick("close", this.closeWnd, this);
    }

    private onOpenRechargeClick(){
        Global.UI.show("WndRecharge");
        this.closeWnd();
    }

    protected onOpen(arr){
        this.updateUI()
        // this.closeCallback = arr[0];
    }
    private updateUI(){
        Global.HallServer.send(NetAppface.mod, NetAppface.GetActivityCfg, {}, (data) => {
            let arr = data.data
            for (let index = 0; index < data.data.length; index++) {
                let cfg = arr[index];
                if (cfg && cfg.atype == ActivityType.dailyPayRedpack) {
                    let dataArr = cfg.cfg.cfg.list
                    for (let i = 0; i < dataArr.length; i++) {
                        let nodeData =  dataArr[i];
                        let selected = this.selectedNode[i]
                        selected.data = nodeData;
                        let noSelected = this.noSelectedNode[i];
                        let received = this.receivedNode[i];
                        let dayImg = this.dayImgNode[i]
                        let selectedlabel = cc.find("jibiLabel", selected).getComponent(cc.Label);
                        let noSelectedlabel = cc.find("jibiLabel", noSelected).getComponent(cc.Label);
                        let receivedlabel = cc.find("jibiLabel", received).getComponent(cc.Label);
                        // let spine = cc.find("spine", selected);
                        selectedlabel.string = noSelectedlabel.string = receivedlabel.string =  Global.Toolkit.GetMoneyFormat(nodeData.reward);
                        // 0未充值 1已充值不能领取 2可以领取 3已领取 4已失效
                        if (nodeData.status == 1) {
                            dayImg.active = true;
                            selected.active = true;
                            noSelected.active = false;
                            received.active = false;
                        }else if (nodeData.status == 2) {
                            dayImg.active = true;
                            selected.active = true;
                            noSelected.active = false;
                            received.active = false;
                        }else if (nodeData.status == 3) {
                            selected.active = false;
                            selected.active = false;
                            received.active = true;
                            noSelected.active = false;
                        }else{
                            selected.active = true;
                            selected.active = false;
                            received.active = false;
                            noSelected.active = true;
                        }
                    }
                    break
                }
            }
        }, null, false, 0);
    }
    private onGetDailyRed(target){
        if(target && target.node && target.node.data){
            if(target.node.data.status == 1){
                Global.UI.fastTip("明日才可以领取红包哦");
            }else if(target.node.data.status == 2){
                Global.HallServer.send(NetAppface.mod, NetAppface.ReciveDailyRedpack, {},(retObj) => {
                    this.updateUI()
                    Global.UI.show("WndRebateGet", retObj.recive_point,null,() => {
                    })
                },(error) => {
                    Global.UI.fastTip(error._errstr);
                    // console.log(error);
                },false);
            }
        }
    }
    private closeWnd(){
        // if(this.closeCallback){
        //     this.closeCallback();
        // }
        this.close();
    }

    protected onClose(){
        HallPopMsgHelper.Instance.releaseLock(ActivityType.dailyPayRedpack);
    }
    onDispose()
    {
        this.selectedNode = [];
        this.noSelectedNode = [];
        this.receivedNode = [];
    }
}