"use strict";
cc._RF.push(module, 'a6464kE6dJAgqAuTLPN6af8', 'CommisionModel');
// hall/scripts/logic/hallcommon/model/CommisionModel.ts

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
var CommisionModel = /** @class */ (function (_super) {
    __extends(CommisionModel, _super);
    function CommisionModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 红点控制
         */
        _this._redFlag = false;
        _this.commisionList = null;
        _this.commisionInfoTable = {};
        return _this;
    }
    Object.defineProperty(CommisionModel.prototype, "Name", {
        get: function () {
            return "CommisionModel";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommisionModel.prototype, "redSwitch", {
        get: function () {
            return this._redFlag;
        },
        set: function (flag) {
            this._redFlag = flag;
        },
        enumerable: false,
        configurable: true
    });
    CommisionModel.prototype.onInit = function () {
    };
    /**
     * 请求所有任务列表
     */
    CommisionModel.prototype.reqGetCommisionAllList = function () {
        var _this = this;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetTaskActivityAllList, {}, function (msg) {
            _this.commisionList = msg.data;
            _this.event(CommisionModel.UpdateleftView, msg.data);
        }, this.CommisionModelErrorFunc.bind(this), false);
    };
    /**
     *
     * @param type 请求任务数据
     */
    CommisionModel.prototype.reqGetCommisionInfo = function (type) {
        var _this = this;
        // Global.Event.event(GlobalEvent.SHOW_NET_WAITING,"requestTaskInfo")
        var param = {};
        param["global_task_type"] = type;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetMyTaskActivityInfo, param, function (msg) {
            _this.commisionInfoTable[type] = msg;
            // Global.Event.event(GlobalEvent.HIDE_NET_WAITING,"requestTaskInfo")
            _this.event(CommisionModel.UpdateScrollview, msg);
        }, this.CommisionModelErrorFunc.bind(this), false);
    };
    /**
     * 领取任务奖励
     * @param type 任务类型
     * @param id 任务id
     */
    CommisionModel.prototype.reqGetCommisionAward = function (type, id) {
        var _this = this;
        var param = {};
        param["task_id"] = id;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetMyTaskActivityReward, param, function (msg) {
            _this.updataCommisionData(type, id);
            _this.event(CommisionModel.GetCommisionAward, { "task_reward": msg.task_reward, "task_id": id, "global_task_type": type });
        }, this.CommisionModelErrorFunc.bind(this), false);
    };
    CommisionModel.prototype.CommisionModelErrorFunc = function (data) {
        if (data._errstr != null) {
            Global.UI.fastTip(data._errstr + "");
            //Global.UI.fastTip(data._errstr + "[" + data._errno + "]");
        }
    };
    CommisionModel.prototype.GetCommisionInfoByType = function (type) {
        if (this.commisionInfoTable.hasOwnProperty(type)) {
            return this.commisionInfoTable[type];
        }
        return null;
    };
    /**
     * 根据任务类型检查该项任务是否有可以领取的
     * @param type 任务类型
     */
    CommisionModel.prototype.checkIsAnyCommisionCanGet = function (type) {
        if (!this.commisionInfoTable.hasOwnProperty(type)) {
            return false;
        }
        var commisionData = this.commisionInfoTable[type].data;
        for (var index = 0; index < commisionData.length; index++) {
            var element = commisionData[index];
            if (element.task_status == 1) {
                return true;
            }
        }
        return false;
    };
    /**
     * 领取后根据任务类型和id刷新本地数据
     * @param type 任务类型
     * @param id  任务id
     */
    CommisionModel.prototype.updataCommisionData = function (type, id) {
        if (!this.commisionInfoTable.hasOwnProperty(type)) {
            return;
        }
        var commisionReduce = false; //本地维护任务数量
        var commisionData = this.commisionInfoTable[type].data;
        for (var index = 0; index < commisionData.length; index++) {
            var element = commisionData[index];
            if (element.task_id == id) {
                commisionReduce = true;
                element.task_status = 2;
                break;
            }
        }
        if (commisionReduce) {
            var subItem = this.commisionList.find(function (item) {
                return item.global_task_type == type;
            });
            if (subItem != null) {
                subItem.task_num -= 1;
            }
        }
    };
    CommisionModel.prototype.checkShowHallRedSpot = function () {
        if (!this.commisionList) {
            this.redSwitch = false;
            return false;
        }
        for (var index = 0; index < this.commisionList.length; index++) {
            var element = this.commisionList[index];
            // if(element.global_task_type == 7){//屏蔽掉游戏活跃
            //     continue;
            // }
            if (element.task_num > 0) {
                this.redSwitch = true;
                return true;
            }
        }
        this.redSwitch = false;
        return false;
    };
    CommisionModel.prototype.resetData = function () {
        this.commisionList = null;
        this.commisionInfoTable = {};
    };
    CommisionModel.UpdateScrollview = "UpdateScrollview";
    CommisionModel.UpdateleftView = "UpdateleftView";
    CommisionModel.GetCommisionAward = "GetCommisionAward";
    return CommisionModel;
}(ModelBase_1.default));
exports.default = CommisionModel;

cc._RF.pop();