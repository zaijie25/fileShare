import BaseServerHelper from "./BaseServerHelper";

//游戏逻辑通用错误处理
export default class GameErrorHelper extends BaseServerHelper
{
    public errorHandlerMap:{[key:number]:Function} = {}

    //余额不足
    private ERROR_NOT_ENOUGH = 301;

    private ERROR_NO_SERVICE = 404;
    //不在桌上
    private ERROR_NOT_IN_TABLE = 1001;
    //网络变化 需要回到大厅
    private ERROR_NET_CHANGE = 902;

    //不在桌子上
    private ERROR_NOT_ONTABLE = 905;
    //货币不足
    private ERROR_LOW_LIMIT = 906;
    //货币超出限制
    private ERROR_UPPER_LIMIT = 907;

    private ERROR_SYS_BUSY = 204;

    protected onInit()
    {
    }

    //注册子游戏定制错误处理  参数为errnoid, netData   返回true表示继续入队列 false丢弃协议
    public registErrorHandler(key:number, callback:Function)
    {
        this.errorHandlerMap[key] = callback;
    }

    public clear()
    {
        this.errorHandlerMap = {}
    }

    public handleSysError(netData)
    {
        if(netData._errno == null)
            return true;
        //上报enter异常
        if(netData._param && netData._param._cmd == Game.Command.Enter && Game.Control.enterData != null  && netData._errno == this.ERROR_SYS_BUSY)
        {
            let content:any = {}
            content.enter = Game.Control.enterData;
            content.error = netData;
            Global.ReportTool.ReportClientError("EnterError", content);
        }

        let handler = this.getErrorHandler(netData._errno);
        if(handler)
            return handler(netData._errno, netData);
        
        this.defultErrorHandler(netData._errno, netData._errstr);
    }


    public handleCmdError(netData)
    {
        if(netData._param._errno == null)
            return true;

        //上报enter异常
        if(netData._param && netData._param._cmd == Game.Command.Enter && Game.Control.enterData != null && netData._param._errno == this.ERROR_SYS_BUSY)
        {
            let content:any = {}
            content.enter = Game.Control.enterData;
            content.error = netData;
            Global.ReportTool.ReportClientError("EnterError", content);
        }
        
        let handler = this.getErrorHandler(netData._param._errno);
        if(handler)
            return handler(netData._param._errno, netData);
        
        this.defultErrorHandler(netData._param._errno, netData._param._errstr);
    }


    public handleLogicError(netData)
    {
        if(netData._param._para == null || netData._param._para._errno == null)
            return true;
        
        //上报enter异常
        if(netData._param&& netData._param._cmd == Game.Command.Enter && Game.Control.enterData != null && netData._param._para._errno == this.ERROR_SYS_BUSY)
        {
            let content:any = {}
            content.enter = Game.Control.enterData;
            content.error = netData;
            Global.ReportTool.ReportClientError("EnterError", content);
        }

        let handler = this.getErrorHandler(netData._param._para._errno);
        if(handler)
            return handler(netData._param._para._errno, netData);
        
        this.defultErrorHandler(netData._param._para._errno, netData._param._para._errstr);
    }


    private getErrorHandler(key)
    {
        return this.errorHandlerMap[key];
    }

    //服务器errno是唯一的
    private defultErrorHandler(errno, errorStr)
    {
        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
        Game.Control.stopCheckMsgTimer();
        //pvp直接回选场  pve重新进游戏
        if(errno == this.ERROR_NOT_IN_TABLE)
        {
            // this.server.stopGame();
            this.server.clearData();
            Game.Event.event(Game.EVENT_NOT_IN_TABLE);
            return;
        }
        if(errno == this.ERROR_LOW_LIMIT)
        {
            this.server.stopGame();
            Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);
            
            Global.Toolkit.showMoneyNotEnough();
            return
        }

        //1000以下error默认退出
        if(errno < 1000)
        {
            this.server.stopGame();
            let errFunc = ()=>{Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);}
            let err = cc.js.formatStr("%s[%s]",errorStr,errno)
            Global.UI.showSingleBox(err, errFunc, errFunc);
            return;
        }

        if(errorStr && errorStr != "")
        {
            
           // Global.UI.fastTip(errorStr+"["+errno+"]");
            Global.UI.fastTip(errorStr+"");
            return;
        }
    }

}