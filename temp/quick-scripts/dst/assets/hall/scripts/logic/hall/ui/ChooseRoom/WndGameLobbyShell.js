
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/ChooseRoom/WndGameLobbyShell.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxDaG9vc2VSb29tXFxXbmRHYW1lTG9iYnlTaGVsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQWdFO0FBRWhFLElBQVksUUFlWDtBQWZELFdBQVksUUFBUTtJQUNoQixxQ0FBTyxDQUFBO0lBQ1AscUNBQU8sQ0FBQTtJQUNQLFdBQVc7SUFDWCxpREFBYSxDQUFBO0lBQ2IsWUFBWTtJQUNaLCtDQUFZLENBQUE7SUFDWixXQUFXO0lBQ1gsdUNBQVEsQ0FBQTtJQUNSLGtDQUFrQztJQUNsQywrQ0FBWSxDQUFBO0lBQ1osUUFBUTtJQUNSLHFEQUFlLENBQUE7SUFDZixRQUFRO0lBQ1IsNkNBQVcsQ0FBQTtBQUNmLENBQUMsRUFmVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQWVuQjtBQUVELElBQU0sU0FBUyxHQUFHLENBQUMsQ0FBQztBQUNwQjtJQUErQyxxQ0FBTztJQUF0RDtRQUFBLHFFQTRNQztRQTFNVyxhQUFPLEdBQXlCLElBQUksR0FBRyxDQUFDO1FBQ3hDLGFBQU8sR0FBYSxFQUFFLENBQUM7UUFDdkIsa0JBQVksR0FBVyxDQUFDLENBQUM7O0lBd01yQyxDQUFDO0lBck1hLGtDQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxtQkFBbUIsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsNkNBQTZDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBVyxDQUFDLE9BQU8sQ0FBQztJQUMzQyxDQUFDO0lBRVMsb0NBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ2hELElB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QUM7SUFFUyxxQ0FBUyxHQUFuQjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0E1TUEsQUE0TUMsQ0E1TThDLGlCQUFPLEdBNE1yRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXbmRCYXNlLCB7IERlc3RvcnlUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvV25kQmFzZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gR2FtZVR5cGUge1xyXG4gICAgUFZFID0gMCxcclxuICAgIFBWUCA9IDEsXHJcbiAgICAvKiog6Lev54+g57G75Z6LICovXHJcbiAgICBUUkVOREdBTUUgPSAyLFxyXG4gICAgLyoqIOiAgeiZjuacuuexu+WeiyAqL1xyXG4gICAgTFVDS0dBTUUgPSAzLFxyXG4gICAgLyoqIOaNlemxvOexu+WeiyAqL1xyXG4gICAgRklTSCA9IDQsXHJcbiAgICAvKirnm7TmjqXov5vmuLjmiI/vvIjmmoLlrprnvo7mnK/mnKrmj5DkvpvlpKfljoXpgInlnLrnmoTmuLjmiI8g5aaCIOe6ouWMheaOpem+me+8iSAqL1xyXG4gICAgTk9DSEFOR0UgPSA1LFxyXG4gICAgLyoq57qi5YyFICovXHJcbiAgICBSRURQQUNLR0FNRSA9IDYsXHJcbiAgICAvKuWkluaOpea4uOaIjyovXHJcbiAgICBXRUJHQU1FID0gOFxyXG59XHJcblxyXG5jb25zdCBrZWVwQ291bnQgPSAxO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXbmRHYW1lTG9iYnlTaGVsbCBleHRlbmRzIFduZEJhc2V7XHJcbiAgICBwcml2YXRlIHBvb2xOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBrZWVwTWFwOiBNYXA8bnVtYmVyLCBjYy5Ob2RlPiA9IG5ldyBNYXA7XHJcbiAgICBwcml2YXRlIGtlZXBBcnI6IG51bWJlcltdID0gW107XHJcbiAgICBwcml2YXRlIGFjdGl2ZUdhbWVJZDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgYWN0aXZlR2FtZURhdGE6IGFueTtcclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZEdhbWVMb2JieVNoZWxsXCI7XHJcbiAgICAgICAgdGhpcy5sYXllciA9IFwiRnVsbFNjcmVlbkxheWVyXCI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvQ2hvb3NlUm9vbS9HYW1lTG9iYnlTaGVsbFVJXCI7XHJcbiAgICAgICAgdGhpcy5kZXN0b3J5VHlwZSA9IERlc3RvcnlUeXBlLlBlcnNpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLndpZHRoID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUud2lkdGg7XHJcbiAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLmhlaWdodDtcclxuICAgICAgICB0aGlzLnBvb2xOb2RlID0gY2MuZmluZChcInBvb2xcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLnBvb2xOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIEdhbWUuRXZlbnQub24oR2xvYmFsRXZlbnQuT25DbG9zZUdhbWVMb2JieSwgdGhpcywgdGhpcy5jbG9zZVduZCk7XHJcbiAgICAgICAgR2FtZS5FdmVudC5vbihHbG9iYWxFdmVudC5PbkdvdG9HYW1lU2NlbmUsIHRoaXMsIHRoaXMuZ290b0dhbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbk9wZW4oYXJnczogYW55W10pe1xyXG4gICAgICAgIGlmIChhcmdzICYmIGFyZ3MubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgW3RoaXMuYWN0aXZlR2FtZUlkXSA9IGFyZ3M7XHJcbiAgICAgICAgaWYgKEdhbWUuR2FtZVByZWxvYWRUb29sLmN1ckdhbWVJZCAhPSB0aGlzLmFjdGl2ZUdhbWVJZCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VXbmQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIC8vY29uc29sZS5lcnJvcihcIuW8guW4uG9uT3BlblwiLCBHYW1lLkdhbWVQcmVsb2FkVG9vbC5jdXJHYW1lSWQsIHRoaXMuYWN0aXZlR2FtZUlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zZXRHYW1lQ29udGVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNob3coKXtcclxuICAgICAgICBsZXQgW2dpZF0gPSB0aGlzLmFyZ3M7XHJcbiAgICAgICAgaWYgKEdhbWUuR2FtZVByZWxvYWRUb29sLmN1ckdhbWVJZCAhPSBnaWQpXHJcbiAgICAgICAgICAgIHJldHVybiAvL2NvbnNvbGUuZXJyb3IoXCLlvILluLhyZXNob3dcIiwgR2FtZS5HYW1lUHJlbG9hZFRvb2wuY3VyR2FtZUlkLCBnaWQpO1xyXG4gICAgICAgIGlmIChnaWQgPT0gdGhpcy5hY3RpdmVHYW1lSWQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5hY3RpdmVHYW1lSWQgJiYgdGhpcy5rZWVwTWFwLmhhcyh0aGlzLmFjdGl2ZUdhbWVJZCkgJiYgY2MuaXNWYWxpZCh0aGlzLmtlZXBNYXAuZ2V0KHRoaXMuYWN0aXZlR2FtZUlkKSkpe1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMua2VlcE1hcC5nZXQodGhpcy5hY3RpdmVHYW1lSWQpO1xyXG4gICAgICAgICAgICBub2RlLnNldFBhcmVudCh0aGlzLnBvb2xOb2RlKTtcclxuICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hY3RpdmVHYW1lSWQgPSBnaWQ7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0R2FtZUNvbnRlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldEdhbWVDb250ZW50KCl7XHJcbiAgICAgICAgbGV0IGJ1bmRsZU5hbWUgPSBHYW1lLkdhbWVQcmVsb2FkVG9vbC5jdXJCdW5kbGVOYW1lO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlR2FtZURhdGEgPSBHbG9iYWwuR2FtZURhdGEuZ2V0R2FtZUluZm8odGhpcy5hY3RpdmVHYW1lSWQpO1xyXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUdhbWVJZCAmJiBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmNoZWNrQnVuZGxlVmFsaWQoYnVuZGxlTmFtZSkpe1xyXG4gICAgICAgICAgICBpZiAodGhpcy5rZWVwTWFwLmhhcyh0aGlzLmFjdGl2ZUdhbWVJZCkgJiYgY2MuaXNWYWxpZCh0aGlzLmtlZXBNYXAuZ2V0KHRoaXMuYWN0aXZlR2FtZUlkKSkpe1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwidXNlIGtlZXBNYXAgbm9kZVwiLCB0aGlzLmFjdGl2ZUdhbWVJZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMua2VlcE1hcC5nZXQodGhpcy5hY3RpdmVHYW1lSWQpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zZXRQYXJlbnQodGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IHByZWZhYiA9IEdhbWUuR2FtZVByZWxvYWRUb29sLmdldFNlbGVjdFByZWZhYihHYW1lLkdhbWVQcmVsb2FkVG9vbC5sb2JieVVJUGF0aCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJlZmFiKXtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJ1c2UgbmV3IG5vZGUsIHByZWZhYi5yZWZDb3VudFwiLCB0aGlzLmFjdGl2ZUdhbWVJZCwgcHJlZmFiLnJlZkNvdW50KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IDxjYy5Ob2RlPmNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRQYXJlbnQodGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZWVwTWFwLnNldCh0aGlzLmFjdGl2ZUdhbWVJZCwgbm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZWVwQXJyLnB1c2godGhpcy5hY3RpdmVHYW1lSWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgLy8gIGNvbnNvbGUuZXJyb3IoXCJlcnJvciwg5pyq6aKE5Yqg6L295oiW5om+5LiN5YiwTG9iYnlVSVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlV25kKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgIC8vICBjb25zb2xlLmVycm9yKFwiZXJyb3IsIOW9k+WJjea4uOaIj+mAieWcumJ1bmRsZeacqumihOWKoOi9vVwiLCB0aGlzLmFjdGl2ZUdhbWVJZCwgYnVuZGxlTmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VXbmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbG9zZVduZCgpe1xyXG4gICAgICAgIEdhbWUuR2FtZVByZWxvYWRUb29sLnJlbGVhc2VLZWVwQXNzZXQodGhpcy5hY3RpdmVHYW1lSWQsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tMZWF2ZUtlZXBDb3VudCgpOyAgICAgLy8g5YWz6Zet6YCA5Ye66YCJ5Zy65pe25qOA5rWL5LiK6ZmQ6YeK5pS+XHJcbiAgICAgICAgaWYgKHRoaXMua2VlcE1hcC5oYXModGhpcy5hY3RpdmVHYW1lSWQpKXsgICAgICAgICAgIC8vIGRlYnVnIOmAgOWHuumhtemdouaXtuaJi+WKqOWFs+mXreiKgueCuSwg6YG/5YWN5byA5Y+m5LiA5Liq5ri45oiP5pe2IOinpuWPkW9uRW5hYmxlXHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5rZWVwTWFwLmdldCh0aGlzLmFjdGl2ZUdhbWVJZCk7XHJcbiAgICAgICAgICAgIGlmIChub2RlICYmIGNjLmlzVmFsaWQobm9kZSkpe1xyXG4gICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2V0UGFyZW50KHRoaXMucG9vbE5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5VSS5jbG9zZSh0aGlzLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ290b0dhbWUobGV2ZWw6IHN0cmluZywgZ2FtZURhdGE6b2JqZWN0ID0gbnVsbCl7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrTW9uZXkobGV2ZWwsIGdhbWVEYXRhKSB8fCAhdGhpcy5jaGVja1ZlcnNpb24oKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY2hlY2tFbnRlcktlZXBDb3VudCgpOyAgICAgICAgIFxyXG4gICAgICAgIGxldCBlbnRlckZ1bmMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGdhbWVEYXRhKXtcclxuICAgICAgICAgICAgICAgIEdhbWUuQ29udHJvbC5jdXJHaWQgPSBnYW1lRGF0YVtcImdhbWVpZFwiXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBHYW1lLkNvbnRyb2wuY3VyTHYgPSBsZXZlbDtcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlJlY29yZEdhbWVMaXN0T2Zmc2V0WCk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5TY2VuZU1hbmFnZXIubG9hZEdhbWVTY2VuZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5hY3RpdmVHYW1lRGF0YS5wb3J0cmFpdE1vZGVsKSB7ICAgIC8vIOajgOafpeaYr+WQpumcgOimgeaYvuekuuaoquerluWxj+WIh+aNouaPkOekulxyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1BvcnRyYWl0U2NyZWVuTm90aWNlKGVudGVyRnVuYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBlbnRlckZ1bmMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja01vbmV5KGxldmVsID0gXCJsMFwiLCBnYW1lRGF0YSA9IG51bGwpIHtcclxuICAgICAgICBsZXQgZ2FtZU9iaiA9IG51bGw7XHJcbiAgICAgICAgaWYoZ2FtZURhdGEpe1xyXG4gICAgICAgICAgICBnYW1lT2JqID0gZ2FtZURhdGE7XHJcbiAgICAgICAgfWVsc2UgaWYgKHRoaXMuYWN0aXZlR2FtZURhdGEubGV2ZWxzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmFjdGl2ZUdhbWVEYXRhLmxldmVscy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBsZXZlbFN0ciA9IHRoaXMuYWN0aXZlR2FtZURhdGEubGV2ZWxzW2luZGV4XS5sZXZlbDtcclxuICAgICAgICAgICAgICAgIGlmKGxldmVsU3RyICYmIGxldmVsU3RyID09IGxldmVsKXtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lT2JqID0gdGhpcy5hY3RpdmVHYW1lRGF0YS5sZXZlbHNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBwb2ludExvdyA9IGdhbWVPYmouUG9pbnRMb3c7XHJcbiAgICAgICAgaWYgKHBvaW50TG93ICYmIEdsb2JhbC5QbGF5ZXJEYXRhLnBvaW50IDwgcG9pbnRMb3cpIHtcclxuICAgICAgICAgICAgbGV0IGxpbWl0ID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIocG9pbnRMb3cpO1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gXCLmuLjmiI/lh4blhaVcIiArIGxpbWl0ICsgXCLph5HluIHvvIzor7fmgqjlhYXlgLzlk6bvvIFcIjtcclxuICAgICAgICAgICAgR2xvYmFsLlRvb2xraXQuc2hvd01vbmV5Tm90RW5vdWdoKHN0cik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja1ZlcnNpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlR2FtZURhdGEuc3VwcG9ydFZlcnNpb24gJiYgdGhpcy5hY3RpdmVHYW1lRGF0YS5zdXBwb3J0VmVyc2lvbiA+IDApIHtcclxuICAgICAgICAgICAgaWYgKCFHbG9iYWwuVG9vbGtpdC5jaGVja1ZlcnNpb25TdXBwb3J0KHRoaXMuYWN0aXZlR2FtZURhdGEuc3VwcG9ydFZlcnNpb24sIHRoaXMuYWN0aXZlR2FtZURhdGEuc3VwcG9ydElvc1ZlcnNpb24pKSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1llc05vQm94KFwi54mI5pys6L+H5pen77yM6K+35LiL6L295paw5YyF5L2/55So6K+l5Yqf6IO9XCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5zeXMub3BlblVSTChHbG9iYWwuU2V0dGluZy5VcmxzLmRvd25Mb2FkVXJsKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOaMieeFp+iuvuWumuS/neeVmea4uOaIj+mAieWcuuaVsOi1hOa6kCDmlrDlop7mmL7npLrpgInlnLrotYTmupDml7bmo4DmtYsgKi9cclxuICAgIHByaXZhdGUgY2hlY2tMZWF2ZUtlZXBDb3VudCgpe1xyXG4gICAgICAgIGlmICh0aGlzLmtlZXBBcnIubGVuZ3RoID4gMCAmJiB0aGlzLmtlZXBBcnIubGVuZ3RoID09IGtlZXBDb3VudCArIDEpeyAgIC8vIOi2heWHuuS/neWtmOS4iumZkOS4gOS4qiDlsLHmuIXnkIbkuIDkuKpcclxuICAgICAgICAgICAgbGV0IG9sZEdpZCA9IHRoaXMua2VlcEFyci5zaGlmdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbGVhc2VPbmVLZWVwKG9sZEdpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmjInnhaforr7lrprkv53nlZnmuLjmiI/pgInlnLrmlbDotYTmupAgKi9cclxuICAgIHByaXZhdGUgY2hlY2tFbnRlcktlZXBDb3VudCgpe1xyXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUdhbWVEYXRhLmdhbWVUeXBlID09IEdhbWVUeXBlLkZJU0gpeyAgICAgICAgLy8g6L+b5YWl5o2V6bG85ri45oiP5pe26KaB5qOA5rWL5Y+q5L+d55WZ5o2V6bG86YKj5Lu96LWE5rqQXHJcbiAgICAgICAgICAgIHRoaXMua2VlcE9ubHlDdXJyZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5rZWVwQXJyLmxlbmd0aCA9PSAxKXsgICAgICAgICAgICAgICAgICAvLyDkv53nlZnlvZPliY3pgqPkuKogXHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coXCJrZWVwIGN1cnJlbnQgd2l0aCBubyBhY3Rpb25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmIChrZWVwQ291bnQgPiAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tMZWF2ZUtlZXBDb3VudCgpOyAgICAgICAgICAgICAvLyDmjInnhafkuIrpmZDmo4DmtYvph4rmlL5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog5L+d55WZ5b2T5YmN5ri45oiP6YCJ5Zy6LCDlhbbkvZnliKDpmaTph4rmlL4gKi9cclxuICAgIHByaXZhdGUga2VlcE9ubHlDdXJyZW50KCl7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5rZWVwQXJyLmxlbmd0aDtcclxuICAgICAgICBpZiAoY291bnQgPiAxKXtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGdpZCA9IHRoaXMua2VlcEFycltpXTtcclxuICAgICAgICAgICAgICAgIGlmIChnaWQgIT09IHRoaXMuYWN0aXZlR2FtZUlkKSAgLy8g5Y+q5L+d55WZ5b2T5YmNZ2lkXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWxlYXNlT25lS2VlcChnaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMua2VlcEFyciA9IFt0aGlzLmFjdGl2ZUdhbWVJZF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVsZWFzZU9uZUtlZXAoZ2lkOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBub2RlID0gdGhpcy5rZWVwTWFwLmdldChnaWQpO1xyXG4gICAgICAgIGlmIChub2RlKXtcclxuICAgICAgICAgICAgbm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLmtlZXBNYXAuZGVsZXRlKGdpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdhbWUuR2FtZVByZWxvYWRUb29sLnJlbGVhc2VLZWVwQXNzZXQoZ2lkLCBmYWxzZSk7XHJcbiAgICAgICAgR2FtZS5HYW1lUHJlbG9hZFRvb2wucmVsZWFzZVByZWxvYWRCdW5kbGUoZ2lkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5rZWVwTWFwLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5rZWVwQXJyID0gW107XHJcbiAgICB9XHJcbn0iXX0=