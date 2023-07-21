
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/net/chat/ChatServer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '70c021DUQxH9blO5UAeu0BO', 'ChatServer');
// hall/scripts/logic/core/net/chat/ChatServer.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NetSocket_1 = require("../../../../framework/net/socket/NetSocket");
var italkmsg_crc_1 = require("../tcp/italkmsg_crc");
var italkmsg_pb_1 = require("../tcp/italkmsg_pb");
var italk_msg_buffer_1 = require("../tcp/italk_msg_buffer");
var HallModel_1 = require("../../../hallcommon/model/HallModel");
var ServicerModel_1 = require("../../../hallcommon/model/ServicerModel");
var SystemTimeManager_1 = require("./SystemTimeManager");
var ChatServer = /** @class */ (function () {
    function ChatServer() {
        this.isUserLogin = false;
        this.severCheckTime = 1;
        this.connectedCount = 0; //连接次数
        this.userid = "";
        this.token = "";
        this.serverType = ServicerModel_1.CustomerEntranceType.HallService;
        this.aite_type = 3; //3 旧版本艾特 4 新版本艾特
        this.severUserid = ""; //客服UserID
        this.fid = ""; //    群id
        this.severName = "艾特客服";
        this.hurl = ""; //httpURl
        this.turl = ""; //长连接URL
        this.dataArray = new Array();
        this.chatCls = null;
        this.systemTime = SystemTimeManager_1.default.getInstance();
    }
    ChatServer.prototype.connect = function (url) {
        if (url === void 0) { url = this.turl; }
        if (this.chatCls == null) { //登陆成功
            this.chatCls = Global.UI.getWindow("WndVipQuickPayChat");
        }
        if (this.connectedCount == 0 && this.chatCls.isOpen == false) {
            Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "connect_socket");
            // Global.UI.fastTip("正在连接聊天系统");
        }
        url = "wss://" + url + "/mini/?userid=" + this.userid + "&appid=" + Global.Setting.appId + "&token=" + this.token;
        if (this.socket) {
            if (this.socket.status == NetSocket_1.NetStatus.connected) {
                Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "connect_socket");
                this.sendLoginMsg(); //发送登录消息
                return;
            }
            else {
                this.socket.connect();
            }
        }
        else {
            this.socket = new NetSocket_1.NetSocket(url);
            this.socket.init(this, this.onMessage, this.onOpen, this.onError, this.onClose, true);
            this.socket.connect();
        }
    };
    ChatServer.prototype.clear = function () {
        if (this.hearttime) {
            clearTimeout(this.hearttime);
        }
        if (this.socket) {
            this.severName = "";
            this.chatCls.severHeadFrame = null;
            this.socket.cleanSocket();
            this.socket.close();
            this.socket = null;
        }
    };
    //用户登陆
    ChatServer.prototype.userSetting = function (data, aite_url) {
        var _this = this;
        if (aite_url === void 0) { aite_url = ""; }
        this.connectedCount = 0;
        this.QuickData = data;
        var aiteType = 3;
        if (data && data.url && data.open_type == 4) {
            aite_url = data.url;
        }
        if (aite_url && aite_url.indexOf("pid=") != -1) {
            var dateArr = aite_url.split("=");
            aiteType = 4;
            this.serverType = Number(dateArr[dateArr.length - 1]);
        }
        this.clear();
        this.aite_type = aiteType;
        var param = { aite_device: Global.Toolkit.genDeviceInfo(), aite_type: this.aite_type };
        Global.HallServer.send(NetAppface.mod, "LoginAite", param, function (success) {
            if (success) {
                _this.setAiteData(success);
                _this.showAiteChat(aite_url);
            }
        }, function (error) {
            Global.UI.fastTip("获取客服信息失败");
        });
    };
    //游客登陆
    ChatServer.prototype.otherSetting = function (data, aite_url) {
        var _this = this;
        if (aite_url === void 0) { aite_url = Global.Setting.aite_url; }
        this.connectedCount = 0;
        var loginModel = Global.ModelManager.getModel("LoginModel");
        var param = loginModel.getLoginParam("", null, 1);
        var aiteType = 3;
        if (aite_url && aite_url.indexOf("pid=") != -1) {
            var dateArr = aite_url.split("=");
            aiteType = 4;
            this.serverType = Number(dateArr[dateArr.length - 1]);
        }
        this.clear();
        param.aite_device = Global.Toolkit.genDeviceInfo();
        param.aite_type = aiteType;
        Global.HallServer.sendAiteLogin("LoginAite", param, function (success) {
            if (success) {
                _this.setAiteData(success);
                _this.showAiteChat(aite_url);
            }
        }, function (error) {
            Global.UI.fastTip("获取客服信息失败");
        });
    };
    ChatServer.prototype.setAiteData = function (data) {
        this.userid = data.userid;
        this.token = data.token;
        this.hurl = data.hurl;
        this.turl = data.turl;
    };
    ChatServer.prototype.showAiteChat = function (aite_url) {
        if (aite_url === void 0) { aite_url = null; }
        // if(this.serverType == ServiceEntranceType.QuickPayService || aite_url == null ||aite_url ==""){
        this.connect(this.turl);
        this.isUserLogin = true;
        // }else{
        //     let dateArr =  aite_url.split("?");
        //     let appKey = "?appid="
        //     if(dateArr.length > 1)
        //     {
        //         appKey = "&appid="
        //     }
        //     let aiteUrl = aite_url +appKey+ Global.Setting.appId +"&token="+this.token +"&localid=" + this.serverType+ "&aiteuserid=" + this.userid + "&hurl=" + this.hurl+ "&turl=" + this.turl;
        //     // Logger.error("使用web版本艾特客服 = "+aiteUrl);
        //     cc.sys.openURL(Global.Toolkit.DealWithUrl(aiteUrl));
        // }
    };
    ChatServer.prototype.onError = function () {
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "connect_socket");
        Logger.error("ChatServer socket onError");
    };
    ChatServer.prototype.onMessage = function (msg) {
        this._cacheData = new Uint8Array(msg);
        this.datalength = this._cacheData.byteLength;
        this._cacheData = this._cacheData;
        this.recveMsg();
    };
    ChatServer.prototype.onClose = function () {
        Logger.error("ChatServer socket onClose");
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "connect_socket");
        // if(this.chatCls.isOpen){  //确保断线时只提示一次
        //     Global.UI.fastTip("正在连接聊天系统");
        // }
    };
    ChatServer.prototype.onOpen = function () {
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "connect_socket");
        this.sendLoginMsg(); //发送登录消息
        // Logger.error("数据发送中...");
    };
    ChatServer.prototype.sendLoginMsg = function () {
        var loginMsg = new italkmsg_pb_1.italk.pb.ItalkLoginMsg();
        loginMsg.userid = this.userid; // 设置登录用户id
        loginMsg.localid = this.serverType; // 每次发送的唯一id
        loginMsg.msgType = italkmsg_pb_1.italk.pb.ItalkTypeEnum.ITKServerCommon; // 消息类型：登录
        var buffer = italkmsg_pb_1.italk.pb.ItalkLoginMsg.encode(loginMsg).finish();
        var msgBuffer = italk_msg_buffer_1.default.buildBufer(buffer, loginMsg.msgType);
        this.sendMsg(msgBuffer);
    };
    ChatServer.prototype.sendHeartMsg = function () {
        console.log("心跳包发送中");
        this.systemTime.getLocalTime(); //
        var heartMsg = new italkmsg_pb_1.italk.pb.ItalkHeartMsg();
        heartMsg.userid = this.userid;
        heartMsg.token = this.token;
        heartMsg.msgType = italkmsg_pb_1.italk.pb.ItalkTypeEnum.ITKHEART;
        var buffer = italkmsg_pb_1.italk.pb.ItalkHeartMsg.encode(heartMsg).finish();
        var msgBuffer = italk_msg_buffer_1.default.buildBufer(buffer, heartMsg.msgType);
        this.sendMsg(msgBuffer);
    };
    ChatServer.prototype.sendMsg = function (msgBuffer) {
        if (this.socketStatus()) {
            this.socket.send(msgBuffer); //发送
        }
        else {
            this.connect();
        }
    };
    ChatServer.prototype.socketStatus = function () {
        if (this.socket && this.socket.status != NetSocket_1.NetStatus.close) { //已连接
            return true;
        }
        else {
            return false;
        }
    };
    //消息翻页  第一次登录成功必须拉 最近的消息
    ChatServer.prototype.sendOfflineMsg = function () {
        var chatMsg = new italkmsg_pb_1.italk.pb.ItalkChatMsg();
        chatMsg.userid = this.userid; //发送者，必须自己
        chatMsg.fid = this.fid; ////群id
        chatMsg.timestamp = this.systemTime.getServerTime();
        chatMsg.msgType = italkmsg_pb_1.italk.pb.ItalkTypeEnum.ITKServerChat;
        chatMsg.chattype = italkmsg_pb_1.italk.pb.ItalkChatTypeEnum.ITKGroupChat;
        chatMsg.bussinesstype = italkmsg_pb_1.italk.pb.ItalkBusinessTypeEnum.ITKBussniesstype20; //业务类型：获取离线消息
        chatMsg.localid = 0; //每次发送的唯一id
        var buffer = italkmsg_pb_1.italk.pb.ItalkChatMsg.encode(chatMsg).finish();
        var msgBuffer = italk_msg_buffer_1.default.buildBufer(buffer, chatMsg.msgType);
        this.sendMsg(msgBuffer);
    };
    //发送文本消息
    ChatServer.prototype.sendChatTextMsg = function (content, msginfo1) {
        if (msginfo1 === void 0) { msginfo1 = ""; }
        var chatMsg = new italkmsg_pb_1.italk.pb.ItalkChatMsg();
        chatMsg.userid = this.userid; //发送者，必须自己
        chatMsg.fid = this.fid; ////群id
        chatMsg.uuid = this.uuid(); //消息ID
        chatMsg.localid = this.systemTime.randomBit();
        chatMsg.timestamp = this.systemTime.getServerTime();
        chatMsg.bussinesstype = italkmsg_pb_1.italk.pb.ItalkBusinessTypeEnum.ITKSMS; //业务类型：短信消息
        chatMsg.chattype = italkmsg_pb_1.italk.pb.ItalkChatTypeEnum.ITKGroupChat;
        var msgcontent = new italkmsg_pb_1.italk.pb.ItalkMsgContent(); //消息内容
        msgcontent.text = content;
        chatMsg.content = msgcontent;
        if (msginfo1.length > 0) {
            chatMsg.msgint1 = 1;
            chatMsg.msginfo1 = msginfo1;
        }
        chatMsg.msgType = italkmsg_pb_1.italk.pb.ItalkTypeEnum.ITKServerChat; //消息类型                               
        var buffer = italkmsg_pb_1.italk.pb.ItalkChatMsg.encode(chatMsg).finish();
        var msgBuffer = italk_msg_buffer_1.default.buildBufer(buffer, chatMsg.msgType);
        // console.log("sendChatTextMsg", chatMsg.toObject());
        this.sendMsg(msgBuffer);
    };
    ChatServer.prototype.sendChatImageMsg = function (content) {
        var chatMsg = new italkmsg_pb_1.italk.pb.ItalkChatMsg();
        chatMsg.userid = this.userid; //发送者，必须自己
        chatMsg.fid = this.fid; ////群id
        chatMsg.uuid = this.uuid(); //消息ID
        chatMsg.localid = this.systemTime.randomBit();
        chatMsg.timestamp = this.systemTime.getServerTime();
        chatMsg.bussinesstype = italkmsg_pb_1.italk.pb.ItalkBusinessTypeEnum.ITKPic; //业务类型：短信消息
        chatMsg.chattype = italkmsg_pb_1.italk.pb.ItalkChatTypeEnum.ITKGroupChat;
        chatMsg.content = content;
        chatMsg.msgType = italkmsg_pb_1.italk.pb.ItalkTypeEnum.ITKServerChat; //消息类型                               
        var buffer = italkmsg_pb_1.italk.pb.ItalkChatMsg.encode(chatMsg).finish();
        var msgBuffer = italk_msg_buffer_1.default.buildBufer(buffer, chatMsg.msgType);
        // console.log("sendChatTextMsg", chatMsg.toObject());
        this.sendMsg(msgBuffer);
    };
    ChatServer.prototype.sendChatMoveMsg = function (content) {
        var chatMsg = new italkmsg_pb_1.italk.pb.ItalkChatMsg();
        chatMsg.userid = this.userid; //发送者，必须自己
        chatMsg.fid = this.fid; ////群id
        chatMsg.uuid = this.uuid(); //消息ID
        chatMsg.localid = this.systemTime.randomBit();
        chatMsg.timestamp = this.systemTime.getServerTime();
        chatMsg.bussinesstype = italkmsg_pb_1.italk.pb.ItalkBusinessTypeEnum.ITKShortVideo; //业务类型：短信消息
        chatMsg.chattype = italkmsg_pb_1.italk.pb.ItalkChatTypeEnum.ITKGroupChat;
        chatMsg.content = content;
        chatMsg.msgType = italkmsg_pb_1.italk.pb.ItalkTypeEnum.ITKServerChat; //消息类型                               
        var buffer = italkmsg_pb_1.italk.pb.ItalkChatMsg.encode(chatMsg).finish();
        var msgBuffer = italk_msg_buffer_1.default.buildBufer(buffer, chatMsg.msgType);
        // console.log("sendChatTextMsg", chatMsg.toObject());
        this.sendMsg(msgBuffer);
    };
    // 上报已读
    ChatServer.prototype.sendClearMsg = function () {
        var chatMsg = new italkmsg_pb_1.italk.pb.ItalkChatMsg();
        chatMsg.userid = this.userid; //发送者，必须自己
        chatMsg.fid = this.fid; //群id
        chatMsg.timestamp = this.systemTime.getServerTime();
        chatMsg.localid = this.systemTime.randomBit();
        chatMsg.bussinesstype = italkmsg_pb_1.italk.pb.ItalkBusinessTypeEnum.ITKChatStatusChange; //业务类型:清离线消息
        chatMsg.msgType = italkmsg_pb_1.italk.pb.ItalkTypeEnum.ITKServerChat;
        chatMsg.chattype = italkmsg_pb_1.italk.pb.ItalkChatTypeEnum.ITKGroupChat;
        var buffer = italkmsg_pb_1.italk.pb.ItalkChatMsg.encode(chatMsg).finish();
        var msgBuffer = italk_msg_buffer_1.default.buildBufer(buffer, chatMsg.msgType);
        // console.log("sendClearMsg ,清除未读消息");
        this.sendMsg(msgBuffer);
    };
    // 获取当前已读消息时间
    ChatServer.prototype.sendChangeMsg = function () {
        var chatMsg = new italkmsg_pb_1.italk.pb.ItalkChatMsg();
        chatMsg.userid = this.userid; //发送者，必须自己
        chatMsg.fid = this.fid; //群id
        chatMsg.timestamp = this.systemTime.getServerTime();
        chatMsg.localid = this.systemTime.randomBit();
        chatMsg.bussinesstype = italkmsg_pb_1.italk.pb.ItalkBusinessTypeEnum.ITKBussniesstype27; //业务类型:清离线消息
        chatMsg.msgType = italkmsg_pb_1.italk.pb.ItalkTypeEnum.ITKServerChat;
        chatMsg.chattype = italkmsg_pb_1.italk.pb.ItalkChatTypeEnum.ITKGroupChat;
        var buffer = italkmsg_pb_1.italk.pb.ItalkChatMsg.encode(chatMsg).finish();
        var msgBuffer = italk_msg_buffer_1.default.buildBufer(buffer, chatMsg.msgType);
        // console.log("sendChangeMsg ,获取当前消息状态");
        this.sendMsg(msgBuffer);
    };
    ChatServer.prototype.recveMsgChat = function (data) {
        var chat = italkmsg_pb_1.italk.pb.ItalkChatMsg.decode(data);
        //具体参考ItalkChatMsg的结构  服务端处理完成后发送消息，所以当前msgid为消息的id
        if (chat.content) {
            if (!this.dataArray) {
                this.dataArray = new Array();
            }
            if (chat.bussinesstype == italkmsg_pb_1.italk.pb.ItalkBusinessTypeEnum.ITKBussniesstype27) {
                if (chat.msglastindex > this.severCheckTime) {
                    this.severCheckTime = Number(chat.msglastindex);
                    this.chatCls.updateUI(this.severName, false); //更新未读消息状态
                }
            }
            else {
                // ITKRevokeMsg 撤回的消息
                if (chat.bussinesstype != italkmsg_pb_1.italk.pb.ItalkBusinessTypeEnum.ITKChatStatusChange) { //不是清除离线消息
                    var msgId = Number(chat.msgid.toString());
                    chat.msgid = msgId;
                    var timestamp = Number(chat.timestamp.toString());
                    chat.timestamp = timestamp;
                    var msgorder = Number(chat.msgorder.toString());
                    chat.msgorder = msgorder;
                    this.dataArray.push(chat);
                }
                else {
                    if (chat.userid != this.userid && (Number(chat.content.text) / 1000 / 1000 > this.severCheckTime)) {
                        this.sendChangeMsg();
                    }
                }
            }
        }
    };
    ChatServer.prototype.recveMsgChatecho = function (data) {
        var chatecho = italkmsg_pb_1.italk.pb.ItalkChatEchoMsg.decode(data);
        // console.log("ItalkChatEchoMsg"  ,chatecho);
        //具体参考ItalkChatEchoMsg的结构  服务端接收立马返回消息，所以当前msgid为0，以userid+localid为id
        // console.log("recveMsgChatecho", chatecho.toJSON);  
    };
    ChatServer.prototype.recveMsgLoginEcho = function (data) {
        var _this = this;
        this.sendHeartTime(); //定时发送心跳包
        this.severUserid = "";
        var loginecho = italkmsg_pb_1.italk.pb.ItalkLoginEchoMsg.decode(data);
        this.severUserid = loginecho.echoInfo.Info;
        this.fid = loginecho.token;
        if (this.QuickData) {
            this.severName = this.QuickData.name;
        }
        else {
            if (this.severUserid.length > 0) { //客服userID 大于0 才获取头像
                this.getSeverInfo();
            }
        }
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING);
        if (this.connectedCount == 0) {
            Global.UI.showPortraitScreenNotice(function () {
                //切换成竖屏
                Global.NativeEvent.changeOrientationH(false);
                Global.UI.adjuestCanvasScreenStretch(cc.Canvas.instance);
                Global.UI.show("WndVipQuickPayChat", _this.severName);
            });
        }
        else {
            if (this.chatCls.isOpen == true) {
                Global.UI.fastTip("聊天系统已重新连接");
            }
            Logger.error("ChatServer socket connectedCount= ", this.connectedCount);
        }
        this.connectedCount++;
    };
    ChatServer.prototype.recveMsgHeartEcho = function (data) {
        //接收到心跳默认连接成功
        var hearecho = italkmsg_pb_1.italk.pb.ItalkHeartEchoMsg.decode(data);
        this.systemTime.setServerTime(hearecho.heartCount); //
    };
    ChatServer.prototype.sendHeartTime = function () {
        clearTimeout(this.hearttime);
        var self = this;
        this.hearttime = setTimeout(function () {
            self.sendHeartMsg(); //发送心跳包
            self.sendHeartTime(); //定时发送心跳包
        }, 1000 * 20);
    };
    ChatServer.prototype.recveMsg = function () {
        var datalength = this.datalength;
        var data = this._cacheData;
        var curindex = 0;
        var totel = datalength; //data.byteLength;
        do {
            var headbuf = new Uint8Array(8);
            for (var i = 0; i < 8; i++) {
                headbuf[i] = data[i + curindex];
            }
            var length = (headbuf[4] & 0xff) | ((headbuf[5] & 0xff) << 8);
            var bodylength = headbuf[2] * 10240 + length + 24;
            var crcbuf = new Uint8Array(2);
            var crcnum = italkmsg_crc_1.default.crc16(headbuf);
            crcbuf[0] = 0xff & crcnum;
            crcbuf[1] = 0xff & crcnum >> 8;
            if (headbuf[0] == 2 && crcbuf[0] == headbuf[6] && crcbuf[1] == headbuf[7] && totel >= bodylength) {
                var msgdata = new Uint8Array(data.subarray(curindex + 24, curindex + bodylength));
                totel -= bodylength;
                curindex += bodylength;
                switch (headbuf[1]) {
                    case italkmsg_pb_1.italk.pb.ItalkTypeEnum.ITKLoginECHO:
                        this.recveMsgLoginEcho(msgdata);
                        break;
                    case italkmsg_pb_1.italk.pb.ItalkTypeEnum.ITKChatECHO: //每发送一个消息包都会接收一个回复
                        this.recveMsgChatecho(msgdata);
                        break;
                    case italkmsg_pb_1.italk.pb.ItalkTypeEnum.ITKHeartECHO: // this.sendChatTextMsg("心跳包");
                        this.recveMsgHeartEcho(msgdata);
                        break;
                    case italkmsg_pb_1.italk.pb.ItalkTypeEnum.ITKChat: // console.log("ITKServerChat", "收到消息");
                        this.recveMsgChat(msgdata);
                        break;
                    case italkmsg_pb_1.italk.pb.ItalkTypeEnum.ITKServerChat: //消息包 自己发送的
                        this.recveMsgChat(msgdata);
                        break;
                    default:
                        // console.log("default", headbuf[1]);
                        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
                        break;
                }
            }
            else {
                datalength = 0;
                for (var i = 0; i < totel; i++) {
                    this._cacheData[datalength] = data[i + curindex];
                    datalength++;
                }
                this.datalength = datalength;
                break;
            }
        } while (true);
        if (this.dataArray) {
            this.dataArray.reverse();
            for (var i = 0; i < this.dataArray.length; i++) {
                var chat = new italkmsg_pb_1.italk.pb.ItalkChatMsg();
                chat = this.dataArray[i];
                if (chat.content) {
                    if (this.sendKefuRedSpot(chat)) { //客服消息是当前连接的客服消息才加入展示
                        if (chat.bussinesstype == italkmsg_pb_1.italk.pb.ItalkBusinessTypeEnum.ITKRevokeMsg && !chat.content.desc) {
                            this.removeChat(Number(chat.content.text));
                        }
                        else {
                            this.chatCls.data.push(chat);
                        }
                    }
                }
            }
            if (this.dataArray.length > 0) {
                this.dataArray = null;
                this.chatCls.updateUI(this.severName);
            }
        }
    };
    // 撤回已加入对话的消息
    ChatServer.prototype.removeChat = function (msgid) {
        // 根据单个名字筛选
        this.chatCls.data = this.chatCls.data.filter(function (item) { return item.msgid != msgid; });
    };
    ChatServer.prototype.sendKefuRedSpot = function (chat) {
        var idArray = chat.fid.split("_");
        var kefuID = idArray[0];
        if (kefuID == "g" + ServicerModel_1.CustomerEntranceType.LoginService) { //登陆客服
            Global.Event.event(GlobalEvent.ShowRedSpot, [false, HallModel_1.HallRedSpotType.LoginKefu]);
        }
        else if (kefuID == "g" + ServicerModel_1.CustomerEntranceType.HallService) { //大厅联系客服
            Global.Event.event(GlobalEvent.ShowRedSpot, [false, HallModel_1.HallRedSpotType.Kefu]);
        }
        if ("g" + this.serverType == kefuID) {
            return true;
        }
        else {
            return false;
        }
    };
    //获取UUID
    ChatServer.prototype.uuid = function () {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
    };
    //获取客服信息
    ChatServer.prototype.getSeverInfo = function () {
        var _this = this;
        var param = {
            userid: this.severUserid,
        };
        var suffix = "/mini/user?userid=" + this.userid + "&token=" + this.token;
        this.sendImageWithParam(suffix, "GetGameUserInfo", param, function (res) {
            if (res.head != null) {
                _this.severName = res.name;
                if (res.head.length > 0) {
                    _this.chatCls.loadSeverHeader(_this.getImageHttp(res.head), function (frame) {
                        _this.chatCls.severHeadFrame = frame;
                        _this.chatCls.updateUI(res.name);
                    });
                }
                else {
                    _this.chatCls.updateUI(res.name);
                }
            }
            else {
                Global.UI.fastTip(res._errstr);
            }
        }, function (error) {
            Global.UI.fastTip(error._errstr);
        });
    };
    ChatServer.prototype.sendImageWithParam = function (suffix, func, param, onComplete, errorHandler) {
        var paramJSON = {
            _mod: "login",
            _func: func,
            _param: param,
        };
        var xhr = new XMLHttpRequest(); //第一步：创建需要的对象
        xhr.open('POST', "https://" + Global.ChatServer.hurl + suffix, true); //第二步：打开连接/***发送json格式文件必须设置请求头 ；如下 - */
        xhr.setRequestHeader("Content-type", "application/json"); //设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）var obj = { name: 'zhansgan', age: 18 };
        xhr.send(JSON.stringify(paramJSON)); //发送请求 将json写入send中
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status == 200 && xhr.responseText) { //验证请求是否发送成功
                var data = JSON.parse(xhr.responseText);
                if (data._param != null) {
                    onComplete(data._param);
                }
                else {
                    if (errorHandler) {
                        var data_1 = JSON.parse(xhr.responseText);
                        errorHandler(data_1);
                    }
                }
            }
            else {
                if (errorHandler && xhr.responseText) {
                    var data = JSON.parse(xhr.responseText);
                    errorHandler(data);
                }
            }
        };
    };
    ChatServer.prototype.getImageHttp = function (url) {
        var dateArr = url.split("/");
        var fileName = dateArr[dateArr.length - 1];
        var imageURl = "https://" + this.hurl + "/login/ossfile?func=GetOssFile&name=" + fileName + "&token=" + this.token;
        return imageURl;
    };
    ChatServer.prototype.ossAuthority = function () {
        // {
        //     "_mod":"login",
        //     "_func":"GetSts",
        //     "_param":{
        //         "userid":"aite00000007"
        //     }
        // }
        var param = {
            userid: this.severUserid,
        };
        Global.ChatServer.sendImageWithParam("login/ossAuthority", "GetSts", param, function (res) {
            Logger.error("鉴权信息");
            Logger.error(res);
        }, function (error) {
            Global.UI.fastTip(error._errstr);
        });
        // login/ossAuthority
    };
    return ChatServer;
}());
exports.default = ChatServer;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXG5ldFxcY2hhdFxcQ2hhdFNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFrRjtBQUVsRixvREFBMkM7QUFFM0Msa0RBQTJDO0FBQzNDLDREQUFxRDtBQUVyRCxpRUFBc0U7QUFDdEUseUVBQThFO0FBQzlFLHlEQUFvRDtBQUVwRDtJQUFBO1FBQ1ksZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDckIsbUJBQWMsR0FBVSxDQUFDLENBQUM7UUFDMUIsbUJBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNO1FBRTFCLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsZUFBVSxHQUFHLG9DQUFvQixDQUFDLFdBQVcsQ0FBQztRQUM5QyxjQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsaUJBQWlCO1FBQ2hDLGdCQUFXLEdBQUcsRUFBRSxDQUFDLENBQUMsVUFBVTtRQUMzQixRQUFHLEdBQUcsRUFBRSxDQUFDLENBQUssU0FBUztRQUN2QixjQUFTLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLFNBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO1FBQ25CLFNBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxRQUFRO1FBSW5CLGNBQVMsR0FBZ0MsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUV0RCxZQUFPLEdBQXNCLElBQUksQ0FBQztRQUNqQyxlQUFVLEdBQXFCLDJCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBdWlCM0UsQ0FBQztJQXRpQlUsNEJBQU8sR0FBZCxVQUFlLEdBQWU7UUFBZixvQkFBQSxFQUFBLE1BQU0sSUFBSSxDQUFDLElBQUk7UUFDMUIsSUFBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksRUFBQyxFQUFFLE1BQU07WUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBdUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxT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SUFBSTtRQUNKLHNCQUFzQjtRQUN0Qix3QkFBd0I7UUFDeEIsaUJBQWlCO1FBQ2pCLGtDQUFrQztRQUNsQyxRQUFRO1FBQ1IsSUFBSTtRQUNKLElBQUksS0FBSyxHQUFHO1lBQ1IsTUFBTSxFQUFDLElBQUksQ0FBQyxXQUFXO1NBQzFCLENBQUE7UUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLG9CQUFvQixFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsVUFBQyxHQUFHO1lBQ3pFLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckIsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QixDQUFDLEVBQUMsVUFBQyxLQUFLO1lBQ0osTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFBO1FBQ0YscUJBQXFCO0lBQ3pCLENBQUM7SUFFTCxpQkFBQztBQUFELENBM2pCQSxBQTJqQkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5ldFNvY2tldCwgTmV0U3RhdHVzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9uZXQvc29ja2V0L05ldFNvY2tldFwiO1xyXG5pbXBvcnQgV25kVmlwUXVpY2tQYXlDaGF0IGZyb20gXCIuLi8uLi8uLi9oYWxsL3VpL3JlY2hhcmdlL1duZFZpcFF1aWNrUGF5Q2hhdFwiO1xyXG5pbXBvcnQgSXRhbGtDcmMgZnJvbSBcIi4uL3RjcC9pdGFsa21zZ19jcmNcIjtcclxuaW1wb3J0IEl0YWxrVW5pdCBmcm9tIFwiLi4vdGNwL2l0YWxrbXNnX3VuaXRcIjtcclxuaW1wb3J0IHsgaXRhbGsgfSBmcm9tIFwiLi4vdGNwL2l0YWxrbXNnX3BiXCI7XHJcbmltcG9ydCBJdGFsa01zZ0J1ZmZlciBmcm9tIFwiLi4vdGNwL2l0YWxrX21zZ19idWZmZXJcIjtcclxuaW1wb3J0IExvZ2luTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvTG9naW5Nb2RlbFwiO1xyXG5pbXBvcnQgeyBIYWxsUmVkU3BvdFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9IYWxsTW9kZWxcIjtcclxuaW1wb3J0IHsgQ3VzdG9tZXJFbnRyYW5jZVR5cGV9IGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1NlcnZpY2VyTW9kZWxcIjtcclxuaW1wb3J0IFN5c3RlbVRpbWVNYW5hZ2VyIGZyb20gXCIuL1N5c3RlbVRpbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBJbnQ2NCBmcm9tIFwiLi4vdGNwL2ludDY0XCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXRTZXJ2ZXIge1xyXG4gICAgcHJpdmF0ZSBpc1VzZXJMb2dpbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHNldmVyQ2hlY2tUaW1lOk51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgY29ubmVjdGVkQ291bnQgPSAwOyAvL+i/nuaOpeasoeaVsFxyXG4gICAgcHJpdmF0ZSBoZWFydHRpbWU6IGFueTtcclxuICAgIHB1YmxpYyB1c2VyaWQgPSBcIlwiO1xyXG4gICAgcHVibGljIHRva2VuID0gXCJcIjtcclxuICAgIHB1YmxpYyBzZXJ2ZXJUeXBlID0gQ3VzdG9tZXJFbnRyYW5jZVR5cGUuSGFsbFNlcnZpY2U7XHJcbiAgICBwdWJsaWMgYWl0ZV90eXBlID0gMzsgLy8zIOaXp+eJiOacrOiJvueJuSA0IOaWsOeJiOacrOiJvueJuVxyXG4gICAgcHVibGljIHNldmVyVXNlcmlkID0gXCJcIjsgLy/lrqLmnI1Vc2VySURcclxuICAgIHByaXZhdGUgZmlkID0gXCJcIjsgICAgIC8vICAgIOe+pGlkXHJcbiAgICBwcml2YXRlIHNldmVyTmFtZSA9IFwi6Im+54m55a6i5pyNXCI7XHJcbiAgICBwdWJsaWMgaHVybCA9IFwiXCI7IC8vaHR0cFVSbFxyXG4gICAgcHJpdmF0ZSB0dXJsID0gXCJcIjsgLy/plb/ov57mjqVVUkxcclxuICAgIHByaXZhdGUgc29ja2V0OiBOZXRTb2NrZXQ7XHJcbiAgICBwcml2YXRlIGRhdGFsZW5ndGg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2NhY2hlRGF0YTtcclxuICAgIHByaXZhdGUgZGF0YUFycmF5OkFycmF5PGl0YWxrLnBiLkl0YWxrQ2hhdE1zZz4gPSBuZXcgQXJyYXkoKTtcclxuICAgIHB1YmxpYyBRdWlja0RhdGE7XHJcbiAgICBwdWJsaWMgY2hhdENsczpXbmRWaXBRdWlja1BheUNoYXQgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBzeXN0ZW1UaW1lOlN5c3RlbVRpbWVNYW5hZ2VyID0gU3lzdGVtVGltZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgIHB1YmxpYyBjb25uZWN0KHVybCA9IHRoaXMudHVybCkge1xyXG4gICAgICAgIGlmKHRoaXMuY2hhdENscyA9PSBudWxsKXsgLy/nmbvpmYbmiJDlip9cclxuICAgICAgICAgICAgdGhpcy5jaGF0Q2xzID0gPFduZFZpcFF1aWNrUGF5Q2hhdD5HbG9iYWwuVUkuZ2V0V2luZG93KFwiV25kVmlwUXVpY2tQYXlDaGF0XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmNvbm5lY3RlZENvdW50ID09IDAgJiYgdGhpcy5jaGF0Q2xzLmlzT3BlbiA9PSBmYWxzZSl7IFxyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuU0hPV19ORVRfV0FJVElORyxcImNvbm5lY3Rfc29ja2V0XCIpXHJcbiAgICAgICAgICAgIC8vIEdsb2JhbC5VSS5mYXN0VGlwKFwi5q2j5Zyo6L+e5o6l6IGK5aSp57O757ufXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1cmwgPSBcIndzczovL1wiK3VybCArIFwiL21pbmkvP3VzZXJpZD1cIiArIHRoaXMudXNlcmlkICtcIiZhcHBpZD1cIiArIEdsb2JhbC5TZXR0aW5nLmFwcElkICsgXCImdG9rZW49XCIgKyB0aGlzLnRva2VuO1xyXG4gICAgICAgIGlmKHRoaXMuc29ja2V0KSAgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLnNvY2tldC5zdGF0dXMgPT0gTmV0U3RhdHVzLmNvbm5lY3RlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkhJREVfTkVUX1dBSVRJTkcsXCJjb25uZWN0X3NvY2tldFwiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kTG9naW5Nc2coKTsgIC8v5Y+R6YCB55m75b2V5raI5oGvXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0LmNvbm5lY3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNvY2tldCA9IG5ldyBOZXRTb2NrZXQodXJsKTtcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXQuaW5pdCh0aGlzLCB0aGlzLm9uTWVzc2FnZSwgdGhpcy5vbk9wZW4sIHRoaXMub25FcnJvciwgdGhpcy5vbkNsb3NlLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXQuY29ubmVjdCgpO1xyXG4gICAgICAgIH0gICAgIFxyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmhlYXJ0dGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmhlYXJ0dGltZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5zb2NrZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNldmVyTmFtZSA9IFwiXCJcclxuICAgICAgICAgICAgdGhpcy5jaGF0Q2xzLnNldmVySGVhZEZyYW1lID0gbnVsbFxyXG4gICAgICAgICAgICB0aGlzLnNvY2tldC5jbGVhblNvY2tldCgpXHJcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmNsb3NlKClcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXQgPSBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/nlKjmiLfnmbvpmYZcclxuICAgIHB1YmxpYyB1c2VyU2V0dGluZyhkYXRhLGFpdGVfdXJsPVwiXCIpe1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGVkQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuUXVpY2tEYXRhID0gZGF0YTtcclxuICAgICAgICBsZXQgYWl0ZVR5cGUgPSAzXHJcbiAgICAgICAgaWYoZGF0YSAmJiBkYXRhLnVybCAmJiBkYXRhLm9wZW5fdHlwZSA9PSA0KXtcclxuICAgICAgICAgICAgYWl0ZV91cmwgPSBkYXRhLnVybFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihhaXRlX3VybCAmJiBhaXRlX3VybC5pbmRleE9mKFwicGlkPVwiKSAhPSAtMSl7XHJcbiAgICAgICAgICAgIGxldCBkYXRlQXJyID0gIGFpdGVfdXJsLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICAgICAgYWl0ZVR5cGUgPSA0XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmVyVHlwZSA9ICBOdW1iZXIoZGF0ZUFycltkYXRlQXJyLmxlbmd0aC0xXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2xlYXIoKVxyXG4gICAgICAgIHRoaXMuYWl0ZV90eXBlID0gYWl0ZVR5cGVcclxuICAgICAgICBsZXQgcGFyYW0gPSB7YWl0ZV9kZXZpY2U6R2xvYmFsLlRvb2xraXQuZ2VuRGV2aWNlSW5mbygpLGFpdGVfdHlwZTp0aGlzLmFpdGVfdHlwZX07XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCxcIkxvZ2luQWl0ZVwiLHBhcmFtLChzdWNjZXNzKT0+e1xyXG4gICAgICAgICAgICBpZihzdWNjZXNzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QWl0ZURhdGEoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dBaXRlQ2hhdChhaXRlX3VybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwoZXJyb3IpPT57XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi6I635Y+W5a6i5pyN5L+h5oGv5aSx6LSlXCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy/muLjlrqLnmbvpmYZcclxuICAgIHB1YmxpYyBvdGhlclNldHRpbmcoZGF0YSxhaXRlX3VybD1HbG9iYWwuU2V0dGluZy5haXRlX3VybCl7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRDb3VudCA9IDA7XHJcbiAgICAgICAgbGV0IGxvZ2luTW9kZWwgPSA8TG9naW5Nb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiTG9naW5Nb2RlbFwiKTtcclxuICAgICAgICBsZXQgcGFyYW0gPSBsb2dpbk1vZGVsLmdldExvZ2luUGFyYW0oXCJcIiwgbnVsbCwgMSk7XHJcbiAgICAgICAgbGV0IGFpdGVUeXBlID0gM1xyXG4gICAgICAgIGlmKGFpdGVfdXJsICYmIGFpdGVfdXJsLmluZGV4T2YoXCJwaWQ9XCIpICE9IC0xKXtcclxuICAgICAgICAgICAgbGV0IGRhdGVBcnIgPSAgYWl0ZV91cmwuc3BsaXQoXCI9XCIpO1xyXG4gICAgICAgICAgICBhaXRlVHlwZSA9IDRcclxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXJUeXBlID0gIE51bWJlcihkYXRlQXJyW2RhdGVBcnIubGVuZ3RoLTFdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbGVhcigpXHJcbiAgICAgICAgcGFyYW0uYWl0ZV9kZXZpY2UgPSBHbG9iYWwuVG9vbGtpdC5nZW5EZXZpY2VJbmZvKCk7XHJcbiAgICAgICAgcGFyYW0uYWl0ZV90eXBlID0gYWl0ZVR5cGU7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZEFpdGVMb2dpbihcIkxvZ2luQWl0ZVwiLHBhcmFtLChzdWNjZXNzKT0+e1xyXG4gICAgICAgICAgICBpZihzdWNjZXNzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QWl0ZURhdGEoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dBaXRlQ2hhdChhaXRlX3VybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwoZXJyb3IpPT57XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi6I635Y+W5a6i5pyN5L+h5oGv5aSx6LSlXCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHNldEFpdGVEYXRhKGRhdGEpe1xyXG4gICAgICAgIHRoaXMudXNlcmlkID0gZGF0YS51c2VyaWQ7XHJcbiAgICAgICAgdGhpcy50b2tlbiA9IGRhdGEudG9rZW47XHJcbiAgICAgICAgdGhpcy5odXJsID0gZGF0YS5odXJsO1xyXG4gICAgICAgIHRoaXMudHVybCA9IGRhdGEudHVybDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc2hvd0FpdGVDaGF0KGFpdGVfdXJsPW51bGwpe1xyXG4gICAgICAgIC8vIGlmKHRoaXMuc2VydmVyVHlwZSA9PSBTZXJ2aWNlRW50cmFuY2VUeXBlLlF1aWNrUGF5U2VydmljZSB8fCBhaXRlX3VybCA9PSBudWxsIHx8YWl0ZV91cmwgPT1cIlwiKXtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0KHRoaXMudHVybCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNVc2VyTG9naW4gPSB0cnVlO1xyXG4gICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgIC8vICAgICBsZXQgZGF0ZUFyciA9ICBhaXRlX3VybC5zcGxpdChcIj9cIik7XHJcbiAgICAgICAgLy8gICAgIGxldCBhcHBLZXkgPSBcIj9hcHBpZD1cIlxyXG4gICAgICAgIC8vICAgICBpZihkYXRlQXJyLmxlbmd0aCA+IDEpXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIGFwcEtleSA9IFwiJmFwcGlkPVwiXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgbGV0IGFpdGVVcmwgPSBhaXRlX3VybCArYXBwS2V5KyBHbG9iYWwuU2V0dGluZy5hcHBJZCArXCImdG9rZW49XCIrdGhpcy50b2tlbiArXCImbG9jYWxpZD1cIiArIHRoaXMuc2VydmVyVHlwZSsgXCImYWl0ZXVzZXJpZD1cIiArIHRoaXMudXNlcmlkICsgXCImaHVybD1cIiArIHRoaXMuaHVybCsgXCImdHVybD1cIiArIHRoaXMudHVybDtcclxuICAgICAgICAvLyAgICAgLy8gTG9nZ2VyLmVycm9yKFwi5L2/55Sod2Vi54mI5pys6Im+54m55a6i5pyNID0gXCIrYWl0ZVVybCk7XHJcbiAgICAgICAgLy8gICAgIGNjLnN5cy5vcGVuVVJMKEdsb2JhbC5Ub29sa2l0LkRlYWxXaXRoVXJsKGFpdGVVcmwpKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uRXJyb3IoKSB7IFxyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5ISURFX05FVF9XQUlUSU5HLFwiY29ubmVjdF9zb2NrZXRcIilcclxuICAgICAgICBMb2dnZXIuZXJyb3IoXCJDaGF0U2VydmVyIHNvY2tldCBvbkVycm9yXCIpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk1lc3NhZ2UobXNnKSB7XHJcbiAgICAgICAgdGhpcy5fY2FjaGVEYXRhID0gbmV3IFVpbnQ4QXJyYXkobXNnKTtcclxuICAgICAgICB0aGlzLmRhdGFsZW5ndGggPSB0aGlzLl9jYWNoZURhdGEuYnl0ZUxlbmd0aFxyXG4gICAgICAgIHRoaXMuX2NhY2hlRGF0YSA9IHRoaXMuX2NhY2hlRGF0YTtcclxuICAgICAgICB0aGlzLnJlY3ZlTXNnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsb3NlKCkge1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihcIkNoYXRTZXJ2ZXIgc29ja2V0IG9uQ2xvc2VcIilcclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuSElERV9ORVRfV0FJVElORyxcImNvbm5lY3Rfc29ja2V0XCIpIFxyXG4gICAgICAgIC8vIGlmKHRoaXMuY2hhdENscy5pc09wZW4peyAgLy/noa7kv53mlq3nur/ml7blj6rmj5DnpLrkuIDmrKFcclxuICAgICAgICAvLyAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLmraPlnKjov57mjqXogYrlpKnns7vnu59cIik7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25PcGVuKCkge1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5ISURFX05FVF9XQUlUSU5HLFwiY29ubmVjdF9zb2NrZXRcIilcclxuICAgICAgICB0aGlzLnNlbmRMb2dpbk1zZygpOyAgLy/lj5HpgIHnmbvlvZXmtojmga9cclxuICAgICAgICAvLyBMb2dnZXIuZXJyb3IoXCLmlbDmja7lj5HpgIHkuK0uLi5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmRMb2dpbk1zZygpIHtcclxuICAgICAgICB2YXIgbG9naW5Nc2cgPSBuZXcgaXRhbGsucGIuSXRhbGtMb2dpbk1zZygpO1xyXG4gICAgICAgIGxvZ2luTXNnLnVzZXJpZCA9IHRoaXMudXNlcmlkOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6K6+572u55m75b2V55So5oi3aWRcclxuICAgICAgICBsb2dpbk1zZy5sb2NhbGlkID0gdGhpcy5zZXJ2ZXJUeXBlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOavj+asoeWPkemAgeeahOWUr+S4gGlkXHJcbiAgICAgICAgbG9naW5Nc2cubXNnVHlwZSA9IGl0YWxrLnBiLkl0YWxrVHlwZUVudW0uSVRLU2VydmVyQ29tbW9uOyAgICAgICAgICAvLyDmtojmga/nsbvlnovvvJrnmbvlvZVcclxuICAgICAgICBsZXQgYnVmZmVyOiBVaW50OEFycmF5ID0gaXRhbGsucGIuSXRhbGtMb2dpbk1zZy5lbmNvZGUobG9naW5Nc2cpLmZpbmlzaCgpO1xyXG4gICAgICAgIGxldCBtc2dCdWZmZXI6IFVpbnQ4QXJyYXkgPSBJdGFsa01zZ0J1ZmZlci5idWlsZEJ1ZmVyKGJ1ZmZlciwgbG9naW5Nc2cubXNnVHlwZSk7XHJcbiAgICAgICAgdGhpcy5zZW5kTXNnKG1zZ0J1ZmZlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmRIZWFydE1zZygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuW/g+i3s+WMheWPkemAgeS4rVwiKTtcclxuICAgICAgICB0aGlzLnN5c3RlbVRpbWUuZ2V0TG9jYWxUaW1lKCk7Ly9cclxuICAgICAgICB2YXIgaGVhcnRNc2cgPSBuZXcgaXRhbGsucGIuSXRhbGtIZWFydE1zZygpO1xyXG4gICAgICAgIGhlYXJ0TXNnLnVzZXJpZCA9IHRoaXMudXNlcmlkO1xyXG4gICAgICAgIGhlYXJ0TXNnLnRva2VuID0gdGhpcy50b2tlbjtcclxuICAgICAgICBoZWFydE1zZy5tc2dUeXBlID0gaXRhbGsucGIuSXRhbGtUeXBlRW51bS5JVEtIRUFSVDtcclxuICAgICAgICBsZXQgYnVmZmVyOiBVaW50OEFycmF5ID0gaXRhbGsucGIuSXRhbGtIZWFydE1zZy5lbmNvZGUoaGVhcnRNc2cpLmZpbmlzaCgpO1xyXG4gICAgICAgIGxldCBtc2dCdWZmZXI6IFVpbnQ4QXJyYXkgPSBJdGFsa01zZ0J1ZmZlci5idWlsZEJ1ZmVyKGJ1ZmZlciwgaGVhcnRNc2cubXNnVHlwZSk7XHJcbiAgICAgICAgdGhpcy5zZW5kTXNnKG1zZ0J1ZmZlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmRNc2cobXNnQnVmZmVyKSB7XHJcbiAgICAgICAgaWYodGhpcy5zb2NrZXRTdGF0dXMoKSl7XHJcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LnNlbmQobXNnQnVmZmVyKTsgIC8v5Y+R6YCBXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzb2NrZXRTdGF0dXMoKSB7XHJcbiAgICAgICAgaWYodGhpcy5zb2NrZXQgJiYgdGhpcy5zb2NrZXQuc3RhdHVzICE9IE5ldFN0YXR1cy5jbG9zZSl7IC8v5bey6L+e5o6lXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5raI5oGv57+76aG1ICDnrKzkuIDmrKHnmbvlvZXmiJDlip/lv4Xpobvmi4kg5pyA6L+R55qE5raI5oGvXHJcbiAgICBwdWJsaWMgc2VuZE9mZmxpbmVNc2coKSB7XHJcbiAgICAgICAgbGV0IGNoYXRNc2cgPSBuZXcgaXRhbGsucGIuSXRhbGtDaGF0TXNnKCk7XHJcbiAgICAgICAgY2hhdE1zZy51c2VyaWQgPSB0aGlzLnVzZXJpZDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lj5HpgIHogIXvvIzlv4Xpobvoh6rlt7FcclxuICAgICAgICBjaGF0TXNnLmZpZCA9IHRoaXMuZmlkOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8v576kaWRcclxuICAgICAgICBjaGF0TXNnLnRpbWVzdGFtcCA9IHRoaXMuc3lzdGVtVGltZS5nZXRTZXJ2ZXJUaW1lKClcclxuICAgICAgICBjaGF0TXNnLm1zZ1R5cGUgPSBpdGFsay5wYi5JdGFsa1R5cGVFbnVtLklUS1NlcnZlckNoYXQ7XHJcbiAgICAgICAgY2hhdE1zZy5jaGF0dHlwZSA9ICBpdGFsay5wYi5JdGFsa0NoYXRUeXBlRW51bS5JVEtHcm91cENoYXQ7XHJcbiAgICAgICAgY2hhdE1zZy5idXNzaW5lc3N0eXBlID0gaXRhbGsucGIuSXRhbGtCdXNpbmVzc1R5cGVFbnVtLklUS0J1c3NuaWVzc3R5cGUyMDsgICAgLy/kuJrliqHnsbvlnovvvJrojrflj5bnprvnur/mtojmga9cclxuICAgICAgICBjaGF0TXNnLmxvY2FsaWQgPSAwOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+avj+asoeWPkemAgeeahOWUr+S4gGlkXHJcbiAgICAgICAgbGV0IGJ1ZmZlcjogVWludDhBcnJheSA9IGl0YWxrLnBiLkl0YWxrQ2hhdE1zZy5lbmNvZGUoY2hhdE1zZykuZmluaXNoKCk7XHJcbiAgICAgICAgbGV0IG1zZ0J1ZmZlcjogVWludDhBcnJheSA9IEl0YWxrTXNnQnVmZmVyLmJ1aWxkQnVmZXIoYnVmZmVyLCBjaGF0TXNnLm1zZ1R5cGUpO1xyXG4gICAgICAgIHRoaXMuc2VuZE1zZyhtc2dCdWZmZXIpO1xyXG4gICAgfVxyXG4gICAgLy/lj5HpgIHmlofmnKzmtojmga9cclxuICAgIHB1YmxpYyBzZW5kQ2hhdFRleHRNc2coY29udGVudCxtc2dpbmZvMT1cIlwiKSB7XHJcbiAgICAgICAgbGV0IGNoYXRNc2cgPSBuZXcgaXRhbGsucGIuSXRhbGtDaGF0TXNnKCk7XHJcbiAgICAgICAgY2hhdE1zZy51c2VyaWQgPSB0aGlzLnVzZXJpZDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lj5HpgIHogIXvvIzlv4Xpobvoh6rlt7FcclxuICAgICAgICBjaGF0TXNnLmZpZCA9IHRoaXMuZmlkOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8v576kaWRcclxuICAgICAgICBjaGF0TXNnLnV1aWQgPSB0aGlzLnV1aWQoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+a2iOaBr0lEXHJcbiAgICAgICAgY2hhdE1zZy5sb2NhbGlkID0gdGhpcy5zeXN0ZW1UaW1lLnJhbmRvbUJpdCgpXHJcbiAgICAgICAgY2hhdE1zZy50aW1lc3RhbXAgPSB0aGlzLnN5c3RlbVRpbWUuZ2V0U2VydmVyVGltZSgpXHJcbiAgICAgICAgY2hhdE1zZy5idXNzaW5lc3N0eXBlID0gaXRhbGsucGIuSXRhbGtCdXNpbmVzc1R5cGVFbnVtLklUS1NNUzsgICAgICAgICAgICAgICAgLy/kuJrliqHnsbvlnovvvJrnn63kv6Hmtojmga9cclxuICAgICAgICBjaGF0TXNnLmNoYXR0eXBlID0gIGl0YWxrLnBiLkl0YWxrQ2hhdFR5cGVFbnVtLklUS0dyb3VwQ2hhdDtcclxuICAgICAgICBsZXQgbXNnY29udGVudCA9IG5ldyBpdGFsay5wYi5JdGFsa01zZ0NvbnRlbnQoKTsgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5raI5oGv5YaF5a65XHJcbiAgICAgICAgbXNnY29udGVudC50ZXh0ID0gY29udGVudDtcclxuICAgICAgICBjaGF0TXNnLmNvbnRlbnQgPSBtc2djb250ZW50O1xyXG4gICAgICAgIGlmKG1zZ2luZm8xLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBjaGF0TXNnLm1zZ2ludDEgPSAxO1xyXG4gICAgICAgICAgICBjaGF0TXNnLm1zZ2luZm8xID0gbXNnaW5mbzE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNoYXRNc2cubXNnVHlwZSA9IGl0YWxrLnBiLkl0YWxrVHlwZUVudW0uSVRLU2VydmVyQ2hhdDsgICAgICAgICAgICAgICAgICAgLy/mtojmga/nsbvlnosgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgbGV0IGJ1ZmZlcjogVWludDhBcnJheSA9IGl0YWxrLnBiLkl0YWxrQ2hhdE1zZy5lbmNvZGUoY2hhdE1zZykuZmluaXNoKCk7XHJcbiAgICAgICAgbGV0IG1zZ0J1ZmZlcjogVWludDhBcnJheSA9IEl0YWxrTXNnQnVmZmVyLmJ1aWxkQnVmZXIoYnVmZmVyLCBjaGF0TXNnLm1zZ1R5cGUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwic2VuZENoYXRUZXh0TXNnXCIsIGNoYXRNc2cudG9PYmplY3QoKSk7XHJcbiAgICAgICAgdGhpcy5zZW5kTXNnKG1zZ0J1ZmZlcik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2VuZENoYXRJbWFnZU1zZyhjb250ZW50KSB7XHJcbiAgICAgICAgbGV0IGNoYXRNc2cgPSBuZXcgaXRhbGsucGIuSXRhbGtDaGF0TXNnKCk7XHJcbiAgICAgICAgY2hhdE1zZy51c2VyaWQgPSB0aGlzLnVzZXJpZDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lj5HpgIHogIXvvIzlv4Xpobvoh6rlt7FcclxuICAgICAgICBjaGF0TXNnLmZpZCA9IHRoaXMuZmlkOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8v576kaWRcclxuICAgICAgICBjaGF0TXNnLnV1aWQgPSB0aGlzLnV1aWQoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+a2iOaBr0lEXHJcbiAgICAgICAgY2hhdE1zZy5sb2NhbGlkID0gdGhpcy5zeXN0ZW1UaW1lLnJhbmRvbUJpdCgpXHJcbiAgICAgICAgY2hhdE1zZy50aW1lc3RhbXAgPSB0aGlzLnN5c3RlbVRpbWUuZ2V0U2VydmVyVGltZSgpXHJcbiAgICAgICAgY2hhdE1zZy5idXNzaW5lc3N0eXBlID0gaXRhbGsucGIuSXRhbGtCdXNpbmVzc1R5cGVFbnVtLklUS1BpYzsgICAgICAgICAgICAgICAgLy/kuJrliqHnsbvlnovvvJrnn63kv6Hmtojmga9cclxuICAgICAgICBjaGF0TXNnLmNoYXR0eXBlID0gIGl0YWxrLnBiLkl0YWxrQ2hhdFR5cGVFbnVtLklUS0dyb3VwQ2hhdDtcclxuICAgICAgICBjaGF0TXNnLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgICAgIGNoYXRNc2cubXNnVHlwZSA9IGl0YWxrLnBiLkl0YWxrVHlwZUVudW0uSVRLU2VydmVyQ2hhdDsgICAgICAgICAgICAgICAgICAgLy/mtojmga/nsbvlnosgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgbGV0IGJ1ZmZlcjogVWludDhBcnJheSA9IGl0YWxrLnBiLkl0YWxrQ2hhdE1zZy5lbmNvZGUoY2hhdE1zZykuZmluaXNoKCk7XHJcbiAgICAgICAgbGV0IG1zZ0J1ZmZlcjogVWludDhBcnJheSA9IEl0YWxrTXNnQnVmZmVyLmJ1aWxkQnVmZXIoYnVmZmVyLCBjaGF0TXNnLm1zZ1R5cGUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwic2VuZENoYXRUZXh0TXNnXCIsIGNoYXRNc2cudG9PYmplY3QoKSk7XHJcbiAgICAgICAgdGhpcy5zZW5kTXNnKG1zZ0J1ZmZlcik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2VuZENoYXRNb3ZlTXNnKGNvbnRlbnQpIHtcclxuICAgICAgICBsZXQgY2hhdE1zZyA9IG5ldyBpdGFsay5wYi5JdGFsa0NoYXRNc2coKTtcclxuICAgICAgICBjaGF0TXNnLnVzZXJpZCA9IHRoaXMudXNlcmlkOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WPkemAgeiAhe+8jOW/hemhu+iHquW3sVxyXG4gICAgICAgIGNoYXRNc2cuZmlkID0gdGhpcy5maWQ7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLy/nvqRpZFxyXG4gICAgICAgIGNoYXRNc2cudXVpZCA9IHRoaXMudXVpZCgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5raI5oGvSURcclxuICAgICAgICBjaGF0TXNnLmxvY2FsaWQgPSB0aGlzLnN5c3RlbVRpbWUucmFuZG9tQml0KClcclxuICAgICAgICBjaGF0TXNnLnRpbWVzdGFtcCA9IHRoaXMuc3lzdGVtVGltZS5nZXRTZXJ2ZXJUaW1lKClcclxuICAgICAgICBjaGF0TXNnLmJ1c3NpbmVzc3R5cGUgPSBpdGFsay5wYi5JdGFsa0J1c2luZXNzVHlwZUVudW0uSVRLU2hvcnRWaWRlbzsgICAgICAgICAgICAgICAgLy/kuJrliqHnsbvlnovvvJrnn63kv6Hmtojmga9cclxuICAgICAgICBjaGF0TXNnLmNoYXR0eXBlID0gIGl0YWxrLnBiLkl0YWxrQ2hhdFR5cGVFbnVtLklUS0dyb3VwQ2hhdDtcclxuICAgICAgICBjaGF0TXNnLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgICAgIGNoYXRNc2cubXNnVHlwZSA9IGl0YWxrLnBiLkl0YWxrVHlwZUVudW0uSVRLU2VydmVyQ2hhdDsgICAgICAgICAgICAgICAgICAgLy/mtojmga/nsbvlnosgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgbGV0IGJ1ZmZlcjogVWludDhBcnJheSA9IGl0YWxrLnBiLkl0YWxrQ2hhdE1zZy5lbmNvZGUoY2hhdE1zZykuZmluaXNoKCk7XHJcbiAgICAgICAgbGV0IG1zZ0J1ZmZlcjogVWludDhBcnJheSA9IEl0YWxrTXNnQnVmZmVyLmJ1aWxkQnVmZXIoYnVmZmVyLCBjaGF0TXNnLm1zZ1R5cGUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwic2VuZENoYXRUZXh0TXNnXCIsIGNoYXRNc2cudG9PYmplY3QoKSk7XHJcbiAgICAgICAgdGhpcy5zZW5kTXNnKG1zZ0J1ZmZlcik7XHJcbiAgICB9XHJcbiAgICAvLyDkuIrmiqXlt7Lor7tcclxuICAgIHB1YmxpYyBzZW5kQ2xlYXJNc2coKSB7XHJcbiAgICAgICAgbGV0IGNoYXRNc2cgPSBuZXcgaXRhbGsucGIuSXRhbGtDaGF0TXNnKCk7XHJcbiAgICAgICAgY2hhdE1zZy51c2VyaWQgPSB0aGlzLnVzZXJpZDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lj5HpgIHogIXvvIzlv4Xpobvoh6rlt7FcclxuICAgICAgICBjaGF0TXNnLmZpZCA9IHRoaXMuZmlkOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v576kaWRcclxuICAgICAgICBjaGF0TXNnLnRpbWVzdGFtcCA9IHRoaXMuc3lzdGVtVGltZS5nZXRTZXJ2ZXJUaW1lKClcclxuICAgICAgICBjaGF0TXNnLmxvY2FsaWQgPSB0aGlzLnN5c3RlbVRpbWUucmFuZG9tQml0KClcclxuICAgICAgICBjaGF0TXNnLmJ1c3NpbmVzc3R5cGUgPSBpdGFsay5wYi5JdGFsa0J1c2luZXNzVHlwZUVudW0uSVRLQ2hhdFN0YXR1c0NoYW5nZTsgICAgICAgICAvL+S4muWKoeexu+WeizrmuIXnprvnur/mtojmga9cclxuICAgICAgICBjaGF0TXNnLm1zZ1R5cGUgPSBpdGFsay5wYi5JdGFsa1R5cGVFbnVtLklUS1NlcnZlckNoYXQ7XHJcbiAgICAgICAgY2hhdE1zZy5jaGF0dHlwZSA9ICBpdGFsay5wYi5JdGFsa0NoYXRUeXBlRW51bS5JVEtHcm91cENoYXQ7XHJcbiAgICAgICAgbGV0IGJ1ZmZlcjogVWludDhBcnJheSA9IGl0YWxrLnBiLkl0YWxrQ2hhdE1zZy5lbmNvZGUoY2hhdE1zZykuZmluaXNoKCk7XHJcbiAgICAgICAgbGV0IG1zZ0J1ZmZlcjogVWludDhBcnJheSA9IEl0YWxrTXNnQnVmZmVyLmJ1aWxkQnVmZXIoYnVmZmVyLCBjaGF0TXNnLm1zZ1R5cGUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwic2VuZENsZWFyTXNnICzmuIXpmaTmnKror7vmtojmga9cIik7XHJcbiAgICAgICAgdGhpcy5zZW5kTXNnKG1zZ0J1ZmZlcik7XHJcbiAgICB9XHJcbiAgICAvLyDojrflj5blvZPliY3lt7Lor7vmtojmga/ml7bpl7RcclxuICAgIHB1YmxpYyBzZW5kQ2hhbmdlTXNnKCkge1xyXG4gICAgICAgIGxldCBjaGF0TXNnID0gbmV3IGl0YWxrLnBiLkl0YWxrQ2hhdE1zZygpO1xyXG4gICAgICAgIGNoYXRNc2cudXNlcmlkICAgICAgPSB0aGlzLnVzZXJpZDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lj5HpgIHogIXvvIzlv4Xpobvoh6rlt7FcclxuICAgICAgICBjaGF0TXNnLmZpZCAgICAgICAgID0gdGhpcy5maWQ7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/nvqRpZFxyXG4gICAgICAgIGNoYXRNc2cudGltZXN0YW1wICAgPSB0aGlzLnN5c3RlbVRpbWUuZ2V0U2VydmVyVGltZSgpXHJcbiAgICAgICAgY2hhdE1zZy5sb2NhbGlkICAgICA9IHRoaXMuc3lzdGVtVGltZS5yYW5kb21CaXQoKVxyXG4gICAgICAgIGNoYXRNc2cuYnVzc2luZXNzdHlwZSA9IGl0YWxrLnBiLkl0YWxrQnVzaW5lc3NUeXBlRW51bS5JVEtCdXNzbmllc3N0eXBlMjc7ICAgICAgICAgLy/kuJrliqHnsbvlnos65riF56a757q/5raI5oGvXHJcbiAgICAgICAgY2hhdE1zZy5tc2dUeXBlICAgICA9IGl0YWxrLnBiLkl0YWxrVHlwZUVudW0uSVRLU2VydmVyQ2hhdDtcclxuICAgICAgICBjaGF0TXNnLmNoYXR0eXBlICAgID0gIGl0YWxrLnBiLkl0YWxrQ2hhdFR5cGVFbnVtLklUS0dyb3VwQ2hhdDtcclxuICAgICAgICBsZXQgYnVmZmVyOiBVaW50OEFycmF5ID0gaXRhbGsucGIuSXRhbGtDaGF0TXNnLmVuY29kZShjaGF0TXNnKS5maW5pc2goKTtcclxuICAgICAgICBsZXQgbXNnQnVmZmVyOiBVaW50OEFycmF5ID0gSXRhbGtNc2dCdWZmZXIuYnVpbGRCdWZlcihidWZmZXIsIGNoYXRNc2cubXNnVHlwZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJzZW5kQ2hhbmdlTXNnICzojrflj5blvZPliY3mtojmga/nirbmgIFcIik7XHJcbiAgICAgICAgdGhpcy5zZW5kTXNnKG1zZ0J1ZmZlcik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHJlY3ZlTXNnQ2hhdChkYXRhKSB7XHJcbiAgICAgICAgbGV0IGNoYXQgPSBpdGFsay5wYi5JdGFsa0NoYXRNc2cuZGVjb2RlKGRhdGEpO1xyXG4gICAgICAgIC8v5YW35L2T5Y+C6ICDSXRhbGtDaGF0TXNn55qE57uT5p6EICDmnI3liqHnq6/lpITnkIblrozmiJDlkI7lj5HpgIHmtojmga/vvIzmiYDku6XlvZPliY1tc2dpZOS4uua2iOaBr+eahGlkXHJcbiAgICAgICAgaWYgKGNoYXQuY29udGVudCkge1xyXG4gICAgICAgICAgICBpZighdGhpcy5kYXRhQXJyYXkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhQXJyYXkgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihjaGF0LmJ1c3NpbmVzc3R5cGUgPT0gaXRhbGsucGIuSXRhbGtCdXNpbmVzc1R5cGVFbnVtLklUS0J1c3NuaWVzc3R5cGUyNyl7XHJcbiAgICAgICAgICAgICAgICBpZihjaGF0Lm1zZ2xhc3RpbmRleCA+IHRoaXMuc2V2ZXJDaGVja1RpbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V2ZXJDaGVja1RpbWUgPSBOdW1iZXIoY2hhdC5tc2dsYXN0aW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhdENscy51cGRhdGVVSSh0aGlzLnNldmVyTmFtZSxmYWxzZSk7IC8v5pu05paw5pyq6K+75raI5oGv54q25oCBXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy8gSVRLUmV2b2tlTXNnIOaSpOWbnueahOa2iOaBr1xyXG4gICAgICAgICAgICAgICAgaWYoY2hhdC5idXNzaW5lc3N0eXBlICE9IGl0YWxrLnBiLkl0YWxrQnVzaW5lc3NUeXBlRW51bS5JVEtDaGF0U3RhdHVzQ2hhbmdlKXsgLy/kuI3mmK/muIXpmaTnprvnur/mtojmga9cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbXNnSWQgPSBOdW1iZXIoY2hhdC5tc2dpZC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICBjaGF0Lm1zZ2lkID0gbXNnSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWVzdGFtcCA9IE51bWJlcihjaGF0LnRpbWVzdGFtcC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICBjaGF0LnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbXNnb3JkZXIgPSBOdW1iZXIoY2hhdC5tc2dvcmRlci50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICBjaGF0Lm1zZ29yZGVyID0gbXNnb3JkZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhQXJyYXkucHVzaChjaGF0KTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNoYXQudXNlcmlkICE9dGhpcy51c2VyaWQgJiYgKE51bWJlcihjaGF0LmNvbnRlbnQudGV4dCkvMTAwMC8xMDAwID4gdGhpcy5zZXZlckNoZWNrVGltZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRDaGFuZ2VNc2coKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWN2ZU1zZ0NoYXRlY2hvKGRhdGEpIHtcclxuICAgICAgICBsZXQgY2hhdGVjaG8gPSBpdGFsay5wYi5JdGFsa0NoYXRFY2hvTXNnLmRlY29kZShkYXRhKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkl0YWxrQ2hhdEVjaG9Nc2dcIiAgLGNoYXRlY2hvKTtcclxuICAgICAgICAvL+WFt+S9k+WPguiAg0l0YWxrQ2hhdEVjaG9Nc2fnmoTnu5PmnoQgIOacjeWKoeerr+aOpeaUtueri+mprOi/lOWbnua2iOaBr++8jOaJgOS7peW9k+WJjW1zZ2lk5Li6MO+8jOS7pXVzZXJpZCtsb2NhbGlk5Li6aWRcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInJlY3ZlTXNnQ2hhdGVjaG9cIiwgY2hhdGVjaG8udG9KU09OKTsgIFxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSByZWN2ZU1zZ0xvZ2luRWNobyhkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5zZW5kSGVhcnRUaW1lKCk7ICAgLy/lrprml7blj5HpgIHlv4Pot7PljIVcclxuICAgICAgICB0aGlzLnNldmVyVXNlcmlkID0gXCJcIjtcclxuICAgICAgICBsZXQgbG9naW5lY2hvID0gaXRhbGsucGIuSXRhbGtMb2dpbkVjaG9Nc2cuZGVjb2RlKGRhdGEpO1xyXG4gICAgICAgIHRoaXMuc2V2ZXJVc2VyaWQgPSBsb2dpbmVjaG8uZWNob0luZm8uSW5mbztcclxuICAgICAgICB0aGlzLmZpZCA9IGxvZ2luZWNoby50b2tlbjtcclxuICAgICAgICBpZih0aGlzLlF1aWNrRGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V2ZXJOYW1lID0gdGhpcy5RdWlja0RhdGEubmFtZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5zZXZlclVzZXJpZC5sZW5ndGggPiAwKXsgLy/lrqLmnI11c2VySUQg5aSn5LqOMCDmiY3ojrflj5blpLTlg49cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U2V2ZXJJbmZvKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkhJREVfTkVUX1dBSVRJTkcpO1xyXG4gICAgICAgIGlmKHRoaXMuY29ubmVjdGVkQ291bnQgPT0gMCl7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93UG9ydHJhaXRTY3JlZW5Ob3RpY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIC8v5YiH5o2i5oiQ56uW5bGPXHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuY2hhbmdlT3JpZW50YXRpb25IKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5hZGp1ZXN0Q2FudmFzU2NyZWVuU3RyZXRjaChjYy5DYW52YXMuaW5zdGFuY2UpOyBcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kVmlwUXVpY2tQYXlDaGF0XCIsdGhpcy5zZXZlck5hbWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5jaGF0Q2xzLmlzT3BlbiA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi6IGK5aSp57O757uf5bey6YeN5paw6L+e5o6lXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIkNoYXRTZXJ2ZXIgc29ja2V0IGNvbm5lY3RlZENvdW50PSBcIix0aGlzLmNvbm5lY3RlZENvdW50KVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbm5lY3RlZENvdW50ICsrXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHJlY3ZlTXNnSGVhcnRFY2hvKGRhdGEpIHtcclxuICAgICAgICAvL+aOpeaUtuWIsOW/g+i3s+m7mOiupOi/nuaOpeaIkOWKn1xyXG4gICAgICAgIGxldCBoZWFyZWNobyA9IGl0YWxrLnBiLkl0YWxrSGVhcnRFY2hvTXNnLmRlY29kZShkYXRhKTtcclxuICAgICAgICB0aGlzLnN5c3RlbVRpbWUuc2V0U2VydmVyVGltZShoZWFyZWNoby5oZWFydENvdW50KTsvL1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgcHVibGljIHNlbmRIZWFydFRpbWUoKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaGVhcnR0aW1lKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5oZWFydHRpbWUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2VsZi5zZW5kSGVhcnRNc2coKTsgIC8v5Y+R6YCB5b+D6Lez5YyFXHJcbiAgICAgICAgICAgIHNlbGYuc2VuZEhlYXJ0VGltZSgpOyAvL+WumuaXtuWPkemAgeW/g+i3s+WMhVxyXG4gICAgICAgIH0sIDEwMDAgKiAyMCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHJlY3ZlTXNnKCkge1xyXG5cclxuICAgICAgICBsZXQgZGF0YWxlbmd0aDogbnVtYmVyID0gdGhpcy5kYXRhbGVuZ3RoO1xyXG4gICAgICAgIGxldCBkYXRhOiBVaW50OEFycmF5ID0gdGhpcy5fY2FjaGVEYXRhO1xyXG4gICAgICAgIGxldCBjdXJpbmRleDogbnVtYmVyID0gMDtcclxuICAgICAgICBsZXQgdG90ZWw6IG51bWJlciA9IGRhdGFsZW5ndGg7Ly9kYXRhLmJ5dGVMZW5ndGg7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBsZXQgaGVhZGJ1ZjogVWludDhBcnJheSA9IG5ldyBVaW50OEFycmF5KDgpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaGVhZGJ1ZltpXSA9IGRhdGFbaSArIGN1cmluZGV4XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbGVuZ3RoOiBudW1iZXIgPSAoaGVhZGJ1Zls0XSAmIDB4ZmYpIHwgKChoZWFkYnVmWzVdICYgMHhmZikgPDwgOClcclxuICAgICAgICAgICAgbGV0IGJvZHlsZW5ndGg6IG51bWJlciA9IGhlYWRidWZbMl0gKiAxMDI0MCArIGxlbmd0aCArIDI0O1xyXG4gICAgICAgICAgICBsZXQgY3JjYnVmOiBVaW50OEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoMik7XHJcbiAgICAgICAgICAgIGxldCBjcmNudW06IG51bWJlciA9IEl0YWxrQ3JjLmNyYzE2KGhlYWRidWYpO1xyXG4gICAgICAgICAgICBjcmNidWZbMF0gPSAweGZmICYgY3JjbnVtO1xyXG4gICAgICAgICAgICBjcmNidWZbMV0gPSAweGZmICYgY3JjbnVtID4+IDg7XHJcblxyXG4gICAgICAgICAgICBpZiAoaGVhZGJ1ZlswXSA9PSAyICYmIGNyY2J1ZlswXSA9PSBoZWFkYnVmWzZdICYmIGNyY2J1ZlsxXSA9PSBoZWFkYnVmWzddICYmIHRvdGVsID49IGJvZHlsZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtc2dkYXRhOiBVaW50OEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YS5zdWJhcnJheShjdXJpbmRleCArIDI0LCBjdXJpbmRleCArIGJvZHlsZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgIHRvdGVsIC09IGJvZHlsZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBjdXJpbmRleCArPSBib2R5bGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChoZWFkYnVmWzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBpdGFsay5wYi5JdGFsa1R5cGVFbnVtLklUS0xvZ2luRUNITzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWN2ZU1zZ0xvZ2luRWNobyhtc2dkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBpdGFsay5wYi5JdGFsa1R5cGVFbnVtLklUS0NoYXRFQ0hPOiAgICAvL+avj+WPkemAgeS4gOS4qua2iOaBr+WMhemDveS8muaOpeaUtuS4gOS4quWbnuWkjVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY3ZlTXNnQ2hhdGVjaG8obXNnZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgaXRhbGsucGIuSXRhbGtUeXBlRW51bS5JVEtIZWFydEVDSE86ICAgLy8gdGhpcy5zZW5kQ2hhdFRleHRNc2coXCLlv4Pot7PljIVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVjdmVNc2dIZWFydEVjaG8obXNnZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgaXRhbGsucGIuSXRhbGtUeXBlRW51bS5JVEtDaGF0OiAgICAgICAgLy8gY29uc29sZS5sb2coXCJJVEtTZXJ2ZXJDaGF0XCIsIFwi5pS25Yiw5raI5oGvXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY3ZlTXNnQ2hhdChtc2dkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBpdGFsay5wYi5JdGFsa1R5cGVFbnVtLklUS1NlcnZlckNoYXQ6ICAvL+a2iOaBr+WMhSDoh6rlt7Hlj5HpgIHnmoRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWN2ZU1zZ0NoYXQobXNnZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJkZWZhdWx0XCIsIGhlYWRidWZbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuRk9SQ0VfSElERV9XQUlUSU5HKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGF0YWxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdGVsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZURhdGFbZGF0YWxlbmd0aF0gPSBkYXRhW2kgKyBjdXJpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YWxlbmd0aCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhbGVuZ3RoID0gZGF0YWxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSB3aGlsZSAodHJ1ZSk7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhQXJyYXkpe1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFBcnJheS5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaGF0ID0gbmV3IGl0YWxrLnBiLkl0YWxrQ2hhdE1zZygpO1xyXG4gICAgICAgICAgICAgICAgY2hhdCA9IHRoaXMuZGF0YUFycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXQuY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc2VuZEtlZnVSZWRTcG90KGNoYXQpKXsgLy/lrqLmnI3mtojmga/mmK/lvZPliY3ov57mjqXnmoTlrqLmnI3mtojmga/miY3liqDlhaXlsZXnpLpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hhdC5idXNzaW5lc3N0eXBlID09IGl0YWxrLnBiLkl0YWxrQnVzaW5lc3NUeXBlRW51bS5JVEtSZXZva2VNc2cgJiYgIWNoYXQuY29udGVudC5kZXNjKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNoYXQoTnVtYmVyKGNoYXQuY29udGVudC50ZXh0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGF0Q2xzLmRhdGEucHVzaChjaGF0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmRhdGFBcnJheS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YUFycmF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhdENscy51cGRhdGVVSSh0aGlzLnNldmVyTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyDmkqTlm57lt7LliqDlhaXlr7nor53nmoTmtojmga9cclxuICAgIHByaXZhdGUgcmVtb3ZlQ2hhdChtc2dpZCl7XHJcbiAgICAgICAgLy8g5qC55o2u5Y2V5Liq5ZCN5a2X562b6YCJXHJcbiAgICAgICAgdGhpcy5jaGF0Q2xzLmRhdGEgPSB0aGlzLmNoYXRDbHMuZGF0YS5maWx0ZXIoaXRlbSA9PiBpdGVtLm1zZ2lkICE9IG1zZ2lkKTtcclxuICAgIH1cclxuICAgIHNlbmRLZWZ1UmVkU3BvdChjaGF0KXtcclxuICAgICAgICBsZXQgaWRBcnJheSA9ICBjaGF0LmZpZC5zcGxpdChcIl9cIik7XHJcbiAgICAgICAgbGV0IGtlZnVJRCA9IGlkQXJyYXlbMF07XHJcbiAgICAgICAgaWYoa2VmdUlEID09IFwiZ1wiICsgQ3VzdG9tZXJFbnRyYW5jZVR5cGUuTG9naW5TZXJ2aWNlKXsgLy/nmbvpmYblrqLmnI1cclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNob3dSZWRTcG90LCBbZmFsc2UsIEhhbGxSZWRTcG90VHlwZS5Mb2dpbktlZnVdKTtcclxuICAgICAgICB9ZWxzZSBpZihrZWZ1SUQgPT0gXCJnXCIgKyBDdXN0b21lckVudHJhbmNlVHlwZS5IYWxsU2VydmljZSl7IC8v5aSn5Y6F6IGU57O75a6i5pyNXHJcbiAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5TaG93UmVkU3BvdCwgW2ZhbHNlLCBIYWxsUmVkU3BvdFR5cGUuS2VmdV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihcImdcIisgdGhpcy5zZXJ2ZXJUeXBlID09IGtlZnVJRCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIC8v6I635Y+WVVVJRFxyXG4gICAgdXVpZCgpIHtcclxuICAgICAgICB2YXIgcyA9IFtdO1xyXG4gICAgICAgIHZhciBoZXhEaWdpdHMgPSBcIjAxMjM0NTY3ODlhYmNkZWZcIjtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM2OyBpKyspIHtcclxuICAgICAgICAgICAgc1tpXSA9IGhleERpZ2l0cy5zdWJzdHIoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMHgxMCksIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzWzE0XSA9IFwiNFwiOyAgLy8gYml0cyAxMi0xNSBvZiB0aGUgdGltZV9oaV9hbmRfdmVyc2lvbiBmaWVsZCB0byAwMDEwXHJcbiAgICAgICAgc1sxOV0gPSBoZXhEaWdpdHMuc3Vic3RyKChzWzE5XSAmIDB4MykgfCAweDgsIDEpOyAgLy8gYml0cyA2LTcgb2YgdGhlIGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWQgdG8gMDFcclxuICAgICAgICBzWzhdID0gc1sxM10gPSBzWzE4XSA9IHNbMjNdID0gXCItXCI7XHJcbiAgICAgICAgdmFyIHV1aWQgPSBzLmpvaW4oXCJcIik7XHJcbiAgICAgICAgcmV0dXJuIHV1aWQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v6I635Y+W5a6i5pyN5L+h5oGvXHJcbiAgICBwcml2YXRlIGdldFNldmVySW5mbygpe1xyXG5cclxuICAgICAgICBsZXQgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIHVzZXJpZDp0aGlzLnNldmVyVXNlcmlkLFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3VmZml4ID0gXCIvbWluaS91c2VyP3VzZXJpZD1cIit0aGlzLnVzZXJpZCtcIiZ0b2tlbj1cIit0aGlzLnRva2VuO1xyXG4gICAgICAgIHRoaXMuc2VuZEltYWdlV2l0aFBhcmFtKHN1ZmZpeCxcIkdldEdhbWVVc2VySW5mb1wiLHBhcmFtLChyZXMpPT57XHJcbiAgICAgICAgICAgIGlmKHJlcy5oZWFkICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXZlck5hbWUgPSByZXMubmFtZTtcclxuICAgICAgICAgICAgICAgIGlmKHJlcy5oZWFkLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhdENscy5sb2FkU2V2ZXJIZWFkZXIodGhpcy5nZXRJbWFnZUh0dHAocmVzLmhlYWQpLChmcmFtZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGF0Q2xzLnNldmVySGVhZEZyYW1lID0gZnJhbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhdENscy51cGRhdGVVSShyZXMubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhdENscy51cGRhdGVVSShyZXMubmFtZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChyZXMuX2VycnN0cik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LChlcnJvcik9PntcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoZXJyb3IuX2VycnN0cik7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZW5kSW1hZ2VXaXRoUGFyYW0oc3VmZml4LGZ1bmMscGFyYW0sb25Db21wbGV0ZT86IEZ1bmN0aW9uLCBlcnJvckhhbmRsZXI/OiBGdW5jdGlvbil7XHJcbiAgICAgICAgbGV0IHBhcmFtSlNPTiA9e1xyXG4gICAgICAgICAgICBfbW9kOlwibG9naW5cIixcclxuICAgICAgICAgICAgX2Z1bmM6ZnVuYyxcclxuICAgICAgICAgICAgX3BhcmFtOnBhcmFtLCBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsvL+esrOS4gOatpe+8muWIm+W7uumcgOimgeeahOWvueixoVxyXG4gICAgICAgIHhoci5vcGVuKCdQT1NUJywgXCJodHRwczovL1wiK0dsb2JhbC5DaGF0U2VydmVyLmh1cmwrc3VmZml4LCB0cnVlKTsgLy/nrKzkuozmraXvvJrmiZPlvIDov57mjqUvKioq5Y+R6YCBanNvbuagvOW8j+aWh+S7tuW/hemhu+iuvue9ruivt+axguWktCDvvJvlpoLkuIsgLSAqL1xyXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC10eXBlXCIsXCJhcHBsaWNhdGlvbi9qc29uXCIpOy8v6K6+572u6K+35rGC5aS0IOazqO+8mnBvc3TmlrnlvI/lv4Xpobvorr7nva7or7fmsYLlpLTvvIjlnKjlu7rnq4vov57mjqXlkI7orr7nva7or7fmsYLlpLTvvIl2YXIgb2JqID0geyBuYW1lOiAnemhhbnNnYW4nLCBhZ2U6IDE4IH07XHJcbiAgICAgICAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkocGFyYW1KU09OKSk7Ly/lj5HpgIHor7fmsYIg5bCGanNvbuWGmeWFpXNlbmTkuK1cclxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkgey8v6K+35rGC5ZCO55qE5Zue6LCD5o6l5Y+j77yM5Y+v5bCG6K+35rGC5oiQ5Yqf5ZCO6KaB5omn6KGM55qE56iL5bqP5YaZ5Zyo5YW25LitXHJcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCAmJiB4aHIuc3RhdHVzID09IDIwMCAmJiB4aHIucmVzcG9uc2VUZXh0KSB7Ly/pqozor4Hor7fmsYLmmK/lkKblj5HpgIHmiJDlip9cclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEuX3BhcmFtICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGUoZGF0YS5fcGFyYW0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZXJyb3JIYW5kbGVyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvckhhbmRsZXIoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKGVycm9ySGFuZGxlciAmJiB4aHIucmVzcG9uc2VUZXh0KXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JIYW5kbGVyKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRJbWFnZUh0dHAodXJsOlN0cmluZyl7XHJcbiAgICAgICAgbGV0IGRhdGVBcnIgPSAgdXJsLnNwbGl0KFwiL1wiKTtcclxuICAgICAgICBsZXQgZmlsZU5hbWUgPSAgZGF0ZUFycltkYXRlQXJyLmxlbmd0aC0xXTtcclxuICAgICAgICBsZXQgaW1hZ2VVUmwgPSBcImh0dHBzOi8vXCIrdGhpcy5odXJsICsgXCIvbG9naW4vb3NzZmlsZT9mdW5jPUdldE9zc0ZpbGUmbmFtZT1cIitmaWxlTmFtZStcIiZ0b2tlbj1cIit0aGlzLnRva2VuO1xyXG4gICAgICAgIHJldHVybiBpbWFnZVVSbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBvc3NBdXRob3JpdHkoKXtcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIFwiX21vZFwiOlwibG9naW5cIixcclxuICAgICAgICAvLyAgICAgXCJfZnVuY1wiOlwiR2V0U3RzXCIsXHJcbiAgICAgICAgLy8gICAgIFwiX3BhcmFtXCI6e1xyXG4gICAgICAgIC8vICAgICAgICAgXCJ1c2VyaWRcIjpcImFpdGUwMDAwMDAwN1wiXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgbGV0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICB1c2VyaWQ6dGhpcy5zZXZlclVzZXJpZCxcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkNoYXRTZXJ2ZXIuc2VuZEltYWdlV2l0aFBhcmFtKFwibG9naW4vb3NzQXV0aG9yaXR5XCIsXCJHZXRTdHNcIixwYXJhbSwocmVzKT0+e1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLpibTmnYPkv6Hmga9cIik7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihyZXMpO1xyXG4gICAgICAgIH0sKGVycm9yKT0+e1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChlcnJvci5fZXJyc3RyKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIGxvZ2luL29zc0F1dGhvcml0eVxyXG4gICAgfVxyXG4gICAgXHJcbn0iXX0=