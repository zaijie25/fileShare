
import ViewBase from "../../../../../core/ui/ViewBase";
import BankModel from "../../../../../hallcommon/model/BankModel";
import GlobalEvent from "../../../../../core/GlobalEvent";
import WndBankUI from "./WndBankUI";


export default class BankSaveDrawBaseWin extends ViewBase {

    protected model : BankModel;

    protected myMoney : cc.Label;
    protected bankMoney : cc.Label;

    protected inputEditBox : cc.EditBox = null;
    protected sliderPlus : SliderPlus = null;

    // protected msgInfoBox :MsgInfoBox

    protected curInputNum = 0;

    protected initView()
    {
        this.model = Global.ModelManager.getModel("BankModel");

        // this.msgInfoBox = new MsgInfoBox()
        // this.msgInfoBox.setNode(this.getChild("msgInfo"))
        //this.addView("msgInfo",this.getChild("msgInfo"),MsgInfoBox);

        this.myMoney = this.getComponent("balanceLabel",cc.Label);
        this.bankMoney = this.getComponent("bankLabel",cc.Label);

        this.inputEditBox = this.getComponent("inputEditBox",cc.EditBox);
        this.inputEditBox.node.on('editing-did-ended',this.textChangeFunc,this);
        
        this.sliderPlus = new SliderPlus()
        this.sliderPlus.setNode(this.getChild("SliderPlus"))
        this.sliderPlus.addOn(this.sliderChangeFunc,this);

        this.addCommonClick("resetBtn",this.resetBtnFunc,this);
        this.addCommonClick("confirmBtn",this.confirmBtnFunc,this);
    }

    protected onSubViewShow(){
        Global.Event.on(GlobalEvent.PERSONALINFOUPDATE,this,this.updateMoneyView);
        // this.msgInfoBox.onSubViewShow()
        this.sliderPlus.active = true
        this.sliderPlus.pro = 0;
        this.updateMoneyView();
        this.inputEditBox.string = "";
    }

    protected onSubViewHide()
    {
        // this.msgInfoBox.onSubViewHide()
        this.sliderPlus.active = false
        Global.Event.off(GlobalEvent.PERSONALINFOUPDATE,this,this.updateMoneyView);
    }

    protected getBaseNum(){
        return 1;
    }

    protected updateMoneyView(){
        this.myMoney.string = Global.Toolkit.formatPointStr(Global.PlayerData.point, true);
        this.bankMoney.string = Global.Toolkit.formatPointStr(Global.PlayerData.bank_point, true);
        this.updateView(this.sliderPlus.pro);
        let wndBank = <WndBankUI>Global.UI.getWindow("WndBankUI")
        if(wndBank)
        {
            wndBank.OnDataPrepared()
        }
    }

    /** 按滑动条更新显示 */
    protected updateView( pro : number ){
        var baseNum = this.getBaseNum(); //这里是元
        var fBaseNum = Global.Toolkit.formatPointStr(baseNum * Global.Setting.glodRatio, true);// 捕鱼中可能出现小数点后3位，在这里统一格式加判断不然会出现0.0064这样的，钱包显示为0.00但是实际还是有钱的

        if(baseNum == 0 || fBaseNum == "0.00"){
            this.inputEditBox.string = "0";
            this.sliderPlus.pro = 0;
            return;
        }
        pro = Math.ceil(pro * 100) / 100;       //百分号向上取整
        let num = Math.floor(baseNum * pro * 100) / 100;  //求出对应元数保留两位小数
        // if(pro == 1) //因浮点数特性特殊处理，否则有误差
        // {
        //     num = baseNum
        // }
        
        this.curInputNum = num;
        this.inputEditBox.string = num + "";
        this.sliderPlus.pro = pro;
    }

    /** 按输入框更新显示 */
    protected textChangeFunc(){
        var baseNum = this.getBaseNum();
        if(baseNum == 0){
            this.updateView(0);
            return;
        }
        var num = parseFloat(this.inputEditBox.string == "" ? "0" : this.inputEditBox.string); //获取元数
        if(num >= 0){
        }else{
            //可能生成NaN，这里做修正
            num = 0;
        }
        if(num > baseNum){
            this.model.showBankTips("输入超出范围");
        }
        num = Math.min(num,baseNum);
        num = Number(Global.Toolkit.formatPointStr(num*Global.Setting.glodRatio, true));
        this.curInputNum = num;
        var pro = Math.ceil(num / baseNum * 100) / 100; //百分号向上取整
        this.sliderPlus.pro = Math.min(1,pro);
        this.inputEditBox.string = num + "";
    }


    protected sliderChangeFunc(){
        this.updateView( this.sliderPlus.pro );
    }

    protected resetBtnFunc(){
        Logger.error("重置",0)
        this.updateView( 0 );
    }

    protected confirmBtnFunc(){

    }

}

/** 银行信息盒子 */
class MsgInfoBox extends ViewBase{

    private bandNode : cc.Node = null;

    private msgNode : cc.Node = null;

    protected initView()
    {
        this.bandNode = this.getChild("bandNode");
        this.msgNode = this.getChild("msgNode");
        
        this.addCommonClick("bandNode/bandBtn",this.bandBtnFunc,this);
    }

    onSubViewShow(){
        // cc.log("--------------------MsgInfoBox————onOpen");
        Global.Event.on(GlobalEvent.PERSONALINFOUPDATE,this,this.updateView);
        this.updateView();
    }

    onSubViewHide(){
        // cc.log("--------------------MsgInfoBox————onClose");
        Global.Event.off(GlobalEvent.PERSONALINFOUPDATE,this,this.updateView);
    }

    protected updateView(){
        var havePhone = (Global.PlayerData.phone != null && Global.PlayerData.phone != "");
        this.bandNode.active = !havePhone;
        this.msgNode.active = havePhone;
    }

    bandBtnFunc(){
        //打开手机绑定
        Global.UI.show("WndBindPhone");
    }
}

/** 拓展slider */
class SliderPlus extends ViewBase{

    private progressBar : cc.ProgressBar = null;

    private sliderBar : cc.Slider = null;

    private valueLabel : cc.Label = null;
    private handleNode: cc.Node;

    protected initView()
    {
        this.progressBar = this.node.getComponent(cc.ProgressBar);
        this.sliderBar = this.getComponent("slider",cc.Slider);
        this.valueLabel = this.getComponent("slider/Handle/valueBox/valueLabel",cc.Label);

        this.sliderBar.node.on('slide',this.updateView,this);
        this.sliderBar.node.on(cc.Node.EventType.TOUCH_START, this.touchDown, this);
        this.sliderBar.handle.node.on(cc.Node.EventType.TOUCH_END, this.touchDown, this);
        this.handleNode = this.getChild("slider/Handle");
    }

    touchDown(){
        Global.Audio.playBtnSound();
    }

    updateView(){
        var pro = this.sliderBar.progress;
        this.progressBar.progress = pro;
        this.valueLabel.string = pro * 100 + "%";
    }

    public set pro( pro : number ){
        this.sliderBar.progress = pro;
        this.progressBar.progress = pro;
        if (pro == 0)           //debug 打开页面弹窗动画时，handle位置计算错误，修改ui组件麻烦，暂时暴力重设
            this.forceLocate();
        this.valueLabel.string = Math.floor(pro * 100) + "%";
    }

    public get pro(){
        return this.sliderBar.progress;
    }

    public addOn(func , target){
        this.sliderBar.node.on('slide',func,target);
    }
    public forceLocate(){
        this.handleNode.setPosition(cc.v2(-312.5, 0));
    }
}