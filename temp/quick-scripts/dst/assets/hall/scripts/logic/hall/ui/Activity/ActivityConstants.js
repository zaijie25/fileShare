
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Activity/ActivityConstants.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxBY3Rpdml0eVxcQWN0aXZpdHlDb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBQTtJQUlBLENBQUM7SUFIaUIsbUNBQWlCLEdBQVksbUJBQW1CLENBQUM7SUFDakQsbUNBQWlCLEdBQVksbUJBQW1CLENBQUM7SUFDakQsK0JBQWEsR0FBWSxlQUFlLENBQUM7SUFDM0Qsd0JBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSw4Q0FBaUI7QUFPOUIsSUFBWSxZQXNEWDtBQXRERCxXQUFZLFlBQVk7SUFDcEIsVUFBVTtJQUNWLHVEQUFZLENBQUE7SUFDWixVQUFVO0lBQ1YseURBQWEsQ0FBQTtJQUNiLFVBQVU7SUFDVix5REFBYSxDQUFBO0lBRWIsVUFBVTtJQUNWLCtEQUFnQixDQUFBO0lBQ2hCLFFBQVE7SUFDUix1REFBWSxDQUFBO0lBRVosVUFBVTtJQUNWLGlFQUFpQixDQUFBO0lBRWpCLFlBQVk7SUFDWix5REFBYSxDQUFBO0lBRWIsWUFBWTtJQUNaLHlFQUFxQixDQUFBO0lBRXJCLFVBQVU7SUFDVix1RUFBb0IsQ0FBQTtJQUVwQixVQUFVO0lBQ1YsOERBQWdCLENBQUE7SUFFaEIsVUFBVTtJQUNWLGdFQUFpQixDQUFBO0lBQ2pCLFlBQVk7SUFDWix3REFBYSxDQUFBO0lBQ2IsU0FBUztJQUNULDhEQUFnQixDQUFBO0lBQ2hCLFlBQVk7SUFDWix3REFBYSxDQUFBO0lBQ2IsVUFBVTtJQUNWLDREQUFlLENBQUE7SUFDZixZQUFZO0lBQ1osZ0VBQWlCLENBQUE7SUFDakIsYUFBYTtJQUNiLDBEQUFjLENBQUE7SUFDZCxVQUFVO0lBQ1YsMERBQWMsQ0FBQTtJQUNkLFNBQVM7SUFDVCwwREFBYyxDQUFBO0lBQ2QsWUFBWTtJQUNaLHNFQUFvQixDQUFBO0lBQ3BCLFVBQVU7SUFDViw4RUFBd0IsQ0FBQTtJQUV4Qiw0REFBZ0IsQ0FBQTtJQUVoQix5REFBZSxDQUFBO0FBQ25CLENBQUMsRUF0RFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFzRHZCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEFjdGl2aXR5Q29uc3RhbnRzIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgU0hPV19BQ1RfV0FJVFRJTkcgOiBzdHJpbmcgPSBcIlNIT1dfQUNUX1dBSVRUSU5HXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIEhJREVfQUNUX1dBSVRUSU5HIDogc3RyaW5nID0gXCJISURFX0FDVF9XQUlUVElOR1wiO1xyXG4gICAgcHVibGljIHN0YXRpYyBISURFX1JFRF9QT1JUIDogc3RyaW5nID0gXCJISURFX1JFRF9QT1JUXCI7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZW51bSBBY3Rpdml0eVR5cGUge1xyXG4gICAgLyoq5rOo5YaM5rS75YqoICovXHJcbiAgICByZWdpc3RlciA9IDEsXHJcbiAgICAvKirnu5HlrprmiYvmnLogKi9cclxuICAgIGJpbmRQaG9uZSA9IDIsXHJcbiAgICAvKirlpKnlpKnpgIHnpo8gKi9cclxuICAgIGxvZ2luR2l2ZSA9IDMsXHJcblxyXG4gICAgLyoq5YWF5YC86L+U5YipICovXHJcbiAgICByZWNoYXJnZUdpZnQgPSA0LFxyXG4gICAgLyoq6L2s55uYICovXHJcbiAgICB6aHVhbnBhbiA9IDUsXHJcblxyXG4gICAgLyoq5YiG5Lqr6YCB6YeRICovXHJcbiAgICBzaGFyZUFjdGl2aXR5ID0gNixcclxuXHJcbiAgICAvKirmr4/ml6XmtYHmsLTov5TliKkgKi9cclxuICAgIGJldFJlZnVuZCA9IDcsXHJcblxyXG4gICAgLyoq5q+P5pel6aaW5YWF6L+U5YipICovXHJcbiAgICBkYWlseVJlY2hhcmdlR2lmdCA9IDgsXHJcblxyXG4gICAgLyoq546p5a625Y+s5ZueICovXHJcbiAgICBiYWNrR2FtZUFjdGl2aXR5ID0gOSxcclxuXHJcbiAgICAvKirmjqjlub/pgIHph5EgKi9cclxuICAgIHNwcmVhZEF3YXJkID0gMTAsXHJcblxyXG4gICAgLyoq5LiJ5pel562+5YiwICovXHJcbiAgICBzaWduQWN0aXZpdHkgPSAxMSxcclxuICAgIC8qKuiHquWKqOi1oOmAgeW9qemHkSAqL1xyXG4gICAgYXV0b0dpdmUgPSAxMixcclxuICAgIC8qKuihpeWKqemHkSAqL1xyXG4gICAgc3Vic2lkeUdpdmUgPSAxMyxcclxuICAgIC8qKuS7u+WKoeWlluWKsee6ouWMhSAqL1xyXG4gICAgdGFza0dpdmUgPSAxNCxcclxuICAgIC8qKui1oOmAgee6ouWMhSAqL1xyXG4gICAgdGFza1Jld2FyZCA9IDE1LFxyXG4gICAgLyoq5q+P5pel5YWF5YC857qi5YyFICovXHJcbiAgICByZWNoYXJnZUdpdmUgPSAxNixcclxuICAgIC8qKlZJUOWNh+e6p+WlluWKsSAqL1xyXG4gICAgdmlwUmV3YXJkID0gMTcsXHJcbiAgICAvKirmr4/ml6XnpLzph5EgKi9cclxuICAgIGRhaWx5R2lmdCA9IDE4LFxyXG4gICAgLyoq5L+d6Zmp6YeRICovXHJcbiAgICBpbnN1cmFuY2UgPSAxOSxcclxuICAgIC8qKui/nue7reWFheWAvOe6ouWMhSAqL1xyXG4gICAgZGFpbHlQYXlSZWRwYWNrID0gMjAsXHJcbiAgICAvKirpmZDml7bpppblhYUgKi9cclxuICAgIFRpbWVMaW1pdGVkQWN0aXZpdHkgPSAyMSxcclxuXHJcbiAgICBub01zZ1RpcHMgPSAxMDAwLFxyXG5cclxuICAgIHBpY3R1cmUgPSAxMDA4NlxyXG59XHJcblxyXG4iXX0=