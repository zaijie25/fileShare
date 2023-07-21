
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/DriverComponent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b365bxmPcRHw5elMPKqLSGK', 'DriverComponent');
// hall/scripts/logic/core/component/DriverComponent.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
//游戏驱动脚本  提供update  全局timer  tween管理等
var DriverComponent = /** @class */ (function (_super) {
    __extends(DriverComponent, _super);
    function DriverComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DriverComponent.prototype.onLoad = function () {
        if (this.onLoadFunc)
            this.onLoadFunc();
    };
    DriverComponent.prototype.update = function (dt) {
        if (this.updateFunc)
            this.updateFunc(dt);
    };
    DriverComponent.prototype.lateUpdate = function () {
        if (this.lateUpdateFunc)
            this.lateUpdateFunc();
    };
    DriverComponent = __decorate([
        ccclass
    ], DriverComponent);
    return DriverComponent;
}(cc.Component));
exports.default = DriverComponent;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcRHJpdmVyQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRTFDLHFDQUFxQztBQUVyQztJQUE2QyxtQ0FBWTtJQUF6RDs7SUF3QkEsQ0FBQztJQWxCRyxnQ0FBTSxHQUFOO1FBRUksSUFBRyxJQUFJLENBQUMsVUFBVTtZQUNkLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsZ0NBQU0sR0FBTixVQUFPLEVBQUU7UUFFTCxJQUFHLElBQUksQ0FBQyxVQUFVO1lBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBRUQsb0NBQVUsR0FBVjtRQUVJLElBQUcsSUFBSSxDQUFDLGNBQWM7WUFDbEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO0lBQzdCLENBQUM7SUF0QmdCLGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0F3Qm5DO0lBQUQsc0JBQUM7Q0F4QkQsQUF3QkMsQ0F4QjRDLEVBQUUsQ0FBQyxTQUFTLEdBd0J4RDtrQkF4Qm9CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8v5ri45oiP6amx5Yqo6ISa5pysICDmj5Dkvpt1cGRhdGUgIOWFqOWxgHRpbWVyICB0d2VlbueuoeeQhuetiVxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcml2ZXJDb21wb25lbnQgZXh0ZW5kcyBjYy5Db21wb25lbnQgXHJcbntcclxuICAgIHB1YmxpYyB1cGRhdGVGdW5jOkZ1bmN0aW9uO1xyXG4gICAgcHVibGljIGxhdGVVcGRhdGVGdW5jOkZ1bmN0aW9uO1xyXG4gICAgcHVibGljIG9uTG9hZEZ1bmM6RnVuY3Rpb247XHJcbiAgICBcclxuICAgIG9uTG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5vbkxvYWRGdW5jKVxyXG4gICAgICAgICAgICB0aGlzLm9uTG9hZEZ1bmMoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy51cGRhdGVGdW5jKVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZ1bmMoZHQpXHJcbiAgICB9XHJcblxyXG4gICAgbGF0ZVVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5sYXRlVXBkYXRlRnVuYylcclxuICAgICAgICAgICAgdGhpcy5sYXRlVXBkYXRlRnVuYygpXHJcbiAgICB9XHJcblxyXG59Il19