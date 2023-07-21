import {CustomerEntranceType, PopItemType } from "../../../hallcommon/model/ServicerModel";


const {ccclass, property} = cc._decorator;

@ccclass
export default class FeedbackServiceItem extends cc.Component {

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
    private data : any = null;
   

    refreshUI(data)
    {
        if(!data)
        {
            Logger.error("客服信息不存在")
            return
        }
        this.data = data
        this.iconSprite.spriteFrame = this.spriteList[data.type];
        let string = data.msg || this.stringList[data.type];
        this.iconName.string = Global.Toolkit.substrEndWithElli(string,8)
        this.servicerName.string = Global.Toolkit.substrEndWithElli(data.data,10)

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
            }else if(this.data.type == PopItemType.WX || this.data.type == PopItemType.WXPUBLIC){
                Global.NativeEvent.awakeWechatApp(this.awakeWeChatCallBack.bind(this));
            }
        }else {
            Global.UI.fastTip("复制失败");
        }
    }

    //复制并前往
    ServicerBtnFunc(event, customEventData) {
        switch (this.data.type) {
            case PopItemType.QQ:
            case PopItemType.WX:
            case PopItemType.WXPUBLIC:
                Global.NativeEvent.copyTextToClipboard(this.data.data, this.copyTextToClipboardCallBack.bind(this));
                break;
            case PopItemType.Link:
            case PopItemType.AtLink:
                cc.sys.openURL(Global.Toolkit.DealWithUrl(this.data.data));
                break;
            case PopItemType.AtWnd:
                Global.ChatServer.serverType = CustomerEntranceType.HallService
                Global.ChatServer.userSetting(null, this.data.data);
                break;
            default:
                break;
        }
    }
}
