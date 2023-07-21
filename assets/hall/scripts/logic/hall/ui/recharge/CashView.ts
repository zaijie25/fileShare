import ViewBase from "../../../core/ui/ViewBase";
import ExtractModel from "../../../hallcommon/model/ExtractModel";
import aliBandWin from "../money/ui/extractCash/aliBandWin";
import aliExtractCashWin from "../money/ui/extractCash/aliExtractCashWin";
import unionBandWin from "../money/ui/extractCash/unionBandWin";
import unionExtractCashWin from "../money/ui/extractCash/unionExtractCashWin";
// import MoneyRecordBox from "../money/ui/common/MoneyRecordBox";
import { ExtractEvent } from "../money/ui/extractCash/ExtractEvent";
import CashListView from "./CashListView";
import overseasBankWin from "../money/ui/extractCash/overseasBankWin";
import overseasExtractCashWin from "../money/ui/extractCash/overseasExtractCashWin";
import WaitingView from "../waiting/WaitingView";

export default class CashView extends ViewBase {
    private model : ExtractModel;
    private curWin : number = 0;//0银行 1支付宝 2海外 3列表


    private aliToggle:cc.Node;
    private unionToggle:cc.Node;
    private listToggle:cc.Node;
    // private overseasToggle:cc.Node; //提现 海外 按钮

    private aliBandWin:aliBandWin;
    private aliExtractCashWin:aliExtractCashWin;
    private unionBandWin:unionBandWin;
    private unionExtractCashWin:unionExtractCashWin;
    //private cashListView:CashListView;
    protected curMoneyNumLabel: cc.Label = null;
    private overseasBankWin:overseasBankWin;
    private overseasExtractCashWin:overseasExtractCashWin;

    private subViewParentNode:cc.Node

    private waitingNode :cc.Node;
    private subViewPath :any = {
        "aliBandWin":"hall/prefabs/ui/Recharge/subView/cash/aliBandWin",
        "aliExtractCashWin":"hall/prefabs/ui/Recharge/subView/cash/aliExtractCashWin",
        "unionBandWin":"hall/prefabs/ui/Recharge/subView/cash/unionBandWin",
        "unionExtractCashWin":"hall/prefabs/ui/Recharge/subView/cash/unionExtractCashWin",
        "overseasBankWin":"hall/prefabs/ui/Recharge/subView/cash/overseasBandWin",
        "overseasExtractCashWin":"hall/prefabs/ui/Recharge/subView/cash/overseasExtractCashWin"
    }

    private viewKeyTypeMap :any = {
        "aliBandWin":aliBandWin,
        "aliExtractCashWin":aliExtractCashWin,
        "unionBandWin":unionBandWin,
        "unionExtractCashWin":unionExtractCashWin,
        "overseasBankWin":overseasBankWin,
        "overseasExtractCashWin":overseasExtractCashWin
    }



    protected onSubViewShow()
    {
        super.onSubViewShow()
        if(this.waitingNode)
        {
            this.waitingNode.active = true;
        }
        //Listener
        this.model.reqGetBankInfo();
        this.model.allPutList = null;
        this.curWin = -1;
        this.updateInfoNode();
        this.model.reqGetAllPutList();
    }
    protected initView()
    {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        
        this.subViewParentNode = this.getChild("InfoNode")
        //可用余额
        this.model = <ExtractModel>Global.ModelManager.getModel("ExtractModel");
        Global.Event.on(GlobalEvent.PERSONALINFOUPDATE,this,this.updateCurMoney);
        this.model.on(ExtractEvent.OnUpdateBankBindInfo,this,this.updateInfoNode);
        //leftBtn
        this.aliToggle = this.getChild("leftBtns/layout/aliBtn");
        this.unionToggle = this.getChild("leftBtns/layout/unionBtn");
        this.listToggle = this.getChild("leftBtns/layout/listBtn");
        // this.overseasToggle = this.getChild("leftBtns/layout/overseasBtn"); //提现 海外 按钮
        
        this.aliToggle.on("click",this.changeInfoNode,this);
        this.unionToggle.on("click",this.changeInfoNode,this);
        this.listToggle.on("click",this.changeInfoNode,this);
        // this.overseasToggle.on("click",this.changeInfoNode,this); //提现 海外 按钮 点击事件


        this.curMoneyNumLabel = this.getComponent("InfoNode/tabBar/CurMoneyBox/curMoneyNumLabel",cc.Label);


        this.initSubViewClass(this.viewKeyTypeMap)
        
        this.InitScripts()
        //view 内的loading
        if(this.waitingNode == null|| this.waitingNode == undefined){
            //view 内的loading
            this.waitingNode = WaitingView.initWaitingView(this.node,cc.v2(138,0));
        }
        //infoNode
        // this.aliBandWin = <aliBandWin>this.addView("aliBandWin",this.getChild("InfoNode/aliBandWin"),aliBandWin, false);
        // this.aliExtractCashWin = <aliExtractCashWin>this.addView("aliExtractCashWin",this.getChild("InfoNode/aliExtractCashWin"),aliExtractCashWin, false);
        // this.unionBandWin = <unionBandWin>this.addView("unionBandWin",this.getChild("InfoNode/unionBandWin"),unionBandWin, false);
        // this.unionExtractCashWin = <unionExtractCashWin>this.addView("unionExtractCashWin",this.getChild("InfoNode/unionExtractCashWin"),unionExtractCashWin, false);
        // //this.cashListView =  <CashListView>this.addView("CashListView",this.getChild("InfoNode/payList"),CashListView, false);

        // //提现 海外
        // this.overseasBankWin = <overseasBankWin>this.addView("overseasBankWin",this.getChild("InfoNode/overseasBandWin"),overseasBankWin,false);
        // this.overseasExtractCashWin = <overseasExtractCashWin>this.addView("overseasExtractCashWin",this.getChild("InfoNode/overseasExtractCashWin"),overseasExtractCashWin,false);
    }

    async InitScripts() {
        await this.initSubView(this.subViewPath,this.viewKeyTypeMap,this.subViewParentNode)
    }

    protected onDispose()
    {
        this.model.off(ExtractEvent.OnUpdateBankBindInfo,this,this.updateInfoNode);
        Global.Event.off(GlobalEvent.PERSONALINFOUPDATE,this,this.updateCurMoney);
        
    }
    protected onSubViewHide()
    {
        super.onSubViewHide()
        //Listener
    }

        /** 更新当前可提现金额 */
    protected updateCurMoney(){

        if(!this.model.bankDatas){
            return;
        }
        var playerMoney = Global.PlayerData.point - ((this.model.bankDatas.forzen_point || 0) * Global.Setting.glodRatio );
        playerMoney = Math.max(0,playerMoney);
        this.curMoneyNumLabel.string = Global.Toolkit.GetMoneyFormat(playerMoney);
    }

    setToggleChecked(targe:cc.Node,flag:boolean)
    {
        let check = targe.getChildByName("checkmark")
        let normal = targe.getChildByName("Background")
        if (check) {
            check.active = flag
        }
        if (normal) {
            normal.active = !flag
        }
        
    }


    showAliWin(){
        var haveData = this.model.haveAli();
        this.aliBandWin.subViewState = !haveData;
        this.aliExtractCashWin.subViewState = haveData;
        //this.cashListView.active = false;
    }

    showUnionWin(){
        var haveData = this.model.haveUnion();
        this.unionBandWin.subViewState = !haveData;
        this.unionExtractCashWin.subViewState = haveData;
        //this.cashListView.active = false;
    }
    // showListView(){
    //     this.cashListView.active = true;
    //     this.cashListView.onOpenRecharge(false)
    // }
    showOverseasWin(){
        var havaData = this.model.haveOverseas();
        this.overseasBankWin.subViewState = !havaData;
        this.overseasExtractCashWin.subViewState = havaData;
        //this.cashListView.active = false;
    }
    // showListView(){
    //     this.cashListView.active = true;
    //     this.cashListView.onOpenRecharge(false)
    // }
    closeAllWin(){
        this.aliBandWin.subViewState = false;
        this.aliExtractCashWin.subViewState = false;
        this.unionBandWin.subViewState = false;
        this.unionExtractCashWin.subViewState = false;
        //this.cashListView.active = false;
        this.aliToggle.active = false;
        this.unionToggle.active = false;
        // this.overseasToggle.active = false;
        this.overseasBankWin.subViewState = false;
        this.overseasExtractCashWin.subViewState = false;
    }

    updateInfoNode(){
        if(this.waitingNode){
            this.waitingNode.active = false;
        }
        this.updateCurMoney();
        this.closeAllWin();
        if(!this.model.bankDatas) return;
        this.aliToggle.active = this.model.bankDatas.ali_status > 0;
        this.unionToggle.active = this.model.bankDatas.bank_status > 0;
        // this.overseasToggle.active = this.model.bankDatas.over_sea_bank_status > 0;
        if(this.curWin == -1){
            //重置默认显示
            if(this.model.bankDatas.ali_status == 1){
                this.curWin = 1;
            }else if(this.model.bankDatas.bank_status == 1){
                this.curWin = 0    
            }else if(this.model.bankDatas.over_sea_bank_status == 1){
                this.curWin = 2;    
            }else{
                this.curWin = 3; 
            }
        }

        if(this.curWin == 1 && this.model.bankDatas.ali_status){
            this.showAliWin();
            this.setToggleChecked(this.aliToggle,true)
            this.setToggleChecked(this.unionToggle,false)
            // this.setToggleChecked(this.overseasToggle,false)
            this.setToggleChecked(this.listToggle,false)
        }else if(this.curWin == 0 && this.model.bankDatas.bank_status){
            this.showUnionWin();
            this.setToggleChecked(this.aliToggle,false)
            this.setToggleChecked(this.unionToggle,true)
            // this.setToggleChecked(this.overseasToggle,false)
            this.setToggleChecked(this.listToggle,false)
        }else if(this.curWin == 2 && this.model.bankDatas.over_sea_bank_status){
            this.showOverseasWin();
            this.setToggleChecked(this.aliToggle,false)
            this.setToggleChecked(this.unionToggle,false)
            // this.setToggleChecked(this.overseasToggle,true)
            this.setToggleChecked(this.listToggle,false)
        }else{
            // this.showListView();
            this.setToggleChecked(this.aliToggle,false)
            this.setToggleChecked(this.unionToggle,false)
            // this.setToggleChecked(this.overseasToggle,false)
            this.setToggleChecked(this.listToggle,true)
        }
    }

    //提现界面切换
    changeInfoNode( target : any ){
        var curWin = 1;
        if(target.node == this.aliToggle){
            curWin = 1;
        }else if(target.node == this.unionToggle){
            curWin = 0;
        }
        // else if(target.node == this.overseasToggle){
        //     curWin = 2;
        // }
        else if(target.node == this.listToggle){
            curWin = 3;
        }
        if(curWin == this.curWin){
            return;
        }
        Global.Audio.playBtnSound();
        this.curWin = curWin;
        this.updateInfoNode();
    }

}

