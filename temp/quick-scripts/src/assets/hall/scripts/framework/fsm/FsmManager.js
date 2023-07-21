"use strict";
cc._RF.push(module, 'a3191yI7ddDS4cQjMFSSXOi', 'FsmManager');
// hall/scripts/framework/fsm/FsmManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fsm_1 = require("./Fsm");
var FsmManager = /** @class */ (function () {
    function FsmManager() {
        this.fsmList = [];
        this.removeIndexArr = [];
    }
    FsmManager.prototype.createFsm = function (name) {
        if (name === void 0) { name = ""; }
        var fsm = new Fsm_1.default();
        this.fsmList.push(fsm);
        return fsm;
    };
    FsmManager.prototype.onUpdate = function () {
        if (this.fsmList.length == 0)
            return;
        for (var i = 0; i < this.fsmList.length; i++) {
            if (this.fsmList[i].isDestroyed) {
                this.removeIndexArr.push(i);
                continue;
            }
            this.fsmList[i].onUpdate();
        }
        if (this.removeIndexArr.length > 0) {
            for (var i = this.removeIndexArr.length - 1; i >= 0; i--) {
                this.fsmList.splice(this.removeIndexArr[i], 1);
            }
            this.removeIndexArr.length = 0;
        }
    };
    return FsmManager;
}());
exports.default = FsmManager;

cc._RF.pop();