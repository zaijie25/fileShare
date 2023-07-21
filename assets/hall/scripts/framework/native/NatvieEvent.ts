import HallStorageKey from "../../logic/hallcommon/const/HallStorageKey";
import AppHelper from "../../logic/core/tool/AppHelper";
import SystemInfo from "../../logic/core/setting/SystemInfo";
import Toolkit from "../../logic/core/tool/Toolkit";
import Setting from "../../logic/core/setting/Setting";
import Base64Cls from "../libs/Base64Cls";

export default class NativeEvent {
    private JS_Native_Common_Java_Class = "com.game.libs.JSbridge";
    private JS_Native_Common_OC_Class = "JSbridge";

    private JS_Native_Common_SyncFunc = "nativeCallSync"
    private JS_Native_Common_AsyncFunc = "nativeCallAsync"
    private isBackground  = false

    private timer :any = null

    private callbackArray: Array<any> = [];

    /**
     * 原生接口加密key值
     */
    private jiamiKey:string = "";
    /**
     * 原生接口加密类型 0-不加密 1-base64全加密 2-base64包加密 11-md5全加密 12-md5包加密
     */
    private jiamiType = 0;
    /**
     * 加密后保留前几个字符: 0——全部保留
     */
    private jiamiKeep = 0;
    /**
     * 加密后前缀字符串
     */
    private jiamiFirstLetter = "x";
    /**
     * 不加密的类
     */
    private jiamiFilterClass = "";

    /**
     * 加密后的唯一原生通讯Class
     */
    private jiamiOnlyClass = "";
    /**
     * 加密后的唯一原生通讯函数
     */
    private jiamiOnlyFunc = "";


    constructor() {
        cc.game.on(cc.game.EVENT_HIDE, this.onPause, this)
        cc.game.on(cc.game.EVENT_SHOW, this.onResume, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
    }

    private onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.back: {
                Global.NativeEvent.onShowExitDialog()
                break;
            }
        }
    }

    onResume = function () {
        this.isBackground = false
        if(this.timer)
        {
            clearTimeout(this.timer)
        }
        Logger.log("---------NativeEvent----------onResume---------")
        if (AppHelper.isBaiduPlatform()) {
            Global.Event.event(GlobalEvent.UPDATE_BAIDU_STATE);
        }
    }

    onPause = function () {
        this.isBackground = true
        Logger.log("---------NativeEvent----------onPause---------")
    }

    public onShowExitDialog() {
        Logger.log("cocos----------showExitDialog-----")
        let exitCallBackFunc = () => {
            this.onExitGame();
        }
        Global.UI.showYesNoBox("是否退出游戏？", exitCallBackFunc, null);
    }

	

    //params 使用json
    private nativeForAndroid(classPath: string, funcName: string, paramType: string, ...parameters:any): any {
        // Logger.log("classPath=" + classPath + "-----funcName----" + funcName + "------paramType-----" + paramType + "------------params----------" + params)
        let bFilter = false;//是否过滤
        if(this.jiamiFilterClass != "" && classPath.indexOf(this.jiamiFilterClass) >= 0){
            bFilter = true;
        }
        if(!bFilter){
            if(this.jiamiOnlyClass != "" && this.jiamiOnlyFunc != ""){
                let sParam = classPath + "===" + funcName + "===" + paramType + "===";
                parameters.forEach(element => {
                    sParam += element + "===";
                });
                // parameters = sParam;
                classPath = this.jiamiOnlyClass;
                funcName = this.jiamiOnlyFunc;
                paramType = "(Ljava/lang/String;)Ljava/lang/String;";
                return jsb.reflection.callStaticMethod(classPath, funcName, paramType, sParam);
            }else if(this.jiamiKey != ""){
                let arr = classPath.split('.');
                if(arr.length <= 1){
                    arr = classPath.split('/');
                }
    
                classPath = "";
                for(let i = 0; i < arr.length; i++){
                    let jiamiStr = this.jiamiKey + arr[i];
                    let jiamiType = this.jiamiType % 10
                    if(i == arr.length - 1 && jiamiType == 2){
                        jiamiStr = arr[i];//类不加密
                    }else{
                        if(this.jiamiType > 10){
                            //md5加密
                            jiamiStr = Global.Toolkit.md5(jiamiStr);
                            if(this.jiamiKeep > 0){
                                jiamiStr = jiamiStr.substr(0, this.jiamiKeep);
                            }
                            jiamiStr = this.jiamiFirstLetter + jiamiStr;
                        }else{
                            //base64加密
                            jiamiStr = Base64Cls.encode(jiamiStr);
                            if(this.jiamiKeep > 0){
                                jiamiStr = jiamiStr.substr(0, this.jiamiKeep);
                            }
                            jiamiStr = jiamiStr.replace(/=/g, this.jiamiFirstLetter);
                        }
                    }
                    if(classPath != ""){
                        classPath += "/"
                    }
                    classPath += jiamiStr;
    
                }
            }
        }
        let returnValue = jsb.reflection.callStaticMethod(classPath, funcName, paramType, ...parameters);
        return returnValue;
    }

    private nativeForIOS(classPath: string, funcName: string, params: string): any {
        let returnValue = jsb.reflection.callStaticMethod(classPath, funcName, params)
        return returnValue;
    }

    private nativeForWeb(funcName: string, params?: object) {
        Logger.log("-----------!!!Native call-----funcName = " + funcName)
        return null;
    }

    //网络异常回调
    public NativeCallNetWorkFailed(returnStr: string) {
        if (returnStr) {
            Logger.log("------------NativeCallNetWorkFailed return " + returnStr)
            let returnJsonObj
            try {
                returnJsonObj = JSON.parse(returnStr)
            }
            catch (e) {
                Logger.error("解析json失败", returnStr);
                Global.ReportTool.ReportClientError("NativeCallNetWorkFailed",
                    {
                        des: "NativeCallNetWorkFailed",
                        content: returnStr,
                    })
                return;
            }
            if (returnJsonObj) {
                if (returnJsonObj.errorCode) {

                }
                if (returnJsonObj.url) {

                }
            }
        }
    }

    //异步回调
    public NativeCallBackAsync(returnStr: string) {
        if (returnStr) {
            Logger.log("------------native return " + returnStr)
            let returnJsonObj
            try {
                returnJsonObj = JSON.parse(returnStr)
            }
            catch (e) {
                Logger.error("解析json失败", returnStr);
                Global.ReportTool.ReportClientError("nativeCallAsyncError",
                    {
                        des: "nativeCallAsyncError",
                        content: returnStr,
                    })
                return;
            }
            let index
            for (let i = 0; i < this.callbackArray.length; i++) {
                let element = this.callbackArray[i];
                if (returnJsonObj.funcName == element.funcName) {
                    index = i;
                    let mCallback = element.callback;
                    if (mCallback) {
                        mCallback(returnJsonObj)
                    }
                    else {
                        Logger.log("call is null", element.funcName, "return name", returnJsonObj.funcName);
                    }
                }
                else {
                    Logger.log("element.funcName", element.funcName, "return name", returnJsonObj.funcName);
                }
            }
            if (index != null && index != undefined) {
                this.callbackArray.splice(index, 1)
            }
        } else {
            Logger.log("-----------native has no return-----")
        }
    }

    //异步操作
    public nativeCallAsync(funcName: string, funcParam?: object, callback?: Function) {
        this.callbackArray.push({ "funcName": funcName, "callback": callback })
        this.nativeCall(funcName, "async", funcParam);
    }

    //同步操作
    public nativeCallSync(funcName: string, funcParam?: object, callback?: Function) {
        let returnValue = this.nativeCall(funcName, "sync", funcParam)
        Logger.log("-----nativeCallSync------returnValue=" + returnValue)
        let returnObj = null;
        if (returnValue) {
            try {
                returnObj = JSON.parse(returnValue)
                if (callback) {
                    callback(returnObj)
                }
            } catch (error) {
                Logger.error("nativeCallSync error" + error)
                Global.ReportTool.ReportClientError("nativeCallSyncError",
                    {
                        des: "nativeCallSyncError",
                        content: error,
                    })
            }
        }
        return returnObj;
    }


    //原生调用入口
    private nativeCall(funcName: string, callType: string, funcParam?: object) {
        if (!funcName) {
            Logger.error("nativeCall funcName = null")
            return;
        }
        if (!cc.sys.isNative) {
            return;
        }
        if (!funcParam) {
            funcParam = {}
        }
        let jsNativeFuncName = "";
        let jsNativeFuncParamType = "";

        if (callType == "sync") {
            jsNativeFuncName = this.JS_Native_Common_SyncFunc;
            jsNativeFuncParamType = "(Ljava/lang/String;)Ljava/lang/String;";
        } else if (callType == "async") {
            jsNativeFuncName = this.JS_Native_Common_AsyncFunc;
            jsNativeFuncParamType = "(Ljava/lang/String;)V"
        }

        let paramsObj = { "funcName": funcName, "funcParam": JSON.stringify(funcParam) }
        let paramJson = JSON.stringify(paramsObj);
        let returnStr
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            returnStr = this.nativeForAndroid(this.JS_Native_Common_Java_Class, jsNativeFuncName, jsNativeFuncParamType, paramJson)
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            returnStr = this.nativeForIOS(this.JS_Native_Common_OC_Class, jsNativeFuncName + ":", paramJson)
        } else {
            returnStr = this.nativeForWeb(funcName, funcParam)
        }

        if (returnStr) {
            return returnStr;
        }

    }

    /************************************* 常规功能 start*******************************************************/
    public Init() {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            let resultStr:string = this.nativeForAndroid("initjscall.SyncCall", "Init", "(Ljava/lang/String;)Ljava/lang/String;", "");
            if(!resultStr){
                resultStr = this.nativeForAndroid("org.cocos2dx.javascript.AppActivity", "Init", "(Ljava/lang/String;)Ljava/lang/String;", "");
            }
            if(resultStr){
                let jsonObj = JSON.parse(resultStr);
                let jiami = jsonObj["jiami"];
                let key = jsonObj["key"];
                this.jiamiType = parseInt(jiami);
                if(this.jiamiType > 0){
                    this.jiamiKey = key;
                    //新包 新加的参数，默认参数兼容老包
                    let jiamiKeep = jsonObj["keep"];
                    if(jiamiKeep){
                        this.jiamiKeep = jiamiKeep;
                    }
                    let jiamiFirstLetter = jsonObj["first"];
                    if(jiamiFirstLetter){
                        this.jiamiFirstLetter = jiamiFirstLetter;
                    }
                    let jiamiFilterClass = jsonObj["filter"];
                    if(jiamiFilterClass){
                        this.jiamiFilterClass = jiamiFilterClass;
                    }
                    let jiamiOnlyFunc = jsonObj["onlyfunc"];
                    if(jiamiOnlyFunc){
                        this.jiamiOnlyFunc = jiamiOnlyFunc;
                    }
                    let jiamiOnlyClass = jsonObj["onlyclass"];
                    if(jiamiOnlyClass){
                        this.jiamiOnlyClass = jiamiOnlyClass;
                    }
                }
            }
        }
    }

    public onInit(callback?: Function) {
        this.nativeCallSync("onInit")
        if(cc.sys.isBrowser)
            return;
        //获取cerDir的文件
        if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS) {
            let cerDir = Global.HotUpdateManager.updateHelper.genStoragePath("hall") + "/cer"
            if (jsb && jsb.fileUtils.isDirectoryExist(cerDir)) {
                let fileList = jsb.fileUtils.listFiles(cerDir)
                if (fileList && fileList.length > 0) {
                    Global.Setting.SystemInfo.cerDirFiles = fileList
                }
            }else if(jsb && jsb.fileUtils.isDirectoryExist("cer")){
                let fileList = jsb.fileUtils.listFiles("cer")
                if (fileList && fileList.length > 0) {
                    Global.Setting.SystemInfo.cerDirFiles = fileList
                }
            }
        }


    }

    public hideSplashView() {
        this.nativeCallSync("hideSplashView")
    }

    public showSplashView() {
        this.nativeCallSync("showSplashView")
    }
    
    //保存到相册
    public saveToAlbum(path: string, callback?: Function) {
        let funcParam = {};
        funcParam["path"] = path;
        this.nativeCallAsync("saveToAlbum", funcParam, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }

    public getNativeParams(callback?: Function) {
        if (cc.sys.isNative) {
            this.nativeCallSync("getNativeParams", null, (retObj) => {
                if (retObj.result == 0) {
                    let paramObj = JSON.parse(retObj.funcParam)
                    let sys = Global.Setting.SystemInfo;
                    sys.deviceId = paramObj.deviceId;
                    if (paramObj.firstInstallStatus) {
                        let firstInstallStatusNum = Number(retObj.firstInstallStatus)
                        if (firstInstallStatusNum === 1) {
                            sys.firstInstallStatus = true
                        } else {
                            sys.firstInstallStatus = false
                        }
                    }
                    if (paramObj.webglData) {
                        sys.webglData = paramObj.webglData
                    }
                    if (paramObj.appChannel) {
                        sys.packChannel = paramObj.appChannel
                    }
                    if (paramObj.appVersion) {
                        sys.appVersion = paramObj.appVersion
                    }
                    if (paramObj.pkgVersion) {
                        sys.pkgVersion = paramObj.pkgVersion
                    }
                    if (paramObj.gameUrlJsonCfg) {
                        sys.gameUrlJsonCfg = paramObj.gameUrlJsonCfg
                    }

                    if (paramObj.clipboardText)
                        sys.clipboardText = paramObj.clipboardText;
                    if (paramObj.screenWidth)
                        sys.nativeScreenWidth = paramObj.screenWidth;
                    if (paramObj.screenHeight)
                        sys.nativeScreenHeight = paramObj.screenHeight;
                    if (paramObj.screenDensity)
                        sys.nativeScreenDensity = paramObj.screenDensity;
                    if (paramObj.screenDensityDpi)
                        sys.nativeScreenDensityDpi = paramObj.screenDensityDpi;
                    if (paramObj.hostIp)
                        sys.hostIp = paramObj.hostIp;
                    if (paramObj.osBuildModel)
                        sys.osBuildModel = paramObj.osBuildModel;
                    if (paramObj.osBuildVersionSDK)
                        sys.osBuildVersionSDK = paramObj.osBuildVersionSDK;
                    if (paramObj.osBuildVersionRelease)
                        sys.osBuildVersionRelease = paramObj.osBuildVersionRelease;

                    if (paramObj.nativeLog) {
                        let nativeLogNum = Number(paramObj.nativeLog);
                        if (nativeLogNum === 1) {
                            sys.nativeLog = true;
                        } else {
                            sys.nativeLog = false;
                        }
                    }
                    if (paramObj.bundleName) {
                        sys.bundleName = paramObj.bundleName;
                    }
                    if (paramObj.platform) {
                        let nativePlatform = paramObj.platform
                        sys.nativePlatform = nativePlatform
                    }

                    if (paramObj.isIphoneX) {
                        let iphoneXFlag = paramObj.isIphoneX;
                        if (Number(iphoneXFlag) === 1) {
                            sys.isIphoneX = true;
                        }
                    }

                    if (paramObj.appConstUrl) {
                        sys.appConstUrl = paramObj.appConstUrl
                    }

                    if (paramObj.appConstBackupUrl)
                        sys.appConstBackupUrl = paramObj.appConstBackupUrl;

                    if (paramObj.appConstBackupUrl1)
                        sys.appConstBackupUrl1 = paramObj.appConstBackupUrl1;

                    if (paramObj.appConstUrlArray) {
                        let appConstUrlArray = JSON.parse(paramObj.appConstUrlArray);
                        if (appConstUrlArray) {
                            sys.appConstUrlArray = Global.UrlUtil.dealFullUrlWithMutiLinesSameHost(appConstUrlArray)
                        }
                    }

                    if (paramObj.appID) {
                        sys.appID = paramObj.appID
                    }
                    if (paramObj.subPlatformID) {
                        sys.subPlatformID = paramObj.subPlatformID
                    }
                    if (paramObj.appName) {
                        sys.appName = paramObj.appName;
                    }
                    if (paramObj.zipModel) {
                        let zipModel = paramObj.zipModel;
                        if (Number(zipModel) === 1) {
                            sys.zipModel = true;
                        }
                    }

                    if (paramObj.wxKey)
                        sys.wxKey = paramObj.wxKey;
                    if (paramObj.jpushKey)
                        sys.jpushKey = paramObj.jpushKey;
                    if (paramObj.appSign)
                        sys.appSign = paramObj.appSign;
                         
                    if(paramObj.simulator){
                        sys.simulator = paramObj.simulator;
                    }

                    if(paramObj.hallSkin){
                        sys.hallSkin = paramObj.hallSkin;
                    }
                    if(paramObj.gameSkin){
                        sys.gameSkin = paramObj.gameSkin;
                    }
                    if(paramObj.packageTag){
                        sys.packageTag = paramObj.packageTag;
                    }
                    //生产厂商
                    if (cc.sys.os === cc.sys.OS_ANDROID) {
                        if (paramObj.deviceBrand) {
                            sys.deviceBrand = paramObj.deviceBrand
                        }

                        let storageUid = Global.Setting.storage.get(HallStorageKey.Uid)
                        let storageSvrId = Global.Setting.storage.get(HallStorageKey.ServerDeviceId)
                        if (storageSvrId) {
                            sys.server_id = storageSvrId
                        }
                        //老玩家
                        if (storageUid && (storageSvrId == null || storageSvrId == "" || storageSvrId == 0)) {
                            sys.server_id = paramObj.deviceId
                        }
                    } else if (cc.sys.os === cc.sys.OS_IOS) {
                        sys.deviceBrand = "Apple"
                    }

                }
                if (callback) {
                    callback(retObj)
                }
            })
        }
        else {
            // let sysInfo = Global.Setting.SystemInfo;

            // sysInfo.deviceId = deviceid;
            // Logger.error(Global.Setting.SystemInfo.deviceId);
            // if (callback) {
            //     callback(null)
            // }
        }

    }

    public getOpenInstallData(callback?: Function) {
        this.nativeCallAsync("getOpenInstallData", null, (retObj) => {
            if (retObj.result == 0) {
                let content = retObj.funcParam
                if (callback) {
                    callback(content);
                    callback = null;
                }
            } else {
                Logger.error("getOpenInstallData失败")
                if (callback) {
                    callback(null)
                    callback = null;
                }
            }
        })
    }
    public getSharetraceData(callback?: Function) {
        this.nativeCallAsync("getSharetraceData", null, (retObj) => {
            if (retObj.result == 0) {
                let content = retObj.funcParam
                if (callback) {
                    callback(content);
                    callback = null;
                }
            } else {
                // Logger.error("getShareInstallDat 失败a")
                if (callback) {
                    callback(null)
                    callback = null;
                }
            }
        })
    }
    public startWXLogin(callback?: Function) {
        this.nativeCallAsync("startWXLogin", {wxAppKey:Global.Setting.WX_APP_ID}, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }
    public startFBLogin(callback?: Function) {
        this.nativeCallAsync("startFBLogin", null, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    } 
    //打开相册
    public startOpenAlbum(callback?: Function) {
        this.nativeCallAsync("openPhotos", null, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }
    //打开相机
    public startOpenCamera(callback?: Function) {
        this.nativeCallAsync("openTakePhoto", null, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }


  /**从40001版本开始才有的方法
     * 打开相册
     * @param uploadWay   视频上传的方式 1. js方式实现 2.原生实现  默认第2种方式,第一种未实现
     * @param videoMaxsize   视频上传的限制大小，单位为KB，默认51200KB(50MB)，传0是不限制大小
     * @param videoDuration   视频上传的时长限制，默认为120秒
     * @param imageMaxsize  图片上传的限制大小，单位为KB，默认200KB，传0是不限制大小
     * @param thumbMaxsize 缩略图上传的限制大小，单位为KB，默认100KB ，传0是不限制大小
     * @param callback 回调
     */
    public nstartOpenAlbum(uploadWay:number=2, videoMaxsize:number=51200,videoDuration:number=120,imageMaxsize:number=200,thumbMaxsize:number=100,callback?: Function) { 
        //alioss的配置
        let userid = Global.ChatServer.userid
        let token = Global.ChatServer.token
        let endpoint =  Global.Setting.alioss_endpoint
        let stsserver = "https://"+Global.ChatServer.hurl+"/login/ossAuthority"
        let bucket = Global.Setting.alioss_bucket
        // Global.Setting
        let params = {"uploadWay":uploadWay,"videoMaxsize":videoMaxsize,"videoDuration":videoDuration,"imageMaxsize":imageMaxsize,"thumbMaxsize":thumbMaxsize,
        "userid":userid,"token":token,"endpoint":endpoint,"stsserver":stsserver,"bucket":bucket} 
        this.nativeCallAsync("openPhotos", params, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    } 
    /**从40001版本开始才有的方法
     * 打开相机
     * @param uploadWay    视频上传的方式 1. js方式实现 2.原生实现  默认第2种方式,第1种未实现
     * @param imageMaxsize 拍照图片的上传的限制大小，单位为KB，默认200KB，传0是不限制大小
     * @param thumbMaxsize 缩略图上传的限制大小，单位为KB，默认100KB ，
     * @param callback  回调
     */
    public  nstartOpenCamera(uploadWay:number,imageMaxsize:number=200,thumbMaxsize:number=100,callback?: Function) {
        //alioss的配置
        let userid = Global.ChatServer.userid
        let token = Global.ChatServer.token
        let endpoint =  Global.Setting.alioss_endpoint
        let stsserver =  "https://"+Global.ChatServer.hurl+"/login/ossAuthority"
        let bucket = Global.Setting.alioss_bucket

        let params = {"uploadWay":uploadWay,"imageMaxsize":imageMaxsize,"thumbMaxsize":thumbMaxsize,
        "userid":userid,"token":token,"endpoint":endpoint,"stsserver":stsserver,"bucket":bucket} 
        this.nativeCallAsync("openTakePhoto", params, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }

    
    //图片压缩 传入Base64
    public startImageCompress(imagePath: string, maxSize, callback?: Function) {
        let funcParam = {};
        funcParam["imagePath"] = imagePath;
        funcParam["maxSize"] = maxSize;
        this.nativeCallAsync("startImageCompress", funcParam, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }
    //iOS 专用 获取info.plist 对应的key 的值
    public getInfoPlistParam(key: string, callback?: Function) {
        let funcParam = {};
        funcParam["key"] = key;
        this.nativeCallAsync("getInfoPlistParam", funcParam, (retObj) => {
            // if (callback) {
                callback(retObj);
                callback = null;
            // }
        })
    }
    //安卓专用 获取手机上所有安装的app列表
    public getAndroidAppIds(callback?: Function) {
        let funcParam = {};
        this.nativeCallAsync("getAndroidAppIds", funcParam, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }
      //获取本地渠道信息
    public getLocalInstallInfo(callback?: Function) {
        Logger.error("========================getLocalInstallInfo");
        this.nativeCallAsync("getLocalInstallInfo", null, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }
    //粘贴文本到剪切板
    public copyTextToClipboard(txt: string, callback?: Function): void {
        let funcParam = {};
        funcParam["txt"] = txt;
        this.nativeCallSync("copyTextToClipboard", funcParam, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }

    //打开艾特App
    public openAiteApp(atAppKey: string, atUid: string, callback?: Function) {
        let funcParam = {};
        funcParam["atAppKey"] = atAppKey;
        funcParam["atUid"] = atUid;
        this.nativeCallSync("openAiteApp", funcParam, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }

    //唤醒微信
    public awakeWechatApp(callback?: Function) {
        if (!AppHelper.checkPlatformWXEnable()) {
            return;
        }
        this.nativeCallSync("awakeWechatApp", null, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }
    //唤醒QQ
    public awakeQQApp(callback?: Function) {
        this.nativeCallSync("awakeQQApp", null, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }

    //唤醒支付宝
    public awakeALiPayApp(callback?: Function) {
        this.nativeCallSync("awakeALiPayApp", null, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }
    //唤醒facebook
    public awakeFBApp(callback?: Function) {
        this.nativeCallSync("awakeFBApp", null, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }
    //检查微信是否安装
    public checkWXInstall(callback?: Function) {
        if (!AppHelper.checkPlatformWXEnable()) {
            return;
        }
        this.nativeCallSync("checkWXInstall", {wxAppKey:Global.Setting.WX_APP_ID}, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }


    //检查facebook是否安装
    public checkFBInstall(callback?: Function) {
        this.nativeCallSync("checkFBInstall", null, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }


    //检测支付宝是否安装
    public checkAliPayInstalled(callback?: Function) {
        if (Global.Toolkit.checkIsPlatformShowZhifubao() == false) {
            let retObj = { result: -1 }
            if (callback) {
                callback(retObj)
            }
            return;
        }
        this.nativeCallSync("checkAliPayInstalled", null, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }

    //退出游戏
    public onExitGame(callback?: Function) {
        this.nativeCallSync("onExitGame", null, null)
    }

    //解密string
    public decryptData(encryptData: string, callback?: Function) {
        let retData = Global.NativeJSBBridge.decryptData(encryptData)
        if (retData) {
            let retObj = {}
            retObj["result"] = 0
            retObj["funcParam"] = retData
            return retObj
        }
    }

    /**设置白名单域名，不进行域名校验
     * hosts: 数组的json  string
     * 
     * **/
    public setWhiteHosts(hosts: string) {
        let funcParam = {};
        funcParam["hosts"] = hosts;
        let retObj = this.nativeCallSync("setWhiteHosts", funcParam)
        return retObj
    }

    //获取loginSign
    public getLoginSign(sign_key: string, deviceId: string, callback?: Function) {
        let retData = Global.NativeJSBBridge.getLoginSign(sign_key, deviceId)
        if (retData) {
            let retObj = {}
            retObj["result"] = 0
            retObj["funcParam"] = retData
            return retObj
        }
        let funcParam = {};
        funcParam["sign_key"] = sign_key;
        funcParam["deviceId"] = deviceId;
        let retObj = this.nativeCallSync("getLoginSign", funcParam)

        return retObj
    }
    //检查是否可以热更
    // appTemaId ："3URBRY62NY.com.dstars.enterprise"
    public checkCanHotUpdate(appTemaId: string, callback?: Function): void {
        let funcParam = {};
        funcParam["appTemaId"] = appTemaId;
        this.nativeCallSync("checkCanHotUpdate", funcParam, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }
    //开始更新
    // updateUrl plist文件地址："https://d.tjetyt.com/package/588/manifest-ch0s.plist"
    public hotUpdateIPA(updateUrl: string, callback?: Function) {
        let funcParam = {};
        funcParam["updateUrl"] = updateUrl;
        this.nativeCallSync("hotUpdateIPA", funcParam, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }

    //安装apk
    public installApk(path: string, callback?: Function) {
        let funcParam = {};
        funcParam["path"] = path;
        this.nativeCallSync("installApk", funcParam, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }
    //支付宝订单
    public paymentAliPayOrder(orderStr: string, callback?: Function) {
        if (Global.Toolkit.checkIsPlatformShowZhifubao() == false) {
            Global.UI.fastTip("当前版本不支持此支付方式!");
            return;
        }
        let funcParam = {};
        funcParam["orderStr"] = orderStr;
        funcParam["packageName"] = Global.Setting.alipayReportPackageName
        if( cc.sys.platform != cc.sys.IPHONE &&!Global.Toolkit.checkVersionSupport(50013))
        {
            this.checkTime()
        }
        this.nativeCallAsync("paymentAliPayOrder", funcParam, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }

    public checkTime()
    {
        if(this.timer)
        {
            clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
            if(!this.isBackground)
            {
                Global.UI.showSingleBox("当前版本较低，请您下载最新版本后充值！点击“确定”下载最新版本，取消请关闭",()=>{
                    cc.sys.openURL(Global.Setting.Urls.downLoadUrl)
                })
            }
        }, 2000);
    }
    //微信订单
    public paymentWXPayOrder(orderStr: string, callback?: Function) {
        let funcParam = {};
        funcParam["orderStr"] = orderStr;
        this.nativeCallAsync("paymentWXPayOrder", funcParam, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }
    //支付宝h5转Native
    public aliPayInterceptorWithUrl(payUrl: string, callback?: Function) {
        let funcParam = {};
        funcParam["payUrl"] = payUrl;
        this.nativeCallAsync("payInterceptorWithUrl", funcParam, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }
    //关闭支付宝支付h5 webview页面
    public hideAliPayWebView(callback?: Function) {
        let funcParam = {};
        this.nativeCallSync("hideAliPayWebView", funcParam, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }

    //支付宝h5 授权
    public aliPayAuthWithUrl(payUrl: string, attach_param: any, orderNo: string, callback?: Function) {
        Logger.log("--------js aliPayAuthWithUrl called!!!! payUrl = " + payUrl)
        let sendUrl = Global.HallServer.getHallSendUrl(NetAppface.mod, NetAppface.UserNewDownPayAttach)
        let httpSign = Global.UrlUtil.getHttpReffer(sendUrl)
        let funcParam = {};
        funcParam["payUrl"] = payUrl;
        funcParam["attach_param"] = attach_param;
        funcParam["sendUrl"] = sendUrl;
        funcParam["httpSign"] = httpSign;
        funcParam["orderNo"] = orderNo;

        this.nativeCallAsync("aliPayAuthWithUrl", funcParam, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }
    //支付宝授权取auth code
    public aliPayAuthWithAppID(appid: string, orderNo: string, callback?: Function) {
        let sendUrl = Global.HallServer.getHallSendUrl(NetAppface.mod, NetAppface.UserNewDownPayAttach)
        let httpSign = Global.UrlUtil.getHttpReffer(sendUrl)
        let funcParam = {};
        funcParam["appid"] = appid;
        funcParam["orderNo"] = orderNo;
        funcParam["sendUrl"] = sendUrl;
        funcParam["httpSign"] = httpSign;
        this.nativeCallAsync("aliPayAuthWithAppID", funcParam, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }

    //支付宝授权通过payAuthInfo
    public aliPayAuthWithPayAuthInfo(payAuthInfo: string, payUrl: string, orderNo: string, callback?: Function) {
        let sendUrl = Global.HallServer.getHallSendUrl(NetAppface.mod, NetAppface.UserNewDownPayAttach)
        let httpSign = Global.UrlUtil.getHttpReffer(sendUrl)
        let funcParam = {};
        funcParam["payAuthInfo"] = payAuthInfo;
        funcParam["payUrl"] = payUrl;
        funcParam["orderNo"] = orderNo;
        funcParam["sendUrl"] = sendUrl;
        funcParam["httpSign"] = httpSign;
        funcParam["packageName"] = Global.Setting.alipayReportPackageName
        this.nativeCallAsync("aliPayAuthWithPayAuthInfo", funcParam, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }
    //DPaySDK支付
    public paymentDPayWithToken(token: string, orderNo: string, le_pay_url: string, callback?: Function) {
        let funcParam = {};
        funcParam["orderNo"] = orderNo;
        funcParam["token"] = token;
        funcParam["le_pay_url"] = le_pay_url;
        this.nativeCallAsync("paymentDPayWithToken", funcParam, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }
    //UPaySDK授权
    public paymentUPayWithToken(token: string, orderNo: string, le_pay_url: string, callback?: Function) {
        let funcParam = {};
        funcParam["orderNo"] = orderNo;
        funcParam["token"] = token;
        funcParam["le_pay_url"] = le_pay_url;
        this.nativeCallAsync("paymentUPayWithToken", funcParam, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }
    //SDK支付
    public paymentSDKWithUrl(payStr: string, callback?: Function) {
        let funcParam = {};
        funcParam["payStr"] = payStr;
        this.nativeCallAsync("paymentSDKWithUrl", funcParam, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }
    //SDK支付
    public payLibWithUrl(payStr: string, callback?: Function) {
        let funcParam = {};
        funcParam["payStr"] = payStr;
        this.nativeCallAsync("payLibWithUrl", funcParam, (retObj) => {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        })
    }
    /**
     * 
     * @param val   true 是切换到横屏， false 是切换到竖屏
     */
    public changeOrientationH(val) {
        let dir = val ? "H" : "V"
        if (cc.sys.os == cc.sys.OS_ANDROID)
            this.nativeForAndroid('org/cocos2dx/javascript/AppActivity', 'setOrientation', '(Ljava/lang/String;)V', dir)
        else if (cc.sys.os == cc.sys.OS_IOS) {
            if (Global.Setting.SystemInfo.nativePlatform == 'appstore_sdktype') {
                jsb.reflection.callStaticMethod('RootViewController', 'setOrientation:', dir)
            } else {
                jsb.reflection.callStaticMethod('AppController', 'setOrientation:', dir)
            }
        }


        let frameSize = cc.view.getFrameSize()
        console.log('frameSize: ' + frameSize.width + '   ' + frameSize.height)
        if (val == false) {
            cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT)
            if (frameSize.width > frameSize.height)
                cc.view.setFrameSize(frameSize.height, frameSize.width)
            cc.Canvas.instance.designResolution = cc.size(720, 1280)
            //cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.FIXED_HEIGHT)
            Global.Setting.SystemInfo.orientationLandscape = false;
        }
        else {
            cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE)
            if (frameSize.height > frameSize.width)
                cc.view.setFrameSize(frameSize.height, frameSize.width)
            cc.Canvas.instance.designResolution = cc.size(1280, 720)
            Global.Setting.SystemInfo.orientationLandscape = true;
            //cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.FIXED_HEIGHT)

        }

        //cc.director.resume();

        if (window.jsb) //手动调用触发 Wdiget 组件重新布局
            window.dispatchEvent(new cc.Event.EventCustom('resize', true))
    }

    /**
     * 微信分享
     * @param shareType 分享方式方式: 0微信好友，1朋友圈，2微信收藏
     * @param type 分享内容类型:1文本，2图片，3声音，4视频，5网页
     * @param title 标题
     * @param filePath 文件路径 
     * @param url 
     * @param des 描述
     * @param callback 回调 
     */
    public shareWX(shareType: number, type: number, title: string, filePath: string, url: string, des: string, callback?: Function) {
        if (shareType == null) {
            Logger.error("shareWX param is null");
            return;
        }
        let dealWXException = () => {
            if (type == 5) {
                this.copyTextToClipboard(url, (retStr) => {
                    if (retStr.result == 0) {
                        Global.UI.fastTip("复制成功，请微信手动分享给好友哦。");
                        Global.Component.scheduleOnce(() => {
                            this.awakeWechatApp()
                        }, 1)
                        if (callback) {
                            callback(retStr);
                            callback = null;
                        }
                    } else {
                        Global.UI.fastTip("复制失败");
                    }
                })
            } else if (type == 2) {
                Global.UI.fastTip("请截图后微信手动分享哦!");
            }

        }
        //处理微信包名和微信key不一致问题
        if (AppHelper.checkWxkey(false) == false) {
            dealWXException()
            return;
        }

        let param = {
            shareType: shareType,
            type: type,
            title: title,
            filePath: filePath,
            url: url,
            description: des,
        }
        this.nativeCallAsync("shareWX", param, (retObj) => {
            let result = Number(retObj.result);
            if (result == -1000 || result == -1000.0) {
                dealWXException()
            } else {
                if (callback) {
                    callback(retObj);
                    callback = null;
                }
            }

        })

    }
    /**
     * 
     * @param url 百胜的连接
     * @param schema  要拦截的shema
     * @param actionViewHidden  是否隐藏原生功能按钮 0是不隐藏，1是隐藏
     * @param style  原生功能按钮的样式 1固定在左边 2可以移动的浮点
     */
    public openBS(url:String,schema:String,actionViewHidden:String){ 
        let params = {"url":url,"schema":schema,"actionViewHidden":actionViewHidden}
        this.nativeCallAsync("openBS",params);
    }
    
    public closeBS(){
        this.nativeCallAsync("closeBS",{});
    }
    public openExternalGame(url:String,schema:String,actionViewHidden:String,style:Number=2,direction:Number = -1){ 
        let params = {"url":url,"schema":schema,"actionViewHidden":actionViewHidden,"style":style,"direction":direction}
        this.nativeCallAsync("openExternalGame",params);
    }
    
    public closeExternalGame(){
        this.nativeCallAsync("closeExternalGame",{});
    }
    /**
     * 手机的震动 
     * @param milliseconds 震动的时长，单位为毫秒,默认为400毫秒
     */
    public phoneVibrates(milliseconds: Number = 400) {
        if(cc.sys.os == cc.sys.OS_IOS || (cc.sys.os == cc.sys.OS_ANDROID && Global.Toolkit.checkVersionSupport(60002)))
        {
            let params = { "milliseconds": milliseconds }
            this.nativeCallAsync("phoneVibrates", params);
        }

    }
     /**
     * 取消震动 
     */
    public phoneVibratesCancel(){
        if(cc.sys.os == cc.sys.OS_IOS || (cc.sys.os == cc.sys.OS_ANDROID && Global.Toolkit.checkVersionSupport(60002)))
        {
            this.nativeCallAsync("vibratesCancel",{});
        }
    }

    //webviewjiazai加载的回调 state:区分不同的回调 url:请求的连接
    public webviewCallback(state:String,url:String){
        Logger.error("webviewCallback state = " + state  + " url = " + url)
        Global.WebViewControl.native2JSCallback(state,url)
    }

    /**
     * NativeEvents视讯相关处理
     * @param obj 参数列表对象, 内容包括：
     *  {
            option:"start", //start, release, stop, pause, continue
            url:"",
            x:"0",
            y:"0",
            right:"0",
            bottom:"0",
            width:"0",
            height:"0"
        }
     */
    public shixun(obj: object, callback: Function = null) {
        if (!cc.sys.isNative) {
            Logger.error("视讯暂时只支持android和ios原生平台!!!");
            return;
        }
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            this.nativeCallAsync("shixun", obj, callback);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            this.nativeCallAsync("shixun", obj, callback);
        } else {
            Logger.error("视讯暂不支持除android和ios以外的其他平台!!!");
        }
    }

    //@todo 本地开关控制
    public nativeLog(isOpenLog: boolean) {
        let funcParam = {};
        let openLogTag = 1;
        if (isOpenLog) {
            openLogTag = 1;
        } else {
            openLogTag = 0;
        }
        funcParam["openlog"] = openLogTag;
        Logger.error("nativeLog========openLogTag " + openLogTag)
        this.nativeCallSync("nativeLog", funcParam)

    }

    //解压包操作
    public unzipHallPackage() {
        this.nativeCallSync("unzipHallPackage")
    }
    /************************************** httpDNS start*********************************************************/

    /**
     * httpDNS
     * 国内：edge.wshttpdns.com
     * 国外：220.242.54.8
     * 
     * 
     * *******/

    public startRequest(urls, callback?) {
        if (urls == null && urls.length == 0)
            return;
        let urlsStr = urls.join(";");
        let internalHttpDNSUrl = "edge.wshttpdns.com"
        let foreignHttpDNSUrl = "220.242.54.8";
        let map: { [idx: string]: string } = {};
        map["httpDns"] = internalHttpDNSUrl
        map["domainUrl"] = urlsStr;
        this.nativeCallAsync("startRequest", map, (retObj) => {
            if (retObj.result == 0) {
                //content 为 1 正常，content 为0表示网宿服务器异常
                let content = retObj.funcParam
                Logger.error("startRequest funcParam = " + content)
                this.requestAgain(foreignHttpDNSUrl, urlsStr)
                if (callback)
                    callback(content);
            } else {
            }
        })
    }

    //添加再次请求httpDNS
    private requestAgain(httpDNSUrl, domainUrl, callback?) {
        Logger.error("requestAgain httpDNSUrl = " + httpDNSUrl + " domainUrl = " + domainUrl)
        let param = {
            httpDns: httpDNSUrl,
            domainUrl: domainUrl
        }
        this.nativeCallAsync("requestAgain", param, (retObj) => {
            if (retObj.result == 0) {
                let funcParam = retObj.funcParam
                //content 为 1 正常，content 为0表示网宿服务器异常
                Logger.error("requestAgain funcParam = " + funcParam)
                if (callback)
                    callback(funcParam);
            }
        })

    }

    /**
     * 停掉httpDNS接口
     * 
     * **/
    public stopHttpDNS() {
        this.nativeCallSync("stopHttpDNS")
    }

    /**
     * 添加httpDNS域名对应的ip
     * 
     * ***/
    public addDomainHttpDNSIP(domainName, ip, callback?) {
        let param = {
            domainName: domainName,
            ip: ip
        }
        this.nativeCallSync("addDomainHttpDNSIP", param, (retObj) => {
            if (retObj.result == 0) {
                if (callback)
                    callback();
            } else {
                Logger.error("addDomainHttpDNSIP========result !=0 ")
            }
        })
    }

    /**
     * 获取域名下的ip数组
     * 
     * ***/
    public getHttpDnsIPsByDomainName(domainName: string, callback?: Function) {
        let param = {
            domainName: domainName
        }
        this.nativeCallSync("getHttpDnsIPsByDomainName", param, (retObj) => {
            if (callback)
                callback(retObj);
        })
    }

    /**
     * 设置域名下的ip数组
     * 
     * ***/
    public setHttpDnsIPsByDomainName(domainName: string, ips: string, callback?: Function) {
        let param = {
            domainName: domainName,
            ips: ips
        }
        this.nativeCallSync("setHttpDnsIPsByDomainName", param, (retObj) => {
            if (callback)
                callback(retObj);
        })
    }

    /**
     * 设置http 请求的header属性 map
     * 
     * ***/
    public setRequestProperty(propertys: string, callback?: Function) {
        let param = {
            propertys: propertys,
        }
        Logger.error("call setRequestProperty :", JSON.stringify(param))
        this.nativeCallSync("setRequestProperty", param, (retObj) => {
            if (callback)
                callback(retObj);
        })
    }

    /**
     * 阿里云httpDNS初始化
     * @param accountID:账号id string
     * ***/

    public initAlicloudHttpDns(accountID: string, callback?: Function) {
        let param = {
            accountID: accountID,
        }
        Logger.error("call initAlicloudHttpDns :", JSON.stringify(param))
        this.nativeCallSync("initAlicloudHttpDns", param, (retObj) => {
            if (callback)
                callback(retObj);
        })
    }


    /**
     * 阿里云httpDNS 将app使用到的域名预设进来，以便于HTTPDNS 进行预解析
     * @param preResolveHosts:预处理域名数组转json
     *
     * ***/

    public setPreResolveHosts(preResolveHosts: string, callback?: Function) {
        let param = {
            preResolveHosts: preResolveHosts,
        }
        Logger.error("call setPreResolveHosts :", JSON.stringify(param))
        this.nativeCallSync("setPreResolveHosts", param, (retObj) => {
            if (callback)
                callback(retObj);
        })
    }


    /**
     * 阿里云httpDNS 异步解析接口，首先查询缓存，若存在则返回结果，若不存在返回空字符串并且进行异步域名解析更新缓存
     * @param host:域名名称
     * @return 域名对应的解析结果
     * ***/
    public getIpByHostAsync(host: string, callback?: Function) {
        let param = {
            host: host,
        }
        Logger.error("call getIpByHostAsync :", JSON.stringify(param))
        this.nativeCallSync("getIpByHostAsync", param, (retObj) => {
            if (callback)
                callback(retObj);
        })
    }



    /**
     * 阿里云httpDNS 异步解析接口，首先查询缓存，若存在则返回结果列表，若不存在返回空列表并且进行异步域名解析更新缓存
     * @param host:域名名称
     * @return 该域名下的IP数组 json字符串
     * ***/
    public getIpsByHostAsync(host: string, callback?: Function) {
        let param = {
            host: host,
        }
        Logger.error("call getIpsByHostAsync :", JSON.stringify(param))
        this.nativeCallSync("getIpsByHostAsync", param, (retObj) => {
            if (callback)
                callback(retObj);
        })
    }

    /************************************** httpDNS end*********************************************************/



    /************************************** T_Dun *********************************************************/
    /**
    * 初始化T盾
    * @param key:T盾key
    * @return 
    * ***/
    public initTDunSDK(key, callback?: Function) {
        let path = jsb.fileUtils.getWritablePath();
        let param = {
            key: key,
            path: path
        }
        this.nativeCallAsync("initTDunSDK", param, (retObj) => {
            if (callback)
                callback(retObj);
        })
    }

    /**
    * 获取TDun初始化结果，同步调用
    * @param 
    * @return 
    * ***/
    public getTDunInitRet() {
        if (cc.sys.os == cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("dun", "getInitRet");
        } else if (cc.sys.os == cc.sys.OS_ANDROID) {
            return parseInt(this.nativeForAndroid("com.dun.cocos_api", "getInitRet", "()I"));
        } else {
            return -1;
        }
    }

    /**
     * 获取T盾接口
     * @param key:T盾key
     * @return 
     * ***/
    public getTDunPort(port) {
        let portNum = Number(port)
        if (cc.sys.os == cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("dun", "oc_getport:", portNum);
        } else if (cc.sys.os == cc.sys.OS_ANDROID) {
            let getPort = parseInt(this.nativeForAndroid("com.dun.cocos_api", "getport", "(I)I", portNum));
            return getPort;
        } else {
            return 0;
        }
    }
    /************************************** T_Dun end*********************************************************/



    /************************************** Yun_Dun start *********************************************************/
    /**
    * 异步初始化云盾
    * @param key:T盾key
    * @return 
    * ***/
    public initYunDunSDK(accessKey, uuid, callback?: Function) {
        let param = {
            accessKey: accessKey,
            uuid: uuid
        }
        this.nativeCallAsync("initYunDunSDK", param, (retObj) => {
            if (callback)
                callback(retObj);
        })
    }

    public initYunDunSDKSync(accessKey, uuid) {
        if (cc.sys.os == cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("YunDunApi", "initSync:uuid:", accessKey, uuid);
        } else if (cc.sys.os == cc.sys.OS_ANDROID) {
            return parseInt(this.nativeForAndroid("com.dun.YunDunApi", "initSync", "(Ljava/lang/String;Ljava/lang/String;)I"));
        } else {
            return -1;
        }
    }

    /**
    * 获取YunDun初始化结果，同步调用
    * @param 
    * @return 
    * ***/
    public getYunDunInitRet() {
        if (cc.sys.isBrowser)
            return;
        if (cc.sys.os == cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("YunDunApi", "getInitRet");
        } else if (cc.sys.os == cc.sys.OS_ANDROID) {
            return parseInt(this.nativeForAndroid("com.dun.YunDunApi", "getInitRet", "()I"));
        } else {
            return -1;
        }

    }

    /**
     * 获取YunDun接口
     * @param host:域名
     * @param port:端口
     * 
     * @return 
     * ***/
    public getYunDunServerIPAndPort(host, port) {
        let portNum = Number(port)
        if (cc.sys.os == cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("YunDunApi", "getServerIPAndPort:port:", "", portNum);
        } else if (cc.sys.os == cc.sys.OS_ANDROID) {
            let serverIPAndPort = this.nativeForAndroid("com.dun.YunDunApi", "getServerIPAndPort", "(Ljava/lang/String;I)Ljava/lang/String;", "", portNum);
            return serverIPAndPort;
        } else {
            return null;
        }
    }

    /**
    * 获取YunDun 客户端IP
    * @param 
    * @return 
    * ***/
    public getYunDunClientIP() {
        if (cc.sys.os == cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("YunDunApi", "getClientIP");
        } else if (cc.sys.os == cc.sys.OS_ANDROID) {
            let clientIP = this.nativeForAndroid("com.dun.YunDunApi", "getClientIP", "()Ljava/lang/String;");
            return clientIP;
        } else {
            return "";
        }
    }
    /************************************** Yun_Dun end*********************************************************/




    /************************************** ZA_Dun *********************************************************/
    /**
    * 初始化ZA盾
    * @param key:ZA盾key
    * @return 
    * ***/
    public initZADunSDK(key, callback?: Function) {
        let param = {
            key: key,
        }
        this.nativeCallAsync("initZADunSDK", param, (retObj) => {
            if (callback)
                callback(retObj);
        })
    }

    /**
    * 获取ZADun初始化结果，同步调用
    * @param 
    * @return 
    * ***/
    public getZADunInitRet() {
        if (cc.sys.os == cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("ZAApi", "getInitRet");
        } else if (cc.sys.os == cc.sys.OS_ANDROID) {
            return parseInt(this.nativeForAndroid("com.dun.ZAApi", "getInitRet", "()I"));
        } else {
            return -1;
        }
    }

    /**
     * 获取T盾接口
     * @param key:T盾key
     * @return 
     * ***/
    public getZADunPort(port) {
        let portNum = Number(port)
        if (cc.sys.os == cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("ZAApi", "getServerPort:", portNum);
        } else if (cc.sys.os == cc.sys.OS_ANDROID) {
            let getPort = parseInt(this.nativeForAndroid("com.dun.ZAApi", "getServerPort", "(I)I", portNum));
            return getPort;
        } else {
            return 0;
        }
    }

    /**
     * 获取T盾接口
     * @param key:T盾key
     * @return 
     * ***/
    public getZADunPortByAddr(addr,port) {
        let portNum = Number(port)
        if (cc.sys.os == cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("ZAApi", "getServerPortByAddr:port:", addr,portNum);
        } else if (cc.sys.os == cc.sys.OS_ANDROID) {
            let getPort = parseInt(this.nativeForAndroid("com.dun.ZAApi", "getServerPortByAddr", "(Ljava/lang/String;I)I",addr, portNum));
            return getPort;
        } else {
            return 0;
        }
    }
    /************************************** T_Dun end*********************************************************/

    /************************************** Ali_Dun start*********************************************************/
    /**
    * 异步初始化阿里盾
    * @param appkey
    * @param token
    * 
    * @return ret
    * ***/
   public initAliDunSDK(appkey, token, callback?: Function) {
    let param = {
        appkey: appkey,
        token: token
    }
    this.nativeCallAsync("initAliDunSDK", param, (retObj) => {
        if (callback)
            callback(retObj);
    })
}

/**
    * 获取AliDun初始化结果，同步调用
    * @param 
    * @return 
    * ***/
   public getAliDunInitRet() {
    if (cc.sys.os == cc.sys.OS_IOS) {
        return jsb.reflection.callStaticMethod("AliDunApi", "getInitRet");
    } else if (cc.sys.os == cc.sys.OS_ANDROID) {
        return parseInt(this.nativeForAndroid("com.dun.AliDunApi", "getInitRet", "()I"));
    } else {
        return -1;
    }
}

/**
     * 获取AliDun盾接口
     * @param 
     * @return 
     * ***/
    public getAliDunPort(hostInfo,port) {
        let portStr = port.toString()
        let token = hostInfo.token
        let groupName = hostInfo.groupName
        let domainName = hostInfo.domainName
        if (cc.sys.os == cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("AliDunApi", "getServerPort:group:domain:port:", token,groupName,domainName,portStr);
        } else if (cc.sys.os == cc.sys.OS_ANDROID) {
            let getPort = parseInt(this.nativeForAndroid("com.dun.AliDunApi", "getServerPort", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;", token,groupName,domainName,portStr));
            return getPort;
        } else {
            return 0;
        }
    }

/************************************** Ali_Dun end*********************************************************/
    
    /**
    * 判断是否支持哪个盾
    * @param 
    * @return 
    * ***/
    public isSupportSDK(sdkName, version?, callback?) {
        if (!cc.sys.isNative)
            return true
        let appVersion = Global.Setting.SystemInfo.appVersion
        let numVer = Number(appVersion)
        let value = sdkName
        if (version) {
            value = value + "_" + version
        }
        let param = {
            checkValue: value
        }
        this.nativeCallSync("isSupportSDK", param, (retObj) => {
            if (callback)
                callback(retObj);
        })
    }
    
    /**
    * 检测安卓sdk是否启用:参数使用包名
    * @param 可使用枚举SDK_BUNDLE，也可直接传字符串
    * @return 
    * ***/
     public CheckSdkBundle(bundleName) {
        let checked = true;
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            checked = null;
            let param = {
                bundle: bundleName
            }
            this.nativeCallSync("checkBundle", param, (retObj) => {
                if (retObj.result > 0) {
                    checked = true;
                }else{
                    checked = false;
                }
            });
        }
        return checked;
    }
}

/**
 * CheckSdkBundle方法参数的枚举，可扩展
 */
enum SDK_BUNDLE{
    ALIPAY = "com.alipay.sdk.app.PayTask",
}