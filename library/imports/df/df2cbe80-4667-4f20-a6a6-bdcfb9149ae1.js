"use strict";
cc._RF.push(module, 'df2cb6ARmdPIKamvc+5FJrh', 'BankGiftRecordItem');
// hall/scripts/logic/hall/ui/money/ui/bank/BankGiftRecordItem.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BankGiftRecordItem = /** @class */ (function (_super) {
    __extends(BankGiftRecordItem, _super);
    function BankGiftRecordItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeLabel = null;
        _this.giverIDLabel = null;
        _this.numLabel = null;
        _this.stateNodes = [];
        return _this;
    }
    BankGiftRecordItem.prototype.reset = function () {
    };
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
    BankGiftRecordItem.prototype.setData = function (data) {
        // this.timeLabel.string = data.create_date;
        // this.giverIDLabel.string = data.type == 1 ? "银行卡提现" : "支付宝提现";
        // this.numLabel.string = data.point;
        // for (let index = 0; index < this.stateNodes.length; index++) {
        //     const stateNode = this.stateNodes[index];
        //     stateNode.active = (data.status == index);
        // }
    };
    __decorate([
        property(cc.Label)
    ], BankGiftRecordItem.prototype, "timeLabel", void 0);
    __decorate([
        property(cc.Label)
    ], BankGiftRecordItem.prototype, "giverIDLabel", void 0);
    __decorate([
        property(cc.Label)
    ], BankGiftRecordItem.prototype, "numLabel", void 0);
    __decorate([
        property([cc.Node])
    ], BankGiftRecordItem.prototype, "stateNodes", void 0);
    BankGiftRecordItem = __decorate([
        ccclass
    ], BankGiftRecordItem);
    return BankGiftRecordItem;
}(cc.Component));
exports.default = BankGiftRecordItem;

cc._RF.pop();