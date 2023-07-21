
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/modulecfg/BlueSkinModuleCfg.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ca53ajzmfVBTaf4282nPl/9', 'BlueSkinModuleCfg');
// hall/scripts/logic/hallcommon/modulecfg/BlueSkinModuleCfg.ts

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
var ModuleCfgBase_1 = require("./ModuleCfgBase");
var BlueSkinModuleCfg = /** @class */ (function (_super) {
    __extends(BlueSkinModuleCfg, _super);
    function BlueSkinModuleCfg() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cfg = [
            // "LoadingModule",
            "LoginModule",
            "HallModule",
            "PersonalInfoModule",
            "PlayerInfoModule",
            "BankModule",
            "ActivityCenterModule",
            "BackUpGameModule",
            "BindingGiftModule",
            "CashBackModule",
            "SafeModule",
            "GameLobbyShellModule",
            "CommonModule",
            "FeedbackModule",
            "MsgModule",
            "RankModule",
            "RechargeGiftModule",
            "RechargeModule",
            "ServicerModule",
            "ShareModule",
            "SpreadModule",
            "SignActivityModule",
            "VipQuickPayChatModule",
            "ChooseHeadModule"
        ];
        return _this;
    }
    return BlueSkinModuleCfg;
}(ModuleCfgBase_1.default));
exports.default = BlueSkinModuleCfg;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZWNmZ1xcQmx1ZVNraW5Nb2R1bGVDZmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQTRDO0FBRzVDO0lBQStDLHFDQUFhO0lBQTVEO1FBQUEscUVBNEJDO1FBMUJXLFNBQUcsR0FBYTtZQUNwQixtQkFBbUI7WUFDbkIsYUFBYTtZQUNiLFlBQVk7WUFDWixvQkFBb0I7WUFDcEIsa0JBQWtCO1lBQ2xCLFlBQVk7WUFDWixzQkFBc0I7WUFDdEIsa0JBQWtCO1lBQ2xCLG1CQUFtQjtZQUNuQixnQkFBZ0I7WUFDaEIsWUFBWTtZQUNaLHNCQUFzQjtZQUN0QixjQUFjO1lBQ2QsZ0JBQWdCO1lBQ2hCLFdBQVc7WUFDWCxZQUFZO1lBQ1osb0JBQW9CO1lBQ3BCLGdCQUFnQjtZQUNoQixnQkFBZ0I7WUFDaEIsYUFBYTtZQUNiLGNBQWM7WUFDZCxvQkFBb0I7WUFDcEIsdUJBQXVCO1lBQ3ZCLGtCQUFrQjtTQUNyQixDQUFDOztJQUNOLENBQUM7SUFBRCx3QkFBQztBQUFELENBNUJBLEFBNEJDLENBNUI4Qyx1QkFBYSxHQTRCM0QiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9kdWxlQ2ZnQmFzZSBmcm9tIFwiLi9Nb2R1bGVDZmdCYXNlXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmx1ZVNraW5Nb2R1bGVDZmcgZXh0ZW5kcyBNb2R1bGVDZmdCYXNlXHJcbntcclxuICAgIHB1YmxpYyAgY2ZnIDpzdHJpbmdbXSA9IFtcclxuICAgICAgICAvLyBcIkxvYWRpbmdNb2R1bGVcIixcclxuICAgICAgICBcIkxvZ2luTW9kdWxlXCIsXHJcbiAgICAgICAgXCJIYWxsTW9kdWxlXCIsXHJcbiAgICAgICAgXCJQZXJzb25hbEluZm9Nb2R1bGVcIixcclxuICAgICAgICBcIlBsYXllckluZm9Nb2R1bGVcIixcclxuICAgICAgICBcIkJhbmtNb2R1bGVcIixcclxuICAgICAgICBcIkFjdGl2aXR5Q2VudGVyTW9kdWxlXCIsXHJcbiAgICAgICAgXCJCYWNrVXBHYW1lTW9kdWxlXCIsXHJcbiAgICAgICAgXCJCaW5kaW5nR2lmdE1vZHVsZVwiLFxyXG4gICAgICAgIFwiQ2FzaEJhY2tNb2R1bGVcIixcclxuICAgICAgICBcIlNhZmVNb2R1bGVcIixcclxuICAgICAgICBcIkdhbWVMb2JieVNoZWxsTW9kdWxlXCIsXHJcbiAgICAgICAgXCJDb21tb25Nb2R1bGVcIixcclxuICAgICAgICBcIkZlZWRiYWNrTW9kdWxlXCIsXHJcbiAgICAgICAgXCJNc2dNb2R1bGVcIixcclxuICAgICAgICBcIlJhbmtNb2R1bGVcIixcclxuICAgICAgICBcIlJlY2hhcmdlR2lmdE1vZHVsZVwiLFxyXG4gICAgICAgIFwiUmVjaGFyZ2VNb2R1bGVcIixcclxuICAgICAgICBcIlNlcnZpY2VyTW9kdWxlXCIsXHJcbiAgICAgICAgXCJTaGFyZU1vZHVsZVwiLFxyXG4gICAgICAgIFwiU3ByZWFkTW9kdWxlXCIsXHJcbiAgICAgICAgXCJTaWduQWN0aXZpdHlNb2R1bGVcIixcclxuICAgICAgICBcIlZpcFF1aWNrUGF5Q2hhdE1vZHVsZVwiLFxyXG4gICAgICAgIFwiQ2hvb3NlSGVhZE1vZHVsZVwiXHJcbiAgICBdO1xyXG59Il19