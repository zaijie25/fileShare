
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/module/LuckyDrawModule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b8c7fxIZt1HU79kRjCJJ+Ib', 'LuckyDrawModule');
// hall/scripts/logic/hallcommon/module/LuckyDrawModule.ts

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
var LuckyDrawModule = /** @class */ (function (_super) {
    __extends(LuckyDrawModule, _super);
    function LuckyDrawModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndTurntableView";
        _this.modelClass = "ZhuanpanModel";
        _this.resPaths = [];
        _this.prefabPaths = [""];
        _this.children = [
            {
                viewClass: "WndTurntableRule",
                modelClass: "",
                resPaths: [],
                prefabPaths: [],
                children: []
            }
        ];
        return _this;
    }
    return LuckyDrawModule;
}(ModuleBase_1.ModuleBase));
exports.default = LuckyDrawModule;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZVxcTHVja3lEcmF3TW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O0VBR0U7Ozs7Ozs7Ozs7Ozs7OztBQUVGLG1FQUFrRTtBQUVsRTtJQUE2QyxtQ0FBVTtJQUF2RDtRQUFBLHFFQWdCQztRQWZHLGVBQVMsR0FBRyxrQkFBa0IsQ0FBQTtRQUM5QixnQkFBVSxHQUFHLGVBQWUsQ0FBQTtRQUM1QixjQUFRLEdBQUcsRUFBRSxDQUFBO1FBQ2IsaUJBQVcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ2xCLGNBQVEsR0FBRztZQUNQO2dCQUNJLFNBQVMsRUFBRSxrQkFBa0I7Z0JBQzdCLFVBQVUsRUFBRSxFQUFFO2dCQUNkLFFBQVEsRUFBRSxFQUFFO2dCQUNaLFdBQVcsRUFBRSxFQUFFO2dCQUNmLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7U0FFSixDQUFBOztJQUVMLENBQUM7SUFBRCxzQkFBQztBQUFELENBaEJBLEFBZ0JDLENBaEI0Qyx1QkFBVSxHQWdCdEQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog5YWF5YC86YCB56S85qih5Z2XXHJcbiAqIFxyXG4qL1xyXG5cclxuaW1wb3J0IHsgTW9kdWxlQmFzZSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvbW9kdWxlL01vZHVsZUJhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEx1Y2t5RHJhd01vZHVsZSBleHRlbmRzIE1vZHVsZUJhc2Uge1xyXG4gICAgdmlld0NsYXNzID0gXCJXbmRUdXJudGFibGVWaWV3XCJcclxuICAgIG1vZGVsQ2xhc3MgPSBcIlpodWFucGFuTW9kZWxcIlxyXG4gICAgcmVzUGF0aHMgPSBbXVxyXG4gICAgcHJlZmFiUGF0aHMgPSBbXCJcIl1cclxuICAgIGNoaWxkcmVuID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmlld0NsYXNzOiBcIlduZFR1cm50YWJsZVJ1bGVcIixcclxuICAgICAgICAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW10sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgXVxyXG5cclxufSJdfQ==