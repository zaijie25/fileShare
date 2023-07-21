
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/handlers/ErmjLeaveHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bc4f4WulkVAgr4dE8rAWFj7', 'ErmjLeaveHandler');
// ermj/Ermj/scripts/handlers/ErmjLeaveHandler.ts

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
var ErmjBaseHandler_1 = require("./ErmjBaseHandler");
var ErmjDriver_1 = require("../ErmjDriver");
var ErmjLeaveHandler = /** @class */ (function (_super) {
    __extends(ErmjLeaveHandler, _super);
    function ErmjLeaveHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjLeaveHandler.prototype.refreshData = function (msg) {
        var sit = this.SitHelper.serverSToLocalN(msg._src);
        if (this.context.playerList[sit]) {
            Logger.error("leave", sit, msg._src);
            this.context.playerList[sit].clear();
        }
        else {
            Logger.error("leave error");
        }
    };
    ErmjLeaveHandler.prototype.execute = function (msg) {
        var sit = this.SitHelper.serverSToLocalN(msg._src);
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "ErmjLeaveHandler", this.Define.HeadMoveTime + 0.1);
        if (msg._src == this.context.selfSrc) {
            //重新匹配
            if (msg._para && msg._para.Reason && msg._para.Reason._reason == 103) {
                Game.Server.clearData();
                Game.Tween.clear();
                Global.HallServer.setSession(null);
                var gameTimes = msg._para && msg._para.GameTimes || 0;
                if (gameTimes > 0) {
                    Game.Server.stopGame();
                    this.mainUI.settleView.showActionBtn(true);
                    this.mainUI.flowView.showActionBtn(true);
                }
                else {
                    this.mainUI.flowView.showActionBtn(false);
                    this.mainUI.settleView.showActionBtn(false);
                    this.mainUI.matchPlayerView.active = false;
                    Game.Server.clearDst();
                    Game.Control.trySendEnter({ "_from": "jump" });
                }
            }
            else {
                this.mainUI.callPlayer(sit, "hide");
                if (msg._para && msg._para.Reason && msg._para.Reason._reason == 102) {
                    Global.Toolkit.transmitHallMsg("金币不够啦，是否前往充值？", function () {
                        Global.UI.show("WndRecharge");
                    });
                }
                else if (msg._para && msg._para.Reason && msg._para.Reason._explain) {
                    Global.Toolkit.transmitHallMsg(msg._para.Reason._explain, null, null, 1);
                }
                ErmjDriver_1.default.instance.leaveGame();
            }
        }
        else {
            if (this.context.get(this.Define.FieldInSettle)) // 结算中 不去处理其他玩家的leave
                return;
            if (msg._para && msg._para.Reason && (msg._para.Reason._reason == 103 || msg._para.Reason._reason == 105)) {
                // 103 105不处理
            }
            else {
                this.mainUI.callPlayer(sit, "hide");
            }
        }
    };
    ErmjLeaveHandler.prototype.checkInQueue = function (msg) {
        //不是自己 就放到对列中
        if (msg._src != Game.Context.selfSrc)
            return true;
        if (msg._para && msg._para.Reason && (msg._para.Reason._reason == 102 || msg._para.Reason._reason == 103 || msg._para.Reason._reason == 20)) {
            //重新匹配中不发送心跳
            if (msg._para.Reason._reason == 103) {
                if (Game.Server.stopHeartBeat)
                    Game.Server.stopHeartBeat();
            }
            return true;
        }
        return false;
    };
    return ErmjLeaveHandler;
}(ErmjBaseHandler_1.default));
exports.default = ErmjLeaveHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcaGFuZGxlcnNcXEVybWpMZWF2ZUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQWdEO0FBQ2hELDRDQUF1QztBQUV2QztJQUE4QyxvQ0FBZTtJQUE3RDs7SUEyRUEsQ0FBQztJQTFFYSxzQ0FBVyxHQUFyQixVQUFzQixHQUFHO1FBQ3JCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFDO1lBQzVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDeEM7YUFDRztZQUNBLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRVMsa0NBQU8sR0FBakIsVUFBa0IsR0FBRztRQUNqQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLGtCQUFrQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRTdGLElBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBQztZQUNoQyxNQUFNO1lBQ04sSUFBRyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFL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QUksR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU87WUFDaEMsT0FBTyxJQUFJLENBQUM7UUFDaEIsSUFBSSxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksR0FBRyxJQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsRUFBQztZQUN6SSxZQUFZO1lBQ1osSUFBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksR0FBRyxFQUFDO2dCQUMvQixJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYTtvQkFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUNuQztZQUNELE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQTNFQSxBQTJFQyxDQTNFNkMseUJBQWUsR0EyRTVEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVybWpCYXNlSGFuZGxlciBmcm9tIFwiLi9Fcm1qQmFzZUhhbmRsZXJcIjtcclxuaW1wb3J0IEVybWpEcml2ZXIgZnJvbSBcIi4uL0VybWpEcml2ZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVybWpMZWF2ZUhhbmRsZXIgZXh0ZW5kcyBFcm1qQmFzZUhhbmRsZXJ7XHJcbiAgICBwcm90ZWN0ZWQgcmVmcmVzaERhdGEobXNnKXtcclxuICAgICAgICBsZXQgc2l0ID0gdGhpcy5TaXRIZWxwZXIuc2VydmVyU1RvTG9jYWxOKG1zZy5fc3JjKTtcclxuICAgICAgICBpZih0aGlzLmNvbnRleHQucGxheWVyTGlzdFtzaXRdKXtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwibGVhdmVcIiwgc2l0LCBtc2cuX3NyYyk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5wbGF5ZXJMaXN0W3NpdF0uY2xlYXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwibGVhdmUgZXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlKG1zZyl7XHJcbiAgICAgICAgbGV0IHNpdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihtc2cuX3NyYyk7XHJcbiAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX0FERFRJTUVMT0NLLCBcIkVybWpMZWF2ZUhhbmRsZXJcIiwgdGhpcy5EZWZpbmUuSGVhZE1vdmVUaW1lICsgMC4xKTtcclxuXHJcbiAgICAgICAgaWYobXNnLl9zcmMgPT0gdGhpcy5jb250ZXh0LnNlbGZTcmMpe1xyXG4gICAgICAgICAgICAvL+mHjeaWsOWMuemFjVxyXG4gICAgICAgICAgICBpZihtc2cuX3BhcmEgJiYgbXNnLl9wYXJhLlJlYXNvbiAmJiBtc2cuX3BhcmEuUmVhc29uLl9yZWFzb24gPT0gMTAzKXtcclxuICAgICAgICAgICAgICAgIEdhbWUuU2VydmVyLmNsZWFyRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgR2FtZS5Ud2Vlbi5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2V0U2Vzc2lvbihudWxsKTtcclxuICAgICAgICAgICAgICAgIGxldCBnYW1lVGltZXMgPSBtc2cuX3BhcmEgJiYgbXNnLl9wYXJhLkdhbWVUaW1lcyB8fCAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVUaW1lcyA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWUuU2VydmVyLnN0b3BHYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWluVUkuc2V0dGxlVmlldy5zaG93QWN0aW9uQnRuKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFpblVJLmZsb3dWaWV3LnNob3dBY3Rpb25CdG4odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFpblVJLmZsb3dWaWV3LnNob3dBY3Rpb25CdG4oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFpblVJLnNldHRsZVZpZXcuc2hvd0FjdGlvbkJ0bihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWluVUkubWF0Y2hQbGF5ZXJWaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWUuU2VydmVyLmNsZWFyRHN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5Db250cm9sLnRyeVNlbmRFbnRlcih7XCJfZnJvbVwiOlwianVtcFwifSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpblVJLmNhbGxQbGF5ZXIoc2l0LCBcImhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAobXNnLl9wYXJhICYmIG1zZy5fcGFyYS5SZWFzb24gJiYgbXNnLl9wYXJhLlJlYXNvbi5fcmVhc29uID09IDEwMikge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5Ub29sa2l0LnRyYW5zbWl0SGFsbE1zZyhcIumHkeW4geS4jeWkn+WVpu+8jOaYr+WQpuWJjeW+gOWFheWAvO+8n1wiLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kUmVjaGFyZ2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKCBtc2cuX3BhcmEgJiYgIG1zZy5fcGFyYS5SZWFzb24gJiYgbXNnLl9wYXJhLlJlYXNvbi5fZXhwbGFpbil7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlRvb2xraXQudHJhbnNtaXRIYWxsTXNnKG1zZy5fcGFyYS5SZWFzb24uX2V4cGxhaW4sbnVsbCxudWxsLDEpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBFcm1qRHJpdmVyLmluc3RhbmNlLmxlYXZlR2FtZSgpOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZXh0LmdldCh0aGlzLkRlZmluZS5GaWVsZEluU2V0dGxlKSkgICAgLy8g57uT566X5LitIOS4jeWOu+WkhOeQhuWFtuS7lueOqeWutueahGxlYXZlXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGlmKG1zZy5fcGFyYSAmJiBtc2cuX3BhcmEuUmVhc29uICYmIChtc2cuX3BhcmEuUmVhc29uLl9yZWFzb24gPT0gMTAzIHx8IG1zZy5fcGFyYS5SZWFzb24uX3JlYXNvbiA9PSAxMDUpKXtcclxuICAgICAgICAgICAgICAgIC8vIDEwMyAxMDXkuI3lpITnkIZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluVUkuY2FsbFBsYXllcihzaXQsIFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tJblF1ZXVlKG1zZyl7XHJcbiAgICAgICAgLy/kuI3mmK/oh6rlt7Eg5bCx5pS+5Yiw5a+55YiX5LitXHJcbiAgICAgICAgaWYgKG1zZy5fc3JjICE9IEdhbWUuQ29udGV4dC5zZWxmU3JjKSBcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgaWYgKG1zZy5fcGFyYSAmJiBtc2cuX3BhcmEuUmVhc29uICYmIChtc2cuX3BhcmEuUmVhc29uLl9yZWFzb24gPT0gMTAyIHx8IG1zZy5fcGFyYS5SZWFzb24uX3JlYXNvbiA9PSAxMDMgIHx8IG1zZy5fcGFyYS5SZWFzb24uX3JlYXNvbiA9PSAyMCkpe1xyXG4gICAgICAgICAgICAvL+mHjeaWsOWMuemFjeS4reS4jeWPkemAgeW/g+i3s1xyXG4gICAgICAgICAgICBpZihtc2cuX3BhcmEuUmVhc29uLl9yZWFzb24gPT0gMTAzKXtcclxuICAgICAgICAgICAgICAgIGlmKEdhbWUuU2VydmVyLnN0b3BIZWFydEJlYXQpXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5TZXJ2ZXIuc3RvcEhlYXJ0QmVhdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0iXX0=