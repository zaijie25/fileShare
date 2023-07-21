"use strict";
cc._RF.push(module, '7d49eON+YtHVZj+oU+cBYm3', 'HandlerHelper');
// hall/scripts/logic/core/game/serverHelper/HandlerHelper.ts

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
var HandlerHelper = /** @class */ (function (_super) {
    __extends(HandlerHelper, _super);
    function HandlerHelper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handlerMap = {};
        //主要存放公共handler    一类型游戏可以配置一套defaultMap   handlerMap注册差异函数
        _this.defaultHandlerMap = {};
        return _this;
    }
    //每个游戏注册一次Handler    key为服务器协议字段
    HandlerHelper.prototype.registHandler = function (key, handlerInstance) {
        if (this.handlerMap[key] != null) {
            Logger.error("重复注册handler", key);
        }
        this.handlerMap[key] = handlerInstance;
    };
    HandlerHelper.prototype.registDefaultHandler = function (key, handlerInstance) {
        if (this.defaultHandlerMap[key] != null) {
            Logger.error("重复注册defaulthandler", key);
        }
        this.defaultHandlerMap[key] = handlerInstance;
    };
    HandlerHelper.prototype.removeHandler = function (key) {
        if (this.handlerMap[key])
            this.handlerMap[key] = null;
    };
    HandlerHelper.prototype.clearHandlers = function () {
        this.handlerMap = {};
        this.defaultHandlerMap = {};
    };
    HandlerHelper.prototype.getHandler = function (key) {
        var handler = this.handlerMap[key];
        if (handler == null)
            handler = this.defaultHandlerMap[key];
        if (handler == null) {
            Logger.error("没有找到对应处理handler", key);
        }
        return handler;
    };
    return HandlerHelper;
}(BaseServerHelper_1.default));
exports.default = HandlerHelper;

cc._RF.pop();