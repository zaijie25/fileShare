//每条协议需要添加必要注释

export class NetLogin {
    public static mod = "login"
    //手机登录
    public static UserPhoneLogin = "UserPhoneLogin";
    //微信登陆
    public static UserWxLogin = "UserWxLogin";
    //微信登陆
    public static UserFacebookLogin = "UserFacebookLogin";
    //游客登录
    public static VisitorLogin = "VisitorLogin";
    //手机注册
    public static UserRegister = "UserRegister";
    //获取初始配置
    public static GetFistConfig = "GetFistConfig";

}

export class NetVerifyCode {
    public static mod = "verifycode"

    //获取手机验证码  （登陆之前）
    public static GetPhoneVerifyCode = "GetPhoneVerifyCode";
    //忘记密码
    public static ForgetPwd = "ForgetPwd";
}

export class NetOnline {
    public static mod = "online";
    public static HeartBeat = "heart_beat";
}


export class NetAppface {
    public static mod = "appface";
    public static gameAgent = "gameAgent";
    //获取玩家信息
    public static GetUserInfo = "GetUserInfo";
    //获取玩家金币信息
    public static GetUserPoint = "GetUserPoint";
    //获取私人跑马灯信息
    public static GetGameDataMaquee = "GetGameDataMaquee";
    //获取红包个数
    public static GetRewardPackCount = "GetRewardPackCount";
    //领取红包
    public static ReceiveRewardPack = "ReceiveRewardPack";
    //领取大厅充值红包
    public static DoRechargeRed = "DoRechargeRed";
    //每日连续充值红包
    public static ReciveDailyRedpack = "ReciveDailyRedpack";
    //购买保险金
    public static BuyInsurance = "BuyInsurance";
    //领取保险金
    public static ReciveInsurance = "ReciveInsurance";
    //用户剩余补助金次数
    public static SubsidyPoint = "SubsidyPoint";
    //用户领取补助金
    public static GetSubsidyPoint = "GetSubsidyPoint";
    //修改玩家信息
    public static EditUserInfo = "EditUserInfo";
    public static EditPwd = "EditPwd";
    public static BindPhone = "BindPhone";
    public static SetSelfCfg = "SetSelfCfg";

    //请求这个VIP等级奖励是否领取
    public static CheckVipReward = "CheckVipReward"
    //领取VIP等级奖励
    public static ReciveVipReward = "ReciveVipReward"
    //请求这个VIP等级奖励是否领取
    public static NewCheckVipReward = "NewCheckVipReward"
     //领取VIP等级奖励
    public static NewReciveVipReward = "NewReciveVipReward"

    //获取游戏服务器信息
    public static GetGameRoute = "GetGameRoute";

    public static QuaryState = "QueryState";

    //获取配置
    public static GetConfig = "GetConfig";

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


    /**限时首充 */

    public static GetLimitTimeFirstPayActivityCfg    = "GetLimitTimeFirstPayActivityCfg"

    public static GetLimitTimeFirstPayActivityPointReq     = "GetLimitTimeFirstPayActivityPoint"


    //---------------------------------------------------彩金池相关begin-------------------------------------------//
    public static dynamicSvr = "dynamicSvr";
    public static GetPotPoint = "GetPotPoint"; //获取彩金相关信息
    public static GetPotRecord = "GetPotRecord"; //获取彩金记录
    //---------------------------------------------------彩金池相关end-------------------------------------------//

    //每日返利领取记录
    public static GetDayFlowBackRecord = "GetDayFlowBackRecord";
    //领取每日返利
    public static GetDayFlowBack = "GetDayFlowBack";
    //累积领取流水返利
    public static GetDayFlowBackAll = "GetDayFlowBackAll";

    //上报openInstall
    public static PostInstallApp = "PushAppInstall";

    //获取具体游戏列表
    public static GetGameList = "GetGameList"
    //获取游戏列表左边页签
    public static GetGameTypeList = "GetGameTypeList";

    //-------------------------任务系统---------------------------//
    public static GetTaskActivityAllList = "GetTaskActivityAllList"
    public static GetMyTaskActivityInfo = "GetMyTaskActivityInfo"
    public static GetMyTaskActivityReward = "GetMyTaskActivityReward"

    //百胜web game
    public static ApplyEnterGame = "ApplyEnterGame"

    //百胜 上分
    public static ApplyTopPoint = "ApplyTopPoint"

    //百胜 下分
    public static ApplyDownPoint = "ApplyDownPoint"

    //web外接游戏(进入游戏)
    public static EnterGame = "EnterGame"
    //web外接游戏(上分)
    public static TransferSave = "TransferSave"
    //web外接游戏(下分)
    public static TransferTake = "TransferTake"

    //获取日周月配置信息
    public static GetDailyGiftMoneyCfg = "GetDailyGiftMoneyCfg";
    //领取礼金
    public static DoDailyGiftMoney = "DoDailyGiftMoney";
}

//检查版本更新
export class NetCheckVersion {
    public static mod = "root";
    public static checkversion = "checkversion";
}


export class NetClientLog {
    public static mod = "clientlog";
    //客户端log日志
    public static ClientLogReq = "ClientLogReq";
    //获取app信息
    public static DownloadAppInfo = "DownloadAppInfo";
}

