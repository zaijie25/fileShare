"use strict";
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