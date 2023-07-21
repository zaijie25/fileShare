"use strict";
cc._RF.push(module, '8e7266tU3BKIrWiqjLssCMJ', 'WndBankLogin');
// hall/scripts/logic/hall/ui/money/ui/bank/WndBankLogin.ts

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
var WndBankLogin = /** @class */ (function (_super) {
    __extends(WndBankLogin, _super);
    function WndBankLogin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndBankLogin.prototype.onInit = function () {
        this.name = "WndBankLogin";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/money/bank/BankLoginBankUI";
        this.model = Global.ModelManager.getModel("BankModel");
    };
    WndBankLogin.prototype.initView = function () {
        // this.node.width = cc.Canvas.instance.node.width;
        // this.node.height = cc.Canvas.instance.node.height;
        this.addCommonClick("close", this.close, this);
        this.addCommonClick("confirmBtn", this.confirmBtnFunc, this);
        this.addCommonClick("changePWBtn", this.changePWBtnFunc, this, null);
        this.addCommonClick("forgetPWBtn", this.forgetPWBtnFunc, this, null);
        this.pwEditBox = this.getComponent("PasswordBox/editBox", cc.EditBox);
    };
    WndBankLogin.prototype.onOpen = function (args) {
        //this.pwEditBox.string = this.model.getDefaultPassword();
    };
    WndBankLogin.prototype.checkTextEmptyAndShowTips = function (text, tipsLabel) {
        if (text.length <= 0) {
            this.model.showBankTips(tipsLabel);
            return false;
        }
        return true;
    };
    /** 确认按钮 */
    WndBankLogin.prototype.confirmBtnFunc = function () {
        if (!this.checkTextEmptyAndShowTips(this.pwEditBox.string, "密码不能为空"))
            return;
        this.model.reqLoginBank(this.pwEditBox.string);
    };
    /** 修改密码按钮 */
    WndBankLogin.prototype.changePWBtnFunc = function () {
        // 1游客 没有绑定手机 2 绑定手机了 3微信 4第三方账号
        var havePhone = (Global.PlayerData.phone != null && Global.PlayerData.phone != "");
        if (!havePhone) {
            this.model.showBankTips("请您先绑定手机号码再修改银行密码！");
            return;
        }
        Global.UI.show("WndBankChangePW");
    };
    /** 忘记密码按钮 */
    WndBankLogin.prototype.forgetPWBtnFunc = function () {
        var havePhone = (Global.PlayerData.phone != null && Global.PlayerData.phone != "");
        if (!havePhone) {
            this.model.showBankTips("请您先绑定手机号码再找回银行密码");
            return;
        }
        Global.UI.show("WndBankForgetPW");
    };
    return WndBankLogin;
}(WndBase_1.default));
exports.default = WndBankLogin;

cc._RF.pop();