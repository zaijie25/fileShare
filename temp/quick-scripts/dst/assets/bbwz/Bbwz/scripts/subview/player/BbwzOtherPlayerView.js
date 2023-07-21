
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/subview/player/BbwzOtherPlayerView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4a260cVN81N3r1bdaLo8nX6', 'BbwzOtherPlayerView');
// bbwz/Bbwz/scripts/subview/player/BbwzOtherPlayerView.ts

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
var BbwzPlayerBaseView_1 = require("./BbwzPlayerBaseView");
var BbwzConstDefine_1 = require("../../data/BbwzConstDefine");
var BbwzGameEvent_1 = require("../../data/BbwzGameEvent");
var BbwzData_1 = require("../../data/BbwzData");
var BbwzOtherPlayerView = /** @class */ (function (_super) {
    __extends(BbwzOtherPlayerView, _super);
    function BbwzOtherPlayerView(node, chair) {
        var _this = _super.call(this) || this;
        _this.chair = chair;
        _this.isAniming = false;
        _this.shakeCount = 0;
        _this.setNode(node);
        return _this;
    }
    BbwzOtherPlayerView.prototype.initView = function () {
        _super.prototype.initView.call(this);
        BbwzConstDefine_1.default.addCommonClick(this.node, "useInfo", this.onUserInfoClick, this, cc.Button.Transition.NONE);
        this.rawPos = this.node.position;
        BbwzData_1.default.instance.playerChipsFlyPos[this.chair] = this.getCenterWorldPos();
        this.headTipsRoot = this.getChild("headTipsRoot");
        this.headTipsRootRawPos = this.headTipsRoot.position;
    };
    BbwzOtherPlayerView.prototype.playBetAnim = function (timeScale, shakeCount) {
        if (shakeCount === void 0) { shakeCount = 1; }
        if (this.shakeCount >= 3) {
            return;
        }
        this.shakeCount += shakeCount;
        if (this.isAniming)
            return;
        this.shakeHead(timeScale);
    };
    /**
     * 执行抖动动作
     */
    BbwzOtherPlayerView.prototype.shakeHead = function (time) {
        this.isAniming = true;
        if (this.shakeCount > 0) {
            var offset = this.node.x < 0 ? cc.v2(20, 0) : cc.v2(-20, 0);
            var out = cc.moveBy(time / 2, offset, 0);
            var back = cc.moveBy(time / 2, 0, 0);
            var seq = cc.sequence(out, back, cc.callFunc(this.shakeHead, this));
            this.node.runAction(seq);
            this.shakeCount--;
        }
        else {
            this.stopAnim();
        }
    };
    /**
     * 停止抖动
     */
    BbwzOtherPlayerView.prototype.stopAnim = function () {
        this.node.stopAllActions();
        this.node.setPosition(this.rawPos);
        this.shakeCount = 0;
        this.isAniming = false;
    };
    BbwzOtherPlayerView.prototype.getCenterWorldPos = function () {
        return this.headImgSp.node.parent.convertToWorldSpaceAR(this.headImgSp.node.position);
    };
    BbwzOtherPlayerView.prototype.getHeadTipWorldPos = function () {
        return this.headTipsRoot.parent.convertToWorldSpaceAR(this.headTipsRootRawPos);
    };
    BbwzOtherPlayerView.prototype.onUserInfoClick = function () {
        Game.Event.event(BbwzGameEvent_1.default.onUserInfoTouch, this.chair, this.getHeadTipWorldPos());
    };
    BbwzOtherPlayerView.prototype.clearByRound = function () {
        _super.prototype.clearByRound.call(this);
        this.stopAnim();
    };
    //返回头像之间点的世界坐标
    BbwzOtherPlayerView.prototype.getChipStartPos = function () {
        return this.node.parent.convertToWorldSpaceAR(this.node.position);
    };
    return BbwzOtherPlayerView;
}(BbwzPlayerBaseView_1.default));
exports.default = BbwzOtherPlayerView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcc3Vidmlld1xccGxheWVyXFxCYnd6T3RoZXJQbGF5ZXJWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUFzRDtBQUV0RCw4REFBeUQ7QUFDekQsMERBQXFEO0FBRXJELGdEQUEyQztBQUUzQztJQUFpRCx1Q0FBa0I7SUFTL0QsNkJBQVksSUFBYSxFQUFTLEtBQWE7UUFBL0MsWUFDSSxpQkFBTyxTQUVWO1FBSGlDLFdBQUssR0FBTCxLQUFLLENBQVE7UUFSeEMsZUFBUyxHQUFZLEtBQUssQ0FBQztRQUMxQixnQkFBVSxHQUFHLENBQUMsQ0FBQztRQVNuQixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztJQUN2QixDQUFDO0lBRVMsc0NBQVEsR0FBbEI7UUFDSSxpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUNqQix5QkFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1RyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2pDLGtCQUFRLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMzRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO0lBQ3pELENBQUM7SUFFTSx5Q0FBVyxHQUFsQixVQUFtQixTQUFpQixFQUFFLFVBQXNCO1FBQXRCLDJC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b3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmJ3elBsYXllckJhc2VWaWV3IGZyb20gXCIuL0Jid3pQbGF5ZXJCYXNlVmlld1wiO1xyXG5pbXBvcnQgQmJ3ekJldFBsYXllckludGVyZmFjZSBmcm9tIFwiLi9CYnd6QmV0UGxheWVySW50ZXJmYWNlXCI7XHJcbmltcG9ydCBCYnd6Q29uc3REZWZpbmUgZnJvbSBcIi4uLy4uL2RhdGEvQmJ3ekNvbnN0RGVmaW5lXCI7XHJcbmltcG9ydCBCYnd6R2FtZUV2ZW50IGZyb20gXCIuLi8uLi9kYXRhL0Jid3pHYW1lRXZlbnRcIjtcclxuaW1wb3J0IEJid3pTa2luRGVmaW5lIGZyb20gXCIuLi8uLi9kYXRhL0Jid3pTa2luRGVmaW5lXCI7XHJcbmltcG9ydCBCYnd6RGF0YSBmcm9tIFwiLi4vLi4vZGF0YS9CYnd6RGF0YVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmJ3ek90aGVyUGxheWVyVmlldyBleHRlbmRzIEJid3pQbGF5ZXJCYXNlVmlldyBpbXBsZW1lbnRzIEJid3pCZXRQbGF5ZXJJbnRlcmZhY2Uge1xyXG4gICAgcHVibGljIGlzQW5pbWluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBzaGFrZUNvdW50ID0gMDtcclxuXHJcbiAgICBwcml2YXRlIHJhd1BvczogY2MuVmVjMztcclxuXHJcbiAgICBwcm90ZWN0ZWQgaGVhZFRpcHNSb290OiBjYy5Ob2RlO1xyXG4gICAgcHJvdGVjdGVkIGhlYWRUaXBzUm9vdFJhd1BvczogY2MuVmVjMztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlLCBwdWJsaWMgY2hhaXI6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICBzdXBlci5pbml0VmlldygpO1xyXG4gICAgICAgIEJid3pDb25zdERlZmluZS5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwidXNlSW5mb1wiLCB0aGlzLm9uVXNlckluZm9DbGljaywgdGhpcywgY2MuQnV0dG9uLlRyYW5zaXRpb24uTk9ORSk7XHJcbiAgICAgICAgdGhpcy5yYXdQb3MgPSB0aGlzLm5vZGUucG9zaXRpb247XHJcbiAgICAgICAgQmJ3ekRhdGEuaW5zdGFuY2UucGxheWVyQ2hpcHNGbHlQb3NbdGhpcy5jaGFpcl0gPSB0aGlzLmdldENlbnRlcldvcmxkUG9zKCk7XHJcbiAgICAgICAgdGhpcy5oZWFkVGlwc1Jvb3QgPSB0aGlzLmdldENoaWxkKFwiaGVhZFRpcHNSb290XCIpO1xyXG4gICAgICAgIHRoaXMuaGVhZFRpcHNSb290UmF3UG9zID0gdGhpcy5oZWFkVGlwc1Jvb3QucG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXlCZXRBbmltKHRpbWVTY2FsZTogbnVtYmVyLCBzaGFrZUNvdW50OiBudW1iZXIgPSAxKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hha2VDb3VudCA+PSAzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaGFrZUNvdW50ICs9IHNoYWtlQ291bnQ7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNBbmltaW5nKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5zaGFrZUhlYWQodGltZVNjYWxlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJp+ihjOaKluWKqOWKqOS9nFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNoYWtlSGVhZCh0aW1lOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmlzQW5pbWluZyA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hha2VDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IHRoaXMubm9kZS54IDwgMCA/IGNjLnYyKDIwLCAwKSA6IGNjLnYyKC0yMCwgMCk7XHJcbiAgICAgICAgICAgIGxldCBvdXQgPSBjYy5tb3ZlQnkodGltZSAvIDIsIG9mZnNldCwgMCk7XHJcbiAgICAgICAgICAgIGxldCBiYWNrID0gY2MubW92ZUJ5KHRpbWUgLyAyLCAwLCAwKTtcclxuICAgICAgICAgICAgbGV0IHNlcSA9IGNjLnNlcXVlbmNlKG91dCwgYmFjaywgY2MuY2FsbEZ1bmModGhpcy5zaGFrZUhlYWQsIHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihzZXEpO1xyXG4gICAgICAgICAgICB0aGlzLnNoYWtlQ291bnQtLTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BBbmltKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlgZzmraLmipbliqhcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdG9wQW5pbSgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy5yYXdQb3MpO1xyXG4gICAgICAgIHRoaXMuc2hha2VDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5pc0FuaW1pbmcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q2VudGVyV29ybGRQb3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhZEltZ1NwLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0aGlzLmhlYWRJbWdTcC5ub2RlLnBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SGVhZFRpcFdvcmxkUG9zKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlYWRUaXBzUm9vdC5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHRoaXMuaGVhZFRpcHNSb290UmF3UG9zKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVXNlckluZm9DbGljaygpIHtcclxuICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEJid3pHYW1lRXZlbnQub25Vc2VySW5mb1RvdWNoLCB0aGlzLmNoYWlyLCB0aGlzLmdldEhlYWRUaXBXb3JsZFBvcygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJCeVJvdW5kKCkge1xyXG4gICAgICAgIHN1cGVyLmNsZWFyQnlSb3VuZCgpO1xyXG4gICAgICAgIHRoaXMuc3RvcEFuaW0oKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+i/lOWbnuWktOWDj+S5i+mXtOeCueeahOS4lueVjOWdkOagh1xyXG4gICAgcHVibGljIGdldENoaXBTdGFydFBvcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGhpcy5ub2RlLnBvc2l0aW9uKTtcclxuICAgIH1cclxufSJdfQ==