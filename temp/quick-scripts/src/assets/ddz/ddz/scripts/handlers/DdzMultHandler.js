"use strict";
cc._RF.push(module, '09324CG6KFIAJsSfZ3er+hR', 'DdzMultHandler');
// ddz/ddz/scripts/handlers/DdzMultHandler.ts

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
exports.DdzOnMultHandler = exports.DdzCalMultHandler = void 0;
var DdzBaseHandler_1 = require("./DdzBaseHandler");
var DdzGameConst_1 = require("../data/DdzGameConst");
var DdzPathHelper_1 = require("../data/DdzPathHelper");
var DdzCalMultHandler = /** @class */ (function (_super) {
    __extends(DdzCalMultHandler, _super);
    function DdzCalMultHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzCalMultHandler.prototype.execute = function (msg) {
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
            if (localSeat != this.context.get(this.Define.FieldDzLocSeat)) {
                this.mainUI.askActionView.setMultViewShow(true);
            }
            this.mainUI.showActionTimer(true, localSeat, time, null);
        }
        this.mainUI.callAllPlayers('setState', false);
    };
    return DdzCalMultHandler;
}(DdzBaseHandler_1.default));
exports.DdzCalMultHandler = DdzCalMultHandler;
var DdzOnMultHandler = /** @class */ (function (_super) {
    __extends(DdzOnMultHandler, _super);
    function DdzOnMultHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzOnMultHandler.prototype.execute = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        var selected = msg._para.selected;
        if (localSeat == 0) {
            this.mainUI.askActionView.setMultViewShow(false);
        }
        var res = '';
        if (selected == 2) {
            res = DdzPathHelper_1.DdzAudioConst.Mult;
            this.mainUI.callPlayer(localSeat, 'showMultSign', true);
        }
        else {
            res = DdzPathHelper_1.DdzAudioConst.NotMult;
        }
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.genderSoundPath(res, 0), true);
        this.mainUI.callPlayer(localSeat, 'setState', true, DdzGameConst_1.DdzGameActState.Mult, selected);
        Game.Event.event(Game.EVENT_ADDTIMELOCK, 'DdzOnMultHandler', 0.3);
    };
    DdzOnMultHandler.prototype.executeSync = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        var selected = msg._para.selected;
        if (selected == 2) {
            this.mainUI.callPlayer(localSeat, 'showMultSign', true);
        }
    };
    return DdzOnMultHandler;
}(DdzBaseHandler_1.default));
exports.DdzOnMultHandler = DdzOnMultHandler;

cc._RF.pop();