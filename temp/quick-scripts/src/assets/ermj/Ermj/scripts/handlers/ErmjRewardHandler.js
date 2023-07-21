"use strict";
cc._RF.push(module, 'ec007q1tspA0pywllH6/cNJ', 'ErmjRewardHandler');
// ermj/Ermj/scripts/handlers/ErmjRewardHandler.ts

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
var ErmjDriver_1 = require("../ErmjDriver");
var ErmjBaseHandler_1 = require("./ErmjBaseHandler");
var ErmjRewardHandler = /** @class */ (function (_super) {
    __extends(ErmjRewardHandler, _super);
    function ErmjRewardHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjRewardHandler.prototype.execute = function (msg) {
        var _this = this;
        this.mainUI.askBtnView.setAutoPlayBtnShow(true);
        this.context.set(this.Define.FieldInSettle, true);
        this.mainUI.callAllPlayers("showStateSp", false);
        this.mainUI.askNoticeView.setTimerShow(false);
        this.mainUI.selfPlayView.resetSelectMj();
        this.mainUI.selfPlayView.active = false;
        this.mainUI.askActionView.active = false;
        var winFlag = msg._para.win_flag;
        var detailMap = msg._para.details || {}; // 赢家番map
        var handCardMap = msg._para.all_hand_cards || {}; // 所有人现存手牌
        var darkCardMap = msg._para.all_an_kongs || {}; // 暗杠牌
        var delay = 0;
        for (var chair in handCardMap) {
            var localSeat = this.SitHelper.serverSToLocalN(Number(chair));
            this.mainUI.callMjPlayer(localSeat, "showDownHand", true, handCardMap[chair], !!detailMap[chair]);
            if (localSeat != this.context.selfLocalSeat)
                this.mainUI.callMjPlayer(localSeat, "showDarkKongSeen", darkCardMap[chair] || []);
        }
        delay += 0.5;
        if (winFlag != 0) {
            Game.Component.scheduleOnce(function () {
                for (var chair in detailMap) {
                    var info = detailMap[chair];
                    var localSeat = _this.SitHelper.serverSToLocalN(Number(chair));
                    var fanIndex = 10000;
                    for (var key in info.fan_detail) { // 找到最小的index 即最大番型展示
                        if (fanIndex > Number(key)) {
                            fanIndex = Number(key);
                        }
                    }
                    if (fanIndex != 10000)
                        _this.mainUI.callPlayer(localSeat, "showFanType", true, fanIndex);
                }
            }, delay);
            delay += 1.5;
        }
        Game.Component.scheduleOnce(function () {
            if (winFlag == 0) {
                _this.mainUI.flowView.active = true;
            }
            else {
                _this.mainUI.settleView.active = true;
                _this.mainUI.settleView.showSettleInfo(winFlag == 1, msg._para.award, msg._para.fan, detailMap, handCardMap);
                // this.mainUI.settleView.delayShowActionBtn(time);     // 由leave-103控制显示
            }
        }, delay);
        ErmjDriver_1.default.instance.mainUI.taskManager.reqGetCommisionInfo();
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "ErmjLeaveHandler", delay + 0.1);
    };
    ErmjRewardHandler.prototype.executeSync = function (msg) {
        this.mainUI.diceAnimComp.node.active = false;
        this.context.set(this.Define.FieldInSettle, true);
        this.mainUI.callAllPlayers("showStateSp", false);
        this.mainUI.askNoticeView.setTimerShow(false);
        this.mainUI.selfPlayView.resetSelectMj();
        this.mainUI.selfPlayView.active = false;
        var winFlag = msg._para.win_flag;
        var detailMap = msg._para.details || {}; // 赢家番map
        var handCardMap = msg._para.all_hand_cards || {}; // 所有人现存手牌
        var darkCardMap = msg._para.all_an_kongs || {}; // 暗杠牌
        for (var chair in handCardMap) {
            var localSeat = this.SitHelper.serverSToLocalN(Number(chair));
            this.mainUI.callMjPlayer(localSeat, "showDownHand", true, handCardMap[chair], !!detailMap[chair]);
            if (localSeat != this.context.selfLocalSeat)
                this.mainUI.callMjPlayer(localSeat, "showDarkKongSeen", darkCardMap[chair] || []);
        }
        if (winFlag == 0) {
            this.mainUI.flowView.active = true;
        }
        else {
            this.mainUI.settleView.active = true;
            this.mainUI.settleView.showSettleInfo(winFlag == 1, msg._para.award, msg._para.fan, detailMap, handCardMap);
            // this.mainUI.settleView.delayShowActionBtn(time);
        }
    };
    return ErmjRewardHandler;
}(ErmjBaseHandler_1.default));
exports.default = ErmjRewardHandler;

cc._RF.pop();