import RechargeModel from "../../../hallcommon/model/RechargeModel";
import WndBase, { DestoryType } from "../../../core/ui/WndBase";
import RechangeView from "./RechangeView";
import CashView from "./CashView";
import AppHelper from "../../../core/tool/AppHelper";
import RechagreTipModel from "../../../hallcommon/model/RechagreTipModel";
import { SceneType } from "../../../core/scene/SceneManager";

export default class WndRecharge extends WndBase{
    public rechargeView: RechangeView;
    private cashView: CashView;
    rechargeTitle: cc.Node
    cashTitle: cc.Node
    rechargePanel: cc.Node;
    cashPanel: cc.Node;
    private model: RechargeModel;
    private loadingNode: cc.Node;
    private iconSp: cc.Sprite;
    Tipmodel: RechagreTipModel;


    private subViewPath :any = {
        "rechargeView":"hall/prefabs/ui/Recharge/subView/RechangePanel",
        "cashView":"hall/prefabs/ui/Recharge/subView/CashPanel",
        
    }

    private viewKeyTypeMap :any = {
        "rechargeView":RechangeView,
        "cashView":CashView,
       
    }
    protected onInit() {
        this.name = "WndRecharge";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Recharge/RechangeUI";
        this.model = <RechargeModel>Global.ModelManager.getModel("RechargeModel");
        this.destoryType = DestoryType.None;
    }
    onOpen(){
        if (AppHelper.isCash) {
            // this.cashTitle.isChecked =true;
            this.changeToRechargeToggle(false);
            this.changePanel2();
        }else{
            // this.rechargeTitle.isChecked =true;
            this.changeToRechargeToggle(true);
            this.changePanel()
        }
        this.model.on(RechargeModel.ShowWaitingAnim, this, this.showLoading); 
    }
   
    protected initView(){
        this.addCommonClick("close",this.close,this);
        this.rechargeTitle = this.getChild("topButton/rechargeTitle");
        this.cashTitle = this.getChild("topButton/cashTitle");
        this.Tipmodel = <RechagreTipModel>Global.ModelManager.getModel("RechagreTipModel");
        this.rechargeTitle.on("click",this.changePanel,this);
        this.cashTitle.on("click",this.changePanel2,this);

        this.loadingNode = this.getChild("animLoading");
        this.loadingNode.active = false
        this.iconSp = <cc.Sprite>this.getComponent("animLoading/icon", cc.Sprite);
        this.initSubViewClass(this.viewKeyTypeMap)
        
        this.InitScripts()
    }


    async InitScripts() {
        await this.initSubView(this.subViewPath,this.viewKeyTypeMap,this.getChild("payNode"))
    }
    private showLoading(flag: boolean, key?: string){
        this.loadingNode.active = flag;
        if (flag){
            //除了紫色版本外 其他版本资源需要放到hall/texture/hall/rechargeCash/rechargeCash  中
            if(Global.Setting.SkinConfig.isPurple)
                this.iconSp.spriteFrame = Global.ResourceManager.getSprite("hall/texture/common/icon", Global.Setting.SkinConfig.rechargeIconsCfg[key][2]);
            else
            {
                Global.ResourceManager.loadAutoAtlas(this.iconSp, "hall/texture/hall/rechargeCash/rechargeCash", Global.Setting.SkinConfig.rechargeIconsCfg[key][2]);
            }
        }
    }

    changePanel(){
        if(this.rechargeView)
        {
            this.rechargeView.subViewState = true;
        }
        if(this.cashView)
        {
            this.cashView.subViewState = false;
        }
        this.changeToRechargeToggle(true);
    }

    changeToRechargeToggle(yes:boolean){
        let cashCheck = this.cashTitle.getChildByName("check") as cc.Node;
        let cashUncheck = this.cashTitle.getChildByName("unchecked") as cc.Node;
        let rechargeCheck = this.rechargeTitle.getChildByName("check") as cc.Node;
        let rechargeUncheck = this.rechargeTitle.getChildByName("unchecked") as cc.Node;
        rechargeCheck.active = yes;
        rechargeUncheck.active = !yes;
        cashCheck.active = !yes;
        cashUncheck.active = yes;
    }

    changePanel2(){
        if (Global.SceneManager.sceneType == SceneType.Game) {
            Global.UI.fastTip("请返回游戏大厅后，再进行提现操作哦！");
            Game.Component.scheduleOnce(()=>{
                // this.rechargeTitle.isChecked =true;
                this.changeToRechargeToggle(true);
                this.changePanel()
            },0.1);
            return
        }
        if(this.rechargeView)
        {
            this.rechargeView.subViewState = false;
        }
        if(this.cashView)
        {
            this.cashView.subViewState = true;
        }
        this.changeToRechargeToggle(false);
    }
    protected onClose(){
        //Listener
        this.Tipmodel.flag = false;
        AppHelper.isCash=false;
        this.model.off(RechargeModel.ShowWaitingAnim, this, this.showLoading); 
    }
}    