
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/module/SpreadModule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b13a5oA5PNA54YLMXuhOXCu', 'SpreadModule');
// hall/scripts/logic/hallcommon/module/SpreadModule.ts

"use strict";
/**
 * 推广模块
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
var SpreadModule = /** @class */ (function (_super) {
    __extends(SpreadModule, _super);
    function SpreadModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndSpread";
        _this.modelClass = "SpreadModel";
        _this.resPaths = [];
        _this.prefabPaths = [""];
        _this.children = [
            {
                viewClass: "WndSpreadCenter",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndAwardRecord",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndLowerSearch",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndAwardDetail",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndCommissionlist",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            }
        ];
        return _this;
    }
    return SpreadModule;
}(ModuleBase_1.ModuleBase));
exports.default = SpreadModule;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZVxcU3ByZWFkTW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O0VBR0U7Ozs7Ozs7Ozs7Ozs7OztBQUVGLG1FQUFrRTtBQUVsRTtJQUEwQyxnQ0FBVTtJQUFwRDtRQUFBLHFFQTJDQztRQTFDRyxlQUFTLEdBQUcsV0FBVyxDQUFBO1FBQ3ZCLGdCQUFVLEdBQUcsYUFBYSxDQUFBO1FBQzFCLGNBQVEsR0FBRyxFQUFFLENBQUE7UUFDYixpQkFBVyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDbEIsY0FBUSxHQUFHO1lBQ1A7Z0JBQ0ksU0FBUyxFQUFFLGlCQUFpQjtnQkFDNUIsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNqQixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0Q7Z0JBQ0ksU0FBUyxFQUFFLGdCQUFnQjtnQkFDM0IsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNqQixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0Q7Z0JBQ0ksU0FBUyxFQUFFLGdCQUFnQjtnQkFDM0IsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNqQixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0Q7Z0JBQ0ksU0FBUyxFQUFFLGdCQUFnQjtnQkFDM0IsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNqQixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0E7Z0JBQ0csU0FBUyxFQUFFLG1CQUFtQjtnQkFDOUIsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNqQixRQUFRLEVBQUUsRUFBRTthQUNmO1NBQ0osQ0FBQTs7SUFFTCxDQUFDO0lBQUQsbUJBQUM7QUFBRCxDQTNDQSxBQTJDQyxDQTNDeUMsdUJBQVUsR0EyQ25EIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOaOqOW5v+aooeWdl1xyXG4gKiBcclxuKi9cclxuXHJcbmltcG9ydCB7IE1vZHVsZUJhc2UgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL21vZHVsZS9Nb2R1bGVCYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJlYWRNb2R1bGUgZXh0ZW5kcyBNb2R1bGVCYXNlIHtcclxuICAgIHZpZXdDbGFzcyA9IFwiV25kU3ByZWFkXCJcclxuICAgIG1vZGVsQ2xhc3MgPSBcIlNwcmVhZE1vZGVsXCJcclxuICAgIHJlc1BhdGhzID0gW11cclxuICAgIHByZWZhYlBhdGhzID0gW1wiXCJdXHJcbiAgICBjaGlsZHJlbiA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZpZXdDbGFzczogXCJXbmRTcHJlYWRDZW50ZXJcIixcclxuICAgICAgICAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW1wiXCJdLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmlld0NsYXNzOiBcIlduZEF3YXJkUmVjb3JkXCIsXHJcbiAgICAgICAgICAgIG1vZGVsQ2xhc3M6IFwiXCIsXHJcbiAgICAgICAgICAgIHJlc1BhdGhzOiBbXSxcclxuICAgICAgICAgICAgcHJlZmFiUGF0aHM6IFtcIlwiXSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZpZXdDbGFzczogXCJXbmRMb3dlclNlYXJjaFwiLFxyXG4gICAgICAgICAgICBtb2RlbENsYXNzOiBcIlwiLFxyXG4gICAgICAgICAgICByZXNQYXRoczogW10sXHJcbiAgICAgICAgICAgIHByZWZhYlBhdGhzOiBbXCJcIl0sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2aWV3Q2xhc3M6IFwiV25kQXdhcmREZXRhaWxcIixcclxuICAgICAgICAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW1wiXCJdLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICB9XHJcbiAgICAgICAgLHtcclxuICAgICAgICAgICAgdmlld0NsYXNzOiBcIlduZENvbW1pc3Npb25saXN0XCIsXHJcbiAgICAgICAgICAgIG1vZGVsQ2xhc3M6IFwiXCIsXHJcbiAgICAgICAgICAgIHJlc1BhdGhzOiBbXSxcclxuICAgICAgICAgICAgcHJlZmFiUGF0aHM6IFtcIlwiXSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtdXHJcbiAgICAgICAgfVxyXG4gICAgXVxyXG5cclxufSJdfQ==