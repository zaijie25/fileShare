"use strict";
cc._RF.push(module, 'b058dd+MNxOaLtR6zlc5KxU', 'WndHall');
// hall/scripts/logic/hall/ui/hall/WndHall.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WndBase_1 = require("../../../core/ui/WndBase");
var GlobalEvent_1 = require("../../../core/GlobalEvent");
var HallBottomView_1 = require("./views/HallBottomView");
var HallTopView_1 = require("./views/HallTopView");
var NetEvent_1 = require("../../../core/net/hall/NetEvent");
// import RebateModel from "../rebate/RebateModel";
var HallPopMsgHelper_1 = require("../../tool/HallPopMsgHelper");
var EventComp_1 = require("../../../core/component/EventComp");
var BannerView_1 = require("./views/BannerView");
var HallMoreGameTopNode_1 = require("./views/HallMoreGameTopNode");
var HallGuiDelinesView_1 = require("./views/HallGuiDelinesView");
var GameListViewA_1 = require("./views/GameListViewA");
var WndHall = /** @class */ (function (_super) {
    __extends(WndHall, _super);
    function WndHall() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.canBack = false; //避免同时按下(能否返回)
        _this.canMore = true; //避免同时按下(能否按更多游戏列表)
        return _this;
    }
    WndHall.prototype.onInit = function () {
        this.name = "WndHall";
        this.layer = "MainLayer";
        this.resPath = "hall@ui/HallUI";
        this.model = Global.ModelManager.getModel("HallModel");
        this.MsgModel = Global.ModelManager.getModel("MsgModel");
        this.rechargeModel = Global.ModelManager.getModel("RechargeGiftModel");
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndHall.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        var csNode = this.getChild("bottomNode/layoutNode/caishenNode");
        this.model.csNodePos = csNode;
        this.leftArrowWidget = this.getComponent("centerNode/shan_left", cc.Widget);
        this.itemAreaWidget = this.getComponent("centerNode/centerContent/contentView/content/itemParent", cc.Widget);
        this.gonggaoAreaWidget = this.getComponent("centerNode/centerContent/contentView/content/gonggaoArea/gonggaoNode", cc.Widget);
        this.headViewWidget = this.getComponent("bottomNode/PlayerHeadView", cc.Widget);
        if (this.itemAreaWidget && this.gonggaoAreaWidget && this.headViewWidget) {
            this.initAreaWidget();
        }
        this.moreGameTopView = this.addView("HallMoreGameTopNode", this.getChild("moreGametopNode"), HallMoreGameTopNode_1.default);
        this.moreGameTopView.active = false;
        //更多游戏开关按钮
        this.moreGameBtn = this.addCommonClick("centerNode/centerContent/contentView/content/moreGameBtn", this.clickMoreGame, this);
        this.moreGameBtn.active = false;
        //公告组件
        this.initGongGaoView();
        //跑马灯组件
        // this.paoMaDeng = <HallPaoMaDengView>this.addView("HallPaoMaDengView", this.getChild("centerNode/PaoMaDengBox"), HallPaoMaDengView);
        this.paoMaDengNode = this.getChild("centerNode/PaoMaDengBox");
        var paomadengMask = this.getChild("centerNode/PaoMaDengBox/MsgBox");
        var ttffont = this.getChild("centerNode/PaoMaDengBox/MsgBox/PMDMsgItem");
        Global.UIHelper.addPaoMaDengComp(paomadengMask, true, null, ttffont.getComponent(cc.RichText).font);
        Global.UIHelper.addPrivateMarqueeComp(this.getChild("showNode"));
        //上下Bar组件
        this.topView = this.addView("HallTopView", this.getChild("topNode"), HallTopView_1.default);
        this.bottomView = this.addView("HallBottomView", this.getChild("bottomNode"), HallBottomView_1.default);
        this.guiDelinesView = this.addView("HallGuiDelinesView", this.getChild("guidelines"), HallGuiDelinesView_1.default);
        this.initGameList();
        //游戏列表初始化
        this.gameListView = this.getComponent("centerNode/centerContent", cc.ScrollView);
        this.gameListItem = this.getChild("centerNode/gameListItem");
        this.gameContent = this.gameListView.content;
        this.gameListView.inertia = true;
        this.gameListView.brake = 0.2;
        Global.Toolkit.adjustIphoneX([this.getChild("centerNode")], 30);
        Global.Toolkit.adjustIphoneX([this.getChild("topNode")], 10);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        Global.Event.on(GlobalEvent_1.default.UPDATE_GAME_LIST, this, this.initGameListView);
        Global.Event.on(GlobalEvent_1.default.POP_BIND_PHONE, this, this.PopUpBindPhone);
        Global.Event.on(GlobalEvent_1.default.OpenWebViewGame, this, this.onOpenWebViewGame);
        Global.Event.on(GlobalEvent_1.default.CloseWebViewGame, this, this.onCloseWebViewGame);
        Global.Event.on(GlobalEvent_1.default.RecordGameListOffsetX, this, this.RecorGameListScrollX);
        Global.Event.on(GlobalEvent_1.default.CloseMoreGame, this, this.closeMoreGame);
        //切场景时，hall界面不关闭  通过脚本ondisable触发onClose
        this.eventComp = this.node.addComponent(EventComp_1.default);
        this.eventComp.disableCallback = this.onClose;
        this.eventComp.target = this;
    };
    WndHall.prototype.initGongGaoView = function () {
        this.gongGao = this.addView("BannerView", this.getChild("centerNode/centerContent/contentView/content/gonggaoArea/gonggaoNode"), BannerView_1.default);
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
    };
    WndHall.prototype.initGameList = function () {
        this.gamesView = this.getGameListByHall();
        this.gamesView.setNode(this.getChild("centerNode"));
        this.gamesView.subViewState = true;
    };
    WndHall.prototype.RecorGameListScrollX = function () {
        this.model.setEnterGameOffsetX(this.gameListView.getScrollOffset().x);
    };
    WndHall.prototype.getGameListByHall = function () {
        var storgeHall = Global.customApp.getHallBundleName();
        if (storgeHall.endsWith('0')) {
            return new GameListViewA_1.default();
        }
        else if (storgeHall.endsWith('1') || storgeHall.endsWith('2')) {
            return new GameListViewA_1.default();
        }
    };
    WndHall.prototype.initAreaWidget = function () {
        // let hall = Global.customApp.getHallBundleName()
        // if(!hall.endsWith('0'))
        // {
        //     return
        // }
        var screenWidth = cc.Canvas.instance.node.width;
        var screenHeight = cc.Canvas.instance.node.height;
        var ratio = screenWidth / screenHeight;
        var hallWidgetCfg = Global.Setting.SkinConfig.getHallWidgetCfg();
        if (Math.abs(ratio - 1280 / 720) < 0.02) { // 1280 系列分辨率
            if (this.itemAreaWidget)
                this.itemAreaWidget.left = hallWidgetCfg["itemAreaWidget"][0];
            // if (this.leftArrowWidget)
            //     this.leftArrowWidget.left = hallWidgetCfg["leftArrowWidget"][0]
            if (this.gonggaoAreaWidget)
                this.gonggaoAreaWidget.left = hallWidgetCfg["gonggaoAreaWidget"][0];
            if (this.headViewWidget)
                this.headViewWidget.left = hallWidgetCfg["headViewWidget"][0];
        }
        else {
            //450
            if (this.itemAreaWidget)
                this.itemAreaWidget.left = hallWidgetCfg["itemAreaWidget"][1];
            // if (this.leftArrowWidget)
            //     this.leftArrowWidget.left = hallWidgetCfg["leftArrowWidget"][1]
            if (this.gonggaoAreaWidget)
                this.gonggaoAreaWidget.left = hallWidgetCfg["gonggaoAreaWidget"][1];
            if (this.headViewWidget)
                this.headViewWidget.left = hallWidgetCfg["headViewWidget"][1];
        }
    };
    WndHall.prototype.onKeyDown = function (event) {
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
                Global.NativeEvent.onShowExitDialog();
                break;
            }
        }
    };
    WndHall.prototype.onOpen = function () {
        //游戏恢复(断线重连)
        if (this.model.needQuaryState)
            this.model.reqQueryState();
        //打开大厅  请求玩家货币
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetUserPoint, {});
        this.checkGameMsg();
        Global.Event.event(GlobalEvent_1.default.ON_HALL_OPEN);
        this.showAllSubView();
        //请求活动 右上角活动小红点需要
        this.model.requestMyActivityList();
        cc.find("Canvas/loading").active = false;
        this.initMusic();
        this.tryInitGamelist();
        if (this.guiDelinesView && this.model.moreGameStatus == false) {
            this.guiDelinesView.getNewMsg();
        }
        // this.initHallActivity()
    };
    WndHall.prototype.closeMoreGame = function (isClose) {
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
    };
    WndHall.prototype.clickMoreGame = function () {
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
    };
    //打开更多游戏列表页面效果
    WndHall.prototype.moreGameAni = function () {
        var _this = this;
        //原先头部隐藏
        this.topView.node.runAction(cc.sequence(cc.hide(), cc.callFunc(function () {
            _this.topView.subViewState = false;
        }, this)));
        //新头部出现
        this.moreGameTopView.subViewState = true;
        this.moreGameTopView.node.opacity = 1;
        this.moreGameTopView.node.runAction(cc.sequence(cc.show(), cc.fadeIn(0.5), cc.callFunc(function () {
            _this.canBack = true; //可以返回
        })));
        //自身隐藏动画
        this.moreGameBtn.runAction(cc.sequence(cc.fadeOut(0.5), cc.callFunc(function () {
            _this.moreGameBtn.active = false;
            _this.canMore = false;
        }, this)));
        //公告缩进左边动画
        this.gongGao.node.runAction(cc.sequence(cc.fadeOut(0.5), cc.callFunc(function () {
            _this.gongGao.subViewState = false;
        }, this)));
        //底部消息动画
        this.bottomView.node.runAction(cc.sequence(cc.fadeOut(0.5), cc.callFunc(function () {
            _this.bottomView.subViewState = false;
        }, this)));
    };
    //关闭更多游戏列表页面效果
    WndHall.prototype.closeMoreGameAni = function () {
        var _this = this;
        //新头部消失
        this.moreGameTopView.node.runAction(cc.sequence(cc.hide(), cc.callFunc(function () {
            _this.moreGameTopView.subViewState = false;
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
    };
    //大厅红包 保险金 私人跑马灯等活动
    WndHall.prototype.initHallActivity = function () {
        //红包
        this.model.requestGetRewardPackCount();
    };
    WndHall.prototype.tryInitGamelist = function () {
        var flag = Global.GameData.dataInitFinish;
        if (flag) {
            this.initGameListView();
        }
    };
    WndHall.prototype.initMusic = function () {
        if (CC_JSB) {
            var model = Global.ModelManager.getModel("PlayerInfoModel");
            if (model) {
                model.InitBgm();
            }
        }
        else {
            Global.Audio.playHallBGM();
        }
    };
    WndHall.prototype.showAllSubView = function () {
        this.topView.subViewState = true;
        this.bottomView.subViewState = true;
        this.gongGao.subViewState = true;
        this.rechargeModel.reqGetActivityCfg(false);
    };
    WndHall.prototype.animationCallBack = function () {
        HallPopMsgHelper_1.default.Instance.popMsgList();
    };
    WndHall.prototype.checkGameMsg = function () {
        if (Game.DataBridge.msg == null && Game.DataBridge.fastTipMsg == null && Game.DataBridge.cacheShow == null)
            return;
        if (Game.DataBridge.cacheShow) {
            Global.UI.show(Game.DataBridge.cacheShow.window, Game.DataBridge.cacheShow.args);
            Game.DataBridge.cacheShow = null;
        }
        if (Game.DataBridge.msg) {
            var msg = Game.DataBridge.msg;
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
    };
    WndHall.prototype.PopUpNotice = function () {
        var status = this.MsgModel.Status;
        if (status == 1) {
            HallPopMsgHelper_1.default.Instance.addLock(HallPopMsgHelper_1.PopWndName.Notice);
            Global.UI.show("WndNotice");
        }
    };
    WndHall.prototype.PopUpBindPhone = function () {
        HallPopMsgHelper_1.default.Instance.addLock(HallPopMsgHelper_1.PopWndName.BindPhone);
        Global.UI.show("WndBindPhone");
    };
    WndHall.prototype.onClose = function () {
        if (Global.SceneManager.inGame()) {
            this.gamesView.close();
            this.gongGao.close();
        }
    };
    WndHall.prototype.onDispose = function () {
        Global.Event.off(GlobalEvent_1.default.UPDATE_GAME_LIST, this, this.initGameListView);
        Global.Event.off(GlobalEvent_1.default.POP_BIND_PHONE, this, this.PopUpBindPhone);
        Global.Event.off(GlobalEvent_1.default.OpenWebViewGame, this, this.onOpenWebViewGame);
        Global.Event.off(GlobalEvent_1.default.CloseWebViewGame, this, this.onCloseWebViewGame);
        Global.Event.off(GlobalEvent_1.default.RecordGameListOffsetX, this, this.RecorGameListScrollX);
        Global.Event.off(GlobalEvent_1.default.CloseMoreGame, this, this.closeMoreGame);
        if (this.gameContent) {
            this.gameContent.stopAllActions();
        }
        this.gamesView.destroy();
    };
    //初始化游戏列表
    WndHall.prototype.initGameListView = function (bAnim) {
        var _this = this;
        if (bAnim === void 0) { bAnim = true; }
        //先适配完再计算位置
        Global.Component.frameEnd(function () {
            if (!_this.node.isValid)
                return;
            _this.gamesView.refreshGameList(_this.model.enterGameOffsetX, _this.model.moreGameStatus, _this.animationCallBack.bind(_this));
            if (_this.model.moreGameStatus) {
                _this.moreGameAni();
            }
            bAnim = _this.model.firstOpenHall && bAnim;
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
                _this.animationCallBack();
            }
        });
    };
    WndHall.prototype.onOpenWebViewGame = function (url, scheme, actionViewHidden, gid) {
        if (cc.sys.isBrowser) {
            Global.GameWebView.gameWebViewShow(url, false, gid == 9001);
            Logger.log("浏览器环境下");
        }
        else {
            Global.WebViewControl.showWebView(url, scheme, actionViewHidden, this.node, gid);
        }
        Logger.log(" WebViewGame open HallModel requestApplyEnterGame base64 url ", url, scheme, actionViewHidden);
    };
    WndHall.prototype.onCloseWebViewGame = function () {
        this.gamesView.onResume();
        this.initMusic();
        Logger.log("WebViewGame --外接游戏已关闭");
    };
    return WndHall;
}(WndBase_1.default));
exports.default = WndHall;

cc._RF.pop();