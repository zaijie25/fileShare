
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/subView/ErmjFlowView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e3bd6L+N2NDsZ3qtpdd961g', 'ErmjFlowView');
// ermj/Ermj/scripts/subView/ErmjFlowView.ts

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
var ErmjPathHelper_1 = require("../data/ErmjPathHelper");
var ErmjGameConst_1 = require("../data/ErmjGameConst");
var ErmjDriver_1 = require("../ErmjDriver");
var ErmjFlowView = /** @class */ (function (_super) {
    __extends(ErmjFlowView, _super);
    function ErmjFlowView(node) {
        var _this = _super.call(this) || this;
        _this.clickLimit = false;
        _this.setNode(node);
        return _this;
    }
    ErmjFlowView.prototype.initView = function () {
        this.actionNode = this.getChild("action");
        ErmjGameConst_1.default.addCommonClick(this.node, "action/continueBtn", this.onContinueClick, this);
        ErmjGameConst_1.default.addCommonClick(this.node, "action/leaveBtn", this.onLeaveClick, this);
        this.effectSk = this.getComponent("content/effect", sp.Skeleton);
    };
    ErmjFlowView.prototype.onOpen = function () {
        this.clickLimit = false;
        this.effectSk.node.active = true;
        this.effectSk.setAnimation(0, "idle", false);
        this.actionNode.active = false;
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.RewardLose, true);
        this.delayShowActionBtn(8000); // 以防没收到服务器协议情况
    };
    /** 等待多少ms后显示退出和继续按钮 等待服务器清桌 */
    ErmjFlowView.prototype.delayShowActionBtn = function (delay) {
        var _this = this;
        this.timer = setTimeout(function () {
            _this.showActionBtn(true);
        }, delay);
    };
    ErmjFlowView.prototype.showActionBtn = function (flag) {
        this.actionNode.active = flag;
        clearTimeout(this.timer);
    };
    ErmjFlowView.prototype.onClose = function () {
        this.effectSk.node.active = false;
        this.effectSk.clearTracks();
        clearTimeout(this.timer);
    };
    ErmjFlowView.prototype.onContinueClick = function () {
        var _this = this;
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ContinueGame, true);
        if (this.clickLimit)
            return;
        ErmjDriver_1.default.instance.reMatchPlayer();
        this.clickLimit = true;
        Game.Component.scheduleOnce(function () {
            _this.clickLimit = false;
        }, 3);
    };
    ErmjFlowView.prototype.onLeaveClick = function () {
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
        Game.Server.send(this.Define.CmdLeave, { "IsClose": 1 });
        ErmjDriver_1.default.instance.leaveGame();
    };
    ErmjFlowView.prototype.clearByRound = function () {
        this.active = false;
    };
    return ErmjFlowView;
}(ErmjBaseView_1.default));
exports.default = ErmjFlowView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcc3ViVmlld1xcRXJtakZsb3dWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUEwQztBQUMxQyx5REFBd0Q7QUFDeEQsdURBQWtEO0FBQ2xELDRDQUF1QztBQUV2QztJQUEwQyxnQ0FBWTtJQU1sRCxzQkFBWSxJQUFhO1FBQXpCLFlBQ0ksaUJBQU8sU0FFVjtRQVJPLGdCQUFVLEdBQUcsS0FBSyxDQUFDO1FBT3ZCLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7O0lBQ3ZCLENBQUM7SUFFUywrQkFBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQyx1QkFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUYsdUJBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVTLDZCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMvQix1QkFBYSxDQUFDLFNBQVMsQ0FBQywrQkFBYyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQVMsZUFBZTtJQUMxRCxDQUFDO0lBRUQsK0JBQStCO0lBQ3hCLHlDQUFrQixHQUF6QixVQUEwQixLQUFhO1FBQXZDLGlCQUlDO1FBSEcsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7WUFDcEIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDZixDQUFDO0lBRU0sb0NBQWEsR0FBcEIsVUFBcUIsSUFBYTtRQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDOUIsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRVMsOEJBQU8sR0FBakI7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDNUIsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU8sc0NBQWUsR0FBdkI7UUFBQSxpQkFTQztRQVJHLHVCQUFhLENBQUMsU0FBUyxDQUFDLCtCQUFjLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RSxJQUFJLElBQUksQ0FBQyxVQUFVO1lBQ2YsT0FBTztRQUNYLG9CQUFVLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQzVCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNWLENBQUM7SUFFTyxtQ0FBWSxHQUFwQjtRQUNJLHVCQUFhLENBQUMsU0FBUyxDQUFDLCtCQUFjLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELG9CQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFTSxtQ0FBWSxHQUFuQjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFDTCxtQkFBQztBQUFELENBakVBLEFBaUVDLENBakV5QyxzQkFBWSxHQWlFckQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJtakJhc2VWaWV3IGZyb20gXCIuL0VybWpCYXNlVmlld1wiO1xyXG5pbXBvcnQgeyBFcm1qQXVkaW9Db25zdCB9IGZyb20gXCIuLi9kYXRhL0VybWpQYXRoSGVscGVyXCI7XHJcbmltcG9ydCBFcm1qR2FtZUNvbnN0IGZyb20gXCIuLi9kYXRhL0VybWpHYW1lQ29uc3RcIjtcclxuaW1wb3J0IEVybWpEcml2ZXIgZnJvbSBcIi4uL0VybWpEcml2ZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVybWpGbG93VmlldyBleHRlbmRzIEVybWpCYXNlVmlld3tcclxuICAgIHByaXZhdGUgY2xpY2tMaW1pdCA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBlZmZlY3RTazogc3AuU2tlbGV0b247XHJcbiAgICBwcml2YXRlIGFjdGlvbk5vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIHRpbWVyOiBOb2RlSlMuVGltZW91dDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0Tm9kZShub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKXtcclxuICAgICAgICB0aGlzLmFjdGlvbk5vZGUgPSB0aGlzLmdldENoaWxkKFwiYWN0aW9uXCIpO1xyXG4gICAgICAgIEVybWpHYW1lQ29uc3QuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcImFjdGlvbi9jb250aW51ZUJ0blwiLCB0aGlzLm9uQ29udGludWVDbGljaywgdGhpcyk7XHJcbiAgICAgICAgRXJtakdhbWVDb25zdC5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwiYWN0aW9uL2xlYXZlQnRuXCIsIHRoaXMub25MZWF2ZUNsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmVmZmVjdFNrID0gdGhpcy5nZXRDb21wb25lbnQoXCJjb250ZW50L2VmZmVjdFwiLCBzcC5Ta2VsZXRvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uT3Blbigpe1xyXG4gICAgICAgIHRoaXMuY2xpY2tMaW1pdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZWZmZWN0U2subm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZWZmZWN0U2suc2V0QW5pbWF0aW9uKDAsIFwiaWRsZVwiLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIEVybWpHYW1lQ29uc3QucGxheVNvdW5kKEVybWpBdWRpb0NvbnN0LmNvbW1vbkF1ZGlvLlJld2FyZExvc2UsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuZGVsYXlTaG93QWN0aW9uQnRuKDgwMDApOyAgICAgICAgIC8vIOS7pemYsuayoeaUtuWIsOacjeWKoeWZqOWNj+iuruaDheWGtVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKiog562J5b6F5aSa5bCRbXPlkI7mmL7npLrpgIDlh7rlkoznu6fnu63mjInpkq4g562J5b6F5pyN5Yqh5Zmo5riF5qGMICovXHJcbiAgICBwdWJsaWMgZGVsYXlTaG93QWN0aW9uQnRuKGRlbGF5OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93QWN0aW9uQnRuKHRydWUpOyBcclxuICAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93QWN0aW9uQnRuKGZsYWc6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuYWN0aW9uTm9kZS5hY3RpdmUgPSBmbGFnO1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZSgpe1xyXG4gICAgICAgIHRoaXMuZWZmZWN0U2subm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmVmZmVjdFNrLmNsZWFyVHJhY2tzKCk7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Db250aW51ZUNsaWNrKCl7XHJcbiAgICAgICAgRXJtakdhbWVDb25zdC5wbGF5U291bmQoRXJtakF1ZGlvQ29uc3QuY29tbW9uQXVkaW8uQ29udGludWVHYW1lLCB0cnVlKTtcclxuICAgICAgICBpZiAodGhpcy5jbGlja0xpbWl0KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgRXJtakRyaXZlci5pbnN0YW5jZS5yZU1hdGNoUGxheWVyKCk7XHJcbiAgICAgICAgdGhpcy5jbGlja0xpbWl0ID0gdHJ1ZTtcclxuICAgICAgICBHYW1lLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5jbGlja0xpbWl0ID0gZmFsc2U7XHJcbiAgICAgICAgfSwgMyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkxlYXZlQ2xpY2soKXtcclxuICAgICAgICBFcm1qR2FtZUNvbnN0LnBsYXlTb3VuZChFcm1qQXVkaW9Db25zdC5jb21tb25BdWRpby5CdXR0b25DbGljaywgdHJ1ZSk7XHJcbiAgICAgICAgR2FtZS5TZXJ2ZXIuc2VuZCh0aGlzLkRlZmluZS5DbWRMZWF2ZSwgeyBcIklzQ2xvc2VcIjogMSB9KTtcclxuICAgICAgICBFcm1qRHJpdmVyLmluc3RhbmNlLmxlYXZlR2FtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckJ5Um91bmQoKXtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG59Il19