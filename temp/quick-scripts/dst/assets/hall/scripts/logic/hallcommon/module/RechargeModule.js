
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/module/RechargeModule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '352dfbYhBFAKLfdyO+gFz5t', 'RechargeModule');
// hall/scripts/logic/hallcommon/module/RechargeModule.ts

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
var RechargeModule = /** @class */ (function (_super) {
    __extends(RechargeModule, _super);
    function RechargeModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndRecharge";
        _this.modelClass = "RechargeModel";
        _this.resPaths = [];
        _this.prefabPaths = [""];
        _this.children = [
            {
                viewClass: "WndRechangeBankInfo",
                modelClass: "ExtractModel",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndaliBandConfirm",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/money/extractCash/aliBandConfirmUI"],
                children: []
            },
            {
                viewClass: "WndRechargeVipShow",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndRechangeTip",
                modelClass: "RechagreTipModel",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndChooseProvince",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/Recharge/subView/cash/chooseProvince"],
                children: []
            },
            {
                viewClass: "WndChooseBank",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/Recharge/subView/cash/chooseBank"],
                children: []
            },
            {
                viewClass: "WndChooseCity",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/Recharge/subView/cash/chooseCity"],
                children: []
            }
        ];
        return _this;
    }
    return RechargeModule;
}(ModuleBase_1.ModuleBase));
exports.default = RechargeModule;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZVxcUmVjaGFyZ2VNb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7RUFHRTs7Ozs7Ozs7Ozs7Ozs7O0FBRUYsbUVBQWtFO0FBRWxFO0lBQTRDLGtDQUFVO0lBQXREO1FBQUEscUVBMERDO1FBekRHLGVBQVMsR0FBRyxhQUFhLENBQUE7UUFDekIsZ0JBQVUsR0FBRyxlQUFlLENBQUE7UUFDNUIsY0FBUSxHQUFHLEVBQUUsQ0FBQTtRQUNiLGlCQUFXLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNsQixjQUFRLEdBQUc7WUFDUDtnQkFDSSxTQUFTLEVBQUUscUJBQXFCO2dCQUNoQyxVQUFVLEVBQUUsY0FBYztnQkFDMUIsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNqQixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0Q7Z0JBQ0ksU0FBUyxFQUFFLG1CQUFtQjtnQkFDOUIsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLENBQUMsb0RBQW9ELENBQUM7Z0JBQ25FLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7WUFDRDtnQkFDSSxTQUFTLEVBQUUsb0JBQW9CO2dCQUMvQixVQUFVLEVBQUUsRUFBRTtnQkFDZCxRQUFRLEVBQUUsRUFBRTtnQkFDWixXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pCLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7WUFDRDtnQkFDSSxTQUFTLEVBQUUsZ0JBQWdCO2dCQUMzQixVQUFVLEVBQUUsa0JBQWtCO2dCQUM5QixRQUFRLEVBQUUsRUFBRTtnQkFDWixXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pCLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7WUFDRDtnQkFDSSxTQUFTLEVBQUUsbUJBQW1CO2dCQUM5QixVQUFVLEVBQUUsRUFBRTtnQkFDZCxRQUFRLEVBQUUsRUFBRTtnQkFDWixXQUFXLEVBQUUsQ0FBQyxzREFBc0QsQ0FBQztnQkFDckUsUUFBUSxFQUFFLEVBQUU7YUFDZjtZQUNEO2dCQUNJLFNBQVMsRUFBRSxlQUFlO2dCQUMxQixVQUFVLEVBQUUsRUFBRTtnQkFDZCxRQUFRLEVBQUUsRUFBRTtnQkFDWixXQUFXLEVBQUUsQ0FBQyxrREFBa0QsQ0FBQztnQkFDakUsUUFBUSxFQUFFLEVBQUU7YUFDZjtZQUNEO2dCQUNJLFNBQVMsRUFBRSxlQUFlO2dCQUMxQixVQUFVLEVBQUUsRUFBRTtnQkFDZCxRQUFRLEVBQUUsRUFBRTtnQkFDWixXQUFXLEVBQUUsQ0FBQyxrREFBa0QsQ0FBQztnQkFDakUsUUFBUSxFQUFFLEVBQUU7YUFDZjtTQUVKLENBQUE7O0lBRUwsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0ExREEsQUEwREMsQ0ExRDJDLHVCQUFVLEdBMERyRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDlhYXlgLzmqKHlnZdcclxuICogXHJcbiovXHJcblxyXG5pbXBvcnQgeyBNb2R1bGVCYXNlIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9tb2R1bGUvTW9kdWxlQmFzZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjaGFyZ2VNb2R1bGUgZXh0ZW5kcyBNb2R1bGVCYXNlIHtcclxuICAgIHZpZXdDbGFzcyA9IFwiV25kUmVjaGFyZ2VcIlxyXG4gICAgbW9kZWxDbGFzcyA9IFwiUmVjaGFyZ2VNb2RlbFwiXHJcbiAgICByZXNQYXRocyA9IFtdXHJcbiAgICBwcmVmYWJQYXRocyA9IFtcIlwiXVxyXG4gICAgY2hpbGRyZW4gPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2aWV3Q2xhc3M6IFwiV25kUmVjaGFuZ2VCYW5rSW5mb1wiLFxyXG4gICAgICAgICAgICBtb2RlbENsYXNzOiBcIkV4dHJhY3RNb2RlbFwiLFxyXG4gICAgICAgICAgICByZXNQYXRoczogW10sXHJcbiAgICAgICAgICAgIHByZWZhYlBhdGhzOiBbXCJcIl0sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2aWV3Q2xhc3M6IFwiV25kYWxpQmFuZENvbmZpcm1cIixcclxuICAgICAgICAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW1wiaGFsbC9wcmVmYWJzL3VpL21vbmV5L2V4dHJhY3RDYXNoL2FsaUJhbmRDb25maXJtVUlcIl0sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2aWV3Q2xhc3M6IFwiV25kUmVjaGFyZ2VWaXBTaG93XCIsXHJcbiAgICAgICAgICAgIG1vZGVsQ2xhc3M6IFwiXCIsXHJcbiAgICAgICAgICAgIHJlc1BhdGhzOiBbXSxcclxuICAgICAgICAgICAgcHJlZmFiUGF0aHM6IFtcIlwiXSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZpZXdDbGFzczogXCJXbmRSZWNoYW5nZVRpcFwiLFxyXG4gICAgICAgICAgICBtb2RlbENsYXNzOiBcIlJlY2hhZ3JlVGlwTW9kZWxcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW1wiXCJdLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmlld0NsYXNzOiBcIlduZENob29zZVByb3ZpbmNlXCIsXHJcbiAgICAgICAgICAgIG1vZGVsQ2xhc3M6IFwiXCIsXHJcbiAgICAgICAgICAgIHJlc1BhdGhzOiBbXSxcclxuICAgICAgICAgICAgcHJlZmFiUGF0aHM6IFtcImhhbGwvcHJlZmFicy91aS9SZWNoYXJnZS9zdWJWaWV3L2Nhc2gvY2hvb3NlUHJvdmluY2VcIl0sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2aWV3Q2xhc3M6IFwiV25kQ2hvb3NlQmFua1wiLFxyXG4gICAgICAgICAgICBtb2RlbENsYXNzOiBcIlwiLFxyXG4gICAgICAgICAgICByZXNQYXRoczogW10sXHJcbiAgICAgICAgICAgIHByZWZhYlBhdGhzOiBbXCJoYWxsL3ByZWZhYnMvdWkvUmVjaGFyZ2Uvc3ViVmlldy9jYXNoL2Nob29zZUJhbmtcIl0sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2aWV3Q2xhc3M6IFwiV25kQ2hvb3NlQ2l0eVwiLFxyXG4gICAgICAgICAgICBtb2RlbENsYXNzOiBcIlwiLFxyXG4gICAgICAgICAgICByZXNQYXRoczogW10sXHJcbiAgICAgICAgICAgIHByZWZhYlBhdGhzOiBbXCJoYWxsL3ByZWZhYnMvdWkvUmVjaGFyZ2Uvc3ViVmlldy9jYXNoL2Nob29zZUNpdHlcIl0sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIF1cclxuXHJcbn0iXX0=