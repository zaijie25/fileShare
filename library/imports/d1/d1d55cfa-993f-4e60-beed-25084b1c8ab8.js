"use strict";
cc._RF.push(module, 'd1d55z6mT9OYL7tJQhLHIq4', 'GameData');
// hall/scripts/logic/hallcommon/data/GameData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameInfo = exports.GameType = void 0;
var GlobalEvent_1 = require("../../core/GlobalEvent");
var GameType;
(function (GameType) {
    GameType[GameType["PVE"] = 0] = "PVE";
    GameType[GameType["PVP"] = 1] = "PVP";
    /** 路珠类型 */
    GameType[GameType["TRENDGAME"] = 2] = "TRENDGAME";
    /** 老虎机类型 */
    GameType[GameType["LUCKGAME"] = 3] = "LUCKGAME";
    /** 捕鱼类型 */
    GameType[GameType["FISH"] = 4] = "FISH";
    /**直接进游戏（暂定美术未提供大厅选场的游戏 如 红包接龙） */
    GameType[GameType["NOCHANGE"] = 5] = "NOCHANGE";
    /**红包 */
    GameType[GameType["REDPACKGAME"] = 6] = "REDPACKGAME";
    /** 二人麻将 */
    GameType[GameType["ERMJ"] = 7] = "ERMJ";
    /*外接游戏*/
    GameType[GameType["WEBGAME"] = 8] = "WEBGAME";
    /*AGBG外接游戏*/
    GameType[GameType["AGBG"] = 9] = "AGBG";
})(GameType = exports.GameType || (exports.GameType = {}));
var GameInfo = /** @class */ (function () {
    function GameInfo() {
        this.game_id = 0; //游戏id
        this.name = ""; //游戏名称
        this.rules = {}; //
        this.levels = []; //
        this.status = 0; //是否显示 1显示 0不 2待开放  3维护中
        this.power = 0; ////排序
        this.top = 0; ////1 火热 2 推荐 3 最新 0不需要
        this.top2 = -1; ////1 开启 0 关闭 
        this.gtype = 0; //游戏类型 1 PVE 2PVP 3捕鱼 4红包 5单机游戏 8 外接游戏
        this.href = ""; //外接游戏地址
        this.version = ""; //当前版本号
        this.update_url = ""; //热更地址
        this.update_url_list = []; // 热更地址列表
        this.update_url_list_new = []; // 热更地址列表
        this.update_url_param = ""; //热更地址后缀参数
        this.hit_update = { "url": [], "version": "", "param": "", "is_back": 0, "new_url": [] }; //新版本热更
        this.isBackVersionFlag = 0; //是否回滚版本
        this.native_version = ""; //本地版本
        this.remote_version = ""; //远程版本
        this.levelType = 1; //选场类型 1 无选场 2 有选场
        this.checkMoney = false; //进游戏前是否需要检查货币
        this.supportVersion = 0; //所需版本号支持
        this.supportIosVersion = 0; //所需ios版本号
        this.portraitModel = false; //是否是竖屏模式
        this.marqueeStrType = -1; //跑马灯文本类型（不同游戏对应不同文本）
        this.prefabName = ""; //特效预设名称
        this.platformIconPath = ""; //特殊平台图标名称
        this.gameType = -1;
        this.hasChooseLevel = false;
        this.isbig = false;
        this.isJackPotGame = false;
        this.isCustomLoading = false; // 是否使用游戏内定制loading
        this.pos = 0; //显示在大厅或者更多游戏列表中 (0大厅1更多游戏)
        this.update_url_index = 0; //热更地址索引
        this.ids = []; //属于哪个页签
        this.isNew = false;
    }
    GameInfo.prototype.getUpdateUrl = function () {
        var routes = this.update_url_list_new;
        if (!routes || routes.length == 0) {
            routes = Global.UrlUtil.transferUrlArrayToRoutes(this.update_url_list);
        }
        Global.DunHotUpdateUrlSetting.hotUpdateRouteCfg = routes;
        if (this.update_url_index > 0) {
            Global.DunHotUpdateUrlSetting.switchRoute();
        }
        this.update_url_index += 1;
        var url = Global.DunHotUpdateUrlSetting.hotUpdateUrl;
        Logger.error("getUpdateUrl:url==================" + url);
        if (this.update_url_param && url) {
            this.update_url = url + "/" + this.update_url_param;
            var tmpName = this.game_id + "_temp";
            var fileName = "project.manifest.temp";
            var fullLocalUrl = Global.HotUpdateManager.updateHelper.genStoragePath(tmpName) + "/" + fileName;
            if (jsb.fileUtils.isFileExist(fullLocalUrl)) {
                jsb.fileUtils.removeFile(fullLocalUrl);
            }
            //Global.HotUpdateManager.changeLocalUrl(url,this.update_url_param,tmpName,fileName)
            return this.update_url;
        }
        return null;
    };
    return GameInfo;
}());
exports.GameInfo = GameInfo;
var GameData = /** @class */ (function () {
    function GameData() {
        //游戏资源配置，从json 读取
        this._gameResList = {};
        this._gameList = [];
        this._hallGameList = []; //大厅游戏列表
        this._moreGameList = []; //更多游戏列表
        this._autoDownList = []; // 自动下载子游戏列表
        this._gamedataInitFinish = false;
        this._gameTypes = {
            hall: 'hall',
        };
        this.clear();
    }
    Object.defineProperty(GameData.prototype, "autoDownList", {
        get: function () {
            return this._autoDownList;
        },
        enumerable: false,
        configurable: true
    });
    GameData.prototype.clear = function () {
        this._gameList = [];
        this._autoDownList = [];
        this._gamedataInitFinish = false;
    };
    GameData.prototype.init = function (gamelist) {
        if (!gamelist) {
            cc.error("----gameList------ null");
            return;
        }
        for (var i = 0; i < gamelist.length; i++) {
            var svrGameData = gamelist[i];
            if (svrGameData.game_id == Game.Control.GAME_DDZ_HJ_ARR[0]) {
                //斗地主合集
                Game.Control.GAME_DDZ_HJ_ARR.push(2005, 2013);
            }
        }
        var tempGameList = [];
        var hallGameList = [];
        var moreGameList = [];
        for (var i = 0; i < gamelist.length; i++) {
            var svrGameData = gamelist[i];
            var gameModel = new GameInfo();
            for (var key in gameModel) {
                if (svrGameData[key] != null && svrGameData[key] != undefined) {
                    gameModel[key] = svrGameData[key];
                }
            }
            var gameRes = this._gameResList[svrGameData.game_id];
            if (gameRes == null || gameRes == undefined) {
                Logger.error("找不到游戏", svrGameData.game_id);
                continue;
            }
            if (gameModel.hit_update && gameModel.hit_update.version != null && gameModel.hit_update.version != "") {
                gameModel.version = gameModel.hit_update.version;
                gameModel.update_url = gameModel.hit_update.url[0] + "/" + gameModel.hit_update.param;
                gameModel.update_url_list = gameModel.hit_update.url;
                gameModel.update_url_list_new = gameModel.hit_update.new_url;
                gameModel.update_url_param = gameModel.hit_update.param;
                gameModel.isBackVersionFlag = gameModel.hit_update.is_back;
            }
            gameModel.levelType = gameRes.levelType;
            gameModel.checkMoney = gameRes.checkMoney;
            gameModel.supportVersion = gameRes.supportVersion;
            gameModel.supportIosVersion = gameRes.supportIosVersion;
            gameModel.native_version = Global.HotUpdateManager.getNativeHotUpdateVersion(gameModel.game_id);
            gameModel.portraitModel = gameRes.portraitModel;
            gameModel.marqueeStrType = gameRes.marqueeStrType;
            gameModel.prefabName = gameRes.prefabName;
            gameModel.hasChooseLevel = gameRes.hasChooseLevel;
            gameModel.gameType = gameRes.gameType;
            gameModel.isJackPotGame = gameRes.isJackPotGame;
            if (svrGameData.auto_down == 1) {
                this._autoDownList.push(svrGameData.game_id);
            }
            this._gameTypes[svrGameData.game_id] = svrGameData.game_id;
            if (gameModel.status != 0) {
                tempGameList.push(gameModel);
                if (Game.Control.GAME_DDZ_HJ_ARR.indexOf(svrGameData.game_id) <= 0 && gameModel.pos == 0) {
                    hallGameList.push(gameModel);
                }
                if (gameModel.pos != 0) {
                    moreGameList.push(gameModel);
                }
            }
        }
        this._gameTypes["hall"] = "hall";
        function sortFunc(a, b) {
            return a.power - b.power;
        }
        tempGameList.sort(sortFunc);
        hallGameList.sort(sortFunc);
        moreGameList.sort(sortFunc);
        this._moreGameList = moreGameList;
        this._gameList = tempGameList;
        this._hallGameList = hallGameList;
        this.dataInitFinish = true;
    };
    Object.defineProperty(GameData.prototype, "dataInitFinish", {
        get: function () {
            return this._gamedataInitFinish;
        },
        set: function (flag) {
            this._gamedataInitFinish = flag;
            if (flag) {
                Global.Event.event(GlobalEvent_1.default.UPDATE_GAME_LIST);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameData.prototype, "gameList", {
        get: function () {
            return this._gameList;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameData.prototype, "moreGameList", {
        get: function () {
            return this._moreGameList;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameData.prototype, "hallGameList", {
        get: function () {
            return this._hallGameList;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameData.prototype, "gameTypes", {
        get: function () {
            return this._gameTypes;
        },
        enumerable: false,
        configurable: true
    });
    GameData.prototype.getGameInfo = function (gid) {
        var gameInfo = {};
        for (var i = 0; i < this._gameList.length; i++) {
            var tempInfo = this._gameList[i];
            if (tempInfo.game_id == gid) {
                gameInfo = tempInfo;
                break;
            }
        }
        return gameInfo;
    };
    Object.defineProperty(GameData.prototype, "hasMoreGameList", {
        get: function () {
            return this._moreGameList.length > 0;
        },
        enumerable: false,
        configurable: true
    });
    GameData.prototype.getGameResInfo = function (gid) {
        return this._gameResList[gid] || {};
    };
    //游戏Icon 资源配置
    GameData.prototype.setGameIconResCfg = function (cfg) {
        this._gameResList = cfg;
    };
    GameData.prototype.hasGame = function (gid) {
        return this.getGameInfo(gid) != null;
    };
    GameData.prototype.getReturnGameStr = function (gid, lv, canReturn) {
        var gameData = Global.GameData.getGameInfo(gid);
        var lvName = this.getLevelStr(gameData.levels || [], lv);
        // let str = canReturn ? `您当前正在【${gameData.name}】${lvName}中，是否回到该游戏中？` : `您当前正在【${gameData.name}】${lvName}中，无法加入其他游戏！`;
        var str = "\u60A8\u5F53\u524D\u6B63\u5728\u3010" + gameData.name + "\u3011" + lvName + "\u4E2D\uFF0C\u662F\u5426\u56DE\u5230\u8BE5\u6E38\u620F\u4E2D\uFF1F";
        return str;
    };
    GameData.prototype.getLevelStr = function (levels, searchLv) {
        if (levels === void 0) { levels = []; }
        var str = "";
        var count = levels.length;
        if (count > 1) {
            for (var i = 0; i < levels.length; i++) {
                var info = levels[i];
                if (info.level == searchLv) {
                    str = "-\u3010" + info.SceneName + "\u3011"; // -【场次名】
                    break;
                }
            }
        }
        return str;
    };
    GameData.prototype.checkHasCustomLoading = function (gid) {
        var info = this.getGameResInfo(gid);
        return !!info.isCustomLoading;
    };
    return GameData;
}());
exports.default = GameData;

cc._RF.pop();