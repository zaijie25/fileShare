"use strict";
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