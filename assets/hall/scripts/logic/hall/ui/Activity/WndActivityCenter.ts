import WndBase, { DestoryType } from "../../../core/ui/WndBase";
import PoolBase from "../../../core/tool/PoolBase";
import ActivityRightPanelView from "./ActivityRightPanelView";
import ServicerItem from "../serviver/ServicerItem";
import HallPopMsgHelper, { PopWndName } from "../../tool/HallPopMsgHelper";
import HallModel, { HallRedSpotType } from "../../../hallcommon/model/HallModel";
import AppHelper from "../../../core/tool/AppHelper";
import { ActivityConstants, ActivityType } from "./ActivityConstants";
import HallBtnHelper from "../hall/views/HallBtnHelper";

export default class WndActivityCenter extends WndBase {

    contentNode: cc.Node;
    copyItem: any;
    leftPanel: cc.Node;
    activityPanel: cc.Node;
    itemPool: LeftItemPool;
    nodeList: any[] = [];
    activityPanelView: ActivityRightPanelView;
    ziSprite: cc.Node;
    Servicer1: cc.Node;
    Servicer2: cc.Node;
    hallModel: HallModel;
    actMap: Map<number, ActivityEntity> = null;
    sc: cc.ScrollView
    waittingNode: cc.Node = null

    timer: any = null


    protected onInit() {

        this.name = "WndActivityCenter";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/ActivityCenter/ActivityCenterUI";
        this.hallModel = Global.ModelManager.getModel("HallModel");
        this.isNeedDelay = true
        this.destoryType = DestoryType.ChangeScene;
    }

    protected onOpen() {
        this.initActivityLeft();
        this.activityPanelView.subViewState = true
    }

    initActivityLeft() {
        // if (this.actMap && this.actMap.size > 0 && cc.isValid(this.node)) {
        //     this.initLeftItem();
        //     return
        // }
        // HallPopMsgHelper.Instance.releaseLock(PopWndName.ActivityCenter);
        this.hallModel.requestMyActivityList((info: Map<number, ActivityEntity>) => {
            this.OnDataPrepared()
            this.actMap = info;
            if (this.actMap.size == 0) {
                this.contentNode.removeAllChildren();
                this.itemPool.resetPool();
                this.nodeList = [];
                this.activityPanelView.changeView(ActivityType.noMsgTips);
                this.showZi();
                return;
            }

            if (cc.isValid(this.node)) {
                this.initLeftItem();
            }
        });
    }

    public openAnimFinish() {

    }

    initLeftItem() {
        this.recycle();
        this.nodeList = [];
        this.contentNode.removeAllChildren();
        let mapInfo: Map<number, ActivityEntity> = this.actMap;
        let arrGen = this.actMap.keys();
        for (let i = 0; i < mapInfo.size; i++) {
            let key = arrGen.next().value as number;
            let entity: ActivityEntity = mapInfo.get(key);
            if (entity.status == 0) {
                continue
            }
            let item = this.itemPool.getItem();
            item.active = true;
            item.name = entity.atype.toString();
            let itemEntity = item.getComponent("FeedbackLeftItem");
            itemEntity.onInit(entity.name);
            itemEntity.entityData = entity;
            // itemEntity
            item.setParent(this.contentNode);
            this.nodeList.push(item);
            item.on(cc.Node.EventType.TOUCH_END, this.leftItemClick, this);
            let path = "hall/texture/commonui/common";
            let typeName = ""
            if (entity.flag == 1) {
                typeName = "bq_huobao"
            } else if (entity.flag == 2) {
                typeName = "bq_xingzeng"
            }
            item.getComponent("FeedbackLeftItem").SetTypeSprite(path, typeName);
            // item.getChildByName("typeSprite").getChildByName("la").getComponent(cc.Label).string=typeName
            item.getChildByName("Background").active = true;
            if (i == 0) {
                item.getComponent("FeedbackLeftItem").SetToggleChecked(true);
                item.getChildByName("Background").active = false;
                if (entity.ptype == 1) {
                    this.activityPanelView.changeView(ActivityType.picture, entity);
                }
                else {
                    this.activityPanelView.changeView(entity.atype, entity);
                }
                this.changeService(entity);
                if (typeName) {
                    this.moveFlag(item)
                }

            }

        }
        if (this.sc) {
            this.sc.scrollToTop()
        }


    }
    public moveFlag(item, reset?) {
        if (!item || !cc.isValid(item)) return
        let flagNode = cc.find("typeSprite", item);
        if (reset) {
            if (flagNode) {
                // flagNode.setPosition(65, 30);
            }
            return
        }
        if (flagNode) {
            // flagNode.setPosition(65, 30)
        }
    }

    leftItemClick(event) {
        Global.Audio.playBtnSound();
        let item = event.target;
        if( !item.getChildByName("Background").active){return}
        this.resetItemFlag()
        let itmeParent = event.target.parent
        itmeParent.children.forEach(element => {
            element.getChildByName("Background").active = true;
        });
        item.getChildByName("Background").active = false;
        let leftItem = item.getComponent("FeedbackLeftItem");
        let entityData = leftItem.entityData;
        if (entityData && entityData.ptype == 1) {
            this.activityPanelView.changeView(ActivityType.picture, entityData);
        }
        else {
            this.activityPanelView.changeView(entityData.atype, entityData);
        }

        this.moveFlag(item)
        this.changeService(entityData);

    }

    resetItemFlag() {
        for (let index = 0; index < this.nodeList.length; index++) {
            let element = this.nodeList[index];
            if (element) {
                let leftItem = element.getComponent("FeedbackLeftItem");
                if (leftItem && leftItem.node) {
                    this.moveFlag(leftItem.node, true)
                }
            }

        }
    }

    changeService(data) {
        let serviceData1: any = {};
        let serviceData2: any = {};
        serviceData1 = data.job1;
        serviceData2 = data.job2;
        if ((serviceData1.type == 0 && serviceData2.type == 0)) {
            this.showZi();
        } else {
            this.ziSprite.active = false;
            if (serviceData1) {
                this.Servicer1.active = true;
                this.Servicer1.getComponent(ServicerItem).setData(serviceData1);
            }
            if (serviceData2) {
                this.Servicer2.active = true;
                this.Servicer2.getComponent(ServicerItem).setData(serviceData2);
            }
        }
    }

    private showZi() {
        this.Servicer1.active = false;
        this.Servicer2.active = false;
        this.ziSprite.active = true;
    }

    protected initView() {
        this.waittingNode = this.getChild("waittingNode")
        if (this.waittingNode) {
            this.waittingNode.active = false
        }
        this.sc = this.getComponent<cc.ScrollView>("LeftPanel/scrollview", cc.ScrollView)
        this.leftPanel = this.getChild("LeftPanel");
        this.activityPanel = this.getChild("RightPanel");
        this.copyItem = this.getChild("LeftPanel/MsgItem");
        this.contentNode = this.getChild("LeftPanel/scrollview/view/content");
        this.ziSprite = this.getChild("service/ziSprite");
        this.Servicer1 = this.getChild("service/Servicer1");
        this.Servicer2 = this.getChild("service/Servicer2");
        // this.addCommonClick("service/ziSprite/btn_normal_ljlj", this.onServiceClick, this);
        Global.Event.on(ActivityConstants.SHOW_ACT_WAITTING, this, this.showWaitting)
        Global.Event.on(ActivityConstants.HIDE_ACT_WAITTING, this, this.showWaitting)
        this.addCommonClick("close", this.closeWnd, this);
        this.initItemPool();
        this.activityPanelView = <ActivityRightPanelView>this.addView("ActivityRightPanelView", this.activityPanel, ActivityRightPanelView);

    }
    private onServiceClick() {
        let kefuModel = <HallModel>Global.ModelManager.getModel("HallModel");
        kefuModel.closeRedSpot(HallRedSpotType.Kefu);
        Global.Audio.playAudioSource("hall/sound/Customer_service")
        HallBtnHelper.WndServiceOpen();
    }
    showWaitting(arg) {
        if (arg) {
            this.startWaittingTimer()
        }
        else {
            this.stopWaittingTimer()
        }
        if (this.waittingNode && this.waittingNode.isValid && this.waittingNode.active != arg)
            this.waittingNode.active = arg
    }
    stopWaittingTimer() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
    }
    startWaittingTimer() {
        this.stopWaittingTimer()
        this.timer = setTimeout(() => {
            this.waittingNode.active = false
        }, 10000);
    }

    private closeWnd() {
        this.close();
    }

    private initItemPool() {
        this.itemPool = new LeftItemPool(this.copyItem);
    }

    protected onClose() {
        this.stopWaittingTimer()
        this.resetItemFlag()
        HallPopMsgHelper.Instance.releaseLock(PopWndName.ActivityCenter);
    }



    protected onDispose() {
        this.itemPool.resetPool();
        this.nodeList = [];
        this.stopWaittingTimer()
        Global.Event.off(ActivityConstants.SHOW_ACT_WAITTING, this, this.showWaitting)
        Global.Event.off(ActivityConstants.HIDE_ACT_WAITTING, this, this.showWaitting)
    }

    public recycle() {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    }

}

class LeftItemPool extends PoolBase {
    constructor(private copyNode: cc.Node) {
        super();
    }

    protected createItem() {
        return cc.instantiate(this.copyNode);
    }

    protected resetItem(node: cc.Node) {

        node.active = false;
        node.setParent(null);
    }
    public recycleAll(arr: Array<any>) {
        super.recycleAll(arr);
    }
}
/**
 * 活动数据实体类
 */
export class ActivityEntity {
    flag: number = 0;
    atype: number = -1;
    ptype: number = 0; //1图片
    name: string = "";
    url: string = "";
    status: number = -1
    red_status: number = -1  //红点 0 显示 其他不显示
    job1: any = {
        type: 0, //客服类型
        name: "", //客服名称
        data: "" //客服号码
    }
    job2: any = {
        type: 0, //客服类型
        name: "", //客服名称
        data: "" //客服号码
    }
}