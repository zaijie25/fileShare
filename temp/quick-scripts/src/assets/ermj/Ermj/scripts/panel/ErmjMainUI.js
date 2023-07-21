"use strict";
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