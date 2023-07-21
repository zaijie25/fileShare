
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/tool/Toolkit.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '645e2euCENDKpZAqduGse/w', 'Toolkit');
// hall/scripts/logic/core/tool/Toolkit.ts

"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var MD5_1 = require("../../../framework/libs/cryptoTs/algo/MD5");
var Hasher_1 = require("../../../framework/libs/cryptoTs/lib/Hasher");
var qrcode_1 = require("../../../framework/libs/qrcode");
var NetEvent_1 = require("../net/hall/NetEvent");
var HallStorageKey_1 = require("../../hallcommon/const/HallStorageKey");
var AppDunControl_1 = require("../../../framework/net/dun/AppDunControl");
var ReportTool_1 = require("../../../logic/core/tool/ReportTool");
var SceneManager_1 = require("../scene/SceneManager");
// import QRCodeTip from "../../hall/ui/waiting/QRCodeTip";
var Toolkit = /** @class */ (function () {
    function Toolkit() {
        this.cryptoKey = "yaoxing8901234561234567890123488";
        this.cryptoIv = "yaoxing890123488";
        this.routeCrypKey = "kjhlouyuf20987677869887978987277";
        this.routeCrypIv = "kjhlouyuf2098767";
        /** 密码检测字符串*/
        this._pwCheckString = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        this.uuid = 0;
    }
    Object.defineProperty(Toolkit, "underscore", {
        get: function () {
            if (!Toolkit._underscore) {
                Toolkit._underscore = require('underscore');
            }
            return Toolkit._underscore;
        },
        enumerable: false,
        configurable: true
    });
    Toolkit.prototype.removeDir = function (gid, err) {
        if (!gid) {
            Logger.error("传入的Gid为空");
            return;
        }
        Global.UI.fastTip("进入子游戏失败");
        var curGameUpdatePath = Global.HotUpdateManager.getNativeHotUpdatePath(gid.toString());
        Global.SceneManager.removeGameSearchPath(gid.toString());
        Global.SceneManager.releaseCurGameBundle();
        cc.sys.garbageCollect();
        if (jsb.fileUtils.isDirectoryExist(curGameUpdatePath)) {
            jsb.fileUtils.removeDirectory(curGameUpdatePath);
        }
        Global.SceneManager.sceneType = SceneManager_1.SceneType.Hall;
        Global.Event.event(GlobalEvent.UPDATE_SUB_GAME_FAILED, gid);
        var reportParam = { "result": err, "gid": gid.toString() };
        Global.ReportTool.ReportClientError(ReportTool_1.ReportTool.REPORT_TYPE_LOADSUBGAME_ERROR, reportParam);
    };
    Toolkit.prototype.adjustUrl = function (url) {
        if (!url)
            return url;
        if (url.length > 0 && url[url.length - 1] != '/') {
            url += "/";
        }
        return url;
    };
    //判断是否是iphone6  
    //iPhone6P : iPhone7,1   iPhone66 : iPhone7,2
    //iPhone6s : iPhone8,1  iPhone6sp : iPhone8,2  iphoneSE : iPhone8,4
    Toolkit.prototype.isIphone6 = function () {
        if (cc.sys.platform != cc.sys.IPHONE)
            return false;
        var brand = Global.Setting.SystemInfo.osBuildModel;
        if (brand.indexOf("iPhone7") >= 0 || brand.indexOf("iPhone8") >= 0)
            return true;
        // return false;
    };
    /**
     * 调整iphoneX坐标
     * @param widgetsList  需要调整的widget节点
     * @param offset 偏移值，默认为60
     * @param isPortrait 新增竖屏变量, 处理按钮在顶部状态栏点不到
     */
    Toolkit.prototype.adjustIphoneX = function (widgetsList, offset, isPortrait) {
        if (offset === void 0) { offset = 60; }
        if (isPortrait === void 0) { isPortrait = false; }
        if (widgetsList == null)
            return;
        if (!cc.sys.isNative)
            return;
        if (!Global.Setting.SystemInfo.isIphoneX)
            return;
        for (var i = 0; i < widgetsList.length; i++) {
            var node = widgetsList[i];
            if (node == null || !node.isValid)
                continue;
            var widght = node.getComponent(cc.Widget);
            if (widght) {
                if (isPortrait)
                    widght.top += offset;
                else
                    widght.left += offset;
            }
        }
    };
    /**
     * 各个方向的适配
     * @param widgetsList 适配节点
     * @param offset 偏移 默认60
     * @param dir 方向 "left" "right" "top" "bottom" 默认"left"
     */
    Toolkit.prototype.freeAdjustIphoneX = function (widgetsList, offset, dir) {
        if (offset === void 0) { offset = 60; }
        if (dir === void 0) { dir = "left"; }
        if (widgetsList == null)
            return;
        if (!cc.sys.isNative)
            return;
        if (!Global.Setting.SystemInfo.isIphoneX)
            return;
        for (var i = 0; i < widgetsList.length; i++) {
            var node = widgetsList[i];
            if (node == null || !node.isValid)
                continue;
            var widght = node.getComponent(cc.Widget);
            if (widght) {
                switch (dir) {
                    case "left":
                        widght.left += offset;
                        break;
                    case "right":
                        widght.right += offset;
                        break;
                    case "top":
                        widght.top += offset;
                        break;
                    case "bottom":
                        widght.bottom += offset;
                        break;
                }
            }
        }
    };
    Toolkit.prototype.getSpreadImgPath = function () {
        var filePath = jsb.fileUtils.getWritablePath() + Global.Toolkit.md5(Global.Setting.Urls.inviteUrl) + '_capImage.png';
        return filePath;
    };
    Toolkit.prototype.removeEmoji = function (content) {
        return content.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, "?");
    };
    Toolkit.prototype.checkContainsEmoji = function (content) {
        var reg = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
        return content.match(reg) != null;
    };
    Toolkit.prototype.genDeviceId = function () {
        // return "123456788999";
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        function guid() {
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        }
        return guid();
    };
    Toolkit.prototype.genDeviceInfo = function () {
        var device = {};
        device.device_id = "[" + Global.Setting.SystemInfo.deviceId + "]";
        device.os_type = Global.Toolkit.getOsType();
        device.os_version = cc.sys.os + "|" + cc.sys.osVersion + "|" + Global.Setting.SystemInfo.bundleName;
        device.app_version = Global.Setting.SystemInfo.appVersion;
        device.phone_model = Global.Setting.SystemInfo.osBuildModel;
        device.sign = Global.Setting.SystemInfo.loginSign;
        device.phone_device_brand = Global.Setting.SystemInfo.deviceBrand;
        device.wx_key = Global.Setting.SystemInfo.wxKey;
        var hallSkin = Global.Setting.SystemInfo.hallSkin || "";
        var gameSkin = Global.Setting.SystemInfo.gameSkin || "";
        var packageTag = Global.Setting.SystemInfo.packageTag || "";
        device.tagInfo = cc.js.formatStr("%s|%s|%s", hallSkin, gameSkin, packageTag);
        var nativeScreenWidth = Global.Setting.SystemInfo.nativeScreenWidth;
        device.udid = Global.Setting.SystemInfo.udid.toString() || "0";
        device.app_sign = Global.Setting.SystemInfo.appSign;
        var nativeScreenHeight = Global.Setting.SystemInfo.nativeScreenHeight;
        if (Global.Setting.SystemInfo.webglData) {
            var webglData = JSON.parse(Global.Setting.SystemInfo.webglData);
            device.gv = webglData.version;
            device.gr = webglData.renderer;
        }
        //屏幕宽度（像素）
        device.w = Number(nativeScreenWidth < nativeScreenHeight ? nativeScreenWidth : nativeScreenHeight) || 0;
        // 屏幕高度（像素）
        device.h = Number(nativeScreenWidth > nativeScreenHeight ? nativeScreenWidth : nativeScreenHeight) || 0;
        // Logger.error("++++++++++++++++++++++nativeScreenWidth::"+device.w);
        // Logger.error("-------------------------nativeScreenHeight::"+device.h);
        //Android 高版本设备码处理
        if (cc.sys.os == cc.sys.OS_ANDROID && (Global.Toolkit.versionCompare(cc.sys.osVersion, "9") >= 0)) {
            device.need_sid = 1;
        }
        device.server_id = Global.Setting.SystemInfo.server_id;
        //模拟器
        device.simulator = Global.Setting.SystemInfo.simulator;
        device.entry = Global.Setting.SystemInfo.entry.toString() || "";
        device.sign_type = Global.Setting.SystemInfo.sign_type.toString() || "";
        device.ios_type = Global.Toolkit.getIosSignType();
        return device;
    };
    Toolkit.prototype.genRegInfo = function () {
        var regInfo = {};
        regInfo.packInfo = Global.Setting.ChannelInfo; //渠道信息
        regInfo.bundleName = Global.Setting.SystemInfo.bundleName; //包名
        regInfo.appVersion = Global.Setting.SystemInfo.appVersion; //版本号
        regInfo.firstOpenTime = this.getFirstOpenTime(); //第一次打开时间
        regInfo.osType = this.getOsType(); //系统类型
        //模拟器
        regInfo.simulator = Global.Setting.SystemInfo.simulator;
        regInfo.entry = Global.Setting.SystemInfo.entry.toString() || "";
        regInfo.ios_type = Global.Toolkit.getIosSignType();
        regInfo.udid = Global.Setting.SystemInfo.udid.toString() || "0";
        regInfo.sign_type = Global.Setting.SystemInfo.sign_type.toString() || "";
        regInfo.app_sign = Global.Setting.SystemInfo.appSign;
        var hallSkin = Global.Setting.SystemInfo.hallSkin || "";
        var gameSkin = Global.Setting.SystemInfo.gameSkin || "";
        var packageTag = Global.Setting.SystemInfo.packageTag || "";
        regInfo.tagInfo = cc.js.formatStr("%s|%s|%s", hallSkin, gameSkin, packageTag);
        return JSON.stringify(regInfo);
    };
    /**
     *
     * @returns ios签名类型 0 未识别 1 MDM内部企业签 2非MDM内部企业签 3 MDM内部超级签 4非MDM内部超级签 5 外部超级签  7 TF包 6 自建TF
     */
    Toolkit.prototype.getIosSignType = function () {
        var entry = Global.Setting.SystemInfo.entry.toString();
        var signType = Global.Setting.SystemInfo.sign_type.toString();
        var platform = Global.Setting.SystemInfo.nativePlatform;
        if (platform == "TF") {
            return 7;
        }
        if (platform == "TF" && signType == "4") {
            return 6;
        }
        if (signType == "1") {
            if (entry == "1") {
                return 1;
            }
            return 2;
        }
        else if (signType == "2") {
            if (entry == "1") {
                return 3;
            }
            return 4;
        }
        else if (signType == "3") {
            return 5;
        }
        else {
            return 0;
        }
    };
    Toolkit.prototype.secondFormatHMS = function (s) {
        var t = "";
        if (s > -1) {
            var hour = Math.floor(s / 3600);
            var min = Math.floor(s / 60) % 60;
            var sec = s % 60;
            if (hour < 10) {
                t += "0";
            }
            t += hour + ":";
            if (min < 10) {
                t += "0";
            }
            t += min + ":";
            if (sec < 10) {
                t += "0";
            }
            t += sec;
        }
        return t;
    };
    //渠道号  包版本号  资源版本号
    Toolkit.prototype.genLoadingAppInfo = function () {
        //直接调用原生方法 “getNativeParams” 返回所需数据。  数据来源-> 打包时使用的配置文件 例如588_588.json 中的"ChannelID"字段
        //非原生 是 null
        var packId = Global.Setting.SystemInfo.packChannel;
        //直接调用原生方法 “getNativeParams” 返回所需数据。  数据来源-> 打包时使用的配置文件 例如588_588.json 中的"AppVersion"字段 或者命令打包时传递的参数 -Pver 附带的数据  
        //如果配置文件中没有，并且打包时未传递-Pver参数，则使用 build.gradle 中的默认配置 "1000"
        //非原生 客户端写死的是 40000
        var appVer = Global.Setting.SystemInfo.appVersion;
        //读取热更文件中的版本号，直接通过原生路径直接访问 project.manifest 中的cfgVersion字段
        //非原生 客户端写死的是 0.0.0 
        var cfgVer = Global.HotUpdateManager.getNativeHotUpdateVersion("hall", true);
        var isYunDunInit = Global.AppDun.getDunIsInitByType(AppDunControl_1.DUNTYPE.YUN_DUN);
        var isZADunInit = Global.AppDun.getDunIsInitByType(AppDunControl_1.DUNTYPE.ZA_DUN);
        var isAliDunInit = Global.AppDun.getDunIsInitByType(AppDunControl_1.DUNTYPE.Ali_DUN);
        var verStr = cfgVer + "_" + packId; //111_0_10000
        if (isYunDunInit) {
            verStr = verStr + "_Y";
        }
        if (isZADunInit) {
            verStr = verStr + "_Z";
        }
        if (isAliDunInit) {
            verStr = verStr + "_A";
        }
        verStr = verStr + "_" + appVer;
        //return verStr;
        // appId 和 channelPack 都是通过服务器请求的，数据来自PreLoadProxy.ts 的reqServerAppConfig()方法
        //  000 _  000 _40000 _3002 • 0
        //cfgVer_packId_appVer_appId•channelPack
        //  let skintype = Global.Setting.SystemInfo.hallSkin;
        //临时使用appid代替 ，应该使用上行代码
        var skintype = Global.Setting.appId;
        var codeVersion = Global.HotUpdateManager.hallNewVersion;
        return skintype + "_" + codeVersion;
    };
    Toolkit.prototype.genAppInfo = function () {
        var loadingAppInfo = this.genLoadingAppInfo();
        // let appId = Global.Setting.appId;
        // let channelPack = Global.Setting.ChannelInfo.configChannel;
        var ChannelID = Global.Setting.ChannelInfo.getRegistChannel();
        var appid = Global.Setting.appId;
        return appid + "_" + ChannelID + "_" + loadingAppInfo;
    };
    Toolkit.prototype.getFirstOpenTime = function () {
        var time = Global.Setting.storage.get("FirstOpenTime");
        if (time == null || time == "") {
            time = Date.now().toString();
            Global.Setting.storage.set("FirstOpenTime", time);
        }
        return time;
    };
    //从[0-max)中选 随机一个整数
    Toolkit.prototype.getRoundInteger = function (to, from) {
        if (from === void 0) { from = 0; }
        return Math.floor(from + Math.random() * (to - from));
    };
    /**
     * 将数据乱序排列(Fisher–Yates shuffle 洗牌算法)
     * @param arr 原数组
     */
    Toolkit.prototype.getOutOrderArray = function (arr) {
        if (!arr) {
            return [];
        }
        var tmpArr = __spreadArrays(arr);
        var m = tmpArr.length, t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = tmpArr[m];
            tmpArr[m] = tmpArr[i];
            tmpArr[i] = t;
        }
        return tmpArr;
    };
    Toolkit.prototype.md5 = function (content) {
        if (this.MD5Hasher == null) {
            this.MD5Hasher = Hasher_1.Hasher._createHelper(MD5_1.MD5);
        }
        return this.MD5Hasher(content).toString();
    };
    //获取客户端运行时唯一id
    Toolkit.prototype.getClientUuid = function () {
        this.uuid++;
        return this.uuid;
    };
    Toolkit.prototype.getOsType = function () {
        if (!cc.sys.isNative)
            return 1;
        if (cc.sys.os == cc.sys.OS_ANDROID)
            return 2;
        if (cc.sys.os == cc.sys.OS_IOS)
            return 3;
        return 1;
    };
    Toolkit.prototype.checkMegeServer = function () {
        var packageAppid = Number(Global.Setting.SystemInfo.appID);
        var dataAppid = Global.Setting.appId;
        if (dataAppid && packageAppid && packageAppid != dataAppid && !Global.Setting.isCloseMegeServer) {
            return true;
        }
        return false;
    };
    Toolkit.prototype.getOsTypeStr = function () {
        var type = this.getOsType();
        if (type == 2)
            return "android";
        if (type == 3)
            return "ios";
        return "web";
    };
    Toolkit.prototype.loadWebPic = function (node, url) {
        Global.ResourceManager.load(url, function (error, texture) {
            if (error) {
                Logger.error("--------------load pic error-------" + error.msg);
                return;
            }
            var sp = node.getComponent(cc.Sprite);
            if (!sp) {
                return Logger.error("_________找不到Sprite_________");
            }
            var headwidth = node.width;
            var headHeight = node.height;
            sp.spriteFrame = new cc.SpriteFrame(texture);
            node.width = headwidth;
            node.height = headHeight;
        });
    };
    Toolkit.prototype.getLocalHeadSf = function (sfName, sprite, width, height) {
        // return Global.ResourceManager.getSprite("hall/texture/common/headImg", sfName);
        if (sfName == null || sfName == undefined || sfName == "") {
            Logger.error("getLocalHeadSf() sfName is empty, return!!!");
            return null;
        }
        if (Number(sfName) && Number(sfName) > Global.Setting.headNameRange) {
            var id = Number(sfName) % Global.Setting.headNameRange; // 2020.1.20暂时特殊处理 防止大批头像一样的问题 // grace
            if (id == 0) {
                id = 1;
            }
            sfName = (id).toString();
        }
        var spriteFrame = Global.ResourceManager.getSprite("hall/texture/common/headImg", sfName);
        if (spriteFrame == null) {
            Logger.error("getLocalHeadSf() 找不到头像, sfName = " + sfName + ", return!!!");
            return null;
        }
        if (sprite != null && sprite != undefined) {
            width = (width != null) ? width : sprite.node.width;
            height = (height != null) ? height : sprite.node.height;
            sprite.sizeMode = cc.Sprite.SizeMode.RAW;
            sprite.trim = false;
            sprite.spriteFrame = spriteFrame;
            sprite.node.width = width;
            sprite.node.height = height;
        }
        return spriteFrame;
    };
    /**
     * 加载头像框 -  子游戏专用（圆头像框）
     * @param sprite 图片精灵
     * @param headKuang 头像框的id值字符串
     * @param bGuang 是否发光的框
     */
    Toolkit.prototype.loadLocalHeadFrameByGames = function (sprite, headKuang, bGuang, isCustom) {
        if (bGuang === void 0) { bGuang = false; }
        if (isCustom === void 0) { isCustom = false; }
        var atlasString = "hall/texture/hall/game_head_kuang/game_head_kuang";
        //var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "txkuang_vip" + headKuang;
        if (bGuang) {
            sfString += "_guang";
        }
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, function () {
            sprite.sizeMode = isCustom ? cc.Sprite.SizeMode.CUSTOM : cc.Sprite.SizeMode.RAW;
            sprite.trim = false;
        }, false);
    };
    /**
     * 加载头像框
     * @param sprite 图片精灵
     * @param headKuang 头像框的id值字符串  by cris
     * @param bGuang 是否发光的框
     */
    Toolkit.prototype.loadLocalHeadFrame = function (sprite, headKuang, bGuang, isCustom) {
        if (bGuang === void 0) { bGuang = false; }
        if (isCustom === void 0) { isCustom = false; }
        //var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "txkuang_vip" + headKuang;
        if (bGuang) {
            sfString += "_guang";
        }
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, function () {
            sprite.sizeMode = isCustom ? cc.Sprite.SizeMode.CUSTOM : cc.Sprite.SizeMode.RAW;
            sprite.trim = false;
        }, false);
    };
    /**
    * 加载头像框 ,加载VIP里面的资源
    * @param sprite 图片精灵
    * @param headKuang 头像框的id值字符串
    * @param bGuang 是否发光的框
    */
    Toolkit.prototype.loadLocalHeadFrameByVip = function (sprite, headKuang, bGuang, isCustom) {
        if (bGuang === void 0) { bGuang = false; }
        if (isCustom === void 0) { isCustom = false; }
        var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        //var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "txkuang_vip" + headKuang;
        if (bGuang) {
            sfString += "_guang";
        }
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, function () {
            sprite.sizeMode = isCustom ? cc.Sprite.SizeMode.CUSTOM : cc.Sprite.SizeMode.RAW;
            sprite.trim = false;
        }, false);
    };
    /**
     * 加载vip大图标
     * @param sprite 图片精灵
     * @param vip vip等级
     */
    Toolkit.prototype.loadLocalVip = function (sprite, vip) {
        //var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "icon_v" + vip;
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, null, false);
    };
    /**
     * 加载vip小标识
     * @param sprite 图片精灵
     * @param vip vip等级
     */
    Toolkit.prototype.loadLocalVipIcon = function (sprite, vip) {
        //var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "vip_tq" + vip;
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, null, false);
    };
    /**
    * 加载vip小标识
    * @param sprite 图片精灵
    * @param vip vip等级
    */
    Toolkit.prototype.loadVipIcon = function (sprite, vip) {
        var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        // var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "vip_tq" + vip;
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, null, false);
    };
    /**
     * 加载游戏里的任务指引图片
     * @param sprite 图片精灵
     * @param string 路径
     * @param name 任务图片
     */
    Toolkit.prototype.loadTaskIcon = function (sprite, string, name) {
        var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "atlasString" + name;
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, null, false);
    };
    /**
     * 加载vip小标识子游戏调用
     * @param sprite 图片精灵
     * @param vip vip等级
     */
    Toolkit.prototype.loadLocalVipIconGame = function (sprite, vip) {
        //var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "icon_v" + vip;
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, null, false);
    };
    Toolkit.prototype.isInteger = function (obj) {
        return parseInt(obj, 10) === obj;
    };
    /**
     * 获取玩家金钱格式文本
     */
    Toolkit.prototype.GetMoneyFormat = function (money) {
        if (money === void 0) { money = 0; }
        // var realNum = money / Global.Setting.glodRatio;
        // return realNum.toFixed(2);
        return this.formatPointStr(money, true, false); //2019-7-15 xiaoC 捕鱼中可能出现小数点后3位，toFixed(2)会四舍五入导致显示>实际，统一使用截断处理
    };
    //格式化货币
    //1 round  2 ceil 3 floor
    Toolkit.prototype.formatPoint = function (point, type, defaultFix) {
        if (type === void 0) { type = 3; }
        if (defaultFix === void 0) { defaultFix = 2; }
        var rate = Global.Setting.glodRatio;
        var factor = Math.pow(10, defaultFix); // 放大系数 决定了保留多少小数位取整
        switch (type) {
            case 1:
                return Math.round(point * factor / rate) / factor;
            case 2: {
                var plus = point > 0 ? 1 : -1; // debug记录正负, 处理负值情况
                point = Math.abs(point);
                return plus * Math.ceil(point * factor / rate) / factor;
            }
            case 3: {
                var plus = point > 0 ? 1 : -1; // debug记录正负, 处理负值情况
                point = Math.abs(point);
                return plus * Math.floor(point * factor / rate) / factor;
            }
            default:
                return Math.round(point * factor / rate) / factor;
        }
    };
    Toolkit.prototype.dumpRes = function (full) {
        var fullMap = cc.loader['_cache'];
        var dump = [];
        for (var k in fullMap) {
            var v = fullMap[k];
            if (!full && (v.type == 'js' || v.type == 'uuid' || v.id.indexOf('res/raw-internal') >= 0 || v.id.indexOf('preview-scene') >= 0)) {
                continue;
            }
            dump.push(v);
        }
        // console.info(dump);
        // console.info(dump.length);
    };
    /**
     * 格式化货币
     * @param {number} point  服务器货币数量
     * @param {boolean} [fix=false] 是否固定小数位
     * @param {boolean} [withPlus=false] 是否显示加号
     * @param {number} nFix? 设定小数位 fix=true有效
     * @returns {string}
     * @memberof Toolkit
     */
    Toolkit.prototype.formatPointStr = function (point, fix, withPlus, nFix) {
        if (fix === void 0) { fix = false; }
        if (withPlus === void 0) { withPlus = false; }
        if (!fix) {
            var resStr_1 = this.formatPoint(point, 3).toString();
            if (withPlus && point >= 0)
                resStr_1 = "+" + resStr_1;
            return resStr_1;
        }
        var fixNum = nFix || Global.Setting.fixCount;
        var resStr = this.formatPoint(point, 3, nFix).toFixed(fixNum);
        if (withPlus && point >= 0)
            resStr = "+" + resStr;
        return resStr;
    };
    /**
     * 获取188****1234
     * @param str 字符串
     * @param preCount 保留前几位
     * @param lastCount 保留后几位
     */
    Toolkit.prototype.formateStrWithAsterisk = function (str, preCount, lastCount) {
        if (str === void 0) { str = ''; }
        if (preCount === void 0) { preCount = 0; }
        if (lastCount === void 0) { lastCount = 0; }
        if (str == '')
            return '';
        var count = str.length;
        if (preCount + lastCount <= count) {
            var preStr = str.substr(0, preCount);
            var lastStr = str.substr(-lastCount, lastCount);
            var addStr = "";
            for (var s = 0; s < count - preCount - lastCount; s++) {
                addStr = addStr + "*";
            }
            return preStr.concat(addStr, lastStr);
        }
        else {
            return '*********';
        }
    };
    /**
     * 截取字符串，超出的用..代替
     * @param str 字符串
     * @param byteLen 保留长度，中文算两个字符
     * @param notAppend true强制不添加..
     */
    Toolkit.prototype.substrEndWithElli = function (str, byteLen, notAppend) {
        if (str === void 0) { str = ''; }
        if (notAppend === void 0) { notAppend = false; }
        str = Global.Toolkit.removeEmoji(str);
        var count = this.getTotalBytes(str), len = byteLen;
        if (str == '' || count <= byteLen)
            return str;
        var result = '';
        for (var i = 0; i < str.length; i++) {
            var s = str.charAt(i);
            len -= this.getByte(s);
            if (len < 0)
                break;
            result += s;
        }
        if (notAppend) {
            return result;
        }
        else {
            return result + "..";
        }
    };
    Toolkit.prototype.getByte = function (str) {
        if (str === void 0) { str = ''; }
        var nByte = 0;
        if (str.match(/[^\x00-\xff]/ig) != null) {
            nByte = 2;
        }
        else {
            nByte = 1;
        }
        return nByte;
    };
    Toolkit.prototype.getTotalBytes = function (str) {
        if (str === void 0) { str = ''; }
        var byteValLen = 0;
        for (var i = 0; i < str.length; i++) {
            var nByte = this.getByte(str[i]);
            byteValLen += nByte;
        }
        return byteValLen;
    };
    /**
     * 判断是否为{}或者[]
     * @param obj 对象
     */
    Toolkit.prototype.isEmptyObject = function (obj) {
        for (var key in obj)
            return !1;
        return !0;
    };
    /**
     * 获取圆上指定角度的点坐标
     * @param centerPoint 圆心坐标
     * @param radius 半径
     * @param angle 角度
     */
    Toolkit.prototype.getCirclePoint = function (centerPoint, radius, angle) {
        var x = centerPoint.x + radius * Math.cos(2 * angle * Math.PI / 360);
        var y = centerPoint.y + radius * Math.sin(2 * angle * Math.PI / 360);
        return new cc.Vec3(x, y);
    };
    /**
     * 随机获取圆内坐标
     * @param centerPoint 圆心坐标
     * @param radius 半径
     */
    Toolkit.prototype.getCircleRandomInPoint = function (centerPoint, radius) {
        var r = Math.random() * radius; // [0, radius)
        var a = Math.random() * 360; // [0, 360)
        return this.getCirclePoint(centerPoint, r, a);
    };
    /**
     * 随机获取矩形内坐标
     * @param centerPoint 中心
     * @param w 宽
     * @param h 高
     */
    Toolkit.prototype.getRectRandomInPoint = function (centerPoint, w, h) {
        var x = -w / 2 + Math.random() * w;
        var y = -h / 2 + Math.random() * h;
        return centerPoint.add(new cc.Vec3(x, y));
    };
    /**
     * 计算两个向量的夹角 以startx正向为基准 返回[0, 90)U(90, 180]U(180, 270)U(-90, 0)取值
     * @param start
     * @param end
     */
    Toolkit.prototype.getVec2Angle = function (start, end) {
        var tan = (end.y - start.y) / (end.x - start.x);
        if (end.x > start.x) // 一、四象限为end相对start夹角
            return Math.atan(tan) * 180 / Math.PI;
        else // 二、三象限为start相对end夹角 取补角
            return Math.atan(tan) * 180 / Math.PI + 180;
    };
    /**
     * 计算两个平面向量距离
     * @param start 起点
     * @param end 终点
     */
    Toolkit.prototype.getVec2Distance = function (start, end) {
        return end.sub(start).mag();
    };
    /**
     * 将node1坐标系下的point转换到node2坐标系下的本地坐标
     * @param node1 要转换坐标的父节点
     * @param node2 目的父节点
     * @param point 转换坐标
     */
    Toolkit.prototype.convertSameNodePos = function (node1, node2, point) {
        if (point === void 0) { point = cc.Vec3.ZERO; }
        var worldPos = node1.convertToWorldSpaceAR(point);
        return node2.convertToNodeSpaceAR(worldPos);
    };
    /**
     *
     * @param num
     */
    Toolkit.prototype.GetText = function (num) {
        // let txt;
        // if (num > 10000) {
        //     txt = 
        // }
        // else {
        //     txt = num
        // }
        return (num / 10000).toFixed(2);
    };
    /**
     *
     * @param node 生成二维码的节点
     * @param url 二维码的url
     * @param margin 二维码边界空隙长宽
     */
    Toolkit.prototype.initQRCode = function (node, url, margin) {
        if (margin === void 0) { margin = 10; }
        var ctx = Global.UIHelper.safeGetComponent(node, "", cc.Graphics); //node.addComponent(cc.Graphics);
        if (ctx) {
            ctx.clear();
        }
        // let Tip = new QRCodeTip()
        // Global.ResourceManager.loadRes("hall/prefabs/ui/QRCodeTip", (error, prefab)=>
        // {
        //     if(prefab)
        //     {
        //         Tip.setNode(cc.instantiate(prefab));
        //         Tip.node.setParent(node);
        //     }
        // })
        // Global.UI.showLodingTip("加载中",node);
        if (typeof (url) !== 'string') {
            Logger.log('url is not string', url);
            // Global.UI.hideLodingTip("加载失败",node);
            return;
        }
        this.QRCreate(ctx, url, margin, node);
        // Global.UI.hideLodingTip("加载成功",node);
    };
    /**
     *
     * @param ctx 绘制api
     * @param url 二维码的url
     * @param margin 二维码边界空隙长宽
     * @param node 生成二维码的节点
     */
    Toolkit.prototype.QRCreate = function (ctx, url, margin, node) {
        ctx.clear();
        //背景色
        ctx.fillColor = cc.Color.WHITE;
        var width = node.width;
        ctx.rect(0 - width * 0.5, 0 - width * 0.5, width, width);
        ctx.fill();
        ctx.close();
        //生成二维码数据
        var qrcode = new qrcode_1.QRCode(-1, qrcode_1.QRErrorCorrectLevel.H);
        qrcode.addData(url);
        qrcode.make();
        ctx.fillColor = cc.Color.BLACK;
        var size = width - margin * 2;
        var num = qrcode.getModuleCount();
        var tileW = size / num;
        var tileH = size / num;
        var w = Math.ceil(tileW);
        var h = Math.ceil(tileH);
        for (var row = 0; row < num; row++) {
            for (var col = 0; col < num; col++) {
                if (qrcode.isDark(row, col)) {
                    ctx.rect(margin + col * tileW - width * 0.5, size - tileH - Math.round(row * tileH) + margin - width * 0.5, w, h);
                    ctx.fill();
                }
            }
        }
    };
    /**检测密码字符串是否合法 */
    Toolkit.prototype.checkPWFormat = function (text) {
        if (text.length < 6 || text.length > 16) {
            return false;
        }
        for (var i = 0; i < text.length; i++) {
            var c = text.charAt(i);
            if (this._pwCheckString.indexOf(c) < 0) {
                return false;
            }
        }
        return true;
    };
    //比对版本
    Toolkit.prototype.versionCompare = function (versionA, versionB) {
        // Logger.log("JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
        // var vA = versionA.split('.');
        // var vB = versionB.split('.');
        // for (var i = 0; i < vA.length; ++i) {
        //     var a = parseInt(vA[i]);
        //     var b = parseInt(vB[i] || "0");
        //     if (a === b) { continue; }
        //     else { return a - b; }
        // }
        // if (vB.length > vA.length) { return -1; }
        // else { return 0; }
        // console.log("JS 自定义版本比较: version A : " + versionA + ', version B : ' + versionB);
        return versionA === versionB ? 0 : -1;
    };
    /**
     * 深拷贝对象
     * @param obj
     */
    Toolkit.prototype.copyObj = function (obj) {
        if (obj) {
            return JSON.parse(JSON.stringify(obj));
        }
        else {
            return {};
        }
    };
    //请求appInfo   暂不卡主流程，如果时序出问题考虑等请求完成后再
    Toolkit.prototype.getDownloadAppInfo = function () {
        if (!cc.sys.isNative)
            return;
        if (Global.Setting.ChannelInfo.serverAppInfoContent != null && Global.Setting.ChannelInfo.serverAppInfoContent != "")
            return;
        var param = {};
        param.type = 2;
        param.app = Global.Setting.appId.toString();
        param.os = Global.Toolkit.getOsTypeStr();
        param.sw = Global.Setting.SystemInfo.nativeScreenHeight.toString();
        param.sh = Global.Setting.SystemInfo.nativeScreenWidth.toString();
        param.sp = Global.Setting.SystemInfo.nativeScreenDensity.toString();
        param.li = Global.Setting.SystemInfo.hostIp;
        param.osBuildModel = Global.Setting.SystemInfo.osBuildModel;
        param.osBuildVersionSDK = Global.Setting.SystemInfo.osBuildVersionSDK;
        param.osBuildVersionRelease = Global.Setting.SystemInfo.osBuildVersionRelease;
        param.device = this.genDeviceInfo();
        Global.HallServer.sendClientLog(NetEvent_1.NetClientLog.DownloadAppInfo, param, function (msg) {
            if (msg) {
                var tmp = {};
                tmp.ch = msg.pack;
                tmp.ic = msg.invite_code;
                Global.Setting.ChannelInfo.serverAppInfoContent = tmp;
                if ((tmp.ch && tmp.ch != 0) || (tmp.ic && tmp.ic != 0))
                    Global.Setting.ChannelInfo.sourceType = 4;
            }
        }, function () { return false; });
    };
    /**
     * 检查版本号是否支持
     * @param supportVersion 默认版本号，当有iosVersion时，为安卓版本号
     * @param iosVersion ios支持版本号，默认为0
     */
    Toolkit.prototype.checkVersionSupport = function (supportVersion, iosVersion) {
        if (iosVersion === void 0) { iosVersion = 0; }
        if (!cc.sys.isNative)
            return true;
        var version = Global.Setting.SystemInfo.appVersion;
        var numVer = Number(version);
        //iosVersion不为0时  ios版本号以iosVersion为准
        if (cc.sys.platform == cc.sys.IPHONE && iosVersion && iosVersion > 0) {
            supportVersion = iosVersion;
        }
        if (isNaN(numVer) || numVer >= supportVersion)
            return true;
        return false;
    };
    //--------------------------------------------------------------------------------
    /**
     * 游戏退出后在大厅弹提示框
     * @param content 文本
     * @param yFunc 确定回调
     * @param nFunc 取消或者关闭回调
     * @param type 1 显示确定提示框  2 显示确定取消提示框
     */
    Toolkit.prototype.transmitHallMsg = function (content, yFunc, nFunc, type) {
        if (type === void 0) { type = 1; }
        if (typeof (content) != "string")
            return;
        var info = {};
        info.content = content;
        info.yFunc = yFunc;
        info.nFunc = nFunc;
        info.type = type;
        Game.DataBridge.msg = info;
    };
    /**
     * 游戏tips大厅显示
     * @param tips tips内容
     */
    Toolkit.prototype.transmitHallTip = function (tips) {
        Game.DataBridge.fastTipMsg = tips;
    };
    /**退出游戏后大厅显示Window */
    Toolkit.prototype.transmitHallWindow = function (window, args) {
        if (window == null) {
            return;
        }
        var info = {};
        info.window = window;
        info.args = args;
        Game.DataBridge.cacheShow = info;
    };
    Toolkit.prototype.reportLog = function (key, param) {
        var data = {};
        data.type = "debug";
        data.key = key;
        var uid = Number(Global.Setting.storage.get(HallStorageKey_1.default.Uid)) || 0;
        data.appid = Global.Setting.appId;
        data.uid = uid;
        data.phone_code = this.getOsTypeStr();
        try {
            data.data = JSON.stringify(param);
        }
        catch (e) {
            Logger.error("encode error", key);
            return;
        }
        data.device = this.genDeviceInfo();
        Global.HallServer.sendClientLog(NetEvent_1.NetClientLog.ClientLogReq, data, null, function () { return false; }, false);
    };
    Toolkit.prototype.parseTime = function (time, cFormat) {
        if (cFormat === void 0) { cFormat = ""; }
        if (arguments.length === 0) {
            return null;
        }
        var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
        var date;
        if (typeof time === 'object') {
            date = time;
        }
        else {
            if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
                time = parseInt(time);
            }
            if ((typeof time === 'number') && (time.toString().length === 10)) {
                time = time * 1000;
            }
            date = new Date(time);
        }
        var formatObj = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            i: date.getMinutes(),
            s: date.getSeconds(),
            a: date.getDay()
        };
        var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, function (result, key) {
            var value = formatObj[key];
            // Note: getDay() returns 0 on Sunday
            if (key === 'a') {
                return ['日', '一', '二', '三', '四', '五', '六'][value];
            }
            ;
            if (result.length > 0 && value < 10) {
                value = '0' + value;
            }
            return value || 0;
        });
        return time_str;
    };
    /**
     *
     * @param url 图片地址
     * @param id 唯一标识
     * @param callback 加载完成的回调
     */
    Toolkit.prototype.LoadPicToNative = function (url, id, callback) {
        var name = Global.Toolkit.md5(id);
        var filePath = jsb.fileUtils.getWritablePath() + name + '.jpg';
        if (!jsb.fileUtils.isFileExist(filePath)) {
            var xhr_1 = cc.loader.getXMLHttpRequest();
            xhr_1.onreadystatechange = function () {
                if (xhr_1.readyState === 4) {
                    if (xhr_1.status === 200) {
                        this.saveFileToNative(filePath, xhr_1.response, callback);
                    }
                    else {
                        this.saveFileToNative(null);
                    }
                }
            }.bind(this);
            xhr_1.responseType = 'arraybuffer';
            xhr_1.open("GET", url, true);
            xhr_1.send();
        }
        else {
            this.loadEnd(filePath, callback);
        }
    };
    Toolkit.prototype.saveFileToNative = function (filepath, data, callback) {
        if (typeof data !== 'undefined') {
            // if( !jsb.fileUtils.isDirectoryExist(filepath) ){
            //     jsb.fileUtils.createDirectory(filepath);
            // }
            if (jsb.fileUtils.writeDataToFile(new Uint8Array(data), filepath)) {
                Logger.log('Remote write file succeed.');
                this.loadEnd(filepath, callback);
            }
            else {
                Logger.log('Remote write file failed.');
            }
        }
        else {
            Logger.log('Remote download file failed.');
            if (callback) {
                callback(null);
            }
        }
    };
    Toolkit.prototype.loadEnd = function (filepath, callback) {
        cc.loader.load(filepath, function (err, texture) {
            if (err) {
                if (jsb.fileUtils.isFileExist(filepath)) {
                    jsb.fileUtils.removeFile(filepath);
                }
                Logger.log(err);
            }
            else {
                if (texture) {
                    if (callback) {
                        callback(texture);
                    }
                }
            }
        });
    };
    Toolkit.prototype.showMoneyNotEnough = function (str) {
        if (str === void 0) { str = "金币不够啦，请前往充值！"; }
        Global.UI.showSingleBox(str, function () {
            Global.UI.show("WndRecharge");
        });
    };
    /***
     * 检测是否为有效的数字
     * ***/
    Toolkit.prototype.checkNumValid = function (value) {
        var num = Number(value);
        if (num) {
            var isBigNum = BigNumber(num).gt(Number.MAX_SAFE_INTEGER);
            if (isBigNum) {
                return false;
            }
            else {
                return true;
            }
        }
        return false;
    };
    Toolkit.prototype.checkMoney = function (level, gameData) {
        if (level === void 0) { level = "l0"; }
        if (!gameData) {
            Logger.error("游戏数据为空");
            return false;
        }
        if (gameData.levels) {
            for (var index = 0; index < gameData.levels.length; index++) {
                var levelStr = gameData.levels[index].level;
                if (levelStr && levelStr == level) {
                    var pointLow = gameData.levels[index].PointLow;
                    if (pointLow && Global.PlayerData.point < pointLow) {
                        var limit = Global.Toolkit.formatPointStr(pointLow);
                        var str = "游戏准入" + limit + "金币，请您充值哦！";
                        Global.Toolkit.showMoneyNotEnough(str);
                        return false;
                    }
                }
            }
        }
        return true;
    };
    /**
     * 跟进配置判断是否限制充值
     */
    Toolkit.prototype.checkRechargeLimited = function () {
        if (Global.Setting.rechargeLimited) {
            if (Global.PlayerData.phone == "") {
                Global.UI.showSingleBox("该功能需要绑定手机号后才能使用，是否立即绑定手机？", function () {
                    Global.UI.show("WndBindPhone");
                });
                return true;
            }
        }
        return false;
    };
    /**
     *
     * @param reason 错误码
     */
    Toolkit.prototype.checkMoneyError = function (errno) {
        if (errno == 102) {
            Global.UI.showSingleBox("金币不够啦，是否前往充值？", function () {
                Global.UI.show("WndRecharge");
            });
            return true;
        }
        return false;
    };
    /* 设置节点的父节点，保持位置不变
    * @param child 要操作节点
    * @param parent 要设置到的父节点
    * @param isFixed 是否保持位置不变
    */
    Toolkit.prototype.setNodeParent = function (child, parent, isFixed) {
        if (isFixed === void 0) { isFixed = true; }
        if (child && parent && cc.isValid(child) && cc.isValid(parent)) {
            if (isFixed) {
                var pos = this.convertSameNodePos(child.parent, parent, child.position);
                child.setParent(parent);
                child.setPosition(pos);
            }
            else {
                child.setParent(parent);
            }
        }
        else {
            Logger.error('父子节点非法');
        }
    };
    /* 超过万元显示 多少万
    * @param value 金额
    */
    Toolkit.prototype.formatMillion = function (value) {
        if (value > 9999)
            return (Math.floor(value / 1000) / 10) + "万"; //保留一位小数
        else if (value <= 9999 && value >= -9999)
            return value + "";
        else
            return -(Math.floor(Math.abs(value) / 1000) / 10) + "万";
    };
    Toolkit.prototype.CheckGameVersion = function (version) {
        if (version == null || version == undefined) //服务器不发表示版本正常
         {
            return true;
        }
        var gameInfo = Global.GameData.getGameInfo(Global.HotUpdateManager.CurrentGame);
        if (version == gameInfo.native_version) {
            return true;
        }
        else if (this.versionCompare(version, gameInfo.native_version) < 0) {
            return false;
        }
        else {
            return true;
        }
    };
    Toolkit.prototype.CheckFileExist = function (fileName) {
        if (CC_JSB) {
            return jsb.fileUtils.isFileExist(fileName);
        }
        return false;
    };
    Toolkit.prototype.getFirstLoginTime = function () {
        var time = Global.Setting.storage.get(HallStorageKey_1.default.BaiduIntervelTimes);
        if (time == null || time == "") {
            time = new Date().getTime();
            Global.Setting.storage.set(HallStorageKey_1.default.BaiduIntervelTimes, time);
        }
        return time;
    };
    //检测是否可以使用微信
    Toolkit.prototype.checkIsPlatformShowWX = function () {
        var isShow = true;
        var platform = Global.Setting.SystemInfo.nativePlatform;
        switch (platform) {
            case "majiabao":
            case "appstore":
            case "testflight":
            case "appstore_sdktype":
                isShow = false;
                break;
        }
        return isShow;
    };
    //检测是否可以使用支付宝
    Toolkit.prototype.checkIsPlatformShowZhifubao = function () {
        var isShow = true;
        var platform = Global.Setting.SystemInfo.nativePlatform;
        switch (platform) {
            case "appstore":
            case "appstore_sdktype":
                isShow = false;
                break;
        }
        return isShow;
    };
    Toolkit.prototype.SectionToChinese = function (section) {
        var chnNumChar = ["零", "", "二", "三", "四", "五", "六", "七", "八", "九"];
        var chnUnitChar = ["", "十", "百", "千", "万", "亿", "万亿", "亿亿"];
        var strIns = '', chnStr = '';
        var unitPos = 0;
        var zero = true;
        while (section > 0) {
            var v = section % 10;
            if (v === 0) {
                if (!zero) {
                    zero = true;
                    chnStr = chnNumChar[v] + chnStr;
                }
            }
            else {
                zero = false;
                strIns = chnNumChar[v];
                strIns += chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
        return chnStr;
    };
    Toolkit.prototype.DealWithUrl = function (url) {
        if (typeof (url) != "string" || !url) {
            Logger.error("链接格式不对");
            return null;
        }
        return encodeURI(url.replace("\t", "").trim());
    };
    //替换控制字符
    Toolkit.prototype.strReplaceCtrChar = function (str) {
        if (str) {
            return str.replace(/[\x00-\x1f]+/g, '');
        }
        return str;
    };
    //通过排序比较2个数组是否包含相同的元素
    Toolkit.prototype.compareArraySort = function (a1, a2) {
        if ((!a1 && a2) || (a1 && !a2))
            return false;
        if (a1.length !== a2.length)
            return false;
        var a11 = [].concat(a1);
        var a22 = [].concat(a2);
        a11 = a11.sort();
        a22 = a22.sort();
        for (var i = 0, n = a11.length; i < n; i++) {
            if (a11[i] !== a22[i])
                return false;
        }
        return true;
    };
    /**
    * 如果是艾特外链组装参数
    * @param url 原有链接
    * @returns
    */
    Toolkit.prototype.AssembyUrl = function (url) {
        var userid = Global.PlayerData.uid;
        var appid = Global.customApp.getAppID();
        var vip = Global.PlayerData.vip;
        var appName = Global.Setting.SystemInfo.appName;
        var userName = Global.PlayerData.nickname;
        var ip = Global.PlayerData.ip;
        var ostype = Global.Toolkit.getOsType();
        var point = Global.PlayerData.point;
        var checkStr = cc.js.formatStr("%s-%s-[%s]-%s-%s-game688@aite", appid, 1, userid, vip, userName);
        var appKey = Global.AESUtil.md5(checkStr);
        url = url + "&userid=" + userid + "&appid=" + appid + "&username=" + userName + "&appname=" + appName + "&appkey=" + appKey + "&vip=" + vip + "&ip=" + ip + "&ostype=" + ostype + "&point=" + point;
        return url;
    };
    Toolkit._underscore = null;
    return Toolkit;
}());
exports.default = Toolkit;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHRvb2xcXFRvb2xraXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaUVBQWdFO0FBQ2hFLHNFQUFxRTtBQUNyRSx5REFBNEU7QUFDNUUsaURBQThEO0FBQzlELHdFQUFtRTtBQUNuRSwwRUFBbUU7QUFFbkUsa0VBQWlFO0FBRWpFLHNEQUFrRDtBQUdsRCwyREFBMkQ7QUFDM0Q7SUFBQTtRQUNXLGNBQVMsR0FBVyxrQ0FBa0MsQ0FBQztRQUN2RCxhQUFRLEdBQVcsa0JBQWtCLENBQUM7UUFFdEMsaUJBQVksR0FBVyxrQ0FBa0MsQ0FBQztRQUMxRCxnQkFBVyxHQUFXLGtCQUFrQixDQUFDO1FBRWhELGFBQWE7UUFDTCxtQkFBYyxHQUFXLGdFQUFnRSxDQUFDO1FBSTFGLFNBQUksR0FBVyxDQUFDLENBQUM7SUF3MkM3QixDQUFDO0lBbjJDRyxzQkFBVyxxQkFBVTthQUFyQjtZQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO2dCQUN0QixPQUFPLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTthQUM5QztZQUNELE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQTtRQUM5QixDQUFDOzs7T0FBQTtJQUNNLDJCQUFTLEdBQWhCLFVBQWlCLEdBQUcsRUFBRSxHQUFHO1FBQ3JCLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDTixNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ3hCLE9BQU07U0FDVDtRQUNELE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQzVCLElBQUksaUJBQWlCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQ3RGLE1BQU0sQ0FBQyxZQUFZLENBQUMsb0JBQW9C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QUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDNUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUNwRyxNQUFNLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUMxRCxNQUFNLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztRQUM1RCxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztRQUNsRCxNQUFNLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFBO1FBQ2pFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQ2hELElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUE7UUFDdkQsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQTtRQUN2RCxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFBO1FBQzNELE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUE7UUFDNUUsSUFBSSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQztRQUNwRSxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxHQUFHLENBQUE7UUFDOUQsTUFBTSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUE7UUFDbkQsSUFBSSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQztRQUN0RSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRTtZQUNyQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQy9ELE1BQU0sQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQTtZQUM3QixNQUFNLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUE7U0FDakM7UUFDRCxVQUFVO1FBQ1YsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsaUJBQWlCLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RyxXQUFXO1FBQ1gsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsaUJBQWlCLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RyxzRUFBc0U7UUFDdEUsMEVBQTBFO1FBQzFFLGtCQUFrQjtRQUNsQixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDL0YsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUE7U0FDdEI7UUFDRCxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQTtRQUN0RCxLQUFLO1FBQ0wsTUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7UUFDdkQsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFBO1FBQy9ELE1BQU0sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQTtRQUN2RSxNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDakQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVNLDRCQUFVLEdBQWpCO1FBQ0ksSUFBSSxPQUFPLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBRyxNQUFNO1FBQ3ZELE9BQU8sQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUUsSUFBSTtRQUNoRSxPQUFPLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFFLEtBQUs7UUFDakUsT0FBTyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFFLFNBQVM7UUFDM0QsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBYyxNQUFNO1FBQ3RELEtBQUs7UUFDTCxPQUFPLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztRQUN4RCxPQUFPLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUE7UUFDaEUsT0FBTyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQ2xELE9BQU8sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEdBQUcsQ0FBQTtRQUMvRCxPQUFPLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUE7UUFDeEUsT0FBTyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUE7UUFDcEQsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQTtRQUN2RCxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFBO1FBQ3ZELElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUE7UUFDM0QsT0FBTyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQTtRQUM3RSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7T0FHRztJQUNILGdDQUFjLEdBQWQ7UUFDSSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDdEQsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQzdELElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQTtRQUV2RCxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDbEIsT0FBTyxDQUFDLENBQUE7U0FDWDtRQUVELElBQUksUUFBUSxJQUFJLElBQUksSUFBSSxRQUFRLElBQUksR0FBRyxFQUFFO1lBQ3JDLE9BQU8sQ0FBQyxDQUFBO1NBQ1g7UUFFRCxJQUFJLFFBQVEsSUFBSSxHQUFHLEVBQUU7WUFDakIsSUFBSSxLQUFLLElBQUksR0FBRyxFQUFFO2dCQUNkLE9BQU8sQ0FBQyxDQUFBO2FBQ1g7WUFDRCxPQUFPLENBQUMsQ0FBQTtTQUNYO2FBQ0ksSUFBSSxRQUFRLElBQUksR0FBRyxFQUFFO1lBQ3RCLElBQUksS0FBSyxJQUFJLEdBQUcsRUFBRTtnQkFDZCxPQUFPLENBQUMsQ0FBQTthQUNYO1lBQ0QsT0FBTyxDQUFDLENBQUE7U0FDWDthQUNJLElBQUksUUFBUSxJQUFJLEdBQUcsRUFBRTtZQUN0QixPQUFPLENBQUMsQ0FBQTtTQUNYO2FBQ0k7WUFDRCxPQUFPLENBQUMsQ0FBQTtTQUNYO0lBQ0wsQ0FBQztJQUVELGlDQUFlLEdBQWYsVUFBZ0IsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ1IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDaEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2xDLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDakIsSUFBSSxJQUFJLEdBQUcsRUFBRSxFQUFFO2dCQUNYLENBQUMsSUFBSSxHQUFHLENBQUE7YUFDWDtZQUNELENBQUMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLElBQUksR0FBRyxHQUFHLEVBQUUsRUFBRTtnQkFBRSxDQUFDLElBQUksR0FBRyxDQUFDO2FBQUU7WUFDM0IsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDZixJQUFJLEdBQUcsR0FBRyxFQUFFLEVBQUU7Z0JBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQzthQUFFO1lBQzNCLENBQUMsSUFBSSxHQUFHLENBQUM7U0FDWjtRQUNELE9BQU8sQ0FBQyxDQUFBO0lBQ1osQ0FBQztJQUVELGtCQUFrQjtJQUNYLG1DQUFpQixHQUF4QjtRQUNJLHNGQUFzRjtRQUN0RixZQUFZO1FBQ1osSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO1FBRW5ELGtIQUFrSDtRQUNsSCwwREFBMEQ7UUFDMUQsbUJBQW1CO1FBQ25CLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUVsRCwwREFBMEQ7UUFDMUQsb0JBQW9CO1FBQ3BCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFN0UsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyx1QkFBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3BFLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsdUJBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNsRSxJQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLHVCQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDcEUsSUFBSSxNQUFNLEdBQUcsTUFBTSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUEsQ0FBRSxhQUFhO1FBRWpELElBQUksWUFBWSxFQUFFO1lBQ2QsTUFBTSxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUE7U0FDekI7UUFDRCxJQUFJLFdBQVcsRUFBRTtZQUNiLE1BQU0sR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFBO1NBQ3pCO1FBQ0QsSUFBSSxZQUFZLEVBQUU7WUFDZCxNQUFNLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQTtTQUN6QjtRQUNELE1BQU0sR0FBRyxNQUFNLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQTtRQUM5QixnQkFBZ0I7UUFFaEIsNkVBQTZFO1FBQzdFLCtCQUErQjtRQUMvQix3Q0FBd0M7UUFHeEMsc0RBQXNEO1FBQ3RELHVCQUF1QjtRQUN2QixJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUVwQyxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDO1FBQ3pELE9BQU8sUUFBUSxHQUFHLEdBQUcsR0FBRyxXQUFXLENBQUM7SUFDeEMsQ0FBQztJQUVNLDRCQUFVLEdBQWpCO1FBQ0ksSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDOUMsb0NBQW9DO1FBQ3BDLDhEQUE4RDtRQUM5RCxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzlELElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ2pDLE9BQU8sS0FBSyxHQUFHLEdBQUcsR0FBRyxTQUFTLEdBQUcsR0FBRyxHQUFHLGNBQWMsQ0FBQztJQUMxRCxDQUFDO0lBR00sa0NBQWdCLEdBQXZCO1FBQ0ksSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxFQUFFO1lBQzVCLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDN0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNyRDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxtQkFBbUI7SUFDWixpQ0FBZSxHQUF0QixVQUF1QixFQUFVLEVBQUUsSUFBZ0I7UUFBaEIscUJBQUEsRUFBQSxRQUFnQjtRQUMvQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRDs7O09BR0c7SUFDSSxrQ0FBZ0IsR0FBdkIsVUFBd0IsR0FBZTtRQUNuQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ04sT0FBTyxFQUFFLENBQUM7U0FDYjtRQUNELElBQUksTUFBTSxrQkFBTyxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUNqQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1QsT0FBTyxDQUFDLEVBQUU7WUFDTixDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2pCO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVNLHFCQUFHLEdBQVYsVUFBVyxPQUFPO1FBQ2QsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtZQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLGVBQU0sQ0FBQyxhQUFhLENBQUMsU0FBRyxDQUFDLENBQUM7U0FDOUM7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVELGNBQWM7SUFDUCwrQkFBYSxHQUFwQjtRQUNJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBR00sMkJBQVMsR0FBaEI7UUFDSSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRO1lBQ2hCLE9BQU8sQ0FBQyxDQUFDO1FBQ2IsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVU7WUFDOUIsT0FBTyxDQUFDLENBQUM7UUFDYixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTTtZQUMxQixPQUFPLENBQUMsQ0FBQztRQUNiLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUdNLGlDQUFlLEdBQXRCO1FBRUksSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzFELElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFBO1FBQ3BDLElBQUksU0FBUyxJQUFJLFlBQVksSUFBSSxZQUFZLElBQUksU0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRTtZQUM3RixPQUFPLElBQUksQ0FBQTtTQUNkO1FBQ0QsT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQztJQUNNLDhCQUFZLEdBQW5CO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzVCLElBQUksSUFBSSxJQUFJLENBQUM7WUFDVCxPQUFPLFNBQVMsQ0FBQztRQUNyQixJQUFJLElBQUksSUFBSSxDQUFDO1lBQ1QsT0FBTyxLQUFLLENBQUE7UUFDaEIsT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQztJQUVNLDRCQUFVLEdBQWpCLFVBQWtCLElBQWEsRUFBRSxHQUFXO1FBQ3hDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFDLEtBQUssRUFBRSxPQUFPO1lBQzVDLElBQUksS0FBSyxFQUFFO2dCQUNQLE1BQU0sQ0FBQyxLQUFLLENBQUMscUNBQXFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNoRSxPQUFPO2FBQ1Y7WUFDRCxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsRUFBRSxFQUFFO2dCQUNMLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2FBQ3REO1lBQ0QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUMzQixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzdCLEVBQUUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLGdDQUFjLEdBQXJCLFVBQXNCLE1BQWMsRUFBRSxNQUFrQixFQUFFLEtBQWMsRUFBRSxNQUFlO1FBQ3JGLGtGQUFrRjtRQUNsRixJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksTUFBTSxJQUFJLFNBQVMsSUFBSSxNQUFNLElBQUksRUFBRSxFQUFFO1lBQ3ZELE1BQU0sQ0FBQyxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztZQUM1RCxPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFO1lBQ2pFLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQSxDQUFDLHVDQUF1QztZQUM5RixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQ1QsRUFBRSxHQUFHLENBQUMsQ0FBQTthQUNUO1lBQ0QsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7U0FDM0I7UUFDRCxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyw2QkFBNkIsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMxRixJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQUU7WUFDckIsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsR0FBRyxNQUFNLEdBQUcsYUFBYSxDQUFDLENBQUM7WUFDM0UsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUVELElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLElBQUksU0FBUyxFQUFFO1lBQ3ZDLEtBQUssR0FBRyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNwRCxNQUFNLEdBQUcsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDeEQsTUFBTSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUE7WUFDeEMsTUFBTSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUE7WUFDbkIsTUFBTSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7WUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztTQUMvQjtRQUNELE9BQU8sV0FBVyxDQUFDO0lBQ3ZCLENBQUM7SUFHRDs7Ozs7T0FLRztJQUNJLDJDQUF5QixHQUFoQyxVQUFpQyxNQUFpQixFQUFFLFNBQWlCLEVBQUUsTUFBdUIsRUFBRSxRQUF5QjtRQUFsRCx1QkFBQSxFQUFBLGNBQXVCO1FBQUUseUJBQUEsRUFBQSxnQkFBeUI7UUFDckgsSUFBSSxXQUFXLEdBQUcsbURBQW1ELENBQUM7UUFDdEUsa0VBQWtFO1FBQ2xFLElBQUksUUFBUSxHQUFHLGFBQWEsR0FBRyxTQUFTLENBQUM7UUFDekMsSUFBSSxNQUFNLEVBQUU7WUFDUixRQUFRLElBQUksUUFBUSxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxNQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRTtZQUN2RSxNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUE7WUFDL0UsTUFBTSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUE7UUFDdkIsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUlEOzs7OztPQUtHO0lBQ0ksb0NBQWtCLEdBQXpCLFVBQTBCLE1BQWlCLEVBQUUsU0FBaUIsRUFBRSxNQUF1QixFQUFFLFFBQXlCO1FBQWxELHVCQUFBLEVBQUEsY0FBdUI7UUFBRSx5QkFBQSxFQUFBLGdCQUF5QjtRQUM5Ryx3RUFBd0U7UUFDeEUsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUM7UUFDaEUsSUFBSSxRQUFRLEdBQUcsYUFBYSxHQUFHLFNBQVMsQ0FBQztRQUN6QyxJQUFJLE1BQU0sRUFBRTtZQUNSLFFBQVEsSUFBSSxRQUFRLENBQUM7U0FDeEI7UUFDRCxPQUFPLE1BQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFO1lBQ3ZFLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQTtZQUMvRSxNQUFNLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQTtRQUN2QixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDZCxDQUFDO0lBR0Q7Ozs7O01BS0U7SUFDSyx5Q0FBdUIsR0FBOUIsVUFBK0IsTUFBaUIsRUFBRSxTQUFpQixFQUFFLE1BQXVCLEVBQUUsUUFBeUI7UUFBbEQsdUJBQUEsRUFBQSxjQUF1QjtRQUFFLHlCQUFBLEVBQUEsZ0JBQXlCO1FBQ25ILElBQUksV0FBVyxHQUFHLG1EQUFtRCxDQUFDO1FBQ3RFLGtFQUFrRTtRQUNsRSxJQUFJLFFBQVEsR0FBRyxhQUFhLEdBQUcsU0FBUyxDQUFDO1FBQ3pDLElBQUksTUFBTSxFQUFFO1lBQ1IsUUFBUSxJQUFJLFFBQVEsQ0FBQztTQUN4QjtRQUNELE9BQU8sTUFBTSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUU7WUFDdkUsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFBO1lBQy9FLE1BQU0sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFBO1FBQ3ZCLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNkLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksOEJBQVksR0FBbkIsVUFBb0IsTUFBaUIsRUFBRSxHQUFHO1FBQ3RDLHdFQUF3RTtRQUN4RSxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQztRQUNoRSxJQUFJLFFBQVEsR0FBRyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQzlCLE9BQU8sTUFBTSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzVGLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksa0NBQWdCLEdBQXZCLFVBQXdCLE1BQWlCLEVBQUUsR0FBRztRQUMxQyx3RUFBd0U7UUFDeEUsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUM7UUFDaEUsSUFBSSxRQUFRLEdBQUcsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUM5QixPQUFPLE1BQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBR0Q7Ozs7TUFJRTtJQUNLLDZCQUFXLEdBQWxCLFVBQW1CLE1BQWlCLEVBQUUsR0FBRztRQUNyQyxJQUFJLFdBQVcsR0FBRyxtREFBbUQsQ0FBQztRQUN0RSxtRUFBbUU7UUFDbkUsSUFBSSxRQUFRLEdBQUcsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUM5QixPQUFPLE1BQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSw4QkFBWSxHQUFuQixVQUFvQixNQUFpQixFQUFFLE1BQU0sRUFBRSxJQUFJO1FBQy9DLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDO1FBQ2hFLElBQUksUUFBUSxHQUFHLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDcEMsT0FBTyxNQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQU1EOzs7O09BSUc7SUFDSSxzQ0FBb0IsR0FBM0IsVUFBNEIsTUFBaUIsRUFBRSxHQUFHO1FBQzlDLHdFQUF3RTtRQUN4RSxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQztRQUNoRSxJQUFJLFFBQVEsR0FBRyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQzlCLE9BQU8sTUFBTSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzVGLENBQUM7SUFJTSwyQkFBUyxHQUFoQixVQUFpQixHQUFHO1FBQ2hCLE9BQU8sUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUE7SUFDcEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksZ0NBQWMsR0FBckIsVUFBc0IsS0FBaUI7UUFBakIsc0JBQUEsRUFBQSxTQUFpQjtRQUNuQyxrREFBa0Q7UUFDbEQsNkJBQTZCO1FBQzdCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUEsK0RBQStEO0lBQ2xILENBQUM7SUFFRCxPQUFPO0lBQ1AseUJBQXlCO0lBQ2xCLDZCQUFXLEdBQWxCLFVBQW1CLEtBQWEsRUFBRSxJQUFRLEVBQUUsVUFBYztRQUF4QixxQkFBQSxFQUFBLFFBQVE7UUFBRSwyQkFBQSxFQUFBLGNBQWM7UUFDdEQsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDcEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBTSxvQkFBb0I7UUFDaEUsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLENBQUM7Z0JBQ0YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDO1lBQ3RELEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ0osSUFBSSxJQUFJLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFlLG9CQUFvQjtnQkFDakUsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hCLE9BQU8sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUM7YUFDM0Q7WUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNKLElBQUksSUFBSSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBZSxvQkFBb0I7Z0JBQ2pFLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN4QixPQUFPLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDO2FBQzVEO1lBQ0Q7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDO1NBQ3pEO0lBQ0wsQ0FBQztJQUVNLHlCQUFPLEdBQWQsVUFBZSxJQUFjO1FBQ3pCLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2QsS0FBSyxJQUFJLENBQUMsSUFBSSxPQUFPLEVBQUU7WUFDbkIsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLE1BQU0sSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtnQkFDOUgsU0FBUzthQUNaO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoQjtRQUNELHNCQUFzQjtRQUN0Qiw2QkFBNkI7SUFDakMsQ0FBQztJQUdEOzs7Ozs7OztPQVFHO0lBQ0ksZ0NBQWMsR0FBckIsVUFBc0IsS0FBYSxFQUFFLEdBQW9CLEVBQUUsUUFBeUIsRUFBRSxJQUFhO1FBQTlELG9CQUFBLEVBQUEsV0FBb0I7UUFBRSx5QkFBQSxFQUFBLGdCQUF5QjtRQUNoRixJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ04sSUFBSSxRQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbkQsSUFBSSxRQUFRLElBQUksS0FBSyxJQUFJLENBQUM7Z0JBQ3RCLFFBQU0sR0FBRyxHQUFHLEdBQUcsUUFBTSxDQUFDO1lBQzFCLE9BQU8sUUFBTSxDQUFDO1NBQ2pCO1FBQ0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQzdDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUQsSUFBSSxRQUFRLElBQUksS0FBSyxJQUFJLENBQUM7WUFDdEIsTUFBTSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7UUFDMUIsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksd0NBQXNCLEdBQTdCLFVBQThCLEdBQWdCLEVBQUUsUUFBWSxFQUFFLFNBQWE7UUFBN0Msb0JBQUEsRUFBQSxRQUFnQjtRQUFFLHlCQUFBLEVBQUEsWUFBWTtRQUFFLDBCQUFBLEVBQUEsYUFBYTtRQUN2RSxJQUFJLEdBQUcsSUFBSSxFQUFFO1lBQUUsT0FBTyxFQUFFLENBQUE7UUFDeEIsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUN2QixJQUFJLFFBQVEsR0FBRyxTQUFTLElBQUksS0FBSyxFQUFFO1lBQy9CLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3JDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDaEQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO1lBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssR0FBRyxRQUFRLEdBQUcsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNuRCxNQUFNLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQzthQUN6QjtZQUNELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDekM7YUFDSTtZQUNELE9BQU8sV0FBVyxDQUFBO1NBQ3JCO0lBQ0wsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksbUNBQWlCLEdBQXhCLFVBQXlCLEdBQWdCLEVBQUUsT0FBZSxFQUFFLFNBQWlCO1FBQXBELG9CQUFBLEVBQUEsUUFBZ0I7UUFBbUIsMEJBQUEsRUFBQSxpQkFBaUI7UUFDekUsR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3JDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQy9CLEdBQUcsR0FBRyxPQUFPLENBQUM7UUFDbEIsSUFBSSxHQUFHLElBQUksRUFBRSxJQUFJLEtBQUssSUFBSSxPQUFPO1lBQzdCLE9BQU8sR0FBRyxDQUFDO1FBQ2YsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxHQUFHLEdBQUcsQ0FBQztnQkFDUCxNQUFNO1lBQ1YsTUFBTSxJQUFJLENBQUMsQ0FBQztTQUNmO1FBQ0QsSUFBSSxTQUFTLEVBQUU7WUFDWCxPQUFPLE1BQU0sQ0FBQztTQUNqQjthQUNJO1lBQ0QsT0FBTyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUVNLHlCQUFPLEdBQWQsVUFBZSxHQUFnQjtRQUFoQixvQkFBQSxFQUFBLFFBQWdCO1FBQzNCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLElBQUksRUFBRTtZQUNyQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ2I7YUFBTTtZQUNILEtBQUssR0FBRyxDQUFDLENBQUM7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTSwrQkFBYSxHQUFwQixVQUFxQixHQUFnQjtRQUFoQixvQkFBQSxFQUFBLFFBQWdCO1FBQ2pDLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNuQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLFVBQVUsSUFBSSxLQUFLLENBQUM7U0FDdkI7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksK0JBQWEsR0FBcEIsVUFBcUIsR0FBRztRQUNwQixLQUFLLElBQUksR0FBRyxJQUFJLEdBQUc7WUFDZixPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2QsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNkLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLGdDQUFjLEdBQXJCLFVBQXNCLFdBQW9CLEVBQUUsTUFBYyxFQUFFLEtBQWE7UUFDckUsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDckUsT0FBTyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksd0NBQXNCLEdBQTdCLFVBQThCLFdBQW9CLEVBQUUsTUFBYztRQUM5RCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUssY0FBYztRQUNsRCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQVEsV0FBVztRQUMvQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxzQ0FBb0IsR0FBM0IsVUFBNEIsV0FBb0IsRUFBRSxDQUFTLEVBQUUsQ0FBUztRQUNsRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuQyxPQUFPLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksOEJBQVksR0FBbkIsVUFBb0IsS0FBYyxFQUFFLEdBQVk7UUFDNUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hELElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFpQixxQkFBcUI7WUFDckQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO2FBQ04seUJBQXlCO1lBQ3pELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxpQ0FBZSxHQUF0QixVQUF1QixLQUFjLEVBQUUsR0FBWTtRQUMvQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksb0NBQWtCLEdBQXpCLFVBQTBCLEtBQWMsRUFBRSxLQUFjLEVBQUUsS0FBb0I7UUFBcEIsc0JBQUEsRUFBQSxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSTtRQUMxRSxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEQsT0FBTyxLQUFLLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUNEOzs7T0FHRztJQUNILHlCQUFPLEdBQVAsVUFBUSxHQUFRO1FBQ1osV0FBVztRQUNYLHFCQUFxQjtRQUNyQixhQUFhO1FBQ2IsSUFBSTtRQUNKLFNBQVM7UUFDVCxnQkFBZ0I7UUFDaEIsSUFBSTtRQUNKLE9BQU8sQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ25DLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILDRCQUFVLEdBQVYsVUFBVyxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQVc7UUFBWCx1QkFBQSxFQUFBLFdBQVc7UUFDN0IsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFBLGlDQUFpQztRQUNsRyxJQUFJLEdBQUcsRUFBRTtZQUNMLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtTQUNkO1FBQ0QsNEJBQTRCO1FBQzVCLGdGQUFnRjtRQUNoRixJQUFJO1FBQ0osaUJBQWlCO1FBQ2pCLFFBQVE7UUFDUiwrQ0FBK0M7UUFDL0Msb0NBQW9DO1FBQ3BDLFFBQVE7UUFDUixLQUFLO1FBQ0wsdUNBQXVDO1FBQ3ZDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUMzQixNQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3JDLHdDQUF3QztZQUN4QyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RDLHdDQUF3QztJQUM1QyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsMEJBQVEsR0FBUixVQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUk7UUFFM0IsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRVosS0FBSztRQUNMLEdBQUcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDL0IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN2QixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxLQUFLLEdBQUcsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN6RCxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWCxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFWixTQUFTO1FBQ1QsSUFBSSxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsNEJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQixNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZCxHQUFHLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQy9CLElBQUksSUFBSSxHQUFHLEtBQUssR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUVsQyxJQUFJLEtBQUssR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLElBQUksS0FBSyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLEtBQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDaEMsS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDaEMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRTtvQkFDekIsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRyxFQUFFLElBQUksR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsTUFBTSxHQUFHLEtBQUssR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNsSCxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQ2Q7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUVELGlCQUFpQjtJQUNqQiwrQkFBYSxHQUFiLFVBQWMsSUFBWTtRQUN0QixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFFO1lBQ3JDLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDcEMsT0FBTyxLQUFLLENBQUM7YUFDaEI7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO0lBQ04sZ0NBQWMsR0FBZCxVQUFlLFFBQWdCLEVBQUUsUUFBZ0I7UUFDN0Msb0dBQW9HO1FBQ3BHLGdDQUFnQztRQUNoQyxnQ0FBZ0M7UUFDaEMsd0NBQXdDO1FBQ3hDLCtCQUErQjtRQUMvQixzQ0FBc0M7UUFDdEMsaUNBQWlDO1FBQ2pDLDZCQUE2QjtRQUM3QixJQUFJO1FBQ0osNENBQTRDO1FBQzVDLHFCQUFxQjtRQUNyQixvRkFBb0Y7UUFDcEYsT0FBTyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7O09BR0c7SUFDSSx5QkFBTyxHQUFkLFVBQWUsR0FBUTtRQUNuQixJQUFJLEdBQUcsRUFBRTtZQUNMLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDMUM7YUFDSTtZQUNELE9BQU8sRUFBRSxDQUFBO1NBQ1o7SUFDTCxDQUFDO0lBRUQscUNBQXFDO0lBQzdCLG9DQUFrQixHQUExQjtRQUNJLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVE7WUFDaEIsT0FBTztRQUNYLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsb0JBQW9CLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLG9CQUFvQixJQUFJLEVBQUU7WUFDaEgsT0FBTztRQUNYLElBQUksS0FBSyxHQUFRLEVBQUUsQ0FBQTtRQUNuQixLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNmLEtBQUssQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3pDLEtBQUssQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbkUsS0FBSyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsRSxLQUFLLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BFLEtBQUssQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQzVDLEtBQUssQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDO1FBQzVELEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQztRQUN0RSxLQUFLLENBQUMscUJBQXFCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUM7UUFDOUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDcEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsdUJBQVksQ0FBQyxlQUFlLEVBQUUsS0FBSyxFQUFFLFVBQUMsR0FBRztZQUNyRSxJQUFJLEdBQUcsRUFBRTtnQkFDTCxJQUFJLEdBQUcsR0FBUSxFQUFFLENBQUE7Z0JBQ2pCLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDbEIsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDO2dCQUN6QixNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsR0FBRyxHQUFHLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNsRCxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO2FBQ2pEO1FBQ0wsQ0FBQyxFQUFFLGNBQVEsT0FBTyxLQUFLLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUM5QixDQUFDO0lBR0Q7Ozs7T0FJRztJQUNJLHFDQUFtQixHQUExQixVQUEyQixjQUFjLEVBQUUsVUFBYztRQUFkLDJCQUFBLEVBQUEsY0FBYztRQUNyRCxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRO1lBQ2hCLE9BQU8sSUFBSSxDQUFBO1FBQ2YsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFBO1FBQ2xELElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUU1QixxQ0FBcUM7UUFDckMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxVQUFVLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRTtZQUNsRSxjQUFjLEdBQUcsVUFBVSxDQUFDO1NBQy9CO1FBRUQsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxJQUFJLGNBQWM7WUFDekMsT0FBTyxJQUFJLENBQUM7UUFDaEIsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELGtGQUFrRjtJQUVsRjs7Ozs7O09BTUc7SUFDSSxpQ0FBZSxHQUF0QixVQUF1QixPQUFlLEVBQUUsS0FBZ0IsRUFBRSxLQUFnQixFQUFFLElBQWdCO1FBQWhCLHFCQUFBLEVBQUEsUUFBZ0I7UUFDeEYsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksUUFBUTtZQUM1QixPQUFPO1FBQ1gsSUFBSSxJQUFJLEdBQVEsRUFBRSxDQUFBO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztJQUMvQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksaUNBQWUsR0FBdEIsVUFBdUIsSUFBSTtRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDdEMsQ0FBQztJQUVELHFCQUFxQjtJQUNkLG9DQUFrQixHQUF6QixVQUEwQixNQUFNLEVBQUUsSUFBSztRQUNuQyxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7WUFDaEIsT0FBTTtTQUNUO1FBQ0QsSUFBSSxJQUFJLEdBQVEsRUFBRSxDQUFBO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUNyQyxDQUFDO0lBRU0sMkJBQVMsR0FBaEIsVUFBaUIsR0FBVyxFQUFFLEtBQVU7UUFDcEMsSUFBSSxJQUFJLEdBQVEsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QyxJQUFJO1lBQ0EsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsT0FBTyxDQUFDLEVBQUU7WUFDTixNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNsQyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNuQyxNQUFNLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyx1QkFBWSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGNBQVEsT0FBTyxLQUFLLENBQUEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDMUcsQ0FBQztJQUVNLDJCQUFTLEdBQWhCLFVBQWlCLElBQUksRUFBRSxPQUFZO1FBQVosd0JBQUEsRUFBQSxZQUFZO1FBQy9CLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQU0sTUFBTSxHQUFHLE9BQU8sSUFBSSx5QkFBeUIsQ0FBQztRQUNwRCxJQUFJLElBQUksQ0FBQztRQUNULElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQzFCLElBQUksR0FBRyxJQUFJLENBQUM7U0FDZjthQUFNO1lBQ0gsSUFBSSxDQUFDLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO2dCQUN2RCxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pCO1lBQ0QsSUFBSSxDQUFDLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDL0QsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7YUFDdEI7WUFDRCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7UUFDRCxJQUFNLFNBQVMsR0FBRztZQUNkLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JCLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQztZQUN0QixDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtTQUNuQixDQUFBO1FBQ0QsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxVQUFDLE1BQU0sRUFBRSxHQUFHO1lBQy9ELElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixxQ0FBcUM7WUFDckMsSUFBSSxHQUFHLEtBQUssR0FBRyxFQUFFO2dCQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUFFO1lBQUEsQ0FBQztZQUN2RSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxFQUFFLEVBQUU7Z0JBQ2pDLEtBQUssR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO2FBQ3ZCO1lBQ0QsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksaUNBQWUsR0FBdEIsVUFBdUIsR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFTO1FBQ3JDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ2pDLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUMvRCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxLQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3hDLEtBQUcsQ0FBQyxrQkFBa0IsR0FBRztnQkFDckIsSUFBSSxLQUFHLENBQUMsVUFBVSxLQUFLLENBQUMsRUFBRTtvQkFDdEIsSUFBSSxLQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTt3QkFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxLQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO3FCQUMzRDt5QkFBTTt3QkFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQy9CO2lCQUNKO1lBQ0wsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNiLEtBQUcsQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDO1lBQ2pDLEtBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzQixLQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZDthQUNJO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBRU0sa0NBQWdCLEdBQXZCLFVBQXdCLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUztRQUM3QyxJQUFJLE9BQU8sSUFBSSxLQUFLLFdBQVcsRUFBRTtZQUM3QixtREFBbUQ7WUFDbkQsK0NBQStDO1lBQy9DLElBQUk7WUFDSixJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsQ0FBQyxFQUFFO2dCQUMvRCxNQUFNLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ3BDO2lCQUFNO2dCQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQzthQUMzQztTQUNKO2FBQU07WUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7WUFDM0MsSUFBSSxRQUFRLEVBQUU7Z0JBQ1YsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQ2pCO1NBQ0o7SUFDTCxDQUFDO0lBRU0seUJBQU8sR0FBZCxVQUFlLFFBQVEsRUFBRSxRQUFRO1FBQzdCLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLEdBQUcsRUFBRSxPQUFPO1lBQzNDLElBQUksR0FBRyxFQUFFO2dCQUNMLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ3JDLEdBQUcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2lCQUNyQztnQkFDRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ25CO2lCQUFNO2dCQUNILElBQUksT0FBTyxFQUFFO29CQUNULElBQUksUUFBUSxFQUFFO3dCQUNWLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDckI7aUJBQ0o7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUdNLG9DQUFrQixHQUF6QixVQUEwQixHQUFvQjtRQUFwQixvQkFBQSxFQUFBLG9CQUFvQjtRQUMxQyxNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUU7WUFDekIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQ7O1dBRU87SUFDQSwrQkFBYSxHQUFwQixVQUFxQixLQUFLO1FBQ3RCLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN2QixJQUFJLEdBQUcsRUFBRTtZQUNMLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUE7WUFDekQsSUFBSSxRQUFRLEVBQUU7Z0JBQ1YsT0FBTyxLQUFLLENBQUM7YUFDaEI7aUJBQU07Z0JBQ0gsT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVNLDRCQUFVLEdBQWpCLFVBQWtCLEtBQVksRUFBRSxRQUFRO1FBQXRCLHNCQUFBLEVBQUEsWUFBWTtRQUMxQixJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUN0QixPQUFPLEtBQUssQ0FBQTtTQUNmO1FBQ0QsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ2pCLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDekQsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQzVDLElBQUksUUFBUSxJQUFJLFFBQVEsSUFBSSxLQUFLLEVBQUU7b0JBQy9CLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDO29CQUMvQyxJQUFJLFFBQVEsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxRQUFRLEVBQUU7d0JBQ2hELElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUNwRCxJQUFJLEdBQUcsR0FBRyxNQUFNLEdBQUcsS0FBSyxHQUFHLFdBQVcsQ0FBQTt3QkFDdEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQTt3QkFDdEMsT0FBTyxLQUFLLENBQUM7cUJBQ2hCO2lCQUNKO2FBQ0o7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7T0FFRztJQUNJLHNDQUFvQixHQUEzQjtRQUNJLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUU7WUFDaEMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUU7Z0JBQy9CLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLDJCQUEyQixFQUFFO29CQUNqRCxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDbkMsQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsT0FBTyxJQUFJLENBQUE7YUFDZDtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQztJQUdEOzs7T0FHRztJQUVJLGlDQUFlLEdBQXRCLFVBQXVCLEtBQUs7UUFDeEIsSUFBSSxLQUFLLElBQUksR0FBRyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsZUFBZSxFQUFFO2dCQUNyQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQTtZQUNGLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7TUFJRTtJQUNLLCtCQUFhLEdBQXBCLFVBQXFCLEtBQWMsRUFBRSxNQUFlLEVBQUUsT0FBdUI7UUFBdkIsd0JBQUEsRUFBQSxjQUF1QjtRQUN6RSxJQUFJLEtBQUssSUFBSSxNQUFNLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzVELElBQUksT0FBTyxFQUFFO2dCQUNULElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3hFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDMUI7aUJBQ0k7Z0JBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMzQjtTQUNKO2FBQ0k7WUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVEOztNQUVFO0lBQ0ssK0JBQWEsR0FBcEIsVUFBcUIsS0FBYTtRQUM5QixJQUFJLEtBQUssR0FBRyxJQUFJO1lBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFFLFFBQVE7YUFDdEQsSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUk7WUFDcEMsT0FBTyxLQUFLLEdBQUcsRUFBRSxDQUFDOztZQUVsQixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ2hFLENBQUM7SUFHTSxrQ0FBZ0IsR0FBdkIsVUFBd0IsT0FBTztRQUMzQixJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksT0FBTyxJQUFJLFNBQVMsRUFBQyxhQUFhO1NBQ3pEO1lBQ0ksT0FBTyxJQUFJLENBQUE7U0FDZDtRQUNELElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUMvRSxJQUFJLE9BQU8sSUFBSSxRQUFRLENBQUMsY0FBYyxFQUFFO1lBQ3BDLE9BQU8sSUFBSSxDQUFBO1NBQ2Q7YUFDSSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDaEUsT0FBTyxLQUFLLENBQUE7U0FDZjthQUNJO1lBQ0QsT0FBTyxJQUFJLENBQUE7U0FDZDtJQUNMLENBQUM7SUFFTSxnQ0FBYyxHQUFyQixVQUFzQixRQUFnQjtRQUNsQyxJQUFJLE1BQU0sRUFBRTtZQUNSLE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUE7U0FDN0M7UUFDRCxPQUFPLEtBQUssQ0FBQTtJQUNoQixDQUFDO0lBRU0sbUNBQWlCLEdBQXhCO1FBQ0ksSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN6RSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsRUFBRTtZQUM1QixJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUMzQixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQWMsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN2RTtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxZQUFZO0lBQ0wsdUNBQXFCLEdBQTVCO1FBQ0ksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFBO1FBQ2pCLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQTtRQUN2RCxRQUFRLFFBQVEsRUFBRTtZQUNkLEtBQUssVUFBVSxDQUFDO1lBQ2hCLEtBQUssVUFBVSxDQUFDO1lBQ2hCLEtBQUssWUFBWSxDQUFDO1lBQ2xCLEtBQUssa0JBQWtCO2dCQUNuQixNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNmLE1BQU07U0FDYjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxhQUFhO0lBQ04sNkNBQTJCLEdBQWxDO1FBQ0ksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFBO1FBQ2pCLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQTtRQUN2RCxRQUFRLFFBQVEsRUFBRTtZQUNkLEtBQUssVUFBVSxDQUFDO1lBQ2hCLEtBQUssa0JBQWtCO2dCQUNuQixNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNmLE1BQU07U0FDYjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFTSxrQ0FBZ0IsR0FBdkIsVUFBd0IsT0FBTztRQUMzQixJQUFJLFVBQVUsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25FLElBQUksV0FBVyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVELElBQUksTUFBTSxHQUFHLEVBQUUsRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQzdCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsT0FBTyxPQUFPLEdBQUcsQ0FBQyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxHQUFHLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNULElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1AsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDWixNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztpQkFDbkM7YUFDSjtpQkFBTTtnQkFDSCxJQUFJLEdBQUcsS0FBSyxDQUFDO2dCQUNiLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU0sSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDO2FBQzVCO1lBQ0QsT0FBTyxFQUFFLENBQUM7WUFDVixPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDdEM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRU0sNkJBQVcsR0FBbEIsVUFBbUIsR0FBVztRQUUxQixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxRQUFRLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDbEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUN0QixPQUFPLElBQUksQ0FBQTtTQUNkO1FBQ0QsT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUVsRCxDQUFDO0lBRUQsUUFBUTtJQUNELG1DQUFpQixHQUF4QixVQUF5QixHQUFHO1FBQ3hCLElBQUksR0FBRyxFQUFFO1lBQ0wsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUMzQztRQUNELE9BQU8sR0FBRyxDQUFBO0lBQ2QsQ0FBQztJQUNELHFCQUFxQjtJQUNkLGtDQUFnQixHQUF2QixVQUF3QixFQUFFLEVBQUUsRUFBRTtRQUMxQixJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUM3QyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFDLE1BQU07WUFBRSxPQUFPLEtBQUssQ0FBQztRQUMxQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQixHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFBRSxPQUFPLEtBQUssQ0FBQztTQUN2QztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7OztNQUlFO0lBQ0YsNEJBQVUsR0FBVixVQUFXLEdBQUc7UUFDVixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztRQUNuQyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ3ZDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFBO1FBQy9CLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQTtRQUMvQyxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQTtRQUN6QyxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQTtRQUM3QixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQ3ZDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFBO1FBQ25DLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLCtCQUErQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUVoRyxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUV6QyxHQUFHLEdBQU0sR0FBRyxnQkFBVyxNQUFNLGVBQVUsS0FBSyxrQkFBYSxRQUFRLGlCQUFZLE9BQU8sZ0JBQVcsTUFBTSxhQUFRLEdBQUcsWUFBTyxFQUFFLGdCQUFXLE1BQU0sZUFBVSxLQUFPLENBQUE7UUFFM0osT0FBTyxHQUFHLENBQUE7SUFDZCxDQUFDO0lBbjJDYyxtQkFBVyxHQUFHLElBQUksQ0FBQztJQXEyQ3RDLGNBQUM7Q0FwM0NELEFBbzNDQyxJQUFBO2tCQXAzQ29CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBDcnlwdG8gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9saWJzL2NyeXB0b1RzL2NyeXB0by10c1wiXHJcbmltcG9ydCB7IE1ENSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvbGlicy9jcnlwdG9Ucy9hbGdvL01ENVwiO1xyXG5pbXBvcnQgeyBIYXNoZXIgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2xpYnMvY3J5cHRvVHMvbGliL0hhc2hlclwiO1xyXG5pbXBvcnQgeyBRUkVycm9yQ29ycmVjdExldmVsLCBRUkNvZGUgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2xpYnMvcXJjb2RlXCJcclxuaW1wb3J0IHsgTmV0TG9naW4sIE5ldENsaWVudExvZyB9IGZyb20gXCIuLi9uZXQvaGFsbC9OZXRFdmVudFwiO1xyXG5pbXBvcnQgSGFsbFN0b3JhZ2VLZXkgZnJvbSBcIi4uLy4uL2hhbGxjb21tb24vY29uc3QvSGFsbFN0b3JhZ2VLZXlcIjtcclxuaW1wb3J0IHsgRFVOVFlQRSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvbmV0L2R1bi9BcHBEdW5Db250cm9sXCI7XHJcbmltcG9ydCB7IFNlcnZlclVybCB9IGZyb20gXCIuLi9zZXR0aW5nL1NlcnZlclJvdXRlc1wiO1xyXG5pbXBvcnQgeyBSZXBvcnRUb29sIH0gZnJvbSBcIi4uLy4uLy4uL2xvZ2ljL2NvcmUvdG9vbC9SZXBvcnRUb29sXCI7XHJcbmltcG9ydCBTZXR0aW5nIGZyb20gXCIuLi9zZXR0aW5nL1NldHRpbmdcIjtcclxuaW1wb3J0IHsgU2NlbmVUeXBlIH0gZnJvbSBcIi4uL3NjZW5lL1NjZW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgUHJlTG9hZFByb3h5IGZyb20gXCIuLi9sb2FkaW5nTVZDL1ByZUxvYWRQcm94eVwiO1xyXG5pbXBvcnQgU2tpbkNvbmZpZyBmcm9tIFwiLi4vLi4vaGFsbGNvbW1vbi9hcHAvU2tpbkNvbmZpZ1wiO1xyXG4vLyBpbXBvcnQgUVJDb2RlVGlwIGZyb20gXCIuLi8uLi9oYWxsL3VpL3dhaXRpbmcvUVJDb2RlVGlwXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvb2xraXQge1xyXG4gICAgcHVibGljIGNyeXB0b0tleTogc3RyaW5nID0gXCJ5YW94aW5nODkwMTIzNDU2MTIzNDU2Nzg5MDEyMzQ4OFwiO1xyXG4gICAgcHVibGljIGNyeXB0b0l2OiBzdHJpbmcgPSBcInlhb3hpbmc4OTAxMjM0ODhcIjtcclxuXHJcbiAgICBwdWJsaWMgcm91dGVDcnlwS2V5OiBzdHJpbmcgPSBcImtqaGxvdXl1ZjIwOTg3Njc3ODY5ODg3OTc4OTg3Mjc3XCI7XHJcbiAgICBwdWJsaWMgcm91dGVDcnlwSXY6IHN0cmluZyA9IFwia2pobG91eXVmMjA5ODc2N1wiO1xyXG5cclxuICAgIC8qKiDlr4bnoIHmo4DmtYvlrZfnrKbkuLIqL1xyXG4gICAgcHJpdmF0ZSBfcHdDaGVja1N0cmluZzogc3RyaW5nID0gXCIwMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5elwiO1xyXG5cclxuICAgIHByaXZhdGUgTUQ1SGFzaGVyO1xyXG5cclxuICAgIHByaXZhdGUgdXVpZDogbnVtYmVyID0gMDtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3VuZGVyc2NvcmUgPSBudWxsO1xyXG5cclxuICAgIHN0YXRpYyBnZXQgdW5kZXJzY29yZSgpIHtcclxuICAgICAgICBpZiAoIVRvb2xraXQuX3VuZGVyc2NvcmUpIHtcclxuICAgICAgICAgICAgVG9vbGtpdC5fdW5kZXJzY29yZSA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gVG9vbGtpdC5fdW5kZXJzY29yZVxyXG4gICAgfVxyXG4gICAgcHVibGljIHJlbW92ZURpcihnaWQsIGVycikge1xyXG4gICAgICAgIGlmICghZ2lkKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuS8oOWFpeeahEdpZOS4uuepulwiKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLov5vlhaXlrZDmuLjmiI/lpLHotKVcIilcclxuICAgICAgICBsZXQgY3VyR2FtZVVwZGF0ZVBhdGggPSBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5nZXROYXRpdmVIb3RVcGRhdGVQYXRoKGdpZC50b1N0cmluZygpKVxyXG4gICAgICAgIEdsb2JhbC5TY2VuZU1hbmFnZXIucmVtb3ZlR2FtZVNlYXJjaFBhdGgoZ2lkLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgR2xvYmFsLlNjZW5lTWFuYWdlci5yZWxlYXNlQ3VyR2FtZUJ1bmRsZSgpXHJcbiAgICAgICAgY2Muc3lzLmdhcmJhZ2VDb2xsZWN0KClcclxuICAgICAgICBpZiAoanNiLmZpbGVVdGlscy5pc0RpcmVjdG9yeUV4aXN0KGN1ckdhbWVVcGRhdGVQYXRoKSkge1xyXG4gICAgICAgICAgICBqc2IuZmlsZVV0aWxzLnJlbW92ZURpcmVjdG9yeShjdXJHYW1lVXBkYXRlUGF0aClcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLlNjZW5lTWFuYWdlci5zY2VuZVR5cGUgPSBTY2VuZVR5cGUuSGFsbFxyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5VUERBVEVfU1VCX0dBTUVfRkFJTEVELCBnaWQpXHJcbiAgICAgICAgbGV0IHJlcG9ydFBhcmFtID0geyBcInJlc3VsdFwiOiBlcnIsIFwiZ2lkXCI6IGdpZC50b1N0cmluZygpIH1cclxuICAgICAgICBHbG9iYWwuUmVwb3J0VG9vbC5SZXBvcnRDbGllbnRFcnJvcihSZXBvcnRUb29sLlJFUE9SVF9UWVBFX0xPQURTVUJHQU1FX0VSUk9SLCByZXBvcnRQYXJhbSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFkanVzdFVybCh1cmw6IHN0cmluZykge1xyXG4gICAgICAgIGlmICghdXJsKSByZXR1cm4gdXJsXHJcbiAgICAgICAgaWYgKHVybC5sZW5ndGggPiAwICYmIHVybFt1cmwubGVuZ3RoIC0gMV0gIT0gJy8nKSB7XHJcbiAgICAgICAgICAgIHVybCArPSBcIi9cIlxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdXJsXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5Yik5pat5piv5ZCm5pivaXBob25lNiAgXHJcbiAgICAvL2lQaG9uZTZQIDogaVBob25lNywxICAgaVBob25lNjYgOiBpUGhvbmU3LDJcclxuICAgIC8vaVBob25lNnMgOiBpUGhvbmU4LDEgIGlQaG9uZTZzcCA6IGlQaG9uZTgsMiAgaXBob25lU0UgOiBpUGhvbmU4LDRcclxuICAgIHB1YmxpYyBpc0lwaG9uZTYoKSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSAhPSBjYy5zeXMuSVBIT05FKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgbGV0IGJyYW5kID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5vc0J1aWxkTW9kZWw7XHJcbiAgICAgICAgaWYgKGJyYW5kLmluZGV4T2YoXCJpUGhvbmU3XCIpID49IDAgfHwgYnJhbmQuaW5kZXhPZihcImlQaG9uZThcIikgPj0gMClcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgLy8gcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6LCD5pW0aXBob25lWOWdkOagh1xyXG4gICAgICogQHBhcmFtIHdpZGdldHNMaXN0ICDpnIDopoHosIPmlbTnmoR3aWRnZXToioLngrlcclxuICAgICAqIEBwYXJhbSBvZmZzZXQg5YGP56e75YC877yM6buY6K6k5Li6NjBcclxuICAgICAqIEBwYXJhbSBpc1BvcnRyYWl0IOaWsOWinuerluWxj+WPmOmHjywg5aSE55CG5oyJ6ZKu5Zyo6aG26YOo54q25oCB5qCP54K55LiN5YiwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGp1c3RJcGhvbmVYKHdpZGdldHNMaXN0OiBjYy5Ob2RlW10sIG9mZnNldCA9IDYwLCBpc1BvcnRyYWl0OiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAod2lkZ2V0c0xpc3QgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKCFHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmlzSXBob25lWClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2lkZ2V0c0xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB3aWRnZXRzTGlzdFtpXTtcclxuICAgICAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCB8fCAhbm9kZS5pc1ZhbGlkKVxyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIGxldCB3aWRnaHQgPSBub2RlLmdldENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG4gICAgICAgICAgICBpZiAod2lkZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNQb3J0cmFpdClcclxuICAgICAgICAgICAgICAgICAgICB3aWRnaHQudG9wICs9IG9mZnNldDtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB3aWRnaHQubGVmdCArPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlkITkuKrmlrnlkJHnmoTpgILphY1cclxuICAgICAqIEBwYXJhbSB3aWRnZXRzTGlzdCDpgILphY3oioLngrlcclxuICAgICAqIEBwYXJhbSBvZmZzZXQg5YGP56e7IOm7mOiupDYwXHJcbiAgICAgKiBAcGFyYW0gZGlyIOaWueWQkSBcImxlZnRcIiBcInJpZ2h0XCIgXCJ0b3BcIiBcImJvdHRvbVwiIOm7mOiupFwibGVmdFwiXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmcmVlQWRqdXN0SXBob25lWCh3aWRnZXRzTGlzdDogY2MuTm9kZVtdLCBvZmZzZXQgPSA2MCwgZGlyOiBzdHJpbmcgPSBcImxlZnRcIikge1xyXG4gICAgICAgIGlmICh3aWRnZXRzTGlzdCA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAoIUdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uaXNJcGhvbmVYKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aWRnZXRzTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHdpZGdldHNMaXN0W2ldO1xyXG4gICAgICAgICAgICBpZiAobm9kZSA9PSBudWxsIHx8ICFub2RlLmlzVmFsaWQpXHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgbGV0IHdpZGdodCA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLldpZGdldCk7XHJcbiAgICAgICAgICAgIGlmICh3aWRnaHQpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoZGlyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImxlZnRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2h0LmxlZnQgKz0gb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwicmlnaHRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2h0LnJpZ2h0ICs9IG9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRvcFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnaHQudG9wICs9IG9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImJvdHRvbVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnaHQuYm90dG9tICs9IG9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFNwcmVhZEltZ1BhdGgoKSB7XHJcbiAgICAgICAgbGV0IGZpbGVQYXRoID0ganNiLmZpbGVVdGlscy5nZXRXcml0YWJsZVBhdGgoKSArIEdsb2JhbC5Ub29sa2l0Lm1kNShHbG9iYWwuU2V0dGluZy5VcmxzLmludml0ZVVybCkgKyAnX2NhcEltYWdlLnBuZyc7XHJcbiAgICAgICAgcmV0dXJuIGZpbGVQYXRoXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUVtb2ppKGNvbnRlbnQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBjb250ZW50LnJlcGxhY2UoLyg/OltcXHUyNzAwLVxcdTI3YmZdfCg/OlxcdWQ4M2NbXFx1ZGRlNi1cXHVkZGZmXSl7Mn18W1xcdWQ4MDAtXFx1ZGJmZl1bXFx1ZGMwMC1cXHVkZmZmXXxbXFx1MDAyMy1cXHUwMDM5XVxcdWZlMGY/XFx1MjBlM3xcXHUzMjk5fFxcdTMyOTd8XFx1MzAzZHxcXHUzMDMwfFxcdTI0YzJ8XFx1ZDgzY1tcXHVkZDcwLVxcdWRkNzFdfFxcdWQ4M2NbXFx1ZGQ3ZS1cXHVkZDdmXXxcXHVkODNjXFx1ZGQ4ZXxcXHVkODNjW1xcdWRkOTEtXFx1ZGQ5YV18XFx1ZDgzY1tcXHVkZGU2LVxcdWRkZmZdfFxcdWQ4M2NbXFx1ZGUwMS1cXHVkZTAyXXxcXHVkODNjXFx1ZGUxYXxcXHVkODNjXFx1ZGUyZnxcXHVkODNjW1xcdWRlMzItXFx1ZGUzYV18XFx1ZDgzY1tcXHVkZTUwLVxcdWRlNTFdfFxcdTIwM2N8XFx1MjA0OXxbXFx1MjVhYS1cXHUyNWFiXXxcXHUyNWI2fFxcdTI1YzB8W1xcdTI1ZmItXFx1MjVmZV18XFx1MDBhOXxcXHUwMGFlfFxcdTIxMjJ8XFx1MjEzOXxcXHVkODNjXFx1ZGMwNHxbXFx1MjYwMC1cXHUyNkZGXXxcXHUyYjA1fFxcdTJiMDZ8XFx1MmIwN3xcXHUyYjFifFxcdTJiMWN8XFx1MmI1MHxcXHUyYjU1fFxcdTIzMWF8XFx1MjMxYnxcXHUyMzI4fFxcdTIzY2Z8W1xcdTIzZTktXFx1MjNmM118W1xcdTIzZjgtXFx1MjNmYV18XFx1ZDgzY1xcdWRjY2Z8XFx1MjkzNHxcXHUyOTM1fFtcXHUyMTkwLVxcdTIxZmZdKS9nLCBcIj9cIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrQ29udGFpbnNFbW9qaShjb250ZW50OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcmVnID0gLyg/OltcXHUyNzAwLVxcdTI3YmZdfCg/OlxcdWQ4M2NbXFx1ZGRlNi1cXHVkZGZmXSl7Mn18W1xcdWQ4MDAtXFx1ZGJmZl1bXFx1ZGMwMC1cXHVkZmZmXXxbXFx1MDAyMy1cXHUwMDM5XVxcdWZlMGY/XFx1MjBlM3xcXHUzMjk5fFxcdTMyOTd8XFx1MzAzZHxcXHUzMDMwfFxcdTI0YzJ8XFx1ZDgzY1tcXHVkZDcwLVxcdWRkNzFdfFxcdWQ4M2NbXFx1ZGQ3ZS1cXHVkZDdmXXxcXHVkODNjXFx1ZGQ4ZXxcXHVkODNjW1xcdWRkOTEtXFx1ZGQ5YV18XFx1ZDgzY1tcXHVkZGU2LVxcdWRkZmZdfFxcdWQ4M2NbXFx1ZGUwMS1cXHVkZTAyXXxcXHVkODNjXFx1ZGUxYXxcXHVkODNjXFx1ZGUyZnxcXHVkODNjW1xcdWRlMzItXFx1ZGUzYV18XFx1ZDgzY1tcXHVkZTUwLVxcdWRlNTFdfFxcdTIwM2N8XFx1MjA0OXxbXFx1MjVhYS1cXHUyNWFiXXxcXHUyNWI2fFxcdTI1YzB8W1xcdTI1ZmItXFx1MjVmZV18XFx1MDBhOXxcXHUwMGFlfFxcdTIxMjJ8XFx1MjEzOXxcXHVkODNjXFx1ZGMwNHxbXFx1MjYwMC1cXHUyNkZGXXxcXHUyYjA1fFxcdTJiMDZ8XFx1MmIwN3xcXHUyYjFifFxcdTJiMWN8XFx1MmI1MHxcXHUyYjU1fFxcdTIzMWF8XFx1MjMxYnxcXHUyMzI4fFxcdTIzY2Z8W1xcdTIzZTktXFx1MjNmM118W1xcdTIzZjgtXFx1MjNmYV18XFx1ZDgzY1xcdWRjY2Z8XFx1MjkzNHxcXHUyOTM1fFtcXHUyMTkwLVxcdTIxZmZdKS9nXHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQubWF0Y2gocmVnKSAhPSBudWxsXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZW5EZXZpY2VJZCgpIHtcclxuICAgICAgICAvLyByZXR1cm4gXCIxMjM0NTY3ODg5OTlcIjtcclxuICAgICAgICBmdW5jdGlvbiBTNCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICgoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApIHwgMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gZ3VpZCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChTNCgpICsgUzQoKSArIFwiLVwiICsgUzQoKSArIFwiLVwiICsgUzQoKSArIFwiLVwiICsgUzQoKSArIFwiLVwiICsgUzQoKSArIFM0KCkgKyBTNCgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGd1aWQoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdlbkRldmljZUluZm8oKSB7XHJcbiAgICAgICAgbGV0IGRldmljZTogYW55ID0ge31cclxuICAgICAgICBkZXZpY2UuZGV2aWNlX2lkID0gXCJbXCIgKyBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmRldmljZUlkICsgXCJdXCI7XHJcbiAgICAgICAgZGV2aWNlLm9zX3R5cGUgPSBHbG9iYWwuVG9vbGtpdC5nZXRPc1R5cGUoKTtcclxuICAgICAgICBkZXZpY2Uub3NfdmVyc2lvbiA9IGNjLnN5cy5vcyArIFwifFwiICsgY2Muc3lzLm9zVmVyc2lvbiArIFwifFwiICsgR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5idW5kbGVOYW1lO1xyXG4gICAgICAgIGRldmljZS5hcHBfdmVyc2lvbiA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uYXBwVmVyc2lvbjtcclxuICAgICAgICBkZXZpY2UucGhvbmVfbW9kZWwgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLm9zQnVpbGRNb2RlbDtcclxuICAgICAgICBkZXZpY2Uuc2lnbiA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8ubG9naW5TaWduO1xyXG4gICAgICAgIGRldmljZS5waG9uZV9kZXZpY2VfYnJhbmQgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmRldmljZUJyYW5kXHJcbiAgICAgICAgZGV2aWNlLnd4X2tleSA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8ud3hLZXk7XHJcbiAgICAgICAgbGV0IGhhbGxTa2luID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5oYWxsU2tpbiB8fCBcIlwiXHJcbiAgICAgICAgbGV0IGdhbWVTa2luID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5nYW1lU2tpbiB8fCBcIlwiXHJcbiAgICAgICAgbGV0IHBhY2thZ2VUYWcgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLnBhY2thZ2VUYWcgfHwgXCJcIlxyXG4gICAgICAgIGRldmljZS50YWdJbmZvID0gY2MuanMuZm9ybWF0U3RyKFwiJXN8JXN8JXNcIiwgaGFsbFNraW4sIGdhbWVTa2luLCBwYWNrYWdlVGFnKVxyXG4gICAgICAgIHZhciBuYXRpdmVTY3JlZW5XaWR0aCA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8ubmF0aXZlU2NyZWVuV2lkdGg7XHJcbiAgICAgICAgZGV2aWNlLnVkaWQgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLnVkaWQudG9TdHJpbmcoKSB8fCBcIjBcIlxyXG4gICAgICAgIGRldmljZS5hcHBfc2lnbiA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uYXBwU2lnblxyXG4gICAgICAgIHZhciBuYXRpdmVTY3JlZW5IZWlnaHQgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLm5hdGl2ZVNjcmVlbkhlaWdodDtcclxuICAgICAgICBpZiAoR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby53ZWJnbERhdGEpIHtcclxuICAgICAgICAgICAgbGV0IHdlYmdsRGF0YSA9IEpTT04ucGFyc2UoR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby53ZWJnbERhdGEpXHJcbiAgICAgICAgICAgIGRldmljZS5ndiA9IHdlYmdsRGF0YS52ZXJzaW9uXHJcbiAgICAgICAgICAgIGRldmljZS5nciA9IHdlYmdsRGF0YS5yZW5kZXJlclxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+Wxj+W5leWuveW6pu+8iOWDj+e0oO+8iVxyXG4gICAgICAgIGRldmljZS53ID0gTnVtYmVyKG5hdGl2ZVNjcmVlbldpZHRoIDwgbmF0aXZlU2NyZWVuSGVpZ2h0ID8gbmF0aXZlU2NyZWVuV2lkdGggOiBuYXRpdmVTY3JlZW5IZWlnaHQpIHx8IDA7XHJcbiAgICAgICAgLy8g5bGP5bmV6auY5bqm77yI5YOP57Sg77yJXHJcbiAgICAgICAgZGV2aWNlLmggPSBOdW1iZXIobmF0aXZlU2NyZWVuV2lkdGggPiBuYXRpdmVTY3JlZW5IZWlnaHQgPyBuYXRpdmVTY3JlZW5XaWR0aCA6IG5hdGl2ZVNjcmVlbkhlaWdodCkgfHwgMDtcclxuICAgICAgICAvLyBMb2dnZXIuZXJyb3IoXCIrKysrKysrKysrKysrKysrKysrKysrbmF0aXZlU2NyZWVuV2lkdGg6OlwiK2RldmljZS53KTtcclxuICAgICAgICAvLyBMb2dnZXIuZXJyb3IoXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tbmF0aXZlU2NyZWVuSGVpZ2h0OjpcIitkZXZpY2UuaCk7XHJcbiAgICAgICAgLy9BbmRyb2lkIOmrmOeJiOacrOiuvuWkh+eggeWkhOeQhlxyXG4gICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQgJiYgKEdsb2JhbC5Ub29sa2l0LnZlcnNpb25Db21wYXJlKGNjLnN5cy5vc1ZlcnNpb24sIFwiOVwiKSA+PSAwKSkge1xyXG4gICAgICAgICAgICBkZXZpY2UubmVlZF9zaWQgPSAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRldmljZS5zZXJ2ZXJfaWQgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLnNlcnZlcl9pZFxyXG4gICAgICAgIC8v5qih5ouf5ZmoXHJcbiAgICAgICAgZGV2aWNlLnNpbXVsYXRvciA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uc2ltdWxhdG9yO1xyXG4gICAgICAgIGRldmljZS5lbnRyeSA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uZW50cnkudG9TdHJpbmcoKSB8fCBcIlwiXHJcbiAgICAgICAgZGV2aWNlLnNpZ25fdHlwZSA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uc2lnbl90eXBlLnRvU3RyaW5nKCkgfHwgXCJcIlxyXG4gICAgICAgIGRldmljZS5pb3NfdHlwZSA9IEdsb2JhbC5Ub29sa2l0LmdldElvc1NpZ25UeXBlKClcclxuICAgICAgICByZXR1cm4gZGV2aWNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZW5SZWdJbmZvKCkge1xyXG4gICAgICAgIGxldCByZWdJbmZvOiBhbnkgPSB7fTtcclxuICAgICAgICByZWdJbmZvLnBhY2tJbmZvID0gR2xvYmFsLlNldHRpbmcuQ2hhbm5lbEluZm87ICAgLy/muKDpgZPkv6Hmga9cclxuICAgICAgICByZWdJbmZvLmJ1bmRsZU5hbWUgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmJ1bmRsZU5hbWU7ICAvL+WMheWQjVxyXG4gICAgICAgIHJlZ0luZm8uYXBwVmVyc2lvbiA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uYXBwVmVyc2lvbjsgIC8v54mI5pys5Y+3XHJcbiAgICAgICAgcmVnSW5mby5maXJzdE9wZW5UaW1lID0gdGhpcy5nZXRGaXJzdE9wZW5UaW1lKCk7ICAvL+esrOS4gOasoeaJk+W8gOaXtumXtFxyXG4gICAgICAgIHJlZ0luZm8ub3NUeXBlID0gdGhpcy5nZXRPc1R5cGUoKTsgICAgICAgICAgICAgIC8v57O757uf57G75Z6LXHJcbiAgICAgICAgLy/mqKHmi5/lmahcclxuICAgICAgICByZWdJbmZvLnNpbXVsYXRvciA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uc2ltdWxhdG9yO1xyXG4gICAgICAgIHJlZ0luZm8uZW50cnkgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmVudHJ5LnRvU3RyaW5nKCkgfHwgXCJcIlxyXG4gICAgICAgIHJlZ0luZm8uaW9zX3R5cGUgPSBHbG9iYWwuVG9vbGtpdC5nZXRJb3NTaWduVHlwZSgpXHJcbiAgICAgICAgcmVnSW5mby51ZGlkID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby51ZGlkLnRvU3RyaW5nKCkgfHwgXCIwXCJcclxuICAgICAgICByZWdJbmZvLnNpZ25fdHlwZSA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uc2lnbl90eXBlLnRvU3RyaW5nKCkgfHwgXCJcIlxyXG4gICAgICAgIHJlZ0luZm8uYXBwX3NpZ24gPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmFwcFNpZ25cclxuICAgICAgICBsZXQgaGFsbFNraW4gPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmhhbGxTa2luIHx8IFwiXCJcclxuICAgICAgICBsZXQgZ2FtZVNraW4gPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmdhbWVTa2luIHx8IFwiXCJcclxuICAgICAgICBsZXQgcGFja2FnZVRhZyA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8ucGFja2FnZVRhZyB8fCBcIlwiXHJcbiAgICAgICAgcmVnSW5mby50YWdJbmZvID0gY2MuanMuZm9ybWF0U3RyKFwiJXN8JXN8JXNcIiwgaGFsbFNraW4sIGdhbWVTa2luLCBwYWNrYWdlVGFnKVxyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShyZWdJbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMgaW9z562+5ZCN57G75Z6LIDAg5pyq6K+G5YirIDEgTURN5YaF6YOo5LyB5Lia562+IDLpnZ5NRE3lhoXpg6jkvIHkuJrnrb4gMyBNRE3lhoXpg6jotoXnuqfnrb4gNOmdnk1ETeWGhemDqOi2hee6p+etviA1IOWklumDqOi2hee6p+etviAgNyBURuWMhSA2IOiHquW7ulRGXHJcbiAgICAgKi9cclxuICAgIGdldElvc1NpZ25UeXBlKCkge1xyXG4gICAgICAgIGxldCBlbnRyeSA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uZW50cnkudG9TdHJpbmcoKVxyXG4gICAgICAgIGxldCBzaWduVHlwZSA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uc2lnbl90eXBlLnRvU3RyaW5nKClcclxuICAgICAgICBsZXQgcGxhdGZvcm0gPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLm5hdGl2ZVBsYXRmb3JtXHJcblxyXG4gICAgICAgIGlmIChwbGF0Zm9ybSA9PSBcIlRGXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDdcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwbGF0Zm9ybSA9PSBcIlRGXCIgJiYgc2lnblR5cGUgPT0gXCI0XCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDZcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzaWduVHlwZSA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICBpZiAoZW50cnkgPT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIDJcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc2lnblR5cGUgPT0gXCIyXCIpIHtcclxuICAgICAgICAgICAgaWYgKGVudHJ5ID09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gM1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiA0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHNpZ25UeXBlID09IFwiM1wiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA1XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZWNvbmRGb3JtYXRITVMocykge1xyXG4gICAgICAgIHZhciB0ID0gXCJcIjtcclxuICAgICAgICBpZiAocyA+IC0xKSB7XHJcbiAgICAgICAgICAgIGxldCBob3VyID0gTWF0aC5mbG9vcihzIC8gMzYwMCk7XHJcbiAgICAgICAgICAgIGxldCBtaW4gPSBNYXRoLmZsb29yKHMgLyA2MCkgJSA2MDtcclxuICAgICAgICAgICAgbGV0IHNlYyA9IHMgJSA2MDtcclxuICAgICAgICAgICAgaWYgKGhvdXIgPCAxMCkge1xyXG4gICAgICAgICAgICAgICAgdCArPSBcIjBcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHQgKz0gaG91ciArIFwiOlwiO1xyXG4gICAgICAgICAgICBpZiAobWluIDwgMTApIHsgdCArPSBcIjBcIjsgfVxyXG4gICAgICAgICAgICB0ICs9IG1pbiArIFwiOlwiO1xyXG4gICAgICAgICAgICBpZiAoc2VjIDwgMTApIHsgdCArPSBcIjBcIjsgfVxyXG4gICAgICAgICAgICB0ICs9IHNlYztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRcclxuICAgIH1cclxuXHJcbiAgICAvL+a4oOmBk+WPtyAg5YyF54mI5pys5Y+3ICDotYTmupDniYjmnKzlj7dcclxuICAgIHB1YmxpYyBnZW5Mb2FkaW5nQXBwSW5mbygpIHtcclxuICAgICAgICAvL+ebtOaOpeiwg+eUqOWOn+eUn+aWueazlSDigJxnZXROYXRpdmVQYXJhbXPigJ0g6L+U5Zue5omA6ZyA5pWw5o2u44CCICDmlbDmja7mnaXmupAtPiDmiZPljIXml7bkvb/nlKjnmoTphY3nva7mlofku7Yg5L6L5aaCNTg4XzU4OC5qc29uIOS4reeahFwiQ2hhbm5lbElEXCLlrZfmrrVcclxuICAgICAgICAvL+mdnuWOn+eUnyDmmK8gbnVsbFxyXG4gICAgICAgIGxldCBwYWNrSWQgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLnBhY2tDaGFubmVsO1xyXG5cclxuICAgICAgICAvL+ebtOaOpeiwg+eUqOWOn+eUn+aWueazlSDigJxnZXROYXRpdmVQYXJhbXPigJ0g6L+U5Zue5omA6ZyA5pWw5o2u44CCICDmlbDmja7mnaXmupAtPiDmiZPljIXml7bkvb/nlKjnmoTphY3nva7mlofku7Yg5L6L5aaCNTg4XzU4OC5qc29uIOS4reeahFwiQXBwVmVyc2lvblwi5a2X5q61IOaIluiAheWRveS7pOaJk+WMheaXtuS8oOmAkueahOWPguaVsCAtUHZlciDpmYTluKbnmoTmlbDmja4gIFxyXG4gICAgICAgIC8v5aaC5p6c6YWN572u5paH5Lu25Lit5rKh5pyJ77yM5bm25LiU5omT5YyF5pe25pyq5Lyg6YCSLVB2ZXLlj4LmlbDvvIzliJnkvb/nlKggYnVpbGQuZ3JhZGxlIOS4reeahOm7mOiupOmFjee9riBcIjEwMDBcIlxyXG4gICAgICAgIC8v6Z2e5Y6f55SfIOWuouaIt+err+WGmeatu+eahOaYryA0MDAwMFxyXG4gICAgICAgIGxldCBhcHBWZXIgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmFwcFZlcnNpb247XHJcblxyXG4gICAgICAgIC8v6K+75Y+W54Ot5pu05paH5Lu25Lit55qE54mI5pys5Y+377yM55u05o6l6YCa6L+H5Y6f55Sf6Lev5b6E55u05o6l6K6/6ZeuIHByb2plY3QubWFuaWZlc3Qg5Lit55qEY2ZnVmVyc2lvbuWtl+autVxyXG4gICAgICAgIC8v6Z2e5Y6f55SfIOWuouaIt+err+WGmeatu+eahOaYryAwLjAuMCBcclxuICAgICAgICBsZXQgY2ZnVmVyID0gR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuZ2V0TmF0aXZlSG90VXBkYXRlVmVyc2lvbihcImhhbGxcIiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGxldCBpc1l1bkR1bkluaXQgPSBHbG9iYWwuQXBwRHVuLmdldER1bklzSW5pdEJ5VHlwZShEVU5UWVBFLllVTl9EVU4pXHJcbiAgICAgICAgbGV0IGlzWkFEdW5Jbml0ID0gR2xvYmFsLkFwcER1bi5nZXREdW5Jc0luaXRCeVR5cGUoRFVOVFlQRS5aQV9EVU4pXHJcbiAgICAgICAgbGV0IGlzQWxpRHVuSW5pdCA9IEdsb2JhbC5BcHBEdW4uZ2V0RHVuSXNJbml0QnlUeXBlKERVTlRZUEUuQWxpX0RVTilcclxuICAgICAgICBsZXQgdmVyU3RyID0gY2ZnVmVyICsgXCJfXCIgKyBwYWNrSWQgIC8vMTExXzBfMTAwMDBcclxuXHJcbiAgICAgICAgaWYgKGlzWXVuRHVuSW5pdCkge1xyXG4gICAgICAgICAgICB2ZXJTdHIgPSB2ZXJTdHIgKyBcIl9ZXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzWkFEdW5Jbml0KSB7XHJcbiAgICAgICAgICAgIHZlclN0ciA9IHZlclN0ciArIFwiX1pcIlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNBbGlEdW5Jbml0KSB7XHJcbiAgICAgICAgICAgIHZlclN0ciA9IHZlclN0ciArIFwiX0FcIlxyXG4gICAgICAgIH1cclxuICAgICAgICB2ZXJTdHIgPSB2ZXJTdHIgKyBcIl9cIiArIGFwcFZlclxyXG4gICAgICAgIC8vcmV0dXJuIHZlclN0cjtcclxuXHJcbiAgICAgICAgLy8gYXBwSWQg5ZKMIGNoYW5uZWxQYWNrIOmDveaYr+mAmui/h+acjeWKoeWZqOivt+axgueahO+8jOaVsOaNruadpeiHqlByZUxvYWRQcm94eS50cyDnmoRyZXFTZXJ2ZXJBcHBDb25maWcoKeaWueazlVxyXG4gICAgICAgIC8vICAwMDAgXyAgMDAwIF80MDAwMCBfMzAwMiDigKIgMFxyXG4gICAgICAgIC8vY2ZnVmVyX3BhY2tJZF9hcHBWZXJfYXBwSWTigKJjaGFubmVsUGFja1xyXG5cclxuXHJcbiAgICAgICAgLy8gIGxldCBza2ludHlwZSA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uaGFsbFNraW47XHJcbiAgICAgICAgLy/kuLTml7bkvb/nlKhhcHBpZOS7o+abvyDvvIzlupTor6Xkvb/nlKjkuIrooYzku6PnoIFcclxuICAgICAgICBsZXQgc2tpbnR5cGUgPSBHbG9iYWwuU2V0dGluZy5hcHBJZDtcclxuXHJcbiAgICAgICAgbGV0IGNvZGVWZXJzaW9uID0gR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuaGFsbE5ld1ZlcnNpb247XHJcbiAgICAgICAgcmV0dXJuIHNraW50eXBlICsgXCJfXCIgKyBjb2RlVmVyc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2VuQXBwSW5mbygpIHtcclxuICAgICAgICBsZXQgbG9hZGluZ0FwcEluZm8gPSB0aGlzLmdlbkxvYWRpbmdBcHBJbmZvKCk7XHJcbiAgICAgICAgLy8gbGV0IGFwcElkID0gR2xvYmFsLlNldHRpbmcuYXBwSWQ7XHJcbiAgICAgICAgLy8gbGV0IGNoYW5uZWxQYWNrID0gR2xvYmFsLlNldHRpbmcuQ2hhbm5lbEluZm8uY29uZmlnQ2hhbm5lbDtcclxuICAgICAgICBsZXQgQ2hhbm5lbElEID0gR2xvYmFsLlNldHRpbmcuQ2hhbm5lbEluZm8uZ2V0UmVnaXN0Q2hhbm5lbCgpO1xyXG4gICAgICAgIGxldCBhcHBpZCA9IEdsb2JhbC5TZXR0aW5nLmFwcElkO1xyXG4gICAgICAgIHJldHVybiBhcHBpZCArIFwiX1wiICsgQ2hhbm5lbElEICsgXCJfXCIgKyBsb2FkaW5nQXBwSW5mbztcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldEZpcnN0T3BlblRpbWUoKSB7XHJcbiAgICAgICAgbGV0IHRpbWUgPSBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLmdldChcIkZpcnN0T3BlblRpbWVcIik7XHJcbiAgICAgICAgaWYgKHRpbWUgPT0gbnVsbCB8fCB0aW1lID09IFwiXCIpIHtcclxuICAgICAgICAgICAgdGltZSA9IERhdGUubm93KCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5zZXQoXCJGaXJzdE9wZW5UaW1lXCIsIHRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGltZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7jlswLW1heCnkuK3pgIkg6ZqP5py65LiA5Liq5pW05pWwXHJcbiAgICBwdWJsaWMgZ2V0Um91bmRJbnRlZ2VyKHRvOiBudW1iZXIsIGZyb206IG51bWJlciA9IDApIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihmcm9tICsgTWF0aC5yYW5kb20oKSAqICh0byAtIGZyb20pKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWwhuaVsOaNruS5seW6j+aOkuWIlyhGaXNoZXLigJNZYXRlcyBzaHVmZmxlIOa0l+eJjOeul+azlSlcclxuICAgICAqIEBwYXJhbSBhcnIg5Y6f5pWw57uEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRPdXRPcmRlckFycmF5KGFycjogQXJyYXk8YW55Pikge1xyXG4gICAgICAgIGlmICghYXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRtcEFyciA9IFsuLi5hcnJdO1xyXG4gICAgICAgIGxldCBtID0gdG1wQXJyLmxlbmd0aCxcclxuICAgICAgICAgICAgdCwgaTtcclxuICAgICAgICB3aGlsZSAobSkge1xyXG4gICAgICAgICAgICBpID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbS0tKTtcclxuICAgICAgICAgICAgdCA9IHRtcEFyclttXTtcclxuICAgICAgICAgICAgdG1wQXJyW21dID0gdG1wQXJyW2ldO1xyXG4gICAgICAgICAgICB0bXBBcnJbaV0gPSB0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdG1wQXJyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtZDUoY29udGVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLk1ENUhhc2hlciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTUQ1SGFzaGVyID0gSGFzaGVyLl9jcmVhdGVIZWxwZXIoTUQ1KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuTUQ1SGFzaGVyKGNvbnRlbnQpLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5blrqLmiLfnq6/ov5DooYzml7bllK/kuIBpZFxyXG4gICAgcHVibGljIGdldENsaWVudFV1aWQoKSB7XHJcbiAgICAgICAgdGhpcy51dWlkKys7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudXVpZDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldE9zVHlwZSgpIHtcclxuICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSlcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRClcclxuICAgICAgICAgICAgcmV0dXJuIDI7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKVxyXG4gICAgICAgICAgICByZXR1cm4gMztcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGNoZWNrTWVnZVNlcnZlcigpIHtcclxuXHJcbiAgICAgICAgbGV0IHBhY2thZ2VBcHBpZCA9IE51bWJlcihHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmFwcElEKVxyXG4gICAgICAgIGxldCBkYXRhQXBwaWQgPSBHbG9iYWwuU2V0dGluZy5hcHBJZFxyXG4gICAgICAgIGlmIChkYXRhQXBwaWQgJiYgcGFja2FnZUFwcGlkICYmIHBhY2thZ2VBcHBpZCAhPSBkYXRhQXBwaWQgJiYgIUdsb2JhbC5TZXR0aW5nLmlzQ2xvc2VNZWdlU2VydmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldE9zVHlwZVN0cigpIHtcclxuICAgICAgICBsZXQgdHlwZSA9IHRoaXMuZ2V0T3NUeXBlKCk7XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gMilcclxuICAgICAgICAgICAgcmV0dXJuIFwiYW5kcm9pZFwiO1xyXG4gICAgICAgIGlmICh0eXBlID09IDMpXHJcbiAgICAgICAgICAgIHJldHVybiBcImlvc1wiXHJcbiAgICAgICAgcmV0dXJuIFwid2ViXCJcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZFdlYlBpYyhub2RlOiBjYy5Ob2RlLCB1cmw6IHN0cmluZykge1xyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZCh1cmwsIChlcnJvciwgdGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIi0tLS0tLS0tLS0tLS0tbG9hZCBwaWMgZXJyb3ItLS0tLS0tXCIgKyBlcnJvci5tc2cpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzcCA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIGlmICghc3ApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBMb2dnZXIuZXJyb3IoXCJfX19fX19fX1/mib7kuI3liLBTcHJpdGVfX19fX19fX19cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGhlYWR3aWR0aCA9IG5vZGUud2lkdGg7XHJcbiAgICAgICAgICAgIGxldCBoZWFkSGVpZ2h0ID0gbm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHNwLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpO1xyXG4gICAgICAgICAgICBub2RlLndpZHRoID0gaGVhZHdpZHRoO1xyXG4gICAgICAgICAgICBub2RlLmhlaWdodCA9IGhlYWRIZWlnaHQ7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TG9jYWxIZWFkU2Yoc2ZOYW1lOiBzdHJpbmcsIHNwcml0ZT86IGNjLlNwcml0ZSwgd2lkdGg/OiBudW1iZXIsIGhlaWdodD86IG51bWJlcikge1xyXG4gICAgICAgIC8vIHJldHVybiBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmdldFNwcml0ZShcImhhbGwvdGV4dHVyZS9jb21tb24vaGVhZEltZ1wiLCBzZk5hbWUpO1xyXG4gICAgICAgIGlmIChzZk5hbWUgPT0gbnVsbCB8fCBzZk5hbWUgPT0gdW5kZWZpbmVkIHx8IHNmTmFtZSA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImdldExvY2FsSGVhZFNmKCkgc2ZOYW1lIGlzIGVtcHR5LCByZXR1cm4hISFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKE51bWJlcihzZk5hbWUpICYmIE51bWJlcihzZk5hbWUpID4gR2xvYmFsLlNldHRpbmcuaGVhZE5hbWVSYW5nZSkge1xyXG4gICAgICAgICAgICBsZXQgaWQgPSBOdW1iZXIoc2ZOYW1lKSAlIEdsb2JhbC5TZXR0aW5nLmhlYWROYW1lUmFuZ2UgLy8gMjAyMC4xLjIw5pqC5pe254m55q6K5aSE55CGIOmYsuatouWkp+aJueWktOWDj+S4gOagt+eahOmXrumimCAvLyBncmFjZVxyXG4gICAgICAgICAgICBpZiAoaWQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWQgPSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2ZOYW1lID0gKGlkKS50b1N0cmluZygpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzcHJpdGVGcmFtZSA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2V0U3ByaXRlKFwiaGFsbC90ZXh0dXJlL2NvbW1vbi9oZWFkSW1nXCIsIHNmTmFtZSk7XHJcbiAgICAgICAgaWYgKHNwcml0ZUZyYW1lID09IG51bGwpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZ2V0TG9jYWxIZWFkU2YoKSDmib7kuI3liLDlpLTlg48sIHNmTmFtZSA9IFwiICsgc2ZOYW1lICsgXCIsIHJldHVybiEhIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3ByaXRlICE9IG51bGwgJiYgc3ByaXRlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB3aWR0aCA9ICh3aWR0aCAhPSBudWxsKSA/IHdpZHRoIDogc3ByaXRlLm5vZGUud2lkdGg7XHJcbiAgICAgICAgICAgIGhlaWdodCA9IChoZWlnaHQgIT0gbnVsbCkgPyBoZWlnaHQgOiBzcHJpdGUubm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHNwcml0ZS5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5SQVdcclxuICAgICAgICAgICAgc3ByaXRlLnRyaW0gPSBmYWxzZVxyXG4gICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZTtcclxuICAgICAgICAgICAgc3ByaXRlLm5vZGUud2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgc3ByaXRlLm5vZGUuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3ByaXRlRnJhbWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L295aS05YOP5qGGIC0gIOWtkOa4uOaIj+S4k+eUqO+8iOWchuWktOWDj+ahhu+8iVxyXG4gICAgICogQHBhcmFtIHNwcml0ZSDlm77niYfnsr7ngbVcclxuICAgICAqIEBwYXJhbSBoZWFkS3Vhbmcg5aS05YOP5qGG55qEaWTlgLzlrZfnrKbkuLJcclxuICAgICAqIEBwYXJhbSBiR3Vhbmcg5piv5ZCm5Y+R5YWJ55qE5qGGXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkTG9jYWxIZWFkRnJhbWVCeUdhbWVzKHNwcml0ZTogY2MuU3ByaXRlLCBoZWFkS3Vhbmc6IHN0cmluZywgYkd1YW5nOiBib29sZWFuID0gZmFsc2UsIGlzQ3VzdG9tOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICB2YXIgYXRsYXNTdHJpbmcgPSBcImhhbGwvdGV4dHVyZS9oYWxsL2dhbWVfaGVhZF9rdWFuZy9nYW1lX2hlYWRfa3VhbmdcIjtcclxuICAgICAgICAvL3ZhciBhdGxhc1N0cmluZyA9IEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcucGxheWVySW5mb0F0bGFzUGF0aDtcclxuICAgICAgICB2YXIgc2ZTdHJpbmcgPSBcInR4a3VhbmdfdmlwXCIgKyBoZWFkS3Vhbmc7XHJcbiAgICAgICAgaWYgKGJHdWFuZykge1xyXG4gICAgICAgICAgICBzZlN0cmluZyArPSBcIl9ndWFuZ1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHNwcml0ZSwgYXRsYXNTdHJpbmcsIHNmU3RyaW5nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNwcml0ZS5zaXplTW9kZSA9IGlzQ3VzdG9tID8gY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTSA6IGNjLlNwcml0ZS5TaXplTW9kZS5SQVdcclxuICAgICAgICAgICAgc3ByaXRlLnRyaW0gPSBmYWxzZVxyXG4gICAgICAgIH0sIGZhbHNlKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L295aS05YOP5qGGXHJcbiAgICAgKiBAcGFyYW0gc3ByaXRlIOWbvueJh+eyvueBtVxyXG4gICAgICogQHBhcmFtIGhlYWRLdWFuZyDlpLTlg4/moYbnmoRpZOWAvOWtl+espuS4siAgYnkgY3Jpc1xyXG4gICAgICogQHBhcmFtIGJHdWFuZyDmmK/lkKblj5HlhYnnmoTmoYZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRMb2NhbEhlYWRGcmFtZShzcHJpdGU6IGNjLlNwcml0ZSwgaGVhZEt1YW5nOiBzdHJpbmcsIGJHdWFuZzogYm9vbGVhbiA9IGZhbHNlLCBpc0N1c3RvbTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgLy92YXIgYXRsYXNTdHJpbmcgPSBcImhhbGwvdGV4dHVyZS9oYWxsL3BsYXllckluZm8vQXV0b0F0bGFzX3BsYXllcmluZm9cIjtcclxuICAgICAgICB2YXIgYXRsYXNTdHJpbmcgPSBHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLnBsYXllckluZm9BdGxhc1BhdGg7XHJcbiAgICAgICAgdmFyIHNmU3RyaW5nID0gXCJ0eGt1YW5nX3ZpcFwiICsgaGVhZEt1YW5nO1xyXG4gICAgICAgIGlmIChiR3VhbmcpIHtcclxuICAgICAgICAgICAgc2ZTdHJpbmcgKz0gXCJfZ3VhbmdcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyhzcHJpdGUsIGF0bGFzU3RyaW5nLCBzZlN0cmluZywgKCkgPT4ge1xyXG4gICAgICAgICAgICBzcHJpdGUuc2l6ZU1vZGUgPSBpc0N1c3RvbSA/IGNjLlNwcml0ZS5TaXplTW9kZS5DVVNUT00gOiBjYy5TcHJpdGUuU2l6ZU1vZGUuUkFXXHJcbiAgICAgICAgICAgIHNwcml0ZS50cmltID0gZmFsc2VcclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDliqDovb3lpLTlg4/moYYgLOWKoOi9vVZJUOmHjOmdoueahOi1hOa6kFxyXG4gICAgKiBAcGFyYW0gc3ByaXRlIOWbvueJh+eyvueBtVxyXG4gICAgKiBAcGFyYW0gaGVhZEt1YW5nIOWktOWDj+ahhueahGlk5YC85a2X56ym5LiyXHJcbiAgICAqIEBwYXJhbSBiR3Vhbmcg5piv5ZCm5Y+R5YWJ55qE5qGGXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGxvYWRMb2NhbEhlYWRGcmFtZUJ5VmlwKHNwcml0ZTogY2MuU3ByaXRlLCBoZWFkS3Vhbmc6IHN0cmluZywgYkd1YW5nOiBib29sZWFuID0gZmFsc2UsIGlzQ3VzdG9tOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICB2YXIgYXRsYXNTdHJpbmcgPSBcImhhbGwvdGV4dHVyZS9oYWxsL3BsYXllckluZm8vQXV0b0F0bGFzX3BsYXllcmluZm9cIjtcclxuICAgICAgICAvL3ZhciBhdGxhc1N0cmluZyA9IEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcucGxheWVySW5mb0F0bGFzUGF0aDtcclxuICAgICAgICB2YXIgc2ZTdHJpbmcgPSBcInR4a3VhbmdfdmlwXCIgKyBoZWFkS3Vhbmc7XHJcbiAgICAgICAgaWYgKGJHdWFuZykge1xyXG4gICAgICAgICAgICBzZlN0cmluZyArPSBcIl9ndWFuZ1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHNwcml0ZSwgYXRsYXNTdHJpbmcsIHNmU3RyaW5nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNwcml0ZS5zaXplTW9kZSA9IGlzQ3VzdG9tID8gY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTSA6IGNjLlNwcml0ZS5TaXplTW9kZS5SQVdcclxuICAgICAgICAgICAgc3ByaXRlLnRyaW0gPSBmYWxzZVxyXG4gICAgICAgIH0sIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9vXZpcOWkp+Wbvuagh1xyXG4gICAgICogQHBhcmFtIHNwcml0ZSDlm77niYfnsr7ngbVcclxuICAgICAqIEBwYXJhbSB2aXAgdmlw562J57qnXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkTG9jYWxWaXAoc3ByaXRlOiBjYy5TcHJpdGUsIHZpcCkge1xyXG4gICAgICAgIC8vdmFyIGF0bGFzU3RyaW5nID0gXCJoYWxsL3RleHR1cmUvaGFsbC9wbGF5ZXJJbmZvL0F1dG9BdGxhc19wbGF5ZXJpbmZvXCI7XHJcbiAgICAgICAgdmFyIGF0bGFzU3RyaW5nID0gR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5wbGF5ZXJJbmZvQXRsYXNQYXRoO1xyXG4gICAgICAgIHZhciBzZlN0cmluZyA9IFwiaWNvbl92XCIgKyB2aXA7XHJcbiAgICAgICAgcmV0dXJuIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyhzcHJpdGUsIGF0bGFzU3RyaW5nLCBzZlN0cmluZywgbnVsbCwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L29dmlw5bCP5qCH6K+GXHJcbiAgICAgKiBAcGFyYW0gc3ByaXRlIOWbvueJh+eyvueBtVxyXG4gICAgICogQHBhcmFtIHZpcCB2aXDnrYnnuqdcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRMb2NhbFZpcEljb24oc3ByaXRlOiBjYy5TcHJpdGUsIHZpcCkge1xyXG4gICAgICAgIC8vdmFyIGF0bGFzU3RyaW5nID0gXCJoYWxsL3RleHR1cmUvaGFsbC9wbGF5ZXJJbmZvL0F1dG9BdGxhc19wbGF5ZXJpbmZvXCI7XHJcbiAgICAgICAgdmFyIGF0bGFzU3RyaW5nID0gR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5wbGF5ZXJJbmZvQXRsYXNQYXRoO1xyXG4gICAgICAgIHZhciBzZlN0cmluZyA9IFwidmlwX3RxXCIgKyB2aXA7XHJcbiAgICAgICAgcmV0dXJuIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyhzcHJpdGUsIGF0bGFzU3RyaW5nLCBzZlN0cmluZywgbnVsbCwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICog5Yqg6L29dmlw5bCP5qCH6K+GXHJcbiAgICAqIEBwYXJhbSBzcHJpdGUg5Zu+54mH57K+54G1XHJcbiAgICAqIEBwYXJhbSB2aXAgdmlw562J57qnXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGxvYWRWaXBJY29uKHNwcml0ZTogY2MuU3ByaXRlLCB2aXApIHtcclxuICAgICAgICB2YXIgYXRsYXNTdHJpbmcgPSBcImhhbGwvdGV4dHVyZS9oYWxsL3BsYXllckluZm8vQXV0b0F0bGFzX3BsYXllcmluZm9cIjtcclxuICAgICAgICAvLyB2YXIgYXRsYXNTdHJpbmcgPSBHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLnBsYXllckluZm9BdGxhc1BhdGg7XHJcbiAgICAgICAgdmFyIHNmU3RyaW5nID0gXCJ2aXBfdHFcIiArIHZpcDtcclxuICAgICAgICByZXR1cm4gR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHNwcml0ZSwgYXRsYXNTdHJpbmcsIHNmU3RyaW5nLCBudWxsLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb3muLjmiI/ph4znmoTku7vliqHmjIflvJXlm77niYdcclxuICAgICAqIEBwYXJhbSBzcHJpdGUg5Zu+54mH57K+54G1XHJcbiAgICAgKiBAcGFyYW0gc3RyaW5nIOi3r+W+hFxyXG4gICAgICogQHBhcmFtIG5hbWUg5Lu75Yqh5Zu+54mHXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkVGFza0ljb24oc3ByaXRlOiBjYy5TcHJpdGUsIHN0cmluZywgbmFtZSkge1xyXG4gICAgICAgIHZhciBhdGxhc1N0cmluZyA9IEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcucGxheWVySW5mb0F0bGFzUGF0aDtcclxuICAgICAgICB2YXIgc2ZTdHJpbmcgPSBcImF0bGFzU3RyaW5nXCIgKyBuYW1lO1xyXG4gICAgICAgIHJldHVybiBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRBdXRvQXRsYXMoc3ByaXRlLCBhdGxhc1N0cmluZywgc2ZTdHJpbmcsIG51bGwsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb12aXDlsI/moIfor4blrZDmuLjmiI/osIPnlKhcclxuICAgICAqIEBwYXJhbSBzcHJpdGUg5Zu+54mH57K+54G1XHJcbiAgICAgKiBAcGFyYW0gdmlwIHZpcOetiee6p1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZExvY2FsVmlwSWNvbkdhbWUoc3ByaXRlOiBjYy5TcHJpdGUsIHZpcCkge1xyXG4gICAgICAgIC8vdmFyIGF0bGFzU3RyaW5nID0gXCJoYWxsL3RleHR1cmUvaGFsbC9wbGF5ZXJJbmZvL0F1dG9BdGxhc19wbGF5ZXJpbmZvXCI7XHJcbiAgICAgICAgdmFyIGF0bGFzU3RyaW5nID0gR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5wbGF5ZXJJbmZvQXRsYXNQYXRoO1xyXG4gICAgICAgIHZhciBzZlN0cmluZyA9IFwiaWNvbl92XCIgKyB2aXA7XHJcbiAgICAgICAgcmV0dXJuIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyhzcHJpdGUsIGF0bGFzU3RyaW5nLCBzZlN0cmluZywgbnVsbCwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIGlzSW50ZWdlcihvYmopIHtcclxuICAgICAgICByZXR1cm4gcGFyc2VJbnQob2JqLCAxMCkgPT09IG9ialxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W546p5a626YeR6ZKx5qC85byP5paH5pysXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRNb25leUZvcm1hdChtb25leTogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIC8vIHZhciByZWFsTnVtID0gbW9uZXkgLyBHbG9iYWwuU2V0dGluZy5nbG9kUmF0aW87XHJcbiAgICAgICAgLy8gcmV0dXJuIHJlYWxOdW0udG9GaXhlZCgyKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRQb2ludFN0cihtb25leSwgdHJ1ZSwgZmFsc2UpOy8vMjAxOS03LTE1IHhpYW9DIOaNlemxvOS4reWPr+iDveWHuueOsOWwj+aVsOeCueWQjjPkvY3vvIx0b0ZpeGVkKDIp5Lya5Zub6IiN5LqU5YWl5a+86Ie05pi+56S6PuWunumZhe+8jOe7n+S4gOS9v+eUqOaIquaWreWkhOeQhlxyXG4gICAgfVxyXG5cclxuICAgIC8v5qC85byP5YyW6LSn5biBXHJcbiAgICAvLzEgcm91bmQgIDIgY2VpbCAzIGZsb29yXHJcbiAgICBwdWJsaWMgZm9ybWF0UG9pbnQocG9pbnQ6IG51bWJlciwgdHlwZSA9IDMsIGRlZmF1bHRGaXggPSAyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgcmF0ZSA9IEdsb2JhbC5TZXR0aW5nLmdsb2RSYXRpbztcclxuICAgICAgICBsZXQgZmFjdG9yID0gTWF0aC5wb3coMTAsIGRlZmF1bHRGaXgpOyAgICAgIC8vIOaUvuWkp+ezu+aVsCDlhrPlrprkuobkv53nlZnlpJrlsJHlsI/mlbDkvY3lj5bmlbRcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQocG9pbnQgKiBmYWN0b3IgLyByYXRlKSAvIGZhY3RvcjtcclxuICAgICAgICAgICAgY2FzZSAyOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGx1cyA9IHBvaW50ID4gMCA/IDEgOiAtMTsgICAgICAgICAgICAgICAvLyBkZWJ1Z+iusOW9leato+i0nywg5aSE55CG6LSf5YC85oOF5Ya1XHJcbiAgICAgICAgICAgICAgICBwb2ludCA9IE1hdGguYWJzKHBvaW50KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwbHVzICogTWF0aC5jZWlsKHBvaW50ICogZmFjdG9yIC8gcmF0ZSkgLyBmYWN0b3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAzOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGx1cyA9IHBvaW50ID4gMCA/IDEgOiAtMTsgICAgICAgICAgICAgICAvLyBkZWJ1Z+iusOW9leato+i0nywg5aSE55CG6LSf5YC85oOF5Ya1XHJcbiAgICAgICAgICAgICAgICBwb2ludCA9IE1hdGguYWJzKHBvaW50KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwbHVzICogTWF0aC5mbG9vcihwb2ludCAqIGZhY3RvciAvIHJhdGUpIC8gZmFjdG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChwb2ludCAqIGZhY3RvciAvIHJhdGUpIC8gZmFjdG9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHVtcFJlcyhmdWxsPzogYm9vbGVhbikge1xyXG4gICAgICAgIGxldCBmdWxsTWFwID0gY2MubG9hZGVyWydfY2FjaGUnXTtcclxuICAgICAgICBsZXQgZHVtcCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGsgaW4gZnVsbE1hcCkge1xyXG4gICAgICAgICAgICBsZXQgdiA9IGZ1bGxNYXBba107XHJcbiAgICAgICAgICAgIGlmICghZnVsbCAmJiAodi50eXBlID09ICdqcycgfHwgdi50eXBlID09ICd1dWlkJyB8fCB2LmlkLmluZGV4T2YoJ3Jlcy9yYXctaW50ZXJuYWwnKSA+PSAwIHx8IHYuaWQuaW5kZXhPZigncHJldmlldy1zY2VuZScpID49IDApKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkdW1wLnB1c2godik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUuaW5mbyhkdW1wKTtcclxuICAgICAgICAvLyBjb25zb2xlLmluZm8oZHVtcC5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagvOW8j+WMlui0p+W4gVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBvaW50ICDmnI3liqHlmajotKfluIHmlbDph49cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ZpeD1mYWxzZV0g5piv5ZCm5Zu65a6a5bCP5pWw5L2NXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFt3aXRoUGx1cz1mYWxzZV0g5piv5ZCm5pi+56S65Yqg5Y+3XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbkZpeD8g6K6+5a6a5bCP5pWw5L2NIGZpeD10cnVl5pyJ5pWIXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICogQG1lbWJlcm9mIFRvb2xraXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZvcm1hdFBvaW50U3RyKHBvaW50OiBudW1iZXIsIGZpeDogYm9vbGVhbiA9IGZhbHNlLCB3aXRoUGx1czogYm9vbGVhbiA9IGZhbHNlLCBuRml4PzogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoIWZpeCkge1xyXG4gICAgICAgICAgICBsZXQgcmVzU3RyID0gdGhpcy5mb3JtYXRQb2ludChwb2ludCwgMykudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgaWYgKHdpdGhQbHVzICYmIHBvaW50ID49IDApXHJcbiAgICAgICAgICAgICAgICByZXNTdHIgPSBcIitcIiArIHJlc1N0cjtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc1N0cjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZpeE51bSA9IG5GaXggfHwgR2xvYmFsLlNldHRpbmcuZml4Q291bnQ7XHJcbiAgICAgICAgbGV0IHJlc1N0ciA9IHRoaXMuZm9ybWF0UG9pbnQocG9pbnQsIDMsIG5GaXgpLnRvRml4ZWQoZml4TnVtKTtcclxuICAgICAgICBpZiAod2l0aFBsdXMgJiYgcG9pbnQgPj0gMClcclxuICAgICAgICAgICAgcmVzU3RyID0gXCIrXCIgKyByZXNTdHI7XHJcbiAgICAgICAgcmV0dXJuIHJlc1N0cjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPljE4OCoqKioxMjM0XHJcbiAgICAgKiBAcGFyYW0gc3RyIOWtl+espuS4slxyXG4gICAgICogQHBhcmFtIHByZUNvdW50IOS/neeVmeWJjeWHoOS9jVxyXG4gICAgICogQHBhcmFtIGxhc3RDb3VudCDkv53nlZnlkI7lh6DkvY1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGZvcm1hdGVTdHJXaXRoQXN0ZXJpc2soc3RyOiBzdHJpbmcgPSAnJywgcHJlQ291bnQgPSAwLCBsYXN0Q291bnQgPSAwKSB7XHJcbiAgICAgICAgaWYgKHN0ciA9PSAnJykgcmV0dXJuICcnXHJcbiAgICAgICAgbGV0IGNvdW50ID0gc3RyLmxlbmd0aDtcclxuICAgICAgICBpZiAocHJlQ291bnQgKyBsYXN0Q291bnQgPD0gY291bnQpIHtcclxuICAgICAgICAgICAgbGV0IHByZVN0ciA9IHN0ci5zdWJzdHIoMCwgcHJlQ291bnQpO1xyXG4gICAgICAgICAgICBsZXQgbGFzdFN0ciA9IHN0ci5zdWJzdHIoLWxhc3RDb3VudCwgbGFzdENvdW50KTtcclxuICAgICAgICAgICAgbGV0IGFkZFN0ciA9IFwiXCJcclxuICAgICAgICAgICAgZm9yIChsZXQgcyA9IDA7IHMgPCBjb3VudCAtIHByZUNvdW50IC0gbGFzdENvdW50OyBzKyspIHtcclxuICAgICAgICAgICAgICAgIGFkZFN0ciA9IGFkZFN0ciArIFwiKlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwcmVTdHIuY29uY2F0KGFkZFN0ciwgbGFzdFN0cik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gJyoqKioqKioqKidcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiKrlj5blrZfnrKbkuLLvvIzotoXlh7rnmoTnlKguLuS7o+abv1xyXG4gICAgICogQHBhcmFtIHN0ciDlrZfnrKbkuLJcclxuICAgICAqIEBwYXJhbSBieXRlTGVuIOS/neeVmemVv+W6pu+8jOS4reaWh+eul+S4pOS4quWtl+esplxyXG4gICAgICogQHBhcmFtIG5vdEFwcGVuZCB0cnVl5by65Yi25LiN5re75YqgLi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN1YnN0ckVuZFdpdGhFbGxpKHN0cjogc3RyaW5nID0gJycsIGJ5dGVMZW46IG51bWJlciwgbm90QXBwZW5kID0gZmFsc2UpIHtcclxuICAgICAgICBzdHIgPSBHbG9iYWwuVG9vbGtpdC5yZW1vdmVFbW9qaShzdHIpXHJcbiAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5nZXRUb3RhbEJ5dGVzKHN0ciksXHJcbiAgICAgICAgICAgIGxlbiA9IGJ5dGVMZW47XHJcbiAgICAgICAgaWYgKHN0ciA9PSAnJyB8fCBjb3VudCA8PSBieXRlTGVuKVxyXG4gICAgICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSAnJztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcyA9IHN0ci5jaGFyQXQoaSk7XHJcbiAgICAgICAgICAgIGxlbiAtPSB0aGlzLmdldEJ5dGUocyk7XHJcbiAgICAgICAgICAgIGlmIChsZW4gPCAwKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSBzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobm90QXBwZW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0ICsgXCIuLlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Qnl0ZShzdHI6IHN0cmluZyA9ICcnKSB7XHJcbiAgICAgICAgbGV0IG5CeXRlID0gMDtcclxuICAgICAgICBpZiAoc3RyLm1hdGNoKC9bXlxceDAwLVxceGZmXS9pZykgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBuQnl0ZSA9IDI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbkJ5dGUgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbkJ5dGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFRvdGFsQnl0ZXMoc3RyOiBzdHJpbmcgPSAnJykge1xyXG4gICAgICAgIGxldCBieXRlVmFsTGVuID0gMDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbkJ5dGUgPSB0aGlzLmdldEJ5dGUoc3RyW2ldKTtcclxuICAgICAgICAgICAgYnl0ZVZhbExlbiArPSBuQnl0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGJ5dGVWYWxMZW47XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mmK/lkKbkuLp7feaIluiAhVtdXHJcbiAgICAgKiBAcGFyYW0gb2JqIOWvueixoVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNFbXB0eU9iamVjdChvYmopIHtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gb2JqKVxyXG4gICAgICAgICAgICByZXR1cm4gITE7XHJcbiAgICAgICAgcmV0dXJuICEwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5ZyG5LiK5oyH5a6a6KeS5bqm55qE54K55Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gY2VudGVyUG9pbnQg5ZyG5b+D5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gcmFkaXVzIOWNiuW+hFxyXG4gICAgICogQHBhcmFtIGFuZ2xlIOinkuW6plxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q2lyY2xlUG9pbnQoY2VudGVyUG9pbnQ6IGNjLlZlYzMsIHJhZGl1czogbnVtYmVyLCBhbmdsZTogbnVtYmVyKTogY2MuVmVjMyB7XHJcbiAgICAgICAgbGV0IHggPSBjZW50ZXJQb2ludC54ICsgcmFkaXVzICogTWF0aC5jb3MoMiAqIGFuZ2xlICogTWF0aC5QSSAvIDM2MCk7XHJcbiAgICAgICAgbGV0IHkgPSBjZW50ZXJQb2ludC55ICsgcmFkaXVzICogTWF0aC5zaW4oMiAqIGFuZ2xlICogTWF0aC5QSSAvIDM2MCk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBjYy5WZWMzKHgsIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqP5py66I635Y+W5ZyG5YaF5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gY2VudGVyUG9pbnQg5ZyG5b+D5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gcmFkaXVzIOWNiuW+hFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q2lyY2xlUmFuZG9tSW5Qb2ludChjZW50ZXJQb2ludDogY2MuVmVjMywgcmFkaXVzOiBudW1iZXIpOiBjYy5WZWMzIHtcclxuICAgICAgICBsZXQgciA9IE1hdGgucmFuZG9tKCkgKiByYWRpdXM7ICAgICAvLyBbMCwgcmFkaXVzKVxyXG4gICAgICAgIGxldCBhID0gTWF0aC5yYW5kb20oKSAqIDM2MDsgICAgICAgIC8vIFswLCAzNjApXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2lyY2xlUG9pbnQoY2VudGVyUG9pbnQsIHIsIGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqP5py66I635Y+W55+p5b2i5YaF5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gY2VudGVyUG9pbnQg5Lit5b+DXHJcbiAgICAgKiBAcGFyYW0gdyDlrr1cclxuICAgICAqIEBwYXJhbSBoIOmrmFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UmVjdFJhbmRvbUluUG9pbnQoY2VudGVyUG9pbnQ6IGNjLlZlYzMsIHc6IG51bWJlciwgaDogbnVtYmVyKTogY2MuVmVjMyB7XHJcbiAgICAgICAgbGV0IHggPSAtdyAvIDIgKyBNYXRoLnJhbmRvbSgpICogdztcclxuICAgICAgICBsZXQgeSA9IC1oIC8gMiArIE1hdGgucmFuZG9tKCkgKiBoO1xyXG4gICAgICAgIHJldHVybiBjZW50ZXJQb2ludC5hZGQobmV3IGNjLlZlYzMoeCwgeSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6h566X5Lik5Liq5ZCR6YeP55qE5aS56KeSIOS7pXN0YXJ0eOato+WQkeS4uuWfuuWHhiDov5Tlm55bMCwgOTApVSg5MCwgMTgwXVUoMTgwLCAyNzApVSgtOTAsIDAp5Y+W5YC8XHJcbiAgICAgKiBAcGFyYW0gc3RhcnQgXHJcbiAgICAgKiBAcGFyYW0gZW5kIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VmVjMkFuZ2xlKHN0YXJ0OiBjYy5WZWMzLCBlbmQ6IGNjLlZlYzMpIHtcclxuICAgICAgICBsZXQgdGFuID0gKGVuZC55IC0gc3RhcnQueSkgLyAoZW5kLnggLSBzdGFydC54KTtcclxuICAgICAgICBpZiAoZW5kLnggPiBzdGFydC54KSAgICAgICAgICAgICAgICAvLyDkuIDjgIHlm5vosaHpmZDkuLplbmTnm7jlr7lzdGFydOWkueinklxyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5hdGFuKHRhbikgKiAxODAgLyBNYXRoLlBJO1xyXG4gICAgICAgIGVsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOS6jOOAgeS4ieixoemZkOS4unN0YXJ055u45a+5ZW5k5aS56KeSIOWPluihpeinklxyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5hdGFuKHRhbikgKiAxODAgLyBNYXRoLlBJICsgMTgwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6h566X5Lik5Liq5bmz6Z2i5ZCR6YeP6Led56a7XHJcbiAgICAgKiBAcGFyYW0gc3RhcnQg6LW354K5XHJcbiAgICAgKiBAcGFyYW0gZW5kIOe7iOeCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VmVjMkRpc3RhbmNlKHN0YXJ0OiBjYy5WZWMzLCBlbmQ6IGNjLlZlYzMpIHtcclxuICAgICAgICByZXR1cm4gZW5kLnN1YihzdGFydCkubWFnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsIZub2RlMeWdkOagh+ezu+S4i+eahHBvaW506L2s5o2i5Yiwbm9kZTLlnZDmoIfns7vkuIvnmoTmnKzlnLDlnZDmoIdcclxuICAgICAqIEBwYXJhbSBub2RlMSDopoHovazmjaLlnZDmoIfnmoTniLboioLngrlcclxuICAgICAqIEBwYXJhbSBub2RlMiDnm67nmoTniLboioLngrlcclxuICAgICAqIEBwYXJhbSBwb2ludCDovazmjaLlnZDmoIdcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnZlcnRTYW1lTm9kZVBvcyhub2RlMTogY2MuTm9kZSwgbm9kZTI6IGNjLk5vZGUsIHBvaW50ID0gY2MuVmVjMy5aRVJPKSB7XHJcbiAgICAgICAgbGV0IHdvcmxkUG9zID0gbm9kZTEuY29udmVydFRvV29ybGRTcGFjZUFSKHBvaW50KTtcclxuICAgICAgICByZXR1cm4gbm9kZTIuY29udmVydFRvTm9kZVNwYWNlQVIod29ybGRQb3MpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBudW0gXHJcbiAgICAgKi9cclxuICAgIEdldFRleHQobnVtOiBhbnkpIHtcclxuICAgICAgICAvLyBsZXQgdHh0O1xyXG4gICAgICAgIC8vIGlmIChudW0gPiAxMDAwMCkge1xyXG4gICAgICAgIC8vICAgICB0eHQgPSBcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIHR4dCA9IG51bVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICByZXR1cm4gKG51bSAvIDEwMDAwKS50b0ZpeGVkKDIpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBub2RlIOeUn+aIkOS6jOe7tOeggeeahOiKgueCuVxyXG4gICAgICogQHBhcmFtIHVybCDkuoznu7TnoIHnmoR1cmxcclxuICAgICAqIEBwYXJhbSBtYXJnaW4g5LqM57u056CB6L6555WM56m66ZqZ6ZW/5a69XHJcbiAgICAgKi9cclxuICAgIGluaXRRUkNvZGUobm9kZSwgdXJsLCBtYXJnaW4gPSAxMCkge1xyXG4gICAgICAgIHZhciBjdHggPSBHbG9iYWwuVUlIZWxwZXIuc2FmZUdldENvbXBvbmVudChub2RlLCBcIlwiLCBjYy5HcmFwaGljcykvL25vZGUuYWRkQ29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBpZiAoY3R4KSB7XHJcbiAgICAgICAgICAgIGN0eC5jbGVhcigpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGxldCBUaXAgPSBuZXcgUVJDb2RlVGlwKClcclxuICAgICAgICAvLyBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRSZXMoXCJoYWxsL3ByZWZhYnMvdWkvUVJDb2RlVGlwXCIsIChlcnJvciwgcHJlZmFiKT0+XHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBpZihwcmVmYWIpXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIFRpcC5zZXROb2RlKGNjLmluc3RhbnRpYXRlKHByZWZhYikpO1xyXG4gICAgICAgIC8vICAgICAgICAgVGlwLm5vZGUuc2V0UGFyZW50KG5vZGUpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSlcclxuICAgICAgICAvLyBHbG9iYWwuVUkuc2hvd0xvZGluZ1RpcChcIuWKoOi9veS4rVwiLG5vZGUpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHVybCkgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coJ3VybCBpcyBub3Qgc3RyaW5nJywgdXJsKTtcclxuICAgICAgICAgICAgLy8gR2xvYmFsLlVJLmhpZGVMb2RpbmdUaXAoXCLliqDovb3lpLHotKVcIixub2RlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlFSQ3JlYXRlKGN0eCwgdXJsLCBtYXJnaW4sIG5vZGUpO1xyXG4gICAgICAgIC8vIEdsb2JhbC5VSS5oaWRlTG9kaW5nVGlwKFwi5Yqg6L295oiQ5YqfXCIsbm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBjdHgg57uY5Yi2YXBpXHJcbiAgICAgKiBAcGFyYW0gdXJsIOS6jOe7tOeggeeahHVybFxyXG4gICAgICogQHBhcmFtIG1hcmdpbiDkuoznu7TnoIHovrnnlYznqbrpmpnplb/lrr1cclxuICAgICAqIEBwYXJhbSBub2RlIOeUn+aIkOS6jOe7tOeggeeahOiKgueCuVxyXG4gICAgICovXHJcbiAgICBRUkNyZWF0ZShjdHgsIHVybCwgbWFyZ2luLCBub2RlKSB7XHJcblxyXG4gICAgICAgIGN0eC5jbGVhcigpO1xyXG5cclxuICAgICAgICAvL+iDjOaZr+iJslxyXG4gICAgICAgIGN0eC5maWxsQ29sb3IgPSBjYy5Db2xvci5XSElURTtcclxuICAgICAgICBsZXQgd2lkdGggPSBub2RlLndpZHRoO1xyXG4gICAgICAgIGN0eC5yZWN0KDAgLSB3aWR0aCAqIDAuNSwgMCAtIHdpZHRoICogMC41LCB3aWR0aCwgd2lkdGgpO1xyXG4gICAgICAgIGN0eC5maWxsKCk7XHJcbiAgICAgICAgY3R4LmNsb3NlKCk7XHJcblxyXG4gICAgICAgIC8v55Sf5oiQ5LqM57u056CB5pWw5o2uXHJcbiAgICAgICAgbGV0IHFyY29kZSA9IG5ldyBRUkNvZGUoLTEsIFFSRXJyb3JDb3JyZWN0TGV2ZWwuSCk7XHJcbiAgICAgICAgcXJjb2RlLmFkZERhdGEodXJsKTtcclxuICAgICAgICBxcmNvZGUubWFrZSgpO1xyXG4gICAgICAgIGN0eC5maWxsQ29sb3IgPSBjYy5Db2xvci5CTEFDSztcclxuICAgICAgICBsZXQgc2l6ZSA9IHdpZHRoIC0gbWFyZ2luICogMjtcclxuICAgICAgICBsZXQgbnVtID0gcXJjb2RlLmdldE1vZHVsZUNvdW50KCk7XHJcblxyXG4gICAgICAgIGxldCB0aWxlVyA9IHNpemUgLyBudW07XHJcbiAgICAgICAgbGV0IHRpbGVIID0gc2l6ZSAvIG51bTtcclxuICAgICAgICBsZXQgdyA9IE1hdGguY2VpbCh0aWxlVyk7XHJcbiAgICAgICAgbGV0IGggPSBNYXRoLmNlaWwodGlsZUgpO1xyXG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IG51bTsgcm93KyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgbnVtOyBjb2wrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHFyY29kZS5pc0Rhcmsocm93LCBjb2wpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LnJlY3QobWFyZ2luICsgY29sICogdGlsZVcgLSB3aWR0aCAqIDAuNSwgc2l6ZSAtIHRpbGVIIC0gTWF0aC5yb3VuZChyb3cgKiB0aWxlSCkgKyBtYXJnaW4gLSB3aWR0aCAqIDAuNSwgdywgaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirmo4DmtYvlr4bnoIHlrZfnrKbkuLLmmK/lkKblkIjms5UgKi9cclxuICAgIGNoZWNrUFdGb3JtYXQodGV4dDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRleHQubGVuZ3RoIDwgNiB8fCB0ZXh0Lmxlbmd0aCA+IDE2KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjID0gdGV4dC5jaGFyQXQoaSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wd0NoZWNrU3RyaW5nLmluZGV4T2YoYykgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mr5Tlr7nniYjmnKxcclxuICAgIHZlcnNpb25Db21wYXJlKHZlcnNpb25BOiBzdHJpbmcsIHZlcnNpb25COiBzdHJpbmcpIHtcclxuICAgICAgICAvLyBMb2dnZXIubG9nKFwiSlMgQ3VzdG9tIFZlcnNpb24gQ29tcGFyZTogdmVyc2lvbiBBIGlzIFwiICsgdmVyc2lvbkEgKyAnLCB2ZXJzaW9uIEIgaXMgJyArIHZlcnNpb25CKTtcclxuICAgICAgICAvLyB2YXIgdkEgPSB2ZXJzaW9uQS5zcGxpdCgnLicpO1xyXG4gICAgICAgIC8vIHZhciB2QiA9IHZlcnNpb25CLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCB2QS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIC8vICAgICB2YXIgYSA9IHBhcnNlSW50KHZBW2ldKTtcclxuICAgICAgICAvLyAgICAgdmFyIGIgPSBwYXJzZUludCh2QltpXSB8fCBcIjBcIik7XHJcbiAgICAgICAgLy8gICAgIGlmIChhID09PSBiKSB7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgLy8gICAgIGVsc2UgeyByZXR1cm4gYSAtIGI7IH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gaWYgKHZCLmxlbmd0aCA+IHZBLmxlbmd0aCkgeyByZXR1cm4gLTE7IH1cclxuICAgICAgICAvLyBlbHNlIHsgcmV0dXJuIDA7IH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkpTIOiHquWumuS5ieeJiOacrOavlOi+gzogdmVyc2lvbiBBIDogXCIgKyB2ZXJzaW9uQSArICcsIHZlcnNpb24gQiA6ICcgKyB2ZXJzaW9uQik7XHJcbiAgICAgICAgcmV0dXJuIHZlcnNpb25BID09PSB2ZXJzaW9uQiA/IDAgOiAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3seaLt+i0neWvueixoVxyXG4gICAgICogQHBhcmFtIG9iaiBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvcHlPYmoob2JqOiBhbnkpIHtcclxuICAgICAgICBpZiAob2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHt9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6K+35rGCYXBwSW5mbyAgIOaaguS4jeWNoeS4u+a1geeoi++8jOWmguaenOaXtuW6j+WHuumXrumimOiAg+iZkeetieivt+axguWujOaIkOWQjuWGjVxyXG4gICAgcHJpdmF0ZSBnZXREb3dubG9hZEFwcEluZm8oKSB7XHJcbiAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAoR2xvYmFsLlNldHRpbmcuQ2hhbm5lbEluZm8uc2VydmVyQXBwSW5mb0NvbnRlbnQgIT0gbnVsbCAmJiBHbG9iYWwuU2V0dGluZy5DaGFubmVsSW5mby5zZXJ2ZXJBcHBJbmZvQ29udGVudCAhPSBcIlwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IHBhcmFtOiBhbnkgPSB7fVxyXG4gICAgICAgIHBhcmFtLnR5cGUgPSAyO1xyXG4gICAgICAgIHBhcmFtLmFwcCA9IEdsb2JhbC5TZXR0aW5nLmFwcElkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgcGFyYW0ub3MgPSBHbG9iYWwuVG9vbGtpdC5nZXRPc1R5cGVTdHIoKTtcclxuICAgICAgICBwYXJhbS5zdyA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8ubmF0aXZlU2NyZWVuSGVpZ2h0LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgcGFyYW0uc2ggPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLm5hdGl2ZVNjcmVlbldpZHRoLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgcGFyYW0uc3AgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLm5hdGl2ZVNjcmVlbkRlbnNpdHkudG9TdHJpbmcoKTtcclxuICAgICAgICBwYXJhbS5saSA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uaG9zdElwO1xyXG4gICAgICAgIHBhcmFtLm9zQnVpbGRNb2RlbCA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8ub3NCdWlsZE1vZGVsO1xyXG4gICAgICAgIHBhcmFtLm9zQnVpbGRWZXJzaW9uU0RLID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5vc0J1aWxkVmVyc2lvblNESztcclxuICAgICAgICBwYXJhbS5vc0J1aWxkVmVyc2lvblJlbGVhc2UgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLm9zQnVpbGRWZXJzaW9uUmVsZWFzZTtcclxuICAgICAgICBwYXJhbS5kZXZpY2UgPSB0aGlzLmdlbkRldmljZUluZm8oKTtcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kQ2xpZW50TG9nKE5ldENsaWVudExvZy5Eb3dubG9hZEFwcEluZm8sIHBhcmFtLCAobXNnKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0bXA6IGFueSA9IHt9XHJcbiAgICAgICAgICAgICAgICB0bXAuY2ggPSBtc2cucGFjaztcclxuICAgICAgICAgICAgICAgIHRtcC5pYyA9IG1zZy5pbnZpdGVfY29kZTtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLkNoYW5uZWxJbmZvLnNlcnZlckFwcEluZm9Db250ZW50ID0gdG1wO1xyXG4gICAgICAgICAgICAgICAgaWYgKCh0bXAuY2ggJiYgdG1wLmNoICE9IDApIHx8ICh0bXAuaWMgJiYgdG1wLmljICE9IDApKVxyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLkNoYW5uZWxJbmZvLnNvdXJjZVR5cGUgPSA0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgKCkgPT4geyByZXR1cm4gZmFsc2UgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4Dmn6XniYjmnKzlj7fmmK/lkKbmlK/mjIFcclxuICAgICAqIEBwYXJhbSBzdXBwb3J0VmVyc2lvbiDpu5jorqTniYjmnKzlj7fvvIzlvZPmnIlpb3NWZXJzaW9u5pe277yM5Li65a6J5Y2T54mI5pys5Y+3XHJcbiAgICAgKiBAcGFyYW0gaW9zVmVyc2lvbiBpb3PmlK/mjIHniYjmnKzlj7fvvIzpu5jorqTkuLowXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGVja1ZlcnNpb25TdXBwb3J0KHN1cHBvcnRWZXJzaW9uLCBpb3NWZXJzaW9uID0gMCkge1xyXG4gICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIGxldCB2ZXJzaW9uID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5hcHBWZXJzaW9uXHJcbiAgICAgICAgbGV0IG51bVZlciA9IE51bWJlcih2ZXJzaW9uKVxyXG5cclxuICAgICAgICAvL2lvc1ZlcnNpb27kuI3kuLow5pe2ICBpb3PniYjmnKzlj7fku6Vpb3NWZXJzaW9u5Li65YeGXHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuSVBIT05FICYmIGlvc1ZlcnNpb24gJiYgaW9zVmVyc2lvbiA+IDApIHtcclxuICAgICAgICAgICAgc3VwcG9ydFZlcnNpb24gPSBpb3NWZXJzaW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzTmFOKG51bVZlcikgfHwgbnVtVmVyID49IHN1cHBvcnRWZXJzaW9uKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ri45oiP6YCA5Ye65ZCO5Zyo5aSn5Y6F5by55o+Q56S65qGGXHJcbiAgICAgKiBAcGFyYW0gY29udGVudCDmlofmnKxcclxuICAgICAqIEBwYXJhbSB5RnVuYyDnoa7lrprlm57osINcclxuICAgICAqIEBwYXJhbSBuRnVuYyDlj5bmtojmiJbogIXlhbPpl63lm57osINcclxuICAgICAqIEBwYXJhbSB0eXBlIDEg5pi+56S656Gu5a6a5o+Q56S65qGGICAyIOaYvuekuuehruWumuWPlua2iOaPkOekuuahhlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdHJhbnNtaXRIYWxsTXNnKGNvbnRlbnQ6IHN0cmluZywgeUZ1bmM/OiBGdW5jdGlvbiwgbkZ1bmM/OiBGdW5jdGlvbiwgdHlwZTogbnVtYmVyID0gMSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKGNvbnRlbnQpICE9IFwic3RyaW5nXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgaW5mbzogYW55ID0ge31cclxuICAgICAgICBpbmZvLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgICAgIGluZm8ueUZ1bmMgPSB5RnVuYztcclxuICAgICAgICBpbmZvLm5GdW5jID0gbkZ1bmM7XHJcbiAgICAgICAgaW5mby50eXBlID0gdHlwZTtcclxuICAgICAgICBHYW1lLkRhdGFCcmlkZ2UubXNnID0gaW5mbztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4uOaIj3RpcHPlpKfljoXmmL7npLpcclxuICAgICAqIEBwYXJhbSB0aXBzIHRpcHPlhoXlrrlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRyYW5zbWl0SGFsbFRpcCh0aXBzKSB7XHJcbiAgICAgICAgR2FtZS5EYXRhQnJpZGdlLmZhc3RUaXBNc2cgPSB0aXBzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKumAgOWHuua4uOaIj+WQjuWkp+WOheaYvuekuldpbmRvdyAqL1xyXG4gICAgcHVibGljIHRyYW5zbWl0SGFsbFdpbmRvdyh3aW5kb3csIGFyZ3M/KSB7XHJcbiAgICAgICAgaWYgKHdpbmRvdyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaW5mbzogYW55ID0ge31cclxuICAgICAgICBpbmZvLndpbmRvdyA9IHdpbmRvd1xyXG4gICAgICAgIGluZm8uYXJncyA9IGFyZ3NcclxuICAgICAgICBHYW1lLkRhdGFCcmlkZ2UuY2FjaGVTaG93ID0gaW5mbztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVwb3J0TG9nKGtleTogc3RyaW5nLCBwYXJhbTogYW55KSB7XHJcbiAgICAgICAgbGV0IGRhdGE6IGFueSA9IHt9O1xyXG4gICAgICAgIGRhdGEudHlwZSA9IFwiZGVidWdcIjtcclxuICAgICAgICBkYXRhLmtleSA9IGtleTtcclxuICAgICAgICBsZXQgdWlkID0gTnVtYmVyKEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2UuZ2V0KEhhbGxTdG9yYWdlS2V5LlVpZCkpIHx8IDA7XHJcbiAgICAgICAgZGF0YS5hcHBpZCA9IEdsb2JhbC5TZXR0aW5nLmFwcElkO1xyXG4gICAgICAgIGRhdGEudWlkID0gdWlkO1xyXG4gICAgICAgIGRhdGEucGhvbmVfY29kZSA9IHRoaXMuZ2V0T3NUeXBlU3RyKCk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZGF0YS5kYXRhID0gSlNPTi5zdHJpbmdpZnkocGFyYW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJlbmNvZGUgZXJyb3JcIiwga2V5KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkYXRhLmRldmljZSA9IHRoaXMuZ2VuRGV2aWNlSW5mbygpO1xyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmRDbGllbnRMb2coTmV0Q2xpZW50TG9nLkNsaWVudExvZ1JlcSwgZGF0YSwgbnVsbCwgKCkgPT4geyByZXR1cm4gZmFsc2UgfSwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwYXJzZVRpbWUodGltZSwgY0Zvcm1hdCA9IFwiXCIpIHtcclxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZm9ybWF0ID0gY0Zvcm1hdCB8fCAne3l9LXttfS17ZH0ge2h9OntpfTp7c30nO1xyXG4gICAgICAgIGxldCBkYXRlO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGltZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgZGF0ZSA9IHRpbWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCh0eXBlb2YgdGltZSA9PT0gJ3N0cmluZycpICYmICgvXlswLTldKyQvLnRlc3QodGltZSkpKSB7XHJcbiAgICAgICAgICAgICAgICB0aW1lID0gcGFyc2VJbnQodGltZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCh0eXBlb2YgdGltZSA9PT0gJ251bWJlcicpICYmICh0aW1lLnRvU3RyaW5nKCkubGVuZ3RoID09PSAxMCkpIHtcclxuICAgICAgICAgICAgICAgIHRpbWUgPSB0aW1lICogMTAwMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXRlID0gbmV3IERhdGUodGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGZvcm1hdE9iaiA9IHtcclxuICAgICAgICAgICAgeTogZGF0ZS5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgICAgICBtOiBkYXRlLmdldE1vbnRoKCkgKyAxLFxyXG4gICAgICAgICAgICBkOiBkYXRlLmdldERhdGUoKSxcclxuICAgICAgICAgICAgaDogZGF0ZS5nZXRIb3VycygpLFxyXG4gICAgICAgICAgICBpOiBkYXRlLmdldE1pbnV0ZXMoKSxcclxuICAgICAgICAgICAgczogZGF0ZS5nZXRTZWNvbmRzKCksXHJcbiAgICAgICAgICAgIGE6IGRhdGUuZ2V0RGF5KClcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdGltZV9zdHIgPSBmb3JtYXQucmVwbGFjZSgveyh5fG18ZHxofGl8c3xhKSt9L2csIChyZXN1bHQsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBmb3JtYXRPYmpba2V5XTtcclxuICAgICAgICAgICAgLy8gTm90ZTogZ2V0RGF5KCkgcmV0dXJucyAwIG9uIFN1bmRheVxyXG4gICAgICAgICAgICBpZiAoa2V5ID09PSAnYScpIHsgcmV0dXJuIFsn5pelJywgJ+S4gCcsICfkuownLCAn5LiJJywgJ+WbmycsICfkupQnLCAn5YWtJ11bdmFsdWVdIH07XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMCAmJiB2YWx1ZSA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICcwJyArIHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSB8fCAwO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHRpbWVfc3RyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gdXJsIOWbvueJh+WcsOWdgFxyXG4gICAgICogQHBhcmFtIGlkIOWUr+S4gOagh+ivhlxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIOWKoOi9veWujOaIkOeahOWbnuiwg1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgTG9hZFBpY1RvTmF0aXZlKHVybCwgaWQsIGNhbGxiYWNrPykge1xyXG4gICAgICAgIGxldCBuYW1lID0gR2xvYmFsLlRvb2xraXQubWQ1KGlkKVxyXG4gICAgICAgIGxldCBmaWxlUGF0aCA9IGpzYi5maWxlVXRpbHMuZ2V0V3JpdGFibGVQYXRoKCkgKyBuYW1lICsgJy5qcGcnO1xyXG4gICAgICAgIGlmICghanNiLmZpbGVVdGlscy5pc0ZpbGVFeGlzdChmaWxlUGF0aCkpIHtcclxuICAgICAgICAgICAgbGV0IHhociA9IGNjLmxvYWRlci5nZXRYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVGaWxlVG9OYXRpdmUoZmlsZVBhdGgsIHhoci5yZXNwb25zZSwgY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZUZpbGVUb05hdGl2ZShudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XHJcbiAgICAgICAgICAgIHhoci5vcGVuKFwiR0VUXCIsIHVybCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRFbmQoZmlsZVBhdGgsIGNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNhdmVGaWxlVG9OYXRpdmUoZmlsZXBhdGgsIGRhdGEsIGNhbGxiYWNrPykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgLy8gaWYoICFqc2IuZmlsZVV0aWxzLmlzRGlyZWN0b3J5RXhpc3QoZmlsZXBhdGgpICl7XHJcbiAgICAgICAgICAgIC8vICAgICBqc2IuZmlsZVV0aWxzLmNyZWF0ZURpcmVjdG9yeShmaWxlcGF0aCk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgaWYgKGpzYi5maWxlVXRpbHMud3JpdGVEYXRhVG9GaWxlKG5ldyBVaW50OEFycmF5KGRhdGEpLCBmaWxlcGF0aCkpIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coJ1JlbW90ZSB3cml0ZSBmaWxlIHN1Y2NlZWQuJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRFbmQoZmlsZXBhdGgsIGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coJ1JlbW90ZSB3cml0ZSBmaWxlIGZhaWxlZC4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coJ1JlbW90ZSBkb3dubG9hZCBmaWxlIGZhaWxlZC4nKTtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkRW5kKGZpbGVwYXRoLCBjYWxsYmFjaykge1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkKGZpbGVwYXRoLCBmdW5jdGlvbiAoZXJyLCB0ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KGZpbGVwYXRoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGpzYi5maWxlVXRpbHMucmVtb3ZlRmlsZShmaWxlcGF0aClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coZXJyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRleHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc2hvd01vbmV5Tm90RW5vdWdoKHN0ciA9IFwi6YeR5biB5LiN5aSf5ZWm77yM6K+35YmN5b6A5YWF5YC877yBXCIpIHtcclxuICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChzdHIsICgpID0+IHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRSZWNoYXJnZVwiKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOajgOa1i+aYr+WQpuS4uuacieaViOeahOaVsOWtl1xyXG4gICAgICogKioqL1xyXG4gICAgcHVibGljIGNoZWNrTnVtVmFsaWQodmFsdWUpIHtcclxuICAgICAgICBsZXQgbnVtID0gTnVtYmVyKHZhbHVlKVxyXG4gICAgICAgIGlmIChudW0pIHtcclxuICAgICAgICAgICAgbGV0IGlzQmlnTnVtID0gQmlnTnVtYmVyKG51bSkuZ3QoTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpXHJcbiAgICAgICAgICAgIGlmIChpc0JpZ051bSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja01vbmV5KGxldmVsID0gXCJsMFwiLCBnYW1lRGF0YSkge1xyXG4gICAgICAgIGlmICghZ2FtZURhdGEpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5ri45oiP5pWw5o2u5Li656m6XCIpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZ2FtZURhdGEubGV2ZWxzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBnYW1lRGF0YS5sZXZlbHMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGV2ZWxTdHIgPSBnYW1lRGF0YS5sZXZlbHNbaW5kZXhdLmxldmVsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxldmVsU3RyICYmIGxldmVsU3RyID09IGxldmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvaW50TG93ID0gZ2FtZURhdGEubGV2ZWxzW2luZGV4XS5Qb2ludExvdztcclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9pbnRMb3cgJiYgR2xvYmFsLlBsYXllckRhdGEucG9pbnQgPCBwb2ludExvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGltaXQgPSBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihwb2ludExvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHIgPSBcIua4uOaIj+WHhuWFpVwiICsgbGltaXQgKyBcIumHkeW4ge+8jOivt+aCqOWFheWAvOWTpu+8gVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5Ub29sa2l0LnNob3dNb25leU5vdEVub3VnaChzdHIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDot5/ov5vphY3nva7liKTmlq3mmK/lkKbpmZDliLblhYXlgLxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoZWNrUmVjaGFyZ2VMaW1pdGVkKCkge1xyXG4gICAgICAgIGlmIChHbG9iYWwuU2V0dGluZy5yZWNoYXJnZUxpbWl0ZWQpIHtcclxuICAgICAgICAgICAgaWYgKEdsb2JhbC5QbGF5ZXJEYXRhLnBob25lID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi6K+l5Yqf6IO96ZyA6KaB57uR5a6a5omL5py65Y+35ZCO5omN6IO95L2/55So77yM5piv5ZCm56uL5Y2z57uR5a6a5omL5py677yfXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZEJpbmRQaG9uZVwiKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHJlYXNvbiDplJnor6/noIFcclxuICAgICAqL1xyXG5cclxuICAgIHB1YmxpYyBjaGVja01vbmV5RXJyb3IoZXJybm8pIHtcclxuICAgICAgICBpZiAoZXJybm8gPT0gMTAyKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi6YeR5biB5LiN5aSf5ZWm77yM5piv5ZCm5YmN5b6A5YWF5YC877yfXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kUmVjaGFyZ2VcIik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyog6K6+572u6IqC54K555qE54i26IqC54K577yM5L+d5oyB5L2N572u5LiN5Y+YXHJcbiAgICAqIEBwYXJhbSBjaGlsZCDopoHmk43kvZzoioLngrlcclxuICAgICogQHBhcmFtIHBhcmVudCDopoHorr7nva7liLDnmoTniLboioLngrlcclxuICAgICogQHBhcmFtIGlzRml4ZWQg5piv5ZCm5L+d5oyB5L2N572u5LiN5Y+YXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHNldE5vZGVQYXJlbnQoY2hpbGQ6IGNjLk5vZGUsIHBhcmVudDogY2MuTm9kZSwgaXNGaXhlZDogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICBpZiAoY2hpbGQgJiYgcGFyZW50ICYmIGNjLmlzVmFsaWQoY2hpbGQpICYmIGNjLmlzVmFsaWQocGFyZW50KSkge1xyXG4gICAgICAgICAgICBpZiAoaXNGaXhlZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMuY29udmVydFNhbWVOb2RlUG9zKGNoaWxkLnBhcmVudCwgcGFyZW50LCBjaGlsZC5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5zZXRQYXJlbnQocGFyZW50KTtcclxuICAgICAgICAgICAgICAgIGNoaWxkLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5zZXRQYXJlbnQocGFyZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKCfniLblrZDoioLngrnpnZ7ms5UnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyog6LaF6L+H5LiH5YWD5pi+56S6IOWkmuWwkeS4h1xyXG4gICAgKiBAcGFyYW0gdmFsdWUg6YeR6aKdXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGZvcm1hdE1pbGxpb24odmFsdWU6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHZhbHVlID4gOTk5OSlcclxuICAgICAgICAgICAgcmV0dXJuIChNYXRoLmZsb29yKHZhbHVlIC8gMTAwMCkgLyAxMCkgKyBcIuS4h1wiOyAgLy/kv53nlZnkuIDkvY3lsI/mlbBcclxuICAgICAgICBlbHNlIGlmICh2YWx1ZSA8PSA5OTk5ICYmIHZhbHVlID49IC05OTk5KVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgKyBcIlwiO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIC0oTWF0aC5mbG9vcihNYXRoLmFicyh2YWx1ZSkgLyAxMDAwKSAvIDEwKSArIFwi5LiHXCI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBDaGVja0dhbWVWZXJzaW9uKHZlcnNpb24pIHtcclxuICAgICAgICBpZiAodmVyc2lvbiA9PSBudWxsIHx8IHZlcnNpb24gPT0gdW5kZWZpbmVkKS8v5pyN5Yqh5Zmo5LiN5Y+R6KGo56S654mI5pys5q2j5bi4XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZ2FtZUluZm8gPSBHbG9iYWwuR2FtZURhdGEuZ2V0R2FtZUluZm8oR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuQ3VycmVudEdhbWUpXHJcbiAgICAgICAgaWYgKHZlcnNpb24gPT0gZ2FtZUluZm8ubmF0aXZlX3ZlcnNpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy52ZXJzaW9uQ29tcGFyZSh2ZXJzaW9uLCBnYW1lSW5mby5uYXRpdmVfdmVyc2lvbikgPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENoZWNrRmlsZUV4aXN0KGZpbGVOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoQ0NfSlNCKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KGZpbGVOYW1lKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Rmlyc3RMb2dpblRpbWUoKSB7XHJcbiAgICAgICAgbGV0IHRpbWUgPSBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLmdldChIYWxsU3RvcmFnZUtleS5CYWlkdUludGVydmVsVGltZXMpO1xyXG4gICAgICAgIGlmICh0aW1lID09IG51bGwgfHwgdGltZSA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxyXG4gICAgICAgICAgICBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLnNldChIYWxsU3RvcmFnZUtleS5CYWlkdUludGVydmVsVGltZXMsIHRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGltZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+ajgOa1i+aYr+WQpuWPr+S7peS9v+eUqOW+ruS/oVxyXG4gICAgcHVibGljIGNoZWNrSXNQbGF0Zm9ybVNob3dXWCgpIHtcclxuICAgICAgICBsZXQgaXNTaG93ID0gdHJ1ZVxyXG4gICAgICAgIGxldCBwbGF0Zm9ybSA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8ubmF0aXZlUGxhdGZvcm1cclxuICAgICAgICBzd2l0Y2ggKHBsYXRmb3JtKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtYWppYWJhb1wiOlxyXG4gICAgICAgICAgICBjYXNlIFwiYXBwc3RvcmVcIjpcclxuICAgICAgICAgICAgY2FzZSBcInRlc3RmbGlnaHRcIjpcclxuICAgICAgICAgICAgY2FzZSBcImFwcHN0b3JlX3Nka3R5cGVcIjpcclxuICAgICAgICAgICAgICAgIGlzU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc1Nob3c7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mo4DmtYvmmK/lkKblj6/ku6Xkvb/nlKjmlK/ku5jlrp1cclxuICAgIHB1YmxpYyBjaGVja0lzUGxhdGZvcm1TaG93WmhpZnViYW8oKSB7XHJcbiAgICAgICAgbGV0IGlzU2hvdyA9IHRydWVcclxuICAgICAgICBsZXQgcGxhdGZvcm0gPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLm5hdGl2ZVBsYXRmb3JtXHJcbiAgICAgICAgc3dpdGNoIChwbGF0Zm9ybSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiYXBwc3RvcmVcIjpcclxuICAgICAgICAgICAgY2FzZSBcImFwcHN0b3JlX3Nka3R5cGVcIjpcclxuICAgICAgICAgICAgICAgIGlzU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc1Nob3c7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNlY3Rpb25Ub0NoaW5lc2Uoc2VjdGlvbikge1xyXG4gICAgICAgIHZhciBjaG5OdW1DaGFyID0gW1wi6Zu2XCIsIFwiXCIsIFwi5LqMXCIsIFwi5LiJXCIsIFwi5ZubXCIsIFwi5LqUXCIsIFwi5YWtXCIsIFwi5LiDXCIsIFwi5YWrXCIsIFwi5LmdXCJdO1xyXG4gICAgICAgIHZhciBjaG5Vbml0Q2hhciA9IFtcIlwiLCBcIuWNgVwiLCBcIueZvlwiLCBcIuWNg1wiLCBcIuS4h1wiLCBcIuS6v1wiLCBcIuS4h+S6v1wiLCBcIuS6v+S6v1wiXTtcclxuICAgICAgICB2YXIgc3RySW5zID0gJycsIGNoblN0ciA9ICcnO1xyXG4gICAgICAgIHZhciB1bml0UG9zID0gMDtcclxuICAgICAgICB2YXIgemVybyA9IHRydWU7XHJcbiAgICAgICAgd2hpbGUgKHNlY3Rpb24gPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciB2ID0gc2VjdGlvbiAlIDEwO1xyXG4gICAgICAgICAgICBpZiAodiA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF6ZXJvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgemVybyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2huU3RyID0gY2huTnVtQ2hhclt2XSArIGNoblN0cjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHplcm8gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHN0cklucyA9IGNobk51bUNoYXJbdl07XHJcbiAgICAgICAgICAgICAgICBzdHJJbnMgKz0gY2huVW5pdENoYXJbdW5pdFBvc107XHJcbiAgICAgICAgICAgICAgICBjaG5TdHIgPSBzdHJJbnMgKyBjaG5TdHI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdW5pdFBvcysrO1xyXG4gICAgICAgICAgICBzZWN0aW9uID0gTWF0aC5mbG9vcihzZWN0aW9uIC8gMTApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2huU3RyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBEZWFsV2l0aFVybCh1cmw6IHN0cmluZykge1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mICh1cmwpICE9IFwic3RyaW5nXCIgfHwgIXVybCkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLpk77mjqXmoLzlvI/kuI3lr7lcIilcclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVuY29kZVVSSSh1cmwucmVwbGFjZShcIlxcdFwiLCBcIlwiKS50cmltKCkpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8v5pu/5o2i5o6n5Yi25a2X56ymXHJcbiAgICBwdWJsaWMgc3RyUmVwbGFjZUN0ckNoYXIoc3RyKSB7XHJcbiAgICAgICAgaWYgKHN0cikge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1tcXHgwMC1cXHgxZl0rL2csICcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0clxyXG4gICAgfVxyXG4gICAgLy/pgJrov4fmjpLluo/mr5TovoMy5Liq5pWw57uE5piv5ZCm5YyF5ZCr55u45ZCM55qE5YWD57SgXHJcbiAgICBwdWJsaWMgY29tcGFyZUFycmF5U29ydChhMSwgYTIpIHtcclxuICAgICAgICBpZiAoKCFhMSAmJiBhMikgfHwgKGExICYmICFhMikpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoYTEubGVuZ3RoICE9PSBhMi5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBsZXQgYTExID0gW10uY29uY2F0KGExKTtcclxuICAgICAgICBsZXQgYTIyID0gW10uY29uY2F0KGEyKTtcclxuICAgICAgICBhMTEgPSBhMTEuc29ydCgpO1xyXG4gICAgICAgIGEyMiA9IGEyMi5zb3J0KCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBhMTEubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChhMTFbaV0gIT09IGEyMltpXSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog5aaC5p6c5piv6Im+54m55aSW6ZO+57uE6KOF5Y+C5pWwXHJcbiAgICAqIEBwYXJhbSB1cmwg5Y6f5pyJ6ZO+5o6lXHJcbiAgICAqIEByZXR1cm5zIFxyXG4gICAgKi9cclxuICAgIEFzc2VtYnlVcmwodXJsKSB7XHJcbiAgICAgICAgbGV0IHVzZXJpZCA9IEdsb2JhbC5QbGF5ZXJEYXRhLnVpZDtcclxuICAgICAgICBsZXQgYXBwaWQgPSBHbG9iYWwuY3VzdG9tQXBwLmdldEFwcElEKClcclxuICAgICAgICBsZXQgdmlwID0gR2xvYmFsLlBsYXllckRhdGEudmlwXHJcbiAgICAgICAgbGV0IGFwcE5hbWUgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmFwcE5hbWVcclxuICAgICAgICBsZXQgdXNlck5hbWUgPSBHbG9iYWwuUGxheWVyRGF0YS5uaWNrbmFtZVxyXG4gICAgICAgIGxldCBpcCA9IEdsb2JhbC5QbGF5ZXJEYXRhLmlwXHJcbiAgICAgICAgbGV0IG9zdHlwZSA9IEdsb2JhbC5Ub29sa2l0LmdldE9zVHlwZSgpXHJcbiAgICAgICAgbGV0IHBvaW50ID0gR2xvYmFsLlBsYXllckRhdGEucG9pbnRcclxuICAgICAgICBsZXQgY2hlY2tTdHIgPSBjYy5qcy5mb3JtYXRTdHIoXCIlcy0lcy1bJXNdLSVzLSVzLWdhbWU2ODhAYWl0ZVwiLCBhcHBpZCwgMSwgdXNlcmlkLCB2aXAsIHVzZXJOYW1lKVxyXG5cclxuICAgICAgICBsZXQgYXBwS2V5ID0gR2xvYmFsLkFFU1V0aWwubWQ1KGNoZWNrU3RyKVxyXG5cclxuICAgICAgICB1cmwgPSBgJHt1cmx9JnVzZXJpZD0ke3VzZXJpZH0mYXBwaWQ9JHthcHBpZH0mdXNlcm5hbWU9JHt1c2VyTmFtZX0mYXBwbmFtZT0ke2FwcE5hbWV9JmFwcGtleT0ke2FwcEtleX0mdmlwPSR7dmlwfSZpcD0ke2lwfSZvc3R5cGU9JHtvc3R5cGV9JnBvaW50PSR7cG9pbnR9YFxyXG5cclxuICAgICAgICByZXR1cm4gdXJsXHJcbiAgICB9XHJcblxyXG59Il19