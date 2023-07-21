
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/login/WndRegist.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxsb2dpblxcV25kUmVnaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUErQztBQUUvQyx3REFBbUQ7QUFDbkQsb0RBQStDO0FBQy9DLG9EQUErQztBQUUvQztJQUF1Qyw2QkFBTztJQUE5QztRQUFBLHFFQWtIQztRQS9HVyxpQkFBVyxHQUFHLEVBQUUsQ0FBQTs7SUErRzVCLENBQUM7SUF4R2EsMEJBQU0sR0FBaEI7UUFFSSxJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLDBCQUEwQixDQUFDO1FBQzFDLElBQUksQ0FBQyxVQUFVLEdBQWUsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVTLDRCQUFRLEdBQWxCO1FBRUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFFakQsSUFBSSxDQUFDLGNBQWMsR0FBbUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsd0JBQWMsQ0FBQyxDQUFDO1FBQ3RILElBQUksQ0FBQyxZQUFZLEdBQWlCLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxD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QixDQUFDLENBQUM7WUFDckMsT0FBTztTQUNWO1FBRUQsR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsNkJBQVMsR0FBVDtRQUVJLGlCQUFNLFNBQVMsV0FBRSxDQUFBO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUVuQixDQUFDO0lBRUQsMkJBQU8sR0FBUDtRQUVJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUNuQixDQUFDO0lBRUQsNEJBQVEsR0FBUjtRQUVJLElBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFDL0I7WUFDSSxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBO1NBQzdDO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUE7SUFDckMsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FsSEEsQUFrSEMsQ0FsSHNDLGlCQUFPLEdBa0g3QyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXbmRCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1duZEJhc2VcIjtcclxuaW1wb3J0IExvZ2luTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvTG9naW5Nb2RlbFwiO1xyXG5pbXBvcnQgUGhvbmVJbnB1dFZpZXcgZnJvbSBcIi4vdmlldy9QaG9uZUlucHV0Vmlld1wiO1xyXG5pbXBvcnQgQXV0b0NvZGVWaWV3IGZyb20gXCIuL3ZpZXcvQXV0b0NvZGVWaWV3XCI7XHJcbmltcG9ydCBQd2RJbnB1dFZpZXcgZnJvbSBcIi4vdmlldy9Qd2RJbnB1dFZpZXdcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZFJlZ2lzdCBleHRlbmRzIFduZEJhc2Vcclxue1xyXG4gICAgcHJpdmF0ZSBpbnZpdGVJbnB1dDpjYy5FZGl0Qm94O1xyXG4gICAgcHJpdmF0ZSBjbGlja1RhZ01hcCA9IHt9XHJcblxyXG4gICAgcHJpdmF0ZSBwaG9uZUlucHV0VmlldzpQaG9uZUlucHV0VmlldztcclxuICAgIHByaXZhdGUgYXV0aENvZGVWaWV3OkF1dG9Db2RlVmlldztcclxuICAgIHByaXZhdGUgcHdkSW5wdXRWaWV3OlB3ZElucHV0VmlldztcclxuXHJcbiAgICBwcml2YXRlIGxvZ2luTW9kZWw6TG9naW5Nb2RlbDtcclxuICAgIHByb3RlY3RlZCBvbkluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiV25kUmVnaXN0XCI7XHJcbiAgICAgICAgdGhpcy5sYXllciA9IFwiUG9wTGF5ZXJcIjtcclxuICAgICAgICB0aGlzLnJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS9SZWdpc3RVSVwiO1xyXG4gICAgICAgIHRoaXMubG9naW5Nb2RlbCA9IDxMb2dpbk1vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJMb2dpbk1vZGVsXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImJnL2Nsb3NlXCIsIHRoaXMuY2xvc2UsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJzdXJlQnRuXCIsIHRoaXMub25TdXJlQnRuQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJjYW5jZWxCdG5cIix0aGlzLmNsb3NlLHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLnBob25lSW5wdXRWaWV3ID0gPFBob25lSW5wdXRWaWV3PnRoaXMuYWRkVmlldyhcIlBob25lSW5wdXRWaWV3XCIsIHRoaXMuZ2V0Q2hpbGQoXCJwaG9uZUNvbnRhaW5lclwiKSwgUGhvbmVJbnB1dFZpZXcpO1xyXG4gICAgICAgIHRoaXMuYXV0aENvZGVWaWV3ID0gPEF1dG9Db2RlVmlldz50aGlzLmFkZFZpZXcoXCJBdXRvQ29kZVZpZXdcIiwgdGhpcy5nZXRDaGlsZChcImF1dGhDb2RlVmlld1wiKSwgQXV0b0NvZGVWaWV3KTtcclxuICAgICAgICB0aGlzLmF1dGhDb2RlVmlldy5zZXRQaG9uZUlucHV0QW5kVHlwZSh0aGlzLnBob25lSW5wdXRWaWV3LCAxKTtcclxuICAgICAgICB0aGlzLnB3ZElucHV0VmlldyA9IDxQd2RJbnB1dFZpZXc+dGhpcy5hZGRWaWV3KFwiUHdkSW5wdXRWaWV3XCIsIHRoaXMuZ2V0Q2hpbGQoXCJwd2RDb250YWluZXJcIiksIFB3ZElucHV0Vmlldyk7XHJcblxyXG4gICAgICAgIHRoaXMuaW52aXRlSW5wdXQgPSB0aGlzLmdldENvbXBvbmVudChcImludml0ZVwiLCBjYy5FZGl0Qm94KTtcclxuXHJcbiAgICAgICAgdGhpcy5pbnZpdGVJbnB1dC5wbGFjZWhvbGRlckZvbnRDb2xvciA9IG5ldyBjYy5Db2xvcigpLmZyb21IRVgoXCIjY2ZlM2ZjXCIpO1xyXG4gICAgICAgIHRoaXMuaW52aXRlSW5wdXQuZm9udENvbG9yID0gbmV3IGNjLkNvbG9yKCkuZnJvbUhFWChcIiNlYWZkZmZcIik7XHJcbiAgICAgICAgdGhpcy5jbGlja1RhZ01hcFtcIlJlZ1RhZ1wiXSA9IHRydWVcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25PcGVuKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnBob25lSW5wdXRWaWV3LnN1YlZpZXdTdGF0ZSA9IHRydWVcclxuICAgICAgICB0aGlzLmF1dGhDb2RlVmlldy5zdWJWaWV3U3RhdGUgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5wd2RJbnB1dFZpZXcuc3ViVmlld1N0YXRlID0gdHJ1ZVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25TdXJlQnRuQ2xpY2soKVxyXG4gICAge1xyXG4gICAgICAgXHJcbiAgICAgICAgaWYgKCF0aGlzLmNsaWNrVGFnTWFwW1wiUmVnVGFnXCJdKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNsaWNrVGFnTWFwW1wiUmVnVGFnXCJdID0gZmFsc2VcclxuICAgICAgICB0aGlzLmNsaWNrVGFnTWFwW1wiUmVnVGltZXJcIl0gPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jbGlja1RhZ01hcFtcIlJlZ1RhZ1wiXSA9IHRydWVcclxuICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5waG9uZUlucHV0Vmlldy5waG9uZSA9PSBcIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLor7fovpPlhaXmiYvmnLrlj7fnoIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5wd2RJbnB1dFZpZXcucHdkID09IFwiXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuivt+i+k+WFpeWvhueggVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmF1dGhDb2RlVmlldy5jb2RlID09IFwiXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuivt+i+k+WFpemqjOivgeeggVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIXRoaXMucGhvbmVJbnB1dFZpZXcuaXNBcmVhVmFpbGQoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi6K+36YCJ5oup5q2j56Gu55qE5Zyw5Yy65L+h5oGvXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGhvbmUgPSB0aGlzLnBob25lSW5wdXRWaWV3LnBob25lO1xyXG4gICAgICAgIGxldCBjb2RlID0gdGhpcy5hdXRoQ29kZVZpZXcuY29kZTtcclxuICAgICAgICBsZXQgYXJlYSA9IHRoaXMucGhvbmVJbnB1dFZpZXcuYXJlYTtcclxuICAgICAgICBsZXQgcHdkID0gdGhpcy5wd2RJbnB1dFZpZXcucHdkO1xyXG4gICAgICAgIGxldCBpbnZpdGVjb2RlID0gdGhpcy5pbnZpdGVJbnB1dC5zdHJpbmc7XHJcblxyXG4gICAgICAgIGlmKCFHbG9iYWwuVG9vbGtpdC5jaGVja1BXRm9ybWF0KHB3ZCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuivt+i+k+WFpTYtMTbkvY3lrZfmr43miJbmlbDlrZflr4bnoIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB3ZCA9IEdsb2JhbC5Ub29sa2l0Lm1kNShwd2QpO1xyXG4gICAgICAgIHRoaXMubG9naW5Nb2RlbC5yZXFSZWdpc3QocGhvbmUsIHB3ZCwgYXJlYSwgY29kZSwgaW52aXRlY29kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNwb3NlKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkRpc3Bvc2UoKVxyXG4gICAgICAgIHRoaXMucmVzZXRUYWcoKVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucmVzZXRUYWcoKVxyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0VGFnKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmNsaWNrVGFnTWFwW1wiUmVnVGltZXJcIl0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5jbGlja1RhZ01hcFtcIlJlZ1RpbWVyXCJdKVxyXG4gICAgICAgIH1cclxuICAgICAgXHJcbiAgICAgICAgdGhpcy5jbGlja1RhZ01hcFtcIlJlZ1RhZ1wiXSA9IHRydWVcclxuICAgIH1cclxufSJdfQ==