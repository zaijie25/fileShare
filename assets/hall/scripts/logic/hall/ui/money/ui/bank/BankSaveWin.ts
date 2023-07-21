import BankSaveDrawBaseWin from "./BankSaveDrawBaseWin";

export default class BankSave extends BankSaveDrawBaseWin {

    protected getBaseNum(){
        return Global.PlayerData.point / Global.Setting.glodRatio;
    }
    
    protected confirmBtnFunc(){
        if(this.curInputNum > 0){
            this.model.reqSaveBankPoint( this.curInputNum * Global.Setting.glodRatio );
        }else{
            this.model.showBankTips("请输入存款金额");
        }
    }

    protected sliderChangeFunc(){
        super.sliderChangeFunc();
        var fBaseNum = Global.Toolkit.formatPointStr(Global.PlayerData.point, true);// 捕鱼中可能出现小数点后3位，在这里统一格式加判断不然会出现0.0064这样的，钱包显示为0.00但是实际还是有钱的
        if(Global.PlayerData.point == 0 || fBaseNum == '0.00'){
            this.model.showBankTips("钱包余额为0，无法存款");
        }
    }

    /** 按输入框更新显示 */
    protected textChangeFunc(){
        // if(this.inputEditBox.string == ""){
        //     this.model.showBankTips("请输入存款金额");
        // }
        super.textChangeFunc();
        if(this.curInputNum < 0){
            this.model.showBankTips("请输入存款金额");
            this.inputEditBox.string == "";
        }
    }

}
