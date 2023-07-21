
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/handler/BbwzBetEndHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcaGFuZGxlclxcQmJ3ekJldEVuZEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlFQUE0RDtBQUM1RCw2Q0FBd0M7QUFDeEMsNENBQXVDO0FBQ3ZDLDJEQUF3RDtBQUV4RDs7R0FFRztBQUNIO0lBQXVDLHFDQUFxQjtJQUE1RDs7SUFnQ0EsQ0FBQztJQS9CRyxzQ0FBVSxHQUFWLFVBQVcsSUFBSTtRQUNYLG1GQUFtRjtRQUNuRixNQUFNO1FBQ04sa0JBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLCtCQUFhLENBQUMsTUFBTSxDQUFDO1FBQUEsQ0FBQztRQUVwRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakUsb0JBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsa0JBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0UsZUFBZTtRQUNmLHdFQUF3RTtRQUV4RSxVQUFVO1FBQ1Ysa0JBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsVUFBVTtRQUNWLGtCQUFRLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFOUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDbkMsS0FBSyxJQUFNLE9BQU8sSUFBSSxPQUFPLEVBQUU7WUFDM0Isa0JBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM5RTtRQUVELFVBQVU7UUFDVixrQkFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDcEQsb0JBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEUsUUFBUTtRQUNSLG9CQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsa0JBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNsRyxvQkFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLGtCQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbkcsWUFBWTtRQUNaLG9CQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ25ELFNBQVM7UUFDVCxvQkFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUNqRCxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQWhDQSxBQWdDQyxDQWhDc0MsK0JBQXFCLEdBZ0MzRDtBQWhDWSw4Q0FBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmJ3elNvY2tldEJhc2VIYW5kbGVyIGZyb20gXCIuL0Jid3pTb2NrZXRCYXNlSGFuZGxlclwiO1xyXG5pbXBvcnQgQmJ3ekRhdGEgZnJvbSBcIi4uL2RhdGEvQmJ3ekRhdGFcIjtcclxuaW1wb3J0IEJid3pEcml2ZXIgZnJvbSBcIi4uL0Jid3pEcml2ZXJcIjtcclxuaW1wb3J0IHsgQmJ3ekdhbWVTdGF0ZSB9IGZyb20gXCIuLi9kYXRhL0Jid3pDb25zdERlZmluZVwiO1xyXG5cclxuLyoqXHJcbiAqIOe7k+adn+S4i+azqCBlMlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJid3pCZXRFbmRIYW5kbGVyIGV4dGVuZHMgQmJ3elNvY2tldEJhc2VIYW5kbGVyIHtcclxuICAgIGhhbmRsZURhdGEoZGF0YSkge1xyXG4gICAgICAgIC8vY2MubG9nKFwiQmV0RW5kSGFuZGxlci0tLS0tLS0tLS1oYW5kbGVEYXRhLS0tLS0tZGF0YSA9IFwiICsgSlNPTi5zdHJpbmdpZnkoIGRhdGEgKSlcclxuICAgICAgICAvL+iuvue9rueKtuaAgVxyXG4gICAgICAgIEJid3pEYXRhLmluc3RhbmNlLmdhbWVTdGF0ZSA9IEJid3pHYW1lU3RhdGUuQmV0RW5kOztcclxuICAgICAgICBcclxuICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfQUREVElNRUxPQ0ssIFwiQmJ3ekJldEVuZEhhbmRsZXJcIiwgMSk7XHJcbiAgICAgICAgQmJ3ekRyaXZlci5pbnN0YW5jZS5nYW1lVUkuc3RhdGVWaWV3LnJ1blN0YXRlKEJid3pEYXRhLmluc3RhbmNlLmdhbWVTdGF0ZSk7XHJcbiAgICAgICAgLy/lpoLmnpzmmK/kuK3pgJTov5vlhaXpnIDopoHmmL7npLrlpb3niYxcclxuICAgICAgICAvLyBCYnd6RHJpdmVyLmluc3RhbmNlLmdhbWVVSS5jb21wYXJlUm9vdFZpZXcuZGVhbEFsbEdyb3VwUG9rZXJzKGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy/mm7TmlrDmnKzmrKHnu63ljovmlbDmja5cclxuICAgICAgICBCYnd6RGF0YS5pbnN0YW5jZS51cGRhdGVDdXJEYXRhKGRhdGEuX3BhcmEubXlfYmV0KTtcclxuICAgICAgICAvL+iuvue9rueJjOahjOS4i+azqOaVsOaNrlxyXG4gICAgICAgIEJid3pEYXRhLmluc3RhbmNlLnNldFRhYmxlQmV0RGF0YShkYXRhLl9wYXJhKTtcclxuXHJcbiAgICAgICAgbGV0IGFsbEJldHMgPSBkYXRhLl9wYXJhLnRhYmxlX2JldDtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleU5hbWUgaW4gYWxsQmV0cykge1xyXG4gICAgICAgICAgICBCYnd6RGF0YS5pbnN0YW5jZS5nYW1lVGFibGVCZXRJbmZvW2tleU5hbWVdLnRvdGFsQmV0TnVtID0gYWxsQmV0c1trZXlOYW1lXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5pu05paw5Zyo57q/546p5a625pWw6YePXHJcbiAgICAgICAgQmJ3ekRhdGEuaW5zdGFuY2Uub25saW5lUGxheWVyID0gZGF0YS5fcGFyYS5wX2NvdW50O1xyXG4gICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UuZ2FtZVVJLnVwZGF0ZU9ubGluZVBsYXllcihkYXRhLl9wYXJhLnBfY291bnQpO1xyXG4gICAgICAgIC8v5pu05paw5LiL5rOo5pi+56S6XHJcbiAgICAgICAgQmJ3ekRyaXZlci5pbnN0YW5jZS5nYW1lVUkuYmV0QXJlYVJvb3RWaWV3LnVwZGF0ZVNlbGZCZXRMYWJlbChCYnd6RGF0YS5pbnN0YW5jZS5nYW1lVGFibGVCZXRJbmZvKTtcclxuICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLmdhbWVVSS5iZXRBcmVhUm9vdFZpZXcudXBkYXRlVG90YWxCZXRMYWJlbChCYnd6RGF0YS5pbnN0YW5jZS5nYW1lVGFibGVCZXRJbmZvKTtcclxuICAgICAgICAvLyDmm7TmlrDkuIvms6jlupXpg6jnrbnnoIHmoI9cclxuICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLmdhbWVVSS51cGRhdGVCZXRTZWxlY3RCdXR0b24oKTtcclxuICAgICAgICAvLyDkuI3lhYHorrjpo57nrbnnoIFcclxuICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLmdhbWVVSS5iZXRFbmFibGUgPSBmYWxzZTtcclxuICAgIH1cclxufSJdfQ==