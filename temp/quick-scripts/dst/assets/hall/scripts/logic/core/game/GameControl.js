
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/game/GameControl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c37d6xlRLNKRrrvczd5dTdH', 'GameControl');
// hall/scripts/logic/core/game/GameControl.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NetEvent_1 = require("../net/hall/NetEvent");
var SessionHandler_1 = require("./handlers/SessionHandler");
var ServerRoutes_1 = require("../setting/ServerRoutes");
var PvpWaitMatchHandler_1 = require("./handlers/PvpWaitMatchHandler");
//主要负责游戏进出
var GameControl = /** @class */ (function () {
    function GameControl() {
        //服务器返回的route错误
        this.SERVER_ROUTE_ERROR = -1;
        //正在别的游戏 并且和选中游戏的gid不同
        this.SERVER_LOCK = -2;
        //服务器没有返回MOD
        this.NO_MOD = -3;
        //相同gid,在别的场次
        this.IN_OTHER_LEVEL = -4;
        /**
         * 用于限制短时间内快速请求 getgameroute
         */
        this.seq = 0;
        //斗地主合集中的gameid
        this.GAME_DDZ_HJ_ARR = [20001];
        this.gsc = "default";
        this.glv = "l0";
        this.timeId = -1;
        this.curGid = 0;
        this.curLv = "l0";
        //开始http请求 到请求成功
        this.connectLock = false;
        this.connectLockTimer = -1;
        //socket连接成功  进场景之前
        this.enterSceneLock = false;
        this.enterSceneLockTimer = -1;
        this.callEnterFunc = this.sendEnter.bind(this);
        this.isLabaGame = false;
    }
    GameControl.prototype.setup = function () {
        Game.Event.on(Game.EVENT_SOCKET_OPEN, this, this.onGameSocketOpen);
        Game.Event.on(Game.EVENT_SOCKET_ERROR, this, this.onGameSocketError);
    };
    GameControl.prototype.setGlvAndGsc = function (glv, gsc) {
        if (glv === void 0) { glv = "l0"; }
        if (gsc === void 0) { gsc = "default"; }
        this.glv = glv;
        this.gsc = gsc;
    };
    GameControl.prototype.setSession = function (session) {
        Game.Server.setDst(session._para._gt, session._para._chair);
        //收到Session后 发送心跳
        Game.Server.sendHeartBeat();
    };
    GameControl.prototype.sendEnter = function (gid, glv, gsc, extraMap) {
        if (extraMap === void 0) { extraMap = null; }
        Game.Server.passSSSAndEnter();
        var enterData = Game.Server.getSendParam(Game.Command.Enter);
        enterData._param._para = { _gid: gid };
        enterData._param._para._gsc = gsc;
        enterData._param._para._glv = glv;
        if (extraMap) {
            for (var k in extraMap) {
                enterData._param._para[k] = extraMap[k];
            }
        }
        this.enterData = enterData;
        Game.Server.sendDirect(enterData);
    };
    //设置context  需要在进游戏之前设置
    GameControl.prototype.setContext = function (context) {
        Game.Context = context;
        this.registDefaultHandler();
    };
    GameControl.prototype.registDefaultHandler = function () {
        Game.Server.registDefaultHandler(Game.Command.Session, new SessionHandler_1.default);
        Game.Server.registDefaultHandler(Game.Command.WaitMatch, new PvpWaitMatchHandler_1.default);
    };
    GameControl.prototype.registHandler = function (key, handler) {
        Game.Server.registHandler(key, handler);
    };
    GameControl.prototype.unregistHandler = function (key) {
        Game.Server.unregistHandler(key);
    };
    GameControl.prototype.connectGame = function (serverInfo, mod, onComplete, pbmode, useFunc) {
        if (pbmode === void 0) { pbmode = false; }
        if (useFunc === void 0) { useFunc = true; }
        if (Game.Server.isRunning) {
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "enterGame");
            return;
        }
        Game.Server.run();
        //链接服务器
        Game.Server.connect(serverInfo, mod, pbmode, useFunc);
        this.connectComplete = onComplete;
    };
    GameControl.prototype.trySendEnter = function (extraParamMap) {
        if (extraParamMap === void 0) { extraParamMap = null; }
        if (!this.isLabaGame) { // 非拉霸类socket发enter
            if (this.callEnterFunc == null)
                this.callEnterFunc = this.sendEnter.bind(this);
            this.callEnterFunc(this.curGid, this.glv, this.gsc, extraParamMap);
            this.startCheckMsgTimer();
        }
    };
    GameControl.prototype.startCheckMsgTimer = function () {
        //Global.Component跨场景会有问题 需要使用setTimeout
        //@todo 提供常驻组件  
        this.stopCheckMsgTimer();
        this.timeId = setTimeout(this.onMsgTimeOut.bind(this), Global.Setting.enterTimeout * 1000);
    };
    GameControl.prototype.stopCheckMsgTimer = function () {
        if (this.timeId != -1) {
            clearTimeout(this.timeId);
            this.timeId = -1;
        }
    };
    GameControl.prototype.onMsgTimeOut = function () {
        Game.Server.stopGame();
        var errFunc = function () { Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME); };
        Global.UI.showSingleBox("网络连接异常，请稍后再试", errFunc, errFunc);
    };
    //对于非选场类游戏 在大厅请求数据和链接socket
    GameControl.prototype.connnectAndEnterGame = function (gid, glv, gsc, locker, pbMode, showWaiting) {
        var _this = this;
        if (glv === void 0) { glv = "l0"; }
        if (gsc === void 0) { gsc = "default"; }
        if (pbMode === void 0) { pbMode = false; }
        if (showWaiting === void 0) { showWaiting = false; }
        this.getGameServerInfo(gid, function (serverRoute, mod) {
            _this.connectGame(serverRoute, mod, function () {
                Global.HotUpdateManager.CurrentGame = gid;
                _this.enterSceneLock = true;
                _this.startEnterSceneLockTimer();
                Global.SceneManager.loadGameScene();
            }, pbMode);
        }, null, glv, gsc, locker, false);
    };
    //对于选场类游戏 在大厅请求数据和链接socket
    GameControl.prototype.connnectAndEnterGameInLevelScene = function (gid, glv, gsc, locker, onComplete, pbMode, showWaiting) {
        var _this = this;
        if (glv === void 0) { glv = "l0"; }
        if (gsc === void 0) { gsc = "default"; }
        if (pbMode === void 0) { pbMode = false; }
        if (showWaiting === void 0) { showWaiting = false; }
        showWaiting = this.needChooseLevel(gid);
        this.getGameServerInfo(gid, function (serverRoute, mod) {
            _this.connectGame(serverRoute, mod, function () {
                if (onComplete)
                    onComplete();
            }, pbMode);
        }, null, glv, gsc, locker, false);
    };
    GameControl.prototype.connnectLabaGameServer = function (gid, glv, gsc, locker, pbMode, showWaiting) {
        var _this = this;
        if (glv === void 0) { glv = "l0"; }
        if (gsc === void 0) { gsc = "default"; }
        if (pbMode === void 0) { pbMode = false; }
        if (showWaiting === void 0) { showWaiting = false; }
        this.getGameServerInfo(gid, function (serverRoute, mod) {
            _this.isLabaGame = true;
            _this.connectGame(serverRoute, mod, function () {
                Global.HotUpdateManager.CurrentGame = gid;
                _this.enterSceneLock = true;
                _this.startEnterSceneLockTimer();
                Global.SceneManager.loadGameScene();
                Game.Event.event(Game.EVENT_LABA_CONNECT);
            }, pbMode, false);
        }, null, glv, gsc, locker, false);
    };
    /**
     * 获取捕鱼游戏服务器完整socket地址
     * @param gid 游戏id
     * @param callback (url:string)=>void   返回socket完整地址
     * @param glv 选场信息
     * @param gsc 默认值
     * @param locker null
     */
    GameControl.prototype.getFishServerInfo = function (gid, callback, glv, gsc, locker) {
        var _this = this;
        if (glv === void 0) { glv = "l0"; }
        if (gsc === void 0) { gsc = "default"; }
        if (this.connectLock || this.enterSceneLock) {
            return;
        }
        this.seq++;
        this.connectLock = true;
        this.startConnectLockTimer();
        this.glv = glv;
        this.gsc = this.getRule(gid, glv);
        this.curGid = gid;
        var param = {};
        param.glv = glv;
        param.gsc = gsc;
        param.gid = gid;
        param.locker = locker;
        param.seq = this.seq;
        param.game_skin = Global.Setting.SystemInfo.gameSkin;
        param.app_version = Global.Setting.SystemInfo.appVersion; //20200323Grace 新增字段
        param.device = Global.Toolkit.genDeviceInfo();
        var megeServerFlag = Global.Toolkit.checkMegeServer();
        if (megeServerFlag) {
            param.old_app_id = parseInt(Global.Setting.SystemInfo.appID);
        }
        if (locker && locker._gid) {
            Game.Server.setDst(locker._gt, locker._chair);
        }
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetGameRoute, param, function (msg) {
            _this.connectLock = false;
            _this.stopConnectLockTimer();
            if (!CC_PREVIEW) {
                var tmpGameInfo = Global.GameData.getGameInfo(Global.HotUpdateManager.CurrentGame);
                if (tmpGameInfo && tmpGameInfo.native_version) {
                    if (msg && msg.version) {
                        var checkversion = Global.Toolkit.versionCompare(tmpGameInfo.native_version, msg.version);
                        if (checkversion < 0) {
                            if (Global.Setting.needHallChooseRoom) {
                                Global.Toolkit.transmitHallTip("您的游戏不是最新版本，请重新启动游戏更新至最新版本！[-1]");
                            }
                            else {
                                _this.showFastTipsError(Global.HotUpdateManager.CurrentGame, "您的游戏不是最新版本，请重新启动游戏更新至最新版本！", -1);
                            }
                            Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);
                            Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
                            return;
                        }
                    }
                }
            }
            if (param.seq != _this.seq) {
                return;
            }
            _this.seq = 0;
            var serverRoutes = new ServerRoutes_1.default();
            var routes = msg.routes;
            serverRoutes.parse(routes);
            //获取服务器信息
            Global.Setting.Urls.gameRoutes = serverRoutes;
            var mods = msg.mods;
            Global.Setting.Urls.gameMods = mods;
            if (mods == null || mods.length == 0) {
                var errStr = "服务器正在维护中，请稍后再试";
                _this.showFastTipsError(gid, errStr, -1);
                Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
                return;
            }
            //处理locker
            var result = _this.parseLocker(msg, glv, gsc);
            var mod = null;
            if (result.result < 0) {
                Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
                return;
            }
            else if (result.result == 1) {
                mod = result.mod;
            }
            var pbUrl = _this.getRandomFishServerInfo(mod)[0];
            if (callback != null)
                callback(pbUrl);
        }, function (msg) {
            _this.connectLock = false;
            _this.stopConnectLockTimer();
            return Global.HallServer.tryHandleError(msg);
        }, true);
    };
    GameControl.prototype.getRandomFishServerInfo = function (_mod) {
        var serverRoute = this.getServerRoute(Global.Setting.Urls.gameRoutes);
        var mod = this.getRandMod(Global.Setting.Urls.gameMods);
        if (_mod) {
            mod = _mod;
        }
        var pbUrl = serverRoute.getPbSocketUrl(mod);
        pbUrl = Game.Server.getSocketUrl(pbUrl, true);
        var reqUrl = Global.UrlUtil.dealWebSocketUrl(pbUrl);
        return [reqUrl, mod];
    };
    GameControl.prototype.startConnectLockTimer = function () {
        var _this = this;
        this.stopConnectLockTimer();
        this.connectLockTimer = setTimeout(function () {
            _this.connectLock = false;
        }, 3000);
    };
    GameControl.prototype.stopConnectLockTimer = function () {
        if (this.connectLockTimer != -1) {
            clearTimeout(this.connectLockTimer);
            this.connectLockTimer = -1;
        }
    };
    GameControl.prototype.startEnterSceneLockTimer = function () {
        var _this = this;
        this.stopEnterSceneLockTimer();
        this.enterSceneLockTimer = setTimeout(function () {
            _this.enterSceneLock = false;
        }, 2000);
    };
    GameControl.prototype.stopEnterSceneLockTimer = function () {
        if (this.enterSceneLockTimer != -1) {
            clearTimeout(this.enterSceneLockTimer);
            this.enterSceneLockTimer = -1;
        }
    };
    GameControl.prototype.getRule = function (gid, glv) {
        var data = Global.GameData.getGameInfo(gid);
        if (data == null || data.levels == null) {
            Logger.error("找不到gid:" + gid);
            return "default";
        }
        for (var i = 0; i < data.levels.length; i++) {
            if (data.levels[i].level == glv)
                return data.levels[i].rule || "default";
        }
        return "default";
    };
    //获取游戏信息
    GameControl.prototype.getGameServerInfo = function (gid, callback, onError, glv, gsc, locker, showWaiting) {
        var _this = this;
        if (glv === void 0) { glv = "l0"; }
        if (gsc === void 0) { gsc = "default"; }
        if (showWaiting === void 0) { showWaiting = false; }
        if (this.connectLock || this.enterSceneLock) {
            return;
        }
        this.seq++;
        gsc = this.getRule(gid, glv);
        this.connectLock = true;
        this.startConnectLockTimer();
        this.glv = glv;
        this.gsc = gsc;
        this.curGid = gid;
        var param = {};
        param.seq = this.seq;
        param.glv = glv;
        param.gsc = gsc;
        param.gid = gid;
        param.game_skin = Global.Setting.SystemInfo.gameSkin;
        param.locker = locker;
        param.app_version = Global.Setting.SystemInfo.appVersion; //20200323Grace 新增字段
        param.device = Global.Toolkit.genDeviceInfo();
        var megeServerFlag = Global.Toolkit.checkMegeServer();
        if (megeServerFlag) {
            param.old_app_id = parseInt(Global.Setting.SystemInfo.appID);
        }
        if (locker && locker._gid) {
            Game.Server.setDst(locker._gt, locker._chair);
        }
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetGameRoute, param, function (msg) {
            _this.connectLock = false;
            _this.stopConnectLockTimer();
            //获取服务器信息
            var serverRoutes = new ServerRoutes_1.default();
            serverRoutes.parse(msg.routes);
            Global.Setting.Urls.gameRoutes = serverRoutes;
            var serverRoute = _this.getServerRoute(serverRoutes);
            //获取mod
            var mods = msg.mods;
            if (mods == null || mods.length == 0) {
                var errStr = "服务器正在维护中，请稍后再试";
                if (onError) {
                    onError({ _errstr: errStr });
                }
                else {
                    _this.showFastTipsError(gid, errStr, -1);
                    Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);
                }
                Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
                return;
            }
            // if (!CC_PREVIEW && !cc.sys.isBrowser) {
            //     let tmpGameInfo = Global.GameData.getGameInfo(Global.HotUpdateManager.CurrentGame)
            //     if (tmpGameInfo && tmpGameInfo.native_version) {
            //         if(msg&&msg.version)
            //         {
            //             let checkversion = Global.Toolkit.versionCompare(tmpGameInfo.native_version, msg.version)
            //             if (checkversion < 0) {
            //                 if(Global.Setting.needHallChooseRoom)
            //                 {
            //                     Global.Toolkit.transmitHallTip("该游戏有最新版本，请退出大厅更新！[-1]");
            //                 }
            //                 else
            //                 {
            //                     this.showFastTipsError(Global.HotUpdateManager.CurrentGame,"该游戏有最新版本，请退出大厅更新！",-1)
            //                 }
            //                 //Global.UI.fastTip("您的游戏不是最新版本，请重新启动游戏更新至最新版本！")
            //                 Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);
            //                 Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
            //                 return
            //             }
            //         }
            //     }
            // }
            if (param.seq != _this.seq) {
                return;
            }
            _this.seq = 0;
            Global.Setting.Urls.gameMods = mods;
            //从多个mod中随机一个
            var mod = _this.getRandMod(mods);
            var connectFunc = function (mod) {
                if (callback)
                    callback(serverRoute, mod);
            };
            //处理locker
            var result = _this.parseLocker(msg, glv, gsc, connectFunc);
            if (result.result < 0) {
                Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
                return;
            }
            else if (result.result == 1) {
                mod = result.mod;
            }
            connectFunc(mod);
            // if(callback != null)
            //     callback(serverRoute, mod);
        }, function (msg) {
            _this.connectLock = false;
            _this.stopConnectLockTimer();
            if (onError) {
                var ret = onError(msg) || false;
                Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);
                return ret;
            }
            else {
                Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME); // debug 游戏强制离开时会把scene切到hall, 先执行的话, showFastTipsError里的判断会失效
                if (msg._errstr && msg._errstr != "") {
                    _this.showFastTipsError(gid, msg._errstr, msg._errno);
                }
                return false;
            }
        }, showWaiting);
    };
    GameControl.prototype.showFastTipsError = function (gid, msg, errNo, checkType) {
        if (checkType === void 0) { checkType = 1; }
        if (!Global.SceneManager.inGame()) {
            if (errNo == 2002) {
                if (Global.Setting.needHallChooseRoom) {
                    Global.Toolkit.transmitHallMsg(msg, function () {
                        Global.UI.show("WndRecharge");
                    });
                }
                else {
                    Global.Toolkit.showMoneyNotEnough();
                }
            }
            else {
                if (Global.Setting.needHallChooseRoom) {
                    Global.Toolkit.transmitHallTip(msg + "[" + errNo + "]" || "");
                }
                else {
                    Global.UI.fastTip(msg + "[" + errNo + "]");
                }
            }
            return;
        }
        var gameInfo = Global.GameData.getGameInfo(gid);
        var checkArray = checkType == 1 ? gameInfo.levels : gameInfo.rules;
        if (checkArray != null && checkArray.length == 1 && !gameInfo.hasChooseLevel) {
            Global.Toolkit.transmitHallTip(msg || "");
        }
        else {
            if (errNo == 2002) {
                if (Global.Setting.needHallChooseRoom) {
                    Global.Toolkit.transmitHallMsg(msg, function () {
                        Global.UI.show("WndRecharge");
                    });
                }
                else {
                    Global.Toolkit.showMoneyNotEnough();
                }
            }
            else {
                if (Global.Setting.needHallChooseRoom) {
                    Global.Toolkit.transmitHallTip(msg + "[" + errNo + "]" || "");
                }
                else {
                    Global.UI.fastTip(msg + "[" + errNo + "]");
                }
            }
        }
    };
    //是否有选场
    GameControl.prototype.needChooseLevel = function (gid, checkType) {
        if (checkType === void 0) { checkType = 1; }
        var gameInfo = Global.GameData.getGameInfo(gid);
        var checkArray = checkType == 1 ? gameInfo.levels : gameInfo.rules;
        return checkArray && checkArray.length > 1;
    };
    GameControl.prototype.getServerRoute = function (serverRoutes) {
        var serverRoute = serverRoutes.getRandRoute();
        if (serverRoute != null)
            return serverRoute;
        //如果取不到游戏  就直接使用大厅链接地址
        serverRoute = Global.Setting.Urls.hallRoutes.getCurRoute();
        return serverRoute;
    };
    GameControl.prototype.onGameSocketOpen = function () {
        if (Global.SceneManager.inGame()) {
            Logger.error("onGameSocketOpen trySendEnter");
            if (Game.Server.isRunning) //怀疑socket关闭不是同步，有概率出现shutdown之后还能发送enter，导致lv设置错误
                this.trySendEnter();
        }
        if (this.connectComplete) {
            this.connectComplete();
            this.connectComplete = null;
        }
    };
    GameControl.prototype.onGameSocketError = function () {
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "enterGame");
        this.stopCheckMsgTimer();
    };
    GameControl.prototype.getRandMod = function (mods) {
        var length = mods.length;
        if (length == 1)
            return mods[0];
        var randIndex = Global.Toolkit.getRoundInteger(length, 0);
        return mods[randIndex];
    };
    GameControl.prototype.parseLocker = function (msg, glv, gsc, callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        var result = 0;
        var mod = "";
        if (msg.locker) {
            var lock = msg.locker;
            if (this.curGid != lock._gid) {
                result = this.SERVER_LOCK;
                Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
                var str = Global.GameData.getReturnGameStr(lock._gid, lock._glv, false);
                Global.UI.showYesNoBox(str, function () {
                    //游戏中第一版先回大厅  不需要重连
                    _this.goToGameByLocker(msg.locker);
                }, function () {
                    if (Global.SceneManager.inGame()) {
                        Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);
                    }
                });
            }
            else {
                var lock_1 = msg.locker;
                //相同游戏，相同场次，直接进入
                if (lock_1._gsc == gsc && lock_1._glv == glv) {
                    result = 1;
                    this.gsc = lock_1._gsc;
                    this.glv = lock_1._glv;
                    Game.Server.setDst(lock_1._gt, lock_1._chair);
                    mod = lock_1._svr_t + "." + lock_1._svr_id;
                }
                //相同游戏，不同场次  弹提示框
                else {
                    Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
                    var str = Global.GameData.getReturnGameStr(lock_1._gid, lock_1._glv, true);
                    Global.UI.showYesNoBox(str, function () {
                        if (callback) {
                            _this.gsc = lock_1._gsc;
                            _this.glv = lock_1._glv;
                            Game.Server.setDst(lock_1._gt, lock_1._chair);
                            mod = lock_1._svr_t + "." + lock_1._svr_id;
                            callback(mod);
                        }
                    }, function () {
                        if (Global.SceneManager.inGame()) {
                            Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);
                        }
                    });
                    result = this.IN_OTHER_LEVEL;
                }
            }
        }
        return { result: result, mod: mod };
    };
    GameControl.prototype.checkQueryState = function (gid, complete) {
        if (Game.DataBridge.locker == null)
            return false;
        var locker = Game.DataBridge.locker;
        Game.DataBridge.locker = null;
        if (locker._gid != gid)
            return false;
        this.connnectAndEnterGameInLevelScene(gid, locker._glv, locker._gsc, locker, complete);
        return true;
    };
    //关闭游戏统一入口
    GameControl.prototype.shutDown = function (cleanHander) {
        if (cleanHander === void 0) { cleanHander = true; }
        Game.Server.stop();
        Game.Tween.clear();
        Game.Component.unscheduleAllCallbacks();
        this.gsc = "default";
        this.glv = "l0";
        this.curGid = 0;
        this.isLabaGame = false;
        this.stopCheckMsgTimer();
        this.enterData = null;
        Global.HallServer.setSession(null);
        if (cleanHander) {
            Game.Server.clearHandlers();
            // debug 这里清理会导致很多切场景情况Game.Entry为null调用的报错 放到子游戏驱动器destory时清理
            // Game.Entry = null;
        }
    };
    GameControl.prototype.goToGameByLocker = function (locker) {
        if (locker == null || locker.ret != 1)
            return;
        var gid = locker._gid;
        var gameID = gid;
        if (Game.Control.GAME_DDZ_HJ_ARR.indexOf(gameID) >= 0) {
            //斗地主合集
            gameID = Game.Control.GAME_DDZ_HJ_ARR[0];
        }
        if (Global.SceneManager.inGame()) {
            var oldGid = Game.Control.curGid;
            Game.Control.shutDown(true); // 这里会清理curGid
            Game.Tween.clear();
            Game.Component.unscheduleAllCallbacks();
            Global.Component.unscheduleAllCallbacks();
            if (!Global.HotUpdateManager.checkIsGameDownload(gameID) && cc.sys.isNative) {
                Global.UI.fastTip("未下载游戏");
                // Game.DataBridge.locker = locker;
                Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME, true);
                Global.SceneManager.goToHall();
                return;
            }
            //没有更新游戏
            if (!Global.HotUpdateManager.checkIsGameNewest(gameID) && cc.sys.isNative) {
                Global.UI.fastTip("该游戏有最新版本");
                // Game.DataBridge.locker = locker;
                Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME, true);
                Global.SceneManager.goToHall();
            }
            var gameData = Global.GameData.getGameInfo(oldGid);
            if (gameData.portraitModel) {
                Global.NativeEvent.changeOrientationH(true);
            }
            Game.Control.glv = locker._glv;
            Game.Control.curLv = locker._glv;
            Game.Control.curGid = gid;
            Global.SceneManager.switchGameScene(gameID); // 切换游戏场景
        }
        else {
            if (!Global.HotUpdateManager.checkIsGameDownload(gameID) && cc.sys.isNative) {
                Global.UI.fastTip("未下载游戏");
                return;
            }
            //没有更新游戏
            if (!Global.HotUpdateManager.checkIsGameNewest(gameID) && cc.sys.isNative) {
                return;
            }
            Global.HotUpdateManager.CurrentGame = gameID;
            var gameData = Global.GameData.getGameInfo(gameID);
            if (gameData.levelType == 1)
                Game.Control.connnectAndEnterGame(gameData.game_id, locker._glv, locker._gsc, locker);
            else {
                this.curGid = gid;
                this.curLv = locker._glv;
                Global.SceneManager.loadGameScene();
                Game.DataBridge.locker = locker;
            }
        }
    };
    return GameControl;
}());
exports.default = GameControl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGdhbWVcXEdhbWVDb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQWtEO0FBQ2xELDREQUF1RDtBQUN2RCx3REFBbUQ7QUFDbkQsc0VBQWlFO0FBRWpFLFVBQVU7QUFDVjtJQUFBO1FBRUksZUFBZTtRQUNSLHVCQUFrQixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQy9CLHNCQUFzQjtRQUNmLGdCQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEIsWUFBWTtRQUNMLFdBQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNuQixhQUFhO1FBQ04sbUJBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUUzQjs7V0FFRztRQUNLLFFBQUcsR0FBRyxDQUFDLENBQUE7UUFFZixlQUFlO1FBQ1Isb0JBQWUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXpCLFFBQUcsR0FBRyxTQUFTLENBQUM7UUFDaEIsUUFBRyxHQUFHLElBQUksQ0FBQztRQUNYLFdBQU0sR0FBTyxDQUFDLENBQUMsQ0FBQztRQUNqQixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsVUFBSyxHQUFHLElBQUksQ0FBQztRQUlwQixnQkFBZ0I7UUFDUixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixxQkFBZ0IsR0FBTyxDQUFDLENBQUMsQ0FBQztRQUNsQyxtQkFBbUI7UUFDWCxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2Qix3QkFBbUIsR0FBTyxDQUFDLENBQUMsQ0FBQztRQUU5QixrQkFBYSxHQUFZLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBSWxELGVBQVUsR0FBWSxLQUFLLENBQUM7SUE0dUJ4QyxDQUFDO0lBMXVCVSwyQkFBSyxHQUFaO1FBRUksSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUNsRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQ3hFLENBQUM7SUFFTSxrQ0FBWSxHQUFuQixVQUFvQixHQUFVLEVBQUUsR0FBZTtRQUEzQixvQkFBQSxFQUFBLFVBQVU7UUFBRSxvQkFBQSxFQUFBLGVBQWU7UUFFM0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNuQixDQUFDO0lBRU0sZ0NBQVUsR0FBakIsVUFBa0IsT0FBTztRQUVyQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVELGlCQUFpQjtRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFHTywrQkFBUyxHQUFqQixVQUFrQixHQUFHLEVBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFlO1FBQWYseUJBQUEsRUFBQSxlQUFlO1FBRTdDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDOUIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUM1RCxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFDLElBQUksRUFBRyxHQUFHLEVBQUMsQ0FBQztRQUN0QyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDbEMsSUFBRyxRQUFRLEVBQ1g7WUFDSSxLQUFJLElBQUksQ0FBQyxJQUFJLFFBQVEsRUFDckI7Z0JBQ0ksU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzNDO1NBQ0o7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNyQyxDQUFDO0lBRUQsdUJBQXVCO0lBQ2hCLGdDQUFVLEdBQWpCLFVBQWtCLE9BQVc7UUFFekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVNLDBDQUFvQixHQUEzQjtRQUVJLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSx3QkFBYyxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLDZCQUFtQixDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVNLG1DQUFhLEdBQXBCLFVBQXFCLEdBQU8sRUFBRSxPQUFXO1FBRXJDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0scUNBQWUsR0FBdEIsVUFBdUIsR0FBTztRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU0saUNBQVcsR0FBbEIsVUFBbUIsVUFBVSxFQUFFLEdBQUcsRUFBRSxVQUFXLEVBQUUsTUFBYyxFQUFFLE9BQWM7UUFBOUIsdUJBQUEsRUFBQSxjQUFjO1FBQUUsd0JBQUEsRUFBQSxjQUFjO1FBRTNFLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQ3hCO1lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLFdBQVcsQ0FBQyxDQUFBO1lBQzdELE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUE7UUFDakIsT0FBTztRQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXRELElBQUksQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDO0lBQ3RDLENBQUM7SUFHTSxrQ0FBWSxHQUFuQixVQUFvQixhQUFvQjtRQUFwQiw4QkFBQSxFQUFBLG9CQUFvQjtRQUVwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQyxFQUFPLG1CQUFtQjtZQUMzQyxJQUFHLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSTtnQkFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzdCO0lBQ0wsQ0FBQztJQUVPLHdDQUFrQixHQUExQjtRQUVJLHdDQUF3QztRQUN4QyxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUE7SUFDOUYsQ0FBQztJQUVNLHVDQUFpQixHQUF4QjtRQUVJLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsRUFDcEI7WUFDSSxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBRU8sa0NBQVksR0FBcEI7UUFFSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZCLElBQUksT0FBTyxHQUFHLGNBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUE7UUFDbEUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBR0QsMkJBQTJCO0lBQ3BCLDBDQUFvQixHQUEzQixVQUE0QixHQUFHLEVBQUUsR0FBVSxFQUFFLEdBQWUsRUFBRSxNQUFXLEVBQUUsTUFBYyxFQUFDLFdBQW1CO1FBQTdHLGlCQVlDO1FBWmdDLG9CQUFBLEVBQUEsVUFBVTtRQUFFLG9CQUFBLEVBQUEsZUFBZTtRQUFlLHVCQUFBLEVBQUEsY0FBYztRQUFDLDRCQUFBLEVBQUEsbUJBQW1CO1FBRXpHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsVUFBQyxXQUFXLEVBQUUsR0FBRztZQUV6QyxLQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUU7Z0JBRS9CLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO2dCQUMxQyxLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDM0IsS0FBSSxDQUFDLHdCQUF3QixFQUFFLENBQUE7Z0JBQy9CLE1BQU0sQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDeEMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ2QsQ0FBQyxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBR0QsMEJBQTBCO0lBQ25CLHNEQUFnQyxHQUF2QyxVQUF3QyxHQUFHLEVBQUUsR0FBVSxFQUFFLEdBQWUsRUFDaEMsTUFBVyxFQUFFLFVBQW9CLEVBQ2pDLE1BQWMsRUFBRSxXQUFtQjtRQUYzRSxpQkFjQztRQWQ0QyxvQkFBQSxFQUFBLFVBQVU7UUFBRSxvQkFBQSxFQUFBLGVBQWU7UUFFaEMsdUJBQUEsRUFBQSxjQUFjO1FBQUUsNEJBQUEsRUFBQSxtQkFBbUI7UUFFdkUsV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxVQUFDLFdBQVcsRUFBRSxHQUFHO1lBR3pDLEtBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRTtnQkFFL0IsSUFBRyxVQUFVO29CQUNULFVBQVUsRUFBRSxDQUFDO1lBQ3JCLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUNkLENBQUMsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVNLDRDQUFzQixHQUE3QixVQUE4QixHQUFHLEVBQUUsR0FBVSxFQUFFLEdBQWUsRUFBRSxNQUFXLEVBQUUsTUFBYyxFQUFDLFdBQW1CO1FBQS9HLGlCQWFDO1FBYmtDLG9CQUFBLEVBQUEsVUFBVTtRQUFFLG9CQUFBLEVBQUEsZUFBZTtRQUFlLHVCQUFBLEVBQUEsY0FBYztRQUFDLDRCQUFBLEVBQUEsbUJBQW1CO1FBRTNHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsVUFBQyxXQUFXLEVBQUUsR0FBRztZQUN6QyxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixLQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUU7Z0JBRS9CLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO2dCQUMxQyxLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDM0IsS0FBSSxDQUFDLHdCQUF3QixFQUFFLENBQUE7Z0JBQy9CLE1BQU0sQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQzlDLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEIsQ0FBQyxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBR0Q7Ozs7Ozs7T0FPRztJQUNJLHVDQUFpQixHQUF4QixVQUF5QixHQUFVLEVBQUUsUUFBMkIsRUFBRSxHQUFVLEVBQUUsR0FBZSxFQUFFLE1BQVc7UUFBMUcsaUJBcUdDO1FBckdpRSxvQkFBQSxFQUFBLFVBQVU7UUFBRSxvQkFBQSxFQUFBLGVBQWU7UUFFekYsSUFBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQzFDO1lBQ0ksT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLEdBQUcsRUFBRyxDQUFBO1FBQ1gsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLElBQUksS0FBSyxHQUFPLEVBQUUsQ0FBQTtRQUNsQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNoQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNoQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNoQixLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNyQixLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7UUFDcEIsS0FBSyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDckQsS0FBSyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUEsQ0FBQyxvQkFBb0I7UUFDN0UsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzlDLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUE7UUFFckQsSUFBRyxjQUFjLEVBQ2pCO1lBQ0ksS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDL0Q7UUFFRCxJQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxFQUN4QjtZQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQVUsQ0FBQyxHQUFHLEVBQUUscUJBQVUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFDLFVBQUMsR0FBRztZQUV0RSxLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixLQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUU1QixJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNiLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQTtnQkFDbEYsSUFBSSxXQUFXLElBQUksV0FBVyxDQUFDLGNBQWMsRUFBRTtvQkFDM0MsSUFBRyxHQUFHLElBQUUsR0FBRyxDQUFDLE9BQU8sRUFDbkI7d0JBQ0ksSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7d0JBQ3pGLElBQUksWUFBWSxHQUFHLENBQUMsRUFBRTs0QkFDbEIsSUFBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUNwQztnQ0FDSSxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDOzZCQUNwRTtpQ0FFRDtnQ0FDSSxLQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBQyw0QkFBNEIsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFBOzZCQUM5Rjs0QkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQzs0QkFDOUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7NEJBQ25ELE9BQU07eUJBQ1Q7cUJBQ0o7aUJBQ0o7YUFDSjtZQUNELElBQUcsS0FBSyxDQUFDLEdBQUcsSUFBSSxLQUFJLENBQUMsR0FBRyxFQUN4QjtnQkFDSSxPQUFNO2FBQ1Q7WUFDRCxLQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQTtZQUNaLElBQUksWUFBWSxHQUFHLElBQUksc0JBQVksRUFBRSxDQUFDO1lBQ3RDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7WUFDeEIsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQixTQUFTO1lBQ1QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQztZQUU5QyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDcEMsSUFBRyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUNuQztnQkFDSSxJQUFJLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQztnQkFDOUIsS0FBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDdkMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ25ELE9BQU87YUFDVjtZQUVELFVBQVU7WUFDVixJQUFJLE1BQU0sR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDN0MsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQ2YsSUFBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDcEI7Z0JBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ25ELE9BQU87YUFDVjtpQkFDSSxJQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUMxQjtnQkFDSSxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNwQjtZQUVJLElBQUEsS0FBSyxHQUFJLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLENBQUMsR0FBckMsQ0FBc0M7WUFDaEQsSUFBRyxRQUFRLElBQUksSUFBSTtnQkFDZixRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxFQUFFLFVBQUMsR0FBRztZQUNILEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFBO1lBQ3hCLEtBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQzVCLE9BQU8sTUFBTSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakQsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ1osQ0FBQztJQUVNLDZDQUF1QixHQUE5QixVQUErQixJQUFVO1FBQ3JDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdEUsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RCxJQUFJLElBQUksRUFBQztZQUNMLEdBQUcsR0FBRyxJQUFJLENBQUM7U0FDZDtRQUNELElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5QyxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ25ELE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVPLDJDQUFxQixHQUE3QjtRQUFBLGlCQU1DO1FBSkcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFVBQVUsQ0FBQztZQUMvQixLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUM3QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDWixDQUFDO0lBRU8sMENBQW9CLEdBQTVCO1FBRUksSUFBRyxJQUFJLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxDQUFDLEVBQzlCO1lBQ0ksWUFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1lBQ25DLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUM5QjtJQUNMLENBQUM7SUFFTyw4Q0FBd0IsR0FBaEM7UUFBQSxpQkFNQztRQUpHLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxVQUFVLENBQUM7WUFDbEMsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDaEMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ1osQ0FBQztJQUVPLDZDQUF1QixHQUEvQjtRQUVJLElBQUcsSUFBSSxDQUFDLG1CQUFtQixJQUFJLENBQUMsQ0FBQyxFQUNqQztZQUNJLFlBQVksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtZQUN0QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDakM7SUFDTCxDQUFDO0lBR08sNkJBQU8sR0FBZixVQUFnQixHQUFHLEVBQUUsR0FBRztRQUVwQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxJQUFHLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQ3RDO1lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDOUIsT0FBTyxTQUFTLENBQUM7U0FDcEI7UUFDRCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQzFDO1lBQ0ksSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxHQUFHO2dCQUMxQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQztTQUMvQztRQUNELE9BQU8sU0FBUyxDQUFBO0lBQ3BCLENBQUM7SUFHRCxRQUFRO0lBQ0QsdUNBQWlCLEdBQXhCLFVBQXlCLEdBQVUsRUFBRSxRQUFpQixFQUFFLE9BQWdCLEVBQUUsR0FBVSxFQUFFLEdBQWUsRUFBRSxNQUFXLEVBQUUsV0FBbUI7UUFBdkksaUJBc0lDO1FBdEl5RSxvQkFBQSxFQUFBLFVBQVU7UUFBRSxvQkFBQSxFQUFBLGVBQWU7UUFBZSw0QkFBQSxFQUFBLG1CQUFtQjtRQUVuSSxJQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGNBQWMsRUFDMUM7WUFDSSxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7UUFDVixHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLElBQUksS0FBSyxHQUFPLEVBQUUsQ0FBQTtRQUNsQixLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7UUFDcEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDaEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDaEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDaEIsS0FBSyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDckQsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7UUFDckIsS0FBSyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUEsQ0FBQyxvQkFBb0I7UUFDN0UsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzlDLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUE7UUFDckQsSUFBRyxjQUFjLEVBQ2pCO1lBQ0ksS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDL0Q7UUFDRCxJQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxFQUN4QjtZQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQVUsQ0FBQyxHQUFHLEVBQUUscUJBQVUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFDLFVBQUMsR0FBRztZQUV0RSxLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixLQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUM1QixTQUFTO1lBQ1QsSUFBSSxZQUFZLEdBQUcsSUFBSSxzQkFBWSxFQUFFLENBQUM7WUFDdEMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDOUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQztZQUU5QyxJQUFJLFdBQVcsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRXBELE9BQU87WUFDUCxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBRXBCLElBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFDbkM7Z0JBQ0ksSUFBSSxNQUFNLEdBQUcsZ0JBQWdCLENBQUM7Z0JBQzlCLElBQUcsT0FBTyxFQUFFO29CQUNSLE9BQU8sQ0FBRSxFQUFFLE9BQU8sRUFBQyxNQUFNLEVBQUUsQ0FBRSxDQUFDO2lCQUNqQztxQkFFRDtvQkFDSSxLQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztpQkFDakQ7Z0JBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ25ELE9BQU87YUFDVjtZQUNELDBDQUEwQztZQUMxQyx5RkFBeUY7WUFDekYsdURBQXVEO1lBQ3ZELCtCQUErQjtZQUMvQixZQUFZO1lBQ1osd0dBQXdHO1lBQ3hHLHNDQUFzQztZQUN0Qyx3REFBd0Q7WUFDeEQsb0JBQW9CO1lBQ3BCLCtFQUErRTtZQUMvRSxvQkFBb0I7WUFDcEIsdUJBQXVCO1lBQ3ZCLG9CQUFvQjtZQUNwQix5R0FBeUc7WUFDekcsb0JBQW9CO1lBQ3BCLG9FQUFvRTtZQUNwRSxpRUFBaUU7WUFDakUsc0VBQXNFO1lBQ3RFLHlCQUF5QjtZQUN6QixnQkFBZ0I7WUFDaEIsWUFBWTtZQUNaLFFBQVE7WUFDUixJQUFJO1lBQ0osSUFBRyxLQUFLLENBQUMsR0FBRyxJQUFJLEtBQUksQ0FBQyxHQUFHLEVBQ3hCO2dCQUNJLE9BQU07YUFDVDtZQUNELEtBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFBO1lBQ1osTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNwQyxhQUFhO1lBQ2IsSUFBSSxHQUFHLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVoQyxJQUFJLFdBQVcsR0FBRyxVQUFDLEdBQUc7Z0JBRWxCLElBQUcsUUFBUTtvQkFDUCxRQUFRLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQTtZQUdELFVBQVU7WUFDVixJQUFJLE1BQU0sR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBRTFELElBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQ3BCO2dCQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUNuRCxPQUFPO2FBQ1Y7aUJBQ0ksSUFBRyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsRUFDMUI7Z0JBQ0ksR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDcEI7WUFFRCxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsdUJBQXVCO1lBQ3ZCLGtDQUFrQztRQUN0QyxDQUFDLEVBQ0QsVUFBQyxHQUFPO1lBQ0osS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsS0FBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDNUIsSUFBRyxPQUFPLEVBQUU7Z0JBQ1IsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQztnQkFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQzlDLE9BQU8sR0FBRyxDQUFDO2FBQ2Q7aUJBQ0k7Z0JBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBTSw4REFBOEQ7Z0JBQ2xILElBQUcsR0FBRyxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsT0FBTyxJQUFJLEVBQUUsRUFDbkM7b0JBQ0ksS0FBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtpQkFDdkQ7Z0JBRUQsT0FBTyxLQUFLLENBQUM7YUFDZjtRQUNOLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNuQixDQUFDO0lBRU8sdUNBQWlCLEdBQXpCLFVBQTBCLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFNBQWE7UUFBYiwwQkFBQSxFQUFBLGFBQWE7UUFFcEQsSUFBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEVBQ2hDO1lBQ0ksSUFBRyxLQUFLLElBQUksSUFBSSxFQUNoQjtnQkFDSSxJQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQ3BDO29CQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBQzt3QkFDL0IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ2xDLENBQUMsQ0FBQyxDQUFDO2lCQUNOO3FCQUVEO29CQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztpQkFDdkM7YUFDSjtpQkFFRDtnQkFDSSxJQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQ3BDO29CQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsR0FBQyxHQUFHLEdBQUMsS0FBSyxHQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDM0Q7cUJBRUQ7b0JBQ0ksTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFDLEdBQUcsR0FBQyxLQUFLLEdBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3hDO2FBRUo7WUFDRCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRCxJQUFJLFVBQVUsR0FBRyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ25FLElBQUcsVUFBVSxJQUFJLElBQUksSUFBSSxVQUFVLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQzNFO1lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQzdDO2FBRUQ7WUFDSSxJQUFHLEtBQUssSUFBSSxJQUFJLEVBQ2hCO2dCQUNJLElBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFDcEM7b0JBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFDO3dCQUMvQixNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDbEMsQ0FBQyxDQUFDLENBQUM7aUJBQ047cUJBRUQ7b0JBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2lCQUN2QzthQUNKO2lCQUVEO2dCQUNJLElBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFDcEM7b0JBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRyxHQUFDLEdBQUcsR0FBQyxLQUFLLEdBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUMzRDtxQkFFRDtvQkFDSSxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUMsR0FBRyxHQUFDLEtBQUssR0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDeEM7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUVELE9BQU87SUFDQyxxQ0FBZSxHQUF2QixVQUF3QixHQUFHLEVBQUUsU0FBYTtRQUFiLDBCQUFBLEVBQUEsYUFBYTtRQUV0QyxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRCxJQUFJLFVBQVUsR0FBRyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ25FLE9BQU8sVUFBVSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTyxvQ0FBYyxHQUF0QixVQUF1QixZQUF5QjtRQUU1QyxJQUFJLFdBQVcsR0FBRyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDOUMsSUFBRyxXQUFXLElBQUksSUFBSTtZQUNsQixPQUFPLFdBQVcsQ0FBQztRQUN2QixzQkFBc0I7UUFDdEIsV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMzRCxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBRU8sc0NBQWdCLEdBQXhCO1FBRUksSUFBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxFQUMvQjtZQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztZQUM5QyxJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFHLGtEQUFrRDtnQkFDekUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQzNCO1FBQ0QsSUFBRyxJQUFJLENBQUMsZUFBZSxFQUN2QjtZQUNJLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFFTyx1Q0FBaUIsR0FBekI7UUFFSSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFDN0QsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVPLGdDQUFVLEdBQWxCLFVBQW1CLElBQUk7UUFFbkIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN6QixJQUFHLE1BQU0sSUFBSSxDQUFDO1lBQ1YsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFHTyxpQ0FBVyxHQUFuQixVQUFvQixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUF3QjtRQUEzRCxpQkE2REM7UUE3RGtDLHlCQUFBLEVBQUEsZUFBd0I7UUFFdkQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFBO1FBQ2QsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO1FBQ1osSUFBSSxHQUFHLENBQUMsTUFBTSxFQUNkO1lBQ0ksSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztZQUN0QixJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksRUFDM0I7Z0JBQ0ksTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO2dCQUNsRCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDeEUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFO29CQUd4QixtQkFBbUI7b0JBQ25CLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBQ3JDLENBQUMsRUFBRTtvQkFFQyxJQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEVBQUU7d0JBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO3FCQUNqRDtnQkFDTCxDQUFDLENBQUMsQ0FBQzthQUNOO2lCQUVEO2dCQUNJLElBQUksTUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQ3RCLGdCQUFnQjtnQkFDaEIsSUFBRyxNQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsRUFDdkM7b0JBQ0ksTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDWCxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQUksQ0FBQyxJQUFJLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBSSxDQUFDLElBQUksQ0FBQztvQkFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzFDLEdBQUcsR0FBRyxNQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxNQUFJLENBQUMsT0FBTyxDQUFDO2lCQUMxQztnQkFDRCxpQkFBaUI7cUJBRWpCO29CQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO29CQUNsRCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE1BQUksQ0FBQyxJQUFJLEVBQUUsTUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDdkUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFO3dCQUV4QixJQUFHLFFBQVEsRUFDWDs0QkFDSSxLQUFJLENBQUMsR0FBRyxHQUFHLE1BQUksQ0FBQyxJQUFJLENBQUM7NEJBQ3JCLEtBQUksQ0FBQyxHQUFHLEdBQUcsTUFBSSxDQUFDLElBQUksQ0FBQzs0QkFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQzFDLEdBQUcsR0FBRyxNQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxNQUFJLENBQUMsT0FBTyxDQUFDOzRCQUN2QyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7eUJBQ2pCO29CQUNMLENBQUMsRUFBRTt3QkFDQyxJQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEVBQUU7NEJBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO3lCQUNqRDtvQkFDTCxDQUFDLENBQUMsQ0FBQztvQkFDSCxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztpQkFDaEM7YUFDSjtTQUNKO1FBQ0QsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFDLEdBQUcsRUFBQyxDQUFBO0lBQ25DLENBQUM7SUFFTSxxQ0FBZSxHQUF0QixVQUF1QixHQUFHLEVBQUUsUUFBUTtRQUVoQyxJQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLElBQUk7WUFDN0IsT0FBTyxLQUFLLENBQUM7UUFDakIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxHQUFHO1lBQ2pCLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUN0RixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsVUFBVTtJQUNILDhCQUFRLEdBQWYsVUFBZ0IsV0FBa0I7UUFBbEIsNEJBQUEsRUFBQSxrQkFBa0I7UUFFOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxJQUFHLFdBQVcsRUFDZDtZQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDNUIsOERBQThEO1lBQzlELHFCQUFxQjtTQUN4QjtJQUNMLENBQUM7SUFHTSxzQ0FBZ0IsR0FBdkIsVUFBd0IsTUFBTTtRQUMxQixJQUFHLE1BQU0sSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ2hDLE9BQU87UUFDWCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFBO1FBRXJCLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNqQixJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUM7WUFDakQsT0FBTztZQUNQLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QztRQUNELElBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsRUFBQztZQUM1QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFZLGNBQWM7WUFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDeEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBRTFDLElBQUcsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUM7Z0JBQ3ZFLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQixtQ0FBbUM7Z0JBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDcEQsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDL0IsT0FBTzthQUNWO1lBQ0QsUUFBUTtZQUNSLElBQUcsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUM7Z0JBQ3JFLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUM5QixtQ0FBbUM7Z0JBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDcEQsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNsQztZQUVELElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25ELElBQUksUUFBUSxDQUFDLGFBQWEsRUFBRTtnQkFDeEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMvQztZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDMUIsTUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBTyxTQUFTO1NBQy9EO2FBQ0c7WUFDQSxJQUFHLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFDO2dCQUN2RSxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0IsT0FBTzthQUNWO1lBQ0QsUUFBUTtZQUNSLElBQUcsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUM7Z0JBQ3JFLE9BQU87YUFDVjtZQUVELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1lBQzdDLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25ELElBQUcsUUFBUSxDQUFDLFNBQVMsSUFBSSxDQUFDO2dCQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO2lCQUNwRjtnQkFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFBO2dCQUN4QixNQUFNLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7YUFDbkM7U0FDSjtJQUNMLENBQUM7SUFDTCxrQkFBQztBQUFELENBbHhCQSxBQWt4QkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5ldEFwcGZhY2UgfSBmcm9tIFwiLi4vbmV0L2hhbGwvTmV0RXZlbnRcIjtcclxuaW1wb3J0IFNlc3Npb25IYW5kbGVyIGZyb20gXCIuL2hhbmRsZXJzL1Nlc3Npb25IYW5kbGVyXCI7XHJcbmltcG9ydCBTZXJ2ZXJSb3V0ZXMgZnJvbSBcIi4uL3NldHRpbmcvU2VydmVyUm91dGVzXCI7XHJcbmltcG9ydCBQdnBXYWl0TWF0Y2hIYW5kbGVyIGZyb20gXCIuL2hhbmRsZXJzL1B2cFdhaXRNYXRjaEhhbmRsZXJcIjtcclxuXHJcbi8v5Li76KaB6LSf6LSj5ri45oiP6L+b5Ye6XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb250cm9sXHJcbntcclxuICAgIC8v5pyN5Yqh5Zmo6L+U5Zue55qEcm91dGXplJnor69cclxuICAgIHB1YmxpYyBTRVJWRVJfUk9VVEVfRVJST1IgPSAtMTtcclxuICAgIC8v5q2j5Zyo5Yir55qE5ri45oiPIOW5tuS4lOWSjOmAieS4rea4uOaIj+eahGdpZOS4jeWQjFxyXG4gICAgcHVibGljIFNFUlZFUl9MT0NLID0gLTI7XHJcbiAgICAvL+acjeWKoeWZqOayoeaciei/lOWbnk1PRFxyXG4gICAgcHVibGljIE5PX01PRCA9IC0zO1xyXG4gICAgLy/nm7jlkIxnaWQs5Zyo5Yir55qE5Zy65qyhXHJcbiAgICBwdWJsaWMgSU5fT1RIRVJfTEVWRUwgPSAtNDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeUqOS6jumZkOWItuefreaXtumXtOWGheW/q+mAn+ivt+axgiBnZXRnYW1lcm91dGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXEgPSAwXHJcblxyXG4gICAgLy/mlpflnLDkuLvlkIjpm4bkuK3nmoRnYW1laWRcclxuICAgIHB1YmxpYyBHQU1FX0REWl9ISl9BUlIgPSBbMjAwMDFdO1xyXG5cclxuICAgIHByaXZhdGUgZ3NjID0gXCJkZWZhdWx0XCI7XHJcbiAgICBwcml2YXRlIGdsdiA9IFwibDBcIjtcclxuICAgIHByaXZhdGUgdGltZUlkOmFueSA9IC0xO1xyXG4gICAgcHVibGljIGN1ckdpZCA9IDA7XHJcbiAgICBwdWJsaWMgY3VyTHYgPSBcImwwXCI7XHJcblxyXG4gICAgcHVibGljIGVudGVyRGF0YTphbnlcclxuXHJcbiAgICAvL+W8gOWni2h0dHDor7fmsYIg5Yiw6K+35rGC5oiQ5YqfXHJcbiAgICBwcml2YXRlIGNvbm5lY3RMb2NrID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGNvbm5lY3RMb2NrVGltZXI6YW55ID0gLTE7XHJcbiAgICAvL3NvY2tldOi/nuaOpeaIkOWKnyAg6L+b5Zy65pmv5LmL5YmNXHJcbiAgICBwcml2YXRlIGVudGVyU2NlbmVMb2NrID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGVudGVyU2NlbmVMb2NrVGltZXI6YW55ID0gLTE7XHJcblxyXG4gICAgcHVibGljIGNhbGxFbnRlckZ1bmM6RnVuY3Rpb24gPSB0aGlzLnNlbmRFbnRlci5iaW5kKHRoaXMpO1xyXG5cclxuICAgIHByaXZhdGUgY29ubmVjdENvbXBsZXRlOkZ1bmN0aW9uO1xyXG5cclxuICAgIHByaXZhdGUgaXNMYWJhR2FtZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzZXR1cCgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZS5FdmVudC5vbihHYW1lLkVWRU5UX1NPQ0tFVF9PUEVOLCB0aGlzLCB0aGlzLm9uR2FtZVNvY2tldE9wZW4pXHJcbiAgICAgICAgR2FtZS5FdmVudC5vbihHYW1lLkVWRU5UX1NPQ0tFVF9FUlJPUiwgdGhpcywgdGhpcy5vbkdhbWVTb2NrZXRFcnJvcilcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0R2x2QW5kR3NjKGdsdiA9IFwibDBcIiwgZ3NjID0gXCJkZWZhdWx0XCIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5nbHYgPSBnbHY7XHJcbiAgICAgICAgdGhpcy5nc2MgPSBnc2M7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNlc3Npb24oc2Vzc2lvbilcclxuICAgIHtcclxuICAgICAgICBHYW1lLlNlcnZlci5zZXREc3Qoc2Vzc2lvbi5fcGFyYS5fZ3QsIHNlc3Npb24uX3BhcmEuX2NoYWlyKTtcclxuICAgICAgICAvL+aUtuWIsFNlc3Npb27lkI4g5Y+R6YCB5b+D6LezXHJcbiAgICAgICAgR2FtZS5TZXJ2ZXIuc2VuZEhlYXJ0QmVhdCgpOyAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIHNlbmRFbnRlcihnaWQsICBnbHYgLGdzYywgZXh0cmFNYXAgPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWUuU2VydmVyLnBhc3NTU1NBbmRFbnRlcigpO1xyXG4gICAgICAgIGxldCBlbnRlckRhdGEgPSBHYW1lLlNlcnZlci5nZXRTZW5kUGFyYW0oR2FtZS5Db21tYW5kLkVudGVyKVxyXG4gICAgICAgIGVudGVyRGF0YS5fcGFyYW0uX3BhcmEgPSB7X2dpZCA6IGdpZH07XHJcbiAgICAgICAgZW50ZXJEYXRhLl9wYXJhbS5fcGFyYS5fZ3NjID0gZ3NjOyBcclxuICAgICAgICBlbnRlckRhdGEuX3BhcmFtLl9wYXJhLl9nbHYgPSBnbHY7XHJcbiAgICAgICAgaWYoZXh0cmFNYXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IobGV0IGsgaW4gZXh0cmFNYXApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVudGVyRGF0YS5fcGFyYW0uX3BhcmFba10gPSBleHRyYU1hcFtrXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVudGVyRGF0YSA9IGVudGVyRGF0YTtcclxuICAgICAgICBHYW1lLlNlcnZlci5zZW5kRGlyZWN0KGVudGVyRGF0YSlcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvue9rmNvbnRleHQgIOmcgOimgeWcqOi/m+a4uOaIj+S5i+WJjeiuvue9rlxyXG4gICAgcHVibGljIHNldENvbnRleHQoY29udGV4dDphbnkpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZS5Db250ZXh0ID0gY29udGV4dDtcclxuICAgICAgICB0aGlzLnJlZ2lzdERlZmF1bHRIYW5kbGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdERlZmF1bHRIYW5kbGVyKClcclxuICAgIHtcclxuICAgICAgICBHYW1lLlNlcnZlci5yZWdpc3REZWZhdWx0SGFuZGxlcihHYW1lLkNvbW1hbmQuU2Vzc2lvbiwgbmV3IFNlc3Npb25IYW5kbGVyKTtcclxuICAgICAgICBHYW1lLlNlcnZlci5yZWdpc3REZWZhdWx0SGFuZGxlcihHYW1lLkNvbW1hbmQuV2FpdE1hdGNoLCBuZXcgUHZwV2FpdE1hdGNoSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdEhhbmRsZXIoa2V5OmFueSwgaGFuZGxlcjphbnkpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZS5TZXJ2ZXIucmVnaXN0SGFuZGxlcihrZXksIGhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bnJlZ2lzdEhhbmRsZXIoa2V5OmFueSkge1xyXG4gICAgICAgIEdhbWUuU2VydmVyLnVucmVnaXN0SGFuZGxlcihrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb25uZWN0R2FtZShzZXJ2ZXJJbmZvLCBtb2QsIG9uQ29tcGxldGU/LCBwYm1vZGUgPSBmYWxzZSwgdXNlRnVuYyA9IHRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoR2FtZS5TZXJ2ZXIuaXNSdW5uaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkhJREVfTkVUX1dBSVRJTkcsIFwiZW50ZXJHYW1lXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZS5TZXJ2ZXIucnVuKClcclxuICAgICAgICAvL+mTvuaOpeacjeWKoeWZqFxyXG4gICAgICAgIEdhbWUuU2VydmVyLmNvbm5lY3Qoc2VydmVySW5mbywgbW9kLCBwYm1vZGUsIHVzZUZ1bmMpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbm5lY3RDb21wbGV0ZSA9IG9uQ29tcGxldGU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyB0cnlTZW5kRW50ZXIoZXh0cmFQYXJhbU1hcCA9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzTGFiYUdhbWUpeyAgICAgIC8vIOmdnuaLiemcuOexu3NvY2tldOWPkWVudGVyXHJcbiAgICAgICAgICAgIGlmKHRoaXMuY2FsbEVudGVyRnVuYyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsRW50ZXJGdW5jID0gdGhpcy5zZW5kRW50ZXIuYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5jYWxsRW50ZXJGdW5jKHRoaXMuY3VyR2lkLCB0aGlzLmdsdiwgdGhpcy5nc2MsIGV4dHJhUGFyYW1NYXApO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0Q2hlY2tNc2dUaW1lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXJ0Q2hlY2tNc2dUaW1lcigpXHJcbiAgICB7XHJcbiAgICAgICAgLy9HbG9iYWwuQ29tcG9uZW506Leo5Zy65pmv5Lya5pyJ6Zeu6aKYIOmcgOimgeS9v+eUqHNldFRpbWVvdXRcclxuICAgICAgICAvL0B0b2RvIOaPkOS+m+W4uOmpu+e7hOS7tiAgXHJcbiAgICAgICAgdGhpcy5zdG9wQ2hlY2tNc2dUaW1lcigpO1xyXG4gICAgICAgIHRoaXMudGltZUlkID0gc2V0VGltZW91dCh0aGlzLm9uTXNnVGltZU91dC5iaW5kKHRoaXMpLCBHbG9iYWwuU2V0dGluZy5lbnRlclRpbWVvdXQgKiAxMDAwKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wQ2hlY2tNc2dUaW1lcigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy50aW1lSWQgIT0gLTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lSWQpO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVJZCA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTXNnVGltZU91dCgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZS5TZXJ2ZXIuc3RvcEdhbWUoKTtcclxuICAgICAgICBsZXQgZXJyRnVuYyA9ICgpPT57R2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX0ZPUkNFX0xFQVZFX0dBTUUpO31cclxuICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChcIue9kee7nOi/nuaOpeW8guW4uO+8jOivt+eojeWQjuWGjeivlVwiLCBlcnJGdW5jLCBlcnJGdW5jKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/lr7nkuo7pnZ7pgInlnLrnsbvmuLjmiI8g5Zyo5aSn5Y6F6K+35rGC5pWw5o2u5ZKM6ZO+5o6lc29ja2V0XHJcbiAgICBwdWJsaWMgY29ubm5lY3RBbmRFbnRlckdhbWUoZ2lkLCBnbHYgPSBcImwwXCIsIGdzYyA9IFwiZGVmYXVsdFwiLCBsb2NrZXI/OmFueSwgcGJNb2RlID0gZmFsc2Usc2hvd1dhaXRpbmcgPSBmYWxzZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmdldEdhbWVTZXJ2ZXJJbmZvKGdpZCwgKHNlcnZlclJvdXRlLCBtb2QpPT5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdEdhbWUoc2VydmVyUm91dGUsIG1vZCwgKCk9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5DdXJyZW50R2FtZSA9IGdpZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW50ZXJTY2VuZUxvY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEVudGVyU2NlbmVMb2NrVGltZXIoKVxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlNjZW5lTWFuYWdlci5sb2FkR2FtZVNjZW5lKCk7XHJcbiAgICAgICAgICAgIH0sIHBiTW9kZSlcclxuICAgICAgICB9LG51bGwsIGdsdiwgZ3NjLCBsb2NrZXIsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8v5a+55LqO6YCJ5Zy657G75ri45oiPIOWcqOWkp+WOheivt+axguaVsOaNruWSjOmTvuaOpXNvY2tldFxyXG4gICAgcHVibGljIGNvbm5uZWN0QW5kRW50ZXJHYW1lSW5MZXZlbFNjZW5lKGdpZCwgZ2x2ID0gXCJsMFwiLCBnc2MgPSBcImRlZmF1bHRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VyPzphbnksIG9uQ29tcGxldGU/OkZ1bmN0aW9uLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYk1vZGUgPSBmYWxzZSwgc2hvd1dhaXRpbmcgPSBmYWxzZSlcclxuICAgIHtcclxuICAgICAgICBzaG93V2FpdGluZyA9IHRoaXMubmVlZENob29zZUxldmVsKGdpZCk7XHJcbiAgICAgICAgdGhpcy5nZXRHYW1lU2VydmVySW5mbyhnaWQsIChzZXJ2ZXJSb3V0ZSwgbW9kKT0+XHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0R2FtZShzZXJ2ZXJSb3V0ZSwgbW9kLCAoKT0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKG9uQ29tcGxldGUpXHJcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9LCBwYk1vZGUpXHJcbiAgICAgICAgfSxudWxsLCBnbHYsIGdzYywgbG9ja2VyLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbm5uZWN0TGFiYUdhbWVTZXJ2ZXIoZ2lkLCBnbHYgPSBcImwwXCIsIGdzYyA9IFwiZGVmYXVsdFwiLCBsb2NrZXI/OmFueSwgcGJNb2RlID0gZmFsc2Usc2hvd1dhaXRpbmcgPSBmYWxzZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmdldEdhbWVTZXJ2ZXJJbmZvKGdpZCwgKHNlcnZlclJvdXRlLCBtb2QpPT57XHJcbiAgICAgICAgICAgIHRoaXMuaXNMYWJhR2FtZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdEdhbWUoc2VydmVyUm91dGUsIG1vZCwgKCk9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5DdXJyZW50R2FtZSA9IGdpZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW50ZXJTY2VuZUxvY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEVudGVyU2NlbmVMb2NrVGltZXIoKVxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlNjZW5lTWFuYWdlci5sb2FkR2FtZVNjZW5lKCk7XHJcbiAgICAgICAgICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfTEFCQV9DT05ORUNUKTtcclxuICAgICAgICAgICAgfSwgcGJNb2RlLCBmYWxzZSk7XHJcbiAgICAgICAgfSxudWxsLCBnbHYsIGdzYywgbG9ja2VyLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5o2V6bG85ri45oiP5pyN5Yqh5Zmo5a6M5pW0c29ja2V05Zyw5Z2AXHJcbiAgICAgKiBAcGFyYW0gZ2lkIOa4uOaIj2lkXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgKHVybDpzdHJpbmcpPT52b2lkICAg6L+U5Zuec29ja2V05a6M5pW05Zyw5Z2AXHJcbiAgICAgKiBAcGFyYW0gZ2x2IOmAieWcuuS/oeaBr1xyXG4gICAgICogQHBhcmFtIGdzYyDpu5jorqTlgLxcclxuICAgICAqIEBwYXJhbSBsb2NrZXIgbnVsbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RmlzaFNlcnZlckluZm8oZ2lkOm51bWJlciwgY2FsbGJhY2s6KHVybDpzdHJpbmcpPT52b2lkLCBnbHYgPSBcImwwXCIsIGdzYyA9IFwiZGVmYXVsdFwiLCBsb2NrZXI/OmFueSlcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmNvbm5lY3RMb2NrIHx8IHRoaXMuZW50ZXJTY2VuZUxvY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2VxICsrXHJcbiAgICAgICAgdGhpcy5jb25uZWN0TG9jayA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zdGFydENvbm5lY3RMb2NrVGltZXIoKTtcclxuICAgICAgICB0aGlzLmdsdiA9IGdsdjtcclxuICAgICAgICB0aGlzLmdzYyA9IHRoaXMuZ2V0UnVsZShnaWQsIGdsdik7XHJcbiAgICAgICAgdGhpcy5jdXJHaWQgPSBnaWQ7XHJcbiAgICAgICAgbGV0IHBhcmFtOmFueSA9IHt9XHJcbiAgICAgICAgcGFyYW0uZ2x2ID0gZ2x2O1xyXG4gICAgICAgIHBhcmFtLmdzYyA9IGdzYztcclxuICAgICAgICBwYXJhbS5naWQgPSBnaWQ7XHJcbiAgICAgICAgcGFyYW0ubG9ja2VyID0gbG9ja2VyXHJcbiAgICAgICAgcGFyYW0uc2VxID0gdGhpcy5zZXFcclxuICAgICAgICBwYXJhbS5nYW1lX3NraW4gPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmdhbWVTa2luO1xyXG4gICAgICAgIHBhcmFtLmFwcF92ZXJzaW9uID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5hcHBWZXJzaW9uIC8vMjAyMDAzMjNHcmFjZSDmlrDlop7lrZfmrrVcclxuICAgICAgICBwYXJhbS5kZXZpY2UgPSBHbG9iYWwuVG9vbGtpdC5nZW5EZXZpY2VJbmZvKCk7XHJcbiAgICAgICAgbGV0IG1lZ2VTZXJ2ZXJGbGFnID0gR2xvYmFsLlRvb2xraXQuY2hlY2tNZWdlU2VydmVyKClcclxuICAgICAgICBcclxuICAgICAgICBpZihtZWdlU2VydmVyRmxhZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHBhcmFtLm9sZF9hcHBfaWQgPSBwYXJzZUludChHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmFwcElEKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYobG9ja2VyICYmIGxvY2tlci5fZ2lkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZS5TZXJ2ZXIuc2V0RHN0KGxvY2tlci5fZ3QsIGxvY2tlci5fY2hhaXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkdldEdhbWVSb3V0ZSwgcGFyYW0sKG1zZyk9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0TG9jayA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BDb25uZWN0TG9ja1RpbWVyKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIUNDX1BSRVZJRVcpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0bXBHYW1lSW5mbyA9IEdsb2JhbC5HYW1lRGF0YS5nZXRHYW1lSW5mbyhHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5DdXJyZW50R2FtZSlcclxuICAgICAgICAgICAgICAgIGlmICh0bXBHYW1lSW5mbyAmJiB0bXBHYW1lSW5mby5uYXRpdmVfdmVyc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1zZyYmbXNnLnZlcnNpb24pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hlY2t2ZXJzaW9uID0gR2xvYmFsLlRvb2xraXQudmVyc2lvbkNvbXBhcmUodG1wR2FtZUluZm8ubmF0aXZlX3ZlcnNpb24sIG1zZy52ZXJzaW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2t2ZXJzaW9uIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoR2xvYmFsLlNldHRpbmcubmVlZEhhbGxDaG9vc2VSb29tKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5Ub29sa2l0LnRyYW5zbWl0SGFsbFRpcChcIuaCqOeahOa4uOaIj+S4jeaYr+acgOaWsOeJiOacrO+8jOivt+mHjeaWsOWQr+WKqOa4uOaIj+abtOaWsOiHs+acgOaWsOeJiOacrO+8gVstMV1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93RmFzdFRpcHNFcnJvcihHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5DdXJyZW50R2FtZSxcIuaCqOeahOa4uOaIj+S4jeaYr+acgOaWsOeJiOacrO+8jOivt+mHjeaWsOWQr+WKqOa4uOaIj+abtOaWsOiHs+acgOaWsOeJiOacrO+8gVwiLC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX0ZPUkNFX0xFQVZFX0dBTUUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkZPUkNFX0hJREVfV0FJVElORyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihwYXJhbS5zZXEgIT0gdGhpcy5zZXEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2VxID0gMFxyXG4gICAgICAgICAgICBsZXQgc2VydmVyUm91dGVzID0gbmV3IFNlcnZlclJvdXRlcygpO1xyXG4gICAgICAgICAgICBsZXQgcm91dGVzID0gbXNnLnJvdXRlcztcclxuICAgICAgICAgICAgc2VydmVyUm91dGVzLnBhcnNlKHJvdXRlcyk7XHJcbiAgICAgICAgICAgIC8v6I635Y+W5pyN5Yqh5Zmo5L+h5oGvXHJcbiAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLlVybHMuZ2FtZVJvdXRlcyA9IHNlcnZlclJvdXRlcztcclxuXHJcbiAgICAgICAgICAgIGxldCBtb2RzID0gbXNnLm1vZHM7XHJcbiAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLlVybHMuZ2FtZU1vZHMgPSBtb2RzO1xyXG4gICAgICAgICAgICBpZihtb2RzID09IG51bGwgfHwgbW9kcy5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGVyclN0ciA9IFwi5pyN5Yqh5Zmo5q2j5Zyo57u05oqk5Lit77yM6K+356iN5ZCO5YaN6K+VXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dGYXN0VGlwc0Vycm9yKGdpZCwgZXJyU3RyLCAtMSlcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5GT1JDRV9ISURFX1dBSVRJTkcpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL+WkhOeQhmxvY2tlclxyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5wYXJzZUxvY2tlcihtc2csIGdsdiwgZ3NjKTtcclxuICAgICAgICAgICAgbGV0IG1vZCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC5yZXN1bHQgPCAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuRk9SQ0VfSElERV9XQUlUSU5HKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHJlc3VsdC5yZXN1bHQgPT0gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbW9kID0gcmVzdWx0Lm1vZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IFtwYlVybF0gPSB0aGlzLmdldFJhbmRvbUZpc2hTZXJ2ZXJJbmZvKG1vZCk7XHJcbiAgICAgICAgICAgIGlmKGNhbGxiYWNrICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhwYlVybCk7XHJcbiAgICAgICAgfSwgKG1zZyk9PntcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0TG9jayA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcENvbm5lY3RMb2NrVGltZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIEdsb2JhbC5IYWxsU2VydmVyLnRyeUhhbmRsZUVycm9yKG1zZyk7XHJcbiAgICAgICAgfSwgdHJ1ZSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UmFuZG9tRmlzaFNlcnZlckluZm8oX21vZD86IGFueSl7XHJcbiAgICAgICAgbGV0IHNlcnZlclJvdXRlID0gdGhpcy5nZXRTZXJ2ZXJSb3V0ZShHbG9iYWwuU2V0dGluZy5VcmxzLmdhbWVSb3V0ZXMpO1xyXG4gICAgICAgIGxldCBtb2QgPSB0aGlzLmdldFJhbmRNb2QoR2xvYmFsLlNldHRpbmcuVXJscy5nYW1lTW9kcyk7XHJcbiAgICAgICAgaWYgKF9tb2Qpe1xyXG4gICAgICAgICAgICBtb2QgPSBfbW9kO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcGJVcmwgPSBzZXJ2ZXJSb3V0ZS5nZXRQYlNvY2tldFVybChtb2QpO1xyXG4gICAgICAgIHBiVXJsID0gR2FtZS5TZXJ2ZXIuZ2V0U29ja2V0VXJsKHBiVXJsLCB0cnVlKTtcclxuICAgICAgICBsZXQgcmVxVXJsID0gR2xvYmFsLlVybFV0aWwuZGVhbFdlYlNvY2tldFVybChwYlVybClcclxuICAgICAgICByZXR1cm4gW3JlcVVybCwgbW9kXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXJ0Q29ubmVjdExvY2tUaW1lcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zdG9wQ29ubmVjdExvY2tUaW1lcigpO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdExvY2tUaW1lciA9IHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0TG9jayA9IGZhbHNlO1xyXG4gICAgICAgIH0sIDMwMDApXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdG9wQ29ubmVjdExvY2tUaW1lcigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5jb25uZWN0TG9ja1RpbWVyICE9IC0xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuY29ubmVjdExvY2tUaW1lcilcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0TG9ja1RpbWVyID0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhcnRFbnRlclNjZW5lTG9ja1RpbWVyKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnN0b3BFbnRlclNjZW5lTG9ja1RpbWVyKCk7XHJcbiAgICAgICAgdGhpcy5lbnRlclNjZW5lTG9ja1RpbWVyID0gc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmVudGVyU2NlbmVMb2NrID0gZmFsc2U7XHJcbiAgICAgICAgfSwgMjAwMClcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0b3BFbnRlclNjZW5lTG9ja1RpbWVyKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmVudGVyU2NlbmVMb2NrVGltZXIgIT0gLTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5lbnRlclNjZW5lTG9ja1RpbWVyKVxyXG4gICAgICAgICAgICB0aGlzLmVudGVyU2NlbmVMb2NrVGltZXIgPSAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgZ2V0UnVsZShnaWQsIGdsdilcclxuICAgIHtcclxuICAgICAgICBsZXQgZGF0YSA9IEdsb2JhbC5HYW1lRGF0YS5nZXRHYW1lSW5mbyhnaWQpO1xyXG4gICAgICAgIGlmKGRhdGEgPT0gbnVsbCB8fCBkYXRhLmxldmVscyA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5om+5LiN5YiwZ2lkOlwiICsgZ2lkKTtcclxuICAgICAgICAgICAgcmV0dXJuIFwiZGVmYXVsdFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGF0YS5sZXZlbHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihkYXRhLmxldmVsc1tpXS5sZXZlbCA9PSBnbHYpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5sZXZlbHNbaV0ucnVsZSB8fCBcImRlZmF1bHRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiZGVmYXVsdFwiXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v6I635Y+W5ri45oiP5L+h5oGvXHJcbiAgICBwdWJsaWMgZ2V0R2FtZVNlcnZlckluZm8oZ2lkOm51bWJlciwgY2FsbGJhY2s6RnVuY3Rpb24sIG9uRXJyb3I6RnVuY3Rpb24sIGdsdiA9IFwibDBcIiwgZ3NjID0gXCJkZWZhdWx0XCIsIGxvY2tlcj86YW55LCBzaG93V2FpdGluZyA9IGZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuY29ubmVjdExvY2sgfHwgdGhpcy5lbnRlclNjZW5lTG9jaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXErK1xyXG4gICAgICAgIGdzYyA9IHRoaXMuZ2V0UnVsZShnaWQsIGdsdik7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0TG9jayA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zdGFydENvbm5lY3RMb2NrVGltZXIoKTtcclxuICAgICAgICB0aGlzLmdsdiA9IGdsdjtcclxuICAgICAgICB0aGlzLmdzYyA9IGdzYztcclxuICAgICAgICB0aGlzLmN1ckdpZCA9IGdpZDtcclxuICAgICAgICBsZXQgcGFyYW06YW55ID0ge31cclxuICAgICAgICBwYXJhbS5zZXEgPSB0aGlzLnNlcVxyXG4gICAgICAgIHBhcmFtLmdsdiA9IGdsdjtcclxuICAgICAgICBwYXJhbS5nc2MgPSBnc2M7XHJcbiAgICAgICAgcGFyYW0uZ2lkID0gZ2lkO1xyXG4gICAgICAgIHBhcmFtLmdhbWVfc2tpbiA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uZ2FtZVNraW47XHJcbiAgICAgICAgcGFyYW0ubG9ja2VyID0gbG9ja2VyXHJcbiAgICAgICAgcGFyYW0uYXBwX3ZlcnNpb24gPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmFwcFZlcnNpb24gLy8yMDIwMDMyM0dyYWNlIOaWsOWinuWtl+autVxyXG4gICAgICAgIHBhcmFtLmRldmljZSA9IEdsb2JhbC5Ub29sa2l0LmdlbkRldmljZUluZm8oKTtcclxuICAgICAgICBsZXQgbWVnZVNlcnZlckZsYWcgPSBHbG9iYWwuVG9vbGtpdC5jaGVja01lZ2VTZXJ2ZXIoKVxyXG4gICAgICAgIGlmKG1lZ2VTZXJ2ZXJGbGFnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcGFyYW0ub2xkX2FwcF9pZCA9IHBhcnNlSW50KEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uYXBwSUQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGxvY2tlciAmJiBsb2NrZXIuX2dpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWUuU2VydmVyLnNldERzdChsb2NrZXIuX2d0LCBsb2NrZXIuX2NoYWlyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXRHYW1lUm91dGUsIHBhcmFtLChtc2cpPT5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdExvY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdG9wQ29ubmVjdExvY2tUaW1lcigpO1xyXG4gICAgICAgICAgICAvL+iOt+WPluacjeWKoeWZqOS/oeaBr1xyXG4gICAgICAgICAgICBsZXQgc2VydmVyUm91dGVzID0gbmV3IFNlcnZlclJvdXRlcygpO1xyXG4gICAgICAgICAgICBzZXJ2ZXJSb3V0ZXMucGFyc2UobXNnLnJvdXRlcylcclxuICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcuVXJscy5nYW1lUm91dGVzID0gc2VydmVyUm91dGVzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHNlcnZlclJvdXRlID0gdGhpcy5nZXRTZXJ2ZXJSb3V0ZShzZXJ2ZXJSb3V0ZXMpO1xyXG5cclxuICAgICAgICAgICAgLy/ojrflj5Ztb2RcclxuICAgICAgICAgICAgbGV0IG1vZHMgPSBtc2cubW9kcztcclxuXHJcbiAgICAgICAgICAgIGlmKG1vZHMgPT0gbnVsbCB8fCBtb2RzLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXJyU3RyID0gXCLmnI3liqHlmajmraPlnKjnu7TmiqTkuK3vvIzor7fnqI3lkI7lho3or5VcIjtcclxuICAgICAgICAgICAgICAgIGlmKG9uRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBvbkVycm9yKCB7IF9lcnJzdHI6ZXJyU3RyIH0gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGYXN0VGlwc0Vycm9yKGdpZCwgZXJyU3RyLCAtMSlcclxuICAgICAgICAgICAgICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfRk9SQ0VfTEVBVkVfR0FNRSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkZPUkNFX0hJREVfV0FJVElORyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaWYgKCFDQ19QUkVWSUVXICYmICFjYy5zeXMuaXNCcm93c2VyKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgdG1wR2FtZUluZm8gPSBHbG9iYWwuR2FtZURhdGEuZ2V0R2FtZUluZm8oR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuQ3VycmVudEdhbWUpXHJcbiAgICAgICAgICAgIC8vICAgICBpZiAodG1wR2FtZUluZm8gJiYgdG1wR2FtZUluZm8ubmF0aXZlX3ZlcnNpb24pIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBpZihtc2cmJm1zZy52ZXJzaW9uKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgbGV0IGNoZWNrdmVyc2lvbiA9IEdsb2JhbC5Ub29sa2l0LnZlcnNpb25Db21wYXJlKHRtcEdhbWVJbmZvLm5hdGl2ZV92ZXJzaW9uLCBtc2cudmVyc2lvbilcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgaWYgKGNoZWNrdmVyc2lvbiA8IDApIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmKEdsb2JhbC5TZXR0aW5nLm5lZWRIYWxsQ2hvb3NlUm9vbSlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVG9vbGtpdC50cmFuc21pdEhhbGxUaXAoXCLor6XmuLjmiI/mnInmnIDmlrDniYjmnKzvvIzor7fpgIDlh7rlpKfljoXmm7TmlrDvvIFbLTFdXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Zhc3RUaXBzRXJyb3IoR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuQ3VycmVudEdhbWUsXCLor6XmuLjmiI/mnInmnIDmlrDniYjmnKzvvIzor7fpgIDlh7rlpKfljoXmm7TmlrDvvIFcIiwtMSlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vR2xvYmFsLlVJLmZhc3RUaXAoXCLmgqjnmoTmuLjmiI/kuI3mmK/mnIDmlrDniYjmnKzvvIzor7fph43mlrDlkK/liqjmuLjmiI/mm7TmlrDoh7PmnIDmlrDniYjmnKzvvIFcIilcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9GT1JDRV9MRUFWRV9HQU1FKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5GT1JDRV9ISURFX1dBSVRJTkcpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgaWYocGFyYW0uc2VxICE9IHRoaXMuc2VxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNlcSA9IDBcclxuICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcuVXJscy5nYW1lTW9kcyA9IG1vZHM7XHJcbiAgICAgICAgICAgIC8v5LuO5aSa5LiqbW9k5Lit6ZqP5py65LiA5LiqXHJcbiAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzLmdldFJhbmRNb2QobW9kcyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY29ubmVjdEZ1bmMgPSAobW9kKT0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHNlcnZlclJvdXRlLCBtb2QpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLy/lpITnkIZsb2NrZXJcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMucGFyc2VMb2NrZXIobXNnLCBnbHYsIGdzYywgY29ubmVjdEZ1bmMpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihyZXN1bHQucmVzdWx0IDwgMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkZPUkNFX0hJREVfV0FJVElORyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihyZXN1bHQucmVzdWx0ID09IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1vZCA9IHJlc3VsdC5tb2Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbm5lY3RGdW5jKG1vZCk7XHJcbiAgICAgICAgICAgIC8vIGlmKGNhbGxiYWNrICE9IG51bGwpXHJcbiAgICAgICAgICAgIC8vICAgICBjYWxsYmFjayhzZXJ2ZXJSb3V0ZSwgbW9kKTtcclxuICAgICAgICB9LCBcclxuICAgICAgICAobXNnOmFueSk9PntcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0TG9jayA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BDb25uZWN0TG9ja1RpbWVyKCk7XHJcbiAgICAgICAgICAgIGlmKG9uRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXQgPSBvbkVycm9yKG1zZykgfHwgZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfRk9SQ0VfTEVBVkVfR0FNRSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX0ZPUkNFX0xFQVZFX0dBTUUpOyAgICAgIC8vIGRlYnVnIOa4uOaIj+W8uuWItuemu+W8gOaXtuS8muaKinNjZW5l5YiH5YiwaGFsbCwg5YWI5omn6KGM55qE6K+dLCBzaG93RmFzdFRpcHNFcnJvcumHjOeahOWIpOaWreS8muWkseaViFxyXG4gICAgICAgICAgICAgICAgaWYobXNnLl9lcnJzdHIgJiYgbXNnLl9lcnJzdHIgIT0gXCJcIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dGYXN0VGlwc0Vycm9yKGdpZCwgbXNnLl9lcnJzdHIsIG1zZy5fZXJybm8pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHNob3dXYWl0aW5nKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd0Zhc3RUaXBzRXJyb3IoZ2lkLCBtc2csIGVyck5vLCBjaGVja1R5cGUgPSAxKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFHbG9iYWwuU2NlbmVNYW5hZ2VyLmluR2FtZSgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoZXJyTm8gPT0gMjAwMilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoR2xvYmFsLlNldHRpbmcubmVlZEhhbGxDaG9vc2VSb29tKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5Ub29sa2l0LnRyYW5zbWl0SGFsbE1zZyhtc2csKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRSZWNoYXJnZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVG9vbGtpdC5zaG93TW9uZXlOb3RFbm91Z2goKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKEdsb2JhbC5TZXR0aW5nLm5lZWRIYWxsQ2hvb3NlUm9vbSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVG9vbGtpdC50cmFuc21pdEhhbGxUaXAobXNnK1wiW1wiK2Vyck5vK1wiXVwiIHx8IFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKG1zZytcIltcIitlcnJObytcIl1cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGdhbWVJbmZvID0gR2xvYmFsLkdhbWVEYXRhLmdldEdhbWVJbmZvKGdpZCk7XHJcbiAgICAgICAgbGV0IGNoZWNrQXJyYXkgPSBjaGVja1R5cGUgPT0gMSA/IGdhbWVJbmZvLmxldmVscyA6IGdhbWVJbmZvLnJ1bGVzO1xyXG4gICAgICAgIGlmKGNoZWNrQXJyYXkgIT0gbnVsbCAmJiBjaGVja0FycmF5Lmxlbmd0aCA9PSAxICYmICFnYW1lSW5mby5oYXNDaG9vc2VMZXZlbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5Ub29sa2l0LnRyYW5zbWl0SGFsbFRpcChtc2cgfHwgXCJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGVyck5vID09IDIwMDIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKEdsb2JhbC5TZXR0aW5nLm5lZWRIYWxsQ2hvb3NlUm9vbSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVG9vbGtpdC50cmFuc21pdEhhbGxNc2cobXNnLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kUmVjaGFyZ2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlRvb2xraXQuc2hvd01vbmV5Tm90RW5vdWdoKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihHbG9iYWwuU2V0dGluZy5uZWVkSGFsbENob29zZVJvb20pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlRvb2xraXQudHJhbnNtaXRIYWxsVGlwKG1zZytcIltcIitlcnJObytcIl1cIiB8fCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChtc2crXCJbXCIrZXJyTm8rXCJdXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5piv5ZCm5pyJ6YCJ5Zy6XHJcbiAgICBwcml2YXRlIG5lZWRDaG9vc2VMZXZlbChnaWQsIGNoZWNrVHlwZSA9IDEpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGdhbWVJbmZvID0gR2xvYmFsLkdhbWVEYXRhLmdldEdhbWVJbmZvKGdpZCk7XHJcbiAgICAgICAgbGV0IGNoZWNrQXJyYXkgPSBjaGVja1R5cGUgPT0gMSA/IGdhbWVJbmZvLmxldmVscyA6IGdhbWVJbmZvLnJ1bGVzO1xyXG4gICAgICAgIHJldHVybiBjaGVja0FycmF5ICYmIGNoZWNrQXJyYXkubGVuZ3RoID4gMTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFNlcnZlclJvdXRlKHNlcnZlclJvdXRlczpTZXJ2ZXJSb3V0ZXMpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHNlcnZlclJvdXRlID0gc2VydmVyUm91dGVzLmdldFJhbmRSb3V0ZSgpO1xyXG4gICAgICAgIGlmKHNlcnZlclJvdXRlICE9IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBzZXJ2ZXJSb3V0ZTtcclxuICAgICAgICAvL+WmguaenOWPluS4jeWIsOa4uOaIjyAg5bCx55u05o6l5L2/55So5aSn5Y6F6ZO+5o6l5Zyw5Z2AXHJcbiAgICAgICAgc2VydmVyUm91dGUgPSBHbG9iYWwuU2V0dGluZy5VcmxzLmhhbGxSb3V0ZXMuZ2V0Q3VyUm91dGUoKTtcclxuICAgICAgICByZXR1cm4gc2VydmVyUm91dGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkdhbWVTb2NrZXRPcGVuKClcclxuICAgIHtcclxuICAgICAgICBpZihHbG9iYWwuU2NlbmVNYW5hZ2VyLmluR2FtZSgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwib25HYW1lU29ja2V0T3BlbiB0cnlTZW5kRW50ZXJcIik7XHJcbiAgICAgICAgICAgIGlmKEdhbWUuU2VydmVyLmlzUnVubmluZykgIC8v5oCA55aRc29ja2V05YWz6Zet5LiN5piv5ZCM5q2l77yM5pyJ5qaC546H5Ye6546wc2h1dGRvd27kuYvlkI7ov5jog73lj5HpgIFlbnRlcu+8jOWvvOiHtGx26K6+572u6ZSZ6K+vXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyeVNlbmRFbnRlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmNvbm5lY3RDb21wbGV0ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdENvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdENvbXBsZXRlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkdhbWVTb2NrZXRFcnJvcigpXHJcbiAgICB7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkhJREVfTkVUX1dBSVRJTkcsIFwiZW50ZXJHYW1lXCIpXHJcbiAgICAgICAgdGhpcy5zdG9wQ2hlY2tNc2dUaW1lcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UmFuZE1vZChtb2RzKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBsZW5ndGggPSBtb2RzLmxlbmd0aDtcclxuICAgICAgICBpZihsZW5ndGggPT0gMSlcclxuICAgICAgICAgICAgcmV0dXJuIG1vZHNbMF07XHJcbiAgICAgICAgbGV0IHJhbmRJbmRleCA9IEdsb2JhbC5Ub29sa2l0LmdldFJvdW5kSW50ZWdlcihsZW5ndGgsIDApO1xyXG4gICAgICAgIHJldHVybiBtb2RzW3JhbmRJbmRleF07XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgcGFyc2VMb2NrZXIobXNnLCBnbHYsIGdzYywgY2FsbGJhY2s6RnVuY3Rpb24gPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSAwXHJcbiAgICAgICAgbGV0IG1vZCA9IFwiXCJcclxuICAgICAgICBpZiAobXNnLmxvY2tlcikgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgbG9jayA9IG1zZy5sb2NrZXI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY3VyR2lkICE9IGxvY2suX2dpZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5TRVJWRVJfTE9DSztcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5GT1JDRV9ISURFX1dBSVRJTkcpXHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyID0gR2xvYmFsLkdhbWVEYXRhLmdldFJldHVybkdhbWVTdHIobG9jay5fZ2lkLCBsb2NrLl9nbHYsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93WWVzTm9Cb3goc3RyLCAoKT0+ICAgICAgICAvLyDot6jlnLrmma/mmoLml7bkuI3kvZznm7TmjqXot7PovaxcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy/muLjmiI/kuK3nrKzkuIDniYjlhYjlm57lpKfljoUgIOS4jemcgOimgemHjei/nlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ29Ub0dhbWVCeUxvY2tlcihtc2cubG9ja2VyKVxyXG4gICAgICAgICAgICAgICAgfSwgKCk9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKEdsb2JhbC5TY2VuZU1hbmFnZXIuaW5HYW1lKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX0ZPUkNFX0xFQVZFX0dBTUUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxvY2sgPSBtc2cubG9ja2VyO1xyXG4gICAgICAgICAgICAgICAgLy/nm7jlkIzmuLjmiI/vvIznm7jlkIzlnLrmrKHvvIznm7TmjqXov5vlhaVcclxuICAgICAgICAgICAgICAgIGlmKGxvY2suX2dzYyA9PSBnc2MgJiYgbG9jay5fZ2x2ID09IGdsdilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3NjID0gbG9jay5fZ3NjO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2x2ID0gbG9jay5fZ2x2O1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWUuU2VydmVyLnNldERzdChsb2NrLl9ndCwgbG9jay5fY2hhaXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZCA9IGxvY2suX3N2cl90ICsgXCIuXCIgKyBsb2NrLl9zdnJfaWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+ebuOWQjOa4uOaIj++8jOS4jeWQjOWcuuasoSAg5by55o+Q56S65qGGXHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkZPUkNFX0hJREVfV0FJVElORylcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RyID0gR2xvYmFsLkdhbWVEYXRhLmdldFJldHVybkdhbWVTdHIobG9jay5fZ2lkLCBsb2NrLl9nbHYsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93WWVzTm9Cb3goc3RyLCAoKT0+XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nc2MgPSBsb2NrLl9nc2M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdsdiA9IGxvY2suX2dsdjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWUuU2VydmVyLnNldERzdChsb2NrLl9ndCwgbG9jay5fY2hhaXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kID0gbG9jay5fc3ZyX3QgKyBcIi5cIiArIGxvY2suX3N2cl9pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG1vZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihHbG9iYWwuU2NlbmVNYW5hZ2VyLmluR2FtZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfRk9SQ0VfTEVBVkVfR0FNRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLklOX09USEVSX0xFVkVMO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7cmVzdWx0OnJlc3VsdCwgbW9kOm1vZH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tRdWVyeVN0YXRlKGdpZCAsY29tcGxldGUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoR2FtZS5EYXRhQnJpZGdlLmxvY2tlciA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgbGV0IGxvY2tlciA9IEdhbWUuRGF0YUJyaWRnZS5sb2NrZXI7XHJcbiAgICAgICAgR2FtZS5EYXRhQnJpZGdlLmxvY2tlciA9IG51bGw7XHJcbiAgICAgICAgaWYobG9ja2VyLl9naWQgIT0gZ2lkKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb25ubmVjdEFuZEVudGVyR2FtZUluTGV2ZWxTY2VuZShnaWQsIGxvY2tlci5fZ2x2LCBsb2NrZXIuX2dzYywgbG9ja2VyLCBjb21wbGV0ZSlcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WFs+mXrea4uOaIj+e7n+S4gOWFpeWPo1xyXG4gICAgcHVibGljIHNodXREb3duKGNsZWFuSGFuZGVyID0gdHJ1ZSlcclxuICAgIHtcclxuICAgICAgICBHYW1lLlNlcnZlci5zdG9wKCk7XHJcbiAgICAgICAgR2FtZS5Ud2Vlbi5jbGVhcigpO1xyXG4gICAgICAgIEdhbWUuQ29tcG9uZW50LnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICB0aGlzLmdzYyA9IFwiZGVmYXVsdFwiO1xyXG4gICAgICAgIHRoaXMuZ2x2ID0gXCJsMFwiO1xyXG4gICAgICAgIHRoaXMuY3VyR2lkID0gMDtcclxuICAgICAgICB0aGlzLmlzTGFiYUdhbWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0b3BDaGVja01zZ1RpbWVyKCk7XHJcbiAgICAgICAgdGhpcy5lbnRlckRhdGEgPSBudWxsO1xyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNldFNlc3Npb24obnVsbCk7XHJcbiAgICAgICAgaWYoY2xlYW5IYW5kZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lLlNlcnZlci5jbGVhckhhbmRsZXJzKCk7XHJcbiAgICAgICAgICAgIC8vIGRlYnVnIOi/memHjOa4heeQhuS8muWvvOiHtOW+iOWkmuWIh+WcuuaZr+aDheWGtUdhbWUuRW50cnnkuLpudWxs6LCD55So55qE5oql6ZSZIOaUvuWIsOWtkOa4uOaIj+mpseWKqOWZqGRlc3Rvcnnml7bmuIXnkIZcclxuICAgICAgICAgICAgLy8gR2FtZS5FbnRyeSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ29Ub0dhbWVCeUxvY2tlcihsb2NrZXIpe1xyXG4gICAgICAgIGlmKGxvY2tlciA9PSBudWxsIHx8IGxvY2tlci5yZXQgIT0gMSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBnaWQgPSBsb2NrZXIuX2dpZFxyXG5cclxuICAgICAgICBsZXQgZ2FtZUlEID0gZ2lkO1xyXG4gICAgICAgIGlmKEdhbWUuQ29udHJvbC5HQU1FX0REWl9ISl9BUlIuaW5kZXhPZihnYW1lSUQpID49IDApe1xyXG4gICAgICAgICAgICAvL+aWl+WcsOS4u+WQiOmbhlxyXG4gICAgICAgICAgICBnYW1lSUQgPSBHYW1lLkNvbnRyb2wuR0FNRV9ERFpfSEpfQVJSWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihHbG9iYWwuU2NlbmVNYW5hZ2VyLmluR2FtZSgpKXtcclxuICAgICAgICAgICAgbGV0IG9sZEdpZCA9IEdhbWUuQ29udHJvbC5jdXJHaWQ7XHJcbiAgICAgICAgICAgIEdhbWUuQ29udHJvbC5zaHV0RG93bih0cnVlKTsgICAgICAgICAgICAvLyDov5nph4zkvJrmuIXnkIZjdXJHaWRcclxuICAgICAgICAgICAgR2FtZS5Ud2Vlbi5jbGVhcigpO1xyXG4gICAgICAgICAgICBHYW1lLkNvbXBvbmVudC51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5Db21wb25lbnQudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoIUdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLmNoZWNrSXNHYW1lRG93bmxvYWQoZ2FtZUlEKSAmJiBjYy5zeXMuaXNOYXRpdmUpe1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLmnKrkuIvovb3muLjmiI9cIik7XHJcbiAgICAgICAgICAgICAgICAvLyBHYW1lLkRhdGFCcmlkZ2UubG9ja2VyID0gbG9ja2VyO1xyXG4gICAgICAgICAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX0ZPUkNFX0xFQVZFX0dBTUUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlNjZW5lTWFuYWdlci5nb1RvSGFsbCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5rKh5pyJ5pu05paw5ri45oiPXHJcbiAgICAgICAgICAgIGlmKCFHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5jaGVja0lzR2FtZU5ld2VzdChnYW1lSUQpICYmIGNjLnN5cy5pc05hdGl2ZSl7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuivpea4uOaIj+acieacgOaWsOeJiOacrFwiKTtcclxuICAgICAgICAgICAgICAgIC8vIEdhbWUuRGF0YUJyaWRnZS5sb2NrZXIgPSBsb2NrZXI7XHJcbiAgICAgICAgICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfRk9SQ0VfTEVBVkVfR0FNRSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuU2NlbmVNYW5hZ2VyLmdvVG9IYWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBnYW1lRGF0YSA9IEdsb2JhbC5HYW1lRGF0YS5nZXRHYW1lSW5mbyhvbGRHaWQpO1xyXG4gICAgICAgICAgICBpZiAoZ2FtZURhdGEucG9ydHJhaXRNb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmNoYW5nZU9yaWVudGF0aW9uSCh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBHYW1lLkNvbnRyb2wuZ2x2ID0gbG9ja2VyLl9nbHY7XHJcbiAgICAgICAgICAgIEdhbWUuQ29udHJvbC5jdXJMdiA9IGxvY2tlci5fZ2x2O1xyXG4gICAgICAgICAgICBHYW1lLkNvbnRyb2wuY3VyR2lkID0gZ2lkO1xyXG4gICAgICAgICAgICBHbG9iYWwuU2NlbmVNYW5hZ2VyLnN3aXRjaEdhbWVTY2VuZShnYW1lSUQpOyAgICAgICAvLyDliIfmjaLmuLjmiI/lnLrmma9cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYoIUdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLmNoZWNrSXNHYW1lRG93bmxvYWQoZ2FtZUlEKSAmJiBjYy5zeXMuaXNOYXRpdmUpe1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLmnKrkuIvovb3muLjmiI9cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/msqHmnInmm7TmlrDmuLjmiI9cclxuICAgICAgICAgICAgaWYoIUdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLmNoZWNrSXNHYW1lTmV3ZXN0KGdhbWVJRCkgJiYgY2Muc3lzLmlzTmF0aXZlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuQ3VycmVudEdhbWUgPSBnYW1lSUQ7XHJcbiAgICAgICAgICAgIGxldCBnYW1lRGF0YSA9IEdsb2JhbC5HYW1lRGF0YS5nZXRHYW1lSW5mbyhnYW1lSUQpO1xyXG4gICAgICAgICAgICBpZihnYW1lRGF0YS5sZXZlbFR5cGUgPT0gMSlcclxuICAgICAgICAgICAgICAgIEdhbWUuQ29udHJvbC5jb25ubmVjdEFuZEVudGVyR2FtZShnYW1lRGF0YS5nYW1lX2lkLCBsb2NrZXIuX2dsdiwgbG9ja2VyLl9nc2MsIGxvY2tlcilcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1ckdpZCA9IGdpZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyTHYgPSBsb2NrZXIuX2dsdiBcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5TY2VuZU1hbmFnZXIubG9hZEdhbWVTY2VuZSgpO1xyXG4gICAgICAgICAgICAgICAgR2FtZS5EYXRhQnJpZGdlLmxvY2tlciA9IGxvY2tlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=