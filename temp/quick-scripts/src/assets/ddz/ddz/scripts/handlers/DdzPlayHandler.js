"use strict";
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