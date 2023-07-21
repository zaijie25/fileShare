
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/money/ui/bank/BankGiftRecordItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtb25leVxcdWlcXGJhbmtcXEJhbmtHaWZ0UmVjb3JkSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFnRCxzQ0FBWTtJQUE1RDtRQUFBLHFFQXNDQztRQW5DRyxlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLGtCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRzlCLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFHMUIsZ0JBQVUsR0FBbUIsRUFBRSxDQUFDOztJQTBCcEMsQ0FBQztJQXhCRyxrQ0FBSyxHQUFMO0lBRUEsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILG9DQUFPLEdBQVAsVUFBUyxJQUFTO1FBQ2QsNENBQTRDO1FBQzVDLGlFQUFpRTtRQUNqRSxxQ0FBcUM7UUFDckMsaUVBQWlFO1FBQ2pFLGdEQUFnRDtRQUNoRCxpREFBaUQ7UUFDakQsSUFBSTtJQUNSLENBQUM7SUFqQ0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt5REFDUTtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzREQUNXO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0RBQ087SUFHMUI7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7MERBQ1k7SUFaZixrQkFBa0I7UUFEdEMsT0FBTztPQUNhLGtCQUFrQixDQXNDdEM7SUFBRCx5QkFBQztDQXRDRCxBQXNDQyxDQXRDK0MsRUFBRSxDQUFDLFNBQVMsR0FzQzNEO2tCQXRDb0Isa0JBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbmtHaWZ0UmVjb3JkSXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgdGltZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgZ2l2ZXJJRExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgbnVtTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLk5vZGVdKVxyXG4gICAgc3RhdGVOb2RlczogQXJyYXk8Y2MuTm9kZT4gPSBbXTtcclxuXHJcbiAgICByZXNldCgpeyBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBkYXRhICB7XHJcbiAgICAgICAgICAgIFwiY3JlYXRlX2RhdGVcIjpcIjAwMDAtMDAtMDAgMDA6MDA6MDBcIixcclxuICAgICAgICAgICAgXCJhY2NvdW50XCI6XCI2MjEyMjY0MDAwMDMxMzkxMjQyXCIsXHJcbiAgICAgICAgICAgIFwicG9pbnRcIjoyMDAwMCxcclxuICAgICAgICAgICAgXCJzdGF0dXNcIjogMSAvLyAtMSDmi5Lnu50gMOm7mOiupCDlvoXlrqHmoLggMeW3suWuoeaguCAy56Gu6K6k5LitIDMg5YWR5o2i5oiQ5YqfXHJcbiAgICAgICAgICAgIFwidHlwZVwiOjDlhajpg6ggMeaUr+S7mOWunSAy6ZO26KGM5Y2hXHJcbiAgICAgICAgfVxyXG4gICAgICovXHJcbiAgICBzZXREYXRhKCBkYXRhOiBhbnkgKXtcclxuICAgICAgICAvLyB0aGlzLnRpbWVMYWJlbC5zdHJpbmcgPSBkYXRhLmNyZWF0ZV9kYXRlO1xyXG4gICAgICAgIC8vIHRoaXMuZ2l2ZXJJRExhYmVsLnN0cmluZyA9IGRhdGEudHlwZSA9PSAxID8gXCLpk7booYzljaHmj5DnjrBcIiA6IFwi5pSv5LuY5a6d5o+Q546wXCI7XHJcbiAgICAgICAgLy8gdGhpcy5udW1MYWJlbC5zdHJpbmcgPSBkYXRhLnBvaW50O1xyXG4gICAgICAgIC8vIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnN0YXRlTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IHN0YXRlTm9kZSA9IHRoaXMuc3RhdGVOb2Rlc1tpbmRleF07XHJcbiAgICAgICAgLy8gICAgIHN0YXRlTm9kZS5hY3RpdmUgPSAoZGF0YS5zdGF0dXMgPT0gaW5kZXgpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19