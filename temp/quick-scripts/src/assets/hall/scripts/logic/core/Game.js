"use strict";
cc._RF.push(module, '002a38UCnBE4I2GsxvQP7UH', 'Game');
// hall/scripts/logic/core/Game.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventDispatcher_1 = require("../../framework/event/EventDispatcher");
var ComponentProvider_1 = require("./component/ComponentProvider");
var TweenManager_1 = require("./game/TweenManager");
var GameServer_1 = require("./game/GameServer");
var CommandDefine_1 = require("./game/CommandDefine");
var GameControl_1 = require("./game/GameControl");
var DataBridge_1 = require("./game/data/DataBridge");
var GamePreloadTool_1 = require("./game/GamePreloadTool");
//游戏公共逻辑入口
var Game = /** @class */ (function () {
    function Game() {
    }
    Game.setup = function () {
        this.Command = new CommandDefine_1.default();
        this.Event = new EventDispatcher_1.default();
        this.Component = new ComponentProvider_1.default("GameDriver");
        this.Component.setup(this.onUpdate.bind(this), this.onLateUpdate.bind(this));
        this.Tween = new TweenManager_1.default();
        this.Tween.setup();
        this.Server = new GameServer_1.default();
        this.Server.setup();
        this.Control = new GameControl_1.default();
        this.Control.setup();
        this.DataBridge = new DataBridge_1.default();
        this.GamePreloadTool = new GamePreloadTool_1.default();
    };
    Game.onUpdate = function (dt) {
        this.Tween.onUpdate(dt);
        this.Server.onUpdate(dt);
    };
    Game.onLateUpdate = function () { };
    //游戏内通用事件
    Game.EVENT_ADDTIMELOCK = "EVENT_ADDTIMELOCK"; //时间锁  到时间自动解锁
    Game.EVENT_ADDMANUALLOCK = "EVENT_ADDMANUALLOCK"; //手动锁，需要手动解锁  或者等待超时
    Game.EVENT_REMOVELOCK = "EVENT_REMOVELOCK"; //解锁消息
    //游戏网络接通
    Game.EVENT_SOCKET_OPEN = "EVENT_SOCKET_OPEN"; //游戏socket链接
    Game.EVENT_SOCKET_CLOSE = "EVENT_SOCKET_CLOSE"; //游戏socket关闭
    Game.EVENT_SOCKET_ERROR = "EVENT_SOCKET_ERROR"; //游戏socket异常
    Game.EVENT_SOCKET_RECONNECT = "EVENT_SOCKET_RECONNECT"; //游戏重连通知
    Game.EVENT_CALL_RECONNECT = "EVENT_CALL_RECONNECT"; //游戏内部强制重连
    Game.EVENT_SOCKET_RESUME = "EVENT_SOCKET_RESUME"; //从后台切回来后事件  参数：切后台时间。
    //插入消息到队列头部
    Game.EVENT_UNSHFIT_MSGLIST = "EVENT_UNSHFIT_MSGLIST";
    //强制退出游戏  常用与网络异常
    Game.EVENT_FORCE_LEAVE_GAME = "EVENT_FORCE_LEAVE_GAME";
    //不在桌上 对应901错误
    Game.EVENT_NOT_IN_TABLE = "EVENT_NOT_IN_TABLE";
    // 通知子游戏匹配玩家中
    Game.EVENT_MATCH_PLAYER = "EVENT_MATCH_PLAYER";
    //设置大厅选场点击场次的回调
    Game.EVENT_SETINTOGAME_FUN = "EVENT_SETINTOGAME_FUN";
    // 拉霸游戏socket连上通知
    Game.EVENT_LABA_CONNECT = "EVENT_LABA_CONNECT";
    //子游戏内显示自定义messagebox
    Game.EVENT_MESSAGE_BOX = "EVENT_MESSAGE_BOX";
    return Game;
}());
exports.default = Game;

cc._RF.pop();