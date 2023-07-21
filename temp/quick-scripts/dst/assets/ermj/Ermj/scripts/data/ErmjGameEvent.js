
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/data/ErmjGameEvent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcZGF0YVxcRXJtakdhbWVFdmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7SUFPQSxDQUFDO0lBTkcsdUJBQXVCO0lBQ1QseUJBQVcsR0FBRywyQkFBMkIsQ0FBQztJQUN4RCxZQUFZO0lBQ0UsNEJBQWMsR0FBRyw4QkFBOEIsQ0FBQztJQUM5RCxXQUFXO0lBQ0csNkJBQWUsR0FBRywrQkFBK0IsQ0FBQTtJQUNuRSxvQkFBQztDQVBELEFBT0MsSUFBQTtrQkFQb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEVybWpHYW1lRXZlbnR7XHJcbiAgICAvKiog6YCa55+l54mM5bGx5LuO5pyr5bC+5pG454mMLCDluKblj4LmlbDlh6DlvKAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZG9QYXRjaHdvcmsgPSBcIkVybWpHYW1lRXZlbnQuZG9QYXRjaHdvcmtcIjtcclxuICAgIC8qKiDpgJrnn6XlkKzlh7rniYwgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZG9UaW5nQ2FsbFBsYXkgPSBcIkVybWpHYW1lRXZlbnQuZG9UaW5nQ2FsbFBsYXlcIjtcclxuICAgIC8qKiDlpLTlg4/ngrnlh7sgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgb25Vc2VySW5mb1RvdWNoID0gXCJFcm1qR2FtZUV2ZW50Lm9uVXNlckluZm9Ub3VjaFwiXHJcbn0iXX0=