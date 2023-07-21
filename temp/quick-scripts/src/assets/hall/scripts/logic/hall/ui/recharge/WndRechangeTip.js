"use strict";
cc._RF.push(module, '325bd/Mq/xNGJw/rZG+herD', 'WndRechangeTip');
// hall/scripts/logic/hall/ui/recharge/WndRechangeTip.ts

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
var WndRechangeTip = /** @class */ (function (_super) {
    __extends(WndRechangeTip, _super);
    function WndRechangeTip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndRechangeTip.prototype.onInit = function () {
        this.name = "WndRechangeTip";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/Recharge/RechangeTipUI";
        this.destoryType = WndBase_1.DestoryType.None;
        this.RechagreTipModel = Global.ModelManager.getModel("RechagreTipModel");
    };
    WndRechangeTip.prototype.initView = function () {
        this.tip1 = this.getComponent("allNode/tip1", cc.Label);
        this.tip2 = this.getComponent("allNode/tip2", cc.Label);
        this.tip3 = this.getComponent("allNode/tip3", cc.Label);
        this.tip4 = this.getComponent("allNode/tip4", cc.Label);
        this.isTip = this.getChild("isTip/btn");
        this.isTip.active = false;
        this.addCommonClick("vip", this.onVipBtnFunc, this);
        this.addCommonClick("isTip", this.TipBtn, this);
        this.addCommonClick('close', this.close, this);
    };
    WndRechangeTip.prototype.onOpen = function (num) {
        this.tip1.string = num.toString() + "%";
        this.tip2.string = "10000" + "元";
        var str = 100 * num;
        this.tip3.string = str.toString() + "元";
        str = 10000 + 100 * num;
        this.tip4.string = str.toString() + "元";
    };
    WndRechangeTip.prototype.onVipBtnFunc = function () {
        this.close();
        var WndRecharge = Global.UI.getWindow("WndRecharge");
        WndRecharge.rechargeView.ShowVip();
        // Global.UI.close("WndRecharge");
        // Global.ModelManager.getModel("ServicerModel").showServices(ServiceEntranceType.OnlineService);
    };
    WndRechangeTip.prototype.onClose = function () {
        if (this.isTip.active == true) {
            this.RechagreTipModel.setRechagreTipModel();
        }
    };
    WndRechangeTip.prototype.TipBtn = function () {
        this.isTip.active = !this.isTip.active;
    };
    return WndRechangeTip;
}(WndBase_1.default));
exports.default = WndRechangeTip;

cc._RF.pop();