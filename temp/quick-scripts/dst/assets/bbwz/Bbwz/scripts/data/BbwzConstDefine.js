
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/data/BbwzConstDefine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcZGF0YVxcQmJ3ekNvbnN0RGVmaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUFrRDtBQUNsRCx5REFBb0Q7QUFFcEQ7O0dBRUc7QUFDSDtJQUFBO0lBMk1BLENBQUM7SUF6R0c7OztPQUdHO0lBQ1csNkJBQWEsR0FBM0IsVUFBNEIsU0FBaUI7UUFDekMsT0FBTyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7O09BR0c7SUFDVyw2QkFBYSxHQUEzQixVQUE0QixTQUFpQjtRQUN6QyxPQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELG9CQUFvQjtJQUNOLG9DQUFvQixHQUFsQyxVQUFtQyxTQUFpQjtRQUNoRCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO1lBQzdCLE9BQU8sdUJBQWEsQ0FBQyxpQkFBaUIsQ0FBQzs7WUFFdkMsT0FBTyx1QkFBYSxDQUFDLGtCQUFrQixDQUFDO0lBQ2hELENBQUM7SUFlRDs7Ozs7Ozs7T0FRRztJQUNJLDhCQUFjLEdBQXJCLFVBQXNCLElBQWEsRUFBRSxJQUFZLEVBQUUsUUFBa0IsRUFBRSxNQUFZLEVBQUUsVUFBdUMsRUFBRSxTQUEwQjtRQUFuRSwyQkFBQSxFQUFBLGFBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSztRQUFFLDBCQUFBLEVBQUEsaUJBQTBCO1FBQ3BKLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDckcsQ0FBQztJQUVELGFBQWE7SUFDTiw0QkFBWSxHQUFu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LCtDQUFHLENBQUE7SUFDSCxxREFBTSxDQUFBO0lBQ04scURBQU0sQ0FBQTtJQUNOLGlEQUFJLENBQUE7QUFDUixDQUFDLEVBUFcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFPeEIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmJ3elBva2VyVG9vbCBmcm9tIFwiLi4vdG9vbC9CYnd6UG9rZXJUb29sXCI7XHJcbmltcG9ydCBCYnd6UGF0aEhlbHBlciBmcm9tIFwiLi4vdG9vbC9CYnd6UGF0aEhlbHBlclwiO1xyXG5cclxuLyoqXHJcbiAqIOmdmeaAgeW4uOmHj+exu1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmJ3ekNvbnN0RGVmaW5lIHtcclxuICAgIC8qKlxyXG4gICAgICog5a2Q5ri45oiPaWRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEdBTUVfSUQgPSAxMDE3O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R6YCB57uZ5pyN5Yqh56uv55qE5Y2P6K6uXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZWFkb25seSBTRU5EX0xFQVZFID0gXCIqbGVlKlwiOyAgLy/nprvlvIDmuLjmiI9cclxuICAgIHN0YXRpYyByZWFkb25seSBTRU5EX0JFVCA9IFwiYjFcIjsgICAgICAgIC8v6Ieq5bex5LiL5rOoXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgU0VORF9PTkxJTkVfUExBWUVSX0xJU1QgPSBcInBsXCI7Ly/lnKjnur/njqnlrrbliJfooahcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlLbliLAg5pyN5Yqh56uv55qE5Y2P6K6uXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZWFkb25seSBSRUNFSVZFUl9HQU1FQ0ZHID0gXCJhXCI7ICAgICAgICAgICAgICAvL+aIv+mXtOmFjee9rlxyXG4gICAgc3RhdGljIHJlYWRvbmx5IFJFQ0VJVkVSX0VOVEVSID0gXCIqZW4xKlwiOyAgICAgICAgIC8v6L+b5YWl5oi/6Ze0IOWMheaLrOiHquW3seWSjOWIq+S6uiBcclxuICAgIHN0YXRpYyByZWFkb25seSBSRUNFSVZFUl9MRUFWRSA9IFwiKmxlZSpcIjsgICAgICAgICAgICAvL+emu+W8gOa4uOaIj1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFJFQ0VJVkVSX1JFRlJFU0ggPSBcInJlZnJlc2hcIjsgIC8v5Yi35paw546p5a625L+h5oGvKOmHkeW4gSlcclxuXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgUkVDRUlWRVJfT05MSU5FX1BMQVlFUl9DT1VOVCA9IFwib2xcIjsvL+WcqOe6v+eOqeWutuaVsOmHj1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFJFQ0VJVkVSX09OTElORV9QTEFZRVJfTElTVCA9IFwicGxcIjsvL+WcqOe6v+eOqeWutuWIl+ihqFxyXG4gICAgXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgUkVDRUlWRVJfR0FNRV9ISVNUT1JZID0gXCJmMVwiOyAgLy/ljoblj7LorrDlvZVcclxuXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgUkVDRUlWRVJfQkVUID0gXCJiMVwiOy8v6Ieq5bex5LiL5rOoXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgUkVDRUlWRVJfT1RIRVJfQkVUID0gXCJjMlwiOy8v5YW25LuW5Lq65LiL5rOoXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgUkVDRUlWRVJfR0FNRV9TVEFSVF9CRVQgPSBcImUxXCI7Ly/lvIDlp4vkuIvms6hcclxuICAgIHN0YXRpYyByZWFkb25seSBSRUNFSVZFUl9HQU1FX0VORF9CRVQgPSBcImUyXCI7Ly/nu5PmnZ/kuIvms6hcclxuICAgIHN0YXRpYyByZWFkb25seSBSRUNFSVZFUl9HQU1FX1JFV0FSRCA9IFwiZTNcIjsvL+W8gOWlllxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YmN56uv5YiG6KejZTHljY/orq5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEdhbWVTdGFydF9WUyA9IFwiZTEteFwiOy8v5byA5aeL5LiL5rOoLem+mXZz6JmO5Yqo55S7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgR2FtZVN0YXJ0X0ZhcGFpID0gXCJlMS0wXCI7Ly/lvIDlp4vkuIvms6gt5Y+R54mM5Yqo55S7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgR2FtZVN0YXJ0X0FuaW1hdGlvbiA9IFwiZTEtMVwiOy8v5byA5aeL5LiL5rOoLeaSreaUvuKAnOW8gOWni+S4i+azqOKAneeahOWKqOeUu1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEdhbWVTdGFydF9EYW9qaXNoaSA9IFwiZTEtMlwiOy8v5byA5aeL5LiL5rOoLemXuemSn+WAkuiuoeaXtlxyXG4gICAgLyoqXHJcbiAgICAgKiDliY3nq6/liIbop6NlM+WNj+iurlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgR2FtZVdhaXRfRGVhbENhcmQgPSBcImUzLTFcIiAgICAvLyDlvIDlpZblj5HniYxcclxuICAgIHN0YXRpYyByZWFkb25seSBHYW1lV2FpdF9EaXNwYXRjaCA9IFwiZTMtMS0wXCJcclxuICAgIHN0YXRpYyByZWFkb25seSBHYW1lV2FpdF9GYW5DYXJkID0gXCJlMy0xLTFcIjsgIC8v5byA5aWWLee/u+esrFjlvKDniYxcclxuICAgIHN0YXRpYyByZWFkb25seSBHYW1lV2FpdF9BcmVhUmVzdWx0ID0gXCJlMy0xLTJcIiAgLy8g5byA5aWWLeWMuuWfn+i+k+i1olxyXG4gICAgc3RhdGljIHJlYWRvbmx5IEdhbWVXYWl0X1dpblNoaW5lID0gXCJlMy0yXCI7IC8v5byA5aWWLei1ouW+l+WMuuWfn+mXqueDgVxyXG4gICAgc3RhdGljIHJlYWRvbmx5IEdhbWVXYWl0X0ZlaUNob3VNYSA9IFwiZTMtM1wiOy8v5byA5aWWLemjnuetueeggVxyXG4gICAgc3RhdGljIHJlYWRvbmx5IEdhbWVXYWl0X0ZseVdvcmQgPSBcImUzLTRcIjsvL+W8gOWlli3po5jlrZdcclxuICAgIHN0YXRpYyByZWFkb25seSBHYW1lV2FpdF9HZVJlbkppZVN1YW4gPSBcImUzLTVcIjsvL+W8gOWlli3kuKrkurrnu5PnrpdcclxuICAgIHN0YXRpYyByZWFkb25seSBHYW1lV2FpdF9XYWl0TmV4dCA9IFwiZTMtNlwiOy8v5byA5aWWLeetieW+heS4i+S4gOWxgFxyXG4gICAgc3RhdGljIHJlYWRvbmx5IENtZENoYXQgPSBcImNoYXRcIjsgICAgICAgIC8vIOiBiuWkqSDooajmg4XlkozmloflrZdcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmfs+S5kOmfs+aViFxyXG4gICAgICovXHJcblxyXG4gICAgc3RhdGljIHJlYWRvbmx5IFNPVU5EX0JHTSA9IEJid3pQYXRoSGVscGVyLmdhbWVTb3VuZFBhdGggKyBcImJnXCI7ICAvL+iDjOaZr+mfs+S5kFxyXG4gICAgc3RhdGljIHJlYWRvbmx5IFNPVU5EX0xPQURJTkcgPSBCYnd6UGF0aEhlbHBlci5nYW1lU291bmRQYXRoICsgXCJsb2FkaW5nXCI7Ly/liqDovb3nlYzpnaJcclxuICAgIHN0YXRpYyByZWFkb25seSBTT1VORF9CVVRUT04gPSBCYnd6UGF0aEhlbHBlci5nYW1lU291bmRQYXRoICsgXCJidXR0b25cIjsvL+aMiemSrueCueWHu1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFNPVU5EX0NISVBfQ0hBTkdFID0gQmJ3elBhdGhIZWxwZXIuZ2FtZVNvdW5kUGF0aCArIFwiY2hhbmdfY2hpcFwiOy8v5YiH5o2i562556CB5oyJ6ZKuXHJcblxyXG4gICAgc3RhdGljIHJlYWRvbmx5IFNPVU5EX0JFVF9CVVRUT04gPSBCYnd6UGF0aEhlbHBlci5nYW1lU291bmRQYXRoICsgXCJiZXRcIjsvL+S4i+azqOetueeggeaMiemSrlxyXG4gICAgc3RhdGljIHJlYWRvbmx5IFNPVU5EX0NISVBfRkxZID0gQmJ3elBhdGhIZWxwZXIuZ2FtZVNvdW5kUGF0aCArIFwiZmx5X2NoaXBcIjsvL+mjnuetueeggVxyXG4gICAgc3RhdGljIHJlYWRvbmx5IFNPVU5EX0JFVCA9IEJid3pQYXRoSGVscGVyLmdhbWVTb3VuZFBhdGggKyBcImJldFwiOy8v5LiL5rOoXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgU09VTkRfQkVUX1NUQVJUID0gQmJ3elBhdGhIZWxwZXIuZ2FtZVNvdW5kUGF0aCArIFwic3RhcnRfYmV0XCI7Ly/lvIDlp4vkuIvms6hcclxuICAgIHN0YXRpYyByZWFkb25seSBTT1VORF9CRVRfRU5EID0gQmJ3elBhdGhIZWxwZXIuZ2FtZVNvdW5kUGF0aCArIFwic3RvcF9iZXRcIjsvL+WBnOatouS4i+azqFxyXG4gICAgc3RhdGljIHJlYWRvbmx5IFNPVU5EX1dJTiA9IEJid3pQYXRoSGVscGVyLmdhbWVTb3VuZFBhdGggKyBcImJqbF93aW5cIjsvL+Wkp+i1ouWutlxyXG4gICAgc3RhdGljIHJlYWRvbmx5IFNPVU5EX0RBT0pJU0hJID0gQmJ3elBhdGhIZWxwZXIuZ2FtZVNvdW5kUGF0aCArIFwiZGlzX3RpbWUzMjFcIjsvL+WAkuiuoeaXtjPvvIwy77yMMVxyXG4gICAgc3RhdGljIHJlYWRvbmx5IFNPVU5EX0RBT0pJU0hJX0VORCA9IEJid3pQYXRoSGVscGVyLmdhbWVTb3VuZFBhdGggKyBcImRpc190aW1lMFwiOy8v5YCS6K6h5pe257uT5p2fXHJcblxyXG4gICAgc3RhdGljIHJlYWRvbmx5IFNPVU5EX0ZBUEFJID0gQmJ3elBhdGhIZWxwZXIuZ2FtZVNvdW5kUGF0aCArIFwiZmFwYWlcIjsvL+WPkeeJjFxyXG4gICAgc3RhdGljIHJlYWRvbmx5IFNPVU5EX1pIRU5HUEFJID0gQmJ3elBhdGhIZWxwZXIuZ2FtZVNvdW5kUGF0aCArIFwia2FpcGFpXCI7Ly/nv7vniYxcclxuICAgIHN0YXRpYyByZWFkb25seSBTT1VORF9TSE9XRE9XTiA9IEJid3pQYXRoSGVscGVyLmdhbWVTb3VuZFBhdGggKyBcInNob3dfZG93blwiOy8v5pW054mMXHJcblxyXG5cclxuICAgIHN0YXRpYyByZWFkb25seSBTT1VORF9SRVdBUkRfV0lOID0gQmJ3elBhdGhIZWxwZXIuZ2FtZVNvdW5kUGF0aCArIFwicmV3YXJkX3dpblwiOy8v6LWi6ZKxXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgU09VTkRfUkVXQVJEX0xPU0UgPSBCYnd6UGF0aEhlbHBlci5nYW1lU291bmRQYXRoICsgXCJyZXdhcmRfbG9zZVwiOy8v6L6T6ZKxXHJcblxyXG4gICAgLyoqIOaJi+eJjOWghui6q+S7vSAgIGluZGV45LiO6aKE6K6+5ZG95ZCN5a+55bqUICAgc3RyaW5n5YaF5a655ZKM5pyN5Yqh5Zmo5a2X5q615a+55bqUICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdST1VQX0RFRklORSA9IFtcclxuICAgICAgICBcImRlYWxlcl96amhcIiwgICAgICAgLy8g5bqE6YeR6IqxXHJcbiAgICAgICAgXCJkZWFsZXJfYnVsbFwiLCAgICAgIC8vIOW6hOeJm+eJm1xyXG4gICAgICAgIFwiZnVfempoXCIsICAgICAgICAgICAvLyDnpo/ph5HoirFcclxuICAgICAgICBcImZ1X2J1bGxcIiwgICAgICAgICAgLy8g56aP54mb54mbXHJcbiAgICAgICAgXCJsdV96amhcIiwgICAgICAgICAgIC8vIOemhOmHkeiKsVxyXG4gICAgICAgIFwibHVfYnVsbFwiLCAgICAgICAgICAvLyDnpoTniZvniZtcclxuICAgICAgICBcInNob3VfempoXCIsICAgICAgICAgLy8g5a+/6YeR6IqxXHJcbiAgICAgICAgXCJzaG91X2J1bGxcIiwgICAgICAgIC8vIOWvv+eJm+eJm1xyXG4gICAgXTtcclxuXHJcbiAgICAvKiog5Y+C5LiO5omL54mM5aCG5pWwICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdST1VQX0NPVU5UID0gODtcclxuXHJcbiAgICAvKiog5q+P5aCG5omL54mM55qE5byg5pWwICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdST1VQX1BPS0VSX0NPVU5UID0gNTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOajgOa1i+aYr+WQpuW6hOeahOeJjOWghlxyXG4gICAgICogQHBhcmFtIGdyb3VwTmFtZSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjaGVja0lzQmFua2VyKGdyb3VwTmFtZTogc3RyaW5nKXtcclxuICAgICAgICByZXR1cm4gZ3JvdXBOYW1lLmluZGV4T2YoXCJkZWFsZXJcIikgPiAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOajgOa1i+aYr+WQpueCuOmHkeiKseeahOeJjOWghlxyXG4gICAgICogQHBhcmFtIGdyb3VwTmFtZSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjaGVja1pqaEdyb3VwKGdyb3VwTmFtZTogc3RyaW5nKXtcclxuICAgICAgICByZXR1cm4gZ3JvdXBOYW1lLmluZGV4T2YoXCJ6amhcIikgPiAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmoLnmja7niYzloIbnsbvlnovov5Tlm57niYzlnovpn7PmlYjphY3nva4gKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0R3JvdXBUeXBlU291bmRBcnIoZ3JvdXBOYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrWmpoR3JvdXAoZ3JvdXBOYW1lKSlcclxuICAgICAgICAgICAgcmV0dXJuIEJid3pQb2tlclRvb2wuempoUG9rZXJUeXBlU291bmQ7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gQmJ3elBva2VyVG9vbC5idWxsUG9rZXJUeXBlU291bmQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOS4i+azqOWMuuWfn+aVsOmHjyAqL1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEJFVF9BUkVBX0NPVU5UID0gNjtcclxuXHJcbiAgICAvKiog5LiL5rOo5Yy65Z+f5ZCN56ew5pWw57uEIOebtOaOpeS9v+eUqHN0cmluZ+WGheWuueS9nOS4uuWMuuWfn+eJueW+geagh+ivhiAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBCRVRfQVJFQV9OQU1FID0gW1xyXG4gICAgICAgIFwiZnVfempoXCIsICAgICAgICAgICAvLyDnpo/ph5HoirFcclxuICAgICAgICBcImx1X3pqaFwiLCAgICAgICAgICAgLy8g56aE6YeR6IqxXHJcbiAgICAgICAgXCJzaG91X3pqaFwiLCAgICAgICAgIC8vIOWvv+mHkeiKsVxyXG4gICAgICAgIFwiZnVfYnVsbFwiLCAgICAgICAgICAvLyDnpo/niZvniZtcclxuICAgICAgICBcImx1X2J1bGxcIiwgICAgICAgICAgLy8g56aE54mb54mbXHJcbiAgICAgICAgXCJzaG91X2J1bGxcIiwgICAgICAgIC8vIOWvv+eJm+eJm1xyXG4gICAgXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOe7meiKgueCuea3u+WKoOeCueWHu+S6i+S7tlxyXG4gICAgICogQHBhcmFtIHJvb3Qg5qC56IqC54K5XHJcbiAgICAgKiBAcGFyYW0gcGF0aCDnm7jlr7nkuo7moLnoioLngrnnmoTot6/lvoRcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDlm57osIPlh73mlbBcclxuICAgICAqIEBwYXJhbSB0YXJnZXQg5Zue6LCD5Ye95pWw55qE6LCD55So6ICFdGhpc1xyXG4gICAgICogQHBhcmFtIHRyYW5zaXRpb24g5oyJ6ZKu54K55Ye76L+H5rih57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gdGltZSDov4fmuKHml7bpl7RcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFkZENvbW1vbkNsaWNrKHJvb3Q6IGNjLk5vZGUsIHBhdGg6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uLCB0YXJnZXQ/OiBhbnksIHRyYW5zaXRpb24gPSBjYy5CdXR0b24uVHJhbnNpdGlvbi5TQ0FMRSwgcGxheVNvdW5kOiBib29sZWFuID0gZmFsc2UpOiBjYy5Ob2RlIHtcclxuICAgICAgICByZXR1cm4gR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKHJvb3QsIHBhdGgsIGNhbGxiYWNrLCB0YXJnZXQsIHRyYW5zaXRpb24sIG51bGwsIHBsYXlTb3VuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOaSreaUvueCueWHu+mfs+aViCAqL1xyXG4gICAgc3RhdGljIHBsYXlCdG5Tb3VuZCgpIHtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUJ1bmRsZVNvdW5kKEJid3pDb25zdERlZmluZS5HQU1FX0lELEJid3pDb25zdERlZmluZS5TT1VORF9CVVRUT04sIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiL5rOo5bCP562556CB5Zu+5qCH5qC35byPXHJcbiAgICAgKiA15Luj6KGo5Zy65qyh5pyA5bCP5LiL5rOo6aKdNSwgMTAw5Luj6KGo5Zy65qyh5pyA5bCP5LiL5rOo6aKdMTAwXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzZlNtYWxsQ2hpcFN0ckNmZyA9IHtcclxuICAgICAgICAxMDAwMDpbXHJcbiAgICAgICAgICAgIFwiY2hvdW1heGlhb18xXCIsXHJcbiAgICAgICAgICAgIFwiY2hvdW1heGlhb18yXCIsXHJcbiAgICAgICAgICAgIFwiY2hvdW1heGlhb18zXCIsXHJcbiAgICAgICAgICAgIFwiY2hvdW1heGlhb180XCIsXHJcbiAgICAgICAgICAgIFwiY2hvdW1heGlhb181XCIsXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiL5rOo5bCP562556CB5Zu+5qCH5qC35byPXHJcbiAgICAgKiA15Luj6KGo5Zy65qyh5pyA5bCP5LiL5rOo6aKdNSwgMTAw5Luj6KGo5Zy65qyh5pyA5bCP5LiL5rOo6aKdMTAwXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzZkJpZ0NoaXBTdHJDZmcgPSB7XHJcbiAgICAgICAgMTAwMDA6W1xyXG4gICAgICAgICAgICBcImNob3VtYWRhXzFcIixcclxuICAgICAgICAgICAgXCJjaG91bWFkYV8yXCIsXHJcbiAgICAgICAgICAgIFwiY2hvdW1hZGFfM1wiLFxyXG4gICAgICAgICAgICBcImNob3VtYWRhXzRcIixcclxuICAgICAgICAgICAgXCJjaG91bWFkYV81XCIsXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKiDovpPotaLlrZfkvZPlkI0gKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmV3YXJkRm9udFN0ciA9IHtcclxuICAgICAgICBXaW46IFwiYm1mb250X2ppYVwiLFxyXG4gICAgICAgIExvc2U6IFwiYm1mb250X2Z1XCJcclxuICAgIH07XHJcblxyXG4gICAgLyoqIOeJjOWei+WAjeaVsOeahOWtl+S9kyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhcmVhUmV3YXJkRm9udFN0ciA9IHtcclxuICAgICAgICBXaW46IFwiYm1mb250X3dpbl9iZWlzaHVcIixcclxuICAgICAgICBMb3NlOiBcImJtZm9udF9sb3NlX2JlaXNodVwiXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5a2QVmlld+agh+ivhuesplxyXG4gICAgcHVibGljIHN0YXRpYyBWaWV3TWVudSA9IFwiVmlld01lbnVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgVmlld0JpZ1dpbm5lciA9IFwiVmlld0JpZ1dpbm5lclwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBWaWV3U2VsZWN0Q2hpcCA9IFwiVmlld1NlbGVjdENoaXBcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgVmlld1N0YXRlID0gXCJWaWV3U3RhdGVcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgVmlld0JldEFyZWFSb290ID0gXCJWaWV3QmV0QXJlYVJvb3RcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgVmlld0hlYWRUaXBzID0gXCJWaWV3SGVhZFRpcHNcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgVmlld0NvbXBhcmVQb2tlciA9IFwiVmlld0NvbXBhcmVQb2tlclwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBWaWV3UmV3YXJkQXJlYVJvb3QgPSBcIlZpZXdSZXdhcmRBcmVhUm9vdFwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBWaWV3SW50ZXJhY3RQbGF5ID0gXCJWaWV3SW50ZXJhY3RQbGF5XCI7XHJcbn1cclxuXHJcbi8qKiDkuI7nrbnnoIHnm7jlhbPluqfkvY0gKi9cclxuZXhwb3J0IGVudW0gQmJ3elJvbGV7XHJcbiAgICBTZWxmID0gMCwgICAgICAgICAgICAgICAvLyDoh6rlt7FcclxuICAgIERlYWxlciA9IDEsICAgICAgICAgICAgIC8vIOiNt+WumFxyXG4gICAgV2lzZXIgPSA5OTk5LCAgICAgICAgICAgLy8g5pm65aSa5pifXHJcbiAgICBPbmxpbmUgPSAxMDAwMCwgICAgICAgICAvLyDlnKjnur/njqnlrrZcclxuICAgIFJpY2hlcjEgPSAxMDAwMSwgICAgICAgIC8vIOWkp+WvjOixqjFcclxuICAgIFJpY2hlcjIgPSAxMDAwMixcclxuICAgIFJpY2hlcjMgPSAxMDAwMyxcclxuICAgIFJpY2hlcjQgPSAxMDAwNCxcclxuICAgIFJpY2hlcjUgPSAxMDAwNSxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gQmJ3ekdhbWVTdGF0ZXtcclxuICAgIERlYWwgPSAwLFxyXG4gICAgQmV0U3RhcnQsXHJcbiAgICBCZXQsXHJcbiAgICBCZXRFbmQsXHJcbiAgICBSZXdhcmQsXHJcbiAgICBXYWl0XHJcbn0iXX0=