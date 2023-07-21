"use strict";
cc._RF.push(module, '0c8a8CmoVxAqYIHxKgB95rj', 'FeedbackModule');
// hall/scripts/logic/hallcommon/module/FeedbackModule.ts

"use strict";
/**
 * 反馈模块
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
var FeedbackModule = /** @class */ (function (_super) {
    __extends(FeedbackModule, _super);
    function FeedbackModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndFeedback";
        _this.modelClass = "FeedbackModel";
        _this.resPaths = [];
        _this.prefabPaths = ["hall/prefabs/ui/FeedbackUI"];
        _this.children = [];
        return _this;
    }
    return FeedbackModule;
}(ModuleBase_1.ModuleBase));
exports.default = FeedbackModule;

cc._RF.pop();