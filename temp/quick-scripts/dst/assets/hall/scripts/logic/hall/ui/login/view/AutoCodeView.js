
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/login/view/AutoCodeView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxsb2dpblxcdmlld1xcQXV0b0NvZGVWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUFvRDtBQUVwRCxnRUFBMkQ7QUFFM0Q7SUFBMEMsZ0NBQVE7SUFBbEQ7UUFBQSxxRUE4SEM7UUF2SFcsa0JBQVksR0FBRyxDQUFDLENBQUM7UUFFakIsVUFBSSxHQUFHLENBQUMsQ0FBQzs7SUFxSHJCLENBQUM7SUFwSGEsK0JBQVEsR0FBbEI7UUFFSSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsa0JBQVEsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDaEMsQ0FBQztJQUVNLDJDQUFvQixHQUEzQixVQUE0QixVQUF5QixFQUFFLElBQVc7UUFFOUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELHNCQUFXLDhCQUFJO2FBSWY7WUFFSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFD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QUFHLEtBQUssQ0FBQztRQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFLLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBRU8sd0NBQWlCLEdBQXpCO1FBRUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDaEMsQ0FBQztJQUVPLGtDQUFXLEdBQW5CO1FBRUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQTlIQSxBQThIQyxDQTlIeUMsa0JBQVEsR0E4SGpEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3VpL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBQaG9uZUlucHV0VmlldyBmcm9tIFwiLi9QaG9uZUlucHV0Vmlld1wiO1xyXG5pbXBvcnQgWVhCdXR0b24gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvY29tcG9uZW50L1lYQnV0dG9uXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRvQ29kZVZpZXcgZXh0ZW5kcyBWaWV3QmFzZVxyXG57XHJcbiAgICBwcml2YXRlIGNvZGVJbnB1dDpjYy5FZGl0Qm94O1xyXG4gICAgcHJpdmF0ZSBzZW5kQ29kZUJ0bjpZWEJ1dHRvbjtcclxuICAgIC8v5YCS6K6h5pe26IqC54K5XHJcbiAgICBwcml2YXRlIHRpbWVCdG46Y2MuTm9kZTtcclxuICAgIHByaXZhdGUgdGltZUxhYmVsOmNjLlJpY2hUZXh0O1xyXG4gICAgcHJpdmF0ZSBuZXh0U2VuZFRpbWUgPSAwO1xyXG4gICAgcHJpdmF0ZSBwaG9uZUlucHV0VmlldzpQaG9uZUlucHV0VmlldztcclxuICAgIHByaXZhdGUgdHlwZSA9IDE7XHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJjb2RlQnRuXCIsIHRoaXMub25Db2RlQnRuQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2VuZENvZGVCdG4gPSB0aGlzLmdldENvbXBvbmVudChcImNvZGVCdG5cIiwgWVhCdXR0b24pO1xyXG4gICAgICAgIHRoaXMuY29kZUlucHV0ID0gdGhpcy5nZXRDb21wb25lbnQoXCJjb2RlXCIsIGNjLkVkaXRCb3gpO1xyXG4gICAgICAgIHRoaXMudGltZUJ0biA9IHRoaXMuZ2V0Q2hpbGQoXCJ0aW1lQnRuXCIpO1xyXG4gICAgICAgIHRoaXMudGltZUxhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJ0aW1lQnRuL2xhYmVsXCIsIGNjLlJpY2hUZXh0KTtcclxuICAgICAgICB0aGlzLnRpbWVCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFBob25lSW5wdXRBbmRUeXBlKHBob25lSW5wdXQ6UGhvbmVJbnB1dFZpZXcsIHR5cGU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucGhvbmVJbnB1dFZpZXcgPSBwaG9uZUlucHV0O1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjb2RlKCB2YWx1ZSA6IHN0cmluZyApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jb2RlSW5wdXQuc3RyaW5nID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGNvZGUoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvZGVJbnB1dC5zdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNvZGVCdG5DbGljaygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5waG9uZUlucHV0Vmlldy5waG9uZSA9PSBcIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLor7fovpPlhaXmiYvmnLrlj7fnoIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLnBob25lSW5wdXRWaWV3LmlzQXJlYVZhaWxkKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuivt+mAieaLqeato+ehrueahOWcsOWMuuS/oeaBr1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFyZWEgPSB0aGlzLnBob25lSW5wdXRWaWV3LmFyZWE7XHJcbiAgICAgICAgR2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIkxvZ2luTW9kZWxcIikucmVxR2V0UGhvbmVWZXJpZnlDb2RlKHRoaXMucGhvbmVJbnB1dFZpZXcucGhvbmUsIHRoaXMudHlwZSwgYXJlYSwgKG1zZyk9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLpqozor4HnoIHlj5HpgIHmiJDlip9cIik7XHJcbiAgICAgICAgICAgIC8v5byA5aeL5YCS6K6h5pe2XHJcbiAgICAgICAgICAgIHRoaXMubmV4dFNlbmRUaW1lID0gRGF0ZS5ub3coKSArIEdsb2JhbC5TZXR0aW5nLnBob25lVmVyaWZ5Q29kZUludGVydmFsICogMTAwMDtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTZW5kQ29kZVRpbWUoKTtcclxuICAgICAgICAgICAgaWYobXNnICYmIG1zZy5jb2RlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChtc2cuY29kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvblN1YlZpZXdTaG93KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbmRDb2RlVGltZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvblN1YlZpZXdIaWRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNlbmRDb2RlQnRuLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNwb3NlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5leHRTZW5kVGltZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNlbmRDb2RlVGltZSgpXHJcbiAgICB7XHJcbiAgICAgICAgLy/mnIDlkI7kuIDnp5Llv73nlaXkuI3orqFcclxuICAgICAgICBpZih0aGlzLmNoZWNrQ2FuU2VuZCgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRDb2RlQnRuQ2FuU2VuZCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0b3RhbFRpbWUgPSB0aGlzLmdldExlZnRUaW1lKCk7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29kZUJ0bkRpc2FibGUoKVxyXG4gICAgICAgIHRoaXMuY29kZUlucHV0LnNjaGVkdWxlKCgpPT5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY2hlY2tDYW5TZW5kKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29kZUJ0bkNhblNlbmQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VuZENvZGVCdG4udW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kQ29kZUJ0bi5pc0NsaWNrVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lTGFiZWwuc3RyaW5nID0gdGhpcy5nZXRMZWZ0VGltZSgpICsgXCJzXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEsIHRvdGFsVGltZSArIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tDYW5TZW5kKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uZXh0U2VuZFRpbWUgPT0gMCB8fCB0aGlzLm5leHRTZW5kVGltZSA8IChEYXRlLm5vdygpICsgMTAwMClcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmRDb2RlQnRuRGlzYWJsZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zZW5kQ29kZUJ0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudGltZUJ0bi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCB0b3RhbFRpbWUgPSB0aGlzLmdldExlZnRUaW1lKCk7XHJcbiAgICAgICAgdGhpcy50aW1lTGFiZWwuc3RyaW5nID0gICB0b3RhbFRpbWUudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldENvZGVCdG5DYW5TZW5kKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNlbmRDb2RlQnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnRpbWVCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRMZWZ0VGltZSgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKHRoaXMubmV4dFNlbmRUaW1lIC0gRGF0ZS5ub3coKSkvMTAwMCk7XHJcbiAgICB9XHJcbn0iXX0=