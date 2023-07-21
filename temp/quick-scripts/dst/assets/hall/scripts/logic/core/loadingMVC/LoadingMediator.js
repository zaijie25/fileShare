
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/loadingMVC/LoadingMediator.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGxvYWRpbmdNVkNcXExvYWRpbmdNZWRpYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBbUM7QUFFbkMsc0VBQTRFO0FBQzVFLHlEQUFvRDtBQUVwRDtJQUEwQyxnQ0FBZ0I7SUFnQnRELHNCQUFZLGFBQTJCO1FBQXZDLFlBQ0ksa0JBQU0sWUFBWSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsU0FFMUM7UUFMRCxZQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ0gsaUJBQVcsR0FBRyxLQUFLLENBQUM7UUFHeEIsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFBOztJQUNuQixDQUFDO0lBRUQsZ0RBQXlCLEdBQXpCO1FBQ0ksaUJBQU0seUJBQXlCLFdBQUUsQ0FBQztRQUNsQyxPQUFPO1lBQ0gsc0JBQUssQ0FBQyxZQUFZO1lBQ2xCLHNCQUFLLENBQUMsZ0JBQWdCO1lBQ3RCLHNCQUFLLENBQUMsbUJBQW1CO1lBQ3pCLHNCQUFLLENBQUMsaUJBQWlCO1lBQ3ZCLHNCQUFLLENBQUMsc0JBQXNCO1lBQzVCLHNCQUFLLENBQUMsZUFBZTtZQUNyQixzQkFBSyxDQUFDLGVBQWU7WUFDckIsc0JBQUssQ0FBQyx3QkFBd0I7WUFDOUIsc0JBQUssQ0FBQyxtQkFBbUI7U0FDNUIsQ0FBQTtJQUNMLENBQUM7SUFFRCx5Q0FBa0IsR0FBbEIsVUFBbUIsWUFBWTtRQUMzQixJQUFJLE9BQU8sR0FBRyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDckMsSUFBSSxPQUFPLEdBQUcsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JDLElBQUksT0FBTyxHQUFHLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyQyxJQUFJLE9BQU8sSUFBSSxzQkFBSyxDQUFDLGdCQUFnQixFQUFFO1lBQ25DLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxJ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cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29uc3QgZnJvbSBcIi4vTG9hZGluZ0NvbnN0XCI7XHJcbmltcG9ydCBBcHBIZWxwZXIgZnJvbSBcIi4uL3Rvb2wvQXBwSGVscGVyXCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyRW50cmFuY2VUeXBlIH0gZnJvbSBcIi4uLy4uL2hhbGxjb21tb24vbW9kZWwvU2VydmljZXJNb2RlbFwiO1xyXG5pbXBvcnQgQXBwSG90VXBkYXRlUHJveHkgZnJvbSBcIi4vQXBwSG90VXBkYXRlUHJveHlcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdNZWRpYXRvciBleHRlbmRzIHB1cmVtdmMuTWVkaWF0b3Ige1xyXG4gICAgcHVibGljIHN0YXRpYyBOQU1FOiBzdHJpbmcgPSBcIkxvYWRpbmdWaWV3TWVkaWF0b3JcIlxyXG4gICAgdmlld0NvbXBvbmVudDogY2MuQ29tcG9uZW50O1xyXG4gICAgaW5mb0xhYmVsOiBjYy5MYWJlbDtcclxuICAgIHByb2dyZXNzTGFiZWw6Y2MuTGFiZWw7XHJcbiAgICBsb2FkaW5nQmFyOiBjYy5Ob2RlO1xyXG4gICAgcmVzdG9yZU5vZGU6IGNjLk5vZGU7XHJcbiAgICB2ZXJzaW9uTGFiZWw6Y2MuTGFiZWw7XHJcblxyXG4gICAgLy/og4zmma/lm75cclxuICAgIHByaXZhdGUgYmc6Y2MuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSByb290Tm9kZTogY2MuTm9kZTsgIC8vIFxyXG5cclxuICAgIF90aW1lT3V0OmFueVxyXG4gICAgY3VyUGVyID0gMDtcclxuICAgIHByaXZhdGUgYnV0dG9uVG91Y2ggPSBmYWxzZTtcclxuICAgIGNvbnN0cnVjdG9yKHZpZXdDb21wb25lbnQ6IGNjLkNvbXBvbmVudCkge1xyXG4gICAgICAgIHN1cGVyKFZpZXdNZWRpYXRvci5OQU1FLCB2aWV3Q29tcG9uZW50KVxyXG4gICAgICAgIHRoaXMuaW5pdE5vZGUoKVxyXG4gICAgfVxyXG5cclxuICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHMoKTogYW55IHtcclxuICAgICAgICBzdXBlci5saXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzKCk7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgQ29uc3QuQ0hFQ0tfVVBEQVRFLFxyXG4gICAgICAgICAgICBDb25zdC5TSE9XX0NIRUNLX0xBQkVMLFxyXG4gICAgICAgICAgICBDb25zdC5TSE9XX1BST0dSRVNTX0xBQkVMLFxyXG4gICAgICAgICAgICBDb25zdC5TSE9XX1BST0dSRVNTX0JBUixcclxuICAgICAgICAgICAgQ29uc3QuVVBEQVRFX0xPQURJTkdfVkVSU0lPTixcclxuICAgICAgICAgICAgQ29uc3QuVVBEQVRFX0FQUF9JTkZPLFxyXG4gICAgICAgICAgICBDb25zdC5EVU5fSU5JVF9GSU5JU0gsXHJcbiAgICAgICAgICAgIENvbnN0LkNIQ0VLX0hPVFVQREFURV9QUk9HUkVTUyxcclxuICAgICAgICAgICAgQ29uc3QuQ0xFQVJfTE9BRElOR19USU1FUlxyXG4gICAgICAgIF1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVOb3RpZmljYXRpb24obm90aWZpY2F0aW9uKSB7XHJcbiAgICAgICAgbGV0IG1zZ05hbWUgPSBub3RpZmljYXRpb24uZ2V0TmFtZSgpO1xyXG4gICAgICAgIGxldCBtc2dkYXRhID0gbm90aWZpY2F0aW9uLmdldEJvZHkoKTtcclxuICAgICAgICBsZXQgbXNnVHlwZSA9IG5vdGlmaWNhdGlvbi5nZXRUeXBlKCk7XHJcbiAgICAgICAgaWYgKG1zZ05hbWUgPT0gQ29uc3QuU0hPV19DSEVDS19MQUJFTCkge1xyXG4gICAgICAgICAgICBsZXQgbGFiU3RyID0gbXNnZGF0YS5wYXJtXHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q2hlY2tMYWJlbFN0cmluZyhsYWJTdHIpXHJcbiAgICAgICAgfWVsc2UgaWYobXNnTmFtZSA9PSBDb25zdC5TSE9XX1BST0dSRVNTX0xBQkVMKXtcclxuICAgICAgICAgICAgbGV0IGxhYlN0ciA9IG1zZ2RhdGEucGFybVxyXG4gICAgICAgICAgICB0aGlzLnNldFByb2dyZXNzTGFiZWxTdHJpbmcobGFiU3RyKVxyXG4gICAgICAgIH1lbHNlIGlmIChtc2dOYW1lID09IENvbnN0LlNIT1dfUFJPR1JFU1NfQkFSKSB7XHJcbiAgICAgICAgICAgIGxldCBwZXJOdW0gPSBtc2dkYXRhLnBhcm1cclxuICAgICAgICAgICAgdGhpcy51cGRhdGVMb2FkaW5nQmFyKHBlck51bSlcclxuICAgICAgICB9ZWxzZSBpZiAobXNnTmFtZSA9PSBDb25zdC5VUERBVEVfTE9BRElOR19WRVJTSU9OKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TmF0aXZlVmVyc2lvbigpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG1zZ05hbWUgPT0gQ29uc3QuVVBEQVRFX0FQUF9JTkZPKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQXBwSW5mbygpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG1zZ05hbWUgPT0gQ29uc3QuQ0xFQVJfTE9BRElOR19USU1FUil7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcigpXHJcbiAgICAgICAgfWVsc2UgaWYgKG1zZ05hbWUgPT0gQ29uc3QuRFVOX0lOSVRfRklOSVNIKXtcclxuICAgICAgICAgICAgdGhpcy5vblREdW5Jbml0RmluaXNoKCk7XHJcbiAgICAgICAgfWVsc2UgaWYgKG1zZ05hbWUgPT0gQ29uc3QuQ0hDRUtfSE9UVVBEQVRFX1BST0dSRVNTKXtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0hvdFVwZGF0ZVByb2dyZXNzKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpbml0Tm9kZSgpIHtcclxuICAgICAgICAvLyB0aGlzLnJvb3ROb2RlID0gdGhpcy52aWV3Q29tcG9uZW50Lm5vZGU7XHJcbiAgICAgICAgdGhpcy5yb290Tm9kZSA9IGNjLmZpbmQoXCJMb2FkaW5nVmlld1wiLCB0aGlzLnZpZXdDb21wb25lbnQubm9kZSk7XHJcbiAgICAgICAgbGV0IGtlZnVCdG4gPSBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sodGhpcy5yb290Tm9kZSxcImtlZnVOb2RlXCIsdGhpcy5vbktlRnVCdG5DbGljayx0aGlzKVxyXG4gICAgICAgIGtlZnVCdG4uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIEdsb2JhbC5VSUhlbHBlci5hZGRDb21tb25DbGljayh0aGlzLnJvb3ROb2RlLFwiZ254X2d1YW53YW5nXCIsdGhpcy5vbkd1YW53YW5nQ2xpY2ssdGhpcylcclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sodGhpcy5yb290Tm9kZSxcImxvYWRpbmdOb2RlL3Jlc3RvcmVcIix0aGlzLm9uUmVzdG9yZUNsaWNrLHRoaXMpXHJcbiAgICAgICAgbGV0IGxvYWRpbmdOb2RlID0gdGhpcy5yb290Tm9kZS5nZXRDaGlsZEJ5TmFtZShcImxvYWRpbmdOb2RlXCIpO1xyXG4gICAgICAgIGxldCBsb2FkaW5nQmFyID0gbG9hZGluZ05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsb2FkaW5nQmFyXCIpXHJcbiAgICAgICAgdGhpcy5yZXN0b3JlTm9kZSA9IGxvYWRpbmdOb2RlLmdldENoaWxkQnlOYW1lKFwicmVzdG9yZVwiKVxyXG4gICAgICAgIGxldCBjaGVja05vZGUgPSBsb2FkaW5nTm9kZS5nZXRDaGlsZEJ5TmFtZShcImNoZWNrTm9kZVwiKVxyXG4gICAgICAgIGxldCBpbmZvTGFiZWwgPSBjaGVja05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbmZvTGFiZWxcIilcclxuICAgICAgICBsZXQgdmVyc2lvbk5vZGUgPSB0aGlzLnJvb3ROb2RlLmdldENoaWxkQnlOYW1lKFwidmVyc2lvbkxhYmVsXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLnJlc3RvcmVOb2RlKXtcclxuICAgICAgICAgICAgdGhpcy5yZXN0b3JlTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbG9hZGluZ0Jhci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnByb2dyZXNzTGFiZWwgPSBsb2FkaW5nQmFyLmdldENoaWxkQnlOYW1lKFwiaW1nX2RoZ1wiKS5nZXRDaGlsZEJ5TmFtZShcImxiUGVyXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5pbmZvTGFiZWwgPSBpbmZvTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmxvYWRpbmdCYXIgPSBsb2FkaW5nQmFyO1xyXG4gICAgICAgIHRoaXMudmVyc2lvbkxhYmVsID0gdmVyc2lvbk5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMuc2V0TmF0aXZlVmVyc2lvbigpXHJcbiAgICAgICAgdGhpcy5idXR0b25Ub3VjaCA9IGZhbHNlXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25HdWFud2FuZ0NsaWNrKClcclxuICAgIHtcclxuICAgICAgICBsZXQgdXJsID0gR2xvYmFsLlNldHRpbmcuVXJscy5kb3duTG9hZFVybFxyXG4gICAgICAgIGNjLnN5cy5vcGVuVVJMKHVybCk7XHJcbiAgICB9XHJcbiAgICAvL+aJi+WKqOS/ruWkjeaMiemSrlxyXG4gICAgcHJpdmF0ZSBvblJlc3RvcmVDbGljaygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5idXR0b25Ub3VjaCA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uVG91Y2ggPSB0cnVlXHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kTWVzc2FnZUJveFwiLCBcIuaYr+WQpuW8gOWni+eJiOacrOS/ruWkje+8n1wiLCAxLCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25Ub3VjaCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBsZXQgaG90VXBkYXRlUHJveHkgPTxBcHBIb3RVcGRhdGVQcm94eT50aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KEFwcEhvdFVwZGF0ZVByb3h5Lk5BTUUpO1xyXG4gICAgICAgICAgICAgICAgaG90VXBkYXRlUHJveHkucmVzdGFydENoZWNrVXBkYXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgfSwgKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uVG91Y2ggPSBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbktlRnVCdG5DbGljaygpe1xyXG4gICAgICAgIC8v5omT5byA5a6i5pyN55WM6Z2iXHJcbiAgICAgICAgLy8gbGV0IHVybDpzdHJpbmcgPSBcImh0dHBzOi8vZTE5LmVudHJ5Y2hhdC5jb20vY2hhdC9jaGF0Q2xpZW50L2NoYXRib3guanNwP2NvbXBhbnlJRD0xMTM3NzIyJmNvbmZpZ0lEPTI0ODEmamlkPTE4ODEzNjk0MjUmcz0xXCI7XHJcbiAgICAgICAgLy8gY2Muc3lzLm9wZW5VUkwodXJsKTtcclxuXHJcbiAgICAgICAgLy8gaWYgKEdsb2JhbC5TZXR0aW5nLmxvZ2luS2VGdVR5cGUgPT0gMyl7XHJcbiAgICAgICAgLy8gICAgIEdsb2JhbC5DaGF0U2VydmVyLnNlcnZlclR5cGUgPSBTZXJ2aWNlRW50cmFuY2VUeXBlLkxvZ2luU2VydmljZTtcclxuICAgICAgICAvLyAgICAgR2xvYmFsLkNoYXRTZXJ2ZXIub3RoZXJTZXR0aW5nKG51bGwpO1xyXG4gICAgICAgIC8vIH1lbHNlIHtcclxuICAgICAgICAvLyAgICAgY2Muc3lzLm9wZW5VUkwoR2xvYmFsLlRvb2xraXQuRGVhbFdpdGhVcmwoR2xvYmFsLlNldHRpbmcuVXJscy5vbmxpbmVTZXJ2aWNlKSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIEdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJTZXJ2aWNlck1vZGVsXCIpLmVudGVyQ3VzdG9tZXJTZXJ2aWNlKEN1c3RvbWVyRW50cmFuY2VUeXBlLkxvZ2luU2VydmljZSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2hlY2tMYWJlbFN0cmluZyhsYWJlbDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYodGhpcy5pbmZvTGFiZWwgJiYgdGhpcy5pbmZvTGFiZWwubm9kZSAmJiB0aGlzLmluZm9MYWJlbC5ub2RlLmlzVmFsaWQpXHJcbiAgICAgICAgICAgIHRoaXMuaW5mb0xhYmVsLnN0cmluZyA9IGxhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFByb2dyZXNzTGFiZWxTdHJpbmcobGFiZWw6IHN0cmluZykge1xyXG4gICAgICAgIGlmKHRoaXMucHJvZ3Jlc3NMYWJlbCAmJiB0aGlzLnByb2dyZXNzTGFiZWwubm9kZSAmJiB0aGlzLnByb2dyZXNzTGFiZWwubm9kZS5pc1ZhbGlkKVxyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzTGFiZWwuc3RyaW5nID0gbGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TmF0aXZlVmVyc2lvbigpe1xyXG4gICAgICAgIGxldCB2ZXJzaW9uID0gIEdsb2JhbC5Ub29sa2l0LmdlbkxvYWRpbmdBcHBJbmZvKCk7XHJcbiAgICAgICAvLyBsZXQgdmVyc2lvbiA9ICBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5oYWxsTmV3VmVyc2lvbjtcclxuICAgICAgICBMb2dnZXIubG9nKFwiLS0tLS0tLS0tLS0tLS0tLXZlcnNpb24tLS0tLS0tLS0tLS1cIiArIHZlcnNpb24pXHJcbiAgICAgICAgaWYodGhpcy52ZXJzaW9uTGFiZWwgJiYgY2MuaXNWYWxpZCh0aGlzLnZlcnNpb25MYWJlbC5ub2RlKSl7XHJcbiAgICAgICAgICAgIHRoaXMudmVyc2lvbkxhYmVsLnN0cmluZyA9IHZlcnNpb25cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25URHVuSW5pdEZpbmlzaCgpe1xyXG4gICAgICAgIHRoaXMuc2V0TmF0aXZlVmVyc2lvbigpXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgdXBkYXRlQXBwSW5mbygpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHZlcnNpb24gPSBHbG9iYWwuVG9vbGtpdC5nZW5BcHBJbmZvKCk7XHJcbiAgICAgICAgLy9sZXQgdmVyc2lvbiA9IEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLmhhbGxOZXdWZXJzaW9uXHJcbiAgICAgICAgaWYodGhpcy52ZXJzaW9uTGFiZWwgJiYgdGhpcy52ZXJzaW9uTGFiZWwubm9kZS5pc1ZhbGlkKVxyXG4gICAgICAgICAgICB0aGlzLnZlcnNpb25MYWJlbC5zdHJpbmcgPSB2ZXJzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUxvYWRpbmdCYXIocGVyOiBudW1iZXIpIHtcclxuICAgICAgICBpZih0aGlzLmxvYWRpbmdCYXIgPT0gbnVsbCB8fCAhdGhpcy5sb2FkaW5nQmFyLmlzVmFsaWQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgcGFydGljbGUgPSB0aGlzLmxvYWRpbmdCYXIuZ2V0Q2hpbGRCeU5hbWUoXCJwYXJ0aWNsZVwiKVxyXG4gICAgICAgIGlmIChwZXIgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ0Jhci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZih0aGlzLnJlc3RvcmVOb2RlICYmIHRoaXMucmVzdG9yZU5vZGUuYWN0aXZlID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdG9yZU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3NOb2RlID0gdGhpcy5sb2FkaW5nQmFyLmdldENoaWxkQnlOYW1lKFwiYmFyXzFfMVwiKVxyXG4gICAgICAgICAgICAvLyBsZXQgcHJvZ3Jlc3NCYXIgPSBwcm9ncmVzc05vZGUuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKVxyXG4gICAgICAgICAgICAvLyBwcm9ncmVzc0Jhci5wcm9ncmVzcyA9IHBlclxyXG4gICAgICAgICAgICBsZXQgaW1nX2RoZyA9IHRoaXMubG9hZGluZ0Jhci5nZXRDaGlsZEJ5TmFtZShcImltZ19kaGdcIik7XHJcbiAgICAgICAgICAgIGltZ19kaGcueCA9IHByb2dyZXNzTm9kZS54K3Byb2dyZXNzTm9kZS53aWR0aCpwZXJcclxuICAgICAgICAgICAgcHJvZ3Jlc3NOb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLmZpbGxSYW5nZSA9IHBlclxyXG4gICAgICAgICAgICBpZiAocGFydGljbGUuYWN0aXZlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vcGFydGljbGUucG9zaXRpb24gPSBjYy52Myhwcm9ncmVzc05vZGUueCArIHByb2dyZXNzQmFyLnRvdGFsTGVuZ3RoKnBlcixwcm9ncmVzc05vZGUueSlcclxuICAgICAgICAgICAgdGhpcy5jdXJQZXIgPSBwZXI7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tIb3RVcGRhdGVQcm9ncmVzcygpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgcGFydGljbGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ0Jhci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5yZXN0b3JlTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tIb3RVcGRhdGVQcm9ncmVzcygpe1xyXG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcigpXHJcbiAgICAgICAgaWYgKHRoaXMuY3VyUGVyID4gMCAmJiB0aGlzLmN1clBlciA8IDEpe1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lT3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJ1cGRhdGVMb2FkaW5nQmFyLS0tLee9kee7nOW8guW4uO+8jOivt+mHjeaWsOWKoOi9vVwiKVxyXG4gICAgICAgICAgICAgICAgbGV0IGhvdFVwZGF0ZVByb3h5ID08QXBwSG90VXBkYXRlUHJveHk+dGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShBcHBIb3RVcGRhdGVQcm94eS5OQU1FKTtcclxuICAgICAgICAgICAgICAgIGhvdFVwZGF0ZVByb3h5LnJlc3RhcnRDaGVja1VwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9LCAxMDAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyVGltZXIoKXtcclxuICAgICAgICBpZiAodGhpcy5fdGltZU91dCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZU91dClcclxuICAgICAgICAgICAgdGhpcy5fdGltZU91dCA9IG51bGxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==