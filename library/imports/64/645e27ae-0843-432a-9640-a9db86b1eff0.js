"use strict";
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