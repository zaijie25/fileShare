
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/data/BbwzData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2bf3eU8/2lM/bJgpq9WWu/A', 'BbwzData');
// bbwz/Bbwz/scripts/data/BbwzData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BbwzConstDefine_1 = require("./BbwzConstDefine");
var BbwzDriver_1 = require("../BbwzDriver");
var BbwzBetManager_1 = require("../manager/BbwzBetManager");
/**
 * 全局数据类
 */
var BbwzData = /** @class */ (function () {
    function BbwzData() {
        var _a;
        /****************************************************** 游戏配置 ********************************************************/
        /**
         * 房间配置对象
         */
        this.serverGameCfg = null;
        /**
         * 用来下注的筹码
         */
        this.chipList = [10000, 100000, 500000, 1000000, 5000000];
        /**
         * 用来记录当前选中的筹码索引
         */
        this.currentSelectIndex = 0;
        /**
         * 底部筹码世界坐标记录 筹码值-世界坐标
         */
        this.selectChipWolrdPos = {};
        /**
         * 下注总上限
         */
        this.bet_max = 1000;
        /**
         * 下注最小携带限额
         */
        this.bet_min = 0;
        /**
         * 最大赔付倍数
         */
        this.max_lose = 1;
        /**
         * 龙虎限红
         */
        // bet_bp_low = -1;
        // bet_bp_high = -1;
        /**
         * 场子标签 1-低倍场 2-中倍场 3-高倍场
         */
        this.rateTag = 0;
        /**
         * 判断是否高倍场
         */
        // isGaobeichang() {
        // if (this.rateTag != null) {
        //     return (this.rateTag == 3);
        // }
        // return this.bet_bp_low >= 100;
        // }
        /**
         * 下注阶段总时间
         */
        this.betTotalTime = 1;
        /**
         * 是否全新数据
         */
        this.bNewData = true;
        /**
         * 自己的座位号
         */
        this.selfSrc = -1;
        /**
         * 游戏状态 0-发牌 1-开始下注动画 2-下注倒计时 3-停止下注 4-开奖 5-等待下一局
         */
        this.gameState = BbwzConstDefine_1.BbwzGameState.Deal;
        /**
         * 倒计时：秒（带小数点）
         */
        this.remainTime = 0;
        /**
         * 玩家数据集合
         */
        this.playerDataArr = [];
        /**
         * 玩家实际数据集合
         */
        /**
         * 历史结果数据集合
         */
        this.historyDataArr = [];
        /**
         * 在线玩家数量
         */
        this.onlinePlayer = 0;
        /**
         * 在线玩家列表数据
         */
        this.onLinePlayerList = [];
        /**
         * 我的当前下注数据
         */
        this.curBetData = {};
        /**
         * 我的当前续压下注数据
         */
        this.continueBetData = {};
        /**
         * 赢的区域集合
         */
        this.betAreaWinIndexs = [];
        /**
         * 结算数据
         */
        this.playerWinData = {};
        this.playerChipsFlyPos = (_a = {},
            _a[BbwzConstDefine_1.BbwzRole.Self] = new cc.Vec2(0, 0),
            _a[BbwzConstDefine_1.BbwzRole.Dealer] = new cc.Vec2(0, 0),
            _a[BbwzConstDefine_1.BbwzRole.Wiser] = new cc.Vec2(0, 0),
            _a[BbwzConstDefine_1.BbwzRole.Online] = new cc.Vec2(0, 0),
            _a[BbwzConstDefine_1.BbwzRole.Richer1] = new cc.Vec2(0, 0),
            _a[BbwzConstDefine_1.BbwzRole.Richer2] = new cc.Vec2(0, 0),
            _a[BbwzConstDefine_1.BbwzRole.Richer3] = new cc.Vec2(0, 0),
            _a[BbwzConstDefine_1.BbwzRole.Richer4] = new cc.Vec2(0, 0),
            _a[BbwzConstDefine_1.BbwzRole.Richer5] = new cc.Vec2(0, 0),
            _a);
    }
    /**
     * 正常进入游戏前初始化
     */
    BbwzData.init = function () {
        BbwzData.instance = new BbwzData();
        Game.Control.setContext(BbwzData.instance);
        BbwzData.instance.resetTableBetData();
    };
    /**
     * 得到我自己得金币数量
     */
    BbwzData.getMyGold = function () {
        return Global.PlayerData.point;
    };
    /**
     * 获取选场信息
     */
    BbwzData.getGameInfoData = function () {
        var infoData = Global.GameData.getGameInfo(BbwzConstDefine_1.default.GAME_ID);
        this.xuanchangInfoData = infoData;
        // 测试只有1个场子的情况
        // BbwzData.xuanchangInfoData.levels = [BbwzData.xuanchangInfoData.levels[0]];
    };
    /**
     * 获取当前场次小筹码样式数组
     */
    BbwzData.prototype.getBetChipsIconStr = function () {
        var arr = BbwzConstDefine_1.default.sfSmallChipStrCfg[this.chipList[0]];
        if (!arr) {
            console.error("未配置当前场的筹码样式", this.chipList);
            return BbwzConstDefine_1.default.sfSmallChipStrCfg[10000];
        }
        return arr;
    };
    /**
     * 获取当前场次大筹码样式数组
     */
    BbwzData.prototype.getSelectChipsIconStr = function () {
        var arr = BbwzConstDefine_1.default.sfBigChipStrCfg[this.chipList[0]];
        if (!arr) {
            console.error("未配置当前场的筹码样式", this.chipList);
            return BbwzConstDefine_1.default.sfBigChipStrCfg[10000];
        }
        return arr;
    };
    /**
     * 读取服务器配置
     */
    BbwzData.prototype.parseServerCfg = function (cfg) {
        this.bNewData = true;
        this.bet_min = cfg.common.bet_limit;
        this.bet_max = cfg.common.bet_max;
        this.max_lose = cfg.common.max_lose;
        // this.bet_bp_low = cfg.other.bet_min;
        // this.bet_bp_high = cfg.other.bet_max;
        this.rateTag = cfg.rate_tag;
        this.betTotalTime = cfg.stage_time.TimeBet / 1000;
        //设置筹码配置,筹码配置单位转换
        var chipList = [];
        for (var index = 0; index < cfg.chips.length; index++) {
            var chipNum = cfg.chips[index];
            chipList.push(chipNum);
        }
        this.chipList = chipList;
        //记录游戏阶段时间
        // this.time_bet = cfg.stage_time.time_bet;
        // this.time_award = cfg.stage_time.time_award;
        // this.time_prize = cfg.stage_time.time_prize;
        //断线重连 或者第一次进游戏
        this.playerDataArr = [];
        this.historyDataArr = [];
    };
    /**
     * 尝试获取传入金额最合适筹码的Index
     * @param money
     */
    BbwzData.prototype.tryRight = function (money) {
        var chipList = this.chipList;
        var chipIndex = this.tryBigest(money);
        if (chipList[chipIndex] > money) {
            chipIndex = Math.max(0, --chipIndex);
        }
        return chipIndex;
    };
    /**
     * 尝试获取传入金额最大筹码的Index,哪怕大于输入金额
     * @param money
     */
    BbwzData.prototype.tryBigest = function (money) {
        var chipList = this.chipList;
        for (var index = 0; index < chipList.length; index++) {
            if (money <= chipList[index]) {
                return index;
            }
        }
        return chipList.length - 1;
    };
    /**
     * 解析后端单个历史结果数据
     * @param obj
     */
    BbwzData.prototype.addHistory = function (obj) {
        this.historyDataArr.push(obj);
    };
    /**
     * 清理所有结果
     */
    BbwzData.prototype.clearHistory = function () {
        this.historyDataArr = [];
    };
    /**
     * 重置各区域的下注数据
     */
    BbwzData.prototype.resetTableBetData = function () {
        this.gameTableBetInfo = {};
        for (var i = 0; i < BbwzConstDefine_1.default.BET_AREA_NAME.length; i++) {
            var key = BbwzConstDefine_1.default.BET_AREA_NAME[i];
            this.gameTableBetInfo[key] =
                {
                    selfBetNum: 0,
                    smartBetNum: 0,
                    totalBetNum: 0,
                };
        }
    };
    /**
     * 更新牌桌各区域的下注数据和显示
     */
    BbwzData.prototype.setTableBetData = function (betData) {
        this.resetTableBetData();
        this.updateSelfTableData(betData.my_bet);
        //刷新牌桌智多星下注
        var wiserBetAreaArr = [];
        for (var keyName in betData.smat_bet) {
            var tableData = this.gameTableBetInfo[keyName];
            tableData.smartBetNum = betData.smat_bet[keyName];
            if (wiserBetAreaArr.indexOf(keyName) <= -1) {
                wiserBetAreaArr.push(keyName);
            }
        }
        //刷新牌桌总下注
        for (var keyName in betData.table_bet) {
            var tableData = this.gameTableBetInfo[keyName];
            tableData.totalBetNum = betData.table_bet[keyName];
        }
        if (this.bNewData) {
            this.bNewData = false;
            //断线重连或第一次进入游戏
            //更新筹码显示
            if (BbwzDriver_1.default.instance.chipManager)
                BbwzDriver_1.default.instance.chipManager.updateUI();
            //更新智多星下注在牌桌的显示
            if (wiserBetAreaArr.length > 0) {
                BbwzDriver_1.default.instance.gameUI.showWiserStar(false, wiserBetAreaArr);
            }
        }
    };
    /**
     * 更新各个区域内自己的下注数据
     */
    BbwzData.prototype.updateSelfTableData = function (my_bet) {
        for (var keyName in my_bet) {
            var tableData = this.gameTableBetInfo[keyName];
            tableData.selfBetNum = my_bet[keyName];
        }
    };
    /**
     * 更新自己当前下注数据
     */
    BbwzData.prototype.updateCurData = function (my_bet) {
        this.curBetData = {};
        for (var betAreaName in my_bet) {
            var betCount = my_bet[betAreaName];
            if (betCount <= 0)
                continue;
            this.curBetData[betAreaName] = betCount;
        }
    };
    /**
     * 得到我的当前下注总额
     */
    BbwzData.prototype.getMyTotalBet = function () {
        var result = 0;
        for (var keyName in this.gameTableBetInfo) {
            var tableData = this.gameTableBetInfo[keyName];
            result += tableData.selfBetNum;
        }
        return result;
    };
    /**
     *  更新上一次续压数据
     */
    BbwzData.prototype.updatePreContinueData = function (my_curr_bet) {
        if (!Global.Toolkit.isEmptyObject(my_curr_bet)) {
            //如果本局有下注的情况下就清空续压数据
            this.continueBetData = {};
            return;
        }
        //将上一局的本局下注数据记录成续压数据
        this.continueBetData = this.curBetData;
    };
    /**
     * 能否续压
     */
    BbwzData.prototype.canContinueBet = function () {
        if (!this.isBetEnable())
            return false;
        var betCount = 0;
        for (var key in this.continueBetData) {
            var bet = this.continueBetData[key];
            betCount += bet;
        }
        if (betCount > 0) {
            var myGold = BbwzData.getMyGold();
            var maxTotalBet = Math.min(BbwzData.instance.bet_max, myGold / BbwzData.instance.max_lose); //我的最大可下注额
            return betCount <= maxTotalBet;
        }
        return false;
    };
    BbwzData.prototype.isBetEnable = function () {
        return this.gameState == BbwzConstDefine_1.BbwzGameState.Bet;
    };
    /**
     * 请求下注
     */
    BbwzData.prototype.reqBet = function (chip, betArea) {
        if (!this.isBetEnable())
            return false;
        var myGold = BbwzData.getMyGold();
        if (myGold < this.bet_min) {
            //自身携带金额不足下注最小携带限额
            Global.UI.fastTip(this.bet_min / Global.Setting.glodRatio + "元余额以上才可下注，请您充值哦！");
            return false;
        }
        if (chip > myGold) {
            Global.UI.fastTip("余额不足，请您充值哦！");
            return false;
        }
        var myTotalBet = BbwzData.instance.getMyTotalBet();
        if (chip + myTotalBet > BbwzData.instance.bet_max) {
            Global.UI.fastTip("您的下注已达到上限！");
            return false;
        }
        var maxTotalBet = (myGold + myTotalBet) / BbwzData.instance.max_lose; //我的最大可下注额
        if (chip + myTotalBet > maxTotalBet) {
            Global.UI.fastTip("身上余额不够下注最大赔付！");
            return false;
        }
        var bets = [];
        var myBetInfo = {};
        myBetInfo["k"] = "" + betArea;
        myBetInfo["v"] = chip;
        bets.push(myBetInfo);
        //向服务器请求下注
        var _param = { "gameid": BbwzConstDefine_1.default.GAME_ID, "bets": bets };
        Game.Server.send(BbwzConstDefine_1.default.SEND_BET, _param);
        //清空续压数据，每一局有任意下注后无法续压
        this.continueBetData = {};
        return true;
    };
    /**
     * 请求续压
     */
    BbwzData.prototype.reqContinueBet = function () {
        if (!this.canContinueBet()) {
            return;
        }
        var bets = [];
        for (var betAreaName in this.continueBetData) {
            var money = this.continueBetData[betAreaName];
            if (money > 0) {
                var myBetInfo = {};
                myBetInfo["k"] = "" + betAreaName;
                myBetInfo["v"] = money;
                bets.push(myBetInfo);
                while (money > 0) {
                    var betIndex = this.tryRight(money);
                    var betValue = this.chipList[betIndex];
                    money -= betValue;
                    //添加飞筹码数据
                    BbwzBetManager_1.default.addBetQueue(BbwzConstDefine_1.BbwzRole.Self, betAreaName, betValue);
                }
            }
        }
        //向服务器请求下注
        var _param = { "gameid": BbwzConstDefine_1.default.GAME_ID, "bets": bets };
        Game.Server.send(BbwzConstDefine_1.default.SEND_BET, _param);
        //清空续压数据，每一局只能续压一次
        this.continueBetData = {};
    };
    /**
     * 设置 【赢】 的区域
     */
    BbwzData.prototype.setWinAreaWinIndexs = function (hit) {
        this.betAreaWinIndexs = [];
        for (var keyName in hit) {
            var areaIndex = BbwzConstDefine_1.default.BET_AREA_NAME.indexOf(keyName);
            var result = hit[keyName];
            if (result.hit == 1 && areaIndex > -1) { // 过滤掉庄家hit
                this.betAreaWinIndexs.push(areaIndex);
            }
        }
    };
    /**
     * 设置所有玩家的结算数据
     * @param data
     */
    BbwzData.prototype.setWinPlayerData = function (data) {
        this.playerWinData = {};
        this.playerWinData[0] = data.my_win;
        this.playerWinData.point = data.point;
        for (var index = 0; index < data.top_win.length; index++) {
            var severdata = data.top_win[index];
            var playerIndex = severdata.chair;
            this.playerWinData[playerIndex] = severdata;
            //更新其他玩家金币（用于点击玩家头像弹出tips详情）
            var player = this.playerDataArr[playerIndex];
            if (player) {
                for (var key in severdata.bet_win) {
                    var betWin = severdata.bet_win[key];
                    player.point += betWin;
                }
            }
        }
    };
    /**
     * 全局数据对象，所有需要的数据都从此处往下找
     */
    BbwzData.instance = null;
    /**
     * 选场信息
     */
    BbwzData.xuanchangInfoData = null;
    return BbwzData;
}());
exports.default = BbwzData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcZGF0YVxcQmJ3ekRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBNkU7QUFDN0UsNENBQXVDO0FBQ3ZDLDREQUF1RDtBQUd2RDs7R0FFRztBQUNIO0lBQUE7O1FBcUNJLHNIQUFzSDtRQUN0SDs7V0FFRztRQUNILGtCQUFhLEdBQVEsSUFBSSxDQUFDO1FBRTFCOztXQUVHO1FBQ0ksYUFBUSxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzVEOztXQUVHO1FBQ0ksdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQzlCOztXQUVHO1FBQ0ksdUJBQWtCLEdBQUcsRUFFM0IsQ0FBQztRQXdCRjs7V0FFRztRQUNILFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZjs7V0FFRztRQUNILFlBQU8sR0FBRyxDQUFDLENBQUM7UUFFWjs7V0FFRztRQUNILGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYjs7V0FFRztRQUNILG1CQUFtQjtRQUNuQixvQkFBb0I7UUFFcEI7O1dBRUc7UUFDSCxZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRVo7O1dBRUc7UUFDSCxvQkFBb0I7UUFDaEIsOEJBQThCO1FBQzlCLGtDQUFrQztRQUNsQyxJQUFJO1FBQ0osaUNBQWlDO1FBQ3JDLElBQUk7UUFFSjs7V0FFRztRQUNILGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBaUVqQjs7V0FFRztRQUNILGFBQVEsR0FBWSxJQUFJLENBQUM7UUFFekI7O1dBRUc7UUFDSCxZQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFYjs7V0FFRztRQUNJLGNBQVMsR0FBRywrQkFBYSxDQUFDLElBQUksQ0FBQztRQUN0Qzs7V0FFRztRQUNILGVBQVUsR0FBRyxDQUFDLENBQUM7UUFFZjs7V0FFRztRQUNILGtCQUFhLEdBQVUsRUFBRSxDQUFDO1FBQzFC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QWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEMsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3RELElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEMsSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztZQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLFNBQVMsQ0FBQztZQUU1Qyw0QkFBNEI7WUFDNUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM3QyxJQUFJLE1BQU0sRUFBRTtnQkFDUixLQUFLLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUU7b0JBQy9CLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3BDLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDO2lCQUMxQjthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBOWVEOztPQUVHO0lBQ0ksaUJBQVEsR0FBYSxJQUFJLENBQUM7SUFtQmpDOztPQUVHO0lBQ0ksMEJBQWlCLEdBQVEsSUFBSSxDQUFDO0lBaWV6QyxlQUFDO0NBM2ZELEFBMmZDLElBQUE7a0JBM2ZvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJid3pDb25zdERlZmluZSwgeyBCYnd6Um9sZSwgQmJ3ekdhbWVTdGF0ZSB9IGZyb20gXCIuL0Jid3pDb25zdERlZmluZVwiO1xyXG5pbXBvcnQgQmJ3ekRyaXZlciBmcm9tIFwiLi4vQmJ3ekRyaXZlclwiO1xyXG5pbXBvcnQgQmJ3ekJldE1hbmFnZXIgZnJvbSBcIi4uL21hbmFnZXIvQmJ3ekJldE1hbmFnZXJcIjtcclxuXHJcblxyXG4vKipcclxuICog5YWo5bGA5pWw5o2u57G7XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYnd6RGF0YSB7XHJcbiAgICAvKipcclxuICAgICAqIOWFqOWxgOaVsOaNruWvueixoe+8jOaJgOaciemcgOimgeeahOaVsOaNrumDveS7juatpOWkhOW+gOS4i+aJvlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaW5zdGFuY2U6IEJid3pEYXRhID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOato+W4uOi/m+WFpea4uOaIj+WJjeWIneWni+WMllxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaW5pdCgpIHtcclxuICAgICAgICBCYnd6RGF0YS5pbnN0YW5jZSA9IG5ldyBCYnd6RGF0YSgpO1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5zZXRDb250ZXh0KEJid3pEYXRhLmluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgQmJ3ekRhdGEuaW5zdGFuY2UucmVzZXRUYWJsZUJldERhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW+l+WIsOaIkeiHquW3seW+l+mHkeW4geaVsOmHj1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0TXlHb2xkKCkge1xyXG4gICAgICAgIHJldHVybiBHbG9iYWwuUGxheWVyRGF0YS5wb2ludDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAieWcuuS/oeaBr1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgeHVhbmNoYW5nSW5mb0RhdGE6IGFueSA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlumAieWcuuS/oeaBr1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0R2FtZUluZm9EYXRhKCkge1xyXG4gICAgICAgIGxldCBpbmZvRGF0YSA9IEdsb2JhbC5HYW1lRGF0YS5nZXRHYW1lSW5mbyhCYnd6Q29uc3REZWZpbmUuR0FNRV9JRCk7XHJcbiAgICAgICAgdGhpcy54dWFuY2hhbmdJbmZvRGF0YSA9IGluZm9EYXRhO1xyXG4gICAgICAgIC8vIOa1i+ivleWPquaciTHkuKrlnLrlrZDnmoTmg4XlhrVcclxuICAgICAgICAvLyBCYnd6RGF0YS54dWFuY2hhbmdJbmZvRGF0YS5sZXZlbHMgPSBbQmJ3ekRhdGEueHVhbmNoYW5nSW5mb0RhdGEubGV2ZWxzWzBdXTtcclxuICAgIH1cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIOa4uOaIj+mFjee9riAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8qKlxyXG4gICAgICog5oi/6Ze06YWN572u5a+56LGhXHJcbiAgICAgKi9cclxuICAgIHNlcnZlckdhbWVDZmc6IGFueSA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlKjmnaXkuIvms6jnmoTnrbnnoIFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoaXBMaXN0ID0gWzEwMDAwLCAxMDAwMDAsIDUwMDAwMCwgMTAwMDAwMCwgNTAwMDAwMF07XHJcbiAgICAvKipcclxuICAgICAqIOeUqOadpeiusOW9leW9k+WJjemAieS4reeahOetueeggee0ouW8lVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY3VycmVudFNlbGVjdEluZGV4ID0gMDtcclxuICAgIC8qKlxyXG4gICAgICog5bqV6YOo562556CB5LiW55WM5Z2Q5qCH6K6w5b2VIOetueeggeWAvC3kuJbnlYzlnZDmoIdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlbGVjdENoaXBXb2xyZFBvcyA9IHtcclxuXHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blvZPliY3lnLrmrKHlsI/nrbnnoIHmoLflvI/mlbDnu4RcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEJldENoaXBzSWNvblN0cigpe1xyXG4gICAgICAgIGxldCBhcnIgPSBCYnd6Q29uc3REZWZpbmUuc2ZTbWFsbENoaXBTdHJDZmdbdGhpcy5jaGlwTGlzdFswXV07XHJcbiAgICAgICAgaWYgKCFhcnIpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5pyq6YWN572u5b2T5YmN5Zy655qE562556CB5qC35byPXCIsIHRoaXMuY2hpcExpc3QpO1xyXG4gICAgICAgICAgICByZXR1cm4gQmJ3ekNvbnN0RGVmaW5lLnNmU21hbGxDaGlwU3RyQ2ZnWzEwMDAwXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5b2T5YmN5Zy65qyh5aSn562556CB5qC35byP5pWw57uEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTZWxlY3RDaGlwc0ljb25TdHIoKXtcclxuICAgICAgICBsZXQgYXJyID0gQmJ3ekNvbnN0RGVmaW5lLnNmQmlnQ2hpcFN0ckNmZ1t0aGlzLmNoaXBMaXN0WzBdXTtcclxuICAgICAgICBpZiAoIWFycil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmnKrphY3nva7lvZPliY3lnLrnmoTnrbnnoIHmoLflvI9cIiwgdGhpcy5jaGlwTGlzdCk7XHJcbiAgICAgICAgICAgIHJldHVybiBCYnd6Q29uc3REZWZpbmUuc2ZCaWdDaGlwU3RyQ2ZnWzEwMDAwXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4i+azqOaAu+S4iumZkFxyXG4gICAgICovXHJcbiAgICBiZXRfbWF4ID0gMTAwMDtcclxuICAgIC8qKlxyXG4gICAgICog5LiL5rOo5pyA5bCP5pC65bim6ZmQ6aKdXHJcbiAgICAgKi9cclxuICAgIGJldF9taW4gPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pyA5aSn6LWU5LuY5YCN5pWwXHJcbiAgICAgKi9cclxuICAgIG1heF9sb3NlID0gMTtcclxuICAgIC8qKlxyXG4gICAgICog6b6Z6JmO6ZmQ57qiXHJcbiAgICAgKi9cclxuICAgIC8vIGJldF9icF9sb3cgPSAtMTtcclxuICAgIC8vIGJldF9icF9oaWdoID0gLTE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnLrlrZDmoIfnrb4gMS3kvY7lgI3lnLogMi3kuK3lgI3lnLogMy3pq5jlgI3lnLpcclxuICAgICAqL1xyXG4gICAgcmF0ZVRhZyA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3mmK/lkKbpq5jlgI3lnLpcclxuICAgICAqL1xyXG4gICAgLy8gaXNHYW9iZWljaGFuZygpIHtcclxuICAgICAgICAvLyBpZiAodGhpcy5yYXRlVGFnICE9IG51bGwpIHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuICh0aGlzLnJhdGVUYWcgPT0gMyk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIHJldHVybiB0aGlzLmJldF9icF9sb3cgPj0gMTAwO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiL5rOo6Zi25q615oC75pe26Ze0XHJcbiAgICAgKi9cclxuICAgIGJldFRvdGFsVGltZSA9IDE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDor7vlj5bmnI3liqHlmajphY3nva5cclxuICAgICAqL1xyXG4gICAgcGFyc2VTZXJ2ZXJDZmcoY2ZnKSB7XHJcbiAgICAgICAgdGhpcy5iTmV3RGF0YSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuYmV0X21pbiA9IGNmZy5jb21tb24uYmV0X2xpbWl0O1xyXG4gICAgICAgIHRoaXMuYmV0X21heCA9IGNmZy5jb21tb24uYmV0X21heDtcclxuXHJcbiAgICAgICAgdGhpcy5tYXhfbG9zZSA9IGNmZy5jb21tb24ubWF4X2xvc2U7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuYmV0X2JwX2xvdyA9IGNmZy5vdGhlci5iZXRfbWluO1xyXG4gICAgICAgIC8vIHRoaXMuYmV0X2JwX2hpZ2ggPSBjZmcub3RoZXIuYmV0X21heDtcclxuXHJcbiAgICAgICAgdGhpcy5yYXRlVGFnID0gY2ZnLnJhdGVfdGFnO1xyXG5cclxuICAgICAgICB0aGlzLmJldFRvdGFsVGltZSA9IGNmZy5zdGFnZV90aW1lLlRpbWVCZXQgLyAxMDAwO1xyXG5cclxuICAgICAgICAvL+iuvue9ruetueeggemFjee9riznrbnnoIHphY3nva7ljZXkvY3ovazmjaJcclxuICAgICAgICBsZXQgY2hpcExpc3QgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY2ZnLmNoaXBzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBjb25zdCBjaGlwTnVtID0gY2ZnLmNoaXBzW2luZGV4XTtcclxuICAgICAgICAgICAgY2hpcExpc3QucHVzaChjaGlwTnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGlwTGlzdCA9IGNoaXBMaXN0O1xyXG4gICAgICAgIC8v6K6w5b2V5ri45oiP6Zi25q615pe26Ze0XHJcbiAgICAgICAgLy8gdGhpcy50aW1lX2JldCA9IGNmZy5zdGFnZV90aW1lLnRpbWVfYmV0O1xyXG4gICAgICAgIC8vIHRoaXMudGltZV9hd2FyZCA9IGNmZy5zdGFnZV90aW1lLnRpbWVfYXdhcmQ7XHJcbiAgICAgICAgLy8gdGhpcy50aW1lX3ByaXplID0gY2ZnLnN0YWdlX3RpbWUudGltZV9wcml6ZTtcclxuXHJcblxyXG4gICAgICAgIC8v5pat57q/6YeN6L+eIOaIluiAheesrOS4gOasoei/m+a4uOaIj1xyXG4gICAgICAgIHRoaXMucGxheWVyRGF0YUFyciA9IFtdO1xyXG4gICAgICAgIHRoaXMuaGlzdG9yeURhdGFBcnIgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWwneivleiOt+WPluS8oOWFpemHkemineacgOWQiOmAguetueeggeeahEluZGV4XHJcbiAgICAgKiBAcGFyYW0gbW9uZXkgXHJcbiAgICAgKi9cclxuICAgIHRyeVJpZ2h0KG1vbmV5OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgY2hpcExpc3QgPSB0aGlzLmNoaXBMaXN0O1xyXG4gICAgICAgIGxldCBjaGlwSW5kZXggPSB0aGlzLnRyeUJpZ2VzdChtb25leSk7XHJcbiAgICAgICAgaWYgKGNoaXBMaXN0W2NoaXBJbmRleF0gPiBtb25leSkge1xyXG4gICAgICAgICAgICBjaGlwSW5kZXggPSBNYXRoLm1heCgwLCAtLWNoaXBJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjaGlwSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsJ3or5Xojrflj5bkvKDlhaXph5Hpop3mnIDlpKfnrbnnoIHnmoRJbmRleCzlk6rmgJXlpKfkuo7ovpPlhaXph5Hpop1cclxuICAgICAqIEBwYXJhbSBtb25leSBcclxuICAgICAqL1xyXG4gICAgdHJ5QmlnZXN0KG1vbmV5OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgY2hpcExpc3QgPSB0aGlzLmNoaXBMaXN0O1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjaGlwTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKG1vbmV5IDw9IGNoaXBMaXN0W2luZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjaGlwTGlzdC5sZW5ndGggLSAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5YWo5paw5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIGJOZXdEYXRhOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDoh6rlt7HnmoTluqfkvY3lj7dcclxuICAgICAqL1xyXG4gICAgc2VsZlNyYyA9IC0xO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ri45oiP54q25oCBIDAt5Y+R54mMIDEt5byA5aeL5LiL5rOo5Yqo55S7IDIt5LiL5rOo5YCS6K6h5pe2IDMt5YGc5q2i5LiL5rOoIDQt5byA5aWWIDUt562J5b6F5LiL5LiA5bGAXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnYW1lU3RhdGUgPSBCYnd6R2FtZVN0YXRlLkRlYWw7XHJcbiAgICAvKipcclxuICAgICAqIOWAkuiuoeaXtu+8muenku+8iOW4puWwj+aVsOeCue+8iVxyXG4gICAgICovXHJcbiAgICByZW1haW5UaW1lID0gMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeOqeWutuaVsOaNrumbhuWQiFxyXG4gICAgICovXHJcbiAgICBwbGF5ZXJEYXRhQXJyOiBhbnlbXSA9IFtdO1xyXG4gICAgLyoqXHJcbiAgICAgKiDnjqnlrrblrp7pmYXmlbDmja7pm4blkIhcclxuICAgICAqL1xyXG4gICAgLyoqXHJcbiAgICAgKiDljoblj7Lnu5PmnpzmlbDmja7pm4blkIhcclxuICAgICAqL1xyXG4gICAgaGlzdG9yeURhdGFBcnI6IGFueVtdID0gW107XHJcbiAgICAvKipcclxuICAgICAqIOino+aekOWQjuerr+WNleS4quWOhuWPsue7k+aenOaVsOaNrlxyXG4gICAgICogQHBhcmFtIG9iaiBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZEhpc3Rvcnkob2JqKSB7XHJcbiAgICAgICAgdGhpcy5oaXN0b3J5RGF0YUFyci5wdXNoKG9iaik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXnkIbmiYDmnInnu5PmnpxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsZWFySGlzdG9yeSgpIHtcclxuICAgICAgICB0aGlzLmhpc3RvcnlEYXRhQXJyID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKjnur/njqnlrrbmlbDph49cclxuICAgICAqL1xyXG4gICAgb25saW5lUGxheWVyID0gMDtcclxuICAgIC8qKlxyXG4gICAgICog5Zyo57q/546p5a625YiX6KGo5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIG9uTGluZVBsYXllckxpc3QgPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4uOaIj+WQhOWMuuWfn+S4i+azqOaAu+aVsOaNrlxyXG4gICAgICovXHJcbiAgICBnYW1lVGFibGVCZXRJbmZvOiBhbnk7XHJcbiAgICAvKipcclxuICAgICAqIOmHjee9ruWQhOWMuuWfn+eahOS4i+azqOaVsOaNrlxyXG4gICAgICovXHJcbiAgICByZXNldFRhYmxlQmV0RGF0YSgpIHtcclxuICAgICAgICB0aGlzLmdhbWVUYWJsZUJldEluZm8gPSB7fTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEJid3pDb25zdERlZmluZS5CRVRfQVJFQV9OQU1FLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXkgPSBCYnd6Q29uc3REZWZpbmUuQkVUX0FSRUFfTkFNRVtpXTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lVGFibGVCZXRJbmZvW2tleV0gPVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxmQmV0TnVtOiAwLFxyXG4gICAgICAgICAgICAgICAgc21hcnRCZXROdW06IDAsXHJcbiAgICAgICAgICAgICAgICB0b3RhbEJldE51bTogMCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOabtOaWsOeJjOahjOWQhOWMuuWfn+eahOS4i+azqOaVsOaNruWSjOaYvuekulxyXG4gICAgICovXHJcbiAgICBzZXRUYWJsZUJldERhdGEoYmV0RGF0YSkge1xyXG4gICAgICAgIHRoaXMucmVzZXRUYWJsZUJldERhdGEoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGZUYWJsZURhdGEoYmV0RGF0YS5teV9iZXQpO1xyXG4gICAgICAgIC8v5Yi35paw54mM5qGM5pm65aSa5pif5LiL5rOoXHJcbiAgICAgICAgbGV0IHdpc2VyQmV0QXJlYUFyciA9IFtdO1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5TmFtZSBpbiBiZXREYXRhLnNtYXRfYmV0KSB7XHJcbiAgICAgICAgICAgIGxldCB0YWJsZURhdGEgPSB0aGlzLmdhbWVUYWJsZUJldEluZm9ba2V5TmFtZV07XHJcbiAgICAgICAgICAgIHRhYmxlRGF0YS5zbWFydEJldE51bSA9IGJldERhdGEuc21hdF9iZXRba2V5TmFtZV07XHJcbiAgICAgICAgICAgIGlmICh3aXNlckJldEFyZWFBcnIuaW5kZXhPZihrZXlOYW1lKSA8PSAtMSl7XHJcbiAgICAgICAgICAgICAgICB3aXNlckJldEFyZWFBcnIucHVzaChrZXlOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WIt+aWsOeJjOahjOaAu+S4i+azqFxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5TmFtZSBpbiBiZXREYXRhLnRhYmxlX2JldCkge1xyXG4gICAgICAgICAgICBsZXQgdGFibGVEYXRhID0gdGhpcy5nYW1lVGFibGVCZXRJbmZvW2tleU5hbWVdO1xyXG4gICAgICAgICAgICB0YWJsZURhdGEudG90YWxCZXROdW0gPSBiZXREYXRhLnRhYmxlX2JldFtrZXlOYW1lXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmJOZXdEYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYk5ld0RhdGEgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8v5pat57q/6YeN6L+e5oiW56ys5LiA5qyh6L+b5YWl5ri45oiPXHJcbiAgICAgICAgICAgIC8v5pu05paw562556CB5pi+56S6XHJcbiAgICAgICAgICAgIGlmIChCYnd6RHJpdmVyLmluc3RhbmNlLmNoaXBNYW5hZ2VyKVxyXG4gICAgICAgICAgICAgICAgQmJ3ekRyaXZlci5pbnN0YW5jZS5jaGlwTWFuYWdlci51cGRhdGVVSSgpO1xyXG5cclxuICAgICAgICAgICAgLy/mm7TmlrDmmbrlpJrmmJ/kuIvms6jlnKjniYzmoYznmoTmmL7npLpcclxuICAgICAgICAgICAgaWYgKHdpc2VyQmV0QXJlYUFyci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLmdhbWVVSS5zaG93V2lzZXJTdGFyKGZhbHNlLCB3aXNlckJldEFyZWFBcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pu05paw5ZCE5Liq5Yy65Z+f5YaF6Ieq5bex55qE5LiL5rOo5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVNlbGZUYWJsZURhdGEobXlfYmV0KSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXlOYW1lIGluIG15X2JldCkge1xyXG4gICAgICAgICAgICBsZXQgdGFibGVEYXRhID0gdGhpcy5nYW1lVGFibGVCZXRJbmZvW2tleU5hbWVdO1xyXG4gICAgICAgICAgICB0YWJsZURhdGEuc2VsZkJldE51bSA9IG15X2JldFtrZXlOYW1lXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiJHnmoTlvZPliY3kuIvms6jmlbDmja5cclxuICAgICAqL1xyXG4gICAgY3VyQmV0RGF0YTogYW55ID0ge307XHJcbiAgICAvKipcclxuICAgICAqIOaIkeeahOW9k+WJjee7reWOi+S4i+azqOaVsOaNrlxyXG4gICAgICovXHJcbiAgICBjb250aW51ZUJldERhdGE6IGFueSA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pu05paw6Ieq5bex5b2T5YmN5LiL5rOo5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZUN1ckRhdGEobXlfYmV0OiBhbnkpIHtcclxuICAgICAgICB0aGlzLmN1ckJldERhdGEgPSB7fTtcclxuICAgICAgICBmb3IgKGNvbnN0IGJldEFyZWFOYW1lIGluIG15X2JldCkge1xyXG4gICAgICAgICAgICBsZXQgYmV0Q291bnQgPSBteV9iZXRbYmV0QXJlYU5hbWVdO1xyXG4gICAgICAgICAgICBpZiAoYmV0Q291bnQgPD0gMCkgY29udGludWU7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyQmV0RGF0YVtiZXRBcmVhTmFtZV0gPSBiZXRDb3VudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvpfliLDmiJHnmoTlvZPliY3kuIvms6jmgLvpop1cclxuICAgICAqL1xyXG4gICAgZ2V0TXlUb3RhbEJldCgpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gMDtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleU5hbWUgaW4gdGhpcy5nYW1lVGFibGVCZXRJbmZvKSB7XHJcbiAgICAgICAgICAgIGxldCB0YWJsZURhdGEgPSB0aGlzLmdhbWVUYWJsZUJldEluZm9ba2V5TmFtZV07XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSB0YWJsZURhdGEuc2VsZkJldE51bTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICDmm7TmlrDkuIrkuIDmrKHnu63ljovmlbDmja5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlUHJlQ29udGludWVEYXRhKG15X2N1cnJfYmV0OiBhbnkpIHtcclxuICAgICAgICBpZiAoIUdsb2JhbC5Ub29sa2l0LmlzRW1wdHlPYmplY3QobXlfY3Vycl9iZXQpKSB7XHJcbiAgICAgICAgICAgIC8v5aaC5p6c5pys5bGA5pyJ5LiL5rOo55qE5oOF5Ya15LiL5bCx5riF56m657ut5Y6L5pWw5o2uXHJcbiAgICAgICAgICAgIHRoaXMuY29udGludWVCZXREYXRhID0ge307XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lsIbkuIrkuIDlsYDnmoTmnKzlsYDkuIvms6jmlbDmja7orrDlvZXmiJDnu63ljovmlbDmja5cclxuICAgICAgICB0aGlzLmNvbnRpbnVlQmV0RGF0YSA9IHRoaXMuY3VyQmV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogXHJcbiAgICAgKiDog73lkKbnu63ljosgXHJcbiAgICAgKi9cclxuICAgIGNhbkNvbnRpbnVlQmV0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0JldEVuYWJsZSgpKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGJldENvdW50ID0gMDtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmNvbnRpbnVlQmV0RGF0YSkge1xyXG4gICAgICAgICAgICBjb25zdCBiZXQgPSB0aGlzLmNvbnRpbnVlQmV0RGF0YVtrZXldO1xyXG4gICAgICAgICAgICBiZXRDb3VudCArPSBiZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChiZXRDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IG15R29sZCA9IEJid3pEYXRhLmdldE15R29sZCgpO1xyXG4gICAgICAgICAgICBsZXQgbWF4VG90YWxCZXQgPSBNYXRoLm1pbihCYnd6RGF0YS5pbnN0YW5jZS5iZXRfbWF4LCBteUdvbGQgLyBCYnd6RGF0YS5pbnN0YW5jZS5tYXhfbG9zZSk7ICAgIC8v5oiR55qE5pyA5aSn5Y+v5LiL5rOo6aKdXHJcbiAgICAgICAgICAgIHJldHVybiBiZXRDb3VudCA8PSBtYXhUb3RhbEJldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0JldEVuYWJsZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVTdGF0ZSA9PSBCYnd6R2FtZVN0YXRlLkJldDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOivt+axguS4i+azqFxyXG4gICAgICovXHJcbiAgICByZXFCZXQoY2hpcDogbnVtYmVyLCBiZXRBcmVhOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNCZXRFbmFibGUoKSkgXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgbGV0IG15R29sZDogbnVtYmVyID0gQmJ3ekRhdGEuZ2V0TXlHb2xkKCk7XHJcbiAgICAgICAgaWYgKG15R29sZCA8IHRoaXMuYmV0X21pbikge1xyXG4gICAgICAgICAgICAvL+iHqui6q+aQuuW4pumHkemineS4jei2s+S4i+azqOacgOWwj+aQuuW4pumZkOminVxyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcCh0aGlzLmJldF9taW4gLyBHbG9iYWwuU2V0dGluZy5nbG9kUmF0aW8gKyBcIuWFg+S9memineS7peS4iuaJjeWPr+S4i+azqO+8jOivt+aCqOWFheWAvOWTpu+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hpcCA+IG15R29sZCkge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuS9memineS4jei2s++8jOivt+aCqOWFheWAvOWTpu+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbXlUb3RhbEJldCA9IEJid3pEYXRhLmluc3RhbmNlLmdldE15VG90YWxCZXQoKTtcclxuICAgICAgICBpZiAoY2hpcCArIG15VG90YWxCZXQgPiBCYnd6RGF0YS5pbnN0YW5jZS5iZXRfbWF4KSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5oKo55qE5LiL5rOo5bey6L6+5Yiw5LiK6ZmQ77yBXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWF4VG90YWxCZXQgPSAobXlHb2xkICsgbXlUb3RhbEJldCkgLyBCYnd6RGF0YS5pbnN0YW5jZS5tYXhfbG9zZTsgICAgLy/miJHnmoTmnIDlpKflj6/kuIvms6jpop1cclxuICAgICAgICBpZiAoY2hpcCArIG15VG90YWxCZXQgPiBtYXhUb3RhbEJldCkge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIui6q+S4iuS9memineS4jeWkn+S4i+azqOacgOWkp+i1lOS7mO+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJldHMgPSBbXTtcclxuICAgICAgICBsZXQgbXlCZXRJbmZvID0ge307XHJcbiAgICAgICAgbXlCZXRJbmZvW1wia1wiXSA9IFwiXCIgKyBiZXRBcmVhO1xyXG4gICAgICAgIG15QmV0SW5mb1tcInZcIl0gPSBjaGlwO1xyXG4gICAgICAgIGJldHMucHVzaChteUJldEluZm8pO1xyXG4gICAgICAgIC8v5ZCR5pyN5Yqh5Zmo6K+35rGC5LiL5rOoXHJcbiAgICAgICAgbGV0IF9wYXJhbSA9IHsgXCJnYW1laWRcIjogQmJ3ekNvbnN0RGVmaW5lLkdBTUVfSUQsIFwiYmV0c1wiOiBiZXRzIH07XHJcbiAgICAgICAgR2FtZS5TZXJ2ZXIuc2VuZChCYnd6Q29uc3REZWZpbmUuU0VORF9CRVQsIF9wYXJhbSk7XHJcblxyXG4gICAgICAgIC8v5riF56m657ut5Y6L5pWw5o2u77yM5q+P5LiA5bGA5pyJ5Lu75oSP5LiL5rOo5ZCO5peg5rOV57ut5Y6LXHJcbiAgICAgICAgdGhpcy5jb250aW51ZUJldERhdGEgPSB7fTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDor7fmsYLnu63ljotcclxuICAgICAqL1xyXG4gICAgcmVxQ29udGludWVCZXQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNhbkNvbnRpbnVlQmV0KCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYmV0cyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGJldEFyZWFOYW1lIGluIHRoaXMuY29udGludWVCZXREYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBtb25leSA9IHRoaXMuY29udGludWVCZXREYXRhW2JldEFyZWFOYW1lXTtcclxuICAgICAgICAgICAgaWYgKG1vbmV5ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG15QmV0SW5mbyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgbXlCZXRJbmZvW1wia1wiXSA9IFwiXCIgKyBiZXRBcmVhTmFtZTtcclxuICAgICAgICAgICAgICAgIG15QmV0SW5mb1tcInZcIl0gPSBtb25leTtcclxuICAgICAgICAgICAgICAgIGJldHMucHVzaChteUJldEluZm8pO1xyXG5cclxuICAgICAgICAgICAgICAgIHdoaWxlIChtb25leSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYmV0SW5kZXggPSB0aGlzLnRyeVJpZ2h0KG1vbmV5KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYmV0VmFsdWUgPSB0aGlzLmNoaXBMaXN0W2JldEluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBtb25leSAtPSBiZXRWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvL+a3u+WKoOmjnuetueeggeaVsOaNrlxyXG4gICAgICAgICAgICAgICAgICAgIEJid3pCZXRNYW5hZ2VyLmFkZEJldFF1ZXVlKEJid3pSb2xlLlNlbGYsIGJldEFyZWFOYW1lLCBiZXRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lkJHmnI3liqHlmajor7fmsYLkuIvms6hcclxuICAgICAgICBsZXQgX3BhcmFtID0geyBcImdhbWVpZFwiOiBCYnd6Q29uc3REZWZpbmUuR0FNRV9JRCwgXCJiZXRzXCI6IGJldHMgfTtcclxuICAgICAgICBHYW1lLlNlcnZlci5zZW5kKEJid3pDb25zdERlZmluZS5TRU5EX0JFVCwgX3BhcmFtKTtcclxuXHJcbiAgICAgICAgLy/muIXnqbrnu63ljovmlbDmja7vvIzmr4/kuIDlsYDlj6rog73nu63ljovkuIDmrKFcclxuICAgICAgICB0aGlzLmNvbnRpbnVlQmV0RGF0YSA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6LWi55qE5Yy65Z+f6ZuG5ZCIXHJcbiAgICAgKi9cclxuICAgIGJldEFyZWFXaW5JbmRleHM6IG51bWJlcltdID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva4g44CQ6LWi44CRIOeahOWMuuWfn1xyXG4gICAgICovXHJcbiAgICBzZXRXaW5BcmVhV2luSW5kZXhzKGhpdCkge1xyXG4gICAgICAgIHRoaXMuYmV0QXJlYVdpbkluZGV4cyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGtleU5hbWUgaW4gaGl0KSB7XHJcbiAgICAgICAgICAgIGxldCBhcmVhSW5kZXggPSBCYnd6Q29uc3REZWZpbmUuQkVUX0FSRUFfTkFNRS5pbmRleE9mKGtleU5hbWUpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gaGl0W2tleU5hbWVdO1xyXG4gICAgICAgICAgICBpZihyZXN1bHQuaGl0ID09IDEgJiYgYXJlYUluZGV4ID4gLTEpeyAgICAgIC8vIOi/h+a7pOaOieW6hOWutmhpdFxyXG4gICAgICAgICAgICAgICAgdGhpcy5iZXRBcmVhV2luSW5kZXhzLnB1c2goYXJlYUluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe7k+eul+aVsOaNrlxyXG4gICAgICovXHJcbiAgICBwbGF5ZXJXaW5EYXRhOiBhbnkgPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruaJgOacieeOqeWutueahOe7k+eul+aVsOaNrlxyXG4gICAgICogQHBhcmFtIGRhdGEgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRXaW5QbGF5ZXJEYXRhKGRhdGEpIHtcclxuICAgICAgICB0aGlzLnBsYXllcldpbkRhdGEgPSB7fTtcclxuICAgICAgICB0aGlzLnBsYXllcldpbkRhdGFbMF0gPSBkYXRhLm15X3dpbjtcclxuICAgICAgICB0aGlzLnBsYXllcldpbkRhdGEucG9pbnQgPSBkYXRhLnBvaW50O1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBkYXRhLnRvcF93aW4ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNldmVyZGF0YSA9IGRhdGEudG9wX3dpbltpbmRleF07XHJcbiAgICAgICAgICAgIGxldCBwbGF5ZXJJbmRleCA9IHNldmVyZGF0YS5jaGFpcjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJXaW5EYXRhW3BsYXllckluZGV4XSA9IHNldmVyZGF0YTtcclxuXHJcbiAgICAgICAgICAgIC8v5pu05paw5YW25LuW546p5a626YeR5biB77yI55So5LqO54K55Ye7546p5a625aS05YOP5by55Ye6dGlwc+ivpuaDhe+8iVxyXG4gICAgICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5wbGF5ZXJEYXRhQXJyW3BsYXllckluZGV4XTtcclxuICAgICAgICAgICAgaWYgKHBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHNldmVyZGF0YS5iZXRfd2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJldFdpbiA9IHNldmVyZGF0YS5iZXRfd2luW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnBvaW50ICs9IGJldFdpbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBwbGF5ZXJDaGlwc0ZseVBvcyA9IHtcclxuICAgICAgICBbQmJ3elJvbGUuU2VsZl06IG5ldyBjYy5WZWMyKDAsIDApLCAgICAgICAvL+aIkeiHquW3sSDkuIvms6jml7bkuI3kvb/nlKjov5nkuKrlgLzkvb/nlKjpgInkuK3nrbnnoIHkvY3nva4sIOetueeggemjnuWbnuaXtueUqFxyXG4gICAgICAgIFtCYnd6Um9sZS5EZWFsZXJdOiBuZXcgY2MuVmVjMigwLCAwKSwgICAgICAgICAgIC8v6I235a6Y5Z2Q5qCHXHJcbiAgICAgICAgW0Jid3pSb2xlLldpc2VyXTogbmV3IGNjLlZlYzIoMCwgMCksICAgICAgICAgICAgLy/mmbrlpJrmmJ9cclxuICAgICAgICBbQmJ3elJvbGUuT25saW5lXTogbmV3IGNjLlZlYzIoMCwgMCksICAgICAgICAgICAvL+WcqOe6v+eOqeWutlxyXG4gICAgICAgIFtCYnd6Um9sZS5SaWNoZXIxXTogbmV3IGNjLlZlYzIoMCwgMCksICAgICAgICAgIC8v5aSn5a+M6LGqXHJcbiAgICAgICAgW0Jid3pSb2xlLlJpY2hlcjJdOiBuZXcgY2MuVmVjMigwLCAwKSxcclxuICAgICAgICBbQmJ3elJvbGUuUmljaGVyM106IG5ldyBjYy5WZWMyKDAsIDApLFxyXG4gICAgICAgIFtCYnd6Um9sZS5SaWNoZXI0XTogbmV3IGNjLlZlYzIoMCwgMCksXHJcbiAgICAgICAgW0Jid3pSb2xlLlJpY2hlcjVdOiBuZXcgY2MuVmVjMigwLCAwKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==