import IDNS, { DNSInfo } from "./IDNS";
import WangsuDNS from "./WangsuDns";
import OldVersionDNS from "./OldVersionDNS";
import AliDNS from "./AliDNS";
import { ServerUrl } from "../../../logic/core/setting/ServerRoutes";

export enum DNSTYPE {
    None = 0,
    OldVersion = 1,
    Wangsu = 2,
    Ali = 3,
}
export default class DNSControl {
    private DNSType = DNSTYPE.None;

    private checkInerval = 5000;
    private timeID = null;

    public DNS: IDNS;

    //等待模式  需要等到ip返回才能出发回调
    public syncMode = false;

    //默认为网宿 同步模式
    // public DNSConfig = {type:2, syncMode:1};
    //如果默认为ALi 需要配置对应参数
    public DNSConfig = { type: 3, accountId: "151925", syncMode: 1 }

    public selfDNSMap = {}


    //更新DNS配置  下次重启生效
    public setDNSConfg(cfg) {
        if (cfg == null && cfg.type == null)
            return;
        Global.Setting.storage.setObject("DNSConfig", cfg);
    }

    private loadDNSConfig() {
        let cfg = Global.Setting.storage.getObject("DNSConfig");
        if (cfg == null)
        {
            Logger.error("loadDNSConfig config = null")
            return;
        }
        this.DNSConfig = cfg;

    }


    public init() {
        this.loadDNSConfig();
        //同步等待模式  配置为1为同步等待
        if (this.DNSConfig && this.DNSConfig.syncMode)
            this.syncMode = this.DNSConfig.syncMode == 1;
        let dnsType = this.DNSConfig.type
        this.DNSType = dnsType ? Number(dnsType) : 0;
        //网页版不开启DNS
        if (!cc.sys.isNative)
            this.DNSType = DNSTYPE.None;
        this.DNS = this.createDns();

        Logger.error("DNS config", JSON.stringify(this.DNSConfig))
        Logger.error("DNS Type is ", this.DNSType)
        Logger.error("DNS syncMode is ", this.syncMode)
        
        if (this.DNS) {
            this.DNS.init(this.DNSConfig);
            this.startTimer();
        }
    }

    private startTimer() {
        clearInterval(this.timeID);
        this.timeID = setInterval(() => {
            if (this.DNS)
                this.DNS.update(this.checkInerval / 1000);
        }, this.checkInerval);
    }

    private createDns() {
        switch (this.DNSType) {
            case DNSTYPE.Wangsu:
                return new WangsuDNS()
            case DNSTYPE.OldVersion:
                return new OldVersionDNS();
            case DNSTYPE.None:
                return null;
            case DNSTYPE.Ali:
                return new AliDNS();
            default:
                Logger.error("找不到DNS类型！！！！", this.DNSType)
                this.DNSType = DNSTYPE.None;
        }
    }

    //请求开关
    public requestHosts(hosts, callback) {
        Logger.error("requestHosts", hosts, this.DNSType, this.syncMode);
        hosts = this.filterSelfDNS(hosts);
        if (this.DNSType == DNSTYPE.None || this.DNS == null) {
            if (callback)
                callback();
            return;
        }
        this.DNS.requestHosts(hosts, callback, this.syncMode);
    }


    public getIp(host, ipAreaType = 0) {
        //先检查内部dns列表
        if (this.selfDNSMap[host])
            return this.selfDNSMap[host];
        if (this.DNSType == DNSTYPE.None)
            return null;
        return this.DNS.getIp(host, ipAreaType);
    }

    public getHttpRequestDNSInfo(url:ServerUrl, ipAreaType = 0): DNSInfo {
        Logger.log("getHttpRequestDNSInfo before " + url.printSelf())
        let dnsInfo = this.getSelfDNSInfo(url)
        if (dnsInfo != null){
            Logger.log("getHttpRequestDNSInfo dnsInfo != null")
            return dnsInfo;
        }
        if (this.DNSType == DNSTYPE.None || this.DNS == null){
            Logger.log("getHttpRequestDNSInfo DNSType == null")
            return null;
        }
        dnsInfo = this.DNS.getHttpDNSInfo(url)
        Logger.log("getHttpRequestDNSInfo after " + url.printSelf())
        return dnsInfo
    }

    private getSelfDNSInfo(url:ServerUrl){
        if (url.address == url.addressHost && url.addressHost == url.realHost){
            Logger.log("getSelfDNSInfo address == addressHost")
            return;
        }
        let isIpAddress = Global.UrlUtil.checkIsIp(url.address)
        let isRealHostIpAddress = Global.UrlUtil.checkIsIp(url.realHost)
        if (!isIpAddress && !isRealHostIpAddress){
            Logger.log("getSelfDNSInfo address && realHost is not ip")
            return ;
        }
        let requestInfo = new DNSInfo();
        if (isRealHostIpAddress){
            url.address = url.realHost
        }
        
        requestInfo.ip = url.address;
        requestInfo.host = url.addressHost
        requestInfo.port = url.port;
        let headerMap = { "Host": url.addressHost }
        if (url.cerPath){
            headerMap["CertPath"] = url.cerPath
        }
        requestInfo.headerMap = headerMap
        return requestInfo
    }


    private filterSelfDNS(hosts) {
        let realHost = [];
        for (let i = 0; i < hosts.length; i++) {
            if (!this.selfDNSMap[hosts[i]])
                realHost.push(hosts[i]);
        }
        return realHost;
    }


    //预处理盾
    public dealDunRoute(serverUrl:ServerUrl,lo_port,lo_type){
        Logger.error("dealDunRoute serverurl ,lo_port,lo_type " , serverUrl.printSelf(),lo_port,lo_type)
        if (!lo_type || !lo_port){
            return serverUrl;
        }
        let isSupport = Global.AppDun.checkAppIsSupportDunByType(lo_type)
        if (!isSupport){
            Logger.error("App not support dun = " + lo_type)
            return serverUrl;
        }

        let isDunInit = Global.AppDun.getDunIsInitByType(lo_type)
        let ipPortInfo = Global.AppDun.getServerIPAndPort(serverUrl.realHost,lo_port,lo_type,serverUrl.attr)
        if (lo_port && lo_port > 0 && isDunInit && ipPortInfo) {
            let serverIp = ipPortInfo.ip
            let serverPort = ipPortInfo.port
            if (!serverIp || !serverPort){
                Logger.error("dealDunRoute serverIp == null || serverPort == null ")
                return serverUrl;
            }
            serverUrl.lo_type = lo_type
            let address = serverUrl.address
            if (this.checkIsSelfDnsUrl(address)) {
                let array = address.split("...");
                if (array.length < 2) {
                    Logger.error("dealDunRoute array < 2")
                    return serverUrl;
                }
                let host = array[1]
                if (host) {
                    serverUrl.address = serverIp
                    serverUrl.port = serverPort
                    serverUrl.addressHost = host
                    // url = serverIp + ":" + serverPort + "..." + host
                    Logger.error("dealDunRoute isSelfDnsUrl = true  host != null " + serverUrl.printSelf())
                    
                } else {
                    Logger.error("... host = null")
                    // url = serverIp + ":" + serverPort
                    serverUrl.address = serverIp
                    serverUrl.port = serverPort

                    Logger.error("dealDunRoute isSelfDnsUrl = true  host == null" + serverUrl.printSelf())
                    
                }
            } else {
                // let host = url
                // url = serverIp + ":" + serverPort + "..." + host
                serverUrl.address = serverIp
                serverUrl.port = serverPort
                Logger.error("dealDunRoute isSelfDnsUrl = false  " + serverUrl.printSelf())
            }
        }
        return serverUrl
    }

    public dealSelfRoute(serverUrl:ServerUrl){
        let address_url = serverUrl.address
        if (this.checkIsSelfDnsUrl(address_url)) {
            let array = address_url.split("...");
            if (array.length < 2) {
                Logger.error("dealSelfRoute array < 2")
                return serverUrl;
            }
            let address = array[0]
            let addressHost = array[1]
            let addressPort = Global.UrlUtil.getPortFromUrl(address)
            serverUrl.address = address
            // Logger.error("dealSelfRoute address = " + address)
            // Logger.error("dealSelfRoute addressHost = " + addressHost)
            // Logger.error("dealSelfRoute addressPort = " + addressPort)

            if (addressPort){
                serverUrl.port = addressPort
                let addressUrl = Global.UrlUtil.getHostFromUrl(address)
                serverUrl.address = addressUrl
                serverUrl.realHost = addressHost

            }else {
                let isAddressIP = Global.UrlUtil.checkIsIp(address)
                if (!isAddressIP){
                    serverUrl.realHost = address
                }else {
                    serverUrl.realHost = addressHost
                }
                
            }
            serverUrl.addressHost = addressHost
            
        } 
    }

    // //预处理域名 
    // public dealSelfDNSRoute(url, lo_port,lo_type) {
    //     // Logger.error("dealSelfDNSRoute url = " + url)
    //     // Logger.error("dealSelfDNSRoute lo_port = " + lo_port)
    //     // Logger.error("dealSelfDNSRoute lo_type = " + lo_type)
    //     if (!lo_type || !lo_port){
    //         return url;
    //     }
    //     let isSupport = Global.AppDun.checkAppIsSupportDunByType(lo_type)
    //     if (!isSupport){
    //         Logger.error("App not support dun = " + lo_type)
    //         return url;
    //     }

    //     let isDunInit = Global.AppDun.getDunIsInitByType(lo_type)
    //     let ipPortInfo = Global.AppDun.getServerIPAndPort(url,lo_port,lo_type)
    //     if (lo_port && lo_port > 0 && isDunInit && ipPortInfo) {
    //         let serverIp = ipPortInfo.ip
    //         let serverPort = ipPortInfo.port
    //         if (!serverIp || !serverPort){
    //             Logger.error("dealSelfDNSRoute serverIp == null || serverPort == null ")
    //             return url;
    //         }
    //         if (this.checkIsSelfDnsUrl(url)) {
    //             let array = url.split("...");
    //             if (array.length < 2) {
    //                 Logger.error("dealSelfDNSRoute array < 2")
    //                 return url;
    //             }
    //             let host = array[1]
    //             if (host) {
    //                 url = serverIp + ":" + serverPort + "..." + host
    //             } else {
    //                 Logger.error("... host = null")
    //                 url = serverIp + ":" + serverPort
    //             }
    //         } else {
    //             let host = url
    //             url = serverIp + ":" + serverPort + "..." + host
    //         }
    //     }
    //     // Logger.error("dealSelfDNSRoute url = " + url)
    //     return url;
    // }

    //ip...host
    private checkIsSelfDnsUrl(url: string) {
        //不可能等于0
        return url.indexOf("...") > 0;
    }

}