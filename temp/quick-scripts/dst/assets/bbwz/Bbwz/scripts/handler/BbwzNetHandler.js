
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/handler/BbwzNetHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcaGFuZGxlclxcQmJ3ek5ldEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUF5RTtBQUN6RSw2Q0FBd0M7QUFDeEMsNENBQXVDO0FBQ3ZDLDZEQUF3SztBQUN4Syx5REFBd0Q7QUFDeEQseURBQTZTO0FBQzdTLGlFQUE0RDtBQUM1RCx1REFBa0Q7QUFDbEQscURBQWdEO0FBRWhEO0lBQUE7SUFzQ0EsQ0FBQztJQXJDRzs7T0FFRztJQUNJLGlDQUFrQixHQUF6QjtRQUVJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLHlCQUFlLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDLENBQUcsR0FBRztRQUMzRixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyx5QkFBZSxDQUFDLGNBQWMsRUFBRSxJQUFJLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxLQUFLO1FBQ3ZGLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLHlCQUFlLENBQUMsY0FBYyxFQUFFLElBQUksZ0JBQWdCLENBQUMsQ0FBQyxDQUFBLE9BQU87UUFFeEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMseUJBQWUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDLENBQUUsSUFBSTtRQUN2RixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyx5QkFBZSxDQUFDLGtCQUFrQixFQUFFLElBQUksbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFFN0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMseUJBQWUsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLHlDQUFtQixDQUFDLENBQUMsQ0FBQyxJQUFJO1FBQ2xHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLHlCQUFlLENBQUMsWUFBWSxFQUFF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RyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQ2pELG9CQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFL0QsbUJBQW1CO1FBQ25CLG9CQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFDTCxrQ0FBQztBQUFELENBaENBLEFBZ0NDLENBaENnRCwrQkFBcUIsR0FnQ3JFO0FBaENZLGtFQUEyQjtBQWtDeEMsMENBQTBDO0FBQzFDO0lBQTRDLDBDQUFxQjtJQUFqRTs7SUFjQSxDQUFDO0lBYlUsNkNBQVksR0FBbkIsVUFBb0IsUUFBUTtRQUN4QixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsMkNBQVUsR0FBVixVQUFXLFFBQWE7UUFDcEIsMkZBQTJGO1FBQzNGLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDL0IsSUFBSSxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUMvQixrQkFBUSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztZQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyx1QkFBYSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUssd0JBQXdCO1lBQ3BGLG9CQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzNGO0lBQ0wsQ0FBQztJQUNMLDZCQUFDO0FBQUQsQ0FkQSxBQWNDLENBZDJDLCtCQUFxQixHQWNoRTtBQWRZLHdEQUFzQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYnd6Q29uc3REZWZpbmUsIHsgQmJ3ekdhbWVTdGF0ZSB9IGZyb20gXCIuLi9kYXRhL0Jid3pDb25zdERlZmluZVwiO1xyXG5pbXBvcnQgQmJ3ekRhdGEgZnJvbSBcIi4uL2RhdGEvQmJ3ekRhdGFcIjtcclxuaW1wb3J0IEJid3pEcml2ZXIgZnJvbSBcIi4uL0Jid3pEcml2ZXJcIjtcclxuaW1wb3J0IHsgQmJ3ekJldFN0YXJ0SGFuZGxlciwgQmJ3ekJldFN0YXJ0VlNIYW5kbGVyLCBCYnd6QmV0U3RhcnRBbmltYXRpb25IYW5kbGVyLCBCYnd6QmV0U3RhcnRGYXBhaUhhbmRsZXIsIEJid3pCZXRTdGFydERhb2ppc2hpSGFuZGxlciB9IGZyb20gXCIuL0Jid3pCZXRTdGFydEhhbmRsZXJcIjtcclxuaW1wb3J0IHsgQmJ3ekJldEVuZEhhbmRsZXIgfSBmcm9tIFwiLi9CYnd6QmV0RW5kSGFuZGxlclwiO1xyXG5pbXBvcnQgeyBCYnd6UmV3YXJkSGFuZGxlciwgQmJ3elJld2FyZFdpblNoaW5lSGFuZGxlciwgQmJ3elJld2FyZEZlaUNob3VNYUhhbmRsZXIsIEJid3pSZXdhcmRGbHlXb3JkSGFuZGxlciwgQmJ3elJld2FyZEdlUmVuSmllU3VhbkhhbmRsZXIsIEJid3pSZXdhcmRXYWl0TmV4dEhhbmRsZXIsIEJid3pSZXdhcmRGYW5DYXJkSGFuZGxlciwgQmJ3elJld2FyZEFyZWFSZXN1bHRIYW5kbGVyLCBCYnd6UmV3YXJkRGlzcGF0Y2hIYW5kbGVyLCBCYnd6UmV3YXJkRmFwYWlIYW5kbGVyIH0gZnJvbSBcIi4vQmJ3elJld2FyZEhhbmRsZXJcIjtcclxuaW1wb3J0IEJid3pTb2NrZXRCYXNlSGFuZGxlciBmcm9tIFwiLi9CYnd6U29ja2V0QmFzZUhhbmRsZXJcIjtcclxuaW1wb3J0IEJid3pHYW1lRXZlbnQgZnJvbSBcIi4uL2RhdGEvQmJ3ekdhbWVFdmVudFwiO1xyXG5pbXBvcnQgQmJ3ekNoYXRIYW5kbGVyIGZyb20gXCIuL0Jid3pDaGF0SGFuZGxlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmJ3ek5ldEhhbmRsZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiDms6jlhozljY/orq5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJlZ2lzdGVyTmV0SGFuZGxlcigpIHtcclxuXHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoQmJ3ekNvbnN0RGVmaW5lLlJFQ0VJVkVSX0dBTUVDRkcsIG5ldyBCYnd6R2FtZUNmZ0hhbmRsZXIpOyAgIC8vYVxyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKEJid3pDb25zdERlZmluZS5SRUNFSVZFUl9FTlRFUiwgbmV3IEJid3pFbnRlckhhbmRsZXIpOyAvL2VuMVxyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKEJid3pDb25zdERlZmluZS5SRUNFSVZFUl9MRUFWRSwgbmV3IEJid3pMZWF2ZUhhbmRsZXIpOy8vKmxlZSpcclxuXHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoQmJ3ekNvbnN0RGVmaW5lLlJFQ0VJVkVSX0JFVCwgbmV3IEJid3pTZWxmQmV0SGFuZGxlcik7ICAvL2IxXHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoQmJ3ekNvbnN0RGVmaW5lLlJFQ0VJVkVSX09USEVSX0JFVCwgbmV3IEJid3pPdGhlckJldEhhbmRsZXIpOyAvL2MyXHJcblxyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKEJid3pDb25zdERlZmluZS5SRUNFSVZFUl9HQU1FX1NUQVJUX0JFVCwgbmV3IEJid3pCZXRTdGFydEhhbmRsZXIpOyAvL2UxXHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoQmJ3ekNvbnN0RGVmaW5lLkdhbWVTdGFydF9WUywgbmV3IEJid3pCZXRTdGFydFZTSGFuZGxlcik7Ly9lMS14XHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoQmJ3ekNvbnN0RGVmaW5lLkdhbWVTdGFydF9BbmltYXRpb24sIG5ldyBCYnd6QmV0U3RhcnRBbmltYXRpb25IYW5kbGVyKTsvL2UxLTFcclxuICAgICAgICBHYW1lLkNvbnRyb2wucmVnaXN0SGFuZGxlcihCYnd6Q29uc3REZWZpbmUuR2FtZVN0YXJ0X0ZhcGFpLCBuZXcgQmJ3ekJldFN0YXJ0RmFwYWlIYW5kbGVyKTsvL2UxLTBcclxuICAgICAgICBHYW1lLkNvbnRyb2wucmVnaXN0SGFuZGxlcihCYnd6Q29uc3REZWZpbmUuR2FtZVN0YXJ0X0Rhb2ppc2hpLCBuZXcgQmJ3ekJldFN0YXJ0RGFvamlzaGlIYW5kbGVyKTsvL2UxLTJcclxuXHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoQmJ3ekNvbnN0RGVmaW5lLlJFQ0VJVkVSX0dBTUVfRU5EX0JFVCwgbmV3IEJid3pCZXRFbmRIYW5kbGVyKTsgICAvL2UyXHJcblxyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKEJid3pDb25zdERlZmluZS5SRUNFSVZFUl9HQU1FX1JFV0FSRCwgbmV3IEJid3pSZXdhcmRIYW5kbGVyKTsgIC8vZTNcclxuICAgICAgICBHYW1lLkNvbnRyb2wucmVnaXN0SGFuZGxlcihCYnd6Q29uc3REZWZpbmUuR2FtZVdhaXRfRGVhbENhcmQsIG5ldyBCYnd6UmV3YXJkRmFwYWlIYW5kbGVyKTsgICAgICAvL2UzLTFcclxuICAgICAgICBHYW1lLkNvbnRyb2wucmVnaXN0SGFuZGxlcihCYnd6Q29uc3REZWZpbmUuR2FtZVdhaXRfRGlzcGF0Y2gsIG5ldyBCYnd6UmV3YXJkRGlzcGF0Y2hIYW5kbGVyKTsgICAgICAvL2UzLTEtMFxyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKEJid3pDb25zdERlZmluZS5HYW1lV2FpdF9GYW5DYXJkLCBuZXcgQmJ3elJld2FyZEZhbkNhcmRIYW5kbGVyKTsgICAgICAvL2UzLTEtMVxyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKEJid3pDb25zdERlZmluZS5HYW1lV2FpdF9BcmVhUmVzdWx0LCBuZXcgQmJ3elJld2FyZEFyZWFSZXN1bHRIYW5kbGVyKTsgICAgICAvL2UzLTEtMlxyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKEJid3pDb25zdERlZmluZS5HYW1lV2FpdF9XaW5TaGluZSwgbmV3IEJid3pSZXdhcmRXaW5TaGluZUhhbmRsZXIpOyAgICAgIC8vZTMtMlxyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKEJid3pDb25zdERlZmluZS5HYW1lV2FpdF9GZWlDaG91TWEsIG5ldyBCYnd6UmV3YXJkRmVpQ2hvdU1hSGFuZGxlcik7ICAgICAgLy9lMy0zXHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoQmJ3ekNvbnN0RGVmaW5lLkdhbWVXYWl0X0ZseVdvcmQsIG5ldyBCYnd6UmV3YXJkRmx5V29yZEhhbmRsZXIpOyAgICAgIC8vZTMtNFxyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKEJid3pDb25zdERlZmluZS5HYW1lV2FpdF9HZVJlbkppZVN1YW4sIG5ldyBCYnd6UmV3YXJkR2VSZW5KaWVTdWFuSGFuZGxlcik7ICAgICAgLy9lMy01XHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoQmJ3ekNvbnN0RGVmaW5lLkdhbWVXYWl0X1dhaXROZXh0LCBuZXcgQmJ3elJld2FyZFdhaXROZXh0SGFuZGxlcik7ICAgICAgLy9lMy02XHJcblxyXG4gICAgICAgIEdhbWUuQ29udHJvbC5yZWdpc3RIYW5kbGVyKEJid3pDb25zdERlZmluZS5SRUNFSVZFUl9SRUZSRVNILCBuZXcgQmJ3ekJldFJlZnJlc2hIYW5kbGVyKTsvL3JlZnJlc2hcclxuICAgICAgICBHYW1lLkNvbnRyb2wucmVnaXN0SGFuZGxlcihCYnd6Q29uc3REZWZpbmUuUkVDRUlWRVJfT05MSU5FX1BMQVlFUl9DT1VOVCwgbmV3IEJid3pPbmxpbmVQbGF5ZXJDb3VudEhhbmRsZXIpOy8vb2xcclxuICAgICAgICBHYW1lLkNvbnRyb2wucmVnaXN0SGFuZGxlcihCYnd6Q29uc3REZWZpbmUuUkVDRUlWRVJfT05MSU5FX1BMQVlFUl9MSVNULCBuZXcgQmJ3ek9ubGluZVBsYXllckxpc3RIYW5kbGVyKTsvL3BsXHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoQmJ3ekNvbnN0RGVmaW5lLlJFQ0VJVkVSX0dBTUVfSElTVE9SWSwgbmV3IEJid3pHYW1lSGlzdG9yeUhhbmRsZXIpOyAvL2YxXHJcbiAgICAgICAgR2FtZS5Db250cm9sLnJlZ2lzdEhhbmRsZXIoQmJ3ekNvbnN0RGVmaW5lLkNtZENoYXQsIG5ldyBCYnd6Q2hhdEhhbmRsZXIpOyBcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIDAg5oi/6Ze06YWN572uIGFcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCYnd6R2FtZUNmZ0hhbmRsZXIgZXh0ZW5kcyBCYnd6U29ja2V0QmFzZUhhbmRsZXIge1xyXG4gICAgLy/liKTmlq3ljY/orq7mmK/lkKbpnIDopoHlhaXpmJ/liJfvvIzpu5jorqTlhaXpmJ/liJdcclxuICAgIHB1YmxpYyBjaGVja0luUXVldWUobXNnUGFyYW0pIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRGF0YShkYXRhKSB7XHJcbiAgICAgICAgLy9jYy5sb2coXCJHYW1lQ2ZnSGFuZGxlci0tLS0tLS0tLS1oYW5kbGVEYXRhLS0tLS0tZGF0YSA9IFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkpXHJcbiAgICAgICAgQmJ3ekRhdGEuaW5zdGFuY2UuZ2FtZVN0YXRlID0gQmJ3ekdhbWVTdGF0ZS5EZWFsO1xyXG4gICAgICAgIC8v5L+d5a2Y5oi/6Ze06YWN572uXHJcbiAgICAgICAgQmJ3ekRhdGEuaW5zdGFuY2Uuc2VydmVyR2FtZUNmZyA9IGRhdGEuX3BhcmE7XHJcbiAgICAgICAgLy/op6PmnpDlubblrZjlgqjphY3nva5cclxuICAgICAgICBCYnd6RGF0YS5pbnN0YW5jZS5wYXJzZVNlcnZlckNmZyhkYXRhLl9wYXJhKTtcclxuICAgICAgICAvL+i/m+WFpea4uOaIj+WxglxyXG4gICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UuZ290b0dhbWVQYW5lbCgpO1xyXG4gICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UuZ2FtZVVJLnNlbGVjdENoaXBzVmlldy5pbml0Q2hpcExpc3REYXRhKCk7XHJcbiAgICAgICAgQmJ3ekRyaXZlci5pbnN0YW5jZS5nYW1lVUkuaGVhZFRpcHNNYW5hZ2VyLnNldENvbmZpZyhkYXRhLl9zcmMpO1xyXG4gICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UuZ2FtZVVJLnRhc2tNYW5hZ2VyLnJlcUdldENvbW1pc2lvbkluZm8oKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIDIg6L+b5YWl5oi/6Ze0IOWMheaLrOiHquW3seWSjOWIq+S6uiBlbjEgICAgXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmJ3ekVudGVySGFuZGxlciBleHRlbmRzIEJid3pTb2NrZXRCYXNlSGFuZGxlciB7XHJcbiAgICAvL+WIpOaWreWNj+iuruaYr+WQpumcgOimgeWFpemYn+WIl++8jOm7mOiupOWFpemYn+WIl1xyXG4gICAgcHVibGljIGNoZWNrSW5RdWV1ZShtc2dQYXJhbSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVEYXRhKGRhdGEpIHtcclxuICAgICAgICBsZXQgbG9jYWxTaXQgPSBkYXRhLl9wYXJhLl9jaGFpcjtcclxuICAgICAgICBpZiAobG9jYWxTaXQgPT0gQmJ3ekRhdGEuaW5zdGFuY2Uuc2VsZlNyYykge1xyXG4gICAgICAgICAgICBsb2NhbFNpdCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEJid3pEYXRhLmluc3RhbmNlLnBsYXllckRhdGFBcnJbbG9jYWxTaXRdID0gZGF0YS5fcGFyYTtcclxuICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLmdhbWVVSS5vblBsYXllckVudGVyKGxvY2FsU2l0LCBkYXRhLl9wYXJhKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOemu+W8gOa4uOaIj1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJid3pMZWF2ZUhhbmRsZXIgZXh0ZW5kcyBCYnd6U29ja2V0QmFzZUhhbmRsZXIge1xyXG4gICAgaGFuZGxlRGF0YShkYXRhKSB7XHJcbiAgICAgICAgLy/lpoLmnpzmmK/oh6rlt7HliJnpgIDlh7rmuLjmiI9cclxuICAgICAgICBpZiAoZGF0YS5fc3JjID09IEJid3pEYXRhLmluc3RhbmNlLnNlbGZTcmMpIHtcclxuICAgICAgICAgICAgbGV0IGV4cGxhaW46IHN0cmluZyA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLl9wYXJhICYmIGRhdGEuX3BhcmEuX3JlYXNvbiAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBleHBsYWluID0gZGF0YS5fcGFyYS5fZXhwbGFpbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLm9uRm9yY2VMZWF2ZSh0cnVlLCBleHBsYWluKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLmdhbWVVSS5vblBsYXllckxlYXZlKGRhdGEuX3NyYyk7XHJcbiAgICAgICAgICAgIEJid3pEYXRhLmluc3RhbmNlLnBsYXllckRhdGFBcnJbZGF0YS5fc3JjXSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog6Ieq5bex5LiL5rOo6L+U5ZueIGIxXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmJ3elNlbGZCZXRIYW5kbGVyIGV4dGVuZHMgQmJ3elNvY2tldEJhc2VIYW5kbGVyIHtcclxuXHJcbiAgICBoYW5kbGVEYXRhKGRhdGEpIHtcclxuICAgICAgICAvL2NjLmxvZyhcIlNlbGZCZXRIYW5kbGVyLS0tLS0tLS0tLWhhbmRsZURhdGEtLS0tLS1kYXRhID0gXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSlcclxuICAgICAgICBHbG9iYWwuUGxheWVyRGF0YS5wb2ludCA9IGRhdGEuX3BhcmEucG9pbnQ7XHJcbiAgICAgICAgLy/liLfmlrDnjqnlrrboh6rlt7HkuIvms6jmlbDmja5cclxuICAgICAgICBCYnd6RGF0YS5pbnN0YW5jZS51cGRhdGVTZWxmVGFibGVEYXRhKGRhdGEuX3BhcmEubXlfYmV0cyk7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGRhdGEuX3BhcmEuYmV0cy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3QgYmV0RGF0YSA9IGRhdGEuX3BhcmEuYmV0c1tpbmRleF07XHJcbiAgICAgICAgICAgIGxldCB0YWJsZVR5cGUgPSBiZXREYXRhLms7XHJcbiAgICAgICAgICAgIGxldCB0b3RhbEJldCA9IEJid3pEYXRhLmluc3RhbmNlLmdhbWVUYWJsZUJldEluZm9bdGFibGVUeXBlXS50b3RhbEJldE51bTtcclxuICAgICAgICAgICAgaWYgKCF0b3RhbEJldCkge1xyXG4gICAgICAgICAgICAgICAgdG90YWxCZXQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRvdGFsQmV0ICs9IGJldERhdGEudjtcclxuICAgICAgICAgICAgQmJ3ekRhdGEuaW5zdGFuY2UuZ2FtZVRhYmxlQmV0SW5mb1t0YWJsZVR5cGVdLnRvdGFsQmV0TnVtID0gdG90YWxCZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UuZ2FtZVVJLm9uU2VsZkJldChkYXRhLl9wYXJhKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOWFtuS7lueOqeWutuS4i+azqCBjMlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJid3pPdGhlckJldEhhbmRsZXIgZXh0ZW5kcyBCYnd6U29ja2V0QmFzZUhhbmRsZXIge1xyXG4gICAgaGFuZGxlRGF0YShkYXRhKSB7XHJcbiAgICAgICAgLy9jYy5sb2coXCJPdGhlckJldEhhbmRsZXItLS0tLS0tLS0taGFuZGxlRGF0YS0tLS0tLWRhdGEgPSBcIiArIEpTT04uc3RyaW5naWZ5KCBkYXRhICkpXHJcbiAgICAgICAgLy/lub/mkq3njqnlrrbkuIvms6jkuIDkuKrnrbnnoIFcclxuICAgICAgICBsZXQgYWxsQmV0cyA9IGRhdGEuX3BhcmEuYWxsX2JldHM7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXlOYW1lIGluIGFsbEJldHMpIHtcclxuICAgICAgICAgICAgQmJ3ekRhdGEuaW5zdGFuY2UuZ2FtZVRhYmxlQmV0SW5mb1trZXlOYW1lXS50b3RhbEJldE51bSA9IGFsbEJldHNba2V5TmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBiZXRzID0gZGF0YS5fcGFyYS5iZXRzIHx8IFtdO1xyXG4gICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UuZ2FtZVVJLm9uUGxheWVyQmV0KGJldHMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIOWIt+aWsOiHquW3seeahOmHkeW4gSByZWZyZXNoICDlj6rmnInnu5PnrpfmiY3mjqhcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCYnd6QmV0UmVmcmVzaEhhbmRsZXIgZXh0ZW5kcyBCYnd6U29ja2V0QmFzZUhhbmRsZXIge1xyXG4gICAgaGFuZGxlRGF0YShkYXRhKSB7XHJcbiAgICAgICAgR2xvYmFsLlBsYXllckRhdGEucG9pbnQgPSBkYXRhLl9wYXJhLnBvaW50O1xyXG4gICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UuZ2FtZVVJLm9uU2VsZlBvaW50UmVmcmVzaChkYXRhLl9wYXJhLnBvaW50KTtcclxuICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLmdhbWVVSS51cGRhdGVCZXRTZWxlY3RCdXR0b24oKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiDmjqjpgIHlnKjnur/njqnlrrbmlbDph49cclxuICovXHJcbmV4cG9ydCBjbGFzcyBCYnd6T25saW5lUGxheWVyQ291bnRIYW5kbGVyIGV4dGVuZHMgQmJ3elNvY2tldEJhc2VIYW5kbGVyIHtcclxuICAgIGhhbmRsZURhdGEoZGF0YSkge1xyXG4gICAgICAgIEJid3pEYXRhLmluc3RhbmNlLm9ubGluZVBsYXllciA9IGRhdGEuX3BhcmEucF9jb3VudDtcclxuICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLmdhbWVVSS51cGRhdGVPbmxpbmVQbGF5ZXIoZGF0YS5fcGFyYS5wX2NvdW50KTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiDojrflj5blnKjnur/njqnlrrbliJfooahcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCYnd6T25saW5lUGxheWVyTGlzdEhhbmRsZXIgZXh0ZW5kcyBCYnd6U29ja2V0QmFzZUhhbmRsZXIge1xyXG4gICAgLy/liKTmlq3ljY/orq7mmK/lkKbpnIDopoHlhaXpmJ/liJfvvIzpu5jorqTlhaXpmJ/liJdcclxuICAgIHB1YmxpYyBjaGVja0luUXVldWUobXNnUGFyYW0pIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRGF0YShkYXRhKSB7XHJcbiAgICAgICAgLy8gY2MubG9nKFwiT25saW5lUGxheWVyTGlzdEhhbmRsZXItLS0tLS0tLS0taGFuZGxlRGF0YS0tLS0tLWRhdGEgPSBcIiArIEpTT04uc3RyaW5naWZ5KCBkYXRhICkpO1xyXG4gICAgICAgIGlmIChkYXRhLl9wYXJhLm15X2luZGV4ID4gMCkge1xyXG4gICAgICAgICAgICBkYXRhLl9wYXJhLmFsbFtkYXRhLl9wYXJhLm15X2luZGV4IC0gMV0uaXNNeSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkYXRhTGlzdCA9IGRhdGEuX3BhcmEuYWxsO1xyXG4gICAgICAgIGxldCB6aGlkdW94aW5nID0gZGF0YS5fcGFyYS5zbWFydDtcclxuICAgICAgICBpZih6aGlkdW94aW5nKXtcclxuICAgICAgICAgICAgemhpZHVveGluZy5pc1poaWR1b3hpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBkYXRhTGlzdC51bnNoaWZ0KHpoaWR1b3hpbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBCYnd6RGF0YS5pbnN0YW5jZS5vbkxpbmVQbGF5ZXJMaXN0ID0gZGF0YUxpc3Q7XHJcbiAgICAgICAgLy/mjInov5EyMOWxgOaKleazqOaAu+mineaOkuW6j++8jOWIl+ihqOesrOS4gOS9jeaYr+aZuuWkmuaYn++8iOeJueauiuWkhOeQhu+8iVxyXG4gICAgICAgIGRhdGFMaXN0LnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGEudG90YWxfYmV0ID49IGIudG90YWxfYmV0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIEJid3pEYXRhLmluc3RhbmNlLm9ubGluZVBsYXllciA9IGRhdGFMaXN0Lmxlbmd0aDtcclxuICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLmdhbWVVSS51cGRhdGVPbmxpbmVQbGF5ZXIoZGF0YUxpc3QubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgLy/osIPnlKjlnKjnur/njqnlrrbnlYzpnaLnmoQg5omT5byA5ZCO5pu05paw5Ye95pWwXHJcbiAgICAgICAgQmJ3ekRyaXZlci5pbnN0YW5jZS5vbmxpbmVQb3AudXBkYXRlQWZ0ZXJHZXREYXRhKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKiDljoblj7LorrDlvZUgZjEg5Y+q5ZyoZW50ZXLkuYvlkI7lkozmuIXnqbrml7bmiY3kvJrmjqjpgIEg5YW25LuW6LWw57uT566X5omL5YqoYWRkKi9cclxuZXhwb3J0IGNsYXNzIEJid3pHYW1lSGlzdG9yeUhhbmRsZXIgZXh0ZW5kcyBCYnd6U29ja2V0QmFzZUhhbmRsZXIge1xyXG4gICAgcHVibGljIGNoZWNrSW5RdWV1ZShtc2dQYXJhbSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVEYXRhKG1zZ1BhcmFtOiBhbnkpIHtcclxuICAgICAgICAvL2NjLmxvZyhcIkdhbWVIaXN0b3J5SGFuZGxlci0tLS0tLS0tLS1oYW5kbGVEYXRhLS0tLS0tZGF0YSA9IFwiICsgSlNPTi5zdHJpbmdpZnkobXNnUGFyYW0pKTtcclxuICAgICAgICBsZXQgcWloYW9MaXN0ID0gbXNnUGFyYW0uX3BhcmE7XHJcbiAgICAgICAgaWYgKHFpaGFvTGlzdCAmJiBxaWhhb0xpc3QuYXdhcmRzKSB7XHJcbiAgICAgICAgICAgIEJid3pEYXRhLmluc3RhbmNlLmhpc3RvcnlEYXRhQXJyID0gcWloYW9MaXN0LmF3YXJkcztcclxuICAgICAgICAgICAgR2FtZS5FdmVudC5ldmVudChCYnd6R2FtZUV2ZW50Lm9uSGlzdG9yeURhdGFSZXMsIHRydWUpOyAgICAgLy8g6YCa55+l5Yi35paw5Y6G5Y+ydWkgdHJ1ZeihqOekuua4heepuumHjeWIt+aVsOaNrlxyXG4gICAgICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLmdhbWVVSS5iZXRBcmVhUm9vdFZpZXcuc2hvd0FyZWFUcmVuZChudWxsLCBxaWhhb0xpc3QuYXdhcmRzLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19