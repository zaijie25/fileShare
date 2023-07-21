"use strict";
cc._RF.push(module, '78151w5TUdM+YUGZcBexe/u', 'TimeLimitedRecgargeModel');
// hall/scripts/logic/hallcommon/model/TimeLimitedRecgargeModel.ts

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
var RechargeGiftModel_1 = require("./RechargeGiftModel");
var TimeLimitedRecgargeModel = /** @class */ (function (_super) {
    __extends(TimeLimitedRecgargeModel, _super);
    function TimeLimitedRecgargeModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activityId = 4;
        _this.safeData = null; //保险金数据
        _this._switch = false;
        return _this;
    }
    TimeLimitedRecgargeModel.prototype.onInit = function () {
    };
    Object.defineProperty(TimeLimitedRecgargeModel.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeLimitedRecgargeModel.prototype, "Status", {
        get: function () {
            return this._Status;
        },
        set: function (status) {
            this._Status = status;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeLimitedRecgargeModel.prototype, "Switch", {
        get: function () {
            return this._switch;
        },
        set: function (flag) {
            this._switch = flag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeLimitedRecgargeModel.prototype, "Name", {
        get: function () {
            return "RechargeGiftModel";
        },
        enumerable: false,
        configurable: true
    });
    TimeLimitedRecgargeModel.prototype.reqReceiveActivityAward = function (activityId, key) {
        var _this = this;
        var param = {};
        param.atype = activityId;
        param.key = key;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.ReceiveActivityAward, param, function (data) {
            _this.event(RechargeGiftModel_1.default.GetAward, data);
        }, null, true, 0);
    };
    TimeLimitedRecgargeModel.prototype.reqGetActivityCfg = function (showWaiting) {
        var _this = this;
        if (showWaiting === void 0) { showWaiting = false; }
        var param = {};
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetActivityCfg, param, function (data) {
            _this.event(RechargeGiftModel_1.default.GetCfg, data);
        }, null, showWaiting, 0);
    };
    TimeLimitedRecgargeModel.GetAward = "GetAward";
    TimeLimitedRecgargeModel.GetCfg = "GetCfg";
    TimeLimitedRecgargeModel.GetDailyRechargeAward = "GetAward";
    return TimeLimitedRecgargeModel;
}(ModelBase_1.default));
exports.default = TimeLimitedRecgargeModel;

cc._RF.pop();