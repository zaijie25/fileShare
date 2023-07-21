"use strict";
cc._RF.push(module, 'f67b6PKFEFFR7/aPYt2y6E8', 'BbwzGamePanel');
// bbwz/Bbwz/scripts/panel/BbwzGamePanel.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var BbwzDriver_1 = require("../BbwzDriver");
var BbwzData_1 = require("../data/BbwzData");
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
var BbwzPathHelper_1 = require("../tool/BbwzPathHelper");
var BbwzBigWinnerView_1 = require("../subview/BbwzBigWinnerView");
var BbwzStateView_1 = require("../subview/BbwzStateView");
var BbwzChipsManager_1 = require("../manager/BbwzChipsManager");
var BbwzMenuView_1 = require("../subview/BbwzMenuView");
var BbwzOnlinePlayerView_1 = require("../subview/player/BbwzOnlinePlayerView");
var BbwzSelfPlayerView_1 = require("../subview/player/BbwzSelfPlayerView");
var BbwzOtherPlayerView_1 = require("../subview/player/BbwzOtherPlayerView");
var BbwzSelectChipsView_1 = require("../subview/BbwzSelectChipsView");
var BbwzBetManager_1 = require("../manager/BbwzBetManager");
var BbwzGameEvent_1 = require("../data/BbwzGameEvent");
var BbwzBetAreaRootView_1 = require("../subview/BbwzBetAreaRootView");
var BbwzComparePokerView_1 = require("../subview/poker/BbwzComparePokerView");
var BbwzRewardAreaRootView_1 = require("../subview/BbwzRewardAreaRootView");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var taskEnable = false;
var betInterval = 0.1;
// 游戏层 根节点组件
var BbwzGamePanel = /** @class */ (function (_super) {
    __extends(BbwzGamePanel, _super);
    function BbwzGamePanel() {
        var _a;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playerMap = (_a = {},
            _a[BbwzConstDefine_1.BbwzRole.Self] = null,
            _a[BbwzConstDefine_1.BbwzRole.Wiser] = null,
            _a[BbwzConstDefine_1.BbwzRole.Online] = null,
            _a[BbwzConstDefine_1.BbwzRole.Richer1] = null,
            _a[BbwzConstDefine_1.BbwzRole.Richer2] = null,
            _a[BbwzConstDefine_1.BbwzRole.Richer3] = null,
            _a[BbwzConstDefine_1.BbwzRole.Richer4] = null,
            _a[BbwzConstDefine_1.BbwzRole.Richer5] = null,
            _a);
        // 下注帧循环相关
        _this.betEnable = false;
        return _this;
    }
    BbwzGamePanel.prototype.onLoad = function () {
        this.viewSet = new ViewSet();
        this.node.setContentSize(cc.Canvas.instance.node.getContentSize());
        this.initView();
    };
    BbwzGamePanel.prototype.onEnable = function () {
        Game.Event.on(BbwzGameEvent_1.default.onUserInfoTouch, this, this.onUserInfoShow);
        Global.Event.on(GlobalEvent.TYPE_VIP_ENTER_GAME, this, this.vipEnterGame);
    };
    BbwzGamePanel.prototype.onDisable = function () {
        Game.Event.off(BbwzGameEvent_1.default.onUserInfoTouch, this, this.onUserInfoShow);
        Global.Event.off(GlobalEvent.TYPE_VIP_ENTER_GAME, this, this.vipEnterGame);
    };
    BbwzGamePanel.prototype.vipEnterGame = function (msg) {
        if (msg.data._gid == BbwzConstDefine_1.default.GAME_ID && msg.data._glv === Game.Control.curLv) {
            Global.Event.event(GlobalEvent.VIPADMISSION, msg.data);
        }
    };
    BbwzGamePanel.prototype.initView = function () {
        this.initFloatView();
        this.initTopView();
        this.initBottomView();
        this.initCenterView();
        this.initManager();
        this.initMenuView();
        this.initHeadTipsManager();
        this.initTaskManager();
        BbwzConstDefine_1.default.addCommonClick(this.node, "topNode/button_history", this.historyBtnFunc, this);
        var paomadengNode = cc.find("topNode/paomadeng", this.node);
        var paomadengMask = cc.find("MsgBox", paomadengNode);
        Global.UIHelper.addPaoMaDengComp(paomadengMask, false, paomadengNode);
        Global.UIHelper.addWifiComp(cc.find("wifi", this.node), 2);
        Global.UIHelper.addAdmissionComp(cc.find("topNode/admissionBox", this.node));
        BbwzConstDefine_1.default.addCommonClick(this.node, "button_test", function () {
            Game.Event.event(Game.EVENT_CALL_RECONNECT);
        }, this);
    };
    /**
     *头像附加脚本
     */
    BbwzGamePanel.prototype.initPlayers = function () {
        var centerNode = cc.find("centerNode", this.node);
        var onlinePlayer = new BbwzOnlinePlayerView_1.default(cc.find("onlinePlayer", centerNode), BbwzConstDefine_1.BbwzRole.Online);
        onlinePlayer.active = true;
        this.playerMap[BbwzConstDefine_1.BbwzRole.Online] = onlinePlayer;
        var selfPlayer = new BbwzSelfPlayerView_1.default(cc.find("head/selfHead", centerNode), BbwzConstDefine_1.BbwzRole.Self);
        selfPlayer.active = true;
        this.playerMap[BbwzConstDefine_1.BbwzRole.Self] = selfPlayer;
        var wisePlayer = new BbwzOtherPlayerView_1.default(cc.find("head/headNode_0", centerNode), BbwzConstDefine_1.BbwzRole.Wiser);
        wisePlayer.active = false;
        this.playerMap[BbwzConstDefine_1.BbwzRole.Wiser] = wisePlayer;
        for (var i = 1; i <= 5; i++) {
            var node = cc.find("head/headNode_" + i, centerNode);
            var chair = BbwzConstDefine_1.BbwzRole.Richer1 + i - 1;
            var player = new BbwzOtherPlayerView_1.default(node, chair);
            player.active = false;
            this.playerMap[chair] = player;
        }
    };
    BbwzGamePanel.prototype.initFloatView = function () {
        var floatNode = cc.find('floatNode', this.node);
        // 牌局状态
        var statePrefab = Global.ResourceManager.getBundleRes(BbwzConstDefine_1.default.GAME_ID, BbwzPathHelper_1.default.gamePrefabsPath + "panel/subView/stateView", cc.Prefab);
        var stateNode = cc.instantiate(statePrefab);
        stateNode.setParent(floatNode);
        stateNode.setPosition(cc.Vec2.ZERO);
        this.stateView = new BbwzStateView_1.default(stateNode);
        this.stateView.active = false;
        this.registView(BbwzConstDefine_1.default.ViewState, this.stateView);
        // 大赢家
        var bigWinnerPrefab = Global.ResourceManager.getBundleRes(BbwzConstDefine_1.default.GAME_ID, BbwzPathHelper_1.default.gamePrefabsPath + "panel/subView/bigWinner", cc.Prefab);
        var bigWinnerNode = cc.instantiate(bigWinnerPrefab);
        bigWinnerNode.setParent(floatNode);
        bigWinnerNode.setPosition(cc.Vec2.ZERO);
        this.bigWinnerView = new BbwzBigWinnerView_1.default(bigWinnerNode);
        this.bigWinnerView.active = false;
        this.registView(BbwzConstDefine_1.default.ViewBigWinner, this.bigWinnerView);
    };
    BbwzGamePanel.prototype.initTopView = function () {
        var topNode = cc.find("topNode", this.node);
        // 荷官位置
        var dealerNode = cc.find("dealerNode", topNode);
        BbwzData_1.default.instance.playerChipsFlyPos[BbwzConstDefine_1.BbwzRole.Dealer] = topNode.convertToWorldSpaceAR(dealerNode.position);
        // 比牌面板
        var compareRootPrefab = Global.ResourceManager.getBundleRes(BbwzConstDefine_1.default.GAME_ID, BbwzPathHelper_1.default.gamePrefabsPath + "panel/subView/comparePoker", cc.Prefab);
        var compareRootNode = cc.instantiate(compareRootPrefab);
        compareRootNode.setParent(topNode);
        compareRootNode.setPosition(cc.Vec2.ZERO);
        this.compareRootView = new BbwzComparePokerView_1.default(compareRootNode);
        this.compareRootView.active = false;
        this.registView(BbwzConstDefine_1.default.ViewComparePoker, this.compareRootView);
    };
    BbwzGamePanel.prototype.initBottomView = function () {
        var bottomNode = cc.find("bottomNode", this.node);
        // 下注区域
        var betAreaPrefab = Global.ResourceManager.getBundleRes(BbwzConstDefine_1.default.GAME_ID, BbwzPathHelper_1.default.gamePrefabsPath + "panel/subView/betArea", cc.Prefab);
        var betAreaRoot = cc.instantiate(betAreaPrefab);
        betAreaRoot.setParent(bottomNode);
        betAreaRoot.setPosition(cc.Vec2.ZERO);
        this.betAreaRootView = new BbwzBetAreaRootView_1.default(betAreaRoot);
        this.betAreaRootView.active = true;
        this.registView(BbwzConstDefine_1.default.ViewBetAreaRoot, this.betAreaRootView);
    };
    BbwzGamePanel.prototype.initCenterView = function () {
        var centerNode = cc.find("centerNode", this.node);
        this.initPlayers();
        // 结算区域
        var rewardAreaPrefab = Global.ResourceManager.getBundleRes(BbwzConstDefine_1.default.GAME_ID, BbwzPathHelper_1.default.gamePrefabsPath + "panel/subView/rewardArea", cc.Prefab);
        var rewardAreaRoot = cc.instantiate(rewardAreaPrefab);
        rewardAreaRoot.setParent(centerNode);
        rewardAreaRoot.setPosition(cc.Vec2.ZERO);
        this.rewardAreaView = new BbwzRewardAreaRootView_1.default(rewardAreaRoot);
        this.rewardAreaView.active = true;
        this.registView(BbwzConstDefine_1.default.ViewRewardAreaRoot, this.rewardAreaView);
        // 底部筹码栏
        var chipsPrefab = Global.ResourceManager.getBundleRes(BbwzConstDefine_1.default.GAME_ID, BbwzPathHelper_1.default.gamePrefabsPath + "panel/subView/selectChipsNode", cc.Prefab);
        var chipsNode = cc.instantiate(chipsPrefab);
        chipsNode.setParent(centerNode);
        chipsNode.setPosition(cc.Vec2.ZERO);
        this.selectChipsView = new BbwzSelectChipsView_1.default(chipsNode);
        this.selectChipsView.active = true;
        this.registView(BbwzConstDefine_1.default.ViewSelectChip, this.selectChipsView);
    };
    BbwzGamePanel.prototype.initHeadTipsManager = function () {
        this.headTipsManager = new HeadTipsManager();
        this.headTipsManager.init(cc.find('floatNode', this.node), cc.find('floatNode', this.node), true);
    };
    BbwzGamePanel.prototype.initTaskManager = function () {
        this.taskManager = new TaskManager();
        this.taskManager.init(cc.find('taskRoot', this.node), BbwzConstDefine_1.default.GAME_ID, -1);
        this.taskManager.reqGetGameTaskList();
    };
    /**
     * 桌面上的小筹码
     */
    BbwzGamePanel.prototype.initManager = function () {
        var rootNode = cc.find("centerNode/chips", this.node);
        BbwzDriver_1.default.instance.chipManager = new BbwzChipsManager_1.default(rootNode);
    };
    BbwzGamePanel.prototype.initMenuView = function () {
        var node = cc.find("menuNode", this.node);
        Global.Toolkit.adjustIphoneX([node]);
        var menuView = new BbwzMenuView_1.default(node);
        menuView.active = true;
        this.registView(BbwzConstDefine_1.default.ViewMenu, menuView);
    };
    BbwzGamePanel.prototype.onDestroy = function () {
        this.taskManager.onDispose();
    };
    /**
     * 历史记录 按钮
     */
    BbwzGamePanel.prototype.historyBtnFunc = function () {
        BbwzConstDefine_1.default.playBtnSound();
        BbwzDriver_1.default.instance.historyPop.node.active = true;
    };
    BbwzGamePanel.prototype.update = function (dt) {
        if (!this.betEnable || !BbwzDriver_1.default.instance.inGame)
            return;
        this.betDtCount += dt;
        if (this.betDtCount < betInterval)
            return;
        this.betDtCount = 0;
        var map = BbwzBetManager_1.default.getAllPlayerQueue();
        var bChip = false;
        for (var key in map) {
            var playerSeat = Number(key);
            if (playerSeat == BbwzConstDefine_1.BbwzRole.Self) {
                var count = BbwzBetManager_1.default.getSendCount(BbwzBetManager_1.default.getOneRoleBetQueueLength(playerSeat)); // 计算一次飞几个 可能为0不飞
                if (count > 0) {
                    for (var i = 0; i < count; i++) {
                        var data = BbwzBetManager_1.default.shiftOneRoleBetQueue(playerSeat);
                        if (!data)
                            continue;
                        //飞筹码
                        var areaIndex = BbwzConstDefine_1.default.BET_AREA_NAME.indexOf(data.tableType);
                        BbwzDriver_1.default.instance.chipManager.flyChipAnim(playerSeat, areaIndex, data.betNum);
                    }
                    // 播放下注音效
                    Global.Audio.playBundleSound(BbwzConstDefine_1.default.GAME_ID, BbwzConstDefine_1.default.SOUND_BET_BUTTON, true);
                }
            }
            else {
                var count = BbwzBetManager_1.default.getSendCount(BbwzBetManager_1.default.getOneRoleBetQueueLength(playerSeat)); //一次飞几个
                if (count > 0) {
                    bChip = true;
                    for (var i = 0; i < count; i++) {
                        var data = BbwzBetManager_1.default.shiftOneRoleBetQueue(playerSeat);
                        if (!data)
                            continue;
                        //智多星效果
                        if (playerSeat == BbwzConstDefine_1.BbwzRole.Wiser) {
                            this.showWiserStar(true, [data.tableType]);
                        }
                        //飞筹码
                        var areaIndex = BbwzConstDefine_1.default.BET_AREA_NAME.indexOf(data.tableType);
                        BbwzDriver_1.default.instance.chipManager.flyChipAnim(playerSeat, areaIndex, data.betNum);
                    }
                    if (playerSeat == BbwzConstDefine_1.BbwzRole.Online) {
                        //在线玩家下注
                        var olPlayer = this.getOnlinePlayer();
                        olPlayer.playBetAnim(0.5);
                    }
                    else {
                        //头像抖动
                        var player = this.getPlayer(playerSeat);
                        player.playBetAnim(0.1, 1);
                    }
                }
            }
        }
        if (bChip) // 所有其他人下注只播一次音效
            Global.Audio.playBundleSound(BbwzConstDefine_1.default.GAME_ID, BbwzConstDefine_1.default.SOUND_BET, true);
    };
    BbwzGamePanel.prototype.onUserInfoShow = function (seat, headworldPos) {
        if (seat == BbwzConstDefine_1.BbwzRole.Self || seat == BbwzConstDefine_1.BbwzRole.Online)
            return;
        var data = BbwzData_1.default.instance.playerDataArr[seat];
        if (data) {
            this.headTipsManager.showHeadView(true, seat, headworldPos, data);
        }
    };
    /************************* 业务逻辑 *************************/
    // 玩家进场 
    BbwzGamePanel.prototype.onPlayerEnter = function (localSit, data) {
        if (localSit == BbwzConstDefine_1.BbwzRole.Online)
            return;
        this.callPlayer(localSit, "onSit", data);
    };
    // 玩家离场
    BbwzGamePanel.prototype.onPlayerLeave = function (localSit) {
        if (localSit == BbwzConstDefine_1.BbwzRole.Online)
            return;
        this.callPlayer(localSit, "onLeave");
    };
    /**
     * 自己下注
     * @param data 下注返回数据 {point: 637500, bets: [{k: "mix", v: 50000}, ...], my_bets: {mix: 50000}}
     */
    BbwzGamePanel.prototype.onSelfBet = function (data) {
        // 自己下注不推refresh
        var player = this.getPlayer(BbwzConstDefine_1.BbwzRole.Self);
        player.setGoldLbl(data.point);
        //更新显示自己的下注
        this.betAreaRootView.updateSelfBetLabel(BbwzData_1.default.instance.gameTableBetInfo);
        //更新显示总下注
        this.betAreaRootView.updateTotalBetLabel(BbwzData_1.default.instance.gameTableBetInfo);
        //更新显示下注按钮
        this.updateBetSelectButton();
    };
    // 刷新自己金币文本显示
    BbwzGamePanel.prototype.onSelfPointRefresh = function (point) {
        var player = this.getPlayer(BbwzConstDefine_1.BbwzRole.Self);
        player.setGoldLbl(point);
    };
    /**
     * 其他人下注
     * @param bets 下注数据 [{c: 10004, k: "dragon", v: 5000000}, {c: 10000, k: "mix", v: 1000000}]
     */
    BbwzGamePanel.prototype.onPlayerBet = function (bets) {
        var tmp = Global.Toolkit.getOutOrderArray(bets);
        for (var index = 0; index < tmp.length; index++) {
            var betData = tmp[index];
            var chair = betData.c;
            if (!this.getPlayer(chair)) {
                chair = BbwzConstDefine_1.BbwzRole.Online; //没有对应头像的就当成在线玩家
            }
            var betArea = betData.k;
            var allBetNum = betData.v;
            //过滤总筹码为一次次下注筹码
            while (allBetNum > 0) {
                var betIndex = BbwzData_1.default.instance.tryRight(allBetNum);
                var curNum = BbwzData_1.default.instance.chipList[betIndex];
                allBetNum -= curNum;
                BbwzBetManager_1.default.addBetQueue(chair, betArea, curNum);
            }
            // 实时更新其他玩家金币（用于点击玩家头像弹出tips详情）
            var player = BbwzData_1.default.instance.playerDataArr[chair];
            if (player) {
                player.point -= betData.v;
                this.headTipsManager.updatePoint(chair, player.point);
            }
        }
        //更新总下注显示
        this.betAreaRootView.updateTotalBetLabel(BbwzData_1.default.instance.gameTableBetInfo);
    };
    // 更新显示在线玩家数量
    BbwzGamePanel.prototype.updateOnlinePlayer = function (count) {
        // let player = <BbwzOnlinePlayerView>this.getPlayer(BbwzRole.Online);
        // player.setCountLbl(true, count);
    };
    BbwzGamePanel.prototype.dispatchCompareReward = function (isAnim, pokers) {
        this.compareRootView.active = true;
        this.compareRootView.doAllGroupPokerDispatch(isAnim, pokers);
    };
    BbwzGamePanel.prototype.showCompareReward = function (group, pokers, isAnim) {
        this.compareRootView.active = true;
        for (var i = 0; i < group.length; i++) {
            this.compareRootView.doOneGroupPokersFlop(group[i], pokers, isAnim);
        }
    };
    BbwzGamePanel.prototype.dealCompareReward = function (group, isAnim) {
        this.compareRootView.active = true;
        for (var i = 0; i < group.length; i++) {
            this.compareRootView.doOneGroupPokersFirstDeal(group[i], isAnim);
        }
    };
    /**
     * 结算飘分
     * @param data { 0: {win: 9500000, bet_win: {dragon: 20000000}, total_win: 19500000}, 9999: ... }
     */
    BbwzGamePanel.prototype.showPlayerRewardLbl = function (data) {
        for (var key in this.playerMap) {
            var seat = Number(key);
            var obj = data[seat];
            if (seat != BbwzConstDefine_1.BbwzRole.Online && obj) {
                if (obj.bet_win && !Global.Toolkit.isEmptyObject(obj.bet_win)) // debug 没有下注也飘0分 判断是否下注处理
                    this.callPlayer(seat, "setReward", obj.win);
            }
        }
    };
    // 更新底部下注筹码和续压状态
    BbwzGamePanel.prototype.updateBetSelectButton = function () {
        if (BbwzData_1.default.instance.isBetEnable()) {
            var point = BbwzData_1.default.getMyGold();
            var left = BbwzData_1.default.instance.bet_max - BbwzData_1.default.instance.getMyTotalBet();
            var min = BbwzData_1.default.instance.bet_min;
            this.selectChipsView.checkBtnSelectActive(point, left, min);
            this.selectChipsView.enableBetChipBtn();
            this.selectChipsView.updateContinueBtn(BbwzData_1.default.instance.canContinueBet());
        }
        else {
            this.selectChipsView.disableAllBetChipBtn();
            this.selectChipsView.updateContinueBtn(false);
        }
    };
    /**
     * 智多星下注
     * @param isAnim 是否播放飞行动画
     * @param areaNameArr 下注区域数组, 支持多个区域, 一个就传["xxx"]
     */
    BbwzGamePanel.prototype.showWiserStar = function (isAnim, areaNameArr) {
        var _this = this;
        if (areaNameArr === void 0) { areaNameArr = []; }
        areaNameArr.forEach(function (name) {
            _this.betAreaRootView.showStarBetEffect(isAnim, name, _this.getWiserPlayer().getCenterWorldPos());
        });
    };
    /**
     * 清台，进入等待下一局的状态
     */
    BbwzGamePanel.prototype.clearByRound = function () {
        BbwzData_1.default.instance.gameState = BbwzConstDefine_1.BbwzGameState.Wait;
        this.stateView.runState(BbwzData_1.default.instance.gameState, false);
        BbwzDriver_1.default.instance.chipManager.clear();
        BbwzBetManager_1.default.clearBetQueue();
        this.betEnable = false;
        this.callAllPlayers("clearByRound");
        this.viewSet.callAll("clearByRound"); // 调用所有注册子view的clearByGame
    };
    /**
     * 清场 退出当前房间
     */
    BbwzGamePanel.prototype.clearByGame = function () {
        BbwzData_1.default.instance.clearHistory();
        this.callAllPlayers("clearByGame");
        this.viewSet.callAll("clearByGame"); // 调用所有注册子view的clearByRound
    };
    /************************* 通用接口 *************************/
    BbwzGamePanel.prototype.registView = function (key, view) {
        this.viewSet.registView(key, view);
    };
    BbwzGamePanel.prototype.getView = function (key) {
        return this.viewSet.getViewEx(key);
    };
    BbwzGamePanel.prototype.getPlayer = function (chair) {
        var player = this.playerMap[chair];
        if (!player) {
            Logger.error("座位异常, 找不到指定玩家", chair);
            return null;
        }
        return player;
    };
    BbwzGamePanel.prototype.callPlayer = function (chair, func) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var player = this.getPlayer(chair);
        if (player == null) {
            Logger.error("找不到player!!!", chair);
            return;
        }
        if (player[func] && player[func].apply) {
            player[func].apply(player, args);
        }
    };
    BbwzGamePanel.prototype.callAllPlayers = function (func) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var key in this.playerMap) {
            this.callPlayer(Number(key), func, args);
        }
    };
    BbwzGamePanel.prototype.getSelfPlayer = function () {
        return this.getPlayer(BbwzConstDefine_1.BbwzRole.Self);
    };
    BbwzGamePanel.prototype.getOnlinePlayer = function () {
        return this.getPlayer(BbwzConstDefine_1.BbwzRole.Online);
    };
    BbwzGamePanel.prototype.getWiserPlayer = function () {
        return this.getPlayer(BbwzConstDefine_1.BbwzRole.Wiser);
    };
    BbwzGamePanel.prototype.getRicherPlayers = function () {
        var arr = [];
        for (var key in this.playerMap) {
            if (this.playerMap[key] && Number(key) != BbwzConstDefine_1.BbwzRole.Self && Number(key) != BbwzConstDefine_1.BbwzRole.Online && Number(key) != BbwzConstDefine_1.BbwzRole.Wiser)
                arr.push(this.playerMap[key]);
        }
        return arr;
    };
    BbwzGamePanel = __decorate([
        ccclass
    ], BbwzGamePanel);
    return BbwzGamePanel;
}(cc.Component));
exports.default = BbwzGamePanel;

cc._RF.pop();