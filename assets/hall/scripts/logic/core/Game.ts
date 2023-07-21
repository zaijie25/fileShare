import EventDispatcher from "../../framework/event/EventDispatcher";
import ComponentProvider from "./component/ComponentProvider";
import TweenManager from "./game/TweenManager";
import GameServer from "./game/GameServer";
import GameCommand from "./game/CommandDefine";
import GameControl from "./game/GameControl";
import DataBridge from "./game/data/DataBridge";
import GamePreloadTool from "./game/GamePreloadTool";

//游戏公共逻辑入口
export default class Game
{
    //游戏内通用事件
    public static EVENT_ADDTIMELOCK = "EVENT_ADDTIMELOCK";   //时间锁  到时间自动解锁
    public static EVENT_ADDMANUALLOCK = "EVENT_ADDMANUALLOCK";  //手动锁，需要手动解锁  或者等待超时
    public static EVENT_REMOVELOCK = "EVENT_REMOVELOCK";    //解锁消息
    //游戏网络接通
    public static EVENT_SOCKET_OPEN = "EVENT_SOCKET_OPEN";  //游戏socket链接
    public static EVENT_SOCKET_CLOSE = "EVENT_SOCKET_CLOSE";  //游戏socket关闭
    public static EVENT_SOCKET_ERROR = "EVENT_SOCKET_ERROR";  //游戏socket异常
    public static EVENT_SOCKET_RECONNECT = "EVENT_SOCKET_RECONNECT";  //游戏重连通知
    public static EVENT_CALL_RECONNECT = "EVENT_CALL_RECONNECT";  //游戏内部强制重连
    public static EVENT_SOCKET_RESUME = "EVENT_SOCKET_RESUME";  //从后台切回来后事件  参数：切后台时间。

    //插入消息到队列头部
    public static EVENT_UNSHFIT_MSGLIST = "EVENT_UNSHFIT_MSGLIST";


    //强制退出游戏  常用与网络异常
    public static EVENT_FORCE_LEAVE_GAME = "EVENT_FORCE_LEAVE_GAME";
    //不在桌上 对应901错误
    public static EVENT_NOT_IN_TABLE = "EVENT_NOT_IN_TABLE";
    // 通知子游戏匹配玩家中
    public static EVENT_MATCH_PLAYER = "EVENT_MATCH_PLAYER";

    //设置大厅选场点击场次的回调
    public static EVENT_SETINTOGAME_FUN = "EVENT_SETINTOGAME_FUN";

    // 拉霸游戏socket连上通知
    public static EVENT_LABA_CONNECT = "EVENT_LABA_CONNECT";


    //子游戏内显示自定义messagebox
    public static EVENT_MESSAGE_BOX = "EVENT_MESSAGE_BOX";


    public static Event:EventDispatcher;
    public static Component:ComponentProvider;
    public static Tween:TweenManager;
    public static Server:GameServer;
    public static Command:GameCommand;
    //游戏链接管理
    public static Control:GameControl;

    //游戏运行时数据  每个子游戏定制
    public static Context:any;

    //子游戏全局节点   
    public static Entry:any;

    public static DataBridge:any;
    public static GamePreloadTool: GamePreloadTool;


    public static setup()
    {
        this.Command = new GameCommand();
        this.Event = new EventDispatcher();
        this.Component = new ComponentProvider("GameDriver");
        this.Component.setup(this.onUpdate.bind(this), this.onLateUpdate.bind(this));
        this.Tween = new TweenManager();
        this.Tween.setup();
        this.Server = new GameServer();
        this.Server.setup();
        this.Control = new GameControl();
        this.Control.setup();
        this.DataBridge = new DataBridge();
        this.GamePreloadTool = new GamePreloadTool();
    }

    public static onUpdate(dt)
    {
        this.Tween.onUpdate(dt);
        this.Server.onUpdate(dt);
    }

    public static onLateUpdate()
    {}
    
}