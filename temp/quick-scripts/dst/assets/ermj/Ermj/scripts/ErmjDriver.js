
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/ErmjDriver.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcRXJtakRyaXZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBNkM7QUFDN0MsZ0RBQTJDO0FBQzNDLHdEQUF1RTtBQUN2RSxzREFBaUQ7QUFDakQsb0VBQStEO0FBQy9ELGdFQUEyRDtBQUMzRCxnRUFBMkQ7QUFDM0QsOERBQWdMO0FBQ2hMLDhEQUE4RztBQUM5Ryw4REFBeUQ7QUFDekQsa0VBQTZEO0FBQzdELHNFQUFpRTtBQUNqRSxrRUFBNkQ7QUFDN0QsOEVBQXlFO0FBQ3pFLHdFQUFzRztBQUN0Ryw4REFBMko7QUFDM0osNERBQXVEO0FBQ3ZELDhEQUF5RztBQUN6Ryw4REFBeUQ7QUFDekQsOERBQXlEO0FBQ3pELDJEQUFzRDtBQUloRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQztJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQTRSQztRQTNSRyxjQUFjO1FBRWQsc0JBQWdCLEdBQWtCLElBQUksQ0FBQztRQWVoQyxZQUFNLEdBQUcsS0FBSyxDQUFDLENBQUssMkNBQTJDOztJQTBRMUUsQ0FBQzttQkE1Um9CLFVBQVU7SUFvQjNCLDJCQUFNLEdBQU47UUFDSSxZQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFB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QU8sR0FBRyxJQUFJLENBQUM7eUJBQ3ZCOzs7Ozs7S0FFUjs7SUF2Uk0sbUJBQVEsR0FBZSxJQUFJLENBQUM7SUFEbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzt3REFDYztJQUh0QixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBNFI5QjtJQUFELGlCQUFDO0NBNVJELEFBNFJDLENBNVJ1QyxFQUFFLENBQUMsU0FBUyxHQTRSbkQ7a0JBNVJvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVybWpDb250ZXh0IGZyb20gXCIuL2RhdGEvRXJtakNvbnRleHRcIjtcclxuaW1wb3J0IEVybWpEZWZpbmUgZnJvbSBcIi4vZGF0YS9Fcm1qRGVmaW5lXCI7XHJcbmltcG9ydCBFcm1qUGF0aEhlbHBlciwgeyBFcm1qQXVkaW9Db25zdCB9IGZyb20gXCIuL2RhdGEvRXJtalBhdGhIZWxwZXJcIjtcclxuaW1wb3J0IEVybWpHYW1lQ29uc3QgZnJvbSBcIi4vZGF0YS9Fcm1qR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBFcm1qR2FtZUNmZ0hhbmRsZXIgZnJvbSBcIi4vaGFuZGxlcnMvRXJtakdhbWVDZmdIYW5kbGVyXCI7XHJcbmltcG9ydCBFcm1qRW50ZXJIYW5kbGVyIGZyb20gXCIuL2hhbmRsZXJzL0VybWpFbnRlckhhbmRsZXJcIjtcclxuaW1wb3J0IEVybWpMZWF2ZUhhbmRsZXIgZnJvbSBcIi4vaGFuZGxlcnMvRXJtakxlYXZlSGFuZGxlclwiO1xyXG5pbXBvcnQgeyBFcm1qTGVhdmVNYXRjaEhhbmRsZXIsIEVybWpSZWZyZXNoSGFuZGxlciwgRXJtak9mZmxpbmVIYW5kbGVyLCBFcm1qU3RhcnRIYW5kbGVyLCBFcm1qRW5kSGFuZGxlciwgRXJtaldhaXRIYW5kbGVyLCBFcm1qUmVhZHlIYW5kbGVyIH0gZnJvbSBcIi4vaGFuZGxlcnMvRXJtakVhc3lIYW5kbGVyXCI7XHJcbmltcG9ydCB7IEVybWpTeW5jRW5kSGFuZGxlciwgRXJtalN5bmNCZWdpbkhhbmRsZXIsIEVybWpTeW5jUmVmcmVzaEhhbmRsZXIgfSBmcm9tIFwiLi9oYW5kbGVycy9Fcm1qU3luY0hhbmRsZXJcIjtcclxuaW1wb3J0IEVybWpEZWFsSGFuZGxlciBmcm9tIFwiLi9oYW5kbGVycy9Fcm1qRGVhbEhhbmRsZXJcIjtcclxuaW1wb3J0IEVybWpSZXdhcmRIYW5kbGVyIGZyb20gXCIuL2hhbmRsZXJzL0VybWpSZXdhcmRIYW5kbGVyXCI7XHJcbmltcG9ydCBFcm1qRHJhd0NhcmRIYW5kbGVyIGZyb20gXCIuL2hhbmRsZXJzL0VybWpEcmF3Q2FyZEhhbmRsZXJcIjtcclxuaW1wb3J0IEVybWpCYW5rZXJIYW5kbGVyIGZyb20gXCIuL2hhbmRsZXJzL0VybWpCYW5rZXJIYW5kbGVyXCI7XHJcbmltcG9ydCBFcm1qQ2hhbmdlRmxvd2VySGFuZGxlciBmcm9tIFwiLi9oYW5kbGVycy9Fcm1qQ2hhbmdlRmxvd2VySGFuZGxlclwiO1xyXG5pbXBvcnQgeyBFcm1qQ2FsbFNlbGZCbG9ja0hhbmRsZXIsIEVybWpDYWxsT3RoZXJCbG9ja0hhbmRsZXIgfSBmcm9tIFwiLi9oYW5kbGVycy9Fcm1qQ2FsbEJsb2NrSGFuZGxlclwiO1xyXG5pbXBvcnQgeyBFcm1qUGxheVN0YXJ0SGFuZGxlciwgRXJtakNhbGxQbGF5SGFuZGxlciwgRXJtalBsYXlIYW5kbGVyLCBFcm1qQ2hvd0hhbmRsZXIsIEVybWpQb25nSGFuZGxlciwgRXJtaktvbmdIYW5kbGVyIH0gZnJvbSBcIi4vaGFuZGxlcnMvRXJtalBsYXlIYW5kbGVyXCI7XHJcbmltcG9ydCBFcm1qV2luSGFuZGxlciBmcm9tIFwiLi9oYW5kbGVycy9Fcm1qV2luSGFuZGxlclwiO1xyXG5pbXBvcnQgeyBFcm1qQ2FsbFRpbmdIYW5kbGVyLCBFcm1qVGluZ0hhbmRsZXIsIEVybWpUaW5nUmVzdWx0SGFuZGxlciB9IGZyb20gXCIuL2hhbmRsZXJzL0VybWpUaW5nSGFuZGxlclwiO1xyXG5pbXBvcnQgRXJtakNoYXRIYW5kbGVyIGZyb20gXCIuL2hhbmRsZXJzL0VybWpDaGF0SGFuZGxlclwiO1xyXG5pbXBvcnQgRXJtakF1dG9IYW5kbGVyIGZyb20gXCIuL2hhbmRsZXJzL0VybWpBdXRvSGFuZGxlclwiO1xyXG5pbXBvcnQgRXJtakxvYWRpbmdVSSBmcm9tIFwiLi9jb21wb25lbnQvRXJtakxvYWRpbmdVSVwiO1xyXG5pbXBvcnQgRXJtak1haW5VSSBmcm9tIFwiLi9wYW5lbC9Fcm1qTWFpblVJXCI7XHJcbmltcG9ydCBFcm1qT3V0TWpWaWV3TWFuYWdlciBmcm9tIFwiLi9tYW5hZ2VyL0VybWpPdXRNalZpZXdNYW5hZ2VyXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJtakRyaXZlciBleHRlbmRzIGNjLkNvbXBvbmVudHtcclxuICAgIC8qKiDpu5jorqTlpLTlg4/moYbotYTmupAgKi9cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIGRlZmF1bHRIZWFkS3Vhbmc6Y2MuU3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgc3RhdGljIGluc3RhbmNlOiBFcm1qRHJpdmVyID0gbnVsbDtcclxuICAgIHB1YmxpYyBtYXNrTm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgbG9hZGluZ1VJOiBFcm1qTG9hZGluZ1VJO1xyXG5cclxuICAgIHB1YmxpYyBDb250ZXh0OiBFcm1qQ29udGV4dDtcclxuICAgIHB1YmxpYyBEZWZpbmU6IEVybWpEZWZpbmU7XHJcbiAgICBwdWJsaWMgUGF0aDogRXJtalBhdGhIZWxwZXI7XHJcbiAgICBwdWJsaWMgU2l0SGVscGVyOiBQVlBTaXRIZWxwZXI7XHJcbiAgICBcclxuICAgIHB1YmxpYyBtYWluVUk6IEVybWpNYWluVUk7XHJcbiAgICBwdWJsaWMgb3V0TWpNYW5hZ2VyOiBFcm1qT3V0TWpWaWV3TWFuYWdlcjtcclxuXHJcbiAgICBwdWJsaWMgc2V0dGluZ1BvcDogY2MuTm9kZTtcclxuICAgIHB1YmxpYyBydWxlUG9wOiBjYy5Ob2RlO1xyXG4gICAgcHVibGljIGluR2FtZSA9IGZhbHNlOyAgICAgLy8g5aSE55CG5p+Q5Lqb5p6B56uv5Zy65pmv55qE5oql6ZSZLCDotYTmupDpooTliqDovb3ml7blvLrpgIDliLDlpKfljoUsIOWcuuaZr+acquadpeW+l+WPiumUgOavgeaXtueri+mprOWPiOi/m+adpVxyXG5cclxuICAgIG9uTG9hZCgpe1xyXG4gICAgICAgIEVybWpEcml2ZXIuaW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuaW5HYW1lID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1hc2tOb2RlID0gY2MuZmluZChcIm1hc2tcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLm1hc2tOb2RlLnpJbmRleCA9IDk7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nVUkgPSBHbG9iYWwuVUlIZWxwZXIuc2FmZUdldENvbXBvbmVudCh0aGlzLm5vZGUsIFwibG9hZGluZ1wiLCBFcm1qTG9hZGluZ1VJKTtcclxuICAgICAgICB0aGlzLmxvYWRpbmdVSS5ub2RlLnpJbmRleCA9IDg7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0dXBHbG9iYWwoKTtcclxuICAgICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICAgICAgRXJtakdhbWVDb25zdC5wbGF5TXVzaWMoRXJtakF1ZGlvQ29uc3QuYmdtLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMluWkp+WOheebuOWFs+mAu+i+kVxyXG4gICAgcHJpdmF0ZSBzZXR1cEdsb2JhbCgpe1xyXG4gICAgICAgIC8v5Yid5aeL5YyWdXBkYXRl6amx5YqoICDliJ3lp4vljJZ0aW1lclxyXG4gICAgICAgIEdsb2JhbC5Db21wb25lbnQuaW5pdERyaXZlcigpO1xyXG4gICAgICAgIC8v5Yid5aeL5YyWR2FtZempseWKqFxyXG4gICAgICAgIEdhbWUuQ29tcG9uZW50LmluaXREcml2ZXIoKTtcclxuICAgICAgICBHbG9iYWwuVUkuaW5pdFVJUm9vdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0dXAoKXtcclxuICAgICAgICBHYW1lLkNvbnRleHQgPSBuZXcgRXJtakNvbnRleHQoKTtcclxuICAgICAgICB0aGlzLkNvbnRleHQgPSBHYW1lLkNvbnRleHQ7XHJcbiAgICAgICAgdGhpcy5EZWZpbmUgPSBuZXcgRXJtakRlZmluZSgpO1xyXG4gICAgICAgIHRoaXMuUGF0aCA9IG5ldyBFcm1qUGF0aEhlbHBlcigpO1xyXG4gICAgICAgIHRoaXMuU2l0SGVscGVyID0gbmV3IFBWUFNpdEhlbHBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLnJlZ2lzdEhhbmRsZXIodGhpcy5EZWZpbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCl7XHJcbiAgICAgICAgR2FtZS5FdmVudC5vbihHYW1lLkVWRU5UX0ZPUkNFX0xFQVZFX0dBTUUsIHRoaXMsIHRoaXMub25Gb3JjZUxlYXZlKTtcclxuICAgICAgICBHYW1lLkV2ZW50Lm9uKEdhbWUuRVZFTlRfTk9UX0lOX1RBQkxFLCB0aGlzLCB0aGlzLm9uRm9yY2VMZWF2ZSk7XHJcbiAgICAgICAgR2FtZS5FdmVudC5vbihHYW1lLkVWRU5UX1NPQ0tFVF9SRUNPTk5FQ1QsIHRoaXMsIHRoaXMub25Tb2NrZXRSZWNvbm5lY3QpO1xyXG4gICAgICAgIEdhbWUuRXZlbnQub24oR2FtZS5FVkVOVF9TT0NLRVRfUkVTVU1FLCB0aGlzLCB0aGlzLm9uUmVzdW1lKTtcclxuICAgICAgICBHYW1lLkV2ZW50Lm9uKEdhbWUuRVZFTlRfTUFUQ0hfUExBWUVSLCB0aGlzLCB0aGlzLm9uTWF0Y2hQbGF5ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpe1xyXG4gICAgICAgIEdhbWUuRXZlbnQub2ZmKEdhbWUuRVZFTlRfRk9SQ0VfTEVBVkVfR0FNRSwgdGhpcywgdGhpcy5vbkZvcmNlTGVhdmUpO1xyXG4gICAgICAgIEdhbWUuRXZlbnQub2ZmKEdhbWUuRVZFTlRfTk9UX0lOX1RBQkxFLCB0aGlzLCB0aGlzLm9uRm9yY2VMZWF2ZSk7XHJcbiAgICAgICAgR2FtZS5FdmVudC5vZmYoR2FtZS5FVkVOVF9TT0NLRVRfUkVDT05ORUNULCB0aGlzLCB0aGlzLm9uU29ja2V0UmVjb25uZWN0KTtcclxuICAgICAgICBHYW1lLkV2ZW50Lm9mZihHYW1lLkVWRU5UX1NPQ0tFVF9SRVNVTUUsIHRoaXMsIHRoaXMub25SZXN1bWUpO1xyXG4gICAgICAgIEdhbWUuRXZlbnQub2ZmKEdhbWUuRVZFTlRfTUFUQ0hfUExBWUVSLCB0aGlzLCB0aGlzLm9uTWF0Y2hQbGF5ZXIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIEVybWpEcml2ZXIuaW5zdGFuY2UgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L29dmlw5aS05YOP5qGG77yM5aaC5p6c5L2/55So55qE5LiN5pivdmlw5aS05YOP5qGG77yM5YiZ5L2/55So5a2Q5ri45oiP6buY6K6k5aS05YOP5qGGXHJcbiAgICAgKiBAcGFyYW0gc3ByaXRlSGVhZEt1YW5nIOWktOWDj+ahhlNwcml0ZVxyXG4gICAgICogQHBhcmFtIGhlYWRrdWFuZyB2aXDlpLTlg4/moYblrZfnrKbkuLJcclxuICAgICAqL1xyXG4gICAgTG9hZFZpcEhlYWRLdWFuZyhzcHJpdGVIZWFkS3Vhbmc6Y2MuU3ByaXRlLCBoZWFka3Vhbmc6c3RyaW5nKXtcclxuICAgICAgICAvLyBpZihoZWFka3VhbmcgPiBcIjBcIil7XHJcbiAgICAgICAgLy8gICAgIEdsb2JhbC5Ub29sa2l0LmxvYWRMb2NhbEhlYWRGcmFtZShzcHJpdGVIZWFkS3VhbmcsIGhlYWRrdWFuZyk7XHJcbiAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgLy8gICAgIHNwcml0ZUhlYWRLdWFuZy5zcHJpdGVGcmFtZSA9IHRoaXMuZGVmYXVsdEhlYWRLdWFuZztcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdmFyIGF0bGFzU3RyaW5nID0gXCJ0ZXh0dXJlL2hlYWRGcmFtZS9oZWFkRnJhbWVcIjtcclxuICAgICAgICB2YXIgc2ZTdHJpbmcgPSBcInR4a3VhbmdfdmlwXCIgKyBoZWFka3Vhbmc7XHJcbiAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQnVuZGxlQXV0b0F0bGFzKFwiMjEwMVwiLCBzcHJpdGVIZWFkS3VhbmcsIGF0bGFzU3RyaW5nLCBzZlN0cmluZywgbnVsbCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWdpc3RIYW5kbGVyKERlZmluZTpFcm1qRGVmaW5lKXtcclxuICAgICAgICBHYW1lLkNvbnRyb2wucmVnaXN0RGVmYXVsdEhhbmRsZXIoKTtcclxuXHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoRGVmaW5lLkNtZEdhbWVDZmcsIG5ldyBFcm1qR2FtZUNmZ0hhbmRsZXIpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWRFbnRlciwgbmV3IEVybWpFbnRlckhhbmRsZXIpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWRMZWF2ZSwgbmV3IEVybWpMZWF2ZUhhbmRsZXIpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWRMZWF2ZU1hdGNoLCBuZXcgRXJtakxlYXZlTWF0Y2hIYW5kbGVyKTtcclxuICAgICAgICBHYW1lLkNvbnRyb2wucmVnaXN0SGFuZGxlcihEZWZpbmUuQ21kUmVmcmVzaCwgbmV3IEVybWpSZWZyZXNoSGFuZGxlcik7XHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoRGVmaW5lLkNtZE9mZmxpbmUsIG5ldyBFcm1qT2ZmbGluZUhhbmRsZXIpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWRTeW5jRW5kLCBuZXcgRXJtalN5bmNFbmRIYW5kbGVyKTtcclxuICAgICAgICBHYW1lLkNvbnRyb2wucmVnaXN0SGFuZGxlcihEZWZpbmUuQ21kU3luY0JlZ2luLCBuZXcgRXJtalN5bmNCZWdpbkhhbmRsZXIpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWRTeW5jVGFibGUsIG5ldyBFcm1qU3luY1JlZnJlc2hIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoRGVmaW5lLkNtZENhbGxSZWFkeSwgbmV3IEVybWpSZWFkeUhhbmRsZXIpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWRHYW1lU3RhcnQsIG5ldyBFcm1qU3RhcnRIYW5kbGVyKTtcclxuICAgICAgICBHYW1lLkNvbnRyb2wucmVnaXN0SGFuZGxlcihEZWZpbmUuQ21kQmFua2VyLCBuZXcgRXJtakJhbmtlckhhbmRsZXIpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWREZWFsLCBuZXcgRXJtakRlYWxIYW5kbGVyKTtcclxuICAgICAgICBHYW1lLkNvbnRyb2wucmVnaXN0SGFuZGxlcihEZWZpbmUuQ21kQ2hhbmdlRmxvd2VyLCBuZXcgRXJtakNoYW5nZUZsb3dlckhhbmRsZXIpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWRQbGF5U3RhcnQsIG5ldyBFcm1qUGxheVN0YXJ0SGFuZGxlcik7XHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoRGVmaW5lLkNtZERyYXdDYXJkLCBuZXcgRXJtakRyYXdDYXJkSGFuZGxlcik7XHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoRGVmaW5lLkNtZENhbGxQbGF5LCBuZXcgRXJtakNhbGxQbGF5SGFuZGxlcik7XHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoRGVmaW5lLkNtZFBsYXksIG5ldyBFcm1qUGxheUhhbmRsZXIpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWRDaG93LCBuZXcgRXJtakNob3dIYW5kbGVyKTtcclxuICAgICAgICBHYW1lLkNvbnRyb2wucmVnaXN0SGFuZGxlcihEZWZpbmUuQ21kUG9uZywgbmV3IEVybWpQb25nSGFuZGxlcik7XHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoRGVmaW5lLkNtZEtvbmcsIG5ldyBFcm1qS29uZ0hhbmRsZXIpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWRDYWxsVGluZywgbmV3IEVybWpDYWxsVGluZ0hhbmRsZXIpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWRUaW5nLCBuZXcgRXJtalRpbmdIYW5kbGVyKTtcclxuICAgICAgICBHYW1lLkNvbnRyb2wucmVnaXN0SGFuZGxlcihEZWZpbmUuQ21kVGluZ1Jlc3VsdCwgbmV3IEVybWpUaW5nUmVzdWx0SGFuZGxlcik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoRGVmaW5lLkNtZENhbGxTZWxmQmxvY2ssIG5ldyBFcm1qQ2FsbFNlbGZCbG9ja0hhbmRsZXIpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWRDYWxsT3RoZXJCbG9jaywgbmV3IEVybWpDYWxsT3RoZXJCbG9ja0hhbmRsZXIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWRXaW4sIG5ldyBFcm1qV2luSGFuZGxlcik7XHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoRGVmaW5lLkNtZFJld2FyZCwgbmV3IEVybWpSZXdhcmRIYW5kbGVyKTtcclxuICAgICAgICBHYW1lLkNvbnRyb2wucmVnaXN0SGFuZGxlcihEZWZpbmUuQ21kR2FtZUVuZCwgbmV3IEVybWpFbmRIYW5kbGVyKTtcclxuICAgICAgICBHYW1lLkNvbnRyb2wucmVnaXN0SGFuZGxlcihEZWZpbmUuQ21kV2FpdCwgbmV3IEVybWpXYWl0SGFuZGxlcik7XHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoRGVmaW5lLkNtZENoYXQsIG5ldyBFcm1qQ2hhdEhhbmRsZXIpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWRBdXRvLCBuZXcgRXJtakF1dG9IYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+mHjei/nuaXtumcgOimgeWFiOa4heeQhueOqeWutuWIl+ihqO+8jOWQjue7remHjeaWsOi/m+WFpVxyXG4gICAgcHJpdmF0ZSBvblNvY2tldFJlY29ubmVjdCgpe1xyXG4gICAgICAgIGlmKHRoaXMubWFpblVJKXtcclxuICAgICAgICAgICAgR2xvYmFsLkF1ZGlvLnN0b3BBbGxFZmZlY3QoKTtcclxuICAgICAgICAgICAgR2FtZS5Ud2Vlbi5jbGVhcigpO1xyXG4gICAgICAgICAgICBHYW1lLkNvbXBvbmVudC51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLmNsZWFyV25kKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ29udGV4dC5jbGVhckJ5R2FtZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uRm9yY2VMZWF2ZShmb3JjZUdvVG9IYWxsKXtcclxuICAgICAgICBpZihmb3JjZUdvVG9IYWxsKVxyXG4gICAgICAgICAgICB0aGlzLmV4aXRTY2VuZSgpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5sZWF2ZUdhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uUmVzdW1lKHRpbWUpe1xyXG4gICAgICAgIC8vIGlmICh0aW1lID49IDIgKiA2MClcclxuICAgICAgICAvLyAgICAgdGhpcy5sZWF2ZUdhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+i/m+WFpea4uOaIj+WcuuaZr1xyXG4gICAgcHVibGljIHN0YXJ0U2NlbmUoKXtcclxuICAgICAgICB0aGlzLm1haW5VSS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVxRW50ZXJHYW1lKEVybWpHYW1lQ29uc3QuR2lkLCBHYW1lLkNvbnRyb2wuY3VyTHYpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC8v6K+35rGC6L+b5YWl5oi/6Ze0XHJcbiAgICBwdWJsaWMgcmVxRW50ZXJHYW1lKGdpZDogbnVtYmVyLCBnbHY6c3RyaW5nLCBnc2M6c3RyaW5nID0gXCJkZWZhdWx0XCIpe1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5jb25ubmVjdEFuZEVudGVyR2FtZUluTGV2ZWxTY2VuZShnaWQsIGdsdiwgZ3NjLCBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW50ZXJHYW1lKCl7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuY2FsbEFsbFBsYXllcnMoJ2hpZGUnKTtcclxuICAgICAgICB0aGlzLm1haW5VSS5jbGVhckJ5Um91bmQoKTtcclxuICAgICAgICB0aGlzLm1haW5VSS5jbGVhckJ5R2FtZSgpO1xyXG4gICAgICAgIHRoaXMuQ29udGV4dC5jbGVhckJ5Um91bmQoKTtcclxuICAgICAgICAvL+W3sue7j+WcqOa4uOaIj+S4rSAg5LiN6YeN5aSN5pKtXHJcbiAgICAgICAgaWYgKHRoaXMubWFpblVJLm5vZGUuYWN0aXZlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgRXJtakdhbWVDb25zdC5wbGF5TXVzaWMoRXJtakF1ZGlvQ29uc3QuYmdtLCB0cnVlKTsgIFxyXG4gICAgICAgIGxldCBjb21wID0gR2xvYmFsLlVJSGVscGVyLmFkZEludG9HYW1lQW5pbUNvbXAodGhpcy5tYWluVUkubm9kZSwgdGhpcy5sb2FkaW5nVUkubm9kZSwgW10sIFtdLCBbXSwgW10pO1xyXG4gICAgICAgIGNvbXAubWFza05vZGUgPSB0aGlzLm1hc2tOb2RlO1xyXG4gICAgICAgIHRoaXMubWFza05vZGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgdGhpcy5tYXNrTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubWFpblVJLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjb21wLnN0YXJ0QW5pbXRpb25CeU1hc2soMSwgMCwgbnVsbCwgbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxlYXZlR2FtZSgpe1xyXG4gICAgICAgIEdhbWUuVHdlZW4uY2xlYXIoKTtcclxuICAgICAgICBHYW1lLkNvbXBvbmVudC51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgLy8gdGhpcy5Db250ZXh0LmNsZWFyQnlHYW1lKCk7ICAgICAgLy8gZGVidWcg5o+Q5YmN5riF55CG5Y+v6IO95Lya5a+86Ie05oql6ZSZXHJcbiAgICAgICAgLy8gaWYgKHRoaXMubWFpblVJKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5tYWluVUkuY2xlYXJXbmQoKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5leGl0U2NlbmUoKTtcclxuICAgICAgICB9LCAwLjUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleGl0U2NlbmUoKXtcclxuICAgICAgICBpZiAoIXRoaXMuaW5HYW1lKSAgICAgICAvLyAxLuWKoOW7tuaXtumAgOWHuuS/neivgeacjeWKoeWZqOaUtuWIsGxlYXZl5raI5oGv6YG/5YWNc2h1dERvd27mjokgIDIu5YqgcmV0dXJu5Yik5pat5bey57uP6YCA5Ye655qE5peg6aG76YeN5aSN5omn6KGMXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmluR2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIEdhbWUuVHdlZW4uY2xlYXIoKTtcclxuICAgICAgICBHYW1lLkNvbXBvbmVudC51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgaWYgKHRoaXMubWFpblVJKXtcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkuY2xlYXJXbmQoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucnVsZVBvcClcclxuICAgICAgICAgICAgICAgIHRoaXMucnVsZVBvcC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ1BvcClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ1BvcC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5Db250ZXh0LmNsZWFyQnlHYW1lKCk7XHJcbiAgICAgICAgR2FtZS5Db250cm9sLnNodXREb3duKCk7XHJcbiAgICAgICAgR2xvYmFsLlRvb2xraXQudHJhbnNtaXRIYWxsV2luZG93KFwiV25kR2FtZUxvYmJ5U2hlbGxcIiwgRXJtakdhbWVDb25zdC5HaWQpO1xyXG4gICAgICAgIEdhbWUuR2FtZVByZWxvYWRUb29sLnJlbGVhc2VLZWVwQXNzZXQoRXJtakdhbWVDb25zdC5HaWQsIHRydWUpO1xyXG4gICAgICAgIEdsb2JhbC5TY2VuZU1hbmFnZXIuZ29Ub0hhbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYmVnaW5TeW5jKCl7XHJcbiAgICAgICAgR2FtZS5Ud2Vlbi5jbGVhcigpO1xyXG4gICAgICAgIEdhbWUuQ29tcG9uZW50LnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICB0aGlzLm1haW5VSS5jbGVhckJ5R2FtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZU1hdGNoUGxheWVyKCl7XHJcbiAgICAgICAgaWYodGhpcy5Db250ZXh0LnNlc3Npb24gJiYgdGhpcy5Db250ZXh0LnNlc3Npb24uX2dsdil7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcEdhbWVDb25uZWN0KCk7ICAgIFxyXG4gICAgICAgICAgICBsZXQgbHYgPSB0aGlzLkNvbnRleHQuc2Vzc2lvbi5fZ2x2O1xyXG4gICAgICAgICAgICB0aGlzLnJlcUVudGVyR2FtZShFcm1qR2FtZUNvbnN0LkdpZCwgbHYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBHYW1lLlNlcnZlci5zZW5kKHRoaXMuRGVmaW5lLkNtZExlYXZlLCB7IFwiSXNDbG9zZVwiOiAxIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmxlYXZlR2FtZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RvcEdhbWVDb25uZWN0KCl7XHJcbiAgICAgICAgR2FtZS5TZXJ2ZXIuc3RvcCgpO1xyXG4gICAgICAgIEdhbWUuU2VydmVyLmNsZWFyRHN0KCk7XHJcbiAgICAgICAgR2FtZS5TZXJ2ZXIuY2xlYXJEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk1hdGNoUGxheWVyKG1zZyl7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluR2FtZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuZW50ZXJHYW1lKCk7XHJcbiAgICAgICAgdGhpcy5Db250ZXh0LmlzV2FpdE1hdGNoID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSBHbG9iYWwuR2FtZURhdGEuZ2V0R2FtZUluZm8oRXJtakdhbWVDb25zdC5HaWQpO1xyXG4gICAgICAgIGxldCBsdiA9IG1zZy5fcGFyYS5fZ2x2O1xyXG4gICAgICAgIGxldCBhcnIgPSBkYXRhLmxldmVscztcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYgKGFycltpXS5sZXZlbCA9PSBsdil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5VSS51cGRhdGVMZXZlbEJhc2UoYXJyW2ldLlBvaW50UmF0ZSwgbHYpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRpbWVvID0gTWF0aC5jZWlsKChtc2cuX3RpbWVvICogMTAwMCAtIERhdGUubm93KCkgKyBtc2cuX3JlY2VpdmVUaW1lKSAvIDEwMDApO1xyXG4gICAgICAgIHRoaXMubWFpblVJLnNob3dNYXRjaCh0aW1lbyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIG9wZW5TZXR0aW5nUG9wKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ1BvcCAmJiBjYy5pc1ZhbGlkKHRoaXMuc2V0dGluZ1BvcCkpe1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdQb3AuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbGV0IHByZWZhYiA9IGF3YWl0IEdhbWUuR2FtZVByZWxvYWRUb29sLnByZWxvYWRQcmVmYWIoR2FtZS5HYW1lUHJlbG9hZFRvb2wuc2V0dGluZ1BvcCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1haW5VSS5ub2RlICYmIGNjLmlzVmFsaWQodGhpcy5tYWluVUkubm9kZSkgJiYgcHJlZmFiICYmIGNjLmlzVmFsaWQocHJlZmFiKSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IDxjYy5Ob2RlPmNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNldFBhcmVudChHbG9iYWwuVUkuZ2V0TGF5ZXIoXCJQb3BMYXllclwiKSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdQb3AgPSBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBvcGVuUnVsZVBvcCgpe1xyXG4gICAgICAgIGlmICh0aGlzLnJ1bGVQb3AgJiYgY2MuaXNWYWxpZCh0aGlzLnJ1bGVQb3ApKXtcclxuICAgICAgICAgICAgdGhpcy5ydWxlUG9wLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGxldCBwcmVmYWIgPSBhd2FpdCBHYW1lLkdhbWVQcmVsb2FkVG9vbC5wcmVsb2FkUHJlZmFiKEdhbWUuR2FtZVByZWxvYWRUb29sLnJ1bGVQb3AsIHRydWUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tYWluVUkubm9kZSAmJiBjYy5pc1ZhbGlkKHRoaXMubWFpblVJLm5vZGUpICYmIHByZWZhYiAmJiBjYy5pc1ZhbGlkKHByZWZhYikpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSA8Y2MuTm9kZT5jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zZXRQYXJlbnQoR2xvYmFsLlVJLmdldExheWVyKFwiUG9wTGF5ZXJcIikpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ydWxlUG9wID0gbm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==