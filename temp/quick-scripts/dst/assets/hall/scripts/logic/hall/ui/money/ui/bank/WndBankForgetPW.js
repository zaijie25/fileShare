
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/money/ui/bank/WndBankForgetPW.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtb25leVxcdWlcXGJhbmtcXFduZEJhbmtGb3JnZXRQVy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBcUQ7QUFFckQscUVBQWdFO0FBQ2hFLGlFQUE0RDtBQUU1RDtJQUE2QyxtQ0FBTztJQUFwRDtRQUFBLHFFQTRHQztRQTFHRywrR0FBK0c7UUFDL0csMkVBQTJFO1FBQ25FLG9CQUFjLEdBQVksZ0VBQWdFLENBQUM7O0lBd0d2RyxDQUFDO0lBL0ZHLGtDQUFrQztJQUV4QixnQ0FBTSxHQUFoQjtRQUVJLElBQUksQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLDJDQUEyQyxDQUFDO1FBQzNELElBQUksQ0FBQyxLQUFLLEdBQWMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVTLGtDQUFRLEdBQWxCO1FBRUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRWxELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUUzRCxJQUFJLENBQUMsY0FBYyxHQUFtQixJ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LENBQUMsQ0FBQztJQUNsSSxDQUFDO0lBR0wsc0JBQUM7QUFBRCxDQTVHQSxBQTRHQyxDQTVHNEMsaUJBQU8sR0E0R25EIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZEJhc2UgZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvcmUvdWkvV25kQmFzZVwiO1xyXG5pbXBvcnQgQmFua01vZGVsIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL0JhbmtNb2RlbFwiO1xyXG5pbXBvcnQgUGhvbmVJbnB1dFZpZXcgZnJvbSBcIi4uLy4uLy4uL2xvZ2luL3ZpZXcvUGhvbmVJbnB1dFZpZXdcIjtcclxuaW1wb3J0IEF1dG9Db2RlVmlldyBmcm9tIFwiLi4vLi4vLi4vbG9naW4vdmlldy9BdXRvQ29kZVZpZXdcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZEJhbmtGb3JnZXRQVyBleHRlbmRzIFduZEJhc2Uge1xyXG5cclxuICAgIC8vcHJpdmF0ZSBfcHdDaGVja1J4IDogUmVnRXhwID0gL14uKig/PS57NiwxNn0pKD89LipcXGQpKD89LipbQS1aXXsyLH0pKD89LipbYS16XXsyLH0pKD89LipbIUAjJCVeJio/XFwoXFwpXSkuKiQvO1xyXG4gICAgLy8gcHJpdmF0ZSBfcHdDaGVja1J4IDogUmVnRXhwID0gL14uKig/PS57NiwxNn0pKD89LipcXGQpKD89LipbYS16QS1aXSkuKiQvO1xyXG4gICAgcHJpdmF0ZSBfcHdDaGVja1N0cmluZyA6IHN0cmluZyA9IFwiMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcIjtcclxuXHJcbiAgICBwcml2YXRlIG1vZGVsIDogQmFua01vZGVsO1xyXG5cclxuICAgIHByaXZhdGUgcGhvbmVJbnB1dFZpZXcgOiBQaG9uZUlucHV0VmlldztcclxuICAgIHByaXZhdGUgcGhvbmVMYWJlbCA6IGNjLlJpY2hUZXh0O1xyXG5cclxuICAgIHByaXZhdGUgYXV0aENvZGVWaWV3IDogQXV0b0NvZGVWaWV3O1xyXG4gICAgcHJpdmF0ZSBwd0VkaXRCb3gxIDogY2MuRWRpdEJveDtcclxuICAgIC8vcHJpdmF0ZSBwd0VkaXRCb3gyIDogY2MuRWRpdEJveDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZEJhbmtGb3JnZXRQV1wiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBHbG9iYWwuVUkuUG9wTGF5ZXI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvbW9uZXkvYmFuay9CYW5rRm9yZ2V0UFdVSVwiO1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSA8QmFua01vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJCYW5rTW9kZWxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5vZGUud2lkdGggPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS53aWR0aDtcclxuICAgICAgICB0aGlzLm5vZGUuaGVpZ2h0ID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUuaGVpZ2h0O1xyXG5cclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiY2xvc2VcIix0aGlzLmNsb3NlLHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJjb25maXJtQnRuXCIsdGhpcy5jb25maXJtQnRuRnVuYyx0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5waG9uZUlucHV0VmlldyA9IDxQaG9uZUlucHV0Vmlldz50aGlzLmFkZFZpZXcoXCJQaG9uZUlucHV0Vmlld1wiLCB0aGlzLmdldENoaWxkKFwicGhvbmVDb250YWluZXJcIiksIFBob25lSW5wdXRWaWV3KTtcclxuICAgICAgICB0aGlzLnBob25lTGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcInBob25lTnVtTGFiZWxcIixjYy5SaWNoVGV4dCk7XHJcblxyXG4gICAgICAgIHRoaXMuYXV0aENvZGVWaWV3ID0gPEF1dG9Db2RlVmlldz50aGlzLmFkZFZpZXcoXCJBdXRvQ29kZVZpZXdcIiwgdGhpcy5nZXRDaGlsZChcImF1dGhDb2RlVmlld1wiKSwgQXV0b0NvZGVWaWV3KTtcclxuICAgICAgICB0aGlzLmF1dGhDb2RlVmlldy5zZXRQaG9uZUlucHV0QW5kVHlwZSh0aGlzLnBob25lSW5wdXRWaWV3LCAyKTtcclxuICAgICAgICB0aGlzLnB3RWRpdEJveDEgPSB0aGlzLmdldENvbXBvbmVudChcIlBhc3N3b3JkQm94MS9lZGl0Qm94XCIsY2MuRWRpdEJveCk7XHJcbiAgICAgICAgLy90aGlzLnB3RWRpdEJveDIgPSB0aGlzLmdldENvbXBvbmVudChcIlBhc3N3b3JkQm94Mi9lZGl0Qm94XCIsY2MuRWRpdEJveCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uT3BlbihhcmdzKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucGhvbmVJbnB1dFZpZXcuc3ViVmlld1N0YXRlID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuYXV0aENvZGVWaWV3LnN1YlZpZXdTdGF0ZSA9IHRydWVcclxuICAgICAgICB2YXIgaGF2ZVBob25lID0gKEdsb2JhbC5QbGF5ZXJEYXRhLnBob25lICE9IG51bGwgJiYgR2xvYmFsLlBsYXllckRhdGEucGhvbmUgIT0gXCJcIik7XHJcbiAgICAgICAgaWYoaGF2ZVBob25lKXsgLy/lt7Lnu5HlrprnlLXor51cclxuICAgICAgICAgICAgdGhpcy5waG9uZUxhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IHBob25lID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0ZVN0cldpdGhBc3RlcmlzayhHbG9iYWwuUGxheWVyRGF0YS5waG9uZSwgR2xvYmFsLlBsYXllckRhdGEucGhvbmUubGVuZ3RoLTUsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLnBob25lTGFiZWwuc3RyaW5nID0gXCI8Yj5cIiArIHBob25lKyBcIjwvYj5cIjtcclxuICAgICAgICAgICAgdGhpcy5waG9uZUlucHV0Vmlldy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IEdsb2JhbC5QbGF5ZXJEYXRhLnBob25lLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgIHRoaXMucGhvbmVJbnB1dFZpZXcuYXJlYSA9IGRhdGFbMF0ucmVwbGFjZShcIitcIixcIlwiKTtcclxuICAgICAgICAgICAgdGhpcy5waG9uZUlucHV0Vmlldy5waG9uZSA9IGRhdGFbMV07XHJcbiAgICAgICAgfWVsc2V7IC8v5pyq57uR5a6a55S16K+dXHJcbiAgICAgICAgICAgIHRoaXMucGhvbmVMYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnBob25lTGFiZWwuc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGhvbmVJbnB1dFZpZXcubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnBob25lSW5wdXRWaWV3LmFyZWEgPSBcIjg2XCI7XHJcbiAgICAgICAgICAgIHRoaXMucGhvbmVJbnB1dFZpZXcucGhvbmUgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmF1dGhDb2RlVmlldy5jb2RlID0gXCJcIjtcclxuICAgICAgICB0aGlzLnB3RWRpdEJveDEuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAvL3RoaXMucHdFZGl0Qm94Mi5zdHJpbmcgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tUZXh0RW1wdHlBbmRTaG93VGlwcyh0ZXh0OnN0cmluZywgdGlwc0xhYmVsOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBpZih0ZXh0Lmxlbmd0aCA8PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5zaG93QmFua1RpcHModGlwc0xhYmVsKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrUFdGb3JtYXQodGV4dDpzdHJpbmcsIHRpcHNMYWJlbDpzdHJpbmcpe1xyXG4gICAgICAgIGxldCBiVmFsaWQgOiBib29sZWFuID0gR2xvYmFsLlRvb2xraXQuY2hlY2tQV0Zvcm1hdCh0ZXh0KTtcclxuICAgICAgICBpZighYlZhbGlkKXtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5zaG93QmFua1RpcHModGlwc0xhYmVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGJWYWxpZDtcclxuICAgIH1cclxuXHJcbiAgICAvKiog56Gu6K6k5oyJ6ZKuICovXHJcbiAgICBjb25maXJtQnRuRnVuYygpe1xyXG4gICAgICAgIGlmKCF0aGlzLmNoZWNrVGV4dEVtcHR5QW5kU2hvd1RpcHModGhpcy5waG9uZUlucHV0Vmlldy5waG9uZSwgXCLmiYvmnLrlj7fkuI3og73kuLrnqbpcIikpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZighdGhpcy5jaGVja1RleHRFbXB0eUFuZFNob3dUaXBzKHRoaXMuYXV0aENvZGVWaWV3LmNvZGUsIFwi6aqM6K+B56CB5LiN6IO95Li656m6XCIpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYoIXRoaXMuY2hlY2tQV0Zvcm1hdCh0aGlzLnB3RWRpdEJveDEuc3RyaW5nLCBcIuivt+aMieimgeaxgui+k+WFpTZ+MTbkvY3mlbDlrZflkozlrZfmr43lr4bnoIFcIikpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICBpZighdGhpcy5waG9uZUlucHV0Vmlldy5pc0FyZWFWYWlsZCgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLor7fpgInmi6nmraPnoa7nmoTlnLDljLrkv6Hmga9cIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYoIXRoaXMuY2hlY2tQV0Zvcm1hdCh0aGlzLnB3RWRpdEJveDIuc3RyaW5nLCBcIuivt+aMieimgeaxgui+k+WFpTZ+MTbkvY3mlbDlrZflkozlrZfmr43lr4bnoIFcIikpXHJcbiAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAvLyBpZih0aGlzLnB3RWRpdEJveDEuc3RyaW5nICE9IHRoaXMucHdFZGl0Qm94Mi5zdHJpbmcpe1xyXG4gICAgICAgIC8vICAgICB0aGlzLm1vZGVsLnNob3dCYW5rVGlwcyhcIlwi5paw5a+G56CB6L6T5YWl5LiN5LiA6Ie077yM6K+36YeN5paw6L6T5YWlXCJcIik7XHJcbiAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5tb2RlbC5yZXFGb3JnZXRCYW5rUHdkKHRoaXMucGhvbmVJbnB1dFZpZXcucGhvbmUsdGhpcy5hdXRoQ29kZVZpZXcuY29kZSx0aGlzLnB3RWRpdEJveDEuc3RyaW5nLHRoaXMucGhvbmVJbnB1dFZpZXcuYXJlYSk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==