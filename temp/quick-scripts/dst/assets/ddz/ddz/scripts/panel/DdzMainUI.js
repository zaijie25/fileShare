
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/panel/DdzMainUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '26814vUPPJOILWPTiU78ZVe', 'DdzMainUI');
// ddz/ddz/scripts/panel/DdzMainUI.ts

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
var DdzPlayerView_1 = require("../subView/DdzPlayerView");
var DdzBaseComponent_1 = require("../component/DdzBaseComponent");
var DdzMenuView_1 = require("../subView/DdzMenuView");
var DdzPathHelper_1 = require("../data/DdzPathHelper");
var DdzMatchPlayerView_1 = require("../subView/DdzMatchPlayerView");
var DdzAskActionView_1 = require("../subView/DdzAskActionView");
var DdzSettleView_1 = require("../subView/DdzSettleView");
var DdzPokerPool_1 = require("../tool/DdzPokerPool");
var DdzLeftThreePokerView_1 = require("../subView/DdzLeftThreePokerView");
var DdzMarkerView_1 = require("../subView/DdzMarkerView");
var DdzSelfInfoView_1 = require("../subView/DdzSelfInfoView");
var DdzAskClockView_1 = require("../component/DdzAskClockView");
var DdzSelfPlayView_1 = require("../subView/DdzSelfPlayView");
var DdzGameEvent_1 = require("../data/DdzGameEvent");
var DdzRuleConst_1 = require("../data/DdzRuleConst");
var DdzGameConst_1 = require("../data/DdzGameConst");
var DdzDriver_1 = require("../DdzDriver");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DdzMainUI = /** @class */ (function (_super) {
    __extends(DdzMainUI, _super);
    function DdzMainUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playerViewList = [];
        _this.showPokerList = [];
        _this._isShowMarker = false;
        return _this;
    }
    DdzMainUI.prototype.onLoad = function () {
        this.viewSet = new ViewSet();
        this.initView();
    };
    DdzMainUI.prototype.onEnable = function () {
        this.selfInfoView.updateSelfInfo();
        Game.Event.on(DdzGameEvent_1.default.OnSelfPromptPokers, this, this.doPromptPokers);
        Global.Event.on(GlobalEvent.TYPE_VIP_ENTER_GAME, this, this.vipEnterGame);
    };
    DdzMainUI.prototype.onDisable = function () {
        Game.Event.off(DdzGameEvent_1.default.OnSelfPromptPokers, this, this.doPromptPokers);
        Global.Event.off(GlobalEvent.TYPE_VIP_ENTER_GAME, this, this.vipEnterGame);
    };
    DdzMainUI.prototype.onDestroy = function () {
        Game.Event.off(DdzGameEvent_1.default.OnSelfPromptPokers, this, this.doPromptPokers);
        Global.Event.off(GlobalEvent.TYPE_VIP_ENTER_GAME, this, this.vipEnterGame);
        this.taskManager.onDispose();
    };
    DdzMainUI.prototype.vipEnterGame = function (msg) {
        if (msg.data._gid == DdzGameConst_1.default.Gid && msg.data._glv === Game.Control.curLv) {
            Global.Event.event(GlobalEvent.VIPADMISSION, msg.data);
        }
    };
    DdzMainUI.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.animLayerNode = this.getChild('animLayer');
        this.dealRootNode = this.getChild('topNode/dealRoot');
        this.dzRootNode = this.getChild('centerNode/dzRoot');
        this.playNode = this.getChild('centerNode/player');
        this.pokerNode = this.getChild('centerNode/poker');
        this.actNode = this.getChild('centerNode/actRoot');
        this.baseLbl = this.getNodeComponent('topNode/showTable/baseNode/coinLbl', cc.Label);
        this.multLbl = this.getNodeComponent('topNode/showTable/multNode/multLbl', cc.Label);
        this.modeSp = this.getNodeComponent('bottomNode/modeSp', cc.Sprite);
        this.levelSp = this.getNodeComponent('bottomNode/levelSp', cc.Sprite);
        this.initPokerPool();
        this.selfInfoView = new DdzSelfInfoView_1.default(this.getChild('bottomNode/selfInfo'));
        this.selfInfoView.updateSelfInfo();
        this.initPlayerList();
        this.initMatchPlayerView();
        this.initAskActionView();
        this.initSettleView();
        this.initDzLeftPokersView();
        this.initMarkerView();
        this.initClockComp();
        this.initSelfPlayView();
        this.initAnim();
        this.initTaskManager();
        var paoMaDengBox = cc.find('topNode/paoMaDengBox', this.node);
        var pmdMsgBox = cc.find('topNode/paoMaDengBox/MsgBox', this.node);
        Global.UIHelper.addPaoMaDengComp(pmdMsgBox, false, paoMaDengBox);
        Global.UIHelper.addWifiComp(this.getChild('topNode/wifiNode'), 2);
        this.markerBtn = this.getChild('floatNode/markerBtn');
        DdzGameConst_1.default.addCommonClick(this.markerBtn, "", this.showMarkerViewClick, this);
        this.markerBtn.active = false;
        Global.UIHelper.addAdmissionComp(cc.find("topNode/admissionBox", this.node));
        var menuNode = this.getChild("menuNode");
        Global.Toolkit.adjustIphoneX([menuNode]);
        var menuView = new DdzMenuView_1.default(menuNode);
        menuView.active = true;
        this.registView(DdzDriver_1.default.instance.Define.ViewMenuContainer, menuView);
        Global.UIHelper.addWifiComp(cc.find('wifiNode', this.node), 2);
        DdzGameConst_1.default.addCommonClick(this.node, "testBtn", function () {
            Game.Event.event(Game.EVENT_CALL_RECONNECT);
        }, this);
    };
    DdzMainUI.prototype.initPlayerList = function () {
        var palyprefab = Global.ResourceManager.getGameBundleRes(DdzPathHelper_1.default.gamePrefabsPath + "panel/subView/playerView", cc.Prefab);
        var players = cc.instantiate(palyprefab);
        players.setParent(this.playNode);
        players.active = true;
        var pokerNodeprefab = Global.ResourceManager.getGameBundleRes(DdzPathHelper_1.default.gamePrefabsPath + "panel/subView/pokerView", cc.Prefab);
        var pokers = cc.instantiate(pokerNodeprefab);
        pokers.setParent(this.playNode);
        pokers.active = true;
        for (var i = 0; i < DdzDriver_1.default.instance.Define.MaxPlayerCount; i++) {
            var node = players.getChildByName("player" + i);
            var groupNode = pokers.getChildByName("group" + i);
            var roleNode = this.getChild("bgNode/role" + i);
            var player = new DdzPlayerView_1.default(node, i);
            player.setPlayerRole(roleNode);
            player.initPokerGroup(groupNode);
            player.hide();
            this.playerViewList.push(player);
        }
    };
    DdzMainUI.prototype.initMatchPlayerView = function () {
        var prefab = Global.ResourceManager.getGameBundleRes(DdzPathHelper_1.default.gamePrefabsPath + "panel/subView/matchPlayerView", cc.Prefab);
        var node = cc.instantiate(prefab);
        node.setParent(this.animLayerNode);
        node.setPosition(cc.Vec2.ZERO);
        this.matchPlayerView = new DdzMatchPlayerView_1.default(node);
        this.matchPlayerView.active = false;
        this.registView(DdzDriver_1.default.instance.Define.ViewMatchPlayer, this.matchPlayerView);
    };
    DdzMainUI.prototype.initAskActionView = function () {
        var prefab = Global.ResourceManager.getGameBundleRes(DdzPathHelper_1.default.gamePrefabsPath + "panel/subView/actRootView", cc.Prefab);
        var node = cc.instantiate(prefab);
        node.setParent(this.actNode);
        node.setPosition(cc.Vec2.ZERO);
        this.askActionView = new DdzAskActionView_1.default(node);
        this.askActionView.active = true;
        this.registView(DdzDriver_1.default.instance.Define.ViewAskAction, this.askActionView);
    };
    DdzMainUI.prototype.initSettleView = function () {
        var prefab = Global.ResourceManager.getGameBundleRes(DdzPathHelper_1.default.gamePrefabsPath + "panel/subView/settleView", cc.Prefab);
        var node = cc.instantiate(prefab);
        node.setParent(this.animLayerNode);
        node.setPosition(cc.Vec2.ZERO);
        this.gameSettleView = new DdzSettleView_1.default(node);
        this.gameSettleView.active = false;
        this.registView(DdzDriver_1.default.instance.Define.ViewSettle, this.gameSettleView);
    };
    DdzMainUI.prototype.initDzLeftPokersView = function () {
        this.dzLeftPokersView = new DdzLeftThreePokerView_1.default(this.getChild('topNode/showTable/dzPokersNode'));
        this.dzLeftPokersView.active = false;
        this.registView(DdzDriver_1.default.instance.Define.ViewDZLeftPokers, this.dzLeftPokersView);
    };
    DdzMainUI.prototype.initMarkerView = function () {
        this.markerView = new DdzMarkerView_1.default(this.getChild('floatNode/markerNode'));
        this.markerView.active = false;
        this.registView(DdzDriver_1.default.instance.Define.ViewMarker, this.markerView);
    };
    DdzMainUI.prototype.initClockComp = function () {
        this.clockComp = Global.UIHelper.safeGetComponent(this.node, 'centerNode/clockView', DdzAskClockView_1.default);
        this.clockComp.init();
        this.clockComp.setViewActive(false);
        this.clockComp.setSecondCall(function (leftTime) {
            if (leftTime <= 5 && leftTime > 0) {
                Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.HurryUp, true);
            }
        }, this);
    };
    DdzMainUI.prototype.initPokerPool = function () {
        this.showPokerPool = new DdzPokerPool_1.default(this.dealRootNode);
        DdzDriver_1.default.instance.PokerPool = this.showPokerPool;
    };
    DdzMainUI.prototype.initSelfPlayView = function () {
        this.selfPlayView = new DdzSelfPlayView_1.DdzSelfPlayView(this.getChild('centerNode/selfPlayView'));
        this.selfPlayView.active = true;
        this.registView(DdzDriver_1.default.instance.Define.ViewSelfPlay, this.selfPlayView);
    };
    DdzMainUI.prototype.initAnim = function () {
        this.animMaskNode = this.getChild('animLayer/mask');
        this.animMaskNode.active = false;
        this.springEffect = this.getNodeComponent('animLayer/springEffect', sp.Skeleton);
        this.springEffect.node.active = false;
        this.planeEffect = this.getNodeComponent('animLayer/planeEffect', sp.Skeleton);
        this.planeEffect.node.active = false;
        this.bombEffect = this.getNodeComponent('animLayer/bombEffect', sp.Skeleton);
        this.bombEffect.node.active = false;
        this.rocketEffect = this.getNodeComponent('animLayer/rocketEffect', sp.Skeleton);
        this.rocketEffect.node.active = false;
        this.linkPairEffect = this.getNodeComponent('animLayer/linkPairEffect', sp.Skeleton);
        this.linkPairEffect.node.active = false;
        this.straightEffect = this.getNodeComponent('animLayer/straightEffect', sp.Skeleton);
        this.straightEffect.node.active = false;
        // this.roleWinEffect = <sp.Skeleton>this.getNodeComponent('animLayer/roleWinEffect', sp.Skeleton);
        // this.roleWinEffect.node.active = false;
        // this.roleLoseEffect = <sp.Skeleton>this.getNodeComponent('animLayer/roleLoseEffect', sp.Skeleton);
        // this.roleLoseEffect.node.active = false;
    };
    DdzMainUI.prototype.initTaskManager = function () {
        this.taskManager = new TaskManager();
        this.taskManager.init(cc.find('taskRoot', this.node), DdzGameConst_1.default.Gid, -1);
        this.taskManager.reqGetGameTaskList();
    };
    DdzMainUI.prototype.showAnimMask = function (isShow) {
        this.animMaskNode.stopAllActions();
        this.animMaskNode.active = isShow;
        if (isShow) {
            this.animMaskNode.opacity = 1;
            this.animMaskNode.runAction(cc.fadeTo(0.25, 100));
        }
    };
    DdzMainUI.prototype.updateLevelBase = function (base) {
        this.baseLbl.string = Global.Toolkit.formatPointStr(base);
    };
    DdzMainUI.prototype.updateRoundMult = function (mult) {
        this.multLbl.string = String(mult);
    };
    DdzMainUI.prototype.updateLevel = function (level) {
        Global.ResourceManager.loadGameBundleAutoAtlas(this.levelSp, DdzPathHelper_1.default.gameTexturePath + "atlas/frame/atlas_frame", DdzGameConst_1.default.DeskLevelSfCfg[level], null, true);
        if (level == "l4" || level == "l5") {
            this.modeSp.node.active = false;
        }
    };
    DdzMainUI.prototype.updateMode = function (nMode) {
        Global.ResourceManager.loadGameBundleAutoAtlas(this.modeSp, DdzPathHelper_1.default.gameTexturePath + "atlas/frame/atlas_frame", DdzGameConst_1.default.ModeStrCfg[nMode]);
    };
    DdzMainUI.prototype.showActionTimer = function (isShow, seat, leftTime, totalTime) {
        if (seat === void 0) { seat = 0; }
        this.clockComp.setViewActive(isShow);
        if (isShow) {
            this.clockComp.startTimer(leftTime, totalTime);
            var pos = void 0;
            if (seat == 0) {
                pos = this.askActionView.getActionClockWorldPos();
            }
            else {
                pos = this.playerViewList[seat].getPlayerClockWorldPos();
            }
            this.clockComp.setClockPosition(pos);
        }
    };
    DdzMainUI.prototype.dealPokersAnim = function () {
        var _this = this;
        var cfg = DdzRuleConst_1.default.ModeConfig[DdzDriver_1.default.instance.Context.mode];
        this.showPokerList = this.showPokerPool.getItemArr(cfg.totalCount);
        for (var i = 0; i < this.showPokerList.length; i++) {
            var poker = this.showPokerList[i];
            if (i <= 2) // 处理牌显示太多导致周围阴影叠加成黑边的问题
                poker.active = true;
            else
                poker.active = false;
            poker.node.setParent(this.dealRootNode);
            poker.setPokerPosition(cc.Vec3.ZERO);
            poker.setPokerStyle(0);
            poker.isFront = false;
        }
        var count = this.showPokerList.length - 1;
        var posArr = this.selfPlayView.getIndexPosArr(cfg.baseCount, true);
        this.playerViewList.forEach(function (player, index) {
            Game.Component.scheduleOnce(function () {
                var _loop_1 = function (i) {
                    var poker = _this.showPokerList[count];
                    poker.active = true;
                    count--;
                    var toPos = void 0;
                    if (index == 0) {
                        toPos = _this.dealRootNode.convertToNodeSpaceAR(posArr[i]);
                        poker.setPokerScale(1);
                    }
                    else {
                        toPos = _this.dealRootNode.convertToNodeSpaceAR(player.pokerGroup.getPokerDealAnimPos());
                        poker.setPokerScale(0.34);
                    }
                    poker.doPokerMove(cc.Vec3.ZERO, toPos, DdzDriver_1.default.instance.Define.DealPokerMoveTime, DdzDriver_1.default.instance.Define.PerPokerDealInterval * i, function () {
                        poker.active = false;
                        _this.showPokerList.pop();
                        _this.showPokerPool.recycleItem(poker);
                        if (index == 0)
                            _this.selfPlayView.showDealPokerIndex(i, cfg.baseCount);
                        else
                            player.pokerGroup.setRestCountShow(true, i + 1);
                    }, i % 2 == 0);
                };
                for (var i = 0; i < cfg.baseCount; i++) {
                    _loop_1(i);
                }
            }, index * DdzDriver_1.default.instance.Define.PerPlayerDealInterval);
        });
        var totalTime = DdzDriver_1.default.instance.Define.PerPlayerDealInterval * 3;
        Game.Component.scheduleOnce(function () {
            _this.dzLeftPokersView.active = true;
            _this.dzLeftPokersView.addDZPokers(_this.showPokerList.splice(0, 3)); // round结束回收
            Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.LandlordPokers, true);
            _this.dzLeftPokersView.playShowAnimation(true, DdzDriver_1.default.instance.Define.DzLeftThreeShowTime);
            _this.setChooseEnbale(true); // 发完牌就可以选牌
        }, totalTime);
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "dealPokersAnim", totalTime + DdzDriver_1.default.instance.Define.DzLeftThreeShowTime);
    };
    DdzMainUI.prototype.dealPokerDirect = function (userCards) {
        var _this = this;
        userCards.forEach(function (user) {
            var localSeat = DdzDriver_1.default.instance.SitHelper.serverSToLocalN(user.chair);
            var player = _this.playerViewList[localSeat];
            var count = user.count;
            if (localSeat != 0)
                player.setPlayerLeftPokers(true, count);
            else {
                for (var i = 0; i < count; i++) {
                    _this.selfPlayView.showDealPokerIndex(i, count);
                }
            }
            if (count > 0 && count <= DdzDriver_1.default.instance.Define.WarnLeftPokerCount)
                _this.callPlayer(localSeat, 'showWarnSign', true);
        });
        this.selfPlayView.layoutHandPokers();
        this.dzLeftPokersView.active = true;
        this.dzLeftPokersView.addDZPokers(this.showPokerPool.getItemArr(3));
        this.dzLeftPokersView.playShowAnimation(false);
        this.setChooseEnbale(true);
    };
    DdzMainUI.prototype.showMarker = function (isShow) {
        this.markerBtn.active = isShow;
        this.isShowMarker = isShow;
    };
    Object.defineProperty(DdzMainUI.prototype, "isShowMarker", {
        set: function (flag) {
            if (this._isShowMarker == flag)
                return;
            this._isShowMarker = flag;
            this.markerView.active = flag;
            // this.dzLeftPokersView.active = !flag;        // 2020-03-23 18:35:10 注释掉 地主牌改成常驻
        },
        enumerable: false,
        configurable: true
    });
    DdzMainUI.prototype.showMarkerViewClick = function () {
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        this.isShowMarker = !this._isShowMarker;
    };
    DdzMainUI.prototype.setChooseEnbale = function (isEnable) {
        this.selfPlayView.readyForChoose(isEnable);
        if (isEnable) {
            this.selfPlayView.initChooseFunction();
        }
    };
    DdzMainUI.prototype.doPlayPokers = function (arr) {
        if (arr === void 0) { arr = []; }
        var map;
        if (arr && !Global.Toolkit.isEmptyObject(arr)) {
            map = this.selfPlayView.getPokerArrMap(arr);
        }
        else {
            map = DdzDriver_1.default.instance.Context.getSelectPokersMap();
            arr = DdzDriver_1.default.instance.Context.getSelectPokers();
        }
        if (map && !Global.Toolkit.isEmptyObject(map)) {
            this.selfPlayView.onPlayPokers(map);
            this.callPlayer(0, 'showPlayPokers', true, arr, true);
        }
    };
    DdzMainUI.prototype.showPokerTypeEffect = function (localSeat, type) {
        var totalTime = 0;
        if (DdzRuleConst_1.default.checkIsPlane(type)) {
            this.playPlaneAnim();
            totalTime += DdzDriver_1.default.instance.Define.PlaneAnimTime;
        }
        else if (DdzRuleConst_1.default.checkIsRocket(type)) {
            this.playRocketAnim();
            totalTime += DdzDriver_1.default.instance.Define.RocketAnimTime;
        }
        else if (DdzRuleConst_1.default.checkIsBomb(type)) {
            this.playBombAnim();
            totalTime += DdzDriver_1.default.instance.Define.BombAnimTime;
        }
        else if (DdzRuleConst_1.default.checkIsLinkPair(type)) {
            this.playLinkPairAnim(localSeat);
            totalTime += DdzDriver_1.default.instance.Define.LinkPairAnimTime;
        }
        else if (DdzRuleConst_1.default.checkIsStraight(type)) {
            this.playStraightAnim(localSeat);
            totalTime += DdzDriver_1.default.instance.Define.StraightAnimTime;
        }
        Game.Event.event(Game.EVENT_ADDTIMELOCK, 'showPokerTypeEffect', totalTime);
    };
    DdzMainUI.prototype.doPromptPokers = function (map) {
        if (map === void 0) { map = {}; }
        if (map && !Global.Toolkit.isEmptyObject(map)) {
            this.selfPlayView.onPromptPokers(map);
        }
    };
    DdzMainUI.prototype.doResetPokers = function () {
        this.selfPlayView.resetPokers();
    };
    DdzMainUI.prototype.playPlaneAnim = function () {
        var _this = this;
        var soundArr = DdzRuleConst_1.default.PlaneSoundArr;
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCardTypePath + soundArr[0], true);
        Game.Component.scheduleOnce(function () {
            _this.planeEffect.node.active = true;
            _this.planeEffect.setAnimation(0, 'idle', false);
        }, 0.2);
        Game.Component.scheduleOnce(function () {
            _this.planeEffect.node.active = false;
        }, DdzDriver_1.default.instance.Define.PlaneAnimTime);
    };
    DdzMainUI.prototype.playBombAnim = function () {
        var _this = this;
        var soundArr = DdzRuleConst_1.default.BombSoundArr;
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCardTypePath + soundArr[0], true);
        Game.Component.scheduleOnce(function () {
            _this.bombEffect.node.active = true;
            _this.bombEffect.setAnimation(0, 'idle', false);
        }, 0.1);
        Game.Component.scheduleOnce(function () {
            _this.bombEffect.node.active = false;
        }, DdzDriver_1.default.instance.Define.BombAnimTime);
        Game.Component.scheduleOnce(function () {
            var action = Global.UIHelper.getScreenShakeAction(0.5, 15, 5);
            _this.node.runAction(action);
        }, DdzDriver_1.default.instance.Define.BombAnimTime - 0.5);
    };
    DdzMainUI.prototype.playRocketAnim = function () {
        var _this = this;
        var soundArr = DdzRuleConst_1.default.RocketSoundArr;
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCardTypePath + soundArr[0], true);
        Game.Component.scheduleOnce(function () {
            _this.rocketEffect.node.active = true;
            _this.rocketEffect.setAnimation(0, 'idle', false);
        }, 0.2);
        Game.Component.scheduleOnce(function () {
            _this.rocketEffect.node.active = false;
        }, DdzDriver_1.default.instance.Define.RocketAnimTime);
        Game.Component.scheduleOnce(function () {
            var action = Global.UIHelper.getScreenShakeAction(0.8, 15, 5);
            _this.node.runAction(action);
        }, DdzDriver_1.default.instance.Define.RocketAnimTime - 0.8);
    };
    DdzMainUI.prototype.playLinkPairAnim = function (localSeat) {
        var _this = this;
        var soundArr = DdzRuleConst_1.default.LinkPairSoundArr;
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCardTypePath + soundArr[0], true);
        var worldPos = this.getPlayer(localSeat).pokerGroup.getPokerShowDesWorldPos();
        this.linkPairEffect.node.setPosition(this.linkPairEffect.node.parent.convertToNodeSpaceAR(worldPos));
        this.linkPairEffect.node.setScale(localSeat == 0 ? 1 : 0.8);
        this.linkPairEffect.node.active = true;
        //TODO 动效节点名
        this.linkPairEffect.setAnimation(0, 'idle', false);
        Game.Component.scheduleOnce(function () {
            _this.linkPairEffect.node.active = false;
        }, DdzDriver_1.default.instance.Define.LinkPairAnimTime);
    };
    DdzMainUI.prototype.playStraightAnim = function (localSeat) {
        var _this = this;
        var soundArr = DdzRuleConst_1.default.StraightSoundArr;
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCardTypePath + soundArr[0], true);
        var worldPos = this.getPlayer(localSeat).pokerGroup.getPokerShowDesWorldPos();
        this.straightEffect.node.setPosition(this.straightEffect.node.parent.convertToNodeSpaceAR(worldPos));
        this.straightEffect.node.setScale(localSeat == 0 ? 1 : 0.8);
        this.straightEffect.node.active = true;
        //TODO 动效节点名
        this.straightEffect.setAnimation(0, 'idle', false);
        Game.Component.scheduleOnce(function () {
            _this.straightEffect.node.active = false;
        }, DdzDriver_1.default.instance.Define.StraightAnimTime);
    };
    DdzMainUI.prototype.playSpringAnim = function (nState) {
        var _this = this;
        if (nState == 1) { // 春天
            Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.SpringAudio, true);
            Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.genderSoundPath(DdzPathHelper_1.DdzAudioConst.Spring, 0), true);
            Game.Component.scheduleOnce(function () {
                _this.springEffect.node.active = true;
                _this.springEffect.setAnimation(0, 'idle', false);
            }, 0.2);
            Game.Component.scheduleOnce(function () {
                _this.springEffect.node.active = false;
            }, DdzDriver_1.default.instance.Define.SpringAnimTime);
        }
        else if (nState == 2) { // 反春天   暂缺
            Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.SpringAudio, true);
            Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.genderSoundPath(DdzPathHelper_1.DdzAudioConst.Spring, 0), true);
            Game.Component.scheduleOnce(function () {
                _this.springEffect.node.active = true;
                _this.springEffect.setAnimation(0, 'idle', false);
            }, 0.2);
            Game.Component.scheduleOnce(function () {
                _this.springEffect.node.active = false;
            }, DdzDriver_1.default.instance.Define.SpringAnimTime);
        }
    };
    DdzMainUI.prototype.playAwardAnim = function (award, details) {
        var _this = this;
        if (award === void 0) { award = []; }
        var totalTime = 0;
        var dzSeat = DdzDriver_1.default.instance.Context.get(DdzDriver_1.default.instance.Define.FieldDzLocSeat);
        var isLandWin = details.land_win == 1;
        var isSelfWin = (isLandWin && dzSeat == 0) || (!isLandWin && dzSeat != 0);
        if (isSelfWin)
            Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.WinGame, true);
        else
            Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.LoseGame, true);
        // 播放角色胜利失败
        Game.Component.scheduleOnce(function () {
            _this.playRoleResultEffect(isSelfWin, isLandWin, dzSeat);
            // this.showAnimMask(true);
        }, 0);
        Game.Component.scheduleOnce(function () {
            // this.roleWinEffect.node.active = false;
            // this.roleLoseEffect.node.active = false;
            // this.showAnimMask(false);
        }, DdzDriver_1.default.instance.Define.PlayRoleWinTime + 0.1);
        totalTime += DdzDriver_1.default.instance.Define.PlayRoleWinTime;
        // 飘分
        Game.Component.scheduleOnce(function () {
            award.forEach(function (user) {
                var localSeat = DdzDriver_1.default.instance.SitHelper.serverSToLocalN(user.chair);
                _this.playerViewList[localSeat].showRewardLbl(user.award, user.award >= 0);
            });
        }, totalTime);
        totalTime += DdzDriver_1.default.instance.Define.FloatScoreTime;
        // 结算页面
        Game.Component.scheduleOnce(function () {
            _this.gameSettleView.active = true;
            _this.gameSettleView.playSettleAnim(isSelfWin, details);
        }, totalTime);
        totalTime += DdzDriver_1.default.instance.Define.ShowSettleTime;
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "ddzplayAwardAnim", totalTime);
    };
    DdzMainUI.prototype.playRoleResultEffect = function (isSelfWin, isLandWin, dzSeat) {
        // if (isSelfWin) {
        //     let animName = '';
        //     if (dzSeat == 0)
        //         animName = 'dizhushengli';
        //     else
        //         animName = 'nongminshengli';
        //     this.roleWinEffect.node.active = true;
        //     this.roleWinEffect.setAnimation(0, animName, false);
        //     this.roleLoseEffect.node.active = false;
        // }
        // else {
        //     let animName = '';
        //     if (dzSeat == 0)
        //         animName = 'dizhushibai';
        //     else
        //         animName = 'nongminshibai';
        //     this.roleLoseEffect.node.active = true;
        //     this.roleLoseEffect.setAnimation(0, animName, false);
        //     this.roleWinEffect.node.active = false;
        // }
        if (isLandWin)
            Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.LordWin, true);
        else
            Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.FarmerWin, true);
    };
    DdzMainUI.prototype.clearWnd = function () {
        //关闭界面单独清理玩家信息
        this.clearPlayers();
        this.clearByGame();
    };
    DdzMainUI.prototype.clearPlayers = function () {
        for (var i = 0; i < this.playerViewList.length; i++) {
            this.playerViewList[i].clearByRound();
            this.playerViewList[i].hide();
        }
    };
    DdzMainUI.prototype.clearOtherPlayers = function () {
        for (var i = 0; i < this.playerViewList.length; i++) {
            if (i == 0)
                continue;
            this.playerViewList[i].clearByRound();
            this.playerViewList[i].hide();
        }
    };
    //-----------------------------接口实现--------------------------------
    DdzMainUI.prototype.clearByGame = function () {
        this.updateRoundMult(0);
        this.showMarker(false);
        this.showPokerPool.recycleAll(this.showPokerList);
        this.showPokerList = [];
        this.clockComp.setViewActive(false);
        this.viewSet.callAll("clearByGame");
        this.callAllPlayers("clearByGame");
    };
    DdzMainUI.prototype.clearByRound = function () {
        this.updateRoundMult(0);
        this.showActionTimer(false);
        this.showMarker(false);
        this.springEffect.node.active = false;
        this.planeEffect.node.active = false;
        this.bombEffect.node.active = false;
        this.rocketEffect.node.active = false;
        this.linkPairEffect.node.active = false;
        this.straightEffect.node.active = false;
        // this.roleLoseEffect.node.active = false;
        // this.roleWinEffect.node.active = false;
        this.showActionTimer(false);
        this.showAnimMask(false);
        this.viewSet.callAll("clearByRound");
        this.callAllPlayers("clearByRound");
    };
    DdzMainUI.prototype.registView = function (key, view) {
        this.viewSet.registView(key, view);
    };
    DdzMainUI.prototype.getView = function (key) {
        return this.viewSet.getViewEx(key);
    };
    //--------------------------------------player相关--------------------------------------------
    //调用单个player方法
    DdzMainUI.prototype.callPlayer = function (index, func) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var player = this.playerViewList[index];
        if (player == null) {
            Logger.error("找不到player!!!", index);
            // Global.UI.fastTip(`找不到player!!! index: ${index}, func: ${func}`);
            return;
        }
        if (player[func] && player[func].apply) {
            player[func].apply(player, args);
        }
    };
    DdzMainUI.prototype.callAllPlayers = function (func) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < DdzDriver_1.default.instance.Define.MaxPlayerCount; i++) {
            var player = this.getPlayer(i);
            if (player == null)
                return;
            if (player[func] && player[func].apply) {
                player[func].apply(player, args);
            }
        }
    };
    DdzMainUI.prototype.getPlayer = function (index) {
        return this.playerViewList[index];
    };
    DdzMainUI = __decorate([
        ccclass
    ], DdzMainUI);
    return DdzMainUI;
}(DdzBaseComponent_1.default));
exports.default = DdzMainUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXHBhbmVsXFxEZHpNYWluVUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQXFEO0FBQ3JELGtFQUE2RDtBQUM3RCxzREFBaUQ7QUFDakQsdURBQXFFO0FBQ3JFLG9FQUErRDtBQUMvRCxnRUFBMkQ7QUFDM0QsMERBQXFEO0FBQ3JELHFEQUFnRDtBQUNoRCwwRUFBcUU7QUFFckUsMERBQXFEO0FBQ3JELDhEQUF5RDtBQUN6RCxnRUFBMkQ7QUFDM0QsOERBQTZEO0FBQzdELHFEQUFnRDtBQUNoRCxxREFBZ0Q7QUFDaEQscURBQWdEO0FBQ2hELDBDQUFxQztBQUcvQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QztJQUF1Qyw2QkFBZ0I7SUFBdkQ7UUFBQSxxRUE4cUJDO1FBNXFCVyxvQkFBYyxHQUFvQixFQUFFLENBQUM7UUFpQnJDLG1CQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUNuQyxtQkFBYSxHQUFHLEtBQUssQ0FBQzs7SUEwcEJsQyxDQUFDO0lBcm9CYSwwQkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVTLDRCQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxzQkFBWSxDQUFDLGtCQUFrQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLG1CQUFtQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxD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LEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDcEMsb0VBQW9FO1lBQ3BFLE9BQU87U0FDVjtRQUNELElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBRU0sa0NBQWMsR0FBckIsVUFBc0IsSUFBWTtRQUFFLGNBQU87YUFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1lBQVAsNkJBQU87O1FBQ3ZDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxtQkFBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQy9ELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxNQUFNLElBQUksSUFBSTtnQkFDZCxPQUFPO1lBQ1gsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRTtnQkFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDcEM7U0FDSjtJQUNMLENBQUM7SUFFTSw2QkFBUyxHQUFoQixVQUFpQixLQUFhO1FBQzFCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBN3FCZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQThxQjdCO0lBQUQsZ0JBQUM7Q0E5cUJELEFBOHFCQyxDQTlxQnNDLDBCQUFnQixHQThxQnREO2tCQTlxQm9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGR6UGxheWVyVmlldyBmcm9tIFwiLi4vc3ViVmlldy9EZHpQbGF5ZXJWaWV3XCI7XHJcbmltcG9ydCBEZHpCYXNlQ29tcG9uZW50IGZyb20gXCIuLi9jb21wb25lbnQvRGR6QmFzZUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgRGR6TWVudVZpZXcgZnJvbSBcIi4uL3N1YlZpZXcvRGR6TWVudVZpZXdcIjtcclxuaW1wb3J0IERkelBhdGhIZWxwZXIsIHsgRGR6QXVkaW9Db25zdCB9IGZyb20gXCIuLi9kYXRhL0RkelBhdGhIZWxwZXJcIjtcclxuaW1wb3J0IERkek1hdGNoUGxheWVyVmlldyBmcm9tIFwiLi4vc3ViVmlldy9EZHpNYXRjaFBsYXllclZpZXdcIjtcclxuaW1wb3J0IERkekFza0FjdGlvblZpZXcgZnJvbSBcIi4uL3N1YlZpZXcvRGR6QXNrQWN0aW9uVmlld1wiO1xyXG5pbXBvcnQgRGR6U2V0dGxlVmlldyBmcm9tIFwiLi4vc3ViVmlldy9EZHpTZXR0bGVWaWV3XCI7XHJcbmltcG9ydCBEZHpQb2tlclBvb2wgZnJvbSBcIi4uL3Rvb2wvRGR6UG9rZXJQb29sXCI7XHJcbmltcG9ydCBEZHpMZWZ0VGhyZWVQb2tlclZpZXcgZnJvbSBcIi4uL3N1YlZpZXcvRGR6TGVmdFRocmVlUG9rZXJWaWV3XCI7XHJcbmltcG9ydCBEZHpQb2tlclZpZXcgZnJvbSBcIi4uL3N1YlZpZXcvRGR6UG9rZXJWaWV3XCI7XHJcbmltcG9ydCBEZHpNYXJrZXJWaWV3IGZyb20gXCIuLi9zdWJWaWV3L0Rkek1hcmtlclZpZXdcIjtcclxuaW1wb3J0IERkelNlbGZJbmZvVmlldyBmcm9tIFwiLi4vc3ViVmlldy9EZHpTZWxmSW5mb1ZpZXdcIjtcclxuaW1wb3J0IERkekFza0Nsb2NrVmlldyBmcm9tIFwiLi4vY29tcG9uZW50L0RkekFza0Nsb2NrVmlld1wiO1xyXG5pbXBvcnQgeyBEZHpTZWxmUGxheVZpZXcgfSBmcm9tIFwiLi4vc3ViVmlldy9EZHpTZWxmUGxheVZpZXdcIjtcclxuaW1wb3J0IERkekdhbWVFdmVudCBmcm9tIFwiLi4vZGF0YS9EZHpHYW1lRXZlbnRcIjtcclxuaW1wb3J0IERkelJ1bGVDb25zdCBmcm9tIFwiLi4vZGF0YS9EZHpSdWxlQ29uc3RcIjtcclxuaW1wb3J0IERkekdhbWVDb25zdCBmcm9tIFwiLi4vZGF0YS9EZHpHYW1lQ29uc3RcIjtcclxuaW1wb3J0IERkekRyaXZlciBmcm9tIFwiLi4vRGR6RHJpdmVyXCI7XHJcbmltcG9ydCBEZHpDb250ZXh0IGZyb20gXCIuLi9kYXRhL0RkekNvbnRleHRcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERkek1haW5VSSBleHRlbmRzIERkekJhc2VDb21wb25lbnQge1xyXG4gICAgcHVibGljIHZpZXdTZXQ6IFZpZXdTZXQ7XHJcbiAgICBwcml2YXRlIHBsYXllclZpZXdMaXN0OiBEZHpQbGF5ZXJWaWV3W10gPSBbXTtcclxuICAgIHByaXZhdGUgYW5pbUxheWVyTm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgZGVhbFJvb3ROb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBkelJvb3ROb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBiYXNlTGJsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgbXVsdExibDogY2MuTGFiZWw7XHJcbiAgICAvLyBzdWJWaWV3XHJcbiAgICBwdWJsaWMgc2VsZkluZm9WaWV3OiBEZHpTZWxmSW5mb1ZpZXc7XHJcbiAgICBwdWJsaWMgbWF0Y2hQbGF5ZXJWaWV3OiBEZHpNYXRjaFBsYXllclZpZXc7XHJcbiAgICBwdWJsaWMgYXNrQWN0aW9uVmlldzogRGR6QXNrQWN0aW9uVmlldztcclxuICAgIHB1YmxpYyBnYW1lU2V0dGxlVmlldzogRGR6U2V0dGxlVmlldztcclxuICAgIHB1YmxpYyBkekxlZnRQb2tlcnNWaWV3OiBEZHpMZWZ0VGhyZWVQb2tlclZpZXc7XHJcbiAgICBwdWJsaWMgbWFya2VyVmlldzogRGR6TWFya2VyVmlldztcclxuICAgIHB1YmxpYyBjbG9ja0NvbXA6IERkekFza0Nsb2NrVmlldztcclxuICAgIHB1YmxpYyBzZWxmUGxheVZpZXc6IERkelNlbGZQbGF5VmlldztcclxuXHJcbiAgICBwcml2YXRlIHNob3dQb2tlclBvb2w6IERkelBva2VyUG9vbDtcclxuICAgIHByaXZhdGUgc2hvd1Bva2VyTGlzdDogRGR6UG9rZXJWaWV3W10gPSBbXTtcclxuICAgIHByaXZhdGUgX2lzU2hvd01hcmtlciA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBtYXJrZXJCdG46IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIG1vZGVTcDogY2MuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSBsZXZlbFNwOiBjYy5TcHJpdGU7XHJcblxyXG5cclxuICAgIHByaXZhdGUgcGxheU5vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIHBva2VyTm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgYWN0Tm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgYW5pbU1hc2tOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBzcHJpbmdFZmZlY3Q6IHNwLlNrZWxldG9uO1xyXG4gICAgcHJpdmF0ZSBwbGFuZUVmZmVjdDogc3AuU2tlbGV0b247XHJcbiAgICBwcml2YXRlIGJvbWJFZmZlY3Q6IHNwLlNrZWxldG9uO1xyXG4gICAgcHJpdmF0ZSByb2NrZXRFZmZlY3Q6IHNwLlNrZWxldG9uO1xyXG4gICAgcHJpdmF0ZSBsaW5rUGFpckVmZmVjdDogc3AuU2tlbGV0b247XHJcbiAgICBwcml2YXRlIHN0cmFpZ2h0RWZmZWN0OiBzcC5Ta2VsZXRvbjtcclxuICAgIC8vIHByaXZhdGUgcm9sZVdpbkVmZmVjdDogc3AuU2tlbGV0b247XHJcbiAgICAvLyBwcml2YXRlIHJvbGVMb3NlRWZmZWN0OiBzcC5Ta2VsZXRvbjtcclxuICAgIFxyXG4gICAgcHVibGljIHRhc2tNYW5hZ2VyOiBUYXNrTWFuYWdlcjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMudmlld1NldCA9IG5ldyBWaWV3U2V0KCk7XHJcbiAgICAgICAgdGhpcy5pbml0VmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLnNlbGZJbmZvVmlldy51cGRhdGVTZWxmSW5mbygpO1xyXG4gICAgICAgIEdhbWUuRXZlbnQub24oRGR6R2FtZUV2ZW50Lk9uU2VsZlByb21wdFBva2VycywgdGhpcywgdGhpcy5kb1Byb21wdFBva2Vycyk7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9uKEdsb2JhbEV2ZW50LlRZUEVfVklQX0VOVEVSX0dBTUUsIHRoaXMsIHRoaXMudmlwRW50ZXJHYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCkge1xyXG4gICAgICAgIEdhbWUuRXZlbnQub2ZmKERkekdhbWVFdmVudC5PblNlbGZQcm9tcHRQb2tlcnMsIHRoaXMsIHRoaXMuZG9Qcm9tcHRQb2tlcnMpO1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vZmYoR2xvYmFsRXZlbnQuVFlQRV9WSVBfRU5URVJfR0FNRSwgdGhpcywgdGhpcy52aXBFbnRlckdhbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgR2FtZS5FdmVudC5vZmYoRGR6R2FtZUV2ZW50Lk9uU2VsZlByb21wdFBva2VycywgdGhpcywgdGhpcy5kb1Byb21wdFBva2Vycyk7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihHbG9iYWxFdmVudC5UWVBFX1ZJUF9FTlRFUl9HQU1FLCB0aGlzLCB0aGlzLnZpcEVudGVyR2FtZSk7XHJcbiAgICAgICAgdGhpcy50YXNrTWFuYWdlci5vbkRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZpcEVudGVyR2FtZShtc2cpIHtcclxuICAgICAgICBpZiAobXNnLmRhdGEuX2dpZCA9PSBEZHpHYW1lQ29uc3QuR2lkICYmIG1zZy5kYXRhLl9nbHYgPT09IEdhbWUuQ29udHJvbC5jdXJMdil7XHJcbiAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5WSVBBRE1JU1NJT04sIG1zZy5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLm5vZGUud2lkdGggPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS53aWR0aDtcclxuICAgICAgICB0aGlzLm5vZGUuaGVpZ2h0ID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYW5pbUxheWVyTm9kZSA9IHRoaXMuZ2V0Q2hpbGQoJ2FuaW1MYXllcicpO1xyXG4gICAgICAgIHRoaXMuZGVhbFJvb3ROb2RlID0gdGhpcy5nZXRDaGlsZCgndG9wTm9kZS9kZWFsUm9vdCcpO1xyXG4gICAgICAgIHRoaXMuZHpSb290Tm9kZSA9IHRoaXMuZ2V0Q2hpbGQoJ2NlbnRlck5vZGUvZHpSb290Jyk7XHJcbiAgICAgICAgdGhpcy5wbGF5Tm9kZSA9IHRoaXMuZ2V0Q2hpbGQoJ2NlbnRlck5vZGUvcGxheWVyJyk7XHJcbiAgICAgICAgdGhpcy5wb2tlck5vZGUgPSB0aGlzLmdldENoaWxkKCdjZW50ZXJOb2RlL3Bva2VyJyk7XHJcbiAgICAgICAgdGhpcy5hY3ROb2RlID0gdGhpcy5nZXRDaGlsZCgnY2VudGVyTm9kZS9hY3RSb290Jyk7XHJcbiAgICAgICAgdGhpcy5iYXNlTGJsID0gPGNjLkxhYmVsPnRoaXMuZ2V0Tm9kZUNvbXBvbmVudCgndG9wTm9kZS9zaG93VGFibGUvYmFzZU5vZGUvY29pbkxibCcsIGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLm11bHRMYmwgPSA8Y2MuTGFiZWw+dGhpcy5nZXROb2RlQ29tcG9uZW50KCd0b3BOb2RlL3Nob3dUYWJsZS9tdWx0Tm9kZS9tdWx0TGJsJywgY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMubW9kZVNwID0gPGNjLlNwcml0ZT50aGlzLmdldE5vZGVDb21wb25lbnQoJ2JvdHRvbU5vZGUvbW9kZVNwJywgY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLmxldmVsU3AgPSA8Y2MuU3ByaXRlPnRoaXMuZ2V0Tm9kZUNvbXBvbmVudCgnYm90dG9tTm9kZS9sZXZlbFNwJywgY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLmluaXRQb2tlclBvb2woKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWxmSW5mb1ZpZXcgPSBuZXcgRGR6U2VsZkluZm9WaWV3KHRoaXMuZ2V0Q2hpbGQoJ2JvdHRvbU5vZGUvc2VsZkluZm8nKSk7XHJcbiAgICAgICAgdGhpcy5zZWxmSW5mb1ZpZXcudXBkYXRlU2VsZkluZm8oKTtcclxuICAgICAgICB0aGlzLmluaXRQbGF5ZXJMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5pbml0TWF0Y2hQbGF5ZXJWaWV3KCk7XHJcbiAgICAgICAgdGhpcy5pbml0QXNrQWN0aW9uVmlldygpO1xyXG4gICAgICAgIHRoaXMuaW5pdFNldHRsZVZpZXcoKTtcclxuICAgICAgICB0aGlzLmluaXREekxlZnRQb2tlcnNWaWV3KCk7XHJcbiAgICAgICAgdGhpcy5pbml0TWFya2VyVmlldygpO1xyXG4gICAgICAgIHRoaXMuaW5pdENsb2NrQ29tcCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdFNlbGZQbGF5VmlldygpO1xyXG4gICAgICAgIHRoaXMuaW5pdEFuaW0oKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0VGFza01hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IHBhb01hRGVuZ0JveCA9IGNjLmZpbmQoJ3RvcE5vZGUvcGFvTWFEZW5nQm94JywgdGhpcy5ub2RlKTtcclxuICAgICAgICBsZXQgcG1kTXNnQm94ID0gY2MuZmluZCgndG9wTm9kZS9wYW9NYURlbmdCb3gvTXNnQm94JywgdGhpcy5ub2RlKTtcclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkUGFvTWFEZW5nQ29tcChwbWRNc2dCb3gsIGZhbHNlLCBwYW9NYURlbmdCb3gpO1xyXG4gICAgICAgIEdsb2JhbC5VSUhlbHBlci5hZGRXaWZpQ29tcCh0aGlzLmdldENoaWxkKCd0b3BOb2RlL3dpZmlOb2RlJyksIDIpXHJcbiAgICAgICAgdGhpcy5tYXJrZXJCdG4gPSB0aGlzLmdldENoaWxkKCdmbG9hdE5vZGUvbWFya2VyQnRuJyk7XHJcbiAgICAgICAgRGR6R2FtZUNvbnN0LmFkZENvbW1vbkNsaWNrKHRoaXMubWFya2VyQnRuLCBcIlwiLCB0aGlzLnNob3dNYXJrZXJWaWV3Q2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubWFya2VyQnRuLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkQWRtaXNzaW9uQ29tcChjYy5maW5kKFwidG9wTm9kZS9hZG1pc3Npb25Cb3hcIiwgdGhpcy5ub2RlKSk7XHJcblxyXG4gICAgICAgIGxldCBtZW51Tm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJtZW51Tm9kZVwiKTtcclxuICAgICAgICBHbG9iYWwuVG9vbGtpdC5hZGp1c3RJcGhvbmVYKFttZW51Tm9kZV0pO1xyXG4gICAgICAgIGxldCBtZW51VmlldyA9IG5ldyBEZHpNZW51VmlldyhtZW51Tm9kZSk7XHJcbiAgICAgICAgbWVudVZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlZ2lzdFZpZXcoRGR6RHJpdmVyLmluc3RhbmNlLkRlZmluZS5WaWV3TWVudUNvbnRhaW5lciwgbWVudVZpZXcpO1xyXG4gICAgICAgIEdsb2JhbC5VSUhlbHBlci5hZGRXaWZpQ29tcChjYy5maW5kKCd3aWZpTm9kZScsdGhpcy5ub2RlKSwgMilcclxuXHJcbiAgICAgICAgRGR6R2FtZUNvbnN0LmFkZENvbW1vbkNsaWNrKHRoaXMubm9kZSwgXCJ0ZXN0QnRuXCIsICgpPT57XHJcbiAgICAgICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9DQUxMX1JFQ09OTkVDVCk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0UGxheWVyTGlzdCgpIHtcclxuICAgICAgICBsZXQgcGFseXByZWZhYiA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2V0R2FtZUJ1bmRsZVJlcyhEZHpQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicGFuZWwvc3ViVmlldy9wbGF5ZXJWaWV3XCIsIGNjLlByZWZhYik7XHJcbiAgICAgICAgbGV0IHBsYXllcnMgPSBjYy5pbnN0YW50aWF0ZShwYWx5cHJlZmFiKTtcclxuICAgICAgICBwbGF5ZXJzLnNldFBhcmVudCh0aGlzLnBsYXlOb2RlKTtcclxuICAgICAgICBwbGF5ZXJzLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGxldCBwb2tlck5vZGVwcmVmYWIgPSBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmdldEdhbWVCdW5kbGVSZXMoRGR6UGF0aEhlbHBlci5nYW1lUHJlZmFic1BhdGggKyBcInBhbmVsL3N1YlZpZXcvcG9rZXJWaWV3XCIsIGNjLlByZWZhYik7XHJcbiAgICAgICAgbGV0IHBva2VycyA9IGNjLmluc3RhbnRpYXRlKHBva2VyTm9kZXByZWZhYik7XHJcbiAgICAgICAgcG9rZXJzLnNldFBhcmVudCh0aGlzLnBsYXlOb2RlKTtcclxuICAgICAgICBwb2tlcnMuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBEZHpEcml2ZXIuaW5zdGFuY2UuRGVmaW5lLk1heFBsYXllckNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBwbGF5ZXJzLmdldENoaWxkQnlOYW1lKGBwbGF5ZXIke2l9YClcclxuICAgICAgICAgICAgbGV0IGdyb3VwTm9kZSA9ICBwb2tlcnMuZ2V0Q2hpbGRCeU5hbWUoYGdyb3VwJHtpfWApXHJcbiAgICAgICAgICAgIGxldCByb2xlTm9kZSA9IHRoaXMuZ2V0Q2hpbGQoYGJnTm9kZS9yb2xlJHtpfWApO1xyXG4gICAgICAgICAgICBsZXQgcGxheWVyID0gbmV3IERkelBsYXllclZpZXcobm9kZSwgaSk7XHJcbiAgICAgICAgICAgIHBsYXllci5zZXRQbGF5ZXJSb2xlKHJvbGVOb2RlKTtcclxuICAgICAgICAgICAgcGxheWVyLmluaXRQb2tlckdyb3VwKGdyb3VwTm9kZSk7XHJcbiAgICAgICAgICAgIHBsYXllci5oaWRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyVmlld0xpc3QucHVzaChwbGF5ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRNYXRjaFBsYXllclZpZXcoKSB7XHJcbiAgICAgICAgbGV0IHByZWZhYiA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2V0R2FtZUJ1bmRsZVJlcyhEZHpQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicGFuZWwvc3ViVmlldy9tYXRjaFBsYXllclZpZXdcIiwgY2MuUHJlZmFiKTtcclxuICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgbm9kZS5zZXRQYXJlbnQodGhpcy5hbmltTGF5ZXJOb2RlKTtcclxuICAgICAgICBub2RlLnNldFBvc2l0aW9uKGNjLlZlYzIuWkVSTyk7XHJcbiAgICAgICAgdGhpcy5tYXRjaFBsYXllclZpZXcgPSBuZXcgRGR6TWF0Y2hQbGF5ZXJWaWV3KG5vZGUpO1xyXG4gICAgICAgIHRoaXMubWF0Y2hQbGF5ZXJWaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVnaXN0VmlldyhEZHpEcml2ZXIuaW5zdGFuY2UuRGVmaW5lLlZpZXdNYXRjaFBsYXllciwgdGhpcy5tYXRjaFBsYXllclZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdEFza0FjdGlvblZpZXcoKSB7XHJcbiAgICAgICAgbGV0IHByZWZhYiA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2V0R2FtZUJ1bmRsZVJlcyhEZHpQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicGFuZWwvc3ViVmlldy9hY3RSb290Vmlld1wiLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICBub2RlLnNldFBhcmVudCh0aGlzLmFjdE5vZGUpO1xyXG4gICAgICAgIG5vZGUuc2V0UG9zaXRpb24oY2MuVmVjMi5aRVJPKTtcclxuICAgICAgICB0aGlzLmFza0FjdGlvblZpZXcgPSBuZXcgRGR6QXNrQWN0aW9uVmlldyhub2RlKTtcclxuICAgICAgICB0aGlzLmFza0FjdGlvblZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlZ2lzdFZpZXcoRGR6RHJpdmVyLmluc3RhbmNlLkRlZmluZS5WaWV3QXNrQWN0aW9uLCB0aGlzLmFza0FjdGlvblZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFNldHRsZVZpZXcoKSB7XHJcbiAgICAgICAgbGV0IHByZWZhYiA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2V0R2FtZUJ1bmRsZVJlcyhEZHpQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicGFuZWwvc3ViVmlldy9zZXR0bGVWaWV3XCIsIGNjLlByZWZhYik7XHJcbiAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgIG5vZGUuc2V0UGFyZW50KHRoaXMuYW5pbUxheWVyTm9kZSk7XHJcbiAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihjYy5WZWMyLlpFUk8pO1xyXG4gICAgICAgIHRoaXMuZ2FtZVNldHRsZVZpZXcgPSBuZXcgRGR6U2V0dGxlVmlldyhub2RlKTtcclxuICAgICAgICB0aGlzLmdhbWVTZXR0bGVWaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVnaXN0VmlldyhEZHpEcml2ZXIuaW5zdGFuY2UuRGVmaW5lLlZpZXdTZXR0bGUsIHRoaXMuZ2FtZVNldHRsZVZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdER6TGVmdFBva2Vyc1ZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5kekxlZnRQb2tlcnNWaWV3ID0gbmV3IERkekxlZnRUaHJlZVBva2VyVmlldyh0aGlzLmdldENoaWxkKCd0b3BOb2RlL3Nob3dUYWJsZS9kelBva2Vyc05vZGUnKSk7XHJcbiAgICAgICAgdGhpcy5kekxlZnRQb2tlcnNWaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVnaXN0VmlldyhEZHpEcml2ZXIuaW5zdGFuY2UuRGVmaW5lLlZpZXdEWkxlZnRQb2tlcnMsIHRoaXMuZHpMZWZ0UG9rZXJzVmlldyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0TWFya2VyVmlldygpIHtcclxuICAgICAgICB0aGlzLm1hcmtlclZpZXcgPSBuZXcgRGR6TWFya2VyVmlldyh0aGlzLmdldENoaWxkKCdmbG9hdE5vZGUvbWFya2VyTm9kZScpKTtcclxuICAgICAgICB0aGlzLm1hcmtlclZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RWaWV3KERkekRyaXZlci5pbnN0YW5jZS5EZWZpbmUuVmlld01hcmtlciwgdGhpcy5tYXJrZXJWaWV3KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRDbG9ja0NvbXAoKSB7XHJcbiAgICAgICAgdGhpcy5jbG9ja0NvbXAgPSA8RGR6QXNrQ2xvY2tWaWV3Pkdsb2JhbC5VSUhlbHBlci5zYWZlR2V0Q29tcG9uZW50KHRoaXMubm9kZSwgJ2NlbnRlck5vZGUvY2xvY2tWaWV3JywgRGR6QXNrQ2xvY2tWaWV3KTtcclxuICAgICAgICB0aGlzLmNsb2NrQ29tcC5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5jbG9ja0NvbXAuc2V0Vmlld0FjdGl2ZShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5jbG9ja0NvbXAuc2V0U2Vjb25kQ2FsbCgobGVmdFRpbWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGxlZnRUaW1lIDw9IDUgJiYgbGVmdFRpbWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUdhbWVCdW5kbGVTb3VuZChEZHpBdWRpb0NvbnN0LmF1ZGlvQ29tbW9uUGF0aCArIERkekF1ZGlvQ29uc3QuSHVycnlVcCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRQb2tlclBvb2woKSB7XHJcbiAgICAgICAgdGhpcy5zaG93UG9rZXJQb29sID0gbmV3IERkelBva2VyUG9vbCh0aGlzLmRlYWxSb290Tm9kZSk7XHJcbiAgICAgICAgRGR6RHJpdmVyLmluc3RhbmNlLlBva2VyUG9vbCA9IHRoaXMuc2hvd1Bva2VyUG9vbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRTZWxmUGxheVZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5zZWxmUGxheVZpZXcgPSBuZXcgRGR6U2VsZlBsYXlWaWV3KHRoaXMuZ2V0Q2hpbGQoJ2NlbnRlck5vZGUvc2VsZlBsYXlWaWV3JykpO1xyXG4gICAgICAgIHRoaXMuc2VsZlBsYXlWaWV3LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RWaWV3KERkekRyaXZlci5pbnN0YW5jZS5EZWZpbmUuVmlld1NlbGZQbGF5LCB0aGlzLnNlbGZQbGF5Vmlldyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0QW5pbSgpIHtcclxuICAgICAgICB0aGlzLmFuaW1NYXNrTm9kZSA9IHRoaXMuZ2V0Q2hpbGQoJ2FuaW1MYXllci9tYXNrJyk7XHJcbiAgICAgICAgdGhpcy5hbmltTWFza05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zcHJpbmdFZmZlY3QgPSA8c3AuU2tlbGV0b24+dGhpcy5nZXROb2RlQ29tcG9uZW50KCdhbmltTGF5ZXIvc3ByaW5nRWZmZWN0Jywgc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMuc3ByaW5nRWZmZWN0Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wbGFuZUVmZmVjdCA9IDxzcC5Ta2VsZXRvbj50aGlzLmdldE5vZGVDb21wb25lbnQoJ2FuaW1MYXllci9wbGFuZUVmZmVjdCcsIHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLnBsYW5lRWZmZWN0Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ib21iRWZmZWN0ID0gPHNwLlNrZWxldG9uPnRoaXMuZ2V0Tm9kZUNvbXBvbmVudCgnYW5pbUxheWVyL2JvbWJFZmZlY3QnLCBzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgdGhpcy5ib21iRWZmZWN0Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yb2NrZXRFZmZlY3QgPSA8c3AuU2tlbGV0b24+dGhpcy5nZXROb2RlQ29tcG9uZW50KCdhbmltTGF5ZXIvcm9ja2V0RWZmZWN0Jywgc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMucm9ja2V0RWZmZWN0Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5saW5rUGFpckVmZmVjdCA9IDxzcC5Ta2VsZXRvbj50aGlzLmdldE5vZGVDb21wb25lbnQoJ2FuaW1MYXllci9saW5rUGFpckVmZmVjdCcsIHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLmxpbmtQYWlyRWZmZWN0Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdHJhaWdodEVmZmVjdCA9IDxzcC5Ta2VsZXRvbj50aGlzLmdldE5vZGVDb21wb25lbnQoJ2FuaW1MYXllci9zdHJhaWdodEVmZmVjdCcsIHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLnN0cmFpZ2h0RWZmZWN0Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5yb2xlV2luRWZmZWN0ID0gPHNwLlNrZWxldG9uPnRoaXMuZ2V0Tm9kZUNvbXBvbmVudCgnYW5pbUxheWVyL3JvbGVXaW5FZmZlY3QnLCBzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgLy8gdGhpcy5yb2xlV2luRWZmZWN0Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5yb2xlTG9zZUVmZmVjdCA9IDxzcC5Ta2VsZXRvbj50aGlzLmdldE5vZGVDb21wb25lbnQoJ2FuaW1MYXllci9yb2xlTG9zZUVmZmVjdCcsIHNwLlNrZWxldG9uKTtcclxuICAgICAgICAvLyB0aGlzLnJvbGVMb3NlRWZmZWN0Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgaW5pdFRhc2tNYW5hZ2VyKCl7XHJcbiAgICAgICAgdGhpcy50YXNrTWFuYWdlciA9IG5ldyBUYXNrTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMudGFza01hbmFnZXIuaW5pdChjYy5maW5kKCd0YXNrUm9vdCcsIHRoaXMubm9kZSksIERkekdhbWVDb25zdC5HaWQsIC0xKTtcclxuICAgICAgICB0aGlzLnRhc2tNYW5hZ2VyLnJlcUdldEdhbWVUYXNrTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93QW5pbU1hc2soaXNTaG93KSB7XHJcbiAgICAgICAgdGhpcy5hbmltTWFza05vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLmFuaW1NYXNrTm9kZS5hY3RpdmUgPSBpc1Nob3c7XHJcbiAgICAgICAgaWYgKGlzU2hvdykge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1NYXNrTm9kZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICAgICAgdGhpcy5hbmltTWFza05vZGUucnVuQWN0aW9uKGNjLmZhZGVUbygwLjI1LCAxMDApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZUxldmVsQmFzZShiYXNlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmJhc2VMYmwuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoYmFzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVJvdW5kTXVsdChtdWx0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm11bHRMYmwuc3RyaW5nID0gU3RyaW5nKG11bHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVMZXZlbChsZXZlbDogc3RyaW5nKXtcclxuICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRHYW1lQnVuZGxlQXV0b0F0bGFzKHRoaXMubGV2ZWxTcCwgRGR6UGF0aEhlbHBlci5nYW1lVGV4dHVyZVBhdGggKyBcImF0bGFzL2ZyYW1lL2F0bGFzX2ZyYW1lXCIsIERkekdhbWVDb25zdC5EZXNrTGV2ZWxTZkNmZ1tsZXZlbF0sIG51bGwsIHRydWUpO1xyXG4gICAgICAgIGlmIChsZXZlbCA9PSBcImw0XCIgfHwgbGV2ZWwgPT0gXCJsNVwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZVNwLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVNb2RlKG5Nb2RlOiBudW1iZXIpe1xyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEdhbWVCdW5kbGVBdXRvQXRsYXModGhpcy5tb2RlU3AsIERkelBhdGhIZWxwZXIuZ2FtZVRleHR1cmVQYXRoICsgXCJhdGxhcy9mcmFtZS9hdGxhc19mcmFtZVwiLCBEZHpHYW1lQ29uc3QuTW9kZVN0ckNmZ1tuTW9kZV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93QWN0aW9uVGltZXIoaXNTaG93OiBib29sZWFuLCBzZWF0OiBudW1iZXIgPSAwLCBsZWZ0VGltZT86IG51bWJlciwgdG90YWxUaW1lPzogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5jbG9ja0NvbXAuc2V0Vmlld0FjdGl2ZShpc1Nob3cpO1xyXG4gICAgICAgIGlmIChpc1Nob3cpIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9ja0NvbXAuc3RhcnRUaW1lcihsZWZ0VGltZSwgdG90YWxUaW1lKTtcclxuICAgICAgICAgICAgbGV0IHBvczogY2MuVmVjMztcclxuICAgICAgICAgICAgaWYgKHNlYXQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcG9zID0gdGhpcy5hc2tBY3Rpb25WaWV3LmdldEFjdGlvbkNsb2NrV29ybGRQb3MoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBvcyA9IHRoaXMucGxheWVyVmlld0xpc3Rbc2VhdF0uZ2V0UGxheWVyQ2xvY2tXb3JsZFBvcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2xvY2tDb21wLnNldENsb2NrUG9zaXRpb24ocG9zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlYWxQb2tlcnNBbmltKCkge1xyXG4gICAgICAgIGxldCBjZmcgPSBEZHpSdWxlQ29uc3QuTW9kZUNvbmZpZ1tEZHpEcml2ZXIuaW5zdGFuY2UuQ29udGV4dC5tb2RlXTtcclxuICAgICAgICB0aGlzLnNob3dQb2tlckxpc3QgPSB0aGlzLnNob3dQb2tlclBvb2wuZ2V0SXRlbUFycihjZmcudG90YWxDb3VudCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNob3dQb2tlckxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHBva2VyID0gdGhpcy5zaG93UG9rZXJMaXN0W2ldO1xyXG4gICAgICAgICAgICBpZiAoaSA8PSAyKSAgICAgLy8g5aSE55CG54mM5pi+56S65aSq5aSa5a+86Ie05ZGo5Zu06Zi05b2x5Y+g5Yqg5oiQ6buR6L6555qE6Zeu6aKYXHJcbiAgICAgICAgICAgICAgICBwb2tlci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBwb2tlci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgcG9rZXIubm9kZS5zZXRQYXJlbnQodGhpcy5kZWFsUm9vdE5vZGUpO1xyXG4gICAgICAgICAgICBwb2tlci5zZXRQb2tlclBvc2l0aW9uKGNjLlZlYzMuWkVSTyk7XHJcbiAgICAgICAgICAgIHBva2VyLnNldFBva2VyU3R5bGUoMCk7XHJcbiAgICAgICAgICAgIHBva2VyLmlzRnJvbnQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5zaG93UG9rZXJMaXN0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgbGV0IHBvc0FyciA9IHRoaXMuc2VsZlBsYXlWaWV3LmdldEluZGV4UG9zQXJyKGNmZy5iYXNlQ291bnQsIHRydWUpO1xyXG4gICAgICAgIHRoaXMucGxheWVyVmlld0xpc3QuZm9yRWFjaCgocGxheWVyLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBHYW1lLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjZmcuYmFzZUNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcG9rZXIgPSB0aGlzLnNob3dQb2tlckxpc3RbY291bnRdO1xyXG4gICAgICAgICAgICAgICAgICAgIHBva2VyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQtLTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG9Qb3M6IGNjLlZlYzM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9Qb3MgPSB0aGlzLmRlYWxSb290Tm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb3NBcnJbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2tlci5zZXRQb2tlclNjYWxlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9Qb3MgPSB0aGlzLmRlYWxSb290Tm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwbGF5ZXIucG9rZXJHcm91cC5nZXRQb2tlckRlYWxBbmltUG9zKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2tlci5zZXRQb2tlclNjYWxlKDAuMzQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBwb2tlci5kb1Bva2VyTW92ZShjYy5WZWMzLlpFUk8sIHRvUG9zLCBEZHpEcml2ZXIuaW5zdGFuY2UuRGVmaW5lLkRlYWxQb2tlck1vdmVUaW1lLCBEZHpEcml2ZXIuaW5zdGFuY2UuRGVmaW5lLlBlclBva2VyRGVhbEludGVydmFsICogaSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2tlci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UG9rZXJMaXN0LnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dQb2tlclBvb2wucmVjeWNsZUl0ZW0ocG9rZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZlBsYXlWaWV3LnNob3dEZWFsUG9rZXJJbmRleChpLCBjZmcuYmFzZUNvdW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLnBva2VyR3JvdXAuc2V0UmVzdENvdW50U2hvdyh0cnVlLCBpICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgaSAlIDIgPT0gMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGluZGV4ICogRGR6RHJpdmVyLmluc3RhbmNlLkRlZmluZS5QZXJQbGF5ZXJEZWFsSW50ZXJ2YWwpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgdG90YWxUaW1lID0gRGR6RHJpdmVyLmluc3RhbmNlLkRlZmluZS5QZXJQbGF5ZXJEZWFsSW50ZXJ2YWwgKiAzO1xyXG4gICAgICAgIEdhbWUuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZHpMZWZ0UG9rZXJzVmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmR6TGVmdFBva2Vyc1ZpZXcuYWRkRFpQb2tlcnModGhpcy5zaG93UG9rZXJMaXN0LnNwbGljZSgwLCAzKSk7ICAgLy8gcm91bmTnu5PmnZ/lm57mlLZcclxuICAgICAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlHYW1lQnVuZGxlU291bmQoRGR6QXVkaW9Db25zdC5hdWRpb0NvbW1vblBhdGggKyBEZHpBdWRpb0NvbnN0LkxhbmRsb3JkUG9rZXJzLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5kekxlZnRQb2tlcnNWaWV3LnBsYXlTaG93QW5pbWF0aW9uKHRydWUsIERkekRyaXZlci5pbnN0YW5jZS5EZWZpbmUuRHpMZWZ0VGhyZWVTaG93VGltZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q2hvb3NlRW5iYWxlKHRydWUpOyAgICAgLy8g5Y+R5a6M54mM5bCx5Y+v5Lul6YCJ54mMXHJcbiAgICAgICAgfSwgdG90YWxUaW1lKTtcclxuICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfQUREVElNRUxPQ0ssIFwiZGVhbFBva2Vyc0FuaW1cIiwgdG90YWxUaW1lICsgRGR6RHJpdmVyLmluc3RhbmNlLkRlZmluZS5EekxlZnRUaHJlZVNob3dUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVhbFBva2VyRGlyZWN0KHVzZXJDYXJkcykge1xyXG4gICAgICAgIHVzZXJDYXJkcy5mb3JFYWNoKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbG9jYWxTZWF0ID0gRGR6RHJpdmVyLmluc3RhbmNlLlNpdEhlbHBlci5zZXJ2ZXJTVG9Mb2NhbE4odXNlci5jaGFpcik7XHJcbiAgICAgICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLnBsYXllclZpZXdMaXN0W2xvY2FsU2VhdF07XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IHVzZXIuY291bnQ7XHJcbiAgICAgICAgICAgIGlmIChsb2NhbFNlYXQgIT0gMClcclxuICAgICAgICAgICAgICAgIHBsYXllci5zZXRQbGF5ZXJMZWZ0UG9rZXJzKHRydWUsIGNvdW50KTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGZQbGF5Vmlldy5zaG93RGVhbFBva2VySW5kZXgoaSwgY291bnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb3VudCA+IDAgJiYgY291bnQgPD0gRGR6RHJpdmVyLmluc3RhbmNlLkRlZmluZS5XYXJuTGVmdFBva2VyQ291bnQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxQbGF5ZXIobG9jYWxTZWF0LCAnc2hvd1dhcm5TaWduJywgdHJ1ZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnNlbGZQbGF5Vmlldy5sYXlvdXRIYW5kUG9rZXJzKCk7XHJcbiAgICAgICAgdGhpcy5kekxlZnRQb2tlcnNWaWV3LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5kekxlZnRQb2tlcnNWaWV3LmFkZERaUG9rZXJzKHRoaXMuc2hvd1Bva2VyUG9vbC5nZXRJdGVtQXJyKDMpKTtcclxuICAgICAgICB0aGlzLmR6TGVmdFBva2Vyc1ZpZXcucGxheVNob3dBbmltYXRpb24oZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuc2V0Q2hvb3NlRW5iYWxlKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93TWFya2VyKGlzU2hvdzogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMubWFya2VyQnRuLmFjdGl2ZSA9IGlzU2hvdztcclxuICAgICAgICB0aGlzLmlzU2hvd01hcmtlciA9IGlzU2hvdztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGlzU2hvd01hcmtlcihmbGFnOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzU2hvd01hcmtlciA9PSBmbGFnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5faXNTaG93TWFya2VyID0gZmxhZztcclxuICAgICAgICB0aGlzLm1hcmtlclZpZXcuYWN0aXZlID0gZmxhZztcclxuICAgICAgICAvLyB0aGlzLmR6TGVmdFBva2Vyc1ZpZXcuYWN0aXZlID0gIWZsYWc7ICAgICAgICAvLyAyMDIwLTAzLTIzIDE4OjM1OjEwIOazqOmHiuaOiSDlnLDkuLvniYzmlLnmiJDluLjpqbtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dNYXJrZXJWaWV3Q2xpY2soKSB7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlHYW1lQnVuZGxlU291bmQoRGR6QXVkaW9Db25zdC5hdWRpb0NvbW1vblBhdGggKyBEZHpBdWRpb0NvbnN0LmNvbW1vbkF1ZGlvLkJ1dHRvbkNsaWNrLCB0cnVlKTtcclxuICAgICAgICB0aGlzLmlzU2hvd01hcmtlciA9ICF0aGlzLl9pc1Nob3dNYXJrZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldENob29zZUVuYmFsZShpc0VuYWJsZSkge1xyXG4gICAgICAgIHRoaXMuc2VsZlBsYXlWaWV3LnJlYWR5Rm9yQ2hvb3NlKGlzRW5hYmxlKTtcclxuICAgICAgICBpZiAoaXNFbmFibGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxmUGxheVZpZXcuaW5pdENob29zZUZ1bmN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkb1BsYXlQb2tlcnMoYXJyID0gW10pIHtcclxuICAgICAgICBsZXQgbWFwOiBhbnk7XHJcbiAgICAgICAgaWYgKGFyciAmJiAhR2xvYmFsLlRvb2xraXQuaXNFbXB0eU9iamVjdChhcnIpKSB7XHJcbiAgICAgICAgICAgIG1hcCA9IHRoaXMuc2VsZlBsYXlWaWV3LmdldFBva2VyQXJyTWFwKGFycik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBtYXAgPSBEZHpEcml2ZXIuaW5zdGFuY2UuQ29udGV4dC5nZXRTZWxlY3RQb2tlcnNNYXAoKTtcclxuICAgICAgICAgICAgYXJyID0gRGR6RHJpdmVyLmluc3RhbmNlLkNvbnRleHQuZ2V0U2VsZWN0UG9rZXJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYXAgJiYgIUdsb2JhbC5Ub29sa2l0LmlzRW1wdHlPYmplY3QobWFwKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGZQbGF5Vmlldy5vblBsYXlQb2tlcnMobWFwKTtcclxuICAgICAgICAgICAgdGhpcy5jYWxsUGxheWVyKDAsICdzaG93UGxheVBva2VycycsIHRydWUsIGFyciwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93UG9rZXJUeXBlRWZmZWN0KGxvY2FsU2VhdCwgdHlwZSkge1xyXG4gICAgICAgIGxldCB0b3RhbFRpbWUgPSAwO1xyXG4gICAgICAgIGlmIChEZHpSdWxlQ29uc3QuY2hlY2tJc1BsYW5lKHR5cGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheVBsYW5lQW5pbSgpO1xyXG4gICAgICAgICAgICB0b3RhbFRpbWUgKz0gRGR6RHJpdmVyLmluc3RhbmNlLkRlZmluZS5QbGFuZUFuaW1UaW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChEZHpSdWxlQ29uc3QuY2hlY2tJc1JvY2tldCh0eXBlKSkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlSb2NrZXRBbmltKCk7XHJcbiAgICAgICAgICAgIHRvdGFsVGltZSArPSBEZHpEcml2ZXIuaW5zdGFuY2UuRGVmaW5lLlJvY2tldEFuaW1UaW1lXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKERkelJ1bGVDb25zdC5jaGVja0lzQm9tYih0eXBlKSkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCb21iQW5pbSgpO1xyXG4gICAgICAgICAgICB0b3RhbFRpbWUgKz0gRGR6RHJpdmVyLmluc3RhbmNlLkRlZmluZS5Cb21iQW5pbVRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKERkelJ1bGVDb25zdC5jaGVja0lzTGlua1BhaXIodHlwZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5TGlua1BhaXJBbmltKGxvY2FsU2VhdCk7XHJcbiAgICAgICAgICAgIHRvdGFsVGltZSArPSBEZHpEcml2ZXIuaW5zdGFuY2UuRGVmaW5lLkxpbmtQYWlyQW5pbVRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKERkelJ1bGVDb25zdC5jaGVja0lzU3RyYWlnaHQodHlwZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5U3RyYWlnaHRBbmltKGxvY2FsU2VhdCk7XHJcbiAgICAgICAgICAgIHRvdGFsVGltZSArPSBEZHpEcml2ZXIuaW5zdGFuY2UuRGVmaW5lLlN0cmFpZ2h0QW5pbVRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9BRERUSU1FTE9DSywgJ3Nob3dQb2tlclR5cGVFZmZlY3QnLCB0b3RhbFRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkb1Byb21wdFBva2VycyhtYXAgPSB7fSkge1xyXG4gICAgICAgIGlmIChtYXAgJiYgIUdsb2JhbC5Ub29sa2l0LmlzRW1wdHlPYmplY3QobWFwKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGZQbGF5Vmlldy5vblByb21wdFBva2VycyhtYXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZG9SZXNldFBva2VycygpIHtcclxuICAgICAgICB0aGlzLnNlbGZQbGF5Vmlldy5yZXNldFBva2VycygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwbGF5UGxhbmVBbmltKCkge1xyXG4gICAgICAgIGxldCBzb3VuZEFyciA9IERkelJ1bGVDb25zdC5QbGFuZVNvdW5kQXJyO1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5R2FtZUJ1bmRsZVNvdW5kKERkekF1ZGlvQ29uc3QuYXVkaW9DYXJkVHlwZVBhdGggKyBzb3VuZEFyclswXSwgdHJ1ZSk7XHJcbiAgICAgICAgR2FtZS5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbGFuZUVmZmVjdC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucGxhbmVFZmZlY3Quc2V0QW5pbWF0aW9uKDAsICdpZGxlJywgZmFsc2UpO1xyXG4gICAgICAgIH0sIDAuMik7XHJcbiAgICAgICAgR2FtZS5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbGFuZUVmZmVjdC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0sIERkekRyaXZlci5pbnN0YW5jZS5EZWZpbmUuUGxhbmVBbmltVGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXlCb21iQW5pbSgpIHtcclxuICAgICAgICBsZXQgc291bmRBcnIgPSBEZHpSdWxlQ29uc3QuQm9tYlNvdW5kQXJyO1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5R2FtZUJ1bmRsZVNvdW5kKERkekF1ZGlvQ29uc3QuYXVkaW9DYXJkVHlwZVBhdGggKyBzb3VuZEFyclswXSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIEdhbWUuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYm9tYkVmZmVjdC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYm9tYkVmZmVjdC5zZXRBbmltYXRpb24oMCwgJ2lkbGUnLCBmYWxzZSk7XHJcbiAgICAgICAgfSwgMC4xKTtcclxuICAgICAgICBHYW1lLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmJvbWJFZmZlY3Qubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9LCBEZHpEcml2ZXIuaW5zdGFuY2UuRGVmaW5lLkJvbWJBbmltVGltZSk7XHJcbiAgICAgICAgR2FtZS5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGFjdGlvbiA9IEdsb2JhbC5VSUhlbHBlci5nZXRTY3JlZW5TaGFrZUFjdGlvbigwLjUsIDE1LCA1KTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIH0sIERkekRyaXZlci5pbnN0YW5jZS5EZWZpbmUuQm9tYkFuaW1UaW1lIC0gMC41KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGxheVJvY2tldEFuaW0oKSB7XHJcbiAgICAgICAgbGV0IHNvdW5kQXJyID0gRGR6UnVsZUNvbnN0LlJvY2tldFNvdW5kQXJyO1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5R2FtZUJ1bmRsZVNvdW5kKERkekF1ZGlvQ29uc3QuYXVkaW9DYXJkVHlwZVBhdGggKyBzb3VuZEFyclswXSwgdHJ1ZSk7XHJcbiAgICAgICAgR2FtZS5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yb2NrZXRFZmZlY3Qubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnJvY2tldEVmZmVjdC5zZXRBbmltYXRpb24oMCwgJ2lkbGUnLCBmYWxzZSk7XHJcbiAgICAgICAgfSwgMC4yKTtcclxuICAgICAgICBHYW1lLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJvY2tldEVmZmVjdC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0sIERkekRyaXZlci5pbnN0YW5jZS5EZWZpbmUuUm9ja2V0QW5pbVRpbWUpO1xyXG4gICAgICAgIEdhbWUuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhY3Rpb24gPSBHbG9iYWwuVUlIZWxwZXIuZ2V0U2NyZWVuU2hha2VBY3Rpb24oMC44LCAxNSwgNSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICB9LCBEZHpEcml2ZXIuaW5zdGFuY2UuRGVmaW5lLlJvY2tldEFuaW1UaW1lIC0gMC44KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGxheUxpbmtQYWlyQW5pbShsb2NhbFNlYXQ6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBzb3VuZEFyciA9IERkelJ1bGVDb25zdC5MaW5rUGFpclNvdW5kQXJyO1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5R2FtZUJ1bmRsZVNvdW5kKERkekF1ZGlvQ29uc3QuYXVkaW9DYXJkVHlwZVBhdGggKyBzb3VuZEFyclswXSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGxldCB3b3JsZFBvcyA9IHRoaXMuZ2V0UGxheWVyKGxvY2FsU2VhdCkucG9rZXJHcm91cC5nZXRQb2tlclNob3dEZXNXb3JsZFBvcygpO1xyXG4gICAgICAgIHRoaXMubGlua1BhaXJFZmZlY3Qubm9kZS5zZXRQb3NpdGlvbih0aGlzLmxpbmtQYWlyRWZmZWN0Lm5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkUG9zKSk7XHJcbiAgICAgICAgdGhpcy5saW5rUGFpckVmZmVjdC5ub2RlLnNldFNjYWxlKGxvY2FsU2VhdCA9PSAwID8gMSA6IDAuOCk7XHJcbiAgICAgICAgdGhpcy5saW5rUGFpckVmZmVjdC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy9UT0RPIOWKqOaViOiKgueCueWQjVxyXG4gICAgICAgIHRoaXMubGlua1BhaXJFZmZlY3Quc2V0QW5pbWF0aW9uKDAsICdpZGxlJywgZmFsc2UpO1xyXG4gICAgICAgIEdhbWUuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGlua1BhaXJFZmZlY3Qubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9LCBEZHpEcml2ZXIuaW5zdGFuY2UuRGVmaW5lLkxpbmtQYWlyQW5pbVRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwbGF5U3RyYWlnaHRBbmltKGxvY2FsU2VhdDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHNvdW5kQXJyID0gRGR6UnVsZUNvbnN0LlN0cmFpZ2h0U291bmRBcnI7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlHYW1lQnVuZGxlU291bmQoRGR6QXVkaW9Db25zdC5hdWRpb0NhcmRUeXBlUGF0aCArIHNvdW5kQXJyWzBdLCB0cnVlKTtcclxuXHJcbiAgICAgICAgbGV0IHdvcmxkUG9zID0gdGhpcy5nZXRQbGF5ZXIobG9jYWxTZWF0KS5wb2tlckdyb3VwLmdldFBva2VyU2hvd0Rlc1dvcmxkUG9zKCk7XHJcbiAgICAgICAgdGhpcy5zdHJhaWdodEVmZmVjdC5ub2RlLnNldFBvc2l0aW9uKHRoaXMuc3RyYWlnaHRFZmZlY3Qubm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIod29ybGRQb3MpKTtcclxuICAgICAgICB0aGlzLnN0cmFpZ2h0RWZmZWN0Lm5vZGUuc2V0U2NhbGUobG9jYWxTZWF0ID09IDAgPyAxIDogMC44KTtcclxuICAgICAgICB0aGlzLnN0cmFpZ2h0RWZmZWN0Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvL1RPRE8g5Yqo5pWI6IqC54K55ZCNXHJcbiAgICAgICAgdGhpcy5zdHJhaWdodEVmZmVjdC5zZXRBbmltYXRpb24oMCwgJ2lkbGUnLCBmYWxzZSk7XHJcbiAgICAgICAgR2FtZS5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdHJhaWdodEVmZmVjdC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0sIERkekRyaXZlci5pbnN0YW5jZS5EZWZpbmUuU3RyYWlnaHRBbmltVGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXlTcHJpbmdBbmltKG5TdGF0ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKG5TdGF0ZSA9PSAxKSB7ICAgLy8g5pil5aSpXHJcbiAgICAgICAgICAgIEdsb2JhbC5BdWRpby5wbGF5R2FtZUJ1bmRsZVNvdW5kKERkekF1ZGlvQ29uc3QuYXVkaW9Db21tb25QYXRoICsgRGR6QXVkaW9Db25zdC5TcHJpbmdBdWRpbywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5BdWRpby5wbGF5R2FtZUJ1bmRsZVNvdW5kKERkekF1ZGlvQ29uc3QuZ2VuZGVyU291bmRQYXRoKERkekF1ZGlvQ29uc3QuU3ByaW5nLCAwKSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIEdhbWUuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwcmluZ0VmZmVjdC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwcmluZ0VmZmVjdC5zZXRBbmltYXRpb24oMCwgJ2lkbGUnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0sIDAuMik7XHJcbiAgICAgICAgICAgIEdhbWUuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwcmluZ0VmZmVjdC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LCBEZHpEcml2ZXIuaW5zdGFuY2UuRGVmaW5lLlNwcmluZ0FuaW1UaW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoblN0YXRlID09IDIpIHsgICAvLyDlj43mmKXlpKkgICDmmoLnvLpcclxuICAgICAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlHYW1lQnVuZGxlU291bmQoRGR6QXVkaW9Db25zdC5hdWRpb0NvbW1vblBhdGggKyBEZHpBdWRpb0NvbnN0LlNwcmluZ0F1ZGlvLCB0cnVlKTtcclxuICAgICAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlHYW1lQnVuZGxlU291bmQoRGR6QXVkaW9Db25zdC5nZW5kZXJTb3VuZFBhdGgoRGR6QXVkaW9Db25zdC5TcHJpbmcsIDApLCB0cnVlKTtcclxuICAgICAgICAgICAgR2FtZS5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3ByaW5nRWZmZWN0Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3ByaW5nRWZmZWN0LnNldEFuaW1hdGlvbigwLCAnaWRsZScsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSwgMC4yKTtcclxuICAgICAgICAgICAgR2FtZS5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3ByaW5nRWZmZWN0Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sIERkekRyaXZlci5pbnN0YW5jZS5EZWZpbmUuU3ByaW5nQW5pbVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGxheUF3YXJkQW5pbShhd2FyZCA9IFtdLCBkZXRhaWxzKSB7XHJcbiAgICAgICAgbGV0IHRvdGFsVGltZSA9IDA7XHJcbiAgICAgICAgbGV0IGR6U2VhdCA9IERkekRyaXZlci5pbnN0YW5jZS5Db250ZXh0LmdldChEZHpEcml2ZXIuaW5zdGFuY2UuRGVmaW5lLkZpZWxkRHpMb2NTZWF0KTtcclxuICAgICAgICBsZXQgaXNMYW5kV2luID0gZGV0YWlscy5sYW5kX3dpbiA9PSAxO1xyXG4gICAgICAgIGxldCBpc1NlbGZXaW4gPSAoaXNMYW5kV2luICYmIGR6U2VhdCA9PSAwKSB8fCAoIWlzTGFuZFdpbiAmJiBkelNlYXQgIT0gMCk7XHJcbiAgICAgICAgaWYgKGlzU2VsZldpbilcclxuICAgICAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlHYW1lQnVuZGxlU291bmQoRGR6QXVkaW9Db25zdC5hdWRpb0NvbW1vblBhdGggKyBEZHpBdWRpb0NvbnN0LldpbkdhbWUsIHRydWUpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlHYW1lQnVuZGxlU291bmQoRGR6QXVkaW9Db25zdC5hdWRpb0NvbW1vblBhdGggKyBEZHpBdWRpb0NvbnN0Lkxvc2VHYW1lLCB0cnVlKTtcclxuXHJcbiAgICAgICAgLy8g5pKt5pS+6KeS6Imy6IOc5Yip5aSx6LSlXHJcbiAgICAgICAgR2FtZS5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5Um9sZVJlc3VsdEVmZmVjdChpc1NlbGZXaW4sIGlzTGFuZFdpbiwgZHpTZWF0KTtcclxuICAgICAgICAgICAvLyB0aGlzLnNob3dBbmltTWFzayh0cnVlKTtcclxuICAgICAgICB9LCAwKTtcclxuICAgICAgICBHYW1lLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyB0aGlzLnJvbGVXaW5FZmZlY3Qubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gdGhpcy5yb2xlTG9zZUVmZmVjdC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgIC8vIHRoaXMuc2hvd0FuaW1NYXNrKGZhbHNlKTtcclxuICAgICAgICB9LCBEZHpEcml2ZXIuaW5zdGFuY2UuRGVmaW5lLlBsYXlSb2xlV2luVGltZSArIDAuMSk7XHJcblxyXG4gICAgICAgIHRvdGFsVGltZSArPSBEZHpEcml2ZXIuaW5zdGFuY2UuRGVmaW5lLlBsYXlSb2xlV2luVGltZTtcclxuXHJcbiAgICAgICAgLy8g6aOY5YiGXHJcbiAgICAgICAgR2FtZS5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgYXdhcmQuZm9yRWFjaCh1c2VyID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBsb2NhbFNlYXQgPSBEZHpEcml2ZXIuaW5zdGFuY2UuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTih1c2VyLmNoYWlyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyVmlld0xpc3RbbG9jYWxTZWF0XS5zaG93UmV3YXJkTGJsKHVzZXIuYXdhcmQsIHVzZXIuYXdhcmQgPj0gMCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIHRvdGFsVGltZSk7XHJcbiAgICAgICAgdG90YWxUaW1lICs9IERkekRyaXZlci5pbnN0YW5jZS5EZWZpbmUuRmxvYXRTY29yZVRpbWU7XHJcblxyXG4gICAgICAgIC8vIOe7k+eul+mhtemdolxyXG4gICAgICAgIEdhbWUuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZVNldHRsZVZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lU2V0dGxlVmlldy5wbGF5U2V0dGxlQW5pbShpc1NlbGZXaW4sIGRldGFpbHMpO1xyXG4gICAgICAgIH0sIHRvdGFsVGltZSk7XHJcbiAgICAgICAgdG90YWxUaW1lICs9IERkekRyaXZlci5pbnN0YW5jZS5EZWZpbmUuU2hvd1NldHRsZVRpbWU7XHJcblxyXG4gICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9BRERUSU1FTE9DSywgXCJkZHpwbGF5QXdhcmRBbmltXCIsIHRvdGFsVGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXlSb2xlUmVzdWx0RWZmZWN0KGlzU2VsZldpbiwgaXNMYW5kV2luLCBkelNlYXQpIHtcclxuICAgICAgICAvLyBpZiAoaXNTZWxmV2luKSB7XHJcbiAgICAgICAgLy8gICAgIGxldCBhbmltTmFtZSA9ICcnO1xyXG4gICAgICAgIC8vICAgICBpZiAoZHpTZWF0ID09IDApXHJcbiAgICAgICAgLy8gICAgICAgICBhbmltTmFtZSA9ICdkaXpodXNoZW5nbGknO1xyXG4gICAgICAgIC8vICAgICBlbHNlXHJcbiAgICAgICAgLy8gICAgICAgICBhbmltTmFtZSA9ICdub25nbWluc2hlbmdsaSc7XHJcbiAgICAgICAgLy8gICAgIHRoaXMucm9sZVdpbkVmZmVjdC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgIHRoaXMucm9sZVdpbkVmZmVjdC5zZXRBbmltYXRpb24oMCwgYW5pbU5hbWUsIGZhbHNlKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5yb2xlTG9zZUVmZmVjdC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNlIHtcclxuICAgICAgICAvLyAgICAgbGV0IGFuaW1OYW1lID0gJyc7XHJcbiAgICAgICAgLy8gICAgIGlmIChkelNlYXQgPT0gMClcclxuICAgICAgICAvLyAgICAgICAgIGFuaW1OYW1lID0gJ2Rpemh1c2hpYmFpJztcclxuICAgICAgICAvLyAgICAgZWxzZVxyXG4gICAgICAgIC8vICAgICAgICAgYW5pbU5hbWUgPSAnbm9uZ21pbnNoaWJhaSc7XHJcbiAgICAgICAgLy8gICAgIHRoaXMucm9sZUxvc2VFZmZlY3Qubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vICAgICB0aGlzLnJvbGVMb3NlRWZmZWN0LnNldEFuaW1hdGlvbigwLCBhbmltTmFtZSwgZmFsc2UpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLnJvbGVXaW5FZmZlY3Qubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGlmIChpc0xhbmRXaW4pXHJcbiAgICAgICAgICAgIEdsb2JhbC5BdWRpby5wbGF5R2FtZUJ1bmRsZVNvdW5kKERkekF1ZGlvQ29uc3QuYXVkaW9Db21tb25QYXRoICsgRGR6QXVkaW9Db25zdC5Mb3JkV2luLCB0cnVlKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIEdsb2JhbC5BdWRpby5wbGF5R2FtZUJ1bmRsZVNvdW5kKERkekF1ZGlvQ29uc3QuYXVkaW9Db21tb25QYXRoICsgRGR6QXVkaW9Db25zdC5GYXJtZXJXaW4sIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhclduZCgpIHtcclxuICAgICAgICAvL+WFs+mXreeVjOmdouWNleeLrOa4heeQhueOqeWutuS/oeaBr1xyXG4gICAgICAgIHRoaXMuY2xlYXJQbGF5ZXJzKCk7XHJcbiAgICAgICAgdGhpcy5jbGVhckJ5R2FtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhclBsYXllcnMoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBsYXllclZpZXdMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyVmlld0xpc3RbaV0uY2xlYXJCeVJvdW5kKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyVmlld0xpc3RbaV0uaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJPdGhlclBsYXllcnMoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBsYXllclZpZXdMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpID09IDApXHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJWaWV3TGlzdFtpXS5jbGVhckJ5Um91bmQoKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJWaWV3TGlzdFtpXS5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mjqXlj6Plrp7njrAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcHVibGljIGNsZWFyQnlHYW1lKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlUm91bmRNdWx0KDApO1xyXG4gICAgICAgIHRoaXMuc2hvd01hcmtlcihmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5zaG93UG9rZXJQb29sLnJlY3ljbGVBbGwodGhpcy5zaG93UG9rZXJMaXN0KTtcclxuICAgICAgICB0aGlzLnNob3dQb2tlckxpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLmNsb2NrQ29tcC5zZXRWaWV3QWN0aXZlKGZhbHNlKTtcclxuICAgICAgICB0aGlzLnZpZXdTZXQuY2FsbEFsbChcImNsZWFyQnlHYW1lXCIpO1xyXG4gICAgICAgIHRoaXMuY2FsbEFsbFBsYXllcnMoXCJjbGVhckJ5R2FtZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJCeVJvdW5kKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlUm91bmRNdWx0KDApO1xyXG4gICAgICAgIHRoaXMuc2hvd0FjdGlvblRpbWVyKGZhbHNlKTtcclxuICAgICAgICB0aGlzLnNob3dNYXJrZXIoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuc3ByaW5nRWZmZWN0Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wbGFuZUVmZmVjdC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYm9tYkVmZmVjdC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucm9ja2V0RWZmZWN0Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5saW5rUGFpckVmZmVjdC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RyYWlnaHRFZmZlY3Qubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyB0aGlzLnJvbGVMb3NlRWZmZWN0Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5yb2xlV2luRWZmZWN0Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93QWN0aW9uVGltZXIoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuc2hvd0FuaW1NYXNrKGZhbHNlKTtcclxuICAgICAgICB0aGlzLnZpZXdTZXQuY2FsbEFsbChcImNsZWFyQnlSb3VuZFwiKTtcclxuICAgICAgICB0aGlzLmNhbGxBbGxQbGF5ZXJzKFwiY2xlYXJCeVJvdW5kXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWdpc3RWaWV3KGtleTogc3RyaW5nLCB2aWV3OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnZpZXdTZXQucmVnaXN0VmlldyhrZXksIHZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRWaWV3PFQ+KGtleSk6IFQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZpZXdTZXQuZ2V0Vmlld0V4PFQ+KGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXBsYXllcuebuOWFsy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvL+iwg+eUqOWNleS4qnBsYXllcuaWueazlVxyXG4gICAgcHVibGljIGNhbGxQbGF5ZXIoaW5kZXg6IG51bWJlciwgZnVuYzogc3RyaW5nLCAuLi5hcmdzKSB7XHJcbiAgICAgICAgbGV0IHBsYXllciA9IHRoaXMucGxheWVyVmlld0xpc3RbaW5kZXhdO1xyXG4gICAgICAgIGlmIChwbGF5ZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLmib7kuI3liLBwbGF5ZXIhISFcIiwgaW5kZXgpO1xyXG4gICAgICAgICAgICAvLyBHbG9iYWwuVUkuZmFzdFRpcChg5om+5LiN5YiwcGxheWVyISEhIGluZGV4OiAke2luZGV4fSwgZnVuYzogJHtmdW5jfWApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwbGF5ZXJbZnVuY10gJiYgcGxheWVyW2Z1bmNdLmFwcGx5KSB7XHJcbiAgICAgICAgICAgIHBsYXllcltmdW5jXS5hcHBseShwbGF5ZXIsIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsbEFsbFBsYXllcnMoZnVuYzogc3RyaW5nLCAuLi5hcmdzKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBEZHpEcml2ZXIuaW5zdGFuY2UuRGVmaW5lLk1heFBsYXllckNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuZ2V0UGxheWVyKGkpO1xyXG4gICAgICAgICAgICBpZiAocGxheWVyID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXJbZnVuY10gJiYgcGxheWVyW2Z1bmNdLmFwcGx5KSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJbZnVuY10uYXBwbHkocGxheWVyLCBhcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UGxheWVyKGluZGV4OiBudW1iZXIpOiBEZHpQbGF5ZXJWaWV3IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXJWaWV3TGlzdFtpbmRleF07XHJcbiAgICB9XHJcbn0iXX0=