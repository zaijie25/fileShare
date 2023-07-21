import WndBase from "../../../core/ui/WndBase";
import { HallRedSpotType } from "../../../hallcommon/model/HallModel";
import PoolBase from "../../../core/tool/PoolBase";
import RightPanelView from "./RightPanelView";
import ServicerModel from "../../../hallcommon/model/ServicerModel";
import { RightViewType } from "./FeedbackConstants";
import FeedbackServiceItem from "./FeedbackServiceItem";
import FeedbackLeftItem from "./FeedbackLeftItem";
import ServiceLeftItem from "./ServiceLeftItem";

export default class WndFeedback extends WndBase {

    model: ServicerModel;
    contentNode: cc.Node;
    copyItem: any;
    selectId: number;
    leftPanel: cc.Node;
    rightPanel: cc.Node;
    itemPool: LeftItemPool;
    nodeList: any[] = [];
    //rightPanelView: RightPanelView;
    serviceItemNodeList :cc.Node[] = []

    feedbackNode:cc.Node
    feedback2Node:cc.Node
    quickFeedbackNode:cc.Node
    onlineServiceNode:cc.Node
    FAQ:cc.Node
    noMsgTips:cc.Node
    private serverInfo: any;
    protected onInit() {
        this.isNeedDelay = true
        this.name = "WndFeedback";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/FeedbackUI";
        this.model = <ServicerModel>Global.ModelManager.getModel("ServicerModel");

    }


    protected onOpen() {
        this.serverInfo = this.args[0];
        if(this.serverInfo){
            this.initLeftItem();
            this.OnDataPrepared()
            //this.rightPanelView.subViewState = true
        }

    }


    initLeftItem(){

        if(!this.serverInfo || this.serverInfo.length ===0)
        {
            return
        }
        this.serverInfo.sort((a,b)=>{
            return a.sort - b.sort
        })
        let select = -1
        /**初始化item */
        for (let index = 0; index < this.serverInfo.length; index++) {
            let itemData = this.serverInfo[index];
            if(!itemData.status)
            {
                continue
            }
            //itemData.id = Global.Toolkit.md5(itemData)
            let node :cc.Node = this.itemPool.getItem();
            let item = node.getComponent("ServiceLeftItem")
            item.SetToggleChecked(false);
            select += 1
            node.setParent(this.contentNode);
            this.nodeList.push(node);
            if(item)
            {
               item.onInit(itemData);
            }
            if(select === 0)
            {
                this.reset()
                item.SetToggleChecked(true);
                this.refreshRightPanel(itemData)
            }
            node.active = true
            node.on(cc.Node.EventType.TOUCH_END, this.leftItemClick, this);
        }

        /**
         * 排序
         */
        // for (let index = 0; index < this.contentNode.childrenCount; index++) {
        //     let itemData = this.contentNode.children[index].getComponent(ServiceLeftItem).getGameData();
        //     if(itemData)
        //     {
        //         let sort = itemData.sort -1 
        //         if(sort<0)
        //         {
        //             sort = 0
        //         }
        //         else if(sort >=this.contentNode.childrenCount)
        //         {
        //             sort = this.contentNode.childrenCount - 1
        //         }
        //         this.contentNode.children[index].setSiblingIndex(sort)
        //     }
            
        // }
        // this.OnDataPrepared()
        // /**
        //  * 选中第一个
        //  */
        // if(this.contentNode.childrenCount == 0) return
        // let node = this.contentNode.children[0]
        // if (node) {
        //     let item = node.getComponent(ServiceLeftItem)
        //     if (item) {
        //         let itemData = item.getGameData();
        //         this.reset()
        //         item.SetToggleChecked(true);
        //         this.refreshRightPanel(itemData)
        //     }

        // }
        //this.addFAQ();
    }

    addFAQ(){
        let item = this.itemPool.getItem();
        item.active = true;
        //item.getComponent("FeedbackLeftItem").onInit(this.leftItem[7]);
        let data :any = {}
        data.name = "FAQ"
        item.getComponent("ServiceLeftItem").onInit(data);
        item.setParent(this.contentNode);
        this.nodeList.push(item);
        item.on(cc.Node.EventType.TOUCH_END, this.leftItemClick, this);
        this.OnDataPrepared()
    }

    leftItemClick(event){
        Global.Audio.playBtnSound();
        let item = event.target;
        let gameListItem = item.getComponent("ServiceLeftItem");
        let gameData = gameListItem.getGameData();
        //this.FAQ.active = false
        this.onlineServiceNode.active = true
        this.noMsgTips.active = false
        if(gameData)
        {
            //this.selectId = gameData.id
            this.refreshRightPanel(gameData)
        }
        
    }
   
    refreshRightPanel(gameData: any) {

        let arr = gameData.windows
        if(!arr || !arr.length)
        {
            this.noMsgTips.active = true
            this.onlineServiceNode.active = false
            return
        }
        this.hideAllItem()
        this.onlineServiceNode.active = true
        this.noMsgTips.active = false
        for (let index = 0; index < arr.length; index++) {
            let element = arr[index];
            if(index<this.serviceItemNodeList.length && this.serviceItemNodeList[index] && element.type )
            {
                this.serviceItemNodeList[index].getComponent(FeedbackServiceItem).refreshUI(element)
                this.serviceItemNodeList[index].active = true

            }
            
        }
    }

    hideAllItem()
    {
        this.serviceItemNodeList.forEach((ele)=>{
            if(cc.isValid(ele))
            {
                ele.active = false
            }
        })
    }

    protected initView() {
        this.leftPanel = this.getChild("LeftPanel");
        this.rightPanel = this.getChild("RightPanel");
        this.copyItem = this.getChild("LeftPanel/MsgItem");
        this.copyItem.active = false
        this.contentNode = this.getChild("LeftPanel/scrollview/view/content");
        //this.rightPanelView = <RightPanelView>this.addView("RightPanelView",this.rightPanel,RightPanelView);
        this.addCommonClick("close", this.closeWnd, this);
        this.initItemPool();
        for (let index = 0; index < 3; index++) {
            let path = `RightPanel/onlineService/scrollView/view/content/service_${index}`
            let node = this.getChild(path)
            if(node)
            {
                this.serviceItemNodeList.push(node)
            }
            
        }
        this.feedbackNode = this.getChild("RightPanel/feedback")
        if(this.feedbackNode)
        {
            this.feedbackNode.active = false
        }
        this.feedback2Node = this.getChild("RightPanel/feedback2")
        if(this.feedback2Node)
        {
            this.feedback2Node.active = false
        }

        this.quickFeedbackNode = this.getChild("RightPanel/feedbackWrite")
        if(this.quickFeedbackNode)
        {
            this.quickFeedbackNode.active = false
        }

        this.FAQ = this.getChild("RightPanel/FAQ")
        if(this.FAQ)
        {
            this.FAQ.active = false
        }
        this.noMsgTips = this.getChild("RightPanel/noMsgTips")
        if(this.noMsgTips)
        {
            this.noMsgTips.active = false
        }
        this.onlineServiceNode = this.getChild("RightPanel/onlineService")
        if(this.onlineServiceNode)
        {
            this.onlineServiceNode.active = false
        }

        
    }

    private closeWnd() {
        this.close();
    }

    private initItemPool() {

        this.itemPool = new LeftItemPool(this.copyItem);
    }

    reset()
    {
        this.FAQ.active =false
        this.onlineServiceNode.active =false
        this.noMsgTips.active = false
    }
    
    protected onClose() {
        /* this.contentNode.removeAllChildren(true);
        this.itemPool.resetPool();
        this.nodeList = []; */
        if(this.nodeList){
            this.recycle();
        }
    }

    protected onDispose() {

        this.itemPool.resetPool();
        this.nodeList = [];
        this.itemPool = null
    }

    public recycle()
    {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    }

}

class LeftItemPool extends PoolBase {
    constructor(private copyNode: cc.Node) {
        super();
    }

    protected createItem() {
        return cc.instantiate(this.copyNode);
    }

    protected resetItem(node: cc.Node) {
        node.active = false;
        node.setParent(null);
    }
    public recycleAll(arr: Array<any>) {
        super.recycleAll(arr);
       /*  arr.forEach(ele => {
            this.resetItem(ele);
        }); */

    }
}