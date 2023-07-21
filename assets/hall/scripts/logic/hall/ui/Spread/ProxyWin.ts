import ViewBase from "../../../core/ui/ViewBase";
import ServicerModel, { CustomerEntranceType, PopItemType } from "../../../hallcommon/model/ServicerModel";
import SpreadModel from "../../../hallcommon/model/SpreadModel";
import WaitingView from "../waiting/WaitingView";
import SpreadServices from "./SpreadServices";

export default class ProxyWin extends ViewBase {
    private spriteNode: cc.Node;
    private contentSprite: cc.Sprite
    private show_img = ""
    private servicerNode = [];
    private serviceModel: ServicerModel;
    SpreadModel: SpreadModel;
    private waitingNode: cc.Node;
    private centerImg: cc.Node;

    private delegateNode: cc.Node;



    protected onInit() {

    }

    protected initView() {
        this.serviceModel = Global.ModelManager.getModel("ServicerModel");
        this.SpreadModel = <SpreadModel>Global.ModelManager.getModel("SpreadModel");

        this.centerImg = this.getChild("mask/centerImg");
        this.contentSprite = this.centerImg.getComponent(cc.Sprite);
        this.delegateNode = this.getChild("ServerNode");

        let leftNode = this.getChild("ServerNode/leftNode")
        // if (leftNode) {
        //     leftNode.active = false
        // }
      //  let rightNode = this.getChild("ServerNode/rightNode")
        // if (rightNode) {
        //     rightNode.active = false
        // }
        this.servicerNode.push(leftNode)
     //   this.servicerNode.push(rightNode)

        Global.UIHelper.addCommonClick(this.node, "ServerNode/leftNode/btn_leftkefu", this.openServicerApp, this);
      //  Global.UIHelper.addCommonClick(this.node, "ServerNode/rightNode/btn_leftkefu", this.openServicerApp, this);


    }


    private servicerType = {
        1: "icon_kfwx",          //微信
        2: "icon_kfqq",          //QQ
        3: "icon_kfwx",          //默认
        4: "icon_kfat",          //艾特
        5: "img_llgf",          //在线客服
        6: "img_llgf"           //在线客服
    }
    private servicerName = {
        1: "客服微信",           //微信
        2: "客服QQ",             //QQ
        3: "公众号",             //公众号
        4: "艾特客服",           //艾特
        5: "在线客服",           //默认
        6: "在线客服"          //默认
    }

    onSubViewShow() {
        if (this.waitingNode) {
            this.waitingNode.active = true;
        }
        let url = Global.Setting.Urls.getinviteUrl()
        this.SpreadModel.GetDayAgentShare(url);

      //  this.CheckKefu()
        this.showProxy()
        this.InitCenterImg();
    }


    InitCenterImg() {
        if(!this.show_img){
            return;
        }

        this.contentSprite.spriteFrame = null
        let self = this;
        if (self.show_img != null && !Global.Toolkit.isEmptyObject(self.show_img)) {
            if (CC_JSB) {
                Global.Toolkit.LoadPicToNative(Global.Toolkit.DealWithUrl(self.show_img), Global.Toolkit.DealWithUrl(self.show_img), (texture: cc.Texture2D) => {
                    if (self.centerImg && self.centerImg.isValid) {
                        var frame = new cc.SpriteFrame(texture);
                        self.contentSprite.spriteFrame = frame;

                    }
                })
            }
            else {
                cc.loader.load(Global.Toolkit.DealWithUrl(self.show_img), function (err, texture: cc.Texture2D) {
                    if (err != null) {
                        return
                    }
                    if (self.centerImg && self.centerImg.isValid) {
                        let frame:cc.SpriteFrame = new cc.SpriteFrame(texture);    
                        self.contentSprite.spriteFrame = frame;
                    }
                })
            }
        }
    }



    CheckKefu() {
        let data = null
        let model = Global.ModelManager.getModel("ServicerModel")
        if (model) {
            data = model.getServiceInfo(CustomerEntranceType.SpreadService)
        }
        if (!data || !data.status) {
            this.delegateNode.active = false
        }
        else {
            this.delegateNode.active = true
        }
    }

    showProxy() {
        let data = this.serviceModel.getServiceInfo(CustomerEntranceType.SpreadService)
        if(!data){
            Global.UI.fastTip("客服数据未配置！");
            return;
        }
        this.show_img = data.show_img;
        if (!data || data.arr.length === 0) return
        let severArr = data.arr;

        for (let index = 0; index < severArr.length; index++) {
            if (index > (this.servicerNode.length - 1)) {
                return;
            }
            let servicerItem = this.servicerNode[index]
            let data = severArr[index]
            if (data.type !== 0 && servicerItem && cc.isValid(servicerItem)) {
                servicerItem.active = true;
                // let labe1 = cc.find("label1", servicerItem).getComponent(cc.Label);
                let labe2 = cc.find("lb_kefu", servicerItem).getComponent(cc.Label);
                let icon = cc.find("img_qq", servicerItem).getComponent(cc.Sprite);
                let btnNode: any = cc.find("btn_leftkefu", servicerItem);
                btnNode.data = data;
                //  labe1.string = this.servicerName[data.type]
                labe2.string = Global.Toolkit.substrEndWithElli(data.data, 10)
                Global.ResourceManager.loadAutoAtlas(icon, "hall/texture/Proxy/Proxy", this.servicerType[data.type])
            }
        }
    }

    private openServicerApp(target) {
        if (target && target.node && target.node.data) {
            Global.NativeEvent.copyTextToClipboard(target.node.data.data, (retStr) => {
                if (retStr.result == 0) {
                    if (target.node.data.type == PopItemType.QQ) {
                        Global.UI.fastTip("复制成功");
                        Global.NativeEvent.awakeQQApp(this.awakeQQCallBack.bind(this));
                    } else if (target.node.data.type == PopItemType.WX || target.node.data.type == PopItemType.WXPUBLIC) {
                        Global.UI.fastTip("复制成功");
                        Global.NativeEvent.awakeWechatApp(this.awakeWeChatCallBack.bind(this));
                    } else if (target.node.data.type == PopItemType.AtWnd) {
                        Global.ChatServer.serverType = CustomerEntranceType.HallService;
                        Global.ChatServer.userSetting(null, target.node.data.data);
                    } else if (target.node.data.type == PopItemType.Link) {
                        cc.sys.openURL(Global.Toolkit.DealWithUrl(target.node.data.data));
                    }
                    else if (target.node.data.type == PopItemType.AtLink) {
                        cc.sys.openURL(Global.Toolkit.DealWithUrl(target.node.data.data));
                    } else {
                        Global.UI.fastTip("复制失败");
                    }
                }
            });
        }
    }


    awakeQQCallBack(retStr) {
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

    awakeWeChatCallBack(retStr) {
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

}
