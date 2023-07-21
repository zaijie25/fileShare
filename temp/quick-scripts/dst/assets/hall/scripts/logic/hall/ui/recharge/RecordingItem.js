
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/recharge/RecordingItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0d399S5nItBS7Ym1PfDEcqH', 'RecordingItem');
// hall/scripts/logic/hall/ui/recharge/RecordingItem.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var RechargeModel_1 = require("../../../hallcommon/model/RechargeModel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RecordingItem = /** @class */ (function (_super) {
    __extends(RecordingItem, _super);
    function RecordingItem() {
        var _a;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgIcon = null;
        _this.dateLabel = null;
        //支付状态类型
        _this.payTypeLabel = null;
        //支付状态
        _this.tyLable = null;
        //金额
        _this.moneyLabel = null;
        _this.typeIcon = null;
        // "create_date":"0000-00-00 00:00:00",
        // "account":"6212264000031391242",
        // "point":20000,
        // "status": 1 // -1 拒绝 0默认 待审核 1已审核 2确认中 3 兑换成功
        _this.typeDefine = [
            "VIP充值",
            "线上充值",
            "银行卡充值",
            "后台赠送",
            "小额充值",
        ];
        // 线上充值又分了这些
        _this.onlinePay = (_a = {},
            _a[RechargeModel_1.default.PayType.Vip] = "VIP充值",
            _a[RechargeModel_1.default.PayType.VipQuickPay] = "专享闪付",
            _a[RechargeModel_1.default.PayType.Ali] = "支付宝充值",
            _a[RechargeModel_1.default.PayType.Wechat] = "微信充值",
            _a[RechargeModel_1.default.PayType.Qq] = "QQ充值",
            _a[RechargeModel_1.default.PayType.YunPay] = "云闪付",
            _a[RechargeModel_1.default.PayType.Union] = "银行卡转账",
            _a[RechargeModel_1.default.PayType.OnlinePay] = "收银台",
            _a);
        return _this;
    }
    RecordingItem.prototype.Init = function (data, j, isRecharge) {
        var colorArr = Global.Setting.SkinConfig.recordingItemColors;
        if (j % 2 == 0) {
            this.bgIcon.node.active = false;
        }
        else {
            this.bgIcon.node.active = true;
        }
        if (isRecharge) {
            this.dateLabel.string = String(data.ctime);
            if (data.ctype == 2) {
                this.payTypeLabel.string = String(this.onlinePay[data.pay_name]);
            }
            else {
                this.payTypeLabel.string = String(this.typeDefine[data.ctype - 1]);
            }
            if (data.status == 2) {
                this.typeIcon.node.active = false;
                this.tyLable.string = "充值成功";
            }
            else {
                this.typeIcon.node.active = true;
                this.tyLable.string = "充值失败";
            }
            this.moneyLabel.string = "" + (data.point / Global.Setting.glodRatio);
            this.tyLable.string = data.status == 1 ? '处理中' : data.status == 2 ? '充值成功' : '充值失败';
            var color = new cc.Color();
            this.tyLable.node.color = data.status == 1 ? color.fromHEX(colorArr[0]) : data.status == 2 ? color.fromHEX(colorArr[1]) : color.fromHEX(colorArr[2]);
        }
        else { //提现
            /**
 *
 * @param data  {
        "create_date":"0000-00-00 00:00:00",
        "account":"6212264000031391242",
        "point":20000,
        "status": 1 // -1 拒绝 0默认 待审核 1已审核 2确认中 3 兑换成功
        "type":0全部 1支付宝 2银行卡
    }
 */
            this.dateLabel.string = String(data.create_date);
            this.payTypeLabel.string = data.type == 1 ? "银行卡提现" : "支付宝提现";
            this.moneyLabel.string = "" + (data.point / Global.Setting.glodRatio);
            if (data.status == -1) {
                this.typeIcon.node.active = true;
            }
            else {
                this.typeIcon.node.active = false;
            }
            this.tyLable.string = data.status == 3 ? '提现成功' : data.status == -1 ? '提现失败' : '处理中';
            var color = new cc.Color();
            this.tyLable.node.color = data.status == 3 ? color.fromHEX(colorArr[3]) : data.status == -1 ? color.fromHEX(colorArr[4]) : color.fromHEX(colorArr[5]);
            this.moneyLabel.string = Global.Toolkit.formatPointStr(data.point);
        }
    };
    __decorate([
        property(cc.Sprite)
    ], RecordingItem.prototype, "bgIcon", void 0);
    __decorate([
        property(cc.Label)
    ], RecordingItem.prototype, "dateLabel", void 0);
    __decorate([
        property(cc.Label)
    ], RecordingItem.prototype, "payTypeLabel", void 0);
    __decorate([
        property(cc.Label)
    ], RecordingItem.prototype, "tyLable", void 0);
    __decorate([
        property(cc.Label)
    ], RecordingItem.prototype, "moneyLabel", void 0);
    __decorate([
        property(cc.Sprite)
    ], RecordingItem.prototype, "typeIcon", void 0);
    RecordingItem = __decorate([
        ccclass
    ], RecordingItem);
    return RecordingItem;
}(cc.Component));
exports.default = RecordingItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWNoYXJnZVxcUmVjb3JkaW5nSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5RUFBb0U7QUFFOUQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQVk7SUFBdkQ7O1FBQUEscUVBb0dDO1FBakdHLFlBQU0sR0FBYyxJQUFJLENBQUM7UUFHekIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUMzQixRQUFRO1FBRVIsa0JBQVksR0FBYSxJQUFJLENBQUM7UUFDOUIsTUFBTTtRQUVOLGFBQU8sR0FBYSxJQUFJLENBQUM7UUFDekIsSUFBSTtRQUVKLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLGNBQVEsR0FBYyxJQUFJLENBQUM7UUFDdkIsdUNBQXVDO1FBQ3ZDLG1DQUFtQztRQUNuQyxpQkFBaUI7UUFDakIsZ0RBQWdEO1FBQ3hDLGdCQUFVLEdBQUc7WUFDakIsT0FBTztZQUNQLE1BQU07WUFDTixPQUFPO1lBQ1AsTUFBTTtZQUNOLE1BQU07U0FDVCxDQUFBO1FBQ0wsWUFBWTtRQUNKLGVBQVM7WUFDYixHQUFDLHVCQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBRyxPQUFPO1lBQ3BDLEdBQUMsdUJBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFHLE1BQU07WUFDM0MsR0FBQyx1QkFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUcsT0FBTztZQUNwQyxHQUFDLHVCQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBRyxNQUFNO1lBQ3RDLEdBQUMsdUJBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFHLE1BQU07WUFDbEMsR0FBQyx1QkFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUcsS0FBSztZQUNyQyxHQUFD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QyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEU7SUFDTCxDQUFDO0lBaEdEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aURBQ0s7SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztvREFDUTtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3VEQUNXO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7a0RBQ007SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztxREFDUztJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNPO0lBbEJWLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0FvR2pDO0lBQUQsb0JBQUM7Q0FwR0QsQUFvR0MsQ0FwRzBDLEVBQUUsQ0FBQyxTQUFTLEdBb0d0RDtrQkFwR29CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVjaGFyZ2VNb2RlbCBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9SZWNoYXJnZU1vZGVsXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY29yZGluZ0l0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBiZ0ljb246IGNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgZGF0ZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICAvL+aUr+S7mOeKtuaAgeexu+Wei1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcGF5VHlwZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICAvL+aUr+S7mOeKtuaAgVxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgdHlMYWJsZTogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgLy/ph5Hpop1cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIG1vbmV5TGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHR5cGVJY29uOiBjYy5TcHJpdGUgPSBudWxsO1xyXG4gICAgICAgIC8vIFwiY3JlYXRlX2RhdGVcIjpcIjAwMDAtMDAtMDAgMDA6MDA6MDBcIixcclxuICAgICAgICAvLyBcImFjY291bnRcIjpcIjYyMTIyNjQwMDAwMzEzOTEyNDJcIixcclxuICAgICAgICAvLyBcInBvaW50XCI6MjAwMDAsXHJcbiAgICAgICAgLy8gXCJzdGF0dXNcIjogMSAvLyAtMSDmi5Lnu50gMOm7mOiupCDlvoXlrqHmoLggMeW3suWuoeaguCAy56Gu6K6k5LitIDMg5YWR5o2i5oiQ5YqfXHJcbiAgICAgICAgcHJpdmF0ZSB0eXBlRGVmaW5lID0gW1xyXG4gICAgICAgICAgICBcIlZJUOWFheWAvFwiLFxyXG4gICAgICAgICAgICBcIue6v+S4iuWFheWAvFwiLFxyXG4gICAgICAgICAgICBcIumTtuihjOWNoeWFheWAvFwiLFxyXG4gICAgICAgICAgICBcIuWQjuWPsOi1oOmAgVwiLFxyXG4gICAgICAgICAgICBcIuWwj+mineWFheWAvFwiLFxyXG4gICAgICAgIF1cclxuICAgIC8vIOe6v+S4iuWFheWAvOWPiOWIhuS6hui/meS6m1xyXG4gICAgcHJpdmF0ZSBvbmxpbmVQYXkgPSB7XHJcbiAgICAgICAgW1JlY2hhcmdlTW9kZWwuUGF5VHlwZS5WaXBdOiBcIlZJUOWFheWAvFwiLFxyXG4gICAgICAgIFtSZWNoYXJnZU1vZGVsLlBheVR5cGUuVmlwUXVpY2tQYXldOiBcIuS4k+S6q+mXquS7mFwiLFxyXG4gICAgICAgIFtSZWNoYXJnZU1vZGVsLlBheVR5cGUuQWxpXTogXCLmlK/ku5jlrp3lhYXlgLxcIixcclxuICAgICAgICBbUmVjaGFyZ2VNb2RlbC5QYXlUeXBlLldlY2hhdF06IFwi5b6u5L+h5YWF5YC8XCIsXHJcbiAgICAgICAgW1JlY2hhcmdlTW9kZWwuUGF5VHlwZS5RcV06IFwiUVHlhYXlgLxcIixcclxuICAgICAgICBbUmVjaGFyZ2VNb2RlbC5QYXlUeXBlLll1blBheV06IFwi5LqR6Zeq5LuYXCIsXHJcbiAgICAgICAgW1JlY2hhcmdlTW9kZWwuUGF5VHlwZS5Vbmlvbl06IFwi6ZO26KGM5Y2h6L2s6LSmXCIsXHJcbiAgICAgICAgW1JlY2hhcmdlTW9kZWwuUGF5VHlwZS5PbmxpbmVQYXldOiBcIuaUtumTtuWPsFwiLFxyXG4gICAgfVxyXG4gICAgSW5pdChkYXRhLGosaXNSZWNoYXJnZSlcclxuICAgIHtcclxuICAgICAgICBsZXQgY29sb3JBcnIgPSBHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLnJlY29yZGluZ0l0ZW1Db2xvcnM7XHJcblxyXG4gICAgICAgIGlmKGolMiA9PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5iZ0ljb24ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5iZ0ljb24ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNSZWNoYXJnZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUxhYmVsLnN0cmluZyA9IFN0cmluZyhkYXRhLmN0aW1lKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmN0eXBlID09IDIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXlUeXBlTGFiZWwuc3RyaW5nID0gU3RyaW5nKHRoaXMub25saW5lUGF5W2RhdGEucGF5X25hbWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXlUeXBlTGFiZWwuc3RyaW5nID0gU3RyaW5nKHRoaXMudHlwZURlZmluZVtkYXRhLmN0eXBlLTFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihkYXRhLnN0YXR1cyA9PSAyKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudHlwZUljb24ubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy50eUxhYmxlLnN0cmluZyA9IFwi5YWF5YC85oiQ5YqfXCI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlSWNvbi5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMudHlMYWJsZS5zdHJpbmcgPSBcIuWFheWAvOWksei0pVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubW9uZXlMYWJlbC5zdHJpbmcgPSBcIlwiKyAoZGF0YS5wb2ludCAvIEdsb2JhbC5TZXR0aW5nLmdsb2RSYXRpbylcclxuICAgICAgICAgICAgdGhpcy50eUxhYmxlLnN0cmluZyA9IGRhdGEuc3RhdHVzID09IDEgPyAn5aSE55CG5LitJzogZGF0YS5zdGF0dXMgPT0gMiA/ICflhYXlgLzmiJDlip8nOiAn5YWF5YC85aSx6LSlJztcclxuICAgICAgICAgICAgbGV0IGNvbG9yID0gbmV3IGNjLkNvbG9yKCk7XHJcbiAgICAgICAgICAgIHRoaXMudHlMYWJsZS5ub2RlLmNvbG9yID0gZGF0YS5zdGF0dXMgPT0gMSA/IGNvbG9yLmZyb21IRVgoY29sb3JBcnJbMF0pOiBkYXRhLnN0YXR1cyA9PSAyID8gY29sb3IuZnJvbUhFWChjb2xvckFyclsxXSk6IGNvbG9yLmZyb21IRVgoY29sb3JBcnJbMl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgeyAvL+aPkOeOsFxyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBkYXRhICB7XHJcbiAgICAgICAgICAgIFwiY3JlYXRlX2RhdGVcIjpcIjAwMDAtMDAtMDAgMDA6MDA6MDBcIixcclxuICAgICAgICAgICAgXCJhY2NvdW50XCI6XCI2MjEyMjY0MDAwMDMxMzkxMjQyXCIsXHJcbiAgICAgICAgICAgIFwicG9pbnRcIjoyMDAwMCxcclxuICAgICAgICAgICAgXCJzdGF0dXNcIjogMSAvLyAtMSDmi5Lnu50gMOm7mOiupCDlvoXlrqHmoLggMeW3suWuoeaguCAy56Gu6K6k5LitIDMg5YWR5o2i5oiQ5YqfXHJcbiAgICAgICAgICAgIFwidHlwZVwiOjDlhajpg6ggMeaUr+S7mOWunSAy6ZO26KGM5Y2hXHJcbiAgICAgICAgfVxyXG4gICAgICovXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZUxhYmVsLnN0cmluZyA9IFN0cmluZyhkYXRhLmNyZWF0ZV9kYXRlKTtcclxuICAgICAgICAgICAgdGhpcy5wYXlUeXBlTGFiZWwuc3RyaW5nID0gZGF0YS50eXBlID09IDEgPyBcIumTtuihjOWNoeaPkOeOsFwiIDogXCLmlK/ku5jlrp3mj5DnjrBcIjtcclxuICAgICAgICAgICAgdGhpcy5tb25leUxhYmVsLnN0cmluZyA9IFwiXCIrIChkYXRhLnBvaW50IC8gR2xvYmFsLlNldHRpbmcuZ2xvZFJhdGlvKVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGRhdGEuc3RhdHVzID09IC0xKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudHlwZUljb24ubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlSWNvbi5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy50eUxhYmxlLnN0cmluZyA9IGRhdGEuc3RhdHVzID09IDMgPyAn5o+Q546w5oiQ5YqfJzogZGF0YS5zdGF0dXMgPT0gLTEgPyAn5o+Q546w5aSx6LSlJzogJ+WkhOeQhuS4rSc7XHJcbiAgICAgICAgICAgIGxldCBjb2xvciA9IG5ldyBjYy5Db2xvcigpO1xyXG4gICAgICAgICAgICB0aGlzLnR5TGFibGUubm9kZS5jb2xvciA9IGRhdGEuc3RhdHVzID09IDMgPyBjb2xvci5mcm9tSEVYKGNvbG9yQXJyWzNdKTogZGF0YS5zdGF0dXMgPT0gLTEgPyBjb2xvci5mcm9tSEVYKGNvbG9yQXJyWzRdKTogY29sb3IuZnJvbUhFWChjb2xvckFycls1XSk7XHJcbiAgICAgICAgICAgIHRoaXMubW9uZXlMYWJlbC5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihkYXRhLnBvaW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19