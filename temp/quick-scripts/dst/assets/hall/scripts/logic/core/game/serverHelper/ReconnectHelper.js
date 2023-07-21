
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/game/serverHelper/ReconnectHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '281acohEmZGCIMT37TEFndO', 'ReconnectHelper');
// hall/scripts/logic/core/game/serverHelper/ReconnectHelper.ts

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
var BaseServerHelper_1 = require("./BaseServerHelper");
var GameServer_1 = require("../GameServer");
var GlobalEvent_1 = require("../../GlobalEvent");
var ReconnectHelper = /** @class */ (function (_super) {
    __extends(ReconnectHelper, _super);
    function ReconnectHelper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.needReconnect = false;
        //上次收到服务器协议时间
        _this.lastReceiveTime = 0;
        //重连次数
        _this.reconnectCount = 0;
        //网络是否已经链接
        _this.socketOpened = false;
        //重连中 表示正在重连中
        _this.reconnectLock = false;
        //下次重连时间
        _this.nextReconnectTime = 0;
        _this.lastPauseTime = 0;
        _this.inBackground = false;
        return _this;
    }
    ReconnectHelper.prototype.onInit = function () {
    };
    ReconnectHelper.prototype.run = function () {
        Game.Event.on(Game.EVENT_CALL_RECONNECT, this, this.setReconnect);
        this.server.on(GameServer_1.default.Event_GameSocketOpen, this, this.onSocketOpen);
        this.server.on(GameServer_1.default.Event_GameSocketClose, this, this.onSocketClose);
        this.server.on(GameServer_1.default.Event_GameSocketMsg, this, this.updateReceiveTime);
        cc.game.on(cc.game.EVENT_SHOW, this.onResume, this);
        cc.game.on(cc.game.EVENT_HIDE, this.onPause, this);
    };
    ReconnectHelper.prototype.clear = function () {
        this.server.off(GameServer_1.default.Event_GameSocketOpen, this, this.onSocketOpen);
        this.server.off(GameServer_1.default.Event_GameSocketClose, this, this.onSocketClose);
        this.server.off(GameServer_1.default.Event_GameSocketMsg, this, this.updateReceiveTime);
        Game.Event.off(Game.EVENT_CALL_RECONNECT, this, this.setReconnect);
        cc.game.off(cc.game.EVENT_SHOW, this.onResume, this);
        cc.game.off(cc.game.EVENT_HIDE, this.onPause, this);
        this.needReconnect = false;
        this.socketOpened = false;
        this.reconnectLock = false;
        this.lastReceiveTime = 0;
        this.reconnectCount = 0;
    };
    ReconnectHelper.prototype.onSocketOpen = function () {
        if (this.needReconnect == true) {
            Logger.log("socket reconnect finish");
            Game.Event.event(Game.EVENT_SOCKET_RECONNECT);
        }
        Global.UI.close("WndNetReconnect");
        this.needReconnect = false;
        this.reconnectLock = false;
        this.socketOpened = true;
        this.lastReceiveTime = 0;
        this.reconnectCount = 0;
    };
    ReconnectHelper.prototype.updateReceiveTime = function () {
        this.lastReceiveTime = Date.now();
    };
    ReconnectHelper.prototype.onSocketClose = function () {
        Logger.error("socket close !!!!");
        this.setReconnect();
        this.socketOpened = false;
        this.reconnectLock = false;
    };
    ReconnectHelper.prototype.onPause = function () {
        this.lastPauseTime = Date.now();
        this.inBackground = true;
        Logger.error("on pause", this.lastPauseTime);
    };
    ReconnectHelper.prototype.onResume = function () {
        var _this = this;
        if (!this.inBackground) {
            //需要清理上次pause时间，android拉出菜单栏会只出发onresume 有概率不出发onpause
            this.lastPauseTime = 0;
        }
        this.inBackground = false;
        Logger.error("on Resume", this.lastPauseTime, Date.now(), Date.now() - this.lastPauseTime);
        if (this.lastPauseTime != 0) {
            var backgroundTime = (Date.now() - this.lastPauseTime) / 1000;
            Game.Event.event(Game.EVENT_SOCKET_RESUME, backgroundTime);
            if (Date.now() - this.lastPauseTime > Global.Setting.backgroundReconnectTime * 1000) {
                Global.HallServer.heartbeatHelper.sendHeartBeat("&s=0");
                Game.Component.scheduleOnce(function () {
                    _this.setReconnect();
                }, 0.1);
            }
        }
    };
    ReconnectHelper.prototype.reconnect = function () {
        var _this = this;
        Global.UI.show("WndNetReconnect");
        this.reconnectLock = true;
        this.reconnectCount++;
        //更新下次可以重连的时间
        this.nextReconnectTime = Date.now() + Global.Setting.socketReconnectInterval * 1000;
        if (this.reconnectCount > Global.Setting.socketReconnectTimes) {
            Global.UI.close("WndNetReconnect");
            var failedFunc = function () {
                _this.reconnectCount = 0;
                Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);
            };
            Global.UI.showSingleBox("网络连接失败，请稍后再试", failedFunc.bind(this), failedFunc.bind(this));
            return;
        }
        Logger.error("ReconnectHelper  reconnect !!");
        Global.Event.event(GlobalEvent_1.default.UPDATE_RECONNECT_COUNT, this.reconnectCount);
        Global.Event.event(GlobalEvent_1.default.FORCE_HIDE_WAITING);
        this.server.event(GameServer_1.default.Event_GameSocketCallReconnect);
    };
    ReconnectHelper.prototype.setReconnect = function () {
        if (!this.server.isRunning)
            return;
        this.reconnectLock = false;
        this.needReconnect = true;
    };
    ReconnectHelper.prototype.onUpdate = function () {
        if (!this.server.isRunning)
            return;
        if (this.needReconnect
            //当前没在重连中
            && !this.reconnectLock
            //判断重连间隔
            && Date.now() > this.nextReconnectTime
            //在后台时不重连
            && !this.inBackground) {
            this.reconnect();
            return;
        }
        if (this.socketOpened && this.lastReceiveTime != 0) {
            if (Date.now() - this.lastReceiveTime > Global.Setting.socketReconnectReceiveCheckInteval * 1000) {
                this.needReconnect = true;
                this.lastReceiveTime = 0;
                this.socketOpened = false;
            }
        }
    };
    return ReconnectHelper;
}(BaseServerHelper_1.default));
exports.default = ReconnectHelper;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGdhbWVcXHNlcnZlckhlbHBlclxcUmVjb25uZWN0SGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUFrRDtBQUNsRCw0Q0FBdUM7QUFDdkMsaURBQTRDO0FBRzVDO0lBQTZDLG1DQUFnQjtJQUE3RDtRQUFBLHFFQThLQztRQTVLVyxtQkFBYSxHQUFHLEtBQUssQ0FBQztRQUU5QixhQUFhO1FBQ0wscUJBQWUsR0FBRyxDQUFDLENBQUM7UUFFNUIsTUFBTTtRQUNFLG9CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLFVBQVU7UUFDRixrQkFBWSxHQUFHLEtBQUssQ0FBQztRQUM3QixhQUFhO1FBQ0wsbUJBQWEsR0FBRyxLQUFLLENBQUM7UUFFOUIsUUFBUTtRQUNBLHVCQUFpQixHQUFHLENBQUMsQ0FBQztRQUV0QixtQkFBYSxHQUFVLENBQUMsQ0FBQztRQUV6QixrQkFBWSxHQUFHLEtBQUssQ0FBQzs7SUEySmpDLENBQUM7SUF2SmEsZ0NBQU0sR0FBaEI7SUFHQSxDQUFDO0lBRU0sNkJBQUcsR0FBVjtRQUVJLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLG9CQUFVLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxvQkFBVSxDQUFDLHFCQUFxQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsb0JBQVUsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLEVB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Q3JCLE9BQU87UUFDWCxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDO0lBR00sa0NBQVEsR0FBZjtRQUVJLElBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVM7WUFDckIsT0FBTztRQUNYLElBQUcsSUFBSSxDQUFDLGFBQWE7WUFDakIsU0FBUztlQUNOLENBQUMsSUFBSSxDQUFDLGFBQWE7WUFDdEIsUUFBUTtlQUNMLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsaUJBQWlCO1lBQ3RDLFNBQVM7ZUFDTixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQ3pCO1lBQ0ksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLE9BQU87U0FDVjtRQUVELElBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsRUFDakQ7WUFDSSxJQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsa0NBQWtDLEdBQUcsSUFBSSxFQUMvRjtnQkFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2FBQzdCO1NBQ0o7SUFDTCxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQTlLQSxBQThLQyxDQTlLNEMsMEJBQWdCLEdBOEs1RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlU2VydmVySGVscGVyIGZyb20gXCIuL0Jhc2VTZXJ2ZXJIZWxwZXJcIjtcclxuaW1wb3J0IEdhbWVTZXJ2ZXIgZnJvbSBcIi4uL0dhbWVTZXJ2ZXJcIjtcclxuaW1wb3J0IEdsb2JhbEV2ZW50IGZyb20gXCIuLi8uLi9HbG9iYWxFdmVudFwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY29ubmVjdEhlbHBlciBleHRlbmRzIEJhc2VTZXJ2ZXJIZWxwZXJcclxue1xyXG4gICAgcHJpdmF0ZSBuZWVkUmVjb25uZWN0ID0gZmFsc2U7XHJcblxyXG4gICAgLy/kuIrmrKHmlLbliLDmnI3liqHlmajljY/orq7ml7bpl7RcclxuICAgIHByaXZhdGUgbGFzdFJlY2VpdmVUaW1lID0gMDtcclxuXHJcbiAgICAvL+mHjei/nuasoeaVsFxyXG4gICAgcHJpdmF0ZSByZWNvbm5lY3RDb3VudCA9IDA7XHJcbiAgICAvL+e9kee7nOaYr+WQpuW3sue7j+mTvuaOpVxyXG4gICAgcHJpdmF0ZSBzb2NrZXRPcGVuZWQgPSBmYWxzZTtcclxuICAgIC8v6YeN6L+e5LitIOihqOekuuato+WcqOmHjei/nuS4rVxyXG4gICAgcHJpdmF0ZSByZWNvbm5lY3RMb2NrID0gZmFsc2U7XHJcblxyXG4gICAgLy/kuIvmrKHph43ov57ml7bpl7RcclxuICAgIHByaXZhdGUgbmV4dFJlY29ubmVjdFRpbWUgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgbGFzdFBhdXNlVGltZTpudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgaW5CYWNrZ3JvdW5kID0gZmFsc2U7XHJcblxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KClcclxuICAgIHtcclxuXHJcbiAgICB9ICAgIFxyXG5cclxuICAgIHB1YmxpYyBydW4oKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWUuRXZlbnQub24oR2FtZS5FVkVOVF9DQUxMX1JFQ09OTkVDVCwgdGhpcywgdGhpcy5zZXRSZWNvbm5lY3QpO1xyXG4gICAgICAgIHRoaXMuc2VydmVyLm9uKEdhbWVTZXJ2ZXIuRXZlbnRfR2FtZVNvY2tldE9wZW4sIHRoaXMsIHRoaXMub25Tb2NrZXRPcGVuKTtcclxuICAgICAgICB0aGlzLnNlcnZlci5vbihHYW1lU2VydmVyLkV2ZW50X0dhbWVTb2NrZXRDbG9zZSwgdGhpcywgdGhpcy5vblNvY2tldENsb3NlKTtcclxuICAgICAgICB0aGlzLnNlcnZlci5vbihHYW1lU2VydmVyLkV2ZW50X0dhbWVTb2NrZXRNc2csIHRoaXMsIHRoaXMudXBkYXRlUmVjZWl2ZVRpbWUpO1xyXG4gICAgICAgIGNjLmdhbWUub24oY2MuZ2FtZS5FVkVOVF9TSE9XLCB0aGlzLm9uUmVzdW1lLCB0aGlzKTtcclxuICAgICAgICBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfSElERSwgdGhpcy5vblBhdXNlLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2VydmVyLm9mZihHYW1lU2VydmVyLkV2ZW50X0dhbWVTb2NrZXRPcGVuLCB0aGlzLCB0aGlzLm9uU29ja2V0T3Blbik7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXIub2ZmKEdhbWVTZXJ2ZXIuRXZlbnRfR2FtZVNvY2tldENsb3NlLCB0aGlzLCB0aGlzLm9uU29ja2V0Q2xvc2UpO1xyXG4gICAgICAgIHRoaXMuc2VydmVyLm9mZihHYW1lU2VydmVyLkV2ZW50X0dhbWVTb2NrZXRNc2csIHRoaXMsIHRoaXMudXBkYXRlUmVjZWl2ZVRpbWUpO1xyXG4gICAgICAgIEdhbWUuRXZlbnQub2ZmKEdhbWUuRVZFTlRfQ0FMTF9SRUNPTk5FQ1QsdGhpcywgdGhpcy5zZXRSZWNvbm5lY3QpO1xyXG4gICAgICAgIGNjLmdhbWUub2ZmKGNjLmdhbWUuRVZFTlRfU0hPVywgdGhpcy5vblJlc3VtZSwgdGhpcyk7XHJcbiAgICAgICAgY2MuZ2FtZS5vZmYoY2MuZ2FtZS5FVkVOVF9ISURFLCB0aGlzLm9uUGF1c2UsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubmVlZFJlY29ubmVjdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc29ja2V0T3BlbmVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZWNvbm5lY3RMb2NrID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sYXN0UmVjZWl2ZVRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMucmVjb25uZWN0Q291bnQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Tb2NrZXRPcGVuKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLm5lZWRSZWNvbm5lY3QgPT0gdHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coXCJzb2NrZXQgcmVjb25uZWN0IGZpbmlzaFwiKVxyXG4gICAgICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfU09DS0VUX1JFQ09OTkVDVCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5VSS5jbG9zZShcIlduZE5ldFJlY29ubmVjdFwiKTtcclxuICAgICAgICB0aGlzLm5lZWRSZWNvbm5lY3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlY29ubmVjdExvY2sgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNvY2tldE9wZW5lZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5sYXN0UmVjZWl2ZVRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMucmVjb25uZWN0Q291bnQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlUmVjZWl2ZVRpbWUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubGFzdFJlY2VpdmVUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBvblNvY2tldENsb3NlKClcclxuICAgIHtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoXCJzb2NrZXQgY2xvc2UgISEhIVwiKVxyXG4gICAgICAgIHRoaXMuc2V0UmVjb25uZWN0KCk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRPcGVuZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlY29ubmVjdExvY2sgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uUGF1c2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubGFzdFBhdXNlVGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdGhpcy5pbkJhY2tncm91bmQgPSB0cnVlO1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihcIm9uIHBhdXNlXCIsIHRoaXMubGFzdFBhdXNlVGltZSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uUmVzdW1lKClcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5pbkJhY2tncm91bmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+mcgOimgea4heeQhuS4iuasoXBhdXNl5pe26Ze077yMYW5kcm9pZOaLieWHuuiPnOWNleagj+S8muWPquWHuuWPkW9ucmVzdW1lIOacieamgueOh+S4jeWHuuWPkW9ucGF1c2VcclxuICAgICAgICAgICAgdGhpcy5sYXN0UGF1c2VUaW1lID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaW5CYWNrZ3JvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKFwib24gUmVzdW1lXCIsIHRoaXMubGFzdFBhdXNlVGltZSwgRGF0ZS5ub3coKSwgIERhdGUubm93KCkgLSB0aGlzLmxhc3RQYXVzZVRpbWUgKVxyXG4gICAgICAgIGlmKHRoaXMubGFzdFBhdXNlVGltZSAhPSAwKXtcclxuICAgICAgICAgICAgbGV0IGJhY2tncm91bmRUaW1lID0gKERhdGUubm93KCkgLSB0aGlzLmxhc3RQYXVzZVRpbWUpIC8gMTAwMDtcclxuICAgICAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX1NPQ0tFVF9SRVNVTUUsIGJhY2tncm91bmRUaW1lKTtcclxuICAgICAgICAgICAgaWYoRGF0ZS5ub3coKSAtIHRoaXMubGFzdFBhdXNlVGltZSA+IEdsb2JhbC5TZXR0aW5nLmJhY2tncm91bmRSZWNvbm5lY3RUaW1lICogMTAwMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuaGVhcnRiZWF0SGVscGVyLnNlbmRIZWFydEJlYXQoXCImcz0wXCIpO1xyXG4gICAgICAgICAgICAgICAgR2FtZS5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFJlY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMC4xKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIHJlY29ubmVjdCgpXHJcbiAgICB7XHJcbiAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmROZXRSZWNvbm5lY3RcIik7XHJcbiAgICAgICAgdGhpcy5yZWNvbm5lY3RMb2NrID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlY29ubmVjdENvdW50Kys7XHJcbiAgICAgICAgLy/mm7TmlrDkuIvmrKHlj6/ku6Xph43ov57nmoTml7bpl7RcclxuICAgICAgICB0aGlzLm5leHRSZWNvbm5lY3RUaW1lID0gRGF0ZS5ub3coKSArIEdsb2JhbC5TZXR0aW5nLnNvY2tldFJlY29ubmVjdEludGVydmFsICogMTAwMDtcclxuICAgICAgICBpZih0aGlzLnJlY29ubmVjdENvdW50ID4gR2xvYmFsLlNldHRpbmcuc29ja2V0UmVjb25uZWN0VGltZXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuY2xvc2UoXCJXbmROZXRSZWNvbm5lY3RcIik7XHJcbiAgICAgICAgICAgIGxldCBmYWlsZWRGdW5jID0gKCk9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY29ubmVjdENvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9GT1JDRV9MRUFWRV9HQU1FKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChcIue9kee7nOi/nuaOpeWksei0pe+8jOivt+eojeWQjuWGjeivlVwiLCBmYWlsZWRGdW5jLmJpbmQodGhpcyksIGZhaWxlZEZ1bmMuYmluZCh0aGlzKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBMb2dnZXIuZXJyb3IoXCJSZWNvbm5lY3RIZWxwZXIgIHJlY29ubmVjdCAhIVwiKTtcclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuVVBEQVRFX1JFQ09OTkVDVF9DT1VOVCwgdGhpcy5yZWNvbm5lY3RDb3VudCk7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkZPUkNFX0hJREVfV0FJVElORyk7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXIuZXZlbnQoR2FtZVNlcnZlci5FdmVudF9HYW1lU29ja2V0Q2FsbFJlY29ubmVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRSZWNvbm5lY3QoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLnNlcnZlci5pc1J1bm5pbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLnJlY29ubmVjdExvY2sgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5lZWRSZWNvbm5lY3QgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgb25VcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLnNlcnZlci5pc1J1bm5pbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZih0aGlzLm5lZWRSZWNvbm5lY3QgXHJcbiAgICAgICAgICAgIC8v5b2T5YmN5rKh5Zyo6YeN6L+e5LitXHJcbiAgICAgICAgICAgICYmICF0aGlzLnJlY29ubmVjdExvY2sgXHJcbiAgICAgICAgICAgIC8v5Yik5pat6YeN6L+e6Ze06ZqUXHJcbiAgICAgICAgICAgICYmIERhdGUubm93KCkgPiB0aGlzLm5leHRSZWNvbm5lY3RUaW1lXHJcbiAgICAgICAgICAgIC8v5Zyo5ZCO5Y+w5pe25LiN6YeN6L+eXHJcbiAgICAgICAgICAgICYmICF0aGlzLmluQmFja2dyb3VuZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuc29ja2V0T3BlbmVkICYmIHRoaXMubGFzdFJlY2VpdmVUaW1lICE9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihEYXRlLm5vdygpIC0gdGhpcy5sYXN0UmVjZWl2ZVRpbWUgPiBHbG9iYWwuU2V0dGluZy5zb2NrZXRSZWNvbm5lY3RSZWNlaXZlQ2hlY2tJbnRldmFsICogMTAwMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZWVkUmVjb25uZWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFzdFJlY2VpdmVUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0T3BlbmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=