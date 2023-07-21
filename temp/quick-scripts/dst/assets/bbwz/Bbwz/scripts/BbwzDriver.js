
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/BbwzDriver.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcQmJ3ekRyaXZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBc0Q7QUFDdEQsMERBQXFEO0FBQ3JELHVEQUFrRDtBQUNsRCx1REFBa0Q7QUFDbEQseURBQW9EO0FBQ3BELG1FQUE4RDtBQUM5RCx5REFBb0Q7QUFDcEQsbURBQThDO0FBQzlDLDRDQUF1QztBQUN2Qyx3REFBbUQ7QUFJN0MsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFDNUM7O0dBRUc7QUFFSDtJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQWdWQztRQTVVRyxVQUFVO1FBRVYsc0JBQWdCLEdBQW1CLElBQUksQ0FBQztRQUd4QyxpQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBRWxCLGlCQUFXLEdBQXFCLElBQUksQ0FBQztRQUM1QyxPQUFPO1FBQ0EsWUFBTSxHQUFrQixJQUFJLENBQUM7UUFDcEMsSUFBSTtRQUNHLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUN6QyxNQUFNO1FBQ0MsZUFBUyxHQUF3QixJQUFJLENBQUM7UUFDN0MsSUFBSTtRQUNHLGFBQU8sR0FBZ0IsSUFBSSxDQUFDO1FBQ25DLElBQUk7UUFDRyxnQkFBVSxHQUFtQixJQUFJLENBQUM7UUFDekMsTUFBTTtRQUNDLGVBQVMsR0FBa0IsSUFBSSxDQUFDO1FBRWhDLFlBQU0sR0FBRyxLQUFLLENBQUMsQ0FBSywyQ0FBMkM7O0lBb1QxRSxDQUFDO21CQWhWb0IsVUFBVTtJQWdDakIsMkJBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixZQUFVLENBQUMsUUFBUSxHQUFHLElB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O0lBQ3hFLENBQUM7SUFFTSxvQ0FBZSxHQUF0QjtJQUVBLENBQUM7SUFFRCxTQUFTO0lBQ0YsK0JBQVUsR0FBakI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1FBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEMsQ0FBQzs7SUE5VUQsU0FBUztJQUNGLG1CQUFRLEdBQWUsSUFBSSxDQUFDO0lBSW5DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7d0RBQ2U7SUFHeEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzttREFDVTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNPO0lBWlIsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQWdWOUI7SUFBRCxpQkFBQztDQWhWRCxBQWdWQyxDQWhWdUMsRUFBRSxDQUFDLFNBQVMsR0FnVm5EO2tCQWhWb0IsVUFBVTtBQWdWOUIsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYnd6TmV0SGFuZGxlciBmcm9tIFwiLi9oYW5kbGVyL0Jid3pOZXRIYW5kbGVyXCI7XHJcbmltcG9ydCBCYnd6Q29uc3REZWZpbmUgZnJvbSBcIi4vZGF0YS9CYnd6Q29uc3REZWZpbmVcIjtcclxuaW1wb3J0IEJid3pHYW1lUGFuZWwgZnJvbSBcIi4vcGFuZWwvQmJ3ekdhbWVQYW5lbFwiO1xyXG5pbXBvcnQgQmJ3ek5vdGljZVBvcCBmcm9tIFwiLi9wYW5lbC9CYnd6Tm90aWNlUG9wXCI7XHJcbmltcG9ydCBCYnd6U2V0dGluZ1BvcCBmcm9tIFwiLi9wYW5lbC9CYnd6U2V0dGluZ1BvcFwiO1xyXG5pbXBvcnQgQmJ3ek9ubGluZVBsYXllclBvcCBmcm9tIFwiLi9wYW5lbC9CYnd6T25saW5lUGxheWVyUG9wXCI7XHJcbmltcG9ydCBCYnd6SGlzdG9yeVBvcCBmcm9tIFwiLi9wYW5lbC9CYnd6SGlzdG9yeVBvcFwiO1xyXG5pbXBvcnQgQmJ3elJ1bGVQb3AgZnJvbSBcIi4vcGFuZWwvQmJ3elJ1bGVQb3BcIjtcclxuaW1wb3J0IEJid3pEYXRhIGZyb20gXCIuL2RhdGEvQmJ3ekRhdGFcIjtcclxuaW1wb3J0IEJid3pQYXRoSGVscGVyIGZyb20gXCIuL3Rvb2wvQmJ3elBhdGhIZWxwZXJcIjtcclxuaW1wb3J0IEJid3pDaGlwc01hbmFnZXIgZnJvbSBcIi4vbWFuYWdlci9CYnd6Q2hpcHNNYW5hZ2VyXCI7XHJcblxyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuLyoqXHJcbiAqIOWcuuaZr+aAu+mpseWKqOe7hOS7tlxyXG4gKi9cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmJ3ekRyaXZlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICAvLyDpnZnmgIHlhajlsYDlr7nosaFcclxuICAgIHN0YXRpYyBpbnN0YW5jZTogQmJ3ekRyaXZlciA9IG51bGw7XHJcblxyXG4gICAgLy8g6buY6K6k5aS05YOP5qGG6LWE5rqQXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBkZWZhdWx0SGVhZEt1YW5nOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBsb2FkaW5nTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBtYXNrTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIGNoaXBNYW5hZ2VyOiBCYnd6Q2hpcHNNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8vIOa4uOaIj1VJXHJcbiAgICBwdWJsaWMgZ2FtZVVJOiBCYnd6R2FtZVBhbmVsID0gbnVsbDtcclxuICAgIC8v5Y6G5Y+yXHJcbiAgICBwdWJsaWMgaGlzdG9yeVBvcDogQmJ3ekhpc3RvcnlQb3AgPSBudWxsO1xyXG4gICAgLy/lnKjnur/njqnlrrZcclxuICAgIHB1YmxpYyBvbmxpbmVQb3A6IEJid3pPbmxpbmVQbGF5ZXJQb3AgPSBudWxsO1xyXG4gICAgLy/op4TliJlcclxuICAgIHB1YmxpYyBydWxlUG9wOiBCYnd6UnVsZVBvcCA9IG51bGw7XHJcbiAgICAvL+iuvue9rlxyXG4gICAgcHVibGljIHNldHRpbmdQb3A6IEJid3pTZXR0aW5nUG9wID0gbnVsbDtcclxuICAgIC8v5o+Q56S65by556qXXHJcbiAgICBwdWJsaWMgbm90aWNlUG9wOiBCYnd6Tm90aWNlUG9wID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgaW5HYW1lID0gZmFsc2U7ICAgICAvLyDlpITnkIbmn5DkupvmnoHnq6/lnLrmma/nmoTmiqXplJksIOi1hOa6kOmihOWKoOi9veaXtuW8uumAgOWIsOWkp+WOhSwg5Zy65pmv5pyq5p2l5b6X5Y+K6ZSA5q+B5pe256uL6ams5Y+I6L+b5p2lXHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkaW5nQ29udGVudDogY2MuTm9kZTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuaW5HYW1lID0gdHJ1ZTtcclxuICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5sb2FkaW5nQ29udGVudCA9IGNjLmZpbmQoXCJjb250ZW50XCIsIHRoaXMubG9hZGluZ05vZGUpO1xyXG4gICAgICAgIHRoaXMubG9hZGluZ0NvbnRlbnQuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIEdsb2JhbC5Db21wb25lbnQuaW5pdERyaXZlcigpO1xyXG4gICAgICAgIEdsb2JhbC5VSS5pbml0VUlSb290KCk7XHJcbiAgICAgICAgR2FtZS5Db21wb25lbnQuaW5pdERyaXZlcigpO1xyXG5cclxuICAgICAgICAvL+W8uuWItumAgOWHuua4uOaIjyAg5bi455So5LiO572R57uc5byC5bi4XHJcbiAgICAgICAgR2FtZS5FdmVudC5vbihHYW1lLkVWRU5UX0ZPUkNFX0xFQVZFX0dBTUUsIHRoaXMsIHRoaXMub25Gb3JjZUxlYXZlKTtcclxuICAgICAgICBHYW1lLkV2ZW50Lm9uKEdhbWUuRVZFTlRfTk9UX0lOX1RBQkxFLCB0aGlzLCB0aGlzLnJlRW50ZXIpO1xyXG4gICAgICAgIEdhbWUuRXZlbnQub24oR2FtZS5FVkVOVF9TT0NLRVRfUkVDT05ORUNULCB0aGlzLCB0aGlzLm9uU29ja2V0UmVjb25uZWN0KTtcclxuXHJcbiAgICAgICAgLy8g5byA5ZCvZnBz5L+h5oGv6LCD6K+V56qXIFxyXG4gICAgICAgIC8vIGNjLmRlYnVnLnNldERpc3BsYXlTdGF0cyh0cnVlKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCkge1xyXG4gICAgICAgIC8v5by65Yi26YCA5Ye65ri45oiPICDluLjnlKjkuI7nvZHnu5zlvILluLhcclxuICAgICAgICBHYW1lLkV2ZW50Lm9mZihHYW1lLkVWRU5UX0ZPUkNFX0xFQVZFX0dBTUUsIHRoaXMsIHRoaXMub25Gb3JjZUxlYXZlKTtcclxuICAgICAgICBHYW1lLkV2ZW50Lm9mZihHYW1lLkVWRU5UX05PVF9JTl9UQUJMRSwgdGhpcywgdGhpcy5yZUVudGVyKTtcclxuICAgICAgICBHYW1lLkV2ZW50Lm9mZihHYW1lLkVWRU5UX1NPQ0tFVF9SRUNPTk5FQ1QsIHRoaXMsIHRoaXMub25Tb2NrZXRSZWNvbm5lY3QpO1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG5cclxuICAgICAgICAvLyDlhYjms6jplIDkuovku7YsIOWGjemUgOavgeaOp+WItuWZqCwg5pyA5ZCO6ZSA5q+B5pWw5o2uXHJcbiAgICAgICAgQmJ3ekRyaXZlci5pbnN0YW5jZSA9IG51bGw7XHJcbiAgICAgICAgQmJ3ekRhdGEuaW5zdGFuY2UgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpe1xyXG4gICAgICAgIHRoaXMuaW5pdExvYWRpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGluaXRMb2FkaW5nKCl7XHJcbiAgICAgICAgaWYgKEdsb2JhbC5HYW1lRGF0YS5jaGVja0hhc0N1c3RvbUxvYWRpbmcgJiYgIUdsb2JhbC5HYW1lRGF0YS5jaGVja0hhc0N1c3RvbUxvYWRpbmcoQmJ3ekNvbnN0RGVmaW5lLkdBTUVfSUQpKXtcclxuICAgICAgICAgICAgbGV0IGNvbXAgPSBhd2FpdCBHbG9iYWwuVUlIZWxwZXIuZ2V0R2FtZUxvYWRpbmdDb21wKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ0NvbnRlbnQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbXAubm9kZS5zZXRQYXJlbnQodGhpcy5sb2FkaW5nTm9kZSk7XHJcbiAgICAgICAgICAgIGNvbXAubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdDb250ZW50LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgQmJ3ekRhdGEuZ2V0R2FtZUluZm9EYXRhKCk7XHJcbiAgICAgICAgdGhpcy5wcmVMb2FkUmVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpooTliqDovb3otYTmupBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBwcmVMb2FkUmVzKCkge1xyXG4gICAgICAgIGxldCBhdGxhc0FyciA9IFtcclxuICAgICAgICAgICAgQmJ3elBhdGhIZWxwZXIuZ2FtZVRleHR1cmVQYXRoICsgXCJhdGxhcy9wb2tlci9hdGxhc19wb2tlclwiLFxyXG4gICAgICAgICAgICBCYnd6UGF0aEhlbHBlci5nYW1lVGV4dHVyZVBhdGggKyBcImF0bGFzL2R5bmFtaWMvYXRsYXNfZHluYW1pY1wiLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgbGV0IHByZWZhYkFyciA9IFtcclxuICAgICAgICAgICAgQmJ3elBhdGhIZWxwZXIuZ2FtZVRleHR1cmVQYXRoICsgXCJhdGxhcy9keW5hbWljL2ZvbnQvXCIgKyBCYnd6Q29uc3REZWZpbmUucmV3YXJkRm9udFN0ci5XaW4sICAgICAgIC8vIOWhnuWIsHByZWZhYuS4gOi1t+mihOWKoOi9ve+8jOS4jeS8oOexu+Wei+iHquihjOaOqOaWrVxyXG4gICAgICAgICAgICBCYnd6UGF0aEhlbHBlci5nYW1lVGV4dHVyZVBhdGggKyBcImF0bGFzL2R5bmFtaWMvZm9udC9cIiArIEJid3pDb25zdERlZmluZS5yZXdhcmRGb250U3RyLkxvc2UsXHJcbiAgICAgICAgICAgIEJid3pQYXRoSGVscGVyLmdhbWVUZXh0dXJlUGF0aCArIFwiYXRsYXMvZHluYW1pYy9mb250L1wiICsgQmJ3ekNvbnN0RGVmaW5lLmFyZWFSZXdhcmRGb250U3RyLldpbixcclxuICAgICAgICAgICAgQmJ3elBhdGhIZWxwZXIuZ2FtZVRleHR1cmVQYXRoICsgXCJhdGxhcy9keW5hbWljL2ZvbnQvXCIgKyBCYnd6Q29uc3REZWZpbmUuYXJlYVJld2FyZEZvbnRTdHIuTG9zZSxcclxuXHJcbiAgICAgICAgICAgIEJid3pQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicG9wL0Jid3pIaXN0b3J5UG9wXCIsXHJcbiAgICAgICAgICAgIEJid3pQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicG9wL0Jid3pOb3RpY2VQb3BcIixcclxuICAgICAgICAgICAgQmJ3elBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwb3AvQmJ3ek9ubGluZVBsYXllclBvcFwiLFxyXG4gICAgICAgICAgICBCYnd6UGF0aEhlbHBlci5nYW1lUHJlZmFic1BhdGggKyBcInBvcC9CYnd6UnVsZVBvcFwiLFxyXG4gICAgICAgICAgICBCYnd6UGF0aEhlbHBlci5nYW1lUHJlZmFic1BhdGggKyBcInBvcC9CYnd6U2V0dGluZ1BvcFwiLFxyXG5cclxuICAgICAgICAgICAgQmJ3elBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwYW5lbC9zdWJWaWV3L2NvaW5WaWV3XCIsXHJcbiAgICAgICAgICAgIEJid3pQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicGFuZWwvc3ViVmlldy9zdGF0ZVZpZXdcIixcclxuICAgICAgICAgICAgQmJ3elBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwYW5lbC9zdWJWaWV3L2JpZ1dpbm5lclwiLFxyXG4gICAgICAgICAgICBCYnd6UGF0aEhlbHBlci5nYW1lUHJlZmFic1BhdGggKyBcInBhbmVsL3N1YlZpZXcvY29tcGFyZVBva2VyXCIsXHJcbiAgICAgICAgICAgIEJid3pQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicGFuZWwvc3ViVmlldy9zZWxlY3RDaGlwc05vZGVcIixcclxuICAgICAgICAgICAgQmJ3elBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwYW5lbC9zdWJWaWV3L3Jld2FyZEFyZWFcIixcclxuICAgICAgICAgICAgQmJ3elBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwYW5lbC9zdWJWaWV3L2JldEFyZWFcIixcclxuXHJcbiAgICAgICAgICAgIEJid3pQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicGFuZWwvQmJ3ekdhbWVQYW5lbFwiLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGxvYWRBdGxhcyA9ICgpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQnVuZGxlUmVzKEJid3pDb25zdERlZmluZS5HQU1FX0lELGF0bGFzQXJyLCAoZXJyLCByZXMpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGxvYWRQcmVmYWIgPSAoKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEJ1bmRsZVJlcyhCYnd6Q29uc3REZWZpbmUuR0FNRV9JRCxwcmVmYWJBcnIsIChlcnIsIHJlcyk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgYXdhaXQgSGVhZFRpcHNNYW5hZ2VyLnByZWxvYWRSZXMoKTtcclxuICAgICAgICBhd2FpdCBUYXNrTWFuYWdlci5wcmVsb2FkUmVzKCk7XHJcbiAgICAgICAgYXdhaXQgbG9hZEF0bGFzKCk7XHJcbiAgICAgICAgYXdhaXQgbG9hZFByZWZhYigpO1xyXG4gICAgICAgIC8vIOmYsuatomxvYWTov4fnqIvkuK3lvLrouKLliLDlpKfljoXlkI7osIPnlKjmiqXplJlcclxuICAgICAgICBpZiAoIXRoaXMubm9kZSB8fCAhY2MuaXNWYWxpZCh0aGlzLm5vZGUpIHx8ICF0aGlzLmluR2FtZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEJid3pEYXRhLmluaXQoKTsgICAgICAgIC8vIOaVsOaNruS8mOWFiOS6jlVJXHJcbiAgICAgICAgdGhpcy5pbml0VUkoKTtcclxuICAgICAgICBHYW1lLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy50cnlTdGFydEdhbWUoKTsgICAgLy8g6L+e5o6l5Y2P6K6u5LmL5YmN5oqK5omA5pyJ5aSnVUnpg73lrp7kvovlpb0gIOmihOeVmeaXtumXtOS/neivgeaJgOaciVVJ5a6e5L6L5YyW5aW9XHJcbiAgICAgICAgfSwgMC41KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRVSSgpe1xyXG4gICAgICAgIGxldCBwb3BQcmVmYWJBcnIgPSBbXHJcbiAgICAgICAgICAgIEJid3pQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicG9wL0Jid3pIaXN0b3J5UG9wXCIsXHJcbiAgICAgICAgICAgIEJid3pQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicG9wL0Jid3pPbmxpbmVQbGF5ZXJQb3BcIixcclxuICAgICAgICAgICAgQmJ3elBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwb3AvQmJ3elJ1bGVQb3BcIixcclxuICAgICAgICAgICAgQmJ3elBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwb3AvQmJ3elNldHRpbmdQb3BcIixcclxuICAgICAgICAgICAgQmJ3elBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwb3AvQmJ3ek5vdGljZVBvcFwiLFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIGxldCBwb3BMYXllciA9IEdsb2JhbC5VSS5nZXRMYXllcihcIlBvcExheWVyXCIpIHx8IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpPCBwb3BQcmVmYWJBcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgcHJlZmFiID0gR2xvYmFsLlJlc291cmNlTWFuYWdlci5nZXRCdW5kbGVSZXMoQmJ3ekNvbnN0RGVmaW5lLkdBTUVfSUQscG9wUHJlZmFiQXJyW2ldLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgICAgICBsZXQgcG9wTm9kZTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgIHBvcE5vZGUuc2V0UGFyZW50KHBvcExheWVyKTtcclxuICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcG9wTm9kZS5hY3RpdmUgPSB0cnVlOyAgICAgIC8vIOWIneWni+WMlu+8jOS8mOWMluesrOS4gOasoeaJk+W8gOWunuS+i+WMlumAn+W6plxyXG4gICAgICAgICAgICAgICAgdGhpcy5oaXN0b3J5UG9wID0gR2xvYmFsLlVJSGVscGVyLnNhZmVHZXRDb21wb25lbnQocG9wTm9kZSwgJycsIEJid3pIaXN0b3J5UG9wKTtcclxuICAgICAgICAgICAgICAgIHBvcE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGkgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgcG9wTm9kZS5hY3RpdmUgPSBmYWxzZTsgICAgIC8vIOS4jemcgOimgeWIneWni+WMllxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbmxpbmVQb3AgPSBHbG9iYWwuVUlIZWxwZXIuc2FmZUdldENvbXBvbmVudChwb3BOb2RlLCAnJywgQmJ3ek9ubGluZVBsYXllclBvcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGkgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgcG9wTm9kZS5hY3RpdmUgPSBmYWxzZTsgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5ydWxlUG9wID0gR2xvYmFsLlVJSGVscGVyLnNhZmVHZXRDb21wb25lbnQocG9wTm9kZSwgJycsIEJid3pSdWxlUG9wKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaSA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBwb3BOb2RlLmFjdGl2ZSA9IGZhbHNlOyAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nUG9wID0gR2xvYmFsLlVJSGVscGVyLnNhZmVHZXRDb21wb25lbnQocG9wTm9kZSwgJycsIEJid3pTZXR0aW5nUG9wKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaSA9PSA0KSB7XHJcbiAgICAgICAgICAgICAgICBwb3BOb2RlLmFjdGl2ZSA9IGZhbHNlOyAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpY2VQb3AgPSBHbG9iYWwuVUlIZWxwZXIuc2FmZUdldENvbXBvbmVudChwb3BOb2RlLCAnJywgQmJ3ek5vdGljZVBvcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwcmVmYWIgPSBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmdldEJ1bmRsZVJlcyhCYnd6Q29uc3REZWZpbmUuR0FNRV9JRCxCYnd6UGF0aEhlbHBlci5nYW1lUHJlZmFic1BhdGggKyBcInBhbmVsL0Jid3pHYW1lUGFuZWxcIiwgY2MuUHJlZmFiKTtcclxuICAgICAgICBsZXQgZ2FtZVBhbmVsOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTsgICAgLy/lrp7kvovljJbmuLjmiI/nlYzpnaJcclxuICAgICAgICBsZXQgbWFpbkxheWVyID0gR2xvYmFsLlVJLmdldExheWVyKFwiTWFpbkxheWVyXCIpIHx8IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlO1xyXG4gICAgICAgIGdhbWVQYW5lbC5zZXRQYXJlbnQobWFpbkxheWVyKTtcclxuICAgICAgICBnYW1lUGFuZWwuYWN0aXZlID0gdHJ1ZTsgICAgICAgIC8vIOmcgOimgei1sG9ubG9hZOWIneWni+WMllxyXG4gICAgICAgIHRoaXMuZ2FtZVVJID0gR2xvYmFsLlVJSGVscGVyLnNhZmVHZXRDb21wb25lbnQoZ2FtZVBhbmVsLCAnJywgQmJ3ekdhbWVQYW5lbCk7XHJcbiAgICAgICAgZ2FtZVBhbmVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWwneivlei/m+WFpea4uOaIj1xyXG4gICAgcHJpdmF0ZSB0cnlTdGFydEdhbWUoKSB7XHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKFwiQmJ3eiB0cnlTdGFydEdhbWVcIik7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlCdW5kbGVNdXNpYyhCYnd6Q29uc3REZWZpbmUuR0FNRV9JRCxCYnd6Q29uc3REZWZpbmUuU09VTkRfQkdNKTtcclxuICAgICAgICBCYnd6TmV0SGFuZGxlci5yZWdpc3Rlck5ldEhhbmRsZXIoKTtcclxuICAgICAgICB0aGlzLmVudGVyR2FtZShHYW1lLkNvbnRyb2wuY3VyTHYpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L29dmlw5aS05YOP5qGG77yM5aaC5p6c5L2/55So55qE5LiN5pivdmlw5aS05YOP5qGG77yM5YiZ5L2/55So5a2Q5ri45oiP6buY6K6k5aS05YOP5qGGXHJcbiAgICAgKiBAcGFyYW0gc3ByaXRlSGVhZEt1YW5nIOWktOWDj+ahhlNwcml0ZVxyXG4gICAgICogQHBhcmFtIGhlYWRrdWFuZyB2aXDlpLTlg4/moYblrZfnrKbkuLJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRWaXBIZWFkS3Vhbmcoc3ByaXRlSGVhZEt1YW5nOiBjYy5TcHJpdGUsIGhlYWRrdWFuZzogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gR2xvYmFsLlRvb2xraXQubG9hZExvY2FsSGVhZEZyYW1lKHNwcml0ZUhlYWRLdWFuZywgaGVhZGt1YW5nKTtcclxuICAgICAgICB2YXIgYXRsYXNTdHJpbmcgPSBcInRleHR1cmUvYXRsYXMvaGVhZEZyYW1lL2hlYWRGcmFtZVwiO1xyXG4gICAgICAgIHZhciBzZlN0cmluZyA9IFwidHhrdWFuZ192aXBcIiArIGhlYWRrdWFuZztcclxuICAgICAgICAvLyByZXR1cm4gR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHRoaXMuaGVhZEJveCwgYXRsYXNTdHJpbmcsIHNmU3RyaW5nLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuaGVhZEJveC5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5DVVNUT007XHJcbiAgICAgICAgLy8gICAgIHRoaXMuaGVhZEJveC50cmltID0gZmFsc2VcclxuICAgICAgICAvLyB9LCBmYWxzZSk7XHJcbiAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQnVuZGxlQXV0b0F0bGFzKFwiMTAxN1wiLCBzcHJpdGVIZWFkS3VhbmcsIGF0bGFzU3RyaW5nLCBzZlN0cmluZywgbnVsbCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDor7fmsYLnprvlvIDmuLjmiI9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlcUxlYXZlR2FtZSgpIHtcclxuICAgICAgICBHYW1lLlNlcnZlci5zZW5kKEJid3pDb25zdERlZmluZS5TRU5EX0xFQVZFLCB7IFwiSXNDbG9zZVwiOiAxIH0pO1xyXG4gICAgICAgIEdhbWUuVHdlZW4uY2xlYXIoKTtcclxuICAgICAgICBHYW1lLkNvbXBvbmVudC51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lVUkuY2xlYXJCeVJvdW5kKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tTaG93Q2hvb3NlTGV2ZWwoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5leGl0U2NlbmUoKTtcclxuICAgICAgICAgICAgfSwgMC41KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmV4aXRTY2VuZSgpO1xyXG4gICAgICAgIH0sIDAuNSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gIOaYr+WQpumcgOimgeaYvuekuumAieWculxyXG4gICAgcHVibGljIGNoZWNrU2hvd0Nob29zZUxldmVsKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBnYW1lSW5mbyA9IEdsb2JhbC5HYW1lRGF0YS5nZXRHYW1lSW5mbyhCYnd6Q29uc3REZWZpbmUuR0FNRV9JRCk7XHJcbiAgICAgICAgaWYgKGdhbWVJbmZvICE9IG51bGwgJiYgZ2FtZUluZm8ubGV2ZWxzICE9IG51bGwgJiYgZ2FtZUluZm8ubGV2ZWxzLmxlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgIDlh7rmuLjmiI/lsYLvvIzov5Tlm57pgInlnLrlsYJcclxuICAgICAqIEBmb3JjZUdvVG9IYWxsIOWkp+WOheaOqOmAgeaXtuesrOS4gOS4quWPguaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25Gb3JjZUxlYXZlKGZvcmNlR29Ub0hhbGw6IGJvb2xlYW4gPSB0cnVlLCBleHBsYWluOiBzdHJpbmcgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKGZvcmNlR29Ub0hhbGwpIHtcclxuICAgICAgICAgICAgaWYgKGV4cGxhaW4pXHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVG9vbGtpdC50cmFuc21pdEhhbGxNc2coZXhwbGFpbiwgbnVsbCwgbnVsbCwgMSk7XHJcbiAgICAgICAgICAgIC8v6YCA5Ye65ri45oiPXHJcbiAgICAgICAgICAgIHRoaXMuZXhpdFNjZW5lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIC8vIOemu+W8gOa4uOaIj+i/lOWbnumAieWculxyXG4gICAgICAgICAgICB0aGlzLmV4aXRTY2VuZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDpgIDlh7rmuLjmiI/lnLrmma/vvIzov5Tlm57lpKfljoVcclxuICAgIHByaXZhdGUgZXhpdFNjZW5lKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbkdhbWUpICAgICAgIC8vIDEu5Yqg5bu25pe26YCA5Ye65L+d6K+B5pyN5Yqh5Zmo5pS25YiwbGVhdmXmtojmga/pgb/lhY1zaHV0RG93buaOiSAgMi7liqByZXR1cm7liKTmlq3lt7Lnu4/pgIDlh7rnmoTml6Dpobvph43lpI3miafooYxcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vdGhpcy5nYW1lVUkubm9kZS5hY3RpdmUgPSBmYWxzZTsgICAgICAgIC8vIGRlYnVnIOmAgOWHuuWcuuaZr+acieamgueOh+S4jeS8mueri+WNs+mUgOavgSwgdXBkYXRl6L+Y5piv5Lya6LeR6L+Y5ZyoYWRkIFR3ZWVuLCDlr7zoh7TmiqXplJlcclxuICAgICAgICB0aGlzLmhpZGVBbGxQb3AoKTtcclxuICAgICAgICBcclxuICAgICAgICBHYW1lLkNvbXBvbmVudC51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgR2FtZS5Ud2Vlbi5jbGVhcigpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5zaHV0RG93bih0cnVlKTtcclxuICAgICAgICB0aGlzLmluR2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrU2hvd0Nob29zZUxldmVsKCkpIHtcclxuICAgICAgICAgICAgR2xvYmFsLlRvb2xraXQudHJhbnNtaXRIYWxsV2luZG93KFwiV25kSGFsbENob29zZVJvb21cIiwgQmJ3ekNvbnN0RGVmaW5lLkdBTUVfSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuU2NlbmVNYW5hZ2VyLmdvVG9IYWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6L+e5o6l5ri45oiP5pyNXHJcbiAgICBwcml2YXRlIGVudGVyR2FtZShsZXZlbElkOiBzdHJpbmcpIHtcclxuICAgICAgICBHYW1lLkNvbnRyb2wuY29ubm5lY3RBbmRFbnRlckdhbWVJbkxldmVsU2NlbmUoQmJ3ekNvbnN0RGVmaW5lLkdBTUVfSUQsIGxldmVsSWQsIFwiZGVmYXVsdFwiLCBudWxsLCBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlRW50ZXIoKXtcclxuICAgICAgICBHYW1lLkNvbnRyb2wudHJ5U2VuZEVudGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNvY2tldFJlY29ubmVjdCgpIHtcclxuICAgICAgICBHYW1lLlR3ZWVuLmNsZWFyKCk7XHJcbiAgICAgICAgR2FtZS5Db21wb25lbnQudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5zdG9wQWxsRWZmZWN0KCk7XHJcbiAgICAgICAgdGhpcy5nYW1lVUkuY2xlYXJCeVJvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6L+b5YWl5ri45oiP55WM6Z2iXHJcbiAgICBwdWJsaWMgZ290b0dhbWVQYW5lbCgpIHtcclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuSElERV9ORVRfV0FJVElORywgXCJDb25uZWN0R2FtZVwiKTtcclxuICAgICAgICBpZiAodGhpcy5nYW1lVUkubm9kZS5hY3RpdmUpICAgICAgICAvLyDlt7Lnu4/lnKjlnLrlhoVcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgY29tcCA9IEdsb2JhbC5VSUhlbHBlci5hZGRJbnRvR2FtZUFuaW1Db21wKHRoaXMuZ2FtZVVJLm5vZGUsIHRoaXMubG9hZGluZ05vZGUsIFt0aGlzLmdhbWVVSS5zZWxlY3RDaGlwc1ZpZXcubm9kZV0sIFtdLCBbXSwgW10pO1xyXG4gICAgICAgIGNvbXAubWFza05vZGUgPSB0aGlzLm1hc2tOb2RlO1xyXG4gICAgICAgIHRoaXMubWFza05vZGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgdGhpcy5tYXNrTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubWFza05vZGUuekluZGV4ID0gMTE7ICAgICAgLy8gR2xvYmFsLlVJ5ZyoMTBcclxuICAgICAgICB0aGlzLmdhbWVVSS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGxldCB0aW1lID0gMTtcclxuICAgICAgICBjb21wLnN0YXJ0QW5pbXRpb25CeU1hc2sodGltZSwgMCwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX0FERFRJTUVMT0NLLCBcIkludG9HYW1lQW5pbWF0aW9uXCIsIHRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb3RvQ2hvb3NlTGV2ZWwoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6ZqQ6JeP5omA5pyJ5by556qXXHJcbiAgICBwdWJsaWMgaGlkZUFsbFBvcCgpIHtcclxuICAgICAgICB0aGlzLmhpc3RvcnlQb3Aubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMubm90aWNlUG9wLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vbmxpbmVQb3Aubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJ1bGVQb3Aubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNldHRpbmdQb3Aubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxufTtcclxuIl19