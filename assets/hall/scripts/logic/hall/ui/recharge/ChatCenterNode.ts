import YXButton from "../../../core/component/YXButton";
import ChatServer from "../../../core/net/chat/ChatServer";
import List from "../../../core/net/chat/List";
import { italk } from "../../../core/net/tcp/italkmsg_pb";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChatCenterNode extends cc.Component {
    //列表
    @property(List)
    chatList: List = null;
    public severHeadFrame:cc.SpriteFrame = null;
    public data = new Array();
    // public selectMsgID = null;
    // holdTimeEclipse = 0;    //用来检测长按
    public copyBtnActive = false;       //是否显示隐藏copy按钮
    onLoad() {
        this.data = [];
        let msgListScroll =  cc.find("scrollView",this.node)
        if(msgListScroll){
            msgListScroll.on("scrolling", this.onScrollViewScroll, this);
        }
    }
    onScrollViewScroll(){
        if(this.copyBtnActive){
            this.copyBtnActive = false;
            Global.ChatServer.chatCls.copyBtn.active = false;
        }
    }
    public updateUI(isClear){
        if(isClear){
            Global.ChatServer.sendClearMsg();//打开聊天界面上报已读
        }
        this.chatList.getComponent(cc.Widget).updateAlignment();
        this.chatList.content.getComponent(cc.Widget).updateAlignment();
        if(Global.ChatServer.severCheckTime != 0){
            this.chatList.numItems = this.data.length;
            this.chatList.scrollTo(this.data.length - 1);
        }else{
            Logger.error("还未获取到消息状态，不刷新");
        }
    }

    onListRender(item: any, idx: number) {
        let chat:italk.pb.ItalkChatMsg =this.data[idx];
        let msg = chat.content.text;
        let myMessageItem: any = item.getChildByName('myMessageItem');
        let serviceMessageItem: any = item.getChildByName('serviceMessageItem');
        let msgItem:cc.Node = null;
        if(chat.userid != Global.ChatServer.userid){
            myMessageItem.active = false;
            msgItem = serviceMessageItem
            msgItem.active = true;
            let headFrame = cc.find("chat/headFrame",msgItem).getComponent(cc.Sprite);
            if(Global.ChatServer.QuickData)
            {
                let sfName = Global.ChatServer.QuickData.head_url || '1';
                Global.ResourceManager.loadAutoAtlas(headFrame, "hall/texture/hall/rechargeCash/rechargeCash", sfName)
            }else{
                if(this.severHeadFrame){ //设置客服头像
                    headFrame.spriteFrame = this.severHeadFrame;
                }
            }
            let depositSprite = cc.find("chat/rechargePanel",msgItem).getComponent(cc.Sprite);
            depositSprite.node.active = false;
            let msgBg = cc.find("chat/msBg",msgItem);
            msgBg.active = false;
            if(chat.msgint1 == 1 && chat.content.text == "1000"){
                Global.ResourceManager.loadAutoAtlas(depositSprite,"hall/texture/hall/chat/chat", "03", null, false);
                let depositNode = Global.UIHelper.addCommonClick(msgItem, "chat/rechargePanel", this.showRechange, this, cc.Button.Transition.NONE);
                depositNode.data = {msg_id:chat.msgid,pay_type:chat.content.text};
                depositSprite.node.active = true;
                msgBg.active = false;
                msgItem.height = 140;
                item.height = msgItem.height;
                return;
            }else if(chat.msgint1 == 1 && chat.content.text == "1001"){
                Global.ResourceManager.loadAutoAtlas(depositSprite,"hall/texture/hall/chat/chat", "02", null, false);
                let depositNode = Global.UIHelper.addCommonClick(msgItem, "chat/rechargePanel", this.showRechange, this, cc.Button.Transition.NONE);
                depositNode.data = {msg_id:chat.msgid,pay_type:chat.content.text};
                depositSprite.node.active = true;
                msgBg.active = false;
                msgItem.height = 140;
                item.height = msgItem.height;
                return;
            }else if(chat.msgint1 == 1 && chat.content.text == "1002"){
                Global.ResourceManager.loadAutoAtlas(depositSprite,"hall/texture/hall/chat/chat", "01", null, false);
                let depositNode = Global.UIHelper.addCommonClick(msgItem, "chat/rechargePanel", this.showRechange, this, cc.Button.Transition.NONE);
                depositNode.data = {msg_id:chat.msgid,pay_type:chat.content.text};
                depositSprite.node.active = true;
                msgBg.active = false;
                msgItem.height = 140;
                item.height = msgItem.height;
                return;
            }
        }else{
            serviceMessageItem.active = false;
            msgItem = myMessageItem;
            msgItem.active = true;
            let headFrame = cc.find("chat/headFrame",msgItem).getComponent(cc.Sprite);
            let playerData = Global.PlayerData;
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
        if(msgItem){
            msgItem.active = true;
            let msgLabel:cc.RichText = cc.find("chat/msBg/RichText",msgItem).getComponent(cc.RichText);
            msgLabel.maxWidth = 0;
            if (cc.sys.os == cc.sys.OS_IOS) {
                let msgStr = Global.ChatServer.chatCls.replaceLocalImg(msg)
                msgLabel.string =msgStr.replace(/(\r\n)/g,"\n");
            }else{
                msgLabel.string = Global.ChatServer.chatCls.replaceLocalImg(msg);
            }
            let pic = cc.find("chat/msBg/photo",msgItem).getComponent(cc.Sprite);        
            let msgBg = cc.find("chat/msBg",msgItem);
            msgBg.active = true;
            let dateArr =  chat.content.url.split(".");
            let fileName =  dateArr[dateArr.length-1];
            let copyNode = cc.find("chat/msBg/copy",msgItem);
            // let copyNode =  Global.UIHelper.addCommonClick(msgItem, "chat/msBg/copy", this.copyMsgText, this, cc.Button.Transition.NONE);
            // copyNode.data = msg;
            // if(chat.msgid == this.selectMsgID){
            //     copyNode.active = true
            // }else{
                copyNode.active = false
            // }
            if(chat.content.url && chat.content.width && chat.content.height && fileName != "mp4")
            {
                msgLabel.string = "";//清空消息，防止复用
                pic.node.active = true;
                let thumburl =  Global.ChatServer.getImageHttp(chat.content.thumburl);
                let url =  Global.ChatServer.getImageHttp(chat.content.url);
                let imageWidth = chat.content.width*2;
                let imageHeight = chat.content.height*2;
                let data = {url:url,imageWidth:imageWidth,imageHeight:imageHeight,};
                if (imageHeight > 400){
                    imageHeight = 400;
                    imageWidth = chat.content.width/(chat.content.height/400);
                }else if(imageHeight < 50)
                {
                    imageHeight = 50;
                    imageWidth = chat.content.width/(chat.content.height/50);
                }
                if(imageWidth > 300){
                    imageWidth = 300;
                    imageHeight = chat.content.height/(chat.content.width/300);
                }else if(imageWidth < 50)
                {
                    imageWidth = 300;
                    imageHeight = chat.content.height/(chat.content.width/50);
                }
                let photo =  Global.UIHelper.addCommonClick(msgItem, "chat/msBg/photo", this.checkBigImage, this, cc.Button.Transition.NONE);
                photo.data = data;
                // pic.spriteFrame = null;
                this.loadSeverHeader(thumburl,chat.content.thumburl,(frame)=>{
                    pic.spriteFrame = frame;
                });
                pic.node.height = imageHeight;
                pic.node.width = imageWidth;
                msgBg.width = imageWidth+30; 
                msgBg.height = imageHeight+ 20;
                msgItem.height = msgBg.height+30;
                item.height = msgItem.height;
            }else{
                if(fileName == "mp4"){
                    msgLabel.string = "【视频发送成功】";
                }
                pic.node.active = false;
                if(msgLabel.node.getContentSize().width < 430){
                    msgBg.width = msgLabel.node.getContentSize().width+30;   //设定当前对话框 背景宽度
                }else{
                    msgLabel.maxWidth = 430; //设定当前label 宽度
                    msgBg.width = 460;
                }
                msgBg.height = msgLabel.node.height+20;
                msgBg.data = msg;
                Global.UIHelper.addCommonClick(msgItem, "chat/msBg", this.selectMsgg, this, cc.Button.Transition.NONE);
                msgItem.height = msgBg.height+30;
                item.height = msgItem.height;
            }
        }

    }
    public loadSeverHeader(url,picID,callback:Function){
        if (CC_JSB) {
            Global.Toolkit.LoadPicToNative(Global.Toolkit.DealWithUrl(url), picID, (texture:cc.Texture2D) => {
                var frame = new cc.SpriteFrame(texture);
                callback(frame)
            })
        }
        else {
            cc.loader.load(Global.Toolkit.DealWithUrl(url), function (err, texture :cc.Texture2D) {
                if(err!= null)
                {
                    return
                }
                var frame = new cc.SpriteFrame(texture);
                callback(frame)
            })
        }
    }
    //查看大图
    private checkBigImage(target){
        if(target && target.node && target.node.data){
            Global.UI.show("WndChatImage",target.node.data);
        }
    }
    //充值方式
    private showRechange(target){
        if(target && target.node && target.node.data){
            Global.HallServer.send(NetAppface.mod,"GetAitePayInfo",target.node.data,(param)=>{
                if(param.status == 1){
                    param.pay_type = target.node.data.pay_type;
                    Global.UI.show("WndBankRechange",param);
                    // if(target.node.data.pay_type == "1000"){
                    //     Global.UI.show("WndAliPayRechange",param);
                    // }else if(target.node.data.pay_type == "1001"){
                    //     Global.UI.show("WndWeChatRechange",param);
                    // }else{
                    //     Global.UI.show("WndBankRechange",param);
                    // }
                }else{
                    Global.UI.fastTip("充值帐户信息拉取失败");
                }
            })
        }
    }
    //点击选择对应消息
    private selectMsgg(target){
        if(target && target.node && target.node.data){
            this.copyBtnActive = true
            let copyNode = cc.find("copy",target.node);
            copyNode.setPosition(cc.v2(-(target.node.width/2), copyNode.y));
            let starWorldPos = copyNode.parent.convertToWorldSpaceAR(copyNode.position);
            Global.Event.event(GlobalEvent.setCopypostion,starWorldPos,target.node.data)
        }
    }
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
