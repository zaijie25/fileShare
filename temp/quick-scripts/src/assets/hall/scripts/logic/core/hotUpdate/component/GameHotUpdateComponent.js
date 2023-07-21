"use strict";
cc._RF.push(module, '28adayUKX5E4qnT2mKnlaqC', 'GameHotUpdateComponent');
// hall/scripts/logic/core/hotUpdate/component/GameHotUpdateComponent.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReportTool_1 = require("../../tool/ReportTool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameHotUpdateComponent = /** @class */ (function (_super) {
    __extends(GameHotUpdateComponent, _super);
    function GameHotUpdateComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._comUI = null;
        _this.RETRY_INTERVAL = 2;
        _this._downOverFun = null;
        _this._gameType = '';
        _this._gameVersion = "";
        _this._isBack = 0;
        _this.manifestUrl = {
            type: cc.Asset,
            default: null
        };
        _this._storageManifestUrl = "";
        // _customManifestStr = ''
        _this._updating = false;
        _this._checkedUpd = false;
        _this._canRetry = false;
        _this._storagePath = '';
        _this.m_downLoadFlag = false; //下载
        _this.m_retryCount = 0; //重试次数
        _this.m_verUrlPath = "";
        _this._am = null;
        _this._updateListener = null;
        _this._checkListener = null;
        _this._download_percent = 0; //当前下载进度
        _this.startTime = 0;
        _this.remoteVer = "";
        _this.totalFileCount = 0;
        _this.totalByte = 0;
        _this.totalAssetByte = 0;
        _this.downLoadType = 0;
        _this.totalVerifySize = 0;
        return _this;
    }
    GameHotUpdateComponent.prototype.initCheckUpDate = function (gameType, gameVersion, gameUpdateUrl, remoteVer) {
        // this._downOverFun = fun;
        this._gameType = gameType;
        this._gameVersion = gameVersion;
        this._gameUpdateUrl = gameUpdateUrl;
        this._initUpdData();
        this._newAssetMgr();
        this.remoteVer = remoteVer;
        this.downLoadType = gameVersion == "0.0.0" ? 0 : 1;
        // this.m_downLoadFlag = true;
    };
    GameHotUpdateComponent.prototype._initUpdData = function () {
        var updateHelper = Global.HotUpdateManager.updateHelper;
        var updUrl = updateHelper.genUrl('', this._gameType) + "/" + this._gameVersion;
        var prjCfgFile = updateHelper.prjFileName();
        var verCfgFile = updateHelper.verFileName();
        this.m_verUrlPath = updUrl + '/' + verCfgFile;
        this._storagePath = updateHelper.genStoragePath(this._gameType);
        this._storageManifestUrl = this._storagePath + '/' + prjCfgFile;
        // Logger.log('storageManifestUrl =============', this._storageManifestUrl)
        // Logger.log('下载URL=======' + this.m_verUrlPath)
        // this._customManifestStr = JSON.stringify({
        //     "packageUrl": updUrl,
        //     "remoteManifestUrl": updUrl + "/" + prjCfgFile,
        //     "remoteVersionUrl": updUrl + "/" + verCfgFile,
        //     "version": "0.0.1",
        //     "assets": {},
        //     "searchPaths": []
        // })
        var context = updateHelper.genStoragePath(this._gameType);
        var fullUrl = this._gameUpdateUrl + "/" + this._gameVersion + "/" + this._gameType + "/";
        this.localManifestJsonObj = Global.HotUpdateManager.getManifestObj(fullUrl, context);
        var jsonStr = JSON.stringify(this.localManifestJsonObj);
        // Logger.log("----------checkUpdate  jsonStr ========" + jsonStr)
        this.localManifest = new jsb.Manifest(jsonStr, this._storagePath);
        jsb.fileUtils.writeStringToFile(jsonStr, this._storageManifestUrl);
    };
    /**
     * _newAssetMgr 初始化
     * versionA : 当前版本
     * versionB ：最新版本
     */
    GameHotUpdateComponent.prototype._newAssetMgr = function () {
        var versionCompareHandle = function (versionA, versionB) {
            // console.log("JS 自定义版本比较: version A : " + versionA + ', version B : ' + versionB);
            return versionA === versionB ? 0 : -1;
        };
        Logger.log('Storage path for remote asset : ' + this._storagePath);
        if (!cc.sys.isNative)
            return '';
        this._am = new jsb.AssetsManager("", this._storagePath, versionCompareHandle);
        // if (!cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
        //     //this._am.retain();
        // }
        var self = this;
        this._am.setVerifyCallback(function (path, asset) {
            // Logger.log("setVerifyCallback");
            var compressed = asset.compressed;
            var expectedMD5 = asset.md5;
            var relativePath = asset.path;
            var size = asset.size;
            var fileSize = jsb.fileUtils.getFileSize(path);
            self.totalByte += fileSize;
            self.totalFileCount += 1;
            self.totalVerifySize += asset.size;
            if (compressed) {
                // Logger.log("Verification passed : %s ", relativePath);
                return true;
            }
            else {
                //Logger.log("file size = ", fileSize, "manifest size = ", asset.size);
                return fileSize == asset.size;
                // Logger.log("Verification passed : " + relativePath + ' (' + expectedMD5 + ')');
                // Logger.error(relativePath, path, jsb.fileUtils.getFileSize(path), JSON.stringify(asset));
                // return true;
                // var data = jsb.fileUtils.getDataFromFile(path);
                // if (data == null) {
                //     // Logger.log('data == null MD5 verify fail,path a:' + path + ',path b:' + asset.path + ',md5 b:' + asset.md5);
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
        });
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            this._am.setMaxConcurrentTask(2);
        }
    };
    GameHotUpdateComponent.prototype.checkVersionUpdate = function () {
        if (!cc.sys.isNative) {
            return;
        }
        if (this._updating) {
            Logger.log('checking or updating....');
            return;
        }
        if (!this._gameUpdateUrl) {
            Global.Event.event(GlobalEvent.UPDATE_SUB_GAME_FAILED, this._gameType);
            Global.HotUpdateManager.removeHotUpdateGameComp(this._gameType, true);
            return;
        }
        this._updating = true;
        this.startTime = new Date().getTime();
        this.totalByte = 0;
        this.totalFileCount = 0;
        this.m_downLoadFlag = true;
        Logger.log('地址: ', Global.HotUpdateManager.updateHelper.genUrl('', this._gameType) + "/" + this._gameVersion);
        // Logger.log('checkVersionUpdate customManifestStr =====' + this._customManifestStr)
        if (this._am) {
            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                // if (cc.loader.md5Pipe) {
                //     this.manifestUrl = cc.loader.md5Pipe.transformURL(this.manifestUrl);
                // }
                if (!this.localManifest) {
                    var jsonStr = JSON.stringify(this.localManifestJsonObj);
                    // Logger.log("----------checkUpdate  jsonStr ========" + jsonStr)
                    this.localManifest = new jsb.Manifest(jsonStr, this._storagePath);
                }
                this._am.loadLocalManifest(this.localManifest, this._storagePath);
            }
            // if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
            //     Logger.log('AAAAAA Failed to load local manifest ...')
            //     let manifest = new jsb.Manifest(this._customManifestStr, this._storagePath)
            //     this._am.loadLocalManifest(manifest, this._storagePath)
            // }
            this._am.setEventCallback(this._checkCb.bind(this));
            this._am.checkUpdate();
        }
    };
    GameHotUpdateComponent.prototype._checkCb = function (event) {
        var newVerThere = false;
        var alreadyUpFlag = false;
        var isDownloadFail = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                Logger.log("No local manifest file found, hot update skipped.");
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                Logger.log("Fail to download manifest file, hot update skipped.");
                alreadyUpFlag = true; //使用当前版本
                isDownloadFail = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                if (event && event.getMessage() == "VersionDownloaded") {
                    this.formatVersion();
                }
                else if (event && event.getMessage() == "ProjectDownloaded") {
                    this.formatManifest();
                }
                return;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                alreadyUpFlag = true;
                Logger.log("Already up to date with the latest remote version.");
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                newVerThere = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                Logger.log("new version found, but there are no assets changed need to download.");
                if (this._am) {
                    this._am.setEventCallback(null);
                    this._am = null;
                    this._updating = false;
                }
                var gameInfo = Global.GameData.getGameInfo(this._gameType);
                Global.UI.fastTip(gameInfo.name + "下载成功!");
                Global.HotUpdateManager.updateNativeHotUpdateVersion(this._gameType, this._gameVersion);
                Global.Event.event(GlobalEvent.UPDATE_SUB_GAME_FINISH, this._gameType);
                Global.HotUpdateManager.removeHotUpdateGameComp(this._gameType, true);
                this.doGameRestart();
                break;
            default:
                return;
        }
        this._am.setEventCallback(null);
        this._checkListener = null;
        this._updating = false;
        Logger.log("check = ", this._gameType);
        var gameTypes = Global.GameData.gameTypes;
        var updateHelper = Global.HotUpdateManager.updateHelper;
        if (alreadyUpFlag) {
            Logger.log("更新下载过");
            if (this._gameType == gameTypes.hall) {
                Logger.log("切大厅");
                // this._downOverFun();
            }
            else {
                Logger.log("切入游戏 =", this._gameType);
                if (isDownloadFail == true) {
                    // this._downOverFun(4);
                    Global.Event.event(GlobalEvent.UPDATE_SUB_GAME_FAILED, this._gameType);
                    Global.HotUpdateManager.removeHotUpdateGameComp(this._gameType, true);
                    return;
                }
                if (this.m_downLoadFlag) {
                    // this._downOverFun(3);
                    Global.HotUpdateManager.updateNativeHotUpdateVersion(this._gameType, this._gameVersion);
                    Global.Event.event(GlobalEvent.UPDATE_SUB_GAME_FINISH, this._gameType);
                    Global.HotUpdateManager.removeHotUpdateGameComp(this._gameType, true);
                    return;
                }
            }
        }
        if (newVerThere) {
            if (this.m_downLoadFlag) {
                // this._downOverFun(1);
                this.startVerionUpdate();
                return;
            }
        }
    };
    GameHotUpdateComponent.prototype.formatVersion = function () {
        var tmpVersionPath = Global.HotUpdateManager.updateHelper.genStoragePath(this._gameType + "_temp/") + Global.HotUpdateManager.versionCfgFileName;
        if (!jsb.fileUtils.isFileExist(tmpVersionPath)) {
            Logger.error("找不到文件", tmpVersionPath);
            return;
        }
        var content = jsb.fileUtils.getStringFromFile(tmpVersionPath);
        var tmpVersion = JSON.parse(content);
        var fullUrl = this._gameUpdateUrl + "/" + this._gameVersion + "/" + this._gameType + "/";
        tmpVersion.packageUrl = fullUrl;
        tmpVersion.remoteManifestUrl = fullUrl + Global.HotUpdateManager.projectCfgFileName;
        tmpVersion.remoteVersionUrl = fullUrl + Global.HotUpdateManager.versionCfgFileName;
        tmpVersion.version = this.remoteVer;
        var newTmpContent = JSON.stringify(tmpVersion);
        jsb.fileUtils.writeStringToFile(newTmpContent, tmpVersionPath);
    };
    //清理不用的资源   @todo更新url
    GameHotUpdateComponent.prototype.formatManifest = function () {
        if (!cc.sys.isNative)
            return;
        var tmpProjectPath = Global.HotUpdateManager.updateHelper.genStoragePath(this._gameType + "_temp/") + "project.manifest.temp";
        if (!jsb.fileUtils.isFileExist(tmpProjectPath)) {
            Logger.error("找不到文件", tmpProjectPath);
            return;
        }
        var content = jsb.fileUtils.getStringFromFile(tmpProjectPath);
        var tmpManifest = JSON.parse(content);
        var fullUrl = this._gameUpdateUrl + "/" + this._gameVersion + "/" + this._gameType + "/";
        tmpManifest.packageUrl = fullUrl;
        tmpManifest.remoteManifestUrl = fullUrl + Global.HotUpdateManager.projectCfgFileName;
        tmpManifest.remoteVersionUrl = fullUrl + Global.HotUpdateManager.versionCfgFileName;
        tmpManifest.version = this.remoteVer;
        this.totalAssetByte = tmpManifest.totalSize;
        var newTmpContent = JSON.stringify(tmpManifest);
        jsb.fileUtils.writeStringToFile(newTmpContent, tmpProjectPath);
    };
    GameHotUpdateComponent.prototype.startVerionUpdate = function () {
        Logger.log('startVerionUpdate');
        if (this._am && !this._updating) {
            this._am.setEventCallback(this._updateCb.bind(this));
            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                this._am.loadLocalManifest(this._storagePath);
            }
            this._am.update();
            this._updating = true;
        }
        else {
            Logger.log("--------startVerionUpdate failed------");
        }
    };
    GameHotUpdateComponent.prototype._updateCb = function (event) {
        var needRestart = false;
        var failed = false;
        var updateMsg = "";
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                var reportParam0 = { "game": "game_" + this._gameType, "eventcode": event.getEventCode(), "event": "update", "faildres": event.getAssetId(), "url": this._gameUpdateUrl };
                Global.ReportTool.ReportClientError(ReportTool_1.ReportTool.REPORT_TYPE_HOT_UPDATE_ERROR, reportParam0);
                updateMsg = 'No local manifest file found, hot update skipped.';
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                var per = event.getPercent();
                if (event && event.getMessage() == "ProjectDownloaded") {
                    this.formatManifest();
                }
                this._download_percent = per;
                Global.Event.event(GlobalEvent.UPDATE_SUB_GAME_PERCENT, this._gameType, per);
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                updateMsg = 'Fail to download manifest file, hot update skipped.';
                failed = true;
                this.reportLog(0, ReportTool_1.ReportTool.REPORT_TYPE_DOWNLOADSUBGAME_FAILED, event.getAssetId());
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                updateMsg = 'Already up to date with the latest remote version.';
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                updateMsg = 'Update finished. ' + event.getMessage();
                Logger.log(updateMsg);
                var gameInfo = Global.GameData.getGameInfo(this._gameType);
                Global.UI.fastTip(gameInfo.name + "下载成功!");
                needRestart = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                updateMsg = 'Update failed. ' + event.getMessage();
                Logger.log(updateMsg);
                this.reportLog(0, ReportTool_1.ReportTool.REPORT_TYPE_DOWNLOADSUBGAME_FAILED, event.getAssetId());
                this._updating = false;
                this._canRetry = true;
                this._retry();
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                updateMsg = 'Asset update error: ' + event.getAssetId() + ', ' + event.getMessage();
                Logger.log(updateMsg);
                var reportParam3 = { "game": "game_" + this._gameType, "eventcode": event.getEventCode(), "event": "update", "faildres": event.getAssetId(), "url": this._gameUpdateUrl };
                Global.ReportTool.ReportClientError(ReportTool_1.ReportTool.REPORT_TYPE_HOT_UPDATE_ERROR, reportParam3);
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                updateMsg = event.getMessage();
                Logger.log(updateMsg);
                var reportParam4 = { "game": "game_" + this._gameType, "eventcode": event.getEventCode(), "event": "update", "faildres": event.getAssetId(), "url": this._gameUpdateUrl };
                Global.ReportTool.ReportClientError(ReportTool_1.ReportTool.REPORT_TYPE_HOT_UPDATE_ERROR, reportParam4);
                break;
            default:
                break;
        }
        if (failed) {
            this._am.setEventCallback(null);
            this._updateListener = null;
            this._updating = false;
            Global.HotUpdateManager.gIsGameDownloading[this._gameType] = false;
            Global.HotUpdateManager.removeHotUpdateGameComp(this._gameType, true);
        }
        if (needRestart) {
            this.doGameRestart();
        }
    };
    GameHotUpdateComponent.prototype.doGameRestart = function () {
        Global.HotUpdateManager.updateHelper.downloaded(this._gameType);
        this._am.setEventCallback(null);
        this._updateListener = null;
        //非大厅的进入游戏
        if (this.m_downLoadFlag) {
            // this._downOverFun(3, true);
            Global.Event.event(GlobalEvent.UPDATE_SUB_GAME_FINISH, this._gameType);
        }
        Global.HotUpdateManager.updateNativeHotUpdateVersion(this._gameType, this._gameVersion);
        Global.HotUpdateManager.removeHotUpdateGameComp(this._gameType, true);
        //上报PostInstallGameInfo
        if (this._gameType) {
            var gameInfo = Global.GameData.getGameInfo(this._gameType);
            if (gameInfo) {
                Logger.log("PostInstallGameInfo game_id : " + Number(this._gameType) + " game_name = " + gameInfo.name);
                Global.HallServer.send(NetAppface.mod, NetAppface.PostInstallGameInfo, { "game_id": Number(this._gameType), "game_name": gameInfo.name }, null, null, false);
                this.reportLog();
            }
        }
    };
    GameHotUpdateComponent.prototype.reportLog = function (result, key, failedRes) {
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
        var reportParam = {
            "result": result,
            "game": this._gameType,
            "totalFileCount": this.totalFileCount,
            "totalByte": this.totalByte / 1000,
            "totalTime": totalTime / 1000,
            "downLoadType": this.downLoadType,
            "updateUrl": this._gameUpdateUrl,
            "startVer": this._gameVersion,
            "totalAssetsBytes": this.totalAssetByte / 1000,
            "targetVer": this._gameVersion,
            "retryTimes": this.m_retryCount,
            "dun": Global.DunHotUpdateUrlSetting.curDunType,
            "totalVerifyAssetsByte": this.totalVerifySize / 1000,
            "failedRes": failedRes
        };
        if (!result) {
            Global.ReportTool.ReportClientError(key, reportParam);
            return;
        }
        Global.ReportTool.ReportPublicClientLog(key, reportParam);
    };
    // countAssetSize(content)
    // {
    //     cc.error("content===================="+JSON.stringify(content))
    //     if(!content)
    //     {
    //         return
    //     }
    //     let size = 0
    //     for(let obj of content)
    //     {
    //         if(obj)
    //         {
    //             cc.error("obj.size===================="+ obj.size)
    //             cc.error("obj[size]===================="+ obj["size"])
    //             size += obj.size
    //         }
    //     }
    //     return size
    // }
    GameHotUpdateComponent.prototype._retry = function () {
        if (!this._updating && this._canRetry && this.m_retryCount < 3) {
            this._canRetry = false;
            this._am.downloadFailedAssets();
            this.m_retryCount = this.m_retryCount + 1;
            return;
        }
        if (this.m_retryCount >= 3) {
            Global.UI.fastTip("您当前网络不稳定");
            Global.HotUpdateManager.updateHelper.clearDownloaded(this._gameType);
            Global.Event.event(GlobalEvent.UPDATE_SUB_GAME_FAILED, this._gameType);
            Global.HotUpdateManager.removeHotUpdateGameComp(this._gameType, true);
        }
    };
    GameHotUpdateComponent = __decorate([
        ccclass
    ], GameHotUpdateComponent);
    return GameHotUpdateComponent;
}(cc.Component));
exports.default = GameHotUpdateComponent;

cc._RF.pop();