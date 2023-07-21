import * as Crypto from "../../../framework/libs/cryptoTs/crypto-ts"
import { MD5 } from "../../../framework/libs/cryptoTs/algo/MD5";
import { Hasher } from "../../../framework/libs/cryptoTs/lib/Hasher";
import { QRErrorCorrectLevel, QRCode } from "../../../framework/libs/qrcode"
import { NetLogin, NetClientLog } from "../net/hall/NetEvent";
import HallStorageKey from "../../hallcommon/const/HallStorageKey";
import { DUNTYPE } from "../../../framework/net/dun/AppDunControl";
import { ServerUrl } from "../setting/ServerRoutes";
import { ReportTool } from "../../../logic/core/tool/ReportTool";
import Setting from "../setting/Setting";
import { SceneType } from "../scene/SceneManager";
import PreLoadProxy from "../loadingMVC/PreLoadProxy";
import SkinConfig from "../../hallcommon/app/SkinConfig";
// import QRCodeTip from "../../hall/ui/waiting/QRCodeTip";
export default class Toolkit {
    public cryptoKey: string = "yaoxing8901234561234567890123488";
    public cryptoIv: string = "yaoxing890123488";

    public routeCrypKey: string = "kjhlouyuf20987677869887978987277";
    public routeCrypIv: string = "kjhlouyuf2098767";

    /** 密码检测字符串*/
    private _pwCheckString: string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    private MD5Hasher;

    private uuid: number = 0;


    private static _underscore = null;

    static get underscore() {
        if (!Toolkit._underscore) {
            Toolkit._underscore = require('underscore')
        }
        return Toolkit._underscore
    }
    public removeDir(gid, err) {
        if (!gid) {
            Logger.error("传入的Gid为空")
            return
        }
        Global.UI.fastTip("进入子游戏失败")
        let curGameUpdatePath = Global.HotUpdateManager.getNativeHotUpdatePath(gid.toString())
        Global.SceneManager.removeGameSearchPath(gid.toString())
        Global.SceneManager.releaseCurGameBundle()
        cc.sys.garbageCollect()
        if (jsb.fileUtils.isDirectoryExist(curGameUpdatePath)) {
            jsb.fileUtils.removeDirectory(curGameUpdatePath)
        }
        Global.SceneManager.sceneType = SceneType.Hall
        Global.Event.event(GlobalEvent.UPDATE_SUB_GAME_FAILED, gid)
        let reportParam = { "result": err, "gid": gid.toString() }
        Global.ReportTool.ReportClientError(ReportTool.REPORT_TYPE_LOADSUBGAME_ERROR, reportParam);
    }


    adjustUrl(url: string) {
        if (!url) return url
        if (url.length > 0 && url[url.length - 1] != '/') {
            url += "/"
        }
        return url
    }


    //判断是否是iphone6  
    //iPhone6P : iPhone7,1   iPhone66 : iPhone7,2
    //iPhone6s : iPhone8,1  iPhone6sp : iPhone8,2  iphoneSE : iPhone8,4
    public isIphone6() {
        if (cc.sys.platform != cc.sys.IPHONE)
            return false;
        let brand = Global.Setting.SystemInfo.osBuildModel;
        if (brand.indexOf("iPhone7") >= 0 || brand.indexOf("iPhone8") >= 0)
            return true;
        // return false;
    }

    /**
     * 调整iphoneX坐标
     * @param widgetsList  需要调整的widget节点
     * @param offset 偏移值，默认为60
     * @param isPortrait 新增竖屏变量, 处理按钮在顶部状态栏点不到
     */
    public adjustIphoneX(widgetsList: cc.Node[], offset = 60, isPortrait: boolean = false) {
        if (widgetsList == null)
            return;
        if (!cc.sys.isNative)
            return;
        if (!Global.Setting.SystemInfo.isIphoneX)
            return;
        for (let i = 0; i < widgetsList.length; i++) {
            let node = widgetsList[i];
            if (node == null || !node.isValid)
                continue;
            let widght = node.getComponent(cc.Widget);
            if (widght) {
                if (isPortrait)
                    widght.top += offset;
                else
                    widght.left += offset;
            }
        }
    }

    /**
     * 各个方向的适配
     * @param widgetsList 适配节点
     * @param offset 偏移 默认60
     * @param dir 方向 "left" "right" "top" "bottom" 默认"left"
     */
    public freeAdjustIphoneX(widgetsList: cc.Node[], offset = 60, dir: string = "left") {
        if (widgetsList == null)
            return;
        if (!cc.sys.isNative)
            return;
        if (!Global.Setting.SystemInfo.isIphoneX)
            return;
        for (let i = 0; i < widgetsList.length; i++) {
            let node = widgetsList[i];
            if (node == null || !node.isValid)
                continue;
            let widght = node.getComponent(cc.Widget);
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
    }

    public getSpreadImgPath() {
        let filePath = jsb.fileUtils.getWritablePath() + Global.Toolkit.md5(Global.Setting.Urls.inviteUrl) + '_capImage.png';
        return filePath
    }

    public removeEmoji(content: string) {
        return content.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, "?");
    }

    public checkContainsEmoji(content: string) {
        let reg = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
        return content.match(reg) != null
    }


    public genDeviceId() {
        // return "123456788999";
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        function guid() {
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        }
        return guid();
    }


    public genDeviceInfo() {
        let device: any = {}
        device.device_id = "[" + Global.Setting.SystemInfo.deviceId + "]";
        device.os_type = Global.Toolkit.getOsType();
        device.os_version = cc.sys.os + "|" + cc.sys.osVersion + "|" + Global.Setting.SystemInfo.bundleName;
        device.app_version = Global.Setting.SystemInfo.appVersion;
        device.phone_model = Global.Setting.SystemInfo.osBuildModel;
        device.sign = Global.Setting.SystemInfo.loginSign;
        device.phone_device_brand = Global.Setting.SystemInfo.deviceBrand
        device.wx_key = Global.Setting.SystemInfo.wxKey;
        let hallSkin = Global.Setting.SystemInfo.hallSkin || ""
        let gameSkin = Global.Setting.SystemInfo.gameSkin || ""
        let packageTag = Global.Setting.SystemInfo.packageTag || ""
        device.tagInfo = cc.js.formatStr("%s|%s|%s", hallSkin, gameSkin, packageTag)
        var nativeScreenWidth = Global.Setting.SystemInfo.nativeScreenWidth;
        device.udid = Global.Setting.SystemInfo.udid.toString() || "0"
        device.app_sign = Global.Setting.SystemInfo.appSign
        var nativeScreenHeight = Global.Setting.SystemInfo.nativeScreenHeight;
        if (Global.Setting.SystemInfo.webglData) {
            let webglData = JSON.parse(Global.Setting.SystemInfo.webglData)
            device.gv = webglData.version
            device.gr = webglData.renderer
        }
        //屏幕宽度（像素）
        device.w = Number(nativeScreenWidth < nativeScreenHeight ? nativeScreenWidth : nativeScreenHeight) || 0;
        // 屏幕高度（像素）
        device.h = Number(nativeScreenWidth > nativeScreenHeight ? nativeScreenWidth : nativeScreenHeight) || 0;
        // Logger.error("++++++++++++++++++++++nativeScreenWidth::"+device.w);
        // Logger.error("-------------------------nativeScreenHeight::"+device.h);
        //Android 高版本设备码处理
        if (cc.sys.os == cc.sys.OS_ANDROID && (Global.Toolkit.versionCompare(cc.sys.osVersion, "9") >= 0)) {
            device.need_sid = 1
        }
        device.server_id = Global.Setting.SystemInfo.server_id
        //模拟器
        device.simulator = Global.Setting.SystemInfo.simulator;
        device.entry = Global.Setting.SystemInfo.entry.toString() || ""
        device.sign_type = Global.Setting.SystemInfo.sign_type.toString() || ""
        device.ios_type = Global.Toolkit.getIosSignType()
        return device;
    }

    public genRegInfo() {
        let regInfo: any = {};
        regInfo.packInfo = Global.Setting.ChannelInfo;   //渠道信息
        regInfo.bundleName = Global.Setting.SystemInfo.bundleName;  //包名
        regInfo.appVersion = Global.Setting.SystemInfo.appVersion;  //版本号
        regInfo.firstOpenTime = this.getFirstOpenTime();  //第一次打开时间
        regInfo.osType = this.getOsType();              //系统类型
        //模拟器
        regInfo.simulator = Global.Setting.SystemInfo.simulator;
        regInfo.entry = Global.Setting.SystemInfo.entry.toString() || ""
        regInfo.ios_type = Global.Toolkit.getIosSignType()
        regInfo.udid = Global.Setting.SystemInfo.udid.toString() || "0"
        regInfo.sign_type = Global.Setting.SystemInfo.sign_type.toString() || ""
        regInfo.app_sign = Global.Setting.SystemInfo.appSign
        let hallSkin = Global.Setting.SystemInfo.hallSkin || ""
        let gameSkin = Global.Setting.SystemInfo.gameSkin || ""
        let packageTag = Global.Setting.SystemInfo.packageTag || ""
        regInfo.tagInfo = cc.js.formatStr("%s|%s|%s", hallSkin, gameSkin, packageTag)
        return JSON.stringify(regInfo);
    }

    /**
     * 
     * @returns ios签名类型 0 未识别 1 MDM内部企业签 2非MDM内部企业签 3 MDM内部超级签 4非MDM内部超级签 5 外部超级签  7 TF包 6 自建TF
     */
    getIosSignType() {
        let entry = Global.Setting.SystemInfo.entry.toString()
        let signType = Global.Setting.SystemInfo.sign_type.toString()
        let platform = Global.Setting.SystemInfo.nativePlatform

        if (platform == "TF") {
            return 7
        }

        if (platform == "TF" && signType == "4") {
            return 6
        }

        if (signType == "1") {
            if (entry == "1") {
                return 1
            }
            return 2
        }
        else if (signType == "2") {
            if (entry == "1") {
                return 3
            }
            return 4
        }
        else if (signType == "3") {
            return 5
        }
        else {
            return 0
        }
    }

    secondFormatHMS(s) {
        var t = "";
        if (s > -1) {
            let hour = Math.floor(s / 3600);
            let min = Math.floor(s / 60) % 60;
            let sec = s % 60;
            if (hour < 10) {
                t += "0"
            }
            t += hour + ":";
            if (min < 10) { t += "0"; }
            t += min + ":";
            if (sec < 10) { t += "0"; }
            t += sec;
        }
        return t
    }

    //渠道号  包版本号  资源版本号
    public genLoadingAppInfo() {
        //直接调用原生方法 “getNativeParams” 返回所需数据。  数据来源-> 打包时使用的配置文件 例如588_588.json 中的"ChannelID"字段
        //非原生 是 null
        let packId = Global.Setting.SystemInfo.packChannel;

        //直接调用原生方法 “getNativeParams” 返回所需数据。  数据来源-> 打包时使用的配置文件 例如588_588.json 中的"AppVersion"字段 或者命令打包时传递的参数 -Pver 附带的数据  
        //如果配置文件中没有，并且打包时未传递-Pver参数，则使用 build.gradle 中的默认配置 "1000"
        //非原生 客户端写死的是 40000
        let appVer = Global.Setting.SystemInfo.appVersion;

        //读取热更文件中的版本号，直接通过原生路径直接访问 project.manifest 中的cfgVersion字段
        //非原生 客户端写死的是 0.0.0 
        let cfgVer = Global.HotUpdateManager.getNativeHotUpdateVersion("hall", true);

        let isYunDunInit = Global.AppDun.getDunIsInitByType(DUNTYPE.YUN_DUN)
        let isZADunInit = Global.AppDun.getDunIsInitByType(DUNTYPE.ZA_DUN)
        let isAliDunInit = Global.AppDun.getDunIsInitByType(DUNTYPE.Ali_DUN)
        let verStr = cfgVer + "_" + packId  //111_0_10000

        if (isYunDunInit) {
            verStr = verStr + "_Y"
        }
        if (isZADunInit) {
            verStr = verStr + "_Z"
        }
        if (isAliDunInit) {
            verStr = verStr + "_A"
        }
        verStr = verStr + "_" + appVer
        //return verStr;

        // appId 和 channelPack 都是通过服务器请求的，数据来自PreLoadProxy.ts 的reqServerAppConfig()方法
        //  000 _  000 _40000 _3002 • 0
        //cfgVer_packId_appVer_appId•channelPack


        //  let skintype = Global.Setting.SystemInfo.hallSkin;
        //临时使用appid代替 ，应该使用上行代码
        let skintype = Global.Setting.appId;

        let codeVersion = Global.HotUpdateManager.hallNewVersion;
        return skintype + "_" + codeVersion;
    }

    public genAppInfo() {
        let loadingAppInfo = this.genLoadingAppInfo();
        // let appId = Global.Setting.appId;
        // let channelPack = Global.Setting.ChannelInfo.configChannel;
        let ChannelID = Global.Setting.ChannelInfo.getRegistChannel();
        let appid = Global.Setting.appId;
        return appid + "_" + ChannelID + "_" + loadingAppInfo;
    }


    public getFirstOpenTime() {
        let time = Global.Setting.storage.get("FirstOpenTime");
        if (time == null || time == "") {
            time = Date.now().toString();
            Global.Setting.storage.set("FirstOpenTime", time);
        }
        return time;
    }

    //从[0-max)中选 随机一个整数
    public getRoundInteger(to: number, from: number = 0) {
        return Math.floor(from + Math.random() * (to - from));
    }

    /**
     * 将数据乱序排列(Fisher–Yates shuffle 洗牌算法)
     * @param arr 原数组
     */
    public getOutOrderArray(arr: Array<any>) {
        if (!arr) {
            return [];
        }
        let tmpArr = [...arr];
        let m = tmpArr.length,
            t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = tmpArr[m];
            tmpArr[m] = tmpArr[i];
            tmpArr[i] = t;
        }
        return tmpArr;
    }

    public md5(content) {
        if (this.MD5Hasher == null) {
            this.MD5Hasher = Hasher._createHelper(MD5);
        }
        return this.MD5Hasher(content).toString();
    }

    //获取客户端运行时唯一id
    public getClientUuid() {
        this.uuid++;
        return this.uuid;
    }


    public getOsType() {
        if (!cc.sys.isNative)
            return 1;
        if (cc.sys.os == cc.sys.OS_ANDROID)
            return 2;
        if (cc.sys.os == cc.sys.OS_IOS)
            return 3;
        return 1;
    }


    public checkMegeServer() {

        let packageAppid = Number(Global.Setting.SystemInfo.appID)
        let dataAppid = Global.Setting.appId
        if (dataAppid && packageAppid && packageAppid != dataAppid && !Global.Setting.isCloseMegeServer) {
            return true
        }
        return false
    }
    public getOsTypeStr() {
        let type = this.getOsType();
        if (type == 2)
            return "android";
        if (type == 3)
            return "ios"
        return "web"
    }

    public loadWebPic(node: cc.Node, url: string) {
        Global.ResourceManager.load(url, (error, texture) => {
            if (error) {
                Logger.error("--------------load pic error-------" + error.msg);
                return;
            }
            let sp = node.getComponent(cc.Sprite);
            if (!sp) {
                return Logger.error("_________找不到Sprite_________");
            }
            let headwidth = node.width;
            let headHeight = node.height;
            sp.spriteFrame = new cc.SpriteFrame(texture);
            node.width = headwidth;
            node.height = headHeight;
        })
    }

    public getLocalHeadSf(sfName: string, sprite?: cc.Sprite, width?: number, height?: number) {
        // return Global.ResourceManager.getSprite("hall/texture/common/headImg", sfName);
        if (sfName == null || sfName == undefined || sfName == "") {
            Logger.error("getLocalHeadSf() sfName is empty, return!!!");
            return null;
        }

        if (Number(sfName) && Number(sfName) > Global.Setting.headNameRange) {
            let id = Number(sfName) % Global.Setting.headNameRange // 2020.1.20暂时特殊处理 防止大批头像一样的问题 // grace
            if (id == 0) {
                id = 1
            }
            sfName = (id).toString()
        }
        let spriteFrame = Global.ResourceManager.getSprite("hall/texture/common/headImg", sfName);
        if (spriteFrame == null) {
            Logger.error("getLocalHeadSf() 找不到头像, sfName = " + sfName + ", return!!!");
            return null;
        }

        if (sprite != null && sprite != undefined) {
            width = (width != null) ? width : sprite.node.width;
            height = (height != null) ? height : sprite.node.height;
            sprite.sizeMode = cc.Sprite.SizeMode.RAW
            sprite.trim = false
            sprite.spriteFrame = spriteFrame;
            sprite.node.width = width;
            sprite.node.height = height;
        }
        return spriteFrame;
    }


    /**
     * 加载头像框 -  子游戏专用（圆头像框）
     * @param sprite 图片精灵
     * @param headKuang 头像框的id值字符串
     * @param bGuang 是否发光的框
     */
    public loadLocalHeadFrameByGames(sprite: cc.Sprite, headKuang: string, bGuang: boolean = false, isCustom: boolean = false) {
        var atlasString = "hall/texture/hall/game_head_kuang/game_head_kuang";
        //var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "txkuang_vip" + headKuang;
        if (bGuang) {
            sfString += "_guang";
        }
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, () => {
            sprite.sizeMode = isCustom ? cc.Sprite.SizeMode.CUSTOM : cc.Sprite.SizeMode.RAW
            sprite.trim = false
        }, false);
    }



    /**
     * 加载头像框
     * @param sprite 图片精灵
     * @param headKuang 头像框的id值字符串  by cris
     * @param bGuang 是否发光的框
     */
    public loadLocalHeadFrame(sprite: cc.Sprite, headKuang: string, bGuang: boolean = false, isCustom: boolean = false) {
        //var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "txkuang_vip" + headKuang;
        if (bGuang) {
            sfString += "_guang";
        }
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, () => {
            sprite.sizeMode = isCustom ? cc.Sprite.SizeMode.CUSTOM : cc.Sprite.SizeMode.RAW
            sprite.trim = false
        }, false);
    }


    /**
    * 加载头像框 ,加载VIP里面的资源
    * @param sprite 图片精灵
    * @param headKuang 头像框的id值字符串
    * @param bGuang 是否发光的框
    */
    public loadLocalHeadFrameByVip(sprite: cc.Sprite, headKuang: string, bGuang: boolean = false, isCustom: boolean = false) {
        var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        //var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "txkuang_vip" + headKuang;
        if (bGuang) {
            sfString += "_guang";
        }
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, () => {
            sprite.sizeMode = isCustom ? cc.Sprite.SizeMode.CUSTOM : cc.Sprite.SizeMode.RAW
            sprite.trim = false
        }, false);
    }

    /**
     * 加载vip大图标
     * @param sprite 图片精灵
     * @param vip vip等级
     */
    public loadLocalVip(sprite: cc.Sprite, vip) {
        //var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "icon_v" + vip;
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, null, false);
    }

    /**
     * 加载vip小标识
     * @param sprite 图片精灵
     * @param vip vip等级
     */
    public loadLocalVipIcon(sprite: cc.Sprite, vip) {
        //var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "vip_tq" + vip;
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, null, false);
    }


    /**
    * 加载vip小标识
    * @param sprite 图片精灵
    * @param vip vip等级
    */
    public loadVipIcon(sprite: cc.Sprite, vip) {
        var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        // var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "vip_tq" + vip;
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, null, false);
    }

    /**
     * 加载游戏里的任务指引图片
     * @param sprite 图片精灵
     * @param string 路径
     * @param name 任务图片
     */
    public loadTaskIcon(sprite: cc.Sprite, string, name) {
        var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "atlasString" + name;
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, null, false);
    }





    /**
     * 加载vip小标识子游戏调用
     * @param sprite 图片精灵
     * @param vip vip等级
     */
    public loadLocalVipIconGame(sprite: cc.Sprite, vip) {
        //var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString = "icon_v" + vip;
        return Global.ResourceManager.loadAutoAtlas(sprite, atlasString, sfString, null, false);
    }



    public isInteger(obj) {
        return parseInt(obj, 10) === obj
    }

    /**
     * 获取玩家金钱格式文本
     */
    public GetMoneyFormat(money: number = 0) {
        // var realNum = money / Global.Setting.glodRatio;
        // return realNum.toFixed(2);
        return this.formatPointStr(money, true, false);//2019-7-15 xiaoC 捕鱼中可能出现小数点后3位，toFixed(2)会四舍五入导致显示>实际，统一使用截断处理
    }

    //格式化货币
    //1 round  2 ceil 3 floor
    public formatPoint(point: number, type = 3, defaultFix = 2): number {
        let rate = Global.Setting.glodRatio;
        let factor = Math.pow(10, defaultFix);      // 放大系数 决定了保留多少小数位取整
        switch (type) {
            case 1:
                return Math.round(point * factor / rate) / factor;
            case 2: {
                let plus = point > 0 ? 1 : -1;               // debug记录正负, 处理负值情况
                point = Math.abs(point);
                return plus * Math.ceil(point * factor / rate) / factor;
            }
            case 3: {
                let plus = point > 0 ? 1 : -1;               // debug记录正负, 处理负值情况
                point = Math.abs(point);
                return plus * Math.floor(point * factor / rate) / factor;
            }
            default:
                return Math.round(point * factor / rate) / factor;
        }
    }

    public dumpRes(full?: boolean) {
        let fullMap = cc.loader['_cache'];
        let dump = [];
        for (let k in fullMap) {
            let v = fullMap[k];
            if (!full && (v.type == 'js' || v.type == 'uuid' || v.id.indexOf('res/raw-internal') >= 0 || v.id.indexOf('preview-scene') >= 0)) {
                continue;
            }
            dump.push(v);
        }
        // console.info(dump);
        // console.info(dump.length);
    }


    /**
     * 格式化货币
     * @param {number} point  服务器货币数量
     * @param {boolean} [fix=false] 是否固定小数位
     * @param {boolean} [withPlus=false] 是否显示加号
     * @param {number} nFix? 设定小数位 fix=true有效
     * @returns {string}
     * @memberof Toolkit
     */
    public formatPointStr(point: number, fix: boolean = false, withPlus: boolean = false, nFix?: number): string {
        if (!fix) {
            let resStr = this.formatPoint(point, 3).toString();
            if (withPlus && point >= 0)
                resStr = "+" + resStr;
            return resStr;
        }
        let fixNum = nFix || Global.Setting.fixCount;
        let resStr = this.formatPoint(point, 3, nFix).toFixed(fixNum);
        if (withPlus && point >= 0)
            resStr = "+" + resStr;
        return resStr;
    }

    /**
     * 获取188****1234
     * @param str 字符串
     * @param preCount 保留前几位
     * @param lastCount 保留后几位
     */
    public formateStrWithAsterisk(str: string = '', preCount = 0, lastCount = 0) {
        if (str == '') return ''
        let count = str.length;
        if (preCount + lastCount <= count) {
            let preStr = str.substr(0, preCount);
            let lastStr = str.substr(-lastCount, lastCount);
            let addStr = ""
            for (let s = 0; s < count - preCount - lastCount; s++) {
                addStr = addStr + "*";
            }
            return preStr.concat(addStr, lastStr);
        }
        else {
            return '*********'
        }
    }

    /**
     * 截取字符串，超出的用..代替
     * @param str 字符串
     * @param byteLen 保留长度，中文算两个字符
     * @param notAppend true强制不添加..
     */
    public substrEndWithElli(str: string = '', byteLen: number, notAppend = false) {
        str = Global.Toolkit.removeEmoji(str)
        let count = this.getTotalBytes(str),
            len = byteLen;
        if (str == '' || count <= byteLen)
            return str;
        let result = '';
        for (let i = 0; i < str.length; i++) {
            let s = str.charAt(i);
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
    }

    public getByte(str: string = '') {
        let nByte = 0;
        if (str.match(/[^\x00-\xff]/ig) != null) {
            nByte = 2;
        } else {
            nByte = 1;
        }
        return nByte;
    }

    public getTotalBytes(str: string = '') {
        let byteValLen = 0;
        for (var i = 0; i < str.length; i++) {
            let nByte = this.getByte(str[i]);
            byteValLen += nByte;
        }
        return byteValLen;
    }

    /**
     * 判断是否为{}或者[]
     * @param obj 对象
     */
    public isEmptyObject(obj) {
        for (let key in obj)
            return !1;
        return !0;
    }

    /**
     * 获取圆上指定角度的点坐标
     * @param centerPoint 圆心坐标
     * @param radius 半径
     * @param angle 角度
     */
    public getCirclePoint(centerPoint: cc.Vec3, radius: number, angle: number): cc.Vec3 {
        let x = centerPoint.x + radius * Math.cos(2 * angle * Math.PI / 360);
        let y = centerPoint.y + radius * Math.sin(2 * angle * Math.PI / 360);
        return new cc.Vec3(x, y);
    }

    /**
     * 随机获取圆内坐标
     * @param centerPoint 圆心坐标
     * @param radius 半径
     */
    public getCircleRandomInPoint(centerPoint: cc.Vec3, radius: number): cc.Vec3 {
        let r = Math.random() * radius;     // [0, radius)
        let a = Math.random() * 360;        // [0, 360)
        return this.getCirclePoint(centerPoint, r, a);
    }

    /**
     * 随机获取矩形内坐标
     * @param centerPoint 中心
     * @param w 宽
     * @param h 高
     */
    public getRectRandomInPoint(centerPoint: cc.Vec3, w: number, h: number): cc.Vec3 {
        let x = -w / 2 + Math.random() * w;
        let y = -h / 2 + Math.random() * h;
        return centerPoint.add(new cc.Vec3(x, y));
    }

    /**
     * 计算两个向量的夹角 以startx正向为基准 返回[0, 90)U(90, 180]U(180, 270)U(-90, 0)取值
     * @param start 
     * @param end 
     */
    public getVec2Angle(start: cc.Vec3, end: cc.Vec3) {
        let tan = (end.y - start.y) / (end.x - start.x);
        if (end.x > start.x)                // 一、四象限为end相对start夹角
            return Math.atan(tan) * 180 / Math.PI;
        else                                // 二、三象限为start相对end夹角 取补角
            return Math.atan(tan) * 180 / Math.PI + 180;
    }

    /**
     * 计算两个平面向量距离
     * @param start 起点
     * @param end 终点
     */
    public getVec2Distance(start: cc.Vec3, end: cc.Vec3) {
        return end.sub(start).mag();
    }

    /**
     * 将node1坐标系下的point转换到node2坐标系下的本地坐标
     * @param node1 要转换坐标的父节点
     * @param node2 目的父节点
     * @param point 转换坐标
     */
    public convertSameNodePos(node1: cc.Node, node2: cc.Node, point = cc.Vec3.ZERO) {
        let worldPos = node1.convertToWorldSpaceAR(point);
        return node2.convertToNodeSpaceAR(worldPos);
    }
    /**
     * 
     * @param num 
     */
    GetText(num: any) {
        // let txt;
        // if (num > 10000) {
        //     txt = 
        // }
        // else {
        //     txt = num
        // }
        return (num / 10000).toFixed(2)
    }

    /**
     * 
     * @param node 生成二维码的节点
     * @param url 二维码的url
     * @param margin 二维码边界空隙长宽
     */
    initQRCode(node, url, margin = 10) {
        var ctx = Global.UIHelper.safeGetComponent(node, "", cc.Graphics)//node.addComponent(cc.Graphics);
        if (ctx) {
            ctx.clear()
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
    }

    /**
     * 
     * @param ctx 绘制api
     * @param url 二维码的url
     * @param margin 二维码边界空隙长宽
     * @param node 生成二维码的节点
     */
    QRCreate(ctx, url, margin, node) {

        ctx.clear();

        //背景色
        ctx.fillColor = cc.Color.WHITE;
        let width = node.width;
        ctx.rect(0 - width * 0.5, 0 - width * 0.5, width, width);
        ctx.fill();
        ctx.close();

        //生成二维码数据
        let qrcode = new QRCode(-1, QRErrorCorrectLevel.H);
        qrcode.addData(url);
        qrcode.make();
        ctx.fillColor = cc.Color.BLACK;
        let size = width - margin * 2;
        let num = qrcode.getModuleCount();

        let tileW = size / num;
        let tileH = size / num;
        let w = Math.ceil(tileW);
        let h = Math.ceil(tileH);
        for (let row = 0; row < num; row++) {
            for (let col = 0; col < num; col++) {
                if (qrcode.isDark(row, col)) {
                    ctx.rect(margin + col * tileW - width * 0.5, size - tileH - Math.round(row * tileH) + margin - width * 0.5, w, h);
                    ctx.fill();
                }
            }
        }
    }

    /**检测密码字符串是否合法 */
    checkPWFormat(text: string) {
        if (text.length < 6 || text.length > 16) {
            return false;
        }
        for (let i = 0; i < text.length; i++) {
            let c = text.charAt(i);
            if (this._pwCheckString.indexOf(c) < 0) {
                return false;
            }
        }
        return true;
    }

    //比对版本
    versionCompare(versionA: string, versionB: string) {
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
    }

    /**
     * 深拷贝对象
     * @param obj 
     */
    public copyObj(obj: any) {
        if (obj) {
            return JSON.parse(JSON.stringify(obj));
        }
        else {
            return {}
        }
    }

    //请求appInfo   暂不卡主流程，如果时序出问题考虑等请求完成后再
    private getDownloadAppInfo() {
        if (!cc.sys.isNative)
            return;
        if (Global.Setting.ChannelInfo.serverAppInfoContent != null && Global.Setting.ChannelInfo.serverAppInfoContent != "")
            return;
        let param: any = {}
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
        Global.HallServer.sendClientLog(NetClientLog.DownloadAppInfo, param, (msg) => {
            if (msg) {
                let tmp: any = {}
                tmp.ch = msg.pack;
                tmp.ic = msg.invite_code;
                Global.Setting.ChannelInfo.serverAppInfoContent = tmp;
                if ((tmp.ch && tmp.ch != 0) || (tmp.ic && tmp.ic != 0))
                    Global.Setting.ChannelInfo.sourceType = 4;
            }
        }, () => { return false })
    }


    /**
     * 检查版本号是否支持
     * @param supportVersion 默认版本号，当有iosVersion时，为安卓版本号
     * @param iosVersion ios支持版本号，默认为0
     */
    public checkVersionSupport(supportVersion, iosVersion = 0) {
        if (!cc.sys.isNative)
            return true
        let version = Global.Setting.SystemInfo.appVersion
        let numVer = Number(version)

        //iosVersion不为0时  ios版本号以iosVersion为准
        if (cc.sys.platform == cc.sys.IPHONE && iosVersion && iosVersion > 0) {
            supportVersion = iosVersion;
        }

        if (isNaN(numVer) || numVer >= supportVersion)
            return true;
        return false;
    }

    //--------------------------------------------------------------------------------

    /**
     * 游戏退出后在大厅弹提示框
     * @param content 文本
     * @param yFunc 确定回调
     * @param nFunc 取消或者关闭回调
     * @param type 1 显示确定提示框  2 显示确定取消提示框
     */
    public transmitHallMsg(content: string, yFunc?: Function, nFunc?: Function, type: number = 1) {
        if (typeof (content) != "string")
            return;
        let info: any = {}
        info.content = content;
        info.yFunc = yFunc;
        info.nFunc = nFunc;
        info.type = type;
        Game.DataBridge.msg = info;
    }

    /**
     * 游戏tips大厅显示
     * @param tips tips内容
     */
    public transmitHallTip(tips) {
        Game.DataBridge.fastTipMsg = tips;
    }

    /**退出游戏后大厅显示Window */
    public transmitHallWindow(window, args?) {
        if (window == null) {
            return
        }
        let info: any = {}
        info.window = window
        info.args = args
        Game.DataBridge.cacheShow = info;
    }

    public reportLog(key: string, param: any) {
        let data: any = {};
        data.type = "debug";
        data.key = key;
        let uid = Number(Global.Setting.storage.get(HallStorageKey.Uid)) || 0;
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
        Global.HallServer.sendClientLog(NetClientLog.ClientLogReq, data, null, () => { return false }, false);
    }

    public parseTime(time, cFormat = "") {
        if (arguments.length === 0) {
            return null;
        }
        const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
        let date;
        if (typeof time === 'object') {
            date = time;
        } else {
            if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
                time = parseInt(time);
            }
            if ((typeof time === 'number') && (time.toString().length === 10)) {
                time = time * 1000;
            }
            date = new Date(time);
        }
        const formatObj = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            i: date.getMinutes(),
            s: date.getSeconds(),
            a: date.getDay()
        }
        const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
            let value = formatObj[key];
            // Note: getDay() returns 0 on Sunday
            if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] };
            if (result.length > 0 && value < 10) {
                value = '0' + value;
            }
            return value || 0;
        })
        return time_str;
    }

    /**
     * 
     * @param url 图片地址
     * @param id 唯一标识
     * @param callback 加载完成的回调
     */
    public LoadPicToNative(url, id, callback?) {
        let name = Global.Toolkit.md5(id)
        let filePath = jsb.fileUtils.getWritablePath() + name + '.jpg';
        if (!jsb.fileUtils.isFileExist(filePath)) {
            let xhr = cc.loader.getXMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        this.saveFileToNative(filePath, xhr.response, callback);
                    } else {
                        this.saveFileToNative(null);
                    }
                }
            }.bind(this);
            xhr.responseType = 'arraybuffer';
            xhr.open("GET", url, true);
            xhr.send();
        }
        else {
            this.loadEnd(filePath, callback);
        }
    }

    public saveFileToNative(filepath, data, callback?) {
        if (typeof data !== 'undefined') {
            // if( !jsb.fileUtils.isDirectoryExist(filepath) ){
            //     jsb.fileUtils.createDirectory(filepath);
            // }
            if (jsb.fileUtils.writeDataToFile(new Uint8Array(data), filepath)) {
                Logger.log('Remote write file succeed.');
                this.loadEnd(filepath, callback);
            } else {
                Logger.log('Remote write file failed.');
            }
        } else {
            Logger.log('Remote download file failed.');
            if (callback) {
                callback(null)
            }
        }
    }

    public loadEnd(filepath, callback) {
        cc.loader.load(filepath, function (err, texture) {
            if (err) {
                if (jsb.fileUtils.isFileExist(filepath)) {
                    jsb.fileUtils.removeFile(filepath)
                }
                Logger.log(err);
            } else {
                if (texture) {
                    if (callback) {
                        callback(texture);
                    }
                }
            }
        });
    }


    public showMoneyNotEnough(str = "金币不够啦，请前往充值！") {
        Global.UI.showSingleBox(str, () => {
            Global.UI.show("WndRecharge");
        })
    }

    /***
     * 检测是否为有效的数字
     * ***/
    public checkNumValid(value) {
        let num = Number(value)
        if (num) {
            let isBigNum = BigNumber(num).gt(Number.MAX_SAFE_INTEGER)
            if (isBigNum) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    }

    public checkMoney(level = "l0", gameData) {
        if (!gameData) {
            Logger.error("游戏数据为空")
            return false
        }
        if (gameData.levels) {
            for (let index = 0; index < gameData.levels.length; index++) {
                let levelStr = gameData.levels[index].level;
                if (levelStr && levelStr == level) {
                    let pointLow = gameData.levels[index].PointLow;
                    if (pointLow && Global.PlayerData.point < pointLow) {
                        let limit = Global.Toolkit.formatPointStr(pointLow);
                        let str = "游戏准入" + limit + "金币，请您充值哦！"
                        Global.Toolkit.showMoneyNotEnough(str)
                        return false;
                    }
                }
            }
        }
        return true;
    }

    /**
     * 跟进配置判断是否限制充值
     */
    public checkRechargeLimited() {
        if (Global.Setting.rechargeLimited) {
            if (Global.PlayerData.phone == "") {
                Global.UI.showSingleBox("该功能需要绑定手机号后才能使用，是否立即绑定手机？", () => {
                    Global.UI.show("WndBindPhone");
                })
                return true
            }
        }
        return false
    }


    /**
     * 
     * @param reason 错误码
     */

    public checkMoneyError(errno) {
        if (errno == 102) {
            Global.UI.showSingleBox("金币不够啦，是否前往充值？", () => {
                Global.UI.show("WndRecharge");
            })
            return true;
        }
        return false;
    }

    /* 设置节点的父节点，保持位置不变
    * @param child 要操作节点
    * @param parent 要设置到的父节点
    * @param isFixed 是否保持位置不变
    */
    public setNodeParent(child: cc.Node, parent: cc.Node, isFixed: boolean = true) {
        if (child && parent && cc.isValid(child) && cc.isValid(parent)) {
            if (isFixed) {
                let pos = this.convertSameNodePos(child.parent, parent, child.position);
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
    }

    /* 超过万元显示 多少万
    * @param value 金额
    */
    public formatMillion(value: number): string {
        if (value > 9999)
            return (Math.floor(value / 1000) / 10) + "万";  //保留一位小数
        else if (value <= 9999 && value >= -9999)
            return value + "";
        else
            return -(Math.floor(Math.abs(value) / 1000) / 10) + "万";
    }


    public CheckGameVersion(version) {
        if (version == null || version == undefined)//服务器不发表示版本正常
        {
            return true
        }
        let gameInfo = Global.GameData.getGameInfo(Global.HotUpdateManager.CurrentGame)
        if (version == gameInfo.native_version) {
            return true
        }
        else if (this.versionCompare(version, gameInfo.native_version) < 0) {
            return false
        }
        else {
            return true
        }
    }

    public CheckFileExist(fileName: string) {
        if (CC_JSB) {
            return jsb.fileUtils.isFileExist(fileName)
        }
        return false
    }

    public getFirstLoginTime() {
        let time = Global.Setting.storage.get(HallStorageKey.BaiduIntervelTimes);
        if (time == null || time == "") {
            time = new Date().getTime()
            Global.Setting.storage.set(HallStorageKey.BaiduIntervelTimes, time);
        }
        return time;
    }

    //检测是否可以使用微信
    public checkIsPlatformShowWX() {
        let isShow = true
        let platform = Global.Setting.SystemInfo.nativePlatform
        switch (platform) {
            case "majiabao":
            case "appstore":
            case "testflight":
            case "appstore_sdktype":
                isShow = false;
                break;
        }
        return isShow;
    }

    //检测是否可以使用支付宝
    public checkIsPlatformShowZhifubao() {
        let isShow = true
        let platform = Global.Setting.SystemInfo.nativePlatform
        switch (platform) {
            case "appstore":
            case "appstore_sdktype":
                isShow = false;
                break;
        }
        return isShow;
    }

    public SectionToChinese(section) {
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
            } else {
                zero = false;
                strIns = chnNumChar[v];
                strIns += chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
        return chnStr;
    }

    public DealWithUrl(url: string) {

        if (typeof (url) != "string" || !url) {
            Logger.error("链接格式不对")
            return null
        }
        return encodeURI(url.replace("\t", "").trim())

    }

    //替换控制字符
    public strReplaceCtrChar(str) {
        if (str) {
            return str.replace(/[\x00-\x1f]+/g, '');
        }
        return str
    }
    //通过排序比较2个数组是否包含相同的元素
    public compareArraySort(a1, a2) {
        if ((!a1 && a2) || (a1 && !a2)) return false;
        if (a1.length !== a2.length) return false;
        let a11 = [].concat(a1);
        let a22 = [].concat(a2);
        a11 = a11.sort();
        a22 = a22.sort();
        for (var i = 0, n = a11.length; i < n; i++) {
            if (a11[i] !== a22[i]) return false;
        }
        return true;
    }

    /**
    * 如果是艾特外链组装参数
    * @param url 原有链接
    * @returns 
    */
    AssembyUrl(url) {
        let userid = Global.PlayerData.uid;
        let appid = Global.customApp.getAppID()
        let vip = Global.PlayerData.vip
        let appName = Global.Setting.SystemInfo.appName
        let userName = Global.PlayerData.nickname
        let ip = Global.PlayerData.ip
        let ostype = Global.Toolkit.getOsType()
        let point = Global.PlayerData.point
        let checkStr = cc.js.formatStr("%s-%s-[%s]-%s-%s-game688@aite", appid, 1, userid, vip, userName)

        let appKey = Global.AESUtil.md5(checkStr)

        url = `${url}&userid=${userid}&appid=${appid}&username=${userName}&appname=${appName}&appkey=${appKey}&vip=${vip}&ip=${ip}&ostype=${ostype}&point=${point}`

        return url
    }

}