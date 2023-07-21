
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/component/ErmjRubMjAnim.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '37be1zMxrNHp5yT36H8ca3a', 'ErmjRubMjAnim');
// ermj/Ermj/scripts/component/ErmjRubMjAnim.ts

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
var ErmjPathHelper_1 = require("../data/ErmjPathHelper");
var ErmjMjStyleHelper_1 = require("../tool/ErmjMjStyleHelper");
var ErmjGameConst_1 = require("../data/ErmjGameConst");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ErmjRubMjAnim = /** @class */ (function (_super) {
    __extends(ErmjRubMjAnim, _super);
    function ErmjRubMjAnim() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mjFrontSp = null;
        return _this;
    }
    ErmjRubMjAnim.prototype.onLoad = function () {
        this.effectSk1 = cc.find("content/effect1", this.node).getComponent(sp.Skeleton);
        this.effectSk1.node.active = false;
        this.effectSk2 = cc.find("content/effect2", this.node).getComponent(sp.Skeleton);
        this.effectSk2.node.active = false;
    };
    ErmjRubMjAnim.prototype.doRubAnim = function (value) {
        Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.mjFrontSp, ErmjPathHelper_1.default.gameTexturePath + "mahjong/atlas_mahjong", ErmjMjStyleHelper_1.default.mjHandMap[value], null, true);
        this.effectSk1.node.active = true;
        this.effectSk2.node.active = true;
        this.effectSk1.setAnimation(0, "idle", false);
        this.effectSk2.setAnimation(0, "idle_shouzi", false);
    };
    ErmjRubMjAnim.prototype.onDisable = function () {
        this.effectSk1.clearTracks();
        this.effectSk2.clearTracks();
        this.effectSk1.node.active = false;
        this.effectSk2.node.active = false;
    };
    __decorate([
        property(cc.Sprite)
    ], ErmjRubMjAnim.prototype, "mjFrontSp", void 0);
    ErmjRubMjAnim = __decorate([
        ccclass
    ], ErmjRubMjAnim);
    return ErmjRubMjAnim;
}(cc.Component));
exports.default = ErmjRubMjAnim;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcY29tcG9uZW50XFxFcm1qUnViTWpBbmltLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUFvRDtBQUNwRCwrREFBMEQ7QUFDMUQsdURBQWtEO0FBRTVDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBNEJDO1FBMUJHLGVBQVMsR0FBYyxJQUFJLENBQUM7O0lBMEJoQyxDQUFDO0lBckJhLDhCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdkMsQ0FBQztJQUVNLGlDQUFTLEdBQWhCLFVBQWlCLEtBQWE7UUFDMUIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyx1QkFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLHdCQUFjLENBQUMsZUFBZSxHQUFHLHVCQUF1QixFQUFFLDJCQUFpQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEwsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRVMsaUNBQVMsR0FBbkI7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3ZDLENBQUM7SUF6QkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztvREFDUTtJQUZYLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0E0QmpDO0lBQUQsb0JBQUM7Q0E1QkQsQUE0QkMsQ0E1QjBDLEVBQUUsQ0FBQyxTQUFTLEdBNEJ0RDtrQkE1Qm9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJtalBhdGhIZWxwZXIgZnJvbSBcIi4uL2RhdGEvRXJtalBhdGhIZWxwZXJcIjtcclxuaW1wb3J0IEVybWpNalN0eWxlSGVscGVyIGZyb20gXCIuLi90b29sL0VybWpNalN0eWxlSGVscGVyXCI7XHJcbmltcG9ydCBFcm1qR2FtZUNvbnN0IGZyb20gXCIuLi9kYXRhL0VybWpHYW1lQ29uc3RcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJtalJ1Yk1qQW5pbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgbWpGcm9udFNwOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgZWZmZWN0U2sxOiBzcC5Ta2VsZXRvbjtcclxuICAgIHByaXZhdGUgZWZmZWN0U2syOiBzcC5Ta2VsZXRvbjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCl7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RTazEgPSBjYy5maW5kKFwiY29udGVudC9lZmZlY3QxXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLmVmZmVjdFNrMS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZWZmZWN0U2syID0gY2MuZmluZChcImNvbnRlbnQvZWZmZWN0MlwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RTazIubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZG9SdWJBbmltKHZhbHVlOiBudW1iZXIpe1xyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEJ1bmRsZUF1dG9BdGxhcyhFcm1qR2FtZUNvbnN0LkdpZCwgdGhpcy5takZyb250U3AsIEVybWpQYXRoSGVscGVyLmdhbWVUZXh0dXJlUGF0aCArIFwibWFoam9uZy9hdGxhc19tYWhqb25nXCIsIEVybWpNalN0eWxlSGVscGVyLm1qSGFuZE1hcFt2YWx1ZV0sIG51bGwsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuZWZmZWN0U2sxLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmVmZmVjdFNrMi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RTazEuc2V0QW5pbWF0aW9uKDAsIFwiaWRsZVwiLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RTazIuc2V0QW5pbWF0aW9uKDAsIFwiaWRsZV9zaG91emlcIiwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKXtcclxuICAgICAgICB0aGlzLmVmZmVjdFNrMS5jbGVhclRyYWNrcygpO1xyXG4gICAgICAgIHRoaXMuZWZmZWN0U2syLmNsZWFyVHJhY2tzKCk7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RTazEubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmVmZmVjdFNrMi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==