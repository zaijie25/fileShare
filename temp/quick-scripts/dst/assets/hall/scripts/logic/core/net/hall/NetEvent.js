
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/net/hall/NetEvent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'feeb5TQD1ZMnovyOEmGXO6P', 'NetEvent');
// hall/scripts/logic/core/net/hall/NetEvent.ts

"use strict";
//每条协议需要添加必要注释
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetClientLog = exports.NetCheckVersion = exports.NetAppface = exports.NetOnline = exports.NetVerifyCode = exports.NetLogin = void 0;
var NetLogin = /** @class */ (function () {
    function NetLogin() {
    }
    NetLogin.mod = "login";
    //手机登录
    NetLogin.UserPhoneLogin = "UserPhoneLogin";
    //微信登陆
    NetLogin.UserWxLogin = "UserWxLogin";
    //微信登陆
    NetLogin.UserFacebookLogin = "UserFacebookLogin";
    //游客登录
    NetLogin.VisitorLogin = "VisitorLogin";
    //手机注册
    NetLogin.UserRegister = "UserRegister";
    //获取初始配置
    NetLogin.GetFistConfig = "GetFistConfig";
    return NetLogin;
}());
exports.NetLogin = NetLogin;
var NetVerifyCode = /** @class */ (function () {
    function NetVerifyCode() {
    }
    NetVerifyCode.mod = "verifycode";
    //获取手机验证码  （登陆之前）
    NetVerifyCode.GetPhoneVerifyCode = "GetPhoneVerifyCode";
    //忘记密码
    NetVerifyCode.ForgetPwd = "ForgetPwd";
    return NetVerifyCode;
}());
exports.NetVerifyCode = NetVerifyCode;
var NetOnline = /** @class */ (function () {
    function NetOnline() {
    }
    NetOnline.mod = "online";
    NetOnline.HeartBeat = "heart_beat";
    return NetOnline;
}());
exports.NetOnline = NetOnline;
var NetAppface = /** @class */ (function () {
    function NetAppface() {
    }
    NetAppface.mod = "appface";
    NetAppface.gameAgent = "gameAgent";
    //获取玩家信息
    NetAppface.GetUserInfo = "GetUserInfo";
    //获取玩家金币信息
    NetAppface.GetUserPoint = "GetUserPoint";
    //获取私人跑马灯信息
    NetAppface.GetGameDataMaquee = "GetGameDataMaquee";
    //获取红包个数
    NetAppface.GetRewardPackCount = "GetRewardPackCount";
    //领取红包
    NetAppface.ReceiveRewardPack = "ReceiveRewardPack";
    //领取大厅充值红包
    NetAppface.DoRechargeRed = "DoRechargeRed";
    //每日连续充值红包
    NetAppface.ReciveDailyRedpack = "ReciveDailyRedpack";
    //购买保险金
    NetAppface.BuyInsurance = "BuyInsurance";
    //领取保险金
    NetAppface.ReciveInsurance = "ReciveInsurance";
    //用户剩余补助金次数
    NetAppface.SubsidyPoint = "SubsidyPoint";
    //用户领取补助金
    NetAppface.GetSubsidyPoint = "GetSubsidyPoint";
    //修改玩家信息
    NetAppface.EditUserInfo = "EditUserInfo";
    NetAppface.EditPwd = "EditPwd";
    NetAppface.BindPhone = "BindPhone";
    NetAppface.SetSelfCfg = "SetSelfCfg";
    //请求这个VIP等级奖励是否领取
    NetAppface.CheckVipReward = "CheckVipReward";
    //领取VIP等级奖励
    NetAppface.ReciveVipReward = "ReciveVipReward";
    //请求这个VIP等级奖励是否领取
    NetAppface.NewCheckVipReward = "NewCheckVipReward";
    //领取VIP等级奖励
    NetAppface.NewReciveVipReward = "NewReciveVipReward";
    //获取游戏服务器信息
    NetAppface.GetGameRoute = "GetGameRoute";
    NetAppface.QuaryState = "QueryState";
    //获取配置
    NetAppface.GetConfig = "GetConfig";
    //提现
    NetAppface.GetBankInfo = "GetBankInfo"; //获取提现账号信息 1银行 2支付宝
    NetAppface.BindBankInfo = "BindBankInfo"; //绑定提现账号信息 1银行 2支付宝
    NetAppface.ApplyCash = "ApplyCash"; //提现            1银行 2支付宝
    NetAppface.ApplyCashList = "ApplyCashList"; //提现记录
    NetAppface.GetAllPutList = "GetAllPutList"; //所有玩家提现记录
    //新的充值接口
    NetAppface.GetNewPayConfig = "GetNewPayConfig";
    // 充值
    NetAppface.GetPayConfig = "GetPayConfig"; // 获取充值配置
    NetAppface.GetUserPayList = "GetUserPayList"; // 获取充值历史记录
    NetAppface.GetAllPayPutList = "GetAllPayPutList"; // 获取玩家充值展示
    NetAppface.UserDownPay = "UserNewDownPay"; //在线充值生成订单
    NetAppface.GetDownPayUrl = "GetUserDownPayData"; // 在线充值订单支付url
    NetAppface.UserUnionPay = "UserNewUnionPay"; // 生成用户转账订单
    NetAppface.UserNewDownPayAttach = "UserNewDownPayAttach"; //通知服务器获取orderStr，放到了原生来做
    // 返利
    NetAppface.GetFlowBackCommi = "GetFlowBackCommi"; // 获取返佣定档
    NetAppface.GetFlowBackRecord = "GetFlowBackRecord"; // 流水返佣记录
    NetAppface.GetFlowBackPoint = "GetFlowBackPoint"; // 领取流水返利
    //银行
    NetAppface.LoginBank = "LoginBank"; //登录银行
    NetAppface.SetBankPwd = "SetBankPwd"; //修改密码
    NetAppface.ForgetBankPwd = "ForgetBankPwd"; //忘记密码
    NetAppface.DealBankPoint = "DealBankPoint"; //存取钱
    //排行榜
    NetAppface.GetPointRank = "GetPointRank";
    //消息
    NetAppface.GetMsgList = "GetMsgList";
    NetAppface.ReadMsg = "ReadMsg";
    NetAppface.DelMail = "DelMail";
    //反馈
    NetAppface.GetProblem = "GetProblem";
    NetAppface.SetProblem = "SetProblem";
    //全民推广
    NetAppface.GetAgentShare = "GetAgentShare";
    //我的团队
    NetAppface.GetTeamInfo = "GetTeamInfo";
    //我的团队成员列表
    NetAppface.GetTeamInfoList = "GetTeamInfoList";
    //查询我的团队用户信息
    NetAppface.QueryTeamUser = "QueryTeamUser";
    //佣金明细
    NetAppface.GetCommiInfo = "GetCommiInfo";
    //佣金明细列表
    NetAppface.GetCommiInfoList = "GetCommiInfoList";
    //业绩查询
    NetAppface.GetFlowInfoList = "GetFlowInfoList";
    //佣金定档
    NetAppface.GetAgentCommi = "GetAgentCommi";
    /**我的推广 */
    NetAppface.GetSelfShare = "GetSelfShare";
    /**我的推广无限代*/
    NetAppface.GetDayAgentShare = "GetDayAgentShare";
    /**绑定邀请码 */
    NetAppface.BindPid = "BindPid";
    /**领取记录 */
    NetAppface.GetSelfReadRecord = "GetSelfReadRecord";
    /**佣金表 */
    NetAppface.GetDayAgentCommi = "GetDayAgentCommi";
    /**领取记录无限代 */
    NetAppface.GetDayAgentRecord = "GetDayAgentRecord";
    /**领取奖励 */
    NetAppface.GetSelfRead = "GetSelfRead";
    /**领取奖励无限代 */
    NetAppface.GetDayAgent = "GetDayAgent";
    /**我的团队 */
    NetAppface.GetSelfTeam = "GetSelfTeam";
    /**我的团队无限代 */
    NetAppface.GetDayAgentTeamInfo = "GetDayAgentTeamInfo";
    /**查询下级 */
    NetAppface.SeachSelfTeam = "SeachSelfTeam";
    /**查询下级（无限代） */
    NetAppface.SeachSelfTeamUser = "SeachSelfTeamUser";
    /**奖励明细 */
    NetAppface.GetSendRecord = "GetSendRecord";
    /**业绩查询 */
    NetAppface.GetDayFlowInfoList = "GetDayFlowInfoList";
    NetAppface.PostIpInfo = "PostIpInfo";
    /** 客户端上报统计数据——当日首次下载游戏人数 */
    NetAppface.PostInstallGameInfo = "PostInstallGameInfo";
    //获取活动列表
    NetAppface.GetActivityCfg = "GetActivityCfg";
    //领取活动奖励
    NetAppface.ReceiveActivityAward = "ReceiveActivityAward";
    //请求
    NetAppface.GetUserShareUrl = "GetUserShareUrl";
    /**限时首充 */
    NetAppface.GetLimitTimeFirstPayActivityCfg = "GetLimitTimeFirstPayActivityCfg";
    NetAppface.GetLimitTimeFirstPayActivityPointReq = "GetLimitTimeFirstPayActivityPoint";
    //---------------------------------------------------彩金池相关begin-------------------------------------------//
    NetAppface.dynamicSvr = "dynamicSvr";
    NetAppface.GetPotPoint = "GetPotPoint"; //获取彩金相关信息
    NetAppface.GetPotRecord = "GetPotRecord"; //获取彩金记录
    //---------------------------------------------------彩金池相关end-------------------------------------------//
    //每日返利领取记录
    NetAppface.GetDayFlowBackRecord = "GetDayFlowBackRecord";
    //领取每日返利
    NetAppface.GetDayFlowBack = "GetDayFlowBack";
    //累积领取流水返利
    NetAppface.GetDayFlowBackAll = "GetDayFlowBackAll";
    //上报openInstall
    NetAppface.PostInstallApp = "PushAppInstall";
    //获取具体游戏列表
    NetAppface.GetGameList = "GetGameList";
    //获取游戏列表左边页签
    NetAppface.GetGameTypeList = "GetGameTypeList";
    //-------------------------任务系统---------------------------//
    NetAppface.GetTaskActivityAllList = "GetTaskActivityAllList";
    NetAppface.GetMyTaskActivityInfo = "GetMyTaskActivityInfo";
    NetAppface.GetMyTaskActivityReward = "GetMyTaskActivityReward";
    //百胜web game
    NetAppface.ApplyEnterGame = "ApplyEnterGame";
    //百胜 上分
    NetAppface.ApplyTopPoint = "ApplyTopPoint";
    //百胜 下分
    NetAppface.ApplyDownPoint = "ApplyDownPoint";
    //web外接游戏(进入游戏)
    NetAppface.EnterGame = "EnterGame";
    //web外接游戏(上分)
    NetAppface.TransferSave = "TransferSave";
    //web外接游戏(下分)
    NetAppface.TransferTake = "TransferTake";
    //获取日周月配置信息
    NetAppface.GetDailyGiftMoneyCfg = "GetDailyGiftMoneyCfg";
    //领取礼金
    NetAppface.DoDailyGiftMoney = "DoDailyGiftMoney";
    return NetAppface;
}());
exports.NetAppface = NetAppface;
//检查版本更新
var NetCheckVersion = /** @class */ (function () {
    function NetCheckVersion() {
    }
    NetCheckVersion.mod = "root";
    NetCheckVersion.checkversion = "checkversion";
    return NetCheckVersion;
}());
exports.NetCheckVersion = NetCheckVersion;
var NetClientLog = /** @class */ (function () {
    function NetClientLog() {
    }
    NetClientLog.mod = "clientlog";
    //客户端log日志
    NetClientLog.ClientLogReq = "ClientLogReq";
    //获取app信息
    NetClientLog.DownloadAppInfo = "DownloadAppInfo";
    return NetClientLog;
}());
exports.NetClientLog = NetClientLog;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXG5ldFxcaGFsbFxcTmV0RXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGNBQWM7OztBQUVkO0lBQUE7SUFlQSxDQUFDO0lBZGlCLFlBQUcsR0FBRyxPQUFPLENBQUE7SUFDM0IsTUFBTTtJQUNRLHVCQUFjLEdBQUcsZ0JBQWdCLENBQUM7SUFDaEQsTUFBTTtJQUNRLG9CQUFXLEdBQUcsYUFBYSxDQUFDO0lBQzFDLE1BQU07SUFDUSwwQkFBaUIsR0FBRyxtQkFBbUIsQ0FBQztJQUN0RCxNQUFNO0lBQ1EscUJBQVksR0FBRyxjQUFjLENBQUM7SUFDNUMsTUFBTTtJQUNRLHFCQUFZLEdBQUcsY0FBYyxDQUFDO0lBQzVDLFFBQVE7SUFDTSxzQkFBYSxHQUFHLGVBQWUsQ0FBQztJQUVsRCxlQUFDO0NBZkQsQUFlQyxJQUFBO0FBZlksNEJBQVE7QUFpQnJCO0lBQUE7SUFPQSxDQUFDO0lBTmlCLGlCQUFHLEdBQUcsWUFBWSxDQUFBO0lBRWhDLGlCQUFpQjtJQUNILGdDQUFrQixHQUFHLG9CQUFvQixDQUFDO0lBQ3hELE1BQU07SUFDUSx1QkFBUyxHQUFHLFdBQVcsQ0FBQztJQUMxQyxvQkFBQztDQVBELEFBT0MsSUFBQTtBQVBZLHNDQUFhO0FBUzFCO0lBQUE7SUFHQSxDQUFDO0lBRmlCLGFBQUcsR0FBRyxRQUFRLENBQUM7SUFDZixtQkFBUyxHQUFHLFlBQVksQ0FBQztJQUMzQyxnQkFBQztDQUhELEFBR0MsSUFBQTtBQUhZLDhCQUFTO0FBTXRCO0lBQUE7SUF3TUEsQ0FBQztJQXZNaUIsY0FBRyxHQUFHLFNBQVMsQ0FBQztJQUNoQixvQkFBUyxHQUFHLFdBQVcsQ0FBQztJQUN0QyxRQUFRO0lBQ00sc0JBQVcsR0FBRyxhQUFhLENBQUM7SUFDMUMsVUFBVTtJQUNJLHVCQUFZLEdBQUcsY0FBYyxDQUFDO0lBQzVDLFdBQVc7SUFDRyw0QkFBaUIsR0FB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QXdNQyxJQUFBO0FBeE1ZLGdDQUFVO0FBME12QixRQUFRO0FBQ1I7SUFBQTtJQUdBLENBQUM7SUFGaUIsbUJBQUcsR0FBRyxNQUFNLENBQUM7SUFDYiw0QkFBWSxHQUFHLGNBQWMsQ0FBQztJQUNoRCxzQkFBQztDQUhELEFBR0MsSUFBQTtBQUhZLDBDQUFlO0FBTTVCO0lBQUE7SUFNQSxDQUFDO0lBTGlCLGdCQUFHLEdBQUcsV0FBVyxDQUFDO0lBQ2hDLFVBQVU7SUFDSSx5QkFBWSxHQUFHLGNBQWMsQ0FBQztJQUM1QyxTQUFTO0lBQ0ssNEJBQWUsR0FBRyxpQkFBaUIsQ0FBQztJQUN0RCxtQkFBQztDQU5ELEFBTUMsSUFBQTtBQU5ZLG9DQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy/mr4/mnaHljY/orq7pnIDopoHmt7vliqDlv4XopoHms6jph4pcclxuXHJcbmV4cG9ydCBjbGFzcyBOZXRMb2dpbiB7XHJcbiAgICBwdWJsaWMgc3RhdGljIG1vZCA9IFwibG9naW5cIlxyXG4gICAgLy/miYvmnLrnmbvlvZVcclxuICAgIHB1YmxpYyBzdGF0aWMgVXNlclBob25lTG9naW4gPSBcIlVzZXJQaG9uZUxvZ2luXCI7XHJcbiAgICAvL+W+ruS/oeeZu+mZhlxyXG4gICAgcHVibGljIHN0YXRpYyBVc2VyV3hMb2dpbiA9IFwiVXNlcld4TG9naW5cIjtcclxuICAgIC8v5b6u5L+h55m76ZmGXHJcbiAgICBwdWJsaWMgc3RhdGljIFVzZXJGYWNlYm9va0xvZ2luID0gXCJVc2VyRmFjZWJvb2tMb2dpblwiO1xyXG4gICAgLy/muLjlrqLnmbvlvZVcclxuICAgIHB1YmxpYyBzdGF0aWMgVmlzaXRvckxvZ2luID0gXCJWaXNpdG9yTG9naW5cIjtcclxuICAgIC8v5omL5py65rOo5YaMXHJcbiAgICBwdWJsaWMgc3RhdGljIFVzZXJSZWdpc3RlciA9IFwiVXNlclJlZ2lzdGVyXCI7XHJcbiAgICAvL+iOt+WPluWIneWni+mFjee9rlxyXG4gICAgcHVibGljIHN0YXRpYyBHZXRGaXN0Q29uZmlnID0gXCJHZXRGaXN0Q29uZmlnXCI7XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTmV0VmVyaWZ5Q29kZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIG1vZCA9IFwidmVyaWZ5Y29kZVwiXHJcblxyXG4gICAgLy/ojrflj5bmiYvmnLrpqozor4HnoIEgIO+8iOeZu+mZhuS5i+WJje+8iVxyXG4gICAgcHVibGljIHN0YXRpYyBHZXRQaG9uZVZlcmlmeUNvZGUgPSBcIkdldFBob25lVmVyaWZ5Q29kZVwiO1xyXG4gICAgLy/lv5jorrDlr4bnoIFcclxuICAgIHB1YmxpYyBzdGF0aWMgRm9yZ2V0UHdkID0gXCJGb3JnZXRQd2RcIjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5ldE9ubGluZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIG1vZCA9IFwib25saW5lXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIEhlYXJ0QmVhdCA9IFwiaGVhcnRfYmVhdFwiO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIE5ldEFwcGZhY2Uge1xyXG4gICAgcHVibGljIHN0YXRpYyBtb2QgPSBcImFwcGZhY2VcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2FtZUFnZW50ID0gXCJnYW1lQWdlbnRcIjtcclxuICAgIC8v6I635Y+W546p5a625L+h5oGvXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldFVzZXJJbmZvID0gXCJHZXRVc2VySW5mb1wiO1xyXG4gICAgLy/ojrflj5bnjqnlrrbph5HluIHkv6Hmga9cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0VXNlclBvaW50ID0gXCJHZXRVc2VyUG9pbnRcIjtcclxuICAgIC8v6I635Y+W56eB5Lq66LeR6ams54Gv5L+h5oGvXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldEdhbWVEYXRhTWFxdWVlID0gXCJHZXRHYW1lRGF0YU1hcXVlZVwiO1xyXG4gICAgLy/ojrflj5bnuqLljIXkuKrmlbBcclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0UmV3YXJkUGFja0NvdW50ID0gXCJHZXRSZXdhcmRQYWNrQ291bnRcIjtcclxuICAgIC8v6aKG5Y+W57qi5YyFXHJcbiAgICBwdWJsaWMgc3RhdGljIFJlY2VpdmVSZXdhcmRQYWNrID0gXCJSZWNlaXZlUmV3YXJkUGFja1wiO1xyXG4gICAgLy/pooblj5blpKfljoXlhYXlgLznuqLljIVcclxuICAgIHB1YmxpYyBzdGF0aWMgRG9SZWNoYXJnZVJlZCA9IFwiRG9SZWNoYXJnZVJlZFwiO1xyXG4gICAgLy/mr4/ml6Xov57nu63lhYXlgLznuqLljIVcclxuICAgIHB1YmxpYyBzdGF0aWMgUmVjaXZlRGFpbHlSZWRwYWNrID0gXCJSZWNpdmVEYWlseVJlZHBhY2tcIjtcclxuICAgIC8v6LSt5Lmw5L+d6Zmp6YeRXHJcbiAgICBwdWJsaWMgc3RhdGljIEJ1eUluc3VyYW5jZSA9IFwiQnV5SW5zdXJhbmNlXCI7XHJcbiAgICAvL+mihuWPluS/nemZqemHkVxyXG4gICAgcHVibGljIHN0YXRpYyBSZWNpdmVJbnN1cmFuY2UgPSBcIlJlY2l2ZUluc3VyYW5jZVwiO1xyXG4gICAgLy/nlKjmiLfliankvZnooaXliqnph5HmrKHmlbBcclxuICAgIHB1YmxpYyBzdGF0aWMgU3Vic2lkeVBvaW50ID0gXCJTdWJzaWR5UG9pbnRcIjtcclxuICAgIC8v55So5oi36aKG5Y+W6KGl5Yqp6YeRXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldFN1YnNpZHlQb2ludCA9IFwiR2V0U3Vic2lkeVBvaW50XCI7XHJcbiAgICAvL+S/ruaUueeOqeWutuS/oeaBr1xyXG4gICAgcHVibGljIHN0YXRpYyBFZGl0VXNlckluZm8gPSBcIkVkaXRVc2VySW5mb1wiO1xyXG4gICAgcHVibGljIHN0YXRpYyBFZGl0UHdkID0gXCJFZGl0UHdkXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIEJpbmRQaG9uZSA9IFwiQmluZFBob25lXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNldFNlbGZDZmcgPSBcIlNldFNlbGZDZmdcIjtcclxuXHJcbiAgICAvL+ivt+axgui/meS4qlZJUOetiee6p+WlluWKseaYr+WQpumihuWPllxyXG4gICAgcHVibGljIHN0YXRpYyBDaGVja1ZpcFJld2FyZCA9IFwiQ2hlY2tWaXBSZXdhcmRcIlxyXG4gICAgLy/pooblj5ZWSVDnrYnnuqflpZblirFcclxuICAgIHB1YmxpYyBzdGF0aWMgUmVjaXZlVmlwUmV3YXJkID0gXCJSZWNpdmVWaXBSZXdhcmRcIlxyXG4gICAgLy/or7fmsYLov5nkuKpWSVDnrYnnuqflpZblirHmmK/lkKbpooblj5ZcclxuICAgIHB1YmxpYyBzdGF0aWMgTmV3Q2hlY2tWaXBSZXdhcmQgPSBcIk5ld0NoZWNrVmlwUmV3YXJkXCJcclxuICAgICAvL+mihuWPllZJUOetiee6p+WlluWKsVxyXG4gICAgcHVibGljIHN0YXRpYyBOZXdSZWNpdmVWaXBSZXdhcmQgPSBcIk5ld1JlY2l2ZVZpcFJld2FyZFwiXHJcblxyXG4gICAgLy/ojrflj5bmuLjmiI/mnI3liqHlmajkv6Hmga9cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0R2FtZVJvdXRlID0gXCJHZXRHYW1lUm91dGVcIjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFF1YXJ5U3RhdGUgPSBcIlF1ZXJ5U3RhdGVcIjtcclxuXHJcbiAgICAvL+iOt+WPlumFjee9rlxyXG4gICAgcHVibGljIHN0YXRpYyBHZXRDb25maWcgPSBcIkdldENvbmZpZ1wiO1xyXG5cclxuICAgIC8v5o+Q546wXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldEJhbmtJbmZvID0gXCJHZXRCYW5rSW5mb1wiOyAgICAgIC8v6I635Y+W5o+Q546w6LSm5Y+35L+h5oGvIDHpk7booYwgMuaUr+S7mOWunVxyXG4gICAgcHVibGljIHN0YXRpYyBCaW5kQmFua0luZm8gPSBcIkJpbmRCYW5rSW5mb1wiOyAgICAvL+e7keWumuaPkOeOsOi0puWPt+S/oeaBryAx6ZO26KGMIDLmlK/ku5jlrp1cclxuICAgIHB1YmxpYyBzdGF0aWMgQXBwbHlDYXNoID0gXCJBcHBseUNhc2hcIjsgICAgICAgICAgLy/mj5DnjrAgICAgICAgICAgICAx6ZO26KGMIDLmlK/ku5jlrp1cclxuICAgIHB1YmxpYyBzdGF0aWMgQXBwbHlDYXNoTGlzdCA9IFwiQXBwbHlDYXNoTGlzdFwiOyAgLy/mj5DnjrDorrDlvZVcclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0QWxsUHV0TGlzdCA9IFwiR2V0QWxsUHV0TGlzdFwiOyAgLy/miYDmnInnjqnlrrbmj5DnjrDorrDlvZVcclxuXHJcbiAgICAvL+aWsOeahOWFheWAvOaOpeWPo1xyXG4gICAgcHVibGljIHN0YXRpYyBHZXROZXdQYXlDb25maWcgPSBcIkdldE5ld1BheUNvbmZpZ1wiO1xyXG4gICAgLy8g5YWF5YC8XHJcbiAgICBwdWJsaWMgc3RhdGljIEdldFBheUNvbmZpZyA9IFwiR2V0UGF5Q29uZmlnXCI7ICAgICAgICAgICAgICAgIC8vIOiOt+WPluWFheWAvOmFjee9rlxyXG4gICAgcHVibGljIHN0YXRpYyBHZXRVc2VyUGF5TGlzdCA9IFwiR2V0VXNlclBheUxpc3RcIjsgICAgICAgICAgICAvLyDojrflj5blhYXlgLzljoblj7LorrDlvZVcclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0QWxsUGF5UHV0TGlzdCA9IFwiR2V0QWxsUGF5UHV0TGlzdFwiOyAgICAgICAgLy8g6I635Y+W546p5a625YWF5YC85bGV56S6XHJcbiAgICBwdWJsaWMgc3RhdGljIFVzZXJEb3duUGF5ID0gXCJVc2VyTmV3RG93blBheVwiOyAgICAgICAgICAgICAgICAgIC8v5Zyo57q/5YWF5YC855Sf5oiQ6K6i5Y2VXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldERvd25QYXlVcmwgPSBcIkdldFVzZXJEb3duUGF5RGF0YVwiOyAgICAgICAgIC8vIOWcqOe6v+WFheWAvOiuouWNleaUr+S7mHVybFxyXG4gICAgcHVibGljIHN0YXRpYyBVc2VyVW5pb25QYXkgPSBcIlVzZXJOZXdVbmlvblBheVwiOyAgICAgICAgICAgICAgICAvLyDnlJ/miJDnlKjmiLfovazotKborqLljZVcclxuICAgIHB1YmxpYyBzdGF0aWMgVXNlck5ld0Rvd25QYXlBdHRhY2ggPSBcIlVzZXJOZXdEb3duUGF5QXR0YWNoXCI7IC8v6YCa55+l5pyN5Yqh5Zmo6I635Y+Wb3JkZXJTdHLvvIzmlL7liLDkuobljp/nlJ/mnaXlgZpcclxuXHJcbiAgICAvLyDov5TliKlcclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0Rmxvd0JhY2tDb21taSA9IFwiR2V0Rmxvd0JhY2tDb21taVwiOyAgICAgICAgLy8g6I635Y+W6L+U5L2j5a6a5qGjXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldEZsb3dCYWNrUmVjb3JkID0gXCJHZXRGbG93QmFja1JlY29yZFwiOyAgICAgIC8vIOa1geawtOi/lOS9o+iusOW9lVxyXG4gICAgcHVibGljIHN0YXRpYyBHZXRGbG93QmFja1BvaW50ID0gXCJHZXRGbG93QmFja1BvaW50XCI7ICAgICAgICAvLyDpooblj5bmtYHmsLTov5TliKlcclxuXHJcbiAgICAvL+mTtuihjFxyXG4gICAgcHVibGljIHN0YXRpYyBMb2dpbkJhbmsgPSBcIkxvZ2luQmFua1wiOyAgICAgICAgICAvL+eZu+W9lemTtuihjFxyXG4gICAgcHVibGljIHN0YXRpYyBTZXRCYW5rUHdkID0gXCJTZXRCYW5rUHdkXCI7ICAgICAgICAvL+S/ruaUueWvhueggVxyXG4gICAgcHVibGljIHN0YXRpYyBGb3JnZXRCYW5rUHdkID0gXCJGb3JnZXRCYW5rUHdkXCI7ICAvL+W/mOiusOWvhueggVxyXG4gICAgcHVibGljIHN0YXRpYyBEZWFsQmFua1BvaW50ID0gXCJEZWFsQmFua1BvaW50XCI7ICAvL+WtmOWPlumSsVxyXG5cclxuICAgIC8v5o6S6KGM5qacXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldFBvaW50UmFuayA9IFwiR2V0UG9pbnRSYW5rXCI7XHJcblxyXG4gICAgLy/mtojmga9cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0TXNnTGlzdCA9IFwiR2V0TXNnTGlzdFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBSZWFkTXNnID0gXCJSZWFkTXNnXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIERlbE1haWwgPSBcIkRlbE1haWxcIjtcclxuXHJcbiAgICAvL+WPjemmiFxyXG4gICAgcHVibGljIHN0YXRpYyBHZXRQcm9ibGVtID0gXCJHZXRQcm9ibGVtXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNldFByb2JsZW0gPSBcIlNldFByb2JsZW1cIjtcclxuXHJcbiAgICAvL+WFqOawkeaOqOW5v1xyXG4gICAgcHVibGljIHN0YXRpYyBHZXRBZ2VudFNoYXJlID0gXCJHZXRBZ2VudFNoYXJlXCI7XHJcbiAgICAvL+aIkeeahOWboumYn1xyXG4gICAgcHVibGljIHN0YXRpYyBHZXRUZWFtSW5mbyA9IFwiR2V0VGVhbUluZm9cIjtcclxuICAgIC8v5oiR55qE5Zui6Zif5oiQ5ZGY5YiX6KGoXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldFRlYW1JbmZvTGlzdCA9IFwiR2V0VGVhbUluZm9MaXN0XCJcclxuICAgIC8v5p+l6K+i5oiR55qE5Zui6Zif55So5oi35L+h5oGvXHJcbiAgICBwdWJsaWMgc3RhdGljIFF1ZXJ5VGVhbVVzZXIgPSBcIlF1ZXJ5VGVhbVVzZXJcIlxyXG4gICAgLy/kvaPph5HmmI7nu4ZcclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0Q29tbWlJbmZvID0gXCJHZXRDb21taUluZm9cIlxyXG4gICAgLy/kvaPph5HmmI7nu4bliJfooahcclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0Q29tbWlJbmZvTGlzdCA9IFwiR2V0Q29tbWlJbmZvTGlzdFwiXHJcbiAgICAvL+S4mue7qeafpeivolxyXG4gICAgcHVibGljIHN0YXRpYyBHZXRGbG93SW5mb0xpc3QgPSBcIkdldEZsb3dJbmZvTGlzdFwiXHJcbiAgICAvL+S9o+mHkeWumuaho1xyXG4gICAgcHVibGljIHN0YXRpYyBHZXRBZ2VudENvbW1pID0gXCJHZXRBZ2VudENvbW1pXCJcclxuXHJcbiAgICAvKirmiJHnmoTmjqjlub8gKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0U2VsZlNoYXJlID0gXCJHZXRTZWxmU2hhcmVcIjtcclxuICAgIC8qKuaIkeeahOaOqOW5v+aXoOmZkOS7oyovXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldERheUFnZW50U2hhcmUgPSBcIkdldERheUFnZW50U2hhcmVcIjtcclxuICAgIC8qKue7keWumumCgOivt+eggSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBCaW5kUGlkID0gXCJCaW5kUGlkXCI7XHJcbiAgICAvKirpooblj5borrDlvZUgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0U2VsZlJlYWRSZWNvcmQgPSBcIkdldFNlbGZSZWFkUmVjb3JkXCI7XHJcbiAgICAvKirkvaPph5HooaggKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0RGF5QWdlbnRDb21taSA9IFwiR2V0RGF5QWdlbnRDb21taVwiO1xyXG4gICAgLyoq6aKG5Y+W6K6w5b2V5peg6ZmQ5LujICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldERheUFnZW50UmVjb3JkID0gXCJHZXREYXlBZ2VudFJlY29yZFwiO1xyXG4gICAgLyoq6aKG5Y+W5aWW5YqxICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldFNlbGZSZWFkID0gXCJHZXRTZWxmUmVhZFwiO1xyXG4gICAgLyoq6aKG5Y+W5aWW5Yqx5peg6ZmQ5LujICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldERheUFnZW50ID0gXCJHZXREYXlBZ2VudFwiO1xyXG4gICAgLyoq5oiR55qE5Zui6ZifICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldFNlbGZUZWFtID0gXCJHZXRTZWxmVGVhbVwiO1xyXG4gICAgLyoq5oiR55qE5Zui6Zif5peg6ZmQ5LujICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldERheUFnZW50VGVhbUluZm8gPSBcIkdldERheUFnZW50VGVhbUluZm9cIjtcclxuICAgIC8qKuafpeivouS4i+e6pyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBTZWFjaFNlbGZUZWFtID0gXCJTZWFjaFNlbGZUZWFtXCI7XHJcbiAgICAvKirmn6Xor6LkuIvnuqfvvIjml6DpmZDku6PvvIkgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgU2VhY2hTZWxmVGVhbVVzZXIgPSBcIlNlYWNoU2VsZlRlYW1Vc2VyXCI7XHJcbiAgICAvKirlpZblirHmmI7nu4YgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0U2VuZFJlY29yZCA9IFwiR2V0U2VuZFJlY29yZFwiO1xyXG4gICAgLyoq5Lia57up5p+l6K+iICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldERheUZsb3dJbmZvTGlzdCA9IFwiR2V0RGF5Rmxvd0luZm9MaXN0XCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBQb3N0SXBJbmZvID0gXCJQb3N0SXBJbmZvXCI7XHJcbiAgICAvKiog5a6i5oi356uv5LiK5oql57uf6K6h5pWw5o2u4oCU4oCU5b2T5pel6aaW5qyh5LiL6L295ri45oiP5Lq65pWwICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFBvc3RJbnN0YWxsR2FtZUluZm8gPSBcIlBvc3RJbnN0YWxsR2FtZUluZm9cIjtcclxuICAgIC8v6I635Y+W5rS75Yqo5YiX6KGoXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldEFjdGl2aXR5Q2ZnID0gXCJHZXRBY3Rpdml0eUNmZ1wiO1xyXG4gICAgLy/pooblj5bmtLvliqjlpZblirFcclxuICAgIHB1YmxpYyBzdGF0aWMgUmVjZWl2ZUFjdGl2aXR5QXdhcmQgPSBcIlJlY2VpdmVBY3Rpdml0eUF3YXJkXCI7XHJcblxyXG4gICAgLy/or7fmsYJcclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0VXNlclNoYXJlVXJsID0gXCJHZXRVc2VyU2hhcmVVcmxcIjtcclxuXHJcblxyXG4gICAgLyoq6ZmQ5pe26aaW5YWFICovXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBHZXRMaW1pdFRpbWVGaXJzdFBheUFjdGl2aXR5Q2ZnICAgID0gXCJHZXRMaW1pdFRpbWVGaXJzdFBheUFjdGl2aXR5Q2ZnXCJcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldExpbWl0VGltZUZpcnN0UGF5QWN0aXZpdHlQb2ludFJlcSAgICAgPSBcIkdldExpbWl0VGltZUZpcnN0UGF5QWN0aXZpdHlQb2ludFwiXHJcblxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5b2p6YeR5rGg55u45YWzYmVnaW4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxuICAgIHB1YmxpYyBzdGF0aWMgZHluYW1pY1N2ciA9IFwiZHluYW1pY1N2clwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBHZXRQb3RQb2ludCA9IFwiR2V0UG90UG9pbnRcIjsgLy/ojrflj5blvanph5Hnm7jlhbPkv6Hmga9cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0UG90UmVjb3JkID0gXCJHZXRQb3RSZWNvcmRcIjsgLy/ojrflj5blvanph5HorrDlvZVcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5b2p6YeR5rGg55u45YWzZW5kLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8vXHJcblxyXG4gICAgLy/mr4/ml6Xov5TliKnpooblj5borrDlvZVcclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0RGF5Rmxvd0JhY2tSZWNvcmQgPSBcIkdldERheUZsb3dCYWNrUmVjb3JkXCI7XHJcbiAgICAvL+mihuWPluavj+aXpei/lOWIqVxyXG4gICAgcHVibGljIHN0YXRpYyBHZXREYXlGbG93QmFjayA9IFwiR2V0RGF5Rmxvd0JhY2tcIjtcclxuICAgIC8v57Sv56ev6aKG5Y+W5rWB5rC06L+U5YipXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldERheUZsb3dCYWNrQWxsID0gXCJHZXREYXlGbG93QmFja0FsbFwiO1xyXG5cclxuICAgIC8v5LiK5oqlb3Blbkluc3RhbGxcclxuICAgIHB1YmxpYyBzdGF0aWMgUG9zdEluc3RhbGxBcHAgPSBcIlB1c2hBcHBJbnN0YWxsXCI7XHJcblxyXG4gICAgLy/ojrflj5blhbfkvZPmuLjmiI/liJfooahcclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0R2FtZUxpc3QgPSBcIkdldEdhbWVMaXN0XCJcclxuICAgIC8v6I635Y+W5ri45oiP5YiX6KGo5bem6L656aG1562+XHJcbiAgICBwdWJsaWMgc3RhdGljIEdldEdhbWVUeXBlTGlzdCA9IFwiR2V0R2FtZVR5cGVMaXN0XCI7XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5Lu75Yqh57O757ufLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy9cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0VGFza0FjdGl2aXR5QWxsTGlzdCA9IFwiR2V0VGFza0FjdGl2aXR5QWxsTGlzdFwiXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldE15VGFza0FjdGl2aXR5SW5mbyA9IFwiR2V0TXlUYXNrQWN0aXZpdHlJbmZvXCJcclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0TXlUYXNrQWN0aXZpdHlSZXdhcmQgPSBcIkdldE15VGFza0FjdGl2aXR5UmV3YXJkXCJcclxuXHJcbiAgICAvL+eZvuiDnHdlYiBnYW1lXHJcbiAgICBwdWJsaWMgc3RhdGljIEFwcGx5RW50ZXJHYW1lID0gXCJBcHBseUVudGVyR2FtZVwiXHJcblxyXG4gICAgLy/nmb7og5wg5LiK5YiGXHJcbiAgICBwdWJsaWMgc3RhdGljIEFwcGx5VG9wUG9pbnQgPSBcIkFwcGx5VG9wUG9pbnRcIlxyXG5cclxuICAgIC8v55m+6IOcIOS4i+WIhlxyXG4gICAgcHVibGljIHN0YXRpYyBBcHBseURvd25Qb2ludCA9IFwiQXBwbHlEb3duUG9pbnRcIlxyXG5cclxuICAgIC8vd2Vi5aSW5o6l5ri45oiPKOi/m+WFpea4uOaIjylcclxuICAgIHB1YmxpYyBzdGF0aWMgRW50ZXJHYW1lID0gXCJFbnRlckdhbWVcIlxyXG4gICAgLy93ZWLlpJbmjqXmuLjmiI8o5LiK5YiGKVxyXG4gICAgcHVibGljIHN0YXRpYyBUcmFuc2ZlclNhdmUgPSBcIlRyYW5zZmVyU2F2ZVwiXHJcbiAgICAvL3dlYuWkluaOpea4uOaIjyjkuIvliIYpXHJcbiAgICBwdWJsaWMgc3RhdGljIFRyYW5zZmVyVGFrZSA9IFwiVHJhbnNmZXJUYWtlXCJcclxuXHJcbiAgICAvL+iOt+WPluaXpeWRqOaciOmFjee9ruS/oeaBr1xyXG4gICAgcHVibGljIHN0YXRpYyBHZXREYWlseUdpZnRNb25leUNmZyA9IFwiR2V0RGFpbHlHaWZ0TW9uZXlDZmdcIjtcclxuICAgIC8v6aKG5Y+W56S86YeRXHJcbiAgICBwdWJsaWMgc3RhdGljIERvRGFpbHlHaWZ0TW9uZXkgPSBcIkRvRGFpbHlHaWZ0TW9uZXlcIjtcclxufVxyXG5cclxuLy/mo4Dmn6XniYjmnKzmm7TmlrBcclxuZXhwb3J0IGNsYXNzIE5ldENoZWNrVmVyc2lvbiB7XHJcbiAgICBwdWJsaWMgc3RhdGljIG1vZCA9IFwicm9vdFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBjaGVja3ZlcnNpb24gPSBcImNoZWNrdmVyc2lvblwiO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIE5ldENsaWVudExvZyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIG1vZCA9IFwiY2xpZW50bG9nXCI7XHJcbiAgICAvL+WuouaIt+err2xvZ+aXpeW/l1xyXG4gICAgcHVibGljIHN0YXRpYyBDbGllbnRMb2dSZXEgPSBcIkNsaWVudExvZ1JlcVwiO1xyXG4gICAgLy/ojrflj5ZhcHDkv6Hmga9cclxuICAgIHB1YmxpYyBzdGF0aWMgRG93bmxvYWRBcHBJbmZvID0gXCJEb3dubG9hZEFwcEluZm9cIjtcclxufVxyXG5cclxuIl19