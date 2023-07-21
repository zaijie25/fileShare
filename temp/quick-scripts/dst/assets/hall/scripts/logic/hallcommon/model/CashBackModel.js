
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/model/CashBackModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZGVsXFxDYXNoQmFja01vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdFQUEyRDtBQUMzRCx5REFBMEQ7QUFDMUQsc0VBQXFFO0FBQ3JFLHlDQUE4QztBQUU5QztJQUEyQyxpQ0FBUztJQUFwRDtRQUFBLHFFQW9FQztRQW5FRyxhQUFPLEdBQUcsS0FBSyxDQUFDOztJQW1FcEIsQ0FBQztJQWpFVyx5Q0FBaUIsR0FBekIsVUFBMEIsSUFBUztRQUMvQixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1lBQ3RCLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoQyxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxzQkFBVywrQkFBSTthQUFmO1lBQ0ksT0FBTyxlQUFlLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxrQ0FBTzthQUFsQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUN2QixDQUFDO2FBRUQsVUFBbUIsSUFBSTtZQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtZQUNuQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSwyQkFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7YUFDckY7UUFDTCxDQUFDOzs7T0FQQTtJQVNELG9DQUFZLEdBQVo7UUFDSSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLDJCQUFlLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztTQUNyRjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNJLHNDQUFjLEdBQXJCO1FBQUEsaUJBS0M7UUFKRyxJQUFJLEtBQUssR0FBUSxFQUFFLENBQUE7UUFDbkIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQVUsQ0FBQyxHQUFHLEVBQUUscUJBQVUsQ0FBQyxjQUFjLEVBQUUsS0FBSyxFQUFFLFVBQUMsR0FBRztZQUN6RSxLQUFJLENBQUMsS0FBSyxDQUFDLDZCQUFhLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ2pELENBQUMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNuRCxDQUFDO0lBRUQ7O01BRUU7SUFDSyw0Q0FBb0IsR0FBM0IsVUFBNEIsSUFBWSxFQUFFLEtBQWE7UUFBdkQsaUJBUUM7UUFQRyxJQUFJLEtBQUssR0FBRztZQUNSLE1BQU0sRUFBRSxJQUFJO1lBQ1osT0FBTyxFQUFFLEtBQUs7U0FDakIsQ0FBQTtRQUNELE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHFCQUFVLENBQUMsR0FBRyxFQUFFLHFCQUFVLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLFVBQUMsR0FBRztZQUMvRSxLQUFJLENBQUMsS0FBSyxDQUFDLDZCQUFhLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDdkQsQ0FBQyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ25ELENBQUM7SUFFRDs7T0FFRztJQUNJLHNDQUFjLEdBQXJCLFVBQXNCLEVBQVM7UUFBL0IsaUJBU0M7UUFQRyxJQUFJLEtBQUssR0FBRztZQUNSLElBQUksRUFBRSxFQUFFO1NBQ1gsQ0FBQTtRQUNELE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHFCQUFVLENBQUMsR0FBRyxFQUFFLHFCQUFVLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLFVBQUMsR0FBRztZQUM1RSxLQUFJLENBQUMsS0FBSyxDQUFDLDZCQUFhLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDakQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQVUsQ0FBQyxHQUFHLEVBQUUscUJBQVUsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDeEUsQ0FBQyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ2xELENBQUM7SUFDTCxvQkFBQztBQUFELENBcEVBLEFBb0VDLENBcEUwQyxtQkFBUyxHQW9FbkQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9kZWxCYXNlIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvbW9kZWwvTW9kZWxCYXNlXCI7XHJcbmltcG9ydCB7IE5ldEFwcGZhY2UgfSBmcm9tIFwiLi4vLi4vY29yZS9uZXQvaGFsbC9OZXRFdmVudFwiO1xyXG5pbXBvcnQgeyBDYXNoQmFja0V2ZW50IH0gZnJvbSBcIi4uLy4uL2hhbGwvdWkvQ2FzaEJhY2svQ2FzaEJhY2tFdmVudFwiO1xyXG5pbXBvcnQgeyBIYWxsUmVkU3BvdFR5cGUgfSBmcm9tIFwiLi9IYWxsTW9kZWxcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhc2hCYWNrTW9kZWwgZXh0ZW5kcyBNb2RlbEJhc2Uge1xyXG4gICAgcmVkRmxhZyA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgQ2FzaEJhY2tFcnJvbkZ1bmMoZGF0YTogYW55KSB7XHJcbiAgICAgICAgaWYgKGRhdGEuX2VycnN0ciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKGRhdGEuX2VycnN0cik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBOYW1lKCkge1xyXG4gICAgICAgIHJldHVybiBcIkNhc2hCYWNrTW9kZWxcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IFJlZEZMYWcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkRmxhZ1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgUmVkRkxhZyhmbGFnKSB7XHJcbiAgICAgICAgdGhpcy5yZWRGbGFnID0gZmxhZ1xyXG4gICAgICAgIGlmICh0aGlzLnJlZEZsYWcpIHtcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNob3dSZWRTcG90LCBbZmFsc2UsIEhhbGxSZWRTcG90VHlwZS5DYXNoQmFja0RheV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBDaGVja1JlZEZsYWcoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVkRmxhZykge1xyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuU2hvd1JlZFNwb3QsIFtmYWxzZSwgSGFsbFJlZFNwb3RUeXBlLkNhc2hCYWNrRGF5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Yip6K+05piO5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRBY3Rpdml0eUNmZygpIHtcclxuICAgICAgICBsZXQgcGFyYW06IGFueSA9IHt9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXRBY3Rpdml0eUNmZywgcGFyYW0sIChtc2cpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudChDYXNoQmFja0V2ZW50LkdldEFjdGl2aXR5Q2ZnLCBtc2cpXHJcbiAgICAgICAgfSwgdGhpcy5DYXNoQmFja0Vycm9uRnVuYy5iaW5kKHRoaXMpLCBmYWxzZSwgMSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog5q+P5pel6L+U5Yip6aKG5Y+W6K6w5b2VXHJcbiAgICAqL1xyXG4gICAgcHVibGljIEdldERheUZsb3dCYWNrUmVjb3JkKHBhZ2U6IG51bWJlciwgbGltaXQ6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgXCJwYWdlXCI6IHBhZ2UsXHJcbiAgICAgICAgICAgIFwibGltaXRcIjogbGltaXRcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXREYXlGbG93QmFja1JlY29yZCwgcGFyYW0sIChtc2cpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudChDYXNoQmFja0V2ZW50LkdldERheUZsb3dCYWNrUmVjb3JkLCBtc2cpXHJcbiAgICAgICAgfSwgdGhpcy5DYXNoQmFja0Vycm9uRnVuYy5iaW5kKHRoaXMpLCBmYWxzZSwgMClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmihuWPluavj+aXpei/lOWIqVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0RGF5Rmxvd0JhY2soaWQ6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgXCJpZFwiOiBpZCxcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXREYXlGbG93QmFja0FsbCwgcGFyYW0sIChtc2cpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudChDYXNoQmFja0V2ZW50LkdldERheUZsb3dCYWNrQWxsLCBtc2cpO1xyXG4gICAgICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkdldFVzZXJQb2ludCwge30pO1xyXG4gICAgICAgIH0sIHRoaXMuQ2FzaEJhY2tFcnJvbkZ1bmMuYmluZCh0aGlzKSwgdHJ1ZSwgMClcclxuICAgIH1cclxufVxyXG4iXX0=