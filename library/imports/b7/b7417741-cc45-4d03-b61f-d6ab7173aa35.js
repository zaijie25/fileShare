"use strict";
cc._RF.push(module, 'b7417dBzEVNA7Yf1qtxc6o1', 'ChatCenterNode');
// hall/scripts/logic/hall/ui/recharge/ChatCenterNode.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var List_1 = require("../../../core/net/chat/List");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ChatCenterNode = /** @class */ (function (_super) {
    __extends(ChatCenterNode, _super);
    function ChatCenterNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //列表
        _this.chatList = null;
        _this.severHeadFrame = null;
        _this.data = new Array();
        // public selectMsgID = null;
        // holdTimeEclipse = 0;    //用来检测长按
        _this.copyBtnActive = false; //是否显示隐藏copy按钮
        return _this;
        // private setPressAction(btnNode){
        //     let btn = btnNode.getComponent(YXButton);
        //     if (btn == null) {
        //         btn = btnNode.addComponent(YXButton);
        //         btn.transition = cc.Button.Transition.NONE;
        //     }
        //     //触摸开始
        //     btnNode.on(cc.Node.EventType.TOUCH_START,function(event){
        //         this.holdClick = true;
        //         this.holdTimeEclipse = 0;
        //     },this);
        //     btnNode.on(cc.Node.EventType.TOUCH_END,function(event){
        //         this.holdClick=false;
        //         if(this.holdTimeEclipse>=30)
        //         {                
        //             if(btnNode && btnNode.data){
        //                 this.selectMsgID = btnNode.data
        //                 let copyNode = cc.find("copy",btnNode);
        //                 copyNode.active = true
        //                 this.chatList.updateAll()
        //             }            
        //         }
        //         this.holdTimeEclipse=0; 
        //     },this)
        // }
        //点击复制
        // private copyMsgText(target){
        //     if(target && target.node && target.node.data){
        //         // this.selectMsgID = null;
        //         this.chatList.updateAll()
        //         Global.NativeEvent.copyTextToClipboard(target.node.data, (retStr)=>{
        //             if (retStr.result == 0) {
        //                 Global.UI.fastTip("复制成功");
        //             }else {
        //                 Global.UI.fastTip("复制失败");
        //             }
        //         } );
        //     }
        // }
        // update (dt) {
        //     if(this.holdClick)
        //     {
        //         this.holdTimeEclipse++;
        //         if(this.holdTimeEclipse>120)//如果长按时间大于2s，则认为长按了2s
        //         {
        //             this.holdTimeEclipse=120;
        //         }
        //     }
        // }
    }
    ChatCenterNode.prototype.onLoad = function () {
        this.data = [];
        var msgListScroll = cc.find("scrollView", this.node);
        if (msgListScroll) {
            msgListScroll.on("scrolling", this.onScrollViewScroll, this);
        }
    };
    ChatCenterNode.prototype.onScrollViewScroll = function () {
        if (this.copyBtnActive) {
            this.copyBtnActive = false;
            Global.ChatServer.chatCls.copyBtn.active = false;
        }
    };
    ChatCenterNode.prototype.updateUI = function (isClear) {
        if (isClear) {
            Global.ChatServer.sendClearMsg(); //打开聊天界面上报已读
        }
        this.chatList.getComponent(cc.Widget).updateAlignment();
        this.chatList.content.getComponent(cc.Widget).updateAlignment();
        if (Global.ChatServer.severCheckTime != 0) {
            this.chatList.numItems = this.data.length;
            this.chatList.scrollTo(this.data.length - 1);
        }
        else {
            Logger.error("还未获取到消息状态，不刷新");
        }
    };
    ChatCenterNode.prototype.onListRender = function (item, idx) {
        var chat = this.data[idx];
        var msg = chat.content.text;
        var myMessageItem = item.getChildByName('myMessageItem');
        var serviceMessageItem = item.getChildByName('serviceMessageItem');
        var msgItem = null;
        if (chat.userid != Global.ChatServer.userid) {
            myMessageItem.active = false;
            msgItem = serviceMessageItem;
            msgItem.active = true;
            var headFrame = cc.find("chat/headFrame", msgItem).getComponent(cc.Sprite);
            if (Global.ChatServer.QuickData) {
                var sfName = Global.ChatServer.QuickData.head_url || '1';
                Global.ResourceManager.loadAutoAtlas(headFrame, "hall/texture/hall/rechargeCash/rechargeCash", sfName);
            }
            else {
                if (this.severHeadFrame) { //设置客服头像
                    headFrame.spriteFrame = this.severHeadFrame;
                }
            }
            var depositSprite = cc.find("chat/rechargePanel", msgItem).getComponent(cc.Sprite);
            depositSprite.node.active = false;
            var msgBg = cc.find("chat/msBg", msgItem);
            msgBg.active = false;
            if (chat.msgint1 == 1 && chat.content.text == "1000") {
                Global.ResourceManager.loadAutoAtlas(depositSprite, "hall/texture/hall/chat/chat", "03", null, false);
                var depositNode = Global.UIHelper.addCommonClick(msgItem, "chat/rechargePanel", this.showRechange, this, cc.Button.Transition.NONE);
                depositNode.data = { msg_id: chat.msgid, pay_type: chat.content.text };
                depositSprite.node.active = true;
                msgBg.active = false;
                msgItem.height = 140;
                item.height = msgItem.height;
                return;
            }
            else if (chat.msgint1 == 1 && chat.content.text == "1001") {
                Global.ResourceManager.loadAutoAtlas(depositSprite, "hall/texture/hall/chat/chat", "02", null, false);
                var depositNode = Global.UIHelper.addCommonClick(msgItem, "chat/rechargePanel", this.showRechange, this, cc.Button.Transition.NONE);
                depositNode.data = { msg_id: chat.msgid, pay_type: chat.content.text };
                depositSprite.node.active = true;
                msgBg.active = false;
                msgItem.height = 140;
                item.height = msgItem.height;
                return;
            }
            else if (chat.msgint1 == 1 && chat.content.text == "1002") {
                Global.ResourceManager.loadAutoAtlas(depositSprite, "hall/texture/hall/chat/chat", "01", null, false);
                var depositNode = Global.UIHelper.addCommonClick(msgItem, "chat/rechargePanel", this.showRechange, this, cc.Button.Transition.NONE);
                depositNode.data = { msg_id: chat.msgid, pay_type: chat.content.text };
                depositSprite.node.active = true;
                msgBg.active = false;
                msgItem.height = 140;
                item.height = msgItem.height;
                return;
            }
        }
        else {
            serviceMessageItem.active = false;
            msgItem = myMessageItem;
            msgItem.active = true;
            var headFrame = cc.find("chat/headFrame", msgItem).getComponent(cc.Sprite);
            var playerData = Global.PlayerData;
            if (headFrame.node && Global.Toolkit.getLocalHeadSf(playerData.headimg) != null) {
                headFrame.spriteFrame = Global.Toolkit.getLocalHeadSf(playerData.headimg);
            }
            // let statusLabel = cc.find("chat/msBg/statusLabel",msgItem).getComponent(cc.Label);
            // if(Global.ChatServer.severCheckTime > chat.msgid)
            // {
            //     statusLabel.string ="已读";
            // }else{
            //     statusLabel.string ="未读";
            // }
        }
        if (msgItem) {
            msgItem.active = true;
            var msgLabel = cc.find("chat/msBg/RichText", msgItem).getComponent(cc.RichText);
            msgLabel.maxWidth = 0;
            if (cc.sys.os == cc.sys.OS_IOS) {
                var msgStr = Global.ChatServer.chatCls.replaceLocalImg(msg);
                msgLabel.string = msgStr.replace(/(\r\n)/g, "\n");
            }
            else {
                msgLabel.string = Global.ChatServer.chatCls.replaceLocalImg(msg);
            }
            var pic_1 = cc.find("chat/msBg/photo", msgItem).getComponent(cc.Sprite);
            var msgBg = cc.find("chat/msBg", msgItem);
            msgBg.active = true;
            var dateArr = chat.content.url.split(".");
            var fileName = dateArr[dateArr.length - 1];
            var copyNode = cc.find("chat/msBg/copy", msgItem);
            // let copyNode =  Global.UIHelper.addCommonClick(msgItem, "chat/msBg/copy", this.copyMsgText, this, cc.Button.Transition.NONE);
            // copyNode.data = msg;
            // if(chat.msgid == this.selectMsgID){
            //     copyNode.active = true
            // }else{
            copyNode.active = false;
            // }
            if (chat.content.url && chat.content.width && chat.content.height && fileName != "mp4") {
                msgLabel.string = ""; //清空消息，防止复用
                pic_1.node.active = true;
                var thumburl = Global.ChatServer.getImageHttp(chat.content.thumburl);
                var url = Global.ChatServer.getImageHttp(chat.content.url);
                var imageWidth = chat.content.width * 2;
                var imageHeight = chat.content.height * 2;
                var data = { url: url, imageWidth: imageWidth, imageHeight: imageHeight, };
                if (imageHeight > 400) {
                    imageHeight = 400;
                    imageWidth = chat.content.width / (chat.content.height / 400);
                }
                else if (imageHeight < 50) {
                    imageHeight = 50;
                    imageWidth = chat.content.width / (chat.content.height / 50);
                }
                if (imageWidth > 300) {
                    imageWidth = 300;
                    imageHeight = chat.content.height / (chat.content.width / 300);
                }
                else if (imageWidth < 50) {
                    imageWidth = 300;
                    imageHeight = chat.content.height / (chat.content.width / 50);
                }
                var photo = Global.UIHelper.addCommonClick(msgItem, "chat/msBg/photo", this.checkBigImage, this, cc.Button.Transition.NONE);
                photo.data = data;
                // pic.spriteFrame = null;
                this.loadSeverHeader(thumburl, chat.content.thumburl, function (frame) {
                    pic_1.spriteFrame = frame;
                });
                pic_1.node.height = imageHeight;
                pic_1.node.width = imageWidth;
                msgBg.width = imageWidth + 30;
                msgBg.height = imageHeight + 20;
                msgItem.height = msgBg.height + 30;
                item.height = msgItem.height;
            }
            else {
                if (fileName == "mp4") {
                    msgLabel.string = "【视频发送成功】";
                }
                pic_1.node.active = false;
                if (msgLabel.node.getContentSize().width < 430) {
                    msgBg.width = msgLabel.node.getContentSize().width + 30; //设定当前对话框 背景宽度
                }
                else {
                    msgLabel.maxWidth = 430; //设定当前label 宽度
                    msgBg.width = 460;
                }
                msgBg.height = msgLabel.node.height + 20;
                msgBg.data = msg;
                Global.UIHelper.addCommonClick(msgItem, "chat/msBg", this.selectMsgg, this, cc.Button.Transition.NONE);
                msgItem.height = msgBg.height + 30;
                item.height = msgItem.height;
            }
        }
    };
    ChatCenterNode.prototype.loadSeverHeader = function (url, picID, callback) {
        if (CC_JSB) {
            Global.Toolkit.LoadPicToNative(Global.Toolkit.DealWithUrl(url), picID, function (texture) {
                var frame = new cc.SpriteFrame(texture);
                callback(frame);
            });
        }
        else {
            cc.loader.load(Global.Toolkit.DealWithUrl(url), function (err, texture) {
                if (err != null) {
                    return;
                }
                var frame = new cc.SpriteFrame(texture);
                callback(frame);
            });
        }
    };
    //查看大图
    ChatCenterNode.prototype.checkBigImage = function (target) {
        if (target && target.node && target.node.data) {
            Global.UI.show("WndChatImage", target.node.data);
        }
    };
    //充值方式
    ChatCenterNode.prototype.showRechange = function (target) {
        if (target && target.node && target.node.data) {
            Global.HallServer.send(NetAppface.mod, "GetAitePayInfo", target.node.data, function (param) {
                if (param.status == 1) {
                    param.pay_type = target.node.data.pay_type;
                    Global.UI.show("WndBankRechange", param);
                    // if(target.node.data.pay_type == "1000"){
                    //     Global.UI.show("WndAliPayRechange",param);
                    // }else if(target.node.data.pay_type == "1001"){
                    //     Global.UI.show("WndWeChatRechange",param);
                    // }else{
                    //     Global.UI.show("WndBankRechange",param);
                    // }
                }
                else {
                    Global.UI.fastTip("充值帐户信息拉取失败");
                }
            });
        }
    };
    //点击选择对应消息
    ChatCenterNode.prototype.selectMsgg = function (target) {
        if (target && target.node && target.node.data) {
            this.copyBtnActive = true;
            var copyNode = cc.find("copy", target.node);
            copyNode.setPosition(cc.v2(-(target.node.width / 2), copyNode.y));
            var starWorldPos = copyNode.parent.convertToWorldSpaceAR(copyNode.position);
            Global.Event.event(GlobalEvent.setCopypostion, starWorldPos, target.node.data);
        }
    };
    __decorate([
        property(List_1.default)
    ], ChatCenterNode.prototype, "chatList", void 0);
    ChatCenterNode = __decorate([
        ccclass
    ], ChatCenterNode);
    return ChatCenterNode;
}(cc.Component));
exports.default = ChatCenterNode;

cc._RF.pop();