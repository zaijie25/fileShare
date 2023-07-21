
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/game/GameTimeChecker.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8f0d9mZi61FuJC8PWV/vF51', 'GameTimeChecker');
// hall/scripts/logic/core/game/GameTimeChecker.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameTimeChecker = /** @class */ (function (_super) {
    __extends(GameTimeChecker, _super);
    function GameTimeChecker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.curTimestamp = 0;
        _this.isTimerRunning = false;
        _this.timeError = 1; // 时间误差 秒级 误差以内直接更新本地时间戳
        return _this;
    }
    GameTimeChecker.prototype.onLoad = function () {
        cc.game.on(cc.game.EVENT_SHOW, this.onResume, this);
        cc.game.on(cc.game.EVENT_HIDE, this.onPause, this);
    };
    GameTimeChecker.prototype.onDestroy = function () {
        cc.game.off(cc.game.EVENT_SHOW, this.onResume, this);
        cc.game.off(cc.game.EVENT_HIDE, this.onPause, this);
        this.stopTimer();
    };
    /** 游戏协议的时间戳输入用于计算时延 返回ms */
    GameTimeChecker.prototype.correctTime = function (time) {
        // Logger.warn("correctTime--------------", time, this.curTimestamp, this.curTimestamp - time);
        if (!this.isTimerRunning || this.curTimestamp == 0)
            return 0;
        var dev = this.curTimestamp - this.formatTimestamp(time);
        return dev > 0 ? dev : 0; // 非丢包延时情况，卡在定时器间隔可能会导致负数，取0;
    };
    /** 心跳的时间戳用于校准本地时间 */
    GameTimeChecker.prototype.checkTimestamp = function (time) {
        if (!this.isTimerRunning || this.curTimestamp == 0) {
            return this.startTimer(time);
        }
        // Logger.warn("checkTimestamp--------------", this.curTimestamp, time, this.curTimestamp-time);
        // cpu误差会导致负值，卡在定时器刷新临界点
        if (this.curTimestamp - time < this.timeError * 1000) {
            this.curTimestamp = this.formatTimestamp(time);
        }
    };
    GameTimeChecker.prototype.startTimer = function (time) {
        if (time < 0)
            return;
        this.curTimestamp = this.formatTimestamp(time);
        this.schedule(this.timeRun, 0.1); // 取0.1s刷新一次时间，避免刷新间隔大产生太大误差
        this.isTimerRunning = true;
    };
    GameTimeChecker.prototype.timeRun = function (dt) {
        if (!this.isTimerRunning || this.curTimestamp == 0)
            return;
        this.curTimestamp += dt * 1000;
        // Logger.warn("timeRun", dt, this.curTimestamp);
    };
    GameTimeChecker.prototype.stopTimer = function () {
        this.unschedule(this.timeRun);
        this.curTimestamp = 0;
        this.isTimerRunning = false;
    };
    GameTimeChecker.prototype.onPause = function () {
        if (!this.isTimerRunning)
            return;
        this.lastPauseTime = Date.now();
        this.inBackground = true;
    };
    GameTimeChecker.prototype.onResume = function () {
        if (!this.isTimerRunning)
            return;
        if (!this.inBackground) {
            //需要清理上次pause时间，android拉出菜单栏会只出发onresume 有概率不出发onpause (vivo-v1809)
            this.lastPauseTime = 0;
        }
        this.inBackground = false;
        this.showTime = Date.now();
        if (this.lastPauseTime > 0) {
            var backgroundTime = this.showTime - this.lastPauseTime;
            this.curTimestamp += backgroundTime;
            // Logger.warn("onResume", backgroundTime, this.curTimestamp);
        }
    };
    /** 将时间戳统一转成13位计算 */
    GameTimeChecker.prototype.formatTimestamp = function (time) {
        if (time.toString().length == 10) {
            return time * 1000;
        }
        return time;
    };
    GameTimeChecker = __decorate([
        ccclass
    ], GameTimeChecker);
    return GameTimeChecker;
}(cc.Component));
exports.default = GameTimeChecker;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGdhbWVcXEdhbWVUaW1lQ2hlY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE2QyxtQ0FBWTtJQUF6RDtRQUFBLHFFQThGQztRQTdGVyxrQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixvQkFBYyxHQUFHLEtBQUssQ0FBQztRQUl2QixlQUFTLEdBQUcsQ0FBQyxDQUFDLENBQU0sd0JBQXdCOztJQXdGeEQsQ0FBQztJQXRGYSxnQ0FBTSxHQUFoQjtRQUNJLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEQsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRVMsbUNBQVMsR0FBbkI7UUFDSSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JELEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCw0QkFBNEI7SUFDckIscUNBQVcsR0FBbEIsVUFBbUIsSUFBWTtRQUMzQiwrRkFBK0Y7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T0FBTyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQTdGZ0IsZUFBZTtRQURuQyxPQUFPO09BQ2EsZUFBZSxDQThGbkM7SUFBRCxzQkFBQztDQTlGRCxBQThGQyxDQTlGNEMsRUFBRSxDQUFDLFNBQVMsR0E4RnhEO2tCQTlGb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVRpbWVDaGVja2VyIGV4dGVuZHMgY2MuQ29tcG9uZW50e1xyXG4gICAgcHJpdmF0ZSBjdXJUaW1lc3RhbXAgPSAwO1xyXG4gICAgcHJpdmF0ZSBpc1RpbWVyUnVubmluZyA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBsYXN0UGF1c2VUaW1lOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGluQmFja2dyb3VuZDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgc2hvd1RpbWU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgdGltZUVycm9yID0gMTsgICAgICAvLyDml7bpl7Tor6/lt64g56eS57qnIOivr+W3ruS7peWGheebtOaOpeabtOaWsOacrOWcsOaXtumXtOaIs1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKXtcclxuICAgICAgICBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfU0hPVywgdGhpcy5vblJlc3VtZSwgdGhpcyk7XHJcbiAgICAgICAgY2MuZ2FtZS5vbihjYy5nYW1lLkVWRU5UX0hJREUsIHRoaXMub25QYXVzZSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpe1xyXG4gICAgICAgIGNjLmdhbWUub2ZmKGNjLmdhbWUuRVZFTlRfU0hPVywgdGhpcy5vblJlc3VtZSwgdGhpcyk7XHJcbiAgICAgICAgY2MuZ2FtZS5vZmYoY2MuZ2FtZS5FVkVOVF9ISURFLCB0aGlzLm9uUGF1c2UsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOa4uOaIj+WNj+iurueahOaXtumXtOaIs+i+k+WFpeeUqOS6juiuoeeul+aXtuW7tiDov5Tlm55tcyAqL1xyXG4gICAgcHVibGljIGNvcnJlY3RUaW1lKHRpbWU6IG51bWJlcil7XHJcbiAgICAgICAgLy8gTG9nZ2VyLndhcm4oXCJjb3JyZWN0VGltZS0tLS0tLS0tLS0tLS0tXCIsIHRpbWUsIHRoaXMuY3VyVGltZXN0YW1wLCB0aGlzLmN1clRpbWVzdGFtcCAtIHRpbWUpO1xyXG4gICAgICAgIGlmICghdGhpcy5pc1RpbWVyUnVubmluZyB8fCB0aGlzLmN1clRpbWVzdGFtcCA9PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICBsZXQgZGV2ID0gIHRoaXMuY3VyVGltZXN0YW1wIC0gdGhpcy5mb3JtYXRUaW1lc3RhbXAodGltZSk7XHJcbiAgICAgICAgcmV0dXJuIGRldiA+IDAgPyBkZXYgOiAwOyAgICAgICAvLyDpnZ7kuKLljIXlu7bml7bmg4XlhrXvvIzljaHlnKjlrprml7blmajpl7TpmpTlj6/og73kvJrlr7zoh7TotJ/mlbDvvIzlj5YwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlv4Pot7PnmoTml7bpl7TmiLPnlKjkuo7moKHlh4bmnKzlnLDml7bpl7QgKi9cclxuICAgIHB1YmxpYyBjaGVja1RpbWVzdGFtcCh0aW1lOiBudW1iZXIpe1xyXG4gICAgICAgIGlmICghdGhpcy5pc1RpbWVyUnVubmluZyB8fCB0aGlzLmN1clRpbWVzdGFtcCA9PSAwKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRUaW1lcih0aW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gTG9nZ2VyLndhcm4oXCJjaGVja1RpbWVzdGFtcC0tLS0tLS0tLS0tLS0tXCIsIHRoaXMuY3VyVGltZXN0YW1wLCB0aW1lLCB0aGlzLmN1clRpbWVzdGFtcC10aW1lKTtcclxuICAgICAgICAvLyBjcHXor6/lt67kvJrlr7zoh7TotJ/lgLzvvIzljaHlnKjlrprml7blmajliLfmlrDkuLTnlYzngrlcclxuICAgICAgICBpZiAodGhpcy5jdXJUaW1lc3RhbXAgLSB0aW1lIDwgdGhpcy50aW1lRXJyb3IgKiAxMDAwKXsgXHJcbiAgICAgICAgICAgIHRoaXMuY3VyVGltZXN0YW1wID0gdGhpcy5mb3JtYXRUaW1lc3RhbXAodGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhcnRUaW1lcih0aW1lOiBudW1iZXIpe1xyXG4gICAgICAgIGlmICh0aW1lIDwgMClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY3VyVGltZXN0YW1wID0gdGhpcy5mb3JtYXRUaW1lc3RhbXAodGltZSk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnRpbWVSdW4sIDAuMSk7ICAgICAgIC8vIOWPljAuMXPliLfmlrDkuIDmrKHml7bpl7TvvIzpgb/lhY3liLfmlrDpl7TpmpTlpKfkuqfnlJ/lpKrlpKfor6/lt65cclxuICAgICAgICB0aGlzLmlzVGltZXJSdW5uaW5nID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRpbWVSdW4oZHQpe1xyXG4gICAgICAgIGlmICghdGhpcy5pc1RpbWVyUnVubmluZyB8fCB0aGlzLmN1clRpbWVzdGFtcCA9PSAwKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jdXJUaW1lc3RhbXAgKz0gZHQgKiAxMDAwO1xyXG4gICAgICAgIC8vIExvZ2dlci53YXJuKFwidGltZVJ1blwiLCBkdCwgdGhpcy5jdXJUaW1lc3RhbXApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wVGltZXIoKXtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy50aW1lUnVuKTtcclxuICAgICAgICB0aGlzLmN1clRpbWVzdGFtcCA9IDA7XHJcbiAgICAgICAgdGhpcy5pc1RpbWVyUnVubmluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25QYXVzZSgpe1xyXG4gICAgICAgIGlmICghdGhpcy5pc1RpbWVyUnVubmluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubGFzdFBhdXNlVGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdGhpcy5pbkJhY2tncm91bmQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25SZXN1bWUoKXtcclxuICAgICAgICBpZiAoIXRoaXMuaXNUaW1lclJ1bm5pbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICBpZighdGhpcy5pbkJhY2tncm91bmQpe1xyXG4gICAgICAgICAgICAvL+mcgOimgea4heeQhuS4iuasoXBhdXNl5pe26Ze077yMYW5kcm9pZOaLieWHuuiPnOWNleagj+S8muWPquWHuuWPkW9ucmVzdW1lIOacieamgueOh+S4jeWHuuWPkW9ucGF1c2UgKHZpdm8tdjE4MDkpXHJcbiAgICAgICAgICAgIHRoaXMubGFzdFBhdXNlVGltZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5CYWNrZ3JvdW5kID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuc2hvd1RpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIGlmICh0aGlzLmxhc3RQYXVzZVRpbWUgPiAwKXtcclxuICAgICAgICAgICAgbGV0IGJhY2tncm91bmRUaW1lID0gdGhpcy5zaG93VGltZSAtIHRoaXMubGFzdFBhdXNlVGltZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJUaW1lc3RhbXAgKz0gYmFja2dyb3VuZFRpbWU7XHJcbiAgICAgICAgICAgIC8vIExvZ2dlci53YXJuKFwib25SZXN1bWVcIiwgYmFja2dyb3VuZFRpbWUsIHRoaXMuY3VyVGltZXN0YW1wKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOWwhuaXtumXtOaIs+e7n+S4gOi9rOaIkDEz5L2N6K6h566XICovXHJcbiAgICBwcml2YXRlIGZvcm1hdFRpbWVzdGFtcCh0aW1lOiBudW1iZXIpe1xyXG4gICAgICAgIGlmICh0aW1lLnRvU3RyaW5nKCkubGVuZ3RoID09IDEwKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRpbWUgKiAxMDAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGltZTtcclxuICAgIH1cclxufSJdfQ==