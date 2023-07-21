"use strict";
cc._RF.push(module, '365f6SXlyZCFb/qDOIHChh0', 'WndChangePwd');
// hall/scripts/logic/hall/ui/personalInfo/WndChangePwd.ts

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
var AutoCodeView_1 = require("../login/view/AutoCodeView");
var PhoneInputView_1 = require("../login/view/PhoneInputView");
var PwdInputView_1 = require("../login/view/PwdInputView");
var WndChangePwd = /** @class */ (function (_super) {
    __extends(WndChangePwd, _super);
    function WndChangePwd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndChangePwd.prototype.onInit = function () {
        this.name = "WndChangePwd";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/PersonalInfo/ChangePwdUI";
        this.model = Global.ModelManager.getModel("PersonalInfoModel");
    };
    WndChangePwd.prototype.initView = function () {
        this.addCommonClick("bg/close", this.closeWnd, this);
        this.addCommonClick("cancelBtn", this.closeWnd, this);
        this.addCommonClick("sureBtn", this.onSureBtnClick, this);
        this.phoneInputView = this.addView("PhoneInputView", this.getChild("phoneContainer"), PhoneInputView_1.default);
        this.authCodeView = this.addView("AutoCodeView", this.getChild("authCodeView"), AutoCodeView_1.default);
        this.authCodeView.setPhoneInputAndType(this.phoneInputView, 2);
        this.pwdInputView = this.addView("PwdInputView", this.getChild("pwdContainer"), PwdInputView_1.default);
    };
    WndChangePwd.prototype.onOpen = function () {
        this.phoneInputView.subViewState = true;
        this.authCodeView.subViewState = true;
        this.pwdInputView.subViewState = true;
        this.authCodeView.code = "";
        this.pwdInputView.pwd = "";
    };
    WndChangePwd.prototype.closeWnd = function () {
        this.close();
    };
    WndChangePwd.prototype.onSureBtnClick = function () {
        var _this = this;
        if (this.phoneInputView.phone == "") {
            return Global.UI.fastTip("请输入手机号码");
        }
        if (this.authCodeView.code == "") {
            return Global.UI.fastTip("请输入验证码");
        }
        if (this.pwdInputView.pwd == "") {
            return Global.UI.fastTip("请输入密码");
        }
        if (!Global.Toolkit.checkPWFormat(this.pwdInputView.pwd)) {
            return Global.UI.fastTip(Global.Language.getWord(1303));
        }
        if (!this.phoneInputView.isAreaVaild()) {
            Global.UI.fastTip("请选择正确的地区信息");
            return;
        }
        var phone = this.phoneInputView.phone;
        var code = this.authCodeView.code;
        var area = this.phoneInputView.area;
        var pwd = this.pwdInputView.pwd;
        pwd = Global.Toolkit.md5(pwd);
        this.model.reqEditPwd(phone, code, area, pwd, function () {
            Global.UI.fastTip("密码修改成功");
            _this.closeWnd();
        });
    };
    return WndChangePwd;
}(WndBase_1.default));
exports.default = WndChangePwd;

cc._RF.pop();