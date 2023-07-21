"use strict";
cc._RF.push(module, '352dfbYhBFAKLfdyO+gFz5t', 'RechargeModule');
// hall/scripts/logic/hallcommon/module/RechargeModule.ts

"use strict";
/**
 * 充值模块
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
var RechargeModule = /** @class */ (function (_super) {
    __extends(RechargeModule, _super);
    function RechargeModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndRecharge";
        _this.modelClass = "RechargeModel";
        _this.resPaths = [];
        _this.prefabPaths = [""];
        _this.children = [
            {
                viewClass: "WndRechangeBankInfo",
                modelClass: "ExtractModel",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndaliBandConfirm",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/money/extractCash/aliBandConfirmUI"],
                children: []
            },
            {
                viewClass: "WndRechargeVipShow",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndRechangeTip",
                modelClass: "RechagreTipModel",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndChooseProvince",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/Recharge/subView/cash/chooseProvince"],
                children: []
            },
            {
                viewClass: "WndChooseBank",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/Recharge/subView/cash/chooseBank"],
                children: []
            },
            {
                viewClass: "WndChooseCity",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/Recharge/subView/cash/chooseCity"],
                children: []
            }
        ];
        return _this;
    }
    return RechargeModule;
}(ModuleBase_1.ModuleBase));
exports.default = RechargeModule;

cc._RF.pop();