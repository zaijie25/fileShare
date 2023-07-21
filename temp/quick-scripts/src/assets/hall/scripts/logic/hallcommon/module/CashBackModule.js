"use strict";
cc._RF.push(module, '8f1e80iP/NKJoNBNnlQqSk1', 'CashBackModule');
// hall/scripts/logic/hallcommon/module/CashBackModule.ts

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
var CashBackModule = /** @class */ (function (_super) {
    __extends(CashBackModule, _super);
    function CashBackModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndDailyCashBackUI";
        _this.modelClass = "CashBackModel";
        _this.resPaths = [];
        _this.prefabPaths = [""];
        _this.children = [];
        return _this;
    }
    return CashBackModule;
}(ModuleBase_1.ModuleBase));
exports.default = CashBackModule;

cc._RF.pop();