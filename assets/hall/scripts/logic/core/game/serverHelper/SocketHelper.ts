import GameServer from "../GameServer";
import { NetSocket } from "../../../../framework/net/socket/NetSocket";
import BaseServerHelper from "./BaseServerHelper";
import { ServerRouteInfo } from "../../setting/ServerRoutes";
// import * as ByteBuffer from "bytebuffer";

export default class SocketHelper extends BaseServerHelper
{
    private socket:NetSocket;
    private url:string;
    private cerPath:string;
    private msgList = [];
    private bufferList = [];

    public serverRoute:ServerRouteInfo;

    private mod:string = "";
    private suffix:string = "";
    private _sendCount = 0;

    protected onInit()
    {
        this.server.on(GameServer.Event_GameSocketCallReconnect, this, this.callReconnect)
    }

    private callReconnect()
    {
        this.msgList = [];
        if(Global.Setting.Urls.gameRoutes)
        {
            Global.Setting.Urls.gameRoutes.changeToAnotherRoute();
            let route = Global.Setting.Urls.gameRoutes.getCurRoute();
            if(route == null)
            {
                if(Global.Setting.Urls.hallRoutes)
                {
                    Global.Setting.Urls.hallRoutes.changeToAnotherRoute();
                    Logger.error("change socket url")
                }
                route = Global.Setting.Urls.hallRoutes.getCurRoute();
            }
            if(route != null)
            {
                let serverUrl = route.getPbSocketUrl(this.mod);
                serverUrl.suffix= serverUrl.suffix + this.suffix;
                this.url = Global.UrlUtil.dealWebSocketUrl(serverUrl)
                this.cerPath = serverUrl.cerPath
                // 更新最新serverroute
                this.serverRoute = route;
            }
            Logger.error("change socket url");
        }
        this.connect(this.url, this.serverRoute, this.socket.usePb, this.mod, this.suffix,this.cerPath);
    }


    public connect(url:string, serverRoute:ServerRouteInfo, pbMode = false, mod = "", suffix = "",cerPath = "")
    {
        if (!url || url == "")
            return;
        this.mod = mod;
        this.suffix = suffix;
        this.serverRoute = serverRoute;
        this.clear();
        this.url = url;
        this.cerPath = cerPath;
        this.socket = new NetSocket(url, serverRoute,cerPath);
        this.socket.init(this, this.onSocketMsg, this.onSocketOpen, this.onSocketError, this.onSocketClose, pbMode);
        this.socket.connect();
        this.server.event(GameServer.Event_GameSocketStartConnect);
        Logger.log("connect url:", url);
    }

    public send(msgObj, now = false)
    {
        // if(this.socket == null || !this.socket.isConnected && !now)
        // {
        //     this.msgList.push(content);
        //     return;
        // }
        //如果是now  并且socket没初始化 直接丢弃
        if(this.socket && this.socket.isConnected)
        {
            this._sendCount++;
            msgObj.c = this._sendCount
            let content = JSON.stringify(msgObj);
            // Logger.error("socket send = " + content)
            let encrptedMsg = content
            if (this.url && (this.url.startsWith("wss") == false )&& content){
                encrptedMsg = Global.AESUtil.aesEncrptMsg(content)
            }
            
            this.socket.send(encrptedMsg);
        }
            
    }

    public sendBuffer(cmd, buffer:Uint8Array, now = false)
    {
        let size = buffer ? buffer.length : 0;
        size += 4;
        let bb = ByteBuffer.allocate(size, false, false);
        bb.writeUint32(cmd, 0);
        if (buffer) {
            bb.append(buffer, 4);
        }
        if(this.socket == null || !this.socket.isConnected && !now)
        {
            Logger.error('push buffer in queue');
            this.bufferList.push(bb);
            return;
        }
        //如果是now  并且socket没初始化 直接丢弃
        if(this.socket && this.socket.isConnected)
        {
            this.socket.send(bb.buffer);
            bb.clear();
        }
    }

    public sendBufferDirect(bb:ByteBuffer)
    {
        this.socket.send(bb.buffer);
        bb.clear();
    }

    public clear()
    {

        if(this.socket)
        {
            for(let i = 0; i < this.msgList.length; i++)
            {
                this.send(this.msgList[i], true);
            }
            for(let i = 0; i < this.bufferList.length; i++)
            {
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
        this._sendCount = 0
    }


    private onSocketOpen()
    {
        Logger.log("socket open:", this.url);
        this.server.event(GameServer.Event_GameSocketOpen);
        Game.Event.event(Game.EVENT_SOCKET_OPEN);
        Global.Setting.Urls.sortGameRoutes()

        let serverUrl = this.getServerUrl();
        if(serverUrl)
            Global.ReportTool.markSocketSuccess(serverUrl, 0);
        
    }


    private getServerUrl()
    {
        if(Global.Setting.Urls.gameRoutes)
        {
            let route = Global.Setting.Urls.gameRoutes.getCurRoute();
            if(route == null)
                route = Global.Setting.Urls.hallRoutes.getCurRoute();
            if(route)
            {
                let serverUrl = route.getPbSocketUrl(this.mod);
                if(serverUrl)
                   return serverUrl;
            }
        }
        return null;
    }

    private onSocketMsg(msg)
    {
     
        if(typeof(msg) == "string")
        {
            this.handleStringMsg(msg);
        }
        else
        {
            this.handlePbMsg(msg);
        }
    }

    private handleStringMsg(msg)
    {
        let netObj = null;
        try
        {
            let decode = Global.AESUtil.decodeMsg(msg);
            netObj = JSON.parse(decode);
        }
        catch(e)
        {
            Logger.error("解析协议失败", msg, e);
            return;
        }
        if(netObj._param && netObj._param._cmd != Game.Command.HeartBeat)
            Logger.log("SocketMsg:", msg);
        this.server.event(GameServer.Event_GameSocketMsg, netObj);
    }

    private handlePbMsg(msg)
    {
        let buffer = new Uint8Array(msg);
        //大字节序读取command
        let command = ByteBuffer.wrap(buffer.slice(0, 4), false).readUint32(0);
        let paraData = buffer.slice(4);

        command = "*game*_" + command;
        this.server.event(GameServer.Event_GamePBSocketMsg, command, paraData);
    }

    private onSocketClose()
    {
        this.server.event(GameServer.Event_GameSocketClose);
        Game.Event.event(Game.EVENT_SOCKET_CLOSE);
    }

    private onSocketError()
    {
        let serverUrl = this.getServerUrl();
        if(serverUrl)
            Global.ReportTool.markSocketFailed(serverUrl, -1);
        this.server.event(GameServer.Event_GameSocketClose);
        Game.Event.event(Game.EVENT_SOCKET_ERROR);
        Game.Event.event(Game.EVENT_CALL_RECONNECT);
    }

    public onUpdate(dt)
    {
        if(!this.socket || !this.socket.isConnected)
            return;
        if(this.msgList.length > 0)
        {
            for(let i = 0; i < this.msgList.length; i++)
            {
                this.socket.send(this.msgList[i]);
            }
            this.msgList = [];
        }
    }
}