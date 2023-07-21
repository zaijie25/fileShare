export default interface IDun {
    //初始化 用来设置账号等基础信息
    init(cfg: any);

    //获取是否成功初始化
    isInit();

    //获取初始化状态
    getInitState();

    //检测配置是否有效
    checkCfgIsValid(cfg: any);

    //获取ip和端口
    getServerIPAndPort(host: string, lo_port: number,attr:any);

    //App是否支持
    isAppSupport();
}