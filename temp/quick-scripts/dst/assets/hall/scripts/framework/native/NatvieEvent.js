
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/native/NatvieEvent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxuYXRpdmVcXE5hdHZpZUV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhFQUF5RTtBQUN6RSw2REFBd0Q7QUFJeEQsK0NBQTBDO0FBRTFDO0lBMkNJO1FBMUNRLGdDQUEyQixHQUFHLHdCQUF3QixDQUFDO1FBQ3ZELDhCQUF5QixHQUFHLFVBQVUsQ0FBQztRQUV2Qyw4QkFBeUIsR0FBRyxnQkFBZ0IsQ0FBQTtRQUM1QywrQkFBMEIsR0FBRyxpQkFBaUIsQ0FBQTtRQUM5QyxpQkFBWSxHQUFJLEtBQUssQ0FBQTtRQUVyQixVQUFLLEdBQVEsSUFBSSxDQUFBO1FBRWpCLGtCQUFhLEdBQWUsRUFBRSxDQUFDO1FBRXZDOztXQUVHO1FBQ0ssYUFBUSxHQUFVLEVBQUUsQ0FBQztRQUM3Qjs7V0FFRztRQUNLLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDdEI7O1dBRUc7UUFDSyxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCOztXQUVHO1FBQ0sscUJBQWdCLEdBQUcsR0FBRyxDQUFDO1FBQy9COztXQUVHO1FBQ0sscUJBQWdCLEdBQUcsRUFBRSxDQUFDO1FBRTlCOztXQUVHO1FBQ0ssbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFDNUI7O1dBRUc7UUFDSyxrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQWtCM0IsYUFBUSxHQUFHO1lBQ1AsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUE7WUFDekIsSUFBRyxJQUFJLENBQUMsS0FBSyxFQUNiO2dCQUNJLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7YUFDM0I7WUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDLGlEQUFpRCxDQUFDLENBQUE7WUFDN0QsSUFBSSxtQkFBUyxDQUFDLGVBQWUsRUFBRSxFQUFFO2dCQUM3QixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMs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SyxVQUFVO0lBQ1gsbURBQXFDLENBQUE7QUFDekMsQ0FBQyxFQUZJLFVBQVUsS0FBVixVQUFVLFFBRWQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGFsbFN0b3JhZ2VLZXkgZnJvbSBcIi4uLy4uL2xvZ2ljL2hhbGxjb21tb24vY29uc3QvSGFsbFN0b3JhZ2VLZXlcIjtcclxuaW1wb3J0IEFwcEhlbHBlciBmcm9tIFwiLi4vLi4vbG9naWMvY29yZS90b29sL0FwcEhlbHBlclwiO1xyXG5pbXBvcnQgU3lzdGVtSW5mbyBmcm9tIFwiLi4vLi4vbG9naWMvY29yZS9zZXR0aW5nL1N5c3RlbUluZm9cIjtcclxuaW1wb3J0IFRvb2xraXQgZnJvbSBcIi4uLy4uL2xvZ2ljL2NvcmUvdG9vbC9Ub29sa2l0XCI7XHJcbmltcG9ydCBTZXR0aW5nIGZyb20gXCIuLi8uLi9sb2dpYy9jb3JlL3NldHRpbmcvU2V0dGluZ1wiO1xyXG5pbXBvcnQgQmFzZTY0Q2xzIGZyb20gXCIuLi9saWJzL0Jhc2U2NENsc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF0aXZlRXZlbnQge1xyXG4gICAgcHJpdmF0ZSBKU19OYXRpdmVfQ29tbW9uX0phdmFfQ2xhc3MgPSBcImNvbS5nYW1lLmxpYnMuSlNicmlkZ2VcIjtcclxuICAgIHByaXZhdGUgSlNfTmF0aXZlX0NvbW1vbl9PQ19DbGFzcyA9IFwiSlNicmlkZ2VcIjtcclxuXHJcbiAgICBwcml2YXRlIEpTX05hdGl2ZV9Db21tb25fU3luY0Z1bmMgPSBcIm5hdGl2ZUNhbGxTeW5jXCJcclxuICAgIHByaXZhdGUgSlNfTmF0aXZlX0NvbW1vbl9Bc3luY0Z1bmMgPSBcIm5hdGl2ZUNhbGxBc3luY1wiXHJcbiAgICBwcml2YXRlIGlzQmFja2dyb3VuZCAgPSBmYWxzZVxyXG5cclxuICAgIHByaXZhdGUgdGltZXIgOmFueSA9IG51bGxcclxuXHJcbiAgICBwcml2YXRlIGNhbGxiYWNrQXJyYXk6IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWOn+eUn+aOpeWPo+WKoOWvhmtleeWAvFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGppYW1pS2V5OnN0cmluZyA9IFwiXCI7XHJcbiAgICAvKipcclxuICAgICAqIOWOn+eUn+aOpeWPo+WKoOWvhuexu+WeiyAwLeS4jeWKoOWvhiAxLWJhc2U2NOWFqOWKoOWvhiAyLWJhc2U2NOWMheWKoOWvhiAxMS1tZDXlhajliqDlr4YgMTItbWQ15YyF5Yqg5a+GXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgamlhbWlUeXBlID0gMDtcclxuICAgIC8qKlxyXG4gICAgICog5Yqg5a+G5ZCO5L+d55WZ5YmN5Yeg5Liq5a2X56ymOiAw4oCU4oCU5YWo6YOo5L+d55WZXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgamlhbWlLZWVwID0gMDtcclxuICAgIC8qKlxyXG4gICAgICog5Yqg5a+G5ZCO5YmN57yA5a2X56ym5LiyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgamlhbWlGaXJzdExldHRlciA9IFwieFwiO1xyXG4gICAgLyoqXHJcbiAgICAgKiDkuI3liqDlr4bnmoTnsbtcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBqaWFtaUZpbHRlckNsYXNzID0gXCJcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOWvhuWQjueahOWUr+S4gOWOn+eUn+mAmuiur0NsYXNzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgamlhbWlPbmx5Q2xhc3MgPSBcIlwiO1xyXG4gICAgLyoqXHJcbiAgICAgKiDliqDlr4blkI7nmoTllK/kuIDljp/nlJ/pgJrorq/lh73mlbBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBqaWFtaU9ubHlGdW5jID0gXCJcIjtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgY2MuZ2FtZS5vbihjYy5nYW1lLkVWRU5UX0hJREUsIHRoaXMub25QYXVzZSwgdGhpcylcclxuICAgICAgICBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfU0hPVywgdGhpcy5vblJlc3VtZSwgdGhpcyk7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9ET1dOLCB0aGlzLm9uS2V5RG93biwgdGhpcylcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uS2V5RG93bihldmVudCkge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5iYWNrOiB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQub25TaG93RXhpdERpYWxvZygpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblJlc3VtZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmlzQmFja2dyb3VuZCA9IGZhbHNlXHJcbiAgICAgICAgaWYodGhpcy50aW1lcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKVxyXG4gICAgICAgIH1cclxuICAgICAgICBMb2dnZXIubG9nKFwiLS0tLS0tLS0tTmF0aXZlRXZlbnQtLS0tLS0tLS0tb25SZXN1bWUtLS0tLS0tLS1cIilcclxuICAgICAgICBpZiAoQXBwSGVscGVyLmlzQmFpZHVQbGF0Zm9ybSgpKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5VUERBVEVfQkFJRFVfU1RBVEUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuaXNCYWNrZ3JvdW5kID0gdHJ1ZVxyXG4gICAgICAgIExvZ2dlci5sb2coXCItLS0tLS0tLS1OYXRpdmVFdmVudC0tLS0tLS0tLS1vblBhdXNlLS0tLS0tLS0tXCIpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2hvd0V4aXREaWFsb2coKSB7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcImNvY29zLS0tLS0tLS0tLXNob3dFeGl0RGlhbG9nLS0tLS1cIilcclxuICAgICAgICBsZXQgZXhpdENhbGxCYWNrRnVuYyA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbkV4aXRHYW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93WWVzTm9Cb3goXCLmmK/lkKbpgIDlh7rmuLjmiI/vvJ9cIiwgZXhpdENhbGxCYWNrRnVuYywgbnVsbCk7XHJcbiAgICB9XHJcblxyXG5cdFxyXG5cclxuICAgIC8vcGFyYW1zIOS9v+eUqGpzb25cclxuICAgIHByaXZhdGUgbmF0aXZlRm9yQW5kcm9pZChjbGFzc1BhdGg6IHN0cmluZywgZnVuY05hbWU6IHN0cmluZywgcGFyYW1UeXBlOiBzdHJpbmcsIC4uLnBhcmFtZXRlcnM6YW55KTogYW55IHtcclxuICAgICAgICAvLyBMb2dnZXIubG9nKFwiY2xhc3NQYXRoPVwiICsgY2xhc3NQYXRoICsgXCItLS0tLWZ1bmNOYW1lLS0tLVwiICsgZnVuY05hbWUgKyBcIi0tLS0tLXBhcmFtVHlwZS0tLS0tXCIgKyBwYXJhbVR5cGUgKyBcIi0tLS0tLS0tLS0tLXBhcmFtcy0tLS0tLS0tLS1cIiArIHBhcmFtcylcclxuICAgICAgICBsZXQgYkZpbHRlciA9IGZhbHNlOy8v5piv5ZCm6L+H5rukXHJcbiAgICAgICAgaWYodGhpcy5qaWFtaUZpbHRlckNsYXNzICE9IFwiXCIgJiYgY2xhc3NQYXRoLmluZGV4T2YodGhpcy5qaWFtaUZpbHRlckNsYXNzKSA+PSAwKXtcclxuICAgICAgICAgICAgYkZpbHRlciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFiRmlsdGVyKXtcclxuICAgICAgICAgICAgaWYodGhpcy5qaWFtaU9ubHlDbGFzcyAhPSBcIlwiICYmIHRoaXMuamlhbWlPbmx5RnVuYyAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgIGxldCBzUGFyYW0gPSBjbGFzc1BhdGggKyBcIj09PVwiICsgZnVuY05hbWUgKyBcIj09PVwiICsgcGFyYW1UeXBlICsgXCI9PT1cIjtcclxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzUGFyYW0gKz0gZWxlbWVudCArIFwiPT09XCI7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIHBhcmFtZXRlcnMgPSBzUGFyYW07XHJcbiAgICAgICAgICAgICAgICBjbGFzc1BhdGggPSB0aGlzLmppYW1pT25seUNsYXNzO1xyXG4gICAgICAgICAgICAgICAgZnVuY05hbWUgPSB0aGlzLmppYW1pT25seUZ1bmM7XHJcbiAgICAgICAgICAgICAgICBwYXJhbVR5cGUgPSBcIihMamF2YS9sYW5nL1N0cmluZzspTGphdmEvbGFuZy9TdHJpbmc7XCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChjbGFzc1BhdGgsIGZ1bmNOYW1lLCBwYXJhbVR5cGUsIHNQYXJhbSk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuamlhbWlLZXkgIT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXJyID0gY2xhc3NQYXRoLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgICAgICAgICBpZihhcnIubGVuZ3RoIDw9IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFyciA9IGNsYXNzUGF0aC5zcGxpdCgnLycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBjbGFzc1BhdGggPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGppYW1pU3RyID0gdGhpcy5qaWFtaUtleSArIGFycltpXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgamlhbWlUeXBlID0gdGhpcy5qaWFtaVR5cGUgJSAxMFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGkgPT0gYXJyLmxlbmd0aCAtIDEgJiYgamlhbWlUeXBlID09IDIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqaWFtaVN0ciA9IGFycltpXTsvL+exu+S4jeWKoOWvhlxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmppYW1pVHlwZSA+IDEwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbWQ15Yqg5a+GXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqaWFtaVN0ciA9IEdsb2JhbC5Ub29sa2l0Lm1kNShqaWFtaVN0cik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmppYW1pS2VlcCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGppYW1pU3RyID0gamlhbWlTdHIuc3Vic3RyKDAsIHRoaXMuamlhbWlLZWVwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGppYW1pU3RyID0gdGhpcy5qaWFtaUZpcnN0TGV0dGVyICsgamlhbWlTdHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9iYXNlNjTliqDlr4ZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGppYW1pU3RyID0gQmFzZTY0Q2xzLmVuY29kZShqaWFtaVN0cik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmppYW1pS2VlcCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGppYW1pU3RyID0gamlhbWlTdHIuc3Vic3RyKDAsIHRoaXMuamlhbWlLZWVwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGppYW1pU3RyID0gamlhbWlTdHIucmVwbGFjZSgvPS9nLCB0aGlzLmppYW1pRmlyc3RMZXR0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNsYXNzUGF0aCAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NQYXRoICs9IFwiL1wiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzUGF0aCArPSBqaWFtaVN0cjtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXR1cm5WYWx1ZSA9IGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoY2xhc3NQYXRoLCBmdW5jTmFtZSwgcGFyYW1UeXBlLCAuLi5wYXJhbWV0ZXJzKTtcclxuICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBuYXRpdmVGb3JJT1MoY2xhc3NQYXRoOiBzdHJpbmcsIGZ1bmNOYW1lOiBzdHJpbmcsIHBhcmFtczogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBsZXQgcmV0dXJuVmFsdWUgPSBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKGNsYXNzUGF0aCwgZnVuY05hbWUsIHBhcmFtcylcclxuICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBuYXRpdmVGb3JXZWIoZnVuY05hbWU6IHN0cmluZywgcGFyYW1zPzogb2JqZWN0KSB7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIi0tLS0tLS0tLS0tISEhTmF0aXZlIGNhbGwtLS0tLWZ1bmNOYW1lID0gXCIgKyBmdW5jTmFtZSlcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+e9kee7nOW8guW4uOWbnuiwg1xyXG4gICAgcHVibGljIE5hdGl2ZUNhbGxOZXRXb3JrRmFpbGVkKHJldHVyblN0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHJldHVyblN0cikge1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwiLS0tLS0tLS0tLS0tTmF0aXZlQ2FsbE5ldFdvcmtGYWlsZWQgcmV0dXJuIFwiICsgcmV0dXJuU3RyKVxyXG4gICAgICAgICAgICBsZXQgcmV0dXJuSnNvbk9ialxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuSnNvbk9iaiA9IEpTT04ucGFyc2UocmV0dXJuU3RyKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLop6PmnpBqc29u5aSx6LSlXCIsIHJldHVyblN0cik7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuUmVwb3J0VG9vbC5SZXBvcnRDbGllbnRFcnJvcihcIk5hdGl2ZUNhbGxOZXRXb3JrRmFpbGVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXM6IFwiTmF0aXZlQ2FsbE5ldFdvcmtGYWlsZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogcmV0dXJuU3RyLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJldHVybkpzb25PYmopIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXR1cm5Kc29uT2JqLmVycm9yQ29kZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChyZXR1cm5Kc29uT2JqLnVybCkge1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+W8guatpeWbnuiwg1xyXG4gICAgcHVibGljIE5hdGl2ZUNhbGxCYWNrQXN5bmMocmV0dXJuU3RyOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAocmV0dXJuU3RyKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coXCItLS0tLS0tLS0tLS1uYXRpdmUgcmV0dXJuIFwiICsgcmV0dXJuU3RyKVxyXG4gICAgICAgICAgICBsZXQgcmV0dXJuSnNvbk9ialxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuSnNvbk9iaiA9IEpTT04ucGFyc2UocmV0dXJuU3RyKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLop6PmnpBqc29u5aSx6LSlXCIsIHJldHVyblN0cik7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuUmVwb3J0VG9vbC5SZXBvcnRDbGllbnRFcnJvcihcIm5hdGl2ZUNhbGxBc3luY0Vycm9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXM6IFwibmF0aXZlQ2FsbEFzeW5jRXJyb3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogcmV0dXJuU3RyLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGluZGV4XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jYWxsYmFja0FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuY2FsbGJhY2tBcnJheVtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXR1cm5Kc29uT2JqLmZ1bmNOYW1lID09IGVsZW1lbnQuZnVuY05hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1DYWxsYmFjayA9IGVsZW1lbnQuY2FsbGJhY2s7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1DYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtQ2FsbGJhY2socmV0dXJuSnNvbk9iailcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJjYWxsIGlzIG51bGxcIiwgZWxlbWVudC5mdW5jTmFtZSwgXCJyZXR1cm4gbmFtZVwiLCByZXR1cm5Kc29uT2JqLmZ1bmNOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwiZWxlbWVudC5mdW5jTmFtZVwiLCBlbGVtZW50LmZ1bmNOYW1lLCBcInJldHVybiBuYW1lXCIsIHJldHVybkpzb25PYmouZnVuY05hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPSBudWxsICYmIGluZGV4ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja0FycmF5LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coXCItLS0tLS0tLS0tLW5hdGl2ZSBoYXMgbm8gcmV0dXJuLS0tLS1cIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/lvILmraXmk43kvZxcclxuICAgIHB1YmxpYyBuYXRpdmVDYWxsQXN5bmMoZnVuY05hbWU6IHN0cmluZywgZnVuY1BhcmFtPzogb2JqZWN0LCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja0FycmF5LnB1c2goeyBcImZ1bmNOYW1lXCI6IGZ1bmNOYW1lLCBcImNhbGxiYWNrXCI6IGNhbGxiYWNrIH0pXHJcbiAgICAgICAgdGhpcy5uYXRpdmVDYWxsKGZ1bmNOYW1lLCBcImFzeW5jXCIsIGZ1bmNQYXJhbSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lkIzmraXmk43kvZxcclxuICAgIHB1YmxpYyBuYXRpdmVDYWxsU3luYyhmdW5jTmFtZTogc3RyaW5nLCBmdW5jUGFyYW0/OiBvYmplY3QsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgcmV0dXJuVmFsdWUgPSB0aGlzLm5hdGl2ZUNhbGwoZnVuY05hbWUsIFwic3luY1wiLCBmdW5jUGFyYW0pXHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIi0tLS0tbmF0aXZlQ2FsbFN5bmMtLS0tLS1yZXR1cm5WYWx1ZT1cIiArIHJldHVyblZhbHVlKVxyXG4gICAgICAgIGxldCByZXR1cm5PYmogPSBudWxsO1xyXG4gICAgICAgIGlmIChyZXR1cm5WYWx1ZSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuT2JqID0gSlNPTi5wYXJzZShyZXR1cm5WYWx1ZSlcclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldHVybk9iailcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIm5hdGl2ZUNhbGxTeW5jIGVycm9yXCIgKyBlcnJvcilcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5SZXBvcnRUb29sLlJlcG9ydENsaWVudEVycm9yKFwibmF0aXZlQ2FsbFN5bmNFcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzOiBcIm5hdGl2ZUNhbGxTeW5jRXJyb3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogZXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0dXJuT2JqO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+WOn+eUn+iwg+eUqOWFpeWPo1xyXG4gICAgcHJpdmF0ZSBuYXRpdmVDYWxsKGZ1bmNOYW1lOiBzdHJpbmcsIGNhbGxUeXBlOiBzdHJpbmcsIGZ1bmNQYXJhbT86IG9iamVjdCkge1xyXG4gICAgICAgIGlmICghZnVuY05hbWUpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwibmF0aXZlQ2FsbCBmdW5jTmFtZSA9IG51bGxcIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZnVuY1BhcmFtKSB7XHJcbiAgICAgICAgICAgIGZ1bmNQYXJhbSA9IHt9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBqc05hdGl2ZUZ1bmNOYW1lID0gXCJcIjtcclxuICAgICAgICBsZXQganNOYXRpdmVGdW5jUGFyYW1UeXBlID0gXCJcIjtcclxuXHJcbiAgICAgICAgaWYgKGNhbGxUeXBlID09IFwic3luY1wiKSB7XHJcbiAgICAgICAgICAgIGpzTmF0aXZlRnVuY05hbWUgPSB0aGlzLkpTX05hdGl2ZV9Db21tb25fU3luY0Z1bmM7XHJcbiAgICAgICAgICAgIGpzTmF0aXZlRnVuY1BhcmFtVHlwZSA9IFwiKExqYXZhL2xhbmcvU3RyaW5nOylMamF2YS9sYW5nL1N0cmluZztcIjtcclxuICAgICAgICB9IGVsc2UgaWYgKGNhbGxUeXBlID09IFwiYXN5bmNcIikge1xyXG4gICAgICAgICAgICBqc05hdGl2ZUZ1bmNOYW1lID0gdGhpcy5KU19OYXRpdmVfQ29tbW9uX0FzeW5jRnVuYztcclxuICAgICAgICAgICAganNOYXRpdmVGdW5jUGFyYW1UeXBlID0gXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhcmFtc09iaiA9IHsgXCJmdW5jTmFtZVwiOiBmdW5jTmFtZSwgXCJmdW5jUGFyYW1cIjogSlNPTi5zdHJpbmdpZnkoZnVuY1BhcmFtKSB9XHJcbiAgICAgICAgbGV0IHBhcmFtSnNvbiA9IEpTT04uc3RyaW5naWZ5KHBhcmFtc09iaik7XHJcbiAgICAgICAgbGV0IHJldHVyblN0clxyXG4gICAgICAgIGlmIChjYy5zeXMub3MgPT09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIHJldHVyblN0ciA9IHRoaXMubmF0aXZlRm9yQW5kcm9pZCh0aGlzLkpTX05hdGl2ZV9Db21tb25fSmF2YV9DbGFzcywganNOYXRpdmVGdW5jTmFtZSwganNOYXRpdmVGdW5jUGFyYW1UeXBlLCBwYXJhbUpzb24pXHJcbiAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgcmV0dXJuU3RyID0gdGhpcy5uYXRpdmVGb3JJT1ModGhpcy5KU19OYXRpdmVfQ29tbW9uX09DX0NsYXNzLCBqc05hdGl2ZUZ1bmNOYW1lICsgXCI6XCIsIHBhcmFtSnNvbilcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm5TdHIgPSB0aGlzLm5hdGl2ZUZvcldlYihmdW5jTmFtZSwgZnVuY1BhcmFtKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJldHVyblN0cikge1xyXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuU3RyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiog5bi46KeE5Yqf6IO9IHN0YXJ0KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIHB1YmxpYyBJbml0KCkge1xyXG4gICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdFN0cjpzdHJpbmcgPSB0aGlzLm5hdGl2ZUZvckFuZHJvaWQoXCJpbml0anNjYWxsLlN5bmNDYWxsXCIsIFwiSW5pdFwiLCBcIihMamF2YS9sYW5nL1N0cmluZzspTGphdmEvbGFuZy9TdHJpbmc7XCIsIFwiXCIpO1xyXG4gICAgICAgICAgICBpZighcmVzdWx0U3RyKXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFN0ciA9IHRoaXMubmF0aXZlRm9yQW5kcm9pZChcIm9yZy5jb2NvczJkeC5qYXZhc2NyaXB0LkFwcEFjdGl2aXR5XCIsIFwiSW5pdFwiLCBcIihMamF2YS9sYW5nL1N0cmluZzspTGphdmEvbGFuZy9TdHJpbmc7XCIsIFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdFN0cil7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbk9iaiA9IEpTT04ucGFyc2UocmVzdWx0U3RyKTtcclxuICAgICAgICAgICAgICAgIGxldCBqaWFtaSA9IGpzb25PYmpbXCJqaWFtaVwiXTtcclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBqc29uT2JqW1wia2V5XCJdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5qaWFtaVR5cGUgPSBwYXJzZUludChqaWFtaSk7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmppYW1pVHlwZSA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuamlhbWlLZXkgPSBrZXk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mlrDljIUg5paw5Yqg55qE5Y+C5pWw77yM6buY6K6k5Y+C5pWw5YW85a656ICB5YyFXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGppYW1pS2VlcCA9IGpzb25PYmpbXCJrZWVwXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGppYW1pS2VlcCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuamlhbWlLZWVwID0gamlhbWlLZWVwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgamlhbWlGaXJzdExldHRlciA9IGpzb25PYmpbXCJmaXJzdFwiXTtcclxuICAgICAgICAgICAgICAgICAgICBpZihqaWFtaUZpcnN0TGV0dGVyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5qaWFtaUZpcnN0TGV0dGVyID0gamlhbWlGaXJzdExldHRlcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGppYW1pRmlsdGVyQ2xhc3MgPSBqc29uT2JqW1wiZmlsdGVyXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGppYW1pRmlsdGVyQ2xhc3Mpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmppYW1pRmlsdGVyQ2xhc3MgPSBqaWFtaUZpbHRlckNsYXNzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgamlhbWlPbmx5RnVuYyA9IGpzb25PYmpbXCJvbmx5ZnVuY1wiXTtcclxuICAgICAgICAgICAgICAgICAgICBpZihqaWFtaU9ubHlGdW5jKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5qaWFtaU9ubHlGdW5jID0gamlhbWlPbmx5RnVuYztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGppYW1pT25seUNsYXNzID0ganNvbk9ialtcIm9ubHljbGFzc1wiXTtcclxuICAgICAgICAgICAgICAgICAgICBpZihqaWFtaU9ubHlDbGFzcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuamlhbWlPbmx5Q2xhc3MgPSBqaWFtaU9ubHlDbGFzcztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uSW5pdChjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5uYXRpdmVDYWxsU3luYyhcIm9uSW5pdFwiKVxyXG4gICAgICAgIGlmKGNjLnN5cy5pc0Jyb3dzZXIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvL+iOt+WPlmNlckRpcueahOaWh+S7tlxyXG4gICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQgfHwgY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgbGV0IGNlckRpciA9IEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnVwZGF0ZUhlbHBlci5nZW5TdG9yYWdlUGF0aChcImhhbGxcIikgKyBcIi9jZXJcIlxyXG4gICAgICAgICAgICBpZiAoanNiICYmIGpzYi5maWxlVXRpbHMuaXNEaXJlY3RvcnlFeGlzdChjZXJEaXIpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmlsZUxpc3QgPSBqc2IuZmlsZVV0aWxzLmxpc3RGaWxlcyhjZXJEaXIpXHJcbiAgICAgICAgICAgICAgICBpZiAoZmlsZUxpc3QgJiYgZmlsZUxpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uY2VyRGlyRmlsZXMgPSBmaWxlTGlzdFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZSBpZihqc2IgJiYganNiLmZpbGVVdGlscy5pc0RpcmVjdG9yeUV4aXN0KFwiY2VyXCIpKXtcclxuICAgICAgICAgICAgICAgIGxldCBmaWxlTGlzdCA9IGpzYi5maWxlVXRpbHMubGlzdEZpbGVzKFwiY2VyXCIpXHJcbiAgICAgICAgICAgICAgICBpZiAoZmlsZUxpc3QgJiYgZmlsZUxpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uY2VyRGlyRmlsZXMgPSBmaWxlTGlzdFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGVTcGxhc2hWaWV3KCkge1xyXG4gICAgICAgIHRoaXMubmF0aXZlQ2FsbFN5bmMoXCJoaWRlU3BsYXNoVmlld1wiKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93U3BsYXNoVmlldygpIHtcclxuICAgICAgICB0aGlzLm5hdGl2ZUNhbGxTeW5jKFwic2hvd1NwbGFzaFZpZXdcIilcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/kv53lrZjliLDnm7jlhoxcclxuICAgIHB1YmxpYyBzYXZlVG9BbGJ1bShwYXRoOiBzdHJpbmcsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgZnVuY1BhcmFtID0ge307XHJcbiAgICAgICAgZnVuY1BhcmFtW1wicGF0aFwiXSA9IHBhdGg7XHJcbiAgICAgICAgdGhpcy5uYXRpdmVDYWxsQXN5bmMoXCJzYXZlVG9BbGJ1bVwiLCBmdW5jUGFyYW0sIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXRPYmopO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TmF0aXZlUGFyYW1zKGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlQ2FsbFN5bmMoXCJnZXROYXRpdmVQYXJhbXNcIiwgbnVsbCwgKHJldE9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldE9iai5yZXN1bHQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXJhbU9iaiA9IEpTT04ucGFyc2UocmV0T2JqLmZ1bmNQYXJhbSlcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3lzID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mbztcclxuICAgICAgICAgICAgICAgICAgICBzeXMuZGV2aWNlSWQgPSBwYXJhbU9iai5kZXZpY2VJZDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1PYmouZmlyc3RJbnN0YWxsU3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaXJzdEluc3RhbGxTdGF0dXNOdW0gPSBOdW1iZXIocmV0T2JqLmZpcnN0SW5zdGFsbFN0YXR1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpcnN0SW5zdGFsbFN0YXR1c051bSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3lzLmZpcnN0SW5zdGFsbFN0YXR1cyA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN5cy5maXJzdEluc3RhbGxTdGF0dXMgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbU9iai53ZWJnbERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3lzLndlYmdsRGF0YSA9IHBhcmFtT2JqLndlYmdsRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1PYmouYXBwQ2hhbm5lbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzeXMucGFja0NoYW5uZWwgPSBwYXJhbU9iai5hcHBDaGFubmVsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbU9iai5hcHBWZXJzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN5cy5hcHBWZXJzaW9uID0gcGFyYW1PYmouYXBwVmVyc2lvblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1PYmoucGtnVmVyc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzeXMucGtnVmVyc2lvbiA9IHBhcmFtT2JqLnBrZ1ZlcnNpb25cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtT2JqLmdhbWVVcmxKc29uQ2ZnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN5cy5nYW1lVXJsSnNvbkNmZyA9IHBhcmFtT2JqLmdhbWVVcmxKc29uQ2ZnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1PYmouY2xpcGJvYXJkVGV4dClcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3lzLmNsaXBib2FyZFRleHQgPSBwYXJhbU9iai5jbGlwYm9hcmRUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbU9iai5zY3JlZW5XaWR0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3lzLm5hdGl2ZVNjcmVlbldpZHRoID0gcGFyYW1PYmouc2NyZWVuV2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtT2JqLnNjcmVlbkhlaWdodClcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3lzLm5hdGl2ZVNjcmVlbkhlaWdodCA9IHBhcmFtT2JqLnNjcmVlbkhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1PYmouc2NyZWVuRGVuc2l0eSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3lzLm5hdGl2ZVNjcmVlbkRlbnNpdHkgPSBwYXJhbU9iai5zY3JlZW5EZW5zaXR5O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbU9iai5zY3JlZW5EZW5zaXR5RHBpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzeXMubmF0aXZlU2NyZWVuRGVuc2l0eURwaSA9IHBhcmFtT2JqLnNjcmVlbkRlbnNpdHlEcGk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtT2JqLmhvc3RJcClcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3lzLmhvc3RJcCA9IHBhcmFtT2JqLmhvc3RJcDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1PYmoub3NCdWlsZE1vZGVsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzeXMub3NCdWlsZE1vZGVsID0gcGFyYW1PYmoub3NCdWlsZE1vZGVsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbU9iai5vc0J1aWxkVmVyc2lvblNESylcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3lzLm9zQnVpbGRWZXJzaW9uU0RLID0gcGFyYW1PYmoub3NCdWlsZFZlcnNpb25TREs7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtT2JqLm9zQnVpbGRWZXJzaW9uUmVsZWFzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3lzLm9zQnVpbGRWZXJzaW9uUmVsZWFzZSA9IHBhcmFtT2JqLm9zQnVpbGRWZXJzaW9uUmVsZWFzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtT2JqLm5hdGl2ZUxvZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmF0aXZlTG9nTnVtID0gTnVtYmVyKHBhcmFtT2JqLm5hdGl2ZUxvZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYXRpdmVMb2dOdW0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN5cy5uYXRpdmVMb2cgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3lzLm5hdGl2ZUxvZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbU9iai5idW5kbGVOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN5cy5idW5kbGVOYW1lID0gcGFyYW1PYmouYnVuZGxlTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtT2JqLnBsYXRmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYXRpdmVQbGF0Zm9ybSA9IHBhcmFtT2JqLnBsYXRmb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN5cy5uYXRpdmVQbGF0Zm9ybSA9IG5hdGl2ZVBsYXRmb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1PYmouaXNJcGhvbmVYKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpcGhvbmVYRmxhZyA9IHBhcmFtT2JqLmlzSXBob25lWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE51bWJlcihpcGhvbmVYRmxhZykgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN5cy5pc0lwaG9uZVggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1PYmouYXBwQ29uc3RVcmwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3lzLmFwcENvbnN0VXJsID0gcGFyYW1PYmouYXBwQ29uc3RVcmxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbU9iai5hcHBDb25zdEJhY2t1cFVybClcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3lzLmFwcENvbnN0QmFja3VwVXJsID0gcGFyYW1PYmouYXBwQ29uc3RCYWNrdXBVcmw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbU9iai5hcHBDb25zdEJhY2t1cFVybDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN5cy5hcHBDb25zdEJhY2t1cFVybDEgPSBwYXJhbU9iai5hcHBDb25zdEJhY2t1cFVybDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbU9iai5hcHBDb25zdFVybEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhcHBDb25zdFVybEFycmF5ID0gSlNPTi5wYXJzZShwYXJhbU9iai5hcHBDb25zdFVybEFycmF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFwcENvbnN0VXJsQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN5cy5hcHBDb25zdFVybEFycmF5ID0gR2xvYmFsLlVybFV0aWwuZGVhbEZ1bGxVcmxXaXRoTXV0aUxpbmVzU2FtZUhvc3QoYXBwQ29uc3RVcmxBcnJheSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtT2JqLmFwcElEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN5cy5hcHBJRCA9IHBhcmFtT2JqLmFwcElEXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbU9iai5zdWJQbGF0Zm9ybUlEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN5cy5zdWJQbGF0Zm9ybUlEID0gcGFyYW1PYmouc3ViUGxhdGZvcm1JRFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1PYmouYXBwTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzeXMuYXBwTmFtZSA9IHBhcmFtT2JqLmFwcE5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbU9iai56aXBNb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgemlwTW9kZWwgPSBwYXJhbU9iai56aXBNb2RlbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE51bWJlcih6aXBNb2RlbCkgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN5cy56aXBNb2RlbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbU9iai53eEtleSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3lzLnd4S2V5ID0gcGFyYW1PYmoud3hLZXk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtT2JqLmpwdXNoS2V5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzeXMuanB1c2hLZXkgPSBwYXJhbU9iai5qcHVzaEtleTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1PYmouYXBwU2lnbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3lzLmFwcFNpZ24gPSBwYXJhbU9iai5hcHBTaWduO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocGFyYW1PYmouc2ltdWxhdG9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3lzLnNpbXVsYXRvciA9IHBhcmFtT2JqLnNpbXVsYXRvcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcmFtT2JqLmhhbGxTa2luKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3lzLmhhbGxTa2luID0gcGFyYW1PYmouaGFsbFNraW47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcmFtT2JqLmdhbWVTa2luKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3lzLmdhbWVTa2luID0gcGFyYW1PYmouZ2FtZVNraW47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcmFtT2JqLnBhY2thZ2VUYWcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzeXMucGFja2FnZVRhZyA9IHBhcmFtT2JqLnBhY2thZ2VUYWc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8v55Sf5Lqn5Y6C5ZWGXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtT2JqLmRldmljZUJyYW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzeXMuZGV2aWNlQnJhbmQgPSBwYXJhbU9iai5kZXZpY2VCcmFuZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RvcmFnZVVpZCA9IEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2UuZ2V0KEhhbGxTdG9yYWdlS2V5LlVpZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0b3JhZ2VTdnJJZCA9IEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2UuZ2V0KEhhbGxTdG9yYWdlS2V5LlNlcnZlckRldmljZUlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RvcmFnZVN2cklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzeXMuc2VydmVyX2lkID0gc3RvcmFnZVN2cklkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/ogIHnjqnlrrZcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0b3JhZ2VVaWQgJiYgKHN0b3JhZ2VTdnJJZCA9PSBudWxsIHx8IHN0b3JhZ2VTdnJJZCA9PSBcIlwiIHx8IHN0b3JhZ2VTdnJJZCA9PSAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3lzLnNlcnZlcl9pZCA9IHBhcmFtT2JqLmRldmljZUlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzeXMuZGV2aWNlQnJhbmQgPSBcIkFwcGxlXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socmV0T2JqKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gbGV0IHN5c0luZm8gPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvO1xyXG5cclxuICAgICAgICAgICAgLy8gc3lzSW5mby5kZXZpY2VJZCA9IGRldmljZWlkO1xyXG4gICAgICAgICAgICAvLyBMb2dnZXIuZXJyb3IoR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5kZXZpY2VJZCk7XHJcbiAgICAgICAgICAgIC8vIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAvLyAgICAgY2FsbGJhY2sobnVsbClcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE9wZW5JbnN0YWxsRGF0YShjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5uYXRpdmVDYWxsQXN5bmMoXCJnZXRPcGVuSW5zdGFsbERhdGFcIiwgbnVsbCwgKHJldE9iaikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmV0T2JqLnJlc3VsdCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9IHJldE9iai5mdW5jUGFyYW1cclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImdldE9wZW5JbnN0YWxsRGF0YeWksei0pVwiKVxyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbClcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFNoYXJldHJhY2VEYXRhKGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLm5hdGl2ZUNhbGxBc3luYyhcImdldFNoYXJldHJhY2VEYXRhXCIsIG51bGwsIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgaWYgKHJldE9iai5yZXN1bHQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSByZXRPYmouZnVuY1BhcmFtXHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhjb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBMb2dnZXIuZXJyb3IoXCJnZXRTaGFyZUluc3RhbGxEYXQg5aSx6LSlYVwiKVxyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbClcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXJ0V1hMb2dpbihjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5uYXRpdmVDYWxsQXN5bmMoXCJzdGFydFdYTG9naW5cIiwge3d4QXBwS2V5Okdsb2JhbC5TZXR0aW5nLldYX0FQUF9JRH0sIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXRPYmopO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGFydEZCTG9naW4oY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMubmF0aXZlQ2FsbEFzeW5jKFwic3RhcnRGQkxvZ2luXCIsIG51bGwsIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXRPYmopO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0gXHJcbiAgICAvL+aJk+W8gOebuOWGjFxyXG4gICAgcHVibGljIHN0YXJ0T3BlbkFsYnVtKGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLm5hdGl2ZUNhbGxBc3luYyhcIm9wZW5QaG90b3NcIiwgbnVsbCwgKHJldE9iaikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldE9iaik7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy/miZPlvIDnm7jmnLpcclxuICAgIHB1YmxpYyBzdGFydE9wZW5DYW1lcmEoY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMubmF0aXZlQ2FsbEFzeW5jKFwib3BlblRha2VQaG90b1wiLCBudWxsLCAocmV0T2JqKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmV0T2JqKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAvKirku440MDAwMeeJiOacrOW8gOWni+aJjeacieeahOaWueazlVxyXG4gICAgICog5omT5byA55u45YaMXHJcbiAgICAgKiBAcGFyYW0gdXBsb2FkV2F5ICAg6KeG6aKR5LiK5Lyg55qE5pa55byPIDEuIGpz5pa55byP5a6e546wIDIu5Y6f55Sf5a6e546wICDpu5jorqTnrKwy56eN5pa55byPLOesrOS4gOenjeacquWunueOsFxyXG4gICAgICogQHBhcmFtIHZpZGVvTWF4c2l6ZSAgIOinhumikeS4iuS8oOeahOmZkOWItuWkp+Wwj++8jOWNleS9jeS4uktC77yM6buY6K6kNTEyMDBLQig1ME1CKe+8jOS8oDDmmK/kuI3pmZDliLblpKflsI9cclxuICAgICAqIEBwYXJhbSB2aWRlb0R1cmF0aW9uICAg6KeG6aKR5LiK5Lyg55qE5pe26ZW/6ZmQ5Yi277yM6buY6K6k5Li6MTIw56eSXHJcbiAgICAgKiBAcGFyYW0gaW1hZ2VNYXhzaXplICDlm77niYfkuIrkvKDnmoTpmZDliLblpKflsI/vvIzljZXkvY3kuLpLQu+8jOm7mOiupDIwMEtC77yM5LygMOaYr+S4jemZkOWItuWkp+Wwj1xyXG4gICAgICogQHBhcmFtIHRodW1iTWF4c2l6ZSDnvKnnlaXlm77kuIrkvKDnmoTpmZDliLblpKflsI/vvIzljZXkvY3kuLpLQu+8jOm7mOiupDEwMEtCIO+8jOS8oDDmmK/kuI3pmZDliLblpKflsI9cclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDlm57osINcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5zdGFydE9wZW5BbGJ1bSh1cGxvYWRXYXk6bnVtYmVyPTIsIHZpZGVvTWF4c2l6ZTpudW1iZXI9NTEyMDAsdmlkZW9EdXJhdGlvbjpudW1iZXI9MTIwLGltYWdlTWF4c2l6ZTpudW1iZXI9MjAwLHRodW1iTWF4c2l6ZTpudW1iZXI9MTAwLGNhbGxiYWNrPzogRnVuY3Rpb24pIHsgXHJcbiAgICAgICAgLy9hbGlvc3PnmoTphY3nva5cclxuICAgICAgICBsZXQgdXNlcmlkID0gR2xvYmFsLkNoYXRTZXJ2ZXIudXNlcmlkXHJcbiAgICAgICAgbGV0IHRva2VuID0gR2xvYmFsLkNoYXRTZXJ2ZXIudG9rZW5cclxuICAgICAgICBsZXQgZW5kcG9pbnQgPSAgR2xvYmFsLlNldHRpbmcuYWxpb3NzX2VuZHBvaW50XHJcbiAgICAgICAgbGV0IHN0c3NlcnZlciA9IFwiaHR0cHM6Ly9cIitHbG9iYWwuQ2hhdFNlcnZlci5odXJsK1wiL2xvZ2luL29zc0F1dGhvcml0eVwiXHJcbiAgICAgICAgbGV0IGJ1Y2tldCA9IEdsb2JhbC5TZXR0aW5nLmFsaW9zc19idWNrZXRcclxuICAgICAgICAvLyBHbG9iYWwuU2V0dGluZ1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSB7XCJ1cGxvYWRXYXlcIjp1cGxvYWRXYXksXCJ2aWRlb01heHNpemVcIjp2aWRlb01heHNpemUsXCJ2aWRlb0R1cmF0aW9uXCI6dmlkZW9EdXJhdGlvbixcImltYWdlTWF4c2l6ZVwiOmltYWdlTWF4c2l6ZSxcInRodW1iTWF4c2l6ZVwiOnRodW1iTWF4c2l6ZSxcclxuICAgICAgICBcInVzZXJpZFwiOnVzZXJpZCxcInRva2VuXCI6dG9rZW4sXCJlbmRwb2ludFwiOmVuZHBvaW50LFwic3Rzc2VydmVyXCI6c3Rzc2VydmVyLFwiYnVja2V0XCI6YnVja2V0fSBcclxuICAgICAgICB0aGlzLm5hdGl2ZUNhbGxBc3luYyhcIm9wZW5QaG90b3NcIiwgcGFyYW1zLCAocmV0T2JqKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmV0T2JqKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9IFxyXG4gICAgLyoq5LuONDAwMDHniYjmnKzlvIDlp4vmiY3mnInnmoTmlrnms5VcclxuICAgICAqIOaJk+W8gOebuOaculxyXG4gICAgICogQHBhcmFtIHVwbG9hZFdheSAgICDop4bpopHkuIrkvKDnmoTmlrnlvI8gMS4ganPmlrnlvI/lrp7njrAgMi7ljp/nlJ/lrp7njrAgIOm7mOiupOesrDLnp43mlrnlvI8s56ysMeenjeacquWunueOsFxyXG4gICAgICogQHBhcmFtIGltYWdlTWF4c2l6ZSDmi43nhaflm77niYfnmoTkuIrkvKDnmoTpmZDliLblpKflsI/vvIzljZXkvY3kuLpLQu+8jOm7mOiupDIwMEtC77yM5LygMOaYr+S4jemZkOWItuWkp+Wwj1xyXG4gICAgICogQHBhcmFtIHRodW1iTWF4c2l6ZSDnvKnnlaXlm77kuIrkvKDnmoTpmZDliLblpKflsI/vvIzljZXkvY3kuLpLQu+8jOm7mOiupDEwMEtCIO+8jFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrICDlm57osINcclxuICAgICAqL1xyXG4gICAgcHVibGljICBuc3RhcnRPcGVuQ2FtZXJhKHVwbG9hZFdheTpudW1iZXIsaW1hZ2VNYXhzaXplOm51bWJlcj0yMDAsdGh1bWJNYXhzaXplOm51bWJlcj0xMDAsY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIC8vYWxpb3Nz55qE6YWN572uXHJcbiAgICAgICAgbGV0IHVzZXJpZCA9IEdsb2JhbC5DaGF0U2VydmVyLnVzZXJpZFxyXG4gICAgICAgIGxldCB0b2tlbiA9IEdsb2JhbC5DaGF0U2VydmVyLnRva2VuXHJcbiAgICAgICAgbGV0IGVuZHBvaW50ID0gIEdsb2JhbC5TZXR0aW5nLmFsaW9zc19lbmRwb2ludFxyXG4gICAgICAgIGxldCBzdHNzZXJ2ZXIgPSAgXCJodHRwczovL1wiK0dsb2JhbC5DaGF0U2VydmVyLmh1cmwrXCIvbG9naW4vb3NzQXV0aG9yaXR5XCJcclxuICAgICAgICBsZXQgYnVja2V0ID0gR2xvYmFsLlNldHRpbmcuYWxpb3NzX2J1Y2tldFxyXG5cclxuICAgICAgICBsZXQgcGFyYW1zID0ge1widXBsb2FkV2F5XCI6dXBsb2FkV2F5LFwiaW1hZ2VNYXhzaXplXCI6aW1hZ2VNYXhzaXplLFwidGh1bWJNYXhzaXplXCI6dGh1bWJNYXhzaXplLFxyXG4gICAgICAgIFwidXNlcmlkXCI6dXNlcmlkLFwidG9rZW5cIjp0b2tlbixcImVuZHBvaW50XCI6ZW5kcG9pbnQsXCJzdHNzZXJ2ZXJcIjpzdHNzZXJ2ZXIsXCJidWNrZXRcIjpidWNrZXR9IFxyXG4gICAgICAgIHRoaXMubmF0aXZlQ2FsbEFzeW5jKFwib3BlblRha2VQaG90b1wiLCBwYXJhbXMsIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXRPYmopO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8v5Zu+54mH5Y6L57ypIOS8oOWFpUJhc2U2NFxyXG4gICAgcHVibGljIHN0YXJ0SW1hZ2VDb21wcmVzcyhpbWFnZVBhdGg6IHN0cmluZywgbWF4U2l6ZSwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBmdW5jUGFyYW0gPSB7fTtcclxuICAgICAgICBmdW5jUGFyYW1bXCJpbWFnZVBhdGhcIl0gPSBpbWFnZVBhdGg7XHJcbiAgICAgICAgZnVuY1BhcmFtW1wibWF4U2l6ZVwiXSA9IG1heFNpemU7XHJcbiAgICAgICAgdGhpcy5uYXRpdmVDYWxsQXN5bmMoXCJzdGFydEltYWdlQ29tcHJlc3NcIiwgZnVuY1BhcmFtLCAocmV0T2JqKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmV0T2JqKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvL2lPUyDkuJPnlKgg6I635Y+WaW5mby5wbGlzdCDlr7nlupTnmoRrZXkg55qE5YC8XHJcbiAgICBwdWJsaWMgZ2V0SW5mb1BsaXN0UGFyYW0oa2V5OiBzdHJpbmcsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgZnVuY1BhcmFtID0ge307XHJcbiAgICAgICAgZnVuY1BhcmFtW1wia2V5XCJdID0ga2V5O1xyXG4gICAgICAgIHRoaXMubmF0aXZlQ2FsbEFzeW5jKFwiZ2V0SW5mb1BsaXN0UGFyYW1cIiwgZnVuY1BhcmFtLCAocmV0T2JqKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmV0T2JqKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvL+WuieWNk+S4k+eUqCDojrflj5bmiYvmnLrkuIrmiYDmnInlronoo4XnmoRhcHDliJfooahcclxuICAgIHB1YmxpYyBnZXRBbmRyb2lkQXBwSWRzKGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgZnVuY1BhcmFtID0ge307XHJcbiAgICAgICAgdGhpcy5uYXRpdmVDYWxsQXN5bmMoXCJnZXRBbmRyb2lkQXBwSWRzXCIsIGZ1bmNQYXJhbSwgKHJldE9iaikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldE9iaik7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgICAvL+iOt+WPluacrOWcsOa4oOmBk+S/oeaBr1xyXG4gICAgcHVibGljIGdldExvY2FsSW5zdGFsbEluZm8oY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihcIj09PT09PT09PT09PT09PT09PT09PT09PWdldExvY2FsSW5zdGFsbEluZm9cIik7XHJcbiAgICAgICAgdGhpcy5uYXRpdmVDYWxsQXN5bmMoXCJnZXRMb2NhbEluc3RhbGxJbmZvXCIsIG51bGwsIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXRPYmopO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8v57KY6LS05paH5pys5Yiw5Ymq5YiH5p2/XHJcbiAgICBwdWJsaWMgY29weVRleHRUb0NsaXBib2FyZCh0eHQ6IHN0cmluZywgY2FsbGJhY2s/OiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGxldCBmdW5jUGFyYW0gPSB7fTtcclxuICAgICAgICBmdW5jUGFyYW1bXCJ0eHRcIl0gPSB0eHQ7XHJcbiAgICAgICAgdGhpcy5uYXRpdmVDYWxsU3luYyhcImNvcHlUZXh0VG9DbGlwYm9hcmRcIiwgZnVuY1BhcmFtLCAocmV0T2JqKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmV0T2JqKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy/miZPlvIDoib7niblBcHBcclxuICAgIHB1YmxpYyBvcGVuQWl0ZUFwcChhdEFwcEtleTogc3RyaW5nLCBhdFVpZDogc3RyaW5nLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IGZ1bmNQYXJhbSA9IHt9O1xyXG4gICAgICAgIGZ1bmNQYXJhbVtcImF0QXBwS2V5XCJdID0gYXRBcHBLZXk7XHJcbiAgICAgICAgZnVuY1BhcmFtW1wiYXRVaWRcIl0gPSBhdFVpZDtcclxuICAgICAgICB0aGlzLm5hdGl2ZUNhbGxTeW5jKFwib3BlbkFpdGVBcHBcIiwgZnVuY1BhcmFtLCAocmV0T2JqKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmV0T2JqKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy/llKTphpLlvq7kv6FcclxuICAgIHB1YmxpYyBhd2FrZVdlY2hhdEFwcChjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKCFBcHBIZWxwZXIuY2hlY2tQbGF0Zm9ybVdYRW5hYmxlKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5hdGl2ZUNhbGxTeW5jKFwiYXdha2VXZWNoYXRBcHBcIiwgbnVsbCwgKHJldE9iaikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldE9iaik7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy/llKTphpJRUVxyXG4gICAgcHVibGljIGF3YWtlUVFBcHAoY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMubmF0aXZlQ2FsbFN5bmMoXCJhd2FrZVFRQXBwXCIsIG51bGwsIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXRPYmopO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL+WUpOmGkuaUr+S7mOWunVxyXG4gICAgcHVibGljIGF3YWtlQUxpUGF5QXBwKGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLm5hdGl2ZUNhbGxTeW5jKFwiYXdha2VBTGlQYXlBcHBcIiwgbnVsbCwgKHJldE9iaikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldE9iaik7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy/llKTphpJmYWNlYm9va1xyXG4gICAgcHVibGljIGF3YWtlRkJBcHAoY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMubmF0aXZlQ2FsbFN5bmMoXCJhd2FrZUZCQXBwXCIsIG51bGwsIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXRPYmopO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8v5qOA5p+l5b6u5L+h5piv5ZCm5a6J6KOFXHJcbiAgICBwdWJsaWMgY2hlY2tXWEluc3RhbGwoY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmICghQXBwSGVscGVyLmNoZWNrUGxhdGZvcm1XWEVuYWJsZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5uYXRpdmVDYWxsU3luYyhcImNoZWNrV1hJbnN0YWxsXCIsIHt3eEFwcEtleTpHbG9iYWwuU2V0dGluZy5XWF9BUFBfSUR9LCAocmV0T2JqKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmV0T2JqKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5qOA5p+lZmFjZWJvb2vmmK/lkKblronoo4VcclxuICAgIHB1YmxpYyBjaGVja0ZCSW5zdGFsbChjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5uYXRpdmVDYWxsU3luYyhcImNoZWNrRkJJbnN0YWxsXCIsIG51bGwsIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXRPYmopO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/mo4DmtYvmlK/ku5jlrp3mmK/lkKblronoo4VcclxuICAgIHB1YmxpYyBjaGVja0FsaVBheUluc3RhbGxlZChjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKEdsb2JhbC5Ub29sa2l0LmNoZWNrSXNQbGF0Zm9ybVNob3daaGlmdWJhbygpID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGxldCByZXRPYmogPSB7IHJlc3VsdDogLTEgfVxyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldE9iailcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmF0aXZlQ2FsbFN5bmMoXCJjaGVja0FsaVBheUluc3RhbGxlZFwiLCBudWxsLCAocmV0T2JqKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmV0T2JqKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy/pgIDlh7rmuLjmiI9cclxuICAgIHB1YmxpYyBvbkV4aXRHYW1lKGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLm5hdGl2ZUNhbGxTeW5jKFwib25FeGl0R2FtZVwiLCBudWxsLCBudWxsKVxyXG4gICAgfVxyXG5cclxuICAgIC8v6Kej5a+Gc3RyaW5nXHJcbiAgICBwdWJsaWMgZGVjcnlwdERhdGEoZW5jcnlwdERhdGE6IHN0cmluZywgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCByZXREYXRhID0gR2xvYmFsLk5hdGl2ZUpTQkJyaWRnZS5kZWNyeXB0RGF0YShlbmNyeXB0RGF0YSlcclxuICAgICAgICBpZiAocmV0RGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgcmV0T2JqID0ge31cclxuICAgICAgICAgICAgcmV0T2JqW1wicmVzdWx0XCJdID0gMFxyXG4gICAgICAgICAgICByZXRPYmpbXCJmdW5jUGFyYW1cIl0gPSByZXREYXRhXHJcbiAgICAgICAgICAgIHJldHVybiByZXRPYmpcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6K6+572u55m95ZCN5Y2V5Z+f5ZCN77yM5LiN6L+b6KGM5Z+f5ZCN5qCh6aqMXHJcbiAgICAgKiBob3N0czog5pWw57uE55qEanNvbiAgc3RyaW5nXHJcbiAgICAgKiBcclxuICAgICAqICoqL1xyXG4gICAgcHVibGljIHNldFdoaXRlSG9zdHMoaG9zdHM6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBmdW5jUGFyYW0gPSB7fTtcclxuICAgICAgICBmdW5jUGFyYW1bXCJob3N0c1wiXSA9IGhvc3RzO1xyXG4gICAgICAgIGxldCByZXRPYmogPSB0aGlzLm5hdGl2ZUNhbGxTeW5jKFwic2V0V2hpdGVIb3N0c1wiLCBmdW5jUGFyYW0pXHJcbiAgICAgICAgcmV0dXJuIHJldE9ialxyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+WbG9naW5TaWduXHJcbiAgICBwdWJsaWMgZ2V0TG9naW5TaWduKHNpZ25fa2V5OiBzdHJpbmcsIGRldmljZUlkOiBzdHJpbmcsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgcmV0RGF0YSA9IEdsb2JhbC5OYXRpdmVKU0JCcmlkZ2UuZ2V0TG9naW5TaWduKHNpZ25fa2V5LCBkZXZpY2VJZClcclxuICAgICAgICBpZiAocmV0RGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgcmV0T2JqID0ge31cclxuICAgICAgICAgICAgcmV0T2JqW1wicmVzdWx0XCJdID0gMFxyXG4gICAgICAgICAgICByZXRPYmpbXCJmdW5jUGFyYW1cIl0gPSByZXREYXRhXHJcbiAgICAgICAgICAgIHJldHVybiByZXRPYmpcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZ1bmNQYXJhbSA9IHt9O1xyXG4gICAgICAgIGZ1bmNQYXJhbVtcInNpZ25fa2V5XCJdID0gc2lnbl9rZXk7XHJcbiAgICAgICAgZnVuY1BhcmFtW1wiZGV2aWNlSWRcIl0gPSBkZXZpY2VJZDtcclxuICAgICAgICBsZXQgcmV0T2JqID0gdGhpcy5uYXRpdmVDYWxsU3luYyhcImdldExvZ2luU2lnblwiLCBmdW5jUGFyYW0pXHJcblxyXG4gICAgICAgIHJldHVybiByZXRPYmpcclxuICAgIH1cclxuICAgIC8v5qOA5p+l5piv5ZCm5Y+v5Lul54Ot5pu0XHJcbiAgICAvLyBhcHBUZW1hSWQg77yaXCIzVVJCUlk2Mk5ZLmNvbS5kc3RhcnMuZW50ZXJwcmlzZVwiXHJcbiAgICBwdWJsaWMgY2hlY2tDYW5Ib3RVcGRhdGUoYXBwVGVtYUlkOiBzdHJpbmcsIGNhbGxiYWNrPzogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBsZXQgZnVuY1BhcmFtID0ge307XHJcbiAgICAgICAgZnVuY1BhcmFtW1wiYXBwVGVtYUlkXCJdID0gYXBwVGVtYUlkO1xyXG4gICAgICAgIHRoaXMubmF0aXZlQ2FsbFN5bmMoXCJjaGVja0NhbkhvdFVwZGF0ZVwiLCBmdW5jUGFyYW0sIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXRPYmopO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8v5byA5aeL5pu05pawXHJcbiAgICAvLyB1cGRhdGVVcmwgcGxpc3Tmlofku7blnLDlnYDvvJpcImh0dHBzOi8vZC50amV0eXQuY29tL3BhY2thZ2UvNTg4L21hbmlmZXN0LWNoMHMucGxpc3RcIlxyXG4gICAgcHVibGljIGhvdFVwZGF0ZUlQQSh1cGRhdGVVcmw6IHN0cmluZywgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBmdW5jUGFyYW0gPSB7fTtcclxuICAgICAgICBmdW5jUGFyYW1bXCJ1cGRhdGVVcmxcIl0gPSB1cGRhdGVVcmw7XHJcbiAgICAgICAgdGhpcy5uYXRpdmVDYWxsU3luYyhcImhvdFVwZGF0ZUlQQVwiLCBmdW5jUGFyYW0sIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXRPYmopO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL+WuieijhWFwa1xyXG4gICAgcHVibGljIGluc3RhbGxBcGsocGF0aDogc3RyaW5nLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IGZ1bmNQYXJhbSA9IHt9O1xyXG4gICAgICAgIGZ1bmNQYXJhbVtcInBhdGhcIl0gPSBwYXRoO1xyXG4gICAgICAgIHRoaXMubmF0aXZlQ2FsbFN5bmMoXCJpbnN0YWxsQXBrXCIsIGZ1bmNQYXJhbSwgKHJldE9iaikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldE9iaik7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy/mlK/ku5jlrp3orqLljZVcclxuICAgIHB1YmxpYyBwYXltZW50QWxpUGF5T3JkZXIob3JkZXJTdHI6IHN0cmluZywgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChHbG9iYWwuVG9vbGtpdC5jaGVja0lzUGxhdGZvcm1TaG93WmhpZnViYW8oKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuW9k+WJjeeJiOacrOS4jeaUr+aMgeatpOaUr+S7mOaWueW8jyFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZ1bmNQYXJhbSA9IHt9O1xyXG4gICAgICAgIGZ1bmNQYXJhbVtcIm9yZGVyU3RyXCJdID0gb3JkZXJTdHI7XHJcbiAgICAgICAgZnVuY1BhcmFtW1wicGFja2FnZU5hbWVcIl0gPSBHbG9iYWwuU2V0dGluZy5hbGlwYXlSZXBvcnRQYWNrYWdlTmFtZVxyXG4gICAgICAgIGlmKCBjYy5zeXMucGxhdGZvcm0gIT0gY2Muc3lzLklQSE9ORSAmJiFHbG9iYWwuVG9vbGtpdC5jaGVja1ZlcnNpb25TdXBwb3J0KDUwMDEzKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tUaW1lKClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5uYXRpdmVDYWxsQXN5bmMoXCJwYXltZW50QWxpUGF5T3JkZXJcIiwgZnVuY1BhcmFtLCAocmV0T2JqKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmV0T2JqKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrVGltZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy50aW1lcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmlzQmFja2dyb3VuZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLlvZPliY3niYjmnKzovoPkvY7vvIzor7fmgqjkuIvovb3mnIDmlrDniYjmnKzlkI7lhYXlgLzvvIHngrnlh7vigJznoa7lrprigJ3kuIvovb3mnIDmlrDniYjmnKzvvIzlj5bmtojor7flhbPpl61cIiwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnN5cy5vcGVuVVJMKEdsb2JhbC5TZXR0aW5nLlVybHMuZG93bkxvYWRVcmwpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMjAwMCk7XHJcbiAgICB9XHJcbiAgICAvL+W+ruS/oeiuouWNlVxyXG4gICAgcHVibGljIHBheW1lbnRXWFBheU9yZGVyKG9yZGVyU3RyOiBzdHJpbmcsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgZnVuY1BhcmFtID0ge307XHJcbiAgICAgICAgZnVuY1BhcmFtW1wib3JkZXJTdHJcIl0gPSBvcmRlclN0cjtcclxuICAgICAgICB0aGlzLm5hdGl2ZUNhbGxBc3luYyhcInBheW1lbnRXWFBheU9yZGVyXCIsIGZ1bmNQYXJhbSwgKHJldE9iaikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldE9iaik7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy/mlK/ku5jlrp1oNei9rE5hdGl2ZVxyXG4gICAgcHVibGljIGFsaVBheUludGVyY2VwdG9yV2l0aFVybChwYXlVcmw6IHN0cmluZywgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBmdW5jUGFyYW0gPSB7fTtcclxuICAgICAgICBmdW5jUGFyYW1bXCJwYXlVcmxcIl0gPSBwYXlVcmw7XHJcbiAgICAgICAgdGhpcy5uYXRpdmVDYWxsQXN5bmMoXCJwYXlJbnRlcmNlcHRvcldpdGhVcmxcIiwgZnVuY1BhcmFtLCAocmV0T2JqKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmV0T2JqKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvL+WFs+mXreaUr+S7mOWuneaUr+S7mGg1IHdlYnZpZXfpobXpnaJcclxuICAgIHB1YmxpYyBoaWRlQWxpUGF5V2ViVmlldyhjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IGZ1bmNQYXJhbSA9IHt9O1xyXG4gICAgICAgIHRoaXMubmF0aXZlQ2FsbFN5bmMoXCJoaWRlQWxpUGF5V2ViVmlld1wiLCBmdW5jUGFyYW0sIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXRPYmopO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL+aUr+S7mOWunWg1IOaOiOadg1xyXG4gICAgcHVibGljIGFsaVBheUF1dGhXaXRoVXJsKHBheVVybDogc3RyaW5nLCBhdHRhY2hfcGFyYW06IGFueSwgb3JkZXJObzogc3RyaW5nLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIi0tLS0tLS0tanMgYWxpUGF5QXV0aFdpdGhVcmwgY2FsbGVkISEhISBwYXlVcmwgPSBcIiArIHBheVVybClcclxuICAgICAgICBsZXQgc2VuZFVybCA9IEdsb2JhbC5IYWxsU2VydmVyLmdldEhhbGxTZW5kVXJsKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLlVzZXJOZXdEb3duUGF5QXR0YWNoKVxyXG4gICAgICAgIGxldCBodHRwU2lnbiA9IEdsb2JhbC5VcmxVdGlsLmdldEh0dHBSZWZmZXIoc2VuZFVybClcclxuICAgICAgICBsZXQgZnVuY1BhcmFtID0ge307XHJcbiAgICAgICAgZnVuY1BhcmFtW1wicGF5VXJsXCJdID0gcGF5VXJsO1xyXG4gICAgICAgIGZ1bmNQYXJhbVtcImF0dGFjaF9wYXJhbVwiXSA9IGF0dGFjaF9wYXJhbTtcclxuICAgICAgICBmdW5jUGFyYW1bXCJzZW5kVXJsXCJdID0gc2VuZFVybDtcclxuICAgICAgICBmdW5jUGFyYW1bXCJodHRwU2lnblwiXSA9IGh0dHBTaWduO1xyXG4gICAgICAgIGZ1bmNQYXJhbVtcIm9yZGVyTm9cIl0gPSBvcmRlck5vO1xyXG5cclxuICAgICAgICB0aGlzLm5hdGl2ZUNhbGxBc3luYyhcImFsaVBheUF1dGhXaXRoVXJsXCIsIGZ1bmNQYXJhbSwgKHJldE9iaikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldE9iaik7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy/mlK/ku5jlrp3mjojmnYPlj5ZhdXRoIGNvZGVcclxuICAgIHB1YmxpYyBhbGlQYXlBdXRoV2l0aEFwcElEKGFwcGlkOiBzdHJpbmcsIG9yZGVyTm86IHN0cmluZywgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBzZW5kVXJsID0gR2xvYmFsLkhhbGxTZXJ2ZXIuZ2V0SGFsbFNlbmRVcmwoTmV0QXBwZmFjZS5tb2QsIE5ldEFwcGZhY2UuVXNlck5ld0Rvd25QYXlBdHRhY2gpXHJcbiAgICAgICAgbGV0IGh0dHBTaWduID0gR2xvYmFsLlVybFV0aWwuZ2V0SHR0cFJlZmZlcihzZW5kVXJsKVxyXG4gICAgICAgIGxldCBmdW5jUGFyYW0gPSB7fTtcclxuICAgICAgICBmdW5jUGFyYW1bXCJhcHBpZFwiXSA9IGFwcGlkO1xyXG4gICAgICAgIGZ1bmNQYXJhbVtcIm9yZGVyTm9cIl0gPSBvcmRlck5vO1xyXG4gICAgICAgIGZ1bmNQYXJhbVtcInNlbmRVcmxcIl0gPSBzZW5kVXJsO1xyXG4gICAgICAgIGZ1bmNQYXJhbVtcImh0dHBTaWduXCJdID0gaHR0cFNpZ247XHJcbiAgICAgICAgdGhpcy5uYXRpdmVDYWxsQXN5bmMoXCJhbGlQYXlBdXRoV2l0aEFwcElEXCIsIGZ1bmNQYXJhbSwgKHJldE9iaikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldE9iaik7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v5pSv5LuY5a6d5o6I5p2D6YCa6L+HcGF5QXV0aEluZm9cclxuICAgIHB1YmxpYyBhbGlQYXlBdXRoV2l0aFBheUF1dGhJbmZvKHBheUF1dGhJbmZvOiBzdHJpbmcsIHBheVVybDogc3RyaW5nLCBvcmRlck5vOiBzdHJpbmcsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgc2VuZFVybCA9IEdsb2JhbC5IYWxsU2VydmVyLmdldEhhbGxTZW5kVXJsKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLlVzZXJOZXdEb3duUGF5QXR0YWNoKVxyXG4gICAgICAgIGxldCBodHRwU2lnbiA9IEdsb2JhbC5VcmxVdGlsLmdldEh0dHBSZWZmZXIoc2VuZFVybClcclxuICAgICAgICBsZXQgZnVuY1BhcmFtID0ge307XHJcbiAgICAgICAgZnVuY1BhcmFtW1wicGF5QXV0aEluZm9cIl0gPSBwYXlBdXRoSW5mbztcclxuICAgICAgICBmdW5jUGFyYW1bXCJwYXlVcmxcIl0gPSBwYXlVcmw7XHJcbiAgICAgICAgZnVuY1BhcmFtW1wib3JkZXJOb1wiXSA9IG9yZGVyTm87XHJcbiAgICAgICAgZnVuY1BhcmFtW1wic2VuZFVybFwiXSA9IHNlbmRVcmw7XHJcbiAgICAgICAgZnVuY1BhcmFtW1wiaHR0cFNpZ25cIl0gPSBodHRwU2lnbjtcclxuICAgICAgICBmdW5jUGFyYW1bXCJwYWNrYWdlTmFtZVwiXSA9IEdsb2JhbC5TZXR0aW5nLmFsaXBheVJlcG9ydFBhY2thZ2VOYW1lXHJcbiAgICAgICAgdGhpcy5uYXRpdmVDYWxsQXN5bmMoXCJhbGlQYXlBdXRoV2l0aFBheUF1dGhJbmZvXCIsIGZ1bmNQYXJhbSwgKHJldE9iaikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldE9iaik7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy9EUGF5U0RL5pSv5LuYXHJcbiAgICBwdWJsaWMgcGF5bWVudERQYXlXaXRoVG9rZW4odG9rZW46IHN0cmluZywgb3JkZXJObzogc3RyaW5nLCBsZV9wYXlfdXJsOiBzdHJpbmcsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgZnVuY1BhcmFtID0ge307XHJcbiAgICAgICAgZnVuY1BhcmFtW1wib3JkZXJOb1wiXSA9IG9yZGVyTm87XHJcbiAgICAgICAgZnVuY1BhcmFtW1widG9rZW5cIl0gPSB0b2tlbjtcclxuICAgICAgICBmdW5jUGFyYW1bXCJsZV9wYXlfdXJsXCJdID0gbGVfcGF5X3VybDtcclxuICAgICAgICB0aGlzLm5hdGl2ZUNhbGxBc3luYyhcInBheW1lbnREUGF5V2l0aFRva2VuXCIsIGZ1bmNQYXJhbSwgKHJldE9iaikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldE9iaik7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy9VUGF5U0RL5o6I5p2DXHJcbiAgICBwdWJsaWMgcGF5bWVudFVQYXlXaXRoVG9rZW4odG9rZW46IHN0cmluZywgb3JkZXJObzogc3RyaW5nLCBsZV9wYXlfdXJsOiBzdHJpbmcsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgZnVuY1BhcmFtID0ge307XHJcbiAgICAgICAgZnVuY1BhcmFtW1wib3JkZXJOb1wiXSA9IG9yZGVyTm87XHJcbiAgICAgICAgZnVuY1BhcmFtW1widG9rZW5cIl0gPSB0b2tlbjtcclxuICAgICAgICBmdW5jUGFyYW1bXCJsZV9wYXlfdXJsXCJdID0gbGVfcGF5X3VybDtcclxuICAgICAgICB0aGlzLm5hdGl2ZUNhbGxBc3luYyhcInBheW1lbnRVUGF5V2l0aFRva2VuXCIsIGZ1bmNQYXJhbSwgKHJldE9iaikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldE9iaik7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy9TREvmlK/ku5hcclxuICAgIHB1YmxpYyBwYXltZW50U0RLV2l0aFVybChwYXlTdHI6IHN0cmluZywgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBmdW5jUGFyYW0gPSB7fTtcclxuICAgICAgICBmdW5jUGFyYW1bXCJwYXlTdHJcIl0gPSBwYXlTdHI7XHJcbiAgICAgICAgdGhpcy5uYXRpdmVDYWxsQXN5bmMoXCJwYXltZW50U0RLV2l0aFVybFwiLCBmdW5jUGFyYW0sIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXRPYmopO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8vU0RL5pSv5LuYXHJcbiAgICBwdWJsaWMgcGF5TGliV2l0aFVybChwYXlTdHI6IHN0cmluZywgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBmdW5jUGFyYW0gPSB7fTtcclxuICAgICAgICBmdW5jUGFyYW1bXCJwYXlTdHJcIl0gPSBwYXlTdHI7XHJcbiAgICAgICAgdGhpcy5uYXRpdmVDYWxsQXN5bmMoXCJwYXlMaWJXaXRoVXJsXCIsIGZ1bmNQYXJhbSwgKHJldE9iaikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldE9iaik7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB2YWwgICB0cnVlIOaYr+WIh+aNouWIsOaoquWxj++8jCBmYWxzZSDmmK/liIfmjaLliLDnq5blsY9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoYW5nZU9yaWVudGF0aW9uSCh2YWwpIHtcclxuICAgICAgICBsZXQgZGlyID0gdmFsID8gXCJIXCIgOiBcIlZcIlxyXG4gICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpXHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlRm9yQW5kcm9pZCgnb3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwQWN0aXZpdHknLCAnc2V0T3JpZW50YXRpb24nLCAnKExqYXZhL2xhbmcvU3RyaW5nOylWJywgZGlyKVxyXG4gICAgICAgIGVsc2UgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgIGlmIChHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLm5hdGl2ZVBsYXRmb3JtID09ICdhcHBzdG9yZV9zZGt0eXBlJykge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZCgnUm9vdFZpZXdDb250cm9sbGVyJywgJ3NldE9yaWVudGF0aW9uOicsIGRpcilcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoJ0FwcENvbnRyb2xsZXInLCAnc2V0T3JpZW50YXRpb246JywgZGlyKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgbGV0IGZyYW1lU2l6ZSA9IGNjLnZpZXcuZ2V0RnJhbWVTaXplKClcclxuICAgICAgICBjb25zb2xlLmxvZygnZnJhbWVTaXplOiAnICsgZnJhbWVTaXplLndpZHRoICsgJyAgICcgKyBmcmFtZVNpemUuaGVpZ2h0KVxyXG4gICAgICAgIGlmICh2YWwgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgY2Mudmlldy5zZXRPcmllbnRhdGlvbihjYy5tYWNyby5PUklFTlRBVElPTl9QT1JUUkFJVClcclxuICAgICAgICAgICAgaWYgKGZyYW1lU2l6ZS53aWR0aCA+IGZyYW1lU2l6ZS5oZWlnaHQpXHJcbiAgICAgICAgICAgICAgICBjYy52aWV3LnNldEZyYW1lU2l6ZShmcmFtZVNpemUuaGVpZ2h0LCBmcmFtZVNpemUud2lkdGgpXHJcbiAgICAgICAgICAgIGNjLkNhbnZhcy5pbnN0YW5jZS5kZXNpZ25SZXNvbHV0aW9uID0gY2Muc2l6ZSg3MjAsIDEyODApXHJcbiAgICAgICAgICAgIC8vY2Mudmlldy5zZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSg3MjAsIDEyODAsIGNjLlJlc29sdXRpb25Qb2xpY3kuRklYRURfSEVJR0hUKVxyXG4gICAgICAgICAgICBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLm9yaWVudGF0aW9uTGFuZHNjYXBlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjYy52aWV3LnNldE9yaWVudGF0aW9uKGNjLm1hY3JvLk9SSUVOVEFUSU9OX0xBTkRTQ0FQRSlcclxuICAgICAgICAgICAgaWYgKGZyYW1lU2l6ZS5oZWlnaHQgPiBmcmFtZVNpemUud2lkdGgpXHJcbiAgICAgICAgICAgICAgICBjYy52aWV3LnNldEZyYW1lU2l6ZShmcmFtZVNpemUuaGVpZ2h0LCBmcmFtZVNpemUud2lkdGgpXHJcbiAgICAgICAgICAgIGNjLkNhbnZhcy5pbnN0YW5jZS5kZXNpZ25SZXNvbHV0aW9uID0gY2Muc2l6ZSgxMjgwLCA3MjApXHJcbiAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8ub3JpZW50YXRpb25MYW5kc2NhcGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAvL2NjLnZpZXcuc2V0RGVzaWduUmVzb2x1dGlvblNpemUoMTI4MCwgNzIwLCBjYy5SZXNvbHV0aW9uUG9saWN5LkZJWEVEX0hFSUdIVClcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NjLmRpcmVjdG9yLnJlc3VtZSgpO1xyXG5cclxuICAgICAgICBpZiAod2luZG93LmpzYikgLy/miYvliqjosIPnlKjop6blj5EgV2RpZ2V0IOe7hOS7tumHjeaWsOW4g+WxgFxyXG4gICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgY2MuRXZlbnQuRXZlbnRDdXN0b20oJ3Jlc2l6ZScsIHRydWUpKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b6u5L+h5YiG5LqrXHJcbiAgICAgKiBAcGFyYW0gc2hhcmVUeXBlIOWIhuS6q+aWueW8j+aWueW8jzogMOW+ruS/oeWlveWPi++8jDHmnIvlj4vlnIjvvIwy5b6u5L+h5pS26JePXHJcbiAgICAgKiBAcGFyYW0gdHlwZSDliIbkuqvlhoXlrrnnsbvlnos6MeaWh+acrO+8jDLlm77niYfvvIwz5aOw6Z+z77yMNOinhumike+8jDXnvZHpobVcclxuICAgICAqIEBwYXJhbSB0aXRsZSDmoIfpophcclxuICAgICAqIEBwYXJhbSBmaWxlUGF0aCDmlofku7bot6/lvoQgXHJcbiAgICAgKiBAcGFyYW0gdXJsIFxyXG4gICAgICogQHBhcmFtIGRlcyDmj4/ov7BcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDlm57osIMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaGFyZVdYKHNoYXJlVHlwZTogbnVtYmVyLCB0eXBlOiBudW1iZXIsIHRpdGxlOiBzdHJpbmcsIGZpbGVQYXRoOiBzdHJpbmcsIHVybDogc3RyaW5nLCBkZXM6IHN0cmluZywgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChzaGFyZVR5cGUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJzaGFyZVdYIHBhcmFtIGlzIG51bGxcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRlYWxXWEV4Y2VwdGlvbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gNSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3B5VGV4dFRvQ2xpcGJvYXJkKHVybCwgKHJldFN0cikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXRTdHIucmVzdWx0ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLlpI3liLbmiJDlip/vvIzor7flvq7kv6HmiYvliqjliIbkuqvnu5nlpb3lj4vlk6bjgIJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXdha2VXZWNoYXRBcHAoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldFN0cik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuWkjeWItuWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLor7fmiKrlm77lkI7lvq7kv6HmiYvliqjliIbkuqvlk6YhXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WkhOeQhuW+ruS/oeWMheWQjeWSjOW+ruS/oWtleeS4jeS4gOiHtOmXrumimFxyXG4gICAgICAgIGlmIChBcHBIZWxwZXIuY2hlY2tXeGtleShmYWxzZSkgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgZGVhbFdYRXhjZXB0aW9uKClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICBzaGFyZVR5cGU6IHNoYXJlVHlwZSxcclxuICAgICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgICAgICBmaWxlUGF0aDogZmlsZVBhdGgsXHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogZGVzLFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5hdGl2ZUNhbGxBc3luYyhcInNoYXJlV1hcIiwgcGFyYW0sIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IE51bWJlcihyZXRPYmoucmVzdWx0KTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PSAtMTAwMCB8fCByZXN1bHQgPT0gLTEwMDAuMCkge1xyXG4gICAgICAgICAgICAgICAgZGVhbFdYRXhjZXB0aW9uKClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldE9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB1cmwg55m+6IOc55qE6L+e5o6lXHJcbiAgICAgKiBAcGFyYW0gc2NoZW1hICDopoHmi6bmiKrnmoRzaGVtYVxyXG4gICAgICogQHBhcmFtIGFjdGlvblZpZXdIaWRkZW4gIOaYr+WQpumakOiXj+WOn+eUn+WKn+iDveaMiemSriAw5piv5LiN6ZqQ6JeP77yMMeaYr+makOiXj1xyXG4gICAgICogQHBhcmFtIHN0eWxlICDljp/nlJ/lip/og73mjInpkq7nmoTmoLflvI8gMeWbuuWumuWcqOW3pui+uSAy5Y+v5Lul56e75Yqo55qE5rWu54K5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvcGVuQlModXJsOlN0cmluZyxzY2hlbWE6U3RyaW5nLGFjdGlvblZpZXdIaWRkZW46U3RyaW5nKXsgXHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcInVybFwiOnVybCxcInNjaGVtYVwiOnNjaGVtYSxcImFjdGlvblZpZXdIaWRkZW5cIjphY3Rpb25WaWV3SGlkZGVufVxyXG4gICAgICAgIHRoaXMubmF0aXZlQ2FsbEFzeW5jKFwib3BlbkJTXCIscGFyYW1zKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGNsb3NlQlMoKXtcclxuICAgICAgICB0aGlzLm5hdGl2ZUNhbGxBc3luYyhcImNsb3NlQlNcIix7fSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb3BlbkV4dGVybmFsR2FtZSh1cmw6U3RyaW5nLHNjaGVtYTpTdHJpbmcsYWN0aW9uVmlld0hpZGRlbjpTdHJpbmcsc3R5bGU6TnVtYmVyPTIsZGlyZWN0aW9uOk51bWJlciA9IC0xKXsgXHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcInVybFwiOnVybCxcInNjaGVtYVwiOnNjaGVtYSxcImFjdGlvblZpZXdIaWRkZW5cIjphY3Rpb25WaWV3SGlkZGVuLFwic3R5bGVcIjpzdHlsZSxcImRpcmVjdGlvblwiOmRpcmVjdGlvbn1cclxuICAgICAgICB0aGlzLm5hdGl2ZUNhbGxBc3luYyhcIm9wZW5FeHRlcm5hbEdhbWVcIixwYXJhbXMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgY2xvc2VFeHRlcm5hbEdhbWUoKXtcclxuICAgICAgICB0aGlzLm5hdGl2ZUNhbGxBc3luYyhcImNsb3NlRXh0ZXJuYWxHYW1lXCIse30pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmiYvmnLrnmoTpnIfliqggXHJcbiAgICAgKiBAcGFyYW0gbWlsbGlzZWNvbmRzIOmch+WKqOeahOaXtumVv++8jOWNleS9jeS4uuavq+enkizpu5jorqTkuLo0MDDmr6vnp5JcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBob25lVmlicmF0ZXMobWlsbGlzZWNvbmRzOiBOdW1iZXIgPSA0MDApIHtcclxuICAgICAgICBpZihjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUyB8fCAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEICYmIEdsb2JhbC5Ub29sa2l0LmNoZWNrVmVyc2lvblN1cHBvcnQoNjAwMDIpKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSB7IFwibWlsbGlzZWNvbmRzXCI6IG1pbGxpc2Vjb25kcyB9XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlQ2FsbEFzeW5jKFwicGhvbmVWaWJyYXRlc1wiLCBwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICAgLyoqXHJcbiAgICAgKiDlj5bmtojpnIfliqggXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwaG9uZVZpYnJhdGVzQ2FuY2VsKCl7XHJcbiAgICAgICAgaWYoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MgfHwgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCAmJiBHbG9iYWwuVG9vbGtpdC5jaGVja1ZlcnNpb25TdXBwb3J0KDYwMDAyKSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUNhbGxBc3luYyhcInZpYnJhdGVzQ2FuY2VsXCIse30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL3dlYnZpZXdqaWF6YWnliqDovb3nmoTlm57osIMgc3RhdGU65Yy65YiG5LiN5ZCM55qE5Zue6LCDIHVybDror7fmsYLnmoTov57mjqVcclxuICAgIHB1YmxpYyB3ZWJ2aWV3Q2FsbGJhY2soc3RhdGU6U3RyaW5nLHVybDpTdHJpbmcpe1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihcIndlYnZpZXdDYWxsYmFjayBzdGF0ZSA9IFwiICsgc3RhdGUgICsgXCIgdXJsID0gXCIgKyB1cmwpXHJcbiAgICAgICAgR2xvYmFsLldlYlZpZXdDb250cm9sLm5hdGl2ZTJKU0NhbGxiYWNrKHN0YXRlLHVybClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE5hdGl2ZUV2ZW50c+inhuiur+ebuOWFs+WkhOeQhlxyXG4gICAgICogQHBhcmFtIG9iaiDlj4LmlbDliJfooajlr7nosaEsIOWGheWuueWMheaLrO+8mlxyXG4gICAgICogIHtcclxuICAgICAgICAgICAgb3B0aW9uOlwic3RhcnRcIiwgLy9zdGFydCwgcmVsZWFzZSwgc3RvcCwgcGF1c2UsIGNvbnRpbnVlXHJcbiAgICAgICAgICAgIHVybDpcIlwiLFxyXG4gICAgICAgICAgICB4OlwiMFwiLFxyXG4gICAgICAgICAgICB5OlwiMFwiLFxyXG4gICAgICAgICAgICByaWdodDpcIjBcIixcclxuICAgICAgICAgICAgYm90dG9tOlwiMFwiLFxyXG4gICAgICAgICAgICB3aWR0aDpcIjBcIixcclxuICAgICAgICAgICAgaGVpZ2h0OlwiMFwiXHJcbiAgICAgICAgfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hpeHVuKG9iajogb2JqZWN0LCBjYWxsYmFjazogRnVuY3Rpb24gPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi6KeG6K6v5pqC5pe25Y+q5pSv5oyBYW5kcm9pZOWSjGlvc+WOn+eUn+W5s+WPsCEhIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2Muc3lzLm9zID09PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUNhbGxBc3luYyhcInNoaXh1blwiLCBvYmosIGNhbGxiYWNrKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUNhbGxBc3luYyhcInNoaXh1blwiLCBvYmosIGNhbGxiYWNrKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLop4borq/mmoLkuI3mlK/mjIHpmaRhbmRyb2lk5ZKMaW9z5Lul5aSW55qE5YW25LuW5bmz5Y+wISEhXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL0B0b2RvIOacrOWcsOW8gOWFs+aOp+WItlxyXG4gICAgcHVibGljIG5hdGl2ZUxvZyhpc09wZW5Mb2c6IGJvb2xlYW4pIHtcclxuICAgICAgICBsZXQgZnVuY1BhcmFtID0ge307XHJcbiAgICAgICAgbGV0IG9wZW5Mb2dUYWcgPSAxO1xyXG4gICAgICAgIGlmIChpc09wZW5Mb2cpIHtcclxuICAgICAgICAgICAgb3BlbkxvZ1RhZyA9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3BlbkxvZ1RhZyA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmNQYXJhbVtcIm9wZW5sb2dcIl0gPSBvcGVuTG9nVGFnO1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihcIm5hdGl2ZUxvZz09PT09PT09b3BlbkxvZ1RhZyBcIiArIG9wZW5Mb2dUYWcpXHJcbiAgICAgICAgdGhpcy5uYXRpdmVDYWxsU3luYyhcIm5hdGl2ZUxvZ1wiLCBmdW5jUGFyYW0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8v6Kej5Y6L5YyF5pON5L2cXHJcbiAgICBwdWJsaWMgdW56aXBIYWxsUGFja2FnZSgpIHtcclxuICAgICAgICB0aGlzLm5hdGl2ZUNhbGxTeW5jKFwidW56aXBIYWxsUGFja2FnZVwiKVxyXG4gICAgfVxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIGh0dHBETlMgc3RhcnQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBodHRwRE5TXHJcbiAgICAgKiDlm73lhoXvvJplZGdlLndzaHR0cGRucy5jb21cclxuICAgICAqIOWbveWklu+8mjIyMC4yNDIuNTQuOFxyXG4gICAgICogXHJcbiAgICAgKiBcclxuICAgICAqICoqKioqKiovXHJcblxyXG4gICAgcHVibGljIHN0YXJ0UmVxdWVzdCh1cmxzLCBjYWxsYmFjaz8pIHtcclxuICAgICAgICBpZiAodXJscyA9PSBudWxsICYmIHVybHMubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgdXJsc1N0ciA9IHVybHMuam9pbihcIjtcIik7XHJcbiAgICAgICAgbGV0IGludGVybmFsSHR0cEROU1VybCA9IFwiZWRnZS53c2h0dHBkbnMuY29tXCJcclxuICAgICAgICBsZXQgZm9yZWlnbkh0dHBETlNVcmwgPSBcIjIyMC4yNDIuNTQuOFwiO1xyXG4gICAgICAgIGxldCBtYXA6IHsgW2lkeDogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcclxuICAgICAgICBtYXBbXCJodHRwRG5zXCJdID0gaW50ZXJuYWxIdHRwRE5TVXJsXHJcbiAgICAgICAgbWFwW1wiZG9tYWluVXJsXCJdID0gdXJsc1N0cjtcclxuICAgICAgICB0aGlzLm5hdGl2ZUNhbGxBc3luYyhcInN0YXJ0UmVxdWVzdFwiLCBtYXAsIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgaWYgKHJldE9iai5yZXN1bHQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy9jb250ZW50IOS4uiAxIOato+W4uO+8jGNvbnRlbnQg5Li6MOihqOekuue9keWuv+acjeWKoeWZqOW8guW4uFxyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSByZXRPYmouZnVuY1BhcmFtXHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJzdGFydFJlcXVlc3QgZnVuY1BhcmFtID0gXCIgKyBjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0QWdhaW4oZm9yZWlnbkh0dHBETlNVcmwsIHVybHNTdHIpXHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soY29udGVudCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v5re75Yqg5YaN5qyh6K+35rGCaHR0cEROU1xyXG4gICAgcHJpdmF0ZSByZXF1ZXN0QWdhaW4oaHR0cEROU1VybCwgZG9tYWluVXJsLCBjYWxsYmFjaz8pIHtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoXCJyZXF1ZXN0QWdhaW4gaHR0cEROU1VybCA9IFwiICsgaHR0cEROU1VybCArIFwiIGRvbWFpblVybCA9IFwiICsgZG9tYWluVXJsKVxyXG4gICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgaHR0cERuczogaHR0cEROU1VybCxcclxuICAgICAgICAgICAgZG9tYWluVXJsOiBkb21haW5VcmxcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5uYXRpdmVDYWxsQXN5bmMoXCJyZXF1ZXN0QWdhaW5cIiwgcGFyYW0sIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgaWYgKHJldE9iai5yZXN1bHQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZ1bmNQYXJhbSA9IHJldE9iai5mdW5jUGFyYW1cclxuICAgICAgICAgICAgICAgIC8vY29udGVudCDkuLogMSDmraPluLjvvIxjb250ZW50IOS4ujDooajnpLrnvZHlrr/mnI3liqHlmajlvILluLhcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInJlcXVlc3RBZ2FpbiBmdW5jUGFyYW0gPSBcIiArIGZ1bmNQYXJhbSlcclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhmdW5jUGFyYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlgZzmjolodHRwRE5T5o6l5Y+jXHJcbiAgICAgKiBcclxuICAgICAqICoqL1xyXG4gICAgcHVibGljIHN0b3BIdHRwRE5TKCkge1xyXG4gICAgICAgIHRoaXMubmF0aXZlQ2FsbFN5bmMoXCJzdG9wSHR0cEROU1wiKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75YqgaHR0cEROU+Wfn+WQjeWvueW6lOeahGlwXHJcbiAgICAgKiBcclxuICAgICAqICoqKi9cclxuICAgIHB1YmxpYyBhZGREb21haW5IdHRwRE5TSVAoZG9tYWluTmFtZSwgaXAsIGNhbGxiYWNrPykge1xyXG4gICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgZG9tYWluTmFtZTogZG9tYWluTmFtZSxcclxuICAgICAgICAgICAgaXA6IGlwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmF0aXZlQ2FsbFN5bmMoXCJhZGREb21haW5IdHRwRE5TSVBcIiwgcGFyYW0sIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgaWYgKHJldE9iai5yZXN1bHQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJhZGREb21haW5IdHRwRE5TSVA9PT09PT09PXJlc3VsdCAhPTAgXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Z+f5ZCN5LiL55qEaXDmlbDnu4RcclxuICAgICAqIFxyXG4gICAgICogKioqL1xyXG4gICAgcHVibGljIGdldEh0dHBEbnNJUHNCeURvbWFpbk5hbWUoZG9tYWluTmFtZTogc3RyaW5nLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICBkb21haW5OYW1lOiBkb21haW5OYW1lXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmF0aXZlQ2FsbFN5bmMoXCJnZXRIdHRwRG5zSVBzQnlEb21haW5OYW1lXCIsIHBhcmFtLCAocmV0T2JqKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldE9iaik7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruWfn+WQjeS4i+eahGlw5pWw57uEXHJcbiAgICAgKiBcclxuICAgICAqICoqKi9cclxuICAgIHB1YmxpYyBzZXRIdHRwRG5zSVBzQnlEb21haW5OYW1lKGRvbWFpbk5hbWU6IHN0cmluZywgaXBzOiBzdHJpbmcsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIGRvbWFpbk5hbWU6IGRvbWFpbk5hbWUsXHJcbiAgICAgICAgICAgIGlwczogaXBzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmF0aXZlQ2FsbFN5bmMoXCJzZXRIdHRwRG5zSVBzQnlEb21haW5OYW1lXCIsIHBhcmFtLCAocmV0T2JqKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldE9iaik7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rmh0dHAg6K+35rGC55qEaGVhZGVy5bGe5oCnIG1hcFxyXG4gICAgICogXHJcbiAgICAgKiAqKiovXHJcbiAgICBwdWJsaWMgc2V0UmVxdWVzdFByb3BlcnR5KHByb3BlcnR5czogc3RyaW5nLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICBwcm9wZXJ0eXM6IHByb3BlcnR5cyxcclxuICAgICAgICB9XHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKFwiY2FsbCBzZXRSZXF1ZXN0UHJvcGVydHkgOlwiLCBKU09OLnN0cmluZ2lmeShwYXJhbSkpXHJcbiAgICAgICAgdGhpcy5uYXRpdmVDYWxsU3luYyhcInNldFJlcXVlc3RQcm9wZXJ0eVwiLCBwYXJhbSwgKHJldE9iaikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXRPYmopO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmL/ph4zkupFodHRwRE5T5Yid5aeL5YyWXHJcbiAgICAgKiBAcGFyYW0gYWNjb3VudElEOui0puWPt2lkIHN0cmluZ1xyXG4gICAgICogKioqL1xyXG5cclxuICAgIHB1YmxpYyBpbml0QWxpY2xvdWRIdHRwRG5zKGFjY291bnRJRDogc3RyaW5nLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICBhY2NvdW50SUQ6IGFjY291bnRJRCxcclxuICAgICAgICB9XHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKFwiY2FsbCBpbml0QWxpY2xvdWRIdHRwRG5zIDpcIiwgSlNPTi5zdHJpbmdpZnkocGFyYW0pKVxyXG4gICAgICAgIHRoaXMubmF0aXZlQ2FsbFN5bmMoXCJpbml0QWxpY2xvdWRIdHRwRG5zXCIsIHBhcmFtLCAocmV0T2JqKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldE9iaik7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmL/ph4zkupFodHRwRE5TIOWwhmFwcOS9v+eUqOWIsOeahOWfn+WQjemihOiuvui/m+adpe+8jOS7peS+v+S6jkhUVFBETlMg6L+b6KGM6aKE6Kej5p6QXHJcbiAgICAgKiBAcGFyYW0gcHJlUmVzb2x2ZUhvc3RzOumihOWkhOeQhuWfn+WQjeaVsOe7hOi9rGpzb25cclxuICAgICAqXHJcbiAgICAgKiAqKiovXHJcblxyXG4gICAgcHVibGljIHNldFByZVJlc29sdmVIb3N0cyhwcmVSZXNvbHZlSG9zdHM6IHN0cmluZywgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgcHJlUmVzb2x2ZUhvc3RzOiBwcmVSZXNvbHZlSG9zdHMsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIExvZ2dlci5lcnJvcihcImNhbGwgc2V0UHJlUmVzb2x2ZUhvc3RzIDpcIiwgSlNPTi5zdHJpbmdpZnkocGFyYW0pKVxyXG4gICAgICAgIHRoaXMubmF0aXZlQ2FsbFN5bmMoXCJzZXRQcmVSZXNvbHZlSG9zdHNcIiwgcGFyYW0sIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmV0T2JqKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmYv+mHjOS6kWh0dHBETlMg5byC5q2l6Kej5p6Q5o6l5Y+j77yM6aaW5YWI5p+l6K+i57yT5a2Y77yM6Iul5a2Y5Zyo5YiZ6L+U5Zue57uT5p6c77yM6Iul5LiN5a2Y5Zyo6L+U5Zue56m65a2X56ym5Liy5bm25LiU6L+b6KGM5byC5q2l5Z+f5ZCN6Kej5p6Q5pu05paw57yT5a2YXHJcbiAgICAgKiBAcGFyYW0gaG9zdDrln5/lkI3lkI3np7BcclxuICAgICAqIEByZXR1cm4g5Z+f5ZCN5a+55bqU55qE6Kej5p6Q57uT5p6cXHJcbiAgICAgKiAqKiovXHJcbiAgICBwdWJsaWMgZ2V0SXBCeUhvc3RBc3luYyhob3N0OiBzdHJpbmcsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIGhvc3Q6IGhvc3QsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIExvZ2dlci5lcnJvcihcImNhbGwgZ2V0SXBCeUhvc3RBc3luYyA6XCIsIEpTT04uc3RyaW5naWZ5KHBhcmFtKSlcclxuICAgICAgICB0aGlzLm5hdGl2ZUNhbGxTeW5jKFwiZ2V0SXBCeUhvc3RBc3luY1wiLCBwYXJhbSwgKHJldE9iaikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXRPYmopO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmYv+mHjOS6kWh0dHBETlMg5byC5q2l6Kej5p6Q5o6l5Y+j77yM6aaW5YWI5p+l6K+i57yT5a2Y77yM6Iul5a2Y5Zyo5YiZ6L+U5Zue57uT5p6c5YiX6KGo77yM6Iul5LiN5a2Y5Zyo6L+U5Zue56m65YiX6KGo5bm25LiU6L+b6KGM5byC5q2l5Z+f5ZCN6Kej5p6Q5pu05paw57yT5a2YXHJcbiAgICAgKiBAcGFyYW0gaG9zdDrln5/lkI3lkI3np7BcclxuICAgICAqIEByZXR1cm4g6K+l5Z+f5ZCN5LiL55qESVDmlbDnu4QganNvbuWtl+espuS4slxyXG4gICAgICogKioqL1xyXG4gICAgcHVibGljIGdldElwc0J5SG9zdEFzeW5jKGhvc3Q6IHN0cmluZywgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgaG9zdDogaG9zdCxcclxuICAgICAgICB9XHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKFwiY2FsbCBnZXRJcHNCeUhvc3RBc3luYyA6XCIsIEpTT04uc3RyaW5naWZ5KHBhcmFtKSlcclxuICAgICAgICB0aGlzLm5hdGl2ZUNhbGxTeW5jKFwiZ2V0SXBzQnlIb3N0QXN5bmNcIiwgcGFyYW0sIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmV0T2JqKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBodHRwRE5TIGVuZCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBUX0R1biAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvKipcclxuICAgICog5Yid5aeL5YyWVOebvlxyXG4gICAgKiBAcGFyYW0ga2V5OlTnm75rZXlcclxuICAgICogQHJldHVybiBcclxuICAgICogKioqL1xyXG4gICAgcHVibGljIGluaXRURHVuU0RLKGtleSwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBwYXRoID0ganNiLmZpbGVVdGlscy5nZXRXcml0YWJsZVBhdGgoKTtcclxuICAgICAgICBsZXQgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICBwYXRoOiBwYXRoXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmF0aXZlQ2FsbEFzeW5jKFwiaW5pdFREdW5TREtcIiwgcGFyYW0sIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmV0T2JqKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDojrflj5ZURHVu5Yid5aeL5YyW57uT5p6c77yM5ZCM5q2l6LCD55SoXHJcbiAgICAqIEBwYXJhbSBcclxuICAgICogQHJldHVybiBcclxuICAgICogKioqL1xyXG4gICAgcHVibGljIGdldFREdW5Jbml0UmV0KCkge1xyXG4gICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICByZXR1cm4ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImR1blwiLCBcImdldEluaXRSZXRcIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMubmF0aXZlRm9yQW5kcm9pZChcImNvbS5kdW4uY29jb3NfYXBpXCIsIFwiZ2V0SW5pdFJldFwiLCBcIigpSVwiKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPllTnm77mjqXlj6NcclxuICAgICAqIEBwYXJhbSBrZXk6VOebvmtleVxyXG4gICAgICogQHJldHVybiBcclxuICAgICAqICoqKi9cclxuICAgIHB1YmxpYyBnZXRURHVuUG9ydChwb3J0KSB7XHJcbiAgICAgICAgbGV0IHBvcnROdW0gPSBOdW1iZXIocG9ydClcclxuICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJkdW5cIiwgXCJvY19nZXRwb3J0OlwiLCBwb3J0TnVtKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICBsZXQgZ2V0UG9ydCA9IHBhcnNlSW50KHRoaXMubmF0aXZlRm9yQW5kcm9pZChcImNvbS5kdW4uY29jb3NfYXBpXCIsIFwiZ2V0cG9ydFwiLCBcIihJKUlcIiwgcG9ydE51bSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0UG9ydDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogVF9EdW4gZW5kKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIFl1bl9EdW4gc3RhcnQgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLyoqXHJcbiAgICAqIOW8guatpeWIneWni+WMluS6keebvlxyXG4gICAgKiBAcGFyYW0ga2V5OlTnm75rZXlcclxuICAgICogQHJldHVybiBcclxuICAgICogKioqL1xyXG4gICAgcHVibGljIGluaXRZdW5EdW5TREsoYWNjZXNzS2V5LCB1dWlkLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICBhY2Nlc3NLZXk6IGFjY2Vzc0tleSxcclxuICAgICAgICAgICAgdXVpZDogdXVpZFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5hdGl2ZUNhbGxBc3luYyhcImluaXRZdW5EdW5TREtcIiwgcGFyYW0sIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmV0T2JqKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0WXVuRHVuU0RLU3luYyhhY2Nlc3NLZXksIHV1aWQpIHtcclxuICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJZdW5EdW5BcGlcIiwgXCJpbml0U3luYzp1dWlkOlwiLCBhY2Nlc3NLZXksIHV1aWQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLm5hdGl2ZUZvckFuZHJvaWQoXCJjb20uZHVuLll1bkR1bkFwaVwiLCBcImluaXRTeW5jXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylJXCIpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDojrflj5ZZdW5EdW7liJ3lp4vljJbnu5PmnpzvvIzlkIzmraXosIPnlKhcclxuICAgICogQHBhcmFtIFxyXG4gICAgKiBAcmV0dXJuIFxyXG4gICAgKiAqKiovXHJcbiAgICBwdWJsaWMgZ2V0WXVuRHVuSW5pdFJldCgpIHtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzQnJvd3NlcilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICByZXR1cm4ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIll1bkR1bkFwaVwiLCBcImdldEluaXRSZXRcIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMubmF0aXZlRm9yQW5kcm9pZChcImNvbS5kdW4uWXVuRHVuQXBpXCIsIFwiZ2V0SW5pdFJldFwiLCBcIigpSVwiKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5ZZdW5EdW7mjqXlj6NcclxuICAgICAqIEBwYXJhbSBob3N0OuWfn+WQjVxyXG4gICAgICogQHBhcmFtIHBvcnQ656uv5Y+jXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm4gXHJcbiAgICAgKiAqKiovXHJcbiAgICBwdWJsaWMgZ2V0WXVuRHVuU2VydmVySVBBbmRQb3J0KGhvc3QsIHBvcnQpIHtcclxuICAgICAgICBsZXQgcG9ydE51bSA9IE51bWJlcihwb3J0KVxyXG4gICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICByZXR1cm4ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIll1bkR1bkFwaVwiLCBcImdldFNlcnZlcklQQW5kUG9ydDpwb3J0OlwiLCBcIlwiLCBwb3J0TnVtKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICBsZXQgc2VydmVySVBBbmRQb3J0ID0gdGhpcy5uYXRpdmVGb3JBbmRyb2lkKFwiY29tLmR1bi5ZdW5EdW5BcGlcIiwgXCJnZXRTZXJ2ZXJJUEFuZFBvcnRcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7SSlMamF2YS9sYW5nL1N0cmluZztcIiwgXCJcIiwgcG9ydE51bSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzZXJ2ZXJJUEFuZFBvcnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDojrflj5ZZdW5EdW4g5a6i5oi356uvSVBcclxuICAgICogQHBhcmFtIFxyXG4gICAgKiBAcmV0dXJuIFxyXG4gICAgKiAqKiovXHJcbiAgICBwdWJsaWMgZ2V0WXVuRHVuQ2xpZW50SVAoKSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiWXVuRHVuQXBpXCIsIFwiZ2V0Q2xpZW50SVBcIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgbGV0IGNsaWVudElQID0gdGhpcy5uYXRpdmVGb3JBbmRyb2lkKFwiY29tLmR1bi5ZdW5EdW5BcGlcIiwgXCJnZXRDbGllbnRJUFwiLCBcIigpTGphdmEvbGFuZy9TdHJpbmc7XCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2xpZW50SVA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIFl1bl9EdW4gZW5kKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcblxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBaQV9EdW4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLyoqXHJcbiAgICAqIOWIneWni+WMllpB55u+XHJcbiAgICAqIEBwYXJhbSBrZXk6WkHnm75rZXlcclxuICAgICogQHJldHVybiBcclxuICAgICogKioqL1xyXG4gICAgcHVibGljIGluaXRaQUR1blNESyhrZXksIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5hdGl2ZUNhbGxBc3luYyhcImluaXRaQUR1blNES1wiLCBwYXJhbSwgKHJldE9iaikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXRPYmopO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOiOt+WPllpBRHVu5Yid5aeL5YyW57uT5p6c77yM5ZCM5q2l6LCD55SoXHJcbiAgICAqIEBwYXJhbSBcclxuICAgICogQHJldHVybiBcclxuICAgICogKioqL1xyXG4gICAgcHVibGljIGdldFpBRHVuSW5pdFJldCgpIHtcclxuICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJaQUFwaVwiLCBcImdldEluaXRSZXRcIik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMubmF0aXZlRm9yQW5kcm9pZChcImNvbS5kdW4uWkFBcGlcIiwgXCJnZXRJbml0UmV0XCIsIFwiKClJXCIpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WVOebvuaOpeWPo1xyXG4gICAgICogQHBhcmFtIGtleTpU55u+a2V5XHJcbiAgICAgKiBAcmV0dXJuIFxyXG4gICAgICogKioqL1xyXG4gICAgcHVibGljIGdldFpBRHVuUG9ydChwb3J0KSB7XHJcbiAgICAgICAgbGV0IHBvcnROdW0gPSBOdW1iZXIocG9ydClcclxuICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJaQUFwaVwiLCBcImdldFNlcnZlclBvcnQ6XCIsIHBvcnROdW0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGxldCBnZXRQb3J0ID0gcGFyc2VJbnQodGhpcy5uYXRpdmVGb3JBbmRyb2lkKFwiY29tLmR1bi5aQUFwaVwiLCBcImdldFNlcnZlclBvcnRcIiwgXCIoSSlJXCIsIHBvcnROdW0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIGdldFBvcnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WVOebvuaOpeWPo1xyXG4gICAgICogQHBhcmFtIGtleTpU55u+a2V5XHJcbiAgICAgKiBAcmV0dXJuIFxyXG4gICAgICogKioqL1xyXG4gICAgcHVibGljIGdldFpBRHVuUG9ydEJ5QWRkcihhZGRyLHBvcnQpIHtcclxuICAgICAgICBsZXQgcG9ydE51bSA9IE51bWJlcihwb3J0KVxyXG4gICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICByZXR1cm4ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIlpBQXBpXCIsIFwiZ2V0U2VydmVyUG9ydEJ5QWRkcjpwb3J0OlwiLCBhZGRyLHBvcnROdW0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGxldCBnZXRQb3J0ID0gcGFyc2VJbnQodGhpcy5uYXRpdmVGb3JBbmRyb2lkKFwiY29tLmR1bi5aQUFwaVwiLCBcImdldFNlcnZlclBvcnRCeUFkZHJcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7SSlJXCIsYWRkciwgcG9ydE51bSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0UG9ydDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogVF9EdW4gZW5kKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBBbGlfRHVuIHN0YXJ0KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLyoqXHJcbiAgICAqIOW8guatpeWIneWni+WMlumYv+mHjOebvlxyXG4gICAgKiBAcGFyYW0gYXBwa2V5XHJcbiAgICAqIEBwYXJhbSB0b2tlblxyXG4gICAgKiBcclxuICAgICogQHJldHVybiByZXRcclxuICAgICogKioqL1xyXG4gICBwdWJsaWMgaW5pdEFsaUR1blNESyhhcHBrZXksIHRva2VuLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICBsZXQgcGFyYW0gPSB7XHJcbiAgICAgICAgYXBwa2V5OiBhcHBrZXksXHJcbiAgICAgICAgdG9rZW46IHRva2VuXHJcbiAgICB9XHJcbiAgICB0aGlzLm5hdGl2ZUNhbGxBc3luYyhcImluaXRBbGlEdW5TREtcIiwgcGFyYW0sIChyZXRPYmopID0+IHtcclxuICAgICAgICBpZiAoY2FsbGJhY2spXHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHJldE9iaik7XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICAgICog6I635Y+WQWxpRHVu5Yid5aeL5YyW57uT5p6c77yM5ZCM5q2l6LCD55SoXHJcbiAgICAqIEBwYXJhbSBcclxuICAgICogQHJldHVybiBcclxuICAgICogKioqL1xyXG4gICBwdWJsaWMgZ2V0QWxpRHVuSW5pdFJldCgpIHtcclxuICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgIHJldHVybiBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiQWxpRHVuQXBpXCIsIFwiZ2V0SW5pdFJldFwiKTtcclxuICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMubmF0aXZlRm9yQW5kcm9pZChcImNvbS5kdW4uQWxpRHVuQXBpXCIsIFwiZ2V0SW5pdFJldFwiLCBcIigpSVwiKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAgICAgKiDojrflj5ZBbGlEdW7nm77mjqXlj6NcclxuICAgICAqIEBwYXJhbSBcclxuICAgICAqIEByZXR1cm4gXHJcbiAgICAgKiAqKiovXHJcbiAgICBwdWJsaWMgZ2V0QWxpRHVuUG9ydChob3N0SW5mbyxwb3J0KSB7XHJcbiAgICAgICAgbGV0IHBvcnRTdHIgPSBwb3J0LnRvU3RyaW5nKClcclxuICAgICAgICBsZXQgdG9rZW4gPSBob3N0SW5mby50b2tlblxyXG4gICAgICAgIGxldCBncm91cE5hbWUgPSBob3N0SW5mby5ncm91cE5hbWVcclxuICAgICAgICBsZXQgZG9tYWluTmFtZSA9IGhvc3RJbmZvLmRvbWFpbk5hbWVcclxuICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJBbGlEdW5BcGlcIiwgXCJnZXRTZXJ2ZXJQb3J0Omdyb3VwOmRvbWFpbjpwb3J0OlwiLCB0b2tlbixncm91cE5hbWUsZG9tYWluTmFtZSxwb3J0U3RyKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICBsZXQgZ2V0UG9ydCA9IHBhcnNlSW50KHRoaXMubmF0aXZlRm9yQW5kcm9pZChcImNvbS5kdW4uQWxpRHVuQXBpXCIsIFwiZ2V0U2VydmVyUG9ydFwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspTGphdmEvbGFuZy9TdHJpbmc7XCIsIHRva2VuLGdyb3VwTmFtZSxkb21haW5OYW1lLHBvcnRTdHIpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGdldFBvcnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIEFsaV9EdW4gZW5kKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICog5Yik5pat5piv5ZCm5pSv5oyB5ZOq5Liq55u+XHJcbiAgICAqIEBwYXJhbSBcclxuICAgICogQHJldHVybiBcclxuICAgICogKioqL1xyXG4gICAgcHVibGljIGlzU3VwcG9ydFNESyhzZGtOYW1lLCB2ZXJzaW9uPywgY2FsbGJhY2s/KSB7XHJcbiAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgbGV0IGFwcFZlcnNpb24gPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmFwcFZlcnNpb25cclxuICAgICAgICBsZXQgbnVtVmVyID0gTnVtYmVyKGFwcFZlcnNpb24pXHJcbiAgICAgICAgbGV0IHZhbHVlID0gc2RrTmFtZVxyXG4gICAgICAgIGlmICh2ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBcIl9cIiArIHZlcnNpb25cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICBjaGVja1ZhbHVlOiB2YWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5hdGl2ZUNhbGxTeW5jKFwiaXNTdXBwb3J0U0RLXCIsIHBhcmFtLCAocmV0T2JqKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldE9iaik7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAqIOajgOa1i+WuieWNk3Nka+aYr+WQpuWQr+eUqDrlj4LmlbDkvb/nlKjljIXlkI1cclxuICAgICogQHBhcmFtIOWPr+S9v+eUqOaemuS4vlNES19CVU5ETEXvvIzkuZ/lj6/nm7TmjqXkvKDlrZfnrKbkuLJcclxuICAgICogQHJldHVybiBcclxuICAgICogKioqL1xyXG4gICAgIHB1YmxpYyBDaGVja1Nka0J1bmRsZShidW5kbGVOYW1lKSB7XHJcbiAgICAgICAgbGV0IGNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmIChjYy5zeXMub3MgPT09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGNoZWNrZWQgPSBudWxsO1xyXG4gICAgICAgICAgICBsZXQgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICBidW5kbGU6IGJ1bmRsZU5hbWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUNhbGxTeW5jKFwiY2hlY2tCdW5kbGVcIiwgcGFyYW0sIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXRPYmoucmVzdWx0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNoZWNrZWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVja1Nka0J1bmRsZeaWueazleWPguaVsOeahOaemuS4vu+8jOWPr+aJqeWxlVxyXG4gKi9cclxuZW51bSBTREtfQlVORExFe1xyXG4gICAgQUxJUEFZID0gXCJjb20uYWxpcGF5LnNkay5hcHAuUGF5VGFza1wiLFxyXG59Il19