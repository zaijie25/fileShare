"use strict";
cc._RF.push(module, '1980aakn7FIw4636iftOSH4', 'MsgModule');
// hall/scripts/logic/hallcommon/module/MsgModule.ts

"use strict";
/**
 * 邮件模块
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
var MsgModule = /** @class */ (function (_super) {
    __extends(MsgModule, _super);
    function MsgModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndMsg";
        _this.modelClass = "MsgModel";
        _this.resPaths = [];
        _this.prefabPaths = ["hall/prefabs/ui/msg/MsgUI"];
        _this.children = [];
        return _this;
    }
    return MsgModule;
}(ModuleBase_1.ModuleBase));
exports.default = MsgModule;

cc._RF.pop();