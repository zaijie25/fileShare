
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/loadingMVC/AppHotUpdateProxy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGxvYWRpbmdNVkNcXEFwcEhvdFVwZGF0ZVByb3h5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSwrQ0FBbUM7QUFDbkMsaURBQWdEO0FBQ2hELHdFQUFtRTtBQUNuRTs7R0FFRztBQUNILElBQVksZ0JBT1g7QUFQRCxXQUFZLGdCQUFnQjtJQUd4Qix3REFBUyxDQUFBO0lBQ1QscURBQU8sQ0FBQTtJQUNQLHVEQUFRLENBQUE7SUFDUix1REFBUSxDQUFBO0FBQ1osQ0FBQyxFQVBXLGdCQUFnQixHQUFoQix3QkFBZ0IsS0FBaEIsd0JBQWdCLFFBTzNCO0FBRUQsU0FBUztBQUNUO0lBQStDLHFDQUFhO0lBa0V4RCwyQkFBWSxTQUFvQjtRQUFoQyxZQUNJLGlCQUFPLFNBTVY7UUE1REQsb0JBQWMsR0FBRyxDQUFDLENBQUEsQ0FBQyxtQkFBbUI7UUFDdEMsb0JBQWMsR0FBRyxDQUFDLENBQUEsQ0FBQyxVQUFVO1FBQzdCLGVBQVMsR0FBRyxDQUFDLENBQUEsQ0FBQyxVQUFVO1FBQ3hCLGVBQVMsR0FBRyxDQUFDLENBQUEsQ0FBQyxTQUFTO1FBQ3ZCLGtCQUFZLEdBQUcsQ0FBQyxDQUFBLENBQUMsc0JBQXNCO1FBQ3ZDLGlCQUFXLEdBQUcsT0FBTyxDQUFBLENBQUMsZUFBZTtRQUNyQyx1QkFBaUIsR0FBRyxPQUFPLENBQUEsQ0FBQyxnQkFBZ0I7UUFDNUMsd0JBQWtCLEdBQUcsT0FBTyxDQUFBLENBQUMsV0FBVztRQUN4QyxjQUFRLEdBQUcsT0FBTyxDQUFBO1FBQ2xCLGVBQVMsR0FBRyxPQUFPLENBQUE7UUFDbkIsa0JBQVksR0FBRyxPQUFPLENBQUE7UUFDdEIsd0JBQWtCLEdBQUcsT0FBTyxDQUFBO1FBQzVCLHlCQUFtQixHQUFHLE9BQU8sQ0FBQTtRQUM3Qixt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Q0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHNCQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtRQUNoRCw4QkFBOEI7UUFDOUIsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFBO1FBQzdELElBQUksY0FBYyxJQUFJLFlBQVksRUFBQztZQUMvQixJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUE7WUFDdEIsTUFBTSxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxjQUFjLENBQUMsQ0FBQTtTQUNqRTthQUFLO1lBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUM7Z0JBQ3JFLE1BQU0sQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDdEM7U0FDSjtJQUVMLENBQUM7SUFFRCxvQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQXhzQk0sc0JBQUksR0FBRyxtQkFBbUIsQ0FBQztJQTBzQnRDLHdCQUFDO0NBMXdCRCxBQTB3QkMsQ0Exd0I4QyxPQUFPLENBQUMsS0FBSyxHQTB3QjNEO2tCQTF3Qm9CLGlCQUFpQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgTG9hZGluZ0ZhY2FkZSBmcm9tIFwiLi9Mb2FkaW5nRmFjYWRlXCI7XHJcbmltcG9ydCBDb25zdCBmcm9tIFwiLi9Mb2FkaW5nQ29uc3RcIjtcclxuaW1wb3J0IHsgUmVwb3J0VG9vbCB9IGZyb20gXCIuLi90b29sL1JlcG9ydFRvb2xcIjtcclxuaW1wb3J0IEhhbGxTdG9yYWdlS2V5IGZyb20gXCIuLi8uLi9oYWxsY29tbW9uL2NvbnN0L0hhbGxTdG9yYWdlS2V5XCI7XHJcbi8qKlxyXG4gKiDlvZPliY3ng63mm7TpmLbmrrVcclxuICovXHJcbmV4cG9ydCBlbnVtIEhvdFVwZGF0ZUNvbnRleHRcclxue1xyXG5cclxuICAgIG5vbmUgPSAtMSxcclxuICAgIGFwcCA9IDAsXHJcbiAgICBoYWxsID0gMSxcclxuICAgIG1haW4gPSAyLFxyXG59XHJcblxyXG4vLyDlpKfljoXpg6jliIbng63mm7RcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwSG90VXBkYXRlUHJveHkgZXh0ZW5kcyBwdXJlbXZjLlByb3h5IHtcclxuICAgIGZhY2FkZTogTG9hZGluZ0ZhY2FkZTtcclxuXHJcbiAgICBsb2NhbE1hbmlmZXN0SnNvbk9iajogYW55OyAvLyDmnKzlnLBtYW5pZmVzdOWvueixoVxyXG4gICAgbG9jYWxNYW5pZmVzdDogYW55O1xyXG5cclxuICAgIGN1cnJlbnRDb250ZXh0OkhvdFVwZGF0ZUNvbnRleHQgLy8g5b2T5YmN54Ot5pu06Zi25q61XHJcbiAgICBfY3VycmVudFZlcnNpb246IHN0cmluZzsgLy8g5pys5Zyw5b2T5YmN54mI5pysXHJcbiAgICBfbmV3ZXN0VmVyc2lvbjogc3RyaW5nOyAvLyDmnIDmlrDniYjmnKxcclxuICAgIF9zdG9yYWdlUGF0aDogc3RyaW5nOyAgLy8g54Ot5pu05a2Y5YKo6Lev5b6EXHJcbiAgICBfdXBkYXRpbmc6IGJvb2xlYW47ICAgIC8vIOaYr+WQpuato+WcqOeDreabtFxyXG4gICAgX25lZWRVcGRhdGU6IGJvb2xlYW47ICAvLyDmmK/lkKbpnIDopoHng63mm7RcclxuICAgIF9hc3NldHNNZ3I6IGpzYi5Bc3NldHNNYW5hZ2VyOyBcclxuICAgIHRvdGFsQXNzZXRCeXRlID0gMCAvL21hbmlmZXN05LiK5qCH6K6w55qE5oC7c2l6ZVxyXG4gICAgdG90YWxGaWxlQ291bnQgPSAwIC8v5oC75YWx5LiL6L295paH5Lu25pWw6YePXHJcbiAgICB0b3RhbEJ5dGUgPSAwIC8v5oC75YWx5LiL6L295paH5Lu25aSn5bCPXHJcbiAgICBzdGFydFRpbWUgPSAwIC8vIOW8gOWni+S4i+i9veS6i+S7tlxyXG4gICAgZG93bkxvYWRUeXBlID0gMCAvLyDkuIvovb3nsbvlnosgMCDku47pm7blvIDlp4vkuIvovb0gMSDng63mm7TmlrBcclxuICAgIGFwcFN0YXJ0VmVyID0gXCIwLjAuMFwiIC8vIGFwcOeLrOeri+WMheW8gOWni+eDreabtOeJiOacrFxyXG4gICAgaGFsbFN0eWxlU3RhcnR2ZXIgPSBcIjAuMC4wXCIgLy8g5aSn5Y6F6aOO5qC854us56uL5YyF5byA5aeL54Ot5pu054mI5pysXHJcbiAgICBtYWluQnVuZGxlU3RhcnRWZXIgPSBcIjAuMC4wXCIgLy8g5Li75YyF5byA5aeL54Ot5pu054mI5pysXHJcbiAgICBzdGFydFZlciA9IFwiMC4wLjBcIlxyXG4gICAgdGFyZ2V0VmVyID0gXCIwLjAuMFwiXHJcbiAgICB0YXJnZXRBcHBWZXIgPSBcIjAuMC4wXCJcclxuICAgIHRhcmdldEhhbGxTdHlsZVZlciA9IFwiMC4wLjBcIlxyXG4gICAgdGFyZ2V0TWFpbkJ1bmRsZVZlciA9IFwiMC4wLjBcIlxyXG4gICAgaGFsbFRvdGFsU2l6ZSA9IDBcclxuICAgIG1haW5Ub3RhbFNpemUgPSAwXHJcbiAgICBoYWxsVG90YWxGaWxlY291bnQgPSAwXHJcbiAgICBtYWluVG90YWxGaWxlY291bnQgPSAwXHJcblxyXG4gICAgX2NhblJldHJ5OiBib29sZWFuOyAgLy/mmK/lkKbph43or5VcclxuICAgIF9mYWlsZFJlczogYW55OyAgICAgIC8vIOWksei0pei1hOa6kFxyXG5cclxuICAgIHByb2plY3RNYW5pZmVzdE5hdGl2ZVVybDogc3RyaW5nIFtdO1xyXG5cclxuICAgIHVwZGF0ZUZhaWxUaW1lcyA9IDBcclxuICAgIGN1cnJlbnRNYW5pZmVzdFVybDpzdHJpbmcgLy8g5b2T5YmN6ZqP5YyF6LWE5rqQdXJsXHJcblxyXG4gICAgY2hlY2tWZXJzaW9uRGF0YTphbnk7XHJcblxyXG4gICAgbmVlZFJlc3RhcnQgPSBmYWxzZVxyXG5cclxuICAgIGxvYWRWZXJzaW9uID0gZmFsc2VcclxuICAgIGlzQXdhaXQgPSBmYWxzZVxyXG5cclxuICAgIHVwZGF0ZUNvdW50ID0gLTFcclxuICAgIHVwZGF0ZUZpbmlzaGVkU3ViQ291bnQgPSAwXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3lrZDng63mm7TlkI1cclxuICAgICAqL1xyXG4gICAgaG90VXBkYXRlTmFtZU9iaiA9IHtcclxuICAgICAgICBcIi0xXCI6bnVsbCxcclxuICAgICAgICBcIjBcIjpcImFwcFwiLFxyXG4gICAgICAgIFwiMVwiOlwiaGFsbF9zdHlsZVwiLFxyXG4gICAgICAgIFwiMlwiOlwibWFpblwiXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5pyN5Yqh5Zmo6L+U5Zue55qE54Ot5pu05Zyw5Z2AXHJcbiAgICBwcml2YXRlIHNlcnZlckhvdHVwZGF0ZVVybCA9IFwiXCJcclxuICAgIHByaXZhdGUgc2VydmVyVmVyc2lvbiA9IFwiXCJcclxuXHJcbiAgICBzdGF0aWMgTkFNRSA9IFwiQXBwSG90VXBkYXRlUHJveHlcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihtYW5pZmVzdHM6Y2MuQXNzZXRbXSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy8gTG9nZ2VyLmxvZyhcIi0tLS0tLS0tLS1Ib3RVcGRhdGVQcm94eS0tLS0tLS1cIiArIG1hbmlmZXN0Lm5hdGl2ZVVybClcclxuICAgICAgICB0aGlzLnByb3h5TmFtZSA9IEFwcEhvdFVwZGF0ZVByb3h5Lk5BTUU7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50Q29udGV4dCA9IEhvdFVwZGF0ZUNvbnRleHQubm9uZVxyXG4gICAgICAgIHRoaXMucHJvamVjdE1hbmlmZXN0TmF0aXZlVXJsID0gdGhpcy5nZXROYXRpdmVVcmwobWFuaWZlc3RzKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRNYW5pZmVzdFVybCA9IFwiXCJcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIG1hbmlmZXN0IOe7hOijhemaj+WMhei1hOa6kOaWh+S7tlxyXG4gICAgICovXHJcbiAgICBnZXROYXRpdmVVcmwobWFuaWZlc3Q6Y2MuQXNzZXRbXSlcclxuICAgIHtcclxuICAgICAgICBpZighbWFuaWZlc3QgfHwgbWFuaWZlc3QubGVuZ3RoID09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbmF0aXZlVXJscyA6IHN0cmluZ1tdID0gW11cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbWFuaWZlc3QubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBtYW5pZmVzdFtpbmRleF07XHJcbiAgICAgICAgICAgIG5hdGl2ZVVybHMucHVzaChtYW5pZmVzdFtpbmRleF0ubmF0aXZlVXJsKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmF0aXZlVXJsc1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXBvcnRMb2cocmVzdWx0ID0gMSxrZXkgPSBSZXBvcnRUb29sLlJFUE9SVF9UWVBFX0RPV05MT0FEU1VCR0FNRV9SRVNVTFQgLGZhaWxlZFJlcyA9IFwiXCIgKSB7XHJcbiAgICAgICAgbGV0IHRvdGFsVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5zdGFydFRpbWVcclxuICAgICAgICBpZih0aGlzLnRvdGFsQXNzZXRCeXRlICYmIHRoaXMudG90YWxBc3NldEJ5dGUgIT0gdGhpcy50b3RhbEJ5dGUgJiYgcmVzdWx0ID09IDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXN1bHQgPSAyXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF0aGlzLnRvdGFsQXNzZXRCeXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50b3RhbEFzc2V0Qnl0ZSA9IDBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50b3RhbEFzc2V0Qnl0ZSA9IE51bWJlcih0aGlzLnRvdGFsQXNzZXRCeXRlKSB8fCAwXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHJldHJ5VGltZXMgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJlcnJvclJlU3RhcnRUaW1lc1wiKVxyXG5cclxuICAgICAgICByZXRyeVRpbWVzICA9IE51bWJlcihyZXRyeVRpbWVzKSB8fCAwXHJcblxyXG4gICAgICAgIHRoaXMudG90YWxCeXRlID0gdGhpcy5oYWxsVG90YWxTaXplICsgdGhpcy5tYWluVG90YWxTaXplXHJcbiAgICAgICAgdGhpcy50b3RhbEZpbGVDb3VudCA9IHRoaXMuaGFsbFRvdGFsRmlsZWNvdW50ICsgdGhpcy5tYWluVG90YWxGaWxlY291bnRcclxuICAgICAgICBsZXQgcmVwb3J0UGFyYW0gPSB7XHJcbiAgICAgICAgICAgIFwicmVzdWx0XCI6IHJlc3VsdCxcclxuICAgICAgICAgICAgXCJnYW1lXCI6IDAsXHJcbiAgICAgICAgICAgIFwidG90YWxGaWxlQ291bnRcIjogdGhpcy50b3RhbEZpbGVDb3VudCxcclxuICAgICAgICAgICAgXCJ0b3RhbEJ5dGVcIjogdGhpcy50b3RhbEJ5dGUvMTAwMCxcclxuICAgICAgICAgICAgXCJ0b3RhbFRpbWVcIjogdG90YWxUaW1lIC8gMTAwMCxcclxuICAgICAgICAgICAgXCJkb3duTG9hZFR5cGVcIjogdGhpcy5kb3duTG9hZFR5cGUsXHJcbiAgICAgICAgICAgIFwidXBkYXRlVXJsXCI6IEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLmhvdFVwZGF0ZVVybCxcclxuICAgICAgICAgICAgXCJzdGFydFZlclwiOiB0aGlzLnN0YXJ0VmVyLFxyXG4gICAgICAgICAgICBcInRvdGFsQXNzZXRzQnl0ZXNcIjogdGhpcy50b3RhbEFzc2V0Qnl0ZS8xMDAwLFxyXG4gICAgICAgICAgICBcInRhcmdldFZlclwiOiB0aGlzLnRhcmdldFZlcixcclxuICAgICAgICAgICAgXCJhcHBCdW5kbGVTdGFydFZlclwiOnRoaXMuYXBwU3RhcnRWZXIsXHJcbiAgICAgICAgICAgIFwiaGFsbFN0eWxlU3RhcnRWZXJcIjp0aGlzLmhhbGxTdHlsZVN0YXJ0dmVyLFxyXG4gICAgICAgICAgICBcIm1haW5CdW5kbGVTdGFydFZlclwiOnRoaXMubWFpbkJ1bmRsZVN0YXJ0VmVyLFxyXG4gICAgICAgICAgICBcInRhcmdldEFwcEJ1bmRsZXZlclwiOkdsb2JhbC5TZXR0aW5nLlVybHMuYXBwVmVyc2lvbixcclxuICAgICAgICAgICAgXCJ0YXJnZXRIYWxsU3R5bGVWZXJcIjp0aGlzLnRhcmdldEhhbGxTdHlsZVZlcixcclxuICAgICAgICAgICAgXCJ0YXJnZU1haW5CdW5kbGVWZXJcIjp0aGlzLnRhcmdldE1haW5CdW5kbGVWZXIsXHJcbiAgICAgICAgICAgIFwicmV0cnlUaW1lc1wiOiBOdW1iZXIocmV0cnlUaW1lcyksXHJcbiAgICAgICAgICAgIFwiYXBwVmVyc2lvblwiOkdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uYXBwVmVyc2lvbixcclxuICAgICAgICAgICAgXCJkdW5cIjpHbG9iYWwuRHVuSG90VXBkYXRlVXJsU2V0dGluZy5jdXJEdW5UeXBlLFxyXG4gICAgICAgICAgICBcImZhaWxlZFJlc1wiOmZhaWxlZFJlc1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLlJlcG9ydFRvb2wuUmVwb3J0Q2xpZW50RXJyb3Ioa2V5LCByZXBvcnRQYXJhbSk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuUmVwb3J0VG9vbC5SZXBvcnRQdWJsaWNDbGllbnRMb2coa2V5LCByZXBvcnRQYXJhbSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBob3RVcGRhdGVDb250ZXh0IOiOt+WPluW9k+WJjeeDreabtOWtkOi3r+W+hFxyXG4gICAgICovXHJcbiAgICBnZXRDdXJyZW50SG90VXBkYXRlTmFtZShob3RVcGRhdGVDb250ZXh0OkhvdFVwZGF0ZUNvbnRleHQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoaG90VXBkYXRlQ29udGV4dCA9PSBIb3RVcGRhdGVDb250ZXh0Lm5vbmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoaG90VXBkYXRlQ29udGV4dCAhPSBIb3RVcGRhdGVDb250ZXh0LmhhbGwgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaG90VXBkYXRlTmFtZU9ialtob3RVcGRhdGVDb250ZXh0XSBcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBhdGggPSAgXCJhc3NldHMvXCIgKyBHbG9iYWwuY3VzdG9tQXBwLmdldEhhbGxCdW5kbGVOYW1lKClcclxuICAgICAgICByZXR1cm4gcGF0aFxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmnKzlnLBtYW5pZmVzdOi3r+W+hFxyXG4gICAgICovXHJcbiAgICBnZXRMb2NhbEhvdFVwZGF0ZVBhdGgoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCByb290UGF0aCA9ICgoanNiLmZpbGVVdGlscyA/IGpzYi5maWxlVXRpbHMuZ2V0V3JpdGFibGVQYXRoKCkgOiAnLycpICsgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuaG90VXBkYXRlRGlyTmFtZSArIFwiL1wiICsgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuaGFsbEhvdFVwZGF0ZURpck5hbWUgKyBcIi9cIiApXHJcbiAgICAgICAgcmV0dXJuIHJvb3RQYXRoXHJcbiAgICB9XHJcblxyXG4gICBcclxuICAgIG9uUmVnaXN0ZXIoKSB7XHJcbiAgICAgICAgLy8gLy/liJ3lp4vljJZzeXN0ZW3kv6Hmga9cclxuICAgICAgICAvLyBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLlZlcnNpb24gPSBcIjEuMC41XCI7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIF92ZXJzaW9uQ29tcGFyZVxyXG4gICAgICovXHJcbiAgICBfdmVyc2lvbkNvbXBhcmUodmVyc2lvbkE6IHN0cmluZywgdmVyc2lvbkI6IHN0cmluZykge1xyXG4gICAgICAgIC8vIHZhciB2QSA9IHZlcnNpb25BLnNwbGl0KCcuJyk7XHJcbiAgICAgIC8vICBjb25zb2xlLmxvZyhcIkpTIOiHquWumuS5ieeJiOacrOavlOi+gzogdmVyc2lvbiBBIDogXCIgKyB2ZXJzaW9uQSArICcsIHZlcnNpb24gQiA6ICcgKyB2ZXJzaW9uQik7XHJcbiAgICAgICAgcmV0dXJuIHZlcnNpb25BID09PSB2ZXJzaW9uQiA/IDAgOiAtMTtcclxuICAgICAgICAvLyB2YXIgdkIgPSB2ZXJzaW9uQi5zcGxpdCgnLicpO1xyXG4gICAgICAgIC8vIHRoaXMuX2N1cnJlbnRWZXJzaW9uID0gdmVyc2lvbkE7XHJcbiAgICAgICAgLy8gdGhpcy5fbmV3ZXN0VmVyc2lvbiA9IHZlcnNpb25CO1xyXG4gICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgdkEubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAvLyAgICAgdmFyIGEgPSBwYXJzZUludCh2QVtpXSk7XHJcbiAgICAgICAgLy8gICAgIHZhciBiID0gcGFyc2VJbnQodkJbaV0gfHwgXCIwXCIpO1xyXG4gICAgICAgIC8vICAgICBpZiAoYSA9PT0gYikgeyBjb250aW51ZTsgfVxyXG4gICAgICAgIC8vICAgICBlbHNlIHsgcmV0dXJuIGEgLSBiOyB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGlmICh2Qi5sZW5ndGggPiB2QS5sZW5ndGgpIHsgcmV0dXJuIC0xOyB9XHJcbiAgICAgICAgLy8gZWxzZSB7IHJldHVybiAwOyB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByZVVwZGF0ZShob3RVcGRhdGVVcmw6IHN0cmluZywgdmVyc2lvbjogc3RyaW5nLEhvdFVwZGF0ZVBhdGg6IHN0cmluZylcclxuICAgIHtcclxuICAgICAgICBpZiAoIUdsb2JhbC5TZXR0aW5nLmlzU3RhcnRIb3RVcGRhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIC8vICBjb25zb2xlLmxvZyhcIuW8gOWni+ajgOafpeabtOaWsFwiLGhvdFVwZGF0ZVVybCx2ZXJzaW9uLEhvdFVwZGF0ZVBhdGgpXHJcbiAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKENvbnN0LlNIT1dfQ0hFQ0tfTEFCRUwsIHsgcGFybTogXCLmo4Dmn6Xmm7TmlrDkuK0uLi5cIiB9KVxyXG4gICAgICAgIEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLmhvdFVwZGF0ZVVybCA9IGhvdFVwZGF0ZVVybFxyXG4gICAgICAgIHRoaXMuc2VydmVySG90dXBkYXRlVXJsID0gYCR7R2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuaG90VXBkYXRlVXJsfS8ke0hvdFVwZGF0ZVBhdGh9LyR7dmVyc2lvbn0vbWFpbi9gO1xyXG4gICAgICAgIGxldCB2ZXJzaW9uVXJsID0gdGhpcy5zZXJ2ZXJIb3R1cGRhdGVVcmwgKyBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci52ZXJzaW9uQ2ZnRmlsZU5hbWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLov5nmmK/lvZPliY3lvIDlp4vmm7TmlrDmlbTlnLDlnYA9XCIrdmVyc2lvblVybClcclxuICAgICAgICBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5nZXRHYW1lVmVyc2lvbih2ZXJzaW9uVXJsKS50aGVuKGRhdGE9PntcclxuICAgICAgICAgICAgbGV0IG5hdGl2ZVZlcnNpb24gPSBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5nZXROYXRpdmVIb3RVcGRhdGVWZXJzaW9uKFwiaGFsbFwiKTtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXJWZXJzaW9uID0gZGF0YS52ZXJzaW9uXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWFpbuacrOWcsD1cIituYXRpdmVWZXJzaW9uK1wi6L+c56iL54mI5pysPVwiK3RoaXMuc2VydmVyVmVyc2lvbilcclxuICAgICAgICAgICAgaWYgKEdsb2JhbC5Ub29sa2l0LnZlcnNpb25Db21wYXJlKHRoaXMuc2VydmVyVmVyc2lvbiwgbmF0aXZlVmVyc2lvbikgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmnKzlnLDniYjmnKzkuI7mnI3liqHlmajniYjmnKzlj7fkuIDoh7RcIilcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tOZXh0KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRHYW1lVXBncmFkZVwiKVxyXG4gICAgICAgICAgICB0aGlzLl9zdG9yYWdlUGF0aCA9IHRoaXMuZ2V0TG9jYWxIb3RVcGRhdGVQYXRoKClcclxuICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhcIui/meaYr+W9k+WJjeWOn+eUn+eahOWcsOWdgFwiLCB0aGlzLl9zdG9yYWdlUGF0aClcclxuICAgICAgICAgICAgdGhpcy5sb2NhbE1hbmlmZXN0SnNvbk9iaiA9IEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLmdldE1hbmlmZXN0T2JqKHRoaXMuc2VydmVySG90dXBkYXRlVXJsLCB0aGlzLmdldExvY2FsSG90VXBkYXRlUGF0aCgpKVxyXG4gICAgICAgICAgLy8gIGNvbnNvbGUubG9nKFwi6L+Z5piv5b2T5YmN5Y6f55Sf55qE5Zyw5Z2AMTExMTExMTExMVwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmxvY2FsTWFuaWZlc3RKc29uT2JqKSk7XHJcbiAgICAgICAgICAgIGxldCBzdG9yYWdlTWFuaWZlc3RVcmwgPSB0aGlzLl9zdG9yYWdlUGF0aCArICcvJyArIEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnByb2plY3RDZmdGaWxlTmFtZTtcclxuICAgICAgICAgICAganNiLmZpbGVVdGlscy53cml0ZVN0cmluZ1RvRmlsZShKU09OLnN0cmluZ2lmeSh0aGlzLmxvY2FsTWFuaWZlc3RKc29uT2JqKSwgc3RvcmFnZU1hbmlmZXN0VXJsKVxyXG4gICAgICAgICAgICB0aGlzLl9hc3NldHNNZ3IgPSBuZXcganNiLkFzc2V0c01hbmFnZXIoXCJcIiwgdGhpcy5fc3RvcmFnZVBhdGgsIHRoaXMuX3ZlcnNpb25Db21wYXJlLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuX2Fzc2V0c01nci5zZXRWZXJpZnlDYWxsYmFjayh0aGlzLl9jYlZlcmlmeS5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXNzZXRzTWdyLnNldE1heENvbmN1cnJlbnRUYXNrKDEwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tVcGRhdGUoKTtcclxuICAgICAgICB9LCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuZG93bmxvYWRWZXJGYWlsZChob3RVcGRhdGVVcmwsdmVyc2lvbixIb3RVcGRhdGVQYXRoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgIFxyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDkv53lrZjmlofku7bliLDmnKzlnLBcclxuICAgICAqIEBwYXJhbSBmaWxlcGF0aCBcclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIFxyXG4gICAgICovXHJcbiAgICBzYXZlVmVyRmlsZVRvTmF0aXZlKGZpbGVwYXRoLCBkYXRhLCBjYWxsYmFjaz8pIHtcclxuICAgICAgICBsZXQgaG90VXBkYXRlUGF0aCA9ICgoanNiLmZpbGVVdGlscyA/IGpzYi5maWxlVXRpbHMuZ2V0V3JpdGFibGVQYXRoKCkgOiAnLycpICsgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuaG90VXBkYXRlRGlyTmFtZSArIFwiL1wiICsgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuaGFsbEhvdFVwZGF0ZURpck5hbWUpXHJcbiAgICAgICAgaWYoIWpzYi5maWxlVXRpbHMuaXNEaXJlY3RvcnlFeGlzdChob3RVcGRhdGVQYXRoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGpzYi5maWxlVXRpbHMuY3JlYXRlRGlyZWN0b3J5KGhvdFVwZGF0ZVBhdGgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgaWYgKGpzYi5maWxlVXRpbHMud3JpdGVEYXRhVG9GaWxlKG5ldyBVaW50OEFycmF5KGRhdGEpLCBmaWxlcGF0aCkpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZygnRGlhbnRhaUl0ZW0gUmVtb3RlIHdyaXRlIGZpbGUgc3VjY2VlZC4nKTtcclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkb3dubG9hZFZlckZhaWxkKGhvdFVwZGF0ZVVybDogc3RyaW5nLCB2ZXJzaW9uOiBzdHJpbmcsSG90VXBkYXRlUGF0aDpzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZhaWxUaW1lcyArPSAxXHJcbiAgICAgICAgbGV0IHVwZGF0ZUNhbGxCYWNrRnVuYyA9ICgpID0+IHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RhcnRDaGVja1VwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudXBkYXRlRmFpbFRpbWVzID4gMikge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChcIuS4i+i9veWksei0pe+8jOivt+ajgOafpee9kee7nFwiLHVwZGF0ZUNhbGxCYWNrRnVuYyx1cGRhdGVDYWxsQmFja0Z1bmMgKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5Y+R6YCB5LiK5oqlXHJcbiAgICAgICAgbGV0IHJlcG9ydFBhcmFtID0geyBcImhvc3RcIjogaG90VXBkYXRlVXJsIH1cclxuICAgICAgICBHbG9iYWwuUmVwb3J0VG9vbC5SZXBvcnRDbGllbnRFcnJvcihSZXBvcnRUb29sLlJFUE9SVF9UWVBFX0hPVFVQREFURV9IT1NUX0VSUk9SLCByZXBvcnRQYXJhbSlcclxuXHJcblxyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi5LiL6L295aSx6LSl77yM6K+35qOA5p+l572R57ucXCIsIHRoaXMucHJlVXBkYXRlLmJpbmQodGhpcywgaG90VXBkYXRlVXJsLCB2ZXJzaW9uLEhvdFVwZGF0ZVBhdGgpLCB0aGlzLnByZVVwZGF0ZS5iaW5kKHRoaXMsIGhvdFVwZGF0ZVVybCwgdmVyc2lvbixIb3RVcGRhdGVQYXRoKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICBcclxuXHJcbiAgICBjaGVja1VwZGF0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fdXBkYXRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKENvbnN0LlNIT1dfQ0hFQ0tfTEFCRUwsIHsgcGFybTogXCLmo4Dmn6Xmm7TmlrDkuK0uLi5cIiB9KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9hc3NldHNNZ3IuZ2V0U3RhdGUoKSA9PT0ganNiLkFzc2V0c01hbmFnZXIuU3RhdGUuVU5JTklURUQpIHtcclxuICAgICAgICAgICAgbGV0IGpzb25TdHIgPSBKU09OLnN0cmluZ2lmeSh0aGlzLmxvY2FsTWFuaWZlc3RKc29uT2JqKVxyXG4gICAgICAgICAgICB0aGlzLmxvY2FsTWFuaWZlc3QgPSBuZXcganNiLk1hbmlmZXN0KGpzb25TdHIsIHRoaXMuX3N0b3JhZ2VQYXRoKVxyXG4gICAgICAgICAgICB0aGlzLl9hc3NldHNNZ3IubG9hZExvY2FsTWFuaWZlc3QodGhpcy5sb2NhbE1hbmlmZXN0LCB0aGlzLl9zdG9yYWdlUGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOabtOaNoiBtYW5pZmVzdCDot6/lvoTku6XlkI7ov5nph4zkvJrmiqXplJlcclxuICAgICAgICBpZiAoIXRoaXMuX2Fzc2V0c01nci5nZXRMb2NhbE1hbmlmZXN0KCkgfHwgIXRoaXMuX2Fzc2V0c01nci5nZXRMb2NhbE1hbmlmZXN0KCkuaXNMb2FkZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oQ29uc3QuU0hPV19DSEVDS19MQUJFTCwgeyBwYXJtOlwi5a+85YWl5paH5Lu25aSx6LSl77yM5bu66K6u6YeN5ZCv5ri45oiP5oiW6YeN5paw5LiL6L295pyA5paw54mI5pysXCIgfSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fYXNzZXRzTWdyLnNldEV2ZW50Q2FsbGJhY2sodGhpcy5fY2JDaGVja1VwZGF0ZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLl9hc3NldHNNZ3IuY2hlY2tVcGRhdGUoKTtcclxuICAgICAgICB0aGlzLl91cGRhdGluZyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIF9jYkNoZWNrVXBkYXRlXHJcbiAgICAgKiBcclxuICAgICAqIGlvczEw5Lit77yM5Zyo5by55Ye65piv5ZCm5YWB6K646IGU572R5LmL5YmN77yM5Lya5oql77yaXHJcbiAgICAgKiBBc3NldHNNYW5hZ2VyRXggOiBGYWlsIHRvIGRvd25sb2FkIHZlcnNpb24gZmlsZSwgc3RlcCBza2lwcGVkIENvZGU6IDFcclxuICAgICAqL1xyXG4gICAgX2NiQ2hlY2tVcGRhdGUoZXZlbnQpIHtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmdldEV2ZW50Q29kZSgpKSB7XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5BTFJFQURZX1VQX1RPX0RBVEU6XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuc2VuZE5vdGlmaWNhdGlvbihDb25zdC5TSE9XX1BST0dSRVNTX0JBUiwgeyBwYXJtOiAtMSB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKENvbnN0LlNIT1dfQ0hFQ0tfTEFCRUwsIHsgcGFybTogXCLlt7Lnu4/mmK/mnIDmlrDniYhcIiB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZpbmlzaGVkU3ViQ291bnQgKz0gMVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgLy92ZXJzaW9uIFVwZGF0ZV9wcm9ncmVzc2lvbuWcqG5ldyB2ZXJzaW9uIGZvdW5k5LmL5YmNXHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5VUERBVEVfUFJPR1JFU1NJT046XHJcbiAgICAgICAgICAgICAgICBpZihldmVudCAmJiBldmVudC5nZXRNZXNzYWdlKCkgPT0gXCJWZXJzaW9uRG93bmxvYWRlZFwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIlZlcnNpb25Eb3dubG9hZGVkIGZvcm1hdFZlcnNpb25cIilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1hdFZlcnNpb24oKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGV2ZW50ICYmIGV2ZW50LmdldE1lc3NhZ2UoKSA9PSBcIlByb2plY3REb3dubG9hZGVkXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiUHJvamVjdERvd25sb2FkZWQgZm9ybWF0TWFuaWZlc3RcIilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1hdE1hbmlmZXN0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5ORVdfVkVSU0lPTl9GT1VORDpcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5zZW5kTm90aWZpY2F0aW9uKENvbnN0LlNIT1dfUFJPR1JFU1NfQkFSLCB7IHBhcm06IDAgfSlcclxuICAgICAgICAgICAgICAgIHRoaXMuX25lZWRVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5FUlJPUl9OT19MT0NBTF9NQU5JRkVTVDpcclxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLkVSUk9SX0RPV05MT0FEX01BTklGRVNUOlxyXG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuRVJST1JfUEFSU0VfTUFOSUZFU1Q6XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIGxldCByZXBvcnRQYXJhbSA9IHtcImdhbWVcIjpcImhhbGxcIixcImV2ZW50Y29kZVwiOmV2ZW50LmdldEV2ZW50Q29kZSgpLFwiZXZlbnRcIjpcImNoZWNrdXBkYXRlXCIsXCJ1cmxcIjpHbG9iYWwuU2V0dGluZy5VcmxzLmhhbGxIb3RVcGRhdGVVcmx9XHJcbiAgICAgICAgICAgICAgICAvLyBHbG9iYWwuUmVwb3J0VG9vbC5SZXBvcnRDbGllbnRFcnJvcihSZXBvcnRUb29sLlJFUE9SVF9UWVBFX0hPVF9VUERBVEVfRVJST1IscmVwb3J0UGFyYW0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcG9ydExvZygwLCBSZXBvcnRUb29sLlJFUE9SVF9UWVBFX0RPV05MT0FEU1VCR0FNRV9GQUlMRUQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oQ29uc3QuU0hPV19DSEVDS19MQUJFTCwgeyBwYXJtOiBcIuS4i+i9veWksei0pe+8jOivt+ajgOafpee9kee7nFwiIH0pXHJcbiAgICAgICAgICAgICAgICBsZXQgdXBkYXRlQ2FsbEJhY2tGdW5jID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3RhcnRDaGVja1VwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLkuIvovb3lpLHotKXvvIzor7fmo4Dmn6XnvZHnu5xcIiwgdXBkYXRlQ2FsbEJhY2tGdW5jLCB1cGRhdGVDYWxsQmFja0Z1bmMpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fc2hvd1JldHJ5UGFuZWwoIHRydWUgKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuVVBEQVRFX0ZJTklTSEVEOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja05leHQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRmluaXNoZWRTdWJDb3VudCArPSAxXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2Fzc2V0c01nci5zZXRFdmVudENhbGxiYWNrKG51bGwpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ob3RVcGRhdGUoKTtcclxuICAgIH1cclxuICAgIGFzeW5jIGNoZWNrTmV4dCgpIHtcclxuICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oQ29uc3QuQ0xFQVJfTE9BRElOR19USU1FUilcclxuICAgICAgICBpZiggdGhpcy5fYXNzZXRzTWdyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fYXNzZXRzTWdyLnNldEV2ZW50Q2FsbGJhY2sobnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2Fzc2V0c01nciA9IG51bGxcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRpbmcgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5ob3RGYWlsUmVzID0gXCJcIjtcclxuICAgICAgICBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5ob3RGYWlsZE51bSA9IDA7XHJcbiAgICAgICAgdGhpcy5uZXh0KCkgXHJcbiAgICB9XHJcblxyXG4gICAgcmVzdGFydENoZWNrVXBkYXRlKGF1dG9SZXN0YXJ0ID0gdHJ1ZSkge1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihcInJlc3RhcnRDaGVja1VwZGF0ZVwiKVxyXG4gICAgICAgIGlmICh0aGlzLl9hc3NldHNNZ3IpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXNzZXRzTWdyLnNldEV2ZW50Q2FsbGJhY2sobnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2Fzc2V0c01nciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhdXRvUmVzdGFydCkge1xyXG4gICAgICAgICAgICBsZXQgZXJyb3JSZVN0YXJ0VGltZXMgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJlcnJvclJlU3RhcnRUaW1lc1wiKVxyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yUmVTdGFydFRpbWVzICE9IG51bGwgJiYgZXJyb3JSZVN0YXJ0VGltZXMgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBudW0gPSBOdW1iZXIoZXJyb3JSZVN0YXJ0VGltZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG51bSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW0rKztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJlcnJvclJlU3RhcnRUaW1lc1wiLCBudW0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImVycm9yUmVTdGFydFRpbWVzXCIsIDEpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHN0b3JhZ2VfaGFsbF91cmxzID0gR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5nZXRPYmplY3QoSGFsbFN0b3JhZ2VLZXkuSG90VXBkYXRlSG9zdHMpXHJcbiAgICAgICAgICAgIGlmICghc3RvcmFnZV9oYWxsX3VybHMpIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2Uuc2V0T2JqZWN0KEhhbGxTdG9yYWdlS2V5LkhvdFVwZGF0ZUhvc3RzLCBHbG9iYWwuU2V0dGluZy5VcmxzLmhhbGxIb3RVcGRhdGVVcmxBcnJheSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+WPkemAgeS4iuaKpVxyXG4gICAgICAgICAgICBsZXQgcmVwb3J0UGFyYW0gPSB7IFwiaG9zdFwiOiBHbG9iYWwuU2V0dGluZy5VcmxzLmhhbGxIb3RVcGRhdGVVcmwgfVxyXG4gICAgICAgICAgICBHbG9iYWwuUmVwb3J0VG9vbC5SZXBvcnRDbGllbnRFcnJvcihSZXBvcnRUb29sLlJFUE9SVF9UWVBFX0hPVFVQREFURV9IT1NUX0VSUk9SLCByZXBvcnRQYXJhbSlcclxuXHJcbiAgICAgICAgdGhpcy5jbGVhckRvd25sb2FkVG1wRGlyKCk7XHJcbiAgICAgICAgaWYgKGF1dG9SZXN0YXJ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdGFydEdhbWUoKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRNZXNzYWdlQm94XCIsIFwi5L+u5aSN5a6M5oiQ77yM54K55Ye756Gu5a6a5bCG6YeN5ZCv5ri45oiPLi4uXCIsIDAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3RhcnRHYW1lKClcclxuICAgICAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3RhcnRHYW1lKClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlc3RhcnRHYW1lKCl7XHJcbiAgICAgICAgR2xvYmFsLlVJLmNsZWFyQWxsVUlQcmVmYWIoKTtcclxuICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQudW56aXBIYWxsUGFja2FnZSgpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjYy5nYW1lLnJlc3RhcnQoKTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjbGVhclByb2plY3RNYW5pZmVzdCgpe1xyXG4gICAgICAgIGxldCBwYXRoUGFyYW0gPSB0aGlzLmdldEN1cnJlbnRIb3RVcGRhdGVOYW1lKHRoaXMuY3VycmVudENvbnRleHQpIFxyXG4gICAgICAgIGxldCBwYXRoID0gY2MuanMuZm9ybWF0U3RyKFwiaGFsbC8lcy9cIixwYXRoUGFyYW0pXHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKFwiY2xlYXJQcm9qZWN0TWFuaWZlc3QtLXBhdGhQYXJhbS0tcGF0aC0tXCIgLHBhdGhQYXJhbSxwYXRoKVxyXG4gICAgICAgIGxldCBwcm9qZWN0UGF0aCA9IEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnVwZGF0ZUhlbHBlci5nZW5TdG9yYWdlUGF0aChwYXRoKSArIEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnByb2plY3RDZmdGaWxlTmFtZTtcclxuICAgICAgICAgICAgaWYoanNiLmZpbGVVdGlscy5pc0ZpbGVFeGlzdChwcm9qZWN0UGF0aCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInJlbW92ZSBmaWxlIHByb2plY3RQYXRoIGlzIGV4aXN0ID0gXCIgKyBwcm9qZWN0UGF0aClcclxuICAgICAgICAgICAgICAgIGpzYi5maWxlVXRpbHMucmVtb3ZlRmlsZShwcm9qZWN0UGF0aCk7XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInByb2plY3RQYXRoIGlzIG5vdCBleGlzdCA9IFwiICsgcHJvamVjdFBhdGgpXHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGVhckRvd25sb2FkVG1wRGlyKCl7XHJcbiAgICAgICAgbGV0IHBhdGggPSB0aGlzLmdldFRlbXBQYXRoKClcclxuICAgICAgICBsZXQgdG1wRG93bmRsb2FkUGF0aCA9IEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnVwZGF0ZUhlbHBlci5nZW5TdG9yYWdlUGF0aChwYXRoKVxyXG4gICAgICAgIGlmIChqc2IuZmlsZVV0aWxzLmlzRGlyZWN0b3J5RXhpc3QodG1wRG93bmRsb2FkUGF0aCkpe1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJyZW1vdmUgdG1wRG93bmRsb2FkUGF0aCAgPSBcIiArIHRtcERvd25kbG9hZFBhdGgpXHJcbiAgICAgICAgICAgIGpzYi5maWxlVXRpbHMucmVtb3ZlRGlyZWN0b3J5KHRtcERvd25kbG9hZFBhdGgpXHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJ0bXBEb3duZGxvYWRQYXRoIGlzIG5vdCBleGlzdCA9IFwiICsgdG1wRG93bmRsb2FkUGF0aClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGVtcFBhdGgoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBwYXRoID0gXCJoYWxsX3RlbXBcIlxyXG4gICAgICAgIHJldHVybiBwYXRoXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaG90VXBkYXRlXHJcbiAgICAgKi9cclxuICAgIGhvdFVwZGF0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5fYXNzZXRzTWdyICYmICF0aGlzLl91cGRhdGluZykge1xyXG4gICAgICAgICAgICAvLyB0aGlzLmJhck5vZGUuYWN0aXZlID0gdHJ1ZSA7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihKU09OLnN0cmluZ2lmeSh0aGlzLl9hc3NldHNNZ3IpKVxyXG4gICAgICAgICAgICAvL3RoaXMuc2VuZE5vdGlmaWNhdGlvbihDb25zdC5TSE9XX1BST0dSRVNTX0JBUiwgeyBwYXJtOiAwIH0pXHJcbiAgICAgICAgICAgIHRoaXMuX2Fzc2V0c01nci5zZXRFdmVudENhbGxiYWNrKHRoaXMuX2NiVXBkYXRlLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2Fzc2V0c01nci5nZXRTdGF0ZSgpID09PSBqc2IuQXNzZXRzTWFuYWdlci5TdGF0ZS5VTklOSVRFRCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxNYW5pZmVzdCA9IG5ldyBqc2IuTWFuaWZlc3QoSlNPTi5zdHJpbmdpZnkodGhpcy5sb2NhbE1hbmlmZXN0SnNvbk9iaiksIHRoaXMuX3N0b3JhZ2VQYXRoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXNzZXRzTWdyLmxvYWRMb2NhbE1hbmlmZXN0KHRoaXMubG9jYWxNYW5pZmVzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fYXNzZXRzTWdyLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBmb3JtYXRWZXJzaW9uKClcclxuICAgIHtcclxuICAgICAgICBsZXQgcGF0aCA9IHRoaXMuZ2V0VGVtcFBhdGgoKVxyXG4gICAgICAgIExvZ2dlci5lcnJvcihcImZvcm1hdFZlcnNpb24tLS0tcGF0aC0tXCIgLHBhdGgpXHJcbiAgICAgICAgbGV0IHJlbW90ZVZlcnNpb24gPSB0aGlzLnNlcnZlclZlcnNpb25cclxuICAgICAgICBsZXQgdG1wVmVyc2lvblBhdGggPSBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci51cGRhdGVIZWxwZXIuZ2VuU3RvcmFnZVBhdGgocGF0aCkgKyBcIi9cIiArIEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnZlcnNpb25DZmdGaWxlTmFtZVxyXG4gICAgICAgIGlmKCFqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KHRtcFZlcnNpb25QYXRoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuaJvuS4jeWIsOaWh+S7tlwiLCB0bXBWZXJzaW9uUGF0aCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBqc2IuZmlsZVV0aWxzLmdldFN0cmluZ0Zyb21GaWxlKHRtcFZlcnNpb25QYXRoKTtcclxuICAgICAgICBsZXQgdG1wVmVyc2lvbiA9IEpTT04ucGFyc2UoY29udGVudCk7XHJcbiAgICAgICAgdG1wVmVyc2lvbi5wYWNrYWdlVXJsID0gdGhpcy5zZXJ2ZXJIb3R1cGRhdGVVcmw7XHJcbiAgICAgICAgdG1wVmVyc2lvbi5yZW1vdGVNYW5pZmVzdFVybCA9IHRoaXMuc2VydmVySG90dXBkYXRlVXJsICsgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIucHJvamVjdENmZ0ZpbGVOYW1lXHJcbiAgICAgICAgdG1wVmVyc2lvbi5yZW1vdGVWZXJzaW9uVXJsID0gdGhpcy5zZXJ2ZXJIb3R1cGRhdGVVcmwgKyBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci52ZXJzaW9uQ2ZnRmlsZU5hbWVcclxuICAgICAgICB0bXBWZXJzaW9uLnZlcnNpb24gPSByZW1vdGVWZXJzaW9uO1xyXG5cclxuICAgICAgICBsZXQgbmV3VG1wQ29udGVudCA9IEpTT04uc3RyaW5naWZ5KHRtcFZlcnNpb24pO1xyXG4gICAgICAgIGpzYi5maWxlVXRpbHMud3JpdGVTdHJpbmdUb0ZpbGUobmV3VG1wQ29udGVudCwgdG1wVmVyc2lvblBhdGgpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBmb3JtYXRNYW5pZmVzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIWNjLnN5cy5pc05hdGl2ZSlcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgbGV0IHBhdGggPSB0aGlzLmdldFRlbXBQYXRoKClcclxuICAgIExvZ2dlci5lcnJvcihcImZvcm1hdFZlcnNpb24tLS0tcGF0aC0tXCIgLHBhdGgpXHJcbiAgICBsZXQgcmVtb3RlVmVyc2lvbiA9dGhpcy5zZXJ2ZXJWZXJzaW9uXHJcbiAgICBsZXQgdG1wUHJvamVjdFBhdGggPSBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci51cGRhdGVIZWxwZXIuZ2VuU3RvcmFnZVBhdGgocGF0aCkgKyBcIi9cIiArICBcInByb2plY3QubWFuaWZlc3QudGVtcFwiO1xyXG4gICAgaWYoIWpzYi5maWxlVXRpbHMuaXNGaWxlRXhpc3QodG1wUHJvamVjdFBhdGgpKVxyXG4gICAge1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihcIuaJvuS4jeWIsOaWh+S7tlwiLCB0bXBQcm9qZWN0UGF0aCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IGNvbnRlbnQgPSBqc2IuZmlsZVV0aWxzLmdldFN0cmluZ0Zyb21GaWxlKHRtcFByb2plY3RQYXRoKTtcclxuICAgIGxldCB0bXBNYW5pZmVzdCA9IEpTT04ucGFyc2UoY29udGVudCk7XHJcbiAgICAvL3RtcE1hbmlmZXN0ID0gdGhpcy5yZW1vdmVBcHAodG1wTWFuaWZlc3QpXHJcbiAgIFxyXG4gICAgdG1wTWFuaWZlc3QucGFja2FnZVVybCA9IHRoaXMuc2VydmVySG90dXBkYXRlVXJsO1xyXG4gICAgdG1wTWFuaWZlc3QucmVtb3RlTWFuaWZlc3RVcmwgPSB0aGlzLnNlcnZlckhvdHVwZGF0ZVVybCArIEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnByb2plY3RDZmdGaWxlTmFtZVxyXG4gICAgdG1wTWFuaWZlc3QucmVtb3RlVmVyc2lvblVybCA9IHRoaXMuc2VydmVySG90dXBkYXRlVXJsICsgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIudmVyc2lvbkNmZ0ZpbGVOYW1lXHJcbiAgICB0bXBNYW5pZmVzdC52ZXJzaW9uID0gcmVtb3RlVmVyc2lvbjtcclxuICAgIHRoaXMudG90YWxBc3NldEJ5dGUgKz0gdG1wTWFuaWZlc3QudG90YWxTaXplXHJcblxyXG4gICAgICAgIGxldCBuZXdUbXBDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkodG1wTWFuaWZlc3QpO1xyXG4gICAgICAgIGpzYi5maWxlVXRpbHMud3JpdGVTdHJpbmdUb0ZpbGUobmV3VG1wQ29udGVudCwgdG1wUHJvamVjdFBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogX2NiVXBkYXRlIC0g5pu05paw55qE5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIF9jYlVwZGF0ZShldmVudCkge1xyXG4gICAgICAgIHZhciBuZWVkUmVzdGFydFJpZ2h0Tm93ID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGZhaWxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBjdXJyZW50VXBkYXRlRmluaXNoID0gZmFsc2VcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmdldEV2ZW50Q29kZSgpKSB7XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5VUERBVEVfUFJPR1JFU1NJT046XHJcbiAgICAgICAgICAgICAgICBsZXQgcGVyY2VudE51bSA9IGV2ZW50LmdldFBlcmNlbnQoKVxyXG4gICAgICAgICAgICAgICAgaWYgKCAhcGVyY2VudE51bSB8fCBwZXJjZW50TnVtIDwgMC4wMDAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudE51bSA9IDAuMDAwMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy51cGRhdGVDb3VudD4wKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnROdW0gPSBwZXJjZW50TnVtL3RoaXMudXBkYXRlQ291bnQgKyB0aGlzLnVwZGF0ZUZpbmlzaGVkU3ViQ291bnQvdGhpcy51cGRhdGVDb3VudFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKENvbnN0LlNIT1dfUFJPR1JFU1NfQkFSLCB7IHBhcm06cGVyY2VudE51bSB9KVxyXG4gICAgICAgICAgICAgICAgbGV0IHBlciA9IChwZXJjZW50TnVtICogMTAwKS50b0ZpeGVkKDIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGV2ZW50ICYmIGV2ZW50LmdldE1lc3NhZ2UoKSA9PSBcIlByb2plY3REb3dubG9hZGVkXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtYXRNYW5pZmVzdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9ldmVudC5nZXREb3dubG9hZGVkRmlsZXMoKSArICcgLyAnICsgZXZlbnQuZ2V0VG90YWxGaWxlcygpIFxyXG4gICAgICAgICAgICAgICAgLy8gbGV0IHBlciA9IChldmVudC5nZXREb3dubG9hZGVkQnl0ZXMoKSApICsgXCIgLyBcIisgZXZlbnQuZ2V0VG90YWxCeXRlcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKENvbnN0LlNIT1dfUFJPR1JFU1NfTEFCRUwsIHsgcGFybTogcGFyc2VJbnQocGVyKSArIFwiJVwiIH0pXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuVVBEQVRFX0ZJTklTSEVEOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKENvbnN0LlNIT1dfUFJPR1JFU1NfTEFCRUwsIHsgcGFybTogXCIxMDAlXCIgfSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihDb25zdC5TSE9XX0NIRUNLX0xBQkVMLCB7IHBhcm06ICfmm7TmlrDlrozmiJAnICsgZXZlbnQuZ2V0TWVzc2FnZSgpIH0pXHJcbiAgICAgICAgICAgICAgICBuZWVkUmVzdGFydFJpZ2h0Tm93ID0gdHJ1ZTsgLy8g5pyA5ZCO5LiA5Liq5YyF5LiL6L295a6M5oiQ5YaN6YeN5ZCvXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50VXBkYXRlRmluaXNoID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZWVkUmVzdGFydCA9IHRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRmluaXNoZWRTdWJDb3VudCArPSAxXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLkFMUkVBRFlfVVBfVE9fREFURTpcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oQ29uc3QuU0hPV19DSEVDS19MQUJFTCwgeyBwYXJtOiAn5bey57uP5piv5pyA5paw54mIJyB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja05leHQoKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAvL2ZhaWxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLlVQREFURV9GQUlMRUQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcG9ydExvZygwLCBSZXBvcnRUb29sLlJFUE9SVF9UWVBFX0RPV05MT0FEU1VCR0FNRV9GQUlMRUQsZXZlbnQuZ2V0QXNzZXRJZCgpKVxyXG4gICAgICAgICAgICAgICAgLy8gbGV0IHJlcG9ydFBhcmFtMyA9IHtcImdhbWVcIjpcImhhbGxcIixcImV2ZW50Y29kZVwiOmV2ZW50LmdldEV2ZW50Q29kZSgpLFwiZXZlbnRcIjpcInVwZGF0ZVwiLFwiZmFpbGRyZXNcIjpldmVudC5nZXRBc3NldElkKCksXCJ1cmxcIjpHbG9iYWwuU2V0dGluZy5VcmxzLmhhbGxIb3RVcGRhdGVVcmx9XHJcbiAgICAgICAgICAgICAgICAvLyBHbG9iYWwuUmVwb3J0VG9vbC5SZXBvcnRDbGllbnRFcnJvcihSZXBvcnRUb29sLlJFUE9SVF9UWVBFX0hPVF9VUERBVEVfRVJST1IscmVwb3J0UGFyYW0zKVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oQ29uc3QuU0hPV19DSEVDS19MQUJFTCwgeyBwYXJtOiAn5pu05paw5aSx6LSl77yaICcgKyBldmVudC5nZXRNZXNzYWdlKCkgfSlcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5SZXRyeSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmYWlsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5FUlJPUl9VUERBVElORzpcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZhaWxkUmVzID0gZXZlbnQuZ2V0QXNzZXRJZCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IHJlcG9ydFBhcmFtMSA9IHtcImdhbWVcIjpcImhhbGxcIixcImV2ZW50Y29kZVwiOmV2ZW50LmdldEV2ZW50Q29kZSgpLFwiZXZlbnRcIjpcInVwZGF0ZVwiLFwiZmFpbGRyZXNcIjp0aGlzLl9mYWlsZFJlcyxcInVybFwiOkdsb2JhbC5TZXR0aW5nLlVybHMuaGFsbEhvdFVwZGF0ZVVybH1cclxuICAgICAgICAgICAgICAgIC8vIEdsb2JhbC5SZXBvcnRUb29sLlJlcG9ydENsaWVudEVycm9yKFJlcG9ydFRvb2wuUkVQT1JUX1RZUEVfSE9UX1VQREFURV9FUlJPUixyZXBvcnRQYXJhbTEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcG9ydExvZygwLCBSZXBvcnRUb29sLlJFUE9SVF9UWVBFX0RPV05MT0FEU1VCR0FNRV9GQUlMRUQsdGhpcy5fZmFpbGRSZXMpXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnNlbmROb3RpZmljYXRpb24oQ29uc3QuU0hPV19DSEVDS19MQUJFTCwgeyBwYXJtOiAnQXNzZXQgdXBkYXRlIGVycm9yOiAnICsgZXZlbnQuZ2V0QXNzZXRJZCgpICsgJywgJyArIGV2ZW50LmdldE1lc3NhZ2UoKSB9KVxyXG4gICAgICAgICAgICAgICAgZmFpbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuRVJST1JfTk9fTE9DQUxfTUFOSUZFU1Q6XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5FUlJPUl9ET1dOTE9BRF9NQU5JRkVTVDpcclxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLkVSUk9SX1BBUlNFX01BTklGRVNUOlxyXG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuRVJST1JfREVDT01QUkVTUzpcclxuICAgICAgICAgICAgICAgIC8vIGxldCByZXBvcnRQYXJhbTIgPSB7XCJnYW1lXCI6XCJoYWxsXCIsXCJldmVudGNvZGVcIjpldmVudC5nZXRFdmVudENvZGUoKSxcImV2ZW50XCI6XCJ1cGRhdGVcIixcImZhaWxkcmVzXCI6ZXZlbnQuZ2V0QXNzZXRJZCgpLFwidXJsXCI6R2xvYmFsLlNldHRpbmcuVXJscy5oYWxsSG90VXBkYXRlVXJsfVxyXG4gICAgICAgICAgICAgICAgLy8gR2xvYmFsLlJlcG9ydFRvb2wuUmVwb3J0Q2xpZW50RXJyb3IoUmVwb3J0VG9vbC5SRVBPUlRfVFlQRV9IT1RfVVBEQVRFX0VSUk9SLHJlcG9ydFBhcmFtMilcclxuICAgICAgICAgICAgICAgIHRoaXMucmVwb3J0TG9nKDAsIFJlcG9ydFRvb2wuUkVQT1JUX1RZUEVfRE9XTkxPQURTVUJHQU1FX0ZBSUxFRCxldmVudC5nZXRBc3NldElkKCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oQ29uc3QuU0hPV19DSEVDS19MQUJFTCwgeyBwYXJtOiAn5LiL6L295aSx6LSl77yM6K+35qOA5p+l572R57ucJyB9KVxyXG4gICAgICAgICAgICAgICAgbGV0IHVwZGF0ZUNhbGxCYWNrRnVuYyA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN0YXJ0Q2hlY2tVcGRhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi5LiL6L295aSx6LSl77yM6K+35qOA5p+l572R57ucXCIsIHVwZGF0ZUNhbGxCYWNrRnVuYywgdXBkYXRlQ2FsbEJhY2tGdW5jKTtcclxuICAgICAgICAgICAgICAgIGZhaWxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmYWlsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXNzZXRzTWdyLnNldEV2ZW50Q2FsbGJhY2sobnVsbCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJldHJ5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBpZiAoY3VycmVudFVwZGF0ZUZpbmlzaCkgeyAvL+W9k+WJjemYtuauteeDreabtOaYr+WQpuWujOavlVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKENvbnN0LkNMRUFSX0xPQURJTkdfVElNRVIpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5ob3RGYWlsUmVzID0gXCJcIjtcclxuICAgICAgICAgICAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuaG90RmFpbGROdW0gPSAwO1xyXG4gICAgICAgICAgICBsZXQgc2VhcmNoUGF0aHMgPSBqc2IuZmlsZVV0aWxzLmdldFNlYXJjaFBhdGhzKCk7XHJcbiAgICAgICAgICAgIGxldCBuZXdQYXRocyA9IHRoaXMuX2Fzc2V0c01nci5nZXRMb2NhbE1hbmlmZXN0KCkuZ2V0U2VhcmNoUGF0aHMoKTtcclxuICAgICAgICAgICAgR2xvYmFsLlNlYXJjaFBhdGhIZWxwZXIuYWRkUGF0aExpc3QobmV3UGF0aHMpO1xyXG4gICAgICAgICAgICBsZXQgcmV0UGF0aHMgPSBHbG9iYWwuU2VhcmNoUGF0aEhlbHBlci5nZXRTeXN0ZW1TZWFyY2hQYXRoKCk7XHJcbiAgICAgICAgICAgIGxldCBob3RVcGRhdGVNYW5hZ2VyID0gR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXJcclxuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKGhvdFVwZGF0ZU1hbmFnZXIuaG90VXBkYXRlU3RvcmFnZUtleSArIGhvdFVwZGF0ZU1hbmFnZXIuaGFsbEhvdFVwZGF0ZURpck5hbWUsIGhvdFVwZGF0ZU1hbmFnZXIuaGFsbEhvdFVwZGF0ZURpck5hbWUpO1xyXG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0hvdFVwZGF0ZVNlYXJjaFBhdGhzJywgSlNPTi5zdHJpbmdpZnkocmV0UGF0aHMpKTtcclxuICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhcIui/meaYr+W9k+WJjeeahOe8k+WtmOi3r+W+hFwiLHJldFBhdGhzKVxyXG4gICAgICAgICAgICB0aGlzLl9hc3NldHNNZ3Iuc2V0RXZlbnRDYWxsYmFjayhudWxsKTtcclxuICAgICAgICAgICAgdGhpcy5fYXNzZXRzTWdyID0gbnVsbFxyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGluZyA9IGZhbHNlXHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICghbmVlZFJlc3RhcnRSaWdodE5vdykgeyAvL+aYr+WQpueri+WNs+mHjeWQryAg5pyA5ZCO5LiA5Liq54Ot5pu05a6M5q+V5Y2z56uL5Y2z6YeN5ZCvXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTmV4dCgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcG9ydExvZygxLCBSZXBvcnRUb29sLlJFUE9SVF9UWVBFX0RPV05MT0FEU1VCR0FNRV9SRVNVTFQpXHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLnJlbW92ZUtleShIYWxsU3RvcmFnZUtleS5Ib3RVcGRhdGVIb3N0cylcclxuICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImVycm9yUmVTdGFydFRpbWVzXCIsIG51bGwpXHJcbiAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJuZWVkUmVzdGFydFwiLCAxKVxyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbCgpO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLmNsZWFyQWxsVUlQcmVmYWIoKVxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5yZXN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInJlc3RhcnRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlc3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2UucmVtb3ZlS2V5KEhhbGxTdG9yYWdlS2V5LkhvdFVwZGF0ZUhvc3RzKVxyXG5cclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJuZWVkUmVzdGFydFwiLCAxKVxyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BBbGwoKTtcclxuICAgICAgICBHbG9iYWwuVUkuY2xlYXJBbGxVSVByZWZhYigpXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNjLmdhbWUucmVzdGFydCgpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihcInJlc3RhcnRcIik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIHJldHJ5XHJcbiAgICAgKi9cclxuICAgIHJldHJ5KCkge1xyXG4gICAgICAgIC8v5aaC5p6c5LiA5Liq6LWE5rqQ5LiL6L295aSx6LSl6LaF6L+H5LqG5Lik5qyh77yM5bCx5riF6Zmk5LmL5YmN55qE5LiL6L29XHJcbiAgICAgICAgaWYgKEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLmhvdEZhaWxSZXMgPT0gdGhpcy5fZmFpbGRSZXMgJiYgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuaG90RmFpbGROdW0gPj0gMikge1xyXG4gICAgICAgICAgICBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5ob3RGYWlsUmVzID0gXCJcIjtcclxuICAgICAgICAgICAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuaG90RmFpbGROdW0gPSAwO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHVwZGF0ZUNhbGxCYWNrRnVuYyA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdGFydENoZWNrVXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChcIuS4i+i9veWksei0pe+8jOivt+ajgOafpee9kee7nFwiLCB1cGRhdGVDYWxsQmFja0Z1bmMsIHVwZGF0ZUNhbGxCYWNrRnVuYyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuaG90RmFpbGROdW0gPSB0aGlzLl9mYWlsZFJlcztcclxuICAgICAgICAgICAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuaG90RmFpbGROdW0rKztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIF9jYlZlcmlmeVxyXG4gICAgICogXHJcbiAgICAgKiDnlLHkuo7kuIvovb3ov4fnqIvkuK3ku43nhLbmnInlsI/mpoLnjoflj6/og73nlLHkuo7nvZHnu5zljp/lm6DmiJblhbbku5bnvZHnu5zlupPnmoTpl67popjlr7zoh7TkuIvovb3nmoTmlofku7blhoXlrrnmnInpl67popjvvIzmiYDku6XmiJHku6zmj5DkvpvkuobnlKjmiLfmlofku7bmoKHpqozmjqXlj6PvvIzlnKjmlofku7bkuIvovb3lrozmiJDlkI7ng63mm7TmlrDnrqHnkIblmajkvJrosIPnlKjov5nkuKrmjqXlj6PvvIjnlKjmiLflrp7njrDnmoTmg4XlhrXkuIvvvInvvIzlpoLmnpzov5Tlm54gdHJ1ZSDooajnpLrmlofku7bmraPluLjvvIzov5Tlm54gZmFsc2Ug6KGo56S65paH5Lu25pyJ6Zeu6aKYXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgX2NiVmVyaWZ5KHBhdGgsIGFzc2V0KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgLy8gU2V0dXAgdGhlIHZlcmlmaWNhdGlvbiBjYWxsYmFjaywgYnV0IHdlIGRvbid0IGhhdmUgbWQ1IGNoZWNrIGZ1bmN0aW9uIHlldCwgc28gb25seSBwcmludCBzb21lIG1lc3NhZ2VcclxuICAgICAgICAvLyBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmVyaWZpY2F0aW9uIHBhc3NlZCwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZVxyXG4gICAgICAgIC8vIFdoZW4gYXNzZXQgaXMgY29tcHJlc3NlZCwgd2UgZG9uJ3QgbmVlZCB0byBjaGVjayBpdHMgbWQ1LCBiZWNhdXNlIHppcCBmaWxlIGhhdmUgYmVlbiBkZWxldGVkLlxyXG4gICAgICAgIHZhciBjb21wcmVzc2VkID0gYXNzZXQuY29tcHJlc3NlZDtcclxuICAgICAgICAvLyBSZXRyaWV2ZSB0aGUgY29ycmVjdCBtZDUgdmFsdWUuXHJcbiAgICAgICAgdmFyIGV4cGVjdGVkTUQ1ID0gYXNzZXQubWQ1O1xyXG4gICAgICAgIC8vIGFzc2V0LnBhdGggaXMgcmVsYXRpdmUgcGF0aCBhbmQgcGF0aCBpcyBhYnNvbHV0ZS5cclxuICAgICAgICB2YXIgcmVsYXRpdmVQYXRoID0gYXNzZXQucGF0aDtcclxuICAgICAgICAvLyBUaGUgc2l6ZSBvZiBhc3NldCBmaWxlLCBidXQgdGhpcyB2YWx1ZSBjb3VsZCBiZSBhYnNlbnQuXHJcbiAgICAgICAgdmFyIHNpemUgPSBhc3NldC5zaXplO1xyXG4gICAgICAgIGxldCBmaWxlU2l6ZSA9IGpzYi5maWxlVXRpbHMuZ2V0RmlsZVNpemUocGF0aCk7XHJcbiAgICAgICAgaWYgKHNlbGYuY3VycmVudENvbnRleHQgPT0gSG90VXBkYXRlQ29udGV4dC5oYWxsKSB7XHJcbiAgICAgICAgICAgIHNlbGYuaGFsbFRvdGFsU2l6ZSArPSBmaWxlU2l6ZVxyXG4gICAgICAgICAgICBzZWxmLmhhbGxUb3RhbEZpbGVjb3VudCArPSAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHNlbGYuY3VycmVudENvbnRleHQgPT0gSG90VXBkYXRlQ29udGV4dC5tYWluKSB7XHJcbiAgICAgICAgICAgIHNlbGYubWFpblRvdGFsU2l6ZSArPSBmaWxlU2l6ZVxyXG4gICAgICAgICAgICBzZWxmLm1haW5Ub3RhbEZpbGVjb3VudCArPSAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb21wcmVzc2VkKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coKFwiVmVyaWZpY2F0aW9uIHBhc3NlZCA6IFwiICsgcmVsYXRpdmVQYXRoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZpbGVTaXplID09IGFzc2V0LnNpemU7XHJcbiAgICAgICAgICAgIC8vIHZhciBkYXRhID0ganNiLmZpbGVVdGlscy5nZXREYXRhRnJvbUZpbGUocGF0aCk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGlmIChkYXRhID09IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gICAgIC8vIExvZ2dlci5sb2coJ2RhdGEgPT0gbnVsbCBNRDUgdmVyaWZ5IGZhaWwscGF0aCBhOicgKyBwYXRoICsgJyxwYXRoIGI6JyArIGFzc2V0LnBhdGggICsgJyxtZDUgYjonICsgYXNzZXQubWQ1KTtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyB2YXIgY3VyTUQ1ID0gbWQ1KGRhdGEpO1xyXG4gICAgICAgICAgICAvLyBpZiAoY3VyTUQ1ID09IGFzc2V0Lm1kNSkge1xyXG4gICAgICAgICAgICAvLyAgICAgLy8gTG9nZ2VyLmxvZygnTUQ1IHZlcmlmeSBzdWNjZXNzIScpO1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICAvLyBMb2dnZXIubG9nKCdNRDUgdmVyaWZ5IGZhaWwscGF0aCBhOicgKyBwYXRoICsgJyxwYXRoIGI6JyArIGFzc2V0LnBhdGggKyAnLG1kNSBhOicgKyBjdXJNRDUgKyAnLG1kNSBiOicgKyBhc3NldC5tZDUpO1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBuZXh0KCkge1xyXG4gICAgICAgIGlmKHRoaXMubmVlZFJlc3RhcnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJlcnJvclJlU3RhcnRUaW1lc1wiLCBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLnJlcG9ydExvZygxLCBSZXBvcnRUb29sLlJFUE9SVF9UWVBFX0RPV05MT0FEU1VCR0FNRV9SRVNVTFQpXHJcbiAgICAgICAgICAgIHRoaXMucmVzdGFydCgpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuQ2hhbm5lbFV0aWwuZ2V0VXVpZCgpXHJcblx0XHRHbG9iYWwuQ2hhbm5lbFV0aWwuZ2V0RW50cnlUeXBlKClcclxuICAgICAgICBHbG9iYWwuQ2hhbm5lbFV0aWwuZ2V0U2lnblR5cGUoKVxyXG4gICAgICAgIEdsb2JhbC5DaGFubmVsVXRpbC5Qb3N0SW5zdGFsbEFwcCgpXHJcbiAgICAgICAgR2xvYmFsLkNoYW5uZWxVdGlsLmluaXRPcGVuaW5zdGFsbCgpO1xyXG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihDb25zdC5DTEVBUl9MT0FESU5HX1RJTUVSKVxyXG4gICAgICAgIC8vVGVzdEZsaWdodCDljIXkvY7kuo4yMDAwNyDlrqLmiLfnq6/lvLnmm7TmlrDlvLnmoYZcclxuICAgICAgICBsZXQgbmF0aXZlUGxhdGZvcm0gPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLm5hdGl2ZVBsYXRmb3JtXHJcbiAgICAgICAgaWYgKG5hdGl2ZVBsYXRmb3JtID09IFwidGVzdGZsaWdodFwiKXtcclxuICAgICAgICAgICAgbGV0IGFwcF9mb3JjZV90eXBlID0gMFxyXG4gICAgICAgICAgICBHbG9iYWwuQXBwVXBkYXRlSGVscGVyLnNob3dMb2FkaW5nR2FtZVVwZGF0ZVVJKGFwcF9mb3JjZV90eXBlKVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgaWYgKCFHbG9iYWwuQXBwVXBkYXRlSGVscGVyLnN0YXJ0Rm9yY2VVcGRhdGVMb2dpYyh0aGlzLmNoZWNrVmVyc2lvbkRhdGEpKXtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5BcHBVcGRhdGVIZWxwZXIuZ29Ub0xvZ2luKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25SZW1vdmUoKSB7XHJcblxyXG4gICAgfVxyXG5cclxufSJdfQ==