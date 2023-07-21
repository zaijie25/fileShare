
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/handlers/DdzEasyHandlers.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9c02aNQzwRHMLTXgnM6aqbl', 'DdzEasyHandlers');
// ddz/ddz/scripts/handlers/DdzEasyHandlers.ts

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
exports.DdzLeaveMatchHandler = exports.DdzOfflineHandler = exports.DdzRefreshHandler = exports.DdzWaitHandler = exports.DdzEndHandler = exports.DdzStartHandler = void 0;
var DdzBaseHandler_1 = require("./DdzBaseHandler");
var DdzDriver_1 = require("../DdzDriver");
//游戏开始协议
var DdzStartHandler = /** @class */ (function (_super) {
    __extends(DdzStartHandler, _super);
    function DdzStartHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzStartHandler.prototype.refreshData = function (msg) {
        this.context.set(this.Define.FieldGameStart, true);
    };
    DdzStartHandler.prototype.execute = function (msg) {
        this.mainUI.showActionTimer(false);
    };
    DdzStartHandler.prototype.executeSync = function (msg) {
        this.mainUI.showActionTimer(false);
    };
    return DdzStartHandler;
}(DdzBaseHandler_1.default));
exports.DdzStartHandler = DdzStartHandler;
//游戏结束
var DdzEndHandler = /** @class */ (function (_super) {
    __extends(DdzEndHandler, _super);
    function DdzEndHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzEndHandler.prototype.refreshData = function () {
        //清理单局数据
        this.context.clearByRound();
    };
    DdzEndHandler.prototype.execute = function () {
        this.mainUI.callAllPlayers('showPlayerNormalEffect');
        Game.Tween.clear();
        Game.Component.unscheduleAllCallbacks();
        // this.mainUI.clearByRound();      // 放到手动操作那边清理
    };
    return DdzEndHandler;
}(DdzBaseHandler_1.default));
exports.DdzEndHandler = DdzEndHandler;
//等待下一局
var DdzWaitHandler = /** @class */ (function (_super) {
    __extends(DdzWaitHandler, _super);
    function DdzWaitHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzWaitHandler.prototype.execute = function (msg) {
        if (msg._para.status == 1) {
            Logger.log("结算中");
        }
        else {
            this.mainUI.showActionTimer(false);
            this.mainUI.matchPlayerView.active = true;
        }
    };
    return DdzWaitHandler;
}(DdzBaseHandler_1.default));
exports.DdzWaitHandler = DdzWaitHandler;
//刷新玩家信息
var DdzRefreshHandler = /** @class */ (function (_super) {
    __extends(DdzRefreshHandler, _super);
    function DdzRefreshHandler() {
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
    DdzRefreshHandler.prototype.refreshData = function (msg) {
        var src = msg._src;
        var localSeat = this.SitHelper.serverSToLocalN(src);
        if (this.context.playerList[localSeat] == null)
            return;
        this.context.playerList[localSeat].refresh(msg._para);
    };
    DdzRefreshHandler.prototype.execute = function (msg) {
        var src = msg._src;
        var localSeat = this.SitHelper.serverSToLocalN(src);
        if (this.context.playerList[localSeat] == null)
            return;
        this.mainUI.callPlayer(localSeat, "setPlayerPoint", this.context.playerList[localSeat].point);
        if (localSeat == 0)
            this.mainUI.selfInfoView.updateSelfPoint(this.context.playerList[localSeat].point);
    };
    return DdzRefreshHandler;
}(DdzBaseHandler_1.default));
exports.DdzRefreshHandler = DdzRefreshHandler;
var DdzOfflineHandler = /** @class */ (function (_super) {
    __extends(DdzOfflineHandler, _super);
    function DdzOfflineHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzOfflineHandler.prototype.execute = function (msg) {
        var src = msg._src;
        var localSeat = this.SitHelper.serverSToLocalN(src);
        Logger.log(localSeat, '------->offline');
        // 重连需要补发状态，暂不处理离线
    };
    return DdzOfflineHandler;
}(DdzBaseHandler_1.default));
exports.DdzOfflineHandler = DdzOfflineHandler;
var DdzLeaveMatchHandler = /** @class */ (function (_super) {
    __extends(DdzLeaveMatchHandler, _super);
    function DdzLeaveMatchHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzLeaveMatchHandler.prototype.execute = function (msg) {
        var _this = this;
        this.mainUI.matchPlayerView.active = false;
        if (this.context.isWaitMatch) {
            this.context.isWaitMatch = false;
            Global.UI.showYesNoBox('匹配超时，是否重新匹配？', function () {
                Game.Control.trySendEnter({ "_from": "jump" }); // 断socket则不能用这个
            }, function () {
                Game.Server.send(_this.Define.CmdLeave, { "IsClose": 1 });
                DdzDriver_1.default.instance.leaveGame();
            });
        }
    };
    return DdzLeaveMatchHandler;
}(DdzBaseHandler_1.default));
exports.DdzLeaveMatchHandler = DdzLeaveMatchHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGhhbmRsZXJzXFxEZHpFYXN5SGFuZGxlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4QztBQUM5QywwQ0FBcUM7QUFFckMsUUFBUTtBQUNSO0lBQXFDLG1DQUFjO0lBQW5EOztJQVlBLENBQUM7SUFYYSxxQ0FBVyxHQUFyQixVQUFzQixHQUFHO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFUyxpQ0FBTyxHQUFqQixVQUFrQixHQUFHO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFUyxxQ0FBVyxHQUFyQixVQUFzQixHQUFHO1FBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDTCxzQkFBQztBQUFELENBWkEsQUFZQyxDQVpvQyx3QkFBYyxHQVlsRDtBQVpZLDBDQUFlO0FBYzVCLE1BQU07QUFDTjtJQUFtQyxpQ0FBYztJQUFqRDs7SUFZQSxDQUFDO0lBWGEsbUNBQVcsR0FBckI7UUFDSSxRQUFRO1FBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRVMsK0JBQU8sR0FBakI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQ3hDLGlEQUFpRDtJQUNyRCxDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQVpBLEFBWUMsQ0Faa0Msd0JBQWMsR0FZaEQ7QUFaWSxzQ0FBYTtBQWMxQixPQUFPO0FBQ1A7SUFBb0Msa0NBQWM7SUFBbEQ7O0lBVUEsQ0FBQztJQVRhLGdDQUFPLEdBQWpCLFVBQWtCLEdBQUc7UUFDakIsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDdkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyQjthQUNJO1lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUM3QztJQUNMLENBQUM7SUFDTCxxQkFBQztBQUFELENBVkEsQUFVQyxDQVZtQyx3QkFBYyxHQVVqRDtBQVZZLHdDQUFjO0FBWTNCLFFBQVE7QUFDUjtJQUF1QyxxQ0FBYztJQUFyRDs7SUFrQ0EsQ0FBQztJQWpDRyxhQUFhO0lBQ2Isd0JBQXdCO0lBQ3hCLG1CQUFtQjtJQUNuQixnQkFBZ0I7SUFDaEIsdUJBQXVCO0lBQ3ZCLDRCQUE0QjtJQUM1QixrQ0FBa0M7SUFDbEMseUJBQXlCO0lBQ3pCLHVCQUF1QjtJQUN2Qix5QkFBeUI7SUFDekIseUNBQXlDO0lBQ3pDLHVCQUF1QjtJQUN2Qiw4QkFBOEI7SUFDOUIsa0RBQWtEO0lBQ2xELFFBQVE7SUFDUixJQUFJO0lBQ00sdUNBQVcsR0FBckIsVUFBc0IsR0FBRztRQUNyQixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO1FBQ2xCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSTtZQUMxQyxPQUFPO1FBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRVMsbUNBQU8sR0FBakIsVUFBa0IsR0FBRztRQUNqQixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO1FBQ2xCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSTtZQUMxQyxPQUFPO1FBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLGdCQUFnQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlGLElBQUksU0FBUyxJQUFJLENBQUM7WUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0YsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FsQ0EsQUFrQ0MsQ0FsQ3NDLHdCQUFjLEdBa0NwRDtBQWxDWSw4Q0FBaUI7QUFvQzlCO0lBQXVDLHFDQUFjO0lBQXJEOztJQU9BLENBQUM7SUFOYSxtQ0FBTyxHQUFqQixVQUFrQixHQUFHO1FBQ2pCLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7UUFDbEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUN6QyxrQkFBa0I7SUFDdEIsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FQQSxBQU9DLENBUHNDLHdCQUFjLEdBT3BEO0FBUFksOENBQWlCO0FBUzlCO0lBQTBDLHdDQUFjO0lBQXhEOztJQWFBLENBQUM7SUFaYSxzQ0FBTyxHQUFqQixVQUFrQixHQUFHO1FBQXJCLGlCQVdDO1FBVkcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMzQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUNqQyxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBSSxnQkFBZ0I7WUFDdkUsQ0FBQyxFQUFFO2dCQUNDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3pELG1CQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBQ0wsMkJBQUM7QUFBRCxDQWJBLEFBYUMsQ0FieUMsd0JBQWMsR0FhdkQ7QUFiWSxvREFBb0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGR6QmFzZUhhbmRsZXIgZnJvbSBcIi4vRGR6QmFzZUhhbmRsZXJcIjtcclxuaW1wb3J0IERkekRyaXZlciBmcm9tIFwiLi4vRGR6RHJpdmVyXCI7XHJcblxyXG4vL+a4uOaIj+W8gOWni+WNj+iurlxyXG5leHBvcnQgY2xhc3MgRGR6U3RhcnRIYW5kbGVyIGV4dGVuZHMgRGR6QmFzZUhhbmRsZXIge1xyXG4gICAgcHJvdGVjdGVkIHJlZnJlc2hEYXRhKG1zZykge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5zZXQodGhpcy5EZWZpbmUuRmllbGRHYW1lU3RhcnQsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlKG1zZykge1xyXG4gICAgICAgIHRoaXMubWFpblVJLnNob3dBY3Rpb25UaW1lcihmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGVTeW5jKG1zZykge1xyXG4gICAgICAgIHRoaXMubWFpblVJLnNob3dBY3Rpb25UaW1lcihmYWxzZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8v5ri45oiP57uT5p2fXHJcbmV4cG9ydCBjbGFzcyBEZHpFbmRIYW5kbGVyIGV4dGVuZHMgRGR6QmFzZUhhbmRsZXIge1xyXG4gICAgcHJvdGVjdGVkIHJlZnJlc2hEYXRhKCkge1xyXG4gICAgICAgIC8v5riF55CG5Y2V5bGA5pWw5o2uXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyQnlSb3VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlKCkge1xyXG4gICAgICAgIHRoaXMubWFpblVJLmNhbGxBbGxQbGF5ZXJzKCdzaG93UGxheWVyTm9ybWFsRWZmZWN0Jyk7XHJcbiAgICAgICAgR2FtZS5Ud2Vlbi5jbGVhcigpO1xyXG4gICAgICAgIEdhbWUuQ29tcG9uZW50LnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICAvLyB0aGlzLm1haW5VSS5jbGVhckJ5Um91bmQoKTsgICAgICAvLyDmlL7liLDmiYvliqjmk43kvZzpgqPovrnmuIXnkIZcclxuICAgIH1cclxufVxyXG5cclxuLy/nrYnlvoXkuIvkuIDlsYBcclxuZXhwb3J0IGNsYXNzIERkeldhaXRIYW5kbGVyIGV4dGVuZHMgRGR6QmFzZUhhbmRsZXIge1xyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGUobXNnKSB7XHJcbiAgICAgICAgaWYgKG1zZy5fcGFyYS5zdGF0dXMgPT0gMSkge1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwi57uT566X5LitXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkuc2hvd0FjdGlvblRpbWVyKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkubWF0Y2hQbGF5ZXJWaWV3LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vL+WIt+aWsOeOqeWutuS/oeaBr1xyXG5leHBvcnQgY2xhc3MgRGR6UmVmcmVzaEhhbmRsZXIgZXh0ZW5kcyBEZHpCYXNlSGFuZGxlciB7XHJcbiAgICAvLyBcIl9wYXJhbVwiOntcclxuICAgIC8vICAgICBcIl9jbWRcIjpcInJlZnJlc2hcIixcclxuICAgIC8vICAgICBcIl9zcmNcIjpcInA1XCIsXHJcbiAgICAvLyAgICAgXCJfcGFyYVwiOntcclxuICAgIC8vICAgICAgICAgXCJhcHBfaWRcIjoxMixcclxuICAgIC8vICAgICAgICAgXCJ1c2VyX2lkXCI6NjgwMjcyLFxyXG4gICAgLy8gICAgICAgICBcIm5pY2tfbmFtZVwiOlwi6LS15a6+NjgwMjcyXCIsXHJcbiAgICAvLyAgICAgICAgIFwiaGVhZGltZ1wiOlwiNVwiLFxyXG4gICAgLy8gICAgICAgICBcInBvaW50XCI6NDc1LFxyXG4gICAgLy8gICAgICAgICBcInVzZXJfdHlwZVwiOjEsXHJcbiAgICAvLyAgICAgICAgIFwicmVnaXN0ZXJfaXBcIjpcIjE5Mi4xNjguMS4yMjRcIixcclxuICAgIC8vICAgICAgICAgXCJvc190eXBlXCI6MSxcclxuICAgIC8vICAgICAgICAgXCJpdGltZVwiOjE1NTYwMjc4MTksXHJcbiAgICAvLyAgICAgICAgIFwibGFzdF9sb2dpbl90aW1lXCI6XCIyMDE5LTA0LTMwIDIzOjU1OjU1XCJcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbiAgICBwcm90ZWN0ZWQgcmVmcmVzaERhdGEobXNnKSB7XHJcbiAgICAgICAgbGV0IHNyYyA9IG1zZy5fc3JjXHJcbiAgICAgICAgbGV0IGxvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihzcmMpO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRleHQucGxheWVyTGlzdFtsb2NhbFNlYXRdID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmNvbnRleHQucGxheWVyTGlzdFtsb2NhbFNlYXRdLnJlZnJlc2gobXNnLl9wYXJhKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZShtc2cpIHtcclxuICAgICAgICBsZXQgc3JjID0gbXNnLl9zcmNcclxuICAgICAgICBsZXQgbG9jYWxTZWF0ID0gdGhpcy5TaXRIZWxwZXIuc2VydmVyU1RvTG9jYWxOKHNyYyk7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dC5wbGF5ZXJMaXN0W2xvY2FsU2VhdF0gPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmNhbGxQbGF5ZXIobG9jYWxTZWF0LCBcInNldFBsYXllclBvaW50XCIsIHRoaXMuY29udGV4dC5wbGF5ZXJMaXN0W2xvY2FsU2VhdF0ucG9pbnQpO1xyXG4gICAgICAgIGlmIChsb2NhbFNlYXQgPT0gMClcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkuc2VsZkluZm9WaWV3LnVwZGF0ZVNlbGZQb2ludCh0aGlzLmNvbnRleHQucGxheWVyTGlzdFtsb2NhbFNlYXRdLnBvaW50KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERkek9mZmxpbmVIYW5kbGVyIGV4dGVuZHMgRGR6QmFzZUhhbmRsZXIge1xyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGUobXNnKSB7XHJcbiAgICAgICAgbGV0IHNyYyA9IG1zZy5fc3JjXHJcbiAgICAgICAgbGV0IGxvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihzcmMpO1xyXG4gICAgICAgIExvZ2dlci5sb2cobG9jYWxTZWF0LCAnLS0tLS0tLT5vZmZsaW5lJyk7XHJcbiAgICAgICAgLy8g6YeN6L+e6ZyA6KaB6KGl5Y+R54q25oCB77yM5pqC5LiN5aSE55CG56a757q/XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEZHpMZWF2ZU1hdGNoSGFuZGxlciBleHRlbmRzIERkekJhc2VIYW5kbGVyIHtcclxuICAgIHByb3RlY3RlZCBleGVjdXRlKG1zZykge1xyXG4gICAgICAgIHRoaXMubWFpblVJLm1hdGNoUGxheWVyVmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5jb250ZXh0LmlzV2FpdE1hdGNoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5pc1dhaXRNYXRjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1llc05vQm94KCfljLnphY3otoXml7bvvIzmmK/lkKbph43mlrDljLnphY3vvJ8nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBHYW1lLkNvbnRyb2wudHJ5U2VuZEVudGVyKHsgXCJfZnJvbVwiOiBcImp1bXBcIiB9KTsgICAgLy8g5patc29ja2V05YiZ5LiN6IO955So6L+Z5LiqXHJcbiAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgIEdhbWUuU2VydmVyLnNlbmQodGhpcy5EZWZpbmUuQ21kTGVhdmUsIHsgXCJJc0Nsb3NlXCI6IDEgfSk7XHJcbiAgICAgICAgICAgICAgICBEZHpEcml2ZXIuaW5zdGFuY2UubGVhdmVHYW1lKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==