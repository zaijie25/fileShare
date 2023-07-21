import IDNS, { DNSInfo } from "./IDNS";
import { ServerUrl } from "../../../logic/core/setting/ServerRoutes";

export default class AliDNS implements IDNS
{
    public init(cfg)
    {
        Global.NativeEvent.initAlicloudHttpDns(cfg.accountId)
    }

    public requestHosts(hosts:[], callback, syncMode)
    {
        //Ali的接口不确定ip是否已经返回
        Global.NativeEvent.setPreResolveHosts(JSON.stringify(hosts), null)
        if(callback)
            callback();
    }

    //老版本发送协议时不需要处理
    public getHttpRequestDNSInfo(url)
    {
        let host = Global.UrlUtil.getHostFromUrl(url);
        let ip = this.getIp(host);
        if(ip == "" || ip == null || ip == host)
            return null;
        Logger.error("host ip is ", ip)
        url = url.replace(host, ip);
        let dnsInfo = new DNSInfo()
        dnsInfo.realUrl = url;
        dnsInfo.ip = ip;
        dnsInfo.host = host;
        dnsInfo.headerMap = {"Host":host};
        return dnsInfo;
    }

    public getHttpDNSInfo(url:ServerUrl){
        let host = url.realHost
        let addressHost = url.addressHost
        let ip = this.getIp(host);
        if(ip == "" || ip == null || ip == host)
        {
            //如果是自定义域名，则host走自定义域名
            if (addressHost != host){
                url.address = host
                let dnsInfo = new DNSInfo()
                dnsInfo.ip = ip;
                dnsInfo.host = addressHost;
                let headerMap = { "Host": url.addressHost }
                 if (url.cerPath){
                    headerMap["CertPath"] = url.cerPath
                }
                dnsInfo.headerMap = headerMap
                return dnsInfo;
            }
            return null;
        }
            
        Logger.error("host ip is ", ip)
        // url = url.replace(host, ip);
        url.address = ip
        let dnsInfo = new DNSInfo()
        // dnsInfo.realUrl = url;
        dnsInfo.ip = ip;
        dnsInfo.host = addressHost;
        let headerMap = { "Host": url.addressHost }
        if (url.cerPath){
            headerMap["CertPath"] = url.cerPath
        }
        dnsInfo.headerMap = headerMap
        return dnsInfo;
    }

    public getIp(host:string)
    {
        let ips = null;
        Global.NativeEvent.getIpsByHostAsync(host, (retObj)=>{
                if(retObj && retObj.funcParam != null && retObj.funcParam != "")
                {
                    try
                    {
                        ips = JSON.parse(retObj.funcParam);
                    }
                    catch(e)
                    {
                    }
                }
        })
        Logger.error("return value", JSON.stringify(ips));
        if(ips == null || ips.length == 0)
            return null;
        let randIndex = Math.floor(Math.random() * ips.length);
        Logger.error("ips info" , ips.length,randIndex)
        return ips[randIndex];
    }

    public update(time)
    {}
}