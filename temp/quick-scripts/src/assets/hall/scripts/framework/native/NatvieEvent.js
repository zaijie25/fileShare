"use strict";
cc._RF.push(module, 'ce98f8SS65DW79vkzXhkiMl', 'NatvieEvent');
// hall/scripts/framework/native/NatvieEvent.ts

"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var HallStorageKey_1 = require("../../logic/hallcommon/const/HallStorageKey");
var AppHelper_1 = require("../../logic/core/tool/AppHelper");
var Base64Cls_1 = require("../libs/Base64Cls");
var NativeEvent = /** @class */ (function () {
    function NativeEvent() {
        this.JS_Native_Common_Java_Class = "com.game.libs.JSbridge";
        this.JS_Native_Common_OC_Class = "JSbridge";
        this.JS_Native_Common_SyncFunc = "nativeCallSync";
        this.JS_Native_Common_AsyncFunc = "nativeCallAsync";
        this.isBackground = false;
        this.timer = null;
        this.callbackArray = [];
        /**
         * 原生接口加密key值
         */
        this.jiamiKey = "";
        /**
         * 原生接口加密类型 0-不加密 1-base64全加密 2-base64包加密 11-md5全加密 12-md5包加密
         */
        this.jiamiType = 0;
        /**
         * 加密后保留前几个字符: 0——全部保留
         */
        this.jiamiKeep = 0;
        /**
         * 加密后前缀字符串
         */
        this.jiamiFirstLetter = "x";
        /**
         * 不加密的类
         */
        this.jiamiFilterClass = "";
        /**
         * 加密后的唯一原生通讯Class
         */
        this.jiamiOnlyClass = "";
        /**
         * 加密后的唯一原生通讯函数
         */
        this.jiamiOnlyFunc = "";
        this.onResume = function () {
            this.isBackground = false;
            if (this.timer) {
                clearTimeout(this.timer);
            }
            Logger.log("---------NativeEvent----------onResume---------");
            if (AppHelper_1.default.isBaiduPlatform()) {
                Global.Event.event(GlobalEvent.UPDATE_BAIDU_STATE);
            }
        };
        this.onPause = function () {
            this.isBackground = true;
            Logger.log("---------NativeEvent----------onPause---------");
        };
        cc.game.on(cc.game.EVENT_HIDE, this.onPause, this);
        cc.game.on(cc.game.EVENT_SHOW, this.onResume, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }
    NativeEvent.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.back: {
                Global.NativeEvent.onShowExitDialog();
                break;
            }
        }
    };
    NativeEvent.prototype.onShowExitDialog = function () {
        var _this = this;
        Logger.log("cocos----------showExitDialog-----");
        var exitCallBackFunc = function () {
            _this.onExitGame();
        };
        Global.UI.showYesNoBox("是否退出游戏？", exitCallBackFunc, null);
    };
    //params 使用json
    NativeEvent.prototype.nativeForAndroid = function (classPath, funcName, paramType) {
        var _a;
        var parameters = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            parameters[_i - 3] = arguments[_i];
        }
        // Logger.log("classPath=" + classPath + "-----funcName----" + funcName + "------paramType-----" + paramType + "------------params----------" + params)
        var bFilter = false; //是否过滤
        if (this.jiamiFilterClass != "" && classPath.indexOf(this.jiamiFilterClass) >= 0) {
            bFilter = true;
        }
        if (!bFilter) {
            if (this.jiamiOnlyClass != "" && this.jiamiOnlyFunc != "") {
                var sParam_1 = classPath + "===" + funcName + "===" + paramType + "===";
                parameters.forEach(function (element) {
                    sParam_1 += element + "===";
                });
                // parameters = sParam;
                classPath = this.jiamiOnlyClass;
                funcName = this.jiamiOnlyFunc;
                paramType = "(Ljava/lang/String;)Ljava/lang/String;";
                return jsb.reflection.callStaticMethod(classPath, funcName, paramType, sParam_1);
            }
            else if (this.jiamiKey != "") {
                var arr = classPath.split('.');
                if (arr.length <= 1) {
                    arr = classPath.split('/');
                }
                classPath = "";
                for (var i = 0; i < arr.length; i++) {
                    var jiamiStr = this.jiamiKey + arr[i];
                    var jiamiType = this.jiamiType % 10;
                    if (i == arr.length - 1 && jiamiType == 2) {
                        jiamiStr = arr[i]; //类不加密
                    }
                    else {
                        if (this.jiamiType > 10) {
                            //md5加密
                            jiamiStr = Global.Toolkit.md5(jiamiStr);
                            if (this.jiamiKeep > 0) {
                                jiamiStr = jiamiStr.substr(0, this.jiamiKeep);
                            }
                            jiamiStr = this.jiamiFirstLetter + jiamiStr;
                        }
                        else {
                            //base64加密
                            jiamiStr = Base64Cls_1.default.encode(jiamiStr);
                            if (this.jiamiKeep > 0) {
                                jiamiStr = jiamiStr.substr(0, this.jiamiKeep);
                            }
                            jiamiStr = jiamiStr.replace(/=/g, this.jiamiFirstLetter);
                        }
                    }
                    if (classPath != "") {
                        classPath += "/";
                    }
                    classPath += jiamiStr;
                }
            }
        }
        var returnValue = (_a = jsb.reflection).callStaticMethod.apply(_a, __spreadArrays([classPath, funcName, paramType], parameters));
        return returnValue;
    };
    NativeEvent.prototype.nativeForIOS = function (classPath, funcName, params) {
        var returnValue = jsb.reflection.callStaticMethod(classPath, funcName, params);
        return returnValue;
    };
    NativeEvent.prototype.nativeForWeb = function (funcName, params) {
        Logger.log("-----------!!!Native call-----funcName = " + funcName);
        return null;
    };
    //网络异常回调
    NativeEvent.prototype.NativeCallNetWorkFailed = function (returnStr) {
        if (returnStr) {
            Logger.log("------------NativeCallNetWorkFailed return " + returnStr);
            var returnJsonObj = void 0;
            try {
                returnJsonObj = JSON.parse(returnStr);
            }
            catch (e) {
                Logger.error("解析json失败", returnStr);
                Global.ReportTool.ReportClientError("NativeCallNetWorkFailed", {
                    des: "NativeCallNetWorkFailed",
                    content: returnStr,
                });
                return;
            }
            if (returnJsonObj) {
                if (returnJsonObj.errorCode) {
                }
                if (returnJsonObj.url) {
                }
            }
        }
    };
    //异步回调
    NativeEvent.prototype.NativeCallBackAsync = function (returnStr) {
        if (returnStr) {
            Logger.log("------------native return " + returnStr);
            var returnJsonObj = void 0;
            try {
                returnJsonObj = JSON.parse(returnStr);
            }
            catch (e) {
                Logger.error("解析json失败", returnStr);
                Global.ReportTool.ReportClientError("nativeCallAsyncError", {
                    des: "nativeCallAsyncError",
                    content: returnStr,
                });
                return;
            }
            var index = void 0;
            for (var i = 0; i < this.callbackArray.length; i++) {
                var element = this.callbackArray[i];
                if (returnJsonObj.funcName == element.funcName) {
                    index = i;
                    var mCallback = element.callback;
                    if (mCallback) {
                        mCallback(returnJsonObj);
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
                this.callbackArray.splice(index, 1);
            }
        }
        else {
            Logger.log("-----------native has no return-----");
        }
    };
    //异步操作
    NativeEvent.prototype.nativeCallAsync = function (funcName, funcParam, callback) {
        this.callbackArray.push({ "funcName": funcName, "callback": callback });
        this.nativeCall(funcName, "async", funcParam);
    };
    //同步操作
    NativeEvent.prototype.nativeCallSync = function (funcName, funcParam, callback) {
        var returnValue = this.nativeCall(funcName, "sync", funcParam);
        Logger.log("-----nativeCallSync------returnValue=" + returnValue);
        var returnObj = null;
        if (returnValue) {
            try {
                returnObj = JSON.parse(returnValue);
                if (callback) {
                    callback(returnObj);
                }
            }
            catch (error) {
                Logger.error("nativeCallSync error" + error);
                Global.ReportTool.ReportClientError("nativeCallSyncError", {
                    des: "nativeCallSyncError",
                    content: error,
                });
            }
        }
        return returnObj;
    };
    //原生调用入口
    NativeEvent.prototype.nativeCall = function (funcName, callType, funcParam) {
        if (!funcName) {
            Logger.error("nativeCall funcName = null");
            return;
        }
        if (!cc.sys.isNative) {
            return;
        }
        if (!funcParam) {
            funcParam = {};
        }
        var jsNativeFuncName = "";
        var jsNativeFuncParamType = "";
        if (callType == "sync") {
            jsNativeFuncName = this.JS_Native_Common_SyncFunc;
            jsNativeFuncParamType = "(Ljava/lang/String;)Ljava/lang/String;";
        }
        else if (callType == "async") {
            jsNativeFuncName = this.JS_Native_Common_AsyncFunc;
            jsNativeFuncParamType = "(Ljava/lang/String;)V";
        }
        var paramsObj = { "funcName": funcName, "funcParam": JSON.stringify(funcParam) };
        var paramJson = JSON.stringify(paramsObj);
        var returnStr;
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            returnStr = this.nativeForAndroid(this.JS_Native_Common_Java_Class, jsNativeFuncName, jsNativeFuncParamType, paramJson);
        }
        else if (cc.sys.os === cc.sys.OS_IOS) {
            returnStr = this.nativeForIOS(this.JS_Native_Common_OC_Class, jsNativeFuncName + ":", paramJson);
        }
        else {
            returnStr = this.nativeForWeb(funcName, funcParam);
        }
        if (returnStr) {
            return returnStr;
        }
    };
    /************************************* 常规功能 start*******************************************************/
    NativeEvent.prototype.Init = function () {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            var resultStr = this.nativeForAndroid("initjscall.SyncCall", "Init", "(Ljava/lang/String;)Ljava/lang/String;", "");
            if (!resultStr) {
                resultStr = this.nativeForAndroid("org.cocos2dx.javascript.AppActivity", "Init", "(Ljava/lang/String;)Ljava/lang/String;", "");
            }
            if (resultStr) {
                var jsonObj = JSON.parse(resultStr);
                var jiami = jsonObj["jiami"];
                var key = jsonObj["key"];
                this.jiamiType = parseInt(jiami);
                if (this.jiamiType > 0) {
                    this.jiamiKey = key;
                    //新包 新加的参数，默认参数兼容老包
                    var jiamiKeep = jsonObj["keep"];
                    if (jiamiKeep) {
                        this.jiamiKeep = jiamiKeep;
                    }
                    var jiamiFirstLetter = jsonObj["first"];
                    if (jiamiFirstLetter) {
                        this.jiamiFirstLetter = jiamiFirstLetter;
                    }
                    var jiamiFilterClass = jsonObj["filter"];
                    if (jiamiFilterClass) {
                        this.jiamiFilterClass = jiamiFilterClass;
                    }
                    var jiamiOnlyFunc = jsonObj["onlyfunc"];
                    if (jiamiOnlyFunc) {
                        this.jiamiOnlyFunc = jiamiOnlyFunc;
                    }
                    var jiamiOnlyClass = jsonObj["onlyclass"];
                    if (jiamiOnlyClass) {
                        this.jiamiOnlyClass = jiamiOnlyClass;
                    }
                }
            }
        }
    };
    NativeEvent.prototype.onInit = function (callback) {
        this.nativeCallSync("onInit");
        if (cc.sys.isBrowser)
            return;
        //获取cerDir的文件
        if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS) {
            var cerDir = Global.HotUpdateManager.updateHelper.genStoragePath("hall") + "/cer";
            if (jsb && jsb.fileUtils.isDirectoryExist(cerDir)) {
                var fileList = jsb.fileUtils.listFiles(cerDir);
                if (fileList && fileList.length > 0) {
                    Global.Setting.SystemInfo.cerDirFiles = fileList;
                }
            }
            else if (jsb && jsb.fileUtils.isDirectoryExist("cer")) {
                var fileList = jsb.fileUtils.listFiles("cer");
                if (fileList && fileList.length > 0) {
                    Global.Setting.SystemInfo.cerDirFiles = fileList;
                }
            }
        }
    };
    NativeEvent.prototype.hideSplashView = function () {
        this.nativeCallSync("hideSplashView");
    };
    NativeEvent.prototype.showSplashView = function () {
        this.nativeCallSync("showSplashView");
    };
    //保存到相册
    NativeEvent.prototype.saveToAlbum = function (path, callback) {
        var funcParam = {};
        funcParam["path"] = path;
        this.nativeCallAsync("saveToAlbum", funcParam, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    NativeEvent.prototype.getNativeParams = function (callback) {
        if (cc.sys.isNative) {
            this.nativeCallSync("getNativeParams", null, function (retObj) {
                if (retObj.result == 0) {
                    var paramObj = JSON.parse(retObj.funcParam);
                    var sys = Global.Setting.SystemInfo;
                    sys.deviceId = paramObj.deviceId;
                    if (paramObj.firstInstallStatus) {
                        var firstInstallStatusNum = Number(retObj.firstInstallStatus);
                        if (firstInstallStatusNum === 1) {
                            sys.firstInstallStatus = true;
                        }
                        else {
                            sys.firstInstallStatus = false;
                        }
                    }
                    if (paramObj.webglData) {
                        sys.webglData = paramObj.webglData;
                    }
                    if (paramObj.appChannel) {
                        sys.packChannel = paramObj.appChannel;
                    }
                    if (paramObj.appVersion) {
                        sys.appVersion = paramObj.appVersion;
                    }
                    if (paramObj.pkgVersion) {
                        sys.pkgVersion = paramObj.pkgVersion;
                    }
                    if (paramObj.gameUrlJsonCfg) {
                        sys.gameUrlJsonCfg = paramObj.gameUrlJsonCfg;
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
                        var nativeLogNum = Number(paramObj.nativeLog);
                        if (nativeLogNum === 1) {
                            sys.nativeLog = true;
                        }
                        else {
                            sys.nativeLog = false;
                        }
                    }
                    if (paramObj.bundleName) {
                        sys.bundleName = paramObj.bundleName;
                    }
                    if (paramObj.platform) {
                        var nativePlatform = paramObj.platform;
                        sys.nativePlatform = nativePlatform;
                    }
                    if (paramObj.isIphoneX) {
                        var iphoneXFlag = paramObj.isIphoneX;
                        if (Number(iphoneXFlag) === 1) {
                            sys.isIphoneX = true;
                        }
                    }
                    if (paramObj.appConstUrl) {
                        sys.appConstUrl = paramObj.appConstUrl;
                    }
                    if (paramObj.appConstBackupUrl)
                        sys.appConstBackupUrl = paramObj.appConstBackupUrl;
                    if (paramObj.appConstBackupUrl1)
                        sys.appConstBackupUrl1 = paramObj.appConstBackupUrl1;
                    if (paramObj.appConstUrlArray) {
                        var appConstUrlArray = JSON.parse(paramObj.appConstUrlArray);
                        if (appConstUrlArray) {
                            sys.appConstUrlArray = Global.UrlUtil.dealFullUrlWithMutiLinesSameHost(appConstUrlArray);
                        }
                    }
                    if (paramObj.appID) {
                        sys.appID = paramObj.appID;
                    }
                    if (paramObj.subPlatformID) {
                        sys.subPlatformID = paramObj.subPlatformID;
                    }
                    if (paramObj.appName) {
                        sys.appName = paramObj.appName;
                    }
                    if (paramObj.zipModel) {
                        var zipModel = paramObj.zipModel;
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
                    if (paramObj.simulator) {
                        sys.simulator = paramObj.simulator;
                    }
                    if (paramObj.hallSkin) {
                        sys.hallSkin = paramObj.hallSkin;
                    }
                    if (paramObj.gameSkin) {
                        sys.gameSkin = paramObj.gameSkin;
                    }
                    if (paramObj.packageTag) {
                        sys.packageTag = paramObj.packageTag;
                    }
                    //生产厂商
                    if (cc.sys.os === cc.sys.OS_ANDROID) {
                        if (paramObj.deviceBrand) {
                            sys.deviceBrand = paramObj.deviceBrand;
                        }
                        var storageUid = Global.Setting.storage.get(HallStorageKey_1.default.Uid);
                        var storageSvrId = Global.Setting.storage.get(HallStorageKey_1.default.ServerDeviceId);
                        if (storageSvrId) {
                            sys.server_id = storageSvrId;
                        }
                        //老玩家
                        if (storageUid && (storageSvrId == null || storageSvrId == "" || storageSvrId == 0)) {
                            sys.server_id = paramObj.deviceId;
                        }
                    }
                    else if (cc.sys.os === cc.sys.OS_IOS) {
                        sys.deviceBrand = "Apple";
                    }
                }
                if (callback) {
                    callback(retObj);
                }
            });
        }
        else {
            // let sysInfo = Global.Setting.SystemInfo;
            // sysInfo.deviceId = deviceid;
            // Logger.error(Global.Setting.SystemInfo.deviceId);
            // if (callback) {
            //     callback(null)
            // }
        }
    };
    NativeEvent.prototype.getOpenInstallData = function (callback) {
        this.nativeCallAsync("getOpenInstallData", null, function (retObj) {
            if (retObj.result == 0) {
                var content = retObj.funcParam;
                if (callback) {
                    callback(content);
                    callback = null;
                }
            }
            else {
                Logger.error("getOpenInstallData失败");
                if (callback) {
                    callback(null);
                    callback = null;
                }
            }
        });
    };
    NativeEvent.prototype.getSharetraceData = function (callback) {
        this.nativeCallAsync("getSharetraceData", null, function (retObj) {
            if (retObj.result == 0) {
                var content = retObj.funcParam;
                if (callback) {
                    callback(content);
                    callback = null;
                }
            }
            else {
                // Logger.error("getShareInstallDat 失败a")
                if (callback) {
                    callback(null);
                    callback = null;
                }
            }
        });
    };
    NativeEvent.prototype.startWXLogin = function (callback) {
        this.nativeCallAsync("startWXLogin", { wxAppKey: Global.Setting.WX_APP_ID }, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    NativeEvent.prototype.startFBLogin = function (callback) {
        this.nativeCallAsync("startFBLogin", null, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //打开相册
    NativeEvent.prototype.startOpenAlbum = function (callback) {
        this.nativeCallAsync("openPhotos", null, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //打开相机
    NativeEvent.prototype.startOpenCamera = function (callback) {
        this.nativeCallAsync("openTakePhoto", null, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    /**从40001版本开始才有的方法
       * 打开相册
       * @param uploadWay   视频上传的方式 1. js方式实现 2.原生实现  默认第2种方式,第一种未实现
       * @param videoMaxsize   视频上传的限制大小，单位为KB，默认51200KB(50MB)，传0是不限制大小
       * @param videoDuration   视频上传的时长限制，默认为120秒
       * @param imageMaxsize  图片上传的限制大小，单位为KB，默认200KB，传0是不限制大小
       * @param thumbMaxsize 缩略图上传的限制大小，单位为KB，默认100KB ，传0是不限制大小
       * @param callback 回调
       */
    NativeEvent.prototype.nstartOpenAlbum = function (uploadWay, videoMaxsize, videoDuration, imageMaxsize, thumbMaxsize, callback) {
        if (uploadWay === void 0) { uploadWay = 2; }
        if (videoMaxsize === void 0) { videoMaxsize = 51200; }
        if (videoDuration === void 0) { videoDuration = 120; }
        if (imageMaxsize === void 0) { imageMaxsize = 200; }
        if (thumbMaxsize === void 0) { thumbMaxsize = 100; }
        //alioss的配置
        var userid = Global.ChatServer.userid;
        var token = Global.ChatServer.token;
        var endpoint = Global.Setting.alioss_endpoint;
        var stsserver = "https://" + Global.ChatServer.hurl + "/login/ossAuthority";
        var bucket = Global.Setting.alioss_bucket;
        // Global.Setting
        var params = { "uploadWay": uploadWay, "videoMaxsize": videoMaxsize, "videoDuration": videoDuration, "imageMaxsize": imageMaxsize, "thumbMaxsize": thumbMaxsize,
            "userid": userid, "token": token, "endpoint": endpoint, "stsserver": stsserver, "bucket": bucket };
        this.nativeCallAsync("openPhotos", params, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    /**从40001版本开始才有的方法
     * 打开相机
     * @param uploadWay    视频上传的方式 1. js方式实现 2.原生实现  默认第2种方式,第1种未实现
     * @param imageMaxsize 拍照图片的上传的限制大小，单位为KB，默认200KB，传0是不限制大小
     * @param thumbMaxsize 缩略图上传的限制大小，单位为KB，默认100KB ，
     * @param callback  回调
     */
    NativeEvent.prototype.nstartOpenCamera = function (uploadWay, imageMaxsize, thumbMaxsize, callback) {
        if (imageMaxsize === void 0) { imageMaxsize = 200; }
        if (thumbMaxsize === void 0) { thumbMaxsize = 100; }
        //alioss的配置
        var userid = Global.ChatServer.userid;
        var token = Global.ChatServer.token;
        var endpoint = Global.Setting.alioss_endpoint;
        var stsserver = "https://" + Global.ChatServer.hurl + "/login/ossAuthority";
        var bucket = Global.Setting.alioss_bucket;
        var params = { "uploadWay": uploadWay, "imageMaxsize": imageMaxsize, "thumbMaxsize": thumbMaxsize,
            "userid": userid, "token": token, "endpoint": endpoint, "stsserver": stsserver, "bucket": bucket };
        this.nativeCallAsync("openTakePhoto", params, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //图片压缩 传入Base64
    NativeEvent.prototype.startImageCompress = function (imagePath, maxSize, callback) {
        var funcParam = {};
        funcParam["imagePath"] = imagePath;
        funcParam["maxSize"] = maxSize;
        this.nativeCallAsync("startImageCompress", funcParam, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //iOS 专用 获取info.plist 对应的key 的值
    NativeEvent.prototype.getInfoPlistParam = function (key, callback) {
        var funcParam = {};
        funcParam["key"] = key;
        this.nativeCallAsync("getInfoPlistParam", funcParam, function (retObj) {
            // if (callback) {
            callback(retObj);
            callback = null;
            // }
        });
    };
    //安卓专用 获取手机上所有安装的app列表
    NativeEvent.prototype.getAndroidAppIds = function (callback) {
        var funcParam = {};
        this.nativeCallAsync("getAndroidAppIds", funcParam, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //获取本地渠道信息
    NativeEvent.prototype.getLocalInstallInfo = function (callback) {
        Logger.error("========================getLocalInstallInfo");
        this.nativeCallAsync("getLocalInstallInfo", null, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //粘贴文本到剪切板
    NativeEvent.prototype.copyTextToClipboard = function (txt, callback) {
        var funcParam = {};
        funcParam["txt"] = txt;
        this.nativeCallSync("copyTextToClipboard", funcParam, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //打开艾特App
    NativeEvent.prototype.openAiteApp = function (atAppKey, atUid, callback) {
        var funcParam = {};
        funcParam["atAppKey"] = atAppKey;
        funcParam["atUid"] = atUid;
        this.nativeCallSync("openAiteApp", funcParam, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //唤醒微信
    NativeEvent.prototype.awakeWechatApp = function (callback) {
        if (!AppHelper_1.default.checkPlatformWXEnable()) {
            return;
        }
        this.nativeCallSync("awakeWechatApp", null, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //唤醒QQ
    NativeEvent.prototype.awakeQQApp = function (callback) {
        this.nativeCallSync("awakeQQApp", null, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //唤醒支付宝
    NativeEvent.prototype.awakeALiPayApp = function (callback) {
        this.nativeCallSync("awakeALiPayApp", null, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //唤醒facebook
    NativeEvent.prototype.awakeFBApp = function (callback) {
        this.nativeCallSync("awakeFBApp", null, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //检查微信是否安装
    NativeEvent.prototype.checkWXInstall = function (callback) {
        if (!AppHelper_1.default.checkPlatformWXEnable()) {
            return;
        }
        this.nativeCallSync("checkWXInstall", { wxAppKey: Global.Setting.WX_APP_ID }, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //检查facebook是否安装
    NativeEvent.prototype.checkFBInstall = function (callback) {
        this.nativeCallSync("checkFBInstall", null, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //检测支付宝是否安装
    NativeEvent.prototype.checkAliPayInstalled = function (callback) {
        if (Global.Toolkit.checkIsPlatformShowZhifubao() == false) {
            var retObj = { result: -1 };
            if (callback) {
                callback(retObj);
            }
            return;
        }
        this.nativeCallSync("checkAliPayInstalled", null, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //退出游戏
    NativeEvent.prototype.onExitGame = function (callback) {
        this.nativeCallSync("onExitGame", null, null);
    };
    //解密string
    NativeEvent.prototype.decryptData = function (encryptData, callback) {
        var retData = Global.NativeJSBBridge.decryptData(encryptData);
        if (retData) {
            var retObj = {};
            retObj["result"] = 0;
            retObj["funcParam"] = retData;
            return retObj;
        }
    };
    /**设置白名单域名，不进行域名校验
     * hosts: 数组的json  string
     *
     * **/
    NativeEvent.prototype.setWhiteHosts = function (hosts) {
        var funcParam = {};
        funcParam["hosts"] = hosts;
        var retObj = this.nativeCallSync("setWhiteHosts", funcParam);
        return retObj;
    };
    //获取loginSign
    NativeEvent.prototype.getLoginSign = function (sign_key, deviceId, callback) {
        var retData = Global.NativeJSBBridge.getLoginSign(sign_key, deviceId);
        if (retData) {
            var retObj_1 = {};
            retObj_1["result"] = 0;
            retObj_1["funcParam"] = retData;
            return retObj_1;
        }
        var funcParam = {};
        funcParam["sign_key"] = sign_key;
        funcParam["deviceId"] = deviceId;
        var retObj = this.nativeCallSync("getLoginSign", funcParam);
        return retObj;
    };
    //检查是否可以热更
    // appTemaId ："3URBRY62NY.com.dstars.enterprise"
    NativeEvent.prototype.checkCanHotUpdate = function (appTemaId, callback) {
        var funcParam = {};
        funcParam["appTemaId"] = appTemaId;
        this.nativeCallSync("checkCanHotUpdate", funcParam, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //开始更新
    // updateUrl plist文件地址："https://d.tjetyt.com/package/588/manifest-ch0s.plist"
    NativeEvent.prototype.hotUpdateIPA = function (updateUrl, callback) {
        var funcParam = {};
        funcParam["updateUrl"] = updateUrl;
        this.nativeCallSync("hotUpdateIPA", funcParam, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //安装apk
    NativeEvent.prototype.installApk = function (path, callback) {
        var funcParam = {};
        funcParam["path"] = path;
        this.nativeCallSync("installApk", funcParam, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //支付宝订单
    NativeEvent.prototype.paymentAliPayOrder = function (orderStr, callback) {
        if (Global.Toolkit.checkIsPlatformShowZhifubao() == false) {
            Global.UI.fastTip("当前版本不支持此支付方式!");
            return;
        }
        var funcParam = {};
        funcParam["orderStr"] = orderStr;
        funcParam["packageName"] = Global.Setting.alipayReportPackageName;
        if (cc.sys.platform != cc.sys.IPHONE && !Global.Toolkit.checkVersionSupport(50013)) {
            this.checkTime();
        }
        this.nativeCallAsync("paymentAliPayOrder", funcParam, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    NativeEvent.prototype.checkTime = function () {
        var _this = this;
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(function () {
            if (!_this.isBackground) {
                Global.UI.showSingleBox("当前版本较低，请您下载最新版本后充值！点击“确定”下载最新版本，取消请关闭", function () {
                    cc.sys.openURL(Global.Setting.Urls.downLoadUrl);
                });
            }
        }, 2000);
    };
    //微信订单
    NativeEvent.prototype.paymentWXPayOrder = function (orderStr, callback) {
        var funcParam = {};
        funcParam["orderStr"] = orderStr;
        this.nativeCallAsync("paymentWXPayOrder", funcParam, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //支付宝h5转Native
    NativeEvent.prototype.aliPayInterceptorWithUrl = function (payUrl, callback) {
        var funcParam = {};
        funcParam["payUrl"] = payUrl;
        this.nativeCallAsync("payInterceptorWithUrl", funcParam, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //关闭支付宝支付h5 webview页面
    NativeEvent.prototype.hideAliPayWebView = function (callback) {
        var funcParam = {};
        this.nativeCallSync("hideAliPayWebView", funcParam, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //支付宝h5 授权
    NativeEvent.prototype.aliPayAuthWithUrl = function (payUrl, attach_param, orderNo, callback) {
        Logger.log("--------js aliPayAuthWithUrl called!!!! payUrl = " + payUrl);
        var sendUrl = Global.HallServer.getHallSendUrl(NetAppface.mod, NetAppface.UserNewDownPayAttach);
        var httpSign = Global.UrlUtil.getHttpReffer(sendUrl);
        var funcParam = {};
        funcParam["payUrl"] = payUrl;
        funcParam["attach_param"] = attach_param;
        funcParam["sendUrl"] = sendUrl;
        funcParam["httpSign"] = httpSign;
        funcParam["orderNo"] = orderNo;
        this.nativeCallAsync("aliPayAuthWithUrl", funcParam, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //支付宝授权取auth code
    NativeEvent.prototype.aliPayAuthWithAppID = function (appid, orderNo, callback) {
        var sendUrl = Global.HallServer.getHallSendUrl(NetAppface.mod, NetAppface.UserNewDownPayAttach);
        var httpSign = Global.UrlUtil.getHttpReffer(sendUrl);
        var funcParam = {};
        funcParam["appid"] = appid;
        funcParam["orderNo"] = orderNo;
        funcParam["sendUrl"] = sendUrl;
        funcParam["httpSign"] = httpSign;
        this.nativeCallAsync("aliPayAuthWithAppID", funcParam, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //支付宝授权通过payAuthInfo
    NativeEvent.prototype.aliPayAuthWithPayAuthInfo = function (payAuthInfo, payUrl, orderNo, callback) {
        var sendUrl = Global.HallServer.getHallSendUrl(NetAppface.mod, NetAppface.UserNewDownPayAttach);
        var httpSign = Global.UrlUtil.getHttpReffer(sendUrl);
        var funcParam = {};
        funcParam["payAuthInfo"] = payAuthInfo;
        funcParam["payUrl"] = payUrl;
        funcParam["orderNo"] = orderNo;
        funcParam["sendUrl"] = sendUrl;
        funcParam["httpSign"] = httpSign;
        funcParam["packageName"] = Global.Setting.alipayReportPackageName;
        this.nativeCallAsync("aliPayAuthWithPayAuthInfo", funcParam, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //DPaySDK支付
    NativeEvent.prototype.paymentDPayWithToken = function (token, orderNo, le_pay_url, callback) {
        var funcParam = {};
        funcParam["orderNo"] = orderNo;
        funcParam["token"] = token;
        funcParam["le_pay_url"] = le_pay_url;
        this.nativeCallAsync("paymentDPayWithToken", funcParam, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //UPaySDK授权
    NativeEvent.prototype.paymentUPayWithToken = function (token, orderNo, le_pay_url, callback) {
        var funcParam = {};
        funcParam["orderNo"] = orderNo;
        funcParam["token"] = token;
        funcParam["le_pay_url"] = le_pay_url;
        this.nativeCallAsync("paymentUPayWithToken", funcParam, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //SDK支付
    NativeEvent.prototype.paymentSDKWithUrl = function (payStr, callback) {
        var funcParam = {};
        funcParam["payStr"] = payStr;
        this.nativeCallAsync("paymentSDKWithUrl", funcParam, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    //SDK支付
    NativeEvent.prototype.payLibWithUrl = function (payStr, callback) {
        var funcParam = {};
        funcParam["payStr"] = payStr;
        this.nativeCallAsync("payLibWithUrl", funcParam, function (retObj) {
            if (callback) {
                callback(retObj);
                callback = null;
            }
        });
    };
    /**
     *
     * @param val   true 是切换到横屏， false 是切换到竖屏
     */
    NativeEvent.prototype.changeOrientationH = function (val) {
        var dir = val ? "H" : "V";
        if (cc.sys.os == cc.sys.OS_ANDROID)
            this.nativeForAndroid('org/cocos2dx/javascript/AppActivity', 'setOrientation', '(Ljava/lang/String;)V', dir);
        else if (cc.sys.os == cc.sys.OS_IOS) {
            if (Global.Setting.SystemInfo.nativePlatform == 'appstore_sdktype') {
                jsb.reflection.callStaticMethod('RootViewController', 'setOrientation:', dir);
            }
            else {
                jsb.reflection.callStaticMethod('AppController', 'setOrientation:', dir);
            }
        }
        var frameSize = cc.view.getFrameSize();
        console.log('frameSize: ' + frameSize.width + '   ' + frameSize.height);
        if (val == false) {
            cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
            if (frameSize.width > frameSize.height)
                cc.view.setFrameSize(frameSize.height, frameSize.width);
            cc.Canvas.instance.designResolution = cc.size(720, 1280);
            //cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.FIXED_HEIGHT)
            Global.Setting.SystemInfo.orientationLandscape = false;
        }
        else {
            cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
            if (frameSize.height > frameSize.width)
                cc.view.setFrameSize(frameSize.height, frameSize.width);
            cc.Canvas.instance.designResolution = cc.size(1280, 720);
            Global.Setting.SystemInfo.orientationLandscape = true;
            //cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.FIXED_HEIGHT)
        }
        //cc.director.resume();
        if (window.jsb) //手动调用触发 Wdiget 组件重新布局
            window.dispatchEvent(new cc.Event.EventCustom('resize', true));
    };
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
    NativeEvent.prototype.shareWX = function (shareType, type, title, filePath, url, des, callback) {
        var _this = this;
        if (shareType == null) {
            Logger.error("shareWX param is null");
            return;
        }
        var dealWXException = function () {
            if (type == 5) {
                _this.copyTextToClipboard(url, function (retStr) {
                    if (retStr.result == 0) {
                        Global.UI.fastTip("复制成功，请微信手动分享给好友哦。");
                        Global.Component.scheduleOnce(function () {
                            _this.awakeWechatApp();
                        }, 1);
                        if (callback) {
                            callback(retStr);
                            callback = null;
                        }
                    }
                    else {
                        Global.UI.fastTip("复制失败");
                    }
                });
            }
            else if (type == 2) {
                Global.UI.fastTip("请截图后微信手动分享哦!");
            }
        };
        //处理微信包名和微信key不一致问题
        if (AppHelper_1.default.checkWxkey(false) == false) {
            dealWXException();
            return;
        }
        var param = {
            shareType: shareType,
            type: type,
            title: title,
            filePath: filePath,
            url: url,
            description: des,
        };
        this.nativeCallAsync("shareWX", param, function (retObj) {
            var result = Number(retObj.result);
            if (result == -1000 || result == -1000.0) {
                dealWXException();
            }
            else {
                if (callback) {
                    callback(retObj);
                    callback = null;
                }
            }
        });
    };
    /**
     *
     * @param url 百胜的连接
     * @param schema  要拦截的shema
     * @param actionViewHidden  是否隐藏原生功能按钮 0是不隐藏，1是隐藏
     * @param style  原生功能按钮的样式 1固定在左边 2可以移动的浮点
     */
    NativeEvent.prototype.openBS = function (url, schema, actionViewHidden) {
        var params = { "url": url, "schema": schema, "actionViewHidden": actionViewHidden };
        this.nativeCallAsync("openBS", params);
    };
    NativeEvent.prototype.closeBS = function () {
        this.nativeCallAsync("closeBS", {});
    };
    NativeEvent.prototype.openExternalGame = function (url, schema, actionViewHidden, style, direction) {
        if (style === void 0) { style = 2; }
        if (direction === void 0) { direction = -1; }
        var params = { "url": url, "schema": schema, "actionViewHidden": actionViewHidden, "style": style, "direction": direction };
        this.nativeCallAsync("openExternalGame", params);
    };
    NativeEvent.prototype.closeExternalGame = function () {
        this.nativeCallAsync("closeExternalGame", {});
    };
    /**
     * 手机的震动
     * @param milliseconds 震动的时长，单位为毫秒,默认为400毫秒
     */
    NativeEvent.prototype.phoneVibrates = function (milliseconds) {
        if (milliseconds === void 0) { milliseconds = 400; }
        if (cc.sys.os == cc.sys.OS_IOS || (cc.sys.os == cc.sys.OS_ANDROID && Global.Toolkit.checkVersionSupport(60002))) {
            var params = { "milliseconds": milliseconds };
            this.nativeCallAsync("phoneVibrates", params);
        }
    };
    /**
    * 取消震动
    */
    NativeEvent.prototype.phoneVibratesCancel = function () {
        if (cc.sys.os == cc.sys.OS_IOS || (cc.sys.os == cc.sys.OS_ANDROID && Global.Toolkit.checkVersionSupport(60002))) {
            this.nativeCallAsync("vibratesCancel", {});
        }
    };
    //webviewjiazai加载的回调 state:区分不同的回调 url:请求的连接
    NativeEvent.prototype.webviewCallback = function (state, url) {
        Logger.error("webviewCallback state = " + state + " url = " + url);
        Global.WebViewControl.native2JSCallback(state, url);
    };
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
    NativeEvent.prototype.shixun = function (obj, callback) {
        if (callback === void 0) { callback = null; }
        if (!cc.sys.isNative) {
            Logger.error("视讯暂时只支持android和ios原生平台!!!");
            return;
        }
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            this.nativeCallAsync("shixun", obj, callback);
        }
        else if (cc.sys.os === cc.sys.OS_IOS) {
            this.nativeCallAsync("shixun", obj, callback);
        }
        else {
            Logger.error("视讯暂不支持除android和ios以外的其他平台!!!");
        }
    };
    //@todo 本地开关控制
    NativeEvent.prototype.nativeLog = function (isOpenLog) {
        var funcParam = {};
        var openLogTag = 1;
        if (isOpenLog) {
            openLogTag = 1;
        }
        else {
            openLogTag = 0;
        }
        funcParam["openlog"] = openLogTag;
        Logger.error("nativeLog========openLogTag " + openLogTag);
        this.nativeCallSync("nativeLog", funcParam);
    };
    //解压包操作
    NativeEvent.prototype.unzipHallPackage = function () {
        this.nativeCallSync("unzipHallPackage");
    };
    /************************************** httpDNS start*********************************************************/
    /**
     * httpDNS
     * 国内：edge.wshttpdns.com
     * 国外：220.242.54.8
     *
     *
     * *******/
    NativeEvent.prototype.startRequest = function (urls, callback) {
        var _this = this;
        if (urls == null && urls.length == 0)
            return;
        var urlsStr = urls.join(";");
        var internalHttpDNSUrl = "edge.wshttpdns.com";
        var foreignHttpDNSUrl = "220.242.54.8";
        var map = {};
        map["httpDns"] = internalHttpDNSUrl;
        map["domainUrl"] = urlsStr;
        this.nativeCallAsync("startRequest", map, function (retObj) {
            if (retObj.result == 0) {
                //content 为 1 正常，content 为0表示网宿服务器异常
                var content = retObj.funcParam;
                Logger.error("startRequest funcParam = " + content);
                _this.requestAgain(foreignHttpDNSUrl, urlsStr);
                if (callback)
                    callback(content);
            }
            else {
            }
        });
    };
    //添加再次请求httpDNS
    NativeEvent.prototype.requestAgain = function (httpDNSUrl, domainUrl, callback) {
        Logger.error("requestAgain httpDNSUrl = " + httpDNSUrl + " domainUrl = " + domainUrl);
        var param = {
            httpDns: httpDNSUrl,
            domainUrl: domainUrl
        };
        this.nativeCallAsync("requestAgain", param, function (retObj) {
            if (retObj.result == 0) {
                var funcParam = retObj.funcParam;
                //content 为 1 正常，content 为0表示网宿服务器异常
                Logger.error("requestAgain funcParam = " + funcParam);
                if (callback)
                    callback(funcParam);
            }
        });
    };
    /**
     * 停掉httpDNS接口
     *
     * **/
    NativeEvent.prototype.stopHttpDNS = function () {
        this.nativeCallSync("stopHttpDNS");
    };
    /**
     * 添加httpDNS域名对应的ip
     *
     * ***/
    NativeEvent.prototype.addDomainHttpDNSIP = function (domainName, ip, callback) {
        var param = {
            domainName: domainName,
            ip: ip
        };
        this.nativeCallSync("addDomainHttpDNSIP", param, function (retObj) {
            if (retObj.result == 0) {
                if (callback)
                    callback();
            }
            else {
                Logger.error("addDomainHttpDNSIP========result !=0 ");
            }
        });
    };
    /**
     * 获取域名下的ip数组
     *
     * ***/
    NativeEvent.prototype.getHttpDnsIPsByDomainName = function (domainName, callback) {
        var param = {
            domainName: domainName
        };
        this.nativeCallSync("getHttpDnsIPsByDomainName", param, function (retObj) {
            if (callback)
                callback(retObj);
        });
    };
    /**
     * 设置域名下的ip数组
     *
     * ***/
    NativeEvent.prototype.setHttpDnsIPsByDomainName = function (domainName, ips, callback) {
        var param = {
            domainName: domainName,
            ips: ips
        };
        this.nativeCallSync("setHttpDnsIPsByDomainName", param, function (retObj) {
            if (callback)
                callback(retObj);
        });
    };
    /**
     * 设置http 请求的header属性 map
     *
     * ***/
    NativeEvent.prototype.setRequestProperty = function (propertys, callback) {
        var param = {
            propertys: propertys,
        };
        Logger.error("call setRequestProperty :", JSON.stringify(param));
        this.nativeCallSync("setRequestProperty", param, function (retObj) {
            if (callback)
                callback(retObj);
        });
    };
    /**
     * 阿里云httpDNS初始化
     * @param accountID:账号id string
     * ***/
    NativeEvent.prototype.initAlicloudHttpDns = function (accountID, callback) {
        var param = {
            accountID: accountID,
        };
        Logger.error("call initAlicloudHttpDns :", JSON.stringify(param));
        this.nativeCallSync("initAlicloudHttpDns", param, function (retObj) {
            if (callback)
                callback(retObj);
        });
    };
    /**
     * 阿里云httpDNS 将app使用到的域名预设进来，以便于HTTPDNS 进行预解析
     * @param preResolveHosts:预处理域名数组转json
     *
     * ***/
    NativeEvent.prototype.setPreResolveHosts = function (preResolveHosts, callback) {
        var param = {
            preResolveHosts: preResolveHosts,
        };
        Logger.error("call setPreResolveHosts :", JSON.stringify(param));
        this.nativeCallSync("setPreResolveHosts", param, function (retObj) {
            if (callback)
                callback(retObj);
        });
    };
    /**
     * 阿里云httpDNS 异步解析接口，首先查询缓存，若存在则返回结果，若不存在返回空字符串并且进行异步域名解析更新缓存
     * @param host:域名名称
     * @return 域名对应的解析结果
     * ***/
    NativeEvent.prototype.getIpByHostAsync = function (host, callback) {
        var param = {
            host: host,
        };
        Logger.error("call getIpByHostAsync :", JSON.stringify(param));
        this.nativeCallSync("getIpByHostAsync", param, function (retObj) {
            if (callback)
                callback(retObj);
        });
    };
    /**
     * 阿里云httpDNS 异步解析接口，首先查询缓存，若存在则返回结果列表，若不存在返回空列表并且进行异步域名解析更新缓存
     * @param host:域名名称
     * @return 该域名下的IP数组 json字符串
     * ***/
    NativeEvent.prototype.getIpsByHostAsync = function (host, callback) {
        var param = {
            host: host,
        };
        Logger.error("call getIpsByHostAsync :", JSON.stringify(param));
        this.nativeCallSync("getIpsByHostAsync", param, function (retObj) {
            if (callback)
                callback(retObj);
        });
    };
    /************************************** httpDNS end*********************************************************/
    /************************************** T_Dun *********************************************************/
    /**
    * 初始化T盾
    * @param key:T盾key
    * @return
    * ***/
    NativeEvent.prototype.initTDunSDK = function (key, callback) {
        var path = jsb.fileUtils.getWritablePath();
        var param = {
            key: key,
            path: path
        };
        this.nativeCallAsync("initTDunSDK", param, function (retObj) {
            if (callback)
                callback(retObj);
        });
    };
    /**
    * 获取TDun初始化结果，同步调用
    * @param
    * @return
    * ***/
    NativeEvent.prototype.getTDunInitRet = function () {
        if (cc.sys.os == cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("dun", "getInitRet");
        }
        else if (cc.sys.os == cc.sys.OS_ANDROID) {
            return parseInt(this.nativeForAndroid("com.dun.cocos_api", "getInitRet", "()I"));
        }
        else {
            return -1;
        }
    };
    /**
     * 获取T盾接口
     * @param key:T盾key
     * @return
     * ***/
    NativeEvent.prototype.getTDunPort = function (port) {
        var portNum = Number(port);
        if (cc.sys.os == cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("dun", "oc_getport:", portNum);
        }
        else if (cc.sys.os == cc.sys.OS_ANDROID) {
            var getPort = parseInt(this.nativeForAndroid("com.dun.cocos_api", "getport", "(I)I", portNum));
            return getPort;
        }
        else {
            return 0;
        }
    };
    /************************************** T_Dun end*********************************************************/
    /************************************** Yun_Dun start *********************************************************/
    /**
    * 异步初始化云盾
    * @param key:T盾key
    * @return
    * ***/
    NativeEvent.prototype.initYunDunSDK = function (accessKey, uuid, callback) {
        var param = {
            accessKey: accessKey,
            uuid: uuid
        };
        this.nativeCallAsync("initYunDunSDK", param, function (retObj) {
            if (callback)
                callback(retObj);
        });
    };
    NativeEvent.prototype.initYunDunSDKSync = function (accessKey, uuid) {
        if (cc.sys.os == cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("YunDunApi", "initSync:uuid:", accessKey, uuid);
        }
        else if (cc.sys.os == cc.sys.OS_ANDROID) {
            return parseInt(this.nativeForAndroid("com.dun.YunDunApi", "initSync", "(Ljava/lang/String;Ljava/lang/String;)I"));
        }
        else {
            return -1;
        }
    };
    /**
    * 获取YunDun初始化结果，同步调用
    * @param
    * @return
    * ***/
    NativeEvent.prototype.getYunDunInitRet = function () {
        if (cc.sys.isBrowser)
            return;
        if (cc.sys.os == cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("YunDunApi", "getInitRet");
        }
        else if (cc.sys.os == cc.sys.OS_ANDROID) {
            return parseInt(this.nativeForAndroid("com.dun.YunDunApi", "getInitRet", "()I"));
        }
        else {
            return -1;
        }
    };
    /**
     * 获取YunDun接口
     * @param host:域名
     * @param port:端口
     *
     * @return
     * ***/
    NativeEvent.prototype.getYunDunServerIPAndPort = function (host, port) {
        var portNum = Number(port);
        if (cc.sys.os == cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("YunDunApi", "getServerIPAndPort:port:", "", portNum);
        }
        else if (cc.sys.os == cc.sys.OS_ANDROID) {
            var serverIPAndPort = this.nativeForAndroid("com.dun.YunDunApi", "getServerIPAndPort", "(Ljava/lang/String;I)Ljava/lang/String;", "", portNum);
            return serverIPAndPort;
        }
        else {
            return null;
        }
    };
    /**
    * 获取YunDun 客户端IP
    * @param
    * @return
    * ***/
    NativeEvent.prototype.getYunDunClientIP = function () {
        if (cc.sys.os == cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("YunDunApi", "getClientIP");
        }
        else if (cc.sys.os == cc.sys.OS_ANDROID) {
            var clientIP = this.nativeForAndroid("com.dun.YunDunApi", "getClientIP", "()Ljava/lang/String;");
            return clientIP;
        }
        else {
            return "";
        }
    };
    /************************************** Yun_Dun end*********************************************************/
    /************************************** ZA_Dun *********************************************************/
    /**
    * 初始化ZA盾
    * @param key:ZA盾key
    * @return
    * ***/
    NativeEvent.prototype.initZADunSDK = function (key, callback) {
        var param = {
            key: key,
        };
        this.nativeCallAsync("initZADunSDK", param, function (retObj) {
            if (callback)
                callback(retObj);
        });
    };
    /**
    * 获取ZADun初始化结果，同步调用
    * @param
    * @return
    * ***/
    NativeEvent.prototype.getZADunInitRet = function () {
        if (cc.sys.os == cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("ZAApi", "getInitRet");
        }
        else if (cc.sys.os == cc.sys.OS_ANDROID) {
            return parseInt(this.nativeForAndroid("com.dun.ZAApi", "getInitRet", "()I"));
        }
        else {
            return -1;
        }
    };
    /**
     * 获取T盾接口
     * @param key:T盾key
     * @return
     * ***/
    NativeEvent.prototype.getZADunPort = function (port) {
        var portNum = Number(port);
        if (cc.sys.os == cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("ZAApi", "getServerPort:", portNum);
        }
        else if (cc.sys.os == cc.sys.OS_ANDROID) {
            var getPort = parseInt(this.nativeForAndroid("com.dun.ZAApi", "getServerPort", "(I)I", portNum));
            return getPort;
        }
        else {
            return 0;
        }
    };
    /**
     * 获取T盾接口
     * @param key:T盾key
     * @return
     * ***/
    NativeEvent.prototype.getZADunPortByAddr = function (addr, port) {
        var portNum = Number(port);
        if (cc.sys.os == cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("ZAApi", "getServerPortByAddr:port:", addr, portNum);
        }
        else if (cc.sys.os == cc.sys.OS_ANDROID) {
            var getPort = parseInt(this.nativeForAndroid("com.dun.ZAApi", "getServerPortByAddr", "(Ljava/lang/String;I)I", addr, portNum));
            return getPort;
        }
        else {
            return 0;
        }
    };
    /************************************** T_Dun end*********************************************************/
    /************************************** Ali_Dun start*********************************************************/
    /**
    * 异步初始化阿里盾
    * @param appkey
    * @param token
    *
    * @return ret
    * ***/
    NativeEvent.prototype.initAliDunSDK = function (appkey, token, callback) {
        var param = {
            appkey: appkey,
            token: token
        };
        this.nativeCallAsync("initAliDunSDK", param, function (retObj) {
            if (callback)
                callback(retObj);
        });
    };
    /**
        * 获取AliDun初始化结果，同步调用
        * @param
        * @return
        * ***/
    NativeEvent.prototype.getAliDunInitRet = function () {
        if (cc.sys.os == cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("AliDunApi", "getInitRet");
        }
        else if (cc.sys.os == cc.sys.OS_ANDROID) {
            return parseInt(this.nativeForAndroid("com.dun.AliDunApi", "getInitRet", "()I"));
        }
        else {
            return -1;
        }
    };
    /**
         * 获取AliDun盾接口
         * @param
         * @return
         * ***/
    NativeEvent.prototype.getAliDunPort = function (hostInfo, port) {
        var portStr = port.toString();
        var token = hostInfo.token;
        var groupName = hostInfo.groupName;
        var domainName = hostInfo.domainName;
        if (cc.sys.os == cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod("AliDunApi", "getServerPort:group:domain:port:", token, groupName, domainName, portStr);
        }
        else if (cc.sys.os == cc.sys.OS_ANDROID) {
            var getPort = parseInt(this.nativeForAndroid("com.dun.AliDunApi", "getServerPort", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;", token, groupName, domainName, portStr));
            return getPort;
        }
        else {
            return 0;
        }
    };
    /************************************** Ali_Dun end*********************************************************/
    /**
    * 判断是否支持哪个盾
    * @param
    * @return
    * ***/
    NativeEvent.prototype.isSupportSDK = function (sdkName, version, callback) {
        if (!cc.sys.isNative)
            return true;
        var appVersion = Global.Setting.SystemInfo.appVersion;
        var numVer = Number(appVersion);
        var value = sdkName;
        if (version) {
            value = value + "_" + version;
        }
        var param = {
            checkValue: value
        };
        this.nativeCallSync("isSupportSDK", param, function (retObj) {
            if (callback)
                callback(retObj);
        });
    };
    /**
    * 检测安卓sdk是否启用:参数使用包名
    * @param 可使用枚举SDK_BUNDLE，也可直接传字符串
    * @return
    * ***/
    NativeEvent.prototype.CheckSdkBundle = function (bundleName) {
        var checked = true;
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            checked = null;
            var param = {
                bundle: bundleName
            };
            this.nativeCallSync("checkBundle", param, function (retObj) {
                if (retObj.result > 0) {
                    checked = true;
                }
                else {
                    checked = false;
                }
            });
        }
        return checked;
    };
    return NativeEvent;
}());
exports.default = NativeEvent;
/**
 * CheckSdkBundle方法参数的枚举，可扩展
 */
var SDK_BUNDLE;
(function (SDK_BUNDLE) {
    SDK_BUNDLE["ALIPAY"] = "com.alipay.sdk.app.PayTask";
})(SDK_BUNDLE || (SDK_BUNDLE = {}));

cc._RF.pop();