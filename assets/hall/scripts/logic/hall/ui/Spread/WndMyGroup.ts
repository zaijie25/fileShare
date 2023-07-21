import ViewBase from "../../../core/ui/ViewBase";
import PoolBase from "../../../core/tool/PoolBase";
import SpreadModel from "../../../hallcommon/model/SpreadModel";
import { NetAppface } from "../../../core/net/hall/NetEvent";
import WaitingView from "../waiting/WaitingView";

export default class WndMyGroup extends ViewBase {
    copyItem: any;
    contentNode: any;
    SpreadModel: SpreadModel
    itemPool: GroupItemPool;
    nodeList: any[] = [];
    /**直属玩家 */
    DirDelegate: cc.Label
    /**团队成员 */
    GroupAmount: cc.Label
    /**其他玩家 */
    DelegateAmount: cc.Label
    /**本日总业绩 */
    TodayNew: cc.Label
    /**新增其他玩家 */
    DirectPlayer: cc.Label
    TotalInfoLabel: cc.Label
    PageLabel: cc.Label
    editBox: cc.EditBox
    LastPageBtn: cc.Node
    NextPageBtn: cc.Node
    cmmi_type;

    page = 1
    limit = 4
    TotalPage = 0

    private waitingNode :cc.Node;
    protected initView() {
        if(this.waitingNode == null|| this.waitingNode == undefined){
            //view 内的loading
            this.waitingNode = WaitingView.initWaitingView(this.node,cc.v2(0,0));
        }
        this.SpreadModel = <SpreadModel>Global.ModelManager.getModel("SpreadModel");
        this.LastPageBtn = this.getChild("View/BotBtn/LastPage")
        this.NextPageBtn = this.getChild("View/BotBtn/NextPage")
        this.LastPageBtn.on("click", this.OnLastPageBtnClick, this);
        this.NextPageBtn.on("click", this.OnNextPagePageBtnClick, this);
        this.addCommonClick("EditItem/SearchButton", this.OnSearchBtnClick, this);
        this.contentNode = this.getChild("View/scrollview/view/content");
        this.copyItem = this.getChild("View/scrollview/view/content/item");
        this.copyItem.active = false;
        this.cmmi_type = this.SpreadModel.commiType
        this.TodayNew = this.getChild("TopRight/TodayAdd/Count").getComponent(cc.Label)

        this.DirDelegate = this.getChild("TopLeft/DirectPlayer/Count").getComponent(cc.Label)
        // if (this.cmmi_type == 1) {
        //     this.DirectPlayer = this.getChild("TopRight/DirectPlayer/Count").getComponent(cc.Label)
        // }
        this.GroupAmount = this.getChild("TopLeft/GroupCountTitle/GroupCount").getComponent(cc.Label)
        this.DelegateAmount = this.getChild("TopLeft/OtherPlayer/Count").getComponent(cc.Label)

        this.TotalInfoLabel = this.getChild("View/BotBtn/TotalInfoLabel").getComponent(cc.Label)
        this.PageLabel = this.getChild("View/BotBtn/TotalInfoLabel/PageLabel").getComponent(cc.Label)
        this.editBox = this.getChild("EditItem/SearchEditBox").getComponent(cc.EditBox)
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
        if(this.waitingNode)
        {
            this.waitingNode.active = true;
        }
        // if (this.cmmi_type == 1) {
        //     this.SpreadModel.ReqGetSelfTeam(this.page, this.limit)
        // }
        else if (this.cmmi_type == 2) {
            this.SpreadModel.GetDayAgentTeamInfo(0, this.page, this.limit)
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
        // if (this.cmmi_type == 1) {
        //     this.SpreadModel.ReqGetSelfTeam(this.page, this.limit)
        // }
        else if (this.cmmi_type == 2) {
            this.SpreadModel.GetDayAgentTeamInfo(0, this.page, this.limit)
        }

    }

    OnSearchBtnClick() {
        this.CheckEmptyFunc(this.editBox.string)
    }


    CheckEmptyFunc(str) {
        if (!this.checkTextEmptyAndShowTips(str, "ID不能为空"))
            return;
        // if (this.cmmi_type == 1) {
        //     this.SpreadModel.ReqSearchSelfTeam(Number(str))
        // }
        else if (this.cmmi_type == 2) {
            this.SpreadModel.SeachSelfTeamUser(Number(str))
        }
    }

    private checkTextEmptyAndShowTips(text: string, tipsLabel: string) {
        if (text.length <= 0) {
            Global.UI.fastTip(tipsLabel);
            return false;
        }
        return true;
    }
    private initItemPool() {

        this.itemPool = new GroupItemPool(this.copyItem);
    }


     onSubViewShow() {
        if(this.waitingNode)
        {
            this.waitingNode.active = true;
        }
        Global.HallServer.on(NetAppface.SeachSelfTeam, this, this.OnQueryTeamUser)
        Global.HallServer.on(NetAppface.SeachSelfTeamUser, this, this.OnQueryTeamUser)
        Global.HallServer.on(NetAppface.GetSelfTeam, this, this.InitTeamListView)
        Global.HallServer.on(NetAppface.GetDayAgentTeamInfo, this, this.InitTeamListView)
        if (this.cmmi_type == 1) {
         //   this.SpreadModel.ReqGetSelfTeam(this.page, this.limit)
        }
        else if (this.cmmi_type == 2) {
            this.SpreadModel.GetDayAgentTeamInfo(0, this.page, this.limit)
        }

    }
    OnQueryTeamUser(data) {
        Global.UI.show("WndLowerSearch", data)

    }
    InitTeamListView(data) {
        if(this.waitingNode)
        {
            this.waitingNode.active = false;
        }
        if (data == null) {
            return
        }
        // if (this.cmmi_type == 1) {
        //     this.InitTopView(data)
        // }
        else if (this.cmmi_type == 2) {
            this.InitTopViewCommi(data)
        }

        let arr: Array<any> = data.data || [];
        let count = arr.length;

        this.recycle()

        for (let j = 0; j < count; j++) {

            let node = this.itemPool.getItem();
            this.nodeList.push(node);
            node.active = true;

            node.setParent(this.contentNode);
            node.getComponent("GroupItem").Init(arr[j], j)
        }
        let msgFormat = "共%s条"
        this.TotalInfoLabel.string = cc.js.formatStr(msgFormat, data.total);
        let str = "第%s页"
        this.PageLabel.string = cc.js.formatStr(str, data.page);
        this.TotalPage = Math.ceil(data.total / data.limit)
    }
    InitTopView(data) {
        if (data == null) {
            this.DirDelegate.string = ""
            this.GroupAmount.string = ""
            this.DelegateAmount.string = ""
            if (this.TodayNew)
                this.TodayNew.string = ""
            if (this.DirectPlayer)
                this.DirectPlayer.string = ""
        }
        else {
            this.DirDelegate.string = data.unter_num
            this.GroupAmount.string = data.team_num
            this.DelegateAmount.string = data.other_num
            if (this.TodayNew)
                this.TodayNew.string = data.new_unter_num
            if (this.DirectPlayer)
                this.DirectPlayer.string = data.new_other_num
        }
    }

    InitTopViewCommi(data) {
        if (data == null) {
            this.DirDelegate.string = ""
            this.GroupAmount.string = ""
            this.DelegateAmount.string = ""
            this.TodayNew.string = ""
        }
        else {
            this.DirDelegate.string = data.unter_user_num
            this.GroupAmount.string = data.all_user_num
            this.DelegateAmount.string = data.team_user_num
            this.TodayNew.string =  Global.Toolkit.formatPointStr(data.total_flow, true)
        }
    }

    onSubViewHide() {
        Global.HallServer.offAllByCaller(this)
        //Global.HallServer.off(NetAppface.QueryTeamUser,this,this.OnQueryTeamUser)
        this.ResetData()
    }

    public ResetData() {
        this.page = 1
        this.TotalPage = 0
        this.editBox.string = ""
    }
    protected onDispose() {
        this.itemPool.resetPool()
    }

    public recycle() {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    }

}
class GroupItemPool extends PoolBase {
    constructor(private copyNode: cc.Node) {
        super();
    }

    protected createItem() {
        return cc.instantiate(this.copyNode);
    }

    protected resetItem(node: cc.Node) {
        node.active = false;
        node.setParent(null)
    }
    public recycleAll(arr: Array<any>) {
        super.recycleAll(arr)
        arr.forEach(ele => {
            this.resetItem(ele);
        });

    }

}
