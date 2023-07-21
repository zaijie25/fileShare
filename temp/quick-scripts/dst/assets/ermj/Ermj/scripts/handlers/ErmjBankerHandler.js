
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/handlers/ErmjBankerHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ce291iJJhVPEaVJr3g2dyZ4', 'ErmjBankerHandler');
// ermj/Ermj/scripts/handlers/ErmjBankerHandler.ts

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
var ErmjBankerHandler = /** @class */ (function (_super) {
    __extends(ErmjBankerHandler, _super);
    function ErmjBankerHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjBankerHandler.prototype.execute = function (msg) {
        var banker = msg._para.banker;
        var bankerLocalSeat = this.SitHelper.serverSToLocalN(banker);
        this.context.set(this.Define.FieldBankerSeat, bankerLocalSeat);
        this.mainUI.onBanker(bankerLocalSeat, msg._para.dice, true);
    };
    ErmjBankerHandler.prototype.executeSync = function (msg) {
        var banker = msg._para.banker;
        var bankerLocalSeat = this.SitHelper.serverSToLocalN(banker);
        this.context.set(this.Define.FieldBankerSeat, bankerLocalSeat);
        this.mainUI.onBanker(bankerLocalSeat, msg._para.dice, false);
    };
    return ErmjBankerHandler;
}(ErmjBaseHandler_1.default));
exports.default = ErmjBankerHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcaGFuZGxlcnNcXEVybWpCYW5rZXJIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQUFnRDtBQUVoRDtJQUErQyxxQ0FBZTtJQUE5RDs7SUFlQSxDQUFDO0lBZGEsbUNBQU8sR0FBakIsVUFBa0IsR0FBRztRQUNqQixJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUM5QixJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVTLHVDQUFXLEdBQXJCLFVBQXNCLEdBQUc7UUFDckIsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDOUIsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFFL0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFDTCx3QkFBQztBQUFELENBZkEsQUFlQyxDQWY4Qyx5QkFBZSxHQWU3RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFcm1qQmFzZUhhbmRsZXIgZnJvbSBcIi4vRXJtakJhc2VIYW5kbGVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFcm1qQmFua2VySGFuZGxlciBleHRlbmRzIEVybWpCYXNlSGFuZGxlcntcclxuICAgIHByb3RlY3RlZCBleGVjdXRlKG1zZyl7XHJcbiAgICAgICAgbGV0IGJhbmtlciA9IG1zZy5fcGFyYS5iYW5rZXI7XHJcbiAgICAgICAgbGV0IGJhbmtlckxvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihiYW5rZXIpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5zZXQodGhpcy5EZWZpbmUuRmllbGRCYW5rZXJTZWF0LCBiYW5rZXJMb2NhbFNlYXQpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLm9uQmFua2VyKGJhbmtlckxvY2FsU2VhdCwgbXNnLl9wYXJhLmRpY2UsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlU3luYyhtc2cpe1xyXG4gICAgICAgIGxldCBiYW5rZXIgPSBtc2cuX3BhcmEuYmFua2VyO1xyXG4gICAgICAgIGxldCBiYW5rZXJMb2NhbFNlYXQgPSB0aGlzLlNpdEhlbHBlci5zZXJ2ZXJTVG9Mb2NhbE4oYmFua2VyKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuc2V0KHRoaXMuRGVmaW5lLkZpZWxkQmFua2VyU2VhdCwgYmFua2VyTG9jYWxTZWF0KTtcclxuXHJcbiAgICAgICAgdGhpcy5tYWluVUkub25CYW5rZXIoYmFua2VyTG9jYWxTZWF0LCBtc2cuX3BhcmEuZGljZSwgZmFsc2UpO1xyXG4gICAgfVxyXG59Il19