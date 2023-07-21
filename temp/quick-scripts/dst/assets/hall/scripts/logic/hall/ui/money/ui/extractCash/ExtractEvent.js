
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/money/ui/extractCash/ExtractEvent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6833fRDaXFBzK0m5lMm6K3q', 'ExtractEvent');
// hall/scripts/logic/hall/ui/money/ui/extractCash/ExtractEvent.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractEvent = void 0;
var ExtractEvent = /** @class */ (function () {
    function ExtractEvent() {
    }
    ExtractEvent.OnUpdateBankBindInfo = "OnUpdateBankBindInfo"; //绑定信息更新
    ExtractEvent.BankBindInfoOver = "BankBindInfoOver"; //绑定提现信息消息返回
    ExtractEvent.OnUpdateApplyCashList = "OnUpdateapplyCashList"; //提现记录刷新
    ExtractEvent.OnUpdateAllPutList = "OnUpdateAllPutList"; //所有玩家提现记录
    ExtractEvent.ChipItemToggle = "ChipItemToggle"; //
    return ExtractEvent;
}());
exports.ExtractEvent = ExtractEvent;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtb25leVxcdWlcXGV4dHJhY3RDYXNoXFxFeHRyYWN0RXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBQTtJQVFBLENBQUM7SUFQMEIsaUNBQW9CLEdBQVcsc0JBQXNCLENBQUMsQ0FBRyxRQUFRO0lBQ2pFLDZCQUFnQixHQUFZLGtCQUFrQixDQUFDLENBQVUsWUFBWTtJQUNyRSxrQ0FBcUIsR0FBWSx1QkFBdUIsQ0FBQyxDQUFBLFFBQVE7SUFDakUsK0JBQWtCLEdBQVksb0JBQW9CLENBQUMsQ0FBTSxVQUFVO0lBRW5FLDJCQUFjLEdBQVksZ0JBQWdCLENBQUMsQ0FBQSxFQUFFO0lBRXhFLG1CQUFDO0NBUkQsQUFRQyxJQUFBO0FBUlksb0NBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRXh0cmFjdEV2ZW50IHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgT25VcGRhdGVCYW5rQmluZEluZm86IHN0cmluZyA9IFwiT25VcGRhdGVCYW5rQmluZEluZm9cIjsgICAvL+e7keWumuS/oeaBr+abtOaWsFxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBCYW5rQmluZEluZm9PdmVyIDogc3RyaW5nID0gXCJCYW5rQmluZEluZm9PdmVyXCI7ICAgICAgICAgIC8v57uR5a6a5o+Q546w5L+h5oGv5raI5oGv6L+U5ZueXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IE9uVXBkYXRlQXBwbHlDYXNoTGlzdCA6IHN0cmluZyA9IFwiT25VcGRhdGVhcHBseUNhc2hMaXN0XCI7Ly/mj5DnjrDorrDlvZXliLfmlrBcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgT25VcGRhdGVBbGxQdXRMaXN0IDogc3RyaW5nID0gXCJPblVwZGF0ZUFsbFB1dExpc3RcIjsgICAgICAvL+aJgOacieeOqeWutuaPkOeOsOiusOW9lVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQ2hpcEl0ZW1Ub2dnbGUgOiBzdHJpbmcgPSBcIkNoaXBJdGVtVG9nZ2xlXCI7Ly9cclxuXHJcbn0iXX0=