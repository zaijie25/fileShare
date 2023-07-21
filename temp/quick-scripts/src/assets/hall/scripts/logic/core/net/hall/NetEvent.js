"use strict";
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