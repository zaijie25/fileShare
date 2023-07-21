
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/scene/SceneManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '052fb34CelPzLrKBDwoQ+wt', 'SceneManager');
// hall/scripts/logic/core/scene/SceneManager.ts

"use strict";
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
exports.SceneType = void 0;
var HallPopMsgHelper_1 = require("../../hall/tool/HallPopMsgHelper");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SceneType;
(function (SceneType) {
    SceneType[SceneType["None"] = 0] = "None";
    SceneType[SceneType["Login"] = 1] = "Login";
    SceneType[SceneType["Hall"] = 2] = "Hall";
    SceneType[SceneType["Game"] = 3] = "Game";
})(SceneType = exports.SceneType || (exports.SceneType = {}));
var SceneManager = /** @class */ (function () {
    function SceneManager() {
        this.LOGIN_SCENE_ID = 1;
        this.HALL_SCENE_ID = 2;
        this.GAME_SCENE_ID = 3;
        this.switchSceneTimer = null;
    }
    SceneManager.prototype.setup = function () {
        this.sceneType = SceneType.None;
    };
    SceneManager.prototype.inGame = function () {
        return this.sceneType == SceneType.Game;
    };
    Object.defineProperty(SceneManager.prototype, "sceneType", {
        get: function () {
            return this._sceneType;
        },
        set: function (value) {
            Logger.error("set sceneType from, to", SceneType[this._sceneType], SceneType[value]);
            this._sceneType = value;
        },
        enumerable: false,
        configurable: true
    });
    SceneManager.prototype.goToLogin = function () {
        //注销账号管理器缓存数据清空
        Global.ModelManager.clear();
        //返回登录界面
        Global.UI.closeAllUIPrefab();
        HallPopMsgHelper_1.default.releaseInstance();
        if (this.sceneType == SceneType.None) {
            this.sceneType = SceneType.Login;
            this.loadHallScene();
        }
        else if (this.sceneType == SceneType.Game) {
            Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME, true);
            Game.Control.shutDown(true);
            Global.SceneManager.goToHall();
            this.sceneType = SceneType.Login;
        }
        else {
            this.sceneType = SceneType.Login;
            if (cc.director.getScene() && cc.director.getScene().name != "LoadingScene")
                Global.UI.show("WndLogin");
        }
    };
    SceneManager.prototype.goToHall = function () {
        if (this.sceneType == SceneType.Hall) {
            return;
        }
        Global.NativeJSBBridge.addClickGames("hall");
        Global.UI.closeAllUIPrefab();
        if (this.sceneType == SceneType.Game) {
            this.sceneType = SceneType.Hall;
            if (Global.Setting.isStartHotUpdate) {
                Global.SceneManager.onLoadHallScene();
            }
            else {
                Global.SceneManager.loadHallScene();
            }
        }
        else {
            this.sceneType = SceneType.Hall;
            Global.UI.show("WndHall");
            var data = Global.PlayerData;
            if (data.type !== 1) {
                Global.Audio.playAudioSource("hall/sound/inithall");
            }
            Global.UI.closeHallLoading();
        }
    };
    SceneManager.prototype.onLoadHallScene = function () {
        var _this = this;
        if (this.sceneType == SceneType.Game) {
            this.sceneType = SceneType.Hall;
        }
        Global.UI.closeAllUIPrefab();
        var HotUpdateManager = Global.HotUpdateManager;
        var gameName = HotUpdateManager.updateHelper.gameType();
        var storagePath = HotUpdateManager.updateHelper.genStoragePath(gameName);
        Logger.log("onLoadHallScene -----------" + storagePath);
        // window.require(storagePath + '/src/dating.js')
        var curHallBundle = Global.customApp.getHallBundleName();
        if (curHallBundle) {
            if (Global.ResourceManager.checkBundleValid(curHallBundle)) {
                this.doLoadHallScene(null);
            }
            else {
                Global.customApp.loadHallBundle(function (error, bundle) {
                    if (error) {
                        Logger.error("onLoadHallScene load hall bundle error " + error.message);
                        return;
                    }
                    _this.doLoadHallScene(null);
                });
            }
        }
        else {
            this.doLoadHallScene(null);
        }
        // this.releaseCurGameBundle()     // debug 放在外面子游戏退回到大厅会有一帧的页面虚化
        return;
    };
    SceneManager.prototype.loadHallScene = function (cb) {
        var _this = this;
        if (this.sceneType == SceneType.Game) {
            this.sceneType = SceneType.Hall;
        }
        Logger.log("--------loadHallScene-------");
        Global.UI.closeAllUIPrefab();
        var curHallBundle = Global.customApp.getHallBundleName();
        if (curHallBundle) {
            if (Global.ResourceManager.checkBundleValid(curHallBundle)) {
                this.doLoadHallScene(cb);
            }
            else {
                Global.customApp.loadHallBundle(function (error, bundle) {
                    if (error) {
                        Logger.error("onLoadHallScene load hall bundle error " + error.message);
                        return;
                    }
                    _this.doLoadHallScene(cb);
                });
            }
        }
        else {
            this.doLoadHallScene(cb);
        }
    };
    SceneManager.prototype.doLoadHallScene = function (cb) {
        var _this = this;
        cc.director.loadScene('HallScene', function () {
            if (cb) {
                cb();
            }
            _this.releaseCurGameBundle();
            _this.adjustRedMiUI12();
        });
    };
    //适配小米10系列 MIUI12 Android11系统 进入大厅闪退
    SceneManager.prototype.adjustRedMiUI12 = function () {
        var phone_device_brand = Global.Setting.SystemInfo.deviceBrand;
        var osVer = cc.sys.osVersion;
        if (phone_device_brand && (phone_device_brand.toLowerCase() == "xiaomi") && (osVer == "11" || osVer == "11.0" || osVer == "11.0.0")) { // 小米Android系统11系列执行
            // Logger.error("adjustRedMiUI12 excute success +++++++++++++")
            var canvas = cc.find("Canvas");
            var camNode = canvas.getChildByName("CameraClearStencil");
            var camera = null;
            if (!cc.isValid(camNode)) {
                Logger.error("adjustRedMiUI12 camNode null");
                camNode = new cc.Node("CameraClearStencil");
                camera = camNode.addComponent(cc.Camera);
                canvas.addChild(camNode);
            }
            camNode.groupIndex = 1;
            camera.clearFlags = cc.Camera.ClearFlags.DEPTH | cc.Camera.ClearFlags.STENCIL;
            camera.depth = 10;
            camera.cullingMask = 0;
        }
        else {
            Logger.error("adjustRedMiUI12 excute failed +++++++++++++ phone_device_brand " + phone_device_brand + " osVersion = " + osVer);
        }
    };
    SceneManager.prototype.releaseCurGameBundle = function () {
        var releaseHelper = Global.ResourceManager.releaseHelper;
        var gameBundle = Global.ResourceManager.gameBundle;
        releaseHelper.releaseBundle(gameBundle);
        Global.ResourceManager.gameBundle = '';
    };
    SceneManager.prototype.loadGameScene = function (cb) {
        if (this.sceneType == SceneType.Game) {
            Logger.error("this.sceneType == SceneType.Game");
            return;
        }
        Global.UI.SetMessageBoxInGame(false);
        this.sceneType = SceneType.Game;
        //进游戏关闭大厅音乐
        Global.Audio.stopMusic();
        Global.UI.closeAllUIPrefab(true);
        Global.UI.RestorePersistNode();
        var HotUpdateManager = Global.HotUpdateManager;
        var currentGame = HotUpdateManager.CurrentGame;
        Global.ResourceManager.gameBundle = currentGame;
        Global.NativeJSBBridge.addClickGames(currentGame.toString());
        this.setGameSearchPath(currentGame);
        Logger.log("----------------------------currentGame ====" + currentGame);
        var bundlePath = currentGame.toString();
        this.loadGameSceneByGid(bundlePath);
    };
    SceneManager.prototype.loadGameSceneByGid = function (bundleName, finishCall) {
        var _this = this;
        var currentGame = bundleName;
        this.switchSceneTimer = setTimeout(function () {
            Global.Toolkit.removeDir(Number(currentGame), "进入子游戏失败");
        }, 5000);
        var self = this;
        Global.ResourceManager.loadBundle(currentGame, function (err, bundle) { return __awaiter(_this, void 0, void 0, function () {
            var sceneID, sceneName;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.clearTimer();
                        if (err) {
                            Global.Toolkit.removeDir(Number(currentGame), "加载子游戏bundle失败");
                            Logger.error("load failed " + currentGame);
                            return [2 /*return*/];
                        }
                        sceneID = Number(currentGame);
                        if (Game.Control.GAME_DDZ_HJ_ARR.indexOf(sceneID) >= 0) {
                            if (Game.Control.curGid > 0) {
                                sceneID = Game.Control.curGid;
                            }
                        }
                        sceneName = '';
                        switch (sceneID.toString()) {
                            case "1002": //百人牛牛
                                sceneName = "BullPVEGame";
                                break;
                            case "1005": //龙虎斗
                                sceneName = 'LongHuGame';
                                break;
                            case "1006":
                                sceneName = 'HongHeiGame';
                                break;
                            case "1007": //百家乐
                                sceneName = 'BaccaratGame';
                                break;
                            case "1009":
                                sceneName = 'bzbw';
                                break;
                            case "1010": //推筒子
                                sceneName = 'TuitongziGame';
                                break;
                            case "1011": //欢乐至尊
                                sceneName = 'HuanlezhizunGame';
                                break;
                            case "1014":
                                sceneName = 'WanRenGame';
                                break;
                            case "1015": //五星宏辉
                                sceneName = 'WuxinghonghuiGame';
                                break;
                            case "1016": //二八杠
                                sceneName = 'ErbagangGame';
                                break;
                            case "1017": //百变五张
                                sceneName = 'BbwzGame';
                                break;
                            case "1018": //决战五张
                                sceneName = 'JzwzGame';
                                break;
                            case "1019": //飞禽走兽
                                sceneName = 'FqzsGameScene';
                                break;
                            case "1020": // 鱼虾蟹
                                sceneName = 'YxxScene';
                                break;
                            case "1021": // 秦皇汉武
                                sceneName = 'QhhwScene';
                                break;
                            case "1022": // 西游记
                                sceneName = 'XyjGameScene';
                                break;
                            case "2001":
                                sceneName = 'BullPVPScene';
                                break;
                            case "2002":
                                sceneName = 'BullTwoScene';
                                break;
                            case "2003":
                                sceneName = 'ZJHScene';
                                break;
                            case "2004": //十三水
                                sceneName = 'ShisanshuiGame';
                                break;
                            case "2005":
                                sceneName = 'DDZPvpScene';
                                break;
                            case "2006":
                                sceneName = 'BullTBScene';
                                break;
                            case "2007":
                                sceneName = 'BullKPScene';
                                break;
                            case "2008": // 21点
                                sceneName = 'BlackJackScene';
                                break;
                            case "2009": // 疯狂牛牛
                                sceneName = 'FknnScene';
                                break;
                            case "2010": // 德州扑克
                                sceneName = 'TexasHoldemScene';
                                break;
                            case "2011": // 一拳超人
                                sceneName = 'OnePunchScene';
                                break;
                            case "2012":
                                sceneName = 'PdkScene';
                                break;
                            case "2013":
                                sceneName = 'DdzTwoScene';
                                break;
                            case "2014":
                                sceneName = 'BullHPScene';
                                break;
                            case "2101": // 二人麻将
                                sceneName = 'ErmjScene';
                                break;
                            case "2102": // 血流麻将
                                sceneName = 'XlmjScene';
                                break;
                            case "4001": //红包扫雷
                                sceneName = 'RedPackScene';
                                break;
                            case "4002": //红包接龙
                                sceneName = 'HbjlGame';
                                break;
                            case "3001":
                                sceneName = 'main';
                                break;
                            case "3002": //3D捕鱼
                                sceneName = 'Fish3DGame';
                                break;
                            case "3003":
                                sceneName = 'DntgFishScene';
                                break;
                            case "3004":
                                sceneName = 'JcbyFishScene';
                                break;
                            case "3005":
                                sceneName = 'FishGameScene';
                                break;
                            case "3006":
                                sceneName = 'Fish3GameScene';
                                break;
                            case "1001":
                                sceneName = 'toubao';
                                break;
                            case "5001":
                                sceneName = 'CqbyScene';
                                break;
                            case "5002": //多福多财
                                sceneName = 'DuofuduocaiGame';
                                break;
                            case "5003": //跑马水果机
                                sceneName = 'shuiguoji';
                                break;
                            case "5004": //澳门风云
                                sceneName = 'AmfyGame';
                                break;
                            case "5005": //古惑仔
                                sceneName = 'GhzGameScene';
                                break;
                            case "5006": //拳皇97
                                sceneName = 'Qh97GameScene';
                                break;
                            case "6001": //六合彩
                                sceneName = 'MK6Game';
                                break;
                            case "7005": //真人龙虎
                                sceneName = 'ShixunLonghuGame';
                                break;
                            default:
                                Logger.error("enter hall -----");
                                break;
                        }
                        Game.GamePreloadTool.setup(Number(currentGame)); // debug 这里加载处理杀掉进程重连情况
                        if (!Game.GamePreloadTool.checkPreloadBundleExist(Number(currentGame))) return [3 /*break*/, 3];
                        return [4 /*yield*/, Game.GamePreloadTool.preloadBundle()];
                    case 1:
                        _a.sent(); // 后续子游戏preload优先级提高, 需要先一步加载 先预埋
                        return [4 /*yield*/, Game.GamePreloadTool.preloadPrefab(Game.GamePreloadTool.lobbyUIPath)];
                    case 2:
                        _a.sent(); // 杀掉进程重连时候要预加载选场以便退出游戏时快速显示
                        _a.label = 3;
                    case 3:
                        this.switchSceneTimer = setTimeout(function () {
                            Global.Toolkit.removeDir(Number(currentGame), "加载子游戏场景失败");
                        }, 5000);
                        try {
                            bundle.loadScene(sceneName, function (err, sceneAsset) {
                                _this.clearTimer();
                                if (err) {
                                    Logger.error("加载子游戏bundle失败--------------loadScene------");
                                    Logger.error("bundle loadScene " + sceneName + " error = " + err.message);
                                    Global.Toolkit.removeDir(Number(currentGame), err);
                                    return;
                                }
                                cc.director.loadScene(sceneName, function () {
                                    if (finishCall) {
                                        finishCall();
                                    }
                                    self.adjustRedMiUI12();
                                });
                            });
                        }
                        catch (error) {
                            Global.Toolkit.removeDir(Number(currentGame), error);
                            // expected output: ReferenceError: nonExistentFunction is not defined
                            // Note - error messages will vary depending on browser
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    SceneManager.prototype.switchGameScene = function (gid) {
        if (this.sceneType !== SceneType.Game) {
            Logger.error("this.sceneType !== SceneType.Game");
            return;
        }
        var oldGameId = Global.HotUpdateManager.CurrentGame;
        var oldGameBundle = Global.ResourceManager.gameBundle;
        Global.UI.SetMessageBoxInGame(false);
        Global.UI.closeAllUIPrefab();
        var currentGame = String(gid);
        Global.HotUpdateManager.CurrentGame = currentGame;
        Global.ResourceManager.gameBundle = currentGame;
        Global.NativeJSBBridge.addClickGames(currentGame);
        this.setGameSearchPath(currentGame);
        Global.UI.close("WndGameLobbyShell"); // debug 跳转到无选场游戏时, 再退出重新进会显示前个游戏残影
        this.loadGameSceneByGid(currentGame, function () {
            // 跳转清理旧游戏资源 debug 旧选场资源还无法释放, UI还保存着在map里 只会多出一份选场资源暂不处理
            if (currentGame == oldGameId) {
                //合集类游戏会出现这种情况
                return;
            }
            Global.ResourceManager.releaseHelper.releaseBundle(oldGameBundle);
        });
    };
    SceneManager.prototype.setGameSearchPath = function (gid) {
        if (cc.sys.isNative) {
            var updateHelper = Global.HotUpdateManager.updateHelper;
            updateHelper.init(gid);
            var storagePath = updateHelper.storagePath();
            Global.SearchPathHelper.addOneGamePath(storagePath);
        }
    };
    SceneManager.prototype.removeGameSearchPath = function (gid) {
        if (cc.sys.isNative) {
            var storagePath = jsb.fileUtils.getWritablePath() + 'gameUpdate/' + gid;
            Global.SearchPathHelper.removeOnePath(storagePath);
        }
    };
    SceneManager.prototype.removeStoragePathFromSearchPaths = function (storagePath) {
        var searchPaths = jsb.fileUtils.getSearchPaths();
        if (storagePath && searchPaths && searchPaths.length > 0) {
            var pathIndex = -1;
            for (var i = 0; i < searchPaths.length; i++) {
                var path = searchPaths[i];
                if (path && (path == storagePath || path == (storagePath + "/"))) {
                    pathIndex = i;
                    break;
                }
            }
            searchPaths.splice(pathIndex, 1);
        }
        else {
            Logger.error("removeStoragePathFromSearchPaths searPaths or storagepath == null");
            //添加大厅热更目录
            if (searchPaths && searchPaths.length == 0) {
                Logger.error("removeStoragePathFromSearchPaths add Hall SearchPath");
                var hallNativeUpdatePath = Global.HotUpdateManager.getNativeHotUpdatePath('hall');
                searchPaths.unshift(hallNativeUpdatePath);
            }
        }
        return searchPaths;
    };
    SceneManager.prototype.clearTimer = function () {
        if (this.switchSceneTimer) {
            clearTimeout(this.switchSceneTimer);
            this.switchSceneTimer = null;
        }
    };
    SceneManager = __decorate([
        ccclass
    ], SceneManager);
    return SceneManager;
}());
exports.default = SceneManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHNjZW5lXFxTY2VuZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUVBQWdFO0FBRzFELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQVksU0FLWDtBQUxELFdBQVksU0FBUztJQUNqQix5Q0FBUSxDQUFBO0lBQ1IsMkNBQVMsQ0FBQTtJQUNULHlDQUFRLENBQUE7SUFDUix5Q0FBUSxDQUFBO0FBQ1osQ0FBQyxFQUxXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBS3BCO0FBR0Q7SUFBQTtRQUNXLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBR2pCLHFCQUFnQixHQUFHLElBQUksQ0FBQTtJQTZkbkMsQ0FBQztJQTVkVSw0QkFBSyxHQUFaO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO0lBQ3BDLENBQUM7SUFFTSw2QkFBTSxHQUFiO1FBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUM7SUFDNUMsQ0FBQztJQUVELHNCQUFXLG1DQUFTO2FBS3BCO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7YUFQRCxVQUFxQixLQUFLO1lBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNyRixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUM1QixD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QUMsZ0JBQWdCLEVBQUU7WUFDdkIsWUFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1lBQ25DLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUE7U0FDL0I7SUFDTCxDQUFDO0lBbGVnQixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBbWVoQztJQUFELG1CQUFDO0NBbmVELEFBbWVDLElBQUE7a0JBbmVvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhhbGxQb3BNc2dIZWxwZXIgZnJvbSBcIi4uLy4uL2hhbGwvdG9vbC9IYWxsUG9wTXNnSGVscGVyXCI7XHJcbmltcG9ydCB7IFJlcG9ydFRvb2wgfSBmcm9tIFwiLi4vdG9vbC9SZXBvcnRUb29sXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuZXhwb3J0IGVudW0gU2NlbmVUeXBlIHtcclxuICAgIE5vbmUgPSAwLFxyXG4gICAgTG9naW4gPSAxLFxyXG4gICAgSGFsbCA9IDIsXHJcbiAgICBHYW1lID0gMyxcclxufVxyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NlbmVNYW5hZ2VyIHtcclxuICAgIHB1YmxpYyBMT0dJTl9TQ0VORV9JRCA9IDE7XHJcbiAgICBwdWJsaWMgSEFMTF9TQ0VORV9JRCA9IDI7XHJcbiAgICBwdWJsaWMgR0FNRV9TQ0VORV9JRCA9IDM7XHJcbiAgICBwdWJsaWMgX3NjZW5lVHlwZTogU2NlbmVUeXBlO1xyXG5cclxuICAgIHByaXZhdGUgc3dpdGNoU2NlbmVUaW1lciA9IG51bGxcclxuICAgIHB1YmxpYyBzZXR1cCgpIHtcclxuICAgICAgICB0aGlzLnNjZW5lVHlwZSA9IFNjZW5lVHlwZS5Ob25lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbkdhbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmVUeXBlID09IFNjZW5lVHlwZS5HYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2NlbmVUeXBlKHZhbHVlKXtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoXCJzZXQgc2NlbmVUeXBlIGZyb20sIHRvXCIsIFNjZW5lVHlwZVt0aGlzLl9zY2VuZVR5cGVdLCBTY2VuZVR5cGVbdmFsdWVdKTtcclxuICAgICAgICB0aGlzLl9zY2VuZVR5cGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNjZW5lVHlwZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY2VuZVR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdvVG9Mb2dpbigpIHtcclxuICAgICAgICAvL+azqOmUgOi0puWPt+euoeeQhuWZqOe8k+WtmOaVsOaNrua4heepulxyXG4gICAgICAgIEdsb2JhbC5Nb2RlbE1hbmFnZXIuY2xlYXIoKTtcclxuICAgICAgICAvL+i/lOWbnueZu+W9leeVjOmdolxyXG4gICAgICAgIEdsb2JhbC5VSS5jbG9zZUFsbFVJUHJlZmFiKCk7XHJcbiAgICAgICAgSGFsbFBvcE1zZ0hlbHBlci5yZWxlYXNlSW5zdGFuY2UoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2NlbmVUeXBlID09IFNjZW5lVHlwZS5Ob25lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVUeXBlID0gU2NlbmVUeXBlLkxvZ2luO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRIYWxsU2NlbmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zY2VuZVR5cGUgPT0gU2NlbmVUeXBlLkdhbWUpIHtcclxuICAgICAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX0ZPUkNFX0xFQVZFX0dBTUUsIHRydWUpO1xyXG4gICAgICAgICAgICBHYW1lLkNvbnRyb2wuc2h1dERvd24odHJ1ZSk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5TY2VuZU1hbmFnZXIuZ29Ub0hhbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZVR5cGUgPSBTY2VuZVR5cGUuTG9naW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lVHlwZSA9IFNjZW5lVHlwZS5Mb2dpbjtcclxuICAgICAgICAgICAgaWYoY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKSAmJiBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLm5hbWUgIT0gXCJMb2FkaW5nU2NlbmVcIilcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kTG9naW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb1RvSGFsbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5zY2VuZVR5cGUgPT0gU2NlbmVUeXBlLkhhbGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5OYXRpdmVKU0JCcmlkZ2UuYWRkQ2xpY2tHYW1lcyhcImhhbGxcIilcclxuICAgICAgICBHbG9iYWwuVUkuY2xvc2VBbGxVSVByZWZhYigpO1xyXG4gICAgICAgIGlmICh0aGlzLnNjZW5lVHlwZSA9PSBTY2VuZVR5cGUuR2FtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lVHlwZSA9IFNjZW5lVHlwZS5IYWxsO1xyXG4gICAgICAgICAgICBpZiAoR2xvYmFsLlNldHRpbmcuaXNTdGFydEhvdFVwZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlNjZW5lTWFuYWdlci5vbkxvYWRIYWxsU2NlbmUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5TY2VuZU1hbmFnZXIubG9hZEhhbGxTY2VuZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lVHlwZSA9IFNjZW5lVHlwZS5IYWxsO1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZEhhbGxcIik7IFxyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IEdsb2JhbC5QbGF5ZXJEYXRhO1xyXG4gICAgICAgICAgICBpZihkYXRhLnR5cGUgIT09IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QXVkaW9Tb3VyY2UoXCJoYWxsL3NvdW5kL2luaXRoYWxsXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgR2xvYmFsLlVJLmNsb3NlSGFsbExvYWRpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uTG9hZEhhbGxTY2VuZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zY2VuZVR5cGUgPT0gU2NlbmVUeXBlLkdhbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZVR5cGUgPSBTY2VuZVR5cGUuSGFsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLlVJLmNsb3NlQWxsVUlQcmVmYWIoKTtcclxuICAgICAgIFxyXG4gICAgICAgIGxldCBIb3RVcGRhdGVNYW5hZ2VyID0gR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXI7XHJcbiAgICAgICAgbGV0IGdhbWVOYW1lID0gSG90VXBkYXRlTWFuYWdlci51cGRhdGVIZWxwZXIuZ2FtZVR5cGUoKTtcclxuICAgICAgICBsZXQgc3RvcmFnZVBhdGggPSBIb3RVcGRhdGVNYW5hZ2VyLnVwZGF0ZUhlbHBlci5nZW5TdG9yYWdlUGF0aChnYW1lTmFtZSk7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIm9uTG9hZEhhbGxTY2VuZSAtLS0tLS0tLS0tLVwiICsgc3RvcmFnZVBhdGgpO1xyXG4gICAgICAgIC8vIHdpbmRvdy5yZXF1aXJlKHN0b3JhZ2VQYXRoICsgJy9zcmMvZGF0aW5nLmpzJylcclxuICAgICAgICBsZXQgY3VySGFsbEJ1bmRsZSA9IEdsb2JhbC5jdXN0b21BcHAuZ2V0SGFsbEJ1bmRsZU5hbWUoKVxyXG4gICAgICAgIGlmIChjdXJIYWxsQnVuZGxlKXtcclxuICAgICAgICAgICAgaWYgKEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuY2hlY2tCdW5kbGVWYWxpZChjdXJIYWxsQnVuZGxlKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvTG9hZEhhbGxTY2VuZShudWxsKTtcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLmN1c3RvbUFwcC5sb2FkSGFsbEJ1bmRsZSgoZXJyb3IsYnVuZGxlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIm9uTG9hZEhhbGxTY2VuZSBsb2FkIGhhbGwgYnVuZGxlIGVycm9yIFwiICsgZXJyb3IubWVzc2FnZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvTG9hZEhhbGxTY2VuZShudWxsKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9Mb2FkSGFsbFNjZW5lKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyB0aGlzLnJlbGVhc2VDdXJHYW1lQnVuZGxlKCkgICAgIC8vIGRlYnVnIOaUvuWcqOWklumdouWtkOa4uOaIj+mAgOWbnuWIsOWkp+WOheS8muacieS4gOW4p+eahOmhtemdouiZmuWMllxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZEhhbGxTY2VuZShjYj86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2NlbmVUeXBlID09IFNjZW5lVHlwZS5HYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVUeXBlID0gU2NlbmVUeXBlLkhhbGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExvZ2dlci5sb2coXCItLS0tLS0tLWxvYWRIYWxsU2NlbmUtLS0tLS0tXCIpXHJcbiAgICAgICAgR2xvYmFsLlVJLmNsb3NlQWxsVUlQcmVmYWIoKTtcclxuICAgICAgICBsZXQgY3VySGFsbEJ1bmRsZSA9IEdsb2JhbC5jdXN0b21BcHAuZ2V0SGFsbEJ1bmRsZU5hbWUoKVxyXG4gICAgICAgIGlmIChjdXJIYWxsQnVuZGxlKXtcclxuICAgICAgICAgICAgaWYgKEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuY2hlY2tCdW5kbGVWYWxpZChjdXJIYWxsQnVuZGxlKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvTG9hZEhhbGxTY2VuZShjYik7XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5jdXN0b21BcHAubG9hZEhhbGxCdW5kbGUoKGVycm9yLGJ1bmRsZSk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJvbkxvYWRIYWxsU2NlbmUgbG9hZCBoYWxsIGJ1bmRsZSBlcnJvciBcIiArIGVycm9yLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb0xvYWRIYWxsU2NlbmUoY2IpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kb0xvYWRIYWxsU2NlbmUoY2IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRvTG9hZEhhbGxTY2VuZShjYjpGdW5jdGlvbil7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdIYWxsU2NlbmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgY2IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlbGVhc2VDdXJHYW1lQnVuZGxlKClcclxuICAgICAgICAgICAgdGhpcy5hZGp1c3RSZWRNaVVJMTIoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy/pgILphY3lsI/nsbMxMOezu+WIlyBNSVVJMTIgQW5kcm9pZDEx57O757ufIOi/m+WFpeWkp+WOhemXqumAgFxyXG4gICAgcHJpdmF0ZSBhZGp1c3RSZWRNaVVJMTIoKXtcclxuICAgICAgICBsZXQgcGhvbmVfZGV2aWNlX2JyYW5kID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5kZXZpY2VCcmFuZFxyXG4gICAgICAgIGxldCBvc1ZlciA9IGNjLnN5cy5vc1ZlcnNpb25cclxuICAgICAgICBpZiAocGhvbmVfZGV2aWNlX2JyYW5kICYmIChwaG9uZV9kZXZpY2VfYnJhbmQudG9Mb3dlckNhc2UoKSA9PSBcInhpYW9taVwiKSAmJiAob3NWZXIgPT0gXCIxMVwiIHx8IG9zVmVyID09IFwiMTEuMFwiIHx8IG9zVmVyID09IFwiMTEuMC4wXCIpKXsgLy8g5bCP57GzQW5kcm9pZOezu+e7nzEx57O75YiX5omn6KGMXHJcbiAgICAgICAgICAgIC8vIExvZ2dlci5lcnJvcihcImFkanVzdFJlZE1pVUkxMiBleGN1dGUgc3VjY2VzcyArKysrKysrKysrKysrXCIpXHJcbiAgICAgICAgICAgIGxldCBjYW52YXMgPSBjYy5maW5kKFwiQ2FudmFzXCIpXHJcbiAgICAgICAgICAgIGxldCBjYW1Ob2RlID0gY2FudmFzLmdldENoaWxkQnlOYW1lKFwiQ2FtZXJhQ2xlYXJTdGVuY2lsXCIpXHJcbiAgICAgICAgICAgIGxldCBjYW1lcmEgPSBudWxsXHJcbiAgICAgICAgICAgIGlmICghY2MuaXNWYWxpZChjYW1Ob2RlKSl7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJhZGp1c3RSZWRNaVVJMTIgY2FtTm9kZSBudWxsXCIpXHJcbiAgICAgICAgICAgICAgICBjYW1Ob2RlID0gbmV3IGNjLk5vZGUoXCJDYW1lcmFDbGVhclN0ZW5jaWxcIilcclxuICAgICAgICAgICAgICAgIGNhbWVyYSA9IGNhbU5vZGUuYWRkQ29tcG9uZW50KGNjLkNhbWVyYSlcclxuICAgICAgICAgICAgICAgIGNhbnZhcy5hZGRDaGlsZChjYW1Ob2RlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhbU5vZGUuZ3JvdXBJbmRleCA9IDFcclxuICAgICAgICAgICAgY2FtZXJhLmNsZWFyRmxhZ3MgPSBjYy5DYW1lcmEuQ2xlYXJGbGFncy5ERVBUSCB8IGNjLkNhbWVyYS5DbGVhckZsYWdzLlNURU5DSUxcclxuICAgICAgICAgICAgY2FtZXJhLmRlcHRoID0gMTBcclxuICAgICAgICAgICAgY2FtZXJhLmN1bGxpbmdNYXNrID0gMFxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiYWRqdXN0UmVkTWlVSTEyIGV4Y3V0ZSBmYWlsZWQgKysrKysrKysrKysrKyBwaG9uZV9kZXZpY2VfYnJhbmQgXCIgKyBwaG9uZV9kZXZpY2VfYnJhbmQgKyBcIiBvc1ZlcnNpb24gPSBcIiArIG9zVmVyKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVsZWFzZUN1ckdhbWVCdW5kbGUoKXtcclxuICAgICAgICBsZXQgcmVsZWFzZUhlbHBlciA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIucmVsZWFzZUhlbHBlclxyXG4gICAgICAgIGxldCBnYW1lQnVuZGxlID0gR2xvYmFsLlJlc291cmNlTWFuYWdlci5nYW1lQnVuZGxlXHJcbiAgICAgICAgcmVsZWFzZUhlbHBlci5yZWxlYXNlQnVuZGxlKGdhbWVCdW5kbGUpXHJcbiAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5nYW1lQnVuZGxlID0gJydcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZEdhbWVTY2VuZShjYj86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2NlbmVUeXBlID09IFNjZW5lVHlwZS5HYW1lKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInRoaXMuc2NlbmVUeXBlID09IFNjZW5lVHlwZS5HYW1lXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEdsb2JhbC5VSS5TZXRNZXNzYWdlQm94SW5HYW1lKGZhbHNlKTtcclxuICAgICAgICB0aGlzLnNjZW5lVHlwZSA9IFNjZW5lVHlwZS5HYW1lO1xyXG4gICAgICAgIC8v6L+b5ri45oiP5YWz6Zet5aSn5Y6F6Z+z5LmQXHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnN0b3BNdXNpYygpO1xyXG4gICAgICAgIEdsb2JhbC5VSS5jbG9zZUFsbFVJUHJlZmFiKHRydWUpO1xyXG4gICAgICAgIEdsb2JhbC5VSS5SZXN0b3JlUGVyc2lzdE5vZGUoKVxyXG4gICAgICAgIGxldCBIb3RVcGRhdGVNYW5hZ2VyID0gR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXI7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRHYW1lID0gSG90VXBkYXRlTWFuYWdlci5DdXJyZW50R2FtZTtcclxuICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmdhbWVCdW5kbGUgPSBjdXJyZW50R2FtZVxyXG4gICAgICAgIEdsb2JhbC5OYXRpdmVKU0JCcmlkZ2UuYWRkQ2xpY2tHYW1lcyhjdXJyZW50R2FtZS50b1N0cmluZygpKVxyXG4gICAgICAgIHRoaXMuc2V0R2FtZVNlYXJjaFBhdGgoY3VycmVudEdhbWUpO1xyXG4gICAgICAgIExvZ2dlci5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tY3VycmVudEdhbWUgPT09PVwiICsgY3VycmVudEdhbWUpXHJcbiAgICAgICAgbGV0IGJ1bmRsZVBhdGggPSBjdXJyZW50R2FtZS50b1N0cmluZygpXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sb2FkR2FtZVNjZW5lQnlHaWQoYnVuZGxlUGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkR2FtZVNjZW5lQnlHaWQoYnVuZGxlTmFtZTogc3RyaW5nLCBmaW5pc2hDYWxsPzogRnVuY3Rpb24pe1xyXG4gICAgICAgIGxldCBjdXJyZW50R2FtZSA9IGJ1bmRsZU5hbWU7XHJcbiAgICAgICAgdGhpcy5zd2l0Y2hTY2VuZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5Ub29sa2l0LnJlbW92ZURpcihOdW1iZXIoY3VycmVudEdhbWUpLFwi6L+b5YWl5a2Q5ri45oiP5aSx6LSlXCIpXHJcbiAgICAgICAgfSwgNTAwMCk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEJ1bmRsZShjdXJyZW50R2FtZSwgYXN5bmMgKGVyciwgYnVuZGxlOmNjLkFzc2V0TWFuYWdlci5CdW5kbGUpPT57XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcigpXHJcbiAgICAgICAgICAgIGlmIChlcnIpe1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlRvb2xraXQucmVtb3ZlRGlyKE51bWJlcihjdXJyZW50R2FtZSksXCLliqDovb3lrZDmuLjmiI9idW5kbGXlpLHotKVcIilcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImxvYWQgZmFpbGVkIFwiICsgY3VycmVudEdhbWUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBzY2VuZUlEID0gTnVtYmVyKGN1cnJlbnRHYW1lKTtcclxuICAgICAgICAgICAgaWYoR2FtZS5Db250cm9sLkdBTUVfRERaX0hKX0FSUi5pbmRleE9mKHNjZW5lSUQpID49IDApe1xyXG4gICAgICAgICAgICAgICAgaWYoR2FtZS5Db250cm9sLmN1ckdpZCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lSUQgPSBHYW1lLkNvbnRyb2wuY3VyR2lkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzY2VuZU5hbWUgPSAnJ1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHNjZW5lSUQudG9TdHJpbmcoKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjEwMDJcIjovL+eZvuS6uueJm+eJm1xyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lTmFtZSA9IFwiQnVsbFBWRUdhbWVcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCIxMDA1XCI6Ly/pvpnomY7mlpdcclxuICAgICAgICAgICAgICAgICAgICBzY2VuZU5hbWUgPSAnTG9uZ0h1R2FtZSdcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCIxMDA2XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gJ0hvbmdIZWlHYW1lJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjEwMDdcIjovL+eZvuWutuS5kFxyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lTmFtZSA9ICdCYWNjYXJhdEdhbWUnXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiMTAwOVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lTmFtZSA9ICdiemJ3J1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjEwMTBcIjovL+aOqOetkuWtkFxyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lTmFtZSA9ICdUdWl0b25nemlHYW1lJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjEwMTFcIjovL+asouS5kOiHs+WwilxyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lTmFtZSA9ICdIdWFubGV6aGl6dW5HYW1lJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjEwMTRcIjpcclxuICAgICAgICAgICAgICAgICAgICBzY2VuZU5hbWUgPSAnV2FuUmVuR2FtZSdcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCIxMDE1XCI6Ly/kupTmmJ/lro/ovolcclxuICAgICAgICAgICAgICAgICAgICBzY2VuZU5hbWUgPSAnV3V4aW5naG9uZ2h1aUdhbWUnXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiMTAxNlwiOi8v5LqM5YWr5p2gXHJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gJ0VyYmFnYW5nR2FtZSdcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCIxMDE3XCI6Ly/nmb7lj5jkupTlvKBcclxuICAgICAgICAgICAgICAgICAgICBzY2VuZU5hbWUgPSAnQmJ3ekdhbWUnXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiMTAxOFwiOi8v5Yaz5oiY5LqU5bygXHJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gJ0p6d3pHYW1lJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjEwMTlcIjovL+mjnuemvei1sOWFvVxyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lTmFtZSA9ICdGcXpzR2FtZVNjZW5lJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjEwMjBcIjovLyDpsbzomb7on7lcclxuICAgICAgICAgICAgICAgICAgICBzY2VuZU5hbWUgPSAnWXh4U2NlbmUnXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiMTAyMVwiOiAgICAvLyDnp6bnmofmsYnmraZcclxuICAgICAgICAgICAgICAgICAgICBzY2VuZU5hbWUgPSAnUWhod1NjZW5lJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjEwMjJcIjogICAgLy8g6KW/5ri46K6wXHJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gJ1h5akdhbWVTY2VuZSdcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCIyMDAxXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gJ0J1bGxQVlBTY2VuZSdcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCIyMDAyXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gJ0J1bGxUd29TY2VuZSdcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCIyMDAzXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gJ1pKSFNjZW5lJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjIwMDRcIjovL+WNgeS4ieawtFxyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lTmFtZSA9ICdTaGlzYW5zaHVpR2FtZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiMjAwNVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lTmFtZSA9ICdERFpQdnBTY2VuZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiMjAwNlwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lTmFtZSA9ICdCdWxsVEJTY2VuZSdcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCIyMDA3XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gJ0J1bGxLUFNjZW5lJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjIwMDhcIjogICAgLy8gMjHngrlcclxuICAgICAgICAgICAgICAgICAgICBzY2VuZU5hbWUgPSAnQmxhY2tKYWNrU2NlbmUnXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiMjAwOVwiOiAgICAvLyDnlq/ni4LniZvniZtcclxuICAgICAgICAgICAgICAgICAgICBzY2VuZU5hbWUgPSAnRmtublNjZW5lJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjIwMTBcIjogICAgLy8g5b635bee5omR5YWLXHJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gJ1RleGFzSG9sZGVtU2NlbmUnXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiMjAxMVwiOiAgICAvLyDkuIDmi7PotoXkurpcclxuICAgICAgICAgICAgICAgICAgICBzY2VuZU5hbWUgPSAnT25lUHVuY2hTY2VuZSdcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCIyMDEyXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gJ1Bka1NjZW5lJztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCIyMDEzXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gJ0RkelR3b1NjZW5lJztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCIyMDE0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gJ0J1bGxIUFNjZW5lJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjIxMDFcIjogICAgLy8g5LqM5Lq66bq75bCGXHJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gJ0VybWpTY2VuZSdcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCIyMTAyXCI6ICAgIC8vIOihgOa1gem6u+WwhlxyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lTmFtZSA9ICdYbG1qU2NlbmUnXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiNDAwMVwiOiAvL+e6ouWMheaJq+mbt1xyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lTmFtZSA9ICdSZWRQYWNrU2NlbmUnXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiNDAwMlwiOiAvL+e6ouWMheaOpem+mVxyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lTmFtZSA9ICdIYmpsR2FtZSdcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCIzMDAxXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gJ21haW4nXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiMzAwMlwiOi8vM0TmjZXpsbxcclxuICAgICAgICAgICAgICAgICAgICBzY2VuZU5hbWUgPSAnRmlzaDNER2FtZSdcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCIzMDAzXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gJ0RudGdGaXNoU2NlbmUnXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiMzAwNFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lTmFtZSA9ICdKY2J5RmlzaFNjZW5lJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjMwMDVcIjpcclxuICAgICAgICAgICAgICAgICAgICBzY2VuZU5hbWUgPSAnRmlzaEdhbWVTY2VuZSdcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCIzMDA2XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gJ0Zpc2gzR2FtZVNjZW5lJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjEwMDFcIjpcclxuICAgICAgICAgICAgICAgICAgICBzY2VuZU5hbWUgPSAndG91YmFvJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjUwMDFcIjpcclxuICAgICAgICAgICAgICAgICAgICBzY2VuZU5hbWUgPSAnQ3FieVNjZW5lJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjUwMDJcIjovL+Wkmuemj+Wkmui0olxyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lTmFtZSA9ICdEdW9mdWR1b2NhaUdhbWUnXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiNTAwM1wiOi8v6LeR6ams5rC05p6c5py6XHJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gJ3NodWlndW9qaSdcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCI1MDA0XCI6Ly/mvrPpl6jpo47kupFcclxuICAgICAgICAgICAgICAgICAgICBzY2VuZU5hbWUgPSAnQW1meUdhbWUnXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiNTAwNVwiOi8v5Y+k5oOR5LuUXHJcbiAgICAgICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gJ0doekdhbWVTY2VuZSdcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCI1MDA2XCI6Ly/mi7Pnmoc5N1xyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lTmFtZSA9ICdRaDk3R2FtZVNjZW5lJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjYwMDFcIjovL+WFreWQiOW9qVxyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lTmFtZSA9ICdNSzZHYW1lJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjcwMDVcIjovL+ecn+S6uum+meiZjlxyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lTmFtZSA9ICdTaGl4dW5Mb25naHVHYW1lJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJlbnRlciBoYWxsIC0tLS0tXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEdhbWUuR2FtZVByZWxvYWRUb29sLnNldHVwKE51bWJlcihjdXJyZW50R2FtZSkpOyAgICAgICAgLy8gZGVidWcg6L+Z6YeM5Yqg6L295aSE55CG5p2A5o6J6L+b56iL6YeN6L+e5oOF5Ya1XHJcbiAgICAgICAgICAgIGlmIChHYW1lLkdhbWVQcmVsb2FkVG9vbC5jaGVja1ByZWxvYWRCdW5kbGVFeGlzdChOdW1iZXIoY3VycmVudEdhbWUpKSl7XHJcbiAgICAgICAgICAgICAgIGF3YWl0IEdhbWUuR2FtZVByZWxvYWRUb29sLnByZWxvYWRCdW5kbGUoKTsgICAgICAgICAgICAgIC8vIOWQjue7reWtkOa4uOaIj3ByZWxvYWTkvJjlhYjnuqfmj5Dpq5gsIOmcgOimgeWFiOS4gOatpeWKoOi9vSDlhYjpooTln4tcclxuICAgICAgICAgICAgICAgYXdhaXQgR2FtZS5HYW1lUHJlbG9hZFRvb2wucHJlbG9hZFByZWZhYihHYW1lLkdhbWVQcmVsb2FkVG9vbC5sb2JieVVJUGF0aCk7ICAgICAgLy8g5p2A5o6J6L+b56iL6YeN6L+e5pe25YCZ6KaB6aKE5Yqg6L296YCJ5Zy65Lul5L6/6YCA5Ye65ri45oiP5pe25b+r6YCf5pi+56S6XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zd2l0Y2hTY2VuZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVG9vbGtpdC5yZW1vdmVEaXIoTnVtYmVyKGN1cnJlbnRHYW1lKSxcIuWKoOi9veWtkOa4uOaIj+WcuuaZr+Wksei0pVwiKVxyXG4gICAgICAgICAgICB9LCA1MDAwKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGJ1bmRsZS5sb2FkU2NlbmUoc2NlbmVOYW1lLChlcnI6RXJyb3Isc2NlbmVBc3NldCk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5Yqg6L295a2Q5ri45oiPYnVuZGxl5aSx6LSlLS0tLS0tLS0tLS0tLS1sb2FkU2NlbmUtLS0tLS1cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiYnVuZGxlIGxvYWRTY2VuZSBcIiArIHNjZW5lTmFtZSArIFwiIGVycm9yID0gXCIgKyBlcnIubWVzc2FnZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlRvb2xraXQucmVtb3ZlRGlyKE51bWJlcihjdXJyZW50R2FtZSksZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShzY2VuZU5hbWUsICgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaW5pc2hDYWxsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmlzaENhbGwoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWRqdXN0UmVkTWlVSTEyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVG9vbGtpdC5yZW1vdmVEaXIoTnVtYmVyKGN1cnJlbnRHYW1lKSxlcnJvcilcclxuICAgICAgICAgICAgICAgIC8vIGV4cGVjdGVkIG91dHB1dDogUmVmZXJlbmNlRXJyb3I6IG5vbkV4aXN0ZW50RnVuY3Rpb24gaXMgbm90IGRlZmluZWRcclxuICAgICAgICAgICAgICAgIC8vIE5vdGUgLSBlcnJvciBtZXNzYWdlcyB3aWxsIHZhcnkgZGVwZW5kaW5nIG9uIGJyb3dzZXJcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICBwdWJsaWMgc3dpdGNoR2FtZVNjZW5lKGdpZDogbnVtYmVyKXtcclxuICAgICAgICBpZiAodGhpcy5zY2VuZVR5cGUgIT09IFNjZW5lVHlwZS5HYW1lKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInRoaXMuc2NlbmVUeXBlICE9PSBTY2VuZVR5cGUuR2FtZVwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBvbGRHYW1lSWQgPSBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5DdXJyZW50R2FtZTtcclxuICAgICAgICBsZXQgb2xkR2FtZUJ1bmRsZSA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2FtZUJ1bmRsZTtcclxuXHJcbiAgICAgICAgR2xvYmFsLlVJLlNldE1lc3NhZ2VCb3hJbkdhbWUoZmFsc2UpO1xyXG4gICAgICAgIEdsb2JhbC5VSS5jbG9zZUFsbFVJUHJlZmFiKCk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRHYW1lID0gU3RyaW5nKGdpZCk7XHJcbiAgICAgICAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuQ3VycmVudEdhbWUgPSBjdXJyZW50R2FtZTtcclxuICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmdhbWVCdW5kbGUgPSBjdXJyZW50R2FtZTtcclxuICAgICAgICBHbG9iYWwuTmF0aXZlSlNCQnJpZGdlLmFkZENsaWNrR2FtZXMoY3VycmVudEdhbWUpXHJcbiAgICAgICAgdGhpcy5zZXRHYW1lU2VhcmNoUGF0aChjdXJyZW50R2FtZSk7XHJcbiAgICAgICAgR2xvYmFsLlVJLmNsb3NlKFwiV25kR2FtZUxvYmJ5U2hlbGxcIik7ICAgICAgIC8vIGRlYnVnIOi3s+i9rOWIsOaXoOmAieWcuua4uOaIj+aXtiwg5YaN6YCA5Ye66YeN5paw6L+b5Lya5pi+56S65YmN5Liq5ri45oiP5q6L5b2xXHJcbiAgICAgICAgdGhpcy5sb2FkR2FtZVNjZW5lQnlHaWQoY3VycmVudEdhbWUsICgpPT57XHJcbiAgICAgICAgICAgIC8vIOi3s+i9rOa4heeQhuaXp+a4uOaIj+i1hOa6kCBkZWJ1ZyDml6fpgInlnLrotYTmupDov5jml6Dms5Xph4rmlL4sIFVJ6L+Y5L+d5a2Y552A5ZyobWFw6YeMIOWPquS8muWkmuWHuuS4gOS7vemAieWcuui1hOa6kOaaguS4jeWkhOeQhlxyXG4gICAgICAgICAgICBpZihjdXJyZW50R2FtZSA9PSBvbGRHYW1lSWQpe1xyXG4gICAgICAgICAgICAgICAgLy/lkIjpm4bnsbvmuLjmiI/kvJrlh7rnjrDov5nnp43mg4XlhrVcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLnJlbGVhc2VIZWxwZXIucmVsZWFzZUJ1bmRsZShvbGRHYW1lQnVuZGxlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0R2FtZVNlYXJjaFBhdGgoZ2lkOiBzdHJpbmcpe1xyXG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpe1xyXG4gICAgICAgICAgICBsZXQgdXBkYXRlSGVscGVyID0gR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIudXBkYXRlSGVscGVyXHJcbiAgICAgICAgICAgIHVwZGF0ZUhlbHBlci5pbml0KGdpZClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBzdG9yYWdlUGF0aCA9IHVwZGF0ZUhlbHBlci5zdG9yYWdlUGF0aCgpO1xyXG4gICAgICAgICAgICBHbG9iYWwuU2VhcmNoUGF0aEhlbHBlci5hZGRPbmVHYW1lUGF0aChzdG9yYWdlUGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVHYW1lU2VhcmNoUGF0aChnaWQ6IHN0cmluZyl7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSl7XHJcbiAgICAgICAgICAgIGxldCBzdG9yYWdlUGF0aCA9IGpzYi5maWxlVXRpbHMuZ2V0V3JpdGFibGVQYXRoKCkgICsgJ2dhbWVVcGRhdGUvJyArIGdpZDtcclxuICAgICAgICAgICAgR2xvYmFsLlNlYXJjaFBhdGhIZWxwZXIucmVtb3ZlT25lUGF0aChzdG9yYWdlUGF0aClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVTdG9yYWdlUGF0aEZyb21TZWFyY2hQYXRocyhzdG9yYWdlUGF0aCl7XHJcbiAgICAgICAgbGV0IHNlYXJjaFBhdGhzID0ganNiLmZpbGVVdGlscy5nZXRTZWFyY2hQYXRocygpO1xyXG4gICAgICAgIGlmIChzdG9yYWdlUGF0aCAmJiBzZWFyY2hQYXRocyAmJiBzZWFyY2hQYXRocy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgbGV0IHBhdGhJbmRleCA9IC0xXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPTA7aTxzZWFyY2hQYXRocy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBwYXRoID0gc2VhcmNoUGF0aHNbaV1cclxuICAgICAgICAgICAgICAgIGlmIChwYXRoICYmIChwYXRoID09IHN0b3JhZ2VQYXRoIHx8IHBhdGggPT0gKHN0b3JhZ2VQYXRoICsgXCIvXCIpKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aEluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWFyY2hQYXRocy5zcGxpY2UocGF0aEluZGV4LDEpXHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJyZW1vdmVTdG9yYWdlUGF0aEZyb21TZWFyY2hQYXRocyBzZWFyUGF0aHMgb3Igc3RvcmFnZXBhdGggPT0gbnVsbFwiKVxyXG4gICAgICAgICAgICAvL+a3u+WKoOWkp+WOheeDreabtOebruW9lVxyXG4gICAgICAgICAgICBpZiAoc2VhcmNoUGF0aHMgJiYgc2VhcmNoUGF0aHMubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInJlbW92ZVN0b3JhZ2VQYXRoRnJvbVNlYXJjaFBhdGhzIGFkZCBIYWxsIFNlYXJjaFBhdGhcIilcclxuICAgICAgICAgICAgICAgIGxldCBoYWxsTmF0aXZlVXBkYXRlUGF0aCA9IEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLmdldE5hdGl2ZUhvdFVwZGF0ZVBhdGgoJ2hhbGwnKVxyXG4gICAgICAgICAgICAgICAgc2VhcmNoUGF0aHMudW5zaGlmdChoYWxsTmF0aXZlVXBkYXRlUGF0aClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlYXJjaFBhdGhzXHJcbiAgICB9XHJcbiAgICBjbGVhclRpbWVyKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuc3dpdGNoU2NlbmVUaW1lcikge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zd2l0Y2hTY2VuZVRpbWVyKVxyXG4gICAgICAgICAgICB0aGlzLnN3aXRjaFNjZW5lVGltZXIgPSBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==