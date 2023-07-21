//游戏通用协议定义
//每个子游戏对应一个子游戏命令定义

export default class GameCommand
{
    public HeartBeat = "*he1*";  //心跳
    public GameCfg = "*a*";   //游戏配置
    public Session = "*sss*";  
    public Enter = "*en1*";
    public Leave = "*lee*";
    
    // enter 前的匹配
    public WaitMatch = "wait_match";
}