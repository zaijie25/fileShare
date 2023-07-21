"use strict";
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