"use strict";
cc._RF.push(module, 'fede4rRNTNHSpvnyhcdBO/d', 'ErmjDrawCardHandler');
// ermj/Ermj/scripts/handlers/ErmjDrawCardHandler.ts

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
var ErmjRuleConst_1 = require("../data/ErmjRuleConst");
var ErmjDrawCardHandler = /** @class */ (function (_super) {
    __extends(ErmjDrawCardHandler, _super);
    function ErmjDrawCardHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjDrawCardHandler.prototype.execute = function (msg) {
        this.mainUI.callAllPlayers("showStateSp", false);
        this.mainUI.askActionView.active = false;
        var localSeat = this.SitHelper.serverSToLocalN(msg._para.chair);
        var cards = msg._para.cards || [];
        var isHeadDraw = msg._para.head_draw == 1;
        var tingDataList = this.context.get(this.Define.FieldTingData);
        if (tingDataList && !Global.Toolkit.isEmptyObject(tingDataList) && this.context.get(this.Define.FieldInTing)) {
            var random = Global.Toolkit.getRoundInteger(10);
            var isRub = ErmjRuleConst_1.default.checkAlmostWin(cards[0], tingDataList) && (random <= 1 || random >= 9);
            this.mainUI.onDrawCard(localSeat, cards, isHeadDraw, msg._para.left_count, isRub);
        }
        else {
            this.mainUI.onDrawCard(localSeat, cards, isHeadDraw, msg._para.left_count, false);
        }
    };
    ErmjDrawCardHandler.prototype.executeSync = function (msg) {
        // 重连不会进这个协议, 合并到deal里了
    };
    return ErmjDrawCardHandler;
}(ErmjBaseHandler_1.default));
exports.default = ErmjDrawCardHandler;

cc._RF.pop();