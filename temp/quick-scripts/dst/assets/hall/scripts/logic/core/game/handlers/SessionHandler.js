
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/game/handlers/SessionHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8a63aA7S6hJyqu9HF/3grwK', 'SessionHandler');
// hall/scripts/logic/core/game/handlers/SessionHandler.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SessionHandler = /** @class */ (function () {
    function SessionHandler() {
    }
    SessionHandler.prototype.Handle = function (session) {
        Game.Context.selfSrc = session._src;
        Game.Context.session = session._para;
        Game.Control.setSession(session);
        Global.HallServer.setSession(session);
        Game.Control.stopCheckMsgTimer();
        if (Game.Control.curGid != session._para._gid) {
            Logger.error("Game.Control.curGid  !== session._para._gid");
            Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);
        }
    };
    SessionHandler.prototype.checkInQueue = function () {
        return false;
    };
    return SessionHandler;
}());
exports.default = SessionHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGdhbWVcXGhhbmRsZXJzXFxTZXNzaW9uSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7SUFxQkEsQ0FBQztJQW5CYSwrQkFBTSxHQUFoQixVQUFpQixPQUFPO1FBRXBCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNoQyxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFakMsSUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksRUFDNUM7WUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7U0FDakQ7SUFDTCxDQUFDO0lBRU0scUNBQVksR0FBbkI7UUFFSSxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQXJCQSxBQXFCQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Vzc2lvbkhhbmRsZXIgXHJcbntcclxuICAgIHByb3RlY3RlZCBIYW5kbGUoc2Vzc2lvbilcclxuICAgIHtcclxuICAgICAgICBHYW1lLkNvbnRleHQuc2VsZlNyYyA9IHNlc3Npb24uX3NyYztcclxuICAgICAgICBHYW1lLkNvbnRleHQuc2Vzc2lvbiA9IHNlc3Npb24uX3BhcmE7XHJcbiAgICAgICAgR2FtZS5Db250cm9sLnNldFNlc3Npb24oc2Vzc2lvbilcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZXRTZXNzaW9uKHNlc3Npb24pO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5zdG9wQ2hlY2tNc2dUaW1lcigpO1xyXG5cclxuICAgICAgICBpZihHYW1lLkNvbnRyb2wuY3VyR2lkICE9IHNlc3Npb24uX3BhcmEuX2dpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIkdhbWUuQ29udHJvbC5jdXJHaWQgICE9PSBzZXNzaW9uLl9wYXJhLl9naWRcIik7XHJcbiAgICAgICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9GT1JDRV9MRUFWRV9HQU1FKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrSW5RdWV1ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59Il19