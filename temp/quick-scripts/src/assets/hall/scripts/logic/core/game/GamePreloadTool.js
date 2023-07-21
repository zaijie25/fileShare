"use strict";
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