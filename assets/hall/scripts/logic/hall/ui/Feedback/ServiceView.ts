import ViewBase from "../../../core/ui/ViewBase";
import ServicerModel from "../../../hallcommon/model/ServicerModel";
import { ServicerEvent } from "../serviver/ServicerEvent";
import ServicerItem from "../serviver/ServicerItem";
import RightPanelView from "./RightPanelView";
import { RightViewType } from "./FeedbackConstants";
import ServicerFactory from "./ServicerFactory";
import AbsServicer from "./AbsServicer";




export default class ServiceView extends ViewBase {

    // private model : ServicerModel;
    listNode: cc.Node = null;
    serviceItem: cc.Node = null;
    // nameLabel: cc.Node = null;
    scrollView:cc.ScrollView;
    private serviceDatas = [];
    private itemList : Array<ServicerItem> = new Array();
    private itemPool : Array<ServicerItem> = new Array();

    protected initView(){
        
        // this.model = <ServicerModel>Global.ModelManager.getModel("ServicerModel");
        this.listNode = this.getChild("scrollView/view/content");
        this.serviceItem = this.getChild("service_item");
        // this.nameLabel = this.getChild("service_item/nameLabel");
        this.scrollView = this.getComponent("scrollView",cc.ScrollView);
        this.scrollView.enabled = true;
    }

    protected onSubViewShow(){
        const factory:ServicerFactory = ServicerFactory.getInstance();
        let serObj:AbsServicer = factory.getEntity(this.viewKey);
        if(serObj.isEmptyInfo()){
            this.showNoMsgTip();
            return;
        }
        this.serviceDatas = serObj.initServicerData();
        this.updateView(serObj);
        // this.model.on(ServicerEvent.OnUpdateServicerView,this,this.updateView);
    }

    showNoMsgTip(){
        let rightPanelView = <RightPanelView>Global.UI.getWindow("WndFeedback").getView("RightPanelView");
        rightPanelView.changeView(RightViewType.noMsgTips);
    }

    onSubViewHide(){
        // this.model.off(ServicerEvent.OnUpdateServicerView,this,this.updateView);
        // this.listNode.removeAllChildren(true);
        this.serviceDatas=[];
    }

    protected updateView(data: AbsServicer){
        this.clearItem();
        //生成item
        for (let index = 0; index < this.serviceDatas.length; index++) {
            let item = this.getItem();
            let itemObj = item.getComponent(ServicerItem);
            // itemObj.setData(this.serviceDatas[index]);
            //itemObj.setData2(index,data);
            this.itemList.push(itemObj);
        }
        this.scrollView.scrollToLeft();
    }

    private getItem(){
        if(this.itemPool.length > 0){
            let item = this.itemPool.pop();
            item.node.setSiblingIndex(-1);
            item.node.active = true;
            return item;
        }else{
            let item = cc.instantiate(this.serviceItem);
            item.setParent(this.listNode);
            item.active = true;
            return item;
        }
    }

    private clearItem(){
        this.listNode.y = 0;
        for (let index = 0; index < this.itemList.length; index++) {
            const item = this.itemList[index];
            this.recoveryItem(item);
        }
        this.itemList = [];
    }

    private recoveryItem( item : ServicerItem){
        item.reset();
        item.node.active = false;
        this.itemPool.push(item);
    }

    


}
