"use strict";
cc._RF.push(module, '109a7jWdCdBT4IrBli1VAAy', 'ActivityToggle');
// hall/scripts/logic/hall/ui/hall/ActivityToggle.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleActivityModel = void 0;
var SingleActivityModel = /** @class */ (function () {
    function SingleActivityModel() {
        this.status = 0; //开关 0关 1开
        this.sort = 0;
        this.atype = 0;
        this.button_status = 0;
        this.ptype = 0;
    }
    return SingleActivityModel;
}());
exports.SingleActivityModel = SingleActivityModel;
var ActivityToggle = /** @class */ (function () {
    function ActivityToggle() {
        //要显示的活动按钮列表
        this._activityList = [];
        this._activitCfg = null;
        this.clear();
    }
    Object.defineProperty(ActivityToggle.prototype, "ActivityCfg", {
        get: function () {
            return this._activitCfg;
        },
        set: function (val) {
            this._activitCfg = val;
        },
        enumerable: false,
        configurable: true
    });
    ActivityToggle.prototype.clear = function () {
        this._activityList = [];
    };
    ActivityToggle.prototype.init = function (activityData) {
        if (!activityData) {
            Logger.error("----activityList------ null");
            return;
        }
        var tempActivityList = [];
        for (var i = 0; i < activityData.length; i++) {
            var itemData = activityData[i];
            if (itemData == null) {
                continue;
            }
            var activityModel = new SingleActivityModel();
            for (var key in activityModel) {
                if (itemData[key] != null && itemData[key] != undefined) {
                    activityModel[key] = itemData[key];
                }
            }
            if (activityModel.button_status == 1) {
                //状态为开时存入
                tempActivityList.push(activityModel);
            }
        }
        this._activityList = tempActivityList;
    };
    Object.defineProperty(ActivityToggle.prototype, "activityList", {
        get: function () {
            return this._activityList;
        },
        enumerable: false,
        configurable: true
    });
    ActivityToggle.prototype.checkActivityBtnOpen = function (atype) {
        for (var i = 0; i < this._activitCfg.length; i++) {
            if (this._activitCfg[i].atype === atype) {
                return this._activitCfg[i].button_status == 1; // 1显示 2关闭
            }
        }
        return false;
    };
    return ActivityToggle;
}());
exports.default = ActivityToggle;

cc._RF.pop();