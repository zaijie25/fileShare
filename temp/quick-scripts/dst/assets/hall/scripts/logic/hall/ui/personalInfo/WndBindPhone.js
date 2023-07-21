
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/personalInfo/WndBindPhone.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5795c3vfutPiY487dBBz+X3', 'WndBindPhone');
// hall/scripts/logic/hall/ui/personalInfo/WndBindPhone.ts

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
var HallPopMsgHelper_1 = require("../../tool/HallPopMsgHelper");
var WndBindPhone = /** @class */ (function (_super) {
    __extends(WndBindPhone, _super);
    function WndBindPhone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndBindPhone.prototype.onInit = function () {
        this.name = "WndBindPhone";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/PersonalInfo/BindPhoneUI";
        this.model = Global.ModelManager.getModel("PersonalInfoModel");
    };
    WndBindPhone.prototype.initView = function () {
        this.addCommonClick("bg/close", this.closeWnd, this);
        this.addCommonClick("cancelBtn", this.closeWnd, this);
        this.addCommonClick("sureBtn", this.onSureBtnClick, this);
        this.phoneInputView = this.addView("PhoneInputView", this.getChild("phoneContainer"), PhoneInputView_1.default);
        this.authCodeView = this.addView("AutoCodeView", this.getChild("authCodeView"), AutoCodeView_1.default);
        this.authCodeView.setPhoneInputAndType(this.phoneInputView, 1);
        this.pwdInputView = this.addView("PwdInputView1", this.getChild("pwdContainer"), PwdInputView_1.default);
    };
    WndBindPhone.prototype.closeWnd = function () {
        this.close();
    };
    WndBindPhone.prototype.onOpen = function (args) {
        this.phoneInputView.subViewState = true;
        this.authCodeView.subViewState = true;
        this.pwdInputView.subViewState = true;
        this.phoneInputView.phone = "";
        this.authCodeView.code = "";
        this.pwdInputView.pwd = "";
    };
    WndBindPhone.prototype.onSureBtnClick = function () {
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
        if (!this.phoneInputView.isAreaVaild()) {
            Global.UI.fastTip("请选择正确的地区信息");
            return;
        }
        var phone = this.phoneInputView.phone;
        var code = this.authCodeView.code;
        var area = this.phoneInputView.area;
        var pwd = this.pwdInputView.pwd;
        if (!Global.Toolkit.checkPWFormat(this.pwdInputView.pwd)) {
            return Global.UI.fastTip(Global.Language.getWord(1303));
        }
        pwd = Global.Toolkit.md5(pwd);
        this.model.reqBindPhone(phone, code, area, pwd, function (msg) {
            // let bind_point = msg.bind_point ? Global.Toolkit.formatPoint(msg.bind_point) : 0//绑定送礼金额
            // let phone_point = msg.phone_point ? Global.Toolkit.formatPoint(msg.phone_point) : 0//绑定送礼金额
            var bind_point = msg.bind_point ? msg.bind_point : 0; //绑定送礼金额
            var phone_point = msg.phone_point ? msg.phone_point : 0; //绑定送礼金额
            var phone;
            if (!msg.phone) {
                phone = "";
            }
            if (msg.phone.indexOf(" ") == -1) {
                phone = Global.AESUtil.decodeMsg(msg.phone);
            }
            else {
                phone = msg.phone;
            }
            Global.PlayerData.phone = phone ? phone : "";
            if (bind_point > 0 || phone_point > 0) { //有绑定送金或者自动送金
                if (bind_point > 0) {
                    HallPopMsgHelper_1.default.Instance.addMsgList(HallPopMsgHelper_1.PopWndName.BindGiftGet, function () {
                        HallPopMsgHelper_1.default.Instance.addLock(HallPopMsgHelper_1.PopWndName.BindGiftGet);
                        Global.UI.show("WndRebateGet", bind_point, phone_point > 0 ? HallPopMsgHelper_1.BindAwardUIType.bindPoint : HallPopMsgHelper_1.BindAwardUIType.onlyBindPoint);
                    });
                }
                if (phone_point > 0) {
                    HallPopMsgHelper_1.default.Instance.addMsgList(HallPopMsgHelper_1.PopWndName.PhoneGiftGet, function () {
                        HallPopMsgHelper_1.default.Instance.addLock(HallPopMsgHelper_1.PopWndName.PhoneGiftGet);
                        Global.UI.show("WndRebateGet", phone_point, bind_point > 0 ? HallPopMsgHelper_1.BindAwardUIType.phonePoint : HallPopMsgHelper_1.BindAwardUIType.onlyPhonePoint);
                    });
                }
            }
            if (bind_point == 0 && phone_point == 0) { //都没有送金的时候也要弹出绑定成功
                if (phone) {
                    Global.UI.fastTip("绑定手机成功");
                }
            }
            _this.closeWnd();
        });
    };
    WndBindPhone.prototype.onClose = function () {
        HallPopMsgHelper_1.default.Instance.releaseLock(HallPopMsgHelper_1.PopWndName.BindPhone);
    };
    return WndBindPhone;
}(WndBase_1.default));
exports.default = WndBindPhone;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwZXJzb25hbEluZm9cXFduZEJpbmRQaG9uZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBK0M7QUFDL0MsMkRBQXNEO0FBQ3RELCtEQUEwRDtBQUMxRCwyREFBc0Q7QUFFdEQsZ0VBQTRGO0FBRTVGO0lBQTBDLGdDQUFPO0lBQWpEOztJQXFIQSxDQUFDO0lBOUdhLDZCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxjQUFjLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLDBDQUEwQyxDQUFDO1FBQzFELElBQUksQ0FBQyxLQUFLLEdBQXNCLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVTLCtCQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFMUQsSUFBSSxDQUFDLGNBQWMsR0FBbUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsd0JBQWMsQ0FBQyxDQUFDO1FBQ3RILElBQUksQ0FBQyxZQUFZLEdBQWlCLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMs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UUFBUSxDQUFDLE9BQU8sQ0FBQyw2QkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUMzRCxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtDQUFlLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxrQ0FBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUM1SCxDQUFDLENBQUMsQ0FBQTtpQkFDTDthQUNKO1lBQ0QsSUFBRyxVQUFVLElBQUksQ0FBQyxJQUFJLFdBQVcsSUFBSSxDQUFDLEVBQUMsRUFBRyxrQkFBa0I7Z0JBQ3hELElBQUcsS0FBSyxFQUFDO29CQUNMLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUMvQjthQUNKO1lBQ0QsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRXBCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVTLDhCQUFPLEdBQWpCO1FBQ0ksMEJBQWdCLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyw2QkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFDTCxtQkFBQztBQUFELENBckhBLEFBcUhDLENBckh5QyxpQkFBTyxHQXFIaEQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV25kQmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9XbmRCYXNlXCI7XHJcbmltcG9ydCBBdXRvQ29kZVZpZXcgZnJvbSBcIi4uL2xvZ2luL3ZpZXcvQXV0b0NvZGVWaWV3XCI7XHJcbmltcG9ydCBQaG9uZUlucHV0VmlldyBmcm9tIFwiLi4vbG9naW4vdmlldy9QaG9uZUlucHV0Vmlld1wiO1xyXG5pbXBvcnQgUHdkSW5wdXRWaWV3IGZyb20gXCIuLi9sb2dpbi92aWV3L1B3ZElucHV0Vmlld1wiO1xyXG5pbXBvcnQgUGVyc29uYWxJbmZvTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvUGVyc29uYWxJbmZvTW9kZWxcIjtcclxuaW1wb3J0IEhhbGxQb3BNc2dIZWxwZXIsIHsgUG9wV25kTmFtZSwgQmluZEF3YXJkVUlUeXBlIH0gZnJvbSBcIi4uLy4uL3Rvb2wvSGFsbFBvcE1zZ0hlbHBlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV25kQmluZFBob25lIGV4dGVuZHMgV25kQmFzZXtcclxuICAgIHByaXZhdGUgcGhvbmVJbnB1dFZpZXc6IFBob25lSW5wdXRWaWV3O1xyXG4gICAgcHJpdmF0ZSBhdXRoQ29kZVZpZXc6IEF1dG9Db2RlVmlldztcclxuICAgIHByaXZhdGUgcHdkSW5wdXRWaWV3OiBQd2RJbnB1dFZpZXc7XHJcbiAgICBwcml2YXRlIG1vZGVsOiBQZXJzb25hbEluZm9Nb2RlbDtcclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZEJpbmRQaG9uZVwiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBHbG9iYWwuVUkuUG9wTGF5ZXI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvUGVyc29uYWxJbmZvL0JpbmRQaG9uZVVJXCI7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IDxQZXJzb25hbEluZm9Nb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiUGVyc29uYWxJbmZvTW9kZWxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImJnL2Nsb3NlXCIsIHRoaXMuY2xvc2VXbmQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJjYW5jZWxCdG5cIiwgdGhpcy5jbG9zZVduZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcInN1cmVCdG5cIiwgdGhpcy5vblN1cmVCdG5DbGljaywgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMucGhvbmVJbnB1dFZpZXcgPSA8UGhvbmVJbnB1dFZpZXc+dGhpcy5hZGRWaWV3KFwiUGhvbmVJbnB1dFZpZXdcIiwgdGhpcy5nZXRDaGlsZChcInBob25lQ29udGFpbmVyXCIpLCBQaG9uZUlucHV0Vmlldyk7XHJcbiAgICAgICAgdGhpcy5hdXRoQ29kZVZpZXcgPSA8QXV0b0NvZGVWaWV3PnRoaXMuYWRkVmlldyhcIkF1dG9Db2RlVmlld1wiLCB0aGlzLmdldENoaWxkKFwiYXV0aENvZGVWaWV3XCIpLCBBdXRvQ29kZVZpZXcpO1xyXG4gICAgICAgIHRoaXMuYXV0aENvZGVWaWV3LnNldFBob25lSW5wdXRBbmRUeXBlKHRoaXMucGhvbmVJbnB1dFZpZXcsIDEpO1xyXG4gICAgICAgIHRoaXMucHdkSW5wdXRWaWV3ID0gPFB3ZElucHV0Vmlldz50aGlzLmFkZFZpZXcoXCJQd2RJbnB1dFZpZXcxXCIsIHRoaXMuZ2V0Q2hpbGQoXCJwd2RDb250YWluZXJcIiksIFB3ZElucHV0Vmlldyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbG9zZVduZCgpe1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKGFyZ3Mpe1xyXG5cclxuICAgICAgICB0aGlzLnBob25lSW5wdXRWaWV3LnN1YlZpZXdTdGF0ZSA9IHRydWVcclxuICAgICAgICB0aGlzLmF1dGhDb2RlVmlldy5zdWJWaWV3U3RhdGUgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5wd2RJbnB1dFZpZXcuc3ViVmlld1N0YXRlID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMucGhvbmVJbnB1dFZpZXcucGhvbmUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuYXV0aENvZGVWaWV3LmNvZGUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMucHdkSW5wdXRWaWV3LnB3ZCA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblN1cmVCdG5DbGljaygpe1xyXG4gICAgICAgIGlmKHRoaXMucGhvbmVJbnB1dFZpZXcucGhvbmUgPT0gXCJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBHbG9iYWwuVUkuZmFzdFRpcChcIuivt+i+k+WFpeaJi+acuuWPt+eggVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5hdXRoQ29kZVZpZXcuY29kZSA9PSBcIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEdsb2JhbC5VSS5mYXN0VGlwKFwi6K+36L6T5YWl6aqM6K+B56CBXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnB3ZElucHV0Vmlldy5wd2QgPT0gXCJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBHbG9iYWwuVUkuZmFzdFRpcChcIuivt+i+k+WFpeWvhueggVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLnBob25lSW5wdXRWaWV3LmlzQXJlYVZhaWxkKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuivt+mAieaLqeato+ehrueahOWcsOWMuuS/oeaBr1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBob25lID0gdGhpcy5waG9uZUlucHV0Vmlldy5waG9uZTtcclxuICAgICAgICBsZXQgY29kZSA9IHRoaXMuYXV0aENvZGVWaWV3LmNvZGU7XHJcbiAgICAgICAgbGV0IGFyZWEgPSB0aGlzLnBob25lSW5wdXRWaWV3LmFyZWE7XHJcbiAgICAgICAgbGV0IHB3ZCA9IHRoaXMucHdkSW5wdXRWaWV3LnB3ZDtcclxuXHJcbiAgICAgICAgaWYoIUdsb2JhbC5Ub29sa2l0LmNoZWNrUFdGb3JtYXQodGhpcy5wd2RJbnB1dFZpZXcucHdkKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBHbG9iYWwuVUkuZmFzdFRpcChHbG9iYWwuTGFuZ3VhZ2UuZ2V0V29yZCgxMzAzKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwd2QgPSBHbG9iYWwuVG9vbGtpdC5tZDUocHdkKTtcclxuICAgICAgICB0aGlzLm1vZGVsLnJlcUJpbmRQaG9uZShwaG9uZSwgY29kZSwgYXJlYSwgcHdkLCAobXNnOmFueSk9PntcclxuICAgICAgICAgICAgLy8gbGV0IGJpbmRfcG9pbnQgPSBtc2cuYmluZF9wb2ludCA/IEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50KG1zZy5iaW5kX3BvaW50KSA6IDAvL+e7keWumumAgeekvOmHkeminVxyXG4gICAgICAgICAgICAvLyBsZXQgcGhvbmVfcG9pbnQgPSBtc2cucGhvbmVfcG9pbnQgPyBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludChtc2cucGhvbmVfcG9pbnQpIDogMC8v57uR5a6a6YCB56S86YeR6aKdXHJcbiAgICAgICAgICAgIGxldCBiaW5kX3BvaW50ID0gbXNnLmJpbmRfcG9pbnQgPyBtc2cuYmluZF9wb2ludCA6IDAvL+e7keWumumAgeekvOmHkeminVxyXG4gICAgICAgICAgICBsZXQgcGhvbmVfcG9pbnQgPSBtc2cucGhvbmVfcG9pbnQgPyBtc2cucGhvbmVfcG9pbnQgOiAwLy/nu5HlrprpgIHnpLzph5Hpop1cclxuXHJcbiAgICAgICAgICAgIGxldCBwaG9uZSBcclxuICAgICAgICAgICAgaWYoIW1zZy5waG9uZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGhvbmUgPSBcIlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobXNnLnBob25lLmluZGV4T2YoXCIgXCIpID09IC0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwaG9uZSA9IEdsb2JhbC5BRVNVdGlsLmRlY29kZU1zZyhtc2cucGhvbmUpICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBob25lID0gbXNnLnBob25lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdsb2JhbC5QbGF5ZXJEYXRhLnBob25lID0gcGhvbmU/IHBob25lIDogXCJcIjtcclxuICAgICAgICAgICAgaWYoYmluZF9wb2ludCA+IDAgfHwgcGhvbmVfcG9pbnQgPiAwKXsgIC8v5pyJ57uR5a6a6YCB6YeR5oiW6ICF6Ieq5Yqo6YCB6YeRXHJcbiAgICAgICAgICAgICAgICBpZihiaW5kX3BvaW50ID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgSGFsbFBvcE1zZ0hlbHBlci5JbnN0YW5jZS5hZGRNc2dMaXN0KFBvcFduZE5hbWUuQmluZEdpZnRHZXQsICgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEhhbGxQb3BNc2dIZWxwZXIuSW5zdGFuY2UuYWRkTG9jayhQb3BXbmROYW1lLkJpbmRHaWZ0R2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRSZWJhdGVHZXRcIixiaW5kX3BvaW50LHBob25lX3BvaW50ID4gMCA/IEJpbmRBd2FyZFVJVHlwZS5iaW5kUG9pbnQgOiBCaW5kQXdhcmRVSVR5cGUub25seUJpbmRQb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHBob25lX3BvaW50ID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgSGFsbFBvcE1zZ0hlbHBlci5JbnN0YW5jZS5hZGRNc2dMaXN0KFBvcFduZE5hbWUuUGhvbmVHaWZ0R2V0LCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBIYWxsUG9wTXNnSGVscGVyLkluc3RhbmNlLmFkZExvY2soUG9wV25kTmFtZS5QaG9uZUdpZnRHZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZFJlYmF0ZUdldFwiLHBob25lX3BvaW50LGJpbmRfcG9pbnQgPiAwID8gQmluZEF3YXJkVUlUeXBlLnBob25lUG9pbnQgOiBCaW5kQXdhcmRVSVR5cGUub25seVBob25lUG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoYmluZF9wb2ludCA9PSAwICYmIHBob25lX3BvaW50ID09IDApeyAgLy/pg73msqHmnInpgIHph5HnmoTml7blgJnkuZ/opoHlvLnlh7rnu5HlrprmiJDlip9cclxuICAgICAgICAgICAgICAgIGlmKHBob25lKXtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIue7keWumuaJi+acuuaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNsb3NlV25kKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKCl7XHJcbiAgICAgICAgSGFsbFBvcE1zZ0hlbHBlci5JbnN0YW5jZS5yZWxlYXNlTG9jayhQb3BXbmROYW1lLkJpbmRQaG9uZSk7XHJcbiAgICB9XHJcbn0iXX0=