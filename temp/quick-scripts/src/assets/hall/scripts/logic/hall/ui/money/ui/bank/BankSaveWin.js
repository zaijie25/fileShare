"use strict";
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