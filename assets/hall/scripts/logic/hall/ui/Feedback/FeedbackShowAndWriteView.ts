import ViewBase from "../../../core/ui/ViewBase";
import RightPanelView from "./RightPanelView";
import FeedbackModel from "../../../hallcommon/model/FeedbackModel";
import { FeedbackConstants, RightViewType } from "./FeedbackConstants";




export default class FeedbackShowAndWriteView extends ViewBase {

    private isShowOrEdit: number = 0; //0为立即反馈可编辑问题，1为展示详情
    quickQuestionItem: cc.Node;
    quickQuestionArea: cc.Node; 
    questionEdit: cc.EditBox;
    questionShow: cc.Label;
    answerText: cc.Label;
    quickQuestionBtn: cc.Node;
    commitBtn: cc.Node;
    //取消图标
    cancelBtn:cc.Node;
    model: FeedbackModel;
    isOpen: boolean = false;
    tips: string[] = ["代理出错了","充值不到账","进不去游戏","提现不成功","绑不了手机","玩游戏很卡","看不见游戏"];

    protected initView(){
        this.questionEdit = this.getChild("box/questionEditBox").getComponent(cc.EditBox);
        this.questionShow = this.getChild("box/questionShowBox").getComponent(cc.Label);
        this.quickQuestionArea = this.getChild("bottom/quickQuestion"); 
        this.quickQuestionItem = this.getChild("bottom/quickQuestion/item");
        this.answerText = this.getChild("box/answerText").getComponent(cc.Label);
        this.quickQuestionBtn = this.getChild("bottom/btnNode");
        this.commitBtn = this.getChild("bottom/commitBtn");
        this.cancelBtn = this.getChild("bottom/cancelNode");
        this.addCommonClick("bottom/btnNode", this.quickQuestion, this);
        this.addCommonClick("bottom/commitBtn", this.commitOrBack, this);
        this.addCommonClick("bottom/cancelNode", this.backAction, this);
        this.tips.forEach(e => {
            let item: cc.Node = cc.instantiate(this.quickQuestionItem);
            item.active = true;
            item.getChildByName("label").getComponent(cc.Label).string = e;
            this.quickQuestionArea.addChild(item);
            item.on(cc.Node.EventType.TOUCH_END, this.itemClick, this);
            });
        this.model = <FeedbackModel>Global.ModelManager.getModel("FeedbackModel");
    
    }

    public setShowOrEdit(isShowOrEdit: number){
        this.isShowOrEdit = isShowOrEdit;
    }

    public setData(...para){
        this.questionShow.string = para[0];
        this.answerText.string = para[1];
    }

    protected onSubViewShow(){
        if(this.isShowOrEdit == 1){
            this.questionEdit.node.active = false;
            this.questionShow.node.active = true;
            this.quickQuestionArea.active = false;
            this.answerText.node.active = true;
            this.quickQuestionBtn.active = false;
            this.cancelBtn.active = true;
            this.commitBtn.active = false;
        }else if(this.isShowOrEdit == 0){
            this.questionEdit.node.active = true;
            this.questionShow.node.active = false;
            this.quickQuestionArea.active = false;
            
            this.answerText.node.active = false;
            this.quickQuestionBtn.active = true;
            this.cancelBtn.active = false;
            this.commitBtn.active = true;
            this.model.on(FeedbackConstants.DealFeedbackCommit, this, this.dealCommitCallback);
        }
        // this.addCommonClick("bottom/commitBtn", this.commitOrBack, this);
    }

    itemClick(event){
        this.questionEdit.string = event.target.getChildByName("label").getComponent(cc.Label).string;
        this.quickQuestion();
    }

    quickQuestion(){
        if(this.isOpen){
            this.quickQuestionArea.active = false;
        }else{
            this.quickQuestionArea.active = true;
        }
        this.isOpen = !this.isOpen;
    }

    backAction(){
        if(this.isShowOrEdit == 1){
            //返回
            this.questionShow.string ="";
            this.answerText.string = "";
            let rightPanelView = <RightPanelView>Global.UI.getWindow("WndFeedback").getView("RightPanelView");
            rightPanelView.changeView(RightViewType.feedback);
        }
    }
    commitOrBack(){
        if(this.isShowOrEdit == 0){
            let question = this.questionEdit.string;
            if(question.trim()==""||!question){
                Global.UI.fastTip("提交内容为空！");
                return;
            }
            var para={
                type: 0 ,//0 提交 1删除
                problem: question,//问题 0的时候
                id: 0  //1的时候
            };
            this.model.dealFeedback(para,this.model.responePage);
        }
       
    }
    dealCommitCallback(){
        this.questionEdit.string = "";
        let rightPanelView = <RightPanelView>Global.UI.getWindow("WndFeedback").getView("RightPanelView");
        rightPanelView.changeView(RightViewType.feedback);
    }

    onSubViewHide(){
        if(this.isShowOrEdit == 0){
            this.model.off(FeedbackConstants.DealFeedbackCommit, this, this.dealCommitCallback);
        }
    }



}
