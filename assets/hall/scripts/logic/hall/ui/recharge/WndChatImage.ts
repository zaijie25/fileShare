import WndBase, { DestoryType } from "../../../core/ui/WndBase";

export default class WndChatImage extends WndBase {
    private imageNode: cc.Sprite;
    protected onInit() {
        this.name = "WndChatImage";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Recharge/ChatImage";
        this.destoryType = DestoryType.None;
    }
    protected initView() {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.imageNode = this.getChild("imageNode").getComponent(cc.Sprite);
        // this.bgNode.node.active = false;
        this.imageNode.spriteFrame = null;
        this.addCommonClick("btnBack", this.goBack, this);
    }
    onOpen(){
        let data = this.args[0];
        // console.log("URL= ",data.url);
        this.imageNode.spriteFrame = null;
        this.loadSeverHeader(data.url,(frame)=>{
            this.imageNode.spriteFrame = frame;
            this.imageNode.node.width = this.node.width;
            this.imageNode.node.height = (this.node.width/data.imageWidth)*data.imageHeight;
        })
    }
    private goBack() {
        this.close();
    }
    public loadSeverHeader(url,callback:Function){
        //获取图片
        cc.loader.load({
            url: url,
            type: "jpg"
        }, function (err, texture) {
                var frame = new cc.SpriteFrame(texture);
                callback(frame);
        })
    }
}