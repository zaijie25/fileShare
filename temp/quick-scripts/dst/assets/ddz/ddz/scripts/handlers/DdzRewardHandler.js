
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/handlers/DdzRewardHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0ec66nynf5HcIK+nJRCou+A', 'DdzRewardHandler');
// ddz/ddz/scripts/handlers/DdzRewardHandler.ts

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
var DdzDriver_1 = require("../DdzDriver");
var DdzBaseHandler_1 = require("./DdzBaseHandler");
var DdzRewardHandler = /** @class */ (function (_super) {
    __extends(DdzRewardHandler, _super);
    function DdzRewardHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzRewardHandler.prototype.execute = function (msg) {
        Global.Audio.stopMusic();
        this.context.set(this.Define.FieldInSettle, true);
        var time = (msg._timeo * 1000 - (Date.now() - msg._receiveTime)) / 1000;
        if (!time || time <= this.Define.PlayRoleWinTime + this.Define.FloatScoreTime)
            time = this.Define.PlayRoleWinTime + this.Define.FloatScoreTime + 1;
        // this.mainUI.gameSettleView.delayShowActionBtn(time);     // 由leave-103控制显示
        this.mainUI.playAwardAnim(msg._para.awards, msg._para.details);
        if (this.context.syncMode) {
            DdzDriver_1.default.instance.mainUI.taskManager.reqGetCommisionInfo();
        }
    };
    DdzRewardHandler.prototype.executeSync = function (msg) {
        this.execute(msg);
    };
    return DdzRewardHandler;
}(DdzBaseHandler_1.default));
exports.default = DdzRewardHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGhhbmRsZXJzXFxEZHpSZXdhcmRIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUFxQztBQUNyQyxtREFBOEM7QUFFOUM7SUFBOEMsb0NBQWM7SUFBNUQ7O0lBa0JBLENBQUM7SUFqQmEsa0NBQU8sR0FBakIsVUFBa0IsR0FBRztRQUNqQixNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYztZQUN6RSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO1FBRXhFLDZFQUE2RTtRQUM3RSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9ELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUM7WUFDdEIsbUJBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQy9EO0lBQ0wsQ0FBQztJQUVTLHNDQUFXLEdBQXJCLFVBQXNCLEdBQUc7UUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQWxCQSxBQWtCQyxDQWxCNkMsd0JBQWMsR0FrQjNEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERkekRyaXZlciBmcm9tIFwiLi4vRGR6RHJpdmVyXCI7XHJcbmltcG9ydCBEZHpCYXNlSGFuZGxlciBmcm9tIFwiLi9EZHpCYXNlSGFuZGxlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGR6UmV3YXJkSGFuZGxlciBleHRlbmRzIERkekJhc2VIYW5kbGVye1xyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGUobXNnKXtcclxuICAgICAgICBHbG9iYWwuQXVkaW8uc3RvcE11c2ljKCk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnNldCh0aGlzLkRlZmluZS5GaWVsZEluU2V0dGxlLCB0cnVlKTtcclxuICAgICAgICBsZXQgdGltZSA9IChtc2cuX3RpbWVvICoxMDAwIC0gKERhdGUubm93KCkgLSBtc2cuX3JlY2VpdmVUaW1lKSkgLyAxMDAwO1xyXG4gICAgICAgIGlmICghdGltZSB8fCB0aW1lIDw9IHRoaXMuRGVmaW5lLlBsYXlSb2xlV2luVGltZSArIHRoaXMuRGVmaW5lLkZsb2F0U2NvcmVUaW1lKVxyXG4gICAgICAgICAgICB0aW1lID0gdGhpcy5EZWZpbmUuUGxheVJvbGVXaW5UaW1lICsgdGhpcy5EZWZpbmUuRmxvYXRTY29yZVRpbWUgKyAxO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHRoaXMubWFpblVJLmdhbWVTZXR0bGVWaWV3LmRlbGF5U2hvd0FjdGlvbkJ0bih0aW1lKTsgICAgIC8vIOeUsWxlYXZlLTEwM+aOp+WItuaYvuekulxyXG4gICAgICAgIHRoaXMubWFpblVJLnBsYXlBd2FyZEFuaW0obXNnLl9wYXJhLmF3YXJkcywgbXNnLl9wYXJhLmRldGFpbHMpO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRleHQuc3luY01vZGUpe1xyXG4gICAgICAgICAgICBEZHpEcml2ZXIuaW5zdGFuY2UubWFpblVJLnRhc2tNYW5hZ2VyLnJlcUdldENvbW1pc2lvbkluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGVTeW5jKG1zZyl7XHJcbiAgICAgICAgdGhpcy5leGVjdXRlKG1zZyk7XHJcbiAgICB9XHJcbn0iXX0=