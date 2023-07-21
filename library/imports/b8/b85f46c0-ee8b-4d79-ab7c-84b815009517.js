"use strict";
cc._RF.push(module, 'b85f4bA7otNeat8hLgVAJUX', 'GameHeartBeatHelper');
// hall/scripts/logic/core/game/serverHelper/GameHeartBeatHelper.ts

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
var GameHeartBeatHelper = /** @class */ (function (_super) {
    __extends(GameHeartBeatHelper, _super);
    function GameHeartBeatHelper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sendInterval = 0;
        _this.lastHeartBeatInterval = 3;
        _this.start = false;
        _this.netInterval = 0;
        //是否在后台
        _this.isBackground = false;
        //心跳计数
        _this.heartBeatSeq = 1;
        return _this;
    }
    GameHeartBeatHelper.prototype.onInit = function () {
    };
    GameHeartBeatHelper.prototype.startHeartbeat = function () {
        this.start = true;
    };
    GameHeartBeatHelper.prototype.stopHeartBeat = function () {
        this.start = false;
    };
    GameHeartBeatHelper.prototype.sendHeartBeat = function () {
        if (this.server.isRunning) {
            var seq = 0;
            if (!this.isBackground) {
                seq = this.heartBeatSeq;
                this.heartBeatSeq++;
            }
            this.server.send(Game.Command.HeartBeat, { "_seq": seq });
        }
    };
    GameHeartBeatHelper.prototype.HandleHeartBeat = function (msg) {
        this.sendInterval = msg._param._para && msg._param._para.timeout || 3;
        this.lastHeartBeatInterval = this.sendInterval;
    };
    GameHeartBeatHelper.prototype.run = function () {
        this.resetSeq();
        cc.game.on(cc.game.EVENT_SHOW, this.onResume, this);
        cc.game.on(cc.game.EVENT_HIDE, this.onPause, this);
        this.server.on(GameServer_1.default.Event_GameSocketStartConnect, this, this.resetSeq);
    };
    GameHeartBeatHelper.prototype.clear = function () {
        this.resetSeq();
        cc.game.off(cc.game.EVENT_SHOW, this.onResume, this);
        cc.game.off(cc.game.EVENT_HIDE, this.onPause, this);
        this.server.off(GameServer_1.default.Event_GameSocketStartConnect, this, this.resetSeq);
        this.sendInterval = 0;
        this.startHeartbeat();
    };
    GameHeartBeatHelper.prototype.onResume = function () {
        this.isBackground = false;
        this.sendHeartBeat();
        clearInterval(this.tmpInterval);
    };
    GameHeartBeatHelper.prototype.onPause = function () {
        this.isBackground = true;
    };
    //默认值为1  0为background
    GameHeartBeatHelper.prototype.resetSeq = function () {
        this.heartBeatSeq = 1;
    };
    GameHeartBeatHelper.prototype.onUpdate = function (dt) {
        if (!this.start)
            return;
        if (!this.server.isRunning)
            return;
        if (this.sendInterval > 0) {
            this.sendInterval -= dt;
            if (this.sendInterval <= 0) {
                this.sendHeartBeat();
                this.sendInterval = this.lastHeartBeatInterval;
            }
        }
    };
    return GameHeartBeatHelper;
}(BaseServerHelper_1.default));
exports.default = GameHeartBeatHelper;

cc._RF.pop();