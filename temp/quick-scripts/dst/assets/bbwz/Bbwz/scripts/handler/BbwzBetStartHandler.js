
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/handler/BbwzBetStartHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6a8a31ykz5O5raTWR0DPw4D', 'BbwzBetStartHandler');
// bbwz/Bbwz/scripts/handler/BbwzBetStartHandler.ts

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
exports.BbwzBetStartDaojishiHandler = exports.BbwzBetStartFapaiHandler = exports.BbwzBetStartAnimationHandler = exports.BbwzBetStartVSHandler = exports.BbwzBetStartHandler = void 0;
var BbwzSocketBaseHandler_1 = require("./BbwzSocketBaseHandler");
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
var BbwzData_1 = require("../data/BbwzData");
var BbwzDriver_1 = require("../BbwzDriver");
var time_daojishi_bet = 1.0; //倒计时显示需要的时间
var time_start_bet = 1.5; //开始下注动画需要的时间
var time_nothing = 8.0; //空置时间
var time_vs = 1.0; //龙vs虎动画需要的时间
// const time_one_deal = 0.5;      //发2组牌
// const delay_one_deal = 0.2;     // 发牌间隔
/**
 * 开始下注 e1
 */
var BbwzBetStartHandler = /** @class */ (function (_super) {
    __extends(BbwzBetStartHandler, _super);
    function BbwzBetStartHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzBetStartHandler.prototype.handleData = function (data) {
        BbwzDriver_1.default.instance.gameUI.clearByRound();
        cc.log("BetStartHandler----------handleData------data = " + JSON.stringify(data));
        //修正时间
        data._para.time /= 1000;
        var currTime = Date.now();
        var jiangeTime = currTime - data._receiveTime;
        var totalSec = data._para.time - jiangeTime / 1000;
        var dataStr = JSON.stringify(data);
        var msgArr = [];
        //闹钟倒计时
        totalSec -= time_daojishi_bet;
        var msg = JSON.parse(dataStr);
        msg._cmd = BbwzConstDefine_1.default.GameStart_Daojishi;
        msg._needPlay = totalSec >= 0;
        msg.time = time_daojishi_bet;
        msgArr.unshift(msg);
        //开始下注的动画
        totalSec -= time_start_bet;
        var msg = JSON.parse(dataStr);
        msg._cmd = BbwzConstDefine_1.default.GameStart_Animation;
        msg._needPlay = totalSec >= 0;
        msg.time = time_start_bet;
        msgArr.unshift(msg);
        //空置
        totalSec -= time_nothing;
        Game.Event.event(Game.EVENT_UNSHFIT_MSGLIST, msgArr);
        //更新续压数据
        BbwzData_1.default.instance.updatePreContinueData(data._para.my_bet);
        //设置牌桌已下注的数据
        BbwzData_1.default.instance.setTableBetData(data._para);
        //更新在线玩家数量
        BbwzData_1.default.instance.onlinePlayer = data._para.p_count;
        //更新显示在线玩家数量
        BbwzDriver_1.default.instance.gameUI.updateOnlinePlayer(data._para.p_count);
        // 更新下注文本
        BbwzDriver_1.default.instance.gameUI.betAreaRootView.updateSelfBetLabel(BbwzData_1.default.instance.gameTableBetInfo);
        BbwzDriver_1.default.instance.gameUI.betAreaRootView.updateTotalBetLabel(BbwzData_1.default.instance.gameTableBetInfo);
    };
    return BbwzBetStartHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzBetStartHandler = BbwzBetStartHandler;
/**
 * 开始下注 e1-x 龙vs虎动画
 */
var BbwzBetStartVSHandler = /** @class */ (function (_super) {
    __extends(BbwzBetStartVSHandler, _super);
    function BbwzBetStartVSHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzBetStartVSHandler.prototype.handleData = function (data) {
        // if (data._needPlay) {
        //     Game.Event.event(Game.EVENT_ADDTIMELOCK, "BetStartVS", data.time);
        // }
        // //设置状态
        // BbwzData.instance.gameState = BbwzGameState.Deal;
        // BbwzDriver.instance.gameUI.stateView.UpdateUI(data._needPlay);
        // //更新显示下注按钮
        // BbwzDriver.instance.gameUI.updateBetSelectButton();
    };
    return BbwzBetStartVSHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzBetStartVSHandler = BbwzBetStartVSHandler;
/**
 * 开始下注 e1-1 播放“开始下注”的动画
 */
var BbwzBetStartAnimationHandler = /** @class */ (function (_super) {
    __extends(BbwzBetStartAnimationHandler, _super);
    function BbwzBetStartAnimationHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzBetStartAnimationHandler.prototype.handleData = function (data) {
        if (data._needPlay) {
            Game.Event.event(Game.EVENT_ADDTIMELOCK, "BetStartAnimation", data.time);
        }
        BbwzData_1.default.instance.gameState = BbwzConstDefine_1.BbwzGameState.BetStart;
        BbwzDriver_1.default.instance.gameUI.stateView.runState(BbwzData_1.default.instance.gameState, data._needPlay);
        //更新显示下注按钮
        BbwzDriver_1.default.instance.gameUI.updateBetSelectButton();
    };
    return BbwzBetStartAnimationHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzBetStartAnimationHandler = BbwzBetStartAnimationHandler;
/**
 * 开始下注 e1-0 发牌的动画
 */
var BbwzBetStartFapaiHandler = /** @class */ (function (_super) {
    __extends(BbwzBetStartFapaiHandler, _super);
    function BbwzBetStartFapaiHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzBetStartFapaiHandler.prototype.handleData = function (data) {
        // //设置游戏状态
        // BbwzData.instance.gameState = BbwzGameState.Deal;
        // BbwzDriver.instance.gameUI.stateView.runState(BbwzData.instance.gameState, false);
    };
    return BbwzBetStartFapaiHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzBetStartFapaiHandler = BbwzBetStartFapaiHandler;
/**
 * 开始下注 e1-2 闹钟倒计时
 */
var BbwzBetStartDaojishiHandler = /** @class */ (function (_super) {
    __extends(BbwzBetStartDaojishiHandler, _super);
    function BbwzBetStartDaojishiHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzBetStartDaojishiHandler.prototype.handleData = function (data) {
        //设置倒计时时间
        var currTime = Date.now();
        var jiangeTime = currTime - data._receiveTime;
        BbwzData_1.default.instance.remainTime = Math.floor(Math.max(0.5, data._para.time - jiangeTime / 1000));
        //设置状态
        BbwzData_1.default.instance.gameState = BbwzConstDefine_1.BbwzGameState.Bet;
        BbwzDriver_1.default.instance.gameUI.stateView.runState(BbwzData_1.default.instance.gameState, false);
        BbwzDriver_1.default.instance.gameUI.stateView.setTimeRunConfig(BbwzData_1.default.instance.remainTime, function (leftTime) {
            if (leftTime > 0 && leftTime <= 3)
                Global.Audio.playBundleSound(BbwzConstDefine_1.default.GAME_ID, BbwzConstDefine_1.default.SOUND_DAOJISHI);
            if (leftTime == 0)
                Global.Audio.playBundleSound(BbwzConstDefine_1.default.GAME_ID, BbwzConstDefine_1.default.SOUND_DAOJISHI_END);
        }, this);
        //更新显示下注按钮
        BbwzDriver_1.default.instance.gameUI.updateBetSelectButton();
        //允许飞筹码
        BbwzDriver_1.default.instance.gameUI.betEnable = true;
    };
    return BbwzBetStartDaojishiHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzBetStartDaojishiHandler = BbwzBetStartDaojishiHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcaGFuZGxlclxcQmJ3ekJldFN0YXJ0SGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUVBQTREO0FBQzVELDJEQUF5RTtBQUN6RSw2Q0FBd0M7QUFDeEMsNENBQXVDO0FBRXZDLElBQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFDLENBQUUsWUFBWTtBQUM1QyxJQUFNLGNBQWMsR0FBRyxHQUFHLENBQUMsQ0FBSyxhQUFhO0FBQzdDLElBQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxDQUFPLE1BQU07QUFDdEMsSUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQVksYUFBYTtBQUM3Qyx5Q0FBeUM7QUFDekMsMENBQTBDO0FBRTFDOztHQUVHO0FBQ0g7SUFBeUMsdUNBQXFCO0lBQTlEOztJQStDQSxDQUFDO0lBN0NHLHdDQUFVLEdBQVYsVUFBVyxJQUFJO1FBQ1gsb0JBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsa0RBQWtELEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLE1BQU07UUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7UUFDeEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzFCLElBQUksVUFBVSxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzlDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbkQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7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QUFTLENBQUMsZ0JBQWdCLENBQUMsa0JBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLFVBQUMsUUFBZ0I7WUFDakcsSUFBSSxRQUFRLEdBQUcsQ0FBQyxJQUFJLFFBQVEsSUFBSSxDQUFDO2dCQUM3QixNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyx5QkFBZSxDQUFDLE9BQU8sRUFBQyx5QkFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3pGLElBQUksUUFBUSxJQUFJLENBQUM7Z0JBQ2IsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMseUJBQWUsQ0FBQyxPQUFPLEVBQUMseUJBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2pHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNULFVBQVU7UUFDVixvQkFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUNuRCxPQUFPO1FBQ1Asb0JBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDaEQsQ0FBQztJQUNMLGtDQUFDO0FBQUQsQ0F0QkEsQUFzQkMsQ0F0QmdELCtCQUFxQixHQXNCckU7QUF0Qlksa0VBQTJCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJid3pTb2NrZXRCYXNlSGFuZGxlciBmcm9tIFwiLi9CYnd6U29ja2V0QmFzZUhhbmRsZXJcIjtcclxuaW1wb3J0IEJid3pDb25zdERlZmluZSwgeyBCYnd6R2FtZVN0YXRlIH0gZnJvbSBcIi4uL2RhdGEvQmJ3ekNvbnN0RGVmaW5lXCI7XHJcbmltcG9ydCBCYnd6RGF0YSBmcm9tIFwiLi4vZGF0YS9CYnd6RGF0YVwiO1xyXG5pbXBvcnQgQmJ3ekRyaXZlciBmcm9tIFwiLi4vQmJ3ekRyaXZlclwiO1xyXG5cclxuY29uc3QgdGltZV9kYW9qaXNoaV9iZXQgPSAxLjA7ICAvL+WAkuiuoeaXtuaYvuekuumcgOimgeeahOaXtumXtFxyXG5jb25zdCB0aW1lX3N0YXJ0X2JldCA9IDEuNTsgICAgIC8v5byA5aeL5LiL5rOo5Yqo55S76ZyA6KaB55qE5pe26Ze0XHJcbmNvbnN0IHRpbWVfbm90aGluZyA9IDguMDsgICAgICAgLy/nqbrnva7ml7bpl7RcclxuY29uc3QgdGltZV92cyA9IDEuMDsgICAgICAgICAgICAvL+m+mXZz6JmO5Yqo55S76ZyA6KaB55qE5pe26Ze0XHJcbi8vIGNvbnN0IHRpbWVfb25lX2RlYWwgPSAwLjU7ICAgICAgLy/lj5Ey57uE54mMXHJcbi8vIGNvbnN0IGRlbGF5X29uZV9kZWFsID0gMC4yOyAgICAgLy8g5Y+R54mM6Ze06ZqUXHJcblxyXG4vKipcclxuICog5byA5aeL5LiL5rOoIGUxXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmJ3ekJldFN0YXJ0SGFuZGxlciBleHRlbmRzIEJid3pTb2NrZXRCYXNlSGFuZGxlciB7XHJcblxyXG4gICAgaGFuZGxlRGF0YShkYXRhKSB7XHJcbiAgICAgICAgQmJ3ekRyaXZlci5pbnN0YW5jZS5nYW1lVUkuY2xlYXJCeVJvdW5kKCk7XHJcbiAgICAgICAgY2MubG9nKFwiQmV0U3RhcnRIYW5kbGVyLS0tLS0tLS0tLWhhbmRsZURhdGEtLS0tLS1kYXRhID0gXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgLy/kv67mraPml7bpl7RcclxuICAgICAgICBkYXRhLl9wYXJhLnRpbWUgLz0gMTAwMDtcclxuICAgICAgICB2YXIgY3VyclRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHZhciBqaWFuZ2VUaW1lID0gY3VyclRpbWUgLSBkYXRhLl9yZWNlaXZlVGltZTtcclxuICAgICAgICB2YXIgdG90YWxTZWMgPSBkYXRhLl9wYXJhLnRpbWUgLSBqaWFuZ2VUaW1lIC8gMTAwMDtcclxuICAgICAgICB2YXIgZGF0YVN0ciA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgIHZhciBtc2dBcnIgPSBbXTtcclxuXHJcbiAgICAgICAgLy/pl7npkp/lgJLorqHml7ZcclxuICAgICAgICB0b3RhbFNlYyAtPSB0aW1lX2Rhb2ppc2hpX2JldDtcclxuICAgICAgICB2YXIgbXNnID0gSlNPTi5wYXJzZShkYXRhU3RyKTtcclxuICAgICAgICBtc2cuX2NtZCA9IEJid3pDb25zdERlZmluZS5HYW1lU3RhcnRfRGFvamlzaGk7XHJcbiAgICAgICAgbXNnLl9uZWVkUGxheSA9IHRvdGFsU2VjID49IDA7XHJcbiAgICAgICAgbXNnLnRpbWUgPSB0aW1lX2Rhb2ppc2hpX2JldDtcclxuICAgICAgICBtc2dBcnIudW5zaGlmdChtc2cpO1xyXG5cclxuICAgICAgICAvL+W8gOWni+S4i+azqOeahOWKqOeUu1xyXG4gICAgICAgIHRvdGFsU2VjIC09IHRpbWVfc3RhcnRfYmV0O1xyXG4gICAgICAgIHZhciBtc2cgPSBKU09OLnBhcnNlKGRhdGFTdHIpO1xyXG4gICAgICAgIG1zZy5fY21kID0gQmJ3ekNvbnN0RGVmaW5lLkdhbWVTdGFydF9BbmltYXRpb247XHJcbiAgICAgICAgbXNnLl9uZWVkUGxheSA9IHRvdGFsU2VjID49IDA7XHJcbiAgICAgICAgbXNnLnRpbWUgPSB0aW1lX3N0YXJ0X2JldDtcclxuICAgICAgICBtc2dBcnIudW5zaGlmdChtc2cpO1xyXG5cclxuICAgICAgICAvL+epuue9rlxyXG4gICAgICAgIHRvdGFsU2VjIC09IHRpbWVfbm90aGluZztcclxuXHJcbiAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX1VOU0hGSVRfTVNHTElTVCwgbXNnQXJyKTtcclxuXHJcbiAgICAgICAgLy/mm7TmlrDnu63ljovmlbDmja5cclxuICAgICAgICBCYnd6RGF0YS5pbnN0YW5jZS51cGRhdGVQcmVDb250aW51ZURhdGEoZGF0YS5fcGFyYS5teV9iZXQpO1xyXG4gICAgICAgIC8v6K6+572u54mM5qGM5bey5LiL5rOo55qE5pWw5o2uXHJcbiAgICAgICAgQmJ3ekRhdGEuaW5zdGFuY2Uuc2V0VGFibGVCZXREYXRhKGRhdGEuX3BhcmEpO1xyXG5cclxuICAgICAgICAvL+abtOaWsOWcqOe6v+eOqeWutuaVsOmHj1xyXG4gICAgICAgIEJid3pEYXRhLmluc3RhbmNlLm9ubGluZVBsYXllciA9IGRhdGEuX3BhcmEucF9jb3VudDtcclxuICAgICAgICAvL+abtOaWsOaYvuekuuWcqOe6v+eOqeWutuaVsOmHj1xyXG4gICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UuZ2FtZVVJLnVwZGF0ZU9ubGluZVBsYXllcihkYXRhLl9wYXJhLnBfY291bnQpO1xyXG4gICAgICAgIC8vIOabtOaWsOS4i+azqOaWh+acrFxyXG4gICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UuZ2FtZVVJLmJldEFyZWFSb290Vmlldy51cGRhdGVTZWxmQmV0TGFiZWwoQmJ3ekRhdGEuaW5zdGFuY2UuZ2FtZVRhYmxlQmV0SW5mbyk7XHJcbiAgICAgICAgQmJ3ekRyaXZlci5pbnN0YW5jZS5nYW1lVUkuYmV0QXJlYVJvb3RWaWV3LnVwZGF0ZVRvdGFsQmV0TGFiZWwoQmJ3ekRhdGEuaW5zdGFuY2UuZ2FtZVRhYmxlQmV0SW5mbyk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICog5byA5aeL5LiL5rOoIGUxLXgg6b6ZdnPomY7liqjnlLtcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCYnd6QmV0U3RhcnRWU0hhbmRsZXIgZXh0ZW5kcyBCYnd6U29ja2V0QmFzZUhhbmRsZXIge1xyXG5cclxuICAgIGhhbmRsZURhdGEoZGF0YSkge1xyXG4gICAgICAgIC8vIGlmIChkYXRhLl9uZWVkUGxheSkge1xyXG4gICAgICAgIC8vICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfQUREVElNRUxPQ0ssIFwiQmV0U3RhcnRWU1wiLCBkYXRhLnRpbWUpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyAvL+iuvue9rueKtuaAgVxyXG4gICAgICAgIC8vIEJid3pEYXRhLmluc3RhbmNlLmdhbWVTdGF0ZSA9IEJid3pHYW1lU3RhdGUuRGVhbDtcclxuICAgICAgICAvLyBCYnd6RHJpdmVyLmluc3RhbmNlLmdhbWVVSS5zdGF0ZVZpZXcuVXBkYXRlVUkoZGF0YS5fbmVlZFBsYXkpO1xyXG4gICAgICAgIC8vIC8v5pu05paw5pi+56S65LiL5rOo5oyJ6ZKuXHJcbiAgICAgICAgLy8gQmJ3ekRyaXZlci5pbnN0YW5jZS5nYW1lVUkudXBkYXRlQmV0U2VsZWN0QnV0dG9uKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICog5byA5aeL5LiL5rOoIGUxLTEg5pKt5pS+4oCc5byA5aeL5LiL5rOo4oCd55qE5Yqo55S7XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmJ3ekJldFN0YXJ0QW5pbWF0aW9uSGFuZGxlciBleHRlbmRzIEJid3pTb2NrZXRCYXNlSGFuZGxlciB7XHJcblxyXG4gICAgaGFuZGxlRGF0YShkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGEuX25lZWRQbGF5KSB7XHJcbiAgICAgICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9BRERUSU1FTE9DSywgXCJCZXRTdGFydEFuaW1hdGlvblwiLCBkYXRhLnRpbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQmJ3ekRhdGEuaW5zdGFuY2UuZ2FtZVN0YXRlID0gQmJ3ekdhbWVTdGF0ZS5CZXRTdGFydDtcclxuICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLmdhbWVVSS5zdGF0ZVZpZXcucnVuU3RhdGUoQmJ3ekRhdGEuaW5zdGFuY2UuZ2FtZVN0YXRlLCBkYXRhLl9uZWVkUGxheSk7XHJcbiAgICAgICAgLy/mm7TmlrDmmL7npLrkuIvms6jmjInpkq5cclxuICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLmdhbWVVSS51cGRhdGVCZXRTZWxlY3RCdXR0b24oKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOW8gOWni+S4i+azqCBlMS0wIOWPkeeJjOeahOWKqOeUu1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJid3pCZXRTdGFydEZhcGFpSGFuZGxlciBleHRlbmRzIEJid3pTb2NrZXRCYXNlSGFuZGxlciB7XHJcbiAgICBoYW5kbGVEYXRhKGRhdGEpIHtcclxuICAgICAgICAvLyAvL+iuvue9rua4uOaIj+eKtuaAgVxyXG4gICAgICAgIC8vIEJid3pEYXRhLmluc3RhbmNlLmdhbWVTdGF0ZSA9IEJid3pHYW1lU3RhdGUuRGVhbDtcclxuICAgICAgICBcclxuICAgICAgICAvLyBCYnd6RHJpdmVyLmluc3RhbmNlLmdhbWVVSS5zdGF0ZVZpZXcucnVuU3RhdGUoQmJ3ekRhdGEuaW5zdGFuY2UuZ2FtZVN0YXRlLCBmYWxzZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlvIDlp4vkuIvms6ggZTEtMiDpl7npkp/lgJLorqHml7ZcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCYnd6QmV0U3RhcnREYW9qaXNoaUhhbmRsZXIgZXh0ZW5kcyBCYnd6U29ja2V0QmFzZUhhbmRsZXIge1xyXG5cclxuICAgIGhhbmRsZURhdGEoZGF0YSkge1xyXG4gICAgICAgIC8v6K6+572u5YCS6K6h5pe25pe26Ze0XHJcbiAgICAgICAgdmFyIGN1cnJUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICB2YXIgamlhbmdlVGltZSA9IGN1cnJUaW1lIC0gZGF0YS5fcmVjZWl2ZVRpbWU7XHJcbiAgICAgICAgQmJ3ekRhdGEuaW5zdGFuY2UucmVtYWluVGltZSA9IE1hdGguZmxvb3IoTWF0aC5tYXgoMC41LCBkYXRhLl9wYXJhLnRpbWUgLSBqaWFuZ2VUaW1lIC8gMTAwMCkpO1xyXG5cclxuICAgICAgICAvL+iuvue9rueKtuaAgVxyXG4gICAgICAgIEJid3pEYXRhLmluc3RhbmNlLmdhbWVTdGF0ZSA9IEJid3pHYW1lU3RhdGUuQmV0O1xyXG4gICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UuZ2FtZVVJLnN0YXRlVmlldy5ydW5TdGF0ZShCYnd6RGF0YS5pbnN0YW5jZS5nYW1lU3RhdGUsIGZhbHNlKTtcclxuICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLmdhbWVVSS5zdGF0ZVZpZXcuc2V0VGltZVJ1bkNvbmZpZyhCYnd6RGF0YS5pbnN0YW5jZS5yZW1haW5UaW1lLCAobGVmdFRpbWU6IG51bWJlcik9PntcclxuICAgICAgICAgICAgaWYgKGxlZnRUaW1lID4gMCAmJiBsZWZ0VGltZSA8PSAzKVxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlCdW5kbGVTb3VuZChCYnd6Q29uc3REZWZpbmUuR0FNRV9JRCxCYnd6Q29uc3REZWZpbmUuU09VTkRfREFPSklTSEkpO1xyXG4gICAgICAgICAgICBpZiAobGVmdFRpbWUgPT0gMClcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QnVuZGxlU291bmQoQmJ3ekNvbnN0RGVmaW5lLkdBTUVfSUQsQmJ3ekNvbnN0RGVmaW5lLlNPVU5EX0RBT0pJU0hJX0VORCk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgLy/mm7TmlrDmmL7npLrkuIvms6jmjInpkq5cclxuICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLmdhbWVVSS51cGRhdGVCZXRTZWxlY3RCdXR0b24oKTtcclxuICAgICAgICAvL+WFgeiuuOmjnuetueeggVxyXG4gICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UuZ2FtZVVJLmJldEVuYWJsZSA9IHRydWU7XHJcbiAgICB9XHJcbn0iXX0=