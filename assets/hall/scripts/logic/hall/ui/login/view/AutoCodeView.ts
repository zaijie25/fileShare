import ViewBase from "../../../../core/ui/ViewBase";
import PhoneInputView from "./PhoneInputView";
import YXButton from "../../../../core/component/YXButton";

export default class AutoCodeView extends ViewBase
{
    private codeInput:cc.EditBox;
    private sendCodeBtn:YXButton;
    //倒计时节点
    private timeBtn:cc.Node;
    private timeLabel:cc.RichText;
    private nextSendTime = 0;
    private phoneInputView:PhoneInputView;
    private type = 1;
    protected initView()
    {
        this.addCommonClick("codeBtn", this.onCodeBtnClick, this);
        this.sendCodeBtn = this.getComponent("codeBtn", YXButton);
        this.codeInput = this.getComponent("code", cc.EditBox);
        this.timeBtn = this.getChild("timeBtn");
        this.timeLabel = this.getComponent("timeBtn/label", cc.RichText);
        this.timeBtn.active = false;
    }

    public setPhoneInputAndType(phoneInput:PhoneInputView, type:number)
    {
        this.phoneInputView = phoneInput;
        this.type = type;
    }

    public set code( value : string )
    {
        this.codeInput.string = value;
    }
    public get code()
    {
        return this.codeInput.string;
    }

    private onCodeBtnClick()
    {
        if(this.phoneInputView.phone == "")
        {
            Global.UI.fastTip("请输入手机号码");
            return;
        }

        if(!this.phoneInputView.isAreaVaild())
        {
            Global.UI.fastTip("请选择正确的地区信息");
            return;
        }

        let area = this.phoneInputView.area;
        Global.ModelManager.getModel("LoginModel").reqGetPhoneVerifyCode(this.phoneInputView.phone, this.type, area, (msg)=>
        {
            Global.UI.fastTip("验证码发送成功");
            //开始倒计时
            this.nextSendTime = Date.now() + Global.Setting.phoneVerifyCodeInterval * 1000;
            this.updateSendCodeTime();
            if(msg && msg.code)
            {
                Global.UI.showSingleBox(msg.code);
            }
        })
    }

    protected onSubViewShow()
    {
        this.updateSendCodeTime();
    }

    protected onSubViewHide()
    {
        this.sendCodeBtn.unscheduleAllCallbacks();
    }

    protected onDispose()
    {
        this.nextSendTime = 0;
    }

    public updateSendCodeTime()
    {
        //最后一秒忽略不计
        if(this.checkCanSend())
        {
            this.setCodeBtnCanSend();
            return;
        }
        let totalTime = this.getLeftTime();
        this.sendCodeBtnDisable()
        this.codeInput.schedule(()=>
        {
            if(this.checkCanSend())
            {
                this.setCodeBtnCanSend();
                this.sendCodeBtn.unscheduleAllCallbacks();
                this.sendCodeBtn.isClickValid = true;
            }
            else
            {
                this.timeLabel.string = this.getLeftTime() + "s"
            }
        }, 1, totalTime + 1);
    }

    private checkCanSend()
    {
        return this.nextSendTime == 0 || this.nextSendTime < (Date.now() + 1000)
    }

    private sendCodeBtnDisable()
    {
        this.sendCodeBtn.node.active = false;
        this.timeBtn.active = true;
        let totalTime = this.getLeftTime();
        this.timeLabel.string =   totalTime.toString();
    }

    private setCodeBtnCanSend()
    {
        this.sendCodeBtn.node.active = true;
        this.timeBtn.active = false;
    }

    private getLeftTime()
    {
        return Math.floor((this.nextSendTime - Date.now())/1000);
    }
}