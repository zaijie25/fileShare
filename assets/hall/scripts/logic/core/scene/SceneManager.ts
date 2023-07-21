import HallPopMsgHelper from "../../hall/tool/HallPopMsgHelper";
import { ReportTool } from "../tool/ReportTool";

const { ccclass, property } = cc._decorator;

export enum SceneType {
    None = 0,
    Login = 1,
    Hall = 2,
    Game = 3,
}

@ccclass
export default class SceneManager {
    public LOGIN_SCENE_ID = 1;
    public HALL_SCENE_ID = 2;
    public GAME_SCENE_ID = 3;
    public _sceneType: SceneType;

    private switchSceneTimer = null
    public setup() {
        this.sceneType = SceneType.None;
    }

    public inGame() {
        return this.sceneType == SceneType.Game;
    }

    public set sceneType(value){
        Logger.error("set sceneType from, to", SceneType[this._sceneType], SceneType[value]);
        this._sceneType = value;
    }

    public get sceneType(){
        return this._sceneType;
    }

    public goToLogin() {
        //注销账号管理器缓存数据清空
        Global.ModelManager.clear();
        //返回登录界面
        Global.UI.closeAllUIPrefab();
        HallPopMsgHelper.releaseInstance();

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
            if(cc.director.getScene() && cc.director.getScene().name != "LoadingScene")
                Global.UI.show("WndLogin");
        }
    }

    public goToHall() {
        if (this.sceneType == SceneType.Hall)
        {
            return;
        }
        Global.NativeJSBBridge.addClickGames("hall")
        Global.UI.closeAllUIPrefab();
        if (this.sceneType == SceneType.Game) {
            this.sceneType = SceneType.Hall;
            if (Global.Setting.isStartHotUpdate) {
                Global.SceneManager.onLoadHallScene();
            } else {
                Global.SceneManager.loadHallScene();
            }
        }
        else {
            this.sceneType = SceneType.Hall;
            Global.UI.show("WndHall"); 
            let data = Global.PlayerData;
            if(data.type !== 1)
            {
                Global.Audio.playAudioSource("hall/sound/inithall")
            }
            Global.UI.closeHallLoading();
        }
    }

    public onLoadHallScene() {
        if (this.sceneType == SceneType.Game) {
            this.sceneType = SceneType.Hall;
        }
        Global.UI.closeAllUIPrefab();
       
        let HotUpdateManager = Global.HotUpdateManager;
        let gameName = HotUpdateManager.updateHelper.gameType();
        let storagePath = HotUpdateManager.updateHelper.genStoragePath(gameName);
        Logger.log("onLoadHallScene -----------" + storagePath);
        // window.require(storagePath + '/src/dating.js')
        let curHallBundle = Global.customApp.getHallBundleName()
        if (curHallBundle){
            if (Global.ResourceManager.checkBundleValid(curHallBundle)){
                this.doLoadHallScene(null);
            }else {
                Global.customApp.loadHallBundle((error,bundle)=>{
                    if (error){
                        Logger.error("onLoadHallScene load hall bundle error " + error.message)
                        return;
                    }   
                    this.doLoadHallScene(null);
                })
            }
        }else {
            this.doLoadHallScene(null);
        }
        
        // this.releaseCurGameBundle()     // debug 放在外面子游戏退回到大厅会有一帧的页面虚化
        return;
    }

    public loadHallScene(cb?: Function) {
        if (this.sceneType == SceneType.Game) {
            this.sceneType = SceneType.Hall;
        }
        Logger.log("--------loadHallScene-------")
        Global.UI.closeAllUIPrefab();
        let curHallBundle = Global.customApp.getHallBundleName()
        if (curHallBundle){
            if (Global.ResourceManager.checkBundleValid(curHallBundle)){
                this.doLoadHallScene(cb);
            }else {
                Global.customApp.loadHallBundle((error,bundle)=>{
                    if (error){
                        Logger.error("onLoadHallScene load hall bundle error " + error.message)
                        return;
                    }   
                    this.doLoadHallScene(cb);
                })
            }
        }else {
            this.doLoadHallScene(cb);
        }
        
        
    }

    private doLoadHallScene(cb:Function){
        cc.director.loadScene('HallScene', () => {
            if (cb) {
                cb();
            }
            this.releaseCurGameBundle()
            this.adjustRedMiUI12()
        })
    }

    //适配小米10系列 MIUI12 Android11系统 进入大厅闪退
    private adjustRedMiUI12(){
        let phone_device_brand = Global.Setting.SystemInfo.deviceBrand
        let osVer = cc.sys.osVersion
        if (phone_device_brand && (phone_device_brand.toLowerCase() == "xiaomi") && (osVer == "11" || osVer == "11.0" || osVer == "11.0.0")){ // 小米Android系统11系列执行
            // Logger.error("adjustRedMiUI12 excute success +++++++++++++")
            let canvas = cc.find("Canvas")
            let camNode = canvas.getChildByName("CameraClearStencil")
            let camera = null
            if (!cc.isValid(camNode)){
                Logger.error("adjustRedMiUI12 camNode null")
                camNode = new cc.Node("CameraClearStencil")
                camera = camNode.addComponent(cc.Camera)
                canvas.addChild(camNode)
            }
            camNode.groupIndex = 1
            camera.clearFlags = cc.Camera.ClearFlags.DEPTH | cc.Camera.ClearFlags.STENCIL
            camera.depth = 10
            camera.cullingMask = 0
        }else {
            Logger.error("adjustRedMiUI12 excute failed +++++++++++++ phone_device_brand " + phone_device_brand + " osVersion = " + osVer)
        }
        
    }

    public releaseCurGameBundle(){
        let releaseHelper = Global.ResourceManager.releaseHelper
        let gameBundle = Global.ResourceManager.gameBundle
        releaseHelper.releaseBundle(gameBundle)
        Global.ResourceManager.gameBundle = ''
    }

    public loadGameScene(cb?: Function) {
        if (this.sceneType == SceneType.Game) {
            Logger.error("this.sceneType == SceneType.Game")
            return;
        }

        Global.UI.SetMessageBoxInGame(false);
        this.sceneType = SceneType.Game;
        //进游戏关闭大厅音乐
        Global.Audio.stopMusic();
        Global.UI.closeAllUIPrefab(true);
        Global.UI.RestorePersistNode()
        let HotUpdateManager = Global.HotUpdateManager;
        let currentGame = HotUpdateManager.CurrentGame;
        Global.ResourceManager.gameBundle = currentGame
        Global.NativeJSBBridge.addClickGames(currentGame.toString())
        this.setGameSearchPath(currentGame);
        Logger.log("----------------------------currentGame ====" + currentGame)
        let bundlePath = currentGame.toString()
        
        this.loadGameSceneByGid(bundlePath);
    }

    private loadGameSceneByGid(bundleName: string, finishCall?: Function){
        let currentGame = bundleName;
        this.switchSceneTimer = setTimeout(() => {
            Global.Toolkit.removeDir(Number(currentGame),"进入子游戏失败")
        }, 5000);
        let self = this;
        Global.ResourceManager.loadBundle(currentGame, async (err, bundle:cc.AssetManager.Bundle)=>{
            this.clearTimer()
            if (err){
                Global.Toolkit.removeDir(Number(currentGame),"加载子游戏bundle失败")
                Logger.error("load failed " + currentGame)
                return;
            }
            
            let sceneID = Number(currentGame);
            if(Game.Control.GAME_DDZ_HJ_ARR.indexOf(sceneID) >= 0){
                if(Game.Control.curGid > 0){
                    sceneID = Game.Control.curGid;
                }
            }
            let sceneName = ''
            switch (sceneID.toString()) {
                case "1002"://百人牛牛
                    sceneName = "BullPVEGame";
                    break;
                case "1005"://龙虎斗
                    sceneName = 'LongHuGame'
                    break;
                case "1006":
                    sceneName = 'HongHeiGame'
                    break;
                case "1007"://百家乐
                    sceneName = 'BaccaratGame'
                    break;
                case "1009":
                    sceneName = 'bzbw'
                    break;
                case "1010"://推筒子
                    sceneName = 'TuitongziGame'
                    break;
                case "1011"://欢乐至尊
                    sceneName = 'HuanlezhizunGame'
                    break;
                case "1014":
                    sceneName = 'WanRenGame'
                    break;
                case "1015"://五星宏辉
                    sceneName = 'WuxinghonghuiGame'
                    break;
                case "1016"://二八杠
                    sceneName = 'ErbagangGame'
                    break;
                case "1017"://百变五张
                    sceneName = 'BbwzGame'
                    break;
                case "1018"://决战五张
                    sceneName = 'JzwzGame'
                    break;
                case "1019"://飞禽走兽
                    sceneName = 'FqzsGameScene'
                    break;
                case "1020":// 鱼虾蟹
                    sceneName = 'YxxScene'
                    break;
                case "1021":    // 秦皇汉武
                    sceneName = 'QhhwScene'
                    break;
                case "1022":    // 西游记
                    sceneName = 'XyjGameScene'
                    break;
                case "2001":
                    sceneName = 'BullPVPScene'
                    break;
                case "2002":
                    sceneName = 'BullTwoScene'
                    break;
                case "2003":
                    sceneName = 'ZJHScene'
                    break;
                case "2004"://十三水
                    sceneName = 'ShisanshuiGame';
                    break;
                case "2005":
                    sceneName = 'DDZPvpScene';
                    break;
                case "2006":
                    sceneName = 'BullTBScene'
                    break;
                case "2007":
                    sceneName = 'BullKPScene'
                    break;
                case "2008":    // 21点
                    sceneName = 'BlackJackScene'
                    break;
                case "2009":    // 疯狂牛牛
                    sceneName = 'FknnScene'
                    break;
                case "2010":    // 德州扑克
                    sceneName = 'TexasHoldemScene'
                    break;
                case "2011":    // 一拳超人
                    sceneName = 'OnePunchScene'
                    break;
                case "2012":
                    sceneName = 'PdkScene';
                    break;
                case "2013":
                    sceneName = 'DdzTwoScene';
                    break;
                case "2014":
                    sceneName = 'BullHPScene'
                    break;
                case "2101":    // 二人麻将
                    sceneName = 'ErmjScene'
                    break;
                case "2102":    // 血流麻将
                    sceneName = 'XlmjScene'
                    break;
                case "4001": //红包扫雷
                    sceneName = 'RedPackScene'
                    break;
                case "4002": //红包接龙
                    sceneName = 'HbjlGame'
                    break;
                case "3001":
                    sceneName = 'main'
                    break;
                case "3002"://3D捕鱼
                    sceneName = 'Fish3DGame'
                    break;
                case "3003":
                    sceneName = 'DntgFishScene'
                    break;
                case "3004":
                    sceneName = 'JcbyFishScene'
                    break;
                case "3005":
                    sceneName = 'FishGameScene'
                    break;
                case "3006":
                    sceneName = 'Fish3GameScene'
                    break;
                case "1001":
                    sceneName = 'toubao'
                    break;
                case "5001":
                    sceneName = 'CqbyScene'
                    break;
                case "5002"://多福多财
                    sceneName = 'DuofuduocaiGame'
                    break;
                case "5003"://跑马水果机
                    sceneName = 'shuiguoji'
                    break;
                case "5004"://澳门风云
                    sceneName = 'AmfyGame'
                    break;
                case "5005"://古惑仔
                    sceneName = 'GhzGameScene'
                    break;
                case "5006"://拳皇97
                    sceneName = 'Qh97GameScene'
                    break;
                case "6001"://六合彩
                    sceneName = 'MK6Game'
                    break;
                case "7005"://真人龙虎
                    sceneName = 'ShixunLonghuGame'
                    break;
                default:
                    Logger.error("enter hall -----")
                    break;
            }
            
            Game.GamePreloadTool.setup(Number(currentGame));        // debug 这里加载处理杀掉进程重连情况
            if (Game.GamePreloadTool.checkPreloadBundleExist(Number(currentGame))){
               await Game.GamePreloadTool.preloadBundle();              // 后续子游戏preload优先级提高, 需要先一步加载 先预埋
               await Game.GamePreloadTool.preloadPrefab(Game.GamePreloadTool.lobbyUIPath);      // 杀掉进程重连时候要预加载选场以便退出游戏时快速显示
            }
            this.switchSceneTimer = setTimeout(() => {
                Global.Toolkit.removeDir(Number(currentGame),"加载子游戏场景失败")
            }, 5000);
            try {
                bundle.loadScene(sceneName,(err:Error,sceneAsset)=>{
                    this.clearTimer()
                    if (err){
                        
                        Logger.error("加载子游戏bundle失败--------------loadScene------")
                        Logger.error("bundle loadScene " + sceneName + " error = " + err.message)
                        Global.Toolkit.removeDir(Number(currentGame),err)
                        return;
                    }
                    cc.director.loadScene(sceneName, ()=>{
                        if (finishCall){
                            finishCall()
                        }
                        self.adjustRedMiUI12();
                    });
                })
              } catch (error) {
                Global.Toolkit.removeDir(Number(currentGame),error)
                // expected output: ReferenceError: nonExistentFunction is not defined
                // Note - error messages will vary depending on browser
              }
           
        })
    }

    

    public switchGameScene(gid: number){
        if (this.sceneType !== SceneType.Game) {
            Logger.error("this.sceneType !== SceneType.Game")
            return;
        }
        
        let oldGameId = Global.HotUpdateManager.CurrentGame;
        let oldGameBundle = Global.ResourceManager.gameBundle;

        Global.UI.SetMessageBoxInGame(false);
        Global.UI.closeAllUIPrefab();
        let currentGame = String(gid);
        Global.HotUpdateManager.CurrentGame = currentGame;
        Global.ResourceManager.gameBundle = currentGame;
        Global.NativeJSBBridge.addClickGames(currentGame)
        this.setGameSearchPath(currentGame);
        Global.UI.close("WndGameLobbyShell");       // debug 跳转到无选场游戏时, 再退出重新进会显示前个游戏残影
        this.loadGameSceneByGid(currentGame, ()=>{
            // 跳转清理旧游戏资源 debug 旧选场资源还无法释放, UI还保存着在map里 只会多出一份选场资源暂不处理
            if(currentGame == oldGameId){
                //合集类游戏会出现这种情况
                return;
            }
            Global.ResourceManager.releaseHelper.releaseBundle(oldGameBundle);
        });
    }

    public setGameSearchPath(gid: string){
        if (cc.sys.isNative){
            let updateHelper = Global.HotUpdateManager.updateHelper
            updateHelper.init(gid)
            
            let storagePath = updateHelper.storagePath();
            Global.SearchPathHelper.addOneGamePath(storagePath);
        }
    }

    public removeGameSearchPath(gid: string){
        if (cc.sys.isNative){
            let storagePath = jsb.fileUtils.getWritablePath()  + 'gameUpdate/' + gid;
            Global.SearchPathHelper.removeOnePath(storagePath)
        }
    }

    private removeStoragePathFromSearchPaths(storagePath){
        let searchPaths = jsb.fileUtils.getSearchPaths();
        if (storagePath && searchPaths && searchPaths.length > 0){
            let pathIndex = -1
            for (let i =0;i<searchPaths.length;i++){
                let path = searchPaths[i]
                if (path && (path == storagePath || path == (storagePath + "/"))){
                    pathIndex = i;
                    break;
                }   
            }
            searchPaths.splice(pathIndex,1)
        }else {
            Logger.error("removeStoragePathFromSearchPaths searPaths or storagepath == null")
            //添加大厅热更目录
            if (searchPaths && searchPaths.length == 0)
            {
                Logger.error("removeStoragePathFromSearchPaths add Hall SearchPath")
                let hallNativeUpdatePath = Global.HotUpdateManager.getNativeHotUpdatePath('hall')
                searchPaths.unshift(hallNativeUpdatePath)
            }
            
        }
        return searchPaths
    }
    clearTimer(){
        if (this.switchSceneTimer) {
            clearTimeout(this.switchSceneTimer)
            this.switchSceneTimer = null
        }
    }
}
