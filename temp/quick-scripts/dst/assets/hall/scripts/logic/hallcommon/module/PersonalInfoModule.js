
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/module/PersonalInfoModule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ea2aaCEtaZLWbIwyW1RazmA', 'PersonalInfoModule');
// hall/scripts/logic/hallcommon/module/PersonalInfoModule.ts

"use strict";
/**
 * 账号信息模块
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
var PersonalInfoModule = /** @class */ (function (_super) {
    __extends(PersonalInfoModule, _super);
    function PersonalInfoModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndBindPhone";
        _this.modelClass = "PersonalInfoModel";
        _this.resPaths = [];
        _this.prefabPaths = ["hall/prefabs/ui/PersonalInfo/BindPhoneUI"];
        _this.children = [
            {
                viewClass: "WndChangePwd",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/PersonalInfo/ChangePwdUI"],
                children: []
            },
            {
                viewClass: "WndEditName",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/PersonalInfo/EditNameUI"],
                children: []
            },
            {
                viewClass: "WndSetting",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/PersonalInfo/SettingBox"],
                children: []
            },
            {
                viewClass: "WndToggleAccount",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/PersonalInfo/ToggleAccountUI"],
                children: []
            }
        ];
        return _this;
    }
    return PersonalInfoModule;
}(ModuleBase_1.ModuleBase));
exports.default = PersonalInfoModule;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZVxcUGVyc29uYWxJbmZvTW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O0VBR0U7Ozs7Ozs7Ozs7Ozs7OztBQUVGLG1FQUFrRTtBQUVsRTtJQUFnRCxzQ0FBVTtJQUExRDtRQUFBLHFFQW9DQztRQW5DRyxlQUFTLEdBQUcsY0FBYyxDQUFBO1FBQzFCLGdCQUFVLEdBQUcsbUJBQW1CLENBQUE7UUFDaEMsY0FBUSxHQUFHLEVBQUUsQ0FBQTtRQUNiLGlCQUFXLEdBQUcsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFBO1FBQzFELGNBQVEsR0FBRztZQUNQO2dCQUNJLFNBQVMsRUFBRSxjQUFjO2dCQUN6QixVQUFVLEVBQUUsRUFBRTtnQkFDZCxRQUFRLEVBQUUsRUFBRTtnQkFDWixXQUFXLEVBQUUsQ0FBQywwQ0FBMEMsQ0FBQztnQkFDekQsUUFBUSxFQUFFLEVBQUU7YUFDZjtZQUNEO2dCQUNJLFNBQVMsRUFBRSxhQUFhO2dCQUN4QixVQUFVLEVBQUUsRUFBRTtnQkFDZCxRQUFRLEVBQUUsRUFBRTtnQkFDWixXQUFXLEVBQUUsQ0FBQyx5Q0FBeUMsQ0FBQztnQkFDeEQsUUFBUSxFQUFFLEVBQUU7YUFDZjtZQUNEO2dCQUNJLFNBQVMsRUFBRSxZQUFZO2dCQUN2QixVQUFVLEVBQUUsRUFBRTtnQkFDZCxRQUFRLEVBQUUsRUFBRTtnQkFDWixXQUFXLEVBQUUsQ0FBQyx5Q0FBeUMsQ0FBQztnQkFDeEQsUUFBUSxFQUFFLEVBQUU7YUFDZjtZQUNEO2dCQUNJLFNBQVMsRUFBRSxrQkFBa0I7Z0JBQzdCLFVBQVUsRUFBRSxFQUFFO2dCQUNkLFFBQVEsRUFBRSxFQUFFO2dCQUNaLFdBQVcsRUFBRSxDQUFDLDhDQUE4QyxDQUFDO2dCQUM3RCxRQUFRLEVBQUUsRUFBRTthQUNmO1NBQ0osQ0FBQTs7SUFFTCxDQUFDO0lBQUQseUJBQUM7QUFBRCxDQXBDQSxBQW9DQyxDQXBDK0MsdUJBQVUsR0FvQ3pEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOi0puWPt+S/oeaBr+aooeWdl1xyXG4gKiBcclxuKi9cclxuXHJcbmltcG9ydCB7IE1vZHVsZUJhc2UgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL21vZHVsZS9Nb2R1bGVCYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQZXJzb25hbEluZm9Nb2R1bGUgZXh0ZW5kcyBNb2R1bGVCYXNlIHtcclxuICAgIHZpZXdDbGFzcyA9IFwiV25kQmluZFBob25lXCJcclxuICAgIG1vZGVsQ2xhc3MgPSBcIlBlcnNvbmFsSW5mb01vZGVsXCJcclxuICAgIHJlc1BhdGhzID0gW11cclxuICAgIHByZWZhYlBhdGhzID0gW1wiaGFsbC9wcmVmYWJzL3VpL1BlcnNvbmFsSW5mby9CaW5kUGhvbmVVSVwiXVxyXG4gICAgY2hpbGRyZW4gPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2aWV3Q2xhc3M6IFwiV25kQ2hhbmdlUHdkXCIsXHJcbiAgICAgICAgICAgIG1vZGVsQ2xhc3M6IFwiXCIsXHJcbiAgICAgICAgICAgIHJlc1BhdGhzOiBbXSxcclxuICAgICAgICAgICAgcHJlZmFiUGF0aHM6IFtcImhhbGwvcHJlZmFicy91aS9QZXJzb25hbEluZm8vQ2hhbmdlUHdkVUlcIl0sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2aWV3Q2xhc3M6IFwiV25kRWRpdE5hbWVcIixcclxuICAgICAgICAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW1wiaGFsbC9wcmVmYWJzL3VpL1BlcnNvbmFsSW5mby9FZGl0TmFtZVVJXCJdLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmlld0NsYXNzOiBcIlduZFNldHRpbmdcIixcclxuICAgICAgICAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW1wiaGFsbC9wcmVmYWJzL3VpL1BlcnNvbmFsSW5mby9TZXR0aW5nQm94XCJdLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmlld0NsYXNzOiBcIlduZFRvZ2dsZUFjY291bnRcIixcclxuICAgICAgICAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW1wiaGFsbC9wcmVmYWJzL3VpL1BlcnNvbmFsSW5mby9Ub2dnbGVBY2NvdW50VUlcIl0sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgIH1cclxuICAgIF1cclxuXHJcbn0iXX0=