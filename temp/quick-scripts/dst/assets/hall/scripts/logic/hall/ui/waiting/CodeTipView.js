
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/waiting/CodeTipView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '028a3xlLWJN7ZlE5R7qsI+P', 'CodeTipView');
// hall/scripts/logic/hall/ui/waiting/CodeTipView.ts

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
//游戏列表item
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CodeTipView = /** @class */ (function (_super) {
    __extends(CodeTipView, _super);
    function CodeTipView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.circle = null;
        _this.tips = null;
        _this.isTounch = true;
        return _this;
    }
    CodeTipView_1 = CodeTipView;
    CodeTipView.prototype.onLoad = function () {
        CodeTipView_1.instance = this;
        Global.UIHelper.addCommonClick(this.node, "bgNode", this.callback, this);
        this.action = cc.rotateTo(5, 360 * 5);
        // this.action.easing(); //停止状态 慢 - 快 - 慢
        this.circle.runAction(this.action);
    };
    CodeTipView.prototype.onDestroy = function () {
        CodeTipView_1.instance = null;
    };
    CodeTipView.prototype.callback = function () {
        if (this.isTounch) {
            this.isTounch = false;
            this.start();
            this.tips.string = "正在获取";
            this.SpreadModel = Global.ModelManager.getModel("SpreadModel");
            this.SpreadModel.loadShortUrl(Global.Setting.Urls.inviteUrl);
        }
    };
    CodeTipView.prototype.start = function () {
        this.circle.runAction(this.action);
        this.node.active = true;
    };
    CodeTipView.prototype.success = function () {
        this.isTounch = true;
        this.circle.stopAction(this.action);
        this.node.active = false;
    };
    CodeTipView.prototype.error = function () {
        this.isTounch = true;
        this.node.active = true;
        this.tips.string = "获取失败,请重试";
        this.circle.stopAction(this.action);
    };
    var CodeTipView_1;
    /**
 * 单例对象
 */
    CodeTipView.instance = null;
    __decorate([
        property(cc.Node)
    ], CodeTipView.prototype, "circle", void 0);
    __decorate([
        property(cc.Label)
    ], CodeTipView.prototype, "tips", void 0);
    CodeTipView = CodeTipView_1 = __decorate([
        ccclass
    ], CodeTipView);
    return CodeTipView;
}(cc.Component));
exports.default = CodeTipView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFx3YWl0aW5nXFxDb2RlVGlwVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxVQUFVO0FBQ0osSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUFxREM7UUFuREcsWUFBTSxHQUFZLElBQUksQ0FBQztRQUV2QixVQUFJLEdBQWEsSUFBSSxDQUFDO1FBRWQsY0FBUSxHQUFHLElBQUksQ0FBQzs7SUErQzVCLENBQUM7b0JBckRvQixXQUFXO0lBWTVCLDRCQUFNLEdBQU47UUFFSSxhQUFXLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUM1QixNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLHlDQUF5QztRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELCtCQUFTLEdBQVQ7UUFDSSxhQUFXLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUNoQyxDQUFDO0lBRVMsOEJBQVEsR0FBbEI7UUFDSSxJQUFHLElBQUksQ0FBQyxRQUFRLEVBQUM7WUFDYixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBZ0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDNUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7U0FDL0Q7SUFDTCxDQUFDO0lBRVMsMkJBQUssR0FBZjtRQUVJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUNNLDZCQUFPLEdBQWQ7UUFFSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFDTSwyQkFBSyxHQUFaO1FBRUksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztRQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7SUE1Q0c7O0dBRUQ7SUFDSSxvQkFBUSxHQUFlLElBQUksQ0FBQztJQVRuQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNLO0lBRXZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NkNBQ0c7SUFKTCxXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBcUQvQjtJQUFELGtCQUFDO0NBckRELEFBcURDLENBckR3QyxFQUFFLENBQUMsU0FBUyxHQXFEcEQ7a0JBckRvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNwcmVhZE1vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1NwcmVhZE1vZGVsXCI7XHJcbmltcG9ydCBBcHBIZWxwZXIgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdG9vbC9BcHBIZWxwZXJcIjtcclxuXHJcblxyXG4vL+a4uOaIj+WIl+ihqGl0ZW1cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2RlVGlwVmlldyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGNpcmNsZSA6Y2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICB0aXBzIDpjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIGFjdGlvbjtcclxuICAgIHByaXZhdGUgaXNUb3VuY2ggPSB0cnVlO1xyXG4gICAgU3ByZWFkTW9kZWw6IFNwcmVhZE1vZGVsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICog5Y2V5L6L5a+56LGhXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpbnN0YW5jZTpDb2RlVGlwVmlldyA9IG51bGw7XHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIENvZGVUaXBWaWV3Lmluc3RhbmNlID0gdGhpcztcclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcImJnTm9kZVwiLCB0aGlzLmNhbGxiYWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmFjdGlvbiA9IGNjLnJvdGF0ZVRvKDUsIDM2MCAqIDUpO1xyXG4gICAgICAgIC8vIHRoaXMuYWN0aW9uLmVhc2luZygpOyAvL+WBnOatoueKtuaAgSDmhaIgLSDlv6sgLSDmhaJcclxuICAgICAgICB0aGlzLmNpcmNsZS5ydW5BY3Rpb24odGhpcy5hY3Rpb24pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbkRlc3Ryb3koKXtcclxuICAgICAgICBDb2RlVGlwVmlldy5pbnN0YW5jZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNhbGxiYWNrKCl7XHJcbiAgICAgICAgaWYodGhpcy5pc1RvdW5jaCl7XHJcbiAgICAgICAgICAgIHRoaXMuaXNUb3VuY2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xyXG4gICAgICAgICAgICB0aGlzLnRpcHMuc3RyaW5nID0gXCLmraPlnKjojrflj5ZcIjtcclxuICAgICAgICAgICAgdGhpcy5TcHJlYWRNb2RlbCA9IDxTcHJlYWRNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiU3ByZWFkTW9kZWxcIik7XHJcbiAgICAgICAgICAgIHRoaXMuU3ByZWFkTW9kZWwubG9hZFNob3J0VXJsKEdsb2JhbC5TZXR0aW5nLlVybHMuaW52aXRlVXJsKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2lyY2xlLnJ1bkFjdGlvbih0aGlzLmFjdGlvbik7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3VjY2VzcygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pc1RvdW5jaCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jaXJjbGUuc3RvcEFjdGlvbih0aGlzLmFjdGlvbik7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGVycm9yKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmlzVG91bmNoID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnRpcHMuc3RyaW5nID0gXCLojrflj5blpLHotKUs6K+36YeN6K+VXCI7XHJcbiAgICAgICAgdGhpcy5jaXJjbGUuc3RvcEFjdGlvbih0aGlzLmFjdGlvbik7XHJcbiAgICB9XHJcbn1cclxuIl19