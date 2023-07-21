"use strict";
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