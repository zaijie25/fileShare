"use strict";
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