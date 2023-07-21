"use strict";
cc._RF.push(module, '1480a+TV1pF573Jkdji6LmS', 'RankModule');
// hall/scripts/logic/hallcommon/module/RankModule.ts

"use strict";
/**
 * 排行榜模块
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
var RankModule = /** @class */ (function (_super) {
    __extends(RankModule, _super);
    function RankModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndRank";
        _this.modelClass = "RankModel";
        _this.resPaths = [];
        _this.prefabPaths = ["hall/prefabs/ui/RankUI"];
        _this.children = [];
        return _this;
    }
    return RankModule;
}(ModuleBase_1.ModuleBase));
exports.default = RankModule;

cc._RF.pop();