
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/game/pvp/PVPPlayerData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7ac8cuPAVVOHYgHoZSk2PPq', 'PVPPlayerData');
// hall/scripts/logic/core/game/pvp/PVPPlayerData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//玩家游戏数据
var PVPPlayerData = /** @class */ (function () {
    function PVPPlayerData(sit) {
        this.in_game = false;
        this.isEmpty = true;
        this.nickname = "";
        this.point = 0;
        this.headimg = "";
        this.sit = sit;
        this.in_game = false;
        this.isEmpty = true;
        this.headkuang = 0;
        this.enterPoint = 0;
        this.vip = 0;
    }
    PVPPlayerData.prototype.setInfo = function (serverInfo) {
        this.nickname = serverInfo.nickname || "";
        this.headimg = serverInfo.headimg || "";
        this.point = serverInfo.point || 0;
        if (serverInfo._chair)
            this.chair = serverInfo._chair;
        this.in_game = serverInfo.in_game;
        this.area = serverInfo.area;
        this.headkuang = serverInfo.a_box || 0;
        if (this.area == null || this.area == "")
            this.area = "未知地点";
        this.isEmpty = false;
        this.enterPoint = serverInfo.EnterPoint == undefined ? this.point : serverInfo.EnterPoint;
        this.vip = serverInfo.vip || 0;
    };
    PVPPlayerData.prototype.refresh = function (msg) {
        this.point = msg.point;
        this.chair = msg._chair;
        this.in_game = msg.in_game;
        this.enterPoint = msg.EnterPoint == undefined ? this.point : msg.EnterPoint;
        this.vip = msg.vip;
    };
    PVPPlayerData.prototype.clear = function () {
        this.nickname = "";
        this.point = 0;
        this.headimg = "";
        this.chair = -1;
        this.in_game = false;
        this.isEmpty = true;
        this.enterPoint = 0;
        this.vip = 0;
    };
    return PVPPlayerData;
}());
exports.default = PVPPlayerData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGdhbWVcXHB2cFxcUFZQUGxheWVyRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFFBQVE7QUFDUjtJQWFJLHVCQUFZLEdBQVc7UUFOaEIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixZQUFPLEdBQUcsSUFBSSxDQUFDO1FBTWxCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRU0sK0JBQU8sR0FBZCxVQUFlLFVBQVU7UUFFckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7UUFDbkMsSUFBRyxVQUFVLENBQUMsTUFBTTtZQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFBO1FBQ3RDLElBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7UUFDMUYsSUFBSSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0sK0JBQU8sR0FBZCxVQUFlLEdBQUc7UUFFZCxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxVQUFVLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO1FBQzVFLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztJQUN2QixDQUFDO0lBRU0sNkJBQUssR0FBWjtRQUVJLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQTlEQSxBQThEQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy/njqnlrrbmuLjmiI/mlbDmja5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUFZQUGxheWVyRGF0YSBcclxue1xyXG4gICAgcHVibGljIG5pY2tuYW1lOiBzdHJpbmc7IC8vIOWnk+WQjVxyXG4gICAgcHVibGljIHBvaW50OiBudW1iZXI7IC8vIHBvaW50XHJcbiAgICBwdWJsaWMgaGVhZGltZzogc3RyaW5nOyAvL1xyXG4gICAgcHVibGljIHNpdDogbnVtYmVyOy8v5bqn5L2N5Y+3XHJcbiAgICBwdWJsaWMgY2hhaXI6IG51bWJlcjsvL+acjeWKoeWZqOW6p+S9jeWPt1xyXG4gICAgcHVibGljIGluX2dhbWUgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBpc0VtcHR5ID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBhcmVhOnN0cmluZztcclxuICAgIHB1YmxpYyBoZWFka3Vhbmc6bnVtYmVyO1xyXG4gICAgcHVibGljIGVudGVyUG9pbnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyB2aXA6bnVtYmVyOy8vdmlwIOetiee6p1xyXG4gICAgY29uc3RydWN0b3Ioc2l0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm5pY2tuYW1lID0gXCJcIjtcclxuICAgICAgICB0aGlzLnBvaW50ID0gMDtcclxuICAgICAgICB0aGlzLmhlYWRpbWcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2l0ID0gc2l0O1xyXG4gICAgICAgIHRoaXMuaW5fZ2FtZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNFbXB0eSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5oZWFka3VhbmcgPSAwO1xyXG4gICAgICAgIHRoaXMuZW50ZXJQb2ludCA9IDA7XHJcbiAgICAgICAgdGhpcy52aXAgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRJbmZvKHNlcnZlckluZm8pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5uaWNrbmFtZSA9IHNlcnZlckluZm8ubmlja25hbWUgfHwgXCJcIjtcclxuICAgICAgICB0aGlzLmhlYWRpbWcgPSBzZXJ2ZXJJbmZvLmhlYWRpbWcgfHwgXCJcIjtcclxuICAgICAgICB0aGlzLnBvaW50ID0gc2VydmVySW5mby5wb2ludCB8fCAwO1xyXG4gICAgICAgIGlmKHNlcnZlckluZm8uX2NoYWlyKVxyXG4gICAgICAgICAgICB0aGlzLmNoYWlyID0gc2VydmVySW5mby5fY2hhaXI7XHJcbiAgICAgICAgdGhpcy5pbl9nYW1lID0gc2VydmVySW5mby5pbl9nYW1lO1xyXG4gICAgICAgIHRoaXMuYXJlYSA9IHNlcnZlckluZm8uYXJlYTtcclxuICAgICAgICB0aGlzLmhlYWRrdWFuZyA9IHNlcnZlckluZm8uYV9ib3ggfHwgMFxyXG4gICAgICAgIGlmKHRoaXMuYXJlYSA9PSBudWxsIHx8IHRoaXMuYXJlYSA9PSBcIlwiKVxyXG4gICAgICAgICAgICB0aGlzLmFyZWEgPSBcIuacquefpeWcsOeCuVwiO1xyXG4gICAgICAgIHRoaXMuaXNFbXB0eSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZW50ZXJQb2ludCA9IHNlcnZlckluZm8uRW50ZXJQb2ludCA9PSB1bmRlZmluZWQgPyB0aGlzLnBvaW50IDogc2VydmVySW5mby5FbnRlclBvaW50O1xyXG4gICAgICAgIHRoaXMudmlwID0gc2VydmVySW5mby52aXAgfHwgMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVmcmVzaChtc2cpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wb2ludCA9IG1zZy5wb2ludDtcclxuICAgICAgICB0aGlzLmNoYWlyID0gbXNnLl9jaGFpcjtcclxuICAgICAgICB0aGlzLmluX2dhbWUgPSBtc2cuaW5fZ2FtZTtcclxuICAgICAgICB0aGlzLmVudGVyUG9pbnQgPSBtc2cuRW50ZXJQb2ludCA9PSB1bmRlZmluZWQgPyB0aGlzLnBvaW50IDogbXNnLkVudGVyUG9pbnQ7XHJcbiAgICAgICAgdGhpcy52aXAgPSBtc2cudmlwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5uaWNrbmFtZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5wb2ludCA9IDA7XHJcbiAgICAgICAgdGhpcy5oZWFkaW1nID0gXCJcIjtcclxuICAgICAgICB0aGlzLmNoYWlyID0gLTE7XHJcbiAgICAgICAgdGhpcy5pbl9nYW1lID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc0VtcHR5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmVudGVyUG9pbnQgPSAwO1xyXG4gICAgICAgIHRoaXMudmlwID0gMDtcclxuICAgIH1cclxufVxyXG4iXX0=