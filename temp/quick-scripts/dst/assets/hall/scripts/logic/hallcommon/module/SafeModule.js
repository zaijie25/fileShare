
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/module/SafeModule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd1e61akjEFIdZCHBJheFDVr', 'SafeModule');
// hall/scripts/logic/hallcommon/module/SafeModule.ts

"use strict";
/**
 * 充值模块
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
var SafeModule = /** @class */ (function (_super) {
    __extends(SafeModule, _super);
    function SafeModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndBuySafeUI";
        _this.modelClass = "SafeModule";
        _this.resPaths = [];
        _this.prefabPaths = [""];
        _this.children = [
            {
                viewClass: "WndSafeRuleUI",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndDailyGiftMoneyUI",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndGiftMoneyListUI",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
        ];
        return _this;
    }
    return SafeModule;
}(ModuleBase_1.ModuleBase));
exports.default = SafeModule;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZVxcU2FmZU1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztFQUdFOzs7Ozs7Ozs7Ozs7Ozs7QUFFRixtRUFBa0U7QUFFbEU7SUFBd0MsOEJBQVU7SUFBbEQ7UUFBQSxxRUE2QkM7UUE1QkcsZUFBUyxHQUFHLGNBQWMsQ0FBQTtRQUMxQixnQkFBVSxHQUFHLFlBQVksQ0FBQTtRQUN6QixjQUFRLEdBQUcsRUFBRSxDQUFBO1FBQ2IsaUJBQVcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ2xCLGNBQVEsR0FBRztZQUNQO2dCQUNJLFNBQVMsRUFBRSxlQUFlO2dCQUMxQixVQUFVLEVBQUUsRUFBRTtnQkFDZCxRQUFRLEVBQUUsRUFBRTtnQkFDWixXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pCLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7WUFDRDtnQkFDSSxTQUFTLEVBQUUscUJBQXFCO2dCQUNoQyxVQUFVLEVBQUUsRUFBRTtnQkFDZCxRQUFRLEVBQUUsRUFBRTtnQkFDWixXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pCLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7WUFDRDtnQkFDSSxTQUFTLEVBQUUsb0JBQW9CO2dCQUMvQixVQUFVLEVBQUUsRUFBRTtnQkFDZCxRQUFRLEVBQUUsRUFBRTtnQkFDWixXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pCLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7U0FDSixDQUFBOztJQUVMLENBQUM7SUFBRCxpQkFBQztBQUFELENBN0JBLEFBNkJDLENBN0J1Qyx1QkFBVSxHQTZCakQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog5YWF5YC85qih5Z2XXHJcbiAqIFxyXG4qL1xyXG5cclxuaW1wb3J0IHsgTW9kdWxlQmFzZSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvbW9kdWxlL01vZHVsZUJhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNhZmVNb2R1bGUgZXh0ZW5kcyBNb2R1bGVCYXNlIHtcclxuICAgIHZpZXdDbGFzcyA9IFwiV25kQnV5U2FmZVVJXCJcclxuICAgIG1vZGVsQ2xhc3MgPSBcIlNhZmVNb2R1bGVcIlxyXG4gICAgcmVzUGF0aHMgPSBbXVxyXG4gICAgcHJlZmFiUGF0aHMgPSBbXCJcIl1cclxuICAgIGNoaWxkcmVuID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmlld0NsYXNzOiBcIlduZFNhZmVSdWxlVUlcIixcclxuICAgICAgICAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW1wiXCJdLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmlld0NsYXNzOiBcIlduZERhaWx5R2lmdE1vbmV5VUlcIixcclxuICAgICAgICAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW1wiXCJdLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmlld0NsYXNzOiBcIlduZEdpZnRNb25leUxpc3RVSVwiLFxyXG4gICAgICAgICAgICBtb2RlbENsYXNzOiBcIlwiLFxyXG4gICAgICAgICAgICByZXNQYXRoczogW10sXHJcbiAgICAgICAgICAgIHByZWZhYlBhdGhzOiBbXCJcIl0sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICBdXHJcblxyXG59Il19