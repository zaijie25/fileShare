import {CustomerEntranceType, PopItemType } from "../../../hallcommon/model/ServicerModel";
import Toolkit from "../../../core/tool/Toolkit";
import AbsServicer from "../Feedback/AbsServicer";
import RightPanelView from "../Feedback/RightPanelView";
import { RightViewType } from "../Feedback/FeedbackConstants";
import Feedback2 from "../Feedback/Feedback2";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ServicerItem extends cc.Component {

    @property([cc.SpriteFrame])
    spriteList : Array<cc.SpriteFrame> = [];

    @property([cc.String])
    stringList: Array<string> = [];

    @property(cc.Sprite)
    iconSprite: cc.Sprite = null;

    @property(cc.Label)
    iconName: cc.Label = null;

    @property(cc.Label)
    servicerName: cc.Label = null;

    @property([cc.SpriteFrame])
    btnSpriteList : Array<cc.SpriteFrame> = [];

    private data : any = null;
    private btn_RichText: cc.RichText;
    private btnSprite: cc.Sprite;
    // private btn_Label: cc.Label;
    private isOnlineServicer: boolean = false;
    private isAtServicer: boolean = false;
    private server : AbsServicer = null;
    private order : number = -1;

    reset(){
        
    }
    onLoad(){
        if(this.stringList.length == 1){
            // this.btn_Label = cc.find("ServicerBtn/Label",this.node).getComponent(cc.Label);
        }else{
            let richTextNode = cc.find("ServicerBtn/RichText",this.node)
            if(richTextNode)
            {
                this.btn_RichText = richTextNode.getComponent(cc.RichText);
            }
            
            if(this.btnSpriteList.length==2){
                this.btnSprite = cc.find("ServicerBtn/btnSprite",this.node).getComponent(cc.Sprite);
            }
        }
    }

    setData2(index: number,data: AbsServicer){
        this.server = data;
        this.order = index;
        this.setData(data.initServicerData()[index]);
    }

    /**
     * 
     * @param data AppId int32  `json:"app_id"`
			Type  int32  `json:"type"` //1qq 2微信
			Info  string `json:"info"`
     */
    setData(data : any){
        if(data.type <= 0 || data.type > 5 ){
            this.node.active = false;
            return;
        }
        this.data = data;
        this.node.active = true;
        if(this.spriteList.length == 1){
            this.iconSprite.spriteFrame = this.spriteList[0];
        }else{
            this.iconSprite.spriteFrame = this.spriteList[data.type - 1];
        }
        if(this.stringList.length == 1){
            if(data.name){
                this.iconName.string = data.name;
            }else{
                this.iconName.string = this.stringList[0];
            }
        }else{
            if(data.name){
                this.iconName.string = data.name;
            }else{
                this.iconName.string = this.stringList[data.type - 1] || "";
            }
        }
        if (data.info!=null&&data.info!=undefined) {
            this.servicerName.node.active = true;
            this.servicerName.string = Global.Toolkit.substrEndWithElli( data.info ,12);
        }
        if(data.type == 5){
            if(this.stringList.length == 1){
                // this.btn_Label.string = "联系客服";
            }else{
                if(this.btn_RichText)
                    this.btn_RichText.string = "立即联系";
                if(this.btnSpriteList&&this.btnSpriteList.length==2){
                    this.btnSprite.spriteFrame = this.btnSpriteList[1];
                }
            }
            this.isOnlineServicer = true;
            this.isAtServicer = false;
        }else{
            if(data.type == 4){
                this.isAtServicer = true;
            }else{
                this.isAtServicer = false;
            }
            if(this.stringList.length == 1){
                // this.btn_Label.string = "联系客服";
            }else{
                if(this.btn_RichText)
                    this.btn_RichText.string = "立即联系";
                if(this.btnSpriteList&&this.btnSpriteList.length==2){
                    this.btnSprite.spriteFrame = this.btnSpriteList[1];
                }
            }
            this.isOnlineServicer = false;
        } 
        
    }

    awakeQQCallBack( retStr ){
        if (retStr.result == 0) {
        } 
        else {
            let ret = retStr.result
            if (ret == -1) {
                Logger.log("请先安装QQ");
                Global.UI.showSingleBox("请先安装QQ", null);
            } else {
                Logger.log("打开QQ失败");
                Global.UI.showSingleBox("打开QQ失败", null);
            }
        }
    }

    awakeWeChatCallBack( retStr ){
        if (retStr.result == 0) {
        } else {
            let ret = retStr.result
            if (ret == -1) {
                Logger.log("请先安装微信");
                Global.UI.showSingleBox("请先安装微信", null);
            } else {
                Logger.log("打开微信失败");
                Global.UI.showSingleBox("打开微信失败", null);
            }
        }
    }

    copyTextToClipboardCallBack( retStr ){
        if (retStr.result == 0) {
            Global.UI.fastTip("复制成功");
            if(this.data.type == PopItemType.QQ){
                Global.NativeEvent.awakeQQApp(this.awakeQQCallBack.bind(this));
            }else if(this.data.type == PopItemType.WX || this.data.type == PopItemType.WX){
                Global.NativeEvent.awakeWechatApp(this.awakeWeChatCallBack.bind(this));
            }
        }else {
            Global.UI.fastTip("复制失败");
        }
    }

    //复制并前往
    ServicerBtnFunc(event, customEventData){
        if(this.server!= null){
            if(this.isOnlineServicer){
                let rightPanelView = <RightPanelView>Global.UI.getWindow("WndFeedback").getView("RightPanelView");
                rightPanelView.changeView(RightViewType.feedback2);
                let feedback2 = <Feedback2>rightPanelView.getView("feedback2");
                feedback2.server = this.server;
                feedback2.order = this.order;
            }else{
                this.server.acceptService(this.order);
            }
            return;
        }
        
        if(this.isOnlineServicer){
            cc.sys.openURL(Global.Toolkit.DealWithUrl(this.data.info));
        }else{
            if(this.isAtServicer){
                Global.ChatServer.serverType = CustomerEntranceType.HallService;
                if(customEventData && customEventData == "proxy" && !this.data.pop)
                {
                    Global.ChatServer.userSetting(null,this.data.aite_url);
                    return
                }
                Global.ChatServer.userSetting(null,this.data.info);
                return;
            }
            Global.NativeEvent.copyTextToClipboard(this.data.info, this.copyTextToClipboardCallBack.bind(this) );
        }
    }
}
