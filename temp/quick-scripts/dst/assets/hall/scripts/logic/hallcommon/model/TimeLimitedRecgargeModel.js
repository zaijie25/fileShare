
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/model/TimeLimitedRecgargeModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZGVsXFxUaW1lTGltaXRlZFJlY2dhcmdlTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQTJEO0FBQzNELHlEQUEwRDtBQUMxRCx5REFBb0Q7QUFFcEQ7SUFBc0QsNENBQVM7SUFBL0Q7UUFBQSxxRUFrRUM7UUF4REcsZ0JBQVUsR0FBVyxDQUFDLENBQUE7UUFLZixjQUFRLEdBQUcsSUFBSSxDQUFBLENBQUMsT0FBTztRQUd0QixhQUFPLEdBQVksS0FBSyxDQUFBOztJQWdEcEMsQ0FBQztJQWpFYSx5Q0FBTSxHQUFoQjtJQUVBLENBQUM7SUFTRCxzQkFBVywwQ0FBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO1FBQ3JCLENBQUM7OztPQUFBO0lBTUQsc0JBQVcsNENBQU07YUFBakI7WUFFSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDdkIsQ0FBQzthQUVELFVBQWtCLE1BQU07WUFFcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7UUFFekIsQ0FBQzs7O09BTkE7SUFRRCxzQkFBVyw0Q0FBTTthQU9qQjtZQUVJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBRTtRQUN6QixDQUFDO2FBVkQsVUFBbUIsSUFBSTtZQUVuQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUd4QixDQUFDOzs7T0FBQTtJQU9ELHNCQUFXLDBDQUFJO2FBQWY7WUFFSSxPQUFPLG1CQUFtQixDQUFDO1FBQy9CLENBQUM7OztPQUFBO0lBR00sMERBQXVCLEdBQTlCLFVBQStCLFVBQWlCLEVBQUMsR0FBVztRQUE1RCxpQkFRQztRQVBHLElBQUksS0FBSyxHQUFRLEVBQUUsQ0FBQTtRQUNuQixLQUFLLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQTtRQUN4QixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtRQUNmLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHFCQUFVLENBQUMsR0FBRyxFQUFFLHFCQUFVLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLFVBQUMsSUFBSTtZQUNoRixLQUFJLENBQUMsS0FBSyxDQUFDLDJCQUFpQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVqRCxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRU0sb0RBQWlCLEdBQXhCLFVBQXlCLFdBQWtCO1FBQTNDLGlCQUtDO1FBTHdCLDRCQUFBLEVBQUEsbUJBQWtCO1FBQ3ZDLElBQUksS0FBSyxHQUFRLEVBQUUsQ0FBQTtRQUNuQixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxxQkFBVSxDQUFDLEdBQUcsRUFBRSxxQkFBVSxDQUFDLGNBQWMsRUFBRSxLQUFLLEVBQUUsVUFBQyxJQUFJO1lBQzFFLEtBQUksQ0FBQyxLQUFLLENBQUMsMkJBQWlCLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUEzRGEsaUNBQVEsR0FBRyxVQUFVLENBQUM7SUFDdEIsK0JBQU0sR0FBRyxRQUFRLENBQUE7SUFFakIsOENBQXFCLEdBQUcsVUFBVSxDQUFDO0lBMERyRCwrQkFBQztDQWxFRCxBQWtFQyxDQWxFcUQsbUJBQVMsR0FrRTlEO2tCQWxFb0Isd0JBQXdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vZGVsQmFzZSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL21vZGVsL01vZGVsQmFzZVwiO1xyXG5pbXBvcnQgeyBOZXRBcHBmYWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvbmV0L2hhbGwvTmV0RXZlbnRcIjtcclxuaW1wb3J0IFJlY2hhcmdlR2lmdE1vZGVsIGZyb20gXCIuL1JlY2hhcmdlR2lmdE1vZGVsXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lTGltaXRlZFJlY2dhcmdlTW9kZWwgZXh0ZW5kcyBNb2RlbEJhc2V7XHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0QXdhcmQgPSBcIkdldEF3YXJkXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIEdldENmZyA9IFwiR2V0Q2ZnXCJcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldERhaWx5UmVjaGFyZ2VBd2FyZCA9IFwiR2V0QXdhcmRcIjtcclxuXHJcbiAgICBhY3Rpdml0eUlkOiBudW1iZXIgPSA0XHJcbiAgICBwcml2YXRlIF9kYXRhOiBhbnk7XHJcbiAgICBwdWJsaWMgZ2V0IGRhdGEoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVxyXG4gICAgfVxyXG4gICAgcHVibGljIHNhZmVEYXRhID0gbnVsbCAvL+S/nemZqemHkeaVsOaNrlxyXG4gICAgcHJpdmF0ZSBfU3RhdHVzOmJvb2xlYW4gLy/nuqLngrlcclxuXHJcbiAgICBwcml2YXRlIF9zd2l0Y2g6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IFN0YXR1cygpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1N0YXR1c1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgU3RhdHVzKHN0YXR1cylcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9TdGF0dXMgPSBzdGF0dXNcclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgU3dpdGNoIChmbGFnKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX3N3aXRjaCA9IGZsYWc7XHJcbiAgICAgICAgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgU3dpdGNoICgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N3aXRjaCA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBOYW1lKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJSZWNoYXJnZUdpZnRNb2RlbFwiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIHB1YmxpYyByZXFSZWNlaXZlQWN0aXZpdHlBd2FyZChhY3Rpdml0eUlkOm51bWJlcixrZXk/Om51bWJlcikge1xyXG4gICAgICAgIGxldCBwYXJhbTogYW55ID0ge31cclxuICAgICAgICBwYXJhbS5hdHlwZSA9IGFjdGl2aXR5SWRcclxuICAgICAgICBwYXJhbS5rZXkgPSBrZXlcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLlJlY2VpdmVBY3Rpdml0eUF3YXJkLCBwYXJhbSwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudChSZWNoYXJnZUdpZnRNb2RlbC5HZXRBd2FyZCwgZGF0YSk7XHJcblxyXG4gICAgICAgIH0sIG51bGwsIHRydWUsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXFHZXRBY3Rpdml0eUNmZyhzaG93V2FpdGluZyA9ZmFsc2UpIHtcclxuICAgICAgICBsZXQgcGFyYW06IGFueSA9IHt9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXRBY3Rpdml0eUNmZywgcGFyYW0sIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnQoUmVjaGFyZ2VHaWZ0TW9kZWwuR2V0Q2ZnLGRhdGEpO1xyXG4gICAgICAgIH0sIG51bGwsIHNob3dXYWl0aW5nLCAwKTtcclxuICAgIH1cclxuXHJcbn0iXX0=