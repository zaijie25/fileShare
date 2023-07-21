"use strict";
cc._RF.push(module, '5e6f6fbAKxAKYQNGePy+ENO', 'RechargeGiftModel');
// hall/scripts/logic/hallcommon/model/RechargeGiftModel.ts

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
var NetEvent_1 = require("../../core/net/hall/NetEvent");
var RechargeGiftModel = /** @class */ (function (_super) {
    __extends(RechargeGiftModel, _super);
    function RechargeGiftModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activityId = 4;
        _this.safeData = null; //保险金数据
        _this._switch = false;
        /**
         * 限时首充返利倒计时
         */
        _this._countDown = 0;
        /**
         * 限时首充返利活动状态
         */
        _this._timeLimitedStatus = -1;
        return _this;
    }
    RechargeGiftModel.prototype.onInit = function () {
    };
    Object.defineProperty(RechargeGiftModel.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RechargeGiftModel.prototype, "Status", {
        get: function () {
            return this._Status;
        },
        set: function (status) {
            this._Status = status;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RechargeGiftModel.prototype, "TimelimitedStatus", {
        get: function () {
            return this._timeLimitedStatus;
        },
        set: function (val) {
            this._timeLimitedStatus = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RechargeGiftModel.prototype, "CountDown", {
        get: function () {
            return this._countDown;
        },
        set: function (val) {
            this._countDown = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RechargeGiftModel.prototype, "Switch", {
        get: function () {
            return this._switch;
        },
        set: function (flag) {
            this._switch = flag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RechargeGiftModel.prototype, "Name", {
        get: function () {
            return "RechargeGiftModel";
        },
        enumerable: false,
        configurable: true
    });
    RechargeGiftModel.prototype.reqReceiveActivityAward = function (activityId, key) {
        var _this = this;
        var param = {};
        param.atype = activityId;
        param.key = key;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.ReceiveActivityAward, param, function (data) {
            _this.event(RechargeGiftModel.GetAward, data);
        }, null, true, 0);
    };
    RechargeGiftModel.prototype.reqGetActivityCfg = function (showWaiting) {
        var _this = this;
        if (showWaiting === void 0) { showWaiting = false; }
        var param = {};
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetActivityCfg, param, function (data) {
            _this.event(RechargeGiftModel.GetCfg, data);
        }, null, showWaiting, 0);
    };
    RechargeGiftModel.prototype.reqGetLimitTimeFirstPayActivityCfg = function () {
        var _this = this;
        var param = {};
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetLimitTimeFirstPayActivityCfg, param, function (data) {
            _this.event(RechargeGiftModel.GetLimitTimeFirstPayActivityCfg, data);
        }, null, true, 0);
    };
    RechargeGiftModel.prototype.reqGetLimitTimeFirstPayActivityPointReq = function (key) {
        var _this = this;
        var param = {};
        param.key = key;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetLimitTimeFirstPayActivityPointReq, param, function (data) {
            _this.event(RechargeGiftModel.GetLimitTimeFirstPayActivityPointReq, data);
        }, null, true, 0);
    };
    RechargeGiftModel.GetAward = "GetAward";
    RechargeGiftModel.GetCfg = "GetCfg";
    RechargeGiftModel.GetLimitTimeFirstPayActivityCfg = "GetLimitTimeFirstPayActivityCfg";
    RechargeGiftModel.GetLimitTimeFirstPayActivityPointReq = "GetLimitTimeFirstPayActivityPointReq";
    RechargeGiftModel.GetDailyRechargeAward = "GetAward";
    return RechargeGiftModel;
}(ModelBase_1.default));
exports.default = RechargeGiftModel;

cc._RF.pop();