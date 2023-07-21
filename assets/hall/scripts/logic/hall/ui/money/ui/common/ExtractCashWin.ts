

import ViewBase from "../../../../../core/ui/ViewBase";
import GlobalEvent from "../../../../../core/GlobalEvent";
import ExtractModel from "../../../../../hallcommon/model/ExtractModel";
import { ExtractEvent } from "../extractCash/ExtractEvent";


export default class ExtractCashWin extends ViewBase {

    protected model : ExtractModel;

    protected info : string;

    protected msgLabel: cc.Label = null;

    protected curMoneyNumLabel: cc.Label = null;

    protected ecNumEditBox: cc.EditBox = null;

    protected rateLabel:cc.Label = null

    protected initView()
    {
        this.model = <ExtractModel>Global.ModelManager.getModel("ExtractModel");

        this.msgLabel = this.getComponent("aliMsg/msgLabel",cc.Label);
        this.curMoneyNumLabel = this.getComponent("CurMoneyBox/curMoneyNumLabel",cc.Label);
        this.ecNumEditBox = this.getComponent("ecEditBox",cc.EditBox);
        this.rateLabel = this.getComponent("rateLabel",cc.RichText);
        
        // this.addCommonClick("confirmBtn",this.confirmBtn,this);
        // this.addCommonClick("resetBtn",this.resetBtnFunc,this);
    }

    protected chipItemToggleFunc( data ){
        var num = this.ecNumEditBox.string != "" ? parseFloat(this.ecNumEditBox.string) : 0; //获取元数
        num = Math.max(num,0);
        num = Math.round(num * 100) / 100;  //保留两位小数
        num += data;
        this.ecNumEditBox.string = num + "";
    }


    public onSubViewShow(){
        //Listener
        this.model.on(ExtractEvent.ChipItemToggle,this,this.chipItemToggleFunc);
        Global.Event.on(GlobalEvent.PERSONALINFOUPDATE,this,this.updateCurMoney);

        this.updateCurMoney();
        this.updateChipList();
        this.resetBtnFunc();
    }

    public onSubViewHide(){
        //Listener
        this.model.off(ExtractEvent.ChipItemToggle,this,this.chipItemToggleFunc);
        Global.Event.off(GlobalEvent.PERSONALINFOUPDATE,this,this.updateCurMoney);
        //this.clearItem();
    }

    /** 更新当前可提现金额 */
    protected updateCurMoney(){
        if(!this.model.bankDatas){
            return;
        }
    }

    /** 重置提现金额 */
    protected resetBtnFunc(){
        this.ecNumEditBox.string = "";
    }

    /** 确认提现 */
    protected confirmBtn(){

    }

    /** 筹码列表更新 */
    protected updateChipList(){

    }

    
}
