"use strict";
cc._RF.push(module, 'c780bQQZs9Af5IjaoC767hL', 'DdzBaseHandler');
// ddz/ddz/scripts/handlers/DdzBaseHandler.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DdzDriver_1 = require("../DdzDriver");
var DdzBaseHandler = /** @class */ (function () {
    function DdzBaseHandler() {
    }
    //判断协议是否需要进入队列
    DdzBaseHandler.prototype.checkInQueue = function (msgParam) {
        return true;
    };
    //协议处理入口
    DdzBaseHandler.prototype.Handle = function (msgParam) {
        this.mainUI = DdzDriver_1.default.instance.mainUI;
        this.context = DdzDriver_1.default.instance.Context;
        this.Define = DdzDriver_1.default.instance.Define;
        this.SitHelper = DdzDriver_1.default.instance.SitHelper;
        this.Path = DdzDriver_1.default.instance.Path;
        this.refreshData(msgParam);
        //重连执行executeSync 正常执行execute
        if (this.context.syncMode)
            this.executeSync(msgParam);
        else
            this.execute(msgParam);
    };
    //数据刷新入口
    DdzBaseHandler.prototype.refreshData = function (msgParam) { };
    //正常流程逻辑处理
    DdzBaseHandler.prototype.execute = function (msgParam) { };
    //重连流程逻辑处理
    //默认为execute  如果涉及到动画   需要重写
    DdzBaseHandler.prototype.executeSync = function (msgParam) {
        this.execute(msgParam);
    };
    return DdzBaseHandler;
}());
exports.default = DdzBaseHandler;

cc._RF.pop();