"use strict";
cc._RF.push(module, '27930cRyZxCQYcdyQ+LNS3U', 'BbwzDriver');
// bbwz/Bbwz/scripts/BbwzDriver.ts

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
var BbwzNetHandler_1 = require("./handler/BbwzNetHandler");
var BbwzConstDefine_1 = require("./data/BbwzConstDefine");
var BbwzGamePanel_1 = require("./panel/BbwzGamePanel");
var BbwzNoticePop_1 = require("./panel/BbwzNoticePop");
var BbwzSettingPop_1 = require("./panel/BbwzSettingPop");
var BbwzOnlinePlayerPop_1 = require("./panel/BbwzOnlinePlayerPop");
var BbwzHistoryPop_1 = require("./panel/BbwzHistoryPop");
var BbwzRulePop_1 = require("./panel/BbwzRulePop");
var BbwzData_1 = require("./data/BbwzData");
var BbwzPathHelper_1 = require("./tool/BbwzPathHelper");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 场景总驱动组件
 */
var BbwzDriver = /** @class */ (function (_super) {
    __extends(BbwzDriver, _super);
    function BbwzDriver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 默认头像框资源
        _this.defaultHeadKuang = null;
        _this.loadingNode = null;
        _this.maskNode = null;
        _this.chipManager = null;
        // 游戏UI
        _this.gameUI = null;
        //历史
        _this.historyPop = null;
        //在线玩家
        _this.onlinePop = null;
        //规则
        _this.rulePop = null;
        //设置
        _this.settingPop = null;
        //提示弹窗
        _this.noticePop = null;
        _this.inGame = false; // 处理某些极端场景的报错, 资源预加载时强退到大厅, 场景未来得及销毁时立马又进来
        return _this;
    }
    BbwzDriver_1 = BbwzDriver;
    BbwzDriver.prototype.onLoad = function () {
        this.inGame = true;
        BbwzDriver_1.instance = this;
        this.loadingContent = cc.find("content", this.loadingNode);
        this.loadingContent.active = false;
        Global.Component.initDriver();
        Global.UI.initUIRoot();
        Game.Component.initDriver();
        //强制退出游戏  常用与网络异常
        Game.Event.on(Game.EVENT_FORCE_LEAVE_GAME, this, this.onForceLeave);
        Game.Event.on(Game.EVENT_NOT_IN_TABLE, this, this.reEnter);
        Game.Event.on(Game.EVENT_SOCKET_RECONNECT, this, this.onSocketReconnect);
        // 开启fps信息调试窗 
        // cc.debug.setDisplayStats(true);
        this.init();
    };
    BbwzDriver.prototype.onDestroy = function () {
        //强制退出游戏  常用与网络异常
        Game.Event.off(Game.EVENT_FORCE_LEAVE_GAME, this, this.onForceLeave);
        Game.Event.off(Game.EVENT_NOT_IN_TABLE, this, this.reEnter);
        Game.Event.off(Game.EVENT_SOCKET_RECONNECT, this, this.onSocketReconnect);
        this.unscheduleAllCallbacks();
        // 先注销事件, 再销毁控制器, 最后销毁数据
        BbwzDriver_1.instance = null;
        BbwzData_1.default.instance = null;
    };
    BbwzDriver.prototype.start = function () {
        this.initLoading();
    };
    BbwzDriver.prototype.initLoading = function () {
        return __awaiter(this, void 0, void 0, function () {
            var comp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Global.GameData.checkHasCustomLoading && !Global.GameData.checkHasCustomLoading(BbwzConstDefine_1.default.GAME_ID))) return [3 /*break*/, 2];
                        return [4 /*yield*/, Global.UIHelper.getGameLoadingComp()];
                    case 1:
                        comp = _a.sent();
                        this.loadingContent.active = false;
                        comp.node.setParent(this.loadingNode);
                        comp.node.active = true;
                        return [3 /*break*/, 3];
                    case 2:
                        this.loadingContent.active = true;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BbwzDriver.prototype.init = function () {
        BbwzData_1.default.getGameInfoData();
        this.preLoadRes();
    };
    /**
     * 预加载资源
     */
    BbwzDriver.prototype.preLoadRes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var atlasArr, prefabArr, loadAtlas, loadPrefab;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        atlasArr = [
                            BbwzPathHelper_1.default.gameTexturePath + "atlas/poker/atlas_poker",
                            BbwzPathHelper_1.default.gameTexturePath + "atlas/dynamic/atlas_dynamic",
                        ];
                        prefabArr = [
                            BbwzPathHelper_1.default.gameTexturePath + "atlas/dynamic/font/" + BbwzConstDefine_1.default.rewardFontStr.Win,
                            BbwzPathHelper_1.default.gameTexturePath + "atlas/dynamic/font/" + BbwzConstDefine_1.default.rewardFontStr.Lose,
                            BbwzPathHelper_1.default.gameTexturePath + "atlas/dynamic/font/" + BbwzConstDefine_1.default.areaRewardFontStr.Win,
                            BbwzPathHelper_1.default.gameTexturePath + "atlas/dynamic/font/" + BbwzConstDefine_1.default.areaRewardFontStr.Lose,
                            BbwzPathHelper_1.default.gamePrefabsPath + "pop/BbwzHistoryPop",
                            BbwzPathHelper_1.default.gamePrefabsPath + "pop/BbwzNoticePop",
                            BbwzPathHelper_1.default.gamePrefabsPath + "pop/BbwzOnlinePlayerPop",
                            BbwzPathHelper_1.default.gamePrefabsPath + "pop/BbwzRulePop",
                            BbwzPathHelper_1.default.gamePrefabsPath + "pop/BbwzSettingPop",
                            BbwzPathHelper_1.default.gamePrefabsPath + "panel/subView/coinView",
                            BbwzPathHelper_1.default.gamePrefabsPath + "panel/subView/stateView",
                            BbwzPathHelper_1.default.gamePrefabsPath + "panel/subView/bigWinner",
                            BbwzPathHelper_1.default.gamePrefabsPath + "panel/subView/comparePoker",
                            BbwzPathHelper_1.default.gamePrefabsPath + "panel/subView/selectChipsNode",
                            BbwzPathHelper_1.default.gamePrefabsPath + "panel/subView/rewardArea",
                            BbwzPathHelper_1.default.gamePrefabsPath + "panel/subView/betArea",
                            BbwzPathHelper_1.default.gamePrefabsPath + "panel/BbwzGamePanel",
                        ];
                        loadAtlas = function () {
                            return new Promise(function (resolve, reject) {
                                Global.ResourceManager.loadBundleRes(BbwzConstDefine_1.default.GAME_ID, atlasArr, function (err, res) {
                                    if (err)
                                        reject(err);
                                    else
                                        resolve(res);
                                });
                            });
                        };
                        loadPrefab = function () {
                            return new Promise(function (resolve, reject) {
                                Global.ResourceManager.loadBundleRes(BbwzConstDefine_1.default.GAME_ID, prefabArr, function (err, res) {
                                    if (err)
                                        reject(err);
                                    else
                                        resolve(res);
                                });
                            });
                        };
                        return [4 /*yield*/, HeadTipsManager.preloadRes()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, TaskManager.preloadRes()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, loadAtlas()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, loadPrefab()];
                    case 4:
                        _a.sent();
                        // 防止load过程中强踢到大厅后调用报错
                        if (!this.node || !cc.isValid(this.node) || !this.inGame) {
                            return [2 /*return*/];
                        }
                        BbwzData_1.default.init(); // 数据优先于UI
                        this.initUI();
                        Game.Component.scheduleOnce(function () {
                            _this.tryStartGame(); // 连接协议之前把所有大UI都实例好  预留时间保证所有UI实例化好
                        }, 0.5);
                        return [2 /*return*/];
                }
            });
        });
    };
    BbwzDriver.prototype.initUI = function () {
        var popPrefabArr = [
            BbwzPathHelper_1.default.gamePrefabsPath + "pop/BbwzHistoryPop",
            BbwzPathHelper_1.default.gamePrefabsPath + "pop/BbwzOnlinePlayerPop",
            BbwzPathHelper_1.default.gamePrefabsPath + "pop/BbwzRulePop",
            BbwzPathHelper_1.default.gamePrefabsPath + "pop/BbwzSettingPop",
            BbwzPathHelper_1.default.gamePrefabsPath + "pop/BbwzNoticePop",
        ];
        var popLayer = Global.UI.getLayer("PopLayer") || cc.Canvas.instance.node;
        for (var i = 0; i < popPrefabArr.length; i++) {
            var prefab_1 = Global.ResourceManager.getBundleRes(BbwzConstDefine_1.default.GAME_ID, popPrefabArr[i], cc.Prefab);
            var popNode = cc.instantiate(prefab_1);
            popNode.setParent(popLayer);
            if (i == 0) {
                popNode.active = true; // 初始化，优化第一次打开实例化速度
                this.historyPop = Global.UIHelper.safeGetComponent(popNode, '', BbwzHistoryPop_1.default);
                popNode.active = false;
            }
            if (i == 1) {
                popNode.active = false; // 不需要初始化
                this.onlinePop = Global.UIHelper.safeGetComponent(popNode, '', BbwzOnlinePlayerPop_1.default);
            }
            if (i == 2) {
                popNode.active = false;
                this.rulePop = Global.UIHelper.safeGetComponent(popNode, '', BbwzRulePop_1.default);
            }
            if (i == 3) {
                popNode.active = false;
                this.settingPop = Global.UIHelper.safeGetComponent(popNode, '', BbwzSettingPop_1.default);
            }
            if (i == 4) {
                popNode.active = false;
                this.noticePop = Global.UIHelper.safeGetComponent(popNode, '', BbwzNoticePop_1.default);
            }
        }
        var prefab = Global.ResourceManager.getBundleRes(BbwzConstDefine_1.default.GAME_ID, BbwzPathHelper_1.default.gamePrefabsPath + "panel/BbwzGamePanel", cc.Prefab);
        var gamePanel = cc.instantiate(prefab); //实例化游戏界面
        var mainLayer = Global.UI.getLayer("MainLayer") || cc.Canvas.instance.node;
        gamePanel.setParent(mainLayer);
        gamePanel.active = true; // 需要走onload初始化
        this.gameUI = Global.UIHelper.safeGetComponent(gamePanel, '', BbwzGamePanel_1.default);
        gamePanel.active = false;
    };
    // 尝试进入游戏
    BbwzDriver.prototype.tryStartGame = function () {
        Logger.error("Bbwz tryStartGame");
        Global.Audio.playBundleMusic(BbwzConstDefine_1.default.GAME_ID, BbwzConstDefine_1.default.SOUND_BGM);
        BbwzNetHandler_1.default.registerNetHandler();
        this.enterGame(Game.Control.curLv);
    };
    /**
     * 加载vip头像框，如果使用的不是vip头像框，则使用子游戏默认头像框
     * @param spriteHeadKuang 头像框Sprite
     * @param headkuang vip头像框字符串
     */
    BbwzDriver.prototype.loadVipHeadKuang = function (spriteHeadKuang, headkuang) {
        // Global.Toolkit.loadLocalHeadFrame(spriteHeadKuang, headkuang);
        var atlasString = "texture/atlas/headFrame/headFrame";
        var sfString = "txkuang_vip" + headkuang;
        // return Global.ResourceManager.loadAutoAtlas(this.headBox, atlasString, sfString, () => {
        //     this.headBox.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        //     this.headBox.trim = false
        // }, false);
        Global.ResourceManager.loadBundleAutoAtlas("1017", spriteHeadKuang, atlasString, sfString, null, true);
    };
    /**
     * 请求离开游戏
     */
    BbwzDriver.prototype.reqLeaveGame = function () {
        var _this = this;
        Game.Server.send(BbwzConstDefine_1.default.SEND_LEAVE, { "IsClose": 1 });
        Game.Tween.clear();
        Game.Component.unscheduleAllCallbacks();
        this.gameUI.clearByRound();
        if (this.checkShowChooseLevel()) {
            this.scheduleOnce(function () {
                _this.exitScene();
            }, 0.5);
            return;
        }
        this.scheduleOnce(function () {
            _this.exitScene();
        }, 0.5);
    };
    //  是否需要显示选场
    BbwzDriver.prototype.checkShowChooseLevel = function () {
        var gameInfo = Global.GameData.getGameInfo(BbwzConstDefine_1.default.GAME_ID);
        if (gameInfo != null && gameInfo.levels != null && gameInfo.levels.length <= 1) {
            return false;
        }
        return true;
    };
    /**
     * 退出游戏层，返回选场层
     * @forceGoToHall 大厅推送时第一个参数
     */
    BbwzDriver.prototype.onForceLeave = function (forceGoToHall, explain) {
        if (forceGoToHall === void 0) { forceGoToHall = true; }
        if (explain === void 0) { explain = null; }
        if (forceGoToHall) {
            if (explain)
                Global.Toolkit.transmitHallMsg(explain, null, null, 1);
            //退出游戏
            this.exitScene();
        }
        else {
            // 离开游戏返回选场
            this.exitScene();
        }
    };
    // 退出游戏场景，返回大厅
    BbwzDriver.prototype.exitScene = function () {
        if (!this.inGame) // 1.加延时退出保证服务器收到leave消息避免shutDown掉  2.加return判断已经退出的无须重复执行
            return;
        //this.gameUI.node.active = false;        // debug 退出场景有概率不会立即销毁, update还是会跑还在add Tween, 导致报错
        this.hideAllPop();
        Game.Component.unscheduleAllCallbacks();
        Game.Tween.clear();
        Game.Control.shutDown(true);
        this.inGame = false;
        if (this.checkShowChooseLevel()) {
            Global.Toolkit.transmitHallWindow("WndHallChooseRoom", BbwzConstDefine_1.default.GAME_ID);
        }
        Global.SceneManager.goToHall();
    };
    // 连接游戏服
    BbwzDriver.prototype.enterGame = function (levelId) {
        Game.Control.connnectAndEnterGameInLevelScene(BbwzConstDefine_1.default.GAME_ID, levelId, "default", null, null);
    };
    BbwzDriver.prototype.reEnter = function () {
        Game.Control.trySendEnter();
    };
    BbwzDriver.prototype.onSocketReconnect = function () {
        Game.Tween.clear();
        Game.Component.unscheduleAllCallbacks();
        Global.Audio.stopAllEffect();
        this.gameUI.clearByRound();
    };
    // 进入游戏界面
    BbwzDriver.prototype.gotoGamePanel = function () {
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "ConnectGame");
        if (this.gameUI.node.active) // 已经在场内
            return;
        var comp = Global.UIHelper.addIntoGameAnimComp(this.gameUI.node, this.loadingNode, [this.gameUI.selectChipsView.node], [], [], []);
        comp.maskNode = this.maskNode;
        this.maskNode.opacity = 1;
        this.maskNode.active = true;
        this.maskNode.zIndex = 11; // Global.UI在10
        this.gameUI.node.active = true;
        var time = 1;
        comp.startAnimtionByMask(time, 0, null, null);
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "IntoGameAnimation", time);
    };
    BbwzDriver.prototype.gotoChooseLevel = function () {
    };
    // 隐藏所有弹窗
    BbwzDriver.prototype.hideAllPop = function () {
        this.historyPop.node.active = false;
        this.noticePop.node.active = false;
        this.onlinePop.node.active = false;
        this.rulePop.node.active = false;
        this.settingPop.node.active = false;
    };
    var BbwzDriver_1;
    // 静态全局对象
    BbwzDriver.instance = null;
    __decorate([
        property(cc.SpriteFrame)
    ], BbwzDriver.prototype, "defaultHeadKuang", void 0);
    __decorate([
        property(cc.Node)
    ], BbwzDriver.prototype, "loadingNode", void 0);
    __decorate([
        property(cc.Node)
    ], BbwzDriver.prototype, "maskNode", void 0);
    BbwzDriver = BbwzDriver_1 = __decorate([
        ccclass
    ], BbwzDriver);
    return BbwzDriver;
}(cc.Component));
exports.default = BbwzDriver;
;

cc._RF.pop();