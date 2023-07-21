
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/money/ui/bank/BankSaveWin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'df1266kuWlJU76WBvjJP3L5', 'BankSaveWin');
// hall/scripts/logic/hall/ui/money/ui/bank/BankSaveWin.ts

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
var BankSave = /** @class */ (function (_super) {
    __extends(BankSave, _super);
    function BankSave() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BankSave.prototype.getBaseNum = function () {
        return Global.PlayerData.point / Global.Setting.glodRatio;
    };
    BankSave.prototype.confirmBtnFunc = function () {
        if (this.curInputNum > 0) {
            this.model.reqSaveBankPoint(this.curInputNum * Global.Setting.glodRatio);
        }
        else {
            this.model.showBankTips("请输入存款金额");
        }
    };
    BankSave.prototype.sliderChangeFunc = function () {
        _super.prototype.sliderChangeFunc.call(this);
        var fBaseNum = Global.Toolkit.formatPointStr(Global.PlayerData.point, true); // 捕鱼中可能出现小数点后3位，在这里统一格式加判断不然会出现0.0064这样的，钱包显示为0.00但是实际还是有钱的
        if (Global.PlayerData.point == 0 || fBaseNum == '0.00') {
            this.model.showBankTips("钱包余额为0，无法存款");
        }
    };
    /** 按输入框更新显示 */
    BankSave.prototype.textChangeFunc = function () {
        // if(this.inputEditBox.string == ""){
        //     this.model.showBankTips("请输入存款金额");
        // }
        _super.prototype.textChangeFunc.call(this);
        if (this.curInputNum < 0) {
            this.model.showBankTips("请输入存款金额");
            this.inputEditBox.string == "";
        }
    };
    return BankSave;
}(BankSaveDrawBaseWin_1.default));
exports.default = BankSave;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtb25leVxcdWlcXGJhbmtcXEJhbmtTYXZlV2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZEQUF3RDtBQUV4RDtJQUFzQyw0QkFBbUI7SUFBekQ7O0lBa0NBLENBQUM7SUFoQ2EsNkJBQVUsR0FBcEI7UUFDSSxPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO0lBQzlELENBQUM7SUFFUyxpQ0FBYyxHQUF4QjtRQUNJLElBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEVBQUM7WUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBRSxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFFLENBQUM7U0FDOUU7YUFBSTtZQUNELElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3RDO0lBQ0wsQ0FBQztJQUVTLG1DQUFnQixHQUExQjtRQUNJLGlCQUFNLGdCQUFnQixXQUFFLENBQUM7UUFDekIsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQSw0REFBNEQ7UUFDeEksSUFBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksUUFBUSxJQUFJLE1BQU0sRUFBQztZQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUMxQztJQUNMLENBQUM7SUFFRCxlQUFlO0lBQ0wsaUNBQWMsR0FBeEI7UUFDSSxzQ0FBc0M7UUFDdEMsMENBQTBDO1FBQzFDLElBQUk7UUFDSixpQkFBTSxjQUFjLFdBQUUsQ0FBQztRQUN2QixJQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxFQUFDO1lBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztTQUNsQztJQUNMLENBQUM7SUFFTCxlQUFDO0FBQUQsQ0FsQ0EsQUFrQ0MsQ0FsQ3FDLDZCQUFtQixHQWtDeEQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFua1NhdmVEcmF3QmFzZVdpbiBmcm9tIFwiLi9CYW5rU2F2ZURyYXdCYXNlV2luXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYW5rU2F2ZSBleHRlbmRzIEJhbmtTYXZlRHJhd0Jhc2VXaW4ge1xyXG5cclxuICAgIHByb3RlY3RlZCBnZXRCYXNlTnVtKCl7XHJcbiAgICAgICAgcmV0dXJuIEdsb2JhbC5QbGF5ZXJEYXRhLnBvaW50IC8gR2xvYmFsLlNldHRpbmcuZ2xvZFJhdGlvO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgY29uZmlybUJ0bkZ1bmMoKXtcclxuICAgICAgICBpZih0aGlzLmN1cklucHV0TnVtID4gMCl7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwucmVxU2F2ZUJhbmtQb2ludCggdGhpcy5jdXJJbnB1dE51bSAqIEdsb2JhbC5TZXR0aW5nLmdsb2RSYXRpbyApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLnNob3dCYW5rVGlwcyhcIuivt+i+k+WFpeWtmOasvumHkeminVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHNsaWRlckNoYW5nZUZ1bmMoKXtcclxuICAgICAgICBzdXBlci5zbGlkZXJDaGFuZ2VGdW5jKCk7XHJcbiAgICAgICAgdmFyIGZCYXNlTnVtID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoR2xvYmFsLlBsYXllckRhdGEucG9pbnQsIHRydWUpOy8vIOaNlemxvOS4reWPr+iDveWHuueOsOWwj+aVsOeCueWQjjPkvY3vvIzlnKjov5nph4znu5/kuIDmoLzlvI/liqDliKTmlq3kuI3nhLbkvJrlh7rnjrAwLjAwNjTov5nmoLfnmoTvvIzpkrHljIXmmL7npLrkuLowLjAw5L2G5piv5a6e6ZmF6L+Y5piv5pyJ6ZKx55qEXHJcbiAgICAgICAgaWYoR2xvYmFsLlBsYXllckRhdGEucG9pbnQgPT0gMCB8fCBmQmFzZU51bSA9PSAnMC4wMCcpe1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLnNob3dCYW5rVGlwcyhcIumSseWMheS9memineS4ujDvvIzml6Dms5XlrZjmrL5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmjInovpPlhaXmoYbmm7TmlrDmmL7npLogKi9cclxuICAgIHByb3RlY3RlZCB0ZXh0Q2hhbmdlRnVuYygpe1xyXG4gICAgICAgIC8vIGlmKHRoaXMuaW5wdXRFZGl0Qm94LnN0cmluZyA9PSBcIlwiKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5tb2RlbC5zaG93QmFua1RpcHMoXCLor7fovpPlhaXlrZjmrL7ph5Hpop1cIik7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHN1cGVyLnRleHRDaGFuZ2VGdW5jKCk7XHJcbiAgICAgICAgaWYodGhpcy5jdXJJbnB1dE51bSA8IDApe1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLnNob3dCYW5rVGlwcyhcIuivt+i+k+WFpeWtmOasvumHkeminVwiKTtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dEVkaXRCb3guc3RyaW5nID09IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=