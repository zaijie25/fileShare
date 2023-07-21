
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/game/serverHelper/GameHeartBeatHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b85f4bA7otNeat8hLgVAJUX', 'GameHeartBeatHelper');
// hall/scripts/logic/core/game/serverHelper/GameHeartBeatHelper.ts

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
var BaseServerHelper_1 = require("./BaseServerHelper");
var GameServer_1 = require("../GameServer");
var GameHeartBeatHelper = /** @class */ (function (_super) {
    __extends(GameHeartBeatHelper, _super);
    function GameHeartBeatHelper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sendInterval = 0;
        _this.lastHeartBeatInterval = 3;
        _this.start = false;
        _this.netInterval = 0;
        //是否在后台
        _this.isBackground = false;
        //心跳计数
        _this.heartBeatSeq = 1;
        return _this;
    }
    GameHeartBeatHelper.prototype.onInit = function () {
    };
    GameHeartBeatHelper.prototype.startHeartbeat = function () {
        this.start = true;
    };
    GameHeartBeatHelper.prototype.stopHeartBeat = function () {
        this.start = false;
    };
    GameHeartBeatHelper.prototype.sendHeartBeat = function () {
        if (this.server.isRunning) {
            var seq = 0;
            if (!this.isBackground) {
                seq = this.heartBeatSeq;
                this.heartBeatSeq++;
            }
            this.server.send(Game.Command.HeartBeat, { "_seq": seq });
        }
    };
    GameHeartBeatHelper.prototype.HandleHeartBeat = function (msg) {
        this.sendInterval = msg._param._para && msg._param._para.timeout || 3;
        this.lastHeartBeatInterval = this.sendInterval;
    };
    GameHeartBeatHelper.prototype.run = function () {
        this.resetSeq();
        cc.game.on(cc.game.EVENT_SHOW, this.onResume, this);
        cc.game.on(cc.game.EVENT_HIDE, this.onPause, this);
        this.server.on(GameServer_1.default.Event_GameSocketStartConnect, this, this.resetSeq);
    };
    GameHeartBeatHelper.prototype.clear = function () {
        this.resetSeq();
        cc.game.off(cc.game.EVENT_SHOW, this.onResume, this);
        cc.game.off(cc.game.EVENT_HIDE, this.onPause, this);
        this.server.off(GameServer_1.default.Event_GameSocketStartConnect, this, this.resetSeq);
        this.sendInterval = 0;
        this.startHeartbeat();
    };
    GameHeartBeatHelper.prototype.onResume = function () {
        this.isBackground = false;
        this.sendHeartBeat();
        clearInterval(this.tmpInterval);
    };
    GameHeartBeatHelper.prototype.onPause = function () {
        this.isBackground = true;
    };
    //默认值为1  0为background
    GameHeartBeatHelper.prototype.resetSeq = function () {
        this.heartBeatSeq = 1;
    };
    GameHeartBeatHelper.prototype.onUpdate = function (dt) {
        if (!this.start)
            return;
        if (!this.server.isRunning)
            return;
        if (this.sendInterval > 0) {
            this.sendInterval -= dt;
            if (this.sendInterval <= 0) {
                this.sendHeartBeat();
                this.sendInterval = this.lastHeartBeatInterval;
            }
        }
    };
    return GameHeartBeatHelper;
}(BaseServerHelper_1.default));
exports.default = GameHeartBeatHelper;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGdhbWVcXHNlcnZlckhlbHBlclxcR2FtZUhlYXJ0QmVhdEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBa0Q7QUFDbEQsNENBQXVDO0FBRXZDO0lBQWlELHVDQUFnQjtJQUFqRTtRQUFBLHFFQTJHQztRQXpHVyxrQkFBWSxHQUFHLENBQUMsQ0FBQztRQUVqQiwyQkFBcUIsR0FBRyxDQUFDLENBQUM7UUFFMUIsV0FBSyxHQUFHLEtBQUssQ0FBQztRQUVmLGlCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBRXZCLE9BQU87UUFDQyxrQkFBWSxHQUFHLEtBQUssQ0FBQztRQUU3QixNQUFNO1FBQ0Usa0JBQVksR0FBRyxDQUFDLENBQUM7O0lBNkY3QixDQUFDO0lBM0ZhLG9DQUFNLEdBQWhCO0lBRUEsQ0FBQztJQUVNLDRDQUFjLEdBQXJCO1FBRUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVNLDJDQUFhLEdBQXBCO1FBRUksSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUdNLDJDQUFhLEdBQXBCO1FBRUksSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFDeEI7WUFDSSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDWixJQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksRUFDckI7Z0JBQ0ksR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUN2QjtZQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUE7U0FDekQ7SUFDTCxDQUFDO0lBRU0sNkNBQWUsR0FBdEIsVUFBdUIsR0FBRztRQUV0QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDbkQsQ0FBQztJQUVNLGlDQUFHLEdBQVY7UUFFSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRCxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLG9CQUFVLENBQUMsNEJBQTRCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNoRixDQUFDO0lBRU0sbUNBQUssR0FBWjtRQUVJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JELEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JBQVUsQ0FBQyw0QkFBNEIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzdFLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBSU8sc0NBQVEsR0FBaEI7UUFFSSxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0lBRU8scUNBQU8sR0FBZjtRQUVJLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFFRCxxQkFBcUI7SUFDYixzQ0FBUSxHQUFoQjtRQUVJLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFHTSxzQ0FBUSxHQUFmLFVBQWdCLEVBQUU7UUFFZCxJQUFHLENBQUMsSUFBSSxDQUFDLEtBQUs7WUFDVixPQUFPO1FBQ1gsSUFBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUztZQUNyQixPQUFPO1FBQ1gsSUFBRyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsRUFDeEI7WUFDSSxJQUFJLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQztZQUN4QixJQUFHLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxFQUN6QjtnQkFDSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDO2FBQ2xEO1NBQ0o7SUFDTCxDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQTNHQSxBQTJHQyxDQTNHZ0QsMEJBQWdCLEdBMkdoRSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlU2VydmVySGVscGVyIGZyb20gXCIuL0Jhc2VTZXJ2ZXJIZWxwZXJcIjtcclxuaW1wb3J0IEdhbWVTZXJ2ZXIgZnJvbSBcIi4uL0dhbWVTZXJ2ZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVIZWFydEJlYXRIZWxwZXIgZXh0ZW5kcyBCYXNlU2VydmVySGVscGVyXHJcbntcclxuICAgIHByaXZhdGUgc2VuZEludGVydmFsID0gMDtcclxuXHJcbiAgICBwcml2YXRlIGxhc3RIZWFydEJlYXRJbnRlcnZhbCA9IDM7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGFydCA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBuZXRJbnRlcnZhbCA9IDA7XHJcblxyXG4gICAgLy/mmK/lkKblnKjlkI7lj7BcclxuICAgIHByaXZhdGUgaXNCYWNrZ3JvdW5kID0gZmFsc2U7XHJcblxyXG4gICAgLy/lv4Pot7PorqHmlbBcclxuICAgIHByaXZhdGUgaGVhcnRCZWF0U2VxID0gMTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KClcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnRIZWFydGJlYXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wSGVhcnRCZWF0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzZW5kSGVhcnRCZWF0KClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnNlcnZlci5pc1J1bm5pbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgc2VxID0gMDtcclxuICAgICAgICAgICAgaWYoIXRoaXMuaXNCYWNrZ3JvdW5kKVxyXG4gICAgICAgICAgICB7ICAgXHJcbiAgICAgICAgICAgICAgICBzZXEgPSB0aGlzLmhlYXJ0QmVhdFNlcTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVhcnRCZWF0U2VxKys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2VydmVyLnNlbmQoR2FtZS5Db21tYW5kLkhlYXJ0QmVhdCwge1wiX3NlcVwiOnNlcX0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBIYW5kbGVIZWFydEJlYXQobXNnKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2VuZEludGVydmFsID0gbXNnLl9wYXJhbS5fcGFyYSAmJiBtc2cuX3BhcmFtLl9wYXJhLnRpbWVvdXQgfHwgMztcclxuICAgICAgICB0aGlzLmxhc3RIZWFydEJlYXRJbnRlcnZhbCA9IHRoaXMuc2VuZEludGVydmFsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBydW4oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucmVzZXRTZXEoKTtcclxuICAgICAgICBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfU0hPVywgdGhpcy5vblJlc3VtZSwgdGhpcyk7XHJcbiAgICAgICAgY2MuZ2FtZS5vbihjYy5nYW1lLkVWRU5UX0hJREUsIHRoaXMub25QYXVzZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXIub24oR2FtZVNlcnZlci5FdmVudF9HYW1lU29ja2V0U3RhcnRDb25uZWN0LCB0aGlzLCB0aGlzLnJlc2V0U2VxKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5yZXNldFNlcSgpO1xyXG4gICAgICAgIGNjLmdhbWUub2ZmKGNjLmdhbWUuRVZFTlRfU0hPVywgdGhpcy5vblJlc3VtZSwgdGhpcyk7XHJcbiAgICAgICAgY2MuZ2FtZS5vZmYoY2MuZ2FtZS5FVkVOVF9ISURFLCB0aGlzLm9uUGF1c2UsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2VydmVyLm9mZihHYW1lU2VydmVyLkV2ZW50X0dhbWVTb2NrZXRTdGFydENvbm5lY3QsIHRoaXMsIHRoaXMucmVzZXRTZXEpXHJcbiAgICAgICAgdGhpcy5zZW5kSW50ZXJ2YWwgPSAwO1xyXG4gICAgICAgIHRoaXMuc3RhcnRIZWFydGJlYXQoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSB0bXBJbnRlcnZhbFxyXG4gICAgcHJpdmF0ZSBvblJlc3VtZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pc0JhY2tncm91bmQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbmRIZWFydEJlYXQoKTtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMudG1wSW50ZXJ2YWwpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblBhdXNlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmlzQmFja2dyb3VuZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/pu5jorqTlgLzkuLoxICAw5Li6YmFja2dyb3VuZFxyXG4gICAgcHJpdmF0ZSByZXNldFNlcSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5oZWFydEJlYXRTZXEgPSAxO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgb25VcGRhdGUoZHQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuc3RhcnQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZighdGhpcy5zZXJ2ZXIuaXNSdW5uaW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYodGhpcy5zZW5kSW50ZXJ2YWwgPiAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zZW5kSW50ZXJ2YWwgLT0gZHQ7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2VuZEludGVydmFsIDw9IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VuZEhlYXJ0QmVhdCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kSW50ZXJ2YWwgPSB0aGlzLmxhc3RIZWFydEJlYXRJbnRlcnZhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==