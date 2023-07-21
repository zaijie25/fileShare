import WndBase, { DestoryType } from "../../../core/ui/WndBase";
import HallModel, { HallRedSpotType } from "../../../hallcommon/model/HallModel";
import GlobalEvent from "../../../core/GlobalEvent";
import HallBottomView from "./views/HallBottomView";
import HallTopView from "./views/HallTopView";
import HallPaoMaDengView from "./views/HallPaoMaDengView";
import { NetAppface } from "../../../core/net/hall/NetEvent";
import MsgModel from "../../../hallcommon/model/MsgModel";
import BindingGiftModel from "../../../hallcommon/model/BindingGiftModel";
import IntoHallAnimComp from "../../../core/component/IntoHallAnimComp";
// import RebateModel from "../rebate/RebateModel";
import HallPopMsgHelper, { PopWndName } from "../../tool/HallPopMsgHelper";
import GameListView from "./views/GameListView";
import EventComp from "../../../core/component/EventComp";
import BannerView from "./views/BannerView";
import AppHelper from "../../../core/tool/AppHelper";
import HallMoreGameTopNode from "./views/HallMoreGameTopNode";
import HallGuiDelinesView from "./views/HallGuiDelinesView";
import PlayerInfoModel from "../../../hallcommon/model/PlayerInfoModel";
import RechargeGiftModel from "../../../hallcommon/model/RechargeGiftModel";
import GameListViewA from "./views/GameListViewA";
import HallBtnHelper from "./views/HallBtnHelper";
export default class WndHall extends WndBase {

    private model: HallModel;


    private MsgModel: MsgModel
    private rechargeModel: RechargeGiftModel
    private itemAreaWidget: cc.Widget
    private gonggaoAreaWidget: cc.Widget
    private headViewWidget: cc.Widget
    private leftArrowWidget: cc.Widget
    private walletViewWidget: cc.Widget

    gameListView: cc.ScrollView;
    gameListItem: any;
    gameContent: cc.Node;

    //组件
    private topView: HallTopView;
    private bottomView: HallBottomView;
    private guiDelinesView: HallGuiDelinesView;
    //
    private gongGao: BannerView;
    //

    private gamesView: any;

    private moreGameTopView: HallMoreGameTopNode;
    private moreGameBtn: cc.Node;//更多游戏按钮
    private canBack: boolean = false;//避免同时按下(能否返回)
    private canMore: boolean = true;//避免同时按下(能否按更多游戏列表)

    private intoHallAnimComp: IntoHallAnimComp;
    private paoMaDengNode: cc.Node;
    private eventComp: EventComp;

    protected onInit() {
        this.name = "WndHall";
        this.layer = "MainLayer";
        this.resPath = "hall@ui/HallUI";
        this.model = <HallModel>Global.ModelManager.getModel("HallModel");
        this.MsgModel = <MsgModel>Global.ModelManager.getModel("MsgModel");
        this.rechargeModel = <RechargeGiftModel>Global.ModelManager.getModel("RechargeGiftModel");
        this.destoryType = DestoryType.None;
    }

    protected initView() {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;

        let csNode = this.getChild("bottomNode/layoutNode/caishenNode");
        this.model.csNodePos = csNode;


        this.leftArrowWidget = this.getComponent("centerNode/shan_left", cc.Widget)
        this.itemAreaWidget = this.getComponent("centerNode/centerContent/contentView/content/itemParent", cc.Widget)
        this.gonggaoAreaWidget = this.getComponent("centerNode/centerContent/contentView/content/gonggaoArea/gonggaoNode", cc.Widget)
        this.headViewWidget = this.getComponent("bottomNode/PlayerHeadView", cc.Widget)
        if (this.itemAreaWidget && this.gonggaoAreaWidget && this.headViewWidget) {
            this.initAreaWidget()
        }

        this.moreGameTopView = <HallMoreGameTopNode>this.addView("HallMoreGameTopNode", this.getChild("moreGametopNode"), HallMoreGameTopNode);
        this.moreGameTopView.active = false;
        //更多游戏开关按钮
        this.moreGameBtn = this.addCommonClick("centerNode/centerContent/contentView/content/moreGameBtn", this.clickMoreGame, this);
        this.moreGameBtn.active = false;

        //公告组件
        this.initGongGaoView()
        //跑马灯组件
        // this.paoMaDeng = <HallPaoMaDengView>this.addView("HallPaoMaDengView", this.getChild("centerNode/PaoMaDengBox"), HallPaoMaDengView);
        this.paoMaDengNode = this.getChild("centerNode/PaoMaDengBox");
        let paomadengMask = this.getChild("centerNode/PaoMaDengBox/MsgBox");
        let ttffont = this.getChild("centerNode/PaoMaDengBox/MsgBox/PMDMsgItem");
        Global.UIHelper.addPaoMaDengComp(paomadengMask, true, null, ttffont.getComponent(cc.RichText).font);
        Global.UIHelper.addPrivateMarqueeComp(this.getChild("showNode"));
        //上下Bar组件
        this.topView = <HallTopView>this.addView("HallTopView", this.getChild("topNode"), HallTopView);
        this.bottomView = <HallBottomView>this.addView("HallBottomView", this.getChild("bottomNode"), HallBottomView);
        this.guiDelinesView = <HallGuiDelinesView>this.addView("HallGuiDelinesView", this.getChild("guidelines"), HallGuiDelinesView);
        this.initGameList()
        //游戏列表初始化
        this.gameListView = this.getComponent("centerNode/centerContent", cc.ScrollView);
        this.gameListItem = this.getChild("centerNode/gameListItem");
        this.gameContent = this.gameListView.content;
        this.gameListView.inertia = true;
        this.gameListView.brake = 0.2;

        Global.Toolkit.adjustIphoneX([this.getChild("centerNode")], 30);

        Global.Toolkit.adjustIphoneX([this.getChild("topNode")], 10);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)

        Global.Event.on(GlobalEvent.UPDATE_GAME_LIST, this, this.initGameListView);
        Global.Event.on(GlobalEvent.POP_BIND_PHONE, this, this.PopUpBindPhone);
        Global.Event.on(GlobalEvent.OpenWebViewGame, this, this.onOpenWebViewGame)
        Global.Event.on(GlobalEvent.CloseWebViewGame, this, this.onCloseWebViewGame)
        Global.Event.on(GlobalEvent.RecordGameListOffsetX, this, this.RecorGameListScrollX);
        Global.Event.on(GlobalEvent.CloseMoreGame, this, this.closeMoreGame)


        //切场景时，hall界面不关闭  通过脚本ondisable触发onClose
        this.eventComp = this.node.addComponent(EventComp);
        this.eventComp.disableCallback = this.onClose;
        this.eventComp.target = this;
    }
    initGongGaoView() {
        this.gongGao = <BannerView>this.addView("BannerView", this.getChild("centerNode/centerContent/contentView/content/gonggaoArea/gonggaoNode"), BannerView);
        // return
        // let storgeHall = Global.customApp.getHallBundleName()
        // if (storgeHall.endsWith('0'))
        // {
        //     this.gongGao = <BannerView>this.addView("BannerView", this.getChild("centerNode/centerContent/gonggaoArea/gonggaoNode"), BannerView);
        // }
        // else if(storgeHall.endsWith('1'))
        // {
        //     this.gongGao = <BannerView>this.addView("BannerView", this.getChild("centerNode/centerContent/itemArea/contentView/content/gonggaoArea/gonggaoNode"), BannerView);
        // }

    }

    initGameList() {
        this.gamesView = this.getGameListByHall()
        this.gamesView.setNode(this.getChild("centerNode"));
        this.gamesView.subViewState = true;
    }

    private RecorGameListScrollX() {
        this.model.setEnterGameOffsetX(this.gameListView.getScrollOffset().x);
    }

    getGameListByHall() {
        let storgeHall = Global.customApp.getHallBundleName()
        if (storgeHall.endsWith('0')) {
            return new GameListViewA()
        }
        else if (storgeHall.endsWith('1') || storgeHall.endsWith('2')) {
            return new GameListViewA()
        }
    }
    initAreaWidget() {
        // let hall = Global.customApp.getHallBundleName()
        // if(!hall.endsWith('0'))
        // {
        //     return
        // }
        let screenWidth = cc.Canvas.instance.node.width
        let screenHeight = cc.Canvas.instance.node.height
        let ratio = screenWidth / screenHeight
        let hallWidgetCfg = Global.Setting.SkinConfig.getHallWidgetCfg()
        if (Math.abs(ratio - 1280 / 720) < 0.02) { // 1280 系列分辨率
            if (this.itemAreaWidget)
                this.itemAreaWidget.left = hallWidgetCfg["itemAreaWidget"][0]
            // if (this.leftArrowWidget)
            //     this.leftArrowWidget.left = hallWidgetCfg["leftArrowWidget"][0]
            if (this.gonggaoAreaWidget)
                this.gonggaoAreaWidget.left = hallWidgetCfg["gonggaoAreaWidget"][0]
            if (this.headViewWidget)
                this.headViewWidget.left = hallWidgetCfg["headViewWidget"][0]
        }
        else {
            //450
            if (this.itemAreaWidget)
                this.itemAreaWidget.left = hallWidgetCfg["itemAreaWidget"][1]
            // if (this.leftArrowWidget)
            //     this.leftArrowWidget.left = hallWidgetCfg["leftArrowWidget"][1]
            if (this.gonggaoAreaWidget)
                this.gonggaoAreaWidget.left = hallWidgetCfg["gonggaoAreaWidget"][1]
            if (this.headViewWidget)
                this.headViewWidget.left = hallWidgetCfg["headViewWidget"][1]

        }
    }

    private onKeyDown(event) {
        if (!CC_PREVIEW)
            return;
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                {
                    Logger.error("EVENT_CALL_RECONNECT");
                    Game.Event.event(Game.EVENT_CALL_RECONNECT);
                    break;
                }
            case cc.macro.KEY.s:
                {
                    Global.UI.showSingleBox("test");
                    Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME, true);
                    break;
                }
            case cc.macro.KEY.d:
                {
                    Global.Toolkit.dumpRes(false);
                    break;
                }
            case cc.macro.KEY.escape:
                {
                    Global.UI.showSingleBox("测试子游戏内收到的大厅弹窗消息");
                    break;
                }
            case cc.macro.KEY.back: {
                Global.NativeEvent.onShowExitDialog()
                break;
            }
        }
    }


    protected onOpen() {
        //游戏恢复(断线重连)
        if (this.model.needQuaryState)
            this.model.reqQueryState();
        //打开大厅  请求玩家货币
        Global.HallServer.send(NetAppface.mod, NetAppface.GetUserPoint, {});
        this.checkGameMsg();
        Global.Event.event(GlobalEvent.ON_HALL_OPEN);
        this.showAllSubView()
        //请求活动 右上角活动小红点需要
        this.model.requestMyActivityList();
        cc.find("Canvas/loading").active = false;
        this.initMusic()
        this.tryInitGamelist()
        if (this.guiDelinesView && this.model.moreGameStatus == false) {
            this.guiDelinesView.getNewMsg();
        }
        // this.initHallActivity()

    }

    private closeMoreGame(isClose: boolean) {
        if (isClose && this.canBack) {
            //关闭更多游戏列表页面效果
            this.closeMoreGameAni();
            //重置enterGameOffsetX
            this.model.setEnterGameOffsetX(0);
            //刷新游戏列表
            this.gamesView.refreshGameList(this.model.enterGameOffsetX, false, this.animationCallBack.bind(this));
            //保存游戏列表状态
            this.model.setMoreGameStatus(false);
            this.guiDelinesView.getNewMsg();

        }
    }

    private clickMoreGame() {
        if (this.canMore) {
            //更多游戏列表页面效果
            this.moreGameAni();
            //重置enterGameOffsetX
            this.model.setEnterGameOffsetX(0);
            //刷新游戏列表动画
            this.gamesView.refreshGameList(this.model.enterGameOffsetX, true, this.animationCallBack.bind(this));
            //保存游戏列表状态
            this.model.setMoreGameStatus(true);
        }
    }

    //打开更多游戏列表页面效果
    private moreGameAni() {
        //原先头部隐藏
        this.topView.node.runAction(cc.sequence(cc.hide(), cc.callFunc(() => {
            this.topView.subViewState = false;
        }, this)));
        //新头部出现
        this.moreGameTopView.subViewState = true;
        this.moreGameTopView.node.opacity = 1;
        this.moreGameTopView.node.runAction(cc.sequence(cc.show(), cc.fadeIn(0.5), cc.callFunc(() => {
            this.canBack = true; //可以返回
        })));
        //自身隐藏动画
        this.moreGameBtn.runAction(cc.sequence(cc.fadeOut(0.5), cc.callFunc(() => {
            this.moreGameBtn.active = false;
            this.canMore = false;
        }, this)));
        //公告缩进左边动画
        this.gongGao.node.runAction(cc.sequence(cc.fadeOut(0.5), cc.callFunc(() => {
            this.gongGao.subViewState = false;
        }, this)));
        //底部消息动画
        this.bottomView.node.runAction(cc.sequence(cc.fadeOut(0.5), cc.callFunc(() => {
            this.bottomView.subViewState = false;
        }, this)));
    }

    //关闭更多游戏列表页面效果
    private closeMoreGameAni() {
        //新头部消失
        this.moreGameTopView.node.runAction(cc.sequence(cc.hide(), cc.callFunc(() => {
            this.moreGameTopView.subViewState = false;
        }, this)));
        //旧头部出现
        this.canBack = false;
        this.topView.subViewState = true;
        this.topView.node.opacity = 1;
        this.topView.node.runAction(cc.sequence(cc.show(), cc.fadeIn(0.5)));
        //公告出现
        this.gongGao.subViewState = true;
        this.gongGao.node.runAction(cc.fadeIn(0.5));
        //更多游戏按钮出现
        this.canMore = true; //可以点击更多游戏按钮
        // this.moreGameBtn.active = true;
        // this.moreGameBtn.runAction(cc.sequence(cc.fadeIn(0.5), cc.callFunc(() => {
        //     this.canMore = true; //可以点击更多游戏按钮
        // })));
        //底部出现
        this.bottomView.subViewState = true;
        this.bottomView.node.runAction(cc.fadeIn(0.5));
    }



    //大厅红包 保险金 私人跑马灯等活动
    initHallActivity() {
        //红包
        this.model.requestGetRewardPackCount()
    }

    tryInitGamelist() {
        let flag = Global.GameData.dataInitFinish
        if (flag) {
            this.initGameListView()
        }
    }
    initMusic() {
        if (CC_JSB) {
            var model: PlayerInfoModel = Global.ModelManager.getModel("PlayerInfoModel")
            if (model) {
                model.InitBgm()
            }
        } else {
            Global.Audio.playHallBGM();
        }
    }
    showAllSubView() {
        this.topView.subViewState = true
        this.bottomView.subViewState = true
        this.gongGao.subViewState = true
        this.rechargeModel.reqGetActivityCfg(false)
    }



    public animationCallBack() {
        HallPopMsgHelper.Instance.popMsgList();
    }

    private checkGameMsg() {
        if (Game.DataBridge.msg == null && Game.DataBridge.fastTipMsg == null && Game.DataBridge.cacheShow == null)
            return;
        if (Game.DataBridge.cacheShow) {
            Global.UI.show(Game.DataBridge.cacheShow.window, Game.DataBridge.cacheShow.args)
            Game.DataBridge.cacheShow = null
        }
        if (Game.DataBridge.msg) {
            let msg = Game.DataBridge.msg;
            Game.DataBridge.msg = null;
            if (msg.content == null || msg.content == "")
                return;
            if (msg.type == 1) {
                Global.UI.showSingleBox(msg.content, msg.yFunc, msg.nFunc);
            }
            else {
                Global.UI.showYesNoBox(msg.content, msg.yFunc, msg.nFunc);
            }
        }
        else if (Game.DataBridge.fastTipMsg) {
            Global.UI.fastTip(Game.DataBridge.fastTipMsg);
            Game.DataBridge.fastTipMsg = null;
        }

    }

    private PopUpNotice() {
        let status = this.MsgModel.Status
        if (status == 1) {
            HallPopMsgHelper.Instance.addLock(PopWndName.Notice);
            Global.UI.show("WndNotice");
        }
    }


    private PopUpBindPhone() {
        HallPopMsgHelper.Instance.addLock(PopWndName.BindPhone);
        Global.UI.show("WndBindPhone");
    }

    protected onClose() {
        if (Global.SceneManager.inGame()) {
            this.gamesView.close();
            this.gongGao.close();
        }
    }

    protected onDispose() {

        Global.Event.off(GlobalEvent.UPDATE_GAME_LIST, this, this.initGameListView)

        Global.Event.off(GlobalEvent.POP_BIND_PHONE, this, this.PopUpBindPhone);
        Global.Event.off(GlobalEvent.OpenWebViewGame, this, this.onOpenWebViewGame)
        Global.Event.off(GlobalEvent.CloseWebViewGame, this, this.onCloseWebViewGame)
        Global.Event.off(GlobalEvent.RecordGameListOffsetX, this, this.RecorGameListScrollX);
        Global.Event.off(GlobalEvent.CloseMoreGame, this, this.closeMoreGame)

        if (this.gameContent) {
            this.gameContent.stopAllActions();
        }
        this.gamesView.destroy();
    }


    //初始化游戏列表
    initGameListView(bAnim: boolean = true) {
        //先适配完再计算位置
        Global.Component.frameEnd(() => {
            if (!this.node.isValid)
                return;
            this.gamesView.refreshGameList(this.model.enterGameOffsetX, this.model.moreGameStatus, this.animationCallBack.bind(this));
            if (this.model.moreGameStatus) {
                this.moreGameAni();
            }
            bAnim = this.model.firstOpenHall && bAnim;
            // let rightNodeArr = this.gamesView.getNodesArr();
            if (bAnim) {
                // this.model.firstOpenHall = false;
                // this.intoHallAnimComp = Global.UIHelper.safeGetComponent(this.node, "", IntoHallAnimComp);
                // //this.intoHallAnimComp.alphaNode = this.getChild("centerNode/PaoMaDengBox");
                // this.intoHallAnimComp.bottomNodeArr = [this.bottomView.node];
                // this.intoHallAnimComp.topNodeArr = [this.topView.node];
                // this.intoHallAnimComp.rightNodeArr = rightNodeArr;
                // Global.Component.frameEnd(() => {
                //     this.intoHallAnimComp.init();
                //     this.intoHallAnimComp.startAnimation();
                // });
            }
            else {
                this.animationCallBack();
            }
        });
    }

    onOpenWebViewGame(url, scheme, actionViewHidden, gid) {
        if (cc.sys.isBrowser) {
            Global.GameWebView.gameWebViewShow(url, false, gid == 9001);
            Logger.log("浏览器环境下")
        } else {
            Global.WebViewControl.showWebView(url, scheme, actionViewHidden, this.node, gid)
        }
        Logger.log(" WebViewGame open HallModel requestApplyEnterGame base64 url ", url, scheme, actionViewHidden);
    }
    onCloseWebViewGame() {
        this.gamesView.onResume()
        this.initMusic()
        Logger.log("WebViewGame --外接游戏已关闭");
    }
}