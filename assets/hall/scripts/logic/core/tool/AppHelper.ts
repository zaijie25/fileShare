import CustomAppInfo from "../../hallcommon/app/CustomApp";
import HallStorageKey from "../../hallcommon/const/HallStorageKey";


//渠道包配置相关
export default class AppHelper {
    public static cfg;

    public static specialPlatfromList: BaiduPlatform[] = []

   
    //是否为提现
    public static isCash:boolean = false;
    public static init(){
        this.specialPlatfromList = []
        this.specialPlatfromList.push(new BaiduPlatform());
        
    }

    public static getConfigUrl(){
        return  "https://d.dtdsnt.com/";
    }

    
    public static formatUrl(url:string)
    {
        //使用正则可以匹配多个
        // url = url.replace("\[app\]", LinkParamHelper.app);
        url = url.replace(/\[ch\]/g, Global.Setting.ChannelInfo.getPlayerChannel().toString());
        url = url.replace(/\[appid\]/g, Global.Setting.appId.toString());
        // url = url.replace("\[backurl\]", encodeURI(URLDefine.getWebBackGameUrl()));
        // url = url.replace(/\[invite_code\]/g, encodeURIComponent(ToolKit.getInviteCode()[1]));
        url = url.replace(/\[invite_code\]/g, encodeURIComponent(Global.Setting.ChannelInfo.getInviteId().toString()));

        if(Global.PlayerData == null)
            return url;
        url = url.replace(/\[uid\]/g, Global.PlayerData.uid.toString());
        let tmpUrl = url;
        try
        {
            if(tmpUrl.indexOf("token") > - 1)
                tmpUrl = tmpUrl.replace("\[token\]", encodeURIComponent( Global.PlayerData.token));
            if(url.indexOf("uname") > -1)
                tmpUrl = tmpUrl.replace("\[uname\]", encodeURIComponent(Global.PlayerData.nickname));
            url = tmpUrl;
        }
        catch(e)
        {
            Logger.error("encodeURIComponent error");
            Global.ReportTool.ReportClientError("formatUrlError", 
            {
                des:"encodeURIComponent error",
                token:Global.PlayerData.token,
                nickname:Global.PlayerData.nickname,
                url:url,
            })
        }

        
        return url;
    }

    public static get enableWxShare()
    {
        return true
    }

    //是否支持艾特跳转
    public static get enableAiTeApp(){
        return true
    }

    //是否支持跳转支付宝
    public static get enableAwakeAli(){
        return true
    }
    
    //是否支持支付宝SDK支付
    public static get enableAliPaySDK(){
        return true
    }
    //是否支持微信SDK支付
    public static get enableWXSDK(){
        return true
    }
    //是否支持支付宝h5 转native 支付
    public static get enableAliPayInterceptorWithUrl(){
        return true
    }

    //是否支持支付宝h5 授权
    public static get enableAliPayAuthWithUrl(){
        return true
    }

    //是否支持支付宝检测
    public static get enableAliPayCheckInstall(){
        return true
    }

    //是否开启强更包逻辑
    public static get enableForceUpdateAppInstall(){
        return true
    }

    //是否支持支付宝通过payAuthInfo授权
    public static get enableAliPayAuthWithPayAuthInfo(){
        return true
    }

    //是否支持新版本SDK支付
    public static get enableSDKPay(){
        return true
    }
    //是否支持UpaySDK支付
    public static get enableUPay(){
        return true
    }
    //是否支持SDK支付
    public static get enableSDK(){
        return true
    }
    //app平台配置，后续做为可配置
    public static appCfg = 
    {
        1001:
        {
            wxLogin:[false, "体验服暂不支持微信登录"],
            wxShare:[false, "体验服暂不支持微信分享"],
        },
        1002:
        {
            wxLogin:[false, "体验服暂不支持微信登录"],
            wxShare:[false, "体验服暂不支持微信分享"],
        },
        1003:
        {
            wxLogin:[false, "体验服暂不支持微信登录"],
            wxShare:[false, "体验服暂不支持微信分享"],
        },
    }

    //是否是百度平台
    public static isBaiduPlatform()
    {
        return this.specialPlatfromList 
            && this.specialPlatfromList[0] 
            && this.specialPlatfromList[0].isTargetPlatform();
    }

    //百度登录后计时状态
    public static isBaiduSpecialState()
    {
        if(!this.isBaiduPlatform())
            return false;
        //在计时过程中 才算特殊状态
        return !this.specialPlatfromList[0].isTimeup;
    }



    public static getAppCfg()
    {
        let appid = Global.Setting.appId;
        return this.appCfg[appid];
    }

    public static getAppWXShareEnable()
    {
        if(!this.checkWxkey())
            return false;
        let cfg = this.getAppCfg();
        if(cfg == null)
            return true;
        let arr = cfg.wxShare;
        if(arr.length > 1 && arr[1] != "")
        {
            Global.UI.fastTip(arr[1]);
        }
        return arr[0];
    }

    public static getAppWXLoginEnable()
    {
        if(!this.checkWxkey())
            return false;
        let cfg = this.getAppCfg();
        if(cfg == null)
            return true;
        let arr = cfg.wxLogin;
        if(arr.length > 1 && arr[1] != "")
        {
            Global.UI.fastTip(arr[1]);
        }
        return arr[0];
    }

    public static checkPlatformWXEnable(isShowTips = true){
        let isEnable = Global.Toolkit.checkIsPlatformShowWX()
        if (!isEnable && isShowTips){
            Global.UI.fastTip("该版本暂不支持微信功能，请手动打开微信"); 
        }
        return isEnable;
    }


    //游戏是否需要过滤
    public static isFilterGame(gid)
    {
        if(!this.isBaiduPlatform())
            return false;
        let baiduPlatform = this.specialPlatfromList[0];
        if(baiduPlatform && baiduPlatform.filterGameArray.indexOf(gid) > -1)
            return true;
        return false;
    }


    public static checkWxkey(isShowTips = true)
    {
        // //兼容老版本
        // if(Global.Setting.SystemInfo.wxKey == null || Global.Setting.SystemInfo.wxKey == "")
        //     return true;
        if(Global.Setting.SystemInfo.bundleName == null || Global.Setting.SystemInfo.bundleName == "")
            return true;
        //服务器没有配置 暂时不处理
        if(Global.Setting.serverWxMd5 == "" || Global.Setting.serverWxMd5 == null)
            return true;
        let bundleMd5 = Global.Setting.serverAndroidIdMd5;
        if(cc.sys.platform == cc.sys.IPHONE)
            bundleMd5 = Global.Setting.serverIOSIdMd5;
        if(bundleMd5 == null || bundleMd5 == "")
            return true;
        if(Global.Toolkit.md5(Global.Setting.SystemInfo.bundleName) == bundleMd5
        && Global.Toolkit.md5(Global.Setting.SystemInfo.wxKey) == Global.Setting.serverWxMd5)
            return true;
        if (isShowTips){
            Global.UI.fastTip("该版本暂不支持微信功能");  
        }
          
        return false;
    }

        /**
     * 检测APPID和包渠道号是否相同   主要用于定制部分渠道包和app特殊需求
     * @param appId 
     * @param channel 指定包渠道号，如果channel为空，则表示所有渠道通用
     * @param enbaleConfigChannel  是否检测config渠道号
     */
    public static checkAPPAndChannel(appId, channel = null, enbaleConfigChannel = false)
    {
        //检测
        if(Global.Setting.appId != appId)
            return false;
        if(channel != null && Number(Global.Setting.SystemInfo.packChannel) == channel)
            return true;
        if(enbaleConfigChannel && Number(Global.Setting.ChannelInfo.configChannel) == channel)
            return true;
        return false;
    }

            /**
     * 检测包渠道号是否相同   主要用于定制部分渠道包和app特殊需求
     * @param channel 指定包渠道号，如果channel为空，则表示所有渠道通用
     * @param enbaleConfigChannel  是否检测config渠道号
     */
    public static checkChannel(channel = null, enbaleConfigChannel = false)
    {
        if(channel != null && Number(Global.Setting.SystemInfo.packChannel) == channel)
            return true;
        if(enbaleConfigChannel && Number(Global.Setting.ChannelInfo.configChannel) == channel)
            return true;
        return false;
    }

    public static onPreloadRes(requireList, requireAtlasList, requireSpineList)
    {
        for(let i = 0; i < this.specialPlatfromList.length; i++)
        {
            let platform = this.specialPlatfromList[i];
            if(platform.isTargetPlatform())
            {
                platform.onPreloadRes(requireList, requireAtlasList, requireSpineList)
            }
        }
    }

    public static afterGetConfig()
    {
        for(let i = 0; i < this.specialPlatfromList.length; i++)
        {
            let platform = this.specialPlatfromList[i];
            if(platform.isTargetPlatform())
            {
                platform.afterGetConfig()
            }
        }
    }

    public static afterWindowInit(name, node, window)
    {
        for(let i = 0; i < this.specialPlatfromList.length; i++)
        {
            let platform = this.specialPlatfromList[i];
            if(platform.isTargetPlatform())
            {
                platform.afterWindowInit(name, node, window)
            }
        }
    }


}


//特殊平台定制需求
export class SpecialPlatform
{
    public getName()
    {
        return ""
    }
    public isTargetPlatform()
    {
        return false;
    }
    //预加载大厅资源调用 可以修改或者添加预加载资源。
    public onPreloadRes(requireList, requireAtlasList, requireSpineList){};

    //设置好gamecfg之后  用于修改gameData，
    public afterGetConfig()
    {
    }

    //window initView之后调用，负责修改UI，重定向点击事件等
    public afterWindowInit(name, node, window)
    {

    }
}

//百度渠道包  688 36渠道  798 30渠道   http://192.168.1.21/zentao/task-view-851.html
export class BaiduPlatform extends SpecialPlatform
{
    private timeupState = false;
    private timerID = null
    public filterGameArray = [7005, 2008, 1001]; 

    public getName()
    {
        return "baidu"
    }

    public isTargetPlatform()
    {
        return false;
        //return AppHelper.checkAPPAndChannel(688, 36) || AppHelper.checkAPPAndChannel(798, 30);
    }

    public afterGetConfig()
    {

    
    }

  

    public get isTimeup()
    {
        return this.timeupState;
    }

    public set isTimeup( flag)
    {
        this.timeupState = flag
        if(flag)
        {
            Global.Event.event(GlobalEvent.UPDATE_BAIDU_STATE);
            if(this.timerID)
            {
                clearInterval(this.timerID)
            }
        }
    }

    public afterWindowInit(name, uiNode, window)
    {
        if(name == "WndHall")
        {
            // let node = cc.find("bottomNode/tixianNode/icon", uiNode);
            // if(node == null)
            //     return;
            // let sp = node.getComponent(cc.Sprite);
            // Global.ResourceManager.loadAutoAtlas(sp,"hall/specialPlatform/baidu/atlas/baiduAtlas","dilanzi_txian");
        }
    }
}