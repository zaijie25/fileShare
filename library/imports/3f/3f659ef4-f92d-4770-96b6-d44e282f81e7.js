"use strict";
cc._RF.push(module, '3f65970+S1HcJa21E4oL4Hn', 'RedSkinModuleCfg');
// hall/scripts/logic/hallcommon/modulecfg/RedSkinModuleCfg.ts

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
var RedSkinModuleCfg = /** @class */ (function (_super) {
    __extends(RedSkinModuleCfg, _super);
    function RedSkinModuleCfg() {
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
            "SignActivityModule",
            "VipQuickPayChatModule",
        ];
        return _this;
    }
    return RedSkinModuleCfg;
}(ModuleCfgBase_1.default));
exports.default = RedSkinModuleCfg;

cc._RF.pop();