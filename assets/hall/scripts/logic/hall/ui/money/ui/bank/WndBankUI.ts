import WndBase from "../../../../../core/ui/WndBase";
import BankModel from "../../../../../hallcommon/model/BankModel";
import BankSave from "./BankSaveWin";
import BankDraw from "./BankDrawWin";

export default class WndBankUI extends WndBase {

    private model : BankModel;

    private saveToggle : cc.Toggle;
    private drawToggle : cc.Toggle;

    private curWin = 1; //1存 2取

    private saveWin : BankSave;
    private drawWin : BankDraw;

    private msgtip:cc.Label;
    private bindPhoneBtn:cc.Node;

    protected onInit() {
        this.isNeedDelay = true
        this.name = "WndBankUI";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/money/bank/BankUI";
        this.model = <BankModel>Global.ModelManager.getModel("BankModel");
    }

    protected initView()
    {
        // this.node.width = cc.Canvas.instance.node.width;
        // this.node.height = cc.Canvas.instance.node.height;
        this.addCommonClick("bg_popup_almost/close",this.close,this);
        //leftBtn
        this.saveToggle = this.getComponent("leftBtns/layout/saveBtn",cc.Toggle);
        this.drawToggle = this.getComponent("leftBtns/layout/drawBtn",cc.Toggle);
        this.saveToggle.node.on("click",this.changeInfoNode,this);
        this.drawToggle.node.on("click",this.changeInfoNode,this);
        //winNodes
        this.saveWin = <BankSave>this.addView("saveWin",this.getChild("winsNode/saveWin"),BankSave,false);
        this.drawWin = <BankDraw>this.addView("drawWin",this.getChild("winsNode/drawWin"),BankDraw),false;
        // 提示栏
        this.bindPhoneBtn = this.getChild("winsNode/msgInfo/bandNode/bandBtn");
        this.msgtip = this.getChild("winsNode/msgInfo/bandNode/msgLabel").getComponent(cc.Label);

        this.addCommonClick("winsNode/msgInfo/bandNode/bandBtn",this.openBindPhoneBtn,this);
    }

    
    // public open(args?)
    // {
    //     this.onOpen(args)
    // }

     //面板打开回调
     protected onOpen(args?:any[])
     {
        var havePhone = (Global.PlayerData.phone != null && Global.PlayerData.phone != "");
        if(havePhone){ //已绑定电话
            this.bindPhoneBtn.active = false;
            this.msgtip.string = "温馨提示：银行存取款不收取任何手续费哦~"
        }else{ //未绑定电话
            this.bindPhoneBtn.active = true;
            this.msgtip.string = "温馨提示：为了您的资金安全，请您绑定手机号码！"
        }
        this.updateInfoNode();
     }

     public afterOpen()
     {
        // this.animComp.doFullScreenOpenAnim(this.getChild("topBar"), 
        // this.getChild("leftBtns"), 
        // [this.getChild("winsNode"), this.getChild("zhuangshi")]);
     }

    closeAllWin(){
        this.saveWin.subViewState = false;
        this.drawWin.subViewState = false;
    }

    updateInfoNode(){
        this.closeAllWin();
        if(this.curWin == 1){
            this.saveWin.subViewState = true;
            this.saveToggle.isChecked = true;
        }else if(this.curWin == 2){
            this.drawWin.subViewState = true;
            this.drawToggle.isChecked = true;
        }
    }

    //提现界面切换
    changeInfoNode( target : any ){
        var curWin = 1;
        if(target == this.drawToggle){
            curWin = 2;
        }else if(target == this.saveToggle){
            curWin = 1;
        }
        if(curWin == this.curWin){
            return;
        }
        Global.Audio.playBtnSound();
        this.curWin = curWin;
        this.updateInfoNode();
    }

    openBindPhoneBtn() {
        Global.UI.show("WndBindPhone");
    }

}
