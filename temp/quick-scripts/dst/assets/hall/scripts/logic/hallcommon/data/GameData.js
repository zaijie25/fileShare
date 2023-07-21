
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/data/GameData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXGRhdGFcXEdhbWVEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFpRDtBQUVqRCxJQUFZLFFBbUJYO0FBbkJELFdBQVksUUFBUTtJQUNoQixxQ0FBTyxDQUFBO0lBQ1AscUNBQU8sQ0FBQTtJQUNQLFdBQVc7SUFDWCxpREFBYSxDQUFBO0lBQ2IsWUFBWTtJQUNaLCtDQUFZLENBQUE7SUFDWixXQUFXO0lBQ1gsdUNBQVEsQ0FBQTtJQUNSLGtDQUFrQztJQUNsQywrQ0FBWSxDQUFBO0lBQ1osUUFBUTtJQUNSLHFEQUFlLENBQUE7SUFDZixXQUFXO0lBQ1gsdUNBQVEsQ0FBQTtJQUNSLFFBQVE7SUFDUiw2Q0FBVyxDQUFBO0lBQ1gsWUFBWTtJQUNaLHVDQUFPLENBQUE7QUFDWCxDQUFDLEVBbkJXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBbUJuQjtBQUNEO0lBQUE7UUFDVyxZQUFPLEdBQVcsQ0FBQyxDQUFDLENBQUEsTUFBTTtRQUMxQixTQUFJLEdBQVcsRUFBRSxDQUFDLENBQUEsTUFBTTtRQUN4QixVQUFLLEdBQUcsRUFBRSxDQUFDLENBQUEsRUFBRTtRQUNiLFdBQU0sR0FBRyxFQUFFLENBQUMsQ0FBQSxFQUFFO1FBQ2QsV0FBTSxHQUFHLENBQUMsQ0FBQyxDQUFBLHdCQUF3QjtRQUNuQyxVQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUEsTUFBTTtRQUNoQixRQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUEsdUJBQXVCO1FBQy9CLFNBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBLGNBQWM7UUFDeEIsVUFBSyxHQUFHLENBQUMsQ0FBQyxDQUFBLHNDQUFzQztRQUNoRCxTQUFJLEdBQUcsRUFBRSxDQUFDLENBQUEsUUFBUTtRQUNsQixZQUFPLEdBQUcsRUFBRSxDQUFDLENBQUEsT0FBTztRQUNwQixlQUFVLEdBQUcsRUFB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LE1BQU0sQ0FBQztRQUMxQixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUM7WUFDVixLQUFJLElBQUksQ0FBQyxHQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDakMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksUUFBUSxFQUFDO29CQUN2QixHQUFHLEdBQUcsWUFBSyxJQUFJLENBQUMsU0FBUyxXQUFHLENBQUMsQ0FBSyxTQUFTO29CQUMzQyxNQUFNO2lCQUNUO2FBQ0o7U0FDSjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUNNLHdDQUFxQixHQUE1QixVQUE2QixHQUFXO1FBQ3BDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUNsQyxDQUFDO0lBQ0wsZUFBQztBQUFELENBcE1BLEFBb01DLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2xvYmFsRXZlbnQgZnJvbSBcIi4uLy4uL2NvcmUvR2xvYmFsRXZlbnRcIjtcclxuaW1wb3J0IFNlcnZlclJvdXRlcyBmcm9tIFwiLi4vLi4vY29yZS9zZXR0aW5nL1NlcnZlclJvdXRlc1wiO1xyXG5leHBvcnQgZW51bSBHYW1lVHlwZSB7XHJcbiAgICBQVkUgPSAwLFxyXG4gICAgUFZQID0gMSxcclxuICAgIC8qKiDot6/nj6DnsbvlnosgKi9cclxuICAgIFRSRU5ER0FNRSA9IDIsXHJcbiAgICAvKiog6ICB6JmO5py657G75Z6LICovXHJcbiAgICBMVUNLR0FNRSA9IDMsXHJcbiAgICAvKiog5o2V6bG857G75Z6LICovXHJcbiAgICBGSVNIID0gNCxcclxuICAgIC8qKuebtOaOpei/m+a4uOaIj++8iOaaguWumue+juacr+acquaPkOS+m+Wkp+WOhemAieWcuueahOa4uOaIjyDlpoIg57qi5YyF5o6l6b6Z77yJICovXHJcbiAgICBOT0NIQU5HRSA9IDUsXHJcbiAgICAvKirnuqLljIUgKi9cclxuICAgIFJFRFBBQ0tHQU1FID0gNixcclxuICAgIC8qKiDkuozkurrpurvlsIYgKi9cclxuICAgIEVSTUogPSA3LFxyXG4gICAgLyrlpJbmjqXmuLjmiI8qL1xyXG4gICAgV0VCR0FNRSA9IDgsXHJcbiAgICAvKkFHQkflpJbmjqXmuLjmiI8qL1xyXG4gICAgQUdCRz0gOVxyXG59XHJcbmV4cG9ydCBjbGFzcyBHYW1lSW5mbyB7XHJcbiAgICBwdWJsaWMgZ2FtZV9pZDogbnVtYmVyID0gMDsvL+a4uOaIj2lkXHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJcIjsvL+a4uOaIj+WQjeensFxyXG4gICAgcHVibGljIHJ1bGVzID0ge307Ly9cclxuICAgIHB1YmxpYyBsZXZlbHMgPSBbXTsvL1xyXG4gICAgcHVibGljIHN0YXR1cyA9IDA7Ly/mmK/lkKbmmL7npLogMeaYvuekuiAw5LiNIDLlvoXlvIDmlL4gIDPnu7TmiqTkuK1cclxuICAgIHB1YmxpYyBwb3dlciA9IDA7Ly8vL+aOkuW6j1xyXG4gICAgcHVibGljIHRvcCA9IDA7Ly8vLzEg54Gr54OtIDIg5o6o6I2QIDMg5pyA5pawIDDkuI3pnIDopoFcclxuICAgIHB1YmxpYyB0b3AyID0gLTE7Ly8vLzEg5byA5ZCvIDAg5YWz6ZetIFxyXG4gICAgcHVibGljIGd0eXBlID0gMDsvL+a4uOaIj+exu+WeiyAxIFBWRSAyUFZQIDPmjZXpsbwgNOe6ouWMhSA15Y2V5py65ri45oiPIDgg5aSW5o6l5ri45oiPXHJcbiAgICBwdWJsaWMgaHJlZiA9IFwiXCI7Ly/lpJbmjqXmuLjmiI/lnLDlnYBcclxuICAgIHB1YmxpYyB2ZXJzaW9uID0gXCJcIjsvL+W9k+WJjeeJiOacrOWPt1xyXG4gICAgcHVibGljIHVwZGF0ZV91cmwgPSBcIlwiOy8v54Ot5pu05Zyw5Z2AXHJcbiAgICBwdWJsaWMgdXBkYXRlX3VybF9saXN0ID0gW10gLy8g54Ot5pu05Zyw5Z2A5YiX6KGoXHJcbiAgICBwdWJsaWMgdXBkYXRlX3VybF9saXN0X25ldyA9IFtdIC8vIOeDreabtOWcsOWdgOWIl+ihqFxyXG4gICAgcHVibGljIHVwZGF0ZV91cmxfcGFyYW0gPSBcIlwiOy8v54Ot5pu05Zyw5Z2A5ZCO57yA5Y+C5pWwXHJcbiAgICBwdWJsaWMgaGl0X3VwZGF0ZSA9IHtcInVybFwiOltdLFwidmVyc2lvblwiOlwiXCIsXCJwYXJhbVwiOlwiXCIsXCJpc19iYWNrXCI6MCxcIm5ld191cmxcIjpbXX07Ly/mlrDniYjmnKzng63mm7RcclxuICAgIHB1YmxpYyBpc0JhY2tWZXJzaW9uRmxhZyA9IDA7Ly/mmK/lkKblm57mu5rniYjmnKxcclxuICAgIHB1YmxpYyBuYXRpdmVfdmVyc2lvbiA9IFwiXCI7Ly/mnKzlnLDniYjmnKxcclxuICAgIHB1YmxpYyByZW1vdGVfdmVyc2lvbiA9IFwiXCI7Ly/ov5znqIvniYjmnKxcclxuICAgIHB1YmxpYyBsZXZlbFR5cGU6IG51bWJlciA9IDE7ICAgLy/pgInlnLrnsbvlnosgMSDml6DpgInlnLogMiDmnInpgInlnLpcclxuICAgIHB1YmxpYyBjaGVja01vbmV5ID0gZmFsc2U7ICAvL+i/m+a4uOaIj+WJjeaYr+WQpumcgOimgeajgOafpei0p+W4gVxyXG4gICAgcHVibGljIHN1cHBvcnRWZXJzaW9uID0gMDsgIC8v5omA6ZyA54mI5pys5Y+35pSv5oyBXHJcbiAgICBwdWJsaWMgc3VwcG9ydElvc1ZlcnNpb24gPSAwOyAgLy/miYDpnIBpb3PniYjmnKzlj7dcclxuICAgIHB1YmxpYyBwb3J0cmFpdE1vZGVsID0gZmFsc2U7IC8v5piv5ZCm5piv56uW5bGP5qih5byPXHJcbiAgICBwdWJsaWMgbWFycXVlZVN0clR5cGUgPSAtMSAvL+i3kemprOeBr+aWh+acrOexu+Wei++8iOS4jeWQjOa4uOaIj+WvueW6lOS4jeWQjOaWh+acrO+8iVxyXG5cclxuICAgIHB1YmxpYyBwcmVmYWJOYW1lID0gXCJcIjsgIC8v54m55pWI6aKE6K6+5ZCN56ewXHJcbiAgICBwdWJsaWMgcGxhdGZvcm1JY29uUGF0aCA9IFwiXCI7IC8v54m55q6K5bmz5Y+w5Zu+5qCH5ZCN56ewXHJcbiAgICBwdWJsaWMgZ2FtZVR5cGUgPSAtMVxyXG4gICAgcHVibGljIGhhc0Nob29zZUxldmVsID0gZmFsc2VcclxuICAgIHB1YmxpYyBpc2JpZyA9IGZhbHNlXHJcbiAgICBwdWJsaWMgaXNKYWNrUG90R2FtZSA9IGZhbHNlXHJcbiAgICBwdWJsaWMgaXNDdXN0b21Mb2FkaW5nID0gZmFsc2U7ICAvLyDmmK/lkKbkvb/nlKjmuLjmiI/lhoXlrprliLZsb2FkaW5nXHJcblxyXG4gICAgcHVibGljIHBvcyA9IDA7Ly/mmL7npLrlnKjlpKfljoXmiJbogIXmm7TlpJrmuLjmiI/liJfooajkuK0gKDDlpKfljoUx5pu05aSa5ri45oiPKVxyXG4gICAgcHVibGljIHVwZGF0ZV91cmxfaW5kZXggPSAwIC8v54Ot5pu05Zyw5Z2A57Si5byVXHJcbiAgICBwdWJsaWMgaWRzID0gW107Ly/lsZ7kuo7lk6rkuKrpobXnrb5cclxuICAgIHB1YmxpYyBpc05ldyA9IGZhbHNlO1xyXG4gICAgZ2V0VXBkYXRlVXJsKClcclxuICAgIHtcclxuXHJcbiAgICAgICAgbGV0IHJvdXRlcyA9IHRoaXMudXBkYXRlX3VybF9saXN0X25ld1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCFyb3V0ZXMgfHwgcm91dGVzLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcm91dGVzID0gR2xvYmFsLlVybFV0aWwudHJhbnNmZXJVcmxBcnJheVRvUm91dGVzKHRoaXMudXBkYXRlX3VybF9saXN0KSAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHbG9iYWwuRHVuSG90VXBkYXRlVXJsU2V0dGluZy5ob3RVcGRhdGVSb3V0ZUNmZyA9IHJvdXRlc1xyXG4gICAgICAgIGlmKHRoaXMudXBkYXRlX3VybF9pbmRleD4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLkR1bkhvdFVwZGF0ZVVybFNldHRpbmcuc3dpdGNoUm91dGUoKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZV91cmxfaW5kZXggKz0gMVxyXG4gICAgICAgIGxldCB1cmwgPSBHbG9iYWwuRHVuSG90VXBkYXRlVXJsU2V0dGluZy5ob3RVcGRhdGVVcmxcclxuICAgICAgICBMb2dnZXIuZXJyb3IoXCJnZXRVcGRhdGVVcmw6dXJsPT09PT09PT09PT09PT09PT09XCIgKyB1cmwpXHJcbiAgICAgICAgaWYodGhpcy51cGRhdGVfdXJsX3BhcmFtICYmIHVybClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlX3VybCA9IHVybCArIFwiL1wiICsgdGhpcy51cGRhdGVfdXJsX3BhcmFtXHJcbiAgICAgICAgICAgIGxldCB0bXBOYW1lID0gdGhpcy5nYW1lX2lkICtcIl90ZW1wXCJcclxuICAgICAgICAgICAgbGV0IGZpbGVOYW1lID0gXCJwcm9qZWN0Lm1hbmlmZXN0LnRlbXBcIlxyXG4gICAgICAgICAgICBsZXQgZnVsbExvY2FsVXJsID0gR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIudXBkYXRlSGVscGVyLmdlblN0b3JhZ2VQYXRoKHRtcE5hbWUpICsgXCIvXCIgK2ZpbGVOYW1lXHJcbiAgICAgICAgICAgIGlmKGpzYi5maWxlVXRpbHMuaXNGaWxlRXhpc3QoZnVsbExvY2FsVXJsKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAganNiLmZpbGVVdGlscy5yZW1vdmVGaWxlKGZ1bGxMb2NhbFVybClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL0dsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLmNoYW5nZUxvY2FsVXJsKHVybCx0aGlzLnVwZGF0ZV91cmxfcGFyYW0sdG1wTmFtZSxmaWxlTmFtZSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlX3VybFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVEYXRhIHtcclxuICAgIC8v5ri45oiP6LWE5rqQ6YWN572u77yM5LuOanNvbiDor7vlj5ZcclxuICAgIHByaXZhdGUgX2dhbWVSZXNMaXN0ID0ge31cclxuXHJcbiAgICBwcml2YXRlIF9nYW1lTGlzdCA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfaGFsbEdhbWVMaXN0ID0gW107Ly/lpKfljoXmuLjmiI/liJfooahcclxuICAgIHByaXZhdGUgX21vcmVHYW1lTGlzdCA9IFtdOy8v5pu05aSa5ri45oiP5YiX6KGoXHJcbiAgICBwcml2YXRlIF9hdXRvRG93bkxpc3QgPSBbXSAvLyDoh6rliqjkuIvovb3lrZDmuLjmiI/liJfooahcclxuICAgIHByaXZhdGUgX2dhbWVkYXRhSW5pdEZpbmlzaCA9IGZhbHNlXHJcbiAgICBwcml2YXRlIF9nYW1lVHlwZXMgPSB7XHJcbiAgICAgICAgaGFsbDogJ2hhbGwnLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgYXV0b0Rvd25MaXN0KClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXV0b0Rvd25MaXN0XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCkge1xyXG4gICAgICAgIHRoaXMuX2dhbWVMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5fYXV0b0Rvd25MaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5fZ2FtZWRhdGFJbml0RmluaXNoID0gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdChnYW1lbGlzdD86IGFueSkge1xyXG4gICAgICAgIGlmICghZ2FtZWxpc3QpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoXCItLS0tZ2FtZUxpc3QtLS0tLS0gbnVsbFwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZWxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHN2ckdhbWVEYXRhID0gZ2FtZWxpc3RbaV1cclxuICAgICAgICAgICAgaWYoc3ZyR2FtZURhdGEuZ2FtZV9pZCA9PSBHYW1lLkNvbnRyb2wuR0FNRV9ERFpfSEpfQVJSWzBdKXtcclxuICAgICAgICAgICAgICAgIC8v5paX5Zyw5Li75ZCI6ZuGXHJcbiAgICAgICAgICAgICAgICBHYW1lLkNvbnRyb2wuR0FNRV9ERFpfSEpfQVJSLnB1c2goMjAwNSwgMjAxMyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRlbXBHYW1lTGlzdCA9IFtdXHJcbiAgICAgICAgbGV0IGhhbGxHYW1lTGlzdCA9IFtdO1xyXG4gICAgICAgIGxldCBtb3JlR2FtZUxpc3QgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3ZyR2FtZURhdGEgPSBnYW1lbGlzdFtpXVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgZ2FtZU1vZGVsID0gbmV3IEdhbWVJbmZvKCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBnYW1lTW9kZWwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdnJHYW1lRGF0YVtrZXldICE9IG51bGwgJiYgc3ZyR2FtZURhdGFba2V5XSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTW9kZWxba2V5XSA9IHN2ckdhbWVEYXRhW2tleV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGdhbWVSZXMgPSB0aGlzLl9nYW1lUmVzTGlzdFtzdnJHYW1lRGF0YS5nYW1lX2lkXVxyXG4gICAgICAgICAgICBpZihnYW1lUmVzID09IG51bGwgfHwgZ2FtZVJlcyA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuaJvuS4jeWIsOa4uOaIj1wiLCBzdnJHYW1lRGF0YS5nYW1lX2lkKVxyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChnYW1lTW9kZWwuaGl0X3VwZGF0ZSAmJiBnYW1lTW9kZWwuaGl0X3VwZGF0ZS52ZXJzaW9uICE9IG51bGwgJiYgZ2FtZU1vZGVsLmhpdF91cGRhdGUudmVyc2lvbiAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgIGdhbWVNb2RlbC52ZXJzaW9uID0gZ2FtZU1vZGVsLmhpdF91cGRhdGUudmVyc2lvblxyXG4gICAgICAgICAgICAgICAgZ2FtZU1vZGVsLnVwZGF0ZV91cmwgPSBnYW1lTW9kZWwuaGl0X3VwZGF0ZS51cmxbMF0gKyBcIi9cIiArIGdhbWVNb2RlbC5oaXRfdXBkYXRlLnBhcmFtXHJcbiAgICAgICAgICAgICAgICBnYW1lTW9kZWwudXBkYXRlX3VybF9saXN0ID0gZ2FtZU1vZGVsLmhpdF91cGRhdGUudXJsXHJcbiAgICAgICAgICAgICAgICBnYW1lTW9kZWwudXBkYXRlX3VybF9saXN0X25ldyA9IGdhbWVNb2RlbC5oaXRfdXBkYXRlLm5ld191cmxcclxuICAgICAgICAgICAgICAgIGdhbWVNb2RlbC51cGRhdGVfdXJsX3BhcmFtID0gZ2FtZU1vZGVsLmhpdF91cGRhdGUucGFyYW1cclxuICAgICAgICAgICAgICAgIGdhbWVNb2RlbC5pc0JhY2tWZXJzaW9uRmxhZyA9IGdhbWVNb2RlbC5oaXRfdXBkYXRlLmlzX2JhY2tcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnYW1lTW9kZWwubGV2ZWxUeXBlID0gZ2FtZVJlcy5sZXZlbFR5cGU7XHJcbiAgICAgICAgICAgIGdhbWVNb2RlbC5jaGVja01vbmV5ID0gZ2FtZVJlcy5jaGVja01vbmV5O1xyXG4gICAgICAgICAgICBnYW1lTW9kZWwuc3VwcG9ydFZlcnNpb24gPSBnYW1lUmVzLnN1cHBvcnRWZXJzaW9uO1xyXG4gICAgICAgICAgICBnYW1lTW9kZWwuc3VwcG9ydElvc1ZlcnNpb24gPSBnYW1lUmVzLnN1cHBvcnRJb3NWZXJzaW9uO1xyXG4gICAgICAgICAgICBnYW1lTW9kZWwubmF0aXZlX3ZlcnNpb24gPSBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5nZXROYXRpdmVIb3RVcGRhdGVWZXJzaW9uKGdhbWVNb2RlbC5nYW1lX2lkKTtcclxuICAgICAgICAgICAgZ2FtZU1vZGVsLnBvcnRyYWl0TW9kZWwgPSBnYW1lUmVzLnBvcnRyYWl0TW9kZWw7XHJcbiAgICAgICAgICAgIGdhbWVNb2RlbC5tYXJxdWVlU3RyVHlwZSA9IGdhbWVSZXMubWFycXVlZVN0clR5cGVcclxuXHJcbiAgICAgICAgICAgIGdhbWVNb2RlbC5wcmVmYWJOYW1lID0gZ2FtZVJlcy5wcmVmYWJOYW1lO1xyXG4gICAgICAgICAgICBnYW1lTW9kZWwuaGFzQ2hvb3NlTGV2ZWwgPSBnYW1lUmVzLmhhc0Nob29zZUxldmVsO1xyXG4gICAgICAgICAgICBnYW1lTW9kZWwuZ2FtZVR5cGUgPSBnYW1lUmVzLmdhbWVUeXBlXHJcbiAgICAgICAgICAgIGdhbWVNb2RlbC5pc0phY2tQb3RHYW1lID0gZ2FtZVJlcy5pc0phY2tQb3RHYW1lXHJcbiAgICAgICAgICAgIGlmKHN2ckdhbWVEYXRhLmF1dG9fZG93biA9PSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hdXRvRG93bkxpc3QucHVzaChzdnJHYW1lRGF0YS5nYW1lX2lkKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9nYW1lVHlwZXNbc3ZyR2FtZURhdGEuZ2FtZV9pZF0gPSBzdnJHYW1lRGF0YS5nYW1lX2lkO1xyXG4gICAgICAgICAgICBpZiAoZ2FtZU1vZGVsLnN0YXR1cyAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wR2FtZUxpc3QucHVzaChnYW1lTW9kZWwpXHJcbiAgICAgICAgICAgICAgICBpZihHYW1lLkNvbnRyb2wuR0FNRV9ERFpfSEpfQVJSLmluZGV4T2Yoc3ZyR2FtZURhdGEuZ2FtZV9pZCkgPD0gMCAmJiBnYW1lTW9kZWwucG9zID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbGxHYW1lTGlzdC5wdXNoKGdhbWVNb2RlbClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGdhbWVNb2RlbC5wb3MgIT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9yZUdhbWVMaXN0LnB1c2goZ2FtZU1vZGVsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9nYW1lVHlwZXNbXCJoYWxsXCJdID0gXCJoYWxsXCI7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNvcnRGdW5jKGEsIGIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGEucG93ZXIgLSBiLnBvd2VyXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZW1wR2FtZUxpc3Quc29ydChzb3J0RnVuYylcclxuICAgICAgICBoYWxsR2FtZUxpc3Quc29ydChzb3J0RnVuYylcclxuICAgICAgICBtb3JlR2FtZUxpc3Quc29ydChzb3J0RnVuYylcclxuICAgICAgICB0aGlzLl9tb3JlR2FtZUxpc3QgPSBtb3JlR2FtZUxpc3Q7XHJcbiAgICAgICAgdGhpcy5fZ2FtZUxpc3QgPSB0ZW1wR2FtZUxpc3Q7XHJcbiAgICAgICAgdGhpcy5faGFsbEdhbWVMaXN0ID0gaGFsbEdhbWVMaXN0O1xyXG4gICAgICAgIHRoaXMuZGF0YUluaXRGaW5pc2ggPSB0cnVlXHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBwdWJsaWMgc2V0IGRhdGFJbml0RmluaXNoKGZsYWcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fZ2FtZWRhdGFJbml0RmluaXNoID0gZmxhZ1xyXG4gICAgICAgIGlmKGZsYWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuVVBEQVRFX0dBTUVfTElTVClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBkYXRhSW5pdEZpbmlzaCgpXHJcbiAgICB7XHJcbiAgICAgICByZXR1cm4gIHRoaXMuX2dhbWVkYXRhSW5pdEZpbmlzaCBcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgZ2FtZUxpc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dhbWVMaXN0O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBtb3JlR2FtZUxpc3QoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9yZUdhbWVMaXN0O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBoYWxsR2FtZUxpc3QoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5faGFsbEdhbWVMaXN0O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBnYW1lVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dhbWVUeXBlcztcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRHYW1lSW5mbyhnaWQpOiBhbnkge1xyXG4gICAgICAgIGxldCBnYW1lSW5mbyA9IHt9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9nYW1lTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdGVtcEluZm8gPSB0aGlzLl9nYW1lTGlzdFtpXVxyXG4gICAgICAgICAgICBpZiAodGVtcEluZm8uZ2FtZV9pZCA9PSBnaWQpIHtcclxuICAgICAgICAgICAgICAgIGdhbWVJbmZvID0gdGVtcEluZm87XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZ2FtZUluZm87XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBoYXNNb3JlR2FtZUxpc3QoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9yZUdhbWVMaXN0Lmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEdhbWVSZXNJbmZvKGdpZClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2FtZVJlc0xpc3RbZ2lkXSB8fCB7fVxyXG4gICAgfVxyXG5cclxuICAgIC8v5ri45oiPSWNvbiDotYTmupDphY3nva5cclxuICAgIHB1YmxpYyBzZXRHYW1lSWNvblJlc0NmZyhjZmcpe1xyXG4gICAgICAgIHRoaXMuX2dhbWVSZXNMaXN0ID0gY2ZnXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBoYXNHYW1lKGdpZClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRHYW1lSW5mbyhnaWQpICE9IG51bGw7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXRSZXR1cm5HYW1lU3RyKGdpZDogbnVtYmVyLCBsdjogc3RyaW5nLCBjYW5SZXR1cm46IGJvb2xlYW4pe1xyXG4gICAgICAgIGxldCBnYW1lRGF0YSA9IEdsb2JhbC5HYW1lRGF0YS5nZXRHYW1lSW5mbyhnaWQpO1xyXG4gICAgICAgIGxldCBsdk5hbWUgPSB0aGlzLmdldExldmVsU3RyKGdhbWVEYXRhLmxldmVscyB8fCBbXSwgbHYpO1xyXG4gICAgICAgIC8vIGxldCBzdHIgPSBjYW5SZXR1cm4gPyBg5oKo5b2T5YmN5q2j5Zyo44CQJHtnYW1lRGF0YS5uYW1lfeOAkSR7bHZOYW1lfeS4re+8jOaYr+WQpuWbnuWIsOivpea4uOaIj+S4re+8n2AgOiBg5oKo5b2T5YmN5q2j5Zyo44CQJHtnYW1lRGF0YS5uYW1lfeOAkSR7bHZOYW1lfeS4re+8jOaXoOazleWKoOWFpeWFtuS7lua4uOaIj++8gWA7XHJcbiAgICAgICAgbGV0IHN0ciA9IGDmgqjlvZPliY3mraPlnKjjgJAke2dhbWVEYXRhLm5hbWV944CRJHtsdk5hbWV95Lit77yM5piv5ZCm5Zue5Yiw6K+l5ri45oiP5Lit77yfYDtcclxuICAgICAgICByZXR1cm4gc3RyXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRMZXZlbFN0cihsZXZlbHM6IGFueVtdID0gW10sIHNlYXJjaEx2OiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBzdHIgPSBcIlwiO1xyXG4gICAgICAgIGxldCBjb3VudCA9IGxldmVscy5sZW5ndGg7XHJcbiAgICAgICAgaWYgKGNvdW50ID4gMSl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0gMDsgaSA8IGxldmVscy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5mbyA9IGxldmVsc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmZvLmxldmVsID09IHNlYXJjaEx2KXtcclxuICAgICAgICAgICAgICAgICAgICBzdHIgPSBgLeOAkCR7aW5mby5TY2VuZU5hbWV944CRYDsgICAgIC8vIC3jgJDlnLrmrKHlkI3jgJFcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGNoZWNrSGFzQ3VzdG9tTG9hZGluZyhnaWQ6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IGluZm8gPSB0aGlzLmdldEdhbWVSZXNJbmZvKGdpZCk7XHJcbiAgICAgICAgcmV0dXJuICEhaW5mby5pc0N1c3RvbUxvYWRpbmc7XHJcbiAgICB9XHJcbn0iXX0=