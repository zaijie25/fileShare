
import WndBase, { DestoryType } from "../../../core/ui/WndBase";
import LoadingConst from "../../../core/loadingMVC/LoadingConst";

export default class WndMessageBox extends WndBase
{
    private yesBtnNode:cc.Node;
    private noBtnNode:cc.Node;
    private content:cc.RichText;
    private yesCallback:Function;
    private noCallback:Function;
    private versionLabel:cc.Label
    private autoClose = true;
    private autoReleaseFunc = true;

    protected onInit()
    {
        this.name = "WndMessageBox";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/MessageBoxUI";
        this.destoryType = DestoryType.None;
    }

    protected initView()
    {
        this.addCommonClick("bg/close", this.onCloseClick, this);
        this.yesBtnNode = this.addCommonClick("yesBtn", this.onYesBtnClick, this);
        this.noBtnNode = this.addCommonClick("noBtn", this.onCloseClick, this);
        this.content = this.getComponent("content", cc.RichText);
        this.versionLabel = this.getComponent("versionLabel",cc.Label)
        this.versionLabel.string = ""
        this.content.string = "";
    }


    /**
     * @param {string} content
     * @param {number} type   1 显示 确定取消  2  显示 确定
     * @param {Function} yesCallback
     * @param {Function} noCallback
     * @param {boolean} autoClose  点击按钮后是否自动关闭界面
     * @memberof WndMessageBox
     */
    protected onOpen()
    {
        if(this.args == null || this.args.length == 0)
        {
            Logger.error("没有设置参数");
            this.close();
            return;
        }
        let content = this.args[0];
        if(content == null || content == "")
        {
            Logger.error("没有设置参数");
            this.close();
            return;
        }
        //1 两个按钮  2 yes 一个按钮
        let type = this.args[1];
        this.updateBtnByType(type);
        this.content.string = content;
        this.yesCallback = this.args[2];
        this.noCallback = this.args[3];
        this.autoClose = this.args[4] != false;
        this.autoReleaseFunc = this.args[5] != false;
        if(this.args[6]){
            //文字前加警报icon，且文字为红色
            content = "<color=#ff0000> " + content + "</color>";
            this.content.string = content;
        }
        this.setNativeVersion()
        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
    }

    // 重新打开时覆盖参数
    protected onReshow(){
        if(this.args == null || this.args.length == 0)
        {
            Logger.error("没有设置参数");
            this.close();
            return;
        }
        let content = this.args[0];
        if(content == null || content == "")
        {
            Logger.error("没有设置参数");
            this.close();
            return;
        }
        //1 两个按钮  2 yes 一个按钮
        let type = this.args[1];
        this.updateBtnByType(type);
        this.content.string = content;
        this.yesCallback = this.args[2];
        this.noCallback = this.args[3];
        this.autoClose = this.args[4] != false;
        this.autoReleaseFunc = this.args[5] != false;
        if(this.args[6]){
            //文字前加警报icon，且文字为红色
            content = "<color=#ff0000> " + content + "</color>";
            this.content.string = content;
        }
        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
    }

    private updateBtnByType(type)
    {
        if (!cc.isValid(this.node))
            return;
        if(type == 1)
        {
            this.yesBtnNode.active = true;
            this.noBtnNode.active = true;
            this.yesBtnNode.x = 157;
            this.noBtnNode.x = -157
        }
        else
        {
            this.yesBtnNode.active = true;
            this.noBtnNode.active = false;
            this.yesBtnNode.x = 0;
        }
    }


    private onCloseClick()
    {
        if(this.autoClose)
            this.close();

    }

    protected onClose()
    {
        
    }

    protected onCloseAnimFinish() {
        if(this.noCallback)
        {
            //防止嵌套调用
            let tmpnoCallback = this.noCallback;
            if (this.autoReleaseFunc) {
                this.noCallback = null;
            }
            tmpnoCallback();
        }
    }

    private onYesBtnClick()
    {
        this.noCallback = null;
        if(this.autoClose)
            this.close();
        if(this.yesCallback)
        {
            this.yesCallback();
            if (this.autoReleaseFunc) {
                this.yesCallback = null;
            }
        }
    }

    setNativeVersion(){
       // let version = Global.HotUpdateManager.hallNewVersion
        // let version =  Global.Toolkit.genLoadingAppInfo();
        // if(version)
        // {
        //     version = version  + "_"+ Global.ReportTool.GetReportTimes()
        // }
        // if(this.versionLabel && this.versionLabel.node.isValid){
        //     this.versionLabel.string =  version
        // }
    }

    

}