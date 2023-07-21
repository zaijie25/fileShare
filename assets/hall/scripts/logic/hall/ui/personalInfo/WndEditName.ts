import WndBase from "../../../core/ui/WndBase";
import PersonalInfoModel from "../../../hallcommon/model/PersonalInfoModel";

export default class WndEditName extends WndBase{
    private nameInput: cc.EditBox;
    private model: PersonalInfoModel;

    protected onInit() {
        this.name = "WndEditName";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/PersonalInfo/EditNameUI";
        this.model = Global.ModelManager.getModel("PersonalInfoModel");
    }

    protected initView() {
        this.nameInput = this.getComponent("nameEditBox", cc.EditBox);
        this.nameInput.maxLength = 6;
        this.addCommonClick("cancelBtn", this.cancelClick, this);
        this.addCommonClick("sureBtn", this.sureClick, this);
        this.addCommonClick("close", this.closeWnd, this);
    }

    protected onOpen(){
        this.nameInput.string = "";
    }

    private closeWnd(){
        this.close();
    }

    private cancelClick(){
        this.close();
    }

    private sureClick(){
        let str = this.nameInput.string;
        if (!str) return Global.UI.fastTip("请输入昵称~");
        if (str.indexOf(" ") > -1)  return Global.UI.fastTip("昵称不能含有空格");
        // if (Global.Toolkit.getTotalBytes(str) > 14){
        //     return Global.UI.fastTip("昵称最长七个字");
        // }
        if(Global.Toolkit.checkContainsEmoji(str))
        {
            return Global.UI.fastTip("昵称不能含表情符号!")
        }
        this.reqEditUserInfo(str);
    }

    private reqEditUserInfo(nickname: string){
        let param:any = {}
        param.nickname =nickname ;
        this.model.reqEditUserInfo(param, ()=>{
            Global.UI.fastTip("修改昵称成功！");
            Global.PlayerData.nickname = nickname;
            this.close();
        });
    }
}