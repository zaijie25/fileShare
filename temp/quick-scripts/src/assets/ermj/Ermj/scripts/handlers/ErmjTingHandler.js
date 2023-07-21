"use strict";
cc._RF.push(module, 'b00d6RhEhlN2IJrgapKKip0', 'ErmjTingHandler');
// ermj/Ermj/scripts/handlers/ErmjTingHandler.ts

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
exports.ErmjTingResultHandler = exports.ErmjCallTingHandler = exports.ErmjTingHandler = void 0;
var ErmjBaseHandler_1 = require("./ErmjBaseHandler");
var ErmjGameConst_1 = require("../data/ErmjGameConst");
var ErmjPathHelper_1 = require("../data/ErmjPathHelper");
var ErmjTingHandler = /** @class */ (function (_super) {
    __extends(ErmjTingHandler, _super);
    function ErmjTingHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjTingHandler.prototype.execute = function (msg) {
        this.mainUI.askActionView.active = false;
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        if (localSeat == 0) {
            this.context.set(this.Define.FieldInTing, true);
            this.mainUI.selfPlayView.onTing();
        }
        this.mainUI.callPlayer(localSeat, "showStateSp", true, ErmjGameConst_1.default.StateSpStrCfg.Ting);
        this.mainUI.callPlayer(localSeat, "showTingSign", true);
        // 亮出被听牌
        var looksArr = msg._para.ting_looks || [];
        for (var i = 0; i < looksArr.length; i++) {
            var localSeat_1 = this.SitHelper.serverSToLocalN(looksArr[i].chair);
            this.mainUI.callMjPlayer(localSeat_1, "setBeInTing");
            this.mainUI.callMjPlayer(localSeat_1, "showDownHand", localSeat_1 != this.context.selfLocalSeat, looksArr[i].cards || [], false, true);
            this.mainUI.callMjPlayer(localSeat_1, "showDarkKongSeen", looksArr[i].kongs || []);
        }
        if (msg._para.ting_type == 1) {
            this.mainUI.onPlay(localSeat, msg._para.card); // 普通听才出牌
            Game.Component.scheduleOnce(function () {
                ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.genderSoundPath("ting", localSeat == 0 ? 0 : 1), true);
            }, 0.5);
            Game.Event.event(Game.EVENT_ADDTIMELOCK, "ErmjTingHandler", 1.5);
        }
        else {
            ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.genderSoundPath("ting", localSeat == 0 ? 0 : 1), true);
            Game.Event.event(Game.EVENT_ADDTIMELOCK, "ErmjTingHandler", 1);
        }
    };
    ErmjTingHandler.prototype.executeSync = function (msg) {
        this.mainUI.askActionView.active = false;
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        if (localSeat == 0) {
            this.context.set(this.Define.FieldInTing, true);
            this.mainUI.selfPlayView.onTing();
        }
        this.mainUI.callPlayer(localSeat, "showTingSign", true);
        // 亮出被听牌
        var looksArr = msg._para.ting_looks || [];
        for (var i = 0; i < looksArr.length; i++) {
            var localSeat_2 = this.SitHelper.serverSToLocalN(looksArr[i].chair);
            this.mainUI.callMjPlayer(localSeat_2, "setBeInTing");
            this.mainUI.callMjPlayer(localSeat_2, "showDownHand", localSeat_2 != this.context.selfLocalSeat, looksArr[i].cards || [], false, true);
            this.mainUI.callMjPlayer(localSeat_2, "showDarkKongSeen", looksArr[i].kongs || []);
        }
    };
    return ErmjTingHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjTingHandler = ErmjTingHandler;
var ErmjCallTingHandler = /** @class */ (function (_super) {
    __extends(ErmjCallTingHandler, _super);
    function ErmjCallTingHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjCallTingHandler.prototype.execute = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        if (localSeat == 0) {
            this.mainUI.askActionView.active = true;
            this.mainUI.askActionView.showTingBtn(true, msg._para);
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
        this.mainUI.askNoticeView.setTimeRunConfig(Math.round(time / 1000), null, null);
    };
    return ErmjCallTingHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjCallTingHandler = ErmjCallTingHandler;
var ErmjTingResultHandler = /** @class */ (function (_super) {
    __extends(ErmjTingResultHandler, _super);
    function ErmjTingResultHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjTingResultHandler.prototype.execute = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        if (localSeat == 0) {
            this.mainUI.selfPlayView.winTipsView.active = true;
            this.mainUI.selfPlayView.winTipsView.updateWinList(msg._para.ting_items);
            this.context.set(this.Define.FieldTingData, msg._para.ting_items); // [{"card":3, "fan":10, "num":2}, ...]
        }
    };
    return ErmjTingResultHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjTingResultHandler = ErmjTingResultHandler;

cc._RF.pop();