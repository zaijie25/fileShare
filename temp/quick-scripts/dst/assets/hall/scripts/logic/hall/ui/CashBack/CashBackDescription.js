
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/CashBack/CashBackDescription.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxDYXNoQmFja1xcQ2FzaEJhY2tEZXNjcmlwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFpRCx1Q0FBWTtJQUE3RDtRQUFBLHFFQWtCQztRQWZHLFdBQUssR0FBYSxJQUFJLENBQUM7UUFHdkIsZ0JBQVUsR0FBYSxJQUFJLENBQUM7O0lBWWhDLENBQUM7SUFWRyxrQ0FBSSxHQUFKLFVBQUssSUFBSTtRQUNMLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtTQUMxQzthQUNJO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtTQUN4RDtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO0lBRWpELENBQUM7SUFkRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3NEQUNJO0lBR3ZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MkRBQ1M7SUFOWCxtQkFBbUI7UUFEdkMsT0FBTztPQUNhLG1CQUFtQixDQWtCdkM7SUFBRCwwQkFBQztDQWxCRCxBQWtCQyxDQWxCZ0QsRUFBRSxDQUFDLFNBQVMsR0FrQjVEO2tCQWxCb0IsbUJBQW1CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhc2hCYWNrRGVzY3JpcHRpb24gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIE1vbmV5OiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJvcG9ydGlvbjogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEluaXQoZGF0YSkge1xyXG4gICAgICAgIGlmIChkYXRhLmJldF9tYXggPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTW9uZXkuc3RyaW5nID0gZGF0YS5iZXRfbWl4ICsgXCLku6XkuIpcIlxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5Nb25leS5zdHJpbmcgPSBkYXRhLmJldF9taXggKyBcIi1cIiArIGRhdGEuYmV0X21heFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByb3BvcnRpb24uc3RyaW5nID0gZGF0YS5iZXRfcmF0ZSArIFwiJVwiO1xyXG4gICAgICAgXHJcbiAgICB9XHJcbn1cclxuIl19