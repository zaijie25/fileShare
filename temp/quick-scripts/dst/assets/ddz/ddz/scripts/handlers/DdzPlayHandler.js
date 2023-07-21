
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/handlers/DdzPlayHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5b0e3Vy8zhHxL8XGWCguWeV', 'DdzPlayHandler');
// ddz/ddz/scripts/handlers/DdzPlayHandler.ts

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
exports.DdzOnPassHandler = exports.DdzOnPlayHandler = exports.DdzCalPlayHandler = exports.DdzPlayStartHandler = void 0;
var DdzBaseHandler_1 = require("./DdzBaseHandler");
var DdzGameConst_1 = require("../data/DdzGameConst");
var DdzRuleConst_1 = require("../data/DdzRuleConst");
var DdzPathHelper_1 = require("../data/DdzPathHelper");
var DdzDriver_1 = require("../DdzDriver");
var DdzPlayStartHandler = /** @class */ (function (_super) {
    __extends(DdzPlayStartHandler, _super);
    function DdzPlayStartHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzPlayStartHandler.prototype.execute = function (msg) {
        this.mainUI.callAllPlayers('setState', false);
        this.mainUI.showActionTimer(false);
        this.mainUI.showMarker(true);
        this.mainUI.askActionView.setAutoPlayBtnShow(true);
    };
    DdzPlayStartHandler.prototype.executeSync = function (msg) {
        this.execute(msg);
    };
    return DdzPlayStartHandler;
}(DdzBaseHandler_1.default));
exports.DdzPlayStartHandler = DdzPlayStartHandler;
var DdzCalPlayHandler = /** @class */ (function (_super) {
    __extends(DdzCalPlayHandler, _super);
    function DdzCalPlayHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzCalPlayHandler.prototype.refreshData = function (msg) {
        if (msg._para.play_type == 0) {
            this.context.set(this.Define.FieldOnOutPokers, {}); // 清除牌桌当前出牌
        }
    };
    DdzCalPlayHandler.prototype.execute = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        this.mainUI.callPlayer(localSeat, 'setState', false);
        if (localSeat == 0) {
            var selfHandpokers = this.context.getSelfHandPokers();
            if (msg._para.count != selfHandpokers.length) {
                this.SendRedeal();
            }
            var isAction = this.context.get(this.Define.FieldOnPlayAction);
            if (isAction) { // 手动出异常牌重新call_play时 刷新手牌  理论上不会粗线 以防万一
                this.mainUI.selfPlayView.refreshHandPokersOnErr();
                this.context.set(this.Define.FieldOnPlayAction, false);
            }
            // this.mainUI.selfPlayView.setValidPokers();  // 预防
            if (msg._para.play_type == 0) {
                this.mainUI.askActionView.setPlayViewShow(true, false, false); // 主动出牌情况
            }
            else {
                DdzDriver_1.default.instance.PlayRuleHelper.initRecommendHelper(this.context.getSelfHandPokers(), this.context.get(this.Define.FieldOnOutPokers));
                if (DdzDriver_1.default.instance.PlayRuleHelper.checkBigger()) {
                    this.mainUI.askActionView.setPlayViewShow(true, true, true); // 要得起的情况
                }
                else {
                    this.mainUI.askActionView.setCannotPlayViewShow(true); // 要不起的情况
                }
            }
        }
        var time = 0;
        var serverTime = msg._times;
        if (serverTime && Game.Component.correctTime) {
            var dev = Game.Component.correctTime(serverTime);
            time = msg._timeo * 1000 - dev;
        }
        else {
            time = msg._timeo * 1000 - (Date.now() - msg._receiveTime);
        }
        if (!time || time <= 0)
            time = 1000;
        this.mainUI.showActionTimer(true, localSeat, time, null);
        this.mainUI.clockComp.setClockAudioEnable(true);
        this.mainUI.callPlayer(localSeat, 'showPlayPokers', false);
        this.mainUI.callPlayer(localSeat, 'showPlayerThinkEffect');
    };
    DdzCalPlayHandler.prototype.executeSync = function (msg) {
        this.execute(msg);
    };
    DdzCalPlayHandler.prototype.SendRedeal = function () {
        Game.Server.send(this.Define.CmdRefreshHandPokers, {});
    };
    return DdzCalPlayHandler;
}(DdzBaseHandler_1.default));
exports.DdzCalPlayHandler = DdzCalPlayHandler;
var DdzOnPlayHandler = /** @class */ (function (_super) {
    __extends(DdzOnPlayHandler, _super);
    function DdzOnPlayHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzOnPlayHandler.prototype.execute = function (msg) {
        var _this = this;
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        var count = msg._para.count;
        var cards = msg._para.cards;
        var type = msg._para.type;
        var playData = DdzDriver_1.default.instance.PlayRuleHelper.getPokersType(msg._para.cards);
        this.context.set(this.Define.FieldOnOutPokers, playData); // 设置当前轮最大出牌数据
        if (localSeat == 0) {
            DdzDriver_1.default.instance.PlayRuleHelper.clearRecommend(); //清除提示工具
            this.mainUI.askActionView.setPlayViewShow(false);
            this.context.removeSelfHandPokers(cards);
            var isAction = this.context.get(this.Define.FieldOnPlayAction);
            var isSysPlay = msg._para.flag == 1; // 系统出牌
            if (isAction) { // 存在临界状态 点了出牌 服务器同时下发超时出牌 导致手牌丢失    (不需要了，等回包再出牌)
                if (isSysPlay) { // 操作了出牌 但是服务器给的是系统出牌
                    this.mainUI.selfPlayView.refreshHandPokersOnErr();
                    this.mainUI.doPlayPokers(cards);
                }
                else {
                    this.mainUI.doResetPokers();
                    this.mainUI.doPlayPokers(cards);
                }
            }
            else { // 自动出牌走这
                this.mainUI.doResetPokers();
                this.mainUI.doPlayPokers(cards);
            }
        }
        else {
            this.mainUI.callPlayer(localSeat, 'setPlayerLeftPokers', true, count);
            this.mainUI.callPlayer(localSeat, 'showPlayPokers', true, cards, true);
        }
        this.mainUI.showActionTimer(false);
        this.context.set(this.Define.FieldOnPlayAction, false);
        var soundRes = DdzRuleConst_1.default.getPlayTypeSoundRes(type, playData.weight);
        if (soundRes) {
            Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.genderSoundPath(soundRes, 0), true);
        }
        if (!this.context.get(this.Define.FieldBombBgm)) {
            if (DdzRuleConst_1.default.checkIsBomb(type) || DdzRuleConst_1.default.checkIsRocket(type)) {
                Global.Audio.playGameBundleMusic(DdzPathHelper_1.DdzAudioConst.Bgm2, true);
                this.context.set(this.Define.FieldBombBgm, true);
            }
        }
        var totalTime = 0.1;
        Game.Component.scheduleOnce(function () {
            _this.mainUI.showPokerTypeEffect(localSeat, type);
        }, totalTime);
        totalTime += 0.1; // 分帧执行 否则低端手机会出现卡顿
        Game.Component.scheduleOnce(function () {
            _this.mainUI.callPlayer(localSeat, 'showPlayerPlayEffect', DdzRuleConst_1.default.checkIsBomb(type) || DdzRuleConst_1.default.checkIsRocket(type));
        }, totalTime);
        totalTime += 0.1;
        Game.Component.scheduleOnce(function () {
            _this.context.updateMarkerData(cards);
        }, totalTime);
        totalTime += 0.1;
        if (count > 0 && count <= this.Define.WarnLeftPokerCount) {
            this.mainUI.callPlayer(localSeat, 'showWarnSign', true);
            var soundArr = [];
            if (count == 1) {
                soundArr = DdzPathHelper_1.DdzAudioConst.WarningOneArr;
            }
            else if (count == 2) {
                soundArr = DdzPathHelper_1.DdzAudioConst.WarningTwoArr;
            }
            var res_1 = soundArr[Global.Toolkit.getRoundInteger(soundArr.length)];
            if (res_1) {
                Game.Component.scheduleOnce(function () {
                    Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.WarningAudio, true);
                    Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.genderSoundPath(res_1, 0), true);
                }, totalTime);
            }
        }
        Game.Event.event(Game.EVENT_ADDTIMELOCK, 'DdzOnPlayHandler', totalTime + 0.1);
    };
    return DdzOnPlayHandler;
}(DdzBaseHandler_1.default));
exports.DdzOnPlayHandler = DdzOnPlayHandler;
var DdzOnPassHandler = /** @class */ (function (_super) {
    __extends(DdzOnPassHandler, _super);
    function DdzOnPassHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzOnPassHandler.prototype.execute = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        if (localSeat == 0) {
            this.mainUI.askActionView.setPlayViewShow(false);
            this.mainUI.askActionView.setCannotPlayViewShow(false);
            this.mainUI.doResetPokers();
            DdzDriver_1.default.instance.PlayRuleHelper.clearRecommend();
        }
        var data = this.context.get(this.Define.FieldOnOutPokers);
        var res = DdzRuleConst_1.default.getPassSoundRes(data.type);
        if (res)
            Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.genderSoundPath(res, 0), true);
        this.mainUI.callPlayer(localSeat, 'setState', true, DdzGameConst_1.DdzGameActState.Play, 0);
        this.mainUI.callPlayer(localSeat, 'showPlayerNormalEffect');
    };
    return DdzOnPassHandler;
}(DdzBaseHandler_1.default));
exports.DdzOnPassHandler = DdzOnPassHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGhhbmRsZXJzXFxEZHpQbGF5SGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBQzlDLHFEQUF1RDtBQUN2RCxxREFBZ0Q7QUFDaEQsdURBQXNEO0FBQ3RELDBDQUFxQztBQUVyQztJQUF5Qyx1Q0FBYztJQUF2RDs7SUFXQSxDQUFDO0lBVmEscUNBQU8sR0FBakIsVUFBa0IsR0FBRztRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVTLHlDQUFXLEdBQXJCLFVBQXNCLEdBQUc7UUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQVhBLEFBV0MsQ0FYd0Msd0JBQWMsR0FXdEQ7QUFYWSxrREFBbUI7QUFhaEM7SUFBdUMscUNBQWM7SUFBckQ7O0lBMkRBLENBQUM7SUExRGEsdUNBQVcsR0FBckIsVUFBc0IsR0FBRztRQUNyQixJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLENBQUMsRUFBQztZQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUssV0FBVztTQUN0RTtJQUNMLENBQUM7SUFDUyxtQ0FBTyxHQUFqQixVQUFrQixHQUFHO1FBQ2pCLElBQUks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QixDQUFDLDZCQUFhLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSw4QkFBZSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQWhCQSxBQWdCQyxDQWhCcUMsd0JBQWMsR0FnQm5EO0FBaEJZLDRDQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZHpCYXNlSGFuZGxlciBmcm9tIFwiLi9EZHpCYXNlSGFuZGxlclwiO1xyXG5pbXBvcnQgeyBEZHpHYW1lQWN0U3RhdGUgfSBmcm9tIFwiLi4vZGF0YS9EZHpHYW1lQ29uc3RcIjtcclxuaW1wb3J0IERkelJ1bGVDb25zdCBmcm9tIFwiLi4vZGF0YS9EZHpSdWxlQ29uc3RcIjtcclxuaW1wb3J0IHsgRGR6QXVkaW9Db25zdCB9IGZyb20gXCIuLi9kYXRhL0RkelBhdGhIZWxwZXJcIjtcclxuaW1wb3J0IERkekRyaXZlciBmcm9tIFwiLi4vRGR6RHJpdmVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGR6UGxheVN0YXJ0SGFuZGxlciBleHRlbmRzIERkekJhc2VIYW5kbGVye1xyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGUobXNnKXtcclxuICAgICAgICB0aGlzLm1haW5VSS5jYWxsQWxsUGxheWVycygnc2V0U3RhdGUnLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuc2hvd0FjdGlvblRpbWVyKGZhbHNlKTtcclxuICAgICAgICB0aGlzLm1haW5VSS5zaG93TWFya2VyKHRydWUpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmFza0FjdGlvblZpZXcuc2V0QXV0b1BsYXlCdG5TaG93KHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlU3luYyhtc2cpe1xyXG4gICAgICAgIHRoaXMuZXhlY3V0ZShtc2cpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGR6Q2FsUGxheUhhbmRsZXIgZXh0ZW5kcyBEZHpCYXNlSGFuZGxlcntcclxuICAgIHByb3RlY3RlZCByZWZyZXNoRGF0YShtc2cpe1xyXG4gICAgICAgIGlmIChtc2cuX3BhcmEucGxheV90eXBlID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc2V0KHRoaXMuRGVmaW5lLkZpZWxkT25PdXRQb2tlcnMsIHt9KTsgICAgIC8vIOa4hemZpOeJjOahjOW9k+WJjeWHuueJjFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBleGVjdXRlKG1zZyl7XHJcbiAgICAgICAgbGV0IGxvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihtc2cuX3NyYyk7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuY2FsbFBsYXllcihsb2NhbFNlYXQsICdzZXRTdGF0ZScsIGZhbHNlKTtcclxuICAgICAgICBpZiAobG9jYWxTZWF0ID09IDApe1xyXG4gICAgICAgICAgICBsZXQgc2VsZkhhbmRwb2tlcnMgPSB0aGlzLmNvbnRleHQuZ2V0U2VsZkhhbmRQb2tlcnMoKVxyXG4gICAgICAgICAgICBpZihtc2cuX3BhcmEuY291bnQgIT0gc2VsZkhhbmRwb2tlcnMubGVuZ3RoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNlbmRSZWRlYWwoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBpc0FjdGlvbiA9IHRoaXMuY29udGV4dC5nZXQodGhpcy5EZWZpbmUuRmllbGRPblBsYXlBY3Rpb24pO1xyXG4gICAgICAgICAgICBpZiAoaXNBY3Rpb24peyAgICAgIC8vIOaJi+WKqOWHuuW8guW4uOeJjOmHjeaWsGNhbGxfcGxheeaXtiDliLfmlrDmiYvniYwgIOeQhuiuuuS4iuS4jeS8mueyl+e6vyDku6XpmLLkuIfkuIBcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpblVJLnNlbGZQbGF5Vmlldy5yZWZyZXNoSGFuZFBva2Vyc09uRXJyKCk7IFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LnNldCh0aGlzLkRlZmluZS5GaWVsZE9uUGxheUFjdGlvbiwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHRoaXMubWFpblVJLnNlbGZQbGF5Vmlldy5zZXRWYWxpZFBva2VycygpOyAgLy8g6aKE6ZiyXHJcbiAgICAgICAgICAgIGlmIChtc2cuX3BhcmEucGxheV90eXBlID09IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluVUkuYXNrQWN0aW9uVmlldy5zZXRQbGF5Vmlld1Nob3codHJ1ZSwgZmFsc2UsIGZhbHNlKTsgICAgICAgICAgICAvLyDkuLvliqjlh7rniYzmg4XlhrVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgRGR6RHJpdmVyLmluc3RhbmNlLlBsYXlSdWxlSGVscGVyLmluaXRSZWNvbW1lbmRIZWxwZXIodGhpcy5jb250ZXh0LmdldFNlbGZIYW5kUG9rZXJzKCksIHRoaXMuY29udGV4dC5nZXQodGhpcy5EZWZpbmUuRmllbGRPbk91dFBva2VycykpO1xyXG4gICAgICAgICAgICAgICAgaWYgKERkekRyaXZlci5pbnN0YW5jZS5QbGF5UnVsZUhlbHBlci5jaGVja0JpZ2dlcigpKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW5VSS5hc2tBY3Rpb25WaWV3LnNldFBsYXlWaWV3U2hvdyh0cnVlLCB0cnVlLCB0cnVlKTsgICAgICAgICAgICAvLyDopoHlvpfotbfnmoTmg4XlhrVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWluVUkuYXNrQWN0aW9uVmlldy5zZXRDYW5ub3RQbGF5Vmlld1Nob3codHJ1ZSk7ICAgICAgLy8g6KaB5LiN6LW355qE5oOF5Ya1XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRpbWUgPSAwO1xyXG4gICAgICAgIGxldCBzZXJ2ZXJUaW1lID0gbXNnLl90aW1lcztcclxuICAgICAgICBpZiAoc2VydmVyVGltZSAmJiBHYW1lLkNvbXBvbmVudC5jb3JyZWN0VGltZSl7XHJcbiAgICAgICAgICAgIGxldCBkZXYgPSBHYW1lLkNvbXBvbmVudC5jb3JyZWN0VGltZShzZXJ2ZXJUaW1lKTtcclxuICAgICAgICAgICAgdGltZSA9IG1zZy5fdGltZW8gKiAxMDAwIC0gZGV2O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aW1lID0gbXNnLl90aW1lbyAqIDEwMDAgLSAoRGF0ZS5ub3coKSAtIG1zZy5fcmVjZWl2ZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRpbWUgfHwgdGltZSA8PSAwKVxyXG4gICAgICAgICAgICB0aW1lID0gMTAwMDtcclxuICAgICAgICB0aGlzLm1haW5VSS5zaG93QWN0aW9uVGltZXIodHJ1ZSwgbG9jYWxTZWF0LCB0aW1lLCBudWxsKTtcclxuICAgICAgICB0aGlzLm1haW5VSS5jbG9ja0NvbXAuc2V0Q2xvY2tBdWRpb0VuYWJsZSh0cnVlKTtcclxuICAgICAgICB0aGlzLm1haW5VSS5jYWxsUGxheWVyKGxvY2FsU2VhdCwgJ3Nob3dQbGF5UG9rZXJzJywgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmNhbGxQbGF5ZXIobG9jYWxTZWF0LCAnc2hvd1BsYXllclRoaW5rRWZmZWN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGVTeW5jKG1zZyl7XHJcbiAgICAgICAgdGhpcy5leGVjdXRlKG1zZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBTZW5kUmVkZWFsKClcclxuICAgIHtcclxuICAgICAgICBHYW1lLlNlcnZlci5zZW5kKHRoaXMuRGVmaW5lLkNtZFJlZnJlc2hIYW5kUG9rZXJzLHt9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGR6T25QbGF5SGFuZGxlciBleHRlbmRzIERkekJhc2VIYW5kbGVye1xyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGUobXNnKXtcclxuICAgICAgICBsZXQgbG9jYWxTZWF0ID0gdGhpcy5TaXRIZWxwZXIuc2VydmVyU1RvTG9jYWxOKG1zZy5fc3JjKTtcclxuICAgICAgICBsZXQgY291bnQgPSBtc2cuX3BhcmEuY291bnQ7XHJcbiAgICAgICAgbGV0IGNhcmRzID0gbXNnLl9wYXJhLmNhcmRzO1xyXG4gICAgICAgIGxldCB0eXBlID0gbXNnLl9wYXJhLnR5cGU7XHJcbiAgICAgICAgbGV0IHBsYXlEYXRhID0gRGR6RHJpdmVyLmluc3RhbmNlLlBsYXlSdWxlSGVscGVyLmdldFBva2Vyc1R5cGUobXNnLl9wYXJhLmNhcmRzKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuc2V0KHRoaXMuRGVmaW5lLkZpZWxkT25PdXRQb2tlcnMsIHBsYXlEYXRhKTsgICAvLyDorr7nva7lvZPliY3ova7mnIDlpKflh7rniYzmlbDmja5cclxuXHJcbiAgICAgICAgaWYgKGxvY2FsU2VhdCA9PSAwKXtcclxuICAgICAgICAgICAgRGR6RHJpdmVyLmluc3RhbmNlLlBsYXlSdWxlSGVscGVyLmNsZWFyUmVjb21tZW5kKCk7ICAgICAvL+a4hemZpOaPkOekuuW3peWFt1xyXG4gICAgICAgICAgICB0aGlzLm1haW5VSS5hc2tBY3Rpb25WaWV3LnNldFBsYXlWaWV3U2hvdyhmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5yZW1vdmVTZWxmSGFuZFBva2VycyhjYXJkcyk7XHJcbiAgICAgICAgICAgIGxldCBpc0FjdGlvbiA9IHRoaXMuY29udGV4dC5nZXQodGhpcy5EZWZpbmUuRmllbGRPblBsYXlBY3Rpb24pO1xyXG4gICAgICAgICAgICBsZXQgaXNTeXNQbGF5ID0gbXNnLl9wYXJhLmZsYWcgPT0gMTsgICAgICAgICAgICAvLyDns7vnu5/lh7rniYxcclxuICAgICAgICAgICAgaWYgKGlzQWN0aW9uKXsgICAgICAgICAgLy8g5a2Y5Zyo5Li055WM54q25oCBIOeCueS6huWHuueJjCDmnI3liqHlmajlkIzml7bkuIvlj5HotoXml7blh7rniYwg5a+86Ie05omL54mM5Lii5aSxICAgICjkuI3pnIDopoHkuobvvIznrYnlm57ljIXlho3lh7rniYwpXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTeXNQbGF5KXsgICAgIC8vIOaTjeS9nOS6huWHuueJjCDkvYbmmK/mnI3liqHlmajnu5nnmoTmmK/ns7vnu5/lh7rniYxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW5VSS5zZWxmUGxheVZpZXcucmVmcmVzaEhhbmRQb2tlcnNPbkVycigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFpblVJLmRvUGxheVBva2VycyhjYXJkcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFpblVJLmRvUmVzZXRQb2tlcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW5VSS5kb1BsYXlQb2tlcnMoY2FyZHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7ICAgLy8g6Ieq5Yqo5Ye654mM6LWw6L+ZXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5VSS5kb1Jlc2V0UG9rZXJzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5VSS5kb1BsYXlQb2tlcnMoY2FyZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLmNhbGxQbGF5ZXIobG9jYWxTZWF0LCAnc2V0UGxheWVyTGVmdFBva2VycycsIHRydWUsIGNvdW50KTtcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkuY2FsbFBsYXllcihsb2NhbFNlYXQsICdzaG93UGxheVBva2VycycsIHRydWUsIGNhcmRzLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYWluVUkuc2hvd0FjdGlvblRpbWVyKGZhbHNlKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuc2V0KHRoaXMuRGVmaW5lLkZpZWxkT25QbGF5QWN0aW9uLCBmYWxzZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHNvdW5kUmVzID0gRGR6UnVsZUNvbnN0LmdldFBsYXlUeXBlU291bmRSZXModHlwZSwgcGxheURhdGEud2VpZ2h0KTtcclxuICAgICAgICBpZiAoc291bmRSZXMpe1xyXG4gICAgICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUdhbWVCdW5kbGVTb3VuZChEZHpBdWRpb0NvbnN0LmdlbmRlclNvdW5kUGF0aChzb3VuZFJlcywgMCksIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuY29udGV4dC5nZXQodGhpcy5EZWZpbmUuRmllbGRCb21iQmdtKSl7XHJcbiAgICAgICAgICAgIGlmIChEZHpSdWxlQ29uc3QuY2hlY2tJc0JvbWIodHlwZSkgfHwgRGR6UnVsZUNvbnN0LmNoZWNrSXNSb2NrZXQodHlwZSkpe1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlHYW1lQnVuZGxlTXVzaWMoRGR6QXVkaW9Db25zdC5CZ20yLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5zZXQodGhpcy5EZWZpbmUuRmllbGRCb21iQmdtLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRvdGFsVGltZSA9IDAuMTtcclxuICAgICAgICBHYW1lLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkuc2hvd1Bva2VyVHlwZUVmZmVjdChsb2NhbFNlYXQsIHR5cGUpO1xyXG4gICAgICAgIH0sIHRvdGFsVGltZSk7XHJcblxyXG4gICAgICAgIHRvdGFsVGltZSArPSAwLjE7ICAgICAgIC8vIOWIhuW4p+aJp+ihjCDlkKbliJnkvY7nq6/miYvmnLrkvJrlh7rnjrDljaHpob9cclxuICAgICAgICBHYW1lLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkuY2FsbFBsYXllcihsb2NhbFNlYXQsICdzaG93UGxheWVyUGxheUVmZmVjdCcsIERkelJ1bGVDb25zdC5jaGVja0lzQm9tYih0eXBlKSB8fCBEZHpSdWxlQ29uc3QuY2hlY2tJc1JvY2tldCh0eXBlKSk7XHJcbiAgICAgICAgfSwgdG90YWxUaW1lKTtcclxuXHJcbiAgICAgICAgdG90YWxUaW1lICs9IDAuMTtcclxuICAgICAgICBHYW1lLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnVwZGF0ZU1hcmtlckRhdGEoY2FyZHMpO1xyXG4gICAgICAgIH0sIHRvdGFsVGltZSk7XHJcblxyXG4gICAgICAgIHRvdGFsVGltZSArPSAwLjE7XHJcbiAgICAgICAgaWYgKGNvdW50ID4gMCAmJiBjb3VudCA8PSB0aGlzLkRlZmluZS5XYXJuTGVmdFBva2VyQ291bnQpe1xyXG4gICAgICAgICAgICB0aGlzLm1haW5VSS5jYWxsUGxheWVyKGxvY2FsU2VhdCwgJ3Nob3dXYXJuU2lnbicsIHRydWUpO1xyXG4gICAgICAgICAgICBsZXQgc291bmRBcnIgPSBbXTtcclxuICAgICAgICAgICAgaWYgKGNvdW50ID09IDEpe1xyXG4gICAgICAgICAgICAgICAgc291bmRBcnIgPSBEZHpBdWRpb0NvbnN0Lldhcm5pbmdPbmVBcnI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY291bnQgPT0gMil7XHJcbiAgICAgICAgICAgICAgICBzb3VuZEFyciA9IERkekF1ZGlvQ29uc3QuV2FybmluZ1R3b0FycjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcmVzID0gc291bmRBcnJbR2xvYmFsLlRvb2xraXQuZ2V0Um91bmRJbnRlZ2VyKHNvdW5kQXJyLmxlbmd0aCldO1xyXG4gICAgICAgICAgICBpZiAocmVzKXtcclxuICAgICAgICAgICAgICAgIEdhbWUuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5BdWRpby5wbGF5R2FtZUJ1bmRsZVNvdW5kKERkekF1ZGlvQ29uc3QuYXVkaW9Db21tb25QYXRoICsgRGR6QXVkaW9Db25zdC5XYXJuaW5nQXVkaW8sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5BdWRpby5wbGF5R2FtZUJ1bmRsZVNvdW5kKERkekF1ZGlvQ29uc3QuZ2VuZGVyU291bmRQYXRoKHJlcywgMCksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSwgdG90YWxUaW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX0FERFRJTUVMT0NLLCAnRGR6T25QbGF5SGFuZGxlcicsIHRvdGFsVGltZSArIDAuMSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEZHpPblBhc3NIYW5kbGVyIGV4dGVuZHMgRGR6QmFzZUhhbmRsZXJ7XHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZShtc2cpe1xyXG4gICAgICAgIGxldCBsb2NhbFNlYXQgPSB0aGlzLlNpdEhlbHBlci5zZXJ2ZXJTVG9Mb2NhbE4obXNnLl9zcmMpO1xyXG4gICAgICAgIGlmIChsb2NhbFNlYXQgPT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLmFza0FjdGlvblZpZXcuc2V0UGxheVZpZXdTaG93KGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkuYXNrQWN0aW9uVmlldy5zZXRDYW5ub3RQbGF5Vmlld1Nob3coZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5VSS5kb1Jlc2V0UG9rZXJzKCk7XHJcbiAgICAgICAgICAgIERkekRyaXZlci5pbnN0YW5jZS5QbGF5UnVsZUhlbHBlci5jbGVhclJlY29tbWVuZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuY29udGV4dC5nZXQodGhpcy5EZWZpbmUuRmllbGRPbk91dFBva2Vycyk7XHJcbiAgICAgICAgbGV0IHJlcyA9IERkelJ1bGVDb25zdC5nZXRQYXNzU291bmRSZXMoZGF0YS50eXBlKTtcclxuICAgICAgICBpZiAocmVzKVxyXG4gICAgICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUdhbWVCdW5kbGVTb3VuZChEZHpBdWRpb0NvbnN0LmdlbmRlclNvdW5kUGF0aChyZXMsIDApLCB0cnVlKTtcclxuICAgICAgICB0aGlzLm1haW5VSS5jYWxsUGxheWVyKGxvY2FsU2VhdCwgJ3NldFN0YXRlJywgdHJ1ZSwgRGR6R2FtZUFjdFN0YXRlLlBsYXksIDApO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmNhbGxQbGF5ZXIobG9jYWxTZWF0LCAnc2hvd1BsYXllck5vcm1hbEVmZmVjdCcpO1xyXG4gICAgfVxyXG59Il19