
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/ButtonPlus.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '59ca9nBXkZKzJF4XCx0unX2', 'ButtonPlus');
// hall/scripts/logic/core/component/ButtonPlus.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, disallowMultiple = _a.disallowMultiple, menu = _a.menu, executionOrder = _a.executionOrder, requireComponent = _a.requireComponent;
var ButtonPlus = /** @class */ (function (_super) {
    __extends(ButtonPlus, _super);
    function ButtonPlus() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bindedObject = [];
        //点击时间间隔
        _this.CLICK_INTERVAL = 0.2;
        //是否启用时间间隔
        _this.enableClickInterval = true;
        _this._isClickValid = true;
        return _this;
    }
    Object.defineProperty(ButtonPlus.prototype, "isClickValid", {
        get: function () {
            return this._isClickValid || (!this.enableClickInterval);
        },
        set: function (value) {
            this._isClickValid = value;
        },
        enumerable: false,
        configurable: true
    });
    ButtonPlus.prototype.setBind = function (args) {
        this.bindedObject = this.bindedObject.concat(args);
    };
    ButtonPlus.prototype._onTouchCancel = function () {
        _super.prototype._onTouchCancel.call(this);
        this.setParam();
    };
    // _onMouseMoveIn () {
    //     super._onMouseMoveIn()
    //     this.setParam()
    // }
    // _onMouseMoveOut () {
    //     super._onMouseMoveOut()
    //     this.setParam()
    // }
    ButtonPlus.prototype._onTouchBegan = function (event) {
        _super.prototype._onTouchBegan.call(this, event);
        this.setParam();
    };
    ButtonPlus.prototype._onTouchEnded = function (event) {
        _super.prototype._onTouchEnded.call(this, event);
        this.setParam();
    };
    ButtonPlus.prototype.setParam = function () {
        for (var index = 0; index < this.bindedObject.length; index++) {
            var obj = this.bindedObject[index];
            obj.toScale = this._toScale;
            obj.fromScale = this._fromScale;
            obj.transitionFinished = this._transitionFinished;
            obj.Time = this.time;
            obj.Duration = this.duration;
        }
    };
    ButtonPlus = __decorate([
        ccclass,
        disallowMultiple(),
        menu('自定义组件/buttonPlus')
    ], ButtonPlus);
    return ButtonPlus;
}(cc.Button));
exports.default = ButtonPlus;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcQnV0dG9uUGx1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHTSxJQUFBLEtBQStFLEVBQUUsQ0FBQyxVQUFVLEVBQTNGLE9BQU8sYUFBQSxFQUFDLFFBQVEsY0FBQSxFQUFFLGdCQUFnQixzQkFBQSxFQUFFLElBQUksVUFBQSxFQUFFLGNBQWMsb0JBQUEsRUFBRSxnQkFBZ0Isc0JBQWlCLENBQUM7QUFJbkc7SUFBd0MsOEJBQVM7SUFBakQ7UUFBQSxxRUFrRUM7UUFoRVUsa0JBQVksR0FBeUIsRUFBRSxDQUFBO1FBQzlDLFFBQVE7UUFDRCxvQkFBYyxHQUFHLEdBQUcsQ0FBQztRQUM1QixVQUFVO1FBQ0gseUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBRTFCLG1CQUFhLEdBQUcsSUFBSSxDQUFDOztJQTBEakMsQ0FBQztJQXhERyxzQkFBVyxvQ0FBWTthQUt2QjtZQUVJLE9BQU8sSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDN0QsQ0FBQzthQVJELFVBQXdCLEtBQUs7WUFFekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDL0IsQ0FBQzs7O09BQUE7SUFRRCw0QkFBTyxHQUFQLFVBQVEsSUFBSTtRQUVSLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdEQsQ0FBQztJQUVELG1DQUFjLEdBQWQ7UUFDRyxpQkFBTSxjQUFjLFdBQUUsQ0FBQTtRQUN0QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7SUFDbEIsQ0FBQztJQUVELHNCQUFzQjtJQUN0Qiw2QkFBNkI7SUFDN0Isc0JBQXNCO0lBQ3RCLElBQUk7SUFFSix1QkFBdUI7SUFDdkIsOEJBQThCO0lBQzlCLHNCQUFzQjtJQUN0QixJQUFJO0lBRUosa0NBQWEsR0FBYixVQUFlLEtBQUs7UUFDaEIsaUJBQU0sYUFBYSxZQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzFCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUNuQixDQUFDO0lBRUQsa0NBQWEsR0FBYixVQUFjLEtBQUs7UUFFZixpQkFBTSxhQUFhLFlBQUMsS0FBSyxDQUFDLENBQUE7UUFDMUIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQ25CLENBQUM7SUFFRCw2QkFBUSxHQUFSO1FBRUksS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQzNELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFbkMsR0FBRyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFBO1lBQzNCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQTtZQUMvQixHQUFHLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFBO1lBQ2pELEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTtZQUNwQixHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUE7U0FDL0I7SUFFTCxDQUFDO0lBaEVnQixVQUFVO1FBSDlCLE9BQU87UUFDUCxnQkFBZ0IsRUFBRTtRQUNsQixJQUFJLENBQUMsa0JBQWtCLENBQUM7T0FDSixVQUFVLENBa0U5QjtJQUFELGlCQUFDO0NBbEVELEFBa0VDLENBbEV1QyxFQUFFLENBQUMsTUFBTSxHQWtFaEQ7a0JBbEVvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJpbmRpbmdCdXR0b25FZmZlY3QgZnJvbSBcIi4vQmluZGluZ0J1dHRvbkVmZmVjdFwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLHByb3BlcnR5LCBkaXNhbGxvd011bHRpcGxlLCBtZW51LCBleGVjdXRpb25PcmRlciwgcmVxdWlyZUNvbXBvbmVudH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5AY2NjbGFzc1xyXG5AZGlzYWxsb3dNdWx0aXBsZSgpXHJcbkBtZW51KCfoh6rlrprkuYnnu4Tku7YvYnV0dG9uUGx1cycpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1dHRvblBsdXMgZXh0ZW5kcyBjYy5CdXR0b24ge1xyXG5cclxuICAgIHB1YmxpYyBiaW5kZWRPYmplY3Q6QmluZGluZ0J1dHRvbkVmZmVjdFtdID0gW11cclxuICAgIC8v54K55Ye75pe26Ze06Ze06ZqUXHJcbiAgICBwdWJsaWMgQ0xJQ0tfSU5URVJWQUwgPSAwLjI7XHJcbiAgICAvL+aYr+WQpuWQr+eUqOaXtumXtOmXtOmalFxyXG4gICAgcHVibGljIGVuYWJsZUNsaWNrSW50ZXJ2YWwgPSB0cnVlO1xyXG5cclxuICAgIHByaXZhdGUgX2lzQ2xpY2tWYWxpZCA9IHRydWU7XHJcblxyXG4gICAgcHVibGljIHNldCBpc0NsaWNrVmFsaWQodmFsdWUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5faXNDbGlja1ZhbGlkID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc0NsaWNrVmFsaWQoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0NsaWNrVmFsaWQgfHwgKCF0aGlzLmVuYWJsZUNsaWNrSW50ZXJ2YWwpO1xyXG4gICAgfVxyXG5cclxuICAgXHJcbiAgICBzZXRCaW5kKGFyZ3MpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5iaW5kZWRPYmplY3QgPSB0aGlzLmJpbmRlZE9iamVjdC5jb25jYXQoYXJncylcclxuICAgIH1cclxuICAgXHJcbiAgICBfb25Ub3VjaENhbmNlbCAoKSB7XHJcbiAgICAgICBzdXBlci5fb25Ub3VjaENhbmNlbCgpXHJcbiAgICAgICB0aGlzLnNldFBhcmFtKClcclxuICAgIH1cclxuXHJcbiAgICAvLyBfb25Nb3VzZU1vdmVJbiAoKSB7XHJcbiAgICAvLyAgICAgc3VwZXIuX29uTW91c2VNb3ZlSW4oKVxyXG4gICAgLy8gICAgIHRoaXMuc2V0UGFyYW0oKVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIF9vbk1vdXNlTW92ZU91dCAoKSB7XHJcbiAgICAvLyAgICAgc3VwZXIuX29uTW91c2VNb3ZlT3V0KClcclxuICAgIC8vICAgICB0aGlzLnNldFBhcmFtKClcclxuICAgIC8vIH1cclxuXHJcbiAgICBfb25Ub3VjaEJlZ2FuIChldmVudCkge1xyXG4gICAgICAgIHN1cGVyLl9vblRvdWNoQmVnYW4oZXZlbnQpXHJcbiAgICAgICAgdGhpcy5zZXRQYXJhbSgpXHJcbiAgICB9XHJcblxyXG4gICAgX29uVG91Y2hFbmRlZChldmVudClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5fb25Ub3VjaEVuZGVkKGV2ZW50KVxyXG4gICAgICAgIHRoaXMuc2V0UGFyYW0oKVxyXG4gICAgfVxyXG5cclxuICAgIHNldFBhcmFtKClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5iaW5kZWRPYmplY3QubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSB0aGlzLmJpbmRlZE9iamVjdFtpbmRleF07XHJcblxyXG4gICAgICAgICAgICBvYmoudG9TY2FsZSA9IHRoaXMuX3RvU2NhbGVcclxuICAgICAgICAgICAgb2JqLmZyb21TY2FsZSA9IHRoaXMuX2Zyb21TY2FsZVxyXG4gICAgICAgICAgICBvYmoudHJhbnNpdGlvbkZpbmlzaGVkID0gdGhpcy5fdHJhbnNpdGlvbkZpbmlzaGVkXHJcbiAgICAgICAgICAgIG9iai5UaW1lID0gdGhpcy50aW1lXHJcbiAgICAgICAgICAgIG9iai5EdXJhdGlvbiA9IHRoaXMuZHVyYXRpb25cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=