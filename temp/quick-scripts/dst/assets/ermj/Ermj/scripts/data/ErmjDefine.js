
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/data/ErmjDefine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcZGF0YVxcRXJtakRlZmluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7UUFDSSxvREFBb0Q7UUFDN0MsZUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFRLFFBQVE7UUFDakMsYUFBUSxHQUFHLE9BQU8sQ0FBQyxDQUFNLE1BQU07UUFDL0IsYUFBUSxHQUFHLE9BQU8sQ0FBQyxDQUFNLE1BQU07UUFDL0IsZUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFJLHFDQUFxQztRQUU5RCxlQUFVLEdBQUcsU0FBUyxDQUFDLENBQUUsUUFBUTtRQUNqQyxlQUFVLEdBQUcsT0FBTyxDQUFDLENBQUksS0FBSztRQUM5QixpQkFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFJLE1BQU07UUFDakMsZUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFNLE1BQU07UUFDakMsaUJBQVksR0FBRyxXQUFXLENBQUMsQ0FBQyxNQUFNO1FBQ2xDLGlCQUFZLEdBQUcsWUFBWSxDQUFDLENBQUssa0NBQWtDO1FBQ25FLGtCQUFhLEdBQUcsYUFBYSxDQUFDLENBQUcsT0FBTztRQUN4QyxZQUFPLEdBQUcsTUFBTSxDQUFDLENBQUksUUFBUTtRQUU3QixjQUFTLEdBQUcsUUFBUSxDQUFDLENBQVEsS0FBSztRQUNsQyxZQUFPLEdBQUcsTUFBTSxDQUFDLENBQVksS0FBSztRQUNsQyxvQkFBZSxHQUFHLGVBQWUsQ0FBQyxDQUFPLEtBQUs7UUFDOUMsaUJBQVksR0FBRyxZQUFZLENBQUMsQ0FBSyxTQUFTO1FBQzFDLGdCQUFXLEdBQUcsV0FBVyxDQUFDO1FBQzFCLHFCQUFnQixHQUFHLGdCQUFnQixDQUFDLENBQUssUUFBUTtRQUNqRCxzQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQyxDQUFJLFFBQVE7UUFDbEQsV0FBTSxHQUFHLEtBQUssQ0FBQyxDQUFNLEtBQUs7UUFDMUIsWUFBTyxHQUFHLE1BQU0sQ0FBQyxDQUFRLElBQUk7UUFDN0IsWUFBTyxHQUFHLE1BQU0sQ0FBQyxDQUFRLElBQUk7UUFDN0IsWUFBTyxHQUFHLE1BQU0sQ0FBQyxDQUFRLElBQUk7UUFDN0IsWUFBTyxHQUFHLE1BQU0sQ0FBQyxDQUFRLElBQUk7UUFDN0IsZ0JBQVcsR0FBRyxVQUFVLENBQUEsQ0FBSyxXQUFXO1FBQ3hDLFlBQU8sR0FBRyxNQUFNLENBQUEsQ0FBUyxLQUFLO1FBQzlCLGtCQUFhLEdBQUcsYUFBYSxDQUFDLENBQUcsT0FBTztRQUN4QyxnQkFBVyxHQUFHLFVBQVUsQ0FBQyxDQUFRLE1BQU07UUFDdkMsWUFBTyxHQUFHLE1BQU0sQ0FBQyxDQUFZLEtBQUs7UUFDbEMsY0FBUyxHQUFHLFFBQVEsQ0FBQyxDQUFRLEtBQUs7UUFFbEMsaUJBQVksR0FBRyxPQUFPLENBQUMsQ0FBRSxNQUFNO1FBQy9CLGVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBSSxNQUFNO1FBQy9CLGlCQUFZLEdBQUcsWUFBWSxDQUFDLENBQUcsU0FBUztRQUN4QyxZQUFPLEdBQUcsTUFBTSxDQUFDLENBQVEsV0FBVztRQUVwQyxZQUFPLEdBQUcsT0FBTyxDQUFDLENBQUcsS0FBSztRQUNqQyxrREFBa0Q7UUFDbEQsdUJBQXVCO1FBQ1AsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFDcEMsY0FBYztRQUNFLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25DLGdDQUFnQztRQUNoQix5QkFBb0IsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0RCxvREFBb0Q7UUFDcEMsc0JBQWlCLEdBQUc7WUFDaEMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ2IsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FHaEIsQ0FBQztRQUNGLGdCQUFnQjtRQUNBLGtCQUFhLEdBQUc7WUFDNUIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDZCxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FHaEIsQ0FBQTtRQUNELHlCQUF5QjtRQUNULHFCQUFnQixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqRSxtQkFBbUI7UUFDSCxvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUNyQyw4QkFBOEI7UUFDZCxrQkFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuRSxxQ0FBcUM7UUFDckIsd0JBQW1CLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNFLG1CQUFtQjtRQUNILHNCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUN2QyxpQkFBaUI7UUFDRCxrQkFBYSxHQUFHLEdBQUcsQ0FBQztRQUNwQyxlQUFlO1FBQ0MsaUJBQVksR0FBRyxHQUFHLENBQUM7UUFDbkMsY0FBYztRQUNFLGtCQUFhLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEQsZUFBZTtRQUNDLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3BDLHVCQUF1QjtRQUNQLHdCQUFtQixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0RixzQkFBc0I7UUFDTix5QkFBb0IsR0FBRyxFQUFFLENBQUM7UUFDMUMsU0FBUztRQUNGLGlCQUFZLEdBQUcsR0FBRyxDQUFDO1FBRTFCLDJDQUEyQztRQUMzQyxhQUFhO1FBQ04sb0JBQWUsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxZQUFZO1FBQ0wsbUJBQWMsR0FBRyxnQkFBZ0IsQ0FBQztRQUN6QyxVQUFVO1FBQ0gsa0JBQWEsR0FBRyxlQUFlLENBQUM7UUFDdkMsaUJBQWlCO1FBQ1Ysb0JBQWUsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxtQkFBbUI7UUFDWiwwQkFBcUIsR0FBRyx1QkFBdUIsQ0FBQztRQUN2RCxnQkFBZ0I7UUFDVCxnQkFBVyxHQUFHLGFBQWEsQ0FBQztRQUNuQyxhQUFhO1FBQ04sa0JBQWEsR0FBRyxlQUFlLENBQUM7UUFFdkMsOENBQThDO1FBQ3ZDLG9CQUFlLEdBQUcsaUJBQWlCLENBQUM7UUFDcEMsa0JBQWEsR0FBRyxlQUFlLENBQUM7UUFDaEMsa0JBQWEsR0FBRyxlQUFlLENBQUM7UUFDaEMsa0JBQWEsR0FBRyxlQUFlLENBQUM7UUFDaEMsZUFBVSxHQUFHLFlBQVksQ0FBQztRQUMxQixhQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ3RCLGlCQUFZLEdBQUcsY0FBYyxDQUFDO1FBQzlCLGtCQUFhLEdBQUcsZUFBZSxDQUFDO1FBQ2hDLGlCQUFZLEdBQUcsY0FBYyxDQUFDO1FBQzlCLGFBQVEsR0FBRyxVQUFVLENBQUM7UUFDdEIsZUFBVSxHQUFHLFlBQVksQ0FBQztRQUMxQixlQUFVLEdBQUcsWUFBWSxDQUFDO1FBQzFCLG9CQUFlLEdBQUcsaUJBQWlCLENBQUM7SUFDL0MsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FySEEsQUFxSEMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEVybWpEZWZpbmV7XHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS3ljY/orq7lrprkuYktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHB1YmxpYyBDbWRHYW1lQ2ZnID0gXCJhXCI7ICAgICAgICAvL+a4uOaIj+aIv+mXtOmFjee9rlxyXG4gICAgcHVibGljIENtZEVudGVyID0gXCIqZW4xKlwiOyAgICAgIC8v6L+b5YWl5oi/6Ze0XHJcbiAgICBwdWJsaWMgQ21kTGVhdmUgPSBcIipsZWUqXCI7ICAgICAgLy/nprvlvIDmiL/pl7RcclxuICAgIHB1YmxpYyBDbWRTZXNzaW9uID0gXCIqc3NzKlwiOyAgICAvL+iOt+WPluacjeWKoeWZqFNlc3Npb24gICDpu5jorqTmmK/nlKjlpKfljoVTZXNzaW9uSGFuZGxlclxyXG5cclxuICAgIHB1YmxpYyBDbWRSZWZyZXNoID0gXCJyZWZyZXNoXCI7ICAvL+WIt+aWsOeOqeWutuS/oeaBr1xyXG4gICAgcHVibGljIENtZE9mZmxpbmUgPSBcIipmbzEqXCI7ICAgIC8vIOemu+e6v1xyXG4gICAgcHVibGljIENtZEdhbWVTdGFydCA9IFwiKmdzMSpcIjsgICAgLy/muLjmiI/lvIDlp4tcclxuICAgIHB1YmxpYyBDbWRHYW1lRW5kID0gXCIqZ3MyKlwiOyAgICAgIC8v5ri45oiP57uT5p2fXHJcbiAgICBwdWJsaWMgQ21kQ2FsbFJlYWR5ID0gXCIqY2FsX3JlbCpcIjsgLy/mj5DnpLrlh4blpIdcclxuICAgIHB1YmxpYyBDbWRXYWl0TWF0Y2ggPSBcIndhaXRfbWF0Y2hcIjsgICAgIC8vIOWMuemFjeS6uiAgIOm7mOiupOaYr+eUqOWkp+WOhVB2cFdhaXRNYXRjaEhhbmRsZXJcclxuICAgIHB1YmxpYyBDbWRMZWF2ZU1hdGNoID0gXCJsZWF2ZV9tYXRjaFwiOyAgIC8vIOiEseemu+WMuemFjVxyXG4gICAgcHVibGljIENtZFdhaXQgPSBcIndhaXRcIjsgICAgLy/nrYnlvoXkuIvlsYDlvIDlp4tcclxuXHJcbiAgICBwdWJsaWMgQ21kQmFua2VyID0gXCJiYW5rZXJcIjsgICAgICAgIC8vIOWumuW6hFxyXG4gICAgcHVibGljIENtZERlYWwgPSBcImRlYWxcIjsgICAgICAgICAgICAvLyDlj5HniYxcclxuICAgIHB1YmxpYyBDbWRDaGFuZ2VGbG93ZXIgPSBcImNoYW5nZV9mbG93ZXJcIjsgICAgICAgLy8g5o2i6IqxXHJcbiAgICBwdWJsaWMgQ21kUGxheVN0YXJ0ID0gXCJwbGF5X3N0YXJ0XCI7ICAgICAvLyDlh7rniYzpmLbmrrXlvIDlp4tcclxuICAgIHB1YmxpYyBDbWREcmF3Q2FyZCA9IFwiZHJhd19jYXJkXCI7XHJcbiAgICBwdWJsaWMgQ21kQ2FsbFNlbGZCbG9jayA9IFwiY2FsX3NlbGZfYmxvY2tcIjsgICAgIC8vIOaRuOeJjOWQjuaTjeS9nFxyXG4gICAgcHVibGljIENtZENhbGxPdGhlckJsb2NrID0gXCJjYWxfb3RoZXJfYmxvY2tcIjsgICAgLy8g5Ye654mM5ZCO5pON5L2cXHJcbiAgICBwdWJsaWMgQ21kV2luID0gXCJ3aW5cIjsgICAgICAvLyDog6HniYxcclxuICAgIHB1YmxpYyBDbWRLb25nID0gXCJrb25nXCI7ICAgICAgICAvLyDmnaBcclxuICAgIHB1YmxpYyBDbWRQb25nID0gXCJwb25nXCI7ICAgICAgICAvLyDnorBcclxuICAgIHB1YmxpYyBDbWRDaG93ID0gXCJjaG93XCI7ICAgICAgICAvLyDlkINcclxuICAgIHB1YmxpYyBDbWRQYXNzID0gXCJwYXNzXCI7ICAgICAgICAvLyDov4dcclxuICAgIHB1YmxpYyBDbWRDYWxsVGluZyA9IFwiY2FsX3RpbmdcIiAgICAgLy8g6K+35ZCs54mMIOiDoeeJjOaPkOekulxyXG4gICAgcHVibGljIENtZFRpbmcgPSBcInRpbmdcIiAgICAgICAgIC8vIOWQrOeJjFxyXG4gICAgcHVibGljIENtZFRpbmdSZXN1bHQgPSBcInRpbmdfcmVzdWx0XCI7ICAgLy8g5ZCs54mM57uT5p6cXHJcbiAgICBwdWJsaWMgQ21kQ2FsbFBsYXkgPSBcImNhbF9wbGF5XCI7ICAgICAgICAvLyDor7flh7rniYxcclxuICAgIHB1YmxpYyBDbWRQbGF5ID0gXCJwbGF5XCI7ICAgICAgICAgICAgLy8g5Ye654mMXHJcbiAgICBwdWJsaWMgQ21kUmV3YXJkID0gXCJyZXdhcmRcIjsgICAgICAgIC8vIOe7k+eul1xyXG4gICAgXHJcbiAgICBwdWJsaWMgQ21kU3luY0JlZ2luID0gXCJzeW5jMVwiOyAgLy/ph43ov57lvIDlp4tcclxuICAgIHB1YmxpYyBDbWRTeW5jRW5kID0gXCJzeW5jMlwiOyAgICAvL+mHjei/nue7k+adn1xyXG4gICAgcHVibGljIENtZFN5bmNUYWJsZSA9IFwidGFibGVfZGF0YVwiOyAgIC8vIOmHjei/nuabtOaWsOWHuueJjFxyXG4gICAgcHVibGljIENtZENoYXQgPSBcImNoYXRcIjsgICAgICAgIC8vIOiBiuWkqSDooajmg4XlkozmloflrZdcclxuXHJcbiAgICBwdWJsaWMgQ21kQXV0byA9IFwiKmF1MSpcIjsgICAvLyDmiZjnrqFcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLemAu+i+keWumuS5iS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8qKiDmiYvkuIrmnIDlpJrpurvlsIblvKDmlbAg5pyq5Ye654mM5pe25aSa5LiA5bygICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgSGFuZE1qTWF4Q291bnQgPSAxMztcclxuICAgIC8qKum6u+WwhumAieS4reWQkeS4iuWBj+enuyAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IENob29zZU9mZnNldFkgPSAyMDtcclxuICAgIC8qKiDoh6rlt7HmiYvniYzpurvlsIblrZDpl7TpmpQg566X5LiK6bq75bCG5a2Q5a695ZCO55qE5YC8IOato+i0n+ihqOaWueWQkSAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IFNlbGZIYW5kTWFoam9uZ1NwYWNlID0gY2MudjMoNzcuMiwgMCk7XHJcbiAgICAvKirmipPpurvlsIblrZDmlL7lnKjmiYvniYzmnKvlsL7kvY3nva7ml7bnm7jlr7nmnIDlkI7kuIDkuKrpurvlsIblrZDlgY/np7sgIOaVsOe7hOaMieacrOWcsOW6p+S9jSjlhbzlrrnlm5vkurrpurvlsIYpIOato+i0n+ihqOaWueWQkSovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgTGFzdE9uZURlYWxPZmZzZXQgPSBbXHJcbiAgICAgICAgY2MudjMoMTEwLCAwKSwgXHJcbiAgICAgICAgY2MudjMoLTUwLCAwKSwgXHJcbiAgICAgICAgLy8gY2MudjMoMCwgLTM2KSwgXHJcbiAgICAgICAgLy8gY2MudjMoMCwgMzYpLFxyXG4gICAgXTtcclxuICAgIC8qKiDlkIPnorDmnaDniYwg5o6S5YiX6Ze06LedICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgT3BlclZpZXdTcGFjZSA9IFtcclxuICAgICAgICBjYy52MygtMTY3LCAwKSxcclxuICAgICAgICBjYy52MygxNjcsIDApLFxyXG4gICAgICAgIC8vIGNjLnYzKDAsIC0xNDApLCBcclxuICAgICAgICAvLyBjYy52MygwLCAxNDApLFxyXG4gICAgXVxyXG4gICAgLyoqIOiKseeJjOaRhuaUvumAj+inhuetiee6p+WIl+ihqCwg5pyA5aSa5YWr5Liq6Iqx54mMICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZmxvd2VyTWpQZXJzcEFyciA9IFstNSwgLTQsIC0zLCAtMiwgLTEsIDAsIDAsIDBdO1xyXG4gICAgLyoqIOWHuueJjOm6u+WwhuWtkOaRhuaUvueahOacgOWkp+WIl+aVsCAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IE91dFNob3dNak1heENvbCA9IDEwO1xyXG4gICAgLyoqIOWHuueJjOahjOmdoum6u+WwhuWtkOmAj+inhuetiee6p+WIl+ihqCDkuIDooYwxMOW8oCAwfjkgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBvdXRNalBlcnNwQXJyID0gWy00LCAtMywgLTIsIC0xLCAwLCAwLCAxLCAyLCAzLCA0XTtcclxuICAgIC8qKiDlkIPnorDmnaDniYwg6YCP6KeG562J57qn5YiX6KGoIOavj+S4ieS4quS4uuS4gOW6pyDmnaDniYzlj5bkuK3pl7TloIblj6Ag5LuO5Y+z5b6A5bemKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBvcGVyTWpHcm91cFBlcnNwQXJyID0gWzksIDgsIDcsIDYsIDUsIDQsIDMsIDIsIDEsIDAsIDAsIDBdO1xyXG4gICAgLyoqIOadoOeJjOesrOWbm+W8oOWPluS4remXtOS4iuenu+WDj+e0oCAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG9wZXJNaktvbmdPZmZzZXRZID0gMjI7XHJcbiAgICAvKiog6bq75bCG5omT5Ye65bGV56S65YGc55WZ5pe26Ze0ICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgb3V0TWpTaG93VGltZSA9IDAuMztcclxuICAgIC8qKiDpurvlsIbmiZPlh7rpo57ooYzml7bpl7QgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBvdXRNakZseVRpbWUgPSAwLjI7XHJcbiAgICAvKiog6IOh54mM6YCP6KeG562J57qn5YiX6KGoKi9cclxuICAgIHB1YmxpYyByZWFkb25seSB3aW5NalBlcnNwQXJyID0gWzUsIDYsIDcsIDgsIDldO1xyXG4gICAgLyoqIOiDoeeJjOWkmuihjOaXtuS9nOWghuWPoCAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHdpbk1vcmVPZmZzZXRZID0gMjI7XHJcbiAgICAvKiog5piO54mM5Lqu54mMIOmAj+inhuetiee6p+WIl+ihqCDmnIDlpJoxNOW8oCovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgd2luQnJpZ2h0TWpQZXJzcEFyciA9IFstNSwgLTQsIC0zLCAtMiwgLTEsIDAsIDAsIDAsIDAsIDAsIDEsIDIsIDMsIDRdO1xyXG4gICAgLyoqIOaRiueJjCDmnIDlkI7kuIDlvKDog6HniYzmiJbmkbjniYwg5YGP56e7ICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgd2luQnJpZ2h0TGFzdE9mZnNldFggPSAxMDtcclxuICAgIC8vIOi/m+WFpeemu+W8gOaXtumXtFxyXG4gICAgcHVibGljIEhlYWRNb3ZlVGltZSA9IDAuMjtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLeWxgOWGheaVsOaNruWtl+autS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvKiog5bqE5a625pys5Zyw5bqn5L2NICovXHJcbiAgICBwdWJsaWMgRmllbGRCYW5rZXJTZWF0ID0gXCJGaWVsZEJhbmtlclNlYXRcIjtcclxuICAgIC8qKiDmmK/lkKblvIDlsYDkuoYgKi9cclxuICAgIHB1YmxpYyBGaWVsZEdhbWVTdGFydCA9IFwiRmllbGRHYW1lU3RhcnRcIjtcclxuICAgIC8qKiDnu5PnrpfkuK0gKi8gXHJcbiAgICBwdWJsaWMgRmllbGRJblNldHRsZSA9IFwiRmllbGRJblNldHRsZVwiO1xyXG4gICAgLyoqIOatpOaXtuaYr+WQpuWPr+S7peWHuueJjOWbnuWQiCAqL1xyXG4gICAgcHVibGljIEZpZWxkSW5QbGF5VHVybiA9IFwiRmllbGRJblBsYXlUdXJuXCI7XHJcbiAgICAvKiog5q2k5pe25piv5ZCm5Y+v5Lul5pON5L2c5omL54mM6YCJ5LitICovXHJcbiAgICBwdWJsaWMgRmllbGRIYW5kQWN0aW9uRW5hYmxlID0gXCJGaWVsZEhhbmRBY3Rpb25FbmFibGVcIjtcclxuICAgIC8qKiDmnKzlsYDoh6rlt7HmmK/lkKblt7LlkKzniYwgKi9cclxuICAgIHB1YmxpYyBGaWVsZEluVGluZyA9IFwiRmllbGRJblRpbmdcIjtcclxuICAgIC8qKiDoh6rlt7HlkKzniYzmlbDmja4gKi9cclxuICAgIHB1YmxpYyBGaWVsZFRpbmdEYXRhID0gXCJGaWVsZFRpbmdEYXRhXCI7XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS1VSSBWaWV3IENvbXAtLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcHVibGljIFZpZXdNYXRjaFBsYXllciA9IFwiVmlld01hdGNoUGxheWVyXCI7XHJcbiAgICBwdWJsaWMgVmlld0dhbWVTdGFydCA9IFwiVmlld0dhbWVTdGFydFwiO1xyXG4gICAgcHVibGljIFZpZXdMaWdodG5pbmcgPSBcIlZpZXdMaWdodG5pbmdcIjtcclxuICAgIHB1YmxpYyBWaWV3QXNrTm90aWNlID0gXCJWaWV3QXNrTm90aWNlXCI7XHJcbiAgICBwdWJsaWMgVmlld01qSGlsbCA9IFwiVmlld01qSGlsbFwiO1xyXG4gICAgcHVibGljIFZpZXdNZW51ID0gXCJWaWV3TWVudVwiO1xyXG4gICAgcHVibGljIFZpZXdMZWZ0VGlwcyA9IFwiVmlld0xlZnRUaXBzXCI7XHJcbiAgICBwdWJsaWMgVmlld0Fza0FjdGlvbiA9IFwiVmlld0Fza0FjdGlvblwiO1xyXG4gICAgcHVibGljIFZpZXdTZWxmUGxheSA9IFwiVmlld1NlbGZQbGF5XCI7XHJcbiAgICBwdWJsaWMgVmlld0Zsb3cgPSBcIlZpZXdGbG93XCI7XHJcbiAgICBwdWJsaWMgVmlld1NldHRsZSA9IFwiVmlld1NldHRsZVwiO1xyXG4gICAgcHVibGljIFZpZXdBc2tCdG4gPSBcIlZpZXdBc2tCdG5cIjtcclxuICAgIHB1YmxpYyBWaWV3SW50ZXJhY3RBY3QgPSBcIlZpZXdJbnRlcmFjdEFjdFwiO1xyXG59Il19