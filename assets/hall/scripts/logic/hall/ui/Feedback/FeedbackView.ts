import ViewBase from "../../../core/ui/ViewBase";
import RightPanelView from "./RightPanelView";
import FeedbackShowAndWriteView from "./FeedbackShowAndWriteView";
import FeedbackModel from "../../../hallcommon/model/FeedbackModel";
import { FeedbackConstants, RightViewType } from "./FeedbackConstants";
import FeedbackListItem from "./FeedbackListItem";




export default class FeedbackView extends ViewBase {

    feedbackItem: cc.Node;
    content: cc.Node;
    label1: cc.Label;
    label2: cc.Label;
    pageLabel: cc.Label;
    model: FeedbackModel;
    private currentPage: number = 1;


    protected initView(){
        
        this.feedbackItem = this.getChild("feedbackItem");
        this.label1 = cc.find("label1",this.feedbackItem).getComponent(cc.Label);
        this.label2 = cc.find("label2",this.feedbackItem).getComponent(cc.Label);
        this.content = this.getChild("content");
        this.pageLabel = this.getChild("bottom/currentPage/pageLabel").getComponent(cc.Label);
        this.addCommonClick("bottom/btnNode", this.writeFeedback, this);
        this.addCommonClick("bottom/previous", this.previousPage, this);
        this.addCommonClick("bottom/next", this.nextPage, this);
        this.model = <FeedbackModel>Global.ModelManager.getModel("FeedbackModel");
    }

   
    protected onSubViewShow(){
        this.model.on(FeedbackConstants.FeedbackListCallback, this, this.refreshFeedbackList);
        this.model.GetProblemList(this.currentPage);
    }

    private refreshFeedbackList(data){
        let rightPanelView = <RightPanelView>Global.UI.getWindow("WndFeedback").getView("RightPanelView");
        this.currentPage = this.model.responePage; 
        if(!data||data.length == 0){
            if(this.currentPage == 1){
                this.pageLabel.string = 1+"/"+1;
                rightPanelView.showNotips(true);
                
                return;
            }else{
                this.model.GetProblemList(--this.currentPage);
            }
        }
        rightPanelView.showNotips(false);
        this.pageLabel.string = this.currentPage+"/"+this.model.totalPage;
        for(let i=0; i< data.length; i++){
            let item:cc.Node = cc.instantiate(this.feedbackItem);
            item.active = true;
            let feedItem = item.getComponent(FeedbackListItem);
            feedItem.onInit(data[i],this.model.responePage);
            this.content.addChild(item);
        }
        
    }

    writeFeedback(){
        let rightPanelView = <RightPanelView>Global.UI.getWindow("WndFeedback").getView("RightPanelView");
        let write:FeedbackShowAndWriteView = <FeedbackShowAndWriteView>rightPanelView.getView("feedbackShowAndWrite");
        write.setShowOrEdit(0);
        rightPanelView.changeView(RightViewType.feedbackShowAndWrite);
    }

    previousPage(){
        if(this.currentPage > 1){
            this.currentPage--;
            this.pageLabel.string = this.currentPage+"/"+this.model.totalPage;
            this.clearItem();
            this.model.GetProblemList(this.currentPage);
        }else{
            Global.UI.fastTip("已经是第一页了");
        }
    }

    nextPage(){
        if(this.currentPage<this.model.totalPage){
            this.currentPage++;
            this.pageLabel.string = this.currentPage+"/"+this.model.totalPage;
            this.clearItem();
            this.model.GetProblemList(this.currentPage);
        }else{
            Global.UI.fastTip("当前已经是最大页！");
        }
    }

    clearItem(isRest: boolean=false){
        this.content.removeAllChildren();
        if(isRest){
            this.currentPage = 1;
            this.pageLabel.string = this.currentPage+"/"+this.model.totalPage;
        }
    }

    onSubViewHide(){
        this.model.off(FeedbackConstants.FeedbackListCallback, this, this.refreshFeedbackList);
        this.clearItem();
    }



}
