
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/event/EventHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxldmVudFxcRXZlbnRIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFxQkksc0JBQVksTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSTtRQUVsQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFkTSw0QkFBSyxHQUFaLFVBQWEsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSTtRQUVuQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFRTSw0QkFBSyxHQUFaO1FBRUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVNLDhCQUFPLEdBQWQ7UUFFSSxJQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUNkO1lBQ0ksSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQztJQUNMLENBQUM7SUFHTSwwQkFBRyxHQUFWO1FBRUksSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUk7WUFDbEIsT0FBTyxJQUFJLENBQUM7UUFDaEIsMEJBQTBCO1FBQzFCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDcEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkQsS0FBSyxLQUFLLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVNLDhCQUFPLEdBQWQsVUFBZSxJQUFJO1FBQ2YsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUk7WUFBRSxPQUFPLElBQUksQ0FBQztRQUNyQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ3BCLElBQUksSUFBSSxJQUFJLElBQUk7WUFDWixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRCxtQkFBbUI7YUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQUUsTUFBTSxHQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEYsU0FBUzthQUNKLElBQUksSUFBSSxDQUFDLElBQUk7WUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3BGLGtCQUFrQjs7WUFDYixNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRCxLQUFLLEtBQUssSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRWEsbUJBQU0sR0FBcEIsVUFBcUIsTUFBTSxFQUFFLE1BQWUsRUFBRSxJQUFjLEVBQUUsSUFBbUI7UUFBbkMscUJBQUEsRUFBQSxXQUFjO1FBQUUscUJBQUEsRUFBQSxXQUFtQjtRQUU3RSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUFFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakYsT0FBTyxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBekVjLGtCQUFLLEdBQVMsRUFBRSxDQUFDO0lBQ2pCLGlCQUFJLEdBQUcsQ0FBQyxDQUFDO0lBeUU1QixtQkFBQztDQTVFRCxBQTRFQyxJQUFBO2tCQTVFb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50SGFuZGxlclxyXG57XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfcG9vbDphbnlbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2dpZCA9IDA7XHJcbiAgICBwdWJsaWMgY2FsbGVyOmFueTtcclxuICAgIHB1YmxpYyBtZXRob2Q6RnVuY3Rpb247XHJcbiAgICBwdWJsaWMgYXJnczpbXTtcclxuICAgIHB1YmxpYyBvbmNlOmJvb2xlYW47XHJcbiAgICBwdWJsaWMgaWQ6bnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBzZXRUbyhjYWxsZXIsIG1ldGhvZCwgYXJncywgb25jZSlcclxuICAgIHtcclxuICAgICAgICBFdmVudEhhbmRsZXIuX2dpZCsrO1xyXG4gICAgICAgIHRoaXMuaWQgPSBFdmVudEhhbmRsZXIuX2dpZDtcclxuICAgICAgICB0aGlzLmNhbGxlciA9IGNhbGxlcjtcclxuICAgICAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcclxuICAgICAgICB0aGlzLmFyZ3MgPSBhcmdzO1xyXG4gICAgICAgIHRoaXMub25jZSA9IG9uY2U7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2FsbGVyLCBtZXRob2QsIGFyZ3MsIG9uY2UpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zZXRUbyhjYWxsZXIsIG1ldGhvZCwgYXJncywgb25jZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jYWxsZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYXJncyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5tZXRob2QgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWNvdmVyKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmlkID4gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuaWQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIEV2ZW50SGFuZGxlci5fcG9vbC5wdXNoKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHJ1bigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5tZXRob2QgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgLy/pmLLmraJoYW5kbGVy6KKr5L2/55So5ZCO6YeN5paw5aSN5Yi2ICDpgb/lhY3ooqvlm57mlLZcclxuICAgICAgICBsZXQgb2xkSWQgPSB0aGlzLmlkO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLm1ldGhvZC5hcHBseSh0aGlzLmNhbGxlciwgdGhpcy5hcmdzKTtcclxuICAgICAgICBvbGRJZCA9PT0gdGhpcy5pZCAmJiB0aGlzLm9uY2UgJiYgdGhpcy5yZWNvdmVyKCk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcnVuV2l0aChkYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubWV0aG9kID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gICAgICAgIGxldCBvbGRJZCA9IHRoaXMuaWQ7XHJcbiAgICAgICAgaWYgKGRhdGEgPT0gbnVsbClcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMubWV0aG9kLmFwcGx5KHRoaXMuY2FsbGVyLCB0aGlzLmFyZ3MpO1xyXG4gICAgICAgIC8vYXJncyDkuLrnqbogIGRhdGHkuI3mmK/mlbDnu4RcclxuICAgICAgICBlbHNlIGlmICghdGhpcy5hcmdzICYmICFkYXRhLnVuc2hpZnQpIHJlc3VsdD0gdGhpcy5tZXRob2QuY2FsbCh0aGlzLmNhbGxlciwgZGF0YSk7XHJcbiAgICAgICAgLy9hcmdz5LiN5Li656m6XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5hcmdzKSByZXN1bHQgPSB0aGlzLm1ldGhvZC5hcHBseSh0aGlzLmNhbGxlciwgdGhpcy5hcmdzLmNvbmNhdChkYXRhKSk7XHJcbiAgICAgICAgLy9hcmdzIOS4uuepuiBkYXRhIOS4uuaVsOe7hFxyXG4gICAgICAgIGVsc2UgcmVzdWx0ID0gdGhpcy5tZXRob2QuYXBwbHkodGhpcy5jYWxsZXIsIGRhdGEpO1xyXG4gICAgICAgIG9sZElkID09PSB0aGlzLmlkICYmIHRoaXMub25jZSAmJiB0aGlzLnJlY292ZXIoKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGNhbGxlciwgbWV0aG9kOkZ1bmN0aW9uLCBhcmdzOltdID0gbnVsbCwgb25jZTpCb29sZWFuID0gdHJ1ZSlcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5fcG9vbC5sZW5ndGgpIHJldHVybiB0aGlzLl9wb29sLnBvcCgpLnNldFRvKGNhbGxlciwgbWV0aG9kLCBhcmdzLCBvbmNlKTtcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50SGFuZGxlcihjYWxsZXIsIG1ldGhvZCwgYXJncywgb25jZSk7XHJcbiAgICB9XHJcbn0iXX0=