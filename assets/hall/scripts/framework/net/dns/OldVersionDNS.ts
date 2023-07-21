import IDNS from "./IDNS";

export default class OldVersionDNS implements IDNS
{
    public init(cfg)
    {}

    public requestHosts(hosts:[], callback, syncMode)
    {
        if((!syncMode && callback) || !Global.Setting.useHttpDNS)
        {
            callback();
            callback = null;
        }
        if(Global.Setting.useHttpDNS)
            Global.NativeEvent.startRequest(hosts, callback);
    }

    //老版本发送协议时不需要处理
    public getHttpRequestDNSInfo(url)
    {
        return null;
    }

    public getHttpDNSInfo(url){
        return null
    }

    public getIp(host:string)
    {
        return null;
    }

    public update(time)
    {}
}