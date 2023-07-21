import GlobalEvent from "../../core/GlobalEvent";
import ServerRoutes from "../../core/setting/ServerRoutes";
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
    /** 二人麻将 */
    ERMJ = 7,
    /*外接游戏*/
    WEBGAME = 8,
    /*AGBG外接游戏*/
    AGBG= 9
}
export class GameInfo {
    public game_id: number = 0;//游戏id
    public name: string = "";//游戏名称
    public rules = {};//
    public levels = [];//
    public status = 0;//是否显示 1显示 0不 2待开放  3维护中
    public power = 0;////排序
    public top = 0;////1 火热 2 推荐 3 最新 0不需要
    public top2 = -1;////1 开启 0 关闭 
    public gtype = 0;//游戏类型 1 PVE 2PVP 3捕鱼 4红包 5单机游戏 8 外接游戏
    public href = "";//外接游戏地址
    public version = "";//当前版本号
    public update_url = "";//热更地址
    public update_url_list = [] // 热更地址列表
    public update_url_list_new = [] // 热更地址列表
    public update_url_param = "";//热更地址后缀参数
    public hit_update = {"url":[],"version":"","param":"","is_back":0,"new_url":[]};//新版本热更
    public isBackVersionFlag = 0;//是否回滚版本
    public native_version = "";//本地版本
    public remote_version = "";//远程版本
    public levelType: number = 1;   //选场类型 1 无选场 2 有选场
    public checkMoney = false;  //进游戏前是否需要检查货币
    public supportVersion = 0;  //所需版本号支持
    public supportIosVersion = 0;  //所需ios版本号
    public portraitModel = false; //是否是竖屏模式
    public marqueeStrType = -1 //跑马灯文本类型（不同游戏对应不同文本）

    public prefabName = "";  //特效预设名称
    public platformIconPath = ""; //特殊平台图标名称
    public gameType = -1
    public hasChooseLevel = false
    public isbig = false
    public isJackPotGame = false
    public isCustomLoading = false;  // 是否使用游戏内定制loading

    public pos = 0;//显示在大厅或者更多游戏列表中 (0大厅1更多游戏)
    public update_url_index = 0 //热更地址索引
    public ids = [];//属于哪个页签
    public isNew = false;
    getUpdateUrl()
    {

        let routes = this.update_url_list_new
        
        if(!routes || routes.length == 0)
        {
            routes = Global.UrlUtil.transferUrlArrayToRoutes(this.update_url_list)  
        }

        Global.DunHotUpdateUrlSetting.hotUpdateRouteCfg = routes
        if(this.update_url_index>0)
        {
            Global.DunHotUpdateUrlSetting.switchRoute()
        }
        this.update_url_index += 1
        let url = Global.DunHotUpdateUrlSetting.hotUpdateUrl
        Logger.error("getUpdateUrl:url==================" + url)
        if(this.update_url_param && url)
        {
            this.update_url = url + "/" + this.update_url_param
            let tmpName = this.game_id +"_temp"
            let fileName = "project.manifest.temp"
            let fullLocalUrl = Global.HotUpdateManager.updateHelper.genStoragePath(tmpName) + "/" +fileName
            if(jsb.fileUtils.isFileExist(fullLocalUrl))
            {
                jsb.fileUtils.removeFile(fullLocalUrl)
            }
            //Global.HotUpdateManager.changeLocalUrl(url,this.update_url_param,tmpName,fileName)
            return this.update_url
        }
        return null
    }
}



export default class GameData {
    //游戏资源配置，从json 读取
    private _gameResList = {}

    private _gameList = [];
    private _hallGameList = [];//大厅游戏列表
    private _moreGameList = [];//更多游戏列表
    private _autoDownList = [] // 自动下载子游戏列表
    private _gamedataInitFinish = false
    private _gameTypes = {
        hall: 'hall',
    };

    constructor() {
        this.clear();
    }
    
    public get autoDownList()
    {
        return this._autoDownList
    }

    public clear() {
        this._gameList = [];
        this._autoDownList = [];
        this._gamedataInitFinish = false
    }

    public init(gamelist?: any) {
        if (!gamelist) {
            cc.error("----gameList------ null")
            return;
        }
        for (let i = 0; i < gamelist.length; i++) {
            let svrGameData = gamelist[i]
            if(svrGameData.game_id == Game.Control.GAME_DDZ_HJ_ARR[0]){
                //斗地主合集
                Game.Control.GAME_DDZ_HJ_ARR.push(2005, 2013);
            }
        }
        let tempGameList = []
        let hallGameList = [];
        let moreGameList = [];
        for (let i = 0; i < gamelist.length; i++) {

            let svrGameData = gamelist[i]
           
            let gameModel = new GameInfo();
            for (let key in gameModel) {
                if (svrGameData[key] != null && svrGameData[key] != undefined) {
                    gameModel[key] = svrGameData[key];
                }
            }
            let gameRes = this._gameResList[svrGameData.game_id]
            if(gameRes == null || gameRes == undefined)
            {
                Logger.error("找不到游戏", svrGameData.game_id)
                continue;
            }
         
            if (gameModel.hit_update && gameModel.hit_update.version != null && gameModel.hit_update.version != ""){
                gameModel.version = gameModel.hit_update.version
                gameModel.update_url = gameModel.hit_update.url[0] + "/" + gameModel.hit_update.param
                gameModel.update_url_list = gameModel.hit_update.url
                gameModel.update_url_list_new = gameModel.hit_update.new_url
                gameModel.update_url_param = gameModel.hit_update.param
                gameModel.isBackVersionFlag = gameModel.hit_update.is_back
            }
            gameModel.levelType = gameRes.levelType;
            gameModel.checkMoney = gameRes.checkMoney;
            gameModel.supportVersion = gameRes.supportVersion;
            gameModel.supportIosVersion = gameRes.supportIosVersion;
            gameModel.native_version = Global.HotUpdateManager.getNativeHotUpdateVersion(gameModel.game_id);
            gameModel.portraitModel = gameRes.portraitModel;
            gameModel.marqueeStrType = gameRes.marqueeStrType

            gameModel.prefabName = gameRes.prefabName;
            gameModel.hasChooseLevel = gameRes.hasChooseLevel;
            gameModel.gameType = gameRes.gameType
            gameModel.isJackPotGame = gameRes.isJackPotGame
            if(svrGameData.auto_down == 1)
            {
                this._autoDownList.push(svrGameData.game_id)
            }

            this._gameTypes[svrGameData.game_id] = svrGameData.game_id;
            if (gameModel.status != 0) {
                tempGameList.push(gameModel)
                if(Game.Control.GAME_DDZ_HJ_ARR.indexOf(svrGameData.game_id) <= 0 && gameModel.pos == 0){
                    hallGameList.push(gameModel)
                }
                if(gameModel.pos != 0){
                    moreGameList.push(gameModel);
                }
            }
           
        }
        this._gameTypes["hall"] = "hall";

        function sortFunc(a, b) {
            return a.power - b.power
        }

        tempGameList.sort(sortFunc)
        hallGameList.sort(sortFunc)
        moreGameList.sort(sortFunc)
        this._moreGameList = moreGameList;
        this._gameList = tempGameList;
        this._hallGameList = hallGameList;
        this.dataInitFinish = true
    }
    

    public set dataInitFinish(flag)
    {
        this._gamedataInitFinish = flag
        if(flag)
        {
            Global.Event.event(GlobalEvent.UPDATE_GAME_LIST)
        }
    }

    public get dataInitFinish()
    {
       return  this._gamedataInitFinish 
    }
    public get gameList() {
        return this._gameList;
    }
    public get moreGameList(){
        return this._moreGameList;
    }
    public get hallGameList(){
        return this._hallGameList;
    }
    public get gameTypes() {
        return this._gameTypes;
    }
    public getGameInfo(gid): any {
        let gameInfo = {}
        for (let i = 0; i < this._gameList.length; i++) {
            let tempInfo = this._gameList[i]
            if (tempInfo.game_id == gid) {
                gameInfo = tempInfo;
                break;
            }
        }
        return gameInfo;
    }

    public get hasMoreGameList(){
        return this._moreGameList.length > 0;
    }

    public getGameResInfo(gid)
    {
        return this._gameResList[gid] || {}
    }

    //游戏Icon 资源配置
    public setGameIconResCfg(cfg){
        this._gameResList = cfg
    }


    public hasGame(gid)
    {
        return this.getGameInfo(gid) != null;
    }
    
    public getReturnGameStr(gid: number, lv: string, canReturn: boolean){
        let gameData = Global.GameData.getGameInfo(gid);
        let lvName = this.getLevelStr(gameData.levels || [], lv);
        // let str = canReturn ? `您当前正在【${gameData.name}】${lvName}中，是否回到该游戏中？` : `您当前正在【${gameData.name}】${lvName}中，无法加入其他游戏！`;
        let str = `您当前正在【${gameData.name}】${lvName}中，是否回到该游戏中？`;
        return str
    }

    private getLevelStr(levels: any[] = [], searchLv: string){
        let str = "";
        let count = levels.length;
        if (count > 1){
            for(let i= 0; i < levels.length; i++){
                let info = levels[i];
                if (info.level == searchLv){
                    str = `-【${info.SceneName}】`;     // -【场次名】
                    break;
                }
            }
        }
        return str;
    }
    public checkHasCustomLoading(gid: number){
        let info = this.getGameResInfo(gid);
        return !!info.isCustomLoading;
    }
}