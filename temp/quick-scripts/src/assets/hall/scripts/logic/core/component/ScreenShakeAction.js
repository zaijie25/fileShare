"use strict";
cc._RF.push(module, 'b67b3dWvWpKXI0GLEqNazSe', 'ScreenShakeAction');
// hall/scripts/logic/core/component/ScreenShakeAction.ts

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
var ScreenShakeAction = /** @class */ (function (_super) {
    __extends(ScreenShakeAction, _super);
    function ScreenShakeAction(duration, shakeStrengthX, shakeStrengthY) {
        var _this = _super.call(this) || this;
        // 节点初始位置
        _this.nodeInitialPos = null;
        //X轴抖动幅度
        _this.nodeShakeStrengthX = 0;
        //Y轴抖动幅度
        _this.nodeShakeStrengthY = 0;
        //抖动时间
        _this.duration = 0;
        _this.duration = duration;
        _this.initWithDuration(duration, shakeStrengthX, shakeStrengthY);
        return _this;
    }
    ScreenShakeAction.prototype.initWithDuration = function (duration, shakeStrengthX, shakeStrengthY) {
        _super.prototype.initWithDuration.call(this);
        this.setDuration(duration);
        this.nodeShakeStrengthX = shakeStrengthX;
        this.nodeShakeStrengthY = shakeStrengthY;
    };
    // 获取两个数间的随机值
    ScreenShakeAction.prototype.getRandomStrength = function (min, max) {
        return Math.random() * (max - min + 1) + min;
    };
    ScreenShakeAction.prototype.update = function (dt) {
        var randX = this.getRandomStrength(-this.nodeShakeStrengthX, this.nodeShakeStrengthX) * dt;
        var randY = this.getRandomStrength(-this.nodeShakeStrengthY, this.nodeShakeStrengthY) * dt;
        this.getTarget().setPosition(this.nodeInitialPos.add(cc.v2(randX, randY)));
    };
    ScreenShakeAction.prototype.startWithTarget = function (target) {
        _super.prototype.startWithTarget.call(this, target);
        this.nodeInitialPos = target.getPosition();
    };
    ScreenShakeAction.prototype.stop = function () {
        this.getTarget().setPosition(this.nodeInitialPos);
    };
    return ScreenShakeAction;
}(cc.ActionInterval));
exports.default = ScreenShakeAction;

cc._RF.pop();