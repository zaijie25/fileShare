import WndBase from "../../../core/ui/WndBase";
import PoolBase from "../../../core/tool/PoolBase";
import { CashBackEvent } from "./CashBackEvent";
import YXButton from "../../../core/component/YXButton";
import CashBackModel from "../../../hallcommon/model/CashBackModel";
import { SkinType } from "../../../hallcommon/app/SkinConfig";
import AppCfg from "../../AppCfg";

export default class WndDailyCashBackUI extends WndBase{
    CashBackModel: CashBackModel;
    contentNode: any;
    copyItem: any;
    itemPool: ItemPool;
    nodeList: any[];
    myDailyCash : cc.Label;     //我的流水
    dayNum : cc.Label;          //保留几天
    awardNumLabel : cc.Label;   //累积奖励

    awardId : string = "";      //领取奖励id
    awardBtn : cc.Node;         //领取按钮

    protected onInit() {
        this.isNeedDelay = true
        this.name = "WndDailyCashBackUI";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/CashBack/DailyCashBackUI";
    }

    protected initView() {
        this.copyItem = this.getChild("scrollview/view/content/item")
        this.copyItem.active = false;
        this.contentNode = this.getChild("scrollview/view/content")
        this.myDailyCash = this.getComponent("myDailyCash",cc.Label);
        this.dayNum = this.getComponent("dayNum",cc.Label);
        this.awardNumLabel = this.getComponent("awardNum/awardNumLabel",cc.Label);
        this.initItemPool();
        this.addCommonClick("getAwardBtn", this.getAward, this)
        this.addCommonClick('close', this.close, this)
        this.awardBtn = this.getChild("getAwardBtn")
        this.setAwardBtnState(false)
        this.CashBackModel = <CashBackModel>Global.ModelManager.getModel("CashBackModel");
        this.CashBackModel.on(CashBackEvent.GetActivityCfg, this, this.DescriptionDay);
        this.CashBackModel.on(CashBackEvent.GetDayFlowBackAll, this, this.GetAwardResq);
    }

    setAwardBtnState(canget:boolean){
        let btn = this.awardBtn.getComponent(YXButton)
        let btnEffect = this.getChild("getAwardBtn/effect")
        btnEffect.active = canget
        if (btn) {
            Global.UIHelper.setNodeGray(btn.node, !canget, 150, true)
            btn.interactable = canget
        }
    }

    getAward(){
        if(this.awardId == ""){
            Global.UI.fastTip("暂无奖励可以领取")
            return;
        }
        this.CashBackModel.GetDayFlowBack(this.awardId)
    }

    GetAwardResq(data){
        if (!data || !data.get_point) return
        Global.UI.show("WndRebateGet", data.get_point, 6);
        this.awardNumLabel.string = cc.js.formatStr("%s", Global.Toolkit.formatPointStr(0, true));
        this.setAwardBtnState(false);
    }

    DescriptionDay(data) {
        this.OnDataPrepared();
        this.contentNode.removeAllChildren();
        if (data == null) {
            return
        }
        for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].atype === 7) {
                this.refreshCfg(data.data[i].cfg)
                break;
            }
        }
    }

    public refreshCfg(data){
        if(!data) return
        let arr: Array<any> = data.cfg || [];
        let dayCount = data.read_day || 0;
        let awardNum = data.day_un_read_point || 0;
        let dayFlow = data.day_flow || 0;
        this.awardId = data.read_id || "";
        this.nodeList = [];
        for (let j = 0; j < arr.length; j++) {
            let node = this.itemPool.getItem();
            this.nodeList.push(node);
            node.active = true
            node.setParent(this.contentNode);
            node.getComponent("CashBackDescription").Init(arr[j])
        }
        this.myDailyCash.string = Global.Toolkit.formatPointStr(dayFlow);
        this.awardNumLabel.string = cc.js.formatStr("%s", Global.Toolkit.formatPointStr(awardNum, false));
        if(AppCfg.SKIN_TYPE == SkinType.green){
            this.dayNum.string = dayCount +"天";
        }else{
            this.dayNum.string = dayCount;
        }
        
        this.setAwardBtnState(this.awardId != "");
    }

    private initItemPool() {
        this.itemPool = new ItemPool(this.copyItem);
    }

    protected onOpen(args?: any[]) {
        this.CashBackModel.GetActivityCfg();
    }

    onDispose() {
        this.CashBackModel.off(CashBackEvent.GetActivityCfg, this, this.DescriptionDay);
        this.CashBackModel.off(CashBackEvent.GetDayFlowBackAll, this, this.GetAwardResq);
    }
}

class ItemPool extends PoolBase {
    constructor(private copyNode: cc.Node) {
        super();
    }

    protected createItem() {
        return cc.instantiate(this.copyNode);
    }

    protected resetItem(node: cc.Node) {
        node.active = false;
        node.setParent(null);
    }
}