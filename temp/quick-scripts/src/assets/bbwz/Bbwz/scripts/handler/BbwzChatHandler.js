"use strict";
cc._RF.push(module, '1f110gOOkZGp5v9t3rhEv7r', 'BbwzChatHandler');
// bbwz/Bbwz/scripts/handler/BbwzChatHandler.ts

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
var BbwzSocketBaseHandler_1 = require("./BbwzSocketBaseHandler");
var BbwzDriver_1 = require("../BbwzDriver");
var BbwzData_1 = require("../data/BbwzData");
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
var BbwzChatHandler = /** @class */ (function (_super) {
    __extends(BbwzChatHandler, _super);
    function BbwzChatHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzChatHandler.prototype.handleData = function (msg) {
        var cType = msg._para.ctype;
        var fromSit = this.convertSeat(msg._para.from_chair);
        var content = msg._para.content;
        var emoji = msg._para.emoji;
        var toSit = this.convertSeat(msg._para.to_chair);
        var fromPlayer = BbwzDriver_1.default.instance.gameUI.getPlayer(fromSit);
        var toPlayer = BbwzDriver_1.default.instance.gameUI.getPlayer(toSit);
        if (!fromPlayer || (!fromPlayer.isSomeOne && fromSit !== 10000) || !toPlayer || !toPlayer.isSomeOne) // 没人不播放 未处理
            return;
        if (cType == 0) {
            // 文字 暂无
        }
        else if (cType == 1) {
            // 表情
            var fWPos = fromPlayer.getCenterWorldPos();
            var tWPos = toPlayer.getCenterWorldPos();
            BbwzDriver_1.default.instance.gameUI.headTipsManager.playAct(String(emoji), fWPos, tWPos, toSit);
        }
    };
    BbwzChatHandler.prototype.convertSeat = function (sChair) {
        //多人机器人是10000,大富豪10001 智多星 9999,其他 10002~10005
        var posAre = [9999, 10001, 10002, 10003, 10004, 10005];
        for (var i = 0; i < posAre.length; i++) {
            if (sChair === posAre[i]) {
                if (BbwzData_1.default.instance.playerDataArr[posAre[i]] && BbwzData_1.default.instance.playerDataArr[posAre[i]]._rchair === BbwzData_1.default.instance.selfSrc) {
                    return BbwzConstDefine_1.BbwzRole.Self;
                }
            }
        }
        if (sChair == BbwzData_1.default.instance.selfSrc) {
            return BbwzConstDefine_1.BbwzRole.Self;
        }
        else if (sChair >= BbwzConstDefine_1.BbwzRole.Wiser && sChair <= BbwzConstDefine_1.BbwzRole.Richer5)
            return sChair;
        else
            return BbwzConstDefine_1.BbwzRole.Online;
    };
    BbwzChatHandler.prototype.checkInQueue = function (msgParam) {
        return false;
    };
    return BbwzChatHandler;
}(BbwzSocketBaseHandler_1.default));
exports.default = BbwzChatHandler;

cc._RF.pop();