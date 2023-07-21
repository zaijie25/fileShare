"use strict";
cc._RF.push(module, 'a0389IcLM9Fg57i52aPYvM4', 'BbwzConstDefine');
// bbwz/Bbwz/scripts/data/BbwzConstDefine.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BbwzGameState = exports.BbwzRole = void 0;
var BbwzPokerTool_1 = require("../tool/BbwzPokerTool");
var BbwzPathHelper_1 = require("../tool/BbwzPathHelper");
/**
 * 静态常量类
 */
var BbwzConstDefine = /** @class */ (function () {
    function BbwzConstDefine() {
    }
    /**
     * 检测是否庄的牌堆
     * @param groupName
     */
    BbwzConstDefine.checkIsBanker = function (groupName) {
        return groupName.indexOf("dealer") > -1;
    };
    /**
     * 检测是否炸金花的牌堆
     * @param groupName
     */
    BbwzConstDefine.checkZjhGroup = function (groupName) {
        return groupName.indexOf("zjh") > -1;
    };
    /**根据牌堆类型返回牌型音效配置 */
    BbwzConstDefine.getGroupTypeSoundArr = function (groupName) {
        if (this.checkZjhGroup(groupName))
            return BbwzPokerTool_1.default.zjhPokerTypeSound;
        else
            return BbwzPokerTool_1.default.bullPokerTypeSound;
    };
    /**
     * 给节点添加点击事件
     * @param root 根节点
     * @param path 相对于根节点的路径
     * @param callback 回调函数
     * @param target 回调函数的调用者this
     * @param transition 按钮点击过渡类型
     * @param time 过渡时间
     */
    BbwzConstDefine.addCommonClick = function (root, path, callback, target, transition, playSound) {
        if (transition === void 0) { transition = cc.Button.Transition.SCALE; }
        if (playSound === void 0) { playSound = false; }
        return Global.UIHelper.addCommonClick(root, path, callback, target, transition, null, playSound);
    };
    /** 播放点击音效 */
    BbwzConstDefine.playBtnSound = function () {
        Global.Audio.playBundleSound(BbwzConstDefine.GAME_ID, BbwzConstDefine.SOUND_BUTTON, true);
    };
    /**
     * 子游戏id
     */
    BbwzConstDefine.GAME_ID = 1017;
    /**
     * 发送给服务端的协议
     */
    BbwzConstDefine.SEND_LEAVE = "*lee*"; //离开游戏
    BbwzConstDefine.SEND_BET = "b1"; //自己下注
    BbwzConstDefine.SEND_ONLINE_PLAYER_LIST = "pl"; //在线玩家列表
    /**
     * 收到 服务端的协议
     */
    BbwzConstDefine.RECEIVER_GAMECFG = "a"; //房间配置
    BbwzConstDefine.RECEIVER_ENTER = "*en1*"; //进入房间 包括自己和别人 
    BbwzConstDefine.RECEIVER_LEAVE = "*lee*"; //离开游戏
    BbwzConstDefine.RECEIVER_REFRESH = "refresh"; //刷新玩家信息(金币)
    BbwzConstDefine.RECEIVER_ONLINE_PLAYER_COUNT = "ol"; //在线玩家数量
    BbwzConstDefine.RECEIVER_ONLINE_PLAYER_LIST = "pl"; //在线玩家列表
    BbwzConstDefine.RECEIVER_GAME_HISTORY = "f1"; //历史记录
    BbwzConstDefine.RECEIVER_BET = "b1"; //自己下注
    BbwzConstDefine.RECEIVER_OTHER_BET = "c2"; //其他人下注
    BbwzConstDefine.RECEIVER_GAME_START_BET = "e1"; //开始下注
    BbwzConstDefine.RECEIVER_GAME_END_BET = "e2"; //结束下注
    BbwzConstDefine.RECEIVER_GAME_REWARD = "e3"; //开奖
    /**
     * 前端分解e1协议
     */
    BbwzConstDefine.GameStart_VS = "e1-x"; //开始下注-龙vs虎动画
    BbwzConstDefine.GameStart_Fapai = "e1-0"; //开始下注-发牌动画
    BbwzConstDefine.GameStart_Animation = "e1-1"; //开始下注-播放“开始下注”的动画
    BbwzConstDefine.GameStart_Daojishi = "e1-2"; //开始下注-闹钟倒计时
    /**
     * 前端分解e3协议
     */
    BbwzConstDefine.GameWait_DealCard = "e3-1"; // 开奖发牌
    BbwzConstDefine.GameWait_Dispatch = "e3-1-0";
    BbwzConstDefine.GameWait_FanCard = "e3-1-1"; //开奖-翻第X张牌
    BbwzConstDefine.GameWait_AreaResult = "e3-1-2"; // 开奖-区域输赢
    BbwzConstDefine.GameWait_WinShine = "e3-2"; //开奖-赢得区域闪烁
    BbwzConstDefine.GameWait_FeiChouMa = "e3-3"; //开奖-飞筹码
    BbwzConstDefine.GameWait_FlyWord = "e3-4"; //开奖-飘字
    BbwzConstDefine.GameWait_GeRenJieSuan = "e3-5"; //开奖-个人结算
    BbwzConstDefine.GameWait_WaitNext = "e3-6"; //开奖-等待下一局
    BbwzConstDefine.CmdChat = "chat"; // 聊天 表情和文字
    /**
     * 音乐音效
     */
    BbwzConstDefine.SOUND_BGM = BbwzPathHelper_1.default.gameSoundPath + "bg"; //背景音乐
    BbwzConstDefine.SOUND_LOADING = BbwzPathHelper_1.default.gameSoundPath + "loading"; //加载界面
    BbwzConstDefine.SOUND_BUTTON = BbwzPathHelper_1.default.gameSoundPath + "button"; //按钮点击
    BbwzConstDefine.SOUND_CHIP_CHANGE = BbwzPathHelper_1.default.gameSoundPath + "chang_chip"; //切换筹码按钮
    BbwzConstDefine.SOUND_BET_BUTTON = BbwzPathHelper_1.default.gameSoundPath + "bet"; //下注筹码按钮
    BbwzConstDefine.SOUND_CHIP_FLY = BbwzPathHelper_1.default.gameSoundPath + "fly_chip"; //飞筹码
    BbwzConstDefine.SOUND_BET = BbwzPathHelper_1.default.gameSoundPath + "bet"; //下注
    BbwzConstDefine.SOUND_BET_START = BbwzPathHelper_1.default.gameSoundPath + "start_bet"; //开始下注
    BbwzConstDefine.SOUND_BET_END = BbwzPathHelper_1.default.gameSoundPath + "stop_bet"; //停止下注
    BbwzConstDefine.SOUND_WIN = BbwzPathHelper_1.default.gameSoundPath + "bjl_win"; //大赢家
    BbwzConstDefine.SOUND_DAOJISHI = BbwzPathHelper_1.default.gameSoundPath + "dis_time321"; //倒计时3，2，1
    BbwzConstDefine.SOUND_DAOJISHI_END = BbwzPathHelper_1.default.gameSoundPath + "dis_time0"; //倒计时结束
    BbwzConstDefine.SOUND_FAPAI = BbwzPathHelper_1.default.gameSoundPath + "fapai"; //发牌
    BbwzConstDefine.SOUND_ZHENGPAI = BbwzPathHelper_1.default.gameSoundPath + "kaipai"; //翻牌
    BbwzConstDefine.SOUND_SHOWDOWN = BbwzPathHelper_1.default.gameSoundPath + "show_down"; //整牌
    BbwzConstDefine.SOUND_REWARD_WIN = BbwzPathHelper_1.default.gameSoundPath + "reward_win"; //赢钱
    BbwzConstDefine.SOUND_REWARD_LOSE = BbwzPathHelper_1.default.gameSoundPath + "reward_lose"; //输钱
    /** 手牌堆身份   index与预设命名对应   string内容和服务器字段对应 */
    BbwzConstDefine.GROUP_DEFINE = [
        "dealer_zjh",
        "dealer_bull",
        "fu_zjh",
        "fu_bull",
        "lu_zjh",
        "lu_bull",
        "shou_zjh",
        "shou_bull",
    ];
    /** 参与手牌堆数 */
    BbwzConstDefine.GROUP_COUNT = 8;
    /** 每堆手牌的张数 */
    BbwzConstDefine.GROUP_POKER_COUNT = 5;
    /** 下注区域数量 */
    BbwzConstDefine.BET_AREA_COUNT = 6;
    /** 下注区域名称数组 直接使用string内容作为区域特征标识 */
    BbwzConstDefine.BET_AREA_NAME = [
        "fu_zjh",
        "lu_zjh",
        "shou_zjh",
        "fu_bull",
        "lu_bull",
        "shou_bull",
    ];
    /**
     * 下注小筹码图标样式
     * 5代表场次最小下注额5, 100代表场次最小下注额100
     */
    BbwzConstDefine.sfSmallChipStrCfg = {
        10000: [
            "choumaxiao_1",
            "choumaxiao_2",
            "choumaxiao_3",
            "choumaxiao_4",
            "choumaxiao_5",
        ]
    };
    /**
     * 下注小筹码图标样式
     * 5代表场次最小下注额5, 100代表场次最小下注额100
     */
    BbwzConstDefine.sfBigChipStrCfg = {
        10000: [
            "choumada_1",
            "choumada_2",
            "choumada_3",
            "choumada_4",
            "choumada_5",
        ]
    };
    /* 输赢字体名 */
    BbwzConstDefine.rewardFontStr = {
        Win: "bmfont_jia",
        Lose: "bmfont_fu"
    };
    /** 牌型倍数的字体 */
    BbwzConstDefine.areaRewardFontStr = {
        Win: "bmfont_win_beishu",
        Lose: "bmfont_lose_beishu"
    };
    // 子View标识符
    BbwzConstDefine.ViewMenu = "ViewMenu";
    BbwzConstDefine.ViewBigWinner = "ViewBigWinner";
    BbwzConstDefine.ViewSelectChip = "ViewSelectChip";
    BbwzConstDefine.ViewState = "ViewState";
    BbwzConstDefine.ViewBetAreaRoot = "ViewBetAreaRoot";
    BbwzConstDefine.ViewHeadTips = "ViewHeadTips";
    BbwzConstDefine.ViewComparePoker = "ViewComparePoker";
    BbwzConstDefine.ViewRewardAreaRoot = "ViewRewardAreaRoot";
    BbwzConstDefine.ViewInteractPlay = "ViewInteractPlay";
    return BbwzConstDefine;
}());
exports.default = BbwzConstDefine;
/** 与筹码相关座位 */
var BbwzRole;
(function (BbwzRole) {
    BbwzRole[BbwzRole["Self"] = 0] = "Self";
    BbwzRole[BbwzRole["Dealer"] = 1] = "Dealer";
    BbwzRole[BbwzRole["Wiser"] = 9999] = "Wiser";
    BbwzRole[BbwzRole["Online"] = 10000] = "Online";
    BbwzRole[BbwzRole["Richer1"] = 10001] = "Richer1";
    BbwzRole[BbwzRole["Richer2"] = 10002] = "Richer2";
    BbwzRole[BbwzRole["Richer3"] = 10003] = "Richer3";
    BbwzRole[BbwzRole["Richer4"] = 10004] = "Richer4";
    BbwzRole[BbwzRole["Richer5"] = 10005] = "Richer5";
})(BbwzRole = exports.BbwzRole || (exports.BbwzRole = {}));
var BbwzGameState;
(function (BbwzGameState) {
    BbwzGameState[BbwzGameState["Deal"] = 0] = "Deal";
    BbwzGameState[BbwzGameState["BetStart"] = 1] = "BetStart";
    BbwzGameState[BbwzGameState["Bet"] = 2] = "Bet";
    BbwzGameState[BbwzGameState["BetEnd"] = 3] = "BetEnd";
    BbwzGameState[BbwzGameState["Reward"] = 4] = "Reward";
    BbwzGameState[BbwzGameState["Wait"] = 5] = "Wait";
})(BbwzGameState = exports.BbwzGameState || (exports.BbwzGameState = {}));

cc._RF.pop();