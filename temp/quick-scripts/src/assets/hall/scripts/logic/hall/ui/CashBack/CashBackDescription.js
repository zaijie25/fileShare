"use strict";
cc._RF.push(module, '57ef2nadztJaLjQ/AAKPWjz', 'CashBackDescription');
// hall/scripts/logic/hall/ui/CashBack/CashBackDescription.ts

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
var CashBackDescription = /** @class */ (function (_super) {
    __extends(CashBackDescription, _super);
    function CashBackDescription() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Money = null;
        _this.proportion = null;
        return _this;
    }
    CashBackDescription.prototype.Init = function (data) {
        if (data.bet_max === -1) {
            this.Money.string = data.bet_mix + "以上";
        }
        else {
            this.Money.string = data.bet_mix + "-" + data.bet_max;
        }
        this.proportion.string = data.bet_rate + "%";
    };
    __decorate([
        property(cc.Label)
    ], CashBackDescription.prototype, "Money", void 0);
    __decorate([
        property(cc.Label)
    ], CashBackDescription.prototype, "proportion", void 0);
    CashBackDescription = __decorate([
        ccclass
    ], CashBackDescription);
    return CashBackDescription;
}(cc.Component));
exports.default = CashBackDescription;

cc._RF.pop();