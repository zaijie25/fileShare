
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/panel/ErmjMainUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cbcf7x2hxNITLLuuvCsxkLM', 'ErmjMainUI');
// ermj/Ermj/scripts/panel/ErmjMainUI.ts

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ErmjBaseComponent_1 = require("../component/ErmjBaseComponent");
var ErmjPathHelper_1 = require("../data/ErmjPathHelper");
var ErmjMatchPlayerView_1 = require("../subView/ErmjMatchPlayerView");
var ErmjGameStartView_1 = require("../subView/ErmjGameStartView");
var ErmjAskNoticeView_1 = require("../subView/ErmjAskNoticeView");
var ErmjLeftTipsView_1 = require("../subView/ErmjLeftTipsView");
var ErmjFlowView_1 = require("../subView/ErmjFlowView");
var ErmjSettleView_1 = require("../subView/ErmjSettleView");
var ErmjOutMjViewManager_1 = require("../manager/ErmjOutMjViewManager");
var ErmjPlayerView_1 = require("../subView/player/ErmjPlayerView");
var ErmjMjPlayerView_1 = require("../subView/mahjong/ErmjMjPlayerView");
var ErmjMahjongHillView_1 = require("../subView/mahjong/ErmjMahjongHillView");
var ErmjRuleConst_1 = require("../data/ErmjRuleConst");
var ErmjGameConst_1 = require("../data/ErmjGameConst");
var ErmjMenuView_1 = require("../subView/ErmjMenuView");
var ErmjGameEvent_1 = require("../data/ErmjGameEvent");
var ErmjAskActionView_1 = require("../subView/ErmjAskActionView");
var ErmjMahjongSelfPlayView_1 = require("../subView/ErmjMahjongSelfPlayView");
var ErmjDiceAnim_1 = require("../component/ErmjDiceAnim");
var ErmjRubMjAnim_1 = require("../component/ErmjRubMjAnim");
var ErmjWinLightningView_1 = require("../subView/ErmjWinLightningView");
var ErmjMjStyleHelper_1 = require("../tool/ErmjMjStyleHelper");
var ErmjAskBtnView_1 = require("../subView/ErmjAskBtnView");
var ErmjDriver_1 = require("../ErmjDriver");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ErmjMainUI = /** @class */ (function (_super) {
    __extends(ErmjMainUI, _super);
    function ErmjMainUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playerViewList = [];
        _this.mjPlayerViewList = [];
        return _this;
    }
    ErmjMainUI.prototype.onLoad = function () {
        this.viewSet = new ViewSet();
        this.Define = ErmjDriver_1.default.instance.Define;
        this.initView();
    };
    ErmjMainUI.prototype.onEnable = function () {
        Game.Event.on(ErmjGameEvent_1.default.doPatchwork, this, this.doHillPatchwork);
        Game.Event.on(ErmjGameEvent_1.default.doTingCallPlay, this, this.doTingSwitch);
        Game.Event.on(ErmjGameEvent_1.default.onUserInfoTouch, this, this.onUserInfoShow);
        Global.Event.on(GlobalEvent.TYPE_VIP_ENTER_GAME, this, this.vipEnterGame);
    };
    ErmjMainUI.prototype.onDisable = function () {
        Game.Event.off(ErmjGameEvent_1.default.doPatchwork, this, this.doHillPatchwork);
        Game.Event.off(ErmjGameEvent_1.default.doTingCallPlay, this, this.doTingSwitch);
        Game.Event.off(ErmjGameEvent_1.default.onUserInfoTouch, this, this.onUserInfoShow);
        Global.Event.off(GlobalEvent.TYPE_VIP_ENTER_GAME, this, this.vipEnterGame);
    };
    ErmjMainUI.prototype.vipEnterGame = function (msg) {
        if (msg.data._gid == ErmjGameConst_1.default.Gid && msg.data._glv === Game.Control.curLv) {
            Global.Event.event(GlobalEvent.VIPADMISSION, msg.data);
        }
    };
    ErmjMainUI.prototype.onDestroy = function () {
        this.taskManager.onDispose();
    };
    ErmjMainUI.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.initManager();
        this.initCenterView();
        this.initBottomView();
        this.initTopView();
        this.initFloatView();
        this.initHeadTipsManager();
        this.initTaskManager();
        this.levelSp = cc.find("bottomNode/levelSp", this.node).getComponent(cc.Sprite);
        this.baseLbl = cc.find("bottomNode/baseScore/baseLbl", this.node).getComponent(cc.Label);
        this.lastOutSign = cc.find("centerNode/outSign", this.node);
        this.lastOutSign.active = false;
        var menuNode = cc.find("menuNode", this.node);
        Global.Toolkit.freeAdjustIphoneX([menuNode]);
        var menuView = new ErmjMenuView_1.default(menuNode);
        menuView.active = true;
        this.registView(this.Define.ViewMenu, menuView);
        var paomadengNode = cc.find("topNode/paomadeng", this.node);
        var paomadengMask = cc.find("MsgBox", paomadengNode);
        Global.UIHelper.addPaoMaDengComp(paomadengMask, false, paomadengNode);
        Global.UIHelper.addWifiComp(this.getChild('rightAttach/wifiNode'), 2);
        Global.UIHelper.addAdmissionComp(cc.find("topNode/admissionBox", this.node));
        ErmjGameConst_1.default.addCommonClick(this.node, "testBtn", function () {
            Game.Event.event(Game.EVENT_CALL_RECONNECT);
        }, this);
    };
    ErmjMainUI.prototype.initManager = function () {
        // 打出麻将子管理
        var outRoot = this.getChild("centerNode/mahjong/outMjPool");
        this.outMjManager = new ErmjOutMjViewManager_1.default(outRoot);
        ErmjDriver_1.default.instance.outMjManager = this.outMjManager;
    };
    ErmjMainUI.prototype.initCenterView = function () {
        var root = this.getChild("centerNode");
        // 玩家
        for (var i = 0; i < ErmjGameConst_1.default.maxPlayerCount; i++) {
            var node = this.getChild("centerNode/player/player" + i);
            var player = new ErmjPlayerView_1.default(node, i);
            player.clientSit = i;
            player.hide();
            this.playerViewList.push(player);
        }
        // 玩家手牌
        for (var i = 0; i < ErmjGameConst_1.default.maxPlayerCount; i++) {
            var node = this.getChild("centerNode/mahjong/mahjong" + i);
            var mjPlayer = new ErmjMjPlayerView_1.default(node, i);
            mjPlayer.active = false;
            this.mjPlayerViewList.push(mjPlayer);
        }
        // 自己手牌麻将操作
        var selfPlayPrefab = Global.ResourceManager.getBundleRes(ErmjGameConst_1.default.Gid, ErmjPathHelper_1.default.gamePrefabsPath + "panel/subView/selfPlayView", cc.Prefab);
        var selfPlayNode = cc.instantiate(selfPlayPrefab);
        selfPlayNode.setParent(root.getChildByName("selfRoot"));
        selfPlayNode.setPosition(cc.Vec2.ZERO);
        this.selfPlayView = new ErmjMahjongSelfPlayView_1.default(selfPlayNode);
        this.selfPlayView.active = false;
        this.registView(this.Define.ViewSelfPlay, this.selfPlayView);
        // 操作按钮
        var askActionPrefab = Global.ResourceManager.getBundleRes(ErmjGameConst_1.default.Gid, ErmjPathHelper_1.default.gamePrefabsPath + "panel/subView/askActionView", cc.Prefab);
        var askActionNode = cc.instantiate(askActionPrefab);
        askActionNode.setParent(root);
        askActionNode.setPosition(cc.Vec2.ZERO);
        this.askActionView = new ErmjAskActionView_1.default(askActionNode);
        this.askActionView.active = false;
        this.registView(this.Define.ViewAskAction, this.askActionView);
        // 挂机按钮
        var askBtnPrefab = Global.ResourceManager.getBundleRes(ErmjGameConst_1.default.Gid, ErmjPathHelper_1.default.gamePrefabsPath + "panel/subView/autoBtnVIew", cc.Prefab);
        var askBtnNode = cc.instantiate(askBtnPrefab);
        askBtnNode.setParent(root);
        askBtnNode.setPosition(cc.Vec2.ZERO);
        this.askBtnView = new ErmjAskBtnView_1.default(askBtnNode);
        this.askBtnView.active = true;
        this.registView(this.Define.ViewAskBtn, this.askBtnView);
    };
    ErmjMainUI.prototype.initBottomView = function () {
        var root = this.getChild("bottomNode");
        // 操作轮盘提示
        var askNoticePrefab = Global.ResourceManager.getBundleRes(ErmjGameConst_1.default.Gid, ErmjPathHelper_1.default.gamePrefabsPath + "panel/subView/askNoticeView", cc.Prefab);
        var askNoticeNode = cc.instantiate(askNoticePrefab);
        askNoticeNode.setParent(root);
        askNoticeNode.setPosition(cc.Vec2.ZERO);
        this.askNoticeView = new ErmjAskNoticeView_1.default(askNoticeNode);
        this.askNoticeView.active = true;
        this.registView(this.Define.ViewAskNotice, this.askNoticeView);
        // 牌墙
        var mjHillPrefab = Global.ResourceManager.getBundleRes(ErmjGameConst_1.default.Gid, ErmjPathHelper_1.default.gamePrefabsPath + "panel/mahjong/mahjongHillView", cc.Prefab);
        var mjHillNode = cc.instantiate(mjHillPrefab);
        mjHillNode.setParent(root);
        mjHillNode.setPosition(cc.Vec2.ZERO);
        this.mjHillView = new ErmjMahjongHillView_1.default(mjHillNode);
        this.mjHillView.active = false;
        this.registView(this.Define.ViewMjHill, this.mjHillView);
        // 骰子动画组件 
        var diceAnimPrefab = Global.ResourceManager.getBundleRes(ErmjGameConst_1.default.Gid, ErmjPathHelper_1.default.gamePrefabsPath + "panel/subView/diceAnim", cc.Prefab);
        var diceAnimNode = cc.instantiate(diceAnimPrefab);
        diceAnimNode.setParent(root);
        diceAnimNode.setPosition(cc.Vec2.ZERO);
        this.diceAnimComp = diceAnimNode.getComponent(ErmjDiceAnim_1.default);
        this.diceAnimComp.node.active = false;
    };
    ErmjMainUI.prototype.initTopView = function () {
        var root = this.getChild("topNode");
        // 剩余提示
        var leftTipsNode = cc.find("leftTipsView", root);
        this.leftTipsView = new ErmjLeftTipsView_1.default(leftTipsNode);
        this.leftTipsView.active = false;
        this.registView(this.Define.ViewLeftTips, this.leftTipsView);
        // 搓麻将子动画组件 
        var rubMjAnimPrefab = Global.ResourceManager.getBundleRes(ErmjGameConst_1.default.Gid, ErmjPathHelper_1.default.gamePrefabsPath + "panel/subView/rubMjAnim", cc.Prefab);
        var rubMjAnimNode = cc.instantiate(rubMjAnimPrefab);
        rubMjAnimNode.setParent(root);
        rubMjAnimNode.setPosition(cc.Vec2.ZERO);
        this.rubMjAnimComp = rubMjAnimNode.getComponent(ErmjRubMjAnim_1.default);
        this.rubMjAnimComp.node.active = false;
    };
    ErmjMainUI.prototype.initFloatView = function () {
        var root = this.getChild("floatNode");
        // 匹配中
        var matchPrefab = Global.ResourceManager.getBundleRes(ErmjGameConst_1.default.Gid, ErmjPathHelper_1.default.gamePrefabsPath + "panel/subView/matchPlayerView", cc.Prefab);
        var matchNode = cc.instantiate(matchPrefab);
        matchNode.setParent(root);
        matchNode.setPosition(cc.Vec2.ZERO);
        this.matchPlayerView = new ErmjMatchPlayerView_1.default(matchNode);
        this.matchPlayerView.active = false;
        this.registView(this.Define.ViewMatchPlayer, this.matchPlayerView);
        // 开始游戏
        var startPrefab = Global.ResourceManager.getBundleRes(ErmjGameConst_1.default.Gid, ErmjPathHelper_1.default.gamePrefabsPath + "panel/subView/gameStartView", cc.Prefab);
        var startNode = cc.instantiate(startPrefab);
        startNode.setParent(root);
        startNode.setPosition(cc.Vec2.ZERO);
        this.gameStartView = new ErmjGameStartView_1.default(startNode);
        this.gameStartView.active = false;
        this.registView(this.Define.ViewGameStart, this.gameStartView);
        // 胡牌闪电
        var lightningPrefab = Global.ResourceManager.getBundleRes(ErmjGameConst_1.default.Gid, ErmjPathHelper_1.default.gamePrefabsPath + "panel/subView/winLightningView", cc.Prefab);
        var lightningNode = cc.instantiate(lightningPrefab);
        lightningNode.setParent(root);
        lightningNode.setPosition(cc.Vec2.ZERO);
        this.lightningView = new ErmjWinLightningView_1.default(lightningNode);
        this.lightningView.active = false;
        this.registView(this.Define.ViewLightning, this.lightningView);
        // 流局
        var flowPrefab = Global.ResourceManager.getBundleRes(ErmjGameConst_1.default.Gid, ErmjPathHelper_1.default.gamePrefabsPath + "panel/subView/flowView", cc.Prefab);
        var flowNode = cc.instantiate(flowPrefab);
        flowNode.setParent(root);
        flowNode.setPosition(cc.Vec2.ZERO);
        this.flowView = new ErmjFlowView_1.default(flowNode);
        this.flowView.active = false;
        this.registView(this.Define.ViewFlow, this.flowView);
        // 结算
        var settlePrefab = Global.ResourceManager.getBundleRes(ErmjGameConst_1.default.Gid, ErmjPathHelper_1.default.gamePrefabsPath + "panel/subView/settleView", cc.Prefab);
        var settleNode = cc.instantiate(settlePrefab);
        settleNode.setParent(root);
        settleNode.setPosition(cc.Vec2.ZERO);
        this.settleView = new ErmjSettleView_1.default(settleNode);
        this.settleView.active = false;
        this.registView(this.Define.ViewSettle, this.settleView);
    };
    ErmjMainUI.prototype.initHeadTipsManager = function () {
        this.headTipsManager = new HeadTipsManager();
        this.headTipsManager.init(cc.find('floatNode', this.node), cc.find('interactView', this.node), false);
    };
    ErmjMainUI.prototype.initTaskManager = function () {
        this.taskManager = new TaskManager();
        this.taskManager.init(cc.find('rightAttach/taskRoot', this.node), ErmjGameConst_1.default.Gid, -1);
        this.taskManager.reqGetGameTaskList();
    };
    ErmjMainUI.prototype.doResetMj = function () {
        this.selfPlayView.resetSelectMj();
    };
    /** 更新底分数值 */
    ErmjMainUI.prototype.updateLevelBase = function (base, lv) {
        Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.levelSp, ErmjPathHelper_1.default.gameTexturePath + "dynamic/atlas_dynamic", ErmjGameConst_1.default.LevelSpCfg[lv], null, true);
        this.baseLbl.string = Global.Toolkit.formatPointStr(base);
    };
    ErmjMainUI.prototype.showMatch = function (timeo) {
        var _this = this;
        this.matchPlayerView.active = true;
        var player = this.playerViewList[0];
        player.show(Global.PlayerData); // debug 没有area数据
        if (timeo && timeo > 0) {
            this.matchPlayerView.setTimeRunConfig(timeo, function () {
                ErmjDriver_1.default.instance.Context.isWaitMatch = false;
                _this.matchPlayerView.active = false;
                Global.UI.showYesNoBox('匹配超时，是否重新匹配？', function () {
                    Game.Control.trySendEnter({ "_from": "jump" }); // 断socket则不能用这个
                }, function () {
                    Game.Server.send(_this.Define.CmdLeave, { "IsClose": 1 });
                    ErmjDriver_1.default.instance.leaveGame();
                });
            }, this);
        }
    };
    ErmjMainUI.prototype.onBanker = function (bankerSeat, dice, isAnim) {
        var player = this.playerViewList[bankerSeat];
        if (player) {
            player.showBanker(true);
        }
        var _a = ErmjRuleConst_1.default.calculateDealBeigin(bankerSeat, dice), whoStart = _a[0], indexInWall = _a[1];
        this.mjHillView.active = false; // 暂关闭不用了
        this.mjHillView.initWallDeal(whoStart, indexInWall);
        this.leftTipsView.active = true;
        this.leftTipsView.updateLeftLbl(ErmjGameConst_1.default.mahjongTotal);
        // 骰子动画
        this.diceAnimComp.node.active = true;
        this.diceAnimComp.showDice(dice, isAnim);
        if (isAnim) {
            ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.Dice, true);
            Game.Event.event(Game.EVENT_ADDTIMELOCK, "Ermj.onBanker", 2); // 摇骰子动画时间
        }
    };
    /**
     * 发牌动画
     * @param userCardsMap [key本地座位]-[value手牌数据对象]的map
     * @param bankerSeat 庄家本地座位
     */
    ErmjMainUI.prototype.onDeal = function (userCardsMap, bankerSeat, leftCount) {
        var _this = this;
        if (!userCardsMap || Global.Toolkit.isEmptyObject(userCardsMap))
            return;
        var delay = 0;
        var dealOrder = ErmjRuleConst_1.default.getDealOrderArr(bankerSeat);
        for (var i = 0; i < ErmjRuleConst_1.default.dealConfig.length; i++) {
            var arr = ErmjRuleConst_1.default.dealConfig[i];
            var _loop_1 = function (j) {
                var localSeat = dealOrder[j];
                var count = arr[j];
                var mjPlayer = this_1.mjPlayerViewList[localSeat];
                if (mjPlayer && count > 0 && userCardsMap[localSeat]) { // 大于0才动画
                    var cards_1 = userCardsMap[localSeat].cards || [];
                    Game.Component.scheduleOnce(function () {
                        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.DealCard, true);
                        _this.mjHillView.doDeal(count);
                        mjPlayer.active = true;
                        mjPlayer.setHandMjShow(true);
                        mjPlayer.dealHandMj(count, cards_1);
                        if (localSeat == 0) {
                            mjPlayer.setDarkHandMjOutScreen();
                            _this.selfPlayView.active = true;
                            _this.selfPlayView.dealHandMj(count, cards_1);
                        }
                        _this.leftTipsView.reduceLeftLbl(count); // 动态减
                    }, delay);
                    delay += 0.35;
                }
            };
            var this_1 = this;
            for (var j = 0; j < arr.length; j++) {
                _loop_1(j);
            }
        }
        Game.Component.scheduleOnce(function () {
            _this.leftTipsView.active = true;
            _this.leftTipsView.updateLeftLbl(leftCount);
            _this.selfPlayView.sortCardDirectly(false); // 整理手牌排序
        }, delay);
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "Ermj.onDeal", delay + 0.5);
    };
    ErmjMainUI.prototype.onDealDirectly = function (userCardsMap, leftCount) {
        var _this = this;
        if (!userCardsMap || Global.Toolkit.isEmptyObject(userCardsMap))
            return;
        this.mjPlayerViewList.forEach(function (mjPlayer, localSeat) {
            var data = userCardsMap[localSeat];
            mjPlayer.active = true;
            mjPlayer.setHandMjShow(true);
            mjPlayer.dealHandMj(data.hand_count, []);
            if (localSeat == 0) {
                mjPlayer.setDarkHandMjOutScreen();
                _this.selfPlayView.active = true;
                _this.selfPlayView.dealHandMj(data.hand_count, data.cards);
            }
        });
        this.leftTipsView.updateLeftLbl(leftCount);
        this.selfPlayView.sortCardDirectly(false); // 整理手牌排序
    };
    /**
     * 补花
     * @param localSeat 谁补花
     * @param outArr 花牌
     * @param newArr 换进来的牌
     */
    ErmjMainUI.prototype.onChangeFlower = function (localSeat, outArr, newArr, leftCount) {
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.genderSoundPath("buhua", localSeat == 0 ? 0 : 1), true);
        var mjPlayer = this.mjPlayerViewList[localSeat];
        mjPlayer.changeFlower(outArr, newArr || []);
        if (localSeat == 0) {
            this.selfPlayView.changeFlower(outArr, newArr || []);
        }
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "Ermj.onChangeFlower", 1); // 时间要比changeFlower里的动画总时长长点
        this.leftTipsView.updateLeftLbl(leftCount);
    };
    /**
     * 摸牌
     * @param localSeat 谁摸牌
     * @param cards 摸进来的牌 最多只支持一张牌, 其他人是[]
     * @param isHeaDraw 是否从牌堆头摸
     * @param leftCount 剩余牌
     * @param isRub 是否搓牌
     */
    ErmjMainUI.prototype.onDrawCard = function (localSeat, cards, isHeaDraw, leftCount, isRub) {
        var _this = this;
        if (isHeaDraw) {
            this.mjHillView.doDeal(1);
        }
        else {
            this.mjHillView.doPatchwork(1);
        }
        this.leftTipsView.updateLeftLbl(leftCount);
        this.mjPlayerViewList[localSeat].drawHandMj(cards[0]);
        if (localSeat == 0) {
            // 搓牌动画
            if (isRub) {
                this.rubMjAnimComp.node.active = true;
                this.rubMjAnimComp.doRubAnim(cards[0]);
                Game.Component.scheduleOnce(function () {
                    _this.rubMjAnimComp.node.active = false;
                    _this.selfPlayView.drawHandMj(cards[0]);
                    ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.DrawCard, true);
                }, 1.5);
                Game.Event.event(Game.EVENT_ADDTIMELOCK, "Ermj.onDrawCard.isRub", 2);
            }
            else {
                this.selfPlayView.drawHandMj(cards[0]);
                ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.DrawCard, true);
            }
        }
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "Ermj.onDrawCard", 0.31);
    };
    /** 出牌 普通听时候也会走这出一张 */
    ErmjMainUI.prototype.onPlay = function (localSeat, value, isAuto) {
        var _this = this;
        if (isAuto === void 0) { isAuto = false; }
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.genderSoundPath(ErmjMjStyleHelper_1.default.mjOutSoundMap[value], localSeat == 0 ? 0 : 1), true);
        this.mjPlayerViewList[localSeat].outCard(value);
        if (localSeat == 0) {
            this.selfPlayView.outCard(value, true, isAuto);
        }
        var animTime = this.Define.outMjShowTime + this.Define.outMjFlyTime;
        Game.Component.scheduleOnce(function () {
            _this.showLastOutSign(true);
        }, animTime + 0.1);
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "Ermj.onPlay", animTime + 0.15);
    };
    ErmjMainUI.prototype.onChow = function (localSeat, valueArr, chowCard, whoSeat) {
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.genderSoundPath("chi", localSeat == 0 ? 0 : 1), true);
        if (localSeat == 0) {
            var chowIndex = valueArr.indexOf(chowCard);
            var tempArr = __spreadArrays(valueArr);
            tempArr.splice(chowIndex, 1);
            this.selfPlayView.hideOperCard(tempArr);
            this.mjPlayerViewList[localSeat].chowCard(valueArr, chowCard);
        }
        else {
            this.mjPlayerViewList[localSeat].chowCard(valueArr, chowCard);
        }
        this.showLastOutSign(false);
        this.mjPlayerViewList[whoSeat].reduceOneOutMj();
        this.outMjManager.recycleLastOutMj();
        this.playerViewList[localSeat].showStateSp(true, ErmjGameConst_1.default.StateSpStrCfg.Chow);
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "Ermj.onChow", 0.8);
    };
    ErmjMainUI.prototype.onPong = function (localSeat, valueArr, whoSeat) {
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.genderSoundPath("peng", localSeat == 0 ? 0 : 1), true);
        if (localSeat == 0) {
            this.selfPlayView.hideOperCard(valueArr.slice(0, 2)); // 取两个消失
            this.mjPlayerViewList[localSeat].pongCard(valueArr);
        }
        else {
            this.mjPlayerViewList[localSeat].pongCard(valueArr);
        }
        this.showLastOutSign(false);
        this.mjPlayerViewList[whoSeat].reduceOneOutMj();
        this.outMjManager.recycleLastOutMj();
        this.playerViewList[localSeat].showStateSp(true, ErmjGameConst_1.default.StateSpStrCfg.Pong);
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "Ermj.onPong", 0.8);
    };
    ErmjMainUI.prototype.onKong = function (localSeat, valueArr, type, whoSeat) {
        if (type == 6) {
            ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.genderSoundPath("angang", localSeat == 0 ? 0 : 1), true);
        }
        else {
            ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.genderSoundPath("gang", localSeat == 0 ? 0 : 1), true);
        }
        if (localSeat == 0) {
            var count = type == 6 ? 4 : type == 5 ? 1 : 3; // 6暗杠: 4; 5碰杠: 1; 4直杠: 3
            this.selfPlayView.hideOperCard(valueArr.slice(0, count)); // 根据类似取
            this.mjPlayerViewList[localSeat].kongCard(type, valueArr);
            this.selfPlayView.showPlayTips(false);
        }
        else {
            this.mjPlayerViewList[localSeat].kongCard(type, valueArr);
        }
        if (type == 4) {
            this.showLastOutSign(false);
            this.mjPlayerViewList[whoSeat].reduceOneOutMj();
            this.outMjManager.recycleLastOutMj();
        }
        this.playerViewList[localSeat].showStateSp(true, ErmjGameConst_1.default.StateSpStrCfg.Kong);
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "Ermj.onKong", 0.8);
    };
    ErmjMainUI.prototype.onWin = function (localSeat, whoSeat, card, type, isAnim) {
        var stateStr = type == 1 ? ErmjGameConst_1.default.StateSpStrCfg.WinAll : type == 3 ? ErmjGameConst_1.default.StateSpStrCfg.RobWin : ErmjGameConst_1.default.StateSpStrCfg.Win;
        this.playerViewList[localSeat].showStateSp(true, stateStr);
        this.selfPlayView.doWin();
        this.mjPlayerViewList[localSeat].addWinMjShow(card);
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.Hu, true);
        if (isAnim) {
            if (type == 3) { // 抢杠胡
                ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.genderSoundPath("hu", localSeat == 0 ? 0 : 1), true);
                this.mjPlayerViewList[whoSeat].robbedKongLose(card);
            }
            else if (type == 2) { // 点炮
                ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.genderSoundPath("hu", localSeat == 0 ? 0 : 1), true);
                this.showLastOutSign(false);
                this.outMjManager.recycleLastOutMj(); // 隐藏最后一次打出的点炮牌
            }
            else { // 自摸 
                ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.genderSoundPath("zimo", localSeat == 0 ? 0 : 1), true);
                this.mjPlayerViewList[localSeat].winHideLastDraw(card); // 重连时走reward
                if (localSeat == 0) {
                    this.selfPlayView.winHideLastDraw(card);
                }
            }
            this.lightningView.setLightPoint(this.mjPlayerViewList[localSeat].getLightningWorldPos());
            this.lightningView.active = true;
            Game.Event.event(Game.EVENT_ADDTIMELOCK, "Ermj.onWin", 1);
        }
    };
    /** 最后一次出牌光标 */
    ErmjMainUI.prototype.showLastOutSign = function (flag) {
        this.lastOutSign.stopAllActions();
        this.lastOutSign.active = flag;
        if (flag) {
            var lastMjItem = this.outMjManager.getLastOutMj();
            this.lastOutSign.setPosition(this.lastOutSign.parent.convertToNodeSpaceAR(lastMjItem.getAttentionWorldPos()));
            this.lastOutSign.runAction(cc.repeatForever(cc.sequence([
                cc.moveBy(0.4, cc.v2(0, 15)),
                cc.moveBy(0.4, cc.v2(0, -15)),
            ])));
        }
    };
    ErmjMainUI.prototype.doHillPatchwork = function (count) {
        this.mjHillView.doPatchwork(count);
    };
    ErmjMainUI.prototype.doTingSwitch = function (isTing, tingData) {
        if (this.selfPlayView.active)
            this.selfPlayView.onTingChooseSwitch(isTing, tingData);
    };
    ErmjMainUI.prototype.onUserInfoShow = function (seat, worldPos) {
        var data = ErmjDriver_1.default.instance.Context.playerList[seat];
        if (data) {
            this.headTipsManager.showHeadView(true, seat, worldPos, data);
        }
    };
    ErmjMainUI.prototype.clearWnd = function () {
        //关闭界面单独清理玩家信息
        this.clearPlayers();
        this.clearByGame();
    };
    ErmjMainUI.prototype.clearPlayers = function () {
        for (var i = 0; i < this.playerViewList.length; i++) {
            this.playerViewList[i].hide();
        }
        for (var i = 0; i < this.mjPlayerViewList.length; i++) {
            this.mjPlayerViewList[i].active = false;
        }
        this.selfPlayView.active = false;
    };
    //-----------------------------接口实现--------------------------------
    ErmjMainUI.prototype.clearByRound = function () {
        this.diceAnimComp.node.active = false;
        this.rubMjAnimComp.node.active = false;
        this.showLastOutSign(false);
        this.outMjManager.clear();
        this.viewSet.callAll("clearByRound");
        this.callAllPlayers("clearByRound");
        this.callAllMjPlayers("clearByRound");
    };
    ErmjMainUI.prototype.clearByGame = function () {
        this.outMjManager.clear();
        this.viewSet.callAll("clearByGame");
        this.callAllPlayers("clearByGame");
        this.callAllMjPlayers("clearByGame");
    };
    ErmjMainUI.prototype.registView = function (key, view) {
        this.viewSet.registView(key, view);
    };
    ErmjMainUI.prototype.getView = function (key) {
        return this.viewSet.getViewEx(key);
    };
    //--------------------------------------player相关--------------------------------------------
    //调用单个player方法
    ErmjMainUI.prototype.callPlayer = function (index, func) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var player = this.getPlayer(index);
        if (player == null) {
            Logger.error("找不到player!!!", index);
            // Global.UI.fastTip(`找不到player!!! index: ${index}, func: ${func}`);
            return;
        }
        if (player[func] && player[func].apply) {
            player[func].apply(player, args);
        }
    };
    ErmjMainUI.prototype.callAllPlayers = function (func) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < ErmjGameConst_1.default.maxPlayerCount; i++) {
            var player = this.getPlayer(i);
            if (player == null)
                return;
            if (player[func] && player[func].apply) {
                player[func].apply(player, args);
            }
        }
    };
    ErmjMainUI.prototype.getPlayer = function (index) {
        return this.playerViewList[index];
    };
    ErmjMainUI.prototype.getMjPlayer = function (index) {
        return this.mjPlayerViewList[index];
    };
    ErmjMainUI.prototype.callMjPlayer = function (index, func) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var player = this.getMjPlayer(index);
        if (player == null) {
            Logger.error("找不到player!!!", index);
            // Global.UI.fastTip(`找不到player!!! index: ${index}, func: ${func}`);
            return;
        }
        if (player[func] && player[func].apply) {
            player[func].apply(player, args);
        }
    };
    ErmjMainUI.prototype.callAllMjPlayers = function (func) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < ErmjGameConst_1.default.maxPlayerCount; i++) {
            var player = this.getMjPlayer(i);
            if (player == null)
                return;
            if (player[func] && player[func].apply) {
                player[func].apply(player, args);
            }
        }
    };
    ErmjMainUI = __decorate([
        ccclass
    ], ErmjMainUI);
    return ErmjMainUI;
}(ErmjBaseComponent_1.default));
exports.default = ErmjMainUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xccGFuZWxcXEVybWpNYWluVUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUErRDtBQUMvRCx5REFBd0U7QUFDeEUsc0VBQWlFO0FBRWpFLGtFQUE2RDtBQUM3RCxrRUFBNkQ7QUFDN0QsZ0VBQTJEO0FBQzNELHdEQUFtRDtBQUNuRCw0REFBdUQ7QUFDdkQsd0VBQW1FO0FBQ25FLG1FQUE4RDtBQUM5RCx3RUFBbUU7QUFDbkUsOEVBQXlFO0FBQ3pFLHVEQUFrRDtBQUNsRCx1REFBa0Q7QUFDbEQsd0RBQW1EO0FBQ25ELHVEQUFrRDtBQUNsRCxrRUFBNkQ7QUFDN0QsOEVBQXlFO0FBQ3pFLDBEQUFxRDtBQUNyRCw0REFBdUQ7QUFDdkQsd0VBQW1FO0FBQ25FLCtEQUEwRDtBQUMxRCw0REFBdUQ7QUFDdkQsNENBQXVDO0FBRWpDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDO0lBQXdDLDhCQUFpQjtJQUF6RDtRQUFBLHFFQWtwQkM7UUE3b0JXLG9CQUFjLEdBQXFCLEVBQUUsQ0FBQztRQUN0QyxzQkFBZ0IsR0FBdUIsRUFBRSxDQUFDOztJQTRvQnRELENBQUM7SUFybkJhLDJCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsb0JBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRVMsNkJBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyx1QkFBYSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxD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cG9ydCBFcm1qQmFzZUNvbXBvbmVudCBmcm9tIFwiLi4vY29tcG9uZW50L0VybWpCYXNlQ29tcG9uZW50XCI7XHJcbmltcG9ydCBFcm1qUGF0aEhlbHBlciwgeyBFcm1qQXVkaW9Db25zdCB9IGZyb20gXCIuLi9kYXRhL0VybWpQYXRoSGVscGVyXCI7XHJcbmltcG9ydCBFcm1qTWF0Y2hQbGF5ZXJWaWV3IGZyb20gXCIuLi9zdWJWaWV3L0VybWpNYXRjaFBsYXllclZpZXdcIjtcclxuaW1wb3J0IEVybWpEZWZpbmUgZnJvbSBcIi4uL2RhdGEvRXJtakRlZmluZVwiO1xyXG5pbXBvcnQgRXJtakdhbWVTdGFydFZpZXcgZnJvbSBcIi4uL3N1YlZpZXcvRXJtakdhbWVTdGFydFZpZXdcIjtcclxuaW1wb3J0IEVybWpBc2tOb3RpY2VWaWV3IGZyb20gXCIuLi9zdWJWaWV3L0VybWpBc2tOb3RpY2VWaWV3XCI7XHJcbmltcG9ydCBFcm1qTGVmdFRpcHNWaWV3IGZyb20gXCIuLi9zdWJWaWV3L0VybWpMZWZ0VGlwc1ZpZXdcIjtcclxuaW1wb3J0IEVybWpGbG93VmlldyBmcm9tIFwiLi4vc3ViVmlldy9Fcm1qRmxvd1ZpZXdcIjtcclxuaW1wb3J0IEVybWpTZXR0bGVWaWV3IGZyb20gXCIuLi9zdWJWaWV3L0VybWpTZXR0bGVWaWV3XCI7XHJcbmltcG9ydCBFcm1qT3V0TWpWaWV3TWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9Fcm1qT3V0TWpWaWV3TWFuYWdlclwiO1xyXG5pbXBvcnQgRXJtalBsYXllclZpZXcgZnJvbSBcIi4uL3N1YlZpZXcvcGxheWVyL0VybWpQbGF5ZXJWaWV3XCI7XHJcbmltcG9ydCBFcm1qTWpQbGF5ZXJWaWV3IGZyb20gXCIuLi9zdWJWaWV3L21haGpvbmcvRXJtak1qUGxheWVyVmlld1wiO1xyXG5pbXBvcnQgRXJtak1haGpvbmdIaWxsVmlldyBmcm9tIFwiLi4vc3ViVmlldy9tYWhqb25nL0VybWpNYWhqb25nSGlsbFZpZXdcIjtcclxuaW1wb3J0IEVybWpSdWxlQ29uc3QgZnJvbSBcIi4uL2RhdGEvRXJtalJ1bGVDb25zdFwiO1xyXG5pbXBvcnQgRXJtakdhbWVDb25zdCBmcm9tIFwiLi4vZGF0YS9Fcm1qR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBFcm1qTWVudVZpZXcgZnJvbSBcIi4uL3N1YlZpZXcvRXJtak1lbnVWaWV3XCI7XHJcbmltcG9ydCBFcm1qR2FtZUV2ZW50IGZyb20gXCIuLi9kYXRhL0VybWpHYW1lRXZlbnRcIjtcclxuaW1wb3J0IEVybWpBc2tBY3Rpb25WaWV3IGZyb20gXCIuLi9zdWJWaWV3L0VybWpBc2tBY3Rpb25WaWV3XCI7XHJcbmltcG9ydCBFcm1qTWFoam9uZ1NlbGZQbGF5VmlldyBmcm9tIFwiLi4vc3ViVmlldy9Fcm1qTWFoam9uZ1NlbGZQbGF5Vmlld1wiO1xyXG5pbXBvcnQgRXJtakRpY2VBbmltIGZyb20gXCIuLi9jb21wb25lbnQvRXJtakRpY2VBbmltXCI7XHJcbmltcG9ydCBFcm1qUnViTWpBbmltIGZyb20gXCIuLi9jb21wb25lbnQvRXJtalJ1Yk1qQW5pbVwiO1xyXG5pbXBvcnQgRXJtaldpbkxpZ2h0bmluZ1ZpZXcgZnJvbSBcIi4uL3N1YlZpZXcvRXJtaldpbkxpZ2h0bmluZ1ZpZXdcIjtcclxuaW1wb3J0IEVybWpNalN0eWxlSGVscGVyIGZyb20gXCIuLi90b29sL0VybWpNalN0eWxlSGVscGVyXCI7XHJcbmltcG9ydCBFcm1qQXNrQnRuVmlldyBmcm9tIFwiLi4vc3ViVmlldy9Fcm1qQXNrQnRuVmlld1wiO1xyXG5pbXBvcnQgRXJtakRyaXZlciBmcm9tIFwiLi4vRXJtakRyaXZlclwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJtak1haW5VSSBleHRlbmRzIEVybWpCYXNlQ29tcG9uZW50IHtcclxuICAgIHB1YmxpYyB2aWV3U2V0OiBWaWV3U2V0O1xyXG4gICAgcHJpdmF0ZSBEZWZpbmU6IEVybWpEZWZpbmU7XHJcbiAgICBwcml2YXRlIG91dE1qTWFuYWdlcjogRXJtak91dE1qVmlld01hbmFnZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBwbGF5ZXJWaWV3TGlzdDogRXJtalBsYXllclZpZXdbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBtalBsYXllclZpZXdMaXN0OiBFcm1qTWpQbGF5ZXJWaWV3W10gPSBbXTtcclxuICAgIHByaXZhdGUgbGV2ZWxTcDogY2MuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSBiYXNlTGJsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgbGFzdE91dFNpZ246IGNjLk5vZGU7XHJcbiAgICAvLyDlrZBWaWV3XHJcbiAgICBwdWJsaWMgbWF0Y2hQbGF5ZXJWaWV3OiBFcm1qTWF0Y2hQbGF5ZXJWaWV3O1xyXG4gICAgcHVibGljIGdhbWVTdGFydFZpZXc6IEVybWpHYW1lU3RhcnRWaWV3O1xyXG4gICAgcHVibGljIGxpZ2h0bmluZ1ZpZXc6IEVybWpXaW5MaWdodG5pbmdWaWV3O1xyXG4gICAgcHVibGljIGFza05vdGljZVZpZXc6IEVybWpBc2tOb3RpY2VWaWV3O1xyXG4gICAgcHVibGljIG1qSGlsbFZpZXc6IEVybWpNYWhqb25nSGlsbFZpZXc7XHJcbiAgICBwdWJsaWMgbGVmdFRpcHNWaWV3OiBFcm1qTGVmdFRpcHNWaWV3O1xyXG4gICAgcHVibGljIGFza0FjdGlvblZpZXc6IEVybWpBc2tBY3Rpb25WaWV3O1xyXG4gICAgcHVibGljIGZsb3dWaWV3OiBFcm1qRmxvd1ZpZXc7XHJcbiAgICBwdWJsaWMgc2V0dGxlVmlldzogRXJtalNldHRsZVZpZXc7XHJcbiAgICBwdWJsaWMgc2VsZlBsYXlWaWV3OiBFcm1qTWFoam9uZ1NlbGZQbGF5VmlldztcclxuICAgIHB1YmxpYyBhc2tCdG5WaWV3OiBFcm1qQXNrQnRuVmlldztcclxuXHJcbiAgICBwdWJsaWMgaGVhZFRpcHNNYW5hZ2VyOiBIZWFkVGlwc01hbmFnZXI7XHJcbiAgICBwdWJsaWMgdGFza01hbmFnZXI6IFRhc2tNYW5hZ2VyO1xyXG4gICAgLy8g57uE5Lu2XHJcbiAgICBwdWJsaWMgZGljZUFuaW1Db21wOiBFcm1qRGljZUFuaW07XHJcbiAgICBwdWJsaWMgcnViTWpBbmltQ29tcDogRXJtalJ1Yk1qQW5pbTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMudmlld1NldCA9IG5ldyBWaWV3U2V0KCk7XHJcbiAgICAgICAgdGhpcy5EZWZpbmUgPSBFcm1qRHJpdmVyLmluc3RhbmNlLkRlZmluZTtcclxuICAgICAgICB0aGlzLmluaXRWaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIEdhbWUuRXZlbnQub24oRXJtakdhbWVFdmVudC5kb1BhdGNod29yaywgdGhpcywgdGhpcy5kb0hpbGxQYXRjaHdvcmspO1xyXG4gICAgICAgIEdhbWUuRXZlbnQub24oRXJtakdhbWVFdmVudC5kb1RpbmdDYWxsUGxheSwgdGhpcywgdGhpcy5kb1RpbmdTd2l0Y2gpO1xyXG4gICAgICAgIEdhbWUuRXZlbnQub24oRXJtakdhbWVFdmVudC5vblVzZXJJbmZvVG91Y2gsIHRoaXMsIHRoaXMub25Vc2VySW5mb1Nob3cpO1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vbihHbG9iYWxFdmVudC5UWVBFX1ZJUF9FTlRFUl9HQU1FLCB0aGlzLCB0aGlzLnZpcEVudGVyR2FtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpIHtcclxuICAgICAgICBHYW1lLkV2ZW50Lm9mZihFcm1qR2FtZUV2ZW50LmRvUGF0Y2h3b3JrLCB0aGlzLCB0aGlzLmRvSGlsbFBhdGNod29yayk7XHJcbiAgICAgICAgR2FtZS5FdmVudC5vZmYoRXJtakdhbWVFdmVudC5kb1RpbmdDYWxsUGxheSwgdGhpcywgdGhpcy5kb1RpbmdTd2l0Y2gpO1xyXG4gICAgICAgIEdhbWUuRXZlbnQub2ZmKEVybWpHYW1lRXZlbnQub25Vc2VySW5mb1RvdWNoLCB0aGlzLCB0aGlzLm9uVXNlckluZm9TaG93KTtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub2ZmKEdsb2JhbEV2ZW50LlRZUEVfVklQX0VOVEVSX0dBTUUsIHRoaXMsIHRoaXMudmlwRW50ZXJHYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZpcEVudGVyR2FtZShtc2cpIHtcclxuICAgICAgICBpZiAobXNnLmRhdGEuX2dpZCA9PSBFcm1qR2FtZUNvbnN0LkdpZCAmJiBtc2cuZGF0YS5fZ2x2ID09PSBHYW1lLkNvbnRyb2wuY3VyTHYpe1xyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuVklQQURNSVNTSU9OLCBtc2cuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy50YXNrTWFuYWdlci5vbkRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMubm9kZS53aWR0aCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLndpZHRoO1xyXG4gICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdE1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0Q2VudGVyVmlldygpO1xyXG4gICAgICAgIHRoaXMuaW5pdEJvdHRvbVZpZXcoKTtcclxuICAgICAgICB0aGlzLmluaXRUb3BWaWV3KCk7XHJcbiAgICAgICAgdGhpcy5pbml0RmxvYXRWaWV3KCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdEhlYWRUaXBzTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMuaW5pdFRhc2tNYW5hZ2VyKCk7XHJcblxyXG4gICAgICAgIHRoaXMubGV2ZWxTcCA9IGNjLmZpbmQoXCJib3R0b21Ob2RlL2xldmVsU3BcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLmJhc2VMYmwgPSBjYy5maW5kKFwiYm90dG9tTm9kZS9iYXNlU2NvcmUvYmFzZUxibFwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5sYXN0T3V0U2lnbiA9IGNjLmZpbmQoXCJjZW50ZXJOb2RlL291dFNpZ25cIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLmxhc3RPdXRTaWduLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgbWVudU5vZGUgPSBjYy5maW5kKFwibWVudU5vZGVcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICBHbG9iYWwuVG9vbGtpdC5mcmVlQWRqdXN0SXBob25lWChbbWVudU5vZGVdKTtcclxuICAgICAgICBsZXQgbWVudVZpZXcgPSBuZXcgRXJtak1lbnVWaWV3KG1lbnVOb2RlKTtcclxuICAgICAgICBtZW51Vmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVnaXN0Vmlldyh0aGlzLkRlZmluZS5WaWV3TWVudSwgbWVudVZpZXcpO1xyXG5cclxuICAgICAgICBsZXQgcGFvbWFkZW5nTm9kZTogY2MuTm9kZSA9IGNjLmZpbmQoXCJ0b3BOb2RlL3Bhb21hZGVuZ1wiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGxldCBwYW9tYWRlbmdNYXNrOiBjYy5Ob2RlID0gY2MuZmluZChcIk1zZ0JveFwiLCBwYW9tYWRlbmdOb2RlKTtcclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkUGFvTWFEZW5nQ29tcChwYW9tYWRlbmdNYXNrLCBmYWxzZSwgcGFvbWFkZW5nTm9kZSk7XHJcbiAgICAgICAgR2xvYmFsLlVJSGVscGVyLmFkZFdpZmlDb21wKHRoaXMuZ2V0Q2hpbGQoJ3JpZ2h0QXR0YWNoL3dpZmlOb2RlJyksIDIpO1xyXG5cclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkQWRtaXNzaW9uQ29tcChjYy5maW5kKFwidG9wTm9kZS9hZG1pc3Npb25Cb3hcIiwgdGhpcy5ub2RlKSk7XHJcblxyXG4gICAgICAgIEVybWpHYW1lQ29uc3QuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcInRlc3RCdG5cIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfQ0FMTF9SRUNPTk5FQ1QpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdE1hbmFnZXIoKSB7XHJcbiAgICAgICAgLy8g5omT5Ye66bq75bCG5a2Q566h55CGXHJcbiAgICAgICAgbGV0IG91dFJvb3QgPSB0aGlzLmdldENoaWxkKFwiY2VudGVyTm9kZS9tYWhqb25nL291dE1qUG9vbFwiKTtcclxuICAgICAgICB0aGlzLm91dE1qTWFuYWdlciA9IG5ldyBFcm1qT3V0TWpWaWV3TWFuYWdlcihvdXRSb290KTtcclxuICAgICAgICBFcm1qRHJpdmVyLmluc3RhbmNlLm91dE1qTWFuYWdlciA9IHRoaXMub3V0TWpNYW5hZ2VyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdENlbnRlclZpZXcoKSB7XHJcbiAgICAgICAgbGV0IHJvb3QgPSB0aGlzLmdldENoaWxkKFwiY2VudGVyTm9kZVwiKTtcclxuXHJcbiAgICAgICAgLy8g546p5a62XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBFcm1qR2FtZUNvbnN0Lm1heFBsYXllckNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmdldENoaWxkKGBjZW50ZXJOb2RlL3BsYXllci9wbGF5ZXIke2l9YCk7XHJcbiAgICAgICAgICAgIGxldCBwbGF5ZXIgPSBuZXcgRXJtalBsYXllclZpZXcobm9kZSwgaSk7XHJcbiAgICAgICAgICAgIHBsYXllci5jbGllbnRTaXQgPSBpO1xyXG4gICAgICAgICAgICBwbGF5ZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllclZpZXdMaXN0LnB1c2gocGxheWVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOeOqeWutuaJi+eJjFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRXJtakdhbWVDb25zdC5tYXhQbGF5ZXJDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5nZXRDaGlsZChgY2VudGVyTm9kZS9tYWhqb25nL21haGpvbmcke2l9YCk7XHJcbiAgICAgICAgICAgIGxldCBtalBsYXllciA9IG5ldyBFcm1qTWpQbGF5ZXJWaWV3KG5vZGUsIGkpO1xyXG4gICAgICAgICAgICBtalBsYXllci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5talBsYXllclZpZXdMaXN0LnB1c2gobWpQbGF5ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g6Ieq5bex5omL54mM6bq75bCG5pON5L2cXHJcbiAgICAgICAgbGV0IHNlbGZQbGF5UHJlZmFiID0gR2xvYmFsLlJlc291cmNlTWFuYWdlci5nZXRCdW5kbGVSZXMoRXJtakdhbWVDb25zdC5HaWQsIEVybWpQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicGFuZWwvc3ViVmlldy9zZWxmUGxheVZpZXdcIiwgY2MuUHJlZmFiKTtcclxuICAgICAgICBsZXQgc2VsZlBsYXlOb2RlID0gPGNjLk5vZGU+Y2MuaW5zdGFudGlhdGUoc2VsZlBsYXlQcmVmYWIpO1xyXG4gICAgICAgIHNlbGZQbGF5Tm9kZS5zZXRQYXJlbnQocm9vdC5nZXRDaGlsZEJ5TmFtZShcInNlbGZSb290XCIpKTtcclxuICAgICAgICBzZWxmUGxheU5vZGUuc2V0UG9zaXRpb24oY2MuVmVjMi5aRVJPKTtcclxuICAgICAgICB0aGlzLnNlbGZQbGF5VmlldyA9IG5ldyBFcm1qTWFoam9uZ1NlbGZQbGF5VmlldyhzZWxmUGxheU5vZGUpO1xyXG4gICAgICAgIHRoaXMuc2VsZlBsYXlWaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVnaXN0Vmlldyh0aGlzLkRlZmluZS5WaWV3U2VsZlBsYXksIHRoaXMuc2VsZlBsYXlWaWV3KTtcclxuXHJcbiAgICAgICAgLy8g5pON5L2c5oyJ6ZKuXHJcbiAgICAgICAgbGV0IGFza0FjdGlvblByZWZhYiA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2V0QnVuZGxlUmVzKEVybWpHYW1lQ29uc3QuR2lkLCBFcm1qUGF0aEhlbHBlci5nYW1lUHJlZmFic1BhdGggKyBcInBhbmVsL3N1YlZpZXcvYXNrQWN0aW9uVmlld1wiLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgIGxldCBhc2tBY3Rpb25Ob2RlID0gPGNjLk5vZGU+Y2MuaW5zdGFudGlhdGUoYXNrQWN0aW9uUHJlZmFiKTtcclxuICAgICAgICBhc2tBY3Rpb25Ob2RlLnNldFBhcmVudChyb290KTtcclxuICAgICAgICBhc2tBY3Rpb25Ob2RlLnNldFBvc2l0aW9uKGNjLlZlYzIuWkVSTyk7XHJcbiAgICAgICAgdGhpcy5hc2tBY3Rpb25WaWV3ID0gbmV3IEVybWpBc2tBY3Rpb25WaWV3KGFza0FjdGlvbk5vZGUpO1xyXG4gICAgICAgIHRoaXMuYXNrQWN0aW9uVmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlZ2lzdFZpZXcodGhpcy5EZWZpbmUuVmlld0Fza0FjdGlvbiwgdGhpcy5hc2tBY3Rpb25WaWV3KTtcclxuXHJcbiAgICAgICAgLy8g5oyC5py65oyJ6ZKuXHJcbiAgICAgICAgbGV0IGFza0J0blByZWZhYiA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2V0QnVuZGxlUmVzKEVybWpHYW1lQ29uc3QuR2lkLCBFcm1qUGF0aEhlbHBlci5nYW1lUHJlZmFic1BhdGggKyBcInBhbmVsL3N1YlZpZXcvYXV0b0J0blZJZXdcIiwgY2MuUHJlZmFiKTtcclxuICAgICAgICBsZXQgYXNrQnRuTm9kZSA9IDxjYy5Ob2RlPmNjLmluc3RhbnRpYXRlKGFza0J0blByZWZhYik7XHJcbiAgICAgICAgYXNrQnRuTm9kZS5zZXRQYXJlbnQocm9vdCk7XHJcbiAgICAgICAgYXNrQnRuTm9kZS5zZXRQb3NpdGlvbihjYy5WZWMyLlpFUk8pO1xyXG4gICAgICAgIHRoaXMuYXNrQnRuVmlldyA9IG5ldyBFcm1qQXNrQnRuVmlldyhhc2tCdG5Ob2RlKTtcclxuICAgICAgICB0aGlzLmFza0J0blZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlZ2lzdFZpZXcodGhpcy5EZWZpbmUuVmlld0Fza0J0biwgdGhpcy5hc2tCdG5WaWV3KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRCb3R0b21WaWV3KCkge1xyXG4gICAgICAgIGxldCByb290ID0gdGhpcy5nZXRDaGlsZChcImJvdHRvbU5vZGVcIik7XHJcblxyXG4gICAgICAgIC8vIOaTjeS9nOi9ruebmOaPkOekulxyXG4gICAgICAgIGxldCBhc2tOb3RpY2VQcmVmYWIgPSBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmdldEJ1bmRsZVJlcyhFcm1qR2FtZUNvbnN0LkdpZCwgRXJtalBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwYW5lbC9zdWJWaWV3L2Fza05vdGljZVZpZXdcIiwgY2MuUHJlZmFiKTtcclxuICAgICAgICBsZXQgYXNrTm90aWNlTm9kZSA9IDxjYy5Ob2RlPmNjLmluc3RhbnRpYXRlKGFza05vdGljZVByZWZhYik7XHJcbiAgICAgICAgYXNrTm90aWNlTm9kZS5zZXRQYXJlbnQocm9vdCk7XHJcbiAgICAgICAgYXNrTm90aWNlTm9kZS5zZXRQb3NpdGlvbihjYy5WZWMyLlpFUk8pO1xyXG4gICAgICAgIHRoaXMuYXNrTm90aWNlVmlldyA9IG5ldyBFcm1qQXNrTm90aWNlVmlldyhhc2tOb3RpY2VOb2RlKTtcclxuICAgICAgICB0aGlzLmFza05vdGljZVZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlZ2lzdFZpZXcodGhpcy5EZWZpbmUuVmlld0Fza05vdGljZSwgdGhpcy5hc2tOb3RpY2VWaWV3KTtcclxuXHJcbiAgICAgICAgLy8g54mM5aKZXHJcbiAgICAgICAgbGV0IG1qSGlsbFByZWZhYiA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2V0QnVuZGxlUmVzKEVybWpHYW1lQ29uc3QuR2lkLCBFcm1qUGF0aEhlbHBlci5nYW1lUHJlZmFic1BhdGggKyBcInBhbmVsL21haGpvbmcvbWFoam9uZ0hpbGxWaWV3XCIsIGNjLlByZWZhYik7XHJcbiAgICAgICAgbGV0IG1qSGlsbE5vZGUgPSA8Y2MuTm9kZT5jYy5pbnN0YW50aWF0ZShtakhpbGxQcmVmYWIpO1xyXG4gICAgICAgIG1qSGlsbE5vZGUuc2V0UGFyZW50KHJvb3QpO1xyXG4gICAgICAgIG1qSGlsbE5vZGUuc2V0UG9zaXRpb24oY2MuVmVjMi5aRVJPKTtcclxuICAgICAgICB0aGlzLm1qSGlsbFZpZXcgPSBuZXcgRXJtak1haGpvbmdIaWxsVmlldyhtakhpbGxOb2RlKTtcclxuICAgICAgICB0aGlzLm1qSGlsbFZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RWaWV3KHRoaXMuRGVmaW5lLlZpZXdNakhpbGwsIHRoaXMubWpIaWxsVmlldyk7XHJcblxyXG4gICAgICAgIC8vIOmqsOWtkOWKqOeUu+e7hOS7tiBcclxuICAgICAgICBsZXQgZGljZUFuaW1QcmVmYWIgPSBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmdldEJ1bmRsZVJlcyhFcm1qR2FtZUNvbnN0LkdpZCwgRXJtalBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwYW5lbC9zdWJWaWV3L2RpY2VBbmltXCIsIGNjLlByZWZhYik7XHJcbiAgICAgICAgbGV0IGRpY2VBbmltTm9kZSA9IDxjYy5Ob2RlPmNjLmluc3RhbnRpYXRlKGRpY2VBbmltUHJlZmFiKTtcclxuICAgICAgICBkaWNlQW5pbU5vZGUuc2V0UGFyZW50KHJvb3QpO1xyXG4gICAgICAgIGRpY2VBbmltTm9kZS5zZXRQb3NpdGlvbihjYy5WZWMyLlpFUk8pO1xyXG4gICAgICAgIHRoaXMuZGljZUFuaW1Db21wID0gZGljZUFuaW1Ob2RlLmdldENvbXBvbmVudChFcm1qRGljZUFuaW0pO1xyXG4gICAgICAgIHRoaXMuZGljZUFuaW1Db21wLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0VG9wVmlldygpIHtcclxuICAgICAgICBsZXQgcm9vdCA9IHRoaXMuZ2V0Q2hpbGQoXCJ0b3BOb2RlXCIpO1xyXG5cclxuICAgICAgICAvLyDliankvZnmj5DnpLpcclxuICAgICAgICBsZXQgbGVmdFRpcHNOb2RlID0gY2MuZmluZChcImxlZnRUaXBzVmlld1wiLCByb290KTtcclxuICAgICAgICB0aGlzLmxlZnRUaXBzVmlldyA9IG5ldyBFcm1qTGVmdFRpcHNWaWV3KGxlZnRUaXBzTm9kZSk7XHJcbiAgICAgICAgdGhpcy5sZWZ0VGlwc1ZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RWaWV3KHRoaXMuRGVmaW5lLlZpZXdMZWZ0VGlwcywgdGhpcy5sZWZ0VGlwc1ZpZXcpO1xyXG5cclxuICAgICAgICAvLyDmkJPpurvlsIblrZDliqjnlLvnu4Tku7YgXHJcbiAgICAgICAgbGV0IHJ1Yk1qQW5pbVByZWZhYiA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2V0QnVuZGxlUmVzKEVybWpHYW1lQ29uc3QuR2lkLCBFcm1qUGF0aEhlbHBlci5nYW1lUHJlZmFic1BhdGggKyBcInBhbmVsL3N1YlZpZXcvcnViTWpBbmltXCIsIGNjLlByZWZhYik7XHJcbiAgICAgICAgbGV0IHJ1Yk1qQW5pbU5vZGUgPSA8Y2MuTm9kZT5jYy5pbnN0YW50aWF0ZShydWJNakFuaW1QcmVmYWIpO1xyXG4gICAgICAgIHJ1Yk1qQW5pbU5vZGUuc2V0UGFyZW50KHJvb3QpO1xyXG4gICAgICAgIHJ1Yk1qQW5pbU5vZGUuc2V0UG9zaXRpb24oY2MuVmVjMi5aRVJPKTtcclxuICAgICAgICB0aGlzLnJ1Yk1qQW5pbUNvbXAgPSBydWJNakFuaW1Ob2RlLmdldENvbXBvbmVudChFcm1qUnViTWpBbmltKTtcclxuICAgICAgICB0aGlzLnJ1Yk1qQW5pbUNvbXAubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRGbG9hdFZpZXcoKSB7XHJcbiAgICAgICAgbGV0IHJvb3QgPSB0aGlzLmdldENoaWxkKFwiZmxvYXROb2RlXCIpO1xyXG5cclxuICAgICAgICAvLyDljLnphY3kuK1cclxuICAgICAgICBsZXQgbWF0Y2hQcmVmYWIgPSBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmdldEJ1bmRsZVJlcyhFcm1qR2FtZUNvbnN0LkdpZCwgRXJtalBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwYW5lbC9zdWJWaWV3L21hdGNoUGxheWVyVmlld1wiLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgIGxldCBtYXRjaE5vZGUgPSA8Y2MuTm9kZT5jYy5pbnN0YW50aWF0ZShtYXRjaFByZWZhYik7XHJcbiAgICAgICAgbWF0Y2hOb2RlLnNldFBhcmVudChyb290KTtcclxuICAgICAgICBtYXRjaE5vZGUuc2V0UG9zaXRpb24oY2MuVmVjMi5aRVJPKTtcclxuICAgICAgICB0aGlzLm1hdGNoUGxheWVyVmlldyA9IG5ldyBFcm1qTWF0Y2hQbGF5ZXJWaWV3KG1hdGNoTm9kZSk7XHJcbiAgICAgICAgdGhpcy5tYXRjaFBsYXllclZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RWaWV3KHRoaXMuRGVmaW5lLlZpZXdNYXRjaFBsYXllciwgdGhpcy5tYXRjaFBsYXllclZpZXcpO1xyXG5cclxuICAgICAgICAvLyDlvIDlp4vmuLjmiI9cclxuICAgICAgICBsZXQgc3RhcnRQcmVmYWIgPSBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmdldEJ1bmRsZVJlcyhFcm1qR2FtZUNvbnN0LkdpZCwgRXJtalBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwYW5lbC9zdWJWaWV3L2dhbWVTdGFydFZpZXdcIiwgY2MuUHJlZmFiKTtcclxuICAgICAgICBsZXQgc3RhcnROb2RlID0gPGNjLk5vZGU+Y2MuaW5zdGFudGlhdGUoc3RhcnRQcmVmYWIpO1xyXG4gICAgICAgIHN0YXJ0Tm9kZS5zZXRQYXJlbnQocm9vdCk7XHJcbiAgICAgICAgc3RhcnROb2RlLnNldFBvc2l0aW9uKGNjLlZlYzIuWkVSTyk7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhcnRWaWV3ID0gbmV3IEVybWpHYW1lU3RhcnRWaWV3KHN0YXJ0Tm9kZSk7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhcnRWaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVnaXN0Vmlldyh0aGlzLkRlZmluZS5WaWV3R2FtZVN0YXJ0LCB0aGlzLmdhbWVTdGFydFZpZXcpO1xyXG5cclxuICAgICAgICAvLyDog6HniYzpl6rnlLVcclxuICAgICAgICBsZXQgbGlnaHRuaW5nUHJlZmFiID0gR2xvYmFsLlJlc291cmNlTWFuYWdlci5nZXRCdW5kbGVSZXMoRXJtakdhbWVDb25zdC5HaWQsIEVybWpQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicGFuZWwvc3ViVmlldy93aW5MaWdodG5pbmdWaWV3XCIsIGNjLlByZWZhYik7XHJcbiAgICAgICAgbGV0IGxpZ2h0bmluZ05vZGUgPSA8Y2MuTm9kZT5jYy5pbnN0YW50aWF0ZShsaWdodG5pbmdQcmVmYWIpO1xyXG4gICAgICAgIGxpZ2h0bmluZ05vZGUuc2V0UGFyZW50KHJvb3QpO1xyXG4gICAgICAgIGxpZ2h0bmluZ05vZGUuc2V0UG9zaXRpb24oY2MuVmVjMi5aRVJPKTtcclxuICAgICAgICB0aGlzLmxpZ2h0bmluZ1ZpZXcgPSBuZXcgRXJtaldpbkxpZ2h0bmluZ1ZpZXcobGlnaHRuaW5nTm9kZSk7XHJcbiAgICAgICAgdGhpcy5saWdodG5pbmdWaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVnaXN0Vmlldyh0aGlzLkRlZmluZS5WaWV3TGlnaHRuaW5nLCB0aGlzLmxpZ2h0bmluZ1ZpZXcpO1xyXG5cclxuICAgICAgICAvLyDmtYHlsYBcclxuICAgICAgICBsZXQgZmxvd1ByZWZhYiA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2V0QnVuZGxlUmVzKEVybWpHYW1lQ29uc3QuR2lkLCBFcm1qUGF0aEhlbHBlci5nYW1lUHJlZmFic1BhdGggKyBcInBhbmVsL3N1YlZpZXcvZmxvd1ZpZXdcIiwgY2MuUHJlZmFiKTtcclxuICAgICAgICBsZXQgZmxvd05vZGUgPSA8Y2MuTm9kZT5jYy5pbnN0YW50aWF0ZShmbG93UHJlZmFiKTtcclxuICAgICAgICBmbG93Tm9kZS5zZXRQYXJlbnQocm9vdCk7XHJcbiAgICAgICAgZmxvd05vZGUuc2V0UG9zaXRpb24oY2MuVmVjMi5aRVJPKTtcclxuICAgICAgICB0aGlzLmZsb3dWaWV3ID0gbmV3IEVybWpGbG93VmlldyhmbG93Tm9kZSk7XHJcbiAgICAgICAgdGhpcy5mbG93Vmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlZ2lzdFZpZXcodGhpcy5EZWZpbmUuVmlld0Zsb3csIHRoaXMuZmxvd1ZpZXcpO1xyXG5cclxuICAgICAgICAvLyDnu5PnrpdcclxuICAgICAgICBsZXQgc2V0dGxlUHJlZmFiID0gR2xvYmFsLlJlc291cmNlTWFuYWdlci5nZXRCdW5kbGVSZXMoRXJtakdhbWVDb25zdC5HaWQsIEVybWpQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicGFuZWwvc3ViVmlldy9zZXR0bGVWaWV3XCIsIGNjLlByZWZhYik7XHJcbiAgICAgICAgbGV0IHNldHRsZU5vZGUgPSA8Y2MuTm9kZT5jYy5pbnN0YW50aWF0ZShzZXR0bGVQcmVmYWIpO1xyXG4gICAgICAgIHNldHRsZU5vZGUuc2V0UGFyZW50KHJvb3QpO1xyXG4gICAgICAgIHNldHRsZU5vZGUuc2V0UG9zaXRpb24oY2MuVmVjMi5aRVJPKTtcclxuICAgICAgICB0aGlzLnNldHRsZVZpZXcgPSBuZXcgRXJtalNldHRsZVZpZXcoc2V0dGxlTm9kZSk7XHJcbiAgICAgICAgdGhpcy5zZXR0bGVWaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVnaXN0Vmlldyh0aGlzLkRlZmluZS5WaWV3U2V0dGxlLCB0aGlzLnNldHRsZVZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdEhlYWRUaXBzTWFuYWdlcigpe1xyXG4gICAgICAgIHRoaXMuaGVhZFRpcHNNYW5hZ2VyID0gbmV3IEhlYWRUaXBzTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMuaGVhZFRpcHNNYW5hZ2VyLmluaXQoY2MuZmluZCgnZmxvYXROb2RlJywgdGhpcy5ub2RlKSwgY2MuZmluZCgnaW50ZXJhY3RWaWV3JywgdGhpcy5ub2RlKSwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFRhc2tNYW5hZ2VyKCl7XHJcbiAgICAgICAgdGhpcy50YXNrTWFuYWdlciA9IG5ldyBUYXNrTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMudGFza01hbmFnZXIuaW5pdChjYy5maW5kKCdyaWdodEF0dGFjaC90YXNrUm9vdCcsIHRoaXMubm9kZSksIEVybWpHYW1lQ29uc3QuR2lkLCAtMSk7XHJcbiAgICAgICAgdGhpcy50YXNrTWFuYWdlci5yZXFHZXRHYW1lVGFza0xpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZG9SZXNldE1qKCkge1xyXG4gICAgICAgIHRoaXMuc2VsZlBsYXlWaWV3LnJlc2V0U2VsZWN0TWooKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5pu05paw5bqV5YiG5pWw5YC8ICovXHJcbiAgICBwdWJsaWMgdXBkYXRlTGV2ZWxCYXNlKGJhc2U6IG51bWJlciwgbHY6IHN0cmluZykge1xyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEJ1bmRsZUF1dG9BdGxhcyhFcm1qR2FtZUNvbnN0LkdpZCwgdGhpcy5sZXZlbFNwLCBFcm1qUGF0aEhlbHBlci5nYW1lVGV4dHVyZVBhdGggKyBcImR5bmFtaWMvYXRsYXNfZHluYW1pY1wiLCBFcm1qR2FtZUNvbnN0LkxldmVsU3BDZmdbbHZdLCBudWxsLCB0cnVlKTtcclxuICAgICAgICB0aGlzLmJhc2VMYmwuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoYmFzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dNYXRjaCh0aW1lbzogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5tYXRjaFBsYXllclZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5wbGF5ZXJWaWV3TGlzdFswXTtcclxuICAgICAgICBwbGF5ZXIuc2hvdyhHbG9iYWwuUGxheWVyRGF0YSk7ICAgICAgICAgLy8gZGVidWcg5rKh5pyJYXJlYeaVsOaNrlxyXG5cclxuICAgICAgICBpZiAodGltZW8gJiYgdGltZW8gPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWF0Y2hQbGF5ZXJWaWV3LnNldFRpbWVSdW5Db25maWcodGltZW8sICgpID0+IHtcclxuICAgICAgICAgICAgICAgIEVybWpEcml2ZXIuaW5zdGFuY2UuQ29udGV4dC5pc1dhaXRNYXRjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRjaFBsYXllclZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1llc05vQm94KCfljLnphY3otoXml7bvvIzmmK/lkKbph43mlrDljLnphY3vvJ8nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5Db250cm9sLnRyeVNlbmRFbnRlcih7IFwiX2Zyb21cIjogXCJqdW1wXCIgfSk7ICAgIC8vIOaWrXNvY2tldOWImeS4jeiDveeUqOi/meS4qlxyXG4gICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWUuU2VydmVyLnNlbmQodGhpcy5EZWZpbmUuQ21kTGVhdmUsIHsgXCJJc0Nsb3NlXCI6IDEgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgRXJtakRyaXZlci5pbnN0YW5jZS5sZWF2ZUdhbWUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQmFua2VyKGJhbmtlclNlYXQ6IG51bWJlciwgZGljZTogbnVtYmVyW10sIGlzQW5pbTogYm9vbGVhbikge1xyXG4gICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLnBsYXllclZpZXdMaXN0W2JhbmtlclNlYXRdO1xyXG4gICAgICAgIGlmIChwbGF5ZXIpIHtcclxuICAgICAgICAgICAgcGxheWVyLnNob3dCYW5rZXIodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBbd2hvU3RhcnQsIGluZGV4SW5XYWxsXSA9IEVybWpSdWxlQ29uc3QuY2FsY3VsYXRlRGVhbEJlaWdpbihiYW5rZXJTZWF0LCBkaWNlKTtcclxuICAgICAgICB0aGlzLm1qSGlsbFZpZXcuYWN0aXZlID0gZmFsc2U7ICAgICAgICAgLy8g5pqC5YWz6Zet5LiN55So5LqGXHJcbiAgICAgICAgdGhpcy5takhpbGxWaWV3LmluaXRXYWxsRGVhbCh3aG9TdGFydCwgaW5kZXhJbldhbGwpO1xyXG5cclxuICAgICAgICB0aGlzLmxlZnRUaXBzVmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubGVmdFRpcHNWaWV3LnVwZGF0ZUxlZnRMYmwoRXJtakdhbWVDb25zdC5tYWhqb25nVG90YWwpO1xyXG4gICAgICAgIC8vIOmqsOWtkOWKqOeUu1xyXG4gICAgICAgIHRoaXMuZGljZUFuaW1Db21wLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmRpY2VBbmltQ29tcC5zaG93RGljZShkaWNlLCBpc0FuaW0pO1xyXG4gICAgICAgIGlmIChpc0FuaW0pIHtcclxuICAgICAgICAgICAgRXJtakdhbWVDb25zdC5wbGF5U291bmQoRXJtakF1ZGlvQ29uc3QuY29tbW9uQXVkaW8uRGljZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9BRERUSU1FTE9DSywgXCJFcm1qLm9uQmFua2VyXCIsIDIpOyAgIC8vIOaRh+mqsOWtkOWKqOeUu+aXtumXtFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPkeeJjOWKqOeUu1xyXG4gICAgICogQHBhcmFtIHVzZXJDYXJkc01hcCBba2V55pys5Zyw5bqn5L2NXS1bdmFsdWXmiYvniYzmlbDmja7lr7nosaFd55qEbWFwXHJcbiAgICAgKiBAcGFyYW0gYmFua2VyU2VhdCDluoTlrrbmnKzlnLDluqfkvY1cclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uRGVhbCh1c2VyQ2FyZHNNYXA6IGFueSwgYmFua2VyU2VhdDogbnVtYmVyLCBsZWZ0Q291bnQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghdXNlckNhcmRzTWFwIHx8IEdsb2JhbC5Ub29sa2l0LmlzRW1wdHlPYmplY3QodXNlckNhcmRzTWFwKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBkZWxheSA9IDA7XHJcbiAgICAgICAgbGV0IGRlYWxPcmRlciA9IEVybWpSdWxlQ29uc3QuZ2V0RGVhbE9yZGVyQXJyKGJhbmtlclNlYXQpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRXJtalJ1bGVDb25zdC5kZWFsQ29uZmlnLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhcnIgPSBFcm1qUnVsZUNvbnN0LmRlYWxDb25maWdbaV07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYXJyLmxlbmd0aDsgaisrKSB7ICAgICAgICAvLyBq5LiOZGVhbE9yZGVy55qEa2V55a+55bqUXHJcbiAgICAgICAgICAgICAgICBsZXQgbG9jYWxTZWF0ID0gZGVhbE9yZGVyW2pdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvdW50ID0gYXJyW2pdO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1qUGxheWVyID0gdGhpcy5talBsYXllclZpZXdMaXN0W2xvY2FsU2VhdF07XHJcbiAgICAgICAgICAgICAgICBpZiAobWpQbGF5ZXIgJiYgY291bnQgPiAwICYmIHVzZXJDYXJkc01hcFtsb2NhbFNlYXRdKSB7ICAgICAvLyDlpKfkuo4w5omN5Yqo55S7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNhcmRzID0gdXNlckNhcmRzTWFwW2xvY2FsU2VhdF0uY2FyZHMgfHwgW107XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRXJtakdhbWVDb25zdC5wbGF5U291bmQoRXJtakF1ZGlvQ29uc3QuY29tbW9uQXVkaW8uRGVhbENhcmQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1qSGlsbFZpZXcuZG9EZWFsKGNvdW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWpQbGF5ZXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWpQbGF5ZXIuc2V0SGFuZE1qU2hvdyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWpQbGF5ZXIuZGVhbEhhbmRNaihjb3VudCwgY2FyZHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9jYWxTZWF0ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1qUGxheWVyLnNldERhcmtIYW5kTWpPdXRTY3JlZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZlBsYXlWaWV3LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGZQbGF5Vmlldy5kZWFsSGFuZE1qKGNvdW50LCBjYXJkcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGVmdFRpcHNWaWV3LnJlZHVjZUxlZnRMYmwoY291bnQpOyAgICAgLy8g5Yqo5oCB5YePXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGF5ICs9IDAuMzU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEdhbWUuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdFRpcHNWaWV3LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdFRpcHNWaWV3LnVwZGF0ZUxlZnRMYmwobGVmdENvdW50KTtcclxuICAgICAgICAgICAgdGhpcy5zZWxmUGxheVZpZXcuc29ydENhcmREaXJlY3RseShmYWxzZSk7ICAgICAgLy8g5pW055CG5omL54mM5o6S5bqPXHJcbiAgICAgICAgfSwgZGVsYXkpO1xyXG5cclxuICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfQUREVElNRUxPQ0ssIFwiRXJtai5vbkRlYWxcIiwgZGVsYXkgKyAwLjUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkRlYWxEaXJlY3RseSh1c2VyQ2FyZHNNYXA6IGFueSwgbGVmdENvdW50OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIXVzZXJDYXJkc01hcCB8fCBHbG9iYWwuVG9vbGtpdC5pc0VtcHR5T2JqZWN0KHVzZXJDYXJkc01hcCkpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLm1qUGxheWVyVmlld0xpc3QuZm9yRWFjaCgobWpQbGF5ZXIsIGxvY2FsU2VhdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHVzZXJDYXJkc01hcFtsb2NhbFNlYXRdO1xyXG4gICAgICAgICAgICBtalBsYXllci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBtalBsYXllci5zZXRIYW5kTWpTaG93KHRydWUpO1xyXG4gICAgICAgICAgICBtalBsYXllci5kZWFsSGFuZE1qKGRhdGEuaGFuZF9jb3VudCwgW10pO1xyXG4gICAgICAgICAgICBpZiAobG9jYWxTZWF0ID09IDApIHtcclxuICAgICAgICAgICAgICAgIG1qUGxheWVyLnNldERhcmtIYW5kTWpPdXRTY3JlZW4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZlBsYXlWaWV3LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGZQbGF5Vmlldy5kZWFsSGFuZE1qKGRhdGEuaGFuZF9jb3VudCwgZGF0YS5jYXJkcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmxlZnRUaXBzVmlldy51cGRhdGVMZWZ0TGJsKGxlZnRDb3VudCk7XHJcbiAgICAgICAgdGhpcy5zZWxmUGxheVZpZXcuc29ydENhcmREaXJlY3RseShmYWxzZSk7ICAgICAgLy8g5pW055CG5omL54mM5o6S5bqPXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDooaXoirFcclxuICAgICAqIEBwYXJhbSBsb2NhbFNlYXQg6LCB6KGl6IqxXHJcbiAgICAgKiBAcGFyYW0gb3V0QXJyIOiKseeJjFxyXG4gICAgICogQHBhcmFtIG5ld0FyciDmjaLov5vmnaXnmoTniYxcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uQ2hhbmdlRmxvd2VyKGxvY2FsU2VhdDogbnVtYmVyLCBvdXRBcnI6IG51bWJlcltdLCBuZXdBcnI6IG51bWJlcltdLCBsZWZ0Q291bnQ6IG51bWJlcikge1xyXG4gICAgICAgIEVybWpHYW1lQ29uc3QucGxheVNvdW5kKEVybWpBdWRpb0NvbnN0LmdlbmRlclNvdW5kUGF0aChcImJ1aHVhXCIsIGxvY2FsU2VhdCA9PSAwID8gMCA6IDEpLCB0cnVlKTtcclxuICAgICAgICBsZXQgbWpQbGF5ZXIgPSB0aGlzLm1qUGxheWVyVmlld0xpc3RbbG9jYWxTZWF0XTtcclxuICAgICAgICBtalBsYXllci5jaGFuZ2VGbG93ZXIob3V0QXJyLCBuZXdBcnIgfHwgW10pO1xyXG4gICAgICAgIGlmIChsb2NhbFNlYXQgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGZQbGF5Vmlldy5jaGFuZ2VGbG93ZXIob3V0QXJyLCBuZXdBcnIgfHwgW10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfQUREVElNRUxPQ0ssIFwiRXJtai5vbkNoYW5nZUZsb3dlclwiLCAxKTsgICAgIC8vIOaXtumXtOimgeavlGNoYW5nZUZsb3dlcumHjOeahOWKqOeUu+aAu+aXtumVv+mVv+eCuVxyXG4gICAgICAgIHRoaXMubGVmdFRpcHNWaWV3LnVwZGF0ZUxlZnRMYmwobGVmdENvdW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaRuOeJjFxyXG4gICAgICogQHBhcmFtIGxvY2FsU2VhdCDosIHmkbjniYxcclxuICAgICAqIEBwYXJhbSBjYXJkcyDmkbjov5vmnaXnmoTniYwg5pyA5aSa5Y+q5pSv5oyB5LiA5byg54mMLCDlhbbku5bkurrmmK9bXVxyXG4gICAgICogQHBhcmFtIGlzSGVhRHJhdyDmmK/lkKbku47niYzloIblpLTmkbhcclxuICAgICAqIEBwYXJhbSBsZWZ0Q291bnQg5Ymp5L2Z54mMXHJcbiAgICAgKiBAcGFyYW0gaXNSdWIg5piv5ZCm5pCT54mMXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkRyYXdDYXJkKGxvY2FsU2VhdDogbnVtYmVyLCBjYXJkczogbnVtYmVyW10sIGlzSGVhRHJhdzogYm9vbGVhbiwgbGVmdENvdW50OiBudW1iZXIsIGlzUnViOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKGlzSGVhRHJhdykge1xyXG4gICAgICAgICAgICB0aGlzLm1qSGlsbFZpZXcuZG9EZWFsKDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5takhpbGxWaWV3LmRvUGF0Y2h3b3JrKDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxlZnRUaXBzVmlldy51cGRhdGVMZWZ0TGJsKGxlZnRDb3VudCk7XHJcbiAgICAgICAgdGhpcy5talBsYXllclZpZXdMaXN0W2xvY2FsU2VhdF0uZHJhd0hhbmRNaihjYXJkc1swXSk7XHJcblxyXG4gICAgICAgIGlmIChsb2NhbFNlYXQgPT0gMCkge1xyXG4gICAgICAgICAgICAvLyDmkJPniYzliqjnlLtcclxuICAgICAgICAgICAgaWYgKGlzUnViKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1Yk1qQW5pbUNvbXAubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ydWJNakFuaW1Db21wLmRvUnViQW5pbShjYXJkc1swXSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucnViTWpBbmltQ29tcC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZlBsYXlWaWV3LmRyYXdIYW5kTWooY2FyZHNbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIEVybWpHYW1lQ29uc3QucGxheVNvdW5kKEVybWpBdWRpb0NvbnN0LmNvbW1vbkF1ZGlvLkRyYXdDYXJkLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0sIDEuNSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfQUREVElNRUxPQ0ssIFwiRXJtai5vbkRyYXdDYXJkLmlzUnViXCIsIDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxmUGxheVZpZXcuZHJhd0hhbmRNaihjYXJkc1swXSk7XHJcbiAgICAgICAgICAgICAgICBFcm1qR2FtZUNvbnN0LnBsYXlTb3VuZChFcm1qQXVkaW9Db25zdC5jb21tb25BdWRpby5EcmF3Q2FyZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX0FERFRJTUVMT0NLLCBcIkVybWoub25EcmF3Q2FyZFwiLCAwLjMxKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5Ye654mMIOaZrumAmuWQrOaXtuWAmeS5n+S8mui1sOi/meWHuuS4gOW8oCAqL1xyXG4gICAgcHVibGljIG9uUGxheShsb2NhbFNlYXQ6IG51bWJlciwgdmFsdWU6IG51bWJlciwgaXNBdXRvOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBFcm1qR2FtZUNvbnN0LnBsYXlTb3VuZChFcm1qQXVkaW9Db25zdC5nZW5kZXJTb3VuZFBhdGgoRXJtak1qU3R5bGVIZWxwZXIubWpPdXRTb3VuZE1hcFt2YWx1ZV0sIGxvY2FsU2VhdCA9PSAwID8gMCA6IDEpLCB0cnVlKTtcclxuICAgICAgICB0aGlzLm1qUGxheWVyVmlld0xpc3RbbG9jYWxTZWF0XS5vdXRDYXJkKHZhbHVlKVxyXG4gICAgICAgIGlmIChsb2NhbFNlYXQgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGZQbGF5Vmlldy5vdXRDYXJkKHZhbHVlLCB0cnVlLCBpc0F1dG8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYW5pbVRpbWUgPSB0aGlzLkRlZmluZS5vdXRNalNob3dUaW1lICsgdGhpcy5EZWZpbmUub3V0TWpGbHlUaW1lO1xyXG4gICAgICAgIEdhbWUuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0xhc3RPdXRTaWduKHRydWUpO1xyXG4gICAgICAgIH0sIGFuaW1UaW1lICsgMC4xKTtcclxuICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfQUREVElNRUxPQ0ssIFwiRXJtai5vblBsYXlcIiwgYW5pbVRpbWUgKyAwLjE1KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DaG93KGxvY2FsU2VhdDogbnVtYmVyLCB2YWx1ZUFycjogbnVtYmVyW10sIGNob3dDYXJkOiBudW1iZXIsIHdob1NlYXQ6IG51bWJlcikge1xyXG4gICAgICAgIEVybWpHYW1lQ29uc3QucGxheVNvdW5kKEVybWpBdWRpb0NvbnN0LmdlbmRlclNvdW5kUGF0aChcImNoaVwiLCBsb2NhbFNlYXQgPT0gMCA/IDAgOiAxKSwgdHJ1ZSk7XHJcbiAgICAgICAgaWYgKGxvY2FsU2VhdCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBjaG93SW5kZXggPSB2YWx1ZUFyci5pbmRleE9mKGNob3dDYXJkKTtcclxuICAgICAgICAgICAgbGV0IHRlbXBBcnIgPSBbLi4udmFsdWVBcnJdO1xyXG4gICAgICAgICAgICB0ZW1wQXJyLnNwbGljZShjaG93SW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGZQbGF5Vmlldy5oaWRlT3BlckNhcmQodGVtcEFycik7XHJcbiAgICAgICAgICAgIHRoaXMubWpQbGF5ZXJWaWV3TGlzdFtsb2NhbFNlYXRdLmNob3dDYXJkKHZhbHVlQXJyLCBjaG93Q2FyZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1qUGxheWVyVmlld0xpc3RbbG9jYWxTZWF0XS5jaG93Q2FyZCh2YWx1ZUFyciwgY2hvd0NhcmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dMYXN0T3V0U2lnbihmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5talBsYXllclZpZXdMaXN0W3dob1NlYXRdLnJlZHVjZU9uZU91dE1qKCk7XHJcbiAgICAgICAgdGhpcy5vdXRNak1hbmFnZXIucmVjeWNsZUxhc3RPdXRNaigpO1xyXG4gICAgICAgIHRoaXMucGxheWVyVmlld0xpc3RbbG9jYWxTZWF0XS5zaG93U3RhdGVTcCh0cnVlLCBFcm1qR2FtZUNvbnN0LlN0YXRlU3BTdHJDZmcuQ2hvdyk7XHJcbiAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX0FERFRJTUVMT0NLLCBcIkVybWoub25DaG93XCIsIDAuOCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uUG9uZyhsb2NhbFNlYXQ6IG51bWJlciwgdmFsdWVBcnI6IG51bWJlcltdLCB3aG9TZWF0OiBudW1iZXIpIHtcclxuICAgICAgICBFcm1qR2FtZUNvbnN0LnBsYXlTb3VuZChFcm1qQXVkaW9Db25zdC5nZW5kZXJTb3VuZFBhdGgoXCJwZW5nXCIsIGxvY2FsU2VhdCA9PSAwID8gMCA6IDEpLCB0cnVlKTtcclxuICAgICAgICBpZiAobG9jYWxTZWF0ID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxmUGxheVZpZXcuaGlkZU9wZXJDYXJkKHZhbHVlQXJyLnNsaWNlKDAsIDIpKTsgICAgICAgLy8g5Y+W5Lik5Liq5raI5aSxXHJcbiAgICAgICAgICAgIHRoaXMubWpQbGF5ZXJWaWV3TGlzdFtsb2NhbFNlYXRdLnBvbmdDYXJkKHZhbHVlQXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubWpQbGF5ZXJWaWV3TGlzdFtsb2NhbFNlYXRdLnBvbmdDYXJkKHZhbHVlQXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93TGFzdE91dFNpZ24oZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubWpQbGF5ZXJWaWV3TGlzdFt3aG9TZWF0XS5yZWR1Y2VPbmVPdXRNaigpO1xyXG4gICAgICAgIHRoaXMub3V0TWpNYW5hZ2VyLnJlY3ljbGVMYXN0T3V0TWooKTtcclxuICAgICAgICB0aGlzLnBsYXllclZpZXdMaXN0W2xvY2FsU2VhdF0uc2hvd1N0YXRlU3AodHJ1ZSwgRXJtakdhbWVDb25zdC5TdGF0ZVNwU3RyQ2ZnLlBvbmcpO1xyXG4gICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9BRERUSU1FTE9DSywgXCJFcm1qLm9uUG9uZ1wiLCAwLjgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbktvbmcobG9jYWxTZWF0OiBudW1iZXIsIHZhbHVlQXJyOiBudW1iZXJbXSwgdHlwZTogbnVtYmVyLCB3aG9TZWF0OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodHlwZSA9PSA2KSB7XHJcbiAgICAgICAgICAgIEVybWpHYW1lQ29uc3QucGxheVNvdW5kKEVybWpBdWRpb0NvbnN0LmdlbmRlclNvdW5kUGF0aChcImFuZ2FuZ1wiLCBsb2NhbFNlYXQgPT0gMCA/IDAgOiAxKSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBFcm1qR2FtZUNvbnN0LnBsYXlTb3VuZChFcm1qQXVkaW9Db25zdC5nZW5kZXJTb3VuZFBhdGgoXCJnYW5nXCIsIGxvY2FsU2VhdCA9PSAwID8gMCA6IDEpLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxvY2FsU2VhdCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IHR5cGUgPT0gNiA/IDQgOiB0eXBlID09IDUgPyAxIDogMzsgICAgICAgICAgICAgIC8vIDbmmpfmnaA6IDQ7IDXnorDmnaA6IDE7IDTnm7TmnaA6IDNcclxuICAgICAgICAgICAgdGhpcy5zZWxmUGxheVZpZXcuaGlkZU9wZXJDYXJkKHZhbHVlQXJyLnNsaWNlKDAsIGNvdW50KSk7ICAgICAgIC8vIOagueaNruexu+S8vOWPllxyXG4gICAgICAgICAgICB0aGlzLm1qUGxheWVyVmlld0xpc3RbbG9jYWxTZWF0XS5rb25nQ2FyZCh0eXBlLCB2YWx1ZUFycik7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZlBsYXlWaWV3LnNob3dQbGF5VGlwcyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1qUGxheWVyVmlld0xpc3RbbG9jYWxTZWF0XS5rb25nQ2FyZCh0eXBlLCB2YWx1ZUFycik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09IDQpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93TGFzdE91dFNpZ24oZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLm1qUGxheWVyVmlld0xpc3Rbd2hvU2VhdF0ucmVkdWNlT25lT3V0TWooKTtcclxuICAgICAgICAgICAgdGhpcy5vdXRNak1hbmFnZXIucmVjeWNsZUxhc3RPdXRNaigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBsYXllclZpZXdMaXN0W2xvY2FsU2VhdF0uc2hvd1N0YXRlU3AodHJ1ZSwgRXJtakdhbWVDb25zdC5TdGF0ZVNwU3RyQ2ZnLktvbmcpO1xyXG4gICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9BRERUSU1FTE9DSywgXCJFcm1qLm9uS29uZ1wiLCAwLjgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbldpbihsb2NhbFNlYXQ6IG51bWJlciwgd2hvU2VhdDogbnVtYmVyLCBjYXJkOiBudW1iZXIsIHR5cGU6IG51bWJlciwgaXNBbmltOiBib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IHN0YXRlU3RyID0gdHlwZSA9PSAxID8gRXJtakdhbWVDb25zdC5TdGF0ZVNwU3RyQ2ZnLldpbkFsbCA6IHR5cGUgPT0gMyA/IEVybWpHYW1lQ29uc3QuU3RhdGVTcFN0ckNmZy5Sb2JXaW4gOiBFcm1qR2FtZUNvbnN0LlN0YXRlU3BTdHJDZmcuV2luO1xyXG4gICAgICAgIHRoaXMucGxheWVyVmlld0xpc3RbbG9jYWxTZWF0XS5zaG93U3RhdGVTcCh0cnVlLCBzdGF0ZVN0cik7XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZlBsYXlWaWV3LmRvV2luKCk7XHJcbiAgICAgICAgdGhpcy5talBsYXllclZpZXdMaXN0W2xvY2FsU2VhdF0uYWRkV2luTWpTaG93KGNhcmQpO1xyXG4gICAgICAgIEVybWpHYW1lQ29uc3QucGxheVNvdW5kKEVybWpBdWRpb0NvbnN0LmNvbW1vbkF1ZGlvLkh1LCB0cnVlKTtcclxuICAgICAgICBpZiAoaXNBbmltKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IDMpIHsgICAgIC8vIOaKouadoOiDoVxyXG4gICAgICAgICAgICAgICAgRXJtakdhbWVDb25zdC5wbGF5U291bmQoRXJtakF1ZGlvQ29uc3QuZ2VuZGVyU291bmRQYXRoKFwiaHVcIiwgbG9jYWxTZWF0ID09IDAgPyAwIDogMSksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5talBsYXllclZpZXdMaXN0W3dob1NlYXRdLnJvYmJlZEtvbmdMb3NlKGNhcmQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gMikgeyAgICAgLy8g54K554KuXHJcbiAgICAgICAgICAgICAgICBFcm1qR2FtZUNvbnN0LnBsYXlTb3VuZChFcm1qQXVkaW9Db25zdC5nZW5kZXJTb3VuZFBhdGgoXCJodVwiLCBsb2NhbFNlYXQgPT0gMCA/IDAgOiAxKSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dMYXN0T3V0U2lnbihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm91dE1qTWFuYWdlci5yZWN5Y2xlTGFzdE91dE1qKCk7ICAgICAgICAgICAvLyDpmpDol4/mnIDlkI7kuIDmrKHmiZPlh7rnmoTngrnngq7niYxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHsgICAgICAgICAgIC8vIOiHquaRuCBcclxuICAgICAgICAgICAgICAgIEVybWpHYW1lQ29uc3QucGxheVNvdW5kKEVybWpBdWRpb0NvbnN0LmdlbmRlclNvdW5kUGF0aChcInppbW9cIiwgbG9jYWxTZWF0ID09IDAgPyAwIDogMSksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5talBsYXllclZpZXdMaXN0W2xvY2FsU2VhdF0ud2luSGlkZUxhc3REcmF3KGNhcmQpOyAgICAgLy8g6YeN6L+e5pe26LWwcmV3YXJkXHJcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxTZWF0ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGZQbGF5Vmlldy53aW5IaWRlTGFzdERyYXcoY2FyZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5saWdodG5pbmdWaWV3LnNldExpZ2h0UG9pbnQodGhpcy5talBsYXllclZpZXdMaXN0W2xvY2FsU2VhdF0uZ2V0TGlnaHRuaW5nV29ybGRQb3MoKSk7XHJcbiAgICAgICAgICAgIHRoaXMubGlnaHRuaW5nVmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfQUREVElNRUxPQ0ssIFwiRXJtai5vbldpblwiLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOacgOWQjuS4gOasoeWHuueJjOWFieaghyAqL1xyXG4gICAgcHVibGljIHNob3dMYXN0T3V0U2lnbihmbGFnOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5sYXN0T3V0U2lnbi5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMubGFzdE91dFNpZ24uYWN0aXZlID0gZmxhZztcclxuICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICBsZXQgbGFzdE1qSXRlbSA9IHRoaXMub3V0TWpNYW5hZ2VyLmdldExhc3RPdXRNaigpO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RPdXRTaWduLnNldFBvc2l0aW9uKHRoaXMubGFzdE91dFNpZ24ucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKGxhc3RNakl0ZW0uZ2V0QXR0ZW50aW9uV29ybGRQb3MoKSkpO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RPdXRTaWduLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKFtcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjQsIGNjLnYyKDAsIDE1KSksXHJcbiAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoMC40LCBjYy52MigwLCAtMTUpKSxcclxuICAgICAgICAgICAgXSkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkb0hpbGxQYXRjaHdvcmsoY291bnQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubWpIaWxsVmlldy5kb1BhdGNod29yayhjb3VudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkb1RpbmdTd2l0Y2goaXNUaW5nOiBib29sZWFuLCB0aW5nRGF0YTogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZlBsYXlWaWV3LmFjdGl2ZSlcclxuICAgICAgICAgICAgdGhpcy5zZWxmUGxheVZpZXcub25UaW5nQ2hvb3NlU3dpdGNoKGlzVGluZywgdGluZ0RhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Vc2VySW5mb1Nob3coc2VhdDogbnVtYmVyLCB3b3JsZFBvczogY2MuVmVjMyl7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBFcm1qRHJpdmVyLmluc3RhbmNlLkNvbnRleHQucGxheWVyTGlzdFtzZWF0XTtcclxuICAgICAgICBpZiAoZGF0YSl7XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZFRpcHNNYW5hZ2VyLnNob3dIZWFkVmlldyh0cnVlLCBzZWF0LCB3b3JsZFBvcywgZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhclduZCgpIHtcclxuICAgICAgICAvL+WFs+mXreeVjOmdouWNleeLrOa4heeQhueOqeWutuS/oeaBr1xyXG4gICAgICAgIHRoaXMuY2xlYXJQbGF5ZXJzKCk7XHJcbiAgICAgICAgdGhpcy5jbGVhckJ5R2FtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhclBsYXllcnMoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBsYXllclZpZXdMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyVmlld0xpc3RbaV0uaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubWpQbGF5ZXJWaWV3TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLm1qUGxheWVyVmlld0xpc3RbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2VsZlBsYXlWaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mjqXlj6Plrp7njrAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcHVibGljIGNsZWFyQnlSb3VuZCgpIHtcclxuICAgICAgICB0aGlzLmRpY2VBbmltQ29tcC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucnViTWpBbmltQ29tcC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd0xhc3RPdXRTaWduKGZhbHNlKTtcclxuICAgICAgICB0aGlzLm91dE1qTWFuYWdlci5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMudmlld1NldC5jYWxsQWxsKFwiY2xlYXJCeVJvdW5kXCIpO1xyXG4gICAgICAgIHRoaXMuY2FsbEFsbFBsYXllcnMoXCJjbGVhckJ5Um91bmRcIik7XHJcbiAgICAgICAgdGhpcy5jYWxsQWxsTWpQbGF5ZXJzKFwiY2xlYXJCeVJvdW5kXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckJ5R2FtZSgpIHtcclxuICAgICAgICB0aGlzLm91dE1qTWFuYWdlci5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMudmlld1NldC5jYWxsQWxsKFwiY2xlYXJCeUdhbWVcIik7XHJcbiAgICAgICAgdGhpcy5jYWxsQWxsUGxheWVycyhcImNsZWFyQnlHYW1lXCIpO1xyXG4gICAgICAgIHRoaXMuY2FsbEFsbE1qUGxheWVycyhcImNsZWFyQnlHYW1lXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWdpc3RWaWV3KGtleTogc3RyaW5nLCB2aWV3OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnZpZXdTZXQucmVnaXN0VmlldyhrZXksIHZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRWaWV3PFQ+KGtleSk6IFQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZpZXdTZXQuZ2V0Vmlld0V4PFQ+KGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXBsYXllcuebuOWFsy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvL+iwg+eUqOWNleS4qnBsYXllcuaWueazlVxyXG4gICAgcHVibGljIGNhbGxQbGF5ZXIoaW5kZXg6IG51bWJlciwgZnVuYzogc3RyaW5nLCAuLi5hcmdzKSB7XHJcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuZ2V0UGxheWVyKGluZGV4KTtcclxuICAgICAgICBpZiAocGxheWVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5om+5LiN5YiwcGxheWVyISEhXCIsIGluZGV4KTtcclxuICAgICAgICAgICAgLy8gR2xvYmFsLlVJLmZhc3RUaXAoYOaJvuS4jeWIsHBsYXllciEhISBpbmRleDogJHtpbmRleH0sIGZ1bmM6ICR7ZnVuY31gKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGxheWVyW2Z1bmNdICYmIHBsYXllcltmdW5jXS5hcHBseSkge1xyXG4gICAgICAgICAgICBwbGF5ZXJbZnVuY10uYXBwbHkocGxheWVyLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGxBbGxQbGF5ZXJzKGZ1bmM6IHN0cmluZywgLi4uYXJncykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRXJtakdhbWVDb25zdC5tYXhQbGF5ZXJDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmdldFBsYXllcihpKTtcclxuICAgICAgICAgICAgaWYgKHBsYXllciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAocGxheWVyW2Z1bmNdICYmIHBsYXllcltmdW5jXS5hcHBseSkge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyW2Z1bmNdLmFwcGx5KHBsYXllciwgYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFBsYXllcihpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheWVyVmlld0xpc3RbaW5kZXhdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRNalBsYXllcihpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWpQbGF5ZXJWaWV3TGlzdFtpbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGxNalBsYXllcihpbmRleDogbnVtYmVyLCBmdW5jOiBzdHJpbmcsIC4uLmFyZ3MpIHtcclxuICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5nZXRNalBsYXllcihpbmRleCk7XHJcbiAgICAgICAgaWYgKHBsYXllciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuaJvuS4jeWIsHBsYXllciEhIVwiLCBpbmRleCk7XHJcbiAgICAgICAgICAgIC8vIEdsb2JhbC5VSS5mYXN0VGlwKGDmib7kuI3liLBwbGF5ZXIhISEgaW5kZXg6ICR7aW5kZXh9LCBmdW5jOiAke2Z1bmN9YCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBsYXllcltmdW5jXSAmJiBwbGF5ZXJbZnVuY10uYXBwbHkpIHtcclxuICAgICAgICAgICAgcGxheWVyW2Z1bmNdLmFwcGx5KHBsYXllciwgYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYWxsQWxsTWpQbGF5ZXJzKGZ1bmM6IHN0cmluZywgLi4uYXJncykge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRXJtakdhbWVDb25zdC5tYXhQbGF5ZXJDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLmdldE1qUGxheWVyKGkpO1xyXG4gICAgICAgICAgICBpZiAocGxheWVyID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXJbZnVuY10gJiYgcGxheWVyW2Z1bmNdLmFwcGx5KSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJbZnVuY10uYXBwbHkocGxheWVyLCBhcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==