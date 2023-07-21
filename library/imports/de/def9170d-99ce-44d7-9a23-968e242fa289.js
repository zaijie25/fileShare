"use strict";
cc._RF.push(module, 'def91cNmc5E15ojlo4kL6KJ', 'CheckHelper');
// hall/scripts/logic/core/net/hall/CheckHelper.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CheckHelper = /** @class */ (function () {
    function CheckHelper(type) {
        this.checkNum = 0;
        this.MAXCHECKNUM = 1000000;
        this.timeMap = {};
        this.checkTimeList = [];
        //上次网络开销
        this.lastNetCost = 0;
        //是否开启刷新定时器
        this.runTimer = false;
        //计时
        this.timeCount = 0;
        this.type = type;
    }
    CheckHelper.prototype.clear = function () {
        this.checkTimeList = [];
        this.checkNum = 0;
        this.timeCount = 0;
        this.runTimer = false;
    };
    CheckHelper.prototype.getNetCost = function () {
        return this.lastNetCost;
    };
    //发送心跳时开始计时，每秒更新网络延时。收到心跳后，停止计时器，以回包时间为准。
    CheckHelper.prototype.recordHeartbeat = function (serverUrl) {
        if (serverUrl === void 0) { serverUrl = null; }
        this.timeMap[this.checkNum] = {
            sendTime: Date.now(),
            liveTime: 0,
        };
        this.checkTimeList.push([this.checkNum, Date.now(), serverUrl]);
        this.runTimer = true;
    };
    CheckHelper.prototype.refreshCostTime = function (checkStr) {
        if (checkStr == null || checkStr == "")
            return;
        var strs = checkStr.split("_");
        if (strs.length <= 0 || isNaN(Number(strs[0])))
            return;
        var check = Number(strs[0]);
        this.runTimer = false;
        this.timeCount = 0;
        for (var i = 0; i < this.checkTimeList.length; i++) {
            if (this.checkTimeList[i][0] == check) {
                var time = this.checkTimeList[i][1];
                var serverUrl = this.checkTimeList[i][2];
                var diff = Date.now() - time;
                this.checkTimeList.splice(0, i + 1);
                // this.lastNetCost = diff;
                this.updateCostTime(diff, true, serverUrl);
                return;
            }
        }
    };
    CheckHelper.prototype.updateCostTime = function (time, isHeartbeat, serverUrl) {
        if (isHeartbeat === void 0) { isHeartbeat = false; }
        if (serverUrl === void 0) { serverUrl = null; }
        this.lastNetCost = time;
        if (this.type == 1)
            Global.Event.event(GlobalEvent.RefreshHallNetCost, this.lastNetCost, isHeartbeat, serverUrl);
        else
            Global.Event.event(GlobalEvent.RefreshGameNetCost, this.lastNetCost, isHeartbeat);
    };
    CheckHelper.prototype.getCostTime = function (checkStr) {
        if (checkStr == null || checkStr == "")
            return 0;
        var strs = checkStr.split("_");
        if (strs.length <= 0 || isNaN(Number(strs[0])))
            return 0;
        var check = Number(strs[0]);
        for (var i = 0; i < this.checkTimeList.length; i++) {
            if (this.checkTimeList[i][0] == check) {
                var time = this.checkTimeList[i][1];
                var diff = Date.now() - time;
                this.checkTimeList.splice(0, i + 1);
                return diff;
            }
        }
        return 0;
    };
    CheckHelper.prototype.updateChecker = function () {
        this.checkNum++;
        if (this.checkNum > this.MAXCHECKNUM) {
            this.checkNum = 0;
        }
    };
    CheckHelper.prototype.getChecker = function () {
        return this.checkNum;
    };
    CheckHelper.prototype.getNomalChecker = function () {
        return this.checkNum + "_" + this.getNowTimeStr();
    };
    CheckHelper.prototype.getHeartBeatChecker = function (sn) {
        sn = sn || 0;
        return this.getNomalChecker() + "_" + this.lastNetCost + "_" + sn;
    };
    CheckHelper.prototype.getNowTimeStr = function () {
        var date = new Date();
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
        return M + D + h + m + s;
    };
    CheckHelper.prototype.onUpdate = function (dt) {
        if (!this.runTimer)
            return;
        this.timeCount += dt;
        if (this.timeCount < 1 || this.checkTimeList.length == 0)
            return;
        this.timeCount = 0;
        //取第一个心跳的时间差
        this.updateCostTime(Date.now() - this.checkTimeList[0][1]);
    };
    return CheckHelper;
}());
exports.default = CheckHelper;

cc._RF.pop();