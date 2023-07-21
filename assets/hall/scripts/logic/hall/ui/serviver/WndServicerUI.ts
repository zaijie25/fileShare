import WndBase from "../../../core/ui/WndBase";
import ServicerItem from "./ServicerItem";
import { ServicerEvent } from "./ServicerEvent";
import FeedbackServiceItem from "../Feedback/FeedbackServiceItem";


export default class WndServicerUI extends WndBase
{

    private listNode: cc.Node = null;
    private itemPrefab: cc.Node = null;
    private itemList : Array<FeedbackServiceItem> = new Array();
    private itemPool : Array<FeedbackServiceItem> = new Array();



    private serviceDatas = []

    private getItem(){
        if(this.itemPool.length > 0){
            var item = this.itemPool.pop();
            item.node.setSiblingIndex(-1);
            item.node.active = true;
            return item;
        }else{
            var itemObj = cc.instantiate(this.itemPrefab);
            var item = itemObj.getComponent(FeedbackServiceItem);
            item.node.setParent(this.listNode);
            item.node.active = true;
            return item;
        }
    }

    private recoveryItem( item : FeedbackServiceItem){
        item.node.active = false;
        this.itemPool.push(item);
    }

    private clearItem(){
        this.listNode.y = 0;
        for (let index = 0; index < this.itemList.length; index++) {
            const item = this.itemList[index];
            this.recoveryItem(item);
        }
        this.itemList = [];
    }

    protected onInit()
    {
        this.name = "WndServicerUI";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/ServiceUI";
    }

    protected initView()
    {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.addCommonClick("close",this.close,this);

        this.listNode = this.getChild("ScrollView/view/ServicersNode");
        this.itemPrefab = this.getChild("ScrollView/view/ServicersNode/ServicerItem");
        if(this.itemPrefab)
        {
            this.itemPrefab.active = false
        }
    }

    onDispose()
    {
        this.itemPool = [];
        this.itemList = [];
    }

    onOpen(){
        if(this.args && this.args[0] )
        {
            this.serviceDatas = this.args[0]
            /* let res = this.args[1];
            if(res != "")
                this.titleSp.spriteFrame = Global.ResourceManager.getSprite("hall/texture/common/txtImg", res) */
        }
        else
            this.serviceDatas = [];
        
        this.updateView();
    }

    onClose(){
        this.itemPool = [];
        this.listNode.removeAllChildren();
    }

    protected updateView(){
        if(!this.serviceDatas) return;
        //
        this.clearItem();
        for (let index = 0; index < this.serviceDatas.length; index++) {
            if(!this.serviceDatas[index].type)
            {
                continue
            }
            var item = this.getItem();
            item.refreshUI(this.serviceDatas[index]);
        }
    }

   

}