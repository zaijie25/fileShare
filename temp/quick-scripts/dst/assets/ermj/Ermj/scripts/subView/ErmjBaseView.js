
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/subView/ErmjBaseView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e3092rL43NNzaEPgV4iUGfH', 'ErmjBaseView');
// ermj/Ermj/scripts/subView/ErmjBaseView.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErmjDriver_1 = require("../ErmjDriver");
//viewBase   暂时不继承compoennt，不需要额外的开销
var ErmjBaseView = /** @class */ (function () {
    // debug 子类函数声明默认值在 父类构造之后
    function ErmjBaseView() {
        this._active = false;
        this.Path = ErmjDriver_1.default.instance.Path;
        this.Define = ErmjDriver_1.default.instance.Define;
        this.Context = ErmjDriver_1.default.instance.Context;
    }
    Object.defineProperty(ErmjBaseView.prototype, "active", {
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
    ErmjBaseView.prototype.setActive = function (value) {
        this._active = !value;
        this.active = value;
    };
    ErmjBaseView.prototype.setNode = function (node) {
        this.node = node;
        if (node == null || !cc.isValid(node)) {
            Logger.error("node == null || !cc.isValid(node)");
            return;
        }
        this._active = node;
        this.initView();
    };
    ErmjBaseView.prototype.initView = function () {
    };
    ErmjBaseView.prototype.onOpen = function () { };
    ErmjBaseView.prototype.onClose = function () { };
    ErmjBaseView.prototype.clearByGame = function () {
        this.clearByRound();
    };
    ErmjBaseView.prototype.clearByRound = function () { };
    ErmjBaseView.prototype.getComponent = function (path, type) {
        return Global.UIHelper.getComponent(this.node, path, type);
    };
    ErmjBaseView.prototype.getChild = function (path) {
        return Global.UIHelper.getChild(this.node, path);
    };
    return ErmjBaseView;
}());
exports.default = ErmjBaseView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcc3ViVmlld1xcRXJtakJhc2VWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsNENBQXVDO0FBRXZDLG9DQUFvQztBQUNwQztJQVNJLDBCQUEwQjtJQUMxQjtRQUhRLFlBQU8sR0FBVyxLQUFLLENBQUM7UUFLNUIsSUFBSSxDQUFDLElBQUksR0FBRyxvQkFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxvQkFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxvQkFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7SUFDL0MsQ0FBQztJQUVELHNCQUFXLGdDQUFNO2FBQWpCO1lBRUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7YUFFRCxVQUFrQixLQUFLO1lBRW5CLElBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPO2dCQUNwQixPQUFPO1lBQ1gsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLElBQUcsSUFBSSxDQUFDLE9BQU87Z0JBQ1gsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDOztnQkFFZCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkIsQ0FBQzs7O09BWkE7SUFjRCw2QkFBNkI7SUFDdEIsZ0NBQVMsR0FBaEIsVUFBaUIsS0FBSztRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFFTSw4QkFBTyxHQUFkLFVBQWUsSUFBSTtRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQ3BDO1lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1lBQ2xELE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRVMsK0JBQVEsR0FBbEI7SUFHQSxDQUFDO0lBRVMsNkJBQU0sR0FBaEIsY0FDQyxDQUFDO0lBRVEsOEJBQU8sR0FBakIsY0FDQyxDQUFDO0lBRUssa0NBQVcsR0FBbEI7UUFFSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVNLG1DQUFZLEdBQW5CLGNBQ0MsQ0FBQztJQUlRLG1DQUFZLEdBQXRCLFVBQXVCLElBQVcsRUFBRSxJQUFTO1FBRXpDLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDOUQsQ0FBQztJQUVTLCtCQUFRLEdBQWxCLFVBQW1CLElBQVc7UUFFMUIsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3BELENBQUM7SUFDTCxtQkFBQztBQUFELENBakZBLEFBaUZDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJtalBhdGhIZWxwZXIgZnJvbSBcIi4uL2RhdGEvRXJtalBhdGhIZWxwZXJcIjtcclxuaW1wb3J0IEVybWpEZWZpbmUgZnJvbSBcIi4uL2RhdGEvRXJtakRlZmluZVwiO1xyXG5pbXBvcnQgRXJtakNvbnRleHQgZnJvbSBcIi4uL2RhdGEvRXJtakNvbnRleHRcIjtcclxuaW1wb3J0IEVybWpEcml2ZXIgZnJvbSBcIi4uL0VybWpEcml2ZXJcIjtcclxuXHJcbi8vdmlld0Jhc2UgICDmmoLml7bkuI3nu6fmib9jb21wb2VubnTvvIzkuI3pnIDopoHpop3lpJbnmoTlvIDplIBcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJtakJhc2VWaWV3XHJcbntcclxuICAgIHByb3RlY3RlZCBQYXRoOkVybWpQYXRoSGVscGVyO1xyXG4gICAgcHJvdGVjdGVkIERlZmluZTpFcm1qRGVmaW5lO1xyXG4gICAgcHJvdGVjdGVkIENvbnRleHQ6IEVybWpDb250ZXh0O1xyXG5cclxuICAgIHB1YmxpYyBub2RlOmNjLk5vZGU7XHJcbiAgICBwcml2YXRlIF9hY3RpdmU6Ym9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8vIGRlYnVnIOWtkOexu+WHveaVsOWjsOaYjum7mOiupOWAvOWcqCDniLbnsbvmnoTpgKDkuYvlkI5cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBhdGggPSBFcm1qRHJpdmVyLmluc3RhbmNlLlBhdGg7XHJcbiAgICAgICAgdGhpcy5EZWZpbmUgPSBFcm1qRHJpdmVyLmluc3RhbmNlLkRlZmluZTtcclxuICAgICAgICB0aGlzLkNvbnRleHQgPSBFcm1qRHJpdmVyLmluc3RhbmNlLkNvbnRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBhY3RpdmUoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBhY3RpdmUodmFsdWUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodmFsdWUgPT0gdGhpcy5fYWN0aXZlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHZhbHVlO1xyXG4gICAgICAgIGlmKHRoaXMuX2FjdGl2ZSlcclxuICAgICAgICAgICAgdGhpcy5vbk9wZW4oKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5by65Yi26K6+572uYWN0aXZlIOinpuWPkW9uQ2xvc2Ugb25PcGVuXHJcbiAgICBwdWJsaWMgc2V0QWN0aXZlKHZhbHVlKXtcclxuICAgICAgICB0aGlzLl9hY3RpdmUgPSAhdmFsdWU7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Tm9kZShub2RlKXtcclxuICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xyXG4gICAgICAgIGlmKG5vZGUgPT0gbnVsbCB8fCAhY2MuaXNWYWxpZChub2RlKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIm5vZGUgPT0gbnVsbCB8fCAhY2MuaXNWYWxpZChub2RlKVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9hY3RpdmUgPSBub2RlO1xyXG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKClcclxuICAgIHt9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKVxyXG4gICAge31cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJCeUdhbWUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2xlYXJCeVJvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQnlSb3VuZCgpXHJcbiAgICB7fVxyXG5cclxuICAgIC8vIOezu+e7n+e7hOS7tumHh+eUqO+8jOiHquW7uue7hOS7tuS9v+eUqEdsb2JhbC5VSUhlbHBlci5zYWZlR2V0Q29tcG9uZW50XHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q29tcG9uZW50PFQgZXh0ZW5kcyBjYy5Db21wb25lbnQ+KHBhdGg6c3RyaW5nLCB0eXBlOiB7cHJvdG90eXBlOiBUfSk6IFQ7XHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q29tcG9uZW50KHBhdGg6c3RyaW5nLCB0eXBlOiBhbnkpOiBhbnlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gR2xvYmFsLlVJSGVscGVyLmdldENvbXBvbmVudCh0aGlzLm5vZGUsIHBhdGgsIHR5cGUpXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldENoaWxkKHBhdGg6c3RyaW5nKTogY2MuTm9kZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBHbG9iYWwuVUlIZWxwZXIuZ2V0Q2hpbGQodGhpcy5ub2RlLCBwYXRoKVxyXG4gICAgfVxyXG59Il19