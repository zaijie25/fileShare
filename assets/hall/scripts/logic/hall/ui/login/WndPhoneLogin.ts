import WndBase from "../../../core/ui/WndBase";
import LoginModel from "../../../hallcommon/model/LoginModel";
import PhoneInputView from "./view/PhoneInputView";
import PwdInputView from "./view/PwdInputView";

export default class WndPhoneLogin extends WndBase
{
    private model:LoginModel;
    private phoneInputView:PhoneInputView;
    private pwdInputView:PwdInputView;
    private clickTagMap = {}

    protected onInit()
    {
        this.name = "WndPhoneLogin";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/PhoneLoginUI";
        this.model = <LoginModel>Global.ModelManager.getModel("LoginModel");
    }

    protected initView()
    {
        this.addCommonClick("bg/close", this.onCloseClick, this);
        this.addCommonClick("loginBtn", this.onLoginBtnClick, this);
        this.addCommonClick("forgetPwd", this.onForgetClick, this, null);

        this.phoneInputView = <PhoneInputView>this.addView("PhoneInputView", this.getChild("phoneContainer"), PhoneInputView);
        this.pwdInputView = <PwdInputView>this.addView("PwdInputView", this.getChild("pwdContainer"), PwdInputView);

        if(this.model.localPhone)
            this.phoneInputView.phone = this.model.localPhone;
        if(this.model.localAreaCode)
            this.phoneInputView.area = this.model.localAreaCode;
        this.clickTagMap["click"] = true
    }


    private onForgetClick()
    {
        Global.UI.show("WndForgetPwd");
    }

    private onCloseClick()
    {
        this.close();
    }

    onOpen()
    {
        this.phoneInputView.subViewState = true
        this.pwdInputView.subViewState = true
    }
   

    private onLoginBtnClick()
    {
        if (!this.clickTagMap["click"]) {
            return
        }
        this.clickTagMap["click"] = false
        this.clickTagMap["clickTimer"] = setTimeout(() => {
            this.clickTagMap["click"] = true
        }, 1000);
        if(this.phoneInputView.phone == "")
        {
            Global.UI.fastTip("请输入手机号");
            return;
        }
        if(this.pwdInputView.pwd == "")
        {
            Global.UI.fastTip("请输入密码");
            return;
        }

        if(!this.phoneInputView.isAreaVaild())
        {
            Global.UI.fastTip("请选择正确的地区信息");
            return;
        }
        //检查code
        let pwd = Global.Toolkit.md5(this.pwdInputView.pwd);
        let acode = this.phoneInputView.area;
        let phone = this.phoneInputView.phone
        this.model.reqPhoneLogin(phone, pwd, acode);
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
        if(this.clickTagMap["clickTimer"])
        {
            clearTimeout(this.clickTagMap["clickTimer"])
        }
      
        this.clickTagMap["click"] = true
    }
}