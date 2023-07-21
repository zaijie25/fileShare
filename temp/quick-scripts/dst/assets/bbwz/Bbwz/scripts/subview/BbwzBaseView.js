
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/subview/BbwzBaseView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6a10aEetitLIKF8GCMlBvwg', 'BbwzBaseView');
// bbwz/Bbwz/scripts/subview/BbwzBaseView.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//viewBase   暂时不继承compoennt，不需要额外的开销
var BbwzBaseView = /** @class */ (function () {
    // debug 子类函数声明默认值在 父类构造之后
    function BbwzBaseView() {
        this._active = false;
        this.Context = Game.Context;
    }
    Object.defineProperty(BbwzBaseView.prototype, "active", {
        get: function () {
            return this._active;
        },
        set: function (value) {
            if (value == this._active)
                return;
            this._active = value;
            this.node.active = value;
            if (this._active)
                this.onOpen();
            else
                this.onClose();
        },
        enumerable: false,
        configurable: true
    });
    //强制设置active 触发onClose onOpen
    BbwzBaseView.prototype.setActive = function (value) {
        this._active = !value;
        this.active = value;
    };
    BbwzBaseView.prototype.setNode = function (node) {
        this.node = node;
        if (node == null || !cc.isValid(node)) {
            Logger.error("node == null || !cc.isValid(node)");
            return;
        }
        this._active = node;
        this.initView();
    };
    BbwzBaseView.prototype.initView = function () {
    };
    BbwzBaseView.prototype.onOpen = function () { };
    BbwzBaseView.prototype.onClose = function () { };
    BbwzBaseView.prototype.clearByGame = function () {
        this.clearByRound();
    };
    BbwzBaseView.prototype.clearByRound = function () { };
    BbwzBaseView.prototype.getComponent = function (path, type) {
        return Global.UIHelper.getComponent(this.node, path, type);
    };
    BbwzBaseView.prototype.getChild = function (path) {
        return Global.UIHelper.getChild(this.node, path);
    };
    return BbwzBaseView;
}());
exports.default = BbwzBaseView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcc3Vidmlld1xcQmJ3ekJhc2VWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esb0NBQW9DO0FBQ3BDO0lBUUksMEJBQTBCO0lBQzFCO1FBSFEsWUFBTyxHQUFXLEtBQUssQ0FBQztRQUs1QixJQUFJLENBQUMsT0FBTyxHQUFhLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDMUMsQ0FBQztJQUVELHNCQUFXLGdDQUFNO2FBQWpCO1lBRUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7YUFFRCxVQUFrQixLQUFLO1lBRW5CLElBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPO2dCQUNwQixPQUFPO1lBQ1gsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLElBQUcsSUFBSSxDQUFDLE9BQU87Z0JBQ1gsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDOztnQkFFZCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkIsQ0FBQzs7O09BWkE7SUFjRCw2QkFBNkI7SUFDdEIsZ0NBQVMsR0FBaEIsVUFBaUIsS0FBSztRQUVsQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFHTSw4QkFBTyxHQUFkLFVBQWUsSUFBSTtRQUVmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQ3BDO1lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1lBQ2xELE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRVMsK0JBQVEsR0FBbEI7SUFHQSxDQUFDO0lBRVMsNkJBQU0sR0FBaEIsY0FDQyxDQUFDO0lBRVEsOEJBQU8sR0FBakIsY0FDQyxDQUFDO0lBRUssa0NBQVcsR0FBbEI7UUFFSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVNLG1DQUFZLEdBQW5CLGNBQ0MsQ0FBQztJQUlRLG1DQUFZLEdBQXRCLFVBQXVCLElBQVcsRUFBRSxJQUFTO1FBRXpDLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDOUQsQ0FBQztJQUVTLCtCQUFRLEdBQWxCLFVBQW1CLElBQVc7UUFFMUIsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3BELENBQUM7SUFFTCxtQkFBQztBQUFELENBbEZBLEFBa0ZDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmJ3ekRhdGEgZnJvbSBcIi4uL2RhdGEvQmJ3ekRhdGFcIjtcclxuXHJcblxyXG4vL3ZpZXdCYXNlICAg5pqC5pe25LiN57un5om/Y29tcG9lbm5077yM5LiN6ZyA6KaB6aKd5aSW55qE5byA6ZSAXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJid3pCYXNlVmlld1xyXG57XHJcbiAgICBwcm90ZWN0ZWQgQ29udGV4dDogQmJ3ekRhdGE7XHJcblxyXG5cclxuICAgIHB1YmxpYyBub2RlOmNjLk5vZGU7XHJcbiAgICBwcml2YXRlIF9hY3RpdmU6Ym9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8vIGRlYnVnIOWtkOexu+WHveaVsOWjsOaYjum7mOiupOWAvOWcqCDniLbnsbvmnoTpgKDkuYvlkI5cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkNvbnRleHQgPSA8QmJ3ekRhdGE+R2FtZS5Db250ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYWN0aXZlKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgYWN0aXZlKHZhbHVlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHZhbHVlID09IHRoaXMuX2FjdGl2ZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB2YWx1ZTtcclxuICAgICAgICBpZih0aGlzLl9hY3RpdmUpXHJcbiAgICAgICAgICAgIHRoaXMub25PcGVuKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+W8uuWItuiuvue9rmFjdGl2ZSDop6blj5FvbkNsb3NlIG9uT3BlblxyXG4gICAgcHVibGljIHNldEFjdGl2ZSh2YWx1ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9hY3RpdmUgPSAhdmFsdWU7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHNldE5vZGUobm9kZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG4gICAgICAgIGlmKG5vZGUgPT0gbnVsbCB8fCAhY2MuaXNWYWxpZChub2RlKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIm5vZGUgPT0gbnVsbCB8fCAhY2MuaXNWYWxpZChub2RlKVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9hY3RpdmUgPSBub2RlO1xyXG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKClcclxuICAgIHt9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKVxyXG4gICAge31cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJCeUdhbWUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2xlYXJCeVJvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQnlSb3VuZCgpXHJcbiAgICB7fVxyXG5cclxuICAgIC8vIOezu+e7n+e7hOS7tumHh+eUqO+8jOiHquW7uue7hOS7tuS9v+eUqEdsb2JhbC5VSUhlbHBlci5zYWZlR2V0Q29tcG9uZW50XHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q29tcG9uZW50PFQgZXh0ZW5kcyBjYy5Db21wb25lbnQ+KHBhdGg6c3RyaW5nLCB0eXBlOiB7cHJvdG90eXBlOiBUfSk6IFQ7XHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q29tcG9uZW50KHBhdGg6c3RyaW5nLCB0eXBlOiBhbnkpOiBhbnlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gR2xvYmFsLlVJSGVscGVyLmdldENvbXBvbmVudCh0aGlzLm5vZGUsIHBhdGgsIHR5cGUpXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldENoaWxkKHBhdGg6c3RyaW5nKTogY2MuTm9kZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBHbG9iYWwuVUlIZWxwZXIuZ2V0Q2hpbGQodGhpcy5ub2RlLCBwYXRoKVxyXG4gICAgfVxyXG5cclxufSJdfQ==