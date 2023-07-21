
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/subview/player/BbwzOnlinePlayerView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ecfeajwhZJLp5ci1deoa6OD', 'BbwzOnlinePlayerView');
// bbwz/Bbwz/scripts/subview/player/BbwzOnlinePlayerView.ts

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
var BbwzBaseView_1 = require("../BbwzBaseView");
var BbwzConstDefine_1 = require("../../data/BbwzConstDefine");
var BbwzDriver_1 = require("../../BbwzDriver");
var BbwzData_1 = require("../../data/BbwzData");
var BbwzOnlinePlayerView = /** @class */ (function (_super) {
    __extends(BbwzOnlinePlayerView, _super);
    function BbwzOnlinePlayerView(node, chair) {
        var _this = _super.call(this) || this;
        _this.chair = chair;
        _this.isAniming = false;
        _this.setNode(node);
        return _this;
    }
    BbwzOnlinePlayerView.prototype.initView = function () {
        this.label = this.getComponent("countLbl", cc.Label);
        BbwzConstDefine_1.default.addCommonClick(this.node, "", this.onButtonCLick, this);
        BbwzData_1.default.instance.playerChipsFlyPos[this.chair] = this.getCenterWorldPos();
    };
    BbwzOnlinePlayerView.prototype.onButtonCLick = function () {
        BbwzConstDefine_1.default.playBtnSound();
        Game.Server.send(BbwzConstDefine_1.default.SEND_ONLINE_PLAYER_LIST, {});
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, BbwzDriver_1.default.instance.onlinePop.loadingKey, 3);
        BbwzDriver_1.default.instance.onlinePop.node.active = true;
    };
    BbwzOnlinePlayerView.prototype.setCountLbl = function (isShow, count) {
        this.label.node.active = isShow;
        if (isShow)
            this.label.string = count.toString();
    };
    /**
     * 播放在线玩家按钮的下注动画
     * @param timeScale
     */
    BbwzOnlinePlayerView.prototype.playBetAnim = function (timeScale) {
        var _this = this;
        if (this.isAniming) {
            return;
        }
        var tween = Game.Tween.get(this.node);
        this.isAniming = true;
        this.node.scale = 1;
        tween.delay(0.1)
            .to(0.6 * timeScale, { scale: 1.05 }, cc.easeQuarticActionInOut())
            .to(0.4 * timeScale, { scale: 1 }, cc.easeCubicActionInOut())
            .call(function () {
            _this.isAniming = false;
        })
            .start();
    };
    BbwzOnlinePlayerView.prototype.getCenterWorldPos = function () {
        return this.node.parent.convertToWorldSpaceAR(this.node.position);
    };
    BbwzOnlinePlayerView.prototype.clearByRound = function () {
        _super.prototype.clearByRound.call(this);
        this.node.stopAllActions();
        this.node.scale = 1;
        this.isAniming = false;
    };
    //返回头像之间点的世界坐标
    BbwzOnlinePlayerView.prototype.getChipStartPos = function () {
        return this.node.parent.convertToWorldSpaceAR(this.node.position);
    };
    return BbwzOnlinePlayerView;
}(BbwzBaseView_1.default));
exports.default = BbwzOnlinePlayerView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcc3Vidmlld1xccGxheWVyXFxCYnd6T25saW5lUGxheWVyVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBMkM7QUFFM0MsOERBQXlEO0FBQ3pELCtDQUEwQztBQUMxQyxnREFBMkM7QUFFM0M7SUFBa0Qsd0NBQVk7SUFHMUQsOEJBQVksSUFBYSxFQUFTLEtBQWE7UUFBL0MsWUFDSSxpQkFBTyxTQUVWO1FBSGlDLFdBQUssR0FBTCxLQUFLLENBQVE7UUFEeEMsZUFBUyxHQUFZLEtBQUssQ0FBQztRQUc5QixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztJQUN2QixDQUFDO0lBRVMsdUNBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFhLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvRCx5QkFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hFLGtCQUFRLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMvRSxDQUFDO0lBRU8sNENBQWEsR0FBckI7UUFDSSx5QkFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHlCQUFlLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLG9CQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUYsb0JBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3JELENBQUM7SUFFTSwwQ0FBVyxHQUFsQixVQUFtQixNQUFlLEVBQUUsS0FBYTtRQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ2hDLElBQUksTUFBTTtZQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksMENBQVcsR0FBbEIsVUFBbUIsU0FBaUI7UUFBcEMsaUJBY0M7UUFiRyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsT0FBTztTQUNWO1FBQ0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNwQixLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNYLEVBQUUsQ0FBQyxHQUFHLEdBQUcsU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO2FBQ2pFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2FBQzVELElBQUksQ0FBQztZQUNGLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUMsQ0FBQzthQUNELEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFTSxnREFBaUIsR0FBeEI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVNLDJDQUFZLEdBQW5CO1FBQ0ksaUJBQU0sWUFBWSxXQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUNELGNBQWM7SUFDUCw4Q0FBZSxHQUF0QjtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBQ0wsMkJBQUM7QUFBRCxDQTdEQSxBQTZEQyxDQTdEaUQsc0JBQVksR0E2RDdEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJid3pCYXNlVmlldyBmcm9tIFwiLi4vQmJ3ekJhc2VWaWV3XCI7XHJcbmltcG9ydCBCYnd6QmV0UGxheWVySW50ZXJmYWNlIGZyb20gXCIuL0Jid3pCZXRQbGF5ZXJJbnRlcmZhY2VcIjtcclxuaW1wb3J0IEJid3pDb25zdERlZmluZSBmcm9tIFwiLi4vLi4vZGF0YS9CYnd6Q29uc3REZWZpbmVcIjtcclxuaW1wb3J0IEJid3pEcml2ZXIgZnJvbSBcIi4uLy4uL0Jid3pEcml2ZXJcIjtcclxuaW1wb3J0IEJid3pEYXRhIGZyb20gXCIuLi8uLi9kYXRhL0Jid3pEYXRhXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYnd6T25saW5lUGxheWVyVmlldyBleHRlbmRzIEJid3pCYXNlVmlldyBpbXBsZW1lbnRzIEJid3pCZXRQbGF5ZXJJbnRlcmZhY2Uge1xyXG4gICAgcHJpdmF0ZSBsYWJlbDogY2MuTGFiZWw7XHJcbiAgICBwdWJsaWMgaXNBbmltaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlLCBwdWJsaWMgY2hhaXI6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLmxhYmVsID0gPGNjLkxhYmVsPnRoaXMuZ2V0Q29tcG9uZW50KFwiY291bnRMYmxcIiwgY2MuTGFiZWwpO1xyXG4gICAgICAgIEJid3pDb25zdERlZmluZS5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwiXCIsIHRoaXMub25CdXR0b25DTGljaywgdGhpcyk7XHJcbiAgICAgICAgQmJ3ekRhdGEuaW5zdGFuY2UucGxheWVyQ2hpcHNGbHlQb3NbdGhpcy5jaGFpcl0gPSB0aGlzLmdldENlbnRlcldvcmxkUG9zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJ1dHRvbkNMaWNrKCkge1xyXG4gICAgICAgIEJid3pDb25zdERlZmluZS5wbGF5QnRuU291bmQoKTtcclxuICAgICAgICBHYW1lLlNlcnZlci5zZW5kKEJid3pDb25zdERlZmluZS5TRU5EX09OTElORV9QTEFZRVJfTElTVCwge30pO1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5TSE9XX05FVF9XQUlUSU5HLCBCYnd6RHJpdmVyLmluc3RhbmNlLm9ubGluZVBvcC5sb2FkaW5nS2V5LCAzKTtcclxuICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLm9ubGluZVBvcC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldENvdW50TGJsKGlzU2hvdzogYm9vbGVhbiwgY291bnQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubGFiZWwubm9kZS5hY3RpdmUgPSBpc1Nob3c7XHJcbiAgICAgICAgaWYgKGlzU2hvdylcclxuICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBjb3VudC50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pKt5pS+5Zyo57q/546p5a625oyJ6ZKu55qE5LiL5rOo5Yqo55S7XHJcbiAgICAgKiBAcGFyYW0gdGltZVNjYWxlIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcGxheUJldEFuaW0odGltZVNjYWxlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0FuaW1pbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdHdlZW4gPSBHYW1lLlR3ZWVuLmdldCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMuaXNBbmltaW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSAxO1xyXG4gICAgICAgIHR3ZWVuLmRlbGF5KDAuMSlcclxuICAgICAgICAgICAgLnRvKDAuNiAqIHRpbWVTY2FsZSwgeyBzY2FsZTogMS4wNSB9LCBjYy5lYXNlUXVhcnRpY0FjdGlvbkluT3V0KCkpXHJcbiAgICAgICAgICAgIC50bygwLjQgKiB0aW1lU2NhbGUsIHsgc2NhbGU6IDEgfSwgY2MuZWFzZUN1YmljQWN0aW9uSW5PdXQoKSlcclxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0FuaW1pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldENlbnRlcldvcmxkUG9zKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0aGlzLm5vZGUucG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckJ5Um91bmQoKSB7XHJcbiAgICAgICAgc3VwZXIuY2xlYXJCeVJvdW5kKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMTtcclxuICAgICAgICB0aGlzLmlzQW5pbWluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLy/ov5Tlm57lpLTlg4/kuYvpl7TngrnnmoTkuJbnlYzlnZDmoIdcclxuICAgIHB1YmxpYyBnZXRDaGlwU3RhcnRQb3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHRoaXMubm9kZS5wb3NpdGlvbik7XHJcbiAgICB9XHJcbn1cclxuIl19