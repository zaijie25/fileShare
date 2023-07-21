import { NetAppface } from "../net/hall/NetEvent";
import SessionHandler from "./handlers/SessionHandler";
import ServerRoutes from "../setting/ServerRoutes";
import PvpWaitMatchHandler from "./handlers/PvpWaitMatchHandler";

//主要负责游戏进出
export default class GameControl
{
    //服务器返回的route错误
    public SERVER_ROUTE_ERROR = -1;
    //正在别的游戏 并且和选中游戏的gid不同
    public SERVER_LOCK = -2;
    //服务器没有返回MOD
    public NO_MOD = -3;
    //相同gid,在别的场次
    public IN_OTHER_LEVEL = -4;

    /**
     * 用于限制短时间内快速请求 getgameroute
     */
    private seq = 0

    //斗地主合集中的gameid
    public GAME_DDZ_HJ_ARR = [20001];

    private gsc = "default";
    private glv = "l0";
    private timeId:any = -1;
    public curGid = 0;
    public curLv = "l0";

    public enterData:any

    //开始http请求 到请求成功
    private connectLock = false;
    private connectLockTimer:any = -1;
    //socket连接成功  进场景之前
    private enterSceneLock = false;
    private enterSceneLockTimer:any = -1;

    public callEnterFunc:Function = this.sendEnter.bind(this);

    private connectComplete:Function;

    private isLabaGame: boolean = false;

    public setup()
    {
        Game.Event.on(Game.EVENT_SOCKET_OPEN, this, this.onGameSocketOpen)
        Game.Event.on(Game.EVENT_SOCKET_ERROR, this, this.onGameSocketError)
    }

    public setGlvAndGsc(glv = "l0", gsc = "default")
    {
        this.glv = glv;
        this.gsc = gsc;
    }

    public setSession(session)
    {
        Game.Server.setDst(session._para._gt, session._para._chair);
        //收到Session后 发送心跳
        Game.Server.sendHeartBeat();      
    }


    private sendEnter(gid,  glv ,gsc, extraMap = null)
    {
        Game.Server.passSSSAndEnter();
        let enterData = Game.Server.getSendParam(Game.Command.Enter)
        enterData._param._para = {_gid : gid};
        enterData._param._para._gsc = gsc; 
        enterData._param._para._glv = glv;
        if(extraMap)
        {
            for(let k in extraMap)
            {
                enterData._param._para[k] = extraMap[k];
            }
        }
        this.enterData = enterData;
        Game.Server.sendDirect(enterData)
    }

    //设置context  需要在进游戏之前设置
    public setContext(context:any)
    {
        Game.Context = context;
        this.registDefaultHandler();
    }

    public registDefaultHandler()
    {
        Game.Server.registDefaultHandler(Game.Command.Session, new SessionHandler);
        Game.Server.registDefaultHandler(Game.Command.WaitMatch, new PvpWaitMatchHandler);
    }

    public registHandler(key:any, handler:any)
    {
        Game.Server.registHandler(key, handler);
    }

    public unregistHandler(key:any) {
        Game.Server.unregistHandler(key);
    }

    public connectGame(serverInfo, mod, onComplete?, pbmode = false, useFunc = true)
    {
        if(Game.Server.isRunning)
        {
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "enterGame")
            return;
        }
        Game.Server.run()
        //链接服务器
        Game.Server.connect(serverInfo, mod, pbmode, useFunc);

        this.connectComplete = onComplete;
    }


    public trySendEnter(extraParamMap = null)
    {
        if (!this.isLabaGame){      // 非拉霸类socket发enter
            if(this.callEnterFunc == null)
                this.callEnterFunc = this.sendEnter.bind(this);
            this.callEnterFunc(this.curGid, this.glv, this.gsc, extraParamMap);
            this.startCheckMsgTimer();
        }
    }

    private startCheckMsgTimer()
    {
        //Global.Component跨场景会有问题 需要使用setTimeout
        //@todo 提供常驻组件  
        this.stopCheckMsgTimer();
        this.timeId = setTimeout(this.onMsgTimeOut.bind(this), Global.Setting.enterTimeout * 1000)
    }

    public stopCheckMsgTimer()
    {
        if(this.timeId != -1)
        {
            clearTimeout(this.timeId);
            this.timeId = -1;
        }
    }

    private onMsgTimeOut()
    {
        Game.Server.stopGame();
        let errFunc = ()=>{Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);}
        Global.UI.showSingleBox("网络连接异常，请稍后再试", errFunc, errFunc);
    }


    //对于非选场类游戏 在大厅请求数据和链接socket
    public connnectAndEnterGame(gid, glv = "l0", gsc = "default", locker?:any, pbMode = false,showWaiting = false)
    {
        this.getGameServerInfo(gid, (serverRoute, mod)=>
        {
            this.connectGame(serverRoute, mod, ()=>
            {
                Global.HotUpdateManager.CurrentGame = gid;
                this.enterSceneLock = true;
                this.startEnterSceneLockTimer()
                Global.SceneManager.loadGameScene();
            }, pbMode)
        },null, glv, gsc, locker, false);
    }

    
    //对于选场类游戏 在大厅请求数据和链接socket
    public connnectAndEnterGameInLevelScene(gid, glv = "l0", gsc = "default", 
                                            locker?:any, onComplete?:Function, 
                                            pbMode = false, showWaiting = false)
    {
        showWaiting = this.needChooseLevel(gid);
        this.getGameServerInfo(gid, (serverRoute, mod)=>
        {

            this.connectGame(serverRoute, mod, ()=>
            {
                if(onComplete)
                    onComplete();
            }, pbMode)
        },null, glv, gsc, locker, false);
    }

    public connnectLabaGameServer(gid, glv = "l0", gsc = "default", locker?:any, pbMode = false,showWaiting = false)
    {
        this.getGameServerInfo(gid, (serverRoute, mod)=>{
            this.isLabaGame = true;
            this.connectGame(serverRoute, mod, ()=>
            {
                Global.HotUpdateManager.CurrentGame = gid;
                this.enterSceneLock = true;
                this.startEnterSceneLockTimer()
                Global.SceneManager.loadGameScene();
                Game.Event.event(Game.EVENT_LABA_CONNECT);
            }, pbMode, false);
        },null, glv, gsc, locker, false);
    }


    /**
     * 获取捕鱼游戏服务器完整socket地址
     * @param gid 游戏id
     * @param callback (url:string)=>void   返回socket完整地址
     * @param glv 选场信息
     * @param gsc 默认值
     * @param locker null
     */
    public getFishServerInfo(gid:number, callback:(url:string)=>void, glv = "l0", gsc = "default", locker?:any)
    {
        if(this.connectLock || this.enterSceneLock)
        {
            return;
        }
        this.seq ++
        this.connectLock = true;
        this.startConnectLockTimer();
        this.glv = glv;
        this.gsc = this.getRule(gid, glv);
        this.curGid = gid;
        let param:any = {}
        param.glv = glv;
        param.gsc = gsc;
        param.gid = gid;
        param.locker = locker
        param.seq = this.seq
        param.game_skin = Global.Setting.SystemInfo.gameSkin;
        param.app_version = Global.Setting.SystemInfo.appVersion //20200323Grace 新增字段
        param.device = Global.Toolkit.genDeviceInfo();
        let megeServerFlag = Global.Toolkit.checkMegeServer()
        
        if(megeServerFlag)
        {
            param.old_app_id = parseInt(Global.Setting.SystemInfo.appID)
        }

        if(locker && locker._gid)
        {
            Game.Server.setDst(locker._gt, locker._chair);
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.GetGameRoute, param,(msg)=>
        {
            this.connectLock = false;
            this.stopConnectLockTimer();
            
            if (!CC_PREVIEW) {
                let tmpGameInfo = Global.GameData.getGameInfo(Global.HotUpdateManager.CurrentGame)
                if (tmpGameInfo && tmpGameInfo.native_version) {
                    if(msg&&msg.version)
                    {
                        let checkversion = Global.Toolkit.versionCompare(tmpGameInfo.native_version, msg.version)
                        if (checkversion < 0) {
                            if(Global.Setting.needHallChooseRoom)
                            {
                                Global.Toolkit.transmitHallTip("您的游戏不是最新版本，请重新启动游戏更新至最新版本！[-1]");
                            }
                            else
                            {
                                this.showFastTipsError(Global.HotUpdateManager.CurrentGame,"您的游戏不是最新版本，请重新启动游戏更新至最新版本！",-1)
                            }
                            Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);
                            Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
                            return
                        }
                    }
                }
            }
            if(param.seq != this.seq)
            {
                return
            }
            this.seq = 0
            let serverRoutes = new ServerRoutes();
            let routes = msg.routes;
            serverRoutes.parse(routes);
            //获取服务器信息
            Global.Setting.Urls.gameRoutes = serverRoutes;

            let mods = msg.mods;
            Global.Setting.Urls.gameMods = mods;
            if(mods == null || mods.length == 0)
            {
                let errStr = "服务器正在维护中，请稍后再试";
                this.showFastTipsError(gid, errStr, -1)
                Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
                return;
            }

            //处理locker
            let result = this.parseLocker(msg, glv, gsc);
            let mod = null;
            if(result.result < 0)
            {
                Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
                return;
            }
            else if(result.result == 1)
            {
                mod = result.mod;
            }

            let [pbUrl] = this.getRandomFishServerInfo(mod);
            if(callback != null)
                callback(pbUrl);
        }, (msg)=>{
            this.connectLock = false
            this.stopConnectLockTimer();
            return Global.HallServer.tryHandleError(msg);
        }, true)
    }

    public getRandomFishServerInfo(_mod?: any){
        let serverRoute = this.getServerRoute(Global.Setting.Urls.gameRoutes);
        let mod = this.getRandMod(Global.Setting.Urls.gameMods);
        if (_mod){
            mod = _mod;
        }
        let pbUrl = serverRoute.getPbSocketUrl(mod);
        pbUrl = Game.Server.getSocketUrl(pbUrl, true);
        let reqUrl = Global.UrlUtil.dealWebSocketUrl(pbUrl)
        return [reqUrl, mod];
    }

    private startConnectLockTimer()
    {
        this.stopConnectLockTimer();
        this.connectLockTimer = setTimeout(()=>{
            this.connectLock = false;
        }, 3000)
    }

    private stopConnectLockTimer()
    {
        if(this.connectLockTimer != -1)
        {
            clearTimeout(this.connectLockTimer)
            this.connectLockTimer = -1;
        }
    }

    private startEnterSceneLockTimer()
    {
        this.stopEnterSceneLockTimer();
        this.enterSceneLockTimer = setTimeout(()=>{
            this.enterSceneLock = false;
        }, 2000)
    }

    private stopEnterSceneLockTimer()
    {
        if(this.enterSceneLockTimer != -1)
        {
            clearTimeout(this.enterSceneLockTimer)
            this.enterSceneLockTimer = -1;
        }
    }


    private getRule(gid, glv)
    {
        let data = Global.GameData.getGameInfo(gid);
        if(data == null || data.levels == null)
        {
            Logger.error("找不到gid:" + gid);
            return "default";
        }
        for(let i = 0; i < data.levels.length; i++)
        {
            if(data.levels[i].level == glv)
                return data.levels[i].rule || "default";
        }
        return "default"
    }


    //获取游戏信息
    public getGameServerInfo(gid:number, callback:Function, onError:Function, glv = "l0", gsc = "default", locker?:any, showWaiting = false)
    {
        if(this.connectLock || this.enterSceneLock)
        {
            return;
        }
        this.seq++
        gsc = this.getRule(gid, glv);
        this.connectLock = true;
        this.startConnectLockTimer();
        this.glv = glv;
        this.gsc = gsc;
        this.curGid = gid;
        let param:any = {}
        param.seq = this.seq
        param.glv = glv;
        param.gsc = gsc;
        param.gid = gid;
        param.game_skin = Global.Setting.SystemInfo.gameSkin;
        param.locker = locker
        param.app_version = Global.Setting.SystemInfo.appVersion //20200323Grace 新增字段
        param.device = Global.Toolkit.genDeviceInfo();
        let megeServerFlag = Global.Toolkit.checkMegeServer()
        if(megeServerFlag)
        {
            param.old_app_id = parseInt(Global.Setting.SystemInfo.appID)
        }
        if(locker && locker._gid)
        {
            Game.Server.setDst(locker._gt, locker._chair);
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.GetGameRoute, param,(msg)=>
        {
            this.connectLock = false;
            this.stopConnectLockTimer();
            //获取服务器信息
            let serverRoutes = new ServerRoutes();
            serverRoutes.parse(msg.routes)
            Global.Setting.Urls.gameRoutes = serverRoutes;
            
            let serverRoute = this.getServerRoute(serverRoutes);

            //获取mod
            let mods = msg.mods;

            if(mods == null || mods.length == 0)
            {
                let errStr = "服务器正在维护中，请稍后再试";
                if(onError) {
                    onError( { _errstr:errStr } );
                }
                else
                {
                    this.showFastTipsError(gid, errStr, -1)
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
            if(param.seq != this.seq)
            {
                return
            }
            this.seq = 0
            Global.Setting.Urls.gameMods = mods;
            //从多个mod中随机一个
            let mod = this.getRandMod(mods);

            let connectFunc = (mod)=>
            {
                if(callback)
                    callback(serverRoute, mod);
            }


            //处理locker
            let result = this.parseLocker(msg, glv, gsc, connectFunc);
           
            if(result.result < 0)
            {
                Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
                return;
            }
            else if(result.result == 1)
            {
                mod = result.mod;
            }
            
            connectFunc(mod);
            // if(callback != null)
            //     callback(serverRoute, mod);
        }, 
        (msg:any)=>{
            this.connectLock = false;
            this.stopConnectLockTimer();
            if(onError) {
                let ret = onError(msg) || false;
                Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);
                return ret;
            }
            else {
                Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);      // debug 游戏强制离开时会把scene切到hall, 先执行的话, showFastTipsError里的判断会失效
                if(msg._errstr && msg._errstr != "")
                {
                    this.showFastTipsError(gid, msg._errstr, msg._errno)
                }
               
                return false;
             }
        }, showWaiting)
    }

    private showFastTipsError(gid, msg, errNo, checkType = 1)
    {
        if(!Global.SceneManager.inGame())
        {
            if(errNo == 2002)
            {
                if(Global.Setting.needHallChooseRoom)
                {
                    Global.Toolkit.transmitHallMsg(msg,()=>{
                        Global.UI.show("WndRecharge");
                    });
                }
                else
                {
                    Global.Toolkit.showMoneyNotEnough();
                }
            }
            else
            {
                if(Global.Setting.needHallChooseRoom)
                {
                    Global.Toolkit.transmitHallTip(msg+"["+errNo+"]" || "");
                }
                else
                {
                    Global.UI.fastTip(msg+"["+errNo+"]");
                }
               
            }
            return;
        }
        let gameInfo = Global.GameData.getGameInfo(gid);
        let checkArray = checkType == 1 ? gameInfo.levels : gameInfo.rules;
        if(checkArray != null && checkArray.length == 1 && !gameInfo.hasChooseLevel)
        {
            Global.Toolkit.transmitHallTip(msg || "");
        }
        else
        {
            if(errNo == 2002)
            {
                if(Global.Setting.needHallChooseRoom)
                {
                    Global.Toolkit.transmitHallMsg(msg,()=>{
                        Global.UI.show("WndRecharge");
                    });
                }
                else
                {
                    Global.Toolkit.showMoneyNotEnough();
                }
            }
            else
            {
                if(Global.Setting.needHallChooseRoom)
                {
                    Global.Toolkit.transmitHallTip(msg+"["+errNo+"]" || "");
                }
                else
                {
                    Global.UI.fastTip(msg+"["+errNo+"]");
                }
            }
        }
    }

    //是否有选场
    private needChooseLevel(gid, checkType = 1)
    {
        let gameInfo = Global.GameData.getGameInfo(gid);
        let checkArray = checkType == 1 ? gameInfo.levels : gameInfo.rules;
        return checkArray && checkArray.length > 1;
    }

    private getServerRoute(serverRoutes:ServerRoutes)
    {
        let serverRoute = serverRoutes.getRandRoute();
        if(serverRoute != null)
            return serverRoute;
        //如果取不到游戏  就直接使用大厅链接地址
        serverRoute = Global.Setting.Urls.hallRoutes.getCurRoute();
        return serverRoute;
    }

    private onGameSocketOpen()
    {
        if(Global.SceneManager.inGame())
        {
            Logger.error("onGameSocketOpen trySendEnter");
            if(Game.Server.isRunning)  //怀疑socket关闭不是同步，有概率出现shutdown之后还能发送enter，导致lv设置错误
                this.trySendEnter();
        }
        if(this.connectComplete)
        {
            this.connectComplete();
            this.connectComplete = null;
        }
    }

    private onGameSocketError()
    {
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "enterGame")
        this.stopCheckMsgTimer();
    }

    private getRandMod(mods)
    {
        let length = mods.length;
        if(length == 1)
            return mods[0];
        let randIndex = Global.Toolkit.getRoundInteger(length, 0);
        return mods[randIndex];
    }


    private parseLocker(msg, glv, gsc, callback:Function = null)
    {
        let result = 0
        let mod = ""
        if (msg.locker) 
        {
            let lock = msg.locker;
            if(this.curGid != lock._gid)
            {
                result = this.SERVER_LOCK;
                Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING)
                let str = Global.GameData.getReturnGameStr(lock._gid, lock._glv, false);
                Global.UI.showYesNoBox(str, ()=>        // 跨场景暂时不作直接跳转
                {

                    //游戏中第一版先回大厅  不需要重连
                    this.goToGameByLocker(msg.locker)
                }, ()=>
                {
                    if(Global.SceneManager.inGame()) {
                        Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);
                    }
                });
            }
            else
            {
                let lock = msg.locker;
                //相同游戏，相同场次，直接进入
                if(lock._gsc == gsc && lock._glv == glv)
                {
                    result = 1;
                    this.gsc = lock._gsc;
                    this.glv = lock._glv;
                    Game.Server.setDst(lock._gt, lock._chair);
                    mod = lock._svr_t + "." + lock._svr_id;
                }
                //相同游戏，不同场次  弹提示框
                else
                {
                    Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING)
                    let str = Global.GameData.getReturnGameStr(lock._gid, lock._glv, true);
                    Global.UI.showYesNoBox(str, ()=>
                    {
                        if(callback)
                        {
                            this.gsc = lock._gsc;
                            this.glv = lock._glv;
                            Game.Server.setDst(lock._gt, lock._chair);
                            mod = lock._svr_t + "." + lock._svr_id;
                            callback(mod);
                        }
                    }, ()=>{
                        if(Global.SceneManager.inGame()) {
                            Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);
                        }
                    });
                    result = this.IN_OTHER_LEVEL;
                }
            }
        }
        return {result:result, mod:mod}
    }

    public checkQueryState(gid ,complete)
    {
        if(Game.DataBridge.locker == null)
            return false;
        let locker = Game.DataBridge.locker;
        Game.DataBridge.locker = null;
        if(locker._gid != gid)
            return false;
        this.connnectAndEnterGameInLevelScene(gid, locker._glv, locker._gsc, locker, complete)
        return true;
    }

    //关闭游戏统一入口
    public shutDown(cleanHander = true)
    {
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
        if(cleanHander)
        {
            Game.Server.clearHandlers();
            // debug 这里清理会导致很多切场景情况Game.Entry为null调用的报错 放到子游戏驱动器destory时清理
            // Game.Entry = null;
        }
    }


    public goToGameByLocker(locker){
        if(locker == null || locker.ret != 1)
            return;
        let gid = locker._gid

        let gameID = gid;
        if(Game.Control.GAME_DDZ_HJ_ARR.indexOf(gameID) >= 0){
            //斗地主合集
            gameID = Game.Control.GAME_DDZ_HJ_ARR[0];
        }
        if(Global.SceneManager.inGame()){
            let oldGid = Game.Control.curGid;
            Game.Control.shutDown(true);            // 这里会清理curGid
            Game.Tween.clear();
            Game.Component.unscheduleAllCallbacks();
            Global.Component.unscheduleAllCallbacks();
            
            if(!Global.HotUpdateManager.checkIsGameDownload(gameID) && cc.sys.isNative){
                Global.UI.fastTip("未下载游戏");
                // Game.DataBridge.locker = locker;
                Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME, true);
                Global.SceneManager.goToHall();
                return;
            }
            //没有更新游戏
            if(!Global.HotUpdateManager.checkIsGameNewest(gameID) && cc.sys.isNative){
                Global.UI.fastTip("该游戏有最新版本");
                // Game.DataBridge.locker = locker;
                Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME, true);
                Global.SceneManager.goToHall();
            }
            
            let gameData = Global.GameData.getGameInfo(oldGid);
            if (gameData.portraitModel) {
                Global.NativeEvent.changeOrientationH(true);
            }
            Game.Control.glv = locker._glv;
            Game.Control.curLv = locker._glv;
            Game.Control.curGid = gid;
            Global.SceneManager.switchGameScene(gameID);       // 切换游戏场景
        }
        else{
            if(!Global.HotUpdateManager.checkIsGameDownload(gameID) && cc.sys.isNative){
                Global.UI.fastTip("未下载游戏");
                return;
            }
            //没有更新游戏
            if(!Global.HotUpdateManager.checkIsGameNewest(gameID) && cc.sys.isNative){
                return;
            }

            Global.HotUpdateManager.CurrentGame = gameID;
            let gameData = Global.GameData.getGameInfo(gameID);
            if(gameData.levelType == 1)
                Game.Control.connnectAndEnterGame(gameData.game_id, locker._glv, locker._gsc, locker)
            else {
                this.curGid = gid;
                this.curLv = locker._glv 
                Global.SceneManager.loadGameScene();
                Game.DataBridge.locker = locker;
            }
        }
    }
}
