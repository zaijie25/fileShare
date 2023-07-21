import ServerRoutes, { ServerUrl } from "../../setting/ServerRoutes";

export class HttpNetExtraData
{
    //外部可配置信息
    //链接超时  暂时先不用
    public timeout:3000;
    //失败后是否显示提示
    public showErrorTips = false;
    //重连总次数  默认为3
    public retryTotalTime = 3;


    //routes
    public serverRoutes:ServerRoutes;
    //url后缀
    public suffix;
    //协议名称
    public funcName:string;
    //重连逻辑使用
    public url:ServerUrl;
    //重试次数
    public retryTimes = 0;
    public param:any;
    public onComplete:Function;
    public errorHandler:Function;
    //是否显示waiting界面
    public showWaiting = false;

    public sendInGame = null;

    //是否并行请求
    public isParallelReq = false;
    //线路no
    public lineIndex = 0
    /**
     * 是否启用waiting界面的mask
     */
    public enableMask = true


    //缓存机制
    public cache:number = 0; //0: 不缓存, 1-10000: 按秒时效, 10001:按天缓存

    public refreshUrl()
    {
        let url = this.serverRoutes.getCurRoute().getUrl()
        let suffix = Global.UrlUtil.refreshSuffixOperTime(this.suffix)
        this.suffix = suffix
        url.suffix = url.suffix + suffix
        this.url = url;
    }
    
}


export class HallErrorHelper
{
    //登录失败
    private CheckLoginFailed = 401;
    //三方登录失败
    private OpenidLoginFailed = 402;

    //系统维护
    private SystemMaintain = 403;

    //服务器业务逻辑错误处理
    public tryHandleError(serverData):boolean
    {
        if(serverData == null)
            return false;
        if(serverData._errno == null)
            return true;

        if(serverData._errno == -1)
            return false;

        if(serverData._errno == this.CheckLoginFailed || serverData._errno == this.OpenidLoginFailed)
        {
            this.reLogin(serverData._errstr,serverData._errno);
            return false;
        }

        //403  系统维护中   跳到登录界面
        if(serverData._errno == this.SystemMaintain)
        {
            this.reLogin("系统维护中，请重新登录",403, true);
            return false;
        }

        if(serverData._errno > 1000  && serverData._errno != 2002)
            Global.UI.showSingleBox(serverData._errstr);
            //Global.UI.fastTip(serverData._errstr+"["+serverData._errno+"]");
        else if (serverData._errno == 2002)
        {
            Global.Toolkit.showMoneyNotEnough();
        }
        else
        {
           // Global.UI.fastTip(serverData._errstr+"["+serverData._errno+"]");
            Global.UI.showSingleBox(serverData._errstr);
        }
            

        return false;
    }

    public handleError(serverData, errorHandler):boolean
    {
        if(serverData == null)
            return false;
        if(serverData._errno == null)
            return true;
        if(errorHandler)
            return errorHandler(serverData)
        return this.tryHandleError(serverData);
    }

    private reLogin(errorStr, errno,useTip = false)
    {
        let func = ()=>
        {
            Global.SceneManager.goToLogin();
        }
        if(!useTip)
            Global.UI.showSingleBox((errorStr + "["+errno+"]"), func, func);
        else
        {
            Global.UI.fastTip(errorStr);
           // Global.UI.fastTip(errorStr + ["+errno+"]);
            func();
        }
    }
}