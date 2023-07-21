"use strict";
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