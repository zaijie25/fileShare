
import LoadingFacade from "./LoadingFacade";
import Const from "./LoadingConst";
import { ReportTool } from "../tool/ReportTool";
import HallStorageKey from "../../hallcommon/const/HallStorageKey";
/**
 * 当前热更阶段
 */
export enum HotUpdateContext
{

    none = -1,
    app = 0,
    hall = 1,
    main = 2,
}

// 大厅部分热更
export default class AppHotUpdateProxy extends puremvc.Proxy {
    facade: LoadingFacade;

    localManifestJsonObj: any; // 本地manifest对象
    localManifest: any;

    currentContext:HotUpdateContext // 当前热更阶段
    _currentVersion: string; // 本地当前版本
    _newestVersion: string; // 最新版本
    _storagePath: string;  // 热更存储路径
    _updating: boolean;    // 是否正在热更
    _needUpdate: boolean;  // 是否需要热更
    _assetsMgr: jsb.AssetsManager; 
    totalAssetByte = 0 //manifest上标记的总size
    totalFileCount = 0 //总共下载文件数量
    totalByte = 0 //总共下载文件大小
    startTime = 0 // 开始下载事件
    downLoadType = 0 // 下载类型 0 从零开始下载 1 热更新
    appStartVer = "0.0.0" // app独立包开始热更版本
    hallStyleStartver = "0.0.0" // 大厅风格独立包开始热更版本
    mainBundleStartVer = "0.0.0" // 主包开始热更版本
    startVer = "0.0.0"
    targetVer = "0.0.0"
    targetAppVer = "0.0.0"
    targetHallStyleVer = "0.0.0"
    targetMainBundleVer = "0.0.0"
    hallTotalSize = 0
    mainTotalSize = 0
    hallTotalFilecount = 0
    mainTotalFilecount = 0

    _canRetry: boolean;  //是否重试
    _faildRes: any;      // 失败资源

    projectManifestNativeUrl: string [];

    updateFailTimes = 0
    currentManifestUrl:string // 当前随包资源url

    checkVersionData:any;

    needRestart = false

    loadVersion = false
    isAwait = false

    updateCount = -1
    updateFinishedSubCount = 0

    /**
     * 当前子热更名
     */
    hotUpdateNameObj = {
        "-1":null,
        "0":"app",
        "1":"hall_style",
        "2":"main"
    }


    //服务器返回的热更地址
    private serverHotupdateUrl = ""
    private serverVersion = ""

    static NAME = "AppHotUpdateProxy";

    constructor(manifests:cc.Asset[]) {
        super();
        // Logger.log("----------HotUpdateProxy-------" + manifest.nativeUrl)
        this.proxyName = AppHotUpdateProxy.NAME;
        this.currentContext = HotUpdateContext.none
        this.projectManifestNativeUrl = this.getNativeUrl(manifests);
        this.currentManifestUrl = ""
    }

    /**
     * 
     * @param manifest 组装随包资源文件
     */
    getNativeUrl(manifest:cc.Asset[])
    {
        if(!manifest || manifest.length == 0)
        {
            return null
        }
        let nativeUrls : string[] = []
        for (let index = 0; index < manifest.length; index++) {
            const element = manifest[index];
            nativeUrls.push(manifest[index].nativeUrl)
        }
        return nativeUrls

    }

    reportLog(result = 1,key = ReportTool.REPORT_TYPE_DOWNLOADSUBGAME_RESULT ,failedRes = "" ) {
        let totalTime = new Date().getTime() - this.startTime
        if(this.totalAssetByte && this.totalAssetByte != this.totalByte && result == 1)
        {
            result = 2
        }
        if(!this.totalAssetByte)
        {
            this.totalAssetByte = 0
        }
        this.totalAssetByte = Number(this.totalAssetByte) || 0
        
        let retryTimes = cc.sys.localStorage.getItem("errorReStartTimes")

        retryTimes  = Number(retryTimes) || 0

        this.totalByte = this.hallTotalSize + this.mainTotalSize
        this.totalFileCount = this.hallTotalFilecount + this.mainTotalFilecount
        let reportParam = {
            "result": result,
            "game": 0,
            "totalFileCount": this.totalFileCount,
            "totalByte": this.totalByte/1000,
            "totalTime": totalTime / 1000,
            "downLoadType": this.downLoadType,
            "updateUrl": Global.HotUpdateManager.hotUpdateUrl,
            "startVer": this.startVer,
            "totalAssetsBytes": this.totalAssetByte/1000,
            "targetVer": this.targetVer,
            "appBundleStartVer":this.appStartVer,
            "hallStyleStartVer":this.hallStyleStartver,
            "mainBundleStartVer":this.mainBundleStartVer,
            "targetAppBundlever":Global.Setting.Urls.appVersion,
            "targetHallStyleVer":this.targetHallStyleVer,
            "targeMainBundleVer":this.targetMainBundleVer,
            "retryTimes": Number(retryTimes),
            "appVersion":Global.Setting.SystemInfo.appVersion,
            "dun":Global.DunHotUpdateUrlSetting.curDunType,
            "failedRes":failedRes
        }
        if(!result)
        {
            Global.ReportTool.ReportClientError(key, reportParam);
            return
        }
        Global.ReportTool.ReportPublicClientLog(key, reportParam);
    }

    /**
     * 
     * @param hotUpdateContext 获取当前热更子路径
     */
    getCurrentHotUpdateName(hotUpdateContext:HotUpdateContext)
    {
        if(hotUpdateContext == HotUpdateContext.none)
        {
            return ""
        }

        if(hotUpdateContext != HotUpdateContext.hall )
        {
            return this.hotUpdateNameObj[hotUpdateContext] 
        }
        let path =  "assets/" + Global.customApp.getHallBundleName()
        return path
    }
    /**
     * 获取本地manifest路径
     */
    getLocalHotUpdatePath()
    {
        let rootPath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + Global.HotUpdateManager.hotUpdateDirName + "/" + Global.HotUpdateManager.hallHotUpdateDirName + "/" )
        return rootPath
    }

   
    onRegister() {
        // //初始化system信息
        // Global.Setting.SystemInfo.Version = "1.0.5";
    }
    /**
     * _versionCompare
     */
    _versionCompare(versionA: string, versionB: string) {
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
    }


    preUpdate(hotUpdateUrl: string, version: string,HotUpdatePath: string)
    {
        if (!Global.Setting.isStartHotUpdate) {
            this.next();
            return;
        }
      //  console.log("开始检查更新",hotUpdateUrl,version,HotUpdatePath)
        this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: "检查更新中..." })
        Global.HotUpdateManager.hotUpdateUrl = hotUpdateUrl
        this.serverHotupdateUrl = `${Global.HotUpdateManager.hotUpdateUrl}/${HotUpdatePath}/${version}/main/`;
        let versionUrl = this.serverHotupdateUrl + Global.HotUpdateManager.versionCfgFileName;
        console.log("这是当前开始更新整地址="+versionUrl)
        Global.HotUpdateManager.getGameVersion(versionUrl).then(data=>{
            let nativeVersion = Global.HotUpdateManager.getNativeHotUpdateVersion("hall");
            this.serverVersion = data.version
            console.log("main本地="+nativeVersion+"远程版本="+this.serverVersion)
            if (Global.Toolkit.versionCompare(this.serverVersion, nativeVersion) == 0) {
                console.log("本地版本与服务器版本号一致")
                this.checkNext();
                return;
            }
            Global.UI.show("WndGameUpgrade")
            this._storagePath = this.getLocalHotUpdatePath()
         //   console.log("这是当前原生的地址", this._storagePath)
            this.localManifestJsonObj = Global.HotUpdateManager.getManifestObj(this.serverHotupdateUrl, this.getLocalHotUpdatePath())
          //  console.log("这是当前原生的地址1111111111", JSON.stringify(this.localManifestJsonObj));
            let storageManifestUrl = this._storagePath + '/' + Global.HotUpdateManager.projectCfgFileName;
            jsb.fileUtils.writeStringToFile(JSON.stringify(this.localManifestJsonObj), storageManifestUrl)
            this._assetsMgr = new jsb.AssetsManager("", this._storagePath, this._versionCompare.bind(this))
            this._assetsMgr.setVerifyCallback(this._cbVerify.bind(this))
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                this._assetsMgr.setMaxConcurrentTask(10)
            }
            this.checkUpdate();
        },()=>{
            this.downloadVerFaild(hotUpdateUrl,version,HotUpdatePath)
        })
    }
   

    
    /**
     * 保存文件到本地
     * @param filepath 
     * @param data 
     * @param callback 
     */
    saveVerFileToNative(filepath, data, callback?) {
        let hotUpdatePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + Global.HotUpdateManager.hotUpdateDirName + "/" + Global.HotUpdateManager.hallHotUpdateDirName)
        if(!jsb.fileUtils.isDirectoryExist(hotUpdatePath))
        {
            jsb.fileUtils.createDirectory(hotUpdatePath)
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
    }
    downloadVerFaild(hotUpdateUrl: string, version: string,HotUpdatePath:string) {
        this.updateFailTimes += 1
        let updateCallBackFunc = () => {
            setTimeout(() => {
                this.restartCheckUpdate();
            }, 1000);
        }
        if (this.updateFailTimes > 2) {
            Global.UI.showSingleBox("下载失败，请检查网络",updateCallBackFunc,updateCallBackFunc );
            return
        }
        //发送上报
        let reportParam = { "host": hotUpdateUrl }
        Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_HOTUPDATE_HOST_ERROR, reportParam)


        Global.UI.showSingleBox("下载失败，请检查网络", this.preUpdate.bind(this, hotUpdateUrl, version,HotUpdatePath), this.preUpdate.bind(this, hotUpdateUrl, version,HotUpdatePath));
    }
    
  

    checkUpdate() {
        if (this._updating) {
            this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: "检查更新中..." })
            return;
        }
        if (this._assetsMgr.getState() === jsb.AssetsManager.State.UNINITED) {
            let jsonStr = JSON.stringify(this.localManifestJsonObj)
            this.localManifest = new jsb.Manifest(jsonStr, this._storagePath)
            this._assetsMgr.loadLocalManifest(this.localManifest, this._storagePath);
        }
        // 更换 manifest 路径以后这里会报错
        if (!this._assetsMgr.getLocalManifest() || !this._assetsMgr.getLocalManifest().isLoaded()) {
            this.sendNotification(Const.SHOW_CHECK_LABEL, { parm:"导入文件失败，建议重启游戏或重新下载最新版本" })
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
                //this.sendNotification(Const.SHOW_PROGRESS_BAR, { parm: -1 })
                this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: "已经是最新版" })
                this.next();
                this.updateFinishedSubCount += 1
                return;
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
                //this.sendNotification(Const.SHOW_PROGRESS_BAR, { parm: 0 })
                this._needUpdate = true;
                break;
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                
                // let reportParam = {"game":"hall","eventcode":event.getEventCode(),"event":"checkupdate","url":Global.Setting.Urls.hallHotUpdateUrl}
                // Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_HOT_UPDATE_ERROR,reportParam)
                this.reportLog(0, ReportTool.REPORT_TYPE_DOWNLOADSUBGAME_FAILED)
                this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: "下载失败，请检查网络" })
                let updateCallBackFunc = () => {
                    setTimeout(() => {
                        this.restartCheckUpdate();
                    }, 1000);
                }
                Global.UI.showSingleBox("下载失败，请检查网络", updateCallBackFunc, updateCallBackFunc);
                // this._showRetryPanel( true );
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                this.checkNext();
                this.updateFinishedSubCount += 1
               
                return
            default:
                return;
        }
        this._assetsMgr.setEventCallback(null);
        this._updating = false;
        this.hotUpdate();
    }
    async checkNext() {
        this.sendNotification(Const.CLEAR_LOADING_TIMER)
        if( this._assetsMgr)
        {
            this._assetsMgr.setEventCallback(null);
            this._assetsMgr = null
            this._updating = false
        }
        Global.HotUpdateManager.hotFailRes = "";
        Global.HotUpdateManager.hotFaildNum = 0;
        this.next() 
    }

    restartCheckUpdate(autoRestart = true) {
        Logger.error("restartCheckUpdate")
        if (this._assetsMgr) {
            this._assetsMgr.setEventCallback(null);
            this._updating = false;
            this._assetsMgr = null;
        }
        if (autoRestart) {
            let errorReStartTimes = cc.sys.localStorage.getItem("errorReStartTimes")
                if (errorReStartTimes != null && errorReStartTimes != "") {
                    let num = Number(errorReStartTimes)
                    if (num) {
                        num++;
                    } else {
                        num = 1;
                    }
                    cc.sys.localStorage.setItem("errorReStartTimes", num)
                } else {
                    cc.sys.localStorage.setItem("errorReStartTimes", 1)
                }
            }
            let storage_hall_urls = Global.Setting.storage.getObject(HallStorageKey.HotUpdateHosts)
            if (!storage_hall_urls) {
                Global.Setting.storage.setObject(HallStorageKey.HotUpdateHosts, Global.Setting.Urls.hallHotUpdateUrlArray)
            }
            //发送上报
            let reportParam = { "host": Global.Setting.Urls.hallHotUpdateUrl }
            Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_HOTUPDATE_HOST_ERROR, reportParam)

        this.clearDownloadTmpDir();
        if (autoRestart) {
            this.restartGame()
        } else {
            setTimeout(() => {
                Global.UI.show("WndMessageBox", "修复完成，点击确定将重启游戏...", 0, () => {
                    this.restartGame()
                }, () => {
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
        let pathParam = this.getCurrentHotUpdateName(this.currentContext) 
        let path = cc.js.formatStr("hall/%s/",pathParam)
        Logger.error("clearProjectManifest--pathParam--path--" ,pathParam,path)
        let projectPath = Global.HotUpdateManager.updateHelper.genStoragePath(path) + Global.HotUpdateManager.projectCfgFileName;
            if(jsb.fileUtils.isFileExist(projectPath))
            {
                Logger.error("remove file projectPath is exist = " + projectPath)
                jsb.fileUtils.removeFile(projectPath);
            }else {
                Logger.error("projectPath is not exist = " + projectPath)
            }
    }

    clearDownloadTmpDir(){
        let path = this.getTempPath()
        let tmpDowndloadPath = Global.HotUpdateManager.updateHelper.genStoragePath(path)
        if (jsb.fileUtils.isDirectoryExist(tmpDowndloadPath)){
            Logger.error("remove tmpDowndloadPath  = " + tmpDowndloadPath)
            jsb.fileUtils.removeDirectory(tmpDowndloadPath)
        }else {
            Logger.error("tmpDowndloadPath is not exist = " + tmpDowndloadPath)
        }
    }

    getTempPath()
    {
        let path = "hall_temp"
        return path
    }


    /**
     * hotUpdate
     */
    hotUpdate() {
        if (this._assetsMgr && !this._updating) {
            // this.barNode.active = true ;
            Logger.error(JSON.stringify(this._assetsMgr))
            //this.sendNotification(Const.SHOW_PROGRESS_BAR, { parm: 0 })
            this._assetsMgr.setEventCallback(this._cbUpdate.bind(this));

            if (this._assetsMgr.getState() === jsb.AssetsManager.State.UNINITED) {

                this.localManifest = new jsb.Manifest(JSON.stringify(this.localManifestJsonObj), this._storagePath)
                this._assetsMgr.loadLocalManifest(this.localManifest);
            }
            this._assetsMgr.update();
            this._updating = true;

        }
    }


    private formatVersion()
    {
        let path = this.getTempPath()
        Logger.error("formatVersion----path--" ,path)
        let remoteVersion = this.serverVersion
        let tmpVersionPath = Global.HotUpdateManager.updateHelper.genStoragePath(path) + "/" + Global.HotUpdateManager.versionCfgFileName
        if(!jsb.fileUtils.isFileExist(tmpVersionPath))
        {
            Logger.error("找不到文件", tmpVersionPath);
            return;
        }
        let content = jsb.fileUtils.getStringFromFile(tmpVersionPath);
        let tmpVersion = JSON.parse(content);
        tmpVersion.packageUrl = this.serverHotupdateUrl;
        tmpVersion.remoteManifestUrl = this.serverHotupdateUrl + Global.HotUpdateManager.projectCfgFileName
        tmpVersion.remoteVersionUrl = this.serverHotupdateUrl + Global.HotUpdateManager.versionCfgFileName
        tmpVersion.version = remoteVersion;

        let newTmpContent = JSON.stringify(tmpVersion);
        jsb.fileUtils.writeStringToFile(newTmpContent, tmpVersionPath);
    }



    private formatManifest()
    {
        if(!cc.sys.isNative)
        return;

    let path = this.getTempPath()
    Logger.error("formatVersion----path--" ,path)
    let remoteVersion =this.serverVersion
    let tmpProjectPath = Global.HotUpdateManager.updateHelper.genStoragePath(path) + "/" +  "project.manifest.temp";
    if(!jsb.fileUtils.isFileExist(tmpProjectPath))
    {
        Logger.error("找不到文件", tmpProjectPath);
        return;
    }
    let content = jsb.fileUtils.getStringFromFile(tmpProjectPath);
    let tmpManifest = JSON.parse(content);
    //tmpManifest = this.removeApp(tmpManifest)
   
    tmpManifest.packageUrl = this.serverHotupdateUrl;
    tmpManifest.remoteManifestUrl = this.serverHotupdateUrl + Global.HotUpdateManager.projectCfgFileName
    tmpManifest.remoteVersionUrl = this.serverHotupdateUrl + Global.HotUpdateManager.versionCfgFileName
    tmpManifest.version = remoteVersion;
    this.totalAssetByte += tmpManifest.totalSize

        let newTmpContent = JSON.stringify(tmpManifest);
        jsb.fileUtils.writeStringToFile(newTmpContent, tmpProjectPath);
    }

    /**
     * _cbUpdate - 更新的回调
     */
    _cbUpdate(event) {
        var needRestartRightNow = false;
        var failed = false;
        var currentUpdateFinish = false
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                let percentNum = event.getPercent()
                if ( !percentNum || percentNum < 0.0001) {
                    percentNum = 0.0001
                }
                if(this.updateCount>0)
                {
                    percentNum = percentNum/this.updateCount + this.updateFinishedSubCount/this.updateCount
                }
                this.sendNotification(Const.SHOW_PROGRESS_BAR, { parm:percentNum })
                let per = (percentNum * 100).toFixed(2);

                if(event && event.getMessage() == "ProjectDownloaded")
                {
                    this.formatManifest();
                }
                //event.getDownloadedFiles() + ' / ' + event.getTotalFiles() 
                // let per = (event.getDownloadedBytes() ) + " / "+ event.getTotalBytes();
                this.sendNotification(Const.SHOW_PROGRESS_LABEL, { parm: parseInt(per) + "%" })
                
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                this.sendNotification(Const.SHOW_PROGRESS_LABEL, { parm: "100%" })
                this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: '更新完成' + event.getMessage() })
                needRestartRightNow = true; // 最后一个包下载完成再重启
                currentUpdateFinish = true
                this.needRestart = true
                this.updateFinishedSubCount += 1
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:

                this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: '已经是最新版' })
                this.checkNext()
                return
                //failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                this.reportLog(0, ReportTool.REPORT_TYPE_DOWNLOADSUBGAME_FAILED,event.getAssetId())
                // let reportParam3 = {"game":"hall","eventcode":event.getEventCode(),"event":"update","faildres":event.getAssetId(),"url":Global.Setting.Urls.hallHotUpdateUrl}
                // Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_HOT_UPDATE_ERROR,reportParam3)
                
                this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: '更新失败： ' + event.getMessage() })
                this._updating = false;
                this._canRetry = true;
                failed = true;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                this._faildRes = event.getAssetId();
                // let reportParam1 = {"game":"hall","eventcode":event.getEventCode(),"event":"update","faildres":this._faildRes,"url":Global.Setting.Urls.hallHotUpdateUrl}
                // Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_HOT_UPDATE_ERROR,reportParam1)
                this.reportLog(0, ReportTool.REPORT_TYPE_DOWNLOADSUBGAME_FAILED,this._faildRes)
                // this.sendNotification(Const.SHOW_CHECK_LABEL, { parm: 'Asset update error: ' + event.getAssetId() + ', ' + event.getMessage() })
                failed = true;
                break;
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                // let reportParam2 = {"game":"hall","eventcode":event.getEventCode(),"event":"update","faildres":event.getAssetId(),"url":Global.Setting.Urls.hallHotUpdateUrl}
                // Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_HOT_UPDATE_ERROR,reportParam2)
                this.reportLog(0, ReportTool.REPORT_TYPE_DOWNLOADSUBGAME_FAILED,event.getAssetId())
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
            this._assetsMgr.setEventCallback(null);

            this._updating = false;
            this.retry();
        }
        

        if (currentUpdateFinish) { //当前阶段热更是否完毕

            this.sendNotification(Const.CLEAR_LOADING_TIMER)
            
            Global.HotUpdateManager.hotFailRes = "";
            Global.HotUpdateManager.hotFaildNum = 0;
            let searchPaths = jsb.fileUtils.getSearchPaths();
            let newPaths = this._assetsMgr.getLocalManifest().getSearchPaths();
            Global.SearchPathHelper.addPathList(newPaths);
            let retPaths = Global.SearchPathHelper.getSystemSearchPath();
            let hotUpdateManager = Global.HotUpdateManager
            cc.sys.localStorage.setItem(hotUpdateManager.hotUpdateStorageKey + hotUpdateManager.hallHotUpdateDirName, hotUpdateManager.hallHotUpdateDirName);
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(retPaths));
         //   console.log("这是当前的缓存路径",retPaths)
            this._assetsMgr.setEventCallback(null);
            this._assetsMgr = null
            this._updating = false
           
            if (!needRestartRightNow) { //是否立即重启  最后一个热更完毕即立即重启
                this.checkNext()
            }
            else {
                this.reportLog(1, ReportTool.REPORT_TYPE_DOWNLOADSUBGAME_RESULT)
                Global.Setting.storage.removeKey(HallStorageKey.HotUpdateHosts)
                cc.sys.localStorage.setItem("errorReStartTimes", null)
                cc.sys.localStorage.setItem("needRestart", 1)
                cc.audioEngine.stopAll();
                Global.UI.clearAllUIPrefab()
                setTimeout(() => {
                    cc.game.restart();
                }, 1000);
                Logger.error("restart");
            }
        }

    }

    restart()
    {
        Global.Setting.storage.removeKey(HallStorageKey.HotUpdateHosts)

        cc.sys.localStorage.setItem("needRestart", 1)
        cc.audioEngine.stopAll();
        Global.UI.clearAllUIPrefab()
        setTimeout(() => {
            cc.game.restart();
        }, 1000);
        Logger.error("restart");
    }
    /**
     * retry
     */
    retry() {
        //如果一个资源下载失败超过了两次，就清除之前的下载
        if (Global.HotUpdateManager.hotFailRes == this._faildRes && Global.HotUpdateManager.hotFaildNum >= 2) {
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
        let self = this
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
        let fileSize = jsb.fileUtils.getFileSize(path);
        if (self.currentContext == HotUpdateContext.hall) {
            self.hallTotalSize += fileSize
            self.hallTotalFilecount += 1
        }
        else if (self.currentContext == HotUpdateContext.main) {
            self.mainTotalSize += fileSize
            self.mainTotalFilecount += 1
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

    }
    next() {
        if(this.needRestart)
        {
            cc.sys.localStorage.setItem("errorReStartTimes", null)
            this.reportLog(1, ReportTool.REPORT_TYPE_DOWNLOADSUBGAME_RESULT)
            this.restart()
            return
        }
        Global.ChannelUtil.getUuid()
		Global.ChannelUtil.getEntryType()
        Global.ChannelUtil.getSignType()
        Global.ChannelUtil.PostInstallApp()
        Global.ChannelUtil.initOpeninstall();
        this.sendNotification(Const.CLEAR_LOADING_TIMER)
        //TestFlight 包低于20007 客户端弹更新弹框
        let nativePlatform = Global.Setting.SystemInfo.nativePlatform
        if (nativePlatform == "testflight"){
            let app_force_type = 0
            Global.AppUpdateHelper.showLoadingGameUpdateUI(app_force_type)
        }else {
            if (!Global.AppUpdateHelper.startForceUpdateLogic(this.checkVersionData)){
                Global.AppUpdateHelper.goToLogin();
            }
        }
        
    }

    onRemove() {

    }

}