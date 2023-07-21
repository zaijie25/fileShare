"use strict";
cc._RF.push(module, 'c9916HNJtVACr/5JXPGfVNj', 'DdzLandlordHandler');
// ddz/ddz/scripts/handlers/DdzLandlordHandler.ts

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
exports.DdzReCalLandlordHandler = exports.DdzLandlordResultHandler = exports.DdzOnLandlordHandler = exports.DdzCalLandlordHandler = void 0;
var DdzBaseHandler_1 = require("./DdzBaseHandler");
var DdzGameConst_1 = require("../data/DdzGameConst");
var DdzPathHelper_1 = require("../data/DdzPathHelper");
var DdzRuleConst_1 = require("../data/DdzRuleConst");
var DdzCalLandlordHandler = /** @class */ (function (_super) {
    __extends(DdzCalLandlordHandler, _super);
    function DdzCalLandlordHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzCalLandlordHandler.prototype.execute = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        var time = 0;
        var serverTime = msg._times;
        if (serverTime && Game.Component.correctTime) {
            var dev = Game.Component.correctTime(serverTime);
            time = msg._timeo * 1000 - dev;
        }
        else {
            time = msg._timeo * 1000 - (Date.now() - msg._receiveTime);
        }
        if (time <= 0)
            time = 1000;
        if (localSeat == 0) {
            this.mainUI.askActionView.setRobViewShow(true, msg._para.land_items, msg._para.miss_items);
        }
        this.mainUI.showActionTimer(true, localSeat, time, null);
    };
    DdzCalLandlordHandler.prototype.executeSync = function (msg) {
        this.execute(msg);
    };
    return DdzCalLandlordHandler;
}(DdzBaseHandler_1.default));
exports.DdzCalLandlordHandler = DdzCalLandlordHandler;
var DdzOnLandlordHandler = /** @class */ (function (_super) {
    __extends(DdzOnLandlordHandler, _super);
    function DdzOnLandlordHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzOnLandlordHandler.prototype.execute = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        var selected = msg._para.selected;
        if (localSeat == 0) {
            this.mainUI.askActionView.setRobViewShow(false);
        }
        var res = '';
        if (selected <= 0) {
            var soundArr = DdzPathHelper_1.DdzAudioConst.NotCallLandordArr;
            res = soundArr[0];
        }
        else {
            var soundArr = DdzPathHelper_1.DdzAudioConst.CallLandordArr;
            res = soundArr[selected - 1];
        }
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.genderSoundPath(res, 0), true);
        this.mainUI.showActionTimer(false);
        this.mainUI.callPlayer(localSeat, 'setState', true, DdzGameConst_1.DdzGameActState.Rob, selected);
    };
    DdzOnLandlordHandler.prototype.executeSync = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        var selected = msg._para.selected;
        if (localSeat == 0) {
            this.mainUI.askActionView.setRobViewShow(false);
        }
        this.mainUI.showActionTimer(false);
        this.mainUI.callPlayer(localSeat, 'setState', true, DdzGameConst_1.DdzGameActState.Rob, selected);
    };
    return DdzOnLandlordHandler;
}(DdzBaseHandler_1.default));
exports.DdzOnLandlordHandler = DdzOnLandlordHandler;
var DdzLandlordResultHandler = /** @class */ (function (_super) {
    __extends(DdzLandlordResultHandler, _super);
    function DdzLandlordResultHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzLandlordResultHandler.prototype.execute = function (msg) {
        this.mainUI.askActionView.setRobViewShow(false);
        var dzSeat = this.SitHelper.serverSToLocalN(msg._para.land_chair);
        this.context.set(this.Define.FieldDzLocSeat, dzSeat);
        this.mainUI.dzLeftPokersView.showScoreLbl(true, msg._para.selected);
        this.mainUI.dzLeftPokersView.setThreePokerValue(msg._para.cards);
        this.mainUI.dzLeftPokersView.showThreePoker(true);
        if (dzSeat == 0) {
            this.context.addSelfHandPokers(msg._para.cards, false);
            this.mainUI.selfPlayView.showLandlordPoker(msg._para.cards);
            this.mainUI.updateRoundMult(msg._para.selected * 2);
        }
        else {
            var cfg = DdzRuleConst_1.default.ModeConfig[this.context.mode];
            this.mainUI.callPlayer(dzSeat, 'setPlayerLeftPokers', true, cfg.baseCount + cfg.leftCount);
            this.mainUI.updateRoundMult(msg._para.selected);
        }
        this.mainUI.callPlayer(dzSeat, 'setDz', true, true);
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "DdzLandlordResultHandler", this.Define.FlyDzIcon + 0.1);
    };
    DdzLandlordResultHandler.prototype.executeSync = function (msg) {
        this.mainUI.askActionView.setRobViewShow(false);
        var dzSeat = this.SitHelper.serverSToLocalN(msg._para.land_chair);
        this.context.set(this.Define.FieldDzLocSeat, dzSeat);
        if (dzSeat == 0) {
            this.mainUI.updateRoundMult(msg._para.selected * 2);
        }
        else {
            this.mainUI.updateRoundMult(msg._para.selected);
        }
        this.mainUI.dzLeftPokersView.showScoreLbl(true, msg._para.selected);
        this.mainUI.dzLeftPokersView.setThreePokerValue(msg._para.cards);
        this.mainUI.dzLeftPokersView.showThreePoker(true);
        this.mainUI.selfPlayView.showDzOwnerSign();
        this.mainUI.callPlayer(dzSeat, 'setDz', true, false);
    };
    return DdzLandlordResultHandler;
}(DdzBaseHandler_1.default));
exports.DdzLandlordResultHandler = DdzLandlordResultHandler;
var DdzReCalLandlordHandler = /** @class */ (function (_super) {
    __extends(DdzReCalLandlordHandler, _super);
    function DdzReCalLandlordHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzReCalLandlordHandler.prototype.execute = function (msg) {
        var isMatch = msg._para && msg._para.clear == 1;
        Game.Tween.clear();
        Game.Component.unscheduleAllCallbacks();
        this.mainUI.clearByRound();
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "DdzReCalLandlordHandler", 0.2);
        if (isMatch) {
            this.mainUI.clearOtherPlayers();
            this.context.clearByRound(); // 多次都不叫地主到解散才清理数据 debug 放外面会导致游戏开始标志重置
        }
    };
    return DdzReCalLandlordHandler;
}(DdzBaseHandler_1.default));
exports.DdzReCalLandlordHandler = DdzReCalLandlordHandler;

cc._RF.pop();