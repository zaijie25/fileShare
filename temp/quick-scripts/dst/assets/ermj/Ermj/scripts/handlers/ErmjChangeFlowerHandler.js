
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/handlers/ErmjChangeFlowerHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2f178wjwJZEaJfWa/I/nHyU', 'ErmjChangeFlowerHandler');
// ermj/Ermj/scripts/handlers/ErmjChangeFlowerHandler.ts

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
var ErmjBaseHandler_1 = require("./ErmjBaseHandler");
var ErmjChangeFlowerHandler = /** @class */ (function (_super) {
    __extends(ErmjChangeFlowerHandler, _super);
    function ErmjChangeFlowerHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjChangeFlowerHandler.prototype.execute = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        var outArr = msg._para.flowers || [];
        var inArr = msg._para.new_cards || [];
        this.mainUI.onChangeFlower(localSeat, outArr, inArr, msg._para.left_count);
    };
    ErmjChangeFlowerHandler.prototype.executeSync = function (msg) {
        // 重连不会进这个协议, 合并到table_data
    };
    return ErmjChangeFlowerHandler;
}(ErmjBaseHandler_1.default));
exports.default = ErmjChangeFlowerHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcaGFuZGxlcnNcXEVybWpDaGFuZ2VGbG93ZXJIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQUFnRDtBQUVoRDtJQUFxRCwyQ0FBZTtJQUFwRTs7SUFXQSxDQUFDO0lBVmEseUNBQU8sR0FBakIsVUFBa0IsR0FBRztRQUNqQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekQsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ3JDLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFUyw2Q0FBVyxHQUFyQixVQUFzQixHQUFHO1FBQ3JCLDJCQUEyQjtJQUMvQixDQUFDO0lBQ0wsOEJBQUM7QUFBRCxDQVhBLEFBV0MsQ0FYb0QseUJBQWUsR0FXbkUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJtakJhc2VIYW5kbGVyIGZyb20gXCIuL0VybWpCYXNlSGFuZGxlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJtakNoYW5nZUZsb3dlckhhbmRsZXIgZXh0ZW5kcyBFcm1qQmFzZUhhbmRsZXJ7XHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZShtc2cpe1xyXG4gICAgICAgIGxldCBsb2NhbFNlYXQgPSB0aGlzLlNpdEhlbHBlci5zZXJ2ZXJTVG9Mb2NhbE4obXNnLl9zcmMpO1xyXG4gICAgICAgIGxldCBvdXRBcnIgPSBtc2cuX3BhcmEuZmxvd2VycyB8fCBbXTtcclxuICAgICAgICBsZXQgaW5BcnIgPSBtc2cuX3BhcmEubmV3X2NhcmRzIHx8IFtdO1xyXG4gICAgICAgIHRoaXMubWFpblVJLm9uQ2hhbmdlRmxvd2VyKGxvY2FsU2VhdCwgb3V0QXJyLCBpbkFyciwgbXNnLl9wYXJhLmxlZnRfY291bnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlU3luYyhtc2cpe1xyXG4gICAgICAgIC8vIOmHjei/nuS4jeS8mui/m+i/meS4quWNj+iuriwg5ZCI5bm25YiwdGFibGVfZGF0YVxyXG4gICAgfVxyXG59Il19