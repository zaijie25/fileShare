
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/recharge/RechargeOnlineView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fb64bcIy21GprUIFsYZeeZi', 'RechargeOnlineView');
// hall/scripts/logic/hall/ui/recharge/RechargeOnlineView.ts

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
var ViewBase_1 = require("../../../core/ui/ViewBase");
var RechargeModel_1 = require("../../../hallcommon/model/RechargeModel");
var NetEvent_1 = require("../../../core/net/hall/NetEvent");
var RechargeOnlineView = /** @class */ (function (_super) {
    __extends(RechargeOnlineView, _super);
    function RechargeOnlineView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RechargeOnlineView.prototype.initView = function () {
        this.model = Global.ModelManager.getModel("RechargeModel");
        this.btnLayout = this.getComponent("btnLayout", cc.Layout);
        this.addCommonClick("goToPayBtn", this.goToPay, this);
        this.addCommonClick("btnLayout", this.goToPay, this, cc.Button.Transition.NONE);
    };
    //TODO 按钮点击事件
    RechargeOnlineView.prototype.goToPay = function () {
        // this.model.reqGetUserDownPay(this.payKey,0,this.id);
        Logger.log("支付请求中----", this.payKey);
    };
    RechargeOnlineView.prototype.initData = function (data) {
        this.payKey = data.pay_key;
        // this.id =  data.data[0].id;
    };
    RechargeOnlineView.prototype.onSubViewShow = function () {
        Global.HallServer.on(NetEvent_1.NetAppface.UserDownPay, this, this.onReqOrder);
        this.model.on(RechargeModel_1.default.GetPayUrlResult, this, this.onGetPayUrl);
    };
    RechargeOnlineView.prototype.onReqOrder = function (data) {
        var order = data.order_id;
        if (order) {
            this.model.event(RechargeModel_1.default.ShowWaitingAnim, true, this.payKey);
            this.model.reqGetPayUrl(order);
        }
    };
    RechargeOnlineView.prototype.onGetPayUrl = function (result, data) {
        this.model.event(RechargeModel_1.default.ShowWaitingAnim, false);
        if (result == 0) {
            var url = data.url;
            if (url) {
                cc.sys.openURL(Global.Toolkit.DealWithUrl(url));
                Global.UI.showSingleBox(Global.Language.getWord(1606) || "支付等待中");
            }
        }
        else if (result == 2) {
            var errno = data._errno;
            if (errno) {
                Global.UI.fastTip(data._errstr);
            }
        }
        else {
            Global.UI.fastTip("支付失败，请尝试其他充值方式");
        }
    };
    RechargeOnlineView.prototype.onSubViewHide = function () {
        Global.HallServer.off(NetEvent_1.NetAppface.UserDownPay, this, this.onReqOrder);
        this.model.off(RechargeModel_1.default.GetPayUrlResult, this, this.onGetPayUrl);
    };
    return RechargeOnlineView;
}(ViewBase_1.default));
exports.default = RechargeOnlineView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWNoYXJnZVxcUmVjaGFyZ2VPbmxpbmVWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFpRDtBQUNqRCx5RUFBb0U7QUFDcEUsNERBQTZEO0FBRTdEO0lBQWdELHNDQUFRO0lBQXhEOztJQStEQSxDQUFDO0lBekRpQixxQ0FBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVsRixDQUFDO0lBRUQsYUFBYTtJQUNMLG9DQUFPLEdBQWY7UUFDSSx1REFBdUQ7UUFDdkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSxxQ0FBUSxHQUFmLFVBQWdCLElBQUk7UUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzNCLDhCQUE4QjtJQUNsQyxDQUFDO0lBRVMsMENBQWEsR0FBdkI7UUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxxQkFBVSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLHVCQUFhLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVPLHVDQUFVLEdBQWxCLFVBQW1CLElBQUk7UUFDbkIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMxQixJQUFJLEtBQUssRUFBQztZQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLHVCQUFhLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbEM7SUFDTCxDQUFDO0lBRU8sd0NBQVcsR0FBbkIsVUFBb0IsTUFBYyxFQUFFLElBQVM7UUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsdUJBQWEsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkQsSUFBSSxNQUFNLElBQUksQ0FBQyxFQUFDO1lBQ1osSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNuQixJQUFJLEdBQUcsRUFBQztnQkFDSixFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQzthQUNyRTtTQUNKO2FBQ0ksSUFBRyxNQUFNLElBQUksQ0FBQyxFQUFDO1lBQ2hCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDeEIsSUFBSSxLQUFLLEVBQUM7Z0JBQ04sTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ25DO1NBQ0o7YUFDRztZQUNBLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDdkM7SUFDTCxDQUFDO0lBRVMsMENBQWEsR0FBdkI7UUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLHVCQUFhLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVULHlCQUFDO0FBQUQsQ0EvREEsQUErREMsQ0EvRCtDLGtCQUFRLEdBK0R2RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgUmVjaGFyZ2VNb2RlbCBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9SZWNoYXJnZU1vZGVsXCI7XHJcbmltcG9ydCB7IE5ldEFwcGZhY2UgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9uZXQvaGFsbC9OZXRFdmVudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjaGFyZ2VPbmxpbmVWaWV3IGV4dGVuZHMgVmlld0Jhc2V7XHJcbiAgICAgICAgcHJpdmF0ZSBwYXlLZXk6IHN0cmluZztcclxuICAgICAgICAvLyBwcml2YXRlIGlkOnN0cmluZztcclxuICAgICAgICBwcml2YXRlIGJ0bkxheW91dDogY2MuTGF5b3V0O1xyXG4gICAgICAgIHByaXZhdGUgbW9kZWw6IFJlY2hhcmdlTW9kZWw7XHJcbiAgICBcclxuICAgICAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKXtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IEdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJSZWNoYXJnZU1vZGVsXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkxheW91dCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiYnRuTGF5b3V0XCIsIGNjLkxheW91dCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJnb1RvUGF5QnRuXCIsIHRoaXMuZ29Ub1BheSwgdGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJidG5MYXlvdXRcIix0aGlzLmdvVG9QYXksIHRoaXMsY2MuQnV0dG9uLlRyYW5zaXRpb24uTk9ORSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8vVE9ETyDmjInpkq7ngrnlh7vkuovku7ZcclxuICAgICAgICBwcml2YXRlIGdvVG9QYXkoKXtcclxuICAgICAgICAgICAgLy8gdGhpcy5tb2RlbC5yZXFHZXRVc2VyRG93blBheSh0aGlzLnBheUtleSwwLHRoaXMuaWQpO1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwi5pSv5LuY6K+35rGC5LitLS0tLVwiLCB0aGlzLnBheUtleSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW5pdERhdGEoZGF0YSl7XHJcbiAgICAgICAgICAgIHRoaXMucGF5S2V5ID0gZGF0YS5wYXlfa2V5O1xyXG4gICAgICAgICAgICAvLyB0aGlzLmlkID0gIGRhdGEuZGF0YVswXS5pZDtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBwcm90ZWN0ZWQgb25TdWJWaWV3U2hvdygpe1xyXG4gICAgICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5vbihOZXRBcHBmYWNlLlVzZXJEb3duUGF5LCB0aGlzLCB0aGlzLm9uUmVxT3JkZXIpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLm9uKFJlY2hhcmdlTW9kZWwuR2V0UGF5VXJsUmVzdWx0LCB0aGlzLCB0aGlzLm9uR2V0UGF5VXJsKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBwcml2YXRlIG9uUmVxT3JkZXIoZGF0YSl7XHJcbiAgICAgICAgICAgIGxldCBvcmRlciA9IGRhdGEub3JkZXJfaWQ7XHJcbiAgICAgICAgICAgIGlmIChvcmRlcil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmV2ZW50KFJlY2hhcmdlTW9kZWwuU2hvd1dhaXRpbmdBbmltLCB0cnVlLCB0aGlzLnBheUtleSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnJlcUdldFBheVVybChvcmRlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBwcml2YXRlIG9uR2V0UGF5VXJsKHJlc3VsdDogbnVtYmVyLCBkYXRhOiBhbnkpe1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLmV2ZW50KFJlY2hhcmdlTW9kZWwuU2hvd1dhaXRpbmdBbmltLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gZGF0YS51cmw7XHJcbiAgICAgICAgICAgICAgICBpZiAodXJsKXtcclxuICAgICAgICAgICAgICAgICAgICBjYy5zeXMub3BlblVSTChHbG9iYWwuVG9vbGtpdC5EZWFsV2l0aFVybCh1cmwpKTtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChHbG9iYWwuTGFuZ3VhZ2UuZ2V0V29yZCgxNjA2KSB8fCBcIuaUr+S7mOetieW+heS4rVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHJlc3VsdCA9PSAyKXtcclxuICAgICAgICAgICAgICAgIGxldCBlcnJubyA9IGRhdGEuX2Vycm5vO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm5vKXtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChkYXRhLl9lcnJzdHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuaUr+S7mOWksei0pe+8jOivt+WwneivleWFtuS7luWFheWAvOaWueW8j1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHByb3RlY3RlZCBvblN1YlZpZXdIaWRlKCl7XHJcbiAgICAgICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLm9mZihOZXRBcHBmYWNlLlVzZXJEb3duUGF5LCB0aGlzLCB0aGlzLm9uUmVxT3JkZXIpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLm9mZihSZWNoYXJnZU1vZGVsLkdldFBheVVybFJlc3VsdCwgdGhpcywgdGhpcy5vbkdldFBheVVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbn0iXX0=