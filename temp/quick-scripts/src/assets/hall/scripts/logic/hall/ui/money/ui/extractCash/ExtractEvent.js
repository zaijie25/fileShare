"use strict";
cc._RF.push(module, '6833fRDaXFBzK0m5lMm6K3q', 'ExtractEvent');
// hall/scripts/logic/hall/ui/money/ui/extractCash/ExtractEvent.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractEvent = void 0;
var ExtractEvent = /** @class */ (function () {
    function ExtractEvent() {
    }
    ExtractEvent.OnUpdateBankBindInfo = "OnUpdateBankBindInfo"; //绑定信息更新
    ExtractEvent.BankBindInfoOver = "BankBindInfoOver"; //绑定提现信息消息返回
    ExtractEvent.OnUpdateApplyCashList = "OnUpdateapplyCashList"; //提现记录刷新
    ExtractEvent.OnUpdateAllPutList = "OnUpdateAllPutList"; //所有玩家提现记录
    ExtractEvent.ChipItemToggle = "ChipItemToggle"; //
    return ExtractEvent;
}());
exports.ExtractEvent = ExtractEvent;

cc._RF.pop();