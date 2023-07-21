import { MsgEvent, MsgType } from "./MsgEvent";
import PoolBase from "../../../core/tool/PoolBase";
import HallPopMsgHelper, { PopWndName } from "../../tool/HallPopMsgHelper";
import ViewBase from "../../../core/ui/ViewBase";
import { ActivityConstants } from "../Activity/ActivityConstants";
import MsgModel from "../../../hallcommon/model/MsgModel";
import WaitingView from "../waiting/WaitingView";

export default class NoticeView extends ViewBase {

    MsgModel: MsgModel;
    contentNode: cc.Node;
    copyItem: any;
    layout: cc.Layout;
    contentTxt: cc.Label;
    fromTxt: cc.Label;
    timeTxt: cc.Label;
    selectId: number;
    timerID: any;
    Sprite: cc.Sprite
    noMsgTips: cc.Node;
    // rightBg: cc.Node;
    msgType: number
    itemPool: NoticeItemPool;
    nodeList: any[] = [];
    private waitingNode :cc.Node;
    protected onSubViewShow(){
    	this.waitingNode.active = true;
        this.MsgModel.on(MsgEvent.NoticeListCallback, this, this.RefreshLeftPanel);
        this.MsgModel.on(MsgEvent.ReadMsgCallBack, this, this.RefreshInfoPanel);

        this.MsgModel.SetStatus(null)
        this.InitData()
    }

    /* public openAnimFinish() {
        this.InitData()
    } */

    InitData() {
        let data = this.MsgModel.GetDataByType(this.msgType);
        if (data) {
            this.RefreshLeftPanel(data)
        }
        else {
            this.MsgModel.GetMsgList(this.msgType)
        }
    }

    protected initView() {
        this.copyItem = this.getChild("LeftPanel/MsgItem");
        this.contentNode = this.getChild("LeftPanel/scrollview/view/content");
        this.layout = this.contentNode.getComponent(cc.Layout)

        let tmpContentTxt = this.getChild("RightPanel/scrollview/view/content/Content");
        this.contentTxt = tmpContentTxt.getComponent(cc.Label);
        this.contentTxt.string = ""
        let tmpFromTxt = this.getChild("RightPanel/from");
        this.fromTxt = tmpFromTxt.getComponent(cc.Label);
        this.fromTxt.string = ""

        let tmpTimeTxt = this.getChild("RightPanel/time");
        this.timeTxt = tmpTimeTxt.getComponent(cc.Label);
        this.timeTxt.string = ""
        this.Sprite = this.getChild("RightPanel/maskSprite/SpriteItem").getComponent(cc.Sprite);
        this.noMsgTips = this.getChild("noMsgTips");
        this.noMsgTips.active = false;
        /* this.addCommonClick("close", this.closeWnd, this);
        this.rightBg = this.getChild("bg");
        this.rightBg.active = false; */
        this.MsgModel = <MsgModel>Global.ModelManager.getModel("MsgModel");
        this.msgType = MsgType.Notice
        this.initItemPool();
        this.waitingNode = WaitingView.initWaitingView(this.node,cc.v2(120,0));
    }

    private initItemPool() {

        this.itemPool = new NoticeItemPool(this.copyItem);
    }

    RefreshLeftPanel(msg: any) {
        if (msg == null) {
            this.copyItem.active = false;
            this.noMsgTips.active = true;
            this.waitingNode.active = false;
            // this.rightBg.active = false;
            return
        }
        this.recycle()
        if (msg.notice.length === 0) {
            this.waitingNode.active = false;
            this.copyItem.active = false;
            this.noMsgTips.active = true;
            // this.rightBg.active = false;
            return;
        }


        let arr: Array<any> = msg.notice || [];
        let count = arr.length;
        this.noMsgTips.active = false;
        for (let j = 0; j < count; j++) {
            let imageItem = this.itemPool.getItem();
            imageItem.name = String(arr[j].id);
            imageItem.setParent(this.contentNode)
            this.nodeList.push(imageItem);
            if (j === 0) {
                imageItem.getComponent("FeedbackLeftItem").SetToggleChecked(true)
                imageItem.getComponent("FeedbackLeftItem").node.name = String(arr[j].id);
                this.selectId = arr[j].id
            }
            imageItem.active = true;
            imageItem.on(cc.Node.EventType.TOUCH_END, this.imageItemClick, this)
            let imgItem = imageItem.getComponent("FeedbackLeftItem")
            imgItem.onInit(arr[j].title)
            imgItem.entityData = arr[j];
        }

        let gameData = arr[0]
        if (gameData) {
            this.MsgModel.ReadMsg(gameData.id, this.msgType, gameData.red_status)
        }


    }
    imageItemClick(event) {
        this.waitingNode.active = true;
        Global.Audio.playBtnSound();
        let item = event.target;
        let gameListItem = item.getComponent("FeedbackLeftItem")
        let gameData = gameListItem.entityData;
        this.selectId = gameData.id;
        this.ReSetRightPanel()
        let data = this.MsgModel.GetContentByID(this.msgType, this.selectId)
        if (data) {
            this.RefreshInfoPanel(data)
            return
        }
        // Global.Event.event(ActivityConstants.SHOW_ACT_WAITTING, true)
        this.MsgModel.ReadMsg(gameData.id, this.msgType, gameData.red_status)
    }
    RefreshInfoPanel(data: any) {
        this.waitingNode.active = false;
        this.ReSetRightPanel()
        this.contentTxt.string = "\r\n" + Global.Toolkit.removeEmoji(data.content) || "";
        this.timeTxt.string = data.send_time || ""
        this.fromTxt.string = data.from || ""
        this.Sprite.spriteFrame = null
        Global.Event.event(ActivityConstants.SHOW_ACT_WAITTING, false)
        let self = this
        if (data.back_url != null && !Global.Toolkit.isEmptyObject(data.back_url)) {
            this.contentTxt.string = ""
            this.timeTxt.string =  ""
            this.fromTxt.string =  ""
            if (CC_JSB) {
                Global.Event.event(ActivityConstants.SHOW_ACT_WAITTING, true)
                Global.Toolkit.LoadPicToNative(Global.Toolkit.DealWithUrl(data.back_url), Global.Toolkit.DealWithUrl(data.back_url), (texture:cc.Texture2D) => {
                    if(self.selectId != data.id)
                    {
                        return
                    }
                   
                    if(self.node && self.node.isValid)
                    {
                        var frame = new cc.SpriteFrame(texture);
                        self.Sprite.sizeMode =  cc.Sprite.SizeMode.CUSTOM
                        self.Sprite.node.width = 750
                        self.Sprite.node.height = 480
                        self.Sprite.spriteFrame = frame
                        Global.Event.event(ActivityConstants.SHOW_ACT_WAITTING, false)

                    }
                })
            }
            else {
                Global.Event.event(ActivityConstants.SHOW_ACT_WAITTING, true)
                cc.assetManager.loadRemote(data.back_url, { ext: '.png' }, function (err, texture:cc.Texture2D) {
                    
                    if(self.selectId != data.id)
                    {
                        return
                    }
                    if(self.node && self.node.isValid)
                    {
                        var frame = new cc.SpriteFrame(texture);
                        self.Sprite.sizeMode =  cc.Sprite.SizeMode.CUSTOM
                        self.Sprite.node.width = 750
                        self.Sprite.node.height = 480
                        self.Sprite.spriteFrame = frame
                        Global.Event.event(ActivityConstants.SHOW_ACT_WAITTING, false)
                    }
                })
            }

        }
        this.RefreshLeftItem(data);

    }


    protected onSubViewHide() {
        this.MsgModel.off(MsgEvent.NoticeListCallback, this, this.RefreshLeftPanel);
        this.MsgModel.off(MsgEvent.ReadMsgCallBack, this, this.RefreshInfoPanel);
        HallPopMsgHelper.Instance.releaseLock(PopWndName.Notice);
        this.selectId = 0;
        // let MsgFlag = this.MsgModel.CheckIsAnyNoticeNotRead()
        // if (MsgFlag) {
        //     Global.Event.event(GlobalEvent.ShowRedSpot, [false, HallRedSpotType.Gonggao]);
        // }
        // else {
        //     Global.Event.event(GlobalEvent.CloseRedSpot, HallRedSpotType.Gonggao);
        // }
        this.ReSetRightPanel()
    }

    RefreshLeftItem(data: any) {
        let node = cc.find(String(data.id), this.contentNode)
        if(node && node.isValid)  
        {
            node.getComponent("FeedbackLeftItem").SetUnReadActiveState(false)
        }      
    }

    ReSetRightPanel() {
        this.contentTxt.string = "";
        this.timeTxt.string = ""
        this.fromTxt.string = ""
        // this.Sprite.spriteFrame = null
    }
    protected onDispose() {
        if (this.itemPool)
            this.itemPool.resetPool()
        this.nodeList = [];
    }

    public recycle() {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    }

}
class NoticeItemPool extends PoolBase {
    constructor(private copyNode: cc.Node) {
        super();
    }

    protected createItem() {
        return cc.instantiate(this.copyNode);
    }

    protected resetItem(node: cc.Node) {
        node.active = false;
        node.setParent(null)
       
    }
    public recycleAll(arr: Array<any>) {
        super.recycleAll(arr)
        arr.forEach(ele => {
            this.resetItem(ele);
        });

    }
}