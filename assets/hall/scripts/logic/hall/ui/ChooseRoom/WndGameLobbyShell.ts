import WndBase, { DestoryType } from "../../../core/ui/WndBase";

export enum GameType {
    PVE = 0,
    PVP = 1,
    /** 路珠类型 */
    TRENDGAME = 2,
    /** 老虎机类型 */
    LUCKGAME = 3,
    /** 捕鱼类型 */
    FISH = 4,
    /**直接进游戏（暂定美术未提供大厅选场的游戏 如 红包接龙） */
    NOCHANGE = 5,
    /**红包 */
    REDPACKGAME = 6,
    /*外接游戏*/
    WEBGAME = 8
}

const keepCount = 1;
export default class WndGameLobbyShell extends WndBase{
    private poolNode: cc.Node;
    private keepMap: Map<number, cc.Node> = new Map;
    private keepArr: number[] = [];
    private activeGameId: number = 0;
    private activeGameData: any;
    
    protected onInit() {
        this.name = "WndGameLobbyShell";
        this.layer = "FullScreenLayer";
        this.resPath = "hall/prefabs/ui/ChooseRoom/GameLobbyShellUI";
        this.destoryType = DestoryType.Persist;
    }

    protected initView(){
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.poolNode = cc.find("pool", this.node);
        this.poolNode.active = false;
        Game.Event.on(GlobalEvent.OnCloseGameLobby, this, this.closeWnd);
        Game.Event.on(GlobalEvent.OnGotoGameScene, this, this.gotoGame);
    }

    protected onOpen(args: any[]){
        if (args && args.length > 0)
            [this.activeGameId] = args;
        if (Game.GamePreloadTool.curGameId != this.activeGameId){
            this.closeWnd();
            return //console.error("异常onOpen", Game.GamePreloadTool.curGameId, this.activeGameId);
        }
        
        this.setGameContent();
    }

    public reshow(){
        let [gid] = this.args;
        if (Game.GamePreloadTool.curGameId != gid)
            return //console.error("异常reshow", Game.GamePreloadTool.curGameId, gid);
        if (gid == this.activeGameId)
            return;
        if (this.activeGameId && this.keepMap.has(this.activeGameId) && cc.isValid(this.keepMap.get(this.activeGameId))){
            let node = this.keepMap.get(this.activeGameId);
            node.setParent(this.poolNode);
            node.active = false;
        }
        this.activeGameId = gid;

        this.setGameContent();
    }

    private setGameContent(){
        let bundleName = Game.GamePreloadTool.curBundleName;
        this.activeGameData = Global.GameData.getGameInfo(this.activeGameId);
        if (this.activeGameId && Global.ResourceManager.checkBundleValid(bundleName)){
            if (this.keepMap.has(this.activeGameId) && cc.isValid(this.keepMap.get(this.activeGameId))){
                Logger.error("use keepMap node", this.activeGameId);
                let node = this.keepMap.get(this.activeGameId);
                node.setParent(this.node);
                node.active = true;
            }
            else{
                let prefab = Game.GamePreloadTool.getSelectPrefab(Game.GamePreloadTool.lobbyUIPath, true);
                if (prefab){
                    Logger.error("use new node, prefab.refCount", this.activeGameId, prefab.refCount);
                    let node = <cc.Node>cc.instantiate(prefab);
                    node.setParent(this.node);
                    node.active = true;
                    this.keepMap.set(this.activeGameId, node);
                    this.keepArr.push(this.activeGameId);
                }
                else{
                  //  console.error("error, 未预加载或找不到LobbyUI");
                    this.closeWnd();
                }
            }
        }
        else{
          //  console.error("error, 当前游戏选场bundle未预加载", this.activeGameId, bundleName);
            this.closeWnd();
        }
    }

    private closeWnd(){
        Game.GamePreloadTool.releaseKeepAsset(this.activeGameId, true);
        this.checkLeaveKeepCount();     // 关闭退出选场时检测上限释放
        if (this.keepMap.has(this.activeGameId)){           // debug 退出页面时手动关闭节点, 避免开另一个游戏时 触发onEnable
            let node = this.keepMap.get(this.activeGameId);
            if (node && cc.isValid(node)){
                node.active = false;
                node.setParent(this.poolNode);
            }
        }
        Global.UI.close(this.name);
    }

    private gotoGame(level: string, gameData:object = null){
        if (!this.checkMoney(level, gameData) || !this.checkVersion())
            return;
        
        this.checkEnterKeepCount();         
        let enterFunc = () => {
            if(gameData){
                Game.Control.curGid = gameData["gameid"];
            }
            Game.Control.curLv = level;
            Global.Event.event(GlobalEvent.RecordGameListOffsetX);
            Global.SceneManager.loadGameScene();
        }
        if (this.activeGameData.portraitModel) {    // 检查是否需要显示横竖屏切换提示
            Global.UI.showPortraitScreenNotice(enterFunc);
        }
        else {
            enterFunc();
        }
    }

    private checkMoney(level = "l0", gameData = null) {
        let gameObj = null;
        if(gameData){
            gameObj = gameData;
        }else if (this.activeGameData.levels) {
            for (let index = 0; index < this.activeGameData.levels.length; index++) {
                let levelStr = this.activeGameData.levels[index].level;
                if(levelStr && levelStr == level){
                    gameObj = this.activeGameData.levels[index];
                    break;
                }
            }
        }
        
        let pointLow = gameObj.PointLow;
        if (pointLow && Global.PlayerData.point < pointLow) {
            let limit = Global.Toolkit.formatPointStr(pointLow);
            let str = "游戏准入" + limit + "金币，请您充值哦！";
            Global.Toolkit.showMoneyNotEnough(str);
            return false;
        }
        return true;
    }

    private checkVersion() {
        if (this.activeGameData.supportVersion && this.activeGameData.supportVersion > 0) {
            if (!Global.Toolkit.checkVersionSupport(this.activeGameData.supportVersion, this.activeGameData.supportIosVersion)) {
                Global.UI.showYesNoBox("版本过旧，请下载新包使用该功能", () => {
                    cc.sys.openURL(Global.Setting.Urls.downLoadUrl);
                })
                return false;
            }
        }
        return true;
    }

    /** 按照设定保留游戏选场数资源 新增显示选场资源时检测 */
    private checkLeaveKeepCount(){
        if (this.keepArr.length > 0 && this.keepArr.length == keepCount + 1){   // 超出保存上限一个 就清理一个
            let oldGid = this.keepArr.shift();
            this.releaseOneKeep(oldGid);
        }
    }

    /** 按照设定保留游戏选场数资源 */
    private checkEnterKeepCount(){
        if (this.activeGameData.gameType == GameType.FISH){        // 进入捕鱼游戏时要检测只保留捕鱼那份资源
            this.keepOnlyCurrent();
        }
        else if(this.keepArr.length == 1){                  // 保留当前那个 
            Logger.log("keep current with no action");
        }
        else{
            if (keepCount > 0){
                this.checkLeaveKeepCount();             // 按照上限检测释放
            }
        }
    }

    /** 保留当前游戏选场, 其余删除释放 */
    private keepOnlyCurrent(){
        let count = this.keepArr.length;
        if (count > 1){
            for(let i = 0; i < count; i++){
                let gid = this.keepArr[i];
                if (gid !== this.activeGameId)  // 只保留当前gid
                    this.releaseOneKeep(gid);
            }
            this.keepArr = [this.activeGameId];
        }
    }

    private releaseOneKeep(gid: number){
        let node = this.keepMap.get(gid);
        if (node){
            node.removeFromParent();
            node.active = false;
            node.destroy();
            this.keepMap.delete(gid);
        }
        Game.GamePreloadTool.releaseKeepAsset(gid, false);
        Game.GamePreloadTool.releasePreloadBundle(gid);
    }

    protected onDispose(){
        this.keepMap.clear();
        this.keepArr = [];
    }
}