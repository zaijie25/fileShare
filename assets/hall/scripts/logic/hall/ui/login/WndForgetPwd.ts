import WndBase from "../../../core/ui/WndBase";
import LoginModel from "../../../hallcommon/model/LoginModel";
import PhoneInputView from "./view/PhoneInputView";
import AutoCodeView from "./view/AutoCodeView";
import PwdInputView from "./view/PwdInputView";

export default class WndForgetPwd extends WndBase
{

    private phoneInputView:PhoneInputView;
    private authCodeView:AutoCodeView;
    private pwdInputView:PwdInputView;

    private loginModel:LoginModel;
    protected onInit()
    {
        this.name = "WndForgetPwd";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/ForgetPwdUI";
        this.loginModel = <LoginModel>Global.ModelManager.getModel("LoginModel");
    }

    protected initView()
    {
        this.addCommonClick("cancelBtn", this.close, this);
        this.addCommonClick("bg/close", this.close, this);
        this.addCommonClick("sureBtn", this.onSureBtnClick, this);

        this.phoneInputView = <PhoneInputView>this.addView("PhoneInputView", this.getChild("phoneContainer"), PhoneInputView);
        this.authCodeView = <AutoCodeView>this.addView("AutoCodeView", this.getChild("authCodeView"), AutoCodeView);
        this.authCodeView.setPhoneInputAndType(this.phoneInputView, 2);
        this.pwdInputView = <PwdInputView>this.addView("PwdInputView", this.getChild("pwdContainer"), PwdInputView);

    }

    onOpen()
    {
        this.phoneInputView.subViewState = true
        this.authCodeView.subViewState = true
        this.pwdInputView.subViewState = true
    }


    private onSureBtnClick()
    {
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
        
        if(!Global.Toolkit.checkPWFormat(this.pwdInputView.pwd))
        {
            Global.UI.fastTip(Global.Language.getWord(1303));
            return ;
        }
        pwd = Global.Toolkit.md5(pwd);
        this.loginModel.reqChangePwd(phone, pwd, code, area);
    }
}