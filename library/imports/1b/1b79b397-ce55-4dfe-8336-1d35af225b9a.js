"use strict";
cc._RF.push(module, '1b79bOXzlVN/oM2HTWvIlua', 'ErmjEnterHandler');
// ermj/Ermj/scripts/handlers/ErmjEnterHandler.ts

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
var ErmjGameConst_1 = require("../data/ErmjGameConst");
var ErmjPathHelper_1 = require("../data/ErmjPathHelper");
var ErmjEnterHandler = /** @class */ (function (_super) {
    __extends(ErmjEnterHandler, _super);
    function ErmjEnterHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjEnterHandler.prototype.refreshData = function (msg) {
        var src = msg._src;
        //自己进游戏
        if (this.context.selfSrc == src) {
            var seatId = this.SitHelper.serverSeatStrToNum(src);
            this.SitHelper.init(seatId, ErmjGameConst_1.default.maxPlayerCount, ErmjGameConst_1.default.localToViewMap);
            this.context.set(this.Define.FieldInSettle, false);
        }
        var localSeat = this.SitHelper.serverSToLocalN(src);
        if (this.context.playerList[localSeat] == null) {
            Logger.error("服务器异常", localSeat);
            return;
        }
        this.context.playerList[localSeat].setInfo(msg._para);
    };
    ErmjEnterHandler.prototype.execute = function (msg) {
        var src = msg._src;
        var localSeat = this.SitHelper.serverSToLocalN(src);
        this.mainUI.callPlayer(localSeat, "show", this.context.playerList[localSeat]);
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.SeatDown, true);
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "ErmjEnterHandler", 0.1);
    };
    return ErmjEnterHandler;
}(ErmjBaseHandler_1.default));
exports.default = ErmjEnterHandler;

cc._RF.pop();