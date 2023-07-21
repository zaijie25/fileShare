"use strict";
cc._RF.push(module, '8cac8WD9v1GW7DcJ/D0C+qY', 'DdzAllOpenHandler');
// ddz/ddz/scripts/handlers/DdzAllOpenHandler.ts

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
var DdzBaseHandler_1 = require("./DdzBaseHandler");
var DdzDriver_1 = require("../DdzDriver");
var DdzAllOpenHandler = /** @class */ (function (_super) {
    __extends(DdzAllOpenHandler, _super);
    function DdzAllOpenHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzAllOpenHandler.prototype.execute = function (msg) {
        var _this = this;
        this.mainUI.callAllPlayers('setPlayerLeftPokers', false);
        this.mainUI.callAllPlayers('setState', false);
        this.mainUI.callAllPlayers('showWarnSign', false);
        this.mainUI.setChooseEnbale(false);
        this.mainUI.showMarker(false);
        this.mainUI.askActionView.clearByGame();
        var userCards = msg._para.UserCards || [];
        userCards.forEach(function (user) {
            if (user.all_cards && !Global.Toolkit.isEmptyObject(user.all_cards)) {
                var cardArr = DdzDriver_1.default.instance.PokerHelper.sortPokerArr(user.all_cards);
                var localSeat = _this.SitHelper.serverSToLocalN(user.chair);
                _this.mainUI.callPlayer(localSeat, 'showPlayPokers', true, cardArr, false);
            }
        });
        var nSpring = msg._para.flag;
        var totalTime = 1;
        if (nSpring == 1) {
            Game.Component.scheduleOnce(function () {
                _this.mainUI.playSpringAnim(1);
            }, totalTime);
            totalTime += this.Define.SpringAnimTime;
        }
        else if (nSpring == 2) {
            Game.Component.scheduleOnce(function () {
                _this.mainUI.playSpringAnim(2);
            }, totalTime);
            totalTime += this.Define.SpringAnimTime;
        }
        this.mainUI.selfPlayView.hideAllPokers();
        Game.Event.event(Game.EVENT_ADDTIMELOCK, 'DdzAllOpenHandler', totalTime);
    };
    DdzAllOpenHandler.prototype.executeSync = function (msg) {
        var _this = this;
        this.mainUI.callAllPlayers('setPlayerLeftPokers', false);
        this.mainUI.callAllPlayers('setState', false);
        this.mainUI.callAllPlayers('showWarnSign', false);
        this.mainUI.setChooseEnbale(false);
        this.mainUI.showMarker(false);
        this.mainUI.askActionView.clearByGame();
        var userCards = msg._para.UserCards || [];
        userCards.forEach(function (user) {
            if (user.all_cards && !Global.Toolkit.isEmptyObject(user.all_cards)) {
                var cardArr = DdzDriver_1.default.instance.PokerHelper.sortPokerArr(user.all_cards);
                var localSeat = _this.SitHelper.serverSToLocalN(user.chair);
                _this.mainUI.callPlayer(localSeat, 'showPlayPokers', true, cardArr, false);
            }
        });
        this.mainUI.selfPlayView.hideAllPokers();
    };
    return DdzAllOpenHandler;
}(DdzBaseHandler_1.default));
exports.default = DdzAllOpenHandler;

cc._RF.pop();