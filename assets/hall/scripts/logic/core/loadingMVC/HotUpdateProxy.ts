
import LoadingFacade from "./LoadingFacade";
import Const from "./LoadingConst";
import AppHelper from "../tool/AppHelper";
import PreLoadProxy from "./PreLoadProxy";
import { ReportTool } from "../tool/ReportTool";
import HallStorageKey from "../../hallcommon/const/HallStorageKey";


// 大厅部分热更
export default class HotUpdateProxy extends puremvc.Proxy {
    facade: LoadingFacade;

    //hotUpdate
    // manifestUrl: any;
    localManifestJsonObj: any;
    localManifest: any;

    _currentVersion: string;
    _newestVersion: string;
    _storagePath: string;
    _updating: boolean;
    _needUpdate: boolean;
    _assetsMgr: jsb.AssetsManager;

    _canRetry: boolean;
    _faildRes: any;
    _updateListener: any;
    _checkListener: any;
    manifestNativeUrl: any;


    checkVersionData:any;


    //服务器返回的热更地址
    private serverHotupdateUrl = ""
    private serverVersion = ""

    static NAME = "HotUpdateProxy";

    constructor(manifest) {
        super();
        // Logger.log("----------HotUpdateProxy-------" + manifest.nativeUrl)
        this.proxyName = HotUpdateProxy.NAME;
        this.manifestNativeUrl = manifest.nativeUrl;
    }

    onRegister() {
        //初始化system信息
        Global.Setting.SystemInfo.Version = "1.0.5";
    }
    /**
     * _versionCompare
     */
    _versionCompare(versionA: string, versionB: string) {
        // Logger.log("JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
        var vA = versionA.split('.');
        var vB = versionB.split('.');
        this._currentVersion = versionA;
        this._newestVersion = versionB;
        Global.HotUpdateManager.hallNewVersion = versionB
        for (var i = 0; i < vA.length; ++i) {
            var a = parseInt(vA[i]);
            var b = parseInt(vB[i] || "0");
            if (a === b) { continue; }
            else { return a - b; }
        }
        if (vB.length > vA.length) { return -1; }
        else { return 0; }
    }

    check(hotUpdateUrl: string, version: string,isBack = 0,checkVersionData:any = null) {
        // this.checkVersionData = checkVersionData
        if (!cc.sys.isNative) {
            this.next();
            return;
        }
        if (!Global.Setting.isStartHotUpdate) {
            this.next();
            return;
        }
        this.checkVersionData = checkVersionData
        //添加本地版本与服务器版本号一致不走热更逻辑。
        let hallNativeVer = Global.HotUpdateManager.getNativeHotUpdateVersion("hall");
        if (Global.Toolkit.versionCompare(version, hallNativeVer) == 0){
            Logger.log("本地版本与服务器版本号一致")
            this.next();
            return;
        }
        let newHotUpdateUrl = hotUpdateUrl;
        let newVersion = version;
        let hotUpdateManager = Global.HotUpdateManager;
        if (newHotUpdateUrl) {
            Global.HotUpdateManager.hotUpdateUrl = newHotUpdateUrl
        } else {
            newHotUpdateUrl = Global.HotUpdateManager.hotUpdateUrl
        }
        if (newVersion) {
            Global.HotUpdateManager.hallNewVersion = newVersion
        } else {
            newVersion = Global.HotUpdateManager.hallNewVersion
        }

        //服务器热更地址
        this.serverHotupdateUrl = hotUpdateUrl + "/hall/" + version + "/";
        this.serverVersion = version;

        //修改热更新地址
        this.localManifestJsonObj = Global.HotUpdateManager.changeManifestUrl("hall", newVersion, newHotUpdateUrl, this.manifestNativeUrl,isBack)
        this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + hotUpdateManager.hotUpdateDirName + "/" + hotUpdateManager.hallHotUpdateDirName);
        // Logger.log("storagePath=======" + this._storagePath)
        // Logger.log("manifestUrl ======" + this.manifestNativeUrl)
        //修改本地版本文件
        let storageManifestUrl = this._storagePath + '/' + hotUpdateManager.updateHelper.prjFileName();
        //let jsonStr = JSON.stringify(this.localManifestJsonObj)
        

       
        let tmpManifest = this.localManifestJsonObj;
        let assets = tmpManifest.assets;
        let removeList = []
        let appid = Global.Setting.SystemInfo.appID 
        for(let key in assets)
        {
            if(key.indexOf("app/") == 0)
            {
                if(key.indexOf("app/" + appid + "/") < 0)
                {
                    removeList.push(key);
                }
            }
        }
        for(let i = 0; i < removeList.length; i++)
        {
            delete(assets[removeList[i]])
        }
        tmpManifest.assets =  assets
        jsb.fileUtils.writeStringToFile(JSON.stringify(tmpManifest), storageManifestUrl)
        this.localManifestJsonObj = tmpManifest
        this._assetsMgr = new jsb.AssetsManager("", this._storagePath, this._versionCompare.bind(this))

        this._assetsMgr.setVerifyCallback(this._cbVerify)
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            this._assetsMgr.setMaxConcurrentTask(5)
        }
        this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: "检查更新中..." })
        this.checkUpdate();
    }

    checkUpdate() {
        if (this._updating) {
            this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: "检查更新中..." })
            return;
        }
        if (this._assetsMgr.getState() === jsb.AssetsManager.State.UNINITED) {
            // if (cc.loader.md5Pipe) {
            //     this.manifestUrl = cc.loader.md5Pipe.transformURL(this.manifestUrl);
            // }
            let jsonStr = JSON.stringify(this.localManifestJsonObj)
            // Logger.log("----------checkUpdate  jsonStr ========" + jsonStr)
            this.localManifest = new jsb.Manifest(jsonStr, this._storagePath)
            this._assetsMgr.loadLocalManifest(this.localManifest, this._storagePath);
        }
        // 更换 manifest 路径以后这里会报错
        if (!this._assetsMgr.getLocalManifest() || !this._assetsMgr.getLocalManifest().isLoaded()) {
            this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: "导入文件失败，建议重启游戏或重新下载最新版本" })
            return;
        }

        this._assetsMgr.setEventCallback(this._cbCheckUpdate.bind(this));
        this._assetsMgr.checkUpdate();
        this._updating = true;
    }

    /**
     * _cbCheckUpdate
     * 
     * ios10中，在弹出是否允许联网之前，会报：
     * AssetsManagerEx : Fail to download version file, step skipped Code: 1
     */
    _cbCheckUpdate(event) {
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.sendNotification(Const.SHOW_PROGRESS_BAR, { parm: -1 })
                this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: "已经是最新版" })
                this.next();
                break;
                //version Update_progression在new version found之前
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                if(event && event.getMessage() == "VersionDownloaded")
                {
                    Logger.error("VersionDownloaded formatVersion")
                    this.formatVersion();
                }else if(event && event.getMessage() == "ProjectDownloaded")
                {
                    Logger.error("ProjectDownloaded formatManifest")
                    this.formatManifest();
                }
                return;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:

                // ui - bar
                // this._showRetry( false );
                // this.barProgress.progress = 0 ;
                this.sendNotification(Const.SHOW_PROGRESS_BAR, { parm: 0 })
                this._needUpdate = true;
                break;
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                let reportParam = {"game":"hall","eventcode":event.getEventCode(),"event":"checkupdate","url":Global.Setting.Urls.hallHotUpdateUrl}
                Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_HOT_UPDATE_ERROR,reportParam)

                this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: "下载失败，请检查网络" })
                let updateCallBackFunc = () => {
                    setTimeout(() => {
                        this.restartCheckUpdate();
                    }, 1000);
                }
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
    }

    restartCheckUpdate(autoRestart = true) {
        Logger.error("restartCheckUpdate")
        if (this._assetsMgr) {
            this._assetsMgr.setEventCallback(null);
            this._updateListener = null;
            this._updating = false;
            this._assetsMgr = null;
        }
        if(autoRestart){
            let errorReStartTimes = cc.sys.localStorage.getItem("errorReStartTimes")
            if (errorReStartTimes != null && errorReStartTimes != ""){
                let num = Number(errorReStartTimes)
                if (num){
                    num ++;
                }else {
                    num = 1;
                }
                cc.sys.localStorage.setItem("errorReStartTimes",num)
            }else {
                cc.sys.localStorage.setItem("errorReStartTimes",1)
            }
        }
        let storage_hall_urls = Global.Setting.storage.getObject(HallStorageKey.HotUpdateHosts)
        if (!storage_hall_urls){
            Global.Setting.storage.setObject(HallStorageKey.HotUpdateHosts,Global.Setting.Urls.hallHotUpdateUrlArray)
        }
        this.clearProjectManifest();
        
        //发送上报
        let reportParam = {"host":Global.Setting.Urls.hallHotUpdateUrl}
        Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_HOTUPDATE_HOST_ERROR,reportParam)
        
        if (autoRestart){
            this.restartGame()
        }else {
            setTimeout(() => {
                Global.UI.show("WndMessageBox", "修复完成，点击确定将重启游戏.", 0, ()=>{
                    this.restartGame()
                }, ()=>{
                    this.restartGame()
                });
            }, 300);
            
        }
        
    }

    restartGame(){
        Global.UI.clearAllUIPrefab();
        Global.NativeEvent.unzipHallPackage();
        setTimeout(() => {
            cc.game.restart();
        }, 1000);
    }

    clearProjectManifest(){
        let projectPath = Global.HotUpdateManager.updateHelper.genStoragePath("hall/") + "project.manifest";
            if(jsb.fileUtils.isFileExist(projectPath))
            {
                Logger.error("remove file projectPath is exist = " + projectPath)
                jsb.fileUtils.removeFile(projectPath);
            }else {
                Logger.error("projectPath is not exist = " + projectPath)
            }
    }

    clearDownloadTmpDir(){
        let tmpDowndloadPath = Global.HotUpdateManager.updateHelper.genStoragePath("hall_temp")
        if (jsb.fileUtils.isDirectoryExist(tmpDowndloadPath)){
            Logger.error("remove tmpDowndloadPath  = " + tmpDowndloadPath)
            jsb.fileUtils.removeDirectory(tmpDowndloadPath)
        }else {
            Logger.error("tmpDowndloadPath is not exist = " + tmpDowndloadPath)
        }
    }


    /**
     * hotUpdate
     */
    hotUpdate() {
        if (this._assetsMgr && !this._updating) {
            // this.barNode.active = true ;
            this.sendNotification(Const.SHOW_PROGRESS_BAR, { parm: 0 })

            this._assetsMgr.setEventCallback(this._cbUpdate.bind(this));

            if (this._assetsMgr.getState() === jsb.AssetsManager.State.UNINITED) {

                // if (cc.loader.md5Pipe) {
                //     this.manifestUrl = cc.loader.md5Pipe.transformURL(this.manifestUrl);
                // }
                // this._assetsMgr.loadLocalManifest(this.manifestUrl);
                this.localManifest = new jsb.Manifest(JSON.stringify(this.localManifestJsonObj), this._storagePath)
                this._assetsMgr.loadLocalManifest(this.localManifest);
            }

            // this._failCount = 0;
            this._assetsMgr.update();
            this._updating = true;

        }
    }


    private formatVersion()
    {
        let tmpVersionPath = Global.HotUpdateManager.updateHelper.genStoragePath("hall_temp/") + Global.HotUpdateManager.versionCfgFileName;
        if(!jsb.fileUtils.isFileExist(tmpVersionPath))
        {
            Logger.error("找不到文件", tmpVersionPath);
            return;
        }
        let content = jsb.fileUtils.getStringFromFile(tmpVersionPath);
        let tmpVersion = JSON.parse(content);
        tmpVersion.packageUrl = this.serverHotupdateUrl;
        tmpVersion.remoteManifestUrl = this.serverHotupdateUrl + Global.HotUpdateManager.projectCfgFileName
        tmpVersion.remoteVersionUrl = this.serverHotupdateUrl + Global.HotUpdateManager.versionCfgFileName;
        tmpVersion.version = this.serverVersion;

        let newTmpContent = JSON.stringify(tmpVersion);
        jsb.fileUtils.writeStringToFile(newTmpContent, tmpVersionPath);
    }



    //清理不用的资源   @todo更新url
    private formatManifest()
    {
        if(!cc.sys.isNative)
            return;
        let tmpProjectPath = Global.HotUpdateManager.updateHelper.genStoragePath("hall_temp/") + "project.manifest.temp";
        if(!jsb.fileUtils.isFileExist(tmpProjectPath))
        {
            Logger.error("找不到文件", tmpProjectPath);
            return;
        }
        let content = jsb.fileUtils.getStringFromFile(tmpProjectPath);
        let tmpManifest = JSON.parse(content);
        let assets = tmpManifest.assets;
        let removeList = []
        let appid = Global.customApp.getAppID() 
        for(let key in assets)
        {
            if(key.indexOf("app/") == 0)
            {
                
                if(key.indexOf("app/" + appid + "/") < 0)
                {
                    
                    removeList.push(key);
                }
            }
        }
        for(let i = 0; i < removeList.length; i++)
        {
            delete(assets[removeList[i]])
        }

        tmpManifest.packageUrl = this.serverHotupdateUrl;
        tmpManifest.remoteManifestUrl = this.serverHotupdateUrl + Global.HotUpdateManager.projectCfgFileName
        tmpManifest.remoteVersionUrl = this.serverHotupdateUrl + Global.HotUpdateManager.versionCfgFileName;
        tmpManifest.version = this.serverVersion;

        let newTmpContent = JSON.stringify(tmpManifest);
        jsb.fileUtils.writeStringToFile(newTmpContent, tmpProjectPath);
    }

    /**
     * _cbUpdate - 更新的回调
     */
    _cbUpdate(event) {
        var needRestart = false;
        var failed = false;

        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                let percentNum = event.getPercent()
                if (isNaN(percentNum) || percentNum == null || percentNum == undefined) {
                    percentNum = 0.0001
                }
                this.sendNotification(Const.SHOW_PROGRESS_BAR, { parm:percentNum })
                let per = (percentNum * 100).toFixed(2);

                if(event && event.getMessage() == "ProjectDownloaded")
                {
                    this.formatManifest();
                }
                //event.getDownloadedFiles() + ' / ' + event.getTotalFiles() 
                // let per = (event.getDownloadedBytes() ) + " / "+ event.getTotalBytes();
                this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: '已下载: ' + per + "%" })
                
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: '更新完成：' + event.getMessage() })
                needRestart = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:

                this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: '已经是最新版' })
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                let reportParam3 = {"game":"hall","eventcode":event.getEventCode(),"event":"update","faildres":event.getAssetId(),"url":Global.Setting.Urls.hallHotUpdateUrl}
                Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_HOT_UPDATE_ERROR,reportParam3)
                this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: '更新失败： ' + event.getMessage() })
                this._updating = false;
                this._canRetry = true;
                failed = true;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                this._faildRes = event.getAssetId();
                let reportParam1 = {"game":"hall","eventcode":event.getEventCode(),"event":"update","faildres":this._faildRes,"url":Global.Setting.Urls.hallHotUpdateUrl}
                Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_HOT_UPDATE_ERROR,reportParam1)

                // this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: 'Asset update error: ' + event.getAssetId() + ', ' + event.getMessage() })
                failed = true;
                break;
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                let reportParam2 = {"game":"hall","eventcode":event.getEventCode(),"event":"update","faildres":event.getAssetId(),"url":Global.Setting.Urls.hallHotUpdateUrl}
                Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_HOT_UPDATE_ERROR,reportParam2)

                this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: '下载失败，请检查网络' })
                let updateCallBackFunc = () => {
                    setTimeout(() => {
                        this.restartCheckUpdate();
                    }, 1000);
                }
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
            this.sendNotification(Const.CLEAR_LOADING_TIMER)
            cc.sys.localStorage.setItem("errorReStartTimes",null)
            Global.Setting.storage.removeKey(HallStorageKey.HotUpdateHosts)
            this._assetsMgr.setEventCallback(null);
            this._updateListener = null;
            Global.HotUpdateManager.hotFailRes = "";
            Global.HotUpdateManager.hotFaildNum = 0;
            // gLocalData.userInfo.hotFailRes = '';
            // gLocalData.userInfo.hotFaildNum = 0;
            // DataHelper.Instance.saveAllData();

            // Prepend the manifest's search path
            let searchPaths = jsb.fileUtils.getSearchPaths();
            Logger.log('searchPaths ---------' + searchPaths)
            let newPaths = this._assetsMgr.getLocalManifest().getSearchPaths();
            Global.SearchPathHelper.addPathList(newPaths);
            Logger.log('newPaths -------------' + JSON.stringify(newPaths));
            // let tempPaths = searchPaths.concat(newPaths);
            // let retPaths = Global.JSUtil.arrayConcat(searchPaths,newPaths)
            let retPaths = Global.SearchPathHelper.getSystemSearchPath();
            Logger.log('searchPaths new -------------' + retPaths);
            // searchPaths new -------------, "xxx"
            
            // Array.prototype.unshift(searchPaths, newPaths);
            let hotUpdateManager = Global.HotUpdateManager
            cc.sys.localStorage.setItem(hotUpdateManager.hotUpdateStorageKey + hotUpdateManager.hallHotUpdateDirName, hotUpdateManager.hallHotUpdateDirName);
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(retPaths));
            // jsb.fileUtils.setSearchPaths(retPaths);
            cc.sys.localStorage.setItem("needRestart",1) 
            cc.audioEngine.stopAll();
            Global.UI.clearAllUIPrefab()
            setTimeout(() => {
                cc.game.restart();
            }, 1000);
            Logger.error("restart");
        }
    }
    /**
     * retry
     */
    retry() {
        Logger.log("---------retry---------------")
        //如果一个资源下载失败超过了两次，就清除之前的下载
        if (Global.HotUpdateManager.hotFailRes == this._faildRes && Global.HotUpdateManager.hotFaildNum >= 2) {
            if (this._faildRes) {
                // Global.UI.fastTip(this._faildRes)
            }
            Global.HotUpdateManager.hotFailRes = "";
            Global.HotUpdateManager.hotFaildNum = 0;
            
            let updateCallBackFunc = () => {
                setTimeout(() => {
                    this.restartCheckUpdate();
                }, 1000);
            }
            Global.UI.showSingleBox("下载失败，请检查网络", updateCallBackFunc, updateCallBackFunc);
        } else {
            Global.HotUpdateManager.hotFaildNum = this._faildRes;
            Global.HotUpdateManager.hotFaildNum++;
            
        }

    }

    

    /**
     * _cbVerify
     * 
     * 由于下载过程中仍然有小概率可能由于网络原因或其他网络库的问题导致下载的文件内容有问题，所以我们提供了用户文件校验接口，在文件下载完成后热更新管理器会调用这个接口（用户实现的情况下），如果返回 true 表示文件正常，返回 false 表示文件有问题
     * 
     */
    _cbVerify(path, asset) {
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

    }
    next() {
        Logger.log("-------------------enter next")
        //热更完再检测一遍openinstall
        //TestFlight 包低于20007 客户端弹更新弹框
        let nativePlatform = Global.Setting.SystemInfo.nativePlatform
        if (nativePlatform == "testflight" && this.checkIsLower20007Verion()){
            let app_force_type = 0
            Global.AppUpdateHelper.showLoadingGameUpdateUI(app_force_type)
        }else {
            if (!Global.AppUpdateHelper.startForceUpdateLogic(this.checkVersionData)){
                Global.AppUpdateHelper.goToLogin();
            }
        }
        
    }


    //检测是否20007版本引擎
    private checkIsLower20007Verion(){
        if (!cc.sys.isNative){
            return true;
        }
        let nativeAppVersion = Global.Setting.SystemInfo.appVersion
        let isLowEngineVer = false
        let nativeAppVersionNum = Number(nativeAppVersion) || 0;
        if (nativeAppVersionNum < 20007){
            isLowEngineVer = true;
        }
        return isLowEngineVer;
    }

    

    onRemove() {

    }

}