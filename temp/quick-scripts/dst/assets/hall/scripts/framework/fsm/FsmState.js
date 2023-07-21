
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/fsm/FsmState.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7d83ekHvPxJy6Guxip0Q1aU', 'FsmState');
// hall/scripts/framework/fsm/FsmState.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FsmState = /** @class */ (function () {
    function FsmState() {
    }
    FsmState.prototype.onInit = function (fsm) {
        this.fsm = fsm;
    };
    FsmState.prototype.onEnter = function () { };
    FsmState.prototype.onLeave = function () { };
    FsmState.prototype.onDestory = function () { };
    FsmState.prototype.onUpdate = function () { };
    FsmState.prototype.changeStage = function (type) {
        this.fsm.changeState(type);
    };
    //暂时不做事件注册   如果监听的事件多了 再考虑添加
    FsmState.prototype.onEvent = function (eventType, argList) {
    };
    return FsmState;
}());
exports.default = FsmState;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxmc21cXEZzbVN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7SUFBQTtJQXVCQSxDQUFDO0lBbkJVLHlCQUFNLEdBQWIsVUFBYyxHQUFPO1FBRWpCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7SUFDTSwwQkFBTyxHQUFkLGNBQWlCLENBQUM7SUFDWCwwQkFBTyxHQUFkLGNBQWlCLENBQUM7SUFDWCw0QkFBUyxHQUFoQixjQUFtQixDQUFDO0lBRWIsMkJBQVEsR0FBZixjQUFrQixDQUFDO0lBRVosOEJBQVcsR0FBbEIsVUFBbUIsSUFBVztRQUUxQixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsNEJBQTRCO0lBQ3JCLDBCQUFPLEdBQWQsVUFBZSxTQUFTLEVBQUUsT0FBTztJQUVqQyxDQUFDO0lBQ0wsZUFBQztBQUFELENBdkJBLEFBdUJDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRnNtIGZyb20gXCIuL0ZzbVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnNtU3RhdGVcclxue1xyXG4gICAgcHVibGljIHR5cGU6c3RyaW5nO1xyXG4gICAgcHVibGljIGZzbTpGc207XHJcbiAgICBwdWJsaWMgb25Jbml0KGZzbTpGc20pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5mc20gPSBmc207XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb25FbnRlcigpe31cclxuICAgIHB1YmxpYyBvbkxlYXZlKCl7fVxyXG4gICAgcHVibGljIG9uRGVzdG9yeSgpe31cclxuXHJcbiAgICBwdWJsaWMgb25VcGRhdGUoKXt9XHJcblxyXG4gICAgcHVibGljIGNoYW5nZVN0YWdlKHR5cGU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZnNtLmNoYW5nZVN0YXRlKHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pqC5pe25LiN5YGa5LqL5Lu25rOo5YaMICAg5aaC5p6c55uR5ZCs55qE5LqL5Lu25aSa5LqGIOWGjeiAg+iZkea3u+WKoFxyXG4gICAgcHVibGljIG9uRXZlbnQoZXZlbnRUeXBlLCBhcmdMaXN0KVxyXG4gICAge1xyXG4gICAgfVxyXG59XHJcbiJdfQ==