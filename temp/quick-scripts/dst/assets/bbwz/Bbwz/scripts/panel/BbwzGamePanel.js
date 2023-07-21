
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/panel/BbwzGamePanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xccGFuZWxcXEJid3pHYW1lUGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQXVDO0FBQ3ZDLDZDQUF3QztBQUN4QywyREFBbUY7QUFDbkYseURBQW9EO0FBQ3BELGtFQUE2RDtBQUM3RCwwREFBcUQ7QUFDckQsZ0VBQTJEO0FBQzNELHdEQUFtRDtBQUNuRCwrRUFBMEU7QUFDMUUsMkVBQXNFO0FBQ3RFLDZFQUF3RTtBQUN4RSxzRUFBaUU7QUFDakUsNERBQXVEO0FBQ3ZELHVEQUFrRDtBQUNsRCxzRUFBaUU7QUFDakUsOEVBQXlFO0FBQ3pFLDRFQUF1RTtBQUVqRSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QyxJQUFNLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFDekIsSUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDO0FBRXhCLFlBQVk7QUFFWjtJQUEyQyxpQ0FBWTtJQUF2RDs7UUFBQSxxRUE0ZkM7UUF4ZlUsZUFBUztZQUNaLEdBQUMsMEJBQVEsQ0FBQyxJQUFJLElBQUcsSUFBSTtZQUNyQixHQUFDLDBCQUFRLENBQUMsS0FBSyxJQUFHLElBQUk7WUFDdEIsR0FBQywwQkFBUSxDQUFDLE1BQU0sSUFBRyxJQUFJO1lBQ3ZCLEdBQUMsMEJBQVEsQ0FBQyxPQUFPLElBQUcsSUFBSTtZQUN4QixHQUFDLDBCQUFRLENBQUMsT0FBTyxJQUFHLElBQUk7WUFDeEIsR0FBQywwQkFBUSxDQUFDLE9BQU8sSUFBRyxJQUFJO1lBQ3hCLEdBQUMsMEJBQVEsQ0FBQyxPQUFPLElBQUcsSUFBSTtZQUN4QixHQUFDLDBCQUFRLENBQUMsT0FBTyxJQUFHLElBQUk7Z0JBQzNCO1FBRUQsVUFBVTtRQUNILGVBQVMsR0FBWSxLQUFLLENBQUM7O0lBNGV0QyxDQUFDO0lB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QyxDQUFDO1NBQ3JDO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBM2ZnQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBNGZqQztJQUFELG9CQUFDO0NBNWZELEFBNGZDLENBNWYwQyxFQUFFLENBQUMsU0FBUyxHQTRmdEQ7a0JBNWZvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJid3pEcml2ZXIgZnJvbSBcIi4uL0Jid3pEcml2ZXJcIjtcclxuaW1wb3J0IEJid3pEYXRhIGZyb20gXCIuLi9kYXRhL0Jid3pEYXRhXCI7XHJcbmltcG9ydCBCYnd6Q29uc3REZWZpbmUsIHsgQmJ3elJvbGUsIEJid3pHYW1lU3RhdGUgfSBmcm9tIFwiLi4vZGF0YS9CYnd6Q29uc3REZWZpbmVcIjtcclxuaW1wb3J0IEJid3pQYXRoSGVscGVyIGZyb20gXCIuLi90b29sL0Jid3pQYXRoSGVscGVyXCI7XHJcbmltcG9ydCBCYnd6QmlnV2lubmVyVmlldyBmcm9tIFwiLi4vc3Vidmlldy9CYnd6QmlnV2lubmVyVmlld1wiO1xyXG5pbXBvcnQgQmJ3elN0YXRlVmlldyBmcm9tIFwiLi4vc3Vidmlldy9CYnd6U3RhdGVWaWV3XCI7XHJcbmltcG9ydCBCYnd6Q2hpcHNNYW5hZ2VyIGZyb20gXCIuLi9tYW5hZ2VyL0Jid3pDaGlwc01hbmFnZXJcIjtcclxuaW1wb3J0IEJid3pNZW51VmlldyBmcm9tIFwiLi4vc3Vidmlldy9CYnd6TWVudVZpZXdcIjtcclxuaW1wb3J0IEJid3pPbmxpbmVQbGF5ZXJWaWV3IGZyb20gXCIuLi9zdWJ2aWV3L3BsYXllci9CYnd6T25saW5lUGxheWVyVmlld1wiO1xyXG5pbXBvcnQgQmJ3elNlbGZQbGF5ZXJWaWV3IGZyb20gXCIuLi9zdWJ2aWV3L3BsYXllci9CYnd6U2VsZlBsYXllclZpZXdcIjtcclxuaW1wb3J0IEJid3pPdGhlclBsYXllclZpZXcgZnJvbSBcIi4uL3N1YnZpZXcvcGxheWVyL0Jid3pPdGhlclBsYXllclZpZXdcIjtcclxuaW1wb3J0IEJid3pTZWxlY3RDaGlwc1ZpZXcgZnJvbSBcIi4uL3N1YnZpZXcvQmJ3elNlbGVjdENoaXBzVmlld1wiO1xyXG5pbXBvcnQgQmJ3ekJldE1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvQmJ3ekJldE1hbmFnZXJcIjtcclxuaW1wb3J0IEJid3pHYW1lRXZlbnQgZnJvbSBcIi4uL2RhdGEvQmJ3ekdhbWVFdmVudFwiO1xyXG5pbXBvcnQgQmJ3ekJldEFyZWFSb290VmlldyBmcm9tIFwiLi4vc3Vidmlldy9CYnd6QmV0QXJlYVJvb3RWaWV3XCI7XHJcbmltcG9ydCBCYnd6Q29tcGFyZVBva2VyVmlldyBmcm9tIFwiLi4vc3Vidmlldy9wb2tlci9CYnd6Q29tcGFyZVBva2VyVmlld1wiO1xyXG5pbXBvcnQgQmJ3elJld2FyZEFyZWFSb290VmlldyBmcm9tIFwiLi4vc3Vidmlldy9CYnd6UmV3YXJkQXJlYVJvb3RWaWV3XCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuY29uc3QgdGFza0VuYWJsZSA9IGZhbHNlO1xyXG5jb25zdCBiZXRJbnRlcnZhbCA9IDAuMTtcclxuXHJcbi8vIOa4uOaIj+WxgiDmoLnoioLngrnnu4Tku7ZcclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmJ3ekdhbWVQYW5lbCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICAvLyDmt7vliqDlrZBWaWV35rOo5YaM566h55CG5a6e5L6LIOaPkOS+m+e7n+S4gOeahOiwg+W6pumSqeWtkFxyXG4gICAgcHVibGljIHZpZXdTZXQ6IFZpZXdTZXQ7XHJcblxyXG4gICAgcHVibGljIHBsYXllck1hcCA9IHtcclxuICAgICAgICBbQmJ3elJvbGUuU2VsZl06IG51bGwsXHJcbiAgICAgICAgW0Jid3pSb2xlLldpc2VyXTogbnVsbCxcclxuICAgICAgICBbQmJ3elJvbGUuT25saW5lXTogbnVsbCxcclxuICAgICAgICBbQmJ3elJvbGUuUmljaGVyMV06IG51bGwsXHJcbiAgICAgICAgW0Jid3pSb2xlLlJpY2hlcjJdOiBudWxsLFxyXG4gICAgICAgIFtCYnd6Um9sZS5SaWNoZXIzXTogbnVsbCxcclxuICAgICAgICBbQmJ3elJvbGUuUmljaGVyNF06IG51bGwsXHJcbiAgICAgICAgW0Jid3pSb2xlLlJpY2hlcjVdOiBudWxsXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5LiL5rOo5bin5b6q546v55u45YWzXHJcbiAgICBwdWJsaWMgYmV0RW5hYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGJldER0Q291bnQ6IG51bWJlcjtcclxuXHJcbiAgICAvLyDlrZB2aWV3XHJcbiAgICBwdWJsaWMgYmlnV2lubmVyVmlldzogQmJ3ekJpZ1dpbm5lclZpZXc7XHJcbiAgICBwdWJsaWMgc2VsZWN0Q2hpcHNWaWV3OiBCYnd6U2VsZWN0Q2hpcHNWaWV3O1xyXG4gICAgcHVibGljIHN0YXRlVmlldzogQmJ3elN0YXRlVmlldztcclxuICAgIHB1YmxpYyBiZXRBcmVhUm9vdFZpZXc6IEJid3pCZXRBcmVhUm9vdFZpZXc7XHJcbiAgICBwdWJsaWMgY29tcGFyZVJvb3RWaWV3OiBCYnd6Q29tcGFyZVBva2VyVmlldztcclxuICAgIHB1YmxpYyByZXdhcmRBcmVhVmlldzogQmJ3elJld2FyZEFyZWFSb290VmlldztcclxuXHJcbiAgICBwdWJsaWMgaGVhZFRpcHNNYW5hZ2VyOiBIZWFkVGlwc01hbmFnZXI7XHJcbiAgICBwdWJsaWMgdGFza01hbmFnZXI6IFRhc2tNYW5hZ2VyO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnZpZXdTZXQgPSBuZXcgVmlld1NldCgpO1xyXG4gICAgICAgIHRoaXMubm9kZS5zZXRDb250ZW50U2l6ZShjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS5nZXRDb250ZW50U2l6ZSgpKTtcclxuICAgICAgICB0aGlzLmluaXRWaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIEdhbWUuRXZlbnQub24oQmJ3ekdhbWVFdmVudC5vblVzZXJJbmZvVG91Y2gsIHRoaXMsIHRoaXMub25Vc2VySW5mb1Nob3cpO1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vbihHbG9iYWxFdmVudC5UWVBFX1ZJUF9FTlRFUl9HQU1FLCB0aGlzLCB0aGlzLnZpcEVudGVyR2FtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpIHtcclxuICAgICAgICBHYW1lLkV2ZW50Lm9mZihCYnd6R2FtZUV2ZW50Lm9uVXNlckluZm9Ub3VjaCwgdGhpcywgdGhpcy5vblVzZXJJbmZvU2hvdyk7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihHbG9iYWxFdmVudC5UWVBFX1ZJUF9FTlRFUl9HQU1FLCB0aGlzLCB0aGlzLnZpcEVudGVyR2FtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2aXBFbnRlckdhbWUobXNnKSB7XHJcbiAgICAgICAgaWYgKG1zZy5kYXRhLl9naWQgPT0gQmJ3ekNvbnN0RGVmaW5lLkdBTUVfSUQgJiYgbXNnLmRhdGEuX2dsdiA9PT0gR2FtZS5Db250cm9sLmN1ckx2KXtcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlZJUEFETUlTU0lPTiwgbXNnLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuaW5pdEZsb2F0VmlldygpO1xyXG4gICAgICAgIHRoaXMuaW5pdFRvcFZpZXcoKTtcclxuICAgICAgICB0aGlzLmluaXRCb3R0b21WaWV3KCk7XHJcbiAgICAgICAgdGhpcy5pbml0Q2VudGVyVmlldygpO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdE1lbnVWaWV3KCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdEhlYWRUaXBzTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMuaW5pdFRhc2tNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgIEJid3pDb25zdERlZmluZS5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwidG9wTm9kZS9idXR0b25faGlzdG9yeVwiLCB0aGlzLmhpc3RvcnlCdG5GdW5jLCB0aGlzKTtcclxuXHJcbiAgICAgICAgbGV0IHBhb21hZGVuZ05vZGU6IGNjLk5vZGUgPSBjYy5maW5kKFwidG9wTm9kZS9wYW9tYWRlbmdcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICBsZXQgcGFvbWFkZW5nTWFzazogY2MuTm9kZSA9IGNjLmZpbmQoXCJNc2dCb3hcIiwgcGFvbWFkZW5nTm9kZSk7XHJcbiAgICAgICAgR2xvYmFsLlVJSGVscGVyLmFkZFBhb01hRGVuZ0NvbXAocGFvbWFkZW5nTWFzaywgZmFsc2UsIHBhb21hZGVuZ05vZGUpO1xyXG4gICAgICAgIEdsb2JhbC5VSUhlbHBlci5hZGRXaWZpQ29tcChjYy5maW5kKFwid2lmaVwiLCB0aGlzLm5vZGUpLCAyKTtcclxuXHJcbiAgICAgICAgR2xvYmFsLlVJSGVscGVyLmFkZEFkbWlzc2lvbkNvbXAoY2MuZmluZChcInRvcE5vZGUvYWRtaXNzaW9uQm94XCIsIHRoaXMubm9kZSkpO1xyXG5cclxuICAgICAgICBCYnd6Q29uc3REZWZpbmUuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcImJ1dHRvbl90ZXN0XCIsICgpID0+IHtcclxuICAgICAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX0NBTExfUkVDT05ORUNUKTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKuWktOWDj+mZhOWKoOiEmuacrFxyXG4gICAgICovXHJcblxyXG4gICAgcHJpdmF0ZSBpbml0UGxheWVycygpIHtcclxuICAgICAgICBsZXQgY2VudGVyTm9kZSA9IGNjLmZpbmQoXCJjZW50ZXJOb2RlXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgbGV0IG9ubGluZVBsYXllciA9IG5ldyBCYnd6T25saW5lUGxheWVyVmlldyhjYy5maW5kKFwib25saW5lUGxheWVyXCIsIGNlbnRlck5vZGUpLCBCYnd6Um9sZS5PbmxpbmUpO1xyXG4gICAgICAgIG9ubGluZVBsYXllci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucGxheWVyTWFwW0Jid3pSb2xlLk9ubGluZV0gPSBvbmxpbmVQbGF5ZXI7XHJcblxyXG4gICAgICAgIGxldCBzZWxmUGxheWVyID0gbmV3IEJid3pTZWxmUGxheWVyVmlldyhjYy5maW5kKFwiaGVhZC9zZWxmSGVhZFwiLCBjZW50ZXJOb2RlKSwgQmJ3elJvbGUuU2VsZik7XHJcbiAgICAgICAgc2VsZlBsYXllci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucGxheWVyTWFwW0Jid3pSb2xlLlNlbGZdID0gc2VsZlBsYXllcjtcclxuXHJcbiAgICAgICAgbGV0IHdpc2VQbGF5ZXIgPSBuZXcgQmJ3ek90aGVyUGxheWVyVmlldyhjYy5maW5kKFwiaGVhZC9oZWFkTm9kZV8wXCIsIGNlbnRlck5vZGUpLCBCYnd6Um9sZS5XaXNlcik7XHJcbiAgICAgICAgd2lzZVBsYXllci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBsYXllck1hcFtCYnd6Um9sZS5XaXNlcl0gPSB3aXNlUGxheWVyO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA1OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5maW5kKFwiaGVhZC9oZWFkTm9kZV9cIiArIGksIGNlbnRlck5vZGUpO1xyXG4gICAgICAgICAgICBsZXQgY2hhaXIgPSBCYnd6Um9sZS5SaWNoZXIxICsgaSAtIDE7XHJcbiAgICAgICAgICAgIGxldCBwbGF5ZXIgPSBuZXcgQmJ3ek90aGVyUGxheWVyVmlldyhub2RlLCBjaGFpcik7XHJcbiAgICAgICAgICAgIHBsYXllci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJNYXBbY2hhaXJdID0gcGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRGbG9hdFZpZXcoKSB7XHJcbiAgICAgICAgbGV0IGZsb2F0Tm9kZSA9IGNjLmZpbmQoJ2Zsb2F0Tm9kZScsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgLy8g54mM5bGA54q25oCBXHJcbiAgICAgICAgbGV0IHN0YXRlUHJlZmFiID0gR2xvYmFsLlJlc291cmNlTWFuYWdlci5nZXRCdW5kbGVSZXMoQmJ3ekNvbnN0RGVmaW5lLkdBTUVfSUQsIEJid3pQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicGFuZWwvc3ViVmlldy9zdGF0ZVZpZXdcIiwgY2MuUHJlZmFiKTtcclxuICAgICAgICBsZXQgc3RhdGVOb2RlID0gPGNjLk5vZGU+Y2MuaW5zdGFudGlhdGUoc3RhdGVQcmVmYWIpO1xyXG4gICAgICAgIHN0YXRlTm9kZS5zZXRQYXJlbnQoZmxvYXROb2RlKTtcclxuICAgICAgICBzdGF0ZU5vZGUuc2V0UG9zaXRpb24oY2MuVmVjMi5aRVJPKTtcclxuICAgICAgICB0aGlzLnN0YXRlVmlldyA9IG5ldyBCYnd6U3RhdGVWaWV3KHN0YXRlTm9kZSk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZVZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RWaWV3KEJid3pDb25zdERlZmluZS5WaWV3U3RhdGUsIHRoaXMuc3RhdGVWaWV3KTtcclxuXHJcbiAgICAgICAgLy8g5aSn6LWi5a62XHJcbiAgICAgICAgbGV0IGJpZ1dpbm5lclByZWZhYiA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2V0QnVuZGxlUmVzKEJid3pDb25zdERlZmluZS5HQU1FX0lELCBCYnd6UGF0aEhlbHBlci5nYW1lUHJlZmFic1BhdGggKyBcInBhbmVsL3N1YlZpZXcvYmlnV2lubmVyXCIsIGNjLlByZWZhYik7XHJcbiAgICAgICAgbGV0IGJpZ1dpbm5lck5vZGUgPSA8Y2MuTm9kZT5jYy5pbnN0YW50aWF0ZShiaWdXaW5uZXJQcmVmYWIpO1xyXG4gICAgICAgIGJpZ1dpbm5lck5vZGUuc2V0UGFyZW50KGZsb2F0Tm9kZSk7XHJcbiAgICAgICAgYmlnV2lubmVyTm9kZS5zZXRQb3NpdGlvbihjYy5WZWMyLlpFUk8pO1xyXG4gICAgICAgIHRoaXMuYmlnV2lubmVyVmlldyA9IG5ldyBCYnd6QmlnV2lubmVyVmlldyhiaWdXaW5uZXJOb2RlKTtcclxuICAgICAgICB0aGlzLmJpZ1dpbm5lclZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RWaWV3KEJid3pDb25zdERlZmluZS5WaWV3QmlnV2lubmVyLCB0aGlzLmJpZ1dpbm5lclZpZXcpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRUb3BWaWV3KCkge1xyXG4gICAgICAgIGxldCB0b3BOb2RlID0gY2MuZmluZChcInRvcE5vZGVcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICAvLyDojbflrpjkvY3nva5cclxuICAgICAgICBsZXQgZGVhbGVyTm9kZSA9IGNjLmZpbmQoXCJkZWFsZXJOb2RlXCIsIHRvcE5vZGUpO1xyXG4gICAgICAgIEJid3pEYXRhLmluc3RhbmNlLnBsYXllckNoaXBzRmx5UG9zW0Jid3pSb2xlLkRlYWxlcl0gPSB0b3BOb2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihkZWFsZXJOb2RlLnBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgLy8g5q+U54mM6Z2i5p2/XHJcbiAgICAgICAgbGV0IGNvbXBhcmVSb290UHJlZmFiID0gR2xvYmFsLlJlc291cmNlTWFuYWdlci5nZXRCdW5kbGVSZXMoQmJ3ekNvbnN0RGVmaW5lLkdBTUVfSUQsIEJid3pQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicGFuZWwvc3ViVmlldy9jb21wYXJlUG9rZXJcIiwgY2MuUHJlZmFiKTtcclxuICAgICAgICBsZXQgY29tcGFyZVJvb3ROb2RlID0gPGNjLk5vZGU+Y2MuaW5zdGFudGlhdGUoY29tcGFyZVJvb3RQcmVmYWIpO1xyXG4gICAgICAgIGNvbXBhcmVSb290Tm9kZS5zZXRQYXJlbnQodG9wTm9kZSk7XHJcbiAgICAgICAgY29tcGFyZVJvb3ROb2RlLnNldFBvc2l0aW9uKGNjLlZlYzIuWkVSTyk7XHJcbiAgICAgICAgdGhpcy5jb21wYXJlUm9vdFZpZXcgPSBuZXcgQmJ3ekNvbXBhcmVQb2tlclZpZXcoY29tcGFyZVJvb3ROb2RlKTtcclxuICAgICAgICB0aGlzLmNvbXBhcmVSb290Vmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlZ2lzdFZpZXcoQmJ3ekNvbnN0RGVmaW5lLlZpZXdDb21wYXJlUG9rZXIsIHRoaXMuY29tcGFyZVJvb3RWaWV3KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRCb3R0b21WaWV3KCkge1xyXG4gICAgICAgIGxldCBib3R0b21Ob2RlID0gY2MuZmluZChcImJvdHRvbU5vZGVcIiwgdGhpcy5ub2RlKTtcclxuXHJcbiAgICAgICAgLy8g5LiL5rOo5Yy65Z+fXHJcbiAgICAgICAgbGV0IGJldEFyZWFQcmVmYWIgPSBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmdldEJ1bmRsZVJlcyhCYnd6Q29uc3REZWZpbmUuR0FNRV9JRCwgQmJ3elBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwYW5lbC9zdWJWaWV3L2JldEFyZWFcIiwgY2MuUHJlZmFiKTtcclxuICAgICAgICBsZXQgYmV0QXJlYVJvb3QgPSA8Y2MuTm9kZT5jYy5pbnN0YW50aWF0ZShiZXRBcmVhUHJlZmFiKTtcclxuICAgICAgICBiZXRBcmVhUm9vdC5zZXRQYXJlbnQoYm90dG9tTm9kZSk7XHJcbiAgICAgICAgYmV0QXJlYVJvb3Quc2V0UG9zaXRpb24oY2MuVmVjMi5aRVJPKTtcclxuICAgICAgICB0aGlzLmJldEFyZWFSb290VmlldyA9IG5ldyBCYnd6QmV0QXJlYVJvb3RWaWV3KGJldEFyZWFSb290KTtcclxuICAgICAgICB0aGlzLmJldEFyZWFSb290Vmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVnaXN0VmlldyhCYnd6Q29uc3REZWZpbmUuVmlld0JldEFyZWFSb290LCB0aGlzLmJldEFyZWFSb290Vmlldyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0Q2VudGVyVmlldygpIHtcclxuICAgICAgICBsZXQgY2VudGVyTm9kZSA9IGNjLmZpbmQoXCJjZW50ZXJOb2RlXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5pbml0UGxheWVycygpO1xyXG5cclxuXHJcbiAgICAgICAgLy8g57uT566X5Yy65Z+fXHJcbiAgICAgICAgbGV0IHJld2FyZEFyZWFQcmVmYWIgPSBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmdldEJ1bmRsZVJlcyhCYnd6Q29uc3REZWZpbmUuR0FNRV9JRCwgQmJ3elBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwYW5lbC9zdWJWaWV3L3Jld2FyZEFyZWFcIiwgY2MuUHJlZmFiKTtcclxuICAgICAgICBsZXQgcmV3YXJkQXJlYVJvb3QgPSA8Y2MuTm9kZT5jYy5pbnN0YW50aWF0ZShyZXdhcmRBcmVhUHJlZmFiKTtcclxuICAgICAgICByZXdhcmRBcmVhUm9vdC5zZXRQYXJlbnQoY2VudGVyTm9kZSk7XHJcbiAgICAgICAgcmV3YXJkQXJlYVJvb3Quc2V0UG9zaXRpb24oY2MuVmVjMi5aRVJPKTtcclxuICAgICAgICB0aGlzLnJld2FyZEFyZWFWaWV3ID0gbmV3IEJid3pSZXdhcmRBcmVhUm9vdFZpZXcocmV3YXJkQXJlYVJvb3QpO1xyXG4gICAgICAgIHRoaXMucmV3YXJkQXJlYVZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlZ2lzdFZpZXcoQmJ3ekNvbnN0RGVmaW5lLlZpZXdSZXdhcmRBcmVhUm9vdCwgdGhpcy5yZXdhcmRBcmVhVmlldyk7XHJcblxyXG4gICAgICAgIC8vIOW6lemDqOetueeggeagj1xyXG4gICAgICAgIGxldCBjaGlwc1ByZWZhYiA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2V0QnVuZGxlUmVzKEJid3pDb25zdERlZmluZS5HQU1FX0lELCBCYnd6UGF0aEhlbHBlci5nYW1lUHJlZmFic1BhdGggKyBcInBhbmVsL3N1YlZpZXcvc2VsZWN0Q2hpcHNOb2RlXCIsIGNjLlByZWZhYik7XHJcbiAgICAgICAgbGV0IGNoaXBzTm9kZSA9IDxjYy5Ob2RlPmNjLmluc3RhbnRpYXRlKGNoaXBzUHJlZmFiKTtcclxuICAgICAgICBjaGlwc05vZGUuc2V0UGFyZW50KGNlbnRlck5vZGUpO1xyXG4gICAgICAgIGNoaXBzTm9kZS5zZXRQb3NpdGlvbihjYy5WZWMyLlpFUk8pO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0Q2hpcHNWaWV3ID0gbmV3IEJid3pTZWxlY3RDaGlwc1ZpZXcoY2hpcHNOb2RlKTtcclxuICAgICAgICB0aGlzLnNlbGVjdENoaXBzVmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVnaXN0VmlldyhCYnd6Q29uc3REZWZpbmUuVmlld1NlbGVjdENoaXAsIHRoaXMuc2VsZWN0Q2hpcHNWaWV3KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRIZWFkVGlwc01hbmFnZXIoKXtcclxuICAgICAgICB0aGlzLmhlYWRUaXBzTWFuYWdlciA9IG5ldyBIZWFkVGlwc01hbmFnZXIoKTtcclxuICAgICAgICB0aGlzLmhlYWRUaXBzTWFuYWdlci5pbml0KGNjLmZpbmQoJ2Zsb2F0Tm9kZScsIHRoaXMubm9kZSksIGNjLmZpbmQoJ2Zsb2F0Tm9kZScsIHRoaXMubm9kZSksIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFRhc2tNYW5hZ2VyKCl7XHJcbiAgICAgICAgdGhpcy50YXNrTWFuYWdlciA9IG5ldyBUYXNrTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMudGFza01hbmFnZXIuaW5pdChjYy5maW5kKCd0YXNrUm9vdCcsIHRoaXMubm9kZSksIEJid3pDb25zdERlZmluZS5HQU1FX0lELCAtMSk7XHJcbiAgICAgICAgdGhpcy50YXNrTWFuYWdlci5yZXFHZXRHYW1lVGFza0xpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOahjOmdouS4iueahOWwj+etueeggVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRNYW5hZ2VyKCkge1xyXG4gICAgICAgIGxldCByb290Tm9kZSA9IGNjLmZpbmQoXCJjZW50ZXJOb2RlL2NoaXBzXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgQmJ3ekRyaXZlci5pbnN0YW5jZS5jaGlwTWFuYWdlciA9IG5ldyBCYnd6Q2hpcHNNYW5hZ2VyKHJvb3ROb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRNZW51VmlldygpIHtcclxuICAgICAgICBsZXQgbm9kZSA9IGNjLmZpbmQoXCJtZW51Tm9kZVwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIEdsb2JhbC5Ub29sa2l0LmFkanVzdElwaG9uZVgoW25vZGVdKTtcclxuICAgICAgICBsZXQgbWVudVZpZXcgPSBuZXcgQmJ3ek1lbnVWaWV3KG5vZGUpO1xyXG4gICAgICAgIG1lbnVWaWV3LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RWaWV3KEJid3pDb25zdERlZmluZS5WaWV3TWVudSwgbWVudVZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKXtcclxuICAgICAgICB0aGlzLnRhc2tNYW5hZ2VyLm9uRGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y6G5Y+y6K6w5b2VIOaMiemSrlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGhpc3RvcnlCdG5GdW5jKCkge1xyXG4gICAgICAgIEJid3pDb25zdERlZmluZS5wbGF5QnRuU291bmQoKTtcclxuICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLmhpc3RvcnlQb3Aubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCB1cGRhdGUoZHQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghdGhpcy5iZXRFbmFibGUgfHwgIUJid3pEcml2ZXIuaW5zdGFuY2UuaW5HYW1lKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuYmV0RHRDb3VudCArPSBkdDtcclxuICAgICAgICBpZiAodGhpcy5iZXREdENvdW50IDwgYmV0SW50ZXJ2YWwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5iZXREdENvdW50ID0gMDtcclxuICAgICAgICBsZXQgbWFwID0gQmJ3ekJldE1hbmFnZXIuZ2V0QWxsUGxheWVyUXVldWUoKTtcclxuICAgICAgICBsZXQgYkNoaXAgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gbWFwKSB7XHJcbiAgICAgICAgICAgIGxldCBwbGF5ZXJTZWF0ID0gTnVtYmVyKGtleSk7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXJTZWF0ID09IEJid3pSb2xlLlNlbGYpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gQmJ3ekJldE1hbmFnZXIuZ2V0U2VuZENvdW50KEJid3pCZXRNYW5hZ2VyLmdldE9uZVJvbGVCZXRRdWV1ZUxlbmd0aChwbGF5ZXJTZWF0KSk7ICAgICAgIC8vIOiuoeeul+S4gOasoemjnuWHoOS4qiDlj6/og73kuLow5LiN6aOeXHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gQmJ3ekJldE1hbmFnZXIuc2hpZnRPbmVSb2xlQmV0UXVldWUocGxheWVyU2VhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+mjnuetueeggVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJlYUluZGV4OiBudW1iZXIgPSBCYnd6Q29uc3REZWZpbmUuQkVUX0FSRUFfTkFNRS5pbmRleE9mKGRhdGEudGFibGVUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQmJ3ekRyaXZlci5pbnN0YW5jZS5jaGlwTWFuYWdlci5mbHlDaGlwQW5pbShwbGF5ZXJTZWF0LCBhcmVhSW5kZXgsIGRhdGEuYmV0TnVtKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5pKt5pS+5LiL5rOo6Z+z5pWIXHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlCdW5kbGVTb3VuZChCYnd6Q29uc3REZWZpbmUuR0FNRV9JRCwgQmJ3ekNvbnN0RGVmaW5lLlNPVU5EX0JFVF9CVVRUT04sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY291bnQgPSBCYnd6QmV0TWFuYWdlci5nZXRTZW5kQ291bnQoQmJ3ekJldE1hbmFnZXIuZ2V0T25lUm9sZUJldFF1ZXVlTGVuZ3RoKHBsYXllclNlYXQpKTsgICAgICAgLy/kuIDmrKHpo57lh6DkuKpcclxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBiQ2hpcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gQmJ3ekJldE1hbmFnZXIuc2hpZnRPbmVSb2xlQmV0UXVldWUocGxheWVyU2VhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+aZuuWkmuaYn+aViOaenFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyU2VhdCA9PSBCYnd6Um9sZS5XaXNlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93V2lzZXJTdGFyKHRydWUsIFtkYXRhLnRhYmxlVHlwZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6aOe562556CBXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhcmVhSW5kZXg6IG51bWJlciA9IEJid3pDb25zdERlZmluZS5CRVRfQVJFQV9OQU1FLmluZGV4T2YoZGF0YS50YWJsZVR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLmNoaXBNYW5hZ2VyLmZseUNoaXBBbmltKHBsYXllclNlYXQsIGFyZWFJbmRleCwgZGF0YS5iZXROdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyU2VhdCA9PSBCYnd6Um9sZS5PbmxpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lnKjnur/njqnlrrbkuIvms6hcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9sUGxheWVyID0gdGhpcy5nZXRPbmxpbmVQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2xQbGF5ZXIucGxheUJldEFuaW0oMC41KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5aS05YOP5oqW5YqoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwbGF5ZXIgPSA8QmJ3ek90aGVyUGxheWVyVmlldz50aGlzLmdldFBsYXllcihwbGF5ZXJTZWF0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLnBsYXlCZXRBbmltKDAuMSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChiQ2hpcCkgICAgICAgICAgLy8g5omA5pyJ5YW25LuW5Lq65LiL5rOo5Y+q5pKt5LiA5qyh6Z+z5pWIXHJcbiAgICAgICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QnVuZGxlU291bmQoQmJ3ekNvbnN0RGVmaW5lLkdBTUVfSUQsIEJid3pDb25zdERlZmluZS5TT1VORF9CRVQsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Vc2VySW5mb1Nob3coc2VhdDogbnVtYmVyLCBoZWFkd29ybGRQb3M6IGNjLlZlYzMpIHtcclxuICAgICAgICBpZiAoc2VhdCA9PSBCYnd6Um9sZS5TZWxmIHx8IHNlYXQgPT0gQmJ3elJvbGUuT25saW5lKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IGRhdGEgPSBCYnd6RGF0YS5pbnN0YW5jZS5wbGF5ZXJEYXRhQXJyW3NlYXRdO1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZFRpcHNNYW5hZ2VyLnNob3dIZWFkVmlldyh0cnVlLCBzZWF0LCBoZWFkd29ybGRQb3MsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKiDkuJrliqHpgLvovpEgKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8vIOeOqeWutui/m+WcuiBcclxuICAgIHB1YmxpYyBvblBsYXllckVudGVyKGxvY2FsU2l0OiBudW1iZXIsIGRhdGE6IGFueSkge1xyXG4gICAgICAgIGlmIChsb2NhbFNpdCA9PSBCYnd6Um9sZS5PbmxpbmUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmNhbGxQbGF5ZXIobG9jYWxTaXQsIFwib25TaXRcIiwgZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g546p5a6256a75Zy6XHJcbiAgICBwdWJsaWMgb25QbGF5ZXJMZWF2ZShsb2NhbFNpdDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGxvY2FsU2l0ID09IEJid3pSb2xlLk9ubGluZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY2FsbFBsYXllcihsb2NhbFNpdCwgXCJvbkxlYXZlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Ieq5bex5LiL5rOoXHJcbiAgICAgKiBAcGFyYW0gZGF0YSDkuIvms6jov5Tlm57mlbDmja4ge3BvaW50OiA2Mzc1MDAsIGJldHM6IFt7azogXCJtaXhcIiwgdjogNTAwMDB9LCAuLi5dLCBteV9iZXRzOiB7bWl4OiA1MDAwMH19XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvblNlbGZCZXQoZGF0YTogYW55KSB7XHJcbiAgICAgICAgLy8g6Ieq5bex5LiL5rOo5LiN5o6ocmVmcmVzaFxyXG4gICAgICAgIGxldCBwbGF5ZXIgPSA8QmJ3elNlbGZQbGF5ZXJWaWV3PnRoaXMuZ2V0UGxheWVyKEJid3pSb2xlLlNlbGYpO1xyXG4gICAgICAgIHBsYXllci5zZXRHb2xkTGJsKGRhdGEucG9pbnQpO1xyXG4gICAgICAgIC8v5pu05paw5pi+56S66Ieq5bex55qE5LiL5rOoXHJcbiAgICAgICAgdGhpcy5iZXRBcmVhUm9vdFZpZXcudXBkYXRlU2VsZkJldExhYmVsKEJid3pEYXRhLmluc3RhbmNlLmdhbWVUYWJsZUJldEluZm8pO1xyXG4gICAgICAgIC8v5pu05paw5pi+56S65oC75LiL5rOoXHJcbiAgICAgICAgdGhpcy5iZXRBcmVhUm9vdFZpZXcudXBkYXRlVG90YWxCZXRMYWJlbChCYnd6RGF0YS5pbnN0YW5jZS5nYW1lVGFibGVCZXRJbmZvKTtcclxuICAgICAgICAvL+abtOaWsOaYvuekuuS4i+azqOaMiemSrlxyXG4gICAgICAgIHRoaXMudXBkYXRlQmV0U2VsZWN0QnV0dG9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yi35paw6Ieq5bex6YeR5biB5paH5pys5pi+56S6XHJcbiAgICBwdWJsaWMgb25TZWxmUG9pbnRSZWZyZXNoKHBvaW50OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcGxheWVyID0gPEJid3pTZWxmUGxheWVyVmlldz50aGlzLmdldFBsYXllcihCYnd6Um9sZS5TZWxmKTtcclxuICAgICAgICBwbGF5ZXIuc2V0R29sZExibChwb2ludCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbbku5bkurrkuIvms6hcclxuICAgICAqIEBwYXJhbSBiZXRzIOS4i+azqOaVsOaNriBbe2M6IDEwMDA0LCBrOiBcImRyYWdvblwiLCB2OiA1MDAwMDAwfSwge2M6IDEwMDAwLCBrOiBcIm1peFwiLCB2OiAxMDAwMDAwfV1cclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uUGxheWVyQmV0KGJldHM6IGFueVtdKSB7XHJcbiAgICAgICAgbGV0IHRtcCA9IEdsb2JhbC5Ub29sa2l0LmdldE91dE9yZGVyQXJyYXkoYmV0cyk7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRtcC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3QgYmV0RGF0YSA9IHRtcFtpbmRleF07XHJcbiAgICAgICAgICAgIGxldCBjaGFpciA9IGJldERhdGEuYztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmdldFBsYXllcihjaGFpcikpIHtcclxuICAgICAgICAgICAgICAgIGNoYWlyID0gQmJ3elJvbGUuT25saW5lOyAgICAgIC8v5rKh5pyJ5a+55bqU5aS05YOP55qE5bCx5b2T5oiQ5Zyo57q/546p5a62XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGJldEFyZWEgPSBiZXREYXRhLms7XHJcbiAgICAgICAgICAgIGxldCBhbGxCZXROdW0gPSBiZXREYXRhLnY7XHJcbiAgICAgICAgICAgIC8v6L+H5ruk5oC7562556CB5Li65LiA5qyh5qyh5LiL5rOo562556CBXHJcbiAgICAgICAgICAgIHdoaWxlIChhbGxCZXROdW0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmV0SW5kZXggPSBCYnd6RGF0YS5pbnN0YW5jZS50cnlSaWdodChhbGxCZXROdW0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1ck51bSA9IEJid3pEYXRhLmluc3RhbmNlLmNoaXBMaXN0W2JldEluZGV4XTtcclxuICAgICAgICAgICAgICAgIGFsbEJldE51bSAtPSBjdXJOdW07XHJcbiAgICAgICAgICAgICAgICBCYnd6QmV0TWFuYWdlci5hZGRCZXRRdWV1ZShjaGFpciwgYmV0QXJlYSwgY3VyTnVtKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g5a6e5pe25pu05paw5YW25LuW546p5a626YeR5biB77yI55So5LqO54K55Ye7546p5a625aS05YOP5by55Ye6dGlwc+ivpuaDhe+8iVxyXG4gICAgICAgICAgICBsZXQgcGxheWVyID0gQmJ3ekRhdGEuaW5zdGFuY2UucGxheWVyRGF0YUFycltjaGFpcl07XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5wb2ludCAtPSBiZXREYXRhLnY7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWRUaXBzTWFuYWdlci51cGRhdGVQb2ludChjaGFpciwgcGxheWVyLnBvaW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+abtOaWsOaAu+S4i+azqOaYvuekulxyXG4gICAgICAgIHRoaXMuYmV0QXJlYVJvb3RWaWV3LnVwZGF0ZVRvdGFsQmV0TGFiZWwoQmJ3ekRhdGEuaW5zdGFuY2UuZ2FtZVRhYmxlQmV0SW5mbyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5pu05paw5pi+56S65Zyo57q/546p5a625pWw6YePXHJcbiAgICBwdWJsaWMgdXBkYXRlT25saW5lUGxheWVyKGNvdW50OiBudW1iZXIpIHtcclxuICAgICAgICAvLyBsZXQgcGxheWVyID0gPEJid3pPbmxpbmVQbGF5ZXJWaWV3PnRoaXMuZ2V0UGxheWVyKEJid3pSb2xlLk9ubGluZSk7XHJcbiAgICAgICAgLy8gcGxheWVyLnNldENvdW50TGJsKHRydWUsIGNvdW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcGF0Y2hDb21wYXJlUmV3YXJkKGlzQW5pbTogYm9vbGVhbiwgcG9rZXJzOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmNvbXBhcmVSb290Vmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY29tcGFyZVJvb3RWaWV3LmRvQWxsR3JvdXBQb2tlckRpc3BhdGNoKGlzQW5pbSwgcG9rZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0NvbXBhcmVSZXdhcmQoZ3JvdXA6IHN0cmluZ1tdLCBwb2tlcnM6IGFueSwgaXNBbmltOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5jb21wYXJlUm9vdFZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb3VwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcGFyZVJvb3RWaWV3LmRvT25lR3JvdXBQb2tlcnNGbG9wKGdyb3VwW2ldLCBwb2tlcnMsIGlzQW5pbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWFsQ29tcGFyZVJld2FyZChncm91cDogc3RyaW5nLCBpc0FuaW06IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmNvbXBhcmVSb290Vmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5jb21wYXJlUm9vdFZpZXcuZG9PbmVHcm91cFBva2Vyc0ZpcnN0RGVhbChncm91cFtpXSwgaXNBbmltKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnu5Pnrpfpo5jliIZcclxuICAgICAqIEBwYXJhbSBkYXRhIHsgMDoge3dpbjogOTUwMDAwMCwgYmV0X3dpbjoge2RyYWdvbjogMjAwMDAwMDB9LCB0b3RhbF93aW46IDE5NTAwMDAwfSwgOTk5OTogLi4uIH1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNob3dQbGF5ZXJSZXdhcmRMYmwoZGF0YTogYW55KSB7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMucGxheWVyTWFwKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWF0ID0gTnVtYmVyKGtleSk7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBkYXRhW3NlYXRdO1xyXG4gICAgICAgICAgICBpZiAoc2VhdCAhPSBCYnd6Um9sZS5PbmxpbmUgJiYgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLmJldF93aW4gJiYgIUdsb2JhbC5Ub29sa2l0LmlzRW1wdHlPYmplY3Qob2JqLmJldF93aW4pKSAgICAgIC8vIGRlYnVnIOayoeacieS4i+azqOS5n+mjmDDliIYg5Yik5pat5piv5ZCm5LiL5rOo5aSE55CGXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsUGxheWVyKHNlYXQsIFwic2V0UmV3YXJkXCIsIG9iai53aW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOabtOaWsOW6lemDqOS4i+azqOetueeggeWSjOe7reWOi+eKtuaAgVxyXG4gICAgcHVibGljIHVwZGF0ZUJldFNlbGVjdEJ1dHRvbigpIHtcclxuICAgICAgICBpZiAoQmJ3ekRhdGEuaW5zdGFuY2UuaXNCZXRFbmFibGUoKSkge1xyXG4gICAgICAgICAgICBsZXQgcG9pbnQgPSBCYnd6RGF0YS5nZXRNeUdvbGQoKTtcclxuICAgICAgICAgICAgbGV0IGxlZnQgPSBCYnd6RGF0YS5pbnN0YW5jZS5iZXRfbWF4IC0gQmJ3ekRhdGEuaW5zdGFuY2UuZ2V0TXlUb3RhbEJldCgpO1xyXG4gICAgICAgICAgICBsZXQgbWluID0gQmJ3ekRhdGEuaW5zdGFuY2UuYmV0X21pbjtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RDaGlwc1ZpZXcuY2hlY2tCdG5TZWxlY3RBY3RpdmUocG9pbnQsIGxlZnQsIG1pbik7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0Q2hpcHNWaWV3LmVuYWJsZUJldENoaXBCdG4oKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RDaGlwc1ZpZXcudXBkYXRlQ29udGludWVCdG4oQmJ3ekRhdGEuaW5zdGFuY2UuY2FuQ29udGludWVCZXQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdENoaXBzVmlldy5kaXNhYmxlQWxsQmV0Q2hpcEJ0bigpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdENoaXBzVmlldy51cGRhdGVDb250aW51ZUJ0bihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pm65aSa5pif5LiL5rOoXHJcbiAgICAgKiBAcGFyYW0gaXNBbmltIOaYr+WQpuaSreaUvumjnuihjOWKqOeUu1xyXG4gICAgICogQHBhcmFtIGFyZWFOYW1lQXJyIOS4i+azqOWMuuWfn+aVsOe7hCwg5pSv5oyB5aSa5Liq5Yy65Z+fLCDkuIDkuKrlsLHkvKBbXCJ4eHhcIl1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNob3dXaXNlclN0YXIoaXNBbmltOiBib29sZWFuLCBhcmVhTmFtZUFycjogc3RyaW5nW10gPSBbXSkge1xyXG4gICAgICAgIGFyZWFOYW1lQXJyLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYmV0QXJlYVJvb3RWaWV3LnNob3dTdGFyQmV0RWZmZWN0KGlzQW5pbSwgbmFtZSwgdGhpcy5nZXRXaXNlclBsYXllcigpLmdldENlbnRlcldvcmxkUG9zKCkpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXlj7DvvIzov5vlhaXnrYnlvoXkuIvkuIDlsYDnmoTnirbmgIFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsZWFyQnlSb3VuZCgpIHtcclxuICAgICAgICBCYnd6RGF0YS5pbnN0YW5jZS5nYW1lU3RhdGUgPSBCYnd6R2FtZVN0YXRlLldhaXQ7XHJcbiAgICAgICAgdGhpcy5zdGF0ZVZpZXcucnVuU3RhdGUoQmJ3ekRhdGEuaW5zdGFuY2UuZ2FtZVN0YXRlLCBmYWxzZSk7XHJcbiAgICAgICAgQmJ3ekRyaXZlci5pbnN0YW5jZS5jaGlwTWFuYWdlci5jbGVhcigpO1xyXG4gICAgICAgIEJid3pCZXRNYW5hZ2VyLmNsZWFyQmV0UXVldWUoKTtcclxuICAgICAgICB0aGlzLmJldEVuYWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLmNhbGxBbGxQbGF5ZXJzKFwiY2xlYXJCeVJvdW5kXCIpO1xyXG4gICAgICAgIHRoaXMudmlld1NldC5jYWxsQWxsKFwiY2xlYXJCeVJvdW5kXCIpOyAgICAgICAgLy8g6LCD55So5omA5pyJ5rOo5YaM5a2Qdmlld+eahGNsZWFyQnlHYW1lXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXlnLog6YCA5Ye65b2T5YmN5oi/6Ze0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGVhckJ5R2FtZSgpIHtcclxuICAgICAgICBCYnd6RGF0YS5pbnN0YW5jZS5jbGVhckhpc3RvcnkoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jYWxsQWxsUGxheWVycyhcImNsZWFyQnlHYW1lXCIpO1xyXG4gICAgICAgIHRoaXMudmlld1NldC5jYWxsQWxsKFwiY2xlYXJCeUdhbWVcIik7ICAgICAgIC8vIOiwg+eUqOaJgOacieazqOWGjOWtkHZpZXfnmoRjbGVhckJ5Um91bmRcclxuICAgIH1cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKiDpgJrnlKjmjqXlj6MgKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIHB1YmxpYyByZWdpc3RWaWV3KGtleTogc3RyaW5nLCB2aWV3OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnZpZXdTZXQucmVnaXN0VmlldyhrZXksIHZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRWaWV3PFQ+KGtleTogc3RyaW5nKTogVCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmlld1NldC5nZXRWaWV3RXg8VD4oa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UGxheWVyPFQ+KGNoYWlyOiBudW1iZXIpOiBUIHtcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5wbGF5ZXJNYXBbY2hhaXJdO1xyXG4gICAgICAgIGlmICghcGxheWVyKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuW6p+S9jeW8guW4uCwg5om+5LiN5Yiw5oyH5a6a546p5a62XCIsIGNoYWlyKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwbGF5ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGxQbGF5ZXIoY2hhaXI6IG51bWJlciwgZnVuYzogc3RyaW5nLCAuLi5hcmdzKSB7XHJcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuZ2V0UGxheWVyKGNoYWlyKTtcclxuICAgICAgICBpZiAocGxheWVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5om+5LiN5YiwcGxheWVyISEhXCIsIGNoYWlyKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGxheWVyW2Z1bmNdICYmIHBsYXllcltmdW5jXS5hcHBseSkge1xyXG4gICAgICAgICAgICBwbGF5ZXJbZnVuY10uYXBwbHkocGxheWVyLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGxBbGxQbGF5ZXJzKGZ1bmM6IHN0cmluZywgLi4uYXJncykge1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLnBsYXllck1hcCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxQbGF5ZXIoTnVtYmVyKGtleSksIGZ1bmMsIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U2VsZlBsYXllcigpOiBCYnd6U2VsZlBsYXllclZpZXcge1xyXG4gICAgICAgIHJldHVybiA8QmJ3elNlbGZQbGF5ZXJWaWV3PnRoaXMuZ2V0UGxheWVyKEJid3pSb2xlLlNlbGYpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRPbmxpbmVQbGF5ZXIoKTogQmJ3ek9ubGluZVBsYXllclZpZXcge1xyXG4gICAgICAgIHJldHVybiA8QmJ3ek9ubGluZVBsYXllclZpZXc+dGhpcy5nZXRQbGF5ZXIoQmJ3elJvbGUuT25saW5lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0V2lzZXJQbGF5ZXIoKTogQmJ3ek90aGVyUGxheWVyVmlldyB7XHJcbiAgICAgICAgcmV0dXJuIDxCYnd6T3RoZXJQbGF5ZXJWaWV3PnRoaXMuZ2V0UGxheWVyKEJid3pSb2xlLldpc2VyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UmljaGVyUGxheWVycygpOiBCYnd6T3RoZXJQbGF5ZXJWaWV3W10ge1xyXG4gICAgICAgIGxldCBhcnI6IEJid3pPdGhlclBsYXllclZpZXdbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLnBsYXllck1hcCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJNYXBba2V5XSAmJiBOdW1iZXIoa2V5KSAhPSBCYnd6Um9sZS5TZWxmICYmIE51bWJlcihrZXkpICE9IEJid3pSb2xlLk9ubGluZSAmJiBOdW1iZXIoa2V5KSAhPSBCYnd6Um9sZS5XaXNlcilcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKHRoaXMucGxheWVyTWFwW2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG59Il19