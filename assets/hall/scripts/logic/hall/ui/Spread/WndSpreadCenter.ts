import WndBase from "../../../core/ui/WndBase";
import AppHelper from "../../../core/tool/AppHelper";
import SpreadModel from "../../../hallcommon/model/SpreadModel";
import { SpreadEvent } from "./SpreadEvent";
import CustomAppInfo from "../../../hallcommon/app/CustomApp";


export default class WndSpreadCenter extends WndBase
{
    private qrNode:cc.Node;
    SpreadModel: SpreadModel;
    protected onInit() 
    {
        this.name = "WndSpreadCenter";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/SpreedCenterUI";
    } 

    protected initView()
    {
        this.qrNode = this.getChild("qrNode");
        this.addCommonClick("close", this.close, this);

        let config = Global.customApp.getAppConfig()
        if (config && config.qrcodePos){
            this.qrNode.setPosition(cc.v2(config.qrcodePos[0],config.qrcodePos[1]));
        }
        else if(config && config.qrcodeX){
            this.qrNode.x = config.qrcodeX
        }
        
        this.SpreadModel = <SpreadModel>Global.ModelManager.getModel("SpreadModel");
        let widget:cc.Widget = this.getComponent("close", cc.Widget)
        if(widget != null)
        {
            widget.target = cc.Canvas.instance.node;
        }

        //this.tipsLabel = this.getComponent("tips", cc.Label);
        //this.tipsLabel.string = "申请成为平台合伙人\n联系微信" + Global.Setting.spreadWx;

        //this.wxNode.active = AppHelper.enableWxShare;
        //this.momentNode.active = AppHelper.enableWxShare;
        
    }

    onOpen(args)
    {
        
        let url = Global.Setting.Urls.inviteUrl;
        url = this.SpreadModel.Url || url
        Global.Toolkit.initQRCode(this.qrNode, url, 5);
    }
    

    onClose()
    {
        
    }

    private onServiceClick()
    {
        Global.NativeEvent.copyTextToClipboard(Global.Setting.spreadWx, this.copyTextToClipboardCallBack.bind(this));
    }

    private copyTextToClipboardCallBack(retStr){
        if (retStr.result == 0) {
            Global.UI.fastTip("复制成功");
                Global.NativeEvent.awakeWechatApp(this.awakeWeChatCallBack.bind(this));
        }else {
            Global.UI.fastTip("复制失败");
        }
    }


    private awakeWeChatCallBack(retStr){
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

    private onWxFriendClick()
    {
        this.wxShare(0, Global.Setting.wxFirendShareTitle, Global.Setting.wxFirendShareContent);
    }

    private onMomentClick()
    {
        this.wxShare(1, Global.Setting.wxMomentShareTitle, Global.Setting.wxMomentShareContent);
    }

    private wxShare(type, title, content)
    {
        if(!AppHelper.enableWxShare)
            return;
        // if(!AppHelper.getAppWXShareEnable())
        //     return;
        let shareUrl = Global.Setting.Urls.inviteUrl;
        shareUrl = this.SpreadModel.Url || shareUrl
       
        Global.NativeEvent.checkWXInstall((result)=>
        {
            if(result.result == 0)
            {
                Global.NativeEvent.shareWX(type, 5, 
                    title,
                    Global.Setting.wxIconUrl, 
                    shareUrl, 
                    content, 
                    null)
            }
            else
            {
                Global.UI.fastTip("请安装微信");
            }
        })
    }

}