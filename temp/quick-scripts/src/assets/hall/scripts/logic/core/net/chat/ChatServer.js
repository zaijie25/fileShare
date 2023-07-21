"use strict";
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