import WndBase from "../../../core/ui/WndBase";
import AutoCodeView from "../login/view/AutoCodeView";
import PhoneInputView from "../login/view/PhoneInputView";
import PwdInputView from "../login/view/PwdInputView";
import PersonalInfoModel from "../../../hallcommon/model/PersonalInfoModel";

export default class WndChangePwd extends WndBase{
    private phoneInputView: PhoneInputView;
    private authCodeView: AutoCodeView;
    private pwdInputView: PwdInputView;
    private model: PersonalInfoModel;

    protected onInit() {
        this.name = "WndChangePwd";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/PersonalInfo/ChangePwdUI";
        this.model = <PersonalInfoModel>Global.ModelManager.getModel("PersonalInfoModel");
    }

    protected initView(){
        this.addCommonClick("bg/close", this.closeWnd, this);
        this.addCommonClick("cancelBtn", this.closeWnd, this);
        this.addCommonClick("sureBtn", this.onSureBtnClick, this);

        this.phoneInputView = <PhoneInputView>this.addView("PhoneInputView", this.getChild("phoneContainer"), PhoneInputView);
        this.authCodeView = <AutoCodeView>this.addView("AutoCodeView", this.getChild("authCodeView"), AutoCodeView);
        this.authCodeView.setPhoneInputAndType(this.phoneInputView, 2);
        this.pwdInputView = <PwdInputView>this.addView("PwdInputView", this.getChild("pwdContainer"), PwdInputView);
    }

    protected onOpen(){
        this.phoneInputView.subViewState = true
        this.authCodeView.subViewState = true
        this.pwdInputView.subViewState = true
        
        this.authCodeView.code = "";
        this.pwdInputView.pwd = "";
    }

    private closeWnd(){
        this.close();
    }

    private onSureBtnClick(){
        if(this.phoneInputView.phone == "")
        {
            return Global.UI.fastTip("请输入手机号码");
        }
        if(this.authCodeView.code == "")
        {
            return Global.UI.fastTip("请输入验证码");
        }
        if (this.pwdInputView.pwd == ""){
            return Global.UI.fastTip("请输入密码");
        }
        if(!Global.Toolkit.checkPWFormat(this.pwdInputView.pwd))
        {
            return Global.UI.fastTip(Global.Language.getWord(1303));
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
        pwd = Global.Toolkit.md5(pwd);
        this.model.reqEditPwd(phone, code, area, pwd, ()=>{
            Global.UI.fastTip("密码修改成功");
            this.closeWnd();
        });
    }
}