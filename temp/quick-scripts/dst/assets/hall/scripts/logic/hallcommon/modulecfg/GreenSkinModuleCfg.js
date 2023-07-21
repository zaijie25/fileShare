
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/modulecfg/GreenSkinModuleCfg.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2522f4oRJlBJrkqghBS8GQG', 'GreenSkinModuleCfg');
// hall/scripts/logic/hallcommon/modulecfg/GreenSkinModuleCfg.ts

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
var GreenSkinModuleCfg = /** @class */ (function (_super) {
    __extends(GreenSkinModuleCfg, _super);
    function GreenSkinModuleCfg() {
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
            "CommisionModule",
            "CommonModule",
            "FeedbackModule",
            "MsgModule",
            "RankModule",
            "RechargeGiftModule",
            "RechargeModule",
            "ServicerModule",
            "ShareModule",
            "SpreadModule",
            // "SignActivityModule",
            "VipQuickPayChatModule",
        ];
        return _this;
    }
    return GreenSkinModuleCfg;
}(ModuleCfgBase_1.default));
exports.default = GreenSkinModuleCfg;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZWNmZ1xcR3JlZW5Ta2luTW9kdWxlQ2ZnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUE0QztBQUc1QztJQUFnRCxzQ0FBYTtJQUE3RDtRQUFBLHFFQTRCQztRQTFCVyxTQUFHLEdBQWE7WUFDcEIsbUJBQW1CO1lBQ25CLGFBQWE7WUFDYixZQUFZO1lBQ1osb0JBQW9CO1lBQ3BCLGtCQUFrQjtZQUNsQixZQUFZO1lBQ1osc0JBQXNCO1lBQ3RCLGtCQUFrQjtZQUNsQixtQkFBbUI7WUFDbkIsZ0JBQWdCO1lBQ2hCLHNCQUFzQjtZQUN0QixpQkFBaUI7WUFDakIsY0FBYztZQUNkLGdCQUFnQjtZQUNoQixXQUFXO1lBQ1gsWUFBWTtZQUNaLG9CQUFvQjtZQUNwQixnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLGFBQWE7WUFDYixjQUFjO1lBQ2Qsd0JBQXdCO1lBQ3hCLHVCQUF1QjtTQUUxQixDQUFDOztJQUNOLENBQUM7SUFBRCx5QkFBQztBQUFELENBNUJBLEFBNEJDLENBNUIrQyx1QkFBYSxHQTRCNUQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9kdWxlQ2ZnQmFzZSBmcm9tIFwiLi9Nb2R1bGVDZmdCYXNlXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JlZW5Ta2luTW9kdWxlQ2ZnIGV4dGVuZHMgTW9kdWxlQ2ZnQmFzZVxyXG57XHJcbiAgICBwdWJsaWMgIGNmZyA6c3RyaW5nW10gPSBbXHJcbiAgICAgICAgLy8gXCJMb2FkaW5nTW9kdWxlXCIsXHJcbiAgICAgICAgXCJMb2dpbk1vZHVsZVwiLFxyXG4gICAgICAgIFwiSGFsbE1vZHVsZVwiLFxyXG4gICAgICAgIFwiUGVyc29uYWxJbmZvTW9kdWxlXCIsXHJcbiAgICAgICAgXCJQbGF5ZXJJbmZvTW9kdWxlXCIsXHJcbiAgICAgICAgXCJCYW5rTW9kdWxlXCIsXHJcbiAgICAgICAgXCJBY3Rpdml0eUNlbnRlck1vZHVsZVwiLFxyXG4gICAgICAgIFwiQmFja1VwR2FtZU1vZHVsZVwiLFxyXG4gICAgICAgIFwiQmluZGluZ0dpZnRNb2R1bGVcIixcclxuICAgICAgICBcIkNhc2hCYWNrTW9kdWxlXCIsXHJcbiAgICAgICAgXCJHYW1lTG9iYnlTaGVsbE1vZHVsZVwiLFxyXG4gICAgICAgIFwiQ29tbWlzaW9uTW9kdWxlXCIsXHJcbiAgICAgICAgXCJDb21tb25Nb2R1bGVcIixcclxuICAgICAgICBcIkZlZWRiYWNrTW9kdWxlXCIsXHJcbiAgICAgICAgXCJNc2dNb2R1bGVcIixcclxuICAgICAgICBcIlJhbmtNb2R1bGVcIixcclxuICAgICAgICBcIlJlY2hhcmdlR2lmdE1vZHVsZVwiLFxyXG4gICAgICAgIFwiUmVjaGFyZ2VNb2R1bGVcIixcclxuICAgICAgICBcIlNlcnZpY2VyTW9kdWxlXCIsXHJcbiAgICAgICAgXCJTaGFyZU1vZHVsZVwiLFxyXG4gICAgICAgIFwiU3ByZWFkTW9kdWxlXCIsXHJcbiAgICAgICAgLy8gXCJTaWduQWN0aXZpdHlNb2R1bGVcIixcclxuICAgICAgICBcIlZpcFF1aWNrUGF5Q2hhdE1vZHVsZVwiLFxyXG5cclxuICAgIF07XHJcbn0iXX0=