
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/rebate/WndGetRedEnvelope.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c2348sAqwpHqZ6gbRMJfARy', 'WndGetRedEnvelope');
// hall/scripts/logic/hall/ui/rebate/WndGetRedEnvelope.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var WndGetRedEnvelope = /** @class */ (function (_super) {
    __extends(WndGetRedEnvelope, _super);
    function WndGetRedEnvelope() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // private closeCallback: Function;
    WndGetRedEnvelope.prototype.onInit = function () {
        this.name = "WndGetRedEnvelope";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Rebate/GetRedEnvelopeUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndGetRedEnvelope.prototype.initView = function () {
        this.addCommonClick("but_cz", this.onOpenRechargeClick, this);
        this.addCommonClick("close", this.closeWnd, this);
    };
    WndGetRedEnvelope.prototype.onOpenRechargeClick = function () {
        Global.UI.show("WndRecharge");
        this.closeWnd();
    };
    WndGetRedEnvelope.prototype.onOpen = function (arr) {
        // this.closeCallback = arr[0];
    };
    WndGetRedEnvelope.prototype.closeWnd = function () {
        // if(this.closeCallback){
        //     this.closeCallback();
        // }
        this.close();
    };
    WndGetRedEnvelope.prototype.onClose = function () {
    };
    WndGetRedEnvelope.prototype.onDispose = function () {
    };
    return WndGetRedEnvelope;
}(WndBase_1.default));
exports.default = WndGetRedEnvelope;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWJhdGVcXFduZEdldFJlZEVudmVsb3BlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9EQUFnRTtBQUVoRTtJQUErQyxxQ0FBTztJQUF0RDs7SUFtQ0EsQ0FBQztJQWxDRyxtQ0FBbUM7SUFDekIsa0NBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLG1CQUFtQixDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyx5Q0FBeUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsV0FBVyxHQUFHLHFCQUFXLENBQUMsSUFBSSxDQUFBO0lBQ3ZDLENBQUM7SUFFUyxvQ0FBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTywrQ0FBbUIsR0FBM0I7UUFDSSxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVTLGtDQUFNLEdBQWhCLFVBQWlCLEdBQUc7UUFDaEIsK0JBQStCO0lBQ25DLENBQUM7SUFFTyxvQ0FBUSxHQUFoQjtRQUNJLDBCQUEwQjtRQUMxQiw0QkFBNEI7UUFDNUIsSUFBSTtRQUNKLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRVMsbUNBQU8sR0FBakI7SUFDQSxDQUFDO0lBQ0QscUNBQVMsR0FBVDtJQUVBLENBQUM7SUFDTCx3QkFBQztBQUFELENBbkNBLEFBbUNDLENBbkM4QyxpQkFBTyxHQW1DckQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IFduZEJhc2UsIHsgRGVzdG9yeVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9XbmRCYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXbmRHZXRSZWRFbnZlbG9wZSBleHRlbmRzIFduZEJhc2V7XHJcbiAgICAvLyBwcml2YXRlIGNsb3NlQ2FsbGJhY2s6IEZ1bmN0aW9uO1xyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZEdldFJlZEVudmVsb3BlXCI7XHJcbiAgICAgICAgdGhpcy5sYXllciA9IEdsb2JhbC5VSS5Qb3BMYXllcjtcclxuICAgICAgICB0aGlzLnJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS9SZWJhdGUvR2V0UmVkRW52ZWxvcGVVSVwiO1xyXG4gICAgICAgIHRoaXMuZGVzdG9yeVR5cGUgPSBEZXN0b3J5VHlwZS5Ob25lXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImJ1dF9jelwiLCB0aGlzLm9uT3BlblJlY2hhcmdlQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJjbG9zZVwiLCB0aGlzLmNsb3NlV25kLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uT3BlblJlY2hhcmdlQ2xpY2soKXtcclxuICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZFJlY2hhcmdlXCIpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VXbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKGFycil7XHJcbiAgICAgICAgLy8gdGhpcy5jbG9zZUNhbGxiYWNrID0gYXJyWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xvc2VXbmQoKXtcclxuICAgICAgICAvLyBpZih0aGlzLmNsb3NlQ2FsbGJhY2spe1xyXG4gICAgICAgIC8vICAgICB0aGlzLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKCl7XHJcbiAgICB9XHJcbiAgICBvbkRpc3Bvc2UoKVxyXG4gICAge1xyXG4gICAgfVxyXG59Il19