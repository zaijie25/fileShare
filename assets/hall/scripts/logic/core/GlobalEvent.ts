/**
 * 本地全局广播名称定义
 */
export default class GlobalEvent {
    /**
     * 记录进入子游戏时候游戏列表位置
     */
    public static RecordGameListOffsetX: string = "RecordGameListOffsetX";
    /**
    * 玩家信息更新
    */
    public static PERSONALINFOUPDATE: string = "PERSONALINFOUPDATE";
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


    public static UPDATEVIPDATA: string = "UPDATEVIPDATA"

    /**
     * 开启红点
     */
    public static ShowRedSpot: string = "ShowRedSpot";
    /**
     * 开启大厅红包按钮
     */
    public static ShowHallRed: string = "ShowHallRed";
    /**
     * 开启红点
     */
    public static CloseRedSpot: string = "CloseRedSpot";
    /**
     * 大厅关闭更多游戏
     */
    public static CloseMoreGame: string = "CloseMoreGame";


    /**
    * vip玩家进场消息通知
    */
    public static TYPE_VIP_ENTER_GAME: string = "TYPE_VIP_ENTER_GAME"
        /**
    * 私人推送
    */
   public static TYPE_PRIVATE_MARQUEE: string = "TYPE_PRIVATE_MARQUEE"
    /**
     * vip玩家进场消息通知子游戏
     */
    public static VIPADMISSION: string = "VIPADMISSION";

    /**
     * 普通跑马灯消息更新
     */

    public static MARQUEESCROLL_COMMON: string = "MARQUEESCROLL_COMMON";

    /**
     * VIP返利马灯消息更新
     */
    public static MARQUEESCROLL_VIP: string = "MARQUEESCROLL_VIP";



    /**
     * 领取佣金马灯消息更新
     */
    public static MARQUEESCROLL_COMMI: string = "MARQUEESCROLL_COMMI";

    /**
     * 大赢家跑马灯消息更新
     */
    public static MARQUEESCROLL_BIGWINNER: string = "MARQUEESCROLL_BIGWINNER";
    /**
     * 绑定手机成功
     */
    public static BINDPHONESUCCEED: string = "BINDPHONESUCCEED";
    /**
     * 修改银行密码成功
     */
    // public static BANK_CHANGE_PWD_SUCCEED: string = "BANK_CHANGE_PWD_SUCCEED";


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

    public static POP_NOTICE = "POP_NOTICE";

    //大厅onopen打开
    public static ON_HALL_OPEN = "ON_HALL_OPEN";

    // 返利弹窗
    public static POP_REBAATE = "POP_REBAATE";

    // 绑定弹窗
    public static POP_BIND_GIFT = "POP_BIND_GIFT";

    // 绑定手机弹窗
    public static POP_BIND_PHONE = "POP_BIND_PHONE";


    public static SHOW_SPREAD_NODE = "SHOW_SPREAD_NODE";

    //百度包状态变更
    public static UPDATE_BAIDU_STATE = "UPDATE_BAIDU_STATE";

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

    // 大厅加载子游戏选场 按钮关闭
    public static OnCloseGameLobby = "OnCloseGameLobby";
    public static OnGotoGameScene = "OnGotoGameScene";

    //web 界面适配
    public static WebResize = "WebResize"
    //web 外接子游戏上分
    public static WebUpPoint = "WebUpPoint"
    //web 外接子游戏下分
    public static WebDownPoint = "WebDownPoint"
    //web widget适配
    public static WebWidgetResize = "WebWidgetResize";

    /**
     * 刷新游戏下载状态
     */
    public static UPDATE_SUB_GAME_STATE = "UPDATE_SUB_GAME_STATE";


    /**隐藏限时首充返利倒计时 */

    public static TimeLimitedRechargeStatusChange = "TimeLimitedRechargeStatusChange"

}