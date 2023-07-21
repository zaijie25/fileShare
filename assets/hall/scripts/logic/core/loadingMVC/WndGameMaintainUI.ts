import WndBase, { DestoryType } from "../ui/WndBase";


export default class WndGameMaintainUI extends WndBase {
    private onlineCustomBtnNode: cc.Node;
    private officialWebBtnNode: cc.Node;
    private content: cc.Label;
    private countTimeLabel: cc.Label;
    private onlineCustomCallback: Function;
    private officialWebCallback: Function;
    private closeCallback: Function;
    private autoClose = true;
    private autoReleaseFunc = true;
    private endTime = 0;


    protected onInit() {
        this.name = "WndGameMaintainUI";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/LoadingScene/GameMaintainUI";
        this.destoryType = DestoryType.None;
    }

    protected initView() {
        this.addCommonClick("bg/close", this.onCloseClick, this);
        this.onlineCustomBtnNode = this.addCommonClick("onlineCustomBtn", this.onlineCustomBtnClick, this);
        this.officialWebBtnNode = this.addCommonClick("officialWebBtn", this.officialWebBtnClick, this);
        this.content = this.getComponent("content", cc.Label);
        this.countTimeLabel = this.getComponent("timeLabel", cc.Label)
        this.content.string = "";
        this.countTimeLabel.string = ""; // <color=#f08f48><size=24><b><u>剩余维护时间 00:30:00</u></b></size></color>
    }


    /**
     * @param {string} content
     * @param {number} type   1 显示 确定取消  2  显示 确定
     * @param {Function} yesCallback
     * @param {Function} noCallback
     * @param {boolean} autoClose  点击按钮后是否自动关闭界面
     * @memberof WndGameMaintainUI
     */
    protected onOpen() {
        if (this.args == null || this.args.length == 0) {
            Logger.error("没有设置参数");
            this.close();
            return;
        }
        let content = this.args[0];
        if (content == null || content == "") {
            Logger.error("没有设置参数");
            this.close();
            return;
        }

        let endTime = this.args[1];
        this.endTime = endTime;
        let startTime = Math.round(new Date().getTime() / 1000); //开始时间
        let t = this.endTime - startTime; //时间差
        this.showLeftTime(t)
        this.countTimeLabel.schedule(this.startCounter.bind(this), 1, cc.macro.REPEAT_FOREVER)

        this.content.string = content;
        this.onlineCustomCallback = this.args[2];
        this.officialWebCallback = this.args[3];
        this.closeCallback = this.args[4];
        this.autoClose = this.args[5] != false;
        this.autoReleaseFunc = this.args[6] != false;

        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
    }

    /**
 * 
 * @desc   格式化现在距${endTime}的剩余时间
 * @param  {Date} endTime  
 * @return {String}
 */
    private formatRemainTime(leftTime) {
        let t = leftTime
        let d = 0,
            h = 0,
            m = 0,
            s = 0;
        if (t >= 0) {
            h = Math.floor(t  / 60 / 60 % 24);
            m = Math.floor(t  / 60 % 60);
            s = Math.floor(t  % 60);
        }
        let h_str = "";
        let m_str = "";
        let s_str = "";
        if (h < 10){
            h_str = "0" + h
        }else {
            h_str = h_str + h;
        }
        if (m < 10){
            m_str = "0" + m
        }else {
            m_str = m_str + m;
        }
        
        if (s < 10){
            s_str = "0" + s
        }else {
            s_str = s_str + s;
        }
        
        return h_str + ":" + m_str + ":" + s_str;
    }

    private showLeftTime(leftTime) {
        let leftTimeStr = this.formatRemainTime(leftTime)
        this.countTimeLabel.string =  "剩余维护时间"+ leftTimeStr 
    }

    private stopCounter() {
        this.countTimeLabel.unscheduleAllCallbacks()
    }

    private startCounter() {
        let startTime = Math.round(new Date().getTime() / 1000); //开始时间
        let t = this.endTime - startTime; //时间差
        this.showLeftTime(t)
        if (t <= 0){
            this.stopCounter();
            this.onCloseClick()
        }
    }


    private officialWebBtnClick() {
        if (this.officialWebCallback) {
            this.officialWebCallback();
        }

    }

    private onCloseClick() {
        this.close();
    }

    protected onClose() {

    }

    protected onCloseAnimFinish() {
        if (this.closeCallback) {
            this.closeCallback();
            this.closeCallback = null
        }
    }

    private onlineCustomBtnClick() {
        if (this.onlineCustomCallback) {
            this.onlineCustomCallback();
        }
    }


}