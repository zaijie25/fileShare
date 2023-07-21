"use strict";
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