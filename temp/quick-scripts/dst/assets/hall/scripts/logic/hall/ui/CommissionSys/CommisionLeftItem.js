
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/CommissionSys/CommisionLeftItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ebeabdRIjpOWbl+F0P5eV8T', 'CommisionLeftItem');
// hall/scripts/logic/hall/ui/CommissionSys/CommisionLeftItem.ts

"use strict";
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
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
var CommisionLeftItem = /** @class */ (function (_super) {
    __extends(CommisionLeftItem, _super);
    function CommisionLeftItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BackgroundTxt = null;
        _this.CheckTxt = null;
        _this.CheckSprite = null;
        _this.UnCheckSprite = null;
        _this.toggle = null;
        _this.Unread = null;
        _this.maxCharCount = 6;
        _this.atlasPath = "hall/texture/CommisionIcon/CommisionIcon";
        return _this;
    }
    CommisionLeftItem.prototype.onLoad = function () {
        this.bgFontSize = this.BackgroundTxt.fontSize;
        this.checkFontSize = this.CheckTxt.fontSize;
    };
    CommisionLeftItem.prototype.close = function () {
        this.node.active = false;
    };
    // update (dt) {}
    CommisionLeftItem.prototype.getData = function () {
        return this.data;
    };
    CommisionLeftItem.prototype.onInit = function (data) {
        this.data = data;
        this.initView();
    };
    CommisionLeftItem.prototype.initView = function () {
        // this.BackgroundTxt.fontSize = this.bgFontSize;
        // this.CheckTxt.fontSize = this.checkFontSize;
        this.BackgroundTxt.string = Global.Toolkit.removeEmoji(this.data.name);
        this.CheckTxt.string = Global.Toolkit.removeEmoji(this.data.name);
        // this.changeBtnSprite(this.BackGroundSprite,this.ClickSprite,this.data.global_task_type);
        this.SetUnReadActiveState(this.data.task_num > 0);
        this.toggle.isChecked = false;
        this.toggle.uncheck();
    };
    CommisionLeftItem.prototype.SetUnReadActiveState = function (state) {
        this.Unread.active = state;
    };
    CommisionLeftItem.prototype.adjustLabelLength = function (label, fontSize) {
        if (label == null)
            return;
        var maxLength = fontSize * this.maxCharCount;
        if (label.node.width <= maxLength)
            return;
        label.fontSize = Math.floor(maxLength / label.node.width * fontSize);
    };
    CommisionLeftItem.prototype.SetBackgroundChecked = function (state) {
        this.CheckSprite.node.active = state;
        this.UnCheckSprite.node.active = !state;
    };
    CommisionLeftItem.prototype.SetToggleChecked = function () {
        this.toggle.isChecked = true;
        this.toggle.check();
    };
    CommisionLeftItem.prototype.changeBtnSprite = function (bsp, csp, taskType) {
        Global.ResourceManager.loadAutoAtlas(bsp, this.atlasPath, "btn_" + taskType + "_b", null, false);
        Global.ResourceManager.loadAutoAtlas(csp, this.atlasPath, "btn_" + taskType + "_t", null, false);
    };
    __decorate([
        property(cc.Label)
    ], CommisionLeftItem.prototype, "BackgroundTxt", void 0);
    __decorate([
        property(cc.Label)
    ], CommisionLeftItem.prototype, "CheckTxt", void 0);
    __decorate([
        property(cc.Sprite)
    ], CommisionLeftItem.prototype, "CheckSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], CommisionLeftItem.prototype, "UnCheckSprite", void 0);
    __decorate([
        property(cc.Toggle)
    ], CommisionLeftItem.prototype, "toggle", void 0);
    __decorate([
        property(cc.Node)
    ], CommisionLeftItem.prototype, "Unread", void 0);
    CommisionLeftItem = __decorate([
        ccclass
    ], CommisionLeftItem);
    return CommisionLeftItem;
}(cc.Component));
exports.default = CommisionLeftItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxDb21taXNzaW9uU3lzXFxDb21taXNpb25MZWZ0SXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLGtGQUFrRjtBQUNsRix5RkFBeUY7QUFDekYsbUJBQW1CO0FBQ25CLDRGQUE0RjtBQUM1RixtR0FBbUc7QUFDbkcsOEJBQThCO0FBQzlCLDRGQUE0RjtBQUM1RixtR0FBbUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU3RixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUErQyxxQ0FBWTtJQUEzRDtRQUFBLHFFQW9HQztRQWpHRyxtQkFBYSxHQUFhLElBQUksQ0FBQztRQUkvQixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBRTlCLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBRWhDLFlBQU0sR0FBYyxJQUFJLENBQUM7UUFHekIsWUFBTSxHQUFZLElBQUksQ0FBQztRQVlmLGtCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLGVBQVMsR0FBRywwQ0FBMEMsQ0FBQzs7SUFxRW5FLENBQUM7SUFuRUcsa0NBQU0sR0FBTjtRQUVJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFDOUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBRTtJQUVqRCxDQUFDO0lBRUQsaUNBQUssR0FBTDtRQUVJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtJQUM1QixDQUFDO0lBQ0QsaUJBQWlCO0lBQ1YsbUNBQU8sR0FBZDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBQ00sa0NBQU0sR0FBYixVQUFjLElBQVM7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQ25CLENBQUM7SUFDRCxvQ0FBUSxHQUFSO1FBQ0ksaURBQWlEO1FBQ2pELCtDQUErQztRQUUvQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3ZFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakUsMkZBQTJGO1FBRTNGLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRSxLQUFLLENBQUE7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUd6QixDQUFDO0lBRU0sZ0RBQW9CLEdBQTNCLFVBQTRCLEtBQWE7UUFFckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO0lBQzlCLENBQUM7SUFFTyw2Q0FBaUIsR0FBekIsVUFBMEIsS0FBSyxFQUFFLFFBQVE7UUFFckMsSUFBRyxLQUFLLElBQUksSUFBSTtZQUNaLE9BQU87UUFDWCxJQUFJLFNBQVMsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQTtRQUM1QyxJQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVM7WUFDNUIsT0FBTztRQUNYLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVNLGdEQUFvQixHQUEzQixVQUE0QixLQUFhO1FBRXJDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7UUFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFBO0lBRTNDLENBQUM7SUFDTSw0Q0FBZ0IsR0FBdkI7UUFFSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRSxJQUFJLENBQUE7UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUV2QixDQUFDO0lBRU8sMkNBQWUsR0FBdkIsVUFBd0IsR0FBYSxFQUFDLEdBQWEsRUFBQyxRQUFlO1FBQy9ELE1BQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQU8sUUFBUSxPQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVGLE1BQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQU8sUUFBUSxPQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hHLENBQUM7SUEvRkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs0REFDWTtJQUkvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3VEQUNPO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MERBQ1U7SUFFOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs0REFDWTtJQUVoQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3FEQUNLO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ0s7SUFqQk4saUJBQWlCO1FBRHJDLE9BQU87T0FDYSxpQkFBaUIsQ0FvR3JDO0lBQUQsd0JBQUM7Q0FwR0QsQUFvR0MsQ0FwRzhDLEVBQUUsQ0FBQyxTQUFTLEdBb0cxRDtrQkFwR29CLGlCQUFpQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21taXNpb25MZWZ0SXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgQmFja2dyb3VuZFR4dDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICBcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBDaGVja1R4dDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICBcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBDaGVja1Nwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBVbkNoZWNrU3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlRvZ2dsZSlcclxuICAgIHRvZ2dsZTogY2MuVG9nZ2xlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFVucmVhZDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgZGF0YTogYW55O1xyXG5cclxuICAgIC8vIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICAvLyBCYWNrR3JvdW5kU3ByaXRlOmNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgLy8gQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIC8vIENsaWNrU3ByaXRlOmNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBiZ0ZvbnRTaXplO1xyXG4gICAgcHJpdmF0ZSBjaGVja0ZvbnRTaXplO1xyXG4gICAgcHJpdmF0ZSBtYXhDaGFyQ291bnQgPSA2O1xyXG5cclxuICAgIHByaXZhdGUgYXRsYXNQYXRoID0gXCJoYWxsL3RleHR1cmUvQ29tbWlzaW9uSWNvbi9Db21taXNpb25JY29uXCI7XHJcblxyXG4gICAgb25Mb2FkKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmJnRm9udFNpemUgPSB0aGlzLkJhY2tncm91bmRUeHQuZm9udFNpemU7XHJcbiAgICAgICAgdGhpcy5jaGVja0ZvbnRTaXplID0gdGhpcy5DaGVja1R4dC5mb250U2l6ZSA7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgfVxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxuICAgIHB1YmxpYyBnZXREYXRhKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGE7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb25Jbml0KGRhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5pbml0VmlldygpXHJcbiAgICB9XHJcbiAgICBpbml0VmlldygpIHtcclxuICAgICAgICAvLyB0aGlzLkJhY2tncm91bmRUeHQuZm9udFNpemUgPSB0aGlzLmJnRm9udFNpemU7XHJcbiAgICAgICAgLy8gdGhpcy5DaGVja1R4dC5mb250U2l6ZSA9IHRoaXMuY2hlY2tGb250U2l6ZTtcclxuXHJcbiAgICAgICAgdGhpcy5CYWNrZ3JvdW5kVHh0LnN0cmluZyA9ICBHbG9iYWwuVG9vbGtpdC5yZW1vdmVFbW9qaSh0aGlzLmRhdGEubmFtZSlcclxuICAgICAgICB0aGlzLkNoZWNrVHh0LnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LnJlbW92ZUVtb2ppKHRoaXMuZGF0YS5uYW1lKVxyXG4gICAgICAgIC8vIHRoaXMuY2hhbmdlQnRuU3ByaXRlKHRoaXMuQmFja0dyb3VuZFNwcml0ZSx0aGlzLkNsaWNrU3ByaXRlLHRoaXMuZGF0YS5nbG9iYWxfdGFza190eXBlKTtcclxuIFxyXG4gICAgICAgIHRoaXMuU2V0VW5SZWFkQWN0aXZlU3RhdGUodGhpcy5kYXRhLnRhc2tfbnVtID4gMClcclxuICAgICAgICB0aGlzLnRvZ2dsZS5pc0NoZWNrZWQgPWZhbHNlXHJcbiAgICAgICAgdGhpcy50b2dnbGUudW5jaGVjaygpXHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTZXRVblJlYWRBY3RpdmVTdGF0ZShzdGF0ZTpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVW5yZWFkLmFjdGl2ZSA9IHN0YXRlXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGp1c3RMYWJlbExlbmd0aChsYWJlbCwgZm9udFNpemUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYobGFiZWwgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBtYXhMZW5ndGggPSBmb250U2l6ZSAqIHRoaXMubWF4Q2hhckNvdW50XHJcbiAgICAgICAgaWYobGFiZWwubm9kZS53aWR0aCA8PSBtYXhMZW5ndGgpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IE1hdGguZmxvb3IobWF4TGVuZ3RoIC8gbGFiZWwubm9kZS53aWR0aCAqIGZvbnRTaXplKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0QmFja2dyb3VuZENoZWNrZWQoc3RhdGU6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLkNoZWNrU3ByaXRlLm5vZGUuYWN0aXZlID0gc3RhdGVcclxuICAgICAgICB0aGlzLlVuQ2hlY2tTcHJpdGUubm9kZS5hY3RpdmUgPSAhc3RhdGVcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgU2V0VG9nZ2xlQ2hlY2tlZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50b2dnbGUuaXNDaGVja2VkID10cnVlXHJcbiAgICAgICAgdGhpcy50b2dnbGUuY2hlY2soKVxyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoYW5nZUJ0blNwcml0ZShic3A6Y2MuU3ByaXRlLGNzcDpjYy5TcHJpdGUsdGFza1R5cGU6bnVtYmVyKSB7XHJcbiAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKGJzcCwgdGhpcy5hdGxhc1BhdGgsIGBidG5fJHt0YXNrVHlwZX1fYmAsIG51bGwsIGZhbHNlKTtcclxuICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRBdXRvQXRsYXMoY3NwLCB0aGlzLmF0bGFzUGF0aCwgYGJ0bl8ke3Rhc2tUeXBlfV90YCwgbnVsbCwgZmFsc2UpO1xyXG4gICAgfVxyXG4gICBcclxufVxyXG4iXX0=