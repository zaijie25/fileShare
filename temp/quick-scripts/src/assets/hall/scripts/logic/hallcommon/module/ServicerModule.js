"use strict";
cc._RF.push(module, '47209B/KyVKFJzpA5dpsk6U', 'ServicerModule');
// hall/scripts/logic/hallcommon/module/ServicerModule.ts

"use strict";
/**
 * 客服模块
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
var ServicerModule = /** @class */ (function (_super) {
    __extends(ServicerModule, _super);
    function ServicerModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndServicerUI";
        _this.modelClass = "ServicerModel";
        _this.resPaths = [];
        _this.prefabPaths = ["hall/prefabs/ui/ServiceUI"];
        _this.children = [];
        return _this;
    }
    return ServicerModule;
}(ModuleBase_1.ModuleBase));
exports.default = ServicerModule;

cc._RF.pop();