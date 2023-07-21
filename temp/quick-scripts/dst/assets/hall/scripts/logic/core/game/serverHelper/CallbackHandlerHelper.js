
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/game/serverHelper/CallbackHandlerHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '03cd5UzJKROhKqDftTn06gQ', 'CallbackHandlerHelper');
// hall/scripts/logic/core/game/serverHelper/CallbackHandlerHelper.ts

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
var BaseServerHelper_1 = require("./BaseServerHelper");
var CallbackHandlerHelper = /** @class */ (function (_super) {
    __extends(CallbackHandlerHelper, _super);
    function CallbackHandlerHelper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.callbackMap = new Map();
        _this.timeCount = 0;
        return _this;
    }
    // key 为check
    CallbackHandlerHelper.prototype.registCallback = function (key, handlerInstance) {
        this.callbackMap.set(key, handlerInstance);
    };
    CallbackHandlerHelper.prototype.removeCallback = function (key) {
        if (this.callbackMap.has(key)) {
            this.callbackMap.delete(key); // 可以清空key:null
        }
    };
    CallbackHandlerHelper.prototype.clearCallbacks = function () {
        this.callbackMap.clear();
    };
    CallbackHandlerHelper.prototype.getCallback = function (key) {
        var handler = this.callbackMap.get(key);
        return handler;
    };
    CallbackHandlerHelper.prototype.onUpdate = function (dt) {
        var _this = this;
        this.timeCount += dt;
        if (this.timeCount >= 0.5) { // 0.5s更新一次, 减少遍历次数
            this.callbackMap.forEach(function (callback, key) {
                if (callback && callback.live > 0) {
                    callback.live -= _this.timeCount;
                    if (callback.live <= 0)
                        _this.removeCallback(key);
                }
            });
            this.timeCount = 0;
        }
    };
    return CallbackHandlerHelper;
}(BaseServerHelper_1.default));
exports.default = CallbackHandlerHelper;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGdhbWVcXHNlcnZlckhlbHBlclxcQ2FsbGJhY2tIYW5kbGVySGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUFrRDtBQUVsRDtJQUFtRCx5Q0FBZ0I7SUFBbkU7UUFBQSxxRUFvQ0M7UUFuQ1UsaUJBQVcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLGVBQVMsR0FBRyxDQUFDLENBQUM7O0lBa0MxQixDQUFDO0lBakNHLGFBQWE7SUFDTiw4Q0FBYyxHQUFyQixVQUFzQixHQUFXLEVBQUUsZUFBNkI7UUFDNUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTSw4Q0FBYyxHQUFyQixVQUFzQixHQUFXO1FBQzdCLElBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUM7WUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBTyxlQUFlO1NBQ3REO0lBQ0wsQ0FBQztJQUVNLDhDQUFjLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRU0sMkNBQVcsR0FBbEIsVUFBbUIsR0FBVztRQUMxQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRU0sd0NBQVEsR0FBZixVQUFnQixFQUFFO1FBQWxCLGlCQVlDO1FBWEcsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLEdBQUcsRUFBQyxFQUFRLG1CQUFtQjtZQUNqRCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVEsRUFBRSxHQUFHO2dCQUNuQyxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBQztvQkFDOUIsUUFBUSxDQUFDLElBQUksSUFBSSxLQUFJLENBQUMsU0FBUyxDQUFDO29CQUNoQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQzt3QkFDbEIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDaEM7WUFDTCxDQUFDLENBQUMsQ0FBQTtZQUNGLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQUNMLDRCQUFDO0FBQUQsQ0FwQ0EsQUFvQ0MsQ0FwQ2tELDBCQUFnQixHQW9DbEUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZVNlcnZlckhlbHBlciBmcm9tIFwiLi9CYXNlU2VydmVySGVscGVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWxsYmFja0hhbmRsZXJIZWxwZXIgZXh0ZW5kcyBCYXNlU2VydmVySGVscGVye1xyXG4gICAgcHVibGljIGNhbGxiYWNrTWFwID0gbmV3IE1hcCgpO1xyXG4gICAgcHJpdmF0ZSB0aW1lQ291bnQgPSAwO1xyXG4gICAgLy8ga2V5IOS4umNoZWNrXHJcbiAgICBwdWJsaWMgcmVnaXN0Q2FsbGJhY2soa2V5OiBzdHJpbmcsIGhhbmRsZXJJbnN0YW5jZTogQ2FsbGJhY2tJbmZvKXtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrTWFwLnNldChrZXksIGhhbmRsZXJJbnN0YW5jZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUNhbGxiYWNrKGtleTogc3RyaW5nKXtcclxuICAgICAgICBpZih0aGlzLmNhbGxiYWNrTWFwLmhhcyhrZXkpKXtcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFja01hcC5kZWxldGUoa2V5KTsgICAgICAgLy8g5Y+v5Lul5riF56m6a2V5Om51bGxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQ2FsbGJhY2tzKCl7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja01hcC5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDYWxsYmFjayhrZXk6IHN0cmluZyk6IENhbGxiYWNrSW5mb3tcclxuICAgICAgICBsZXQgaGFuZGxlciA9IHRoaXMuY2FsbGJhY2tNYXAuZ2V0KGtleSk7XHJcbiAgICAgICAgcmV0dXJuIGhhbmRsZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uVXBkYXRlKGR0KXtcclxuICAgICAgICB0aGlzLnRpbWVDb3VudCArPSBkdDtcclxuICAgICAgICBpZiAodGhpcy50aW1lQ291bnQgPj0gMC41KXsgICAgICAgLy8gMC41c+abtOaWsOS4gOasoSwg5YeP5bCR6YGN5Y6G5qyh5pWwXHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tNYXAuZm9yRWFjaCgoY2FsbGJhY2ssIGtleSk9PntcclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAmJiBjYWxsYmFjay5saXZlID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2subGl2ZSAtPSB0aGlzLnRpbWVDb3VudDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2subGl2ZSA8PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNhbGxiYWNrKGtleSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMudGltZUNvdW50ID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2FsbGJhY2tJbmZve1xyXG4gICAgY21kPzogc3RyaW5nO1xyXG4gICAgY2FsbGJhY2s6IEZ1bmN0aW9uO1xyXG4gICAga2V5OiBzdHJpbmc7XHJcbiAgICBpblF1ZXVlOiBib29sZWFuO1xyXG4gICAgZXJyb3JDYWxsYmFjaz86IEZ1bmN0aW9uO1xyXG4gICAgbGl2ZTogbnVtYmVyO1xyXG59Il19