"use strict";
cc._RF.push(module, 'b13a5oA5PNA54YLMXuhOXCu', 'SpreadModule');
// hall/scripts/logic/hallcommon/module/SpreadModule.ts

"use strict";
/**
 * 推广模块
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
var SpreadModule = /** @class */ (function (_super) {
    __extends(SpreadModule, _super);
    function SpreadModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndSpread";
        _this.modelClass = "SpreadModel";
        _this.resPaths = [];
        _this.prefabPaths = [""];
        _this.children = [
            {
                viewClass: "WndSpreadCenter",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndAwardRecord",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndLowerSearch",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndAwardDetail",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndCommissionlist",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            }
        ];
        return _this;
    }
    return SpreadModule;
}(ModuleBase_1.ModuleBase));
exports.default = SpreadModule;

cc._RF.pop();