
import ViewBase from "../../../../core/ui/ViewBase";
import GongGaoViewItem from "./GongGaoViewItem";
import { SingleGongGaoModel } from "../../../../hallcommon/data/GongGaoData";
import AppHelper from "../../../../core/tool/AppHelper";

export default class BannerView extends ViewBase {

    // private tempNode: cc.Node;

    private itemList: Array<GongGaoViewItem> = new Array();
    // private itemPool: Array<GongGaoViewItem> = new Array();
    private pageView: any;

    private content :cc.Node;


    //自动滚动间隔
    private scrollDelayTime = 15;
    //切页用时
    private scrollTime = 1;

    private gongGaoCount = 0;

    private mask:cc.Mask;

    private hasRefreshMask = false;

    /* private clearRecord() {
        //自动播放开关
        this.pageView.isAutoScroll = false;

        this.pageView.removeAllPages();
        for (let index = 0; index < this.itemList.length; index++) {
            const item = this.itemList[index];
            item.node.setParent(this.tempNode);
            // item.reset();
            item.node.active = false;
            this.itemPool.push(item);
        }
        this.itemList = [];
    } */

    protected initView() {
        this.pageView = this.node.getComponent("LoopPageView");
        // this.tempNode = this.getChild("maskNode/view");
        this.mask = this.getComponent("maskNode", cc.Mask);
        this.itemList = [];
        // this.initData();
        this.hasRefreshMask = false;
    }

    private initData() {
        let bannerlist: SingleGongGaoModel[] = Global.GongGaoData.gongGaoList;
        if(bannerlist){
            this.gongGaoCount = bannerlist.length;
            for(let i=0;i<this.gongGaoCount;i++){
                let itemData: SingleGongGaoModel = bannerlist[i];
                this.addPrefeb(itemData);
            }
        }
        
    }

    /*type :1 普通弹窗  2 二维码  3 跳转url
        subtype: 1.财富秘籍 2.复制官网 3.修复 4.充值
    */
    private configs = {
        11001:{
            type: 0, 
            subtype: 0 
        },
        11002:{
            type: 1, 
            subtype: 1
        },
        11003:{
            type: 1, 
            subtype: 4 
        },
        11004:{
            type: 1, 
            subtype: 2 
        },
        11005:{
            type: 1, 
            subtype: 3
        },
        11006:{
            type: 2
        },
        
    }

    private refreshMask()
    {
        if(this.hasRefreshMask)
            return;
        this.hasRefreshMask = true;
        if(this.mask && this.itemList.length > 0)
        {
            let spNode = cc.find("content/guangao_di", this.itemList[0].node);
            if(spNode)
            {
                let sp = spNode.getComponent(cc.Sprite);
                if(sp)
                {
                    this.mask.spriteFrame = sp.spriteFrame;
                }
            }
        }
    }

    private addPrefeb(itemData: SingleGongGaoModel){
        let data = itemData;
        let id = data.lunbo_id;
        if(!this.configs[id]){
            Logger.error("ID无效！",id);
            return ;
        }
        Global.ResourceManager.loadRes("hall@effect/hall/lunbo/gonggaoItem_"+ id, (error, prefab)=>{
            if(error != null){
                Logger.error("加载预设失败", id);
                return;
            }
            if (cc.sys.platform != cc.sys.IPHONE&&id==11005) {
                return;
            }
            let effect = cc.instantiate(prefab) as cc.Node;
            effect.name = "gonggaoItem_" + id
            
            //1找到对应节点2.找到sprit组件3.设置对应图片
            let item = new GongGaoViewItem();
            item.setNode(effect);
            if(data.jump_type==1&&data.jump_url){
                item.setData({ type: 3, subtype: data.jump_url },this.pageView);
            }else{
                item.setData(this.configs[id],this.pageView);
            }
            let callback = ()=>{
                this.pageView.addPage(item.node);
                //紫色公告mask是图片mask 需要特殊处理
                if(Global.Setting.SkinConfig.isPurple)
                    this.refreshMask();
            }
            if(id == 11003)
            {
                item.InitVipCharge()
            }
            Global.customApp.loadBannerBg(item.icon,"guangao"+id+".png",callback);
            this.itemList.push(item);
           
            //g公告图集在大厅中  需要跟着大厅一起销毁或者不销毁
        }, null, null, Global.Toolkit.isIphone6());
    }
    

    onSubViewShow() {
        this.initData();
        //自动切页滚动间隔
        this.pageView.autoScrollDelayTime = this.scrollDelayTime;
        //切页用时
        this.pageView.autoScrollTime = this.scrollTime;
        this.pageView.scrollToPage(0, 0);
        //
        this.updateView();
        this.updateQrCodeItem();
        //自动播放开关
        this.pageView.isAutoScroll = true;
    }

   

    onSubViewHide(){
        this.pageView.removeAllPages();
        this.itemList = [];
    }

    public close()
    {
        this.itemList = [];
    }

    onDispose() {
        // this.clearRecord();
        this.mask = null;
    }

    //刷新二维码
    updateQrCodeItem() {
        if (this.itemList) {
            for (let i = 0; i < this.itemList.length; i++) {
                let item = this.itemList[i]
                let itemData = item.getData();
                if (itemData && itemData.type == 2) {
                    item.setData(itemData)
                    break;
                }
            }
        }
    }

    updateView() {
        
    }





}
