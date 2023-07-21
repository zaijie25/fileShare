import ViewBase from "../../../core/ui/ViewBase";
import PoolBase from "../../../core/tool/PoolBase";
import RechargeModel from "../../../hallcommon/model/RechargeModel";


export default class RechargeListView extends ViewBase {
    private Rechagemodel: RechargeModel;
    private copyItem: any;
    private contentNode: cc.Node;
    private pageLabel: cc.Label;
    private nextBtn: cc.Node;
    private lastBtn: cc.Node;
    //没有数据
    private nothingNode:cc.Node;
    private itemPool: RecordingItemPool;
    private nodeList: any[] = [];
    //当前显示的页数
    private limit = 6
    private arrList: Array<any>
    private isRecharge: boolean
    protected initView()
    {
        this.Rechagemodel = <RechargeModel>Global.ModelManager.getModel("RechargeModel");
        this.Rechagemodel.on(RechargeModel.UpdateHistory, this, this.InitTeamListView);
        Global.UIHelper.addCommonClick(this.node, "nexPage", this.OnNextPagePageBtnClick, this);
        Global.UIHelper.addCommonClick(this.node, "upPage", this.OnLastPageBtnClick, this);
        this.contentNode = this.getChild("scrollview/view/content");
        this.copyItem = this.getChild("scrollview/view/content/Item");
        this.pageLabel = this.getChild("pageLabel").getComponent(cc.Label);
        this.nothingNode = this.getChild("Nothing");
        this.nothingNode.active = false;
        this.nextBtn = this.getChild("nexPage");
        this.lastBtn = this.getChild("upPage");
        this.copyItem.active = false;
        this.initItemPool()
        
    }
    onOpenRecharge(isRecharge: boolean = false){
        this.isRecharge = isRecharge;
        this.Rechagemodel.reqGetUserPayList()
    }

    protected onDispose()
    {
        this.itemPool.resetPool()
        this.Rechagemodel.off(RechargeModel.UpdateHistory, this, this.InitTeamListView);
    }
    //下一页
    OnNextPagePageBtnClick() {
        Global.Audio.playBtnSound();
        if(this.arrList.length > this.Rechagemodel.hisListPage * this.limit)
        {
            this.Rechagemodel.hisListPage++;
            this.InitTeamListView();
        }else{
            this.Rechagemodel.reqGetUserPayList(true)
        }
    }
    // 上一页
    OnLastPageBtnClick() {
        Global.Audio.playBtnSound();
        this.Rechagemodel.hisListPage--;
        if(this.Rechagemodel.hisListPage<=0)
        {
            this.Rechagemodel.hisListPage = 1;
            Global.UI.fastTip("已经是第一页了")
            return
        }
        this.InitTeamListView();
    }
    private initItemPool(){
       
        this.itemPool = new RecordingItemPool(this.copyItem);
    }

    public recycle()
    {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    }
    InitTeamListView() {
        this.arrList = this.Rechagemodel.getHisListData() || [];
        let count = this.arrList.length;
        if(count < 1){
            this.nothingNode.active = true;
            this.pageLabel.node.active = false;
            this.nextBtn.active = false;
            this.lastBtn.active = false;
        }else{
            this.nothingNode.active = false;
            this.pageLabel.node.active = true;
            this.nextBtn.active = true;
            this.lastBtn.active = true;
        }
        if (count ==0)  return;
        let listCount = count - (this.Rechagemodel.hisListPage-1)*this.limit > this.limit?this.limit:count - (this.Rechagemodel.hisListPage-1)*this.limit
        this.recycle();
        for (let j=0; j< listCount; j++){
            let node = this.itemPool.getItem();
            this.nodeList.push(node);
            node.active = true;
            node.setParent(this.contentNode);
            node.getComponent("RecordingItem").Init(this.arrList[(this.Rechagemodel.hisListPage-1)*this.limit+j],j,this.isRecharge)
        }
        let msgFormat = "共%s条"
        let str = "第%s页"
        this.pageLabel.string = cc.js.formatStr(msgFormat,this.Rechagemodel.hisTotal) + cc.js.formatStr(str,this.Rechagemodel.hisListPage);
    }

}
class RecordingItemPool extends PoolBase{
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
