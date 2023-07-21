"use strict";
cc._RF.push(module, '9165aYE7mVKbqgLot8B1wk2', 'BbwzNetHandler');
// bbwz/Bbwz/scripts/handler/BbwzNetHandler.ts

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
exports.BbwzGameHistoryHandler = exports.BbwzOnlinePlayerListHandler = exports.BbwzOnlinePlayerCountHandler = exports.BbwzBetRefreshHandler = exports.BbwzOtherBetHandler = exports.BbwzSelfBetHandler = exports.BbwzLeaveHandler = exports.BbwzEnterHandler = exports.BbwzGameCfgHandler = void 0;
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
var BbwzData_1 = require("../data/BbwzData");
var BbwzDriver_1 = require("../BbwzDriver");
var BbwzBetStartHandler_1 = require("./BbwzBetStartHandler");
var BbwzBetEndHandler_1 = require("./BbwzBetEndHandler");
var BbwzRewardHandler_1 = require("./BbwzRewardHandler");
var BbwzSocketBaseHandler_1 = require("./BbwzSocketBaseHandler");
var BbwzGameEvent_1 = require("../data/BbwzGameEvent");
var BbwzChatHandler_1 = require("./BbwzChatHandler");
var BbwzNetHandler = /** @class */ (function () {
    function BbwzNetHandler() {
    }
    /**
     * 注册协议
     */
    BbwzNetHandler.registerNetHandler = function () {
        Game.Control.registHandler(BbwzConstDefine_1.default.RECEIVER_GAMECFG, new BbwzGameCfgHandler); //a
        Game.Control.registHandler(BbwzConstDefine_1.default.RECEIVER_ENTER, new BbwzEnterHandler); //en1
        Game.Control.registHandler(BbwzConstDefine_1.default.RECEIVER_LEAVE, new BbwzLeaveHandler); //*lee*
        Game.Control.registHandler(BbwzConstDefine_1.default.RECEIVER_BET, new BbwzSelfBetHandler); //b1
        Game.Control.registHandler(BbwzConstDefine_1.default.RECEIVER_OTHER_BET, new BbwzOtherBetHandler); //c2
        Game.Control.registHandler(BbwzConstDefine_1.default.RECEIVER_GAME_START_BET, new BbwzBetStartHandler_1.BbwzBetStartHandler); //e1
        Game.Control.registHandler(BbwzConstDefine_1.default.GameStart_VS, new BbwzBetStartHandler_1.BbwzBetStartVSHandler); //e1-x
        Game.Control.registHandler(BbwzConstDefine_1.default.GameStart_Animation, new BbwzBetStartHandler_1.BbwzBetStartAnimationHandler); //e1-1
        Game.Control.registHandler(BbwzConstDefine_1.default.GameStart_Fapai, new BbwzBetStartHandler_1.BbwzBetStartFapaiHandler); //e1-0
        Game.Control.registHandler(BbwzConstDefine_1.default.GameStart_Daojishi, new BbwzBetStartHandler_1.BbwzBetStartDaojishiHandler); //e1-2
        Game.Control.registHandler(BbwzConstDefine_1.default.RECEIVER_GAME_END_BET, new BbwzBetEndHandler_1.BbwzBetEndHandler); //e2
        Game.Control.registHandler(BbwzConstDefine_1.default.RECEIVER_GAME_REWARD, new BbwzRewardHandler_1.BbwzRewardHandler); //e3
        Game.Control.registHandler(BbwzConstDefine_1.default.GameWait_DealCard, new BbwzRewardHandler_1.BbwzRewardFapaiHandler); //e3-1
        Game.Control.registHandler(BbwzConstDefine_1.default.GameWait_Dispatch, new BbwzRewardHandler_1.BbwzRewardDispatchHandler); //e3-1-0
        Game.Control.registHandler(BbwzConstDefine_1.default.GameWait_FanCard, new BbwzRewardHandler_1.BbwzRewardFanCardHandler); //e3-1-1
        Game.Control.registHandler(BbwzConstDefine_1.default.GameWait_AreaResult, new BbwzRewardHandler_1.BbwzRewardAreaResultHandler); //e3-1-2
        Game.Control.registHandler(BbwzConstDefine_1.default.GameWait_WinShine, new BbwzRewardHandler_1.BbwzRewardWinShineHandler); //e3-2
        Game.Control.registHandler(BbwzConstDefine_1.default.GameWait_FeiChouMa, new BbwzRewardHandler_1.BbwzRewardFeiChouMaHandler); //e3-3
        Game.Control.registHandler(BbwzConstDefine_1.default.GameWait_FlyWord, new BbwzRewardHandler_1.BbwzRewardFlyWordHandler); //e3-4
        Game.Control.registHandler(BbwzConstDefine_1.default.GameWait_GeRenJieSuan, new BbwzRewardHandler_1.BbwzRewardGeRenJieSuanHandler); //e3-5
        Game.Control.registHandler(BbwzConstDefine_1.default.GameWait_WaitNext, new BbwzRewardHandler_1.BbwzRewardWaitNextHandler); //e3-6
        Game.Control.registHandler(BbwzConstDefine_1.default.RECEIVER_REFRESH, new BbwzBetRefreshHandler); //refresh
        Game.Control.registHandler(BbwzConstDefine_1.default.RECEIVER_ONLINE_PLAYER_COUNT, new BbwzOnlinePlayerCountHandler); //ol
        Game.Control.registHandler(BbwzConstDefine_1.default.RECEIVER_ONLINE_PLAYER_LIST, new BbwzOnlinePlayerListHandler); //pl
        Game.Control.registHandler(BbwzConstDefine_1.default.RECEIVER_GAME_HISTORY, new BbwzGameHistoryHandler); //f1
        Game.Control.registHandler(BbwzConstDefine_1.default.CmdChat, new BbwzChatHandler_1.default);
    };
    return BbwzNetHandler;
}());
exports.default = BbwzNetHandler;
/**
 * 0 房间配置 a
 */
var BbwzGameCfgHandler = /** @class */ (function (_super) {
    __extends(BbwzGameCfgHandler, _super);
    function BbwzGameCfgHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //判断协议是否需要入队列，默认入队列
    BbwzGameCfgHandler.prototype.checkInQueue = function (msgParam) {
        return false;
    };
    BbwzGameCfgHandler.prototype.handleData = function (data) {
        //cc.log("GameCfgHandler----------handleData------data = " + JSON.stringify(data))
        BbwzData_1.default.instance.gameState = BbwzConstDefine_1.BbwzGameState.Deal;
        //保存房间配置
        BbwzData_1.default.instance.serverGameCfg = data._para;
        //解析并存储配置
        BbwzData_1.default.instance.parseServerCfg(data._para);
        //进入游戏层
        BbwzDriver_1.default.instance.gotoGamePanel();
        BbwzDriver_1.default.instance.gameUI.selectChipsView.initChipListData();
        BbwzDriver_1.default.instance.gameUI.headTipsManager.setConfig(data._src);
        BbwzDriver_1.default.instance.gameUI.taskManager.reqGetCommisionInfo();
    };
    return BbwzGameCfgHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzGameCfgHandler = BbwzGameCfgHandler;
/**
 * 2 进入房间 包括自己和别人 en1
 */
var BbwzEnterHandler = /** @class */ (function (_super) {
    __extends(BbwzEnterHandler, _super);
    function BbwzEnterHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //判断协议是否需要入队列，默认入队列
    BbwzEnterHandler.prototype.checkInQueue = function (msgParam) {
        return false;
    };
    BbwzEnterHandler.prototype.handleData = function (data) {
        var localSit = data._para._chair;
        if (localSit == BbwzData_1.default.instance.selfSrc) {
            localSit = 0;
        }
        BbwzData_1.default.instance.playerDataArr[localSit] = data._para;
        BbwzDriver_1.default.instance.gameUI.onPlayerEnter(localSit, data._para);
    };
    return BbwzEnterHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzEnterHandler = BbwzEnterHandler;
/**
 * 离开游戏
 */
var BbwzLeaveHandler = /** @class */ (function (_super) {
    __extends(BbwzLeaveHandler, _super);
    function BbwzLeaveHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzLeaveHandler.prototype.handleData = function (data) {
        //如果是自己则退出游戏
        if (data._src == BbwzData_1.default.instance.selfSrc) {
            var explain = null;
            if (data._para && data._para._reason != 0) {
                explain = data._para._explain;
            }
            BbwzDriver_1.default.instance.onForceLeave(true, explain);
        }
        else {
            BbwzDriver_1.default.instance.gameUI.onPlayerLeave(data._src);
            BbwzData_1.default.instance.playerDataArr[data._src] = null;
        }
    };
    return BbwzLeaveHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzLeaveHandler = BbwzLeaveHandler;
/**
 * 自己下注返回 b1
 */
var BbwzSelfBetHandler = /** @class */ (function (_super) {
    __extends(BbwzSelfBetHandler, _super);
    function BbwzSelfBetHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzSelfBetHandler.prototype.handleData = function (data) {
        //cc.log("SelfBetHandler----------handleData------data = " + JSON.stringify(data))
        Global.PlayerData.point = data._para.point;
        //刷新玩家自己下注数据
        BbwzData_1.default.instance.updateSelfTableData(data._para.my_bets);
        for (var index = 0; index < data._para.bets.length; index++) {
            var betData = data._para.bets[index];
            var tableType = betData.k;
            var totalBet = BbwzData_1.default.instance.gameTableBetInfo[tableType].totalBetNum;
            if (!totalBet) {
                totalBet = 0;
            }
            totalBet += betData.v;
            BbwzData_1.default.instance.gameTableBetInfo[tableType].totalBetNum = totalBet;
        }
        BbwzDriver_1.default.instance.gameUI.onSelfBet(data._para);
    };
    return BbwzSelfBetHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzSelfBetHandler = BbwzSelfBetHandler;
/**
 * 其他玩家下注 c2
 */
var BbwzOtherBetHandler = /** @class */ (function (_super) {
    __extends(BbwzOtherBetHandler, _super);
    function BbwzOtherBetHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzOtherBetHandler.prototype.handleData = function (data) {
        //cc.log("OtherBetHandler----------handleData------data = " + JSON.stringify( data ))
        //广播玩家下注一个筹码
        var allBets = data._para.all_bets;
        for (var keyName in allBets) {
            BbwzData_1.default.instance.gameTableBetInfo[keyName].totalBetNum = allBets[keyName];
        }
        var bets = data._para.bets || [];
        BbwzDriver_1.default.instance.gameUI.onPlayerBet(bets);
    };
    return BbwzOtherBetHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzOtherBetHandler = BbwzOtherBetHandler;
/**
 * 刷新自己的金币 refresh  只有结算才推
 */
var BbwzBetRefreshHandler = /** @class */ (function (_super) {
    __extends(BbwzBetRefreshHandler, _super);
    function BbwzBetRefreshHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzBetRefreshHandler.prototype.handleData = function (data) {
        Global.PlayerData.point = data._para.point;
        BbwzDriver_1.default.instance.gameUI.onSelfPointRefresh(data._para.point);
        BbwzDriver_1.default.instance.gameUI.updateBetSelectButton();
    };
    return BbwzBetRefreshHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzBetRefreshHandler = BbwzBetRefreshHandler;
/**
 * 推送在线玩家数量
 */
var BbwzOnlinePlayerCountHandler = /** @class */ (function (_super) {
    __extends(BbwzOnlinePlayerCountHandler, _super);
    function BbwzOnlinePlayerCountHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzOnlinePlayerCountHandler.prototype.handleData = function (data) {
        BbwzData_1.default.instance.onlinePlayer = data._para.p_count;
        BbwzDriver_1.default.instance.gameUI.updateOnlinePlayer(data._para.p_count);
    };
    return BbwzOnlinePlayerCountHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzOnlinePlayerCountHandler = BbwzOnlinePlayerCountHandler;
/**
 * 获取在线玩家列表
 */
var BbwzOnlinePlayerListHandler = /** @class */ (function (_super) {
    __extends(BbwzOnlinePlayerListHandler, _super);
    function BbwzOnlinePlayerListHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //判断协议是否需要入队列，默认入队列
    BbwzOnlinePlayerListHandler.prototype.checkInQueue = function (msgParam) {
        return false;
    };
    BbwzOnlinePlayerListHandler.prototype.handleData = function (data) {
        // cc.log("OnlinePlayerListHandler----------handleData------data = " + JSON.stringify( data ));
        if (data._para.my_index > 0) {
            data._para.all[data._para.my_index - 1].isMy = true;
        }
        var dataList = data._para.all;
        var zhiduoxing = data._para.smart;
        if (zhiduoxing) {
            zhiduoxing.isZhiduoxing = true;
            dataList.unshift(zhiduoxing);
        }
        BbwzData_1.default.instance.onLinePlayerList = dataList;
        //按近20局投注总额排序，列表第一位是智多星（特殊处理）
        dataList.sort(function (a, b) {
            if (a.total_bet >= b.total_bet) {
                return -1;
            }
            return 1;
        });
        BbwzData_1.default.instance.onlinePlayer = dataList.length;
        BbwzDriver_1.default.instance.gameUI.updateOnlinePlayer(dataList.length);
        //调用在线玩家界面的 打开后更新函数
        BbwzDriver_1.default.instance.onlinePop.updateAfterGetData();
    };
    return BbwzOnlinePlayerListHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzOnlinePlayerListHandler = BbwzOnlinePlayerListHandler;
/** 历史记录 f1 只在enter之后和清空时才会推送 其他走结算手动add*/
var BbwzGameHistoryHandler = /** @class */ (function (_super) {
    __extends(BbwzGameHistoryHandler, _super);
    function BbwzGameHistoryHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzGameHistoryHandler.prototype.checkInQueue = function (msgParam) {
        return false;
    };
    BbwzGameHistoryHandler.prototype.handleData = function (msgParam) {
        //cc.log("GameHistoryHandler----------handleData------data = " + JSON.stringify(msgParam));
        var qihaoList = msgParam._para;
        if (qihaoList && qihaoList.awards) {
            BbwzData_1.default.instance.historyDataArr = qihaoList.awards;
            Game.Event.event(BbwzGameEvent_1.default.onHistoryDataRes, true); // 通知刷新历史ui true表示清空重刷数据
            BbwzDriver_1.default.instance.gameUI.betAreaRootView.showAreaTrend(null, qihaoList.awards, false);
        }
    };
    return BbwzGameHistoryHandler;
}(BbwzSocketBaseHandler_1.default));
exports.BbwzGameHistoryHandler = BbwzGameHistoryHandler;

cc._RF.pop();