import RightPanelView from "./RightPanelView";
import FeedbackShowAndWriteView from "./FeedbackShowAndWriteView";
import { RightViewType } from "./FeedbackConstants";



const {ccclass, property} = cc._decorator;

@ccclass
export default class FeedbackListItem extends cc.Component {

    @property(cc.Label)
    label1: cc.Label = null;

    @property(cc.Label)
    label2: cc.Label = null;

    /* @property(cc.Sprite)
    Unread: cc.Sprite = null;
    @property(cc.Sprite)
    CheckSprite: cc.Sprite = null;
    @property(cc.Sprite)
    UnCheckSprite: cc.Sprite = null;
    */
    gameData: any; 
    private id: number;
    private status: number; //0为未读1已读2已回复
    // private problem: string;
    private answer: string;
    dealpage: number;


    close(){
        this.node.active = false;
    }
    // update (dt) {}
    public getGameData() {
        return this.gameData;
    }
    public onInit(data: any,responePage: number) {
        this.gameData = data;
        this.dealpage = responePage;
        this.initView();
    }
    initView() {
        this.id = this.gameData.id;
        this.status = this.gameData.status;
        this.label1.string = "问题"+this.gameData.problem_id;
        let problem:string = this.gameData.problem;
        let prob = problem.split("\n");
        if(prob.length>0){
            this.label2.string = Global.Toolkit.substrEndWithElli(prob[0],24);
        }else{
            this.label2.string = Global.Toolkit.substrEndWithElli(problem,24);
        }
        this.answer = this.gameData.answer;
        /* this.BackgroundTxt.string =  this.gameData;
        this.CheckTxt.string = this.gameData;
        this.toggle.isChecked =false
        this.toggle.uncheck() */
    }

    deleteItemByID(){
        // let id =
        Global.Audio.playBtnSound();
        var para={
            type: 1 ,//0 提交 1删除
	 	    problem: "" ,//问题 0的时候
     	    id: this.id  //1的时候
        };
        Global.ModelManager.getModel("FeedbackModel").dealFeedback(para,this.dealpage);
    }

    openReplayDetail(){
        // this.id
        Global.Audio.playBtnSound();
        let rightPanelView = <RightPanelView>Global.UI.getWindow("WndFeedback").getView("RightPanelView");
        let replay:FeedbackShowAndWriteView = <FeedbackShowAndWriteView>rightPanelView.getView("feedbackShowAndWrite");
        replay.setShowOrEdit(1);
        replay.setData(this.gameData.problem,this.answer);
        rightPanelView.changeView(RightViewType.feedbackShowAndWrite);
    }
    /* public SetBackgroundChecked(state:boolean){
        this.CheckSprite.node.active = state
        this.UnCheckSprite.node.active = !state
      
    }
    
    public SetUnReadActiveState(state:boolean){
        this.Unread.node.active = state
    } */
}
