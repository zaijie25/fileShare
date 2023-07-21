"use strict";
cc._RF.push(module, 'f97f8Z6ynZB47yG2yuiV4p8', 'aliExtractCashWin');
// hall/scripts/logic/hall/ui/money/ui/extractCash/aliExtractCashWin.ts

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
var aliExtractCashWin = /** @class */ (function (_super) {
    __extends(aliExtractCashWin, _super);
    function aliExtractCashWin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.aliAccountLabel = null;
        return _this;
    }
    aliExtractCashWin.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this.aliAccountLabel = this.getComponent("aliAccountBox/aliAccountTextLabel", cc.RichText);
    };
    aliExtractCashWin.prototype.onSubViewShow = function () {
        _super.prototype.onSubViewShow.call(this);
        var datas = this.model.bankDatas || {};
        this.info = "1.支付宝单次提现额度为%s~%s元，且只能为10的倍数\n2.每人每天支付宝最多提现%s元，最多提现%s次\n3.每笔提现需达到充值金额一倍流水，且余额至少保留%s元";
        // if (aliPut > 0){
        //     let str = aliPut + '%';
        //     this.info += `\n4.单次提现收取提现额度${str}的手续费`;
        // }
        this.rateLabel.string = this.model.getRateInfo();
        this.info += this.model.getPutInfo(2);
        this.msgLabel.string = cc.js.formatStr(this.info, datas.ali_min_put_point, datas.ali_max_put_point, datas.ali_day_max_put_point, datas.ali_put_day_max_num, datas.forzen_point);
        this.aliAccountLabel.string = "<b>" + datas.ali_account + "</b>" || "";
    };
    aliExtractCashWin.prototype.checkData = function () {
        var num = parseInt(this.ecNumEditBox.string);
        if (num < this.model.getAliMinLimit()) {
            // Global.UI.showSingleBox("提现金额超出限制范围" + this.model.getAliMinLimit() + "元");
            Global.UI.fastTip("提现金额超出限制范围");
            return false;
        }
        ;
        if (num > this.model.getAliMaxLimit()) {
            // Global.UI.showSingleBox("提现金额超出限制范围" + this.model.getAliMaxLimit() + "元");
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
    aliExtractCashWin.prototype.confirmBtn = function () {
        if (this.checkData()) {
            var num = parseInt(this.ecNumEditBox.string);
            this.model.reqAliApplyCash(num);
        }
        else {
            this.resetBtnFunc();
        }
    };
    /** 筹码列表更新 */
    aliExtractCashWin.prototype.updateChipList = function () {
    };
    return aliExtractCashWin;
}(ExtractCashWin_1.default));
exports.default = aliExtractCashWin;

cc._RF.pop();