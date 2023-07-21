
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/CashBack/CashBackEvent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '45d99JPFpRG6ri/+dHnbmz5', 'CashBackEvent');
// hall/scripts/logic/hall/ui/CashBack/CashBackEvent.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashBackEvent = void 0;
var CashBackEvent = /** @class */ (function () {
    function CashBackEvent() {
    }
    //领取记录
    CashBackEvent.GetDayFlowBackRecord = "GetDayFlowBackRecord";
    //领取按钮
    CashBackEvent.GetDayFlowBack = "GetDayFlowBack";
    //返利说明
    CashBackEvent.GetActivityCfg = "GetActivityCfg";
    //累积领取
    CashBackEvent.GetDayFlowBackAll = "GetDayFlowBackAll";
    return CashBackEvent;
}());
exports.CashBackEvent = CashBackEvent;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxDYXNoQmFja1xcQ2FzaEJhY2tFdmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUFBO0lBU0EsQ0FBQztJQVJHLE1BQU07SUFDaUIsa0NBQW9CLEdBQVcsc0JBQXNCLENBQUM7SUFDN0UsTUFBTTtJQUNpQiw0QkFBYyxHQUFXLGdCQUFnQixDQUFDO0lBQ2pFLE1BQU07SUFDaUIsNEJBQWMsR0FBVyxnQkFBZ0IsQ0FBQztJQUNqRSxNQUFNO0lBQ2lCLCtCQUFpQixHQUFXLG1CQUFtQixDQUFDO0lBQzNFLG9CQUFDO0NBVEQsQUFTQyxJQUFBO0FBVFksc0NBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ2FzaEJhY2tFdmVudCB7XHJcbiAgICAvL+mihuWPluiusOW9lVxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBHZXREYXlGbG93QmFja1JlY29yZDogc3RyaW5nID0gXCJHZXREYXlGbG93QmFja1JlY29yZFwiO1xyXG4gICAgLy/pooblj5bmjInpkq5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgR2V0RGF5Rmxvd0JhY2s6IHN0cmluZyA9IFwiR2V0RGF5Rmxvd0JhY2tcIjtcclxuICAgIC8v6L+U5Yip6K+05piOXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdldEFjdGl2aXR5Q2ZnOiBzdHJpbmcgPSBcIkdldEFjdGl2aXR5Q2ZnXCI7XHJcbiAgICAvL+e0r+enr+mihuWPllxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBHZXREYXlGbG93QmFja0FsbDogc3RyaW5nID0gXCJHZXREYXlGbG93QmFja0FsbFwiO1xyXG59Il19