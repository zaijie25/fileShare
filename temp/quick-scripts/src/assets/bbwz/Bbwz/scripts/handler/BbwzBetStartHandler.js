"use strict";
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