"use strict";
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