"use strict";
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