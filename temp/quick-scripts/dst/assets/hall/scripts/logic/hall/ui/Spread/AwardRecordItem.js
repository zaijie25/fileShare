
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Spread/AwardRecordItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '26992UuFkJJuIMcjbXS+PPY', 'AwardRecordItem');
// hall/scripts/logic/hall/ui/Spread/AwardRecordItem.ts

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
var AwardRecordItem = /** @class */ (function (_super) {
    __extends(AwardRecordItem, _super);
    function AwardRecordItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.TimeLabel = null;
        _this.TypeLabel = null;
        _this.Amount = null;
        return _this;
    }
    AwardRecordItem.prototype.Init = function (data) {
        var SpreadModel = Global.ModelManager.getModel("SpreadModel");
        var cmmi_type = SpreadModel.commiType;
        if (data == null) {
            this.TimeLabel.string = "";
            this.TypeLabel.string = "";
            this.Amount.string = "";
        }
        else {
            if (cmmi_type === 2) {
                this.TimeLabel.string = data.read_date + " " + data.read_time;
                this.TypeLabel.string = "业绩收入奖励";
            }
            else {
                this.TimeLabel.string = data.read_time;
            }
            if (data.read_type == 0) {
                this.TypeLabel.string = "推广税收奖励";
            }
            else if (data.read_type == 1) {
                this.TypeLabel.string = "自营税收奖励";
            }
            this.Amount.string = Global.Toolkit.formatPointStr(data.read_point);
        }
    };
    __decorate([
        property(cc.Label)
    ], AwardRecordItem.prototype, "TimeLabel", void 0);
    __decorate([
        property(cc.Label)
    ], AwardRecordItem.prototype, "TypeLabel", void 0);
    __decorate([
        property(cc.Label)
    ], AwardRecordItem.prototype, "Amount", void 0);
    AwardRecordItem = __decorate([
        ccclass
    ], AwardRecordItem);
    return AwardRecordItem;
}(cc.Component));
exports.default = AwardRecordItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxTcHJlYWRcXEF3YXJkUmVjb3JkSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE2QyxtQ0FBWTtJQUF6RDtRQUFBLHFFQXlDQztRQXRDRyxlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFJM0IsWUFBTSxHQUFhLElBQUksQ0FBQzs7SUErQjVCLENBQUM7SUEzQkcsOEJBQUksR0FBSixVQUFLLElBQUk7UUFDTCxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5RCxJQUFJLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFBO1FBRXJDLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtZQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtZQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7WUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO1NBQzFCO2FBQ0k7WUFDRCxJQUFJLFNBQVMsS0FBSyxDQUFDLEVBQ25CO2dCQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUE7Z0JBQzdELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQTthQUNuQztpQkFDSTtnQkFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBSSxJQUFJLENBQUMsU0FBUyxDQUFBO2FBQzFDO1lBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsRUFBRTtnQkFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFBO2FBQ25DO2lCQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQTthQUNuQztZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtTQUN0RTtJQUNMLENBQUM7SUFyQ0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztzREFDUTtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3NEQUNRO0lBSTNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7bURBQ0s7SUFWUCxlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBeUNuQztJQUFELHNCQUFDO0NBekNELEFBeUNDLENBekM0QyxFQUFFLENBQUMsU0FBUyxHQXlDeEQ7a0JBekNvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBd2FyZFJlY29yZEl0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIFRpbWVMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIFR5cGVMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBBbW91bnQ6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcblxyXG5cclxuICAgIEluaXQoZGF0YSkge1xyXG4gICAgICAgIHZhciBTcHJlYWRNb2RlbCA9IEdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJTcHJlYWRNb2RlbFwiKTtcclxuICAgICAgICBsZXQgY21taV90eXBlID0gU3ByZWFkTW9kZWwuY29tbWlUeXBlXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLlRpbWVMYWJlbC5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgICAgIHRoaXMuVHlwZUxhYmVsLnN0cmluZyA9IFwiXCJcclxuICAgICAgICAgICAgdGhpcy5BbW91bnQuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNtbWlfdHlwZSA9PT0gMilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5UaW1lTGFiZWwuc3RyaW5nID0gZGF0YS5yZWFkX2RhdGUgKyBcIiBcIiArIGRhdGEucmVhZF90aW1lXHJcbiAgICAgICAgICAgICAgICB0aGlzLlR5cGVMYWJlbC5zdHJpbmcgPSBcIuS4mue7qeaUtuWFpeWlluWKsVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRpbWVMYWJlbC5zdHJpbmcgPSAgZGF0YS5yZWFkX3RpbWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZWFkX3R5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5UeXBlTGFiZWwuc3RyaW5nID0gXCLmjqjlub/nqI7mlLblpZblirFcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEucmVhZF90eXBlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVHlwZUxhYmVsLnN0cmluZyA9IFwi6Ieq6JCl56iO5pS25aWW5YqxXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkFtb3VudC5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihkYXRhLnJlYWRfcG9pbnQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==