"use strict";
cc._RF.push(module, '9187futaZRJHJ3rORy+Az6j', 'CashBackModel');
// hall/scripts/logic/hallcommon/model/CashBackModel.ts

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
var CashBackEvent_1 = require("../../hall/ui/CashBack/CashBackEvent");
var HallModel_1 = require("./HallModel");
var CashBackModel = /** @class */ (function (_super) {
    __extends(CashBackModel, _super);
    function CashBackModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.redFlag = false;
        return _this;
    }
    CashBackModel.prototype.CashBackErronFunc = function (data) {
        if (data._errstr != null) {
            Global.UI.fastTip(data._errstr);
            return false;
        }
        return true;
    };
    Object.defineProperty(CashBackModel.prototype, "Name", {
        get: function () {
            return "CashBackModel";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CashBackModel.prototype, "RedFLag", {
        get: function () {
            return this.redFlag;
        },
        set: function (flag) {
            this.redFlag = flag;
            if (this.redFlag) {
                Global.Event.event(GlobalEvent.ShowRedSpot, [false, HallModel_1.HallRedSpotType.CashBackDay]);
            }
        },
        enumerable: false,
        configurable: true
    });
    CashBackModel.prototype.CheckRedFlag = function () {
        if (this.redFlag) {
            Global.Event.event(GlobalEvent.ShowRedSpot, [false, HallModel_1.HallRedSpotType.CashBackDay]);
        }
    };
    /**
     * 返利说明数据
     */
    CashBackModel.prototype.GetActivityCfg = function () {
        var _this = this;
        var param = {};
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetActivityCfg, param, function (msg) {
            _this.event(CashBackEvent_1.CashBackEvent.GetActivityCfg, msg);
        }, this.CashBackErronFunc.bind(this), false, 1);
    };
    /**
    * 每日返利领取记录
    */
    CashBackModel.prototype.GetDayFlowBackRecord = function (page, limit) {
        var _this = this;
        var param = {
            "page": page,
            "limit": limit
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetDayFlowBackRecord, param, function (msg) {
            _this.event(CashBackEvent_1.CashBackEvent.GetDayFlowBackRecord, msg);
        }, this.CashBackErronFunc.bind(this), false, 0);
    };
    /**
     * 领取每日返利
     */
    CashBackModel.prototype.GetDayFlowBack = function (id) {
        var _this = this;
        var param = {
            "id": id,
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetDayFlowBackAll, param, function (msg) {
            _this.event(CashBackEvent_1.CashBackEvent.GetDayFlowBackAll, msg);
            Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetUserPoint, {});
        }, this.CashBackErronFunc.bind(this), true, 0);
    };
    return CashBackModel;
}(ModelBase_1.default));
exports.default = CashBackModel;

cc._RF.pop();