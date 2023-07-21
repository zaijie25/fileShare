
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/DailyGiftMoney/GiftMoneyItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxEYWlseUdpZnRNb25leVxcR2lmdE1vbmV5SXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEyQyxpQ0FBWTtJQUF2RDtRQUFBLHFFQWdEQztRQTdDRyxZQUFNLEdBQWEsSUFBSSxDQUFDO1FBR3hCLFlBQU0sR0FBYSxJQUFJLENBQUM7UUFHeEIsWUFBTSxHQUFhLElBQUksQ0FBQzs7SUF1QzVCLENBQUM7SUFuQ0csNEJBQUksR0FBSixVQUFLLElBQUksRUFBRSxHQUFHO1FBQ1YsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUE7U0FDM0I7YUFDSTtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUE7WUFDekUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQzlELElBQUksR0FBRyxJQUFJLENBQUMsRUFBRTtnQkFDVixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUMxRDtpQkFDSTtnQkFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUE7YUFDM0I7U0FFSjtJQUNMLENBQUM7SUFDRCxnQ0FBUSxHQUFSLFVBQVMsSUFBSSxFQUFDLEdBQUc7UUFDYixJQUFJLElBQUksSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7WUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQTtTQUMzQjthQUNJO1lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtZQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQTtZQUNwQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxHQUFHLEdBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTthQUMvRTtpQkFDSTtnQkFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUE7YUFDM0I7U0FDSjtJQUNMLENBQUM7SUE1Q0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztpREFDSztJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2lEQUNLO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7aURBQ0s7SUFUUCxhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBZ0RqQztJQUFELG9CQUFDO0NBaERELEFBZ0RDLENBaEQwQyxFQUFFLENBQUMsU0FBUyxHQWdEdEQ7a0JBaERvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHaWZ0TW9uZXlJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsYWJlbDE6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsYWJlbDI6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsYWJlbDM6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcblxyXG5cclxuICAgIEluaXQoZGF0YSwgbXNnKSB7XHJcbiAgICAgICAgaWYgKGRhdGEgPT0gbnVsbCB8fCBtc2cgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsMS5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgICAgIHRoaXMubGFiZWwyLnN0cmluZyA9IFwiXCJcclxuICAgICAgICAgICAgdGhpcy5sYWJlbDMuc3RyaW5nID0gXCLigJRcIlxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHsgXHJcbiAgICAgICAgICAgIHRoaXMubGFiZWwxLnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LmZvcm1hdE1pbGxpb24oZGF0YS5iZXRfcG9pbnQgLyAxMDAwMClcclxuICAgICAgICAgICAgdGhpcy5sYWJlbDIuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuR2V0TW9uZXlGb3JtYXQoZGF0YS5wb2ludClcclxuICAgICAgICAgICAgaWYgKG1zZyA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsMy5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5HZXRNb25leUZvcm1hdChtc2cpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsMy5zdHJpbmcgPSBcIuKAlFwiXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgSW5pdFNhZmUoZGF0YSxtc2cpIHtcclxuICAgICAgICBpZiAoZGF0YSA9PSBudWxsIHx8IG1zZyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWwxLnN0cmluZyA9IFwiXCJcclxuICAgICAgICAgICAgdGhpcy5sYWJlbDIuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgICAgICB0aGlzLmxhYmVsMy5zdHJpbmcgPSBcIuKAlFwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgeyBcclxuICAgICAgICAgICAgdGhpcy5sYWJlbDEuc3RyaW5nID0gZGF0YS5tdWx0aVxyXG4gICAgICAgICAgICB0aGlzLmxhYmVsMi5zdHJpbmcgPSBkYXRhLnJhdGUgKyBcIiVcIlxyXG4gICAgICAgICAgICBpZiAobXNnID49IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwzLnN0cmluZyA9IChtc2cqZGF0YS5yYXRlLzEwMC9HbG9iYWwuU2V0dGluZy5nbG9kUmF0aW8pLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwzLnN0cmluZyA9IFwi4oCUXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=