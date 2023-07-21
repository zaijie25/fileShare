
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/event/EventDispatcher.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'da287KZPadEF758nz9rO/og', 'EventDispatcher');
// hall/scripts/framework/event/EventDispatcher.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventHandler_1 = require("./EventHandler");
var EventDispatcher = /** @class */ (function () {
    function EventDispatcher() {
        this.eventMap = {};
    }
    EventDispatcher.prototype.hasListener = function (type) {
        var listener = this.eventMap && this.eventMap[type];
        return listener != null;
    };
    EventDispatcher.prototype.on = function (type, caller, method, args) {
        return this._createListener(type, caller, method, args, false);
    };
    EventDispatcher.prototype.once = function (type, caller, method, args) {
        return this._createListener(type, caller, method, args, true);
    };
    /**
     * 从 EventDispatcher 对象中删除侦听器。
     * @param type		事件的类型。
     * @param caller	事件侦听函数的执行域。
     * @param listener	事件侦听函数。
     * @param onceOnly	（可选）如果值为 true ,则只移除通过 once 方法添加的侦听器。
     */
    EventDispatcher.prototype.off = function (type, caller, method, onceOnly) {
        if (onceOnly === void 0) { onceOnly = false; }
        if (this.eventMap == null || this.eventMap[type] == null)
            return this;
        var listener = this.eventMap[type];
        //单个handler
        if (listener.run) {
            if ((caller == null || listener.caller == caller) && (method == null || listener.method == method) && (!onceOnly || listener.once)) {
                delete (this.eventMap[type]);
                listener.recover();
            }
        }
        else {
            var count = 0;
            var n = listener.length;
            for (var i = 0; i < n; i++) {
                var item = listener[i];
                if (!item) {
                    count++;
                    continue;
                }
                if (item && (!caller || item.caller === caller) && (method == null || item.method === method) && (!onceOnly || item.once)) {
                    count++;
                    listener[i] = null;
                    item.recover();
                }
            }
            //如果全部移除，则删除索引
            if (count === n)
                delete this.eventMap[type];
        }
        return this;
    };
    EventDispatcher.prototype.offAll = function (type) {
        var events = this.eventMap;
        if (!events)
            return this;
        if (type) {
            this.recoverHandlers(events[type]);
            delete events[type];
        }
        else {
            for (var name in events) {
                this.recoverHandlers(events[name]);
            }
        }
    };
    EventDispatcher.prototype.offAllByCaller = function (caller) {
        if (caller && this.eventMap) {
            for (var name in this.eventMap) {
                this.off(name, caller, null);
            }
        }
        return this;
    };
    /**
 * 派发事件。
 * @param type	事件类型。
 * @param data	（可选）回调数据。<b>注意：</b>如果是需要传递多个参数 p1,p2,p3,...可以使用数组结构如：[p1,p2,p3,...] ；如果需要回调单个参数 p ，且 p 是一个数组，则需要使用结构如：[p]，其他的单个参数 p ，可以直接传入参数 p。
 * @return 此事件类型是否有侦听者，如果有侦听者则值为 true，否则值为 false。
 */
    EventDispatcher.prototype.event = function (type) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        if (!this.eventMap || !this.eventMap[type])
            return false;
        var listeners = this.eventMap[type];
        if (listeners.run) {
            if (listeners.once)
                delete this.eventMap[type];
            data != null ? listeners.runWith(data) : listeners.run();
        }
        else {
            for (var i = 0, n = listeners.length; i < n; i++) {
                var listener = listeners[i];
                if (listener) {
                    (data != null) ? listener.runWith(data) : listener.run();
                }
                if (!listener || listener.once) {
                    listeners.splice(i, 1);
                    i--;
                    n--;
                }
            }
            if (listeners.length === 0 && this.eventMap)
                delete this.eventMap[type];
        }
        return true;
    };
    EventDispatcher.prototype.recoverHandlers = function (arr) {
        if (!arr)
            return;
        if (arr.run) {
            arr.recover();
        }
        else {
            for (var i = arr.length - 1; i > -1; i--) {
                if (arr[i]) {
                    arr[i].recover();
                    arr[i] = null;
                }
            }
        }
    };
    EventDispatcher.prototype._createListener = function (type, caller, method, args, once, offBefroe) {
        if (offBefroe === void 0) { offBefroe = false; }
        offBefroe && this.off(type, caller, method, once);
        var handler = EventHandler_1.default.create(caller || this, method, args, once);
        //默认单个，每个对象只有多个监听才用数组，节省一个数组的消耗
        if (!this.eventMap[type])
            this.eventMap[type] = handler;
        else {
            if (!this.eventMap[type].run)
                this.eventMap[type].push(handler);
            else
                this.eventMap[type] = [this.eventMap[type], handler];
        }
        return this;
    };
    return EventDispatcher;
}());
exports.default = EventDispatcher;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxldmVudFxcRXZlbnREaXNwYXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTBDO0FBQzFDO0lBQUE7UUFDWSxhQUFRLEdBQUcsRUFBRSxDQUFBO0lBZ0t6QixDQUFDO0lBN0pVLHFDQUFXLEdBQWxCLFVBQW1CLElBQUk7UUFFbkIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELE9BQU8sUUFBUSxJQUFJLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRU0sNEJBQUUsR0FBVCxVQUFVLElBQVcsRUFBRSxNQUFNLEVBQUUsTUFBZSxFQUFFLElBQUs7UUFFakQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRU0sOEJBQUksR0FBWCxVQUFZLElBQVcsRUFBRSxNQUFNLEVBQUUsTUFBZSxFQUFFLElBQUs7UUFFbkQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksNkJBQUcsR0FBVixVQUFXLElBQVcsRUFBRSxNQUFNLEVBQUUsTUFBZSxFQUFFLFFBQWdCO1FBQWhCLHlCQUFBLEVBQUEsZ0JBQWdCO1FBRTdELElBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJO1lBQ25ELE9BQU8sSUFBSSxDQUFDO1FBRWhCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbkMs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Q2hCLENBQUM7SUFFTCxzQkFBQztBQUFELENBaktBLEFBaUtDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRIYW5kbGVyIGZyb20gXCIuL0V2ZW50SGFuZGxlclwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERpc3BhdGNoZXIgIHtcclxuICAgIHByaXZhdGUgZXZlbnRNYXAgPSB7fVxyXG5cclxuXHJcbiAgICBwdWJsaWMgaGFzTGlzdGVuZXIodHlwZSlcclxuICAgIHtcclxuICAgICAgICBsZXQgbGlzdGVuZXIgPSB0aGlzLmV2ZW50TWFwICYmIHRoaXMuZXZlbnRNYXBbdHlwZV07XHJcbiAgICAgICAgcmV0dXJuIGxpc3RlbmVyICE9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uKHR5cGU6c3RyaW5nLCBjYWxsZXIsIG1ldGhvZDpGdW5jdGlvbiwgYXJncz8pXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZUxpc3RlbmVyKHR5cGUsIGNhbGxlciwgbWV0aG9kLCBhcmdzLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uY2UodHlwZTpzdHJpbmcsIGNhbGxlciwgbWV0aG9kOkZ1bmN0aW9uLCBhcmdzPylcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlTGlzdGVuZXIodHlwZSwgY2FsbGVyLCBtZXRob2QsIGFyZ3MsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LuOIEV2ZW50RGlzcGF0Y2hlciDlr7nosaHkuK3liKDpmaTkvqblkKzlmajjgIJcclxuICAgICAqIEBwYXJhbSB0eXBlXHRcdOS6i+S7tueahOexu+Wei+OAglxyXG4gICAgICogQHBhcmFtIGNhbGxlclx05LqL5Lu25L6m5ZCs5Ye95pWw55qE5omn6KGM5Z+f44CCXHJcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXJcdOS6i+S7tuS+puWQrOWHveaVsOOAglxyXG4gICAgICogQHBhcmFtIG9uY2VPbmx5XHTvvIjlj6/pgInvvInlpoLmnpzlgLzkuLogdHJ1ZSAs5YiZ5Y+q56e76Zmk6YCa6L+HIG9uY2Ug5pa55rOV5re75Yqg55qE5L6m5ZCs5Zmo44CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvZmYodHlwZTpzdHJpbmcsIGNhbGxlciwgbWV0aG9kOkZ1bmN0aW9uLCBvbmNlT25seSA9IGZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuZXZlbnRNYXAgPT0gbnVsbCB8fCB0aGlzLmV2ZW50TWFwW3R5cGVdID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgICAgICBsZXQgbGlzdGVuZXIgPSB0aGlzLmV2ZW50TWFwW3R5cGVdO1xyXG5cclxuICAgICAgICAvL+WNleS4qmhhbmRsZXJcclxuICAgICAgICBpZihsaXN0ZW5lci5ydW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZigoY2FsbGVyID09IG51bGwgfHwgbGlzdGVuZXIuY2FsbGVyID09IGNhbGxlcikgJiYgKG1ldGhvZCA9PSBudWxsIHx8IGxpc3RlbmVyLm1ldGhvZCA9PSBtZXRob2QpICYmICghb25jZU9ubHkgfHwgbGlzdGVuZXIub25jZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSh0aGlzLmV2ZW50TWFwW3R5cGVdKTtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyLnJlY292ZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgICAgICBsZXQgbiA9IGxpc3RlbmVyLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gbGlzdGVuZXJbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW0pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpdGVtICYmICghY2FsbGVyIHx8IGl0ZW0uY2FsbGVyID09PSBjYWxsZXIpICYmIChtZXRob2Q9PW51bGwgfHwgaXRlbS5tZXRob2QgPT09IG1ldGhvZCkgJiYgKCFvbmNlT25seSB8fCBpdGVtLm9uY2UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcltpXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5yZWNvdmVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/lpoLmnpzlhajpg6jnp7vpmaTvvIzliJnliKDpmaTntKLlvJVcclxuICAgICAgICAgICAgaWYgKGNvdW50ID09PSBuKSBkZWxldGUgdGhpcy5ldmVudE1hcFt0eXBlXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvZmZBbGwodHlwZTpzdHJpbmcpIFxyXG4gICAge1xyXG4gICAgICAgIHZhciBldmVudHMgPSB0aGlzLmV2ZW50TWFwO1xyXG4gICAgICAgIGlmICghZXZlbnRzKSByZXR1cm4gdGhpcztcclxuICAgICAgICBpZiAodHlwZSkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJlY292ZXJIYW5kbGVycyhldmVudHNbdHlwZV0pO1xyXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG5hbWUgaW4gZXZlbnRzKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNvdmVySGFuZGxlcnMoZXZlbnRzW25hbWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb2ZmQWxsQnlDYWxsZXIoY2FsbGVyOmFueSkge1xyXG4gICAgICAgIGlmIChjYWxsZXIgJiYgdGhpcy5ldmVudE1hcCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMuZXZlbnRNYXApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub2ZmKG5hbWUsIGNhbGxlciwgbnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHRcdFx0XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAqIOa0vuWPkeS6i+S7tuOAglxyXG4gICAgICogQHBhcmFtIHR5cGVcdOS6i+S7tuexu+Wei+OAglxyXG4gICAgICogQHBhcmFtIGRhdGFcdO+8iOWPr+mAie+8ieWbnuiwg+aVsOaNruOAgjxiPuazqOaEj++8mjwvYj7lpoLmnpzmmK/pnIDopoHkvKDpgJLlpJrkuKrlj4LmlbAgcDEscDIscDMsLi4u5Y+v5Lul5L2/55So5pWw57uE57uT5p6E5aaC77yaW3AxLHAyLHAzLC4uLl0g77yb5aaC5p6c6ZyA6KaB5Zue6LCD5Y2V5Liq5Y+C5pWwIHAg77yM5LiUIHAg5piv5LiA5Liq5pWw57uE77yM5YiZ6ZyA6KaB5L2/55So57uT5p6E5aaC77yaW3Bd77yM5YW25LuW55qE5Y2V5Liq5Y+C5pWwIHAg77yM5Y+v5Lul55u05o6l5Lyg5YWl5Y+C5pWwIHDjgIJcclxuICAgICAqIEByZXR1cm4g5q2k5LqL5Lu257G75Z6L5piv5ZCm5pyJ5L6m5ZCs6ICF77yM5aaC5p6c5pyJ5L6m5ZCs6ICF5YiZ5YC85Li6IHRydWXvvIzlkKbliJnlgLzkuLogZmFsc2XjgIJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGV2ZW50KHR5cGU6c3RyaW5nLCAuLi5kYXRhKSBcclxuICAgIHtcclxuICAgICAgICBpZiAoIXRoaXMuZXZlbnRNYXAgfHwgIXRoaXMuZXZlbnRNYXBbdHlwZV0pIHJldHVybiBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbGlzdGVuZXJzOmFueSA9IHRoaXMuZXZlbnRNYXBbdHlwZV07XHJcbiAgICAgICAgaWYgKGxpc3RlbmVycy5ydW4pIHtcclxuICAgICAgICAgICAgaWYgKGxpc3RlbmVycy5vbmNlKSBkZWxldGUgdGhpcy5ldmVudE1hcFt0eXBlXTtcclxuICAgICAgICAgICAgZGF0YSAhPSBudWxsID8gbGlzdGVuZXJzLnJ1bldpdGgoZGF0YSkgOiBsaXN0ZW5lcnMucnVuKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGlzdGVuZXI6RXZlbnRIYW5kbGVyID0gbGlzdGVuZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKGRhdGEgIT0gbnVsbCkgPyBsaXN0ZW5lci5ydW5XaXRoKGRhdGEpIDogbGlzdGVuZXIucnVuKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWxpc3RlbmVyIHx8IGxpc3RlbmVyLm9uY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgICAgICAgICBuLS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGxpc3RlbmVycy5sZW5ndGggPT09IDAgJiYgdGhpcy5ldmVudE1hcCkgZGVsZXRlIHRoaXMuZXZlbnRNYXBbdHlwZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcbiAgICBwcml2YXRlIHJlY292ZXJIYW5kbGVycyhhcnI6YW55KTp2b2lkIFxyXG4gICAge1xyXG4gICAgICAgIGlmICghYXJyKSByZXR1cm47XHJcbiAgICAgICAgaWYgKGFyci5ydW4pIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYXJyLnJlY292ZXIoKTtcclxuICAgICAgICB9IGVsc2UgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gYXJyLmxlbmd0aCAtIDE7IGkgPiAtMTsgaS0tKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFycltpXSkgXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyW2ldLnJlY292ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBhcnJbaV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIF9jcmVhdGVMaXN0ZW5lcih0eXBlOnN0cmluZywgY2FsbGVyLCBtZXRob2Q6RnVuY3Rpb24sIGFyZ3MsIG9uY2UsIG9mZkJlZnJvZSA9IGZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIG9mZkJlZnJvZSAmJiB0aGlzLm9mZih0eXBlLCBjYWxsZXIsIG1ldGhvZCwgb25jZSk7XHJcblxyXG4gICAgICAgIGxldCBoYW5kbGVyID0gRXZlbnRIYW5kbGVyLmNyZWF0ZShjYWxsZXIgfHwgdGhpcywgbWV0aG9kLCBhcmdzLCBvbmNlKTtcclxuICAgICAgICBcdFx0XHQvL+m7mOiupOWNleS4qu+8jOavj+S4quWvueixoeWPquacieWkmuS4quebkeWQrOaJjeeUqOaVsOe7hO+8jOiKguecgeS4gOS4quaVsOe7hOeahOa2iOiAl1xyXG4gICAgICAgIGlmICghdGhpcy5ldmVudE1hcFt0eXBlXSkgdGhpcy5ldmVudE1hcFt0eXBlXSA9IGhhbmRsZXI7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5ldmVudE1hcFt0eXBlXS5ydW4pIHRoaXMuZXZlbnRNYXBbdHlwZV0ucHVzaChoYW5kbGVyKTtcclxuICAgICAgICAgICAgZWxzZSB0aGlzLmV2ZW50TWFwW3R5cGVdID0gW3RoaXMuZXZlbnRNYXBbdHlwZV0sIGhhbmRsZXJdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbn1cclxuIl19