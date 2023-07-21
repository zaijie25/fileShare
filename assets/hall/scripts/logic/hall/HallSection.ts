import WndLogin from "./ui/login/WndLogin";
import ISection from "../../framework/section/ISection";
import WndPhoneLogin from "./ui/login/WndPhoneLogin";
import LoginModel from "../hallcommon/model/LoginModel";
import HallModel from "../hallcommon/model/HallModel";
import WndHall from "./ui/hall/WndHall";
import WndRegist from "./ui/login/WndRegist";
import WndForgetPwd from "./ui/login/WndForgetPwd";
import WndMessageBox from "./ui/common/WndMessageBox";
import PersonalInfoModel from "../hallcommon/model/PersonalInfoModel";
import WndEditName from "./ui/personalInfo/WndEditName";
import ExtractModel from "../hallcommon/model/ExtractModel";
import WndaliBandConfirm from "./ui/money/ui/extractCash/WndaliBandConfirm";
import WndUnionBandConfirm from "./ui/money/ui/extractCash/WndUnionBandConfirm";
import WndRecharge from "./ui/recharge/WndRecharge";
import RechargeModel from "../hallcommon/model/RechargeModel";
import WndChangePwd from "./ui/personalInfo/WndChangePwd";
import WndBindPhone from "./ui/personalInfo/WndBindPhone";
import WndRank from "./ui/rank/WndRank";
import RankModel from "../hallcommon/model/RankModel";
import WndBankUI from "./ui/money/ui/bank/WndBankUI";
import WndBankChangePW from "./ui/money/ui/bank/WndBankChangePW";
import WndBankForgetPW from "./ui/money/ui/bank/WndBankForgetPW";
import WndBankLogin from "./ui/money/ui/bank/WndBankLogin";
import BankModel from "../hallcommon/model/BankModel";
import MsgModel from "../hallcommon/model/MsgModel";
import WndMsg from "./ui/msg/WndMsg";

import ServicerModel from "../hallcommon/model/ServicerModel";
import WndServicerUI from "./ui/serviver/WndServicerUI";
import WndRechangeBankInfo from "./ui/recharge/WndRechangeBankInfo";
import WndRechargeVipShow from "./ui/recharge/WndRechargeVipShow";
import SpreadModel from "../hallcommon/model/SpreadModel";
import WndSpread from "./ui/Spread/WndSpread";
import WndAwardDetail from "./ui/Spread/WndAwardDetail"
import WndNetWaiting from "./ui/waiting/WndNetWaiting";
import WaitingModel from "../hallcommon/model/WaitingModel";
import WndLowerSearch from "./ui/Spread/WndLowerSearch";
import WndNetReconnect from "./ui/waiting/WndNetReconnect";
import WndRebateGet from "./ui/rebate/WndRebateGet";
import BindingGiftModel from "../hallcommon/model/BindingGiftModel";
import WndBindingGift from "./ui/BindingGift/WndBindingGift";
import WndSpreadCenter from "./ui/Spread/WndSpreadCenter";
import WndAwardRecord from "./ui/Spread/WndAwardRecord";
import WndFeedback from "./ui/Feedback/WndFeedback";
import FeedbackModel from "../hallcommon/model/FeedbackModel";
import WndBackUpGame from "./ui/BackUpGameUI/WndBackUpGame";
import RechargeGiftModel from "../hallcommon/model/RechargeGiftModel";
import ZhuanpanModel from "../hallcommon/model/ZhuanpanModel";
import WndScreenPortraitNotice from "./ui/common/WndScreenPortraitNotice";
import PlayerInfoModel from "../hallcommon/model/PlayerInfoModel";
import WndPlayerInfo from "./ui/playerInfo/WndPlayerInfo";
import WndNewPlayerInfo from "./ui/playerInfo/WndNewPlayerInfo";
import WndChooseHead from "./ui/playerInfo/WndChooseHead";
import WndVip from "./ui/playerInfo/WndVip";
import WndToggleAccount from "./ui/personalInfo/WndToggleAccount";
import WndActivityCenter from "./ui/Activity/WndActivityCenter";
import ShareModel from "../hallcommon/model/ShareModel";
import WndShare from "./ui/hall/WndShare";
import WndRechangeTip from "./ui/recharge/WndRechangeTip";
import RechagreTipModel from "../hallcommon/model/RechagreTipModel";
import WndGameMaintainUI from "../core/loadingMVC/WndGameMaintainUI";
import WndDownLoadApkUI from "../core/loadingMVC/WndDownLoadApkUI";
// import WndSpreadUnlimited from "./ui/Spread/WndSpreadUnlimited";
// import WndCommissionlist from "./ui/Spread/WndCommissionlist";
// import WndCashBackDayUI from "./ui/CashBack/WndCashBackDayUI";
// import WndCashBackTipUI from "./ui/CashBack/WndCashBackTipUI";
import CashBackModel from "../hallcommon/model/CashBackModel";
import WndGameUpdateUI from "../core/loadingMVC/WndGameUpdateUI";
import WndVipQuickPayChat from "./ui/recharge/WndVipQuickPayChat";
import WndChatImage from "./ui/recharge/WndChatImage";
import WndGameRestoreUI from "../core/loadingMVC/WndGameRestoreUI";
import WndBankRechange from "./ui/recharge/WndBankRechange";
import WndAliPayRechange from "./ui/recharge/WndAliPayRechange";
import WndWeChatRechange from "./ui/recharge/WndWeChatRechange";
import WndDailyRechargeGift from "./ui/Activity/DailyRecharge/WndDailyRechargeGift";
import WndOverseasBandConfirm from "./ui/money/ui/extractCash/WndOverseasBandConfirm";
import CommisionModel from "../hallcommon/model/CommisionModel";
import SignActivityModel from "../hallcommon/model/SignActivityModel";
import WndGameLobbyShell from "./ui/ChooseRoom/WndGameLobbyShell";
import WndRedEnvelope from "./ui/rebate/WndRedEnvelope";
import WndHallRedEnvelope from "./ui/rebate/WndHallRedEnvelope";
import WndDailyCashBackUI from "./ui/CashBack/WndDailyCashBackUI";
import WndDailyGiftMoneyUI from "./ui/DailyGiftMoney/WndDailyGiftMoneyUI";
import WndGiftMoneyListUI from "./ui/DailyGiftMoney/WndGiftMoneyListUI";
import WndVip2 from "./ui/playerInfo/WndVip2";
import WndGetRedEnvelope from "./ui/rebate/WndGetRedEnvelope";
import WndDailyRedEnvelope from "./ui/rebate/WndDailyRedEnvelope";
import WndVip3 from "./ui/playerInfo/WndVip3";
import WndVipRule from "./ui/playerInfo/WndVipRule";

export default class HallSection implements ISection
{

    public isInit:boolean = false;
    public declareModel()
    {
        new LoginModel();
        new HallModel();
        new PersonalInfoModel();
        new RechargeModel();

        new RankModel();
        new ExtractModel();
        new BankModel();
        new MsgModel();
        new FeedbackModel();

        new ServicerModel();
        new SpreadModel();

        new WaitingModel();

        new BindingGiftModel();

        new RechargeGiftModel();
        new ZhuanpanModel();
        new PlayerInfoModel();
        new ShareModel();
        new RechagreTipModel();

        new CashBackModel()
        new CommisionModel()
        //new SignActivityModel()
    }

    public declareWnd()
    {
        new WndLogin();
        new WndPhoneLogin();
        new WndHall();
        new WndRegist();
        new WndForgetPwd();
        new WndMessageBox();
        new WndToggleAccount();
        new WndEditName();
        new WndaliBandConfirm();
        new WndUnionBandConfirm();
        new WndRank();
        new WndChangePwd();
        new WndBindPhone();
        new WndRecharge();
        new WndRechangeBankInfo();
        new WndRechargeVipShow();
        new WndBankLogin();
        new WndBankChangePW();
        new WndBankForgetPW();
        new WndBankUI();
        new WndMsg();
        new WndServicerUI();
        new WndFeedback();//反馈
        new WndSpread()
        new WndAwardDetail();
        // new WndSpreadUnlimited();
        new WndNetWaiting();
        new WndNetReconnect();
        new WndLowerSearch();
        new WndRebateGet();
        new WndRedEnvelope();
        new WndHallRedEnvelope();
        new WndGetRedEnvelope();
        new WndDailyRedEnvelope();
        new WndBindingGift();
        new WndSpreadCenter();
        new WndAwardRecord();
        // new WndCommissionlist();
        new WndBackUpGame();
        new WndScreenPortraitNotice();
        new WndActivityCenter();
        new WndPlayerInfo();
        new WndNewPlayerInfo();
        new WndChooseHead();
        // new WndVip();
        // new WndVip2();
     //
        new WndVip3()
        new WndVipRule();
        new WndShare();
        new WndRechangeTip();
        new WndGameMaintainUI();
        new WndDownLoadApkUI();
        new WndDailyCashBackUI();
        new WndDailyGiftMoneyUI();
        new WndGiftMoneyListUI();
        new WndGameUpdateUI();
        new WndVipQuickPayChat();
        new WndChatImage()
        new WndBankRechange()
        new WndAliPayRechange()
        new WndWeChatRechange()
        new WndGameRestoreUI()
        new WndDailyRechargeGift()
        new WndOverseasBandConfirm()
        //new WndSignActivity()
        new WndGameLobbyShell()
    }

    public loadLanguage()
    {
        Global.Language.registLanguage("hall/config/language");
    }

    public init(){}
}