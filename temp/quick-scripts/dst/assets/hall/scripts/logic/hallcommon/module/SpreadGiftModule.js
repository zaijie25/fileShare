
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/module/SpreadGiftModule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a19ddmay19LT6ORIElN9v1N', 'SpreadGiftModule');
// hall/scripts/logic/hallcommon/module/SpreadGiftModule.ts

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
var SpreadGiftModule = /** @class */ (function (_super) {
    __extends(SpreadGiftModule, _super);
    function SpreadGiftModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndSpreadGiftActivityView";
        _this.modelClass = "";
        _this.resPaths = [];
        _this.prefabPaths = [""];
        _this.children = [];
        return _this;
    }
    return SpreadGiftModule;
}(ModuleBase_1.ModuleBase));
exports.default = SpreadGiftModule;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZVxcU3ByZWFkR2lmdE1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztFQUdFOzs7Ozs7Ozs7Ozs7Ozs7QUFFRixtRUFBa0U7QUFFbEU7SUFBOEMsb0NBQVU7SUFBeEQ7UUFBQSxxRUFTQztRQVJHLGVBQVMsR0FBRywyQkFBMkIsQ0FBQTtRQUN2QyxnQkFBVSxHQUFHLEVBQUUsQ0FBQTtRQUNmLGNBQVEsR0FBRyxFQUFFLENBQUE7UUFDYixpQkFBVyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDbEIsY0FBUSxHQUFHLEVBRVYsQ0FBQTs7SUFFTCxDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQVRBLEFBU0MsQ0FUNkMsdUJBQVUsR0FTdkQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog5YWF5YC86YCB56S85qih5Z2XXHJcbiAqIFxyXG4qL1xyXG5cclxuaW1wb3J0IHsgTW9kdWxlQmFzZSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvbW9kdWxlL01vZHVsZUJhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcmVhZEdpZnRNb2R1bGUgZXh0ZW5kcyBNb2R1bGVCYXNlIHtcclxuICAgIHZpZXdDbGFzcyA9IFwiV25kU3ByZWFkR2lmdEFjdGl2aXR5Vmlld1wiXHJcbiAgICBtb2RlbENsYXNzID0gXCJcIlxyXG4gICAgcmVzUGF0aHMgPSBbXVxyXG4gICAgcHJlZmFiUGF0aHMgPSBbXCJcIl1cclxuICAgIGNoaWxkcmVuID0gW1xyXG4gICAgICAgXHJcbiAgICBdXHJcblxyXG59Il19