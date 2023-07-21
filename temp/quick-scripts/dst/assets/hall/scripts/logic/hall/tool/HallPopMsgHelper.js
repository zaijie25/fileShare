
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/tool/HallPopMsgHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8ba21ZH64ZDzLpcs7/APVLI', 'HallPopMsgHelper');
// hall/scripts/logic/hall/tool/HallPopMsgHelper.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopWndName = exports.BindAwardUIType = void 0;
var SceneManager_1 = require("../../core/scene/SceneManager");
var BindAwardUIType;
(function (BindAwardUIType) {
    BindAwardUIType[BindAwardUIType["onlyBindPoint"] = 1] = "onlyBindPoint";
    BindAwardUIType[BindAwardUIType["onlyPhonePoint"] = 2] = "onlyPhonePoint";
    BindAwardUIType[BindAwardUIType["bindPoint"] = 3] = "bindPoint";
    BindAwardUIType[BindAwardUIType["phonePoint"] = 4] = "phonePoint";
    BindAwardUIType[BindAwardUIType["share"] = 5] = "share";
    BindAwardUIType[BindAwardUIType["MegePoint"] = 6] = "MegePoint"; //合服奖励弹窗
})(BindAwardUIType = exports.BindAwardUIType || (exports.BindAwardUIType = {}));
var PopWndName;
(function (PopWndName) {
    PopWndName[PopWndName["ForceUpdate"] = 0] = "ForceUpdate";
    PopWndName[PopWndName["Spread"] = 1] = "Spread";
    PopWndName[PopWndName["Mail"] = 2] = "Mail";
    PopWndName[PopWndName["ActivityCenter"] = 3] = "ActivityCenter";
    PopWndName[PopWndName["MegePoint"] = 4] = "MegePoint";
    PopWndName[PopWndName["BindPhone"] = 5] = "BindPhone";
    PopWndName[PopWndName["BindGiftGet"] = 6] = "BindGiftGet";
    PopWndName[PopWndName["PhoneGiftGet"] = 7] = "PhoneGiftGet";
    PopWndName[PopWndName["RebateGet"] = 8] = "RebateGet";
    // 顺序低即优先级高, 上面是插入式弹窗(弹窗里点开的弹窗) 优先级要比下面的高
    PopWndName[PopWndName["Notice"] = 9] = "Notice";
    PopWndName[PopWndName["BindGift"] = 10] = "BindGift";
})(PopWndName = exports.PopWndName || (exports.PopWndName = {}));
var HallPopMsgHelper = /** @class */ (function () {
    function HallPopMsgHelper() {
        this.msgList = [];
        this.lock = false;
        this.lockName = 0;
        this.needPop = true;
        this.timeCounter = 0;
    }
    Object.defineProperty(HallPopMsgHelper, "Instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new HallPopMsgHelper();
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    HallPopMsgHelper.releaseInstance = function () {
        if (this._instance) {
            this._instance.stopTimer();
            this._instance = null;
        }
    };
    HallPopMsgHelper.prototype.startTimer = function () {
        var _this = this;
        this.stopTimer();
        this.timer = setInterval(function () {
            _this.update();
        }, 150);
    };
    HallPopMsgHelper.prototype.stopTimer = function () {
        clearTimeout(this.timer);
    };
    HallPopMsgHelper.prototype.addMsgList = function (name, func, sort) {
        if (sort === void 0) { sort = null; }
        if (func) {
            var priority = sort || name;
            var msg = { name: name, func: func, priority: priority };
            this.msgList.push(msg);
            this.sortMsgList();
            //this.popMsgList();
        }
    };
    HallPopMsgHelper.prototype.sortMsgList = function () {
        this.msgList.sort(function (a, b) {
            return b.priority - a.priority;
        });
    };
    HallPopMsgHelper.prototype.popMsgList = function () {
        if (Global.SceneManager.sceneType !== SceneManager_1.SceneType.Hall) {
            return;
        }
        if (!this.timer) {
            this.startTimer();
        }
        if (this.msgList.length > 0 && !this.lock && !this.lockName) {
            var msg = this.msgList[this.msgList.length - 1]; // 消息存在时序问题，可能hallUI还没open, 不能pop掉
            msg.func.call();
        }
    };
    HallPopMsgHelper.prototype.addLock = function (name) {
        this.lockName = name;
        this.lock = true;
    };
    HallPopMsgHelper.prototype.releaseLock = function (name, isForce) {
        var _this = this;
        if (isForce === void 0) { isForce = false; }
        if (this.lockName == name || isForce) {
            this.msgList = this.msgList.filter(function (item) {
                return item.name != _this.lockName;
            });
            this.lock = false;
            this.lockName = 0;
            this.needPop = true;
            // this.popMsgList();
        }
    };
    HallPopMsgHelper.prototype.update = function () {
        if (!this.needPop || this.msgList.length == 0)
            return;
        this.timeCounter++;
        if (this.timeCounter >= 2) {
            this.needPop = false;
            this.timeCounter = 0;
            this.popMsgList();
        }
    };
    HallPopMsgHelper._instance = null;
    return HallPopMsgHelper;
}());
exports.default = HallPopMsgHelper;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHRvb2xcXEhhbGxQb3BNc2dIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOERBQTBEO0FBRTFELElBQVksZUFRWDtBQVJELFdBQVksZUFBZTtJQUN2Qix1RUFBaUIsQ0FBQTtJQUNqQix5RUFBa0IsQ0FBQTtJQUNsQiwrREFBYSxDQUFBO0lBQ2IsaUVBQWMsQ0FBQTtJQUNkLHVEQUFTLENBQUE7SUFDVCwrREFBUyxDQUFBLENBQVcsUUFBUTtBQUVoQyxDQUFDLEVBUlcsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUFRMUI7QUFFRCxJQUFZLFVBZVg7QUFmRCxXQUFZLFVBQVU7SUFDbEIseURBQWUsQ0FBQTtJQUNmLCtDQUFVLENBQUE7SUFDViwyQ0FBUSxDQUFBO0lBQ1IsK0RBQWtCLENBQUE7SUFDbEIscURBQVMsQ0FBQTtJQUNULHFEQUFTLENBQUE7SUFDVCx5REFBVyxDQUFBO0lBQ1gsMkRBQVksQ0FBQTtJQUNaLHFEQUFTLENBQUE7SUFDVCx5Q0FBeUM7SUFDekMsK0NBQU0sQ0FBQTtJQUNOLG9EQUFRLENBQUE7QUFHWixDQUFDLEVBZlcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFlckI7QUFFRDtJQUFBO1FBRVksWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFNBQUksR0FBRyxLQUFLLENBQUM7UUFDYixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBR3JCLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixnQkFBVyxHQUFHLENBQUMsQ0FBQztJQTJGNUIsQ0FBQztJQXpGRyxzQkFBa0IsNEJBQVE7YUFBMUI7WUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO2dCQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQzthQUUzQztZQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FB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Q0FBTSxHQUFiO1FBRUksSUFBRyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQztZQUN4QyxPQUFPO1FBQ1gsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLEVBQ3hCO1lBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO0lBRUwsQ0FBQztJQWpHYywwQkFBUyxHQUFxQixJQUFJLENBQUM7SUFrR3RELHVCQUFDO0NBbkdELEFBbUdDLElBQUE7a0JBbkdvQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTY2VuZVR5cGUgfSBmcm9tIFwiLi4vLi4vY29yZS9zY2VuZS9TY2VuZU1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBlbnVtIEJpbmRBd2FyZFVJVHlwZXsgLy/lvLnlh7pBd2FyZFVJ5pa55byPXHJcbiAgICBvbmx5QmluZFBvaW50ID0gMSwgIC8v57uR5a6a5omL5py65ZCO5Y+q5pyJYmluZF9wb2ludFxyXG4gICAgb25seVBob25lUG9pbnQgPSAyLCAvL+e7keWumuaJi+acuuWQjuWPquaciXBob25lX3BvaW50XHJcbiAgICBiaW5kUG9pbnQgPSAzLCAgICAgIC8v57uR5a6a5omL5py65ZCO5pyJYmluZF9wb2ludCxwaG9uZV9wb2ludCzkvYbmmK/lhYjlvLliaW5kX3BvaW50XHJcbiAgICBwaG9uZVBvaW50ID0gNCwgICAgIC8v57uR5a6a5omL5py65ZCO5pyJYmluZF9wb2ludCxwaG9uZV9wb2ludCzlvLlwaG9uZV9wb2ludFxyXG4gICAgc2hhcmUgPSA1LCAgICAgICAgICAvL+WIhuS6q1xyXG4gICAgTWVnZVBvaW50ICAgICAgICAgICAvL+WQiOacjeWlluWKseW8ueeql1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGVudW0gUG9wV25kTmFtZXtcclxuICAgIEZvcmNlVXBkYXRlID0gMCxcclxuICAgIFNwcmVhZCA9IDEsXHJcbiAgICBNYWlsID0gMixcclxuICAgIEFjdGl2aXR5Q2VudGVyID0gMyxcclxuICAgIE1lZ2VQb2ludCwgLy/lkIjmnI3lpZblirHlvLnnqpdcclxuICAgIEJpbmRQaG9uZSAsXHJcbiAgICBCaW5kR2lmdEdldCwgICAgLy/nu5HlrprmiYvmnLrlkI5iaW5kX3BvaW50XHJcbiAgICBQaG9uZUdpZnRHZXQsICAgLy/nu5HlrprmiYvmnLrlkI5waG9uZV9wb2ludFxyXG4gICAgUmViYXRlR2V0LFxyXG4gICAgLy8g6aG65bqP5L2O5Y2z5LyY5YWI57qn6auYLCDkuIrpnaLmmK/mj5LlhaXlvI/lvLnnqpco5by556qX6YeM54K55byA55qE5by556qXKSDkvJjlhYjnuqfopoHmr5TkuIvpnaLnmoTpq5hcclxuICAgIE5vdGljZSwgICAgIFxyXG4gICAgQmluZEdpZnRcclxuICAgXHJcbiAgICBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFsbFBvcE1zZ0hlbHBlcntcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogSGFsbFBvcE1zZ0hlbHBlciA9IG51bGw7XHJcbiAgICBwcml2YXRlIG1zZ0xpc3QgPSBbXTtcclxuICAgIHByaXZhdGUgbG9jayA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBsb2NrTmFtZTogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgdGltZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBuZWVkUG9wID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgdGltZUNvdW50ZXIgPSAwO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJbnN0YW5jZSgpOiBIYWxsUG9wTXNnSGVscGVyIHtcclxuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBIYWxsUG9wTXNnSGVscGVyKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVsZWFzZUluc3RhbmNlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5zdG9wVGltZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXJ0VGltZXIoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XHJcbiAgICAgICAgdGhpcy50aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB9LCAxNTApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RvcFRpbWVyKClcclxuICAgIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZE1zZ0xpc3QobmFtZTogbnVtYmVyLCBmdW5jOiBGdW5jdGlvbixzb3J0ID0gbnVsbCl7XHJcbiAgICAgICAgaWYgKGZ1bmMpe1xyXG4gICAgICAgICAgICBsZXQgcHJpb3JpdHkgPSBzb3J0IHx8IG5hbWU7XHJcbiAgICAgICAgICAgIGxldCBtc2cgPSB7bmFtZSwgZnVuYywgcHJpb3JpdHl9O1xyXG4gICAgICAgICAgICB0aGlzLm1zZ0xpc3QucHVzaChtc2cpO1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRNc2dMaXN0KCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5wb3BNc2dMaXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc29ydE1zZ0xpc3QoKXtcclxuICAgICAgICB0aGlzLm1zZ0xpc3Quc29ydCgoYSwgYik9PntcclxuICAgICAgICAgICAgcmV0dXJuIGIucHJpb3JpdHkgLSBhLnByaW9yaXR5O1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBvcE1zZ0xpc3QoKXtcclxuICAgICAgICBpZiAoR2xvYmFsLlNjZW5lTWFuYWdlci5zY2VuZVR5cGUgIT09IFNjZW5lVHlwZS5IYWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgaWYoIXRoaXMudGltZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0VGltZXIoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLm1zZ0xpc3QubGVuZ3RoID4gMCAmJiAhdGhpcy5sb2NrICYmICF0aGlzLmxvY2tOYW1lKXtcclxuICAgICAgICAgICAgbGV0IG1zZyA9IHRoaXMubXNnTGlzdFt0aGlzLm1zZ0xpc3QubGVuZ3RoIC0gMV07ICAgIC8vIOa2iOaBr+WtmOWcqOaXtuW6j+mXrumimO+8jOWPr+iDvWhhbGxVSei/mOayoW9wZW4sIOS4jeiDvXBvcOaOiVxyXG4gICAgICAgICAgICBtc2cuZnVuYy5jYWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRMb2NrKG5hbWU6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5sb2NrTmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5sb2NrID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVsZWFzZUxvY2sobmFtZTogbnVtYmVyLCBpc0ZvcmNlOiBib29sZWFuID0gZmFsc2Upe1xyXG4gICAgICAgIGlmICh0aGlzLmxvY2tOYW1lID09IG5hbWUgfHwgaXNGb3JjZSl7XHJcbiAgICAgICAgICAgIHRoaXMubXNnTGlzdCA9IHRoaXMubXNnTGlzdC5maWx0ZXIoKGl0ZW0pPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5uYW1lICE9IHRoaXMubG9ja05hbWU7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMubG9jayA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxvY2tOYW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5uZWVkUG9wID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gdGhpcy5wb3BNc2dMaXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLm5lZWRQb3AgfHwgdGhpcy5tc2dMaXN0Lmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy50aW1lQ291bnRlcisrO1xyXG4gICAgICAgIGlmKHRoaXMudGltZUNvdW50ZXIgPj0gMilcclxuICAgICAgICB7ICAgXHJcbiAgICAgICAgICAgIHRoaXMubmVlZFBvcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVDb3VudGVyID0gMDtcclxuICAgICAgICAgICAgdGhpcy5wb3BNc2dMaXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59Il19