import { MsgEvent, MsgType } from "./MsgEvent";
import PoolBase from "../../../core/tool/PoolBase";
import ViewBase from "../../../core/ui/ViewBase";
import MsgModel from "../../../hallcommon/model/MsgModel";
import WaitingView from "../waiting/WaitingView";

export default class MsgView extends ViewBase{
    MsgModel: MsgModel;
    contentNode: any;
    copyItem: any;
    contentTxt:cc.Label;
    fromTxt:cc.Label;
    timeTxt:cc.Label;
    selectId:number;
    deleteBtn: cc.Node;
    leftPanel: cc.Node;
    rightPanel: cc.Node;
    timerID: any;
    flag:boolean
    NoEmail:cc.Node
    msgType :number
    itemPool: MailItemPool;
    deleteTimer:any;
    deleteFlag = true
    nodeList: any[] = [];
    private waitingNode :cc.Node;
    protected onSubViewShow(){
        this.waitingNode.active = true;
        this.MsgModel.on(MsgEvent.MsgListCallback, this, this.RefreshLeftPanel);
        this.MsgModel.on(MsgEvent.ReadMsgCallBack, this, this.RefreshInfoPanel);
        this.MsgModel.on(MsgEvent.DeleteMsgCallback, this, this.OnDeleteMail);
        this.flag = true
        this.InitData()
    }


    InitData() {
        let data = this.MsgModel.GetDataByType(this.msgType);
        if(data)
        {
            this.RefreshLeftPanel(data)
        }
        else
        {
            this.MsgModel.GetMsgList(this.msgType)
        }
    }

    OnDeleteMail(data: any) {
        Global.UI.fastTip("删除成功");
        this.ReSetRightPanel()
        this.RefreshLeftPanel(this.MsgModel.GetDataByType(this.msgType))

    }

    private initItemPool(){
       
        this.itemPool = new MailItemPool(this.copyItem);
    }

    protected initView(){
        this.copyItem = this.getChild("LeftPanel/MsgItem");
        this.leftPanel = this.getChild("LeftPanel");
        this.rightPanel = this.getChild("RightPanel");
        this.contentNode = this.getChild("LeftPanel/scrollview/view/content");

        let tmpContentTxt = this.getChild("RightPanel/scrollview/view/content/Content");
        this.contentTxt = tmpContentTxt.getComponent(cc.Label);
        this.contentTxt.string = ""

        let tmpFromTxt = this.getChild("RightPanel/from");
        this.fromTxt = tmpFromTxt.getComponent(cc.Label);
        this.fromTxt.string = ""
        let tmpTimeTxt = this.getChild("RightPanel/time");
        this.timeTxt = tmpTimeTxt.getComponent(cc.Label);
        this.timeTxt.string = ""
        this.deleteBtn = this.getChild("RightPanel/DeleteButton");
        this.deleteBtn.active = false
        this.addCommonClick("RightPanel/DeleteButton", this.DeleteMail, this);
        this.NoEmail = this.getChild("NoMail")
        this.NoEmail.active = false
        this.MsgModel = <MsgModel>Global.ModelManager.getModel("MsgModel");
        this.msgType = MsgType.Mail
        this.initItemPool();
        this.waitingNode = WaitingView.initWaitingView(this.node,cc.v2(120,0));

    }
    DeleteMail() {
        if(!this.deleteFlag)
        {
            Global.UI.fastTip("您的操作太频繁，请稍后重试")
            return
        }
        this.deleteFlag = false
        this.MsgModel.DelMail(this.selectId);
        this.deleteTimer = setTimeout(() => {
            this.deleteFlag = true
        }, 1000);
        
    }

   
    protected onSubViewHide() {
        this.ReSetRightPanel()
        this.MsgModel.off(MsgEvent.MsgListCallback, this, this.RefreshLeftPanel);
        this.MsgModel.off(MsgEvent.ReadMsgCallBack, this, this.RefreshInfoPanel);
        this.MsgModel.off(MsgEvent.DeleteMsgCallback, this, this.OnDeleteMail);
        this.selectId = 0;

        // let MsgFlag = this.MsgModel.CheckIsAnyMailNotRead()
        // if (MsgFlag) {
        //     Global.Event.event(GlobalEvent.ShowRedSpot, [false, HallRedSpotType.Mail]);
        // }
        // else {
        //     Global.Event.event(GlobalEvent.CloseRedSpot, HallRedSpotType.Mail);
        // }
    }

    RefreshLeftPanel(msg:any)
    {
        if(msg == null)
        {
            this.waitingNode.active = false;
            this.NoEmail.active = true
            this.leftPanel.active =false
            this.rightPanel.active =false
            return
        }
        this.recycle()
        if( msg.mail.length===0)
        {
            this.waitingNode.active = false;
            this.NoEmail.active = true
            this.leftPanel.active =false
            this.rightPanel.active =false
            return;
        }
        
        let arr: Array<any> = msg.mail || [];

        let count =arr.length;

        this.leftPanel.active = true;
        this.rightPanel.active = true;
        this.NoEmail.active = false
        this.deleteBtn.active = true
        
        for (let j = 0; j < count; j++) {
            let imageItem = this.itemPool.getItem()
            imageItem.name = String(arr[j].id);
            imageItem.setParent(this.contentNode)
            this.nodeList.push(imageItem);
            if (j === 0) {
                imageItem.getComponent("MsgItem").SetToggleChecked(true)
                imageItem.getComponent("MsgItem").node.name = String(arr[j].id);
                this.selectId = arr[j].id
            }
            imageItem.active = true;
            imageItem.on(cc.Node.EventType.TOUCH_END, this.imageItemClick, this)
            imageItem.getComponent("MsgItem").onInit(arr[j])
        }
        
        let gameData = arr[0]
        if(gameData )
        {
            this.MsgModel.ReadMsg(gameData.id,this.msgType,gameData.red_status,)
        }
            
        
    }
    imageItemClick(event) {
        this.waitingNode.active = true;
        Global.Audio.playBtnSound();
        let item = event.target;
        let gameListItem = item.getComponent("MsgItem")
        let gameData = gameListItem.getGameData()
        this.selectId = gameData.id;
        let data = this.MsgModel.GetContentByID(this.msgType,this.selectId)
        if(data)
        {
            this.RefreshInfoPanel(data)
            return
        }
        this.MsgModel.ReadMsg(gameData.id,this.msgType,gameData.red_status,)
    }
    RefreshInfoPanel(data:any){
        this.waitingNode.active = false;
        this.contentTxt.string = "\r\n"+ Global.Toolkit.removeEmoji(data.content)  || "";
        this.timeTxt.string = data.send_time || ""
        this.fromTxt.string = Global.Toolkit.substrEndWithElli(data.from,16) || ""//data.from || ""
        this.RefreshLeftItem(data);
    }
    
    RefreshLeftItem(data:any)
    {
        let node = cc.find(String(data.id),this.contentNode)
        if(node && node.isValid)  
        {
            node.getComponent("MsgItem").SetUnReadActiveState(false)
        }   
        
    }
    
    ReSetRightPanel()
    {
        this.contentTxt.string = "";
        this.timeTxt.string = ""
        this.fromTxt.string =""
    }

    protected onDispose()
    {
        if (this.itemPool)
            this.itemPool.resetPool()
        this.nodeList = [];
        if(this.deleteTimer)
        {
            clearTimeout(this.deleteTimer)
        }
    }
    
    public recycle()
    {
        if (this.itemPool)
            this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    }
    
    
}

class MailItemPool extends PoolBase{
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