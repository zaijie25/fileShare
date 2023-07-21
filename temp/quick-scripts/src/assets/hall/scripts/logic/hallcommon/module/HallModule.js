"use strict";
cc._RF.push(module, 'f7e03jWSfVLZ5sNQtDhCroL', 'HallModule');
// hall/scripts/logic/hallcommon/module/HallModule.ts

"use strict";
/**
 * 大厅模块
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
var HallModule = /** @class */ (function (_super) {
    __extends(HallModule, _super);
    function HallModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndHall";
        _this.modelClass = "HallModel";
        _this.resPaths = [];
        _this.prefabPaths = ["hall/prefabs/ui/HallUI"];
        _this.children = [];
        return _this;
    }
    return HallModule;
}(ModuleBase_1.ModuleBase));
exports.default = HallModule;

cc._RF.pop();