import WndBase from "../../../../../core/ui/WndBase";
import BankModel from "../../../../../hallcommon/model/BankModel";
import GlobalEvent from "../../../../../core/GlobalEvent";

export default class WndBankChangePW extends WndBase {

    //private _pwCheckRx : RegExp = /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z]{2,})(?=.*[a-z]{2,})(?=.*[!@#$%^&*?\(\)]).*$/;
    //private _pwCheckRx : RegExp = /^.*(?=.{6,16})(?=.*\d)(?=.*[a-zA-Z]).*$/;
    private _pwCheckString : string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    private model : BankModel;

    private pwEditBox0 : cc.EditBox;
    private pwEditBox1 : cc.EditBox;
    private pwEditBox2 : cc.EditBox;

    protected onInit()
    {
        this.name = "WndBankChangePW";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/money/bank/BankChangePWUI";
        this.model = <BankModel>Global.ModelManager.getModel("BankModel");
    }

    protected initView()
    {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;

        this.addCommonClick("close",this.close,this);
        this.addCommonClick("confirmBtn",this.confirmBtnFunc,this);
        this.addCommonClick("canelBtn",this.close,this);

        this.pwEditBox0 = this.getComponent("PasswordBox0/editBox",cc.EditBox);
        this.pwEditBox1 = this.getComponent("PasswordBox1/editBox",cc.EditBox);
        this.pwEditBox2 = this.getComponent("PasswordBox2/editBox",cc.EditBox);
    }

    protected onOpen(args)
    {
        this.pwEditBox0.string = "";
        this.pwEditBox1.string = "";
        this.pwEditBox2.string = "";
        // Global.Event.on(GlobalEvent.BANK_CHANGE_PWD_SUCCEED, this, this.bank_change_pwd_succeed);
    }
    
    protected onClose()
    {
        // Global.Event.off(GlobalEvent.BANK_CHANGE_PWD_SUCCEED, this, this.bank_change_pwd_succeed);
    }

    private checkTextEmptyAndShowTips(text:string, tipsLabel:string)
    {
        if(text.length <= 0)
        {
            this.model.showBankTips(tipsLabel);
            return false;
        }
        return true;
    }

    private checkPWFormat(text:string, tipsLabel:string){
        let bValid : boolean = Global.Toolkit.checkPWFormat(text);
        if(!bValid){
            this.model.showBankTips(tipsLabel);
        }
        return bValid;
    }

    /** 密码修改成功回调事件*/
    // bank_change_pwd_succeed() 
    // {
    //     this.close();
    // }

    /** 确认按钮 */
    confirmBtnFunc(){
        if(!this.checkTextEmptyAndShowTips(this.pwEditBox0.string, "请输入密码"))
            return;
        if(!this.checkPWFormat(this.pwEditBox1.string, "请按要求输入6~16位数字和字母密码"))
            return;
        // if(!this.checkPWFormat(this.pwEditBox2.string, "请按要求输入6~16位数字和字母密码"))
        //     return;
        if(this.pwEditBox1.string != this.pwEditBox2.string){
            this.model.showBankTips("新密码输入不一致，请重新输入");
            return;
        }
        this.model.reqSetBankPwd(this.pwEditBox0.string , this.pwEditBox1.string);
    }

    
}



