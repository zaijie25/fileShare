"use strict";
cc._RF.push(module, 'e3ca4rV3p1FQ5D/UkTuMBuA', 'DdzEnterHandler');
// ddz/ddz/scripts/handlers/DdzEnterHandler.ts

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
var DdzBaseHandler_1 = require("./DdzBaseHandler");
var DdzEnterHandler = /** @class */ (function (_super) {
    __extends(DdzEnterHandler, _super);
    function DdzEnterHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzEnterHandler.prototype.refreshData = function (msg) {
        var src = msg._src;
        //自己进游戏
        if (this.context.selfSrc == src) {
            var seatId = this.SitHelper.serverSeatStrToNum(src);
            this.SitHelper.init(seatId, this.Define.MaxPlayerCount, this.Define.LocalToViewMap);
            this.context.set(this.Define.FieldInSettle, false);
        }
        var localSeat = this.SitHelper.serverSToLocalN(src);
        if (this.context.playerList[localSeat] == null) {
            Logger.error("服务器异常", localSeat);
            return;
        }
        this.context.playerList[localSeat].setInfo(msg._para);
    };
    DdzEnterHandler.prototype.execute = function (msg) {
        var src = msg._src;
        var localSeat = this.SitHelper.serverSToLocalN(src);
        this.mainUI.callPlayer(localSeat, "show", this.context.playerList[localSeat]);
        if (localSeat == 0)
            this.mainUI.selfInfoView.updateSelfPoint(this.context.playerList[localSeat].point);
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "DdzEnterHandler", 0.1);
    };
    return DdzEnterHandler;
}(DdzBaseHandler_1.default));
exports.default = DdzEnterHandler;

cc._RF.pop();