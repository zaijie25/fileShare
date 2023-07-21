import ViewBase from "../../../core/ui/ViewBase";
export default class VipPayView extends ViewBase{
    private copyNode: cc.Node;
    private svContent: cc.Node;
    private sv: cc.ScrollView;
    private model: RechargeModel;
    private listView: any;

    protected initView(){
        this.model = Global.ModelManager.getModel("RechargeModel");
        this.sv = this.getComponent("scrollView", cc.ScrollView);
        this.svContent = this.getChild("scrollView/view/content");
        this.copyNode = this.getChild("scrollView/view/content/vipItem");
        this.copyNode.active = false;
        this.initListView();
    }

    private initListView(){
        let item_setter = (item, index, data) =>{
            new VipItem(item, data);
        };

        this.listView = Global.UIHelper.addScrollViewCarmackComp(this.sv.node, this.copyNode, 10, 0, this, item_setter);
    }

    public updateScrollView(list){
        let dataArr: Array<any> = list || [];
        this.listView.clearView();
        if (!Global.Toolkit.isEmptyObject(dataArr)){   
            this.listView.allDatas = Global.Toolkit.getOutOrderArray(dataArr);
            this.listView.updateView();
        }
    }

    protected onSubViewShow() {
        
    }

    protected onSubViewHide() {
        
    }
}

import RechargeModel from "../../../hallcommon/model/RechargeModel";
import AppHelper from "../../../core/tool/AppHelper";
import { CustomerEntranceType } from "../../../hallcommon/model/ServicerModel";

class VipItem extends ViewBase{
    private vipHeadSp: cc.Sprite;
    private vipNameLbl: cc.Label;
    private iconList: Array<cc.Node> = [];
    private creditNode: cc.Node;
    private creditTypeLbl: cc.RichText;
    
    private xingNode: cc.Node;
    private salesLabel: cc.Label;
    private extCfg = [
        "花呗",
        "信用卡",
        "qq钱包"
    ]
    private payType ={
        1000:1, //支付宝
        1001:0, //微信
        1002:2, //银行卡
    }
    private oldPayType ={
        1:1, //支付宝
        2:0, //微信
        3:2 //银行卡
    }
    private w: number;
    private h: number;

    constructor(node: cc.Node, private data: any){
        super();
        this.setNode(node);
    }

    protected initView(){
        this.vipHeadSp = this.getComponent("leftNode/vipHead", cc.Sprite);
        this.w = this.vipHeadSp.node.width;
        this.h = this.vipHeadSp.node.height;
        this.vipNameLbl = this.getComponent("leftNode/vipNameLbl", cc.Label);
        this.creditNode = this.getChild("leftNode/layout/creditNode");
        this.creditTypeLbl = this.getComponent("leftNode/layout/creditNode/type", cc.RichText);

        this.iconList = [];
        for (let i=1; i<= 3; i++){
            let iconNode = this.getChild("rightNode/iconList/icon"+ String(i));
            iconNode.active = false;
            this.iconList.push(iconNode);
        }
        this.xingNode = this.getChild("leftNode/layout/xingList");
        this.salesLabel = this.getComponent("rightNode/sales", cc.Label);
        this.getChild('rightNode/payBtn').off('click'); // debug 事件无法直接覆盖
        this.addCommonClick("rightNode/payBtn", this.openVipService, this);
        this.setItemStyle();
    }

    private openVipService(){

        if(Global.Toolkit.checkRechargeLimited())
        {
            return
        }
        if(this.data.ptype == CustomerEntranceType.QuickPayService){
            Global.ChatServer.serverType = CustomerEntranceType.QuickPayService;
            Global.ChatServer.userSetting(this.data);
            
        }else{
            let jumpType = this.data.open_type;
            let url = this.data.url;
            switch (jumpType) {
                case 0:
                    if (!url) {
                        Global.UI.fastTip("配置异常");
                        return;
                    }
                    if (String(url).indexOf('http') < 0) {
                        url = "http://" + url;
                    }
                    cc.sys.openURL(Global.Toolkit.DealWithUrl(url))
                    break
                case 1:
                    Global.UI.show("WndRechargeVipShow", this.data);
                    break;
                case 2:
                    if (!url) {
                        Global.UI.fastTip("配置异常");
                        return;
                    }
                    Global.ChatServer.userSetting(null, url);
                    break;
                case 3:
                    if (!url) {
                        Global.UI.fastTip("配置异常");
                        return;
                    }
                    if (String(url).indexOf('http') < 0) {
                        url = "http://" + url;
                    }
                    url = Global.Toolkit.AssembyUrl(url)
                    cc.sys.openURL(Global.Toolkit.DealWithUrl(url))
                    break;
                default:
                    break;
            }

        }
    }

    private setItemStyle(){
        this.vipNameLbl.string = Global.Toolkit.substrEndWithElli(this.data.name, 14);
        this.setIconList();
        this.setCredit();
        this.setHead();
        this.setXingXing();
    }

    private setIconList(){
        let payList = this.data.pay_type || [];
        if(this.data.ptype == CustomerEntranceType.QuickPayService){
            for (const payKey in payList) {
                let iconIndex = this.payType[payList[payKey]];
                if(iconIndex !=null && iconIndex !=undefined){
                    let iconNode = this.iconList[iconIndex];
                    iconNode.active = true;
                }
            }
        }else{
            for (const payKey in payList) {
                let iconIndex = this.oldPayType[payList[payKey]];
                if(iconIndex !=null && iconIndex !=undefined){
                    let iconNode = this.iconList[iconIndex];
                    iconNode.active = true;
                }
            }
        }
    }

    private setCredit(){
        let extList = this.data.ext_type || [];
        if (extList.length > 0){
            this.creditNode.active = true;
            let str = "";
            extList.forEach((e, index) => {
                if (index > 0){
                    str += '·';
                }
                str += this.extCfg[e-1];
            });
            this.creditTypeLbl.string = str;
            this.creditNode.width = 50 + extList.length * 60;
        }
        else{
            this.creditNode.active = false;
        }
    }

    private setHead(){
        let sfName = this.data.head_url || '1';
        // Global.ResourceManager.loadAutoAtlas(this.vipHeadSp, "hall/texture/hall/rechargeCash/rechargeCash", sfName)
        this.vipHeadSp.spriteFrame = Global.Toolkit.getLocalHeadSf(sfName)
        this.vipHeadSp.node.width = this.w;
        this.vipHeadSp.node.height = this.h;
    }
    private setXingXing(){
        //销量
        // if(this.data.sales){
        //     this.salesLabel.node.active = true;
        //     this.salesLabel.string = `月销${this.data.sales}+`;
        // }else{
        //     this.salesLabel.node.active = false;
        // }
        //星星
        let xingNumber = Number(this.data.xingxing || '0');
        // if(xingNumber > 0){
        //     this.xingNode.active = true;
        // }else{
        //     this.xingNode.active = false;
        // }
        for (let i=0; i<5; i++){
            let iconNode:cc.Sprite = this.getComponent("leftNode/layout/xingList/xing"+ String(i), cc.Sprite);
            if(xingNumber >= 1){
                Global.ResourceManager.loadAutoAtlas(iconNode,"hall/texture/hall/chat/chat", "f_20", null, false);
            }else if( xingNumber > 0){
                Global.ResourceManager.loadAutoAtlas(iconNode,"hall/texture/hall/chat/chat", "f_19", null, false);
            }else{
                Global.ResourceManager.loadAutoAtlas(iconNode,"hall/texture/hall/chat/chat", "f_18", null, false);
            }
            xingNumber = xingNumber -1;
        }
    }
    public setPos(x: number, y: number){
        this.node.x = x;
        this.node.y = y;
    }
}