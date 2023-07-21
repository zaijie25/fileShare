"use strict";
cc._RF.push(module, '61306RoVaxCVqcoUY9dvHJh', 'overseasExtractCashWin');
// hall/scripts/logic/hall/ui/money/ui/extractCash/overseasExtractCashWin.ts

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
var overseasExtractCashWin = /** @class */ (function (_super) {
    __extends(overseasExtractCashWin, _super);
    function overseasExtractCashWin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.OverseasAccountLabel = null;
        return _this;
    }
    overseasExtractCashWin.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this.OverseasAccountLabel = this.getComponent("OverseasAccountBox/OverseasAccountLabel", cc.RichText);
    };
    overseasExtractCashWin.prototype.onSubViewShow = function () {
        _super.prototype.onSubViewShow.call(this);
        var datas = this.model.bankDatas || {}; //海外账户信息
        this.info = "tips：\nIf you have any questions, please contact customer service!\n温馨提示：\n如有问题，请联系客服咨询！";
        this.msgLabel.string = this.info;
        this.OverseasAccountLabel.string = "<b>" + datas.over_sea_entrus_bank_account + "</b>" || "";
    };
    overseasExtractCashWin.prototype.checkData = function () {
        var num = parseInt(this.ecNumEditBox.string);
        if (num < this.model.getOverseasMaxLimit()) {
            Global.UI.fastTip("提现金额超出限制范围");
            return false;
        }
        ;
        if (num > this.model.getOverseasMinLimit()) {
            Global.UI.fastTip("提现金额超出限制范围");
            return false;
        }
        if (num % 10 != 0) {
            Global.UI.fastTip("提现金额只能为10的倍数");
            return false;
        }
        if (num > Global.PlayerData.point / Global.Setting.glodRatio) {
            Global.UI.fastTip("发起提现失败，你的可提现金额不足");
            return false;
        }
        return true;
    };
    overseasExtractCashWin.prototype.confirmBtn = function () {
        if (this.checkData()) {
            var num = parseInt(this.ecNumEditBox.string);
            // this.model.reqUnionApplyCash(num);
            this.model.reqOverseasApplyCash(num);
            // 海外提现接口
        }
        else {
            this.resetBtnFunc();
        }
    };
    /** 筹码列表更新 */
    overseasExtractCashWin.prototype.updateChipList = function () {
    };
    return overseasExtractCashWin;
}(ExtractCashWin_1.default));
exports.default = overseasExtractCashWin;

cc._RF.pop();