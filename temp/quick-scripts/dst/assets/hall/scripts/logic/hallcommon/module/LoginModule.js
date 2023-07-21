
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/module/LoginModule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e15ddSPa/pPJqsMrHiMVvs5', 'LoginModule');
// hall/scripts/logic/hallcommon/module/LoginModule.ts

"use strict";
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
/**
 * 登录模块
 *
*/
var ModuleBase_1 = require("../../../framework/module/ModuleBase");
var LoginModule = /** @class */ (function (_super) {
    __extends(LoginModule, _super);
    function LoginModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndLogin";
        _this.modelClass = "LoginModel";
        _this.resPaths = [];
        _this.prefabPaths = ["hall/prefabs/ui/LoginUI"];
        _this.children = [
            {
                viewClass: "WndPhoneLogin",
                modelClass: "",
                resPaths: [],
                prefabPaths: [],
                children: []
            },
            {
                viewClass: "WndForgetPwd",
                modelClass: "",
                resPaths: [],
                prefabPaths: [],
                children: []
            },
            {
                viewClass: "WndRegist",
                modelClass: "",
                resPaths: [],
                prefabPaths: [],
                children: []
            },
        ];
        return _this;
    }
    return LoginModule;
}(ModuleBase_1.ModuleBase));
exports.default = LoginModule;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZVxcTG9naW5Nb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztFQUdFO0FBQ0YsbUVBQWtFO0FBRWxFO0lBQXlDLCtCQUFVO0lBQW5EO1FBQUEscUVBNkJDO1FBNUJHLGVBQVMsR0FBRyxVQUFVLENBQUE7UUFDdEIsZ0JBQVUsR0FBRyxZQUFZLENBQUE7UUFDekIsY0FBUSxHQUFHLEVBQUUsQ0FBQTtRQUNiLGlCQUFXLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO1FBQ3pDLGNBQVEsR0FBRztZQUNQO2dCQUNJLFNBQVMsRUFBRSxlQUFlO2dCQUMxQixVQUFVLEVBQUUsRUFBRTtnQkFDZCxRQUFRLEVBQUUsRUFBRTtnQkFDWixXQUFXLEVBQUUsRUFBRTtnQkFDZixRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0Q7Z0JBQ0ksU0FBUyxFQUFFLGNBQWM7Z0JBQ3pCLFVBQVUsRUFBRSxFQUFFO2dCQUNkLFFBQVEsRUFBRSxFQUFFO2dCQUNaLFdBQVcsRUFBRSxFQUFFO2dCQUNmLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7WUFDRDtnQkFDSSxTQUFTLEVBQUUsV0FBVztnQkFDdEIsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLEVBQUU7Z0JBQ2YsUUFBUSxFQUFFLEVBQUU7YUFDZjtTQUNKLENBQUE7O0lBRUwsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0E3QkEsQUE2QkMsQ0E3QndDLHVCQUFVLEdBNkJsRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDnmbvlvZXmqKHlnZdcclxuICogXHJcbiovXHJcbmltcG9ydCB7IE1vZHVsZUJhc2UgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL21vZHVsZS9Nb2R1bGVCYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpbk1vZHVsZSBleHRlbmRzIE1vZHVsZUJhc2Uge1xyXG4gICAgdmlld0NsYXNzID0gXCJXbmRMb2dpblwiXHJcbiAgICBtb2RlbENsYXNzID0gXCJMb2dpbk1vZGVsXCJcclxuICAgIHJlc1BhdGhzID0gW11cclxuICAgIHByZWZhYlBhdGhzID0gW1wiaGFsbC9wcmVmYWJzL3VpL0xvZ2luVUlcIl1cclxuICAgIGNoaWxkcmVuID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmlld0NsYXNzOiBcIlduZFBob25lTG9naW5cIixcclxuICAgICAgICAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW10sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2aWV3Q2xhc3M6IFwiV25kRm9yZ2V0UHdkXCIsXHJcbiAgICAgICAgICAgIG1vZGVsQ2xhc3M6IFwiXCIsXHJcbiAgICAgICAgICAgIHJlc1BhdGhzOiBbXSxcclxuICAgICAgICAgICAgcHJlZmFiUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmlld0NsYXNzOiBcIlduZFJlZ2lzdFwiLFxyXG4gICAgICAgICAgICBtb2RlbENsYXNzOiBcIlwiLFxyXG4gICAgICAgICAgICByZXNQYXRoczogW10sXHJcbiAgICAgICAgICAgIHByZWZhYlBhdGhzOiBbXSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtdXHJcbiAgICAgICAgfSxcclxuICAgIF1cclxuXHJcbn0iXX0=