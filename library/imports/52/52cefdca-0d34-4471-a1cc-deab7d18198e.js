"use strict";
cc._RF.push(module, '52cef3KDTREcaHM3qt9GBmO', 'DdzDefine');
// ddz/ddz/scripts/data/DdzDefine.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DdzDefine = /** @class */ (function () {
    function DdzDefine() {
        //----------------------协议定义------------------------
        this.CmdGameCfg = "a"; //游戏房间配置
        this.CmdEnter = "*en1*"; //进入房间
        this.CmdLeave = "*lee*"; //离开房间
        this.CmdSession = "*sss*"; //获取服务器Session   默认是用大厅SessionHandler
        this.CmdSyncBegin = "sync1"; //重连开始
        this.CmdSyncEnd = "sync2"; //重连结束
        this.CmdRefresh = "refresh"; //刷新玩家信息
        this.CmdOffline = "*fo1*"; // 离线
        this.CmdGameStart = "*gs1*"; //游戏开始
        this.CmdGameEnd = "*gs2*"; //游戏结束
        this.CmdCallReady = "*cal_rel*"; //提示准备
        this.CmdWaitMatch = "wait_match"; // 匹配人   默认是用大厅PvpWaitMatchHandler
        this.CmdLeaveMatch = "leave_match"; // 脱离匹配
        this.CmdWait = "wait"; //等待下局开始
        this.CmdDeal = "deal"; //发牌
        this.CmdAuto = "*au1*"; // 托管
        this.CmdCalLandlord = "cal_landlord"; // 请叫地主
        this.CmdLandlord = "landlord"; // 叫地主
        this.CmdOnLandlord = "land_result"; // 叫地主结果
        this.CmdReCalLandlord = "recal_landlord"; // 重新叫地主
        this.CmdCalMult = "cal_mult"; // 选择加倍
        this.CmdMult = "mult"; // 加倍
        this.CmdPlayStart = "play_start"; // 出牌阶段开始
        this.CmdCalPlay = "cal_play"; // 请出牌
        this.CmdPlay = "play"; // 出牌
        this.CmdPass = "pass"; // 过
        this.CmdOpen = "open"; // 结束开剩余牌
        this.CmdChangeScore = "change_score"; // 更新倍数
        this.CmdSyncTable = "other_table_data"; // 重连更新出牌
        this.CmdReward = "reward"; //结算
        this.CmdRefreshHandPokers = "redeal"; //刷新手牌
        //----------------------逻辑定义----------------------
        // 牌桌最大支持人数
        this.MaxPlayerCount = 3;
        // 本地座位映射到桌面
        this.LocalToViewMap = {};
        // 进入离开时间
        this.HeadMoveTime = 0.2;
        // 选中牌Y偏移量
        this.ChooseOffsetY = 20;
        // 选地主飞标志时间 0.2s用于停中间，剩余用于飞行
        this.FlyDzIcon = 1;
        // 每个玩家发牌间隔
        this.PerPlayerDealInterval = 0.5;
        // 每张牌飞行间隔
        this.PerPokerDealInterval = 0.02;
        // 发每张牌移动时间
        this.DealPokerMoveTime = 0.2;
        // 剩余三张地主牌动画时间
        this.DzLeftThreeShowTime = 0.2;
        // 大扑克Scale
        this.BigPokerScale = 1;
        // 小扑克Scale
        this.SmallPokerScale = 0.48;
        // 扑克打出延迟,用作设置牌位置
        this.PokerPlayDelayTime = 0.1;
        // 扑克打出移动的时间
        this.PokerPlayMoveTime = 0.1;
        // 剩余几张牌报警
        this.WarnLeftPokerCount = 2;
        // 播放角色胜利失败时间
        this.PlayRoleWinTime = 1;
        // 飘分时间
        this.FloatScoreTime = 1;
        // 展示结算时间
        this.ShowSettleTime = 2;
        // 播放结算背景动画时间
        this.PlaySettleEffectTime = 1;
        // 结算显示按钮延时时间
        this.SettleShowActTime = 2;
        // 播放春天或反春天时间
        this.SpringAnimTime = 2;
        // 播放飞机所需时间
        this.PlaneAnimTime = 1.5;
        // 播放炸弹所需时间
        this.BombAnimTime = 1;
        // 播放火箭所需时间
        this.RocketAnimTime = 2;
        // 播放连对所需时间
        this.LinkPairAnimTime = 1;
        // 播放顺子所需时间
        this.StraightAnimTime = 1;
        // 滑动手牌滑出有效X偏移
        this.PokerSlideValidOffsetX = 50;
        // 展示自己输赢时间
        this.ShowSelfSettleTime = 1.2;
        // 位置默认显示
        this.DefaultNameStr = '防作弊';
        //---------------数据字段--------------------
        // 底分
        this.FieldBasePoint = "FieldBasePoint";
        // 入场限制
        this.FieldEnterLimit = "FieldEnterLimit";
        // 当局进行中的标志
        this.FieldGameStart = "FieldGameStart";
        // 地主本地座位
        this.FieldDzLocSeat = "FieldDzLocSeat";
        // 当前出牌牌型
        this.FieldOnOutPokers = "FieldOnOutPokers";
        // 当次出牌是否已操作
        this.FieldOnPlayAction = "FieldOnPlayAction";
        // 是否已设置炸弹后的背景音
        this.FieldBombBgm = "FieldBombBgm";
        // 结算中
        this.FieldInSettle = "FieldInSettle";
        //---------------UI View Comp-----------------
        this.ViewMatchPlayer = "ViewMatchPlayer";
        this.ViewAskAction = "ViewAskAction";
        this.ViewSettle = "ViewSettle";
        this.ViewMenuContainer = "ViewMenuContainer";
        this.ViewDZLeftPokers = "ViewDZLeftPokers";
        this.ViewMarker = "ViewMarker";
        this.ViewSelfPlay = "ViewSelfPlay";
    }
    return DdzDefine;
}());
exports.default = DdzDefine;

cc._RF.pop();