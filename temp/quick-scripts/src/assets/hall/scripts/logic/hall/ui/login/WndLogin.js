"use strict";
cc._RF.push(module, '32a05CYZ51IOL7BzC0TnHza', 'WndLogin');
// hall/scripts/logic/hall/ui/login/WndLogin.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var HallStorageKey_1 = require("../../../hallcommon/const/HallStorageKey");
var AppHelper_1 = require("../../../core/tool/AppHelper");
var HallModel_1 = require("../../../hallcommon/model/HallModel");
var ServicerModel_1 = require("../../../hallcommon/model/ServicerModel");
var CustomApp_1 = require("../../../hallcommon/app/CustomApp");
var WndLogin = /** @class */ (function (_super) {
    __extends(WndLogin, _super);
    function WndLogin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showWx = true;
        _this.vistorLoginx = 0;
        _this.phoneLoginx = 0;
        _this.clickTagMap = {};
        return _this;
        // private onRegisterBtnClick(){
        //     Global.UI.show("WndRegist");
        // }
    }
    WndLogin.prototype.onInit = function () {
        this.name = "WndLogin";
        this.layer = "MainLayer";
        this.resPath = "hall/prefabs/ui/LoginUI";
        //animType
        this.model = Global.ModelManager.getModel("LoginModel");
    };
    WndLogin.prototype.initView = function () {
        this.guestBtn = this.addCommonClick("btnContainer/guestBtn", this.onGuestBtnClick, this, cc.Button.Transition.SCALE, 2);
        this.addCommonClick("btnContainer/wxBtn", this.onWxBtnClick, this, cc.Button.Transition.SCALE, 2);
        this.phoneBtn = this.addCommonClick("btnContainer/phoneBtn", this.onPhoneBtnClick, this, cc.Button.Transition.SCALE, 2);
        // this.addCommonClick("btnContainer/registerBtn", this.onRegisterBtnClick, this, cc.Button.Transition.SCALE, 2);
        this.addCommonClick("btnContainer/gnx_kefu", this.onKefuClick, this, cc.Button.Transition.SCALE, 2);
        this.addCommonClick("btnContainer/gnx_guanwang", this.onGuanwangClick, this, cc.Button.Transition.SCALE, 2);
        this.registBtn = this.addCommonClick("btnContainer/RegistBtn", this.onRegistBtnClick, this, cc.Button.Transition.SCALE, 2);
        this.kefuNode = this.getChild("btnContainer/gnx_kefu");
        this.kefuSpot = this.getChild("btnContainer/gnx_kefu/hongdian");
        this.kefuSpot.active = false;
        this.guangWangNode = this.getChild("btnContainer/gnx_guanwang");
        var widgets = this.node.getComponentsInChildren(cc.Widget);
        this.versionLabel = this.getComponent("versionLabel", cc.Label);
        this.versionLabel.string = Global.Toolkit.genAppInfo();
        // this.versionLabel.string = Global.HotUpdateManager.hallNewVersion;
        if (widgets && widgets.length > 0) {
            for (var i = 0; i < widgets.length; i++) {
                widgets[i].target = cc.Canvas.instance.node;
            }
        }
        this.showWx = Global.Toolkit.checkIsPlatformShowWX();
        if (!this.showWx)
            this.getChild("btnContainer/wxBtn").active = false;
        // if (Global.Setting.weixinLoginDisable){
        //     this.getChild("btnContainer/wxBtn").active = false;
        // }
        //this.effectNode = this.getChild("effect");
        this.bg = this.getComponent("bg", cc.Sprite);
        //this.logo = this.getComponent("logo", cc.Sprite);
        this.lgEffect = this.getChild("lgEffect");
        var config = Global.customApp.getAppConfig();
        if (!config) {
            this.lgEffect.active = Global.customApp.showLoginEff;
        }
        else {
            this.lgEffect.active = config.showLoginEff;
        }
        this.guestBtn = this.getChild("btnContainer/guestBtn");
        if (this.guestBtn) {
            this.vistorLoginx = this.guestBtn.x;
        }
        this.phoneBtn = this.getChild("btnContainer/phoneBtn");
        if (this.phoneBtn) {
            this.phoneLoginx = this.phoneBtn.x;
        }
        this.clickTagMap["wxTag"] = true;
        this.clickTagMap["vistorTag"] = true;
        this.clickTagMap["phoneTag"] = true;
    };
    WndLogin.prototype.onRegistBtnClick = function () {
        Global.UI.show("WndRegist");
    };
    WndLogin.prototype.onOpen = function () {
        Global.HallServer.stop();
        this.setBottomBtnActive();
        this.CheckKefu();
        Global.Event.on(GlobalEvent.ShowRedSpot, this, this.showRedSpot);
        Global.Event.on(GlobalEvent.CloseRedSpot, this, this.closeRedSpot);
        if (Global.Setting.enableAutoLogin && this.model.firstLogin) {
            this.model.firstLogin = false;
            this.doAutoLogin();
        }
        var node = cc.find("Canvas/loading");
        if (node)
            node.active = false;
    };
    WndLogin.prototype.CheckKefu = function () {
        var data = null;
        var model = Global.ModelManager.getModel("ServicerModel");
        if (model) {
            data = model.getServiceInfo(ServicerModel_1.CustomerEntranceType.LoginService);
        }
        if (!data || !data.status) {
            this.kefuNode.active = false;
        }
        else {
            this.kefuNode.active = true;
        }
    };
    WndLogin.prototype.showRedSpot = function (data) {
        var redSpotType = data[1];
        switch (redSpotType) {
            case HallModel_1.HallRedSpotType.LoginKefu:
                {
                    this.kefuSpot.active = true;
                    break;
                }
        }
    };
    WndLogin.prototype.closeRedSpot = function (redSpotType) {
        switch (redSpotType) {
            case HallModel_1.HallRedSpotType.LoginKefu:
                {
                    this.kefuSpot.active = false;
                    break;
                }
        }
    };
    WndLogin.prototype.onKefuClick = function () {
        Global.ModelManager.getModel("ServicerModel").enterCustomerService(ServicerModel_1.CustomerEntranceType.LoginService);
    };
    WndLogin.prototype.onGuanwangClick = function () {
        var url = Global.Setting.Urls.downLoadUrl;
        cc.sys.openURL(url);
    };
    WndLogin.prototype.setBottomBtnActive = function () {
        if (this.guestBtn) {
            this.SetBtnPos(this.guestBtn, CustomApp_1.BTNINDEX.VistorLoginBtn);
        }
        var wxBtn = this.getChild("btnContainer/wxBtn");
        if (wxBtn) {
            this.SetBtnPos(wxBtn, CustomApp_1.BTNINDEX.WeChatLoginBtn);
        }
        if (this.phoneBtn) {
            this.SetBtnPos(this.phoneBtn, CustomApp_1.BTNINDEX.PhoneLoginBtn);
        }
        if (this.registBtn) {
            this.SetBtnPos(this.registBtn, CustomApp_1.BTNINDEX.RegistBtn);
        }
        var offical = this.getChild("btnContainer/gnx_guanwang");
        if (offical) {
            this.SetBtnPos(offical, CustomApp_1.BTNINDEX.OfficalBtn);
        }
        var service = this.getChild("btnContainer/gnx_kefu");
        if (service) {
            this.SetBtnPos(service, CustomApp_1.BTNINDEX.ServiceBtn);
        }
        var wxFlag = this.showWx && AppHelper_1.default.checkWxkey(false) && !Global.Setting.weixinLoginDisable;
        // if(cc.sys.platform == cc.sys.IPHONE )
        // {
        //     wxFlag = wxFlag && Global.Setting.isAppStoreEnableWXSDK
        // }
        wxBtn.active = wxFlag;
        this.guestBtn.active = !Global.Setting.vistorLoginLimited;
        this.registBtn.active = !Global.Setting.registLimited;
        var config = Global.customApp.getAppConfig();
        if (config && config.layout != null && config.layout != undefined) {
            var layOut = config.layout;
            if (layOut == 1) // 1表示按钮横向排榜 0 竖向
             {
                if (!wxFlag) {
                    var rightFlag = this.guestBtn.x > this.phoneBtn.x; //微信不显示时判断哪个按钮在右边，右边按钮往左移动，左边按钮往右边移动
                    if (rightFlag) {
                        this.guestBtn.x -= 120;
                        this.phoneBtn.x += 120;
                        return;
                    }
                    this.guestBtn.x += 120;
                    this.phoneBtn.x -= 120;
                }
            }
            else {
                if (!wxFlag) {
                    var upFlag = this.guestBtn.y > this.phoneBtn.y; //微信不显示时判断哪个按钮在上面，上面按钮往下移动，下面按钮往上移动
                    if (upFlag) {
                        this.guestBtn.y -= 40;
                        this.phoneBtn.y += 40;
                        return;
                    }
                    this.guestBtn.y += 40;
                    this.phoneBtn.y -= 40;
                }
            }
            return;
        }
        if (!wxFlag) {
            this.guestBtn.x = this.vistorLoginx;
            this.phoneBtn.x = this.phoneLoginx;
            var rightFlag = this.guestBtn.x > this.phoneBtn.x;
            if (rightFlag) {
                this.guestBtn.x -= 120;
                this.phoneBtn.x += 120;
                return;
            }
            this.guestBtn.x += 120;
            this.phoneBtn.x -= 120;
        }
    };
    WndLogin.prototype.SetBtnPos = function (node, btnIndex) {
        var config = Global.customApp.getAppConfig();
        if (!config || !cc.isValid(node)) {
            return;
        }
        switch (btnIndex) {
            case CustomApp_1.BTNINDEX.OfficalBtn:
                if (config.officalBtnPos)
                    node.setPosition(cc.v2(config.officalBtnPos[0], config.officalBtnPos[1]));
                break;
            case CustomApp_1.BTNINDEX.RegistBtn:
                if (config.registBtnPos)
                    node.setPosition(cc.v2(config.registBtnPos[0], config.registBtnPos[1]));
                break;
            case CustomApp_1.BTNINDEX.ServiceBtn:
                if (config.serviceBtnPos)
                    node.setPosition(cc.v2(config.serviceBtnPos[0], config.serviceBtnPos[1]));
                break;
            case CustomApp_1.BTNINDEX.VistorLoginBtn:
                if (config.vistorLoginBtnPos)
                    node.setPosition(cc.v2(config.vistorLoginBtnPos[0], config.vistorLoginBtnPos[1]));
                break;
            case CustomApp_1.BTNINDEX.WeChatLoginBtn:
                if (config.wechatLoginBtnPos)
                    node.setPosition(cc.v2(config.wechatLoginBtnPos[0], config.wechatLoginBtnPos[1]));
                break;
            case CustomApp_1.BTNINDEX.PhoneLoginBtn:
                if (config.phoneLoginBtnPos)
                    node.setPosition(cc.v2(config.phoneLoginBtnPos[0], config.phoneLoginBtnPos[1]));
                break;
            default:
                break;
        }
    };
    WndLogin.prototype.doAutoLogin = function () {
        //隐藏底部三个按钮
        // this.setBottomBtnActive(false)
        var token = Global.Setting.storage.get(HallStorageKey_1.default.Token);
        var uid = Global.Setting.storage.get(HallStorageKey_1.default.Uid);
        if (token && token != "" && uid != "") {
            this.model.reqAutoLogin(token, Number(uid), null);
        }
    };
    WndLogin.prototype.onGuestBtnClick = function () {
        var _this = this;
        if (!this.clickTagMap["vistorTag"]) {
            return;
        }
        this.clickTagMap["vistorTag"] = false;
        this.clickTagMap["vistorTimer"] = setTimeout(function () {
            _this.clickTagMap["vistorTag"] = true;
        }, 1000);
        this.model.reqVisitorLogin();
    };
    WndLogin.prototype.onWxBtnClick = function () {
        var _this = this;
        if (!this.clickTagMap["wxTag"]) {
            return;
        }
        this.clickTagMap["wxTag"] = false;
        this.clickTagMap["wxTimer"] = setTimeout(function () {
            _this.clickTagMap["wxTag"] = true;
        }, 1000);
        if (!AppHelper_1.default.getAppWXLoginEnable())
            return;
        Global.NativeEvent.checkWXInstall(function (retInfo) {
            if (!retInfo) {
                Logger.error("checkWXInstall callback error retInfo = null");
                return;
            }
            if (retInfo.result == 0) {
                Global.NativeEvent.startWXLogin(function (wxInfo) {
                    if (!wxInfo) {
                        Logger.error("startWXLogin callback error wxInfo = null");
                        return;
                    }
                    Logger.log("------------------onWxBtnClick callback wxInfo " + JSON.stringify(wxInfo));
                    if (wxInfo.result == 0) {
                        var accesstoken = wxInfo.funcParam;
                        _this.model.reqWxLogin(accesstoken, 1);
                    }
                    else {
                        Global.UI.fastTip("微信登录失败");
                    }
                });
            }
            else {
                Global.UI.showSingleBox("请先安装微信", null);
            }
        });
    };
    WndLogin.prototype.onPhoneBtnClick = function () {
        Global.UI.show("WndPhoneLogin");
    };
    WndLogin.prototype.onDispose = function () {
        _super.prototype.onDispose.call(this);
        this.resetTag();
        Global.Event.off(GlobalEvent.ShowRedSpot, this, this.showRedSpot);
        Global.Event.off(GlobalEvent.CloseRedSpot, this, this.closeRedSpot);
    };
    WndLogin.prototype.onClose = function () {
        this.resetTag();
        Global.Event.off(GlobalEvent.ShowRedSpot, this, this.showRedSpot);
        Global.Event.off(GlobalEvent.CloseRedSpot, this, this.closeRedSpot);
    };
    WndLogin.prototype.resetTag = function () {
        if (this.clickTagMap["wxTimer"]) {
            clearTimeout(this.clickTagMap["wxTimer"]);
        }
        if (this.clickTagMap["vistorTimer"]) {
            clearTimeout(this.clickTagMap["vistorTimer"]);
        }
        this.clickTagMap["wxTag"] = true;
        this.clickTagMap["vistorTag"] = true;
    };
    return WndLogin;
}(WndBase_1.default));
exports.default = WndLogin;

cc._RF.pop();