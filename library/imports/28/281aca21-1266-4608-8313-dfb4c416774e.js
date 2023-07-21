"use strict";
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