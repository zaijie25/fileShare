
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/net/hall/CheckHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXG5ldFxcaGFsbFxcQ2hlY2tIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtJQXFCSSxxQkFBWSxJQUFJO1FBbkJSLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixnQkFBVyxHQUFHLE9BQU8sQ0FBQztRQUV0QixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWIsa0JBQWEsR0FBRyxFQUFFLENBQUE7UUFFMUIsUUFBUTtRQUNBLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBRXhCLFdBQVc7UUFDSCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRXpCLElBQUk7UUFDSSxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBT2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFTSwyQkFBSyxHQUFaO1FBRUksSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVNLGdDQUFVLEdBQWpCO1FBRUksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7SUFFRCx5Q0FBeUM7SUFDbEMscUNBQWUsR0FBdEIsVUFBdUIsU0FBMkI7UUFBM0IsMEJBQUEsRUFBQSxnQkFBMkI7UUFFOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUc7WUFDMUIsUUFBUSxFQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDbkIsUUFBUSxFQUFDLENBQUM7U0FDYixDQUFBO1FBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxHQUFHLEVB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LElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQS9KQSxBQStKQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VydmVyUm91dGVJbmZvLCBTZXJ2ZXJVcmwgfSBmcm9tIFwiLi4vLi4vc2V0dGluZy9TZXJ2ZXJSb3V0ZXNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoZWNrSGVscGVyIFxyXG57XHJcbiAgICBwcml2YXRlIGNoZWNrTnVtID0gMDtcclxuICAgIHByaXZhdGUgTUFYQ0hFQ0tOVU0gPSAxMDAwMDAwO1xyXG5cclxuICAgIHByaXZhdGUgdGltZU1hcCA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgY2hlY2tUaW1lTGlzdCA9IFtdXHJcblxyXG4gICAgLy/kuIrmrKHnvZHnu5zlvIDplIBcclxuICAgIHByaXZhdGUgbGFzdE5ldENvc3QgPSAwO1xyXG5cclxuICAgIC8v5piv5ZCm5byA5ZCv5Yi35paw5a6a5pe25ZmoXHJcbiAgICBwcml2YXRlIHJ1blRpbWVyID0gZmFsc2U7XHJcbiAgICBcclxuICAgIC8v6K6h5pe2XHJcbiAgICBwcml2YXRlIHRpbWVDb3VudCA9IDA7XHJcblxyXG4gICAgLy/nsbvlnosgIDEg5aSn5Y6FIDIg5a2Q5ri45oiPXHJcbiAgICBwcml2YXRlIHR5cGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IodHlwZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jaGVja1RpbWVMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5jaGVja051bSA9IDA7XHJcbiAgICAgICAgdGhpcy50aW1lQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMucnVuVGltZXIgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TmV0Q29zdCgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGFzdE5ldENvc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lj5HpgIHlv4Pot7Pml7blvIDlp4vorqHml7bvvIzmr4/np5Lmm7TmlrDnvZHnu5zlu7bml7bjgILmlLbliLDlv4Pot7PlkI7vvIzlgZzmraLorqHml7blmajvvIzku6Xlm57ljIXml7bpl7TkuLrlh4bjgIJcclxuICAgIHB1YmxpYyByZWNvcmRIZWFydGJlYXQoc2VydmVyVXJsIDpTZXJ2ZXJVcmwgPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudGltZU1hcFt0aGlzLmNoZWNrTnVtXSA9IHtcclxuICAgICAgICAgICAgc2VuZFRpbWU6RGF0ZS5ub3coKSwgXHJcbiAgICAgICAgICAgIGxpdmVUaW1lOjAsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNoZWNrVGltZUxpc3QucHVzaChbdGhpcy5jaGVja051bSwgRGF0ZS5ub3coKSwgc2VydmVyVXJsXSlcclxuICAgICAgICB0aGlzLnJ1blRpbWVyID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHJlZnJlc2hDb3N0VGltZShjaGVja1N0cilcclxuICAgIHtcclxuICAgICAgICBpZihjaGVja1N0ciA9PSBudWxsIHx8IGNoZWNrU3RyID09IFwiXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgc3RycyA9IGNoZWNrU3RyLnNwbGl0KFwiX1wiKTtcclxuICAgICAgICBpZihzdHJzLmxlbmd0aCA8PSAwIHx8IGlzTmFOKE51bWJlcihzdHJzWzBdKSkpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgY2hlY2sgPSBOdW1iZXIoc3Ryc1swXSk7XHJcbiAgICAgICAgdGhpcy5ydW5UaW1lciA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudGltZUNvdW50ID0gMDtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGVja1RpbWVMaXN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5jaGVja1RpbWVMaXN0W2ldWzBdID09IGNoZWNrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGltZSA9IHRoaXMuY2hlY2tUaW1lTGlzdFtpXVsxXTtcclxuICAgICAgICAgICAgICAgIGxldCBzZXJ2ZXJVcmwgPSB0aGlzLmNoZWNrVGltZUxpc3RbaV1bMl1cclxuICAgICAgICAgICAgICAgIGxldCBkaWZmID0gRGF0ZS5ub3coKSAtIHRpbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVGltZUxpc3Quc3BsaWNlKDAsIGkgKyAxKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMubGFzdE5ldENvc3QgPSBkaWZmO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDb3N0VGltZShkaWZmLCB0cnVlLCBzZXJ2ZXJVcmwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUNvc3RUaW1lKHRpbWUsIGlzSGVhcnRiZWF0ID0gZmFsc2UsIHNlcnZlclVybDpTZXJ2ZXJVcmwgPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubGFzdE5ldENvc3QgPSB0aW1lO1xyXG4gICAgICAgIGlmKHRoaXMudHlwZSA9PSAxKVxyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuUmVmcmVzaEhhbGxOZXRDb3N0LCB0aGlzLmxhc3ROZXRDb3N0LCBpc0hlYXJ0YmVhdCwgc2VydmVyVXJsKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlJlZnJlc2hHYW1lTmV0Q29zdCwgdGhpcy5sYXN0TmV0Q29zdCwgaXNIZWFydGJlYXQpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXRDb3N0VGltZShjaGVja1N0cjpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoY2hlY2tTdHIgPT0gbnVsbCB8fCBjaGVja1N0ciA9PSBcIlwiKVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICBsZXQgc3RycyA9IGNoZWNrU3RyLnNwbGl0KFwiX1wiKTtcclxuICAgICAgICBpZihzdHJzLmxlbmd0aCA8PSAwIHx8IGlzTmFOKE51bWJlcihzdHJzWzBdKSkpXHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIGxldCBjaGVjayA9IE51bWJlcihzdHJzWzBdKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGVja1RpbWVMaXN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5jaGVja1RpbWVMaXN0W2ldWzBdID09IGNoZWNrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGltZSA9IHRoaXMuY2hlY2tUaW1lTGlzdFtpXVsxXTtcclxuICAgICAgICAgICAgICAgIGxldCBkaWZmID0gRGF0ZS5ub3coKSAtIHRpbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVGltZUxpc3Quc3BsaWNlKDAsIGkgKyAxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkaWZmO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfSBcclxuXHJcblxyXG4gICAgcHVibGljIHVwZGF0ZUNoZWNrZXIoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2hlY2tOdW0rKztcclxuICAgICAgICBpZih0aGlzLmNoZWNrTnVtID4gdGhpcy5NQVhDSEVDS05VTSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tOdW0gPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldENoZWNrZXIoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrTnVtO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXROb21hbENoZWNrZXIoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrTnVtICsgXCJfXCIgKyB0aGlzLmdldE5vd1RpbWVTdHIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SGVhcnRCZWF0Q2hlY2tlcihzbj8pXHJcbiAgICB7XHJcbiAgICAgICAgc24gPSBzbiB8fCAwXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Tm9tYWxDaGVja2VyKCkgKyBcIl9cIiArIHRoaXMubGFzdE5ldENvc3QgKyBcIl9cIiArIHNuO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Tm93VGltZVN0cigpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGxldCBNID0gKGRhdGUuZ2V0TW9udGgoKSsxIDwgMTAgPyAnMCcrKGRhdGUuZ2V0TW9udGgoKSsxKSA6IGRhdGUuZ2V0TW9udGgoKSsxKSArICctJztcclxuICAgICAgICBsZXQgRCA9IGRhdGUuZ2V0RGF0ZSgpICsgJyAnO1xyXG4gICAgICAgIGxldCBoID0gZGF0ZS5nZXRIb3VycygpICsgJzonO1xyXG4gICAgICAgIGxldCBtID0gKGRhdGUuZ2V0TWludXRlcygpIDwgMTA/IFwiMFwiICsgZGF0ZS5nZXRNaW51dGVzKCkgOiBkYXRlLmdldE1pbnV0ZXMoKSkgKyAgJzonO1xyXG4gICAgICAgIGxldCBzID0gKGRhdGUuZ2V0U2Vjb25kcygpIDwgMTA/IFwiMFwiICsgZGF0ZS5nZXRTZWNvbmRzKCkgOiBkYXRlLmdldFNlY29uZHMoKSk7XHJcbiAgICAgICAgcmV0dXJuIE0gKyBEICsgaCArIG0gKyBzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgb25VcGRhdGUoZHQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMucnVuVGltZXIgKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy50aW1lQ291bnQgKz0gZHQ7XHJcbiAgICAgICAgaWYodGhpcy50aW1lQ291bnQgPCAxIHx8IHRoaXMuY2hlY2tUaW1lTGlzdC5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMudGltZUNvdW50ID0gMDtcclxuICAgICAgICAvL+WPluesrOS4gOS4quW/g+i3s+eahOaXtumXtOW3rlxyXG4gICAgICAgIHRoaXMudXBkYXRlQ29zdFRpbWUoIERhdGUubm93KCkgLSB0aGlzLmNoZWNrVGltZUxpc3RbMF1bMV0pO1xyXG4gICAgfVxyXG59Il19