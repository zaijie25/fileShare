
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/GlobalEvent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXEdsb2JhbEV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSDtJQUFBO0lBK0tBLENBQUM7SUE5S0c7O09BRUc7SUFDVyxpQ0FBcUIsR0FBVyx1QkFBdUIsQ0FBQztJQUN0RTs7TUFFRTtJQUNZLDhCQUFrQixHQUFXLG9CQUFvQixDQUFDO0lBQ2hFOztNQUVFO0lBQ1ksdUJBQVcsR0FBVyxhQUFhLENBQUE7SUFDakQ7O09BRUc7SUFDVyxxQkFBUyxHQUFXLFdBQVcsQ0FBQTtJQUM3Qzs7V0FFTztJQUNPLHFCQUFTLEdBQVcsV0FBVyxDQUFBO0lBRy9CLHlCQUFhLEdBQVcsZUFBZSxDQUFBO0lBRXJEOztPQUVHO0lBQ1csdUJBQVcsR0FBVyxhQUFhLENBQUM7SUFDbEQ7O09BRUc7SUFDVyx1QkFBVyxHQUFXLGFBQWEsQ0FBQztJQUNsRDs7T0FFRztJQUNXLHdCQUFZLEdBQVcsY0FBYyxDQUFDO0lBQ3BEOztPQUVHO0lBQ1cseUJBQWEsR0FBVyxlQUFlLENBQUM7SUFHdEQ7O01BRUU7SUFDWSwrQkFBbUIsR0FBVyxxQkFBcUIsQ0FBQTtJQUM3RDs7RUFFRjtJQUNXLGdDQUFvQixHQUFXLHNCQUFzQixDQUFBO0lBQ2xFOztPQUVHO0lBQ1csd0JBQVksR0FBVyxjQUFjLENBQUM7SUFFcEQ7O09BRUc7SUFFVyxnQ0FBb0IsR0FBVyxzQkFBc0IsQ0FBQztJQUVwRTs7T0FFRztJQUNXLDZCQUFpQixHQUFXLG1CQUFtQixDQUFDO0lBSTlEOztPQUVHO0lBQ1csK0JBQW1CLEdBQVcscUJBQXFCLENBQUM7SUFFbEU7O09BRUc7SUFDVyxtQ0FBdUIsR0FBVyx5QkFBeUIsQ0FBQztJQUMxRTs7T0FFRztJQUNXLDRCQUFnQixHQUFXLGtCQUFrQixDQUFDO0lBQzVEOztPQUVHO0lBQ0gsNkVBQTZFO0lBRzdFLFVBQVU7SUFDSSw0QkFBZ0IsR0FBVyxrQkFBa0IsQ0FBQztJQUM5Qyw0QkFBZ0IsR0FBVyxrQkFBa0IsQ0FBQztJQUM1RCxZQUFZO0lBQ0UsOEJBQWtCLEdBQVcsb0JBQW9CLENBQUM7SUFFaEUsUUFBUTtJQUNNLGtDQUFzQixHQUFXLHdCQUF3QixDQUFDO0lBRXhFLFFBQVE7SUFDTSw0QkFBZ0IsR0FBVyxrQkFBa0IsQ0FBQztJQUM1RCxTQUFTO0lBQ0ssbUNBQXVCLEdBQUcseUJBQXlCLENBQUM7SUFDcEQsa0NBQXNCLEdBQUcsd0JBQXdCLENBQUM7SUFDbEQsa0NBQXNCLEdBQUcsd0JBQXdCLENBQUM7SUFFbEQsc0JBQVUsR0FBRyxZQUFZLENBQUM7SUFFeEMsWUFBWTtJQUNFLHdCQUFZLEdBQUcsY0FBYyxDQUFDO0lBRTVDLE9BQU87SUFDTyx1QkFBVyxHQUFHLGFBQWEsQ0FBQztJQUUxQyxPQUFPO0lBQ08seUJBQWEsR0FBRyxlQUFlLENBQUM7SUFFOUMsU0FBUztJQUNLLDBCQUFjLEdBQUcsZ0JBQWdCLENBQUM7SUFHbEMsNEJBQWdCLEdBQUcsa0JBQWtCLENBQUM7SUFFcEQsU0FBUztJQUNLLDhCQUFrQixHQUFHLG9CQUFvQixDQUFDO0lBRXhELGVBQWU7SUFDRCw0QkFBZ0IsR0FBRyw0QkFBNEIsQ0FBQztJQUM5RCxlQUFlO0lBQ0QsNEJBQWdCLEdBQUcsMEJBQTBCLENBQUM7SUFDNUQsZ0JBQWdCO0lBQ0YsNkJBQWlCLEdBQUcsMkJBQTJCLENBQUM7SUFDOUQsY0FBYztJQUNBLGlDQUFxQixHQUFHLCtCQUErQixDQUFDO0lBQ3RFLFlBQVk7SUFDRSwrQkFBbUIsR0FBRyw2QkFBNkIsQ0FBQztJQUNsRSxjQUFjO0lBQ0EsOEJBQWtCLEdBQUcsNEJBQTRCLENBQUM7SUFHaEUsWUFBWTtJQUNFLDhCQUFrQixHQUFHLG9CQUFvQixDQUFDO0lBQ3hELFlBQVk7SUFDRSw4QkFBa0IsR0FBRyxvQkFBb0IsQ0FBQztJQUV4RCxtQkFBbUI7SUFDTCxnQ0FBb0IsR0FBRyxzQkFBc0IsQ0FBQztJQUM1RCxRQUFRO0lBQ00seUJBQWEsR0FBRyxlQUFlLENBQUM7SUFFOUMsZ0JBQWdCO0lBQ0YsMkJBQWUsR0FBRyxpQkFBaUIsQ0FBQTtJQUNuQyw0QkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQTtJQUVuRCxpQkFBaUI7SUFDSCw0QkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQztJQUN0QywyQkFBZSxHQUFHLGlCQUFpQixDQUFDO0lBRWxELFVBQVU7SUFDSSxxQkFBUyxHQUFHLFdBQVcsQ0FBQTtJQUNyQyxhQUFhO0lBQ0Msc0JBQVUsR0FBRyxZQUFZLENBQUE7SUFDdkMsYUFBYTtJQUNDLHdCQUFZLEdBQUcsY0FBYyxDQUFBO0lBQzNDLGNBQWM7SUFDQSwyQkFBZSxHQUFHLGlCQUFpQixDQUFDO0lBRWxEOztPQUVHO0lBQ1csaUNBQXFCLEdBQUcsdUJBQXVCLENBQUM7SUFHOUQsaUJBQWlCO0lBRUgsMkNBQStCLEdBQUcsaUNBQWlDLENBQUE7SUFFckYsa0JBQUM7Q0EvS0QsQUErS0MsSUFBQTtrQkEvS29CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog5pys5Zyw5YWo5bGA5bm/5pKt5ZCN56ew5a6a5LmJXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHbG9iYWxFdmVudCB7XHJcbiAgICAvKipcclxuICAgICAqIOiusOW9lei/m+WFpeWtkOa4uOaIj+aXtuWAmea4uOaIj+WIl+ihqOS9jee9rlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFJlY29yZEdhbWVMaXN0T2Zmc2V0WDogc3RyaW5nID0gXCJSZWNvcmRHYW1lTGlzdE9mZnNldFhcIjtcclxuICAgIC8qKlxyXG4gICAgKiDnjqnlrrbkv6Hmga/mm7TmlrBcclxuICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFBFUlNPTkFMSU5GT1VQREFURTogc3RyaW5nID0gXCJQRVJTT05BTElORk9VUERBVEVcIjtcclxuICAgIC8qKlxyXG4gICAgKiDnjqnlrrbmmK/lkKblj6/pooblj5Z2aXDljYfnuqfph5Hpop1cclxuICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIElTVklQUkVXQVJEOiBzdHJpbmcgPSBcIklTVklQUkVXQVJEXCJcclxuICAgIC8qKlxyXG4gICAgICog5pyJ5Y+v6aKG5Y+W5Y2H57qn6YeR6aKdXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVklQUkVXQVJEOiBzdHJpbmcgPSBcIlZJUFJFV0FSRFwiXHJcbiAgICAvKipcclxuICAgICAgICAgKiB2aXDlj5HnlJ/mlLnlj5hcclxuICAgICAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgQ0hBTkdFVklQOiBzdHJpbmcgPSBcIkNIQU5HRVZJUFwiXHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgVVBEQVRFVklQREFUQTogc3RyaW5nID0gXCJVUERBVEVWSVBEQVRBXCJcclxuXHJcbiAgICAvKipcclxuICAgICAqIOW8gOWQr+e6oueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFNob3dSZWRTcG90OiBzdHJpbmcgPSBcIlNob3dSZWRTcG90XCI7XHJcbiAgICAvKipcclxuICAgICAqIOW8gOWQr+Wkp+WOhee6ouWMheaMiemSrlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFNob3dIYWxsUmVkOiBzdHJpbmcgPSBcIlNob3dIYWxsUmVkXCI7XHJcbiAgICAvKipcclxuICAgICAqIOW8gOWQr+e6oueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIENsb3NlUmVkU3BvdDogc3RyaW5nID0gXCJDbG9zZVJlZFNwb3RcIjtcclxuICAgIC8qKlxyXG4gICAgICog5aSn5Y6F5YWz6Zet5pu05aSa5ri45oiPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgQ2xvc2VNb3JlR2FtZTogc3RyaW5nID0gXCJDbG9zZU1vcmVHYW1lXCI7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiB2aXDnjqnlrrbov5vlnLrmtojmga/pgJrnn6VcclxuICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRZUEVfVklQX0VOVEVSX0dBTUU6IHN0cmluZyA9IFwiVFlQRV9WSVBfRU5URVJfR0FNRVwiXHJcbiAgICAgICAgLyoqXHJcbiAgICAqIOengeS6uuaOqOmAgVxyXG4gICAgKi9cclxuICAgcHVibGljIHN0YXRpYyBUWVBFX1BSSVZBVEVfTUFSUVVFRTogc3RyaW5nID0gXCJUWVBFX1BSSVZBVEVfTUFSUVVFRVwiXHJcbiAgICAvKipcclxuICAgICAqIHZpcOeOqeWutui/m+Wcuua2iOaBr+mAmuefpeWtkOa4uOaIj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFZJUEFETUlTU0lPTjogc3RyaW5nID0gXCJWSVBBRE1JU1NJT05cIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaZrumAmui3kemprOeBr+a2iOaBr+abtOaWsFxyXG4gICAgICovXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBNQVJRVUVFU0NST0xMX0NPTU1PTjogc3RyaW5nID0gXCJNQVJRVUVFU0NST0xMX0NPTU1PTlwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVklQ6L+U5Yip6ams54Gv5raI5oGv5pu05pawXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgTUFSUVVFRVNDUk9MTF9WSVA6IHN0cmluZyA9IFwiTUFSUVVFRVNDUk9MTF9WSVBcIjtcclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6aKG5Y+W5L2j6YeR6ams54Gv5raI5oGv5pu05pawXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgTUFSUVVFRVNDUk9MTF9DT01NSTogc3RyaW5nID0gXCJNQVJRVUVFU0NST0xMX0NPTU1JXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlpKfotaLlrrbot5Hpqaznga/mtojmga/mm7TmlrBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBNQVJRVUVFU0NST0xMX0JJR1dJTk5FUjogc3RyaW5nID0gXCJNQVJRVUVFU0NST0xMX0JJR1dJTk5FUlwiO1xyXG4gICAgLyoqXHJcbiAgICAgKiDnu5HlrprmiYvmnLrmiJDlip9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBCSU5EUEhPTkVTVUNDRUVEOiBzdHJpbmcgPSBcIkJJTkRQSE9ORVNVQ0NFRURcIjtcclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS56ZO26KGM5a+G56CB5oiQ5YqfXHJcbiAgICAgKi9cclxuICAgIC8vIHB1YmxpYyBzdGF0aWMgQkFOS19DSEFOR0VfUFdEX1NVQ0NFRUQ6IHN0cmluZyA9IFwiQkFOS19DSEFOR0VfUFdEX1NVQ0NFRURcIjtcclxuXHJcblxyXG4gICAgLy/mmL7npLrnvZHnu5zor7fmsYLnlYzpnaJcclxuICAgIHB1YmxpYyBzdGF0aWMgU0hPV19ORVRfV0FJVElORzogc3RyaW5nID0gXCJTSE9XX05FVF9XQUlUSU5HXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIEhJREVfTkVUX1dBSVRJTkc6IHN0cmluZyA9IFwiSElERV9ORVRfV0FJVElOR1wiO1xyXG4gICAgLy/lvLrliLblhbPpl63nvZHnu5zor7fmsYLnlYzpnaJcclxuICAgIHB1YmxpYyBzdGF0aWMgRk9SQ0VfSElERV9XQUlUSU5HOiBzdHJpbmcgPSBcIkZPUkNFX0hJREVfV0FJVElOR1wiO1xyXG5cclxuICAgIC8v5pu05paw6YeN6L+e5qyh5pWwXHJcbiAgICBwdWJsaWMgc3RhdGljIFVQREFURV9SRUNPTk5FQ1RfQ09VTlQ6IHN0cmluZyA9IFwiVVBEQVRFX1JFQ09OTkVDVF9DT1VOVFwiO1xyXG5cclxuICAgIC8v5Yi35paw5ri45oiP5YiX6KGoXHJcbiAgICBwdWJsaWMgc3RhdGljIFVQREFURV9HQU1FX0xJU1Q6IHN0cmluZyA9IFwiVVBEQVRFX0dBTUVfTElTVFwiO1xyXG4gICAgLy/lrZDmuLjmiI/mm7TmlrDnm7jlhbNcclxuICAgIHB1YmxpYyBzdGF0aWMgVVBEQVRFX1NVQl9HQU1FX1BFUkNFTlQgPSBcIlVQREFURV9TVUJfR0FNRV9QRVJDRU5UXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFVQREFURV9TVUJfR0FNRV9GSU5JU0ggPSBcIlVQREFURV9TVUJfR0FNRV9GSU5JU0hcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgVVBEQVRFX1NVQl9HQU1FX0ZBSUxFRCA9IFwiVVBEQVRFX1NVQl9HQU1FX0ZBSUxFRFwiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgUE9QX05PVElDRSA9IFwiUE9QX05PVElDRVwiO1xyXG5cclxuICAgIC8v5aSn5Y6Fb25vcGVu5omT5byAXHJcbiAgICBwdWJsaWMgc3RhdGljIE9OX0hBTExfT1BFTiA9IFwiT05fSEFMTF9PUEVOXCI7XHJcblxyXG4gICAgLy8g6L+U5Yip5by556qXXHJcbiAgICBwdWJsaWMgc3RhdGljIFBPUF9SRUJBQVRFID0gXCJQT1BfUkVCQUFURVwiO1xyXG5cclxuICAgIC8vIOe7keWumuW8ueeql1xyXG4gICAgcHVibGljIHN0YXRpYyBQT1BfQklORF9HSUZUID0gXCJQT1BfQklORF9HSUZUXCI7XHJcblxyXG4gICAgLy8g57uR5a6a5omL5py65by556qXXHJcbiAgICBwdWJsaWMgc3RhdGljIFBPUF9CSU5EX1BIT05FID0gXCJQT1BfQklORF9QSE9ORVwiO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFNIT1dfU1BSRUFEX05PREUgPSBcIlNIT1dfU1BSRUFEX05PREVcIjtcclxuXHJcbiAgICAvL+eZvuW6puWMheeKtuaAgeWPmOabtFxyXG4gICAgcHVibGljIHN0YXRpYyBVUERBVEVfQkFJRFVfU1RBVEUgPSBcIlVQREFURV9CQUlEVV9TVEFURVwiO1xyXG5cclxuICAgIC8qKuW9qeelqCB0YWLph43mlrDmi4nlj5YqL1xyXG4gICAgcHVibGljIHN0YXRpYyBMb3R0ZXJ5VXBkYXRlVGFiID0gXCJMb3R0ZXJ5LkxvdHRlcnlVcGRhdGVPcmRlclwiO1xyXG4gICAgLyoq5b2p56WoIGNmZ+mHjeaWsOaLieWPliovXHJcbiAgICBwdWJsaWMgc3RhdGljIExvdHRlcnlVcGRhdGVDZmcgPSBcIkxvdHRlcnkuTG90dGVyeVVwZGF0ZUNmZ1wiO1xyXG4gICAgLyoq5b2p56WoIG9kZHPph43mlrDmi4nlj5YqL1xyXG4gICAgcHVibGljIHN0YXRpYyBMb3R0ZXJ5VXBkYXRlT2RkcyA9IFwiTG90dGVyeS5Mb3R0ZXJ5VXBkYXRlT2Rkc1wiO1xyXG4gICAgLyoq5b2p56WoIOW8gOWlluWUruWNluS/oeaBryovXHJcbiAgICBwdWJsaWMgc3RhdGljIExvdHRlcnlVcGRhdGVHYW1lRGF0YSA9IFwiTG90dGVyeS5Mb3R0ZXJ5VXBkYXRlR2FtZURhdGFcIjtcclxuICAgIC8qKuW9qeelqCDlvIDlpZbljoblj7IqL1xyXG4gICAgcHVibGljIHN0YXRpYyBMb3R0ZXJ5VXBkYXRlUmVzdWx0ID0gXCJMb3R0ZXJ5LkxvdHRlcnlVcGRhdGVSZXN1bHRcIjtcclxuICAgIC8qKuW9qeelqCDorqLljZXph43mlrDmi4nlj5YqL1xyXG4gICAgcHVibGljIHN0YXRpYyBMb3R0ZXJ5VXBkYXRlT3JkZXIgPSBcIkxvdHRlcnkuTG90dGVyeVVwZGF0ZU9yZGVyXCI7XHJcblxyXG5cclxuICAgIC8v5Yi35paw5aSn5Y6F5b+D6Lez572R57uc5bu25pe2XHJcbiAgICBwdWJsaWMgc3RhdGljIFJlZnJlc2hIYWxsTmV0Q29zdCA9IFwiUmVmcmVzaEhhbGxOZXRDb3N0XCI7XHJcbiAgICAvL+WIt+aWsOa4uOaIj+W/g+i3s+e9kee7nOW7tuaXtlxyXG4gICAgcHVibGljIHN0YXRpYyBSZWZyZXNoR2FtZU5ldENvc3QgPSBcIlJlZnJlc2hHYW1lTmV0Q29zdFwiO1xyXG5cclxuICAgIC8vc2tpbmNvbmZpZyDliqDovb3lrozmiJDkuovku7ZcclxuICAgIHB1YmxpYyBzdGF0aWMgU2tpbkNvbmZpZ0xvYWRGaW5pc2ggPSBcIlNraW5Db25maWdMb2FkRmluaXNoXCI7XHJcbiAgICAvL+ebvuWIneWni+WMluWujOaIkFxyXG4gICAgcHVibGljIHN0YXRpYyBEdW5Jbml0RmluaXNoID0gXCJEdW5Jbml0RmluaXNoXCI7XHJcblxyXG4gICAgLy/miZPlvIB3ZWJ2aWV3IGdhbWVcclxuICAgIHB1YmxpYyBzdGF0aWMgT3BlbldlYlZpZXdHYW1lID0gXCJPcGVuV2ViVmlld0dhbWVcIlxyXG4gICAgcHVibGljIHN0YXRpYyBDbG9zZVdlYlZpZXdHYW1lID0gXCJjbG9zZVdlYlZpZXdHYW1lXCJcclxuXHJcbiAgICAvLyDlpKfljoXliqDovb3lrZDmuLjmiI/pgInlnLog5oyJ6ZKu5YWz6ZetXHJcbiAgICBwdWJsaWMgc3RhdGljIE9uQ2xvc2VHYW1lTG9iYnkgPSBcIk9uQ2xvc2VHYW1lTG9iYnlcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgT25Hb3RvR2FtZVNjZW5lID0gXCJPbkdvdG9HYW1lU2NlbmVcIjtcclxuXHJcbiAgICAvL3dlYiDnlYzpnaLpgILphY1cclxuICAgIHB1YmxpYyBzdGF0aWMgV2ViUmVzaXplID0gXCJXZWJSZXNpemVcIlxyXG4gICAgLy93ZWIg5aSW5o6l5a2Q5ri45oiP5LiK5YiGXHJcbiAgICBwdWJsaWMgc3RhdGljIFdlYlVwUG9pbnQgPSBcIldlYlVwUG9pbnRcIlxyXG4gICAgLy93ZWIg5aSW5o6l5a2Q5ri45oiP5LiL5YiGXHJcbiAgICBwdWJsaWMgc3RhdGljIFdlYkRvd25Qb2ludCA9IFwiV2ViRG93blBvaW50XCJcclxuICAgIC8vd2ViIHdpZGdldOmAgumFjVxyXG4gICAgcHVibGljIHN0YXRpYyBXZWJXaWRnZXRSZXNpemUgPSBcIldlYldpZGdldFJlc2l6ZVwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yi35paw5ri45oiP5LiL6L2954q25oCBXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVVBEQVRFX1NVQl9HQU1FX1NUQVRFID0gXCJVUERBVEVfU1VCX0dBTUVfU1RBVEVcIjtcclxuXHJcblxyXG4gICAgLyoq6ZqQ6JeP6ZmQ5pe26aaW5YWF6L+U5Yip5YCS6K6h5pe2ICovXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBUaW1lTGltaXRlZFJlY2hhcmdlU3RhdHVzQ2hhbmdlID0gXCJUaW1lTGltaXRlZFJlY2hhcmdlU3RhdHVzQ2hhbmdlXCJcclxuXHJcbn0iXX0=