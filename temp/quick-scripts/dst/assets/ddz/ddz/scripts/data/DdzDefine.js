
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/data/DdzDefine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGRhdGFcXERkekRlZmluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7UUFDSSxvREFBb0Q7UUFDN0MsZUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFRLFFBQVE7UUFDakMsYUFBUSxHQUFHLE9BQU8sQ0FBQyxDQUFNLE1BQU07UUFDL0IsYUFBUSxHQUFHLE9BQU8sQ0FBQyxDQUFNLE1BQU07UUFDL0IsZUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFJLHFDQUFxQztRQUM5RCxpQkFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFFLE1BQU07UUFDL0IsZUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFJLE1BQU07UUFDL0IsZUFBVSxHQUFHLFNBQVMsQ0FBQyxDQUFFLFFBQVE7UUFDakMsZUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFJLEtBQUs7UUFDOUIsaUJBQVksR0FBRyxPQUFPLENBQUMsQ0FBSSxNQUFNO1FBQ2pDLGVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBTSxNQUFNO1FBQ2pDLGlCQUFZLEdBQUcsV0FBVyxDQUFDLENBQUMsTUFBTTtRQUNsQyxpQkFBWSxHQUFHLFlBQVksQ0FBQyxDQUFLLGtDQUFrQztRQUNuRSxrQkFBYSxHQUFHLGFBQWEsQ0FBQyxDQUFHLE9BQU87UUFDeEMsWUFBTyxHQUFHLE1BQU0sQ0FBQyxDQUFJLFFBQVE7UUFDN0IsWUFBTyxHQUFHLE1BQU0sQ0FBQyxDQUFHLElBQUk7UUFFeEIsWUFBTyxHQUFHLE9BQU8sQ0FBQyxDQUFHLEtBQUs7UUFFMUIsbUJBQWMsR0FBRyxjQUFjLENBQUMsQ0FBUyxPQUFPO1FBQ2hELGdCQUFXLEdBQUcsVUFBVSxDQUFDLENBQWdCLE1BQU07UUFDL0Msa0JBQWEsR0FBRyxhQUFhLENBQUMsQ0FBVyxRQUFRO1FBQ2pELHFCQUFnQixHQUFHLGdCQUFnQixDQUFDLENBQUssUUFBUTtRQUVqRCxlQUFVLEdBQUcsVUFBVSxDQUFDLENB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aUIsQ0FBQztRQUNwQyxrQkFBYSxHQUFHLGVBQWUsQ0FBQztRQUNoQyxlQUFVLEdBQUcsWUFBWSxDQUFDO1FBQzFCLHNCQUFpQixHQUFHLG1CQUFtQixDQUFDO1FBQ3hDLHFCQUFnQixHQUFHLGtCQUFrQixDQUFDO1FBQ3RDLGVBQVUsR0FBRyxZQUFZLENBQUM7UUFDMUIsaUJBQVksR0FBRyxjQUFjLENBQUM7SUFDekMsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FsSUEsQUFrSUMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIERkekRlZmluZXtcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeWNj+iuruWumuS5iS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcHVibGljIENtZEdhbWVDZmcgPSBcImFcIjsgICAgICAgIC8v5ri45oiP5oi/6Ze06YWN572uXHJcbiAgICBwdWJsaWMgQ21kRW50ZXIgPSBcIiplbjEqXCI7ICAgICAgLy/ov5vlhaXmiL/pl7RcclxuICAgIHB1YmxpYyBDbWRMZWF2ZSA9IFwiKmxlZSpcIjsgICAgICAvL+emu+W8gOaIv+mXtFxyXG4gICAgcHVibGljIENtZFNlc3Npb24gPSBcIipzc3MqXCI7ICAgIC8v6I635Y+W5pyN5Yqh5ZmoU2Vzc2lvbiAgIOm7mOiupOaYr+eUqOWkp+WOhVNlc3Npb25IYW5kbGVyXHJcbiAgICBwdWJsaWMgQ21kU3luY0JlZ2luID0gXCJzeW5jMVwiOyAgLy/ph43ov57lvIDlp4tcclxuICAgIHB1YmxpYyBDbWRTeW5jRW5kID0gXCJzeW5jMlwiOyAgICAvL+mHjei/nue7k+adn1xyXG4gICAgcHVibGljIENtZFJlZnJlc2ggPSBcInJlZnJlc2hcIjsgIC8v5Yi35paw546p5a625L+h5oGvXHJcbiAgICBwdWJsaWMgQ21kT2ZmbGluZSA9IFwiKmZvMSpcIjsgICAgLy8g56a757q/XHJcbiAgICBwdWJsaWMgQ21kR2FtZVN0YXJ0ID0gXCIqZ3MxKlwiOyAgICAvL+a4uOaIj+W8gOWni1xyXG4gICAgcHVibGljIENtZEdhbWVFbmQgPSBcIipnczIqXCI7ICAgICAgLy/muLjmiI/nu5PmnZ9cclxuICAgIHB1YmxpYyBDbWRDYWxsUmVhZHkgPSBcIipjYWxfcmVsKlwiOyAvL+aPkOekuuWHhuWkh1xyXG4gICAgcHVibGljIENtZFdhaXRNYXRjaCA9IFwid2FpdF9tYXRjaFwiOyAgICAgLy8g5Yy56YWN5Lq6ICAg6buY6K6k5piv55So5aSn5Y6FUHZwV2FpdE1hdGNoSGFuZGxlclxyXG4gICAgcHVibGljIENtZExlYXZlTWF0Y2ggPSBcImxlYXZlX21hdGNoXCI7ICAgLy8g6ISx56a75Yy56YWNXHJcbiAgICBwdWJsaWMgQ21kV2FpdCA9IFwid2FpdFwiOyAgICAvL+etieW+heS4i+WxgOW8gOWni1xyXG4gICAgcHVibGljIENtZERlYWwgPSBcImRlYWxcIjsgICAvL+WPkeeJjFxyXG5cclxuICAgIHB1YmxpYyBDbWRBdXRvID0gXCIqYXUxKlwiOyAgIC8vIOaJmOeuoVxyXG4gICAgXHJcbiAgICBwdWJsaWMgQ21kQ2FsTGFuZGxvcmQgPSBcImNhbF9sYW5kbG9yZFwiOyAgICAgICAgIC8vIOivt+WPq+WcsOS4u1xyXG4gICAgcHVibGljIENtZExhbmRsb3JkID0gXCJsYW5kbG9yZFwiOyAgICAgICAgICAgICAgICAvLyDlj6vlnLDkuLtcclxuICAgIHB1YmxpYyBDbWRPbkxhbmRsb3JkID0gXCJsYW5kX3Jlc3VsdFwiOyAgICAgICAgICAgLy8g5Y+r5Zyw5Li757uT5p6cXHJcbiAgICBwdWJsaWMgQ21kUmVDYWxMYW5kbG9yZCA9IFwicmVjYWxfbGFuZGxvcmRcIjsgICAgIC8vIOmHjeaWsOWPq+WcsOS4u1xyXG5cclxuICAgIHB1YmxpYyBDbWRDYWxNdWx0ID0gXCJjYWxfbXVsdFwiOyAgICAgLy8g6YCJ5oup5Yqg5YCNXHJcbiAgICBwdWJsaWMgQ21kTXVsdCA9IFwibXVsdFwiOyAgICAgICAgICAgIC8vIOWKoOWAjVxyXG5cclxuICAgIHB1YmxpYyBDbWRQbGF5U3RhcnQgPSBcInBsYXlfc3RhcnRcIjsgICAgIC8vIOWHuueJjOmYtuauteW8gOWni1xyXG4gICAgcHVibGljIENtZENhbFBsYXkgPSBcImNhbF9wbGF5XCI7ICAgICAgICAgLy8g6K+35Ye654mMXHJcbiAgICBwdWJsaWMgQ21kUGxheSA9IFwicGxheVwiOyAgICAgICAgICAgICAgICAvLyDlh7rniYxcclxuICAgIHB1YmxpYyBDbWRQYXNzID0gXCJwYXNzXCI7ICAgICAgICAgICAgICAgIC8vIOi/h1xyXG5cclxuICAgIHB1YmxpYyBDbWRPcGVuID0gXCJvcGVuXCI7ICAgIC8vIOe7k+adn+W8gOWJqeS9meeJjFxyXG5cclxuICAgIHB1YmxpYyBDbWRDaGFuZ2VTY29yZSA9IFwiY2hhbmdlX3Njb3JlXCI7ICAgICAvLyDmm7TmlrDlgI3mlbBcclxuXHJcbiAgICBwdWJsaWMgQ21kU3luY1RhYmxlID0gXCJvdGhlcl90YWJsZV9kYXRhXCI7ICAgLy8g6YeN6L+e5pu05paw5Ye654mMXHJcblxyXG4gICAgcHVibGljIENtZFJld2FyZCA9IFwicmV3YXJkXCI7ICAgIC8v57uT566XXHJcblxyXG4gICAgcHVibGljIENtZFJlZnJlc2hIYW5kUG9rZXJzID0gXCJyZWRlYWxcIjsgICAgLy/liLfmlrDmiYvniYxcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLemAu+i+keWumuS5iS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIOeJjOahjOacgOWkp+aUr+aMgeS6uuaVsFxyXG4gICAgcHVibGljIHJlYWRvbmx5IE1heFBsYXllckNvdW50ID0gMztcclxuICAgIC8vIOacrOWcsOW6p+S9jeaYoOWwhOWIsOahjOmdolxyXG4gICAgcHVibGljIHJlYWRvbmx5IExvY2FsVG9WaWV3TWFwID0ge1xyXG4gICAgICAgIFxyXG4gICAgfTtcclxuICAgIC8vIOi/m+WFpeemu+W8gOaXtumXtFxyXG4gICAgcHVibGljIEhlYWRNb3ZlVGltZSA9IDAuMjtcclxuICAgIC8vIOmAieS4reeJjFnlgY/np7vph49cclxuICAgIHB1YmxpYyBDaG9vc2VPZmZzZXRZID0gMjA7XHJcbiAgICAvLyDpgInlnLDkuLvpo57moIflv5fml7bpl7QgMC4yc+eUqOS6juWBnOS4remXtO+8jOWJqeS9meeUqOS6jumjnuihjFxyXG4gICAgcHVibGljIEZseUR6SWNvbiA9IDE7XHJcbiAgICAvLyDmr4/kuKrnjqnlrrblj5HniYzpl7TpmpRcclxuICAgIHB1YmxpYyBQZXJQbGF5ZXJEZWFsSW50ZXJ2YWwgPSAwLjU7XHJcbiAgICAvLyDmr4/lvKDniYzpo57ooYzpl7TpmpRcclxuICAgIHB1YmxpYyBQZXJQb2tlckRlYWxJbnRlcnZhbCA9IDAuMDI7XHJcbiAgICAvLyDlj5Hmr4/lvKDniYznp7vliqjml7bpl7RcclxuICAgIHB1YmxpYyBEZWFsUG9rZXJNb3ZlVGltZSA9IDAuMjtcclxuICAgIC8vIOWJqeS9meS4ieW8oOWcsOS4u+eJjOWKqOeUu+aXtumXtFxyXG4gICAgcHVibGljIER6TGVmdFRocmVlU2hvd1RpbWUgPSAwLjI7XHJcbiAgICAvLyDlpKfmiZHlhYtTY2FsZVxyXG4gICAgcHVibGljIEJpZ1Bva2VyU2NhbGUgPSAxO1xyXG4gICAgLy8g5bCP5omR5YWLU2NhbGVcclxuICAgIHB1YmxpYyBTbWFsbFBva2VyU2NhbGUgPSAwLjQ4O1xyXG4gICAgLy8g5omR5YWL5omT5Ye65bu26L+fLOeUqOS9nOiuvue9rueJjOS9jee9rlxyXG4gICAgcHVibGljIFBva2VyUGxheURlbGF5VGltZSA9IDAuMTtcclxuICAgIC8vIOaJkeWFi+aJk+WHuuenu+WKqOeahOaXtumXtFxyXG4gICAgcHVibGljIFBva2VyUGxheU1vdmVUaW1lID0gMC4xO1xyXG4gICAgLy8g5Ymp5L2Z5Yeg5byg54mM5oql6K2mXHJcbiAgICBwdWJsaWMgV2FybkxlZnRQb2tlckNvdW50ID0gMjtcclxuICAgIC8vIOaSreaUvuinkuiJsuiDnOWIqeWksei0peaXtumXtFxyXG4gICAgcHVibGljIFBsYXlSb2xlV2luVGltZSA9IDE7XHJcbiAgICAvLyDpo5jliIbml7bpl7RcclxuICAgIHB1YmxpYyBGbG9hdFNjb3JlVGltZSA9IDE7XHJcbiAgICAvLyDlsZXnpLrnu5Pnrpfml7bpl7RcclxuICAgIHB1YmxpYyBTaG93U2V0dGxlVGltZSA9IDI7XHJcbiAgICAvLyDmkq3mlL7nu5Pnrpfog4zmma/liqjnlLvml7bpl7RcclxuICAgIHB1YmxpYyBQbGF5U2V0dGxlRWZmZWN0VGltZSA9IDE7XHJcbiAgICAvLyDnu5PnrpfmmL7npLrmjInpkq7lu7bml7bml7bpl7RcclxuICAgIHB1YmxpYyBTZXR0bGVTaG93QWN0VGltZSA9IDI7XHJcbiAgICAvLyDmkq3mlL7mmKXlpKnmiJblj43mmKXlpKnml7bpl7RcclxuICAgIHB1YmxpYyBTcHJpbmdBbmltVGltZSA9IDI7XHJcbiAgICAvLyDmkq3mlL7po57mnLrmiYDpnIDml7bpl7RcclxuICAgIHB1YmxpYyBQbGFuZUFuaW1UaW1lID0gMS41O1xyXG4gICAgLy8g5pKt5pS+54K45by55omA6ZyA5pe26Ze0XHJcbiAgICBwdWJsaWMgQm9tYkFuaW1UaW1lID0gMTtcclxuICAgIC8vIOaSreaUvueBq+eureaJgOmcgOaXtumXtFxyXG4gICAgcHVibGljIFJvY2tldEFuaW1UaW1lID0gMjtcclxuICAgIC8vIOaSreaUvui/nuWvueaJgOmcgOaXtumXtFxyXG4gICAgcHVibGljIExpbmtQYWlyQW5pbVRpbWUgPSAxO1xyXG4gICAgLy8g5pKt5pS+6aG65a2Q5omA6ZyA5pe26Ze0XHJcbiAgICBwdWJsaWMgU3RyYWlnaHRBbmltVGltZSA9IDE7XHJcbiAgICAvLyDmu5HliqjmiYvniYzmu5Hlh7rmnInmlYhY5YGP56e7XHJcbiAgICBwdWJsaWMgUG9rZXJTbGlkZVZhbGlkT2Zmc2V0WCA9IDUwO1xyXG5cclxuICAgIC8vIOWxleekuuiHquW3sei+k+i1ouaXtumXtFxyXG4gICAgcHVibGljIFNob3dTZWxmU2V0dGxlVGltZSA9IDEuMjtcclxuXHJcbiAgICAvLyDkvY3nva7pu5jorqTmmL7npLpcclxuICAgIHB1YmxpYyBEZWZhdWx0TmFtZVN0ciA9ICfpmLLkvZzlvIonO1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0t5pWw5o2u5a2X5q61LS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIOW6leWIhlxyXG4gICAgcHVibGljIEZpZWxkQmFzZVBvaW50ID0gXCJGaWVsZEJhc2VQb2ludFwiO1xyXG4gICAgLy8g5YWl5Zy66ZmQ5Yi2XHJcbiAgICBwdWJsaWMgRmllbGRFbnRlckxpbWl0ID0gXCJGaWVsZEVudGVyTGltaXRcIjtcclxuICAgIC8vIOW9k+WxgOi/m+ihjOS4reeahOagh+W/l1xyXG4gICAgcHVibGljIEZpZWxkR2FtZVN0YXJ0ID0gXCJGaWVsZEdhbWVTdGFydFwiO1xyXG4gICAgLy8g5Zyw5Li75pys5Zyw5bqn5L2NXHJcbiAgICBwdWJsaWMgRmllbGREekxvY1NlYXQgPSBcIkZpZWxkRHpMb2NTZWF0XCI7XHJcbiAgICAvLyDlvZPliY3lh7rniYzniYzlnotcclxuICAgIHB1YmxpYyBGaWVsZE9uT3V0UG9rZXJzID0gXCJGaWVsZE9uT3V0UG9rZXJzXCI7XHJcbiAgICAvLyDlvZPmrKHlh7rniYzmmK/lkKblt7Lmk43kvZxcclxuICAgIHB1YmxpYyBGaWVsZE9uUGxheUFjdGlvbiA9IFwiRmllbGRPblBsYXlBY3Rpb25cIjtcclxuICAgIC8vIOaYr+WQpuW3suiuvue9rueCuOW8ueWQjueahOiDjOaZr+mfs1xyXG4gICAgcHVibGljIEZpZWxkQm9tYkJnbSA9IFwiRmllbGRCb21iQmdtXCI7XHJcbiAgICAvLyDnu5PnrpfkuK1cclxuICAgIHB1YmxpYyBGaWVsZEluU2V0dGxlID0gXCJGaWVsZEluU2V0dGxlXCI7XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS1VSSBWaWV3IENvbXAtLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcHVibGljIFZpZXdNYXRjaFBsYXllciA9IFwiVmlld01hdGNoUGxheWVyXCI7XHJcbiAgICBwdWJsaWMgVmlld0Fza0FjdGlvbiA9IFwiVmlld0Fza0FjdGlvblwiO1xyXG4gICAgcHVibGljIFZpZXdTZXR0bGUgPSBcIlZpZXdTZXR0bGVcIjtcclxuICAgIHB1YmxpYyBWaWV3TWVudUNvbnRhaW5lciA9IFwiVmlld01lbnVDb250YWluZXJcIjtcclxuICAgIHB1YmxpYyBWaWV3RFpMZWZ0UG9rZXJzID0gXCJWaWV3RFpMZWZ0UG9rZXJzXCI7XHJcbiAgICBwdWJsaWMgVmlld01hcmtlciA9IFwiVmlld01hcmtlclwiO1xyXG4gICAgcHVibGljIFZpZXdTZWxmUGxheSA9IFwiVmlld1NlbGZQbGF5XCI7XHJcbn0iXX0=