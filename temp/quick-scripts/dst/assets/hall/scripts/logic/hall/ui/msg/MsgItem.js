
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/msg/MsgItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e418bDKoyNJJavCNPOZXILN', 'MsgItem');
// hall/scripts/logic/hall/ui/msg/MsgItem.ts

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
var MsgItem = /** @class */ (function (_super) {
    __extends(MsgItem, _super);
    function MsgItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BackgroundTxt = null;
        _this.BackgroundTxt1 = null;
        _this.CheckTxt = null;
        _this.CheckTxt1 = null;
        _this.Unread = null;
        _this.CheckSprite = null;
        _this.UnCheckSprite = null;
        _this.toggle = null;
        _this.maxCharCount = 6;
        _this.ColorStr1 = "<outline color=#445cb5 width=2><b>%s</b></outline>"; //back1
        _this.ColorStr2 = "<outline color=#6C3DD8 width=2><b>%s</b></outline>";
        _this.CheckColorStr1 = "<outline color=#B94E00 width= 1>%s</outline>";
        _this.CheckColorStr2 = "<outline color=#D74D23 width=2><b>%s</b></outline>";
        return _this;
    }
    MsgItem.prototype.onLoad = function () {
        this.bgFontSize = this.BackgroundTxt.fontSize;
        this.checkFontSize = this.CheckTxt.fontSize;
        //紫色是两个文本叠加效果
        if (Global.Setting.SkinConfig.isPurple) {
            this.bg1FontSize = this.BackgroundTxt1.fontSize;
            this.check1FontSize = this.CheckTxt1.fontSize;
        }
    };
    MsgItem.prototype.close = function () {
        this.node.active = false;
    };
    // update (dt) {}
    MsgItem.prototype.getGameData = function () {
        return this.gameData;
    };
    MsgItem.prototype.onInit = function (data) {
        this.gameData = data;
        this.initView();
    };
    MsgItem.prototype.initView = function () {
        this.BackgroundTxt.fontSize = this.bgFontSize;
        this.CheckTxt.fontSize = this.checkFontSize;
        if (Global.Setting.SkinConfig.isPurple) {
            this.CheckTxt1.fontSize = this.check1FontSize;
            this.BackgroundTxt1.fontSize = this.bg1FontSize;
            this.BackgroundTxt.string = cc.js.formatStr(this.ColorStr1, Global.Toolkit.removeEmoji(this.gameData.title));
            this.BackgroundTxt1.string = cc.js.formatStr(this.ColorStr2, Global.Toolkit.removeEmoji(this.gameData.title));
            this.CheckTxt.string = cc.js.formatStr(this.CheckColorStr1, Global.Toolkit.removeEmoji(this.gameData.title));
            this.CheckTxt1.string = cc.js.formatStr(this.CheckColorStr2, Global.Toolkit.removeEmoji(this.gameData.title));
        }
        else if (Global.Setting.SkinConfig.isBlue) {
            this.BackgroundTxt.string = this.gameData.title;
            this.CheckTxt.string = this.gameData.title;
        }
        else {
            this.BackgroundTxt.string = Global.Toolkit.removeEmoji(this.gameData.title);
            this.CheckTxt.string = Global.Toolkit.removeEmoji(this.gameData.title);
        }
        this.toggle.isChecked = false;
        this.toggle.uncheck();
        this.SetUnReadActiveState(this.gameData.red_status === 0);
        // if(this.gameData.title.length > 6)
        // {
        //     Global.Component.frameEnd(()=>{
        //         if(!this.node.isValid)
        //             return;
        //         this.adjustLabelLength(this.BackgroundTxt, this.bgFontSize) 
        //         this.adjustLabelLength(this.CheckTxt, this.checkFontSize) 
        //         this.adjustLabelLength(this.BackgroundTxt1, this.bg1FontSize) 
        //         this.adjustLabelLength(this.CheckTxt1, this.check1FontSize) 
        //     })
        // }
    };
    MsgItem.prototype.adjustLabelLength = function (label, fontSize) {
        if (label == null)
            return;
        var maxLength = fontSize * this.maxCharCount;
        if (label.node.width <= maxLength)
            return;
        label.fontSize = Math.floor(maxLength / label.node.width * fontSize);
    };
    MsgItem.prototype.SetBackgroundChecked = function (state) {
        this.CheckSprite.node.active = state;
        this.UnCheckSprite.node.active = !state;
    };
    MsgItem.prototype.SetToggleChecked = function () {
        this.toggle.isChecked = true;
        this.toggle.check();
    };
    MsgItem.prototype.SetUnReadActiveState = function (state) {
        this.Unread.node.active = state;
    };
    __decorate([
        property(cc.Label)
    ], MsgItem.prototype, "BackgroundTxt", void 0);
    __decorate([
        property(cc.Label)
    ], MsgItem.prototype, "BackgroundTxt1", void 0);
    __decorate([
        property(cc.Label)
    ], MsgItem.prototype, "CheckTxt", void 0);
    __decorate([
        property(cc.Label)
    ], MsgItem.prototype, "CheckTxt1", void 0);
    __decorate([
        property(cc.Sprite)
    ], MsgItem.prototype, "Unread", void 0);
    __decorate([
        property(cc.Sprite)
    ], MsgItem.prototype, "CheckSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], MsgItem.prototype, "UnCheckSprite", void 0);
    __decorate([
        property(cc.Toggle)
    ], MsgItem.prototype, "toggle", void 0);
    MsgItem = __decorate([
        ccclass
    ], MsgItem);
    return MsgItem;
}(cc.Component));
exports.default = MsgItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtc2dcXE1zZ0l0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQixrRkFBa0Y7QUFDbEYseUZBQXlGO0FBQ3pGLG1CQUFtQjtBQUNuQiw0RkFBNEY7QUFDNUYsbUdBQW1HO0FBQ25HLDhCQUE4QjtBQUM5Qiw0RkFBNEY7QUFDNUYsbUdBQW1HOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFN0YsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBcUMsMkJBQVk7SUFBakQ7UUFBQSxxRUE0SEM7UUF6SEcsbUJBQWEsR0FBYSxJQUFJLENBQUM7UUFFL0Isb0JBQWMsR0FBYSxJQUFJLENBQUM7UUFHaEMsY0FBUSxHQUFhLElBQUksQ0FBQztRQUUxQixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLFlBQU0sR0FBYyxJQUFJLENBQUM7UUFFekIsaUJBQVcsR0FBYyxJQUFJLENBQUM7UUFFOUIsbUJBQWEsR0FBYyxJQUFJLENBQUM7UUFFaEMsWUFBTSxHQUFjLElBQUksQ0FBQztRQU9qQixrQkFBWSxHQUFHLENBQUMsQ0FBQztRQUV6QixlQUFTLEdBQUcsb0RBQW9ELENBQUEsQ0FBQyxPQUFPO1FBQ3hFLGVBQVMsR0FBRyxvREFBb0QsQ0FBQTtRQUNoRSxvQkFBYyxHQUFHLDhDQUE4QyxDQUFBO1FBQy9ELG9CQUFjLEdBQUcsb0RBQW9ELENBQUE7O0lBNkZ6RSxDQUFDO0lBMUZHLHdCQUFNLEdBQU47UUFFSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1FBQzlDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUU7UUFDN0MsYUFBYTtRQUNiLElBQUcsTUFBTSxDQUFDLE9B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QVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2tEQUNZO0lBRS9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7bURBQ2E7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs2Q0FDTztJQUUxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzhDQUNRO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MkNBQ0s7SUFFekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnREFDVTtJQUU5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2tEQUNZO0lBRWhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MkNBQ0s7SUFuQlIsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQTRIM0I7SUFBRCxjQUFDO0NBNUhELEFBNEhDLENBNUhvQyxFQUFFLENBQUMsU0FBUyxHQTRIaEQ7a0JBNUhvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1zZ0l0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIEJhY2tncm91bmRUeHQ6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIEJhY2tncm91bmRUeHQxOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgQ2hlY2tUeHQ6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIENoZWNrVHh0MTogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBVbnJlYWQ6IGNjLlNwcml0ZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgQ2hlY2tTcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgVW5DaGVja1Nwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ub2dnbGUpXHJcbiAgICB0b2dnbGU6IGNjLlRvZ2dsZSA9IG51bGw7XHJcbiAgICBnYW1lRGF0YTogYW55O1xyXG5cclxuICAgIHByaXZhdGUgYmdGb250U2l6ZTtcclxuICAgIHByaXZhdGUgYmcxRm9udFNpemU7XHJcbiAgICBwcml2YXRlIGNoZWNrRm9udFNpemU7XHJcbiAgICBwcml2YXRlIGNoZWNrMUZvbnRTaXplO1xyXG4gICAgcHJpdmF0ZSBtYXhDaGFyQ291bnQgPSA2O1xyXG5cclxuICAgIENvbG9yU3RyMSA9IFwiPG91dGxpbmUgY29sb3I9IzQ0NWNiNSB3aWR0aD0yPjxiPiVzPC9iPjwvb3V0bGluZT5cIiAvL2JhY2sxXHJcbiAgICBDb2xvclN0cjIgPSBcIjxvdXRsaW5lIGNvbG9yPSM2QzNERDggd2lkdGg9Mj48Yj4lczwvYj48L291dGxpbmU+XCJcclxuICAgIENoZWNrQ29sb3JTdHIxID0gXCI8b3V0bGluZSBjb2xvcj0jQjk0RTAwIHdpZHRoPSAxPiVzPC9vdXRsaW5lPlwiXHJcbiAgICBDaGVja0NvbG9yU3RyMiA9IFwiPG91dGxpbmUgY29sb3I9I0Q3NEQyMyB3aWR0aD0yPjxiPiVzPC9iPjwvb3V0bGluZT5cIlxyXG5cclxuXHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYmdGb250U2l6ZSA9IHRoaXMuQmFja2dyb3VuZFR4dC5mb250U2l6ZTtcclxuICAgICAgICB0aGlzLmNoZWNrRm9udFNpemUgPSB0aGlzLkNoZWNrVHh0LmZvbnRTaXplIDtcclxuICAgICAgICAvL+e0q+iJsuaYr+S4pOS4quaWh+acrOWPoOWKoOaViOaenFxyXG4gICAgICAgIGlmKEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcuaXNQdXJwbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmJnMUZvbnRTaXplID0gdGhpcy5CYWNrZ3JvdW5kVHh0MS5mb250U2l6ZSA7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2sxRm9udFNpemUgPSB0aGlzLkNoZWNrVHh0MS5mb250U2l6ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgfVxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxuICAgIHB1YmxpYyBnZXRHYW1lRGF0YSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nYW1lRGF0YTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBvbkluaXQoZGF0YTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5nYW1lRGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5pbml0VmlldygpXHJcbiAgICB9XHJcbiAgICBpbml0VmlldygpIHtcclxuXHJcbiAgICAgICAgdGhpcy5CYWNrZ3JvdW5kVHh0LmZvbnRTaXplID0gdGhpcy5iZ0ZvbnRTaXplO1xyXG4gICAgICAgIHRoaXMuQ2hlY2tUeHQuZm9udFNpemUgPSB0aGlzLmNoZWNrRm9udFNpemU7XHJcblxyXG4gICAgICAgIGlmKEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcuaXNQdXJwbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkNoZWNrVHh0MS5mb250U2l6ZSA9IHRoaXMuY2hlY2sxRm9udFNpemU7XHJcbiAgICAgICAgICAgIHRoaXMuQmFja2dyb3VuZFR4dDEuZm9udFNpemUgPSB0aGlzLmJnMUZvbnRTaXplO1xyXG4gICAgICAgICAgICB0aGlzLkJhY2tncm91bmRUeHQuc3RyaW5nID0gIGNjLmpzLmZvcm1hdFN0cih0aGlzLkNvbG9yU3RyMSxHbG9iYWwuVG9vbGtpdC5yZW1vdmVFbW9qaSh0aGlzLmdhbWVEYXRhLnRpdGxlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuQmFja2dyb3VuZFR4dDEuc3RyaW5nID0gIGNjLmpzLmZvcm1hdFN0cih0aGlzLkNvbG9yU3RyMixHbG9iYWwuVG9vbGtpdC5yZW1vdmVFbW9qaSh0aGlzLmdhbWVEYXRhLnRpdGxlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hlY2tUeHQuc3RyaW5nID0gY2MuanMuZm9ybWF0U3RyKHRoaXMuQ2hlY2tDb2xvclN0cjEsR2xvYmFsLlRvb2xraXQucmVtb3ZlRW1vamkodGhpcy5nYW1lRGF0YS50aXRsZSkpO1xyXG4gICAgICAgICAgICB0aGlzLkNoZWNrVHh0MS5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIodGhpcy5DaGVja0NvbG9yU3RyMixHbG9iYWwuVG9vbGtpdC5yZW1vdmVFbW9qaSh0aGlzLmdhbWVEYXRhLnRpdGxlKSk7XHJcbiAgICAgICAgfWVsc2UgaWYoR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5pc0JsdWUpe1xyXG4gICAgICAgICAgICB0aGlzLkJhY2tncm91bmRUeHQuc3RyaW5nID0gIHRoaXMuZ2FtZURhdGEudGl0bGVcclxuICAgICAgICAgICAgdGhpcy5DaGVja1R4dC5zdHJpbmcgPSB0aGlzLmdhbWVEYXRhLnRpdGxlXHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQmFja2dyb3VuZFR4dC5zdHJpbmcgPSAgR2xvYmFsLlRvb2xraXQucmVtb3ZlRW1vamkodGhpcy5nYW1lRGF0YS50aXRsZSlcclxuICAgICAgICAgICAgdGhpcy5DaGVja1R4dC5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5yZW1vdmVFbW9qaSh0aGlzLmdhbWVEYXRhLnRpdGxlKVxyXG4gICAgICAgIH1cclxuIFxyXG5cclxuICAgICAgICB0aGlzLnRvZ2dsZS5pc0NoZWNrZWQgPWZhbHNlXHJcbiAgICAgICAgdGhpcy50b2dnbGUudW5jaGVjaygpXHJcbiAgICAgICAgdGhpcy5TZXRVblJlYWRBY3RpdmVTdGF0ZSh0aGlzLmdhbWVEYXRhLnJlZF9zdGF0dXMgPT09IDApXHJcblxyXG4gICAgICAgIC8vIGlmKHRoaXMuZ2FtZURhdGEudGl0bGUubGVuZ3RoID4gNilcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIEdsb2JhbC5Db21wb25lbnQuZnJhbWVFbmQoKCk9PntcclxuICAgICAgICAvLyAgICAgICAgIGlmKCF0aGlzLm5vZGUuaXNWYWxpZClcclxuICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmFkanVzdExhYmVsTGVuZ3RoKHRoaXMuQmFja2dyb3VuZFR4dCwgdGhpcy5iZ0ZvbnRTaXplKSBcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuYWRqdXN0TGFiZWxMZW5ndGgodGhpcy5DaGVja1R4dCwgdGhpcy5jaGVja0ZvbnRTaXplKSBcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuYWRqdXN0TGFiZWxMZW5ndGgodGhpcy5CYWNrZ3JvdW5kVHh0MSwgdGhpcy5iZzFGb250U2l6ZSkgXHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmFkanVzdExhYmVsTGVuZ3RoKHRoaXMuQ2hlY2tUeHQxLCB0aGlzLmNoZWNrMUZvbnRTaXplKSBcclxuICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGp1c3RMYWJlbExlbmd0aChsYWJlbCwgZm9udFNpemUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYobGFiZWwgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBtYXhMZW5ndGggPSBmb250U2l6ZSAqIHRoaXMubWF4Q2hhckNvdW50XHJcbiAgICAgICAgaWYobGFiZWwubm9kZS53aWR0aCA8PSBtYXhMZW5ndGgpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IE1hdGguZmxvb3IobWF4TGVuZ3RoIC8gbGFiZWwubm9kZS53aWR0aCAqIGZvbnRTaXplKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0QmFja2dyb3VuZENoZWNrZWQoc3RhdGU6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLkNoZWNrU3ByaXRlLm5vZGUuYWN0aXZlID0gc3RhdGVcclxuICAgICAgICB0aGlzLlVuQ2hlY2tTcHJpdGUubm9kZS5hY3RpdmUgPSAhc3RhdGVcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgU2V0VG9nZ2xlQ2hlY2tlZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50b2dnbGUuaXNDaGVja2VkID10cnVlXHJcbiAgICAgICAgdGhpcy50b2dnbGUuY2hlY2soKVxyXG4gICAgICBcclxuICAgIH1cclxuICAgIHB1YmxpYyBTZXRVblJlYWRBY3RpdmVTdGF0ZShzdGF0ZTpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVW5yZWFkLm5vZGUuYWN0aXZlID0gc3RhdGVcclxuICAgIH1cclxufVxyXG4iXX0=