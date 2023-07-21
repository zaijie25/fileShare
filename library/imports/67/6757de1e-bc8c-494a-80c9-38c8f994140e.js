"use strict";
cc._RF.push(module, '6757d4evIxJSoDJOMj5lBQO', 'WndPhoneLogin');
// hall/scripts/logic/hall/ui/login/WndPhoneLogin.ts

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
var PwdInputView_1 = require("./view/PwdInputView");
var WndPhoneLogin = /** @class */ (function (_super) {
    __extends(WndPhoneLogin, _super);
    function WndPhoneLogin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.clickTagMap = {};
        return _this;
    }
    WndPhoneLogin.prototype.onInit = function () {
        this.name = "WndPhoneLogin";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/PhoneLoginUI";
        this.model = Global.ModelManager.getModel("LoginModel");
    };
    WndPhoneLogin.prototype.initView = function () {
        this.addCommonClick("bg/close", this.onCloseClick, this);
        this.addCommonClick("loginBtn", this.onLoginBtnClick, this);
        this.addCommonClick("forgetPwd", this.onForgetClick, this, null);
        this.phoneInputView = this.addView("PhoneInputView", this.getChild("phoneContainer"), PhoneInputView_1.default);
        this.pwdInputView = this.addView("PwdInputView", this.getChild("pwdContainer"), PwdInputView_1.default);
        if (this.model.localPhone)
            this.phoneInputView.phone = this.model.localPhone;
        if (this.model.localAreaCode)
            this.phoneInputView.area = this.model.localAreaCode;
        this.clickTagMap["click"] = true;
    };
    WndPhoneLogin.prototype.onForgetClick = function () {
        Global.UI.show("WndForgetPwd");
    };
    WndPhoneLogin.prototype.onCloseClick = function () {
        this.close();
    };
    WndPhoneLogin.prototype.onOpen = function () {
        this.phoneInputView.subViewState = true;
        this.pwdInputView.subViewState = true;
    };
    WndPhoneLogin.prototype.onLoginBtnClick = function () {
        var _this = this;
        if (!this.clickTagMap["click"]) {
            return;
        }
        this.clickTagMap["click"] = false;
        this.clickTagMap["clickTimer"] = setTimeout(function () {
            _this.clickTagMap["click"] = true;
        }, 1000);
        if (this.phoneInputView.phone == "") {
            Global.UI.fastTip("请输入手机号");
            return;
        }
        if (this.pwdInputView.pwd == "") {
            Global.UI.fastTip("请输入密码");
            return;
        }
        if (!this.phoneInputView.isAreaVaild()) {
            Global.UI.fastTip("请选择正确的地区信息");
            return;
        }
        //检查code
        var pwd = Global.Toolkit.md5(this.pwdInputView.pwd);
        var acode = this.phoneInputView.area;
        var phone = this.phoneInputView.phone;
        this.model.reqPhoneLogin(phone, pwd, acode);
    };
    WndPhoneLogin.prototype.onDispose = function () {
        _super.prototype.onDispose.call(this);
        this.resetTag();
    };
    WndPhoneLogin.prototype.onClose = function () {
        this.resetTag();
    };
    WndPhoneLogin.prototype.resetTag = function () {
        if (this.clickTagMap["clickTimer"]) {
            clearTimeout(this.clickTagMap["clickTimer"]);
        }
        this.clickTagMap["click"] = true;
    };
    return WndPhoneLogin;
}(WndBase_1.default));
exports.default = WndPhoneLogin;

cc._RF.pop();