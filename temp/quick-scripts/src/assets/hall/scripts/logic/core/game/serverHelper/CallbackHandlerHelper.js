"use strict";
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