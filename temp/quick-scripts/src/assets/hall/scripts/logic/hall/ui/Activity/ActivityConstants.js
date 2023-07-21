"use strict";
cc._RF.push(module, '16e23ztzMFNyqZtChrarYJb', 'ActivityConstants');
// hall/scripts/logic/hall/ui/Activity/ActivityConstants.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityType = exports.ActivityConstants = void 0;
var ActivityConstants = /** @class */ (function () {
    function ActivityConstants() {
    }
    ActivityConstants.SHOW_ACT_WAITTING = "SHOW_ACT_WAITTING";
    ActivityConstants.HIDE_ACT_WAITTING = "HIDE_ACT_WAITTING";
    ActivityConstants.HIDE_RED_PORT = "HIDE_RED_PORT";
    return ActivityConstants;
}());
exports.ActivityConstants = ActivityConstants;
var ActivityType;
(function (ActivityType) {
    /**注册活动 */
    ActivityType[ActivityType["register"] = 1] = "register";
    /**绑定手机 */
    ActivityType[ActivityType["bindPhone"] = 2] = "bindPhone";
    /**天天送福 */
    ActivityType[ActivityType["loginGive"] = 3] = "loginGive";
    /**充值返利 */
    ActivityType[ActivityType["rechargeGift"] = 4] = "rechargeGift";
    /**转盘 */
    ActivityType[ActivityType["zhuanpan"] = 5] = "zhuanpan";
    /**分享送金 */
    ActivityType[ActivityType["shareActivity"] = 6] = "shareActivity";
    /**每日流水返利 */
    ActivityType[ActivityType["betRefund"] = 7] = "betRefund";
    /**每日首充返利 */
    ActivityType[ActivityType["dailyRechargeGift"] = 8] = "dailyRechargeGift";
    /**玩家召回 */
    ActivityType[ActivityType["backGameActivity"] = 9] = "backGameActivity";
    /**推广送金 */
    ActivityType[ActivityType["spreadAward"] = 10] = "spreadAward";
    /**三日签到 */
    ActivityType[ActivityType["signActivity"] = 11] = "signActivity";
    /**自动赠送彩金 */
    ActivityType[ActivityType["autoGive"] = 12] = "autoGive";
    /**补助金 */
    ActivityType[ActivityType["subsidyGive"] = 13] = "subsidyGive";
    /**任务奖励红包 */
    ActivityType[ActivityType["taskGive"] = 14] = "taskGive";
    /**赠送红包 */
    ActivityType[ActivityType["taskReward"] = 15] = "taskReward";
    /**每日充值红包 */
    ActivityType[ActivityType["rechargeGive"] = 16] = "rechargeGive";
    /**VIP升级奖励 */
    ActivityType[ActivityType["vipReward"] = 17] = "vipReward";
    /**每日礼金 */
    ActivityType[ActivityType["dailyGift"] = 18] = "dailyGift";
    /**保险金 */
    ActivityType[ActivityType["insurance"] = 19] = "insurance";
    /**连续充值红包 */
    ActivityType[ActivityType["dailyPayRedpack"] = 20] = "dailyPayRedpack";
    /**限时首充 */
    ActivityType[ActivityType["TimeLimitedActivity"] = 21] = "TimeLimitedActivity";
    ActivityType[ActivityType["noMsgTips"] = 1000] = "noMsgTips";
    ActivityType[ActivityType["picture"] = 10086] = "picture";
})(ActivityType = exports.ActivityType || (exports.ActivityType = {}));

cc._RF.pop();