"use strict";
cc._RF.push(module, 'ed934572DFI/rMomYSa5ATQ', 'SocketHelper');
// hall/scripts/logic/core/game/serverHelper/SocketHelper.ts

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
var GameServer_1 = require("../GameServer");
var NetSocket_1 = require("../../../../framework/net/socket/NetSocket");
var BaseServerHelper_1 = require("./BaseServerHelper");
// import * as ByteBuffer from "bytebuffer";
var SocketHelper = /** @class */ (function (_super) {
    __extends(SocketHelper, _super);
    function SocketHelper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.msgList = [];
        _this.bufferList = [];
        _this.mod = "";
        _this.suffix = "";
        _this._sendCount = 0;
        return _this;
    }
    SocketHelper.prototype.onInit = function () {
        this.server.on(GameServer_1.default.Event_GameSocketCallReconnect, this, this.callReconnect);
    };
    SocketHelper.prototype.callReconnect = function () {
        this.msgList = [];
        if (Global.Setting.Urls.gameRoutes) {
            Global.Setting.Urls.gameRoutes.changeToAnotherRoute();
            var route = Global.Setting.Urls.gameRoutes.getCurRoute();
            if (route == null) {
                if (Global.Setting.Urls.hallRoutes) {
                    Global.Setting.Urls.hallRoutes.changeToAnotherRoute();
                    Logger.error("change socket url");
                }
                route = Global.Setting.Urls.hallRoutes.getCurRoute();
            }
            if (route != null) {
                var serverUrl = route.getPbSocketUrl(this.mod);
                serverUrl.suffix = serverUrl.suffix + this.suffix;
                this.url = Global.UrlUtil.dealWebSocketUrl(serverUrl);
                this.cerPath = serverUrl.cerPath;
                // 更新最新serverroute
                this.serverRoute = route;
            }
            Logger.error("change socket url");
        }
        this.connect(this.url, this.serverRoute, this.socket.usePb, this.mod, this.suffix, this.cerPath);
    };
    SocketHelper.prototype.connect = function (url, serverRoute, pbMode, mod, suffix, cerPath) {
        if (pbMode === void 0) { pbMode = false; }
        if (mod === void 0) { mod = ""; }
        if (suffix === void 0) { suffix = ""; }
        if (cerPath === void 0) { cerPath = ""; }
        if (!url || url == "")
            return;
        this.mod = mod;
        this.suffix = suffix;
        this.serverRoute = serverRoute;
        this.clear();
        this.url = url;
        this.cerPath = cerPath;
        this.socket = new NetSocket_1.NetSocket(url, serverRoute, cerPath);
        this.socket.init(this, this.onSocketMsg, this.onSocketOpen, this.onSocketError, this.onSocketClose, pbMode);
        this.socket.connect();
        this.server.event(GameServer_1.default.Event_GameSocketStartConnect);
        Logger.log("connect url:", url);
    };
    SocketHelper.prototype.send = function (msgObj, now) {
        if (now === void 0) { now = false; }
        // if(this.socket == null || !this.socket.isConnected && !now)
        // {
        //     this.msgList.push(content);
        //     return;
        // }
        //如果是now  并且socket没初始化 直接丢弃
        if (this.socket && this.socket.isConnected) {
            this._sendCount++;
            msgObj.c = this._sendCount;
            var content = JSON.stringify(msgObj);
            // Logger.error("socket send = " + content)
            var encrptedMsg = content;
            if (this.url && (this.url.startsWith("wss") == false) && content) {
                encrptedMsg = Global.AESUtil.aesEncrptMsg(content);
            }
            this.socket.send(encrptedMsg);
        }
    };
    SocketHelper.prototype.sendBuffer = function (cmd, buffer, now) {
        if (now === void 0) { now = false; }
        var size = buffer ? buffer.length : 0;
        size += 4;
        var bb = ByteBuffer.allocate(size, false, false);
        bb.writeUint32(cmd, 0);
        if (buffer) {
            bb.append(buffer, 4);
        }
        if (this.socket == null || !this.socket.isConnected && !now) {
            Logger.error('push buffer in queue');
            this.bufferList.push(bb);
            return;
        }
        //如果是now  并且socket没初始化 直接丢弃
        if (this.socket && this.socket.isConnected) {
            this.socket.send(bb.buffer);
            bb.clear();
        }
    };
    SocketHelper.prototype.sendBufferDirect = function (bb) {
        this.socket.send(bb.buffer);
        bb.clear();
    };
    SocketHelper.prototype.clear = function () {
        if (this.socket) {
            for (var i = 0; i < this.msgList.length; i++) {
                this.send(this.msgList[i], true);
            }
            for (var i = 0; i < this.bufferList.length; i++) {
                this.sendBufferDirect(this.bufferList[i]);
            }
            this.socket.cleanSocket();
            // //丢弃socket引用，防止leave发送完立刻断socket 导致消息发布出去
            // let socket = this.socket;
            // socket.cleanCallback();
            // setTimeout(() => {
            //     socket.cleanSocket();    
            // }, 1000);
            this.socket = null;
        }
        this.msgList = [];
        this.bufferList = [];
        this._sendCount = 0;
    };
    SocketHelper.prototype.onSocketOpen = function () {
        Logger.log("socket open:", this.url);
        this.server.event(GameServer_1.default.Event_GameSocketOpen);
        Game.Event.event(Game.EVENT_SOCKET_OPEN);
        Global.Setting.Urls.sortGameRoutes();
        var serverUrl = this.getServerUrl();
        if (serverUrl)
            Global.ReportTool.markSocketSuccess(serverUrl, 0);
    };
    SocketHelper.prototype.getServerUrl = function () {
        if (Global.Setting.Urls.gameRoutes) {
            var route = Global.Setting.Urls.gameRoutes.getCurRoute();
            if (route == null)
                route = Global.Setting.Urls.hallRoutes.getCurRoute();
            if (route) {
                var serverUrl = route.getPbSocketUrl(this.mod);
                if (serverUrl)
                    return serverUrl;
            }
        }
        return null;
    };
    SocketHelper.prototype.onSocketMsg = function (msg) {
        if (typeof (msg) == "string") {
            this.handleStringMsg(msg);
        }
        else {
            this.handlePbMsg(msg);
        }
    };
    SocketHelper.prototype.handleStringMsg = function (msg) {
        var netObj = null;
        try {
            var decode = Global.AESUtil.decodeMsg(msg);
            netObj = JSON.parse(decode);
        }
        catch (e) {
            Logger.error("解析协议失败", msg, e);
            return;
        }
        if (netObj._param && netObj._param._cmd != Game.Command.HeartBeat)
            Logger.log("SocketMsg:", msg);
        this.server.event(GameServer_1.default.Event_GameSocketMsg, netObj);
    };
    SocketHelper.prototype.handlePbMsg = function (msg) {
        var buffer = new Uint8Array(msg);
        //大字节序读取command
        var command = ByteBuffer.wrap(buffer.slice(0, 4), false).readUint32(0);
        var paraData = buffer.slice(4);
        command = "*game*_" + command;
        this.server.event(GameServer_1.default.Event_GamePBSocketMsg, command, paraData);
    };
    SocketHelper.prototype.onSocketClose = function () {
        this.server.event(GameServer_1.default.Event_GameSocketClose);
        Game.Event.event(Game.EVENT_SOCKET_CLOSE);
    };
    SocketHelper.prototype.onSocketError = function () {
        var serverUrl = this.getServerUrl();
        if (serverUrl)
            Global.ReportTool.markSocketFailed(serverUrl, -1);
        this.server.event(GameServer_1.default.Event_GameSocketClose);
        Game.Event.event(Game.EVENT_SOCKET_ERROR);
        Game.Event.event(Game.EVENT_CALL_RECONNECT);
    };
    SocketHelper.prototype.onUpdate = function (dt) {
        if (!this.socket || !this.socket.isConnected)
            return;
        if (this.msgList.length > 0) {
            for (var i = 0; i < this.msgList.length; i++) {
                this.socket.send(this.msgList[i]);
            }
            this.msgList = [];
        }
    };
    return SocketHelper;
}(BaseServerHelper_1.default));
exports.default = SocketHelper;

cc._RF.pop();