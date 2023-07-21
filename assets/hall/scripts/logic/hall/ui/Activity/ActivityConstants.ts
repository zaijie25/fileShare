export class ActivityConstants {
    public static SHOW_ACT_WAITTING : string = "SHOW_ACT_WAITTING";
    public static HIDE_ACT_WAITTING : string = "HIDE_ACT_WAITTING";
    public static HIDE_RED_PORT : string = "HIDE_RED_PORT";
}


export enum ActivityType {
    /**注册活动 */
    register = 1,
    /**绑定手机 */
    bindPhone = 2,
    /**天天送福 */
    loginGive = 3,

    /**充值返利 */
    rechargeGift = 4,
    /**转盘 */
    zhuanpan = 5,

    /**分享送金 */
    shareActivity = 6,

    /**每日流水返利 */
    betRefund = 7,

    /**每日首充返利 */
    dailyRechargeGift = 8,

    /**玩家召回 */
    backGameActivity = 9,

    /**推广送金 */
    spreadAward = 10,

    /**三日签到 */
    signActivity = 11,
    /**自动赠送彩金 */
    autoGive = 12,
    /**补助金 */
    subsidyGive = 13,
    /**任务奖励红包 */
    taskGive = 14,
    /**赠送红包 */
    taskReward = 15,
    /**每日充值红包 */
    rechargeGive = 16,
    /**VIP升级奖励 */
    vipReward = 17,
    /**每日礼金 */
    dailyGift = 18,
    /**保险金 */
    insurance = 19,
    /**连续充值红包 */
    dailyPayRedpack = 20,
    /**限时首充 */
    TimeLimitedActivity = 21,

    noMsgTips = 1000,

    picture = 10086
}

