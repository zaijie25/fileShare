"use strict";
cc._RF.push(module, '34f90OHcGZOz7wNSpZALSiL', 'WndAliPayRechange');
// hall/scripts/logic/hall/ui/recharge/WndAliPayRechange.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var WndAliPayRechange = /** @class */ (function (_super) {
    __extends(WndAliPayRechange, _super);
    function WndAliPayRechange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndAliPayRechange.prototype.onInit = function () {
        this.name = "WndAliPayRechange";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Recharge/AliPayRechargeUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndAliPayRechange.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.nameLabel = this.getChild("bankNode/nameLabel").getComponent(cc.Label);
        this.numberLabel = this.getChild("bankNode/numberLabel").getComponent(cc.Label);
        this.bankNameLabel = this.getChild("bankNode/bankNameLabel").getComponent(cc.Label);
        this.addresLabel = this.getChild("bankNode/addresLabel").getComponent(cc.Label);
        // this.bgNode.node.active = false;
        // this.imageNode.spriteFrame = null;
        this.addCommonClick("headNode/btnBack", this.goBack, this, cc.Button.Transition.NONE);
        this.addCommonClick("headNode/helpNode", this.goBack, this, cc.Button.Transition.NONE);
        this.addCommonClick("bankNode/nameLabel/copyNode", this.copyName, this, cc.Button.Transition.NONE);
        this.addCommonClick("bankNode/numberLabel/copyNode", this.copyNumber, this, cc.Button.Transition.NONE);
        this.addCommonClick("bankNode/bankNameLabel/copyNode", this.copyBankName, this, cc.Button.Transition.NONE);
        this.addCommonClick("bankNode/addresLabel/copyNode", this.copyAddres, this, cc.Button.Transition.NONE);
    };
    WndAliPayRechange.prototype.onOpen = function () {
        var data = this.args[0];
        this.nameLabel.string = data['account']; //支付宝账号
        this.addresLabel.string = data['name']; //支付宝姓名
        // this.numberLabel.string     = data['bank_zhi']  //支付宝姓
        // this.bankNameLabel.string   = data['bank_type'] //支付宝名
    };
    WndAliPayRechange.prototype.goBack = function () {
        this.close();
    };
    WndAliPayRechange.prototype.copyName = function () {
        Global.NativeEvent.copyTextToClipboard(String(this.nameLabel.string), this.copyTextToClipboardCallBack.bind(this));
    };
    WndAliPayRechange.prototype.copyNumber = function () {
        Global.NativeEvent.copyTextToClipboard(String(this.numberLabel.string), this.copyTextToClipboardCallBack.bind(this));
    };
    WndAliPayRechange.prototype.copyBankName = function () {
        Global.NativeEvent.copyTextToClipboard(String(this.bankNameLabel.string), this.copyTextToClipboardCallBack.bind(this));
    };
    WndAliPayRechange.prototype.copyAddres = function () {
        Global.NativeEvent.copyTextToClipboard(String(this.addresLabel.string), this.copyTextToClipboardCallBack.bind(this));
    };
    /**
     * 复制回调
     * @param retStr
     */
    WndAliPayRechange.prototype.copyTextToClipboardCallBack = function (retStr) {
        if (retStr.result == 0) {
            Global.UI.fastTip("复制成功");
        }
        else {
            Global.UI.fastTip("复制失败");
        }
    };
    return WndAliPayRechange;
}(WndBase_1.default));
exports.default = WndAliPayRechange;

cc._RF.pop();