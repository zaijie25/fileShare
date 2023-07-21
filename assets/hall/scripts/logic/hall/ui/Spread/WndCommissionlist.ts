import WndBase from "../../../core/ui/WndBase";
import PoolBase from "../../../core/tool/PoolBase";
import SpreadModel from "../../../hallcommon/model/SpreadModel";
import { NetAppface } from "../../../core/net/hall/NetEvent";

export default class WndCommissionlist extends WndBase {
    copyItem: any;
    contentNode: any;
    itemPool: AwardRecordItemPool;
    nodeList: any[] = [];
    SpreadModel = null
    noTips: cc.Node
    titleNode: cc.Node


    protected onInit() {
        this.name = "WndCommissionlist";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/SpreadUI/Commissionlist";

    }

    protected initView() {
        this.SpreadModel = <SpreadModel>Global.ModelManager.getModel("SpreadModel");
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.addCommonClick("close", this.close, this)
        this.copyItem = this.getChild("ScrollView/view/content/item")
        this.contentNode = this.getChild("ScrollView/view/content")
        this.noTips = this.getChild("noListTipsSk")
        this.noTips.active = false
        this.titleNode = this.getChild("topTitle")
        this.titleNode.active = false
        this.initItemPool();

    }


    protected onOpen(data) {
        this.SpreadModel.on(NetAppface.GetSelfReadRecord, this, this.RefreshScrollView)
        this.copyItem.active = false
        if (data == null || data.length == 0) {
            return;
        }
        this.RefreshScrollView(data[0])
    }
    RefreshScrollView(data: any) {
        if (data == null) {
            Global.UI.fastTip("无数据")
            this.noTips.active = true
            this.titleNode.active = false
            return
        }
        this.noTips.active = false
        this.titleNode.active = true

        let arr: Array<any> = data.list || [];
        let count = arr.length;

        this.recycle()

        for (let j = 0; j < count; j++) {
            let node = this.itemPool.getItem();
            this.nodeList.push(node);
            node.active = true;
            node.setParent(this.contentNode);
            node.getComponent("AwardCommiItem").Init(arr[j])
        }

    }

    protected onClose() {
        this.SpreadModel.off(NetAppface.GetDayAgentCommi, this, this.RefreshScrollView)
    }

    protected onDispose() {
        this.itemPool.resetPool()
        this.nodeList = [];
    }
    private initItemPool() {

        this.itemPool = new AwardRecordItemPool(this.copyItem);
    }
    public recycle() {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    }
}
class AwardRecordItemPool extends PoolBase {
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