
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/loadingMVC/HotUpdateProxy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a65b8XcQ1BJPYMskvCW/Kw2', 'HotUpdateProxy');
// hall/scripts/logic/core/loadingMVC/HotUpdateProxy.ts

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
var LoadingConst_1 = require("./LoadingConst");
var ReportTool_1 = require("../tool/ReportTool");
var HallStorageKey_1 = require("../../hallcommon/const/HallStorageKey");
// 大厅部分热更
var HotUpdateProxy = /** @class */ (function (_super) {
    __extends(HotUpdateProxy, _super);
    function HotUpdateProxy(manifest) {
        var _this = _super.call(this) || this;
        //服务器返回的热更地址
        _this.serverHotupdateUrl = "";
        _this.serverVersion = "";
        // Logger.log("----------HotUpdateProxy-------" + manifest.nativeUrl)
        _this.proxyName = HotUpdateProxy.NAME;
        _this.manifestNativeUrl = manifest.nativeUrl;
        return _this;
    }
    HotUpdateProxy.prototype.onRegister = function () {
        //初始化system信息
        Global.Setting.SystemInfo.Version = "1.0.5";
    };
    /**
     * _versionCompare
     */
    HotUpdateProxy.prototype._versionCompare = function (versionA, versionB) {
        // Logger.log("JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
        var vA = versionA.split('.');
        var vB = versionB.split('.');
        this._currentVersion = versionA;
        this._newestVersion = versionB;
        Global.HotUpdateManager.hallNewVersion = versionB;
        for (var i = 0; i < vA.length; ++i) {
            var a = parseInt(vA[i]);
            var b = parseInt(vB[i] || "0");
            if (a === b) {
                continue;
            }
            else {
                return a - b;
            }
        }
        if (vB.length > vA.length) {
            return -1;
        }
        else {
            return 0;
        }
    };
    HotUpdateProxy.prototype.check = function (hotUpdateUrl, version, isBack, checkVersionData) {
        if (isBack === void 0) { isBack = 0; }
        if (checkVersionData === void 0) { checkVersionData = null; }
        // this.checkVersionData = checkVersionData
        if (!cc.sys.isNative) {
            this.next();
            return;
        }
        if (!Global.Setting.isStartHotUpdate) {
            this.next();
            return;
        }
        this.checkVersionData = checkVersionData;
        //添加本地版本与服务器版本号一致不走热更逻辑。
        var hallNativeVer = Global.HotUpdateManager.getNativeHotUpdateVersion("hall");
        if (Global.Toolkit.versionCompare(version, hallNativeVer) == 0) {
            Logger.log("本地版本与服务器版本号一致");
            this.next();
            return;
        }
        var newHotUpdateUrl = hotUpdateUrl;
        var newVersion = version;
        var hotUpdateManager = Global.HotUpdateManager;
        if (newHotUpdateUrl) {
            Global.HotUpdateManager.hotUpdateUrl = newHotUpdateUrl;
        }
        else {
            newHotUpdateUrl = Global.HotUpdateManager.hotUpdateUrl;
        }
        if (newVersion) {
            Global.HotUpdateManager.hallNewVersion = newVersion;
        }
        else {
            newVersion = Global.HotUpdateManager.hallNewVersion;
        }
        //服务器热更地址
        this.serverHotupdateUrl = hotUpdateUrl + "/hall/" + version + "/";
        this.serverVersion = version;
        //修改热更新地址
        this.localManifestJsonObj = Global.HotUpdateManager.changeManifestUrl("hall", newVersion, newHotUpdateUrl, this.manifestNativeUrl, isBack);
        this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + hotUpdateManager.hotUpdateDirName + "/" + hotUpdateManager.hallHotUpdateDirName);
        // Logger.log("storagePath=======" + this._storagePath)
        // Logger.log("manifestUrl ======" + this.manifestNativeUrl)
        //修改本地版本文件
        var storageManifestUrl = this._storagePath + '/' + hotUpdateManager.updateHelper.prjFileName();
        //let jsonStr = JSON.stringify(this.localManifestJsonObj)
        var tmpManifest = this.localManifestJsonObj;
        var assets = tmpManifest.assets;
        var removeList = [];
        var appid = Global.Setting.SystemInfo.appID;
        for (var key in assets) {
            if (key.indexOf("app/") == 0) {
                if (key.indexOf("app/" + appid + "/") < 0) {
                    removeList.push(key);
                }
            }
        }
        for (var i = 0; i < removeList.length; i++) {
            delete (assets[removeList[i]]);
        }
        tmpManifest.assets = assets;
        jsb.fileUtils.writeStringToFile(JSON.stringify(tmpManifest), storageManifestUrl);
        this.localManifestJsonObj = tmpManifest;
        this._assetsMgr = new jsb.AssetsManager("", this._storagePath, this._versionCompare.bind(this));
        this._assetsMgr.setVerifyCallback(this._cbVerify);
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            this._assetsMgr.setMaxConcurrentTask(5);
        }
        this.sendNotification(LoadingConst_1.default.SHOW_CHECK_LABEL, { parm: "检查更新中..." });
        this.checkUpdate();
    };
    HotUpdateProxy.prototype.checkUpdate = function () {
        if (this._updating) {
            this.sendNotification(LoadingConst_1.default.SHOW_CHECK_LABEL, { parm: "检查更新中..." });
            return;
        }
        if (this._assetsMgr.getState() === jsb.AssetsManager.State.UNINITED) {
            // if (cc.loader.md5Pipe) {
            //     this.manifestUrl = cc.loader.md5Pipe.transformURL(this.manifestUrl);
            // }
            var jsonStr = JSON.stringify(this.localManifestJsonObj);
            // Logger.log("----------checkUpdate  jsonStr ========" + jsonStr)
            this.localManifest = new jsb.Manifest(jsonStr, this._storagePath);
            this._assetsMgr.loadLocalManifest(this.localManifest, this._storagePath);
        }
        // 更换 manifest 路径以后这里会报错
        if (!this._assetsMgr.getLocalManifest() || !this._assetsMgr.getLocalManifest().isLoaded()) {
            this.sendNotification(LoadingConst_1.default.SHOW_CHECK_LABEL, { parm: "导入文件失败，建议重启游戏或重新下载最新版本" });
            return;
        }
        this._assetsMgr.setEventCallback(this._cbCheckUpdate.bind(this));
        this._assetsMgr.checkUpdate();
        this._updating = true;
    };
    /**
     * _cbCheckUpdate
     *
     * ios10中，在弹出是否允许联网之前，会报：
     * AssetsManagerEx : Fail to download version file, step skipped Code: 1
     */
    HotUpdateProxy.prototype._cbCheckUpdate = function (event) {
        var _this = this;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.sendNotification(LoadingConst_1.default.SHOW_PROGRESS_BAR, { parm: -1 });
                this.sendNotification(LoadingConst_1.default.SHOW_CHECK_LABEL, { parm: "已经是最新版" });
                this.next();
                break;
            //version Update_progression在new version found之前
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                if (event && event.getMessage() == "VersionDownloaded") {
                    Logger.error("VersionDownloaded formatVersion");
                    this.formatVersion();
                }
                else if (event && event.getMessage() == "ProjectDownloaded") {
                    Logger.error("ProjectDownloaded formatManifest");
                    this.formatManifest();
                }
                return;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                // ui - bar
                // this._showRetry( false );
                // this.barProgress.progress = 0 ;
                this.sendNotification(LoadingConst_1.default.SHOW_PROGRESS_BAR, { parm: 0 });
                this._needUpdate = true;
                break;
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                var reportParam = { "game": "hall", "eventcode": event.getEventCode(), "event": "checkupdate", "url": Global.Setting.Urls.hallHotUpdateUrl };
                Global.ReportTool.ReportClientError(ReportTool_1.ReportTool.REPORT_TYPE_HOT_UPDATE_ERROR, reportParam);
                this.sendNotification(LoadingConst_1.default.SHOW_CHECK_LABEL, { parm: "下载失败，请检查网络" });
                var updateCallBackFunc = function () {
                    setTimeout(function () {
                        _this.restartCheckUpdate();
                    }, 1000);
                };
                Global.UI.showSingleBox("下载失败，请检查网络", updateCallBackFunc, updateCallBackFunc);
                // this._showRetryPanel( true );
                break;
            default:
                return;
        }
        this._assetsMgr.setEventCallback(null);
        this._checkListener = null;
        this._updating = false;
        this.hotUpdate();
    };
    HotUpdateProxy.prototype.restartCheckUpdate = function (autoRestart) {
        var _this = this;
        if (autoRestart === void 0) { autoRestart = true; }
        Logger.error("restartCheckUpdate");
        if (this._assetsMgr) {
            this._assetsMgr.setEventCallback(null);
            this._updateListener = null;
            this._updating = false;
            this._assetsMgr = null;
        }
        if (autoRestart) {
            var errorReStartTimes = cc.sys.localStorage.getItem("errorReStartTimes");
            if (errorReStartTimes != null && errorReStartTimes != "") {
                var num = Number(errorReStartTimes);
                if (num) {
                    num++;
                }
                else {
                    num = 1;
                }
                cc.sys.localStorage.setItem("errorReStartTimes", num);
            }
            else {
                cc.sys.localStorage.setItem("errorReStartTimes", 1);
            }
        }
        var storage_hall_urls = Global.Setting.storage.getObject(HallStorageKey_1.default.HotUpdateHosts);
        if (!storage_hall_urls) {
            Global.Setting.storage.setObject(HallStorageKey_1.default.HotUpdateHosts, Global.Setting.Urls.hallHotUpdateUrlArray);
        }
        this.clearProjectManifest();
        //发送上报
        var reportParam = { "host": Global.Setting.Urls.hallHotUpdateUrl };
        Global.ReportTool.ReportClientError(ReportTool_1.ReportTool.REPORT_TYPE_HOTUPDATE_HOST_ERROR, reportParam);
        if (autoRestart) {
            this.restartGame();
        }
        else {
            setTimeout(function () {
                Global.UI.show("WndMessageBox", "修复完成，点击确定将重启游戏.", 0, function () {
                    _this.restartGame();
                }, function () {
                    _this.restartGame();
                });
            }, 300);
        }
    };
    HotUpdateProxy.prototype.restartGame = function () {
        Global.UI.clearAllUIPrefab();
        Global.NativeEvent.unzipHallPackage();
        setTimeout(function () {
            cc.game.restart();
        }, 1000);
    };
    HotUpdateProxy.prototype.clearProjectManifest = function () {
        var projectPath = Global.HotUpdateManager.updateHelper.genStoragePath("hall/") + "project.manifest";
        if (jsb.fileUtils.isFileExist(projectPath)) {
            Logger.error("remove file projectPath is exist = " + projectPath);
            jsb.fileUtils.removeFile(projectPath);
        }
        else {
            Logger.error("projectPath is not exist = " + projectPath);
        }
    };
    HotUpdateProxy.prototype.clearDownloadTmpDir = function () {
        var tmpDowndloadPath = Global.HotUpdateManager.updateHelper.genStoragePath("hall_temp");
        if (jsb.fileUtils.isDirectoryExist(tmpDowndloadPath)) {
            Logger.error("remove tmpDowndloadPath  = " + tmpDowndloadPath);
            jsb.fileUtils.removeDirectory(tmpDowndloadPath);
        }
        else {
            Logger.error("tmpDowndloadPath is not exist = " + tmpDowndloadPath);
        }
    };
    /**
     * hotUpdate
     */
    HotUpdateProxy.prototype.hotUpdate = function () {
        if (this._assetsMgr && !this._updating) {
            // this.barNode.active = true ;
            this.sendNotification(LoadingConst_1.default.SHOW_PROGRESS_BAR, { parm: 0 });
            this._assetsMgr.setEventCallback(this._cbUpdate.bind(this));
            if (this._assetsMgr.getState() === jsb.AssetsManager.State.UNINITED) {
                // if (cc.loader.md5Pipe) {
                //     this.manifestUrl = cc.loader.md5Pipe.transformURL(this.manifestUrl);
                // }
                // this._assetsMgr.loadLocalManifest(this.manifestUrl);
                this.localManifest = new jsb.Manifest(JSON.stringify(this.localManifestJsonObj), this._storagePath);
                this._assetsMgr.loadLocalManifest(this.localManifest);
            }
            // this._failCount = 0;
            this._assetsMgr.update();
            this._updating = true;
        }
    };
    HotUpdateProxy.prototype.formatVersion = function () {
        var tmpVersionPath = Global.HotUpdateManager.updateHelper.genStoragePath("hall_temp/") + Global.HotUpdateManager.versionCfgFileName;
        if (!jsb.fileUtils.isFileExist(tmpVersionPath)) {
            Logger.error("找不到文件", tmpVersionPath);
            return;
        }
        var content = jsb.fileUtils.getStringFromFile(tmpVersionPath);
        var tmpVersion = JSON.parse(content);
        tmpVersion.packageUrl = this.serverHotupdateUrl;
        tmpVersion.remoteManifestUrl = this.serverHotupdateUrl + Global.HotUpdateManager.projectCfgFileName;
        tmpVersion.remoteVersionUrl = this.serverHotupdateUrl + Global.HotUpdateManager.versionCfgFileName;
        tmpVersion.version = this.serverVersion;
        var newTmpContent = JSON.stringify(tmpVersion);
        jsb.fileUtils.writeStringToFile(newTmpContent, tmpVersionPath);
    };
    //清理不用的资源   @todo更新url
    HotUpdateProxy.prototype.formatManifest = function () {
        if (!cc.sys.isNative)
            return;
        var tmpProjectPath = Global.HotUpdateManager.updateHelper.genStoragePath("hall_temp/") + "project.manifest.temp";
        if (!jsb.fileUtils.isFileExist(tmpProjectPath)) {
            Logger.error("找不到文件", tmpProjectPath);
            return;
        }
        var content = jsb.fileUtils.getStringFromFile(tmpProjectPath);
        var tmpManifest = JSON.parse(content);
        var assets = tmpManifest.assets;
        var removeList = [];
        var appid = Global.customApp.getAppID();
        for (var key in assets) {
            if (key.indexOf("app/") == 0) {
                if (key.indexOf("app/" + appid + "/") < 0) {
                    removeList.push(key);
                }
            }
        }
        for (var i = 0; i < removeList.length; i++) {
            delete (assets[removeList[i]]);
        }
        tmpManifest.packageUrl = this.serverHotupdateUrl;
        tmpManifest.remoteManifestUrl = this.serverHotupdateUrl + Global.HotUpdateManager.projectCfgFileName;
        tmpManifest.remoteVersionUrl = this.serverHotupdateUrl + Global.HotUpdateManager.versionCfgFileName;
        tmpManifest.version = this.serverVersion;
        var newTmpContent = JSON.stringify(tmpManifest);
        jsb.fileUtils.writeStringToFile(newTmpContent, tmpProjectPath);
    };
    /**
     * _cbUpdate - 更新的回调
     */
    HotUpdateProxy.prototype._cbUpdate = function (event) {
        var _this = this;
        var needRestart = false;
        var failed = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                var percentNum = event.getPercent();
                if (isNaN(percentNum) || percentNum == null || percentNum == undefined) {
                    percentNum = 0.0001;
                }
                this.sendNotification(LoadingConst_1.default.SHOW_PROGRESS_BAR, { parm: percentNum });
                var per = (percentNum * 100).toFixed(2);
                if (event && event.getMessage() == "ProjectDownloaded") {
                    this.formatManifest();
                }
                //event.getDownloadedFiles() + ' / ' + event.getTotalFiles() 
                // let per = (event.getDownloadedBytes() ) + " / "+ event.getTotalBytes();
                this.sendNotification(LoadingConst_1.default.SHOW_CHECK_LABEL, { parm: '已下载: ' + per + "%" });
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                this.sendNotification(LoadingConst_1.default.SHOW_CHECK_LABEL, { parm: '更新完成：' + event.getMessage() });
                needRestart = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.sendNotification(LoadingConst_1.default.SHOW_CHECK_LABEL, { parm: '已经是最新版' });
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                var reportParam3 = { "game": "hall", "eventcode": event.getEventCode(), "event": "update", "faildres": event.getAssetId(), "url": Global.Setting.Urls.hallHotUpdateUrl };
                Global.ReportTool.ReportClientError(ReportTool_1.ReportTool.REPORT_TYPE_HOT_UPDATE_ERROR, reportParam3);
                this.sendNotification(LoadingConst_1.default.SHOW_CHECK_LABEL, { parm: '更新失败： ' + event.getMessage() });
                this._updating = false;
                this._canRetry = true;
                failed = true;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                this._faildRes = event.getAssetId();
                var reportParam1 = { "game": "hall", "eventcode": event.getEventCode(), "event": "update", "faildres": this._faildRes, "url": Global.Setting.Urls.hallHotUpdateUrl };
                Global.ReportTool.ReportClientError(ReportTool_1.ReportTool.REPORT_TYPE_HOT_UPDATE_ERROR, reportParam1);
                // this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: 'Asset update error: ' + event.getAssetId() + ', ' + event.getMessage() })
                failed = true;
                break;
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                var reportParam2 = { "game": "hall", "eventcode": event.getEventCode(), "event": "update", "faildres": event.getAssetId(), "url": Global.Setting.Urls.hallHotUpdateUrl };
                Global.ReportTool.ReportClientError(ReportTool_1.ReportTool.REPORT_TYPE_HOT_UPDATE_ERROR, reportParam2);
                this.sendNotification(LoadingConst_1.default.SHOW_CHECK_LABEL, { parm: '下载失败，请检查网络' });
                var updateCallBackFunc = function () {
                    setTimeout(function () {
                        _this.restartCheckUpdate();
                    }, 1000);
                };
                Global.UI.showSingleBox("下载失败，请检查网络", updateCallBackFunc, updateCallBackFunc);
                failed = true;
                break;
        }
        if (failed) {
            Logger.error("event.getEventCode()", event.getEventCode(), event.getAssetId(), Global.Setting.Urls.hallHotUpdateUrl, failed);
            this._assetsMgr.setEventCallback(null);
            this._updateListener = null;
            this._updating = false;
            this.retry();
        }
        if (needRestart) {
            this.sendNotification(LoadingConst_1.default.CLEAR_LOADING_TIMER);
            cc.sys.localStorage.setItem("errorReStartTimes", null);
            Global.Setting.storage.removeKey(HallStorageKey_1.default.HotUpdateHosts);
            this._assetsMgr.setEventCallback(null);
            this._updateListener = null;
            Global.HotUpdateManager.hotFailRes = "";
            Global.HotUpdateManager.hotFaildNum = 0;
            // gLocalData.userInfo.hotFailRes = '';
            // gLocalData.userInfo.hotFaildNum = 0;
            // DataHelper.Instance.saveAllData();
            // Prepend the manifest's search path
            var searchPaths = jsb.fileUtils.getSearchPaths();
            Logger.log('searchPaths ---------' + searchPaths);
            var newPaths = this._assetsMgr.getLocalManifest().getSearchPaths();
            Global.SearchPathHelper.addPathList(newPaths);
            Logger.log('newPaths -------------' + JSON.stringify(newPaths));
            // let tempPaths = searchPaths.concat(newPaths);
            // let retPaths = Global.JSUtil.arrayConcat(searchPaths,newPaths)
            var retPaths = Global.SearchPathHelper.getSystemSearchPath();
            Logger.log('searchPaths new -------------' + retPaths);
            // searchPaths new -------------, "xxx"
            // Array.prototype.unshift(searchPaths, newPaths);
            var hotUpdateManager = Global.HotUpdateManager;
            cc.sys.localStorage.setItem(hotUpdateManager.hotUpdateStorageKey + hotUpdateManager.hallHotUpdateDirName, hotUpdateManager.hallHotUpdateDirName);
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(retPaths));
            // jsb.fileUtils.setSearchPaths(retPaths);
            cc.sys.localStorage.setItem("needRestart", 1);
            cc.audioEngine.stopAll();
            Global.UI.clearAllUIPrefab();
            setTimeout(function () {
                cc.game.restart();
            }, 1000);
            Logger.error("restart");
        }
    };
    /**
     * retry
     */
    HotUpdateProxy.prototype.retry = function () {
        var _this = this;
        Logger.log("---------retry---------------");
        //如果一个资源下载失败超过了两次，就清除之前的下载
        if (Global.HotUpdateManager.hotFailRes == this._faildRes && Global.HotUpdateManager.hotFaildNum >= 2) {
            if (this._faildRes) {
                // Global.UI.fastTip(this._faildRes)
            }
            Global.HotUpdateManager.hotFailRes = "";
            Global.HotUpdateManager.hotFaildNum = 0;
            var updateCallBackFunc = function () {
                setTimeout(function () {
                    _this.restartCheckUpdate();
                }, 1000);
            };
            Global.UI.showSingleBox("下载失败，请检查网络", updateCallBackFunc, updateCallBackFunc);
        }
        else {
            Global.HotUpdateManager.hotFaildNum = this._faildRes;
            Global.HotUpdateManager.hotFaildNum++;
        }
    };
    /**
     * _cbVerify
     *
     * 由于下载过程中仍然有小概率可能由于网络原因或其他网络库的问题导致下载的文件内容有问题，所以我们提供了用户文件校验接口，在文件下载完成后热更新管理器会调用这个接口（用户实现的情况下），如果返回 true 表示文件正常，返回 false 表示文件有问题
     *
     */
    HotUpdateProxy.prototype._cbVerify = function (path, asset) {
        // Setup the verification callback, but we don't have md5 check function yet, so only print some message
        // Return true if the verification passed, otherwise return false
        // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
        var compressed = asset.compressed;
        // Retrieve the correct md5 value.
        var expectedMD5 = asset.md5;
        // asset.path is relative path and path is absolute.
        var relativePath = asset.path;
        // The size of asset file, but this value could be absent.
        var size = asset.size;
        if (compressed) {
            // Logger.log(("Verification passed : " + relativePath));
            return true;
        }
        else {
            // let fileSize = jsb.fileUtils.getFileSize(path);
            // Logger.log("file size = ", fileSize, "manifest size = ", asset.size);
            // return fileSize == asset.size;
            // Logger.log(("Verification passed : " + relativePath + ' (' + expectedMD5 + ')'));
            // return true;
            // Logger.log(relativePath, path, jsb.fileUtils.getFileSize(path), JSON.stringify(asset));
            var data = jsb.fileUtils.getDataFromFile(path);
            if (data == null) {
                // Logger.log('data == null MD5 verify fail,path a:' + path + ',path b:' + asset.path  + ',md5 b:' + asset.md5);
                return false;
            }
            var curMD5 = md5(data);
            if (curMD5 == asset.md5) {
                // Logger.log('MD5 verify success!');
                return true;
            }
            else {
                // Logger.log('MD5 verify fail,path a:' + path + ',path b:' + asset.path + ',md5 a:' + curMD5 + ',md5 b:' + asset.md5);
                return false;
            }
        }
    };
    HotUpdateProxy.prototype.next = function () {
        Logger.log("-------------------enter next");
        //热更完再检测一遍openinstall
        //TestFlight 包低于20007 客户端弹更新弹框
        var nativePlatform = Global.Setting.SystemInfo.nativePlatform;
        if (nativePlatform == "testflight" && this.checkIsLower20007Verion()) {
            var app_force_type = 0;
            Global.AppUpdateHelper.showLoadingGameUpdateUI(app_force_type);
        }
        else {
            if (!Global.AppUpdateHelper.startForceUpdateLogic(this.checkVersionData)) {
                Global.AppUpdateHelper.goToLogin();
            }
        }
    };
    //检测是否20007版本引擎
    HotUpdateProxy.prototype.checkIsLower20007Verion = function () {
        if (!cc.sys.isNative) {
            return true;
        }
        var nativeAppVersion = Global.Setting.SystemInfo.appVersion;
        var isLowEngineVer = false;
        var nativeAppVersionNum = Number(nativeAppVersion) || 0;
        if (nativeAppVersionNum < 20007) {
            isLowEngineVer = true;
        }
        return isLowEngineVer;
    };
    HotUpdateProxy.prototype.onRemove = function () {
    };
    HotUpdateProxy.NAME = "HotUpdateProxy";
    return HotUpdateProxy;
}(puremvc.Proxy));
exports.default = HotUpdateProxy;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGxvYWRpbmdNVkNcXEhvdFVwZGF0ZVByb3h5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLCtDQUFtQztBQUduQyxpREFBZ0Q7QUFDaEQsd0VBQW1FO0FBR25FLFNBQVM7QUFDVDtJQUE0QyxrQ0FBYTtJQStCckQsd0JBQVksUUFBUTtRQUFwQixZQUNJLGlCQUFPLFNBSVY7UUFYRCxZQUFZO1FBQ0osd0JBQWtCLEdBQUcsRUFBRSxDQUFBO1FBQ3ZCLG1CQUFhLEdBQUcsRUFBRSxDQUFBO1FBTXRCLHFFQUFxRTtRQUNyRSxLQUFJLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUM7UUFDckMsS0FBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7O0lBQ2hELENBQUM7SUFFRCxtQ0FBVSxHQUFWO1FBQ0ksYUFBYTtRQUNiLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDaEQsQ0FBQztJQUNEOztPQUVHO0lBQ0gsd0NBQWUsR0FBZixVQUFnQixRQUFnQixFQUFFLFFBQWdCO1FBQzlDLG9HQUFvRztRQUNwRyxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUM7UUFDL0IsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUE7UUFDakQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVB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SUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFBO1FBQzdELElBQUksY0FBYyxJQUFJLFlBQVksSUFBSSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsRUFBQztZQUNqRSxJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUE7WUFDdEIsTUFBTSxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxjQUFjLENBQUMsQ0FBQTtTQUNqRTthQUFLO1lBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUM7Z0JBQ3JFLE1BQU0sQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDdEM7U0FDSjtJQUVMLENBQUM7SUFHRCxlQUFlO0lBQ1AsZ0RBQXVCLEdBQS9CO1FBQ0ksSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFDO1lBQ2pCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxJQUFJLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQTtRQUMzRCxJQUFJLGNBQWMsR0FBRyxLQUFLLENBQUE7UUFDMUIsSUFBSSxtQkFBbUIsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEQsSUFBSSxtQkFBbUIsR0FBRyxLQUFLLEVBQUM7WUFDNUIsY0FBYyxHQUFHLElBQUksQ0FBQztTQUN6QjtRQUNELE9BQU8sY0FBYyxDQUFDO0lBQzFCLENBQUM7SUFJRCxpQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQTFrQk0sbUJBQUksR0FBRyxnQkFBZ0IsQ0FBQztJQTRrQm5DLHFCQUFDO0NBem1CRCxBQXltQkMsQ0F6bUIyQyxPQUFPLENBQUMsS0FBSyxHQXltQnhEO2tCQXptQm9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IExvYWRpbmdGYWNhZGUgZnJvbSBcIi4vTG9hZGluZ0ZhY2FkZVwiO1xyXG5pbXBvcnQgQ29uc3QgZnJvbSBcIi4vTG9hZGluZ0NvbnN0XCI7XHJcbmltcG9ydCBBcHBIZWxwZXIgZnJvbSBcIi4uL3Rvb2wvQXBwSGVscGVyXCI7XHJcbmltcG9ydCBQcmVMb2FkUHJveHkgZnJvbSBcIi4vUHJlTG9hZFByb3h5XCI7XHJcbmltcG9ydCB7IFJlcG9ydFRvb2wgfSBmcm9tIFwiLi4vdG9vbC9SZXBvcnRUb29sXCI7XHJcbmltcG9ydCBIYWxsU3RvcmFnZUtleSBmcm9tIFwiLi4vLi4vaGFsbGNvbW1vbi9jb25zdC9IYWxsU3RvcmFnZUtleVwiO1xyXG5cclxuXHJcbi8vIOWkp+WOhemDqOWIhueDreabtFxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb3RVcGRhdGVQcm94eSBleHRlbmRzIHB1cmVtdmMuUHJveHkge1xyXG4gICAgZmFjYWRlOiBMb2FkaW5nRmFjYWRlO1xyXG5cclxuICAgIC8vaG90VXBkYXRlXHJcbiAgICAvLyBtYW5pZmVzdFVybDogYW55O1xyXG4gICAgbG9jYWxNYW5pZmVzdEpzb25PYmo6IGFueTtcclxuICAgIGxvY2FsTWFuaWZlc3Q6IGFueTtcclxuXHJcbiAgICBfY3VycmVudFZlcnNpb246IHN0cmluZztcclxuICAgIF9uZXdlc3RWZXJzaW9uOiBzdHJpbmc7XHJcbiAgICBfc3RvcmFnZVBhdGg6IHN0cmluZztcclxuICAgIF91cGRhdGluZzogYm9vbGVhbjtcclxuICAgIF9uZWVkVXBkYXRlOiBib29sZWFuO1xyXG4gICAgX2Fzc2V0c01ncjoganNiLkFzc2V0c01hbmFnZXI7XHJcblxyXG4gICAgX2NhblJldHJ5OiBib29sZWFuO1xyXG4gICAgX2ZhaWxkUmVzOiBhbnk7XHJcbiAgICBfdXBkYXRlTGlzdGVuZXI6IGFueTtcclxuICAgIF9jaGVja0xpc3RlbmVyOiBhbnk7XHJcbiAgICBtYW5pZmVzdE5hdGl2ZVVybDogYW55O1xyXG5cclxuXHJcbiAgICBjaGVja1ZlcnNpb25EYXRhOmFueTtcclxuXHJcblxyXG4gICAgLy/mnI3liqHlmajov5Tlm57nmoTng63mm7TlnLDlnYBcclxuICAgIHByaXZhdGUgc2VydmVySG90dXBkYXRlVXJsID0gXCJcIlxyXG4gICAgcHJpdmF0ZSBzZXJ2ZXJWZXJzaW9uID0gXCJcIlxyXG5cclxuICAgIHN0YXRpYyBOQU1FID0gXCJIb3RVcGRhdGVQcm94eVwiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1hbmlmZXN0KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvLyBMb2dnZXIubG9nKFwiLS0tLS0tLS0tLUhvdFVwZGF0ZVByb3h5LS0tLS0tLVwiICsgbWFuaWZlc3QubmF0aXZlVXJsKVxyXG4gICAgICAgIHRoaXMucHJveHlOYW1lID0gSG90VXBkYXRlUHJveHkuTkFNRTtcclxuICAgICAgICB0aGlzLm1hbmlmZXN0TmF0aXZlVXJsID0gbWFuaWZlc3QubmF0aXZlVXJsO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUmVnaXN0ZXIoKSB7XHJcbiAgICAgICAgLy/liJ3lp4vljJZzeXN0ZW3kv6Hmga9cclxuICAgICAgICBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLlZlcnNpb24gPSBcIjEuMC41XCI7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIF92ZXJzaW9uQ29tcGFyZVxyXG4gICAgICovXHJcbiAgICBfdmVyc2lvbkNvbXBhcmUodmVyc2lvbkE6IHN0cmluZywgdmVyc2lvbkI6IHN0cmluZykge1xyXG4gICAgICAgIC8vIExvZ2dlci5sb2coXCJKUyBDdXN0b20gVmVyc2lvbiBDb21wYXJlOiB2ZXJzaW9uIEEgaXMgXCIgKyB2ZXJzaW9uQSArICcsIHZlcnNpb24gQiBpcyAnICsgdmVyc2lvbkIpO1xyXG4gICAgICAgIHZhciB2QSA9IHZlcnNpb25BLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgdmFyIHZCID0gdmVyc2lvbkIuc3BsaXQoJy4nKTtcclxuICAgICAgICB0aGlzLl9jdXJyZW50VmVyc2lvbiA9IHZlcnNpb25BO1xyXG4gICAgICAgIHRoaXMuX25ld2VzdFZlcnNpb24gPSB2ZXJzaW9uQjtcclxuICAgICAgICBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5oYWxsTmV3VmVyc2lvbiA9IHZlcnNpb25CXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2QS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICB2YXIgYSA9IHBhcnNlSW50KHZBW2ldKTtcclxuICAgICAgICAgICAgdmFyIGIgPSBwYXJzZUludCh2QltpXSB8fCBcIjBcIik7XHJcbiAgICAgICAgICAgIGlmIChhID09PSBiKSB7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgIGVsc2UgeyByZXR1cm4gYSAtIGI7IH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZCLmxlbmd0aCA+IHZBLmxlbmd0aCkgeyByZXR1cm4gLTE7IH1cclxuICAgICAgICBlbHNlIHsgcmV0dXJuIDA7IH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVjayhob3RVcGRhdGVVcmw6IHN0cmluZywgdmVyc2lvbjogc3RyaW5nLGlzQmFjayA9IDAsY2hlY2tWZXJzaW9uRGF0YTphbnkgPSBudWxsKSB7XHJcbiAgICAgICAgLy8gdGhpcy5jaGVja1ZlcnNpb25EYXRhID0gY2hlY2tWZXJzaW9uRGF0YVxyXG4gICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghR2xvYmFsLlNldHRpbmcuaXNTdGFydEhvdFVwZGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5leHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoZWNrVmVyc2lvbkRhdGEgPSBjaGVja1ZlcnNpb25EYXRhXHJcbiAgICAgICAgLy/mt7vliqDmnKzlnLDniYjmnKzkuI7mnI3liqHlmajniYjmnKzlj7fkuIDoh7TkuI3otbDng63mm7TpgLvovpHjgIJcclxuICAgICAgICBsZXQgaGFsbE5hdGl2ZVZlciA9IEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLmdldE5hdGl2ZUhvdFVwZGF0ZVZlcnNpb24oXCJoYWxsXCIpO1xyXG4gICAgICAgIGlmIChHbG9iYWwuVG9vbGtpdC52ZXJzaW9uQ29tcGFyZSh2ZXJzaW9uLCBoYWxsTmF0aXZlVmVyKSA9PSAwKXtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIuacrOWcsOeJiOacrOS4juacjeWKoeWZqOeJiOacrOWPt+S4gOiHtFwiKVxyXG4gICAgICAgICAgICB0aGlzLm5leHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbmV3SG90VXBkYXRlVXJsID0gaG90VXBkYXRlVXJsO1xyXG4gICAgICAgIGxldCBuZXdWZXJzaW9uID0gdmVyc2lvbjtcclxuICAgICAgICBsZXQgaG90VXBkYXRlTWFuYWdlciA9IEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyO1xyXG4gICAgICAgIGlmIChuZXdIb3RVcGRhdGVVcmwpIHtcclxuICAgICAgICAgICAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuaG90VXBkYXRlVXJsID0gbmV3SG90VXBkYXRlVXJsXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV3SG90VXBkYXRlVXJsID0gR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuaG90VXBkYXRlVXJsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZXdWZXJzaW9uKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLmhhbGxOZXdWZXJzaW9uID0gbmV3VmVyc2lvblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld1ZlcnNpb24gPSBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5oYWxsTmV3VmVyc2lvblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/mnI3liqHlmajng63mm7TlnLDlnYBcclxuICAgICAgICB0aGlzLnNlcnZlckhvdHVwZGF0ZVVybCA9IGhvdFVwZGF0ZVVybCArIFwiL2hhbGwvXCIgKyB2ZXJzaW9uICsgXCIvXCI7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXJWZXJzaW9uID0gdmVyc2lvbjtcclxuXHJcbiAgICAgICAgLy/kv67mlLnng63mm7TmlrDlnLDlnYBcclxuICAgICAgICB0aGlzLmxvY2FsTWFuaWZlc3RKc29uT2JqID0gR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuY2hhbmdlTWFuaWZlc3RVcmwoXCJoYWxsXCIsIG5ld1ZlcnNpb24sIG5ld0hvdFVwZGF0ZVVybCwgdGhpcy5tYW5pZmVzdE5hdGl2ZVVybCxpc0JhY2spXHJcbiAgICAgICAgdGhpcy5fc3RvcmFnZVBhdGggPSAoKGpzYi5maWxlVXRpbHMgPyBqc2IuZmlsZVV0aWxzLmdldFdyaXRhYmxlUGF0aCgpIDogJy8nKSArIGhvdFVwZGF0ZU1hbmFnZXIuaG90VXBkYXRlRGlyTmFtZSArIFwiL1wiICsgaG90VXBkYXRlTWFuYWdlci5oYWxsSG90VXBkYXRlRGlyTmFtZSk7XHJcbiAgICAgICAgLy8gTG9nZ2VyLmxvZyhcInN0b3JhZ2VQYXRoPT09PT09PVwiICsgdGhpcy5fc3RvcmFnZVBhdGgpXHJcbiAgICAgICAgLy8gTG9nZ2VyLmxvZyhcIm1hbmlmZXN0VXJsID09PT09PVwiICsgdGhpcy5tYW5pZmVzdE5hdGl2ZVVybClcclxuICAgICAgICAvL+S/ruaUueacrOWcsOeJiOacrOaWh+S7tlxyXG4gICAgICAgIGxldCBzdG9yYWdlTWFuaWZlc3RVcmwgPSB0aGlzLl9zdG9yYWdlUGF0aCArICcvJyArIGhvdFVwZGF0ZU1hbmFnZXIudXBkYXRlSGVscGVyLnByakZpbGVOYW1lKCk7XHJcbiAgICAgICAgLy9sZXQganNvblN0ciA9IEpTT04uc3RyaW5naWZ5KHRoaXMubG9jYWxNYW5pZmVzdEpzb25PYmopXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgbGV0IHRtcE1hbmlmZXN0ID0gdGhpcy5sb2NhbE1hbmlmZXN0SnNvbk9iajtcclxuICAgICAgICBsZXQgYXNzZXRzID0gdG1wTWFuaWZlc3QuYXNzZXRzO1xyXG4gICAgICAgIGxldCByZW1vdmVMaXN0ID0gW11cclxuICAgICAgICBsZXQgYXBwaWQgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmFwcElEIFxyXG4gICAgICAgIGZvcihsZXQga2V5IGluIGFzc2V0cylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGtleS5pbmRleE9mKFwiYXBwL1wiKSA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihrZXkuaW5kZXhPZihcImFwcC9cIiArIGFwcGlkICsgXCIvXCIpIDwgMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVMaXN0LnB1c2goa2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcmVtb3ZlTGlzdC5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRlbGV0ZShhc3NldHNbcmVtb3ZlTGlzdFtpXV0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRtcE1hbmlmZXN0LmFzc2V0cyA9ICBhc3NldHNcclxuICAgICAgICBqc2IuZmlsZVV0aWxzLndyaXRlU3RyaW5nVG9GaWxlKEpTT04uc3RyaW5naWZ5KHRtcE1hbmlmZXN0KSwgc3RvcmFnZU1hbmlmZXN0VXJsKVxyXG4gICAgICAgIHRoaXMubG9jYWxNYW5pZmVzdEpzb25PYmogPSB0bXBNYW5pZmVzdFxyXG4gICAgICAgIHRoaXMuX2Fzc2V0c01nciA9IG5ldyBqc2IuQXNzZXRzTWFuYWdlcihcIlwiLCB0aGlzLl9zdG9yYWdlUGF0aCwgdGhpcy5fdmVyc2lvbkNvbXBhcmUuYmluZCh0aGlzKSlcclxuXHJcbiAgICAgICAgdGhpcy5fYXNzZXRzTWdyLnNldFZlcmlmeUNhbGxiYWNrKHRoaXMuX2NiVmVyaWZ5KVxyXG4gICAgICAgIGlmIChjYy5zeXMub3MgPT09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Fzc2V0c01nci5zZXRNYXhDb25jdXJyZW50VGFzayg1KVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oQ29uc3QuU0hPV19DSEVDS19MQUJFTCwgeyBwYXJtOiBcIuajgOafpeabtOaWsOS4rS4uLlwiIH0pXHJcbiAgICAgICAgdGhpcy5jaGVja1VwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrVXBkYXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl91cGRhdGluZykge1xyXG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oQ29uc3QuU0hPV19DSEVDS19MQUJFTCwgeyBwYXJtOiBcIuajgOafpeabtOaWsOS4rS4uLlwiIH0pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2Fzc2V0c01nci5nZXRTdGF0ZSgpID09PSBqc2IuQXNzZXRzTWFuYWdlci5TdGF0ZS5VTklOSVRFRCkge1xyXG4gICAgICAgICAgICAvLyBpZiAoY2MubG9hZGVyLm1kNVBpcGUpIHtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMubWFuaWZlc3RVcmwgPSBjYy5sb2FkZXIubWQ1UGlwZS50cmFuc2Zvcm1VUkwodGhpcy5tYW5pZmVzdFVybCk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgbGV0IGpzb25TdHIgPSBKU09OLnN0cmluZ2lmeSh0aGlzLmxvY2FsTWFuaWZlc3RKc29uT2JqKVxyXG4gICAgICAgICAgICAvLyBMb2dnZXIubG9nKFwiLS0tLS0tLS0tLWNoZWNrVXBkYXRlICBqc29uU3RyID09PT09PT09XCIgKyBqc29uU3RyKVxyXG4gICAgICAgICAgICB0aGlzLmxvY2FsTWFuaWZlc3QgPSBuZXcganNiLk1hbmlmZXN0KGpzb25TdHIsIHRoaXMuX3N0b3JhZ2VQYXRoKVxyXG4gICAgICAgICAgICB0aGlzLl9hc3NldHNNZ3IubG9hZExvY2FsTWFuaWZlc3QodGhpcy5sb2NhbE1hbmlmZXN0LCB0aGlzLl9zdG9yYWdlUGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOabtOaNoiBtYW5pZmVzdCDot6/lvoTku6XlkI7ov5nph4zkvJrmiqXplJlcclxuICAgICAgICBpZiAoIXRoaXMuX2Fzc2V0c01nci5nZXRMb2NhbE1hbmlmZXN0KCkgfHwgIXRoaXMuX2Fzc2V0c01nci5nZXRMb2NhbE1hbmlmZXN0KCkuaXNMb2FkZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oQ29uc3QuU0hPV19DSEVDS19MQUJFTCwgeyBwYXJtOiBcIuWvvOWFpeaWh+S7tuWksei0pe+8jOW7uuiurumHjeWQr+a4uOaIj+aIlumHjeaWsOS4i+i9veacgOaWsOeJiOacrFwiIH0pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2Fzc2V0c01nci5zZXRFdmVudENhbGxiYWNrKHRoaXMuX2NiQ2hlY2tVcGRhdGUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5fYXNzZXRzTWdyLmNoZWNrVXBkYXRlKCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogX2NiQ2hlY2tVcGRhdGVcclxuICAgICAqIFxyXG4gICAgICogaW9zMTDkuK3vvIzlnKjlvLnlh7rmmK/lkKblhYHorrjogZTnvZHkuYvliY3vvIzkvJrmiqXvvJpcclxuICAgICAqIEFzc2V0c01hbmFnZXJFeCA6IEZhaWwgdG8gZG93bmxvYWQgdmVyc2lvbiBmaWxlLCBzdGVwIHNraXBwZWQgQ29kZTogMVxyXG4gICAgICovXHJcbiAgICBfY2JDaGVja1VwZGF0ZShldmVudCkge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQuZ2V0RXZlbnRDb2RlKCkpIHtcclxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLkFMUkVBRFlfVVBfVE9fREFURTpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihDb25zdC5TSE9XX1BST0dSRVNTX0JBUiwgeyBwYXJtOiAtMSB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKENvbnN0LlNIT1dfQ0hFQ0tfTEFCRUwsIHsgcGFybTogXCLlt7Lnu4/mmK/mnIDmlrDniYhcIiB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vdmVyc2lvbiBVcGRhdGVfcHJvZ3Jlc3Npb27lnKhuZXcgdmVyc2lvbiBmb3VuZOS5i+WJjVxyXG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuVVBEQVRFX1BST0dSRVNTSU9OOlxyXG4gICAgICAgICAgICAgICAgaWYoZXZlbnQgJiYgZXZlbnQuZ2V0TWVzc2FnZSgpID09IFwiVmVyc2lvbkRvd25sb2FkZWRcIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJWZXJzaW9uRG93bmxvYWRlZCBmb3JtYXRWZXJzaW9uXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtYXRWZXJzaW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihldmVudCAmJiBldmVudC5nZXRNZXNzYWdlKCkgPT0gXCJQcm9qZWN0RG93bmxvYWRlZFwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIlByb2plY3REb3dubG9hZGVkIGZvcm1hdE1hbmlmZXN0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtYXRNYW5pZmVzdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuTkVXX1ZFUlNJT05fRk9VTkQ6XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdWkgLSBiYXJcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuX3Nob3dSZXRyeSggZmFsc2UgKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuYmFyUHJvZ3Jlc3MucHJvZ3Jlc3MgPSAwIDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihDb25zdC5TSE9XX1BST0dSRVNTX0JBUiwgeyBwYXJtOiAwIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uZWVkVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuRVJST1JfTk9fTE9DQUxfTUFOSUZFU1Q6XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5FUlJPUl9ET1dOTE9BRF9NQU5JRkVTVDpcclxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLkVSUk9SX1BBUlNFX01BTklGRVNUOlxyXG4gICAgICAgICAgICAgICAgbGV0IHJlcG9ydFBhcmFtID0ge1wiZ2FtZVwiOlwiaGFsbFwiLFwiZXZlbnRjb2RlXCI6ZXZlbnQuZ2V0RXZlbnRDb2RlKCksXCJldmVudFwiOlwiY2hlY2t1cGRhdGVcIixcInVybFwiOkdsb2JhbC5TZXR0aW5nLlVybHMuaGFsbEhvdFVwZGF0ZVVybH1cclxuICAgICAgICAgICAgICAgIEdsb2JhbC5SZXBvcnRUb29sLlJlcG9ydENsaWVudEVycm9yKFJlcG9ydFRvb2wuUkVQT1JUX1RZUEVfSE9UX1VQREFURV9FUlJPUixyZXBvcnRQYXJhbSlcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oQ29uc3QuU0hPV19DSEVDS19MQUJFTCwgeyBwYXJtOiBcIuS4i+i9veWksei0pe+8jOivt+ajgOafpee9kee7nFwiIH0pXHJcbiAgICAgICAgICAgICAgICBsZXQgdXBkYXRlQ2FsbEJhY2tGdW5jID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3RhcnRDaGVja1VwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLkuIvovb3lpLHotKXvvIzor7fmo4Dmn6XnvZHnu5xcIiwgdXBkYXRlQ2FsbEJhY2tGdW5jLCB1cGRhdGVDYWxsQmFja0Z1bmMpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fc2hvd1JldHJ5UGFuZWwoIHRydWUgKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9hc3NldHNNZ3Iuc2V0RXZlbnRDYWxsYmFjayhudWxsKTtcclxuICAgICAgICB0aGlzLl9jaGVja0xpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLl91cGRhdGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaG90VXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdGFydENoZWNrVXBkYXRlKGF1dG9SZXN0YXJ0ID0gdHJ1ZSkge1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihcInJlc3RhcnRDaGVja1VwZGF0ZVwiKVxyXG4gICAgICAgIGlmICh0aGlzLl9hc3NldHNNZ3IpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXNzZXRzTWdyLnNldEV2ZW50Q2FsbGJhY2sobnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fYXNzZXRzTWdyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYXV0b1Jlc3RhcnQpe1xyXG4gICAgICAgICAgICBsZXQgZXJyb3JSZVN0YXJ0VGltZXMgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJlcnJvclJlU3RhcnRUaW1lc1wiKVxyXG4gICAgICAgICAgICBpZiAoZXJyb3JSZVN0YXJ0VGltZXMgIT0gbnVsbCAmJiBlcnJvclJlU3RhcnRUaW1lcyAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgIGxldCBudW0gPSBOdW1iZXIoZXJyb3JSZVN0YXJ0VGltZXMpXHJcbiAgICAgICAgICAgICAgICBpZiAobnVtKXtcclxuICAgICAgICAgICAgICAgICAgICBudW0gKys7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImVycm9yUmVTdGFydFRpbWVzXCIsbnVtKVxyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJlcnJvclJlU3RhcnRUaW1lc1wiLDEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHN0b3JhZ2VfaGFsbF91cmxzID0gR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5nZXRPYmplY3QoSGFsbFN0b3JhZ2VLZXkuSG90VXBkYXRlSG9zdHMpXHJcbiAgICAgICAgaWYgKCFzdG9yYWdlX2hhbGxfdXJscyl7XHJcbiAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2Uuc2V0T2JqZWN0KEhhbGxTdG9yYWdlS2V5LkhvdFVwZGF0ZUhvc3RzLEdsb2JhbC5TZXR0aW5nLlVybHMuaGFsbEhvdFVwZGF0ZVVybEFycmF5KVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNsZWFyUHJvamVjdE1hbmlmZXN0KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lj5HpgIHkuIrmiqVcclxuICAgICAgICBsZXQgcmVwb3J0UGFyYW0gPSB7XCJob3N0XCI6R2xvYmFsLlNldHRpbmcuVXJscy5oYWxsSG90VXBkYXRlVXJsfVxyXG4gICAgICAgIEdsb2JhbC5SZXBvcnRUb29sLlJlcG9ydENsaWVudEVycm9yKFJlcG9ydFRvb2wuUkVQT1JUX1RZUEVfSE9UVVBEQVRFX0hPU1RfRVJST1IscmVwb3J0UGFyYW0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGF1dG9SZXN0YXJ0KXtcclxuICAgICAgICAgICAgdGhpcy5yZXN0YXJ0R2FtZSgpXHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kTWVzc2FnZUJveFwiLCBcIuS/ruWkjeWujOaIkO+8jOeCueWHu+ehruWumuWwhumHjeWQr+a4uOaIjy5cIiwgMCwgKCk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3RhcnRHYW1lKClcclxuICAgICAgICAgICAgICAgIH0sICgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN0YXJ0R2FtZSgpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHJlc3RhcnRHYW1lKCl7XHJcbiAgICAgICAgR2xvYmFsLlVJLmNsZWFyQWxsVUlQcmVmYWIoKTtcclxuICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQudW56aXBIYWxsUGFja2FnZSgpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjYy5nYW1lLnJlc3RhcnQoKTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhclByb2plY3RNYW5pZmVzdCgpe1xyXG4gICAgICAgIGxldCBwcm9qZWN0UGF0aCA9IEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnVwZGF0ZUhlbHBlci5nZW5TdG9yYWdlUGF0aChcImhhbGwvXCIpICsgXCJwcm9qZWN0Lm1hbmlmZXN0XCI7XHJcbiAgICAgICAgICAgIGlmKGpzYi5maWxlVXRpbHMuaXNGaWxlRXhpc3QocHJvamVjdFBhdGgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJyZW1vdmUgZmlsZSBwcm9qZWN0UGF0aCBpcyBleGlzdCA9IFwiICsgcHJvamVjdFBhdGgpXHJcbiAgICAgICAgICAgICAgICBqc2IuZmlsZVV0aWxzLnJlbW92ZUZpbGUocHJvamVjdFBhdGgpO1xyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJwcm9qZWN0UGF0aCBpcyBub3QgZXhpc3QgPSBcIiArIHByb2plY3RQYXRoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJEb3dubG9hZFRtcERpcigpe1xyXG4gICAgICAgIGxldCB0bXBEb3duZGxvYWRQYXRoID0gR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIudXBkYXRlSGVscGVyLmdlblN0b3JhZ2VQYXRoKFwiaGFsbF90ZW1wXCIpXHJcbiAgICAgICAgaWYgKGpzYi5maWxlVXRpbHMuaXNEaXJlY3RvcnlFeGlzdCh0bXBEb3duZGxvYWRQYXRoKSl7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInJlbW92ZSB0bXBEb3duZGxvYWRQYXRoICA9IFwiICsgdG1wRG93bmRsb2FkUGF0aClcclxuICAgICAgICAgICAganNiLmZpbGVVdGlscy5yZW1vdmVEaXJlY3RvcnkodG1wRG93bmRsb2FkUGF0aClcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInRtcERvd25kbG9hZFBhdGggaXMgbm90IGV4aXN0ID0gXCIgKyB0bXBEb3duZGxvYWRQYXRoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBob3RVcGRhdGVcclxuICAgICAqL1xyXG4gICAgaG90VXBkYXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9hc3NldHNNZ3IgJiYgIXRoaXMuX3VwZGF0aW5nKSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuYmFyTm9kZS5hY3RpdmUgPSB0cnVlIDtcclxuICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKENvbnN0LlNIT1dfUFJPR1JFU1NfQkFSLCB7IHBhcm06IDAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2Fzc2V0c01nci5zZXRFdmVudENhbGxiYWNrKHRoaXMuX2NiVXBkYXRlLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2Fzc2V0c01nci5nZXRTdGF0ZSgpID09PSBqc2IuQXNzZXRzTWFuYWdlci5TdGF0ZS5VTklOSVRFRCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGlmIChjYy5sb2FkZXIubWQ1UGlwZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMubWFuaWZlc3RVcmwgPSBjYy5sb2FkZXIubWQ1UGlwZS50cmFuc2Zvcm1VUkwodGhpcy5tYW5pZmVzdFVybCk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9hc3NldHNNZ3IubG9hZExvY2FsTWFuaWZlc3QodGhpcy5tYW5pZmVzdFVybCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsTWFuaWZlc3QgPSBuZXcganNiLk1hbmlmZXN0KEpTT04uc3RyaW5naWZ5KHRoaXMubG9jYWxNYW5pZmVzdEpzb25PYmopLCB0aGlzLl9zdG9yYWdlUGF0aClcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Fzc2V0c01nci5sb2FkTG9jYWxNYW5pZmVzdCh0aGlzLmxvY2FsTWFuaWZlc3QpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyB0aGlzLl9mYWlsQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9hc3NldHNNZ3IudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGZvcm1hdFZlcnNpb24oKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB0bXBWZXJzaW9uUGF0aCA9IEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnVwZGF0ZUhlbHBlci5nZW5TdG9yYWdlUGF0aChcImhhbGxfdGVtcC9cIikgKyBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci52ZXJzaW9uQ2ZnRmlsZU5hbWU7XHJcbiAgICAgICAgaWYoIWpzYi5maWxlVXRpbHMuaXNGaWxlRXhpc3QodG1wVmVyc2lvblBhdGgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5om+5LiN5Yiw5paH5Lu2XCIsIHRtcFZlcnNpb25QYXRoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY29udGVudCA9IGpzYi5maWxlVXRpbHMuZ2V0U3RyaW5nRnJvbUZpbGUodG1wVmVyc2lvblBhdGgpO1xyXG4gICAgICAgIGxldCB0bXBWZXJzaW9uID0gSlNPTi5wYXJzZShjb250ZW50KTtcclxuICAgICAgICB0bXBWZXJzaW9uLnBhY2thZ2VVcmwgPSB0aGlzLnNlcnZlckhvdHVwZGF0ZVVybDtcclxuICAgICAgICB0bXBWZXJzaW9uLnJlbW90ZU1hbmlmZXN0VXJsID0gdGhpcy5zZXJ2ZXJIb3R1cGRhdGVVcmwgKyBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5wcm9qZWN0Q2ZnRmlsZU5hbWVcclxuICAgICAgICB0bXBWZXJzaW9uLnJlbW90ZVZlcnNpb25VcmwgPSB0aGlzLnNlcnZlckhvdHVwZGF0ZVVybCArIEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnZlcnNpb25DZmdGaWxlTmFtZTtcclxuICAgICAgICB0bXBWZXJzaW9uLnZlcnNpb24gPSB0aGlzLnNlcnZlclZlcnNpb247XHJcblxyXG4gICAgICAgIGxldCBuZXdUbXBDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkodG1wVmVyc2lvbik7XHJcbiAgICAgICAganNiLmZpbGVVdGlscy53cml0ZVN0cmluZ1RvRmlsZShuZXdUbXBDb250ZW50LCB0bXBWZXJzaW9uUGF0aCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvL+a4heeQhuS4jeeUqOeahOi1hOa6kCAgIEB0b2Rv5pu05pawdXJsXHJcbiAgICBwcml2YXRlIGZvcm1hdE1hbmlmZXN0KClcclxuICAgIHtcclxuICAgICAgICBpZighY2Muc3lzLmlzTmF0aXZlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IHRtcFByb2plY3RQYXRoID0gR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIudXBkYXRlSGVscGVyLmdlblN0b3JhZ2VQYXRoKFwiaGFsbF90ZW1wL1wiKSArIFwicHJvamVjdC5tYW5pZmVzdC50ZW1wXCI7XHJcbiAgICAgICAgaWYoIWpzYi5maWxlVXRpbHMuaXNGaWxlRXhpc3QodG1wUHJvamVjdFBhdGgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5om+5LiN5Yiw5paH5Lu2XCIsIHRtcFByb2plY3RQYXRoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY29udGVudCA9IGpzYi5maWxlVXRpbHMuZ2V0U3RyaW5nRnJvbUZpbGUodG1wUHJvamVjdFBhdGgpO1xyXG4gICAgICAgIGxldCB0bXBNYW5pZmVzdCA9IEpTT04ucGFyc2UoY29udGVudCk7XHJcbiAgICAgICAgbGV0IGFzc2V0cyA9IHRtcE1hbmlmZXN0LmFzc2V0cztcclxuICAgICAgICBsZXQgcmVtb3ZlTGlzdCA9IFtdXHJcbiAgICAgICAgbGV0IGFwcGlkID0gR2xvYmFsLmN1c3RvbUFwcC5nZXRBcHBJRCgpIFxyXG4gICAgICAgIGZvcihsZXQga2V5IGluIGFzc2V0cylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGtleS5pbmRleE9mKFwiYXBwL1wiKSA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGtleS5pbmRleE9mKFwiYXBwL1wiICsgYXBwaWQgKyBcIi9cIikgPCAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUxpc3QucHVzaChrZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByZW1vdmVMaXN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGVsZXRlKGFzc2V0c1tyZW1vdmVMaXN0W2ldXSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRtcE1hbmlmZXN0LnBhY2thZ2VVcmwgPSB0aGlzLnNlcnZlckhvdHVwZGF0ZVVybDtcclxuICAgICAgICB0bXBNYW5pZmVzdC5yZW1vdGVNYW5pZmVzdFVybCA9IHRoaXMuc2VydmVySG90dXBkYXRlVXJsICsgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIucHJvamVjdENmZ0ZpbGVOYW1lXHJcbiAgICAgICAgdG1wTWFuaWZlc3QucmVtb3RlVmVyc2lvblVybCA9IHRoaXMuc2VydmVySG90dXBkYXRlVXJsICsgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIudmVyc2lvbkNmZ0ZpbGVOYW1lO1xyXG4gICAgICAgIHRtcE1hbmlmZXN0LnZlcnNpb24gPSB0aGlzLnNlcnZlclZlcnNpb247XHJcblxyXG4gICAgICAgIGxldCBuZXdUbXBDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkodG1wTWFuaWZlc3QpO1xyXG4gICAgICAgIGpzYi5maWxlVXRpbHMud3JpdGVTdHJpbmdUb0ZpbGUobmV3VG1wQ29udGVudCwgdG1wUHJvamVjdFBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogX2NiVXBkYXRlIC0g5pu05paw55qE5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIF9jYlVwZGF0ZShldmVudCkge1xyXG4gICAgICAgIHZhciBuZWVkUmVzdGFydCA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBmYWlsZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChldmVudC5nZXRFdmVudENvZGUoKSkge1xyXG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuVVBEQVRFX1BST0dSRVNTSU9OOlxyXG4gICAgICAgICAgICAgICAgbGV0IHBlcmNlbnROdW0gPSBldmVudC5nZXRQZXJjZW50KClcclxuICAgICAgICAgICAgICAgIGlmIChpc05hTihwZXJjZW50TnVtKSB8fCBwZXJjZW50TnVtID09IG51bGwgfHwgcGVyY2VudE51bSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBwZXJjZW50TnVtID0gMC4wMDAxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oQ29uc3QuU0hPV19QUk9HUkVTU19CQVIsIHsgcGFybTpwZXJjZW50TnVtIH0pXHJcbiAgICAgICAgICAgICAgICBsZXQgcGVyID0gKHBlcmNlbnROdW0gKiAxMDApLnRvRml4ZWQoMik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZXZlbnQgJiYgZXZlbnQuZ2V0TWVzc2FnZSgpID09IFwiUHJvamVjdERvd25sb2FkZWRcIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1hdE1hbmlmZXN0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2V2ZW50LmdldERvd25sb2FkZWRGaWxlcygpICsgJyAvICcgKyBldmVudC5nZXRUb3RhbEZpbGVzKCkgXHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgcGVyID0gKGV2ZW50LmdldERvd25sb2FkZWRCeXRlcygpICkgKyBcIiAvIFwiKyBldmVudC5nZXRUb3RhbEJ5dGVzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oQ29uc3QuU0hPV19DSEVDS19MQUJFTCwgeyBwYXJtOiAn5bey5LiL6L29OiAnICsgcGVyICsgXCIlXCIgfSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5VUERBVEVfRklOSVNIRUQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oQ29uc3QuU0hPV19DSEVDS19MQUJFTCwgeyBwYXJtOiAn5pu05paw5a6M5oiQ77yaJyArIGV2ZW50LmdldE1lc3NhZ2UoKSB9KVxyXG4gICAgICAgICAgICAgICAgbmVlZFJlc3RhcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5BTFJFQURZX1VQX1RPX0RBVEU6XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKENvbnN0LlNIT1dfQ0hFQ0tfTEFCRUwsIHsgcGFybTogJ+W3sue7j+aYr+acgOaWsOeJiCcgfSlcclxuICAgICAgICAgICAgICAgIGZhaWxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLlVQREFURV9GQUlMRUQ6XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVwb3J0UGFyYW0zID0ge1wiZ2FtZVwiOlwiaGFsbFwiLFwiZXZlbnRjb2RlXCI6ZXZlbnQuZ2V0RXZlbnRDb2RlKCksXCJldmVudFwiOlwidXBkYXRlXCIsXCJmYWlsZHJlc1wiOmV2ZW50LmdldEFzc2V0SWQoKSxcInVybFwiOkdsb2JhbC5TZXR0aW5nLlVybHMuaGFsbEhvdFVwZGF0ZVVybH1cclxuICAgICAgICAgICAgICAgIEdsb2JhbC5SZXBvcnRUb29sLlJlcG9ydENsaWVudEVycm9yKFJlcG9ydFRvb2wuUkVQT1JUX1RZUEVfSE9UX1VQREFURV9FUlJPUixyZXBvcnRQYXJhbTMpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oQ29uc3QuU0hPV19DSEVDS19MQUJFTCwgeyBwYXJtOiAn5pu05paw5aSx6LSl77yaICcgKyBldmVudC5nZXRNZXNzYWdlKCkgfSlcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5SZXRyeSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmYWlsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5FUlJPUl9VUERBVElORzpcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZhaWxkUmVzID0gZXZlbnQuZ2V0QXNzZXRJZCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlcG9ydFBhcmFtMSA9IHtcImdhbWVcIjpcImhhbGxcIixcImV2ZW50Y29kZVwiOmV2ZW50LmdldEV2ZW50Q29kZSgpLFwiZXZlbnRcIjpcInVwZGF0ZVwiLFwiZmFpbGRyZXNcIjp0aGlzLl9mYWlsZFJlcyxcInVybFwiOkdsb2JhbC5TZXR0aW5nLlVybHMuaGFsbEhvdFVwZGF0ZVVybH1cclxuICAgICAgICAgICAgICAgIEdsb2JhbC5SZXBvcnRUb29sLlJlcG9ydENsaWVudEVycm9yKFJlcG9ydFRvb2wuUkVQT1JUX1RZUEVfSE9UX1VQREFURV9FUlJPUixyZXBvcnRQYXJhbTEpXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5zZW5kTm90aWZpY2F0aW9uKENvbnN0LlNIT1dfQ0hFQ0tfTEFCRUwsIHsgcGFybTogJ0Fzc2V0IHVwZGF0ZSBlcnJvcjogJyArIGV2ZW50LmdldEFzc2V0SWQoKSArICcsICcgKyBldmVudC5nZXRNZXNzYWdlKCkgfSlcclxuICAgICAgICAgICAgICAgIGZhaWxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLkVSUk9SX05PX0xPQ0FMX01BTklGRVNUOlxyXG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuRVJST1JfRE9XTkxPQURfTUFOSUZFU1Q6XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5FUlJPUl9QQVJTRV9NQU5JRkVTVDpcclxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLkVSUk9SX0RFQ09NUFJFU1M6XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVwb3J0UGFyYW0yID0ge1wiZ2FtZVwiOlwiaGFsbFwiLFwiZXZlbnRjb2RlXCI6ZXZlbnQuZ2V0RXZlbnRDb2RlKCksXCJldmVudFwiOlwidXBkYXRlXCIsXCJmYWlsZHJlc1wiOmV2ZW50LmdldEFzc2V0SWQoKSxcInVybFwiOkdsb2JhbC5TZXR0aW5nLlVybHMuaGFsbEhvdFVwZGF0ZVVybH1cclxuICAgICAgICAgICAgICAgIEdsb2JhbC5SZXBvcnRUb29sLlJlcG9ydENsaWVudEVycm9yKFJlcG9ydFRvb2wuUkVQT1JUX1RZUEVfSE9UX1VQREFURV9FUlJPUixyZXBvcnRQYXJhbTIpXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKENvbnN0LlNIT1dfQ0hFQ0tfTEFCRUwsIHsgcGFybTogJ+S4i+i9veWksei0pe+8jOivt+ajgOafpee9kee7nCcgfSlcclxuICAgICAgICAgICAgICAgIGxldCB1cGRhdGVDYWxsQmFja0Z1bmMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdGFydENoZWNrVXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChcIuS4i+i9veWksei0pe+8jOivt+ajgOafpee9kee7nFwiLCB1cGRhdGVDYWxsQmFja0Z1bmMsIHVwZGF0ZUNhbGxCYWNrRnVuYyk7XHJcbiAgICAgICAgICAgICAgICBmYWlsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZmFpbGVkKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImV2ZW50LmdldEV2ZW50Q29kZSgpXCIsIGV2ZW50LmdldEV2ZW50Q29kZSgpLCBldmVudC5nZXRBc3NldElkKCksIEdsb2JhbC5TZXR0aW5nLlVybHMuaGFsbEhvdFVwZGF0ZVVybCwgZmFpbGVkKTtcclxuICAgICAgICAgICAgdGhpcy5fYXNzZXRzTWdyLnNldEV2ZW50Q2FsbGJhY2sobnVsbCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucmV0cnkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChuZWVkUmVzdGFydCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oQ29uc3QuQ0xFQVJfTE9BRElOR19USU1FUilcclxuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZXJyb3JSZVN0YXJ0VGltZXNcIixudWxsKVxyXG4gICAgICAgICAgICBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLnJlbW92ZUtleShIYWxsU3RvcmFnZUtleS5Ib3RVcGRhdGVIb3N0cylcclxuICAgICAgICAgICAgdGhpcy5fYXNzZXRzTWdyLnNldEV2ZW50Q2FsbGJhY2sobnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICAgICAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuaG90RmFpbFJlcyA9IFwiXCI7XHJcbiAgICAgICAgICAgIEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLmhvdEZhaWxkTnVtID0gMDtcclxuICAgICAgICAgICAgLy8gZ0xvY2FsRGF0YS51c2VySW5mby5ob3RGYWlsUmVzID0gJyc7XHJcbiAgICAgICAgICAgIC8vIGdMb2NhbERhdGEudXNlckluZm8uaG90RmFpbGROdW0gPSAwO1xyXG4gICAgICAgICAgICAvLyBEYXRhSGVscGVyLkluc3RhbmNlLnNhdmVBbGxEYXRhKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBQcmVwZW5kIHRoZSBtYW5pZmVzdCdzIHNlYXJjaCBwYXRoXHJcbiAgICAgICAgICAgIGxldCBzZWFyY2hQYXRocyA9IGpzYi5maWxlVXRpbHMuZ2V0U2VhcmNoUGF0aHMoKTtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZygnc2VhcmNoUGF0aHMgLS0tLS0tLS0tJyArIHNlYXJjaFBhdGhzKVxyXG4gICAgICAgICAgICBsZXQgbmV3UGF0aHMgPSB0aGlzLl9hc3NldHNNZ3IuZ2V0TG9jYWxNYW5pZmVzdCgpLmdldFNlYXJjaFBhdGhzKCk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5TZWFyY2hQYXRoSGVscGVyLmFkZFBhdGhMaXN0KG5ld1BhdGhzKTtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZygnbmV3UGF0aHMgLS0tLS0tLS0tLS0tLScgKyBKU09OLnN0cmluZ2lmeShuZXdQYXRocykpO1xyXG4gICAgICAgICAgICAvLyBsZXQgdGVtcFBhdGhzID0gc2VhcmNoUGF0aHMuY29uY2F0KG5ld1BhdGhzKTtcclxuICAgICAgICAgICAgLy8gbGV0IHJldFBhdGhzID0gR2xvYmFsLkpTVXRpbC5hcnJheUNvbmNhdChzZWFyY2hQYXRocyxuZXdQYXRocylcclxuICAgICAgICAgICAgbGV0IHJldFBhdGhzID0gR2xvYmFsLlNlYXJjaFBhdGhIZWxwZXIuZ2V0U3lzdGVtU2VhcmNoUGF0aCgpO1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKCdzZWFyY2hQYXRocyBuZXcgLS0tLS0tLS0tLS0tLScgKyByZXRQYXRocyk7XHJcbiAgICAgICAgICAgIC8vIHNlYXJjaFBhdGhzIG5ldyAtLS0tLS0tLS0tLS0tLCBcInh4eFwiXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBBcnJheS5wcm90b3R5cGUudW5zaGlmdChzZWFyY2hQYXRocywgbmV3UGF0aHMpO1xyXG4gICAgICAgICAgICBsZXQgaG90VXBkYXRlTWFuYWdlciA9IEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyXHJcbiAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShob3RVcGRhdGVNYW5hZ2VyLmhvdFVwZGF0ZVN0b3JhZ2VLZXkgKyBob3RVcGRhdGVNYW5hZ2VyLmhhbGxIb3RVcGRhdGVEaXJOYW1lLCBob3RVcGRhdGVNYW5hZ2VyLmhhbGxIb3RVcGRhdGVEaXJOYW1lKTtcclxuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdIb3RVcGRhdGVTZWFyY2hQYXRocycsIEpTT04uc3RyaW5naWZ5KHJldFBhdGhzKSk7XHJcbiAgICAgICAgICAgIC8vIGpzYi5maWxlVXRpbHMuc2V0U2VhcmNoUGF0aHMocmV0UGF0aHMpO1xyXG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJuZWVkUmVzdGFydFwiLDEpIFxyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsKCk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5jbGVhckFsbFVJUHJlZmFiKClcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYy5nYW1lLnJlc3RhcnQoKTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInJlc3RhcnRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiByZXRyeVxyXG4gICAgICovXHJcbiAgICByZXRyeSgpIHtcclxuICAgICAgICBMb2dnZXIubG9nKFwiLS0tLS0tLS0tcmV0cnktLS0tLS0tLS0tLS0tLS1cIilcclxuICAgICAgICAvL+WmguaenOS4gOS4qui1hOa6kOS4i+i9veWksei0pei2hei/h+S6huS4pOasoe+8jOWwsea4hemZpOS5i+WJjeeahOS4i+i9vVxyXG4gICAgICAgIGlmIChHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5ob3RGYWlsUmVzID09IHRoaXMuX2ZhaWxkUmVzICYmIEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLmhvdEZhaWxkTnVtID49IDIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2ZhaWxkUmVzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBHbG9iYWwuVUkuZmFzdFRpcCh0aGlzLl9mYWlsZFJlcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5ob3RGYWlsUmVzID0gXCJcIjtcclxuICAgICAgICAgICAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuaG90RmFpbGROdW0gPSAwO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHVwZGF0ZUNhbGxCYWNrRnVuYyA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdGFydENoZWNrVXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChcIuS4i+i9veWksei0pe+8jOivt+ajgOafpee9kee7nFwiLCB1cGRhdGVDYWxsQmFja0Z1bmMsIHVwZGF0ZUNhbGxCYWNrRnVuYyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuaG90RmFpbGROdW0gPSB0aGlzLl9mYWlsZFJlcztcclxuICAgICAgICAgICAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuaG90RmFpbGROdW0rKztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIF9jYlZlcmlmeVxyXG4gICAgICogXHJcbiAgICAgKiDnlLHkuo7kuIvovb3ov4fnqIvkuK3ku43nhLbmnInlsI/mpoLnjoflj6/og73nlLHkuo7nvZHnu5zljp/lm6DmiJblhbbku5bnvZHnu5zlupPnmoTpl67popjlr7zoh7TkuIvovb3nmoTmlofku7blhoXlrrnmnInpl67popjvvIzmiYDku6XmiJHku6zmj5DkvpvkuobnlKjmiLfmlofku7bmoKHpqozmjqXlj6PvvIzlnKjmlofku7bkuIvovb3lrozmiJDlkI7ng63mm7TmlrDnrqHnkIblmajkvJrosIPnlKjov5nkuKrmjqXlj6PvvIjnlKjmiLflrp7njrDnmoTmg4XlhrXkuIvvvInvvIzlpoLmnpzov5Tlm54gdHJ1ZSDooajnpLrmlofku7bmraPluLjvvIzov5Tlm54gZmFsc2Ug6KGo56S65paH5Lu25pyJ6Zeu6aKYXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgX2NiVmVyaWZ5KHBhdGgsIGFzc2V0KSB7XHJcbiAgICAgICAgLy8gU2V0dXAgdGhlIHZlcmlmaWNhdGlvbiBjYWxsYmFjaywgYnV0IHdlIGRvbid0IGhhdmUgbWQ1IGNoZWNrIGZ1bmN0aW9uIHlldCwgc28gb25seSBwcmludCBzb21lIG1lc3NhZ2VcclxuICAgICAgICAvLyBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmVyaWZpY2F0aW9uIHBhc3NlZCwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZVxyXG4gICAgICAgIC8vIFdoZW4gYXNzZXQgaXMgY29tcHJlc3NlZCwgd2UgZG9uJ3QgbmVlZCB0byBjaGVjayBpdHMgbWQ1LCBiZWNhdXNlIHppcCBmaWxlIGhhdmUgYmVlbiBkZWxldGVkLlxyXG4gICAgICAgIHZhciBjb21wcmVzc2VkID0gYXNzZXQuY29tcHJlc3NlZDtcclxuICAgICAgICAvLyBSZXRyaWV2ZSB0aGUgY29ycmVjdCBtZDUgdmFsdWUuXHJcbiAgICAgICAgdmFyIGV4cGVjdGVkTUQ1ID0gYXNzZXQubWQ1O1xyXG4gICAgICAgIC8vIGFzc2V0LnBhdGggaXMgcmVsYXRpdmUgcGF0aCBhbmQgcGF0aCBpcyBhYnNvbHV0ZS5cclxuICAgICAgICB2YXIgcmVsYXRpdmVQYXRoID0gYXNzZXQucGF0aDtcclxuICAgICAgICAvLyBUaGUgc2l6ZSBvZiBhc3NldCBmaWxlLCBidXQgdGhpcyB2YWx1ZSBjb3VsZCBiZSBhYnNlbnQuXHJcbiAgICAgICAgdmFyIHNpemUgPSBhc3NldC5zaXplO1xyXG4gICAgICAgIGlmIChjb21wcmVzc2VkKSB7XHJcbiAgICAgICAgICAgIC8vIExvZ2dlci5sb2coKFwiVmVyaWZpY2F0aW9uIHBhc3NlZCA6IFwiICsgcmVsYXRpdmVQYXRoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gbGV0IGZpbGVTaXplID0ganNiLmZpbGVVdGlscy5nZXRGaWxlU2l6ZShwYXRoKTtcclxuICAgICAgICAgICAgLy8gTG9nZ2VyLmxvZyhcImZpbGUgc2l6ZSA9IFwiLCBmaWxlU2l6ZSwgXCJtYW5pZmVzdCBzaXplID0gXCIsIGFzc2V0LnNpemUpO1xyXG4gICAgICAgICAgICAvLyByZXR1cm4gZmlsZVNpemUgPT0gYXNzZXQuc2l6ZTtcclxuICAgICAgICAgICAgLy8gTG9nZ2VyLmxvZygoXCJWZXJpZmljYXRpb24gcGFzc2VkIDogXCIgKyByZWxhdGl2ZVBhdGggKyAnICgnICsgZXhwZWN0ZWRNRDUgKyAnKScpKTtcclxuICAgICAgICAgICAgLy8gcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIC8vIExvZ2dlci5sb2cocmVsYXRpdmVQYXRoLCBwYXRoLCBqc2IuZmlsZVV0aWxzLmdldEZpbGVTaXplKHBhdGgpLCBKU09OLnN0cmluZ2lmeShhc3NldCkpO1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IGpzYi5maWxlVXRpbHMuZ2V0RGF0YUZyb21GaWxlKHBhdGgpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBMb2dnZXIubG9nKCdkYXRhID09IG51bGwgTUQ1IHZlcmlmeSBmYWlsLHBhdGggYTonICsgcGF0aCArICcscGF0aCBiOicgKyBhc3NldC5wYXRoICArICcsbWQ1IGI6JyArIGFzc2V0Lm1kNSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGN1ck1ENSA9IG1kNShkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGN1ck1ENSA9PSBhc3NldC5tZDUpIHtcclxuICAgICAgICAgICAgICAgIC8vIExvZ2dlci5sb2coJ01ENSB2ZXJpZnkgc3VjY2VzcyEnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gTG9nZ2VyLmxvZygnTUQ1IHZlcmlmeSBmYWlsLHBhdGggYTonICsgcGF0aCArICcscGF0aCBiOicgKyBhc3NldC5wYXRoICsgJyxtZDUgYTonICsgY3VyTUQ1ICsgJyxtZDUgYjonICsgYXNzZXQubWQ1KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgbmV4dCgpIHtcclxuICAgICAgICBMb2dnZXIubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLWVudGVyIG5leHRcIilcclxuICAgICAgICAvL+eDreabtOWujOWGjeajgOa1i+S4gOmBjW9wZW5pbnN0YWxsXHJcbiAgICAgICAgLy9UZXN0RmxpZ2h0IOWMheS9juS6jjIwMDA3IOWuouaIt+err+W8ueabtOaWsOW8ueahhlxyXG4gICAgICAgIGxldCBuYXRpdmVQbGF0Zm9ybSA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8ubmF0aXZlUGxhdGZvcm1cclxuICAgICAgICBpZiAobmF0aXZlUGxhdGZvcm0gPT0gXCJ0ZXN0ZmxpZ2h0XCIgJiYgdGhpcy5jaGVja0lzTG93ZXIyMDAwN1ZlcmlvbigpKXtcclxuICAgICAgICAgICAgbGV0IGFwcF9mb3JjZV90eXBlID0gMFxyXG4gICAgICAgICAgICBHbG9iYWwuQXBwVXBkYXRlSGVscGVyLnNob3dMb2FkaW5nR2FtZVVwZGF0ZVVJKGFwcF9mb3JjZV90eXBlKVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgaWYgKCFHbG9iYWwuQXBwVXBkYXRlSGVscGVyLnN0YXJ0Rm9yY2VVcGRhdGVMb2dpYyh0aGlzLmNoZWNrVmVyc2lvbkRhdGEpKXtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5BcHBVcGRhdGVIZWxwZXIuZ29Ub0xvZ2luKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5qOA5rWL5piv5ZCmMjAwMDfniYjmnKzlvJXmk45cclxuICAgIHByaXZhdGUgY2hlY2tJc0xvd2VyMjAwMDdWZXJpb24oKXtcclxuICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbmF0aXZlQXBwVmVyc2lvbiA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uYXBwVmVyc2lvblxyXG4gICAgICAgIGxldCBpc0xvd0VuZ2luZVZlciA9IGZhbHNlXHJcbiAgICAgICAgbGV0IG5hdGl2ZUFwcFZlcnNpb25OdW0gPSBOdW1iZXIobmF0aXZlQXBwVmVyc2lvbikgfHwgMDtcclxuICAgICAgICBpZiAobmF0aXZlQXBwVmVyc2lvbk51bSA8IDIwMDA3KXtcclxuICAgICAgICAgICAgaXNMb3dFbmdpbmVWZXIgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNMb3dFbmdpbmVWZXI7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgb25SZW1vdmUoKSB7XHJcblxyXG4gICAgfVxyXG5cclxufSJdfQ==