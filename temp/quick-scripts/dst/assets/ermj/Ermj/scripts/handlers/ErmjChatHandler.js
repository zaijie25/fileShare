
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/handlers/ErmjChatHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0ccc632vx5A5JTGovxaC3iL', 'ErmjChatHandler');
// ermj/Ermj/scripts/handlers/ErmjChatHandler.ts

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
var ErmjChatHandler = /** @class */ (function (_super) {
    __extends(ErmjChatHandler, _super);
    function ErmjChatHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjChatHandler.prototype.execute = function (msg) {
        var cType = msg._para.ctype;
        var fromSit = this.SitHelper.serverSToLocalN(msg._para.from_chair);
        var emoji = msg._para.emoji;
        var toSit = this.SitHelper.serverSToLocalN(msg._para.to_chair);
        var fromPlayer = this.mainUI.getPlayer(fromSit);
        var toPlayer = this.mainUI.getPlayer(toSit);
        if (!fromPlayer || !fromPlayer.someone || !toPlayer || !toPlayer.someone) // 没人不播放
            return;
        if (cType == 0) {
            // 文字 暂无
        }
        else if (cType == 1) {
            // 表情
            var fWPos = fromPlayer.getPlayerHeadCenterPos();
            var tWPos = toPlayer.getPlayerHeadCenterPos();
            this.mainUI.headTipsManager.playAct(emoji, fWPos, tWPos, toSit);
        }
    };
    ErmjChatHandler.prototype.checkInQueue = function () {
        return false;
    };
    return ErmjChatHandler;
}(ErmjBaseHandler_1.default));
exports.default = ErmjChatHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcaGFuZGxlcnNcXEVybWpDaGF0SGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBZ0Q7QUFFaEQ7SUFBNkMsbUNBQWU7SUFBNUQ7O0lBd0JBLENBQUM7SUF2QmEsaUNBQU8sR0FBakIsVUFBa0IsR0FBRztRQUNqQixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUM1QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25FLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzVCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFJLFFBQVE7WUFDaEYsT0FBTztRQUNYLElBQUksS0FBSyxJQUFJLENBQUMsRUFBQztZQUNYLFFBQVE7U0FDWDthQUNJLElBQUksS0FBSyxJQUFJLENBQUMsRUFBQztZQUNoQixLQUFLO1lBQ0wsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDaEQsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ25FO0lBQ0wsQ0FBQztJQUVNLHNDQUFZLEdBQW5CO1FBQ0ksT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0F4QkEsQUF3QkMsQ0F4QjRDLHlCQUFlLEdBd0IzRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFcm1qQmFzZUhhbmRsZXIgZnJvbSBcIi4vRXJtakJhc2VIYW5kbGVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFcm1qQ2hhdEhhbmRsZXIgZXh0ZW5kcyBFcm1qQmFzZUhhbmRsZXJ7XHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZShtc2cpe1xyXG4gICAgICAgIGxldCBjVHlwZSA9IG1zZy5fcGFyYS5jdHlwZTtcclxuICAgICAgICBsZXQgZnJvbVNpdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihtc2cuX3BhcmEuZnJvbV9jaGFpcik7XHJcbiAgICAgICAgbGV0IGVtb2ppID0gbXNnLl9wYXJhLmVtb2ppO1xyXG4gICAgICAgIGxldCB0b1NpdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTihtc2cuX3BhcmEudG9fY2hhaXIpO1xyXG4gICAgICAgIGxldCBmcm9tUGxheWVyID0gdGhpcy5tYWluVUkuZ2V0UGxheWVyKGZyb21TaXQpO1xyXG4gICAgICAgIGxldCB0b1BsYXllciA9IHRoaXMubWFpblVJLmdldFBsYXllcih0b1NpdCk7XHJcbiAgICAgICAgaWYgKCFmcm9tUGxheWVyIHx8ICFmcm9tUGxheWVyLnNvbWVvbmUgfHwgIXRvUGxheWVyIHx8ICF0b1BsYXllci5zb21lb25lKSAgIC8vIOayoeS6uuS4jeaSreaUvlxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKGNUeXBlID09IDApe1xyXG4gICAgICAgICAgICAvLyDmloflrZcg5pqC5pegXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNUeXBlID09IDEpe1xyXG4gICAgICAgICAgICAvLyDooajmg4VcclxuICAgICAgICAgICAgbGV0IGZXUG9zID0gZnJvbVBsYXllci5nZXRQbGF5ZXJIZWFkQ2VudGVyUG9zKCk7XHJcbiAgICAgICAgICAgIGxldCB0V1BvcyA9IHRvUGxheWVyLmdldFBsYXllckhlYWRDZW50ZXJQb3MoKTtcclxuICAgICAgICAgICAgdGhpcy5tYWluVUkuaGVhZFRpcHNNYW5hZ2VyLnBsYXlBY3QoZW1vamksIGZXUG9zLCB0V1BvcywgdG9TaXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tJblF1ZXVlKCl7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59Il19