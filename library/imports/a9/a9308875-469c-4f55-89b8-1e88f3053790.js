"use strict";
cc._RF.push(module, 'a9308h1RpxPVYm4HojzBTeQ', 'Fsm');
// hall/scripts/framework/fsm/Fsm.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fsm = /** @class */ (function () {
    function Fsm() {
        this.stateMap = {};
        this.isDestroyed = false;
    }
    Object.defineProperty(Fsm.prototype, "isRunning", {
        get: function () {
            return this.currentState != null;
        },
        enumerable: false,
        configurable: true
    });
    Fsm.prototype.registState = function (state) {
        if (state == null)
            return;
        var key = state.type;
        if (this.stateMap[key] != null) {
            Logger.log("重复注册状态机:" + key);
            return;
        }
        this.stateMap[key] = state;
        state.onInit(this);
        this.isDestroyed = false;
    };
    Fsm.prototype.removeState = function (key) {
        if (!this.hasState(key))
            return;
        var state = this.getState(key);
        if (state == this.currentState) {
            Logger.log("正在运行的state不能移除");
            return;
        }
        state.onDestory();
        this.stateMap[key] = null;
    };
    Fsm.prototype.changeState = function (key) {
        var state = this.getState(key);
        if (state == null) {
            Logger.log("找不到状态");
            return;
        }
        if (this.currentState != null) {
            this.currentState.onLeave();
        }
        this.currentState = state;
        state.onEnter();
    };
    Fsm.prototype.start = function (key) {
        if (this.isRunning)
            return;
        var state = this.getState(key);
        if (state == null)
            return;
        this.currentState = state;
        this.currentState.onEnter();
    };
    Fsm.prototype.getState = function (key) {
        return this.stateMap[key];
    };
    Fsm.prototype.hasState = function (key) {
        return this.stateMap[key] != null;
    };
    Fsm.prototype.onUpdate = function () {
        if (this.currentState == null)
            return;
        this.currentState.onUpdate();
    };
    //发送状态机事件  只有当前状态机响应
    Fsm.prototype.fireEvent = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.currentState != null) {
            this.currentState.onEvent(type, args);
        }
    };
    Fsm.prototype.shutDown = function () {
        if (this.currentState != null) {
            this.currentState.onLeave();
            this.currentState = null;
        }
        for (var key in this.stateMap) {
            this.stateMap[key].onDestory();
        }
        this.stateMap = {};
        this.isDestroyed = true;
    };
    return Fsm;
}());
exports.default = Fsm;

cc._RF.pop();