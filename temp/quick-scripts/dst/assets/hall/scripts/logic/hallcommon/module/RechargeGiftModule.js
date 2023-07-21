
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/module/RechargeGiftModule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZVxcUmVjaGFyZ2VHaWZ0TW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O0VBR0U7Ozs7Ozs7Ozs7Ozs7OztBQUVGLG1FQUFrRTtBQUVsRTtJQUFnRCxzQ0FBVTtJQUExRDtRQUFBLHFFQVNDO1FBUkcsZUFBUyxHQUFHLHNCQUFzQixDQUFBO1FBQ2xDLGdCQUFVLEdBQUcsbUJBQW1CLENBQUE7UUFDaEMsY0FBUSxHQUFHLEVBQUUsQ0FBQTtRQUNiLGlCQUFXLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNsQixjQUFRLEdBQUcsRUFFVixDQUFBOztJQUVMLENBQUM7SUFBRCx5QkFBQztBQUFELENBVEEsQUFTQyxDQVQrQyx1QkFBVSxHQVN6RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDlhYXlgLzpgIHnpLzmqKHlnZdcclxuICogXHJcbiovXHJcblxyXG5pbXBvcnQgeyBNb2R1bGVCYXNlIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9tb2R1bGUvTW9kdWxlQmFzZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjaGFyZ2VHaWZ0TW9kdWxlIGV4dGVuZHMgTW9kdWxlQmFzZSB7XHJcbiAgICB2aWV3Q2xhc3MgPSBcIlduZERhaWx5UmVjaGFyZ2VHaWZ0XCJcclxuICAgIG1vZGVsQ2xhc3MgPSBcIlJlY2hhcmdlR2lmdE1vZGVsXCJcclxuICAgIHJlc1BhdGhzID0gW11cclxuICAgIHByZWZhYlBhdGhzID0gW1wiXCJdXHJcbiAgICBjaGlsZHJlbiA9IFtcclxuICAgICAgIFxyXG4gICAgXVxyXG5cclxufSJdfQ==