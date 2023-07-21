
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Spread/AwardDetailItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5e487XyJDZBHKehjM1FXMw7', 'AwardDetailItem');
// hall/scripts/logic/hall/ui/Spread/AwardDetailItem.ts

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
var AwardDetailItem = /** @class */ (function (_super) {
    __extends(AwardDetailItem, _super);
    function AwardDetailItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /***日期 */
        _this.TimeLabel = null;
        /**团队业绩 */
        _this.weekMyselfDir = null;
        /**直属业绩 */
        _this.WeekDirLabel = null;
        /** 下属业绩*/
        _this.WeekOtherLabel = null;
        /**所得佣金 */
        _this.Amount = null;
        return _this;
    }
    AwardDetailItem.prototype.Init = function (data) {
        var SpreadModel = Global.ModelManager.getModel("SpreadModel");
        var cmmi_type = SpreadModel.commiType;
        if (data == null) {
            this.TimeLabel.string = "";
            if (this.weekMyselfDir)
                this.weekMyselfDir.string = "";
            this.WeekDirLabel.string = "";
            this.WeekOtherLabel.string = "";
            this.Amount.string = "";
        }
        else {
            if (cmmi_type == 1) {
                // this.TimeLabel.string = data.send_time
                // if (this.weekMyselfDir)
                //     this.weekMyselfDir.string = Global.Toolkit.formatPointStr(data.self_point)
                // this.WeekDirLabel.string = Global.Toolkit.formatPointStr(data.unter_point)
                // this.Amount.string = Global.Toolkit.formatPointStr(data.total_point)
                // this.WeekOtherLabel.string = Global.Toolkit.formatPointStr(data.other_point)
            }
            if (cmmi_type == 2) {
                this.TimeLabel.string = data.time;
                if (this.weekMyselfDir)
                    this.weekMyselfDir.string = Global.Toolkit.formatPointStr(data.total_flow);
                this.WeekDirLabel.string = Global.Toolkit.formatPointStr(data.unter_flow);
                this.Amount.string = Global.Toolkit.formatPointStr(data.commi);
                this.WeekOtherLabel.string = Global.Toolkit.formatPointStr(data.team_flow);
            }
        }
    };
    __decorate([
        property(cc.Label)
    ], AwardDetailItem.prototype, "TimeLabel", void 0);
    __decorate([
        property(cc.Label)
    ], AwardDetailItem.prototype, "weekMyselfDir", void 0);
    __decorate([
        property(cc.Label)
    ], AwardDetailItem.prototype, "WeekDirLabel", void 0);
    __decorate([
        property(cc.Label)
    ], AwardDetailItem.prototype, "WeekOtherLabel", void 0);
    __decorate([
        property(cc.Label)
    ], AwardDetailItem.prototype, "Amount", void 0);
    AwardDetailItem = __decorate([
        ccclass
    ], AwardDetailItem);
    return AwardDetailItem;
}(cc.Component));
exports.default = AwardDetailItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxTcHJlYWRcXEF3YXJkRGV0YWlsSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE2QyxtQ0FBWTtJQUF6RDtRQUFBLHFFQXlEQztRQXZERyxTQUFTO1FBRVQsZUFBUyxHQUFhLElBQUksQ0FBQztRQUUzQixVQUFVO1FBRVYsbUJBQWEsR0FBYSxJQUFJLENBQUM7UUFFL0IsVUFBVTtRQUVWLGtCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRTlCLFVBQVU7UUFFVixvQkFBYyxHQUFhLElBQUksQ0FBQztRQUVoQyxVQUFVO1FBRVYsWUFBTSxHQUFhLElBQUksQ0FBQzs7SUFxQzVCLENBQUM7SUFqQ0csOEJBQUksR0FBSixVQUFLLElBQUk7UUFDTCxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5RCxJQUFJLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFBO1FBQ3JDLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtZQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtZQUMxQixJQUFJLElBQUksQ0FBQyxhQUFhO2dCQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7WUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO1lBQzdCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtZQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7U0FDMUI7YUFDSTtZQUNELElBQUcsU0FBUyxJQUFJLENBQUMsRUFDakI7Z0JBQ0kseUNBQXlDO2dCQUN6QywwQkFBMEI7Z0JBQzFCLGlGQUFpRjtnQkFDakYsNkVBQTZFO2dCQUM3RSx1RUFBdUU7Z0JBQ3ZFLCtFQUErRTthQUNsRjtZQUNGLElBQUcsU0FBUyxJQUFJLENBQUMsRUFDakI7Z0JBQ0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTtnQkFDakMsSUFBSSxJQUFJLENBQUMsYUFBYTtvQkFDbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO2dCQUM5RSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7Z0JBQ3pFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDOUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO2FBQzFFO1NBRUg7SUFDTCxDQUFDO0lBcEREO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7c0RBQ1E7SUFJM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzswREFDWTtJQUkvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3lEQUNXO0lBSTlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MkRBQ2E7SUFJaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDSztJQXBCUCxlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBeURuQztJQUFELHNCQUFDO0NBekRELEFBeURDLENBekQ0QyxFQUFFLENBQUMsU0FBUyxHQXlEeEQ7a0JBekRvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBd2FyZERldGFpbEl0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIC8qKirml6XmnJ8gKi9cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIFRpbWVMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIC8qKuWboumYn+S4mue7qSAqL1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgd2Vla015c2VsZkRpcjogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIC8qKuebtOWxnuS4mue7qSAqL1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgV2Vla0RpckxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgLyoqIOS4i+WxnuS4mue7qSovXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBXZWVrT3RoZXJMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIC8qKuaJgOW+l+S9o+mHkSAqL1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgQW1vdW50OiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG5cclxuXHJcbiAgICBJbml0KGRhdGEpIHtcclxuICAgICAgICB2YXIgU3ByZWFkTW9kZWwgPSBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiU3ByZWFkTW9kZWxcIik7XHJcbiAgICAgICAgbGV0IGNtbWlfdHlwZSA9IFNwcmVhZE1vZGVsLmNvbW1pVHlwZVxyXG4gICAgICAgIGlmIChkYXRhID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5UaW1lTGFiZWwuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgICAgICBpZiAodGhpcy53ZWVrTXlzZWxmRGlyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWVrTXlzZWxmRGlyLnN0cmluZyA9IFwiXCJcclxuICAgICAgICAgICAgdGhpcy5XZWVrRGlyTGFiZWwuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgICAgICB0aGlzLldlZWtPdGhlckxhYmVsLnN0cmluZyA9IFwiXCJcclxuICAgICAgICAgICAgdGhpcy5BbW91bnQuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYoY21taV90eXBlID09IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuVGltZUxhYmVsLnN0cmluZyA9IGRhdGEuc2VuZF90aW1lXHJcbiAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy53ZWVrTXlzZWxmRGlyKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMud2Vla015c2VsZkRpci5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihkYXRhLnNlbGZfcG9pbnQpXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLldlZWtEaXJMYWJlbC5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihkYXRhLnVudGVyX3BvaW50KVxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5BbW91bnQuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoZGF0YS50b3RhbF9wb2ludClcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuV2Vla090aGVyTGFiZWwuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoZGF0YS5vdGhlcl9wb2ludClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIGlmKGNtbWlfdHlwZSA9PSAyKVxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5UaW1lTGFiZWwuc3RyaW5nID0gZGF0YS50aW1lXHJcbiAgICAgICAgICAgIGlmICh0aGlzLndlZWtNeXNlbGZEaXIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLndlZWtNeXNlbGZEaXIuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoZGF0YS50b3RhbF9mbG93KVxyXG4gICAgICAgICAgICB0aGlzLldlZWtEaXJMYWJlbC5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihkYXRhLnVudGVyX2Zsb3cpXHJcbiAgICAgICAgICAgIHRoaXMuQW1vdW50LnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50U3RyKGRhdGEuY29tbWkpXHJcbiAgICAgICAgICAgIHRoaXMuV2Vla090aGVyTGFiZWwuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoZGF0YS50ZWFtX2Zsb3cpXHJcbiAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19