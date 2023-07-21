
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/HallSection.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0f2e7GOxqVHb4J7/K94oRhR', 'HallSection');
// hall/scripts/logic/hall/HallSection.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WndLogin_1 = require("./ui/login/WndLogin");
var WndPhoneLogin_1 = require("./ui/login/WndPhoneLogin");
var LoginModel_1 = require("../hallcommon/model/LoginModel");
var HallModel_1 = require("../hallcommon/model/HallModel");
var WndHall_1 = require("./ui/hall/WndHall");
var WndRegist_1 = require("./ui/login/WndRegist");
var WndForgetPwd_1 = require("./ui/login/WndForgetPwd");
var WndMessageBox_1 = require("./ui/common/WndMessageBox");
var PersonalInfoModel_1 = require("../hallcommon/model/PersonalInfoModel");
var WndEditName_1 = require("./ui/personalInfo/WndEditName");
var ExtractModel_1 = require("../hallcommon/model/ExtractModel");
var WndaliBandConfirm_1 = require("./ui/money/ui/extractCash/WndaliBandConfirm");
var WndUnionBandConfirm_1 = require("./ui/money/ui/extractCash/WndUnionBandConfirm");
var WndRecharge_1 = require("./ui/recharge/WndRecharge");
var RechargeModel_1 = require("../hallcommon/model/RechargeModel");
var WndChangePwd_1 = require("./ui/personalInfo/WndChangePwd");
var WndBindPhone_1 = require("./ui/personalInfo/WndBindPhone");
var WndRank_1 = require("./ui/rank/WndRank");
var RankModel_1 = require("../hallcommon/model/RankModel");
var WndBankUI_1 = require("./ui/money/ui/bank/WndBankUI");
var WndBankChangePW_1 = require("./ui/money/ui/bank/WndBankChangePW");
var WndBankForgetPW_1 = require("./ui/money/ui/bank/WndBankForgetPW");
var WndBankLogin_1 = require("./ui/money/ui/bank/WndBankLogin");
var BankModel_1 = require("../hallcommon/model/BankModel");
var MsgModel_1 = require("../hallcommon/model/MsgModel");
var WndMsg_1 = require("./ui/msg/WndMsg");
var ServicerModel_1 = require("../hallcommon/model/ServicerModel");
var WndServicerUI_1 = require("./ui/serviver/WndServicerUI");
var WndRechangeBankInfo_1 = require("./ui/recharge/WndRechangeBankInfo");
var WndRechargeVipShow_1 = require("./ui/recharge/WndRechargeVipShow");
var SpreadModel_1 = require("../hallcommon/model/SpreadModel");
var WndSpread_1 = require("./ui/Spread/WndSpread");
var WndAwardDetail_1 = require("./ui/Spread/WndAwardDetail");
var WndNetWaiting_1 = require("./ui/waiting/WndNetWaiting");
var WaitingModel_1 = require("../hallcommon/model/WaitingModel");
var WndLowerSearch_1 = require("./ui/Spread/WndLowerSearch");
var WndNetReconnect_1 = require("./ui/waiting/WndNetReconnect");
var WndRebateGet_1 = require("./ui/rebate/WndRebateGet");
var BindingGiftModel_1 = require("../hallcommon/model/BindingGiftModel");
var WndBindingGift_1 = require("./ui/BindingGift/WndBindingGift");
var WndSpreadCenter_1 = require("./ui/Spread/WndSpreadCenter");
var WndAwardRecord_1 = require("./ui/Spread/WndAwardRecord");
var WndFeedback_1 = require("./ui/Feedback/WndFeedback");
var FeedbackModel_1 = require("../hallcommon/model/FeedbackModel");
var WndBackUpGame_1 = require("./ui/BackUpGameUI/WndBackUpGame");
var RechargeGiftModel_1 = require("../hallcommon/model/RechargeGiftModel");
var ZhuanpanModel_1 = require("../hallcommon/model/ZhuanpanModel");
var WndScreenPortraitNotice_1 = require("./ui/common/WndScreenPortraitNotice");
var PlayerInfoModel_1 = require("../hallcommon/model/PlayerInfoModel");
var WndPlayerInfo_1 = require("./ui/playerInfo/WndPlayerInfo");
var WndNewPlayerInfo_1 = require("./ui/playerInfo/WndNewPlayerInfo");
var WndChooseHead_1 = require("./ui/playerInfo/WndChooseHead");
var WndToggleAccount_1 = require("./ui/personalInfo/WndToggleAccount");
var WndActivityCenter_1 = require("./ui/Activity/WndActivityCenter");
var ShareModel_1 = require("../hallcommon/model/ShareModel");
var WndShare_1 = require("./ui/hall/WndShare");
var WndRechangeTip_1 = require("./ui/recharge/WndRechangeTip");
var RechagreTipModel_1 = require("../hallcommon/model/RechagreTipModel");
var WndGameMaintainUI_1 = require("../core/loadingMVC/WndGameMaintainUI");
var WndDownLoadApkUI_1 = require("../core/loadingMVC/WndDownLoadApkUI");
// import WndSpreadUnlimited from "./ui/Spread/WndSpreadUnlimited";
// import WndCommissionlist from "./ui/Spread/WndCommissionlist";
// import WndCashBackDayUI from "./ui/CashBack/WndCashBackDayUI";
// import WndCashBackTipUI from "./ui/CashBack/WndCashBackTipUI";
var CashBackModel_1 = require("../hallcommon/model/CashBackModel");
var WndGameUpdateUI_1 = require("../core/loadingMVC/WndGameUpdateUI");
var WndVipQuickPayChat_1 = require("./ui/recharge/WndVipQuickPayChat");
var WndChatImage_1 = require("./ui/recharge/WndChatImage");
var WndGameRestoreUI_1 = require("../core/loadingMVC/WndGameRestoreUI");
var WndBankRechange_1 = require("./ui/recharge/WndBankRechange");
var WndAliPayRechange_1 = require("./ui/recharge/WndAliPayRechange");
var WndWeChatRechange_1 = require("./ui/recharge/WndWeChatRechange");
var WndDailyRechargeGift_1 = require("./ui/Activity/DailyRecharge/WndDailyRechargeGift");
var WndOverseasBandConfirm_1 = require("./ui/money/ui/extractCash/WndOverseasBandConfirm");
var CommisionModel_1 = require("../hallcommon/model/CommisionModel");
var WndGameLobbyShell_1 = require("./ui/ChooseRoom/WndGameLobbyShell");
var WndRedEnvelope_1 = require("./ui/rebate/WndRedEnvelope");
var WndHallRedEnvelope_1 = require("./ui/rebate/WndHallRedEnvelope");
var WndDailyCashBackUI_1 = require("./ui/CashBack/WndDailyCashBackUI");
var WndDailyGiftMoneyUI_1 = require("./ui/DailyGiftMoney/WndDailyGiftMoneyUI");
var WndGiftMoneyListUI_1 = require("./ui/DailyGiftMoney/WndGiftMoneyListUI");
var WndGetRedEnvelope_1 = require("./ui/rebate/WndGetRedEnvelope");
var WndDailyRedEnvelope_1 = require("./ui/rebate/WndDailyRedEnvelope");
var WndVip3_1 = require("./ui/playerInfo/WndVip3");
var WndVipRule_1 = require("./ui/playerInfo/WndVipRule");
var HallSection = /** @class */ (function () {
    function HallSection() {
        this.isInit = false;
    }
    HallSection.prototype.declareModel = function () {
        new LoginModel_1.default();
        new HallModel_1.default();
        new PersonalInfoModel_1.default();
        new RechargeModel_1.default();
        new RankModel_1.default();
        new ExtractModel_1.default();
        new BankModel_1.default();
        new MsgModel_1.default();
        new FeedbackModel_1.default();
        new ServicerModel_1.default();
        new SpreadModel_1.default();
        new WaitingModel_1.default();
        new BindingGiftModel_1.default();
        new RechargeGiftModel_1.default();
        new ZhuanpanModel_1.default();
        new PlayerInfoModel_1.default();
        new ShareModel_1.default();
        new RechagreTipModel_1.default();
        new CashBackModel_1.default();
        new CommisionModel_1.default();
        //new SignActivityModel()
    };
    HallSection.prototype.declareWnd = function () {
        new WndLogin_1.default();
        new WndPhoneLogin_1.default();
        new WndHall_1.default();
        new WndRegist_1.default();
        new WndForgetPwd_1.default();
        new WndMessageBox_1.default();
        new WndToggleAccount_1.default();
        new WndEditName_1.default();
        new WndaliBandConfirm_1.default();
        new WndUnionBandConfirm_1.default();
        new WndRank_1.default();
        new WndChangePwd_1.default();
        new WndBindPhone_1.default();
        new WndRecharge_1.default();
        new WndRechangeBankInfo_1.default();
        new WndRechargeVipShow_1.default();
        new WndBankLogin_1.default();
        new WndBankChangePW_1.default();
        new WndBankForgetPW_1.default();
        new WndBankUI_1.default();
        new WndMsg_1.default();
        new WndServicerUI_1.default();
        new WndFeedback_1.default(); //反馈
        new WndSpread_1.default();
        new WndAwardDetail_1.default();
        // new WndSpreadUnlimited();
        new WndNetWaiting_1.default();
        new WndNetReconnect_1.default();
        new WndLowerSearch_1.default();
        new WndRebateGet_1.default();
        new WndRedEnvelope_1.default();
        new WndHallRedEnvelope_1.default();
        new WndGetRedEnvelope_1.default();
        new WndDailyRedEnvelope_1.default();
        new WndBindingGift_1.default();
        new WndSpreadCenter_1.default();
        new WndAwardRecord_1.default();
        // new WndCommissionlist();
        new WndBackUpGame_1.default();
        new WndScreenPortraitNotice_1.default();
        new WndActivityCenter_1.default();
        new WndPlayerInfo_1.default();
        new WndNewPlayerInfo_1.default();
        new WndChooseHead_1.default();
        // new WndVip();
        // new WndVip2();
        //
        new WndVip3_1.default();
        new WndVipRule_1.default();
        new WndShare_1.default();
        new WndRechangeTip_1.default();
        new WndGameMaintainUI_1.default();
        new WndDownLoadApkUI_1.default();
        new WndDailyCashBackUI_1.default();
        new WndDailyGiftMoneyUI_1.default();
        new WndGiftMoneyListUI_1.default();
        new WndGameUpdateUI_1.default();
        new WndVipQuickPayChat_1.default();
        new WndChatImage_1.default();
        new WndBankRechange_1.default();
        new WndAliPayRechange_1.default();
        new WndWeChatRechange_1.default();
        new WndGameRestoreUI_1.default();
        new WndDailyRechargeGift_1.default();
        new WndOverseasBandConfirm_1.default();
        //new WndSignActivity()
        new WndGameLobbyShell_1.default();
    };
    HallSection.prototype.loadLanguage = function () {
        Global.Language.registLanguage("hall/config/language");
    };
    HallSection.prototype.init = function () { };
    return HallSection;
}());
exports.default = HallSection;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXEhhbGxTZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQTJDO0FBRTNDLDBEQUFxRDtBQUNyRCw2REFBd0Q7QUFDeEQsMkRBQXNEO0FBQ3RELDZDQUF3QztBQUN4QyxrREFBNkM7QUFDN0Msd0RBQW1EO0FBQ25ELDJEQUFzRDtBQUN0RCwyRUFBc0U7QUFDdEUsNkRBQXdEO0FBQ3hELGlFQUE0RDtBQUM1RCxpRkFBNEU7QUFDNUUscUZBQWdGO0FBQ2hGLHlEQUFvRDtBQUNwRCxtRUFBOEQ7QUFDOUQsK0RBQTBEO0FBQzFELCtEQUEwRDtBQUMxRCw2Q0FBd0M7QUFDeEMsMkRBQXNEO0FBQ3RELDBEQUFxRDtBQUNyRCxzRUFBaUU7QUFDakUsc0VBQWlFO0FBQ2pFLGdFQUEyRDtBQUMzRCwyREFBc0Q7QUFDdEQseURBQW9EO0FBQ3BELDBDQUFxQztBQUVyQyxtRUFBOEQ7QUFDOUQsNkRBQXdEO0FBQ3hELHlFQUFvRTtBQUNwRSx1RUFBa0U7QUFDbEUsK0RBQTBEO0FBQzFELG1EQUE4QztBQUM5Qyw2REFBdUQ7QUFDdkQsNERBQXVEO0FBQ3ZELGlFQUE0RDtBQUM1RCw2REFBd0Q7QUFDeEQsZ0VBQTJEO0FBQzNELHlEQUFvRDtBQUNwRCx5RUFBb0U7QUFDcEUsa0VBQTZEO0FBQzdELCtEQUEwRDtBQUMxRCw2REFBd0Q7QUFDeEQseURBQW9EO0FBQ3BELG1FQUE4RDtBQUM5RCxpRUFBNEQ7QUFDNUQsMkVBQXNFO0FBQ3RFLG1FQUE4RDtBQUM5RCwrRUFBMEU7QUFDMUUsdUVBQWtFO0FBQ2xFLCtEQUEwRDtBQUMxRCxxRUFBZ0U7QUFDaEUsK0RBQTBEO0FBRTFELHVFQUFrRTtBQUNsRSxxRUFBZ0U7QUFDaEUsNkRBQXdEO0FBQ3hELCtDQUEwQztBQUMxQywrREFBMEQ7QUFDMUQseUVBQW9FO0FBQ3BFLDBFQUFxRTtBQUNyRSx3RUFBbUU7QUFD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LDJCQUFpQixFQUFFLENBQUE7SUFDM0IsQ0FBQztJQUVNLGtDQUFZLEdBQW5CO1FBRUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRU0sMEJBQUksR0FBWCxjQUFjLENBQUM7SUFDbkIsa0JBQUM7QUFBRCxDQWhIQSxBQWdIQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZExvZ2luIGZyb20gXCIuL3VpL2xvZ2luL1duZExvZ2luXCI7XHJcbmltcG9ydCBJU2VjdGlvbiBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3NlY3Rpb24vSVNlY3Rpb25cIjtcclxuaW1wb3J0IFduZFBob25lTG9naW4gZnJvbSBcIi4vdWkvbG9naW4vV25kUGhvbmVMb2dpblwiO1xyXG5pbXBvcnQgTG9naW5Nb2RlbCBmcm9tIFwiLi4vaGFsbGNvbW1vbi9tb2RlbC9Mb2dpbk1vZGVsXCI7XHJcbmltcG9ydCBIYWxsTW9kZWwgZnJvbSBcIi4uL2hhbGxjb21tb24vbW9kZWwvSGFsbE1vZGVsXCI7XHJcbmltcG9ydCBXbmRIYWxsIGZyb20gXCIuL3VpL2hhbGwvV25kSGFsbFwiO1xyXG5pbXBvcnQgV25kUmVnaXN0IGZyb20gXCIuL3VpL2xvZ2luL1duZFJlZ2lzdFwiO1xyXG5pbXBvcnQgV25kRm9yZ2V0UHdkIGZyb20gXCIuL3VpL2xvZ2luL1duZEZvcmdldFB3ZFwiO1xyXG5pbXBvcnQgV25kTWVzc2FnZUJveCBmcm9tIFwiLi91aS9jb21tb24vV25kTWVzc2FnZUJveFwiO1xyXG5pbXBvcnQgUGVyc29uYWxJbmZvTW9kZWwgZnJvbSBcIi4uL2hhbGxjb21tb24vbW9kZWwvUGVyc29uYWxJbmZvTW9kZWxcIjtcclxuaW1wb3J0IFduZEVkaXROYW1lIGZyb20gXCIuL3VpL3BlcnNvbmFsSW5mby9XbmRFZGl0TmFtZVwiO1xyXG5pbXBvcnQgRXh0cmFjdE1vZGVsIGZyb20gXCIuLi9oYWxsY29tbW9uL21vZGVsL0V4dHJhY3RNb2RlbFwiO1xyXG5pbXBvcnQgV25kYWxpQmFuZENvbmZpcm0gZnJvbSBcIi4vdWkvbW9uZXkvdWkvZXh0cmFjdENhc2gvV25kYWxpQmFuZENvbmZpcm1cIjtcclxuaW1wb3J0IFduZFVuaW9uQmFuZENvbmZpcm0gZnJvbSBcIi4vdWkvbW9uZXkvdWkvZXh0cmFjdENhc2gvV25kVW5pb25CYW5kQ29uZmlybVwiO1xyXG5pbXBvcnQgV25kUmVjaGFyZ2UgZnJvbSBcIi4vdWkvcmVjaGFyZ2UvV25kUmVjaGFyZ2VcIjtcclxuaW1wb3J0IFJlY2hhcmdlTW9kZWwgZnJvbSBcIi4uL2hhbGxjb21tb24vbW9kZWwvUmVjaGFyZ2VNb2RlbFwiO1xyXG5pbXBvcnQgV25kQ2hhbmdlUHdkIGZyb20gXCIuL3VpL3BlcnNvbmFsSW5mby9XbmRDaGFuZ2VQd2RcIjtcclxuaW1wb3J0IFduZEJpbmRQaG9uZSBmcm9tIFwiLi91aS9wZXJzb25hbEluZm8vV25kQmluZFBob25lXCI7XHJcbmltcG9ydCBXbmRSYW5rIGZyb20gXCIuL3VpL3JhbmsvV25kUmFua1wiO1xyXG5pbXBvcnQgUmFua01vZGVsIGZyb20gXCIuLi9oYWxsY29tbW9uL21vZGVsL1JhbmtNb2RlbFwiO1xyXG5pbXBvcnQgV25kQmFua1VJIGZyb20gXCIuL3VpL21vbmV5L3VpL2JhbmsvV25kQmFua1VJXCI7XHJcbmltcG9ydCBXbmRCYW5rQ2hhbmdlUFcgZnJvbSBcIi4vdWkvbW9uZXkvdWkvYmFuay9XbmRCYW5rQ2hhbmdlUFdcIjtcclxuaW1wb3J0IFduZEJhbmtGb3JnZXRQVyBmcm9tIFwiLi91aS9tb25leS91aS9iYW5rL1duZEJhbmtGb3JnZXRQV1wiO1xyXG5pbXBvcnQgV25kQmFua0xvZ2luIGZyb20gXCIuL3VpL21vbmV5L3VpL2JhbmsvV25kQmFua0xvZ2luXCI7XHJcbmltcG9ydCBCYW5rTW9kZWwgZnJvbSBcIi4uL2hhbGxjb21tb24vbW9kZWwvQmFua01vZGVsXCI7XHJcbmltcG9ydCBNc2dNb2RlbCBmcm9tIFwiLi4vaGFsbGNvbW1vbi9tb2RlbC9Nc2dNb2RlbFwiO1xyXG5pbXBvcnQgV25kTXNnIGZyb20gXCIuL3VpL21zZy9XbmRNc2dcIjtcclxuXHJcbmltcG9ydCBTZXJ2aWNlck1vZGVsIGZyb20gXCIuLi9oYWxsY29tbW9uL21vZGVsL1NlcnZpY2VyTW9kZWxcIjtcclxuaW1wb3J0IFduZFNlcnZpY2VyVUkgZnJvbSBcIi4vdWkvc2Vydml2ZXIvV25kU2VydmljZXJVSVwiO1xyXG5pbXBvcnQgV25kUmVjaGFuZ2VCYW5rSW5mbyBmcm9tIFwiLi91aS9yZWNoYXJnZS9XbmRSZWNoYW5nZUJhbmtJbmZvXCI7XHJcbmltcG9ydCBXbmRSZWNoYXJnZVZpcFNob3cgZnJvbSBcIi4vdWkvcmVjaGFyZ2UvV25kUmVjaGFyZ2VWaXBTaG93XCI7XHJcbmltcG9ydCBTcHJlYWRNb2RlbCBmcm9tIFwiLi4vaGFsbGNvbW1vbi9tb2RlbC9TcHJlYWRNb2RlbFwiO1xyXG5pbXBvcnQgV25kU3ByZWFkIGZyb20gXCIuL3VpL1NwcmVhZC9XbmRTcHJlYWRcIjtcclxuaW1wb3J0IFduZEF3YXJkRGV0YWlsIGZyb20gXCIuL3VpL1NwcmVhZC9XbmRBd2FyZERldGFpbFwiXHJcbmltcG9ydCBXbmROZXRXYWl0aW5nIGZyb20gXCIuL3VpL3dhaXRpbmcvV25kTmV0V2FpdGluZ1wiO1xyXG5pbXBvcnQgV2FpdGluZ01vZGVsIGZyb20gXCIuLi9oYWxsY29tbW9uL21vZGVsL1dhaXRpbmdNb2RlbFwiO1xyXG5pbXBvcnQgV25kTG93ZXJTZWFyY2ggZnJvbSBcIi4vdWkvU3ByZWFkL1duZExvd2VyU2VhcmNoXCI7XHJcbmltcG9ydCBXbmROZXRSZWNvbm5lY3QgZnJvbSBcIi4vdWkvd2FpdGluZy9XbmROZXRSZWNvbm5lY3RcIjtcclxuaW1wb3J0IFduZFJlYmF0ZUdldCBmcm9tIFwiLi91aS9yZWJhdGUvV25kUmViYXRlR2V0XCI7XHJcbmltcG9ydCBCaW5kaW5nR2lmdE1vZGVsIGZyb20gXCIuLi9oYWxsY29tbW9uL21vZGVsL0JpbmRpbmdHaWZ0TW9kZWxcIjtcclxuaW1wb3J0IFduZEJpbmRpbmdHaWZ0IGZyb20gXCIuL3VpL0JpbmRpbmdHaWZ0L1duZEJpbmRpbmdHaWZ0XCI7XHJcbmltcG9ydCBXbmRTcHJlYWRDZW50ZXIgZnJvbSBcIi4vdWkvU3ByZWFkL1duZFNwcmVhZENlbnRlclwiO1xyXG5pbXBvcnQgV25kQXdhcmRSZWNvcmQgZnJvbSBcIi4vdWkvU3ByZWFkL1duZEF3YXJkUmVjb3JkXCI7XHJcbmltcG9ydCBXbmRGZWVkYmFjayBmcm9tIFwiLi91aS9GZWVkYmFjay9XbmRGZWVkYmFja1wiO1xyXG5pbXBvcnQgRmVlZGJhY2tNb2RlbCBmcm9tIFwiLi4vaGFsbGNvbW1vbi9tb2RlbC9GZWVkYmFja01vZGVsXCI7XHJcbmltcG9ydCBXbmRCYWNrVXBHYW1lIGZyb20gXCIuL3VpL0JhY2tVcEdhbWVVSS9XbmRCYWNrVXBHYW1lXCI7XHJcbmltcG9ydCBSZWNoYXJnZUdpZnRNb2RlbCBmcm9tIFwiLi4vaGFsbGNvbW1vbi9tb2RlbC9SZWNoYXJnZUdpZnRNb2RlbFwiO1xyXG5pbXBvcnQgWmh1YW5wYW5Nb2RlbCBmcm9tIFwiLi4vaGFsbGNvbW1vbi9tb2RlbC9aaHVhbnBhbk1vZGVsXCI7XHJcbmltcG9ydCBXbmRTY3JlZW5Qb3J0cmFpdE5vdGljZSBmcm9tIFwiLi91aS9jb21tb24vV25kU2NyZWVuUG9ydHJhaXROb3RpY2VcIjtcclxuaW1wb3J0IFBsYXllckluZm9Nb2RlbCBmcm9tIFwiLi4vaGFsbGNvbW1vbi9tb2RlbC9QbGF5ZXJJbmZvTW9kZWxcIjtcclxuaW1wb3J0IFduZFBsYXllckluZm8gZnJvbSBcIi4vdWkvcGxheWVySW5mby9XbmRQbGF5ZXJJbmZvXCI7XHJcbmltcG9ydCBXbmROZXdQbGF5ZXJJbmZvIGZyb20gXCIuL3VpL3BsYXllckluZm8vV25kTmV3UGxheWVySW5mb1wiO1xyXG5pbXBvcnQgV25kQ2hvb3NlSGVhZCBmcm9tIFwiLi91aS9wbGF5ZXJJbmZvL1duZENob29zZUhlYWRcIjtcclxuaW1wb3J0IFduZFZpcCBmcm9tIFwiLi91aS9wbGF5ZXJJbmZvL1duZFZpcFwiO1xyXG5pbXBvcnQgV25kVG9nZ2xlQWNjb3VudCBmcm9tIFwiLi91aS9wZXJzb25hbEluZm8vV25kVG9nZ2xlQWNjb3VudFwiO1xyXG5pbXBvcnQgV25kQWN0aXZpdHlDZW50ZXIgZnJvbSBcIi4vdWkvQWN0aXZpdHkvV25kQWN0aXZpdHlDZW50ZXJcIjtcclxuaW1wb3J0IFNoYXJlTW9kZWwgZnJvbSBcIi4uL2hhbGxjb21tb24vbW9kZWwvU2hhcmVNb2RlbFwiO1xyXG5pbXBvcnQgV25kU2hhcmUgZnJvbSBcIi4vdWkvaGFsbC9XbmRTaGFyZVwiO1xyXG5pbXBvcnQgV25kUmVjaGFuZ2VUaXAgZnJvbSBcIi4vdWkvcmVjaGFyZ2UvV25kUmVjaGFuZ2VUaXBcIjtcclxuaW1wb3J0IFJlY2hhZ3JlVGlwTW9kZWwgZnJvbSBcIi4uL2hhbGxjb21tb24vbW9kZWwvUmVjaGFncmVUaXBNb2RlbFwiO1xyXG5pbXBvcnQgV25kR2FtZU1haW50YWluVUkgZnJvbSBcIi4uL2NvcmUvbG9hZGluZ01WQy9XbmRHYW1lTWFpbnRhaW5VSVwiO1xyXG5pbXBvcnQgV25kRG93bkxvYWRBcGtVSSBmcm9tIFwiLi4vY29yZS9sb2FkaW5nTVZDL1duZERvd25Mb2FkQXBrVUlcIjtcclxuLy8gaW1wb3J0IFduZFNwcmVhZFVubGltaXRlZCBmcm9tIFwiLi91aS9TcHJlYWQvV25kU3ByZWFkVW5saW1pdGVkXCI7XHJcbi8vIGltcG9ydCBXbmRDb21taXNzaW9ubGlzdCBmcm9tIFwiLi91aS9TcHJlYWQvV25kQ29tbWlzc2lvbmxpc3RcIjtcclxuLy8gaW1wb3J0IFduZENhc2hCYWNrRGF5VUkgZnJvbSBcIi4vdWkvQ2FzaEJhY2svV25kQ2FzaEJhY2tEYXlVSVwiO1xyXG4vLyBpbXBvcnQgV25kQ2FzaEJhY2tUaXBVSSBmcm9tIFwiLi91aS9DYXNoQmFjay9XbmRDYXNoQmFja1RpcFVJXCI7XHJcbmltcG9ydCBDYXNoQmFja01vZGVsIGZyb20gXCIuLi9oYWxsY29tbW9uL21vZGVsL0Nhc2hCYWNrTW9kZWxcIjtcclxuaW1wb3J0IFduZEdhbWVVcGRhdGVVSSBmcm9tIFwiLi4vY29yZS9sb2FkaW5nTVZDL1duZEdhbWVVcGRhdGVVSVwiO1xyXG5pbXBvcnQgV25kVmlwUXVpY2tQYXlDaGF0IGZyb20gXCIuL3VpL3JlY2hhcmdlL1duZFZpcFF1aWNrUGF5Q2hhdFwiO1xyXG5pbXBvcnQgV25kQ2hhdEltYWdlIGZyb20gXCIuL3VpL3JlY2hhcmdlL1duZENoYXRJbWFnZVwiO1xyXG5pbXBvcnQgV25kR2FtZVJlc3RvcmVVSSBmcm9tIFwiLi4vY29yZS9sb2FkaW5nTVZDL1duZEdhbWVSZXN0b3JlVUlcIjtcclxuaW1wb3J0IFduZEJhbmtSZWNoYW5nZSBmcm9tIFwiLi91aS9yZWNoYXJnZS9XbmRCYW5rUmVjaGFuZ2VcIjtcclxuaW1wb3J0IFduZEFsaVBheVJlY2hhbmdlIGZyb20gXCIuL3VpL3JlY2hhcmdlL1duZEFsaVBheVJlY2hhbmdlXCI7XHJcbmltcG9ydCBXbmRXZUNoYXRSZWNoYW5nZSBmcm9tIFwiLi91aS9yZWNoYXJnZS9XbmRXZUNoYXRSZWNoYW5nZVwiO1xyXG5pbXBvcnQgV25kRGFpbHlSZWNoYXJnZUdpZnQgZnJvbSBcIi4vdWkvQWN0aXZpdHkvRGFpbHlSZWNoYXJnZS9XbmREYWlseVJlY2hhcmdlR2lmdFwiO1xyXG5pbXBvcnQgV25kT3ZlcnNlYXNCYW5kQ29uZmlybSBmcm9tIFwiLi91aS9tb25leS91aS9leHRyYWN0Q2FzaC9XbmRPdmVyc2Vhc0JhbmRDb25maXJtXCI7XHJcbmltcG9ydCBDb21taXNpb25Nb2RlbCBmcm9tIFwiLi4vaGFsbGNvbW1vbi9tb2RlbC9Db21taXNpb25Nb2RlbFwiO1xyXG5pbXBvcnQgU2lnbkFjdGl2aXR5TW9kZWwgZnJvbSBcIi4uL2hhbGxjb21tb24vbW9kZWwvU2lnbkFjdGl2aXR5TW9kZWxcIjtcclxuaW1wb3J0IFduZEdhbWVMb2JieVNoZWxsIGZyb20gXCIuL3VpL0Nob29zZVJvb20vV25kR2FtZUxvYmJ5U2hlbGxcIjtcclxuaW1wb3J0IFduZFJlZEVudmVsb3BlIGZyb20gXCIuL3VpL3JlYmF0ZS9XbmRSZWRFbnZlbG9wZVwiO1xyXG5pbXBvcnQgV25kSGFsbFJlZEVudmVsb3BlIGZyb20gXCIuL3VpL3JlYmF0ZS9XbmRIYWxsUmVkRW52ZWxvcGVcIjtcclxuaW1wb3J0IFduZERhaWx5Q2FzaEJhY2tVSSBmcm9tIFwiLi91aS9DYXNoQmFjay9XbmREYWlseUNhc2hCYWNrVUlcIjtcclxuaW1wb3J0IFduZERhaWx5R2lmdE1vbmV5VUkgZnJvbSBcIi4vdWkvRGFpbHlHaWZ0TW9uZXkvV25kRGFpbHlHaWZ0TW9uZXlVSVwiO1xyXG5pbXBvcnQgV25kR2lmdE1vbmV5TGlzdFVJIGZyb20gXCIuL3VpL0RhaWx5R2lmdE1vbmV5L1duZEdpZnRNb25leUxpc3RVSVwiO1xyXG5pbXBvcnQgV25kVmlwMiBmcm9tIFwiLi91aS9wbGF5ZXJJbmZvL1duZFZpcDJcIjtcclxuaW1wb3J0IFduZEdldFJlZEVudmVsb3BlIGZyb20gXCIuL3VpL3JlYmF0ZS9XbmRHZXRSZWRFbnZlbG9wZVwiO1xyXG5pbXBvcnQgV25kRGFpbHlSZWRFbnZlbG9wZSBmcm9tIFwiLi91aS9yZWJhdGUvV25kRGFpbHlSZWRFbnZlbG9wZVwiO1xyXG5pbXBvcnQgV25kVmlwMyBmcm9tIFwiLi91aS9wbGF5ZXJJbmZvL1duZFZpcDNcIjtcclxuaW1wb3J0IFduZFZpcFJ1bGUgZnJvbSBcIi4vdWkvcGxheWVySW5mby9XbmRWaXBSdWxlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYWxsU2VjdGlvbiBpbXBsZW1lbnRzIElTZWN0aW9uXHJcbntcclxuXHJcbiAgICBwdWJsaWMgaXNJbml0OmJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBkZWNsYXJlTW9kZWwoKVxyXG4gICAge1xyXG4gICAgICAgIG5ldyBMb2dpbk1vZGVsKCk7XHJcbiAgICAgICAgbmV3IEhhbGxNb2RlbCgpO1xyXG4gICAgICAgIG5ldyBQZXJzb25hbEluZm9Nb2RlbCgpO1xyXG4gICAgICAgIG5ldyBSZWNoYXJnZU1vZGVsKCk7XHJcblxyXG4gICAgICAgIG5ldyBSYW5rTW9kZWwoKTtcclxuICAgICAgICBuZXcgRXh0cmFjdE1vZGVsKCk7XHJcbiAgICAgICAgbmV3IEJhbmtNb2RlbCgpO1xyXG4gICAgICAgIG5ldyBNc2dNb2RlbCgpO1xyXG4gICAgICAgIG5ldyBGZWVkYmFja01vZGVsKCk7XHJcblxyXG4gICAgICAgIG5ldyBTZXJ2aWNlck1vZGVsKCk7XHJcbiAgICAgICAgbmV3IFNwcmVhZE1vZGVsKCk7XHJcblxyXG4gICAgICAgIG5ldyBXYWl0aW5nTW9kZWwoKTtcclxuXHJcbiAgICAgICAgbmV3IEJpbmRpbmdHaWZ0TW9kZWwoKTtcclxuXHJcbiAgICAgICAgbmV3IFJlY2hhcmdlR2lmdE1vZGVsKCk7XHJcbiAgICAgICAgbmV3IFpodWFucGFuTW9kZWwoKTtcclxuICAgICAgICBuZXcgUGxheWVySW5mb01vZGVsKCk7XHJcbiAgICAgICAgbmV3IFNoYXJlTW9kZWwoKTtcclxuICAgICAgICBuZXcgUmVjaGFncmVUaXBNb2RlbCgpO1xyXG5cclxuICAgICAgICBuZXcgQ2FzaEJhY2tNb2RlbCgpXHJcbiAgICAgICAgbmV3IENvbW1pc2lvbk1vZGVsKClcclxuICAgICAgICAvL25ldyBTaWduQWN0aXZpdHlNb2RlbCgpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlY2xhcmVXbmQoKVxyXG4gICAge1xyXG4gICAgICAgIG5ldyBXbmRMb2dpbigpO1xyXG4gICAgICAgIG5ldyBXbmRQaG9uZUxvZ2luKCk7XHJcbiAgICAgICAgbmV3IFduZEhhbGwoKTtcclxuICAgICAgICBuZXcgV25kUmVnaXN0KCk7XHJcbiAgICAgICAgbmV3IFduZEZvcmdldFB3ZCgpO1xyXG4gICAgICAgIG5ldyBXbmRNZXNzYWdlQm94KCk7XHJcbiAgICAgICAgbmV3IFduZFRvZ2dsZUFjY291bnQoKTtcclxuICAgICAgICBuZXcgV25kRWRpdE5hbWUoKTtcclxuICAgICAgICBuZXcgV25kYWxpQmFuZENvbmZpcm0oKTtcclxuICAgICAgICBuZXcgV25kVW5pb25CYW5kQ29uZmlybSgpO1xyXG4gICAgICAgIG5ldyBXbmRSYW5rKCk7XHJcbiAgICAgICAgbmV3IFduZENoYW5nZVB3ZCgpO1xyXG4gICAgICAgIG5ldyBXbmRCaW5kUGhvbmUoKTtcclxuICAgICAgICBuZXcgV25kUmVjaGFyZ2UoKTtcclxuICAgICAgICBuZXcgV25kUmVjaGFuZ2VCYW5rSW5mbygpO1xyXG4gICAgICAgIG5ldyBXbmRSZWNoYXJnZVZpcFNob3coKTtcclxuICAgICAgICBuZXcgV25kQmFua0xvZ2luKCk7XHJcbiAgICAgICAgbmV3IFduZEJhbmtDaGFuZ2VQVygpO1xyXG4gICAgICAgIG5ldyBXbmRCYW5rRm9yZ2V0UFcoKTtcclxuICAgICAgICBuZXcgV25kQmFua1VJKCk7XHJcbiAgICAgICAgbmV3IFduZE1zZygpO1xyXG4gICAgICAgIG5ldyBXbmRTZXJ2aWNlclVJKCk7XHJcbiAgICAgICAgbmV3IFduZEZlZWRiYWNrKCk7Ly/lj43ppohcclxuICAgICAgICBuZXcgV25kU3ByZWFkKClcclxuICAgICAgICBuZXcgV25kQXdhcmREZXRhaWwoKTtcclxuICAgICAgICAvLyBuZXcgV25kU3ByZWFkVW5saW1pdGVkKCk7XHJcbiAgICAgICAgbmV3IFduZE5ldFdhaXRpbmcoKTtcclxuICAgICAgICBuZXcgV25kTmV0UmVjb25uZWN0KCk7XHJcbiAgICAgICAgbmV3IFduZExvd2VyU2VhcmNoKCk7XHJcbiAgICAgICAgbmV3IFduZFJlYmF0ZUdldCgpO1xyXG4gICAgICAgIG5ldyBXbmRSZWRFbnZlbG9wZSgpO1xyXG4gICAgICAgIG5ldyBXbmRIYWxsUmVkRW52ZWxvcGUoKTtcclxuICAgICAgICBuZXcgV25kR2V0UmVkRW52ZWxvcGUoKTtcclxuICAgICAgICBuZXcgV25kRGFpbHlSZWRFbnZlbG9wZSgpO1xyXG4gICAgICAgIG5ldyBXbmRCaW5kaW5nR2lmdCgpO1xyXG4gICAgICAgIG5ldyBXbmRTcHJlYWRDZW50ZXIoKTtcclxuICAgICAgICBuZXcgV25kQXdhcmRSZWNvcmQoKTtcclxuICAgICAgICAvLyBuZXcgV25kQ29tbWlzc2lvbmxpc3QoKTtcclxuICAgICAgICBuZXcgV25kQmFja1VwR2FtZSgpO1xyXG4gICAgICAgIG5ldyBXbmRTY3JlZW5Qb3J0cmFpdE5vdGljZSgpO1xyXG4gICAgICAgIG5ldyBXbmRBY3Rpdml0eUNlbnRlcigpO1xyXG4gICAgICAgIG5ldyBXbmRQbGF5ZXJJbmZvKCk7XHJcbiAgICAgICAgbmV3IFduZE5ld1BsYXllckluZm8oKTtcclxuICAgICAgICBuZXcgV25kQ2hvb3NlSGVhZCgpO1xyXG4gICAgICAgIC8vIG5ldyBXbmRWaXAoKTtcclxuICAgICAgICAvLyBuZXcgV25kVmlwMigpO1xyXG4gICAgIC8vXHJcbiAgICAgICAgbmV3IFduZFZpcDMoKVxyXG4gICAgICAgIG5ldyBXbmRWaXBSdWxlKCk7XHJcbiAgICAgICAgbmV3IFduZFNoYXJlKCk7XHJcbiAgICAgICAgbmV3IFduZFJlY2hhbmdlVGlwKCk7XHJcbiAgICAgICAgbmV3IFduZEdhbWVNYWludGFpblVJKCk7XHJcbiAgICAgICAgbmV3IFduZERvd25Mb2FkQXBrVUkoKTtcclxuICAgICAgICBuZXcgV25kRGFpbHlDYXNoQmFja1VJKCk7XHJcbiAgICAgICAgbmV3IFduZERhaWx5R2lmdE1vbmV5VUkoKTtcclxuICAgICAgICBuZXcgV25kR2lmdE1vbmV5TGlzdFVJKCk7XHJcbiAgICAgICAgbmV3IFduZEdhbWVVcGRhdGVVSSgpO1xyXG4gICAgICAgIG5ldyBXbmRWaXBRdWlja1BheUNoYXQoKTtcclxuICAgICAgICBuZXcgV25kQ2hhdEltYWdlKClcclxuICAgICAgICBuZXcgV25kQmFua1JlY2hhbmdlKClcclxuICAgICAgICBuZXcgV25kQWxpUGF5UmVjaGFuZ2UoKVxyXG4gICAgICAgIG5ldyBXbmRXZUNoYXRSZWNoYW5nZSgpXHJcbiAgICAgICAgbmV3IFduZEdhbWVSZXN0b3JlVUkoKVxyXG4gICAgICAgIG5ldyBXbmREYWlseVJlY2hhcmdlR2lmdCgpXHJcbiAgICAgICAgbmV3IFduZE92ZXJzZWFzQmFuZENvbmZpcm0oKVxyXG4gICAgICAgIC8vbmV3IFduZFNpZ25BY3Rpdml0eSgpXHJcbiAgICAgICAgbmV3IFduZEdhbWVMb2JieVNoZWxsKClcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZExhbmd1YWdlKClcclxuICAgIHtcclxuICAgICAgICBHbG9iYWwuTGFuZ3VhZ2UucmVnaXN0TGFuZ3VhZ2UoXCJoYWxsL2NvbmZpZy9sYW5ndWFnZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdCgpe31cclxufSJdfQ==