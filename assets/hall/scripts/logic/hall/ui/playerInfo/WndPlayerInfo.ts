import WndBase from "../../../core/ui/WndBase";
import PlayerInfoModel from "../../../hallcommon/model/PlayerInfoModel";
import BindingGiftModel from "../../../hallcommon/model/BindingGiftModel";
import PersonalInfoView from "./PersonalInfoView";
import ChooseHeadView from "./ChooseHeadView";
import MusicLayerView from "./MusicLayerView";
import SettingLayerView from "./SettingLayerView";

export default class WndPlayerInfo extends WndBase{

    /**
     * 数据对象
     */
    private model: PlayerInfoModel;

    private personalInfoView:PersonalInfoView

    private chooseHeadView:ChooseHeadView

    private musicLayerView:MusicLayerView

    private settingLayerView:SettingLayerView
    /**
     * 当前页签
     */
    currYeqian:number = -1;
    /**
     * 页签节点集合
     */
    yeqianArr:cc.Node[] = [];
    /**
     * 内容节点集合
     */
    contentArr:cc.Node[] = [];

    private subViewPath :any = {
        "personalInfoView":"hall/prefabs/ui/PlayerInfo/PersonalInfo",
        
    }

    private viewKeyTypeMap :any = {
        "personalInfoView":PersonalInfoView,
    }

    /**
     * 初始化脚本
     */
    protected onInit() {
       
        this.name = "WndPlayerInfo";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/PlayerInfo/PlayerInfoUI";
        this.model = <PlayerInfoModel>Global.ModelManager.getModel("PlayerInfoModel");
    }

    onDispose(){
        this.internalEvent.off("ChangeView",this,this.ChangeYeqian)
        this.currYeqian = -1
    }

    /**
     * 初始化UI
     */
    protected initView() {
        this.internalEvent.on("ChangeView",this,this.ChangeYeqian)
        this.addCommonClick("bg/close", this.closeBtnFunc, this);
        for(var i = 0; i < 4; i++){
            var yeqianNode = this.addCommonClick("yeqian/yeqian_" + i, this.yeqianBtnFunc, this);

            this.yeqianArr[i * 2] = cc.find("noSelected", yeqianNode);
            this.yeqianArr[i * 2 + 1] = cc.find("selected", yeqianNode);

            this.contentArr[i] = cc.find("content/content_" + i, this.node);
        }
        this.chooseHeadView = <ChooseHeadView>this.addView("ChooseHeadView", this.getChild("content/content_1"), ChooseHeadView);
        this.musicLayerView = <MusicLayerView>this.addView("MusicLayerView", this.getChild("content/content_2"), MusicLayerView);
        this.settingLayerView = <SettingLayerView>this.addView("SettingLayerView", this.getChild("content/content_3"), SettingLayerView);
        this.initSubViewClass(this.viewKeyTypeMap)
        this.InitScripts()
    }

    async InitScripts() {
        await this.initSubView(this.subViewPath,this.viewKeyTypeMap,this.getChild("content"))
    }

    /**
     * 界面打开回调
     */
    protected onOpen(){
        this.ChangeYeqian(0);
        var model = <BindingGiftModel>Global.ModelManager.getModel("BindingGiftModel");
        //头像点击事件
        let playerData = Global.PlayerData;
        if (playerData.phone == "" && model.BindAwardNum != 0) {
            Global.UI.show("WndBindingGift"); 
        }
    }
    /**
     * 界面关闭回调
     */
    protected onClose(){
        this.currYeqian = -1
    }

    /**
     * 关闭按钮点击
     */
    private closeBtnFunc(){
        this.close();
    }

    /**
     * 页签按钮点击
     * @param target 
     */
    yeqianBtnFunc(target){
        var arr = target.node.name.split("_");
        var param = arr[arr.length - 1];
        var yeqian = parseInt(param);

        this.ChangeYeqian(yeqian);
    }

    /**
     * 切换页签
     * @param yeqian 
     */
    ChangeYeqian(yeqian: number) {
        if (this.currYeqian != yeqian) {
            this.currYeqian = yeqian;
            this.closeAllSubView()
            switch (this.currYeqian) {
                case 0:
                    this.personalInfoView.subViewState = true
                    break;
                case 1:
                    this.chooseHeadView.subViewState = true
                    break;
                case 2:
                    this.musicLayerView.subViewState = true
                    break
                case 3:
                    this.settingLayerView.subViewState = true
                    break
                default:
                    break;
            }
            this.UpdatBtn();
        }
    }

    /**
     * 更新界面
     */
    UpdatBtn(){
        for(var i = 0; i < 4; i++){
            var bShow:boolean = (i == this.currYeqian);
            var yeqianNode = this.yeqianArr[i * 2 + 1];
            yeqianNode.active = bShow;
        }
        this.OnDataPrepared()
    }
}