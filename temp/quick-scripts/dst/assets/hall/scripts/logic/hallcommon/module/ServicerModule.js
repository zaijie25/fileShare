
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/module/ServicerModule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZVxcU2VydmljZXJNb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7RUFHRTs7Ozs7Ozs7Ozs7Ozs7O0FBRUYsbUVBQWtFO0FBRWxFO0lBQTRDLGtDQUFVO0lBQXREO1FBQUEscUVBU0M7UUFSRyxlQUFTLEdBQUcsZUFBZSxDQUFBO1FBQzNCLGdCQUFVLEdBQUcsZUFBZSxDQUFBO1FBQzVCLGNBQVEsR0FBRyxFQUFFLENBQUE7UUFDYixpQkFBVyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtRQUMzQyxjQUFRLEdBQUcsRUFFVixDQUFBOztJQUVMLENBQUM7SUFBRCxxQkFBQztBQUFELENBVEEsQUFTQyxDQVQyQyx1QkFBVSxHQVNyRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDlrqLmnI3mqKHlnZdcclxuICogXHJcbiovXHJcblxyXG5pbXBvcnQgeyBNb2R1bGVCYXNlIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9tb2R1bGUvTW9kdWxlQmFzZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmljZXJNb2R1bGUgZXh0ZW5kcyBNb2R1bGVCYXNlIHtcclxuICAgIHZpZXdDbGFzcyA9IFwiV25kU2VydmljZXJVSVwiXHJcbiAgICBtb2RlbENsYXNzID0gXCJTZXJ2aWNlck1vZGVsXCJcclxuICAgIHJlc1BhdGhzID0gW11cclxuICAgIHByZWZhYlBhdGhzID0gW1wiaGFsbC9wcmVmYWJzL3VpL1NlcnZpY2VVSVwiXVxyXG4gICAgY2hpbGRyZW4gPSBbXHJcbiAgICAgICBcclxuICAgIF1cclxuXHJcbn0iXX0=