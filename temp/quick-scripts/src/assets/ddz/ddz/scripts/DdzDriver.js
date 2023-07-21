"use strict";
cc._RF.push(module, '35ee1Ep0IRDC6nq9LIeCexc', 'DdzDriver');
// ddz/ddz/scripts/DdzDriver.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var DdzContext_1 = require("./data/DdzContext");
var DdzDefine_1 = require("./data/DdzDefine");
var DdzPathHelper_1 = require("./data/DdzPathHelper");
var DdzEasyHandlers_1 = require("./handlers/DdzEasyHandlers");
var DdzEnterHandler_1 = require("./handlers/DdzEnterHandler");
var DdzLeaveHandler_1 = require("./handlers/DdzLeaveHandler");
var DdzSyncHandler_1 = require("./handlers/DdzSyncHandler");
var DdzGameCfgHandler_1 = require("./handlers/DdzGameCfgHandler");
var DdzDealHandler_1 = require("./handlers/DdzDealHandler");
var DdzReadyHandler_1 = require("./handlers/DdzReadyHandler");
var DdzRewardHandler_1 = require("./handlers/DdzRewardHandler");
var DdzAutoHandler_1 = require("./handlers/DdzAutoHandler");
var DdzLandlordHandler_1 = require("./handlers/DdzLandlordHandler");
var DdzMultHandler_1 = require("./handlers/DdzMultHandler");
var DdzPlayHandler_1 = require("./handlers/DdzPlayHandler");
var DdzAllOpenHandler_1 = require("./handlers/DdzAllOpenHandler");
var DdzChangeScoreHandler_1 = require("./handlers/DdzChangeScoreHandler");
var DdzGameConst_1 = require("./data/DdzGameConst");
var DdzRefreshHandPokerHandler_1 = require("./handlers/DdzRefreshHandPokerHandler");
var DdzLoadingUI_1 = require("./component/DdzLoadingUI");
var DdzPokerHelper_1 = require("./data/DdzPokerHelper");
var DdzPlayRule_1 = require("./tool/DdzPlayRule");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DdzDriver = /** @class */ (function (_super) {
    __extends(DdzDriver, _super);
    function DdzDriver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 默认头像框资源 */
        _this.defaultHeadKuang = null;
        _this.inGame = false; // 处理某些极端场景的报错, 资源预加载时强退到大厅, 场景未来得及销毁时立马又进来
        return _this;
    }
    DdzDriver_1 = DdzDriver;
    DdzDriver.prototype.onLoad = function () {
        DdzDriver_1.instance = this;
        this.inGame = true;
        this.maskNode = cc.find("mask", this.node);
        this.maskNode.zIndex = 9;
        this.loadingUI = Global.UIHelper.safeGetComponent(this.node, "loading", DdzLoadingUI_1.default);
        this.loadingUI.node.zIndex = 8;
        this.setupGlobal();
        this.setup();
        Global.Audio.playGameBundleMusic(DdzPathHelper_1.DdzAudioConst.Bgm1, true);
    };
    //初始化大厅相关逻辑
    DdzDriver.prototype.setupGlobal = function () {
        //初始化update驱动  初始化timer
        Global.Component.initDriver();
        //初始化Game驱动
        Game.Component.initDriver();
        Global.UI.initUIRoot();
    };
    DdzDriver.prototype.setup = function () {
        Game.Context = new DdzContext_1.default();
        this.Context = Game.Context;
        this.Define = new DdzDefine_1.default();
        this.Path = new DdzPathHelper_1.default();
        this.SitHelper = new PVPSitHelper();
        this.PlayRuleHelper = new DdzPlayRule_1.default();
        this.PokerHelper = new DdzPokerHelper_1.default();
        this.registHandler(this.Define);
    };
    DdzDriver.prototype.start = function () {
        Game.Event.on(Game.EVENT_FORCE_LEAVE_GAME, this, this.onForceLeave);
        Game.Event.on(Game.EVENT_NOT_IN_TABLE, this, this.onForceLeave);
        Game.Event.on(Game.EVENT_SOCKET_RECONNECT, this, this.onSocketReconnect);
        Game.Event.on(Game.EVENT_SOCKET_RESUME, this, this.onResume);
        Game.Event.on(Game.EVENT_MATCH_PLAYER, this, this.onMatchPlayer);
    };
    DdzDriver.prototype.onDestroy = function () {
        Game.Event.off(Game.EVENT_FORCE_LEAVE_GAME, this, this.onForceLeave);
        Game.Event.off(Game.EVENT_NOT_IN_TABLE, this, this.onForceLeave);
        Game.Event.off(Game.EVENT_SOCKET_RECONNECT, this, this.onSocketReconnect);
        Game.Event.off(Game.EVENT_SOCKET_RESUME, this, this.onResume);
        Game.Event.off(Game.EVENT_MATCH_PLAYER, this, this.onMatchPlayer);
        this.unscheduleAllCallbacks();
        DdzDriver_1.instance = null;
    };
    /**
     * 加载vip头像框，如果使用的不是vip头像框，则使用子游戏默认头像框
     * @param spriteHeadKuang 头像框Sprite
     * @param headkuang vip头像框字符串
     */
    DdzDriver.prototype.LoadVipHeadKuang = function (spriteHeadKuang, headkuang) {
        // if(headkuang > "0"){
        // Global.Toolkit.loadLocalHeadFrame(spriteHeadKuang, headkuang);
        var atlasString = "texture/headFrame/headFrame";
        var sfString = "txkuang_vip" + headkuang;
        // return Global.ResourceManager.loadAutoAtlas(this.headBox, atlasString, sfString, () => {
        //     this.headBox.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        //     this.headBox.trim = false
        // }, false);
        Global.ResourceManager.loadBundleAutoAtlas("2005", spriteHeadKuang, atlasString, sfString, null, true);
        // }
        // else{
        //     spriteHeadKuang.spriteFrame = this.defaultHeadKuang;
        // }
    };
    DdzDriver.prototype.registHandler = function (Define) {
        Game.Control.registDefaultHandler();
        Game.Control.registHandler(Define.CmdGameCfg, new DdzGameCfgHandler_1.default);
        Game.Control.registHandler(Define.CmdEnter, new DdzEnterHandler_1.default);
        Game.Control.registHandler(Define.CmdLeave, new DdzLeaveHandler_1.default);
        Game.Control.registHandler(Define.CmdLeaveMatch, new DdzEasyHandlers_1.DdzLeaveMatchHandler);
        Game.Control.registHandler(Define.CmdRefresh, new DdzEasyHandlers_1.DdzRefreshHandler);
        Game.Control.registHandler(Define.CmdOffline, new DdzEasyHandlers_1.DdzOfflineHandler);
        Game.Control.registHandler(Define.CmdSyncBegin, new DdzSyncHandler_1.DdzSyncBeginHandler);
        Game.Control.registHandler(Define.CmdSyncEnd, new DdzSyncHandler_1.DdzSyncEndHandler);
        Game.Control.registHandler(Define.CmdSyncTable, new DdzSyncHandler_1.DdzSyncRefreshHandler);
        Game.Control.registHandler(Define.CmdRefreshHandPokers, new DdzRefreshHandPokerHandler_1.default);
        Game.Control.registHandler(Define.CmdCallReady, new DdzReadyHandler_1.default);
        Game.Control.registHandler(Define.CmdGameStart, new DdzEasyHandlers_1.DdzStartHandler);
        Game.Control.registHandler(Define.CmdDeal, new DdzDealHandler_1.default);
        Game.Control.registHandler(Define.CmdAuto, new DdzAutoHandler_1.default);
        Game.Control.registHandler(Define.CmdCalLandlord, new DdzLandlordHandler_1.DdzCalLandlordHandler);
        Game.Control.registHandler(Define.CmdLandlord, new DdzLandlordHandler_1.DdzOnLandlordHandler);
        Game.Control.registHandler(Define.CmdOnLandlord, new DdzLandlordHandler_1.DdzLandlordResultHandler);
        Game.Control.registHandler(Define.CmdReCalLandlord, new DdzLandlordHandler_1.DdzReCalLandlordHandler);
        Game.Control.registHandler(Define.CmdCalMult, new DdzMultHandler_1.DdzCalMultHandler);
        Game.Control.registHandler(Define.CmdMult, new DdzMultHandler_1.DdzOnMultHandler);
        Game.Control.registHandler(Define.CmdPlayStart, new DdzPlayHandler_1.DdzPlayStartHandler);
        Game.Control.registHandler(Define.CmdCalPlay, new DdzPlayHandler_1.DdzCalPlayHandler);
        Game.Control.registHandler(Define.CmdPlay, new DdzPlayHandler_1.DdzOnPlayHandler);
        Game.Control.registHandler(Define.CmdPass, new DdzPlayHandler_1.DdzOnPassHandler);
        Game.Control.registHandler(Define.CmdOpen, new DdzAllOpenHandler_1.default);
        Game.Control.registHandler(Define.CmdChangeScore, new DdzChangeScoreHandler_1.default);
        Game.Control.registHandler(Define.CmdReward, new DdzRewardHandler_1.default);
        Game.Control.registHandler(Define.CmdGameEnd, new DdzEasyHandlers_1.DdzEndHandler);
        Game.Control.registHandler(Define.CmdWait, new DdzEasyHandlers_1.DdzWaitHandler);
    };
    //重连时需要先清理玩家列表，后续重新进入
    DdzDriver.prototype.onSocketReconnect = function () {
        if (this.mainUI) {
            Global.Audio.stopAllEffect();
            Game.Tween.clear();
            Game.Component.unscheduleAllCallbacks();
            this.mainUI.clearPlayers();
            this.mainUI.clearByGame();
            this.Context.clearByGame();
        }
    };
    DdzDriver.prototype.onForceLeave = function (forceGoToHall) {
        if (forceGoToHall)
            this.exitScene();
        else
            this.leaveGame();
    };
    DdzDriver.prototype.onResume = function (time) {
        if (time >= 2 * 60)
            this.leaveGame();
    };
    DdzDriver.prototype.onMatchPlayer = function (msg) {
        var _this = this;
        if (!this.inGame)
            return;
        this.enterGame();
        this.mainUI.matchPlayerView.active = true;
        var data = Global.GameData.getGameInfo(DdzGameConst_1.default.Gid);
        var lv = msg._para._glv;
        var arr = data.levels;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].level == lv) {
                this.mainUI.updateLevelBase(arr[i].PointRate);
                //this.mainUI.updateMode(arr[i].clieng_cfg.mode);
                this.mainUI.updateLevel(lv);
                break;
            }
        }
        this.Context.isWaitMatch = true;
        var timeo = Math.ceil((msg._timeo * 1000 - Date.now() + msg._receiveTime) / 1000);
        if (timeo && timeo > 0) {
            this.mainUI.matchPlayerView.setTimeRunConfig(timeo, function () {
                _this.Context.isWaitMatch = false;
                _this.mainUI.matchPlayerView.active = false;
                Global.UI.showYesNoBox('匹配超时，是否重新匹配？', function () {
                    Game.Control.trySendEnter({ "_from": "jump" }); // 断socket则不能用这个
                }, function () {
                    Game.Server.send(_this.Define.CmdLeave, { "IsClose": 1 });
                    _this.leaveGame();
                });
            }, this);
        }
    };
    //进入游戏场景
    DdzDriver.prototype.startScene = function () {
        this.mainUI.node.active = false;
        this.reqEnterGame(DdzGameConst_1.default.Gid, Game.Control.curLv);
    };
    //请求进入房间
    DdzDriver.prototype.reqEnterGame = function (gid, glv, gsc) {
        if (gsc === void 0) { gsc = "default"; }
        Game.Control.connnectAndEnterGameInLevelScene(gid, glv, gsc, null);
    };
    DdzDriver.prototype.exitScene = function () {
        if (!this.inGame) // 1.加延时退出保证服务器收到leave消息避免shutDown掉  2.加return判断已经退出的无须重复执行
            return;
        this.inGame = false;
        Game.Tween.clear();
        Game.Component.unscheduleAllCallbacks();
        if (this.mainUI) {
            this.mainUI.clearWnd();
            //this.mainUI.node.active = false;
            if (this.rulePop)
                this.rulePop.active = false;
            if (this.settingPop)
                this.settingPop.active = false;
        }
        this.Context.clearByGame();
        Game.Control.shutDown();
        Global.Toolkit.transmitHallWindow("WndGameLobbyShell", DdzGameConst_1.default.Gid);
        Game.GamePreloadTool.releaseKeepAsset(DdzGameConst_1.default.Gid, true);
        Global.SceneManager.goToHall();
    };
    DdzDriver.prototype.enterGame = function () {
        this.mainUI.callAllPlayers('hide');
        this.mainUI.clearByRound();
        this.mainUI.clearByGame();
        this.Context.clearByRound();
        //已经在游戏中  不重复播
        if (this.mainUI.node.active)
            return;
        Global.Audio.playGameBundleMusic(DdzPathHelper_1.DdzAudioConst.Bgm1, true);
        var comp = Global.UIHelper.addIntoGameAnimComp(this.mainUI.node, this.loadingUI.node, [], [], [], []);
        comp.maskNode = this.maskNode;
        this.maskNode.opacity = 1;
        this.maskNode.active = true;
        this.mainUI.node.active = true;
        this.maskNode.zIndex = 11;
        var delay = 1;
        comp.startAnimtionByMask(delay, 0, null, null);
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "IntoGameAnimation", delay - 0.3); // 完整时间锁会有停顿感
    };
    DdzDriver.prototype.leaveGame = function () {
        var _this = this;
        Game.Tween.clear();
        Game.Component.unscheduleAllCallbacks();
        // this.Context.clearByGame();      // debug 提前清理可能会导致报错
        // if (this.mainUI){
        //     this.mainUI.clearWnd();
        // }
        this.scheduleOnce(function () {
            _this.exitScene();
        }, 0.5);
    };
    DdzDriver.prototype.beginSync = function () {
        Game.Tween.clear();
        Game.Component.unscheduleAllCallbacks();
        this.mainUI.clearByGame();
    };
    DdzDriver.prototype.reMatchPlayer = function () {
        if (this.Context.session && this.Context.session._glv) {
            this.stopGameConnect();
            var lv = this.Context.session._glv;
            this.reqEnterGame(DdzGameConst_1.default.Gid, lv);
        }
        else {
            Game.Server.send(this.Define.CmdLeave, { "IsClose": 1 });
            this.leaveGame();
        }
    };
    DdzDriver.prototype.stopGameConnect = function () {
        Game.Server.stop();
        Game.Server.clearDst();
        Game.Server.clearData();
    };
    DdzDriver.prototype.openSettingPop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prefab, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.settingPop && cc.isValid(this.settingPop))) return [3 /*break*/, 1];
                        this.settingPop.active = true;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, Game.GamePreloadTool.preloadPrefab(Game.GamePreloadTool.settingPop, true)];
                    case 2:
                        prefab = _a.sent();
                        if (this.mainUI.node && cc.isValid(this.mainUI.node) && prefab && cc.isValid(prefab)) {
                            node = cc.instantiate(prefab);
                            node.setParent(Global.UI.getLayer("PopLayer"));
                            node.active = true;
                            this.settingPop = node;
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DdzDriver.prototype.openRulePop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prefab, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.rulePop && cc.isValid(this.rulePop))) return [3 /*break*/, 1];
                        this.rulePop.active = true;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, Game.GamePreloadTool.preloadPrefab(Game.GamePreloadTool.rulePop, true)];
                    case 2:
                        prefab = _a.sent();
                        if (this.mainUI.node && cc.isValid(this.mainUI.node) && prefab && cc.isValid(prefab)) {
                            node = cc.instantiate(prefab);
                            node.setParent(Global.UI.getLayer("PopLayer"));
                            node.active = true;
                            this.rulePop = node;
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    var DdzDriver_1;
    DdzDriver.instance = null;
    __decorate([
        property(cc.SpriteFrame)
    ], DdzDriver.prototype, "defaultHeadKuang", void 0);
    DdzDriver = DdzDriver_1 = __decorate([
        ccclass
    ], DdzDriver);
    return DdzDriver;
}(cc.Component));
exports.default = DdzDriver;

cc._RF.pop();