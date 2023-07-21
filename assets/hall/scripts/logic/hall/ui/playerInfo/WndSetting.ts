import ViewBase from "../../../core/ui/ViewBase";
import WndBase from "../../../core/ui/WndBase";
import PlayerInfoModel from "../../../hallcommon/model/PlayerInfoModel";
import HallBtnHelper from "../hall/views/HallBtnHelper";

/**
 * 选择头像界面
 */
export default class WndSetting extends WndBase 
{


      /**
     * 数据对象
     */
    private model: PlayerInfoModel;
    private officalUrlText:cc.Label
    private save_bg :cc.Sprite
    /**
     * 版本号文本
     */
    versionLbl:cc.Label = null;
    /**
     * 音乐设置节点集合
     */
    musicNodeArr:cc.Node[] = [];
    /**
     * 音效设置节点集合
     */
    soundNodeArr:cc.Node[] = [];

    protected onInit() {
        this.name = "WndSetting";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/PlayerInfo/SettingBox";
        this.model = <PlayerInfoModel>Global.ModelManager.getModel("PlayerInfoModel");
    }

    protected initView()
    {
        var musicNode:cc.Node = this.addCommonClick("musicSwitch", this.onMusicSwitch, this);
        var soundNode:cc.Node = this.addCommonClick("audioSwitch", this.onAudioSwitch, this);
        this.officalUrlText = this.getComponent("officalNode/url",cc.Label)
        this.save_bg = this.getComponent("officalNode/save_bg",cc.Sprite)


        this.addCommonClick("close", this.onCloseUI, this);
        this.addCommonClick("officalNode/btn",this.onBackUpGameBtn,this)
        this.musicNodeArr[0] = cc.find("control_shut", musicNode);
        this.musicNodeArr[1] = cc.find("control_open", musicNode);
        
        this.soundNodeArr[0] = cc.find("control_shut", soundNode);
        this.soundNodeArr[1] = cc.find("control_open", soundNode);

        this.versionLbl = this.getComponent("versionLabel",cc.Label)

        let verStr = Global.HotUpdateManager.nativeVersions["hall"]; //Global.Setting.SystemInfo.Version
        this.setVersionLblText(verStr);
        this.initOfficalUrl()
    }

    private onBackUpGameBtn(){
        HallBtnHelper.WndBackUpOpen();
    }

    private initOfficalUrl()
    {
        let url= Global.Setting.Urls.downLoadUrl;
        let arr = url.split("//");
        let arr1 = arr[arr.length - 1].split("/");
        let name = arr1[0];
        let baseWide = 123
        this.officalUrlText.string =  name;
        setTimeout(() => {
            if (cc.isValid(this.save_bg.node)) {
                this.save_bg.node.width = baseWide +this.officalUrlText.node.width
            }
        }, 20);
    }
    onCloseUI()
    {
        this.close()
    }

    onOpen()
    {
        this.UpdateUI();
        this.setVersionLblText();
    }

    /**
     * 更新界面
     */
    UpdateUI(){
        let musicEnable = Global.Setting.settingData.musicEnable;
        let soundEnable = Global.Setting.settingData.soundEnable;

        this.musicNodeArr[0].active = !musicEnable;
        this.musicNodeArr[1].active = musicEnable;
        
        this.soundNodeArr[0].active = !soundEnable;
        this.soundNodeArr[1].active = soundEnable;
    }

    /**
     * 设置版本号文本
     * @param str 
     */
    private setVersionLblText(str?: string){
        
        this.versionLbl.string = "版本号:" + Global.Toolkit.genLoadingAppInfo()
    }

    /**
     * 音乐点击
     */
    private onMusicSwitch(){
        let musicEnable = Global.Setting.settingData.musicEnable;
        Global.Audio.setMusicEnable(!musicEnable);
        this.UpdateUI();
    }

    /**
     * 音效点击
     */
    private onAudioSwitch(){
        let soundEnable = Global.Setting.settingData.soundEnable;
        Global.Audio.setSoundEnable(!soundEnable);
        this.UpdateUI();
    }

}