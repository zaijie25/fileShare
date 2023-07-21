
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/subview/BbwzStateView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7955e4qR4hIz7h8t70eIwrK', 'BbwzStateView');
// bbwz/Bbwz/scripts/subview/BbwzStateView.ts

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
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
var BbwzBaseView_1 = require("./BbwzBaseView");
var BbwzTimeAutoRun_1 = require("../component/BbwzTimeAutoRun");
/**
 * 游戏层 状态控制组件
 */
var BbwzStateView = /** @class */ (function (_super) {
    __extends(BbwzStateView, _super);
    function BbwzStateView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    BbwzStateView.prototype.initView = function () {
        this.betStartNode = this.getChild("state_1");
        this.betStartSk = this.getComponent("state_1/spine", sp.Skeleton);
        this.betEndNode = this.getChild("state_3");
        this.betEndSk = this.getComponent("state_3/spine", sp.Skeleton);
        this.betTimeNode = this.getChild("state_2");
        this.timeRunComp = Global.UIHelper.safeGetComponent(this.betTimeNode, "timeLbl", BbwzTimeAutoRun_1.BbwzTimeAutoRun);
        this.timeRunComp.node.active = false;
    };
    BbwzStateView.prototype.runState = function (gameState, isPlayAnim) {
        if (isPlayAnim === void 0) { isPlayAnim = true; }
        this.active = true;
        this.betStartNode.active = gameState == BbwzConstDefine_1.BbwzGameState.BetStart;
        this.betEndNode.active = gameState == BbwzConstDefine_1.BbwzGameState.BetEnd;
        this.betTimeNode.active = gameState == BbwzConstDefine_1.BbwzGameState.Bet;
        switch (gameState) {
            case BbwzConstDefine_1.BbwzGameState.BetStart:
                if (isPlayAnim)
                    this.playStartAnim();
                break;
            case BbwzConstDefine_1.BbwzGameState.BetEnd:
                if (isPlayAnim)
                    this.playEndAnim();
                break;
            case BbwzConstDefine_1.BbwzGameState.Bet:
                break;
        }
    };
    BbwzStateView.prototype.playStartAnim = function () {
        this.betStartSk.setAnimation(0, "idle", false);
        var tween = Game.Tween.get(this.betStartNode);
        tween.to(0.25, { position: cc.v2(0, this.betStartNode.y) }, null)
            .delay(1.0)
            .to(0.25, { position: cc.v2(1200, this.betStartNode.y) }, null)
            .start();
        Global.Audio.playBundleSound(BbwzConstDefine_1.default.GAME_ID, BbwzConstDefine_1.default.SOUND_BET_START, true);
    };
    BbwzStateView.prototype.playEndAnim = function () {
        this.betEndSk.setAnimation(0, "idle", false);
        var tween = Game.Tween.get(this.betEndNode);
        tween.to(0.25, { position: cc.v2(0, this.betEndNode.y) }, null)
            .delay(1.0)
            .to(0.25, { position: cc.v2(1200, this.betEndNode.y) }, null)
            .start();
        Global.Audio.playBundleSound(BbwzConstDefine_1.default.GAME_ID, BbwzConstDefine_1.default.SOUND_BET_END, true);
    };
    BbwzStateView.prototype.setTimeRunConfig = function (leftTime, callback, target) {
        this.timeRunComp.node.active = true;
        this.timeRunComp.setTimer(leftTime);
        this.timeRunComp.setSecondCall(callback, target);
    };
    BbwzStateView.prototype.onClose = function () {
        this.timeRunComp.node.active = false;
    };
    BbwzStateView.prototype.clearByRound = function () {
        this.active = false;
        this.betStartNode.active = false;
        this.betEndNode.active = false;
        this.betTimeNode.active = false;
    };
    return BbwzStateView;
}(BbwzBaseView_1.default));
exports.default = BbwzStateView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcc3Vidmlld1xcQmJ3elN0YXRlVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBeUU7QUFDekUsK0NBQTBDO0FBQzFDLGdFQUErRDtBQUUvRDs7R0FFRztBQUNIO0lBQTJDLGlDQUFZO0lBU25ELHVCQUFZLElBQWE7UUFBekIsWUFDSSxpQkFBTyxTQUVWO1FBREcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFVBQVUsR0FBZ0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFnQixJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFN0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxXQUFXLEdBQW9CLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsaUNBQWUsQ0FBQyxDQUFDO1FBQ25ILElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDekMsQ0FBQztJQUVNLGdDQUFRLEdBQWYsVUFBZ0IsU0FBaUIsRUFBRSxVQUEwQjtRQUExQiwyQkFBQSxFQUFBLGlCQUEwQjtRQUN6RCxJQUFJ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RUFBRSxNQUFNLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRVMsK0JBQU8sR0FBakI7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3pDLENBQUM7SUFFTSxvQ0FBWSxHQUFuQjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3BDLENBQUM7SUFDTCxvQkFBQztBQUFELENBaEZBLEFBZ0ZDLENBaEYwQyxzQkFBWSxHQWdGdEQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmJ3ekNvbnN0RGVmaW5lLCB7IEJid3pHYW1lU3RhdGUgfSBmcm9tIFwiLi4vZGF0YS9CYnd6Q29uc3REZWZpbmVcIjtcclxuaW1wb3J0IEJid3pCYXNlVmlldyBmcm9tIFwiLi9CYnd6QmFzZVZpZXdcIjtcclxuaW1wb3J0IHsgQmJ3elRpbWVBdXRvUnVuIH0gZnJvbSBcIi4uL2NvbXBvbmVudC9CYnd6VGltZUF1dG9SdW5cIjtcclxuXHJcbi8qKlxyXG4gKiDmuLjmiI/lsYIg54q25oCB5o6n5Yi257uE5Lu2XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYnd6U3RhdGVWaWV3IGV4dGVuZHMgQmJ3ekJhc2VWaWV3IHtcclxuICAgIHByaXZhdGUgYmV0U3RhcnROb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBiZXRFbmROb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBiZXRUaW1lTm9kZTogY2MuTm9kZVxyXG4gICAgcHJpdmF0ZSB0aW1lUnVuQ29tcDogQmJ3elRpbWVBdXRvUnVuO1xyXG4gICAgcHJpdmF0ZSBiZXRTdGFydFNrOiBzcC5Ta2VsZXRvbjtcclxuICAgIHByaXZhdGUgYmV0RW5kU2s6IHNwLlNrZWxldG9uO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5iZXRTdGFydE5vZGUgPSB0aGlzLmdldENoaWxkKFwic3RhdGVfMVwiKTtcclxuICAgICAgICB0aGlzLmJldFN0YXJ0U2sgPSA8c3AuU2tlbGV0b24+dGhpcy5nZXRDb21wb25lbnQoXCJzdGF0ZV8xL3NwaW5lXCIsIHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLmJldEVuZE5vZGUgPSB0aGlzLmdldENoaWxkKFwic3RhdGVfM1wiKTtcclxuICAgICAgICB0aGlzLmJldEVuZFNrID0gPHNwLlNrZWxldG9uPnRoaXMuZ2V0Q29tcG9uZW50KFwic3RhdGVfMy9zcGluZVwiLCBzcC5Ta2VsZXRvbik7XHJcblxyXG4gICAgICAgIHRoaXMuYmV0VGltZU5vZGUgPSB0aGlzLmdldENoaWxkKFwic3RhdGVfMlwiKTtcclxuICAgICAgICB0aGlzLnRpbWVSdW5Db21wID0gPEJid3pUaW1lQXV0b1J1bj5HbG9iYWwuVUlIZWxwZXIuc2FmZUdldENvbXBvbmVudCh0aGlzLmJldFRpbWVOb2RlLCBcInRpbWVMYmxcIiwgQmJ3elRpbWVBdXRvUnVuKTtcclxuICAgICAgICB0aGlzLnRpbWVSdW5Db21wLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJ1blN0YXRlKGdhbWVTdGF0ZTogbnVtYmVyLCBpc1BsYXlBbmltOiBib29sZWFuID0gdHJ1ZSl7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYmV0U3RhcnROb2RlLmFjdGl2ZSA9IGdhbWVTdGF0ZSA9PSBCYnd6R2FtZVN0YXRlLkJldFN0YXJ0O1xyXG4gICAgICAgIHRoaXMuYmV0RW5kTm9kZS5hY3RpdmUgPSBnYW1lU3RhdGUgPT0gQmJ3ekdhbWVTdGF0ZS5CZXRFbmQ7XHJcbiAgICAgICAgdGhpcy5iZXRUaW1lTm9kZS5hY3RpdmUgPSBnYW1lU3RhdGUgPT0gQmJ3ekdhbWVTdGF0ZS5CZXQ7XHJcbiAgICAgICAgc3dpdGNoIChnYW1lU3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSBCYnd6R2FtZVN0YXRlLkJldFN0YXJ0OlxyXG4gICAgICAgICAgICAgICAgaWYgKGlzUGxheUFuaW0pXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5U3RhcnRBbmltKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBCYnd6R2FtZVN0YXRlLkJldEVuZDpcclxuICAgICAgICAgICAgICAgIGlmIChpc1BsYXlBbmltKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUVuZEFuaW0oKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJid3pHYW1lU3RhdGUuQmV0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGxheVN0YXJ0QW5pbSgpe1xyXG4gICAgICAgIHRoaXMuYmV0U3RhcnRTay5zZXRBbmltYXRpb24oMCwgXCJpZGxlXCIsIGZhbHNlKTtcclxuICAgICAgICBsZXQgdHdlZW46IGNjLlR3ZWVuID0gR2FtZS5Ud2Vlbi5nZXQodGhpcy5iZXRTdGFydE5vZGUpO1xyXG4gICAgICAgIHR3ZWVuLnRvKDAuMjUsIHsgcG9zaXRpb246IGNjLnYyKDAsIHRoaXMuYmV0U3RhcnROb2RlLnkpIH0sIG51bGwpXHJcbiAgICAgICAgICAgIC5kZWxheSgxLjApXHJcbiAgICAgICAgICAgIC50bygwLjI1LCB7IHBvc2l0aW9uOiBjYy52MigxMjAwLCB0aGlzLmJldFN0YXJ0Tm9kZS55KSB9LCBudWxsKVxyXG4gICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUJ1bmRsZVNvdW5kKEJid3pDb25zdERlZmluZS5HQU1FX0lELEJid3pDb25zdERlZmluZS5TT1VORF9CRVRfU1RBUlQsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGxheUVuZEFuaW0oKXtcclxuICAgICAgICB0aGlzLmJldEVuZFNrLnNldEFuaW1hdGlvbigwLCBcImlkbGVcIiwgZmFsc2UpO1xyXG4gICAgICAgIGxldCB0d2VlbjogY2MuVHdlZW4gPSBHYW1lLlR3ZWVuLmdldCh0aGlzLmJldEVuZE5vZGUpO1xyXG4gICAgICAgIHR3ZWVuLnRvKDAuMjUsIHsgcG9zaXRpb246IGNjLnYyKDAsIHRoaXMuYmV0RW5kTm9kZS55KSB9LCBudWxsKVxyXG4gICAgICAgICAgICAuZGVsYXkoMS4wKVxyXG4gICAgICAgICAgICAudG8oMC4yNSwgeyBwb3NpdGlvbjogY2MudjIoMTIwMCwgdGhpcy5iZXRFbmROb2RlLnkpIH0sIG51bGwpXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QnVuZGxlU291bmQoQmJ3ekNvbnN0RGVmaW5lLkdBTUVfSUQsQmJ3ekNvbnN0RGVmaW5lLlNPVU5EX0JFVF9FTkQsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRUaW1lUnVuQ29uZmlnKGxlZnRUaW1lOiBudW1iZXIsIGNhbGxiYWNrPzogRnVuY3Rpb24sIHRhcmdldD86IGFueSkge1xyXG4gICAgICAgIHRoaXMudGltZVJ1bkNvbXAubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudGltZVJ1bkNvbXAuc2V0VGltZXIobGVmdFRpbWUpO1xyXG4gICAgICAgIHRoaXMudGltZVJ1bkNvbXAuc2V0U2Vjb25kQ2FsbChjYWxsYmFjaywgdGFyZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZSgpe1xyXG4gICAgICAgIHRoaXMudGltZVJ1bkNvbXAubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJCeVJvdW5kKCkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iZXRTdGFydE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iZXRFbmROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYmV0VGltZU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuIl19