"use strict";
cc._RF.push(module, 'ec04fn7llpIlbEZWG7OZVha', 'ErmjDriver');
// ermj/Ermj/scripts/ErmjDriver.ts

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
var ErmjContext_1 = require("./data/ErmjContext");
var ErmjDefine_1 = require("./data/ErmjDefine");
var ErmjPathHelper_1 = require("./data/ErmjPathHelper");
var ErmjGameConst_1 = require("./data/ErmjGameConst");
var ErmjGameCfgHandler_1 = require("./handlers/ErmjGameCfgHandler");
var ErmjEnterHandler_1 = require("./handlers/ErmjEnterHandler");
var ErmjLeaveHandler_1 = require("./handlers/ErmjLeaveHandler");
var ErmjEasyHandler_1 = require("./handlers/ErmjEasyHandler");
var ErmjSyncHandler_1 = require("./handlers/ErmjSyncHandler");
var ErmjDealHandler_1 = require("./handlers/ErmjDealHandler");
var ErmjRewardHandler_1 = require("./handlers/ErmjRewardHandler");
var ErmjDrawCardHandler_1 = require("./handlers/ErmjDrawCardHandler");
var ErmjBankerHandler_1 = require("./handlers/ErmjBankerHandler");
var ErmjChangeFlowerHandler_1 = require("./handlers/ErmjChangeFlowerHandler");
var ErmjCallBlockHandler_1 = require("./handlers/ErmjCallBlockHandler");
var ErmjPlayHandler_1 = require("./handlers/ErmjPlayHandler");
var ErmjWinHandler_1 = require("./handlers/ErmjWinHandler");
var ErmjTingHandler_1 = require("./handlers/ErmjTingHandler");
var ErmjChatHandler_1 = require("./handlers/ErmjChatHandler");
var ErmjAutoHandler_1 = require("./handlers/ErmjAutoHandler");
var ErmjLoadingUI_1 = require("./component/ErmjLoadingUI");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ErmjDriver = /** @class */ (function (_super) {
    __extends(ErmjDriver, _super);
    function ErmjDriver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 默认头像框资源 */
        _this.defaultHeadKuang = null;
        _this.inGame = false; // 处理某些极端场景的报错, 资源预加载时强退到大厅, 场景未来得及销毁时立马又进来
        return _this;
    }
    ErmjDriver_1 = ErmjDriver;
    ErmjDriver.prototype.onLoad = function () {
        ErmjDriver_1.instance = this;
        this.inGame = true;
        this.maskNode = cc.find("mask", this.node);
        this.maskNode.zIndex = 9;
        this.loadingUI = Global.UIHelper.safeGetComponent(this.node, "loading", ErmjLoadingUI_1.default);
        this.loadingUI.node.zIndex = 8;
        this.setupGlobal();
        this.setup();
        ErmjGameConst_1.default.playMusic(ErmjPathHelper_1.ErmjAudioConst.bgm, true);
    };
    //初始化大厅相关逻辑
    ErmjDriver.prototype.setupGlobal = function () {
        //初始化update驱动  初始化timer
        Global.Component.initDriver();
        //初始化Game驱动
        Game.Component.initDriver();
        Global.UI.initUIRoot();
    };
    ErmjDriver.prototype.setup = function () {
        Game.Context = new ErmjContext_1.default();
        this.Context = Game.Context;
        this.Define = new ErmjDefine_1.default();
        this.Path = new ErmjPathHelper_1.default();
        this.SitHelper = new PVPSitHelper();
        this.registHandler(this.Define);
    };
    ErmjDriver.prototype.start = function () {
        Game.Event.on(Game.EVENT_FORCE_LEAVE_GAME, this, this.onForceLeave);
        Game.Event.on(Game.EVENT_NOT_IN_TABLE, this, this.onForceLeave);
        Game.Event.on(Game.EVENT_SOCKET_RECONNECT, this, this.onSocketReconnect);
        Game.Event.on(Game.EVENT_SOCKET_RESUME, this, this.onResume);
        Game.Event.on(Game.EVENT_MATCH_PLAYER, this, this.onMatchPlayer);
    };
    ErmjDriver.prototype.onDestroy = function () {
        Game.Event.off(Game.EVENT_FORCE_LEAVE_GAME, this, this.onForceLeave);
        Game.Event.off(Game.EVENT_NOT_IN_TABLE, this, this.onForceLeave);
        Game.Event.off(Game.EVENT_SOCKET_RECONNECT, this, this.onSocketReconnect);
        Game.Event.off(Game.EVENT_SOCKET_RESUME, this, this.onResume);
        Game.Event.off(Game.EVENT_MATCH_PLAYER, this, this.onMatchPlayer);
        this.unscheduleAllCallbacks();
        ErmjDriver_1.instance = null;
    };
    /**
     * 加载vip头像框，如果使用的不是vip头像框，则使用子游戏默认头像框
     * @param spriteHeadKuang 头像框Sprite
     * @param headkuang vip头像框字符串
     */
    ErmjDriver.prototype.LoadVipHeadKuang = function (spriteHeadKuang, headkuang) {
        // if(headkuang > "0"){
        //     Global.Toolkit.loadLocalHeadFrame(spriteHeadKuang, headkuang);
        // }else{
        //     spriteHeadKuang.spriteFrame = this.defaultHeadKuang;
        // }
        var atlasString = "texture/headFrame/headFrame";
        var sfString = "txkuang_vip" + headkuang;
        Global.ResourceManager.loadBundleAutoAtlas("2101", spriteHeadKuang, atlasString, sfString, null, true);
    };
    ErmjDriver.prototype.registHandler = function (Define) {
        Game.Control.registDefaultHandler();
        Game.Control.registHandler(Define.CmdGameCfg, new ErmjGameCfgHandler_1.default);
        Game.Control.registHandler(Define.CmdEnter, new ErmjEnterHandler_1.default);
        Game.Control.registHandler(Define.CmdLeave, new ErmjLeaveHandler_1.default);
        Game.Control.registHandler(Define.CmdLeaveMatch, new ErmjEasyHandler_1.ErmjLeaveMatchHandler);
        Game.Control.registHandler(Define.CmdRefresh, new ErmjEasyHandler_1.ErmjRefreshHandler);
        Game.Control.registHandler(Define.CmdOffline, new ErmjEasyHandler_1.ErmjOfflineHandler);
        Game.Control.registHandler(Define.CmdSyncEnd, new ErmjSyncHandler_1.ErmjSyncEndHandler);
        Game.Control.registHandler(Define.CmdSyncBegin, new ErmjSyncHandler_1.ErmjSyncBeginHandler);
        Game.Control.registHandler(Define.CmdSyncTable, new ErmjSyncHandler_1.ErmjSyncRefreshHandler);
        Game.Control.registHandler(Define.CmdCallReady, new ErmjEasyHandler_1.ErmjReadyHandler);
        Game.Control.registHandler(Define.CmdGameStart, new ErmjEasyHandler_1.ErmjStartHandler);
        Game.Control.registHandler(Define.CmdBanker, new ErmjBankerHandler_1.default);
        Game.Control.registHandler(Define.CmdDeal, new ErmjDealHandler_1.default);
        Game.Control.registHandler(Define.CmdChangeFlower, new ErmjChangeFlowerHandler_1.default);
        Game.Control.registHandler(Define.CmdPlayStart, new ErmjPlayHandler_1.ErmjPlayStartHandler);
        Game.Control.registHandler(Define.CmdDrawCard, new ErmjDrawCardHandler_1.default);
        Game.Control.registHandler(Define.CmdCallPlay, new ErmjPlayHandler_1.ErmjCallPlayHandler);
        Game.Control.registHandler(Define.CmdPlay, new ErmjPlayHandler_1.ErmjPlayHandler);
        Game.Control.registHandler(Define.CmdChow, new ErmjPlayHandler_1.ErmjChowHandler);
        Game.Control.registHandler(Define.CmdPong, new ErmjPlayHandler_1.ErmjPongHandler);
        Game.Control.registHandler(Define.CmdKong, new ErmjPlayHandler_1.ErmjKongHandler);
        Game.Control.registHandler(Define.CmdCallTing, new ErmjTingHandler_1.ErmjCallTingHandler);
        Game.Control.registHandler(Define.CmdTing, new ErmjTingHandler_1.ErmjTingHandler);
        Game.Control.registHandler(Define.CmdTingResult, new ErmjTingHandler_1.ErmjTingResultHandler);
        Game.Control.registHandler(Define.CmdCallSelfBlock, new ErmjCallBlockHandler_1.ErmjCallSelfBlockHandler);
        Game.Control.registHandler(Define.CmdCallOtherBlock, new ErmjCallBlockHandler_1.ErmjCallOtherBlockHandler);
        Game.Control.registHandler(Define.CmdWin, new ErmjWinHandler_1.default);
        Game.Control.registHandler(Define.CmdReward, new ErmjRewardHandler_1.default);
        Game.Control.registHandler(Define.CmdGameEnd, new ErmjEasyHandler_1.ErmjEndHandler);
        Game.Control.registHandler(Define.CmdWait, new ErmjEasyHandler_1.ErmjWaitHandler);
        Game.Control.registHandler(Define.CmdChat, new ErmjChatHandler_1.default);
        Game.Control.registHandler(Define.CmdAuto, new ErmjAutoHandler_1.default);
    };
    //重连时需要先清理玩家列表，后续重新进入
    ErmjDriver.prototype.onSocketReconnect = function () {
        if (this.mainUI) {
            Global.Audio.stopAllEffect();
            Game.Tween.clear();
            Game.Component.unscheduleAllCallbacks();
            this.mainUI.clearWnd();
            this.Context.clearByGame();
        }
    };
    ErmjDriver.prototype.onForceLeave = function (forceGoToHall) {
        if (forceGoToHall)
            this.exitScene();
        else
            this.leaveGame();
    };
    ErmjDriver.prototype.onResume = function (time) {
        // if (time >= 2 * 60)
        //     this.leaveGame();
    };
    //进入游戏场景
    ErmjDriver.prototype.startScene = function () {
        this.mainUI.node.active = false;
        this.reqEnterGame(ErmjGameConst_1.default.Gid, Game.Control.curLv);
    };
    // //请求进入房间
    ErmjDriver.prototype.reqEnterGame = function (gid, glv, gsc) {
        if (gsc === void 0) { gsc = "default"; }
        Game.Control.connnectAndEnterGameInLevelScene(gid, glv, gsc, null);
    };
    ErmjDriver.prototype.enterGame = function () {
        this.mainUI.callAllPlayers('hide');
        this.mainUI.clearByRound();
        this.mainUI.clearByGame();
        this.Context.clearByRound();
        //已经在游戏中  不重复播
        if (this.mainUI.node.active)
            return;
        ErmjGameConst_1.default.playMusic(ErmjPathHelper_1.ErmjAudioConst.bgm, true);
        var comp = Global.UIHelper.addIntoGameAnimComp(this.mainUI.node, this.loadingUI.node, [], [], [], []);
        comp.maskNode = this.maskNode;
        this.maskNode.opacity = 1;
        this.maskNode.active = true;
        this.mainUI.node.active = true;
        comp.startAnimtionByMask(1, 0, null, null);
    };
    ErmjDriver.prototype.leaveGame = function () {
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
    ErmjDriver.prototype.exitScene = function () {
        if (!this.inGame) // 1.加延时退出保证服务器收到leave消息避免shutDown掉  2.加return判断已经退出的无须重复执行
            return;
        this.inGame = false;
        Game.Tween.clear();
        Game.Component.unscheduleAllCallbacks();
        if (this.mainUI) {
            this.mainUI.clearWnd();
            if (this.rulePop)
                this.rulePop.active = false;
            if (this.settingPop)
                this.settingPop.active = false;
        }
        this.Context.clearByGame();
        Game.Control.shutDown();
        Global.Toolkit.transmitHallWindow("WndGameLobbyShell", ErmjGameConst_1.default.Gid);
        Game.GamePreloadTool.releaseKeepAsset(ErmjGameConst_1.default.Gid, true);
        Global.SceneManager.goToHall();
    };
    ErmjDriver.prototype.beginSync = function () {
        Game.Tween.clear();
        Game.Component.unscheduleAllCallbacks();
        this.mainUI.clearByGame();
    };
    ErmjDriver.prototype.reMatchPlayer = function () {
        if (this.Context.session && this.Context.session._glv) {
            this.stopGameConnect();
            var lv = this.Context.session._glv;
            this.reqEnterGame(ErmjGameConst_1.default.Gid, lv);
        }
        else {
            Game.Server.send(this.Define.CmdLeave, { "IsClose": 1 });
            this.leaveGame();
        }
    };
    ErmjDriver.prototype.stopGameConnect = function () {
        Game.Server.stop();
        Game.Server.clearDst();
        Game.Server.clearData();
    };
    ErmjDriver.prototype.onMatchPlayer = function (msg) {
        if (!this.inGame)
            return;
        this.enterGame();
        this.Context.isWaitMatch = true;
        var data = Global.GameData.getGameInfo(ErmjGameConst_1.default.Gid);
        var lv = msg._para._glv;
        var arr = data.levels;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].level == lv) {
                this.mainUI.updateLevelBase(arr[i].PointRate, lv);
                break;
            }
        }
        var timeo = Math.ceil((msg._timeo * 1000 - Date.now() + msg._receiveTime) / 1000);
        this.mainUI.showMatch(timeo);
    };
    ErmjDriver.prototype.openSettingPop = function () {
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
    ErmjDriver.prototype.openRulePop = function () {
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
    var ErmjDriver_1;
    ErmjDriver.instance = null;
    __decorate([
        property(cc.SpriteFrame)
    ], ErmjDriver.prototype, "defaultHeadKuang", void 0);
    ErmjDriver = ErmjDriver_1 = __decorate([
        ccclass
    ], ErmjDriver);
    return ErmjDriver;
}(cc.Component));
exports.default = ErmjDriver;

cc._RF.pop();