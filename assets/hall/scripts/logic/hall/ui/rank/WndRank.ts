import WndBase from "../../../core/ui/WndBase";
import RankModel from "../../../hallcommon/model/RankModel";
import SpreadModel from "../../../hallcommon/model/SpreadModel";
import WaitingView from "../waiting/WaitingView";

class WndRank extends WndBase {
    private RankScrollView: cc.ScrollView;
    private selfLabelName: cc.Label;
    private selfLabelID: cc.Label;
    private selfLabelCount: cc.Label;
    private selfRankLab: cc.Label;
    private selfheadImg: cc.Node;
    private selfRankSprite: cc.Sprite;
    //private fontSprite: cc.Sprite;
    private RankModel: RankModel;
    private copyItem: cc.Node;
    private dayRank: cc.Node;
    private weekRank: cc.Node;
    //未上榜
    private notInListNode: cc.Node;
    nodeList: any[] = [];
    listView: any;
    listView2: any;
    private curWin: number = 0;//0日 1周

    //佣金
    CommissionUn: cc.Label;
    CommissionCh: cc.Label;

    CommissionUn1: cc.Label;
    CommissionCh1: cc.Label;
    // SpFrameurl = "hall/texture/rank/rankAtlas"
    // SpDayWeek = ["jryl_1","jryl_2","bzyl_1","bzyl_2","jrylb_1", "jrylb_2", "bzyjb_1", "bzyjb_2"]
    DayWeek = ["今日盈利榜", "本周盈利榜", "今日盈利榜", "本周佣金榜"];

    private waitingNode: cc.Node;
    SpreadModel: SpreadModel;
    protected onOpen() {
        this.RankModel.on(RankModel.RefreshScrollview, this, this.RefreshScrollView)
        this.RankModel.on(RankModel.UpdateRankData, this, this.UpdataListData)
        this.setToggleChecked(this.dayRank, true)
        this.setToggleChecked(this.weekRank, false)
        this.changeInfoNode(null);
    }

    public afterOpen() {
    }

    protected onInit() {
        this.isNeedDelay = true
        this.name = "WndRank";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/RankUI";
        this.RankModel = <RankModel>Global.ModelManager.getModel("RankModel");
    }

    protected initView() {

        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;

        // this.dayRank = this.getChild("PanelNode/RankPanel/TopTitle/topButton/dayRank");
        // this.weekRank = this.getChild("PanelNode/RankPanel/TopTitle/topButton/weekRank");
        this.dayRank = this.getChild("leftPanel/dayRank");
        this.weekRank = this.getChild("leftPanel/weekRank");
        this.dayRank.on("click", this.changeInfoNode, this);
        this.weekRank.on("click", this.changeInfoNode2, this);

        this.addCommonClick("close", this.close, this);
        this.RankScrollView = this.getComponent("rightPanel/scrollview", cc.ScrollView);
        this.copyItem = this.getChild("rightPanel/scrollview/view/content/Item");
        this.copyItem.active = false;
        let tmpSelfLbID = this.getChild("SelfInfo/LeftNode/IdLab")
        this.selfLabelID = tmpSelfLbID.getComponent(cc.Label)

        let tmpSelfLbName = this.getChild("SelfInfo/LeftNode/NameLab")
        this.selfLabelName = tmpSelfLbName.getComponent(cc.Label)

        let tmpContent = this.getChild("SelfInfo/RightNode/CoinLabel")
        this.selfLabelCount = tmpContent.getComponent(cc.Label)
        // this.fontSprite = this.getChild("SelfInfo/RightNode/Font").getComponent(cc.Sprite);
        // this.fontSprite.node.active = false
        let tmpRankLab = this.getChild("SelfInfo/LeftNode/RankBg/RankLabel")
        this.selfRankLab = tmpRankLab.getComponent(cc.Label)

        this.notInListNode = this.getChild("SelfInfo/LeftNode/RankBg/notInList");
        this.notInListNode.active = false;

        let tmpRankSp = this.getChild("SelfInfo/LeftNode/RankBg")
        this.selfRankSprite = tmpRankSp.getComponent(cc.Sprite)

        // this.CommissionUn = this.getComponent("PanelNode/RankPanel/TopTitle/topButton/dayRank/unchecked/unchecked", cc.Sprite)
        // this.CommissionCh = this.getComponent("PanelNode/RankPanel/TopTitle/topButton/dayRank/check/unchecked", cc.Sprite)

        // this.CommissionUn1 = this.getComponent("PanelNode/RankPanel/TopTitle/topButton/weekRank/unchecked/unchecked", cc.Sprite)
        // this.CommissionCh1 = this.getComponent("PanelNode/RankPanel/TopTitle/topButton/weekRank/check/unchecked", cc.Sprite)
        this.CommissionUn = this.getComponent("leftPanel/dayRank/unchecked/label", cc.Label)
        this.CommissionCh = this.getComponent("leftPanel/dayRank/check/label", cc.Label)

        this.CommissionUn1 = this.getComponent("leftPanel/weekRank/unchecked/label", cc.Label)
        this.CommissionCh1 = this.getComponent("leftPanel/weekRank/check/label", cc.Label)
        this.SpreadModel = Global.ModelManager.getModel("SpreadModel");

        this.RankScrollView.node.on("scroll-to-bottom", () => {
            if (this.waitingNode && this.listView.allDatas && this.listView.allDatas.length < 100) {
                this.waitingNode.active = true;
            }
            this.reqNewData()
        }, this);
        let rank_type = this.SpreadModel.RankType
        if (rank_type == 1) {
            // Global.ResourceManager.loadAutoAtlas(this.CommissionUn, this.SpFrameurl, this.SpDayWeek[2],null,false)
            // Global.ResourceManager.loadAutoAtlas(this.CommissionCh, this.SpFrameurl, this.SpDayWeek[3],null,false)
            // Global.ResourceManager.loadAutoAtlas(this.CommissionUn1, this.SpFrameurl, this.SpDayWeek[0],null,false)
            // Global.ResourceManager.loadAutoAtlas(this.CommissionCh1, this.SpFrameurl, this.SpDayWeek[1],null,false)

            //暂时屏蔽 @parker
            //this.CommissionUn.string = this.DayWeek[1];
            //this.CommissionCh.string = this.DayWeek[1];
            //this.CommissionUn1.string = this.DayWeek[0];
            //this.CommissionCh1.string = this.DayWeek[0];

        }
        else if (rank_type == 2) {
            // Global.ResourceManager.loadAutoAtlas(this.CommissionUn, this.SpFrameurl, this.SpDayWeek[6],null,false)
            // Global.ResourceManager.loadAutoAtlas(this.CommissionCh, this.SpFrameurl, this.SpDayWeek[7],null,false)
            // Global.ResourceManager.loadAutoAtlas(this.CommissionUn1, this.SpFrameurl, this.SpDayWeek[4],null,false)
            // Global.ResourceManager.loadAutoAtlas(this.CommissionCh1, this.SpFrameurl, this.SpDayWeek[5],null,false)

            //暂时屏蔽 @parker
            // this.CommissionUn.string = this.DayWeek[3];
            // this.CommissionCh.string = this.DayWeek[3];
            // this.CommissionUn1.string = this.DayWeek[2];
            // this.CommissionCh1.string = this.DayWeek[2];

        }
        this.selfheadImg = this.getChild("SelfInfo/LeftNode/headImg")

        this.InitScrollViewObj()

        if (this.waitingNode == null || this.waitingNode == undefined) {
            //view 内的loading
            this.waitingNode = WaitingView.initWaitingView(this.node, cc.v2(0, 0));
        }
    }

    reqNewData() {
        let rankType = this.SpreadModel.RankType
        if (rankType == 1) {
            if (this.curWin == 0) {
                this.RankModel.reqRankInfo(3, true);
                return
            }
            this.RankModel.reqRankInfo(1, true);
        }
        else if (rankType == 2) {
            if (this.curWin == 0) {
                this.RankModel.reqRankInfo(6, true);
                return
            }
            this.RankModel.reqRankInfo(1, true);
        }

    }

    InitScrollViewObj() {
        let item_setter = (item, index) => {
            let data = this.listView.allDatas[index];

            item.getComponent("RankItem").Init(data)
        };
        this.listView = Global.UIHelper.addScrollViewCarmackComp(this.RankScrollView.node, this.copyItem, 15, 0, this, item_setter);
    }


    initSelfPanel(rank: any, profit: any) {
        if (Number(Global.PlayerData.headimg)) {
            let headSprite = this.selfheadImg.getComponent(cc.Sprite)
            let tempFrame = Global.Toolkit.getLocalHeadSf(Global.PlayerData.headimg)
            headSprite.spriteFrame = tempFrame
        } else {
            Global.Toolkit.loadWebPic(this.selfheadImg, Global.PlayerData.headimg)
        }
        this.selfLabelID.string = Global.PlayerData.uid.toString();
        this.selfLabelName.string = Global.Toolkit.substrEndWithElli(Global.PlayerData.nickname, 8);
        this.selfLabelCount.string = Global.Toolkit.GetText(profit);
        this.selfRankLab.node.active = false;

        let atlasPath = "hall/texture/rank/rankAtlas"
        if (rank == null || rank == undefined || rank > 100 || rank == 0) {
            this.selfRankSprite.spriteFrame = null;
            this.selfRankLab.node.active = false
            //显示未上榜
            this.notInListNode.active = true;
            return
        }
        if (rank && rank > 3) {
            if (Global.Setting.SkinConfig.isPurple)
                Global.ResourceManager.loadAutoAtlas(this.selfRankSprite, atlasPath, "rank_04", null, false);
            else
                this.selfRankSprite.spriteFrame = null;
            this.selfRankLab.node.active = true;
            this.notInListNode.active = false;
            this.selfRankLab.string = rank;
        }
        else {
            this.notInListNode.active = false;
            switch (rank) {
                case 1:
                    Global.ResourceManager.loadAutoAtlas(this.selfRankSprite, atlasPath, "rank_01", null, false);
                    break;
                case 2:
                    Global.ResourceManager.loadAutoAtlas(this.selfRankSprite, atlasPath, "rank_02", null, false);
                    break;
                case 3:
                    Global.ResourceManager.loadAutoAtlas(this.selfRankSprite, atlasPath, "rank_03", null, false);
                    break;
            }

        }

    }
    protected onClose() {
        this.RankModel.clear()
        this.RankModel.off(RankModel.RefreshScrollview, this, this.RefreshScrollView)
        this.RankModel.off(RankModel.UpdateRankData, this, this.UpdataListData)

    }

    public RefreshScrollView(msg: any) {
        if (!msg)
            return;
        if (this.waitingNode) {
            this.waitingNode.active = false;
        }
        this.OnDataPrepared()
        let arr: Array<any> = msg.pointRankList || [];
        this.listView.allDatas = arr;
        this.listView.updateView();
        this.initSelfPanel(msg.my_rank, msg.my_hit_point);
    }

    public UpdataListData(data) {
        if (this.waitingNode) {
            this.waitingNode.active = false;
        }
        if (data == null) return
        this.listView.allDatas = data
        this.listView.UpDateScrollData()
    }

    changeInfoNode(target) {
        if (this.waitingNode) {
            this.waitingNode.active = true;
        }
        this.curWin = 0;
        let cmmi_type = this.SpreadModel.RankType
        if (cmmi_type == 1) {
            this.RankModel.reqRankInfo(3, false);
        }
        else if (cmmi_type == 2) {
            this.RankModel.reqRankInfo(6, false);
        }
        this.setToggleChecked(this.dayRank, true)
        this.setToggleChecked(this.weekRank, false)
        if (target)
            Global.Audio.playBtnSound();
    }

    changeInfoNode2(target) {

        if (this.waitingNode) {
            this.waitingNode.active = true;
        }
        this.curWin = 1;
        this.RankModel.reqRankInfo(1, false);
        this.setToggleChecked(this.dayRank, false)
        this.setToggleChecked(this.weekRank, true)
        if (target)
            Global.Audio.playBtnSound();
    }

    setToggleChecked(targe: cc.Node, flag: boolean) {
        let check = targe.getChildByName("check")
        let normal = targe.getChildByName("unchecked")
        if (check) {
            check.active = flag
        }
        if (normal) {
            normal.active = !flag
        }

    }
}

export default WndRank