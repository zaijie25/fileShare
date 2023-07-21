
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/YXButton.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ee8d2nly8dFiaE172e5AlM9', 'YXButton');
// hall/scripts/logic/core/component/YXButton.ts

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
var YXButton = /** @class */ (function (_super) {
    __extends(YXButton, _super);
    function YXButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bindedObject = [];
        //点击时间间隔
        _this.CLICK_INTERVAL = 0.2;
        //是否启用时间间隔
        _this.enableClickInterval = true;
        _this._isClickValid = true;
        return _this;
    }
    Object.defineProperty(YXButton.prototype, "isClickValid", {
        get: function () {
            return this._isClickValid || (!this.enableClickInterval);
        },
        set: function (value) {
            this._isClickValid = value;
        },
        enumerable: false,
        configurable: true
    });
    YXButton.prototype.setBind = function (args) {
        this.bindedObject = this.bindedObject.concat(args);
    };
    YXButton.prototype._onTouchCancel = function () {
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
    YXButton.prototype._onTouchBegan = function (event) {
        _super.prototype._onTouchBegan.call(this, event);
        this.setParam();
    };
    YXButton.prototype._onTouchEnded = function (event) {
        _super.prototype._onTouchEnded.call(this, event);
        this.setParam();
    };
    YXButton.prototype.setParam = function () {
        for (var index = 0; index < this.bindedObject.length; index++) {
            var obj = this.bindedObject[index];
            obj.toScale = this._toScale;
            obj.fromScale = this._fromScale;
            obj.transitionFinished = this._transitionFinished;
            obj.Time = this.time;
            obj.Duration = this.duration;
        }
    };
    YXButton.prototype.setActive = function (flag) {
        for (var index = 0; index < this.bindedObject.length; index++) {
            var obj = this.bindedObject[index].node;
            if (obj && cc.isValid(obj)) {
                obj.active = flag;
            }
        }
    };
    YXButton = __decorate([
        ccclass,
        disallowMultiple(),
        menu('自定义组件/YXButton')
    ], YXButton);
    return YXButton;
}(cc.Button));
exports.default = YXButton;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcWVhCdXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR00sSUFBQSxLQUErRSxFQUFFLENBQUMsVUFBVSxFQUEzRixPQUFPLGFBQUEsRUFBQyxRQUFRLGNBQUEsRUFBRSxnQkFBZ0Isc0JBQUEsRUFBRSxJQUFJLFVBQUEsRUFBRSxjQUFjLG9CQUFBLEVBQUUsZ0JBQWdCLHNCQUFpQixDQUFDO0FBSW5HO0lBQXNDLDRCQUFTO0lBQS9DO1FBQUEscUVBNkVDO1FBM0VVLGtCQUFZLEdBQXlCLEVBQUUsQ0FBQTtRQUM5QyxRQUFRO1FBQ0Qsb0JBQWMsR0FBRyxHQUFHLENBQUM7UUFDNUIsVUFBVTtRQUNILHlCQUFtQixHQUFHLElBQUksQ0FBQztRQUUxQixtQkFBYSxHQUFHLElBQUksQ0FBQzs7SUFxRWpDLENBQUM7SUFuRUcsc0JBQVcsa0NBQVk7YUFLdkI7WUFFSSxPQUFPLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzdELENBQUM7YUFSRCxVQUF3QixLQUFLO1lBRXpCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQy9CLENBQUM7OztPQUFBO0lBUUQsMEJBQU8sR0FBUCxVQUFRLElBQUk7UUFFUixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3RELENBQUM7SUFFRCxpQ0FBYyxHQUFkO1FBQ0csaUJBQU0sY0FBYyxXQUFFLENBQUE7UUFDdEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQ2xCLENBQUM7SUFFRCxzQkFBc0I7SUFDdEIsNkJBQTZCO0lBQzdCLHNCQUFzQjtJQUN0QixJQUFJO0lBRUosdUJBQXVCO0lBQ3ZCLDhCQUE4QjtJQUM5QixzQkFBc0I7SUFDdEIsSUFBSTtJQUVKLGdDQUFhLEdBQWIsVUFBZSxLQUFLO1FBQ2hCLGlCQUFNLGFBQWEsWUFBQyxLQUFLLENBQUMsQ0FBQTtRQUMxQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7SUFDbkIsQ0FBQztJQUVELGdDQUFhLEdBQWIsVUFBYyxLQUFLO1FBRWYsaUJBQU0sYUFBYSxZQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzFCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUNuQixDQUFDO0lBRUQsMkJBQVEsR0FBUjtRQUVJLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUMzRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRW5DLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQTtZQUMzQixHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUE7WUFDL0IsR0FBRyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQTtZQUNqRCxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUE7WUFDcEIsR0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFBO1NBQy9CO0lBRUwsQ0FBQztJQUVELDRCQUFTLEdBQVQsVUFBVSxJQUFJO1FBRVYsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQzNELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3hDLElBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQ3pCO2dCQUNJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO2FBQ3BCO1NBQ0o7SUFDTCxDQUFDO0lBM0VnQixRQUFRO1FBSDVCLE9BQU87UUFDUCxnQkFBZ0IsRUFBRTtRQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUM7T0FDRixRQUFRLENBNkU1QjtJQUFELGVBQUM7Q0E3RUQsQUE2RUMsQ0E3RXFDLEVBQUUsQ0FBQyxNQUFNLEdBNkU5QztrQkE3RW9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmluZGluZ0J1dHRvbkVmZmVjdCBmcm9tIFwiLi9CaW5kaW5nQnV0dG9uRWZmZWN0XCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MscHJvcGVydHksIGRpc2FsbG93TXVsdGlwbGUsIG1lbnUsIGV4ZWN1dGlvbk9yZGVyLCByZXF1aXJlQ29tcG9uZW50fSA9IGNjLl9kZWNvcmF0b3I7XHJcbkBjY2NsYXNzXHJcbkBkaXNhbGxvd011bHRpcGxlKClcclxuQG1lbnUoJ+iHquWumuS5iee7hOS7ti9ZWEJ1dHRvbicpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFlYQnV0dG9uIGV4dGVuZHMgY2MuQnV0dG9uIHtcclxuXHJcbiAgICBwdWJsaWMgYmluZGVkT2JqZWN0OkJpbmRpbmdCdXR0b25FZmZlY3RbXSA9IFtdXHJcbiAgICAvL+eCueWHu+aXtumXtOmXtOmalFxyXG4gICAgcHVibGljIENMSUNLX0lOVEVSVkFMID0gMC4yO1xyXG4gICAgLy/mmK/lkKblkK/nlKjml7bpl7Tpl7TpmpRcclxuICAgIHB1YmxpYyBlbmFibGVDbGlja0ludGVydmFsID0gdHJ1ZTtcclxuXHJcbiAgICBwcml2YXRlIF9pc0NsaWNrVmFsaWQgPSB0cnVlO1xyXG5cclxuICAgIHB1YmxpYyBzZXQgaXNDbGlja1ZhbGlkKHZhbHVlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX2lzQ2xpY2tWYWxpZCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNDbGlja1ZhbGlkKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNDbGlja1ZhbGlkIHx8ICghdGhpcy5lbmFibGVDbGlja0ludGVydmFsKTtcclxuICAgIH1cclxuXHJcbiAgIFxyXG4gICAgc2V0QmluZChhcmdzKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYmluZGVkT2JqZWN0ID0gdGhpcy5iaW5kZWRPYmplY3QuY29uY2F0KGFyZ3MpXHJcbiAgICB9XHJcbiAgIFxyXG4gICAgX29uVG91Y2hDYW5jZWwgKCkge1xyXG4gICAgICAgc3VwZXIuX29uVG91Y2hDYW5jZWwoKVxyXG4gICAgICAgdGhpcy5zZXRQYXJhbSgpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gX29uTW91c2VNb3ZlSW4gKCkge1xyXG4gICAgLy8gICAgIHN1cGVyLl9vbk1vdXNlTW92ZUluKClcclxuICAgIC8vICAgICB0aGlzLnNldFBhcmFtKClcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBfb25Nb3VzZU1vdmVPdXQgKCkge1xyXG4gICAgLy8gICAgIHN1cGVyLl9vbk1vdXNlTW92ZU91dCgpXHJcbiAgICAvLyAgICAgdGhpcy5zZXRQYXJhbSgpXHJcbiAgICAvLyB9XHJcblxyXG4gICAgX29uVG91Y2hCZWdhbiAoZXZlbnQpIHtcclxuICAgICAgICBzdXBlci5fb25Ub3VjaEJlZ2FuKGV2ZW50KVxyXG4gICAgICAgIHRoaXMuc2V0UGFyYW0oKVxyXG4gICAgfVxyXG5cclxuICAgIF9vblRvdWNoRW5kZWQoZXZlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIuX29uVG91Y2hFbmRlZChldmVudClcclxuICAgICAgICB0aGlzLnNldFBhcmFtKClcclxuICAgIH1cclxuXHJcbiAgICBzZXRQYXJhbSgpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuYmluZGVkT2JqZWN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgb2JqID0gdGhpcy5iaW5kZWRPYmplY3RbaW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgb2JqLnRvU2NhbGUgPSB0aGlzLl90b1NjYWxlXHJcbiAgICAgICAgICAgIG9iai5mcm9tU2NhbGUgPSB0aGlzLl9mcm9tU2NhbGVcclxuICAgICAgICAgICAgb2JqLnRyYW5zaXRpb25GaW5pc2hlZCA9IHRoaXMuX3RyYW5zaXRpb25GaW5pc2hlZFxyXG4gICAgICAgICAgICBvYmouVGltZSA9IHRoaXMudGltZVxyXG4gICAgICAgICAgICBvYmouRHVyYXRpb24gPSB0aGlzLmR1cmF0aW9uXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXRBY3RpdmUoZmxhZylcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5iaW5kZWRPYmplY3QubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSB0aGlzLmJpbmRlZE9iamVjdFtpbmRleF0ubm9kZTtcclxuICAgICAgICAgICAgaWYob2JqICYmIGNjLmlzVmFsaWQob2JqKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb2JqLmFjdGl2ZSA9IGZsYWdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19