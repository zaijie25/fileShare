"use strict";
cc._RF.push(module, '07b1bv8dJNFY5r2ZVSRcdSq', 'BbwzSocketBaseHandler');
// bbwz/Bbwz/scripts/handler/BbwzSocketBaseHandler.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 协议处理基类，注意入队列的处理
 */
var BbwzSocketBaseHandler = /** @class */ (function () {
    function BbwzSocketBaseHandler() {
    }
    //判断协议是否需要入队列，默认入队列
    BbwzSocketBaseHandler.prototype.checkInQueue = function (msgParam) {
        return true;
    };
    BbwzSocketBaseHandler.prototype.Handle = function (msgParam) {
        this.handleData(msgParam);
    };
    //业务逻辑处理
    BbwzSocketBaseHandler.prototype.execute = function (msgParam) { };
    //重连逻辑处理
    BbwzSocketBaseHandler.prototype.executeSync = function (msgParam) {
        this.execute(msgParam);
    };
    return BbwzSocketBaseHandler;
}());
exports.default = BbwzSocketBaseHandler;

cc._RF.pop();