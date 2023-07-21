import ViewBase from "../../../../core/ui/ViewBase";
import AppHelper from "../../../../core/tool/AppHelper";
import { SpreadEvent } from "../../Spread/SpreadEvent";
import SpreadModel from "../../../../hallcommon/model/SpreadModel";
import CodeTipView from "../../waiting/CodeTipView";
import BindingButtonEffect from "../../../../core/component/BindingButtonEffect";
export default class GongGaoViewItem extends ViewBase {
    public icon: cc.Sprite;
    private info: any;
    SpreadModel: SpreadModel;
    private pageView:any
    private codeTip: CodeTipView;
    private childrenRoot:cc.Node
    protected initView() {
        this.icon = this.getComponent("content/guangao_di", cc.Sprite);
        this.childrenRoot = this.getChild("content");
        //let btn = this.getChild("btn")
        //btn.on("click", this.onClick, this);
        Global.UIHelper.addCommonClick(this.node,"content/btn",this.onClick,this)
        this.childrenRoot.addComponent(BindingButtonEffect)
        if (cc.isValid(this.getChild("content/codeTip"))){
            this.codeTip = this.getChild("content/codeTip").getComponent(CodeTipView);
        }
        this.SpreadModel = <SpreadModel>Global.ModelManager.getModel("SpreadModel");
    }

    //{type:1, subtype, param}
    //1 弹窗 点击
    //2 二维码
    public setData(info,pageView = null) {
        if (info == null) {
            this.node.active = false;
            return;
        }
        this.pageView = pageView
        if(!this.node || !this.node.isValid)
        {
            return
        }
        this.info = info;
        if (info.type == 2) {
            
            this.SpreadModel.on(SpreadEvent.RefreshShortUrl, this, this.initQrImg)
            this.initQrImg();
        }
    }

    moveSpine(rootNode)
    {
        
    }

    onOpen()
    {
    }
   
    public getData() {
        return this.info;
    }

    private initQrImg() {
        if(!this.node || !this.node.isValid)
        {
            return
        }
        let node = this.getChild("content/qrNode");
        this.codeTip.tips.string = "正在获取";
        if (node != null) {
            let url = Global.Setting.Urls.inviteUrl;
            url = this.SpreadModel.Url || url
            // if (this.SpreadModel.urlType != 1) {
            //     this.codeTip.error();
            // }else{
                Global.Toolkit.initQRCode(node, url, 5);
                if(this.pageView && cc.isValid(this.pageView))
                {
                    this.pageView.updatePage(this.node)
                }
                this.codeTip.success();
            // }
        }
    }

    protected onDestoy()
    {
        this.SpreadModel.off(SpreadEvent.RefreshShortUrl, this, this.initQrImg)
    }

    private onClick() {

        if (this.info.type == 1) {
            switch (this.info.subtype) {
                //财富秘籍
                case 1:
                    {
                        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndSpread")
                        Global.UI.show("WndSpread");
                        break;
                    }
                //复制官网
                case 2:
                    {
                        this.copyUrl();
                        break;
                    }
                //修复
                case 3:
                    {
                        this.openBackUrl();
                        break;
                    }
                //充值
                case 4:
                    {
                        Global.UI.show("WndRecharge", "vippay");
                        break;
                    }
            }
        }else if (this.info.type == 2) {
            Global.UI.show("WndSpreadCenter");
        }else if(this.info.type == 3){
            cc.sys.openURL(Global.Toolkit.DealWithUrl(this.info.subtype));
        }
    }

    InitVipCharge() {
        let vipNum =  Global.ModelManager.getModel("RechagreTipModel").Salenum
        let rateLabel : cc.Label =this.getComponent("content/rateLabel",cc.Label)
        if(rateLabel)
        {
            rateLabel.string = vipNum
        }
    }

    private copyUrl() {
        let url = Global.Setting.Urls.downLoadUrl
        Global.NativeEvent.copyTextToClipboard(url, (retStr) => {
            if (retStr.result == 0)
                Global.UI.fastTip("复制成功");
            else
                Global.UI.fastTip("复制失败");
        });
    }

    hideChild(flag)
    {
        if(cc.isValid(this.childrenRoot))
        {
            this.childrenRoot.active = flag
        }
    }

    private openBackUrl() {
        let url = Global.Setting.Urls.getBackUrl();
        cc.sys.openURL(url);
    }



}
