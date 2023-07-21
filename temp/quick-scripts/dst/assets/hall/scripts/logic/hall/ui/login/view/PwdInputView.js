
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/login/view/PwdInputView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f5e36MHxhNF5aR01OMbSPvz', 'PwdInputView');
// hall/scripts/logic/hall/ui/login/view/PwdInputView.ts

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
var ViewBase_1 = require("../../../../core/ui/ViewBase");
var PwdInputView = /** @class */ (function (_super) {
    __extends(PwdInputView, _super);
    function PwdInputView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pwdVisible = false;
        return _this;
    }
    PwdInputView.prototype.initView = function () {
        this.pwdInput = this.getComponent("pwd", cc.EditBox);
        this.pwdInput.placeholder = "请输入6~10位数字和字母密码";
        this.pwdInput.maxLength = 16;
        this.visibleIcon = this.getChild("visibleIcon");
        this.inVisibleIcon = this.getChild("inVisibleIcon");
        this.addCommonClick("visibleIcon", this.onVisibleClick, this, null);
        this.addCommonClick("inVisibleIcon", this.onVisibleClick, this, null);
    };
    PwdInputView.prototype.onVisibleClick = function () {
        this.pwdVisible = !this.pwdVisible;
        if (this.pwdVisible)
            this.pwdInput.inputFlag = cc.EditBox.InputFlag.DEFAULT;
        else
            this.pwdInput.inputFlag = cc.EditBox.InputFlag.PASSWORD;
        this.updateVisible();
    };
    Object.defineProperty(PwdInputView.prototype, "pwd", {
        get: function () {
            return this.pwdInput.string;
        },
        set: function (str) {
            this.pwdInput.string = str;
        },
        enumerable: false,
        configurable: true
    });
    PwdInputView.prototype.onSubViewShow = function () {
        this.pwdVisible = false;
        this.updateVisible();
    };
    PwdInputView.prototype.updateVisible = function () {
        this.visibleIcon.active = this.pwdVisible;
        this.inVisibleIcon.active = !this.pwdVisible;
    };
    return PwdInputView;
}(ViewBase_1.default));
exports.default = PwdInputView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxsb2dpblxcdmlld1xcUHdkSW5wdXRWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUFvRDtBQUVwRDtJQUEwQyxnQ0FBUTtJQUFsRDtRQUFBLHFFQWlEQztRQTVDVyxnQkFBVSxHQUFHLEtBQUssQ0FBQzs7SUE0Qy9CLENBQUM7SUExQ2EsK0JBQVEsR0FBbEI7UUFFSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQztRQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRU8scUNBQWMsR0FBdEI7UUFFSSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNuQyxJQUFHLElBQUksQ0FBQyxVQUFVO1lBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDOztZQUV2RCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFDNUQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxzQkFBVyw2QkFBRzthQUFkO1lBRUksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUNoQyxDQUFDO2FBRUQsVUFBZSxHQUFXO1lBRXRCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQTtRQUM5QixDQUFDOzs7T0FMQTtJQU9TLG9DQUFhLEdBQXZCO1FBRUksSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTyxvQ0FBYSxHQUFyQjtRQUVJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDMUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ2pELENBQUM7SUFDTCxtQkFBQztBQUFELENBakRBLEFBaURDLENBakR5QyxrQkFBUSxHQWlEakQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvdWkvVmlld0Jhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB3ZElucHV0VmlldyBleHRlbmRzIFZpZXdCYXNlXHJcbntcclxuICAgIHByaXZhdGUgcHdkSW5wdXQ6Y2MuRWRpdEJveDtcclxuICAgIHByaXZhdGUgdmlzaWJsZUljb246Y2MuTm9kZTtcclxuICAgIHByaXZhdGUgaW5WaXNpYmxlSWNvbjpjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBwd2RWaXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnB3ZElucHV0ID0gdGhpcy5nZXRDb21wb25lbnQoXCJwd2RcIiwgY2MuRWRpdEJveCk7XHJcbiAgICAgICAgdGhpcy5wd2RJbnB1dC5wbGFjZWhvbGRlciA9IFwi6K+36L6T5YWlNn4xMOS9jeaVsOWtl+WSjOWtl+avjeWvhueggVwiO1xyXG4gICAgICAgIHRoaXMucHdkSW5wdXQubWF4TGVuZ3RoID0gMTY7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlSWNvbiA9IHRoaXMuZ2V0Q2hpbGQoXCJ2aXNpYmxlSWNvblwiKTtcclxuICAgICAgICB0aGlzLmluVmlzaWJsZUljb24gPSB0aGlzLmdldENoaWxkKFwiaW5WaXNpYmxlSWNvblwiKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwidmlzaWJsZUljb25cIiwgdGhpcy5vblZpc2libGVDbGljaywgdGhpcywgbnVsbCk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImluVmlzaWJsZUljb25cIiwgdGhpcy5vblZpc2libGVDbGljaywgdGhpcywgbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblZpc2libGVDbGljaygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wd2RWaXNpYmxlID0gIXRoaXMucHdkVmlzaWJsZTtcclxuICAgICAgICBpZih0aGlzLnB3ZFZpc2libGUpXHJcbiAgICAgICAgICAgIHRoaXMucHdkSW5wdXQuaW5wdXRGbGFnID0gY2MuRWRpdEJveC5JbnB1dEZsYWcuREVGQVVMVDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMucHdkSW5wdXQuaW5wdXRGbGFnID0gY2MuRWRpdEJveC5JbnB1dEZsYWcuUEFTU1dPUkQ7XHJcbiAgICAgICAgdGhpcy51cGRhdGVWaXNpYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwd2QoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnB3ZElucHV0LnN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHB3ZChzdHI6IHN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLnB3ZElucHV0LnN0cmluZyA9IHN0clxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvblN1YlZpZXdTaG93KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnB3ZFZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVZpc2libGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVZpc2libGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZUljb24uYWN0aXZlID0gdGhpcy5wd2RWaXNpYmxlO1xyXG4gICAgICAgIHRoaXMuaW5WaXNpYmxlSWNvbi5hY3RpdmUgPSAhdGhpcy5wd2RWaXNpYmxlO1xyXG4gICAgfVxyXG59Il19