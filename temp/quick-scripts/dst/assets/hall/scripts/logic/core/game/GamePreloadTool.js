
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/game/GamePreloadTool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '84058doDNxNPJ349bYtneoT', 'GamePreloadTool');
// hall/scripts/logic/core/game/GamePreloadTool.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GamePreloadTool = /** @class */ (function () {
    function GamePreloadTool() {
        this.basePrefabPath = "prefabs/";
        this.lobbyUIPath = this.basePrefabPath + "LobbyUI";
        this.rulePop = this.basePrefabPath + "RulePop";
        this.settingPop = this.basePrefabPath + "SettingPop";
        /** 用于储存需要跨bundle调用的变量 */
        this.codeCache = {};
        this.curGid = 0;
        this.keepAssetMap = new Map;
    }
    Object.defineProperty(GamePreloadTool.prototype, "curGameId", {
        get: function () {
            return this.curGid;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GamePreloadTool.prototype, "curBundleName", {
        get: function () {
            return this.getPreloadBundleName(this.curGid);
        },
        enumerable: false,
        configurable: true
    });
    GamePreloadTool.prototype.getPreloadBundleName = function (gid) {
        return gid + "_preload";
    };
    GamePreloadTool.prototype.setup = function (gid) {
        Logger.error("GamePreloadTool setup", this.curGid, gid);
        this.curGid = gid;
        Global.SceneManager.setGameSearchPath(String(gid));
        this.codeCache = {};
    };
    GamePreloadTool.prototype.reShowLobbyShellWnd = function () {
        Game.GamePreloadTool.releaseKeepAsset(this.curGid, true);
    };
    GamePreloadTool.prototype.preloadBundle = function () {
        var _this = this;
        try {
            return new Promise(function (resolve, reject) {
                Global.ResourceManager.loadBundle(_this.curBundleName, function (err, bundle) {
                    if (err) {
                        Logger.error("加载子游戏bundle失败--------preloadBundle------------");
                        Global.Toolkit.removeDir(_this.curGid, err);
                        reject(err);
                    }
                    else
                        resolve(bundle);
                });
            });
        }
        catch (error) {
            //  console.error(error);
            Global.Toolkit.removeDir(this.curGid, error);
            // expected output: ReferenceError: nonExistentFunction is not defined
            // Note - error messages will vary depending on browser
        }
    };
    GamePreloadTool.prototype.preloadPrefab = function (path, isCollect) {
        var _this = this;
        if (isCollect === void 0) { isCollect = false; }
        var prefab = this.getSelectPrefab(path, isCollect);
        var wholePath = this.getAssetWholePath(path);
        if (prefab) {
            return prefab;
        }
        else {
            return new Promise(function (resolve, reject) {
                Global.ResourceManager.loadBundleRes(_this.curBundleName, path, function (err, res) {
                    if (err)
                        reject(err);
                    else {
                        if (isCollect) {
                            if (_this.keepAssetMap.has(wholePath)) {
                                var cache = _this.keepAssetMap.get(wholePath);
                                cache.count++;
                            }
                            else {
                                var chche = new CacheAssetInfo(_this.curGid, path, res, 1);
                                _this.keepAssetMap.set(wholePath, chche);
                            }
                            res.addRef();
                        }
                        Global.ResourceManager.setAutoReleaseRecursively(res, false);
                        resolve(res);
                    }
                }, null);
            });
        }
    };
    GamePreloadTool.prototype.lazyPreloadPrefab = function () {
        Global.ResourceManager.lazyLoadBundleRes(this.curBundleName, [this.rulePop, this.settingPop], cc.Prefab);
    };
    GamePreloadTool.prototype.getSelectPrefab = function (path, isCollect) {
        if (isCollect === void 0) { isCollect = true; }
        var prefab = Global.ResourceManager.getBundleRes(this.curBundleName, path, cc.Prefab);
        if (prefab) {
            if (isCollect) {
                var wholePath = this.getAssetWholePath(path);
                if (this.keepAssetMap.has(wholePath)) {
                    var cache = this.keepAssetMap.get(wholePath);
                    cache.count++;
                }
                else {
                    var chche = new CacheAssetInfo(this.curGid, path, prefab, 1);
                    this.keepAssetMap.set(wholePath, chche);
                }
                prefab.addRef();
            }
            return prefab;
        }
    };
    GamePreloadTool.prototype.getAssetWholePath = function (path) {
        return this.curGid + "_" + path;
    };
    GamePreloadTool.prototype.releasePreloadBundle = function (gid) {
        Global.ResourceManager.releaseHelper.releaseBundle(this.getPreloadBundleName(gid));
    };
    GamePreloadTool.prototype.releaseKeepAsset = function (gid, retainOne) {
        var _this = this;
        if (retainOne === void 0) { retainOne = false; }
        var keepOne = retainOne ? 1 : 0;
        var deleteArr = [];
        this.keepAssetMap.forEach(function (info, path) {
            if (info.gid == gid) {
                var count = info.count;
                if (count > 0) {
                    for (var i = 0; i < count - keepOne; i++) {
                        info.asset.decRef();
                        info.count--;
                    }
                }
                if (info.count == 0) {
                    deleteArr.push(path);
                    Global.ResourceManager.releaseHelper.releaseBundleRes(_this.getPreloadBundleName(gid), info.path);
                }
            }
        });
        deleteArr.forEach(function (key) {
            _this.keepAssetMap.delete(key);
        });
    };
    GamePreloadTool.prototype.checkPreloadBundleExist = function (gid) {
        if (cc.sys.isNative) {
            var path = jsb.fileUtils.getWritablePath() + "/gameUpdate/" + gid + "/assets/" + gid + "_preload";
            var isExist = jsb.fileUtils.isFileExist(path);
            Logger.error("checkPreloadBundleExist", path, isExist);
            return isExist;
        }
        if (cc.sys.isBrowser) {
            var ignoreArr = [
                4002,
                1001,
                1009,
                1015,
                1017,
                1018,
                1019,
                1020,
                1022,
                5001,
                5002,
                5003,
                5004,
                5005,
                5006,
                1021
            ];
            return true && ignoreArr.indexOf(gid) <= -1; // 本地调试临时这么判断
        }
        return false;
    };
    return GamePreloadTool;
}());
exports.default = GamePreloadTool;
var CacheAssetInfo = /** @class */ (function () {
    function CacheAssetInfo(gid, path, asset, count) {
        this.gid = gid;
        this.path = path;
        this.asset = asset;
        this.count = count;
    }
    Object.defineProperty(CacheAssetInfo.prototype, "count", {
        get: function () {
            return this._count;
        },
        set: function (value) {
            Logger.error("set CacheAssetInfo count", this.gid, this.path, value);
            this._count = value;
        },
        enumerable: false,
        configurable: true
    });
    return CacheAssetInfo;
}());

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGdhbWVcXEdhbWVQcmVsb2FkVG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7UUFDcUIsbUJBQWMsR0FBRyxVQUFVLENBQUM7UUFDN0IsZ0JBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztRQUM5QyxZQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7UUFDMUMsZUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDO1FBRWhFLHlCQUF5QjtRQUNsQixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRWQsV0FBTSxHQUFXLENBQUMsQ0FBQztRQVluQixpQkFBWSxHQUFnQyxJQUFJLEdBQUcsQ0FBQztJQXlKaEUsQ0FBQztJQXBLRyxzQkFBVyxzQ0FBUzthQUFwQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQUNELHNCQUFXLDBDQUFhO2FBQXhCO1lBQ0ksT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELENBQUM7OztPQUFBO0lBRU0sOENBQW9CLEdBQTNCLFVBQTRCLEdBQVc7UUFDbkMsT0FBVSxHQUFHLGFBQVUsQ0FBQztJQUM1QixDQUFDO0lBSU0sK0JBQUssR0FBWixVQUFhLEdBQVc7UUFDcEIsTUFBTSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJ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QUM7YUFQRCxVQUFpQixLQUFhO1lBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBS0wscUJBQUM7QUFBRCxDQWRBLEFBY0MsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVQcmVsb2FkVG9vbHtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgYmFzZVByZWZhYlBhdGggPSBcInByZWZhYnMvXCI7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbG9iYnlVSVBhdGggPSB0aGlzLmJhc2VQcmVmYWJQYXRoICsgXCJMb2JieVVJXCI7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgcnVsZVBvcCA9IHRoaXMuYmFzZVByZWZhYlBhdGggKyBcIlJ1bGVQb3BcIjtcclxuICAgIHB1YmxpYyByZWFkb25seSBzZXR0aW5nUG9wID0gdGhpcy5iYXNlUHJlZmFiUGF0aCArIFwiU2V0dGluZ1BvcFwiO1xyXG5cclxuICAgIC8qKiDnlKjkuo7lgqjlrZjpnIDopoHot6hidW5kbGXosIPnlKjnmoTlj5jph48gKi9cclxuICAgIHB1YmxpYyBjb2RlQ2FjaGUgPSB7fTtcclxuXHJcbiAgICBwcml2YXRlIGN1ckdpZDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBnZXQgY3VyR2FtZUlkKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VyR2lkO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBjdXJCdW5kbGVOYW1lKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJlbG9hZEJ1bmRsZU5hbWUodGhpcy5jdXJHaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQcmVsb2FkQnVuZGxlTmFtZShnaWQ6IG51bWJlcil7XHJcbiAgICAgICAgcmV0dXJuIGAke2dpZH1fcHJlbG9hZGA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBrZWVwQXNzZXRNYXA6IE1hcDxzdHJpbmcsIENhY2hlQXNzZXRJbmZvPiA9IG5ldyBNYXA7XHJcblxyXG4gICAgcHVibGljIHNldHVwKGdpZDogbnVtYmVyKXtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoXCJHYW1lUHJlbG9hZFRvb2wgc2V0dXBcIiwgdGhpcy5jdXJHaWQsIGdpZCk7XHJcbiAgICAgICAgdGhpcy5jdXJHaWQgPSBnaWQ7XHJcbiAgICAgICAgR2xvYmFsLlNjZW5lTWFuYWdlci5zZXRHYW1lU2VhcmNoUGF0aChTdHJpbmcoZ2lkKSk7XHJcbiAgICAgICAgdGhpcy5jb2RlQ2FjaGUgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVTaG93TG9iYnlTaGVsbFduZCgpe1xyXG4gICAgICAgIEdhbWUuR2FtZVByZWxvYWRUb29sLnJlbGVhc2VLZWVwQXNzZXQodGhpcy5jdXJHaWQsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwcmVsb2FkQnVuZGxlKCl7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRCdW5kbGUodGhpcy5jdXJCdW5kbGVOYW1lLCAoZXJyLCBidW5kbGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuWKoOi9veWtkOa4uOaIj2J1bmRsZeWksei0pS0tLS0tLS0tcHJlbG9hZEJ1bmRsZS0tLS0tLS0tLS0tLVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVG9vbGtpdC5yZW1vdmVEaXIodGhpcy5jdXJHaWQsZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGJ1bmRsZSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIC8vICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgR2xvYmFsLlRvb2xraXQucmVtb3ZlRGlyKHRoaXMuY3VyR2lkLGVycm9yKVxyXG4gICAgICAgICAgICAvLyBleHBlY3RlZCBvdXRwdXQ6IFJlZmVyZW5jZUVycm9yOiBub25FeGlzdGVudEZ1bmN0aW9uIGlzIG5vdCBkZWZpbmVkXHJcbiAgICAgICAgICAgIC8vIE5vdGUgLSBlcnJvciBtZXNzYWdlcyB3aWxsIHZhcnkgZGVwZW5kaW5nIG9uIGJyb3dzZXJcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwcmVsb2FkUHJlZmFiKHBhdGg6IHN0cmluZywgaXNDb2xsZWN0OiBib29sZWFuID0gZmFsc2Upe1xyXG4gICAgICAgIGxldCBwcmVmYWIgPSB0aGlzLmdldFNlbGVjdFByZWZhYihwYXRoLCBpc0NvbGxlY3QpO1xyXG4gICAgICAgIGxldCB3aG9sZVBhdGggPSB0aGlzLmdldEFzc2V0V2hvbGVQYXRoKHBhdGgpO1xyXG4gICAgICAgIGlmIChwcmVmYWIpe1xyXG4gICAgICAgICAgICByZXR1cm4gcHJlZmFiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEJ1bmRsZVJlcyh0aGlzLmN1ckJ1bmRsZU5hbWUsIHBhdGgsIChlcnIsIHJlcyk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNDb2xsZWN0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmtlZXBBc3NldE1hcC5oYXMod2hvbGVQYXRoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhY2hlID0gdGhpcy5rZWVwQXNzZXRNYXAuZ2V0KHdob2xlUGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGUuY291bnQgKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGNoZSA9IG5ldyBDYWNoZUFzc2V0SW5mbyh0aGlzLmN1ckdpZCwgcGF0aCwgcmVzLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmtlZXBBc3NldE1hcC5zZXQod2hvbGVQYXRoLCBjaGNoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuYWRkUmVmKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5zZXRBdXRvUmVsZWFzZVJlY3Vyc2l2ZWx5KHJlcywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgbnVsbCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsYXp5UHJlbG9hZFByZWZhYigpe1xyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubGF6eUxvYWRCdW5kbGVSZXModGhpcy5jdXJCdW5kbGVOYW1lLCBbdGhpcy5ydWxlUG9wLCB0aGlzLnNldHRpbmdQb3BdLCBjYy5QcmVmYWIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTZWxlY3RQcmVmYWIocGF0aDogc3RyaW5nLCBpc0NvbGxlY3Q6IGJvb2xlYW4gPSB0cnVlKXtcclxuICAgICAgICBsZXQgcHJlZmFiID0gR2xvYmFsLlJlc291cmNlTWFuYWdlci5nZXRCdW5kbGVSZXModGhpcy5jdXJCdW5kbGVOYW1lLCBwYXRoLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgIGlmIChwcmVmYWIpe1xyXG4gICAgICAgICAgICBpZiAoaXNDb2xsZWN0KXtcclxuICAgICAgICAgICAgICAgIGxldCB3aG9sZVBhdGggPSB0aGlzLmdldEFzc2V0V2hvbGVQYXRoKHBhdGgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMua2VlcEFzc2V0TWFwLmhhcyh3aG9sZVBhdGgpKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2FjaGUgPSB0aGlzLmtlZXBBc3NldE1hcC5nZXQod2hvbGVQYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICBjYWNoZS5jb3VudCArKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoY2hlID0gbmV3IENhY2hlQXNzZXRJbmZvKHRoaXMuY3VyR2lkLCBwYXRoLCBwcmVmYWIsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2VlcEFzc2V0TWFwLnNldCh3aG9sZVBhdGgsIGNoY2hlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHByZWZhYi5hZGRSZWYoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcHJlZmFiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEFzc2V0V2hvbGVQYXRoKHBhdGg6IHN0cmluZyl7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuY3VyR2lkfV8ke3BhdGh9YDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVsZWFzZVByZWxvYWRCdW5kbGUoZ2lkOiBudW1iZXIpe1xyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIucmVsZWFzZUhlbHBlci5yZWxlYXNlQnVuZGxlKHRoaXMuZ2V0UHJlbG9hZEJ1bmRsZU5hbWUoZ2lkKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbGVhc2VLZWVwQXNzZXQoZ2lkOiBudW1iZXIsIHJldGFpbk9uZTogYm9vbGVhbiA9IGZhbHNlKXtcclxuICAgICAgICBsZXQga2VlcE9uZSA9IHJldGFpbk9uZSA/IDEgOiAwO1xyXG4gICAgICAgIGxldCBkZWxldGVBcnIgPSBbXTtcclxuICAgICAgICB0aGlzLmtlZXBBc3NldE1hcC5mb3JFYWNoKChpbmZvLCBwYXRoKT0+e1xyXG4gICAgICAgICAgICBpZihpbmZvLmdpZCA9PSBnaWQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvdW50ID0gaW5mby5jb3VudDtcclxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjb3VudCAtIGtlZXBPbmU7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm8uYXNzZXQuZGVjUmVmKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm8uY291bnQgLS07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGluZm8uY291bnQgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlQXJyLnB1c2gocGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5yZWxlYXNlSGVscGVyLnJlbGVhc2VCdW5kbGVSZXModGhpcy5nZXRQcmVsb2FkQnVuZGxlTmFtZShnaWQpLCBpbmZvLnBhdGgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZGVsZXRlQXJyLmZvckVhY2goa2V5PT57XHJcbiAgICAgICAgICAgIHRoaXMua2VlcEFzc2V0TWFwLmRlbGV0ZShrZXkpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrUHJlbG9hZEJ1bmRsZUV4aXN0KGdpZDogbnVtYmVyKXtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKXtcclxuICAgICAgICAgICBsZXQgcGF0aCA9IGAke2pzYi5maWxlVXRpbHMuZ2V0V3JpdGFibGVQYXRoKCl9L2dhbWVVcGRhdGUvJHtnaWR9L2Fzc2V0cy8ke2dpZH1fcHJlbG9hZGA7XHJcbiAgICAgICAgICAgbGV0IGlzRXhpc3QgPSBqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KHBhdGgpO1xyXG4gICAgICAgICAgIExvZ2dlci5lcnJvcihcImNoZWNrUHJlbG9hZEJ1bmRsZUV4aXN0XCIsIHBhdGgsIGlzRXhpc3QpO1xyXG4gICAgICAgICAgIHJldHVybiBpc0V4aXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2Muc3lzLmlzQnJvd3Nlcil7XHJcbiAgICAgICAgICAgIGxldCBpZ25vcmVBcnIgPSBbICAgICAgIC8vIOS4jeWcqOaVsOe7hOWGheeahOi1sHRydWUsIOayoeaciXByZWxvYWQgYnVuZGxl55qE5ri45oiP572R6aG16LCD6K+V6ZyA6KaB5Zyo6L+Z6YWN572uXHJcbiAgICAgICAgICAgICAgICA0MDAyLFxyXG4gICAgICAgICAgICAgICAgMTAwMSxcclxuICAgICAgICAgICAgICAgIDEwMDksXHJcbiAgICAgICAgICAgICAgICAxMDE1LFxyXG4gICAgICAgICAgICAgICAgMTAxNyxcclxuICAgICAgICAgICAgICAgIDEwMTgsXHJcbiAgICAgICAgICAgICAgICAxMDE5LFxyXG4gICAgICAgICAgICAgICAgMTAyMCxcclxuICAgICAgICAgICAgICAgIDEwMjIsXHJcbiAgICAgICAgICAgICAgICA1MDAxLFxyXG4gICAgICAgICAgICAgICAgNTAwMixcclxuICAgICAgICAgICAgICAgIDUwMDMsXHJcbiAgICAgICAgICAgICAgICA1MDA0LFxyXG4gICAgICAgICAgICAgICAgNTAwNSxcclxuICAgICAgICAgICAgICAgIDUwMDYsXHJcbiAgICAgICAgICAgICAgICAxMDIxXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlICYmIGlnbm9yZUFyci5pbmRleE9mKGdpZCkgPD0gLTE7ICAgICAvLyDmnKzlnLDosIPor5XkuLTml7bov5nkuYjliKTmlq1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDYWNoZUFzc2V0SW5mb3tcclxuICAgIHByaXZhdGUgX2NvdW50OiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZ2lkOiBudW1iZXIsIHB1YmxpYyBwYXRoOiBzdHJpbmcsIHB1YmxpYyBhc3NldDogY2MuQXNzZXQsIGNvdW50OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuY291bnQgPSBjb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNvdW50KHZhbHVlOiBudW1iZXIpe1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihcInNldCBDYWNoZUFzc2V0SW5mbyBjb3VudFwiLCB0aGlzLmdpZCwgdGhpcy5wYXRoLCB2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5fY291bnQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvdW50KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvdW50O1xyXG4gICAgfVxyXG59Il19