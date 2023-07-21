
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/game/handlers/PvpWaitMatchHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGdhbWVcXGhhbmRsZXJzXFxQdnBXYWl0TWF0Y2hIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBQTtJQTJCQSxDQUFDO0lBMUJhLG9DQUFNLEdBQWhCLFVBQWlCLEdBQUc7UUFDaEIsSUFBSSxPQUFPLEdBQUc7WUFDVixLQUFLLEVBQUM7Z0JBQ0YsSUFBSSxFQUFHLElBQUk7Z0JBQ1gsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsR0FBRyxFQUFFLENBQUM7YUFDVDtTQUNKLENBQUM7UUFDRixPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUUvQyxJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUM1QztZQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztTQUNqRDtJQUNMLENBQUM7SUFFTSwwQ0FBWSxHQUFuQjtRQUNJLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDTCwwQkFBQztBQUFELENBM0JBLEFBMkJDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBQdnBXYWl0TWF0Y2hIYW5kbGVye1xyXG4gICAgcHJvdGVjdGVkIEhhbmRsZShtc2cpe1xyXG4gICAgICAgIGxldCBzZXNzaW9uID0ge1xyXG4gICAgICAgICAgICBfcGFyYTp7XHJcbiAgICAgICAgICAgICAgICBfZ2lkIDogMjAwNSxcclxuICAgICAgICAgICAgICAgIF9nbHY6ICdsMScsXHJcbiAgICAgICAgICAgICAgICBfZ3NjOiAnZGVmYXVsdCcsXHJcbiAgICAgICAgICAgICAgICBfY2hhaXI6IDAsICAgICAgLy8gMOS7o+ihqOWkhOS6juWMuemFjeS4rVxyXG4gICAgICAgICAgICAgICAgX2d0OiAwLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZXNzaW9uID0gbXNnO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5zZXRTZXNzaW9uKHNlc3Npb24pO1xyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNldFNlc3Npb24oc2Vzc2lvbik7XHJcbiAgICAgICAgR2FtZS5Db250cm9sLnN0b3BDaGVja01zZ1RpbWVyKCk7XHJcbiAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX01BVENIX1BMQVlFUiwgbXNnKTtcclxuXHJcbiAgICAgICAgaWYoR2FtZS5Db250cm9sLmN1ckdpZCAhPSBzZXNzaW9uLl9wYXJhLl9naWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJHYW1lLkNvbnRyb2wuY3VyR2lkICAhPT0gc2Vzc2lvbi5fcGFyYS5fZ2lkXCIpO1xyXG4gICAgICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfRk9SQ0VfTEVBVkVfR0FNRSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja0luUXVldWUoKXtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0iXX0=