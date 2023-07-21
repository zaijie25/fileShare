"use strict";
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