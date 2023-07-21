
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/modulecfg/DarkSkinModuleCfg.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '74402UW7eVKKKcTMK3ek3jk', 'DarkSkinModuleCfg');
// hall/scripts/logic/hallcommon/modulecfg/DarkSkinModuleCfg.ts

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
var DarkSkinModuleCfg = /** @class */ (function (_super) {
    __extends(DarkSkinModuleCfg, _super);
    function DarkSkinModuleCfg() {
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
            //"SignActivityModule",
            "VipQuickPayChatModule",
        ];
        return _this;
    }
    return DarkSkinModuleCfg;
}(ModuleCfgBase_1.default));
exports.default = DarkSkinModuleCfg;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZWNmZ1xcRGFya1NraW5Nb2R1bGVDZmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQTRDO0FBRzVDO0lBQStDLHFDQUFhO0lBQTVEO1FBQUEscUVBNEJDO1FBMUJXLFNBQUcsR0FBYTtZQUNwQixtQkFBbUI7WUFDbkIsYUFBYTtZQUNiLFlBQVk7WUFDWixvQkFBb0I7WUFDcEIsa0JBQWtCO1lBQ2xCLFlBQVk7WUFDWixzQkFBc0I7WUFDdEIsa0JBQWtCO1lBQ2xCLG1CQUFtQjtZQUNuQixnQkFBZ0I7WUFDaEIsc0JBQXNCO1lBQ3RCLGlCQUFpQjtZQUNqQixjQUFjO1lBQ2QsZ0JBQWdCO1lBQ2hCLFdBQVc7WUFDWCxZQUFZO1lBQ1osb0JBQW9CO1lBQ3BCLGdCQUFnQjtZQUNoQixnQkFBZ0I7WUFDaEIsYUFBYTtZQUNiLGNBQWM7WUFDZCx1QkFBdUI7WUFDdkIsdUJBQXVCO1NBRTFCLENBQUM7O0lBQ04sQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0E1QkEsQUE0QkMsQ0E1QjhDLHVCQUFhLEdBNEIzRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNb2R1bGVDZmdCYXNlIGZyb20gXCIuL01vZHVsZUNmZ0Jhc2VcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXJrU2tpbk1vZHVsZUNmZyBleHRlbmRzIE1vZHVsZUNmZ0Jhc2Vcclxue1xyXG4gICAgcHVibGljICBjZmcgOnN0cmluZ1tdID0gW1xyXG4gICAgICAgIC8vIFwiTG9hZGluZ01vZHVsZVwiLFxyXG4gICAgICAgIFwiTG9naW5Nb2R1bGVcIixcclxuICAgICAgICBcIkhhbGxNb2R1bGVcIixcclxuICAgICAgICBcIlBlcnNvbmFsSW5mb01vZHVsZVwiLFxyXG4gICAgICAgIFwiUGxheWVySW5mb01vZHVsZVwiLFxyXG4gICAgICAgIFwiQmFua01vZHVsZVwiLFxyXG4gICAgICAgIFwiQWN0aXZpdHlDZW50ZXJNb2R1bGVcIixcclxuICAgICAgICBcIkJhY2tVcEdhbWVNb2R1bGVcIixcclxuICAgICAgICBcIkJpbmRpbmdHaWZ0TW9kdWxlXCIsXHJcbiAgICAgICAgXCJDYXNoQmFja01vZHVsZVwiLFxyXG4gICAgICAgIFwiR2FtZUxvYmJ5U2hlbGxNb2R1bGVcIixcclxuICAgICAgICBcIkNvbW1pc2lvbk1vZHVsZVwiLFxyXG4gICAgICAgIFwiQ29tbW9uTW9kdWxlXCIsXHJcbiAgICAgICAgXCJGZWVkYmFja01vZHVsZVwiLFxyXG4gICAgICAgIFwiTXNnTW9kdWxlXCIsXHJcbiAgICAgICAgXCJSYW5rTW9kdWxlXCIsXHJcbiAgICAgICAgXCJSZWNoYXJnZUdpZnRNb2R1bGVcIixcclxuICAgICAgICBcIlJlY2hhcmdlTW9kdWxlXCIsXHJcbiAgICAgICAgXCJTZXJ2aWNlck1vZHVsZVwiLFxyXG4gICAgICAgIFwiU2hhcmVNb2R1bGVcIixcclxuICAgICAgICBcIlNwcmVhZE1vZHVsZVwiLFxyXG4gICAgICAgIC8vXCJTaWduQWN0aXZpdHlNb2R1bGVcIixcclxuICAgICAgICBcIlZpcFF1aWNrUGF5Q2hhdE1vZHVsZVwiLFxyXG5cclxuICAgIF07XHJcbn0iXX0=