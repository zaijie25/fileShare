import { ServerUrl } from "../../../logic/core/setting/ServerRoutes";

export default interface IDNS
{
    //初始化 用来设置账号等基础信息
    init(cfg:any);
    //设置要使用DNS的接口
    requestHosts(urls:[], callback:any, syncMode:boolean);
    //获取IP
    getIp(host:string,ipAreaType:number);

    //返回http请求信息
    getHttpRequestDNSInfo(url,ipAreaType:number);

    getHttpDNSInfo(url:ServerUrl);

    //定时器更新，暂定5秒更新一次
    update(time);
}

export class DNSInfo
{
    //最终请求的url
    public realUrl;
    public host;
    //使用的ip
    public ip;
    //头部信息
    public headerMap;
    //port
    public port;
}