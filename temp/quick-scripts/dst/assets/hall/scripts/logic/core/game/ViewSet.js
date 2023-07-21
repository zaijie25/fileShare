
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/game/ViewSet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGdhbWVcXFZpZXdTZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFTO0FBQ1Q7SUFBQTtRQUVZLFlBQU8sR0FBRyxFQUFFLENBQUE7UUFvRHBCLFdBQVc7UUFDWCxRQUFRO0lBRVosQ0FBQztJQXJEVSw0QkFBVSxHQUFqQixVQUFrQixHQUFVLEVBQUUsSUFBUTtRQUVsQyxJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxFQUM1QjtZQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFFTSx5QkFBTyxHQUFkLFVBQWUsR0FBVTtRQUVyQixJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxFQUM1QjtZQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTSwyQkFBUyxHQUFoQixVQUFvQixHQUFHO1FBRW5CLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0IsSUFBRyxJQUFJLElBQUksSUFBSTtZQUNYLE9BQU8sSUFBUyxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSwwQkFBUSxHQUFmLFVBQWdCLEdBQVUsRUFBRSxJQUFXO1FBQUUsY0FBTzthQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87WUFBUCw2QkFBTzs7UUFFNUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QixJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUNqQztZQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDdkM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsV0FBVztJQUNKLHlCQUFPLEdBQWQsVUFBZSxJQUFXO1FBQUUsY0FBTzthQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87WUFBUCw2QkFBTzs7UUFFL0IsS0FBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUMzQjtZQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0IsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFDakM7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDaEM7U0FDSjtJQUNMLENBQUM7SUFLTCxjQUFDO0FBQUQsQ0F6REEsQUF5REMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8v5a2Q55WM6Z2i566h55CG57uE5Lu2XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdTZXRcclxue1xyXG4gICAgcHJpdmF0ZSB2aWV3TWFwID0ge31cclxuXHJcbiAgICBwdWJsaWMgcmVnaXN0VmlldyhrZXk6c3RyaW5nLCB2aWV3OmFueSlcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnZpZXdNYXBba2V5XSAhPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi6YeN5aSN5rOo5YaM57uE5Lu2XCIsIGtleSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52aWV3TWFwW2tleV0gPSB2aWV3O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRWaWV3KGtleTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy52aWV3TWFwW2tleV0gPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuaJvuS4jeWIsOe7hOS7tlwiLCBrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy52aWV3TWFwW2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFZpZXdFeDxUPihrZXkpOlRcclxuICAgIHtcclxuICAgICAgICBsZXQgdmlldyA9IHRoaXMuZ2V0VmlldyhrZXkpO1xyXG4gICAgICAgIGlmKHZpZXcgIT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIHZpZXcgYXMgVDtcclxuICAgICAgICByZXR1cm4gdmlldztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsbFZpZXcoa2V5OnN0cmluZywgZnVuYzpzdHJpbmcsIC4uLmFyZ3MpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHZpZXcgPSB0aGlzLmdldFZpZXcoa2V5KTtcclxuICAgICAgICBpZih2aWV3W2Z1bmNdICYmIHZpZXdbZnVuY10uYXBwbHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdmlld1tmdW5jXS5hcHBseSh2aWV3LCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lr7nmiYDmnInnu4Tku7bosIPnlKjmlrnms5VcclxuICAgIHB1YmxpYyBjYWxsQWxsKGZ1bmM6c3RyaW5nLCAuLi5hcmdzKVxyXG4gICAge1xyXG4gICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMudmlld01hcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCB2aWV3ID0gdGhpcy5nZXRWaWV3KGtleSk7XHJcbiAgICAgICAgICAgIGlmKHZpZXdbZnVuY10gJiYgdmlld1tmdW5jXS5hcHBseSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmlld1tmdW5jXS5hcHBseSh2aWV3LCBhcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+aaguaXtuS4jeaPkOS+m+WIoOmZpOWKn+iDvVxyXG4gICAgLy/mnInpnIDopoHlho3mt7vliqBcclxuXHJcbn0iXX0=