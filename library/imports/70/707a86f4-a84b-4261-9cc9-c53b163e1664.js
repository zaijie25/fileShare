"use strict";
cc._RF.push(module, '707a8b0qEtCYZzJxTsWPhZk', 'ExtractCashWin');
// hall/scripts/logic/hall/ui/money/ui/common/ExtractCashWin.ts

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
var ViewBase_1 = require("../../../../../core/ui/ViewBase");
var GlobalEvent_1 = require("../../../../../core/GlobalEvent");
var ExtractEvent_1 = require("../extractCash/ExtractEvent");
var ExtractCashWin = /** @class */ (function (_super) {
    __extends(ExtractCashWin, _super);
    function ExtractCashWin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.msgLabel = null;
        _this.curMoneyNumLabel = null;
        _this.ecNumEditBox = null;
        _this.rateLabel = null;
        return _this;
    }
    ExtractCashWin.prototype.initView = function () {
        this.model = Global.ModelManager.getModel("ExtractModel");
        this.msgLabel = this.getComponent("aliMsg/msgLabel", cc.Label);
        this.curMoneyNumLabel = this.getComponent("CurMoneyBox/curMoneyNumLabel", cc.Label);
        this.ecNumEditBox = this.getComponent("ecEditBox", cc.EditBox);
        this.rateLabel = this.getComponent("rateLabel", cc.RichText);
        // this.addCommonClick("confirmBtn",this.confirmBtn,this);
        // this.addCommonClick("resetBtn",this.resetBtnFunc,this);
    };
    ExtractCashWin.prototype.chipItemToggleFunc = function (data) {
        var num = this.ecNumEditBox.string != "" ? parseFloat(this.ecNumEditBox.string) : 0; //获取元数
        num = Math.max(num, 0);
        num = Math.round(num * 100) / 100; //保留两位小数
        num += data;
        this.ecNumEditBox.string = num + "";
    };
    ExtractCashWin.prototype.onSubViewShow = function () {
        //Listener
        this.model.on(ExtractEvent_1.ExtractEvent.ChipItemToggle, this, this.chipItemToggleFunc);
        Global.Event.on(GlobalEvent_1.default.PERSONALINFOUPDATE, this, this.updateCurMoney);
        this.updateCurMoney();
        this.updateChipList();
        this.resetBtnFunc();
    };
    ExtractCashWin.prototype.onSubViewHide = function () {
        //Listener
        this.model.off(ExtractEvent_1.ExtractEvent.ChipItemToggle, this, this.chipItemToggleFunc);
        Global.Event.off(GlobalEvent_1.default.PERSONALINFOUPDATE, this, this.updateCurMoney);
        //this.clearItem();
    };
    /** 更新当前可提现金额 */
    ExtractCashWin.prototype.updateCurMoney = function () {
        if (!this.model.bankDatas) {
            return;
        }
    };
    /** 重置提现金额 */
    ExtractCashWin.prototype.resetBtnFunc = function () {
        this.ecNumEditBox.string = "";
    };
    /** 确认提现 */
    ExtractCashWin.prototype.confirmBtn = function () {
    };
    /** 筹码列表更新 */
    ExtractCashWin.prototype.updateChipList = function () {
    };
    return ExtractCashWin;
}(ViewBase_1.default));
exports.default = ExtractCashWin;

cc._RF.pop();