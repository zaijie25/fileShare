import ViewBase from "../../../../core/ui/ViewBase";

export default class PwdInputView extends ViewBase
{
    private pwdInput:cc.EditBox;
    private visibleIcon:cc.Node;
    private inVisibleIcon:cc.Node;
    private pwdVisible = false;

    protected initView()
    {
        this.pwdInput = this.getComponent("pwd", cc.EditBox);
        this.pwdInput.placeholder = "请输入6~10位数字和字母密码";
        this.pwdInput.maxLength = 16;
        this.visibleIcon = this.getChild("visibleIcon");
        this.inVisibleIcon = this.getChild("inVisibleIcon");
        this.addCommonClick("visibleIcon", this.onVisibleClick, this, null);
        this.addCommonClick("inVisibleIcon", this.onVisibleClick, this, null);
    }

    private onVisibleClick()
    {
        this.pwdVisible = !this.pwdVisible;
        if(this.pwdVisible)
            this.pwdInput.inputFlag = cc.EditBox.InputFlag.DEFAULT;
        else
            this.pwdInput.inputFlag = cc.EditBox.InputFlag.PASSWORD;
        this.updateVisible();
    }

    public get pwd()
    {
        return this.pwdInput.string;
    }

    public set pwd(str: string)
    {
        this.pwdInput.string = str
    }

    protected onSubViewShow()
    {
        this.pwdVisible = false;
        this.updateVisible();
    }

    private updateVisible()
    {
        this.visibleIcon.active = this.pwdVisible;
        this.inVisibleIcon.active = !this.pwdVisible;
    }
}