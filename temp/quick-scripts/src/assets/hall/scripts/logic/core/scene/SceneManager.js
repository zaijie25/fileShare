"use strict";
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