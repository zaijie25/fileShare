
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/hall/ActivityToggle.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxoYWxsXFxBY3Rpdml0eVRvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtJQUFBO1FBQ1csV0FBTSxHQUFXLENBQUMsQ0FBQyxDQUFDLFVBQVU7UUFDOUIsU0FBSSxHQUFVLENBQUMsQ0FBQTtRQUNmLFVBQUssR0FBVSxDQUFDLENBQUE7UUFDaEIsa0JBQWEsR0FBRyxDQUFDLENBQUE7UUFDakIsVUFBSyxHQUFHLENBQUMsQ0FBQTtJQUNwQixDQUFDO0lBQUQsMEJBQUM7QUFBRCxDQU5BLEFBTUMsSUFBQTtBQU5ZLGtEQUFtQjtBQVNoQztJQU1JO1FBSEEsWUFBWTtRQUNKLGtCQUFhLEdBQXlCLEVBQUUsQ0FBQztRQU16QyxnQkFBVyxHQUFPLElBQUksQ0FBQTtRQUgxQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUlELHNCQUFXLHVDQUFXO2FBS3RCO1lBRUksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFBO1FBQzNCLENBQUM7YUFSRCxVQUF1QixHQUFHO1lBRXRCLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFBO1FBQzFCLENBQUM7OztPQUFBO0lBT00sOEJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFTSw2QkFBSSxHQUFYLFVBQVksWUFBZ0I7UUFDeEIsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtZQUMzQyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLGdCQUFnQixHQUF5QixFQUFFLENBQUM7UUFDaEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUMsSUFBSSxRQUFRLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUcsUUFBUSxJQUFJLElBQUksRUFBQztnQkFDaEIsU0FBUzthQUNaO1lBQ0QsSUFBSSxhQUFhLEdBQUcsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO1lBQzlDLEtBQUssSUFBSSxHQUFHLElBQUksYUFBYSxFQUFFO2dCQUMzQixJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFNBQVMsRUFBRTtvQkFDckQsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDdEM7YUFDSjtZQUVELElBQUksYUFBYSxDQUFDLGFBQWEsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xDLFNBQVM7Z0JBQ1QsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3hDO1NBQ0o7UUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLGdCQUFnQixDQUFDO0lBQzFDLENBQUM7SUFFRCxzQkFBVyx3Q0FBWTthQUF2QjtZQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQUVNLDZDQUFvQixHQUEzQixVQUE0QixLQUFLO1FBRTdCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztZQUN0QyxJQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFHLEtBQUssRUFBQztnQkFDakMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUEsQ0FBQyxVQUFVO2FBQzNEO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQTtJQUNoQixDQUFDO0lBR0wscUJBQUM7QUFBRCxDQXBFQSxBQW9FQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmV4cG9ydCBjbGFzcyBTaW5nbGVBY3Rpdml0eU1vZGVsIHtcclxuICAgIHB1YmxpYyBzdGF0dXM6IG51bWJlciA9IDA7IC8v5byA5YWzIDDlhbMgMeW8gFxyXG4gICAgcHVibGljIHNvcnQ6bnVtYmVyID0gMFxyXG4gICAgcHVibGljIGF0eXBlOm51bWJlciA9IDBcclxuICAgIHB1YmxpYyBidXR0b25fc3RhdHVzID0gMFxyXG4gICAgcHVibGljIHB0eXBlID0gMFxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0aXZpdHlUb2dnbGUge1xyXG4gICAgXHJcbiAgICBcclxuICAgIC8v6KaB5pi+56S655qE5rS75Yqo5oyJ6ZKu5YiX6KGoXHJcbiAgICBwcml2YXRlIF9hY3Rpdml0eUxpc3Q6U2luZ2xlQWN0aXZpdHlNb2RlbFtdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2FjdGl2aXRDZmc6YW55ID0gbnVsbFxyXG5cclxuICAgIHB1YmxpYyBzZXQgQWN0aXZpdHlDZmcodmFsKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX2FjdGl2aXRDZmcgPSB2YWxcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IEFjdGl2aXR5Q2ZnKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZpdENmZ1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpIHtcclxuICAgICAgICB0aGlzLl9hY3Rpdml0eUxpc3QgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdChhY3Rpdml0eURhdGE6IFtdKSB7XHJcbiAgICAgICAgaWYgKCFhY3Rpdml0eURhdGEpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiLS0tLWFjdGl2aXR5TGlzdC0tLS0tLSBudWxsXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRlbXBBY3Rpdml0eUxpc3Q6U2luZ2xlQWN0aXZpdHlNb2RlbFtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY3Rpdml0eURhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW1EYXRhID0gYWN0aXZpdHlEYXRhW2ldO1xyXG4gICAgICAgICAgICBpZihpdGVtRGF0YSA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBhY3Rpdml0eU1vZGVsID0gbmV3IFNpbmdsZUFjdGl2aXR5TW9kZWwoKTtcclxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGFjdGl2aXR5TW9kZWwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtRGF0YVtrZXldICE9IG51bGwgJiYgaXRlbURhdGFba2V5XSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eU1vZGVsW2tleV0gPSBpdGVtRGF0YVtrZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoYWN0aXZpdHlNb2RlbC5idXR0b25fc3RhdHVzID09IDEpIHtcclxuICAgICAgICAgICAgICAgIC8v54q25oCB5Li65byA5pe25a2Y5YWlXHJcbiAgICAgICAgICAgICAgICB0ZW1wQWN0aXZpdHlMaXN0LnB1c2goYWN0aXZpdHlNb2RlbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2FjdGl2aXR5TGlzdCA9IHRlbXBBY3Rpdml0eUxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBhY3Rpdml0eUxpc3QoKTpTaW5nbGVBY3Rpdml0eU1vZGVsW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hY3Rpdml0eUxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrQWN0aXZpdHlCdG5PcGVuKGF0eXBlKVxyXG4gICAge1xyXG4gICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5fYWN0aXZpdENmZy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5fYWN0aXZpdENmZ1tpXS5hdHlwZT09PWF0eXBlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hY3Rpdml0Q2ZnW2ldLmJ1dHRvbl9zdGF0dXMgPT0gMSAvLyAx5pi+56S6IDLlhbPpl61cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcblxyXG59Il19