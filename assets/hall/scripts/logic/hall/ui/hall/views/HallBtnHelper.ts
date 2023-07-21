import { CustomerEntranceType } from "../../../../hallcommon/model/ServicerModel";
import { ActivityType } from "../../Activity/ActivityConstants";

export default class HallBtnHelper {

    /** 个人信息打开逻辑 （头像点击） */
    public static WndPersonalInfoOpen()
    {
        Global.UI.show("WndPlayerInfo");
    }


    /**游戏备份打开逻辑 */
    public static WndBackUpOpen() {
        Global.UI.show("WndBackUpGame")
    }
    /** 推广界面打开逻辑 */
    public static WndSpreadCenterOpen() {
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndSpread")
        Global.UI.show("WndSpread");

    }

    /**财神到打开逻辑 */
    public static WndCommision() {
        Global.UI.show("WndCommision")
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING,"WndCommision")
    }

   

    //打开红包
    public static WndHongBaoOpen() {
        Global.UI.show("WndHallRedEnvelope")
    }
    //打开连续充值红包
    public static WndDailyHongBaoOpen() {
        Global.UI.show("WndDailyRedEnvelope")
    }
    /**
     * 打开转盘
     */
    public static WndLuckyDrawOpen() {
        Global.UI.show("WndTurntableView")
    }

     /**
     * 打开转盘
     */
    public static WndSpreadGiftOpen() {
        Global.UI.show("WndSpreadGiftActivityView")
    }
    /** 排行榜打开逻辑 */
    public static WndRankOpen()
    {
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndRank")
        Global.UI.show("WndRank");
    }

    // public static WndMusicOpen()
    // {
        // Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndMusicRadio")
        // Global.UI.show("WndMusicRadio");
    // }

    /** 提现打开逻辑 */
    public static  WndExchangeCashOpen()
    {
        var model = Global.ModelManager.getModel("ExtractModel");
        model.IntoWnd();
    }

    /** 银行打开逻辑 */
    public static  WndBankOpen()
    {
        Global.ModelManager.getModel("BankModel").IntoWnd();
    }

    /** 消息/邮箱 打开逻辑 */
    public static  WndMailOpen()
    {
        // Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndMsg")
        Global.UI.show("WndMsg");
    }

    /** 活动打开逻辑 */
    public static  WndActivityOpen()
    {
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING,"WndActivityCenter")
        Global.UI.show("WndActivityCenter");
    }

    /** 客服打开逻辑 */
    public static  WndServiceOpen()
    {
        // Global.UI.show("WndServicerUI");
        // cc.sys.openURL(Global.Setting.Urls.onlineService);
        // Global.UI.show("WndFeedback");
        Global.ModelManager.getModel("ServicerModel").enterCustomerService(CustomerEntranceType.HallService);
    }

    /** 充值打开逻辑 */
    public static  WndRechargeOpen()
    {
        //Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndRecharge")
        Global.UI.show("WndRecharge");
    }

    public static ShowActivity(act_type) {
        switch (act_type) {
            case ActivityType.zhuanpan:
                HallBtnHelper.WndLuckyDrawOpen()
                break;
            case ActivityType.dailyRechargeGift:
                Global.UI.show("WndDailyRechargeGift");
                break
            case ActivityType.dailyPayRedpack:
                HallBtnHelper.WndDailyHongBaoOpen()
                break
            case ActivityType.rechargeGive:
                HallBtnHelper.WndHongBaoOpen()
                break
            case ActivityType.TimeLimitedActivity:
                Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndTimeLimitedRechargeGift")
                Global.UI.show("WndTimeLimitedRechargeGift");
                break
            case ActivityType.spreadAward:
                HallBtnHelper.WndSpreadGiftOpen()
                break
            case ActivityType.shareActivity:
                Global.UI.show("WndShare")
                Global.Audio.playAudioSource("hall/sound/sharemoney")
                break
            case ActivityType.dailyGift:
                Global.UI.show("WndDailyGiftMoneyUI")
                break
            case ActivityType.betRefund:
                Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndDailyCashBackUI")
                // Global.UI.show("WndCashBackDayUI")
                Global.UI.show("WndDailyCashBackUI")
                break
            default:
                break;
        }
    }

    /** 返利打开逻辑 */
    // public static  WndRebateOpen()
    // {
    //     Global.UI.show("WndRebate");
    // }

}
