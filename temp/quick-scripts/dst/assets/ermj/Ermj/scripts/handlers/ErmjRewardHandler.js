
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/handlers/ErmjRewardHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ec007q1tspA0pywllH6/cNJ', 'ErmjRewardHandler');
// ermj/Ermj/scripts/handlers/ErmjRewardHandler.ts

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
var ErmjDriver_1 = require("../ErmjDriver");
var ErmjBaseHandler_1 = require("./ErmjBaseHandler");
var ErmjRewardHandler = /** @class */ (function (_super) {
    __extends(ErmjRewardHandler, _super);
    function ErmjRewardHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjRewardHandler.prototype.execute = function (msg) {
        var _this = this;
        this.mainUI.askBtnView.setAutoPlayBtnShow(true);
        this.context.set(this.Define.FieldInSettle, true);
        this.mainUI.callAllPlayers("showStateSp", false);
        this.mainUI.askNoticeView.setTimerShow(false);
        this.mainUI.selfPlayView.resetSelectMj();
        this.mainUI.selfPlayView.active = false;
        this.mainUI.askActionView.active = false;
        var winFlag = msg._para.win_flag;
        var detailMap = msg._para.details || {}; // 赢家番map
        var handCardMap = msg._para.all_hand_cards || {}; // 所有人现存手牌
        var darkCardMap = msg._para.all_an_kongs || {}; // 暗杠牌
        var delay = 0;
        for (var chair in handCardMap) {
            var localSeat = this.SitHelper.serverSToLocalN(Number(chair));
            this.mainUI.callMjPlayer(localSeat, "showDownHand", true, handCardMap[chair], !!detailMap[chair]);
            if (localSeat != this.context.selfLocalSeat)
                this.mainUI.callMjPlayer(localSeat, "showDarkKongSeen", darkCardMap[chair] || []);
        }
        delay += 0.5;
        if (winFlag != 0) {
            Game.Component.scheduleOnce(function () {
                for (var chair in detailMap) {
                    var info = detailMap[chair];
                    var localSeat = _this.SitHelper.serverSToLocalN(Number(chair));
                    var fanIndex = 10000;
                    for (var key in info.fan_detail) { // 找到最小的index 即最大番型展示
                        if (fanIndex > Number(key)) {
                            fanIndex = Number(key);
                        }
                    }
                    if (fanIndex != 10000)
                        _this.mainUI.callPlayer(localSeat, "showFanType", true, fanIndex);
                }
            }, delay);
            delay += 1.5;
        }
        Game.Component.scheduleOnce(function () {
            if (winFlag == 0) {
                _this.mainUI.flowView.active = true;
            }
            else {
                _this.mainUI.settleView.active = true;
                _this.mainUI.settleView.showSettleInfo(winFlag == 1, msg._para.award, msg._para.fan, detailMap, handCardMap);
                // this.mainUI.settleView.delayShowActionBtn(time);     // 由leave-103控制显示
            }
        }, delay);
        ErmjDriver_1.default.instance.mainUI.taskManager.reqGetCommisionInfo();
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "ErmjLeaveHandler", delay + 0.1);
    };
    ErmjRewardHandler.prototype.executeSync = function (msg) {
        this.mainUI.diceAnimComp.node.active = false;
        this.context.set(this.Define.FieldInSettle, true);
        this.mainUI.callAllPlayers("showStateSp", false);
        this.mainUI.askNoticeView.setTimerShow(false);
        this.mainUI.selfPlayView.resetSelectMj();
        this.mainUI.selfPlayView.active = false;
        var winFlag = msg._para.win_flag;
        var detailMap = msg._para.details || {}; // 赢家番map
        var handCardMap = msg._para.all_hand_cards || {}; // 所有人现存手牌
        var darkCardMap = msg._para.all_an_kongs || {}; // 暗杠牌
        for (var chair in handCardMap) {
            var localSeat = this.SitHelper.serverSToLocalN(Number(chair));
            this.mainUI.callMjPlayer(localSeat, "showDownHand", true, handCardMap[chair], !!detailMap[chair]);
            if (localSeat != this.context.selfLocalSeat)
                this.mainUI.callMjPlayer(localSeat, "showDarkKongSeen", darkCardMap[chair] || []);
        }
        if (winFlag == 0) {
            this.mainUI.flowView.active = true;
        }
        else {
            this.mainUI.settleView.active = true;
            this.mainUI.settleView.showSettleInfo(winFlag == 1, msg._para.award, msg._para.fan, detailMap, handCardMap);
            // this.mainUI.settleView.delayShowActionBtn(time);
        }
    };
    return ErmjRewardHandler;
}(ErmjBaseHandler_1.default));
exports.default = ErmjRewardHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcaGFuZGxlcnNcXEVybWpSZXdhcmRIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUF1QztBQUN2QyxxREFBZ0Q7QUFFaEQ7SUFBK0MscUNBQWU7SUFBOUQ7O0lBcUZBLENBQUM7SUFwRmEsbUNBQU8sR0FBakIsVUFBa0IsR0FBRztRQUFyQixpQkFxREM7UUFwREcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFekMsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDakMsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQVEsU0FBUztRQUN6RCxJQUFJLFdBQVcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLGNBQWMsSUFBSSxFQUFFLENBQUMsQ0FBSSxVQUFVO1FBQy9ELElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQyxLQUFL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RSxDQUFDLENBQUM7U0FDekY7UUFFRCxJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUM7WUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ3RDO2FBQ0c7WUFDQSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUM1RyxtREFBbUQ7U0FDdEQ7SUFDTCxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQXJGQSxBQXFGQyxDQXJGOEMseUJBQWUsR0FxRjdEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVybWpEcml2ZXIgZnJvbSBcIi4uL0VybWpEcml2ZXJcIjtcclxuaW1wb3J0IEVybWpCYXNlSGFuZGxlciBmcm9tIFwiLi9Fcm1qQmFzZUhhbmRsZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVybWpSZXdhcmRIYW5kbGVyIGV4dGVuZHMgRXJtakJhc2VIYW5kbGVye1xyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGUobXNnKXtcclxuICAgICAgICB0aGlzLm1haW5VSS5hc2tCdG5WaWV3LnNldEF1dG9QbGF5QnRuU2hvdyh0cnVlKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuc2V0KHRoaXMuRGVmaW5lLkZpZWxkSW5TZXR0bGUsIHRydWUpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmNhbGxBbGxQbGF5ZXJzKFwic2hvd1N0YXRlU3BcIiwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmFza05vdGljZVZpZXcuc2V0VGltZXJTaG93KGZhbHNlKTtcclxuICAgICAgICB0aGlzLm1haW5VSS5zZWxmUGxheVZpZXcucmVzZXRTZWxlY3RNaigpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLnNlbGZQbGF5Vmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1haW5VSS5hc2tBY3Rpb25WaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB3aW5GbGFnID0gbXNnLl9wYXJhLndpbl9mbGFnO1xyXG4gICAgICAgIGxldCBkZXRhaWxNYXAgPSBtc2cuX3BhcmEuZGV0YWlscyB8fCB7fTsgICAgICAgIC8vIOi1ouWutueVqm1hcFxyXG4gICAgICAgIGxldCBoYW5kQ2FyZE1hcCA9IG1zZy5fcGFyYS5hbGxfaGFuZF9jYXJkcyB8fCB7fTsgICAgLy8g5omA5pyJ5Lq6546w5a2Y5omL54mMXHJcbiAgICAgICAgbGV0IGRhcmtDYXJkTWFwID0gbXNnLl9wYXJhLmFsbF9hbl9rb25ncyB8fCB7fTsgICAgIC8vIOaal+adoOeJjFxyXG5cclxuICAgICAgICBsZXQgZGVsYXkgPSAwO1xyXG4gICAgICAgIGZvcihsZXQgY2hhaXIgaW4gaGFuZENhcmRNYXApe1xyXG4gICAgICAgICAgICBsZXQgbG9jYWxTZWF0ID0gdGhpcy5TaXRIZWxwZXIuc2VydmVyU1RvTG9jYWxOKE51bWJlcihjaGFpcikpO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5VSS5jYWxsTWpQbGF5ZXIobG9jYWxTZWF0LCBcInNob3dEb3duSGFuZFwiLCB0cnVlLCBoYW5kQ2FyZE1hcFtjaGFpcl0sICEhZGV0YWlsTWFwW2NoYWlyXSk7XHJcbiAgICAgICAgICAgIGlmIChsb2NhbFNlYXQgIT0gdGhpcy5jb250ZXh0LnNlbGZMb2NhbFNlYXQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5VSS5jYWxsTWpQbGF5ZXIobG9jYWxTZWF0LCBcInNob3dEYXJrS29uZ1NlZW5cIiwgZGFya0NhcmRNYXBbY2hhaXJdIHx8IFtdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVsYXkgKz0gMC41O1xyXG4gICAgICAgIGlmICh3aW5GbGFnICE9IDApe1xyXG4gICAgICAgICAgICBHYW1lLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgY2hhaXIgaW4gZGV0YWlsTWFwKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5mbyA9IGRldGFpbE1hcFtjaGFpcl07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihOdW1iZXIoY2hhaXIpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmFuSW5kZXggPSAxMDAwMDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGtleSBpbiBpbmZvLmZhbl9kZXRhaWwpeyAgICAgICAvLyDmib7liLDmnIDlsI/nmoRpbmRleCDljbPmnIDlpKfnlarlnovlsZXnpLpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZhbkluZGV4ID4gTnVtYmVyKGtleSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFuSW5kZXggPSBOdW1iZXIoa2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmFuSW5kZXggIT0gMTAwMDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFpblVJLmNhbGxQbGF5ZXIobG9jYWxTZWF0LCBcInNob3dGYW5UeXBlXCIsIHRydWUsIGZhbkluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgICAgICAgICBkZWxheSArPSAxLjU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHYW1lLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgaWYgKHdpbkZsYWcgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5VSS5mbG93Vmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5VSS5zZXR0bGVWaWV3LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5VSS5zZXR0bGVWaWV3LnNob3dTZXR0bGVJbmZvKHdpbkZsYWcgPT0gMSwgbXNnLl9wYXJhLmF3YXJkLCBtc2cuX3BhcmEuZmFuLCBkZXRhaWxNYXAsIGhhbmRDYXJkTWFwKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMubWFpblVJLnNldHRsZVZpZXcuZGVsYXlTaG93QWN0aW9uQnRuKHRpbWUpOyAgICAgLy8g55SxbGVhdmUtMTAz5o6n5Yi25pi+56S6XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBkZWxheSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgRXJtakRyaXZlci5pbnN0YW5jZS5tYWluVUkudGFza01hbmFnZXIucmVxR2V0Q29tbWlzaW9uSW5mbygpO1xyXG4gICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9BRERUSU1FTE9DSywgXCJFcm1qTGVhdmVIYW5kbGVyXCIsIGRlbGF5ICsgMC4xKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZVN5bmMobXNnKXtcclxuICAgICAgICB0aGlzLm1haW5VSS5kaWNlQW5pbUNvbXAubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuc2V0KHRoaXMuRGVmaW5lLkZpZWxkSW5TZXR0bGUsIHRydWUpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmNhbGxBbGxQbGF5ZXJzKFwic2hvd1N0YXRlU3BcIiwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmFza05vdGljZVZpZXcuc2V0VGltZXJTaG93KGZhbHNlKTtcclxuICAgICAgICB0aGlzLm1haW5VSS5zZWxmUGxheVZpZXcucmVzZXRTZWxlY3RNaigpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLnNlbGZQbGF5Vmlldy5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgbGV0IHdpbkZsYWcgPSBtc2cuX3BhcmEud2luX2ZsYWc7XHJcbiAgICAgICAgbGV0IGRldGFpbE1hcCA9IG1zZy5fcGFyYS5kZXRhaWxzIHx8IHt9OyAgICAgICAgLy8g6LWi5a6255WqbWFwXHJcbiAgICAgICAgbGV0IGhhbmRDYXJkTWFwID0gbXNnLl9wYXJhLmFsbF9oYW5kX2NhcmRzIHx8IHt9OyAgICAvLyDmiYDmnInkurrnjrDlrZjmiYvniYxcclxuICAgICAgICBsZXQgZGFya0NhcmRNYXAgPSBtc2cuX3BhcmEuYWxsX2FuX2tvbmdzIHx8IHt9OyAgICAgLy8g5pqX5p2g54mMXHJcblxyXG4gICAgICAgIGZvcihsZXQgY2hhaXIgaW4gaGFuZENhcmRNYXApe1xyXG4gICAgICAgICAgICBsZXQgbG9jYWxTZWF0ID0gdGhpcy5TaXRIZWxwZXIuc2VydmVyU1RvTG9jYWxOKE51bWJlcihjaGFpcikpO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5VSS5jYWxsTWpQbGF5ZXIobG9jYWxTZWF0LCBcInNob3dEb3duSGFuZFwiLCB0cnVlLCBoYW5kQ2FyZE1hcFtjaGFpcl0sICEhZGV0YWlsTWFwW2NoYWlyXSk7XHJcbiAgICAgICAgICAgIGlmIChsb2NhbFNlYXQgIT0gdGhpcy5jb250ZXh0LnNlbGZMb2NhbFNlYXQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5VSS5jYWxsTWpQbGF5ZXIobG9jYWxTZWF0LCBcInNob3dEYXJrS29uZ1NlZW5cIiwgZGFya0NhcmRNYXBbY2hhaXJdIHx8IFtdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh3aW5GbGFnID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLm1haW5VSS5mbG93Vmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLm1haW5VSS5zZXR0bGVWaWV3LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLnNldHRsZVZpZXcuc2hvd1NldHRsZUluZm8od2luRmxhZyA9PSAxLCBtc2cuX3BhcmEuYXdhcmQsIG1zZy5fcGFyYS5mYW4sIGRldGFpbE1hcCwgaGFuZENhcmRNYXApO1xyXG4gICAgICAgICAgICAvLyB0aGlzLm1haW5VSS5zZXR0bGVWaWV3LmRlbGF5U2hvd0FjdGlvbkJ0bih0aW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=