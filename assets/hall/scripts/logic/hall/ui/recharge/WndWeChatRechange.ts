import WndBase, { DestoryType } from "../../../core/ui/WndBase";

export default class WndWeChatRechange extends WndBase {
    private codeSprite: cc.Sprite;
    private qrCodeURl;
    protected onInit() {
        this.name = "WndWeChatRechange";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Recharge/WeChatRechangeUI";
        this.destoryType = DestoryType.None;
    }
    protected initView() {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.codeSprite = this.getChild("bankNode/qrCodeSprite").getComponent(cc.Sprite);
        this.addCommonClick("headNode/btnBack", this.goBack, this,cc.Button.Transition.NONE);
        this.addCommonClick("headNode/helpNode", this.goBack, this,cc.Button.Transition.NONE);
        this.addCommonClick("bankNode/copyNode", this.saveQRCode, this,cc.Button.Transition.NONE);//保存二维码
    }
    onOpen(){
        let self = this;
        let data = this.args[0];
        this.qrCodeURl = data.url;
        this.codeSprite.spriteFrame = null;
        if (CC_JSB) {
            Global.Event.event(GlobalEvent.SHOW_NET_WAITING, true)
            Global.Toolkit.LoadPicToNative(Global.Toolkit.DealWithUrl(this.qrCodeURl), Global.Toolkit.DealWithUrl(this.qrCodeURl), (texture:cc.Texture2D) => {
                if(self.node && self.node.isValid)
                {
                    var frame = new cc.SpriteFrame(texture);
                    self.codeSprite.sizeMode =  cc.Sprite.SizeMode.CUSTOM
                    self.codeSprite.spriteFrame = frame
                    Global.Event.event(GlobalEvent.HIDE_NET_WAITING, false)
                }
            })
        }
        else {
            Global.Event.event(GlobalEvent.SHOW_NET_WAITING, true)
            cc.loader.load(this.qrCodeURl, function (err, texture:cc.Texture2D) {
                if(self.node && self.node.isValid)
                {
                    var frame = new cc.SpriteFrame(texture);
                    self.codeSprite.sizeMode =  cc.Sprite.SizeMode.CUSTOM
                    self.codeSprite.spriteFrame = frame
                    Global.Event.event(GlobalEvent.SHOW_NET_WAITING, false)
                }
            })
        }
    }
    private goBack() {
        this.close();
    }
    //保存二维码
    private saveQRCode() {
        if (!CC_JSB) {
            return;
        }
        if(this.qrCodeURl && this.codeSprite.spriteFrame !=null){
            let name = Global.Toolkit.md5(this.qrCodeURl)
            let filePath = jsb.fileUtils.getWritablePath() + name + '.jpg';
            Global.NativeEvent.saveToAlbum(filePath,() => {
            })
            Global.UI.fastTip("保存二维码成功");
        }else{
            Global.UI.fastTip("二维码未加载完成");
        }
            
    }
}