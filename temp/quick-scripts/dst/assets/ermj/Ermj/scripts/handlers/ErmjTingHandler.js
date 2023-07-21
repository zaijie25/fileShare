
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/handlers/ErmjTingHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcaGFuZGxlcnNcXEVybWpUaW5nSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQWdEO0FBQ2hELHVEQUFrRDtBQUNsRCx5REFBd0Q7QUFFeEQ7SUFBcUMsbUNBQWU7SUFBcEQ7O0lBbURBLENBQUM7SUFsRGEsaUNBQU8sR0FBakIsVUFBa0IsR0FBRztRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRXpDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6RCxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUM7WUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNyQztRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLHVCQUFhLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEQsUUFBUTtRQUNSLElBQUksUUFBUSxHQUFVLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztRQUNqRCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztZQUNwQyxJQUFJLFdBQVMsR0FBRyxJQUFJLENBQUMsU0FB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LCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJtakJhc2VIYW5kbGVyIGZyb20gXCIuL0VybWpCYXNlSGFuZGxlclwiO1xyXG5pbXBvcnQgRXJtakdhbWVDb25zdCBmcm9tIFwiLi4vZGF0YS9Fcm1qR2FtZUNvbnN0XCI7XHJcbmltcG9ydCB7IEVybWpBdWRpb0NvbnN0IH0gZnJvbSBcIi4uL2RhdGEvRXJtalBhdGhIZWxwZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFcm1qVGluZ0hhbmRsZXIgZXh0ZW5kcyBFcm1qQmFzZUhhbmRsZXJ7XHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZShtc2cpe1xyXG4gICAgICAgIHRoaXMubWFpblVJLmFza0FjdGlvblZpZXcuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGxldCBsb2NhbFNlYXQgPSB0aGlzLlNpdEhlbHBlci5zZXJ2ZXJTVG9Mb2NhbE4obXNnLl9zcmMpO1xyXG4gICAgICAgIGlmIChsb2NhbFNlYXQgPT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zZXQodGhpcy5EZWZpbmUuRmllbGRJblRpbmcsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5VSS5zZWxmUGxheVZpZXcub25UaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFpblVJLmNhbGxQbGF5ZXIobG9jYWxTZWF0LCBcInNob3dTdGF0ZVNwXCIsIHRydWUsIEVybWpHYW1lQ29uc3QuU3RhdGVTcFN0ckNmZy5UaW5nKTtcclxuICAgICAgICB0aGlzLm1haW5VSS5jYWxsUGxheWVyKGxvY2FsU2VhdCwgXCJzaG93VGluZ1NpZ25cIiwgdHJ1ZSk7XHJcbiAgICAgICAgLy8g5Lqu5Ye66KKr5ZCs54mMXHJcbiAgICAgICAgbGV0IGxvb2tzQXJyOiBhbnlbXSA9IG1zZy5fcGFyYS50aW5nX2xvb2tzIHx8IFtdO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsb29rc0Fyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBsb2NhbFNlYXQgPSB0aGlzLlNpdEhlbHBlci5zZXJ2ZXJTVG9Mb2NhbE4obG9va3NBcnJbaV0uY2hhaXIpO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5VSS5jYWxsTWpQbGF5ZXIobG9jYWxTZWF0LCBcInNldEJlSW5UaW5nXCIpO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5VSS5jYWxsTWpQbGF5ZXIobG9jYWxTZWF0LCBcInNob3dEb3duSGFuZFwiLCBsb2NhbFNlYXQgIT0gdGhpcy5jb250ZXh0LnNlbGZMb2NhbFNlYXQsIGxvb2tzQXJyW2ldLmNhcmRzIHx8IFtdLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLmNhbGxNalBsYXllcihsb2NhbFNlYXQsIFwic2hvd0RhcmtLb25nU2VlblwiLCBsb29rc0FycltpXS5rb25ncyB8fCBbXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobXNnLl9wYXJhLnRpbmdfdHlwZSA9PSAxKXtcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkub25QbGF5KGxvY2FsU2VhdCwgbXNnLl9wYXJhLmNhcmQpOyAgICAgIC8vIOaZrumAmuWQrOaJjeWHuueJjFxyXG4gICAgICAgICAgICBHYW1lLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIEVybWpHYW1lQ29uc3QucGxheVNvdW5kKEVybWpBdWRpb0NvbnN0LmdlbmRlclNvdW5kUGF0aChcInRpbmdcIiwgbG9jYWxTZWF0ID09IDAgPyAwIDogMSksIHRydWUpO1xyXG4gICAgICAgICAgICB9LCAwLjUpO1xyXG4gICAgICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfQUREVElNRUxPQ0ssIFwiRXJtalRpbmdIYW5kbGVyXCIsIDEuNSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIEVybWpHYW1lQ29uc3QucGxheVNvdW5kKEVybWpBdWRpb0NvbnN0LmdlbmRlclNvdW5kUGF0aChcInRpbmdcIiwgbG9jYWxTZWF0ID09IDAgPyAwIDogMSksIHRydWUpO1xyXG4gICAgICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfQUREVElNRUxPQ0ssIFwiRXJtalRpbmdIYW5kbGVyXCIsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZVN5bmMobXNnKXtcclxuICAgICAgICB0aGlzLm1haW5VSS5hc2tBY3Rpb25WaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBsb2NhbFNlYXQgPSB0aGlzLlNpdEhlbHBlci5zZXJ2ZXJTVG9Mb2NhbE4obXNnLl9zcmMpO1xyXG4gICAgICAgIGlmIChsb2NhbFNlYXQgPT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zZXQodGhpcy5EZWZpbmUuRmllbGRJblRpbmcsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5VSS5zZWxmUGxheVZpZXcub25UaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFpblVJLmNhbGxQbGF5ZXIobG9jYWxTZWF0LCBcInNob3dUaW5nU2lnblwiLCB0cnVlKTtcclxuICAgICAgICAvLyDkuq7lh7rooqvlkKzniYxcclxuICAgICAgICBsZXQgbG9va3NBcnI6IGFueVtdID0gbXNnLl9wYXJhLnRpbmdfbG9va3MgfHwgW107XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxvb2tzQXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGxvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihsb29rc0FycltpXS5jaGFpcik7XHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLmNhbGxNalBsYXllcihsb2NhbFNlYXQsIFwic2V0QmVJblRpbmdcIik7XHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLmNhbGxNalBsYXllcihsb2NhbFNlYXQsIFwic2hvd0Rvd25IYW5kXCIsIGxvY2FsU2VhdCAhPSB0aGlzLmNvbnRleHQuc2VsZkxvY2FsU2VhdCwgbG9va3NBcnJbaV0uY2FyZHMgfHwgW10sIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkuY2FsbE1qUGxheWVyKGxvY2FsU2VhdCwgXCJzaG93RGFya0tvbmdTZWVuXCIsIGxvb2tzQXJyW2ldLmtvbmdzIHx8IFtdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFcm1qQ2FsbFRpbmdIYW5kbGVyIGV4dGVuZHMgRXJtakJhc2VIYW5kbGVye1xyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGUobXNnKXtcclxuICAgICAgICBsZXQgbG9jYWxTZWF0ID0gdGhpcy5TaXRIZWxwZXIuc2VydmVyU1RvTG9jYWxOKG1zZy5fc3JjKTtcclxuICAgICAgICBpZiAobG9jYWxTZWF0ID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLm1haW5VSS5hc2tBY3Rpb25WaWV3LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLmFza0FjdGlvblZpZXcuc2hvd1RpbmdCdG4odHJ1ZSwgbXNnLl9wYXJhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRpbWUgPSAwO1xyXG4gICAgICAgIGxldCBzZXJ2ZXJUaW1lID0gbXNnLl90aW1lcztcclxuICAgICAgICBpZiAoc2VydmVyVGltZSAmJiBHYW1lLkNvbXBvbmVudC5jb3JyZWN0VGltZSl7XHJcbiAgICAgICAgICAgIGxldCBkZXYgPSBHYW1lLkNvbXBvbmVudC5jb3JyZWN0VGltZShzZXJ2ZXJUaW1lKTtcclxuICAgICAgICAgICAgdGltZSA9IG1zZy5fdGltZW8gKiAxMDAwIC0gZGV2O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aW1lID0gbXNnLl90aW1lbyAqIDEwMDAgLSAoRGF0ZS5ub3coKSAtIG1zZy5fcmVjZWl2ZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRpbWUgfHwgdGltZSA8PSAwKVxyXG4gICAgICAgICAgICB0aW1lID0gMTAwMDtcclxuICAgICAgICB0aGlzLm1haW5VSS5hc2tOb3RpY2VWaWV3LnNldFRpbWVSdW5Db25maWcoTWF0aC5yb3VuZCh0aW1lIC8gMTAwMCksIG51bGwsIG51bGwpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXJtalRpbmdSZXN1bHRIYW5kbGVyIGV4dGVuZHMgRXJtakJhc2VIYW5kbGVye1xyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGUobXNnKXtcclxuICAgICAgICBsZXQgbG9jYWxTZWF0ID0gdGhpcy5TaXRIZWxwZXIuc2VydmVyU1RvTG9jYWxOKG1zZy5fc3JjKTtcclxuICAgICAgICBpZiAobG9jYWxTZWF0ID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLm1haW5VSS5zZWxmUGxheVZpZXcud2luVGlwc1ZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkuc2VsZlBsYXlWaWV3LndpblRpcHNWaWV3LnVwZGF0ZVdpbkxpc3QobXNnLl9wYXJhLnRpbmdfaXRlbXMpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc2V0KHRoaXMuRGVmaW5lLkZpZWxkVGluZ0RhdGEsIG1zZy5fcGFyYS50aW5nX2l0ZW1zKTsgICAgICAgICAgLy8gW3tcImNhcmRcIjozLCBcImZhblwiOjEwLCBcIm51bVwiOjJ9LCAuLi5dXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19