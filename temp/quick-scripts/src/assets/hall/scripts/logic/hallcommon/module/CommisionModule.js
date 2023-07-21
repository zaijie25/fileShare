"use strict";
cc._RF.push(module, 'ec9bdDKD+ZJ4KMDyX8gJNdD', 'CommisionModule');
// hall/scripts/logic/hallcommon/module/CommisionModule.ts

"use strict";
/**
 * 财神到-任务系统
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
var CommisionModule = /** @class */ (function (_super) {
    __extends(CommisionModule, _super);
    function CommisionModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndCommision";
        _this.modelClass = "CommisionModel";
        _this.resPaths = [];
        _this.prefabPaths = ["hall/prefabs/ui/Commision/CommisionUI"];
        return _this;
    }
    return CommisionModule;
}(ModuleBase_1.ModuleBase));
exports.default = CommisionModule;

cc._RF.pop();