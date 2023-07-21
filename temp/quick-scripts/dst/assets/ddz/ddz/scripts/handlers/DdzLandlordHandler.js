
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/handlers/DdzLandlordHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGhhbmRsZXJzXFxEZHpMYW5kbG9yZEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4QztBQUM5QyxxREFBdUQ7QUFDdkQsdURBQXNEO0FBQ3RELHFEQUE2RDtBQUU3RDtJQUEyQyx5Q0FBYztJQUF6RDs7SUF1QkEsQ0FBQztJQXRCYSx1Q0FBTyxHQUFqQixVQUFrQixHQUFHO1FBQ2pCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6RCxJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQzVCLElBQUksVUFBVSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFDO1lBQ3pDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pELElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7U0FDbEM7YUFDRztZQUNBLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDOUQ7UUFDRCxJQUFJLElBQUksSUFBSSxDQUFDO1lBQ1QsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUM7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDOUY7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QUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFDTCwrQkFBQztBQUFELENBeENBLEFBd0NDLENBeEM2Qyx3QkFBYyxHQXdDM0Q7QUF4Q1ksNERBQXdCO0FBMENyQztJQUE2QywyQ0FBYztJQUEzRDs7SUFZQSxDQUFDO0lBWGEseUNBQU8sR0FBakIsVUFBa0IsR0FBRztRQUNqQixJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSx5QkFBeUIsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6RSxJQUFJLE9BQU8sRUFBQztZQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUksdUNBQXVDO1NBQzFFO0lBQ0wsQ0FBQztJQUNMLDhCQUFDO0FBQUQsQ0FaQSxBQVlDLENBWjRDLHdCQUFjLEdBWTFEO0FBWlksMERBQXVCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERkekJhc2VIYW5kbGVyIGZyb20gXCIuL0RkekJhc2VIYW5kbGVyXCI7XHJcbmltcG9ydCB7IERkekdhbWVBY3RTdGF0ZSB9IGZyb20gXCIuLi9kYXRhL0RkekdhbWVDb25zdFwiO1xyXG5pbXBvcnQgeyBEZHpBdWRpb0NvbnN0IH0gZnJvbSBcIi4uL2RhdGEvRGR6UGF0aEhlbHBlclwiO1xyXG5pbXBvcnQgRGR6UnVsZUNvbnN0LCB7IERkek1vZGUgfSBmcm9tIFwiLi4vZGF0YS9EZHpSdWxlQ29uc3RcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEZHpDYWxMYW5kbG9yZEhhbmRsZXIgZXh0ZW5kcyBEZHpCYXNlSGFuZGxlcntcclxuICAgIHByb3RlY3RlZCBleGVjdXRlKG1zZyl7XHJcbiAgICAgICAgbGV0IGxvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihtc2cuX3NyYyk7XHJcbiAgICAgICAgbGV0IHRpbWUgPSAwO1xyXG4gICAgICAgIGxldCBzZXJ2ZXJUaW1lID0gbXNnLl90aW1lcztcclxuICAgICAgICBpZiAoc2VydmVyVGltZSAmJiBHYW1lLkNvbXBvbmVudC5jb3JyZWN0VGltZSl7XHJcbiAgICAgICAgICAgIGxldCBkZXYgPSBHYW1lLkNvbXBvbmVudC5jb3JyZWN0VGltZShzZXJ2ZXJUaW1lKTtcclxuICAgICAgICAgICAgdGltZSA9IG1zZy5fdGltZW8gKiAxMDAwIC0gZGV2O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aW1lID0gbXNnLl90aW1lbyAqIDEwMDAgLSAoRGF0ZS5ub3coKSAtIG1zZy5fcmVjZWl2ZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGltZSA8PSAwKVxyXG4gICAgICAgICAgICB0aW1lID0gMTAwMDtcclxuICAgICAgICBpZiAobG9jYWxTZWF0ID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLm1haW5VSS5hc2tBY3Rpb25WaWV3LnNldFJvYlZpZXdTaG93KHRydWUsIG1zZy5fcGFyYS5sYW5kX2l0ZW1zLCBtc2cuX3BhcmEubWlzc19pdGVtcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFpblVJLnNob3dBY3Rpb25UaW1lcih0cnVlLCBsb2NhbFNlYXQsIHRpbWUsIG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlU3luYyhtc2cpe1xyXG4gICAgICAgIHRoaXMuZXhlY3V0ZShtc2cpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGR6T25MYW5kbG9yZEhhbmRsZXIgZXh0ZW5kcyBEZHpCYXNlSGFuZGxlcntcclxuICAgIHByb3RlY3RlZCBleGVjdXRlKG1zZyl7XHJcbiAgICAgICAgbGV0IGxvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihtc2cuX3NyYyk7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gbXNnLl9wYXJhLnNlbGVjdGVkO1xyXG4gICAgICAgIGlmIChsb2NhbFNlYXQgPT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLmFza0FjdGlvblZpZXcuc2V0Um9iVmlld1Nob3coZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVzID0gJyc7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkIDw9IDApe1xyXG4gICAgICAgICAgICBsZXQgc291bmRBcnIgPSBEZHpBdWRpb0NvbnN0Lk5vdENhbGxMYW5kb3JkQXJyO1xyXG4gICAgICAgICAgICByZXMgPSBzb3VuZEFyclswXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbGV0IHNvdW5kQXJyID0gRGR6QXVkaW9Db25zdC5DYWxsTGFuZG9yZEFycjtcclxuICAgICAgICAgICAgcmVzID0gc291bmRBcnJbc2VsZWN0ZWQgLSAxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlHYW1lQnVuZGxlU291bmQoRGR6QXVkaW9Db25zdC5nZW5kZXJTb3VuZFBhdGgocmVzLCAwKSwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuc2hvd0FjdGlvblRpbWVyKGZhbHNlKTtcclxuICAgICAgICB0aGlzLm1haW5VSS5jYWxsUGxheWVyKGxvY2FsU2VhdCwgJ3NldFN0YXRlJywgdHJ1ZSwgRGR6R2FtZUFjdFN0YXRlLlJvYiwgc2VsZWN0ZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlU3luYyhtc2cpe1xyXG4gICAgICAgIGxldCBsb2NhbFNlYXQgPSB0aGlzLlNpdEhlbHBlci5zZXJ2ZXJTVG9Mb2NhbE4obXNnLl9zcmMpO1xyXG4gICAgICAgIGxldCBzZWxlY3RlZCA9IG1zZy5fcGFyYS5zZWxlY3RlZDtcclxuICAgICAgICBpZiAobG9jYWxTZWF0ID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLm1haW5VSS5hc2tBY3Rpb25WaWV3LnNldFJvYlZpZXdTaG93KGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYWluVUkuc2hvd0FjdGlvblRpbWVyKGZhbHNlKTtcclxuICAgICAgICB0aGlzLm1haW5VSS5jYWxsUGxheWVyKGxvY2FsU2VhdCwgJ3NldFN0YXRlJywgdHJ1ZSwgRGR6R2FtZUFjdFN0YXRlLlJvYiwgc2VsZWN0ZWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGR6TGFuZGxvcmRSZXN1bHRIYW5kbGVyIGV4dGVuZHMgRGR6QmFzZUhhbmRsZXJ7XHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZShtc2cpe1xyXG4gICAgICAgIHRoaXMubWFpblVJLmFza0FjdGlvblZpZXcuc2V0Um9iVmlld1Nob3coZmFsc2UpO1xyXG4gICAgICAgIGxldCBkelNlYXQgPSB0aGlzLlNpdEhlbHBlci5zZXJ2ZXJTVG9Mb2NhbE4obXNnLl9wYXJhLmxhbmRfY2hhaXIpO1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5zZXQodGhpcy5EZWZpbmUuRmllbGREekxvY1NlYXQsIGR6U2VhdCk7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuZHpMZWZ0UG9rZXJzVmlldy5zaG93U2NvcmVMYmwodHJ1ZSwgbXNnLl9wYXJhLnNlbGVjdGVkKTtcclxuICAgICAgICB0aGlzLm1haW5VSS5kekxlZnRQb2tlcnNWaWV3LnNldFRocmVlUG9rZXJWYWx1ZShtc2cuX3BhcmEuY2FyZHMpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmR6TGVmdFBva2Vyc1ZpZXcuc2hvd1RocmVlUG9rZXIodHJ1ZSk7XHJcblxyXG4gICAgICAgIGlmIChkelNlYXQgPT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5hZGRTZWxmSGFuZFBva2Vycyhtc2cuX3BhcmEuY2FyZHMsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkuc2VsZlBsYXlWaWV3LnNob3dMYW5kbG9yZFBva2VyKG1zZy5fcGFyYS5jYXJkcyk7XHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLnVwZGF0ZVJvdW5kTXVsdChtc2cuX3BhcmEuc2VsZWN0ZWQgKiAyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbGV0IGNmZyA9IERkelJ1bGVDb25zdC5Nb2RlQ29uZmlnW3RoaXMuY29udGV4dC5tb2RlXTtcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkuY2FsbFBsYXllcihkelNlYXQsICdzZXRQbGF5ZXJMZWZ0UG9rZXJzJywgdHJ1ZSwgY2ZnLmJhc2VDb3VudCArIGNmZy5sZWZ0Q291bnQpO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5VSS51cGRhdGVSb3VuZE11bHQobXNnLl9wYXJhLnNlbGVjdGVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYWluVUkuY2FsbFBsYXllcihkelNlYXQsICdzZXREeicsIHRydWUsIHRydWUpO1xyXG4gICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9BRERUSU1FTE9DSywgXCJEZHpMYW5kbG9yZFJlc3VsdEhhbmRsZXJcIiwgdGhpcy5EZWZpbmUuRmx5RHpJY29uICsgMC4xKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZVN5bmMobXNnKXtcclxuICAgICAgICB0aGlzLm1haW5VSS5hc2tBY3Rpb25WaWV3LnNldFJvYlZpZXdTaG93KGZhbHNlKTtcclxuICAgICAgICBsZXQgZHpTZWF0ID0gdGhpcy5TaXRIZWxwZXIuc2VydmVyU1RvTG9jYWxOKG1zZy5fcGFyYS5sYW5kX2NoYWlyKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuc2V0KHRoaXMuRGVmaW5lLkZpZWxkRHpMb2NTZWF0LCBkelNlYXQpO1xyXG4gICAgICAgIGlmIChkelNlYXQgPT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLnVwZGF0ZVJvdW5kTXVsdChtc2cuX3BhcmEuc2VsZWN0ZWQgKiAyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkudXBkYXRlUm91bmRNdWx0KG1zZy5fcGFyYS5zZWxlY3RlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFpblVJLmR6TGVmdFBva2Vyc1ZpZXcuc2hvd1Njb3JlTGJsKHRydWUsIG1zZy5fcGFyYS5zZWxlY3RlZCk7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuZHpMZWZ0UG9rZXJzVmlldy5zZXRUaHJlZVBva2VyVmFsdWUobXNnLl9wYXJhLmNhcmRzKTtcclxuICAgICAgICB0aGlzLm1haW5VSS5kekxlZnRQb2tlcnNWaWV3LnNob3dUaHJlZVBva2VyKHRydWUpO1xyXG5cclxuICAgICAgICB0aGlzLm1haW5VSS5zZWxmUGxheVZpZXcuc2hvd0R6T3duZXJTaWduKCk7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuY2FsbFBsYXllcihkelNlYXQsICdzZXREeicsIHRydWUsIGZhbHNlKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERkelJlQ2FsTGFuZGxvcmRIYW5kbGVyIGV4dGVuZHMgRGR6QmFzZUhhbmRsZXJ7XHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZShtc2cpe1xyXG4gICAgICAgIGxldCBpc01hdGNoID0gbXNnLl9wYXJhICYmIG1zZy5fcGFyYS5jbGVhciA9PSAxO1xyXG4gICAgICAgIEdhbWUuVHdlZW4uY2xlYXIoKTtcclxuICAgICAgICBHYW1lLkNvbXBvbmVudC51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7IFxyXG4gICAgICAgIHRoaXMubWFpblVJLmNsZWFyQnlSb3VuZCgpO1xyXG4gICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9BRERUSU1FTE9DSywgXCJEZHpSZUNhbExhbmRsb3JkSGFuZGxlclwiLCAwLjIpO1xyXG4gICAgICAgIGlmIChpc01hdGNoKXtcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkuY2xlYXJPdGhlclBsYXllcnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyQnlSb3VuZCgpOyAgICAvLyDlpJrmrKHpg73kuI3lj6vlnLDkuLvliLDop6PmlaPmiY3muIXnkIbmlbDmja4gZGVidWcg5pS+5aSW6Z2i5Lya5a+86Ie05ri45oiP5byA5aeL5qCH5b+X6YeN572uXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19