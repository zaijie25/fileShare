"use strict";
cc._RF.push(module, '33674z2OPlNKLdW0NehcUXE', 'WndBankForgetPW');
// hall/scripts/logic/hall/ui/money/ui/bank/WndBankForgetPW.ts

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
var WndBase_1 = require("../../../../../core/ui/WndBase");
var PhoneInputView_1 = require("../../../login/view/PhoneInputView");
var AutoCodeView_1 = require("../../../login/view/AutoCodeView");
var WndBankForgetPW = /** @class */ (function (_super) {
    __extends(WndBankForgetPW, _super);
    function WndBankForgetPW() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //private _pwCheckRx : RegExp = /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z]{2,})(?=.*[a-z]{2,})(?=.*[!@#$%^&*?\(\)]).*$/;
        // private _pwCheckRx : RegExp = /^.*(?=.{6,16})(?=.*\d)(?=.*[a-zA-Z]).*$/;
        _this._pwCheckString = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        return _this;
    }
    //private pwEditBox2 : cc.EditBox;
    WndBankForgetPW.prototype.onInit = function () {
        this.name = "WndBankForgetPW";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/money/bank/BankForgetPWUI";
        this.model = Global.ModelManager.getModel("BankModel");
    };
    WndBankForgetPW.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.addCommonClick("close", this.close, this);
        this.addCommonClick("confirmBtn", this.confirmBtnFunc, this);
        this.phoneInputView = this.addView("PhoneInputView", this.getChild("phoneContainer"), PhoneInputView_1.default);
        this.phoneLabel = this.getComponent("phoneNumLabel", cc.RichText);
        this.authCodeView = this.addView("AutoCodeView", this.getChild("authCodeView"), AutoCodeView_1.default);
        this.authCodeView.setPhoneInputAndType(this.phoneInputView, 2);
        this.pwEditBox1 = this.getComponent("PasswordBox1/editBox", cc.EditBox);
        //this.pwEditBox2 = this.getComponent("PasswordBox2/editBox",cc.EditBox);
    };
    WndBankForgetPW.prototype.onOpen = function (args) {
        this.phoneInputView.subViewState = true;
        this.authCodeView.subViewState = true;
        var havePhone = (Global.PlayerData.phone != null && Global.PlayerData.phone != "");
        if (havePhone) { //已绑定电话
            this.phoneLabel.node.active = true;
            var phone = Global.Toolkit.formateStrWithAsterisk(Global.PlayerData.phone, Global.PlayerData.phone.length - 5, 1);
            this.phoneLabel.string = "<b>" + phone + "</b>";
            this.phoneInputView.node.active = false;
            var data = Global.PlayerData.phone.split(' ');
            this.phoneInputView.area = data[0].replace("+", "");
            this.phoneInputView.phone = data[1];
        }
        else { //未绑定电话
            this.phoneLabel.node.active = false;
            this.phoneLabel.string = "";
            this.phoneInputView.node.active = true;
            this.phoneInputView.area = "86";
            this.phoneInputView.phone = "";
        }
        this.authCodeView.code = "";
        this.pwEditBox1.string = "";
        //this.pwEditBox2.string = "";
    };
    WndBankForgetPW.prototype.checkTextEmptyAndShowTips = function (text, tipsLabel) {
        if (text.length <= 0) {
            this.model.showBankTips(tipsLabel);
            return false;
        }
        return true;
    };
    WndBankForgetPW.prototype.checkPWFormat = function (text, tipsLabel) {
        var bValid = Global.Toolkit.checkPWFormat(text);
        if (!bValid) {
            this.model.showBankTips(tipsLabel);
        }
        return bValid;
    };
    /** 确认按钮 */
    WndBankForgetPW.prototype.confirmBtnFunc = function () {
        if (!this.checkTextEmptyAndShowTips(this.phoneInputView.phone, "手机号不能为空"))
            return;
        if (!this.checkTextEmptyAndShowTips(this.authCodeView.code, "验证码不能为空"))
            return;
        if (!this.checkPWFormat(this.pwEditBox1.string, "请按要求输入6~16位数字和字母密码"))
            return;
        if (!this.phoneInputView.isAreaVaild()) {
            Global.UI.fastTip("请选择正确的地区信息");
            return;
        }
        // if(!this.checkPWFormat(this.pwEditBox2.string, "请按要求输入6~16位数字和字母密码"))
        //     return;
        // if(this.pwEditBox1.string != this.pwEditBox2.string){
        //     this.model.showBankTips(""新密码输入不一致，请重新输入"");
        //     return;
        // }
        this.model.reqForgetBankPwd(this.phoneInputView.phone, this.authCodeView.code, this.pwEditBox1.string, this.phoneInputView.area);
    };
    return WndBankForgetPW;
}(WndBase_1.default));
exports.default = WndBankForgetPW;

cc._RF.pop();