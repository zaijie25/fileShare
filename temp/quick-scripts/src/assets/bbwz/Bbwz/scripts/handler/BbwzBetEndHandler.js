"use strict";
cc._RF.push(module, 'c6d25iHq2RCooLiK7udm3D9', 'BbwzBetEndHandler');
// bbwz/Bbwz/scripts/handler/BbwzBetEndHandler.ts

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
exports.BbwzBetEndHandler = void 0;
var BbwzSocketBaseHandler_1 = require("./BbwzSocketBaseHandler");
var BbwzData_1 = require("../data/BbwzData");
var BbwzDriver_1 = require("../BbwzDriver");
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
/**
 * 结束下注 e2
 */
var BbwzBetEndHandler = /** @class */ (function (_super) {
    __extends(BbwzBetEndHandler, _super);
    function BbwzBetEndHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzBetEndHandler.prototype.handleData = function (data) {
        //cc.log("BetEndHandler----------handleData------data = " + JSON.stringify( data ))
        //设置状态
        BbwzData_1.default.instance.gameState = BbwzConstDefine_1.BbwzGameState.BetEnd;
        ;
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "BbwzBetEndHandler", 1);
        BbwzDriver_1.default.instance.gameUI.stateView.runState(BbwzData_1.default.instance.gameState);
        //如果是中途进入需要显示好牌
        // BbwzDriver.instance.gameUI.compareRootView.dealAllGroupPokers(false);
        //更新本次续压数据
        BbwzData_1.default.instance.updateCurData(data._para.my_bet);
        //设置牌桌下注数据
        BbwzData_1.default.instance.setTableBetData(data._para);
        var allBets = data._para.table_bet;
        for (var keyName in allBets) {
            BbwzData_1.default.instance.gameTableBetInfo[keyName].totalBetNum = allBets[keyName];
        }
        //更新在线玩家数量
        BbwzData_1.default.instance.onlinePlayer = data._para.p_count;
        BbwzDriver_1.default.instance.gameUI.updateOnlinePlayer(data._para.p_count);
        //更新下注显示
        BbwzDriver_1.default.instance.gameUI.betAreaRootView.updateSelfBetLabel(BbwzData_1.default.instance.gameTableBetInfo);
        BbwzDriver_1.default.instance.gameUI.betAreaRootView.updateTotalBetLabel(BbwzData_1.default.instance.gameTableBetInfo);
        // 更新下注底部筹码栏
        BbwzDriver_1.default.instance.gameUI.updateBetSelectButton();
        // 不允许飞筹码
        BbwzDriver_1.default.instance.gameUI.betEnable = false;
    };
    return BbwzBetEndHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzBetEndHandler = BbwzBetEndHandler;

cc._RF.pop();