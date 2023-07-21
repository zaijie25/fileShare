
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/subView/ErmjGameStartView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6d7f0Ydm1FDv6YFqz31QRpq', 'ErmjGameStartView');
// ermj/Ermj/scripts/subView/ErmjGameStartView.ts

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
var ErmjGameStartView = /** @class */ (function (_super) {
    __extends(ErmjGameStartView, _super);
    function ErmjGameStartView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    ErmjGameStartView.prototype.initView = function () {
        this.effectSk = this.getComponent("content/effect", sp.Skeleton);
    };
    ErmjGameStartView.prototype.showAnim = function () {
        var _this = this;
        this.effectSk.node.active = true;
        this.effectSk.setAnimation(0, "idle", false);
        Game.Component.scheduleOnce(function () {
            _this.active = false;
        }, 1);
    };
    ErmjGameStartView.prototype.onOpen = function () {
        this.showAnim();
    };
    ErmjGameStartView.prototype.onClose = function () {
        this.effectSk.node.active = false;
        this.effectSk.clearTracks();
    };
    ErmjGameStartView.prototype.clearByRound = function () {
        this.active = false;
    };
    return ErmjGameStartView;
}(ErmjBaseView_1.default));
exports.default = ErmjGameStartView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcc3ViVmlld1xcRXJtakdhbWVTdGFydFZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTBDO0FBRTFDO0lBQStDLHFDQUFZO0lBR3ZELDJCQUFZLElBQWE7UUFBekIsWUFDSSxpQkFBTyxTQUVWO1FBREcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQUVTLG9DQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRU8sb0NBQVEsR0FBaEI7UUFBQSxpQkFNQztRQUxHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQztZQUN4QixLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDVixDQUFDO0lBRVMsa0NBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVTLG1DQUFPLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFTSx3Q0FBWSxHQUFuQjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFDTCx3QkFBQztBQUFELENBaENBLEFBZ0NDLENBaEM4QyxzQkFBWSxHQWdDMUQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJtakJhc2VWaWV3IGZyb20gXCIuL0VybWpCYXNlVmlld1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJtakdhbWVTdGFydFZpZXcgZXh0ZW5kcyBFcm1qQmFzZVZpZXd7XHJcbiAgICBwcml2YXRlIGVmZmVjdFNrOiBzcC5Ta2VsZXRvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0Tm9kZShub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKXtcclxuICAgICAgICB0aGlzLmVmZmVjdFNrID0gdGhpcy5nZXRDb21wb25lbnQoXCJjb250ZW50L2VmZmVjdFwiLCBzcC5Ta2VsZXRvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93QW5pbSgpe1xyXG4gICAgICAgIHRoaXMuZWZmZWN0U2subm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZWZmZWN0U2suc2V0QW5pbWF0aW9uKDAsIFwiaWRsZVwiLCBmYWxzZSk7XHJcbiAgICAgICAgR2FtZS5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uT3Blbigpe1xyXG4gICAgICAgIHRoaXMuc2hvd0FuaW0oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZSgpe1xyXG4gICAgICAgIHRoaXMuZWZmZWN0U2subm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmVmZmVjdFNrLmNsZWFyVHJhY2tzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQnlSb3VuZCgpe1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iXX0=