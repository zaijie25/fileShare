export enum LogLevel
{
    None = 0,
    Log = 0x01,
    Warn = 0x02,
    Net = 0x04,
    Error = 0x08,
    All = 0xff,
}

export class Logger 
{
    public static logLevel:LogLevel = LogLevel.All;
    public static logEnable = true;

    public static logObj(obj, ...args)
    {
        let logger = console.log || cc.log;
        if(this.logEnable && this.logLevel & LogLevel.Log)
        {
            logger.call(this, this.getLogContent(args), obj);
        }
    }

    public static log(...args)
    {
        let logger = console.log || cc.log;
        if(this.logEnable && this.logLevel & LogLevel.Log)
        {
            logger.call(this, this.getLogContent(args));
        }
    }

    public static warn(...args)
    {
        let logger = console.warn || cc.warn;
        if(this.logEnable && this.logLevel & LogLevel.Warn)
        {
            logger.call(this, this.getLogContent(args));
        }
    }

    public static net(...args)
    {
        let logger = console.log || cc.log;
        if(this.logEnable && this.logLevel & LogLevel.Net)
        {
            logger.call(this, this.getLogContent(args));
        }
    }

    public static error(...args)
    {
        let logger = console.error || cc.error;
        if(this.logEnable && this.logLevel & LogLevel.Error)
        {
            logger.call(this, this.getLogContent(args));
        }
    }

    private static getLogContent(args:any[])
    {
        for(let i = args.length - 1; i >=0 ; i--)
        {
            if(typeof(args[i]) != "string" && typeof(args[i]) != "number")
            {
                cc.error("getLogContent error !!! can not push object !!!");
                args.splice(i, 1);
            }
        }
        let content =  this.getDateStr()  + args.join("\t,"); 
        return content;
    }

    private static  getDateStr()
    {
        var d = new Date();
        var str = d.getHours().toString();
        var timeStr = "";
        timeStr += (str.length==1? "0"+str : str) + ":";
        str = d.getMinutes().toString();
        timeStr += (str.length==1? "0"+str : str) + ":";
        str = d.getSeconds().toString();
        timeStr += (str.length==1? "0"+str : str) + ":";
        str = d.getMilliseconds().toString();
        if( str.length==1 ) str = "00"+str;
        if( str.length==2 ) str = "0"+str;
        timeStr += str;
    
        timeStr = "[" + timeStr + "]";
        return timeStr;
    }
}