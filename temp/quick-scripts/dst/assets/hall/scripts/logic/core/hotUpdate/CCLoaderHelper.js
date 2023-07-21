
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/hotUpdate/CCLoaderHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6d82cq4eHxA/Is9DRmUnSvn', 'CCLoaderHelper');
// hall/scripts/logic/core/hotUpdate/CCLoaderHelper.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CCLoaderHelper = /** @class */ (function () {
    function CCLoaderHelper() {
    }
    CCLoaderHelper.prototype.getRes = function (path, type, cb) {
        var res = cc.loader.getRes(path);
        if (res == null) {
            Logger.log('CCLoaderHelper  res = null  path = ' + path);
            cc.loader.loadRes(path, type, cb);
        }
    };
    return CCLoaderHelper;
}());
exports.default = CCLoaderHelper;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGhvdFVwZGF0ZVxcQ0NMb2FkZXJIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUFBO0lBUUEsQ0FBQztJQVBVLCtCQUFNLEdBQWIsVUFBYyxJQUFJLEVBQUMsSUFBSSxFQUFDLEVBQUU7UUFDdEIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDaEMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ2IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsR0FBRyxJQUFJLENBQUMsQ0FBQTtZQUN4RCxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ25DO0lBQ0wsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FSQSxBQVFDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyAgQ0NMb2FkZXJIZWxwZXIge1xyXG4gICAgcHVibGljIGdldFJlcyhwYXRoLHR5cGUsY2Ipe1xyXG4gICAgICAgIGxldCByZXMgPSBjYy5sb2FkZXIuZ2V0UmVzKHBhdGgpXHJcbiAgICAgICAgaWYgKHJlcyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coJ0NDTG9hZGVySGVscGVyICByZXMgPSBudWxsICBwYXRoID0gJyArIHBhdGgpXHJcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHBhdGgsdHlwZSxjYik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19