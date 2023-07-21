"use strict";
cc._RF.push(module, '924ben4i0ZFz5Rj/f99jAg4', 'unionExtractCashWin');
// hall/scripts/logic/hall/ui/money/ui/extractCash/unionExtractCashWin.ts

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
var ExtractCashWin_1 = require("../common/ExtractCashWin");
var unionExtractCashWin = /** @class */ (function (_super) {
    __extends(unionExtractCashWin, _super);
    function unionExtractCashWin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.unionAccountLabel = null;
        return _this;
    }
    unionExtractCashWin.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this.unionAccountLabel = this.getComponent("unionAccountBox/unionAccountLabel", cc.RichText);
    };
    unionExtractCashWin.prototype.onSubViewShow = function () {
        _super.prototype.onSubViewShow.call(this);
        var datas = this.model.bankDatas || {};
        this.info = "1.单次提现额度为%s元~%s元，且只能为10的倍数\n2.每人每天提现次数最多为%s次，钱包余额至少保留%s元\n3.每笔提现需达到充值金额的一倍流水，详情请咨询客服";
        // let [bankPut, put] = this.model.getBankPutServerRecharge();
        // if (bankPut > 0){
        //     let str = bankPut + '%';
        //     this.info += `\n4.单次提现收取提现额度${str}的手续费`;
        // }
        this.rateLabel.string = this.model.getRateInfo();
        this.info += this.model.getPutInfo(1);
        this.msgLabel.string = cc.js.formatStr(this.info, datas.bank_min_put_point, datas.bank_max_put_point, datas.bank_put_day_max_num, datas.forzen_point);
        this.unionAccountLabel.string = "<b>" + datas.entrus_bank_account + "</b>" || "";
    };
    unionExtractCashWin.prototype.checkData = function () {
        var num = parseInt(this.ecNumEditBox.string);
        if (num < this.model.getUnionMinLimit()) {
            // Global.UI.showSingleBox("提现金额超出限制范围" + this.model.getUnionMinLimit() + "元");
            Global.UI.fastTip("提现金额超出限制范围");
            return false;
        }
        ;
        if (num > this.model.getUnionMaxLimit()) {
            // Global.UI.showSingleBox("提现金额超出限制范围" + this.model.getUnionMaxLimit() + "元");
            Global.UI.fastTip("提现金额超出限制范围");
            return false;
        }
        if (num % 10 != 0) {
            // Global.UI.showSingleBox("提现金额只能为10的倍数");
            Global.UI.fastTip("提现金额只能为10的倍数");
            return false;
        }
        if (num > Global.PlayerData.point / Global.Setting.glodRatio) {
            // Global.UI.showSingleBox("发起提现失败，你的可提现金额不足");
            Global.UI.fastTip("发起提现失败，你的可提现金额不足");
            return false;
        }
        return true;
    };
    unionExtractCashWin.prototype.confirmBtn = function () {
        if (this.checkData()) {
            var num = parseInt(this.ecNumEditBox.string);
            this.model.reqUnionApplyCash(num);
        }
        else {
            this.resetBtnFunc();
        }
    };
    /** 筹码列表更新 */
    unionExtractCashWin.prototype.updateChipList = function () {
    };
    return unionExtractCashWin;
}(ExtractCashWin_1.default));
exports.default = unionExtractCashWin;

cc._RF.pop();