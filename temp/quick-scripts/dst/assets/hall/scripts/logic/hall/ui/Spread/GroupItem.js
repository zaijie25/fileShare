
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Spread/GroupItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd19cc94blhMLYE/a401g6MF', 'GroupItem');
// hall/scripts/logic/hall/ui/Spread/GroupItem.ts

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
var GroupItem = /** @class */ (function (_super) {
    __extends(GroupItem, _super);
    function GroupItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgIcon = null;
        /**游戏id */
        _this.IdLabel = null;
        /**直属业绩名字 */
        _this.NameLabel = null;
        /**下级业绩 */
        _this.VatLable = null;
        /**佣金 */
        _this.GroupPopulation = null;
        _this.Icon = null;
        /**团队人数 */
        _this.GroupVat = null;
        return _this;
    }
    GroupItem.prototype.Init = function (data, j) {
        var SpreadModel = Global.ModelManager.getModel("SpreadModel");
        var cmmi_type = SpreadModel.commiType;
        if (data == null) {
            this.Icon.node.active = false;
            this.IdLabel.string = "";
            this.NameLabel.string = "";
            this.VatLable.string = "";
            this.GroupVat.string = "";
            this.GroupPopulation.string = "";
        }
        else {
            if (j % 2 == 0) {
                this.bgIcon.node.active = true;
            }
            else {
                this.bgIcon.node.active = false;
            }
            if (cmmi_type == 1) {
                // this.Icon.node.active = (data.is_new == 1)
                // this.IdLabel.string = data.user_id
                // this.NameLabel.string = Global.Toolkit.substrEndWithElli( data.name , 8)
                // this.VatLable.string = Global.Toolkit.formatPointStr(data.percent, true)
                // this.GroupVat.string = Global.Toolkit.formatPointStr(data.team_percent, true)
                // this.GroupPopulation.string = data.team_num
            }
            else if (cmmi_type == 2) {
                this.IdLabel.string = data.user_id;
                this.NameLabel.string = Global.Toolkit.formatPointStr(data.unter_flow, true);
                this.VatLable.string = Global.Toolkit.formatPointStr(data.team_flow, true);
                this.GroupVat.string = data.team_num;
                this.GroupPopulation.string = Global.Toolkit.formatPointStr(data.commi, true);
            }
        }
    };
    __decorate([
        property(cc.Sprite)
    ], GroupItem.prototype, "bgIcon", void 0);
    __decorate([
        property(cc.Label)
    ], GroupItem.prototype, "IdLabel", void 0);
    __decorate([
        property(cc.Label)
    ], GroupItem.prototype, "NameLabel", void 0);
    __decorate([
        property(cc.Label)
    ], GroupItem.prototype, "VatLable", void 0);
    __decorate([
        property(cc.Label)
    ], GroupItem.prototype, "GroupPopulation", void 0);
    __decorate([
        property(cc.Sprite)
    ], GroupItem.prototype, "Icon", void 0);
    __decorate([
        property(cc.Label)
    ], GroupItem.prototype, "GroupVat", void 0);
    GroupItem = __decorate([
        ccclass
    ], GroupItem);
    return GroupItem;
}(cc.Component));
exports.default = GroupItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxTcHJlYWRcXEdyb3VwSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQTZEQztRQTFERyxZQUFNLEdBQWMsSUFBSSxDQUFDO1FBRXpCLFVBQVU7UUFFVixhQUFPLEdBQWEsSUFBSSxDQUFDO1FBRXpCLFlBQVk7UUFFWixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRTNCLFVBQVU7UUFFVixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRTFCLFFBQVE7UUFFUixxQkFBZSxHQUFhLElBQUksQ0FBQztRQUVqQyxVQUFJLEdBQWMsSUFBSSxDQUFDO1FBQ3ZCLFVBQVU7UUFFVixjQUFRLEdBQWEsSUFBSSxDQUFDOztJQXFDOUIsQ0FBQztJQW5DRyx3QkFBSSxHQUFKLFVBQUssSUFBSSxFQUFFLENBQUM7UUFDUixJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5RCxJQUFJLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFBO1FBQ3JDLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO1lBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtZQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7WUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO1lBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtTQUNuQzthQUNJO1lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDWixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQ2xDO2lCQUFNO2dCQUNILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDbkM7WUFDRCxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2hCLDZDQUE2QztnQkFDN0MscUNBQXFDO2dCQUNyQywyRUFBMkU7Z0JBQzNFLDJFQUEyRTtnQkFDM0UsZ0ZBQWdGO2dCQUNoRiw4Q0FBOEM7YUFDakQ7aUJBQ0ksSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFO2dCQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFBO2dCQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUM1RSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUMxRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFBO2dCQUNwQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO2FBQ2pGO1NBRUo7SUFDTCxDQUFDO0lBekREO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NkNBQ0s7SUFJekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs4Q0FDTTtJQUl6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dEQUNRO0lBSTNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7K0NBQ087SUFJMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztzREFDYztJQUVqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzJDQUNHO0lBR3ZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7K0NBQ087SUF4QlQsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQTZEN0I7SUFBRCxnQkFBQztDQTdERCxBQTZEQyxDQTdEc0MsRUFBRSxDQUFDLFNBQVMsR0E2RGxEO2tCQTdEb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91cEl0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBiZ0ljb246IGNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgLyoq5ri45oiPaWQgKi9cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIElkTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICAvKirnm7TlsZ7kuJrnu6nlkI3lrZcgKi9cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIE5hbWVMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIC8qKuS4i+e6p+S4mue7qSAqL1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgVmF0TGFibGU6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICAvKirkvaPph5EgKi9cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIEdyb3VwUG9wdWxhdGlvbjogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIEljb246IGNjLlNwcml0ZSA9IG51bGw7XHJcbiAgICAvKirlm6LpmJ/kurrmlbAgKi9cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIEdyb3VwVmF0OiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgSW5pdChkYXRhLCBqKSB7XHJcbiAgICAgICAgdmFyIFNwcmVhZE1vZGVsID0gR2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlNwcmVhZE1vZGVsXCIpO1xyXG4gICAgICAgIGxldCBjbW1pX3R5cGUgPSBTcHJlYWRNb2RlbC5jb21taVR5cGVcclxuICAgICAgICBpZiAoZGF0YSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuSWNvbi5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuSWRMYWJlbC5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgICAgIHRoaXMuTmFtZUxhYmVsLnN0cmluZyA9IFwiXCJcclxuICAgICAgICAgICAgdGhpcy5WYXRMYWJsZS5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgICAgIHRoaXMuR3JvdXBWYXQuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgICAgICB0aGlzLkdyb3VwUG9wdWxhdGlvbi5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoaiAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZ0ljb24ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZ0ljb24ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY21taV90eXBlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuSWNvbi5ub2RlLmFjdGl2ZSA9IChkYXRhLmlzX25ldyA9PSAxKVxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5JZExhYmVsLnN0cmluZyA9IGRhdGEudXNlcl9pZFxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5OYW1lTGFiZWwuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuc3Vic3RyRW5kV2l0aEVsbGkoIGRhdGEubmFtZSAsIDgpXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLlZhdExhYmxlLnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50U3RyKGRhdGEucGVyY2VudCwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuR3JvdXBWYXQuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoZGF0YS50ZWFtX3BlcmNlbnQsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLkdyb3VwUG9wdWxhdGlvbi5zdHJpbmcgPSBkYXRhLnRlYW1fbnVtXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY21taV90eXBlID09IDIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuSWRMYWJlbC5zdHJpbmcgPSBkYXRhLnVzZXJfaWRcclxuICAgICAgICAgICAgICAgIHRoaXMuTmFtZUxhYmVsLnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50U3RyKGRhdGEudW50ZXJfZmxvdywgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuVmF0TGFibGUuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoZGF0YS50ZWFtX2Zsb3csIHRydWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLkdyb3VwVmF0LnN0cmluZyA9IGRhdGEudGVhbV9udW1cclxuICAgICAgICAgICAgICAgIHRoaXMuR3JvdXBQb3B1bGF0aW9uLnN0cmluZyA9ICBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihkYXRhLmNvbW1pLCB0cnVlKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=