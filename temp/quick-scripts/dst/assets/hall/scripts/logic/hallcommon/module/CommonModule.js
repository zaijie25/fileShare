
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/module/CommonModule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '67bc17Nm/5M+IQW8OblNHKA', 'CommonModule');
// hall/scripts/logic/hallcommon/module/CommonModule.ts

"use strict";
/**
 * 通用模块:网络
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
var CommonModule = /** @class */ (function (_super) {
    __extends(CommonModule, _super);
    function CommonModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndNetReconnect";
        _this.modelClass = "WaitingModel";
        _this.resPaths = [];
        _this.prefabPaths = ["hall/prefabs/ui/NetReconnect"];
        _this.children = [
            {
                viewClass: "WndNetWaiting",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/NetWaitUI"],
                children: []
            },
            {
                viewClass: "WndScreenPortraitNotice",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndMessageBox",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndRebateGet",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndRedEnvelope",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndHallRedEnvelope",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndDailyRedEnvelope",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndGetRedEnvelope",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndDownLoadApkUI",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndGameMaintainUI",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndGameRestoreUI",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndGameUpdateUI",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndGameUpgrade",
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
    return CommonModule;
}(ModuleBase_1.ModuleBase));
exports.default = CommonModule;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZVxcQ29tbW9uTW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O0VBR0U7Ozs7Ozs7Ozs7Ozs7OztBQUVGLG1FQUFrRTtBQUVsRTtJQUEwQyxnQ0FBVTtJQUFwRDtRQUFBLHFFQWlIQztRQWhIRyxlQUFTLEdBQUcsaUJBQWlCLENBQUE7UUFDN0IsZ0JBQVUsR0FBRyxjQUFjLENBQUE7UUFDM0IsY0FBUSxHQUFHLEVBQUUsQ0FBQTtRQUNiLGlCQUFXLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO1FBQzlDLGNBQVEsR0FBRztZQUNQO2dCQUNJLFNBQVMsRUFBRSxlQUFlO2dCQUMxQixVQUFVLEVBQUUsRUFBRTtnQkFDZCxRQUFRLEVBQUUsRUFBRTtnQkFDWixXQUFXLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztnQkFDMUMsUUFBUSxFQUFFLEVBQUU7YUFDZjtZQUNEO2dCQUNJLFNBQVMsRUFBRSx5QkFBeUI7Z0JBQ3BDLFVBQVUsRUFBRSxFQUFFO2dCQUNkLFFBQVEsRUFBRSxFQUFFO2dCQUNaLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDakIsUUFBUSxFQUFFLEVBQUU7YUFDZjtZQUNEO2dCQUNJLFNBQVMsRUFBRSxlQUFlO2dCQUMxQixVQUFVLEVBQUUsRUFBRTtnQkFDZCxRQUFRLEVBQUUsRUFBRTtnQkFDWixXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pCLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7WUFDRDtnQkFDSSxTQUFTLEVBQUUsY0FBYztnQkFDekIsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNqQixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0Q7Z0JBQ0ksU0FBUyxFQUFFLGdCQUFnQjtnQkFDM0IsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNqQixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0Q7Z0JBQ0ksU0FBUyxFQUFFLG9CQUFvQjtnQkFDL0IsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNqQixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0Q7Z0JBQ0ksU0FBUyxFQUFFLHFCQUFxQjtnQkFDaEMsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNqQixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0Q7Z0JBQ0ksU0FBUyxFQUFFLG1CQUFtQjtnQkFDOUIsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNqQixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0Q7Z0JBQ0ksU0FBUyxFQUFFLGtCQUFrQjtnQkFDN0IsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNqQixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0Q7Z0JBQ0ksU0FBUyxFQUFFLG1CQUFtQjtnQkFDOUIsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNqQixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0Q7Z0JBQ0ksU0FBUyxFQUFFLGtCQUFrQjtnQkFDN0IsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNqQixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0Q7Z0JBQ0ksU0FBUyxFQUFFLGlCQUFpQjtnQkFDNUIsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNqQixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0Q7Z0JBQ0ksU0FBUyxFQUFFLGdCQUFnQjtnQkFDM0IsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNqQixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0Q7Z0JBQ0ksU0FBUyxFQUFFLHFCQUFxQjtnQkFDaEMsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNqQixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0Q7Z0JBQ0ksU0FBUyxFQUFFLG9CQUFvQjtnQkFDL0IsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNqQixRQUFRLEVBQUUsRUFBRTthQUNmO1NBQ0osQ0FBQTs7SUFFTCxDQUFDO0lBQUQsbUJBQUM7QUFBRCxDQWpIQSxBQWlIQyxDQWpIeUMsdUJBQVUsR0FpSG5EIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOmAmueUqOaooeWdlzrnvZHnu5xcclxuICogXHJcbiovXHJcblxyXG5pbXBvcnQgeyBNb2R1bGVCYXNlIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9tb2R1bGUvTW9kdWxlQmFzZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbW9uTW9kdWxlIGV4dGVuZHMgTW9kdWxlQmFzZSB7XHJcbiAgICB2aWV3Q2xhc3MgPSBcIlduZE5ldFJlY29ubmVjdFwiXHJcbiAgICBtb2RlbENsYXNzID0gXCJXYWl0aW5nTW9kZWxcIlxyXG4gICAgcmVzUGF0aHMgPSBbXVxyXG4gICAgcHJlZmFiUGF0aHMgPSBbXCJoYWxsL3ByZWZhYnMvdWkvTmV0UmVjb25uZWN0XCJdXHJcbiAgICBjaGlsZHJlbiA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZpZXdDbGFzczogXCJXbmROZXRXYWl0aW5nXCIsXHJcbiAgICAgICAgICAgIG1vZGVsQ2xhc3M6IFwiXCIsXHJcbiAgICAgICAgICAgIHJlc1BhdGhzOiBbXSxcclxuICAgICAgICAgICAgcHJlZmFiUGF0aHM6IFtcImhhbGwvcHJlZmFicy91aS9OZXRXYWl0VUlcIl0sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2aWV3Q2xhc3M6IFwiV25kU2NyZWVuUG9ydHJhaXROb3RpY2VcIixcclxuICAgICAgICAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW1wiXCJdLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmlld0NsYXNzOiBcIlduZE1lc3NhZ2VCb3hcIixcclxuICAgICAgICAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW1wiXCJdLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmlld0NsYXNzOiBcIlduZFJlYmF0ZUdldFwiLFxyXG4gICAgICAgICAgICBtb2RlbENsYXNzOiBcIlwiLFxyXG4gICAgICAgICAgICByZXNQYXRoczogW10sXHJcbiAgICAgICAgICAgIHByZWZhYlBhdGhzOiBbXCJcIl0sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2aWV3Q2xhc3M6IFwiV25kUmVkRW52ZWxvcGVcIixcclxuICAgICAgICAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW1wiXCJdLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmlld0NsYXNzOiBcIlduZEhhbGxSZWRFbnZlbG9wZVwiLFxyXG4gICAgICAgICAgICBtb2RlbENsYXNzOiBcIlwiLFxyXG4gICAgICAgICAgICByZXNQYXRoczogW10sXHJcbiAgICAgICAgICAgIHByZWZhYlBhdGhzOiBbXCJcIl0sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2aWV3Q2xhc3M6IFwiV25kRGFpbHlSZWRFbnZlbG9wZVwiLFxyXG4gICAgICAgICAgICBtb2RlbENsYXNzOiBcIlwiLFxyXG4gICAgICAgICAgICByZXNQYXRoczogW10sXHJcbiAgICAgICAgICAgIHByZWZhYlBhdGhzOiBbXCJcIl0sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2aWV3Q2xhc3M6IFwiV25kR2V0UmVkRW52ZWxvcGVcIixcclxuICAgICAgICAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW1wiXCJdLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmlld0NsYXNzOiBcIlduZERvd25Mb2FkQXBrVUlcIixcclxuICAgICAgICAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW1wiXCJdLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmlld0NsYXNzOiBcIlduZEdhbWVNYWludGFpblVJXCIsXHJcbiAgICAgICAgICAgIG1vZGVsQ2xhc3M6IFwiXCIsXHJcbiAgICAgICAgICAgIHJlc1BhdGhzOiBbXSxcclxuICAgICAgICAgICAgcHJlZmFiUGF0aHM6IFtcIlwiXSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZpZXdDbGFzczogXCJXbmRHYW1lUmVzdG9yZVVJXCIsXHJcbiAgICAgICAgICAgIG1vZGVsQ2xhc3M6IFwiXCIsXHJcbiAgICAgICAgICAgIHJlc1BhdGhzOiBbXSxcclxuICAgICAgICAgICAgcHJlZmFiUGF0aHM6IFtcIlwiXSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZpZXdDbGFzczogXCJXbmRHYW1lVXBkYXRlVUlcIixcclxuICAgICAgICAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW1wiXCJdLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmlld0NsYXNzOiBcIlduZEdhbWVVcGdyYWRlXCIsXHJcbiAgICAgICAgICAgIG1vZGVsQ2xhc3M6IFwiXCIsXHJcbiAgICAgICAgICAgIHJlc1BhdGhzOiBbXSxcclxuICAgICAgICAgICAgcHJlZmFiUGF0aHM6IFtcIlwiXSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZpZXdDbGFzczogXCJXbmREYWlseUdpZnRNb25leVVJXCIsXHJcbiAgICAgICAgICAgIG1vZGVsQ2xhc3M6IFwiXCIsXHJcbiAgICAgICAgICAgIHJlc1BhdGhzOiBbXSxcclxuICAgICAgICAgICAgcHJlZmFiUGF0aHM6IFtcIlwiXSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZpZXdDbGFzczogXCJXbmRHaWZ0TW9uZXlMaXN0VUlcIixcclxuICAgICAgICAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW1wiXCJdLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICB9LFxyXG4gICAgXVxyXG5cclxufSJdfQ==