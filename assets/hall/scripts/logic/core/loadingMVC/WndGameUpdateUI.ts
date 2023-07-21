import WndBase, { DestoryType } from "../ui/WndBase";


export default class WndGameUpdateUI extends WndBase {
    private yesBtnNode:cc.Node;
    private noBtnNode:cc.Node;
    private yesCallback:Function;
    private noCallback:Function;
    private autoClose = true;
    private autoReleaseFunc = true;

    protected onInit() {
        this.name = "WndGameUpdateUI";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/LoadingScene/GameUpdateUI";
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
        //1 两个按钮  2 yes 一个按钮
        let type = this.args[0];
        this.updateBtnByType(type);
        this.yesCallback = this.args[1];
        this.noCallback = this.args[2];
        this.autoClose = this.args[3] != false;
        this.autoReleaseFunc = this.args[4] != false;

        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
    }

    private updateBtnByType(type)
    {
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
        }else {
            Logger.error("onCloseAnimFinish noCallback is null")
        }
    }

    private onYesBtnClick()
    {
        // this.noCallback = null;
        // if(this.autoClose)
        //     this.close();
        if(this.yesCallback)
        {
            this.yesCallback();
            if (this.autoReleaseFunc) {
                this.yesCallback = null;
            }
        }
    }


}