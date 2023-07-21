"use strict";
cc._RF.push(module, '2bb58cz8m9H+YbrQP3D4iia', 'AutoCodeView');
// hall/scripts/logic/hall/ui/login/view/AutoCodeView.ts

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
var ViewBase_1 = require("../../../../core/ui/ViewBase");
var YXButton_1 = require("../../../../core/component/YXButton");
var AutoCodeView = /** @class */ (function (_super) {
    __extends(AutoCodeView, _super);
    function AutoCodeView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nextSendTime = 0;
        _this.type = 1;
        return _this;
    }
    AutoCodeView.prototype.initView = function () {
        this.addCommonClick("codeBtn", this.onCodeBtnClick, this);
        this.sendCodeBtn = this.getComponent("codeBtn", YXButton_1.default);
        this.codeInput = this.getComponent("code", cc.EditBox);
        this.timeBtn = this.getChild("timeBtn");
        this.timeLabel = this.getComponent("timeBtn/label", cc.RichText);
        this.timeBtn.active = false;
    };
    AutoCodeView.prototype.setPhoneInputAndType = function (phoneInput, type) {
        this.phoneInputView = phoneInput;
        this.type = type;
    };
    Object.defineProperty(AutoCodeView.prototype, "code", {
        get: function () {
            return this.codeInput.string;
        },
        set: function (value) {
            this.codeInput.string = value;
        },
        enumerable: false,
        configurable: true
    });
    AutoCodeView.prototype.onCodeBtnClick = function () {
        var _this = this;
        if (this.phoneInputView.phone == "") {
            Global.UI.fastTip("请输入手机号码");
            return;
        }
        if (!this.phoneInputView.isAreaVaild()) {
            Global.UI.fastTip("请选择正确的地区信息");
            return;
        }
        var area = this.phoneInputView.area;
        Global.ModelManager.getModel("LoginModel").reqGetPhoneVerifyCode(this.phoneInputView.phone, this.type, area, function (msg) {
            Global.UI.fastTip("验证码发送成功");
            //开始倒计时
            _this.nextSendTime = Date.now() + Global.Setting.phoneVerifyCodeInterval * 1000;
            _this.updateSendCodeTime();
            if (msg && msg.code) {
                Global.UI.showSingleBox(msg.code);
            }
        });
    };
    AutoCodeView.prototype.onSubViewShow = function () {
        this.updateSendCodeTime();
    };
    AutoCodeView.prototype.onSubViewHide = function () {
        this.sendCodeBtn.unscheduleAllCallbacks();
    };
    AutoCodeView.prototype.onDispose = function () {
        this.nextSendTime = 0;
    };
    AutoCodeView.prototype.updateSendCodeTime = function () {
        var _this = this;
        //最后一秒忽略不计
        if (this.checkCanSend()) {
            this.setCodeBtnCanSend();
            return;
        }
        var totalTime = this.getLeftTime();
        this.sendCodeBtnDisable();
        this.codeInput.schedule(function () {
            if (_this.checkCanSend()) {
                _this.setCodeBtnCanSend();
                _this.sendCodeBtn.unscheduleAllCallbacks();
                _this.sendCodeBtn.isClickValid = true;
            }
            else {
                _this.timeLabel.string = _this.getLeftTime() + "s";
            }
        }, 1, totalTime + 1);
    };
    AutoCodeView.prototype.checkCanSend = function () {
        return this.nextSendTime == 0 || this.nextSendTime < (Date.now() + 1000);
    };
    AutoCodeView.prototype.sendCodeBtnDisable = function () {
        this.sendCodeBtn.node.active = false;
        this.timeBtn.active = true;
        var totalTime = this.getLeftTime();
        this.timeLabel.string = totalTime.toString();
    };
    AutoCodeView.prototype.setCodeBtnCanSend = function () {
        this.sendCodeBtn.node.active = true;
        this.timeBtn.active = false;
    };
    AutoCodeView.prototype.getLeftTime = function () {
        return Math.floor((this.nextSendTime - Date.now()) / 1000);
    };
    return AutoCodeView;
}(ViewBase_1.default));
exports.default = AutoCodeView;

cc._RF.pop();