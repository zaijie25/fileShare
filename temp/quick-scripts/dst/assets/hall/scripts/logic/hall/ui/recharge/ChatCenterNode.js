
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/recharge/ChatCenterNode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWNoYXJnZVxcQ2hhdENlbnRlck5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsb0RBQStDO0FBR3pDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBaVNDO1FBaFNHLElBQUk7UUFFSixjQUFRLEdBQVMsSUFBSSxDQUFDO1FBQ2Ysb0JBQWMsR0FBa0IsSUFBSSxDQUFDO1FBQ3JDLFVBQUksR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQzFCLDZCQUE2QjtRQUM3QixtQ0FBbUM7UUFDNUIsbUJBQWEsR0FBRyxLQUFLLENBQUMsQ0FBTyxjQUFjOztRQXVPbEQsbUNBQW1DO1FBQ25DLGdEQUFnRDtRQUNoRCx5QkFBeUI7UUFDekIsZ0RBQWdEO1FBQ2hELHNEQUFzRDtRQUN0RCxRQUFRO1FBQ1IsYUFBYTtRQUNiLGdFQUFnRTtRQUNoRSxpQ0FBaUM7UUFDakMsb0NBQW9DO1FBQ3BDLGVBQWU7UUFFZiw4REFBOEQ7UUFDOUQsZ0NBQWdDO1FBQ2hDLHVDQUF1QztRQUN2Qyw0QkFBNEI7UUFDNUIsMkNBQTJDO1FBQzNDLGtEQUFrRDtRQUNsRCwwREFBMEQ7UUFDMUQseUNBQXlDO1FBQ3pDLDRDQUE0QztRQUM1Qyw0QkFBNEI7UUFDNUIsWUFBWTtRQUNaLG1DQUFtQztRQUNuQyxjQUFjO1FBQ2QsSUFBSTtRQUNKLE1BQU07UUFDTiwrQkFBK0I7UUFDL0IscURBQXFEO1FBQ3JELHNDQUFzQztRQUN0QyxvQ0FBb0M7UUFDcEMsK0VBQStFO1FBQy9FLHdDQUF3QztRQUN4Qyw2Q0FBNkM7UUFDN0Msc0JBQXNCO1FBQ3RCLDZDQUE2QztRQUM3QyxnQkFBZ0I7UUFDaEIsZUFBZTtRQUNmLFFB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QyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVFLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUMsWUFBWSxFQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDL0U7SUFDTCxDQUFDO0lBM09EO1FBREMsUUFBUSxDQUFDLGNBQUksQ0FBQztvREFDTztJQUhMLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FpU2xDO0lBQUQscUJBQUM7Q0FqU0QsQUFpU0MsQ0FqUzJDLEVBQUUsQ0FBQyxTQUFTLEdBaVN2RDtrQkFqU29CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgWVhCdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvcmUvY29tcG9uZW50L1lYQnV0dG9uXCI7XHJcbmltcG9ydCBDaGF0U2VydmVyIGZyb20gXCIuLi8uLi8uLi9jb3JlL25ldC9jaGF0L0NoYXRTZXJ2ZXJcIjtcclxuaW1wb3J0IExpc3QgZnJvbSBcIi4uLy4uLy4uL2NvcmUvbmV0L2NoYXQvTGlzdFwiO1xyXG5pbXBvcnQgeyBpdGFsayB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL25ldC90Y3AvaXRhbGttc2dfcGJcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGF0Q2VudGVyTm9kZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICAvL+WIl+ihqFxyXG4gICAgQHByb3BlcnR5KExpc3QpXHJcbiAgICBjaGF0TGlzdDogTGlzdCA9IG51bGw7XHJcbiAgICBwdWJsaWMgc2V2ZXJIZWFkRnJhbWU6Y2MuU3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgcHVibGljIGRhdGEgPSBuZXcgQXJyYXkoKTtcclxuICAgIC8vIHB1YmxpYyBzZWxlY3RNc2dJRCA9IG51bGw7XHJcbiAgICAvLyBob2xkVGltZUVjbGlwc2UgPSAwOyAgICAvL+eUqOadpeajgOa1i+mVv+aMiVxyXG4gICAgcHVibGljIGNvcHlCdG5BY3RpdmUgPSBmYWxzZTsgICAgICAgLy/mmK/lkKbmmL7npLrpmpDol49jb3B55oyJ6ZKuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gW107XHJcbiAgICAgICAgbGV0IG1zZ0xpc3RTY3JvbGwgPSAgY2MuZmluZChcInNjcm9sbFZpZXdcIix0aGlzLm5vZGUpXHJcbiAgICAgICAgaWYobXNnTGlzdFNjcm9sbCl7XHJcbiAgICAgICAgICAgIG1zZ0xpc3RTY3JvbGwub24oXCJzY3JvbGxpbmdcIiwgdGhpcy5vblNjcm9sbFZpZXdTY3JvbGwsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uU2Nyb2xsVmlld1Njcm9sbCgpe1xyXG4gICAgICAgIGlmKHRoaXMuY29weUJ0bkFjdGl2ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuY29weUJ0bkFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBHbG9iYWwuQ2hhdFNlcnZlci5jaGF0Q2xzLmNvcHlCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHVwZGF0ZVVJKGlzQ2xlYXIpe1xyXG4gICAgICAgIGlmKGlzQ2xlYXIpe1xyXG4gICAgICAgICAgICBHbG9iYWwuQ2hhdFNlcnZlci5zZW5kQ2xlYXJNc2coKTsvL+aJk+W8gOiBiuWkqeeVjOmdouS4iuaKpeW3suivu1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoYXRMaXN0LmdldENvbXBvbmVudChjYy5XaWRnZXQpLnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgIHRoaXMuY2hhdExpc3QuY29udGVudC5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICBpZihHbG9iYWwuQ2hhdFNlcnZlci5zZXZlckNoZWNrVGltZSAhPSAwKXtcclxuICAgICAgICAgICAgdGhpcy5jaGF0TGlzdC5udW1JdGVtcyA9IHRoaXMuZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhdExpc3Quc2Nyb2xsVG8odGhpcy5kYXRhLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLov5jmnKrojrflj5bliLDmtojmga/nirbmgIHvvIzkuI3liLfmlrBcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTGlzdFJlbmRlcihpdGVtOiBhbnksIGlkeDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGNoYXQ6aXRhbGsucGIuSXRhbGtDaGF0TXNnID10aGlzLmRhdGFbaWR4XTtcclxuICAgICAgICBsZXQgbXNnID0gY2hhdC5jb250ZW50LnRleHQ7XHJcbiAgICAgICAgbGV0IG15TWVzc2FnZUl0ZW06IGFueSA9IGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ215TWVzc2FnZUl0ZW0nKTtcclxuICAgICAgICBsZXQgc2VydmljZU1lc3NhZ2VJdGVtOiBhbnkgPSBpdGVtLmdldENoaWxkQnlOYW1lKCdzZXJ2aWNlTWVzc2FnZUl0ZW0nKTtcclxuICAgICAgICBsZXQgbXNnSXRlbTpjYy5Ob2RlID0gbnVsbDtcclxuICAgICAgICBpZihjaGF0LnVzZXJpZCAhPSBHbG9iYWwuQ2hhdFNlcnZlci51c2VyaWQpe1xyXG4gICAgICAgICAgICBteU1lc3NhZ2VJdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBtc2dJdGVtID0gc2VydmljZU1lc3NhZ2VJdGVtXHJcbiAgICAgICAgICAgIG1zZ0l0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGhlYWRGcmFtZSA9IGNjLmZpbmQoXCJjaGF0L2hlYWRGcmFtZVwiLG1zZ0l0ZW0pLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICBpZihHbG9iYWwuQ2hhdFNlcnZlci5RdWlja0RhdGEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBzZk5hbWUgPSBHbG9iYWwuQ2hhdFNlcnZlci5RdWlja0RhdGEuaGVhZF91cmwgfHwgJzEnO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKGhlYWRGcmFtZSwgXCJoYWxsL3RleHR1cmUvaGFsbC9yZWNoYXJnZUNhc2gvcmVjaGFyZ2VDYXNoXCIsIHNmTmFtZSlcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNldmVySGVhZEZyYW1lKXsgLy/orr7nva7lrqLmnI3lpLTlg49cclxuICAgICAgICAgICAgICAgICAgICBoZWFkRnJhbWUuc3ByaXRlRnJhbWUgPSB0aGlzLnNldmVySGVhZEZyYW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBkZXBvc2l0U3ByaXRlID0gY2MuZmluZChcImNoYXQvcmVjaGFyZ2VQYW5lbFwiLG1zZ0l0ZW0pLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICBkZXBvc2l0U3ByaXRlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBtc2dCZyA9IGNjLmZpbmQoXCJjaGF0L21zQmdcIixtc2dJdGVtKTtcclxuICAgICAgICAgICAgbXNnQmcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmKGNoYXQubXNnaW50MSA9PSAxICYmIGNoYXQuY29udGVudC50ZXh0ID09IFwiMTAwMFwiKXtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyhkZXBvc2l0U3ByaXRlLFwiaGFsbC90ZXh0dXJlL2hhbGwvY2hhdC9jaGF0XCIsIFwiMDNcIiwgbnVsbCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRlcG9zaXROb2RlID0gR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKG1zZ0l0ZW0sIFwiY2hhdC9yZWNoYXJnZVBhbmVsXCIsIHRoaXMuc2hvd1JlY2hhbmdlLCB0aGlzLCBjYy5CdXR0b24uVHJhbnNpdGlvbi5OT05FKTtcclxuICAgICAgICAgICAgICAgIGRlcG9zaXROb2RlLmRhdGEgPSB7bXNnX2lkOmNoYXQubXNnaWQscGF5X3R5cGU6Y2hhdC5jb250ZW50LnRleHR9O1xyXG4gICAgICAgICAgICAgICAgZGVwb3NpdFNwcml0ZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBtc2dCZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIG1zZ0l0ZW0uaGVpZ2h0ID0gMTQwO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5oZWlnaHQgPSBtc2dJdGVtLmhlaWdodDtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfWVsc2UgaWYoY2hhdC5tc2dpbnQxID09IDEgJiYgY2hhdC5jb250ZW50LnRleHQgPT0gXCIxMDAxXCIpe1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKGRlcG9zaXRTcHJpdGUsXCJoYWxsL3RleHR1cmUvaGFsbC9jaGF0L2NoYXRcIiwgXCIwMlwiLCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVwb3NpdE5vZGUgPSBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sobXNnSXRlbSwgXCJjaGF0L3JlY2hhcmdlUGFuZWxcIiwgdGhpcy5zaG93UmVjaGFuZ2UsIHRoaXMsIGNjLkJ1dHRvbi5UcmFuc2l0aW9uLk5PTkUpO1xyXG4gICAgICAgICAgICAgICAgZGVwb3NpdE5vZGUuZGF0YSA9IHttc2dfaWQ6Y2hhdC5tc2dpZCxwYXlfdHlwZTpjaGF0LmNvbnRlbnQudGV4dH07XHJcbiAgICAgICAgICAgICAgICBkZXBvc2l0U3ByaXRlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG1zZ0JnLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbXNnSXRlbS5oZWlnaHQgPSAxNDA7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmhlaWdodCA9IG1zZ0l0ZW0uaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihjaGF0Lm1zZ2ludDEgPT0gMSAmJiBjaGF0LmNvbnRlbnQudGV4dCA9PSBcIjEwMDJcIil7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRBdXRvQXRsYXMoZGVwb3NpdFNwcml0ZSxcImhhbGwvdGV4dHVyZS9oYWxsL2NoYXQvY2hhdFwiLCBcIjAxXCIsIG51bGwsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGxldCBkZXBvc2l0Tm9kZSA9IEdsb2JhbC5VSUhlbHBlci5hZGRDb21tb25DbGljayhtc2dJdGVtLCBcImNoYXQvcmVjaGFyZ2VQYW5lbFwiLCB0aGlzLnNob3dSZWNoYW5nZSwgdGhpcywgY2MuQnV0dG9uLlRyYW5zaXRpb24uTk9ORSk7XHJcbiAgICAgICAgICAgICAgICBkZXBvc2l0Tm9kZS5kYXRhID0ge21zZ19pZDpjaGF0Lm1zZ2lkLHBheV90eXBlOmNoYXQuY29udGVudC50ZXh0fTtcclxuICAgICAgICAgICAgICAgIGRlcG9zaXRTcHJpdGUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbXNnQmcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBtc2dJdGVtLmhlaWdodCA9IDE0MDtcclxuICAgICAgICAgICAgICAgIGl0ZW0uaGVpZ2h0ID0gbXNnSXRlbS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgc2VydmljZU1lc3NhZ2VJdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBtc2dJdGVtID0gbXlNZXNzYWdlSXRlbTtcclxuICAgICAgICAgICAgbXNnSXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgaGVhZEZyYW1lID0gY2MuZmluZChcImNoYXQvaGVhZEZyYW1lXCIsbXNnSXRlbSkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIGxldCBwbGF5ZXJEYXRhID0gR2xvYmFsLlBsYXllckRhdGE7XHJcbiAgICAgICAgICAgIGlmIChoZWFkRnJhbWUubm9kZSAmJiBHbG9iYWwuVG9vbGtpdC5nZXRMb2NhbEhlYWRTZihwbGF5ZXJEYXRhLmhlYWRpbWcpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGhlYWRGcmFtZS5zcHJpdGVGcmFtZSA9IEdsb2JhbC5Ub29sa2l0LmdldExvY2FsSGVhZFNmKHBsYXllckRhdGEuaGVhZGltZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gbGV0IHN0YXR1c0xhYmVsID0gY2MuZmluZChcImNoYXQvbXNCZy9zdGF0dXNMYWJlbFwiLG1zZ0l0ZW0pLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIC8vIGlmKEdsb2JhbC5DaGF0U2VydmVyLnNldmVyQ2hlY2tUaW1lID4gY2hhdC5tc2dpZClcclxuICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAvLyAgICAgc3RhdHVzTGFiZWwuc3RyaW5nID1cIuW3suivu1wiO1xyXG4gICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gICAgIHN0YXR1c0xhYmVsLnN0cmluZyA9XCLmnKror7tcIjtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihtc2dJdGVtKXtcclxuICAgICAgICAgICAgbXNnSXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgbXNnTGFiZWw6Y2MuUmljaFRleHQgPSBjYy5maW5kKFwiY2hhdC9tc0JnL1JpY2hUZXh0XCIsbXNnSXRlbSkuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KTtcclxuICAgICAgICAgICAgbXNnTGFiZWwubWF4V2lkdGggPSAwO1xyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtc2dTdHIgPSBHbG9iYWwuQ2hhdFNlcnZlci5jaGF0Q2xzLnJlcGxhY2VMb2NhbEltZyhtc2cpXHJcbiAgICAgICAgICAgICAgICBtc2dMYWJlbC5zdHJpbmcgPW1zZ1N0ci5yZXBsYWNlKC8oXFxyXFxuKS9nLFwiXFxuXCIpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIG1zZ0xhYmVsLnN0cmluZyA9IEdsb2JhbC5DaGF0U2VydmVyLmNoYXRDbHMucmVwbGFjZUxvY2FsSW1nKG1zZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHBpYyA9IGNjLmZpbmQoXCJjaGF0L21zQmcvcGhvdG9cIixtc2dJdGVtKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTsgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbXNnQmcgPSBjYy5maW5kKFwiY2hhdC9tc0JnXCIsbXNnSXRlbSk7XHJcbiAgICAgICAgICAgIG1zZ0JnLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBkYXRlQXJyID0gIGNoYXQuY29udGVudC51cmwuc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgICAgICBsZXQgZmlsZU5hbWUgPSAgZGF0ZUFycltkYXRlQXJyLmxlbmd0aC0xXTtcclxuICAgICAgICAgICAgbGV0IGNvcHlOb2RlID0gY2MuZmluZChcImNoYXQvbXNCZy9jb3B5XCIsbXNnSXRlbSk7XHJcbiAgICAgICAgICAgIC8vIGxldCBjb3B5Tm9kZSA9ICBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sobXNnSXRlbSwgXCJjaGF0L21zQmcvY29weVwiLCB0aGlzLmNvcHlNc2dUZXh0LCB0aGlzLCBjYy5CdXR0b24uVHJhbnNpdGlvbi5OT05FKTtcclxuICAgICAgICAgICAgLy8gY29weU5vZGUuZGF0YSA9IG1zZztcclxuICAgICAgICAgICAgLy8gaWYoY2hhdC5tc2dpZCA9PSB0aGlzLnNlbGVjdE1zZ0lEKXtcclxuICAgICAgICAgICAgLy8gICAgIGNvcHlOb2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb3B5Tm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIGlmKGNoYXQuY29udGVudC51cmwgJiYgY2hhdC5jb250ZW50LndpZHRoICYmIGNoYXQuY29udGVudC5oZWlnaHQgJiYgZmlsZU5hbWUgIT0gXCJtcDRcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbXNnTGFiZWwuc3RyaW5nID0gXCJcIjsvL+a4heepuua2iOaBr++8jOmYsuatouWkjeeUqFxyXG4gICAgICAgICAgICAgICAgcGljLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCB0aHVtYnVybCA9ICBHbG9iYWwuQ2hhdFNlcnZlci5nZXRJbWFnZUh0dHAoY2hhdC5jb250ZW50LnRodW1idXJsKTtcclxuICAgICAgICAgICAgICAgIGxldCB1cmwgPSAgR2xvYmFsLkNoYXRTZXJ2ZXIuZ2V0SW1hZ2VIdHRwKGNoYXQuY29udGVudC51cmwpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGltYWdlV2lkdGggPSBjaGF0LmNvbnRlbnQud2lkdGgqMjtcclxuICAgICAgICAgICAgICAgIGxldCBpbWFnZUhlaWdodCA9IGNoYXQuY29udGVudC5oZWlnaHQqMjtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0ge3VybDp1cmwsaW1hZ2VXaWR0aDppbWFnZVdpZHRoLGltYWdlSGVpZ2h0OmltYWdlSGVpZ2h0LH07XHJcbiAgICAgICAgICAgICAgICBpZiAoaW1hZ2VIZWlnaHQgPiA0MDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlSGVpZ2h0ID0gNDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlV2lkdGggPSBjaGF0LmNvbnRlbnQud2lkdGgvKGNoYXQuY29udGVudC5oZWlnaHQvNDAwKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGltYWdlSGVpZ2h0IDwgNTApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VIZWlnaHQgPSA1MDtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZVdpZHRoID0gY2hhdC5jb250ZW50LndpZHRoLyhjaGF0LmNvbnRlbnQuaGVpZ2h0LzUwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGltYWdlV2lkdGggPiAzMDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlV2lkdGggPSAzMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VIZWlnaHQgPSBjaGF0LmNvbnRlbnQuaGVpZ2h0LyhjaGF0LmNvbnRlbnQud2lkdGgvMzAwKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGltYWdlV2lkdGggPCA1MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZVdpZHRoID0gMzAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlSGVpZ2h0ID0gY2hhdC5jb250ZW50LmhlaWdodC8oY2hhdC5jb250ZW50LndpZHRoLzUwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBwaG90byA9ICBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sobXNnSXRlbSwgXCJjaGF0L21zQmcvcGhvdG9cIiwgdGhpcy5jaGVja0JpZ0ltYWdlLCB0aGlzLCBjYy5CdXR0b24uVHJhbnNpdGlvbi5OT05FKTtcclxuICAgICAgICAgICAgICAgIHBob3RvLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgLy8gcGljLnNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZFNldmVySGVhZGVyKHRodW1idXJsLGNoYXQuY29udGVudC50aHVtYnVybCwoZnJhbWUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgcGljLnNwcml0ZUZyYW1lID0gZnJhbWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHBpYy5ub2RlLmhlaWdodCA9IGltYWdlSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgcGljLm5vZGUud2lkdGggPSBpbWFnZVdpZHRoO1xyXG4gICAgICAgICAgICAgICAgbXNnQmcud2lkdGggPSBpbWFnZVdpZHRoKzMwOyBcclxuICAgICAgICAgICAgICAgIG1zZ0JnLmhlaWdodCA9IGltYWdlSGVpZ2h0KyAyMDtcclxuICAgICAgICAgICAgICAgIG1zZ0l0ZW0uaGVpZ2h0ID0gbXNnQmcuaGVpZ2h0KzMwO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5oZWlnaHQgPSBtc2dJdGVtLmhlaWdodDtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihmaWxlTmFtZSA9PSBcIm1wNFwiKXtcclxuICAgICAgICAgICAgICAgICAgICBtc2dMYWJlbC5zdHJpbmcgPSBcIuOAkOinhumikeWPkemAgeaIkOWKn+OAkVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcGljLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZihtc2dMYWJlbC5ub2RlLmdldENvbnRlbnRTaXplKCkud2lkdGggPCA0MzApe1xyXG4gICAgICAgICAgICAgICAgICAgIG1zZ0JnLndpZHRoID0gbXNnTGFiZWwubm9kZS5nZXRDb250ZW50U2l6ZSgpLndpZHRoKzMwOyAgIC8v6K6+5a6a5b2T5YmN5a+56K+d5qGGIOiDjOaZr+WuveW6plxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbXNnTGFiZWwubWF4V2lkdGggPSA0MzA7IC8v6K6+5a6a5b2T5YmNbGFiZWwg5a695bqmXHJcbiAgICAgICAgICAgICAgICAgICAgbXNnQmcud2lkdGggPSA0NjA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtc2dCZy5oZWlnaHQgPSBtc2dMYWJlbC5ub2RlLmhlaWdodCsyMDtcclxuICAgICAgICAgICAgICAgIG1zZ0JnLmRhdGEgPSBtc2c7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sobXNnSXRlbSwgXCJjaGF0L21zQmdcIiwgdGhpcy5zZWxlY3RNc2dnLCB0aGlzLCBjYy5CdXR0b24uVHJhbnNpdGlvbi5OT05FKTtcclxuICAgICAgICAgICAgICAgIG1zZ0l0ZW0uaGVpZ2h0ID0gbXNnQmcuaGVpZ2h0KzMwO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5oZWlnaHQgPSBtc2dJdGVtLmhlaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbG9hZFNldmVySGVhZGVyKHVybCxwaWNJRCxjYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgaWYgKENDX0pTQikge1xyXG4gICAgICAgICAgICBHbG9iYWwuVG9vbGtpdC5Mb2FkUGljVG9OYXRpdmUoR2xvYmFsLlRvb2xraXQuRGVhbFdpdGhVcmwodXJsKSwgcGljSUQsICh0ZXh0dXJlOmNjLlRleHR1cmUyRCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZnJhbWUpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZChHbG9iYWwuVG9vbGtpdC5EZWFsV2l0aFVybCh1cmwpLCBmdW5jdGlvbiAoZXJyLCB0ZXh0dXJlIDpjYy5UZXh0dXJlMkQpIHtcclxuICAgICAgICAgICAgICAgIGlmKGVyciE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgZnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhmcmFtZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+afpeeci+Wkp+WbvlxyXG4gICAgcHJpdmF0ZSBjaGVja0JpZ0ltYWdlKHRhcmdldCl7XHJcbiAgICAgICAgaWYodGFyZ2V0ICYmIHRhcmdldC5ub2RlICYmIHRhcmdldC5ub2RlLmRhdGEpe1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZENoYXRJbWFnZVwiLHRhcmdldC5ub2RlLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5YWF5YC85pa55byPXHJcbiAgICBwcml2YXRlIHNob3dSZWNoYW5nZSh0YXJnZXQpe1xyXG4gICAgICAgIGlmKHRhcmdldCAmJiB0YXJnZXQubm9kZSAmJiB0YXJnZXQubm9kZS5kYXRhKXtcclxuICAgICAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCxcIkdldEFpdGVQYXlJbmZvXCIsdGFyZ2V0Lm5vZGUuZGF0YSwocGFyYW0pPT57XHJcbiAgICAgICAgICAgICAgICBpZihwYXJhbS5zdGF0dXMgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0ucGF5X3R5cGUgPSB0YXJnZXQubm9kZS5kYXRhLnBheV90eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kQmFua1JlY2hhbmdlXCIscGFyYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmKHRhcmdldC5ub2RlLmRhdGEucGF5X3R5cGUgPT0gXCIxMDAwXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZEFsaVBheVJlY2hhbmdlXCIscGFyYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1lbHNlIGlmKHRhcmdldC5ub2RlLmRhdGEucGF5X3R5cGUgPT0gXCIxMDAxXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZFdlQ2hhdFJlY2hhbmdlXCIscGFyYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZEJhbmtSZWNoYW5nZVwiLHBhcmFtKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuWFheWAvOW4kOaIt+S/oeaBr+aLieWPluWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+eCueWHu+mAieaLqeWvueW6lOa2iOaBr1xyXG4gICAgcHJpdmF0ZSBzZWxlY3RNc2dnKHRhcmdldCl7XHJcbiAgICAgICAgaWYodGFyZ2V0ICYmIHRhcmdldC5ub2RlICYmIHRhcmdldC5ub2RlLmRhdGEpe1xyXG4gICAgICAgICAgICB0aGlzLmNvcHlCdG5BY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIGxldCBjb3B5Tm9kZSA9IGNjLmZpbmQoXCJjb3B5XCIsdGFyZ2V0Lm5vZGUpO1xyXG4gICAgICAgICAgICBjb3B5Tm9kZS5zZXRQb3NpdGlvbihjYy52MigtKHRhcmdldC5ub2RlLndpZHRoLzIpLCBjb3B5Tm9kZS55KSk7XHJcbiAgICAgICAgICAgIGxldCBzdGFyV29ybGRQb3MgPSBjb3B5Tm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGNvcHlOb2RlLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LnNldENvcHlwb3N0aW9uLHN0YXJXb3JsZFBvcyx0YXJnZXQubm9kZS5kYXRhKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIHByaXZhdGUgc2V0UHJlc3NBY3Rpb24oYnRuTm9kZSl7XHJcbiAgICAvLyAgICAgbGV0IGJ0biA9IGJ0bk5vZGUuZ2V0Q29tcG9uZW50KFlYQnV0dG9uKTtcclxuICAgIC8vICAgICBpZiAoYnRuID09IG51bGwpIHtcclxuICAgIC8vICAgICAgICAgYnRuID0gYnRuTm9kZS5hZGRDb21wb25lbnQoWVhCdXR0b24pO1xyXG4gICAgLy8gICAgICAgICBidG4udHJhbnNpdGlvbiA9IGNjLkJ1dHRvbi5UcmFuc2l0aW9uLk5PTkU7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIC8v6Kem5pG45byA5aeLXHJcbiAgICAvLyAgICAgYnRuTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCxmdW5jdGlvbihldmVudCl7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuaG9sZENsaWNrID0gdHJ1ZTtcclxuICAgIC8vICAgICAgICAgdGhpcy5ob2xkVGltZUVjbGlwc2UgPSAwO1xyXG4gICAgLy8gICAgIH0sdGhpcyk7XHJcblxyXG4gICAgLy8gICAgIGJ0bk5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIC8vICAgICAgICAgdGhpcy5ob2xkQ2xpY2s9ZmFsc2U7XHJcbiAgICAvLyAgICAgICAgIGlmKHRoaXMuaG9sZFRpbWVFY2xpcHNlPj0zMClcclxuICAgIC8vICAgICAgICAgeyAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICAgIGlmKGJ0bk5vZGUgJiYgYnRuTm9kZS5kYXRhKXtcclxuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdE1zZ0lEID0gYnRuTm9kZS5kYXRhXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGNvcHlOb2RlID0gY2MuZmluZChcImNvcHlcIixidG5Ob2RlKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBjb3B5Tm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5jaGF0TGlzdC51cGRhdGVBbGwoKVxyXG4gICAgLy8gICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIHRoaXMuaG9sZFRpbWVFY2xpcHNlPTA7IFxyXG4gICAgLy8gICAgIH0sdGhpcylcclxuICAgIC8vIH1cclxuICAgIC8v54K55Ye75aSN5Yi2XHJcbiAgICAvLyBwcml2YXRlIGNvcHlNc2dUZXh0KHRhcmdldCl7XHJcbiAgICAvLyAgICAgaWYodGFyZ2V0ICYmIHRhcmdldC5ub2RlICYmIHRhcmdldC5ub2RlLmRhdGEpe1xyXG4gICAgLy8gICAgICAgICAvLyB0aGlzLnNlbGVjdE1zZ0lEID0gbnVsbDtcclxuICAgIC8vICAgICAgICAgdGhpcy5jaGF0TGlzdC51cGRhdGVBbGwoKVxyXG4gICAgLy8gICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuY29weVRleHRUb0NsaXBib2FyZCh0YXJnZXQubm9kZS5kYXRhLCAocmV0U3RyKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgaWYgKHJldFN0ci5yZXN1bHQgPT0gMCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5aSN5Yi25oiQ5YqfXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5aSN5Yi25aSx6LSlXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9ICk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG4gICAgLy8gdXBkYXRlIChkdCkge1xyXG4gICAgLy8gICAgIGlmKHRoaXMuaG9sZENsaWNrKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5ob2xkVGltZUVjbGlwc2UrKztcclxuICAgIC8vICAgICAgICAgaWYodGhpcy5ob2xkVGltZUVjbGlwc2U+MTIwKS8v5aaC5p6c6ZW/5oyJ5pe26Ze05aSn5LqOMnPvvIzliJnorqTkuLrplb/mjInkuoYyc1xyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmhvbGRUaW1lRWNsaXBzZT0xMjA7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbn1cclxuIl19