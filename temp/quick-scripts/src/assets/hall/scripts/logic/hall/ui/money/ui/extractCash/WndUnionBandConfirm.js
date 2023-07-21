"use strict";
cc._RF.push(module, 'f14fcLL1URMxocpkiDBr8Jy', 'WndUnionBandConfirm');
// hall/scripts/logic/hall/ui/money/ui/extractCash/WndUnionBandConfirm.ts

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
var ExtractEvent_1 = require("./ExtractEvent");
var WndUnionBandConfirm = /** @class */ (function (_super) {
    __extends(WndUnionBandConfirm, _super);
    function WndUnionBandConfirm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndUnionBandConfirm.prototype.onInit = function () {
        this.name = "WndUnionBandConfirm";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/money/extractCash/unionBandConfirmUI";
    };
    WndUnionBandConfirm.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.model = Global.ModelManager.getModel("ExtractModel");
        this.nameLabel = this.getComponent("NameLabel", cc.Label);
        this.accountLabel = this.getComponent("AccountLabel", cc.Label);
        this.bankbranchLabel = this.getComponent("BankbranchLabel", cc.Label);
        this.openBankLabel = this.getComponent("OpenBankLabel", cc.Label);
        this.PrivinceLabel = this.getComponent("ProvinceLabel", cc.Label);
        this.CityLabel = this.getComponent("CityLabel", cc.Label);
        this.addCommonClick("close", this.backBtnFunc, this);
        this.addCommonClick("confirmBtn", this.confirmBtnFunc, this);
        //Listener
        this.model.on(ExtractEvent_1.ExtractEvent.BankBindInfoOver, this, this.close);
    };
    WndUnionBandConfirm.prototype.onOpen = function (args) {
        this.nameData = args[0];
        this.accountData = args[1];
        this.bankbranchData = args[2];
        this.openBankData = args[3];
        this.provinceData = args[4];
        this.cityData = args[5];
        this.bankCode = args[6];
        this.nameLabel.string = this.nameData;
        this.accountLabel.string = this.accountData;
        this.bankbranchLabel.string = this.bankbranchData;
        this.openBankLabel.string = this.openBankData;
        this.PrivinceLabel.string = this.provinceData;
        this.CityLabel.string = this.cityData;
    };
    WndUnionBandConfirm.prototype.confirmBtnFunc = function () {
        this.model.reqBindUnionInfo(this.nameData, this.accountData, this.openBankData, this.bankbranchData, this.provinceData, this.cityData, this.bankCode);
    };
    //关闭按钮
    WndUnionBandConfirm.prototype.backBtnFunc = function () {
        this.close();
    };
    return WndUnionBandConfirm;
}(WndBase_1.default));
exports.default = WndUnionBandConfirm;

cc._RF.pop();