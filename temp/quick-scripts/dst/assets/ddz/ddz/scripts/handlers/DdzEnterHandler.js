
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/handlers/DdzEnterHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e3ca4rV3p1FQ5D/UkTuMBuA', 'DdzEnterHandler');
// ddz/ddz/scripts/handlers/DdzEnterHandler.ts

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
var DdzEnterHandler = /** @class */ (function (_super) {
    __extends(DdzEnterHandler, _super);
    function DdzEnterHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzEnterHandler.prototype.refreshData = function (msg) {
        var src = msg._src;
        //自己进游戏
        if (this.context.selfSrc == src) {
            var seatId = this.SitHelper.serverSeatStrToNum(src);
            this.SitHelper.init(seatId, this.Define.MaxPlayerCount, this.Define.LocalToViewMap);
            this.context.set(this.Define.FieldInSettle, false);
        }
        var localSeat = this.SitHelper.serverSToLocalN(src);
        if (this.context.playerList[localSeat] == null) {
            Logger.error("服务器异常", localSeat);
            return;
        }
        this.context.playerList[localSeat].setInfo(msg._para);
    };
    DdzEnterHandler.prototype.execute = function (msg) {
        var src = msg._src;
        var localSeat = this.SitHelper.serverSToLocalN(src);
        this.mainUI.callPlayer(localSeat, "show", this.context.playerList[localSeat]);
        if (localSeat == 0)
            this.mainUI.selfInfoView.updateSelfPoint(this.context.playerList[localSeat].point);
        Game.Event.event(Game.EVENT_ADDTIMELOCK, "DdzEnterHandler", 0.1);
    };
    return DdzEnterHandler;
}(DdzBaseHandler_1.default));
exports.default = DdzEnterHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGhhbmRsZXJzXFxEZHpFbnRlckhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBRTlDO0lBQTZDLG1DQUFjO0lBQTNEOztJQStCQSxDQUFDO0lBOUJhLHFDQUFXLEdBQXJCLFVBQXNCLEdBQUc7UUFFckIsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNuQixPQUFPO1FBQ1AsSUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxHQUFHLEVBQzlCO1lBQ0ksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNwRixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN0RDtRQUVELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELElBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxFQUM3QztZQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ2pDLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUdTLGlDQUFPLEdBQWpCLFVBQWtCLEdBQUc7UUFDakIsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtRQUNsQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDOUUsSUFBSSxTQUFTLElBQUksQ0FBQztZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2RixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0EvQkEsQUErQkMsQ0EvQjRDLHdCQUFjLEdBK0IxRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZHpCYXNlSGFuZGxlciBmcm9tIFwiLi9EZHpCYXNlSGFuZGxlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGR6RW50ZXJIYW5kbGVyIGV4dGVuZHMgRGR6QmFzZUhhbmRsZXJ7XHJcbiAgICBwcm90ZWN0ZWQgcmVmcmVzaERhdGEobXNnKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBzcmMgPSBtc2cuX3NyYztcclxuICAgICAgICAvL+iHquW3sei/m+a4uOaIj1xyXG4gICAgICAgIGlmKHRoaXMuY29udGV4dC5zZWxmU3JjID09IHNyYylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBzZWF0SWQgPSB0aGlzLlNpdEhlbHBlci5zZXJ2ZXJTZWF0U3RyVG9OdW0oc3JjKTtcclxuICAgICAgICAgICAgdGhpcy5TaXRIZWxwZXIuaW5pdChzZWF0SWQsIHRoaXMuRGVmaW5lLk1heFBsYXllckNvdW50LCB0aGlzLkRlZmluZS5Mb2NhbFRvVmlld01hcCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zZXQodGhpcy5EZWZpbmUuRmllbGRJblNldHRsZSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuIFxyXG4gICAgICAgIGxldCBsb2NhbFNlYXQgPSB0aGlzLlNpdEhlbHBlci5zZXJ2ZXJTVG9Mb2NhbE4oc3JjKTtcclxuICAgICAgICBpZih0aGlzLmNvbnRleHQucGxheWVyTGlzdFtsb2NhbFNlYXRdID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLmnI3liqHlmajlvILluLhcIiwgbG9jYWxTZWF0KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNvbnRleHQucGxheWVyTGlzdFtsb2NhbFNlYXRdLnNldEluZm8obXNnLl9wYXJhKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGUobXNnKXtcclxuICAgICAgICBsZXQgc3JjID0gbXNnLl9zcmNcclxuICAgICAgICBsZXQgbG9jYWxTZWF0ID0gdGhpcy5TaXRIZWxwZXIuc2VydmVyU1RvTG9jYWxOKHNyYyk7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuY2FsbFBsYXllcihsb2NhbFNlYXQsIFwic2hvd1wiLCB0aGlzLmNvbnRleHQucGxheWVyTGlzdFtsb2NhbFNlYXRdKTtcclxuICAgICAgICBpZiAobG9jYWxTZWF0ID09IDApXHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLnNlbGZJbmZvVmlldy51cGRhdGVTZWxmUG9pbnQodGhpcy5jb250ZXh0LnBsYXllckxpc3RbbG9jYWxTZWF0XS5wb2ludCk7XHJcbiAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX0FERFRJTUVMT0NLLCBcIkRkekVudGVySGFuZGxlclwiLCAwLjEpO1xyXG4gICAgfVxyXG59Il19