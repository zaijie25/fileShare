
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/handlers/ErmjDrawCardHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fede4rRNTNHSpvnyhcdBO/d', 'ErmjDrawCardHandler');
// ermj/Ermj/scripts/handlers/ErmjDrawCardHandler.ts

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
var ErmjRuleConst_1 = require("../data/ErmjRuleConst");
var ErmjDrawCardHandler = /** @class */ (function (_super) {
    __extends(ErmjDrawCardHandler, _super);
    function ErmjDrawCardHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjDrawCardHandler.prototype.execute = function (msg) {
        this.mainUI.callAllPlayers("showStateSp", false);
        this.mainUI.askActionView.active = false;
        var localSeat = this.SitHelper.serverSToLocalN(msg._para.chair);
        var cards = msg._para.cards || [];
        var isHeadDraw = msg._para.head_draw == 1;
        var tingDataList = this.context.get(this.Define.FieldTingData);
        if (tingDataList && !Global.Toolkit.isEmptyObject(tingDataList) && this.context.get(this.Define.FieldInTing)) {
            var random = Global.Toolkit.getRoundInteger(10);
            var isRub = ErmjRuleConst_1.default.checkAlmostWin(cards[0], tingDataList) && (random <= 1 || random >= 9);
            this.mainUI.onDrawCard(localSeat, cards, isHeadDraw, msg._para.left_count, isRub);
        }
        else {
            this.mainUI.onDrawCard(localSeat, cards, isHeadDraw, msg._para.left_count, false);
        }
    };
    ErmjDrawCardHandler.prototype.executeSync = function (msg) {
        // 重连不会进这个协议, 合并到deal里了
    };
    return ErmjDrawCardHandler;
}(ErmjBaseHandler_1.default));
exports.default = ErmjDrawCardHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcaGFuZGxlcnNcXEVybWpEcmF3Q2FyZEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQWdEO0FBQ2hELHVEQUFrRDtBQUVsRDtJQUFpRCx1Q0FBZTtJQUFoRTs7SUFzQkEsQ0FBQztJQXJCYSxxQ0FBTyxHQUFqQixVQUFrQixHQUFHO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRXpDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEUsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ2xDLElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztRQUMxQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQy9ELElBQUksWUFBWSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBQztZQUN6RyxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoRCxJQUFJLEtBQUssR0FBRyx1QkFBYSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNqRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNyRjthQUNHO1lBQ0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDckY7SUFDTCxDQUFDO0lBRVMseUNBQVcsR0FBckIsVUFBc0IsR0FBRztRQUNyQix1QkFBdUI7SUFDM0IsQ0FBQztJQUNMLDBCQUFDO0FBQUQsQ0F0QkEsQUFzQkMsQ0F0QmdELHlCQUFlLEdBc0IvRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFcm1qQmFzZUhhbmRsZXIgZnJvbSBcIi4vRXJtakJhc2VIYW5kbGVyXCI7XHJcbmltcG9ydCBFcm1qUnVsZUNvbnN0IGZyb20gXCIuLi9kYXRhL0VybWpSdWxlQ29uc3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVybWpEcmF3Q2FyZEhhbmRsZXIgZXh0ZW5kcyBFcm1qQmFzZUhhbmRsZXJ7XHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZShtc2cpe1xyXG4gICAgICAgIHRoaXMubWFpblVJLmNhbGxBbGxQbGF5ZXJzKFwic2hvd1N0YXRlU3BcIiwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmFza0FjdGlvblZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGxvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihtc2cuX3BhcmEuY2hhaXIpO1xyXG4gICAgICAgIGxldCBjYXJkcyA9IG1zZy5fcGFyYS5jYXJkcyB8fCBbXTtcclxuICAgICAgICBsZXQgaXNIZWFkRHJhdyA9IG1zZy5fcGFyYS5oZWFkX2RyYXcgPT0gMTtcclxuICAgICAgICBsZXQgdGluZ0RhdGFMaXN0ID0gdGhpcy5jb250ZXh0LmdldCh0aGlzLkRlZmluZS5GaWVsZFRpbmdEYXRhKTtcclxuICAgICAgICBpZiAodGluZ0RhdGFMaXN0ICYmICFHbG9iYWwuVG9vbGtpdC5pc0VtcHR5T2JqZWN0KHRpbmdEYXRhTGlzdCkgJiYgdGhpcy5jb250ZXh0LmdldCh0aGlzLkRlZmluZS5GaWVsZEluVGluZykpe1xyXG4gICAgICAgICAgICBsZXQgcmFuZG9tID0gR2xvYmFsLlRvb2xraXQuZ2V0Um91bmRJbnRlZ2VyKDEwKTtcclxuICAgICAgICAgICAgbGV0IGlzUnViID0gRXJtalJ1bGVDb25zdC5jaGVja0FsbW9zdFdpbihjYXJkc1swXSwgdGluZ0RhdGFMaXN0KSAmJiAocmFuZG9tIDw9IDEgfHwgcmFuZG9tID49IDkpO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5VSS5vbkRyYXdDYXJkKGxvY2FsU2VhdCwgY2FyZHMsIGlzSGVhZERyYXcsIG1zZy5fcGFyYS5sZWZ0X2NvdW50LCBpc1J1Yik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLm9uRHJhd0NhcmQobG9jYWxTZWF0LCBjYXJkcywgaXNIZWFkRHJhdywgbXNnLl9wYXJhLmxlZnRfY291bnQsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGVTeW5jKG1zZyl7XHJcbiAgICAgICAgLy8g6YeN6L+e5LiN5Lya6L+b6L+Z5Liq5Y2P6K6uLCDlkIjlubbliLBkZWFs6YeM5LqGXHJcbiAgICB9XHJcbn0iXX0=