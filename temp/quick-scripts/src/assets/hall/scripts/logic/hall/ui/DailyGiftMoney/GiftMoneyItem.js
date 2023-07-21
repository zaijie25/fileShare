"use strict";
cc._RF.push(module, '6c00cmzOfVGXrsGOHN3UaQJ', 'GiftMoneyItem');
// hall/scripts/logic/hall/ui/DailyGiftMoney/GiftMoneyItem.ts

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
var GiftMoneyItem = /** @class */ (function (_super) {
    __extends(GiftMoneyItem, _super);
    function GiftMoneyItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label1 = null;
        _this.label2 = null;
        _this.label3 = null;
        return _this;
    }
    GiftMoneyItem.prototype.Init = function (data, msg) {
        if (data == null || msg == null) {
            this.label1.string = "";
            this.label2.string = "";
            this.label3.string = "—";
        }
        else {
            this.label1.string = Global.Toolkit.formatMillion(data.bet_point / 10000);
            this.label2.string = Global.Toolkit.GetMoneyFormat(data.point);
            if (msg >= 0) {
                this.label3.string = Global.Toolkit.GetMoneyFormat(msg);
            }
            else {
                this.label3.string = "—";
            }
        }
    };
    GiftMoneyItem.prototype.InitSafe = function (data, msg) {
        if (data == null || msg == null) {
            this.label1.string = "";
            this.label2.string = "";
            this.label3.string = "—";
        }
        else {
            this.label1.string = data.multi;
            this.label2.string = data.rate + "%";
            if (msg >= 0) {
                this.label3.string = (msg * data.rate / 100 / Global.Setting.glodRatio).toString();
            }
            else {
                this.label3.string = "—";
            }
        }
    };
    __decorate([
        property(cc.Label)
    ], GiftMoneyItem.prototype, "label1", void 0);
    __decorate([
        property(cc.Label)
    ], GiftMoneyItem.prototype, "label2", void 0);
    __decorate([
        property(cc.Label)
    ], GiftMoneyItem.prototype, "label3", void 0);
    GiftMoneyItem = __decorate([
        ccclass
    ], GiftMoneyItem);
    return GiftMoneyItem;
}(cc.Component));
exports.default = GiftMoneyItem;

cc._RF.pop();