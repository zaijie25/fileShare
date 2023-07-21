
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/login/WndLogin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxsb2dpblxcV25kTG9naW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQStDO0FBRS9DLDJFQUFzRTtBQUN0RSwwREFBcUQ7QUFDckQsaUVBQXNFO0FBQ3RFLHlFQUErRTtBQUMvRSwrREFBNkQ7QUFHN0Q7SUFBc0MsNEJBQU87SUFBN0M7UUFBQSxxRUF5WUM7UUF2WVcsWUFBTSxHQUFHLElBQUksQ0FBQztRQVlkLGtCQUFZLEdBQUcsQ0FBQyxDQUFBO1FBQ2hCLGlCQUFXLEdBQUcsQ0FBQyxDQUFBO1FBRWYsaUJBQVcsR0FBRyxFQUFFLENBQUE7O1FBb1h4QixnQ0FBZ0M7UUFDaEMsbUNBQW1DO1FBQ25DLElBQUk7SUFFUixDQUFDO0lBaFhhLHlCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztRQUN6QyxVQUFVO1FBQ1YsSUFBSSxDQUFDLEtBQUssR0FBZSxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRVMsMkJBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hILElBQUksQ0FBQyxjQUFjLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FB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QUssQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRXRFLENBQUM7SUFDRCwwQkFBTyxHQUFQO1FBRUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsMkJBQVEsR0FBUjtRQUVJLElBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFDOUI7WUFDSSxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO1NBQzVDO1FBQ0QsSUFBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxFQUNsQztZQUNJLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7U0FDaEQ7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQTtRQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQTtJQUd4QyxDQUFDO0lBTUwsZUFBQztBQUFELENBellBLEFBeVlDLENBellxQyxpQkFBTyxHQXlZNUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV25kQmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9XbmRCYXNlXCI7XHJcbmltcG9ydCBMb2dpbk1vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL0xvZ2luTW9kZWxcIjtcclxuaW1wb3J0IEhhbGxTdG9yYWdlS2V5IGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL2NvbnN0L0hhbGxTdG9yYWdlS2V5XCI7XHJcbmltcG9ydCBBcHBIZWxwZXIgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdG9vbC9BcHBIZWxwZXJcIjtcclxuaW1wb3J0IHsgSGFsbFJlZFNwb3RUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvSGFsbE1vZGVsXCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyRW50cmFuY2VUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvU2VydmljZXJNb2RlbFwiO1xyXG5pbXBvcnQgeyBCVE5JTkRFWCB9IGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL2FwcC9DdXN0b21BcHBcIjtcclxuaW1wb3J0IFN5c3RlbUluZm8gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2V0dGluZy9TeXN0ZW1JbmZvXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXbmRMb2dpbiBleHRlbmRzIFduZEJhc2Uge1xyXG4gICAgcHJpdmF0ZSBtb2RlbDogTG9naW5Nb2RlbDtcclxuICAgIHByaXZhdGUgc2hvd1d4ID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgdmVyc2lvbkxhYmVsOmNjLkxhYmVsO1xyXG5cclxuICAgIHByaXZhdGUga2VmdU5vZGU6Y2MuTm9kZTtcclxuICAgIHByaXZhdGUga2VmdVNwb3Q6Y2MuTm9kZTtcclxuICAgIHByaXZhdGUgZ3VhbmdXYW5nTm9kZTpjYy5Ob2RlO1xyXG5cclxuICAgIHByaXZhdGUgYmc6Y2MuU3ByaXRlO1xyXG4gICAgLy9wcml2YXRlIGxvZ286Y2MuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSBlZmZlY3ROb2RlOmNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGxnRWZmZWN0OmNjLk5vZGU7XHJcblxyXG4gICAgcHJpdmF0ZSB2aXN0b3JMb2dpbnggPSAwXHJcbiAgICBwcml2YXRlIHBob25lTG9naW54ID0gMFxyXG5cclxuICAgIHByaXZhdGUgY2xpY2tUYWdNYXAgPSB7fVxyXG5cclxuICAgIHByaXZhdGUgZ3Vlc3RCdG4gOmNjLk5vZGVcclxuXHJcbiAgICBwcml2YXRlIHBob25lQnRuIDogY2MuTm9kZVxyXG5cclxuICAgIHByaXZhdGUgcmVnaXN0QnRuIDpjYy5Ob2RlXHJcblxyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZExvZ2luXCI7XHJcbiAgICAgICAgdGhpcy5sYXllciA9IFwiTWFpbkxheWVyXCI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvTG9naW5VSVwiO1xyXG4gICAgICAgIC8vYW5pbVR5cGVcclxuICAgICAgICB0aGlzLm1vZGVsID0gPExvZ2luTW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIkxvZ2luTW9kZWxcIik7ICBcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5ndWVzdEJ0biA9IHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJidG5Db250YWluZXIvZ3Vlc3RCdG5cIiwgdGhpcy5vbkd1ZXN0QnRuQ2xpY2ssIHRoaXMsIGNjLkJ1dHRvbi5UcmFuc2l0aW9uLlNDQUxFLCAyKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYnRuQ29udGFpbmVyL3d4QnRuXCIsIHRoaXMub25XeEJ0bkNsaWNrLCB0aGlzLCBjYy5CdXR0b24uVHJhbnNpdGlvbi5TQ0FMRSwgMik7XHJcbiAgICAgICAgdGhpcy5waG9uZUJ0biA9IHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJidG5Db250YWluZXIvcGhvbmVCdG5cIiwgdGhpcy5vblBob25lQnRuQ2xpY2ssIHRoaXMsIGNjLkJ1dHRvbi5UcmFuc2l0aW9uLlNDQUxFLCAyKTtcclxuICAgICAgICAvLyB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYnRuQ29udGFpbmVyL3JlZ2lzdGVyQnRuXCIsIHRoaXMub25SZWdpc3RlckJ0bkNsaWNrLCB0aGlzLCBjYy5CdXR0b24uVHJhbnNpdGlvbi5TQ0FMRSwgMik7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImJ0bkNvbnRhaW5lci9nbnhfa2VmdVwiLCB0aGlzLm9uS2VmdUNsaWNrLCB0aGlzLCBjYy5CdXR0b24uVHJhbnNpdGlvbi5TQ0FMRSwgMik7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImJ0bkNvbnRhaW5lci9nbnhfZ3VhbndhbmdcIiwgdGhpcy5vbkd1YW53YW5nQ2xpY2ssIHRoaXMsIGNjLkJ1dHRvbi5UcmFuc2l0aW9uLlNDQUxFLCAyKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdEJ0biA9IHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJidG5Db250YWluZXIvUmVnaXN0QnRuXCIsIHRoaXMub25SZWdpc3RCdG5DbGljaywgdGhpcywgY2MuQnV0dG9uLlRyYW5zaXRpb24uU0NBTEUsIDIpO1xyXG5cclxuICAgICAgICB0aGlzLmtlZnVOb2RlID0gdGhpcy5nZXRDaGlsZChcImJ0bkNvbnRhaW5lci9nbnhfa2VmdVwiKTtcclxuICAgICAgICB0aGlzLmtlZnVTcG90ID0gdGhpcy5nZXRDaGlsZChcImJ0bkNvbnRhaW5lci9nbnhfa2VmdS9ob25nZGlhblwiKTtcclxuICAgICAgICB0aGlzLmtlZnVTcG90LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZ3VhbmdXYW5nTm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJidG5Db250YWluZXIvZ254X2d1YW53YW5nXCIpO1xyXG4gICAgICAgIGxldCB3aWRnZXRzID0gdGhpcy5ub2RlLmdldENvbXBvbmVudHNJbkNoaWxkcmVuKGNjLldpZGdldCk7XHJcbiAgICAgICAgdGhpcy52ZXJzaW9uTGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcInZlcnNpb25MYWJlbFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy52ZXJzaW9uTGFiZWwuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZ2VuQXBwSW5mbygpO1xyXG4gICAgICAgLy8gdGhpcy52ZXJzaW9uTGFiZWwuc3RyaW5nID0gR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuaGFsbE5ld1ZlcnNpb247XHJcbiAgICAgICAgaWYod2lkZ2V0cyAmJiB3aWRnZXRzLmxlbmd0aCA+IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgd2lkZ2V0cy5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0c1tpXS50YXJnZXQgPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dXeCA9IEdsb2JhbC5Ub29sa2l0LmNoZWNrSXNQbGF0Zm9ybVNob3dXWCgpXHJcbiAgICAgICAgaWYoIXRoaXMuc2hvd1d4KVxyXG4gICAgICAgICAgICB0aGlzLmdldENoaWxkKFwiYnRuQ29udGFpbmVyL3d4QnRuXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBpZiAoR2xvYmFsLlNldHRpbmcud2VpeGluTG9naW5EaXNhYmxlKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5nZXRDaGlsZChcImJ0bkNvbnRhaW5lci93eEJ0blwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vdGhpcy5lZmZlY3ROb2RlID0gdGhpcy5nZXRDaGlsZChcImVmZmVjdFwiKTtcclxuICAgICAgICB0aGlzLmJnID0gdGhpcy5nZXRDb21wb25lbnQoXCJiZ1wiLCBjYy5TcHJpdGUpO1xyXG4gICAgICAgIC8vdGhpcy5sb2dvID0gdGhpcy5nZXRDb21wb25lbnQoXCJsb2dvXCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5sZ0VmZmVjdCA9IHRoaXMuZ2V0Q2hpbGQoXCJsZ0VmZmVjdFwiKTtcclxuICAgICAgICBsZXQgY29uZmlnID0gR2xvYmFsLmN1c3RvbUFwcC5nZXRBcHBDb25maWcoKVxyXG4gICAgICAgIGlmKCFjb25maWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxnRWZmZWN0LmFjdGl2ZSA9IEdsb2JhbC5jdXN0b21BcHAuc2hvd0xvZ2luRWZmO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxnRWZmZWN0LmFjdGl2ZSA9IGNvbmZpZy5zaG93TG9naW5FZmY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZ3Vlc3RCdG4gPSAgIHRoaXMuZ2V0Q2hpbGQoXCJidG5Db250YWluZXIvZ3Vlc3RCdG5cIilcclxuICAgICAgICBpZih0aGlzLmd1ZXN0QnRuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy52aXN0b3JMb2dpbnggPSB0aGlzLmd1ZXN0QnRuLnhcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGhvbmVCdG4gPSAgdGhpcy5nZXRDaGlsZChcImJ0bkNvbnRhaW5lci9waG9uZUJ0blwiKVxyXG4gICAgICAgIGlmKHRoaXMucGhvbmVCdG4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnBob25lTG9naW54ID0gdGhpcy5waG9uZUJ0bi54XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2xpY2tUYWdNYXBbXCJ3eFRhZ1wiXSA9IHRydWVcclxuICAgICAgICB0aGlzLmNsaWNrVGFnTWFwW1widmlzdG9yVGFnXCJdID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuY2xpY2tUYWdNYXBbXCJwaG9uZVRhZ1wiXSA9IHRydWVcclxuICAgIH1cclxuICAgXHJcbiAgICBvblJlZ2lzdEJ0bkNsaWNrKCkge1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kUmVnaXN0XCIpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKCkge1xyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnN0b3AoKTtcclxuICAgICAgICB0aGlzLnNldEJvdHRvbUJ0bkFjdGl2ZSgpXHJcbiAgICAgICAgdGhpcy5DaGVja0tlZnUoKVxyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vbihHbG9iYWxFdmVudC5TaG93UmVkU3BvdCx0aGlzLHRoaXMuc2hvd1JlZFNwb3QpO1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vbihHbG9iYWxFdmVudC5DbG9zZVJlZFNwb3QsdGhpcyx0aGlzLmNsb3NlUmVkU3BvdCk7XHJcbiAgICAgICAgaWYgKEdsb2JhbC5TZXR0aW5nLmVuYWJsZUF1dG9Mb2dpbiAmJiB0aGlzLm1vZGVsLmZpcnN0TG9naW4pIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5maXJzdExvZ2luID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZG9BdXRvTG9naW4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5vZGUgPSBjYy5maW5kKFwiQ2FudmFzL2xvYWRpbmdcIilcclxuICAgICAgICBpZihub2RlKVxyXG4gICAgICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIENoZWNrS2VmdSgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBudWxsXHJcbiAgICAgICAgbGV0IG1vZGVsID0gR2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlNlcnZpY2VyTW9kZWxcIilcclxuICAgICAgICBpZihtb2RlbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBtb2RlbC5nZXRTZXJ2aWNlSW5mbyhDdXN0b21lckVudHJhbmNlVHlwZS5Mb2dpblNlcnZpY2UpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFkYXRhIHx8ICFkYXRhLnN0YXR1cylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMua2VmdU5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5rZWZ1Tm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzaG93UmVkU3BvdCggZGF0YSApe1xyXG4gICAgICAgIGxldCByZWRTcG90VHlwZSA9IGRhdGFbMV1cclxuICAgICAgICBzd2l0Y2gocmVkU3BvdFR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIEhhbGxSZWRTcG90VHlwZS5Mb2dpbktlZnU6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2VmdVNwb3QuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGNsb3NlUmVkU3BvdCggcmVkU3BvdFR5cGUgKXtcclxuICAgICAgICBzd2l0Y2gocmVkU3BvdFR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIEhhbGxSZWRTcG90VHlwZS5Mb2dpbktlZnU6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2VmdVNwb3QuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgb25LZWZ1Q2xpY2soKVxyXG4gICAge1xyXG4gICAgICAgIEdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJTZXJ2aWNlck1vZGVsXCIpLmVudGVyQ3VzdG9tZXJTZXJ2aWNlKEN1c3RvbWVyRW50cmFuY2VUeXBlLkxvZ2luU2VydmljZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkd1YW53YW5nQ2xpY2soKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB1cmwgPSBHbG9iYWwuU2V0dGluZy5VcmxzLmRvd25Mb2FkVXJsXHJcbiAgICAgICAgY2Muc3lzLm9wZW5VUkwodXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldEJvdHRvbUJ0bkFjdGl2ZSgpe1xyXG5cclxuICAgICAgICBpZih0aGlzLmd1ZXN0QnRuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TZXRCdG5Qb3ModGhpcy5ndWVzdEJ0bixCVE5JTkRFWC5WaXN0b3JMb2dpbkJ0bilcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB3eEJ0biA9IHRoaXMuZ2V0Q2hpbGQoXCJidG5Db250YWluZXIvd3hCdG5cIilcclxuICAgICAgICBpZih3eEJ0bilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2V0QnRuUG9zKHd4QnRuLEJUTklOREVYLldlQ2hhdExvZ2luQnRuKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnBob25lQnRuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TZXRCdG5Qb3ModGhpcy5waG9uZUJ0bixCVE5JTkRFWC5QaG9uZUxvZ2luQnRuKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5yZWdpc3RCdG4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNldEJ0blBvcyh0aGlzLnJlZ2lzdEJ0bixCVE5JTkRFWC5SZWdpc3RCdG4pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBvZmZpY2FsOmNjLk5vZGUgPSB0aGlzLmdldENoaWxkKFwiYnRuQ29udGFpbmVyL2dueF9ndWFud2FuZ1wiKVxyXG5cclxuICAgICAgICBpZihvZmZpY2FsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TZXRCdG5Qb3Mob2ZmaWNhbCxCVE5JTkRFWC5PZmZpY2FsQnRuKVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2VydmljZTpjYy5Ob2RlID0gdGhpcy5nZXRDaGlsZChcImJ0bkNvbnRhaW5lci9nbnhfa2VmdVwiKVxyXG5cclxuICAgICAgICBpZihzZXJ2aWNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TZXRCdG5Qb3Moc2VydmljZSxCVE5JTkRFWC5TZXJ2aWNlQnRuKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgd3hGbGFnID0gdGhpcy5zaG93V3ggJiYgQXBwSGVscGVyLmNoZWNrV3hrZXkoZmFsc2UpICYmICFHbG9iYWwuU2V0dGluZy53ZWl4aW5Mb2dpbkRpc2FibGUgIFxyXG4gICAgICAgIC8vIGlmKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuSVBIT05FIClcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHd4RmxhZyA9IHd4RmxhZyAmJiBHbG9iYWwuU2V0dGluZy5pc0FwcFN0b3JlRW5hYmxlV1hTREtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIHd4QnRuLmFjdGl2ZSA9IHd4RmxhZ1xyXG4gICAgICAgIHRoaXMuZ3Vlc3RCdG4uYWN0aXZlID0gIUdsb2JhbC5TZXR0aW5nLnZpc3RvckxvZ2luTGltaXRlZFxyXG4gICAgICAgIHRoaXMucmVnaXN0QnRuLmFjdGl2ZSA9ICFHbG9iYWwuU2V0dGluZy5yZWdpc3RMaW1pdGVkXHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IEdsb2JhbC5jdXN0b21BcHAuZ2V0QXBwQ29uZmlnKClcclxuICAgICAgICBpZihjb25maWcgJiYgY29uZmlnLmxheW91dCAhPSBudWxsICYmIGNvbmZpZy5sYXlvdXQgIT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBsYXlPdXQgPSBjb25maWcubGF5b3V0XHJcbiAgICAgICAgICAgIGlmKGxheU91dCA9PSAxKSAvLyAx6KGo56S65oyJ6ZKu5qiq5ZCR5o6S5qacIDAg56uW5ZCRXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghd3hGbGFnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByaWdodEZsYWcgPSAgdGhpcy5ndWVzdEJ0bi54ID4gdGhpcy5waG9uZUJ0bi54IC8v5b6u5L+h5LiN5pi+56S65pe25Yik5pat5ZOq5Liq5oyJ6ZKu5Zyo5Y+z6L6577yM5Y+z6L655oyJ6ZKu5b6A5bem56e75Yqo77yM5bem6L655oyJ6ZKu5b6A5Y+z6L6556e75YqoXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJpZ2h0RmxhZylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3Vlc3RCdG4ueCAtPSAxMjBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5waG9uZUJ0bi54ICs9IDEyMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ndWVzdEJ0bi54ICs9IDEyMFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGhvbmVCdG4ueCAtPSAxMjBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghd3hGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVwRmxhZyA9ICB0aGlzLmd1ZXN0QnRuLnkgPiB0aGlzLnBob25lQnRuLnkvL+W+ruS/oeS4jeaYvuekuuaXtuWIpOaWreWTquS4quaMiemSruWcqOS4iumdou+8jOS4iumdouaMiemSruW+gOS4i+enu+WKqO+8jOS4i+mdouaMiemSruW+gOS4iuenu+WKqFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1cEZsYWcpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmd1ZXN0QnRuLnkgLT0gNDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5waG9uZUJ0bi55ICs9IDQwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmd1ZXN0QnRuLnkgKz0gNDBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBob25lQnRuLnkgLT0gNDBcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghd3hGbGFnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3Vlc3RCdG4ueCA9IHRoaXMudmlzdG9yTG9naW54XHJcbiAgICAgICAgICAgIHRoaXMucGhvbmVCdG4ueCA9IHRoaXMucGhvbmVMb2dpbnhcclxuICAgICAgICAgICAgbGV0IHJpZ2h0RmxhZyA9IHRoaXMuZ3Vlc3RCdG4ueCA+IHRoaXMucGhvbmVCdG4ueFxyXG4gICAgICAgICAgICBpZiAocmlnaHRGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmd1ZXN0QnRuLnggLT0gMTIwXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBob25lQnRuLnggKz0gMTIwXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmd1ZXN0QnRuLnggKz0gMTIwXHJcbiAgICAgICAgICAgIHRoaXMucGhvbmVCdG4ueCAtPSAxMjBcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBTZXRCdG5Qb3Mobm9kZTogY2MuTm9kZSwgYnRuSW5kZXg6IEJUTklOREVYKSB7XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IEdsb2JhbC5jdXN0b21BcHAuZ2V0QXBwQ29uZmlnKClcclxuICAgICAgICBpZiAoIWNvbmZpZyB8fCAhY2MuaXNWYWxpZChub2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoIChidG5JbmRleCkge1xyXG4gICAgICAgICAgICBjYXNlIEJUTklOREVYLk9mZmljYWxCdG46XHJcbiAgICAgICAgICAgICAgICBpZihjb25maWcub2ZmaWNhbEJ0blBvcylcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKGNjLnYyKGNvbmZpZy5vZmZpY2FsQnRuUG9zWzBdLCBjb25maWcub2ZmaWNhbEJ0blBvc1sxXSkpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBCVE5JTkRFWC5SZWdpc3RCdG46XHJcbiAgICAgICAgICAgICAgICBpZihjb25maWcucmVnaXN0QnRuUG9zKVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oY2MudjIoY29uZmlnLnJlZ2lzdEJ0blBvc1swXSwgY29uZmlnLnJlZ2lzdEJ0blBvc1sxXSkpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBCVE5JTkRFWC5TZXJ2aWNlQnRuOlxyXG4gICAgICAgICAgICAgICAgaWYoY29uZmlnLnNlcnZpY2VCdG5Qb3MpXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihjYy52Mihjb25maWcuc2VydmljZUJ0blBvc1swXSwgY29uZmlnLnNlcnZpY2VCdG5Qb3NbMV0pKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQlROSU5ERVguVmlzdG9yTG9naW5CdG46XHJcbiAgICAgICAgICAgICAgICBpZihjb25maWcudmlzdG9yTG9naW5CdG5Qb3MpXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihjYy52Mihjb25maWcudmlzdG9yTG9naW5CdG5Qb3NbMF0sIGNvbmZpZy52aXN0b3JMb2dpbkJ0blBvc1sxXSkpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBCVE5JTkRFWC5XZUNoYXRMb2dpbkJ0bjpcclxuICAgICAgICAgICAgICAgIGlmKGNvbmZpZy53ZWNoYXRMb2dpbkJ0blBvcylcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKGNjLnYyKGNvbmZpZy53ZWNoYXRMb2dpbkJ0blBvc1swXSwgY29uZmlnLndlY2hhdExvZ2luQnRuUG9zWzFdKSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJUTklOREVYLlBob25lTG9naW5CdG46XHJcbiAgICAgICAgICAgICAgICBpZihjb25maWcucGhvbmVMb2dpbkJ0blBvcylcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKGNjLnYyKGNvbmZpZy5waG9uZUxvZ2luQnRuUG9zWzBdLCBjb25maWcucGhvbmVMb2dpbkJ0blBvc1sxXSkpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkb0F1dG9Mb2dpbigpIHtcclxuICAgICAgICAvL+makOiXj+W6lemDqOS4ieS4quaMiemSrlxyXG4gICAgICAgIC8vIHRoaXMuc2V0Qm90dG9tQnRuQWN0aXZlKGZhbHNlKVxyXG4gICAgICAgIGxldCB0b2tlbiA9IEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2UuZ2V0KEhhbGxTdG9yYWdlS2V5LlRva2VuKTtcclxuICAgICAgICBsZXQgdWlkID0gR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5nZXQoSGFsbFN0b3JhZ2VLZXkuVWlkKTtcclxuICAgICAgICBpZiAodG9rZW4gJiYgdG9rZW4gIT0gXCJcIiAmJiB1aWQgIT0gXCJcIikge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLnJlcUF1dG9Mb2dpbih0b2tlbiwgTnVtYmVyKHVpZCksIG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBvbkd1ZXN0QnRuQ2xpY2soKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNsaWNrVGFnTWFwW1widmlzdG9yVGFnXCJdKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNsaWNrVGFnTWFwW1widmlzdG9yVGFnXCJdID0gZmFsc2VcclxuICAgICAgICB0aGlzLmNsaWNrVGFnTWFwW1widmlzdG9yVGltZXJcIl0gPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jbGlja1RhZ01hcFtcInZpc3RvclRhZ1wiXSA9IHRydWVcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICB0aGlzLm1vZGVsLnJlcVZpc2l0b3JMb2dpbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25XeEJ0bkNsaWNrKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jbGlja1RhZ01hcFtcInd4VGFnXCJdKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNsaWNrVGFnTWFwW1wid3hUYWdcIl0gPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuY2xpY2tUYWdNYXBbXCJ3eFRpbWVyXCJdID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tUYWdNYXBbXCJ3eFRhZ1wiXSA9IHRydWVcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICBpZighQXBwSGVscGVyLmdldEFwcFdYTG9naW5FbmFibGUoKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5jaGVja1dYSW5zdGFsbCgocmV0SW5mbykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXJldEluZm8pIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImNoZWNrV1hJbnN0YWxsIGNhbGxiYWNrIGVycm9yIHJldEluZm8gPSBudWxsXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJldEluZm8ucmVzdWx0ID09IDApIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5zdGFydFdYTG9naW4oKHd4SW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghd3hJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInN0YXJ0V1hMb2dpbiBjYWxsYmFjayBlcnJvciB3eEluZm8gPSBudWxsXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLW9uV3hCdG5DbGljayBjYWxsYmFjayB3eEluZm8gXCIgKyBKU09OLnN0cmluZ2lmeSh3eEluZm8pKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh3eEluZm8ucmVzdWx0ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjY2Vzc3Rva2VuID0gd3hJbmZvLmZ1bmNQYXJhbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5yZXFXeExvZ2luKGFjY2Vzc3Rva2VuLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5b6u5L+h55m75b2V5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChcIuivt+WFiOWuieijheW+ruS/oVwiLCBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuICAgIHByaXZhdGUgb25QaG9uZUJ0bkNsaWNrKCkge1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kUGhvbmVMb2dpblwiKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc3Bvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uRGlzcG9zZSgpXHJcbiAgICAgICAgdGhpcy5yZXNldFRhZygpXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihHbG9iYWxFdmVudC5TaG93UmVkU3BvdCx0aGlzLHRoaXMuc2hvd1JlZFNwb3QpO1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vZmYoR2xvYmFsRXZlbnQuQ2xvc2VSZWRTcG90LHRoaXMsdGhpcy5jbG9zZVJlZFNwb3QpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgb25DbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5yZXNldFRhZygpXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihHbG9iYWxFdmVudC5TaG93UmVkU3BvdCx0aGlzLHRoaXMuc2hvd1JlZFNwb3QpO1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vZmYoR2xvYmFsRXZlbnQuQ2xvc2VSZWRTcG90LHRoaXMsdGhpcy5jbG9zZVJlZFNwb3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0VGFnKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmNsaWNrVGFnTWFwW1wid3hUaW1lclwiXSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmNsaWNrVGFnTWFwW1wid3hUaW1lclwiXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5jbGlja1RhZ01hcFtcInZpc3RvclRpbWVyXCJdKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuY2xpY2tUYWdNYXBbXCJ2aXN0b3JUaW1lclwiXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbGlja1RhZ01hcFtcInd4VGFnXCJdID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuY2xpY2tUYWdNYXBbXCJ2aXN0b3JUYWdcIl0gPSB0cnVlXHJcbiAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHJpdmF0ZSBvblJlZ2lzdGVyQnRuQ2xpY2soKXtcclxuICAgIC8vICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZFJlZ2lzdFwiKTtcclxuICAgIC8vIH1cclxuXHJcbn0iXX0=