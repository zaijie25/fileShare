import { NetSocket, NetStatus } from "../../../../framework/net/socket/NetSocket";
import WndVipQuickPayChat from "../../../hall/ui/recharge/WndVipQuickPayChat";
import ItalkCrc from "../tcp/italkmsg_crc";
import ItalkUnit from "../tcp/italkmsg_unit";
import { italk } from "../tcp/italkmsg_pb";
import ItalkMsgBuffer from "../tcp/italk_msg_buffer";
import LoginModel from "../../../hallcommon/model/LoginModel";
import { HallRedSpotType } from "../../../hallcommon/model/HallModel";
import { CustomerEntranceType} from "../../../hallcommon/model/ServicerModel";
import SystemTimeManager from "./SystemTimeManager";
import Int64 from "../tcp/int64";
export default class ChatServer {
    private isUserLogin = false;
    public severCheckTime:Number = 1;
    public connectedCount = 0; //连接次数
    private hearttime: any;
    public userid = "";
    public token = "";
    public serverType = CustomerEntranceType.HallService;
    public aite_type = 3; //3 旧版本艾特 4 新版本艾特
    public severUserid = ""; //客服UserID
    private fid = "";     //    群id
    private severName = "艾特客服";
    public hurl = ""; //httpURl
    private turl = ""; //长连接URL
    private socket: NetSocket;
    private datalength: number;
    private _cacheData;
    private dataArray:Array<italk.pb.ItalkChatMsg> = new Array();
    public QuickData;
    public chatCls:WndVipQuickPayChat = null;
    private systemTime:SystemTimeManager = SystemTimeManager.getInstance();
    public connect(url = this.turl) {
        if(this.chatCls == null){ //登陆成功
            this.chatCls = <WndVipQuickPayChat>Global.UI.getWindow("WndVipQuickPayChat");
        }
        if(this.connectedCount == 0 && this.chatCls.isOpen == false){ 
            Global.Event.event(GlobalEvent.SHOW_NET_WAITING,"connect_socket")
            // Global.UI.fastTip("正在连接聊天系统");
        }
        url = "wss://"+url + "/mini/?userid=" + this.userid +"&appid=" + Global.Setting.appId + "&token=" + this.token;
        if(this.socket)  
        {
            if(this.socket.status == NetStatus.connected)
            {
                Global.Event.event(GlobalEvent.HIDE_NET_WAITING,"connect_socket")
                this.sendLoginMsg();  //发送登录消息
                return
            }
            else
            {
                this.socket.connect();
            }
        }
        else
        {
            this.socket = new NetSocket(url);
            this.socket.init(this, this.onMessage, this.onOpen, this.onError, this.onClose, true);
            this.socket.connect();
        }     
       
    }

    public clear()
    {
        if(this.hearttime)
        {
            clearTimeout(this.hearttime)
        }
        if(this.socket)
        {
            this.severName = ""
            this.chatCls.severHeadFrame = null
            this.socket.cleanSocket()
            this.socket.close()
            this.socket = null
        }
    }
    //用户登陆
    public userSetting(data,aite_url=""){
        this.connectedCount = 0;
        this.QuickData = data;
        let aiteType = 3
        if(data && data.url && data.open_type == 4){
            aite_url = data.url
        }
        if(aite_url && aite_url.indexOf("pid=") != -1){
            let dateArr =  aite_url.split("=");
            aiteType = 4
            this.serverType =  Number(dateArr[dateArr.length-1]);
        }
        this.clear()
        this.aite_type = aiteType
        let param = {aite_device:Global.Toolkit.genDeviceInfo(),aite_type:this.aite_type};
        Global.HallServer.send(NetAppface.mod,"LoginAite",param,(success)=>{
            if(success){
                this.setAiteData(success);
                this.showAiteChat(aite_url);
            }
            },(error)=>{
            Global.UI.fastTip("获取客服信息失败");
        })
    }

    //游客登陆
    public otherSetting(data,aite_url=Global.Setting.aite_url){
        this.connectedCount = 0;
        let loginModel = <LoginModel>Global.ModelManager.getModel("LoginModel");
        let param = loginModel.getLoginParam("", null, 1);
        let aiteType = 3
        if(aite_url && aite_url.indexOf("pid=") != -1){
            let dateArr =  aite_url.split("=");
            aiteType = 4
            this.serverType =  Number(dateArr[dateArr.length-1]);
        }
        this.clear()
        param.aite_device = Global.Toolkit.genDeviceInfo();
        param.aite_type = aiteType;
        Global.HallServer.sendAiteLogin("LoginAite",param,(success)=>{
            if(success){
                this.setAiteData(success);
                this.showAiteChat(aite_url);
            }
            },(error)=>{
            Global.UI.fastTip("获取客服信息失败");
        })
    }
    private setAiteData(data){
        this.userid = data.userid;
        this.token = data.token;
        this.hurl = data.hurl;
        this.turl = data.turl;
    }
    private showAiteChat(aite_url=null){
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
    }
    private onError() { 
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING,"connect_socket")
        Logger.error("ChatServer socket onError")
    }

    private onMessage(msg) {
        this._cacheData = new Uint8Array(msg);
        this.datalength = this._cacheData.byteLength
        this._cacheData = this._cacheData;
        this.recveMsg();
    }

    private onClose() {
        Logger.error("ChatServer socket onClose")
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING,"connect_socket") 
        // if(this.chatCls.isOpen){  //确保断线时只提示一次
        //     Global.UI.fastTip("正在连接聊天系统");
        // }
    }

    private onOpen() {
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING,"connect_socket")
        this.sendLoginMsg();  //发送登录消息
        // Logger.error("数据发送中...");
    }

    public sendLoginMsg() {
        var loginMsg = new italk.pb.ItalkLoginMsg();
        loginMsg.userid = this.userid;                                      // 设置登录用户id
        loginMsg.localid = this.serverType;                                 // 每次发送的唯一id
        loginMsg.msgType = italk.pb.ItalkTypeEnum.ITKServerCommon;          // 消息类型：登录
        let buffer: Uint8Array = italk.pb.ItalkLoginMsg.encode(loginMsg).finish();
        let msgBuffer: Uint8Array = ItalkMsgBuffer.buildBufer(buffer, loginMsg.msgType);
        this.sendMsg(msgBuffer);
    }

    public sendHeartMsg() {
        console.log("心跳包发送中");
        this.systemTime.getLocalTime();//
        var heartMsg = new italk.pb.ItalkHeartMsg();
        heartMsg.userid = this.userid;
        heartMsg.token = this.token;
        heartMsg.msgType = italk.pb.ItalkTypeEnum.ITKHEART;
        let buffer: Uint8Array = italk.pb.ItalkHeartMsg.encode(heartMsg).finish();
        let msgBuffer: Uint8Array = ItalkMsgBuffer.buildBufer(buffer, heartMsg.msgType);
        this.sendMsg(msgBuffer);
    }

    public sendMsg(msgBuffer) {
        if(this.socketStatus()){
            this.socket.send(msgBuffer);  //发送
        }else{
            this.connect();
        }
    }
    public socketStatus() {
        if(this.socket && this.socket.status != NetStatus.close){ //已连接
            return true
        }else{
            return false
        }
    }
    //消息翻页  第一次登录成功必须拉 最近的消息
    public sendOfflineMsg() {
        let chatMsg = new italk.pb.ItalkChatMsg();
        chatMsg.userid = this.userid;                                                 //发送者，必须自己
        chatMsg.fid = this.fid;                                                       ////群id
        chatMsg.timestamp = this.systemTime.getServerTime()
        chatMsg.msgType = italk.pb.ItalkTypeEnum.ITKServerChat;
        chatMsg.chattype =  italk.pb.ItalkChatTypeEnum.ITKGroupChat;
        chatMsg.bussinesstype = italk.pb.ItalkBusinessTypeEnum.ITKBussniesstype20;    //业务类型：获取离线消息
        chatMsg.localid = 0;                                           //每次发送的唯一id
        let buffer: Uint8Array = italk.pb.ItalkChatMsg.encode(chatMsg).finish();
        let msgBuffer: Uint8Array = ItalkMsgBuffer.buildBufer(buffer, chatMsg.msgType);
        this.sendMsg(msgBuffer);
    }
    //发送文本消息
    public sendChatTextMsg(content,msginfo1="") {
        let chatMsg = new italk.pb.ItalkChatMsg();
        chatMsg.userid = this.userid;                                                 //发送者，必须自己
        chatMsg.fid = this.fid;                                                       ////群id
        chatMsg.uuid = this.uuid();                                                   //消息ID
        chatMsg.localid = this.systemTime.randomBit()
        chatMsg.timestamp = this.systemTime.getServerTime()
        chatMsg.bussinesstype = italk.pb.ItalkBusinessTypeEnum.ITKSMS;                //业务类型：短信消息
        chatMsg.chattype =  italk.pb.ItalkChatTypeEnum.ITKGroupChat;
        let msgcontent = new italk.pb.ItalkMsgContent();                          //消息内容
        msgcontent.text = content;
        chatMsg.content = msgcontent;
        if(msginfo1.length > 0){
            chatMsg.msgint1 = 1;
            chatMsg.msginfo1 = msginfo1;
        }
        chatMsg.msgType = italk.pb.ItalkTypeEnum.ITKServerChat;                   //消息类型                               
        let buffer: Uint8Array = italk.pb.ItalkChatMsg.encode(chatMsg).finish();
        let msgBuffer: Uint8Array = ItalkMsgBuffer.buildBufer(buffer, chatMsg.msgType);
        // console.log("sendChatTextMsg", chatMsg.toObject());
        this.sendMsg(msgBuffer);
    }
    public sendChatImageMsg(content) {
        let chatMsg = new italk.pb.ItalkChatMsg();
        chatMsg.userid = this.userid;                                                 //发送者，必须自己
        chatMsg.fid = this.fid;                                                       ////群id
        chatMsg.uuid = this.uuid();                                                   //消息ID
        chatMsg.localid = this.systemTime.randomBit()
        chatMsg.timestamp = this.systemTime.getServerTime()
        chatMsg.bussinesstype = italk.pb.ItalkBusinessTypeEnum.ITKPic;                //业务类型：短信消息
        chatMsg.chattype =  italk.pb.ItalkChatTypeEnum.ITKGroupChat;
        chatMsg.content = content;
        chatMsg.msgType = italk.pb.ItalkTypeEnum.ITKServerChat;                   //消息类型                               
        let buffer: Uint8Array = italk.pb.ItalkChatMsg.encode(chatMsg).finish();
        let msgBuffer: Uint8Array = ItalkMsgBuffer.buildBufer(buffer, chatMsg.msgType);
        // console.log("sendChatTextMsg", chatMsg.toObject());
        this.sendMsg(msgBuffer);
    }
    public sendChatMoveMsg(content) {
        let chatMsg = new italk.pb.ItalkChatMsg();
        chatMsg.userid = this.userid;                                                 //发送者，必须自己
        chatMsg.fid = this.fid;                                                       ////群id
        chatMsg.uuid = this.uuid();                                                   //消息ID
        chatMsg.localid = this.systemTime.randomBit()
        chatMsg.timestamp = this.systemTime.getServerTime()
        chatMsg.bussinesstype = italk.pb.ItalkBusinessTypeEnum.ITKShortVideo;                //业务类型：短信消息
        chatMsg.chattype =  italk.pb.ItalkChatTypeEnum.ITKGroupChat;
        chatMsg.content = content;
        chatMsg.msgType = italk.pb.ItalkTypeEnum.ITKServerChat;                   //消息类型                               
        let buffer: Uint8Array = italk.pb.ItalkChatMsg.encode(chatMsg).finish();
        let msgBuffer: Uint8Array = ItalkMsgBuffer.buildBufer(buffer, chatMsg.msgType);
        // console.log("sendChatTextMsg", chatMsg.toObject());
        this.sendMsg(msgBuffer);
    }
    // 上报已读
    public sendClearMsg() {
        let chatMsg = new italk.pb.ItalkChatMsg();
        chatMsg.userid = this.userid;                                                       //发送者，必须自己
        chatMsg.fid = this.fid;                                                         //群id
        chatMsg.timestamp = this.systemTime.getServerTime()
        chatMsg.localid = this.systemTime.randomBit()
        chatMsg.bussinesstype = italk.pb.ItalkBusinessTypeEnum.ITKChatStatusChange;         //业务类型:清离线消息
        chatMsg.msgType = italk.pb.ItalkTypeEnum.ITKServerChat;
        chatMsg.chattype =  italk.pb.ItalkChatTypeEnum.ITKGroupChat;
        let buffer: Uint8Array = italk.pb.ItalkChatMsg.encode(chatMsg).finish();
        let msgBuffer: Uint8Array = ItalkMsgBuffer.buildBufer(buffer, chatMsg.msgType);
        // console.log("sendClearMsg ,清除未读消息");
        this.sendMsg(msgBuffer);
    }
    // 获取当前已读消息时间
    public sendChangeMsg() {
        let chatMsg = new italk.pb.ItalkChatMsg();
        chatMsg.userid      = this.userid;                                                       //发送者，必须自己
        chatMsg.fid         = this.fid;                                                         //群id
        chatMsg.timestamp   = this.systemTime.getServerTime()
        chatMsg.localid     = this.systemTime.randomBit()
        chatMsg.bussinesstype = italk.pb.ItalkBusinessTypeEnum.ITKBussniesstype27;         //业务类型:清离线消息
        chatMsg.msgType     = italk.pb.ItalkTypeEnum.ITKServerChat;
        chatMsg.chattype    =  italk.pb.ItalkChatTypeEnum.ITKGroupChat;
        let buffer: Uint8Array = italk.pb.ItalkChatMsg.encode(chatMsg).finish();
        let msgBuffer: Uint8Array = ItalkMsgBuffer.buildBufer(buffer, chatMsg.msgType);
        // console.log("sendChangeMsg ,获取当前消息状态");
        this.sendMsg(msgBuffer);
    }
    private recveMsgChat(data) {
        let chat = italk.pb.ItalkChatMsg.decode(data);
        //具体参考ItalkChatMsg的结构  服务端处理完成后发送消息，所以当前msgid为消息的id
        if (chat.content) {
            if(!this.dataArray){
                this.dataArray = new Array();
            }
            if(chat.bussinesstype == italk.pb.ItalkBusinessTypeEnum.ITKBussniesstype27){
                if(chat.msglastindex > this.severCheckTime){
                    this.severCheckTime = Number(chat.msglastindex);
                    this.chatCls.updateUI(this.severName,false); //更新未读消息状态
                }
            }else{
                // ITKRevokeMsg 撤回的消息
                if(chat.bussinesstype != italk.pb.ItalkBusinessTypeEnum.ITKChatStatusChange){ //不是清除离线消息
                    let msgId = Number(chat.msgid.toString());
                    chat.msgid = msgId;
                    let timestamp = Number(chat.timestamp.toString());
                    chat.timestamp = timestamp;
                    let msgorder = Number(chat.msgorder.toString());
                    chat.msgorder = msgorder;
                    this.dataArray.push(chat);
                }else{
                    if(chat.userid !=this.userid && (Number(chat.content.text)/1000/1000 > this.severCheckTime)){
                        this.sendChangeMsg()
                    }
                }
            }

        }
    }

    private recveMsgChatecho(data) {
        let chatecho = italk.pb.ItalkChatEchoMsg.decode(data);
        // console.log("ItalkChatEchoMsg"  ,chatecho);
        //具体参考ItalkChatEchoMsg的结构  服务端接收立马返回消息，所以当前msgid为0，以userid+localid为id
        // console.log("recveMsgChatecho", chatecho.toJSON);  
    }
    private recveMsgLoginEcho(data) {
        this.sendHeartTime();   //定时发送心跳包
        this.severUserid = "";
        let loginecho = italk.pb.ItalkLoginEchoMsg.decode(data);
        this.severUserid = loginecho.echoInfo.Info;
        this.fid = loginecho.token;
        if(this.QuickData)
        {
            this.severName = this.QuickData.name;
        }else{
            if(this.severUserid.length > 0){ //客服userID 大于0 才获取头像
                this.getSeverInfo();
            }
        }
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING);
        if(this.connectedCount == 0){
            Global.UI.showPortraitScreenNotice(()=>{
                //切换成竖屏
                Global.NativeEvent.changeOrientationH(false);
                Global.UI.adjuestCanvasScreenStretch(cc.Canvas.instance); 
                Global.UI.show("WndVipQuickPayChat",this.severName);
            });
        }else{
            if(this.chatCls.isOpen == true){
                Global.UI.fastTip("聊天系统已重新连接");
            }
            Logger.error("ChatServer socket connectedCount= ",this.connectedCount)
        }
        this.connectedCount ++
    }
    private recveMsgHeartEcho(data) {
        //接收到心跳默认连接成功
        let hearecho = italk.pb.ItalkHeartEchoMsg.decode(data);
        this.systemTime.setServerTime(hearecho.heartCount);//
        
    }
    public sendHeartTime() {
        clearTimeout(this.hearttime);
        let self = this;
        this.hearttime = setTimeout(function () {
            self.sendHeartMsg();  //发送心跳包
            self.sendHeartTime(); //定时发送心跳包
        }, 1000 * 20);
    }
    private recveMsg() {

        let datalength: number = this.datalength;
        let data: Uint8Array = this._cacheData;
        let curindex: number = 0;
        let totel: number = datalength;//data.byteLength;
        do {
            let headbuf: Uint8Array = new Uint8Array(8);
            for (let i = 0; i < 8; i++) {
                headbuf[i] = data[i + curindex];
            }
            let length: number = (headbuf[4] & 0xff) | ((headbuf[5] & 0xff) << 8)
            let bodylength: number = headbuf[2] * 10240 + length + 24;
            let crcbuf: Uint8Array = new Uint8Array(2);
            let crcnum: number = ItalkCrc.crc16(headbuf);
            crcbuf[0] = 0xff & crcnum;
            crcbuf[1] = 0xff & crcnum >> 8;

            if (headbuf[0] == 2 && crcbuf[0] == headbuf[6] && crcbuf[1] == headbuf[7] && totel >= bodylength) {
                let msgdata: Uint8Array = new Uint8Array(data.subarray(curindex + 24, curindex + bodylength));
                totel -= bodylength;
                curindex += bodylength;
                switch (headbuf[1]) {
                    case italk.pb.ItalkTypeEnum.ITKLoginECHO:
                        this.recveMsgLoginEcho(msgdata);
                        break;
                    case italk.pb.ItalkTypeEnum.ITKChatECHO:    //每发送一个消息包都会接收一个回复
                        this.recveMsgChatecho(msgdata);
                        break;
                    case italk.pb.ItalkTypeEnum.ITKHeartECHO:   // this.sendChatTextMsg("心跳包");
                        this.recveMsgHeartEcho(msgdata);
                        break;
                    case italk.pb.ItalkTypeEnum.ITKChat:        // console.log("ITKServerChat", "收到消息");
                        this.recveMsgChat(msgdata);
                        break;
                    case italk.pb.ItalkTypeEnum.ITKServerChat:  //消息包 自己发送的
                        this.recveMsgChat(msgdata);
                    break;
                    default:
                        // console.log("default", headbuf[1]);
                        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING); 
                        break;
                }
            } else {
                datalength = 0;
                for (let i = 0; i < totel; i++) {
                    this._cacheData[datalength] = data[i + curindex];
                    datalength++;
                }
                this.datalength = datalength;
                break;
            }
        } while (true);
        if(this.dataArray){
            this.dataArray.reverse();
            for (let i = 0; i < this.dataArray.length; i++) {
                var chat = new italk.pb.ItalkChatMsg();
                chat = this.dataArray[i];
                if (chat.content) {
                    if(this.sendKefuRedSpot(chat)){ //客服消息是当前连接的客服消息才加入展示
                        if(chat.bussinesstype == italk.pb.ItalkBusinessTypeEnum.ITKRevokeMsg && !chat.content.desc)
                        {
                            this.removeChat(Number(chat.content.text));
                        }else{
                            this.chatCls.data.push(chat);
                        }
                    }
                }
            }
            if(this.dataArray.length > 0){
                this.dataArray = null;
                this.chatCls.updateUI(this.severName);
            }
        }
    }
    // 撤回已加入对话的消息
    private removeChat(msgid){
        // 根据单个名字筛选
        this.chatCls.data = this.chatCls.data.filter(item => item.msgid != msgid);
    }
    sendKefuRedSpot(chat){
        let idArray =  chat.fid.split("_");
        let kefuID = idArray[0];
        if(kefuID == "g" + CustomerEntranceType.LoginService){ //登陆客服
            Global.Event.event(GlobalEvent.ShowRedSpot, [false, HallRedSpotType.LoginKefu]);
        }else if(kefuID == "g" + CustomerEntranceType.HallService){ //大厅联系客服
            Global.Event.event(GlobalEvent.ShowRedSpot, [false, HallRedSpotType.Kefu]);
        }
        if("g"+ this.serverType == kefuID){
            return true;
        }else{
            return false;
        }

    }
    //获取UUID
    uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
    }
    
    //获取客服信息
    private getSeverInfo(){

        let param = {
            userid:this.severUserid,
        }
        let suffix = "/mini/user?userid="+this.userid+"&token="+this.token;
        this.sendImageWithParam(suffix,"GetGameUserInfo",param,(res)=>{
            if(res.head != null){
                this.severName = res.name;
                if(res.head.length > 0){
                    this.chatCls.loadSeverHeader(this.getImageHttp(res.head),(frame)=>{
                        this.chatCls.severHeadFrame = frame;
                        this.chatCls.updateUI(res.name)
                    });
                }else{
                    this.chatCls.updateUI(res.name)
                }
            }else{
                Global.UI.fastTip(res._errstr);
            }
        },(error)=>{
            Global.UI.fastTip(error._errstr);
        })
    }
    public sendImageWithParam(suffix,func,param,onComplete?: Function, errorHandler?: Function){
        let paramJSON ={
            _mod:"login",
            _func:func,
            _param:param, 
        }

        var xhr = new XMLHttpRequest();//第一步：创建需要的对象
        xhr.open('POST', "https://"+Global.ChatServer.hurl+suffix, true); //第二步：打开连接/***发送json格式文件必须设置请求头 ；如下 - */
        xhr.setRequestHeader("Content-type","application/json");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）var obj = { name: 'zhansgan', age: 18 };
        xhr.send(JSON.stringify(paramJSON));//发送请求 将json写入send中
        xhr.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
            if (xhr.readyState === 4 && xhr.status == 200 && xhr.responseText) {//验证请求是否发送成功
                let data = JSON.parse(xhr.responseText);
                if(data._param != null){
                    onComplete(data._param);
                }else{
                    if(errorHandler){
                        let data = JSON.parse(xhr.responseText);
                        errorHandler(data);
                    }
                }
            }else{
                if(errorHandler && xhr.responseText){
                    let data = JSON.parse(xhr.responseText);
                    errorHandler(data);
                }
            }
        };
    }
    public getImageHttp(url:String){
        let dateArr =  url.split("/");
        let fileName =  dateArr[dateArr.length-1];
        let imageURl = "https://"+this.hurl + "/login/ossfile?func=GetOssFile&name="+fileName+"&token="+this.token;
        return imageURl;
    }
    public ossAuthority(){
        // {
        //     "_mod":"login",
        //     "_func":"GetSts",
        //     "_param":{
        //         "userid":"aite00000007"
        //     }
        // }
        let param = {
            userid:this.severUserid,
        }
        Global.ChatServer.sendImageWithParam("login/ossAuthority","GetSts",param,(res)=>{
            Logger.error("鉴权信息");
            Logger.error(res);
        },(error)=>{
            Global.UI.fastTip(error._errstr);
        })
        // login/ossAuthority
    }
    
}