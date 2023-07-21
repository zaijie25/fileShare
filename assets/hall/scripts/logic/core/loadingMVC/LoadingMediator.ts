import Const from "./LoadingConst";
import AppHelper from "../tool/AppHelper";
import { CustomerEntranceType } from "../../hallcommon/model/ServicerModel";
import AppHotUpdateProxy from "./AppHotUpdateProxy";

export default class ViewMediator extends puremvc.Mediator {
    public static NAME: string = "LoadingViewMediator"
    viewComponent: cc.Component;
    infoLabel: cc.Label;
    progressLabel:cc.Label;
    loadingBar: cc.Node;
    restoreNode: cc.Node;
    versionLabel:cc.Label;

    //背景图
    private bg:cc.Sprite;
    private rootNode: cc.Node;  // 

    _timeOut:any
    curPer = 0;
    private buttonTouch = false;
    constructor(viewComponent: cc.Component) {
        super(ViewMediator.NAME, viewComponent)
        this.initNode()
    }

    listNotificationInterests(): any {
        super.listNotificationInterests();
        return [
            Const.CHECK_UPDATE,
            Const.SHOW_CHECK_LABEL,
            Const.SHOW_PROGRESS_LABEL,
            Const.SHOW_PROGRESS_BAR,
            Const.UPDATE_LOADING_VERSION,
            Const.UPDATE_APP_INFO,
            Const.DUN_INIT_FINISH,
            Const.CHCEK_HOTUPDATE_PROGRESS,
            Const.CLEAR_LOADING_TIMER
        ]
    }

    handleNotification(notification) {
        let msgName = notification.getName();
        let msgdata = notification.getBody();
        let msgType = notification.getType();
        if (msgName == Const.SHOW_CHECK_LABEL) {
            let labStr = msgdata.parm
            this.setCheckLabelString(labStr)
        }else if(msgName == Const.SHOW_PROGRESS_LABEL){
            let labStr = msgdata.parm
            this.setProgressLabelString(labStr)
        }else if (msgName == Const.SHOW_PROGRESS_BAR) {
            let perNum = msgdata.parm
            this.updateLoadingBar(perNum)
        }else if (msgName == Const.UPDATE_LOADING_VERSION) {
            this.setNativeVersion()
        }
        else if (msgName == Const.UPDATE_APP_INFO) {
            this.updateAppInfo()
        }
        else if (msgName == Const.CLEAR_LOADING_TIMER){
            this.clearTimer()
        }else if (msgName == Const.DUN_INIT_FINISH){
            this.onTDunInitFinish();
        }else if (msgName == Const.CHCEK_HOTUPDATE_PROGRESS){
            this.checkHotUpdateProgress()
        }
    }
    initNode() {
        // this.rootNode = this.viewComponent.node;
        this.rootNode = cc.find("LoadingView", this.viewComponent.node);
        let kefuBtn = Global.UIHelper.addCommonClick(this.rootNode,"kefuNode",this.onKeFuBtnClick,this)
        kefuBtn.active = true
        Global.UIHelper.addCommonClick(this.rootNode,"gnx_guanwang",this.onGuanwangClick,this)
        Global.UIHelper.addCommonClick(this.rootNode,"loadingNode/restore",this.onRestoreClick,this)
        let loadingNode = this.rootNode.getChildByName("loadingNode");
        let loadingBar = loadingNode.getChildByName("loadingBar")
        this.restoreNode = loadingNode.getChildByName("restore")
        let checkNode = loadingNode.getChildByName("checkNode")
        let infoLabel = checkNode.getChildByName("infoLabel")
        let versionNode = this.rootNode.getChildByName("versionLabel");
        if (this.restoreNode){
            this.restoreNode.active = false;
        }
        loadingBar.active = false;
        this.progressLabel = loadingBar.getChildByName("img_dhg").getChildByName("lbPer").getComponent(cc.Label);
        this.infoLabel = infoLabel.getComponent(cc.Label);
        this.loadingBar = loadingBar;
        this.versionLabel = versionNode.getComponent(cc.Label)
        this.setNativeVersion()
        this.buttonTouch = false

    }

    private onGuanwangClick()
    {
        let url = Global.Setting.Urls.downLoadUrl
        cc.sys.openURL(url);
    }
    //手动修复按钮
    private onRestoreClick()
    {
        if(this.buttonTouch == false){
            this.buttonTouch = true
            Global.UI.show("WndMessageBox", "是否开始版本修复？", 1, ()=>{
                this.buttonTouch = false
                let hotUpdateProxy =<AppHotUpdateProxy>this.facade.retrieveProxy(AppHotUpdateProxy.NAME);
                hotUpdateProxy.restartCheckUpdate(false);
            }, ()=>{
                this.buttonTouch = false
            });
        }
    }
    onKeFuBtnClick(){
        //打开客服界面
        // let url:string = "https://e19.entrychat.com/chat/chatClient/chatbox.jsp?companyID=1137722&configID=2481&jid=1881369425&s=1";
        // cc.sys.openURL(url);

        // if (Global.Setting.loginKeFuType == 3){
        //     Global.ChatServer.serverType = ServiceEntranceType.LoginService;
        //     Global.ChatServer.otherSetting(null);
        // }else {
        //     cc.sys.openURL(Global.Toolkit.DealWithUrl(Global.Setting.Urls.onlineService));
        // }
        Global.ModelManager.getModel("ServicerModel").enterCustomerService(CustomerEntranceType.LoginService);
        
    }

    setCheckLabelString(label: string) {
        if(this.infoLabel && this.infoLabel.node && this.infoLabel.node.isValid)
            this.infoLabel.string = label;
    }

    setProgressLabelString(label: string) {
        if(this.progressLabel && this.progressLabel.node && this.progressLabel.node.isValid)
            this.progressLabel.string = label;
    }

    setNativeVersion(){
        let version =  Global.Toolkit.genLoadingAppInfo();
       // let version =  Global.HotUpdateManager.hallNewVersion;
        Logger.log("----------------version------------" + version)
        if(this.versionLabel && cc.isValid(this.versionLabel.node)){
            this.versionLabel.string = version
        }
    }

    onTDunInitFinish(){
        this.setNativeVersion()
    }

    

    updateAppInfo()
    {
        let version = Global.Toolkit.genAppInfo();
        //let version = Global.HotUpdateManager.hallNewVersion
        if(this.versionLabel && this.versionLabel.node.isValid)
            this.versionLabel.string = version;
    }

    updateLoadingBar(per: number) {
        if(this.loadingBar == null || !this.loadingBar.isValid)
            return;
        let particle = this.loadingBar.getChildByName("particle")
        if (per > 0) {
            this.loadingBar.active = true;
            if(this.restoreNode && this.restoreNode.active == false){
                this.restoreNode.active = true;
            }
            let progressNode = this.loadingBar.getChildByName("bar_1_1")
            // let progressBar = progressNode.getComponent(cc.ProgressBar)
            // progressBar.progress = per
            let img_dhg = this.loadingBar.getChildByName("img_dhg");
            img_dhg.x = progressNode.x+progressNode.width*per
            progressNode.getComponent(cc.Sprite).fillRange = per
            if (particle.active == false) {
                particle.active = true;
            }
            //particle.position = cc.v3(progressNode.x + progressBar.totalLength*per,progressNode.y)
            this.curPer = per;
            this.checkHotUpdateProgress()
            
        }else {
            particle.active = false;
            this.loadingBar.active = false;
            this.restoreNode.active = false;
        }
    }

    checkHotUpdateProgress(){
        this.clearTimer()
        if (this.curPer > 0 && this.curPer < 1){
            this._timeOut = setTimeout(() => {
                Logger.error("updateLoadingBar----网络异常，请重新加载")
                let hotUpdateProxy =<AppHotUpdateProxy>this.facade.retrieveProxy(AppHotUpdateProxy.NAME);
                hotUpdateProxy.restartCheckUpdate();
            }, 10000);
        }
    }

    clearTimer(){
        if (this._timeOut) {
            clearTimeout(this._timeOut)
            this._timeOut = null
        }
    }
}

