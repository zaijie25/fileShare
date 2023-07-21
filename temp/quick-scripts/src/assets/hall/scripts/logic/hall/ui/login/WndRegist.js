"use strict";
cc._RF.push(module, '880ffKSfs9DiKnW6dOi/mNX', 'WndRegist');
// hall/scripts/logic/hall/ui/login/WndRegist.ts

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
var PhoneInputView_1 = require("./view/PhoneInputView");
var AutoCodeView_1 = require("./view/AutoCodeView");
var PwdInputView_1 = require("./view/PwdInputView");
var WndRegist = /** @class */ (function (_super) {
    __extends(WndRegist, _super);
    function WndRegist() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.clickTagMap = {};
        return _this;
    }
    WndRegist.prototype.onInit = function () {
        this.name = "WndRegist";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/RegistUI";
        this.loginModel = Global.ModelManager.getModel("LoginModel");
    };
    WndRegist.prototype.initView = function () {
        this.addCommonClick("bg/close", this.close, this);
        this.addCommonClick("sureBtn", this.onSureBtnClick, this);
        this.addCommonClick("cancelBtn", this.close, this);
        this.phoneInputView = this.addView("PhoneInputView", this.getChild("phoneContainer"), PhoneInputView_1.default);
        this.authCodeView = this.addView("AutoCodeView", this.getChild("authCodeView"), AutoCodeView_1.default);
        this.authCodeView.setPhoneInputAndType(this.phoneInputView, 1);
        this.pwdInputView = this.addView("PwdInputView", this.getChild("pwdContainer"), PwdInputView_1.default);
        this.inviteInput = this.getComponent("invite", cc.EditBox);
        this.inviteInput.placeholderFontColor = new cc.Color().fromHEX("#cfe3fc");
        this.inviteInput.fontColor = new cc.Color().fromHEX("#eafdff");
        this.clickTagMap["RegTag"] = true;
    };
    WndRegist.prototype.onOpen = function () {
        this.phoneInputView.subViewState = true;
        this.authCodeView.subViewState = true;
        this.pwdInputView.subViewState = true;
    };
    WndRegist.prototype.onSureBtnClick = function () {
        var _this = this;
        if (!this.clickTagMap["RegTag"]) {
            return;
        }
        this.clickTagMap["RegTag"] = false;
        this.clickTagMap["RegTimer"] = setTimeout(function () {
            _this.clickTagMap["RegTag"] = true;
        }, 1000);
        if (this.phoneInputView.phone == "") {
            Global.UI.fastTip("请输入手机号码");
            return;
        }
        if (this.pwdInputView.pwd == "") {
            Global.UI.fastTip("请输入密码");
            return;
        }
        if (this.authCodeView.code == "") {
            Global.UI.fastTip("请输入验证码");
            return;
        }
        if (!this.phoneInputView.isAreaVaild()) {
            Global.UI.fastTip("请选择正确的地区信息");
            return;
        }
        var phone = this.phoneInputView.phone;
        var code = this.authCodeView.code;
        var area = this.phoneInputView.area;
        var pwd = this.pwdInputView.pwd;
        var invitecode = this.inviteInput.string;
        if (!Global.Toolkit.checkPWFormat(pwd)) {
            Global.UI.fastTip("请输入6-16位字母或数字密码");
            return;
        }
        pwd = Global.Toolkit.md5(pwd);
        this.loginModel.reqRegist(phone, pwd, area, code, invitecode);
    };
    WndRegist.prototype.onDispose = function () {
        _super.prototype.onDispose.call(this);
        this.resetTag();
    };
    WndRegist.prototype.onClose = function () {
        this.resetTag();
    };
    WndRegist.prototype.resetTag = function () {
        if (this.clickTagMap["RegTimer"]) {
            clearTimeout(this.clickTagMap["RegTimer"]);
        }
        this.clickTagMap["RegTag"] = true;
    };
    return WndRegist;
}(WndBase_1.default));
exports.default = WndRegist;

cc._RF.pop();