import EventDispatcher from "./framework/event/EventDispatcher";
import FsmManager from "./framework/fsm/FsmManager";
import HttpProxy from "./framework/net/http/HttpProxy";
import DataHelper from "../hall/scripts/helper/DataHelper";
import GlobalGameData from "../hall/scripts/defines/GlobalGameData";
import HallServer from "../hall/scripts/logic/core/net/hall/HallServer";
import ResourceManager from "../hall/scripts/framework/resource/ResourceManager";
import ModelManager from "../hall/scripts/framework/model/ModelMananger";
import ConfigManager from "../hall/scripts/framework/config/ConfigManager";
import SectionManager from "../hall/scripts/framework/section/SectionManager";
import UIManager from "../hall/scripts/logic/core/ui/UIManager";
import SceneManager from "../hall/scripts/logic/core/scene/SceneManager";
import NativeEvent from "../hall/scripts/framework/native/NatvieEvent";
import ComponentProvider from "../hall/scripts/logic/core/component/ComponentProvider";
import Setting from "../hall/scripts/logic/core/setting/Setting";
import Toolkit from "../hall/scripts/logic/core/tool/Toolkit";
import HotUpdateManager from "../hall/scripts/logic/core/hotUpdate/HotUpdateManager";
import PlayerData from "../hall/scripts/logic/hallcommon/data/PlayerData";
import GameData from "../hall/scripts/logic/hallcommon/data/GameData";
import GongGaoData from "../hall/scripts/logic/hallcommon/data/GongGaoData";
import Language from "../hall/scripts/logic/core/tool/Language";
import TweenManager from "../hall/scripts/logic/core/game/TweenManager";
import GameServer from "../hall/scripts/logic/core/game/GameServer";
import GameCommand from "../hall/scripts/logic/core/game/CommandDefine";
import GameControl from "../hall/scripts/logic/core/game/GameControl";
import GameContext from "../hall/scripts/logic/core/game/data/GameContext";
import { LoadingState } from "../hall/scripts/logic/core/ui/WndBase";
import UIHelper from "../hall/scripts/logic/core/tool/UIHelper";
import AudioManager from "../hall/scripts/framework/audio/AudioManager";
import { SceneType } from "../hall/scripts/logic/core/scene/BaseScene";
import ActivityToggle from "../hall/scripts/logic/hall/ui/hall/ActivityToggle";
import ChatServer from "../hall/scripts/logic/core/net/chat/ChatServer";
import { ReportTool } from "../hall/scripts/logic/core/tool/ReportTool";
import NativeJSBBridge from "../hall/scripts/framework/native/NativeJSBBridge";
import AppDunControl from "../hall/scripts/framework/net/dun/AppDunControl";
import DNSControl from "../hall/scripts/framework/net/dns/DNSControl";
import CustomAppInfo from "../hall/scripts/logic/hallcommon/app/CustomApp";
import PersistHelper from "../hall/scripts/logic/core/tool/PersisitHelpper";
import { JSUtil } from "../hall/scripts/logic/core/tool/JSUtil";
import GamePreloadTool from "../hall/scripts/logic/core/game/GamePreloadTool";
import SearchPathHelper from "../hall/scripts/logic/core/tool/SearchPathHelper"
import WebViewControl from "../hall/scripts/logic/core/component/WebViewControl";
import WebNative from "../hall/scripts/framework/native/WebNative";
import GameWebView from "../hall/scripts/framework/native/GameWebView";
import { UrlUtil } from "../hall/scripts/logic/core/tool/UrlUtil";
import { ChannelUtil } from "../hall/scripts/logic/core/tool/ChannelUtil";
import AppUpdateHelper from "../hall/scripts/logic/core/tool/AppUpdateHelper";
import { AESUtil } from "../hall/scripts/logic/core/tool/AESUtil";
import DunHotUpdateUrlSetting from "../hall/scripts/logic/core/setting/DunHotUpdateUrlSetting";
import UIUtil from "../hall/scripts/logic/core/tool/UIUtil";

declare global {
    declare class Global {
        static Event: EventDispatcher;
        static FsmManager: FsmManager;
        static Http: HttpProxy;
        static Toolkit: Toolkit;
        static UIHelper: UIHelper;
        static Setting: Setting;
        static HallServer: HallServer;
        static ResourceManager: ResourceManager;
        static Audio: AudioManager;

        static ModelManager: ModelManager;
        static ConfigManager: ConfigManager;
        static SectionManager: SectionManager;
        static UI: UIManager;
        static UIHelper: UIHelper;
        static SceneManager: SceneManager;
        static NativeEvent: NativeEvent;
        static WebNative: WebNative;
        static GameWebView: GameWebView;
        static WebViewControl: WebViewControl;
        static HotUpdateManager: HotUpdateManager;
        static SearchPathHelper: SearchPathHelper;

        static ReportTool: ReportTool;

        static Component: ComponentProvider;

        static Language: Language;

        static customApp: CustomAppInfo

        static PlayerData: PlayerData;
        static GameData: GameData;
        static GongGaoData: GongGaoData;
        static Persist: PersistHelper;
        static ActivityToggle: ActivityToggle;
        static ChatServer: ChatServer;
        public static DNS: DNSControl;
        public static NativeJSBBridge: NativeJSBBridge
        public static AppDun: AppDunControl;
        public static JSUtil: JSUtil;
        public static UrlUtil: UrlUtil
        public static UIUtil:UIUtil
        public static ChannelUtil:ChannelUtil
        public static AESUtil:AESUtil
        public static AppUpdateHelper :AppUpdateHelper
        public static DunHotUpdateUrlSetting:DunHotUpdateUrlSetting

        static setup();

        static onUpdate();

        static onLateUpdate();


    }

    declare enum LogLevel {
        None = 0,
        Log = 0x01,
        Warn = 0x02,
        Info = 0x04,
        Error = 0x08,
        All = 0xff,
    }

    declare class Logger {
        static logLevel: LogLevel;
        static logEnable: boolean;

        static logObj(obj, ...args);
        static log(...args);
        static warn(...args);
        static error(...args);
    }

    declare class Game {
        DataHelper: DataHelper;
        GlobalGameData: GlobalGameData;

        //加时间锁
        public static EVENT_ADDTIMELOCK = "EVENT_ADDTIMELOCK";
        //加手动锁
        public static EVENT_ADDMANUALLOCK = "EVENT_ADDMANUALLOCK";
        //手动解锁
        public static EVENT_REMOVELOCK = "EVENT_REMOVELOCK";
        //游戏网络接通
        public static EVENT_SOCKET_OPEN = "EVENT_SOCKET_OPEN";

        //手动插入数据协议
        public static EVENT_UNSHFIT_MSGLIST = "EVENT_UNSHFIT_MSGLIST";

        public static EVENT_SOCKET_CLOSE = "EVENT_SOCKET_CLOSE";  //游戏socket关闭
        public static EVENT_SOCKET_ERROR = "EVENT_SOCKET_ERROR";  //游戏socket异常
        public static EVENT_SOCKET_RECONNECT = "EVENT_SOCKET_RECONNECT";  //游戏重连通知
        public static EVENT_CALL_RECONNECT = "EVENT_CALL_RECONNECT";  //游戏重连通知
        public static EVENT_SOCKET_RESUME = "EVENT_SOCKET_RESUME";

        //强制退出游戏  常用与网络异常
        public static EVENT_FORCE_LEAVE_GAME = "EVENT_FORCE_LEAVE_GAME";
        //不在桌上 对应901错误
        public static EVENT_NOT_IN_TABLE = "EVENT_NOT_IN_TABLE";

        //子游戏内显示自定义messagebox
        public static EVENT_MESSAGE_BOX = "EVENT_MESSAGE_BOX";

        // 通知子游戏匹配玩家中
        public static EVENT_MATCH_PLAYER = "EVENT_MATCH_PLAYER";

        // 拉霸游戏socket连上通知
        public static EVENT_LABA_CONNECT = "EVENT_LABA_CONNECT";


        public static Event: EventDispatcher;
        public static Component: ComponentProvider;
        public static Tween: TweenManager;
        public static Server: GameServer;
        public static Command: GameCommand;
        public static Control: GameControl;
        public static Context: any;
        //负责大厅与子游戏数据共享，数据通信
        public static DataBridge: any;
        public static GamePreloadTool: GamePreloadTool;
        //子游戏全局管理器
        public static Entry: any;
        public static setup();

        static onUpdate();

        static onLateUpdate();
    }

    declare class ViewSet {
        public registView(key: string, view: any)
        public getView(key: string)
        public getViewEx<T>(key): T
        public callView(key: string, func: string, ...args)
        public callAll(func: string, ...args)
    }

    //Pvp用座位转换
    declare class PVPSitHelper {
        public selfSvrSit: number;
        public maxPlayerNum: number;
        public localSitToViewSitMap;
        public init(serverSit: number, maxPlayerNum: number, map: any = {})
        public clear()
        public getSelfServerSeat(): number
        public getSelfServerSeatS(): string
        public serverToLocal(svrSeat: number)
        public localToView(localSeat)
        public localToServer(localSeat: number)
        public serverSToLocalN(svrSeatStr: number): number
        public localNToServerS(localToServer: number): string
        public serverSeatStrToNum(serverSeatStr: string): number
        private getSelfViewSeat()
    }

    //通用pvp玩家数据
    declare class PVPPlayerData {
        public nickname: string; // 姓名
        public point: number; // point
        public headimg: string; //
        public sit: number;//座位号
        public chair: number;//服务器座位号
        public in_game = false;
        public isEmpty = true;
        public headkuang: number
        public enterPoint: number;  // 房间入场携带上限
        area: string;
        constructor(sit: number)
        //设置数据（enter)
        setInfo(serverInfo)
        //刷新货币和in_game(refresh)
        refresh(msg)
        //清理  (leave)
        clear()
    }

    declare class EventDispatcher {
        hasListener(type)
        on(type: string, caller, method: Function, args?)
        once(type: string, caller, method: Function, args?)
        off(type: string, caller, method: Function, onceOnly = false)
        offAll(type: string)
        offAllByCaller(caller: any)
        event(type: string, ...args)
    }

    declare interface IAnimWnd {
        //是否正在播放动画
        isRuningAnim: boolean;
        //动画播放完成
        openAnimFinish();

        //动画播完一帧后回调
        afterAnimFinish();
        //关闭动画完成
        closeAnimFinish();
    }

    declare class HeadTipsManager {
        public static preloadRes();
        public init(headTipsRoot: cc.Node, playRoot: cc.Node, isNeedHeadInfo: boolean);
        public setConfig(sChair: number);
        public showHeadView(isShow: boolean, localSeat: number, worldPos: cc.Vec3, data: any)
        public updatePoint(localSeat: number, point: any);
        public playAct(key: string, fWPos: cc.Vec3, tWPos: cc.Vec3, localSeat: number);
        public clearOneOwner(owner: string);
        public clearByGame();
    }

    declare class TaskManager {
        /** 设置任务宝箱功能是否开放 */
        public static setTaskEnable(flag: boolean);
        /** 预加载 */
        public static preloadRes();
        /**
         * 初始化
         * @param rootNode 根节点
         * @param gameId 游戏id
         * @param dir 方向 -1向左 1向右
         */
        public init(rootNode: cc.Node, gameId: number, dir: number);
        public reqGetGameTaskList();
        public reqGetCommisionInfo();
        public startReqTimer();
        /** 退出场景时调用 */
        public onDispose();
    }

    declare class NetAppface {
        public static mod = "appface";
        //获取玩家信息
        public static GetUserInfo = "GetUserInfo";
        //获取玩家金币信息
        public static GetUserPoint = "GetUserPoint";
        //修改玩家信息
        public static EditUserInfo = "EditUserInfo";
        public static EditPwd = "EditPwd";
        public static BindPhone = "BindPhone";
        public static SetSelfCfg = "SetSelfCfg";
        //获取游戏服务器信息
        public static GetGameRoute = "GetGameRoute";

        public static QuaryState = "QueryState";

        //获取配置
        public static GetConfig = "GetConfig";

        //请求这个VIP等级奖励是否领取
        public static CheckVipReward = "CheckVipReward"
        //领取VIP等级奖励
        public static ReciveVipReward = "ReciveVipReward"

        //提现
        public static GetBankInfo = "GetBankInfo";      //获取提现账号信息 1银行 2支付宝
        public static BindBankInfo = "BindBankInfo";    //绑定提现账号信息 1银行 2支付宝
        public static ApplyCash = "ApplyCash";          //提现            1银行 2支付宝
        public static ApplyCashList = "ApplyCashList";  //提现记录
        public static GetAllPutList = "GetAllPutList";  //所有玩家提现记录

        //新的充值接口
        public static GetNewPayConfig = "GetNewPayConfig";
        // 充值
        public static GetPayConfig = "GetPayConfig";                // 获取充值配置
        public static GetUserPayList = "GetUserPayList";            // 获取充值历史记录
        public static GetAllPayPutList = "GetAllPayPutList";        // 获取玩家充值展示
        public static UserDownPay = "UserNewDownPay";                  //在线充值生成订单
        public static GetDownPayUrl = "GetUserDownPayData";         // 在线充值订单支付url
        public static UserUnionPay = "UserNewUnionPay";                // 生成用户转账订单
        public static UserNewDownPayAttach = "UserNewDownPayAttach"; //通知服务器获取orderStr，放到了原生来做

        // 返利
        public static GetFlowBackCommi = "GetFlowBackCommi";        // 获取返佣定档
        public static GetFlowBackRecord = "GetFlowBackRecord";      // 流水返佣记录
        public static GetFlowBackPoint = "GetFlowBackPoint";        // 领取流水返利

        //银行
        public static LoginBank = "LoginBank";          //登录银行
        public static SetBankPwd = "SetBankPwd";        //修改密码
        public static ForgetBankPwd = "ForgetBankPwd";  //忘记密码
        public static DealBankPoint = "DealBankPoint";  //存取钱

        //排行榜
        public static GetPointRank = "GetPointRank";

        //消息
        public static GetMsgList = "GetMsgList";
        public static ReadMsg = "ReadMsg";
        public static DelMail = "DelMail";

        //反馈
        public static GetProblem = "GetProblem";
        public static SetProblem = "SetProblem";

        //全民推广
        public static GetAgentShare = "GetAgentShare";
        //我的团队
        public static GetTeamInfo = "GetTeamInfo";
        //我的团队成员列表
        public static GetTeamInfoList = "GetTeamInfoList"
        //查询我的团队用户信息
        public static QueryTeamUser = "QueryTeamUser"
        //佣金明细
        public static GetCommiInfo = "GetCommiInfo"
        //佣金明细列表
        public static GetCommiInfoList = "GetCommiInfoList"
        //业绩查询
        public static GetFlowInfoList = "GetFlowInfoList"
        //佣金定档
        public static GetAgentCommi = "GetAgentCommi"

        /**我的推广 */
        public static GetSelfShare = "GetSelfShare";
        /**我的推广无限代*/
        public static GetDayAgentShare = "GetDayAgentShare";
        /**绑定邀请码 */
        public static BindPid = "BindPid";
        /**领取记录 */
        public static GetSelfReadRecord = "GetSelfReadRecord";
        /**佣金表 */
        public static GetDayAgentCommi = "GetDayAgentCommi";
        /**领取记录无限代 */
        public static GetDayAgentRecord = "GetDayAgentRecord";
        /**领取奖励 */
        public static GetSelfRead = "GetSelfRead";
        /**领取奖励无限代 */
        public static GetDayAgent = "GetDayAgent";
        /**我的团队 */
        public static GetSelfTeam = "GetSelfTeam";
        /**我的团队无限代 */
        public static GetDayAgentTeamInfo = "GetDayAgentTeamInfo";
        /**查询下级 */
        public static SeachSelfTeam = "SeachSelfTeam";
        /**查询下级（无限代） */
        public static SeachSelfTeamUser = "SeachSelfTeamUser";
        /**奖励明细 */
        public static GetSendRecord = "GetSendRecord";
        /**业绩查询 */
        public static GetDayFlowInfoList = "GetDayFlowInfoList";

        public static PostIpInfo = "PostIpInfo";
        /** 客户端上报统计数据——当日首次下载游戏人数 */
        public static PostInstallGameInfo = "PostInstallGameInfo";
        //获取活动列表
        public static GetActivityCfg = "GetActivityCfg";
        //领取活动奖励
        public static ReceiveActivityAward = "ReceiveActivityAward";

        //请求
        public static GetUserShareUrl = "GetUserShareUrl";


        //---------------------------------------------------彩金池相关begin-------------------------------------------//
        public static dynamicSvr = "dynamicSvr";
        public static GetPotPoint = "GetPotPoint"; //获取彩金相关信息
        public static GetPotRecord = "GetPotRecord"; //获取彩金记录
        //---------------------------------------------------彩金池相关end-------------------------------------------//

        //每日返利领取记录
        public static GetDayFlowBackRecord = "GetDayFlowBackRecord";
        //领取每日返利
        public static GetDayFlowBack = "GetDayFlowBack";

        //上报openInstall
        public static PostInstallApp = "PushAppInstall";

        public static GetGameList = "GetGameList"

        //获取日周月配置信息
        public static GetDailyGiftMoneyCfg = "GetDailyGiftMoneyCfg";
        //领取礼金
        public static DoDailyGiftMoney = "DoDailyGiftMoney";
    }

    /**
     * 本地全局广播名称定义
     */
    declare class GlobalEvent {
        /**
         * 记录进入子游戏时候游戏列表位置
         */
        public static setCopypostion: string = "setCopypostion";
        public static RecordGameListOffsetX: string = "RecordGameListOffsetX";
        /**
         * 玩家信息更新
         */
        public static PERSONALINFOUPDATE: string = "PERSONALINFOUPDATE";

        /**
         * 开启红点
         */
        public static ShowRedSpot: string = "ShowRedSpot";

        /**
        * 开启红点
        */
        public static CloseRedSpot: string = "CloseRedSpot";
        /**
         * 开启大厅红包按钮
         */
        public static ShowHallRed: string = "ShowHallRed";
        /**
         * 普通跑马灯消息更新
         */
        public static MARQUEESCROLL_COMMON: string = "MARQUEESCROLL_COMMON";

        /**
         * 大赢家跑马灯消息更新
         */
        public static MARQUEESCROLL_BIGWINNER: string = "MARQUEESCROLL_BIGWINNER";

        /**
        * VIP返利马灯消息更新
        */
        public static MARQUEESCROLL_VIP: string = "MARQUEESCROLL_VIP";



        /**
         * 领取佣金马灯消息更新
         */
        public static MARQUEESCROLL_COMMI: string = "MARQUEESCROLL_COMMI";
        /**
         * 绑定手机成功
         */
        public static BINDPHONESUCCEED: string = "BINDPHONESUCCEED";


        //显示网络请求界面
        public static SHOW_NET_WAITING: string = "SHOW_NET_WAITING";
        public static HIDE_NET_WAITING: string = "HIDE_NET_WAITING";
        //强制关闭网络请求界面
        public static FORCE_HIDE_WAITING: string = "FORCE_HIDE_WAITING";

        //更新重连次数
        public static UPDATE_RECONNECT_COUNT: string = "UPDATE_RECONNECT_COUNT";
        //刷新游戏列表
        public static UPDATE_GAME_LIST: string = "UPDATE_GAME_LIST";
        //子游戏更新相关
        public static UPDATE_SUB_GAME_PERCENT = "UPDATE_SUB_GAME_PERCENT";
        public static UPDATE_SUB_GAME_FINISH = "UPDATE_SUB_GAME_FINISH";
        public static UPDATE_SUB_GAME_FAILED = "UPDATE_SUB_GAME_FAILED";

        //公告弹出
        public static POP_NOTICE = "POP_NOTICE";
        public static POP_REBAATE = "POP_REBAATE";
        public static SHOW_SPREAD_NODE = "SHOW_SPREAD_NODE";

        /**彩票 tab重新拉取*/
        public static LotteryUpdateTab = "Lottery.LotteryUpdateOrder";
        /**彩票 cfg重新拉取*/
        public static LotteryUpdateCfg = "Lottery.LotteryUpdateCfg";
        /**彩票 odds重新拉取*/
        public static LotteryUpdateOdds = "Lottery.LotteryUpdateOdds";
        /**彩票 开奖售卖信息*/
        public static LotteryUpdateGameData = "Lottery.LotteryUpdateGameData";
        /**彩票 开奖历史*/
        public static LotteryUpdateResult = "Lottery.LotteryUpdateResult";
        /**彩票 订单重新拉取*/
        public static LotteryUpdateOrder = "Lottery.LotteryUpdateOrder";

        //百度包状态变更
        public static UPDATE_BAIDU_STATE = "UPDATE_BAIDU_STATE";

        //刷新大厅心跳网络延时
        public static RefreshHallNetCost = "RefreshHallNetCost";
        //刷新游戏心跳网络延时
        public static RefreshGameNetCost = "RefreshGameNetCost";
        //skinconfig 加载完成事件
        public static SkinConfigLoadFinish = "SkinConfigLoadFinish";

        //盾初始化完成
        public static DunInitFinish = "DunInitFinish";
        //打开webview game
        public static OpenWebViewGame = "OpenWebViewGame"
        public static CloseWebViewGame = "closeWebViewGame"

        public static OnGotoGameScene = "OnGotoGameScene";
        public static OnCloseGameLobby = "OnCloseGameLobby";

        /**
        * vip玩家进场消息通知
        */
        public static TYPE_VIP_ENTER_GAME: string = "TYPE_VIP_ENTER_GAME"
        /**
         * vip玩家进场消息通知子游戏
         */
        public static VIPADMISSION: string = "VIPADMISSION"
        /**
         * 玩家是否可领取vip升级金额
         */
        public static ISVIPREWARD: string = "ISVIPREWARD"
        /**
         * 有可领取升级金额
         */
        public static VIPREWARD: string = "VIPREWARD"
        /**
         * vip发生改变
         */
        public static CHANGEVIP: string = "CHANGEVIP"

        public static UPDATE_SUB_GAME_STATE = "UPDATE_SUB_GAME_STATE";

        /**隐藏限时首充返利倒计时 */

        public static TimeLimitedRechargeStatusChange = "TimeLimitedRechargeStatusChange"
    }

}

