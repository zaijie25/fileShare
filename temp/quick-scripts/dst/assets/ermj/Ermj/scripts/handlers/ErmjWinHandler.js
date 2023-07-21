
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/handlers/ErmjWinHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c6cfdKBDz9M4bbS6reQYaKI', 'ErmjWinHandler');
// ermj/Ermj/scripts/handlers/ErmjWinHandler.ts

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
var ErmjWinHandler = /** @class */ (function (_super) {
    __extends(ErmjWinHandler, _super);
    function ErmjWinHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjWinHandler.prototype.execute = function (msg) {
        this.context.set(this.Define.FieldHandActionEnable, false);
        this.context.set(this.Define.FieldInPlayTurn, false);
        this.mainUI.callAllPlayers("showStateSp", false);
        this.mainUI.askNoticeView.setTimerShow(false);
        this.mainUI.selfPlayView.resetSelectMj();
        this.mainUI.selfPlayView.showPlayTips(false);
        this.mainUI.askActionView.active = false;
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        var whoSeat = this.SitHelper.serverSToLocalN(msg._para.who);
        this.mainUI.onWin(localSeat, whoSeat, msg._para.card, msg._para.type, true);
        this.context.set(this.Define.FieldHandActionEnable, false);
        // 预先设置 结算显示
        this.mainUI.settleView.setWinType(msg._para.type);
    };
    ErmjWinHandler.prototype.executeSync = function (msg) {
        this.context.set(this.Define.FieldHandActionEnable, false);
        this.context.set(this.Define.FieldInPlayTurn, false);
        this.mainUI.callAllPlayers("showStateSp", false);
        this.mainUI.askNoticeView.setTimerShow(false);
        this.mainUI.selfPlayView.resetSelectMj();
        this.mainUI.selfPlayView.showPlayTips(false);
        this.mainUI.askActionView.active = false;
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        var whoSeat = this.SitHelper.serverSToLocalN(msg._para.who);
        this.mainUI.onWin(localSeat, whoSeat, msg._para.card, msg._para.type, false);
        this.context.set(this.Define.FieldHandActionEnable, false);
        // 预先设置 结算显示
        this.mainUI.settleView.setWinType(msg._para.type);
    };
    return ErmjWinHandler;
}(ErmjBaseHandler_1.default));
exports.default = ErmjWinHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcaGFuZGxlcnNcXEVybWpXaW5IYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQUFnRDtBQUVoRDtJQUE0QyxrQ0FBZTtJQUEzRDs7SUFzQ0EsQ0FBQztJQXJDYSxnQ0FBTyxHQUFqQixVQUFrQixHQUFHO1FBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFckQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUV6QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFM0QsWUFBWTtRQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFUyxvQ0FBVyxHQUFyQixVQUFzQixHQUFHO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFckQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUV6QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFM0QsWUFBWTtRQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFDTCxxQkFBQztBQUFELENBdENBLEFBc0NDLENBdEMyQyx5QkFBZSxHQXNDMUQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJtakJhc2VIYW5kbGVyIGZyb20gXCIuL0VybWpCYXNlSGFuZGxlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJtaldpbkhhbmRsZXIgZXh0ZW5kcyBFcm1qQmFzZUhhbmRsZXJ7XHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZShtc2cpe1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5zZXQodGhpcy5EZWZpbmUuRmllbGRIYW5kQWN0aW9uRW5hYmxlLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnNldCh0aGlzLkRlZmluZS5GaWVsZEluUGxheVR1cm4sIGZhbHNlKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYWluVUkuY2FsbEFsbFBsYXllcnMoXCJzaG93U3RhdGVTcFwiLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuYXNrTm90aWNlVmlldy5zZXRUaW1lclNob3coZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLnNlbGZQbGF5Vmlldy5yZXNldFNlbGVjdE1qKCk7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuc2VsZlBsYXlWaWV3LnNob3dQbGF5VGlwcyhmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuYXNrQWN0aW9uVmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbG9jYWxTZWF0ID0gdGhpcy5TaXRIZWxwZXIuc2VydmVyU1RvTG9jYWxOKG1zZy5fc3JjKTtcclxuICAgICAgICBsZXQgd2hvU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihtc2cuX3BhcmEud2hvKTtcclxuICAgICAgICB0aGlzLm1haW5VSS5vbldpbihsb2NhbFNlYXQsIHdob1NlYXQsIG1zZy5fcGFyYS5jYXJkLCBtc2cuX3BhcmEudHlwZSwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnNldCh0aGlzLkRlZmluZS5GaWVsZEhhbmRBY3Rpb25FbmFibGUsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy8g6aKE5YWI6K6+572uIOe7k+eul+aYvuekulxyXG4gICAgICAgIHRoaXMubWFpblVJLnNldHRsZVZpZXcuc2V0V2luVHlwZShtc2cuX3BhcmEudHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGVTeW5jKG1zZyl7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnNldCh0aGlzLkRlZmluZS5GaWVsZEhhbmRBY3Rpb25FbmFibGUsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuc2V0KHRoaXMuRGVmaW5lLkZpZWxkSW5QbGF5VHVybiwgZmFsc2UpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubWFpblVJLmNhbGxBbGxQbGF5ZXJzKFwic2hvd1N0YXRlU3BcIiwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmFza05vdGljZVZpZXcuc2V0VGltZXJTaG93KGZhbHNlKTtcclxuICAgICAgICB0aGlzLm1haW5VSS5zZWxmUGxheVZpZXcucmVzZXRTZWxlY3RNaigpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLnNlbGZQbGF5Vmlldy5zaG93UGxheVRpcHMoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmFza0FjdGlvblZpZXcuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGxldCBsb2NhbFNlYXQgPSB0aGlzLlNpdEhlbHBlci5zZXJ2ZXJTVG9Mb2NhbE4obXNnLl9zcmMpO1xyXG4gICAgICAgIGxldCB3aG9TZWF0ID0gdGhpcy5TaXRIZWxwZXIuc2VydmVyU1RvTG9jYWxOKG1zZy5fcGFyYS53aG8pO1xyXG4gICAgICAgIHRoaXMubWFpblVJLm9uV2luKGxvY2FsU2VhdCwgd2hvU2VhdCwgbXNnLl9wYXJhLmNhcmQsIG1zZy5fcGFyYS50eXBlLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnNldCh0aGlzLkRlZmluZS5GaWVsZEhhbmRBY3Rpb25FbmFibGUsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy8g6aKE5YWI6K6+572uIOe7k+eul+aYvuekulxyXG4gICAgICAgIHRoaXMubWFpblVJLnNldHRsZVZpZXcuc2V0V2luVHlwZShtc2cuX3BhcmEudHlwZSk7XHJcbiAgICB9XHJcbn0iXX0=