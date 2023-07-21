
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/money/ui/extractCash/ExtractRecordItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cff6e2gwkJM+b91KP0iYzPG', 'ExtractRecordItem');
// hall/scripts/logic/hall/ui/money/ui/extractCash/ExtractRecordItem.ts

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
var ExtractRecordItem = /** @class */ (function (_super) {
    __extends(ExtractRecordItem, _super);
    function ExtractRecordItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeLabel = null;
        _this.modeLabel = null;
        _this.numLabel = null;
        _this.stateNodes = [];
        _this.data = null;
        return _this;
    }
    ExtractRecordItem.prototype.reset = function () {
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
    ExtractRecordItem.prototype.setData = function (data) {
        this.data = data;
        this.timeLabel.string = data.create_date;
        this.modeLabel.string = data.type == 1 ? "银行卡提现" : "支付宝提现";
        //this.numLabel.string = Global.Toolkit.GetMoneyFormat(data.point);
        this.numLabel.string = (data.point / Global.Setting.glodRatio).toFixed(0); // + "Y";//2019-6-1 xiaoC 不显示“元”
        for (var index = 0; index < this.stateNodes.length; index++) {
            var stateNode = this.stateNodes[index];
            stateNode.active = ((data.status + 1) == index);
        }
    };
    ExtractRecordItem.prototype.errorBtnFunc = function () {
        if (this.data) {
            Global.Audio.playBtnSound();
            Global.UI.showAlertBox(this.data.reason);
        }
    };
    __decorate([
        property(cc.Label)
    ], ExtractRecordItem.prototype, "timeLabel", void 0);
    __decorate([
        property(cc.Label)
    ], ExtractRecordItem.prototype, "modeLabel", void 0);
    __decorate([
        property(cc.Label)
    ], ExtractRecordItem.prototype, "numLabel", void 0);
    __decorate([
        property([cc.Node])
    ], ExtractRecordItem.prototype, "stateNodes", void 0);
    ExtractRecordItem = __decorate([
        ccclass
    ], ExtractRecordItem);
    return ExtractRecordItem;
}(cc.Component));
exports.default = ExtractRecordItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtb25leVxcdWlcXGV4dHJhY3RDYXNoXFxFeHRyYWN0UmVjb3JkSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUErQyxxQ0FBWTtJQUEzRDtRQUFBLHFFQWtEQztRQS9DRyxlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0IsY0FBUSxHQUFhLElBQUksQ0FBQztRQUcxQixnQkFBVSxHQUFtQixFQUFFLENBQUM7UUFFaEMsVUFBSSxHQUFTLElBQUksQ0FBQzs7SUFvQ3RCLENBQUM7SUFsQ0csaUNBQUssR0FBTDtJQUVBLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxtQ0FBTyxHQUFQLFVBQVMsSUFBUztRQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzNELG1FQUFtRTtRQUNuRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxnQ0FBZ0M7UUFDMUcsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3pELElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQztTQUNuRDtJQUNMLENBQUM7SUFFRCx3Q0FBWSxHQUFaO1FBQ0ksSUFBRyxJQUFJLENBQUMsSUFBSSxFQUFDO1lBQ1QsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUM1QixNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzVDO0lBRUwsQ0FBQztJQTdDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3dEQUNRO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0RBQ1E7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt1REFDTztJQUcxQjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzt5REFDWTtJQVpmLGlCQUFpQjtRQURyQyxPQUFPO09BQ2EsaUJBQWlCLENBa0RyQztJQUFELHdCQUFDO0NBbERELEFBa0RDLENBbEQ4QyxFQUFFLENBQUMsU0FBUyxHQWtEMUQ7a0JBbERvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXh0cmFjdFJlY29yZEl0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHRpbWVMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIG1vZGVMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIG51bUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5Ob2RlXSlcclxuICAgIHN0YXRlTm9kZXM6IEFycmF5PGNjLk5vZGU+ID0gW107XHJcblxyXG4gICAgZGF0YSA6IGFueSA9IG51bGw7XHJcblxyXG4gICAgcmVzZXQoKXsgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gZGF0YSAge1xyXG4gICAgICAgICAgICBcImNyZWF0ZV9kYXRlXCI6XCIwMDAwLTAwLTAwIDAwOjAwOjAwXCIsXHJcbiAgICAgICAgICAgIFwiYWNjb3VudFwiOlwiNjIxMjI2NDAwMDAzMTM5MTI0MlwiLFxyXG4gICAgICAgICAgICBcInBvaW50XCI6MjAwMDAsXHJcbiAgICAgICAgICAgIFwic3RhdHVzXCI6IDEgLy8gLTEg5ouS57udIDDpu5jorqQg5b6F5a6h5qC4IDHlt7LlrqHmoLggMuehruiupOS4rSAzIOWFkeaNouaIkOWKn1xyXG4gICAgICAgICAgICBcInR5cGVcIjow5YWo6YOoIDHmlK/ku5jlrp0gMumTtuihjOWNoVxyXG4gICAgICAgIH1cclxuICAgICAqL1xyXG4gICAgc2V0RGF0YSggZGF0YTogYW55ICl7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLnRpbWVMYWJlbC5zdHJpbmcgPSBkYXRhLmNyZWF0ZV9kYXRlO1xyXG4gICAgICAgIHRoaXMubW9kZUxhYmVsLnN0cmluZyA9IGRhdGEudHlwZSA9PSAxID8gXCLpk7booYzljaHmj5DnjrBcIiA6IFwi5pSv5LuY5a6d5o+Q546wXCI7XHJcbiAgICAgICAgLy90aGlzLm51bUxhYmVsLnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LkdldE1vbmV5Rm9ybWF0KGRhdGEucG9pbnQpO1xyXG4gICAgICAgIHRoaXMubnVtTGFiZWwuc3RyaW5nID0gKGRhdGEucG9pbnQgLyBHbG9iYWwuU2V0dGluZy5nbG9kUmF0aW8pLnRvRml4ZWQoMCk7Ly8gKyBcIllcIjsvLzIwMTktNi0xIHhpYW9DIOS4jeaYvuekuuKAnOWFg+KAnVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnN0YXRlTm9kZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlTm9kZSA9IHRoaXMuc3RhdGVOb2Rlc1tpbmRleF07XHJcbiAgICAgICAgICAgIHN0YXRlTm9kZS5hY3RpdmUgPSAoKGRhdGEuc3RhdHVzICsgMSkgPT0gaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBlcnJvckJ0bkZ1bmMoKXtcclxuICAgICAgICBpZih0aGlzLmRhdGEpe1xyXG4gICAgICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUJ0blNvdW5kKCk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93QWxlcnRCb3godGhpcy5kYXRhLnJlYXNvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=