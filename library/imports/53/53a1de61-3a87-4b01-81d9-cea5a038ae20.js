"use strict";
cc._RF.push(module, '53a1d5hOodLAYHZzqWgOK4g', 'RechargeGiftModule');
// hall/scripts/logic/hallcommon/module/RechargeGiftModule.ts

"use strict";
/**
 * 充值送礼模块
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
var RechargeGiftModule = /** @class */ (function (_super) {
    __extends(RechargeGiftModule, _super);
    function RechargeGiftModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndDailyRechargeGift";
        _this.modelClass = "RechargeGiftModel";
        _this.resPaths = [];
        _this.prefabPaths = [""];
        _this.children = [];
        return _this;
    }
    return RechargeGiftModule;
}(ModuleBase_1.ModuleBase));
exports.default = RechargeGiftModule;

cc._RF.pop();