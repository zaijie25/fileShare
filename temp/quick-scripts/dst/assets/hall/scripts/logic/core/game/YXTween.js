
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/game/YXTween.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGdhbWVcXFlYVHdlZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQTZCLDJCQUFRO0lBQXJDOztJQWdCQSxDQUFDO0lBZEcsb0JBQW9CO0lBQ2IsdUJBQUssR0FBWjtRQUVJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBQ2hELE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxJQUFJLElBQUksRUFBRTtZQUNOLEVBQUUsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ2xFO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2RSxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsY0FBQztBQUFELENBaEJBLEFBZ0JDLENBaEI0QixFQUFFLENBQUMsS0FBSyxHQWdCcEM7QUFoQlksMEJBQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgWVhUd2VlbiBleHRlbmRzIGNjLlR3ZWVuXHJcbntcclxuICAgIC8v5by65Yi25L2/55So5YaF6YOoYWN0aW9uTWdy566h55CG5ZmoXHJcbiAgICBwdWJsaWMgc3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghdGhpcy50YXJnZXQpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLndhcm4oJ1BsZWFzZSBzZXQgdGFyZ2V0IHRvIHR3ZWVuIGZpcnN0Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcykge1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCkucmVtb3ZlQWN0aW9uKHRoaXMuX2ZpbmFsQWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZmluYWxBY3Rpb24gPSB0aGlzLl91bmlvbigpO1xyXG4gICAgICAgIEdhbWUuVHdlZW4uYWN0aW9uTWdyLmFkZEFjdGlvbih0aGlzLl9maW5hbEFjdGlvbiwgdGhpcy5fdGFyZ2V0LCBmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn0iXX0=