
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/DdzDriver.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXERkekRyaXZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBMkM7QUFDM0MsOENBQXlDO0FBQ3pDLHNEQUFvRTtBQUNwRSw4REFBd0o7QUFDeEosOERBQXlEO0FBQ3pELDhEQUF5RDtBQUN6RCw0REFBMEc7QUFDMUcsa0VBQTZEO0FBQzdELDREQUF1RDtBQUN2RCw4REFBeUQ7QUFDekQsZ0VBQTJEO0FBQzNELDREQUF1RDtBQUN2RCxvRUFBK0k7QUFDL0ksNERBQWdGO0FBQ2hGLDREQUF1SDtBQUN2SCxrRUFBNkQ7QUFDN0QsMEVBQXFFO0FBQ3JFLG9EQUErQztBQUMvQyxvRkFBK0U7QUFDL0UseURBQW9EO0FBR3BELHdEQUFtRDtBQUVuRCxrREFBNkM7QUFFdkMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBdUMsNkJBQVk7SUFBbkQ7UUFBQSxxRUF3VEM7UUF2VEcsY0FBYztRQUVkLHNCQUFnQixHQUFrQixJQUFJLENBQUM7UUFrQmhDLFlBQU0sR0FBRyxLQUFLLENBQUMsQ0FBSywyQ0FBMkM7O0lBbVMxRSxDQUFDO2tCQXhUb0IsU0FBUztJQXVCMUIsMEJBQU0sR0FBTjtRQUNJLFdBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLE1B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SSxDQUFDO0lBRGpDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7dURBQ2M7SUFIdEIsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQXdUN0I7SUFBRCxnQkFBQztDQXhURCxBQXdUQyxDQXhUc0MsRUFBRSxDQUFDLFNBQVMsR0F3VGxEO2tCQXhUb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZHpDb250ZXh0IGZyb20gXCIuL2RhdGEvRGR6Q29udGV4dFwiO1xyXG5pbXBvcnQgRGR6RGVmaW5lIGZyb20gXCIuL2RhdGEvRGR6RGVmaW5lXCI7XHJcbmltcG9ydCBEZHpQYXRoSGVscGVyLCB7IERkekF1ZGlvQ29uc3QgfSBmcm9tIFwiLi9kYXRhL0RkelBhdGhIZWxwZXJcIjtcclxuaW1wb3J0IHsgRGR6RW5kSGFuZGxlciwgRGR6UmVmcmVzaEhhbmRsZXIsIERkelN0YXJ0SGFuZGxlciwgRGR6V2FpdEhhbmRsZXIsIERkek9mZmxpbmVIYW5kbGVyLCBEZHpMZWF2ZU1hdGNoSGFuZGxlciB9IGZyb20gXCIuL2hhbmRsZXJzL0RkekVhc3lIYW5kbGVyc1wiO1xyXG5pbXBvcnQgRGR6RW50ZXJIYW5kbGVyIGZyb20gXCIuL2hhbmRsZXJzL0RkekVudGVySGFuZGxlclwiO1xyXG5pbXBvcnQgRGR6TGVhdmVIYW5kbGVyIGZyb20gXCIuL2hhbmRsZXJzL0RkekxlYXZlSGFuZGxlclwiO1xyXG5pbXBvcnQgeyBEZHpTeW5jQmVnaW5IYW5kbGVyLCBEZHpTeW5jRW5kSGFuZGxlciwgRGR6U3luY1JlZnJlc2hIYW5kbGVyIH0gZnJvbSBcIi4vaGFuZGxlcnMvRGR6U3luY0hhbmRsZXJcIjtcclxuaW1wb3J0IERkekdhbWVDZmdIYW5kbGVyIGZyb20gXCIuL2hhbmRsZXJzL0RkekdhbWVDZmdIYW5kbGVyXCI7XHJcbmltcG9ydCBEZHpEZWFsSGFuZGxlciBmcm9tIFwiLi9oYW5kbGVycy9EZHpEZWFsSGFuZGxlclwiO1xyXG5pbXBvcnQgRGR6UmVhZHlIYW5kbGVyIGZyb20gXCIuL2hhbmRsZXJzL0RkelJlYWR5SGFuZGxlclwiO1xyXG5pbXBvcnQgRGR6UmV3YXJkSGFuZGxlciBmcm9tIFwiLi9oYW5kbGVycy9EZHpSZXdhcmRIYW5kbGVyXCI7XHJcbmltcG9ydCBEZHpBdXRvSGFuZGxlciBmcm9tIFwiLi9oYW5kbGVycy9EZHpBdXRvSGFuZGxlclwiO1xyXG5pbXBvcnQgeyBEZHpDYWxMYW5kbG9yZEhhbmRsZXIsIERkek9uTGFuZGxvcmRIYW5kbGVyLCBEZHpMYW5kbG9yZFJlc3VsdEhhbmRsZXIsIERkelJlQ2FsTGFuZGxvcmRIYW5kbGVyIH0gZnJvbSBcIi4vaGFuZGxlcnMvRGR6TGFuZGxvcmRIYW5kbGVyXCI7XHJcbmltcG9ydCB7IERkekNhbE11bHRIYW5kbGVyLCBEZHpPbk11bHRIYW5kbGVyIH0gZnJvbSBcIi4vaGFuZGxlcnMvRGR6TXVsdEhhbmRsZXJcIjtcclxuaW1wb3J0IHsgRGR6UGxheVN0YXJ0SGFuZGxlciwgRGR6Q2FsUGxheUhhbmRsZXIsIERkek9uUGxheUhhbmRsZXIsIERkek9uUGFzc0hhbmRsZXIgfSBmcm9tIFwiLi9oYW5kbGVycy9EZHpQbGF5SGFuZGxlclwiO1xyXG5pbXBvcnQgRGR6QWxsT3BlbkhhbmRsZXIgZnJvbSBcIi4vaGFuZGxlcnMvRGR6QWxsT3BlbkhhbmRsZXJcIjtcclxuaW1wb3J0IERkekNoYW5nZVNjb3JlSGFuZGxlciBmcm9tIFwiLi9oYW5kbGVycy9EZHpDaGFuZ2VTY29yZUhhbmRsZXJcIjtcclxuaW1wb3J0IERkekdhbWVDb25zdCBmcm9tIFwiLi9kYXRhL0RkekdhbWVDb25zdFwiO1xyXG5pbXBvcnQgRGR6UmVmcmVzaEhhbmRQb2tlckhhbmRsZXIgZnJvbSBcIi4vaGFuZGxlcnMvRGR6UmVmcmVzaEhhbmRQb2tlckhhbmRsZXJcIjtcclxuaW1wb3J0IERkekxvYWRpbmdVSSBmcm9tIFwiLi9jb21wb25lbnQvRGR6TG9hZGluZ1VJXCI7XHJcbmltcG9ydCBEZHpTa2luRGVmaW5lIGZyb20gXCIuL2RhdGEvRGR6U2tpbkRlZmluZVwiO1xyXG5pbXBvcnQgRGR6TWFpblVJIGZyb20gXCIuL3BhbmVsL0Rkek1haW5VSVwiO1xyXG5pbXBvcnQgRGR6UG9rZXJIZWxwZXIgZnJvbSBcIi4vZGF0YS9EZHpQb2tlckhlbHBlclwiO1xyXG5pbXBvcnQgRGR6UG9rZXJQb29sIGZyb20gXCIuL3Rvb2wvRGR6UG9rZXJQb29sXCI7XHJcbmltcG9ydCBEZHpQbGF5UnVsZSBmcm9tIFwiLi90b29sL0RkelBsYXlSdWxlXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERkekRyaXZlciBleHRlbmRzIGNjLkNvbXBvbmVudHtcclxuICAgIC8qKiDpu5jorqTlpLTlg4/moYbotYTmupAgKi9cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIGRlZmF1bHRIZWFkS3Vhbmc6Y2MuU3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgc3RhdGljIGluc3RhbmNlOkRkekRyaXZlciA9IG51bGw7XHJcbiAgICBwdWJsaWMgbWFza05vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGxvYWRpbmdVSTogRGR6TG9hZGluZ1VJO1xyXG5cclxuICAgIHB1YmxpYyBDb250ZXh0OiBEZHpDb250ZXh0O1xyXG4gICAgcHVibGljIERlZmluZTogRGR6RGVmaW5lO1xyXG4gICAgcHVibGljIFBhdGg6IERkelBhdGhIZWxwZXI7XHJcbiAgICBwdWJsaWMgU2l0SGVscGVyOiBQVlBTaXRIZWxwZXI7XHJcbiAgICBwdWJsaWMgc2tpbkRlZmluZTogRGR6U2tpbkRlZmluZTtcclxuXHJcbiAgICBwdWJsaWMgbWFpblVJOiBEZHpNYWluVUk7XHJcbiAgICBwdWJsaWMgUG9rZXJIZWxwZXI6IERkelBva2VySGVscGVyO1xyXG4gICAgcHVibGljIFBva2VyUG9vbDogRGR6UG9rZXJQb29sO1xyXG4gICAgcHVibGljIFBsYXlSdWxlSGVscGVyOiBEZHpQbGF5UnVsZTtcclxuXHJcbiAgICBwdWJsaWMgc2V0dGluZ1BvcDogY2MuTm9kZTtcclxuICAgIHB1YmxpYyBydWxlUG9wOiBjYy5Ob2RlO1xyXG4gICAgcHVibGljIGluR2FtZSA9IGZhbHNlOyAgICAgLy8g5aSE55CG5p+Q5Lqb5p6B56uv5Zy65pmv55qE5oql6ZSZLCDotYTmupDpooTliqDovb3ml7blvLrpgIDliLDlpKfljoUsIOWcuuaZr+acquadpeW+l+WPiumUgOavgeaXtueri+mprOWPiOi/m+adpVxyXG5cclxuICAgIG9uTG9hZCgpe1xyXG4gICAgICAgIERkekRyaXZlci5pbnN0YW5jZSA9IHRoaXNcclxuICAgICAgICB0aGlzLmluR2FtZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tYXNrTm9kZSA9IGNjLmZpbmQoXCJtYXNrXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5tYXNrTm9kZS56SW5kZXggPSA5O1xyXG4gICAgICAgIHRoaXMubG9hZGluZ1VJID0gR2xvYmFsLlVJSGVscGVyLnNhZmVHZXRDb21wb25lbnQodGhpcy5ub2RlLCBcImxvYWRpbmdcIiwgRGR6TG9hZGluZ1VJKTtcclxuICAgICAgICB0aGlzLmxvYWRpbmdVSS5ub2RlLnpJbmRleCA9IDg7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0dXBHbG9iYWwoKTtcclxuICAgICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlHYW1lQnVuZGxlTXVzaWMoRGR6QXVkaW9Db25zdC5CZ20xLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMluWkp+WOheebuOWFs+mAu+i+kVxyXG4gICAgcHJpdmF0ZSBzZXR1cEdsb2JhbCgpe1xyXG4gICAgICAgIC8v5Yid5aeL5YyWdXBkYXRl6amx5YqoICDliJ3lp4vljJZ0aW1lclxyXG4gICAgICAgIEdsb2JhbC5Db21wb25lbnQuaW5pdERyaXZlcigpO1xyXG4gICAgICAgIC8v5Yid5aeL5YyWR2FtZempseWKqFxyXG4gICAgICAgIEdhbWUuQ29tcG9uZW50LmluaXREcml2ZXIoKTtcclxuICAgICAgICBHbG9iYWwuVUkuaW5pdFVJUm9vdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0dXAoKXtcclxuICAgICAgICBHYW1lLkNvbnRleHQgPSBuZXcgRGR6Q29udGV4dCgpO1xyXG4gICAgICAgIHRoaXMuQ29udGV4dCA9IEdhbWUuQ29udGV4dDtcclxuICAgICAgICB0aGlzLkRlZmluZSA9IG5ldyBEZHpEZWZpbmUoKTtcclxuICAgICAgICB0aGlzLlBhdGggPSBuZXcgRGR6UGF0aEhlbHBlcigpO1xyXG4gICAgICAgIHRoaXMuU2l0SGVscGVyID0gbmV3IFBWUFNpdEhlbHBlcigpO1xyXG4gICAgICAgIHRoaXMuUGxheVJ1bGVIZWxwZXIgPSBuZXcgRGR6UGxheVJ1bGUoKTtcclxuICAgICAgICB0aGlzLlBva2VySGVscGVyID0gbmV3IERkelBva2VySGVscGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVnaXN0SGFuZGxlcih0aGlzLkRlZmluZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKXtcclxuICAgICAgICBHYW1lLkV2ZW50Lm9uKEdhbWUuRVZFTlRfRk9SQ0VfTEVBVkVfR0FNRSwgdGhpcywgdGhpcy5vbkZvcmNlTGVhdmUpO1xyXG4gICAgICAgIEdhbWUuRXZlbnQub24oR2FtZS5FVkVOVF9OT1RfSU5fVEFCTEUsIHRoaXMsIHRoaXMub25Gb3JjZUxlYXZlKTtcclxuICAgICAgICBHYW1lLkV2ZW50Lm9uKEdhbWUuRVZFTlRfU09DS0VUX1JFQ09OTkVDVCwgdGhpcywgdGhpcy5vblNvY2tldFJlY29ubmVjdCk7XHJcbiAgICAgICAgR2FtZS5FdmVudC5vbihHYW1lLkVWRU5UX1NPQ0tFVF9SRVNVTUUsIHRoaXMsIHRoaXMub25SZXN1bWUpO1xyXG4gICAgICAgIEdhbWUuRXZlbnQub24oR2FtZS5FVkVOVF9NQVRDSF9QTEFZRVIsIHRoaXMsIHRoaXMub25NYXRjaFBsYXllcik7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCl7XHJcbiAgICAgICAgR2FtZS5FdmVudC5vZmYoR2FtZS5FVkVOVF9GT1JDRV9MRUFWRV9HQU1FLCB0aGlzLCB0aGlzLm9uRm9yY2VMZWF2ZSk7XHJcbiAgICAgICAgR2FtZS5FdmVudC5vZmYoR2FtZS5FVkVOVF9OT1RfSU5fVEFCTEUsIHRoaXMsIHRoaXMub25Gb3JjZUxlYXZlKTtcclxuICAgICAgICBHYW1lLkV2ZW50Lm9mZihHYW1lLkVWRU5UX1NPQ0tFVF9SRUNPTk5FQ1QsIHRoaXMsIHRoaXMub25Tb2NrZXRSZWNvbm5lY3QpO1xyXG4gICAgICAgIEdhbWUuRXZlbnQub2ZmKEdhbWUuRVZFTlRfU09DS0VUX1JFU1VNRSwgdGhpcywgdGhpcy5vblJlc3VtZSk7XHJcbiAgICAgICAgR2FtZS5FdmVudC5vZmYoR2FtZS5FVkVOVF9NQVRDSF9QTEFZRVIsIHRoaXMsIHRoaXMub25NYXRjaFBsYXllcik7XHJcbiAgICAgICBcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICBEZHpEcml2ZXIuaW5zdGFuY2UgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L29dmlw5aS05YOP5qGG77yM5aaC5p6c5L2/55So55qE5LiN5pivdmlw5aS05YOP5qGG77yM5YiZ5L2/55So5a2Q5ri45oiP6buY6K6k5aS05YOP5qGGXHJcbiAgICAgKiBAcGFyYW0gc3ByaXRlSGVhZEt1YW5nIOWktOWDj+ahhlNwcml0ZVxyXG4gICAgICogQHBhcmFtIGhlYWRrdWFuZyB2aXDlpLTlg4/moYblrZfnrKbkuLJcclxuICAgICAqL1xyXG4gICAgTG9hZFZpcEhlYWRLdWFuZyhzcHJpdGVIZWFkS3Vhbmc6Y2MuU3ByaXRlLCBoZWFka3Vhbmc6c3RyaW5nKXtcclxuICAgICAgICAvLyBpZihoZWFka3VhbmcgPiBcIjBcIil7XHJcbiAgICAgICAgICAgIC8vIEdsb2JhbC5Ub29sa2l0LmxvYWRMb2NhbEhlYWRGcmFtZShzcHJpdGVIZWFkS3VhbmcsIGhlYWRrdWFuZyk7XHJcbiAgICAgICAgdmFyIGF0bGFzU3RyaW5nID0gXCJ0ZXh0dXJlL2hlYWRGcmFtZS9oZWFkRnJhbWVcIjtcclxuICAgICAgICB2YXIgc2ZTdHJpbmcgPSBcInR4a3VhbmdfdmlwXCIgKyBoZWFka3Vhbmc7XHJcbiAgICAgICAgLy8gcmV0dXJuIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyh0aGlzLmhlYWRCb3gsIGF0bGFzU3RyaW5nLCBzZlN0cmluZywgKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLmhlYWRCb3guc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmhlYWRCb3gudHJpbSA9IGZhbHNlXHJcbiAgICAgICAgLy8gfSwgZmFsc2UpO1xyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEJ1bmRsZUF1dG9BdGxhcyhcIjIwMDVcIiwgc3ByaXRlSGVhZEt1YW5nLCBhdGxhc1N0cmluZywgc2ZTdHJpbmcsIG51bGwsIHRydWUpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNle1xyXG4gICAgICAgIC8vICAgICBzcHJpdGVIZWFkS3Vhbmcuc3ByaXRlRnJhbWUgPSB0aGlzLmRlZmF1bHRIZWFkS3Vhbmc7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVnaXN0SGFuZGxlcihEZWZpbmU6RGR6RGVmaW5lKXtcclxuICAgICAgICBHYW1lLkNvbnRyb2wucmVnaXN0RGVmYXVsdEhhbmRsZXIoKTtcclxuXHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoRGVmaW5lLkNtZEdhbWVDZmcsIG5ldyBEZHpHYW1lQ2ZnSGFuZGxlcik7XHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoRGVmaW5lLkNtZEVudGVyLCBuZXcgRGR6RW50ZXJIYW5kbGVyKTtcclxuICAgICAgICBHYW1lLkNvbnRyb2wucmVnaXN0SGFuZGxlcihEZWZpbmUuQ21kTGVhdmUsIG5ldyBEZHpMZWF2ZUhhbmRsZXIpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWRMZWF2ZU1hdGNoLCBuZXcgRGR6TGVhdmVNYXRjaEhhbmRsZXIpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWRSZWZyZXNoLCBuZXcgRGR6UmVmcmVzaEhhbmRsZXIpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWRPZmZsaW5lLCBuZXcgRGR6T2ZmbGluZUhhbmRsZXIpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWRTeW5jQmVnaW4sIG5ldyBEZHpTeW5jQmVnaW5IYW5kbGVyKTtcclxuICAgICAgICBHYW1lLkNvbnRyb2wucmVnaXN0SGFuZGxlcihEZWZpbmUuQ21kU3luY0VuZCwgbmV3IERkelN5bmNFbmRIYW5kbGVyKTtcclxuICAgICAgICBHYW1lLkNvbnRyb2wucmVnaXN0SGFuZGxlcihEZWZpbmUuQ21kU3luY1RhYmxlLCBuZXcgRGR6U3luY1JlZnJlc2hIYW5kbGVyKTtcclxuICAgICAgICBHYW1lLkNvbnRyb2wucmVnaXN0SGFuZGxlcihEZWZpbmUuQ21kUmVmcmVzaEhhbmRQb2tlcnMsIG5ldyBEZHpSZWZyZXNoSGFuZFBva2VySGFuZGxlcik7XHJcblxyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWRDYWxsUmVhZHksIG5ldyBEZHpSZWFkeUhhbmRsZXIpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWRHYW1lU3RhcnQsIG5ldyBEZHpTdGFydEhhbmRsZXIpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWREZWFsLCBuZXcgRGR6RGVhbEhhbmRsZXIpXHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoRGVmaW5lLkNtZEF1dG8sIG5ldyBEZHpBdXRvSGFuZGxlcik7XHJcblxyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWRDYWxMYW5kbG9yZCwgbmV3IERkekNhbExhbmRsb3JkSGFuZGxlcik7XHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoRGVmaW5lLkNtZExhbmRsb3JkLCBuZXcgRGR6T25MYW5kbG9yZEhhbmRsZXIpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWRPbkxhbmRsb3JkLCBuZXcgRGR6TGFuZGxvcmRSZXN1bHRIYW5kbGVyKTtcclxuICAgICAgICBHYW1lLkNvbnRyb2wucmVnaXN0SGFuZGxlcihEZWZpbmUuQ21kUmVDYWxMYW5kbG9yZCwgbmV3IERkelJlQ2FsTGFuZGxvcmRIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoRGVmaW5lLkNtZENhbE11bHQsIG5ldyBEZHpDYWxNdWx0SGFuZGxlcik7XHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoRGVmaW5lLkNtZE11bHQsIG5ldyBEZHpPbk11bHRIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoRGVmaW5lLkNtZFBsYXlTdGFydCwgbmV3IERkelBsYXlTdGFydEhhbmRsZXIpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWRDYWxQbGF5LCBuZXcgRGR6Q2FsUGxheUhhbmRsZXIpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKERlZmluZS5DbWRQbGF5LCBuZXcgRGR6T25QbGF5SGFuZGxlcik7XHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoRGVmaW5lLkNtZFBhc3MsIG5ldyBEZHpPblBhc3NIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoRGVmaW5lLkNtZE9wZW4sIG5ldyBEZHpBbGxPcGVuSGFuZGxlcik7XHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoRGVmaW5lLkNtZENoYW5nZVNjb3JlLCBuZXcgRGR6Q2hhbmdlU2NvcmVIYW5kbGVyKTtcclxuICAgICAgICBHYW1lLkNvbnRyb2wucmVnaXN0SGFuZGxlcihEZWZpbmUuQ21kUmV3YXJkLCBuZXcgRGR6UmV3YXJkSGFuZGxlcik7XHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoRGVmaW5lLkNtZEdhbWVFbmQsIG5ldyBEZHpFbmRIYW5kbGVyKTtcclxuICAgICAgICBHYW1lLkNvbnRyb2wucmVnaXN0SGFuZGxlcihEZWZpbmUuQ21kV2FpdCwgbmV3IERkeldhaXRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+mHjei/nuaXtumcgOimgeWFiOa4heeQhueOqeWutuWIl+ihqO+8jOWQjue7remHjeaWsOi/m+WFpVxyXG4gICAgcHJpdmF0ZSBvblNvY2tldFJlY29ubmVjdCgpe1xyXG4gICAgICAgIGlmKHRoaXMubWFpblVJKXtcclxuICAgICAgICAgICAgR2xvYmFsLkF1ZGlvLnN0b3BBbGxFZmZlY3QoKTtcclxuICAgICAgICAgICAgR2FtZS5Ud2Vlbi5jbGVhcigpO1xyXG4gICAgICAgICAgICBHYW1lLkNvbXBvbmVudC51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLmNsZWFyUGxheWVycygpO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5VSS5jbGVhckJ5R2FtZSgpO1xyXG4gICAgICAgICAgICB0aGlzLkNvbnRleHQuY2xlYXJCeUdhbWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkZvcmNlTGVhdmUoZm9yY2VHb1RvSGFsbCl7XHJcbiAgICAgICAgaWYoZm9yY2VHb1RvSGFsbClcclxuICAgICAgICAgICAgdGhpcy5leGl0U2NlbmUoKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMubGVhdmVHYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblJlc3VtZSh0aW1lKXtcclxuICAgICAgICBpZiAodGltZSA+PSAyICogNjApXHJcbiAgICAgICAgICAgIHRoaXMubGVhdmVHYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk1hdGNoUGxheWVyKG1zZyl7XHJcbiAgICAgICAgaWYoIXRoaXMuaW5HYW1lKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5lbnRlckdhbWUoKTtcclxuICAgICAgICB0aGlzLm1haW5VSS5tYXRjaFBsYXllclZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgZGF0YSA9IEdsb2JhbC5HYW1lRGF0YS5nZXRHYW1lSW5mbyhEZHpHYW1lQ29uc3QuR2lkKTtcclxuICAgICAgICBsZXQgbHYgPSBtc2cuX3BhcmEuX2dsdjtcclxuICAgICAgICBsZXQgYXJyID0gZGF0YS5sZXZlbHM7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmIChhcnJbaV0ubGV2ZWwgPT0gbHYpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluVUkudXBkYXRlTGV2ZWxCYXNlKGFycltpXS5Qb2ludFJhdGUpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLm1haW5VSS51cGRhdGVNb2RlKGFycltpXS5jbGllbmdfY2ZnLm1vZGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluVUkudXBkYXRlTGV2ZWwobHYpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5Db250ZXh0LmlzV2FpdE1hdGNoID0gdHJ1ZTtcclxuICAgICAgICBsZXQgdGltZW8gPSBNYXRoLmNlaWwoKG1zZy5fdGltZW8gKiAxMDAwIC0gRGF0ZS5ub3coKSArIG1zZy5fcmVjZWl2ZVRpbWUpIC8gMTAwMCk7XHJcbiAgICAgICAgaWYgKHRpbWVvICYmIHRpbWVvID4gMCl7XHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLm1hdGNoUGxheWVyVmlldy5zZXRUaW1lUnVuQ29uZmlnKHRpbWVvLCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db250ZXh0LmlzV2FpdE1hdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5VSS5tYXRjaFBsYXllclZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1llc05vQm94KCfljLnphY3otoXml7bvvIzmmK/lkKbph43mlrDljLnphY3vvJ8nLCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWUuQ29udHJvbC50cnlTZW5kRW50ZXIoe1wiX2Zyb21cIjpcImp1bXBcIn0pOyAgICAvLyDmlq1zb2NrZXTliJnkuI3og73nlKjov5nkuKpcclxuICAgICAgICAgICAgICAgIH0sICgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5TZXJ2ZXIuc2VuZCh0aGlzLkRlZmluZS5DbWRMZWF2ZSwgeyBcIklzQ2xvc2VcIjogMSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxlYXZlR2FtZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+i/m+WFpea4uOaIj+WcuuaZr1xyXG4gICAgcHVibGljIHN0YXJ0U2NlbmUoKSB7XHJcbiAgICAgICAgdGhpcy5tYWluVUkubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlcUVudGVyR2FtZShEZHpHYW1lQ29uc3QuR2lkLCBHYW1lLkNvbnRyb2wuY3VyTHYpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K+35rGC6L+b5YWl5oi/6Ze0XHJcbiAgICBwdWJsaWMgcmVxRW50ZXJHYW1lKGdpZDogbnVtYmVyLCBnbHY6c3RyaW5nLCBnc2M6c3RyaW5nID0gXCJkZWZhdWx0XCIpe1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5jb25ubmVjdEFuZEVudGVyR2FtZUluTGV2ZWxTY2VuZShnaWQsIGdsdiwgZ3NjLCBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXhpdFNjZW5lKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbkdhbWUpICAgICAgIC8vIDEu5Yqg5bu25pe26YCA5Ye65L+d6K+B5pyN5Yqh5Zmo5pS25YiwbGVhdmXmtojmga/pgb/lhY1zaHV0RG93buaOiSAgMi7liqByZXR1cm7liKTmlq3lt7Lnu4/pgIDlh7rnmoTml6Dpobvph43lpI3miafooYxcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaW5HYW1lID0gZmFsc2U7XHJcblxyXG4gICAgICAgIEdhbWUuVHdlZW4uY2xlYXIoKTtcclxuICAgICAgICBHYW1lLkNvbXBvbmVudC51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgaWYgKHRoaXMubWFpblVJKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLmNsZWFyV25kKCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5tYWluVUkubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucnVsZVBvcClcclxuICAgICAgICAgICAgICAgIHRoaXMucnVsZVBvcC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ1BvcClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ1BvcC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5Db250ZXh0LmNsZWFyQnlHYW1lKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgR2FtZS5Db250cm9sLnNodXREb3duKCk7XHJcbiAgICAgICAgR2xvYmFsLlRvb2xraXQudHJhbnNtaXRIYWxsV2luZG93KFwiV25kR2FtZUxvYmJ5U2hlbGxcIiwgRGR6R2FtZUNvbnN0LkdpZCk7XHJcbiAgICAgICAgR2FtZS5HYW1lUHJlbG9hZFRvb2wucmVsZWFzZUtlZXBBc3NldChEZHpHYW1lQ29uc3QuR2lkLCB0cnVlKTtcclxuICAgICAgICBHbG9iYWwuU2NlbmVNYW5hZ2VyLmdvVG9IYWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudGVyR2FtZSgpIHtcclxuICAgICAgICB0aGlzLm1haW5VSS5jYWxsQWxsUGxheWVycygnaGlkZScpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmNsZWFyQnlSb3VuZCgpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmNsZWFyQnlHYW1lKCk7XHJcbiAgICAgICAgdGhpcy5Db250ZXh0LmNsZWFyQnlSb3VuZCgpO1xyXG4gICAgICAgIC8v5bey57uP5Zyo5ri45oiP5LitICDkuI3ph43lpI3mkq1cclxuICAgICAgICBpZiAodGhpcy5tYWluVUkubm9kZS5hY3RpdmUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUdhbWVCdW5kbGVNdXNpYyhEZHpBdWRpb0NvbnN0LkJnbTEsIHRydWUpO1xyXG4gICAgICAgIGxldCBjb21wID0gR2xvYmFsLlVJSGVscGVyLmFkZEludG9HYW1lQW5pbUNvbXAodGhpcy5tYWluVUkubm9kZSwgdGhpcy5sb2FkaW5nVUkubm9kZSwgW10sIFtdLCBbXSwgW10pO1xyXG4gICAgICAgIGNvbXAubWFza05vZGUgPSB0aGlzLm1hc2tOb2RlO1xyXG4gICAgICAgIHRoaXMubWFza05vZGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgdGhpcy5tYXNrTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubWFpblVJLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1hc2tOb2RlLnpJbmRleCA9IDExO1xyXG4gICAgICAgIGxldCBkZWxheSA9IDE7XHJcbiAgICAgICAgY29tcC5zdGFydEFuaW10aW9uQnlNYXNrKGRlbGF5LCAwLCBudWxsLCBudWxsKTtcclxuICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfQUREVElNRUxPQ0ssIFwiSW50b0dhbWVBbmltYXRpb25cIiwgZGVsYXkgLSAwLjMpOyAgICAgLy8g5a6M5pW05pe26Ze06ZSB5Lya5pyJ5YGc6aG/5oSfXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxlYXZlR2FtZSgpe1xyXG4gICAgICAgIEdhbWUuVHdlZW4uY2xlYXIoKTtcclxuICAgICAgICBHYW1lLkNvbXBvbmVudC51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgLy8gdGhpcy5Db250ZXh0LmNsZWFyQnlHYW1lKCk7ICAgICAgLy8gZGVidWcg5o+Q5YmN5riF55CG5Y+v6IO95Lya5a+86Ie05oql6ZSZXHJcbiAgICAgICAgLy8gaWYgKHRoaXMubWFpblVJKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5tYWluVUkuY2xlYXJXbmQoKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5leGl0U2NlbmUoKTtcclxuICAgICAgICB9LCAwLjUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBiZWdpblN5bmMoKXtcclxuICAgICAgICBHYW1lLlR3ZWVuLmNsZWFyKCk7XHJcbiAgICAgICAgR2FtZS5Db21wb25lbnQudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmNsZWFyQnlHYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlTWF0Y2hQbGF5ZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuQ29udGV4dC5zZXNzaW9uICYmIHRoaXMuQ29udGV4dC5zZXNzaW9uLl9nbHYpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wR2FtZUNvbm5lY3QoKTtcclxuICAgICAgICAgICAgbGV0IGx2ID0gdGhpcy5Db250ZXh0LnNlc3Npb24uX2dsdjtcclxuICAgICAgICAgICAgdGhpcy5yZXFFbnRlckdhbWUoRGR6R2FtZUNvbnN0LkdpZCwgbHYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgR2FtZS5TZXJ2ZXIuc2VuZCh0aGlzLkRlZmluZS5DbWRMZWF2ZSwgeyBcIklzQ2xvc2VcIjogMSB9KTtcclxuICAgICAgICAgICAgdGhpcy5sZWF2ZUdhbWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0b3BHYW1lQ29ubmVjdCgpIHtcclxuICAgICAgICBHYW1lLlNlcnZlci5zdG9wKCk7XHJcbiAgICAgICAgR2FtZS5TZXJ2ZXIuY2xlYXJEc3QoKTtcclxuICAgICAgICBHYW1lLlNlcnZlci5jbGVhckRhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgb3BlblNldHRpbmdQb3AoKXtcclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5nUG9wICYmIGNjLmlzVmFsaWQodGhpcy5zZXR0aW5nUG9wKSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ1BvcC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBsZXQgcHJlZmFiID0gYXdhaXQgR2FtZS5HYW1lUHJlbG9hZFRvb2wucHJlbG9hZFByZWZhYihHYW1lLkdhbWVQcmVsb2FkVG9vbC5zZXR0aW5nUG9wLCB0cnVlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWFpblVJLm5vZGUgJiYgY2MuaXNWYWxpZCh0aGlzLm1haW5VSS5ub2RlKSAmJiBwcmVmYWIgJiYgY2MuaXNWYWxpZChwcmVmYWIpKXtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlID0gPGNjLk5vZGU+Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2V0UGFyZW50KEdsb2JhbC5VSS5nZXRMYXllcihcIlBvcExheWVyXCIpKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ1BvcCA9IG5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIG9wZW5SdWxlUG9wKCl7XHJcbiAgICAgICAgaWYgKHRoaXMucnVsZVBvcCAmJiBjYy5pc1ZhbGlkKHRoaXMucnVsZVBvcCkpe1xyXG4gICAgICAgICAgICB0aGlzLnJ1bGVQb3AuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbGV0IHByZWZhYiA9IGF3YWl0IEdhbWUuR2FtZVByZWxvYWRUb29sLnByZWxvYWRQcmVmYWIoR2FtZS5HYW1lUHJlbG9hZFRvb2wucnVsZVBvcCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1haW5VSS5ub2RlICYmIGNjLmlzVmFsaWQodGhpcy5tYWluVUkubm9kZSkgJiYgcHJlZmFiICYmIGNjLmlzVmFsaWQocHJlZmFiKSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IDxjYy5Ob2RlPmNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNldFBhcmVudChHbG9iYWwuVUkuZ2V0TGF5ZXIoXCJQb3BMYXllclwiKSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bGVQb3AgPSBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19