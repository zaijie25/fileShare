import WndBase from "../../../core/ui/WndBase";
import PersonalInfoModel from "../../../hallcommon/model/PersonalInfoModel";

export default class WndToggleAccount extends WndBase {
    private model: PersonalInfoModel;

    protected onInit() {
        this.name = "WndToggleAccount";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/PersonalInfo/ToggleAccountUI";
        this.model = Global.ModelManager.getModel("PersonalInfoModel");
    }

    protected initView() {
        this.addCommonClick("cancelBtn", this.cancelClick, this);
        this.addCommonClick("sureBtn", this.sureClick, this);
        this.addCommonClick("close", this.closeWnd, this);
    }

    protected onOpen() {

    }

    private closeWnd() {
        this.close();
    }

    private cancelClick() {
        this.close();
    }

    private sureClick() {
        Global.SceneManager.goToLogin();
    }

}