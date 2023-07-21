
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/hotUpdate/HotUpdateManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '12613fuR65LtpkfFuYvuEQt', 'HotUpdateManager');
// hall/scripts/logic/core/hotUpdate/HotUpdateManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UpdateHelper_1 = require("./UpdateHelper");
var GameHotUpdateComponent_1 = require("./component/GameHotUpdateComponent");
var HotUpdateManager = /** @class */ (function () {
    function HotUpdateManager() {
        this._hotUpdateUrl = "https://intest.03866.com/client/cocosHotUpdate"; //热更新地址
        this._hotUpdateDirName = "gameUpdate"; //native 热更新目录
        this._hallHotUpdateDirName = "hall"; //大厅热更目录
        this._projectCfgFileName = "project.manifest";
        this._versionCfgFileName = "version.manifest";
        this._hotUpdateStorageKey = "download_";
        this.nativeVersions = {};
        this.gIsGameDownloading = {};
        this.gameChecked = {};
        this.currentGame = "";
        this.hallNewVersion = "0.0.0";
        this.hallUpdatePath = "";
        this.gameHotUpdateList = []; //下载队列
        this.hotFailRes = null;
        this.hotFaildNum = 0;
        //获取远程当前版本号
        this.getGameVersion = function (wholeurl) {
            // console.log("getGameVersion");
            return new Promise(function (resolve, reject) {
                var xhr = cc.loader.getXMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            var respone = xhr.responseText;
                            var data = JSON.parse(respone);
                            //   console.log("version=", data, data.version);
                            resolve(data);
                        }
                        else {
                            reject();
                        }
                    }
                };
                xhr.timeout = 30000;
                // console.log("getGameVersion wholeurl=", wholeurl);
                xhr.open("GET", wholeurl, true);
                xhr.ontimeout = function () { reject(); };
                xhr.send();
            });
        };
        this.updateHelper = new UpdateHelper_1.default(this._hotUpdateDirName, this._projectCfgFileName, this._versionCfgFileName, this._hotUpdateStorageKey);
        this.nativeVersions["hall"] = this.getNativeHotUpdateVersion("hall");
    }
    Object.defineProperty(HotUpdateManager.prototype, "CurrentGame", {
        get: function () {
            return this.currentGame;
        },
        set: function (gid) {
            this.currentGame = gid;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HotUpdateManager.prototype, "hotUpdateUrl", {
        get: function () {
            return this._hotUpdateUrl;
        },
        set: function (url) {
            this._hotUpdateUrl = url;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HotUpdateManager.prototype, "hotUpdateDirName", {
        get: function () {
            return this._hotUpdateDirName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HotUpdateManager.prototype, "hallHotUpdateDirName", {
        get: function () {
            return this._hallHotUpdateDirName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HotUpdateManager.prototype, "projectCfgFileName", {
        get: function () {
            return this._projectCfgFileName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HotUpdateManager.prototype, "versionCfgFileName", {
        get: function () {
            return this._versionCfgFileName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HotUpdateManager.prototype, "hotUpdateStorageKey", {
        get: function () {
            return this._hotUpdateStorageKey;
        },
        enumerable: false,
        configurable: true
    });
    HotUpdateManager.prototype.checkIsGameDownload = function (gid) {
        var isDownloaded = this.updateHelper.isDownloaded(gid);
        return isDownloaded;
    };
    //检查游戏是否是最新   是否可以直接进入
    HotUpdateManager.prototype.checkIsGameNewest = function (gid) {
        if (!this.checkIsGameDownload(gid))
            return false;
        var nativeVersion = Global.HotUpdateManager.nativeVersions[gid.toString()] || "0.0.0";
        var gameData = Global.GameData.getGameInfo(gid);
        if (gameData == null)
            return false;
        var newVersion = gameData.version;
        if (newVersion == "")
            return false;
        return Global.Toolkit.versionCompare(newVersion, nativeVersion) <= 0;
    };
    /**
     *
     * @param gameid
     * @param cfgVersion 是否获取cfgVersion cfgversion为后台配置的总版本号，该版本号不是实际的版本号任一子版本修改都将导致该版本号修改，
     * 此版本号checkversion将传给服务器，用于依赖版本判断
     */
    HotUpdateManager.prototype.getNativeHotUpdateVersion = function (gameid, cfgVersion, projectUrl) {
        if (projectUrl === void 0) { projectUrl = ""; }
        var nativeUrl = this.getNativeHotUpdatePath(gameid) + "/" + this.projectCfgFileName;
        var version = "0.0.0";
        if (!cc.sys.isNative) {
            return version;
        }
        var isExist = jsb.fileUtils.isFileExist(nativeUrl);
        if (isExist) {
            var jsonStr = jsb.fileUtils.getStringFromFile(nativeUrl);
            var jsonData = JSON.parse(jsonStr);
            if (jsonData) {
                if (cfgVersion) {
                    if (jsonData.cfgVersion != null && jsonData.cfgVersion != undefined) {
                        //this.updateNativeHotUpdateVersion(gameid, jsonData.cfgVersion)
                        return jsonData.cfgVersion;
                    }
                }
                if (jsonData.version != null && jsonData.version != undefined) {
                    Logger.log("getNativeHotUpdateVersion ---- gameid  " + gameid + " jsonData.version = " + jsonData.version);
                    version = jsonData.version;
                    this.updateNativeHotUpdateVersion(gameid, version);
                }
                else {
                    Logger.log("getNativeHotUpdateVersion ----jsonData.version = null 2 ");
                }
            }
            else {
                Logger.log("getNativeHotUpdateVersion ----jsonData.version = null 1 ");
            }
            return version;
        }
        var projectExist = jsb.fileUtils.isFileExist(projectUrl);
        if (projectExist) {
            var jsonStr = jsb.fileUtils.getStringFromFile(projectUrl);
            var jsonData = JSON.parse(jsonStr);
            if (jsonData) {
                if (cfgVersion) {
                    if (jsonData.cfgVersion != null && jsonData.cfgVersion != undefined) {
                        //this.updateNativeHotUpdateVersion(gameid, jsonData.cfgVersion)
                        return jsonData.cfgVersion;
                    }
                    else {
                        return "0.0.0";
                    }
                }
            }
        }
        return version;
    };
    HotUpdateManager.prototype.getNativeHotUpdatePath = function (gameid) {
        var gamePath = this.updateHelper.genStoragePath(gameid);
        return gamePath;
    };
    HotUpdateManager.prototype.getHotUpdateVersion = function (gameid, path, fileName) {
        var nativeUrl = path + "/" + fileName;
        var version = "0.0.0";
        if (!cc.sys.isNative) {
            return version;
        }
        Logger.error("getHotUpdateVersion--path================", path);
        var isExist = jsb.fileUtils.isFileExist(nativeUrl);
        if (isExist) {
            var jsonStr = jsb.fileUtils.getStringFromFile(nativeUrl);
            var jsonData = JSON.parse(jsonStr);
            if (jsonData) {
                if (jsonData.version != null && jsonData.version != undefined) {
                    Logger.log("getHotUpdateVersion ---- gameid  " + gameid + " jsonData.version = " + jsonData.version);
                    version = jsonData.version;
                    //this.updateNativeHotUpdateVersion(gameid, version)
                }
                else {
                    Logger.log("getHotUpdateVersion ----jsonData.version = null 2 ");
                }
            }
            else {
                Logger.log("getHotUpdateVersion ----jsonData.version = null 1 ");
            }
        }
        return version;
    };
    HotUpdateManager.prototype.getRemoteVesion = function (gameid, bundleName, newVersion) {
        var nativeUrl = this.getNativeHotUpdatePath(gameid) + "/" + newVersion + ".manifest";
        var version = "0.0.0";
        if (!cc.sys.isNative) {
            return version;
        }
        var isExist = jsb.fileUtils.isFileExist(nativeUrl);
        if (isExist) {
            var jsonStr = jsb.fileUtils.getStringFromFile(nativeUrl);
            var jsonData = JSON.parse(jsonStr);
            if (jsonData) {
                if (jsonData[bundleName] != null && jsonData[bundleName] != undefined && jsonData[bundleName]["version"] != null && jsonData[bundleName]["version"] != undefined) {
                    Logger.log("getRemoteHotUpdateVersion ---- gameid  " + gameid + " jsonData.version = " + jsonData[bundleName]["version"]);
                    version = jsonData[bundleName]["version"];
                    //this.updateNativeHotUpdateVersion(gameid, newVersion)
                }
                else {
                    Logger.log("getRemoteHotUpdateVersion ----jsonData.version = null 2 ");
                }
            }
            else {
                Logger.log("getRemoteHotUpdateVersion ----jsonData.version = null 1 ");
            }
        }
        return version;
    };
    HotUpdateManager.prototype.getRemoteHotUpdateUrl = function (gameid, bundleName, newVersion, hotUpdateUrl) {
        var url = "";
        var nativeUrl = this.getNativeHotUpdatePath(gameid) + "/" + newVersion + ".manifest";
        hotUpdateUrl = Global.Toolkit.adjustUrl(hotUpdateUrl);
        //Logger.error("nativeUrl============",nativeUrl)
        if (!cc.sys.isNative) {
            return url;
        }
        var isExist = jsb.fileUtils.isFileExist(nativeUrl);
        if (isExist) {
            var jsonStr = jsb.fileUtils.getStringFromFile(nativeUrl);
            var jsonData = JSON.parse(jsonStr);
            if (jsonData) {
                Logger.error("bundleName----------", bundleName);
                if (jsonData[bundleName] != null && jsonData[bundleName] != undefined && jsonData[bundleName]["path"] != null && jsonData[bundleName]["path"] != undefined) {
                    Logger.log("getRemoteUrl ---- gameid  " + gameid + " jsonData.path = " + jsonData[bundleName]["path"]);
                    url = hotUpdateUrl + jsonData[bundleName]["path"] + "/" + jsonData[bundleName]["version"];
                    this.updateNativeHotUpdateVersion(gameid, newVersion);
                }
                else {
                    Logger.log("getRemoteHotUpdateUrl ----jsonData[bundleName][path = null 2 ");
                }
            }
            else {
                Logger.log("getRemoteHotUpdateUrl ----jsonData[bundleName][path = null 1 ");
            }
        }
        //Logger.error("getRemoteHotUpdateUrl==================",url)
        return url;
    };
    /**
     *
     * @param gameid ID
     * @param version 版本
     * @param hotUpdateUrl 热更url
     * @param context 本地url
     * @param nativeManifestFilePath 随包资源url
     * @param isHall 是否大厅
     */
    HotUpdateManager.prototype.getManifestObj = function (hotUpdateUrl, context) {
        var HotUpdateManager = Global.HotUpdateManager;
        if (hotUpdateUrl == null || hotUpdateUrl == undefined || hotUpdateUrl == "") {
            hotUpdateUrl = HotUpdateManager.hotUpdateUrl;
        }
        hotUpdateUrl = Global.Toolkit.adjustUrl(hotUpdateUrl);
        var jsonAssets = {};
        var jasonVersion = "0.0.0";
        var nativeMaifest = context + "/" + this.projectCfgFileName;
        var isNativeManifestExist = jsb.fileUtils.isFileExist(nativeMaifest);
        // Logger.error("nativeMaifest--------------",nativeMaifest)
        if (isNativeManifestExist) {
            var jsonStr = jsb.fileUtils.getStringFromFile(nativeMaifest); //new 标志新热更
            var jsonData = JSON.parse(jsonStr);
            if (jsonData.assets && jsonData.new) {
                jsonAssets = jsonData.assets;
            }
            if (jsonData.assets) {
                jasonVersion = jsonData.version;
            }
        }
        // Logger.error("projectpath=========",ProjectFilePath)
        //Logger.log("changeManifestUrl hotUpdateUrl = " + hotUpdateUrl)
        var localManifestJsonObj = {
            "packageUrl": hotUpdateUrl,
            "remoteManifestUrl": hotUpdateUrl + this.projectCfgFileName,
            "remoteVersionUrl": hotUpdateUrl + this.versionCfgFileName,
            "version": jasonVersion,
            "assets": jsonAssets,
            "searchPaths": []
        };
        //  console.log("这是当前加载的本地配置文件",JSON.stringify(localManifestJsonObj))
        return localManifestJsonObj;
    };
    HotUpdateManager.prototype.changeLocalUrl = function (url, param, context, fileName) {
        var fullLocalUrl = this.updateHelper.genStoragePath(context) + "/" + fileName;
        if (!jsb.fileUtils.isFileExist(fullLocalUrl)) {
            Logger.error("找不到文件", fullLocalUrl);
            return;
        }
        var content = jsb.fileUtils.getStringFromFile(fullLocalUrl);
        var tmpManifest = JSON.parse(content);
        var index = tmpManifest.remoteManifestUrl.indexOf(param);
        if (index != -1) {
            tmpManifest.remoteManifestUrl = url + tmpManifest.remoteManifestUrl.substring(index - 1, tmpManifest.remoteManifestUrl.length);
            tmpManifest.packageUrl = url + tmpManifest.packageUrl.substring(index - 1, tmpManifest.remoteManifestUrl.length);
            tmpManifest.remoteVersionUrl = url + tmpManifest.remoteVersionUrl.substring(index - 1, tmpManifest.remoteManifestUrl.length);
        }
        var newTmpContent = JSON.stringify(tmpManifest);
        jsb.fileUtils.writeStringToFile(newTmpContent, fullLocalUrl);
    };
    HotUpdateManager.prototype.updateNativeHotUpdateVersion = function (gameid, version) {
        if (this.nativeVersions) {
            this.nativeVersions[gameid] = version;
        }
        var gameInfo = Global.GameData.getGameInfo(gameid);
        if (gameInfo) {
            gameInfo.native_version = version;
        }
    };
    HotUpdateManager.prototype.getNativeVersionFileUrl = function (gameid, newVersion) {
        if (!newVersion)
            return;
        return Global.HotUpdateManager.getNativeHotUpdatePath(gameid) + "/" + newVersion + ".manifest";
    };
    //删除热更目录
    HotUpdateManager.prototype.removeNativeHotUpdateDir = function (gameid) {
        var gamePath = this.getNativeHotUpdatePath(gameid);
        jsb.fileUtils.removeDirectory(gamePath);
        if (gameid == "hall") {
            Global.NativeEvent.unzipHallPackage();
        }
    };
    /**
     * 添加热更组件
     * @param gameid 游戏id
     * @param gameVersion 目标版本
     * @param gameUpdateUrl 热更url
     * @param isBack 是否回退
     * @param state 热更状态 初始 -1000 -1 没下载过 0 下载成功并且版本是最新  1下载成功，版本不是最新 2下载中 3等待下载   4下载失败
     * @param startVer 初始版本
     * @param priority
     */
    HotUpdateManager.prototype.addHotUpdateGameComp = function (gameid, gameVersion, gameUpdateUrl, remoteVer, priority) {
        if (priority === void 0) { priority = false; }
        var hotUpdateComponent = new GameHotUpdateComponent_1.default();
        hotUpdateComponent.initCheckUpDate(gameid, gameVersion, gameUpdateUrl, remoteVer);
        var autoFlag = this.getAutoInlist();
        var insertIndex = this.getIndex();
        if (autoFlag && !priority) // 非自动下载的游戏优先级更高
         {
            if (insertIndex == -1) {
                if (this.checkIsGameDowning()) {
                    this.gameHotUpdateList.splice(1, 0, hotUpdateComponent);
                }
                else {
                    this.gameHotUpdateList.unshift(hotUpdateComponent);
                }
            }
            else {
                this.gameHotUpdateList.splice(insertIndex + 1, 0, hotUpdateComponent);
            }
        }
        else {
            this.gameHotUpdateList.push(hotUpdateComponent);
        }
        if (!this.checkIsGameDowning()) {
            this.startHotUpdateGame();
        }
    };
    //移除热更组件
    HotUpdateManager.prototype.removeGameComp = function (gameid) {
        var gameHotUpdateComp = this.getHotUpdateGameComp(gameid);
        this.gameHotUpdateList.splice(this.gameHotUpdateList.indexOf(gameHotUpdateComp), 1);
    };
    /**
     * 获取自动下载的索引
     */
    HotUpdateManager.prototype.getIndex = function () {
        var index = -1;
        var gidList = Global.GameData.autoDownList;
        for (var i = this.gameHotUpdateList.length - 1; i >= 0; i--) {
            var hotUpdateComponent = this.gameHotUpdateList[i];
            if (gidList.indexOf(Number(hotUpdateComponent._gameType)) == -1) {
                return i;
            }
        }
        return index;
    };
    /**
     * 是否有自动下载
     */
    HotUpdateManager.prototype.getAutoInlist = function () {
        var gidList = Global.GameData.autoDownList;
        for (var i = 0; i < this.gameHotUpdateList.length; i++) {
            var hotUpdateComponent = this.gameHotUpdateList[i];
            if (gidList.indexOf(Number(hotUpdateComponent._gameType)) != -1) {
                return true;
            }
        }
        return false;
    };
    //开始游戏下载
    HotUpdateManager.prototype.startHotUpdateGame = function () {
        if (this.gameHotUpdateList) {
            var hotUpdateComponent = this.gameHotUpdateList[0];
            if (hotUpdateComponent) {
                hotUpdateComponent.checkVersionUpdate();
            }
        }
    };
    //获取下载组件
    HotUpdateManager.prototype.getHotUpdateGameComp = function (gameid) {
        var gameComp = null;
        for (var i = 0; i < this.gameHotUpdateList.length; i++) {
            var hotUpdateComponent = this.gameHotUpdateList[i];
            if (hotUpdateComponent._gameType === gameid) {
                gameComp = hotUpdateComponent;
                break;
            }
        }
        return gameComp;
    };
    //检查是否有游戏在下载
    HotUpdateManager.prototype.checkIsGameDowning = function () {
        var isDowning = false;
        if (this.gameHotUpdateList) {
            for (var i = 0; i < this.gameHotUpdateList.length; i++) {
                var hotUpdateComponent = this.gameHotUpdateList[i];
                if (hotUpdateComponent._updating) {
                    isDowning = true;
                    break;
                }
            }
        }
        return isDowning;
    };
    //获取当前是哪个游戏在下载
    HotUpdateManager.prototype.getWhichGameIsDowning = function () {
        var gid = null;
        if (this.gameHotUpdateList) {
            for (var i = 0; i < this.gameHotUpdateList.length; i++) {
                var hotUpdateComponent = this.gameHotUpdateList[i];
                if (hotUpdateComponent._updating) {
                    gid = hotUpdateComponent._gameType;
                    break;
                }
            }
        }
        return gid;
    };
    //删除热更组件
    HotUpdateManager.prototype.removeHotUpdateGameComp = function (gameid, isStartNew) {
        if (isStartNew === void 0) { isStartNew = false; }
        if (this.gameHotUpdateList) {
            var index = -1;
            for (var i = 0; i < this.gameHotUpdateList.length; i++) {
                var hotUpdateComponent = this.gameHotUpdateList[i];
                if (hotUpdateComponent._gameType === gameid) {
                    index = i;
                    break;
                }
            }
            if (index != -1) {
                var comp = this.gameHotUpdateList.splice(index, 1);
                comp = null;
            }
            if (isStartNew) {
                this.startHotUpdateGame();
            }
        }
    };
    HotUpdateManager.prototype.changeManifestUrl = function (gameid, version, hotUpdateUrl, nativeManifestFilePath, isBack) {
        if (isBack === void 0) { isBack = 0; }
        var HotUpdateManager = Global.HotUpdateManager;
        if (hotUpdateUrl == null || hotUpdateUrl == undefined || hotUpdateUrl == "") {
            hotUpdateUrl = HotUpdateManager.hotUpdateUrl;
        }
        var nativeFilePath = nativeManifestFilePath;
        if (!nativeFilePath) {
            nativeFilePath = this.getNativeHotUpdatePath(gameid) + "/" + this.projectCfgFileName;
        }
        else {
            var nativeMaifest = this.getNativeHotUpdatePath(gameid) + "/" + this.projectCfgFileName;
            var isNativeManifestExist = jsb.fileUtils.isFileExist(nativeMaifest);
            var isNativeFileExit = jsb.fileUtils.isFileExist(nativeFilePath);
            var nativeFileVersion = "0.0.0";
            var nativeMaifestVersion = "0.0.0";
            if (isNativeManifestExist) {
                var jsonStr = jsb.fileUtils.getStringFromFile(nativeMaifest);
                var jsonData = JSON.parse(jsonStr);
                if (jsonData.version) {
                    nativeMaifestVersion = jsonData.version;
                }
            }
            if (isNativeFileExit) {
                var jsonStr = jsb.fileUtils.getStringFromFile(nativeFilePath);
                var jsonData = JSON.parse(jsonStr);
                if (jsonData.version) {
                    nativeFileVersion = jsonData.version;
                }
            }
            if (Global.Toolkit.versionCompare(nativeMaifestVersion, nativeFileVersion) > 0) {
                nativeFilePath = nativeMaifest;
            }
        }
        hotUpdateUrl = hotUpdateUrl + "/" + gameid + "/" + version;
        // Logger.log("changeManifestUrl hotUpdateUrl = " + hotUpdateUrl)
        var localManifestJsonObj = {
            "packageUrl": hotUpdateUrl,
            "remoteManifestUrl": hotUpdateUrl + "/" + HotUpdateManager.projectCfgFileName,
            "remoteVersionUrl": hotUpdateUrl + "/" + HotUpdateManager.versionCfgFileName,
            "version": "0.0.1",
            "assets": {},
            "searchPaths": []
        };
        var isExist = jsb.fileUtils.isFileExist(nativeFilePath);
        if (isExist) {
            var jsonStr = jsb.fileUtils.getStringFromFile(nativeFilePath);
            if (jsonStr) {
                // Logger.log("jsonStr =======" + jsonStr)
                var jsonData = JSON.parse(jsonStr);
                var isMergeFile = true;
                //回滚版本
                if (isBack === 1) {
                    if (Global.Toolkit.versionCompare(jsonData.version, version) > 0) {
                        Logger.log("回滚游戏--- gameid " + gameid);
                        //删除本地目录
                        var dirPath = this.getNativeHotUpdatePath(gameid);
                        if (jsb.fileUtils.isFileExist(dirPath)) {
                            jsb.fileUtils.removeDirectory(dirPath);
                            if (gameid == "hall") {
                                Global.NativeEvent.unzipHallPackage();
                            }
                        }
                        isMergeFile = false;
                    }
                }
                if (isMergeFile && jsonData.packageUrl) {
                    // Logger.log("native packageUrl = " + jsonData.packageUrl)
                    if (jsonData.packageUrl != hotUpdateUrl) {
                        //修改地址
                        localManifestJsonObj.packageUrl = hotUpdateUrl;
                        localManifestJsonObj.remoteManifestUrl = hotUpdateUrl + "/" + HotUpdateManager.projectCfgFileName;
                        localManifestJsonObj.remoteVersionUrl = hotUpdateUrl + "/" + HotUpdateManager.versionCfgFileName;
                        localManifestJsonObj.version = jsonData.version;
                        localManifestJsonObj.assets = jsonData.assets;
                        localManifestJsonObj.searchPaths = jsonData.searchPaths;
                    }
                    else {
                        localManifestJsonObj = jsonData;
                    }
                }
            }
        }
        else {
            Logger.log("file not exist");
            localManifestJsonObj.packageUrl = hotUpdateUrl;
            localManifestJsonObj.remoteManifestUrl = hotUpdateUrl + "/" + HotUpdateManager.projectCfgFileName;
            localManifestJsonObj.remoteVersionUrl = hotUpdateUrl + "/" + HotUpdateManager.versionCfgFileName;
        }
        return localManifestJsonObj;
    };
    HotUpdateManager.prototype.onClear = function () {
    };
    HotUpdateManager.prototype.onDestroy = function () {
    };
    return HotUpdateManager;
}());
exports.default = HotUpdateManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGhvdFVwZGF0ZVxcSG90VXBkYXRlTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUEwQztBQUcxQyw2RUFBd0U7QUFFeEU7SUF3Qkk7UUF2QlEsa0JBQWEsR0FBRyxnREFBZ0QsQ0FBQyxDQUFBLE9BQU87UUFDeEUsc0JBQWlCLEdBQUcsWUFBWSxDQUFDLENBQUEsY0FBYztRQUMvQywwQkFBcUIsR0FBRyxNQUFNLENBQUEsQ0FBQSxRQUFRO1FBQ3RDLHdCQUFtQixHQUFHLGtCQUFrQixDQUFDO1FBQ3pDLHdCQUFtQixHQUFHLGtCQUFrQixDQUFDO1FBQ3pDLHlCQUFvQixHQUFHLFdBQVcsQ0FBQztRQUVwQyxtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQix1QkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDeEIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDaEIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFNbEIsbUJBQWMsR0FBRyxPQUFPLENBQUM7UUFDekIsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFDbkIsc0JBQWlCLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTTtRQUUvQixlQUFVLEdBQVEsSUFBSSxDQUFDO1FBQ3ZCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBNE10QixXQUFXO1FBQ1gsbUJBQWMsR0FBRyxVQUFVLFFBQVE7WUFDakMsaUNBQWlDO1lBQ2hDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTTtnQkFDeEMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN4QyxHQUFHLENBQUMsa0JBQWtCLEdBQUc7b0JBQ3JCLElBQUcsR0FBRyxDQUFDLFVBQVUsS0FBSyxDQUFDLEVBQUM7d0JBQ3BCLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksR0FB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LEdBQUcsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUE7WUFDakcsb0JBQW9CLENBQUMsZ0JBQWdCLEdBQUcsWUFBWSxHQUFHLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQTtTQUNuRztRQUNELE9BQU8sb0JBQW9CLENBQUE7SUFFL0IsQ0FBQztJQUVELGtDQUFPLEdBQVA7SUFFQSxDQUFDO0lBQ0Qsb0NBQVMsR0FBVDtJQUVBLENBQUM7SUFHTCx1QkFBQztBQUFELENBM2xCQSxBQTJsQkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVcGRhdGVIZWxwZXIgZnJvbSBcIi4vVXBkYXRlSGVscGVyXCI7XHJcbmltcG9ydCBDQ0xvYWRlckhlbHBlciBmcm9tIFwiLi9DQ0xvYWRlckhlbHBlclwiO1xyXG5pbXBvcnQgUEJIZWxwZXIgZnJvbSBcIi4vUEJIZWxwZXJcIjtcclxuaW1wb3J0IEdhbWVIb3RVcGRhdGVDb21wb25lbnQgZnJvbSBcIi4vY29tcG9uZW50L0dhbWVIb3RVcGRhdGVDb21wb25lbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvdFVwZGF0ZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBfaG90VXBkYXRlVXJsID0gXCJodHRwczovL2ludGVzdC4wMzg2Ni5jb20vY2xpZW50L2NvY29zSG90VXBkYXRlXCI7Ly/ng63mm7TmlrDlnLDlnYBcclxuICAgIHByaXZhdGUgX2hvdFVwZGF0ZURpck5hbWUgPSBcImdhbWVVcGRhdGVcIjsvL25hdGl2ZSDng63mm7TmlrDnm67lvZVcclxuICAgIHByaXZhdGUgX2hhbGxIb3RVcGRhdGVEaXJOYW1lID0gXCJoYWxsXCIvL+Wkp+WOheeDreabtOebruW9lVxyXG4gICAgcHJpdmF0ZSBfcHJvamVjdENmZ0ZpbGVOYW1lID0gXCJwcm9qZWN0Lm1hbmlmZXN0XCI7XHJcbiAgICBwcml2YXRlIF92ZXJzaW9uQ2ZnRmlsZU5hbWUgPSBcInZlcnNpb24ubWFuaWZlc3RcIjtcclxuICAgIHByaXZhdGUgX2hvdFVwZGF0ZVN0b3JhZ2VLZXkgPSBcImRvd25sb2FkX1wiO1xyXG5cclxuICAgIHB1YmxpYyBuYXRpdmVWZXJzaW9ucyA9IHt9O1xyXG4gICAgcHVibGljIGdJc0dhbWVEb3dubG9hZGluZyA9IHt9O1xyXG4gICAgcHVibGljIGdhbWVDaGVja2VkID0ge307XHJcbiAgICBwcml2YXRlIGN1cnJlbnRHYW1lID0gXCJcIjtcclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlSGVscGVyOiBVcGRhdGVIZWxwZXI7XHJcbiAgICBwdWJsaWMgY2NMb2FkZXJIZWxwZXI6IENDTG9hZGVySGVscGVyO1xyXG4gICAgcHVibGljIHBiSGVscGVyOiBQQkhlbHBlcjtcclxuXHJcbiAgICBwdWJsaWMgaGFsbE5ld1ZlcnNpb24gPSBcIjAuMC4wXCI7XHJcbiAgICBwdWJsaWMgaGFsbFVwZGF0ZVBhdGggPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBnYW1lSG90VXBkYXRlTGlzdCA9IFtdOyAvL+S4i+i9vemYn+WIl1xyXG5cclxuICAgIHB1YmxpYyBob3RGYWlsUmVzOiBhbnkgPSBudWxsO1xyXG4gICAgcHVibGljIGhvdEZhaWxkTnVtID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUhlbHBlciA9IG5ldyBVcGRhdGVIZWxwZXIodGhpcy5faG90VXBkYXRlRGlyTmFtZSwgdGhpcy5fcHJvamVjdENmZ0ZpbGVOYW1lLCB0aGlzLl92ZXJzaW9uQ2ZnRmlsZU5hbWUsIHRoaXMuX2hvdFVwZGF0ZVN0b3JhZ2VLZXkpO1xyXG4gICAgICAgIHRoaXMubmF0aXZlVmVyc2lvbnNbXCJoYWxsXCJdID0gdGhpcy5nZXROYXRpdmVIb3RVcGRhdGVWZXJzaW9uKFwiaGFsbFwiKVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBDdXJyZW50R2FtZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50R2FtZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgQ3VycmVudEdhbWUoZ2lkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRHYW1lID0gZ2lkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBob3RVcGRhdGVVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hvdFVwZGF0ZVVybDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgaG90VXBkYXRlVXJsKHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5faG90VXBkYXRlVXJsID0gdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBob3RVcGRhdGVEaXJOYW1lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ob3RVcGRhdGVEaXJOYW1lXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGhhbGxIb3RVcGRhdGVEaXJOYW1lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oYWxsSG90VXBkYXRlRGlyTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcHJvamVjdENmZ0ZpbGVOYW1lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9qZWN0Q2ZnRmlsZU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZlcnNpb25DZmdGaWxlTmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmVyc2lvbkNmZ0ZpbGVOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBob3RVcGRhdGVTdG9yYWdlS2V5KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ob3RVcGRhdGVTdG9yYWdlS2V5O1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrSXNHYW1lRG93bmxvYWQoZ2lkKSB7XHJcbiAgICAgICAgbGV0IGlzRG93bmxvYWRlZCA9IHRoaXMudXBkYXRlSGVscGVyLmlzRG93bmxvYWRlZChnaWQpXHJcbiAgICAgICAgcmV0dXJuIGlzRG93bmxvYWRlZFxyXG4gICAgfVxyXG5cclxuICAgIC8v5qOA5p+l5ri45oiP5piv5ZCm5piv5pyA5pawICAg5piv5ZCm5Y+v5Lul55u05o6l6L+b5YWlXHJcbiAgICBjaGVja0lzR2FtZU5ld2VzdChnaWQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tJc0dhbWVEb3dubG9hZChnaWQpKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgbGV0IG5hdGl2ZVZlcnNpb24gPSBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5uYXRpdmVWZXJzaW9uc1tnaWQudG9TdHJpbmcoKV0gfHwgXCIwLjAuMFwiXHJcbiAgICAgICAgbGV0IGdhbWVEYXRhID0gR2xvYmFsLkdhbWVEYXRhLmdldEdhbWVJbmZvKGdpZCk7XHJcbiAgICAgICAgaWYgKGdhbWVEYXRhID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBsZXQgbmV3VmVyc2lvbiA9IGdhbWVEYXRhLnZlcnNpb247XHJcbiAgICAgICAgaWYgKG5ld1ZlcnNpb24gPT0gXCJcIilcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBHbG9iYWwuVG9vbGtpdC52ZXJzaW9uQ29tcGFyZShuZXdWZXJzaW9uLCBuYXRpdmVWZXJzaW9uKSA8PSAwXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gZ2FtZWlkIFxyXG4gICAgICogQHBhcmFtIGNmZ1ZlcnNpb24g5piv5ZCm6I635Y+WY2ZnVmVyc2lvbiBjZmd2ZXJzaW9u5Li65ZCO5Y+w6YWN572u55qE5oC754mI5pys5Y+377yM6K+l54mI5pys5Y+35LiN5piv5a6e6ZmF55qE54mI5pys5Y+35Lu75LiA5a2Q54mI5pys5L+u5pS56YO95bCG5a+86Ie06K+l54mI5pys5Y+35L+u5pS577yMXHJcbiAgICAgKiDmraTniYjmnKzlj7djaGVja3ZlcnNpb27lsIbkvKDnu5nmnI3liqHlmajvvIznlKjkuo7kvp3otZbniYjmnKzliKTmlq1cclxuICAgICAqL1xyXG4gICAgZ2V0TmF0aXZlSG90VXBkYXRlVmVyc2lvbihnYW1laWQsIGNmZ1ZlcnNpb24/LCBwcm9qZWN0VXJsID0gXCJcIikge1xyXG4gICAgICAgIGxldCBuYXRpdmVVcmwgPSB0aGlzLmdldE5hdGl2ZUhvdFVwZGF0ZVBhdGgoZ2FtZWlkKSArIFwiL1wiICsgdGhpcy5wcm9qZWN0Q2ZnRmlsZU5hbWVcclxuICAgICAgICBsZXQgdmVyc2lvbiA9IFwiMC4wLjBcIlxyXG4gICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2ZXJzaW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaXNFeGlzdCA9IGpzYi5maWxlVXRpbHMuaXNGaWxlRXhpc3QobmF0aXZlVXJsKVxyXG4gICAgICAgIGlmIChpc0V4aXN0KSB7XHJcbiAgICAgICAgICAgIGxldCBqc29uU3RyID0ganNiLmZpbGVVdGlscy5nZXRTdHJpbmdGcm9tRmlsZShuYXRpdmVVcmwpXHJcbiAgICAgICAgICAgIGxldCBqc29uRGF0YSA9IEpTT04ucGFyc2UoanNvblN0cilcclxuICAgICAgICAgICAgaWYgKGpzb25EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2ZnVmVyc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChqc29uRGF0YS5jZmdWZXJzaW9uICE9IG51bGwgJiYganNvbkRhdGEuY2ZnVmVyc2lvbiAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLnVwZGF0ZU5hdGl2ZUhvdFVwZGF0ZVZlcnNpb24oZ2FtZWlkLCBqc29uRGF0YS5jZmdWZXJzaW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ganNvbkRhdGEuY2ZnVmVyc2lvblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChqc29uRGF0YS52ZXJzaW9uICE9IG51bGwgJiYganNvbkRhdGEudmVyc2lvbiAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwiZ2V0TmF0aXZlSG90VXBkYXRlVmVyc2lvbiAtLS0tIGdhbWVpZCAgXCIgKyBnYW1laWQgKyBcIiBqc29uRGF0YS52ZXJzaW9uID0gXCIgKyBqc29uRGF0YS52ZXJzaW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb24gPSBqc29uRGF0YS52ZXJzaW9uXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVOYXRpdmVIb3RVcGRhdGVWZXJzaW9uKGdhbWVpZCwgdmVyc2lvbilcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImdldE5hdGl2ZUhvdFVwZGF0ZVZlcnNpb24gLS0tLWpzb25EYXRhLnZlcnNpb24gPSBudWxsIDIgXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwiZ2V0TmF0aXZlSG90VXBkYXRlVmVyc2lvbiAtLS0tanNvbkRhdGEudmVyc2lvbiA9IG51bGwgMSBcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmVyc2lvblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcHJvamVjdEV4aXN0ID0ganNiLmZpbGVVdGlscy5pc0ZpbGVFeGlzdChwcm9qZWN0VXJsKVxyXG4gICAgICAgIGlmIChwcm9qZWN0RXhpc3QpIHtcclxuICAgICAgICAgICAgbGV0IGpzb25TdHIgPSBqc2IuZmlsZVV0aWxzLmdldFN0cmluZ0Zyb21GaWxlKHByb2plY3RVcmwpXHJcbiAgICAgICAgICAgIGxldCBqc29uRGF0YSA9IEpTT04ucGFyc2UoanNvblN0cilcclxuICAgICAgICAgICAgaWYgKGpzb25EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2ZnVmVyc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChqc29uRGF0YS5jZmdWZXJzaW9uICE9IG51bGwgJiYganNvbkRhdGEuY2ZnVmVyc2lvbiAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLnVwZGF0ZU5hdGl2ZUhvdFVwZGF0ZVZlcnNpb24oZ2FtZWlkLCBqc29uRGF0YS5jZmdWZXJzaW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ganNvbkRhdGEuY2ZnVmVyc2lvblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIjAuMC4wXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZlcnNpb247XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldE5hdGl2ZUhvdFVwZGF0ZVBhdGgoZ2FtZWlkKSB7XHJcbiAgICAgICAgbGV0IGdhbWVQYXRoID0gdGhpcy51cGRhdGVIZWxwZXIuZ2VuU3RvcmFnZVBhdGgoZ2FtZWlkKVxyXG4gICAgICAgIHJldHVybiBnYW1lUGF0aDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIb3RVcGRhdGVWZXJzaW9uKGdhbWVpZCxwYXRoLGZpbGVOYW1lKSB7XHJcbiAgICAgICAgbGV0IG5hdGl2ZVVybCA9IHBhdGggKyBcIi9cIitmaWxlTmFtZVxyXG4gICAgICAgIGxldCB2ZXJzaW9uID0gXCIwLjAuMFwiXHJcbiAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZlcnNpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExvZ2dlci5lcnJvcihcImdldEhvdFVwZGF0ZVZlcnNpb24tLXBhdGg9PT09PT09PT09PT09PT09XCIscGF0aClcclxuICAgICAgICBsZXQgaXNFeGlzdCA9IGpzYi5maWxlVXRpbHMuaXNGaWxlRXhpc3QobmF0aXZlVXJsKVxyXG4gICAgICAgIGlmIChpc0V4aXN0KSB7XHJcbiAgICAgICAgICAgIGxldCBqc29uU3RyID0ganNiLmZpbGVVdGlscy5nZXRTdHJpbmdGcm9tRmlsZShuYXRpdmVVcmwpXHJcbiAgICAgICAgICAgIGxldCBqc29uRGF0YSA9IEpTT04ucGFyc2UoanNvblN0cilcclxuICAgICAgICAgICAgaWYgKGpzb25EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoanNvbkRhdGEudmVyc2lvbiAhPSBudWxsICYmIGpzb25EYXRhLnZlcnNpb24gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImdldEhvdFVwZGF0ZVZlcnNpb24gLS0tLSBnYW1laWQgIFwiICsgZ2FtZWlkICsgXCIganNvbkRhdGEudmVyc2lvbiA9IFwiICsganNvbkRhdGEudmVyc2lvbilcclxuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uID0ganNvbkRhdGEudmVyc2lvblxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy51cGRhdGVOYXRpdmVIb3RVcGRhdGVWZXJzaW9uKGdhbWVpZCwgdmVyc2lvbilcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImdldEhvdFVwZGF0ZVZlcnNpb24gLS0tLWpzb25EYXRhLnZlcnNpb24gPSBudWxsIDIgXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwiZ2V0SG90VXBkYXRlVmVyc2lvbiAtLS0tanNvbkRhdGEudmVyc2lvbiA9IG51bGwgMSBcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmVyc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZW1vdGVWZXNpb24oZ2FtZWlkLGJ1bmRsZU5hbWUsbmV3VmVyc2lvbilcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbmF0aXZlVXJsID0gdGhpcy5nZXROYXRpdmVIb3RVcGRhdGVQYXRoKGdhbWVpZCkgICsgXCIvXCIrIG5ld1ZlcnNpb24gKyBcIi5tYW5pZmVzdFwiXHJcbiAgICAgICAgbGV0IHZlcnNpb24gPSBcIjAuMC4wXCJcclxuICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmVyc2lvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlzRXhpc3QgPSBqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KG5hdGl2ZVVybClcclxuICAgICAgICBpZiAoaXNFeGlzdCkge1xyXG4gICAgICAgICAgICBsZXQganNvblN0ciA9IGpzYi5maWxlVXRpbHMuZ2V0U3RyaW5nRnJvbUZpbGUobmF0aXZlVXJsKVxyXG4gICAgICAgICAgICBsZXQganNvbkRhdGEgPSBKU09OLnBhcnNlKGpzb25TdHIpXHJcbiAgICAgICAgICAgIGlmIChqc29uRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGpzb25EYXRhW2J1bmRsZU5hbWVdICE9IG51bGwgJiYganNvbkRhdGFbYnVuZGxlTmFtZV0gIT0gdW5kZWZpbmVkICYmIGpzb25EYXRhW2J1bmRsZU5hbWVdW1widmVyc2lvblwiXSAhPSBudWxsICYmIGpzb25EYXRhW2J1bmRsZU5hbWVdW1widmVyc2lvblwiXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwiZ2V0UmVtb3RlSG90VXBkYXRlVmVyc2lvbiAtLS0tIGdhbWVpZCAgXCIgKyBnYW1laWQgKyBcIiBqc29uRGF0YS52ZXJzaW9uID0gXCIgKyBqc29uRGF0YVtidW5kbGVOYW1lXVtcInZlcnNpb25cIl0pXHJcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbiA9IGpzb25EYXRhW2J1bmRsZU5hbWVdW1widmVyc2lvblwiXVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy51cGRhdGVOYXRpdmVIb3RVcGRhdGVWZXJzaW9uKGdhbWVpZCwgbmV3VmVyc2lvbilcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImdldFJlbW90ZUhvdFVwZGF0ZVZlcnNpb24gLS0tLWpzb25EYXRhLnZlcnNpb24gPSBudWxsIDIgXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwiZ2V0UmVtb3RlSG90VXBkYXRlVmVyc2lvbiAtLS0tanNvbkRhdGEudmVyc2lvbiA9IG51bGwgMSBcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmVyc2lvbjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0UmVtb3RlSG90VXBkYXRlVXJsKGdhbWVpZCxidW5kbGVOYW1lLG5ld1ZlcnNpb24saG90VXBkYXRlVXJsKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB1cmwgPSBcIlwiXHJcbiAgICAgICAgbGV0IG5hdGl2ZVVybCA9IHRoaXMuZ2V0TmF0aXZlSG90VXBkYXRlUGF0aChnYW1laWQpICArIFwiL1wiKyBuZXdWZXJzaW9uICsgXCIubWFuaWZlc3RcIlxyXG4gICAgICAgIGhvdFVwZGF0ZVVybCA9IEdsb2JhbC5Ub29sa2l0LmFkanVzdFVybChob3RVcGRhdGVVcmwpXHJcbiAgICAgICAgLy9Mb2dnZXIuZXJyb3IoXCJuYXRpdmVVcmw9PT09PT09PT09PT1cIixuYXRpdmVVcmwpXHJcbiAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVybDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlzRXhpc3QgPSBqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KG5hdGl2ZVVybClcclxuICAgICAgICBpZiAoaXNFeGlzdCkge1xyXG4gICAgICAgICAgICBsZXQganNvblN0ciA9IGpzYi5maWxlVXRpbHMuZ2V0U3RyaW5nRnJvbUZpbGUobmF0aXZlVXJsKVxyXG4gICAgICAgICAgICBsZXQganNvbkRhdGEgPSBKU09OLnBhcnNlKGpzb25TdHIpXHJcbiAgICAgICAgICAgIGlmIChqc29uRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiYnVuZGxlTmFtZS0tLS0tLS0tLS1cIixidW5kbGVOYW1lKVxyXG4gICAgICAgICAgICAgICAgaWYgKGpzb25EYXRhW2J1bmRsZU5hbWVdICE9IG51bGwgJiYganNvbkRhdGFbYnVuZGxlTmFtZV0gIT0gdW5kZWZpbmVkICYmIGpzb25EYXRhW2J1bmRsZU5hbWVdW1wicGF0aFwiXSAhPSBudWxsICYmIGpzb25EYXRhW2J1bmRsZU5hbWVdW1wicGF0aFwiXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwiZ2V0UmVtb3RlVXJsIC0tLS0gZ2FtZWlkICBcIiArIGdhbWVpZCArIFwiIGpzb25EYXRhLnBhdGggPSBcIiArIGpzb25EYXRhW2J1bmRsZU5hbWVdW1wicGF0aFwiXSlcclxuICAgICAgICAgICAgICAgICAgICB1cmwgPSBob3RVcGRhdGVVcmwranNvbkRhdGFbYnVuZGxlTmFtZV1bXCJwYXRoXCJdICtcIi9cIisganNvbkRhdGFbYnVuZGxlTmFtZV1bXCJ2ZXJzaW9uXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVOYXRpdmVIb3RVcGRhdGVWZXJzaW9uKGdhbWVpZCwgbmV3VmVyc2lvbilcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImdldFJlbW90ZUhvdFVwZGF0ZVVybCAtLS0tanNvbkRhdGFbYnVuZGxlTmFtZV1bcGF0aCA9IG51bGwgMiBcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJnZXRSZW1vdGVIb3RVcGRhdGVVcmwgLS0tLWpzb25EYXRhW2J1bmRsZU5hbWVdW3BhdGggPSBudWxsIDEgXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9Mb2dnZXIuZXJyb3IoXCJnZXRSZW1vdGVIb3RVcGRhdGVVcmw9PT09PT09PT09PT09PT09PT1cIix1cmwpXHJcbiAgICAgICAgcmV0dXJuIHVybDtcclxuICAgIH1cclxuICAgICAvL+iOt+WPlui/nOeoi+W9k+WJjeeJiOacrOWPt1xyXG4gICAgIGdldEdhbWVWZXJzaW9uID0gZnVuY3Rpb24gKHdob2xldXJsKSB7XHJcbiAgICAgICAvLyBjb25zb2xlLmxvZyhcImdldEdhbWVWZXJzaW9uXCIpO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIGxldCB4aHIgPSBjYy5sb2FkZXIuZ2V0WE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHhoci5yZWFkeVN0YXRlID09PSA0KXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzcG9uZSA9IHhoci5yZXNwb25zZVRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXNwb25lKTtcclxuICAgICAgICAgICAgICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhcInZlcnNpb249XCIsIGRhdGEsIGRhdGEudmVyc2lvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB4aHIudGltZW91dCA9IDMwMDAwO1xyXG4gICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZ2V0R2FtZVZlcnNpb24gd2hvbGV1cmw9XCIsIHdob2xldXJsKTtcclxuICAgICAgICAgICAgeGhyLm9wZW4oXCJHRVRcIiwgd2hvbGV1cmwsIHRydWUpO1xyXG4gICAgICAgICAgICB4aHIub250aW1lb3V0ID0gKCk9PntyZWplY3QoKX1cclxuICAgICAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gZ2FtZWlkIElEXHJcbiAgICAgKiBAcGFyYW0gdmVyc2lvbiDniYjmnKxcclxuICAgICAqIEBwYXJhbSBob3RVcGRhdGVVcmwg54Ot5pu0dXJsXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCDmnKzlnLB1cmxcclxuICAgICAqIEBwYXJhbSBuYXRpdmVNYW5pZmVzdEZpbGVQYXRoIOmaj+WMhei1hOa6kHVybFxyXG4gICAgICogQHBhcmFtIGlzSGFsbCDmmK/lkKblpKfljoVcclxuICAgICAqL1xyXG4gICAgZ2V0TWFuaWZlc3RPYmooaG90VXBkYXRlVXJsOiBzdHJpbmcsIGNvbnRleHQ6c3RyaW5nLCkge1xyXG4gICAgICAgIGxldCBIb3RVcGRhdGVNYW5hZ2VyID0gR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXI7XHJcbiAgICAgICAgaWYgKGhvdFVwZGF0ZVVybCA9PSBudWxsIHx8IGhvdFVwZGF0ZVVybCA9PSB1bmRlZmluZWQgfHwgaG90VXBkYXRlVXJsID09IFwiXCIpIHtcclxuICAgICAgICAgICAgaG90VXBkYXRlVXJsID0gSG90VXBkYXRlTWFuYWdlci5ob3RVcGRhdGVVcmxcclxuICAgICAgICB9XHJcbiAgICAgICAgaG90VXBkYXRlVXJsID0gR2xvYmFsLlRvb2xraXQuYWRqdXN0VXJsKGhvdFVwZGF0ZVVybClcclxuICAgICAgICBsZXQganNvbkFzc2V0cyA9IHt9XHJcbiAgICAgICAgbGV0IGphc29uVmVyc2lvbiA9IFwiMC4wLjBcIjtcclxuXHJcbiAgICAgICAgbGV0IG5hdGl2ZU1haWZlc3QgPSBjb250ZXh0ICtcIi9cIisgdGhpcy5wcm9qZWN0Q2ZnRmlsZU5hbWVcclxuICAgICAgICBsZXQgaXNOYXRpdmVNYW5pZmVzdEV4aXN0ID0ganNiLmZpbGVVdGlscy5pc0ZpbGVFeGlzdChuYXRpdmVNYWlmZXN0KVxyXG5cclxuICAgICAgICAvLyBMb2dnZXIuZXJyb3IoXCJuYXRpdmVNYWlmZXN0LS0tLS0tLS0tLS0tLS1cIixuYXRpdmVNYWlmZXN0KVxyXG4gICAgICAgIGlmIChpc05hdGl2ZU1hbmlmZXN0RXhpc3QpIHtcclxuICAgICAgICAgICAgbGV0IGpzb25TdHIgPSBqc2IuZmlsZVV0aWxzLmdldFN0cmluZ0Zyb21GaWxlKG5hdGl2ZU1haWZlc3QpIC8vbmV3IOagh+W/l+aWsOeDreabtFxyXG4gICAgICAgICAgICBsZXQganNvbkRhdGEgPSBKU09OLnBhcnNlKGpzb25TdHIpXHJcbiAgICAgICAgICAgIGlmIChqc29uRGF0YS5hc3NldHMgJiYganNvbkRhdGEubmV3KSB7XHJcbiAgICAgICAgICAgICAgICBqc29uQXNzZXRzID0ganNvbkRhdGEuYXNzZXRzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoanNvbkRhdGEuYXNzZXRzKXtcclxuICAgICAgICAgICAgICAgIGphc29uVmVyc2lvbiA9IGpzb25EYXRhLnZlcnNpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgIC8vIExvZ2dlci5lcnJvcihcInByb2plY3RwYXRoPT09PT09PT09XCIsUHJvamVjdEZpbGVQYXRoKVxyXG4gICAgICAgIC8vTG9nZ2VyLmxvZyhcImNoYW5nZU1hbmlmZXN0VXJsIGhvdFVwZGF0ZVVybCA9IFwiICsgaG90VXBkYXRlVXJsKVxyXG4gICAgICAgIGxldCBsb2NhbE1hbmlmZXN0SnNvbk9iaiA9IHtcclxuICAgICAgICAgICAgXCJwYWNrYWdlVXJsXCI6IGhvdFVwZGF0ZVVybCxcclxuICAgICAgICAgICAgXCJyZW1vdGVNYW5pZmVzdFVybFwiOiBob3RVcGRhdGVVcmwgKyB0aGlzLnByb2plY3RDZmdGaWxlTmFtZSxcclxuICAgICAgICAgICAgXCJyZW1vdGVWZXJzaW9uVXJsXCI6IGhvdFVwZGF0ZVVybCAgKyB0aGlzLnZlcnNpb25DZmdGaWxlTmFtZSxcclxuICAgICAgICAgICAgXCJ2ZXJzaW9uXCI6IGphc29uVmVyc2lvbixcclxuICAgICAgICAgICAgXCJhc3NldHNcIjoganNvbkFzc2V0cyxcclxuICAgICAgICAgICAgXCJzZWFyY2hQYXRoc1wiOiBbXVxyXG4gICAgICAgIH1cclxuICAgICAgLy8gIGNvbnNvbGUubG9nKFwi6L+Z5piv5b2T5YmN5Yqg6L2955qE5pys5Zyw6YWN572u5paH5Lu2XCIsSlNPTi5zdHJpbmdpZnkobG9jYWxNYW5pZmVzdEpzb25PYmopKVxyXG4gICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGxvY2FsTWFuaWZlc3RKc29uT2JqXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZUxvY2FsVXJsKHVybCxwYXJhbSxjb250ZXh0LGZpbGVOYW1lKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBmdWxsTG9jYWxVcmwgPSB0aGlzLnVwZGF0ZUhlbHBlci5nZW5TdG9yYWdlUGF0aChjb250ZXh0KSArIFwiL1wiICtmaWxlTmFtZVxyXG4gICAgICAgIGlmKCFqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KGZ1bGxMb2NhbFVybCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLmib7kuI3liLDmlofku7ZcIiwgZnVsbExvY2FsVXJsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY29udGVudCA9IGpzYi5maWxlVXRpbHMuZ2V0U3RyaW5nRnJvbUZpbGUoZnVsbExvY2FsVXJsKTtcclxuICAgICAgICBsZXQgdG1wTWFuaWZlc3QgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRtcE1hbmlmZXN0LnJlbW90ZU1hbmlmZXN0VXJsLmluZGV4T2YocGFyYW0pXHJcbiAgICAgICAgaWYoaW5kZXggIT0gLTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0bXBNYW5pZmVzdC5yZW1vdGVNYW5pZmVzdFVybCA9IHVybCArIHRtcE1hbmlmZXN0LnJlbW90ZU1hbmlmZXN0VXJsLnN1YnN0cmluZyhpbmRleCAtMSx0bXBNYW5pZmVzdC5yZW1vdGVNYW5pZmVzdFVybC5sZW5ndGgpXHJcbiAgICAgICAgICAgIHRtcE1hbmlmZXN0LnBhY2thZ2VVcmwgPSB1cmwgKyB0bXBNYW5pZmVzdC5wYWNrYWdlVXJsLnN1YnN0cmluZyhpbmRleCAtMSx0bXBNYW5pZmVzdC5yZW1vdGVNYW5pZmVzdFVybC5sZW5ndGgpO1xyXG4gICAgICAgICAgICB0bXBNYW5pZmVzdC5yZW1vdGVWZXJzaW9uVXJsID0gdXJsICsgdG1wTWFuaWZlc3QucmVtb3RlVmVyc2lvblVybC5zdWJzdHJpbmcoaW5kZXggLTEsdG1wTWFuaWZlc3QucmVtb3RlTWFuaWZlc3RVcmwubGVuZ3RoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbmV3VG1wQ29udGVudCA9IEpTT04uc3RyaW5naWZ5KHRtcE1hbmlmZXN0KTtcclxuICAgICAgICBqc2IuZmlsZVV0aWxzLndyaXRlU3RyaW5nVG9GaWxlKG5ld1RtcENvbnRlbnQsIGZ1bGxMb2NhbFVybCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZU5hdGl2ZUhvdFVwZGF0ZVZlcnNpb24oZ2FtZWlkLCB2ZXJzaW9uKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubmF0aXZlVmVyc2lvbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVWZXJzaW9uc1tnYW1laWRdID0gdmVyc2lvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGdhbWVJbmZvID0gR2xvYmFsLkdhbWVEYXRhLmdldEdhbWVJbmZvKGdhbWVpZClcclxuICAgICAgICBpZiAoZ2FtZUluZm8pIHtcclxuICAgICAgICAgICAgZ2FtZUluZm8ubmF0aXZlX3ZlcnNpb24gPSB2ZXJzaW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldE5hdGl2ZVZlcnNpb25GaWxlVXJsKGdhbWVpZCxuZXdWZXJzaW9uKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFuZXdWZXJzaW9uKSByZXR1cm5cclxuICAgICAgIHJldHVybiBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5nZXROYXRpdmVIb3RVcGRhdGVQYXRoKGdhbWVpZCkgICsgXCIvXCIrIG5ld1ZlcnNpb24gKyBcIi5tYW5pZmVzdFwiXHJcbiAgICB9XHJcblxyXG4gICAgLy/liKDpmaTng63mm7Tnm67lvZVcclxuICAgIHJlbW92ZU5hdGl2ZUhvdFVwZGF0ZURpcihnYW1laWQpIHtcclxuICAgICAgICBsZXQgZ2FtZVBhdGggPSB0aGlzLmdldE5hdGl2ZUhvdFVwZGF0ZVBhdGgoZ2FtZWlkKVxyXG4gICAgICAgIGpzYi5maWxlVXRpbHMucmVtb3ZlRGlyZWN0b3J5KGdhbWVQYXRoKVxyXG4gICAgICAgIGlmIChnYW1laWQgPT0gXCJoYWxsXCIpe1xyXG4gICAgICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQudW56aXBIYWxsUGFja2FnZSgpOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDng63mm7Tnu4Tku7ZcclxuICAgICAqIEBwYXJhbSBnYW1laWQg5ri45oiPaWRcclxuICAgICAqIEBwYXJhbSBnYW1lVmVyc2lvbiDnm67moIfniYjmnKxcclxuICAgICAqIEBwYXJhbSBnYW1lVXBkYXRlVXJsIOeDreabtHVybFxyXG4gICAgICogQHBhcmFtIGlzQmFjayDmmK/lkKblm57pgIBcclxuICAgICAqIEBwYXJhbSBzdGF0ZSDng63mm7TnirbmgIEg5Yid5aeLIC0xMDAwIC0xIOayoeS4i+i9vei/hyAwIOS4i+i9veaIkOWKn+W5tuS4lOeJiOacrOaYr+acgOaWsCAgMeS4i+i9veaIkOWKn++8jOeJiOacrOS4jeaYr+acgOaWsCAy5LiL6L295LitIDPnrYnlvoXkuIvovb0gICA05LiL6L295aSx6LSlXHJcbiAgICAgKiBAcGFyYW0gc3RhcnRWZXIg5Yid5aeL54mI5pysXHJcbiAgICAgKiBAcGFyYW0gcHJpb3JpdHkgXHJcbiAgICAgKi9cclxuICAgIGFkZEhvdFVwZGF0ZUdhbWVDb21wKGdhbWVpZCwgZ2FtZVZlcnNpb24sIGdhbWVVcGRhdGVVcmwscmVtb3RlVmVyLHByaW9yaXR5ID0gZmFsc2UpIHtcclxuICAgICAgICBsZXQgaG90VXBkYXRlQ29tcG9uZW50ID0gbmV3IEdhbWVIb3RVcGRhdGVDb21wb25lbnQoKTtcclxuICAgICAgICBob3RVcGRhdGVDb21wb25lbnQuaW5pdENoZWNrVXBEYXRlKGdhbWVpZCwgZ2FtZVZlcnNpb24sIGdhbWVVcGRhdGVVcmwscmVtb3RlVmVyKVxyXG4gICAgICAgIGxldCBhdXRvRmxhZyA9IHRoaXMuZ2V0QXV0b0lubGlzdCgpXHJcbiAgICAgICAgbGV0IGluc2VydEluZGV4ID0gdGhpcy5nZXRJbmRleCgpXHJcbiAgICAgICAgaWYoYXV0b0ZsYWcgJiYgIXByaW9yaXR5KSAvLyDpnZ7oh6rliqjkuIvovb3nmoTmuLjmiI/kvJjlhYjnuqfmm7Tpq5hcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGluc2VydEluZGV4ID09IC0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNoZWNrSXNHYW1lRG93bmluZygpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUhvdFVwZGF0ZUxpc3Quc3BsaWNlKDEsMCxob3RVcGRhdGVDb21wb25lbnQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lSG90VXBkYXRlTGlzdC51bnNoaWZ0KGhvdFVwZGF0ZUNvbXBvbmVudClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUhvdFVwZGF0ZUxpc3Quc3BsaWNlKGluc2VydEluZGV4KzEsMCxob3RVcGRhdGVDb21wb25lbnQpXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUhvdFVwZGF0ZUxpc3QucHVzaChob3RVcGRhdGVDb21wb25lbnQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5jaGVja0lzR2FtZURvd25pbmcoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0SG90VXBkYXRlR2FtZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/np7vpmaTng63mm7Tnu4Tku7ZcclxuICAgIHJlbW92ZUdhbWVDb21wKGdhbWVpZCkge1xyXG4gICAgICAgIGxldCBnYW1lSG90VXBkYXRlQ29tcCA9IHRoaXMuZ2V0SG90VXBkYXRlR2FtZUNvbXAoZ2FtZWlkKTtcclxuICAgICAgICB0aGlzLmdhbWVIb3RVcGRhdGVMaXN0LnNwbGljZSh0aGlzLmdhbWVIb3RVcGRhdGVMaXN0LmluZGV4T2YoZ2FtZUhvdFVwZGF0ZUNvbXApLDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6Ieq5Yqo5LiL6L2955qE57Si5byVXHJcbiAgICAgKi9cclxuICAgIGdldEluZGV4KClcclxuICAgIHtcclxuICAgICAgICBsZXQgaW5kZXggPSAtMTtcclxuICAgICAgICBsZXQgZ2lkTGlzdCA9IEdsb2JhbC5HYW1lRGF0YS5hdXRvRG93bkxpc3RcclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5nYW1lSG90VXBkYXRlTGlzdC5sZW5ndGgtMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgbGV0IGhvdFVwZGF0ZUNvbXBvbmVudCA9IHRoaXMuZ2FtZUhvdFVwZGF0ZUxpc3RbaV1cclxuICAgICAgICAgICAgaWYgKGdpZExpc3QuaW5kZXhPZihOdW1iZXIoaG90VXBkYXRlQ29tcG9uZW50Ll9nYW1lVHlwZSkpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXhcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuacieiHquWKqOS4i+i9vVxyXG4gICAgICovXHJcbiAgICBnZXRBdXRvSW5saXN0KClcclxuICAgIHtcclxuICAgICAgICBsZXQgZ2lkTGlzdCA9IEdsb2JhbC5HYW1lRGF0YS5hdXRvRG93bkxpc3RcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ2FtZUhvdFVwZGF0ZUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGhvdFVwZGF0ZUNvbXBvbmVudCA9IHRoaXMuZ2FtZUhvdFVwZGF0ZUxpc3RbaV1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChnaWRMaXN0LmluZGV4T2YoTnVtYmVyKGhvdFVwZGF0ZUNvbXBvbmVudC5fZ2FtZVR5cGUpKSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5byA5aeL5ri45oiP5LiL6L29XHJcbiAgICBzdGFydEhvdFVwZGF0ZUdhbWUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZUhvdFVwZGF0ZUxpc3QpIHtcclxuICAgICAgICAgICAgbGV0IGhvdFVwZGF0ZUNvbXBvbmVudCA9IHRoaXMuZ2FtZUhvdFVwZGF0ZUxpc3RbMF1cclxuICAgICAgICAgICAgaWYgKGhvdFVwZGF0ZUNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICAgICAgaG90VXBkYXRlQ29tcG9uZW50LmNoZWNrVmVyc2lvblVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5LiL6L2957uE5Lu2XHJcbiAgICBnZXRIb3RVcGRhdGVHYW1lQ29tcChnYW1laWQpIHtcclxuICAgICAgICBsZXQgZ2FtZUNvbXAgPSBudWxsO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5nYW1lSG90VXBkYXRlTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaG90VXBkYXRlQ29tcG9uZW50ID0gdGhpcy5nYW1lSG90VXBkYXRlTGlzdFtpXVxyXG4gICAgICAgICAgICBpZiAoaG90VXBkYXRlQ29tcG9uZW50Ll9nYW1lVHlwZSA9PT0gZ2FtZWlkKSB7XHJcbiAgICAgICAgICAgICAgICBnYW1lQ29tcCA9IGhvdFVwZGF0ZUNvbXBvbmVudDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBnYW1lQ29tcDtcclxuICAgIH1cclxuXHJcbiAgICAvL+ajgOafpeaYr+WQpuaciea4uOaIj+WcqOS4i+i9vVxyXG4gICAgY2hlY2tJc0dhbWVEb3duaW5nKCkge1xyXG4gICAgICAgIGxldCBpc0Rvd25pbmcgPSBmYWxzZVxyXG4gICAgICAgIGlmICh0aGlzLmdhbWVIb3RVcGRhdGVMaXN0KSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5nYW1lSG90VXBkYXRlTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGhvdFVwZGF0ZUNvbXBvbmVudCA9IHRoaXMuZ2FtZUhvdFVwZGF0ZUxpc3RbaV1cclxuICAgICAgICAgICAgICAgIGlmIChob3RVcGRhdGVDb21wb25lbnQuX3VwZGF0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNEb3duaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNEb3duaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5b2T5YmN5piv5ZOq5Liq5ri45oiP5Zyo5LiL6L29XHJcbiAgICBnZXRXaGljaEdhbWVJc0Rvd25pbmcoKSB7XHJcbiAgICAgICAgbGV0IGdpZCA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZUhvdFVwZGF0ZUxpc3QpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdhbWVIb3RVcGRhdGVMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaG90VXBkYXRlQ29tcG9uZW50ID0gdGhpcy5nYW1lSG90VXBkYXRlTGlzdFtpXVxyXG4gICAgICAgICAgICAgICAgaWYgKGhvdFVwZGF0ZUNvbXBvbmVudC5fdXBkYXRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBnaWQgPSBob3RVcGRhdGVDb21wb25lbnQuX2dhbWVUeXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBnaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liKDpmaTng63mm7Tnu4Tku7ZcclxuICAgIHJlbW92ZUhvdFVwZGF0ZUdhbWVDb21wKGdhbWVpZCwgaXNTdGFydE5ldzogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZUhvdFVwZGF0ZUxpc3QpIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gLTE7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5nYW1lSG90VXBkYXRlTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGhvdFVwZGF0ZUNvbXBvbmVudCA9IHRoaXMuZ2FtZUhvdFVwZGF0ZUxpc3RbaV1cclxuICAgICAgICAgICAgICAgIGlmIChob3RVcGRhdGVDb21wb25lbnQuX2dhbWVUeXBlID09PSBnYW1laWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29tcCA9IHRoaXMuZ2FtZUhvdFVwZGF0ZUxpc3Quc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICAgICAgY29tcCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzU3RhcnROZXcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRIb3RVcGRhdGVHYW1lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNoYW5nZU1hbmlmZXN0VXJsKGdhbWVpZDogc3RyaW5nLCB2ZXJzaW9uOiBzdHJpbmcsIGhvdFVwZGF0ZVVybDogc3RyaW5nLCBuYXRpdmVNYW5pZmVzdEZpbGVQYXRoPzogc3RyaW5nLCBpc0JhY2sgPSAwKSB7XHJcbiAgICAgICAgbGV0IEhvdFVwZGF0ZU1hbmFnZXIgPSBHbG9iYWwuSG90VXBkYXRlTWFuYWdlcjtcclxuICAgICAgICBpZiAoaG90VXBkYXRlVXJsID09IG51bGwgfHwgaG90VXBkYXRlVXJsID09IHVuZGVmaW5lZCB8fCBob3RVcGRhdGVVcmwgPT0gXCJcIikge1xyXG4gICAgICAgICAgICBob3RVcGRhdGVVcmwgPSBIb3RVcGRhdGVNYW5hZ2VyLmhvdFVwZGF0ZVVybFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbmF0aXZlRmlsZVBhdGggPSBuYXRpdmVNYW5pZmVzdEZpbGVQYXRoXHJcbiAgICAgICAgaWYgKCFuYXRpdmVGaWxlUGF0aCkge1xyXG4gICAgICAgICAgICBuYXRpdmVGaWxlUGF0aCA9IHRoaXMuZ2V0TmF0aXZlSG90VXBkYXRlUGF0aChnYW1laWQpICsgXCIvXCIgKyB0aGlzLnByb2plY3RDZmdGaWxlTmFtZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBuYXRpdmVNYWlmZXN0ID0gdGhpcy5nZXROYXRpdmVIb3RVcGRhdGVQYXRoKGdhbWVpZCkgKyBcIi9cIiArIHRoaXMucHJvamVjdENmZ0ZpbGVOYW1lXHJcbiAgICAgICAgICAgIGxldCBpc05hdGl2ZU1hbmlmZXN0RXhpc3QgPSBqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KG5hdGl2ZU1haWZlc3QpXHJcbiAgICAgICAgICAgIGxldCBpc05hdGl2ZUZpbGVFeGl0ID0ganNiLmZpbGVVdGlscy5pc0ZpbGVFeGlzdChuYXRpdmVGaWxlUGF0aClcclxuICAgICAgICAgICAgbGV0IG5hdGl2ZUZpbGVWZXJzaW9uID0gXCIwLjAuMFwiXHJcbiAgICAgICAgICAgIGxldCBuYXRpdmVNYWlmZXN0VmVyc2lvbiA9IFwiMC4wLjBcIlxyXG5cclxuICAgICAgICAgICAgaWYgKGlzTmF0aXZlTWFuaWZlc3RFeGlzdCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25TdHIgPSBqc2IuZmlsZVV0aWxzLmdldFN0cmluZ0Zyb21GaWxlKG5hdGl2ZU1haWZlc3QpXHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGEgPSBKU09OLnBhcnNlKGpzb25TdHIpXHJcbiAgICAgICAgICAgICAgICBpZiAoanNvbkRhdGEudmVyc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hdGl2ZU1haWZlc3RWZXJzaW9uID0ganNvbkRhdGEudmVyc2lvblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc05hdGl2ZUZpbGVFeGl0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvblN0ciA9IGpzYi5maWxlVXRpbHMuZ2V0U3RyaW5nRnJvbUZpbGUobmF0aXZlRmlsZVBhdGgpXHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGEgPSBKU09OLnBhcnNlKGpzb25TdHIpXHJcbiAgICAgICAgICAgICAgICBpZiAoanNvbkRhdGEudmVyc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hdGl2ZUZpbGVWZXJzaW9uID0ganNvbkRhdGEudmVyc2lvblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChHbG9iYWwuVG9vbGtpdC52ZXJzaW9uQ29tcGFyZShuYXRpdmVNYWlmZXN0VmVyc2lvbiwgbmF0aXZlRmlsZVZlcnNpb24pID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbmF0aXZlRmlsZVBhdGggPSBuYXRpdmVNYWlmZXN0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaG90VXBkYXRlVXJsID0gaG90VXBkYXRlVXJsICsgXCIvXCIgKyBnYW1laWQgKyBcIi9cIiArIHZlcnNpb25cclxuICAgICAgICAvLyBMb2dnZXIubG9nKFwiY2hhbmdlTWFuaWZlc3RVcmwgaG90VXBkYXRlVXJsID0gXCIgKyBob3RVcGRhdGVVcmwpXHJcbiAgICAgICAgbGV0IGxvY2FsTWFuaWZlc3RKc29uT2JqID0ge1xyXG4gICAgICAgICAgICBcInBhY2thZ2VVcmxcIjogaG90VXBkYXRlVXJsLFxyXG4gICAgICAgICAgICBcInJlbW90ZU1hbmlmZXN0VXJsXCI6IGhvdFVwZGF0ZVVybCArIFwiL1wiICsgSG90VXBkYXRlTWFuYWdlci5wcm9qZWN0Q2ZnRmlsZU5hbWUsXHJcbiAgICAgICAgICAgIFwicmVtb3RlVmVyc2lvblVybFwiOiBob3RVcGRhdGVVcmwgKyBcIi9cIiArIEhvdFVwZGF0ZU1hbmFnZXIudmVyc2lvbkNmZ0ZpbGVOYW1lLFxyXG4gICAgICAgICAgICBcInZlcnNpb25cIjogXCIwLjAuMVwiLFxyXG4gICAgICAgICAgICBcImFzc2V0c1wiOiB7fSxcclxuICAgICAgICAgICAgXCJzZWFyY2hQYXRoc1wiOiBbXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGlzRXhpc3QgPSBqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KG5hdGl2ZUZpbGVQYXRoKVxyXG4gICAgICAgIGlmIChpc0V4aXN0KSB7XHJcbiAgICAgICAgICAgIGxldCBqc29uU3RyID0ganNiLmZpbGVVdGlscy5nZXRTdHJpbmdGcm9tRmlsZShuYXRpdmVGaWxlUGF0aClcclxuICAgICAgICAgICAgaWYgKGpzb25TdHIpIHtcclxuICAgICAgICAgICAgICAgIC8vIExvZ2dlci5sb2coXCJqc29uU3RyID09PT09PT1cIiArIGpzb25TdHIpXHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGEgPSBKU09OLnBhcnNlKGpzb25TdHIpXHJcbiAgICAgICAgICAgICAgICBsZXQgaXNNZXJnZUZpbGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy/lm57mu5rniYjmnKxcclxuICAgICAgICAgICAgICAgIGlmIChpc0JhY2sgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoR2xvYmFsLlRvb2xraXQudmVyc2lvbkNvbXBhcmUoanNvbkRhdGEudmVyc2lvbiwgdmVyc2lvbikgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCLlm57mu5rmuLjmiI8tLS0gZ2FtZWlkIFwiKyBnYW1laWQpIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WIoOmZpOacrOWcsOebruW9lVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlyUGF0aCA9IHRoaXMuZ2V0TmF0aXZlSG90VXBkYXRlUGF0aChnYW1laWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KGRpclBhdGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc2IuZmlsZVV0aWxzLnJlbW92ZURpcmVjdG9yeShkaXJQYXRoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWVpZCA9PSBcImhhbGxcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LnVuemlwSGFsbFBhY2thZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc01lcmdlRmlsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNNZXJnZUZpbGUgJiYganNvbkRhdGEucGFja2FnZVVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIExvZ2dlci5sb2coXCJuYXRpdmUgcGFja2FnZVVybCA9IFwiICsganNvbkRhdGEucGFja2FnZVVybClcclxuICAgICAgICAgICAgICAgICAgICBpZiAoanNvbkRhdGEucGFja2FnZVVybCAhPSBob3RVcGRhdGVVcmwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/kv67mlLnlnLDlnYBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxNYW5pZmVzdEpzb25PYmoucGFja2FnZVVybCA9IGhvdFVwZGF0ZVVybFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbE1hbmlmZXN0SnNvbk9iai5yZW1vdGVNYW5pZmVzdFVybCA9IGhvdFVwZGF0ZVVybCArIFwiL1wiICsgSG90VXBkYXRlTWFuYWdlci5wcm9qZWN0Q2ZnRmlsZU5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxNYW5pZmVzdEpzb25PYmoucmVtb3RlVmVyc2lvblVybCA9IGhvdFVwZGF0ZVVybCArIFwiL1wiICsgSG90VXBkYXRlTWFuYWdlci52ZXJzaW9uQ2ZnRmlsZU5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxNYW5pZmVzdEpzb25PYmoudmVyc2lvbiA9IGpzb25EYXRhLnZlcnNpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsTWFuaWZlc3RKc29uT2JqLmFzc2V0cyA9IGpzb25EYXRhLmFzc2V0cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxNYW5pZmVzdEpzb25PYmouc2VhcmNoUGF0aHMgPSBqc29uRGF0YS5zZWFyY2hQYXRocztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbE1hbmlmZXN0SnNvbk9iaiA9IGpzb25EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImZpbGUgbm90IGV4aXN0XCIpXHJcbiAgICAgICAgICAgIGxvY2FsTWFuaWZlc3RKc29uT2JqLnBhY2thZ2VVcmwgPSBob3RVcGRhdGVVcmxcclxuICAgICAgICAgICAgbG9jYWxNYW5pZmVzdEpzb25PYmoucmVtb3RlTWFuaWZlc3RVcmwgPSBob3RVcGRhdGVVcmwgKyBcIi9cIiArIEhvdFVwZGF0ZU1hbmFnZXIucHJvamVjdENmZ0ZpbGVOYW1lXHJcbiAgICAgICAgICAgIGxvY2FsTWFuaWZlc3RKc29uT2JqLnJlbW90ZVZlcnNpb25VcmwgPSBob3RVcGRhdGVVcmwgKyBcIi9cIiArIEhvdFVwZGF0ZU1hbmFnZXIudmVyc2lvbkNmZ0ZpbGVOYW1lXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsb2NhbE1hbmlmZXN0SnNvbk9ialxyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkNsZWFyKCkge1xyXG5cclxuICAgIH1cclxuICAgIG9uRGVzdHJveSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG5cclxufSJdfQ==