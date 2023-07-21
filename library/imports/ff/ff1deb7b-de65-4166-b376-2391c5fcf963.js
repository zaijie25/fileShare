"use strict";
cc._RF.push(module, 'ff1det73mVBZrN2I5HF/Plj', 'AppHotUpdateProxy');
// hall/scripts/logic/core/loadingMVC/AppHotUpdateProxy.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotUpdateContext = void 0;
var LoadingConst_1 = require("./LoadingConst");
var ReportTool_1 = require("../tool/ReportTool");
var HallStorageKey_1 = require("../../hallcommon/const/HallStorageKey");
/**
 * 当前热更阶段
 */
var HotUpdateContext;
(function (HotUpdateContext) {
    HotUpdateContext[HotUpdateContext["none"] = -1] = "none";
    HotUpdateContext[HotUpdateContext["app"] = 0] = "app";
    HotUpdateContext[HotUpdateContext["hall"] = 1] = "hall";
    HotUpdateContext[HotUpdateContext["main"] = 2] = "main";
})(HotUpdateContext = exports.HotUpdateContext || (exports.HotUpdateContext = {}));
// 大厅部分热更
var AppHotUpdateProxy = /** @class */ (function (_super) {
    __extends(AppHotUpdateProxy, _super);
    function AppHotUpdateProxy(manifests) {
        var _this = _super.call(this) || this;
        _this.totalAssetByte = 0; //manifest上标记的总size
        _this.totalFileCount = 0; //总共下载文件数量
        _this.totalByte = 0; //总共下载文件大小
        _this.startTime = 0; // 开始下载事件
        _this.downLoadType = 0; // 下载类型 0 从零开始下载 1 热更新
        _this.appStartVer = "0.0.0"; // app独立包开始热更版本
        _this.hallStyleStartver = "0.0.0"; // 大厅风格独立包开始热更版本
        _this.mainBundleStartVer = "0.0.0"; // 主包开始热更版本
        _this.startVer = "0.0.0";
        _this.targetVer = "0.0.0";
        _this.targetAppVer = "0.0.0";
        _this.targetHallStyleVer = "0.0.0";
        _this.targetMainBundleVer = "0.0.0";
        _this.hallTotalSize = 0;
        _this.mainTotalSize = 0;
        _this.hallTotalFilecount = 0;
        _this.mainTotalFilecount = 0;
        _this.updateFailTimes = 0;
        _this.needRestart = false;
        _this.loadVersion = false;
        _this.isAwait = false;
        _this.updateCount = -1;
        _this.updateFinishedSubCount = 0;
        /**
         * 当前子热更名
         */
        _this.hotUpdateNameObj = {
            "-1": null,
            "0": "app",
            "1": "hall_style",
            "2": "main"
        };
        //服务器返回的热更地址
        _this.serverHotupdateUrl = "";
        _this.serverVersion = "";
        // Logger.log("----------HotUpdateProxy-------" + manifest.nativeUrl)
        _this.proxyName = AppHotUpdateProxy.NAME;
        _this.currentContext = HotUpdateContext.none;
        _this.projectManifestNativeUrl = _this.getNativeUrl(manifests);
        _this.currentManifestUrl = "";
        return _this;
    }
    /**
     *
     * @param manifest 组装随包资源文件
     */
    AppHotUpdateProxy.prototype.getNativeUrl = function (manifest) {
        if (!manifest || manifest.length == 0) {
            return null;
        }
        var nativeUrls = [];
        for (var index = 0; index < manifest.length; index++) {
            var element = manifest[index];
            nativeUrls.push(manifest[index].nativeUrl);
        }
        return nativeUrls;
    };
    AppHotUpdateProxy.prototype.reportLog = function (result, key, failedRes) {
        if (result === void 0) { result = 1; }
        if (key === void 0) { key = ReportTool_1.ReportTool.REPORT_TYPE_DOWNLOADSUBGAME_RESULT; }
        if (failedRes === void 0) { failedRes = ""; }
        var totalTime = new Date().getTime() - this.startTime;
        if (this.totalAssetByte && this.totalAssetByte != this.totalByte && result == 1) {
            result = 2;
        }
        if (!this.totalAssetByte) {
            this.totalAssetByte = 0;
        }
        this.totalAssetByte = Number(this.totalAssetByte) || 0;
        var retryTimes = cc.sys.localStorage.getItem("errorReStartTimes");
        retryTimes = Number(retryTimes) || 0;
        this.totalByte = this.hallTotalSize + this.mainTotalSize;
        this.totalFileCount = this.hallTotalFilecount + this.mainTotalFilecount;
        var reportParam = {
            "result": result,
            "game": 0,
            "totalFileCount": this.totalFileCount,
            "totalByte": this.totalByte / 1000,
            "totalTime": totalTime / 1000,
            "downLoadType": this.downLoadType,
            "updateUrl": Global.HotUpdateManager.hotUpdateUrl,
            "startVer": this.startVer,
            "totalAssetsBytes": this.totalAssetByte / 1000,
            "targetVer": this.targetVer,
            "appBundleStartVer": this.appStartVer,
            "hallStyleStartVer": this.hallStyleStartver,
            "mainBundleStartVer": this.mainBundleStartVer,
            "targetAppBundlever": Global.Setting.Urls.appVersion,
            "targetHallStyleVer": this.targetHallStyleVer,
            "targeMainBundleVer": this.targetMainBundleVer,
            "retryTimes": Number(retryTimes),
            "appVersion": Global.Setting.SystemInfo.appVersion,
            "dun": Global.DunHotUpdateUrlSetting.curDunType,
            "failedRes": failedRes
        };
        if (!result) {
            Global.ReportTool.ReportClientError(key, reportParam);
            return;
        }
        Global.ReportTool.ReportPublicClientLog(key, reportParam);
    };
    /**
     *
     * @param hotUpdateContext 获取当前热更子路径
     */
    AppHotUpdateProxy.prototype.getCurrentHotUpdateName = function (hotUpdateContext) {
        if (hotUpdateContext == HotUpdateContext.none) {
            return "";
        }
        if (hotUpdateContext != HotUpdateContext.hall) {
            return this.hotUpdateNameObj[hotUpdateContext];
        }
        var path = "assets/" + Global.customApp.getHallBundleName();
        return path;
    };
    /**
     * 获取本地manifest路径
     */
    AppHotUpdateProxy.prototype.getLocalHotUpdatePath = function () {
        var rootPath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + Global.HotUpdateManager.hotUpdateDirName + "/" + Global.HotUpdateManager.hallHotUpdateDirName + "/");
        return rootPath;
    };
    AppHotUpdateProxy.prototype.onRegister = function () {
        // //初始化system信息
        // Global.Setting.SystemInfo.Version = "1.0.5";
    };
    /**
     * _versionCompare
     */
    AppHotUpdateProxy.prototype._versionCompare = function (versionA, versionB) {
        // var vA = versionA.split('.');
        //  console.log("JS 自定义版本比较: version A : " + versionA + ', version B : ' + versionB);
        return versionA === versionB ? 0 : -1;
        // var vB = versionB.split('.');
        // this._currentVersion = versionA;
        // this._newestVersion = versionB;
        // for (var i = 0; i < vA.length; ++i) {
        //     var a = parseInt(vA[i]);
        //     var b = parseInt(vB[i] || "0");
        //     if (a === b) { continue; }
        //     else { return a - b; }
        // }
        // if (vB.length > vA.length) { return -1; }
        // else { return 0; }
    };
    AppHotUpdateProxy.prototype.preUpdate = function (hotUpdateUrl, version, HotUpdatePath) {
        var _this = this;
        if (!Global.Setting.isStartHotUpdate) {
            this.next();
            return;
        }
        //  console.log("开始检查更新",hotUpdateUrl,version,HotUpdatePath)
        this.sendNotification(LoadingConst_1.default.SHOW_CHECK_LABEL, { parm: "检查更新中..." });
        Global.HotUpdateManager.hotUpdateUrl = hotUpdateUrl;
        this.serverHotupdateUrl = Global.HotUpdateManager.hotUpdateUrl + "/" + HotUpdatePath + "/" + version + "/main/";
        var versionUrl = this.serverHotupdateUrl + Global.HotUpdateManager.versionCfgFileName;
        console.log("这是当前开始更新整地址=" + versionUrl);
        Global.HotUpdateManager.getGameVersion(versionUrl).then(function (data) {
            var nativeVersion = Global.HotUpdateManager.getNativeHotUpdateVersion("hall");
            _this.serverVersion = data.version;
            console.log("main本地=" + nativeVersion + "远程版本=" + _this.serverVersion);
            if (Global.Toolkit.versionCompare(_this.serverVersion, nativeVersion) == 0) {
                console.log("本地版本与服务器版本号一致");
                _this.checkNext();
                return;
            }
            Global.UI.show("WndGameUpgrade");
            _this._storagePath = _this.getLocalHotUpdatePath();
            //   console.log("这是当前原生的地址", this._storagePath)
            _this.localManifestJsonObj = Global.HotUpdateManager.getManifestObj(_this.serverHotupdateUrl, _this.getLocalHotUpdatePath());
            //  console.log("这是当前原生的地址1111111111", JSON.stringify(this.localManifestJsonObj));
            var storageManifestUrl = _this._storagePath + '/' + Global.HotUpdateManager.projectCfgFileName;
            jsb.fileUtils.writeStringToFile(JSON.stringify(_this.localManifestJsonObj), storageManifestUrl);
            _this._assetsMgr = new jsb.AssetsManager("", _this._storagePath, _this._versionCompare.bind(_this));
            _this._assetsMgr.setVerifyCallback(_this._cbVerify.bind(_this));
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                _this._assetsMgr.setMaxConcurrentTask(10);
            }
            _this.checkUpdate();
        }, function () {
            _this.downloadVerFaild(hotUpdateUrl, version, HotUpdatePath);
        });
    };
    /**
     * 保存文件到本地
     * @param filepath
     * @param data
     * @param callback
     */
    AppHotUpdateProxy.prototype.saveVerFileToNative = function (filepath, data, callback) {
        var hotUpdatePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + Global.HotUpdateManager.hotUpdateDirName + "/" + Global.HotUpdateManager.hallHotUpdateDirName);
        if (!jsb.fileUtils.isDirectoryExist(hotUpdatePath)) {
            jsb.fileUtils.createDirectory(hotUpdatePath);
        }
        if (typeof data !== 'undefined') {
            if (jsb.fileUtils.writeDataToFile(new Uint8Array(data), filepath)) {
                cc.log('DiantaiItem Remote write file succeed.');
                if (callback) {
                    callback();
                }
                return;
            }
        }
    };
    AppHotUpdateProxy.prototype.downloadVerFaild = function (hotUpdateUrl, version, HotUpdatePath) {
        var _this = this;
        this.updateFailTimes += 1;
        var updateCallBackFunc = function () {
            setTimeout(function () {
                _this.restartCheckUpdate();
            }, 1000);
        };
        if (this.updateFailTimes > 2) {
            Global.UI.showSingleBox("下载失败，请检查网络", updateCallBackFunc, updateCallBackFunc);
            return;
        }
        //发送上报
        var reportParam = { "host": hotUpdateUrl };
        Global.ReportTool.ReportClientError(ReportTool_1.ReportTool.REPORT_TYPE_HOTUPDATE_HOST_ERROR, reportParam);
        Global.UI.showSingleBox("下载失败，请检查网络", this.preUpdate.bind(this, hotUpdateUrl, version, HotUpdatePath), this.preUpdate.bind(this, hotUpdateUrl, version, HotUpdatePath));
    };
    AppHotUpdateProxy.prototype.checkUpdate = function () {
        if (this._updating) {
            this.sendNotification(LoadingConst_1.default.SHOW_CHECK_LABEL, { parm: "检查更新中..." });
            return;
        }
        if (this._assetsMgr.getState() === jsb.AssetsManager.State.UNINITED) {
            var jsonStr = JSON.stringify(this.localManifestJsonObj);
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
    AppHotUpdateProxy.prototype._cbCheckUpdate = function (event) {
        var _this = this;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                //this.sendNotification(Const.SHOW_PROGRESS_BAR, { parm: -1 })
                this.sendNotification(LoadingConst_1.default.SHOW_CHECK_LABEL, { parm: "已经是最新版" });
                this.next();
                this.updateFinishedSubCount += 1;
                return;
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
                //this.sendNotification(Const.SHOW_PROGRESS_BAR, { parm: 0 })
                this._needUpdate = true;
                break;
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                // let reportParam = {"game":"hall","eventcode":event.getEventCode(),"event":"checkupdate","url":Global.Setting.Urls.hallHotUpdateUrl}
                // Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_HOT_UPDATE_ERROR,reportParam)
                this.reportLog(0, ReportTool_1.ReportTool.REPORT_TYPE_DOWNLOADSUBGAME_FAILED);
                this.sendNotification(LoadingConst_1.default.SHOW_CHECK_LABEL, { parm: "下载失败，请检查网络" });
                var updateCallBackFunc = function () {
                    setTimeout(function () {
                        _this.restartCheckUpdate();
                    }, 1000);
                };
                Global.UI.showSingleBox("下载失败，请检查网络", updateCallBackFunc, updateCallBackFunc);
                // this._showRetryPanel( true );
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                this.checkNext();
                this.updateFinishedSubCount += 1;
                return;
            default:
                return;
        }
        this._assetsMgr.setEventCallback(null);
        this._updating = false;
        this.hotUpdate();
    };
    AppHotUpdateProxy.prototype.checkNext = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.sendNotification(LoadingConst_1.default.CLEAR_LOADING_TIMER);
                if (this._assetsMgr) {
                    this._assetsMgr.setEventCallback(null);
                    this._assetsMgr = null;
                    this._updating = false;
                }
                Global.HotUpdateManager.hotFailRes = "";
                Global.HotUpdateManager.hotFaildNum = 0;
                this.next();
                return [2 /*return*/];
            });
        });
    };
    AppHotUpdateProxy.prototype.restartCheckUpdate = function (autoRestart) {
        var _this = this;
        if (autoRestart === void 0) { autoRestart = true; }
        Logger.error("restartCheckUpdate");
        if (this._assetsMgr) {
            this._assetsMgr.setEventCallback(null);
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
        //发送上报
        var reportParam = { "host": Global.Setting.Urls.hallHotUpdateUrl };
        Global.ReportTool.ReportClientError(ReportTool_1.ReportTool.REPORT_TYPE_HOTUPDATE_HOST_ERROR, reportParam);
        this.clearDownloadTmpDir();
        if (autoRestart) {
            this.restartGame();
        }
        else {
            setTimeout(function () {
                Global.UI.show("WndMessageBox", "修复完成，点击确定将重启游戏...", 0, function () {
                    _this.restartGame();
                }, function () {
                    _this.restartGame();
                });
            }, 300);
        }
    };
    AppHotUpdateProxy.prototype.restartGame = function () {
        Global.UI.clearAllUIPrefab();
        Global.NativeEvent.unzipHallPackage();
        setTimeout(function () {
            cc.game.restart();
        }, 1000);
    };
    AppHotUpdateProxy.prototype.clearProjectManifest = function () {
        var pathParam = this.getCurrentHotUpdateName(this.currentContext);
        var path = cc.js.formatStr("hall/%s/", pathParam);
        Logger.error("clearProjectManifest--pathParam--path--", pathParam, path);
        var projectPath = Global.HotUpdateManager.updateHelper.genStoragePath(path) + Global.HotUpdateManager.projectCfgFileName;
        if (jsb.fileUtils.isFileExist(projectPath)) {
            Logger.error("remove file projectPath is exist = " + projectPath);
            jsb.fileUtils.removeFile(projectPath);
        }
        else {
            Logger.error("projectPath is not exist = " + projectPath);
        }
    };
    AppHotUpdateProxy.prototype.clearDownloadTmpDir = function () {
        var path = this.getTempPath();
        var tmpDowndloadPath = Global.HotUpdateManager.updateHelper.genStoragePath(path);
        if (jsb.fileUtils.isDirectoryExist(tmpDowndloadPath)) {
            Logger.error("remove tmpDowndloadPath  = " + tmpDowndloadPath);
            jsb.fileUtils.removeDirectory(tmpDowndloadPath);
        }
        else {
            Logger.error("tmpDowndloadPath is not exist = " + tmpDowndloadPath);
        }
    };
    AppHotUpdateProxy.prototype.getTempPath = function () {
        var path = "hall_temp";
        return path;
    };
    /**
     * hotUpdate
     */
    AppHotUpdateProxy.prototype.hotUpdate = function () {
        if (this._assetsMgr && !this._updating) {
            // this.barNode.active = true ;
            Logger.error(JSON.stringify(this._assetsMgr));
            //this.sendNotification(Const.SHOW_PROGRESS_BAR, { parm: 0 })
            this._assetsMgr.setEventCallback(this._cbUpdate.bind(this));
            if (this._assetsMgr.getState() === jsb.AssetsManager.State.UNINITED) {
                this.localManifest = new jsb.Manifest(JSON.stringify(this.localManifestJsonObj), this._storagePath);
                this._assetsMgr.loadLocalManifest(this.localManifest);
            }
            this._assetsMgr.update();
            this._updating = true;
        }
    };
    AppHotUpdateProxy.prototype.formatVersion = function () {
        var path = this.getTempPath();
        Logger.error("formatVersion----path--", path);
        var remoteVersion = this.serverVersion;
        var tmpVersionPath = Global.HotUpdateManager.updateHelper.genStoragePath(path) + "/" + Global.HotUpdateManager.versionCfgFileName;
        if (!jsb.fileUtils.isFileExist(tmpVersionPath)) {
            Logger.error("找不到文件", tmpVersionPath);
            return;
        }
        var content = jsb.fileUtils.getStringFromFile(tmpVersionPath);
        var tmpVersion = JSON.parse(content);
        tmpVersion.packageUrl = this.serverHotupdateUrl;
        tmpVersion.remoteManifestUrl = this.serverHotupdateUrl + Global.HotUpdateManager.projectCfgFileName;
        tmpVersion.remoteVersionUrl = this.serverHotupdateUrl + Global.HotUpdateManager.versionCfgFileName;
        tmpVersion.version = remoteVersion;
        var newTmpContent = JSON.stringify(tmpVersion);
        jsb.fileUtils.writeStringToFile(newTmpContent, tmpVersionPath);
    };
    AppHotUpdateProxy.prototype.formatManifest = function () {
        if (!cc.sys.isNative)
            return;
        var path = this.getTempPath();
        Logger.error("formatVersion----path--", path);
        var remoteVersion = this.serverVersion;
        var tmpProjectPath = Global.HotUpdateManager.updateHelper.genStoragePath(path) + "/" + "project.manifest.temp";
        if (!jsb.fileUtils.isFileExist(tmpProjectPath)) {
            Logger.error("找不到文件", tmpProjectPath);
            return;
        }
        var content = jsb.fileUtils.getStringFromFile(tmpProjectPath);
        var tmpManifest = JSON.parse(content);
        //tmpManifest = this.removeApp(tmpManifest)
        tmpManifest.packageUrl = this.serverHotupdateUrl;
        tmpManifest.remoteManifestUrl = this.serverHotupdateUrl + Global.HotUpdateManager.projectCfgFileName;
        tmpManifest.remoteVersionUrl = this.serverHotupdateUrl + Global.HotUpdateManager.versionCfgFileName;
        tmpManifest.version = remoteVersion;
        this.totalAssetByte += tmpManifest.totalSize;
        var newTmpContent = JSON.stringify(tmpManifest);
        jsb.fileUtils.writeStringToFile(newTmpContent, tmpProjectPath);
    };
    /**
     * _cbUpdate - 更新的回调
     */
    AppHotUpdateProxy.prototype._cbUpdate = function (event) {
        var _this = this;
        var needRestartRightNow = false;
        var failed = false;
        var currentUpdateFinish = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                var percentNum = event.getPercent();
                if (!percentNum || percentNum < 0.0001) {
                    percentNum = 0.0001;
                }
                if (this.updateCount > 0) {
                    percentNum = percentNum / this.updateCount + this.updateFinishedSubCount / this.updateCount;
                }
                this.sendNotification(LoadingConst_1.default.SHOW_PROGRESS_BAR, { parm: percentNum });
                var per = (percentNum * 100).toFixed(2);
                if (event && event.getMessage() == "ProjectDownloaded") {
                    this.formatManifest();
                }
                //event.getDownloadedFiles() + ' / ' + event.getTotalFiles() 
                // let per = (event.getDownloadedBytes() ) + " / "+ event.getTotalBytes();
                this.sendNotification(LoadingConst_1.default.SHOW_PROGRESS_LABEL, { parm: parseInt(per) + "%" });
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                this.sendNotification(LoadingConst_1.default.SHOW_PROGRESS_LABEL, { parm: "100%" });
                this.sendNotification(LoadingConst_1.default.SHOW_CHECK_LABEL, { parm: '更新完成' + event.getMessage() });
                needRestartRightNow = true; // 最后一个包下载完成再重启
                currentUpdateFinish = true;
                this.needRestart = true;
                this.updateFinishedSubCount += 1;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.sendNotification(LoadingConst_1.default.SHOW_CHECK_LABEL, { parm: '已经是最新版' });
                this.checkNext();
                return;
                //failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                this.reportLog(0, ReportTool_1.ReportTool.REPORT_TYPE_DOWNLOADSUBGAME_FAILED, event.getAssetId());
                // let reportParam3 = {"game":"hall","eventcode":event.getEventCode(),"event":"update","faildres":event.getAssetId(),"url":Global.Setting.Urls.hallHotUpdateUrl}
                // Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_HOT_UPDATE_ERROR,reportParam3)
                this.sendNotification(LoadingConst_1.default.SHOW_CHECK_LABEL, { parm: '更新失败： ' + event.getMessage() });
                this._updating = false;
                this._canRetry = true;
                failed = true;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                this._faildRes = event.getAssetId();
                // let reportParam1 = {"game":"hall","eventcode":event.getEventCode(),"event":"update","faildres":this._faildRes,"url":Global.Setting.Urls.hallHotUpdateUrl}
                // Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_HOT_UPDATE_ERROR,reportParam1)
                this.reportLog(0, ReportTool_1.ReportTool.REPORT_TYPE_DOWNLOADSUBGAME_FAILED, this._faildRes);
                // this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: 'Asset update error: ' + event.getAssetId() + ', ' + event.getMessage() })
                failed = true;
                break;
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                // let reportParam2 = {"game":"hall","eventcode":event.getEventCode(),"event":"update","faildres":event.getAssetId(),"url":Global.Setting.Urls.hallHotUpdateUrl}
                // Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_HOT_UPDATE_ERROR,reportParam2)
                this.reportLog(0, ReportTool_1.ReportTool.REPORT_TYPE_DOWNLOADSUBGAME_FAILED, event.getAssetId());
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
            this._assetsMgr.setEventCallback(null);
            this._updating = false;
            this.retry();
        }
        if (currentUpdateFinish) { //当前阶段热更是否完毕
            this.sendNotification(LoadingConst_1.default.CLEAR_LOADING_TIMER);
            Global.HotUpdateManager.hotFailRes = "";
            Global.HotUpdateManager.hotFaildNum = 0;
            var searchPaths = jsb.fileUtils.getSearchPaths();
            var newPaths = this._assetsMgr.getLocalManifest().getSearchPaths();
            Global.SearchPathHelper.addPathList(newPaths);
            var retPaths = Global.SearchPathHelper.getSystemSearchPath();
            var hotUpdateManager = Global.HotUpdateManager;
            cc.sys.localStorage.setItem(hotUpdateManager.hotUpdateStorageKey + hotUpdateManager.hallHotUpdateDirName, hotUpdateManager.hallHotUpdateDirName);
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(retPaths));
            //   console.log("这是当前的缓存路径",retPaths)
            this._assetsMgr.setEventCallback(null);
            this._assetsMgr = null;
            this._updating = false;
            if (!needRestartRightNow) { //是否立即重启  最后一个热更完毕即立即重启
                this.checkNext();
            }
            else {
                this.reportLog(1, ReportTool_1.ReportTool.REPORT_TYPE_DOWNLOADSUBGAME_RESULT);
                Global.Setting.storage.removeKey(HallStorageKey_1.default.HotUpdateHosts);
                cc.sys.localStorage.setItem("errorReStartTimes", null);
                cc.sys.localStorage.setItem("needRestart", 1);
                cc.audioEngine.stopAll();
                Global.UI.clearAllUIPrefab();
                setTimeout(function () {
                    cc.game.restart();
                }, 1000);
                Logger.error("restart");
            }
        }
    };
    AppHotUpdateProxy.prototype.restart = function () {
        Global.Setting.storage.removeKey(HallStorageKey_1.default.HotUpdateHosts);
        cc.sys.localStorage.setItem("needRestart", 1);
        cc.audioEngine.stopAll();
        Global.UI.clearAllUIPrefab();
        setTimeout(function () {
            cc.game.restart();
        }, 1000);
        Logger.error("restart");
    };
    /**
     * retry
     */
    AppHotUpdateProxy.prototype.retry = function () {
        var _this = this;
        //如果一个资源下载失败超过了两次，就清除之前的下载
        if (Global.HotUpdateManager.hotFailRes == this._faildRes && Global.HotUpdateManager.hotFaildNum >= 2) {
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
    AppHotUpdateProxy.prototype._cbVerify = function (path, asset) {
        var self = this;
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
        var fileSize = jsb.fileUtils.getFileSize(path);
        if (self.currentContext == HotUpdateContext.hall) {
            self.hallTotalSize += fileSize;
            self.hallTotalFilecount += 1;
        }
        else if (self.currentContext == HotUpdateContext.main) {
            self.mainTotalSize += fileSize;
            self.mainTotalFilecount += 1;
        }
        if (compressed) {
            Logger.log(("Verification passed : " + relativePath));
            return true;
        }
        else {
            return fileSize == asset.size;
            // var data = jsb.fileUtils.getDataFromFile(path);
            // if (data == null) {
            //     // Logger.log('data == null MD5 verify fail,path a:' + path + ',path b:' + asset.path  + ',md5 b:' + asset.md5);
            //     return false;
            // }
            // var curMD5 = md5(data);
            // if (curMD5 == asset.md5) {
            //     // Logger.log('MD5 verify success!');
            //     return true;
            // }
            // else {
            //     // Logger.log('MD5 verify fail,path a:' + path + ',path b:' + asset.path + ',md5 a:' + curMD5 + ',md5 b:' + asset.md5);
            //     return false;
            // }
        }
    };
    AppHotUpdateProxy.prototype.next = function () {
        if (this.needRestart) {
            cc.sys.localStorage.setItem("errorReStartTimes", null);
            this.reportLog(1, ReportTool_1.ReportTool.REPORT_TYPE_DOWNLOADSUBGAME_RESULT);
            this.restart();
            return;
        }
        Global.ChannelUtil.getUuid();
        Global.ChannelUtil.getEntryType();
        Global.ChannelUtil.getSignType();
        Global.ChannelUtil.PostInstallApp();
        Global.ChannelUtil.initOpeninstall();
        this.sendNotification(LoadingConst_1.default.CLEAR_LOADING_TIMER);
        //TestFlight 包低于20007 客户端弹更新弹框
        var nativePlatform = Global.Setting.SystemInfo.nativePlatform;
        if (nativePlatform == "testflight") {
            var app_force_type = 0;
            Global.AppUpdateHelper.showLoadingGameUpdateUI(app_force_type);
        }
        else {
            if (!Global.AppUpdateHelper.startForceUpdateLogic(this.checkVersionData)) {
                Global.AppUpdateHelper.goToLogin();
            }
        }
    };
    AppHotUpdateProxy.prototype.onRemove = function () {
    };
    AppHotUpdateProxy.NAME = "AppHotUpdateProxy";
    return AppHotUpdateProxy;
}(puremvc.Proxy));
exports.default = AppHotUpdateProxy;

cc._RF.pop();