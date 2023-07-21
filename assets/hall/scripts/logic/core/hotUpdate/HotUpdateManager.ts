import UpdateHelper from "./UpdateHelper";
import CCLoaderHelper from "./CCLoaderHelper";
import PBHelper from "./PBHelper";
import GameHotUpdateComponent from "./component/GameHotUpdateComponent";

export default class HotUpdateManager {
    private _hotUpdateUrl = "https://intest.03866.com/client/cocosHotUpdate";//热更新地址
    private _hotUpdateDirName = "gameUpdate";//native 热更新目录
    private _hallHotUpdateDirName = "hall"//大厅热更目录
    private _projectCfgFileName = "project.manifest";
    private _versionCfgFileName = "version.manifest";
    private _hotUpdateStorageKey = "download_";

    public nativeVersions = {};
    public gIsGameDownloading = {};
    public gameChecked = {};
    private currentGame = "";

    public updateHelper: UpdateHelper;
    public ccLoaderHelper: CCLoaderHelper;
    public pbHelper: PBHelper;

    public hallNewVersion = "0.0.0";
    public hallUpdatePath = "";
    private gameHotUpdateList = []; //下载队列

    public hotFailRes: any = null;
    public hotFaildNum = 0;

    constructor() {
        this.updateHelper = new UpdateHelper(this._hotUpdateDirName, this._projectCfgFileName, this._versionCfgFileName, this._hotUpdateStorageKey);
        this.nativeVersions["hall"] = this.getNativeHotUpdateVersion("hall")
    }

    get CurrentGame() {
        return this.currentGame;
    }

    set CurrentGame(gid: string) {
        this.currentGame = gid;
    }

    get hotUpdateUrl() {
        return this._hotUpdateUrl;
    }

    set hotUpdateUrl(url: string) {
        this._hotUpdateUrl = url;
    }

    get hotUpdateDirName() {
        return this._hotUpdateDirName
    }

    get hallHotUpdateDirName() {
        return this._hallHotUpdateDirName;
    }

    get projectCfgFileName() {
        return this._projectCfgFileName;
    }

    get versionCfgFileName() {
        return this._versionCfgFileName;
    }

    get hotUpdateStorageKey() {
        return this._hotUpdateStorageKey;
    }

    checkIsGameDownload(gid) {
        let isDownloaded = this.updateHelper.isDownloaded(gid)
        return isDownloaded
    }

    //检查游戏是否是最新   是否可以直接进入
    checkIsGameNewest(gid) {
        if (!this.checkIsGameDownload(gid))
            return false;
        let nativeVersion = Global.HotUpdateManager.nativeVersions[gid.toString()] || "0.0.0"
        let gameData = Global.GameData.getGameInfo(gid);
        if (gameData == null)
            return false;
        let newVersion = gameData.version;
        if (newVersion == "")
            return false;
        return Global.Toolkit.versionCompare(newVersion, nativeVersion) <= 0
    }


    /**
     * 
     * @param gameid 
     * @param cfgVersion 是否获取cfgVersion cfgversion为后台配置的总版本号，该版本号不是实际的版本号任一子版本修改都将导致该版本号修改，
     * 此版本号checkversion将传给服务器，用于依赖版本判断
     */
    getNativeHotUpdateVersion(gameid, cfgVersion?, projectUrl = "") {
        let nativeUrl = this.getNativeHotUpdatePath(gameid) + "/" + this.projectCfgFileName
        let version = "0.0.0"
        if (!cc.sys.isNative) {
            return version;
        }
        let isExist = jsb.fileUtils.isFileExist(nativeUrl)
        if (isExist) {
            let jsonStr = jsb.fileUtils.getStringFromFile(nativeUrl)
            let jsonData = JSON.parse(jsonStr)
            if (jsonData) {
                if (cfgVersion) {
                    if (jsonData.cfgVersion != null && jsonData.cfgVersion != undefined) {
                        //this.updateNativeHotUpdateVersion(gameid, jsonData.cfgVersion)
                        return jsonData.cfgVersion
                    }
                }
                if (jsonData.version != null && jsonData.version != undefined) {
                    Logger.log("getNativeHotUpdateVersion ---- gameid  " + gameid + " jsonData.version = " + jsonData.version)
                    version = jsonData.version
                    this.updateNativeHotUpdateVersion(gameid, version)
                } else {
                    Logger.log("getNativeHotUpdateVersion ----jsonData.version = null 2 ")
                }
            } else {
                Logger.log("getNativeHotUpdateVersion ----jsonData.version = null 1 ")
            }
            return version
        }
        let projectExist = jsb.fileUtils.isFileExist(projectUrl)
        if (projectExist) {
            let jsonStr = jsb.fileUtils.getStringFromFile(projectUrl)
            let jsonData = JSON.parse(jsonStr)
            if (jsonData) {
                if (cfgVersion) {
                    if (jsonData.cfgVersion != null && jsonData.cfgVersion != undefined) {
                        //this.updateNativeHotUpdateVersion(gameid, jsonData.cfgVersion)
                        return jsonData.cfgVersion
                    } else {
                        return "0.0.0"
                    }
                }
            }
        }
        return version;
    }
    
    getNativeHotUpdatePath(gameid) {
        let gamePath = this.updateHelper.genStoragePath(gameid)
        return gamePath;
    }

    getHotUpdateVersion(gameid,path,fileName) {
        let nativeUrl = path + "/"+fileName
        let version = "0.0.0"
        if (!cc.sys.isNative) {
            return version;
        }
        Logger.error("getHotUpdateVersion--path================",path)
        let isExist = jsb.fileUtils.isFileExist(nativeUrl)
        if (isExist) {
            let jsonStr = jsb.fileUtils.getStringFromFile(nativeUrl)
            let jsonData = JSON.parse(jsonStr)
            if (jsonData) {
                if (jsonData.version != null && jsonData.version != undefined) {
                    Logger.log("getHotUpdateVersion ---- gameid  " + gameid + " jsonData.version = " + jsonData.version)
                    version = jsonData.version
                    //this.updateNativeHotUpdateVersion(gameid, version)
                } else {
                    Logger.log("getHotUpdateVersion ----jsonData.version = null 2 ")
                }
            } else {
                Logger.log("getHotUpdateVersion ----jsonData.version = null 1 ")
            }
        }
        return version;
    }

    getRemoteVesion(gameid,bundleName,newVersion)
    {
        
        let nativeUrl = this.getNativeHotUpdatePath(gameid)  + "/"+ newVersion + ".manifest"
        let version = "0.0.0"
        if (!cc.sys.isNative) {
            return version;
        }
        let isExist = jsb.fileUtils.isFileExist(nativeUrl)
        if (isExist) {
            let jsonStr = jsb.fileUtils.getStringFromFile(nativeUrl)
            let jsonData = JSON.parse(jsonStr)
            if (jsonData) {
                if (jsonData[bundleName] != null && jsonData[bundleName] != undefined && jsonData[bundleName]["version"] != null && jsonData[bundleName]["version"] != undefined) {
                    Logger.log("getRemoteHotUpdateVersion ---- gameid  " + gameid + " jsonData.version = " + jsonData[bundleName]["version"])
                    version = jsonData[bundleName]["version"]
                    //this.updateNativeHotUpdateVersion(gameid, newVersion)
                } else {
                    Logger.log("getRemoteHotUpdateVersion ----jsonData.version = null 2 ")
                }
            } else {
                Logger.log("getRemoteHotUpdateVersion ----jsonData.version = null 1 ")
            }
        }
        return version;
    }


    getRemoteHotUpdateUrl(gameid,bundleName,newVersion,hotUpdateUrl)
    {
        let url = ""
        let nativeUrl = this.getNativeHotUpdatePath(gameid)  + "/"+ newVersion + ".manifest"
        hotUpdateUrl = Global.Toolkit.adjustUrl(hotUpdateUrl)
        //Logger.error("nativeUrl============",nativeUrl)
        if (!cc.sys.isNative) {
            return url;
        }
        let isExist = jsb.fileUtils.isFileExist(nativeUrl)
        if (isExist) {
            let jsonStr = jsb.fileUtils.getStringFromFile(nativeUrl)
            let jsonData = JSON.parse(jsonStr)
            if (jsonData) {
                Logger.error("bundleName----------",bundleName)
                if (jsonData[bundleName] != null && jsonData[bundleName] != undefined && jsonData[bundleName]["path"] != null && jsonData[bundleName]["path"] != undefined) {
                    Logger.log("getRemoteUrl ---- gameid  " + gameid + " jsonData.path = " + jsonData[bundleName]["path"])
                    url = hotUpdateUrl+jsonData[bundleName]["path"] +"/"+ jsonData[bundleName]["version"]
                    this.updateNativeHotUpdateVersion(gameid, newVersion)
                } else {
                    Logger.log("getRemoteHotUpdateUrl ----jsonData[bundleName][path = null 2 ")
                }
            } else {
                Logger.log("getRemoteHotUpdateUrl ----jsonData[bundleName][path = null 1 ")
            }
        }
        //Logger.error("getRemoteHotUpdateUrl==================",url)
        return url;
    }
     //获取远程当前版本号
     getGameVersion = function (wholeurl) {
       // console.log("getGameVersion");
        return new Promise(function (resolve, reject) {
            let xhr = cc.loader.getXMLHttpRequest();
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4){
                    if (xhr.status >= 200 && xhr.status < 300) {
                        let respone = xhr.responseText;
                        let data = JSON.parse(respone);
                     //   console.log("version=", data, data.version);
                        resolve(data);
                    }else{
                        reject()
                    }
                }
            };
            xhr.timeout = 30000;
           // console.log("getGameVersion wholeurl=", wholeurl);
            xhr.open("GET", wholeurl, true);
            xhr.ontimeout = ()=>{reject()}
            xhr.send();
        })
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
    getManifestObj(hotUpdateUrl: string, context:string,) {
        let HotUpdateManager = Global.HotUpdateManager;
        if (hotUpdateUrl == null || hotUpdateUrl == undefined || hotUpdateUrl == "") {
            hotUpdateUrl = HotUpdateManager.hotUpdateUrl
        }
        hotUpdateUrl = Global.Toolkit.adjustUrl(hotUpdateUrl)
        let jsonAssets = {}
        let jasonVersion = "0.0.0";

        let nativeMaifest = context +"/"+ this.projectCfgFileName
        let isNativeManifestExist = jsb.fileUtils.isFileExist(nativeMaifest)

        // Logger.error("nativeMaifest--------------",nativeMaifest)
        if (isNativeManifestExist) {
            let jsonStr = jsb.fileUtils.getStringFromFile(nativeMaifest) //new 标志新热更
            let jsonData = JSON.parse(jsonStr)
            if (jsonData.assets && jsonData.new) {
                jsonAssets = jsonData.assets
            }
            if(jsonData.assets){
                jasonVersion = jsonData.version
            }
        }
       // Logger.error("projectpath=========",ProjectFilePath)
        //Logger.log("changeManifestUrl hotUpdateUrl = " + hotUpdateUrl)
        let localManifestJsonObj = {
            "packageUrl": hotUpdateUrl,
            "remoteManifestUrl": hotUpdateUrl + this.projectCfgFileName,
            "remoteVersionUrl": hotUpdateUrl  + this.versionCfgFileName,
            "version": jasonVersion,
            "assets": jsonAssets,
            "searchPaths": []
        }
      //  console.log("这是当前加载的本地配置文件",JSON.stringify(localManifestJsonObj))
       
        return localManifestJsonObj

    }

    changeLocalUrl(url,param,context,fileName)
    {
        let fullLocalUrl = this.updateHelper.genStoragePath(context) + "/" +fileName
        if(!jsb.fileUtils.isFileExist(fullLocalUrl))
        {
            Logger.error("找不到文件", fullLocalUrl);
            return;
        }
        let content = jsb.fileUtils.getStringFromFile(fullLocalUrl);
        let tmpManifest = JSON.parse(content);
        let index = tmpManifest.remoteManifestUrl.indexOf(param)
        if(index != -1)
        {
            tmpManifest.remoteManifestUrl = url + tmpManifest.remoteManifestUrl.substring(index -1,tmpManifest.remoteManifestUrl.length)
            tmpManifest.packageUrl = url + tmpManifest.packageUrl.substring(index -1,tmpManifest.remoteManifestUrl.length);
            tmpManifest.remoteVersionUrl = url + tmpManifest.remoteVersionUrl.substring(index -1,tmpManifest.remoteManifestUrl.length)
        }
        let newTmpContent = JSON.stringify(tmpManifest);
        jsb.fileUtils.writeStringToFile(newTmpContent, fullLocalUrl);

    }

    updateNativeHotUpdateVersion(gameid, version) {
        if (this.nativeVersions) {
            this.nativeVersions[gameid] = version;
        }
        let gameInfo = Global.GameData.getGameInfo(gameid)
        if (gameInfo) {
            gameInfo.native_version = version;
        }

    }


    getNativeVersionFileUrl(gameid,newVersion)
    {
        if(!newVersion) return
       return Global.HotUpdateManager.getNativeHotUpdatePath(gameid)  + "/"+ newVersion + ".manifest"
    }

    //删除热更目录
    removeNativeHotUpdateDir(gameid) {
        let gamePath = this.getNativeHotUpdatePath(gameid)
        jsb.fileUtils.removeDirectory(gamePath)
        if (gameid == "hall"){
            Global.NativeEvent.unzipHallPackage(); 
        }
    }

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
    addHotUpdateGameComp(gameid, gameVersion, gameUpdateUrl,remoteVer,priority = false) {
        let hotUpdateComponent = new GameHotUpdateComponent();
        hotUpdateComponent.initCheckUpDate(gameid, gameVersion, gameUpdateUrl,remoteVer)
        let autoFlag = this.getAutoInlist()
        let insertIndex = this.getIndex()
        if(autoFlag && !priority) // 非自动下载的游戏优先级更高
        {
            if(insertIndex == -1)
            {
                if(this.checkIsGameDowning())
                {
                    this.gameHotUpdateList.splice(1,0,hotUpdateComponent)
                }
                else
                {
                    this.gameHotUpdateList.unshift(hotUpdateComponent)
                }
            }
            else
            {
                this.gameHotUpdateList.splice(insertIndex+1,0,hotUpdateComponent)

            }
        }
        else
        {
            this.gameHotUpdateList.push(hotUpdateComponent)
        }
        if (!this.checkIsGameDowning()) {
            this.startHotUpdateGame()
        }
    }
    //移除热更组件
    removeGameComp(gameid) {
        let gameHotUpdateComp = this.getHotUpdateGameComp(gameid);
        this.gameHotUpdateList.splice(this.gameHotUpdateList.indexOf(gameHotUpdateComp),1);
    }

    /**
     * 获取自动下载的索引
     */
    getIndex()
    {
        let index = -1;
        let gidList = Global.GameData.autoDownList
        for (let i = this.gameHotUpdateList.length-1; i >= 0; i--) {
            let hotUpdateComponent = this.gameHotUpdateList[i]
            if (gidList.indexOf(Number(hotUpdateComponent._gameType)) == -1) {
                return i;
            }
        }
        return index
    }

    /**
     * 是否有自动下载
     */
    getAutoInlist()
    {
        let gidList = Global.GameData.autoDownList
        for (let i = 0; i < this.gameHotUpdateList.length; i++) {
            let hotUpdateComponent = this.gameHotUpdateList[i]
            
            if (gidList.indexOf(Number(hotUpdateComponent._gameType)) != -1) {
                return true;
            }
        }
        return false
    }


    //开始游戏下载
    startHotUpdateGame() {
        if (this.gameHotUpdateList) {
            let hotUpdateComponent = this.gameHotUpdateList[0]
            if (hotUpdateComponent) {
                hotUpdateComponent.checkVersionUpdate();
            }
        }
    }

    //获取下载组件
    getHotUpdateGameComp(gameid) {
        let gameComp = null;
        for (let i = 0; i < this.gameHotUpdateList.length; i++) {
            let hotUpdateComponent = this.gameHotUpdateList[i]
            if (hotUpdateComponent._gameType === gameid) {
                gameComp = hotUpdateComponent;
                break;
            }
        }
        return gameComp;
    }

    //检查是否有游戏在下载
    checkIsGameDowning() {
        let isDowning = false
        if (this.gameHotUpdateList) {
            for (let i = 0; i < this.gameHotUpdateList.length; i++) {
                let hotUpdateComponent = this.gameHotUpdateList[i]
                if (hotUpdateComponent._updating) {
                    isDowning = true;
                    break;
                }
            }
        }
        return isDowning;
    }

    //获取当前是哪个游戏在下载
    getWhichGameIsDowning() {
        let gid = null;
        if (this.gameHotUpdateList) {
            for (let i = 0; i < this.gameHotUpdateList.length; i++) {
                let hotUpdateComponent = this.gameHotUpdateList[i]
                if (hotUpdateComponent._updating) {
                    gid = hotUpdateComponent._gameType;
                    break;
                }
            }
        }
        return gid;
    }

    //删除热更组件
    removeHotUpdateGameComp(gameid, isStartNew: boolean = false) {
        if (this.gameHotUpdateList) {
            let index = -1;
            for (let i = 0; i < this.gameHotUpdateList.length; i++) {
                let hotUpdateComponent = this.gameHotUpdateList[i]
                if (hotUpdateComponent._gameType === gameid) {
                    index = i;
                    break;
                }
            }
            if (index != -1) {
                let comp = this.gameHotUpdateList.splice(index, 1)
                comp = null;
            }
            if (isStartNew) {
                this.startHotUpdateGame();
            }
        }
    }


    changeManifestUrl(gameid: string, version: string, hotUpdateUrl: string, nativeManifestFilePath?: string, isBack = 0) {
        let HotUpdateManager = Global.HotUpdateManager;
        if (hotUpdateUrl == null || hotUpdateUrl == undefined || hotUpdateUrl == "") {
            hotUpdateUrl = HotUpdateManager.hotUpdateUrl
        }
        let nativeFilePath = nativeManifestFilePath
        if (!nativeFilePath) {
            nativeFilePath = this.getNativeHotUpdatePath(gameid) + "/" + this.projectCfgFileName
        } else {
            let nativeMaifest = this.getNativeHotUpdatePath(gameid) + "/" + this.projectCfgFileName
            let isNativeManifestExist = jsb.fileUtils.isFileExist(nativeMaifest)
            let isNativeFileExit = jsb.fileUtils.isFileExist(nativeFilePath)
            let nativeFileVersion = "0.0.0"
            let nativeMaifestVersion = "0.0.0"

            if (isNativeManifestExist) {
                let jsonStr = jsb.fileUtils.getStringFromFile(nativeMaifest)
                let jsonData = JSON.parse(jsonStr)
                if (jsonData.version) {
                    nativeMaifestVersion = jsonData.version
                }
            }
            if (isNativeFileExit) {
                let jsonStr = jsb.fileUtils.getStringFromFile(nativeFilePath)
                let jsonData = JSON.parse(jsonStr)
                if (jsonData.version) {
                    nativeFileVersion = jsonData.version
                }
            }
            if (Global.Toolkit.versionCompare(nativeMaifestVersion, nativeFileVersion) > 0) {
                nativeFilePath = nativeMaifest
            }
        }
        hotUpdateUrl = hotUpdateUrl + "/" + gameid + "/" + version
        // Logger.log("changeManifestUrl hotUpdateUrl = " + hotUpdateUrl)
        let localManifestJsonObj = {
            "packageUrl": hotUpdateUrl,
            "remoteManifestUrl": hotUpdateUrl + "/" + HotUpdateManager.projectCfgFileName,
            "remoteVersionUrl": hotUpdateUrl + "/" + HotUpdateManager.versionCfgFileName,
            "version": "0.0.1",
            "assets": {},
            "searchPaths": []
        }

        let isExist = jsb.fileUtils.isFileExist(nativeFilePath)
        if (isExist) {
            let jsonStr = jsb.fileUtils.getStringFromFile(nativeFilePath)
            if (jsonStr) {
                // Logger.log("jsonStr =======" + jsonStr)
                let jsonData = JSON.parse(jsonStr)
                let isMergeFile = true;
                //回滚版本
                if (isBack === 1) {
                    if (Global.Toolkit.versionCompare(jsonData.version, version) > 0) {
                        Logger.log("回滚游戏--- gameid "+ gameid) 
                        //删除本地目录
                        let dirPath = this.getNativeHotUpdatePath(gameid)
                        if (jsb.fileUtils.isFileExist(dirPath)) {
                            jsb.fileUtils.removeDirectory(dirPath)
                            if (gameid == "hall"){
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
                        localManifestJsonObj.packageUrl = hotUpdateUrl
                        localManifestJsonObj.remoteManifestUrl = hotUpdateUrl + "/" + HotUpdateManager.projectCfgFileName
                        localManifestJsonObj.remoteVersionUrl = hotUpdateUrl + "/" + HotUpdateManager.versionCfgFileName
                        localManifestJsonObj.version = jsonData.version;
                        localManifestJsonObj.assets = jsonData.assets;
                        localManifestJsonObj.searchPaths = jsonData.searchPaths;
                    } else {
                        localManifestJsonObj = jsonData
                    }
                }
            }
        } else {
            Logger.log("file not exist")
            localManifestJsonObj.packageUrl = hotUpdateUrl
            localManifestJsonObj.remoteManifestUrl = hotUpdateUrl + "/" + HotUpdateManager.projectCfgFileName
            localManifestJsonObj.remoteVersionUrl = hotUpdateUrl + "/" + HotUpdateManager.versionCfgFileName
        }
        return localManifestJsonObj

    }

    onClear() {

    }
    onDestroy() {

    }


}