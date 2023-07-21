"use strict";
cc._RF.push(module, 'ba0daI56r1EV6yugyjKE/Gg', 'WndBankRechange');
// hall/scripts/logic/hall/ui/recharge/WndBankRechange.ts

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
var WndBankRechange = /** @class */ (function (_super) {
    __extends(WndBankRechange, _super);
    function WndBankRechange() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.colorString = {
            1000: "#478CF6",
            1001: "#14AE58",
            1002: "#EAB429",
        };
        return _this;
    }
    WndBankRechange.prototype.onInit = function () {
        this.name = "WndBankRechange";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Recharge/BankRechangeUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndBankRechange.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.bg = this.getChild("bg");
        this.tipNode = this.getChild("tipNode");
        this.bankNode = this.getChild("bankNode");
        this.textNode = this.getChild("bankNode/textNode");
        this.titleLabel = this.getChild("bankNode/titleLabel").getComponent(cc.Label);
        this.iconSprite = this.getChild("bankNode/iconSprite").getComponent(cc.Sprite);
        this.nameLabel = this.getChild("bankNode/textNode/nameLabel").getComponent(cc.Label);
        this.numberLabel = this.getChild("bankNode/textNode/numberLabel").getComponent(cc.Label);
        this.bankNameLabel = this.getChild("bankNode/textNode/bankNameLabel").getComponent(cc.Label);
        this.textLabel = this.getChild("bankNode/textLabel").getComponent(cc.Label);
        this.tipsLabel = this.getChild("tipNode/tips/tipsLabel").getComponent(cc.Label);
        this.addCommonClick("headNode/btnBack", this.goBack, this, cc.Button.Transition.NONE);
        this.addCommonClick("headNode/helpNode", this.goBack, this, cc.Button.Transition.NONE);
        this.addCommonClick("bankNode/textNode/nameLabel/copyNode", this.copyName, this, cc.Button.Transition.NONE);
        this.addCommonClick("bankNode/textNode/numberLabel/copyNode", this.copyNumber, this, cc.Button.Transition.NONE);
        this.addCommonClick("bankNode/textNode/bankNameLabel/copyNode", this.copyBankName, this, cc.Button.Transition.NONE);
        // this.addCommonClick("bankNode/addresLabel/copyNode", this.copyAddres, this,cc.Button.Transition.NONE);
    };
    WndBankRechange.prototype.onOpen = function () {
        // 392
        var data = this.args[0];
        var colorStr = this.colorString[data.pay_type];
        this.bg.color = new cc.Color().fromHEX(colorStr);
        this.nameLabel.string = data['name']; //银行卡姓名
        this.numberLabel.string = data['account']; //银行卡卡号
        this.bankNameLabel.string = data['bank_type']; //银行名称
        // this.addresLabel.string     = data['bank_zhi']  //支行名称
        this.tipsLabel.string = data['tips']; //温馨提示
        this.updateUI(data);
    };
    //更新界面
    WndBankRechange.prototype.updateUI = function (data) {
        var tipWidget = this.tipNode.getComponent(cc.Widget);
        if (data.pay_type == "1002") {
            this.bankNode.height = 310;
            tipWidget.top = 530;
            this.textNode.y = -180;
            this.textLabel.node.active = true;
        }
        else {
            this.bankNode.height = 270;
            tipWidget.top = 490;
            this.textNode.y = -130;
            this.textLabel.node.active = false;
        }
        tipWidget.updateAlignment();
        if (data.pay_type == "1000") {
            this.titleLabel.string = "支付宝银行卡转账";
            Global.ResourceManager.loadAutoAtlas(this.iconSprite, "hall/texture/hall/chat/chat", "f_35", null, false);
            this.iconSprite.node.x = -110;
        }
        else if (data.pay_type == "1001") {
            this.titleLabel.string = "微信银行卡转账";
            Global.ResourceManager.loadAutoAtlas(this.iconSprite, "hall/texture/hall/chat/chat", "f_36", null, false);
            this.iconSprite.node.x = -100;
        }
        else {
            this.titleLabel.string = "银行卡收款";
            Global.ResourceManager.loadAutoAtlas(this.iconSprite, "hall/texture/hall/chat/chat", "f_34", null, false);
            this.iconSprite.node.x = -70;
        }
    };
    WndBankRechange.prototype.goBack = function () {
        this.close();
    };
    WndBankRechange.prototype.copyName = function () {
        Global.NativeEvent.copyTextToClipboard(String(this.nameLabel.string), this.copyTextToClipboardCallBack.bind(this));
    };
    WndBankRechange.prototype.copyNumber = function () {
        Global.NativeEvent.copyTextToClipboard(String(this.numberLabel.string), this.copyTextToClipboardCallBack.bind(this));
    };
    WndBankRechange.prototype.copyBankName = function () {
        Global.NativeEvent.copyTextToClipboard(String(this.bankNameLabel.string), this.copyTextToClipboardCallBack.bind(this));
    };
    // private copyAddres() {
    //     Global.NativeEvent.copyTextToClipboard(String(this.addresLabel.string), this.copyTextToClipboardCallBack.bind(this) );
    // }
    /**
     * 复制回调
     * @param retStr
     */
    WndBankRechange.prototype.copyTextToClipboardCallBack = function (retStr) {
        if (retStr.result == 0) {
            Global.UI.fastTip("复制成功");
        }
        else {
            Global.UI.fastTip("复制失败");
        }
    };
    return WndBankRechange;
}(WndBase_1.default));
exports.default = WndBankRechange;

cc._RF.pop();