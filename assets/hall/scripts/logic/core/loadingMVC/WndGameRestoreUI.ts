import WndBase, { DestoryType } from "../ui/WndBase";


export default class WndGameRestoreUI extends WndBase {
    private yesBtnNode:cc.Node;
    private noBtnNode:cc.Node;
    private yesCallback:Function;
    private noCallback:Function;
    private autoClose = true;
    private autoReleaseFunc = true;

    protected onInit() {
        this.name = "WndGameRestoreUI";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/LoadingScene/GameRestoreUI";
        this.destoryType = DestoryType.None;
    }

    protected initView() {
        this.addCommonClick("bg/close", this.onCloseClick, this);
        this.noBtnNode = this.addCommonClick("cancelBtn", this.onCloseClick, this);
        this.yesBtnNode = this.addCommonClick("okBtn", this.onYesBtnClick, this);
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
        this.yesCallback = this.args[0];
        this.noCallback = this.args[1];
        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
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


}