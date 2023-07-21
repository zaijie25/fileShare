
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/handler/BbwzChatHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1f110gOOkZGp5v9t3rhEv7r', 'BbwzChatHandler');
// bbwz/Bbwz/scripts/handler/BbwzChatHandler.ts

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
var BbwzSocketBaseHandler_1 = require("./BbwzSocketBaseHandler");
var BbwzDriver_1 = require("../BbwzDriver");
var BbwzData_1 = require("../data/BbwzData");
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
var BbwzChatHandler = /** @class */ (function (_super) {
    __extends(BbwzChatHandler, _super);
    function BbwzChatHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzChatHandler.prototype.handleData = function (msg) {
        var cType = msg._para.ctype;
        var fromSit = this.convertSeat(msg._para.from_chair);
        var content = msg._para.content;
        var emoji = msg._para.emoji;
        var toSit = this.convertSeat(msg._para.to_chair);
        var fromPlayer = BbwzDriver_1.default.instance.gameUI.getPlayer(fromSit);
        var toPlayer = BbwzDriver_1.default.instance.gameUI.getPlayer(toSit);
        if (!fromPlayer || (!fromPlayer.isSomeOne && fromSit !== 10000) || !toPlayer || !toPlayer.isSomeOne) // 没人不播放 未处理
            return;
        if (cType == 0) {
            // 文字 暂无
        }
        else if (cType == 1) {
            // 表情
            var fWPos = fromPlayer.getCenterWorldPos();
            var tWPos = toPlayer.getCenterWorldPos();
            BbwzDriver_1.default.instance.gameUI.headTipsManager.playAct(String(emoji), fWPos, tWPos, toSit);
        }
    };
    BbwzChatHandler.prototype.convertSeat = function (sChair) {
        //多人机器人是10000,大富豪10001 智多星 9999,其他 10002~10005
        var posAre = [9999, 10001, 10002, 10003, 10004, 10005];
        for (var i = 0; i < posAre.length; i++) {
            if (sChair === posAre[i]) {
                if (BbwzData_1.default.instance.playerDataArr[posAre[i]] && BbwzData_1.default.instance.playerDataArr[posAre[i]]._rchair === BbwzData_1.default.instance.selfSrc) {
                    return BbwzConstDefine_1.BbwzRole.Self;
                }
            }
        }
        if (sChair == BbwzData_1.default.instance.selfSrc) {
            return BbwzConstDefine_1.BbwzRole.Self;
        }
        else if (sChair >= BbwzConstDefine_1.BbwzRole.Wiser && sChair <= BbwzConstDefine_1.BbwzRole.Richer5)
            return sChair;
        else
            return BbwzConstDefine_1.BbwzRole.Online;
    };
    BbwzChatHandler.prototype.checkInQueue = function (msgParam) {
        return false;
    };
    return BbwzChatHandler;
}(BbwzSocketBaseHandler_1.default));
exports.default = BbwzChatHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcaGFuZGxlclxcQmJ3ekNoYXRIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlFQUE0RDtBQUM1RCw0Q0FBdUM7QUFDdkMsNkNBQXdDO0FBQ3hDLDJEQUFtRDtBQUVuRDtJQUE2QyxtQ0FBcUI7SUFBbEU7O0lBNENBLENBQUM7SUEzQ0csb0NBQVUsR0FBVixVQUFXLEdBQUc7UUFDVixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUM1QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckQsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDaEMsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDNUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELElBQUksVUFBVSxHQUFRLG9CQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEUsSUFBSSxRQUFRLEdBQVEsb0JBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxJQUFJLE9BQU8sS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUksWUFBWTtZQUMvRyxPQUFPO1FBQ1gsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ1osUUFBUTtTQUNYO2FBQ0ksSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ2pCLEtBQUs7WUFDTCxJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUMzQyxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6QyxvQkFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMxRjtJQUNMLENBQUM7SUFFTyxxQ0FBVyxHQUFuQixVQUFvQixNQUFjO1FBQzlCLDhDQUE4QztRQUM5QyxJQUFJLE1BQU0sR0FBYSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDaEUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsSUFBSSxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN0QixJQUFJLGtCQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxrQkFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLGtCQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtvQkFDaEksT0FBTywwQkFBUSxDQUFDLElBQUksQ0FBQztpQkFDeEI7YUFDSjtTQUNKO1FBQ0QsSUFBSSxNQUFNLElBQUksa0JBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ3JDLE9BQU8sMEJBQVEsQ0FBQyxJQUFJLENBQUM7U0FDeEI7YUFDSSxJQUFJLE1BQU0sSUFBSSwwQkFBUSxDQUFDLEtBQUssSUFBSSxNQUFNLElBQUksMEJBQVEsQ0FBQyxPQUFPO1lBQzNELE9BQU8sTUFBTSxDQUFDOztZQUVkLE9BQU8sMEJBQVEsQ0FBQyxNQUFNLENBQUM7SUFDL0IsQ0FBQztJQUVNLHNDQUFZLEdBQW5CLFVBQW9CLFFBQVE7UUFDeEIsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0E1Q0EsQUE0Q0MsQ0E1QzRDLCtCQUFxQixHQTRDakUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmJ3elNvY2tldEJhc2VIYW5kbGVyIGZyb20gXCIuL0Jid3pTb2NrZXRCYXNlSGFuZGxlclwiO1xyXG5pbXBvcnQgQmJ3ekRyaXZlciBmcm9tIFwiLi4vQmJ3ekRyaXZlclwiO1xyXG5pbXBvcnQgQmJ3ekRhdGEgZnJvbSBcIi4uL2RhdGEvQmJ3ekRhdGFcIjtcclxuaW1wb3J0IHsgQmJ3elJvbGUgfSBmcm9tIFwiLi4vZGF0YS9CYnd6Q29uc3REZWZpbmVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJid3pDaGF0SGFuZGxlciBleHRlbmRzIEJid3pTb2NrZXRCYXNlSGFuZGxlciB7XHJcbiAgICBoYW5kbGVEYXRhKG1zZykge1xyXG4gICAgICAgIGxldCBjVHlwZSA9IG1zZy5fcGFyYS5jdHlwZTtcclxuICAgICAgICBsZXQgZnJvbVNpdCA9IHRoaXMuY29udmVydFNlYXQobXNnLl9wYXJhLmZyb21fY2hhaXIpO1xyXG4gICAgICAgIGxldCBjb250ZW50ID0gbXNnLl9wYXJhLmNvbnRlbnQ7XHJcbiAgICAgICAgbGV0IGVtb2ppID0gbXNnLl9wYXJhLmVtb2ppO1xyXG4gICAgICAgIGxldCB0b1NpdCA9IHRoaXMuY29udmVydFNlYXQobXNnLl9wYXJhLnRvX2NoYWlyKTtcclxuICAgICAgICBsZXQgZnJvbVBsYXllcjogYW55ID0gQmJ3ekRyaXZlci5pbnN0YW5jZS5nYW1lVUkuZ2V0UGxheWVyKGZyb21TaXQpO1xyXG4gICAgICAgIGxldCB0b1BsYXllcjogYW55ID0gQmJ3ekRyaXZlci5pbnN0YW5jZS5nYW1lVUkuZ2V0UGxheWVyKHRvU2l0KTtcclxuICAgICAgICBpZiAoIWZyb21QbGF5ZXIgfHwgKCFmcm9tUGxheWVyLmlzU29tZU9uZSAmJiBmcm9tU2l0ICE9PSAxMDAwMCkgfHwgIXRvUGxheWVyIHx8ICF0b1BsYXllci5pc1NvbWVPbmUpICAgLy8g5rKh5Lq65LiN5pKt5pS+IOacquWkhOeQhlxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKGNUeXBlID09IDApIHtcclxuICAgICAgICAgICAgLy8g5paH5a2XIOaaguaXoFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIC8vIOihqOaDhVxyXG4gICAgICAgICAgICBsZXQgZldQb3MgPSBmcm9tUGxheWVyLmdldENlbnRlcldvcmxkUG9zKCk7XHJcbiAgICAgICAgICAgIGxldCB0V1BvcyA9IHRvUGxheWVyLmdldENlbnRlcldvcmxkUG9zKCk7XHJcbiAgICAgICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UuZ2FtZVVJLmhlYWRUaXBzTWFuYWdlci5wbGF5QWN0KFN0cmluZyhlbW9qaSksIGZXUG9zLCB0V1BvcywgdG9TaXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbnZlcnRTZWF0KHNDaGFpcjogbnVtYmVyKSB7XHJcbiAgICAgICAgLy/lpJrkurrmnLrlmajkurrmmK8xMDAwMCzlpKflr4zosaoxMDAwMSDmmbrlpJrmmJ8gOTk5OSzlhbbku5YgMTAwMDJ+MTAwMDVcclxuICAgICAgICBsZXQgcG9zQXJlOiBudW1iZXJbXSA9IFs5OTk5LCAxMDAwMSwgMTAwMDIsIDEwMDAzLCAxMDAwNCwgMTAwMDVdXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3NBcmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHNDaGFpciA9PT0gcG9zQXJlW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQmJ3ekRhdGEuaW5zdGFuY2UucGxheWVyRGF0YUFycltwb3NBcmVbaV1dICYmIEJid3pEYXRhLmluc3RhbmNlLnBsYXllckRhdGFBcnJbcG9zQXJlW2ldXS5fcmNoYWlyID09PSBCYnd6RGF0YS5pbnN0YW5jZS5zZWxmU3JjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEJid3pSb2xlLlNlbGY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNDaGFpciA9PSBCYnd6RGF0YS5pbnN0YW5jZS5zZWxmU3JjKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBCYnd6Um9sZS5TZWxmO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzQ2hhaXIgPj0gQmJ3elJvbGUuV2lzZXIgJiYgc0NoYWlyIDw9IEJid3pSb2xlLlJpY2hlcjUpXHJcbiAgICAgICAgICAgIHJldHVybiBzQ2hhaXI7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gQmJ3elJvbGUuT25saW5lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja0luUXVldWUobXNnUGFyYW0pIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn0iXX0=