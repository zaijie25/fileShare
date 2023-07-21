
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/money/ui/bank/BankDrawWin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '71605io+yNM5Ivp461kKbh5', 'BankDrawWin');
// hall/scripts/logic/hall/ui/money/ui/bank/BankDrawWin.ts

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
var BankSaveDrawBaseWin_1 = require("./BankSaveDrawBaseWin");
var BankDraw = /** @class */ (function (_super) {
    __extends(BankDraw, _super);
    function BankDraw() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BankDraw.prototype.getBaseNum = function () {
        return Global.PlayerData.bank_point / Global.Setting.glodRatio;
    };
    BankDraw.prototype.confirmBtnFunc = function () {
        if (this.curInputNum > 0) {
            this.model.reqDrawBankPoint(this.curInputNum * Global.Setting.glodRatio);
        }
        else {
            this.model.showBankTips("请输入取款金额");
        }
    };
    BankDraw.prototype.sliderChangeFunc = function () {
        _super.prototype.sliderChangeFunc.call(this);
        if (Global.PlayerData.bank_point == 0) {
            this.model.showBankTips("银行余额为0，无法取款");
        }
    };
    /** 按输入框更新显示 */
    BankDraw.prototype.textChangeFunc = function () {
        // if(this.inputEditBox.string == ""){
        //     this.model.showBankTips("请输入取款金额");
        // }
        _super.prototype.textChangeFunc.call(this);
        if (this.curInputNum < 0) {
            this.model.showBankTips("请输入取款金额");
            this.inputEditBox.string == "";
        }
    };
    return BankDraw;
}(BankSaveDrawBaseWin_1.default));
exports.default = BankDraw;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtb25leVxcdWlcXGJhbmtcXEJhbmtEcmF3V2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZEQUF3RDtBQUV4RDtJQUFzQyw0QkFBbUI7SUFBekQ7O0lBZ0NBLENBQUM7SUE5QmEsNkJBQVUsR0FBcEI7UUFDSSxPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO0lBQ25FLENBQUM7SUFFUyxpQ0FBYyxHQUF4QjtRQUNJLElBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEVBQUM7WUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBRSxJQUFJLENBQUMsV0FBVyxHQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDOUU7YUFBSTtZQUNELElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3RDO0lBQ0wsQ0FBQztJQUVTLG1DQUFnQixHQUExQjtRQUNJLGlCQUFNLGdCQUFnQixXQUFFLENBQUM7UUFDekIsSUFBRyxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsSUFBSSxDQUFDLEVBQUM7WUFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDMUM7SUFDTCxDQUFDO0lBRUQsZUFBZTtJQUNMLGlDQUFjLEdBQXhCO1FBQ0ksc0NBQXNDO1FBQ3RDLDBDQUEwQztRQUMxQyxJQUFJO1FBQ0osaUJBQU0sY0FBYyxXQUFFLENBQUM7UUFDdkIsSUFBRyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsRUFBQztZQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7U0FDbEM7SUFDTCxDQUFDO0lBQ0wsZUFBQztBQUFELENBaENBLEFBZ0NDLENBaENxQyw2QkFBbUIsR0FnQ3hEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhbmtTYXZlRHJhd0Jhc2VXaW4gZnJvbSBcIi4vQmFua1NhdmVEcmF3QmFzZVdpblwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFua0RyYXcgZXh0ZW5kcyBCYW5rU2F2ZURyYXdCYXNlV2luIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0QmFzZU51bSgpe1xyXG4gICAgICAgIHJldHVybiBHbG9iYWwuUGxheWVyRGF0YS5iYW5rX3BvaW50IC8gR2xvYmFsLlNldHRpbmcuZ2xvZFJhdGlvO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjb25maXJtQnRuRnVuYygpe1xyXG4gICAgICAgIGlmKHRoaXMuY3VySW5wdXROdW0gPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5yZXFEcmF3QmFua1BvaW50KCB0aGlzLmN1cklucHV0TnVtICAqIEdsb2JhbC5TZXR0aW5nLmdsb2RSYXRpbyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwuc2hvd0JhbmtUaXBzKFwi6K+36L6T5YWl5Y+W5qy+6YeR6aKdXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2xpZGVyQ2hhbmdlRnVuYygpe1xyXG4gICAgICAgIHN1cGVyLnNsaWRlckNoYW5nZUZ1bmMoKTtcclxuICAgICAgICBpZihHbG9iYWwuUGxheWVyRGF0YS5iYW5rX3BvaW50ID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLnNob3dCYW5rVGlwcyhcIumTtuihjOS9memineS4ujDvvIzml6Dms5Xlj5bmrL5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmjInovpPlhaXmoYbmm7TmlrDmmL7npLogKi9cclxuICAgIHByb3RlY3RlZCB0ZXh0Q2hhbmdlRnVuYygpe1xyXG4gICAgICAgIC8vIGlmKHRoaXMuaW5wdXRFZGl0Qm94LnN0cmluZyA9PSBcIlwiKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5tb2RlbC5zaG93QmFua1RpcHMoXCLor7fovpPlhaXlj5bmrL7ph5Hpop1cIik7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHN1cGVyLnRleHRDaGFuZ2VGdW5jKCk7XHJcbiAgICAgICAgaWYodGhpcy5jdXJJbnB1dE51bSA8IDApe1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLnNob3dCYW5rVGlwcyhcIuivt+i+k+WFpeWPluasvumHkeminVwiKTtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dEVkaXRCb3guc3RyaW5nID09IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==