"use strict";
cc._RF.push(module, 'afa2fawGchEOKZzKi2GKisd', 'SignActivityModel');
// hall/scripts/logic/hallcommon/model/SignActivityModel.ts

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
var ActivityConstants_1 = require("../../hall/ui/Activity/ActivityConstants");
var SignActivityModel = /** @class */ (function (_super) {
    __extends(SignActivityModel, _super);
    function SignActivityModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 红点控制
         */
        _this._redFlag = false;
        _this.actData = null;
        return _this;
    }
    Object.defineProperty(SignActivityModel.prototype, "Name", {
        get: function () {
            return "SignActivityModel";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignActivityModel.prototype, "redSwitch", {
        get: function () {
            return this._redFlag;
        },
        set: function (flag) {
            this._redFlag = flag;
        },
        enumerable: false,
        configurable: true
    });
    SignActivityModel.prototype.onInit = function () {
    };
    SignActivityModel.prototype.reqReceiveActivityAward = function (activityId, key) {
        var _this = this;
        var param = {};
        param.atype = activityId;
        param.key = key;
        Global.HallServer.send(NetAppface.mod, NetAppface.ReceiveActivityAward, param, function (data) {
            _this.event(SignActivityModel.OnGetAward, data);
        }, null, true, 0);
    };
    SignActivityModel.prototype.reqGetActivityCfg = function (showWaiting) {
        var _this = this;
        if (showWaiting === void 0) { showWaiting = false; }
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "reqGetActivityCfg");
        var param = {};
        Global.HallServer.send(NetAppface.mod, NetAppface.GetActivityCfg, param, function (data) {
            var arr = data.data;
            for (var index = 0; index < arr.length; index++) {
                var cfg = arr[index];
                if (cfg && cfg.atype == ActivityConstants_1.RightViewType.signActivity) {
                    _this.actData = cfg.cfg;
                    break;
                }
            }
            _this.event(SignActivityModel.UpdataPanel, _this.actData);
        }, null, showWaiting, 0);
    };
    SignActivityModel.prototype.checkFlowStatusFinish = function () {
        if (!this.actData) {
            this.redSwitch = false;
            return false;
        }
        var day = this.actData.day;
        if (day == 4) {
            return true;
        }
        for (var index = 0; index < this.actData.list.length; index++) {
            var element = this.actData.list[index];
            switch (day) {
                case 1:
                    var dayOneData = element.one;
                    if (dayOneData.flow_status === 0) {
                        this.redSwitch = false;
                        return false;
                    }
                    break;
                case 2:
                    var dayTwoData = element.two;
                    if (dayTwoData.flow_status === 0) {
                        this.redSwitch = false;
                        return false;
                    }
                    break;
                case 3:
                    var dayThirdData = element.three;
                    if (dayThirdData.flow_status === 0) {
                        this.redSwitch = false;
                        return false;
                    }
                    break;
                default:
                    break;
            }
        }
        this.redSwitch = this.actData.status == 1;
        return this.actData.status == 1;
    };
    SignActivityModel.UpdataPanel = "UpdataPanel";
    SignActivityModel.OnGetAward = "OnGetAward";
    return SignActivityModel;
}(ModelBase_1.default));
exports.default = SignActivityModel;

cc._RF.pop();