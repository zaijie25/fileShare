import WndBase from "../../../core/ui/WndBase";
import PoolBase from "../../../core/tool/PoolBase";
import SpreadModel from "../../../hallcommon/model/SpreadModel";
import { NetAppface } from "../../../core/net/hall/NetEvent";

export default class WndAwardRecord extends WndBase {
    copyItem: any;
    contentNode: any;
    itemPool: AwardRecordItemPool;
    nodeList: any[] = [];
    page = 1
    TotalPage = 0
    SpreadModel = null
    limit = 4
    noTips: cc.Node
    titleNode: cc.Node
    botNode: cc.Node

    TotalInfoLabel: cc.Label
    PageLabel: cc.Label
    LastPageBtn: cc.Node
    NextPageBtn: cc.Node
    cmmi_type: number
    // tipmyself: cc.Node;

    protected onInit() {
        this.name = "WndAwardRecord";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/SpreadUI/AwardHistory";

    }

    protected initView() {
        var SpreadModel = Global.ModelManager.getModel("SpreadModel");
        this.cmmi_type = SpreadModel.commiType
        this.SpreadModel = <SpreadModel>Global.ModelManager.getModel("SpreadModel");
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.addCommonClick("bg_popup_middle/close", this.close, this)
        this.LastPageBtn = this.getChild("BotBtn/LastPage")
        this.NextPageBtn = this.getChild("BotBtn/NextPage")
        this.LastPageBtn.on("click", this.OnLastPageBtnClick, this);
        // this.tipmyself = this.getChild("bg_popup_middle/topTitle/type")
        // if (this.SpreadModel.self_rate > 0|| this.cmmi_type === 2) {
        //     this.tipmyself.active = true
        // }
        // else {
        //     this.tipmyself.active = false
        // }
        this.NextPageBtn.on("click", this.OnNextPagePageBtnClick, this);
        this.copyItem = this.getChild("bg_popup_middle/scrollview/view/content/item")
        this.contentNode = this.getChild("bg_popup_middle/scrollview/view/content")
        this.TotalInfoLabel = this.getChild("BotBtn/TotalInfoLabel").getComponent(cc.Label)
        this.PageLabel = this.getChild("BotBtn/PageLabel").getComponent(cc.Label)
        this.noTips = this.getChild("bg_popup_middle/scrollview/noListTipsSk")
        this.noTips.active = false
        this.titleNode = this.getChild("bg_popup_middle/topTitle")
        this.titleNode.active = false
        this.botNode = this.getChild("BotBtn")
        this.botNode.active = false
        this.initItemPool();

    }

    OnNextPagePageBtnClick() {
        Global.Audio.playBtnSound();
        this.page++
        if (this.page > this.TotalPage) {
            this.page = this.TotalPage
            Global.UI.fastTip("没有更多数据")
            return
        }
        this.SpreadModel.GetDayAgentRecord(this.page, this.limit)
    }
    OnLastPageBtnClick() {
        Global.Audio.playBtnSound();
        this.page--
        if (this.page <= 0) {
            this.page = 1
            Global.UI.fastTip("已经是第一页了")
            return
        }

        this.SpreadModel.GetDayAgentRecord(this.page, this.limit)

    }

    protected onOpen(data) {
        this.SpreadModel.on(NetAppface.GetSelfReadRecord, this, this.RefreshScrollView)
        this.SpreadModel.on(NetAppface.GetDayAgentRecord, this, this.RefreshScrollView)
        this.copyItem.active = false
        if (data == null || data.length == 0) {

            return;
        }
        this.RefreshScrollView(data[0])
    }
    RefreshScrollView(data: any) {
        if (data == null) {
            Global.UI.fastTip("无数据")
            return
        }
        if (data.total == 0) {
            this.noTips.active = true
            this.titleNode.active = false
            this.botNode.active = false
        }
        else {
            this.noTips.active = false
            this.titleNode.active = true
            this.botNode.active = true
        }
        this.TotalPage = Math.ceil(data.total / data.limit)
        let msgFormat = "共%s条"
        this.TotalInfoLabel.string = cc.js.formatStr(msgFormat, data.total);
        let str = "第%s页"
        this.PageLabel.string = cc.js.formatStr(str, this.TotalPage);
        let arr: Array<any> = data.data || [];
        let count = arr.length;

        this.recycle()

        for (let j = 0; j < count; j++) {

            let node = this.itemPool.getItem() as cc.Node;
            this.nodeList.push(node);
            node.active = true;
           // node.getChildByName("bg").active = j % 2 == 0;
            node.setParent(this.contentNode);
            node.getComponent("AwardRecordItem").Init(arr[j])
        }

    }

    protected onClose() {
        this.ResetData()
        this.SpreadModel.off(NetAppface.GetSelfReadRecord, this, this.RefreshScrollView)
        this.SpreadModel.off(NetAppface.GetDayAgentRecord, this, this.RefreshScrollView)
    }
    ResetData() {
        this.page = 1
        this.TotalPage = 0
    }
    protected onDispose() {
        this.nodeList = [];
        this.itemPool.resetPool()
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