
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Activity/SpreadGift/SpreadGiftItemView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c745a52HaNJNod/rWCYy00X', 'SpreadGiftItemView');
// hall/scripts/logic/hall/ui/Activity/SpreadGift/SpreadGiftItemView.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var WndSpreadGiftActivityView_1 = require("./WndSpreadGiftActivityView");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SpreadGiftItemView = /** @class */ (function (_super) {
    __extends(SpreadGiftItemView, _super);
    function SpreadGiftItemView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeArr = [];
        _this.lightNode = null;
        _this.achievedLabel = null;
        _this.normalLabel = null;
        _this.personNumLabel = null;
        _this.achievedPersonNumLabel = null;
        return _this;
    }
    SpreadGiftItemView.prototype.RefreshState = function (state, data) {
        var btn = this.node.getComponent(cc.Button);
        switch (state) {
            case WndSpreadGiftActivityView_1.RedPackState.Normal:
                this.nodeArr[0].active = true;
                this.nodeArr[1].active = false;
                this.lightNode.active = false;
                this.normalLabel.string = cc.js.formatStr("%s元", Global.Toolkit.formatPointStr(data.point));
                this.achievedLabel.string = cc.js.formatStr("%s元", Global.Toolkit.formatPointStr(data.point));
                this.personNumLabel.string = cc.js.formatStr("%s人", data.num);
                this.achievedPersonNumLabel.string = cc.js.formatStr("%s人", data.num);
                if (btn) {
                    btn.interactable = false;
                }
                break;
            case WndSpreadGiftActivityView_1.RedPackState.HightLight:
                this.nodeArr[0].active = true;
                this.nodeArr[1].active = false;
                this.lightNode.active = true;
                this.normalLabel.string = cc.js.formatStr("%s元", Global.Toolkit.formatPointStr(data.point));
                this.achievedLabel.string = cc.js.formatStr("%s元", Global.Toolkit.formatPointStr(data.point));
                this.personNumLabel.string = cc.js.formatStr("%s人", data.num);
                this.achievedPersonNumLabel.string = cc.js.formatStr("%s人", data.num);
                if (btn) {
                    btn.interactable = true;
                }
                break;
            case WndSpreadGiftActivityView_1.RedPackState.Open:
                this.nodeArr[0].active = false;
                this.nodeArr[1].active = true;
                this.lightNode.active = false;
                if (btn) {
                    btn.interactable = false;
                }
                break;
            default:
                break;
        }
    };
    __decorate([
        property([cc.Node])
    ], SpreadGiftItemView.prototype, "nodeArr", void 0);
    __decorate([
        property(cc.Node)
    ], SpreadGiftItemView.prototype, "lightNode", void 0);
    __decorate([
        property(cc.Label)
    ], SpreadGiftItemView.prototype, "achievedLabel", void 0);
    __decorate([
        property(cc.Label)
    ], SpreadGiftItemView.prototype, "normalLabel", void 0);
    __decorate([
        property(cc.Label)
    ], SpreadGiftItemView.prototype, "personNumLabel", void 0);
    __decorate([
        property(cc.Label)
    ], SpreadGiftItemView.prototype, "achievedPersonNumLabel", void 0);
    SpreadGiftItemView = __decorate([
        ccclass
    ], SpreadGiftItemView);
    return SpreadGiftItemView;
}(cc.Component));
exports.default = SpreadGiftItemView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxBY3Rpdml0eVxcU3ByZWFkR2lmdFxcU3ByZWFkR2lmdEl0ZW1WaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR2xGLHlFQUEyRDtBQUVyRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFnRCxzQ0FBWTtJQUE1RDtRQUFBLHFFQWdFQztRQTdERyxhQUFPLEdBQWMsRUFBRSxDQUFDO1FBR3hCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsbUJBQWEsR0FBYSxJQUFJLENBQUM7UUFHL0IsaUJBQVcsR0FBYSxJQUFJLENBQUM7UUFJN0Isb0JBQWMsR0FBYSxJQUFJLENBQUM7UUFFaEMsNEJBQXNCLEdBQWEsSUFBSSxDQUFDOztJQThDNUMsQ0FBQztJQTVDRyx5Q0FBWSxHQUFaLFVBQWEsS0FBbUIsRUFBRSxJQUFJO1FBQ2xDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMzQyxRQUFRLEtBQUssRUFBRTtZQUNYLEtBQUssd0NBQVksQ0FBQyxNQUFNO2dCQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7Z0JBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtnQkFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO2dCQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLE1B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QUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs4REFDYTtJQUVoQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3NFQUNxQjtJQWxCdkIsa0JBQWtCO1FBRHRDLE9BQU87T0FDYSxrQkFBa0IsQ0FnRXRDO0lBQUQseUJBQUM7Q0FoRUQsQUFnRUMsQ0FoRStDLEVBQUUsQ0FBQyxTQUFTLEdBZ0UzRDtrQkFoRW9CLGtCQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCB7IENCQ0RlY3J5cHRvciB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9mcmFtZXdvcmsvbGlicy9jcnlwdG9Ucy9tb2RlL0NCQ0RlY3J5cHRvclwiO1xyXG5pbXBvcnQgeyBSZWRQYWNrU3RhdGUgfSBmcm9tIFwiLi9XbmRTcHJlYWRHaWZ0QWN0aXZpdHlWaWV3XCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByZWFkR2lmdEl0ZW1WaWV3IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLk5vZGVdKVxyXG4gICAgbm9kZUFycjogY2MuTm9kZVtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBsaWdodE5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGFjaGlldmVkTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBub3JtYWxMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwZXJzb25OdW1MYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgYWNoaWV2ZWRQZXJzb25OdW1MYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIFJlZnJlc2hTdGF0ZShzdGF0ZTogUmVkUGFja1N0YXRlLCBkYXRhKSB7XHJcbiAgICAgICAgbGV0IGJ0biA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKVxyXG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSBSZWRQYWNrU3RhdGUuTm9ybWFsOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlQXJyWzBdLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZUFyclsxXS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5saWdodE5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMubm9ybWFsTGFiZWwuc3RyaW5nID0gY2MuanMuZm9ybWF0U3RyKFwiJXPlhYNcIiwgR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoZGF0YS5wb2ludCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjaGlldmVkTGFiZWwuc3RyaW5nID0gY2MuanMuZm9ybWF0U3RyKFwiJXPlhYNcIiwgR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoZGF0YS5wb2ludCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlcnNvbk51bUxhYmVsLnN0cmluZyA9IGNjLmpzLmZvcm1hdFN0cihcIiVz5Lq6XCIsIGRhdGEubnVtKVxyXG4gICAgICAgICAgICAgICAgdGhpcy4gYWNoaWV2ZWRQZXJzb25OdW1MYWJlbC5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIoXCIlc+S6ulwiLCBkYXRhLm51bSlcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYnRuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLmludGVyYWN0YWJsZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBSZWRQYWNrU3RhdGUuSGlnaHRMaWdodDpcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZUFyclswXS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVBcnJbMV0uYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMubGlnaHROb2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMubm9ybWFsTGFiZWwuc3RyaW5nID0gY2MuanMuZm9ybWF0U3RyKFwiJXPlhYNcIiwgR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoZGF0YS5wb2ludCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjaGlldmVkTGFiZWwuc3RyaW5nID0gY2MuanMuZm9ybWF0U3RyKFwiJXPlhYNcIiwgR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoZGF0YS5wb2ludCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlcnNvbk51bUxhYmVsLnN0cmluZyA9IGNjLmpzLmZvcm1hdFN0cihcIiVz5Lq6XCIsIGRhdGEubnVtKVxyXG4gICAgICAgICAgICAgICAgdGhpcy4gYWNoaWV2ZWRQZXJzb25OdW1MYWJlbC5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIoXCIlc+S6ulwiLCBkYXRhLm51bSlcclxuICAgICAgICAgICAgICAgIGlmIChidG4pIHtcclxuICAgICAgICAgICAgICAgICAgICBidG4uaW50ZXJhY3RhYmxlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmVkUGFja1N0YXRlLk9wZW46XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVBcnJbMF0uYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZUFyclsxXS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpZ2h0Tm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgaWYgKGJ0bikge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5pbnRlcmFjdGFibGUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG5cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==