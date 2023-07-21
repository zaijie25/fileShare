
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/handlers/ErmjCallBlockHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ae05dmH+UtAU75MJfLLuyye', 'ErmjCallBlockHandler');
// ermj/Ermj/scripts/handlers/ErmjCallBlockHandler.ts

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
exports.ErmjCallOtherBlockHandler = exports.ErmjCallSelfBlockHandler = void 0;
var ErmjBaseHandler_1 = require("./ErmjBaseHandler");
var ErmjCallSelfBlockHandler = /** @class */ (function (_super) {
    __extends(ErmjCallSelfBlockHandler, _super);
    function ErmjCallSelfBlockHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjCallSelfBlockHandler.prototype.execute = function (msg) {
        this.mainUI.callAllPlayers("showStateSp", false);
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        if (localSeat == 0) {
            var cfg = {
                isChow: msg._para.can_chow == 1,
                isPong: msg._para.can_pong == 1,
                isKong: msg._para.can_kong == 1,
                isWin: msg._para.can_win == 1,
            };
            this.mainUI.askActionView.active = true;
            this.mainUI.askActionView.showBtnByConfig(cfg, msg._para);
        }
        // 倒计时走cal_play debug听牌后没有cal_play
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
    return ErmjCallSelfBlockHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjCallSelfBlockHandler = ErmjCallSelfBlockHandler;
var ErmjCallOtherBlockHandler = /** @class */ (function (_super) {
    __extends(ErmjCallOtherBlockHandler, _super);
    function ErmjCallOtherBlockHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjCallOtherBlockHandler.prototype.execute = function (msg) {
        this.mainUI.callAllPlayers("showStateSp", false);
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        if (localSeat == 0) {
            var cfg = {
                isChow: msg._para.can_chow == 1,
                isPong: msg._para.can_pong == 1,
                isKong: msg._para.can_kong == 1,
                isWin: msg._para.can_win == 1,
            };
            this.mainUI.askActionView.active = true;
            this.mainUI.askActionView.showBtnByConfig(cfg, msg._para);
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
    return ErmjCallOtherBlockHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjCallOtherBlockHandler = ErmjCallOtherBlockHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcaGFuZGxlcnNcXEVybWpDYWxsQmxvY2tIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBZ0Q7QUFFaEQ7SUFBOEMsNENBQWU7SUFBN0Q7O0lBNEJBLENBQUM7SUEzQmEsMENBQU8sR0FBakIsVUFBa0IsR0FBRztRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDakQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQUksU0FBUyxJQUFJLENBQUMsRUFBQztZQUNmLElBQUksR0FBRyxHQUFHO2dCQUNOLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUFDO2dCQUMvQixNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQztnQkFDL0IsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUM7Z0JBQy9CLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxDQUFDO2FBQ2hDLENBQUE7WUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdEO1FBQ0Qsa0NBQWtDO1FBQ2xDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUM7WUFDekMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztTQUNsQzthQUNHO1lBQ0EsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUM5RDtRQUNELElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUM7WUFDbEIsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUNMLCtCQUFDO0FBQUQsQ0E1QkEsQUE0QkMsQ0E1QjZDLHlCQUFlLEdBNEI1RDtBQTVCWSw0REFBd0I7QUE4QnJDO0lBQStDLDZDQUFlO0lBQTlEOztJQTRCQSxDQUFDO0lBM0JhLDJDQUFPLEdBQWpCLFVBQWtCLEdBQUc7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6RCxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUM7WUFDZixJQUFJLEdBQUcsR0FBRztnQkFDTixNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQztnQkFDL0IsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUM7Z0JBQy9CLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUFDO2dCQUMvQixLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksQ0FBQzthQUNoQyxDQUFBO1lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3RDtRQUVELElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUM7WUFDekMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztTQUNsQzthQUNHO1lBQ0EsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUM5RDtRQUNELElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUM7WUFDbEIsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUNMLGdDQUFDO0FBQUQsQ0E1QkEsQUE0QkMsQ0E1QjhDLHlCQUFlLEdBNEI3RDtBQTVCWSw4REFBeUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJtakJhc2VIYW5kbGVyIGZyb20gXCIuL0VybWpCYXNlSGFuZGxlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVybWpDYWxsU2VsZkJsb2NrSGFuZGxlciBleHRlbmRzIEVybWpCYXNlSGFuZGxlcntcclxuICAgIHByb3RlY3RlZCBleGVjdXRlKG1zZyl7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuY2FsbEFsbFBsYXllcnMoXCJzaG93U3RhdGVTcFwiLCBmYWxzZSk7XHJcbiAgICAgICAgbGV0IGxvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihtc2cuX3NyYyk7XHJcbiAgICAgICAgaWYgKGxvY2FsU2VhdCA9PSAwKXtcclxuICAgICAgICAgICAgbGV0IGNmZyA9IHtcclxuICAgICAgICAgICAgICAgIGlzQ2hvdzogbXNnLl9wYXJhLmNhbl9jaG93ID09IDEsXHJcbiAgICAgICAgICAgICAgICBpc1Bvbmc6IG1zZy5fcGFyYS5jYW5fcG9uZyA9PSAxLFxyXG4gICAgICAgICAgICAgICAgaXNLb25nOiBtc2cuX3BhcmEuY2FuX2tvbmcgPT0gMSxcclxuICAgICAgICAgICAgICAgIGlzV2luOiBtc2cuX3BhcmEuY2FuX3dpbiA9PSAxLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLmFza0FjdGlvblZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkuYXNrQWN0aW9uVmlldy5zaG93QnRuQnlDb25maWcoY2ZnLCBtc2cuX3BhcmEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDlgJLorqHml7botbBjYWxfcGxheSBkZWJ1Z+WQrOeJjOWQjuayoeaciWNhbF9wbGF5XHJcbiAgICAgICAgbGV0IHRpbWUgPSAwO1xyXG4gICAgICAgIGxldCBzZXJ2ZXJUaW1lID0gbXNnLl90aW1lcztcclxuICAgICAgICBpZiAoc2VydmVyVGltZSAmJiBHYW1lLkNvbXBvbmVudC5jb3JyZWN0VGltZSl7XHJcbiAgICAgICAgICAgIGxldCBkZXYgPSBHYW1lLkNvbXBvbmVudC5jb3JyZWN0VGltZShzZXJ2ZXJUaW1lKTtcclxuICAgICAgICAgICAgdGltZSA9IG1zZy5fdGltZW8gKiAxMDAwIC0gZGV2O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aW1lID0gbXNnLl90aW1lbyAqIDEwMDAgLSAoRGF0ZS5ub3coKSAtIG1zZy5fcmVjZWl2ZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRpbWUgfHwgdGltZSA8PSAwKVxyXG4gICAgICAgICAgICB0aW1lID0gMTAwMDtcclxuICAgICAgICB0aGlzLm1haW5VSS5hc2tOb3RpY2VWaWV3LnNldFRpbWVSdW5Db25maWcoTWF0aC5yb3VuZCh0aW1lIC8gMTAwMCksIG51bGwsIG51bGwpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXJtakNhbGxPdGhlckJsb2NrSGFuZGxlciBleHRlbmRzIEVybWpCYXNlSGFuZGxlcntcclxuICAgIHByb3RlY3RlZCBleGVjdXRlKG1zZyl7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuY2FsbEFsbFBsYXllcnMoXCJzaG93U3RhdGVTcFwiLCBmYWxzZSk7XHJcbiAgICAgICAgbGV0IGxvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihtc2cuX3NyYyk7XHJcbiAgICAgICAgaWYgKGxvY2FsU2VhdCA9PSAwKXtcclxuICAgICAgICAgICAgbGV0IGNmZyA9IHtcclxuICAgICAgICAgICAgICAgIGlzQ2hvdzogbXNnLl9wYXJhLmNhbl9jaG93ID09IDEsXHJcbiAgICAgICAgICAgICAgICBpc1Bvbmc6IG1zZy5fcGFyYS5jYW5fcG9uZyA9PSAxLFxyXG4gICAgICAgICAgICAgICAgaXNLb25nOiBtc2cuX3BhcmEuY2FuX2tvbmcgPT0gMSxcclxuICAgICAgICAgICAgICAgIGlzV2luOiBtc2cuX3BhcmEuY2FuX3dpbiA9PSAxLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLmFza0FjdGlvblZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkuYXNrQWN0aW9uVmlldy5zaG93QnRuQnlDb25maWcoY2ZnLCBtc2cuX3BhcmEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRpbWUgPSAwO1xyXG4gICAgICAgIGxldCBzZXJ2ZXJUaW1lID0gbXNnLl90aW1lcztcclxuICAgICAgICBpZiAoc2VydmVyVGltZSAmJiBHYW1lLkNvbXBvbmVudC5jb3JyZWN0VGltZSl7XHJcbiAgICAgICAgICAgIGxldCBkZXYgPSBHYW1lLkNvbXBvbmVudC5jb3JyZWN0VGltZShzZXJ2ZXJUaW1lKTtcclxuICAgICAgICAgICAgdGltZSA9IG1zZy5fdGltZW8gKiAxMDAwIC0gZGV2O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aW1lID0gbXNnLl90aW1lbyAqIDEwMDAgLSAoRGF0ZS5ub3coKSAtIG1zZy5fcmVjZWl2ZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRpbWUgfHwgdGltZSA8PSAwKVxyXG4gICAgICAgICAgICB0aW1lID0gMTAwMDtcclxuICAgICAgICB0aGlzLm1haW5VSS5hc2tOb3RpY2VWaWV3LnNldFRpbWVSdW5Db25maWcoTWF0aC5yb3VuZCh0aW1lIC8gMTAwMCksIG51bGwsIG51bGwpO1xyXG4gICAgfVxyXG59Il19