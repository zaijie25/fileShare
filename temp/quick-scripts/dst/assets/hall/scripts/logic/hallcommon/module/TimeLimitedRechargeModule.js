
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/module/TimeLimitedRechargeModule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1df4eVawvpFh4GxNWftDVbI', 'TimeLimitedRechargeModule');
// hall/scripts/logic/hallcommon/module/TimeLimitedRechargeModule.ts

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
var TimeLimitedRechargeModule = /** @class */ (function (_super) {
    __extends(TimeLimitedRechargeModule, _super);
    function TimeLimitedRechargeModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndTimeLimitedRechargeGift";
        _this.modelClass = "";
        _this.resPaths = [];
        _this.prefabPaths = [""];
        _this.children = [];
        return _this;
    }
    return TimeLimitedRechargeModule;
}(ModuleBase_1.ModuleBase));
exports.default = TimeLimitedRechargeModule;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZVxcVGltZUxpbWl0ZWRSZWNoYXJnZU1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztFQUdFOzs7Ozs7Ozs7Ozs7Ozs7QUFFRixtRUFBa0U7QUFFbEU7SUFBdUQsNkNBQVU7SUFBakU7UUFBQSxxRUFTQztRQVJHLGVBQVMsR0FBRyw0QkFBNEIsQ0FBQTtRQUN4QyxnQkFBVSxHQUFHLEVBQUUsQ0FBQTtRQUNmLGNBQVEsR0FBRyxFQUFFLENBQUE7UUFDYixpQkFBVyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDbEIsY0FBUSxHQUFHLEVBRVYsQ0FBQTs7SUFFTCxDQUFDO0lBQUQsZ0NBQUM7QUFBRCxDQVRBLEFBU0MsQ0FUc0QsdUJBQVUsR0FTaEUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog5YWF5YC86YCB56S85qih5Z2XXHJcbiAqIFxyXG4qL1xyXG5cclxuaW1wb3J0IHsgTW9kdWxlQmFzZSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvbW9kdWxlL01vZHVsZUJhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVMaW1pdGVkUmVjaGFyZ2VNb2R1bGUgZXh0ZW5kcyBNb2R1bGVCYXNlIHtcclxuICAgIHZpZXdDbGFzcyA9IFwiV25kVGltZUxpbWl0ZWRSZWNoYXJnZUdpZnRcIlxyXG4gICAgbW9kZWxDbGFzcyA9IFwiXCJcclxuICAgIHJlc1BhdGhzID0gW11cclxuICAgIHByZWZhYlBhdGhzID0gW1wiXCJdXHJcbiAgICBjaGlsZHJlbiA9IFtcclxuICAgICAgIFxyXG4gICAgXVxyXG5cclxufSJdfQ==