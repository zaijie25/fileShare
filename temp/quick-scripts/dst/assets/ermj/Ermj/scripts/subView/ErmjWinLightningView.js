
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/subView/ErmjWinLightningView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '19db7e0T29MSL+m0NUl1USJ', 'ErmjWinLightningView');
// ermj/Ermj/scripts/subView/ErmjWinLightningView.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var ErmjBaseView_1 = require("./ErmjBaseView");
var ErmjWinLightningView = /** @class */ (function (_super) {
    __extends(ErmjWinLightningView, _super);
    function ErmjWinLightningView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    ErmjWinLightningView.prototype.initView = function () {
        this.contentNode = this.getChild("content");
        this.effectSk = this.getComponent("content/effect", sp.Skeleton);
    };
    ErmjWinLightningView.prototype.onOpen = function () {
        var _this = this;
        this.effectSk.node.active = true;
        this.effectSk.setAnimation(0, "idle", false);
        Game.Component.scheduleOnce(function () {
            _this.active = false;
        }, 1);
    };
    ErmjWinLightningView.prototype.setLightPoint = function (worldPos) {
        this.contentNode.setPosition(this.contentNode.parent.convertToNodeSpaceAR(worldPos));
    };
    ErmjWinLightningView.prototype.onClose = function () {
        this.effectSk.node.active = false;
        this.effectSk.clearTracks();
    };
    ErmjWinLightningView.prototype.clearByRound = function () {
        this.active = false;
    };
    return ErmjWinLightningView;
}(ErmjBaseView_1.default));
exports.default = ErmjWinLightningView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcc3ViVmlld1xcRXJtaldpbkxpZ2h0bmluZ1ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTBDO0FBRTFDO0lBQWtELHdDQUFZO0lBSTFELDhCQUFZLElBQWE7UUFBekIsWUFDSSxpQkFBTyxTQUVWO1FBREcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQUVTLHVDQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVTLHFDQUFNLEdBQWhCO1FBQUEsaUJBTUM7UUFMRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7WUFDeEIsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQUVNLDRDQUFhLEdBQXBCLFVBQXFCLFFBQWlCO1FBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVTLHNDQUFPLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFTSwyQ0FBWSxHQUFuQjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFDTCwyQkFBQztBQUFELENBbENBLEFBa0NDLENBbENpRCxzQkFBWSxHQWtDN0QiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJtakJhc2VWaWV3IGZyb20gXCIuL0VybWpCYXNlVmlld1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJtaldpbkxpZ2h0bmluZ1ZpZXcgZXh0ZW5kcyBFcm1qQmFzZVZpZXd7XHJcbiAgICBwcml2YXRlIGVmZmVjdFNrOiBzcC5Ta2VsZXRvbjtcclxuICAgIHByaXZhdGUgY29udGVudE5vZGU6IGNjLk5vZGU7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5jb250ZW50Tm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJjb250ZW50XCIpO1xyXG4gICAgICAgIHRoaXMuZWZmZWN0U2sgPSB0aGlzLmdldENvbXBvbmVudChcImNvbnRlbnQvZWZmZWN0XCIsIHNwLlNrZWxldG9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKCl7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RTay5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RTay5zZXRBbmltYXRpb24oMCwgXCJpZGxlXCIsIGZhbHNlKTtcclxuICAgICAgICBHYW1lLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9LCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TGlnaHRQb2ludCh3b3JsZFBvczogY2MuVmVjMyl7XHJcbiAgICAgICAgdGhpcy5jb250ZW50Tm9kZS5zZXRQb3NpdGlvbih0aGlzLmNvbnRlbnROb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKCl7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RTay5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZWZmZWN0U2suY2xlYXJUcmFja3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJCeVJvdW5kKCl7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxufSJdfQ==