"use strict";
cc._RF.push(module, 'db04apGFfRNNZtukAGjQETS', 'PurpleSkinModuleCfg');
// hall/scripts/logic/hallcommon/modulecfg/PurpleSkinModuleCfg.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ModuleCfgBase_1 = require("./ModuleCfgBase");
var PurpleSkinModuleCfg = /** @class */ (function (_super) {
    __extends(PurpleSkinModuleCfg, _super);
    function PurpleSkinModuleCfg() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cfg = [
            // "LoadingModule",
            "LoginModule",
            "HallModule",
            "PersonalInfoModule",
            "PlayerInfoModule",
            "BankModule",
            "ActivityCenterModule",
            "BackUpGameModule",
            "BindingGiftModule",
            "CashBackModule",
            "GameLobbyShellModule",
            "CommisionModule",
            "CommonModule",
            "FeedbackModule",
            "MsgModule",
            "RankModule",
            "RechargeGiftModule",
            "RechargeModule",
            "ServicerModule",
            "ShareModule",
            "SpreadModule",
            //"SignActivityModule",
            "VipQuickPayChatModule",
        ];
        return _this;
    }
    return PurpleSkinModuleCfg;
}(ModuleCfgBase_1.default));
exports.default = PurpleSkinModuleCfg;

cc._RF.pop();