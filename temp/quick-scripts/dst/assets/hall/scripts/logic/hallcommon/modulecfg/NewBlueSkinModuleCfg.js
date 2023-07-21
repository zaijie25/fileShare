
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/modulecfg/NewBlueSkinModuleCfg.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2d2f5AWDnZOorXqutNGgaDe', 'NewBlueSkinModuleCfg');
// hall/scripts/logic/hallcommon/modulecfg/NewBlueSkinModuleCfg.ts

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
var NewBlueSkinModuleCfg = /** @class */ (function (_super) {
    __extends(NewBlueSkinModuleCfg, _super);
    function NewBlueSkinModuleCfg() {
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
            "GameLobbyShellModule",
            "CommonModule",
            "FeedbackModule",
            "CommisionModule",
            "MsgModule",
            // "CommisionModule",
            "RankModule",
            "RechargeGiftModule",
            "RechargeModule",
            "ServicerModule",
            "ShareModule",
            "SpreadModule",
            "VipQuickPayChatModule",
            "ChooseHeadModule",
            "TimeLimitedRechargeModule",
            "LuckyDrawModule",
            "SpreadGiftModule"
        ];
        return _this;
    }
    return NewBlueSkinModuleCfg;
}(ModuleCfgBase_1.default));
exports.default = NewBlueSkinModuleCfg;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZWNmZ1xcTmV3Qmx1ZVNraW5Nb2R1bGVDZmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQTRDO0FBRzVDO0lBQWtELHdDQUFhO0lBQS9EO1FBQUEscUVBZ0NDO1FBOUJXLFNBQUcsR0FBYTtZQUNwQixtQkFBbUI7WUFDbkIsYUFBYTtZQUNiLFlBQVk7WUFDWixvQkFBb0I7WUFDcEIsa0JBQWtCO1lBQ2xCLFlBQVk7WUFDWixzQkFBc0I7WUFDdEIsa0JBQWtCO1lBQ2xCLG1CQUFtQjtZQUNuQixnQkFBZ0I7WUFDaEIsc0JBQXNCO1lBQ3RCLGNBQWM7WUFDZCxnQkFBZ0I7WUFDaEIsaUJBQWlCO1lBQ2pCLFdBQVc7WUFDWCxxQkFBcUI7WUFDckIsWUFBWTtZQUNaLG9CQUFvQjtZQUNwQixnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLGFBQWE7WUFDYixjQUFjO1lBQ2QsdUJBQXVCO1lBQ3ZCLGtCQUFrQjtZQUNsQiwyQkFBMkI7WUFDM0IsaUJBQWlCO1lBQ2pCLGtCQUFrQjtTQUVyQixDQUFDOztJQUNOLENBQUM7SUFBRCwyQkFBQztBQUFELENBaENBLEFBZ0NDLENBaENpRCx1QkFBYSxHQWdDOUQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9kdWxlQ2ZnQmFzZSBmcm9tIFwiLi9Nb2R1bGVDZmdCYXNlXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3Qmx1ZVNraW5Nb2R1bGVDZmcgZXh0ZW5kcyBNb2R1bGVDZmdCYXNlXHJcbntcclxuICAgIHB1YmxpYyAgY2ZnIDpzdHJpbmdbXSA9IFtcclxuICAgICAgICAvLyBcIkxvYWRpbmdNb2R1bGVcIixcclxuICAgICAgICBcIkxvZ2luTW9kdWxlXCIsXHJcbiAgICAgICAgXCJIYWxsTW9kdWxlXCIsXHJcbiAgICAgICAgXCJQZXJzb25hbEluZm9Nb2R1bGVcIixcclxuICAgICAgICBcIlBsYXllckluZm9Nb2R1bGVcIixcclxuICAgICAgICBcIkJhbmtNb2R1bGVcIixcclxuICAgICAgICBcIkFjdGl2aXR5Q2VudGVyTW9kdWxlXCIsXHJcbiAgICAgICAgXCJCYWNrVXBHYW1lTW9kdWxlXCIsXHJcbiAgICAgICAgXCJCaW5kaW5nR2lmdE1vZHVsZVwiLFxyXG4gICAgICAgIFwiQ2FzaEJhY2tNb2R1bGVcIixcclxuICAgICAgICBcIkdhbWVMb2JieVNoZWxsTW9kdWxlXCIsXHJcbiAgICAgICAgXCJDb21tb25Nb2R1bGVcIixcclxuICAgICAgICBcIkZlZWRiYWNrTW9kdWxlXCIsXHJcbiAgICAgICAgXCJDb21taXNpb25Nb2R1bGVcIixcclxuICAgICAgICBcIk1zZ01vZHVsZVwiLFxyXG4gICAgICAgIC8vIFwiQ29tbWlzaW9uTW9kdWxlXCIsXHJcbiAgICAgICAgXCJSYW5rTW9kdWxlXCIsXHJcbiAgICAgICAgXCJSZWNoYXJnZUdpZnRNb2R1bGVcIixcclxuICAgICAgICBcIlJlY2hhcmdlTW9kdWxlXCIsXHJcbiAgICAgICAgXCJTZXJ2aWNlck1vZHVsZVwiLFxyXG4gICAgICAgIFwiU2hhcmVNb2R1bGVcIixcclxuICAgICAgICBcIlNwcmVhZE1vZHVsZVwiLFxyXG4gICAgICAgIFwiVmlwUXVpY2tQYXlDaGF0TW9kdWxlXCIsXHJcbiAgICAgICAgXCJDaG9vc2VIZWFkTW9kdWxlXCIsXHJcbiAgICAgICAgXCJUaW1lTGltaXRlZFJlY2hhcmdlTW9kdWxlXCIsXHJcbiAgICAgICAgXCJMdWNreURyYXdNb2R1bGVcIixcclxuICAgICAgICBcIlNwcmVhZEdpZnRNb2R1bGVcIlxyXG5cclxuICAgIF07XHJcbn0iXX0=