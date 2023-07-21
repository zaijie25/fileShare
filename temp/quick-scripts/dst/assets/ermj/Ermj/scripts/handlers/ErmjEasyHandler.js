
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/handlers/ErmjEasyHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8b4a7oj5OpPFoucGP/3SfdU', 'ErmjEasyHandler');
// ermj/Ermj/scripts/handlers/ErmjEasyHandler.ts

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
exports.ErmjLeaveMatchHandler = exports.ErmjOfflineHandler = exports.ErmjRefreshHandler = exports.ErmjWaitHandler = exports.ErmjEndHandler = exports.ErmjStartHandler = exports.ErmjReadyHandler = void 0;
var ErmjBaseHandler_1 = require("./ErmjBaseHandler");
var ErmjDriver_1 = require("../ErmjDriver");
var ErmjReadyHandler = /** @class */ (function (_super) {
    __extends(ErmjReadyHandler, _super);
    function ErmjReadyHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjReadyHandler.prototype.execute = function (msg) {
        this.context.isWaitMatch = false;
        this.mainUI.matchPlayerView.active = false;
        // let time = msg._timeo *1000 - (Date.now() - msg._receiveTime);
        // // if (time <= 0)
        // //     time = 1000;
        // if (time >= 1000)
        //     this.mainUI.showActionTimer(true, 0, time, null);
    };
    ErmjReadyHandler.prototype.executeSync = function (msg) {
        this.execute(msg);
    };
    return ErmjReadyHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjReadyHandler = ErmjReadyHandler;
var ErmjStartHandler = /** @class */ (function (_super) {
    __extends(ErmjStartHandler, _super);
    function ErmjStartHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjStartHandler.prototype.refreshData = function (msg) {
        this.context.set(this.Define.FieldGameStart, true);
    };
    ErmjStartHandler.prototype.execute = function (msg) {
        // 游戏开始时 显示设定方位盒
        this.mainUI.askNoticeView.active = true;
        this.mainUI.askNoticeView.setChairLook(this.context.selfSrc);
        this.context.isWaitMatch = false; // 游戏开始取消匹配状态
        this.mainUI.matchPlayerView.active = false;
        this.mainUI.callAllPlayers("setMatched", true);
        this.mainUI.gameStartView.active = true;
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "ErmjStartHandler", 1);
    };
    ErmjStartHandler.prototype.executeSync = function (msg) {
        // 游戏开始时 显示设定方位盒
        this.mainUI.askNoticeView.active = true;
        this.mainUI.askNoticeView.setChairLook(this.context.selfSrc);
        this.mainUI.callAllPlayers("setMatched", false);
    };
    return ErmjStartHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjStartHandler = ErmjStartHandler;
var ErmjEndHandler = /** @class */ (function (_super) {
    __extends(ErmjEndHandler, _super);
    function ErmjEndHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjEndHandler.prototype.refreshData = function (msg) {
        //清理单局数据
        this.context.clearByRound();
    };
    ErmjEndHandler.prototype.execute = function (msg) {
        Game.Tween.clear();
        Game.Component.unscheduleAllCallbacks();
    };
    return ErmjEndHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjEndHandler = ErmjEndHandler;
//等待下一局
var ErmjWaitHandler = /** @class */ (function (_super) {
    __extends(ErmjWaitHandler, _super);
    function ErmjWaitHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjWaitHandler.prototype.execute = function (msg) {
        if (msg._para.status == 1) {
            Logger.log("结算中");
        }
        else {
            this.mainUI.matchPlayerView.active = true;
        }
    };
    return ErmjWaitHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjWaitHandler = ErmjWaitHandler;
//刷新玩家信息
var ErmjRefreshHandler = /** @class */ (function (_super) {
    __extends(ErmjRefreshHandler, _super);
    function ErmjRefreshHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // "_param":{
    //     "_cmd":"refresh",
    //     "_src":"p5",
    //     "_para":{
    //         "app_id":12,
    //         "user_id":680272,
    //         "nick_name":"贵宾680272",
    //         "headimg":"5",
    //         "point":475,
    //         "user_type":1,
    //         "register_ip":"192.168.1.224",
    //         "os_type":1,
    //         "itime":1556027819,
    //         "last_login_time":"2019-04-30 23:55:55"
    //     }
    // }
    ErmjRefreshHandler.prototype.refreshData = function (msg) {
        var src = msg._src;
        var localSeat = this.SitHelper.serverSToLocalN(src);
        if (this.context.playerList[localSeat] == null)
            return;
        this.context.playerList[localSeat].refresh(msg._para);
        if (localSeat == this.context.selfLocalSeat) {
            Global.PlayerData.point = this.context.playerList[localSeat].point;
        }
    };
    ErmjRefreshHandler.prototype.execute = function (msg) {
        var src = msg._src;
        var localSeat = this.SitHelper.serverSToLocalN(src);
        if (this.context.playerList[localSeat] == null)
            return;
        this.mainUI.callPlayer(localSeat, "setPlayerPoint", this.context.playerList[localSeat].point);
    };
    return ErmjRefreshHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjRefreshHandler = ErmjRefreshHandler;
var ErmjOfflineHandler = /** @class */ (function (_super) {
    __extends(ErmjOfflineHandler, _super);
    function ErmjOfflineHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjOfflineHandler.prototype.execute = function (msg) {
        var src = msg._src;
        var localSeat = this.SitHelper.serverSToLocalN(src);
        Logger.log(localSeat, '------->offline');
        // 重连需要补发状态，暂不处理离线
    };
    return ErmjOfflineHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjOfflineHandler = ErmjOfflineHandler;
var ErmjLeaveMatchHandler = /** @class */ (function (_super) {
    __extends(ErmjLeaveMatchHandler, _super);
    function ErmjLeaveMatchHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjLeaveMatchHandler.prototype.execute = function (msg) {
        var _this = this;
        this.mainUI.matchPlayerView.active = false;
        if (this.context.isWaitMatch) {
            this.context.isWaitMatch = false;
            Global.UI.showYesNoBox('匹配超时，是否重新匹配？', function () {
                Game.Control.trySendEnter({ "_from": "jump" }); // 断socket则不能用这个
            }, function () {
                Game.Server.send(_this.Define.CmdLeave, { "IsClose": 1 });
                ErmjDriver_1.default.instance.leaveGame();
            });
        }
    };
    return ErmjLeaveMatchHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjLeaveMatchHandler = ErmjLeaveMatchHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcaGFuZGxlcnNcXEVybWpFYXN5SGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQWdEO0FBQ2hELDRDQUF1QztBQUV2QztJQUFzQyxvQ0FBZTtJQUFyRDs7SUFjQSxDQUFDO0lBYmEsa0NBQU8sR0FBakIsVUFBa0IsR0FBRztRQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMzQyxpRUFBaUU7UUFDakUsb0JBQW9CO1FBQ3BCLHNCQUFzQjtRQUN0QixvQkFBb0I7UUFDcEIsd0RBQXdEO0lBQzVELENBQUM7SUFFUyxzQ0FBVyxHQUFyQixVQUFzQixHQUFHO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0FkQSxBQWNDLENBZHFDLHlCQUFlLEdBY3BEO0FBZFksNENBQWdCO0FBZ0I3QjtJQUFzQyxvQ0FBZTtJQUFyRDs7SUF1QkEsQ0FBQztJQXRCYSxzQ0FBVyxHQUFyQixVQUFzQixHQUFHO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFUyxrQ0FBTyxHQUFqQixVQUFrQixHQUFHO1FBQ2pCLGdCQUFnQjtRQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTdELElBQUksQ0FBQyxPQUFPLENB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Q0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDM0MsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBQztZQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDakMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFO2dCQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUksZ0JBQWdCO1lBQ3BFLENBQUMsRUFBRTtnQkFDQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN6RCxvQkFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUNMLDRCQUFDO0FBQUQsQ0FiQSxBQWFDLENBYjBDLHlCQUFlLEdBYXpEO0FBYlksc0RBQXFCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVybWpCYXNlSGFuZGxlciBmcm9tIFwiLi9Fcm1qQmFzZUhhbmRsZXJcIjtcclxuaW1wb3J0IEVybWpEcml2ZXIgZnJvbSBcIi4uL0VybWpEcml2ZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFcm1qUmVhZHlIYW5kbGVyIGV4dGVuZHMgRXJtakJhc2VIYW5kbGVye1xyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGUobXNnKXtcclxuICAgICAgICB0aGlzLmNvbnRleHQuaXNXYWl0TWF0Y2ggPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1haW5VSS5tYXRjaFBsYXllclZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gbGV0IHRpbWUgPSBtc2cuX3RpbWVvICoxMDAwIC0gKERhdGUubm93KCkgLSBtc2cuX3JlY2VpdmVUaW1lKTtcclxuICAgICAgICAvLyAvLyBpZiAodGltZSA8PSAwKVxyXG4gICAgICAgIC8vIC8vICAgICB0aW1lID0gMTAwMDtcclxuICAgICAgICAvLyBpZiAodGltZSA+PSAxMDAwKVxyXG4gICAgICAgIC8vICAgICB0aGlzLm1haW5VSS5zaG93QWN0aW9uVGltZXIodHJ1ZSwgMCwgdGltZSwgbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGVTeW5jKG1zZyl7XHJcbiAgICAgICAgdGhpcy5leGVjdXRlKG1zZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFcm1qU3RhcnRIYW5kbGVyIGV4dGVuZHMgRXJtakJhc2VIYW5kbGVye1xyXG4gICAgcHJvdGVjdGVkIHJlZnJlc2hEYXRhKG1zZyl7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnNldCh0aGlzLkRlZmluZS5GaWVsZEdhbWVTdGFydCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGUobXNnKXtcclxuICAgICAgICAvLyDmuLjmiI/lvIDlp4vml7Yg5pi+56S66K6+5a6a5pa55L2N55uSXHJcbiAgICAgICAgdGhpcy5tYWluVUkuYXNrTm90aWNlVmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmFza05vdGljZVZpZXcuc2V0Q2hhaXJMb29rKHRoaXMuY29udGV4dC5zZWxmU3JjKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmlzV2FpdE1hdGNoID0gZmFsc2U7ICAgICAgIC8vIOa4uOaIj+W8gOWni+WPlua2iOWMuemFjeeKtuaAgVxyXG4gICAgICAgIHRoaXMubWFpblVJLm1hdGNoUGxheWVyVmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1haW5VSS5jYWxsQWxsUGxheWVycyhcInNldE1hdGNoZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuZ2FtZVN0YXJ0Vmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9BRERUSU1FTE9DSywgXCJFcm1qU3RhcnRIYW5kbGVyXCIsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlU3luYyhtc2cpe1xyXG4gICAgICAgIC8vIOa4uOaIj+W8gOWni+aXtiDmmL7npLrorr7lrprmlrnkvY3nm5JcclxuICAgICAgICB0aGlzLm1haW5VSS5hc2tOb3RpY2VWaWV3LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuYXNrTm90aWNlVmlldy5zZXRDaGFpckxvb2sodGhpcy5jb250ZXh0LnNlbGZTcmMpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmNhbGxBbGxQbGF5ZXJzKFwic2V0TWF0Y2hlZFwiLCBmYWxzZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFcm1qRW5kSGFuZGxlciBleHRlbmRzIEVybWpCYXNlSGFuZGxlcntcclxuICAgIHByb3RlY3RlZCByZWZyZXNoRGF0YShtc2cpe1xyXG4gICAgICAgIC8v5riF55CG5Y2V5bGA5pWw5o2uXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyQnlSb3VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlKG1zZyl7XHJcbiAgICAgICAgR2FtZS5Ud2Vlbi5jbGVhcigpO1xyXG4gICAgICAgIEdhbWUuQ29tcG9uZW50LnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTsgIFxyXG4gICAgfVxyXG59XHJcblxyXG4vL+etieW+heS4i+S4gOWxgFxyXG5leHBvcnQgY2xhc3MgRXJtaldhaXRIYW5kbGVyIGV4dGVuZHMgRXJtakJhc2VIYW5kbGVye1xyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGUobXNnKXtcclxuICAgICAgICBpZiAobXNnLl9wYXJhLnN0YXR1cyA9PSAxKXtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIue7k+eul+S4rVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkubWF0Y2hQbGF5ZXJWaWV3LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vL+WIt+aWsOeOqeWutuS/oeaBr1xyXG5leHBvcnQgY2xhc3MgRXJtalJlZnJlc2hIYW5kbGVyIGV4dGVuZHMgRXJtakJhc2VIYW5kbGVye1xyXG4gICAgLy8gXCJfcGFyYW1cIjp7XHJcbiAgICAvLyAgICAgXCJfY21kXCI6XCJyZWZyZXNoXCIsXHJcbiAgICAvLyAgICAgXCJfc3JjXCI6XCJwNVwiLFxyXG4gICAgLy8gICAgIFwiX3BhcmFcIjp7XHJcbiAgICAvLyAgICAgICAgIFwiYXBwX2lkXCI6MTIsXHJcbiAgICAvLyAgICAgICAgIFwidXNlcl9pZFwiOjY4MDI3MixcclxuICAgIC8vICAgICAgICAgXCJuaWNrX25hbWVcIjpcIui0teWuvjY4MDI3MlwiLFxyXG4gICAgLy8gICAgICAgICBcImhlYWRpbWdcIjpcIjVcIixcclxuICAgIC8vICAgICAgICAgXCJwb2ludFwiOjQ3NSxcclxuICAgIC8vICAgICAgICAgXCJ1c2VyX3R5cGVcIjoxLFxyXG4gICAgLy8gICAgICAgICBcInJlZ2lzdGVyX2lwXCI6XCIxOTIuMTY4LjEuMjI0XCIsXHJcbiAgICAvLyAgICAgICAgIFwib3NfdHlwZVwiOjEsXHJcbiAgICAvLyAgICAgICAgIFwiaXRpbWVcIjoxNTU2MDI3ODE5LFxyXG4gICAgLy8gICAgICAgICBcImxhc3RfbG9naW5fdGltZVwiOlwiMjAxOS0wNC0zMCAyMzo1NTo1NVwiXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG4gICAgcHJvdGVjdGVkIHJlZnJlc2hEYXRhKG1zZyl7XHJcbiAgICAgICAgbGV0IHNyYyA9IG1zZy5fc3JjXHJcbiAgICAgICAgbGV0IGxvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihzcmMpO1xyXG4gICAgICAgIGlmKHRoaXMuY29udGV4dC5wbGF5ZXJMaXN0W2xvY2FsU2VhdF0gPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5wbGF5ZXJMaXN0W2xvY2FsU2VhdF0ucmVmcmVzaChtc2cuX3BhcmEpO1xyXG4gICAgICAgIGlmIChsb2NhbFNlYXQgPT0gdGhpcy5jb250ZXh0LnNlbGZMb2NhbFNlYXQpe1xyXG4gICAgICAgICAgICBHbG9iYWwuUGxheWVyRGF0YS5wb2ludCA9IHRoaXMuY29udGV4dC5wbGF5ZXJMaXN0W2xvY2FsU2VhdF0ucG9pbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlKG1zZyl7XHJcbiAgICAgICAgbGV0IHNyYyA9IG1zZy5fc3JjXHJcbiAgICAgICAgbGV0IGxvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihzcmMpO1xyXG4gICAgICAgIGlmKHRoaXMuY29udGV4dC5wbGF5ZXJMaXN0W2xvY2FsU2VhdF0gPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmNhbGxQbGF5ZXIobG9jYWxTZWF0LCBcInNldFBsYXllclBvaW50XCIsIHRoaXMuY29udGV4dC5wbGF5ZXJMaXN0W2xvY2FsU2VhdF0ucG9pbnQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEVybWpPZmZsaW5lSGFuZGxlciBleHRlbmRzIEVybWpCYXNlSGFuZGxlcntcclxuICAgIHByb3RlY3RlZCBleGVjdXRlKG1zZyl7XHJcbiAgICAgICAgbGV0IHNyYyA9IG1zZy5fc3JjXHJcbiAgICAgICAgbGV0IGxvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihzcmMpO1xyXG4gICAgICAgIExvZ2dlci5sb2cobG9jYWxTZWF0LCAnLS0tLS0tLT5vZmZsaW5lJyk7XHJcbiAgICAgICAgLy8g6YeN6L+e6ZyA6KaB6KGl5Y+R54q25oCB77yM5pqC5LiN5aSE55CG56a757q/XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgRXJtakxlYXZlTWF0Y2hIYW5kbGVyIGV4dGVuZHMgRXJtakJhc2VIYW5kbGVye1xyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGUobXNnKXtcclxuICAgICAgICB0aGlzLm1haW5VSS5tYXRjaFBsYXllclZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dC5pc1dhaXRNYXRjaCl7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc1dhaXRNYXRjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1llc05vQm94KCfljLnphY3otoXml7bvvIzmmK/lkKbph43mlrDljLnphY3vvJ8nLCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgR2FtZS5Db250cm9sLnRyeVNlbmRFbnRlcih7XCJfZnJvbVwiOlwianVtcFwifSk7ICAgIC8vIOaWrXNvY2tldOWImeS4jeiDveeUqOi/meS4qlxyXG4gICAgICAgICAgICB9LCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgR2FtZS5TZXJ2ZXIuc2VuZCh0aGlzLkRlZmluZS5DbWRMZWF2ZSwgeyBcIklzQ2xvc2VcIjogMSB9KTtcclxuICAgICAgICAgICAgICAgIEVybWpEcml2ZXIuaW5zdGFuY2UubGVhdmVHYW1lKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==