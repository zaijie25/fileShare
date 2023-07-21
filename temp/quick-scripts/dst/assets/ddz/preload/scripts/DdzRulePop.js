
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/preload/scripts/DdzRulePop.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f1ccee1biZC/Jf0CI98fajQ', 'DdzRulePop');
// ddz/preload/scripts/DdzRulePop.ts

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
var DdzRulePop = /** @class */ (function (_super) {
    __extends(DdzRulePop, _super);
    function DdzRulePop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzRulePop.prototype.onLoad = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.sv = cc.find("centerNode/scrollView", this.node).getComponent(cc.ScrollView);
        Global.UIHelper.addCommonClick(this.node, "centerNode/close", this.closeWnd, this, cc.Button.Transition.SCALE, null, false);
        Global.UIHelper.addCommonClick(this.node, "mask", this.closeWnd, this, cc.Button.Transition.NONE, cc.Button.Transition.SCALE, false);
        this.animComp = Global.UIHelper.addAnimComp(this.node, cc.find("centerNode", this.node), cc.find("mask", this.node));
    };
    DdzRulePop.prototype.onEnable = function () {
        this.sv.scrollToTop(0);
        this.animComp.doPopupOpenAnim();
    };
    DdzRulePop.prototype.closeWnd = function () {
        var _this = this;
        Global.Audio.playBtnSound();
        this.animComp.doPopupCloseAnim(function () {
            _this.node.active = false;
        });
    };
    DdzRulePop = __decorate([
        ccclass
    ], DdzRulePop);
    return DdzRulePop;
}(cc.Component));
exports.default = DdzRulePop;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxwcmVsb2FkXFxzY3JpcHRzXFxEZHpSdWxlUG9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXdDLDhCQUFZO0lBQXBEOztJQXdCQSxDQUFDO0lBcEJhLDJCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2xELElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRixNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDNUgsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNySSxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3pILENBQUM7SUFFUyw2QkFBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVPLDZCQUFRLEdBQWhCO1FBQUEsaUJBS0M7UUFKRyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7WUFDM0IsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXZCZ0IsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQXdCOUI7SUFBRCxpQkFBQztDQXhCRCxBQXdCQyxDQXhCdUMsRUFBRSxDQUFDLFNBQVMsR0F3Qm5EO2tCQXhCb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGR6UnVsZVBvcCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBwcml2YXRlIHN2OiBjYy5TY3JvbGxWaWV3O1xyXG4gICAgcHJpdmF0ZSBhbmltQ29tcDogYW55O1xyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLndpZHRoID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUud2lkdGg7XHJcbiAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLmhlaWdodDtcclxuICAgICAgICB0aGlzLnN2ID0gY2MuZmluZChcImNlbnRlck5vZGUvc2Nyb2xsVmlld1wiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KTtcclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcImNlbnRlck5vZGUvY2xvc2VcIiwgdGhpcy5jbG9zZVduZCwgdGhpcywgY2MuQnV0dG9uLlRyYW5zaXRpb24uU0NBTEUsIG51bGwsIGZhbHNlKTtcclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcIm1hc2tcIiwgdGhpcy5jbG9zZVduZCwgdGhpcywgY2MuQnV0dG9uLlRyYW5zaXRpb24uTk9ORSwgY2MuQnV0dG9uLlRyYW5zaXRpb24uU0NBTEUsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLmFuaW1Db21wID0gR2xvYmFsLlVJSGVscGVyLmFkZEFuaW1Db21wKHRoaXMubm9kZSwgY2MuZmluZChcImNlbnRlck5vZGVcIiwgdGhpcy5ub2RlKSwgY2MuZmluZChcIm1hc2tcIiwgdGhpcy5ub2RlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCl7XHJcbiAgICAgICAgdGhpcy5zdi5zY3JvbGxUb1RvcCgwKTtcclxuICAgICAgICB0aGlzLmFuaW1Db21wLmRvUG9wdXBPcGVuQW5pbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xvc2VXbmQoKXtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUJ0blNvdW5kKCk7XHJcbiAgICAgICAgdGhpcy5hbmltQ29tcC5kb1BvcHVwQ2xvc2VBbmltKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=