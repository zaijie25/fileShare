
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/personalInfo/WndChangePwd.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwZXJzb25hbEluZm9cXFduZENoYW5nZVB3ZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBK0M7QUFDL0MsMkRBQXNEO0FBQ3RELCtEQUEwRDtBQUMxRCwyREFBc0Q7QUFHdEQ7SUFBMEMsZ0NBQU87SUFBakQ7O0lBcUVBLENBQUM7SUEvRGEsNkJBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsMENBQTBDLENBQUM7UUFDMUQsSUFBSSxDQUFDLEtBQUssR0FBc0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBRVMsK0JBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUxRCxJQUFJLENBQUMsY0FBYyxHQUFtQixJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRSx3QkFBYyxDQUFDLENBQUM7UUFDdEgsSUFBSSxDQUFDLFlBQVksR0FBaUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxzQkFBWSxDQUFDLENBQUM7UUFDNUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxZQUFZLEdBQWlCLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsc0JBQVksQ0FBQyxDQUFDO0lBQ2hILENBQUM7SUFFUyw2QkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQTtRQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUE7UUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBO1FBRXJDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVPLCtCQUFRLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFTyxxQ0FBYyxHQUF0QjtRQUFBLGlCQStCQztRQTlCRyxJQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxJQUFJLEVBQUUsRUFDbEM7WUFDSSxPQUFPLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsSUFBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxFQUFFLEVBQy9CO1lBQ0ksT0FBTyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN0QztRQUNELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFDO1lBQzVCLE9BQU8sTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDckM7UUFDRCxJQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFDdkQ7WUFDSSxPQUFPLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDM0Q7UUFFRCxJQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsRUFDckM7WUFDSSxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNoQyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQztRQUN0QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztRQUNsQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztRQUNwQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQztRQUNoQyxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQzFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVCLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxtQkFBQztBQUFELENBckVBLEFBcUVDLENBckV5QyxpQkFBTyxHQXFFaEQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV25kQmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9XbmRCYXNlXCI7XHJcbmltcG9ydCBBdXRvQ29kZVZpZXcgZnJvbSBcIi4uL2xvZ2luL3ZpZXcvQXV0b0NvZGVWaWV3XCI7XHJcbmltcG9ydCBQaG9uZUlucHV0VmlldyBmcm9tIFwiLi4vbG9naW4vdmlldy9QaG9uZUlucHV0Vmlld1wiO1xyXG5pbXBvcnQgUHdkSW5wdXRWaWV3IGZyb20gXCIuLi9sb2dpbi92aWV3L1B3ZElucHV0Vmlld1wiO1xyXG5pbXBvcnQgUGVyc29uYWxJbmZvTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvUGVyc29uYWxJbmZvTW9kZWxcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZENoYW5nZVB3ZCBleHRlbmRzIFduZEJhc2V7XHJcbiAgICBwcml2YXRlIHBob25lSW5wdXRWaWV3OiBQaG9uZUlucHV0VmlldztcclxuICAgIHByaXZhdGUgYXV0aENvZGVWaWV3OiBBdXRvQ29kZVZpZXc7XHJcbiAgICBwcml2YXRlIHB3ZElucHV0VmlldzogUHdkSW5wdXRWaWV3O1xyXG4gICAgcHJpdmF0ZSBtb2RlbDogUGVyc29uYWxJbmZvTW9kZWw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZENoYW5nZVB3ZFwiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBHbG9iYWwuVUkuUG9wTGF5ZXI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvUGVyc29uYWxJbmZvL0NoYW5nZVB3ZFVJXCI7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IDxQZXJzb25hbEluZm9Nb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiUGVyc29uYWxJbmZvTW9kZWxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImJnL2Nsb3NlXCIsIHRoaXMuY2xvc2VXbmQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJjYW5jZWxCdG5cIiwgdGhpcy5jbG9zZVduZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcInN1cmVCdG5cIiwgdGhpcy5vblN1cmVCdG5DbGljaywgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMucGhvbmVJbnB1dFZpZXcgPSA8UGhvbmVJbnB1dFZpZXc+dGhpcy5hZGRWaWV3KFwiUGhvbmVJbnB1dFZpZXdcIiwgdGhpcy5nZXRDaGlsZChcInBob25lQ29udGFpbmVyXCIpLCBQaG9uZUlucHV0Vmlldyk7XHJcbiAgICAgICAgdGhpcy5hdXRoQ29kZVZpZXcgPSA8QXV0b0NvZGVWaWV3PnRoaXMuYWRkVmlldyhcIkF1dG9Db2RlVmlld1wiLCB0aGlzLmdldENoaWxkKFwiYXV0aENvZGVWaWV3XCIpLCBBdXRvQ29kZVZpZXcpO1xyXG4gICAgICAgIHRoaXMuYXV0aENvZGVWaWV3LnNldFBob25lSW5wdXRBbmRUeXBlKHRoaXMucGhvbmVJbnB1dFZpZXcsIDIpO1xyXG4gICAgICAgIHRoaXMucHdkSW5wdXRWaWV3ID0gPFB3ZElucHV0Vmlldz50aGlzLmFkZFZpZXcoXCJQd2RJbnB1dFZpZXdcIiwgdGhpcy5nZXRDaGlsZChcInB3ZENvbnRhaW5lclwiKSwgUHdkSW5wdXRWaWV3KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKCl7XHJcbiAgICAgICAgdGhpcy5waG9uZUlucHV0Vmlldy5zdWJWaWV3U3RhdGUgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5hdXRoQ29kZVZpZXcuc3ViVmlld1N0YXRlID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMucHdkSW5wdXRWaWV3LnN1YlZpZXdTdGF0ZSA9IHRydWVcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmF1dGhDb2RlVmlldy5jb2RlID0gXCJcIjtcclxuICAgICAgICB0aGlzLnB3ZElucHV0Vmlldy5wd2QgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xvc2VXbmQoKXtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblN1cmVCdG5DbGljaygpe1xyXG4gICAgICAgIGlmKHRoaXMucGhvbmVJbnB1dFZpZXcucGhvbmUgPT0gXCJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBHbG9iYWwuVUkuZmFzdFRpcChcIuivt+i+k+WFpeaJi+acuuWPt+eggVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5hdXRoQ29kZVZpZXcuY29kZSA9PSBcIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEdsb2JhbC5VSS5mYXN0VGlwKFwi6K+36L6T5YWl6aqM6K+B56CBXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wd2RJbnB1dFZpZXcucHdkID09IFwiXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gR2xvYmFsLlVJLmZhc3RUaXAoXCLor7fovpPlhaXlr4bnoIFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFHbG9iYWwuVG9vbGtpdC5jaGVja1BXRm9ybWF0KHRoaXMucHdkSW5wdXRWaWV3LnB3ZCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gR2xvYmFsLlVJLmZhc3RUaXAoR2xvYmFsLkxhbmd1YWdlLmdldFdvcmQoMTMwMykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIXRoaXMucGhvbmVJbnB1dFZpZXcuaXNBcmVhVmFpbGQoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi6K+36YCJ5oup5q2j56Gu55qE5Zyw5Yy65L+h5oGvXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwaG9uZSA9IHRoaXMucGhvbmVJbnB1dFZpZXcucGhvbmU7XHJcbiAgICAgICAgbGV0IGNvZGUgPSB0aGlzLmF1dGhDb2RlVmlldy5jb2RlO1xyXG4gICAgICAgIGxldCBhcmVhID0gdGhpcy5waG9uZUlucHV0Vmlldy5hcmVhO1xyXG4gICAgICAgIGxldCBwd2QgPSB0aGlzLnB3ZElucHV0Vmlldy5wd2Q7XHJcbiAgICAgICAgcHdkID0gR2xvYmFsLlRvb2xraXQubWQ1KHB3ZCk7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5yZXFFZGl0UHdkKHBob25lLCBjb2RlLCBhcmVhLCBwd2QsICgpPT57XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5a+G56CB5L+u5pS55oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlV25kKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=