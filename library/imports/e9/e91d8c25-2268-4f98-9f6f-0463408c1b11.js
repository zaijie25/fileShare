"use strict";
cc._RF.push(module, 'e91d8wlImhPmJ9vBGNAjBsR', 'ViewSet');
// hall/scripts/logic/core/game/ViewSet.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//子界面管理组件
var ViewSet = /** @class */ (function () {
    function ViewSet() {
        this.viewMap = {};
        //暂时不提供删除功能
        //有需要再添加
    }
    ViewSet.prototype.registView = function (key, view) {
        if (this.viewMap[key] != null) {
            Logger.error("重复注册组件", key);
            return;
        }
        this.viewMap[key] = view;
    };
    ViewSet.prototype.getView = function (key) {
        if (this.viewMap[key] == null) {
            Logger.error("找不到组件", key);
        }
        return this.viewMap[key];
    };
    ViewSet.prototype.getViewEx = function (key) {
        var view = this.getView(key);
        if (view != null)
            return view;
        return view;
    };
    ViewSet.prototype.callView = function (key, func) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var view = this.getView(key);
        if (view[func] && view[func].apply) {
            return view[func].apply(view, args);
        }
        return null;
    };
    //对所有组件调用方法
    ViewSet.prototype.callAll = function (func) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var key in this.viewMap) {
            var view = this.getView(key);
            if (view[func] && view[func].apply) {
                view[func].apply(view, args);
            }
        }
    };
    return ViewSet;
}());
exports.default = ViewSet;

cc._RF.pop();