"use strict";
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