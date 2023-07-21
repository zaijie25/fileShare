
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/BindingButtonEffect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcQmluZGluZ0J1dHRvbkVmZmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU1RSxJQUFBLEtBQTRDLEVBQUUsQ0FBQyxVQUFVLEVBQXhELE9BQU8sYUFBQSxFQUFFLElBQUksVUFBQSxFQUFDLGdCQUFnQixzQkFBQSxFQUFDLFFBQVEsY0FBaUIsQ0FBQztBQUtoRTtJQUFpRCx1Q0FBWTtJQUE3RDtRQUFBLHFFQWtFQztRQS9EVyxnQkFBVSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzFCLGNBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUV4Qix5QkFBbUIsR0FBRyxJQUFJLENBQUE7UUFFMUIsZ0JBQVUsR0FBRyxDQUFDLENBQUE7UUFFZCxlQUFTLEdBQUcsR0FBRyxDQUFBO1FBRWYsVUFBSSxHQUFHLENBQUMsQ0FBQTs7UUFxRGhCLGlCQUFpQjtJQUNyQixDQUFDO0lBbERHLG9DQUFNLEdBQU4sVUFBTyxFQUFFO1FBRUwsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUM7WUFBRSxPQUFPO1FBQ2xDLElBQUksSUFBSSxDQUFDLG1CQUFtQjtZQUFFLE9BQU87UUFDckMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDaEIsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUU7WUFDcEIsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUN0QztRQUVELGNBQWM7UUFDZCxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDWixLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ2I7UUFDRCxvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFHL0QsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ2IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztTQUNuQztJQUNMLENBQUM7SUFFRCxzQkFBVyx3Q0FBTzthQUFsQixVQUFtQixLQUFLO1lBRXBCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO1FBQ3pCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsMENBQVM7YUFBcEIsVUFBcUIsS0FBSztZQUV0QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQTtRQUMzQixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLG1EQUFrQjthQUE3QixVQUE4QixLQUFLO1lBRS9CLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUE7UUFDcEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxxQ0FBSTthQUFmLFVBQWdCLEtBQUs7WUFFakIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUE7UUFDckIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyx5Q0FBUTthQUFuQixVQUFvQixLQUFLO1lBRXJCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFBO1FBQzFCLENBQUM7OztPQUFBO0lBOURnQixtQkFBbUI7UUFIdkMsT0FBTztRQUNQLGdCQUFnQixFQUFFO1FBQ2xCLElBQUksQ0FBQywyQkFBMkIsQ0FBQztPQUNiLG1CQUFtQixDQWtFdkM7SUFBRCwwQkFBQztDQWxFRCxBQWtFQyxDQWxFZ0QsRUFBRSxDQUFDLFNBQVMsR0FrRTVEO2tCQWxFb0IsbUJBQW1CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY29uc3Qge2NjY2xhc3MsIG1lbnUsZGlzYWxsb3dNdWx0aXBsZSxwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuQGRpc2FsbG93TXVsdGlwbGUoKVxyXG5AbWVudSgn6Ieq5a6a5LmJ57uE5Lu2L0JpbmRpbmdCdXR0b25FZmZlY3QnKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaW5kaW5nQnV0dG9uRWZmZWN0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBfZnJvbVNjYWxlID0gY2MuVmVjMi5aRVJPO1xyXG4gICAgcHJpdmF0ZSBfdG9TY2FsZSA9IGNjLlZlYzIuWkVSTztcclxuXHJcbiAgICBwcml2YXRlIF90cmFuc2l0aW9uRmluaXNoZWQgPSB0cnVlXHJcblxyXG4gICAgcHJpdmF0ZSB0cmFuc2l0aW9uID0gM1xyXG5cclxuICAgIHByaXZhdGUgX2R1cmF0aW9uID0gMC4xXHJcblxyXG4gICAgcHJpdmF0ZSB0aW1lID0gMFxyXG5cclxuICAgXHJcblxyXG4gICAgdXBkYXRlKGR0KVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLnRyYW5zaXRpb24gIT09IDMpIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5fdHJhbnNpdGlvbkZpbmlzaGVkKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy50aW1lICs9IGR0O1xyXG4gICAgICAgIGxldCByYXRpbyA9IDEuMDtcclxuICAgICAgICBpZiAodGhpcy5fZHVyYXRpb24gPiAwKSB7XHJcbiAgICAgICAgICAgIHJhdGlvID0gdGhpcy50aW1lIC8gdGhpcy5fZHVyYXRpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjbGFtcCByYXRpb1xyXG4gICAgICAgIGlmIChyYXRpbyA+PSAxKSB7XHJcbiAgICAgICAgICAgIHJhdGlvID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU2tpcCBpZiBfb3JpZ2luYWxTY2FsZSBpcyBpbnZhbGlkXHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gdGhpcy5fZnJvbVNjYWxlLmxlcnAodGhpcy5fdG9TY2FsZSwgcmF0aW8pLng7XHJcblxyXG5cclxuICAgICAgICBpZiAocmF0aW8gPT09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fdHJhbnNpdGlvbkZpbmlzaGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB0b1NjYWxlKHZhbHVlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX3RvU2NhbGUgPSB2YWx1ZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZnJvbVNjYWxlKHZhbHVlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX2Zyb21TY2FsZSA9IHZhbHVlXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCB0cmFuc2l0aW9uRmluaXNoZWQodmFsdWUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fdHJhbnNpdGlvbkZpbmlzaGVkID0gdmFsdWVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IFRpbWUodmFsdWUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50aW1lID0gdmFsdWVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IER1cmF0aW9uKHZhbHVlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX2R1cmF0aW9uID0gdmFsdWVcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=