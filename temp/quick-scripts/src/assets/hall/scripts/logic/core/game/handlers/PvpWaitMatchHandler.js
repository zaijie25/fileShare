"use strict";
cc._RF.push(module, 'f7c50kH2WND3Ycd1oKALZpd', 'PvpWaitMatchHandler');
// hall/scripts/logic/core/game/handlers/PvpWaitMatchHandler.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PvpWaitMatchHandler = /** @class */ (function () {
    function PvpWaitMatchHandler() {
    }
    PvpWaitMatchHandler.prototype.Handle = function (msg) {
        var session = {
            _para: {
                _gid: 2005,
                _glv: 'l1',
                _gsc: 'default',
                _chair: 0,
                _gt: 0,
            }
        };
        session = msg;
        Game.Control.setSession(session);
        Global.HallServer.setSession(session);
        Game.Control.stopCheckMsgTimer();
        Game.Event.event(Game.EVENT_MATCH_PLAYER, msg);
        if (Game.Control.curGid != session._para._gid) {
            Logger.error("Game.Control.curGid  !== session._para._gid");
            Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);
        }
    };
    PvpWaitMatchHandler.prototype.checkInQueue = function () {
        return false;
    };
    return PvpWaitMatchHandler;
}());
exports.default = PvpWaitMatchHandler;

cc._RF.pop();