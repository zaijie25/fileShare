"use strict";
cc._RF.push(module, 'e8b81yzVa1C0p9o+pHO3b7L', 'BaseServerHelper');
// hall/scripts/logic/core/game/serverHelper/BaseServerHelper.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseServerHelper = /** @class */ (function () {
    function BaseServerHelper(server) {
        this.server = server;
        this.onInit();
    }
    BaseServerHelper.prototype.onInit = function () { };
    BaseServerHelper.prototype.run = function () { };
    //GameServer关闭时 清理适用
    BaseServerHelper.prototype.clear = function () { };
    BaseServerHelper.prototype.onUpdate = function (dt) { };
    return BaseServerHelper;
}());
exports.default = BaseServerHelper;

cc._RF.pop();