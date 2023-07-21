"use strict";
cc._RF.push(module, '6e0a7MOu11GYrwh2lM2Hmdx', 'WndForgetPwd');
// hall/scripts/logic/hall/ui/login/WndForgetPwd.ts

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
var WndForgetPwd = /** @class */ (function (_super) {
    __extends(WndForgetPwd, _super);
    function WndForgetPwd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndForgetPwd.prototype.onInit = function () {
        this.name = "WndForgetPwd";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/ForgetPwdUI";
        this.loginModel = Global.ModelManager.getModel("LoginModel");
    };
    WndForgetPwd.prototype.initView = function () {
        this.addCommonClick("cancelBtn", this.close, this);
        this.addCommonClick("bg/close", this.close, this);
        this.addCommonClick("sureBtn", this.onSureBtnClick, this);
        this.phoneInputView = this.addView("PhoneInputView", this.getChild("phoneContainer"), PhoneInputView_1.default);
        this.authCodeView = this.addView("AutoCodeView", this.getChild("authCodeView"), AutoCodeView_1.default);
        this.authCodeView.setPhoneInputAndType(this.phoneInputView, 2);
        this.pwdInputView = this.addView("PwdInputView", this.getChild("pwdContainer"), PwdInputView_1.default);
    };
    WndForgetPwd.prototype.onOpen = function () {
        this.phoneInputView.subViewState = true;
        this.authCodeView.subViewState = true;
        this.pwdInputView.subViewState = true;
    };
    WndForgetPwd.prototype.onSureBtnClick = function () {
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
        if (!Global.Toolkit.checkPWFormat(this.pwdInputView.pwd)) {
            Global.UI.fastTip(Global.Language.getWord(1303));
            return;
        }
        pwd = Global.Toolkit.md5(pwd);
        this.loginModel.reqChangePwd(phone, pwd, code, area);
    };
    return WndForgetPwd;
}(WndBase_1.default));
exports.default = WndForgetPwd;

cc._RF.pop();