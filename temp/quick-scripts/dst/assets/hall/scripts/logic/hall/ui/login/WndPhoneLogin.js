
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/login/WndPhoneLogin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxsb2dpblxcV25kUGhvbmVMb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBK0M7QUFFL0Msd0RBQW1EO0FBQ25ELG9EQUErQztBQUUvQztJQUEyQyxpQ0FBTztJQUFsRDtRQUFBLHFFQXNHQztRQWpHVyxpQkFBVyxHQUFHLEVBQUUsQ0FBQTs7SUFpRzVCLENBQUM7SUEvRmEsOEJBQU0sR0FBaEI7UUFFSSxJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLDhCQUE4QixDQUFDO1FBQzlDLElBQUksQ0FBQyxLQUFLLEdBQWUsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVTLGdDQUFRLEdBQWxCO1FBRUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWpFLElBQUksQ0FBQyxjQUFjLEdBQW1CLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLHdCQUFjLENBQUMsQ0FBQztRQUN0SCxJQUFJLENBQUMsWUFBWSxHQUFpQixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMs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QSxBQXNHQyxDQXRHMEMsaUJBQU8sR0FzR2pEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZEJhc2UgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvV25kQmFzZVwiO1xyXG5pbXBvcnQgTG9naW5Nb2RlbCBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9Mb2dpbk1vZGVsXCI7XHJcbmltcG9ydCBQaG9uZUlucHV0VmlldyBmcm9tIFwiLi92aWV3L1Bob25lSW5wdXRWaWV3XCI7XHJcbmltcG9ydCBQd2RJbnB1dFZpZXcgZnJvbSBcIi4vdmlldy9Qd2RJbnB1dFZpZXdcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZFBob25lTG9naW4gZXh0ZW5kcyBXbmRCYXNlXHJcbntcclxuICAgIHByaXZhdGUgbW9kZWw6TG9naW5Nb2RlbDtcclxuICAgIHByaXZhdGUgcGhvbmVJbnB1dFZpZXc6UGhvbmVJbnB1dFZpZXc7XHJcbiAgICBwcml2YXRlIHB3ZElucHV0VmlldzpQd2RJbnB1dFZpZXc7XHJcbiAgICBwcml2YXRlIGNsaWNrVGFnTWFwID0ge31cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZFBob25lTG9naW5cIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gXCJQb3BMYXllclwiO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL1Bob25lTG9naW5VSVwiO1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSA8TG9naW5Nb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiTG9naW5Nb2RlbFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJiZy9jbG9zZVwiLCB0aGlzLm9uQ2xvc2VDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImxvZ2luQnRuXCIsIHRoaXMub25Mb2dpbkJ0bkNsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiZm9yZ2V0UHdkXCIsIHRoaXMub25Gb3JnZXRDbGljaywgdGhpcywgbnVsbCk7XHJcblxyXG4gICAgICAgIHRoaXMucGhvbmVJbnB1dFZpZXcgPSA8UGhvbmVJbnB1dFZpZXc+dGhpcy5hZGRWaWV3KFwiUGhvbmVJbnB1dFZpZXdcIiwgdGhpcy5nZXRDaGlsZChcInBob25lQ29udGFpbmVyXCIpLCBQaG9uZUlucHV0Vmlldyk7XHJcbiAgICAgICAgdGhpcy5wd2RJbnB1dFZpZXcgPSA8UHdkSW5wdXRWaWV3PnRoaXMuYWRkVmlldyhcIlB3ZElucHV0Vmlld1wiLCB0aGlzLmdldENoaWxkKFwicHdkQ29udGFpbmVyXCIpLCBQd2RJbnB1dFZpZXcpO1xyXG5cclxuICAgICAgICBpZih0aGlzLm1vZGVsLmxvY2FsUGhvbmUpXHJcbiAgICAgICAgICAgIHRoaXMucGhvbmVJbnB1dFZpZXcucGhvbmUgPSB0aGlzLm1vZGVsLmxvY2FsUGhvbmU7XHJcbiAgICAgICAgaWYodGhpcy5tb2RlbC5sb2NhbEFyZWFDb2RlKVxyXG4gICAgICAgICAgICB0aGlzLnBob25lSW5wdXRWaWV3LmFyZWEgPSB0aGlzLm1vZGVsLmxvY2FsQXJlYUNvZGU7XHJcbiAgICAgICAgdGhpcy5jbGlja1RhZ01hcFtcImNsaWNrXCJdID0gdHJ1ZVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIG9uRm9yZ2V0Q2xpY2soKVxyXG4gICAge1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kRm9yZ2V0UHdkXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbG9zZUNsaWNrKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25PcGVuKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnBob25lSW5wdXRWaWV3LnN1YlZpZXdTdGF0ZSA9IHRydWVcclxuICAgICAgICB0aGlzLnB3ZElucHV0Vmlldy5zdWJWaWV3U3RhdGUgPSB0cnVlXHJcbiAgICB9XHJcbiAgIFxyXG5cclxuICAgIHByaXZhdGUgb25Mb2dpbkJ0bkNsaWNrKClcclxuICAgIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2xpY2tUYWdNYXBbXCJjbGlja1wiXSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbGlja1RhZ01hcFtcImNsaWNrXCJdID0gZmFsc2VcclxuICAgICAgICB0aGlzLmNsaWNrVGFnTWFwW1wiY2xpY2tUaW1lclwiXSA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrVGFnTWFwW1wiY2xpY2tcIl0gPSB0cnVlXHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgaWYodGhpcy5waG9uZUlucHV0Vmlldy5waG9uZSA9PSBcIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLor7fovpPlhaXmiYvmnLrlj7dcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5wd2RJbnB1dFZpZXcucHdkID09IFwiXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuivt+i+k+WFpeWvhueggVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIXRoaXMucGhvbmVJbnB1dFZpZXcuaXNBcmVhVmFpbGQoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi6K+36YCJ5oup5q2j56Gu55qE5Zyw5Yy65L+h5oGvXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5qOA5p+lY29kZVxyXG4gICAgICAgIGxldCBwd2QgPSBHbG9iYWwuVG9vbGtpdC5tZDUodGhpcy5wd2RJbnB1dFZpZXcucHdkKTtcclxuICAgICAgICBsZXQgYWNvZGUgPSB0aGlzLnBob25lSW5wdXRWaWV3LmFyZWE7XHJcbiAgICAgICAgbGV0IHBob25lID0gdGhpcy5waG9uZUlucHV0Vmlldy5waG9uZVxyXG4gICAgICAgIHRoaXMubW9kZWwucmVxUGhvbmVMb2dpbihwaG9uZSwgcHdkLCBhY29kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNwb3NlKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkRpc3Bvc2UoKVxyXG4gICAgICAgIHRoaXMucmVzZXRUYWcoKVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucmVzZXRUYWcoKVxyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0VGFnKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmNsaWNrVGFnTWFwW1wiY2xpY2tUaW1lclwiXSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmNsaWNrVGFnTWFwW1wiY2xpY2tUaW1lclwiXSlcclxuICAgICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAgIHRoaXMuY2xpY2tUYWdNYXBbXCJjbGlja1wiXSA9IHRydWVcclxuICAgIH1cclxufSJdfQ==