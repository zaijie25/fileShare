import WndBase from "../../../core/ui/WndBase";
import LoginModel from "../../../hallcommon/model/LoginModel";
import PhoneInputView from "./view/PhoneInputView";
import AutoCodeView from "./view/AutoCodeView";
import PwdInputView from "./view/PwdInputView";

export default class WndRegist extends WndBase
{
    private inviteInput:cc.EditBox;
    private clickTagMap = {}

    private phoneInputView:PhoneInputView;
    private authCodeView:AutoCodeView;
    private pwdInputView:PwdInputView;

    private loginModel:LoginModel;
    protected onInit()
    {
        this.name = "WndRegist";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/RegistUI";
        this.loginModel = <LoginModel>Global.ModelManager.getModel("LoginModel");
    }

    protected initView()
    {
        this.addCommonClick("bg/close", this.close, this);
        this.addCommonClick("sureBtn", this.onSureBtnClick, this);
        this.addCommonClick("cancelBtn",this.close,this);

        this.phoneInputView = <PhoneInputView>this.addView("PhoneInputView", this.getChild("phoneContainer"), PhoneInputView);
        this.authCodeView = <AutoCodeView>this.addView("AutoCodeView", this.getChild("authCodeView"), AutoCodeView);
        this.authCodeView.setPhoneInputAndType(this.phoneInputView, 1);
        this.pwdInputView = <PwdInputView>this.addView("PwdInputView", this.getChild("pwdContainer"), PwdInputView);

        this.inviteInput = this.getComponent("invite", cc.EditBox);

        this.inviteInput.placeholderFontColor = new cc.Color().fromHEX("#cfe3fc");
        this.inviteInput.fontColor = new cc.Color().fromHEX("#eafdff");
        this.clickTagMap["RegTag"] = true
    }


    onOpen()
    {
        this.phoneInputView.subViewState = true
        this.authCodeView.subViewState = true
        this.pwdInputView.subViewState = true
    }

    private onSureBtnClick()
    {
       
        if (!this.clickTagMap["RegTag"]) {
            return
        }
        this.clickTagMap["RegTag"] = false
        this.clickTagMap["RegTimer"] = setTimeout(() => {
            this.clickTagMap["RegTag"] = true
        }, 1000);

        if(this.phoneInputView.phone == "")
        {
            Global.UI.fastTip("请输入手机号码");
            return;
        }
        if(this.pwdInputView.pwd == "")
        {
            Global.UI.fastTip("请输入密码");
            return;
        }
        if(this.authCodeView.code == "")
        {
            Global.UI.fastTip("请输入验证码");
            return;
        }

        if(!this.phoneInputView.isAreaVaild())
        {
            Global.UI.fastTip("请选择正确的地区信息");
            return;
        }

        let phone = this.phoneInputView.phone;
        let code = this.authCodeView.code;
        let area = this.phoneInputView.area;
        let pwd = this.pwdInputView.pwd;
        let invitecode = this.inviteInput.string;

        if(!Global.Toolkit.checkPWFormat(pwd))
        {
            Global.UI.fastTip("请输入6-16位字母或数字密码");
            return;
        }

        pwd = Global.Toolkit.md5(pwd);
        this.loginModel.reqRegist(phone, pwd, area, code, invitecode);
    }

    onDispose()
    {
        super.onDispose()
        this.resetTag()
        
    }

    onClose()
    {
        this.resetTag()
    }

    resetTag()
    {
        if(this.clickTagMap["RegTimer"])
        {
            clearTimeout(this.clickTagMap["RegTimer"])
        }
      
        this.clickTagMap["RegTag"] = true
    }
}