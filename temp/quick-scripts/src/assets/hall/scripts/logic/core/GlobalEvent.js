"use strict";
cc._RF.push(module, '69a5fGjAjpARKM0zk9nYGDy', 'GlobalEvent');
// hall/scripts/logic/core/GlobalEvent.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 本地全局广播名称定义
 */
var GlobalEvent = /** @class */ (function () {
    function GlobalEvent() {
    }
    /**
     * 记录进入子游戏时候游戏列表位置
     */
    GlobalEvent.RecordGameListOffsetX = "RecordGameListOffsetX";
    /**
    * 玩家信息更新
    */
    GlobalEvent.PERSONALINFOUPDATE = "PERSONALINFOUPDATE";
    /**
    * 玩家是否可领取vip升级金额
    */
    GlobalEvent.ISVIPREWARD = "ISVIPREWARD";
    /**
     * 有可领取升级金额
     */
    GlobalEvent.VIPREWARD = "VIPREWARD";
    /**
         * vip发生改变
         */
    GlobalEvent.CHANGEVIP = "CHANGEVIP";
    GlobalEvent.UPDATEVIPDATA = "UPDATEVIPDATA";
    /**
     * 开启红点
     */
    GlobalEvent.ShowRedSpot = "ShowRedSpot";
    /**
     * 开启大厅红包按钮
     */
    GlobalEvent.ShowHallRed = "ShowHallRed";
    /**
     * 开启红点
     */
    GlobalEvent.CloseRedSpot = "CloseRedSpot";
    /**
     * 大厅关闭更多游戏
     */
    GlobalEvent.CloseMoreGame = "CloseMoreGame";
    /**
    * vip玩家进场消息通知
    */
    GlobalEvent.TYPE_VIP_ENTER_GAME = "TYPE_VIP_ENTER_GAME";
    /**
* 私人推送
*/
    GlobalEvent.TYPE_PRIVATE_MARQUEE = "TYPE_PRIVATE_MARQUEE";
    /**
     * vip玩家进场消息通知子游戏
     */
    GlobalEvent.VIPADMISSION = "VIPADMISSION";
    /**
     * 普通跑马灯消息更新
     */
    GlobalEvent.MARQUEESCROLL_COMMON = "MARQUEESCROLL_COMMON";
    /**
     * VIP返利马灯消息更新
     */
    GlobalEvent.MARQUEESCROLL_VIP = "MARQUEESCROLL_VIP";
    /**
     * 领取佣金马灯消息更新
     */
    GlobalEvent.MARQUEESCROLL_COMMI = "MARQUEESCROLL_COMMI";
    /**
     * 大赢家跑马灯消息更新
     */
    GlobalEvent.MARQUEESCROLL_BIGWINNER = "MARQUEESCROLL_BIGWINNER";
    /**
     * 绑定手机成功
     */
    GlobalEvent.BINDPHONESUCCEED = "BINDPHONESUCCEED";
    /**
     * 修改银行密码成功
     */
    // public static BANK_CHANGE_PWD_SUCCEED: string = "BANK_CHANGE_PWD_SUCCEED";
    //显示网络请求界面
    GlobalEvent.SHOW_NET_WAITING = "SHOW_NET_WAITING";
    GlobalEvent.HIDE_NET_WAITING = "HIDE_NET_WAITING";
    //强制关闭网络请求界面
    GlobalEvent.FORCE_HIDE_WAITING = "FORCE_HIDE_WAITING";
    //更新重连次数
    GlobalEvent.UPDATE_RECONNECT_COUNT = "UPDATE_RECONNECT_COUNT";
    //刷新游戏列表
    GlobalEvent.UPDATE_GAME_LIST = "UPDATE_GAME_LIST";
    //子游戏更新相关
    GlobalEvent.UPDATE_SUB_GAME_PERCENT = "UPDATE_SUB_GAME_PERCENT";
    GlobalEvent.UPDATE_SUB_GAME_FINISH = "UPDATE_SUB_GAME_FINISH";
    GlobalEvent.UPDATE_SUB_GAME_FAILED = "UPDATE_SUB_GAME_FAILED";
    GlobalEvent.POP_NOTICE = "POP_NOTICE";
    //大厅onopen打开
    GlobalEvent.ON_HALL_OPEN = "ON_HALL_OPEN";
    // 返利弹窗
    GlobalEvent.POP_REBAATE = "POP_REBAATE";
    // 绑定弹窗
    GlobalEvent.POP_BIND_GIFT = "POP_BIND_GIFT";
    // 绑定手机弹窗
    GlobalEvent.POP_BIND_PHONE = "POP_BIND_PHONE";
    GlobalEvent.SHOW_SPREAD_NODE = "SHOW_SPREAD_NODE";
    //百度包状态变更
    GlobalEvent.UPDATE_BAIDU_STATE = "UPDATE_BAIDU_STATE";
    /**彩票 tab重新拉取*/
    GlobalEvent.LotteryUpdateTab = "Lottery.LotteryUpdateOrder";
    /**彩票 cfg重新拉取*/
    GlobalEvent.LotteryUpdateCfg = "Lottery.LotteryUpdateCfg";
    /**彩票 odds重新拉取*/
    GlobalEvent.LotteryUpdateOdds = "Lottery.LotteryUpdateOdds";
    /**彩票 开奖售卖信息*/
    GlobalEvent.LotteryUpdateGameData = "Lottery.LotteryUpdateGameData";
    /**彩票 开奖历史*/
    GlobalEvent.LotteryUpdateResult = "Lottery.LotteryUpdateResult";
    /**彩票 订单重新拉取*/
    GlobalEvent.LotteryUpdateOrder = "Lottery.LotteryUpdateOrder";
    //刷新大厅心跳网络延时
    GlobalEvent.RefreshHallNetCost = "RefreshHallNetCost";
    //刷新游戏心跳网络延时
    GlobalEvent.RefreshGameNetCost = "RefreshGameNetCost";
    //skinconfig 加载完成事件
    GlobalEvent.SkinConfigLoadFinish = "SkinConfigLoadFinish";
    //盾初始化完成
    GlobalEvent.DunInitFinish = "DunInitFinish";
    //打开webview game
    GlobalEvent.OpenWebViewGame = "OpenWebViewGame";
    GlobalEvent.CloseWebViewGame = "closeWebViewGame";
    // 大厅加载子游戏选场 按钮关闭
    GlobalEvent.OnCloseGameLobby = "OnCloseGameLobby";
    GlobalEvent.OnGotoGameScene = "OnGotoGameScene";
    //web 界面适配
    GlobalEvent.WebResize = "WebResize";
    //web 外接子游戏上分
    GlobalEvent.WebUpPoint = "WebUpPoint";
    //web 外接子游戏下分
    GlobalEvent.WebDownPoint = "WebDownPoint";
    //web widget适配
    GlobalEvent.WebWidgetResize = "WebWidgetResize";
    /**
     * 刷新游戏下载状态
     */
    GlobalEvent.UPDATE_SUB_GAME_STATE = "UPDATE_SUB_GAME_STATE";
    /**隐藏限时首充返利倒计时 */
    GlobalEvent.TimeLimitedRechargeStatusChange = "TimeLimitedRechargeStatusChange";
    return GlobalEvent;
}());
exports.default = GlobalEvent;

cc._RF.pop();