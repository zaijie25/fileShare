"use strict";
cc._RF.push(module, 'b074a2+7X9Feqsp9V0YzFNv', 'YXTween');
// hall/scripts/logic/core/game/YXTween.ts

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
exports.YXTween = void 0;
var YXTween = /** @class */ (function (_super) {
    __extends(YXTween, _super);
    function YXTween() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //强制使用内部actionMgr管理器
    YXTween.prototype.start = function () {
        if (!this.target) {
            Logger.warn('Please set target to tween first');
            return this;
        }
        if (this) {
            cc.director.getActionManager().removeAction(this._finalAction);
        }
        this._finalAction = this._union();
        Game.Tween.actionMgr.addAction(this._finalAction, this._target, false);
        return this;
    };
    return YXTween;
}(cc.Tween));
exports.YXTween = YXTween;

cc._RF.pop();