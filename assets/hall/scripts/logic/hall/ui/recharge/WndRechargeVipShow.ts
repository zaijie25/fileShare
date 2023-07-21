import WndBase, { DestoryType } from "../../../core/ui/WndBase";
import ViewBase from "../../../core/ui/ViewBase";

enum Type {
    wechat = 1,
    qq = 2,
    gzh = 3,
    kf = 4,
    zfb = 5,
}

export default class WndRechargeVipShow extends WndBase {
    private wxItem: Item;
    private qqItem: Item;
    private clickType: number;
    private wxpItem: Item;
    private aliItem: Item;

    protected onInit() {
        this.name = "WndRechargeVipShow";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Recharge/RechageVipShowUI";
        this.destoryType = DestoryType.None;
    }

    protected initView() {
        this.wxItem = new Item(this.getChild("centerNode/scrollview/maskView/content/item_wx"), this.onItemClick, this);
        this.wxpItem = new Item(this.getChild("centerNode/scrollview/maskView/content/item_wxp"), this.onItemClick, this);
        this.qqItem = new Item(this.getChild("centerNode/scrollview/maskView/content/item_qq"), this.onItemClick, this);
        this.aliItem = new Item(this.getChild("centerNode/scrollview/maskView/content/item_alixxx"), this.onItemClick, this);
        this.addCommonClick("close", this.closeWnd, this);
    }

    private onItemClick(str: string, type: number) {
        this.clickType = type;
        if (type === Type.kf) {
            cc.sys.openURL(Global.Toolkit.DealWithUrl(str));
        }
        else {
            Global.NativeEvent.copyTextToClipboard(str, this.copyTextToClipboardCallBack.bind(this));
        }

    }

    private copyTextToClipboardCallBack(retStr) {
        if (retStr.result == 0) {
            Global.UI.fastTip("复制成功");
            if (this.clickType == Type.wechat) {
                Global.NativeEvent.awakeWechatApp(this.awakeWeChatCallBack.bind(this));
            } else if (this.clickType == Type.qq) {
                Global.NativeEvent.awakeQQApp(this.awakeQQCallBack.bind(this));
            }
            else if (this.clickType == Type.gzh) {
                Global.NativeEvent.awakeWechatApp(this.awakeWeChatCallBack.bind(this));
            } else if (this.clickType == Type.zfb) {
                Global.NativeEvent.awakeALiPayApp(this.awakeAliCallBack.bind(this));
            } else {
                Global.UI.fastTip("复制失败");
            }
        }
    }

    private awakeQQCallBack(retStr) {
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

    private awakeAliCallBack(retStr) {
        if (retStr.result == 0) {
        } else {
            let ret = retStr.result
            if (ret == -1) {
                Logger.log("请先安装支付宝");
                Global.UI.showSingleBox("请先安装支付宝", null);
            } else {
                Logger.log("打开支付宝失败");
                Global.UI.showSingleBox("打开支付宝失败", null);
            }
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

    protected onOpen(data: any) {
        let t = data[0];
        let itemArray = []
        if (t.ptype1 !== 0) {
            this.wxItem.setStyle(t.ptype1, t.data1);
            this.wxItem.active = true;
            itemArray.push(this.wxItem)
        } else {
            this.wxItem.active = false;
        }
        if (t.ptype2 !== 0) {
            this.wxpItem.setStyle(t.ptype2, t.data2);
            this.wxpItem.active = true;
            itemArray.push(this.wxpItem)
        } else {
            this.wxpItem.active = false;
        }
        if (t.ptype3 !== 0) {
            this.qqItem.setStyle(t.ptype3, t.data3);
            this.qqItem.active = true;
            itemArray.push(this.qqItem)
        } else {
            this.qqItem.active = false;
        }
        if (t.ptype4 !== 0) {
            this.aliItem.setStyle(t.ptype4, t.data4);
            this.aliItem.active = true;
            itemArray.push(this.aliItem)
        }
        else {
            this.aliItem.active = false;
        }

        let scrollView = this.getChild("centerNode/scrollview").getComponent(cc.ScrollView)
        scrollView.enabled = true;
        scrollView.scrollToTop()

        let itemHeight = 60
        if (itemArray.length > 4) {
            let content = this.getChild("centerNode/scrollview/maskView/content")
            content.height = 310;
            scrollView.inertia = true;
            itemHeight = 60
        } else {
            scrollView.enabled = false;
        }

        for (let i = 0; i < itemArray.length; i++) {
            let item = itemArray[i]
            item.node.y = -40 - i * itemHeight
        }
    }

    private closeWnd() {
        this.close();
    }
}

class Item extends ViewBase {
    private icon: cc.Sprite;
    private typeLbl: cc.Label;
    private numLbl: cc.Label;
    private customType: number;

    constructor(node: cc.Node, private callback: Function, private target: any) {
        super();
        this.setNode(node);
    }

    protected initView() {
        this.icon = this.getComponent("icon", cc.Sprite);
        this.typeLbl = this.getComponent("typeLbl", cc.Label);
        this.numLbl = this.getComponent("numLbl", cc.Label);
        this.addCommonClick("actBtn", this.onActClick, this);
    }

    public setStyle(type: number, str: string) {
        this.numLbl.node.active = true;
        this.customType = type;
        if(str)
        {
            this.numLbl.string = str;
        }
        if(type === Type.kf)
        {
            this.numLbl.node.active =false;
        }else{
            this.numLbl.node.active = true;
        }

        let arr = Global.Setting.SkinConfig.rechargeVipConfig[type]
        if(arr == null)
            return;
        switch (type) {
            case Type.wechat:
                this.typeLbl.string = "客服微信"
                
                break;
            case Type.qq:
                this.typeLbl.string = "客服QQ"
                break;
            case Type.gzh:
                this.typeLbl.string = "公众号"
                break;
            case Type.kf:
                this.typeLbl.string = "在线客服"
                break;
            case Type.zfb:
                this.typeLbl.string = "支付宝"
                break;
            default:
                break;
        }
        if(Global.Setting.SkinConfig.isPurple)
            this.icon.spriteFrame = Global.ResourceManager.getSprite(arr[0], arr[1]);
        else
            Global.ResourceManager.loadAutoAtlas(this.icon, arr[0], arr[1]);

    }

    private onActClick() {
        if (this.callback) {
            this.callback.call(this.target, this.numLbl.string, this.customType);
        }
    }
}