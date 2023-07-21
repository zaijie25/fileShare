"use strict";
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