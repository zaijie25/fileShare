"use strict";
cc._RF.push(module, '305a1XheXhFAY/NGp7o80L8', 'ActivityCenterModule');
// hall/scripts/logic/hallcommon/module/ActivityCenterModule.ts

"use strict";
/**
 * 活动模块
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
var ActivityCenterModule = /** @class */ (function (_super) {
    __extends(ActivityCenterModule, _super);
    function ActivityCenterModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndActivityCenter";
        _this.modelClass = "";
        _this.resPaths = [];
        _this.prefabPaths = ["hall/prefabs/ui/PlayerInfo/PlayerInfoUI"];
        _this.children = [
            {
                viewClass: "",
                modelClass: "",
                resPaths: [],
                prefabPaths: [],
                children: []
            }
        ];
        return _this;
    }
    return ActivityCenterModule;
}(ModuleBase_1.ModuleBase));
exports.default = ActivityCenterModule;

cc._RF.pop();