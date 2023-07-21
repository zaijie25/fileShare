"use strict";
cc._RF.push(module, '29488QUk+5Hnq5bk+c9DgPt', 'EventHandler');
// hall/scripts/framework/event/EventHandler.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventHandler = /** @class */ (function () {
    function EventHandler(caller, method, args, once) {
        this.setTo(caller, method, args, once);
    }
    EventHandler.prototype.setTo = function (caller, method, args, once) {
        EventHandler._gid++;
        this.id = EventHandler._gid;
        this.caller = caller;
        this.method = method;
        this.args = args;
        this.once = once;
        return this;
    };
    EventHandler.prototype.clear = function () {
        this.caller = null;
        this.args = null;
        this.method = null;
    };
    EventHandler.prototype.recover = function () {
        if (this.id > 0) {
            this.id = 0;
            this.clear();
            EventHandler._pool.push(this);
        }
    };
    EventHandler.prototype.run = function () {
        if (this.method == null)
            return null;
        //防止handler被使用后重新复制  避免被回收
        var oldId = this.id;
        var result = this.method.apply(this.caller, this.args);
        oldId === this.id && this.once && this.recover();
        return result;
    };
    EventHandler.prototype.runWith = function (data) {
        if (this.method == null)
            return null;
        var oldId = this.id;
        if (data == null)
            var result = this.method.apply(this.caller, this.args);
        //args 为空  data不是数组
        else if (!this.args && !data.unshift)
            result = this.method.call(this.caller, data);
        //args不为空
        else if (this.args)
            result = this.method.apply(this.caller, this.args.concat(data));
        //args 为空 data 为数组
        else
            result = this.method.apply(this.caller, data);
        oldId === this.id && this.once && this.recover();
        return result;
    };
    EventHandler.create = function (caller, method, args, once) {
        if (args === void 0) { args = null; }
        if (once === void 0) { once = true; }
        if (this._pool.length)
            return this._pool.pop().setTo(caller, method, args, once);
        return new EventHandler(caller, method, args, once);
    };
    EventHandler._pool = [];
    EventHandler._gid = 0;
    return EventHandler;
}());
exports.default = EventHandler;

cc._RF.pop();