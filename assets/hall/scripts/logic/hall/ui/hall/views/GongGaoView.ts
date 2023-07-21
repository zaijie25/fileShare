
import ViewBase from "../../../../core/ui/ViewBase";
import GongGaoViewItem from "./GongGaoViewItem";

export default class GongGaoView extends ViewBase {

    private tempNode: cc.Node;

    private itemPrefab: cc.Node = null;
    private itemList: Array<GongGaoViewItem> = new Array();
    private itemPool: Array<GongGaoViewItem> = new Array();
    private pageView: any;

    private gongGaoCfg: any = []

    //自动滚动间隔
    private scrollDelayTime = 3;
    //切页用时
    private scrollTime = 1;

    private gongGaoCount = 5;

    // private getItem(){
    //     var item = null;
    //     if(this.itemPool.length > 0){
    //         item = this.itemPool.pop();
    //         item.node.active = true;
    //     }else{
    //         var itemObj = cc.instantiate(this.itemPrefab);
    //     }
    //     item.node.active = true;
    //     return item;
    // }

    private clearRecord() {
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
    }

    protected initView() {
        this.pageView = this.node.getComponent("LoopPageView");
        this.tempNode = this.getChild("maskNode/view");
        this.itemPrefab = this.getChild("maskNode/view/gonggaoItem");

        this.initData();
        this.itemList = [];
        for (let i = 0; i < this.gongGaoCount; i++) {
            let node = this.getChild("maskNode/view/content/gonggaoItem" + i);
            let item = new GongGaoViewItem();
            item.setNode(node);
            item.setData(this.gongGaoCfg[i]);
            if (cc.sys.platform != cc.sys.IPHONE && i == 2) {
                item.node.removeFromParent();
                item.node.destroy();
            }
            else {
                // 0 //关闭财富秘籍
                // 4 //关闭返利5%
                if (i == 0 || i == 4) {
                    item.node.removeFromParent();
                    item.node.destroy();
                }else {
                    this.itemList.push(item);
                }
                
            }

        }

    }

    private initData() {
        this.gongGaoCfg = [];
        this.gongGaoCfg.push({ type: 1, subtype: 1 })
        this.gongGaoCfg.push({ type: 1, subtype: 2 })
        if (cc.sys.platform == cc.sys.IPHONE)
            this.gongGaoCfg.push({ type: 1, subtype: 3 })
        else
            this.gongGaoCfg.push(null);
        this.gongGaoCfg.push({ type: 2 })
        this.gongGaoCfg.push({ type: 1, subtype: 4 })
    }

    onSubViewShow() {
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

    onDispose() {
        // this.clearRecord();
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
        return;
        // this.clearRecord();

        // var datas = [1,2,3];
        // for (let index = 0; index < datas.length; index++) {
        //     const data = datas[index];
        //     var item = this.getItem();
        //     item.setData(data);
        //     this.pageView.addPage(item.node);
        // }
        // if(datas.length > 0){
        //     //自动播放开关
        //     this.pageView.isAutoScroll = true;
        // }
    }





}
