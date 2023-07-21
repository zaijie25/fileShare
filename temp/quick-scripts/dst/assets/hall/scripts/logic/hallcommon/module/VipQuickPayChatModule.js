
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/module/VipQuickPayChatModule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '69b7fyK0ohMl6ILJ9tVPcpT', 'VipQuickPayChatModule');
// hall/scripts/logic/hallcommon/module/VipQuickPayChatModule.ts

"use strict";
/**
 * 艾特客服模块
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
var VipQuickPayChatModule = /** @class */ (function (_super) {
    __extends(VipQuickPayChatModule, _super);
    function VipQuickPayChatModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndVipQuickPayChat";
        _this.modelClass = "";
        _this.resPaths = [];
        _this.prefabPaths = [""];
        _this.children = [
            {
                viewClass: "WndChatImage",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndBankRechange",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndAliPayRechange",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndWeChatRechange",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
        ];
        return _this;
    }
    return VipQuickPayChatModule;
}(ModuleBase_1.ModuleBase));
exports.default = VipQuickPayChatModule;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZVxcVmlwUXVpY2tQYXlDaGF0TW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O0VBR0U7Ozs7Ozs7Ozs7Ozs7OztBQUVGLG1FQUFrRTtBQUVsRTtJQUFtRCx5Q0FBVTtJQUE3RDtRQUFBLHFFQW9DQztRQW5DRyxlQUFTLEdBQUcsb0JBQW9CLENBQUE7UUFDaEMsZ0JBQVUsR0FBRyxFQUFFLENBQUE7UUFDZixjQUFRLEdBQUcsRUFBRSxDQUFBO1FBQ2IsaUJBQVcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ2xCLGNBQVEsR0FBRztZQUNQO2dCQUNJLFNBQVMsRUFBRSxjQUFjO2dCQUN6QixVQUFVLEVBQUUsRUFBRTtnQkFDZCxRQUFRLEVBQUUsRUFBRTtnQkFDWixXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pCLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7WUFDRDtnQkFDSSxTQUFTLEVBQUUsaUJBQWlCO2dCQUM1QixVQUFVLEVBQUUsRUFBRTtnQkFDZCxRQUFRLEVBQUUsRUFBRTtnQkFDWixXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pCLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7WUFDRDtnQkFDSSxTQUFTLEVBQUUsbUJBQW1CO2dCQUM5QixVQUFVLEVBQUUsRUFBRTtnQkFDZCxRQUFRLEVBQUUsRUFBRTtnQkFDWixXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pCLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7WUFDRDtnQkFDSSxTQUFTLEVBQUUsbUJBQW1CO2dCQUM5QixVQUFVLEVBQUUsRUFBRTtnQkFDZCxRQUFRLEVBQUUsRUFBRTtnQkFDWixXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pCLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7U0FDSixDQUFBOztJQUVMLENBQUM7SUFBRCw0QkFBQztBQUFELENBcENBLEFBb0NDLENBcENrRCx1QkFBVSxHQW9DNUQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog6Im+54m55a6i5pyN5qih5Z2XXHJcbiAqIFxyXG4qL1xyXG5cclxuaW1wb3J0IHsgTW9kdWxlQmFzZSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvbW9kdWxlL01vZHVsZUJhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpcFF1aWNrUGF5Q2hhdE1vZHVsZSBleHRlbmRzIE1vZHVsZUJhc2Uge1xyXG4gICAgdmlld0NsYXNzID0gXCJXbmRWaXBRdWlja1BheUNoYXRcIlxyXG4gICAgbW9kZWxDbGFzcyA9IFwiXCJcclxuICAgIHJlc1BhdGhzID0gW11cclxuICAgIHByZWZhYlBhdGhzID0gW1wiXCJdXHJcbiAgICBjaGlsZHJlbiA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZpZXdDbGFzczogXCJXbmRDaGF0SW1hZ2VcIixcclxuICAgICAgICAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW1wiXCJdLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmlld0NsYXNzOiBcIlduZEJhbmtSZWNoYW5nZVwiLFxyXG4gICAgICAgICAgICBtb2RlbENsYXNzOiBcIlwiLFxyXG4gICAgICAgICAgICByZXNQYXRoczogW10sXHJcbiAgICAgICAgICAgIHByZWZhYlBhdGhzOiBbXCJcIl0sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2aWV3Q2xhc3M6IFwiV25kQWxpUGF5UmVjaGFuZ2VcIixcclxuICAgICAgICAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW1wiXCJdLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmlld0NsYXNzOiBcIlduZFdlQ2hhdFJlY2hhbmdlXCIsXHJcbiAgICAgICAgICAgIG1vZGVsQ2xhc3M6IFwiXCIsXHJcbiAgICAgICAgICAgIHJlc1BhdGhzOiBbXSxcclxuICAgICAgICAgICAgcHJlZmFiUGF0aHM6IFtcIlwiXSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtdXHJcbiAgICAgICAgfSxcclxuICAgIF1cclxuXHJcbn0iXX0=