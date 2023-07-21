"use strict";
cc._RF.push(module, '0ccc632vx5A5JTGovxaC3iL', 'ErmjChatHandler');
// ermj/Ermj/scripts/handlers/ErmjChatHandler.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ErmjBaseHandler_1 = require("./ErmjBaseHandler");
var ErmjChatHandler = /** @class */ (function (_super) {
    __extends(ErmjChatHandler, _super);
    function ErmjChatHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjChatHandler.prototype.execute = function (msg) {
        var cType = msg._para.ctype;
        var fromSit = this.SitHelper.serverSToLocalN(msg._para.from_chair);
        var emoji = msg._para.emoji;
        var toSit = this.SitHelper.serverSToLocalN(msg._para.to_chair);
        var fromPlayer = this.mainUI.getPlayer(fromSit);
        var toPlayer = this.mainUI.getPlayer(toSit);
        if (!fromPlayer || !fromPlayer.someone || !toPlayer || !toPlayer.someone) // 没人不播放
            return;
        if (cType == 0) {
            // 文字 暂无
        }
        else if (cType == 1) {
            // 表情
            var fWPos = fromPlayer.getPlayerHeadCenterPos();
            var tWPos = toPlayer.getPlayerHeadCenterPos();
            this.mainUI.headTipsManager.playAct(emoji, fWPos, tWPos, toSit);
        }
    };
    ErmjChatHandler.prototype.checkInQueue = function () {
        return false;
    };
    return ErmjChatHandler;
}(ErmjBaseHandler_1.default));
exports.default = ErmjChatHandler;

cc._RF.pop();