
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/recharge/WndRechangeBankInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWNoYXJnZVxcV25kUmVjaGFuZ2VCYW5rSW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBK0M7QUFFL0MsNERBQTZEO0FBQzdEO0lBQWlELHVDQUFPO0lBQXhEOztJQXdKQSxDQUFDO0lBNUlhLG9DQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxxQkFBcUIsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsNkNBQTZDLENBQUM7SUFDakUsQ0FBQztJQUVTLHNDQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUUzRCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLCtCQUErQixFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsY0FBYyxDQUFDLDRCQUE0QixFQUFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsaUNBQWlDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxjQUFjLENBQUMsNkJBQTZCLEVBQUUsSUFBSSxD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LDRDQUFjLEdBQXRCO1FBQ0ksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sSUFBSSxFQUFFO1lBQzdCLE9BQU8sTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwRyxDQUFDO0lBRU8sMkNBQWEsR0FBckI7UUFDSSxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVPLHNDQUFRLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFDTCwwQkFBQztBQUFELENBeEpBLEFBd0pDLENBeEpnRCxpQkFBTyxHQXdKdkQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV25kQmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9XbmRCYXNlXCI7XHJcbmltcG9ydCBSZWNoYXJnZU1vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1JlY2hhcmdlTW9kZWxcIjtcclxuaW1wb3J0IHsgTmV0QXBwZmFjZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL25ldC9oYWxsL05ldEV2ZW50XCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZFJlY2hhbmdlQmFua0luZm8gZXh0ZW5kcyBXbmRCYXNle1xyXG4gICAgcHJpdmF0ZSBtb2RlbDogUmVjaGFyZ2VNb2RlbDtcclxuICAgIHByaXZhdGUgYmFua0xibDogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIGJhbmtOdW1MYmw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBiYW5rVXNlckxibDogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIGlkTGJsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgcGF5TGJsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgcGF5VGltZUxibDogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIHBheU5hbWVFZGl0OiBjYy5FZGl0Qm94O1xyXG4gICAgcHJpdmF0ZSBkYXRhOiBhbnk7XHJcbiAgICBwcml2YXRlIGlzT3ZlcnNlYXM6Ym9vbGVhbjsgLy/mmK/lkKbmmK/mtbflpJbmlK/ku5hcclxuICAgIHByaXZhdGUgdmlld0NmZzphbnk7ICAgICAgICAvL+mAgumFjea1t+WkluaUr+S7mC/pk7booYzljaHmlK/ku5jphY3nva5cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmRSZWNoYW5nZUJhbmtJbmZvXCI7XHJcbiAgICAgICAgdGhpcy5sYXllciA9IEdsb2JhbC5VSS5Qb3BMYXllcjtcclxuICAgICAgICB0aGlzLnJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS9SZWNoYXJnZS9SZWNoYW5nZUJhbmtJbmZvVUlcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKXtcclxuICAgICAgICB0aGlzLm1vZGVsID0gR2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlJlY2hhcmdlTW9kZWxcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImNsb3NlXCIsIHRoaXMuY2xvc2VXbmQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYmFua0xibCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiY2VudGVyTm9kZS9iYW5rL2JhbmtMYmxcIiwgY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuYmFua051bUxibCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiY2VudGVyTm9kZS9iYW5rTnVtL2JhbmtOdW1MYmxcIiwgY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJjZW50ZXJOb2RlL2JhbmtOdW0vY29weUJ0blwiLCB0aGlzLm9uQ29weUNhcmROdW1DbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5iYW5rVXNlckxibCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiY2VudGVyTm9kZS9iYW5rVXNlci9iYW5rVXNlckxibFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImNlbnRlck5vZGUvYmFua1VzZXIvY29weUJ0blwiLCB0aGlzLm9uQ29weVVzZXJDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5pZExibCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiY2VudGVyTm9kZS9JRC9pZExibFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImNlbnRlck5vZGUvSUQvY29weUJ0blwiLCB0aGlzLm9uQ29weVVzZXJJZENsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnBheUxibCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiY2VudGVyTm9kZS9wYXkvcGF5TGJsXCIsIGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLnBheVRpbWVMYmwgPSB0aGlzLmdldENvbXBvbmVudChcImNlbnRlck5vZGUvcGF5VGltZS90aW1lTGJsXCIsIGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLnBheU5hbWVFZGl0ID0gPGNjLkVkaXRCb3g+dGhpcy5nZXRDb21wb25lbnQoXCJjZW50ZXJOb2RlL3BheU5hbWUvbmFtZUVkaXRCb3hcIiwgY2MuRWRpdEJveCk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImNlbnRlck5vZGUvc3VyZUJ0blwiLCB0aGlzLnJlcVN1Ym1pdE9yZGVyLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXREYXRhKCl7XHJcbiAgICAgICAgdGhpcy5iYW5rTGJsLnN0cmluZyA9IHRoaXMuZGF0YVsnY2FyZF90eXBlJ107XHJcbiAgICAgICAgdGhpcy5iYW5rTnVtTGJsLnN0cmluZyA9IHRoaXMuZGF0YVtcImNhcmRfbm9cIl07XHJcbiAgICAgICAgdGhpcy5iYW5rVXNlckxibC5zdHJpbmcgPSB0aGlzLmRhdGFbXCJjYXJkX25hbWVcIl07XHJcbiAgICAgICAgdGhpcy5pZExibC5zdHJpbmcgPSBTdHJpbmcoR2xvYmFsLlBsYXllckRhdGEudWlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ29weUNhcmROdW1DbGljaygpe1xyXG4gICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5jb3B5VGV4dFRvQ2xpcGJvYXJkKHRoaXMuYmFua051bUxibC5zdHJpbmcsIHRoaXMuY29weVRleHRUb0NsaXBib2FyZENhbGxCYWNrLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Db3B5VXNlckNsaWNrKCl7XHJcbiAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmNvcHlUZXh0VG9DbGlwYm9hcmQodGhpcy5iYW5rVXNlckxibC5zdHJpbmcsIHRoaXMuY29weVRleHRUb0NsaXBib2FyZENhbGxCYWNrLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Db3B5VXNlcklkQ2xpY2soKXtcclxuICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuY29weVRleHRUb0NsaXBib2FyZCh0aGlzLmlkTGJsLnN0cmluZywgdGhpcy5jb3B5VGV4dFRvQ2xpcGJvYXJkQ2FsbEJhY2suYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb3B5VGV4dFRvQ2xpcGJvYXJkQ2FsbEJhY2socmV0U3RyKXtcclxuICAgICAgICBpZiAocmV0U3RyLnJlc3VsdCA9PSAwKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5aSN5Yi25oiQ5YqfXCIpO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLlpI3liLblpLHotKVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbk9wZW4oZGF0YSl7XHJcbiAgICAgICAgdGhpcy5wYXlMYmwuc3RyaW5nID0gU3RyaW5nKGRhdGFbMF0pO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGFbMV0gfHwge307XHJcbiAgICAgICAgdGhpcy5pc092ZXJzZWFzID0gZGF0YVsyXSB8fCBmYWxzZTtcclxuICAgICAgICB0aGlzLnBheU5hbWVFZGl0LnN0cmluZyA9ICcnO1xyXG4gICAgICAgIHRoaXMucGF5VGltZUxibC5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5wYXJzZVRpbWUoRGF0ZS5ub3coKSk7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIub24oTmV0QXBwZmFjZS5Vc2VyVW5pb25QYXksIHRoaXMsIHRoaXMub25TdWJtaXRPcmRlcik7XHJcbiAgICAgICAgdGhpcy5hZGFwdE92ZXJzZWFzUGF5KCk7XHJcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRhcHRPdmVyc2Vhc1BheSgpe1xyXG4gICAgICAgIHRoaXMudmlld0NmZyA9IHRoaXMuaXNPdmVyc2VhcyA/IEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcucmVjaGFuZ2VPdmVyc2Vhc0JhbmtJbmZvQ2ZnIDogR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5yZWNoYW5nZVVuaW9ucGF5QmFua0luZm9DZmc7XHJcbiAgICAgICAgLy/lpI3liLbmjInpkq5cclxuICAgICAgICB0aGlzLmFkYXB0Q29weUJ0bigpO1xyXG4gICAgICAgIC8v5o+Q5Lqk6K6i5Y2V5oyJ6ZKuXHJcbiAgICAgICAgdGhpcy5hZGFwdFN1cmVCdG4oKTtcclxuICAgICAgICAvL+aPkOekuuWGheWuuVxyXG4gICAgICAgIHRoaXMuYWRhcHRUaXBzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGFwdENvcHlCdG4oKXtcclxuICAgICAgICBsZXQgdHlwZSA9IHRoaXMudmlld0NmZ1snY29weUJ0blR5cGUnXTtcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMudmlld0NmZ1snY29weUJ0bkNvbnRlbnQnXTtcclxuICAgICAgICBpZih0eXBlID09PSBcImNjLlJpY2hUZXh0XCIpe1xyXG4gICAgICAgICAgICBsZXQgYmFua051bUNvcHkgPSB0aGlzLmdldENvbXBvbmVudChcImNlbnRlck5vZGUvYmFua051bS9jb3B5QnRuL05ldyBSaWNoVGV4dFwiLHR5cGUpIGFzIGNjLlJpY2hUZXh0O1xyXG4gICAgICAgICAgICBsZXQgYmFua1VzZXJDb3B5ID0gdGhpcy5nZXRDb21wb25lbnQoXCJjZW50ZXJOb2RlL2JhbmtVc2VyL2NvcHlCdG4vTmV3IFJpY2hUZXh0XCIsdHlwZSkgYXMgY2MuUmljaFRleHQ7XHJcbiAgICAgICAgICAgIGxldCBpZENvcHkgPSB0aGlzLmdldENvbXBvbmVudChcImNlbnRlck5vZGUvSUQvY29weUJ0bi9OZXcgUmljaFRleHRcIix0eXBlKSBhcyBjYy5SaWNoVGV4dDtcclxuICAgICAgICAgICAgYmFua051bUNvcHkuc3RyaW5nID0gY29udGVudDtcclxuICAgICAgICAgICAgYmFua1VzZXJDb3B5LnN0cmluZyA9IGNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGlkQ29weS5zdHJpbmcgPSBjb250ZW50O1xyXG4gICAgICAgIH1lbHNlIGlmKHR5cGUgPT09IFwiY2MuU3ByaXRlXCIpe1xyXG4gICAgICAgICAgICBsZXQgYmFua051bUNvcHkgPSB0aGlzLmdldENvbXBvbmVudChcImNlbnRlck5vZGUvYmFua051bS9jb3B5QnRuL05ldyBSaWNoVGV4dFwiLHR5cGUpIGFzIGNjLlNwcml0ZTtcclxuICAgICAgICAgICAgbGV0IGJhbmtVc2VyQ29weSA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiY2VudGVyTm9kZS9iYW5rVXNlci9jb3B5QnRuL05ldyBSaWNoVGV4dFwiLHR5cGUpIGFzIGNjLlNwcml0ZTtcclxuICAgICAgICAgICAgbGV0IGlkQ29weSA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiY2VudGVyTm9kZS9JRC9jb3B5QnRuL05ldyBSaWNoVGV4dFwiLHR5cGUpIGFzIGNjLlNwcml0ZTtcclxuICAgICAgICAgICAgLy8gbGV0IHNwTmFtZSA9IHRoaXMuaXNPdmVyc2VhcyA/IFwiYnV0dG9uX3ppX2NvcHlcIiA6IFwiYnV0dG9uX3ppX2Z6XCI7XHJcbiAgICAgICAgICAgIC8vIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyhiYW5rTnVtQ29weSwgY29udGVudCwgc3BOYW1lKTtcclxuICAgICAgICAgICAgLy8gR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKGJhbmtVc2VyQ29weSwgY29udGVudCwgc3BOYW1lKTtcclxuICAgICAgICAgICAgLy8gR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKGlkQ29weSwgY29udGVudCwgc3BOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGFwdFN1cmVCdG4oKXtcclxuICAgICAgICBsZXQgdHlwZSA9IHRoaXMudmlld0NmZ1snc3VyZUJ0blR5cGUnXTtcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMudmlld0NmZ1snc3VyZUJ0bkNvbnRlbnQnXTtcclxuICAgICAgICAvLyBpZih0eXBlID09PSBcImNjLlNwcml0ZVwiKXtcclxuICAgICAgICAvLyAgICAgbGV0IHN1cmVCdG4gPSB0aGlzLmdldENvbXBvbmVudChcImNlbnRlck5vZGUvc3VyZUJ0bi9nXzRcIix0eXBlKSBhcyBjYy5TcHJpdGU7XHJcbiAgICAgICAgLy8gICAgIGxldCBzcE5hbWUgPSB0aGlzLmlzT3ZlcnNlYXMgPyBcImJ1dHRvbl96aV95ZXNcIiA6IFwiYnV0dG9uX3ppX3Rpamlhb2RkXCI7XHJcbiAgICAgICAgLy8gICAgIGlmKEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcuaXNQdXJwbGUgJiYgIXRoaXMuaXNPdmVyc2Vhcyl7Ly/ntKvoibLnibnmrorlpITnkIblubbkuJTkuI3mmK/mtbflpJbmlK/ku5jnmoRcclxuICAgICAgICAvLyAgICAgICAgIHNwTmFtZSA9IFwiZ180XCI7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgYnRuU3ByaXRlID0gR2xvYmFsLlJlc291cmNlTWFuYWdlci5nZXRTcHJpdGUoY29udGVudCxzcE5hbWUpO1xyXG4gICAgICAgIC8vICAgICAgICAgc3VyZUJ0bi5zcHJpdGVGcmFtZSA9IGJ0blNwcml0ZTtcclxuICAgICAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAgICAgLy8gICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRBdXRvQXRsYXMoc3VyZUJ0biwgY29udGVudCwgc3BOYW1lKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1lbHNlIGlmKHR5cGUgPT09IFwiY2MuTGFiZWxcIil7XHJcbiAgICAgICAgLy8gICAgIGxldCBzdXJlQnRuID0gdGhpcy5nZXRDb21wb25lbnQoXCJjZW50ZXJOb2RlL3N1cmVCdG4vZ180XCIsdHlwZSkgYXMgY2MuTGFiZWw7XHJcbiAgICAgICAgLy8gICAgIHN1cmVCdG4uc3RyaW5nID0gY29udGVudDtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGFwdFRpcHMoKXtcclxuICAgICAgICAvLyBsZXQgdGlwRW5nbGlzaFNpemUgPSB0aGlzLnZpZXdDZmdbJ3RpcEVuZ2xpc2hTaXplJ107XHJcbiAgICAgICAgLy8gbGV0IHRpcEVuZ2xpc2hDb2xvciA9IHRoaXMudmlld0NmZ1sndGlwRW5nbGlzaENvbG9yJ107XHJcbiAgICAgICAgLy8gbGV0IHRpcENoaW5lc2VTaXplID0gdGhpcy52aWV3Q2ZnWyd0aXBDaGluZXNlU2l6ZSddO1xyXG4gICAgICAgIC8vIGxldCB0aXBDaGluZXNlQ29sb3IgPSB0aGlzLnZpZXdDZmdbJ3RpcENoaW5lc2VDb2xvciddO1xyXG4gICAgICAgIC8vIGxldCB0aXBzUmljaFRleHQgPSB0aGlzLmdldENvbXBvbmVudChcImNlbnRlck5vZGUvdGlwc0xibFwiLGNjLlJpY2hUZXh0KSBhcyBjYy5SaWNoVGV4dDtcclxuICAgICAgICAvLyB0aXBzUmljaFRleHQuaG9yaXpvbnRhbEFsaWduID0gdGhpcy5pc092ZXJzZWFzID8gY2MubWFjcm8uVGV4dEFsaWdubWVudC5DRU5URVIgOiBjYy5tYWNyby5UZXh0QWxpZ25tZW50LkxFRlQ7XHJcbiAgICAgICAgLy8gbGV0IHRpcFN0ciA9IFwiPGNvbG9yPSVzPjxzaXplPSVzPuivt+aCqOWkjeWItuaUtuasvumTtuihjOeahOWNoeWPt+WSjOWnk+WQje+8jOe6v+S4i+i9rOi0puiHs+ivpemTtuihjOWNoeWQju+8jOi/lOWbnuatpOeVjOmdoua3u+WKoOaCqOi9rOi0pui0puaIt+eahOecn+WunuWnk+WQjeWQjuaPkOS6pOiuouWNle+8geiLpeacieS7u+S9leeWkemXruivtzwvYz48Y29sb3I9JXM+PHNpemU9JXM+6IGU57O75a6i5pyNPC9jb2xvcj5cIjtcclxuICAgICAgICAvLyBpZih0aGlzLmlzT3ZlcnNlYXMpe1xyXG4gICAgICAgIC8vICAgICB0aXBTdHIgPSBcIjxjb2xvcj0lcz48c2l6ZT0lcz5JZiB5b3UgaGF2ZSBhbnkgcXVlc3Rpb25zLCBwbGVhc2UgY29udGFjdCBjdXN0b21lciBzZXJ2aWNlITwvYz48YnIvPjxjb2xvcj0lcz48c2l6ZT0lcz7lpoLmnInpl67popjvvIzor7fogZTns7vlrqLmnI3lkqjor6LvvIE8L2NvbG9yPlwiO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBsZXQgc3RyID0gY2MuanMuZm9ybWF0U3RyKHRpcFN0cix0aXBFbmdsaXNoQ29sb3IsdGlwRW5nbGlzaFNpemUsdGlwQ2hpbmVzZUNvbG9yLHRpcENoaW5lc2VTaXplKTtcclxuICAgICAgICAvLyB0aXBzUmljaFRleHQuc3RyaW5nID0gc3RyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVxU3VibWl0T3JkZXIoKXtcclxuICAgICAgICBpZiAodGhpcy5wYXlOYW1lRWRpdC5zdHJpbmcgPT0gJycpXHJcbiAgICAgICAgICAgIHJldHVybiBHbG9iYWwuVUkuZmFzdFRpcChcIuivt+i+k+WFpei9rOi0puWnk+WQjVwiKTtcclxuICAgICAgICB0aGlzLm1vZGVsLnJlcVVzZXJVbmlvblBheSh0aGlzLmRhdGEudHlwZSwgTnVtYmVyKHRoaXMucGF5TGJsLnN0cmluZyksIHRoaXMucGF5TmFtZUVkaXQuc3RyaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU3VibWl0T3JkZXIoKXtcclxuICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuaPkOS6pOiuouWNleaIkOWKn1wiKTtcclxuICAgICAgICB0aGlzLmNsb3NlV25kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbG9zZVduZCgpe1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH1cclxufSJdfQ==