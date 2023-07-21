"use strict";
cc._RF.push(module, '5b78b3IgrlNvZlp2o5/7vKW', 'BindingButtonEffect');
// hall/scripts/logic/core/component/BindingButtonEffect.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, disallowMultiple = _a.disallowMultiple, property = _a.property;
var BindingButtonEffect = /** @class */ (function (_super) {
    __extends(BindingButtonEffect, _super);
    function BindingButtonEffect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._fromScale = cc.Vec2.ZERO;
        _this._toScale = cc.Vec2.ZERO;
        _this._transitionFinished = true;
        _this.transition = 3;
        _this._duration = 0.1;
        _this.time = 0;
        return _this;
        // update (dt) {}
    }
    BindingButtonEffect.prototype.update = function (dt) {
        if (this.transition !== 3)
            return;
        if (this._transitionFinished)
            return;
        this.time += dt;
        var ratio = 1.0;
        if (this._duration > 0) {
            ratio = this.time / this._duration;
        }
        // clamp ratio
        if (ratio >= 1) {
            ratio = 1;
        }
        // Skip if _originalScale is invalid
        this.node.scale = this._fromScale.lerp(this._toScale, ratio).x;
        if (ratio === 1) {
            this._transitionFinished = true;
        }
    };
    Object.defineProperty(BindingButtonEffect.prototype, "toScale", {
        set: function (value) {
            this._toScale = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BindingButtonEffect.prototype, "fromScale", {
        set: function (value) {
            this._fromScale = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BindingButtonEffect.prototype, "transitionFinished", {
        set: function (value) {
            this._transitionFinished = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BindingButtonEffect.prototype, "Time", {
        set: function (value) {
            this.time = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BindingButtonEffect.prototype, "Duration", {
        set: function (value) {
            this._duration = value;
        },
        enumerable: false,
        configurable: true
    });
    BindingButtonEffect = __decorate([
        ccclass,
        disallowMultiple(),
        menu('自定义组件/BindingButtonEffect')
    ], BindingButtonEffect);
    return BindingButtonEffect;
}(cc.Component));
exports.default = BindingButtonEffect;

cc._RF.pop();