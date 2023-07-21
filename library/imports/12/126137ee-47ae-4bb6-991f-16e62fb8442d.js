"use strict";
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