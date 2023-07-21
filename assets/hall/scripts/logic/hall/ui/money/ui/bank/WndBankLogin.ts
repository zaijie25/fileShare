import WndBase from "../../../../../core/ui/WndBase";
import BankModel from "../../../../../hallcommon/model/BankModel";

export default class WndBankLogin extends WndBase {

    private model : BankModel;

    private pwEditBox : cc.EditBox;

    protected onInit()
    {
        this.name = "WndBankLogin";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/money/bank/BankLoginBankUI";
        this.model = <BankModel>Global.ModelManager.getModel("BankModel");
    }

    protected initView()
    {
        // this.node.width = cc.Canvas.instance.node.width;
        // this.node.height = cc.Canvas.instance.node.height;

        this.addCommonClick("close",this.close,this);

        this.addCommonClick("confirmBtn",this.confirmBtnFunc,this);
        this.addCommonClick("changePWBtn",this.changePWBtnFunc,this,null);
        this.addCommonClick("forgetPWBtn",this.forgetPWBtnFunc,this,null);

        this.pwEditBox = this.getComponent("PasswordBox/editBox",cc.EditBox);
    }

    protected onOpen(args)
    {
        //this.pwEditBox.string = this.model.getDefaultPassword();
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

    /** 确认按钮 */
    confirmBtnFunc(){
        if(!this.checkTextEmptyAndShowTips(this.pwEditBox.string, "密码不能为空"))
            return;
        this.model.reqLoginBank(this.pwEditBox.string);
    }

    /** 修改密码按钮 */
    changePWBtnFunc(){
        // 1游客 没有绑定手机 2 绑定手机了 3微信 4第三方账号
        var havePhone = (Global.PlayerData.phone != null && Global.PlayerData.phone != "");
        if(!havePhone){
            this.model.showBankTips("请您先绑定手机号码再修改银行密码！");
            return;
        }
        Global.UI.show("WndBankChangePW");
    }

    /** 忘记密码按钮 */
    forgetPWBtnFunc(){
        var havePhone = (Global.PlayerData.phone != null && Global.PlayerData.phone != "");
        if(!havePhone){
            this.model.showBankTips("请您先绑定手机号码再找回银行密码");
            return;
        }
        Global.UI.show("WndBankForgetPW");
    }
}
