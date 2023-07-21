
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/subView/DdzBaseView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e97a4bc5cJJvaRQBATVqJ87', 'DdzBaseView');
// ddz/ddz/scripts/subView/DdzBaseView.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DdzDriver_1 = require("../DdzDriver");
//viewBase   暂时不继承compoennt，不需要额外的开销
var DdzBaseView = /** @class */ (function () {
    // debug 子类函数声明默认值在 父类构造之后
    function DdzBaseView() {
        this._active = false;
        this.Path = DdzDriver_1.default.instance.Path;
        this.Define = DdzDriver_1.default.instance.Define;
        this.Context = DdzDriver_1.default.instance.Context;
        this.PokerHelper = DdzDriver_1.default.instance.PokerHelper;
        this.PlayRuleHelper = DdzDriver_1.default.instance.PlayRuleHelper;
    }
    Object.defineProperty(DdzBaseView.prototype, "active", {
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
    DdzBaseView.prototype.setActive = function (value) {
        this._active = !value;
        this.active = value;
    };
    DdzBaseView.prototype.setNode = function (node) {
        this.node = node;
        if (node == null || !cc.isValid(node)) {
            Logger.error("node == null || !cc.isValid(node)");
            return;
        }
        this._active = node;
        this.initView();
    };
    DdzBaseView.prototype.initView = function () {
    };
    DdzBaseView.prototype.onOpen = function () { };
    DdzBaseView.prototype.onClose = function () { };
    DdzBaseView.prototype.clearByGame = function () {
        this.clearByRound();
    };
    DdzBaseView.prototype.clearByRound = function () { };
    DdzBaseView.prototype.getComponent = function (path, type) {
        return Global.UIHelper.getComponent(this.node, path, type);
    };
    DdzBaseView.prototype.getChild = function (path) {
        return Global.UIHelper.getChild(this.node, path);
    };
    return DdzBaseView;
}());
exports.default = DdzBaseView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXHN1YlZpZXdcXERkekJhc2VWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0EsMENBQXFDO0FBRXJDLG9DQUFvQztBQUNwQztJQVdJLDBCQUEwQjtJQUMxQjtRQUhRLFlBQU8sR0FBVyxLQUFLLENBQUM7UUFLNUIsSUFBSSxDQUFDLElBQUksR0FBRyxtQkFBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxtQkFBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxtQkFBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDMUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxtQkFBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7UUFDbEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxtQkFBUyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDNUQsQ0FBQztJQUVELHNCQUFXLCtCQUFNO2FBQWpCO1lBRUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7YUFFRCxVQUFrQixLQUFLO1lBRW5CLElBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPO2dCQUNwQixPQUFPO1lBQ1gsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLElBQUcsSUFBSSxDQUFDLE9BQU87Z0JBQ1gsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDOztnQkFFZCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkIsQ0FBQzs7O09BWkE7SUFjRCw2QkFBNkI7SUFDdEIsK0JBQVMsR0FBaEIsVUFBaUIsS0FBSztRQUVsQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFHTSw2QkFBTyxHQUFkLFVBQWUsSUFBSTtRQUVmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQ3BDO1lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1lBQ2xELE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRVMsOEJBQVEsR0FBbEI7SUFHQSxDQUFDO0lBRVMsNEJBQU0sR0FBaEIsY0FDQyxDQUFDO0lBRVEsNkJBQU8sR0FBakIsY0FDQyxDQUFDO0lBRUssaUNBQVcsR0FBbEI7UUFFSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVNLGtDQUFZLEdBQW5CLGNBQ0MsQ0FBQztJQUdRLGtDQUFZLEdBQXRCLFVBQXVCLElBQVcsRUFBRSxJQUFTO1FBRXpDLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDOUQsQ0FBQztJQUVTLDhCQUFRLEdBQWxCLFVBQW1CLElBQVc7UUFFMUIsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3BELENBQUM7SUFDTCxrQkFBQztBQUFELENBdkZBLEFBdUZDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGR6UGF0aEhlbHBlciBmcm9tIFwiLi4vZGF0YS9EZHpQYXRoSGVscGVyXCI7XHJcbmltcG9ydCBEZHpEZWZpbmUgZnJvbSBcIi4uL2RhdGEvRGR6RGVmaW5lXCI7XHJcbmltcG9ydCBEZHpDb250ZXh0IGZyb20gXCIuLi9kYXRhL0RkekNvbnRleHRcIjtcclxuaW1wb3J0IERkelBva2VySGVscGVyIGZyb20gXCIuLi9kYXRhL0RkelBva2VySGVscGVyXCI7XHJcbmltcG9ydCBEZHpQbGF5UnVsZSBmcm9tIFwiLi4vdG9vbC9EZHpQbGF5UnVsZVwiO1xyXG5pbXBvcnQgRGR6RHJpdmVyIGZyb20gXCIuLi9EZHpEcml2ZXJcIjtcclxuXHJcbi8vdmlld0Jhc2UgICDmmoLml7bkuI3nu6fmib9jb21wb2VubnTvvIzkuI3pnIDopoHpop3lpJbnmoTlvIDplIBcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGR6QmFzZVZpZXdcclxue1xyXG4gICAgcHJvdGVjdGVkIFBhdGg6RGR6UGF0aEhlbHBlcjtcclxuICAgIHByb3RlY3RlZCBEZWZpbmU6RGR6RGVmaW5lO1xyXG4gICAgcHJvdGVjdGVkIENvbnRleHQ6IERkekNvbnRleHQ7XHJcbiAgICBwcm90ZWN0ZWQgUG9rZXJIZWxwZXI6IERkelBva2VySGVscGVyO1xyXG4gICAgcHJvdGVjdGVkIFBsYXlSdWxlSGVscGVyOiBEZHpQbGF5UnVsZTtcclxuXHJcbiAgICBwdWJsaWMgbm9kZTpjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBfYWN0aXZlOmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvLyBkZWJ1ZyDlrZDnsbvlh73mlbDlo7DmmI7pu5jorqTlgLzlnKgg54i257G75p6E6YCg5LmL5ZCOXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5QYXRoID0gRGR6RHJpdmVyLmluc3RhbmNlLlBhdGg7XHJcbiAgICAgICAgdGhpcy5EZWZpbmUgPSBEZHpEcml2ZXIuaW5zdGFuY2UuRGVmaW5lO1xyXG4gICAgICAgIHRoaXMuQ29udGV4dCA9IERkekRyaXZlci5pbnN0YW5jZS5Db250ZXh0O1xyXG4gICAgICAgIHRoaXMuUG9rZXJIZWxwZXIgPSBEZHpEcml2ZXIuaW5zdGFuY2UuUG9rZXJIZWxwZXI7XHJcbiAgICAgICAgdGhpcy5QbGF5UnVsZUhlbHBlciA9IERkekRyaXZlci5pbnN0YW5jZS5QbGF5UnVsZUhlbHBlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGFjdGl2ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGFjdGl2ZSh2YWx1ZSlcclxuICAgIHtcclxuICAgICAgICBpZih2YWx1ZSA9PSB0aGlzLl9hY3RpdmUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLl9hY3RpdmUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdmFsdWU7XHJcbiAgICAgICAgaWYodGhpcy5fYWN0aXZlKVxyXG4gICAgICAgICAgICB0aGlzLm9uT3BlbigpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lvLrliLborr7nva5hY3RpdmUg6Kem5Y+Rb25DbG9zZSBvbk9wZW5cclxuICAgIHB1YmxpYyBzZXRBY3RpdmUodmFsdWUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlID0gIXZhbHVlO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzZXROb2RlKG5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcclxuICAgICAgICBpZihub2RlID09IG51bGwgfHwgIWNjLmlzVmFsaWQobm9kZSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJub2RlID09IG51bGwgfHwgIWNjLmlzVmFsaWQobm9kZSlcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlID0gbm9kZTtcclxuICAgICAgICB0aGlzLmluaXRWaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uT3BlbigpXHJcbiAgICB7fVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKClcclxuICAgIHt9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQnlHYW1lKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNsZWFyQnlSb3VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckJ5Um91bmQoKVxyXG4gICAge31cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q29tcG9uZW50PFQgZXh0ZW5kcyBjYy5Db21wb25lbnQ+KHBhdGg6c3RyaW5nLCB0eXBlOiB7cHJvdG90eXBlOiBUfSk6IFQ7XHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q29tcG9uZW50KHBhdGg6c3RyaW5nLCB0eXBlOiBhbnkpOiBhbnlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gR2xvYmFsLlVJSGVscGVyLmdldENvbXBvbmVudCh0aGlzLm5vZGUsIHBhdGgsIHR5cGUpXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldENoaWxkKHBhdGg6c3RyaW5nKTogY2MuTm9kZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBHbG9iYWwuVUlIZWxwZXIuZ2V0Q2hpbGQodGhpcy5ub2RlLCBwYXRoKVxyXG4gICAgfVxyXG59Il19