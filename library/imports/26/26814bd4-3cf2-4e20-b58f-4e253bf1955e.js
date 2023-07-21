"use strict";
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