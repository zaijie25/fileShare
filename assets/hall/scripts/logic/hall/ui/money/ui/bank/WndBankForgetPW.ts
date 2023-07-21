import WndBase from "../../../../../core/ui/WndBase";
import BankModel from "../../../../../hallcommon/model/BankModel";
import PhoneInputView from "../../../login/view/PhoneInputView";
import AutoCodeView from "../../../login/view/AutoCodeView";

export default class WndBankForgetPW extends WndBase {

    //private _pwCheckRx : RegExp = /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z]{2,})(?=.*[a-z]{2,})(?=.*[!@#$%^&*?\(\)]).*$/;
    // private _pwCheckRx : RegExp = /^.*(?=.{6,16})(?=.*\d)(?=.*[a-zA-Z]).*$/;
    private _pwCheckString : string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    private model : BankModel;

    private phoneInputView : PhoneInputView;
    private phoneLabel : cc.RichText;

    private authCodeView : AutoCodeView;
    private pwEditBox1 : cc.EditBox;
    //private pwEditBox2 : cc.EditBox;

    protected onInit()
    {
        this.name = "WndBankForgetPW";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/money/bank/BankForgetPWUI";
        this.model = <BankModel>Global.ModelManager.getModel("BankModel");
    }

    protected initView()
    {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;

        this.addCommonClick("close",this.close,this);
        this.addCommonClick("confirmBtn",this.confirmBtnFunc,this);

        this.phoneInputView = <PhoneInputView>this.addView("PhoneInputView", this.getChild("phoneContainer"), PhoneInputView);
        this.phoneLabel = this.getComponent("phoneNumLabel",cc.RichText);

        this.authCodeView = <AutoCodeView>this.addView("AutoCodeView", this.getChild("authCodeView"), AutoCodeView);
        this.authCodeView.setPhoneInputAndType(this.phoneInputView, 2);
        this.pwEditBox1 = this.getComponent("PasswordBox1/editBox",cc.EditBox);
        //this.pwEditBox2 = this.getComponent("PasswordBox2/editBox",cc.EditBox);
    }

    protected onOpen(args)
    {
        this.phoneInputView.subViewState = true
        this.authCodeView.subViewState = true
        var havePhone = (Global.PlayerData.phone != null && Global.PlayerData.phone != "");
        if(havePhone){ //已绑定电话
            this.phoneLabel.node.active = true;
            let phone = Global.Toolkit.formateStrWithAsterisk(Global.PlayerData.phone, Global.PlayerData.phone.length-5, 1);
            this.phoneLabel.string = "<b>" + phone+ "</b>";
            this.phoneInputView.node.active = false;
            var data = Global.PlayerData.phone.split(' ');
            this.phoneInputView.area = data[0].replace("+","");
            this.phoneInputView.phone = data[1];
        }else{ //未绑定电话
            this.phoneLabel.node.active = false;
            this.phoneLabel.string = "";

            this.phoneInputView.node.active = true;
            this.phoneInputView.area = "86";
            this.phoneInputView.phone = "";
        }
        this.authCodeView.code = "";
        this.pwEditBox1.string = "";
        //this.pwEditBox2.string = "";
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

    /** 确认按钮 */
    confirmBtnFunc(){
        if(!this.checkTextEmptyAndShowTips(this.phoneInputView.phone, "手机号不能为空"))
            return;
        if(!this.checkTextEmptyAndShowTips(this.authCodeView.code, "验证码不能为空"))
            return;
        if(!this.checkPWFormat(this.pwEditBox1.string, "请按要求输入6~16位数字和字母密码"))
            return;
        
        if(!this.phoneInputView.isAreaVaild())
        {
            Global.UI.fastTip("请选择正确的地区信息");
            return;
        }
        // if(!this.checkPWFormat(this.pwEditBox2.string, "请按要求输入6~16位数字和字母密码"))
        //     return;
        // if(this.pwEditBox1.string != this.pwEditBox2.string){
        //     this.model.showBankTips(""新密码输入不一致，请重新输入"");
        //     return;
        // }
        this.model.reqForgetBankPwd(this.phoneInputView.phone,this.authCodeView.code,this.pwEditBox1.string,this.phoneInputView.area);
    }

    
}







