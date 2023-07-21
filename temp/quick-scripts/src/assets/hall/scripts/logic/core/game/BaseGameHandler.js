"use strict";
cc._RF.push(module, '9ea4cMufLdKTKca6p77odEA', 'BaseGameHandler');
// hall/scripts/logic/core/game/BaseGameHandler.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//一个handler对应一条协议，只做逻辑处理，内部不保留数据
var BaseGameHandler = /** @class */ (function () {
    function BaseGameHandler() {
    }
    //判断协议是否需要如队列
    BaseGameHandler.prototype.checkInQueue = function (msgParam) {
        return true;
    };
    BaseGameHandler.prototype.Handle = function (msgParam) {
    };
    //预处理数据 
    BaseGameHandler.prototype.prepare = function (msg) {
        return null;
    };
    //解析pb
    BaseGameHandler.prototype.decodePb = function (msg) {
        return null;
    };
    return BaseGameHandler;
}());
exports.default = BaseGameHandler;

cc._RF.pop();