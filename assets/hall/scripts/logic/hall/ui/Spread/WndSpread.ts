import WndBase from "../../../../../scripts/logic/core/ui/WndBase";
import SpreadModel from "../../../hallcommon/model/SpreadModel";
import WndMyGroup from "./WndMyGroup";
import SpreadTutorialWin from "./SpreadTutorialWin";
import WndMySpread from "./WndMySpread";
import HallPopMsgHelper, { PopWndName } from "../../tool/HallPopMsgHelper";
import WndCommissionlist from "./WndCommissionlist";
import CaptureTool from "./CaptureTool";
import WndAwardDetail from "./WndAwardDetail";
import ProxyWin from "./ProxyWin";
export default class WndSpread extends WndBase {

    SpreadModel: SpreadModel;

    private MySpreadToggle: cc.Node;
    private MyGroupToggle: cc.Node;
    private SpreadTutorialToggle: cc.Node;
    private GradeSearchToggle: cc.Node;
    private ProxyWinToggle: cc.Node;

    private subViewParentNode:cc.Node
    private toggleArray = []

    curWin: number = 1; //1代理分红 2我的业绩 3推广教程 4返佣比例

    MySpread: WndMySpread;
    MyGroup: WndMyGroup;
    SpreadTutorial: SpreadTutorialWin;
    WndAwardDetail:WndAwardDetail;
    ProxyWin:ProxyWin;

    public CaptureTool: CaptureTool;
    private qrNode: cc.Node;

    private subViewPath :any = {
        "MySpread":"hall/prefabs/ui/SpreadUI/subView/MySpread",
        "MyGroup":"hall/prefabs/ui/SpreadUI/subView/MyGroup",
        "SpreadTutorial":"hall/prefabs/ui/SpreadUI/subView/SpreadTutorial",
        "WndAwardDetail":"hall/prefabs/ui/SpreadUI/subView/AwardDetailPanel",
        "ProxyWin":"hall/prefabs/ui/SpreadUI/subView/ProxyUI"
    }

    private viewKeyTypeMap :any = {
        "MySpread":WndMySpread,
        "MyGroup":WndMyGroup,
        "SpreadTutorial":SpreadTutorialWin,
        "WndAwardDetail":WndAwardDetail,
        "ProxyWin":ProxyWin,
    }


    protected onInit() {
        this.isNeedDelay = true
        this.name = "WndSpread";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/SpreadUI/SpreadUI";
        this.SpreadModel = <SpreadModel>Global.ModelManager.getModel("SpreadModel");
    }


    protected initView() {
        this.subViewParentNode = this.getChild("RightPanel")

        this.CaptureTool = this.getChild("SpreedCenterUI").getComponent(CaptureTool)
        if(this.CaptureTool)
        {
            this.CaptureTool.node.active = false
        }
        this.qrNode = this.getChild("SpreedCenterUI/qrNode")

        this.MySpreadToggle = this.getChild("LeftPanel/scrollview/view/content/MySpread")
        this.MyGroupToggle = this.getChild("LeftPanel/scrollview/view/content/MyGroup")
        this.SpreadTutorialToggle = this.getChild("LeftPanel/scrollview/view/content/SpreadTutorial");
        this.GradeSearchToggle = this.getChild("LeftPanel/scrollview/view/content/GradeSearch");
        this.ProxyWinToggle = this.getChild("LeftPanel/scrollview/view/content/ProxyBonus");

        this.MySpreadToggle.on("click", this.changeInfoNode, this);
        this.MyGroupToggle.on("click", this.changeInfoNode, this);
        this.SpreadTutorialToggle.on("click", this.changeInfoNode, this);
        this.GradeSearchToggle.on("click", this.changeInfoNode, this);
        this.ProxyWinToggle.on("click", this.changeInfoNode, this);

        this.addCommonClick("bg_popup_almost/close", this.close, this);
        this.initSubViewClass(this.viewKeyTypeMap)
        this.InitScripts()

        let bg = this.getComponent("SpreedCenterUI/bg", cc.Sprite);
        if(bg)
        {
            Global.customApp.loadSpreedBg(bg);
        }

        this.toggleArray.push(this.MySpreadToggle)
        this.toggleArray.push(this.MyGroupToggle)
        this.toggleArray.push(this.SpreadTutorialToggle)
        this.toggleArray.push(this.GradeSearchToggle)
        this.toggleArray.push(this.ProxyWinToggle)
    }

    InitQrcode(url) {
        Global.Toolkit.initQRCode(this.qrNode, url, 10);
    }

    async InitScripts() {
        await this.initSubView(this.subViewPath,this.viewKeyTypeMap,this.subViewParentNode)
    }
   
    
    changeInfoNode(target: any) {
        Global.Audio.playBtnSound();
        var curWin = 1;
        if (target.node == this.MySpreadToggle) {
            curWin = 1;
        }else if (target.node == this.MyGroupToggle) {
            curWin = 2;
        }else if (target.node == this.SpreadTutorialToggle) {
            curWin = 3;
        }else if (target.node == this.GradeSearchToggle) {
            curWin = 4;
        }else if(target.node == this.ProxyWinToggle){
            curWin = 5;
        }
        if (curWin == this.curWin) {
            return;
        }
        this.curWin = curWin;
        this.updateInfoNode();
    }

    updateInfoNode() {
        this.closeAllWin();
        if (this.curWin == 1) {
            this.MySpread.subViewState = true
            this.ToggleClicked(this.MySpreadToggle)

        } else if (this.curWin == 2) {
            if( this.MyGroup)
            {
                this.MyGroup.subViewState = true;
            }
            
            this.ToggleClicked(this.MyGroupToggle)
        }
        else if (this.curWin == 3) {
            if( this.SpreadTutorial)
            {
                this.SpreadTutorial.subViewState = true;
            }
            this.ToggleClicked(this.SpreadTutorialToggle)
        }else if (this.curWin == 4) {
            if( this.WndAwardDetail)
            {
                this.WndAwardDetail.subViewState = true;
            }
            this.ToggleClicked(this.GradeSearchToggle)
        }else if (this.curWin == 5) {
            if( this.ProxyWin)
            {
                this.ProxyWin.subViewState = true;
            }
            this.ToggleClicked(this.ProxyWinToggle)
        }
    }

    closeAllWin() {
        if(this.MySpread)
        {
            this.MySpread.subViewState = false;
        }
        if(this.MyGroup)
        {
            this.MyGroup.subViewState = false;
        }
        if(this.SpreadTutorial)
        {
            this.SpreadTutorial.subViewState = false;
        }
        if(this.WndAwardDetail)
        {
            this.WndAwardDetail.subViewState = false;
        }
        if(this.ProxyWin)
        {
            this.ProxyWin.subViewState = false;
        }
        
    }




    ToggleClicked(toggle: cc.Node) {
        if (toggle == null) {
            return
        }
        for (let index = 0; index < this.toggleArray.length; index++) {
            let tmptgl = this.toggleArray[index]
            let checkmark = tmptgl.getChildByName("checkmark")
            let normal = tmptgl.getChildByName("Background")
            if (tmptgl == toggle) {
                checkmark.active = true
                normal.active = false
            }
            else {
                checkmark.active = false
                normal.active = true
            }

        }
    }

    ResetToggle() {
        for (let index = 0; index < this.toggleArray.length; index++) {
            let tmptgl = this.toggleArray[index]
            let checkmark = tmptgl.getChildByName("checkmark")
            let normal = tmptgl.getChildByName("Background")
            checkmark.active = false
            normal.active = true
        }
    }

    public OnDataPrepared() {
        super.OnDataPrepared()
    }

    public afterOpen() {

    }

    protected onOpen(args?: any[]) {
        this.updateInfoNode()
        let url = Global.Setting.Urls.inviteUrl;
        url = this.SpreadModel.Url || url
        this.InitQrcode(url)
    }


    protected onClose() {
        HallPopMsgHelper.Instance.releaseLock(PopWndName.Spread);
        this.SpreadModel.CheckRedFlag()
        this.curWin = 1
    }


    onDispose() {
        this.toggleArray = []
    }

}