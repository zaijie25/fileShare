import WndBase, { DestoryType } from "../../../core/ui/WndBase";
// import MsgModel from "./MsgModel";
import MsgModel from "../../../hallcommon/model/MsgModel"
// import { HallRedSpotType } from "../hall/HallModel";
import HallPopMsgHelper, { PopWndName } from "../../tool/HallPopMsgHelper";
import NoticeView from "./NoticeView";
import MsgView from "./MsgView"
import { MsgEvent } from "./MsgEvent";
import { HallRedSpotType } from "../../../hallcommon/model/HallModel";

class WndMsg extends WndBase{
    MsgModel: MsgModel;
 
    noticeTitle: cc.Node; //公告标题
    msgTitle: cc.Node;    //邮件标题
    noticeCheck:cc.Node;
    noticeUncheck:cc.Node;
    msgCheck:cc.Node;
    msgUncheck:cc.Node;


    noticePanel: cc.Node;   

    noticeView: NoticeView; //公告

    msgPanel:cc.Node;

    msgView:MsgView;    //邮件

    noticeUnread:cc.Node;   //公告小红点
    msgUnread:cc.Node;      //邮件小红点

    private subViewPath :any = {
        "noticeView":"hall/prefabs/ui/msg/subView/NoticePanel",
        "msgView":"hall/prefabs/ui/msg/subView/MsgPanel"
    }

    private viewKeyTypeMap :any = {
        "noticeView":NoticeView,
        "msgView":MsgView
    }


    protected onOpen(){
        // this.noticeTitle.isChecked = true;
        this.changeTitle(false);
        this.changeNoticePanel()
        this.MsgModel.on(MsgEvent.ReadMsgCallBack, this, this.checkUnread);
        this.checkUnread()
    }

    checkUnread(){
        let MailFlag = this.MsgModel.CheckIsAnyMailNotRead()
        let NoticeFlag = this.MsgModel.CheckIsAnyNoticeNotRead()
        this.msgUnread.active = MailFlag;
        this.noticeUnread.active = NoticeFlag; 

    }

    //切换公告
    changeNoticePanel(){
        // this.msgView.active = false;
        // this.noticeView.active = true;
        this.msgView.subViewState = false;
        this.noticeView.subViewState = true
        this.changeTitle(false);
    }
    //切换邮件
    changeMsgPanel(){
        // this.noticeView.active = false;
        // this.msgView.active = true;
        this.noticeView.subViewState = false;
        this.msgView.subViewState = true;
        this.changeTitle(true);
    }

    protected onInit(){
        this.name = "WndMsg";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/msg/MsgUI";
        this.MsgModel = <MsgModel>Global.ModelManager.getModel("MsgModel");
        this.destoryType = DestoryType.ChangeScene;
    }

    protected initView(){
        this.noticeTitle = this.getChild("bg1/topButton/noticeTitle");
        this.msgTitle = this.getChild("bg1/topButton/msgTitle");
        this.noticeCheck = this.getChild("bg1/topButton/noticeTitle/check");
        this.noticeUncheck = this.getChild("bg1/topButton/noticeTitle/uncheck");
        this.msgCheck = this.getChild("bg1/topButton/msgTitle/check");
        this.msgUncheck = this.getChild("bg1/topButton/msgTitle/uncheck");

        this.noticeTitle.on("click", this.changeNoticePanel, this);
        this.msgTitle.on("click", this.changeMsgPanel, this);

        this.noticeUnread = this.getChild("bg1/topButton/noticeTitle/unread");
        this.msgUnread = this.getChild("bg1/topButton/msgTitle/unread");
        this.noticeUnread.active = false;
        this.msgUnread.active = false;

        // this.noticePanel = this.getChild("NoticeNode");
        // this.noticeView = <NoticeView>this.addView("NoticeView", this.noticePanel, NoticeView);
        // this.msgPanel = this.getChild("MsgNode");
        // this.msgView = <MsgView>this.addView("MsgView",this.msgPanel,MsgView);
        this.addCommonClick("close", this.closeWnd, this);
        this.initSubViewClass(this.viewKeyTypeMap)
        this.InitScripts()
    }

    changeTitle(isMsg:boolean){
        this.msgCheck.active = isMsg;
        this.msgUncheck.active = !isMsg;
        this.noticeCheck.active = !isMsg;
        this.noticeUncheck.active = isMsg;
    }

    async InitScripts() {
        await this.initSubView(this.subViewPath,this.viewKeyTypeMap,this.getChild("contentNode"))
    }
   
    protected onClose() {
        let MailFlag = this.MsgModel.CheckIsAnyMailNotRead()
        let NoticeFlag = this.MsgModel.CheckIsAnyNoticeNotRead()
        if (MailFlag || NoticeFlag) {
            Global.Event.event(GlobalEvent.ShowRedSpot, [false, HallRedSpotType.Mail]);
        }else {
            Global.Event.event(GlobalEvent.CloseRedSpot, HallRedSpotType.Mail);
        }
        this.MsgModel.off(MsgEvent.ReadMsgCallBack, this, this.checkUnread);
        HallPopMsgHelper.Instance.releaseLock(PopWndName.Mail);

    }

    private closeWnd(){
        this.close();
    }

    protected onDispose(){
    }
    
    
}
export default WndMsg