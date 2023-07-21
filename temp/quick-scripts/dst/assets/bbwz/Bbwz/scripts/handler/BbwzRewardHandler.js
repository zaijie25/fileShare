
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/handler/BbwzRewardHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f3bd0o5CUhOdKneLD1i6LXM', 'BbwzRewardHandler');
// bbwz/Bbwz/scripts/handler/BbwzRewardHandler.ts

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BbwzRewardWaitNextHandler = exports.BbwzRewardGeRenJieSuanHandler = exports.BbwzRewardFlyWordHandler = exports.BbwzRewardFeiChouMaHandler = exports.BbwzRewardWinShineHandler = exports.BbwzRewardAreaResultHandler = exports.BbwzRewardFanCardHandler = exports.BbwzRewardDispatchHandler = exports.BbwzRewardFapaiHandler = exports.BbwzRewardHandler = void 0;
var BbwzSocketBaseHandler_1 = require("./BbwzSocketBaseHandler");
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
var BbwzData_1 = require("../data/BbwzData");
var BbwzDriver_1 = require("../BbwzDriver");
var BbwzGameEvent_1 = require("../data/BbwzGameEvent");
//定义各个阶段播放时间,根据各个游戏调整
var time_wait_next = 0.5; //等待下一局时间
var time_self_win = 0; //播放个人结算时间
var time_fly_word = 1; //播放飘字动画时间
var time_fly_bet = 1.5; //播放飞筹码时间
var time_win_area = 1; //赌桌赢的区域闪烁动画
var time_area_reward = 0.1; // 显示区域总输赢倍数   预留时间给牌型播放声音
var time_one_flip = 1; // 翻一家0.5
var time_dispath_hand = 0.5; // 分发手牌
var time_one_deal = 0.5; //发2组牌
var delay_one_deal = 0.2; // 发牌间隔
/**
 * e3  开奖消息 d1 中奖 d2
 */
var BbwzRewardHandler = /** @class */ (function (_super) {
    __extends(BbwzRewardHandler, _super);
    function BbwzRewardHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzRewardHandler.prototype.handleData = function (data) {
        var para = data._para;
        //分解协议
        //修正时间
        var currTime = Date.now();
        var jiangeTime = currTime - data._receiveTime;
        data._para.time -= jiangeTime;
        data._para.time /= 1000;
        var totalSec = data._para.time;
        var dataStr = JSON.stringify(data);
        var msgArr = [];
        //等待
        totalSec -= time_wait_next;
        var msg = JSON.parse(dataStr);
        msg._cmd = BbwzConstDefine_1.default.GameWait_WaitNext;
        msg._needPlay = totalSec >= 0;
        msg.time = time_wait_next;
        msgArr.unshift(msg);
        //个人结算 
        totalSec -= time_self_win;
        var msg = JSON.parse(dataStr);
        msg._cmd = BbwzConstDefine_1.default.GameWait_GeRenJieSuan;
        msg._needPlay = totalSec >= 0;
        msg.time = time_self_win;
        msgArr.unshift(msg);
        //飘字
        totalSec -= time_fly_word;
        var msg = JSON.parse(dataStr);
        msg._cmd = BbwzConstDefine_1.default.GameWait_FlyWord;
        msg._needPlay = totalSec >= 0;
        msg.time = time_fly_word;
        msgArr.unshift(msg);
        //飞筹码
        totalSec -= time_fly_bet;
        var msg = JSON.parse(dataStr);
        msg._cmd = BbwzConstDefine_1.default.GameWait_FeiChouMa;
        msg._needPlay = totalSec >= 0;
        msg.time = time_fly_bet;
        msgArr.unshift(msg);
        //赢得区域闪烁
        totalSec -= time_win_area;
        var msg = JSON.parse(dataStr);
        msg._cmd = BbwzConstDefine_1.default.GameWait_WinShine;
        msg._needPlay = totalSec >= 0;
        msg.time = time_win_area;
        msgArr.unshift(msg);
        // 一个个翻手牌
        for (var i = BbwzConstDefine_1.default.GROUP_DEFINE.length - 1; i >= 0; i--) {
            // 显示区域结算
            if (i != 0 && i != 1) {
                totalSec -= time_area_reward;
                var msg2 = JSON.parse(dataStr);
                msg2._cmd = BbwzConstDefine_1.default.GameWait_AreaResult;
                msg2._needPlay = totalSec >= 0;
                msg2.time = time_area_reward;
                msg2.group = BbwzConstDefine_1.default.GROUP_DEFINE.slice(i, i + 1);
                msgArr.unshift(msg2);
            }
            totalSec -= time_one_flip;
            var msg = JSON.parse(dataStr);
            msg._cmd = BbwzConstDefine_1.default.GameWait_FanCard;
            msg._needPlay = totalSec >= 0;
            msg.time = time_one_flip;
            msg.group = BbwzConstDefine_1.default.GROUP_DEFINE.slice(i, i + 1);
            msgArr.unshift(msg);
        }
        // 翻牌前置 分发手牌
        totalSec -= time_dispath_hand;
        var msg = JSON.parse(dataStr);
        msg._cmd = BbwzConstDefine_1.default.GameWait_Dispatch;
        msg._needPlay = totalSec >= 0;
        msg.time = time_dispath_hand;
        msgArr.unshift(msg);
        // 两个两个发牌
        var count = 0;
        var total = BbwzConstDefine_1.default.GROUP_DEFINE.length / 2 - 1;
        var index = total; // 顺序计数 庄0 福1 禄2 寿3
        totalSec -= time_one_deal;
        for (var i = BbwzConstDefine_1.default.GROUP_DEFINE.length - 1; i >= 0; i--) {
            count++;
            if (count == 2) {
                count = 0;
                var msg_1 = JSON.parse(dataStr);
                msg_1._cmd = BbwzConstDefine_1.default.GameWait_DealCard;
                totalSec -= delay_one_deal;
                msg_1._needPlay = totalSec >= 0;
                msg_1.time = index == total ? time_one_deal : delay_one_deal; // 最后一组翻牌(寿) 加锁时长为发牌时长
                msg_1.group = BbwzConstDefine_1.default.GROUP_DEFINE.slice(i, i + 2); // 每次发两个 依次为庄2-福2-禄2-寿2
                msgArr.unshift(msg_1);
                index--;
            }
        }
        Game.Event.event(Game.EVENT_UNSHFIT_MSGLIST, msgArr);
        //=============================================================
        //设置牌桌数据
        BbwzData_1.default.instance.setTableBetData(data._para);
        //更新本次续压数据
        BbwzData_1.default.instance.updateCurData(data._para.my_bet);
        var award = data._para.award;
        //保存获胜的区域
        BbwzData_1.default.instance.setWinAreaWinIndexs(award.hit);
        //保存盈利数据
        BbwzData_1.default.instance.setWinPlayerData(data._para);
        var allBets = data._para.table_bet;
        for (var keyName in allBets) {
            BbwzData_1.default.instance.gameTableBetInfo[keyName].totalBetNum = allBets[keyName];
        }
        //更新在线玩家数量
        BbwzData_1.default.instance.onlinePlayer = data._para.p_count;
        BbwzDriver_1.default.instance.gameUI.updateOnlinePlayer(data._para.p_count);
        //如果是中途进入需要显示好牌
        // BbwzDriver.instance.gameUI.compareRootView.dealAllGroupPokers(false);
        //更新下注显示
        BbwzDriver_1.default.instance.gameUI.betAreaRootView.updateSelfBetLabel(BbwzData_1.default.instance.gameTableBetInfo);
        BbwzDriver_1.default.instance.gameUI.betAreaRootView.updateTotalBetLabel(BbwzData_1.default.instance.gameTableBetInfo);
        // 更新下注底部筹码栏
        BbwzDriver_1.default.instance.gameUI.updateBetSelectButton();
    };
    return BbwzRewardHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzRewardHandler = BbwzRewardHandler;
/**
 * e3-1 开奖-发牌
 */
var BbwzRewardFapaiHandler = /** @class */ (function (_super) {
    __extends(BbwzRewardFapaiHandler, _super);
    function BbwzRewardFapaiHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzRewardFapaiHandler.prototype.handleData = function (data) {
        if (data._needPlay) {
            Game.Event.event(Game.EVENT_ADDTIMELOCK, "BetRewardFapai", data.time);
            BbwzDriver_1.default.instance.gameUI.dealCompareReward(data.group, true);
        }
        else {
            BbwzDriver_1.default.instance.gameUI.dealCompareReward(data.group, false);
        }
        //设置游戏状态
        BbwzData_1.default.instance.gameState = BbwzConstDefine_1.BbwzGameState.Reward;
        BbwzDriver_1.default.instance.gameUI.stateView.runState(BbwzData_1.default.instance.gameState, false);
    };
    return BbwzRewardFapaiHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzRewardFapaiHandler = BbwzRewardFapaiHandler;
/**
 * e3-1-0 开奖-分发牌种
 */
var BbwzRewardDispatchHandler = /** @class */ (function (_super) {
    __extends(BbwzRewardDispatchHandler, _super);
    function BbwzRewardDispatchHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzRewardDispatchHandler.prototype.handleData = function (data) {
        if (data._needPlay) {
            Game.Event.event(Game.EVENT_ADDTIMELOCK, "RewardDispatch", data.time);
            BbwzDriver_1.default.instance.gameUI.dispatchCompareReward(true, data._para.award.point);
        }
        else {
            BbwzDriver_1.default.instance.gameUI.dispatchCompareReward(false, data._para.award.point);
        }
        //设置游戏状态
        BbwzData_1.default.instance.gameState = BbwzConstDefine_1.BbwzGameState.Reward;
        BbwzDriver_1.default.instance.gameUI.stateView.runState(BbwzData_1.default.instance.gameState, false);
    };
    return BbwzRewardDispatchHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzRewardDispatchHandler = BbwzRewardDispatchHandler;
/**
 * e3-1-1 开奖-翻第X手牌
 */
var BbwzRewardFanCardHandler = /** @class */ (function (_super) {
    __extends(BbwzRewardFanCardHandler, _super);
    function BbwzRewardFanCardHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzRewardFanCardHandler.prototype.handleData = function (data) {
        if (data._needPlay) {
            Game.Event.event(Game.EVENT_ADDTIMELOCK, "RewardFanpai", data.time);
            BbwzDriver_1.default.instance.gameUI.showCompareReward(data.group, data._para.award.point, true);
        }
        else {
            BbwzDriver_1.default.instance.gameUI.showCompareReward(data.group, data._para.award.point, false);
        }
    };
    return BbwzRewardFanCardHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzRewardFanCardHandler = BbwzRewardFanCardHandler;
/**
 * e3-1-3 开奖-显示区域输赢倍数
 */
var BbwzRewardAreaResultHandler = /** @class */ (function (_super) {
    __extends(BbwzRewardAreaResultHandler, _super);
    function BbwzRewardAreaResultHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzRewardAreaResultHandler.prototype.handleData = function (data) {
        if (data._needPlay) {
            Game.Event.event(Game.EVENT_ADDTIMELOCK, "RewardAreaResult", data.time);
        }
        var arr = data.group || [];
        arr.forEach(function (areaName) {
            BbwzDriver_1.default.instance.gameUI.rewardAreaView.showAreaResult(areaName, data._para.award.point, data._para.my_bet);
            BbwzDriver_1.default.instance.gameUI.betAreaRootView.showAreaTrend(areaName, __spreadArrays(BbwzData_1.default.instance.historyDataArr, [data._para.award]), data._needPlay); // 生成临时总数据, 避免重复添加
        });
    };
    return BbwzRewardAreaResultHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzRewardAreaResultHandler = BbwzRewardAreaResultHandler;
/**
 * e3-2 开奖-赢的区域闪烁动画
 */
var BbwzRewardWinShineHandler = /** @class */ (function (_super) {
    __extends(BbwzRewardWinShineHandler, _super);
    function BbwzRewardWinShineHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzRewardWinShineHandler.prototype.handleData = function (data) {
        if (data._needPlay) {
            Game.Event.event(Game.EVENT_ADDTIMELOCK, "RewardWinShine", data.time);
            if (data._para && data._para.award)
                BbwzDriver_1.default.instance.gameUI.betAreaRootView.showAreaWinEffect(data._para.award.hit);
        }
        //新增历史记录
        var obj = data._para.award;
        BbwzData_1.default.instance.addHistory(obj);
        Game.Event.event(BbwzGameEvent_1.default.onHistoryDataRes); // 添加走势数据并通知更新
    };
    return BbwzRewardWinShineHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzRewardWinShineHandler = BbwzRewardWinShineHandler;
/**
 * e3-3 开奖-飞筹码
 */
var BbwzRewardFeiChouMaHandler = /** @class */ (function (_super) {
    __extends(BbwzRewardFeiChouMaHandler, _super);
    function BbwzRewardFeiChouMaHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzRewardFeiChouMaHandler.prototype.handleData = function (data) {
        if (data._needPlay) {
            Game.Event.event(Game.EVENT_ADDTIMELOCK, "RewardFeichouma", data.time);
            BbwzDriver_1.default.instance.chipManager.rewardFlyChips();
        }
        else {
            BbwzDriver_1.default.instance.chipManager.clear();
        }
    };
    return BbwzRewardFeiChouMaHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzRewardFeiChouMaHandler = BbwzRewardFeiChouMaHandler;
/**
 * e3-4 开奖-飘字
 */
var BbwzRewardFlyWordHandler = /** @class */ (function (_super) {
    __extends(BbwzRewardFlyWordHandler, _super);
    function BbwzRewardFlyWordHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzRewardFlyWordHandler.prototype.handleData = function (data) {
        if (data._needPlay) {
            Game.Event.event(Game.EVENT_ADDTIMELOCK, "RewardFlyWord", data.time);
            BbwzDriver_1.default.instance.gameUI.showPlayerRewardLbl(BbwzData_1.default.instance.playerWinData);
            if (data._para.big_winner) {
                BbwzDriver_1.default.instance.gameUI.bigWinnerView.active = true;
                BbwzDriver_1.default.instance.gameUI.bigWinnerView.updateUI(data._para.big_winner);
            }
        }
    };
    return BbwzRewardFlyWordHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzRewardFlyWordHandler = BbwzRewardFlyWordHandler;
/**
 * e3-5 开奖-个人结算
 */
var BbwzRewardGeRenJieSuanHandler = /** @class */ (function (_super) {
    __extends(BbwzRewardGeRenJieSuanHandler, _super);
    function BbwzRewardGeRenJieSuanHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzRewardGeRenJieSuanHandler.prototype.handleData = function (data) {
        if (data._needPlay) {
            Game.Event.event(Game.EVENT_ADDTIMELOCK, "RewardGeRenJieSuan", data.time);
        }
        Global.PlayerData.point = BbwzData_1.default.instance.playerWinData.point;
        BbwzDriver_1.default.instance.gameUI.onSelfPointRefresh(Global.PlayerData.point);
    };
    return BbwzRewardGeRenJieSuanHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzRewardGeRenJieSuanHandler = BbwzRewardGeRenJieSuanHandler;
/**
 * e3-6 开奖-等待下一局
 */
var BbwzRewardWaitNextHandler = /** @class */ (function (_super) {
    __extends(BbwzRewardWaitNextHandler, _super);
    function BbwzRewardWaitNextHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzRewardWaitNextHandler.prototype.handleData = function (data) {
        if (data._needPlay) {
            //设置状态
            var currTime = Date.now();
            var jiangeTime = currTime - data._receiveTime;
            BbwzData_1.default.instance.remainTime = Math.max(0.5, data._para.time - jiangeTime / 1000);
        }
        BbwzDriver_1.default.instance.gameUI.taskManager.reqGetCommisionInfo();
    };
    return BbwzRewardWaitNextHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzRewardWaitNextHandler = BbwzRewardWaitNextHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcaGFuZGxlclxcQmJ3elJld2FyZEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRUFBNEQ7QUFDNUQsMkRBQXlFO0FBQ3pFLDZDQUF3QztBQUN4Qyw0Q0FBdUM7QUFDdkMsdURBQWtEO0FBRWxELHFCQUFxQjtBQUNyQixJQUFNLGNBQWMsR0FBRyxHQUFHLENBQUMsQ0FBSyxTQUFTO0FBQ3pDLElBQU0sYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFRLFVBQVU7QUFDMUMsSUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQU0sVUFBVTtBQUN4QyxJQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsQ0FBTyxTQUFTO0FBQ3pDLElBQU0sYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFNLFlBQVk7QUFDMUMsSUFBTSxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsQ0FBRywwQkFBMEI7QUFDMUQsSUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQVEsU0FBUztBQUN6QyxJQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxDQUFNLE9BQU87QUFDM0MsSUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLENBQU0sTUFBTTtBQUN0QyxJQUFNLGNBQWMsR0FBRyxHQUFHLENBQUMsQ0FBSyxPQUFPO0FBRXZDOztHQUVHO0FBQ0g7SUFBdUMscUNBQXFCO0lBQTVEOztJQXVJQSxDQUFDO0lBcklHLHNDQUFVLEdBQVYsVUFBVyxJQUFJO1FBQ1gsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixNQUFNO1FBQ04sTUFBTTtRQUNOLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLFVBQVUsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM5QyxJQUFJLENBQUMsS0FBSyxDQUFDLElB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LENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUNMLG9DQUFDO0FBQUQsQ0FSQSxBQVFDLENBUmtELCtCQUFxQixHQVF2RTtBQVJZLHNFQUE2QjtBQVUxQzs7R0FFRztBQUNIO0lBQStDLDZDQUFxQjtJQUFwRTs7SUFXQSxDQUFDO0lBVkcsOENBQVUsR0FBVixVQUFXLElBQUk7UUFDWCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsTUFBTTtZQUNOLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUMxQixJQUFJLFVBQVUsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM5QyxrQkFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQ3JGO1FBRUQsb0JBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQ2pFLENBQUM7SUFDTCxnQ0FBQztBQUFELENBWEEsQUFXQyxDQVg4QywrQkFBcUIsR0FXbkU7QUFYWSw4REFBeUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmJ3elNvY2tldEJhc2VIYW5kbGVyIGZyb20gXCIuL0Jid3pTb2NrZXRCYXNlSGFuZGxlclwiO1xyXG5pbXBvcnQgQmJ3ekNvbnN0RGVmaW5lLCB7IEJid3pHYW1lU3RhdGUgfSBmcm9tIFwiLi4vZGF0YS9CYnd6Q29uc3REZWZpbmVcIjtcclxuaW1wb3J0IEJid3pEYXRhIGZyb20gXCIuLi9kYXRhL0Jid3pEYXRhXCI7XHJcbmltcG9ydCBCYnd6RHJpdmVyIGZyb20gXCIuLi9CYnd6RHJpdmVyXCI7XHJcbmltcG9ydCBCYnd6R2FtZUV2ZW50IGZyb20gXCIuLi9kYXRhL0Jid3pHYW1lRXZlbnRcIjtcclxuXHJcbi8v5a6a5LmJ5ZCE5Liq6Zi25q615pKt5pS+5pe26Ze0LOagueaNruWQhOS4qua4uOaIj+iwg+aVtFxyXG5jb25zdCB0aW1lX3dhaXRfbmV4dCA9IDAuNTsgICAgIC8v562J5b6F5LiL5LiA5bGA5pe26Ze0XHJcbmNvbnN0IHRpbWVfc2VsZl93aW4gPSAwOyAgICAgICAgLy/mkq3mlL7kuKrkurrnu5Pnrpfml7bpl7RcclxuY29uc3QgdGltZV9mbHlfd29yZCA9IDE7ICAgICAgLy/mkq3mlL7po5jlrZfliqjnlLvml7bpl7RcclxuY29uc3QgdGltZV9mbHlfYmV0ID0gMS41OyAgICAgICAvL+aSreaUvumjnuetueeggeaXtumXtFxyXG5jb25zdCB0aW1lX3dpbl9hcmVhID0gMTsgICAgICAvL+i1jOahjOi1oueahOWMuuWfn+mXqueDgeWKqOeUu1xyXG5jb25zdCB0aW1lX2FyZWFfcmV3YXJkID0gMC4xOyAgIC8vIOaYvuekuuWMuuWfn+aAu+i+k+i1ouWAjeaVsCAgIOmihOeVmeaXtumXtOe7meeJjOWei+aSreaUvuWjsOmfs1xyXG5jb25zdCB0aW1lX29uZV9mbGlwID0gMTsgICAgICAgIC8vIOe/u+S4gOWutjAuNVxyXG5jb25zdCB0aW1lX2Rpc3BhdGhfaGFuZCA9IDAuNTsgICAgICAvLyDliIblj5HmiYvniYxcclxuY29uc3QgdGltZV9vbmVfZGVhbCA9IDAuNTsgICAgICAvL+WPkTLnu4TniYxcclxuY29uc3QgZGVsYXlfb25lX2RlYWwgPSAwLjI7ICAgICAvLyDlj5HniYzpl7TpmpRcclxuXHJcbi8qKlxyXG4gKiBlMyAg5byA5aWW5raI5oGvIGQxIOS4reWlliBkMlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJid3pSZXdhcmRIYW5kbGVyIGV4dGVuZHMgQmJ3elNvY2tldEJhc2VIYW5kbGVyIHtcclxuXHJcbiAgICBoYW5kbGVEYXRhKGRhdGEpIHtcclxuICAgICAgICBsZXQgcGFyYSA9IGRhdGEuX3BhcmE7XHJcbiAgICAgICAgLy/liIbop6PljY/orq5cclxuICAgICAgICAvL+S/ruato+aXtumXtFxyXG4gICAgICAgIHZhciBjdXJyVGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdmFyIGppYW5nZVRpbWUgPSBjdXJyVGltZSAtIGRhdGEuX3JlY2VpdmVUaW1lO1xyXG4gICAgICAgIGRhdGEuX3BhcmEudGltZSAtPSBqaWFuZ2VUaW1lO1xyXG4gICAgICAgIGRhdGEuX3BhcmEudGltZSAvPSAxMDAwO1xyXG4gICAgICAgIHZhciB0b3RhbFNlYyA9IGRhdGEuX3BhcmEudGltZTtcclxuICAgICAgICB2YXIgZGF0YVN0ciA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgIHZhciBtc2dBcnIgPSBbXTtcclxuXHJcbiAgICAgICAgLy/nrYnlvoVcclxuICAgICAgICB0b3RhbFNlYyAtPSB0aW1lX3dhaXRfbmV4dDtcclxuICAgICAgICB2YXIgbXNnID0gSlNPTi5wYXJzZShkYXRhU3RyKTtcclxuICAgICAgICBtc2cuX2NtZCA9IEJid3pDb25zdERlZmluZS5HYW1lV2FpdF9XYWl0TmV4dDtcclxuICAgICAgICBtc2cuX25lZWRQbGF5ID0gdG90YWxTZWMgPj0gMDtcclxuICAgICAgICBtc2cudGltZSA9IHRpbWVfd2FpdF9uZXh0O1xyXG4gICAgICAgIG1zZ0Fyci51bnNoaWZ0KG1zZyk7XHJcblxyXG4gICAgICAgIC8v5Liq5Lq657uT566XIFxyXG4gICAgICAgIHRvdGFsU2VjIC09IHRpbWVfc2VsZl93aW47XHJcbiAgICAgICAgdmFyIG1zZyA9IEpTT04ucGFyc2UoZGF0YVN0cik7XHJcbiAgICAgICAgbXNnLl9jbWQgPSBCYnd6Q29uc3REZWZpbmUuR2FtZVdhaXRfR2VSZW5KaWVTdWFuO1xyXG4gICAgICAgIG1zZy5fbmVlZFBsYXkgPSB0b3RhbFNlYyA+PSAwO1xyXG4gICAgICAgIG1zZy50aW1lID0gdGltZV9zZWxmX3dpbjtcclxuICAgICAgICBtc2dBcnIudW5zaGlmdChtc2cpO1xyXG5cclxuICAgICAgICAvL+mjmOWtl1xyXG4gICAgICAgIHRvdGFsU2VjIC09IHRpbWVfZmx5X3dvcmQ7XHJcbiAgICAgICAgdmFyIG1zZyA9IEpTT04ucGFyc2UoZGF0YVN0cik7XHJcbiAgICAgICAgbXNnLl9jbWQgPSBCYnd6Q29uc3REZWZpbmUuR2FtZVdhaXRfRmx5V29yZDtcclxuICAgICAgICBtc2cuX25lZWRQbGF5ID0gdG90YWxTZWMgPj0gMDtcclxuICAgICAgICBtc2cudGltZSA9IHRpbWVfZmx5X3dvcmQ7XHJcbiAgICAgICAgbXNnQXJyLnVuc2hpZnQobXNnKTtcclxuXHJcbiAgICAgICAgLy/po57nrbnnoIFcclxuICAgICAgICB0b3RhbFNlYyAtPSB0aW1lX2ZseV9iZXQ7XHJcbiAgICAgICAgdmFyIG1zZyA9IEpTT04ucGFyc2UoZGF0YVN0cik7XHJcbiAgICAgICAgbXNnLl9jbWQgPSBCYnd6Q29uc3REZWZpbmUuR2FtZVdhaXRfRmVpQ2hvdU1hO1xyXG4gICAgICAgIG1zZy5fbmVlZFBsYXkgPSB0b3RhbFNlYyA+PSAwO1xyXG4gICAgICAgIG1zZy50aW1lID0gdGltZV9mbHlfYmV0O1xyXG4gICAgICAgIG1zZ0Fyci51bnNoaWZ0KG1zZyk7XHJcblxyXG4gICAgICAgIC8v6LWi5b6X5Yy65Z+f6Zeq54OBXHJcbiAgICAgICAgdG90YWxTZWMgLT0gdGltZV93aW5fYXJlYTtcclxuICAgICAgICB2YXIgbXNnID0gSlNPTi5wYXJzZShkYXRhU3RyKTtcclxuICAgICAgICBtc2cuX2NtZCA9IEJid3pDb25zdERlZmluZS5HYW1lV2FpdF9XaW5TaGluZTtcclxuICAgICAgICBtc2cuX25lZWRQbGF5ID0gdG90YWxTZWMgPj0gMDtcclxuICAgICAgICBtc2cudGltZSA9IHRpbWVfd2luX2FyZWE7XHJcbiAgICAgICAgbXNnQXJyLnVuc2hpZnQobXNnKTtcclxuXHJcbiAgICAgICAgLy8g5LiA5Liq5Liq57+75omL54mMXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IEJid3pDb25zdERlZmluZS5HUk9VUF9ERUZJTkUubGVuZ3RoICAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIC8vIOaYvuekuuWMuuWfn+e7k+eul1xyXG4gICAgICAgICAgICBpZiAoaSAhPSAwICYmIGkgIT0gMSl7XHJcbiAgICAgICAgICAgICAgICB0b3RhbFNlYyAtPSB0aW1lX2FyZWFfcmV3YXJkO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1zZzIgPSBKU09OLnBhcnNlKGRhdGFTdHIpO1xyXG4gICAgICAgICAgICAgICAgbXNnMi5fY21kID0gQmJ3ekNvbnN0RGVmaW5lLkdhbWVXYWl0X0FyZWFSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICBtc2cyLl9uZWVkUGxheSA9IHRvdGFsU2VjID49IDA7XHJcbiAgICAgICAgICAgICAgICBtc2cyLnRpbWUgPSB0aW1lX2FyZWFfcmV3YXJkO1xyXG4gICAgICAgICAgICAgICAgbXNnMi5ncm91cCA9IEJid3pDb25zdERlZmluZS5HUk9VUF9ERUZJTkUuc2xpY2UoaSwgaSArIDEpO1xyXG4gICAgICAgICAgICAgICAgbXNnQXJyLnVuc2hpZnQobXNnMik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRvdGFsU2VjIC09IHRpbWVfb25lX2ZsaXA7XHJcbiAgICAgICAgICAgIHZhciBtc2cgPSBKU09OLnBhcnNlKGRhdGFTdHIpO1xyXG4gICAgICAgICAgICBtc2cuX2NtZCA9IEJid3pDb25zdERlZmluZS5HYW1lV2FpdF9GYW5DYXJkO1xyXG4gICAgICAgICAgICBtc2cuX25lZWRQbGF5ID0gdG90YWxTZWMgPj0gMDtcclxuICAgICAgICAgICAgbXNnLnRpbWUgPSB0aW1lX29uZV9mbGlwO1xyXG4gICAgICAgICAgICBtc2cuZ3JvdXAgPSBCYnd6Q29uc3REZWZpbmUuR1JPVVBfREVGSU5FLnNsaWNlKGksIGkgKyAxKTtcclxuICAgICAgICAgICAgbXNnQXJyLnVuc2hpZnQobXNnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOe/u+eJjOWJjee9riDliIblj5HmiYvniYxcclxuICAgICAgICB0b3RhbFNlYyAtPSB0aW1lX2Rpc3BhdGhfaGFuZDtcclxuICAgICAgICB2YXIgbXNnID0gSlNPTi5wYXJzZShkYXRhU3RyKTtcclxuICAgICAgICBtc2cuX2NtZCA9IEJid3pDb25zdERlZmluZS5HYW1lV2FpdF9EaXNwYXRjaDtcclxuICAgICAgICBtc2cuX25lZWRQbGF5ID0gdG90YWxTZWMgPj0gMDtcclxuICAgICAgICBtc2cudGltZSA9IHRpbWVfZGlzcGF0aF9oYW5kO1xyXG4gICAgICAgIG1zZ0Fyci51bnNoaWZ0KG1zZyk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIOS4pOS4quS4pOS4quWPkeeJjFxyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgbGV0IHRvdGFsID0gQmJ3ekNvbnN0RGVmaW5lLkdST1VQX0RFRklORS5sZW5ndGggLzIgLTE7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdG90YWw7ICAgICAvLyDpobrluo/orqHmlbAg5bqEMCDnpo8xIOemhDIg5a+/M1xyXG4gICAgICAgIHRvdGFsU2VjIC09IHRpbWVfb25lX2RlYWw7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IEJid3pDb25zdERlZmluZS5HUk9VUF9ERUZJTkUubGVuZ3RoICAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGNvdW50ICsrO1xyXG4gICAgICAgICAgICBpZiAoY291bnQgPT0gMil7XHJcbiAgICAgICAgICAgICAgICBjb3VudCA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG1zZyA9IEpTT04ucGFyc2UoZGF0YVN0cik7XHJcbiAgICAgICAgICAgICAgICBtc2cuX2NtZCA9IEJid3pDb25zdERlZmluZS5HYW1lV2FpdF9EZWFsQ2FyZDtcclxuICAgICAgICAgICAgICAgIHRvdGFsU2VjIC09IGRlbGF5X29uZV9kZWFsO1xyXG4gICAgICAgICAgICAgICAgbXNnLl9uZWVkUGxheSA9IHRvdGFsU2VjID49IDA7XHJcbiAgICAgICAgICAgICAgICBtc2cudGltZSA9IGluZGV4ID09IHRvdGFsID8gdGltZV9vbmVfZGVhbCA6IGRlbGF5X29uZV9kZWFsOyAgICAgICAgICAgICAgLy8g5pyA5ZCO5LiA57uE57+754mMKOWvvykg5Yqg6ZSB5pe26ZW/5Li65Y+R54mM5pe26ZW/XHJcbiAgICAgICAgICAgICAgICBtc2cuZ3JvdXAgPSBCYnd6Q29uc3REZWZpbmUuR1JPVVBfREVGSU5FLnNsaWNlKGksIGkgKyAyKTsgICAgICAgLy8g5q+P5qyh5Y+R5Lik5LiqIOS+neasoeS4uuW6hDIt56aPMi3npoQyLeWvvzJcclxuICAgICAgICAgICAgICAgIG1zZ0Fyci51bnNoaWZ0KG1zZyk7XHJcbiAgICAgICAgICAgICAgICBpbmRleCAtLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX1VOU0hGSVRfTVNHTElTVCwgbXNnQXJyKTtcclxuXHJcbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgLy/orr7nva7niYzmoYzmlbDmja5cclxuICAgICAgICBCYnd6RGF0YS5pbnN0YW5jZS5zZXRUYWJsZUJldERhdGEoZGF0YS5fcGFyYSk7XHJcbiAgICAgICAgLy/mm7TmlrDmnKzmrKHnu63ljovmlbDmja5cclxuICAgICAgICBCYnd6RGF0YS5pbnN0YW5jZS51cGRhdGVDdXJEYXRhKGRhdGEuX3BhcmEubXlfYmV0KTtcclxuXHJcbiAgICAgICAgdmFyIGF3YXJkID0gZGF0YS5fcGFyYS5hd2FyZDtcclxuICAgICAgICAvL+S/neWtmOiOt+iDnOeahOWMuuWfn1xyXG4gICAgICAgIEJid3pEYXRhLmluc3RhbmNlLnNldFdpbkFyZWFXaW5JbmRleHMoYXdhcmQuaGl0KTtcclxuICAgICAgICAvL+S/neWtmOebiOWIqeaVsOaNrlxyXG4gICAgICAgIEJid3pEYXRhLmluc3RhbmNlLnNldFdpblBsYXllckRhdGEoZGF0YS5fcGFyYSk7XHJcbiAgICAgICAgbGV0IGFsbEJldHMgPSBkYXRhLl9wYXJhLnRhYmxlX2JldDtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleU5hbWUgaW4gYWxsQmV0cykge1xyXG4gICAgICAgICAgICBCYnd6RGF0YS5pbnN0YW5jZS5nYW1lVGFibGVCZXRJbmZvW2tleU5hbWVdLnRvdGFsQmV0TnVtID0gYWxsQmV0c1trZXlOYW1lXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5pu05paw5Zyo57q/546p5a625pWw6YePXHJcbiAgICAgICAgQmJ3ekRhdGEuaW5zdGFuY2Uub25saW5lUGxheWVyID0gZGF0YS5fcGFyYS5wX2NvdW50O1xyXG4gICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UuZ2FtZVVJLnVwZGF0ZU9ubGluZVBsYXllcihkYXRhLl9wYXJhLnBfY291bnQpO1xyXG4gICAgICAgIC8v5aaC5p6c5piv5Lit6YCU6L+b5YWl6ZyA6KaB5pi+56S65aW954mMXHJcbiAgICAgICAgLy8gQmJ3ekRyaXZlci5pbnN0YW5jZS5nYW1lVUkuY29tcGFyZVJvb3RWaWV3LmRlYWxBbGxHcm91cFBva2VycyhmYWxzZSk7XHJcbiAgICAgICAgLy/mm7TmlrDkuIvms6jmmL7npLpcclxuICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLmdhbWVVSS5iZXRBcmVhUm9vdFZpZXcudXBkYXRlU2VsZkJldExhYmVsKEJid3pEYXRhLmluc3RhbmNlLmdhbWVUYWJsZUJldEluZm8pO1xyXG4gICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UuZ2FtZVVJLmJldEFyZWFSb290Vmlldy51cGRhdGVUb3RhbEJldExhYmVsKEJid3pEYXRhLmluc3RhbmNlLmdhbWVUYWJsZUJldEluZm8pO1xyXG4gICAgICAgIC8vIOabtOaWsOS4i+azqOW6lemDqOetueeggeagj1xyXG4gICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UuZ2FtZVVJLnVwZGF0ZUJldFNlbGVjdEJ1dHRvbigpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogZTMtMSDlvIDlpZYt5Y+R54mMXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmJ3elJld2FyZEZhcGFpSGFuZGxlciBleHRlbmRzIEJid3pTb2NrZXRCYXNlSGFuZGxlciB7XHJcbiAgICBoYW5kbGVEYXRhKGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YS5fbmVlZFBsYXkpIHtcclxuICAgICAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX0FERFRJTUVMT0NLLCBcIkJldFJld2FyZEZhcGFpXCIsIGRhdGEudGltZSk7XHJcbiAgICAgICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UuZ2FtZVVJLmRlYWxDb21wYXJlUmV3YXJkKGRhdGEuZ3JvdXAsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLmdhbWVVSS5kZWFsQ29tcGFyZVJld2FyZChkYXRhLmdyb3VwLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+iuvue9rua4uOaIj+eKtuaAgVxyXG4gICAgICAgIEJid3pEYXRhLmluc3RhbmNlLmdhbWVTdGF0ZSA9IEJid3pHYW1lU3RhdGUuUmV3YXJkO1xyXG4gICAgICAgIFxyXG4gICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UuZ2FtZVVJLnN0YXRlVmlldy5ydW5TdGF0ZShCYnd6RGF0YS5pbnN0YW5jZS5nYW1lU3RhdGUsIGZhbHNlKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIGUzLTEtMCDlvIDlpZYt5YiG5Y+R54mM56eNXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmJ3elJld2FyZERpc3BhdGNoSGFuZGxlciBleHRlbmRzIEJid3pTb2NrZXRCYXNlSGFuZGxlciB7XHJcbiAgICBoYW5kbGVEYXRhKGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YS5fbmVlZFBsYXkpIHtcclxuICAgICAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX0FERFRJTUVMT0NLLCBcIlJld2FyZERpc3BhdGNoXCIsIGRhdGEudGltZSk7XHJcbiAgICAgICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UuZ2FtZVVJLmRpc3BhdGNoQ29tcGFyZVJld2FyZCh0cnVlLCBkYXRhLl9wYXJhLmF3YXJkLnBvaW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgQmJ3ekRyaXZlci5pbnN0YW5jZS5nYW1lVUkuZGlzcGF0Y2hDb21wYXJlUmV3YXJkKGZhbHNlLCBkYXRhLl9wYXJhLmF3YXJkLnBvaW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/orr7nva7muLjmiI/nirbmgIFcclxuICAgICAgICBCYnd6RGF0YS5pbnN0YW5jZS5nYW1lU3RhdGUgPSBCYnd6R2FtZVN0YXRlLlJld2FyZDtcclxuICAgICAgICBcclxuICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLmdhbWVVSS5zdGF0ZVZpZXcucnVuU3RhdGUoQmJ3ekRhdGEuaW5zdGFuY2UuZ2FtZVN0YXRlLCBmYWxzZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogZTMtMS0xIOW8gOWlli3nv7vnrKxY5omL54mMXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmJ3elJld2FyZEZhbkNhcmRIYW5kbGVyIGV4dGVuZHMgQmJ3elNvY2tldEJhc2VIYW5kbGVyIHtcclxuICAgIGhhbmRsZURhdGEoZGF0YSkge1xyXG4gICAgICAgIGlmIChkYXRhLl9uZWVkUGxheSkge1xyXG4gICAgICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfQUREVElNRUxPQ0ssIFwiUmV3YXJkRmFucGFpXCIsIGRhdGEudGltZSk7XHJcbiAgICAgICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UuZ2FtZVVJLnNob3dDb21wYXJlUmV3YXJkKGRhdGEuZ3JvdXAsIGRhdGEuX3BhcmEuYXdhcmQucG9pbnQsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLmdhbWVVSS5zaG93Q29tcGFyZVJld2FyZChkYXRhLmdyb3VwLCBkYXRhLl9wYXJhLmF3YXJkLnBvaW50LCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogZTMtMS0zIOW8gOWlli3mmL7npLrljLrln5/ovpPotaLlgI3mlbBcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCYnd6UmV3YXJkQXJlYVJlc3VsdEhhbmRsZXIgZXh0ZW5kcyBCYnd6U29ja2V0QmFzZUhhbmRsZXIge1xyXG4gICAgaGFuZGxlRGF0YShkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGEuX25lZWRQbGF5KSB7XHJcbiAgICAgICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9BRERUSU1FTE9DSywgXCJSZXdhcmRBcmVhUmVzdWx0XCIsIGRhdGEudGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhcnIgPSBkYXRhLmdyb3VwIHx8IFtdO1xyXG4gICAgICAgIGFyci5mb3JFYWNoKGFyZWFOYW1lID0+IHtcclxuICAgICAgICAgICAgQmJ3ekRyaXZlci5pbnN0YW5jZS5nYW1lVUkucmV3YXJkQXJlYVZpZXcuc2hvd0FyZWFSZXN1bHQoYXJlYU5hbWUsIGRhdGEuX3BhcmEuYXdhcmQucG9pbnQsIGRhdGEuX3BhcmEubXlfYmV0KTtcclxuICAgICAgICAgICAgQmJ3ekRyaXZlci5pbnN0YW5jZS5nYW1lVUkuYmV0QXJlYVJvb3RWaWV3LnNob3dBcmVhVHJlbmQoYXJlYU5hbWUsIFsuLi5CYnd6RGF0YS5pbnN0YW5jZS5oaXN0b3J5RGF0YUFyciwgZGF0YS5fcGFyYS5hd2FyZF0sIGRhdGEuX25lZWRQbGF5KTsgIC8vIOeUn+aIkOS4tOaXtuaAu+aVsOaNriwg6YG/5YWN6YeN5aSN5re75YqgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBlMy0yIOW8gOWlli3otaLnmoTljLrln5/pl6rng4HliqjnlLtcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCYnd6UmV3YXJkV2luU2hpbmVIYW5kbGVyIGV4dGVuZHMgQmJ3elNvY2tldEJhc2VIYW5kbGVyIHtcclxuICAgIGhhbmRsZURhdGEoZGF0YSkge1xyXG4gICAgICAgIGlmIChkYXRhLl9uZWVkUGxheSkge1xyXG4gICAgICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfQUREVElNRUxPQ0ssIFwiUmV3YXJkV2luU2hpbmVcIiwgZGF0YS50aW1lKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEuX3BhcmEgJiYgZGF0YS5fcGFyYS5hd2FyZClcclxuICAgICAgICAgICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UuZ2FtZVVJLmJldEFyZWFSb290Vmlldy5zaG93QXJlYVdpbkVmZmVjdChkYXRhLl9wYXJhLmF3YXJkLmhpdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5paw5aKe5Y6G5Y+y6K6w5b2VXHJcbiAgICAgICAgbGV0IG9iaiA9IGRhdGEuX3BhcmEuYXdhcmQ7XHJcbiAgICAgICAgQmJ3ekRhdGEuaW5zdGFuY2UuYWRkSGlzdG9yeShvYmopO1xyXG4gICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoQmJ3ekdhbWVFdmVudC5vbkhpc3RvcnlEYXRhUmVzKTsgICAgICAgICAgICAvLyDmt7vliqDotbDlir/mlbDmja7lubbpgJrnn6Xmm7TmlrBcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIGUzLTMg5byA5aWWLemjnuetueeggVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJid3pSZXdhcmRGZWlDaG91TWFIYW5kbGVyIGV4dGVuZHMgQmJ3elNvY2tldEJhc2VIYW5kbGVyIHtcclxuXHJcbiAgICBoYW5kbGVEYXRhKGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YS5fbmVlZFBsYXkpIHtcclxuICAgICAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX0FERFRJTUVMT0NLLCBcIlJld2FyZEZlaWNob3VtYVwiLCBkYXRhLnRpbWUpO1xyXG4gICAgICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLmNoaXBNYW5hZ2VyLnJld2FyZEZseUNoaXBzKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgQmJ3ekRyaXZlci5pbnN0YW5jZS5jaGlwTWFuYWdlci5jbGVhcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIGUzLTQg5byA5aWWLemjmOWtl1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJid3pSZXdhcmRGbHlXb3JkSGFuZGxlciBleHRlbmRzIEJid3pTb2NrZXRCYXNlSGFuZGxlciB7XHJcblxyXG4gICAgaGFuZGxlRGF0YShkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGEuX25lZWRQbGF5KSB7XHJcbiAgICAgICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9BRERUSU1FTE9DSywgXCJSZXdhcmRGbHlXb3JkXCIsIGRhdGEudGltZSk7XHJcbiAgICAgICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UuZ2FtZVVJLnNob3dQbGF5ZXJSZXdhcmRMYmwoQmJ3ekRhdGEuaW5zdGFuY2UucGxheWVyV2luRGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLl9wYXJhLmJpZ193aW5uZXIpe1xyXG4gICAgICAgICAgICAgICAgQmJ3ekRyaXZlci5pbnN0YW5jZS5nYW1lVUkuYmlnV2lubmVyVmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgQmJ3ekRyaXZlci5pbnN0YW5jZS5nYW1lVUkuYmlnV2lubmVyVmlldy51cGRhdGVVSShkYXRhLl9wYXJhLmJpZ193aW5uZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogZTMtNSDlvIDlpZYt5Liq5Lq657uT566XXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmJ3elJld2FyZEdlUmVuSmllU3VhbkhhbmRsZXIgZXh0ZW5kcyBCYnd6U29ja2V0QmFzZUhhbmRsZXIge1xyXG4gICAgaGFuZGxlRGF0YShkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGEuX25lZWRQbGF5KSB7XHJcbiAgICAgICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9BRERUSU1FTE9DSywgXCJSZXdhcmRHZVJlbkppZVN1YW5cIiwgZGF0YS50aW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLlBsYXllckRhdGEucG9pbnQgPSBCYnd6RGF0YS5pbnN0YW5jZS5wbGF5ZXJXaW5EYXRhLnBvaW50O1xyXG4gICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UuZ2FtZVVJLm9uU2VsZlBvaW50UmVmcmVzaChHbG9iYWwuUGxheWVyRGF0YS5wb2ludCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBlMy02IOW8gOWlli3nrYnlvoXkuIvkuIDlsYBcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCYnd6UmV3YXJkV2FpdE5leHRIYW5kbGVyIGV4dGVuZHMgQmJ3elNvY2tldEJhc2VIYW5kbGVyIHtcclxuICAgIGhhbmRsZURhdGEoZGF0YSkge1xyXG4gICAgICAgIGlmIChkYXRhLl9uZWVkUGxheSkge1xyXG4gICAgICAgICAgICAvL+iuvue9rueKtuaAgVxyXG4gICAgICAgICAgICB2YXIgY3VyclRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgICAgICB2YXIgamlhbmdlVGltZSA9IGN1cnJUaW1lIC0gZGF0YS5fcmVjZWl2ZVRpbWU7XHJcbiAgICAgICAgICAgIEJid3pEYXRhLmluc3RhbmNlLnJlbWFpblRpbWUgPSBNYXRoLm1heCgwLjUsIGRhdGEuX3BhcmEudGltZSAtIGppYW5nZVRpbWUgLyAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgQmJ3ekRyaXZlci5pbnN0YW5jZS5nYW1lVUkudGFza01hbmFnZXIucmVxR2V0Q29tbWlzaW9uSW5mbygpO1xyXG4gICAgfVxyXG59Il19