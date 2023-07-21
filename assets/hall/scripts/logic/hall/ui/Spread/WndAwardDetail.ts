import ViewBase from "../../../core/ui/ViewBase";
import PoolBase from "../../../core/tool/PoolBase";
import SpreadModel from "../../../hallcommon/model/SpreadModel";
import { NetAppface } from "../../../core/net/hall/NetEvent";
import WaitingView from "../waiting/WaitingView";

export default class WndAwardDetail extends ViewBase {
    copyItem: any;
    contentNode: any;
    SpreadModel: SpreadModel
    itemPool: AwardDetailItemPool;
    nodeList: any[] = [];
    WeekTotal: cc.Label
    WeekMyselfDir: cc.Label
    WeekDir: cc.Label
    WeekOther: cc.Label
    TotalInfo: cc.Label
    pageInfo: cc.Label
    LastPageBtn: cc.Node
    NextPageBtn: cc.Node
    noTips: cc.Node
    titleNode: cc.Node
    botNode: cc.Node
    cmmi_type: number
    topNode: cc.Node
    private top_self:cc.Node
    private top_normal:cc.Node

    private title_self:cc.Node
    private title_normal:cc.Node

    page = 1
    limit = 7
    totalPage = 0

    private waitingNode :cc.Node;
    protected initView() {
        if(this.waitingNode == null|| this.waitingNode == undefined){
            //view 内的loading
            this.waitingNode = WaitingView.initWaitingView(this.node,cc.v2(0,0));
        }
        this.SpreadModel = <SpreadModel>Global.ModelManager.getModel("SpreadModel");
        this.top_normal = this.getChild("Top_Normal")
        this.top_self = this.getChild("Top_Self")
        this.title_self = this.getChild("View/Title_Self")
        this.title_normal = this.getChild("View/Title_Normal")
        this.cmmi_type = this.SpreadModel.commiType
        this.copyItem = this.getChild("View/scrollview/item");
        if (this.SpreadModel.self_rate > 0 && this.cmmi_type === 1) {
            // this.WeekMyselfDir = this.getChild("Top_Self/WeekMyselfDir/Count").getComponent(cc.Label)
            // this.top_self.active = true
            // this.title_self.active = true
            // this.top_normal.active = false
            // this.title_normal.active = false
            // this.titleNode = this.title_self
            // this.topNode = this.top_self
            // this.WeekTotal = this.getChild("Top_Self/WeekTotal/Count").getComponent(cc.Label)
            // this.WeekDir = this.getChild("Top_Self/WeekDir/Count").getComponent(cc.Label)
            // this.WeekOther = this.getChild("Top_Self/WeekOther/Count").getComponent(cc.Label)
            // this.copyItem = this.getChild("View/scrollview/item_self");
        }
        else if(this.SpreadModel.self_rate <= 0 && this.cmmi_type === 1)
        {
            // this.top_self.active = false
            // this.title_self.active = false
            // this.top_normal.active = true
            // this.titleNode = this.title_normal
            // this.topNode = this.top_normal
            // this.title_normal.active = true
            // this.WeekTotal = this.getChild("Top_Normal/WeekTotal/Count").getComponent(cc.Label)
            // this.WeekDir = this.getChild("Top_Normal/WeekDir/Count").getComponent(cc.Label)
            // this.WeekOther = this.getChild("Top_Normal/WeekOther/Count").getComponent(cc.Label)
            // this.top_self.active = false
            // this.title_self.active = false 
        }
        if(this.cmmi_type == 2)
        {
            this.titleNode = this.getChild("View/Title")
        }
        this.LastPageBtn = this.getChild("View/BotBtn/LastPage")
        this.NextPageBtn = this.getChild("View/BotBtn/NextPage")
        this.LastPageBtn.on("click", this.OnLastPageBtnClick, this);
        this.NextPageBtn.on("click", this.OnNextPagePageBtnClick, this);
        this.contentNode = this.getChild("View/scrollview/view/content");
        this.copyItem.active = false;
        
        this.TotalInfo = this.getChild("View/BotBtn/TotalInfoLabel").getComponent(cc.Label)
        this.pageInfo = this.getChild("View/BotBtn/TotalInfoLabel/PageLabel").getComponent(cc.Label)
        this.noTips = this.getChild("View/noListTipsSk")
        this.noTips.active = false
        this.botNode = this.getChild("View/BotBtn")
        this.botNode.active = false
        this.initItemPool();
    }

    OnNextPagePageBtnClick() {
        Global.Audio.playBtnSound();
        this.page++
        if (this.page > this.totalPage) {
            this.page = this.totalPage
            Global.UI.fastTip("没有更多数据")
            return
        }
        if(this.waitingNode)
        {
            this.waitingNode.active = true;
        }
        if (this.cmmi_type === 1) {
           // this.SpreadModel.GetAwardRecordInfo(this.page, this.limit)
        }
        if (this.cmmi_type === 2) {
            this.SpreadModel.GetDayFlowInfoList(this.page, this.limit)
        }
    }
    OnLastPageBtnClick() {
        Global.Audio.playBtnSound();
        this.page--
        if (this.page <= 0) {
            this.page = 1
            Global.UI.fastTip("已经是第一页了")
            return
        }
        if(this.waitingNode)
        {
            this.waitingNode.active = true;
        }
        if (this.cmmi_type === 1) {
          //  this.SpreadModel.GetAwardRecordInfo(this.page, this.limit)
        }
        if (this.cmmi_type === 2) {
            this.SpreadModel.GetDayFlowInfoList(this.page, this.limit)
        }

    }




    private initItemPool() {

        this.itemPool = new AwardDetailItemPool(this.copyItem);
    }

    // public open(args?:any[])
    // {
    //     this.onOpen(args);
    //     //this.callAllView("open", args);
    // }
    onSubViewShow() {
        Global.HallServer.on(NetAppface.GetSendRecord, this, this.InitTeamListView)
        Global.HallServer.on(NetAppface.GetDayFlowInfoList, this, this.InitTeamListView)
        if (this.cmmi_type === 1) {
          //  this.SpreadModel.GetAwardRecordInfo(this.page, this.limit)
        }
        if (this.cmmi_type === 2) {
            this.SpreadModel.GetDayFlowInfoList(this.page, this.limit)
        }
    }
    InitTeamListView(data) {
        if(this.waitingNode)
        {
            this.waitingNode.active = false;
        }
        if (data == null || Global.Toolkit.isEmptyObject(data)) {
            return
        }
        if (data.total == 0) {
            if (this.topNode)
                this.topNode.active = false
            this.noTips.active = true
            this.titleNode.active = false
            this.botNode.active = false
        }
        else {
            if (this.topNode)
                this.topNode.active = true
            this.noTips.active = false
            this.titleNode.active = true
            this.botNode.active = true
        }

        this.InitTopView(data)
        let arr: Array<any>;
        if (this.cmmi_type === 1) {
           // arr = data.data || []
        }
        if (this.cmmi_type === 2) {
            arr = data.list || []
        }
        let count = arr.length;
        this.totalPage = Math.ceil(data.total / data.limit)
        this.recycle()
        let msgFormat = "共%s条"
        this.TotalInfo.string = cc.js.formatStr(msgFormat, data.total);
        let str = "第%s页"
        this.pageInfo.string = cc.js.formatStr(str, data.page);
        for (let j = 0; j < count; j++) {
            let node = this.itemPool.getItem();
            this.nodeList.push(node);
            node.active = true
            node.setParent(this.contentNode);
            node.getComponent("AwardDetailItem").Init(arr[j])
        }
    }
    InitTopView(data) {
        if (data == null) {
            if (this.WeekTotal)
                this.WeekTotal.string = ""
            if (this.WeekMyselfDir)
                this.WeekMyselfDir.string = ""
            if (this.WeekDir)
                this.WeekDir.string = ""
            if (this.WeekOther)
                this.WeekOther.string = ""
        }
        else {
            //TODO
            if (this.WeekTotal)
                this.WeekTotal.string = Global.Toolkit.formatPointStr(data.week_total_send_point)
            if (this.WeekMyselfDir)
                this.WeekMyselfDir.string = Global.Toolkit.formatPointStr(data.week_self_send_point)
            if (this.WeekDir)
                this.WeekDir.string = Global.Toolkit.formatPointStr(data.week_unter_send_point)
            if (this.WeekOther)
                this.WeekOther.string = Global.Toolkit.formatPointStr(data.week_other_send_point)
        }

    }

    public recycle() {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    }
    onSubViewHide() {
        this.ResetData()

        Global.HallServer.offAllByCaller(this)
        Global.HallServer.off(NetAppface.GetSendRecord, this, this.InitTeamListView)
        Global.HallServer.off(NetAppface.GetCommiInfoList, this, this.InitTeamListView)
    }
    ResetData() {
        this.totalPage = 0
        this.page = 1
    }

    protected onDispose() {
        this.itemPool.resetPool()
    }

}
class AwardDetailItemPool extends PoolBase {
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
