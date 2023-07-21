
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/handlers/DdzMultHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGhhbmRsZXJzXFxEZHpNdWx0SGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBQzlDLHFEQUF1RDtBQUN2RCx1REFBc0Q7QUFFdEQ7SUFBdUMscUNBQWM7SUFBckQ7O0lBc0JBLENBQUM7SUFyQmEsbUNBQU8sR0FBakIsVUFBa0IsR0FBRztRQUNqQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekQsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxVQUFVLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUM1QixJQUFJLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBQztZQUN6QyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqRCxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO1NBQ2xDO2FBQ0c7WUFDQSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzlEO1FBQ0QsSUFBSSxJQUFJLElBQUksQ0FBQztZQUNULElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFDO1lBQ2YsSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBQztnQkFDMUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ25EO1lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDNUQ7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0F0QkEsQUFzQkMsQ0F0QnNDLHdCQUFjLEdBc0JwRDtBQXRCWSw4Q0FBaUI7QUF3QjlCO0lBQXNDLG9DQUFjO0lBQXBEOztJQTJCQSxDQUFDO0lBMUJhLGtDQUFPLEdBQWpCLFVBQWtCLEdBQUc7UUFDakIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ2xDLElBQUksU0FBUyxJQUFJLENBQUMsRUFBQztZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwRDtRQUNELElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksUUFBUSxJQUFJLENBQUMsRUFBQztZQUNkLEdBQUcsR0FBRyw2QkFBYSxDQUFDLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzNEO2FBQ0c7WUFDQSxHQUFHLEdBQUcsNkJBQWEsQ0FBQyxPQUFPLENBQUM7U0FDL0I7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLDZCQUFhLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSw4QkFBZSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVTLHNDQUFXLEdBQXJCLFVBQXNCLEdBQUc7UUFDckIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ2xDLElBQUksUUFBUSxJQUFJLENBQUMsRUFBQztZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDM0Q7SUFDTCxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQTNCQSxBQTJCQyxDQTNCcUMsd0JBQWMsR0EyQm5EO0FBM0JZLDRDQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZHpCYXNlSGFuZGxlciBmcm9tIFwiLi9EZHpCYXNlSGFuZGxlclwiO1xyXG5pbXBvcnQgeyBEZHpHYW1lQWN0U3RhdGUgfSBmcm9tIFwiLi4vZGF0YS9EZHpHYW1lQ29uc3RcIjtcclxuaW1wb3J0IHsgRGR6QXVkaW9Db25zdCB9IGZyb20gXCIuLi9kYXRhL0RkelBhdGhIZWxwZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEZHpDYWxNdWx0SGFuZGxlciBleHRlbmRzIERkekJhc2VIYW5kbGVye1xyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGUobXNnKXtcclxuICAgICAgICBsZXQgbG9jYWxTZWF0ID0gdGhpcy5TaXRIZWxwZXIuc2VydmVyU1RvTG9jYWxOKG1zZy5fc3JjKTtcclxuICAgICAgICBsZXQgdGltZSA9IDA7XHJcbiAgICAgICAgbGV0IHNlcnZlclRpbWUgPSBtc2cuX3RpbWVzO1xyXG4gICAgICAgIGlmIChzZXJ2ZXJUaW1lICYmIEdhbWUuQ29tcG9uZW50LmNvcnJlY3RUaW1lKXtcclxuICAgICAgICAgICAgbGV0IGRldiA9IEdhbWUuQ29tcG9uZW50LmNvcnJlY3RUaW1lKHNlcnZlclRpbWUpO1xyXG4gICAgICAgICAgICB0aW1lID0gbXNnLl90aW1lbyAqIDEwMDAgLSBkZXY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRpbWUgPSBtc2cuX3RpbWVvICogMTAwMCAtIChEYXRlLm5vdygpIC0gbXNnLl9yZWNlaXZlVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aW1lIDw9IDApXHJcbiAgICAgICAgICAgIHRpbWUgPSAxMDAwO1xyXG4gICAgICAgIGlmIChsb2NhbFNlYXQgPT0gMCl7XHJcbiAgICAgICAgICAgIGlmIChsb2NhbFNlYXQgIT0gdGhpcy5jb250ZXh0LmdldCh0aGlzLkRlZmluZS5GaWVsZER6TG9jU2VhdCkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluVUkuYXNrQWN0aW9uVmlldy5zZXRNdWx0Vmlld1Nob3codHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tYWluVUkuc2hvd0FjdGlvblRpbWVyKHRydWUsIGxvY2FsU2VhdCwgdGltZSwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFpblVJLmNhbGxBbGxQbGF5ZXJzKCdzZXRTdGF0ZScsIGZhbHNlKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERkek9uTXVsdEhhbmRsZXIgZXh0ZW5kcyBEZHpCYXNlSGFuZGxlcntcclxuICAgIHByb3RlY3RlZCBleGVjdXRlKG1zZyl7XHJcbiAgICAgICAgbGV0IGxvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihtc2cuX3NyYyk7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gbXNnLl9wYXJhLnNlbGVjdGVkO1xyXG4gICAgICAgIGlmIChsb2NhbFNlYXQgPT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLmFza0FjdGlvblZpZXcuc2V0TXVsdFZpZXdTaG93KGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlcyA9ICcnO1xyXG4gICAgICAgIGlmIChzZWxlY3RlZCA9PSAyKXtcclxuICAgICAgICAgICAgcmVzID0gRGR6QXVkaW9Db25zdC5NdWx0O1xyXG4gICAgICAgICAgICB0aGlzLm1haW5VSS5jYWxsUGxheWVyKGxvY2FsU2VhdCwgJ3Nob3dNdWx0U2lnbicsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXMgPSBEZHpBdWRpb0NvbnN0Lk5vdE11bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5R2FtZUJ1bmRsZVNvdW5kKERkekF1ZGlvQ29uc3QuZ2VuZGVyU291bmRQYXRoKHJlcywgMCksIHRydWUpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmNhbGxQbGF5ZXIobG9jYWxTZWF0LCAnc2V0U3RhdGUnLCB0cnVlLCBEZHpHYW1lQWN0U3RhdGUuTXVsdCwgc2VsZWN0ZWQpO1xyXG4gICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9BRERUSU1FTE9DSywgJ0Rkek9uTXVsdEhhbmRsZXInLCAwLjMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlU3luYyhtc2cpe1xyXG4gICAgICAgIGxldCBsb2NhbFNlYXQgPSB0aGlzLlNpdEhlbHBlci5zZXJ2ZXJTVG9Mb2NhbE4obXNnLl9zcmMpO1xyXG4gICAgICAgIGxldCBzZWxlY3RlZCA9IG1zZy5fcGFyYS5zZWxlY3RlZDtcclxuICAgICAgICBpZiAoc2VsZWN0ZWQgPT0gMil7XHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLmNhbGxQbGF5ZXIobG9jYWxTZWF0LCAnc2hvd011bHRTaWduJywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19