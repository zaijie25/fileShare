"use strict";
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