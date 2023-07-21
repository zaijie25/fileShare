
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/handlers/ErmjGameCfgHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c7278pIYONEXbTuQUXLILQ1', 'ErmjGameCfgHandler');
// ermj/Ermj/scripts/handlers/ErmjGameCfgHandler.ts

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
var ErmjDriver_1 = require("../ErmjDriver");
var ErmjGameCfgHandler = /** @class */ (function (_super) {
    __extends(ErmjGameCfgHandler, _super);
    function ErmjGameCfgHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjGameCfgHandler.prototype.refreshData = function (msgParam) {
        this.context.serverGameCfg = msgParam._para;
        this.context.playerList = [];
        if (ErmjGameConst_1.default.maxPlayerCount < msgParam._para.seat_count) {
            Logger.error('客户端不支持服务器配置的最大人数', ErmjGameConst_1.default.maxPlayerCount, String(msgParam._para.seat_count));
            return;
        }
        for (var i = 0; i < ErmjGameConst_1.default.maxPlayerCount; i++) {
            this.context.playerList.push(new PVPPlayerData(i));
        }
    };
    ErmjGameCfgHandler.prototype.execute = function (msgParam) {
        var lv = "l0";
        if (this.context.session && this.context.session._glv) {
            lv = this.context.session._glv;
        }
        this.mainUI.updateLevelBase(msgParam._para.base_point, lv);
        //进入游戏
        ErmjDriver_1.default.instance.enterGame();
        ErmjDriver_1.default.instance.mainUI.taskManager.reqGetCommisionInfo();
    };
    ErmjGameCfgHandler.prototype.executeSync = function (msgParam) {
        this.execute(msgParam);
    };
    return ErmjGameCfgHandler;
}(ErmjBaseHandler_1.default));
exports.default = ErmjGameCfgHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcaGFuZGxlcnNcXEVybWpHYW1lQ2ZnSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBZ0Q7QUFDaEQsdURBQWtEO0FBQ2xELDRDQUF1QztBQUV2QztJQUFnRCxzQ0FBZTtJQUEvRDs7SUE2QkEsQ0FBQztJQTVCYSx3Q0FBVyxHQUFyQixVQUFzQixRQUFRO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBRTdCLElBQUksdUJBQWEsQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUM7WUFDekQsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSx1QkFBYSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2xHLE9BQU87U0FDVjtRQUNELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyx1QkFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBQztZQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0RDtJQUNMLENBQUM7SUFHUyxvQ0FBTyxHQUFqQixVQUFrQixRQUFRO1FBQ3RCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztRQUNkLElBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDO1lBQ2pELEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDbEM7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzRCxNQUFNO1FBQ04sb0JBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEMsb0JBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQ2pFLENBQUM7SUFFUyx3Q0FBVyxHQUFyQixVQUFzQixRQUFRO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0E3QkEsQUE2QkMsQ0E3QitDLHlCQUFlLEdBNkI5RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFcm1qQmFzZUhhbmRsZXIgZnJvbSBcIi4vRXJtakJhc2VIYW5kbGVyXCI7XHJcbmltcG9ydCBFcm1qR2FtZUNvbnN0IGZyb20gXCIuLi9kYXRhL0VybWpHYW1lQ29uc3RcIjtcclxuaW1wb3J0IEVybWpEcml2ZXIgZnJvbSBcIi4uL0VybWpEcml2ZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVybWpHYW1lQ2ZnSGFuZGxlciBleHRlbmRzIEVybWpCYXNlSGFuZGxlcntcclxuICAgIHByb3RlY3RlZCByZWZyZXNoRGF0YShtc2dQYXJhbSl7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnNlcnZlckdhbWVDZmcgPSBtc2dQYXJhbS5fcGFyYTtcclxuICAgICAgICB0aGlzLmNvbnRleHQucGxheWVyTGlzdCA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoRXJtakdhbWVDb25zdC5tYXhQbGF5ZXJDb3VudCA8IG1zZ1BhcmFtLl9wYXJhLnNlYXRfY291bnQpe1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoJ+WuouaIt+err+S4jeaUr+aMgeacjeWKoeWZqOmFjee9rueahOacgOWkp+S6uuaVsCcsIEVybWpHYW1lQ29uc3QubWF4UGxheWVyQ291bnQsIFN0cmluZyhtc2dQYXJhbS5fcGFyYS5zZWF0X2NvdW50KSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IEVybWpHYW1lQ29uc3QubWF4UGxheWVyQ291bnQ7IGkrKyl7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5wbGF5ZXJMaXN0LnB1c2gobmV3IFBWUFBsYXllckRhdGEoaSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGUobXNnUGFyYW0pe1xyXG4gICAgICAgIGxldCBsdiA9IFwibDBcIjtcclxuICAgICAgICBpZih0aGlzLmNvbnRleHQuc2Vzc2lvbiAmJiB0aGlzLmNvbnRleHQuc2Vzc2lvbi5fZ2x2KXtcclxuICAgICAgICAgICAgbHYgPSB0aGlzLmNvbnRleHQuc2Vzc2lvbi5fZ2x2O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1haW5VSS51cGRhdGVMZXZlbEJhc2UobXNnUGFyYW0uX3BhcmEuYmFzZV9wb2ludCwgbHYpO1xyXG4gICAgICAgIC8v6L+b5YWl5ri45oiPXHJcbiAgICAgICAgRXJtakRyaXZlci5pbnN0YW5jZS5lbnRlckdhbWUoKTtcclxuICAgICAgICBFcm1qRHJpdmVyLmluc3RhbmNlLm1haW5VSS50YXNrTWFuYWdlci5yZXFHZXRDb21taXNpb25JbmZvKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGVTeW5jKG1zZ1BhcmFtKXtcclxuICAgICAgICB0aGlzLmV4ZWN1dGUobXNnUGFyYW0pO1xyXG4gICAgfVxyXG59Il19