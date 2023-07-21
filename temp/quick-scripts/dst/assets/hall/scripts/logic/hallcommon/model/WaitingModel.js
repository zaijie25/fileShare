
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/model/WaitingModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fcaaaeZ6xhKrpFxag7I37K4', 'WaitingModel');
// hall/scripts/logic/hallcommon/model/WaitingModel.ts

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
var ModelBase_1 = require("../../../framework/model/ModelBase");
var GlobalEvent_1 = require("../../core/GlobalEvent");
//控制网络loading界面显示和重连界面显示
var WaitingModel = /** @class */ (function (_super) {
    __extends(WaitingModel, _super);
    function WaitingModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //waiting自动关闭时间
        _this.EVENT_UPDATE_WAITING_TIME = "EVENT_UPDATE_WAITING_TIME";
        _this.DEFAULT_WAITING_TIME = 15;
        _this.waitingList = [];
        return _this;
    }
    Object.defineProperty(WaitingModel.prototype, "Name", {
        get: function () {
            return "WaitingModel";
        },
        enumerable: false,
        configurable: true
    });
    WaitingModel.prototype.onInit = function () {
        Global.Event.on(GlobalEvent_1.default.SHOW_NET_WAITING, this, this.onShowWaiting);
        Global.Event.on(GlobalEvent_1.default.HIDE_NET_WAITING, this, this.onHideWaiting);
        Global.Event.on(GlobalEvent_1.default.FORCE_HIDE_WAITING, this, this.forceHideWaiting);
    };
    WaitingModel.prototype.onShowWaiting = function (key, maxTime, value, minTime, enableMask) {
        if (value === void 0) { value = ""; }
        if (minTime === void 0) { minTime = 1; }
        if (enableMask === void 0) { enableMask = true; }
        //cc.error("add key", key);
        if (isNaN(Number(maxTime)))
            maxTime = this.DEFAULT_WAITING_TIME;
        var waitingList = Global.UI.getWindow("WndNetWaiting");
        if (this.waitingList.length == 0 || waitingList == null || !waitingList.isLoaded) {
            Global.UI.show("WndNetWaiting", maxTime, value, minTime, enableMask);
        }
        this.event(this.EVENT_UPDATE_WAITING_TIME, maxTime);
        this.waitingList.push(key);
    };
    WaitingModel.prototype.onHideWaiting = function (key, force) {
        if (force === void 0) { force = false; }
        if (force) {
            this.waitingList = [];
        }
        else {
            for (var i = this.waitingList.length - 1; i >= 0; i--) {
                if (this.waitingList[i] == key)
                    this.waitingList.splice(i, 1);
            }
        }
        if (this.waitingList.length == 0) {
            Global.UI.close("WndNetWaiting");
        }
    };
    WaitingModel.prototype.forceHideWaiting = function () {
        this.waitTimeOut();
        Global.UI.close("WndNetWaiting");
    };
    WaitingModel.prototype.waitTimeOut = function () {
        this.waitingList = [];
    };
    WaitingModel.prototype.getWaitingList = function () {
        return this.waitingList || [];
    };
    return WaitingModel;
}(ModelBase_1.default));
exports.default = WaitingModel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZGVsXFxXYWl0aW5nTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQTJEO0FBQzNELHNEQUFpRDtBQUVqRCx3QkFBd0I7QUFDeEI7SUFBMEMsZ0NBQVM7SUFBbkQ7UUFBQSxxRUFzRUM7UUFwRUcsZUFBZTtRQUNSLCtCQUF5QixHQUFHLDJCQUEyQixDQUFBO1FBQ3ZELDBCQUFvQixHQUFHLEVBQUUsQ0FBQztRQU96QixpQkFBVyxHQUFZLEVBQUUsQ0FBQTs7SUEyRHJDLENBQUM7SUFoRUcsc0JBQVcsOEJBQUk7YUFBZjtZQUVJLE9BQU8sY0FBYyxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBSVMsNkJBQU0sR0FBaEI7UUFFSSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxxQkFBVyxDQUFDLGdCQUFnQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDdkUsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMscUJBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ3ZFLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLHFCQUFXLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ2hGLENBQUM7SUFHTyxvQ0FBYSxHQUFyQixVQUFzQixHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQVUsRUFBRSxPQUFXLEVBQUMsVUFBaUI7UUFBekMsc0JBQUEsRUFBQSxVQUFVO1FBQUUsd0JBQUEsRUFBQSxXQUFXO1FBQUMsMkJBQUEsRUFBQSxpQkFBaUI7UUFFekUsMkJBQTJCO1FBQzNCLElBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyQixPQUFPLEdBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBRXZDLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZELElBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUMvRTtZQUNJLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBQyxVQUFVLENBQUMsQ0FBQztTQUN2RTtRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFTyxvQ0FBYSxHQUFyQixVQUFzQixHQUFHLEVBQUUsS0FBYTtRQUFiLHNCQUFBLEVBQUEsYUFBYTtRQUVwQyxJQUFHLEtBQUssRUFDUjtZQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFBO1NBQ3hCO2FBRUQ7WUFDSSxLQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUNwRDtnQkFDSSxJQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRztvQkFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3JDO1NBQ0o7UUFDRCxJQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxJQUFJLENBQUMsRUFDL0I7WUFDSSxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7SUFFTyx1Q0FBZ0IsR0FBeEI7UUFFSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVNLGtDQUFXLEdBQWxCO1FBRUksSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVNLHFDQUFjLEdBQXJCO1FBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQXRFQSxBQXNFQyxDQXRFeUMsbUJBQVMsR0FzRWxEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vZGVsQmFzZSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL21vZGVsL01vZGVsQmFzZVwiO1xyXG5pbXBvcnQgR2xvYmFsRXZlbnQgZnJvbSBcIi4uLy4uL2NvcmUvR2xvYmFsRXZlbnRcIjtcclxuXHJcbi8v5o6n5Yi2572R57ucbG9hZGluZ+eVjOmdouaYvuekuuWSjOmHjei/nueVjOmdouaYvuekulxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYWl0aW5nTW9kZWwgZXh0ZW5kcyBNb2RlbEJhc2Vcclxue1xyXG4gICAgLy93YWl0aW5n6Ieq5Yqo5YWz6Zet5pe26Ze0XHJcbiAgICBwdWJsaWMgRVZFTlRfVVBEQVRFX1dBSVRJTkdfVElNRSA9IFwiRVZFTlRfVVBEQVRFX1dBSVRJTkdfVElNRVwiXHJcbiAgICBwdWJsaWMgREVGQVVMVF9XQUlUSU5HX1RJTUUgPSAxNTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IE5hbWUoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIldhaXRpbmdNb2RlbFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgd2FpdGluZ0xpc3Q6c3RyaW5nW10gPSBbXVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vbihHbG9iYWxFdmVudC5TSE9XX05FVF9XQUlUSU5HLCB0aGlzLCB0aGlzLm9uU2hvd1dhaXRpbmcpXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9uKEdsb2JhbEV2ZW50LkhJREVfTkVUX1dBSVRJTkcsIHRoaXMsIHRoaXMub25IaWRlV2FpdGluZylcclxuICAgICAgICBHbG9iYWwuRXZlbnQub24oR2xvYmFsRXZlbnQuRk9SQ0VfSElERV9XQUlUSU5HLCB0aGlzLCB0aGlzLmZvcmNlSGlkZVdhaXRpbmcpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgb25TaG93V2FpdGluZyhrZXksIG1heFRpbWUsIHZhbHVlID0gXCJcIiwgbWluVGltZSA9IDEsZW5hYmxlTWFzayA9IHRydWUpXHJcbiAgICB7XHJcbiAgICAgICAgLy9jYy5lcnJvcihcImFkZCBrZXlcIiwga2V5KTtcclxuICAgICAgICBpZihpc05hTihOdW1iZXIobWF4VGltZSkpKVxyXG4gICAgICAgICAgICBtYXhUaW1lID10aGlzLkRFRkFVTFRfV0FJVElOR19USU1FO1xyXG5cclxuICAgICAgICBsZXQgd2FpdGluZ0xpc3QgPSBHbG9iYWwuVUkuZ2V0V2luZG93KFwiV25kTmV0V2FpdGluZ1wiKTtcclxuICAgICAgICBpZih0aGlzLndhaXRpbmdMaXN0Lmxlbmd0aCA9PSAwIHx8IHdhaXRpbmdMaXN0ID09IG51bGwgfHwgIXdhaXRpbmdMaXN0LmlzTG9hZGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmROZXRXYWl0aW5nXCIsIG1heFRpbWUsIHZhbHVlLCBtaW5UaW1lLGVuYWJsZU1hc2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmV2ZW50KHRoaXMuRVZFTlRfVVBEQVRFX1dBSVRJTkdfVElNRSwgbWF4VGltZSk7XHJcbiAgICAgICAgdGhpcy53YWl0aW5nTGlzdC5wdXNoKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkhpZGVXYWl0aW5nKGtleSwgZm9yY2UgPSBmYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZihmb3JjZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMud2FpdGluZ0xpc3QgPSBbXVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSB0aGlzLndhaXRpbmdMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndhaXRpbmdMaXN0W2ldID09IGtleSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXRpbmdMaXN0LnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLndhaXRpbmdMaXN0Lmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmNsb3NlKFwiV25kTmV0V2FpdGluZ1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmb3JjZUhpZGVXYWl0aW5nKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLndhaXRUaW1lT3V0KCk7XHJcbiAgICAgICAgR2xvYmFsLlVJLmNsb3NlKFwiV25kTmV0V2FpdGluZ1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgd2FpdFRpbWVPdXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMud2FpdGluZ0xpc3QgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0V2FpdGluZ0xpc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2FpdGluZ0xpc3QgfHwgW107XHJcbiAgICB9XHJcbn0iXX0=