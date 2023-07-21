"use strict";
cc._RF.push(module, '041f63UB6lAV7zizMVrG4iP', 'ErmjGameEvent');
// ermj/Ermj/scripts/data/ErmjGameEvent.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErmjGameEvent = /** @class */ (function () {
    function ErmjGameEvent() {
    }
    /** 通知牌山从末尾摸牌, 带参数几张 */
    ErmjGameEvent.doPatchwork = "ErmjGameEvent.doPatchwork";
    /** 通知听出牌 */
    ErmjGameEvent.doTingCallPlay = "ErmjGameEvent.doTingCallPlay";
    /** 头像点击 */
    ErmjGameEvent.onUserInfoTouch = "ErmjGameEvent.onUserInfoTouch";
    return ErmjGameEvent;
}());
exports.default = ErmjGameEvent;

cc._RF.pop();