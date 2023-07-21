"use strict";
cc._RF.push(module, '44145uHD3BBsI+yTcJEf5Wq', 'WndGameLobbyShell');
// hall/scripts/logic/hall/ui/ChooseRoom/WndGameLobbyShell.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameType = void 0;
var WndBase_1 = require("../../../core/ui/WndBase");
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
    /*外接游戏*/
    GameType[GameType["WEBGAME"] = 8] = "WEBGAME";
})(GameType = exports.GameType || (exports.GameType = {}));
var keepCount = 1;
var WndGameLobbyShell = /** @class */ (function (_super) {
    __extends(WndGameLobbyShell, _super);
    function WndGameLobbyShell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.keepMap = new Map;
        _this.keepArr = [];
        _this.activeGameId = 0;
        return _this;
    }
    WndGameLobbyShell.prototype.onInit = function () {
        this.name = "WndGameLobbyShell";
        this.layer = "FullScreenLayer";
        this.resPath = "hall/prefabs/ui/ChooseRoom/GameLobbyShellUI";
        this.destoryType = WndBase_1.DestoryType.Persist;
    };
    WndGameLobbyShell.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.poolNode = cc.find("pool", this.node);
        this.poolNode.active = false;
        Game.Event.on(GlobalEvent.OnCloseGameLobby, this, this.closeWnd);
        Game.Event.on(GlobalEvent.OnGotoGameScene, this, this.gotoGame);
    };
    WndGameLobbyShell.prototype.onOpen = function (args) {
        if (args && args.length > 0)
            this.activeGameId = args[0];
        if (Game.GamePreloadTool.curGameId != this.activeGameId) {
            this.closeWnd();
            return; //console.error("异常onOpen", Game.GamePreloadTool.curGameId, this.activeGameId);
        }
        this.setGameContent();
    };
    WndGameLobbyShell.prototype.reshow = function () {
        var gid = this.args[0];
        if (Game.GamePreloadTool.curGameId != gid)
            return; //console.error("异常reshow", Game.GamePreloadTool.curGameId, gid);
        if (gid == this.activeGameId)
            return;
        if (this.activeGameId && this.keepMap.has(this.activeGameId) && cc.isValid(this.keepMap.get(this.activeGameId))) {
            var node = this.keepMap.get(this.activeGameId);
            node.setParent(this.poolNode);
            node.active = false;
        }
        this.activeGameId = gid;
        this.setGameContent();
    };
    WndGameLobbyShell.prototype.setGameContent = function () {
        var bundleName = Game.GamePreloadTool.curBundleName;
        this.activeGameData = Global.GameData.getGameInfo(this.activeGameId);
        if (this.activeGameId && Global.ResourceManager.checkBundleValid(bundleName)) {
            if (this.keepMap.has(this.activeGameId) && cc.isValid(this.keepMap.get(this.activeGameId))) {
                Logger.error("use keepMap node", this.activeGameId);
                var node = this.keepMap.get(this.activeGameId);
                node.setParent(this.node);
                node.active = true;
            }
            else {
                var prefab = Game.GamePreloadTool.getSelectPrefab(Game.GamePreloadTool.lobbyUIPath, true);
                if (prefab) {
                    Logger.error("use new node, prefab.refCount", this.activeGameId, prefab.refCount);
                    var node = cc.instantiate(prefab);
                    node.setParent(this.node);
                    node.active = true;
                    this.keepMap.set(this.activeGameId, node);
                    this.keepArr.push(this.activeGameId);
                }
                else {
                    //  console.error("error, 未预加载或找不到LobbyUI");
                    this.closeWnd();
                }
            }
        }
        else {
            //  console.error("error, 当前游戏选场bundle未预加载", this.activeGameId, bundleName);
            this.closeWnd();
        }
    };
    WndGameLobbyShell.prototype.closeWnd = function () {
        Game.GamePreloadTool.releaseKeepAsset(this.activeGameId, true);
        this.checkLeaveKeepCount(); // 关闭退出选场时检测上限释放
        if (this.keepMap.has(this.activeGameId)) { // debug 退出页面时手动关闭节点, 避免开另一个游戏时 触发onEnable
            var node = this.keepMap.get(this.activeGameId);
            if (node && cc.isValid(node)) {
                node.active = false;
                node.setParent(this.poolNode);
            }
        }
        Global.UI.close(this.name);
    };
    WndGameLobbyShell.prototype.gotoGame = function (level, gameData) {
        if (gameData === void 0) { gameData = null; }
        if (!this.checkMoney(level, gameData) || !this.checkVersion())
            return;
        this.checkEnterKeepCount();
        var enterFunc = function () {
            if (gameData) {
                Game.Control.curGid = gameData["gameid"];
            }
            Game.Control.curLv = level;
            Global.Event.event(GlobalEvent.RecordGameListOffsetX);
            Global.SceneManager.loadGameScene();
        };
        if (this.activeGameData.portraitModel) { // 检查是否需要显示横竖屏切换提示
            Global.UI.showPortraitScreenNotice(enterFunc);
        }
        else {
            enterFunc();
        }
    };
    WndGameLobbyShell.prototype.checkMoney = function (level, gameData) {
        if (level === void 0) { level = "l0"; }
        if (gameData === void 0) { gameData = null; }
        var gameObj = null;
        if (gameData) {
            gameObj = gameData;
        }
        else if (this.activeGameData.levels) {
            for (var index = 0; index < this.activeGameData.levels.length; index++) {
                var levelStr = this.activeGameData.levels[index].level;
                if (levelStr && levelStr == level) {
                    gameObj = this.activeGameData.levels[index];
                    break;
                }
            }
        }
        var pointLow = gameObj.PointLow;
        if (pointLow && Global.PlayerData.point < pointLow) {
            var limit = Global.Toolkit.formatPointStr(pointLow);
            var str = "游戏准入" + limit + "金币，请您充值哦！";
            Global.Toolkit.showMoneyNotEnough(str);
            return false;
        }
        return true;
    };
    WndGameLobbyShell.prototype.checkVersion = function () {
        if (this.activeGameData.supportVersion && this.activeGameData.supportVersion > 0) {
            if (!Global.Toolkit.checkVersionSupport(this.activeGameData.supportVersion, this.activeGameData.supportIosVersion)) {
                Global.UI.showYesNoBox("版本过旧，请下载新包使用该功能", function () {
                    cc.sys.openURL(Global.Setting.Urls.downLoadUrl);
                });
                return false;
            }
        }
        return true;
    };
    /** 按照设定保留游戏选场数资源 新增显示选场资源时检测 */
    WndGameLobbyShell.prototype.checkLeaveKeepCount = function () {
        if (this.keepArr.length > 0 && this.keepArr.length == keepCount + 1) { // 超出保存上限一个 就清理一个
            var oldGid = this.keepArr.shift();
            this.releaseOneKeep(oldGid);
        }
    };
    /** 按照设定保留游戏选场数资源 */
    WndGameLobbyShell.prototype.checkEnterKeepCount = function () {
        if (this.activeGameData.gameType == GameType.FISH) { // 进入捕鱼游戏时要检测只保留捕鱼那份资源
            this.keepOnlyCurrent();
        }
        else if (this.keepArr.length == 1) { // 保留当前那个 
            Logger.log("keep current with no action");
        }
        else {
            if (keepCount > 0) {
                this.checkLeaveKeepCount(); // 按照上限检测释放
            }
        }
    };
    /** 保留当前游戏选场, 其余删除释放 */
    WndGameLobbyShell.prototype.keepOnlyCurrent = function () {
        var count = this.keepArr.length;
        if (count > 1) {
            for (var i = 0; i < count; i++) {
                var gid = this.keepArr[i];
                if (gid !== this.activeGameId) // 只保留当前gid
                    this.releaseOneKeep(gid);
            }
            this.keepArr = [this.activeGameId];
        }
    };
    WndGameLobbyShell.prototype.releaseOneKeep = function (gid) {
        var node = this.keepMap.get(gid);
        if (node) {
            node.removeFromParent();
            node.active = false;
            node.destroy();
            this.keepMap.delete(gid);
        }
        Game.GamePreloadTool.releaseKeepAsset(gid, false);
        Game.GamePreloadTool.releasePreloadBundle(gid);
    };
    WndGameLobbyShell.prototype.onDispose = function () {
        this.keepMap.clear();
        this.keepArr = [];
    };
    return WndGameLobbyShell;
}(WndBase_1.default));
exports.default = WndGameLobbyShell;

cc._RF.pop();