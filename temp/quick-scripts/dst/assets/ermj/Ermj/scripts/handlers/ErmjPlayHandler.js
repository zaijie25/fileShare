
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/handlers/ErmjPlayHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c17c5jOd05MlKPbp9uWj2qF', 'ErmjPlayHandler');
// ermj/Ermj/scripts/handlers/ErmjPlayHandler.ts

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
exports.ErmjKongHandler = exports.ErmjPongHandler = exports.ErmjChowHandler = exports.ErmjPlayHandler = exports.ErmjCallPlayHandler = exports.ErmjPlayStartHandler = void 0;
var ErmjBaseHandler_1 = require("./ErmjBaseHandler");
var ErmjPlayStartHandler = /** @class */ (function (_super) {
    __extends(ErmjPlayStartHandler, _super);
    function ErmjPlayStartHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjPlayStartHandler.prototype.execute = function (msg) {
        this.context.set(this.Define.FieldHandActionEnable, true);
        this.mainUI.diceAnimComp.node.active = false;
        this.mainUI.askBtnView.setAutoPlayBtnShow(true);
    };
    return ErmjPlayStartHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjPlayStartHandler = ErmjPlayStartHandler;
var ErmjCallPlayHandler = /** @class */ (function (_super) {
    __extends(ErmjCallPlayHandler, _super);
    function ErmjCallPlayHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjCallPlayHandler.prototype.execute = function (msg) {
        var _this = this;
        this.mainUI.callAllPlayers("showStateSp", false);
        this.mainUI.askActionView.active = false;
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
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        this.mainUI.askNoticeView.whichLocationTurn(localSeat);
        this.mainUI.askNoticeView.setTimeRunConfig(Math.round(time / 1000), null, null);
        Game.Component.scheduleOnce(function () {
            _this.mainUI.callMjPlayer(localSeat, "readyForOut", msg._para.draw_card); // 重连时等UI初始化帧结束, 下一帧再执行
        }, 0);
        if (localSeat == 0) {
            this.context.set(this.Define.FieldInPlayTurn, true);
            this.mainUI.selfPlayView.showPlayTips(true);
            this.mainUI.selfPlayView.readyForOut(msg._para.draw_card);
        }
    };
    return ErmjCallPlayHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjCallPlayHandler = ErmjCallPlayHandler;
var ErmjPlayHandler = /** @class */ (function (_super) {
    __extends(ErmjPlayHandler, _super);
    function ErmjPlayHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjPlayHandler.prototype.execute = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        if (localSeat == 0) {
            this.context.set(this.Define.FieldInPlayTurn, false);
            this.mainUI.selfPlayView.showPlayTips(false);
            this.mainUI.askActionView.active = false;
        }
        this.mainUI.onPlay(localSeat, msg._para.card, msg._para.flag == 1);
    };
    ErmjPlayHandler.prototype.executeSync = function (msg) {
    };
    return ErmjPlayHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjPlayHandler = ErmjPlayHandler;
var ErmjChowHandler = /** @class */ (function (_super) {
    __extends(ErmjChowHandler, _super);
    function ErmjChowHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjChowHandler.prototype.execute = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        var whoSeat = this.SitHelper.serverSToLocalN(msg._para.who);
        this.mainUI.onChow(localSeat, msg._para.cards, msg._para.chow_card, whoSeat);
    };
    return ErmjChowHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjChowHandler = ErmjChowHandler;
var ErmjPongHandler = /** @class */ (function (_super) {
    __extends(ErmjPongHandler, _super);
    function ErmjPongHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjPongHandler.prototype.execute = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        var whoSeat = this.SitHelper.serverSToLocalN(msg._para.who);
        this.mainUI.onPong(localSeat, msg._para.cards, whoSeat);
    };
    return ErmjPongHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjPongHandler = ErmjPongHandler;
var ErmjKongHandler = /** @class */ (function (_super) {
    __extends(ErmjKongHandler, _super);
    function ErmjKongHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjKongHandler.prototype.execute = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        var whoSeat = this.SitHelper.serverSToLocalN(msg._para.who);
        this.mainUI.onKong(localSeat, msg._para.cards || [], msg._para.type, whoSeat);
    };
    return ErmjKongHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjKongHandler = ErmjKongHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcaGFuZGxlcnNcXEVybWpQbGF5SGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQWdEO0FBRWhEO0lBQTBDLHdDQUFlO0lBQXpEOztJQU1BLENBQUM7SUFMYSxzQ0FBTyxHQUFqQixVQUFrQixHQUFHO1FBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FOQSxBQU1DLENBTnlDLHlCQUFlLEdBTXhEO0FBTlksb0RBQW9CO0FBUWpDO0lBQXlDLHVDQUFlO0lBQXhEOztJQTRCQSxDQUFDO0lBM0JhLHFDQUFPLEdBQWpCLFVBQWtCLEdBQUc7UUFBckIsaUJBMEJDO1FBekJHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3pDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUM7WUFDekMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakQsSUFBSSxHQUFHLEdBQUcsQ0FB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LEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FOQSxBQU1DLENBTm9DLHlCQUFlLEdBTW5EO0FBTlksMENBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJtakJhc2VIYW5kbGVyIGZyb20gXCIuL0VybWpCYXNlSGFuZGxlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVybWpQbGF5U3RhcnRIYW5kbGVyIGV4dGVuZHMgRXJtakJhc2VIYW5kbGVye1xyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGUobXNnKXtcclxuICAgICAgICB0aGlzLmNvbnRleHQuc2V0KHRoaXMuRGVmaW5lLkZpZWxkSGFuZEFjdGlvbkVuYWJsZSwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuZGljZUFuaW1Db21wLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuYXNrQnRuVmlldy5zZXRBdXRvUGxheUJ0blNob3codHJ1ZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFcm1qQ2FsbFBsYXlIYW5kbGVyIGV4dGVuZHMgRXJtakJhc2VIYW5kbGVye1xyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGUobXNnKXtcclxuICAgICAgICB0aGlzLm1haW5VSS5jYWxsQWxsUGxheWVycyhcInNob3dTdGF0ZVNwXCIsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLm1haW5VSS5hc2tBY3Rpb25WaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB0aW1lID0gMDtcclxuICAgICAgICBsZXQgc2VydmVyVGltZSA9IG1zZy5fdGltZXM7XHJcbiAgICAgICAgaWYgKHNlcnZlclRpbWUgJiYgR2FtZS5Db21wb25lbnQuY29ycmVjdFRpbWUpe1xyXG4gICAgICAgICAgICBsZXQgZGV2ID0gR2FtZS5Db21wb25lbnQuY29ycmVjdFRpbWUoc2VydmVyVGltZSk7XHJcbiAgICAgICAgICAgIHRpbWUgPSBtc2cuX3RpbWVvICogMTAwMCAtIGRldjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGltZSA9IG1zZy5fdGltZW8gKiAxMDAwIC0gKERhdGUubm93KCkgLSBtc2cuX3JlY2VpdmVUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aW1lIHx8IHRpbWUgPD0gMClcclxuICAgICAgICAgICAgdGltZSA9IDEwMDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGxvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihtc2cuX3NyYyk7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuYXNrTm90aWNlVmlldy53aGljaExvY2F0aW9uVHVybihsb2NhbFNlYXQpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmFza05vdGljZVZpZXcuc2V0VGltZVJ1bkNvbmZpZyhNYXRoLnJvdW5kKHRpbWUgLyAxMDAwKSwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgR2FtZS5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLmNhbGxNalBsYXllcihsb2NhbFNlYXQsIFwicmVhZHlGb3JPdXRcIiwgbXNnLl9wYXJhLmRyYXdfY2FyZCk7ICAgICAvLyDph43ov57ml7bnrYlVSeWIneWni+WMluW4p+e7k+adnywg5LiL5LiA5bin5YaN5omn6KGMXHJcbiAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgaWYgKGxvY2FsU2VhdCA9PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnNldCh0aGlzLkRlZmluZS5GaWVsZEluUGxheVR1cm4sIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5VSS5zZWxmUGxheVZpZXcuc2hvd1BsYXlUaXBzKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5VSS5zZWxmUGxheVZpZXcucmVhZHlGb3JPdXQobXNnLl9wYXJhLmRyYXdfY2FyZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXJtalBsYXlIYW5kbGVyIGV4dGVuZHMgRXJtakJhc2VIYW5kbGVye1xyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGUobXNnKXtcclxuICAgICAgICBsZXQgbG9jYWxTZWF0ID0gdGhpcy5TaXRIZWxwZXIuc2VydmVyU1RvTG9jYWxOKG1zZy5fc3JjKTtcclxuICAgICAgICBpZiAobG9jYWxTZWF0ID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc2V0KHRoaXMuRGVmaW5lLkZpZWxkSW5QbGF5VHVybiwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5VSS5zZWxmUGxheVZpZXcuc2hvd1BsYXlUaXBzKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkuYXNrQWN0aW9uVmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYWluVUkub25QbGF5KGxvY2FsU2VhdCwgbXNnLl9wYXJhLmNhcmQsIG1zZy5fcGFyYS5mbGFnID09IDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCAgZXhlY3V0ZVN5bmMobXNnKXtcclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEVybWpDaG93SGFuZGxlciBleHRlbmRzIEVybWpCYXNlSGFuZGxlcntcclxuICAgIHByb3RlY3RlZCBleGVjdXRlKG1zZyl7XHJcbiAgICAgICAgbGV0IGxvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihtc2cuX3NyYyk7XHJcbiAgICAgICAgbGV0IHdob1NlYXQgPSB0aGlzLlNpdEhlbHBlci5zZXJ2ZXJTVG9Mb2NhbE4obXNnLl9wYXJhLndobyk7XHJcbiAgICAgICAgdGhpcy5tYWluVUkub25DaG93KGxvY2FsU2VhdCwgbXNnLl9wYXJhLmNhcmRzLCBtc2cuX3BhcmEuY2hvd19jYXJkLCB3aG9TZWF0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEVybWpQb25nSGFuZGxlciBleHRlbmRzIEVybWpCYXNlSGFuZGxlcntcclxuICAgIHByb3RlY3RlZCBleGVjdXRlKG1zZyl7XHJcbiAgICAgICAgbGV0IGxvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihtc2cuX3NyYyk7XHJcbiAgICAgICAgbGV0IHdob1NlYXQgPSB0aGlzLlNpdEhlbHBlci5zZXJ2ZXJTVG9Mb2NhbE4obXNnLl9wYXJhLndobyk7XHJcbiAgICAgICAgdGhpcy5tYWluVUkub25Qb25nKGxvY2FsU2VhdCwgbXNnLl9wYXJhLmNhcmRzLCB3aG9TZWF0KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEVybWpLb25nSGFuZGxlciBleHRlbmRzIEVybWpCYXNlSGFuZGxlcntcclxuICAgIHByb3RlY3RlZCBleGVjdXRlKG1zZyl7XHJcbiAgICAgICAgbGV0IGxvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihtc2cuX3NyYyk7XHJcbiAgICAgICAgbGV0IHdob1NlYXQgPSB0aGlzLlNpdEhlbHBlci5zZXJ2ZXJTVG9Mb2NhbE4obXNnLl9wYXJhLndobyk7XHJcbiAgICAgICAgdGhpcy5tYWluVUkub25Lb25nKGxvY2FsU2VhdCwgbXNnLl9wYXJhLmNhcmRzIHx8IFtdLCBtc2cuX3BhcmEudHlwZSwgd2hvU2VhdCk7XHJcbiAgICB9XHJcbn0iXX0=