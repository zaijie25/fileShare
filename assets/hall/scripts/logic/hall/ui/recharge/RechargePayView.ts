import ViewBase from "../../../core/ui/ViewBase";
import RechargeModel from "../../../hallcommon/model/RechargeModel";
import VipPayView from "./VipPayView";
import OlPayView from "./OlPayView";
import ServicerModel, { CustomerEntranceType } from "../../../hallcommon/model/ServicerModel";
import RechargeOnlineView from "./RechargeOnlineView";
import RechargeListView from "./RechargeListView";
import { HallRedSpotType } from "../../../hallcommon/model/HallModel";

export default class RechargePayView extends ViewBase {

    private rechargeOnlineView: RechargeOnlineView;
    private vipPayView: VipPayView;
    private olPayView: OlPayView;
    private idLbl: cc.Label;
    private headSprite: cc.Sprite;
    private subViewParentNode :cc.Node
    /**
      * 头像框
      */
    private headKuang: cc.Sprite = null;
    private tipsLbl: cc.Label;//充值提示文本
    private tipSprite: cc.Sprite;//充值提示图片（海外充值特有提示，目前不允许配置）
    // tab滚动条
    private copyToggle: cc.Node;
    private toggleList = [];
    private btnLayout: cc.Layout;
    private tabView: cc.ScrollView;

    private bgBig: cc.Node;

    private model: RechargeModel;
    private curViewStr: string;
    private payCfgMap = {};
    private copyBtn: cc.Node;
    private downloadBtn: cc.Node;
    private kefuSpot:cc.Node; //云闪付客服小红点
    private chatBtn: cc.Node;
    private chatSpot:cc.Node; //客服小红点

    private uploadBtn:cc.Node

      //赠送入款专区特殊处理（原vip入款）
      private vipTipSprite:cc.Node;
      //赠送入款专区特殊处理（原vip入款）
  
    //充值列表
    //private rechargeListView: RechargeListView;

    private subViewPath :any = {
        "vipPayView":"hall/prefabs/ui/Recharge/subView/pay/vipPayView",
        "olPayView":"hall/prefabs/ui/Recharge/subView/pay/olPayView",
        "rechargeOnlineView":"hall/prefabs/ui/Recharge/subView/pay/onlinePayView"
    }

    private viewKeyTypeMap :any = {
        "vipPayView":VipPayView,
        "olPayView":OlPayView,
        "rechargeOnlineView":RechargeOnlineView,
    }


    private bg:cc.Node
    //带tabbar的背景
    private bg2: cc.Node; 
    private curPaynum = 0;
    private payCfgList = [];
    protected initView() {
        this.model = Global.ModelManager.getModel("RechargeModel");
        this.subViewParentNode = this.getChild("descLayout")
        // this.vipPayView = <VipPayView>this.addView("VipPayView", this.getChild("descLayout/vipPayView"), VipPayView, false);
        // this.olPayView = <OlPayView>this.addView("OlPayView", this.getChild("descLayout/olPayView"), OlPayView, false);
        // this.rechargeOnlineView = <RechargeOnlineView>this.addView("RechargeOnlineView", this.getChild("descLayout/onlinePayView"), RechargeOnlineView, false);
        
        this.idLbl = this.getComponent("descLayout/payDesc/userInfo/idRoot/idLbl", cc.Label);
        this.idLbl.string = String(Global.PlayerData.uid);
        this.headSprite = this.getComponent("descLayout/payDesc/headImg", cc.Sprite);
        this.headKuang = this.getComponent("descLayout/payDesc/headImg/headFrame", cc.Sprite);

        this.copyBtn = this.getChild("descLayout/payDesc/userInfo/idRoot/copyBtn");
        this.addCommonClick("descLayout/payDesc/userInfo/idRoot/copyBtn", this.copyIDClick, this);
        this.tipsLbl = this.getComponent("descLayout/payDesc/userInfo/tipsRoot/tipsLbl", cc.Label);
        this.tipSprite = this.getComponent("descLayout/payDesc/userInfo/tipsRoot/tipSprite",cc.Sprite);
        this.bgBig = this.getChild("bg1");
        console.log(this.bgBig)
        console.log("1111111111111")
        // this.tipSprite = this.getChild("descLayout/payDesc/userInfo/tipsRoot/tipSprite");
        this.downloadBtn = this.getChild('descLayout/payDesc/userInfo/downloadBtn');
        this.kefuSpot = this.getChild('descLayout/payDesc/userInfo/downloadBtn/hongdian');
        this.kefuSpot.active = false;
        this.downloadBtn.active = false;
        this.addCommonClick('descLayout/payDesc/userInfo/downloadBtn', this.gotoDownload, this);
        this.chatBtn = this.getChild('descLayout/payDesc/userInfo/chatBtn');
        this.chatSpot = this.getChild('descLayout/payDesc/userInfo/chatBtn/hongdian');
        this.chatSpot.active = false;
        this.chatBtn.active = false;
        this.addCommonClick('descLayout/payDesc/userInfo/chatBtn', this.gotoAiteChat, this);

        this.uploadBtn = this.getChild('descLayout/payDesc/uploadBtn');
        if(this.uploadBtn)
        {
            this.uploadBtn.active = false
        }

        this.addCommonClick('descLayout/payDesc/uploadBtn', this.OnUploadBtnClicked, this);
        // tab滚动条
        this.tabView = this.getChild('descLayout/toggleSv').getComponent(cc.ScrollView);
        this.tabView.node.active = true;
        this.copyToggle = this.getChild("descLayout/toggleSv/view/btnLayout/toggle_1");
        this.btnLayout = <cc.Layout>this.getComponent("descLayout/toggleSv/view/btnLayout", cc.Layout);
        this.btnLayout.node.active = true;
        this.copyToggle.active = false;

        // this.bg2 = this.getChild("bg2")
        this.initSubViewClass(this.viewKeyTypeMap)
        
        this.InitScripts()
        //this.rechargeListView = <RechargeListView>this.addView("RechargeListView", this.getChild("payList"), RechargeListView, false);
}

async InitScripts() {
    await this.initSubView(this.subViewPath,this.viewKeyTypeMap,this.subViewParentNode)
}
    OnUploadBtnClicked() {
        let model =  Global.ModelManager.getModel("ServicerModel")
        if(model)
        {
            model.enterCustomerService(CustomerEntranceType.HallService);
        }
    }
   

    protected onSubViewShow() {
        this.idLbl.string = String(Global.PlayerData.uid);
        this.updateUserHead();
        this.model.on("UpdateResSpot",this,this.updateResSpot);
    }
    private updateResSpot( redSpotType ){
        switch(redSpotType){
             case HallRedSpotType.YunPalyKefu:
            {
                if(Global.ChatServer.serverType == CustomerEntranceType.QuickPayService)
                {
                    this.chatSpot.active = this.model.chatSpot;
                }else{
                    this.kefuSpot.active = this.model.kefuSpot;
                }
                break;
            }
        }
    }

    private updateUserHead() {
        let playerData = Global.PlayerData;
        let headImg = this.headSprite;
        if (headImg.node) {
            let w = headImg.node.width,
                h = headImg.node.height;
            headImg.spriteFrame = Global.Toolkit.getLocalHeadSf(playerData.headimg);
            headImg.node.width = w;
            headImg.node.height = h;
        }
        // if (this.headKuang && this.headKuang.node && this.headKuang.node.isValid) {
        //     Global.Toolkit.loadLocalHeadFrame(this.headKuang, playerData.headkuang);
        // }
    }
    protected onSubViewHide() {
        this.model.off("UpdateResSpot",this,this.updateResSpot);
    }
    protected onDispose()
    {
        this.model.off("UpdateResSpot",this,this.updateResSpot);
    }

    public showView(viewStr: string) {
        this.payCfgMap = this.model.getPayMapData();
        if (!this.payCfgMap || Global.Toolkit.isEmptyObject(this.payCfgMap)) {
            return;
        }
        if (viewStr) {
            this.curViewStr = viewStr;
        }
        this.uploadBtn.active = false
        this.setCurDescStyle(viewStr);
        //this.rechargeListView.active = false;
          //赠送入款专区特殊处理（原vip入款）
        //   this.vipTipSprite.active = this.curViewStr == RechargeModel.PayType.Vip;
          //赠送入款专区特殊处理（原vip入款）
        if (this.curViewStr == RechargeModel.PayType.Vip || this.curViewStr == RechargeModel.PayType.VipQuickPay || this.curViewStr == RechargeModel.PayType.Dpay) {
            this.vipPayView.subViewState = true;
            this.olPayView.subViewState = false;
            this.rechargeOnlineView.subViewState = false;
            this.vipPayView.updateScrollView(this.payCfgMap[this.curViewStr][0].data);
            this.copyBtn.active = true;
            this.downloadBtn.active = false;
            this.chatBtn.active = false;
            if(this.curViewStr == RechargeModel.PayType.VipQuickPay){
                this.chatBtn.active = true;
                this.chatSpot.active = this.model.chatSpot;
            }
        } else if (this.curViewStr == RechargeModel.PayType.OnlinePay) {
            this.vipPayView.subViewState = false;
            this.olPayView.subViewState = false;
            this.rechargeOnlineView.subViewState = true;
            this.rechargeOnlineView.initData(this.payCfgMap[this.curViewStr][0])
            this.copyBtn.active = true;
            this.downloadBtn.active = false;
            this.chatBtn.active = false;
        }
        // else if (this.curViewStr == RechargeModel.PayType.RechargeList) {
        //     this.rechargeListView.active = true;
        //     this.rechargeListView.onOpenRecharge(true);
        //     return;
        // } 
        else {
            this.rechargeOnlineView.subViewState = false;
            this.vipPayView.subViewState = false;
            this.olPayView.subViewState = true;
            this.chatBtn.active = false;
            if(this.curViewStr == RechargeModel.PayType.ScanCode){
                this.uploadBtn.active = true;
            }
            switch (this.curViewStr) {
                case RechargeModel.PayType.Union:
                    this.copyBtn.active = true;
                    this.downloadBtn.active = false;
                    break;
                case RechargeModel.PayType.YunPay:
                    this.copyBtn.active = false;
                    this.downloadBtn.active = true;
                    this.kefuSpot.active = this.model.kefuSpot;
                    break;
                default:
                    this.copyBtn.active = false;
                    this.downloadBtn.active = false;
            }
        }
        this.showBankPayTab();
    }

    private setCurDescStyle(viewStr: string) {
        this.tipSprite.node.active = false;
        this.tipsLbl.node.active = true;
        if (viewStr == RechargeModel.PayType.International){//海外充值特有提示
            this.tipsLbl.string = ""
            this.tipsLbl.node.active = false;
            this.tipSprite.node.active = true;
        }
        if (this.payCfgMap[viewStr][0].dest == null || this.payCfgMap[viewStr][0].dest == undefined) {
            this.tipsLbl.string = ""
        }
        else {
            this.tipsLbl.string = this.payCfgMap[viewStr][0].dest;
        }
    }
    // 设置标题是否显示
    private showBankPayTab() {
        if (this.curViewStr !== RechargeModel.PayType.Vip && this.curViewStr !== RechargeModel.PayType.VipQuickPay &&
            this.curViewStr !== RechargeModel.PayType.OnlinePay && this.curViewStr !== RechargeModel.PayType.Dpay) {
            this.tabView.node.active = true;
            this.initToggleList();
            this.bgBig.active = false;
            // this.subViewParentNode.y = 270;
            // this.bg2.active = false;
            // this.bg.active = true;
        } else {
            this.tabView.node.active = false;
            this.bgBig.active = true;
            // this.subViewParentNode.y = 248;
            // this.bg2.active = true;
            // this.bg.active = false;
        }
    }

    private copyIDClick() {
        Global.NativeEvent.copyTextToClipboard(String(Global.PlayerData.uid), this.copyTextToClipboardCallBack.bind(this));
    }

    private copyTextToClipboardCallBack(retStr) {
        if (retStr.result == 0) {
            Global.UI.fastTip("已复制到剪贴板");
        } else {
            Global.UI.fastTip("复制失败");
        }
    }

    private gotoDownload() {
        // let servicerModel = <ServicerModel>Global.ModelManager.getModel('ServicerModel');
        // servicerModel.showServices(ServiceEntranceType.YunpayDownload);
    }
    private gotoAiteChat() {
        // 默认选择充值方式最多的客服进入
        Global.ChatServer.serverType = CustomerEntranceType.QuickPayService;
        if(Global.ChatServer.QuickData)
        {
            Global.ChatServer.userSetting(Global.ChatServer.QuickData);
        }else{
            let list = this.payCfgMap[this.curViewStr][0].data;
            let data = {pay_type:[]};
            for (let i = 0; i < list.length; i++) {
                let data2 = list[i];
                if(data2.pay_type.length > data.pay_type.length){
                    data = data2;
                }
            }
            Global.ChatServer.userSetting(data);
        }
    }
    private initToggleList() {
        this.payCfgList = this.payCfgMap[this.curViewStr][0].data;
        if (this.payCfgMap[this.curViewStr][0].rand_sort === 0)
            this.payCfgList = Global.Toolkit.getOutOrderArray(this.payCfgList)
        this.recycleToggleList();
        this.curPaynum = 0;
        let isForceSelect = true;
        this.olPayView.hideAllItems()
        if (this.payCfgList) {
            for (let i = 0; i < this.payCfgList.length; i++) {
                let item = this.toggleList[i];
                if (!item) {
                    let node = cc.instantiate(this.copyToggle);
                    node.setParent(this.btnLayout.node);
                    item = new ToggleItem(node, this.onToggleClick, this);
    
                    this.toggleList.push(item);
                }
                item.bg.string = this.payCfgList[i].name
                item.checkBg.string = this.payCfgList[i].name
                item.active = true;
                item.setItemStyle(i);
                if (this.curPaynum == i) {    // 设置当前页签
                    isForceSelect = false;
                    item.setToggleChecked(true);
                    this.olPayView.initData(this.curViewStr, this.payCfgList[this.curPaynum]);
                    if (this.payCfgList[this.curPaynum].tip != "") {
                        this.tipsLbl.string = this.payCfgList[this.curPaynum].tip;
                    }
                }
            }
            if (!Global.Toolkit.isEmptyObject(this.payCfgList) && isForceSelect) {
                this.curPaynum = 0;
            }
            this.tabView.scrollToLeft();
        }
    }
    private onToggleClick(num) {
        let numTag = num;
        if (numTag == this.curPaynum) return;
        this.curPaynum = numTag;
        this.olPayView.initData(this.curViewStr, this.payCfgList[this.curPaynum]);
        if (this.payCfgList[this.curPaynum].tip != "") {
            this.tipsLbl.string = this.payCfgList[this.curPaynum].tip;
        }
    }
    private recycleToggleList() {
        this.toggleList.forEach(element => {
            element.active = false;
        });
    }
}
export class ToggleItem extends ViewBase {
    private bg: cc.Label;
    private checkBg: cc.Label;
    private itemkey = 0;
    private toggleComp: cc.Toggle;
    constructor(node: cc.Node, private callback: Function, private target: any) {
        super();
        this.setNode(node);
    }

    protected initView() {
        this.bg = <cc.Label>this.getComponent("check_close/bg", cc.Label);
        this.checkBg = <cc.Label>this.getComponent("check_open/bg", cc.Label);
        this.addCommonClick("", this.onItemClick, this, null);
        this.toggleComp = <cc.Toggle>this.getComponent("", cc.Toggle);
    }

    private onItemClick() {
        if (this.callback) {
            this.callback.call(this.target, this.itemkey);
        }
    }

    public setItemStyle(num) {
        this.itemkey = num;
    }

    public setToggleChecked(flag: boolean) {
        if (flag)
            this.toggleComp.check();
        else
            this.toggleComp.uncheck();
    }

}