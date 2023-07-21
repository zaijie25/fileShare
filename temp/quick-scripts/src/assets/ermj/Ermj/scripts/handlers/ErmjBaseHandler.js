"use strict";
cc._RF.push(module, '0278b2iieRKTakXXvSQK16I', 'ErmjBaseHandler');
// ermj/Ermj/scripts/handlers/ErmjBaseHandler.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErmjDriver_1 = require("../ErmjDriver");
var ErmjBaseHandler = /** @class */ (function () {
    function ErmjBaseHandler() {
    }
    //判断协议是否需要进入队列
    ErmjBaseHandler.prototype.checkInQueue = function (msgParam) {
        return true;
    };
    //协议处理入口
    ErmjBaseHandler.prototype.Handle = function (msgParam) {
        this.mainUI = ErmjDriver_1.default.instance.mainUI;
        this.context = ErmjDriver_1.default.instance.Context;
        this.Define = ErmjDriver_1.default.instance.Define;
        this.SitHelper = ErmjDriver_1.default.instance.SitHelper;
        this.Path = ErmjDriver_1.default.instance.Path;
        this.refreshData(msgParam);
        //重连执行executeSync 正常执行execute
        if (this.context.syncMode)
            this.executeSync(msgParam);
        else
            this.execute(msgParam);
    };
    //数据刷新入口
    ErmjBaseHandler.prototype.refreshData = function (msgParam) { };
    //正常流程逻辑处理
    ErmjBaseHandler.prototype.execute = function (msgParam) { };
    //重连流程逻辑处理
    //默认为execute  如果涉及到动画   需要重写
    ErmjBaseHandler.prototype.executeSync = function (msgParam) {
        this.execute(msgParam);
    };
    return ErmjBaseHandler;
}());
exports.default = ErmjBaseHandler;

cc._RF.pop();