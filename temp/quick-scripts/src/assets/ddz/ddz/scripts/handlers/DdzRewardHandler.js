"use strict";
cc._RF.push(module, '0ec66nynf5HcIK+nJRCou+A', 'DdzRewardHandler');
// ddz/ddz/scripts/handlers/DdzRewardHandler.ts

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
var DdzDriver_1 = require("../DdzDriver");
var DdzBaseHandler_1 = require("./DdzBaseHandler");
var DdzRewardHandler = /** @class */ (function (_super) {
    __extends(DdzRewardHandler, _super);
    function DdzRewardHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzRewardHandler.prototype.execute = function (msg) {
        Global.Audio.stopMusic();
        this.context.set(this.Define.FieldInSettle, true);
        var time = (msg._timeo * 1000 - (Date.now() - msg._receiveTime)) / 1000;
        if (!time || time <= this.Define.PlayRoleWinTime + this.Define.FloatScoreTime)
            time = this.Define.PlayRoleWinTime + this.Define.FloatScoreTime + 1;
        // this.mainUI.gameSettleView.delayShowActionBtn(time);     // 由leave-103控制显示
        this.mainUI.playAwardAnim(msg._para.awards, msg._para.details);
        if (this.context.syncMode) {
            DdzDriver_1.default.instance.mainUI.taskManager.reqGetCommisionInfo();
        }
    };
    DdzRewardHandler.prototype.executeSync = function (msg) {
        this.execute(msg);
    };
    return DdzRewardHandler;
}(DdzBaseHandler_1.default));
exports.default = DdzRewardHandler;

cc._RF.pop();