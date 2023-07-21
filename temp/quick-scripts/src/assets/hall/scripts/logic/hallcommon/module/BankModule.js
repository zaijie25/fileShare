"use strict";
cc._RF.push(module, 'cc88bDnZ0JCj73lbwbq5ykE', 'BankModule');
// hall/scripts/logic/hallcommon/module/BankModule.ts

"use strict";
/**
 * 银行模块
 *
*/
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
var ModuleBase_1 = require("../../../framework/module/ModuleBase");
var BankModule = /** @class */ (function (_super) {
    __extends(BankModule, _super);
    function BankModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndBankUI";
        _this.modelClass = "BankModel";
        _this.resPaths = [];
        _this.prefabPaths = ["hall/prefabs/ui/money/bank/BankUI"];
        _this.children = [
            {
                viewClass: "WndBankLogin",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/money/bank/BankLoginBankUI"],
                children: []
            },
            {
                viewClass: "WndBankForgetPW",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/money/bank/BankForgetPWUI"],
                children: []
            },
            {
                viewClass: "WndBankChangePW",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/money/bank/BankChangePWUI"],
                children: []
            },
            {
                viewClass: "WndUnionBandConfirm",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/money/extractCash/unionBandConfirmUI"],
                children: []
            },
            {
                viewClass: "WndOverseasBandConfirm",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/money/extractCash/overseasBandConfirmUI"],
                children: []
            },
        ];
        return _this;
    }
    return BankModule;
}(ModuleBase_1.ModuleBase));
exports.default = BankModule;

cc._RF.pop();