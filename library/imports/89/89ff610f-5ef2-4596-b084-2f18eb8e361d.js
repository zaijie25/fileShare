"use strict";
cc._RF.push(module, '89ff6EPXvJFlrCELxjrjjYd', 'WndOverseasBandConfirm');
// hall/scripts/logic/hall/ui/money/ui/extractCash/WndOverseasBandConfirm.ts

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
var WndOverseasBandConfirm = /** @class */ (function (_super) {
    __extends(WndOverseasBandConfirm, _super);
    function WndOverseasBandConfirm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndOverseasBandConfirm.prototype.onInit = function () {
        this.name = "WndOverseasBandConfirm";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/money/extractCash/overseasBandConfirmUI";
        this.model = Global.ModelManager.getModel("ExtractModel");
    };
    WndOverseasBandConfirm.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.nameLabel = this.getComponent("NameLabel", cc.Label);
        this.accountLabel = this.getComponent("AccountLabel", cc.Label);
        this.bankTipLabel = this.getComponent("BankLabel", cc.Label);
        this.addCommonClick("close", this.backBtnFunc, this);
        this.addCommonClick("confirmBtn", this.confirmBtnFunc, this);
        //Listener
        this.model.on(ExtractEvent_1.ExtractEvent.BankBindInfoOver, this, this.close);
    };
    WndOverseasBandConfirm.prototype.onOpen = function (args) {
        this.nameData = args[0];
        this.accountData = args[1];
        this.bankData = args[2];
        this.nameLabel.string = this.nameData;
        this.accountLabel.string = this.accountData;
        this.bankTipLabel.string = this.bankData;
    };
    WndOverseasBandConfirm.prototype.confirmBtnFunc = function () {
        this.model.reqBindOverseasInfo(this.nameData, this.accountData, this.bankData);
        //接口请求
        this.backBtnFunc();
    };
    //关闭按钮
    WndOverseasBandConfirm.prototype.backBtnFunc = function () {
        this.close();
    };
    return WndOverseasBandConfirm;
}(WndBase_1.default));
exports.default = WndOverseasBandConfirm;

cc._RF.pop();