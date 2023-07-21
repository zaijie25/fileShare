"use strict";
cc._RF.push(module, '4daa9buNeVF+7qA/3ObyDD2', 'ComponentProvider');
// hall/scripts/logic/core/component/ComponentProvider.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameTimeChecker_1 = require("../game/GameTimeChecker");
//驱动脚本管理器  提供timer  tween等操作
var ComponentProvider = /** @class */ (function () {
    function ComponentProvider(name) {
        this.hasInit = false;
        //下一帧执行回调
        this.callLaterList = [];
        //帧结束
        this.frameEndList = [];
        this.name = name;
        cc.director.on(cc.Director.EVENT_AFTER_UPDATE, this.onFrameEnd, this);
    }
    ComponentProvider.prototype.setup = function (updateFunc, lateUpdateFunc) {
        this.updateFunc = updateFunc;
        this.lateUpdateFunc = lateUpdateFunc;
    };
    ComponentProvider.prototype.initDriver = function () {
        this.clear();
        var canvas = cc.find("Canvas");
        if (canvas == null) {
            Logger.error("找不到Canvas");
            return;
        }
        this.driverNode = canvas.getChildByName(this.name);
        if (this.driverNode == null) {
            this.driverNode = new cc.Node(this.name);
            canvas.addChild(this.driverNode);
        }
        this.driverComponent = this.driverNode.getComponent("DriverComponent");
        if (this.driverComponent == null)
            this.driverComponent = this.driverNode.addComponent("DriverComponent");
        this.driverComponent.onLoadFunc = this.onLoad.bind(this);
        this.driverComponent.updateFunc = this.onUpdate.bind(this);
        this.driverComponent.lateUpdateFunc = this.onLateUpdate.bind(this);
        this.hasInit = true;
        this.timeChecker = Global.UIHelper.safeGetComponent(this.driverNode, "", GameTimeChecker_1.default);
    };
    ComponentProvider.prototype.clear = function () {
        this.driverComponent = null;
        this.driverNode = null;
        this.hasInit = null;
        this.stopChecker();
        this.timeChecker = null;
    };
    ComponentProvider.prototype.onLoad = function () {
    };
    ComponentProvider.prototype.onFrameEnd = function () {
        for (var i = 0; i < this.frameEndList.length; i++) {
            this.frameEndList[i]();
        }
        this.frameEndList = [];
    };
    ComponentProvider.prototype.onUpdate = function (dt) {
        if (this.updateFunc)
            this.updateFunc(dt);
    };
    ComponentProvider.prototype.onLateUpdate = function () {
        if (this.lateUpdateFunc)
            this.lateUpdateFunc();
        for (var i = 0; i < this.callLaterList.length; i++) {
            this.callLaterList[i]();
        }
        this.callLaterList.length = 0;
    };
    //存在问题  this指向的是component  需要bind
    ComponentProvider.prototype.schedule = function (callback, interval, repeat, delay) {
        if (!this.hasInit || this.driverComponent == null) {
            Logger.error("Driver 还未初始化");
            return;
        }
        this.driverComponent.schedule(callback, interval, repeat, delay);
    };
    ComponentProvider.prototype.scheduleOnce = function (callback, delay) {
        if (!this.hasInit || this.driverComponent == null) {
            Logger.error("Driver 还未初始化");
            return;
        }
        this.driverComponent.scheduleOnce(callback, delay);
    };
    ComponentProvider.prototype.unschedule = function (callback) {
        if (!this.hasInit || this.driverComponent == null) {
            return;
        }
        this.driverComponent.unschedule(callback);
    };
    ComponentProvider.prototype.unscheduleAllCallbacks = function () {
        if (!this.hasInit || this.driverComponent == null) {
            return;
        }
        this.driverComponent.unscheduleAllCallbacks();
        this.callLaterList.length = 0;
        this.frameEndList.length = 0;
    };
    ComponentProvider.prototype.callLater = function (func) {
        this.callLaterList.push(func);
    };
    ComponentProvider.prototype.frameEnd = function (func) {
        this.frameEndList.push(func);
    };
    ComponentProvider.prototype.doChecker = function (time) {
        if (!this.timeChecker) {
            return;
        }
        this.timeChecker.checkTimestamp(time);
    };
    ComponentProvider.prototype.stopChecker = function () {
        if (!this.timeChecker) {
            return;
        }
        this.timeChecker.stopTimer();
    };
    /** 得到协议当前时间传输时延 单位ms */
    ComponentProvider.prototype.correctTime = function (time) {
        if (!this.timeChecker) {
            return 0;
        }
        return this.timeChecker.correctTime(time);
    };
    return ComponentProvider;
}());
exports.default = ComponentProvider;

cc._RF.pop();