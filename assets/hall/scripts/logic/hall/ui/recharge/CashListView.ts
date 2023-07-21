import ViewBase from "../../../core/ui/ViewBase";
import ExtractModel from "../../../hallcommon/model/ExtractModel";
import { ExtractEvent } from "../money/ui/extractCash/ExtractEvent";
import PoolBase from "../../../core/tool/PoolBase";

export default class CashListView extends ViewBase {
    private model : ExtractModel;
    private copyItem: any;
    private contentNode: cc.Node;
    private pageLabel: cc.Label;
    private nextBtn: cc.Node;
    private lastBtn: cc.Node;
    //没有数据
    private nothingNode:cc.Node;
    private itemPool: RecordingItemPool;
    private nodeList: any[] = [];
    private limit = 6
    private arrList: Array<any>
    private isRecharge: boolean
    protected initView()
    {
        // cc.log("打开界面");
        this.model = <ExtractModel>Global.ModelManager.getModel("ExtractModel");
        this.model.on(ExtractEvent.OnUpdateApplyCashList,this,this.InitCashListView);
        Global.UIHelper.addCommonClick(this.node, "nexPage", this.OnNextPagePageBtnClick, this);
        Global.UIHelper.addCommonClick(this.node, "upPage", this.OnLastPageBtnClick, this);
        this.contentNode = this.getChild("scrollview/view/content");
        this.copyItem = this.getChild("scrollview/view/content/Item");
        this.pageLabel = this.getChild("pageLabel").getComponent(cc.Label);
        //暂无任何信息
        this.nothingNode = this.getChild("Nothing");
        this.nothingNode.active = false;
        this.nextBtn = this.getChild("nexPage");
        this.lastBtn = this.getChild("upPage");
        this.copyItem.active = false;
        this.initItemPool()
        
    }
    onOpenRecharge(isRecharge: boolean = false){
        this.isRecharge = isRecharge;
        this.model.reqApplyCashList();
    }
 
    protected onDispose()
    {
        this.itemPool.resetPool()
        this.model.off(ExtractEvent.OnUpdateApplyCashList,this,this.InitCashListView);
    }
    //下一页
    OnNextPagePageBtnClick() {
        Global.Audio.playBtnSound();
        if(this.arrList.length > this.model.cashListPage * this.limit)
        {
            this.model.cashListPage++;
            this.InitCashListView();
        }else{
            this.model.reqApplyCashList(true);
        }
    }
    // 上一页
    OnLastPageBtnClick() {
        Global.Audio.playBtnSound();
        this.model.cashListPage--;
        if(this.model.cashListPage<=0)
        {
            this.model.cashListPage = 1;
            Global.UI.fastTip("已经是第一页了")
            return
        }
        this.InitCashListView();
    }
    private initItemPool(){
       
        this.itemPool = new RecordingItemPool(this.copyItem);
    }


    public recycle()
    {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    }
    InitCashListView() {
        this.arrList =  this.model.getCashListData() || [];
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
        let listCount = count - (this.model.cashListPage-1)*this.limit > this.limit?this.limit:count - (this.model.cashListPage-1)*this.limit
        this.recycle();
        for (let j=0; j< listCount; j++){
            let node = this.itemPool.getItem();
            this.nodeList.push(node);
            node.active = true;
            node.setParent(this.contentNode);
            node.getComponent("RecordingItem").Init(this.arrList[(this.model.cashListPage-1)*this.limit+j],j,this.isRecharge)
        }
        let msgFormat = "共%s条"
        let str = "第%s页"
        this.pageLabel.string = cc.js.formatStr(msgFormat,this.model.cashTotal) + cc.js.formatStr(str,this.model.cashListPage);
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