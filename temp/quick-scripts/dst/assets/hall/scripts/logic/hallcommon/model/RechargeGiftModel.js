
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/model/RechargeGiftModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZGVsXFxSZWNoYXJnZUdpZnRNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnRUFBMkQ7QUFDM0QseURBQTBEO0FBRTFEO0lBQStDLHFDQUFTO0lBQXhEO1FBQUEscUVBMEhDO1FBekdHLGdCQUFVLEdBQVcsQ0FBQyxDQUFBO1FBS2YsY0FBUSxHQUFHLElBQUksQ0FBQSxDQUFDLE9BQU87UUFHdEIsYUFBTyxHQUFZLEtBQUssQ0FBQTtRQUVoQzs7V0FFRztRQUNLLGdCQUFVLEdBQUcsQ0FBQyxDQUFBO1FBRXRCOztXQUVHO1FBQ0ssd0JBQWtCLEdBQUcsQ0FBQyxDQUFDLENBQUE7O0lBdUZuQyxDQUFDO0lBekhhLGtDQUFNLEdBQWhCO0lBRUEsQ0FBQztJQWdCRCxzQkFBVyxtQ0FBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO1FBQ3JCLENBQUM7OztPQUFBO0lBZ0JELHNCQUFXLHFDQUFNO2FBQWpCO1lBRUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFBO1FBQ3ZCLENBQUM7YUFFRCxVQUFrQixNQUFNO1lBRXBCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFBO1FBRXpCLENBQUM7OztPQU5BO0lBU0Qsc0JBQVcsZ0RBQWlCO2FBQTVCO1lBRUksT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUE7UUFDbEMsQ0FBQzthQUVELFVBQTZCLEdBQUc7WUFFNUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEdBQUcsQ0FBQTtRQUNqQyxDQUFDOzs7T0FMQTtJQU9ELHNCQUFXLHdDQUFTO2FBQXBCO1lBRUksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFBO1FBQzFCLENBQUM7YUFFRCxVQUFxQixHQUFHO1lBRXBCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFBO1FBQ3pCLENBQUM7OztPQUxBO0lBT0Qsc0JBQVcscUNBQU07YUFPakI7WUFFSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUU7UUFDekIsQ0FBQzthQVZELFVBQW1CLElBQUk7WUFFbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFHeEIsQ0FBQzs7O09BQUE7SUFPRCxzQkFBVyxtQ0FBSTthQUFmO1lBRUksT0FBTyxtQkFBbUIsQ0FBQztRQUMvQixDQUFDOzs7T0FBQTtJQUdNLG1EQUF1QixHQUE5QixVQUErQixVQUFpQixFQUFDLEdBQVc7UUFBNUQsaUJBUUM7UUFQRyxJQUFJLEtBQUssR0FBUSxFQUFFLENBQUE7UUFDbkIsS0FBSyxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUE7UUFDeEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUE7UUFDZixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxxQkFBVSxDQUFDLEdBQUcsRUFBRSxxQkFBVSxDQUFDLG9CQUFvQixFQUFFLEtBQUssRUFBRSxVQUFDLElBQUk7WUFDaEYsS0FBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFakQsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVNLDZDQUFpQixHQUF4QixVQUF5QixXQUFrQjtRQUEzQyxpQkFLQztRQUx3Qiw0QkFBQSxFQUFBLG1CQUFrQjtRQUN2QyxJQUFJLEtBQUssR0FBUSxFQUFFLENBQUE7UUFDbkIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQVUsQ0FBQyxHQUFHLEVBQUUscUJBQVUsQ0FBQyxjQUFjLEVBQUUsS0FBSyxFQUFFLFVBQUMsSUFBSTtZQUMxRSxLQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsQ0FBQztRQUM5QyxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBR00sOERBQWtDLEdBQXpDO1FBQUEsaUJBS0M7UUFKRyxJQUFJLEtBQUssR0FBUSxFQUFFLENBQUE7UUFDbkIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQVUsQ0FBQyxHQUFHLEVBQUUscUJBQVUsQ0FBQywrQkFBK0IsRUFBRSxLQUFLLEVBQUUsVUFBQyxJQUFJO1lBQzNGLEtBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsK0JBQStCLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUdNLG1FQUF1QyxHQUE5QyxVQUErQyxHQUFXO1FBQTFELGlCQU9DO1FBTkcsSUFBSSxLQUFLLEdBQVEsRUFBRSxDQUFBO1FBQ25CLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO1FBQ2YsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQVUsQ0FBQyxHQUFHLEVBQUUscUJBQVUsQ0FBQyxvQ0FBb0MsRUFBRSxLQUFLLEVBQUUsVUFBQyxJQUFJO1lBQ2hHLEtBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsb0NBQW9DLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFN0UsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQW5IYSwwQkFBUSxHQUFHLFVBQVUsQ0FBQztJQUN0Qix3QkFBTSxHQUFHLFFBQVEsQ0FBQTtJQUlqQixpREFBK0IsR0FBTSxpQ0FBaUMsQ0FBQTtJQUV0RSxzREFBb0MsR0FBTyxzQ0FBc0MsQ0FBQTtJQUdqRix1Q0FBcUIsR0FBRyxVQUFVLENBQUM7SUEyR3JELHdCQUFDO0NBMUhELEFBMEhDLENBMUg4QyxtQkFBUyxHQTBIdkQ7a0JBMUhvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9kZWxCYXNlIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvbW9kZWwvTW9kZWxCYXNlXCI7XHJcbmltcG9ydCB7IE5ldEFwcGZhY2UgfSBmcm9tIFwiLi4vLi4vY29yZS9uZXQvaGFsbC9OZXRFdmVudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjaGFyZ2VHaWZ0TW9kZWwgZXh0ZW5kcyBNb2RlbEJhc2V7XHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0QXdhcmQgPSBcIkdldEF3YXJkXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIEdldENmZyA9IFwiR2V0Q2ZnXCJcclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0TGltaXRUaW1lRmlyc3RQYXlBY3Rpdml0eUNmZyAgICA9IFwiR2V0TGltaXRUaW1lRmlyc3RQYXlBY3Rpdml0eUNmZ1wiXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBHZXRMaW1pdFRpbWVGaXJzdFBheUFjdGl2aXR5UG9pbnRSZXEgICAgID0gXCJHZXRMaW1pdFRpbWVGaXJzdFBheUFjdGl2aXR5UG9pbnRSZXFcIlxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldERhaWx5UmVjaGFyZ2VBd2FyZCA9IFwiR2V0QXdhcmRcIjtcclxuXHJcbiAgICBhY3Rpdml0eUlkOiBudW1iZXIgPSA0XHJcbiAgICBwcml2YXRlIF9kYXRhOiBhbnk7XHJcbiAgICBwdWJsaWMgZ2V0IGRhdGEoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVxyXG4gICAgfVxyXG4gICAgcHVibGljIHNhZmVEYXRhID0gbnVsbCAvL+S/nemZqemHkeaVsOaNrlxyXG4gICAgcHJpdmF0ZSBfU3RhdHVzOmJvb2xlYW4gLy/nuqLngrlcclxuXHJcbiAgICBwcml2YXRlIF9zd2l0Y2g6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZmQ5pe26aaW5YWF6L+U5Yip5YCS6K6h5pe2XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2NvdW50RG93biA9IDBcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmZkOaXtummluWFhei/lOWIqea0u+WKqOeKtuaAgVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF90aW1lTGltaXRlZFN0YXR1cyA9IC0xXHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgU3RhdHVzKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fU3RhdHVzXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBTdGF0dXMoc3RhdHVzKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1N0YXR1cyA9IHN0YXR1c1xyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgVGltZWxpbWl0ZWRTdGF0dXMoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lTGltaXRlZFN0YXR1c1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgVGltZWxpbWl0ZWRTdGF0dXModmFsKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX3RpbWVMaW1pdGVkU3RhdHVzID0gdmFsXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBDb3VudERvd24oKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb3VudERvd25cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IENvdW50RG93bih2YWwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fY291bnREb3duID0gdmFsXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBTd2l0Y2ggKGZsYWcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fc3dpdGNoID0gZmxhZztcclxuICAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBTd2l0Y2ggKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3dpdGNoIDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IE5hbWUoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIlJlY2hhcmdlR2lmdE1vZGVsXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgcHVibGljIHJlcVJlY2VpdmVBY3Rpdml0eUF3YXJkKGFjdGl2aXR5SWQ6bnVtYmVyLGtleT86bnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtOiBhbnkgPSB7fVxyXG4gICAgICAgIHBhcmFtLmF0eXBlID0gYWN0aXZpdHlJZFxyXG4gICAgICAgIHBhcmFtLmtleSA9IGtleVxyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsIE5ldEFwcGZhY2UuUmVjZWl2ZUFjdGl2aXR5QXdhcmQsIHBhcmFtLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50KFJlY2hhcmdlR2lmdE1vZGVsLkdldEF3YXJkLCBkYXRhKTtcclxuXHJcbiAgICAgICAgfSwgbnVsbCwgdHJ1ZSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlcUdldEFjdGl2aXR5Q2ZnKHNob3dXYWl0aW5nID1mYWxzZSkge1xyXG4gICAgICAgIGxldCBwYXJhbTogYW55ID0ge31cclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkdldEFjdGl2aXR5Q2ZnLCBwYXJhbSwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudChSZWNoYXJnZUdpZnRNb2RlbC5HZXRDZmcsZGF0YSk7XHJcbiAgICAgICAgfSwgbnVsbCwgc2hvd1dhaXRpbmcsIDApO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgcmVxR2V0TGltaXRUaW1lRmlyc3RQYXlBY3Rpdml0eUNmZygpIHtcclxuICAgICAgICBsZXQgcGFyYW06IGFueSA9IHt9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXRMaW1pdFRpbWVGaXJzdFBheUFjdGl2aXR5Q2ZnLCBwYXJhbSwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudChSZWNoYXJnZUdpZnRNb2RlbC5HZXRMaW1pdFRpbWVGaXJzdFBheUFjdGl2aXR5Q2ZnLGRhdGEpO1xyXG4gICAgICAgIH0sIG51bGwsIHRydWUsIDApO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgcmVxR2V0TGltaXRUaW1lRmlyc3RQYXlBY3Rpdml0eVBvaW50UmVxKGtleT86bnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtOiBhbnkgPSB7fVxyXG4gICAgICAgIHBhcmFtLmtleSA9IGtleVxyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsIE5ldEFwcGZhY2UuR2V0TGltaXRUaW1lRmlyc3RQYXlBY3Rpdml0eVBvaW50UmVxLCBwYXJhbSwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudChSZWNoYXJnZUdpZnRNb2RlbC5HZXRMaW1pdFRpbWVGaXJzdFBheUFjdGl2aXR5UG9pbnRSZXEsIGRhdGEpO1xyXG5cclxuICAgICAgICB9LCBudWxsLCB0cnVlLCAwKTtcclxuICAgIH1cclxuXHJcbn0iXX0=