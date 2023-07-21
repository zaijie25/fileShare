"use strict";
cc._RF.push(module, '4168dTPNG9Fr7NQwQ0DT43b', 'WndRechangeBankInfo');
// hall/scripts/logic/hall/ui/recharge/WndRechangeBankInfo.ts

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
var NetEvent_1 = require("../../../core/net/hall/NetEvent");
var WndRechangeBankInfo = /** @class */ (function (_super) {
    __extends(WndRechangeBankInfo, _super);
    function WndRechangeBankInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndRechangeBankInfo.prototype.onInit = function () {
        this.name = "WndRechangeBankInfo";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Recharge/RechangeBankInfoUI";
    };
    WndRechangeBankInfo.prototype.initView = function () {
        this.model = Global.ModelManager.getModel("RechargeModel");
        this.addCommonClick("close", this.closeWnd, this);
        this.bankLbl = this.getComponent("centerNode/bank/bankLbl", cc.Label);
        this.bankNumLbl = this.getComponent("centerNode/bankNum/bankNumLbl", cc.Label);
        this.addCommonClick("centerNode/bankNum/copyBtn", this.onCopyCardNumClick, this);
        this.bankUserLbl = this.getComponent("centerNode/bankUser/bankUserLbl", cc.Label);
        this.addCommonClick("centerNode/bankUser/copyBtn", this.onCopyUserClick, this);
        this.idLbl = this.getComponent("centerNode/ID/idLbl", cc.Label);
        this.addCommonClick("centerNode/ID/copyBtn", this.onCopyUserIdClick, this);
        this.payLbl = this.getComponent("centerNode/pay/payLbl", cc.Label);
        this.payTimeLbl = this.getComponent("centerNode/payTime/timeLbl", cc.Label);
        this.payNameEdit = this.getComponent("centerNode/payName/nameEditBox", cc.EditBox);
        this.addCommonClick("centerNode/sureBtn", this.reqSubmitOrder, this);
    };
    WndRechangeBankInfo.prototype.initData = function () {
        this.bankLbl.string = this.data['card_type'];
        this.bankNumLbl.string = this.data["card_no"];
        this.bankUserLbl.string = this.data["card_name"];
        this.idLbl.string = String(Global.PlayerData.uid);
    };
    WndRechangeBankInfo.prototype.onCopyCardNumClick = function () {
        Global.NativeEvent.copyTextToClipboard(this.bankNumLbl.string, this.copyTextToClipboardCallBack.bind(this));
    };
    WndRechangeBankInfo.prototype.onCopyUserClick = function () {
        Global.NativeEvent.copyTextToClipboard(this.bankUserLbl.string, this.copyTextToClipboardCallBack.bind(this));
    };
    WndRechangeBankInfo.prototype.onCopyUserIdClick = function () {
        Global.NativeEvent.copyTextToClipboard(this.idLbl.string, this.copyTextToClipboardCallBack.bind(this));
    };
    WndRechangeBankInfo.prototype.copyTextToClipboardCallBack = function (retStr) {
        if (retStr.result == 0) {
            Global.UI.fastTip("复制成功");
        }
        else {
            Global.UI.fastTip("复制失败");
        }
    };
    WndRechangeBankInfo.prototype.onOpen = function (data) {
        this.payLbl.string = String(data[0]);
        this.data = data[1] || {};
        this.isOverseas = data[2] || false;
        this.payNameEdit.string = '';
        this.payTimeLbl.string = Global.Toolkit.parseTime(Date.now());
        Global.HallServer.on(NetEvent_1.NetAppface.UserUnionPay, this, this.onSubmitOrder);
        this.adaptOverseasPay();
        this.initData();
    };
    WndRechangeBankInfo.prototype.adaptOverseasPay = function () {
        this.viewCfg = this.isOverseas ? Global.Setting.SkinConfig.rechangeOverseasBankInfoCfg : Global.Setting.SkinConfig.rechangeUnionpayBankInfoCfg;
        //复制按钮
        this.adaptCopyBtn();
        //提交订单按钮
        this.adaptSureBtn();
        //提示内容
        this.adaptTips();
    };
    WndRechangeBankInfo.prototype.adaptCopyBtn = function () {
        var type = this.viewCfg['copyBtnType'];
        var content = this.viewCfg['copyBtnContent'];
        if (type === "cc.RichText") {
            var bankNumCopy = this.getComponent("centerNode/bankNum/copyBtn/New RichText", type);
            var bankUserCopy = this.getComponent("centerNode/bankUser/copyBtn/New RichText", type);
            var idCopy = this.getComponent("centerNode/ID/copyBtn/New RichText", type);
            bankNumCopy.string = content;
            bankUserCopy.string = content;
            idCopy.string = content;
        }
        else if (type === "cc.Sprite") {
            var bankNumCopy = this.getComponent("centerNode/bankNum/copyBtn/New RichText", type);
            var bankUserCopy = this.getComponent("centerNode/bankUser/copyBtn/New RichText", type);
            var idCopy = this.getComponent("centerNode/ID/copyBtn/New RichText", type);
            // let spName = this.isOverseas ? "button_zi_copy" : "button_zi_fz";
            // Global.ResourceManager.loadAutoAtlas(bankNumCopy, content, spName);
            // Global.ResourceManager.loadAutoAtlas(bankUserCopy, content, spName);
            // Global.ResourceManager.loadAutoAtlas(idCopy, content, spName);
        }
    };
    WndRechangeBankInfo.prototype.adaptSureBtn = function () {
        var type = this.viewCfg['sureBtnType'];
        var content = this.viewCfg['sureBtnContent'];
        // if(type === "cc.Sprite"){
        //     let sureBtn = this.getComponent("centerNode/sureBtn/g_4",type) as cc.Sprite;
        //     let spName = this.isOverseas ? "button_zi_yes" : "button_zi_tijiaodd";
        //     if(Global.Setting.SkinConfig.isPurple && !this.isOverseas){//紫色特殊处理并且不是海外支付的
        //         spName = "g_4";
        //         let btnSprite = Global.ResourceManager.getSprite(content,spName);
        //         sureBtn.spriteFrame = btnSprite;
        //     }else{
        //         Global.ResourceManager.loadAutoAtlas(sureBtn, content, spName);
        //     }
        // }else if(type === "cc.Label"){
        //     let sureBtn = this.getComponent("centerNode/sureBtn/g_4",type) as cc.Label;
        //     sureBtn.string = content;
        // }
    };
    WndRechangeBankInfo.prototype.adaptTips = function () {
        // let tipEnglishSize = this.viewCfg['tipEnglishSize'];
        // let tipEnglishColor = this.viewCfg['tipEnglishColor'];
        // let tipChineseSize = this.viewCfg['tipChineseSize'];
        // let tipChineseColor = this.viewCfg['tipChineseColor'];
        // let tipsRichText = this.getComponent("centerNode/tipsLbl",cc.RichText) as cc.RichText;
        // tipsRichText.horizontalAlign = this.isOverseas ? cc.macro.TextAlignment.CENTER : cc.macro.TextAlignment.LEFT;
        // let tipStr = "<color=%s><size=%s>请您复制收款银行的卡号和姓名，线下转账至该银行卡后，返回此界面添加您转账账户的真实姓名后提交订单！若有任何疑问请</c><color=%s><size=%s>联系客服</color>";
        // if(this.isOverseas){
        //     tipStr = "<color=%s><size=%s>If you have any questions, please contact customer service!</c><br/><color=%s><size=%s>如有问题，请联系客服咨询！</color>";
        // }
        // let str = cc.js.formatStr(tipStr,tipEnglishColor,tipEnglishSize,tipChineseColor,tipChineseSize);
        // tipsRichText.string = str;
    };
    WndRechangeBankInfo.prototype.reqSubmitOrder = function () {
        if (this.payNameEdit.string == '')
            return Global.UI.fastTip("请输入转账姓名");
        this.model.reqUserUnionPay(this.data.type, Number(this.payLbl.string), this.payNameEdit.string);
    };
    WndRechangeBankInfo.prototype.onSubmitOrder = function () {
        Global.UI.fastTip("提交订单成功");
        this.closeWnd();
    };
    WndRechangeBankInfo.prototype.closeWnd = function () {
        this.close();
    };
    return WndRechangeBankInfo;
}(WndBase_1.default));
exports.default = WndRechangeBankInfo;

cc._RF.pop();