
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/hotUpdate/component/GameHotUpdateComponent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGhvdFVwZGF0ZVxcY29tcG9uZW50XFxHYW1lSG90VXBkYXRlQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFtRDtBQUU3QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFvRCwwQ0FBWTtJQUFoRTtRQUFBLHFFQTJnQkM7UUExZ0JHLFlBQU0sR0FBUSxJQUFJLENBQUM7UUFDbkIsb0JBQWMsR0FBRyxDQUFDLENBQUM7UUFDbkIsa0JBQVksR0FBYSxJQUFJLENBQUM7UUFDOUIsZUFBUyxHQUFXLEVBQUUsQ0FBQztRQUN2QixrQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUMxQixhQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRVosaUJBQVcsR0FBRztZQUNWLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSztZQUNkLE9BQU8sRUFBRSxJQUFJO1NBQ2hCLENBQUE7UUFFRCx5QkFBbUIsR0FBRyxFQUFFLENBQUE7UUFDeEIsMEJBQTBCO1FBQzFCLGVBQVMsR0FBRyxLQUFLLENBQUE7UUFDakIsaUJBQVcsR0FBRyxLQUFLLENBQUE7UUFDbkIsZUFBUyxHQUFHLEtBQUssQ0FBQTtRQUNqQixrQkFBWSxHQUFHLEVBQUUsQ0FBQTtRQUVqQixvQkFBYyxHQUFHLEtBQUssQ0FBQSxDQUFJLElBQUk7UUFDOUIsa0JBQVksR0FBRyxDQUFDLENBQUEsQ0FBUyxNQUFNO1FBQy9CLGtCQUFZLEdBQUcsRUFBRSxDQUFBO1FBRWpCLFNBQUcsR0FBc0IsSUFBSSxDQUFDO1FBRTlCLHFCQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLG9CQUFjLEdBQUcsSUFBSSxDQUFDO1FBSXRCLHVCQUFpQixHQUFVLENBQUMsQ0FBRSxDQUFBLFFBQVE7UUFDdEMsZUFB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QyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxFQUFFO1lBQ3hCLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQzdCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUNwRSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ3RFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFBO1NBQ3hFO0lBQ0wsQ0FBQztJQXpnQmdCLHNCQUFzQjtRQUQxQyxPQUFPO09BQ2Esc0JBQXNCLENBMmdCMUM7SUFBRCw2QkFBQztDQTNnQkQsQUEyZ0JDLENBM2dCbUQsRUFBRSxDQUFDLFNBQVMsR0EyZ0IvRDtrQkEzZ0JvQixzQkFBc0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXBvcnRUb29sIH0gZnJvbSBcIi4uLy4uL3Rvb2wvUmVwb3J0VG9vbFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVIb3RVcGRhdGVDb21wb25lbnQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgX2NvbVVJOiBhbnkgPSBudWxsO1xyXG4gICAgUkVUUllfSU5URVJWQUwgPSAyO1xyXG4gICAgX2Rvd25PdmVyRnVuOiBGdW5jdGlvbiA9IG51bGw7XHJcbiAgICBfZ2FtZVR5cGU6IHN0cmluZyA9ICcnO1xyXG4gICAgX2dhbWVWZXJzaW9uOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgX2lzQmFjayA9IDA7XHJcblxyXG4gICAgbWFuaWZlc3RVcmwgPSB7XHJcbiAgICAgICAgdHlwZTogY2MuQXNzZXQsXHJcbiAgICAgICAgZGVmYXVsdDogbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIF9zdG9yYWdlTWFuaWZlc3RVcmwgPSBcIlwiXHJcbiAgICAvLyBfY3VzdG9tTWFuaWZlc3RTdHIgPSAnJ1xyXG4gICAgX3VwZGF0aW5nID0gZmFsc2VcclxuICAgIF9jaGVja2VkVXBkID0gZmFsc2VcclxuICAgIF9jYW5SZXRyeSA9IGZhbHNlXHJcbiAgICBfc3RvcmFnZVBhdGggPSAnJ1xyXG4gICAgX3JldHJ5VGltZXI6IG51bGxcclxuICAgIG1fZG93bkxvYWRGbGFnID0gZmFsc2UgICAgLy/kuIvovb1cclxuICAgIG1fcmV0cnlDb3VudCA9IDAgICAgICAgICAvL+mHjeivleasoeaVsFxyXG4gICAgbV92ZXJVcmxQYXRoID0gXCJcIlxyXG5cclxuICAgIF9hbToganNiLkFzc2V0c01hbmFnZXIgPSBudWxsO1xyXG5cclxuICAgIF91cGRhdGVMaXN0ZW5lciA9IG51bGw7XHJcbiAgICBfY2hlY2tMaXN0ZW5lciA9IG51bGw7XHJcbiAgICBsb2NhbE1hbmlmZXN0SnNvbk9iajogYW55O1xyXG4gICAgbG9jYWxNYW5pZmVzdDogYW55O1xyXG4gICAgX2dhbWVVcGRhdGVVcmw6IHN0cmluZztcclxuICAgIF9kb3dubG9hZF9wZXJjZW50Om51bWJlciA9IDAgOy8v5b2T5YmN5LiL6L296L+b5bqmXHJcbiAgICBzdGFydFRpbWU6bnVtYmVyID0gMFxyXG4gICAgcmVtb3RlVmVyOnN0cmluZyA9IFwiXCJcclxuICAgIHRvdGFsRmlsZUNvdW50Om51bWJlciA9IDBcclxuICAgIHRvdGFsQnl0ZTpudW1iZXIgPSAwXHJcbiAgICB0b3RhbEFzc2V0Qnl0ZTpudW1iZXIgPSAwXHJcbiAgICBkb3duTG9hZFR5cGU6bnVtYmVyID0gMFxyXG4gICAgdG90YWxWZXJpZnlTaXplID0gMFxyXG5cclxuXHJcbiAgICBpbml0Q2hlY2tVcERhdGUoZ2FtZVR5cGUsIGdhbWVWZXJzaW9uLCBnYW1lVXBkYXRlVXJsLHJlbW90ZVZlcikge1xyXG4gICAgICAgIC8vIHRoaXMuX2Rvd25PdmVyRnVuID0gZnVuO1xyXG4gICAgICAgIHRoaXMuX2dhbWVUeXBlID0gZ2FtZVR5cGU7XHJcbiAgICAgICAgdGhpcy5fZ2FtZVZlcnNpb24gPSBnYW1lVmVyc2lvbjtcclxuICAgICAgICB0aGlzLl9nYW1lVXBkYXRlVXJsID0gZ2FtZVVwZGF0ZVVybDtcclxuICAgICAgICB0aGlzLl9pbml0VXBkRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuX25ld0Fzc2V0TWdyKCk7XHJcbiAgICAgICAgdGhpcy5yZW1vdGVWZXIgPSByZW1vdGVWZXJcclxuICAgICAgICB0aGlzLmRvd25Mb2FkVHlwZSA9IGdhbWVWZXJzaW9uID09IFwiMC4wLjBcIiA/IDAgOiAxXHJcbiAgICAgICAgLy8gdGhpcy5tX2Rvd25Mb2FkRmxhZyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBfaW5pdFVwZERhdGEoKSB7XHJcbiAgICAgICAgbGV0IHVwZGF0ZUhlbHBlciA9IEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnVwZGF0ZUhlbHBlcjtcclxuICAgICAgICBsZXQgdXBkVXJsID0gdXBkYXRlSGVscGVyLmdlblVybCgnJywgdGhpcy5fZ2FtZVR5cGUpICsgXCIvXCIgKyB0aGlzLl9nYW1lVmVyc2lvblxyXG4gICAgICAgIGxldCBwcmpDZmdGaWxlID0gdXBkYXRlSGVscGVyLnByakZpbGVOYW1lKCk7XHJcbiAgICAgICAgbGV0IHZlckNmZ0ZpbGUgPSB1cGRhdGVIZWxwZXIudmVyRmlsZU5hbWUoKTtcclxuICAgICAgICB0aGlzLm1fdmVyVXJsUGF0aCA9IHVwZFVybCArICcvJyArIHZlckNmZ0ZpbGU7XHJcblxyXG4gICAgICAgIHRoaXMuX3N0b3JhZ2VQYXRoID0gdXBkYXRlSGVscGVyLmdlblN0b3JhZ2VQYXRoKHRoaXMuX2dhbWVUeXBlKTtcclxuICAgICAgICB0aGlzLl9zdG9yYWdlTWFuaWZlc3RVcmwgPSB0aGlzLl9zdG9yYWdlUGF0aCArICcvJyArIHByakNmZ0ZpbGU7XHJcblxyXG4gICAgICAgIC8vIExvZ2dlci5sb2coJ3N0b3JhZ2VNYW5pZmVzdFVybCA9PT09PT09PT09PT09JywgdGhpcy5fc3RvcmFnZU1hbmlmZXN0VXJsKVxyXG4gICAgICAgIC8vIExvZ2dlci5sb2coJ+S4i+i9vVVSTD09PT09PT0nICsgdGhpcy5tX3ZlclVybFBhdGgpXHJcblxyXG4gICAgICAgIC8vIHRoaXMuX2N1c3RvbU1hbmlmZXN0U3RyID0gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIC8vICAgICBcInBhY2thZ2VVcmxcIjogdXBkVXJsLFxyXG4gICAgICAgIC8vICAgICBcInJlbW90ZU1hbmlmZXN0VXJsXCI6IHVwZFVybCArIFwiL1wiICsgcHJqQ2ZnRmlsZSxcclxuICAgICAgICAvLyAgICAgXCJyZW1vdGVWZXJzaW9uVXJsXCI6IHVwZFVybCArIFwiL1wiICsgdmVyQ2ZnRmlsZSxcclxuICAgICAgICAvLyAgICAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIixcclxuICAgICAgICAvLyAgICAgXCJhc3NldHNcIjoge30sXHJcbiAgICAgICAgLy8gICAgIFwic2VhcmNoUGF0aHNcIjogW11cclxuICAgICAgICBcclxuICAgICAgICAvLyB9KVxyXG4gICAgICAgIGxldCBjb250ZXh0ID0gdXBkYXRlSGVscGVyLmdlblN0b3JhZ2VQYXRoKHRoaXMuX2dhbWVUeXBlKVxyXG4gICAgICAgIGxldCBmdWxsVXJsID0gIHRoaXMuX2dhbWVVcGRhdGVVcmwgKyBcIi9cIiArIHRoaXMuX2dhbWVWZXJzaW9uICtcIi9cIisgdGhpcy5fZ2FtZVR5cGUgKyBcIi9cIjtcclxuICAgICAgICB0aGlzLmxvY2FsTWFuaWZlc3RKc29uT2JqID0gR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuZ2V0TWFuaWZlc3RPYmooZnVsbFVybCwgY29udGV4dClcclxuICAgICAgICBsZXQganNvblN0ciA9IEpTT04uc3RyaW5naWZ5KHRoaXMubG9jYWxNYW5pZmVzdEpzb25PYmopXHJcbiAgICAgICAgLy8gTG9nZ2VyLmxvZyhcIi0tLS0tLS0tLS1jaGVja1VwZGF0ZSAganNvblN0ciA9PT09PT09PVwiICsganNvblN0cilcclxuICAgICAgICB0aGlzLmxvY2FsTWFuaWZlc3QgPSBuZXcganNiLk1hbmlmZXN0KGpzb25TdHIsIHRoaXMuX3N0b3JhZ2VQYXRoKVxyXG4gICAgICAgIGpzYi5maWxlVXRpbHMud3JpdGVTdHJpbmdUb0ZpbGUoanNvblN0ciwgdGhpcy5fc3RvcmFnZU1hbmlmZXN0VXJsKVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBfbmV3QXNzZXRNZ3Ig5Yid5aeL5YyWXHJcbiAgICAgKiB2ZXJzaW9uQSA6IOW9k+WJjeeJiOacrFxyXG4gICAgICogdmVyc2lvbkIg77ya5pyA5paw54mI5pysXHJcbiAgICAgKi9cclxuICAgIF9uZXdBc3NldE1ncigpIHtcclxuICAgICAgICB2YXIgdmVyc2lvbkNvbXBhcmVIYW5kbGUgPSBmdW5jdGlvbiAodmVyc2lvbkEsIHZlcnNpb25CKSB7XHJcbiAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJKUyDoh6rlrprkuYnniYjmnKzmr5TovoM6IHZlcnNpb24gQSA6IFwiICsgdmVyc2lvbkEgKyAnLCB2ZXJzaW9uIEIgOiAnICsgdmVyc2lvbkIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmVyc2lvbkEgPT09IHZlcnNpb25CID8gMCA6IC0xO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTG9nZ2VyLmxvZygnU3RvcmFnZSBwYXRoIGZvciByZW1vdGUgYXNzZXQgOiAnICsgdGhpcy5fc3RvcmFnZVBhdGgpO1xyXG5cclxuICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkgcmV0dXJuICcnO1xyXG5cclxuICAgICAgICB0aGlzLl9hbSA9IG5ldyBqc2IuQXNzZXRzTWFuYWdlcihcIlwiLCB0aGlzLl9zdG9yYWdlUGF0aCwgdmVyc2lvbkNvbXBhcmVIYW5kbGUpO1xyXG5cclxuICAgICAgICAvLyBpZiAoIWNjLnN5cy5FTkFCTEVfR0NfRk9SX05BVElWRV9PQkpFQ1RTKSB7XHJcbiAgICAgICAgLy8gICAgIC8vdGhpcy5fYW0ucmV0YWluKCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgICB0aGlzLl9hbS5zZXRWZXJpZnlDYWxsYmFjayhmdW5jdGlvbiAocGF0aCwgYXNzZXQpIHtcclxuICAgICAgICAgICAgLy8gTG9nZ2VyLmxvZyhcInNldFZlcmlmeUNhbGxiYWNrXCIpO1xyXG4gICAgICAgICAgICB2YXIgY29tcHJlc3NlZCA9IGFzc2V0LmNvbXByZXNzZWQ7XHJcbiAgICAgICAgICAgIHZhciBleHBlY3RlZE1ENSA9IGFzc2V0Lm1kNTtcclxuICAgICAgICAgICAgdmFyIHJlbGF0aXZlUGF0aCA9IGFzc2V0LnBhdGg7XHJcbiAgICAgICAgICAgIHZhciBzaXplID0gYXNzZXQuc2l6ZTtcclxuICAgICAgICAgICAgbGV0IGZpbGVTaXplID0ganNiLmZpbGVVdGlscy5nZXRGaWxlU2l6ZShwYXRoKTtcclxuICAgICAgICAgICAgc2VsZi50b3RhbEJ5dGUgKz0gZmlsZVNpemVcclxuICAgICAgICAgICAgc2VsZi50b3RhbEZpbGVDb3VudCArPSAxXHJcbiAgICAgICAgICAgIHNlbGYudG90YWxWZXJpZnlTaXplICs9IGFzc2V0LnNpemVcclxuICAgICAgICAgICAgaWYgKGNvbXByZXNzZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIExvZ2dlci5sb2coXCJWZXJpZmljYXRpb24gcGFzc2VkIDogJXMgXCIsIHJlbGF0aXZlUGF0aCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0xvZ2dlci5sb2coXCJmaWxlIHNpemUgPSBcIiwgZmlsZVNpemUsIFwibWFuaWZlc3Qgc2l6ZSA9IFwiLCBhc3NldC5zaXplKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmaWxlU2l6ZSA9PSBhc3NldC5zaXplO1xyXG4gICAgICAgICAgICAgICAgLy8gTG9nZ2VyLmxvZyhcIlZlcmlmaWNhdGlvbiBwYXNzZWQgOiBcIiArIHJlbGF0aXZlUGF0aCArICcgKCcgKyBleHBlY3RlZE1ENSArICcpJyk7XHJcbiAgICAgICAgICAgICAgICAvLyBMb2dnZXIuZXJyb3IocmVsYXRpdmVQYXRoLCBwYXRoLCBqc2IuZmlsZVV0aWxzLmdldEZpbGVTaXplKHBhdGgpLCBKU09OLnN0cmluZ2lmeShhc3NldCkpO1xyXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyB2YXIgZGF0YSA9IGpzYi5maWxlVXRpbHMuZ2V0RGF0YUZyb21GaWxlKHBhdGgpO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKGRhdGEgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIC8vIExvZ2dlci5sb2coJ2RhdGEgPT0gbnVsbCBNRDUgdmVyaWZ5IGZhaWwscGF0aCBhOicgKyBwYXRoICsgJyxwYXRoIGI6JyArIGFzc2V0LnBhdGggKyAnLG1kNSBiOicgKyBhc3NldC5tZDUpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIC8vIHZhciBjdXJNRDUgPSBtZDUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoY3VyTUQ1ID09IGFzc2V0Lm1kNSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIC8vIExvZ2dlci5sb2coJ01ENSB2ZXJpZnkgc3VjY2VzcyEnKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIC8vIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIC8vIExvZ2dlci5sb2coJ01ENSB2ZXJpZnkgZmFpbCxwYXRoIGE6JyArIHBhdGggKyAnLHBhdGggYjonICsgYXNzZXQucGF0aCArICcsbWQ1IGE6JyArIGN1ck1ENSArICcsbWQ1IGI6JyArIGFzc2V0Lm1kNSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChjYy5zeXMub3MgPT09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FtLnNldE1heENvbmN1cnJlbnRUYXNrKDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNoZWNrVmVyc2lvblVwZGF0ZSgpIHtcclxuICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl91cGRhdGluZykge1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKCdjaGVja2luZyBvciB1cGRhdGluZy4uLi4nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF0aGlzLl9nYW1lVXBkYXRlVXJsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlVQREFURV9TVUJfR0FNRV9GQUlMRUQsIHRoaXMuX2dhbWVUeXBlKVxyXG4gICAgICAgICAgICBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5yZW1vdmVIb3RVcGRhdGVHYW1lQ29tcCh0aGlzLl9nYW1lVHlwZSwgdHJ1ZSlcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3VwZGF0aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXHJcbiAgICAgICAgdGhpcy50b3RhbEJ5dGUgPSAwXHJcbiAgICAgICAgdGhpcy50b3RhbEZpbGVDb3VudCA9IDBcclxuICAgICAgICB0aGlzLm1fZG93bkxvYWRGbGFnID0gdHJ1ZVxyXG4gICAgICAgIExvZ2dlci5sb2coJ+WcsOWdgDogJywgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIudXBkYXRlSGVscGVyLmdlblVybCgnJywgdGhpcy5fZ2FtZVR5cGUpICsgXCIvXCIgKyB0aGlzLl9nYW1lVmVyc2lvbilcclxuICAgICAgICAvLyBMb2dnZXIubG9nKCdjaGVja1ZlcnNpb25VcGRhdGUgY3VzdG9tTWFuaWZlc3RTdHIgPT09PT0nICsgdGhpcy5fY3VzdG9tTWFuaWZlc3RTdHIpXHJcbiAgICAgICAgaWYgKHRoaXMuX2FtKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hbS5nZXRTdGF0ZSgpID09PSBqc2IuQXNzZXRzTWFuYWdlci5TdGF0ZS5VTklOSVRFRCkge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKGNjLmxvYWRlci5tZDVQaXBlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5tYW5pZmVzdFVybCA9IGNjLmxvYWRlci5tZDVQaXBlLnRyYW5zZm9ybVVSTCh0aGlzLm1hbmlmZXN0VXJsKTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5sb2NhbE1hbmlmZXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGpzb25TdHIgPSBKU09OLnN0cmluZ2lmeSh0aGlzLmxvY2FsTWFuaWZlc3RKc29uT2JqKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIExvZ2dlci5sb2coXCItLS0tLS0tLS0tY2hlY2tVcGRhdGUgIGpzb25TdHIgPT09PT09PT1cIiArIGpzb25TdHIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhbE1hbmlmZXN0ID0gbmV3IGpzYi5NYW5pZmVzdChqc29uU3RyLCB0aGlzLl9zdG9yYWdlUGF0aClcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hbS5sb2FkTG9jYWxNYW5pZmVzdCh0aGlzLmxvY2FsTWFuaWZlc3QsIHRoaXMuX3N0b3JhZ2VQYXRoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBpZiAoIXRoaXMuX2FtLmdldExvY2FsTWFuaWZlc3QoKSB8fCAhdGhpcy5fYW0uZ2V0TG9jYWxNYW5pZmVzdCgpLmlzTG9hZGVkKCkpIHtcclxuICAgICAgICAgICAgLy8gICAgIExvZ2dlci5sb2coJ0FBQUFBQSBGYWlsZWQgdG8gbG9hZCBsb2NhbCBtYW5pZmVzdCAuLi4nKVxyXG4gICAgICAgICAgICAvLyAgICAgbGV0IG1hbmlmZXN0ID0gbmV3IGpzYi5NYW5pZmVzdCh0aGlzLl9jdXN0b21NYW5pZmVzdFN0ciwgdGhpcy5fc3RvcmFnZVBhdGgpXHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLl9hbS5sb2FkTG9jYWxNYW5pZmVzdChtYW5pZmVzdCwgdGhpcy5fc3RvcmFnZVBhdGgpXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgdGhpcy5fYW0uc2V0RXZlbnRDYWxsYmFjayh0aGlzLl9jaGVja0NiLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIHRoaXMuX2FtLmNoZWNrVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIF9jaGVja0NiKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IG5ld1ZlclRoZXJlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGFscmVhZHlVcEZsYWcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgaXNEb3dubG9hZEZhaWwgPSBmYWxzZTtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmdldEV2ZW50Q29kZSgpKSB7XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5FUlJPUl9OT19MT0NBTF9NQU5JRkVTVDpcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJObyBsb2NhbCBtYW5pZmVzdCBmaWxlIGZvdW5kLCBob3QgdXBkYXRlIHNraXBwZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5FUlJPUl9ET1dOTE9BRF9NQU5JRkVTVDpcclxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLkVSUk9SX1BBUlNFX01BTklGRVNUOlxyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIkZhaWwgdG8gZG93bmxvYWQgbWFuaWZlc3QgZmlsZSwgaG90IHVwZGF0ZSBza2lwcGVkLlwiKTtcclxuICAgICAgICAgICAgICAgIGFscmVhZHlVcEZsYWcgPSB0cnVlOyAvL+S9v+eUqOW9k+WJjeeJiOacrFxyXG4gICAgICAgICAgICAgICAgaXNEb3dubG9hZEZhaWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5VUERBVEVfUFJPR1JFU1NJT046XHJcbiAgICAgICAgICAgICAgICBpZihldmVudCAmJiBldmVudC5nZXRNZXNzYWdlKCkgPT0gXCJWZXJzaW9uRG93bmxvYWRlZFwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybWF0VmVyc2lvbigpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoZXZlbnQgJiYgZXZlbnQuZ2V0TWVzc2FnZSgpID09IFwiUHJvamVjdERvd25sb2FkZWRcIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1hdE1hbmlmZXN0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5BTFJFQURZX1VQX1RPX0RBVEU6XHJcbiAgICAgICAgICAgICAgICBhbHJlYWR5VXBGbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJBbHJlYWR5IHVwIHRvIGRhdGUgd2l0aCB0aGUgbGF0ZXN0IHJlbW90ZSB2ZXJzaW9uLlwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuTkVXX1ZFUlNJT05fRk9VTkQ6XHJcbiAgICAgICAgICAgICAgICBuZXdWZXJUaGVyZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLlVQREFURV9GSU5JU0hFRDpcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJuZXcgdmVyc2lvbiBmb3VuZCwgYnV0IHRoZXJlIGFyZSBubyBhc3NldHMgY2hhbmdlZCBuZWVkIHRvIGRvd25sb2FkLlwiKVxyXG4gICAgICAgICAgICAgICAgaWYoIHRoaXMuX2FtKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbS5zZXRFdmVudENhbGxiYWNrKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FtID0gbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0aW5nID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBnYW1lSW5mbyA9IEdsb2JhbC5HYW1lRGF0YS5nZXRHYW1lSW5mbyh0aGlzLl9nYW1lVHlwZSlcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKGdhbWVJbmZvLm5hbWUgKyBcIuS4i+i9veaIkOWKnyFcIilcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIudXBkYXRlTmF0aXZlSG90VXBkYXRlVmVyc2lvbih0aGlzLl9nYW1lVHlwZSwgdGhpcy5fZ2FtZVZlcnNpb24pO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlVQREFURV9TVUJfR0FNRV9GSU5JU0gsIHRoaXMuX2dhbWVUeXBlKTtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnJlbW92ZUhvdFVwZGF0ZUdhbWVDb21wKHRoaXMuX2dhbWVUeXBlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZG9HYW1lUmVzdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2FtLnNldEV2ZW50Q2FsbGJhY2sobnVsbCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NoZWNrTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcImNoZWNrID0gXCIsIHRoaXMuX2dhbWVUeXBlKTtcclxuICAgICAgICBsZXQgZ2FtZVR5cGVzID0gR2xvYmFsLkdhbWVEYXRhLmdhbWVUeXBlcztcclxuXHJcbiAgICAgICAgbGV0IHVwZGF0ZUhlbHBlciA9IEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnVwZGF0ZUhlbHBlclxyXG4gICAgICAgIGlmIChhbHJlYWR5VXBGbGFnKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coXCLmm7TmlrDkuIvovb3ov4dcIik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9nYW1lVHlwZSA9PSBnYW1lVHlwZXMuaGFsbCkge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIuWIh+Wkp+WOhVwiKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuX2Rvd25PdmVyRnVuKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwi5YiH5YWl5ri45oiPID1cIiwgdGhpcy5fZ2FtZVR5cGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc0Rvd25sb2FkRmFpbCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5fZG93bk92ZXJGdW4oNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlVQREFURV9TVUJfR0FNRV9GQUlMRUQsIHRoaXMuX2dhbWVUeXBlKVxyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnJlbW92ZUhvdFVwZGF0ZUdhbWVDb21wKHRoaXMuX2dhbWVUeXBlLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1fZG93bkxvYWRGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5fZG93bk92ZXJGdW4oMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIudXBkYXRlTmF0aXZlSG90VXBkYXRlVmVyc2lvbih0aGlzLl9nYW1lVHlwZSwgdGhpcy5fZ2FtZVZlcnNpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlVQREFURV9TVUJfR0FNRV9GSU5JU0gsIHRoaXMuX2dhbWVUeXBlKVxyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnJlbW92ZUhvdFVwZGF0ZUdhbWVDb21wKHRoaXMuX2dhbWVUeXBlLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5ld1ZlclRoZXJlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fZG93bkxvYWRGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9kb3duT3ZlckZ1bigxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRWZXJpb25VcGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZvcm1hdFZlcnNpb24oKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB0bXBWZXJzaW9uUGF0aCA9IEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnVwZGF0ZUhlbHBlci5nZW5TdG9yYWdlUGF0aCh0aGlzLl9nYW1lVHlwZSArIFwiX3RlbXAvXCIpICsgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIudmVyc2lvbkNmZ0ZpbGVOYW1lO1xyXG4gICAgICAgIGlmKCFqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KHRtcFZlcnNpb25QYXRoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuaJvuS4jeWIsOaWh+S7tlwiLCB0bXBWZXJzaW9uUGF0aCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBqc2IuZmlsZVV0aWxzLmdldFN0cmluZ0Zyb21GaWxlKHRtcFZlcnNpb25QYXRoKTtcclxuICAgICAgICBsZXQgdG1wVmVyc2lvbiA9IEpTT04ucGFyc2UoY29udGVudCk7XHJcbiAgICAgICAgbGV0IGZ1bGxVcmwgPSB0aGlzLl9nYW1lVXBkYXRlVXJsICsgXCIvXCIgKyB0aGlzLl9nYW1lVmVyc2lvbiArXCIvXCIrIHRoaXMuX2dhbWVUeXBlICsgXCIvXCI7XHJcbiAgICAgICAgdG1wVmVyc2lvbi5wYWNrYWdlVXJsID0gZnVsbFVybDtcclxuICAgICAgICB0bXBWZXJzaW9uLnJlbW90ZU1hbmlmZXN0VXJsID0gZnVsbFVybCArIEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnByb2plY3RDZmdGaWxlTmFtZVxyXG4gICAgICAgIHRtcFZlcnNpb24ucmVtb3RlVmVyc2lvblVybCA9IGZ1bGxVcmwgKyBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci52ZXJzaW9uQ2ZnRmlsZU5hbWU7XHJcbiAgICAgICAgdG1wVmVyc2lvbi52ZXJzaW9uID0gdGhpcy5yZW1vdGVWZXI7XHJcblxyXG5cclxuICAgICAgICBsZXQgbmV3VG1wQ29udGVudCA9IEpTT04uc3RyaW5naWZ5KHRtcFZlcnNpb24pO1xyXG4gICAgICAgIGpzYi5maWxlVXRpbHMud3JpdGVTdHJpbmdUb0ZpbGUobmV3VG1wQ29udGVudCwgdG1wVmVyc2lvblBhdGgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+a4heeQhuS4jeeUqOeahOi1hOa6kCAgIEB0b2Rv5pu05pawdXJsXHJcbiAgICBwcml2YXRlIGZvcm1hdE1hbmlmZXN0KClcclxuICAgIHtcclxuICAgICAgICBpZighY2Muc3lzLmlzTmF0aXZlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IHRtcFByb2plY3RQYXRoID0gR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIudXBkYXRlSGVscGVyLmdlblN0b3JhZ2VQYXRoKHRoaXMuX2dhbWVUeXBlICsgXCJfdGVtcC9cIikgKyBcInByb2plY3QubWFuaWZlc3QudGVtcFwiO1xyXG4gICAgICAgIGlmKCFqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KHRtcFByb2plY3RQYXRoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuaJvuS4jeWIsOaWh+S7tlwiLCB0bXBQcm9qZWN0UGF0aCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBqc2IuZmlsZVV0aWxzLmdldFN0cmluZ0Zyb21GaWxlKHRtcFByb2plY3RQYXRoKTtcclxuICAgICAgICBsZXQgdG1wTWFuaWZlc3QgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xyXG4gICAgICAgIGxldCBmdWxsVXJsID0gIHRoaXMuX2dhbWVVcGRhdGVVcmwgKyBcIi9cIiArIHRoaXMuX2dhbWVWZXJzaW9uICtcIi9cIisgdGhpcy5fZ2FtZVR5cGUgKyBcIi9cIjtcclxuICAgICAgIFxyXG4gICAgICAgIHRtcE1hbmlmZXN0LnBhY2thZ2VVcmwgPSBmdWxsVXJsO1xyXG4gICAgICAgIHRtcE1hbmlmZXN0LnJlbW90ZU1hbmlmZXN0VXJsID0gZnVsbFVybCArIEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnByb2plY3RDZmdGaWxlTmFtZVxyXG4gICAgICAgIHRtcE1hbmlmZXN0LnJlbW90ZVZlcnNpb25VcmwgPSBmdWxsVXJsICsgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIudmVyc2lvbkNmZ0ZpbGVOYW1lO1xyXG4gICAgICAgIHRtcE1hbmlmZXN0LnZlcnNpb24gPSB0aGlzLnJlbW90ZVZlcjtcclxuICAgICAgICB0aGlzLnRvdGFsQXNzZXRCeXRlID0gdG1wTWFuaWZlc3QudG90YWxTaXplXHJcbiAgICAgICAgbGV0IG5ld1RtcENvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh0bXBNYW5pZmVzdCk7XHJcbiAgICAgICAganNiLmZpbGVVdGlscy53cml0ZVN0cmluZ1RvRmlsZShuZXdUbXBDb250ZW50LCB0bXBQcm9qZWN0UGF0aCk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdGFydFZlcmlvblVwZGF0ZSgpIHtcclxuICAgICAgICBMb2dnZXIubG9nKCdzdGFydFZlcmlvblVwZGF0ZScpO1xyXG4gICAgICAgIGlmICh0aGlzLl9hbSAmJiAhdGhpcy5fdXBkYXRpbmcpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2FtLnNldEV2ZW50Q2FsbGJhY2sodGhpcy5fdXBkYXRlQ2IuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fYW0uZ2V0U3RhdGUoKSA9PT0ganNiLkFzc2V0c01hbmFnZXIuU3RhdGUuVU5JTklURUQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FtLmxvYWRMb2NhbE1hbmlmZXN0KHRoaXMuX3N0b3JhZ2VQYXRoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9hbS51cGRhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coXCItLS0tLS0tLXN0YXJ0VmVyaW9uVXBkYXRlIGZhaWxlZC0tLS0tLVwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF91cGRhdGVDYihldmVudCkge1xyXG4gICAgICAgIHZhciBuZWVkUmVzdGFydCA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBmYWlsZWQgPSBmYWxzZTtcclxuICAgICAgICB2YXIgdXBkYXRlTXNnID0gXCJcIjtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmdldEV2ZW50Q29kZSgpKSB7XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5FUlJPUl9OT19MT0NBTF9NQU5JRkVTVDpcclxuICAgICAgICAgICAgICAgIGxldCByZXBvcnRQYXJhbTAgPSB7XCJnYW1lXCI6XCJnYW1lX1wiK3RoaXMuX2dhbWVUeXBlLFwiZXZlbnRjb2RlXCI6ZXZlbnQuZ2V0RXZlbnRDb2RlKCksXCJldmVudFwiOlwidXBkYXRlXCIsXCJmYWlsZHJlc1wiOmV2ZW50LmdldEFzc2V0SWQoKSxcInVybFwiOnRoaXMuX2dhbWVVcGRhdGVVcmx9XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuUmVwb3J0VG9vbC5SZXBvcnRDbGllbnRFcnJvcihSZXBvcnRUb29sLlJFUE9SVF9UWVBFX0hPVF9VUERBVEVfRVJST1IscmVwb3J0UGFyYW0wKVxyXG4gICAgICAgICAgICAgICAgdXBkYXRlTXNnID0gJ05vIGxvY2FsIG1hbmlmZXN0IGZpbGUgZm91bmQsIGhvdCB1cGRhdGUgc2tpcHBlZC4nO1xyXG4gICAgICAgICAgICAgICAgZmFpbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuVVBEQVRFX1BST0dSRVNTSU9OOlxyXG4gICAgICAgICAgICAgICAgbGV0IHBlciA9IGV2ZW50LmdldFBlcmNlbnQoKTtcclxuICAgICAgICAgICAgICAgIGlmKGV2ZW50ICYmIGV2ZW50LmdldE1lc3NhZ2UoKSA9PSBcIlByb2plY3REb3dubG9hZGVkXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtYXRNYW5pZmVzdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZG93bmxvYWRfcGVyY2VudCA9IHBlclxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlVQREFURV9TVUJfR0FNRV9QRVJDRU5ULCB0aGlzLl9nYW1lVHlwZSwgcGVyKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5FUlJPUl9ET1dOTE9BRF9NQU5JRkVTVDpcclxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLkVSUk9SX1BBUlNFX01BTklGRVNUOlxyXG4gICAgICAgICAgICAgICAgdXBkYXRlTXNnID0gJ0ZhaWwgdG8gZG93bmxvYWQgbWFuaWZlc3QgZmlsZSwgaG90IHVwZGF0ZSBza2lwcGVkLic7XHJcbiAgICAgICAgICAgICAgICBmYWlsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXBvcnRMb2coMCxSZXBvcnRUb29sLlJFUE9SVF9UWVBFX0RPV05MT0FEU1VCR0FNRV9GQUlMRUQsZXZlbnQuZ2V0QXNzZXRJZCgpKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UganNiLkV2ZW50QXNzZXRzTWFuYWdlci5BTFJFQURZX1VQX1RPX0RBVEU6XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVNc2cgPSAnQWxyZWFkeSB1cCB0byBkYXRlIHdpdGggdGhlIGxhdGVzdCByZW1vdGUgdmVyc2lvbi4nO1xyXG4gICAgICAgICAgICAgICAgZmFpbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuVVBEQVRFX0ZJTklTSEVEOlxyXG4gICAgICAgICAgICAgICAgdXBkYXRlTXNnID0gJ1VwZGF0ZSBmaW5pc2hlZC4gJyArIGV2ZW50LmdldE1lc3NhZ2UoKTtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2codXBkYXRlTXNnKTtcclxuICAgICAgICAgICAgICAgIGxldCBnYW1lSW5mbyA9IEdsb2JhbC5HYW1lRGF0YS5nZXRHYW1lSW5mbyh0aGlzLl9nYW1lVHlwZSlcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKGdhbWVJbmZvLm5hbWUgKyBcIuS4i+i9veaIkOWKnyFcIilcclxuICAgICAgICAgICAgICAgIG5lZWRSZXN0YXJ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGpzYi5FdmVudEFzc2V0c01hbmFnZXIuVVBEQVRFX0ZBSUxFRDpcclxuICAgICAgICAgICAgICAgIHVwZGF0ZU1zZyA9ICdVcGRhdGUgZmFpbGVkLiAnICsgZXZlbnQuZ2V0TWVzc2FnZSgpO1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyh1cGRhdGVNc2cpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXBvcnRMb2coMCxSZXBvcnRUb29sLlJFUE9SVF9UWVBFX0RPV05MT0FEU1VCR0FNRV9GQUlMRUQsZXZlbnQuZ2V0QXNzZXRJZCgpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhblJldHJ5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JldHJ5KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLkVSUk9SX1VQREFUSU5HOlxyXG4gICAgICAgICAgICAgICAgdXBkYXRlTXNnID0gJ0Fzc2V0IHVwZGF0ZSBlcnJvcjogJyArIGV2ZW50LmdldEFzc2V0SWQoKSArICcsICcgKyBldmVudC5nZXRNZXNzYWdlKCk7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKHVwZGF0ZU1zZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHJlcG9ydFBhcmFtMyA9IHtcImdhbWVcIjpcImdhbWVfXCIrdGhpcy5fZ2FtZVR5cGUsXCJldmVudGNvZGVcIjpldmVudC5nZXRFdmVudENvZGUoKSxcImV2ZW50XCI6XCJ1cGRhdGVcIixcImZhaWxkcmVzXCI6ZXZlbnQuZ2V0QXNzZXRJZCgpLFwidXJsXCI6dGhpcy5fZ2FtZVVwZGF0ZVVybH1cclxuICAgICAgICAgICAgICAgIEdsb2JhbC5SZXBvcnRUb29sLlJlcG9ydENsaWVudEVycm9yKFJlcG9ydFRvb2wuUkVQT1JUX1RZUEVfSE9UX1VQREFURV9FUlJPUixyZXBvcnRQYXJhbTMpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBqc2IuRXZlbnRBc3NldHNNYW5hZ2VyLkVSUk9SX0RFQ09NUFJFU1M6XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVNc2cgPSBldmVudC5nZXRNZXNzYWdlKCk7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKHVwZGF0ZU1zZyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVwb3J0UGFyYW00ID0ge1wiZ2FtZVwiOlwiZ2FtZV9cIit0aGlzLl9nYW1lVHlwZSxcImV2ZW50Y29kZVwiOmV2ZW50LmdldEV2ZW50Q29kZSgpLFwiZXZlbnRcIjpcInVwZGF0ZVwiLFwiZmFpbGRyZXNcIjpldmVudC5nZXRBc3NldElkKCksXCJ1cmxcIjp0aGlzLl9nYW1lVXBkYXRlVXJsfVxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlJlcG9ydFRvb2wuUmVwb3J0Q2xpZW50RXJyb3IoUmVwb3J0VG9vbC5SRVBPUlRfVFlQRV9IT1RfVVBEQVRFX0VSUk9SLHJlcG9ydFBhcmFtNClcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZmFpbGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FtLnNldEV2ZW50Q2FsbGJhY2sobnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuZ0lzR2FtZURvd25sb2FkaW5nW3RoaXMuX2dhbWVUeXBlXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5yZW1vdmVIb3RVcGRhdGVHYW1lQ29tcCh0aGlzLl9nYW1lVHlwZSwgdHJ1ZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChuZWVkUmVzdGFydCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvR2FtZVJlc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkb0dhbWVSZXN0YXJ0KCl7XHJcbiAgICAgICAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIudXBkYXRlSGVscGVyLmRvd25sb2FkZWQodGhpcy5fZ2FtZVR5cGUpO1xyXG4gICAgICAgIHRoaXMuX2FtLnNldEV2ZW50Q2FsbGJhY2sobnVsbCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlTGlzdGVuZXIgPSBudWxsO1xyXG5cclxuICAgICAgICAvL+mdnuWkp+WOheeahOi/m+WFpea4uOaIj1xyXG4gICAgICAgIGlmICh0aGlzLm1fZG93bkxvYWRGbGFnKSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuX2Rvd25PdmVyRnVuKDMsIHRydWUpO1xyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuVVBEQVRFX1NVQl9HQU1FX0ZJTklTSCwgdGhpcy5fZ2FtZVR5cGUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnVwZGF0ZU5hdGl2ZUhvdFVwZGF0ZVZlcnNpb24odGhpcy5fZ2FtZVR5cGUsIHRoaXMuX2dhbWVWZXJzaW9uKVxyXG4gICAgICAgIEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnJlbW92ZUhvdFVwZGF0ZUdhbWVDb21wKHRoaXMuX2dhbWVUeXBlLCB0cnVlKVxyXG4gICAgICAgIC8v5LiK5oqlUG9zdEluc3RhbGxHYW1lSW5mb1xyXG4gICAgICAgIGlmICh0aGlzLl9nYW1lVHlwZSl7XHJcbiAgICAgICAgICAgIGxldCBnYW1lSW5mbyA9IEdsb2JhbC5HYW1lRGF0YS5nZXRHYW1lSW5mbyh0aGlzLl9nYW1lVHlwZSlcclxuICAgICAgICAgICAgaWYgKGdhbWVJbmZvKXtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJQb3N0SW5zdGFsbEdhbWVJbmZvIGdhbWVfaWQgOiBcIiArIE51bWJlcih0aGlzLl9nYW1lVHlwZSkgKyBcIiBnYW1lX25hbWUgPSBcIiArIGdhbWVJbmZvLm5hbWUgKVxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCxOZXRBcHBmYWNlLlBvc3RJbnN0YWxsR2FtZUluZm8se1wiZ2FtZV9pZFwiOk51bWJlcih0aGlzLl9nYW1lVHlwZSksXCJnYW1lX25hbWVcIjpnYW1lSW5mby5uYW1lfSxudWxsLG51bGwsZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXBvcnRMb2coKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXBvcnRMb2cocmVzdWx0ID0gMSxrZXkgPSBSZXBvcnRUb29sLlJFUE9SVF9UWVBFX0RPV05MT0FEU1VCR0FNRV9SRVNVTFQgLGZhaWxlZFJlcyA9IFwiXCIgKSB7XHJcbiAgICAgICAgbGV0IHRvdGFsVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5zdGFydFRpbWVcclxuICAgICAgICBpZih0aGlzLnRvdGFsQXNzZXRCeXRlICYmIHRoaXMudG90YWxBc3NldEJ5dGUgIT0gdGhpcy50b3RhbEJ5dGUgJiYgcmVzdWx0ID09IDEgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gMlxyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIGlmKCF0aGlzLnRvdGFsQXNzZXRCeXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50b3RhbEFzc2V0Qnl0ZSA9IDBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudG90YWxBc3NldEJ5dGUgPSBOdW1iZXIodGhpcy50b3RhbEFzc2V0Qnl0ZSkgfHwgMFxyXG4gICAgICAgIGxldCByZXBvcnRQYXJhbSA9IHtcclxuICAgICAgICAgICAgXCJyZXN1bHRcIjogcmVzdWx0LFxyXG4gICAgICAgICAgICBcImdhbWVcIjogdGhpcy5fZ2FtZVR5cGUsXHJcbiAgICAgICAgICAgIFwidG90YWxGaWxlQ291bnRcIjogdGhpcy50b3RhbEZpbGVDb3VudCxcclxuICAgICAgICAgICAgXCJ0b3RhbEJ5dGVcIjogdGhpcy50b3RhbEJ5dGUvMTAwMCxcclxuICAgICAgICAgICAgXCJ0b3RhbFRpbWVcIjogdG90YWxUaW1lIC8gMTAwMCxcclxuICAgICAgICAgICAgXCJkb3duTG9hZFR5cGVcIjogdGhpcy5kb3duTG9hZFR5cGUsXHJcbiAgICAgICAgICAgIFwidXBkYXRlVXJsXCI6IHRoaXMuX2dhbWVVcGRhdGVVcmwsXHJcbiAgICAgICAgICAgIFwic3RhcnRWZXJcIjogdGhpcy5fZ2FtZVZlcnNpb24sXHJcbiAgICAgICAgICAgIFwidG90YWxBc3NldHNCeXRlc1wiOiB0aGlzLnRvdGFsQXNzZXRCeXRlLzEwMDAsXHJcbiAgICAgICAgICAgIFwidGFyZ2V0VmVyXCI6IHRoaXMuX2dhbWVWZXJzaW9uLFxyXG4gICAgICAgICAgICBcInJldHJ5VGltZXNcIjogdGhpcy5tX3JldHJ5Q291bnQsXHJcbiAgICAgICAgICAgIFwiZHVuXCI6R2xvYmFsLkR1bkhvdFVwZGF0ZVVybFNldHRpbmcuY3VyRHVuVHlwZSxcclxuICAgICAgICAgICAgXCJ0b3RhbFZlcmlmeUFzc2V0c0J5dGVcIjp0aGlzLnRvdGFsVmVyaWZ5U2l6ZS8xMDAwLFxyXG4gICAgICAgICAgICBcImZhaWxlZFJlc1wiOmZhaWxlZFJlc1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighcmVzdWx0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLlJlcG9ydFRvb2wuUmVwb3J0Q2xpZW50RXJyb3Ioa2V5LCByZXBvcnRQYXJhbSk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuUmVwb3J0VG9vbC5SZXBvcnRQdWJsaWNDbGllbnRMb2coa2V5LCByZXBvcnRQYXJhbSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY291bnRBc3NldFNpemUoY29udGVudClcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBjYy5lcnJvcihcImNvbnRlbnQ9PT09PT09PT09PT09PT09PT09PVwiK0pTT04uc3RyaW5naWZ5KGNvbnRlbnQpKVxyXG4gICAgLy8gICAgIGlmKCFjb250ZW50KVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgcmV0dXJuXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGxldCBzaXplID0gMFxyXG4gICAgLy8gICAgIGZvcihsZXQgb2JqIG9mIGNvbnRlbnQpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBpZihvYmopXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIGNjLmVycm9yKFwib2JqLnNpemU9PT09PT09PT09PT09PT09PT09PVwiKyBvYmouc2l6ZSlcclxuICAgIC8vICAgICAgICAgICAgIGNjLmVycm9yKFwib2JqW3NpemVdPT09PT09PT09PT09PT09PT09PT1cIisgb2JqW1wic2l6ZVwiXSlcclxuICAgIC8vICAgICAgICAgICAgIHNpemUgKz0gb2JqLnNpemVcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICByZXR1cm4gc2l6ZVxyXG5cclxuICAgIC8vIH1cclxuXHJcbiAgICBfcmV0cnkoKSB7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5fdXBkYXRpbmcgJiYgdGhpcy5fY2FuUmV0cnkgJiYgdGhpcy5tX3JldHJ5Q291bnQgPCAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhblJldHJ5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2FtLmRvd25sb2FkRmFpbGVkQXNzZXRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9yZXRyeUNvdW50ID0gdGhpcy5tX3JldHJ5Q291bnQgKyAxO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm1fcmV0cnlDb3VudCA+PSAzKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5oKo5b2T5YmN572R57uc5LiN56iz5a6aXCIpXHJcbiAgICAgICAgICAgIEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnVwZGF0ZUhlbHBlci5jbGVhckRvd25sb2FkZWQodGhpcy5fZ2FtZVR5cGUpXHJcbiAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5VUERBVEVfU1VCX0dBTUVfRkFJTEVELCB0aGlzLl9nYW1lVHlwZSlcclxuICAgICAgICAgICAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIucmVtb3ZlSG90VXBkYXRlR2FtZUNvbXAodGhpcy5fZ2FtZVR5cGUsIHRydWUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSJdfQ==