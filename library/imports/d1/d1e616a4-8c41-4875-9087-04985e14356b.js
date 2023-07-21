"use strict";
cc._RF.push(module, 'd1e61akjEFIdZCHBJheFDVr', 'SafeModule');
// hall/scripts/logic/hallcommon/module/SafeModule.ts

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
var SafeModule = /** @class */ (function (_super) {
    __extends(SafeModule, _super);
    function SafeModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndBuySafeUI";
        _this.modelClass = "SafeModule";
        _this.resPaths = [];
        _this.prefabPaths = [""];
        _this.children = [
            {
                viewClass: "WndSafeRuleUI",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndDailyGiftMoneyUI",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndGiftMoneyListUI",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
        ];
        return _this;
    }
    return SafeModule;
}(ModuleBase_1.ModuleBase));
exports.default = SafeModule;

cc._RF.pop();