export default class SystemTimeManager{
    // 静态成员instance
    static instance = null;
    // 私有构造函数
    private constructor(){}

    private heartTime:number = (new Date()).getTime();
    private diffServerTime:number = 0;
    private diffServerCount:number = 1;
    public static getInstance(){
        if(SystemTimeManager.instance == null){
            SystemTimeManager.instance = new SystemTimeManager();
        }
        return SystemTimeManager.instance;
    }
    //获取服务器时间
    public getServerTime():number {
        let nowTime:number = (new Date()).getTime();
        return nowTime + SystemTimeManager.instance.getDiffTime();
    }
    //获取本地时间，每次发送心跳的时候
    public getLocalTime() {
    SystemTimeManager.instance.heartTime = (new Date()).getTime();
    return SystemTimeManager.instance.heartTime;
  }
    //获取本地时间与服务器的时间差
    public getDiffTime() {
    return SystemTimeManager.instance.diffServerTime;
  }
  // 消息发送时上报给服务器的localid
    public randomBit() {
    let result:number = 0;
    let nowTime = (new Date()).getTime();
    let difTime = SystemTimeManager.instance.getDiffTime() * 1000;
    result = ((nowTime + difTime * 1000) * 1000);
    return result;
  }
    //收到心跳以后计算本地时间与服务器的时间差,取最小差值
    public setServerTime(serverTime) {
    var diffTime = serverTime - SystemTimeManager.instance.heartTime;
    SystemTimeManager.instance.diffServerTime = (SystemTimeManager.instance.diffServerTime == 0) ? diffTime : SystemTimeManager.instance.diffServerTime;
    SystemTimeManager.instance.diffServerTime = Math.abs(diffTime) < Math.abs(SystemTimeManager.instance.diffServerTime) ? diffTime : SystemTimeManager.instance.diffServerTime;
    SystemTimeManager.instance.diffServerCount = 1;
  }
}