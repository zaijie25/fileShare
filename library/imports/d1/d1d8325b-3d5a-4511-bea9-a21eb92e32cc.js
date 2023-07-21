"use strict";
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