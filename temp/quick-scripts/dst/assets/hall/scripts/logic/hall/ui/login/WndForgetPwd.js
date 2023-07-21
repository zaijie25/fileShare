
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/login/WndForgetPwd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxsb2dpblxcV25kRm9yZ2V0UHdkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUErQztBQUUvQyx3REFBbUQ7QUFDbkQsb0RBQStDO0FBQy9DLG9EQUErQztBQUUvQztJQUEwQyxnQ0FBTztJQUFqRDs7SUEwRUEsQ0FBQztJQWxFYSw2QkFBTSxHQUFoQjtRQUVJLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsNkJBQTZCLENBQUM7UUFDN0MsSUFBSSxDQUFDLFVBQVUsR0FBZSxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRVMsK0JBQVEsR0FBbEI7UUFFSSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUxRCxJQUFJLENBQUMsY0FBYyxHQUFtQixJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRSx3QkFBYyxDQUFDLENBQUM7UUFDdEgsSUFBSSxDQUFDLFlBQVksR0FBaUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxzQkFBWSxDQUFDLENBQUM7UUFDNUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxZQUFZLEdBQWlCLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsc0JBQVksQ0FBQyxDQUFDO0lBRWhILENBQUM7SUFFRCw2QkFBTSxHQUFOO1FBRUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQTtRQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUE7SUFDekMsQ0FBQztJQUdPLHFDQUFjLEdBQXRCO1FBRUksSUFBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQ2xDO1lBQ0ksTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDN0IsT0FBTztTQUNWO1FBQ0QsSUFBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQzlCO1lBQ0ksTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0IsT0FBTztTQUNWO1FBQ0QsSUFBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxFQUFFLEVBQy9CO1lBQ0ksTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUIsT0FBTztTQUNWO1FBRUQsSUFBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLEVBQ3JDO1lBQ0ksTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDaEMsT0FBTztTQUNWO1FBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7UUFDdEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7UUFDbEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7UUFDcEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUM7UUFFaEMsSUFBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQ3ZEO1lBQ0ksTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNqRCxPQUFRO1NBQ1g7UUFDRCxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0ExRUEsQUEwRUMsQ0ExRXlDLGlCQUFPLEdBMEVoRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXbmRCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1duZEJhc2VcIjtcclxuaW1wb3J0IExvZ2luTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvTG9naW5Nb2RlbFwiO1xyXG5pbXBvcnQgUGhvbmVJbnB1dFZpZXcgZnJvbSBcIi4vdmlldy9QaG9uZUlucHV0Vmlld1wiO1xyXG5pbXBvcnQgQXV0b0NvZGVWaWV3IGZyb20gXCIuL3ZpZXcvQXV0b0NvZGVWaWV3XCI7XHJcbmltcG9ydCBQd2RJbnB1dFZpZXcgZnJvbSBcIi4vdmlldy9Qd2RJbnB1dFZpZXdcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZEZvcmdldFB3ZCBleHRlbmRzIFduZEJhc2Vcclxue1xyXG5cclxuICAgIHByaXZhdGUgcGhvbmVJbnB1dFZpZXc6UGhvbmVJbnB1dFZpZXc7XHJcbiAgICBwcml2YXRlIGF1dGhDb2RlVmlldzpBdXRvQ29kZVZpZXc7XHJcbiAgICBwcml2YXRlIHB3ZElucHV0VmlldzpQd2RJbnB1dFZpZXc7XHJcblxyXG4gICAgcHJpdmF0ZSBsb2dpbk1vZGVsOkxvZ2luTW9kZWw7XHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZEZvcmdldFB3ZFwiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBcIlBvcExheWVyXCI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvRm9yZ2V0UHdkVUlcIjtcclxuICAgICAgICB0aGlzLmxvZ2luTW9kZWwgPSA8TG9naW5Nb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiTG9naW5Nb2RlbFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJjYW5jZWxCdG5cIiwgdGhpcy5jbG9zZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImJnL2Nsb3NlXCIsIHRoaXMuY2xvc2UsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJzdXJlQnRuXCIsIHRoaXMub25TdXJlQnRuQ2xpY2ssIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLnBob25lSW5wdXRWaWV3ID0gPFBob25lSW5wdXRWaWV3PnRoaXMuYWRkVmlldyhcIlBob25lSW5wdXRWaWV3XCIsIHRoaXMuZ2V0Q2hpbGQoXCJwaG9uZUNvbnRhaW5lclwiKSwgUGhvbmVJbnB1dFZpZXcpO1xyXG4gICAgICAgIHRoaXMuYXV0aENvZGVWaWV3ID0gPEF1dG9Db2RlVmlldz50aGlzLmFkZFZpZXcoXCJBdXRvQ29kZVZpZXdcIiwgdGhpcy5nZXRDaGlsZChcImF1dGhDb2RlVmlld1wiKSwgQXV0b0NvZGVWaWV3KTtcclxuICAgICAgICB0aGlzLmF1dGhDb2RlVmlldy5zZXRQaG9uZUlucHV0QW5kVHlwZSh0aGlzLnBob25lSW5wdXRWaWV3LCAyKTtcclxuICAgICAgICB0aGlzLnB3ZElucHV0VmlldyA9IDxQd2RJbnB1dFZpZXc+dGhpcy5hZGRWaWV3KFwiUHdkSW5wdXRWaWV3XCIsIHRoaXMuZ2V0Q2hpbGQoXCJwd2RDb250YWluZXJcIiksIFB3ZElucHV0Vmlldyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uT3BlbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5waG9uZUlucHV0Vmlldy5zdWJWaWV3U3RhdGUgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5hdXRoQ29kZVZpZXcuc3ViVmlld1N0YXRlID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMucHdkSW5wdXRWaWV3LnN1YlZpZXdTdGF0ZSA9IHRydWVcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBvblN1cmVCdG5DbGljaygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5waG9uZUlucHV0Vmlldy5waG9uZSA9PSBcIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLor7fovpPlhaXmiYvmnLrlj7fnoIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5wd2RJbnB1dFZpZXcucHdkID09IFwiXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuivt+i+k+WFpeWvhueggVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmF1dGhDb2RlVmlldy5jb2RlID09IFwiXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuivt+i+k+WFpemqjOivgeeggVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIXRoaXMucGhvbmVJbnB1dFZpZXcuaXNBcmVhVmFpbGQoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi6K+36YCJ5oup5q2j56Gu55qE5Zyw5Yy65L+h5oGvXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGhvbmUgPSB0aGlzLnBob25lSW5wdXRWaWV3LnBob25lO1xyXG4gICAgICAgIGxldCBjb2RlID0gdGhpcy5hdXRoQ29kZVZpZXcuY29kZTtcclxuICAgICAgICBsZXQgYXJlYSA9IHRoaXMucGhvbmVJbnB1dFZpZXcuYXJlYTtcclxuICAgICAgICBsZXQgcHdkID0gdGhpcy5wd2RJbnB1dFZpZXcucHdkO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCFHbG9iYWwuVG9vbGtpdC5jaGVja1BXRm9ybWF0KHRoaXMucHdkSW5wdXRWaWV3LnB3ZCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChHbG9iYWwuTGFuZ3VhZ2UuZ2V0V29yZCgxMzAzKSk7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB3ZCA9IEdsb2JhbC5Ub29sa2l0Lm1kNShwd2QpO1xyXG4gICAgICAgIHRoaXMubG9naW5Nb2RlbC5yZXFDaGFuZ2VQd2QocGhvbmUsIHB3ZCwgY29kZSwgYXJlYSk7XHJcbiAgICB9XHJcbn0iXX0=