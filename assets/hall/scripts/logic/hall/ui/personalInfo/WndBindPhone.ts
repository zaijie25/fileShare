import WndBase from "../../../core/ui/WndBase";
import AutoCodeView from "../login/view/AutoCodeView";
import PhoneInputView from "../login/view/PhoneInputView";
import PwdInputView from "../login/view/PwdInputView";
import PersonalInfoModel from "../../../hallcommon/model/PersonalInfoModel";
import HallPopMsgHelper, { PopWndName, BindAwardUIType } from "../../tool/HallPopMsgHelper";

export default class WndBindPhone extends WndBase{
    private phoneInputView: PhoneInputView;
    private authCodeView: AutoCodeView;
    private pwdInputView: PwdInputView;
    private model: PersonalInfoModel;


    protected onInit() {
        this.name = "WndBindPhone";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/PersonalInfo/BindPhoneUI";
        this.model = <PersonalInfoModel>Global.ModelManager.getModel("PersonalInfoModel");
    }

    protected initView(){
        this.addCommonClick("bg/close", this.closeWnd, this);
        this.addCommonClick("cancelBtn", this.closeWnd, this);
        this.addCommonClick("sureBtn", this.onSureBtnClick, this);

        this.phoneInputView = <PhoneInputView>this.addView("PhoneInputView", this.getChild("phoneContainer"), PhoneInputView);
        this.authCodeView = <AutoCodeView>this.addView("AutoCodeView", this.getChild("authCodeView"), AutoCodeView);
        this.authCodeView.setPhoneInputAndType(this.phoneInputView, 1);
        this.pwdInputView = <PwdInputView>this.addView("PwdInputView1", this.getChild("pwdContainer"), PwdInputView);
    }

    private closeWnd(){
        this.close();
    }

    protected onOpen(args){

        this.phoneInputView.subViewState = true
        this.authCodeView.subViewState = true
        this.pwdInputView.subViewState = true
        this.phoneInputView.phone = "";
        this.authCodeView.code = "";
        this.pwdInputView.pwd = "";
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
        if(this.pwdInputView.pwd == "")
        {
            return Global.UI.fastTip("请输入密码");
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
            return Global.UI.fastTip(Global.Language.getWord(1303));
        }

        pwd = Global.Toolkit.md5(pwd);
        this.model.reqBindPhone(phone, code, area, pwd, (msg:any)=>{
            // let bind_point = msg.bind_point ? Global.Toolkit.formatPoint(msg.bind_point) : 0//绑定送礼金额
            // let phone_point = msg.phone_point ? Global.Toolkit.formatPoint(msg.phone_point) : 0//绑定送礼金额
            let bind_point = msg.bind_point ? msg.bind_point : 0//绑定送礼金额
            let phone_point = msg.phone_point ? msg.phone_point : 0//绑定送礼金额

            let phone 
            if(!msg.phone)
            {
                phone = ""
            }
            if(msg.phone.indexOf(" ") == -1)
            {
                phone = Global.AESUtil.decodeMsg(msg.phone)  
            }
            else
            {
                phone = msg.phone;
            }
            Global.PlayerData.phone = phone? phone : "";
            if(bind_point > 0 || phone_point > 0){  //有绑定送金或者自动送金
                if(bind_point > 0){
                    HallPopMsgHelper.Instance.addMsgList(PopWndName.BindGiftGet, ()=>{
                        HallPopMsgHelper.Instance.addLock(PopWndName.BindGiftGet);
                        Global.UI.show("WndRebateGet",bind_point,phone_point > 0 ? BindAwardUIType.bindPoint : BindAwardUIType.onlyBindPoint);
                    })
                }
                if(phone_point > 0){
                    HallPopMsgHelper.Instance.addMsgList(PopWndName.PhoneGiftGet, ()=>{
                        HallPopMsgHelper.Instance.addLock(PopWndName.PhoneGiftGet);
                        Global.UI.show("WndRebateGet",phone_point,bind_point > 0 ? BindAwardUIType.phonePoint : BindAwardUIType.onlyPhonePoint);
                    })
                }
            }
            if(bind_point == 0 && phone_point == 0){  //都没有送金的时候也要弹出绑定成功
                if(phone){
                    Global.UI.fastTip("绑定手机成功");
                }
            }
            this.closeWnd();
            
        });
    }

    protected onClose(){
        HallPopMsgHelper.Instance.releaseLock(PopWndName.BindPhone);
    }
}