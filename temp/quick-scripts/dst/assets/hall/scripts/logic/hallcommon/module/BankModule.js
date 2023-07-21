
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/module/BankModule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cc88bDnZ0JCj73lbwbq5ykE', 'BankModule');
// hall/scripts/logic/hallcommon/module/BankModule.ts

"use strict";
/**
 * 银行模块
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
var BankModule = /** @class */ (function (_super) {
    __extends(BankModule, _super);
    function BankModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndBankUI";
        _this.modelClass = "BankModel";
        _this.resPaths = [];
        _this.prefabPaths = ["hall/prefabs/ui/money/bank/BankUI"];
        _this.children = [
            {
                viewClass: "WndBankLogin",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/money/bank/BankLoginBankUI"],
                children: []
            },
            {
                viewClass: "WndBankForgetPW",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/money/bank/BankForgetPWUI"],
                children: []
            },
            {
                viewClass: "WndBankChangePW",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/money/bank/BankChangePWUI"],
                children: []
            },
            {
                viewClass: "WndUnionBandConfirm",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/money/extractCash/unionBandConfirmUI"],
                children: []
            },
            {
                viewClass: "WndOverseasBandConfirm",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/money/extractCash/overseasBandConfirmUI"],
                children: []
            },
        ];
        return _this;
    }
    return BankModule;
}(ModuleBase_1.ModuleBase));
exports.default = BankModule;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZVxcQmFua01vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztFQUdFOzs7Ozs7Ozs7Ozs7Ozs7QUFFRixtRUFBa0U7QUFFbEU7SUFBd0MsOEJBQVU7SUFBbEQ7UUFBQSxxRUEyQ0M7UUExQ0csZUFBUyxHQUFHLFdBQVcsQ0FBQTtRQUN2QixnQkFBVSxHQUFHLFdBQVcsQ0FBQTtRQUN4QixjQUFRLEdBQUcsRUFBRSxDQUFBO1FBQ2IsaUJBQVcsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLENBQUE7UUFDbkQsY0FBUSxHQUFHO1lBQ1A7Z0JBQ0ksU0FBUyxFQUFFLGNBQWM7Z0JBQ3pCLFVBQVUsRUFBRSxFQUFFO2dCQUNkLFFBQVEsRUFBRSxFQUFFO2dCQUNaLFdBQVcsRUFBRSxDQUFDLDRDQUE0QyxDQUFDO2dCQUMzRCxRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0Q7Z0JBQ0ksU0FBUyxFQUFFLGlCQUFpQjtnQkFDNUIsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLENBQUMsMkNBQTJDLENBQUM7Z0JBQzFELFFBQVEsRUFBRSxFQUFFO2FBQ2Y7WUFDRDtnQkFDSSxTQUFTLEVBQUUsaUJBQWlCO2dCQUM1QixVQUFVLEVBQUUsRUFBRTtnQkFDZCxRQUFRLEVBQUUsRUFBRTtnQkFDWixXQUFXLEVBQUUsQ0FBQywyQ0FBMkMsQ0FBQztnQkFDMUQsUUFBUSxFQUFFLEVBQUU7YUFDZjtZQUNEO2dCQUNJLFNBQVMsRUFBRSxxQkFBcUI7Z0JBQ2hDLFVBQVUsRUFBRSxFQUFFO2dCQUNkLFFBQVEsRUFBRSxFQUFFO2dCQUNaLFdBQVcsRUFBRSxDQUFDLHNEQUFzRCxDQUFDO2dCQUNyRSxRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0Q7Z0JBQ0ksU0FBUyxFQUFFLHdCQUF3QjtnQkFDbkMsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLENBQUMseURBQXlELENBQUM7Z0JBQ3hFLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7U0FDSixDQUFBOztJQUVMLENBQUM7SUFBRCxpQkFBQztBQUFELENBM0NBLEFBMkNDLENBM0N1Qyx1QkFBVSxHQTJDakQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog6ZO26KGM5qih5Z2XXHJcbiAqIFxyXG4qL1xyXG5cclxuaW1wb3J0IHsgTW9kdWxlQmFzZSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvbW9kdWxlL01vZHVsZUJhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbmtNb2R1bGUgZXh0ZW5kcyBNb2R1bGVCYXNlIHtcclxuICAgIHZpZXdDbGFzcyA9IFwiV25kQmFua1VJXCJcclxuICAgIG1vZGVsQ2xhc3MgPSBcIkJhbmtNb2RlbFwiXHJcbiAgICByZXNQYXRocyA9IFtdXHJcbiAgICBwcmVmYWJQYXRocyA9IFtcImhhbGwvcHJlZmFicy91aS9tb25leS9iYW5rL0JhbmtVSVwiXVxyXG4gICAgY2hpbGRyZW4gPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2aWV3Q2xhc3M6IFwiV25kQmFua0xvZ2luXCIsXHJcbiAgICAgICAgICAgIG1vZGVsQ2xhc3M6IFwiXCIsXHJcbiAgICAgICAgICAgIHJlc1BhdGhzOiBbXSxcclxuICAgICAgICAgICAgcHJlZmFiUGF0aHM6IFtcImhhbGwvcHJlZmFicy91aS9tb25leS9iYW5rL0JhbmtMb2dpbkJhbmtVSVwiXSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZpZXdDbGFzczogXCJXbmRCYW5rRm9yZ2V0UFdcIixcclxuICAgICAgICAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW1wiaGFsbC9wcmVmYWJzL3VpL21vbmV5L2JhbmsvQmFua0ZvcmdldFBXVUlcIl0sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2aWV3Q2xhc3M6IFwiV25kQmFua0NoYW5nZVBXXCIsXHJcbiAgICAgICAgICAgIG1vZGVsQ2xhc3M6IFwiXCIsXHJcbiAgICAgICAgICAgIHJlc1BhdGhzOiBbXSxcclxuICAgICAgICAgICAgcHJlZmFiUGF0aHM6IFtcImhhbGwvcHJlZmFicy91aS9tb25leS9iYW5rL0JhbmtDaGFuZ2VQV1VJXCJdLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmlld0NsYXNzOiBcIlduZFVuaW9uQmFuZENvbmZpcm1cIixcclxuICAgICAgICAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW1wiaGFsbC9wcmVmYWJzL3VpL21vbmV5L2V4dHJhY3RDYXNoL3VuaW9uQmFuZENvbmZpcm1VSVwiXSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZpZXdDbGFzczogXCJXbmRPdmVyc2Vhc0JhbmRDb25maXJtXCIsXHJcbiAgICAgICAgICAgIG1vZGVsQ2xhc3M6IFwiXCIsXHJcbiAgICAgICAgICAgIHJlc1BhdGhzOiBbXSxcclxuICAgICAgICAgICAgcHJlZmFiUGF0aHM6IFtcImhhbGwvcHJlZmFicy91aS9tb25leS9leHRyYWN0Q2FzaC9vdmVyc2Vhc0JhbmRDb25maXJtVUlcIl0sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICBdXHJcblxyXG59Il19