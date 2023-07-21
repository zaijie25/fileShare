import ModelBase from "../../../framework/model/ModelBase";
import {NetAppface} from "../../core/net/hall/NetEvent"
import { FeedbackConstants } from "../../hall/ui/Feedback/FeedbackConstants";
import RightPanelView from "../../hall/ui/Feedback/RightPanelView";
import FeedbackView from "../../hall/ui/Feedback/FeedbackView";

export default class FeedbackModel extends ModelBase{


    private total: number;
    public totalPage: number;
    public responePage: number;
    private limit: number = 5;
    // private data: Array<any>=[];

    public get Name(){
        return "FeedbackModel";
    }

    public GetProblemList(curPage:number, isFromHall :boolean = false, isFresh :boolean=false,showwaiting :boolean = false){
        Global.HallServer.send(NetAppface.mod, NetAppface.GetProblem, {limit:this.limit,page:curPage},(msg) =>{
            let data = msg.data;
            this.responePage = msg.page;
            this.total = msg.total;
            this.totalPage = Math.ceil(this.total/this.limit);
            this.event(FeedbackConstants.FeedbackListCallback,data);
            
        },this.SpreadErronFunc.bind(this), showwaiting);
    }

    /**
     * 
     * @param param 
     * {
     *  "type":  //0 提交 1删除
	 *	"problem":"222212" //问题 0的时候
     *	"id": 1的时候
     *  }
     *     
     */
    public dealFeedback(param, dealPage: number){
        Global.HallServer.send(NetAppface.mod, NetAppface.SetProblem, param,(msg) =>{
            // let ss=msg;
            if(param.type==0){
                this.event(FeedbackConstants.DealFeedbackCommit);
            }else if(param.type==1){
                let rightPanelView = <RightPanelView>Global.UI.getWindow("WndFeedback").getView("RightPanelView");
                let feedback = <FeedbackView>rightPanelView.getView("feedback");
                feedback.clearItem(true);
                this.GetProblemList(dealPage);
            }
        },this.SpreadErronFunc.bind(this));
    }
    
    private SpreadErronFunc( data : any ){
        if(data._errstr != null){
            Global.UI.fastTip(data._errstr);
            return false;
        }
        return true;
    }
    

}