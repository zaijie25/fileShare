
import ViewBase from "../../../../../core/ui/ViewBase";


export default class aliBandWin extends ViewBase {

    private nameEditBox: cc.EditBox = null;

    private aliAccountEditBox: cc.EditBox = null;


    protected initView()
    {
        this.nameEditBox = this.getComponent("NameEditBox",cc.EditBox);
        this.aliAccountEditBox = this.getComponent("AccountEditBox",cc.EditBox);

        this.addCommonClick("bandBtn",this.bandBtnFunc,this);
    }

    private checkTextEmptyAndShowTips(text:string, tipsLabel:string)
    {
        if(text.length <= 0)
        {
            Global.UI.fastTip(tipsLabel);
            return false;
        }
        return true;
    }
    
    /**
     * 检测字符串中是否包含某些特殊字符
     * @param text 要检测的字符串
     * @param specialString 特殊字符串
     * @param tipsLabel 检测如果包含则tip提示的字符串
     */
    private checkSpecialCharAndShowTips(text:string, specialString:string, tipsLabel:string)
    {
        for (let i = 0; i < text.length; i++) {
            let c = text.charAt(i);
            if (specialString.indexOf(c) >= 0) {
                Global.UI.fastTip(tipsLabel);
                return false;
            }
        }
        return true;
    }

    //发送绑定消息
    bandBtnFunc(){
        if(!this.checkTextEmptyAndShowTips(this.nameEditBox.string, "姓名不能为空"))
            return;
        if(!this.checkTextEmptyAndShowTips(this.aliAccountEditBox.string, "账户不能为空"))
            return;
        if(!this.checkSpecialCharAndShowTips(this.aliAccountEditBox.string, " ", "账号中有非法字符，请重新输入")){
            return;
        }
        Global.UI.show("WndaliBandConfirm",this.nameEditBox.string,this.aliAccountEditBox.string);
    }

}
