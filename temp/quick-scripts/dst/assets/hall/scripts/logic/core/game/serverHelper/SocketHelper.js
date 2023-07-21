
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/game/serverHelper/SocketHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGdhbWVcXHNlcnZlckhlbHBlclxcU29ja2V0SGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUF1QztBQUN2Qyx3RUFBdUU7QUFDdkUsdURBQWtEO0FBRWxELDRDQUE0QztBQUU1QztJQUEwQyxnQ0FBZ0I7SUFBMUQ7UUFBQSxxRUEyUEM7UUF0UFcsYUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLGdCQUFVLEdBQUcsRUFBRSxDQUFDO1FBSWhCLFNBQUcsR0FBVSxFQUFFLENBQUM7UUFDaEIsWUFBTSxHQUFVLEVBQUUsQ0FBQztRQUNuQixnQkFBVSxHQUFHLENBQUMsQ0FBQzs7SUErTzNCLENBQUM7SUE3T2EsNkJBQU0sR0FBaEI7UUFFSSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxvQkFBVSxDQUFDLDZCQUE2QixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDdEYsQ0FBQztJQUVPLG9DQUFhLEdBQXJCO1FBRUksSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQ2pDO1lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDdEQsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3pELElBQUcsS0FBSyxJQUFJLElBQUksRUFDaEI7Z0JBQ0ksSUFBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQ2pDO29CQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO29CQUN0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Q0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3JDO1lBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQTNQQSxBQTJQQyxDQTNQeUMsMEJBQWdCLEdBMlB6RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lU2VydmVyIGZyb20gXCIuLi9HYW1lU2VydmVyXCI7XHJcbmltcG9ydCB7IE5ldFNvY2tldCB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZXdvcmsvbmV0L3NvY2tldC9OZXRTb2NrZXRcIjtcclxuaW1wb3J0IEJhc2VTZXJ2ZXJIZWxwZXIgZnJvbSBcIi4vQmFzZVNlcnZlckhlbHBlclwiO1xyXG5pbXBvcnQgeyBTZXJ2ZXJSb3V0ZUluZm8gfSBmcm9tIFwiLi4vLi4vc2V0dGluZy9TZXJ2ZXJSb3V0ZXNcIjtcclxuLy8gaW1wb3J0ICogYXMgQnl0ZUJ1ZmZlciBmcm9tIFwiYnl0ZWJ1ZmZlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29ja2V0SGVscGVyIGV4dGVuZHMgQmFzZVNlcnZlckhlbHBlclxyXG57XHJcbiAgICBwcml2YXRlIHNvY2tldDpOZXRTb2NrZXQ7XHJcbiAgICBwcml2YXRlIHVybDpzdHJpbmc7XHJcbiAgICBwcml2YXRlIGNlclBhdGg6c3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBtc2dMaXN0ID0gW107XHJcbiAgICBwcml2YXRlIGJ1ZmZlckxpc3QgPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgc2VydmVyUm91dGU6U2VydmVyUm91dGVJbmZvO1xyXG5cclxuICAgIHByaXZhdGUgbW9kOnN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIHN1ZmZpeDpzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBfc2VuZENvdW50ID0gMDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNlcnZlci5vbihHYW1lU2VydmVyLkV2ZW50X0dhbWVTb2NrZXRDYWxsUmVjb25uZWN0LCB0aGlzLCB0aGlzLmNhbGxSZWNvbm5lY3QpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWxsUmVjb25uZWN0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1zZ0xpc3QgPSBbXTtcclxuICAgICAgICBpZihHbG9iYWwuU2V0dGluZy5VcmxzLmdhbWVSb3V0ZXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHbG9iYWwuU2V0dGluZy5VcmxzLmdhbWVSb3V0ZXMuY2hhbmdlVG9Bbm90aGVyUm91dGUoKTtcclxuICAgICAgICAgICAgbGV0IHJvdXRlID0gR2xvYmFsLlNldHRpbmcuVXJscy5nYW1lUm91dGVzLmdldEN1clJvdXRlKCk7XHJcbiAgICAgICAgICAgIGlmKHJvdXRlID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKEdsb2JhbC5TZXR0aW5nLlVybHMuaGFsbFJvdXRlcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuU2V0dGluZy5VcmxzLmhhbGxSb3V0ZXMuY2hhbmdlVG9Bbm90aGVyUm91dGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJjaGFuZ2Ugc29ja2V0IHVybFwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcm91dGUgPSBHbG9iYWwuU2V0dGluZy5VcmxzLmhhbGxSb3V0ZXMuZ2V0Q3VyUm91dGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihyb3V0ZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VydmVyVXJsID0gcm91dGUuZ2V0UGJTb2NrZXRVcmwodGhpcy5tb2QpO1xyXG4gICAgICAgICAgICAgICAgc2VydmVyVXJsLnN1ZmZpeD0gc2VydmVyVXJsLnN1ZmZpeCArIHRoaXMuc3VmZml4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cmwgPSBHbG9iYWwuVXJsVXRpbC5kZWFsV2ViU29ja2V0VXJsKHNlcnZlclVybClcclxuICAgICAgICAgICAgICAgIHRoaXMuY2VyUGF0aCA9IHNlcnZlclVybC5jZXJQYXRoXHJcbiAgICAgICAgICAgICAgICAvLyDmm7TmlrDmnIDmlrBzZXJ2ZXJyb3V0ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2ZXJSb3V0ZSA9IHJvdXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImNoYW5nZSBzb2NrZXQgdXJsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbm5lY3QodGhpcy51cmwsIHRoaXMuc2VydmVyUm91dGUsIHRoaXMuc29ja2V0LnVzZVBiLCB0aGlzLm1vZCwgdGhpcy5zdWZmaXgsdGhpcy5jZXJQYXRoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGNvbm5lY3QodXJsOnN0cmluZywgc2VydmVyUm91dGU6U2VydmVyUm91dGVJbmZvLCBwYk1vZGUgPSBmYWxzZSwgbW9kID0gXCJcIiwgc3VmZml4ID0gXCJcIixjZXJQYXRoID0gXCJcIilcclxuICAgIHtcclxuICAgICAgICBpZiAoIXVybCB8fCB1cmwgPT0gXCJcIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMubW9kID0gbW9kO1xyXG4gICAgICAgIHRoaXMuc3VmZml4ID0gc3VmZml4O1xyXG4gICAgICAgIHRoaXMuc2VydmVyUm91dGUgPSBzZXJ2ZXJSb3V0ZTtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XHJcbiAgICAgICAgdGhpcy5jZXJQYXRoID0gY2VyUGF0aDtcclxuICAgICAgICB0aGlzLnNvY2tldCA9IG5ldyBOZXRTb2NrZXQodXJsLCBzZXJ2ZXJSb3V0ZSxjZXJQYXRoKTtcclxuICAgICAgICB0aGlzLnNvY2tldC5pbml0KHRoaXMsIHRoaXMub25Tb2NrZXRNc2csIHRoaXMub25Tb2NrZXRPcGVuLCB0aGlzLm9uU29ja2V0RXJyb3IsIHRoaXMub25Tb2NrZXRDbG9zZSwgcGJNb2RlKTtcclxuICAgICAgICB0aGlzLnNvY2tldC5jb25uZWN0KCk7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXIuZXZlbnQoR2FtZVNlcnZlci5FdmVudF9HYW1lU29ja2V0U3RhcnRDb25uZWN0KTtcclxuICAgICAgICBMb2dnZXIubG9nKFwiY29ubmVjdCB1cmw6XCIsIHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmQobXNnT2JqLCBub3cgPSBmYWxzZSlcclxuICAgIHtcclxuICAgICAgICAvLyBpZih0aGlzLnNvY2tldCA9PSBudWxsIHx8ICF0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCAmJiAhbm93KVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5tc2dMaXN0LnB1c2goY29udGVudCk7XHJcbiAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy/lpoLmnpzmmK9ub3cgIOW5tuS4lHNvY2tldOayoeWIneWni+WMliDnm7TmjqXkuKLlvINcclxuICAgICAgICBpZih0aGlzLnNvY2tldCAmJiB0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbmRDb3VudCsrO1xyXG4gICAgICAgICAgICBtc2dPYmouYyA9IHRoaXMuX3NlbmRDb3VudFxyXG4gICAgICAgICAgICBsZXQgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KG1zZ09iaik7XHJcbiAgICAgICAgICAgIC8vIExvZ2dlci5lcnJvcihcInNvY2tldCBzZW5kID0gXCIgKyBjb250ZW50KVxyXG4gICAgICAgICAgICBsZXQgZW5jcnB0ZWRNc2cgPSBjb250ZW50XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnVybCAmJiAodGhpcy51cmwuc3RhcnRzV2l0aChcIndzc1wiKSA9PSBmYWxzZSApJiYgY29udGVudCl7XHJcbiAgICAgICAgICAgICAgICBlbmNycHRlZE1zZyA9IEdsb2JhbC5BRVNVdGlsLmFlc0VuY3JwdE1zZyhjb250ZW50KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnNvY2tldC5zZW5kKGVuY3JwdGVkTXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kQnVmZmVyKGNtZCwgYnVmZmVyOlVpbnQ4QXJyYXksIG5vdyA9IGZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBzaXplID0gYnVmZmVyID8gYnVmZmVyLmxlbmd0aCA6IDA7XHJcbiAgICAgICAgc2l6ZSArPSA0O1xyXG4gICAgICAgIGxldCBiYiA9IEJ5dGVCdWZmZXIuYWxsb2NhdGUoc2l6ZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICBiYi53cml0ZVVpbnQzMihjbWQsIDApO1xyXG4gICAgICAgIGlmIChidWZmZXIpIHtcclxuICAgICAgICAgICAgYmIuYXBwZW5kKGJ1ZmZlciwgNCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuc29ja2V0ID09IG51bGwgfHwgIXRoaXMuc29ja2V0LmlzQ29ubmVjdGVkICYmICFub3cpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoJ3B1c2ggYnVmZmVyIGluIHF1ZXVlJyk7XHJcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyTGlzdC5wdXNoKGJiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WmguaenOaYr25vdyAg5bm25LiUc29ja2V05rKh5Yid5aeL5YyWIOebtOaOpeS4ouW8g1xyXG4gICAgICAgIGlmKHRoaXMuc29ja2V0ICYmIHRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXQuc2VuZChiYi5idWZmZXIpO1xyXG4gICAgICAgICAgICBiYi5jbGVhcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZEJ1ZmZlckRpcmVjdChiYjpCeXRlQnVmZmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc29ja2V0LnNlbmQoYmIuYnVmZmVyKTtcclxuICAgICAgICBiYi5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpXHJcbiAgICB7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuc29ja2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubXNnTGlzdC5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kKHRoaXMubXNnTGlzdFtpXSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuYnVmZmVyTGlzdC5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyRGlyZWN0KHRoaXMuYnVmZmVyTGlzdFtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zb2NrZXQuY2xlYW5Tb2NrZXQoKTtcclxuICAgICAgICAgICAgLy8gLy/kuKLlvINzb2NrZXTlvJXnlKjvvIzpmLLmraJsZWF2ZeWPkemAgeWujOeri+WIu+aWrXNvY2tldCDlr7zoh7Tmtojmga/lj5HluIPlh7rljrtcclxuICAgICAgICAgICAgLy8gbGV0IHNvY2tldCA9IHRoaXMuc29ja2V0O1xyXG4gICAgICAgICAgICAvLyBzb2NrZXQuY2xlYW5DYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIHNvY2tldC5jbGVhblNvY2tldCgpOyAgICBcclxuICAgICAgICAgICAgLy8gfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnNvY2tldCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubXNnTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3NlbmRDb3VudCA9IDBcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBvblNvY2tldE9wZW4oKVxyXG4gICAge1xyXG4gICAgICAgIExvZ2dlci5sb2coXCJzb2NrZXQgb3BlbjpcIiwgdGhpcy51cmwpO1xyXG4gICAgICAgIHRoaXMuc2VydmVyLmV2ZW50KEdhbWVTZXJ2ZXIuRXZlbnRfR2FtZVNvY2tldE9wZW4pO1xyXG4gICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9TT0NLRVRfT1BFTik7XHJcbiAgICAgICAgR2xvYmFsLlNldHRpbmcuVXJscy5zb3J0R2FtZVJvdXRlcygpXHJcblxyXG4gICAgICAgIGxldCBzZXJ2ZXJVcmwgPSB0aGlzLmdldFNlcnZlclVybCgpO1xyXG4gICAgICAgIGlmKHNlcnZlclVybClcclxuICAgICAgICAgICAgR2xvYmFsLlJlcG9ydFRvb2wubWFya1NvY2tldFN1Y2Nlc3Moc2VydmVyVXJsLCAwKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTZXJ2ZXJVcmwoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKEdsb2JhbC5TZXR0aW5nLlVybHMuZ2FtZVJvdXRlcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCByb3V0ZSA9IEdsb2JhbC5TZXR0aW5nLlVybHMuZ2FtZVJvdXRlcy5nZXRDdXJSb3V0ZSgpO1xyXG4gICAgICAgICAgICBpZihyb3V0ZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcm91dGUgPSBHbG9iYWwuU2V0dGluZy5VcmxzLmhhbGxSb3V0ZXMuZ2V0Q3VyUm91dGUoKTtcclxuICAgICAgICAgICAgaWYocm91dGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBzZXJ2ZXJVcmwgPSByb3V0ZS5nZXRQYlNvY2tldFVybCh0aGlzLm1vZCk7XHJcbiAgICAgICAgICAgICAgICBpZihzZXJ2ZXJVcmwpXHJcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmVyVXJsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Tb2NrZXRNc2cobXNnKVxyXG4gICAge1xyXG4gICAgIFxyXG4gICAgICAgIGlmKHR5cGVvZihtc2cpID09IFwic3RyaW5nXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVN0cmluZ01zZyhtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVBiTXNnKG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlU3RyaW5nTXNnKG1zZylcclxuICAgIHtcclxuICAgICAgICBsZXQgbmV0T2JqID0gbnVsbDtcclxuICAgICAgICB0cnlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBkZWNvZGUgPSBHbG9iYWwuQUVTVXRpbC5kZWNvZGVNc2cobXNnKTtcclxuICAgICAgICAgICAgbmV0T2JqID0gSlNPTi5wYXJzZShkZWNvZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaChlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi6Kej5p6Q5Y2P6K6u5aSx6LSlXCIsIG1zZywgZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobmV0T2JqLl9wYXJhbSAmJiBuZXRPYmouX3BhcmFtLl9jbWQgIT0gR2FtZS5Db21tYW5kLkhlYXJ0QmVhdClcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIlNvY2tldE1zZzpcIiwgbXNnKTtcclxuICAgICAgICB0aGlzLnNlcnZlci5ldmVudChHYW1lU2VydmVyLkV2ZW50X0dhbWVTb2NrZXRNc2csIG5ldE9iaik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVQYk1zZyhtc2cpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KG1zZyk7XHJcbiAgICAgICAgLy/lpKflrZfoioLluo/or7vlj5Zjb21tYW5kXHJcbiAgICAgICAgbGV0IGNvbW1hbmQgPSBCeXRlQnVmZmVyLndyYXAoYnVmZmVyLnNsaWNlKDAsIDQpLCBmYWxzZSkucmVhZFVpbnQzMigwKTtcclxuICAgICAgICBsZXQgcGFyYURhdGEgPSBidWZmZXIuc2xpY2UoNCk7XHJcblxyXG4gICAgICAgIGNvbW1hbmQgPSBcIipnYW1lKl9cIiArIGNvbW1hbmQ7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXIuZXZlbnQoR2FtZVNlcnZlci5FdmVudF9HYW1lUEJTb2NrZXRNc2csIGNvbW1hbmQsIHBhcmFEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU29ja2V0Q2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2VydmVyLmV2ZW50KEdhbWVTZXJ2ZXIuRXZlbnRfR2FtZVNvY2tldENsb3NlKTtcclxuICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfU09DS0VUX0NMT1NFKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU29ja2V0RXJyb3IoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBzZXJ2ZXJVcmwgPSB0aGlzLmdldFNlcnZlclVybCgpO1xyXG4gICAgICAgIGlmKHNlcnZlclVybClcclxuICAgICAgICAgICAgR2xvYmFsLlJlcG9ydFRvb2wubWFya1NvY2tldEZhaWxlZChzZXJ2ZXJVcmwsIC0xKTtcclxuICAgICAgICB0aGlzLnNlcnZlci5ldmVudChHYW1lU2VydmVyLkV2ZW50X0dhbWVTb2NrZXRDbG9zZSk7XHJcbiAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX1NPQ0tFVF9FUlJPUik7XHJcbiAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX0NBTExfUkVDT05ORUNUKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25VcGRhdGUoZHQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuc29ja2V0IHx8ICF0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKHRoaXMubXNnTGlzdC5sZW5ndGggPiAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubXNnTGlzdC5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQuc2VuZCh0aGlzLm1zZ0xpc3RbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubXNnTGlzdCA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==