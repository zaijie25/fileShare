
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/handlers/ErmjEnterHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1b79bOXzlVN/oM2HTWvIlua', 'ErmjEnterHandler');
// ermj/Ermj/scripts/handlers/ErmjEnterHandler.ts

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
var ErmjBaseHandler_1 = require("./ErmjBaseHandler");
var ErmjGameConst_1 = require("../data/ErmjGameConst");
var ErmjPathHelper_1 = require("../data/ErmjPathHelper");
var ErmjEnterHandler = /** @class */ (function (_super) {
    __extends(ErmjEnterHandler, _super);
    function ErmjEnterHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjEnterHandler.prototype.refreshData = function (msg) {
        var src = msg._src;
        //自己进游戏
        if (this.context.selfSrc == src) {
            var seatId = this.SitHelper.serverSeatStrToNum(src);
            this.SitHelper.init(seatId, ErmjGameConst_1.default.maxPlayerCount, ErmjGameConst_1.default.localToViewMap);
            this.context.set(this.Define.FieldInSettle, false);
        }
        var localSeat = this.SitHelper.serverSToLocalN(src);
        if (this.context.playerList[localSeat] == null) {
            Logger.error("服务器异常", localSeat);
            return;
        }
        this.context.playerList[localSeat].setInfo(msg._para);
    };
    ErmjEnterHandler.prototype.execute = function (msg) {
        var src = msg._src;
        var localSeat = this.SitHelper.serverSToLocalN(src);
        this.mainUI.callPlayer(localSeat, "show", this.context.playerList[localSeat]);
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.SeatDown, true);
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "ErmjEnterHandler", 0.1);
    };
    return ErmjEnterHandler;
}(ErmjBaseHandler_1.default));
exports.default = ErmjEnterHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcaGFuZGxlcnNcXEVybWpFbnRlckhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQWdEO0FBQ2hELHVEQUFrRDtBQUNsRCx5REFBd0Q7QUFFeEQ7SUFBK0Msb0NBQWU7SUFBOUQ7O0lBMEJBLENBQUM7SUF6QmEsc0NBQVcsR0FBckIsVUFBc0IsR0FBRztRQUNyQixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ25CLE9BQU87UUFDUCxJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLEdBQUcsRUFBQztZQUMzQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSx1QkFBYSxDQUFDLGNBQWMsRUFBRSx1QkFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3hGLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3REO1FBRUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEQsSUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLEVBQUM7WUFDMUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDakMsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBR1Msa0NBQU8sR0FBakIsVUFBa0IsR0FBRztRQUNqQixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ25CLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUM5RSx1QkFBYSxDQUFDLFNBQVMsQ0FBQywrQkFBYyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFDTCx1QkFBQztBQUFELENBMUJBLEFBMEJDLENBMUI4Qyx5QkFBZSxHQTBCN0QiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJtakJhc2VIYW5kbGVyIGZyb20gXCIuL0VybWpCYXNlSGFuZGxlclwiO1xyXG5pbXBvcnQgRXJtakdhbWVDb25zdCBmcm9tIFwiLi4vZGF0YS9Fcm1qR2FtZUNvbnN0XCI7XHJcbmltcG9ydCB7IEVybWpBdWRpb0NvbnN0IH0gZnJvbSBcIi4uL2RhdGEvRXJtalBhdGhIZWxwZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0ICBjbGFzcyBFcm1qRW50ZXJIYW5kbGVyIGV4dGVuZHMgRXJtakJhc2VIYW5kbGVye1xyXG4gICAgcHJvdGVjdGVkIHJlZnJlc2hEYXRhKG1zZyl7XHJcbiAgICAgICAgbGV0IHNyYyA9IG1zZy5fc3JjO1xyXG4gICAgICAgIC8v6Ieq5bex6L+b5ri45oiPXHJcbiAgICAgICAgaWYodGhpcy5jb250ZXh0LnNlbGZTcmMgPT0gc3JjKXtcclxuICAgICAgICAgICAgbGV0IHNlYXRJZCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNlYXRTdHJUb051bShzcmMpO1xyXG4gICAgICAgICAgICB0aGlzLlNpdEhlbHBlci5pbml0KHNlYXRJZCwgRXJtakdhbWVDb25zdC5tYXhQbGF5ZXJDb3VudCwgRXJtakdhbWVDb25zdC5sb2NhbFRvVmlld01hcCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zZXQodGhpcy5EZWZpbmUuRmllbGRJblNldHRsZSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuIFxyXG4gICAgICAgIGxldCBsb2NhbFNlYXQgPSB0aGlzLlNpdEhlbHBlci5zZXJ2ZXJTVG9Mb2NhbE4oc3JjKTtcclxuICAgICAgICBpZih0aGlzLmNvbnRleHQucGxheWVyTGlzdFtsb2NhbFNlYXRdID09IG51bGwpe1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLmnI3liqHlmajlvILluLhcIiwgbG9jYWxTZWF0KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbnRleHQucGxheWVyTGlzdFtsb2NhbFNlYXRdLnNldEluZm8obXNnLl9wYXJhKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGUobXNnKXtcclxuICAgICAgICBsZXQgc3JjID0gbXNnLl9zcmM7XHJcbiAgICAgICAgbGV0IGxvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihzcmMpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmNhbGxQbGF5ZXIobG9jYWxTZWF0LCBcInNob3dcIiwgdGhpcy5jb250ZXh0LnBsYXllckxpc3RbbG9jYWxTZWF0XSk7XHJcbiAgICAgICAgRXJtakdhbWVDb25zdC5wbGF5U291bmQoRXJtakF1ZGlvQ29uc3QuY29tbW9uQXVkaW8uU2VhdERvd24sIHRydWUpO1xyXG4gICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9BRERUSU1FTE9DSywgXCJFcm1qRW50ZXJIYW5kbGVyXCIsIDAuMSk7XHJcbiAgICB9XHJcbn0iXX0=