import ViewBase from "../../../core/ui/ViewBase";
import HallBtnHelper from "../hall/views/HallBtnHelper";

/**
 * 选择头像界面
 */
export default class SettingLayerView extends ViewBase 
{

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

    private officalUrlText:cc.Label

    protected initView()
    {
        var musicNode:cc.Node = this.addCommonClick("musicSwitch", this.onMusicSwitch, this);
        var soundNode:cc.Node = this.addCommonClick("audioSwitch", this.onAudioSwitch, this);
        this.officalUrlText = this.getComponent("officalNode/url",cc.Label)
        this.addCommonClick("officalNode/btn",this.onBackUpGameBtn,this)

        this.musicNodeArr[0] = cc.find("control_shut", musicNode);
        this.musicNodeArr[1] = cc.find("control_open", musicNode);
        
        this.soundNodeArr[0] = cc.find("control_shut", soundNode);
        this.soundNodeArr[1] = cc.find("control_open", soundNode);

        this.versionLbl = this.getComponent("versionLbl",cc.Label)

        let verStr = Global.HotUpdateManager.nativeVersions["hall"]; //Global.Setting.SystemInfo.Version
        this.setVersionLblText(verStr);
        this.initOfficalUrl()
        
    }

    onSubViewShow()
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

    private onBackUpGameBtn(){
        HallBtnHelper.WndBackUpOpen();
    }

    /**
     * 设置版本号文本
     * @param str 
     */
    private setVersionLblText(str?: string){
        
        this.versionLbl.string = "版本号:" + Global.Toolkit.genAppInfo() + "•"+Global.PlayerData.merge_type;
    }

    private initOfficalUrl()
    {
        let url= Global.Setting.Urls.downLoadUrl;
        let arr = url.split("//");
        let arr1 = arr[arr.length - 1].split("/");
        let name = arr1[0];
        let baseWide = 123
        this.officalUrlText.string =  name;
        // setTimeout(() => {
        //     if (cc.isValid(this.save_bg.node)) {
        //         this.save_bg.node.width = baseWide +this.officalUrlText.node.width
        //     }
        // }, 20);
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