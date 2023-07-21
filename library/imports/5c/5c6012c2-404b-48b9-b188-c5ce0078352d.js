"use strict";
cc._RF.push(module, '5c601LCQEtIubGIxc4AeDUt', 'WndBankChangePW');
// hall/scripts/logic/hall/ui/money/ui/bank/WndBankChangePW.ts

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
var WndBankChangePW = /** @class */ (function (_super) {
    __extends(WndBankChangePW, _super);
    function WndBankChangePW() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //private _pwCheckRx : RegExp = /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z]{2,})(?=.*[a-z]{2,})(?=.*[!@#$%^&*?\(\)]).*$/;
        //private _pwCheckRx : RegExp = /^.*(?=.{6,16})(?=.*\d)(?=.*[a-zA-Z]).*$/;
        _this._pwCheckString = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        return _this;
    }
    WndBankChangePW.prototype.onInit = function () {
        this.name = "WndBankChangePW";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/money/bank/BankChangePWUI";
        this.model = Global.ModelManager.getModel("BankModel");
    };
    WndBankChangePW.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.addCommonClick("close", this.close, this);
        this.addCommonClick("confirmBtn", this.confirmBtnFunc, this);
        this.addCommonClick("canelBtn", this.close, this);
        this.pwEditBox0 = this.getComponent("PasswordBox0/editBox", cc.EditBox);
        this.pwEditBox1 = this.getComponent("PasswordBox1/editBox", cc.EditBox);
        this.pwEditBox2 = this.getComponent("PasswordBox2/editBox", cc.EditBox);
    };
    WndBankChangePW.prototype.onOpen = function (args) {
        this.pwEditBox0.string = "";
        this.pwEditBox1.string = "";
        this.pwEditBox2.string = "";
        // Global.Event.on(GlobalEvent.BANK_CHANGE_PWD_SUCCEED, this, this.bank_change_pwd_succeed);
    };
    WndBankChangePW.prototype.onClose = function () {
        // Global.Event.off(GlobalEvent.BANK_CHANGE_PWD_SUCCEED, this, this.bank_change_pwd_succeed);
    };
    WndBankChangePW.prototype.checkTextEmptyAndShowTips = function (text, tipsLabel) {
        if (text.length <= 0) {
            this.model.showBankTips(tipsLabel);
            return false;
        }
        return true;
    };
    WndBankChangePW.prototype.checkPWFormat = function (text, tipsLabel) {
        var bValid = Global.Toolkit.checkPWFormat(text);
        if (!bValid) {
            this.model.showBankTips(tipsLabel);
        }
        return bValid;
    };
    /** 密码修改成功回调事件*/
    // bank_change_pwd_succeed() 
    // {
    //     this.close();
    // }
    /** 确认按钮 */
    WndBankChangePW.prototype.confirmBtnFunc = function () {
        if (!this.checkTextEmptyAndShowTips(this.pwEditBox0.string, "请输入密码"))
            return;
        if (!this.checkPWFormat(this.pwEditBox1.string, "请按要求输入6~16位数字和字母密码"))
            return;
        // if(!this.checkPWFormat(this.pwEditBox2.string, "请按要求输入6~16位数字和字母密码"))
        //     return;
        if (this.pwEditBox1.string != this.pwEditBox2.string) {
            this.model.showBankTips("新密码输入不一致，请重新输入");
            return;
        }
        this.model.reqSetBankPwd(this.pwEditBox0.string, this.pwEditBox1.string);
    };
    return WndBankChangePW;
}(WndBase_1.default));
exports.default = WndBankChangePW;

cc._RF.pop();