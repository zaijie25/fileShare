
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/subView/ErmjLeftTipsView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b3f42vHoyxJz5S3PDx6ulxZ', 'ErmjLeftTipsView');
// ermj/Ermj/scripts/subView/ErmjLeftTipsView.ts

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
var ErmjBaseView_1 = require("./ErmjBaseView");
var ErmjLeftTipsView = /** @class */ (function (_super) {
    __extends(ErmjLeftTipsView, _super);
    function ErmjLeftTipsView(node) {
        var _this = _super.call(this) || this;
        _this.nLeftCount = 0;
        _this.setNode(node);
        return _this;
    }
    ErmjLeftTipsView.prototype.initView = function () {
        this.leftLbl = this.getComponent("leftLbl", cc.Label);
        this.leftLbl.string = "";
    };
    ErmjLeftTipsView.prototype.updateLeftLbl = function (nCount) {
        this.nLeftCount = nCount;
        this.leftLbl.string = String(nCount);
    };
    ErmjLeftTipsView.prototype.reduceLeftLbl = function (dev) {
        this.updateLeftLbl(this.nLeftCount - dev);
    };
    ErmjLeftTipsView.prototype.clearByRound = function () {
        this.leftLbl.string = "0";
        this.active = false;
    };
    return ErmjLeftTipsView;
}(ErmjBaseView_1.default));
exports.default = ErmjLeftTipsView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcc3ViVmlld1xcRXJtakxlZnRUaXBzVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBMEM7QUFFMUM7SUFBOEMsb0NBQVk7SUFHdEQsMEJBQVksSUFBYTtRQUF6QixZQUNJLGlCQUFPLFNBRVY7UUFKTyxnQkFBVSxHQUFXLENBQUMsQ0FBQztRQUczQixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztJQUN2QixDQUFDO0lBRVMsbUNBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVNLHdDQUFhLEdBQXBCLFVBQXFCLE1BQWM7UUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSx3Q0FBYSxHQUFwQixVQUFxQixHQUFXO1FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRU0sdUNBQVksR0FBbkI7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0ExQkEsQUEwQkMsQ0ExQjZDLHNCQUFZLEdBMEJ6RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFcm1qQmFzZVZpZXcgZnJvbSBcIi4vRXJtakJhc2VWaWV3XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFcm1qTGVmdFRpcHNWaWV3IGV4dGVuZHMgRXJtakJhc2VWaWV3e1xyXG4gICAgcHJpdmF0ZSBsZWZ0TGJsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgbkxlZnRDb3VudDogbnVtYmVyID0gMDtcclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIHRoaXMubGVmdExibCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwibGVmdExibFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5sZWZ0TGJsLnN0cmluZyA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZUxlZnRMYmwobkNvdW50OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMubkxlZnRDb3VudCA9IG5Db3VudDtcclxuICAgICAgICB0aGlzLmxlZnRMYmwuc3RyaW5nID0gU3RyaW5nKG5Db3VudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZHVjZUxlZnRMYmwoZGV2OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMudXBkYXRlTGVmdExibCh0aGlzLm5MZWZ0Q291bnQgLSBkZXYpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckJ5Um91bmQoKXtcclxuICAgICAgICB0aGlzLmxlZnRMYmwuc3RyaW5nID0gXCIwXCI7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxufSJdfQ==