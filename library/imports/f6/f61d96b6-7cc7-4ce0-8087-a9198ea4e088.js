"use strict";
cc._RF.push(module, 'f61d9a2fMdM4ICHqRmOpOCI', 'ErmjDefine');
// ermj/Ermj/scripts/data/ErmjDefine.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErmjDefine = /** @class */ (function () {
    function ErmjDefine() {
        //----------------------协议定义------------------------
        this.CmdGameCfg = "a"; //游戏房间配置
        this.CmdEnter = "*en1*"; //进入房间
        this.CmdLeave = "*lee*"; //离开房间
        this.CmdSession = "*sss*"; //获取服务器Session   默认是用大厅SessionHandler
        this.CmdRefresh = "refresh"; //刷新玩家信息
        this.CmdOffline = "*fo1*"; // 离线
        this.CmdGameStart = "*gs1*"; //游戏开始
        this.CmdGameEnd = "*gs2*"; //游戏结束
        this.CmdCallReady = "*cal_rel*"; //提示准备
        this.CmdWaitMatch = "wait_match"; // 匹配人   默认是用大厅PvpWaitMatchHandler
        this.CmdLeaveMatch = "leave_match"; // 脱离匹配
        this.CmdWait = "wait"; //等待下局开始
        this.CmdBanker = "banker"; // 定庄
        this.CmdDeal = "deal"; // 发牌
        this.CmdChangeFlower = "change_flower"; // 换花
        this.CmdPlayStart = "play_start"; // 出牌阶段开始
        this.CmdDrawCard = "draw_card";
        this.CmdCallSelfBlock = "cal_self_block"; // 摸牌后操作
        this.CmdCallOtherBlock = "cal_other_block"; // 出牌后操作
        this.CmdWin = "win"; // 胡牌
        this.CmdKong = "kong"; // 杠
        this.CmdPong = "pong"; // 碰
        this.CmdChow = "chow"; // 吃
        this.CmdPass = "pass"; // 过
        this.CmdCallTing = "cal_ting"; // 请听牌 胡牌提示
        this.CmdTing = "ting"; // 听牌
        this.CmdTingResult = "ting_result"; // 听牌结果
        this.CmdCallPlay = "cal_play"; // 请出牌
        this.CmdPlay = "play"; // 出牌
        this.CmdReward = "reward"; // 结算
        this.CmdSyncBegin = "sync1"; //重连开始
        this.CmdSyncEnd = "sync2"; //重连结束
        this.CmdSyncTable = "table_data"; // 重连更新出牌
        this.CmdChat = "chat"; // 聊天 表情和文字
        this.CmdAuto = "*au1*"; // 托管
        //----------------------逻辑定义----------------------
        /** 手上最多麻将张数 未出牌时多一张 */
        this.HandMjMaxCount = 13;
        /**麻将选中向上偏移 */
        this.ChooseOffsetY = 20;
        /** 自己手牌麻将子间隔 算上麻将子宽后的值 正负表方向 */
        this.SelfHandMahjongSpace = cc.v3(77.2, 0);
        /**抓麻将子放在手牌末尾位置时相对最后一个麻将子偏移  数组按本地座位(兼容四人麻将) 正负表方向*/
        this.LastOneDealOffset = [
            cc.v3(110, 0),
            cc.v3(-50, 0),
        ];
        /** 吃碰杠牌 排列间距 */
        this.OperViewSpace = [
            cc.v3(-167, 0),
            cc.v3(167, 0),
        ];
        /** 花牌摆放透视等级列表, 最多八个花牌 */
        this.flowerMjPerspArr = [-5, -4, -3, -2, -1, 0, 0, 0];
        /** 出牌麻将子摆放的最大列数 */
        this.OutShowMjMaxCol = 10;
        /** 出牌桌面麻将子透视等级列表 一行10张 0~9 */
        this.outMjPerspArr = [-4, -3, -2, -1, 0, 0, 1, 2, 3, 4];
        /** 吃碰杠牌 透视等级列表 每三个为一座 杠牌取中间堆叠 从右往左*/
        this.operMjGroupPerspArr = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0];
        /** 杠牌第四张取中间上移像素 */
        this.operMjKongOffsetY = 22;
        /** 麻将打出展示停留时间 */
        this.outMjShowTime = 0.3;
        /** 麻将打出飞行时间 */
        this.outMjFlyTime = 0.2;
        /** 胡牌透视等级列表*/
        this.winMjPerspArr = [5, 6, 7, 8, 9];
        /** 胡牌多行时作堆叠 */
        this.winMoreOffsetY = 22;
        /** 明牌亮牌 透视等级列表 最多14张*/
        this.winBrightMjPerspArr = [-5, -4, -3, -2, -1, 0, 0, 0, 0, 0, 1, 2, 3, 4];
        /** 摊牌 最后一张胡牌或摸牌 偏移 */
        this.winBrightLastOffsetX = 10;
        // 进入离开时间
        this.HeadMoveTime = 0.2;
        //---------------局内数据字段--------------------
        /** 庄家本地座位 */
        this.FieldBankerSeat = "FieldBankerSeat";
        /** 是否开局了 */
        this.FieldGameStart = "FieldGameStart";
        /** 结算中 */
        this.FieldInSettle = "FieldInSettle";
        /** 此时是否可以出牌回合 */
        this.FieldInPlayTurn = "FieldInPlayTurn";
        /** 此时是否可以操作手牌选中 */
        this.FieldHandActionEnable = "FieldHandActionEnable";
        /** 本局自己是否已听牌 */
        this.FieldInTing = "FieldInTing";
        /** 自己听牌数据 */
        this.FieldTingData = "FieldTingData";
        //---------------UI View Comp-----------------
        this.ViewMatchPlayer = "ViewMatchPlayer";
        this.ViewGameStart = "ViewGameStart";
        this.ViewLightning = "ViewLightning";
        this.ViewAskNotice = "ViewAskNotice";
        this.ViewMjHill = "ViewMjHill";
        this.ViewMenu = "ViewMenu";
        this.ViewLeftTips = "ViewLeftTips";
        this.ViewAskAction = "ViewAskAction";
        this.ViewSelfPlay = "ViewSelfPlay";
        this.ViewFlow = "ViewFlow";
        this.ViewSettle = "ViewSettle";
        this.ViewAskBtn = "ViewAskBtn";
        this.ViewInteractAct = "ViewInteractAct";
    }
    return ErmjDefine;
}());
exports.default = ErmjDefine;

cc._RF.pop();