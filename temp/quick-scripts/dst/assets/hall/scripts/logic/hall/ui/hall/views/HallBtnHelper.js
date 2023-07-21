
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/hall/views/HallBtnHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd1d83JbPVpFEb6poh65LjLM', 'HallBtnHelper');
// hall/scripts/logic/hall/ui/hall/views/HallBtnHelper.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServicerModel_1 = require("../../../../hallcommon/model/ServicerModel");
var ActivityConstants_1 = require("../../Activity/ActivityConstants");
var HallBtnHelper = /** @class */ (function () {
    function HallBtnHelper() {
    }
    /** 个人信息打开逻辑 （头像点击） */
    HallBtnHelper.WndPersonalInfoOpen = function () {
        Global.UI.show("WndPlayerInfo");
    };
    /**游戏备份打开逻辑 */
    HallBtnHelper.WndBackUpOpen = function () {
        Global.UI.show("WndBackUpGame");
    };
    /** 推广界面打开逻辑 */
    HallBtnHelper.WndSpreadCenterOpen = function () {
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndSpread");
        Global.UI.show("WndSpread");
    };
    /**财神到打开逻辑 */
    HallBtnHelper.WndCommision = function () {
        Global.UI.show("WndCommision");
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndCommision");
    };
    //打开红包
    HallBtnHelper.WndHongBaoOpen = function () {
        Global.UI.show("WndHallRedEnvelope");
    };
    //打开连续充值红包
    HallBtnHelper.WndDailyHongBaoOpen = function () {
        Global.UI.show("WndDailyRedEnvelope");
    };
    /**
     * 打开转盘
     */
    HallBtnHelper.WndLuckyDrawOpen = function () {
        Global.UI.show("WndTurntableView");
    };
    /**
    * 打开转盘
    */
    HallBtnHelper.WndSpreadGiftOpen = function () {
        Global.UI.show("WndSpreadGiftActivityView");
    };
    /** 排行榜打开逻辑 */
    HallBtnHelper.WndRankOpen = function () {
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndRank");
        Global.UI.show("WndRank");
    };
    // public static WndMusicOpen()
    // {
    // Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndMusicRadio")
    // Global.UI.show("WndMusicRadio");
    // }
    /** 提现打开逻辑 */
    HallBtnHelper.WndExchangeCashOpen = function () {
        var model = Global.ModelManager.getModel("ExtractModel");
        model.IntoWnd();
    };
    /** 银行打开逻辑 */
    HallBtnHelper.WndBankOpen = function () {
        Global.ModelManager.getModel("BankModel").IntoWnd();
    };
    /** 消息/邮箱 打开逻辑 */
    HallBtnHelper.WndMailOpen = function () {
        // Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndMsg")
        Global.UI.show("WndMsg");
    };
    /** 活动打开逻辑 */
    HallBtnHelper.WndActivityOpen = function () {
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndActivityCenter");
        Global.UI.show("WndActivityCenter");
    };
    /** 客服打开逻辑 */
    HallBtnHelper.WndServiceOpen = function () {
        // Global.UI.show("WndServicerUI");
        // cc.sys.openURL(Global.Setting.Urls.onlineService);
        // Global.UI.show("WndFeedback");
        Global.ModelManager.getModel("ServicerModel").enterCustomerService(ServicerModel_1.CustomerEntranceType.HallService);
    };
    /** 充值打开逻辑 */
    HallBtnHelper.WndRechargeOpen = function () {
        //Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndRecharge")
        Global.UI.show("WndRecharge");
    };
    HallBtnHelper.ShowActivity = function (act_type) {
        switch (act_type) {
            case ActivityConstants_1.ActivityType.zhuanpan:
                HallBtnHelper.WndLuckyDrawOpen();
                break;
            case ActivityConstants_1.ActivityType.dailyRechargeGift:
                Global.UI.show("WndDailyRechargeGift");
                break;
            case ActivityConstants_1.ActivityType.dailyPayRedpack:
                HallBtnHelper.WndDailyHongBaoOpen();
                break;
            case ActivityConstants_1.ActivityType.rechargeGive:
                HallBtnHelper.WndHongBaoOpen();
                break;
            case ActivityConstants_1.ActivityType.TimeLimitedActivity:
                Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndTimeLimitedRechargeGift");
                Global.UI.show("WndTimeLimitedRechargeGift");
                break;
            case ActivityConstants_1.ActivityType.spreadAward:
                HallBtnHelper.WndSpreadGiftOpen();
                break;
            case ActivityConstants_1.ActivityType.shareActivity:
                Global.UI.show("WndShare");
                Global.Audio.playAudioSource("hall/sound/sharemoney");
                break;
            case ActivityConstants_1.ActivityType.dailyGift:
                Global.UI.show("WndDailyGiftMoneyUI");
                break;
            case ActivityConstants_1.ActivityType.betRefund:
                Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndDailyCashBackUI");
                // Global.UI.show("WndCashBackDayUI")
                Global.UI.show("WndDailyCashBackUI");
                break;
            default:
                break;
        }
    };
    return HallBtnHelper;
}());
exports.default = HallBtnHelper;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxoYWxsXFx2aWV3c1xcSGFsbEJ0bkhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRFQUFrRjtBQUNsRixzRUFBZ0U7QUFFaEU7SUFBQTtJQXFKQSxDQUFDO0lBbkpHLHNCQUFzQjtJQUNSLGlDQUFtQixHQUFqQztRQUVJLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFHRCxjQUFjO0lBQ0EsMkJBQWEsR0FBM0I7UUFDSSxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0lBQ0QsZUFBZTtJQUNELGlDQUFtQixHQUFqQztRQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUM3RCxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUVoQyxDQUFDO0lBRUQsYUFBYTtJQUNDLDBCQUFZLEdBQTFCO1FBQ0ksTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDOUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFDLGNBQWMsQ0FBQyxDQUFBO0lBQ25FLENBQUM7SUFJRCxNQUFNO0lBQ1EsNEJBQWMsR0FBNUI7UUFDSSxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0lBQ3hDLENBQUM7SUFDRCxVQUFVO0lBQ0ksaUNBQW1CLEdBQWpDO1FBQ0ksTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0lBQ0Q7O09BRUc7SUFDVyw4QkFBZ0IsR0FBOUI7UUFD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SSxDQUFDLFVBQVUsQ0FBQyxDQUFBO2dCQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO2dCQUNyRCxNQUFLO1lBQ1QsS0FBSyxnQ0FBWSxDQUFDLFNBQVM7Z0JBQ3ZCLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUE7Z0JBQ3JDLE1BQUs7WUFDVCxLQUFLLGdDQUFZLENBQUMsU0FBUztnQkFDdkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLG9CQUFvQixDQUFDLENBQUE7Z0JBQ3RFLHFDQUFxQztnQkFDckMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtnQkFDcEMsTUFBSztZQUNUO2dCQUNJLE1BQU07U0FDYjtJQUNMLENBQUM7SUFRTCxvQkFBQztBQUFELENBckpBLEFBcUpDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDdXN0b21lckVudHJhbmNlVHlwZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1NlcnZpY2VyTW9kZWxcIjtcclxuaW1wb3J0IHsgQWN0aXZpdHlUeXBlIH0gZnJvbSBcIi4uLy4uL0FjdGl2aXR5L0FjdGl2aXR5Q29uc3RhbnRzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYWxsQnRuSGVscGVyIHtcclxuXHJcbiAgICAvKiog5Liq5Lq65L+h5oGv5omT5byA6YC76L6RIO+8iOWktOWDj+eCueWHu++8iSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBXbmRQZXJzb25hbEluZm9PcGVuKClcclxuICAgIHtcclxuICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZFBsYXllckluZm9cIik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKua4uOaIj+Wkh+S7veaJk+W8gOmAu+i+kSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBXbmRCYWNrVXBPcGVuKCkge1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kQmFja1VwR2FtZVwiKVxyXG4gICAgfVxyXG4gICAgLyoqIOaOqOW5v+eVjOmdouaJk+W8gOmAu+i+kSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBXbmRTcHJlYWRDZW50ZXJPcGVuKCkge1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5TSE9XX05FVF9XQUlUSU5HLCBcIlduZFNwcmVhZFwiKVxyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kU3ByZWFkXCIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKirotKLnpZ7liLDmiZPlvIDpgLvovpEgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgV25kQ29tbWlzaW9uKCkge1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kQ29tbWlzaW9uXCIpXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNIT1dfTkVUX1dBSVRJTkcsXCJXbmRDb21taXNpb25cIilcclxuICAgIH1cclxuXHJcbiAgIFxyXG5cclxuICAgIC8v5omT5byA57qi5YyFXHJcbiAgICBwdWJsaWMgc3RhdGljIFduZEhvbmdCYW9PcGVuKCkge1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kSGFsbFJlZEVudmVsb3BlXCIpXHJcbiAgICB9XHJcbiAgICAvL+aJk+W8gOi/nue7reWFheWAvOe6ouWMhVxyXG4gICAgcHVibGljIHN0YXRpYyBXbmREYWlseUhvbmdCYW9PcGVuKCkge1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kRGFpbHlSZWRFbnZlbG9wZVwiKVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmiZPlvIDovaznm5hcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBXbmRMdWNreURyYXdPcGVuKCkge1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kVHVybnRhYmxlVmlld1wiKVxyXG4gICAgfVxyXG5cclxuICAgICAvKipcclxuICAgICAqIOaJk+W8gOi9rOebmFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFduZFNwcmVhZEdpZnRPcGVuKCkge1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kU3ByZWFkR2lmdEFjdGl2aXR5Vmlld1wiKVxyXG4gICAgfVxyXG4gICAgLyoqIOaOkuihjOamnOaJk+W8gOmAu+i+kSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBXbmRSYW5rT3BlbigpXHJcbiAgICB7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNIT1dfTkVUX1dBSVRJTkcsIFwiV25kUmFua1wiKVxyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kUmFua1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwdWJsaWMgc3RhdGljIFduZE11c2ljT3BlbigpXHJcbiAgICAvLyB7XHJcbiAgICAgICAgLy8gR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNIT1dfTkVUX1dBSVRJTkcsIFwiV25kTXVzaWNSYWRpb1wiKVxyXG4gICAgICAgIC8vIEdsb2JhbC5VSS5zaG93KFwiV25kTXVzaWNSYWRpb1wiKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvKiog5o+Q546w5omT5byA6YC76L6RICovXHJcbiAgICBwdWJsaWMgc3RhdGljICBXbmRFeGNoYW5nZUNhc2hPcGVuKClcclxuICAgIHtcclxuICAgICAgICB2YXIgbW9kZWwgPSBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiRXh0cmFjdE1vZGVsXCIpO1xyXG4gICAgICAgIG1vZGVsLkludG9XbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6ZO26KGM5omT5byA6YC76L6RICovXHJcbiAgICBwdWJsaWMgc3RhdGljICBXbmRCYW5rT3BlbigpXHJcbiAgICB7XHJcbiAgICAgICAgR2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIkJhbmtNb2RlbFwiKS5JbnRvV25kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOa2iOaBry/pgq7nrrEg5omT5byA6YC76L6RICovXHJcbiAgICBwdWJsaWMgc3RhdGljICBXbmRNYWlsT3BlbigpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNIT1dfTkVUX1dBSVRJTkcsIFwiV25kTXNnXCIpXHJcbiAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRNc2dcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOa0u+WKqOaJk+W8gOmAu+i+kSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyAgV25kQWN0aXZpdHlPcGVuKClcclxuICAgIHtcclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuU0hPV19ORVRfV0FJVElORyxcIlduZEFjdGl2aXR5Q2VudGVyXCIpXHJcbiAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRBY3Rpdml0eUNlbnRlclwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5a6i5pyN5omT5byA6YC76L6RICovXHJcbiAgICBwdWJsaWMgc3RhdGljICBXbmRTZXJ2aWNlT3BlbigpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gR2xvYmFsLlVJLnNob3coXCJXbmRTZXJ2aWNlclVJXCIpO1xyXG4gICAgICAgIC8vIGNjLnN5cy5vcGVuVVJMKEdsb2JhbC5TZXR0aW5nLlVybHMub25saW5lU2VydmljZSk7XHJcbiAgICAgICAgLy8gR2xvYmFsLlVJLnNob3coXCJXbmRGZWVkYmFja1wiKTtcclxuICAgICAgICBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiU2VydmljZXJNb2RlbFwiKS5lbnRlckN1c3RvbWVyU2VydmljZShDdXN0b21lckVudHJhbmNlVHlwZS5IYWxsU2VydmljZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOWFheWAvOaJk+W8gOmAu+i+kSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyAgV25kUmVjaGFyZ2VPcGVuKClcclxuICAgIHtcclxuICAgICAgICAvL0dsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5TSE9XX05FVF9XQUlUSU5HLCBcIlduZFJlY2hhcmdlXCIpXHJcbiAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRSZWNoYXJnZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFNob3dBY3Rpdml0eShhY3RfdHlwZSkge1xyXG4gICAgICAgIHN3aXRjaCAoYWN0X3R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBBY3Rpdml0eVR5cGUuemh1YW5wYW46XHJcbiAgICAgICAgICAgICAgICBIYWxsQnRuSGVscGVyLlduZEx1Y2t5RHJhd09wZW4oKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQWN0aXZpdHlUeXBlLmRhaWx5UmVjaGFyZ2VHaWZ0OlxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmREYWlseVJlY2hhcmdlR2lmdFwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgQWN0aXZpdHlUeXBlLmRhaWx5UGF5UmVkcGFjazpcclxuICAgICAgICAgICAgICAgIEhhbGxCdG5IZWxwZXIuV25kRGFpbHlIb25nQmFvT3BlbigpXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlIEFjdGl2aXR5VHlwZS5yZWNoYXJnZUdpdmU6XHJcbiAgICAgICAgICAgICAgICBIYWxsQnRuSGVscGVyLlduZEhvbmdCYW9PcGVuKClcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgQWN0aXZpdHlUeXBlLlRpbWVMaW1pdGVkQWN0aXZpdHk6XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuU0hPV19ORVRfV0FJVElORywgXCJXbmRUaW1lTGltaXRlZFJlY2hhcmdlR2lmdFwiKVxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRUaW1lTGltaXRlZFJlY2hhcmdlR2lmdFwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgQWN0aXZpdHlUeXBlLnNwcmVhZEF3YXJkOlxyXG4gICAgICAgICAgICAgICAgSGFsbEJ0bkhlbHBlci5XbmRTcHJlYWRHaWZ0T3BlbigpXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlIEFjdGl2aXR5VHlwZS5zaGFyZUFjdGl2aXR5OlxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRTaGFyZVwiKVxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlBdWRpb1NvdXJjZShcImhhbGwvc291bmQvc2hhcmVtb25leVwiKVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSBBY3Rpdml0eVR5cGUuZGFpbHlHaWZ0OlxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmREYWlseUdpZnRNb25leVVJXCIpXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlIEFjdGl2aXR5VHlwZS5iZXRSZWZ1bmQ6XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuU0hPV19ORVRfV0FJVElORywgXCJXbmREYWlseUNhc2hCYWNrVUlcIilcclxuICAgICAgICAgICAgICAgIC8vIEdsb2JhbC5VSS5zaG93KFwiV25kQ2FzaEJhY2tEYXlVSVwiKVxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmREYWlseUNhc2hCYWNrVUlcIilcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOi/lOWIqeaJk+W8gOmAu+i+kSAqL1xyXG4gICAgLy8gcHVibGljIHN0YXRpYyAgV25kUmViYXRlT3BlbigpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRSZWJhdGVcIik7XHJcbiAgICAvLyB9XHJcblxyXG59XHJcbiJdfQ==