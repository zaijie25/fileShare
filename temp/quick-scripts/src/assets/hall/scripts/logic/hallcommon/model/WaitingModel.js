"use strict";
cc._RF.push(module, 'fcaaaeZ6xhKrpFxag7I37K4', 'WaitingModel');
// hall/scripts/logic/hallcommon/model/WaitingModel.ts

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
var ModelBase_1 = require("../../../framework/model/ModelBase");
var GlobalEvent_1 = require("../../core/GlobalEvent");
//控制网络loading界面显示和重连界面显示
var WaitingModel = /** @class */ (function (_super) {
    __extends(WaitingModel, _super);
    function WaitingModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //waiting自动关闭时间
        _this.EVENT_UPDATE_WAITING_TIME = "EVENT_UPDATE_WAITING_TIME";
        _this.DEFAULT_WAITING_TIME = 15;
        _this.waitingList = [];
        return _this;
    }
    Object.defineProperty(WaitingModel.prototype, "Name", {
        get: function () {
            return "WaitingModel";
        },
        enumerable: false,
        configurable: true
    });
    WaitingModel.prototype.onInit = function () {
        Global.Event.on(GlobalEvent_1.default.SHOW_NET_WAITING, this, this.onShowWaiting);
        Global.Event.on(GlobalEvent_1.default.HIDE_NET_WAITING, this, this.onHideWaiting);
        Global.Event.on(GlobalEvent_1.default.FORCE_HIDE_WAITING, this, this.forceHideWaiting);
    };
    WaitingModel.prototype.onShowWaiting = function (key, maxTime, value, minTime, enableMask) {
        if (value === void 0) { value = ""; }
        if (minTime === void 0) { minTime = 1; }
        if (enableMask === void 0) { enableMask = true; }
        //cc.error("add key", key);
        if (isNaN(Number(maxTime)))
            maxTime = this.DEFAULT_WAITING_TIME;
        var waitingList = Global.UI.getWindow("WndNetWaiting");
        if (this.waitingList.length == 0 || waitingList == null || !waitingList.isLoaded) {
            Global.UI.show("WndNetWaiting", maxTime, value, minTime, enableMask);
        }
        this.event(this.EVENT_UPDATE_WAITING_TIME, maxTime);
        this.waitingList.push(key);
    };
    WaitingModel.prototype.onHideWaiting = function (key, force) {
        if (force === void 0) { force = false; }
        if (force) {
            this.waitingList = [];
        }
        else {
            for (var i = this.waitingList.length - 1; i >= 0; i--) {
                if (this.waitingList[i] == key)
                    this.waitingList.splice(i, 1);
            }
        }
        if (this.waitingList.length == 0) {
            Global.UI.close("WndNetWaiting");
        }
    };
    WaitingModel.prototype.forceHideWaiting = function () {
        this.waitTimeOut();
        Global.UI.close("WndNetWaiting");
    };
    WaitingModel.prototype.waitTimeOut = function () {
        this.waitingList = [];
    };
    WaitingModel.prototype.getWaitingList = function () {
        return this.waitingList || [];
    };
    return WaitingModel;
}(ModelBase_1.default));
exports.default = WaitingModel;

cc._RF.pop();