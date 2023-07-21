
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/handlers/DdzAllOpenHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGhhbmRsZXJzXFxEZHpBbGxPcGVuSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMsMENBQXFDO0FBRXJDO0lBQStDLHFDQUFjO0lBQTdEOztJQXVEQSxDQUFDO0lBdERhLG1DQUFPLEdBQWpCLFVBQWtCLEdBQUc7UUFBckIsaUJBaUNDO1FBaENHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLHFCQUFxQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFeEMsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO1FBQzFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQ2xCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQztnQkFDaEUsSUFBSSxPQUFPLEdBQUcsbUJBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzFFLElBQUksU0FBUyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsZUFB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ZUhhbmRsZXIgZnJvbSBcIi4vRGR6QmFzZUhhbmRsZXJcIjtcclxuaW1wb3J0IERkekRyaXZlciBmcm9tIFwiLi4vRGR6RHJpdmVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZHpBbGxPcGVuSGFuZGxlciBleHRlbmRzIERkekJhc2VIYW5kbGVye1xyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGUobXNnKXtcclxuICAgICAgICB0aGlzLm1haW5VSS5jYWxsQWxsUGxheWVycygnc2V0UGxheWVyTGVmdFBva2VycycsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLm1haW5VSS5jYWxsQWxsUGxheWVycygnc2V0U3RhdGUnLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuY2FsbEFsbFBsYXllcnMoJ3Nob3dXYXJuU2lnbicsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLm1haW5VSS5zZXRDaG9vc2VFbmJhbGUoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLnNob3dNYXJrZXIoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmFza0FjdGlvblZpZXcuY2xlYXJCeUdhbWUoKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgdXNlckNhcmRzID0gbXNnLl9wYXJhLlVzZXJDYXJkcyB8fCBbXTtcclxuICAgICAgICB1c2VyQ2FyZHMuZm9yRWFjaCh1c2VyID0+e1xyXG4gICAgICAgICAgICBpZiAodXNlci5hbGxfY2FyZHMgJiYgIUdsb2JhbC5Ub29sa2l0LmlzRW1wdHlPYmplY3QodXNlci5hbGxfY2FyZHMpKXtcclxuICAgICAgICAgICAgICAgIGxldCBjYXJkQXJyID0gRGR6RHJpdmVyLmluc3RhbmNlLlBva2VySGVscGVyLnNvcnRQb2tlckFycih1c2VyLmFsbF9jYXJkcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbG9jYWxTZWF0ID0gdGhpcy5TaXRIZWxwZXIuc2VydmVyU1RvTG9jYWxOKHVzZXIuY2hhaXIpOyBcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpblVJLmNhbGxQbGF5ZXIobG9jYWxTZWF0LCAnc2hvd1BsYXlQb2tlcnMnLCB0cnVlLCBjYXJkQXJyLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgblNwcmluZyA9IG1zZy5fcGFyYS5mbGFnO1xyXG4gICAgICAgIGxldCB0b3RhbFRpbWUgPSAxO1xyXG4gICAgICAgIGlmIChuU3ByaW5nID09IDEpe1xyXG4gICAgICAgICAgICBHYW1lLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpblVJLnBsYXlTcHJpbmdBbmltKDEpO1xyXG4gICAgICAgICAgICB9LCB0b3RhbFRpbWUpO1xyXG4gICAgICAgICAgICB0b3RhbFRpbWUgKz0gdGhpcy5EZWZpbmUuU3ByaW5nQW5pbVRpbWU7XHJcbiAgICAgICAgfWVsc2UgaWYgKG5TcHJpbmcgPT0gMil7XHJcbiAgICAgICAgICAgIEdhbWUuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluVUkucGxheVNwcmluZ0FuaW0oMik7XHJcbiAgICAgICAgICAgIH0sIHRvdGFsVGltZSk7XHJcbiAgICAgICAgICAgIHRvdGFsVGltZSArPSB0aGlzLkRlZmluZS5TcHJpbmdBbmltVGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5tYWluVUkuc2VsZlBsYXlWaWV3LmhpZGVBbGxQb2tlcnMoKTtcclxuICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfQUREVElNRUxPQ0ssICdEZHpBbGxPcGVuSGFuZGxlcicsIHRvdGFsVGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGVTeW5jKG1zZyl7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuY2FsbEFsbFBsYXllcnMoJ3NldFBsYXllckxlZnRQb2tlcnMnLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuY2FsbEFsbFBsYXllcnMoJ3NldFN0YXRlJywgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmNhbGxBbGxQbGF5ZXJzKCdzaG93V2FyblNpZ24nLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuc2V0Q2hvb3NlRW5iYWxlKGZhbHNlKTtcclxuICAgICAgICB0aGlzLm1haW5VSS5zaG93TWFya2VyKGZhbHNlKTtcclxuICAgICAgICB0aGlzLm1haW5VSS5hc2tBY3Rpb25WaWV3LmNsZWFyQnlHYW1lKCk7XHJcblxyXG4gICAgICAgIGxldCB1c2VyQ2FyZHMgPSBtc2cuX3BhcmEuVXNlckNhcmRzIHx8IFtdO1xyXG4gICAgICAgIHVzZXJDYXJkcy5mb3JFYWNoKHVzZXIgPT57XHJcbiAgICAgICAgICAgIGlmICh1c2VyLmFsbF9jYXJkcyAmJiAhR2xvYmFsLlRvb2xraXQuaXNFbXB0eU9iamVjdCh1c2VyLmFsbF9jYXJkcykpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGNhcmRBcnIgPSBEZHpEcml2ZXIuaW5zdGFuY2UuUG9rZXJIZWxwZXIuc29ydFBva2VyQXJyKHVzZXIuYWxsX2NhcmRzKTtcclxuICAgICAgICAgICAgICAgIGxldCBsb2NhbFNlYXQgPSB0aGlzLlNpdEhlbHBlci5zZXJ2ZXJTVG9Mb2NhbE4odXNlci5jaGFpcik7IFxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluVUkuY2FsbFBsYXllcihsb2NhbFNlYXQsICdzaG93UGxheVBva2VycycsIHRydWUsIGNhcmRBcnIsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubWFpblVJLnNlbGZQbGF5Vmlldy5oaWRlQWxsUG9rZXJzKCk7XHJcbiAgICB9XHJcbn0iXX0=