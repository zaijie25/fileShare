import ViewBase from "../../../core/ui/ViewBase";
import FeedbackView from "./FeedbackView";
import ServiceView from "./ServiceView";
import FeedbackShowAndWriteView from "./FeedbackShowAndWriteView";
import { RightViewType } from "./FeedbackConstants";
import Feedback2 from "./Feedback2";




export default class RightPanelView extends ViewBase {

    //view1: ViewBase;
    view2: ViewBase;
    view3: ViewBase;
    view4: ViewBase;
    node5: cc.Node;
    noMsgTips: cc.Node;
    //view6: ViewBase;
    view7: ViewBase;
    rightPage: any[] = [];
    //view8: ViewBase;
    protected initView(){
        //let node1 = this.getChild("feedback");
        let node2 = this.getChild("onlineService");
        let node3 = this.getChild("wxService");
        let node4 = this.getChild("qqService");
        this.node5 = this.getChild("FQA");
        //let node6 = this.getChild("feedbackWrite");
        let node7 = this.getChild("atService");
        //let node8 = this.getChild("feedback2");
        //this.view1 = this.addView("feedback",node1,FeedbackView);
        this.view2 = this.addView("onlineService",node2,ServiceView);
        this.view3 = this.addView("wxService",node3,ServiceView);
        this.view4 = this.addView("qqService",node4,ServiceView);
        //this.view6 = this.addView("feedbackShowAndWrite",node6,FeedbackShowAndWriteView);
        this.view7 = this.addView("atService",node7,ServiceView);
        //this.view8 = this.addView("feedback2",node8,Feedback2);
        this.noMsgTips = this.getChild("noMsgTips");

        //this.rightPage.push(this.view1);
        this.rightPage.push(this.view2);
        this.rightPage.push(this.view3);     
        this.rightPage.push(this.view4);
        this.rightPage.push(this.node5);
        //this.rightPage.push(this.view6);
        this.rightPage.push(this.view7);
        //this.rightPage.push(this.view8);
        this.rightPage.push(this.noMsgTips);
    }

   

    public changeView(viewType: number){
        this.rightPage.forEach(element => {
            if(element)
            {
                element.subViewState = false;
                element.active = false
            }
        });
       
        switch(viewType){
            // case RightViewType.feedback:
            //         this.view1.subViewState=true;
            //     break;
            case RightViewType.onlineService:
                    this.view2.subViewState=true;
                break;
            case RightViewType.wxService:
                    this.view3.subViewState=true;
                break;
            case RightViewType.qqService:
                    this.view4.subViewState=true;
                break;
            case RightViewType.FQA:
                    this.node5.active=true;
                break;
            // case RightViewType.feedbackShowAndWrite:
            //         this.view6.subViewState=true;
            //     break;
            case RightViewType.atService:
                    this.view7.subViewState=true;
                break;
            case RightViewType.noMsgTips:
                    this.noMsgTips.active=true;
                break;
            // case RightViewType.feedback2:
            //         this.view8.subViewState=true;
            //     break;
                
        }
    }

    public showNotips(isShow: boolean){
        this.noMsgTips.active = isShow;
    }

    onSubViewHide(){
        this.rightPage.forEach(element => {
            element.active = false;
        });
    }

}


