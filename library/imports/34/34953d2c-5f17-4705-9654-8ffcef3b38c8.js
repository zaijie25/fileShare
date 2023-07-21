"use strict";
cc._RF.push(module, '349530sXxdHBZZUj/zvOzjI', 'WndSafeRuleUI');
// hall/scripts/logic/hall/ui/safe/WndSafeRuleUI.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var WndSafeRuleUI = /** @class */ (function (_super) {
    __extends(WndSafeRuleUI, _super);
    function WndSafeRuleUI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // private dayLabel : cc.Label;
    // private weekLabel : cc.Label;
    // private monthLabel : cc.Label;
    WndSafeRuleUI.prototype.onInit = function () {
        // this.isNeedDelay = true
        this.name = "WndSafeRuleUI";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/safe/SafeRuleUI";
    };
    WndSafeRuleUI.prototype.initView = function () {
        // this.dayLabel = this.getComponent("item1/jibiLabel",cc.Label);
        // this.weekLabel = this.getComponent("item2/jibiLabel",cc.Label);
        // this.monthLabel = this.getComponent("item3/jibiLabel",cc.Label);
        // this.addCommonClick("button", this.giftMoneyList, this)
        this.addCommonClick('close', this.close, this);
        // for (let i = 1; i < 4; i++) {
        //     let item = this.getChild("item"+i)
        //     let selected = cc.find("button/btn_lqjl1",item)
        //     let noSelected = cc.find("button/btn_lqjl2",item)
        //     noSelected.active = false;
        // }
    };
    WndSafeRuleUI.prototype.onOpen = function (args) {
        // this.OnDataPrepared();
        // this.CashBackModel.GetActivityCfg();
    };
    WndSafeRuleUI.prototype.onDispose = function () {
        // this.CashBackModel.off(CashBackEvent.GetActivityCfg, this, this.DescriptionDay);
        // this.CashBackModel.off(CashBackEvent.GetDayFlowBackAll, this, this.GetAwardResq);
    };
    return WndSafeRuleUI;
}(WndBase_1.default));
exports.default = WndSafeRuleUI;

cc._RF.pop();