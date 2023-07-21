
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/hall/WndHall.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxoYWxsXFxXbmRIYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFnRTtBQUVoRSx5REFBb0Q7QUFDcEQseURBQW9EO0FBQ3BELG1EQUE4QztBQUU5Qyw0REFBNkQ7QUFJN0QsbURBQW1EO0FBQ25ELGdFQUEyRTtBQUUzRSwrREFBMEQ7QUFDMUQsaURBQTRDO0FBRTVDLG1FQUE4RDtBQUM5RCxpRUFBNEQ7QUFHNUQsdURBQWtEO0FBRWxEO0lBQXFDLDJCQUFPO0lBQTVDO1FBQUEscUVBd2NDO1FBM2FXLGFBQU8sR0FBWSxLQUFLLENBQUMsQ0FBQSxjQUFjO1FBQ3ZDLGFBQU8sR0FBWSxJQUFJLENBQUMsQ0FBQSxtQkFBbUI7O0lBMGF2RCxDQUFDO0lBcGFhLHdCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFjLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxRQUFRLEdBQWEsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLGFBQWEsR0FBc0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMxRixJQUFJLENBQUMsV0FBVyxHQUFHLHFCQUFXLENBQUMsSUFBSSxDQUFDO0lBQ3hDLENBQUM7SUFFUywwQkFBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElB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LEVBQUUsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDO1lBQzVELE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7U0FDdkI7YUFBTTtZQUNILE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtTQUNuRjtRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsK0RBQStELEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQy9HLENBQUM7SUFDRCxvQ0FBa0IsR0FBbEI7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUNoQixNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQXhjQSxBQXdjQyxDQXhjb0MsaUJBQU8sR0F3YzNDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZEJhc2UsIHsgRGVzdG9yeVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9XbmRCYXNlXCI7XHJcbmltcG9ydCBIYWxsTW9kZWwsIHsgSGFsbFJlZFNwb3RUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvSGFsbE1vZGVsXCI7XHJcbmltcG9ydCBHbG9iYWxFdmVudCBmcm9tIFwiLi4vLi4vLi4vY29yZS9HbG9iYWxFdmVudFwiO1xyXG5pbXBvcnQgSGFsbEJvdHRvbVZpZXcgZnJvbSBcIi4vdmlld3MvSGFsbEJvdHRvbVZpZXdcIjtcclxuaW1wb3J0IEhhbGxUb3BWaWV3IGZyb20gXCIuL3ZpZXdzL0hhbGxUb3BWaWV3XCI7XHJcbmltcG9ydCBIYWxsUGFvTWFEZW5nVmlldyBmcm9tIFwiLi92aWV3cy9IYWxsUGFvTWFEZW5nVmlld1wiO1xyXG5pbXBvcnQgeyBOZXRBcHBmYWNlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvbmV0L2hhbGwvTmV0RXZlbnRcIjtcclxuaW1wb3J0IE1zZ01vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL01zZ01vZGVsXCI7XHJcbmltcG9ydCBCaW5kaW5nR2lmdE1vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL0JpbmRpbmdHaWZ0TW9kZWxcIjtcclxuaW1wb3J0IEludG9IYWxsQW5pbUNvbXAgZnJvbSBcIi4uLy4uLy4uL2NvcmUvY29tcG9uZW50L0ludG9IYWxsQW5pbUNvbXBcIjtcclxuLy8gaW1wb3J0IFJlYmF0ZU1vZGVsIGZyb20gXCIuLi9yZWJhdGUvUmViYXRlTW9kZWxcIjtcclxuaW1wb3J0IEhhbGxQb3BNc2dIZWxwZXIsIHsgUG9wV25kTmFtZSB9IGZyb20gXCIuLi8uLi90b29sL0hhbGxQb3BNc2dIZWxwZXJcIjtcclxuaW1wb3J0IEdhbWVMaXN0VmlldyBmcm9tIFwiLi92aWV3cy9HYW1lTGlzdFZpZXdcIjtcclxuaW1wb3J0IEV2ZW50Q29tcCBmcm9tIFwiLi4vLi4vLi4vY29yZS9jb21wb25lbnQvRXZlbnRDb21wXCI7XHJcbmltcG9ydCBCYW5uZXJWaWV3IGZyb20gXCIuL3ZpZXdzL0Jhbm5lclZpZXdcIjtcclxuaW1wb3J0IEFwcEhlbHBlciBmcm9tIFwiLi4vLi4vLi4vY29yZS90b29sL0FwcEhlbHBlclwiO1xyXG5pbXBvcnQgSGFsbE1vcmVHYW1lVG9wTm9kZSBmcm9tIFwiLi92aWV3cy9IYWxsTW9yZUdhbWVUb3BOb2RlXCI7XHJcbmltcG9ydCBIYWxsR3VpRGVsaW5lc1ZpZXcgZnJvbSBcIi4vdmlld3MvSGFsbEd1aURlbGluZXNWaWV3XCI7XHJcbmltcG9ydCBQbGF5ZXJJbmZvTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvUGxheWVySW5mb01vZGVsXCI7XHJcbmltcG9ydCBSZWNoYXJnZUdpZnRNb2RlbCBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9SZWNoYXJnZUdpZnRNb2RlbFwiO1xyXG5pbXBvcnQgR2FtZUxpc3RWaWV3QSBmcm9tIFwiLi92aWV3cy9HYW1lTGlzdFZpZXdBXCI7XHJcbmltcG9ydCBIYWxsQnRuSGVscGVyIGZyb20gXCIuL3ZpZXdzL0hhbGxCdG5IZWxwZXJcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV25kSGFsbCBleHRlbmRzIFduZEJhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgbW9kZWw6IEhhbGxNb2RlbDtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBNc2dNb2RlbDogTXNnTW9kZWxcclxuICAgIHByaXZhdGUgcmVjaGFyZ2VNb2RlbDogUmVjaGFyZ2VHaWZ0TW9kZWxcclxuICAgIHByaXZhdGUgaXRlbUFyZWFXaWRnZXQ6IGNjLldpZGdldFxyXG4gICAgcHJpdmF0ZSBnb25nZ2FvQXJlYVdpZGdldDogY2MuV2lkZ2V0XHJcbiAgICBwcml2YXRlIGhlYWRWaWV3V2lkZ2V0OiBjYy5XaWRnZXRcclxuICAgIHByaXZhdGUgbGVmdEFycm93V2lkZ2V0OiBjYy5XaWRnZXRcclxuICAgIHByaXZhdGUgd2FsbGV0Vmlld1dpZGdldDogY2MuV2lkZ2V0XHJcblxyXG4gICAgZ2FtZUxpc3RWaWV3OiBjYy5TY3JvbGxWaWV3O1xyXG4gICAgZ2FtZUxpc3RJdGVtOiBhbnk7XHJcbiAgICBnYW1lQ29udGVudDogY2MuTm9kZTtcclxuXHJcbiAgICAvL+e7hOS7tlxyXG4gICAgcHJpdmF0ZSB0b3BWaWV3OiBIYWxsVG9wVmlldztcclxuICAgIHByaXZhdGUgYm90dG9tVmlldzogSGFsbEJvdHRvbVZpZXc7XHJcbiAgICBwcml2YXRlIGd1aURlbGluZXNWaWV3OiBIYWxsR3VpRGVsaW5lc1ZpZXc7XHJcbiAgICAvL1xyXG4gICAgcHJpdmF0ZSBnb25nR2FvOiBCYW5uZXJWaWV3O1xyXG4gICAgLy9cclxuXHJcbiAgICBwcml2YXRlIGdhbWVzVmlldzogYW55O1xyXG5cclxuICAgIHByaXZhdGUgbW9yZUdhbWVUb3BWaWV3OiBIYWxsTW9yZUdhbWVUb3BOb2RlO1xyXG4gICAgcHJpdmF0ZSBtb3JlR2FtZUJ0bjogY2MuTm9kZTsvL+abtOWkmua4uOaIj+aMiemSrlxyXG4gICAgcHJpdmF0ZSBjYW5CYWNrOiBib29sZWFuID0gZmFsc2U7Ly/pgb/lhY3lkIzml7bmjInkuIso6IO95ZCm6L+U5ZueKVxyXG4gICAgcHJpdmF0ZSBjYW5Nb3JlOiBib29sZWFuID0gdHJ1ZTsvL+mBv+WFjeWQjOaXtuaMieS4iyjog73lkKbmjInmm7TlpJrmuLjmiI/liJfooagpXHJcblxyXG4gICAgcHJpdmF0ZSBpbnRvSGFsbEFuaW1Db21wOiBJbnRvSGFsbEFuaW1Db21wO1xyXG4gICAgcHJpdmF0ZSBwYW9NYURlbmdOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBldmVudENvbXA6IEV2ZW50Q29tcDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiV25kSGFsbFwiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBcIk1haW5MYXllclwiO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbEB1aS9IYWxsVUlcIjtcclxuICAgICAgICB0aGlzLm1vZGVsID0gPEhhbGxNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiSGFsbE1vZGVsXCIpO1xyXG4gICAgICAgIHRoaXMuTXNnTW9kZWwgPSA8TXNnTW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIk1zZ01vZGVsXCIpO1xyXG4gICAgICAgIHRoaXMucmVjaGFyZ2VNb2RlbCA9IDxSZWNoYXJnZUdpZnRNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiUmVjaGFyZ2VHaWZ0TW9kZWxcIik7XHJcbiAgICAgICAgdGhpcy5kZXN0b3J5VHlwZSA9IERlc3RvcnlUeXBlLk5vbmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMubm9kZS53aWR0aCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLndpZHRoO1xyXG4gICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgIGxldCBjc05vZGUgPSB0aGlzLmdldENoaWxkKFwiYm90dG9tTm9kZS9sYXlvdXROb2RlL2NhaXNoZW5Ob2RlXCIpO1xyXG4gICAgICAgIHRoaXMubW9kZWwuY3NOb2RlUG9zID0gY3NOb2RlO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5sZWZ0QXJyb3dXaWRnZXQgPSB0aGlzLmdldENvbXBvbmVudChcImNlbnRlck5vZGUvc2hhbl9sZWZ0XCIsIGNjLldpZGdldClcclxuICAgICAgICB0aGlzLml0ZW1BcmVhV2lkZ2V0ID0gdGhpcy5nZXRDb21wb25lbnQoXCJjZW50ZXJOb2RlL2NlbnRlckNvbnRlbnQvY29udGVudFZpZXcvY29udGVudC9pdGVtUGFyZW50XCIsIGNjLldpZGdldClcclxuICAgICAgICB0aGlzLmdvbmdnYW9BcmVhV2lkZ2V0ID0gdGhpcy5nZXRDb21wb25lbnQoXCJjZW50ZXJOb2RlL2NlbnRlckNvbnRlbnQvY29udGVudFZpZXcvY29udGVudC9nb25nZ2FvQXJlYS9nb25nZ2FvTm9kZVwiLCBjYy5XaWRnZXQpXHJcbiAgICAgICAgdGhpcy5oZWFkVmlld1dpZGdldCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiYm90dG9tTm9kZS9QbGF5ZXJIZWFkVmlld1wiLCBjYy5XaWRnZXQpXHJcbiAgICAgICAgaWYgKHRoaXMuaXRlbUFyZWFXaWRnZXQgJiYgdGhpcy5nb25nZ2FvQXJlYVdpZGdldCAmJiB0aGlzLmhlYWRWaWV3V2lkZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEFyZWFXaWRnZXQoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tb3JlR2FtZVRvcFZpZXcgPSA8SGFsbE1vcmVHYW1lVG9wTm9kZT50aGlzLmFkZFZpZXcoXCJIYWxsTW9yZUdhbWVUb3BOb2RlXCIsIHRoaXMuZ2V0Q2hpbGQoXCJtb3JlR2FtZXRvcE5vZGVcIiksIEhhbGxNb3JlR2FtZVRvcE5vZGUpO1xyXG4gICAgICAgIHRoaXMubW9yZUdhbWVUb3BWaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8v5pu05aSa5ri45oiP5byA5YWz5oyJ6ZKuXHJcbiAgICAgICAgdGhpcy5tb3JlR2FtZUJ0biA9IHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJjZW50ZXJOb2RlL2NlbnRlckNvbnRlbnQvY29udGVudFZpZXcvY29udGVudC9tb3JlR2FtZUJ0blwiLCB0aGlzLmNsaWNrTW9yZUdhbWUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubW9yZUdhbWVCdG4uYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8v5YWs5ZGK57uE5Lu2XHJcbiAgICAgICAgdGhpcy5pbml0R29uZ0dhb1ZpZXcoKVxyXG4gICAgICAgIC8v6LeR6ams54Gv57uE5Lu2XHJcbiAgICAgICAgLy8gdGhpcy5wYW9NYURlbmcgPSA8SGFsbFBhb01hRGVuZ1ZpZXc+dGhpcy5hZGRWaWV3KFwiSGFsbFBhb01hRGVuZ1ZpZXdcIiwgdGhpcy5nZXRDaGlsZChcImNlbnRlck5vZGUvUGFvTWFEZW5nQm94XCIpLCBIYWxsUGFvTWFEZW5nVmlldyk7XHJcbiAgICAgICAgdGhpcy5wYW9NYURlbmdOb2RlID0gdGhpcy5nZXRDaGlsZChcImNlbnRlck5vZGUvUGFvTWFEZW5nQm94XCIpO1xyXG4gICAgICAgIGxldCBwYW9tYWRlbmdNYXNrID0gdGhpcy5nZXRDaGlsZChcImNlbnRlck5vZGUvUGFvTWFEZW5nQm94L01zZ0JveFwiKTtcclxuICAgICAgICBsZXQgdHRmZm9udCA9IHRoaXMuZ2V0Q2hpbGQoXCJjZW50ZXJOb2RlL1Bhb01hRGVuZ0JveC9Nc2dCb3gvUE1ETXNnSXRlbVwiKTtcclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkUGFvTWFEZW5nQ29tcChwYW9tYWRlbmdNYXNrLCB0cnVlLCBudWxsLCB0dGZmb250LmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuZm9udCk7XHJcbiAgICAgICAgR2xvYmFsLlVJSGVscGVyLmFkZFByaXZhdGVNYXJxdWVlQ29tcCh0aGlzLmdldENoaWxkKFwic2hvd05vZGVcIikpO1xyXG4gICAgICAgIC8v5LiK5LiLQmFy57uE5Lu2XHJcbiAgICAgICAgdGhpcy50b3BWaWV3ID0gPEhhbGxUb3BWaWV3PnRoaXMuYWRkVmlldyhcIkhhbGxUb3BWaWV3XCIsIHRoaXMuZ2V0Q2hpbGQoXCJ0b3BOb2RlXCIpLCBIYWxsVG9wVmlldyk7XHJcbiAgICAgICAgdGhpcy5ib3R0b21WaWV3ID0gPEhhbGxCb3R0b21WaWV3PnRoaXMuYWRkVmlldyhcIkhhbGxCb3R0b21WaWV3XCIsIHRoaXMuZ2V0Q2hpbGQoXCJib3R0b21Ob2RlXCIpLCBIYWxsQm90dG9tVmlldyk7XHJcbiAgICAgICAgdGhpcy5ndWlEZWxpbmVzVmlldyA9IDxIYWxsR3VpRGVsaW5lc1ZpZXc+dGhpcy5hZGRWaWV3KFwiSGFsbEd1aURlbGluZXNWaWV3XCIsIHRoaXMuZ2V0Q2hpbGQoXCJndWlkZWxpbmVzXCIpLCBIYWxsR3VpRGVsaW5lc1ZpZXcpO1xyXG4gICAgICAgIHRoaXMuaW5pdEdhbWVMaXN0KClcclxuICAgICAgICAvL+a4uOaIj+WIl+ihqOWIneWni+WMllxyXG4gICAgICAgIHRoaXMuZ2FtZUxpc3RWaWV3ID0gdGhpcy5nZXRDb21wb25lbnQoXCJjZW50ZXJOb2RlL2NlbnRlckNvbnRlbnRcIiwgY2MuU2Nyb2xsVmlldyk7XHJcbiAgICAgICAgdGhpcy5nYW1lTGlzdEl0ZW0gPSB0aGlzLmdldENoaWxkKFwiY2VudGVyTm9kZS9nYW1lTGlzdEl0ZW1cIik7XHJcbiAgICAgICAgdGhpcy5nYW1lQ29udGVudCA9IHRoaXMuZ2FtZUxpc3RWaWV3LmNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy5nYW1lTGlzdFZpZXcuaW5lcnRpYSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5nYW1lTGlzdFZpZXcuYnJha2UgPSAwLjI7XHJcblxyXG4gICAgICAgIEdsb2JhbC5Ub29sa2l0LmFkanVzdElwaG9uZVgoW3RoaXMuZ2V0Q2hpbGQoXCJjZW50ZXJOb2RlXCIpXSwgMzApO1xyXG5cclxuICAgICAgICBHbG9iYWwuVG9vbGtpdC5hZGp1c3RJcGhvbmVYKFt0aGlzLmdldENoaWxkKFwidG9wTm9kZVwiKV0sIDEwKTtcclxuXHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9ET1dOLCB0aGlzLm9uS2V5RG93biwgdGhpcylcclxuXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9uKEdsb2JhbEV2ZW50LlVQREFURV9HQU1FX0xJU1QsIHRoaXMsIHRoaXMuaW5pdEdhbWVMaXN0Vmlldyk7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9uKEdsb2JhbEV2ZW50LlBPUF9CSU5EX1BIT05FLCB0aGlzLCB0aGlzLlBvcFVwQmluZFBob25lKTtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub24oR2xvYmFsRXZlbnQuT3BlbldlYlZpZXdHYW1lLCB0aGlzLCB0aGlzLm9uT3BlbldlYlZpZXdHYW1lKVxyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vbihHbG9iYWxFdmVudC5DbG9zZVdlYlZpZXdHYW1lLCB0aGlzLCB0aGlzLm9uQ2xvc2VXZWJWaWV3R2FtZSlcclxuICAgICAgICBHbG9iYWwuRXZlbnQub24oR2xvYmFsRXZlbnQuUmVjb3JkR2FtZUxpc3RPZmZzZXRYLCB0aGlzLCB0aGlzLlJlY29yR2FtZUxpc3RTY3JvbGxYKTtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub24oR2xvYmFsRXZlbnQuQ2xvc2VNb3JlR2FtZSwgdGhpcywgdGhpcy5jbG9zZU1vcmVHYW1lKVxyXG5cclxuXHJcbiAgICAgICAgLy/liIflnLrmma/ml7bvvIxoYWxs55WM6Z2i5LiN5YWz6ZetICDpgJrov4fohJrmnKxvbmRpc2FibGXop6blj5FvbkNsb3NlXHJcbiAgICAgICAgdGhpcy5ldmVudENvbXAgPSB0aGlzLm5vZGUuYWRkQ29tcG9uZW50KEV2ZW50Q29tcCk7XHJcbiAgICAgICAgdGhpcy5ldmVudENvbXAuZGlzYWJsZUNhbGxiYWNrID0gdGhpcy5vbkNsb3NlO1xyXG4gICAgICAgIHRoaXMuZXZlbnRDb21wLnRhcmdldCA9IHRoaXM7XHJcbiAgICB9XHJcbiAgICBpbml0R29uZ0dhb1ZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5nb25nR2FvID0gPEJhbm5lclZpZXc+dGhpcy5hZGRWaWV3KFwiQmFubmVyVmlld1wiLCB0aGlzLmdldENoaWxkKFwiY2VudGVyTm9kZS9jZW50ZXJDb250ZW50L2NvbnRlbnRWaWV3L2NvbnRlbnQvZ29uZ2dhb0FyZWEvZ29uZ2dhb05vZGVcIiksIEJhbm5lclZpZXcpO1xyXG4gICAgICAgIC8vIHJldHVyblxyXG4gICAgICAgIC8vIGxldCBzdG9yZ2VIYWxsID0gR2xvYmFsLmN1c3RvbUFwcC5nZXRIYWxsQnVuZGxlTmFtZSgpXHJcbiAgICAgICAgLy8gaWYgKHN0b3JnZUhhbGwuZW5kc1dpdGgoJzAnKSlcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuZ29uZ0dhbyA9IDxCYW5uZXJWaWV3PnRoaXMuYWRkVmlldyhcIkJhbm5lclZpZXdcIiwgdGhpcy5nZXRDaGlsZChcImNlbnRlck5vZGUvY2VudGVyQ29udGVudC9nb25nZ2FvQXJlYS9nb25nZ2FvTm9kZVwiKSwgQmFubmVyVmlldyk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2UgaWYoc3RvcmdlSGFsbC5lbmRzV2l0aCgnMScpKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5nb25nR2FvID0gPEJhbm5lclZpZXc+dGhpcy5hZGRWaWV3KFwiQmFubmVyVmlld1wiLCB0aGlzLmdldENoaWxkKFwiY2VudGVyTm9kZS9jZW50ZXJDb250ZW50L2l0ZW1BcmVhL2NvbnRlbnRWaWV3L2NvbnRlbnQvZ29uZ2dhb0FyZWEvZ29uZ2dhb05vZGVcIiksIEJhbm5lclZpZXcpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEdhbWVMaXN0KCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZXNWaWV3ID0gdGhpcy5nZXRHYW1lTGlzdEJ5SGFsbCgpXHJcbiAgICAgICAgdGhpcy5nYW1lc1ZpZXcuc2V0Tm9kZSh0aGlzLmdldENoaWxkKFwiY2VudGVyTm9kZVwiKSk7XHJcbiAgICAgICAgdGhpcy5nYW1lc1ZpZXcuc3ViVmlld1N0YXRlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFJlY29yR2FtZUxpc3RTY3JvbGxYKCkge1xyXG4gICAgICAgIHRoaXMubW9kZWwuc2V0RW50ZXJHYW1lT2Zmc2V0WCh0aGlzLmdhbWVMaXN0Vmlldy5nZXRTY3JvbGxPZmZzZXQoKS54KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHYW1lTGlzdEJ5SGFsbCgpIHtcclxuICAgICAgICBsZXQgc3RvcmdlSGFsbCA9IEdsb2JhbC5jdXN0b21BcHAuZ2V0SGFsbEJ1bmRsZU5hbWUoKVxyXG4gICAgICAgIGlmIChzdG9yZ2VIYWxsLmVuZHNXaXRoKCcwJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHYW1lTGlzdFZpZXdBKClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc3RvcmdlSGFsbC5lbmRzV2l0aCgnMScpIHx8IHN0b3JnZUhhbGwuZW5kc1dpdGgoJzInKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdhbWVMaXN0Vmlld0EoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGluaXRBcmVhV2lkZ2V0KCkge1xyXG4gICAgICAgIC8vIGxldCBoYWxsID0gR2xvYmFsLmN1c3RvbUFwcC5nZXRIYWxsQnVuZGxlTmFtZSgpXHJcbiAgICAgICAgLy8gaWYoIWhhbGwuZW5kc1dpdGgoJzAnKSlcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHJldHVyblxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBsZXQgc2NyZWVuV2lkdGggPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS53aWR0aFxyXG4gICAgICAgIGxldCBzY3JlZW5IZWlnaHQgPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS5oZWlnaHRcclxuICAgICAgICBsZXQgcmF0aW8gPSBzY3JlZW5XaWR0aCAvIHNjcmVlbkhlaWdodFxyXG4gICAgICAgIGxldCBoYWxsV2lkZ2V0Q2ZnID0gR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5nZXRIYWxsV2lkZ2V0Q2ZnKClcclxuICAgICAgICBpZiAoTWF0aC5hYnMocmF0aW8gLSAxMjgwIC8gNzIwKSA8IDAuMDIpIHsgLy8gMTI4MCDns7vliJfliIbovqjnjodcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXRlbUFyZWFXaWRnZXQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1BcmVhV2lkZ2V0LmxlZnQgPSBoYWxsV2lkZ2V0Q2ZnW1wiaXRlbUFyZWFXaWRnZXRcIl1bMF1cclxuICAgICAgICAgICAgLy8gaWYgKHRoaXMubGVmdEFycm93V2lkZ2V0KVxyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5sZWZ0QXJyb3dXaWRnZXQubGVmdCA9IGhhbGxXaWRnZXRDZmdbXCJsZWZ0QXJyb3dXaWRnZXRcIl1bMF1cclxuICAgICAgICAgICAgaWYgKHRoaXMuZ29uZ2dhb0FyZWFXaWRnZXQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvbmdnYW9BcmVhV2lkZ2V0LmxlZnQgPSBoYWxsV2lkZ2V0Q2ZnW1wiZ29uZ2dhb0FyZWFXaWRnZXRcIl1bMF1cclxuICAgICAgICAgICAgaWYgKHRoaXMuaGVhZFZpZXdXaWRnZXQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWRWaWV3V2lkZ2V0LmxlZnQgPSBoYWxsV2lkZ2V0Q2ZnW1wiaGVhZFZpZXdXaWRnZXRcIl1bMF1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vNDUwXHJcbiAgICAgICAgICAgIGlmICh0aGlzLml0ZW1BcmVhV2lkZ2V0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtQXJlYVdpZGdldC5sZWZ0ID0gaGFsbFdpZGdldENmZ1tcIml0ZW1BcmVhV2lkZ2V0XCJdWzFdXHJcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmxlZnRBcnJvd1dpZGdldClcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMubGVmdEFycm93V2lkZ2V0LmxlZnQgPSBoYWxsV2lkZ2V0Q2ZnW1wibGVmdEFycm93V2lkZ2V0XCJdWzFdXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdvbmdnYW9BcmVhV2lkZ2V0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5nb25nZ2FvQXJlYVdpZGdldC5sZWZ0ID0gaGFsbFdpZGdldENmZ1tcImdvbmdnYW9BcmVhV2lkZ2V0XCJdWzFdXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhlYWRWaWV3V2lkZ2V0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWFkVmlld1dpZGdldC5sZWZ0ID0gaGFsbFdpZGdldENmZ1tcImhlYWRWaWV3V2lkZ2V0XCJdWzFdXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uS2V5RG93bihldmVudCkge1xyXG4gICAgICAgIGlmICghQ0NfUFJFVklFVylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5hOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIkVWRU5UX0NBTExfUkVDT05ORUNUXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9DQUxMX1JFQ09OTkVDVCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnM6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCJ0ZXN0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9GT1JDRV9MRUFWRV9HQU1FLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuZDpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVG9vbGtpdC5kdW1wUmVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuZXNjYXBlOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi5rWL6K+V5a2Q5ri45oiP5YaF5pS25Yiw55qE5aSn5Y6F5by556qX5raI5oGvXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5iYWNrOiB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQub25TaG93RXhpdERpYWxvZygpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIG9uT3BlbigpIHtcclxuICAgICAgICAvL+a4uOaIj+aBouWkjSjmlq3nur/ph43ov54pXHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWwubmVlZFF1YXJ5U3RhdGUpXHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwucmVxUXVlcnlTdGF0ZSgpO1xyXG4gICAgICAgIC8v5omT5byA5aSn5Y6FICDor7fmsYLnjqnlrrbotKfluIFcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkdldFVzZXJQb2ludCwge30pO1xyXG4gICAgICAgIHRoaXMuY2hlY2tHYW1lTXNnKCk7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50Lk9OX0hBTExfT1BFTik7XHJcbiAgICAgICAgdGhpcy5zaG93QWxsU3ViVmlldygpXHJcbiAgICAgICAgLy/or7fmsYLmtLvliqgg5Y+z5LiK6KeS5rS75Yqo5bCP57qi54K56ZyA6KaBXHJcbiAgICAgICAgdGhpcy5tb2RlbC5yZXF1ZXN0TXlBY3Rpdml0eUxpc3QoKTtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL2xvYWRpbmdcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbml0TXVzaWMoKVxyXG4gICAgICAgIHRoaXMudHJ5SW5pdEdhbWVsaXN0KClcclxuICAgICAgICBpZiAodGhpcy5ndWlEZWxpbmVzVmlldyAmJiB0aGlzLm1vZGVsLm1vcmVHYW1lU3RhdHVzID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3VpRGVsaW5lc1ZpZXcuZ2V0TmV3TXNnKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMuaW5pdEhhbGxBY3Rpdml0eSgpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xvc2VNb3JlR2FtZShpc0Nsb3NlOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKGlzQ2xvc2UgJiYgdGhpcy5jYW5CYWNrKSB7XHJcbiAgICAgICAgICAgIC8v5YWz6Zet5pu05aSa5ri45oiP5YiX6KGo6aG16Z2i5pWI5p6cXHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VNb3JlR2FtZUFuaSgpO1xyXG4gICAgICAgICAgICAvL+mHjee9rmVudGVyR2FtZU9mZnNldFhcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5zZXRFbnRlckdhbWVPZmZzZXRYKDApO1xyXG4gICAgICAgICAgICAvL+WIt+aWsOa4uOaIj+WIl+ihqFxyXG4gICAgICAgICAgICB0aGlzLmdhbWVzVmlldy5yZWZyZXNoR2FtZUxpc3QodGhpcy5tb2RlbC5lbnRlckdhbWVPZmZzZXRYLCBmYWxzZSwgdGhpcy5hbmltYXRpb25DYWxsQmFjay5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgLy/kv53lrZjmuLjmiI/liJfooajnirbmgIFcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5zZXRNb3JlR2FtZVN0YXR1cyhmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3VpRGVsaW5lc1ZpZXcuZ2V0TmV3TXNnKCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsaWNrTW9yZUdhbWUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FuTW9yZSkge1xyXG4gICAgICAgICAgICAvL+abtOWkmua4uOaIj+WIl+ihqOmhtemdouaViOaenFxyXG4gICAgICAgICAgICB0aGlzLm1vcmVHYW1lQW5pKCk7XHJcbiAgICAgICAgICAgIC8v6YeN572uZW50ZXJHYW1lT2Zmc2V0WFxyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLnNldEVudGVyR2FtZU9mZnNldFgoMCk7XHJcbiAgICAgICAgICAgIC8v5Yi35paw5ri45oiP5YiX6KGo5Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZXNWaWV3LnJlZnJlc2hHYW1lTGlzdCh0aGlzLm1vZGVsLmVudGVyR2FtZU9mZnNldFgsIHRydWUsIHRoaXMuYW5pbWF0aW9uQ2FsbEJhY2suYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIC8v5L+d5a2Y5ri45oiP5YiX6KGo54q25oCBXHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwuc2V0TW9yZUdhbWVTdGF0dXModHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5omT5byA5pu05aSa5ri45oiP5YiX6KGo6aG16Z2i5pWI5p6cXHJcbiAgICBwcml2YXRlIG1vcmVHYW1lQW5pKCkge1xyXG4gICAgICAgIC8v5Y6f5YWI5aS06YOo6ZqQ6JePXHJcbiAgICAgICAgdGhpcy50b3BWaWV3Lm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmhpZGUoKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRvcFZpZXcuc3ViVmlld1N0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgdGhpcykpKTtcclxuICAgICAgICAvL+aWsOWktOmDqOWHuueOsFxyXG4gICAgICAgIHRoaXMubW9yZUdhbWVUb3BWaWV3LnN1YlZpZXdTdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tb3JlR2FtZVRvcFZpZXcubm9kZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICB0aGlzLm1vcmVHYW1lVG9wVmlldy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5zaG93KCksIGNjLmZhZGVJbigwLjUpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuQmFjayA9IHRydWU7IC8v5Y+v5Lul6L+U5ZueXHJcbiAgICAgICAgfSkpKTtcclxuICAgICAgICAvL+iHqui6q+makOiXj+WKqOeUu1xyXG4gICAgICAgIHRoaXMubW9yZUdhbWVCdG4ucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmZhZGVPdXQoMC41KSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1vcmVHYW1lQnRuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNhbk1vcmUgPSBmYWxzZTtcclxuICAgICAgICB9LCB0aGlzKSkpO1xyXG4gICAgICAgIC8v5YWs5ZGK57yp6L+b5bem6L655Yqo55S7XHJcbiAgICAgICAgdGhpcy5nb25nR2FvLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmZhZGVPdXQoMC41KSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdvbmdHYW8uc3ViVmlld1N0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgdGhpcykpKTtcclxuICAgICAgICAvL+W6lemDqOa2iOaBr+WKqOeUu1xyXG4gICAgICAgIHRoaXMuYm90dG9tVmlldy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5mYWRlT3V0KDAuNSksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ib3R0b21WaWV3LnN1YlZpZXdTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0sIHRoaXMpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lhbPpl63mm7TlpJrmuLjmiI/liJfooajpobXpnaLmlYjmnpxcclxuICAgIHByaXZhdGUgY2xvc2VNb3JlR2FtZUFuaSgpIHtcclxuICAgICAgICAvL+aWsOWktOmDqOa2iOWksVxyXG4gICAgICAgIHRoaXMubW9yZUdhbWVUb3BWaWV3Lm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmhpZGUoKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1vcmVHYW1lVG9wVmlldy5zdWJWaWV3U3RhdGUgPSBmYWxzZTtcclxuICAgICAgICB9LCB0aGlzKSkpO1xyXG4gICAgICAgIC8v5pen5aS06YOo5Ye6546wXHJcbiAgICAgICAgdGhpcy5jYW5CYWNrID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50b3BWaWV3LnN1YlZpZXdTdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy50b3BWaWV3Lm5vZGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgdGhpcy50b3BWaWV3Lm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNob3coKSwgY2MuZmFkZUluKDAuNSkpKTtcclxuICAgICAgICAvL+WFrOWRiuWHuueOsFxyXG4gICAgICAgIHRoaXMuZ29uZ0dhby5zdWJWaWV3U3RhdGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZ29uZ0dhby5ub2RlLnJ1bkFjdGlvbihjYy5mYWRlSW4oMC41KSk7XHJcbiAgICAgICAgLy/mm7TlpJrmuLjmiI/mjInpkq7lh7rnjrBcclxuICAgICAgICB0aGlzLmNhbk1vcmUgPSB0cnVlOyAvL+WPr+S7peeCueWHu+abtOWkmua4uOaIj+aMiemSrlxyXG4gICAgICAgIC8vIHRoaXMubW9yZUdhbWVCdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyB0aGlzLm1vcmVHYW1lQnRuLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5mYWRlSW4oMC41KSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLmNhbk1vcmUgPSB0cnVlOyAvL+WPr+S7peeCueWHu+abtOWkmua4uOaIj+aMiemSrlxyXG4gICAgICAgIC8vIH0pKSk7XHJcbiAgICAgICAgLy/lupXpg6jlh7rnjrBcclxuICAgICAgICB0aGlzLmJvdHRvbVZpZXcuc3ViVmlld1N0YXRlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmJvdHRvbVZpZXcubm9kZS5ydW5BY3Rpb24oY2MuZmFkZUluKDAuNSkpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy/lpKfljoXnuqLljIUg5L+d6Zmp6YeRIOengeS6uui3kemprOeBr+etiea0u+WKqFxyXG4gICAgaW5pdEhhbGxBY3Rpdml0eSgpIHtcclxuICAgICAgICAvL+e6ouWMhVxyXG4gICAgICAgIHRoaXMubW9kZWwucmVxdWVzdEdldFJld2FyZFBhY2tDb3VudCgpXHJcbiAgICB9XHJcblxyXG4gICAgdHJ5SW5pdEdhbWVsaXN0KCkge1xyXG4gICAgICAgIGxldCBmbGFnID0gR2xvYmFsLkdhbWVEYXRhLmRhdGFJbml0RmluaXNoXHJcbiAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0R2FtZUxpc3RWaWV3KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpbml0TXVzaWMoKSB7XHJcbiAgICAgICAgaWYgKENDX0pTQikge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IFBsYXllckluZm9Nb2RlbCA9IEdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJQbGF5ZXJJbmZvTW9kZWxcIilcclxuICAgICAgICAgICAgaWYgKG1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICBtb2RlbC5Jbml0QmdtKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5BdWRpby5wbGF5SGFsbEJHTSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNob3dBbGxTdWJWaWV3KCkge1xyXG4gICAgICAgIHRoaXMudG9wVmlldy5zdWJWaWV3U3RhdGUgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5ib3R0b21WaWV3LnN1YlZpZXdTdGF0ZSA9IHRydWVcclxuICAgICAgICB0aGlzLmdvbmdHYW8uc3ViVmlld1N0YXRlID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMucmVjaGFyZ2VNb2RlbC5yZXFHZXRBY3Rpdml0eUNmZyhmYWxzZSlcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBhbmltYXRpb25DYWxsQmFjaygpIHtcclxuICAgICAgICBIYWxsUG9wTXNnSGVscGVyLkluc3RhbmNlLnBvcE1zZ0xpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrR2FtZU1zZygpIHtcclxuICAgICAgICBpZiAoR2FtZS5EYXRhQnJpZGdlLm1zZyA9PSBudWxsICYmIEdhbWUuRGF0YUJyaWRnZS5mYXN0VGlwTXNnID09IG51bGwgJiYgR2FtZS5EYXRhQnJpZGdlLmNhY2hlU2hvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKEdhbWUuRGF0YUJyaWRnZS5jYWNoZVNob3cpIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coR2FtZS5EYXRhQnJpZGdlLmNhY2hlU2hvdy53aW5kb3csIEdhbWUuRGF0YUJyaWRnZS5jYWNoZVNob3cuYXJncylcclxuICAgICAgICAgICAgR2FtZS5EYXRhQnJpZGdlLmNhY2hlU2hvdyA9IG51bGxcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEdhbWUuRGF0YUJyaWRnZS5tc2cpIHtcclxuICAgICAgICAgICAgbGV0IG1zZyA9IEdhbWUuRGF0YUJyaWRnZS5tc2c7XHJcbiAgICAgICAgICAgIEdhbWUuRGF0YUJyaWRnZS5tc2cgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAobXNnLmNvbnRlbnQgPT0gbnVsbCB8fCBtc2cuY29udGVudCA9PSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAobXNnLnR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3gobXNnLmNvbnRlbnQsIG1zZy55RnVuYywgbXNnLm5GdW5jKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93WWVzTm9Cb3gobXNnLmNvbnRlbnQsIG1zZy55RnVuYywgbXNnLm5GdW5jKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChHYW1lLkRhdGFCcmlkZ2UuZmFzdFRpcE1zZykge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChHYW1lLkRhdGFCcmlkZ2UuZmFzdFRpcE1zZyk7XHJcbiAgICAgICAgICAgIEdhbWUuRGF0YUJyaWRnZS5mYXN0VGlwTXNnID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgUG9wVXBOb3RpY2UoKSB7XHJcbiAgICAgICAgbGV0IHN0YXR1cyA9IHRoaXMuTXNnTW9kZWwuU3RhdHVzXHJcbiAgICAgICAgaWYgKHN0YXR1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgIEhhbGxQb3BNc2dIZWxwZXIuSW5zdGFuY2UuYWRkTG9jayhQb3BXbmROYW1lLk5vdGljZSk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kTm90aWNlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBQb3BVcEJpbmRQaG9uZSgpIHtcclxuICAgICAgICBIYWxsUG9wTXNnSGVscGVyLkluc3RhbmNlLmFkZExvY2soUG9wV25kTmFtZS5CaW5kUGhvbmUpO1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kQmluZFBob25lXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKCkge1xyXG4gICAgICAgIGlmIChHbG9iYWwuU2NlbmVNYW5hZ2VyLmluR2FtZSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZXNWaWV3LmNsb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ29uZ0dhby5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNwb3NlKCkge1xyXG5cclxuICAgICAgICBHbG9iYWwuRXZlbnQub2ZmKEdsb2JhbEV2ZW50LlVQREFURV9HQU1FX0xJU1QsIHRoaXMsIHRoaXMuaW5pdEdhbWVMaXN0VmlldylcclxuXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihHbG9iYWxFdmVudC5QT1BfQklORF9QSE9ORSwgdGhpcywgdGhpcy5Qb3BVcEJpbmRQaG9uZSk7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihHbG9iYWxFdmVudC5PcGVuV2ViVmlld0dhbWUsIHRoaXMsIHRoaXMub25PcGVuV2ViVmlld0dhbWUpXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihHbG9iYWxFdmVudC5DbG9zZVdlYlZpZXdHYW1lLCB0aGlzLCB0aGlzLm9uQ2xvc2VXZWJWaWV3R2FtZSlcclxuICAgICAgICBHbG9iYWwuRXZlbnQub2ZmKEdsb2JhbEV2ZW50LlJlY29yZEdhbWVMaXN0T2Zmc2V0WCwgdGhpcywgdGhpcy5SZWNvckdhbWVMaXN0U2Nyb2xsWCk7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihHbG9iYWxFdmVudC5DbG9zZU1vcmVHYW1lLCB0aGlzLCB0aGlzLmNsb3NlTW9yZUdhbWUpXHJcblxyXG4gICAgICAgIGlmICh0aGlzLmdhbWVDb250ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUNvbnRlbnQuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nYW1lc1ZpZXcuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+WIneWni+WMlua4uOaIj+WIl+ihqFxyXG4gICAgaW5pdEdhbWVMaXN0VmlldyhiQW5pbTogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICAvL+WFiOmAgumFjeWujOWGjeiuoeeul+S9jee9rlxyXG4gICAgICAgIEdsb2JhbC5Db21wb25lbnQuZnJhbWVFbmQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubm9kZS5pc1ZhbGlkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVzVmlldy5yZWZyZXNoR2FtZUxpc3QodGhpcy5tb2RlbC5lbnRlckdhbWVPZmZzZXRYLCB0aGlzLm1vZGVsLm1vcmVHYW1lU3RhdHVzLCB0aGlzLmFuaW1hdGlvbkNhbGxCYWNrLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5tb3JlR2FtZVN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3JlR2FtZUFuaSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJBbmltID0gdGhpcy5tb2RlbC5maXJzdE9wZW5IYWxsICYmIGJBbmltO1xyXG4gICAgICAgICAgICAvLyBsZXQgcmlnaHROb2RlQXJyID0gdGhpcy5nYW1lc1ZpZXcuZ2V0Tm9kZXNBcnIoKTtcclxuICAgICAgICAgICAgaWYgKGJBbmltKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLm1vZGVsLmZpcnN0T3BlbkhhbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuaW50b0hhbGxBbmltQ29tcCA9IEdsb2JhbC5VSUhlbHBlci5zYWZlR2V0Q29tcG9uZW50KHRoaXMubm9kZSwgXCJcIiwgSW50b0hhbGxBbmltQ29tcCk7XHJcbiAgICAgICAgICAgICAgICAvLyAvL3RoaXMuaW50b0hhbGxBbmltQ29tcC5hbHBoYU5vZGUgPSB0aGlzLmdldENoaWxkKFwiY2VudGVyTm9kZS9QYW9NYURlbmdCb3hcIik7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmludG9IYWxsQW5pbUNvbXAuYm90dG9tTm9kZUFyciA9IFt0aGlzLmJvdHRvbVZpZXcubm9kZV07XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmludG9IYWxsQW5pbUNvbXAudG9wTm9kZUFyciA9IFt0aGlzLnRvcFZpZXcubm9kZV07XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmludG9IYWxsQW5pbUNvbXAucmlnaHROb2RlQXJyID0gcmlnaHROb2RlQXJyO1xyXG4gICAgICAgICAgICAgICAgLy8gR2xvYmFsLkNvbXBvbmVudC5mcmFtZUVuZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5pbnRvSGFsbEFuaW1Db21wLmluaXQoKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmludG9IYWxsQW5pbUNvbXAuc3RhcnRBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25DYWxsQmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25PcGVuV2ViVmlld0dhbWUodXJsLCBzY2hlbWUsIGFjdGlvblZpZXdIaWRkZW4sIGdpZCkge1xyXG4gICAgICAgIGlmIChjYy5zeXMuaXNCcm93c2VyKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5HYW1lV2ViVmlldy5nYW1lV2ViVmlld1Nob3codXJsLCBmYWxzZSwgZ2lkID09IDkwMDEpO1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwi5rWP6KeI5Zmo546v5aKD5LiLXCIpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgR2xvYmFsLldlYlZpZXdDb250cm9sLnNob3dXZWJWaWV3KHVybCwgc2NoZW1lLCBhY3Rpb25WaWV3SGlkZGVuLCB0aGlzLm5vZGUsIGdpZClcclxuICAgICAgICB9XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIiBXZWJWaWV3R2FtZSBvcGVuIEhhbGxNb2RlbCByZXF1ZXN0QXBwbHlFbnRlckdhbWUgYmFzZTY0IHVybCBcIiwgdXJsLCBzY2hlbWUsIGFjdGlvblZpZXdIaWRkZW4pO1xyXG4gICAgfVxyXG4gICAgb25DbG9zZVdlYlZpZXdHYW1lKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZXNWaWV3Lm9uUmVzdW1lKClcclxuICAgICAgICB0aGlzLmluaXRNdXNpYygpXHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIldlYlZpZXdHYW1lIC0t5aSW5o6l5ri45oiP5bey5YWz6ZetXCIpO1xyXG4gICAgfVxyXG59Il19