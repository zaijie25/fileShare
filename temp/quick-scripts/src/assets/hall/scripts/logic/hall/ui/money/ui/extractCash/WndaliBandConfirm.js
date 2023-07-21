"use strict";
cc._RF.push(module, '1ee02+2l4VFWZJaUENyoQNV', 'WndaliBandConfirm');
// hall/scripts/logic/hall/ui/money/ui/extractCash/WndaliBandConfirm.ts

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
var WndaliBandConfirm = /** @class */ (function (_super) {
    __extends(WndaliBandConfirm, _super);
    function WndaliBandConfirm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndaliBandConfirm.prototype.onInit = function () {
        this.name = "WndaliBandConfirm";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/money/extractCash/aliBandConfirmUI";
        this.model = Global.ModelManager.getModel("ExtractModel");
    };
    WndaliBandConfirm.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.nameLabel = this.getComponent("NameLabel", cc.Label);
        this.accountLabel = this.getComponent("AccountLabel", cc.Label);
        this.addCommonClick("close", this.backBtnFunc, this);
        this.addCommonClick("confirmBtn", this.confirmBtnFunc, this);
        //Listener
        this.model.on(ExtractEvent_1.ExtractEvent.BankBindInfoOver, this, this.close);
    };
    WndaliBandConfirm.prototype.onOpen = function (args) {
        this.nameData = args[0];
        this.accountData = args[1];
        this.nameLabel.string = this.nameData;
        this.accountLabel.string = this.accountData;
    };
    WndaliBandConfirm.prototype.confirmBtnFunc = function () {
        this.model.reqBindAliInfo(this.nameData, this.accountData);
    };
    //关闭按钮
    WndaliBandConfirm.prototype.backBtnFunc = function () {
        this.close();
    };
    return WndaliBandConfirm;
}(WndBase_1.default));
exports.default = WndaliBandConfirm;

cc._RF.pop();