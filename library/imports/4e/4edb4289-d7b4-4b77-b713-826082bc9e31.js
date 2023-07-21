"use strict";
cc._RF.push(module, '4edb4KJ17RLd7cTgmCCvJ4x', 'LoadingMediator');
// hall/scripts/logic/core/loadingMVC/LoadingMediator.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var LoadingConst_1 = require("./LoadingConst");
var ServicerModel_1 = require("../../hallcommon/model/ServicerModel");
var AppHotUpdateProxy_1 = require("./AppHotUpdateProxy");
var ViewMediator = /** @class */ (function (_super) {
    __extends(ViewMediator, _super);
    function ViewMediator(viewComponent) {
        var _this = _super.call(this, ViewMediator.NAME, viewComponent) || this;
        _this.curPer = 0;
        _this.buttonTouch = false;
        _this.initNode();
        return _this;
    }
    ViewMediator.prototype.listNotificationInterests = function () {
        _super.prototype.listNotificationInterests.call(this);
        return [
            LoadingConst_1.default.CHECK_UPDATE,
            LoadingConst_1.default.SHOW_CHECK_LABEL,
            LoadingConst_1.default.SHOW_PROGRESS_LABEL,
            LoadingConst_1.default.SHOW_PROGRESS_BAR,
            LoadingConst_1.default.UPDATE_LOADING_VERSION,
            LoadingConst_1.default.UPDATE_APP_INFO,
            LoadingConst_1.default.DUN_INIT_FINISH,
            LoadingConst_1.default.CHCEK_HOTUPDATE_PROGRESS,
            LoadingConst_1.default.CLEAR_LOADING_TIMER
        ];
    };
    ViewMediator.prototype.handleNotification = function (notification) {
        var msgName = notification.getName();
        var msgdata = notification.getBody();
        var msgType = notification.getType();
        if (msgName == LoadingConst_1.default.SHOW_CHECK_LABEL) {
            var labStr = msgdata.parm;
            this.setCheckLabelString(labStr);
        }
        else if (msgName == LoadingConst_1.default.SHOW_PROGRESS_LABEL) {
            var labStr = msgdata.parm;
            this.setProgressLabelString(labStr);
        }
        else if (msgName == LoadingConst_1.default.SHOW_PROGRESS_BAR) {
            var perNum = msgdata.parm;
            this.updateLoadingBar(perNum);
        }
        else if (msgName == LoadingConst_1.default.UPDATE_LOADING_VERSION) {
            this.setNativeVersion();
        }
        else if (msgName == LoadingConst_1.default.UPDATE_APP_INFO) {
            this.updateAppInfo();
        }
        else if (msgName == LoadingConst_1.default.CLEAR_LOADING_TIMER) {
            this.clearTimer();
        }
        else if (msgName == LoadingConst_1.default.DUN_INIT_FINISH) {
            this.onTDunInitFinish();
        }
        else if (msgName == LoadingConst_1.default.CHCEK_HOTUPDATE_PROGRESS) {
            this.checkHotUpdateProgress();
        }
    };
    ViewMediator.prototype.initNode = function () {
        // this.rootNode = this.viewComponent.node;
        this.rootNode = cc.find("LoadingView", this.viewComponent.node);
        var kefuBtn = Global.UIHelper.addCommonClick(this.rootNode, "kefuNode", this.onKeFuBtnClick, this);
        kefuBtn.active = true;
        Global.UIHelper.addCommonClick(this.rootNode, "gnx_guanwang", this.onGuanwangClick, this);
        Global.UIHelper.addCommonClick(this.rootNode, "loadingNode/restore", this.onRestoreClick, this);
        var loadingNode = this.rootNode.getChildByName("loadingNode");
        var loadingBar = loadingNode.getChildByName("loadingBar");
        this.restoreNode = loadingNode.getChildByName("restore");
        var checkNode = loadingNode.getChildByName("checkNode");
        var infoLabel = checkNode.getChildByName("infoLabel");
        var versionNode = this.rootNode.getChildByName("versionLabel");
        if (this.restoreNode) {
            this.restoreNode.active = false;
        }
        loadingBar.active = false;
        this.progressLabel = loadingBar.getChildByName("img_dhg").getChildByName("lbPer").getComponent(cc.Label);
        this.infoLabel = infoLabel.getComponent(cc.Label);
        this.loadingBar = loadingBar;
        this.versionLabel = versionNode.getComponent(cc.Label);
        this.setNativeVersion();
        this.buttonTouch = false;
    };
    ViewMediator.prototype.onGuanwangClick = function () {
        var url = Global.Setting.Urls.downLoadUrl;
        cc.sys.openURL(url);
    };
    //手动修复按钮
    ViewMediator.prototype.onRestoreClick = function () {
        var _this = this;
        if (this.buttonTouch == false) {
            this.buttonTouch = true;
            Global.UI.show("WndMessageBox", "是否开始版本修复？", 1, function () {
                _this.buttonTouch = false;
                var hotUpdateProxy = _this.facade.retrieveProxy(AppHotUpdateProxy_1.default.NAME);
                hotUpdateProxy.restartCheckUpdate(false);
            }, function () {
                _this.buttonTouch = false;
            });
        }
    };
    ViewMediator.prototype.onKeFuBtnClick = function () {
        //打开客服界面
        // let url:string = "https://e19.entrychat.com/chat/chatClient/chatbox.jsp?companyID=1137722&configID=2481&jid=1881369425&s=1";
        // cc.sys.openURL(url);
        // if (Global.Setting.loginKeFuType == 3){
        //     Global.ChatServer.serverType = ServiceEntranceType.LoginService;
        //     Global.ChatServer.otherSetting(null);
        // }else {
        //     cc.sys.openURL(Global.Toolkit.DealWithUrl(Global.Setting.Urls.onlineService));
        // }
        Global.ModelManager.getModel("ServicerModel").enterCustomerService(ServicerModel_1.CustomerEntranceType.LoginService);
    };
    ViewMediator.prototype.setCheckLabelString = function (label) {
        if (this.infoLabel && this.infoLabel.node && this.infoLabel.node.isValid)
            this.infoLabel.string = label;
    };
    ViewMediator.prototype.setProgressLabelString = function (label) {
        if (this.progressLabel && this.progressLabel.node && this.progressLabel.node.isValid)
            this.progressLabel.string = label;
    };
    ViewMediator.prototype.setNativeVersion = function () {
        var version = Global.Toolkit.genLoadingAppInfo();
        // let version =  Global.HotUpdateManager.hallNewVersion;
        Logger.log("----------------version------------" + version);
        if (this.versionLabel && cc.isValid(this.versionLabel.node)) {
            this.versionLabel.string = version;
        }
    };
    ViewMediator.prototype.onTDunInitFinish = function () {
        this.setNativeVersion();
    };
    ViewMediator.prototype.updateAppInfo = function () {
        var version = Global.Toolkit.genAppInfo();
        //let version = Global.HotUpdateManager.hallNewVersion
        if (this.versionLabel && this.versionLabel.node.isValid)
            this.versionLabel.string = version;
    };
    ViewMediator.prototype.updateLoadingBar = function (per) {
        if (this.loadingBar == null || !this.loadingBar.isValid)
            return;
        var particle = this.loadingBar.getChildByName("particle");
        if (per > 0) {
            this.loadingBar.active = true;
            if (this.restoreNode && this.restoreNode.active == false) {
                this.restoreNode.active = true;
            }
            var progressNode = this.loadingBar.getChildByName("bar_1_1");
            // let progressBar = progressNode.getComponent(cc.ProgressBar)
            // progressBar.progress = per
            var img_dhg = this.loadingBar.getChildByName("img_dhg");
            img_dhg.x = progressNode.x + progressNode.width * per;
            progressNode.getComponent(cc.Sprite).fillRange = per;
            if (particle.active == false) {
                particle.active = true;
            }
            //particle.position = cc.v3(progressNode.x + progressBar.totalLength*per,progressNode.y)
            this.curPer = per;
            this.checkHotUpdateProgress();
        }
        else {
            particle.active = false;
            this.loadingBar.active = false;
            this.restoreNode.active = false;
        }
    };
    ViewMediator.prototype.checkHotUpdateProgress = function () {
        var _this = this;
        this.clearTimer();
        if (this.curPer > 0 && this.curPer < 1) {
            this._timeOut = setTimeout(function () {
                Logger.error("updateLoadingBar----网络异常，请重新加载");
                var hotUpdateProxy = _this.facade.retrieveProxy(AppHotUpdateProxy_1.default.NAME);
                hotUpdateProxy.restartCheckUpdate();
            }, 10000);
        }
    };
    ViewMediator.prototype.clearTimer = function () {
        if (this._timeOut) {
            clearTimeout(this._timeOut);
            this._timeOut = null;
        }
    };
    ViewMediator.NAME = "LoadingViewMediator";
    return ViewMediator;
}(puremvc.Mediator));
exports.default = ViewMediator;

cc._RF.pop();