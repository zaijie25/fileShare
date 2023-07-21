import PoolBase from "../../../core/tool/PoolBase";
import WndBase from "../../../core/ui/WndBase";
import CommisionItem from "./CommisionItem";
import CommisionLeftItem from "./CommisionLeftItem";
import CommisionModel from "../../../hallcommon/model/CommisionModel";
import { HallRedSpotType } from "../../../hallcommon/model/HallModel";
import WaitingView from "../waiting/WaitingView";

class WndCommision extends WndBase{
    
    leftItemPool: CommissionItemPool;
    rightListView:any;
    private rightScrollView:cc.ScrollView;

    leftItemNodeList = []
    RightItemNodeList = []

    private leftCopyItem :cc.Node
    private rightCopyItem :cc.Node

    private model:CommisionModel

    private lfetContentNode:cc.Node
    private taskType:number = -1;

    private clickedId = -1

    private waitingNode :cc.Node;
    protected onOpen(){
        if(this.waitingNode)
        {
            this.waitingNode.active = true;
        }
        this.model.reqGetCommisionAllList()
    }

    protected initView(){
       this.leftCopyItem = this.getChild("leftPanel/missionItem")
       if(this.leftCopyItem)
       {
           this.leftCopyItem.active = false
       }

       this.rightCopyItem = this.getChild("rightPanel/item")
       if(this.rightCopyItem)
       {
           this.rightCopyItem.active = false
       }
       this.lfetContentNode = this.getChild("leftPanel/scrollview/view/content")
       this.rightScrollView = this.getComponent("rightPanel/scrollview",cc.ScrollView)
       this.addCommonClick("close",this.close,this)
       this.initItemPool()
       this.initRightListView();
       this.model.on(CommisionModel.UpdateleftView,this,this.RefershLeftPanel)
       this.model.on(CommisionModel.UpdateScrollview,this,this.RefershRightPanel)
       this.model.on(CommisionModel.GetCommisionAward, this,this.onGetAward);
       if(this.waitingNode == null|| this.waitingNode == undefined){
        //view 内的loading
            this.waitingNode = WaitingView.initWaitingView(this.node,cc.v2(0,0));
        }
    }
    onGetAward(data) {
        let flag = this.model.checkIsAnyCommisionCanGet(this.clickedId)
        let node = this.lfetContentNode.getChildByName(this.clickedId.toString())
        if(!flag)
        {
            node.getComponent(CommisionLeftItem).SetUnReadActiveState(false)
            // this.refreshPanel()
        }
        this.ChangeStatus(data)
        this.rightListView.updateView();
        
    }


    private initItemPool()
    {
        this.leftItemPool = new CommissionItemPool(this.leftCopyItem);
        
    }

    protected onInit(){
        this.isNeedDelay = true
        this.name = "WndCommision";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/Commision/CommisionUI";
        this.model = <CommisionModel>Global.ModelManager.getModel("CommisionModel");
    }

    protected initRightListView(){
        let item_setter = (item, index) =>
        {
            let data = this.rightListView.allDatas[index];
            item.getComponent("CommisionItem").UpdateUI(data,this.taskType)
        };
        let [itemPadding,itemOffset] = Global.Setting.SkinConfig.commisionCfg;
        this.rightListView = Global.UIHelper.addScrollViewCarmackComp(this.rightScrollView.node, this.rightCopyItem, itemPadding, itemOffset, this, item_setter);
    }
   
    protected onClose() {
        this.recycleItems()
        let flag = this.model.checkShowHallRedSpot()
        if(flag)
        {
            Global.Event.event(GlobalEvent.ShowRedSpot, [true,HallRedSpotType.Commision]);
        }
        else
        {
            Global.Event.event(GlobalEvent.CloseRedSpot, HallRedSpotType.Commision);
        }
        this.model.resetData()
    }


    protected onDispose()
    {
        this.leftItemPool.resetPool()
        this.leftItemNodeList = [];
        this.RightItemNodeList = []
        this.model.off(CommisionModel.UpdateleftView,this,this.RefershLeftPanel)
        this.model.off(CommisionModel.UpdateScrollview,this,this.RefershRightPanel)
        this.model.off(CommisionModel.GetCommisionAward, this,this.onGetAward);
    }

    RefershRightPanel(data) {
        if(this.waitingNode)
        {
            this.waitingNode.active = false;
        }
        let arr: Array<any> = data.data || [];
        this.taskType = data.global_task_type ? data.global_task_type : -1; 
        arr.sort(this.sortData)
        this.rightListView.allDatas = arr;
        this.rightListView.updateView();
    }

    sortData(a,b)
    {
        if(a.task_status !== 1 && b.task_status !== 1)
        {
            return a - b
        }
        else if(a.task_status === 1 && b.task_status !== 1)
        {
            return - 1
        }
        else if(a.task_status === 1 && b.task_status === 1)
        {
            return a - b 
        }
        else
        {
            return 1
        }
        
    }

    ChangeStatus(data)
    {
        let arr = this.rightListView.allDatas
        if(!arr || arr.length == 0) return

        for (let index = 0; index < arr.length; index++) {
            let element = arr[index];
            if(element.task_id == data.id && data.global_task_type == this.clickedId)
            {
                element.task_status = 2
            }
            
        }
        arr.sort(this.sortData)

        
    }

    SortItem()
    {

    }

    UpdataListData(data)
    {
        if(data == null) return
        this.rightListView.allDatas = data
        this.rightListView.UpDateScrollData()
    }

    RefershLeftPanel(data) {
        if(this.waitingNode)
        {
            this.waitingNode.active = false;
        }
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING,"WndCommision")
        if (!data || data.length == 0) {
            Global.UI.fastTip("该功能暂未开放，敬请期待哦！");
            return
        }
        this.OnDataPrepared()
        
        for (let index = 0; index < data.length; index++) {
            // if(data[index].global_task_type == 7){ //屏蔽掉游戏活跃
            //     continue;
            // }
            let leftItem = this.leftItemPool.getItem()
            leftItem.setParent(this.lfetContentNode)
            this.leftItemNodeList.push(leftItem);
            let CommisionItem = leftItem.getComponent("CommisionLeftItem")
            CommisionItem.data = data[index]
            if (index === 0) {
                this.clickedId = data[index].global_task_type
                CommisionItem.SetToggleChecked(true)
                this.model.reqGetCommisionInfo(data[index].global_task_type)
            }
            leftItem.active = true;
            leftItem.name =  data[index].global_task_type.toString()
            leftItem.on(cc.Node.EventType.TOUCH_END, this.leftItemClick, this)
            CommisionItem.onInit(data[index])
        }
    }
    leftItemClick(target) {
        
        let CommisionItem = target.target.getComponent("CommisionLeftItem")
        if(CommisionItem && CommisionItem.data)
        {
            if(this.clickedId == CommisionItem.data.global_task_type)
            {
                return
            }
            this.clickedId = CommisionItem.data.global_task_type
            let data = this.model.GetCommisionInfoByType(CommisionItem.data.global_task_type)
            if(data)
            {
                this.RefershRightPanel(data)
                return
            }
            if(this.waitingNode)
            {
                this.waitingNode.active = true;
            }
            this.model.reqGetCommisionInfo(CommisionItem.data.global_task_type)
        }
    }

    /**
     * 
     * @param type 1左边 2 右边 0 全部
     */
    public recycleItems()
    {
        this.leftItemPool.recycleAll(this.leftItemNodeList);
        this.leftItemNodeList = [];
        
    }
    
    
}

export default WndCommision

class CommissionItemPool extends PoolBase{
    constructor(private copyNode: cc.Node){
        super();
    }
    protected createItem(){
        return cc.instantiate(this.copyNode);
    }

    protected resetItem(node: cc.Node){
        node.active = false;
        node.setParent(null)
    }
    public recycleAll(arr: Array<any>)
    {
        super.recycleAll(arr)
        arr.forEach(ele => {
            this.resetItem(ele);
        });

    }
}