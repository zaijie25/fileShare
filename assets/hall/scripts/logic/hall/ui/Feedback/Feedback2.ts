import ViewBase from "../../../core/ui/ViewBase";
import RightPanelView from "./RightPanelView";
import FeedbackModel from "../../../hallcommon/model/FeedbackModel";
import { FeedbackConstants, RightViewType } from "./FeedbackConstants";
import AbsServicer from "./AbsServicer";


export default class Feedback2 extends ViewBase {

    // private isShowOrEdit: number = 0; //0为立即反馈可编辑问题，1为展示详情
    quickQuestionItem: cc.Node;
    quickQuestionArea: cc.Node; 
    isOpen: boolean = false;
    tips: string[] = ["1. 充值问题","2. 提现问题","3. 活动优惠","4. 代理问题","5. 游戏相关","6. 其他问题"];
    public server : AbsServicer = null;
    public order : number = -1;
    protected initView(){
        this.quickQuestionArea = this.getChild("quickQuestion"); 
        this.quickQuestionItem = this.getChild("quickQuestion/item");
        this.tips.forEach(e => {
            let item: cc.Node = cc.instantiate(this.quickQuestionItem);
            item.active = true;
            item.getChildByName("label").getComponent(cc.Label).string = e;
            this.quickQuestionArea.addChild(item);
            item.on(cc.Node.EventType.TOUCH_END, this.itemClick, this);
            });
    }

    // public setShowOrEdit(isShowOrEdit: number){
    //     this.isShowOrEdit = isShowOrEdit;
    // }
    protected onOpen(){
        // if(this.isShowOrEdit == 1){
        //     this.quickQuestionArea.active = false;
        // }else if(this.isShowOrEdit == 0){
        //     this.quickQuestionArea.active = false;
        // }
        // this.addCommonClick("bottom/commitBtn", this.commitOrBack, this);
    }

    itemClick(event){
        this.quickQuestion();
    }

    quickQuestion(){
        this.server.acceptService(this.order);
        // let rightPanelView = <RightPanelView>Global.UI.getWindow("WndFeedback").getView("RightPanelView");
        // let write:FeedbackShowAndWriteView = <FeedbackShowAndWriteView>rightPanelView.getView("feedbackShowAndWrite");
        // write.setShowOrEdit(0);
        // rightPanelView.changeView(RightViewType.feedbackShowAndWrite);
    }

    

    onClose(){

    }



}
