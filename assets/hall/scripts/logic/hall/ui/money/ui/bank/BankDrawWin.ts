import BankSaveDrawBaseWin from "./BankSaveDrawBaseWin";

export default class BankDraw extends BankSaveDrawBaseWin {

    protected getBaseNum(){
        return Global.PlayerData.bank_point / Global.Setting.glodRatio;
    }

    protected confirmBtnFunc(){
        if(this.curInputNum > 0){
            this.model.reqDrawBankPoint( this.curInputNum  * Global.Setting.glodRatio);
        }else{
            this.model.showBankTips("请输入取款金额");
        }
    }

    protected sliderChangeFunc(){
        super.sliderChangeFunc();
        if(Global.PlayerData.bank_point == 0){
            this.model.showBankTips("银行余额为0，无法取款");
        }
    }

    /** 按输入框更新显示 */
    protected textChangeFunc(){
        // if(this.inputEditBox.string == ""){
        //     this.model.showBankTips("请输入取款金额");
        // }
        super.textChangeFunc();
        if(this.curInputNum < 0){
            this.model.showBankTips("请输入取款金额");
            this.inputEditBox.string == "";
        }
    }
}
