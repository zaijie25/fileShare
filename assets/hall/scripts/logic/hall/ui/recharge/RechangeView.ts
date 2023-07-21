import ViewBase from "../../../core/ui/ViewBase";
import RechargeModel from "../../../hallcommon/model/RechargeModel";
import RechargePayView from "./RechargePayView";
import AppHelper from "../../../core/tool/AppHelper";
import RechagreTipModel from "../../../hallcommon/model/RechagreTipModel";
import WaitingView from "../waiting/WaitingView";

export default class RechangeView extends ViewBase {
    private rechargePayView: RechargePayView;

    private curPayType: string = '';
    private model: RechargeModel;
    private btnLayout: cc.Layout;
    private Tipmodel: RechagreTipModel;
    private copyToggle: cc.Node;
    private toggleList = [];
    private fanliIconNode: cc.Node;
    private waitingNode :cc.Node;
    protected onSubViewShow() {
        if(this.waitingNode)
        {
            this.waitingNode.active = true;
        }
        this.rechargePayView.subViewState = true
        this.model.reqGetPayConfig();
    }
    protected initView() {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.model = <RechargeModel>Global.ModelManager.getModel("RechargeModel");
        this.model.on(RechargeModel.ReadyForConfig, this, this.show);
        this.rechargePayView = <RechargePayView>this.addView("RechargePayView", this.getChild("payView"), RechargePayView);
        this.copyToggle = this.getChild("leftBtns/toggle_1");
        this.btnLayout = <cc.Layout>this.getComponent("leftBtns/toggleSv/view/btnLayout", cc.Layout);
        this.copyToggle.active = false;
        this.fanliIconNode = this.getChild("leftBtns/fanli");
        this.fanliIconNode.active = false
        if(this.waitingNode == null|| this.waitingNode == undefined){
            //view 内的loading
            this.waitingNode = WaitingView.initWaitingView(this.node,cc.v2(138,0));
        }
    }
    private initToggleList() {
        let payCfgList = this.model.getPayListData();
        this.recycleToggleList();
        let isForceSelect = true;
        for (let i = 0; i < payCfgList.length; i++) {
            let item = this.toggleList[i];
            if (!item) {
                let node = cc.instantiate(this.copyToggle);
                node.setParent(this.btnLayout.node);
                item = new ToggleItem(node, this.onToggleClick, this);
                this.toggleList.push(item);
            }
            item.active = true;
            item.setItemStyle(payCfgList[i].pay_key);
            if (payCfgList[i].tip_status === 1) {
                item.addFanliIcon(this.fanliIconNode, payCfgList[i].tip);
            }
            if (this.curPayType === payCfgList[i].pay_key) {    // 设置当前页签
                isForceSelect = false;
                item.setToggleChecked(true);
                item.moveFanli(true);
            }
        }

        if (!Global.Toolkit.isEmptyObject(payCfgList) && isForceSelect) {
            this.curPayType = payCfgList[0].pay_key;
            let curToggle = this.toggleList.find((item)=> item.itemkey == this.curPayType);
            if(curToggle){
                curToggle.moveFanli(true);
            }
        }
    }

    public ShowVip() {
        let viewName = "vippay";
        if (viewName == this.curPayType) return;
        this.curPayType = viewName;
        this.toggleList.forEach((Element) => {
            if (Element.itemkey == viewName) {
                Element.setToggleChecked(true);
                Element.moveFanli(true);
            }
        })
        this.rechargePayView.showView(viewName);
    }

    private recycleToggleList() {
        this.toggleList.forEach(element => {
            if(element)
            {
                element.active = false;
                let fanliNode = cc.find("Fanli",element.node)
                if(fanliNode)
                {
                    fanliNode.active = false
                }
            }
            
        });
    }

    private onToggleClick(name: string) {
        let viewName = name;
        if (viewName == this.curPayType) return;
        this.curPayType = viewName;
        this.rechargePayView.showView(viewName);
        this.toggleList.forEach(element => {
            if(element.itemkey == name){
                element.moveFanli(true);
                element.toggleChecked(false);
            }else{
                element.moveFanli(false);
                element.toggleChecked(true);
            }
        });
    }

    private show() {
        if(this.waitingNode){
            this.waitingNode.active = false;
        }
        this.initToggleList();
        this.Tipmodel = <RechagreTipModel>Global.ModelManager.getModel("RechagreTipModel");
        if (this.Tipmodel.RechagreTipModel && this.Tipmodel.Salenum && this.Tipmodel.Salenum > 0) {
            if (this.Tipmodel.flag) {
                cc.error(this.Tipmodel.flag)
                return
            }
            else {
                this.Tipmodel.flag = true;
                Global.UI.show("WndRechangeTip", this.Tipmodel.Salenum)
            }

        }
        this.rechargePayView.showView(this.curPayType);
    }
    protected onSubViewHide() {
    }
    protected onDispose() {
        this.curPayType = '';
        this.toggleList = [];
        if (this.model){
            this.model.clearReqTimeout();
            this.model.off(RechargeModel.ReadyForConfig, this, this.show);
        }
    }
}

class ToggleItem extends ViewBase {
    public itemkey = '';
    private toggleComp: cc.Toggle;
    private typeSprite: cc.Sprite;

     //赠送入款专区特殊处理（原vip入款）
     private isVipItem:boolean = false;  //标识是否为赠送专区入款
     private vipSpine:cc.Node;       //动效
     private vipSprite:cc.Sprite;        //页签文字（切图）
    //  private vipSprite1:cc.Sprite;        //页签文字（切图）
    //  private goldSpine:cc.Sprite;       // 闪光动效
    //  private goldSpine1:cc.Sprite;       // 闪光动效
     private vipFanli:cc.Sprite;           //返利
     private vipFanliLabel:cc.Label;     //返利百分比文字
     //赠送入款专区特殊处理（原vip入款）

    constructor(node: cc.Node, private callback: Function, private target: any) {
        super();
        this.setNode(node);
    }

    protected initView() {
        this.typeSprite = <cc.Sprite>this.getComponent("typeSprite", cc.Sprite);
        this.addCommonClick("", this.onItemClick, this);
        this.toggleComp = <cc.Toggle>this.getComponent("", cc.Toggle);
         //赠送入款专区特殊处理（原vip入款）
         this.vipSpine = <cc.Node>this.getChild("vipSpine");
         this.vipSprite = <cc.Sprite>this.getComponent("vipSprite",cc.Sprite);
        //  this.vipSprite1 = <cc.Sprite>this.getComponent("vipSprite1",cc.Sprite);
        //  this.goldSpine = <cc.Sprite>this.getComponent("goldSpine",cc.Sprite);
        //  this.goldSpine1 = <cc.Sprite>this.getComponent("goldSpine1",cc.Sprite);
         this.vipFanli = <cc.Sprite>this.getComponent("vipFanli",cc.Sprite);
         this.vipFanliLabel = <cc.Label>this.getComponent("vipFanli/label",cc.Label);
        //  this.vipSpine.node.active = false;
        //  this.vipSprite.node.active = false;
        //  this.vipFanli.active = false;
         //赠送入款专区特殊处理（原vip入款）
        
    }

    private onItemClick() {
        if (this.callback) {
            // console.error("点击",this.target,this.itemkey,this.callback);
            this.callback.call(this.target, this.itemkey);
        }
    }

     //赠送入款专区特殊处理（原vip入款）
     private setVipItemStyle(){
        // let check_close = <cc.Node>this.getChild("check_close");
        // let check_open = <cc.Node>this.getChild("check_open");
        // check_close.active = false;
        this.vipSprite.node.active = true;
        // this.vipSprite1.node.active = true;
        this.vipSpine.active = true;
        // this.goldSpine.node.active = true;
        // this.goldSpine1.node.active = true;
        this.isVipItem = true;
    }
    //赠送入款专区特殊处理（原vip入款）

    //赠送入款专区特殊处理（原vip入款）
    private setVipItemFanli(sale){
        this.vipFanli.node.active = true;
        this.vipFanliLabel.string = parseFloat(sale).toString();
    }
    //赠送入款专区特殊处理（原vip入款）

    public setItemStyle(key: string) {
        this.itemkey = key;
        if (key == RechargeModel.PayType.Vip){
            this.setVipItemStyle();
            return;
        }
        let bgCfg = Global.Setting.SkinConfig.rechargeIconsCfg[key];
        if (!bgCfg) return Logger.error("未配置key", key);
        let [normal, checked] = bgCfg;
        if (Global.Setting.SkinConfig.isPurple) {
            //紫色是图片
            let bg = <cc.Sprite>this.getComponent("check_close/btnLayout/bg", cc.Sprite);
            let checkBg = <cc.Sprite>this.getComponent("check_open/btnLayout/bg", cc.Sprite);
            let bg1 = <cc.Sprite>this.getComponent("check_close/btnLayout/bg1", cc.Sprite);
            let checkBg1 = <cc.Sprite>this.getComponent("check_open/btnLayout/bg1", cc.Sprite);
            let layout = <cc.Layout>this.getComponent("check_close/btnLayout", cc.Layout);
            let layout1 = <cc.Layout>this.getComponent("check_open/btnLayout", cc.Layout);
            let typeNode = <cc.Sprite>this.getComponent("check_close/typeNode", cc.Sprite);
            let typeNode1 = <cc.Sprite>this.getComponent("check_open/typeNode", cc.Sprite);
            Global.ResourceManager.loadAutoAtlas(bg, "hall/texture/hall/rechargeCash/rechargeCash", normal);
            Global.ResourceManager.loadAutoAtlas(checkBg, "hall/texture/hall/rechargeCash/rechargeCash", checked);
            if (Global.Setting.SkinConfig.rechargeIconsCfg[key][3]) {
                Global.ResourceManager.loadAutoAtlas(typeNode, "hall/texture/hall/rechargeCash/rechargeCash", Global.Setting.SkinConfig.rechargeIconsCfg[key][3]);
                typeNode.node.active = true;
                layout.node.x = 18;
                // layout1.node.x = 18;
            } else {
                typeNode.node.active = false;
                layout.node.x = 6;
                // layout1.node.x = 6;
            }
            if (Global.Setting.SkinConfig.rechargeIconsCfg[key][4]) {
                Global.ResourceManager.loadAutoAtlas(typeNode1, "hall/texture/hall/rechargeCash/rechargeCash", Global.Setting.SkinConfig.rechargeIconsCfg[key][4]);
                typeNode1.node.active = true;
                // layout.node.x = 18;
                layout1.node.x = 18;
            } else {
                typeNode1.node.active = false;
                // layout.node.x = 6;
                layout1.node.x = 6;
            }
            let _index = key.indexOf("_");
            if (_index > -1) {
                let config_index = "";
                config_index = key.substring(_index + 1);
                Global.ResourceManager.loadAutoAtlas(bg1, "hall/texture/hall/rechargeCash/rechargeCash", "img_" + config_index);
                Global.ResourceManager.loadAutoAtlas(checkBg1, "hall/texture/hall/rechargeCash/rechargeCash", "img_" + config_index);
                // if (Global.Setting.SkinConfig.rechargeIconsCfg[key][3]) {  
                //     bg1.node.x = bg.node.x + bg.node.width / 2 - 4;
                //     checkBg1.node.x = checkBg.node.x + checkBg.node.width / 2 - 4;
                // } else {
                //     bg1.node.x = 48;
                //     checkBg1.node.x = 48;
                // }
                // bg1.node.x = bg.node.x + bg.node.width / 2 - 4;
                // checkBg1.node.x = checkBg.node.x + checkBg.node.width / 2 - 4;
                bg1.node.active = true;
                checkBg1.node.active = true;
            } else {
                bg1.node.active = false;
                checkBg1.node.active = false;
            }
        }
        else {
            let bg = <cc.Label>this.getComponent("check_close/bg", cc.Label);
            let checkBg = <cc.Label>this.getComponent("check_open/bg", cc.Label);
            // let fontSize = 27
            // if(normal.length > 4){ //海外支付字体比较小
            //     bg.fontSize = 21;
            //     checkBg.fontSize = 21;
            // }else{
            //     bg.fontSize = fontSize;
            //     checkBg.fontSize = fontSize;
            // }
            bg.string = normal
            checkBg.string = checked
            if (Global.Setting.SkinConfig.rechargeIconsCfg[key][3]) {
                Global.ResourceManager.loadAutoAtlas(this.typeSprite, "hall/texture/hall/rechargeCash/rechargeCash", Global.Setting.SkinConfig.rechargeIconsCfg[key][3]);
                this.typeSprite.node.active = true;
                // layout1.node.x = 18;
            }
        }
        
            
    }

    public addFanliIcon(fanliNode: cc.Node, sale) {
         //赠送入款专区特殊处理（原vip入款）
         if (this.isVipItem){
            this.setVipItemFanli(sale);
            return;
        }
        //赠送入款专区特殊处理（原vip入款）
        let old = cc.find("Fanli", this.node)
        if (old) {
            old.removeFromParent(false)
        }
        let obj = cc.instantiate(fanliNode)
        obj.name = "Fanli"
        let txtObj = cc.find("content", obj).getComponent(cc.Label)
        txtObj.string = sale;
        obj.setParent(this.node)
        obj.active = true;
        obj.setPosition(44, 30);
    }

    //移动返利节点
    public moveFanli(isCheck){
        let fanliNode = cc.find("Fanli",this.node);
        if(fanliNode){
            // isCheck ? fanliNode.setPosition(60, 30) : fanliNode.setPosition(Global.Setting.SkinConfig.rechargeFanliPos[0], Global.Setting.SkinConfig.rechargeFanliPos[1]);
            fanliNode.setPosition(44, 30)
        }
    }

    // 切换显示
    public toggleChecked(isCheck) {
        let checkClose = cc.find("check_close", this.node);
        checkClose.active = isCheck;
        let checkOpen = cc.find("check_open", this.node);
        checkOpen.active = !isCheck;
    }

    public setToggleChecked(flag: boolean) {
        if (flag)
            this.toggleComp.check();
        else
            this.toggleComp.uncheck();
    }

}