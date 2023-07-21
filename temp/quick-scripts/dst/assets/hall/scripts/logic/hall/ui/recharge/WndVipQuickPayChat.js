
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/recharge/WndVipQuickPayChat.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2944aTZJ7BKBL+F+AHX7UKH', 'WndVipQuickPayChat');
// hall/scripts/logic/hall/ui/recharge/WndVipQuickPayChat.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var italkmsg_pb_1 = require("../../../core/net/tcp/italkmsg_pb");
var HallModel_1 = require("../../../hallcommon/model/HallModel");
var ServicerModel_1 = require("../../../hallcommon/model/ServicerModel");
var ChatCenterNode_1 = require("./ChatCenterNode");
var WndVipQuickPayChat = /** @class */ (function (_super) {
    __extends(WndVipQuickPayChat, _super);
    function WndVipQuickPayChat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spriteString = {
            1000: "用支付宝充值",
            1001: "用微信充值",
            1002: "用银行卡充值",
            10000: "我充好了"
        };
        _this.isPressed = false;
        _this.isPhoto = false;
        _this.emojText = "<img src='%s' />";
        _this.severHeadFrame = null;
        _this.data = new Array();
        _this.depositBottom = 165;
        _this.depositH = 60; //间距
        _this.depositData = new Array();
        _this.isOpen = false;
        _this.copyText = "";
        _this.emojMap = {
            0: "大笑", 1: "开心", 2: "泪哭", 3: "尴尬", 4: "快乐", 5: "媚眼", 6: "微笑", 7: "馋嘴", 8: "墨镜", 9: "色", 10: "飞吻",
            11: "爱情", 12: "嘟嘴", 13: "吹口哨", 14: "可爱", 15: "幸福", 16: "拍手", 17: "崇拜", 18: "思考", 19: "挑眉", 20: "平淡", 21: "无奈",
            22: "失望", 23: "白眼", 24: "坏笑", 25: "衰", 26: "压力", 27: "吃惊", 28: "闭嘴", 29: "惊讶", 30: "困", 31: "厌烦", 32: "睡觉",
            33: "如释重负", 34: "鬼脸", 35: "舌头", 36: "调皮", 37: "流口水", 38: "不屑", 39: "悲伤", 40: "困惑", 41: "财迷", 42: "兴奋", 43: "不满",
            44: "委屈", 45: "纠结", 46: "伤心", 47: "担忧", 48: "愤怒", 49: "哭", 50: "流泪", 51: "呆", 52: "害怕", 53: "震惊", 54: "悲伤疲倦",
            55: "抓狂", 56: "尴尬地笑", 57: "冷汗", 58: "惊吓", 59: "不明", 60: "滑稽", 61: "中毒", 62: "发怒", 63: "不爽", 64: "语无伦次", 65: "口罩",
            66: "感冒", 67: "受伤", 68: "恶心", 69: "吐", 70: "打喷嚏", 71: "天使", 72: "牛仔", 73: "匹诺曹", 74: "嘘", 75: "捂嘴", 76: "观察",
            77: "发呆", 78: "魔王", 79: "恶魔生气", 80: "小丑", 81: "怪物", 82: "妖怪", 83: "死亡", 84: "海盗", 85: "外星人", 86: "蒙住眼睛", 87: "堵上耳朵",
            88: "捂住嘴巴", 89: "青苹果", 90: "茄子", 91: "牛油果", 92: "香蕉", 93: "樱桃", 94: "葡萄", 95: "胡萝卜", 96: "黄瓜", 97: "玉米", 98: "辣椒",
            99: "猕猴桃", 100: "柠檬", 101: "哈密瓜", 102: "梨", 103: "苹果", 104: "草莓", 105: "橙子", 106: "西瓜", 107: "椰子", 108: "番茄", 109: "桃子",
            110: "花生", 111: "地瓜", 112: "土豆", 113: "蛋", 114: "肉", 115: "玫瑰", 116: "向日葵", 117: "奶瓶", 118: "法式面包", 119: "甜甜圈", 120: "蛋糕",
            121: "面包", 122: "巧克力", 123: "奶酪", 124: "饺子", 125: "米饭", 126: "煎蛋", 127: "牛角包", 128: "香槟", 129: "咖啡", 130: "饮料", 131: "薯条",
            132: "汉堡", 133: "热狗", 134: "爆米花", 135: "披萨", 136: "鸡腿", 137: "炸虾", 138: "三明治", 139: "便当", 140: "果冻", 141: "团子", 142: "寿司",
            143: "清酒", 144: "饭团", 145: "肉夹馍", 146: "卷饼", 147: "烙饼", 148: "米饼", 149: "椒盐卷饼", 150: "幸运饼干", 151: "曲奇", 152: "蜜罐", 153: "排骨",
            154: "糖果", 155: "棒棒糖",
        };
        return _this;
    }
    WndVipQuickPayChat.prototype.onInit = function () {
        this.name = "WndVipQuickPayChat";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Recharge/VipQuickPayChatUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndVipQuickPayChat.prototype.initView = function () {
        if (cc.Canvas.instance.node.width < cc.Canvas.instance.node.height) {
            this.node.width = cc.Canvas.instance.node.width;
            this.node.height = cc.Canvas.instance.node.height;
        }
        else {
            this.node.width = cc.Canvas.instance.node.height;
            this.node.height = cc.Canvas.instance.node.width;
        }
        this.title = this.getChild("content/topNode/title_label").getComponent(cc.Label);
        this.centerNode = this.getChild("content/centerNode").getComponent(ChatCenterNode_1.default);
        this.endEditNode = this.getChild("content/centerNode/endEditNode");
        this.addCommonClick("content/centerNode/endEditNode", this.endEditing, this);
        this.botNode = this.getChild("content/botNode");
        this.copyBtn = this.getChild("copy");
        this.depositNode = this.getChild("content/botNode/depositNode");
        this.depositNode.active = false;
        this.inputBox = this.getChild("content/botNode/botBox/contentNode/inputEditBox").getComponent(cc.EditBox);
        this.inputBox.node.on('editing-return', this.editingReturn, this); //点击return时触发事件
        this.inputBox.node.on('text-changed', this.textChangeCallback, this);
        this.inputBox.node.on('editing-did-began', this.editingBeganCallback, this);
        this.emojPanel = this.getChild("content/botNode/emojPanel");
        this.photoPanel = this.getChild("content/botNode/photoPanel");
        this.emojScrollView = this.getChild("content/botNode/emojPanel/ScrollView").getComponent(cc.ScrollView);
        this.emojTemplateItem = this.getChild("content/botNode/emojPanel/emojTemplateItem");
        this.emojTemplateItem.active = false;
        this.depositScrollView = this.getChild("content/botNode/depositNode/scrollView").getComponent(cc.ScrollView);
        this.depositItem = this.getChild("content/botNode/depositNode/scrollView/view/content/item");
        this.depositItem.active = false;
        this.plus = this.addCommonClick("content/botNode/botBox/key_btnPlus/kuozhan", this.kuoZhan, this);
        this.addCommonClick("content/botNode/botBox/key_btnEmoj", this.openEmojPanel, this);
        this.addCommonClick("content/topNode/btnBack", this.goBack, this);
        this.addCommonClick("content/botNode/photoPanel/album", this.openAlbum, this);
        this.addCommonClick("content/botNode/photoPanel/camera", this.openCamera, this);
        this.sendBtn = this.addCommonClick("content/botNode/botBox/key_btnPlus/send_btn", this.sendMessage, this);
        this.copyBtn = this.addCommonClick("copy", this.copyMsgText, this);
        this.copyBtn.active = false;
        this.initEmoj();
    };
    WndVipQuickPayChat.prototype.initEmoj = function () {
        for (var key in this.emojMap) {
            var node = cc.instantiate(this.emojTemplateItem).getComponent(cc.Sprite);
            node.node.active = true;
            var name = this.emojMap[key];
            node.spriteFrame = this.getLocalEmoj(name);
            node.node.attr({ key: key, name: name });
            node.node.on(cc.Node.EventType.TOUCH_END, this.clickEmoj, this);
            this.emojScrollView.content.addChild(node.node);
        }
    };
    WndVipQuickPayChat.prototype.initDepositList = function (data) {
        this.depositScrollView.content.removeAllChildren();
        var w = 0;
        var centerLayout = this.centerNode.getComponent(cc.Widget);
        centerLayout.bottom = this.depositBottom;
        if (data.length > 1) {
            this.depositNode.active = true;
        }
        for (var i = 0; i < data.length; i++) {
            if (this.spriteString[data[i]]) {
                var node = cc.instantiate(this.depositItem);
                var bgFrame = cc.find("bg", node).getComponent(cc.Sprite);
                Global.ResourceManager.loadAutoAtlas(bgFrame, "hall/texture/hall/chat/chat", data[i] + "_s", null, false);
                var photo = Global.UIHelper.addCommonClick(node, "bg", this.depositSend, this, cc.Button.Transition.NONE);
                photo.string = data[i];
                node.width = bgFrame.node.width;
                w += node.width - 5;
                node.active = true;
                this.depositScrollView.content.addChild(node);
            }
        }
        this.depositScrollView.content.setContentSize(w, 0);
    };
    WndVipQuickPayChat.prototype.depositSend = function (target) {
        if (target && target.node && this.spriteString[target.node.string]) {
            Global.ChatServer.sendChatTextMsg(this.spriteString[target.node.string], target.node.string + "");
        }
    };
    WndVipQuickPayChat.prototype.clickEmoj = function (event) {
        var node = event.target;
        this.inputBox.string = this.inputBox.string.concat("&[" + node.name + "]&");
        this.textChangeCallback();
    };
    WndVipQuickPayChat.prototype.onOpen = function () {
        //切换成竖屏
        this.isOpen = true;
        if (!Global.ChatServer.severUserid || Global.ChatServer.severUserid.length == 0) {
            Global.UI.fastTip("当前没有客服在线，请留言");
        }
        var frameSize = cc.view.getFrameSize();
        this.node.height = frameSize.height * (this.node.width / frameSize.width);
        if (this.args != null && this.args.length > 0) {
            this.title.string = this.args[0] || "default";
        }
        Global.ChatServer.sendOfflineMsg();
        if (Global.ChatServer.QuickData && Global.ChatServer.QuickData.pay_type && Global.ChatServer.QuickData.pay_type.length > 0) { //手动添加我充好了按钮
            this.depositData = Global.ChatServer.QuickData.pay_type.concat([10000]);
            // console.log("添加后",this.depositData);
            this.initDepositList(this.depositData);
        }
        Global.Event.on(GlobalEvent.setCopypostion, this, this.setCopypostion);
    };
    //结束编辑
    WndVipQuickPayChat.prototype.endEditing = function () {
        this.endEditNode.active = false;
        this.isPhoto = false;
        this.isPressed = false;
        this.hideToolBar();
    };
    //输入框开始编辑
    WndVipQuickPayChat.prototype.editingBeganCallback = function () {
        this.endEditNode.active = false;
        this.isPhoto = false;
        this.isPressed = false;
        this.hideToolBar();
    };
    WndVipQuickPayChat.prototype.editingReturn = function () {
        this.sendMessage();
    };
    WndVipQuickPayChat.prototype.textChangeCallback = function () {
        //当前输入字符大于0 并且不全部为空格或换行
        if (this.inputBox.string.length > 0 && !(this.isNull(this.inputBox.string))) {
            this.plus.active = false;
            this.sendBtn.active = true;
        }
        else {
            this.plus.active = true;
            this.sendBtn.active = false;
        }
    };
    WndVipQuickPayChat.prototype.openAlbum = function () {
        var _this = this;
        if (cc.sys.os == cc.sys.OS_IOS) {
            Global.Component.scheduleOnce(function () {
                Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "videcompress", 120, "上传中");
            }, 0.5);
        }
        else {
            Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "videcompress", 120, "上传中");
        }
        Global.NativeEvent.nstartOpenAlbum(2, 51200, 120, 200, 20, function (path) {
            Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING, "videcompress");
            if (path.result == 0) {
                if (!Global.ChatServer.socketStatus()) {
                    Global.UI.fastTip("聊天系统暂无连接,请稍后再试");
                    Global.ChatServer.connect();
                    return;
                }
                var param = path.funcParam;
                if (param.type == 2) { //视频  
                    var msgcontent = new italkmsg_pb_1.italk.pb.ItalkMsgContent(); //消息内容 
                    msgcontent.size = param.size;
                    msgcontent.second = param.second; //视频时长
                    msgcontent.width = param.width;
                    msgcontent.height = param.height;
                    msgcontent.url = Global.Setting.alioss_file_url + param.url;
                    msgcontent.thumburl = Global.Setting.alioss_file_url + param.url;
                    Global.ChatServer.sendChatMoveMsg(msgcontent);
                }
                else {
                    _this.sendChatImage(path.funcParam);
                }
            }
            else {
                Logger.error("取消选择图片---");
            }
        });
    };
    WndVipQuickPayChat.prototype.openCamera = function () {
        var _this = this;
        if (cc.sys.os == cc.sys.OS_IOS) {
            Global.Component.scheduleOnce(function () {
                Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "videcompress", 60, "上传中");
            }, 0.5);
        }
        else {
            Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "videcompress", 60, "上传中");
        }
        Global.NativeEvent.nstartOpenCamera(2, 200, 20, function (path) {
            Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING, "videcompress");
            if (!Global.ChatServer.socketStatus()) {
                Global.UI.fastTip("聊天系统暂无连接,请稍后再试");
                Global.ChatServer.connect();
                return;
            }
            if (path.result == 0) {
                _this.sendChatImage(path.funcParam);
            }
        });
    };
    //上传选择的视频或者图片
    WndVipQuickPayChat.prototype.sendChatImage = function (funcParam) {
        var _this = this;
        Logger.error("取消选择 -- 上传中loading");
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "uploadfile", 15, "上传中");
        var dateArr = funcParam.filePath.split(".");
        var fileName = dateArr[dateArr.length - 1];
        var imageData = null;
        //新版本因为视频原因 直接从底层传文件的base64String 到上层
        imageData = funcParam.fileData;
        // 上传原文件
        var param = {
            name: Global.ChatServer.uuid() + "." + fileName,
            value: imageData,
            token: Global.ChatServer.token,
        };
        var func = "SetOssFile"; //上传图片
        if (fileName == "mp4") {
            func = "SetOssVideoFile";
        }
        Global.ChatServer.sendImageWithParam("/login/ossfile", func, param, function (bigRes) {
            // 上传缩略图
            _this.getThumbuImageData(funcParam, bigRes, fileName);
        }, function (error) {
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "uploadfile");
            Global.UI.fastTip(error._errstr);
        });
    };
    //获取压缩后的图片资源
    WndVipQuickPayChat.prototype.getThumbuImageData = function (funcParam, bigRes, fileName) {
        var baseData = funcParam.thumImage;
        var param = {
            name: Global.ChatServer.uuid() + ".jpg",
            value: baseData,
            token: Global.ChatServer.token,
        };
        Global.ChatServer.sendImageWithParam("/login/ossfile", "SetOssFile", param, function (res) {
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "uploadfile");
            var msgcontent = new italkmsg_pb_1.italk.pb.ItalkMsgContent(); //消息内容
            msgcontent.size = funcParam.size;
            if (funcParam.second) {
                msgcontent.second = funcParam.second; //视频时长
            }
            msgcontent.width = funcParam.width;
            msgcontent.height = funcParam.height;
            msgcontent.url = bigRes.url;
            msgcontent.thumburl = res.url;
            if (fileName == "mp4") { //选择的mp4文件
                Global.ChatServer.sendChatMoveMsg(msgcontent);
            }
            else { //选择的图片
                Global.ChatServer.sendChatImageMsg(msgcontent);
            }
        }, function (error) {
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "uploadfile");
            Global.UI.fastTip(error._errstr);
        });
    };
    WndVipQuickPayChat.prototype.transformArrayBufferToBase64 = function (buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        for (var len = bytes.byteLength, i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    };
    //TODO
    WndVipQuickPayChat.prototype.kuoZhan = function () {
        this.endEditNode.active = true;
        this.photoPanel.active = true;
        this.emojPanel.active = false;
        this.isPhoto = !this.isPhoto;
        this.isPressed = false;
        if (this.isPhoto) {
            // this.botNode.stopAllActions();
            // this.botNode.runAction(cc.moveTo(0.2, 0, -340).easing(cc.easeBackOut()));
            var botNodeLayout = this.botNode.getComponent(cc.Widget);
            botNodeLayout.bottom = -140;
            var centerNodeLayout = this.centerNode.getComponent(cc.Widget);
            centerNodeLayout.bottom = 470 + botNodeLayout.bottom + (this.depositNode.active ? this.depositH : 0);
            ;
            this.botNode.getComponent(cc.Widget).updateAlignment();
            this.centerNode.getComponent(cc.Widget).updateAlignment();
            this.updateUI(this.title.string);
            // this.centerNode.node.stopAllActions();
            // this.centerNode.node.runAction(cc.moveTo(0.2, 0, 200).easing(cc.easeBackOut()));
        }
        else {
            this.hideToolBar();
        }
    };
    WndVipQuickPayChat.prototype.openEmojPanel = function () {
        this.endEditNode.active = true;
        this.photoPanel.active = false;
        this.emojPanel.active = true;
        this.isPressed = !this.isPressed;
        this.isPhoto = false;
        if (this.isPressed) {
            // this.botNode.stopAllActions();
            // this.botNode.runAction(cc.moveTo(0.2, 0, -175).easing(cc.easeBackOut()));
            var botNodeLayout = this.botNode.getComponent(cc.Widget);
            botNodeLayout.bottom = 0;
            var centerNodeLayout = this.centerNode.getComponent(cc.Widget);
            centerNodeLayout.bottom = 470 + botNodeLayout.bottom + (this.depositNode.active ? this.depositH : 0);
            this.botNode.getComponent(cc.Widget).updateAlignment();
            this.centerNode.getComponent(cc.Widget).updateAlignment();
            this.updateUI(this.title.string);
            // this.centerNode.node.stopAllActions();
            // this.centerNode.node.runAction(cc.moveTo(0.2, 0, 365).easing(cc.easeBackOut()));
        }
        else {
            this.hideToolBar();
        }
    };
    WndVipQuickPayChat.prototype.hideToolBar = function () {
        // this.botNode.stopAllActions();
        var botNodeLayout = this.botNode.getComponent(cc.Widget);
        botNodeLayout.bottom = -365;
        // this.botNode.runAction(cc.moveTo(0.2, 0, -540).easing(cc.easeBackIn()));
        var centerNodeLayout = this.centerNode.getComponent(cc.Widget);
        centerNodeLayout.bottom = 105 + (this.depositNode.active ? this.depositH : 0);
        ;
        this.botNode.getComponent(cc.Widget).updateAlignment();
        this.centerNode.getComponent(cc.Widget).updateAlignment();
        this.updateUI(this.title.string);
        // this.centerNode.node.stopAllActions();
        // this.centerNode.node.runAction(cc.moveTo(0.2, 0, -5).easing(cc.easeBackOut()));
    };
    WndVipQuickPayChat.prototype.goBack = function () {
        this.data = [];
        this.depositNode.active = false;
        this.close();
    };
    WndVipQuickPayChat.prototype.onClose = function () {
        this.data = [];
        Global.ChatServer.QuickData = null;
        this.updateUI(this.title.string);
        this.isOpen = false;
        //客服状态清理
        if (Global.ChatServer.serverType == ServicerModel_1.CustomerEntranceType.LoginService) { //登陆客服
            Global.Event.event(GlobalEvent.CloseRedSpot, HallModel_1.HallRedSpotType.LoginKefu);
        }
        else if (Global.ChatServer.serverType == ServicerModel_1.CustomerEntranceType.HallService) { //大厅联系客服
            Global.Event.event(GlobalEvent.CloseRedSpot, HallModel_1.HallRedSpotType.Kefu);
        }
        this.hideToolBar();
        this.clearInputMsg();
        //切换回横屏
        Global.NativeEvent.changeOrientationH(true);
        Global.UI.adjuestCanvasScreenStretch(cc.Canvas.instance);
    };
    WndVipQuickPayChat.prototype.isNull = function (str) {
        if (str == "")
            return true;
        var regu = "^[ ]+$";
        var re = new RegExp(regu);
        return re.test(str);
    };
    WndVipQuickPayChat.prototype.sendMessage = function () {
        if (!Global.ChatServer.socketStatus()) {
            Global.UI.fastTip("聊天系统暂无连接,请稍后再试");
            Global.ChatServer.connect();
            return;
        }
        var str = this.inputBox.string.trim();
        if ((this.isNull(str))) { //当前输入的全部是空格或者换行符
            this.clearInputMsg();
            return;
        }
        var strArr = str.split("&");
        var tempStr = "";
        var tempStr2 = "";
        if (strArr.length > 1) {
            for (var i = 0; i < strArr.length; i++) {
                var s = strArr[i];
                tempStr2 += s;
                if (s.indexOf("[") != -1 && s.indexOf("]") != -1) {
                    tempStr += cc.js.formatStr(this.emojText, s);
                    continue;
                }
                tempStr += s;
            }
        }
        else {
            tempStr2 = str;
        }
        Global.ChatServer.sendChatTextMsg(tempStr2);
        this.clearInputMsg();
    };
    WndVipQuickPayChat.prototype.clearBracket = function (str) {
        var reg = new RegExp(/\[|]/g);
        return str.replace(reg, "");
    };
    // getImageHttp
    //接收表情解析
    WndVipQuickPayChat.prototype.replaceLocalImg = function (str) {
        var temp = str;
        var reg = new RegExp(/\[.*?\]/g);
        var repAft = temp.replace(reg, "&[");
        var matchArr = str.match(reg);
        if (matchArr != null) {
            for (var i = 0; i < matchArr.length; i++) {
                var val = cc.js.formatStr(this.emojText, matchArr[i]);
                repAft = repAft.replace("&[", val);
            }
        }
        return this.clearBracket(repAft);
    };
    WndVipQuickPayChat.prototype.clearInputMsg = function () {
        this.inputBox.string = "";
        this.textChangeCallback();
    };
    WndVipQuickPayChat.prototype.onDispose = function () {
        this.isOpen = false;
        this.title = null;
        this.centerNode = null;
    };
    WndVipQuickPayChat.prototype.getLocalEmoj = function (sfName, sprite, width, height) {
        if (sfName == null || sfName == undefined || sfName == "") {
            Logger.error("sfName is empty, return!!!");
            return null;
        }
        var spriteFrame = Global.ResourceManager.getSprite("hall/texture/chat/emoj", sfName);
        if (spriteFrame == null) {
            Logger.error("找不到表情 sfName = " + sfName + ", return!!!");
            return null;
        }
        if (sprite != null && sprite != undefined) {
            width = (width != null) ? width : sprite.node.width;
            height = (height != null) ? height : sprite.node.height;
            sprite.spriteFrame = spriteFrame;
            sprite.node.width = width;
            sprite.node.height = height;
        }
        return spriteFrame;
    };
    WndVipQuickPayChat.prototype.loadSeverHeader = function (url, callback) {
        //获取图片
        cc.loader.load({
            url: url,
            type: "jpg"
        }, function (err, texture) {
            var frame = new cc.SpriteFrame(texture);
            callback(frame);
        });
    };
    WndVipQuickPayChat.prototype.updateUI = function (title, isClear) {
        if (isClear === void 0) { isClear = true; }
        if (this.centerNode) {
            this.title.string = title;
            this.centerNode.data = this.data;
            this.centerNode.severHeadFrame = this.severHeadFrame;
            if (this.isOpen) {
                this.centerNode.updateUI(isClear);
            }
        }
        else {
            this.data = [];
            Logger.error("this.centerNode 为空");
        }
    };
    WndVipQuickPayChat.prototype.setCopypostion = function (postion, text) {
        var localPos = this.copyBtn.parent.convertToNodeSpaceAR(postion);
        this.copyBtn.position = localPos;
        this.copyBtn.active = true;
        this.copyText = text;
    };
    //点击复制
    WndVipQuickPayChat.prototype.copyMsgText = function () {
        this.copyBtn.active = false;
        this.centerNode.copyBtnActive = false;
        Global.NativeEvent.copyTextToClipboard(this.copyText, function (retStr) {
            if (retStr.result == 0) {
                Global.UI.fastTip("复制成功");
            }
            else {
                Global.UI.fastTip("复制失败");
            }
        });
    };
    return WndVipQuickPayChat;
}(WndBase_1.default));
exports.default = WndVipQuickPayChat;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWNoYXJnZVxcV25kVmlwUXVpY2tQYXlDaGF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFnRTtBQUNoRSxpRUFBMEQ7QUFDMUQsaUVBQXNFO0FBQ3RFLHlFQUErRTtBQUMvRSxtREFBOEM7QUFFOUM7SUFBZ0Qsc0NBQU87SUFBdkQ7UUFBQSxxRUFxaEJDO1FBcmdCVyxrQkFBWSxHQUFFO1lBQ2xCLElBQUksRUFBQyxRQUFRO1lBQ2IsSUFBSSxFQUFDLE9BQU87WUFDWixJQUFJLEVBQUMsUUFBUTtZQUNiLEtBQUssRUFBQyxNQUFNO1NBQ2YsQ0FBQztRQUNNLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsYUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixjQUFRLEdBQVUsa0JBQWtCLENBQUM7UUFDdEMsb0JBQWMsR0FBa0IsSUFBSSxDQUFDO1FBQ3JDLFVBQUksR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ25CLG1CQUFhLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLGNBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJO1FBQ25CLGlCQUFXLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUMxQixZQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWQsY0FBUSxHQUFHLEVBQUUsQ0FBQTtRQUNyQixhQUFPLEdBQUM7WUFDSixDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxJQUFJO1lBQzVFLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLElBQUk7WUFDeEYsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsSUFBSTtZQUNyRixFQUFFLEVBQUMsTUFBTSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxJQUFJO1lBQzFGLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLE1BQU07WUFDdkYsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxFQUFFLEVBQUMsSUFBSTtZQUMzRixFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxJQUFJO1lBQ3ZGLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsRUFBRSxFQUFDLE1BQU07WUFDOUYsRUFBRSxFQUFDLE1BQU0sRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsSUFBSTtZQUM1RixFQUFFLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxJQUFJO1lBQ2xHLEdBQUcsRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLElBQUk7WUFDcEcsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsSUFBSTtZQUNwRyxHQUFHLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxJQUFJO1lBQ3BHLEdBQUcsRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMs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QUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQXJoQkEsQUFxaEJDLENBcmhCK0MsaUJBQU8sR0FxaEJ0RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXbmRCYXNlLCB7IERlc3RvcnlUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvV25kQmFzZVwiO1xyXG5pbXBvcnQgeyBpdGFsayB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL25ldC90Y3AvaXRhbGttc2dfcGJcIjtcclxuaW1wb3J0IHsgSGFsbFJlZFNwb3RUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvSGFsbE1vZGVsXCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyRW50cmFuY2VUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvU2VydmljZXJNb2RlbFwiO1xyXG5pbXBvcnQgQ2hhdENlbnRlck5vZGUgZnJvbSBcIi4vQ2hhdENlbnRlck5vZGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZFZpcFF1aWNrUGF5Q2hhdCBleHRlbmRzIFduZEJhc2Uge1xyXG5cclxuICAgIHB1YmxpYyBjZW50ZXJOb2RlOiBDaGF0Q2VudGVyTm9kZTtcclxuICAgIHByaXZhdGUgZW5kRWRpdE5vZGU6IGNjLk5vZGU7Ly/ngrnlh7vmlLbotbfplK7nm5jnmoROb2RlXHJcbiAgICBwcml2YXRlIGJvdE5vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGRlcG9zaXROb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBpbnB1dEJveDogY2MuRWRpdEJveDtcclxuICAgIHByaXZhdGUgdGl0bGU6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBwbHVzOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBzZW5kQnRuOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBlbW9qUGFuZWw6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIHBob3RvUGFuZWw6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGVtb2pTY3JvbGxWaWV3OiBjYy5TY3JvbGxWaWV3O1xyXG4gICAgcHJpdmF0ZSBlbW9qVGVtcGxhdGVJdGVtOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBkZXBvc2l0U2Nyb2xsVmlldzogY2MuU2Nyb2xsVmlldzsvL+WFheWAvOWIl+ihqFxyXG4gICAgcHJpdmF0ZSBkZXBvc2l0SXRlbTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgc3ByaXRlU3RyaW5nPSB7XHJcbiAgICAgICAgMTAwMDpcIueUqOaUr+S7mOWuneWFheWAvFwiLFxyXG4gICAgICAgIDEwMDE6XCLnlKjlvq7kv6HlhYXlgLxcIixcclxuICAgICAgICAxMDAyOlwi55So6ZO26KGM5Y2h5YWF5YC8XCIsXHJcbiAgICAgICAgMTAwMDA6XCLmiJHlhYXlpb3kuoZcIlxyXG4gICAgfTtcclxuICAgIHByaXZhdGUgaXNQcmVzc2VkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGlzUGhvdG86IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgZW1valRleHQ6c3RyaW5nID0gXCI8aW1nIHNyYz0nJXMnIC8+XCI7XHJcbiAgICBwdWJsaWMgc2V2ZXJIZWFkRnJhbWU6Y2MuU3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgcHVibGljIGRhdGEgPSBuZXcgQXJyYXkoKTtcclxuICAgIHB1YmxpYyBkZXBvc2l0Qm90dG9tID0gMTY1O1xyXG4gICAgcHVibGljIGRlcG9zaXRIID0gNjA7IC8v6Ze06LedXHJcbiAgICBwdWJsaWMgZGVwb3NpdERhdGEgPSBuZXcgQXJyYXkoKTtcclxuICAgIHB1YmxpYyBpc09wZW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBjb3B5QnRuOmNjLk5vZGVcclxuICAgIHByaXZhdGUgY29weVRleHQgPSBcIlwiXHJcbiAgICBlbW9qTWFwPXtcclxuICAgICAgICAwOlwi5aSn56yRXCIsMTpcIuW8gOW/g1wiLDI6XCLms6rlk61cIiwzOlwi5bC05bCsXCIsNDpcIuW/q+S5kFwiLDU6XCLlqprnnLxcIiw2Olwi5b6u56yRXCIsNzpcIummi+WYtFwiLDg6XCLloqjplZxcIiw5Olwi6ImyXCIsMTA6XCLpo57lkLtcIixcclxuICAgICAgICAxMTpcIueIseaDhVwiLDEyOlwi5Zif5Zi0XCIsMTM6XCLlkLnlj6Plk6hcIiwxNDpcIuWPr+eIsVwiLDE1Olwi5bm456aPXCIsMTY6XCLmi43miYtcIiwxNzpcIuW0h+aLnFwiLDE4Olwi5oCd6ICDXCIsMTk6XCLmjJHnnIlcIiwyMDpcIuW5s+a3oVwiLDIxOlwi5peg5aWIXCIsXHJcbiAgICAgICAgMjI6XCLlpLHmnJtcIiwyMzpcIueZveecvFwiLDI0Olwi5Z2P56yRXCIsMjU6XCLoobBcIiwyNjpcIuWOi+WKm1wiLDI3Olwi5ZCD5oOKXCIsMjg6XCLpl63lmLRcIiwyOTpcIuaDiuiutlwiLDMwOlwi5ZuwXCIsMzE6XCLljozng6ZcIiwzMjpcIuedoeiniVwiLFxyXG4gICAgICAgIDMzOlwi5aaC6YeK6YeN6LSfXCIsMzQ6XCLprLzohLhcIiwzNTpcIuiIjOWktFwiLDM2Olwi6LCD55quXCIsMzc6XCLmtYHlj6PmsLRcIiwzODpcIuS4jeWxkVwiLDM5Olwi5oKy5LykXCIsNDA6XCLlm7Dmg5FcIiw0MTpcIui0oui/t1wiLDQyOlwi5YW05aWLXCIsNDM6XCLkuI3mu6FcIixcclxuICAgICAgICA0NDpcIuWnlOWxiFwiLDQ1Olwi57qg57uTXCIsNDY6XCLkvKTlv4NcIiw0NzpcIuaLheW/p1wiLDQ4Olwi5oSk5oCSXCIsNDk6XCLlk61cIiw1MDpcIua1geazqlwiLDUxOlwi5ZGGXCIsNTI6XCLlrrPmgJVcIiw1MzpcIumch+aDilwiLDU0Olwi5oKy5Lyk55ay5YCmXCIsXHJcbiAgICAgICAgNTU6XCLmipPni4JcIiw1NjpcIuWwtOWwrOWcsOeskVwiLDU3Olwi5Ya35rGXXCIsNTg6XCLmg4rlkJNcIiw1OTpcIuS4jeaYjlwiLDYwOlwi5ruR56i9XCIsNjE6XCLkuK3mr5JcIiw2MjpcIuWPkeaAklwiLDYzOlwi5LiN54i9XCIsNjQ6XCLor63ml6DkvKbmrKFcIiw2NTpcIuWPo+e9qVwiLFxyXG4gICAgICAgIDY2Olwi5oSf5YaSXCIsNjc6XCLlj5fkvKRcIiw2ODpcIuaBtuW/g1wiLDY5Olwi5ZCQXCIsNzA6XCLmiZPllrflmo9cIiw3MTpcIuWkqeS9v1wiLDcyOlwi54mb5LuUXCIsNzM6XCLljLnor7rmm7lcIiw3NDpcIuWYmFwiLDc1Olwi5o2C5Zi0XCIsNzY6XCLop4Llr59cIixcclxuICAgICAgICA3NzpcIuWPkeWRhlwiLDc4Olwi6a2U546LXCIsNzk6XCLmgbbprZTnlJ/msJRcIiw4MDpcIuWwj+S4kVwiLDgxOlwi5oCq54mpXCIsODI6XCLlppbmgKpcIiw4MzpcIuatu+S6oVwiLDg0Olwi5rW355uXXCIsODU6XCLlpJbmmJ/kurpcIiw4NjpcIuiSmeS9j+ecvOedm1wiLDg3Olwi5aC15LiK6ICz5py1XCIsXHJcbiAgICAgICAgODg6XCLmjYLkvY/lmLTlt7RcIiw4OTpcIumdkuiLueaenFwiLDkwOlwi6IyE5a2QXCIsOTE6XCLniZvmsrnmnpxcIiw5MjpcIummmeiViVwiLDkzOlwi5qix5qGDXCIsOTQ6XCLokaHokIRcIiw5NTpcIuiDoeiQneWNnFwiLDk2Olwi6buE55OcXCIsOTc6XCLnjonnsbNcIiw5ODpcIui+o+akklwiLFxyXG4gICAgICAgIDk5Olwi54yV54y05qGDXCIsMTAwOlwi5p+g5qqsXCIsMTAxOlwi5ZOI5a+G55OcXCIsMTAyOlwi5qKoXCIsMTAzOlwi6Iu55p6cXCIsMTA0Olwi6I2J6I6TXCIsMTA1Olwi5qmZ5a2QXCIsMTA2Olwi6KW/55OcXCIsMTA3Olwi5qSw5a2QXCIsMTA4Olwi55Wq6IyEXCIsMTA5Olwi5qGD5a2QXCIsXHJcbiAgICAgICAgMTEwOlwi6Iqx55SfXCIsMTExOlwi5Zyw55OcXCIsMTEyOlwi5Zyf6LGGXCIsMTEzOlwi6JuLXCIsMTE0Olwi6IKJXCIsMTE1Olwi546r55GwXCIsMTE2Olwi5ZCR5pel6JG1XCIsMTE3Olwi5aW255O2XCIsMTE4Olwi5rOV5byP6Z2i5YyFXCIsMTE5Olwi55Sc55Sc5ZyIXCIsMTIwOlwi6JuL57OVXCIsXHJcbiAgICAgICAgMTIxOlwi6Z2i5YyFXCIsMTIyOlwi5ben5YWL5YqbXCIsMTIzOlwi5aW26YWqXCIsMTI0Olwi6aW65a2QXCIsMTI1Olwi57Gz6aWtXCIsMTI2Olwi54WO6JuLXCIsMTI3Olwi54mb6KeS5YyFXCIsMTI4Olwi6aaZ5qefXCIsMTI5Olwi5ZKW5ZWhXCIsMTMwOlwi6aWu5paZXCIsMTMxOlwi6Jav5p2hXCIsXHJcbiAgICAgICAgMTMyOlwi5rGJ5aChXCIsMTMzOlwi54Ot54uXXCIsMTM0Olwi54iG57Gz6IqxXCIsMTM1Olwi5oqr6JCoXCIsMTM2Olwi6bih6IW/XCIsMTM3Olwi54K46Jm+XCIsMTM4Olwi5LiJ5piO5rK7XCIsMTM5Olwi5L6/5b2TXCIsMTQwOlwi5p6c5Ya7XCIsMTQxOlwi5Zui5a2QXCIsMTQyOlwi5a+/5Y+4XCIsXHJcbiAgICAgICAgMTQzOlwi5riF6YWSXCIsMTQ0Olwi6aWt5ZuiXCIsMTQ1Olwi6IKJ5aS56aaNXCIsMTQ2Olwi5Y236aW8XCIsMTQ3Olwi54OZ6aW8XCIsMTQ4Olwi57Gz6aW8XCIsMTQ5Olwi5qSS55uQ5Y236aW8XCIsMTUwOlwi5bm46L+Q6aW85bmyXCIsMTUxOlwi5puy5aWHXCIsMTUyOlwi6Jyc572QXCIsMTUzOlwi5o6S6aqoXCIsXHJcbiAgICAgICAgMTU0Olwi57OW5p6cXCIsMTU1Olwi5qOS5qOS57OWXCIsXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZFZpcFF1aWNrUGF5Q2hhdFwiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBHbG9iYWwuVUkuUG9wTGF5ZXI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvUmVjaGFyZ2UvVmlwUXVpY2tQYXlDaGF0VUlcIjtcclxuICAgICAgICB0aGlzLmRlc3RvcnlUeXBlID0gRGVzdG9yeVR5cGUuTm9uZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIGlmKGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLndpZHRoIDwgY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUuaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLndpZHRoID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS53aWR0aCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLmhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLndpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpdGxlID0gdGhpcy5nZXRDaGlsZChcImNvbnRlbnQvdG9wTm9kZS90aXRsZV9sYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyTm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJjb250ZW50L2NlbnRlck5vZGVcIikuZ2V0Q29tcG9uZW50KENoYXRDZW50ZXJOb2RlKTtcclxuICAgICAgICB0aGlzLmVuZEVkaXROb2RlID0gdGhpcy5nZXRDaGlsZChcImNvbnRlbnQvY2VudGVyTm9kZS9lbmRFZGl0Tm9kZVwiKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiY29udGVudC9jZW50ZXJOb2RlL2VuZEVkaXROb2RlXCIsIHRoaXMuZW5kRWRpdGluZywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ib3ROb2RlID0gdGhpcy5nZXRDaGlsZChcImNvbnRlbnQvYm90Tm9kZVwiKTtcclxuICAgICAgICB0aGlzLmNvcHlCdG4gPSB0aGlzLmdldENoaWxkKFwiY29weVwiKTtcclxuICAgICAgICB0aGlzLmRlcG9zaXROb2RlID0gdGhpcy5nZXRDaGlsZChcImNvbnRlbnQvYm90Tm9kZS9kZXBvc2l0Tm9kZVwiKTtcclxuICAgICAgICB0aGlzLmRlcG9zaXROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW5wdXRCb3ggPSB0aGlzLmdldENoaWxkKFwiY29udGVudC9ib3ROb2RlL2JvdEJveC9jb250ZW50Tm9kZS9pbnB1dEVkaXRCb3hcIikuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpO1xyXG5cclxuICAgICAgICB0aGlzLmlucHV0Qm94Lm5vZGUub24oJ2VkaXRpbmctcmV0dXJuJywgdGhpcy5lZGl0aW5nUmV0dXJuLCB0aGlzKTsgLy/ngrnlh7tyZXR1cm7ml7bop6blj5Hkuovku7ZcclxuICAgICAgICB0aGlzLmlucHV0Qm94Lm5vZGUub24oJ3RleHQtY2hhbmdlZCcsIHRoaXMudGV4dENoYW5nZUNhbGxiYWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmlucHV0Qm94Lm5vZGUub24oJ2VkaXRpbmctZGlkLWJlZ2FuJywgdGhpcy5lZGl0aW5nQmVnYW5DYWxsYmFjaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5lbW9qUGFuZWwgPSB0aGlzLmdldENoaWxkKFwiY29udGVudC9ib3ROb2RlL2Vtb2pQYW5lbFwiKTtcclxuICAgICAgICB0aGlzLnBob3RvUGFuZWwgPSB0aGlzLmdldENoaWxkKFwiY29udGVudC9ib3ROb2RlL3Bob3RvUGFuZWxcIik7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuZW1valNjcm9sbFZpZXcgPSB0aGlzLmdldENoaWxkKFwiY29udGVudC9ib3ROb2RlL2Vtb2pQYW5lbC9TY3JvbGxWaWV3XCIpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KTtcclxuICAgICAgICB0aGlzLmVtb2pUZW1wbGF0ZUl0ZW0gPSB0aGlzLmdldENoaWxkKFwiY29udGVudC9ib3ROb2RlL2Vtb2pQYW5lbC9lbW9qVGVtcGxhdGVJdGVtXCIpO1xyXG4gICAgICAgIHRoaXMuZW1valRlbXBsYXRlSXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5kZXBvc2l0U2Nyb2xsVmlldyA9IHRoaXMuZ2V0Q2hpbGQoXCJjb250ZW50L2JvdE5vZGUvZGVwb3NpdE5vZGUvc2Nyb2xsVmlld1wiKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldyk7XHJcbiAgICAgICAgdGhpcy5kZXBvc2l0SXRlbSA9IHRoaXMuZ2V0Q2hpbGQoXCJjb250ZW50L2JvdE5vZGUvZGVwb3NpdE5vZGUvc2Nyb2xsVmlldy92aWV3L2NvbnRlbnQvaXRlbVwiKTtcclxuICAgICAgICB0aGlzLmRlcG9zaXRJdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICB0aGlzLnBsdXMgPSB0aGlzLmFkZENvbW1vbkNsaWNrKFwiY29udGVudC9ib3ROb2RlL2JvdEJveC9rZXlfYnRuUGx1cy9rdW96aGFuXCIsIHRoaXMua3VvWmhhbiwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImNvbnRlbnQvYm90Tm9kZS9ib3RCb3gva2V5X2J0bkVtb2pcIiwgdGhpcy5vcGVuRW1valBhbmVsLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiY29udGVudC90b3BOb2RlL2J0bkJhY2tcIiwgdGhpcy5nb0JhY2ssIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiY29udGVudC9ib3ROb2RlL3Bob3RvUGFuZWwvYWxidW1cIiwgdGhpcy5vcGVuQWxidW0sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJjb250ZW50L2JvdE5vZGUvcGhvdG9QYW5lbC9jYW1lcmFcIiwgdGhpcy5vcGVuQ2FtZXJhLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnNlbmRCdG4gPSB0aGlzLmFkZENvbW1vbkNsaWNrKFwiY29udGVudC9ib3ROb2RlL2JvdEJveC9rZXlfYnRuUGx1cy9zZW5kX2J0blwiLCB0aGlzLnNlbmRNZXNzYWdlLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNvcHlCdG4gPSB0aGlzLmFkZENvbW1vbkNsaWNrKFwiY29weVwiLCB0aGlzLmNvcHlNc2dUZXh0LCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNvcHlCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbml0RW1vaigpO1xyXG4gICAgfVxyXG4gICAgaW5pdEVtb2ooKXtcclxuICAgICAgICBmb3IobGV0IGtleSBpbiB0aGlzLmVtb2pNYXApe1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZW1valRlbXBsYXRlSXRlbSkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIG5vZGUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IHRoaXMuZW1vak1hcFtrZXldO1xyXG4gICAgICAgICAgICBub2RlLnNwcml0ZUZyYW1lID0gdGhpcy5nZXRMb2NhbEVtb2oobmFtZSk7XHJcbiAgICAgICAgICAgIG5vZGUubm9kZS5hdHRyKHtrZXksbmFtZX0pO1xyXG4gICAgICAgICAgICBub2RlLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELHRoaXMuY2xpY2tFbW9qLHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmVtb2pTY3JvbGxWaWV3LmNvbnRlbnQuYWRkQ2hpbGQobm9kZS5ub2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGluaXREZXBvc2l0TGlzdChkYXRhKXtcclxuICAgICAgICB0aGlzLmRlcG9zaXRTY3JvbGxWaWV3LmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB2YXIgdyA9IDA7XHJcbiAgICAgICAgbGV0IGNlbnRlckxheW91dCA9IHRoaXMuY2VudGVyTm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuICAgICAgICBjZW50ZXJMYXlvdXQuYm90dG9tID0gdGhpcy5kZXBvc2l0Qm90dG9tO1xyXG4gICAgICAgIGlmKGRhdGEubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgIHRoaXMuZGVwb3NpdE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLnNwcml0ZVN0cmluZ1tkYXRhW2ldXSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZGVwb3NpdEl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJnRnJhbWUgPSBjYy5maW5kKFwiYmdcIixub2RlKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyhiZ0ZyYW1lLFwiaGFsbC90ZXh0dXJlL2hhbGwvY2hhdC9jaGF0XCIsIGRhdGFbaV0rXCJfc1wiLCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGhvdG8gPSAgR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKG5vZGUsIFwiYmdcIiwgdGhpcy5kZXBvc2l0U2VuZCwgdGhpcywgY2MuQnV0dG9uLlRyYW5zaXRpb24uTk9ORSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGhvdG8uc3RyaW5nID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgIG5vZGUud2lkdGggPSBiZ0ZyYW1lLm5vZGUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICB3ICs9IG5vZGUud2lkdGggLSA1O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXBvc2l0U2Nyb2xsVmlldy5jb250ZW50LmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGVwb3NpdFNjcm9sbFZpZXcuY29udGVudC5zZXRDb250ZW50U2l6ZSh3LCAwKTtcclxuICAgIH1cclxuICAgIGRlcG9zaXRTZW5kKHRhcmdldCl7IC8v6Ieq5Yqo5Zue5aSNXHJcbiAgICAgICAgaWYodGFyZ2V0ICYmIHRhcmdldC5ub2RlICYmIHRoaXMuc3ByaXRlU3RyaW5nW3RhcmdldC5ub2RlLnN0cmluZ10pe1xyXG4gICAgICAgICAgICBHbG9iYWwuQ2hhdFNlcnZlci5zZW5kQ2hhdFRleHRNc2codGhpcy5zcHJpdGVTdHJpbmdbdGFyZ2V0Lm5vZGUuc3RyaW5nXSx0YXJnZXQubm9kZS5zdHJpbmcrXCJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xpY2tFbW9qKGV2ZW50KXtcclxuICAgICAgICBsZXQgbm9kZSA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICB0aGlzLmlucHV0Qm94LnN0cmluZyA9IHRoaXMuaW5wdXRCb3guc3RyaW5nLmNvbmNhdChcIiZbXCIrbm9kZS5uYW1lK1wiXSZcIik7XHJcbiAgICAgICAgdGhpcy50ZXh0Q2hhbmdlQ2FsbGJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk9wZW4oKSB7XHJcbiAgICAgICAgLy/liIfmjaLmiJDnq5blsY9cclxuICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XHJcbiAgICAgICAgaWYoIUdsb2JhbC5DaGF0U2VydmVyLnNldmVyVXNlcmlkIHx8IEdsb2JhbC5DaGF0U2VydmVyLnNldmVyVXNlcmlkLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLlvZPliY3msqHmnInlrqLmnI3lnKjnur/vvIzor7fnlZnoqIBcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmcmFtZVNpemUgPSBjYy52aWV3LmdldEZyYW1lU2l6ZSgpXHJcbiAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IGZyYW1lU2l6ZS5oZWlnaHQgKih0aGlzLm5vZGUud2lkdGgvZnJhbWVTaXplLndpZHRoKTtcclxuICAgICAgICBpZih0aGlzLmFyZ3MhPW51bGwmJnRoaXMuYXJncy5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUuc3RyaW5nID0gdGhpcy5hcmdzWzBdfHxcImRlZmF1bHRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkNoYXRTZXJ2ZXIuc2VuZE9mZmxpbmVNc2coKTtcclxuICAgICAgICBpZihHbG9iYWwuQ2hhdFNlcnZlci5RdWlja0RhdGEgJiYgR2xvYmFsLkNoYXRTZXJ2ZXIuUXVpY2tEYXRhLnBheV90eXBlICYmIEdsb2JhbC5DaGF0U2VydmVyLlF1aWNrRGF0YS5wYXlfdHlwZS5sZW5ndGggPiAwKXsvL+aJi+WKqOa3u+WKoOaIkeWFheWlveS6huaMiemSrlxyXG4gICAgICAgICAgICB0aGlzLmRlcG9zaXREYXRhID0gR2xvYmFsLkNoYXRTZXJ2ZXIuUXVpY2tEYXRhLnBheV90eXBlLmNvbmNhdChbMTAwMDBdKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLmt7vliqDlkI5cIix0aGlzLmRlcG9zaXREYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0RGVwb3NpdExpc3QodGhpcy5kZXBvc2l0RGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vbihHbG9iYWxFdmVudC5zZXRDb3B5cG9zdGlvbix0aGlzLHRoaXMuc2V0Q29weXBvc3Rpb24pXHJcbiAgICB9XHJcbiAgICAvL+e7k+adn+e8lui+kVxyXG4gICAgcHJpdmF0ZSBlbmRFZGl0aW5nKCl7XHJcbiAgICAgICAgdGhpcy5lbmRFZGl0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUGhvdG8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaGlkZVRvb2xCYXIoKTtcclxuICAgIH1cclxuICAgIC8v6L6T5YWl5qGG5byA5aeL57yW6L6RXHJcbiAgICBwcml2YXRlIGVkaXRpbmdCZWdhbkNhbGxiYWNrKCl7XHJcbiAgICAgICAgdGhpcy5lbmRFZGl0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUGhvdG8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaGlkZVRvb2xCYXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBlZGl0aW5nUmV0dXJuKCl7XHJcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdGV4dENoYW5nZUNhbGxiYWNrKCkge1xyXG4gICAgICAgIC8v5b2T5YmN6L6T5YWl5a2X56ym5aSn5LqOMCDlubbkuJTkuI3lhajpg6jkuLrnqbrmoLzmiJbmjaLooYxcclxuICAgICAgICBpZiAodGhpcy5pbnB1dEJveC5zdHJpbmcubGVuZ3RoID4gMCAmJiAhKHRoaXMuaXNOdWxsKHRoaXMuaW5wdXRCb3guc3RyaW5nKSkpIHtcclxuICAgICAgICAgICAgdGhpcy5wbHVzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmRCdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBsdXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZW5kQnRuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgb3BlbkFsYnVtKCkge1xyXG4gICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICBHbG9iYWwuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuU0hPV19ORVRfV0FJVElORywgXCJ2aWRlY29tcHJlc3NcIiwgMTIwLCBcIuS4iuS8oOS4rVwiKTtcclxuICAgICAgICAgICAgfSwgMC41KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuU0hPV19ORVRfV0FJVElORywgXCJ2aWRlY29tcHJlc3NcIiwgMTIwLCBcIuS4iuS8oOS4rVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50Lm5zdGFydE9wZW5BbGJ1bSgyLCA1MTIwMCwgMTIwLCAyMDAsIDIwLCAocGF0aCkgPT4ge1xyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuRk9SQ0VfSElERV9XQUlUSU5HLCBcInZpZGVjb21wcmVzc1wiKVxyXG4gICAgICAgICAgICBpZiAocGF0aC5yZXN1bHQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFHbG9iYWwuQ2hhdFNlcnZlci5zb2NrZXRTdGF0dXMoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi6IGK5aSp57O757uf5pqC5peg6L+e5o6lLOivt+eojeWQjuWGjeivlVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuQ2hhdFNlcnZlci5jb25uZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtID0gcGF0aC5mdW5jUGFyYW07XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW0udHlwZSA9PSAyKSB7Ly/op4bpopEgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtc2djb250ZW50ID0gbmV3IGl0YWxrLnBiLkl0YWxrTXNnQ29udGVudCgpOyAvL+a2iOaBr+WGheWuuSBcclxuICAgICAgICAgICAgICAgICAgICBtc2djb250ZW50LnNpemUgPSBwYXJhbS5zaXplO1xyXG4gICAgICAgICAgICAgICAgICAgIG1zZ2NvbnRlbnQuc2Vjb25kID0gcGFyYW0uc2Vjb25kOy8v6KeG6aKR5pe26ZW/XHJcbiAgICAgICAgICAgICAgICAgICAgbXNnY29udGVudC53aWR0aCA9IHBhcmFtLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIG1zZ2NvbnRlbnQuaGVpZ2h0ID0gcGFyYW0uaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIG1zZ2NvbnRlbnQudXJsID0gR2xvYmFsLlNldHRpbmcuYWxpb3NzX2ZpbGVfdXJsICsgcGFyYW0udXJsO1xyXG4gICAgICAgICAgICAgICAgICAgIG1zZ2NvbnRlbnQudGh1bWJ1cmwgPSBHbG9iYWwuU2V0dGluZy5hbGlvc3NfZmlsZV91cmwgKyBwYXJhbS51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLkNoYXRTZXJ2ZXIuc2VuZENoYXRNb3ZlTXNnKG1zZ2NvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kQ2hhdEltYWdlKHBhdGguZnVuY1BhcmFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLlj5bmtojpgInmi6nlm77niYctLS1cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvcGVuQ2FtZXJhKCkge1xyXG4gICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICBHbG9iYWwuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuU0hPV19ORVRfV0FJVElORywgXCJ2aWRlY29tcHJlc3NcIiwgNjAsIFwi5LiK5Lyg5LitXCIpO1xyXG4gICAgICAgICAgICB9LCAwLjUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5TSE9XX05FVF9XQUlUSU5HLCBcInZpZGVjb21wcmVzc1wiLCA2MCwgXCLkuIrkvKDkuK1cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5uc3RhcnRPcGVuQ2FtZXJhKDIsIDIwMCwgMjAsIChwYXRoKSA9PiB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5GT1JDRV9ISURFX1dBSVRJTkcsIFwidmlkZWNvbXByZXNzXCIpXHJcbiAgICAgICAgICAgIGlmICghR2xvYmFsLkNoYXRTZXJ2ZXIuc29ja2V0U3RhdHVzKCkpIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi6IGK5aSp57O757uf5pqC5peg6L+e5o6lLOivt+eojeWQjuWGjeivlVwiKTtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5DaGF0U2VydmVyLmNvbm5lY3QoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocGF0aC5yZXN1bHQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kQ2hhdEltYWdlKHBhdGguZnVuY1BhcmFtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvL+S4iuS8oOmAieaLqeeahOinhumikeaIluiAheWbvueJh1xyXG4gICAgc2VuZENoYXRJbWFnZShmdW5jUGFyYW0pe1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihcIuWPlua2iOmAieaLqSAtLSDkuIrkvKDkuK1sb2FkaW5nXCIpO1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5TSE9XX05FVF9XQUlUSU5HLCBcInVwbG9hZGZpbGVcIiwxNSxcIuS4iuS8oOS4rVwiKTtcclxuICAgICAgICBsZXQgZGF0ZUFyciA9ICBmdW5jUGFyYW0uZmlsZVBhdGguc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgIGxldCBmaWxlTmFtZSA9ICBkYXRlQXJyW2RhdGVBcnIubGVuZ3RoLTFdO1xyXG4gICAgICAgIHZhciBpbWFnZURhdGEgPSBudWxsO1xyXG4gICAgICAgIC8v5paw54mI5pys5Zug5Li66KeG6aKR5Y6f5ZugIOebtOaOpeS7juW6leWxguS8oOaWh+S7tueahGJhc2U2NFN0cmluZyDliLDkuIrlsYJcclxuICAgICAgICBpbWFnZURhdGEgPSBmdW5jUGFyYW0uZmlsZURhdGEgXHJcbiAgICAgICAgLy8g5LiK5Lyg5Y6f5paH5Lu2XHJcbiAgICAgICAgbGV0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICBuYW1lOkdsb2JhbC5DaGF0U2VydmVyLnV1aWQoKStcIi5cIitmaWxlTmFtZSxcclxuICAgICAgICAgICAgdmFsdWU6aW1hZ2VEYXRhLFxyXG4gICAgICAgICAgICB0b2tlbjpHbG9iYWwuQ2hhdFNlcnZlci50b2tlbixcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZ1bmMgPSBcIlNldE9zc0ZpbGVcIiAvL+S4iuS8oOWbvueJh1xyXG4gICAgICAgIGlmKGZpbGVOYW1lID09IFwibXA0XCIpe1xyXG4gICAgICAgICAgICBmdW5jID0gXCJTZXRPc3NWaWRlb0ZpbGVcIlxyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuQ2hhdFNlcnZlci5zZW5kSW1hZ2VXaXRoUGFyYW0oXCIvbG9naW4vb3NzZmlsZVwiLGZ1bmMscGFyYW0sKGJpZ1Jlcyk9PntcclxuICAgICAgICAgICAgLy8g5LiK5Lyg57yp55Wl5Zu+XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0VGh1bWJ1SW1hZ2VEYXRhKGZ1bmNQYXJhbSxiaWdSZXMsZmlsZU5hbWUpXHJcbiAgICAgICAgfSwoZXJyb3IpPT57XHJcbiAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5ISURFX05FVF9XQUlUSU5HLFwidXBsb2FkZmlsZVwiKTtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoZXJyb3IuX2VycnN0cik7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8v6I635Y+W5Y6L57yp5ZCO55qE5Zu+54mH6LWE5rqQXHJcbiAgICBnZXRUaHVtYnVJbWFnZURhdGEoZnVuY1BhcmFtLGJpZ1JlcyxmaWxlTmFtZSl7XHJcbiAgICAgICAgbGV0IGJhc2VEYXRhID0gZnVuY1BhcmFtLnRodW1JbWFnZTtcclxuICAgICAgICBsZXQgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIG5hbWU6R2xvYmFsLkNoYXRTZXJ2ZXIudXVpZCgpK1wiLmpwZ1wiLFxyXG4gICAgICAgICAgICB2YWx1ZTpiYXNlRGF0YSxcclxuICAgICAgICAgICAgdG9rZW46R2xvYmFsLkNoYXRTZXJ2ZXIudG9rZW4sXHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5DaGF0U2VydmVyLnNlbmRJbWFnZVdpdGhQYXJhbShcIi9sb2dpbi9vc3NmaWxlXCIsXCJTZXRPc3NGaWxlXCIscGFyYW0sKHJlcyk9PntcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkhJREVfTkVUX1dBSVRJTkcsXCJ1cGxvYWRmaWxlXCIpXHJcbiAgICAgICAgICAgIGxldCBtc2djb250ZW50ID0gbmV3IGl0YWxrLnBiLkl0YWxrTXNnQ29udGVudCgpOyAvL+a2iOaBr+WGheWuuVxyXG4gICAgICAgICAgICBtc2djb250ZW50LnNpemUgPSBmdW5jUGFyYW0uc2l6ZTtcclxuICAgICAgICAgICAgaWYoZnVuY1BhcmFtLnNlY29uZCl7XHJcbiAgICAgICAgICAgICAgICBtc2djb250ZW50LnNlY29uZCA9IGZ1bmNQYXJhbS5zZWNvbmQ7Ly/op4bpopHml7bplb9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtc2djb250ZW50LndpZHRoID0gZnVuY1BhcmFtLndpZHRoO1xyXG4gICAgICAgICAgICBtc2djb250ZW50LmhlaWdodCA9IGZ1bmNQYXJhbS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIG1zZ2NvbnRlbnQudXJsID0gYmlnUmVzLnVybDtcclxuICAgICAgICAgICAgbXNnY29udGVudC50aHVtYnVybCA9IHJlcy51cmw7XHJcbiAgICAgICAgICAgIGlmKGZpbGVOYW1lID09IFwibXA0XCIpXHJcbiAgICAgICAgICAgIHsgICAgICAgLy/pgInmi6nnmoRtcDTmlofku7ZcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5DaGF0U2VydmVyLnNlbmRDaGF0TW92ZU1zZyhtc2djb250ZW50KTtcclxuICAgICAgICAgICAgfWVsc2V7ICAvL+mAieaLqeeahOWbvueJh1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkNoYXRTZXJ2ZXIuc2VuZENoYXRJbWFnZU1zZyhtc2djb250ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sKGVycm9yKT0+e1xyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuSElERV9ORVRfV0FJVElORyxcInVwbG9hZGZpbGVcIilcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoZXJyb3IuX2VycnN0cik7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHRyYW5zZm9ybUFycmF5QnVmZmVyVG9CYXNlNjQgKGJ1ZmZlcikge1xyXG4gICAgICAgIHZhciBiaW5hcnkgPSAnJztcclxuICAgICAgICB2YXIgYnl0ZXMgPSBuZXcgVWludDhBcnJheShidWZmZXIpO1xyXG4gICAgICAgIGZvciAodmFyIGxlbiA9IGJ5dGVzLmJ5dGVMZW5ndGgsIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgYmluYXJ5ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYnRvYShiaW5hcnkpO1xyXG4gICAgfVxyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgcHJpdmF0ZSBrdW9aaGFuKCkge1xyXG4gICAgICAgIHRoaXMuZW5kRWRpdE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnBob3RvUGFuZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmVtb2pQYW5lbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUGhvdG8gPSAhdGhpcy5pc1Bob3RvO1xyXG4gICAgICAgIHRoaXMuaXNQcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQaG90bykge1xyXG4gICAgICAgICAgICAvLyB0aGlzLmJvdE5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5ib3ROb2RlLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4yLCAwLCAtMzQwKS5lYXNpbmcoY2MuZWFzZUJhY2tPdXQoKSkpO1xyXG4gICAgICAgICAgICBsZXQgYm90Tm9kZUxheW91dCA9IHRoaXMuYm90Tm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuICAgICAgICAgICAgYm90Tm9kZUxheW91dC5ib3R0b20gPSAtMTQwO1xyXG4gICAgICAgICAgICBsZXQgY2VudGVyTm9kZUxheW91dCA9IHRoaXMuY2VudGVyTm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuICAgICAgICAgICAgY2VudGVyTm9kZUxheW91dC5ib3R0b20gPSA0NzArYm90Tm9kZUxheW91dC5ib3R0b20gKyAodGhpcy5kZXBvc2l0Tm9kZS5hY3RpdmUgPyB0aGlzLmRlcG9zaXRIOjApOztcclxuICAgICAgICAgICAgdGhpcy5ib3ROb2RlLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNlbnRlck5vZGUuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVUkodGhpcy50aXRsZS5zdHJpbmcpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmNlbnRlck5vZGUubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmNlbnRlck5vZGUubm9kZS5ydW5BY3Rpb24oY2MubW92ZVRvKDAuMiwgMCwgMjAwKS5lYXNpbmcoY2MuZWFzZUJhY2tPdXQoKSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZVRvb2xCYXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9wZW5FbW9qUGFuZWwoKSB7XHJcbiAgICAgICAgdGhpcy5lbmRFZGl0Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucGhvdG9QYW5lbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmVtb2pQYW5lbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNQcmVzc2VkID0gIXRoaXMuaXNQcmVzc2VkO1xyXG4gICAgICAgIHRoaXMuaXNQaG90byA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmlzUHJlc3NlZCkge1xyXG4gICAgICAgICAgICAvLyB0aGlzLmJvdE5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5ib3ROb2RlLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4yLCAwLCAtMTc1KS5lYXNpbmcoY2MuZWFzZUJhY2tPdXQoKSkpO1xyXG4gICAgICAgICAgICBsZXQgYm90Tm9kZUxheW91dCA9IHRoaXMuYm90Tm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuICAgICAgICAgICAgYm90Tm9kZUxheW91dC5ib3R0b20gPSAwO1xyXG4gICAgICAgICAgICBsZXQgY2VudGVyTm9kZUxheW91dCA9IHRoaXMuY2VudGVyTm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuICAgICAgICAgICAgY2VudGVyTm9kZUxheW91dC5ib3R0b20gPSA0NzArYm90Tm9kZUxheW91dC5ib3R0b20gKyAodGhpcy5kZXBvc2l0Tm9kZS5hY3RpdmUgPyB0aGlzLmRlcG9zaXRIOjApO1xyXG4gICAgICAgICAgICB0aGlzLmJvdE5vZGUuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2VudGVyTm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVVSSh0aGlzLnRpdGxlLnN0cmluZyk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuY2VudGVyTm9kZS5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuY2VudGVyTm9kZS5ub2RlLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4yLCAwLCAzNjUpLmVhc2luZyhjYy5lYXNlQmFja091dCgpKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlVG9vbEJhcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgaGlkZVRvb2xCYXIoKXtcclxuICAgICAgICAvLyB0aGlzLmJvdE5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICBsZXQgYm90Tm9kZUxheW91dCA9IHRoaXMuYm90Tm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuICAgICAgICBib3ROb2RlTGF5b3V0LmJvdHRvbSA9IC0zNjU7XHJcbiAgICAgICAgLy8gdGhpcy5ib3ROb2RlLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4yLCAwLCAtNTQwKS5lYXNpbmcoY2MuZWFzZUJhY2tJbigpKSk7XHJcbiAgICAgICAgbGV0IGNlbnRlck5vZGVMYXlvdXQgPSB0aGlzLmNlbnRlck5vZGUuZ2V0Q29tcG9uZW50KGNjLldpZGdldCk7XHJcbiAgICAgICAgY2VudGVyTm9kZUxheW91dC5ib3R0b20gPSAxMDUgKyAodGhpcy5kZXBvc2l0Tm9kZS5hY3RpdmUgPyB0aGlzLmRlcG9zaXRIOjApOztcclxuICAgICAgICB0aGlzLmJvdE5vZGUuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJOb2RlLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVUkodGhpcy50aXRsZS5zdHJpbmcpO1xyXG4gICAgICAgIC8vIHRoaXMuY2VudGVyTm9kZS5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgLy8gdGhpcy5jZW50ZXJOb2RlLm5vZGUucnVuQWN0aW9uKGNjLm1vdmVUbygwLjIsIDAsIC01KS5lYXNpbmcoY2MuZWFzZUJhY2tPdXQoKSkpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gW107XHJcbiAgICAgICAgdGhpcy5kZXBvc2l0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbG9zZSgpe1xyXG4gICAgICAgIHRoaXMuZGF0YSA9W107XHJcbiAgICAgICAgR2xvYmFsLkNoYXRTZXJ2ZXIuUXVpY2tEYXRhID0gbnVsbFxyXG4gICAgICAgIHRoaXMudXBkYXRlVUkodGhpcy50aXRsZS5zdHJpbmcpO1xyXG4gICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgLy/lrqLmnI3nirbmgIHmuIXnkIZcclxuICAgICAgICBpZihHbG9iYWwuQ2hhdFNlcnZlci5zZXJ2ZXJUeXBlID09IEN1c3RvbWVyRW50cmFuY2VUeXBlLkxvZ2luU2VydmljZSl7IC8v55m76ZmG5a6i5pyNXHJcbiAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5DbG9zZVJlZFNwb3QsIEhhbGxSZWRTcG90VHlwZS5Mb2dpbktlZnUpO1xyXG4gICAgICAgIH1lbHNlIGlmKEdsb2JhbC5DaGF0U2VydmVyLnNlcnZlclR5cGUgPT0gQ3VzdG9tZXJFbnRyYW5jZVR5cGUuSGFsbFNlcnZpY2UpeyAvL+Wkp+WOheiBlOezu+WuouacjVxyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuQ2xvc2VSZWRTcG90LCBIYWxsUmVkU3BvdFR5cGUuS2VmdSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGlkZVRvb2xCYXIoKTtcclxuICAgICAgICB0aGlzLmNsZWFySW5wdXRNc2coKTtcclxuICAgICAgICAvL+WIh+aNouWbnuaoquWxj1xyXG4gICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5jaGFuZ2VPcmllbnRhdGlvbkgodHJ1ZSk7XHJcbiAgICAgICAgR2xvYmFsLlVJLmFkanVlc3RDYW52YXNTY3JlZW5TdHJldGNoKGNjLkNhbnZhcy5pbnN0YW5jZSk7IFxyXG4gICAgfVxyXG4gICAgaXNOdWxsKCBzdHIgKXtcclxuICAgICAgICBpZiAoIHN0ciA9PSBcIlwiICkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgdmFyIHJlZ3UgPSBcIl5bIF0rJFwiO1xyXG4gICAgICAgIHZhciByZSA9IG5ldyBSZWdFeHAocmVndSk7XHJcbiAgICAgICAgcmV0dXJuIHJlLnRlc3Qoc3RyKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc2VuZE1lc3NhZ2UoKSB7XHJcbiAgICAgICAgaWYoIUdsb2JhbC5DaGF0U2VydmVyLnNvY2tldFN0YXR1cygpKXtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLogYrlpKnns7vnu5/mmoLml6Dov57mjqUs6K+356iN5ZCO5YaN6K+VXCIpO1xyXG4gICAgICAgICAgICBHbG9iYWwuQ2hhdFNlcnZlci5jb25uZWN0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHN0ciA9IHRoaXMuaW5wdXRCb3guc3RyaW5nLnRyaW0oKTtcclxuICAgICAgICBpZigodGhpcy5pc051bGwoc3RyKSkpeyAvL+W9k+WJjei+k+WFpeeahOWFqOmDqOaYr+epuuagvOaIluiAheaNouihjOesplxyXG4gICAgICAgICAgICB0aGlzLmNsZWFySW5wdXRNc2coKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc3RyQXJyOnN0cmluZ1tdID0gc3RyLnNwbGl0KFwiJlwiKTtcclxuICAgICAgICBsZXQgdGVtcFN0ciA9IFwiXCI7XHJcbiAgICAgICAgbGV0IHRlbXBTdHIyID1cIlwiO1xyXG4gICAgICAgIGlmKHN0ckFyci5sZW5ndGg+MSl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8c3RyQXJyLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IHMgPSBzdHJBcnJbaV07XHJcbiAgICAgICAgICAgICAgICB0ZW1wU3RyMis9cztcclxuICAgICAgICAgICAgICAgIGlmKHMuaW5kZXhPZihcIltcIikhPS0xJiZzLmluZGV4T2YoXCJdXCIpIT0tMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcFN0cis9Y2MuanMuZm9ybWF0U3RyKHRoaXMuZW1valRleHQscyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0ZW1wU3RyKz1zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRlbXBTdHIyID0gc3RyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuQ2hhdFNlcnZlci5zZW5kQ2hhdFRleHRNc2codGVtcFN0cjIpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJJbnB1dE1zZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyQnJhY2tldChzdHI6c3RyaW5nKTpzdHJpbmd7XHJcbiAgICAgICAgY29uc3QgcmVnID0gbmV3IFJlZ0V4cCgvXFxbfF0vZyk7XHJcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKHJlZyxcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXRJbWFnZUh0dHBcclxuICAgIC8v5o6l5pS26KGo5oOF6Kej5p6QXHJcbiAgICBwdWJsaWMgcmVwbGFjZUxvY2FsSW1nKHN0cjpzdHJpbmcpOnN0cmluZ3tcclxuICAgICAgICBsZXQgdGVtcCA9IHN0cjtcclxuICAgICAgICBjb25zdCByZWcgPSBuZXcgUmVnRXhwKC9cXFsuKj9cXF0vZyk7XHJcbiAgICAgICAgbGV0IHJlcEFmdCA9IHRlbXAucmVwbGFjZShyZWcsXCImW1wiKTtcclxuICAgICAgICBsZXQgbWF0Y2hBcnIgPSBzdHIubWF0Y2gocmVnKTtcclxuICAgICAgICBpZihtYXRjaEFyciE9bnVsbCl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8bWF0Y2hBcnIubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsID0gY2MuanMuZm9ybWF0U3RyKHRoaXMuZW1valRleHQsbWF0Y2hBcnJbaV0pO1xyXG4gICAgICAgICAgICAgICAgcmVwQWZ0ID0gcmVwQWZ0LnJlcGxhY2UoXCImW1wiLHZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xlYXJCcmFja2V0KHJlcEFmdCk7XHJcbiAgICB9XHJcbiAgICBjbGVhcklucHV0TXNnKCl7XHJcbiAgICAgICAgdGhpcy5pbnB1dEJveC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMudGV4dENoYW5nZUNhbGxiYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IG51bGxcclxuICAgICAgICB0aGlzLmNlbnRlck5vZGUgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRMb2NhbEVtb2ooc2ZOYW1lOiBzdHJpbmcsIHNwcml0ZT86IGNjLlNwcml0ZSwgd2lkdGg/OiBudW1iZXIsIGhlaWdodD86IG51bWJlcikge1xyXG5cclxuICAgICAgICBpZiAoc2ZOYW1lID09IG51bGwgfHwgc2ZOYW1lID09IHVuZGVmaW5lZCB8fCBzZk5hbWUgPT0gXCJcIikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJzZk5hbWUgaXMgZW1wdHksIHJldHVybiEhIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc3ByaXRlRnJhbWUgPSBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmdldFNwcml0ZShcImhhbGwvdGV4dHVyZS9jaGF0L2Vtb2pcIiwgc2ZOYW1lKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoc3ByaXRlRnJhbWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLmib7kuI3liLDooajmg4Ugc2ZOYW1lID0gXCIgKyBzZk5hbWUgKyBcIiwgcmV0dXJuISEhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzcHJpdGUgIT0gbnVsbCAmJiBzcHJpdGUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHdpZHRoID0gKHdpZHRoICE9IG51bGwpID8gd2lkdGggOiBzcHJpdGUubm9kZS53aWR0aDtcclxuICAgICAgICAgICAgaGVpZ2h0ID0gKGhlaWdodCAhPSBudWxsKSA/IGhlaWdodCA6IHNwcml0ZS5ub2RlLmhlaWdodDtcclxuICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgICAgIHNwcml0ZS5ub2RlLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgIHNwcml0ZS5ub2RlLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNwcml0ZUZyYW1lO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGxvYWRTZXZlckhlYWRlcih1cmwsY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIC8v6I635Y+W5Zu+54mHXHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWQoe1xyXG4gICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgdHlwZTogXCJqcGdcIlxyXG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIsIHRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBmcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZyYW1lKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgcHVibGljIHVwZGF0ZVVJKHRpdGxlLGlzQ2xlYXI9dHJ1ZSl7XHJcbiAgICAgICAgaWYodGhpcy5jZW50ZXJOb2RlKXtcclxuICAgICAgICAgICAgdGhpcy50aXRsZS5zdHJpbmcgPSB0aXRsZTtcclxuICAgICAgICAgICAgdGhpcy5jZW50ZXJOb2RlLmRhdGEgPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuY2VudGVyTm9kZS5zZXZlckhlYWRGcmFtZSA9IHRoaXMuc2V2ZXJIZWFkRnJhbWU7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNPcGVuKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2VudGVyTm9kZS51cGRhdGVVSShpc0NsZWFyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPVtdO1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJ0aGlzLmNlbnRlck5vZGUg5Li656m6XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Q29weXBvc3Rpb24ocG9zdGlvbix0ZXh0KXtcclxuICAgICAgICBsZXQgbG9jYWxQb3MgPSB0aGlzLmNvcHlCdG4ucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHBvc3Rpb24pO1xyXG4gICAgICAgIHRoaXMuY29weUJ0bi5wb3NpdGlvbiA9IGxvY2FsUG9zXHJcbiAgICAgICAgdGhpcy5jb3B5QnRuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jb3B5VGV4dCA9IHRleHQ7XHJcbiAgICB9XHJcbiAgICAvL+eCueWHu+WkjeWItlxyXG4gICAgcHJpdmF0ZSBjb3B5TXNnVGV4dCgpe1xyXG4gICAgICAgIHRoaXMuY29weUJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNlbnRlck5vZGUuY29weUJ0bkFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5jb3B5VGV4dFRvQ2xpcGJvYXJkKHRoaXMuY29weVRleHQsIChyZXRTdHIpPT57XHJcbiAgICAgICAgICAgIGlmIChyZXRTdHIucmVzdWx0ID09IDApIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5aSN5Yi25oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuWkjeWItuWksei0pVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19